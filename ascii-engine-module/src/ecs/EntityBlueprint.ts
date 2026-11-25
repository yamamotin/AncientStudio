import * as THREE from 'three';
import type {
  ComponentMap,
  ComponentName,
  EntityId,
  SceneDepthLayerName,
  World,
} from './World';

/**
 * Declarative ECS Entity Blueprint & Prefab Registry:
 * Allows engine tools, map loaders, and scene composers to define reusable entity archetypes
 * (characters, street lamps, wind-swaying banners, vending kiosks, drones, beacons) as pure
 * data + mesh builder contracts and instantiate them deterministically with full lifecycle tracking.
 */

export interface EntityBlueprintSpawnContext {
  world: World;
  scene: THREE.Scene;
  parentGroup?: THREE.Group;
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  layer?: SceneDepthLayerName;
  phase?: number;
}

export interface EntityBlueprintResult {
  entityId: EntityId;
  object3D: THREE.Object3D;
  pointLight?: THREE.PointLight;
}

export interface EntityBlueprintDefinition<TParams = Record<string, unknown>> {
  readonly id: string;
  readonly role: ComponentMap['LifecycleTag']['role'];
  readonly defaultLayer: SceneDepthLayerName;
  readonly contrastPriority?: number;
  build: (
    ctx: EntityBlueprintSpawnContext,
    params: TParams
  ) => {
    object3D: THREE.Object3D;
    pointLight?: THREE.PointLight;
    baseLightIntensity?: number;
    lightFlickerSpeed?: number;
    components?: Partial<Omit<ComponentMap, 'Transform' | 'Renderable'>>;
  };
}

const LAYER_ORDER: Record<SceneDepthLayerName, number> = {
  foreground: 0,
  midground: 1,
  background: 2,
  sky: 3,
};

export class EntityBlueprintRegistry {
  private readonly blueprints = new Map<string, EntityBlueprintDefinition<unknown>>();

  public register<TParams>(definition: EntityBlueprintDefinition<TParams>): this {
    this.blueprints.set(definition.id, definition as EntityBlueprintDefinition<unknown>);
    return this;
  }

  public has(id: string): boolean {
    return this.blueprints.has(id);
  }

  public listIds(): string[] {
    return Array.from(this.blueprints.keys());
  }

  public spawn<TParams = Record<string, unknown>>(
    id: string,
    ctx: EntityBlueprintSpawnContext,
    params: TParams
  ): EntityBlueprintResult {
    const def = this.blueprints.get(id) as EntityBlueprintDefinition<TParams> | undefined;
    if (!def) {
      throw new Error(`[EntityBlueprintRegistry] Unknown blueprint "${id}".`);
    }

    const built = def.build(ctx, params);
    const scale = ctx.scale ?? 1;
    const rotY = ctx.rotationY ?? 0;
    const layer = ctx.layer ?? def.defaultLayer;

    built.object3D.position.set(ctx.position[0], ctx.position[1], ctx.position[2]);
    built.object3D.rotation.y = rotY;
    built.object3D.scale.setScalar(scale);

    const mountTarget = ctx.parentGroup ?? ctx.scene;
    mountTarget.add(built.object3D);
    if (built.pointLight && !built.pointLight.parent) {
      ctx.scene.add(built.pointLight);
    }

    const entityId = ctx.world.createEntity();

    ctx.world.addComponent(entityId, 'LifecycleTag', {
      role: def.role,
      label: built.components?.LifecycleTag?.label ?? `${def.id}#${entityId}`,
    });

    ctx.world.addComponent(entityId, 'DepthLayer', {
      layer,
      order: LAYER_ORDER[layer],
      contrastPriority:
        built.components?.DepthLayer?.contrastPriority ??
        def.contrastPriority ??
        (layer === 'foreground' ? 1.0 : layer === 'midground' ? 0.72 : 0.45),
    });

    ctx.world.addComponent(entityId, 'Transform', {
      x: ctx.position[0],
      y: ctx.position[1],
      z: ctx.position[2],
      rotX: 0,
      rotY,
      rotZ: 0,
      scaleX: scale,
      scaleY: scale,
      scaleZ: scale,
    });

    ctx.world.addComponent(entityId, 'Renderable', {
      object3D: built.object3D,
      pointLight: built.pointLight,
      baseLightIntensity: built.baseLightIntensity,
      lightFlickerSpeed: built.lightFlickerSpeed,
      disposeOnDestroy: true,
    });

    if (built.components) {
      const extraKeys = Object.keys(built.components) as Array<
        Exclude<ComponentName, 'Transform' | 'Renderable' | 'LifecycleTag' | 'DepthLayer'>
      >;
      for (const key of extraKeys) {
        if (key === ('LifecycleTag' as string) || key === ('DepthLayer' as string)) continue;
        const val = built.components[key];
        if (val !== undefined) {
          ctx.world.addComponent(entityId, key, val as ComponentMap[typeof key]);
        }
      }
    }

    return {
      entityId,
      object3D: built.object3D,
      pointLight: built.pointLight,
    };
  }
}
