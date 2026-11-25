import * as THREE from 'three';
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
 * InputSystem (priority 10): Transfers normalized PointerInput (mouse + touch), discrete
 * click/tap ground raycasts (`NavigationTarget`), and optional KeyboardInput into ECS state.
 * Uses pre-allocated Three.js math primitives for zero per-frame heap allocations.
 */
export class InputSystem implements EcsSystem {
  public readonly name = 'InputSystem';
  private readonly pointer: PointerInput;
  private readonly keyboard: KeyboardInput;
  private camera: THREE.Camera | null;

  private readonly raycaster = new THREE.Raycaster();
  private readonly tapNdc = new THREE.Vector2();
  private readonly groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private readonly groundHit = new THREE.Vector3();

  constructor(pointer: PointerInput, keyboard: KeyboardInput, camera: THREE.Camera | null = null) {
    this.pointer = pointer;
    this.keyboard = keyboard;
    this.camera = camera;
  }

  public setCamera(camera: THREE.Camera | null): void {
    this.camera = camera;
  }

  public update(world: World, { dt }: SystemContext): void {
    const ptr = this.pointer.sample(dt);
    const tap = this.pointer.consumeTap();
    const keys = this.keyboard.sampleAxes();
    const hasKeyMove = Math.abs(keys.moveX) > 0.01 || Math.abs(keys.moveZ) > 0.01;

    if (tap) {
      const navEntities = world.query('Transform', 'NavigationTarget');
      for (const id of navEntities) {
        const transform = world.getComponent(id, 'Transform')!;
        const nav = world.getComponent(id, 'NavigationTarget')!;
        const anim = world.getComponent(id, 'AnimationState');
        const groundY = anim ? anim.baseY : transform.y;

        let targetX = transform.x + tap.ndcX * 3.5;
        let targetZ = transform.z - tap.ndcY * 4.5;

        if (this.camera) {
          this.camera.updateMatrixWorld();
          this.tapNdc.set(tap.ndcX, tap.ndcY);
          this.raycaster.setFromCamera(this.tapNdc, this.camera);
          this.groundPlane.constant = -groundY;

          if (this.raycaster.ray.direction.y < -0.025) {
            const hit = this.raycaster.ray.intersectPlane(this.groundPlane, this.groundHit);
            if (hit) {
              targetX = hit.x;
              targetZ = hit.z;
            }
          } else {
            // Above-horizon tap: project forward along horizontal camera ray into walkable boulevard
            const dirX = this.raycaster.ray.direction.x;
            const dirZ = this.raycaster.ray.direction.z;
            const horizLen = Math.hypot(dirX, dirZ) || 1;
            targetX = this.raycaster.ray.origin.x + (dirX / horizLen) * 14.0;
            targetZ = this.raycaster.ray.origin.z + (dirZ / horizLen) * 14.0;
          }
        }

        nav.targetX = Math.max(nav.minX, Math.min(nav.maxX, targetX));
        nav.targetZ = Math.max(nav.minZ, Math.min(nav.maxZ, targetZ));
        nav.active = true;
      }
    }

    const entities = world.query('InputState');
    for (const id of entities) {
      const input = world.getComponent(id, 'InputState')!;
      const nav = world.getComponent(id, 'NavigationTarget');
      input.pointerX = ptr.normX;
      input.pointerY = ptr.normY;
      input.pointerActive = ptr.active;
      input.isDragging = ptr.isDown;
      input.moveX = keys.moveX;
      input.moveZ = keys.moveZ;

      if (hasKeyMove && nav) {
        nav.active = false;
      }

      const rotTarget = world.getComponent(id, 'RotationTarget');
      if (rotTarget && ptr.active && !nav) {
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
        anim.excitement = Math.min(1, anim.excitement + ptr.motionSpeed * 0.25);
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
 * MovementRotationSystem (priority 20): Resolves click/tap `NavigationTarget` ground locomotion,
 * optional keyboard movement, bounded stage clamping, and smooth exponential `RotationTarget` yaw/pitch.
 */
export class MovementRotationSystem implements EcsSystem {
  public readonly name = 'MovementRotationSystem';
  private readonly terrainHeightFn?: (x: number, z: number) => number;
  private waypointMarker: THREE.Object3D | null;

  constructor(
    terrainHeightFn?: (x: number, z: number) => number,
    waypointMarker: THREE.Object3D | null = null
  ) {
    this.terrainHeightFn = terrainHeightFn;
    this.waypointMarker = waypointMarker;
  }

  public setWaypointMarker(marker: THREE.Object3D | null): void {
    this.waypointMarker = marker;
  }

  public update(world: World, { dt, elapsed }: SystemContext): void {
    let activeWaypointX = 0;
    let activeWaypointZ = 0;
    let activeWaypointY = 0.025;
    let hasActiveWaypoint = false;

    // 1. Click/tap ground navigation (`NavigationTarget`) + Velocity / optional keyboard locomotion
    const movEntities = world.query('Transform', 'Velocity');
    for (const id of movEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const vel = world.getComponent(id, 'Velocity')!;
      const input = world.getComponent(id, 'InputState');
      const nav = world.getComponent(id, 'NavigationTarget');
      const anim = world.getComponent(id, 'AnimationState');
      const rot = world.getComponent(id, 'RotationTarget');

      if (input && input.moveSpeed > 0 && (input.moveX !== 0 || input.moveZ !== 0)) {
        if (nav) nav.active = false;
        vel.vx = input.moveX * input.moveSpeed;
        vel.vz = input.moveZ * input.moveSpeed;

        if (rot) {
          rot.targetYaw = Math.atan2(vel.vx, vel.vz);
          rot.targetPitch = 0;
          rot.targetRoll = 0;
        }
        if (anim) {
          anim.excitement = Math.min(1, anim.excitement + dt * 2.0);
        }

        transform.x += vel.vx * dt;
        transform.y += vel.vy * dt;
        transform.z += vel.vz * dt;

        const velDamp = Math.exp(-vel.damping * dt);
        vel.vx *= velDamp;
        vel.vy *= velDamp;
        vel.vz *= velDamp;
      } else if (nav && nav.active) {
        const dx = nav.targetX - transform.x;
        const dz = nav.targetZ - transform.z;
        const dist = Math.hypot(dx, dz);

        if (dist <= nav.arrivalRadius) {
          transform.x = nav.targetX;
          transform.z = nav.targetZ;
          vel.vx = 0;
          vel.vz = 0;
          nav.active = false;
        } else {
          // Smooth arrival deceleration ramp inside the final 0.65m prevents overshoot
          const arrivalRamp = Math.min(1, Math.max(0.30, dist / 0.65));
          const desiredSpeed = nav.moveSpeed * arrivalRamp;
          const dirX = dx / dist;
          const dirZ = dz / dist;
          const step = Math.min(dist, desiredSpeed * dt);

          vel.vx = dirX * desiredSpeed;
          vel.vz = dirZ * desiredSpeed;
          transform.x += dirX * step;
          transform.z += dirZ * step;

          if (rot) {
            rot.targetYaw = Math.atan2(dirX, dirZ);
            rot.targetPitch = 0;
            rot.targetRoll = 0;
          }
          if (anim) {
            anim.excitement = Math.min(1, anim.excitement + dt * 1.4);
          }

          const remaining = Math.hypot(nav.targetX - transform.x, nav.targetZ - transform.z);
          if (remaining <= nav.arrivalRadius) {
            transform.x = nav.targetX;
            transform.z = nav.targetZ;
            vel.vx = 0;
            vel.vz = 0;
            nav.active = false;
          } else {
            hasActiveWaypoint = true;
            activeWaypointX = nav.targetX;
            activeWaypointZ = nav.targetZ;
          }
        }
      } else {
        transform.x += vel.vx * dt;
        transform.y += vel.vy * dt;
        transform.z += vel.vz * dt;

        const velDamp = Math.exp(-vel.damping * dt);
        vel.vx *= velDamp;
        vel.vy *= velDamp;
        vel.vz *= velDamp;
        if (Math.hypot(vel.vx, vel.vz) < 0.02) {
          vel.vx = 0;
          vel.vz = 0;
        }
      }

      transform.rotX += vel.angularVx * dt;
      transform.rotY += vel.angularVy * dt;
      transform.rotZ += vel.angularVz * dt;

      if (nav) {
        transform.x = Math.max(nav.minX, Math.min(nav.maxX, transform.x));
        transform.z = Math.max(nav.minZ, Math.min(nav.maxZ, transform.z));
      } else if (input && input.boundsRadius > 0) {
        const dist = Math.hypot(transform.x, transform.z + 1.5);
        if (dist > input.boundsRadius) {
          const ratio = input.boundsRadius / dist;
          transform.x *= ratio;
          transform.z = -1.5 + (transform.z + 1.5) * ratio;
        }
      }

      if (this.terrainHeightFn && (nav || (input && input.moveSpeed > 0))) {
        const groundY = this.terrainHeightFn(transform.x, transform.z);
        if (anim) {
          anim.baseY = groundY;
        } else {
          transform.y = groundY;
        }
        if (hasActiveWaypoint) {
          activeWaypointY = this.terrainHeightFn(activeWaypointX, activeWaypointZ) + 0.025;
        }
      }
    }

    if (this.waypointMarker) {
      this.waypointMarker.visible = hasActiveWaypoint;
      if (hasActiveWaypoint) {
        this.waypointMarker.position.set(activeWaypointX, activeWaypointY, activeWaypointZ);
        const pulse = 0.92 + Math.sin(elapsed * 5.0) * 0.08;
        this.waypointMarker.scale.set(pulse, 1, pulse);
      }
    }

    // 2. Smooth yaw/pitch lerp rotation
    const rotEntities = world.query('Transform', 'RotationTarget');
    for (const id of rotEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const rot = world.getComponent(id, 'RotationTarget')!;
      const input = world.getComponent(id, 'InputState');
      const nav = world.getComponent(id, 'NavigationTarget');
      const vel = world.getComponent(id, 'Velocity');

      const damp = 1 - Math.exp(-rot.lerpSpeed * dt);
      const isLocomoting = Boolean(
        (nav && nav.active) || (vel && Math.hypot(vel.vx, vel.vz) > 0.05)
      );

      if (nav) {
        // Navigable avatar faces walking heading smoothly and holds arrival orientation calmly
        const idleBreathYaw = isLocomoting ? 0 : Math.sin(elapsed * 0.75) * 0.035;
        const desiredYaw = rot.targetYaw + idleBreathYaw;
        const diffYaw = Math.atan2(
          Math.sin(desiredYaw - transform.rotY),
          Math.cos(desiredYaw - transform.rotY)
        );
        transform.rotY += diffYaw * damp;
        transform.rotX += (rot.targetPitch - transform.rotX) * damp;
        transform.rotZ += (rot.targetRoll - transform.rotZ) * damp;
      } else if (input && input.pointerActive) {
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
 * CameraFollowSystem (priority 38): Keeps the active `THREE.PerspectiveCamera` stably centered
 * on and smoothly accompanying the primary `CameraFollow` entity across the stage ground,
 * using `deltaTime` exponential damping and zero per-frame allocations.
 */
export class CameraFollowSystem implements EcsSystem {
  public readonly name = 'CameraFollowSystem';
  private camera: THREE.PerspectiveCamera | null;
  private readonly lookTarget = new THREE.Vector3();

  constructor(camera: THREE.PerspectiveCamera | null = null) {
    this.camera = camera;
  }

  public setCamera(camera: THREE.PerspectiveCamera | null): void {
    this.camera = camera;
  }

  public update(world: World, { dt }: SystemContext): void {
    if (!this.camera) return;

    const entities = world.query('Transform', 'CameraFollow');
    if (entities.length === 0) return;

    const id = entities[0]!;
    const transform = world.getComponent(id, 'Transform')!;
    const follow = world.getComponent(id, 'CameraFollow')!;
    const anim = world.getComponent(id, 'AnimationState');

    const anchorY = anim ? anim.baseY : transform.y;
    const desiredX = transform.x + follow.offsetX;
    const desiredY = anchorY + follow.offsetY;
    const desiredZ = transform.z + follow.offsetZ;

    if (!follow.initialized || dt <= 0) {
      this.camera.position.set(desiredX, desiredY, desiredZ);
      follow.initialized = true;
    } else {
      const alpha = 1 - Math.exp(-follow.followSharpness * dt);
      this.camera.position.x += (desiredX - this.camera.position.x) * alpha;
      this.camera.position.y += (desiredY - this.camera.position.y) * alpha;
      this.camera.position.z += (desiredZ - this.camera.position.z) * alpha;
    }

    this.lookTarget.set(transform.x, anchorY + follow.lookAtOffsetY, transform.z);
    this.camera.lookAt(this.lookTarget);
    this.camera.updateMatrixWorld();
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
