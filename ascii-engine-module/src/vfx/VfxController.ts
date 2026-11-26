import * as THREE from 'three';
import type { PointerSnapshot } from '../input/PointerInput';
import type { EngineConfig } from '../types';

export interface VfxControllerOptions {
  scene: THREE.Scene;
  config: EngineConfig;
  baseCameraPos: [number, number, number];
  lookAtTarget: [number, number, number];
}

/**
 * VfxController: Manages atmospheric weather particles (3D diagonal storm rain in `'rain'` mode),
 * subtle street-level cursor fill light, and gentle idle camera breathing for mascot mode.
 * Camera tracking in playground mode is owned exclusively by `CameraFollowSystem`.
 */
export class VfxController {
  private readonly scene: THREE.Scene;
  private config: EngineConfig;
  private readonly baseCam = new THREE.Vector3();
  private readonly baseLookAt = new THREE.Vector3();
  private readonly currentLookAt = new THREE.Vector3();

  private readonly cursorLight: THREE.PointLight;
  private rainPoints: THREE.Points | null = null;
  private rainPositions: Float32Array | null = null;
  private rainSpeeds: Float32Array | null = null;
  private rainActive = false;

  private static readonly RAIN_COUNT = 620;
  private static readonly RAIN_SPAN_X = 46;
  private static readonly RAIN_SPAN_Z = 44;
  private static readonly RAIN_TOP_Y = 17.5;
  private static readonly RAIN_BOTTOM_Y = -0.35;

  constructor(options: VfxControllerOptions) {
    this.scene = options.scene;
    this.config = options.config;
    this.baseCam.set(...options.baseCameraPos);
    this.baseLookAt.set(...options.lookAtTarget);
    this.currentLookAt.copy(this.baseLookAt);

    this.cursorLight = new THREE.PointLight(
      new THREE.Color(this.config.palette.cursorLight),
      this.config.mode === 'playground' ? this.config.cursorLightIntensity * 2.2 : 0,
      11.5,
      1.8
    );
    this.cursorLight.position.set(-2, 1.8, 0);
    this.scene.add(this.cursorLight);

    this.syncWeatherParticles();
  }

  public applyConfig(nextConfig: EngineConfig): void {
    this.config = nextConfig;
    this.cursorLight.color.set(this.config.palette.cursorLight);
    this.cursorLight.intensity =
      this.config.mode === 'playground' ? this.config.cursorLightIntensity * 2.2 : 0;
    this.syncWeatherParticles();
  }

  public setCameraAnchors(pos: [number, number, number], lookAt: [number, number, number]): void {
    this.baseCam.set(...pos);
    this.baseLookAt.set(...lookAt);
  }

  public isRainActive(): boolean {
    return this.rainActive;
  }

  public getCursorLightWorldPosition(): THREE.Vector3 {
    return this.cursorLight.position;
  }

  private syncWeatherParticles(): void {
    const shouldRain =
      this.config.mode === 'playground' && this.config.atmosphere === 'rain';

    if (shouldRain && !this.rainPoints) {
      const count = VfxController.RAIN_COUNT;
      // Render short 2-vertex diagonal rain streaks via LineSegments-compatible Points or crisp elongated sprites:
      // Points with sizeAttenuation give crisp 1-cell diagonal ASCII rain streaks (`/` `|` `'`)!
      const positions = new Float32Array(count * 3);
      const speeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = -6 + (Math.random() - 0.5) * VfxController.RAIN_SPAN_X;
        positions[i * 3 + 1] = Math.random() * VfxController.RAIN_TOP_Y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * VfxController.RAIN_SPAN_Z;
        speeds[i] = 12.5 + Math.random() * 6.5;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        color: new THREE.Color(this.config.palette.coolAmbient).lerp(
          new THREE.Color('#AFC2D2'),
          0.45
        ),
        size: 0.14,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
      });

      this.rainPoints = new THREE.Points(geo, mat);
      this.rainPoints.name = 'WeatherRainParticles';
      this.rainPoints.frustumCulled = false;
      this.rainPositions = positions;
      this.rainSpeeds = speeds;
      this.scene.add(this.rainPoints);
    }

    this.rainActive = shouldRain;
    if (this.rainPoints) {
      this.rainPoints.visible = shouldRain;
      (this.rainPoints.material as THREE.PointsMaterial).color
        .set(this.config.palette.coolAmbient)
        .lerp(new THREE.Color('#AFC2D2'), 0.45);
    }
  }

  public update(
    camera: THREE.PerspectiveCamera,
    pointer: PointerSnapshot,
    dt: number,
    elapsed: number
  ): void {
    // 1. Mascot camera breathing (playground camera is driven by CameraFollowSystem)
    if (this.config.mode === 'mascot') {
      const smooth = 1 - Math.exp(-this.config.parallaxSmoothing * dt);
      const idleBreathY = Math.sin(elapsed * 0.55) * 0.04;
      camera.position.x += (this.baseCam.x - camera.position.x) * smooth;
      camera.position.y += (this.baseCam.y + idleBreathY - camera.position.y) * smooth;
      camera.position.z += (this.baseCam.z - camera.position.z) * smooth;
      this.currentLookAt.lerp(this.baseLookAt, smooth);
      camera.lookAt(this.currentLookAt);
    }

    // 2. Subtle interactive cursor light relative to 45-degree camera focus in playground mode
    if (this.config.mode === 'playground') {
      const anchorX = camera.position.x - 10.6;
      const anchorZ = camera.position.z - 10.6;
      const targetLightX = anchorX + pointer.normX * 7.5;
      const targetLightY = 1.85 + pointer.normY * 1.4;
      const targetLightZ = anchorZ - pointer.normY * 5.4;

      const lightLerp = 1 - Math.exp(-8.5 * dt);
      this.cursorLight.position.x += (targetLightX - this.cursorLight.position.x) * lightLerp;
      this.cursorLight.position.y += (targetLightY - this.cursorLight.position.y) * lightLerp;
      this.cursorLight.position.z += (targetLightZ - this.cursorLight.position.z) * lightLerp;

      const activeBoost = pointer.active ? 1.0 + pointer.motionSpeed * 0.35 : 0.3;
      this.cursorLight.intensity = this.config.cursorLightIntensity * 2.2 * activeBoost;
    }

    // 3. Storm rain particle advection anchored around 45-degree camera focus so rain wraps the whole view
    if (this.rainActive && this.rainPoints && this.rainPositions && this.rainSpeeds && dt > 0) {
      const pos = this.rainPositions;
      const speeds = this.rainSpeeds;
      const count = speeds.length;
      const centerX = camera.position.x - 10.0;
      const centerZ = camera.position.z - 10.0;
      const halfX = VfxController.RAIN_SPAN_X * 0.5;
      const halfZ = VfxController.RAIN_SPAN_Z * 0.5;
      const windDriftX = -2.2 * this.config.windStrength;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        pos[idx] = pos[idx]! + windDriftX * dt;
        pos[idx + 1] = pos[idx + 1]! - speeds[i]! * dt;

        if (pos[idx + 1]! < VfxController.RAIN_BOTTOM_Y) {
          pos[idx + 1] = VfxController.RAIN_TOP_Y;
          pos[idx] = centerX + (Math.random() - 0.5) * VfxController.RAIN_SPAN_X;
          pos[idx + 2] = centerZ + (Math.random() - 0.5) * VfxController.RAIN_SPAN_Z;
        } else {
          if (pos[idx]! < centerX - halfX) pos[idx] = pos[idx]! + VfxController.RAIN_SPAN_X;
          else if (pos[idx]! > centerX + halfX) pos[idx] = pos[idx]! - VfxController.RAIN_SPAN_X;
          if (pos[idx + 2]! < centerZ - halfZ) pos[idx + 2] = pos[idx + 2]! + VfxController.RAIN_SPAN_Z;
          else if (pos[idx + 2]! > centerZ + halfZ) pos[idx + 2] = pos[idx + 2]! - VfxController.RAIN_SPAN_Z;
        }
      }

      const attr = this.rainPoints.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  }

  public dispose(): void {
    if (this.cursorLight.parent) {
      this.cursorLight.parent.remove(this.cursorLight);
    }
    this.cursorLight.dispose();

    if (this.rainPoints) {
      if (this.rainPoints.parent) {
        this.rainPoints.parent.remove(this.rainPoints);
      }
      this.rainPoints.geometry.dispose();
      (this.rainPoints.material as THREE.Material).dispose();
      this.rainPoints = null;
    }
    this.rainPositions = null;
    this.rainSpeeds = null;
  }
}
