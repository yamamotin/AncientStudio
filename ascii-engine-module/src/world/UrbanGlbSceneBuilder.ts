import * as THREE from 'three';
import type {
  CharacterAnimationComponent,
  EntityId,
  SidewalkBoundsComponent,
  World,
} from '../ecs/World';
import type { EngineConfig } from '../types';
import type { PreparedUrbanGlbAssets } from './GlbSceneLoader';

/**
 * Calibrated sidewalk boundary geometry derived from `Cidade_Sketchfab_model` world AABBs:
 * - Spawn anchor of `Player_Rig`: `(-2.0, 0.08635, -1.0)`
 * - Central courtyard sidewalk: `x in [-5.55, +0.55]`, `z in [-3.30, +4.10]`
 * - Continuous East-West sidewalk promenade: `x in [-19.35, +10.75]`, `z in [-3.25, -1.92]`
 *   (narrowing to `z in [-2.50, -1.92]` in front of the west storefront `x in [-17.65, -9.35]`)
 * - Sidewalk kiosk pair (`Cidade_Object_161` & `266`) excluded via obstacle AABB.
 */
export const DEFAULT_URBAN_SIDEWALK_BOUNDS: SidewalkBoundsComponent = {
  minX: -19.35,
  maxX: 10.75,
  minZ: -3.3,
  maxZ: 4.1,
  plazaMinX: -5.55,
  plazaMaxX: 0.55,
  corridorMinZ: -3.25,
  corridorMaxZ: -1.92,
  westStorefrontMinX: -17.65,
  westStorefrontMaxX: -9.35,
  westStorefrontMinZ: -2.5,
  obstacles: [
    // Sidewalk kiosks (Cidade_Object_161 & Cidade_Object_266) with 0.22m character clearance
    { minX: -4.8, maxX: -2.08, minZ: 2.08, maxZ: 3.62 },
  ],
  groundY: 0.08635,
};

/**
 * Fixed-direction 3rd-person camera framing relative to `Player_Rig` (`[-2, 0.086, -1]`):
 * Keeps `Player_Rig` unobstructed in the foreground while framing the urban buildings
 * and the left lateral avenue (`x = -22.335`) where `Carro_Grupo` passes.
 */
export const URBAN_CAMERA_FOLLOW_DEFAULTS = {
  offsetX: 0.9,
  offsetY: 5.8,
  offsetZ: 8.8,
  lookAtOffsetX: -1.15,
  lookAtOffsetY: 1.48,
  lookAtOffsetZ: -0.75,
  followSharpness: 6.5,
} as const;

/**
 * Traffic cycle constants for `Carro_Grupo` on the left lateral avenue:
 * - 30.0s total cycle: 8.0s straight-line pass at constant low speed + 22.0s hidden (`visible = false`).
 */
export const URBAN_TRAFFIC_DEFAULTS = {
  cycleDuration: 30.0,
  activeDuration: 8.0,
  laneX: -22.335,
  laneY: -0.092,
  startZ: -12.5,
  endZ: 24.5,
  headingYaw: 0,
} as const;

export interface BuiltUrbanGlbStage {
  scene: THREE.Scene;
  ambientHemi: THREE.HemisphereLight;
  keyDirLight: THREE.DirectionalLight;
  rimDirLight: THREE.DirectionalLight;
  waypointMarker: THREE.Mesh;
  /** Populated once `attachPreparedAssets(...)` mounts `cena_completa.glb` into the ECS World */
  cidadeEntityId: EntityId | null;
  playerEntityId: EntityId | null;
  carroEntityId: EntityId | null;
  assets: PreparedUrbanGlbAssets | null;
}

/**
 * UrbanGlbSceneBuilder: Composes the `[ ASCII REALMS // SCENE ]` 3D environment around
 * `cena_completa.glb` (`Cidade_Sketchfab_model`, `Player_Rig`, `Carro_Grupo`), wiring
 * NLA `AnimationMixer` clips, `SidewalkBounds`, 30s `TrafficCycle` headlight rig, and
 * dynamic `day` / `night` / `rain` presets.
 */
export class UrbanGlbSceneBuilder {
  /**
   * Creates the base `THREE.Scene`, directional PCF shadow rig, hemisphere fill, fog,
   * and ground navigation ring before (or synchronously alongside) `.glb` attachment.
   */
  public static createStage(
    config: EngineConfig,
    ecsWorld?: World,
    preparedAssets?: PreparedUrbanGlbAssets
  ): BuiltUrbanGlbStage {
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(config.palette.background);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.016);

    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#0C1217'),
      0.92
    );
    scene.add(ambientHemi);

    const keyDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#C8D6E2'), 0.45),
      1.75
    );
    keyDirLight.position.set(14, 26, 16);
    keyDirLight.target.position.set(-6, 0.5, 0);
    scene.add(keyDirLight.target);

    keyDirLight.castShadow = config.enableShadows;
    keyDirLight.shadow.mapSize.width = 1536;
    keyDirLight.shadow.mapSize.height = 1536;
    keyDirLight.shadow.camera.near = 2.0;
    keyDirLight.shadow.camera.far = 78.0;
    keyDirLight.shadow.camera.left = -28;
    keyDirLight.shadow.camera.right = 22;
    keyDirLight.shadow.camera.top = 24;
    keyDirLight.shadow.camera.bottom = -24;
    keyDirLight.shadow.bias = -0.0005;
    keyDirLight.shadow.normalBias = 0.035;
    scene.add(keyDirLight);

    const rimDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.warmLight),
      0.55
    );
    rimDirLight.position.set(-18, 12, -14);
    scene.add(rimDirLight);

    // Subtle #4A7C7E sidewalk waypoint ring for click/tap movement feedback
    const waypointGeo = new THREE.RingGeometry(0.24, 0.36, 24);
    waypointGeo.rotateX(-Math.PI / 2);
    const waypointMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(config.palette.warmLight),
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
    const waypointMarker = new THREE.Mesh(waypointGeo, waypointMat);
    waypointMarker.name = 'UrbanWaypointMarker';
    waypointMarker.visible = false;
    scene.add(waypointMarker);

    const stage: BuiltUrbanGlbStage = {
      scene,
      ambientHemi,
      keyDirLight,
      rimDirLight,
      waypointMarker,
      cidadeEntityId: null,
      playerEntityId: null,
      carroEntityId: null,
      assets: null,
    };

    if (ecsWorld && preparedAssets) {
      UrbanGlbSceneBuilder.attachPreparedAssets(stage, preparedAssets, config, ecsWorld);
    } else {
      UrbanGlbSceneBuilder.applyAtmosphere(stage, config, ecsWorld);
    }

    return stage;
  }

  /**
   * Maps the 3 root nodes of `cena_completa.glb` (`Cidade_Sketchfab_model`, `Player_Rig`,
   * `Carro_Grupo`) into ECS entities with NLA animations, sidewalk clamping, and traffic lights.
   */
  public static attachPreparedAssets(
    stage: BuiltUrbanGlbStage,
    assets: PreparedUrbanGlbAssets,
    config: EngineConfig,
    ecsWorld: World
  ): void {
    stage.assets = assets;

    const { cidade, playerRig, carroGrupo } = assets.nodes;

    // Detach from temporary GLTF wrapper scene and mount directly onto our managed THREE.Scene
    stage.scene.add(cidade);
    stage.scene.add(playerRig);
    stage.scene.add(carroGrupo);

    // 1. Static Urban Environment Entity (`Cidade_Sketchfab_model`)
    const cidadeId = ecsWorld.createEntity();
    ecsWorld
      .addComponent(cidadeId, 'LifecycleTag', {
        role: 'environment',
        label: 'Cidade_Sketchfab_model',
      })
      .addComponent(cidadeId, 'DepthLayer', {
        layer: 'midground',
        order: 1,
        contrastPriority: 0.72,
      })
      .addComponent(cidadeId, 'Transform', {
        x: cidade.position.x,
        y: cidade.position.y,
        z: cidade.position.z,
        rotX: cidade.rotation.x,
        rotY: cidade.rotation.y,
        rotZ: cidade.rotation.z,
        scaleX: cidade.scale.x,
        scaleY: cidade.scale.y,
        scaleZ: cidade.scale.z,
      })
      .addComponent(cidadeId, 'Renderable', {
        object3D: cidade,
        disposeOnDestroy: true,
      });

    // 2. Controllable Character Entity (`Player_Rig` with NLA `Idle` / `Walking` / `Casting`)
    const groundY = playerRig.position.y || DEFAULT_URBAN_SIDEWALK_BOUNDS.groundY;
    const sidewalkBounds: SidewalkBoundsComponent = {
      ...DEFAULT_URBAN_SIDEWALK_BOUNDS,
      obstacles: DEFAULT_URBAN_SIDEWALK_BOUNDS.obstacles.map((o) => ({ ...o })),
      groundY,
    };

    const mixer = new THREE.AnimationMixer(playerRig);
    const idleAction = assets.clips.Idle ? mixer.clipAction(assets.clips.Idle) : null;
    const walkAction = assets.clips.Walking ? mixer.clipAction(assets.clips.Walking) : null;
    const castAction = assets.clips.Casting ? mixer.clipAction(assets.clips.Casting) : null;

    if (idleAction) {
      idleAction.setLoop(THREE.LoopRepeat, Infinity);
      idleAction.play();
    }
    if (walkAction) {
      walkAction.setLoop(THREE.LoopRepeat, Infinity);
    }
    if (castAction) {
      castAction.setLoop(THREE.LoopOnce, 1);
      castAction.clampWhenFinished = true;
    }

    const playerId = ecsWorld.createEntity();
    const charAnimComp: CharacterAnimationComponent = {
      mixer,
      root: playerRig,
      actions: {
        Idle: idleAction,
        Walking: walkAction,
        Casting: castAction,
      },
      durations: {
        Idle: assets.clips.Idle?.duration ?? 2.0,
        Walking: assets.clips.Walking?.duration ?? 1.0,
        Casting: assets.clips.Casting?.duration ?? 1.47,
      },
      activeClip: 'Idle',
      castRemaining: 0,
      crossFadeDuration: 0.22,
      interactRequested: false,
      disposeListener: undefined,
    };

    const onMixerFinished = (ev: { action?: THREE.AnimationAction }): void => {
      if (castAction && ev.action === castAction && charAnimComp.activeClip === 'Casting') {
        charAnimComp.castRemaining = 0;
      }
    };
    mixer.addEventListener('finished', onMixerFinished);
    charAnimComp.disposeListener = () => {
      mixer.removeEventListener('finished', onMixerFinished);
    };

    // Sample initial Idle pose immediately so skinning matrices are valid on frame 0
    mixer.update(0.0001);

    ecsWorld
      .addComponent(playerId, 'LifecycleTag', {
        role: 'avatar',
        label: 'Player_Rig',
      })
      .addComponent(playerId, 'DepthLayer', {
        layer: 'foreground',
        order: 0,
        contrastPriority: 1.0,
      })
      .addComponent(playerId, 'Transform', {
        x: playerRig.position.x,
        y: groundY,
        z: playerRig.position.z,
        rotX: playerRig.rotation.x,
        rotY: playerRig.rotation.y,
        rotZ: playerRig.rotation.z,
        scaleX: playerRig.scale.x,
        scaleY: playerRig.scale.y,
        scaleZ: playerRig.scale.z,
      })
      .addComponent(playerId, 'Velocity', {
        vx: 0,
        vy: 0,
        vz: 0,
        angularVx: 0,
        angularVy: 0,
        angularVz: 0,
        damping: 12.0,
      })
      .addComponent(playerId, 'RotationTarget', {
        targetYaw: playerRig.rotation.y,
        targetPitch: 0,
        targetRoll: 0,
        lerpSpeed: 10.5,
        idleSpinSpeed: 0,
        maxPitch: 0.15,
      })
      .addComponent(playerId, 'InputState', {
        pointerX: 0,
        pointerY: 0,
        pointerActive: false,
        isDragging: false,
        moveX: 0,
        moveZ: 0,
        yawSensitivity: 0.6,
        pitchSensitivity: 0.25,
        moveSpeed: 3.6,
        boundsRadius: 0,
      })
      .addComponent(playerId, 'NavigationTarget', {
        targetX: playerRig.position.x,
        targetZ: playerRig.position.z,
        active: false,
        moveSpeed: 3.6,
        arrivalRadius: 0.14,
        minX: sidewalkBounds.minX,
        maxX: sidewalkBounds.maxX,
        minZ: sidewalkBounds.minZ,
        maxZ: sidewalkBounds.maxZ,
      })
      .addComponent(playerId, 'SidewalkBounds', sidewalkBounds)
      .addComponent(playerId, 'CharacterAnimation', charAnimComp)
      .addComponent(playerId, 'CameraFollow', {
        ...URBAN_CAMERA_FOLLOW_DEFAULTS,
        autoOrbit: Boolean(config.autoOrbit),
        orbitAngle: 0,
        orbitSpeed: 0.42,
        initialized: false,
      })
      .addComponent(playerId, 'Renderable', {
        object3D: playerRig,
        disposeOnDestroy: true,
      });

    // 3. Moving Light-Source Vehicle Entity (`Carro_Grupo` on Left Lateral Avenue)
    const carScale = Math.max(0.0001, Math.abs(carroGrupo.scale.x));
    const invScale = 1 / carScale;
    const beamColor = new THREE.Color('#D8E6F0').lerp(new THREE.Color(config.palette.warmCore), 0.35);
    const streetPoolColor = new THREE.Color(config.palette.warmLight).lerp(beamColor, 0.55);

    const headlightLeft = new THREE.SpotLight(beamColor, 18.0, 30.0, Math.PI * 0.26, 0.55, 1.35);
    headlightLeft.position.set(-1.12 * invScale, 1.18 * invScale, 0.24 * invScale);
    headlightLeft.target.position.set(-0.6 * invScale, -0.22 * invScale, 16.0 * invScale);
    carroGrupo.add(headlightLeft);
    carroGrupo.add(headlightLeft.target);

    const headlightRight = new THREE.SpotLight(beamColor, 18.0, 32.0, Math.PI * 0.28, 0.55, 1.35);
    headlightRight.position.set(1.12 * invScale, 1.18 * invScale, 0.24 * invScale);
    // Slight inward/rightward aim sweeps moving illumination across adjacent building facades!
    headlightRight.target.position.set(3.8 * invScale, 0.35 * invScale, 15.5 * invScale);
    carroGrupo.add(headlightRight);
    carroGrupo.add(headlightRight.target);

    const streetThrowLight = new THREE.PointLight(streetPoolColor, 9.5, 24.0, 1.45);
    streetThrowLight.position.set(0.6 * invScale, 1.45 * invScale, 3.2 * invScale);
    carroGrupo.add(streetThrowLight);

    const taillightGlow = new THREE.PointLight(new THREE.Color('#9E3B3B'), 2.4, 8.5, 1.7);
    taillightGlow.position.set(0, 1.05 * invScale, -9.5 * invScale);
    carroGrupo.add(taillightGlow);

    for (const mat of assets.materials.carHeadlightCovers) {
      mat.emissive = beamColor.clone();
      mat.emissiveIntensity = 0.85;
    }

    const carroId = ecsWorld.createEntity();
    ecsWorld
      .addComponent(carroId, 'LifecycleTag', {
        role: 'vehicle',
        label: 'Carro_Grupo',
      })
      .addComponent(carroId, 'DepthLayer', {
        layer: 'midground',
        order: 1,
        contrastPriority: 0.9,
      })
      .addComponent(carroId, 'Transform', {
        x: URBAN_TRAFFIC_DEFAULTS.laneX,
        y: URBAN_TRAFFIC_DEFAULTS.laneY,
        z: URBAN_TRAFFIC_DEFAULTS.startZ,
        rotX: carroGrupo.rotation.x,
        rotY: URBAN_TRAFFIC_DEFAULTS.headingYaw,
        rotZ: carroGrupo.rotation.z,
        scaleX: carroGrupo.scale.x,
        scaleY: carroGrupo.scale.y,
        scaleZ: carroGrupo.scale.z,
      })
      .addComponent(carroId, 'TrafficCycle', {
        cycleDuration: URBAN_TRAFFIC_DEFAULTS.cycleDuration,
        activeDuration: URBAN_TRAFFIC_DEFAULTS.activeDuration,
        laneX: URBAN_TRAFFIC_DEFAULTS.laneX,
        laneY: URBAN_TRAFFIC_DEFAULTS.laneY,
        startZ: URBAN_TRAFFIC_DEFAULTS.startZ,
        endZ: URBAN_TRAFFIC_DEFAULTS.endZ,
        headingYaw: URBAN_TRAFFIC_DEFAULTS.headingYaw,
        timeOffset: 0,
        headlightLeft,
        headlightRight,
        streetThrowLight,
        taillightGlow,
        baseSpotIntensity: 18.0,
        basePointIntensity: 9.5,
        baseTailIntensity: 2.4,
        headlightMaterials: assets.materials.carHeadlightCovers,
      })
      .addComponent(carroId, 'Renderable', {
        object3D: carroGrupo,
        disposeOnDestroy: true,
      });

    stage.cidadeEntityId = cidadeId;
    stage.playerEntityId = playerId;
    stage.carroEntityId = carroId;

    UrbanGlbSceneBuilder.applyAtmosphere(stage, config, ecsWorld);
  }

  /**
   * Synchronizes lighting, fog, wet/dry road & sidewalk materials, building window emissives,
   * and `Carro_Grupo` headlight intensities across `'day'`, `'night'`, and `'rain'` presets.
   */
  public static applyAtmosphere(
    stage: BuiltUrbanGlbStage,
    config: EngineConfig,
    ecsWorld?: World
  ): void {
    const mode = config.atmosphere;
    const bg = new THREE.Color(config.palette.background);
    stage.scene.background = bg;

    const fog = stage.scene.fog as THREE.FogExp2 | null;
    if (fog && fog.isFogExp2) {
      fog.color.copy(bg);
      fog.density = mode === 'rain' ? 0.023 : mode === 'day' ? 0.011 : 0.016;
    }

    const cool = new THREE.Color(config.palette.coolAmbient);
    const warm = new THREE.Color(config.palette.warmLight);
    const core = new THREE.Color(config.palette.warmCore);

    if (mode === 'day') {
      stage.ambientHemi.color.copy(cool).lerp(new THREE.Color('#D5E2EC'), 0.55);
      stage.ambientHemi.groundColor.set('#222D36');
      stage.ambientHemi.intensity = 1.65;

      stage.keyDirLight.color.set('#E2ECF4');
      stage.keyDirLight.intensity = 2.95;
      stage.keyDirLight.position.set(18, 32, 14);

      stage.rimDirLight.color.copy(cool);
      stage.rimDirLight.intensity = 0.72;
    } else if (mode === 'rain') {
      stage.ambientHemi.color.copy(cool);
      stage.ambientHemi.groundColor.set('#090E13');
      stage.ambientHemi.intensity = 0.85;

      stage.keyDirLight.color.copy(cool).lerp(new THREE.Color('#9BB0C2'), 0.35);
      stage.keyDirLight.intensity = 1.45;
      stage.keyDirLight.position.set(11, 25, 16);

      stage.rimDirLight.color.copy(warm);
      stage.rimDirLight.intensity = 0.68;
    } else {
      // 'night'
      stage.ambientHemi.color.copy(cool);
      stage.ambientHemi.groundColor.set('#0C1217');
      stage.ambientHemi.intensity = 0.96;

      stage.keyDirLight.color.copy(cool).lerp(new THREE.Color('#C4D3E0'), 0.42);
      stage.keyDirLight.intensity = 1.78;
      stage.keyDirLight.position.set(14, 26, 16);

      stage.rimDirLight.color.copy(warm);
      stage.rimDirLight.intensity = 0.58;
    }

    stage.keyDirLight.castShadow = config.enableShadows;
    (stage.waypointMarker.material as THREE.MeshBasicMaterial).color.copy(warm);

    // Update road wetness, sidewalk sheen, and building window / streetlamp emissives
    if (stage.assets) {
      const roadRoughness = mode === 'rain' ? 0.16 : mode === 'day' ? 0.92 : 0.62;
      const roadMetalness = mode === 'rain' ? 0.36 : mode === 'day' ? 0.04 : 0.14;
      for (const mat of stage.assets.materials.roads) {
        mat.roughness = roadRoughness;
        mat.metalness = roadMetalness;
      }

      const sidewalkRoughness = mode === 'rain' ? 0.22 : mode === 'day' ? 0.88 : 0.68;
      const sidewalkMetalness = mode === 'rain' ? 0.26 : 0.05;
      for (const mat of stage.assets.materials.sidewalks) {
        mat.roughness = sidewalkRoughness;
        mat.metalness = sidewalkMetalness;
      }

      const windowGlow = mode === 'day' ? 0.05 : mode === 'rain' ? 0.52 : 0.46;
      const windowTint = warm.clone().lerp(core, 0.45);
      for (const mat of stage.assets.materials.windows) {
        if (mat.emissive) {
          mat.emissive.copy(windowTint);
          mat.emissiveIntensity = windowGlow;
        }
      }

      const lampScale = mode === 'day' ? 0.18 : mode === 'rain' ? 0.92 : 0.82;
      for (const mat of stage.assets.materials.streetLamps) {
        mat.emissiveIntensity = lampScale;
      }
    }

    // Update `Carro_Grupo` moving headlight intensities per preset
    if (ecsWorld && stage.carroEntityId !== null) {
      const traffic = ecsWorld.getComponent(stage.carroEntityId, 'TrafficCycle');
      if (traffic) {
        if (mode === 'day') {
          traffic.baseSpotIntensity = 5.5;
          traffic.basePointIntensity = 2.8;
          traffic.baseTailIntensity = 0.8;
        } else if (mode === 'rain') {
          traffic.baseSpotIntensity = 24.0;
          traffic.basePointIntensity = 12.5;
          traffic.baseTailIntensity = 3.2;
        } else {
          traffic.baseSpotIntensity = 19.5;
          traffic.basePointIntensity = 10.0;
          traffic.baseTailIntensity = 2.5;
        }
      }
    }
  }
}
