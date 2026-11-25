import type { World } from '../ecs/World';

export interface SystemContext {
  dt: number;
  elapsed: number;
}

export interface EcsSystem {
  readonly name: string;
  update(world: World, context: SystemContext): void;
}

/**
 * AnimationSystem: Drives organic breathing, idle bobbing, articulated limb/wing motion,
 * and smooth `deltaTime` walk-cycle transitions (including Techwear protagonist + mechanical arm,
 * Tux 3D mascot, and orbital core assemblies).
 */
export class AnimationSystem implements EcsSystem {
  public readonly name = 'AnimationSystem';

  public update(world: World, { dt, elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'AnimationState');

    for (const id of entities) {
      const transform = world.getComponent(id, 'Transform')!;
      const anim = world.getComponent(id, 'AnimationState')!;
      const vel = world.getComponent(id, 'Velocity');
      const nav = world.getComponent(id, 'NavigationTarget');

      // Smoothly decay excitement back toward calm baseline
      anim.excitement = Math.max(0, anim.excitement - dt * 1.6);

      const planarSpeed = vel ? Math.hypot(vel.vx, vel.vz) : 0;
      const walking = Boolean((nav && nav.active) || planarSpeed > 0.08);
      anim.isMoving = walking;

      const prevBlend = anim.locomotionBlend ?? 0;
      const blendDamp = 1 - Math.exp(-11.0 * dt);
      const nextBlend = prevBlend + ((walking ? 1 : 0) - prevBlend) * blendDamp;
      const blend = !walking && nextBlend < 0.001 ? 0 : nextBlend;
      anim.locomotionBlend = blend;

      const strideRate = 3.4 + Math.min(planarSpeed, 5.0) * 1.85;
      const stride = (anim.stridePhase ?? 0) + (blend > 0.001 ? dt * strideRate : 0);
      anim.stridePhase = stride;

      const isHumanoidWalker = Boolean(anim.parts && (anim.parts.leftArm || anim.parts.rightArm));

      const t = elapsed * anim.bobFrequency + anim.phase;
      const energyBoost = 1 + anim.excitement * 0.65;

      // Vertical bobbing / walking gait cadence around baseY
      if (isHumanoidWalker) {
        const idleBob = Math.sin(t) * anim.bobAmplitude * (1 - blend * 0.7);
        const stepBounce = Math.abs(Math.sin(stride)) * 0.055 * blend;
        transform.y = anim.baseY + idleBob + stepBounce;
      } else if (anim.bobAmplitude > 0) {
        transform.y = anim.baseY + Math.sin(t * energyBoost) * anim.bobAmplitude;
      }

      // Subtle breathing squash-and-stretch
      if (anim.breatheAmplitude > 0) {
        const breatheScale = isHumanoidWalker ? 1 - blend * 0.6 : 1;
        const breathe = Math.sin(elapsed * 2.1 + anim.phase) * anim.breatheAmplitude * breatheScale;
        transform.scaleY = 1 + breathe;
        transform.scaleX = 1 - breathe * 0.45;
        transform.scaleZ = 1 - breathe * 0.45;
      }

      if (!anim.parts) continue;

      if (isHumanoidWalker) {
        const legSwing = Math.sin(stride) * 0.56 * blend;
        const armSwing = Math.sin(stride) * 0.44 * blend;
        const idleBreath = Math.sin(elapsed * 1.55 + anim.phase) * 0.03 * (1 - blend);

        if (anim.parts.leftFoot) {
          anim.parts.leftFoot.rotation.x = legSwing;
        }
        if (anim.parts.rightFoot) {
          anim.parts.rightFoot.rotation.x = -legSwing;
        }
        if (anim.parts.leftArm) {
          anim.parts.leftArm.rotation.x = -armSwing + idleBreath * 0.6;
          anim.parts.leftArm.rotation.z = 0.09 + Math.sin(elapsed * 1.2 + anim.phase) * 0.018;
        }
        if (anim.parts.rightArm) {
          anim.parts.rightArm.rotation.x = armSwing - idleBreath;
          anim.parts.rightArm.rotation.z = -0.10 - Math.cos(elapsed * 1.35 + anim.phase) * 0.018;
        }
        if (anim.parts.rightForearm) {
          // Articulated cybernetic elbow hinge: natural stride flexion + subtle idle micro-servo poise
          const elbowFlex = Math.max(0, -Math.sin(stride)) * 0.30 * blend;
          const idleServo = Math.sin(elapsed * 1.85 + anim.phase) * 0.035 * (1 - blend);
          anim.parts.rightForearm.rotation.x = -0.24 - elbowFlex - idleServo;
        }
        if (anim.parts.head) {
          anim.parts.head.rotation.x = 0.05 * blend;
          anim.parts.head.rotation.z = Math.sin(elapsed * 1.25 + anim.phase) * 0.025 * (1 - blend);
        }
        if (anim.parts.coatTail) {
          const gust = 0.10 + 0.06 * Math.sin(elapsed * 1.15);
          anim.parts.coatTail.rotation.x =
            0.14 +
            blend * 0.22 +
            Math.sin(stride * 2.0) * 0.075 * blend +
            Math.sin(elapsed * 3.2 + anim.phase) * 0.045 * (1 - blend) +
            gust * 0.4;
          anim.parts.coatTail.rotation.z =
            -0.04 - Math.cos(elapsed * 2.6 + anim.phase) * 0.04;
        }
      } else {
        // Tux mascot & ambient prop articulation (preserved intact)
        const flap =
          Math.sin(elapsed * (2.6 + anim.excitement * 4.5) + anim.phase) *
          (0.08 + anim.excitement * 0.22);

        if (anim.parts.leftWing) {
          anim.parts.leftWing.rotation.z = 0.28 + flap;
        }
        if (anim.parts.rightWing) {
          anim.parts.rightWing.rotation.z = -0.28 - flap;
        }
        if (anim.parts.head) {
          anim.parts.head.rotation.z = Math.sin(elapsed * 1.4 + anim.phase) * 0.045;
        }
        if (anim.parts.leftFoot) {
          anim.parts.leftFoot.rotation.x = Math.sin(elapsed * 2.4 + anim.phase) * 0.06;
        }
        if (anim.parts.rightFoot) {
          anim.parts.rightFoot.rotation.x = -Math.sin(elapsed * 2.4 + anim.phase) * 0.06;
        }
        if (anim.parts.orbitRing) {
          anim.parts.orbitRing.rotation.x = Math.sin(elapsed * 0.7) * 0.45 + 0.6;
          anim.parts.orbitRing.rotation.y = -elapsed * 0.55;
        }
        if (anim.parts.coatTail) {
          const gust = 0.14 + 0.08 * Math.sin(elapsed * 1.15);
          anim.parts.coatTail.rotation.x =
            0.18 + Math.sin(elapsed * 4.2 + anim.phase) * 0.09 + gust * 0.5;
          anim.parts.coatTail.rotation.z =
            -0.08 - Math.cos(elapsed * 3.1 + anim.phase) * 0.065;
        }
      }
    }
  }
}
