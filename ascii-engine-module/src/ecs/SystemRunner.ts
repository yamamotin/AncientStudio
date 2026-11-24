import type { EcsSystem, SystemContext } from '../animation/AnimationSystem';
import type { World } from './World';
import type { KeyboardInput } from '../input/KeyboardInput';
import type { PointerInput } from '../input/PointerInput';

export type { EcsSystem, SystemContext };

/**
 * InputSystem: Transfers normalized PointerInput (mouse + touch) and optional KeyboardInput
 * into ECS `InputState`, `RotationTarget`, and `AnimationState.excitement` components.
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
      input.isDown_compat = ptr.isDown;
      input.isDragging = ptr.isDown;
      input.moveX = keys.moveX;
      input.moveZ = keys.moveZ;

      const rotTarget = world.getComponent(id, 'RotationTarget');
      if (rotTarget && ptr.active) {
        // Combine hover angle + touch/mouse drag accumulation smoothly
        const desiredYaw = ptr.normX * input.yawSensitivity + ptr.dragYaw * 0.85;
        // Positive normY = cursor up -> look slightly up (negative X rotation in right-handed Three.js)
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

// Allow optional internal property without polluting public interface
declare module './World' {
  interface InputStateComponent {
    isDown_compat?: boolean;
  }
}

/**
 * MovementRotationSystem: Applies smooth exponential `lerp` toward `RotationTarget`
 * (or gentle idle sway/spin when pointer is inactive), plus optional bounded playground movement.
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
        // Shortest-angle wrap for yaw if entity previously spun multiple turns
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
        // Gentle idle look-around sway for mascot when mouse leaves page
        const idleYaw = Math.sin(elapsed * 0.85) * 0.28;
        const idlePitch = Math.cos(elapsed * 0.65) * 0.06;
        transform.rotY += (idleYaw - transform.rotY) * (damp * 0.6);
        transform.rotX += (idlePitch - transform.rotX) * (damp * 0.6);
        transform.rotZ += (0 - transform.rotZ) * damp;
      }
    }

    // 2. Velocity & optional keyboard-driven playground wanderer movement
    const movEntities = world.query('Transform', 'Velocity');
    for (const id of movEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const vel = world.getComponent(id, 'Velocity')!;
      const input = world.getComponent(id, 'InputState');
      const anim = world.getComponent(id, 'AnimationState');

      if (input && input.moveSpeed > 0 && (input.moveX !== 0 || input.moveZ !== 0)) {
        vel.vx = input.moveX * input.moveSpeed;
        vel.vz = input.moveZ * input.moveSpeed;

        // Face movement direction smoothly
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

      // Clamp to island playground radius if configured
      if (input && input.boundsRadius > 0) {
        const dist = Math.hypot(transform.x, transform.z + 1.5);
        if (dist > input.boundsRadius) {
          const ratio = input.boundsRadius / dist;
          transform.x *= ratio;
          transform.z = -1.5 + (transform.z + 1.5) * ratio;
        }
      }

      // Snap base elevation to terrain height if terrain callback provided
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
 * RenderSyncSystem: Synchronizes pure ECS `Transform` & `Renderable` state
 * onto Three.js `Object3D` transforms and dynamic `PointLight` flicker.
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

      if (r.pointLight && r.baseLightIntensity !== undefined) {
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

/**
 * SystemRunner: Deterministic ordered pipeline executor over an ECS `World`.
 */
export class SystemRunner {
  private readonly systems: EcsSystem[] = [];

  public addSystem(system: EcsSystem): this {
    this.systems.push(system);
    return this;
  }

  public run(world: World, context: SystemContext): void {
    for (let i = 0; i < this.systems.length; i++) {
      this.systems[i]!.update(world, context);
    }
  }

  public clear(): void {
    this.systems.length = 0;
  }
}
