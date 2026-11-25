import * as THREE from 'three';
import type { EntityBlueprintRegistry } from '../ecs/EntityBlueprint';
import type { EntityId, World } from '../ecs/World';
import { PlaygroundEntityFactory } from '../entities/PlaygroundEntityFactory';
import {
  atmosphereWaterParams,
  createSanctuaryWaterMaterial,
} from '../shaders/waterShader';
import type { EngineConfig } from '../types';
import type {
  BuildingSpawnDef,
  PlaygroundMapDefinition,
  StreetPoleSpawnDef,
} from './MapLoader';
import {
  type NeonMaterialBank,
  SceneComposerKit,
  SceneDepthRig,
} from './SceneComposerKit';

export interface BuiltPlaygroundScene {
  scene: THREE.Scene;
  depthRig: SceneDepthRig;
  materialBank: NeonMaterialBank;
  blueprintRegistry: EntityBlueprintRegistry;
  foundationMaterial: THREE.MeshStandardMaterial;
  waterMesh: THREE.Mesh;
  waterMaterial: THREE.ShaderMaterial;
  ambientHemi: THREE.HemisphereLight;
  moonDirLight: THREE.DirectionalLight;
  torchLight: THREE.PointLight;
  brazierLights: THREE.PointLight[];
  skySunMesh: THREE.Mesh;
  skyHaloMesh: THREE.Mesh;
  skyBeams: THREE.Mesh[];
  starPoints: THREE.Points;
  neonMaterials: {
    cyan: THREE.MeshStandardMaterial;
    magenta: THREE.MeshStandardMaterial;
    amber: THREE.MeshStandardMaterial;
  };
  waypointMarker: THREE.Mesh;
  shrineEntityId: EntityId;
  avatarEntityId: EntityId;
  terrainHeightAt: (x: number, z: number) => number;
}

/**
 * PlaygroundSceneBuilder: Composes the single unified Cyber-Noir + Entropism Boulevard (`[ ASCII REALMS // SCENE ]`)
 * supporting all three atmospheric states ("Dia" / `'day'`, "Noite" / `'night'`, "Com chuva" / `'rain'`)
 * with calibrated real-time PCF shadows, restrained ASCII-faithful lighting, `#0C1217` entropic sky,
 * `#1A222A` ASCII ground, and `#2A3540` weathered structures:
 *  - `DepthLayer_Foreground`: Techwear/Darkwear protagonist with mechanical arm, street bollards & foreground lamps
 *  - `DepthLayer_Midground`: Streetlamps, wind-swaying placards, overhead catenary cables, sidewalk kiosks,
 *    industrial signage, multi-story weathered brutalist buildings, elevated overpass, and horizon gyro-core
 *  - `DepthLayer_Background`: Perspective-converging entropic arcology towers with sparse window matrices & spires
 *  - `DepthLayer_Sky`: Veiled lunar/overcast disc, subtle mist shafts, and desaturated starfield.
 */
export class PlaygroundSceneBuilder {
  public static terrainHeight(x: number, z: number): number {
    const distPortal = Math.hypot(x, z + 10.4);
    if (distPortal < 2.65) {
      return 0.24;
    }

    if (Math.abs(x) >= 8.8 || z <= -12.2) {
      return 0.30;
    }
    if (Math.abs(x) >= 4.05) {
      return 0.16;
    }

    return -0.14;
  }

  public static walkableHeight(x: number, z: number, waterLevel = -0.06): number {
    return Math.max(waterLevel + 0.04, PlaygroundSceneBuilder.terrainHeight(x, z));
  }

  public static build(
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig,
    ecsWorld: World
  ): BuiltPlaygroundScene {
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(config.palette.background);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor.getHex(), mapDef.fogDensity);

    const depthRig = new SceneDepthRig(scene);
    const materialBank = SceneComposerKit.createMaterialBank(config.palette);
    const blueprintRegistry = PlaygroundEntityFactory.createDefaultBlueprintRegistry(
      config.palette,
      config.enableShadows
    );

    const neonMaterials = {
      cyan: materialBank.cyan,
      magenta: materialBank.magenta,
      amber: materialBank.amber,
    };

    // 1. Directional Cyber-Noir Shadow Rig + Restrained Hemisphere Fill
    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#0C1217'),
      0.86
    );
    scene.add(ambientHemi);

    const moonDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#B8C7D4'), 0.42),
      1.68
    );
    moonDirLight.position.set(-13, 24, 10);
    moonDirLight.target.position.set(0, 1.0, 2.0);
    scene.add(moonDirLight.target);

    moonDirLight.castShadow = config.enableShadows;
    moonDirLight.shadow.mapSize.width = 1536;
    moonDirLight.shadow.mapSize.height = 1536;
    moonDirLight.shadow.camera.near = 1.5;
    moonDirLight.shadow.camera.far = 56;
    moonDirLight.shadow.camera.left = -17;
    moonDirLight.shadow.camera.right = 17;
    moonDirLight.shadow.camera.top = 19;
    moonDirLight.shadow.camera.bottom = -16;
    moonDirLight.shadow.bias = -0.00045;
    moonDirLight.shadow.normalBias = 0.035;
    moonDirLight.shadow.radius = 1.55;
    scene.add(moonDirLight);

    // 2. Sidewalks, Concrete Curbs & Boulevard Foundation (#1A222A / #2A3540)
    const foundationMaterial = this.buildUrbanStreetFoundation(
      depthRig.midground,
      mapDef,
      config,
      materialBank
    );

    // 3. Boulevard Street Surface (`PlaneGeometry(mapDef.waterSize, mapDef.waterSize, 48, 48)`)
    const { waterMesh, waterMaterial } = this.buildReflectiveWetBoulevard(scene, mapDef, config);
    waterMesh.userData.skipObjectOutline = true;

    // Discreet #4A7C7E ASCII ground waypoint ring (visible only while navigating to a clicked/tapped target)
    const waypointGeo = new THREE.RingGeometry(0.26, 0.36, 16);
    waypointGeo.rotateX(-Math.PI / 2);
    const waypointMarker = new THREE.Mesh(waypointGeo, materialBank.magenta);
    waypointMarker.name = 'GroundWaypointReticle';
    waypointMarker.visible = false;
    waypointMarker.userData.skipObjectOutline = true;
    depthRig.foreground.add(waypointMarker);

    // 4. Streetlamps, Overhead Catenary Cables, Wind-Swaying Placards & Sidewalk Kiosks
    this.buildStreetCorridorProps(
      scene,
      depthRig,
      ecsWorld,
      blueprintRegistry,
      mapDef.streetPoles ?? [],
      materialBank
    );

    // 5. Midground Entropic Portal Arch & Elevated Transit Overpass (#2A3540)
    const [shrineX, shrineZ] = mapDef.shrineCenter;
    const shrineGroundY = this.terrainHeight(shrineX, shrineZ);
    this.buildCyberPortalAndOverpass(depthRig, shrineX, shrineGroundY, shrineZ, materialBank);

    // 6. Layered Entropic Cityscape (Foreground / Midground / Background depth groups)
    this.buildCyberCityscape(depthRig, mapDef.buildings, materialBank);

    // 7. Sky Layer: Veiled Lunar Disc, Subtle Mist Shafts & Desaturated Stars
    const skyRefs = this.buildCyberSkyBackdrop(depthRig.sky, materialBank);

    // 8. Spawn ECS Entities via Blueprint Registry with semantic DepthLayer tracking
    const reactorSpawn = blueprintRegistry.spawn(
      'cyber.holo-reactor',
      {
        world: ecsWorld,
        scene,
        parentGroup: depthRig.midground,
        position: [shrineX, shrineGroundY + 2.55, shrineZ],
        layer: 'midground',
      },
      { enableShadows: config.enableShadows }
    );
    const shrineEntityId = reactorSpawn.entityId;
    const torchLight = reactorSpawn.pointLight!;

    const brazierLights: THREE.PointLight[] = [];
    mapDef.braziers.forEach((b, idx) => {
      const by = this.terrainHeight(b.x, b.z);
      const tone = b.tone ?? (idx % 2 === 0 ? 'cyan' : 'magenta');
      const layer = SceneDepthRig.classifyZ(b.z);
      const pylonSpawn = blueprintRegistry.spawn(
        'cyber.neon-pylon',
        {
          world: ecsWorld,
          scene,
          parentGroup: depthRig.getGroup(layer),
          position: [b.x, by, b.z],
          rotationY: idx * 0.38,
          phase: idx * 1.9,
          layer,
        },
        { tone }
      );
      if (pylonSpawn.pointLight) {
        brazierLights.push(pylonSpawn.pointLight);
      }
    });

    const midCyanLight = new THREE.PointLight(
      new THREE.Color(config.palette.coolAmbient),
      3.8,
      20.0,
      1.7
    );
    midCyanLight.position.set(-4.4, 3.2, -1.8);
    scene.add(midCyanLight);
    brazierLights.push(midCyanLight);

    const midAccentLight = new THREE.PointLight(
      new THREE.Color(config.palette.warmLight),
      3.8,
      20.0,
      1.7
    );
    midAccentLight.position.set(4.4, 3.2, -1.8);
    scene.add(midAccentLight);
    brazierLights.push(midAccentLight);

    for (const droneSpec of mapDef.drones) {
      const layer = SceneDepthRig.classifyZ(droneSpec.origin[2]);
      blueprintRegistry.spawn(
        'cyber.hover-drone',
        {
          world: ecsWorld,
          scene,
          parentGroup: depthRig.getGroup(layer),
          position: droneSpec.origin,
          phase: droneSpec.phase,
          layer,
        },
        {
          amplitude: droneSpec.amplitude,
          speed: droneSpec.speed,
          tone: droneSpec.tone,
        }
      );
    }

    const [ax, az] = mapDef.avatarSpawn;
    const ay = PlaygroundSceneBuilder.walkableHeight(ax, az, mapDef.waterLevel);
    const avatarSpawn = blueprintRegistry.spawn(
      'cyber.netrunner-avatar',
      {
        world: ecsWorld,
        scene,
        parentGroup: depthRig.foreground,
        position: [ax, ay, az],
        rotationY: 0.12,
        scale: 1.12,
        layer: 'foreground',
      },
      {}
    );

    const built: BuiltPlaygroundScene = {
      scene,
      depthRig,
      materialBank,
      blueprintRegistry,
      foundationMaterial,
      waterMesh,
      waterMaterial,
      ambientHemi,
      moonDirLight,
      torchLight,
      brazierLights,
      skySunMesh: skyRefs.skySunMesh,
      skyHaloMesh: skyRefs.skyHaloMesh,
      skyBeams: skyRefs.skyBeams,
      starPoints: skyRefs.starPoints,
      neonMaterials,
      waypointMarker,
      shrineEntityId,
      avatarEntityId: avatarSpawn.entityId,
      terrainHeightAt: (x: number, z: number) =>
        PlaygroundSceneBuilder.walkableHeight(x, z, mapDef.waterLevel),
    };

    this.applyAtmosphere(built, config);
    return built;
  }

  /**
   * Transitions the single unified scenario cohesively across `'day'` ("Dia"), `'night'` ("Noite"),
   * and `'rain'` ("Com chuva"): updating directional sun/moon/storm shadow geometry, sky stars & beams,
   * fog density, architectural hull/neon balance, and dry vs wet raindrop-rippled pavement.
   */
  public static applyAtmosphere(built: BuiltPlaygroundScene, config: EngineConfig): void {
    const atmosphere = config.atmosphere ?? 'night';
    const p = config.palette;

    built.materialBank.setAtmosphere(atmosphere, p);

    if (built.scene.background instanceof THREE.Color) {
      built.scene.background.set(p.background);
    }

    if (built.scene.fog instanceof THREE.FogExp2) {
      built.scene.fog.color.set(p.background);
      built.scene.fog.density =
        atmosphere === 'day' ? 0.0085 : atmosphere === 'rain' ? 0.0255 : 0.0165;
    }

    built.moonDirLight.castShadow = config.enableShadows;
    built.torchLight.castShadow = config.enableShadows && atmosphere !== 'day';

    if (atmosphere === 'day') {
      // Overcast industrial Cyber-Noir daylight: crisp directional shadows over matte #2A3540 structures
      built.ambientHemi.color.set('#8A99A6');
      built.ambientHemi.groundColor.set('#1A222A');
      built.ambientHemi.intensity = 0.92;

      built.moonDirLight.position.set(15, 27, 11);
      built.moonDirLight.color.set('#B4C2CE');
      built.moonDirLight.intensity = 2.92;
      built.moonDirLight.shadow.radius = 1.15;

      built.foundationMaterial.roughness = 0.76;
      built.foundationMaterial.metalness = 0.24;

      built.torchLight.color.set(p.warmCore);
      built.torchLight.intensity = 3.2;
      built.brazierLights.forEach((bl, idx) => {
        bl.color.set(idx % 2 === 0 ? p.coolAmbient : p.warmLight);
        bl.intensity = 1.8;
      });

      built.starPoints.visible = false;
      for (const beam of built.skyBeams) {
        beam.visible = false;
      }
      built.skySunMesh.scale.setScalar(1.06);
    } else if (atmosphere === 'rain') {
      // Stormy Cyber-Noir downpour: veiled stars, diffused wet pavement & restrained #4A7C7E / #6E7B87 reflections
      built.ambientHemi.color.set(p.coolAmbient);
      built.ambientHemi.groundColor.set('#0C1217');
      built.ambientHemi.intensity = 0.82;

      built.moonDirLight.position.set(-9, 25, 8);
      built.moonDirLight.color.set(p.coolAmbient).lerp(new THREE.Color('#9AA9B6'), 0.35);
      built.moonDirLight.intensity = 1.48;
      built.moonDirLight.shadow.radius = 2.35;

      built.foundationMaterial.roughness = 0.44;
      built.foundationMaterial.metalness = 0.42;

      built.torchLight.color.set(p.warmLight);
      built.torchLight.intensity = 7.6;
      built.brazierLights.forEach((bl, idx) => {
        bl.color.set(idx % 2 === 0 ? p.coolAmbient : p.warmLight);
        bl.intensity = 4.4;
      });

      built.starPoints.visible = true;
      (built.starPoints.material as THREE.PointsMaterial).opacity = 0.14;
      for (let i = 0; i < built.skyBeams.length; i++) {
        const beam = built.skyBeams[i]!;
        beam.visible = true;
        const bMat = beam.material as THREE.MeshBasicMaterial;
        bMat.color.set(i === 0 ? p.coolAmbient : p.warmLight);
        bMat.opacity = 0.08;
      }
      built.skySunMesh.scale.setScalar(0.96);
    } else {
      // Nocturnal Cyber-Noir + Entropism: #0C1217 sky, #1A222A ground, #2A3540 structures & controlled ASCII lights
      built.ambientHemi.color.set(p.coolAmbient);
      built.ambientHemi.groundColor.set('#0C1217');
      built.ambientHemi.intensity = 0.88;

      built.moonDirLight.position.set(-13, 24, 10);
      built.moonDirLight.color.set(p.coolAmbient).lerp(new THREE.Color('#B8C7D4'), 0.42);
      built.moonDirLight.intensity = 1.68;
      built.moonDirLight.shadow.radius = 1.55;

      built.foundationMaterial.roughness = 0.68;
      built.foundationMaterial.metalness = 0.30;

      built.torchLight.color.set(p.warmLight);
      built.torchLight.intensity = 6.8;
      built.brazierLights.forEach((bl, idx) => {
        bl.color.set(idx % 2 === 0 ? p.coolAmbient : p.warmLight);
        bl.intensity = 3.6;
      });

      built.starPoints.visible = true;
      (built.starPoints.material as THREE.PointsMaterial).opacity = 0.55;
      for (let i = 0; i < built.skyBeams.length; i++) {
        const beam = built.skyBeams[i]!;
        beam.visible = true;
        const bMat = beam.material as THREE.MeshBasicMaterial;
        bMat.color.set(i === 0 ? p.coolAmbient : p.warmLight);
        bMat.opacity = 0.06;
      }
      built.skySunMesh.scale.setScalar(1.0);
    }

    built.moonDirLight.updateMatrixWorld();

    const u = built.waterMaterial.uniforms;
    const wp = atmosphereWaterParams(atmosphere);
    if (u.uDeepColor) u.uDeepColor.value.set('#1A222A').lerp(new THREE.Color(p.background), 0.22);
    if (u.uShallowColor) u.uShallowColor.value.set(p.coolAmbient).lerp(new THREE.Color('#8A99A6'), 0.25);
    if (u.uWarmColor) u.uWarmColor.value.set(p.warmLight);
    if (u.uWarmCoreColor) u.uWarmCoreColor.value.set(p.warmCore);
    if (u.uCursorColor) u.uCursorColor.value.set(p.cursorLight);
    if (u.uMoonDir) u.uMoonDir.value.copy(built.moonDirLight.position).normalize();
    if (u.uWetness) u.uWetness.value = wp.wetness;
    if (u.uRainIntensity) u.uRainIntensity.value = wp.rainIntensity;
    if (u.uDaylight) u.uDaylight.value = wp.daylight;
    if (u.uShadowStrength) u.uShadowStrength.value = wp.shadowStrength;
    if (u.uShadowEnabled) u.uShadowEnabled.value = config.enableShadows ? 1.0 : 0.0;
  }

  private static buildUrbanStreetFoundation(
    targetGroup: THREE.Group,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig,
    bank: NeonMaterialBank
  ): THREE.MeshStandardMaterial {
    const geo = new THREE.PlaneGeometry(
      mapDef.terrainSize,
      mapDef.terrainSize,
      mapDef.terrainSegments,
      mapDef.terrainSegments
    );
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    const roadBed = new THREE.Color('#1A222A');
    const sidewalkConcrete = new THREE.Color('#2A3540');
    const terraceSteel = new THREE.Color('#202933');
    const tileHighlight = new THREE.Color(config.palette.coolAmbient).multiplyScalar(0.28);
    const tmpColor = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = PlaygroundSceneBuilder.terrainHeight(x, z);
      pos.setY(i, y);

      if (y < 0.0) {
        tmpColor.copy(roadBed);
      } else {
        const onPaver =
          Math.abs((x % 1.5) + 1.5) % 1.5 < 0.12 || Math.abs((z % 1.5) + 1.5) % 1.5 < 0.12;
        if (onPaver && Math.abs(x) < 10.5) {
          tmpColor.copy(sidewalkConcrete).lerp(tileHighlight, 0.35);
        } else {
          tmpColor.copy(y > 0.22 ? terraceSteel : sidewalkConcrete);
        }
      }

      colors[i * 3] = tmpColor.r;
      colors[i * 3 + 1] = tmpColor.g;
      colors[i * 3 + 2] = tmpColor.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.68,
      metalness: 0.30,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.userData.skipObjectOutline = true;
    targetGroup.add(mesh);

    // Weathered #2A3540 concrete curbs (replaces legacy 28m glowing neon curb bars)
    const leftCurb = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 28.0), bank.hullMid);
    leftCurb.position.set(-4.02, 0.20, -2.5);
    leftCurb.castShadow = true;
    leftCurb.receiveShadow = true;
    targetGroup.add(leftCurb);

    const rightCurb = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 28.0), bank.hullMid);
    rightCurb.position.set(4.02, 0.20, -2.5);
    rightCurb.castShadow = true;
    rightCurb.receiveShadow = true;
    targetGroup.add(rightCurb);

    return mat;
  }

  private static buildReflectiveWetBoulevard(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig
  ): { waterMesh: THREE.Mesh; waterMaterial: THREE.ShaderMaterial } {
    const [sx, sz] = mapDef.shrineCenter;
    const sy = PlaygroundSceneBuilder.terrainHeight(sx, sz) + 2.55;

    const waterGeo = new THREE.PlaneGeometry(mapDef.waterSize, mapDef.waterSize, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMaterial = createSanctuaryWaterMaterial({
      palette: config.palette,
      shrineLightPos: new THREE.Vector3(sx, sy, sz),
      moonDir: new THREE.Vector3(-13, 24, 10),
      atmosphere: config.atmosphere,
      enableShadows: config.enableShadows,
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
    waterMesh.position.y = mapDef.waterLevel;
    waterMesh.renderOrder = 1;
    scene.add(waterMesh);

    return { waterMesh, waterMaterial };
  }

  private static buildStreetCorridorProps(
    scene: THREE.Scene,
    depthRig: SceneDepthRig,
    ecsWorld: World,
    blueprintRegistry: EntityBlueprintRegistry,
    poles: StreetPoleSpawnDef[],
    bank: NeonMaterialBank
  ): void {
    poles.forEach((p, idx) => {
      const baseY = PlaygroundSceneBuilder.terrainHeight(p.x, p.z);
      const layer = SceneDepthRig.classifyZ(p.z);
      const layerGroup = depthRig.getGroup(layer);

      const poleGroup = SceneComposerKit.composeStreetLampPole(
        {
          x: p.x,
          baseY,
          z: p.z,
          height: p.height,
          side: p.side,
          tone: p.tone,
        },
        bank
      );
      layerGroup.add(poleGroup);

      if (p.hasHangingBanner) {
        const inward = p.side < 0 ? 1 : -1;
        blueprintRegistry.spawn(
          'cyber.wind-banner',
          {
            world: ecsWorld,
            scene,
            parentGroup: layerGroup,
            position: [p.x + inward * 0.62, baseY + p.height - 0.34, p.z],
            phase: idx * 1.35,
            layer,
          },
          {
            width: 0.54,
            height: 1.3,
            tone: p.tone,
          }
        );
      }
    });

    const kioskSpecs = [
      { x: -4.85, z: 3.9, facingX: 1, tone: 'amber' as const },
      { x: 4.85, z: 3.7, facingX: -1, tone: 'cyan' as const },
      { x: -4.85, z: -0.6, facingX: 1, tone: 'magenta' as const },
      { x: 4.85, z: -0.8, facingX: -1, tone: 'amber' as const },
    ];
    for (const k of kioskSpecs) {
      const ky = PlaygroundSceneBuilder.terrainHeight(k.x, k.z);
      const layer = SceneDepthRig.classifyZ(k.z);
      depthRig.getGroup(layer).add(
        SceneComposerKit.composeStreetKioskProp(
          { x: k.x, baseY: ky, z: k.z, facingX: k.facingX, tone: k.tone },
          bank
        )
      );
    }

    const cableZList = [6.4, 1.9, -2.6];
    cableZList.forEach((cz, idx) => {
      const pivotY = 4.35;
      const layer = SceneDepthRig.classifyZ(cz);
      const sagGroup = SceneComposerKit.composeCatenaryCableSpan(
        8.6,
        idx % 2 === 0 ? 'amber' : 'cyan',
        bank
      );
      sagGroup.position.set(0, pivotY, cz);
      depthRig.getGroup(layer).add(sagGroup);

      const cableEntity = ecsWorld.createEntity();
      ecsWorld.addComponent(cableEntity, 'LifecycleTag', {
        role: 'prop',
        label: `OverheadCable_${idx}`,
      });
      ecsWorld.addComponent(cableEntity, 'DepthLayer', {
        layer,
        order: layer === 'foreground' ? 0 : 1,
        contrastPriority: 0.65,
      });
      ecsWorld.addComponent(cableEntity, 'Transform', {
        x: 0,
        y: pivotY,
        z: cz,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      });
      ecsWorld.addComponent(cableEntity, 'WindSway', {
        baseRotX: 0,
        baseRotY: 0,
        baseRotZ: 0,
        swayAmpZ: 0.035,
        swayAmpX: 0.14,
        frequency: 1.85,
        phase: idx * 1.7,
        gustFactor: 0.9,
      });
      ecsWorld.addComponent(cableEntity, 'Renderable', {
        object3D: sagGroup,
      });
    });
  }

  private static buildCyberPortalAndOverpass(
    depthRig: SceneDepthRig,
    shrineX: number,
    baseY: number,
    shrineZ: number,
    bank: NeonMaterialBank
  ): void {
    const group = new THREE.Group();
    group.position.set(shrineX, baseY, shrineZ);

    const stepBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 3.0, 0.3, 8),
      bank.hullDark
    );
    stepBase.position.y = 0.15;
    stepBase.castShadow = true;
    stepBase.receiveShadow = true;
    group.add(stepBase);

    const stepConcreteRing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.42, 0.1, 8),
      bank.hullMid
    );
    stepConcreteRing.position.y = 0.34;
    group.add(stepConcreteRing);

    for (const side of [-1, 1]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.76, 5.8, 0.78), bank.hullDark);
      tower.position.set(side * 2.55, 2.95, -0.2);
      tower.castShadow = true;
      tower.receiveShadow = true;
      group.add(tower);

      const vPilaster = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 5.3, 0.84),
        bank.poleMetal
      );
      vPilaster.position.set(side * 2.1, 2.95, -0.2);
      group.add(vPilaster);
    }

    const headerBeam = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.72, 0.96), bank.hullMid);
    headerBeam.position.set(0, 6.0, -0.2);
    headerBeam.castShadow = true;
    headerBeam.receiveShadow = true;
    group.add(headerBeam);

    // Narrow discreet #4A7C7E architectural seam (punctual use, never blows out)
    const headerSeam = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.09, 1.01), bank.magenta);
    headerSeam.position.set(0, 6.0, -0.2);
    group.add(headerSeam);

    depthRig.midground.add(group);

    // Weathered #2A3540 brutalist transit overpass
    const overpass = new THREE.Group();
    overpass.position.set(0, 6.8, -12.6);
    const bridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(20.0, 0.62, 1.4), bank.hullMid);
    bridgeDeck.castShadow = true;
    bridgeDeck.receiveShadow = true;
    overpass.add(bridgeDeck);

    const upperRail = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.14, 1.48), bank.poleMetal);
    upperRail.position.y = 0.36;
    overpass.add(upperRail);

    const lowerRail = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.12, 1.48), bank.hullDark);
    lowerRail.position.y = -0.34;
    overpass.add(lowerRail);
    depthRig.midground.add(overpass);
  }

  private static buildCyberCityscape(
    depthRig: SceneDepthRig,
    buildings: BuildingSpawnDef[],
    bank: NeonMaterialBank
  ): void {
    for (let idx = 0; idx < buildings.length; idx++) {
      const b = buildings[idx]!;
      const baseY = PlaygroundSceneBuilder.terrainHeight(b.x, b.z);
      const layer = SceneDepthRig.classifyZ(b.z);

      const blockGroup = SceneComposerKit.composeUrbanBuilding(
        {
          seedIndex: idx,
          x: b.x,
          baseY,
          z: b.z,
          width: b.width,
          depth: b.depth,
          height: b.height,
          neonTone: b.neonTone,
          floors: b.floors,
          setbackRatio: b.setbackRatio,
          hasStorefront: b.hasStorefront,
          hasBillboard: b.hasBillboard,
          hasAntenna: b.hasAntenna,
        },
        bank
      );

      depthRig.getGroup(layer).add(blockGroup);
    }
  }

  private static buildCyberSkyBackdrop(
    skyGroup: THREE.Group,
    bank: NeonMaterialBank
  ): {
    skySunMesh: THREE.Mesh;
    skyHaloMesh: THREE.Mesh;
    skyBeams: THREE.Mesh[];
    starPoints: THREE.Points;
  } {
    const skyHaloMesh = new THREE.Mesh(new THREE.RingGeometry(2.9, 3.18, 28), bank.poleMetal);
    skyHaloMesh.position.set(0, 14.2, -29.0);
    skyHaloMesh.userData.skipObjectOutline = true;
    skyGroup.add(skyHaloMesh);

    const skySunMesh = new THREE.Mesh(new THREE.CircleGeometry(2.65, 24), bank.hullMid);
    skySunMesh.position.set(0, 14.2, -29.2);
    skySunMesh.userData.skipObjectOutline = true;
    skyGroup.add(skySunMesh);

    const skyBeams: THREE.Mesh[] = [];
    for (const sx of [-9.5, 9.5]) {
      const beamMat = new THREE.MeshBasicMaterial({
        color: sx < 0 ? bank.cyan.color : bank.magenta.color,
        transparent: true,
        opacity: 0.06,
      });
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.12, 24, 6), beamMat);
      beam.position.set(sx, 15.0, -20.0);
      beam.rotation.z = sx < 0 ? -0.1 : 0.1;
      beam.userData.skipObjectOutline = true;
      skyGroup.add(beam);
      skyBeams.push(beam);
    }

    const starCount = 140;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const cSteel = new THREE.Color('#6E7B87');
    const cMist = new THREE.Color('#8A99A6');
    const cSlate = new THREE.Color('#3B424C');

    for (let i = 0; i < starCount; i++) {
      const h1 = Math.sin(i * 127.1) * 43758.5453;
      const h2 = Math.sin(i * 311.7) * 43758.5453;
      const rx = h1 - Math.floor(h1);
      const ry = h2 - Math.floor(h2);

      positions[i * 3] = (rx - 0.5) * 80;
      positions[i * 3 + 1] = 8.2 + ry * 25;
      positions[i * 3 + 2] = -22 - ((i * 0.37) % 18);

      const c = i % 5 === 0 ? cMist : i % 2 === 0 ? cSteel : cSlate;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      fog: false,
      transparent: true,
      opacity: 0.55,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    starPoints.userData.skipObjectOutline = true;
    skyGroup.add(starPoints);

    return { skySunMesh, skyHaloMesh, skyBeams, starPoints };
  }
}
