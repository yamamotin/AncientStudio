import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';
import { PlaygroundEntityFactory } from '../entities/PlaygroundEntityFactory';
import { createSanctuaryWaterMaterial } from '../shaders/waterShader';
import type { EngineConfig } from '../types';
import type {
  BuildingSpawnDef,
  PlaygroundMapDefinition,
  StreetPoleSpawnDef,
} from './MapLoader';

export interface BuiltPlaygroundScene {
  scene: THREE.Scene;
  waterMesh: THREE.Mesh;
  waterMaterial: THREE.ShaderMaterial;
  ambientHemi: THREE.HemisphereLight;
  moonDirLight: THREE.DirectionalLight;
  torchLight: THREE.PointLight;
  brazierLights: THREE.PointLight[];
  neonMaterials: {
    cyan: THREE.MeshStandardMaterial;
    magenta: THREE.MeshStandardMaterial;
    amber: THREE.MeshStandardMaterial;
  };
  shrineEntityId: EntityId;
  avatarEntityId: EntityId;
  terrainHeightAt: (x: number, z: number) => number;
}

/**
 * PlaygroundSceneBuilder: Constructs a rich, layered 3D Cyberpunk Nocturnal Boulevard
 * (`[ ASCII REALMS // SCENE ]`) in three distinct perspective depth planes:
 *  - Foreground: Streetlamps, utility poles with overhead sagging power cables, neon bollards,
 *    wind-swaying suspended street signs, rain-slicked crosswalk, and high-contrast Netrunner protagonist
 *  - Midground: Multi-story urban buildings with varied volumes/setbacks, dense illuminated floor/window
 *    matrices, storefront neon awnings, cantilevered vertical/horizontal signboards, elevated transit
 *    overpass, and central holographic portal arch
 *  - Background: Towering arcology megastructures converging in perspective fog, rooftop spires,
 *    vertical searchlight beams, and synth horizon ring.
 */
export class PlaygroundSceneBuilder {
  /**
   * Urban street & sidewalk profile:
   * - Central rain-slicked avenue (`|x| < 4.0`): `y = -0.04` (covered by mirror-wet street shader at `-0.06` / puddles)
   * - Raised curbed sidewalks (`|x| >= 4.0`): `y = 0.22` (outer building terraces at `y = 0.36`)
   * - Central raised holo-portal dais around `(0, -4.6)`: `y = 0.28`
   */
  public static terrainHeight(x: number, z: number): number {
    const distPortal = Math.hypot(x, z + 4.6);
    if (distPortal < 2.85) {
      return 0.28;
    }

    // Pedestrian crosswalk island pad around `(0, 4.15)` so central avatar stands slightly proud of puddles
    if (Math.abs(x) < 1.35 && Math.abs(z - 4.15) < 1.1) {
      return 0.04;
    }

    // Flanking sidewalks & building foundations
    if (Math.abs(x) >= 8.8 || z <= -10.8) {
      return 0.34;
    }
    if (Math.abs(x) >= 4.05) {
      return 0.2;
    }

    // Central wet asphalt boulevard bed (just beneath reflective street film so shader renders mirror puddles + crosswalk)
    return -0.14;
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

    // High-emission palette-reactive neon materials
    const neonMaterials = {
      cyan: new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.palette.coolAmbient),
        emissive: new THREE.Color(config.palette.coolAmbient),
        emissiveIntensity: 2.65,
        roughness: 0.14,
        flatShading: true,
      }),
      magenta: new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.palette.warmLight),
        emissive: new THREE.Color(config.palette.warmLight),
        emissiveIntensity: 2.65,
        roughness: 0.14,
        flatShading: true,
      }),
      amber: new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.palette.warmCore),
        emissive: new THREE.Color(config.palette.warmCore),
        emissiveIntensity: 2.55,
        roughness: 0.16,
        flatShading: true,
      }),
    };

    // 1. Rich Nocturnal Cyberpunk Lighting Rig (strong ambient fill prevents dead black shadows!)
    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#141A2E'),
      1.28
    );
    scene.add(ambientHemi);

    const moonDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#E2F9FF'), 0.45),
      1.75
    );
    moonDirLight.position.set(-12, 24, 10);
    moonDirLight.castShadow = config.enableShadows;
    if (config.enableShadows) {
      moonDirLight.shadow.mapSize.width = 1024;
      moonDirLight.shadow.mapSize.height = 1024;
      moonDirLight.shadow.camera.near = 2;
      moonDirLight.shadow.camera.far = 60;
      const d = 22;
      moonDirLight.shadow.camera.left = -d;
      moonDirLight.shadow.camera.right = d;
      moonDirLight.shadow.camera.top = d;
      moonDirLight.shadow.camera.bottom = -d;
      moonDirLight.shadow.bias = -0.0015;
    }
    scene.add(moonDirLight);

    // 2. Sidewalks, Neon Curbs & Wet Boulevard Foundation
    this.buildUrbanStreetFoundation(scene, mapDef, config, neonMaterials);

    // 3. Rain-Slicked Reflective Street Plane (`PlaneGeometry(mapDef.waterSize, mapDef.waterSize, 48, 48)`)
    const { waterMesh, waterMaterial } = this.buildReflectiveWetBoulevard(scene, mapDef, config);

    // 4. Streetlamps, Utility Poles, Overhead Power Cables & Wind-Swaying Neon Signs
    this.buildStreetPolesAndCables(scene, ecsWorld, mapDef.streetPoles ?? [], config, neonMaterials);

    // 5. Elevated Midground Transit Overpass + Holo-Portal Gate
    const [shrineX, shrineZ] = mapDef.shrineCenter;
    const shrineGroundY = this.terrainHeight(shrineX, shrineZ);
    this.buildCyberPortalAndOverpass(scene, shrineX, shrineGroundY, shrineZ, neonMaterials);

    // 6. Layered Cyberpunk Buildings (varied volumes, lit window matrices, awnings & neon signboards)
    this.buildCyberCityscape(scene, mapDef.buildings, neonMaterials);

    // 7. Horizon Sky-Halo, Vertical Arcology Searchlights & Night Sky Stars
    this.buildCyberSkyBackdrop(scene, neonMaterials);

    // 8. ECS Entities: Holo-Reactor Core, Street Neon Bollards, Hover-Spinners & Central Netrunner Protagonist
    const { entityId: shrineEntityId, torchLight } = PlaygroundEntityFactory.spawnShrineCrystal(
      ecsWorld,
      scene,
      config.palette,
      [shrineX, shrineGroundY + 2.55, shrineZ],
      config.enableShadows
    );

    const brazierLights: THREE.PointLight[] = [];
    mapDef.braziers.forEach((b, idx) => {
      const by = this.terrainHeight(b.x, b.z);
      const { light } = PlaygroundEntityFactory.spawnBrazierBeacon(
        ecsWorld,
        scene,
        config.palette,
        [b.x, by, b.z],
        idx * 1.9,
        b.tone ?? (idx % 2 === 0 ? 'cyan' : 'magenta')
      );
      brazierLights.push(light);
    });

    // Midground flanking storefront neon point-lights casting vivid cyan/magenta streaks onto the wet street
    const midCyanLight = new THREE.PointLight(
      new THREE.Color(config.palette.coolAmbient),
      24.0,
      24.0,
      1.5
    );
    midCyanLight.position.set(-4.4, 3.2, -1.8);
    scene.add(midCyanLight);
    brazierLights.push(midCyanLight);

    const midMagentaLight = new THREE.PointLight(
      new THREE.Color(config.palette.warmLight),
      24.0,
      24.0,
      1.5
    );
    midMagentaLight.position.set(4.4, 3.2, -1.8);
    scene.add(midMagentaLight);
    brazierLights.push(midMagentaLight);

    for (const droneSpec of mapDef.drones) {
      PlaygroundEntityFactory.spawnCyberDrone(ecsWorld, scene, config.palette, droneSpec);
    }

    const [ax, az] = mapDef.avatarSpawn;
    const ay = Math.max(mapDef.waterLevel + 0.08, this.terrainHeight(ax, az));
    const { entityId: avatarEntityId } = PlaygroundEntityFactory.spawnWayfarerAvatar(
      ecsWorld,
      scene,
      config.palette,
      [ax, ay, az]
    );

    return {
      scene,
      waterMesh,
      waterMaterial,
      ambientHemi,
      moonDirLight,
      torchLight,
      brazierLights,
      neonMaterials,
      shrineEntityId,
      avatarEntityId,
      terrainHeightAt: PlaygroundSceneBuilder.terrainHeight,
    };
  }

  private static buildUrbanStreetFoundation(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    const geo = new THREE.PlaneGeometry(
      mapDef.terrainSize,
      mapDef.terrainSize,
      mapDef.terrainSegments,
      mapDef.terrainSegments
    );
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    const roadBed = new THREE.Color('#0A101D');
    const sidewalkConcrete = new THREE.Color('#1E2C42');
    const terraceSteel = new THREE.Color('#162235');
    const tileHighlight = new THREE.Color(config.palette.coolAmbient).multiplyScalar(0.45);
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
          tmpColor.copy(sidewalkConcrete).lerp(tileHighlight, 0.55);
        } else {
          tmpColor.copy(y > 0.25 ? terraceSteel : sidewalkConcrete);
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
      roughness: 0.4,
      metalness: 0.58,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Continuous illuminated sidewalk curb strips converging into perspective (`x = ±4.02`)
    const leftCurb = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 28.0), neonMats.cyan);
    leftCurb.position.set(-4.02, 0.24, -2.5);
    scene.add(leftCurb);

    const rightCurb = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 28.0), neonMats.magenta);
    rightCurb.position.set(4.02, 0.24, -2.5);
    scene.add(rightCurb);
  }

  private static buildReflectiveWetBoulevard(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig
  ): { waterMesh: THREE.Mesh; waterMaterial: THREE.ShaderMaterial } {
    const [sx, sz] = mapDef.shrineCenter;
    const sy = PlaygroundSceneBuilder.terrainHeight(sx, sz) + 2.55;

    // 48x48 subdivided reflective surface for wet rain-slicked boulevard & neon puddle streaks
    const waterGeo = new THREE.PlaneGeometry(mapDef.waterSize, mapDef.waterSize, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMaterial = createSanctuaryWaterMaterial({
      palette: config.palette,
      shrineLightPos: new THREE.Vector3(sx, sy, sz),
      moonDir: new THREE.Vector3(-12, 24, 10),
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
    waterMesh.position.y = mapDef.waterLevel;
    waterMesh.renderOrder = 1;
    scene.add(waterMesh);

    return { waterMesh, waterMaterial };
  }

  private static buildStreetPolesAndCables(
    scene: THREE.Scene,
    ecsWorld: World,
    poles: StreetPoleSpawnDef[],
    config: EngineConfig,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    const poleMetal = new THREE.MeshStandardMaterial({
      color: 0x182538,
      roughness: 0.48,
      metalness: 0.78,
      flatShading: true,
    });

    const cableMat = new THREE.MeshStandardMaterial({
      color: 0x263b59,
      emissive: new THREE.Color(config.palette.coolAmbient).multiplyScalar(0.22),
      roughness: 0.5,
      flatShading: true,
    });

    poles.forEach((p, idx) => {
      const baseY = PlaygroundSceneBuilder.terrainHeight(p.x, p.z);
      const group = new THREE.Group();
      group.position.set(p.x, baseY, p.z);

      const lampNeon = neonMats[p.tone];
      const inward = p.side < 0 ? 1 : -1;

      // Vertical utility/streetlamp mast ('|' silhouette)
      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.16, p.height, 0.16), poleMetal);
      mast.position.y = p.height * 0.5;
      mast.castShadow = true;
      group.add(mast);

      // Horizontal transformer crossbars & glowing insulator nodes
      const crossArm = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 0.11, 0.12),
        poleMetal
      );
      crossArm.position.set(inward * 0.55, p.height - 0.18, 0);
      group.add(crossArm);

      // Bright streetlamp luminaire head overhanging the wet road
      const lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.24), lampNeon);
      lampHead.position.set(inward * 0.96, p.height - 0.28, 0);
      group.add(lampHead);

      scene.add(group);

      // Spawn wind-swaying suspended neon street banner under the pole arm!
      if (p.hasHangingBanner) {
        PlaygroundEntityFactory.spawnHangingNeonBanner(ecsWorld, scene, config.palette, {
          pivot: [p.x + inward * 0.62, baseY + p.height - 0.34, p.z],
          width: 0.52,
          height: 1.28,
          tone: p.tone,
          phase: idx * 1.35,
        });
      }
    });

    // Overhead sagging cyberpunk utility cables spanning across the street canyon (`/` and `_` silhouettes!)
    const cableZList = [6.4, 1.9, -2.6];
    cableZList.forEach((cz, idx) => {
      const sagGroup = new THREE.Group();
      const pivotY = 4.35;
      sagGroup.position.set(0, pivotY, cz);

      // 3-segment catenary cable approximation across `x in [-4.3 .. +4.3]`
      const leftSpan = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.055, 0.055), cableMat);
      leftSpan.position.set(-2.85, -0.24, 0);
      leftSpan.rotation.z = -0.15;
      sagGroup.add(leftSpan);

      const midSpan = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.055, 0.055), cableMat);
      midSpan.position.set(0, -0.46, 0);
      sagGroup.add(midSpan);

      const rightSpan = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.055, 0.055), cableMat);
      rightSpan.position.set(2.85, -0.24, 0);
      rightSpan.rotation.z = 0.15;
      sagGroup.add(rightSpan);

      // Glowing cyber-lantern node suspended at cable midpoint
      const nodeMat = idx % 2 === 0 ? neonMats.amber : neonMats.cyan;
      const midLantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), nodeMat);
      midLantern.position.set(0, -0.58, 0);
      sagGroup.add(midLantern);

      scene.add(sagGroup);

      // Register cable span in ECS `WindSway` so overhead wires & lanterns gently sway in the wind!
      const cableEntity = ecsWorld.createEntity();
      ecsWorld.addComponent(cableEntity, 'LifecycleTag', {
        role: 'prop',
        label: `OverheadCable_${idx}`,
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
    scene: THREE.Scene,
    shrineX: number,
    baseY: number,
    shrineZ: number,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    const group = new THREE.Group();
    group.position.set(shrineX, baseY, shrineZ);

    const obsidianMetal = new THREE.MeshStandardMaterial({
      color: 0x121d2f,
      roughness: 0.45,
      metalness: 0.78,
      flatShading: true,
    });

    const darkTrim = new THREE.MeshStandardMaterial({
      color: 0x20324d,
      roughness: 0.55,
      metalness: 0.65,
      flatShading: true,
    });

    // Stepped octagonal holo-pad dais with amber neon ring
    const stepBase = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.0, 0.3, 8), obsidianMetal);
    stepBase.position.y = 0.15;
    stepBase.receiveShadow = true;
    group.add(stepBase);

    const stepNeonRing = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.42, 0.1, 8),
      neonMats.amber
    );
    stepNeonRing.position.y = 0.34;
    group.add(stepNeonRing);

    // Twin Brutalist Cyber-Gate Towers framing the Holo-Reactor
    for (const side of [-1, 1]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.76, 5.8, 0.78), obsidianMetal);
      tower.position.set(side * 2.55, 2.95, -0.2);
      tower.castShadow = true;
      tower.receiveShadow = true;
      group.add(tower);

      const vStrip = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 5.3, 0.84),
        side < 0 ? neonMats.cyan : neonMats.magenta
      );
      vStrip.position.set(side * 2.1, 2.95, -0.2);
      group.add(vStrip);
    }

    // Overhead Holographic Header Beam + Elevated Transit Monorail Overpass spanning the avenue (`z = -8.4`)
    const headerBeam = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.72, 0.96), darkTrim);
    headerBeam.position.set(0, 6.0, -0.2);
    headerBeam.castShadow = true;
    group.add(headerBeam);

    const headerNeon = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.16, 1.04), neonMats.cyan);
    headerNeon.position.set(0, 6.0, -0.2);
    group.add(headerNeon);

    scene.add(group);

    // Background Elevated Skybridge / Maglev Overpass at `z = -8.6` adding unmistakable urban depth!
    const overpass = new THREE.Group();
    overpass.position.set(0, 6.8, -8.6);
    const bridgeDeck = new THREE.Mesh(new THREE.BoxGeometry(20.0, 0.62, 1.4), darkTrim);
    overpass.add(bridgeDeck);

    const upperRail = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.14, 1.48), neonMats.amber);
    upperRail.position.y = 0.36;
    overpass.add(upperRail);

    const lowerRail = new THREE.Mesh(new THREE.BoxGeometry(19.6, 0.12, 1.48), neonMats.magenta);
    lowerRail.position.y = -0.34;
    overpass.add(lowerRail);
    scene.add(overpass);
  }

  private static buildCyberCityscape(
    scene: THREE.Scene,
    buildings: BuildingSpawnDef[],
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    const hullDark = new THREE.MeshStandardMaterial({
      color: 0x101929,
      roughness: 0.5,
      metalness: 0.72,
      flatShading: true,
    });

    const hullMid = new THREE.MeshStandardMaterial({
      color: 0x19273d,
      roughness: 0.54,
      metalness: 0.64,
      flatShading: true,
    });

    for (let idx = 0; idx < buildings.length; idx++) {
      const b = buildings[idx]!;
      const baseY = PlaygroundSceneBuilder.terrainHeight(b.x, b.z);
      const bGroup = new THREE.Group();
      bGroup.position.set(b.x, baseY, b.z);

      const accentMat = neonMats[b.neonTone];
      const secondaryMat =
        b.neonTone === 'cyan'
          ? neonMats.magenta
          : b.neonTone === 'magenta'
            ? neonMats.amber
            : neonMats.cyan;

      const faceSignX = b.x < 0 ? 1 : b.x > 0 ? -1 : 1;

      // 1. Primary Brutalist/Cyber Architectural Volume
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(b.width, b.height, b.depth),
        idx % 2 === 0 ? hullDark : hullMid
      );
      body.position.y = b.height * 0.5;
      body.castShadow = true;
      body.receiveShadow = true;
      bGroup.add(body);

      // 2. Varied Upper Setback Volume + Penthouse Tier
      const setback = b.setbackRatio ?? 0.72;
      const crownH = b.height * 0.24;
      const crown = new THREE.Mesh(
        new THREE.BoxGeometry(b.width * setback, crownH, b.depth * setback),
        hullDark
      );
      crown.position.y = b.height + crownH * 0.5;
      bGroup.add(crown);

      // Rooftop glowing neon cornice & penthouse trim (`_` horizontal roofline silhouettes)
      const roofTrim = new THREE.Mesh(
        new THREE.BoxGeometry(b.width * 1.04, 0.2, b.depth * 1.04),
        accentMat
      );
      roofTrim.position.y = b.height + 0.06;
      bGroup.add(roofTrim);

      const crownTrim = new THREE.Mesh(
        new THREE.BoxGeometry(b.width * setback * 1.04, 0.15, b.depth * setback * 1.04),
        secondaryMat
      );
      crownTrim.position.y = b.height + crownH + 0.04;
      bGroup.add(crownTrim);

      // 3. Vertical Corner Neon Light-Pipes on BOTH street-facing & camera-facing edges (`|` silhouettes)
      for (const zCorner of [-1, 1]) {
        const edgePipe = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, b.height * 0.92, 0.14),
          zCorner > 0 ? accentMat : secondaryMat
        );
        edgePipe.position.set(
          faceSignX * (b.width * 0.5 + 0.04),
          b.height * 0.48,
          zCorner * (b.depth * 0.5 + 0.04)
        );
        bGroup.add(edgePipe);
      }

      // 4. Multi-Floor Illuminated Window Grids (both camera-facing `+Z` AND avenue-facing `±X` facades!)
      const floors = b.floors ?? Math.max(4, Math.floor(b.height / 1.8));
      const cols = 3;
      for (let f = 1; f <= floors; f++) {
        const fy = 1.4 + ((f - 0.5) / floors) * (b.height - 1.9);
        if (fy >= b.height - 0.35) continue;

        for (let c = 0; c < cols; c++) {
          // Deterministic lit-office hash (~68% of windows lit in varied amber/cyan/magenta)
          const hash = Math.sin((idx + 1) * 37.7 + f * 13.3 + c * 7.1) * 43758.5453;
          const litRoll = hash - Math.floor(hash);
          if (litRoll < 0.32) continue;

          const winMat =
            litRoll > 0.82 ? secondaryMat : litRoll > 0.54 ? neonMats.amber : accentMat;

          // Camera-facing facade (`+Z`) window pane
          const colOffset = (c - (cols - 1) * 0.5) * (b.width * 0.27);
          const frontWin = new THREE.Mesh(
            new THREE.BoxGeometry(b.width * 0.19, 0.24, 0.08),
            winMat
          );
          frontWin.position.set(colOffset, fy, b.depth * 0.5 + 0.05);
          bGroup.add(frontWin);

          // Street-canyon inward facade (`faceSignX`) window pane
          const sideOffset = (c - (cols - 1) * 0.5) * (b.depth * 0.27);
          const sideWin = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.24, b.depth * 0.19),
            winMat
          );
          sideWin.position.set(faceSignX * (b.width * 0.5 + 0.05), fy, sideOffset);
          bGroup.add(sideWin);
        }
      }

      // 5. Ground-Floor Storefront Neon Canopy / Awning
      if (b.hasStorefront) {
        const awning = new THREE.Mesh(
          new THREE.BoxGeometry(0.85, 0.16, b.depth * 0.86),
          secondaryMat
        );
        awning.position.set(faceSignX * (b.width * 0.5 + 0.42), 1.35, 0);
        bGroup.add(awning);

        const shopWindow = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.92, b.depth * 0.72),
          neonMats.amber
        );
        shopWindow.position.set(faceSignX * (b.width * 0.5 + 0.06), 0.68, 0);
        bGroup.add(shopWindow);
      }

      // 6. Cantilevered Vertical & Horizontal Cyberpunk Neon Signboards jutting over the avenue!
      if (b.hasBillboard) {
        const signBracket = new THREE.Mesh(
          new THREE.BoxGeometry(0.75, 0.1, 0.12),
          hullMid
        );
        signBracket.position.set(faceSignX * (b.width * 0.5 + 0.38), b.height * 0.58, 0.45);
        bGroup.add(signBracket);

        const vSign = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 3.25, 0.98),
          secondaryMat
        );
        vSign.position.set(faceSignX * (b.width * 0.5 + 0.68), b.height * 0.52, 0.45);
        bGroup.add(vSign);

        // Secondary stacked glowing sign plaque at lower tier
        const hSign = new THREE.Mesh(
          new THREE.BoxGeometry(0.95, 0.68, 0.16),
          neonMats.amber
        );
        hSign.position.set(
          faceSignX * (b.width * 0.5 + 0.52),
          Math.max(2.6, b.height * 0.28),
          b.depth * 0.5 + 0.12
        );
        bGroup.add(hSign);
      }

      // 7. Rooftop Communications Spire + Aircraft Warning Beacon
      if (b.hasAntenna) {
        const spireH = 2.8 + (idx % 3) * 1.1;
        const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.11, spireH, 4), hullMid);
        spire.position.y = b.height + crownH + spireH * 0.5;
        bGroup.add(spire);

        const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), neonMats.magenta);
        tip.position.y = b.height + crownH + spireH + 0.12;
        bGroup.add(tip);
      }

      scene.add(bGroup);
    }
  }

  private static buildCyberSkyBackdrop(
    scene: THREE.Scene,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    // Iconic Synth/Cyberpunk Horizon Ring & Luminous Core framed at the end of the perspective street canyon!
    const haloRing = new THREE.Mesh(new THREE.RingGeometry(3.8, 4.35, 32), neonMats.magenta);
    haloRing.position.set(0, 13.8, -28.5);
    scene.add(haloRing);

    const innerSun = new THREE.Mesh(new THREE.CircleGeometry(3.25, 28), neonMats.amber);
    innerSun.position.set(0, 13.8, -28.7);
    scene.add(innerSun);

    // Distant vertical cyber-searchlight columns rising into the night clouds
    for (const sx of [-9.5, 9.5]) {
      const beamMat = new THREE.MeshBasicMaterial({
        color: sx < 0 ? neonMats.cyan.color : neonMats.magenta.color,
        transparent: true,
        opacity: 0.22,
      });
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.14, 26, 6), beamMat);
      beam.position.set(sx, 15.0, -20.0);
      beam.rotation.z = sx < 0 ? -0.1 : 0.1;
      scene.add(beam);
    }

    // Crisp nocturnal stars & high-altitude distant sky-traffic glints
    const starCount = 160;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const cCyan = new THREE.Color('#8AF6FF');
    const cMag = new THREE.Color('#FF7AD9');
    const cAmb = new THREE.Color('#FFD97D');

    for (let i = 0; i < starCount; i++) {
      const h1 = Math.sin(i * 127.1) * 43758.5453;
      const h2 = Math.sin(i * 311.7) * 43758.5453;
      const rx = h1 - Math.floor(h1);
      const ry = h2 - Math.floor(h2);

      positions[i * 3] = (rx - 0.5) * 80;
      positions[i * 3 + 1] = 8.2 + ry * 25;
      positions[i * 3 + 2] = -22 - ((i * 0.37) % 18);

      const c = i % 5 === 0 ? cAmb : i % 3 === 0 ? cMag : cCyan;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      fog: false,
      transparent: true,
      opacity: 0.88,
    });

    scene.add(new THREE.Points(starGeo, starMat));
  }
}
