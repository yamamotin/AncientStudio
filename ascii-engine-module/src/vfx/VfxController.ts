import * as THREE from 'three';
import type { PointerSnapshot } from '../input/PointerInput';
import type { EngineConfig, ThemePalette } from '../types';

/**
 * VfxController: Lightweight environmental visual effects, camera parallax,
 * interactive cursor lantern light, and rising ember / firefly particles.
 * Zero per-frame allocations.
 */

interface ParticleSeed {
  baseRadius: number;
  angleOffset: number;
  speedY: number;
  maxY: number;
  minY: number;
}

export class VfxController {
  private readonly mode: 'playground' | 'mascot';
  private readonly baseCameraPos = new THREE.Vector3();
  private readonly lookAtTarget = new THREE.Vector3();
  private readonly smoothedPointer = new THREE.Vector2(0, 0);

  private readonly cursorLight: THREE.PointLight;
  private particles: THREE.Points | null = null;
  private particlePositions: Float32Array | null = null;
  private particleSeeds: ParticleSeed[] = [];
  private centerOffset: [number, number] = [0, -1.8];

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

    // Interactive cursor lantern light
    this.cursorLight = new THREE.PointLight(
      new THREE.Color(options.config.palette.cursorLight),
      options.config.cursorLightIntensity * (this.mode === 'mascot' ? 4.5 : 8.5),
      this.mode === 'mascot' ? 10.0 : 14.0,
      1.6
    );
    this.cursorLight.position.set(0, 2.2, 3.2);
    options.scene.add(this.cursorLight);

    const count = options.particleCount ?? (this.mode === 'mascot' ? 18 : 68);
    if (count > 0) {
      this.buildParticles(options.scene, options.config.palette, count);
    }
  }

  private buildParticles(scene: THREE.Scene, palette: ThemePalette, count: number): void {
    this.particlePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const warm = new THREE.Color(palette.warmCore);
    const cyan = new THREE.Color(palette.cursorLight);

    for (let i = 0; i < count; i++) {
      const isEmber = i < count * 0.55;
      const radius =
        this.mode === 'mascot'
          ? 0.9 + ((i * 1.37) % 1.4)
          : isEmber
            ? 0.4 + ((i * 1.618) % 2.8)
            : 2.5 + ((i * 2.414) % 9.5);
      const angle = i * 2.39996;
      const minY = this.mode === 'mascot' ? -0.2 : isEmber ? 0.6 : 0.0;
      const maxY = this.mode === 'mascot' ? 2.4 : isEmber ? 6.5 : 4.2;
      const y = minY + ((i * 0.73) % (maxY - minY));

      this.particleSeeds.push({
        baseRadius: radius,
        angleOffset: angle,
        speedY: isEmber ? 0.45 + (i % 5) * 0.12 : 0.14 + (i % 4) * 0.05,
        minY,
        maxY,
      });

      this.particlePositions[i * 3] = Math.cos(angle) * radius + this.centerOffset[0];
      this.particlePositions[i * 3 + 1] = y;
      this.particlePositions[i * 3 + 2] = Math.sin(angle) * radius + this.centerOffset[1];

      const c = isEmber ? warm : cyan;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: this.mode === 'mascot' ? 0.12 : 0.28,
      vertexColors: true,
      transparent: true,
      opacity: this.mode === 'mascot' ? 0.65 : 0.92,
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
      // Subtle micro-framing parallax so Tux himself does the dramatic rotation
      const breathY = Math.sin(elapsed * 0.85) * 0.04;
      camera.position.set(
        this.baseCameraPos.x + this.smoothedPointer.x * amp * 0.25,
        this.baseCameraPos.y + this.smoothedPointer.y * amp * 0.16 + breathY,
        this.baseCameraPos.z
      );
      camera.lookAt(this.lookAtTarget);

      // Cursor rim light tracks pointer around Tux for dynamic ASCII edge highlights
      this.cursorLight.position.set(
        this.smoothedPointer.x * 2.8,
        1.25 + this.smoothedPointer.y * 1.4,
        2.6
      );
    } else {
      const idleSwayX = Math.sin(elapsed * 0.35) * 0.32;
      const idleSwayY = Math.cos(elapsed * 0.28) * 0.14;
      camera.position.set(
        this.baseCameraPos.x + this.smoothedPointer.x * amp + idleSwayX,
        this.baseCameraPos.y + this.smoothedPointer.y * (amp * 0.52) + idleSwayY,
        this.baseCameraPos.z - Math.abs(this.smoothedPointer.x) * 0.35
      );
      camera.lookAt(
        this.lookAtTarget.x + this.smoothedPointer.x * 0.55,
        this.lookAtTarget.y + this.smoothedPointer.y * 0.32,
        this.lookAtTarget.z
      );

      this.cursorLight.position.set(
        this.smoothedPointer.x * 6.5,
        2.2 + this.smoothedPointer.y * 1.8,
        2.8 - this.smoothedPointer.y * 3.5
      );
    }

    // 2. Update Floating Particles
    if (this.particles && this.particlePositions) {
      const count = this.particleSeeds.length;
      for (let i = 0; i < count; i++) {
        const s = this.particleSeeds[i]!;
        const span = s.maxY - s.minY;
        const y = s.minY + (((elapsed * s.speedY + i * 0.41) % span + span) % span);
        const swirl = s.angleOffset + elapsed * 0.24 * (i % 2 === 0 ? 1 : -1);
        const r = s.baseRadius + Math.sin(elapsed * 0.9 + i) * 0.18;

        this.particlePositions[i * 3] = Math.cos(swirl) * r + this.centerOffset[0];
        this.particlePositions[i * 3 + 1] = y;
        this.particlePositions[i * 3 + 2] = Math.sin(swirl) * r + this.centerOffset[1];
      }
      const attr = this.particles.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  }

  public applyConfig(config: EngineConfig): void {
    this.cursorLight.color.set(config.palette.cursorLight);
    this.cursorLight.intensity =
      config.cursorLightIntensity * (this.mode === 'mascot' ? 4.5 : 8.5);
  }
}
