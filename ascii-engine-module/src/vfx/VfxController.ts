import * as THREE from 'three';
import type { PointerSnapshot } from '../input/PointerInput';
import type { AtmosphereMode, EngineConfig } from '../types';

/**
 * VfxController: Playground scenario atmosphere, mode-gated wind-driven rain streaks ('rain'),
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

  private readonly cursorLight: THREE.PointLight;
  private particles: THREE.Points | null = null;
  private particlePositions: Float32Array | null = null;
  private particleColors: Float32Array | null = null;
  private particleSeeds: ParticleSeed[] = [];
  private centerOffset: [number, number] = [0, -10.4];
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
      this.mode === 'mascot' ? 0 : options.config.cursorLightIntensity * 3.8,
      14.0,
      1.7
    );
    this.cursorLight.position.set(0, 2.0, 4.2);
    if (this.mode !== 'mascot') {
      options.scene.add(this.cursorLight);
    }

    const count = options.particleCount ?? (this.mode === 'mascot' ? 0 : 240);
    if (count > 0 && this.mode !== 'mascot') {
      this.buildParticles(options.scene, options.config, count);
    }
  }

  private buildParticles(scene: THREE.Scene, config: EngineConfig, count: number): void {
    this.particlePositions = new Float32Array(count * 3);
    this.particleColors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const mod = i % 10;
      const kind: ParticleKind = mod < 7 ? 'rain' : mod < 9 ? 'steam' : 'spark';

      const h1 = Math.sin(i * 91.3 + 1.7) * 43758.5453;
      const h2 = Math.sin(i * 217.9 + 5.3) * 43758.5453;
      const r1 = h1 - Math.floor(h1);
      const r2 = h2 - Math.floor(h2);

      const radius = 0.7 + r1 * 5.6;
      const angle = i * 2.39996;
      const minY = kind === 'rain' ? -0.2 : 0.15;
      const maxY = kind === 'rain' ? 16.5 : kind === 'steam' ? 4.2 : 8.4;

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
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.particles.userData.skipObjectOutline = true;
    scene.add(this.particles);
    this.syncParticleAtmosphere(config);
  }

  private syncParticleAtmosphere(config: EngineConfig): void {
    this.currentAtmosphere = config.atmosphere ?? 'night';
    if (!this.particles || !this.particleColors || !this.particlePositions) return;

    const isRain = this.mode === 'playground' && this.currentAtmosphere === 'rain';
    const isDay = this.mode === 'playground' && this.currentAtmosphere === 'day';

    // Desaturated Cyber-Noir steel-mist & discreet verdigris particles (zero neon blowout)
    const cSteel = new THREE.Color(config.palette.coolAmbient);
    const cAccent = new THREE.Color(config.palette.warmLight);
    const cMist = new THREE.Color(config.palette.warmCore);
    const ambientScale = isDay ? 0.28 : isRain ? 0.85 : 0.48;

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
        const rc = i % 6 === 0 ? cAccent : i % 3 === 0 ? cMist : cSteel;
        this.particleColors[i * 3] = rc.r;
        this.particleColors[i * 3 + 1] = rc.g;
        this.particleColors[i * 3 + 2] = rc.b;
      } else {
        const ac =
          s.kind === 'steam'
            ? isDay
              ? cMist
              : i % 2 === 0
                ? cSteel
                : cMist
            : i % 3 === 0
              ? cAccent
              : cMist;
        this.particleColors[i * 3] = ac.r * ambientScale;
        this.particleColors[i * 3 + 1] = ac.g * ambientScale;
        this.particleColors[i * 3 + 2] = ac.b * ambientScale;
      }
    }

    const mat = this.particles.material as THREE.PointsMaterial;
    mat.size = isRain ? 0.26 : isDay ? 0.18 : 0.21;
    mat.opacity = isRain ? 0.72 : isDay ? 0.34 : 0.52;

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
    if (this.mode === 'mascot') {
      camera.position.copy(this.baseCameraPos);
      camera.lookAt(this.lookAtTarget);
      return;
    }

    // Playground camera tracking is owned exclusively by ECS `CameraFollowSystem`.
    // VfxController updates only subtle cursor inspection light & atmospheric particles.
    const damp = 1 - Math.exp(-config.parallaxSmoothing * dt);
    const targetX = pointer.active ? pointer.normX : 0;
    const targetY = pointer.active ? pointer.normY : 0;
    this.smoothedPointer.x += (targetX - this.smoothedPointer.x) * damp;
    this.smoothedPointer.y += (targetY - this.smoothedPointer.y) * damp;

    this.cursorLight.position.set(
      camera.position.x + this.smoothedPointer.x * 4.2,
      1.85 + this.smoothedPointer.y * 1.2,
      camera.position.z - 3.6 - this.smoothedPointer.y * 2.8
    );

    if (this.particles && this.particlePositions) {
      const windStr = config.windStrength ?? 1.0;
      const windGust =
        (0.75 + 0.38 * Math.sin(elapsed * 0.68) + 0.18 * Math.sin(elapsed * 1.95)) * windStr;
      const rainEnabled = (config.atmosphere ?? 'night') === 'rain';
      const rainCenterZ = camera.position.z - 4.0;

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
          const wrappedX =
            camera.position.x +
            (((((s.spawnX - camera.position.x + windOffset + 14.0) % 28.0) + 28.0) % 28.0) - 14.0);
          const wrappedZ =
            rainCenterZ + (((((s.spawnZ - rainCenterZ + 12.0) % 24.0) + 24.0) % 24.0) - 12.0);

          this.particlePositions[i * 3] = wrappedX;
          this.particlePositions[i * 3 + 1] = y;
          this.particlePositions[i * 3 + 2] = wrappedZ;
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
      this.mode === 'mascot' ? 0 : config.cursorLightIntensity * 3.8 * dayScale;

    this.syncParticleAtmosphere(config);
  }

  public isRainActive(): boolean {
    return this.mode === 'playground' && this.currentAtmosphere === 'rain';
  }

  public getCursorLight(): THREE.PointLight {
    return this.cursorLight;
  }
}
