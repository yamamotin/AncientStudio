import type { EcsSystem, SystemContext } from '../animation/AnimationSystem';
import type { World } from './World';
import type { KeyboardInput } from '../input/KeyboardInput';
import type { PointerInput } from '../input/PointerInput';

export type { EcsSystem, SystemContext };

export interface SystemEntry {
  readonly priority: number;
  readonly system: EcsSystem;
}

/**
 * InputSystem (priority 10): Transfers normalized PointerInput (mouse + touch) and optional
 * KeyboardInput into ECS `InputState`, `RotationTarget`, and `AnimationState.excitement`.
 */
export class InputSystem implements EcsSystem {
  public readonly name = 'InputSystem';
  private readonly pointer: PointerInput;
  private readonly keyboard: KeyboardInput;

  constructor(pointer: PointerInput, keyboard: KeyboardInput) {
    this.pointer = pointer;
    this.keyboard = keyboard;
  }

  public update(world: World, { dt }: SystemContext): void {
    const ptr = this.pointer.sample(dt);
    const keys = this.keyboard.sampleAxes();

    const entities = world.query('InputState');
    for (const id of entities) {
      const input = world.getComponent(id, 'InputState')!;
      input.pointerX = ptr.normX;
      input.pointerY = ptr.normY;
      input.pointerActive = ptr.active;
      input.isDragging = ptr.isDown;
      input.moveX = keys.moveX;
      input.moveZ = keys.moveZ;

      const rotTarget = world.getComponent(id, 'RotationTarget');
      if (rotTarget && ptr.active) {
        const desiredYaw = ptr.normX * input.yawSensitivity + ptr.dragYaw * 0.85;
        const desiredPitch = -ptr.normY * input.pitchSensitivity + ptr.dragPitch * 0.65;

        rotTarget.targetYaw = desiredYaw;
        rotTarget.targetPitch = Math.max(
          -rotTarget.maxPitch,
          Math.min(rotTarget.maxPitch, desiredPitch)
        );
        rotTarget.targetRoll = -ptr.normX * 0.06;
      }

      const anim = world.getComponent(id, 'AnimationState');
      if (anim && ptr.motionSpeed > 0.04) {
        anim.excitement = Math.min(1, anim.excitement + ptr.motionSpeed * 0.35);
      }
    }
  }
}

/**
 * PatrolSystem (priority 15): Drives autonomous aerial drones, hover-vehicles, and orbital
 * probes along deterministic Figure-8 / Lissajous paths (`PatrolPath` -> `Transform` + `AnimationState.baseY`).
 */
export class PatrolSystem implements EcsSystem {
  public readonly name = 'PatrolSystem';

  public update(world: World, { elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'PatrolPath');
    for (const id of entities) {
      const transform = world.getComponent(id, 'Transform')!;
      const p = world.getComponent(id, 'PatrolPath')!;
      const t = elapsed * p.speed + p.phase;

      const nextX = p.originX + Math.sin(t) * p.amplitudeX;
      const nextY = p.originY + Math.sin(t * 1.7 + p.phase) * p.amplitudeY;
      const nextZ = p.originZ + Math.cos(t * 0.85) * p.amplitudeZ;

      if (p.faceTangent) {
        const vx = Math.cos(t) * p.amplitudeX * p.speed;
        const vz = -Math.sin(t * 0.85) * p.amplitudeZ * p.speed * 0.85;
        if (Math.abs(vx) + Math.abs(vz) > 0.001) {
          transform.rotY = Math.atan2(vx, vz);
          transform.rotZ = -vx * 0.045;
        }
      }

      transform.x = nextX;
      transform.y = nextY;
      transform.z = nextZ;

      const anim = world.getComponent(id, 'AnimationState');
      if (anim) {
        anim.baseY = nextY;
      }
    }
  }
}

/**
 * MovementRotationSystem (priority 20): Applies smooth exponential `lerp` toward `RotationTarget`
 * (or gentle idle sway/spin when pointer is inactive), plus bounded ground movement.
 */
export class MovementRotationSystem implements EcsSystem {
  public readonly name = 'MovementRotationSystem';
  private readonly terrainHeightFn?: (x: number, z: number) => number;

  constructor(terrainHeightFn?: (x: number, z: number) => number) {
    this.terrainHeightFn = terrainHeightFn;
  }

  public update(world: World, { dt, elapsed }: SystemContext): void {
    // 1. Smooth yaw/pitch lerp rotation
    const rotEntities = world.query('Transform', 'RotationTarget');
    for (const id of rotEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const rot = world.getComponent(id, 'RotationTarget')!;
      const input = world.getComponent(id, 'InputState');

      const damp = 1 - Math.exp(-rot.lerpSpeed * dt);
      const userControlling = Boolean(input && input.pointerActive);

      if (userControlling) {
        const diffYaw = Math.atan2(
          Math.sin(rot.targetYaw - transform.rotY),
          Math.cos(rot.targetYaw - transform.rotY)
        );
        transform.rotY += diffYaw * damp;
        transform.rotX += (rot.targetPitch - transform.rotX) * damp;
        transform.rotZ += (rot.targetRoll - transform.rotZ) * damp;
      } else if (rot.idleSpinSpeed !== 0) {
        transform.rotY += rot.idleSpinSpeed * dt;
        transform.rotX += (Math.sin(elapsed * 0.9) * 0.04 - transform.rotX) * damp;
        transform.rotZ += (0 - transform.rotZ) * damp;
      } else {
        const idleYaw = Math.sin(elapsed * 0.85) * 0.28;
        const idlePitch = Math.cos(elapsed * 0.65) * 0.06;
        transform.rotY += (idleYaw - transform.rotY) * (damp * 0.6);
        transform.rotX += (idlePitch - transform.rotX) * (damp * 0.6);
        transform.rotZ += (0 - transform.rotZ) * damp;
      }
    }

    // 2. Velocity & optional keyboard-driven cyber-runner / wanderer movement
    const movEntities = world.query('Transform', 'Velocity');
    for (const id of movEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const vel = world.getComponent(id, 'Velocity')!;
      const input = world.getComponent(id, 'InputState');
      const anim = world.getComponent(id, 'AnimationState');

      if (input && input.moveSpeed > 0 && (input.moveX !== 0 || input.moveZ !== 0)) {
        vel.vx = input.moveX * input.moveSpeed;
        vel.vz = input.moveZ * input.moveSpeed;

        const rot = world.getComponent(id, 'RotationTarget');
        if (rot) {
          rot.targetYaw = Math.atan2(vel.vx, vel.vz);
        }
        if (anim) {
          anim.excitement = Math.min(1, anim.excitement + dt * 2.5);
        }
      }

      transform.x += vel.vx * dt;
      transform.y += vel.vy * dt;
      transform.z += vel.vz * dt;
      transform.rotX += vel.angularVx * dt;
      transform.rotY += vel.angularVy * dt;
      transform.rotZ += vel.angularVz * dt;

      if (input && input.boundsRadius > 0) {
        const dist = Math.hypot(transform.x, transform.z + 1.5);
        if (dist > input.boundsRadius) {
          const ratio = input.boundsRadius / dist;
          transform.x *= ratio;
          transform.z = -1.5 + (transform.z + 1.5) * ratio;
        }
      }

      if (this.terrainHeightFn && input && input.moveSpeed > 0) {
        const groundY = this.terrainHeightFn(transform.x, transform.z);
        if (anim) {
          anim.baseY = groundY;
        } else {
          transform.y = groundY;
        }
      }

      const velDamp = Math.exp(-vel.damping * dt);
      vel.vx *= velDamp;
      vel.vy *= velDamp;
      vel.vz *= velDamp;
    }
  }
}

/**
 * WindSystem (priority 25): Applies realistic nocturnal urban canyon wind gusts & harmonic
 * sway to suspended neon banners, street lanterns, overhead power cables, and hologram totems.
 */
export class WindSystem implements EcsSystem {
  public readonly name = 'WindSystem';
  private windStrength: number;

  constructor(windStrength = 1.0) {
    this.windStrength = windStrength;
  }

  public setWindStrength(strength: number): void {
    this.windStrength = Math.max(0, Math.min(3, strength));
  }

  public update(world: World, { elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'WindSway');
    if (entities.length === 0) return;

    // Traveling street-canyon gust envelope
    const globalGust =
      (0.65 + 0.35 * Math.sin(elapsed * 0.72) + 0.22 * Math.sin(elapsed * 1.83 + 1.1)) *
      this.windStrength;

    for (const id of entities) {
      const transform = world.getComponent(id, 'Transform')!;
      const sway = world.getComponent(id, 'WindSway')!;

      const t = elapsed * sway.frequency + sway.phase;
      const flutter = Math.sin(t * 2.35 + sway.phase) * 0.28;
      const env = globalGust * sway.gustFactor;

      transform.rotZ = sway.baseRotZ + (Math.sin(t) * 0.72 + flutter + 0.35) * sway.swayAmpZ * env;
      transform.rotX = sway.baseRotX + Math.cos(t * 0.88 + sway.phase) * sway.swayAmpX * env;
      transform.rotY = sway.baseRotY + Math.sin(t * 0.55) * sway.swayAmpZ * 0.35 * env;
    }
  }
}

/**
 * NeonPulseSystem (priority 35): Drives cyberpunk holographic signs, neon pylons, and
 * core reactor harmonic pulses + subtle sign glitching (`NeonBeacon` + `Renderable`).
 */
export class NeonPulseSystem implements EcsSystem {
  public readonly name = 'NeonPulseSystem';

  public update(world: World, { elapsed }: SystemContext): void {
    const entities = world.query('NeonBeacon');
    for (const id of entities) {
      const beacon = world.getComponent(id, 'NeonBeacon')!;
      const wave =
        Math.sin(elapsed * beacon.pulseSpeed + beacon.phase) * 0.65 +
        Math.sin(elapsed * beacon.pulseSpeed * 2.37 + beacon.phase * 1.7) * 0.35;

      // Subtle deterministic neon tube micro-flicker when glitchRate > 0
      let glitch = 1.0;
      if (beacon.glitchRate && beacon.glitchRate > 0) {
        const hash = Math.sin(Math.floor(elapsed * 14 + beacon.phase * 10) * 91.7) * 43758.5453;
        const frac = hash - Math.floor(hash);
        if (frac < beacon.glitchRate * 0.12) {
          glitch = 0.42;
        }
      }

      const factor = Math.max(0.2, (1 + wave * beacon.pulseAmplitude) * glitch);

      if (beacon.emissiveMaterial) {
        beacon.emissiveIntensityCache = beacon.baseEmissiveIntensity * factor;
        beacon.emissiveMaterial.emissiveIntensity = beacon.emissiveIntensityCache;
      }

      const renderable = world.getComponent(id, 'Renderable');
      if (renderable?.pointLight && renderable.baseLightIntensity !== undefined) {
        renderable.pointLight.intensity = renderable.baseLightIntensity * factor;
      }
    }
  }
}

declare module './World' {
  interface NeonBeaconComponent {
    emissiveIntensityCache?: number;
  }
}

/**
 * RenderSyncSystem (priority 40): Synchronizes pure ECS `Transform` & `Renderable` state
 * onto Three.js `Object3D` transforms and dynamic `PointLight` position/flicker.
 */
export class RenderSyncSystem implements EcsSystem {
  public readonly name = 'RenderSyncSystem';

  public update(world: World, { elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'Renderable');
    for (const id of entities) {
      const t = world.getComponent(id, 'Transform')!;
      const r = world.getComponent(id, 'Renderable')!;

      r.object3D.position.set(t.x, t.y, t.z);
      r.object3D.rotation.set(t.rotX, t.rotY, t.rotZ);
      r.object3D.scale.set(t.scaleX, t.scaleY, t.scaleZ);

      if (r.pointLight) {
        // Keep attached pointLights synced when patrol drones / beacons move
        if (!world.hasComponent(id, 'NeonBeacon') && r.baseLightIntensity !== undefined) {
          const speed = r.lightFlickerSpeed ?? 7.2;
          const flicker =
            1 +
            Math.sin(elapsed * speed + id * 1.7) * 0.12 +
            Math.sin(elapsed * speed * 2.13 + id) * 0.06;
          r.pointLight.intensity = r.baseLightIntensity * flicker;
        }
      }
    }
  }
}

/**
 * SystemRunner: Deterministic priority-sorted pipeline executor over an ECS `World`.
 * Lower `priority` numbers execute first; ties preserve registration order.
 */
export class SystemRunner {
  private readonly entries: Array<{ priority: number; order: number; system: EcsSystem }> = [];
  private nextOrder = 0;

  public addSystem(system: EcsSystem, priority?: number): this {
    const resolvedPriority = priority ?? (this.entries.length + 1) * 10;
    this.entries.push({
      priority: resolvedPriority,
      order: this.nextOrder++,
      system,
    });
    this.entries.sort((a, b) =>
      a.priority !== b.priority ? a.priority - b.priority : a.order - b.order
    );
    return this;
  }

  public removeSystem(name: string): boolean {
    const idx = this.entries.findIndex((e) => e.system.name === name);
    if (idx === -1) return false;
    this.entries.splice(idx, 1);
    return true;
  }

  public getSystemNames(): string[] {
    return this.entries.map((e) => e.system.name);
  }

  public run(world: World, context: SystemContext): void {
    for (let i = 0; i < this.entries.length; i++) {
      this.entries[i]!.system.update(world, context);
    }
  }

  public clear(): void {
    this.entries.length = 0;
    this.nextOrder = 0;
  }
}
