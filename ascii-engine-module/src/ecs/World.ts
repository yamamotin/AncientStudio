import type * as THREE from 'three';

/**
 * Lean, cache-friendly Entity-Component-System (ECS) World.
 * Pure data components (Transform, Velocity, RotationTarget, AnimationState, Renderable, InputState)
 * keep entity logic modular, testable, and decoupled from framework/DOM globals.
 */

export type EntityId = number;

export interface TransformComponent {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
}

export interface VelocityComponent {
  vx: number;
  vy: number;
  vz: number;
  angularVx: number;
  angularVy: number;
  angularVz: number;
  damping: number;
}

export interface RotationTargetComponent {
  targetYaw: number;
  targetPitch: number;
  targetRoll: number;
  /** Exponential smoothing speed (higher = snappier) */
  lerpSpeed: number;
  /** Optional idle auto-spin speed on Y when user pointer is inactive */
  idleSpinSpeed: number;
  /** Clamp limits in radians */
  maxPitch: number;
}

export interface ArticulatedParts {
  leftWing?: THREE.Object3D;
  rightWing?: THREE.Object3D;
  head?: THREE.Object3D;
  leftFoot?: THREE.Object3D;
  rightFoot?: THREE.Object3D;
  orbitRing?: THREE.Object3D;
}

export interface AnimationStateComponent {
  /** Base Y anchor before bobbing/breathing */
  baseY: number;
  /** Vertical bobbing amplitude (world units) */
  bobAmplitude: number;
  /** Vertical bobbing frequency (rad/s) */
  bobFrequency: number;
  /** Subtle breathing/squash-stretch scale pulse */
  breatheAmplitude: number;
  /** Phase offset so multiple entities never bob in robotic unison */
  phase: number;
  /** Reaction energy [0..1] boosted by pointer movement or interaction */
  excitement: number;
  /** Optional articulated sub-meshes (e.g. Tux wings/head/feet or rune ring) */
  parts?: ArticulatedParts;
}

export interface RenderableComponent {
  object3D: THREE.Object3D;
  /** Optional attached point light synced with entity intensity/position */
  pointLight?: THREE.PointLight;
  baseLightIntensity?: number;
  lightFlickerSpeed?: number;
}

export interface InputStateComponent {
  /** Normalized pointer coordinates [-1..1] driving this entity */
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  isDragging: boolean;
  /** Normalized movement intent [-1..1] from future keyboard/gamepad hooks */
  moveX: number;
  moveZ: number;
  /** Multiplier for pointer -> rotation target mapping */
  yawSensitivity: number;
  pitchSensitivity: number;
  /** Optional movement speed & radius clamp for playground avatar */
  moveSpeed: number;
  boundsRadius: number;
}

export interface ComponentMap {
  Transform: TransformComponent;
  Velocity: VelocityComponent;
  RotationTarget: RotationTargetComponent;
  AnimationState: AnimationStateComponent;
  Renderable: RenderableComponent;
  InputState: InputStateComponent;
}

export type ComponentName = keyof ComponentMap;

export class World {
  private nextEntityId: EntityId = 1;
  private readonly entities = new Set<EntityId>();
  private readonly stores: { [K in ComponentName]: Map<EntityId, ComponentMap[K]> } = {
    Transform: new Map(),
    Velocity: new Map(),
    RotationTarget: new Map(),
    AnimationState: new Map(),
    Renderable: new Map(),
    InputState: new Map(),
  };

  public createEntity(): EntityId {
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  public destroyEntity(id: EntityId): void {
    if (!this.entities.has(id)) return;
    for (const key of Object.keys(this.stores) as ComponentName[]) {
      this.stores[key].delete(id);
    }
    this.entities.delete(id);
  }

  public addComponent<K extends ComponentName>(
    entity: EntityId,
    name: K,
    data: ComponentMap[K]
  ): ComponentMap[K] {
    if (!this.entities.has(entity)) {
      throw new Error(`[ECS World] Entity ${entity} does not exist.`);
    }
    this.stores[name].set(entity, data);
    return data;
  }

  public getComponent<K extends ComponentName>(
    entity: EntityId,
    name: K
  ): ComponentMap[K] | undefined {
    return this.stores[name].get(entity);
  }

  public hasComponent<K extends ComponentName>(entity: EntityId, name: K): boolean {
    return this.stores[name].has(entity);
  }

  public removeComponent<K extends ComponentName>(entity: EntityId, name: K): void {
    this.stores[name].delete(entity);
  }

  /**
   * Queries all active entities possessing every requested component type.
   */
  public query(...required: ComponentName[]): EntityId[] {
    if (required.length === 0) {
      return Array.from(this.entities);
    }

    // Iterate smallest component store first for O(min_store) lookup
    let smallestStore: Map<EntityId, unknown> = this.stores[required[0]!];
    for (let i = 1; i < required.length; i++) {
      const candidate = this.stores[required[i]!];
      if (candidate.size < smallestStore.size) {
        smallestStore = candidate;
      }
    }

    const result: EntityId[] = [];
    for (const entityId of smallestStore.keys()) {
      let match = true;
      for (let i = 0; i < required.length; i++) {
        if (!this.stores[required[i]!].has(entityId)) {
          match = false;
          break;
        }
      }
      if (match) {
        result.push(entityId);
      }
    }
    return result;
  }

  public getEntityCount(): number {
    return this.entities.size;
  }

  public clear(): void {
    for (const key of Object.keys(this.stores) as ComponentName[]) {
      this.stores[key].clear();
    }
    this.entities.clear();
  }
}
