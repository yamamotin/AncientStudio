import type * as THREE from 'three';
import { LifecycleManager } from '../core/LifecycleManager';
import type { ForegroundOccluderGroup } from '../world/GlbSceneLoader';

/**
 * Lean, cache-friendly Entity-Component-System (ECS) World.
 * Pure data components keep entity logic modular, deterministic, and completely leak-free
 * across scene transitions, entity removal, and engine teardown.
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
  /** Phase offset */
  phase: number;
  /** Reaction energy [0..1] boosted by pointer movement or interaction */
  excitement: number;
  /** Optional articulated sub-meshes (used by Tux 3D mascot) */
  parts?: ArticulatedParts;
}

export type CharacterClipName = 'Idle' | 'Walking' | 'Casting';

/**
 * CharacterAnimationComponent: Drives `THREE.AnimationMixer` NLA clip transitions
 * (`Idle`, `Walking`, `Casting`) on `Player_Rig` using smooth `crossFadeTo`.
 */
export interface CharacterAnimationComponent {
  mixer: THREE.AnimationMixer;
  root: THREE.Object3D;
  actions: {
    Idle: THREE.AnimationAction | null;
    Walking: THREE.AnimationAction | null;
    Casting: THREE.AnimationAction | null;
  };
  durations: {
    Idle: number;
    Walking: number;
    Casting: number;
  };
  activeClip: CharacterClipName;
  /** Remaining seconds when playing `Casting` (`THREE.LoopOnce`) */
  castRemaining: number;
  /** Cross-fade blend duration in seconds */
  crossFadeDuration: number;
  /** Latched interaction trigger from keyboard (`E` / `Space`) */
  interactRequested: boolean;
  /** Optional mixer `'finished'` listener cleanup callback */
  disposeListener?: () => void;
}

export interface SidewalkObstacleBox {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/**
 * SidewalkBoundsComponent: Constrains `Player_Rig` movement to walkable urban sidewalks
 * via `THREE.MathUtils.clamp` so the character never clips into walls or falls into the void.
 */
export interface SidewalkBoundsComponent {
  /** Outer sidewalk envelope clamped via `THREE.MathUtils.clamp` */
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  /** Central courtyard plaza X span where the sidewalk widens southward */
  plazaMinX: number;
  plazaMaxX: number;
  /** East-West main sidewalk Z span outside the central plaza */
  corridorMinZ: number;
  corridorMaxZ: number;
  /** Narrowed Z minimum along the west storefront (`x in [-17.65, -9.35]`) */
  westStorefrontMinX: number;
  westStorefrontMaxX: number;
  westStorefrontMinZ: number;
  /** Sidewalk furniture/kiosk AABBs smoothly pushed out on XZ */
  obstacles: SidewalkObstacleBox[];
  /** Ground Y elevation of the sidewalk surface */
  groundY: number;
}

/**
 * TrafficCycleComponent: Drives `Carro_Grupo` along the left lateral avenue on a
 * continuous 30s cycle (8s straight-line drive with active headlights, 22s hidden out of frame).
 */
export interface TrafficCycleComponent {
  /** Total loop period in seconds (30s) */
  cycleDuration: number;
  /** Active visible driving window in seconds (8s; remaining 22s stays hidden) */
  activeDuration: number;
  /** Straight-line X/Y lane coordinates on the left lateral avenue */
  laneX: number;
  laneY: number;
  /** Start and end Z coordinates traversed at constant speed during `activeDuration` */
  startZ: number;
  endZ: number;
  /** Fixed vehicle yaw heading along the avenue */
  headingYaw: number;
  /** Optional phase offset in seconds */
  timeOffset: number;
  /** Attached headlight & taillight light sources moving with `Carro_Grupo` */
  headlightLeft?: THREE.SpotLight;
  headlightRight?: THREE.SpotLight;
  streetThrowLight?: THREE.PointLight;
  taillightGlow?: THREE.PointLight;
  /** Attached visual headlight emitter group (lenses, optical halos, beam cones & asphalt specular glaze) */
  headlightEmitterGroup?: THREE.Group;
  headlightLensMaterial?: THREE.MeshStandardMaterial;
  headlightHaloMaterial?: THREE.MeshBasicMaterial;
  headlightConeMaterial?: THREE.MeshBasicMaterial;
  headlightRoadPoolMaterial?: THREE.MeshBasicMaterial;
  /** Atmosphere-calibrated peak intensities for the active pass */
  baseSpotIntensity: number;
  basePointIntensity: number;
  baseTailIntensity: number;
  baseLensEmissive?: number;
  baseHaloOpacity?: number;
  baseConeOpacity?: number;
  baseRoadPoolOpacity?: number;
  /** Optional headlight cover materials pulsed while active */
  headlightMaterials?: THREE.MeshStandardMaterial[];
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

export interface LifecycleTagComponent {
  role: 'avatar' | 'mascot' | 'environment' | 'vehicle' | 'prop';
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

export interface InputStateComponent {
  /** Normalized pointer coordinates [-1..1] driving this entity */
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  isDragging: boolean;
  /** Normalized planar movement intent [-1..1] from WASD keyboard hooks */
  moveX: number;
  moveZ: number;
  /** Multiplier for pointer -> rotation target mapping (mascot mode) */
  yawSensitivity: number;
  pitchSensitivity: number;
  /** Planar walking speed (m/s) & optional fallback radius clamp */
  moveSpeed: number;
  boundsRadius: number;
}

export interface NavigationTargetComponent {
  /** Target world X coordinate on the ground plane */
  targetX: number;
  /** Target world Z coordinate on the ground plane */
  targetZ: number;
  /** Whether click/tap ground navigation is currently active */
  active: boolean;
  /** Ground walking speed in world units per second */
  moveSpeed: number;
  /** Arrival stop threshold in world units */
  arrivalRadius: number;
  /** Outer walkable bounds clamping */
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface CameraFollowComponent {
  /** Fixed-direction 3rd-person camera position offset relative to `Player_Rig` */
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  /** Look-at target offset relative to `Player_Rig` */
  lookAtOffsetX: number;
  lookAtOffsetY: number;
  lookAtOffsetZ: number;
  /** Smooth lerp rate (1/s) accompanying `Player_Rig` */
  followSharpness: number;
  /** Respects UI `setAutoOrbit` toggle when true; strictly fixed direction when false */
  autoOrbit: boolean;
  orbitAngle: number;
  orbitSpeed: number;
  /** Safe 3D distance bounds (meters) from look-at target for mouse scroll-wheel zoom */
  minDistance?: number;
  maxDistance?: number;
  targetDistance?: number;
  currentDistance?: number;
  /** World-space visible environment bounds for zooming out to an overview. */
  overviewBounds?: THREE.Box3;
  /** Exponential damping rate (1/s) and meters-per-wheel-notch step for smooth zoom */
  zoomSmoothing?: number;
  zoomSpeed?: number;
  /** Smoothed look-at state & initial snap flag */
  currentLookX?: number;
  currentLookY?: number;
  currentLookZ?: number;
  initialized: boolean;
}

/**
 * ForegroundOccludersComponent: Runtime line-of-sight occlusion metadata for foreground
 * obstacles in `Cidade_Sketchfab_model` (the two plaza trees & hanging front sign) so they
 * never block `Player_Rig` or the central plaza vista without modifying `.glb` on disk.
 */
export interface ForegroundOccludersComponent {
  groups: ForegroundOccluderGroup[];
  centralFocusX: number;
  centralFocusY: number;
  centralFocusZ: number;
  playerClearanceRadius: number;
  centralNdcHalfWidth: number;
  centralNdcHalfHeight: number;
}

export interface ComponentMap {
  Transform: TransformComponent;
  Velocity: VelocityComponent;
  RotationTarget: RotationTargetComponent;
  AnimationState: AnimationStateComponent;
  CharacterAnimation: CharacterAnimationComponent;
  SidewalkBounds: SidewalkBoundsComponent;
  TrafficCycle: TrafficCycleComponent;
  ForegroundOccluders: ForegroundOccludersComponent;
  Renderable: RenderableComponent;
  DepthLayer: DepthLayerComponent;
  LifecycleTag: LifecycleTagComponent;
  InputState: InputStateComponent;
  NavigationTarget: NavigationTargetComponent;
  CameraFollow: CameraFollowComponent;
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
    CharacterAnimation: new Map(),
    SidewalkBounds: new Map(),
    TrafficCycle: new Map(),
    ForegroundOccluders: new Map(),
    Renderable: new Map(),
    DepthLayer: new Map(),
    LifecycleTag: new Map(),
    InputState: new Map(),
    NavigationTarget: new Map(),
    CameraFollow: new Map(),
  };

  public createEntity(): EntityId {
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  public hasEntity(id: EntityId): boolean {
    return this.entities.has(id);
  }

  public getEntityCount(): number {
    return this.entities.size;
  }

  public addComponent<K extends ComponentName>(
    id: EntityId,
    name: K,
    data: ComponentMap[K]
  ): this {
    if (!this.entities.has(id)) {
      throw new Error(`[ECS World] Cannot add component "${name}" to non-existent entity ${id}`);
    }
    this.stores[name].set(id, data);
    return this;
  }

  public getComponent<K extends ComponentName>(
    id: EntityId,
    name: K
  ): ComponentMap[K] | undefined {
    return this.stores[name].get(id);
  }

  public hasComponent<K extends ComponentName>(id: EntityId, name: K): boolean {
    return this.stores[name].has(id);
  }

  public removeComponent<K extends ComponentName>(id: EntityId, name: K): boolean {
    return this.stores[name].delete(id);
  }

  /**
   * Returns all EntityIds that possess EVERY requested component name.
   */
  public query(...required: ComponentName[]): EntityId[] {
    if (required.length === 0) {
      return Array.from(this.entities);
    }

    let smallestStore = this.stores[required[0]!];
    for (let i = 1; i < required.length; i++) {
      const candidate = this.stores[required[i]!];
      if (candidate.size < smallestStore.size) {
        smallestStore = candidate;
      }
    }

    const result: EntityId[] = [];
    for (const id of smallestStore.keys()) {
      let matchesAll = true;
      for (let i = 0; i < required.length; i++) {
        if (!this.stores[required[i]!].has(id)) {
          matchesAll = false;
          break;
        }
      }
      if (matchesAll) {
        result.push(id);
      }
    }

    return result;
  }

  /**
   *Destroys a single entity, detaching and disposing any associated `AnimationMixer`,
   * attached `SpotLight` / `PointLight` rigs, and `Renderable` Three.js GPU resources.
   */
  public destroyEntity(id: EntityId, disposeGpu = true): boolean {
    if (!this.entities.has(id)) return false;

    const charAnim = this.stores.CharacterAnimation.get(id);
    if (charAnim) {
      if (charAnim.disposeListener) {
        charAnim.disposeListener();
      }
      LifecycleManager.disposeMixer(charAnim.mixer, charAnim.root);
    }

    const traffic = this.stores.TrafficCycle.get(id);
    if (traffic) {
      const lights: Array<THREE.Light | undefined> = [
        traffic.headlightLeft,
        traffic.headlightRight,
        traffic.streetThrowLight,
        traffic.taillightGlow,
      ];
      for (const light of lights) {
        if (!light) continue;
        if ((light as THREE.SpotLight).target?.parent) {
          (light as THREE.SpotLight).target.parent!.remove((light as THREE.SpotLight).target);
        }
        if (light.shadow?.map) {
          light.shadow.map.dispose();
        }
        if (light.parent) {
          light.parent.remove(light);
        }
        if (typeof light.dispose === 'function') {
          light.dispose();
        }
      }
      if (traffic.headlightEmitterGroup && disposeGpu) {
        LifecycleManager.disposeObject3D(traffic.headlightEmitterGroup);
      }
    }

    const renderable = this.stores.Renderable.get(id);
    if (renderable && disposeGpu && renderable.disposeOnDestroy !== false) {
      if (renderable.pointLight) {
        if (renderable.pointLight.shadow?.map) {
          renderable.pointLight.shadow.map.dispose();
        }
        if (renderable.pointLight.parent) {
          renderable.pointLight.parent.remove(renderable.pointLight);
        }
        renderable.pointLight.dispose();
      }
      LifecycleManager.disposeObject3D(renderable.object3D);
    }

    for (const store of Object.values(this.stores)) {
      store.delete(id);
    }

    return this.entities.delete(id);
  }

  /**
   * Returns all EntityIds assigned to a specific depth layer (`foreground` | `midground` | `background` | `sky`).
   */
  public queryByLayer(layer: SceneDepthLayerName): EntityId[] {
    const matches: EntityId[] = [];
    for (const [id, comp] of this.stores.DepthLayer.entries()) {
      if (comp.layer === layer) {
        matches.push(id);
      }
    }
    return matches;
  }

  /**
   * Destroys all entities matching a given `LifecycleTag.role`.
   */
  public destroyEntitiesByRole(
    role: LifecycleTagComponent['role'],
    disposeGpu = true
  ): number {
    const toRemove: EntityId[] = [];
    for (const [id, tag] of this.stores.LifecycleTag.entries()) {
      if (tag.role === role) {
        toRemove.push(id);
      }
    }
    for (const id of toRemove) {
      this.destroyEntity(id, disposeGpu);
    }
    return toRemove.length;
  }

  /**
   * Clears all entities and component stores, disposing GPU objects cleanly.
   */
  public clear(disposeGpu = true): void {
    const allIds = Array.from(this.entities);
    for (const id of allIds) {
      this.destroyEntity(id, disposeGpu);
    }
    this.entities.clear();
    this.nextEntityId = 1;
  }
}
