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
 * - Initial promenade anchor of `Player_Rig`: `(-3.8, 0.08635, -1.1)`
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
 * Default promenade spawn coordinates for `Player_Rig` in the open central clearing
 * between the East and West tree planters, centered in front of the storefront facade.
 */
export const DEFAULT_URBAN_PLAYER_SPAWN = {
  x: -3.8,
  y: 0.08635,
  z: -1.1,
} as const;

/**
 * Elevated 3rd-person camera rotated 45° counter-clockwise (`+X, +Z` -> looking North-West
 * `-X, -Z`), tilted from top to ground (~41.5° pitch), and pulled back (~17.8m 3D distance)
 * to frame the wide street, storefront facades, streetlamps, foliage, and `Carro_Grupo` avenue
 * while smoothly following (`lerp`) `Player_Rig`.
 */
export const URBAN_CAMERA_FOLLOW_DEFAULTS = {
  offsetX: 10.2,
  offsetY: 11.2,
  offsetZ: 9.4,
  lookAtOffsetX: -2.3,
  lookAtOffsetY: 0.95,
  lookAtOffsetZ: -1.5,
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

export interface UrbanArchitecturalLightRig {
  group: THREE.Group;
  storefrontEastLight: THREE.PointLight;
  storefrontWestLight: THREE.PointLight;
  kioskWarmLight: THREE.PointLight;
  streetLampWest: THREE.PointLight;
  streetLampCenter: THREE.PointLight;
  streetLampEast: THREE.PointLight;
  emissiveFixtureMaterials: THREE.MeshStandardMaterial[];
}

export interface BuiltUrbanGlbStage {
  scene: THREE.Scene;
  ambientHemi: THREE.HemisphereLight;
  keyDirLight: THREE.DirectionalLight;
  rimDirLight: THREE.DirectionalLight;
  urbanLightRig: UrbanArchitecturalLightRig;
  playerRimLight: THREE.PointLight | null;
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
 * NLA `AnimationMixer` clips, `SidewalkBounds`, 45° counter-clockwise elevated camera,
 * storefront & streetlamp lighting, 30s `TrafficCycle` headlight rig, and `day`/`night`/`rain` presets.
 */
export class UrbanGlbSceneBuilder {
  private static createArchitecturalLightRig(scene: THREE.Scene): UrbanArchitecturalLightRig {
    const group = new THREE.Group();
    group.name = 'UrbanArchitecturalLightRig';

    const emissiveFixtureMaterials: THREE.MeshStandardMaterial[] = [];

    const makeFixtureMat = (hex: string, emissiveHex: string, intensity: number): THREE.MeshStandardMaterial => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hex),
        emissive: new THREE.Color(emissiveHex),
        emissiveIntensity: intensity,
        roughness: 0.35,
        metalness: 0.1,
      });
      emissiveFixtureMaterials.push(mat);
      return mat;
    };

    // 1. Storefront Facade Lights & Transom Glow Bars (quantized into warm `Q 8 $ # o a` glyphs)
    const storefrontEastLight = new THREE.PointLight(new THREE.Color('#EEA84B'), 7.8, 16.5, 1.55);
    storefrontEastLight.position.set(-4.35, 2.95, -2.75);
    group.add(storefrontEastLight);

    const eastSignGeo = new THREE.BoxGeometry(5.6, 0.28, 0.14);
    const eastSignMat = makeFixtureMat('#3A2B1C', '#F4B458', 1.35);
    const eastSignMesh = new THREE.Mesh(eastSignGeo, eastSignMat);
    eastSignMesh.name = 'StorefrontEastTransom';
    eastSignMesh.position.set(-4.35, 3.18, -3.46);
    eastSignMesh.userData.skipObjectOutline = true;
    group.add(eastSignMesh);

    const storefrontWestLight = new THREE.PointLight(new THREE.Color('#E39E44'), 7.4, 16.5, 1.55);
    storefrontWestLight.position.set(-13.25, 3.05, -1.85);
    group.add(storefrontWestLight);

    const westSignGeo = new THREE.BoxGeometry(5.2, 0.26, 0.14);
    const westSignMat = makeFixtureMat('#38291A', '#ECA84C', 1.28);
    const westSignMesh = new THREE.Mesh(westSignGeo, westSignMat);
    westSignMesh.name = 'StorefrontWestTransom';
    westSignMesh.position.set(-13.25, 3.22, -2.56);
    westSignMesh.userData.skipObjectOutline = true;
    group.add(westSignMesh);

    // Sidewalk Kiosk Warm Counter Glow (projects warm reflections onto the foreground street)
    const kioskWarmLight = new THREE.PointLight(new THREE.Color('#E8AA54'), 5.2, 12.5, 1.6);
    kioskWarmLight.position.set(-3.42, 2.25, 3.55);
    group.add(kioskWarmLight);

    // 2. Streetlamps / Luminaires Along the Roadway (`Cidade_Object_336`, `302`, `225`)
    const lampGlobeGeo = new THREE.SphereGeometry(0.22, 10, 8);
    const lampGlobeMat = makeFixtureMat('#FFF2D6', '#F8C472', 1.65);

    const streetLampWest = new THREE.PointLight(new THREE.Color('#F4BE6E'), 10.5, 23.0, 1.45);
    streetLampWest.position.set(-17.99, 5.95, 3.14);
    group.add(streetLampWest);

    const globeWest = new THREE.Mesh(lampGlobeGeo, lampGlobeMat);
    globeWest.name = 'StreetLampGlobeWest';
    globeWest.position.set(-17.99, 6.18, 3.14);
    globeWest.userData.skipObjectOutline = true;
    group.add(globeWest);

    const streetLampCenter = new THREE.PointLight(new THREE.Color('#EDB566'), 9.2, 20.0, 1.5);
    streetLampCenter.position.set(-1.5, 5.65, 3.85);
    group.add(streetLampCenter);

    const globeCenter = new THREE.Mesh(lampGlobeGeo, lampGlobeMat);
    globeCenter.name = 'StreetLampGlobeCenter';
    globeCenter.position.set(-1.5, 5.88, 3.72);
    globeCenter.userData.skipObjectOutline = true;
    group.add(globeCenter);

    const streetLampEast = new THREE.PointLight(new THREE.Color('#E4AC5E'), 7.8, 18.5, 1.55);
    streetLampEast.position.set(8.4, 5.95, 4.83);
    group.add(streetLampEast);

    const globeEast = new THREE.Mesh(lampGlobeGeo, lampGlobeMat);
    globeEast.name = 'StreetLampGlobeEast';
    globeEast.position.set(8.4, 6.18, 4.83);
    globeEast.userData.skipObjectOutline = true;
    group.add(globeEast);

    scene.add(group);

    return {
      group,
      storefrontEastLight,
      storefrontWestLight,
      kioskWarmLight,
      streetLampWest,
      streetLampCenter,
      streetLampEast,
      emissiveFixtureMaterials,
    };
  }

  /**
   * Creates the base `THREE.Scene`, directional PCF shadow rig, hemisphere fill,
   * architectural storefront/streetlamp lights, fog, and ground navigation ring.
   */
  public static createStage(
    config: EngineConfig,
    ecsWorld?: World,
    preparedAssets?: PreparedUrbanGlbAssets
  ): BuiltUrbanGlbStage {
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(config.palette.background);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.015);

    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#090E13'),
      0.78
    );
    scene.add(ambientHemi);

    const keyDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#C8D6E2'), 0.45),
      1.48
    );
    keyDirLight.position.set(16, 28, 18);
    keyDirLight.target.position.set(-6, 0.5, 0);
    scene.add(keyDirLight.target);

    keyDirLight.castShadow = config.enableShadows;
    keyDirLight.shadow.mapSize.width = 1536;
    keyDirLight.shadow.mapSize.height = 1536;
    keyDirLight.shadow.camera.near = 2.0;
    keyDirLight.shadow.camera.far = 86.0;
    keyDirLight.shadow.camera.left = -32;
    keyDirLight.shadow.camera.right = 24;
    keyDirLight.shadow.camera.top = 26;
    keyDirLight.shadow.camera.bottom = -26;
    keyDirLight.shadow.bias = -0.0005;
    keyDirLight.shadow.normalBias = 0.035;
    scene.add(keyDirLight);

    const rimDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.warmLight),
      0.52
    );
    rimDirLight.position.set(-20, 14, -15);
    scene.add(rimDirLight);

    const urbanLightRig = UrbanGlbSceneBuilder.createArchitecturalLightRig(scene);

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
      urbanLightRig,
      playerRimLight: null,
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
    const spawnX = DEFAULT_URBAN_PLAYER_SPAWN.x;
    const spawnZ = DEFAULT_URBAN_PLAYER_SPAWN.z;
    playerRig.position.set(spawnX, groundY, spawnZ);

    // Subtle crisp ivory silhouette catchlight on `Player_Rig` so character reads cleanly against dark pavement
    const rigScale = Math.max(0.001, Math.abs(playerRig.scale.y || 1));
    const playerRimLight = new THREE.PointLight(new THREE.Color('#DCEAF6'), 2.4, 5.2, 1.75);
    playerRimLight.position.set(0, 2.45 / rigScale, 0.22 / rigScale);
    playerRig.add(playerRimLight);
    stage.playerRimLight = playerRimLight;

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
        x: spawnX,
        y: groundY,
        z: spawnZ,
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
        targetX: spawnX,
        targetZ: spawnZ,
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
    const beamColor = new THREE.Color('#F4DDA8');
    const streetPoolColor = new THREE.Color('#EBBA70');

    const headlightLeft = new THREE.SpotLight(beamColor, 21.0, 34.0, Math.PI * 0.28, 0.55, 1.3);
    headlightLeft.position.set(-1.12 * invScale, 1.18 * invScale, 0.24 * invScale);
    headlightLeft.target.position.set(-0.4 * invScale, -0.25 * invScale, 17.5 * invScale);
    carroGrupo.add(headlightLeft);
    carroGrupo.add(headlightLeft.target);

    const headlightRight = new THREE.SpotLight(beamColor, 21.0, 36.0, Math.PI * 0.30, 0.55, 1.3);
    headlightRight.position.set(1.12 * invScale, 1.18 * invScale, 0.24 * invScale);
    // Angled inward sweep illuminates curb, lamppost, and adjacent building facades as car passes!
    headlightRight.target.position.set(4.5 * invScale, 0.42 * invScale, 16.5 * invScale);
    carroGrupo.add(headlightRight);
    carroGrupo.add(headlightRight.target);

    const streetThrowLight = new THREE.PointLight(streetPoolColor, 11.5, 26.0, 1.4);
    streetThrowLight.position.set(0.8 * invScale, 1.35 * invScale, 4.2 * invScale);
    carroGrupo.add(streetThrowLight);

    const taillightGlow = new THREE.PointLight(new THREE.Color('#B53D3D'), 2.8, 9.5, 1.65);
    taillightGlow.position.set(0, 1.05 * invScale, -9.5 * invScale);
    carroGrupo.add(taillightGlow);

    for (const mat of assets.materials.carHeadlightCovers) {
      mat.emissive = beamColor.clone();
      mat.emissiveIntensity = 1.05;
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
        baseSpotIntensity: 21.0,
        basePointIntensity: 11.5,
        baseTailIntensity: 2.8,
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
   * Synchronizes directional/hemisphere lights, architectural storefront & streetlamp rigs,
   * fog, wet/dry reflective road & sidewalk materials, foliage tones, building windows,
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
      fog.density = mode === 'rain' ? 0.023 : mode === 'day' ? 0.010 : 0.015;
    }

    const cool = new THREE.Color(config.palette.coolAmbient);
    const warm = new THREE.Color(config.palette.warmLight);
    const rig = stage.urbanLightRig;

    if (mode === 'day') {
      stage.ambientHemi.color.copy(cool).lerp(new THREE.Color('#D5E2EC'), 0.55);
      stage.ambientHemi.groundColor.set('#222D36');
      stage.ambientHemi.intensity = 1.55;

      stage.keyDirLight.color.set('#E2ECF4');
      stage.keyDirLight.intensity = 2.95;
      stage.keyDirLight.position.set(18, 32, 16);

      stage.rimDirLight.color.copy(cool);
      stage.rimDirLight.intensity = 0.68;

      rig.storefrontEastLight.intensity = 1.2;
      rig.storefrontWestLight.intensity = 1.1;
      rig.kioskWarmLight.intensity = 0.8;
      rig.streetLampWest.intensity = 1.0;
      rig.streetLampCenter.intensity = 0.9;
      rig.streetLampEast.intensity = 0.8;
      for (const m of rig.emissiveFixtureMaterials) {
        m.emissiveIntensity = 0.25;
      }
      if (stage.playerRimLight) {
        stage.playerRimLight.intensity = 0.9;
      }
    } else if (mode === 'rain') {
      stage.ambientHemi.color.copy(cool);
      stage.ambientHemi.groundColor.set('#080C10');
      stage.ambientHemi.intensity = 0.72;

      stage.keyDirLight.color.copy(cool).lerp(new THREE.Color('#9BB0C2'), 0.35);
      stage.keyDirLight.intensity = 1.28;
      stage.keyDirLight.position.set(14, 27, 18);

      stage.rimDirLight.color.copy(warm);
      stage.rimDirLight.intensity = 0.64;

      rig.storefrontEastLight.intensity = 9.2;
      rig.storefrontWestLight.intensity = 8.6;
      rig.kioskWarmLight.intensity = 6.4;
      rig.streetLampWest.intensity = 12.2;
      rig.streetLampCenter.intensity = 10.8;
      rig.streetLampEast.intensity = 9.0;
      for (const m of rig.emissiveFixtureMaterials) {
        m.emissiveIntensity = 1.65;
      }
      if (stage.playerRimLight) {
        stage.playerRimLight.intensity = 2.8;
      }
    } else {
      // 'night' — dark Cyber-Noir base with warm amber storefront/streetlamp pools & wet sheen
      stage.ambientHemi.color.copy(cool);
      stage.ambientHemi.groundColor.set('#090E13');
      stage.ambientHemi.intensity = 0.78;

      stage.keyDirLight.color.copy(cool).lerp(new THREE.Color('#C4D3E0'), 0.40);
      stage.keyDirLight.intensity = 1.48;
      stage.keyDirLight.position.set(16, 28, 18);

      stage.rimDirLight.color.copy(warm);
      stage.rimDirLight.intensity = 0.54;

      rig.storefrontEastLight.intensity = 7.8;
      rig.storefrontWestLight.intensity = 7.4;
      rig.kioskWarmLight.intensity = 5.2;
      rig.streetLampWest.intensity = 10.5;
      rig.streetLampCenter.intensity = 9.2;
      rig.streetLampEast.intensity = 7.8;
      for (const m of rig.emissiveFixtureMaterials) {
        m.emissiveIntensity = 1.40;
      }
      if (stage.playerRimLight) {
        stage.playerRimLight.intensity = 2.4;
      }
    }

    stage.keyDirLight.castShadow = config.enableShadows;
    (stage.waypointMarker.material as THREE.MeshBasicMaterial).color.copy(warm);

    // Update road wetness, sidewalk specular sheen, foliage tones, and window/lamp emissives
    if (stage.assets) {
      const roadRoughness = mode === 'rain' ? 0.14 : mode === 'day' ? 0.90 : 0.30;
      const roadMetalness = mode === 'rain' ? 0.42 : mode === 'day' ? 0.04 : 0.28;
      for (const mat of stage.assets.materials.roads) {
        mat.roughness = roadRoughness;
        mat.metalness = roadMetalness;
      }

      const sidewalkRoughness = mode === 'rain' ? 0.20 : mode === 'day' ? 0.88 : 0.42;
      const sidewalkMetalness = mode === 'rain' ? 0.32 : mode === 'day' ? 0.05 : 0.18;
      for (const mat of stage.assets.materials.sidewalks) {
        mat.roughness = sidewalkRoughness;
        mat.metalness = sidewalkMetalness;
      }

      // Warm golden-amber window glow on storefronts & upper stories (`Q 8 $ # o a` reference look)
      const windowGlow = mode === 'day' ? 0.06 : mode === 'rain' ? 0.78 : 0.68;
      const windowAmber = new THREE.Color('#E8A64B');
      for (const mat of stage.assets.materials.windows) {
        if (mat.emissive) {
          mat.emissive.copy(windowAmber);
          mat.emissiveIntensity = windowGlow;
        }
      }

      const kioskGlow = mode === 'day' ? 0.08 : mode === 'rain' ? 0.65 : 0.56;
      const kioskAmber = new THREE.Color('#DE9E48');
      for (const mat of stage.assets.materials.kioskGlass) {
        if (mat.emissive) {
          mat.emissive.copy(kioskAmber);
          mat.emissiveIntensity = kioskGlow;
        }
      }

      // Contained dark-emerald / moss-sage lift on foliage canopies & grass beds
      const foliageLift = mode === 'day' ? 0.02 : mode === 'rain' ? 0.11 : 0.09;
      const mossEmissive = new THREE.Color('#1E462E');
      for (const mat of stage.assets.materials.foliage) {
        if (mat.emissive) {
          mat.emissive.copy(mossEmissive);
          mat.emissiveIntensity = foliageLift;
        }
      }

      const lampScale = mode === 'day' ? 0.18 : mode === 'rain' ? 1.25 : 1.12;
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
          traffic.baseSpotIntensity = 26.0;
          traffic.basePointIntensity = 14.0;
          traffic.baseTailIntensity = 3.4;
        } else {
          traffic.baseSpotIntensity = 21.0;
          traffic.basePointIntensity = 11.5;
          traffic.baseTailIntensity = 2.8;
        }
      }
    }
  }
}
