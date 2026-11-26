import * as THREE from 'three';
import type { CharacterAnimationComponent, CharacterClipName, World } from '../ecs/World';

export interface SystemContext {
  dt: number;
  elapsed: number;
}

export interface EcsSystem {
  readonly name: string;
  update(world: World, context: SystemContext): void;
}

/**
 * Transitions a `CharacterAnimationComponent` smoothly to `nextClip` via `crossFadeTo`.
 */
export function transitionCharacterClip(
  charAnim: CharacterAnimationComponent,
  nextClip: CharacterClipName,
  fadeSeconds?: number
): void {
  if (charAnim.activeClip === nextClip && nextClip !== 'Casting') {
    return;
  }

  const nextAction = charAnim.actions[nextClip];
  if (!nextAction) {
    charAnim.activeClip = nextClip;
    return;
  }

  const prevAction = charAnim.actions[charAnim.activeClip];
  const duration = fadeSeconds ?? charAnim.crossFadeDuration;

  if (nextClip === 'Casting') {
    nextAction.setLoop(THREE.LoopOnce, 1);
    nextAction.clampWhenFinished = true;
    charAnim.castRemaining = Math.max(0.1, charAnim.durations.Casting);
  } else {
    nextAction.setLoop(THREE.LoopRepeat, Infinity);
    nextAction.clampWhenFinished = false;
  }

  nextAction.enabled = true;
  nextAction.setEffectiveTimeScale(1);
  nextAction.setEffectiveWeight(1);
  nextAction.reset();

  if (prevAction && prevAction !== nextAction) {
    nextAction.play();
    prevAction.crossFadeTo(nextAction, duration, false);
  } else {
    nextAction.fadeIn(duration).play();
  }

  charAnim.activeClip = nextClip;
}

/**
 * CharacterAnimationSystem: Drives `THREE.AnimationMixer` NLA clips on `Player_Rig`,
 * smoothly cross-fading (`crossFadeTo`) between:
 *  - `Idle`: looped while stationary
 *  - `Walking`: looped while moving on XZ via WASD (or ground click/tap)
 *  - `Casting`: single execution (`THREE.LoopOnce`) triggered by interaction key `E`,
 *    returning smoothly to `Walking` or `Idle` upon completion.
 */
export class CharacterAnimationSystem implements EcsSystem {
  public readonly name = 'CharacterAnimationSystem';

  public update(world: World, { dt }: SystemContext): void {
    const entities = world.query('CharacterAnimation');

    for (const id of entities) {
      const charAnim = world.getComponent(id, 'CharacterAnimation')!;
      const vel = world.getComponent(id, 'Velocity');
      const nav = world.getComponent(id, 'NavigationTarget');
      const input = world.getComponent(id, 'InputState');

      const hasInputMove = Boolean(
        input && (Math.abs(input.moveX) > 0.01 || Math.abs(input.moveZ) > 0.01)
      );
      const planarSpeed = vel ? Math.hypot(vel.vx, vel.vz) : 0;
      const isMoving = hasInputMove || Boolean(nav && nav.active) || planarSpeed > 0.06;

      if (charAnim.interactRequested) {
        charAnim.interactRequested = false;
        if (charAnim.actions.Casting) {
          transitionCharacterClip(charAnim, 'Casting', 0.18);
        }
      }

      if (charAnim.activeClip === 'Casting') {
        if (dt > 0) {
          charAnim.castRemaining -= dt;
        }
        const castAction = charAnim.actions.Casting;
        const actionStopped = Boolean(castAction && !castAction.isRunning() && charAnim.castRemaining < charAnim.durations.Casting - 0.05);
        if (charAnim.castRemaining <= 0 || actionStopped) {
          charAnim.castRemaining = 0;
          transitionCharacterClip(charAnim, isMoving ? 'Walking' : 'Idle', 0.24);
        }
      } else {
        const desired: CharacterClipName = isMoving ? 'Walking' : 'Idle';
        if (charAnim.activeClip !== desired) {
          transitionCharacterClip(charAnim, desired, charAnim.crossFadeDuration);
        }
      }

      if (dt > 0) {
        charAnim.mixer.update(dt);
      }
    }
  }
}

/**
 * AnimationSystem: Drives organic breathing, idle bobbing, and articulated wing/head/foot
 * motion for the 3D Linux Tux mascot in `[ STACK // NEOFETCH ]`.
 */
export class AnimationSystem implements EcsSystem {
  public readonly name = 'AnimationSystem';

  public update(world: World, { dt, elapsed }: SystemContext): void {
    const entities = world.query('Transform', 'AnimationState');

    for (const id of entities) {
      const transform = world.getComponent(id, 'Transform')!;
      const anim = world.getComponent(id, 'AnimationState')!;

      anim.excitement = Math.max(0, anim.excitement - dt * 1.6);

      const t = elapsed * anim.bobFrequency + anim.phase;
      const energyBoost = 1 + anim.excitement * 0.65;

      if (anim.bobAmplitude > 0) {
        transform.y = anim.baseY + Math.sin(t * energyBoost) * anim.bobAmplitude;
      }

      if (anim.breatheAmplitude > 0) {
        const breathe = Math.sin(elapsed * 2.1 + anim.phase) * anim.breatheAmplitude;
        transform.scaleY = 1 + breathe;
        transform.scaleX = 1 - breathe * 0.45;
        transform.scaleZ = 1 - breathe * 0.45;
      }

      if (!anim.parts) continue;

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
    }
  }
}
