import * as THREE from 'three';
import type { SidewalkBoundsComponent, World } from './World';
import type { KeyboardInput } from '../input/KeyboardInput';
import type { PointerInput } from '../input/PointerInput';

export interface SystemContext {
  dt: number;
  elapsed: number;
}

export interface EcsSystem {
  readonly name: string;
  update(world: World, context: SystemContext): void;
}

export interface SystemEntry {
  readonly priority: number;
  readonly system: EcsSystem;
}

/**
 * Clamps a candidate `(x, z)` coordinate onto the walkable urban sidewalk of `Cidade_Sketchfab_model`
 * using `THREE.MathUtils.clamp` and sidewalk furniture AABB resolution so `Player_Rig` never crosses
 * building walls or steps off the curb into the void/roadbed.
 */
export function clampToSidewalkBounds(
  x: number,
  z: number,
  bounds: SidewalkBoundsComponent
): { x: number; z: number } {
  let clampedX = THREE.MathUtils.clamp(x, bounds.minX, bounds.maxX);
  let clampedZ = THREE.MathUtils.clamp(z, bounds.minZ, bounds.maxZ);

  // Outside the central sidewalk plaza (`x < plazaMinX` or `x > plazaMaxX`), constrain Z to the
  // continuous East-West sidewalk promenade (`corridorMinZ .. corridorMaxZ`).
  if (clampedX < bounds.plazaMinX || clampedX > bounds.plazaMaxX) {
    const localMinZ =
      clampedX >= bounds.westStorefrontMinX && clampedX <= bounds.westStorefrontMaxX
        ? bounds.westStorefrontMinZ
        : bounds.corridorMinZ;
    clampedZ = THREE.MathUtils.clamp(clampedZ, localMinZ, bounds.corridorMaxZ);
  }

  // Smoothly push out of any sidewalk kiosk/planter AABBs along the shallowest penetration axis
  for (let i = 0; i < bounds.obstacles.length; i++) {
    const box = bounds.obstacles[i]!;
    if (
      clampedX > box.minX &&
      clampedX < box.maxX &&
      clampedZ > box.minZ &&
      clampedZ < box.maxZ
    ) {
      const pushLeft = clampedX - box.minX;
      const pushRight = box.maxX - clampedX;
      const pushBack = clampedZ - box.minZ;
      const pushFront = box.maxZ - clampedZ;
      const minPush = Math.min(pushLeft, pushRight, pushBack, pushFront);

      if (minPush === pushLeft) clampedX = box.minX;
      else if (minPush === pushRight) clampedX = box.maxX;
      else if (minPush === pushBack) clampedZ = box.minZ;
      else clampedZ = box.maxZ;
    }
  }

  // Final outer safety clamp via THREE.MathUtils.clamp
  clampedX = THREE.MathUtils.clamp(clampedX, bounds.minX, bounds.maxX);
  clampedZ = THREE.MathUtils.clamp(clampedZ, bounds.minZ, bounds.maxZ);

  return { x: clampedX, z: clampedZ };
}

/**
 * InputSystem (priority 10): Transfers `KeyboardInput` (`WASD` movement + `E` interaction)
 * and passive `PointerInput` (ground click/tap raycasts + mascot hover) into ECS components.
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
    const wheelDelta = this.pointer.consumeWheelDelta();
    const keys = this.keyboard.sampleAxes();
    const hasKeyMove = Math.abs(keys.moveX) > 0.01 || Math.abs(keys.moveZ) > 0.01;

    if (wheelDelta !== 0) {
      const camEntities = world.query('CameraFollow');
      for (const camId of camEntities) {
        const follow = world.getComponent(camId, 'CameraFollow')!;
        const baseDx = follow.offsetX - follow.lookAtOffsetX;
        const baseDy = follow.offsetY - follow.lookAtOffsetY;
        const baseDz = follow.offsetZ - follow.lookAtOffsetZ;
        const baseDist = Math.hypot(baseDx, baseDy, baseDz) || 19.65;
        const minDist = follow.minDistance ?? 8.2;
        const maxDist = follow.maxDistance ?? 31.5;
        const stepSpeed = follow.zoomSpeed ?? 2.15;
        const prevTarget = follow.targetDistance ?? baseDist;
        follow.targetDistance = THREE.MathUtils.clamp(
          prevTarget + wheelDelta * stepSpeed,
          minDist,
          maxDist
        );
      }
    }

    if (tap && !hasKeyMove) {
      const navEntities = world.query('Transform', 'NavigationTarget');
      for (const id of navEntities) {
        const transform = world.getComponent(id, 'Transform')!;
        const nav = world.getComponent(id, 'NavigationTarget')!;
        const sidewalk = world.getComponent(id, 'SidewalkBounds');
        const groundY = sidewalk ? sidewalk.groundY : transform.y;

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
            const dirX = this.raycaster.ray.direction.x;
            const dirZ = this.raycaster.ray.direction.z;
            const horizLen = Math.hypot(dirX, dirZ) || 1;
            targetX = this.raycaster.ray.origin.x + (dirX / horizLen) * 10.0;
            targetZ = this.raycaster.ray.origin.z + (dirZ / horizLen) * 10.0;
          }
        }

        if (sidewalk) {
          const clamped = clampToSidewalkBounds(targetX, targetZ, sidewalk);
          nav.targetX = clamped.x;
          nav.targetZ = clamped.z;
        } else {
          nav.targetX = THREE.MathUtils.clamp(targetX, nav.minX, nav.maxX);
          nav.targetZ = THREE.MathUtils.clamp(targetZ, nav.minZ, nav.maxZ);
        }
        nav.active = true;
      }
    }

    const entities = world.query('InputState');
    for (const id of entities) {
      const input = world.getComponent(id, 'InputState')!;
      const nav = world.getComponent(id, 'NavigationTarget');
      const charAnim = world.getComponent(id, 'CharacterAnimation');

      input.pointerX = ptr.normX;
      input.pointerY = ptr.normY;
      input.pointerActive = ptr.active;
      input.isDragging = ptr.isDown;
      input.moveX = keys.moveX;
      input.moveZ = keys.moveZ;

      if (hasKeyMove && nav) {
        nav.active = false;
      }

      if (keys.interactPressed && charAnim) {
        charAnim.interactRequested = true;
        if (nav) nav.active = false;
      }

      const rotTarget = world.getComponent(id, 'RotationTarget');
      if (rotTarget && ptr.active && !nav && !charAnim) {
        const desiredYaw = ptr.normX * input.yawSensitivity + ptr.dragYaw * 0.85;
        const desiredPitch = -ptr.normY * input.pitchSensitivity + ptr.dragPitch * 0.65;

        rotTarget.targetYaw = desiredYaw;
        rotTarget.targetPitch = THREE.MathUtils.clamp(
          desiredPitch,
          -rotTarget.maxPitch,
          rotTarget.maxPitch
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
 * TrafficFlowSystem (priority 15): Drives `Carro_Grupo` along the left lateral avenue on a
 * deterministic 30-second cycle:
 *  - `[0s .. 8s)`: `visible = true`, straight-line constant low speed along `laneX` from `startZ`
 *    to `endZ`, with attached headlight `SpotLight`s and `PointLight` illuminating asphalt & buildings.
 *  - `[8s .. 30s)`: `visible = false` and headlights off (`intensity = 0`) out of frame until the
 *    cycle restarts at `30s`.
 */
export class TrafficFlowSystem implements EcsSystem {
  public readonly name = 'TrafficFlowSystem';

  public update(world: World, { elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'TrafficCycle', 'Renderable');

    for (const id of entities) {
      const transform = world.getComponent(id, 'Transform')!;
      const cycle = world.getComponent(id, 'TrafficCycle')!;
      const renderable = world.getComponent(id, 'Renderable')!;

      const period = Math.max(0.1, cycle.cycleDuration);
      const activeWin = THREE.MathUtils.clamp(cycle.activeDuration, 0.05, period);
      const rawPhase = (elapsed + cycle.timeOffset) % period;
      const tCycle = rawPhase < 0 ? rawPhase + period : rawPhase;

      const isActive = tCycle < activeWin;

      if (isActive) {
        const progress = tCycle / activeWin;
        const currentZ = THREE.MathUtils.lerp(cycle.startZ, cycle.endZ, progress);

        // Smooth 0.35s envelope at entry/exit avoids abrupt light pop while keeping steady cruise
        const fadeIn = THREE.MathUtils.clamp(tCycle / 0.35, 0.15, 1.0);
        const fadeOut = THREE.MathUtils.clamp((activeWin - tCycle) / 0.35, 0.15, 1.0);
        const envelope = Math.min(fadeIn, fadeOut);

        transform.x = cycle.laneX;
        transform.y = cycle.laneY;
        transform.z = currentZ;
        transform.rotY = cycle.headingYaw;

        renderable.object3D.visible = true;

        if (cycle.headlightLeft) {
          cycle.headlightLeft.visible = true;
          cycle.headlightLeft.intensity = cycle.baseSpotIntensity * envelope;
        }
        if (cycle.headlightRight) {
          cycle.headlightRight.visible = true;
          cycle.headlightRight.intensity = cycle.baseSpotIntensity * envelope;
        }
        if (cycle.streetThrowLight) {
          cycle.streetThrowLight.visible = true;
          cycle.streetThrowLight.intensity = cycle.basePointIntensity * envelope;
        }
        if (cycle.taillightGlow) {
          cycle.taillightGlow.visible = true;
          cycle.taillightGlow.intensity = cycle.baseTailIntensity * envelope;
        }
        if (cycle.headlightEmitterGroup) {
          cycle.headlightEmitterGroup.visible = true;
        }
        if (cycle.headlightLensMaterial) {
          cycle.headlightLensMaterial.emissiveIntensity =
            (cycle.baseLensEmissive ?? 3.8) * envelope;
        }
        if (cycle.headlightHaloMaterial) {
          cycle.headlightHaloMaterial.opacity = (cycle.baseHaloOpacity ?? 0.62) * envelope;
        }
        if (cycle.headlightConeMaterial) {
          cycle.headlightConeMaterial.opacity = (cycle.baseConeOpacity ?? 0.22) * envelope;
        }
        if (cycle.headlightRoadPoolMaterial) {
          // Fade road-surface specular glaze smoothly before the avenue roadbed ends near z = 20m
          const roadBedKeep = 1.0 - THREE.MathUtils.smoothstep(currentZ, 12.5, 19.2);
          cycle.headlightRoadPoolMaterial.opacity =
            (cycle.baseRoadPoolOpacity ?? 0.34) * envelope * roadBedKeep;
        }
        if (cycle.headlightMaterials) {
          for (const mat of cycle.headlightMaterials) {
            mat.emissiveIntensity = (cycle.baseLensEmissive ?? 3.8) * 0.42 * envelope;
          }
        }
      } else {
        // Hidden phase (22s): keep vehicle & lights off and parked outside the camera frustum
        renderable.object3D.visible = false;
        transform.x = cycle.laneX;
        transform.y = cycle.laneY;
        transform.z = cycle.startZ - 24.0;

        if (cycle.headlightLeft) {
          cycle.headlightLeft.visible = false;
          cycle.headlightLeft.intensity = 0;
        }
        if (cycle.headlightRight) {
          cycle.headlightRight.visible = false;
          cycle.headlightRight.intensity = 0;
        }
        if (cycle.streetThrowLight) {
          cycle.streetThrowLight.visible = false;
          cycle.streetThrowLight.intensity = 0;
        }
        if (cycle.taillightGlow) {
          cycle.taillightGlow.visible = false;
          cycle.taillightGlow.intensity = 0;
        }
        if (cycle.headlightEmitterGroup) {
          cycle.headlightEmitterGroup.visible = false;
        }
        if (cycle.headlightLensMaterial) {
          cycle.headlightLensMaterial.emissiveIntensity = 0;
        }
        if (cycle.headlightHaloMaterial) {
          cycle.headlightHaloMaterial.opacity = 0;
        }
        if (cycle.headlightConeMaterial) {
          cycle.headlightConeMaterial.opacity = 0;
        }
        if (cycle.headlightRoadPoolMaterial) {
          cycle.headlightRoadPoolMaterial.opacity = 0;
        }
        if (cycle.headlightMaterials) {
          for (const mat of cycle.headlightMaterials) {
            mat.emissiveIntensity = 0;
          }
        }
      }
    }
  }
}

/**
 * MovementRotationSystem (priority 20): Resolves `WASD` planar movement on `Player_Rig`
 * (plus click/tap `NavigationTarget`), enforces `THREE.MathUtils.clamp` sidewalk boundaries,
 * and smoothly rotates `Player_Rig` toward its travel direction.
 */
export class MovementRotationSystem implements EcsSystem {
  public readonly name = 'MovementRotationSystem';
  private waypointMarker: THREE.Object3D | null;

  constructor(waypointMarker: THREE.Object3D | null = null) {
    this.waypointMarker = waypointMarker;
  }

  public setWaypointMarker(marker: THREE.Object3D | null): void {
    this.waypointMarker = marker;
  }

  public update(world: World, { dt, elapsed }: SystemContext): void {
    let activeWaypointX = 0;
    let activeWaypointZ = 0;
    let activeWaypointY = 0.1;
    let hasActiveWaypoint = false;

    const movEntities = world.query('Transform', 'Velocity');
    for (const id of movEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const vel = world.getComponent(id, 'Velocity')!;
      const input = world.getComponent(id, 'InputState');
      const nav = world.getComponent(id, 'NavigationTarget');
      const sidewalk = world.getComponent(id, 'SidewalkBounds');
      const charAnim = world.getComponent(id, 'CharacterAnimation');
      const rot = world.getComponent(id, 'RotationTarget');

      const isCastingLocked = Boolean(charAnim && charAnim.activeClip === 'Casting');

      if (isCastingLocked) {
        vel.vx = 0;
        vel.vz = 0;
        if (nav) nav.active = false;
      } else if (
        input &&
        input.moveSpeed > 0 &&
        (Math.abs(input.moveX) > 0.001 || Math.abs(input.moveZ) > 0.001)
      ) {
        if (nav) nav.active = false;
        vel.vx = input.moveX * input.moveSpeed;
        vel.vz = input.moveZ * input.moveSpeed;

        if (rot) {
          rot.targetYaw = Math.atan2(vel.vx, vel.vz);
          rot.targetPitch = 0;
          rot.targetRoll = 0;
        }

        transform.x += vel.vx * dt;
        transform.z += vel.vz * dt;
      } else if (nav && nav.active) {
        const prevX = transform.x;
        const prevZ = transform.z;
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
          const arrivalRamp = THREE.MathUtils.clamp(dist / 0.65, 0.35, 1.0);
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

          if (sidewalk) {
            const clampedStep = clampToSidewalkBounds(transform.x, transform.z, sidewalk);
            const movedDist = Math.hypot(clampedStep.x - prevX, clampedStep.z - prevZ);
            transform.x = clampedStep.x;
            transform.z = clampedStep.z;
            if (dt > 0.001 && movedDist < step * 0.15) {
              // Stop cleanly if a sidewalk corner blocks the straight segment
              vel.vx = 0;
              vel.vz = 0;
              nav.active = false;
            }
          }

          const remaining = Math.hypot(nav.targetX - transform.x, nav.targetZ - transform.z);
          if (remaining <= nav.arrivalRadius) {
            transform.x = nav.targetX;
            transform.z = nav.targetZ;
            vel.vx = 0;
            vel.vz = 0;
            nav.active = false;
          } else if (nav.active) {
            hasActiveWaypoint = true;
            activeWaypointX = nav.targetX;
            activeWaypointZ = nav.targetZ;
          }
        }
      } else {
        const velDamp = Math.exp(-vel.damping * dt);
        vel.vx *= velDamp;
        vel.vy *= velDamp;
        vel.vz *= velDamp;
        if (Math.hypot(vel.vx, vel.vz) < 0.03) {
          vel.vx = 0;
          vel.vz = 0;
        }
        transform.x += vel.vx * dt;
        transform.y += vel.vy * dt;
        transform.z += vel.vz * dt;
      }

      transform.rotX += vel.angularVx * dt;
      transform.rotY += vel.angularVy * dt;
      transform.rotZ += vel.angularVz * dt;

      if (sidewalk) {
        const clamped = clampToSidewalkBounds(transform.x, transform.z, sidewalk);
        transform.x = clamped.x;
        transform.z = clamped.z;
        transform.y = sidewalk.groundY;
        activeWaypointY = sidewalk.groundY + 0.025;
      } else if (nav) {
        transform.x = THREE.MathUtils.clamp(transform.x, nav.minX, nav.maxX);
        transform.z = THREE.MathUtils.clamp(transform.z, nav.minZ, nav.maxZ);
      } else if (input && input.boundsRadius > 0) {
        const dist = Math.hypot(transform.x, transform.z);
        if (dist > input.boundsRadius) {
          const ratio = input.boundsRadius / dist;
          transform.x *= ratio;
          transform.z *= ratio;
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

    // Smooth shortest-arc yaw/pitch rotation
    const rotEntities = world.query('Transform', 'RotationTarget');
    for (const id of rotEntities) {
      const transform = world.getComponent(id, 'Transform')!;
      const rot = world.getComponent(id, 'RotationTarget')!;
      const input = world.getComponent(id, 'InputState');
      const nav = world.getComponent(id, 'NavigationTarget');
      const charAnim = world.getComponent(id, 'CharacterAnimation');

      const damp = 1 - Math.exp(-rot.lerpSpeed * dt);

      if (charAnim || nav) {
        const diffYaw = Math.atan2(
          Math.sin(rot.targetYaw - transform.rotY),
          Math.cos(rot.targetYaw - transform.rotY)
        );
        transform.rotY += diffYaw * damp;
        transform.rotX = THREE.MathUtils.lerp(transform.rotX, rot.targetPitch, damp);
        transform.rotZ = THREE.MathUtils.lerp(transform.rotZ, rot.targetRoll, damp);
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
 * CameraFollowSystem (priority 38): Fixed-direction 3rd-person camera smoothly following (`lerp`)
 * `Player_Rig` across the sidewalk, while respecting `autoOrbit` when toggled via `setAutoOrbit`.
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

    let offX = follow.offsetX;
    let offZ = follow.offsetZ;

    if (follow.autoOrbit) {
      if (dt > 0) {
        follow.orbitAngle += follow.orbitSpeed * dt;
      }
      const radius = Math.hypot(follow.offsetX, follow.offsetZ);
      const baseAngle = Math.atan2(follow.offsetX, follow.offsetZ);
      // Gentle bounded azimuth sweep around the fixed 3rd-person street vantage so walls never occlude
      const sweepAngle = baseAngle + Math.sin(follow.orbitAngle) * 0.34;
      offX = Math.sin(sweepAngle) * radius;
      offZ = Math.cos(sweepAngle) * radius;
    } else if (follow.orbitAngle !== 0 && dt > 0) {
      follow.orbitAngle = THREE.MathUtils.lerp(
        follow.orbitAngle,
        0,
        1 - Math.exp(-3.0 * dt)
      );
      if (Math.abs(follow.orbitAngle) < 0.001) follow.orbitAngle = 0;
    }

    const targetLookX = transform.x + follow.lookAtOffsetX;
    const targetLookY = transform.y + follow.lookAtOffsetY;
    const targetLookZ = transform.z + follow.lookAtOffsetZ;

    // Resolve view ray from look-at target to camera (composes cleanly with both WASD & autoOrbit)
    const viewVecX = offX - follow.lookAtOffsetX;
    const viewVecY = follow.offsetY - follow.lookAtOffsetY;
    const viewVecZ = offZ - follow.lookAtOffsetZ;
    const baseDist = Math.hypot(viewVecX, viewVecY, viewVecZ) || 1;
    const minDist = follow.minDistance ?? 8.2;
    const maxDist = follow.maxDistance ?? 31.5;
    const clampedTargetDist = THREE.MathUtils.clamp(
      follow.targetDistance ?? baseDist,
      minDist,
      maxDist
    );
    follow.targetDistance = clampedTargetDist;

    if (!follow.initialized || dt <= 0) {
      follow.currentDistance = clampedTargetDist;
    } else {
      const zoomAlpha = 1 - Math.exp(-(follow.zoomSmoothing ?? 10.5) * dt);
      follow.currentDistance = THREE.MathUtils.lerp(
        follow.currentDistance ?? baseDist,
        clampedTargetDist,
        zoomAlpha
      );
    }

    const distScale = (follow.currentDistance ?? baseDist) / baseDist;
    const desiredX = targetLookX + viewVecX * distScale;
    const desiredY = targetLookY + viewVecY * distScale;
    const desiredZ = targetLookZ + viewVecZ * distScale;

    if (!follow.initialized || dt <= 0) {
      this.camera.position.set(desiredX, desiredY, desiredZ);
      follow.currentLookX = targetLookX;
      follow.currentLookY = targetLookY;
      follow.currentLookZ = targetLookZ;
      follow.initialized = true;
    } else {
      const alpha = 1 - Math.exp(-follow.followSharpness * dt);
      this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, desiredX, alpha);
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, desiredY, alpha);
      this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, desiredZ, alpha);

      follow.currentLookX = THREE.MathUtils.lerp(
        follow.currentLookX ?? targetLookX,
        targetLookX,
        alpha
      );
      follow.currentLookY = THREE.MathUtils.lerp(
        follow.currentLookY ?? targetLookY,
        targetLookY,
        alpha
      );
      follow.currentLookZ = THREE.MathUtils.lerp(
        follow.currentLookZ ?? targetLookZ,
        targetLookZ,
        alpha
      );
    }

    this.lookTarget.set(
      follow.currentLookX ?? targetLookX,
      follow.currentLookY ?? targetLookY,
      follow.currentLookZ ?? targetLookZ
    );
    this.camera.lookAt(this.lookTarget);
    this.camera.updateMatrixWorld();
  }
}

/**
 * LineOfSightOcclusionSystem (priority 39): Keeps the 3D sightline between the elevated 45°
 * camera, `Player_Rig`, and the central plaza/storefront vista completely unobstructed by
 * foreground canopy/sign obstacles (`Cidade_leaves_0_3`, `Cidade_leaves001_1_7`, and the
 * hanging front sign `Plane052/053` + `Cylinder001..005`) without modifying `.glb` on disk.
 */
export class LineOfSightOcclusionSystem implements EcsSystem {
  public readonly name = 'LineOfSightOcclusionSystem';
  private camera: THREE.PerspectiveCamera | null;

  private readonly ray = new THREE.Ray();
  private readonly rayDir = new THREE.Vector3();
  private readonly hitPoint = new THREE.Vector3();
  private readonly expandedBox = new THREE.Box3();
  private readonly sampleTarget = new THREE.Vector3();
  private readonly playerNdc = new THREE.Vector3();
  private readonly cornerVec = new THREE.Vector3();

  constructor(camera: THREE.PerspectiveCamera | null = null) {
    this.camera = camera;
  }

  public setCamera(camera: THREE.PerspectiveCamera | null): void {
    this.camera = camera;
  }

  private segmentIntersectsExpandedBox(
    camPos: THREE.Vector3,
    target: THREE.Vector3,
    box: THREE.Box3,
    padding: number
  ): boolean {
    this.expandedBox.copy(box).expandByScalar(padding);
    if (this.expandedBox.containsPoint(camPos)) {
      return true;
    }
    this.rayDir.subVectors(target, camPos);
    const totalDist = this.rayDir.length();
    if (totalDist <= 0.05) return false;

    this.rayDir.multiplyScalar(1 / totalDist);
    this.ray.set(camPos, this.rayDir);
    const hit = this.ray.intersectBox(this.expandedBox, this.hitPoint);
    if (!hit) return false;

    return camPos.distanceTo(hit) < totalDist - 0.12;
  }

  public update(world: World): void {
    if (!this.camera) return;

    const envEntities = world.query('ForegroundOccluders');
    if (envEntities.length === 0) return;

    const playerEntities = world.query('Transform', 'CharacterAnimation');
    const playerTransform =
      playerEntities.length > 0 ? world.getComponent(playerEntities[0]!, 'Transform') : undefined;

    this.camera.updateMatrixWorld();
    this.camera.updateProjectionMatrix();
    const camPos = this.camera.position;

    let hasPlayerNdc = false;
    let playerDist = Infinity;
    if (playerTransform) {
      this.sampleTarget.set(playerTransform.x, playerTransform.y + 1.05, playerTransform.z);
      playerDist = camPos.distanceTo(this.sampleTarget);
      this.playerNdc.copy(this.sampleTarget).project(this.camera);
      hasPlayerNdc = true;
    }

    for (const envId of envEntities) {
      const occluderComp = world.getComponent(envId, 'ForegroundOccluders')!;
      this.sampleTarget.set(
        occluderComp.centralFocusX,
        occluderComp.centralFocusY,
        occluderComp.centralFocusZ
      );
      const focalDist = camPos.distanceTo(this.sampleTarget);

      for (const group of occluderComp.groups) {
        let blocksSightline = false;

        // 1. Check 3D capsule rays from Camera -> Player_Rig (feet, torso, head)
        if (playerTransform) {
          const pad = group.occluded
            ? occluderComp.playerClearanceRadius + 0.35
            : occluderComp.playerClearanceRadius;

          for (const hOff of [0.35, 1.05, 1.72]) {
            this.sampleTarget.set(playerTransform.x, playerTransform.y + hOff, playerTransform.z);
            if (this.segmentIntersectsExpandedBox(camPos, this.sampleTarget, group.worldBox, pad)) {
              blocksSightline = true;
              break;
            }
          }
        }

        // 2. Check 3D ray to central plaza & NDC screen-space overlap with player / scene center
        if (!blocksSightline) {
          this.sampleTarget.set(
            occluderComp.centralFocusX,
            occluderComp.centralFocusY,
            occluderComp.centralFocusZ
          );
          if (this.segmentIntersectsExpandedBox(camPos, this.sampleTarget, group.worldBox, 1.85)) {
            blocksSightline = true;
          }
        }

        if (!blocksSightline) {
          const b = group.worldBox;
          let ndcMinX = Infinity;
          let ndcMaxX = -Infinity;
          let ndcMinY = Infinity;
          let ndcMaxY = -Infinity;
          let closestCornerDist = Infinity;

          for (let ix = 0; ix < 2; ix++) {
            const cx = ix === 0 ? b.min.x : b.max.x;
            for (let iy = 0; iy < 2; iy++) {
              const cy = iy === 0 ? b.min.y : b.max.y;
              for (let iz = 0; iz < 2; iz++) {
                const cz = iz === 0 ? b.min.z : b.max.z;
                this.cornerVec.set(cx, cy, cz);
                const d = camPos.distanceTo(this.cornerVec);
                if (d < closestCornerDist) closestCornerDist = d;

                this.cornerVec.project(this.camera);
                if (this.cornerVec.z <= 1.05) {
                  if (this.cornerVec.x < ndcMinX) ndcMinX = this.cornerVec.x;
                  if (this.cornerVec.x > ndcMaxX) ndcMaxX = this.cornerVec.x;
                  if (this.cornerVec.y < ndcMinY) ndcMinY = this.cornerVec.y;
                  if (this.cornerVec.y > ndcMaxY) ndcMaxY = this.cornerVec.y;
                }
              }
            }
          }

          const hysteresis = group.occluded ? 0.05 : 0.0;
          const halfW = occluderComp.centralNdcHalfWidth + hysteresis;
          const halfH = occluderComp.centralNdcHalfHeight + hysteresis;

          // Overlaps central viewport window while positioned in front of the plaza/storefronts
          const overlapsCenterWindow =
            closestCornerDist < focalDist + 1.2 &&
            ndcMaxX > -halfW &&
            ndcMinX < halfW &&
            ndcMaxY > -halfH &&
            ndcMinY < halfH;

          // Overlaps Player_Rig screen silhouette while closer to camera than Player_Rig
          const playerMargin = 0.22 + hysteresis;
          const overlapsPlayerScreen =
            hasPlayerNdc &&
            closestCornerDist < playerDist + 0.5 &&
            ndcMaxX > this.playerNdc.x - playerMargin &&
            ndcMinX < this.playerNdc.x + playerMargin &&
            ndcMaxY > this.playerNdc.y - 0.28 &&
            ndcMinY < this.playerNdc.y + 0.34;

          if (overlapsCenterWindow || overlapsPlayerScreen) {
            blocksSightline = true;
          }
        }

        if (group.occluded !== blocksSightline) {
          group.occluded = blocksSightline;
        }
        for (const mesh of group.meshes) {
          mesh.visible = !blocksSightline;
        }
      }
    }
  }
}

/**
 * RenderSyncSystem (priority 40): Synchronizes pure ECS `Transform` & `Renderable` state
 * onto Three.js `Object3D` transforms and optional `PointLight` flicker.
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
          Math.sin(elapsed * speed + id * 1.7) * 0.08 +
          Math.sin(elapsed * speed * 2.13 + id) * 0.04;
        r.pointLight.intensity = r.baseLightIntensity * flicker;
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
