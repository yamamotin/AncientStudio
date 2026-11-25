import * as THREE from 'three';
import type { PointerSnapshot } from '../input/PointerInput';
import type { EngineConfig, ThemePalette } from '../types';

/**
 * VfxController: Cyberpunk environmental visual effects, smooth camera parallax,
 * interactive cursor spotlight, rising data/ember sparks, and digital neon rain streaks.
 * Zero per-frame heap allocations.
 */

interface ParticleSeed {
  baseRadius: number;
  angleOffset: number;
  speedY: number;
  maxY: number;
  minY: number;
  isRain: boolean;
  rainX: number;
  rainZ: number;
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
  private centerOffset: [number, number] = [0, -2.2];

  constructor(options: {
    scene: THREE.Scene;
    config: EngineConfig;
    baseCameraPos: [number, number, number];
    lookAtTarget: [number, number, number];
    particleOrigin?: [number, number];
    particleCount?: number;
  }) {
    this.mode = options.config.mode;
    this.baseCameraPos.set(...options.baseCameraPos);
    this.lookAtTarget.set(...options.lookAtTarget);
    if (options.particleOrigin) {
      this.centerOffset = options.particleOrigin;
    }

    // Interactive cursor cyber-spotlight
    this.cursorLight = new THREE.PointLight(
      new THREE.Color(options.config.palette.cursorLight),
      options.config.cursorLightIntensity * (this.mode === 'mascot' ? 4.5 : 10.5),
      this.mode === 'mascot' ? 10.0 : 16.0,
      1.55
    );
    this.cursorLight.position.set(0, 2.4, 3.2);
    options.scene.add(this.cursorLight);

    // Playground combines rising holo-sparks + falling cyberpunk neon rain droplets
    const count = options.particleCount ?? (this.mode === 'mascot' ? 16 : 168);
    if (count > 0) {
      this.buildParticles(options.scene, options.config.palette, count);
    }
  }

  private buildParticles(scene: THREE.Scene, palette: ThemePalette, count: number): void {
    this.particlePositions = new Float32Array(count * 3);
    this.particleColors = new Float32Array(count * 3);

    const cCyan = new THREE.Color(palette.coolAmbient);
    const cMagenta = new THREE.Color(palette.warmLight);
    const cAmber = new THREE.Color(palette.warmCore);

    for (let i = 0; i < count; i++) {
      // In playground mode, 68% of particles are fast-falling cyberpunk neon rain streaks; 32% are rising holo-sparks
      const isRain = this.mode === 'playground' && i >= Math.floor(count * 0.32);

      const h1 = Math.sin(i * 91.3 + 1.7) * 43758.5453;
      const h2 = Math.sin(i * 217.9 + 5.3) * 43758.5453;
      const r1 = h1 - Math.floor(h1);
      const r2 = h2 - Math.floor(h2);

      const radius =
        this.mode === 'mascot'
          ? 0.9 + ((i * 1.37) % 1.4)
          : 0.6 + r1 * 5.8;
      const angle = i * 2.39996;

      const minY = this.mode === 'mascot' ? -0.2 : isRain ? -0.6 : 0.4;
      const maxY = this.mode === 'mascot' ? 2.4 : isRain ? 15.5 : 7.5;
      const rainX = (r1 - 0.5) * 26.0;
      const rainZ = (r2 - 0.5) * 22.0 - 2.0;

      const speedY = isRain
        ? -(9.5 + (i % 6) * 1.65)
        : 0.48 + (i % 5) * 0.14;

      const y = minY + r2 * (maxY - minY);

      this.particleSeeds.push({
        baseRadius: radius,
        angleOffset: angle,
        speedY,
        minY,
        maxY,
        isRain,
        rainX,
        rainZ,
      });

      this.particlePositions[i * 3] = isRain ? rainX : Math.cos(angle) * radius + this.centerOffset[0];
      this.particlePositions[i * 3 + 1] = y;
      this.particlePositions[i * 3 + 2] = isRain ? rainZ : Math.sin(angle) * radius + this.centerOffset[1];

      const c = isRain
        ? i % 5 === 0
          ? cMagenta
          : cCyan
        : i % 2 === 0
          ? cAmber
          : cMagenta;

      this.particleColors[i * 3] = c.r;
      this.particleColors[i * 3 + 1] = c.g;
      this.particleColors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.particleColors, 3));

    const mat = new THREE.PointsMaterial({
      size: this.mode === 'mascot' ? 0.12 : 0.24,
      vertexColors: true,
      transparent: true,
      opacity: this.mode === 'mascot' ? 0.65 : 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    scene.add(this.particles);
  }

  public update(
    dt: number,
    elapsed: number,
    pointer: PointerSnapshot,
    camera: THREE.PerspectiveCamera,
    config: EngineConfig
  ): void {
    const damp = 1 - Math.exp(-config.parallaxSmoothing * dt);
    const targetX = pointer.active ? pointer.normX : 0;
    const targetY = pointer.active ? pointer.normY : 0;
    this.smoothedPointer.x += (targetX - this.smoothedPointer.x) * damp;
    this.smoothedPointer.y += (targetY - this.smoothedPointer.y) * damp;

    // 1. Camera Parallax + Subtle Breathing Sway
    const amp = config.parallaxIntensity;
    if (this.mode === 'mascot') {
      const breathY = Math.sin(elapsed * 0.85) * 0.04;
      camera.position.set(
        this.baseCameraPos.x + this.smoothedPointer.x * amp * 0.25,
        this.baseCameraPos.y + this.smoothedPointer.y * amp * 0.16 + breathY,
        this.baseCameraPos.z
      );
      camera.lookAt(this.lookAtTarget);

      this.cursorLight.position.set(
        this.smoothedPointer.x * 2.8,
        1.25 + this.smoothedPointer.y * 1.4,
        2.6
      );
    } else {
      const idleSwayX = Math.sin(elapsed * 0.35) * 0.34;
      const idleSwayY = Math.cos(elapsed * 0.28) * 0.14;
      camera.position.set(
        this.baseCameraPos.x + this.smoothedPointer.x * amp + idleSwayX,
        this.baseCameraPos.y + this.smoothedPointer.y * (amp * 0.52) + idleSwayY,
        this.baseCameraPos.z - Math.abs(this.smoothedPointer.x) * 0.38
      );
      camera.lookAt(
        this.lookAtTarget.x + this.smoothedPointer.x * 0.65,
        this.lookAtTarget.y + this.smoothedPointer.y * 0.36,
        this.lookAtTarget.z
      );

      this.cursorLight.position.set(
        this.smoothedPointer.x * 6.8,
        2.2 + this.smoothedPointer.y * 1.9,
        2.8 - this.smoothedPointer.y * 3.8
      );
    }

    // 2. Update Cyberpunk Neon Rain & Rising Holo-Sparks
    if (this.particles && this.particlePositions) {
      const count = this.particleSeeds.length;
      for (let i = 0; i < count; i++) {
        const s = this.particleSeeds[i]!;
        const span = s.maxY - s.minY;

        if (s.isRain) {
          const fall = ((s.maxY + elapsed * s.speedY - i * 0.73) % span + span) % span;
          const y = s.minY + fall;
          // Slight diagonal wind slant for authentic cyberpunk rain aesthetic
          const windOffset = (s.maxY - y) * 0.08;
          this.particlePositions[i * 3] = s.rainX + windOffset;
          this.particlePositions[i * 3 + 1] = y;
          this.particlePositions[i * 3 + 2] = s.rainZ;
        } else {
          const y = s.minY + (((elapsed * s.speedY + i * 0.41) % span + span) % span);
          const swirl = s.angleOffset + elapsed * 0.28 * (i % 2 === 0 ? 1 : -1);
          const r = s.baseRadius + Math.sin(elapsed * 0.9 + i) * 0.18;

          this.particlePositions[i * 3] = Math.cos(swirl) * r + this.centerOffset[0];
          this.particlePositions[i * 3 + 1] = y;
          this.particlePositions[i * 3 + 2] = Math.sin(swirl) * r + this.centerOffset[1];
        }
      }
      const attr = this.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  }

  public applyConfig(config: EngineConfig): void {
    this.cursorLight.color.set(config.palette.cursorLight);
    this.cursorLight.intensity =
      config.cursorLightIntensity * (this.mode === 'mascot' ? 4.5 : 10.5);

    // Re-tint rain & holo-sparks dynamically when user switches presets
    if (this.particles && this.particleColors) {
      const cCyan = new THREE.Color(config.palette.coolAmbient);
      const cMagenta = new THREE.Color(config.palette.warmLight);
      const cAmber = new THREE.Color(config.palette.warmCore);

      for (let i = 0; i < this.particleSeeds.length; i++) {
        const s = this.particleSeeds[i]!;
        const c = s.isRain
          ? i % 5 === 0
            ? cMagenta
            : cCyan
          : i % 2 === 0
            ? cAmber
            : cMagenta;
        this.particleColors[i * 3] = c.r;
        this.particleColors[i * 3 + 1] = c.g;
        this.particleColors[i * 3 + 2] = c.b;
      }
      const colorAttr = this.particles.geometry.getAttribute('color') as THREE.BufferAttribute;
      colorAttr.needsUpdate = true;
    }
  }

  public getCursorLight(): THREE.PointLight {
    return this.cursorLight;
  }
}
