import * as THREE from 'three';
import type { PointerSnapshot } from '../input/PointerInput';
import type { AtmosphereMode, EngineConfig } from '../types';

/**
 * VfxController: Unified scenario atmosphere, mode-gated wind-driven rain streaks ('rain'),
 * subtle ambient vapor/motes ('night' / 'day'), camera parallax (mouse + touch on playground),
 * and interactive cursor spotlight. Zero per-frame heap allocations.
 */

type ParticleKind = 'rain' | 'spark' | 'steam';

interface ParticleSeed {
  kind: ParticleKind;
  baseRadius: number;
  angleOffset: number;
  speedY: number;
  maxY: number;
  minY: number;
  spawnX: number;
  spawnZ: number;
  windSensitivity: number;
}

export class VfxController {
  private readonly mode: 'playground' | 'mascot';
  private readonly baseCameraPos = new THREE.Vector3();
  private readonly lookAtTarget = new THREE.Vector3();
  private readonly smoothedPointer = new THREE.Vector2(0, 0);
  private readonly smoothedDrag = new THREE.Vector2(0, 0);

  private readonly cursorLight: THREE.PointLight;
  private particles: THREE.Points | null = null;
  private particlePositions: Float32Array | null = null;
  private particleColors: Float32Array | null = null;
  private particleSeeds: ParticleSeed[] = [];
  private centerOffset: [number, number] = [0, -4.6];
  private currentAtmosphere: AtmosphereMode = 'night';

  constructor(options: {
    scene: THREE.Scene;
    config: EngineConfig;
    baseCameraPos: [number, number, number];
    lookAtTarget: [number, number, number];
    particleOrigin?: [number, number];
    particleCount?: number;
  }) {
    this.mode = options.config.mode;
    this.currentAtmosphere = options.config.atmosphere ?? 'night';
    this.baseCameraPos.set(...options.baseCameraPos);
    this.lookAtTarget.set(...options.lookAtTarget);
    if (options.particleOrigin) {
      this.centerOffset = options.particleOrigin;
    }

    this.cursorLight = new THREE.PointLight(
      new THREE.Color(options.config.palette.cursorLight),
      options.config.cursorLightIntensity * (this.mode === 'mascot' ? 4.5 : 13.5),
      this.mode === 'mascot' ? 10.0 : 18.0,
      1.5
    );
    this.cursorLight.position.set(0, 2.4, 4.2);
    options.scene.add(this.cursorLight);

    const count = options.particleCount ?? (this.mode === 'mascot' ? 16 : 240);
    if (count > 0) {
      this.buildParticles(options.scene, options.config, count);
    }
  }

  private buildParticles(scene: THREE.Scene, config: EngineConfig, count: number): void {
    this.particlePositions = new Float32Array(count * 3);
    this.particleColors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let kind: ParticleKind = 'spark';
      if (this.mode === 'playground') {
        const mod = i % 10;
        if (mod < 7) {
          kind = 'rain'; // 70% wind-slanted rain streaks (active ONLY when atmosphere === 'rain')
        } else if (mod < 9) {
          kind = 'steam'; // 20% street-vent vapor / sunlit motes
        } else {
          kind = 'spark'; // 10% rising holo-sparks around portal
        }
      }

      const h1 = Math.sin(i * 91.3 + 1.7) * 43758.5453;
      const h2 = Math.sin(i * 217.9 + 5.3) * 43758.5453;
      const r1 = h1 - Math.floor(h1);
      const r2 = h2 - Math.floor(h2);

      const radius =
        this.mode === 'mascot'
          ? 0.9 + ((i * 1.37) % 1.4)
          : 0.7 + r1 * 5.6;
      const angle = i * 2.39996;

      const minY = this.mode === 'mascot' ? -0.2 : kind === 'rain' ? -0.2 : 0.15;
      const maxY =
        this.mode === 'mascot'
          ? 2.4
          : kind === 'rain'
            ? 16.5
            : kind === 'steam'
              ? 4.2
              : 8.4;

      const spawnX =
        kind === 'steam'
          ? (i % 2 === 0 ? -3.6 : 3.6) + (r1 - 0.5) * 2.2
          : (r1 - 0.5) * 26.0;
      const spawnZ =
        kind === 'steam'
          ? -3.5 + r2 * 10.5
          : (r2 - 0.5) * 24.0 - 2.0;

      const speedY =
        kind === 'rain'
          ? -(11.4 + (i % 6) * 1.9)
          : kind === 'steam'
            ? 0.65 + (i % 4) * 0.18
            : 0.55 + (i % 5) * 0.16;

      const y = minY + r2 * (maxY - minY);

      this.particleSeeds.push({
        kind,
        baseRadius: radius,
        angleOffset: angle,
        speedY,
        minY,
        maxY,
        spawnX,
        spawnZ,
        windSensitivity: 0.75 + (i % 5) * 0.14,
      });

      this.particlePositions[i * 3] =
        kind === 'spark' ? Math.cos(angle) * radius + this.centerOffset[0] : spawnX;
      this.particlePositions[i * 3 + 1] =
        kind === 'rain' && config.atmosphere !== 'rain' ? -120 : y;
      this.particlePositions[i * 3 + 2] =
        kind === 'spark' ? Math.sin(angle) * radius + this.centerOffset[1] : spawnZ;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.particleColors, 3));

    const mat = new THREE.PointsMaterial({
      size: this.mode === 'mascot' ? 0.12 : 0.28,
      vertexColors: true,
      transparent: true,
      opacity: this.mode === 'mascot' ? 0.62 : 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    scene.add(this.particles);
    this.syncParticleAtmosphere(config);
  }

  private syncParticleAtmosphere(config: EngineConfig): void {
    this.currentAtmosphere = config.atmosphere ?? 'night';
    if (!this.particles || !this.particleColors || !this.particlePositions) return;

    const isRain = this.mode === 'playground' && this.currentAtmosphere === 'rain';
    const isDay = this.mode === 'playground' && this.currentAtmosphere === 'day';

    const cCyan = new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#E2FFFF'), 0.32);
    const cMagenta = new THREE.Color(config.palette.warmLight).lerp(new THREE.Color('#FFD0EB'), 0.24);
    const cAmber = new THREE.Color(config.palette.warmCore);
    const ambientScale = isDay ? 0.35 : isRain ? 1.0 : 0.65;

    for (let i = 0; i < this.particleSeeds.length; i++) {
      const s = this.particleSeeds[i]!;
      if (s.kind === 'rain') {
        if (!isRain) {
          this.particleColors[i * 3] = 0;
          this.particleColors[i * 3 + 1] = 0;
          this.particleColors[i * 3 + 2] = 0;
          this.particlePositions[i * 3 + 1] = -120;
          continue;
        }
        const rc = i % 5 === 0 ? cMagenta : i % 7 === 0 ? cAmber : cCyan;
        this.particleColors[i * 3] = rc.r;
        this.particleColors[i * 3 + 1] = rc.g;
        this.particleColors[i * 3 + 2] = rc.b;
      } else {
        const ac =
          s.kind === 'steam'
            ? isDay
              ? cAmber
              : i % 2 === 0
                ? cCyan
                : cMagenta
            : i % 2 === 0
              ? cAmber
              : cMagenta;
        this.particleColors[i * 3] = ac.r * ambientScale;
        this.particleColors[i * 3 + 1] = ac.g * ambientScale;
        this.particleColors[i * 3 + 2] = ac.b * ambientScale;
      }
    }

    const mat = this.particles.material as THREE.PointsMaterial;
    if (this.mode === 'playground') {
      mat.size = isRain ? 0.29 : isDay ? 0.2 : 0.24;
      mat.opacity = isRain ? 0.95 : isDay ? 0.45 : 0.76;
    }

    const colorAttr = this.particles.geometry.getAttribute('color') as THREE.BufferAttribute;
    colorAttr.needsUpdate = true;
    const posAttr = this.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
    posAttr.needsUpdate = true;
  }

  public update(
    dt: number,
    elapsed: number,
    pointer: PointerSnapshot,
    camera: THREE.PerspectiveCamera,
    config: EngineConfig
  ): void {
    const damp = 1 - Math.exp(-config.parallaxSmoothing * dt);

    // 1. Camera Parallax (Playground only — Mascot Tux stage remains 100% pointer-inert!)
    if (this.mode === 'mascot') {
      camera.position.set(this.baseCameraPos.x, this.baseCameraPos.y, this.baseCameraPos.z);
      camera.lookAt(this.lookAtTarget);
      this.cursorLight.position.set(0, 1.25, 2.6);
    } else {
      const targetX = pointer.active ? pointer.normX : 0;
      const targetY = pointer.active ? pointer.normY : 0;
      this.smoothedPointer.x += (targetX - this.smoothedPointer.x) * damp;
      this.smoothedPointer.y += (targetY - this.smoothedPointer.y) * damp;

      this.smoothedDrag.x += (pointer.dragYaw - this.smoothedDrag.x) * damp;
      this.smoothedDrag.y += (pointer.dragPitch - this.smoothedDrag.y) * damp;

      const amp = config.parallaxIntensity;
      const idleSwayX = Math.sin(elapsed * 0.35) * 0.3;
      const idleSwayY = Math.cos(elapsed * 0.28) * 0.12;
      const orbitOffsetX = Math.sin(this.smoothedDrag.x * 0.55) * 2.35;
      const orbitOffsetY = -this.smoothedDrag.y * 1.45;

      camera.position.set(
        this.baseCameraPos.x + this.smoothedPointer.x * amp + orbitOffsetX + idleSwayX,
        Math.max(
          1.15,
          this.baseCameraPos.y + this.smoothedPointer.y * (amp * 0.48) + orbitOffsetY + idleSwayY
        ),
        this.baseCameraPos.z - Math.abs(this.smoothedPointer.x + orbitOffsetX * 0.25) * 0.45
      );
      camera.lookAt(
        this.lookAtTarget.x + this.smoothedPointer.x * 0.75 + this.smoothedDrag.x * 1.25,
        this.lookAtTarget.y + this.smoothedPointer.y * 0.42 - this.smoothedDrag.y * 0.85,
        this.lookAtTarget.z
      );

      this.cursorLight.position.set(
        this.smoothedPointer.x * 5.8 + orbitOffsetX * 0.6,
        2.1 + this.smoothedPointer.y * 1.8,
        3.6 - this.smoothedPointer.y * 3.5
      );
    }

    // 2. Mode-Aware Rain Streaks ('rain' only), Street Vapor & Rising Sparks
    if (this.particles && this.particlePositions) {
      const windStr = config.windStrength ?? 1.0;
      const windGust =
        (0.75 + 0.38 * Math.sin(elapsed * 0.68) + 0.18 * Math.sin(elapsed * 1.95)) * windStr;
      const rainEnabled = this.mode === 'playground' && (config.atmosphere ?? 'night') === 'rain';

      const count = this.particleSeeds.length;
      for (let i = 0; i < count; i++) {
        const s = this.particleSeeds[i]!;
        const span = s.maxY - s.minY;

        if (s.kind === 'rain') {
          if (!rainEnabled) {
            this.particlePositions[i * 3 + 1] = -120;
            continue;
          }
          const fall = (((s.maxY + elapsed * s.speedY - i * 0.73) % span) + span) % span;
          const y = s.minY + fall;
          const dropTravel = s.maxY - y;
          const windOffset = dropTravel * 0.16 * windGust * s.windSensitivity;
          const wrappedX = ((((s.spawnX + windOffset + 14.0) % 28.0) + 28.0) % 28.0) - 14.0;

          this.particlePositions[i * 3] = wrappedX;
          this.particlePositions[i * 3 + 1] = y;
          this.particlePositions[i * 3 + 2] = s.spawnZ;
        } else if (s.kind === 'steam') {
          const rise = (((elapsed * s.speedY + i * 0.57) % span) + span) % span;
          const y = s.minY + rise;
          const driftX = rise * 0.72 * windGust * s.windSensitivity + Math.sin(elapsed * 1.4 + i) * 0.25;
          this.particlePositions[i * 3] = s.spawnX + driftX;
          this.particlePositions[i * 3 + 1] = y;
          this.particlePositions[i * 3 + 2] = s.spawnZ + Math.cos(elapsed * 0.9 + i) * 0.2;
        } else {
          const y = s.minY + ((((elapsed * s.speedY + i * 0.41) % span) + span) % span);
          const swirl = s.angleOffset + elapsed * 0.32 * (i % 2 === 0 ? 1 : -1);
          const r = s.baseRadius + Math.sin(elapsed * 0.9 + i) * 0.18;
          const windCarry = (y - s.minY) * 0.12 * windGust;

          this.particlePositions[i * 3] = Math.cos(swirl) * r + this.centerOffset[0] + windCarry;
          this.particlePositions[i * 3 + 1] = y;
          this.particlePositions[i * 3 + 2] = Math.sin(swirl) * r + this.centerOffset[1];
        }
      }
      const attr = this.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  }

  public applyConfig(config: EngineConfig): void {
    const dayScale = config.atmosphere === 'day' ? 0.55 : 1.0;
    this.cursorLight.color.set(config.palette.cursorLight);
    this.cursorLight.intensity =
      config.cursorLightIntensity * (this.mode === 'mascot' ? 4.5 : 13.5 * dayScale);

    this.syncParticleAtmosphere(config);
  }

  public isRainActive(): boolean {
    return this.mode === 'playground' && this.currentAtmosphere === 'rain';
  }

  public getCursorLight(): THREE.PointLight {
    return this.cursorLight;
  }
}
