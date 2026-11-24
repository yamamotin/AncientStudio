import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';
import { PlaygroundEntityFactory } from '../entities/PlaygroundEntityFactory';
import { createSanctuaryWaterMaterial } from '../shaders/waterShader';
import type { EngineConfig } from '../types';
import type { BuildingSpawnDef, PlaygroundMapDefinition } from './MapLoader';

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
 * PlaygroundSceneBuilder: Constructs the procedural 3D Cyberpunk Neo-Sector scene
 * (`[ ASCII REALMS // SCENE ]`) with razor-sharp structural silhouettes & neon contrast:
 * - Deep night sky (`#04050B`), volumetric depth fog (`FogExp2`), and luminous cyber-moon/sky-halo
 * - Stepped cyberpunk plaza, rain-slicked reflective canal (`PlaneGeometry 48x48`), and neon skybridge
 * - Architectural megastructures & skyscrapers with vertical/horizontal neon trim (`|`, `[`, `]`, `_` glyphs),
 *   lit window strips, holographic billboards, and rooftop spire beacons
 * - ECS Entities: Holo-Reactor Core, Cyan/Magenta Neon Pylons, Autonomous Hover-Spinners, and Cyber-Netrunner
 */
export class PlaygroundSceneBuilder {
  /**
   * Stepped urban plaza & canal profile:
   * - Central raised cyber-plaza around `(0, -2.2)`
   * - Central pedestrian skybridge deck along `|x| < 1.85, z in [-2.2 .. 7.5]`
   * - Flanking rain-filled reflective neon canals (`y = -1.35`)
   * - Outer raised street-block terraces supporting megastructures
   */
  public static terrainHeight(x: number, z: number): number {
    const distPlaza = Math.hypot(x, z + 2.2);

    // Raised octagonal cyber-plaza deck
    if (distPlaza < 4.35) {
      return 0.18;
    }

    // Elevated central cyber-skybridge spanning across the reflective canal
    if (Math.abs(x) < 1.85 && z >= -2.2 && z <= 8.2) {
      return 0.12;
    }

    // Flanking outer city-block sidewalks (`|x| >= 5.0` or `z <= -8.5`)
    if (Math.abs(x) >= 5.0 || z <= -8.5) {
      const tier = Math.abs(x) >= 8.2 || z <= -10.5 ? 0.35 : 0.05;
      return tier;
    }

    // Rain-filled neon reflection canal basin
    return -1.35;
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

    // Shared palette-reactive neon materials for buildings, skybridge & billboards
    const neonMaterials = {
      cyan: new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.palette.coolAmbient),
        emissive: new THREE.Color(config.palette.coolAmbient),
        emissiveIntensity: 2.35,
        roughness: 0.18,
        flatShading: true,
      }),
      magenta: new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.palette.warmLight),
        emissive: new THREE.Color(config.palette.warmLight),
        emissiveIntensity: 2.35,
        roughness: 0.18,
        flatShading: true,
      }),
      amber: new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.palette.warmCore),
        emissive: new THREE.Color(config.palette.warmCore),
        emissiveIntensity: 2.2,
        roughness: 0.2,
        flatShading: true,
      }),
    };

    // 1. High-Contrast Nocturnal Cyberpunk Lighting Rig
    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#05070F'),
      0.85
    );
    scene.add(ambientHemi);

    const moonDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#D8F6FF'), 0.4),
      1.35
    );
    moonDirLight.position.set(-14, 22, -14);
    moonDirLight.castShadow = config.enableShadows;
    if (config.enableShadows) {
      moonDirLight.shadow.mapSize.width = 1024;
      moonDirLight.shadow.mapSize.height = 1024;
      moonDirLight.shadow.camera.near = 2;
      moonDirLight.shadow.camera.far = 56;
      const d = 20;
      moonDirLight.shadow.camera.left = -d;
      moonDirLight.shadow.camera.right = d;
      moonDirLight.shadow.camera.top = d;
      moonDirLight.shadow.camera.bottom = -d;
      moonDirLight.shadow.bias = -0.0015;
    }
    scene.add(moonDirLight);

    // 2. Urban Plaza & Wet Asphalt Grid Deck
    this.buildUrbanDeck(scene, mapDef, config);

    // 3. Rain-Slicked Reflective Neon Canal + Skybridge Guardrails
    const { waterMesh, waterMaterial } = this.buildNeonCanalAndBridge(
      scene,
      mapDef,
      config,
      neonMaterials
    );

    // 4. Central Cyberpunk Holo-Portal Archway
    const [shrineX, shrineZ] = mapDef.shrineCenter;
    const shrineGroundY = this.terrainHeight(shrineX, shrineZ);
    this.buildCyberPortalArch(scene, shrineX, shrineGroundY, shrineZ, neonMaterials);

    // 5. Cyberpunk Skyscrapers, Megastructures, Rooftop Antennas & Neon Billboards
    this.buildCyberCityscape(scene, mapDef.buildings, neonMaterials);

    // 6. Distant Cyber-Horizon Sun/Moon Halo & Night Sky Matrix Stars
    this.buildCyberSkyBackdrop(scene, neonMaterials);

    // 7. ECS Entities: Holo-Reactor Core, Neon Pylons, Hover-Spinners, and Cyber-Netrunner
    const { entityId: shrineEntityId, torchLight } = PlaygroundEntityFactory.spawnShrineCrystal(
      ecsWorld,
      scene,
      config.palette,
      [shrineX, shrineGroundY + 2.45, shrineZ],
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

    // Spawn extra skyline street-level neon glow lights on flanking megastructures for rich water reflections
    const extraCyanLight = new THREE.PointLight(new THREE.Color(config.palette.coolAmbient), 18.0, 22.0, 1.6);
    extraCyanLight.position.set(-5.2, 2.8, -3.5);
    scene.add(extraCyanLight);
    brazierLights.push(extraCyanLight);

    const extraMagentaLight = new THREE.PointLight(new THREE.Color(config.palette.warmLight), 18.0, 22.0, 1.6);
    extraMagentaLight.position.set(5.2, 2.8, -3.5);
    scene.add(extraMagentaLight);
    brazierLights.push(extraMagentaLight);

    for (const droneSpec of mapDef.drones) {
      PlaygroundEntityFactory.spawnCyberDrone(ecsWorld, scene, config.palette, droneSpec);
    }

    const [ax, az] = mapDef.avatarSpawn;
    const ay = Math.max(mapDef.waterLevel + 0.2, this.terrainHeight(ax, az));
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

  private static buildUrbanDeck(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig
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

    const canalBed = new THREE.Color('#050811');
    const wetAsphalt = new THREE.Color('#0E1523');
    const deckSteel = new THREE.Color('#1A2639');
    const gridAccent = new THREE.Color(config.palette.coolAmbient).multiplyScalar(0.32);
    const tmpColor = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = PlaygroundSceneBuilder.terrainHeight(x, z);
      pos.setY(i, y);

      if (y < -0.6) {
        tmpColor.copy(canalBed);
      } else {
        // Subtle cyber-grid line highlights every 2.0 world units
        const onGrid = Math.abs((x % 2) + 2) % 2 < 0.14 || Math.abs((z % 2) + 2) % 2 < 0.14;
        if (onGrid && Math.abs(x) < 12) {
          tmpColor.copy(deckSteel).lerp(gridAccent, 0.55);
        } else {
          tmpColor.copy(y > 0.1 ? deckSteel : wetAsphalt);
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
      roughness: 0.42,
      metalness: 0.55,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  private static buildNeonCanalAndBridge(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): { waterMesh: THREE.Mesh; waterMaterial: THREE.ShaderMaterial } {
    const [sx, sz] = mapDef.shrineCenter;
    const sy = PlaygroundSceneBuilder.terrainHeight(sx, sz) + 2.45;

    // 48x48 subdivided reflective water surface for neon rain-slicked canal reflections
    const waterGeo = new THREE.PlaneGeometry(mapDef.waterSize, mapDef.waterSize, 48, 48);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMaterial = createSanctuaryWaterMaterial({
      palette: config.palette,
      shrineLightPos: new THREE.Vector3(sx, sy, sz),
      moonDir: new THREE.Vector3(-14, 22, -14),
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
    waterMesh.position.y = mapDef.waterLevel;
    waterMesh.renderOrder = 1;
    scene.add(waterMesh);

    // Pedestrian Skybridge Deck & Illuminated Neon Curb Rails
    const bridgeMat = new THREE.MeshStandardMaterial({
      color: 0x162234,
      roughness: 0.5,
      metalness: 0.65,
      flatShading: true,
    });

    const deck = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.28, 10.2), bridgeMat);
    deck.position.set(0, 0.05, 3.0);
    deck.receiveShadow = true;
    deck.castShadow = true;
    scene.add(deck);

    // Left (Cyan) and Right (Magenta) illuminated neon curb strips leading the eye to the portal!
    const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 10.2), neonMats.cyan);
    leftRail.position.set(-1.68, 0.26, 3.0);
    scene.add(leftRail);

    const rightRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 10.2), neonMats.magenta);
    rightRail.position.set(1.68, 0.26, 3.0);
    scene.add(rightRail);

    return { waterMesh, waterMaterial };
  }

  private static buildCyberPortalArch(
    scene: THREE.Scene,
    shrineX: number,
    baseY: number,
    shrineZ: number,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    const group = new THREE.Group();
    group.position.set(shrineX, baseY, shrineZ);

    const obsidianMetal = new THREE.MeshStandardMaterial({
      color: 0x0e1624,
      roughness: 0.48,
      metalness: 0.78,
      flatShading: true,
    });

    const darkTrim = new THREE.MeshStandardMaterial({
      color: 0x1b2940,
      roughness: 0.6,
      metalness: 0.6,
      flatShading: true,
    });

    // Stepped octagonal cyber-dais with glowing amber rim
    const stepBase = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 4.1, 0.34, 8), obsidianMetal);
    stepBase.position.y = 0.17;
    stepBase.receiveShadow = true;
    group.add(stepBase);

    const stepNeonRing = new THREE.Mesh(new THREE.CylinderGeometry(3.15, 3.22, 0.1, 8), neonMats.amber);
    stepNeonRing.position.y = 0.38;
    group.add(stepNeonRing);

    // Twin Brutalist Cyber-Gate Towers framing the Holo-Reactor (crisp '|', '[', ']' edges!)
    for (const side of [-1, 1]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.78, 5.2, 0.78), obsidianMetal);
      tower.position.set(side * 2.35, 2.75, -0.35);
      tower.castShadow = true;
      tower.receiveShadow = true;
      group.add(tower);

      // Vertical inner neon strip
      const vStrip = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 4.7, 0.84),
        side < 0 ? neonMats.cyan : neonMats.magenta
      );
      vStrip.position.set(side * 1.92, 2.75, -0.35);
      group.add(vStrip);
    }

    // Overhead Holographic Header Beam ('_' horizontal ASCII edge!)
    const headerBeam = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.68, 0.96), darkTrim);
    headerBeam.position.set(0, 5.55, -0.35);
    headerBeam.castShadow = true;
    group.add(headerBeam);

    const headerNeon = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.14, 1.02), neonMats.cyan);
    headerNeon.position.set(0, 5.55, -0.35);
    group.add(headerNeon);

    scene.add(group);
  }

  private static buildCyberCityscape(
    scene: THREE.Scene,
    buildings: BuildingSpawnDef[],
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    const hullDark = new THREE.MeshStandardMaterial({
      color: 0x090e18,
      roughness: 0.58,
      metalness: 0.72,
      flatShading: true,
    });

    const hullMid = new THREE.MeshStandardMaterial({
      color: 0x121c2d,
      roughness: 0.62,
      metalness: 0.6,
      flatShading: true,
    });

    for (let idx = 0; idx < buildings.length; idx++) {
      const b = buildings[idx]!;
      const baseY = PlaygroundSceneBuilder.terrainHeight(b.x, b.z);
      const bGroup = new THREE.Group();
      bGroup.position.set(b.x, baseY, b.z);

      const accentMat = neonMats[b.neonTone];

      // Main brutalist skyscraper shaft
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(b.width, b.height, b.depth),
        idx % 2 === 0 ? hullDark : hullMid
      );
      body.position.y = b.height * 0.5;
      body.castShadow = true;
      body.receiveShadow = true;
      bGroup.add(body);

      // Stepped upper crown setback for classic cyberpunk architectural silhouette
      const crownH = b.height * 0.22;
      const crown = new THREE.Mesh(
        new THREE.BoxGeometry(b.width * 0.72, crownH, b.depth * 0.72),
        hullDark
      );
      crown.position.y = b.height + crownH * 0.5;
      bGroup.add(crown);

      // Rooftop glowing neon cornice trim (creates razor-sharp '_' roofline in ASCII!)
      const roofTrim = new THREE.Mesh(
        new THREE.BoxGeometry(b.width * 1.03, 0.18, b.depth * 1.03),
        accentMat
      );
      roofTrim.position.y = b.height + 0.05;
      bGroup.add(roofTrim);

      // Vertical corner neon light-pipes facing the street canyon ('|' ASCII edge magnet)
      const faceSignX = b.x < 0 ? 1 : b.x > 0 ? -1 : 1;
      const edgePipe = new THREE.Mesh(
        new THREE.BoxGeometry(0.13, b.height * 0.88, 0.13),
        accentMat
      );
      edgePipe.position.set(
        faceSignX * (b.width * 0.5 + 0.04),
        b.height * 0.46,
        b.depth * 0.5 + 0.04
      );
      bGroup.add(edgePipe);

      // Illuminated horizontal cyber-window bands
      const bandCount = Math.min(5, Math.max(2, Math.floor(b.height / 3.4)));
      for (let k = 1; k <= bandCount; k++) {
        const wy = (k / (bandCount + 1)) * b.height;
        const winMat = k % 2 === 0 ? neonMats.amber : accentMat;
        const winStrip = new THREE.Mesh(
          new THREE.BoxGeometry(b.width * 0.78, 0.14, 0.08),
          winMat
        );
        winStrip.position.set(0, wy, b.depth * 0.5 + 0.05);
        bGroup.add(winStrip);
      }

      // Holographic Vertical Neon Billboard mounted on midground towers
      if (b.hasBillboard) {
        const boardTone =
          b.neonTone === 'cyan'
            ? neonMats.magenta
            : b.neonTone === 'magenta'
              ? neonMats.amber
              : neonMats.cyan;
        const board = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.65, 1.15), boardTone);
        board.position.set(faceSignX * (b.width * 0.5 + 0.36), b.height * 0.52, 0.35);
        bGroup.add(board);
      }

      // Rooftop Communications Spire + Beacon Tip
      if (b.hasAntenna) {
        const spireH = 2.6 + (idx % 3) * 0.9;
        const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.1, spireH, 4), hullMid);
        spire.position.y = b.height + crownH + spireH * 0.5;
        bGroup.add(spire);

        const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), neonMats.magenta);
        tip.position.y = b.height + crownH + spireH + 0.1;
        bGroup.add(tip);
      }

      scene.add(bGroup);
    }
  }

  private static buildCyberSkyBackdrop(
    scene: THREE.Scene,
    neonMats: BuiltPlaygroundScene['neonMaterials']
  ): void {
    // Iconic Cyberpunk Synth/Holographic Horizon Ring high behind the central megatower
    const haloRing = new THREE.Mesh(new THREE.RingGeometry(3.4, 3.85, 28), neonMats.magenta);
    haloRing.position.set(0, 14.2, -26.5);
    scene.add(haloRing);

    const innerSun = new THREE.Mesh(new THREE.CircleGeometry(2.9, 24), neonMats.amber);
    innerSun.position.set(0, 14.2, -26.7);
    scene.add(innerSun);

    // Sparse crisp cyber-grid sky stars above the smog line
    const starCount = 140;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const cCyan = new THREE.Color('#80F4FF');
    const cMag = new THREE.Color('#FF79C6');

    for (let i = 0; i < starCount; i++) {
      const h1 = Math.sin(i * 127.1) * 43758.5453;
      const h2 = Math.sin(i * 311.7) * 43758.5453;
      const rx = h1 - Math.floor(h1);
      const ry = h2 - Math.floor(h2);

      positions[i * 3] = (rx - 0.5) * 76;
      positions[i * 3 + 1] = 8.5 + ry * 24;
      positions[i * 3 + 2] = -22 - ((i * 0.37) % 18);

      const c = i % 4 === 0 ? cMag : cCyan;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.36,
      vertexColors: true,
      fog: false,
      transparent: true,
      opacity: 0.85,
    });

    scene.add(new THREE.Points(starGeo, starMat));
  }
}
