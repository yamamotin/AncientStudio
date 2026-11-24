import * as THREE from 'three';
import { evaluateTerrainHeight, fbm2D, hash2D, WATER_SURFACE_Y } from './noise';
import { WATER_FRAGMENT_SHADER, WATER_VERTEX_SHADER } from '../shaders/waterShader';
import type { EngineConfig, ThemePalette } from '../types';

interface TorchEmitter {
  light: THREE.PointLight;
  flameCore: THREE.Mesh;
  flameHalo: THREE.Mesh;
  basePosition: THREE.Vector3;
  baseIntensity: number;
  phaseOffset: number;
}

interface EmberParticle {
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  driftRadius: number;
  phase: number;
}

/**
 * Builds and animates the 3D RPG Sanctuary diorama:
 * - Foreground: Detailed jagged boulders & mossy rocks framing the viewport (softened by DoF)
 * - Midground: Ancient stone archway, stepped shrine altar, rune obelisk, twin flickering torch braziers,
 *              projected dynamic shadows, low-poly emerald pines, and rising ember sparks
 * - Background: Towering canyon ridges, distant mountain horizon, crescent moon disk, and starry night sky
 * - Interactive: Smooth lerp camera parallax & container-relative cursor lantern
 */
export class AsciiWorldScene {
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;

  private readonly baseCameraPos = new THREE.Vector3(0, 3.25, 11.8);
  private readonly baseLookTarget = new THREE.Vector3(0, 1.15, -2.5);
  private readonly currentCameraPos = new THREE.Vector3();
  private readonly currentLookTarget = new THREE.Vector3();

  /** Normalized container-relative pointer in [-1, +1] */
  private readonly targetPointer = new THREE.Vector2(0, 0);
  private readonly smoothedPointer = new THREE.Vector2(0, 0);
  private isPointerInside = false;

  // Lights
  private readonly hemiLight: THREE.HemisphereLight;
  private readonly moonDirLight: THREE.DirectionalLight;
  private readonly shrineMainLight: THREE.PointLight;
  private readonly cursorLight: THREE.PointLight;
  private readonly cursorOrb: THREE.Mesh;
  private readonly torches: TorchEmitter[] = [];

  // Dynamic / palette-reactive materials
  private terrainMesh!: THREE.Mesh;
  private terrainGeometry!: THREE.BufferGeometry;
  private terrainMaterial!: THREE.MeshStandardMaterial;
  private waterMesh!: THREE.Mesh;
  private waterGeometry!: THREE.BufferGeometry;
  private waterMaterial!: THREE.ShaderMaterial;

  private stoneMaterial!: THREE.MeshStandardMaterial;
  private darkForegroundRockMaterial!: THREE.MeshStandardMaterial;
  private foliageMaterial!: THREE.MeshStandardMaterial;
  private warmFlameMaterial!: THREE.MeshBasicMaterial;
  private warmHaloMaterial!: THREE.MeshBasicMaterial;
  private runeCoreMaterial!: THREE.MeshStandardMaterial;
  private cursorOrbMaterial!: THREE.MeshBasicMaterial;
  private moonMaterial!: THREE.MeshBasicMaterial;
  private starMaterial!: THREE.PointsMaterial;
  private emberMaterial!: THREE.PointsMaterial;

  // Animated meshes & particle buffers
  private runeCrystal!: THREE.Mesh;
  private runeRing!: THREE.Mesh;
  private emberPoints!: THREE.Points;
  private emberData: EmberParticle[] = [];
  private starPoints!: THREE.Points;

  constructor(config: EngineConfig) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(config.palette.background);
    this.scene.fog = new THREE.FogExp2(config.palette.background, 0.022);

    this.camera = new THREE.PerspectiveCamera(46, 16 / 9, 0.5, 115);
    this.currentCameraPos.copy(this.baseCameraPos);
    this.currentLookTarget.copy(this.baseLookTarget);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentLookTarget);

    // 1. Lighting System (Cool nocturnal ambient + directional moonlight + warm flickering torches + cursor lantern)
    this.hemiLight = new THREE.HemisphereLight(
      config.palette.coolAmbient,
      config.palette.background,
      0.72
    );
    this.hemiLight.position.set(0, 25, 0);
    this.scene.add(this.hemiLight);

    this.moonDirLight = new THREE.DirectionalLight(config.palette.coolAmbient, 1.05);
    this.moonDirLight.position.set(-14, 22, -16);
    this.moonDirLight.castShadow = config.enableShadows;
    this.moonDirLight.shadow.mapSize.width = 1024;
    this.moonDirLight.shadow.mapSize.height = 1024;
    this.moonDirLight.shadow.camera.near = 2;
    this.moonDirLight.shadow.camera.far = 65;
    const d = 20;
    this.moonDirLight.shadow.camera.left = -d;
    this.moonDirLight.shadow.camera.right = d;
    this.moonDirLight.shadow.camera.top = d;
    this.moonDirLight.shadow.camera.bottom = -d;
    this.moonDirLight.shadow.bias = -0.0008;
    this.scene.add(this.moonDirLight);

    // Central warm sanctuary shadow-casting light
    this.shrineMainLight = new THREE.PointLight(config.palette.warmLight, 32, 24, 1.65);
    this.shrineMainLight.position.set(0, 2.85, -2.35);
    this.shrineMainLight.castShadow = config.enableShadows;
    this.shrineMainLight.shadow.mapSize.width = 1024;
    this.shrineMainLight.shadow.mapSize.height = 1024;
    this.shrineMainLight.shadow.camera.near = 0.4;
    this.shrineMainLight.shadow.camera.far = 26;
    this.shrineMainLight.shadow.bias = -0.0015;
    this.scene.add(this.shrineMainLight);

    // Secondary interactive cursor-reactive spirit lantern
    this.cursorLight = new THREE.PointLight(
      config.palette.cursorLight,
      config.cursorLightIntensity * 11,
      15,
      1.7
    );
    this.cursorLight.position.set(0, 2.6, 3.2);
    this.cursorLight.castShadow = false;
    this.scene.add(this.cursorLight);

    // Create shared materials
    this.initMaterials(config.palette);

    // Small glowing wisp orb tracking the interactive cursor light
    const orbGeo = new THREE.OctahedronGeometry(0.14, 0);
    this.cursorOrb = new THREE.Mesh(orbGeo, this.cursorOrbMaterial);
    this.cursorOrb.position.copy(this.cursorLight.position);
    this.scene.add(this.cursorOrb);

    // 2. Build 3D World Layers
    this.buildTerrain(config.palette);
    this.buildReflectiveWater(config.palette);
    this.buildSanctuaryRuins(config.palette);
    this.buildTorchesAndBraziers(config.palette);
    this.buildForegroundSilhouettes();
    this.buildForestAndBoulders();
    this.buildDistantHorizonAndSky();
    this.buildEmberParticles();
  }

  private initMaterials(palette: ThemePalette): void {
    this.terrainMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 0.92,
      metalness: 0.06,
    });

    const coolRock = new THREE.Color(palette.coolAmbient).lerp(new THREE.Color('#4a5868'), 0.45);
    this.stoneMaterial = new THREE.MeshStandardMaterial({
      color: coolRock,
      flatShading: true,
      roughness: 0.85,
      metalness: 0.12,
    });

    const fgDark = new THREE.Color(palette.background).lerp(new THREE.Color(palette.coolAmbient), 0.24);
    this.darkForegroundRockMaterial = new THREE.MeshStandardMaterial({
      color: fgDark,
      flatShading: true,
      roughness: 0.94,
      metalness: 0.05,
    });

    this.foliageMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.foliageAccent),
      flatShading: true,
      roughness: 0.88,
      metalness: 0.04,
    });

    this.warmFlameMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.warmCore).multiplyScalar(1.35),
    });

    this.warmHaloMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.warmLight),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.runeCoreMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmCore),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 2.2,
      flatShading: true,
      roughness: 0.25,
      metalness: 0.3,
    });

    this.cursorOrbMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.cursorLight),
      transparent: true,
      opacity: 0.85,
    });

    this.moonMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.coolAmbient).lerp(new THREE.Color('#e8f4fc'), 0.68),
      fog: false,
    });
  }

  /**
   * Sculpted low-poly RPG terrain with vertex-colored moss, stone paths, and rocky ridges.
   */
  private buildTerrain(palette: ThemePalette): void {
    const width = 62;
    const depth = 64;
    const segX = 88;
    const segZ = 88;

    const geo = new THREE.PlaneGeometry(width, depth, segX, segZ);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    const colMoss = new THREE.Color(palette.foliageAccent).multiplyScalar(0.72);
    const colRock = new THREE.Color(palette.coolAmbient).multiplyScalar(0.55);
    const colPath = new THREE.Color('#3b3842');
    const colPeak = new THREE.Color(palette.coolAmbient).lerp(new THREE.Color('#8ab8d0'), 0.35);
    const tempCol = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i) - 9.0; // Shift terrain deeper toward horizon
      pos.setZ(i, z);

      const y = evaluateTerrainHeight(x, z);
      pos.setY(i, y);

      // Determine biome vertex tint
      const pathCenterX = Math.sin(z * 0.28) * 1.35;
      const onPath = z > -3.5 && z < 11.5 && Math.abs(x - pathCenterX) < 1.35;
      const noiseTint = fbm2D(x * 0.32, z * 0.32, 2) * 0.5 + 0.5;

      if (onPath) {
        tempCol.copy(colPath).lerp(colRock, 0.35);
      } else if (y > 2.6) {
        tempCol.copy(colRock).lerp(colPeak, Math.min(1, (y - 2.6) / 4.5));
      } else {
        tempCol.copy(colMoss).lerp(colRock, noiseTint * 0.65);
      }

      colors[i * 3] = tempCol.r;
      colors[i * 3 + 1] = tempCol.g;
      colors[i * 3 + 2] = tempCol.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    this.terrainGeometry = geo;
    this.terrainMesh = new THREE.Mesh(geo, this.terrainMaterial);
    this.terrainMesh.receiveShadow = true;
    this.scene.add(this.terrainMesh);
  }

  /**
   * Reflective sanctuary lake moat surrounding the island shrine:
   * reflects nocturnal sky, moon glints, flickering torch columns, rune crystal & cursor wisp.
   */
  private buildReflectiveWater(palette: ThemePalette): void {
    this.waterGeometry = new THREE.PlaneGeometry(54, 48, 48, 48);
    this.waterGeometry.rotateX(-Math.PI / 2);

    const deepWater = new THREE.Color(palette.background).lerp(
      new THREE.Color(palette.coolAmbient),
      0.26
    );
    const shallowWater = new THREE.Color(palette.coolAmbient).lerp(
      new THREE.Color('#8be4ff'),
      0.32
    );

    this.waterMaterial = new THREE.ShaderMaterial({
      vertexShader: WATER_VERTEX_SHADER,
      fragmentShader: WATER_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: true,
      uniforms: {
        uTime: { value: 0 },
        uCamPos: { value: this.camera.position.clone() },
        uDeepColor: { value: deepWater },
        uShallowColor: { value: shallowWater },
        uWarmColor: { value: new THREE.Color(palette.warmLight) },
        uWarmCoreColor: { value: new THREE.Color(palette.warmCore) },
        uCursorColor: { value: new THREE.Color(palette.cursorLight) },
        uCursorPos: { value: this.cursorLight.position.clone() },
        uCursorIntensity: { value: 14 },
        uMoonDir: { value: new THREE.Vector3(-10.5, 14.2, -38).normalize() },
        uTorch0: { value: new THREE.Vector4(-2.45, 0.5, -0.95, 24) },
        uTorch1: { value: new THREE.Vector4(2.45, 0.5, -0.95, 24) },
        uTorch2: { value: new THREE.Vector4(-1.85, 0.3, 3.65, 16) },
        uTorch3: { value: new THREE.Vector4(2.25, 0.2, 5.35, 14) },
        uShrineLight: { value: new THREE.Vector4(0, 2.85, -2.35, 32) },
      },
    });

    this.waterMesh = new THREE.Mesh(this.waterGeometry, this.waterMaterial);
    this.waterMesh.position.set(0, WATER_SURFACE_Y, -6.5);
    this.scene.add(this.waterMesh);
  }

  /**
   * Builds the midground focal architecture: stepped shrine platform, ancient stone archway,
   * broken pillars, and levitating incandescent rune crystal.
   */
  private buildSanctuaryRuins(_palette: ThemePalette): void {
    const shrineZ = -2.5;
    const groundY = evaluateTerrainHeight(0, shrineZ);

    const shrineGroup = new THREE.Group();
    shrineGroup.position.set(0, groundY, shrineZ);

    // Two-tier octagonal stone dais
    const baseStep = new THREE.Mesh(
      new THREE.CylinderGeometry(3.3, 3.7, 0.42, 8),
      this.stoneMaterial
    );
    baseStep.position.y = 0.21;
    baseStep.castShadow = true;
    baseStep.receiveShadow = true;
    shrineGroup.add(baseStep);

    const upperStep = new THREE.Mesh(
      new THREE.CylinderGeometry(2.25, 2.55, 0.38, 8),
      this.stoneMaterial
    );
    upperStep.position.y = 0.6;
    upperStep.castShadow = true;
    upperStep.receiveShadow = true;
    shrineGroup.add(upperStep);

    // Ancient Stone Portal Archway (crisp vertical & horizontal edges trigger '|', '[', ']', '_' glyphs)
    const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.68, 4.1, 0.68), this.stoneMaterial);
    leftPillar.position.set(-1.75, 2.55, -0.35);
    leftPillar.castShadow = true;
    leftPillar.receiveShadow = true;
    shrineGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.68, 4.1, 0.68), this.stoneMaterial);
    rightPillar.position.set(1.75, 2.55, -0.35);
    rightPillar.castShadow = true;
    rightPillar.receiveShadow = true;
    shrineGroup.add(rightPillar);

    // Pillar capitals
    for (const side of [-1, 1]) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.28, 0.92), this.stoneMaterial);
      cap.position.set(side * 1.75, 4.65, -0.35);
      cap.castShadow = true;
      cap.receiveShadow = true;
      shrineGroup.add(cap);
    }

    // Archway lintel crossbeam + pitched pediment
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.56, 0.84), this.stoneMaterial);
    lintel.position.set(0, 5.05, -0.35);
    lintel.castShadow = true;
    lintel.receiveShadow = true;
    shrineGroup.add(lintel);

    const keystone = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 2.45, 0.72, 4), this.stoneMaterial);
    keystone.rotation.y = Math.PI / 4;
    keystone.position.set(0, 5.68, -0.35);
    keystone.castShadow = true;
    shrineGroup.add(keystone);

    // Central altar pedestal
    const altar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.05, 0.95), this.stoneMaterial);
    altar.position.set(0, 1.28, 0.15);
    altar.castShadow = true;
    altar.receiveShadow = true;
    shrineGroup.add(altar);

    // Levitating glowing Rune Crystal + stone ring
    this.runeCrystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.46, 0),
      this.runeCoreMaterial
    );
    this.runeCrystal.scale.set(0.85, 1.45, 0.85);
    this.runeCrystal.position.set(0, 2.65, 0.15);
    this.runeCrystal.castShadow = true;
    shrineGroup.add(this.runeCrystal);

    this.runeRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.065, 6, 16),
      this.stoneMaterial
    );
    this.runeRing.position.set(0, 2.65, 0.15);
    this.runeRing.castShadow = true;
    shrineGroup.add(this.runeRing);

    // Flanking weathered ruin columns in midground
    const ruinCoords: Array<[number, number, number, number]> = [
      [-4.6, 1.1, 2.4, 0.12],
      [4.8, 0.7, 1.85, -0.09],
      [-3.8, -3.1, 3.1, 0.05],
      [4.2, -3.3, 2.75, -0.06],
    ];

    for (const [rx, rz, height, tilt] of ruinCoords) {
      const colY = evaluateTerrainHeight(rx, shrineZ + rz) - groundY;
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.38, height, 6),
        this.stoneMaterial
      );
      col.position.set(rx, colY + height * 0.5, rz);
      col.rotation.z = tilt;
      col.castShadow = true;
      col.receiveShadow = true;
      shrineGroup.add(col);
    }

    this.scene.add(shrineGroup);
  }

  /**
   * Places warm flickering RPG braziers & path lanterns that emit intense #FF8C24 bloom.
   */
  private buildTorchesAndBraziers(palette: ThemePalette): void {
    const torchLocations: Array<{ x: number; z: number; poleHeight: number; intensity: number }> = [
      // Twin main sanctuary braziers flanking the shrine steps
      { x: -2.45, z: -0.95, poleHeight: 1.55, intensity: 24 },
      { x: 2.45, z: -0.95, poleHeight: 1.55, intensity: 24 },
      // Foreground-to-midground path wayfinder lanterns
      { x: -1.85, z: 3.65, poleHeight: 1.35, intensity: 16 },
      { x: 2.25, z: 5.35, poleHeight: 1.25, intensity: 14 },
    ];

    torchLocations.forEach((spec, idx) => {
      const groundY = evaluateTerrainHeight(spec.x, spec.z);

      // Iron/stone brazier stand
      const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.24, spec.poleHeight, 6),
        this.stoneMaterial
      );
      stand.position.set(spec.x, groundY + spec.poleHeight * 0.5, spec.z);
      stand.castShadow = true;
      stand.receiveShadow = true;
      this.scene.add(stand);

      const bowl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.16, 0.28, 6),
        this.stoneMaterial
      );
      bowl.position.set(spec.x, groundY + spec.poleHeight + 0.1, spec.z);
      bowl.castShadow = true;
      this.scene.add(bowl);

      const flamePos = new THREE.Vector3(spec.x, groundY + spec.poleHeight + 0.44, spec.z);

      // Bright incandescent core (triggers strong ASCII bloom bleed)
      const flameCore = new THREE.Mesh(
        new THREE.ConeGeometry(0.22, 0.62, 5),
        this.warmFlameMaterial
      );
      flameCore.position.copy(flamePos);
      this.scene.add(flameCore);

      // Soft additive halo sphere around the flame
      const flameHalo = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.42, 1),
        this.warmHaloMaterial
      );
      flameHalo.position.copy(flamePos);
      this.scene.add(flameHalo);

      const pointLight = new THREE.PointLight(
        palette.warmLight,
        spec.intensity,
        16,
        1.75
      );
      pointLight.position.copy(flamePos).add(new THREE.Vector3(0, 0.18, 0));
      pointLight.castShadow = false; // Main shrine light + moon cast shadows for rock-solid 60fps
      this.scene.add(pointLight);

      this.torches.push({
        light: pointLight,
        flameCore,
        flameHalo,
        basePosition: flamePos.clone(),
        baseIntensity: spec.intensity,
        phaseOffset: idx * 1.93 + 0.7,
      });
    });
  }

  /**
   * Foreground silhouettes: jagged rocks & crooked sentinel pines close to the camera (z = 6.8 .. 9.4)
   * creating strong parallax & Depth-of-Field framing.
   */
  private buildForegroundSilhouettes(): void {
    const fgRocks: Array<[number, number, number, number, number]> = [
      [-4.35, 7.6, 1.55, 2.35, 1.4],
      [-3.15, 8.3, 1.05, 1.35, 1.1],
      [4.55, 7.4, 1.65, 2.55, 1.5],
      [3.35, 8.4, 1.15, 1.45, 1.15],
      [-5.8, 6.2, 1.9, 3.2, 1.8],
      [5.9, 6.0, 1.85, 3.0, 1.75],
    ];

    for (const [x, z, sx, sy, sz] of fgRocks) {
      const rockGeo = this.createSculptedRockGeometry(1.0, x * 3.1 + z);
      const rock = new THREE.Mesh(rockGeo, this.darkForegroundRockMaterial);
      const y = evaluateTerrainHeight(x, z);
      rock.position.set(x, y + sy * 0.35, z);
      rock.scale.set(sx, sy, sz);
      rock.castShadow = true;
      rock.receiveShadow = true;
      this.scene.add(rock);
    }
  }

  /**
   * Populates midground & canyon slopes with emerald low-poly RPG conifers and mossy boulders.
   */
  private buildForestAndBoulders(): void {
    const treePlacements: Array<[number, number, number]> = [
      [-6.2, 1.5, 1.25],
      [-7.4, -1.8, 1.45],
      [-5.5, -5.8, 1.35],
      [-8.6, -6.5, 1.6],
      [6.4, 1.8, 1.3],
      [7.6, -1.5, 1.5],
      [5.8, -5.4, 1.35],
      [8.8, -7.2, 1.65],
      [-3.4, -8.2, 1.25],
      [3.6, -8.6, 1.3],
      [-6.8, -10.8, 1.55],
      [7.1, -11.2, 1.5],
    ];

    const trunkMat = this.darkForegroundRockMaterial;

    for (const [tx, tz, scale] of treePlacements) {
      const groundY = evaluateTerrainHeight(tx, tz);
      const tree = new THREE.Group();
      tree.position.set(tx, groundY, tz);

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14 * scale, 0.22 * scale, 0.9 * scale, 5),
        trunkMat
      );
      trunk.position.y = 0.45 * scale;
      trunk.castShadow = true;
      tree.add(trunk);

      // Three tiered pine cones (diagonal silhouettes render '/' and '\' ASCII edges!)
      const tiers = [
        { r: 1.05, h: 1.55, y: 1.35 },
        { r: 0.82, h: 1.35, y: 2.2 },
        { r: 0.54, h: 1.15, y: 2.95 },
      ];

      for (const tier of tiers) {
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(tier.r * scale, tier.h * scale, 6),
          this.foliageMaterial
        );
        cone.position.y = tier.y * scale;
        cone.rotation.y = hash2D(tx, tz) * Math.PI;
        cone.castShadow = true;
        cone.receiveShadow = true;
        tree.add(cone);
      }

      this.scene.add(tree);
    }

    // Scattered midground boulders along the path & sanctuary rim
    const boulders: Array<[number, number, number]> = [
      [-3.1, 2.2, 0.65],
      [3.2, 2.9, 0.72],
      [-2.3, 5.6, 0.52],
      [1.4, 1.8, 0.38],
      [-4.4, -2.0, 0.85],
      [4.6, -2.3, 0.78],
    ];

    for (const [bx, bz, bScale] of boulders) {
      const geo = this.createSculptedRockGeometry(bScale, bx * 7.7 - bz * 2.3);
      const mesh = new THREE.Mesh(geo, this.stoneMaterial);
      mesh.position.set(bx, evaluateTerrainHeight(bx, bz) + bScale * 0.35, bz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }
  }

  /**
   * Builds the distant jagged mountain silhouettes, glowing celestial moon, and ASCII starfield.
   */
  private buildDistantHorizonAndSky(): void {
    // Towering background monolith peaks framing the far horizon
    const peaks: Array<[number, number, number, number]> = [
      [-15, -28, 7.5, 14.5],
      [-6.5, -31, 6.8, 17.0],
      [3.5, -32, 8.2, 18.5],
      [13.5, -29, 7.8, 15.0],
      [21, -26, 6.5, 12.0],
      [-22, -25, 6.5, 11.5],
    ];

    for (const [px, pz, radius, height] of peaks) {
      const peakGeo = new THREE.ConeGeometry(radius, height, 5);
      const peak = new THREE.Mesh(peakGeo, this.stoneMaterial);
      peak.position.set(px, height * 0.42 - 2.2, pz);
      peak.rotation.y = hash2D(px, pz) * Math.PI;
      this.scene.add(peak);
    }

    // Luminous full moon high in the upper-left sky (creates crisp ASCII disc)
    const moon = new THREE.Mesh(new THREE.CircleGeometry(2.35, 24), this.moonMaterial);
    moon.position.set(-10.5, 14.2, -38);
    moon.lookAt(this.baseCameraPos);
    this.scene.add(moon);

    // Starry night sky in 3D space (projects into '.', ':', '+', '*' ASCII stars!)
    const starCount = 340;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const sx = (hash2D(i, 1.3) - 0.5) * 92;
      const sy = 5.5 + hash2D(i, 7.9) * 28;
      const sz = -24 - hash2D(i, 13.7) * 32;

      starPositions[i * 3] = sx;
      starPositions[i * 3 + 1] = sy;
      starPositions[i * 3 + 2] = sz;

      const brightness = 0.45 + hash2D(i, 29.1) * 0.55;
      const warmStar = hash2D(i, 41.3) > 0.82;
      starColors[i * 3] = warmStar ? brightness * 1.0 : brightness * 0.72;
      starColors[i * 3 + 1] = warmStar ? brightness * 0.82 : brightness * 0.88;
      starColors[i * 3 + 2] = warmStar ? brightness * 0.65 : brightness * 1.0;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    this.starMaterial = new THREE.PointsMaterial({
      size: 0.48,
      vertexColors: true,
      sizeAttenuation: true,
      fog: false,
      transparent: true,
      opacity: 0.92,
    });

    this.starPoints = new THREE.Points(starGeo, this.starMaterial);
    this.scene.add(this.starPoints);
  }

  /**
   * Builds rising warm ember sparks drifting upward from the braziers & shrine crystal.
   */
  private buildEmberParticles(): void {
    const emberCount = 56;
    const positions = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      const cluster = i % 3;
      const originX = cluster === 0 ? 0 : cluster === 1 ? -2.45 : 2.45;
      const originZ = cluster === 0 ? -2.35 : -0.95;
      const originY = evaluateTerrainHeight(originX, originZ) + 1.6;

      const data: EmberParticle = {
        baseX: originX + (hash2D(i, 3.7) - 0.5) * 1.4,
        baseY: originY,
        baseZ: originZ + (hash2D(i, 9.1) - 0.5) * 1.4,
        speed: 0.45 + hash2D(i, 17.3) * 0.75,
        driftRadius: 0.2 + hash2D(i, 23.9) * 0.45,
        phase: hash2D(i, 31.7) * Math.PI * 2,
      };

      this.emberData.push(data);
      positions[i * 3] = data.baseX;
      positions[i * 3 + 1] = data.baseY;
      positions[i * 3 + 2] = data.baseZ;
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.emberMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#FFB85C'),
      size: 0.24,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.emberPoints = new THREE.Points(emberGeo, this.emberMaterial);
    this.scene.add(this.emberPoints);
  }

  private createSculptedRockGeometry(radius: number, seed: number): THREE.BufferGeometry {
    const geo = new THREE.DodecahedronGeometry(radius, 1);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      const disp = 0.78 + 0.38 * fbm2D(vx * 1.4 + seed, vz * 1.4 - seed, 2);
      pos.setXYZ(i, vx * disp, vy * (disp * 0.92), vz * disp);
    }

    geo.computeVertexNormals();
    return geo;
  }

  /**
   * Updates container-relative pointer coordinates normalized to [-1, +1].
   */
  public setPointerNormalized(nx: number, ny: number, inside: boolean): void {
    this.targetPointer.set(
      Math.max(-1, Math.min(1, nx)),
      Math.max(-1, Math.min(1, ny))
    );
    this.isPointerInside = inside;
  }

  public resizeCamera(width: number, height: number): void {
    this.camera.aspect = Math.max(0.1, width / Math.max(1, height));
    this.camera.updateProjectionMatrix();
  }

  /**
   * Applies live palette, shadow, or lighting updates without recreating geometry.
   */
  public applyConfig(config: EngineConfig): void {
    const { palette } = config;

    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.set(palette.background);
    }
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.set(palette.background);
    }

    this.hemiLight.color.set(palette.coolAmbient);
    this.hemiLight.groundColor.set(palette.background);
    this.moonDirLight.color.set(palette.coolAmbient);
    this.moonDirLight.castShadow = config.enableShadows;

    this.shrineMainLight.color.set(palette.warmLight);
    this.shrineMainLight.castShadow = config.enableShadows;

    this.cursorLight.color.set(palette.cursorLight);
    this.cursorOrbMaterial.color.set(palette.cursorLight);

    const coolRock = new THREE.Color(palette.coolAmbient).lerp(new THREE.Color('#4a5868'), 0.45);
    this.stoneMaterial.color.copy(coolRock);

    const fgDark = new THREE.Color(palette.background).lerp(
      new THREE.Color(palette.coolAmbient),
      0.24
    );
    this.darkForegroundRockMaterial.color.copy(fgDark);

    this.foliageMaterial.color.set(palette.foliageAccent);
    this.warmFlameMaterial.color.set(palette.warmCore).multiplyScalar(1.35);
    this.warmHaloMaterial.color.set(palette.warmLight);
    this.runeCoreMaterial.color.set(palette.warmCore);
    this.runeCoreMaterial.emissive.set(palette.warmLight);
    this.emberMaterial.color.set(palette.warmCore);

    for (const torch of this.torches) {
      torch.light.color.set(palette.warmLight);
    }

    if (this.waterMaterial) {
      this.waterMaterial.uniforms.uDeepColor.value
        .set(palette.background)
        .lerp(new THREE.Color(palette.coolAmbient), 0.26);
      this.waterMaterial.uniforms.uShallowColor.value
        .set(palette.coolAmbient)
        .lerp(new THREE.Color('#8be4ff'), 0.32);
      this.waterMaterial.uniforms.uWarmColor.value.set(palette.warmLight);
      this.waterMaterial.uniforms.uWarmCoreColor.value.set(palette.warmCore);
      this.waterMaterial.uniforms.uCursorColor.value.set(palette.cursorLight);
    }
  }

  /**
   * Advances animations, flickering torches, floating embers, camera lerp parallax, and cursor lantern.
   */
  public update(dt: number, elapsed: number, config: EngineConfig): void {
    // 1. Smoothly damp pointer coordinates
    const damp = 1 - Math.exp(-config.parallaxSmoothing * dt);
    const desiredX = this.isPointerInside ? this.targetPointer.x : Math.sin(elapsed * 0.25) * 0.16;
    const desiredY = this.isPointerInside ? this.targetPointer.y : Math.cos(elapsed * 0.19) * 0.08;

    this.smoothedPointer.x += (desiredX - this.smoothedPointer.x) * damp;
    this.smoothedPointer.y += (desiredY - this.smoothedPointer.y) * damp;

    // 2. Camera parallax via smooth lerp
    const px = this.smoothedPointer.x * config.parallaxIntensity;
    const py = this.smoothedPointer.y * (config.parallaxIntensity * 0.58);

    const targetCamX = this.baseCameraPos.x + px;
    const targetCamY = this.baseCameraPos.y + py;
    const targetCamZ = this.baseCameraPos.z - Math.abs(this.smoothedPointer.x) * 0.35;

    this.currentCameraPos.x += (targetCamX - this.currentCameraPos.x) * damp;
    this.currentCameraPos.y += (targetCamY - this.currentCameraPos.y) * damp;
    this.currentCameraPos.z += (targetCamZ - this.currentCameraPos.z) * damp;

    this.camera.position.copy(this.currentCameraPos);

    this.currentLookTarget.set(
      this.baseLookTarget.x + px * 0.28,
      this.baseLookTarget.y + py * 0.24,
      this.baseLookTarget.z
    );
    this.camera.lookAt(this.currentLookTarget);

    // 3. Secondary cursor-following spirit light mapped across the 3D terrain
    const worldCursorX = this.smoothedPointer.x * 6.8;
    const worldCursorZ = 2.2 - this.smoothedPointer.y * 5.6;
    const terrainUnderCursor = evaluateTerrainHeight(worldCursorX, worldCursorZ);
    const targetLightY = terrainUnderCursor + 1.65 + Math.sin(elapsed * 2.6) * 0.18;

    this.cursorLight.position.x += (worldCursorX - this.cursorLight.position.x) * (damp * 1.35);
    this.cursorLight.position.z += (worldCursorZ - this.cursorLight.position.z) * (damp * 1.35);
    this.cursorLight.position.y += (targetLightY - this.cursorLight.position.y) * (damp * 1.35);

    const activeBoost = this.isPointerInside ? 1.0 : 0.45;
    this.cursorLight.intensity = config.cursorLightIntensity * 11.5 * activeBoost;
    this.cursorOrb.position.copy(this.cursorLight.position);
    this.cursorOrb.rotation.y = elapsed * 1.8;
    this.cursorOrb.visible = config.cursorLightIntensity > 0.05;

    // 4. Animate levitating Rune Crystal & Sanctuary Main Light
    const crystalBob = Math.sin(elapsed * 1.85) * 0.18;
    this.runeCrystal.position.y = 2.65 + crystalBob;
    this.runeCrystal.rotation.y = elapsed * 0.85;

    this.runeRing.position.y = 2.65 + crystalBob * 0.6;
    this.runeRing.rotation.x = Math.sin(elapsed * 0.7) * 0.45 + 0.6;
    this.runeRing.rotation.y = -elapsed * 0.55;

    const mainFlicker =
      1.0 +
      Math.sin(elapsed * 7.3) * 0.06 +
      Math.sin(elapsed * 13.7 + 1.2) * 0.04;
    this.shrineMainLight.intensity = 32 * mainFlicker;

    // 5. Animate flickering torches & braziers
    for (const torch of this.torches) {
      const t = elapsed * 8.5 + torch.phaseOffset;
      const flicker =
        1.0 +
        Math.sin(t) * 0.14 +
        Math.sin(t * 2.17) * 0.08 +
        Math.cos(t * 3.41) * 0.05;

      torch.light.intensity = torch.baseIntensity * flicker;

      const scaleY = 0.88 + flicker * 0.22;
      const scaleXZ = 0.92 + Math.sin(t * 1.7) * 0.1;
      torch.flameCore.scale.set(scaleXZ, scaleY, scaleXZ);
      torch.flameCore.rotation.y = elapsed * 2.2 + torch.phaseOffset;
      torch.flameCore.position.x = torch.basePosition.x + Math.sin(t * 1.3) * 0.03;

      torch.flameHalo.scale.setScalar(0.92 + flicker * 0.18);
    }

    // 5b. Sync real-time water shader uniforms (planar light reflections + camera view vector)
    if (this.waterMaterial) {
      const u = this.waterMaterial.uniforms;
      u.uTime.value = elapsed;
      u.uCamPos.value.copy(this.camera.position);
      u.uCursorPos.value.copy(this.cursorLight.position);
      u.uCursorIntensity.value = this.cursorLight.intensity;
      u.uShrineLight.value.set(
        this.shrineMainLight.position.x,
        this.shrineMainLight.position.y,
        this.shrineMainLight.position.z,
        this.shrineMainLight.intensity
      );

      const torchUniformKeys = ['uTorch0', 'uTorch1', 'uTorch2', 'uTorch3'] as const;
      for (let idx = 0; idx < torchUniformKeys.length; idx++) {
        const torch = this.torches[idx];
        const key = torchUniformKeys[idx]!;
        if (torch && u[key]) {
          u[key].value.set(
            torch.light.position.x,
            torch.light.position.y,
            torch.light.position.z,
            torch.light.intensity
          );
        }
      }
    }

    // 6. Animate rising ember particles
    const emberPosAttr = this.emberPoints.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < this.emberData.length; i++) {
      const e = this.emberData[i]!;
      const cycle = (elapsed * e.speed + e.phase) % 4.2;
      const progress = cycle / 4.2; // 0..1

      const pxEmber = e.baseX + Math.sin(elapsed * 2.1 + e.phase) * e.driftRadius * (0.4 + progress);
      const pyEmber = e.baseY + progress * 4.4;
      const pzEmber = e.baseZ + Math.cos(elapsed * 1.8 + e.phase) * e.driftRadius * (0.4 + progress);

      emberPosAttr.setXYZ(i, pxEmber, pyEmber, pzEmber);
    }
    emberPosAttr.needsUpdate = true;

    // Subtle celestial star drift
    this.starPoints.rotation.y = elapsed * 0.006;
  }

  /**
   * Traverses the entire scene graph and disposes every BufferGeometry, Material, and Texture.
   */
  public dispose(): void {
    const disposedGeometries = new Set<THREE.BufferGeometry>();
    const disposedMaterials = new Set<THREE.Material>();

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
        if (obj.geometry && !disposedGeometries.has(obj.geometry)) {
          obj.geometry.dispose();
          disposedGeometries.add(obj.geometry);
        }

        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const mat of mats) {
          if (mat && !disposedMaterials.has(mat)) {
            this.disposeMaterialTextures(mat);
            mat.dispose();
            disposedMaterials.add(mat);
          }
        }
      }
    });

    // Dispose shadow map render targets allocated by lights
    if (this.moonDirLight.shadow?.map) {
      this.moonDirLight.shadow.map.dispose();
    }
    if (this.shrineMainLight.shadow?.map) {
      this.shrineMainLight.shadow.map.dispose();
    }

    this.terrainGeometry.dispose();
    if (this.waterGeometry) this.waterGeometry.dispose();
    this.torches.length = 0;
    this.emberData.length = 0;
    this.scene.clear();
  }

  private disposeMaterialTextures(material: THREE.Material): void {
    const record = material as unknown as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      const val = record[key];
      if (val instanceof THREE.Texture) {
        val.dispose();
      }
    }
  }
}
