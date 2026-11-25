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
 * AnimationSystem: Drives organic breathing, idle bobbing, and articulated limb/wing motion
 * for all ECS entities carrying `Transform` + `AnimationState` (including 3D Tux & Rune Crystal).
 */
export class AnimationSystem implements EcsSystem {
  public readonly name = 'AnimationSystem';

  public update(world: World, { dt, elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'AnimationState');

    for (const id of entities) {
      const transform = world.getComponent(id, 'Transform')!;
      const anim = world.getComponent(id, 'AnimationState')!;

      // Smoothly decay excitement back toward calm baseline
      anim.excitement = Math.max(0, anim.excitement - dt * 1.6);

      const t = elapsed * anim.bobFrequency + anim.phase;
      const energyBoost = 1 + anim.excitement * 0.65;

      // Vertical bobbing around baseY
      if (anim.bobAmplitude > 0) {
        transform.y = anim.baseY + Math.sin(t * energyBoost) * anim.bobAmplitude;
      }

      // Subtle breathing squash-and-stretch
      if (anim.breatheAmplitude > 0) {
        const breathe = Math.sin(elapsed * 2.1 + anim.phase) * anim.breatheAmplitude;
        transform.scaleY = 1 + breathe;
        transform.scaleX = 1 - breathe * 0.45;
        transform.scaleZ = 1 - breathe * 0.45;
      }

      // Articulated parts (e.g. Tux flippers, head tilt, feet tap, or orbiting stone ring)
      if (anim.parts) {
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
