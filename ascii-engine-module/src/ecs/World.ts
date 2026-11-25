import type * as THREE from 'three';
import { LifecycleManager } from '../core/LifecycleManager';

/**
 * Lean, cache-friendly Entity-Component-System (ECS) World.
 * Pure data components (Transform, Velocity, RotationTarget, AnimationState, Renderable,
 * NeonBeacon, PatrolPath, InputState, LifecycleTag) keep entity logic modular, deterministic,
 * and completely leak-free on entity or world teardown.
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
  coatTail?: THREE.Object3D;
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
  /** Optional articulated sub-meshes (e.g. Tux wings/head/feet or holo-ring) */
  parts?: ArticulatedParts;
}

export interface RenderableComponent {
  object3D: THREE.Object3D;
  /** Optional attached point light synced with entity intensity/position */
  pointLight?: THREE.PointLight;
  baseLightIntensity?: number;
  lightFlickerSpeed?: number;
  /** Automatically detach & dispose GPU geometry/materials when entity is destroyed (default: true) */
  disposeOnDestroy?: boolean;
}

export interface NeonBeaconComponent {
  /** Emissive material driven by neon pulse/strobe */
  emissiveMaterial?: THREE.MeshStandardMaterial;
  baseEmissiveIntensity: number;
  pulseSpeed: number;
  pulseAmplitude: number;
  phase: number;
  /** Optional cyber-sign glitch flicker probability [0..1] */
  glitchRate?: number;
}

export interface PatrolPathComponent {
  originX: number;
  originY: number;
  originZ: number;
  amplitudeX: number;
  amplitudeY: number;
  amplitudeZ: number;
  speed: number;
  phase: number;
  faceTangent: boolean;
}

export interface LifecycleTagComponent {
  role: 'avatar' | 'mascot' | 'core' | 'beacon' | 'vehicle' | 'prop';
  label: string;
}

export type SceneDepthLayerName = 'foreground' | 'midground' | 'background' | 'sky';

export interface DepthLayerComponent {
  layer: SceneDepthLayerName;
  /** Depth order index (0 = foreground focal, 1 = midground street, 2 = background skyline, 3 = sky) */
  order: number;
  /** Silhouette contrast priority [0..1] for readable separation */
  contrastPriority: number;
}

export interface WindSwayComponent {
  /** Base rotation X/Y/Z before wind oscillation */
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  /** Roll/pitch sway amplitudes in radians */
  swayAmpZ: number;
  swayAmpX: number;
  /** Wind harmonic frequency & spatial phase */
  frequency: number;
  phase: number;
  /** Gust sensitivity multiplier */
  gustFactor: number;
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
  NeonBeacon: NeonBeaconComponent;
  PatrolPath: PatrolPathComponent;
  WindSway: WindSwayComponent;
  DepthLayer: DepthLayerComponent;
  LifecycleTag: LifecycleTagComponent;
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
    NeonBeacon: new Map(),
    PatrolPath: new Map(),
    WindSway: new Map(),
    DepthLayer: new Map(),
    LifecycleTag: new Map(),
    InputState: new Map(),
  };

  public createEntity(): EntityId {
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  /**
   * Destroys a single entity, optionally detaching & disposing its WebGL `Renderable`
   * (`Object3D`, `PointLight`, geometries, materials, and textures) with zero leaks.
   */
  public destroyEntity(id: EntityId, disposeGpu = true): boolean {
    if (!this.entities.has(id)) return false;

    if (disposeGpu) {
      const renderable = this.stores.Renderable.get(id);
      if (renderable && renderable.disposeOnDestroy !== false) {
        this.disposeRenderableResources(renderable);
      }
    }

    for (const key of Object.keys(this.stores) as ComponentName[]) {
      this.stores[key].delete(id);
    }
    this.entities.delete(id);
    return true;
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
   * Iterates the smallest component store first for O(min_store) lookup.
   */
  public query(...required: ComponentName[]): EntityId[] {
    if (required.length === 0) {
      return Array.from(this.entities);
    }

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

  /**
   * Queries all entities belonging to a specific depth layer (`'foreground' | 'midground' | 'background' | 'sky'`).
   */
  public queryByLayer(layer: SceneDepthLayerName): EntityId[] {
    const result: EntityId[] = [];
    for (const [id, comp] of this.stores.DepthLayer.entries()) {
      if (comp.layer === layer) {
        result.push(id);
      }
    }
    return result;
  }

  /**
   * Destroys all entities matching a given `LifecycleTag.role` and cleanly disposes their WebGL resources.
   */
  public destroyEntitiesByRole(role: LifecycleTagComponent['role'], disposeGpu = true): number {
    const toDestroy: EntityId[] = [];
    for (const [id, tag] of this.stores.LifecycleTag.entries()) {
      if (tag.role === role) {
        toDestroy.push(id);
      }
    }
    let count = 0;
    for (const id of toDestroy) {
      if (this.destroyEntity(id, disposeGpu)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Disposes all GPU-backed `Renderable` components and clears all entity/component stores.
   */
  public clear(disposeGpu = true): void {
    if (disposeGpu) {
      for (const renderable of this.stores.Renderable.values()) {
        if (renderable.disposeOnDestroy !== false) {
          this.disposeRenderableResources(renderable);
        }
      }
    }
    for (const key of Object.keys(this.stores) as ComponentName[]) {
      this.stores[key].clear();
    }
    this.entities.clear();
  }

  private disposeRenderableResources(renderable: RenderableComponent): void {
    if (renderable.pointLight) {
      if (renderable.pointLight.parent) {
        renderable.pointLight.parent.remove(renderable.pointLight);
      }
      if (renderable.pointLight.shadow?.map) {
        renderable.pointLight.shadow.map.dispose();
      }
    }
    if (renderable.object3D) {
      if (renderable.object3D.parent) {
        renderable.object3D.parent.remove(renderable.object3D);
      }
      LifecycleManager.disposeObject3D(renderable.object3D);
    }
  }
}
