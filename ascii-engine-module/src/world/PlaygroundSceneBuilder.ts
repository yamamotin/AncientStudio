import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';
import { PlaygroundEntityFactory } from '../entities/PlaygroundEntityFactory';
import { fbm2D, ridgedFbm2D } from '../scene/noise';
import { createSanctuaryWaterMaterial } from '../shaders/waterShader';
import type { EngineConfig } from '../types';
import type { PlaygroundMapDefinition } from './MapLoader';

export interface BuiltPlaygroundScene {
  scene: THREE.Scene;
  waterMesh: THREE.Mesh;
  waterMaterial: THREE.ShaderMaterial;
  ambientHemi: THREE.HemisphereLight;
  moonDirLight: THREE.DirectionalLight;
  torchLight: THREE.PointLight;
  brazierLights: THREE.PointLight[];
  shrineEntityId: EntityId;
  avatarEntityId: EntityId;
  terrainHeightAt: (x: number, z: number) => number;
}

/**
 * PlaygroundSceneBuilder: Constructs the procedural 3D ASCII Realms island playground
 * from a declarative `PlaygroundMapDefinition`:
 * - Sculpted multi-biome vertex-colored terrain + outer mountain ridges
 * - Reflective moonlit water moat with causeway stepping stones
 * - Ancient stone shrine arches + steps
 * - Low-poly layered pines & mossy boulders
 * - Interactive ECS Shrine Crystal, Sanctuary Braziers, and Cloaked Wayfarer Explorer
 */
export class PlaygroundSceneBuilder {
  public static terrainHeight(x: number, z: number): number {
    const distFromCenter = Math.hypot(x, z + 1.5);

    const centralIsland = Math.exp(-(distFromCenter * distFromCenter) / 56.0) * 1.35;

    const moatDepression =
      distFromCenter > 5.8 && distFromCenter < 13.8
        ? -Math.sin(((distFromCenter - 5.8) / 8.0) * Math.PI) * 1.45
        : 0;

    const outerRingFactor = THREE.MathUtils.smoothstep(distFromCenter, 11.5, 22.0);
    const mountains = ridgedFbm2D(x * 0.11 + 3.1, z * 0.11 - 1.7, 4) * 7.4 * outerRingFactor;

    const microDetail = fbm2D(x * 0.35, z * 0.35, 3) * 0.38;

    return centralIsland + moatDepression + mountains + microDetail - 0.55;
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

    // 1. Lighting Rig
    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#090B12'),
      1.1
    );
    scene.add(ambientHemi);

    const moonDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#CBE8FF'), 0.45),
      1.45
    );
    moonDirLight.position.set(-14, 19, -12);
    moonDirLight.castShadow = config.enableShadows;
    if (config.enableShadows) {
      moonDirLight.shadow.mapSize.width = 1024;
      moonDirLight.shadow.mapSize.height = 1024;
      moonDirLight.shadow.camera.near = 2;
      moonDirLight.shadow.camera.far = 48;
      const d = 18;
      moonDirLight.shadow.camera.left = -d;
      moonDirLight.shadow.camera.right = d;
      moonDirLight.shadow.camera.top = d;
      moonDirLight.shadow.camera.bottom = -d;
      moonDirLight.shadow.bias = -0.0015;
    }
    scene.add(moonDirLight);

    // 2. Sculpted Terrain
    this.buildTerrain(scene, mapDef, config);

    // 3. Reflective Sanctuary Lake + Causeway Stones
    const { waterMesh, waterMaterial } = this.buildWaterAndCauseway(scene, mapDef, config);

    // 4. Shrine Ruin Architecture (Pillars, Archway, Steps)
    const [shrineX, shrineZ] = mapDef.shrineCenter;
    const shrineGroundY = this.terrainHeight(shrineX, shrineZ);
    this.buildShrineArchitecture(scene, shrineX, shrineGroundY, shrineZ);

    // 5. Pine Trees & Boulders
    this.buildFoliageAndBoulders(scene, mapDef, config);

    // 6. ECS Entities: Shrine Crystal, Braziers, and Wayfarer Explorer
    const { entityId: shrineEntityId, torchLight } = PlaygroundEntityFactory.spawnShrineCrystal(
      ecsWorld,
      scene,
      config.palette,
      [shrineX, shrineGroundY + 2.35, shrineZ],
      config.enableShadows
    );

    const brazierLights: THREE.PointLight[] = [];
    mapDef.braziers.forEach((b, idx) => {
      const by = this.terrainHeight(b.x, b.z);
      const { light } = PlaygroundEntityFactory.spawnBrazierBeacon(
        ecsWorld,
        scene,
        config.palette,
        [b.x, by - 0.05, b.z],
        idx * 1.9
      );
      brazierLights.push(light);
    });

    const [ax, az] = mapDef.avatarSpawn;
    const ay = Math.max(mapDef.waterLevel + 0.16, this.terrainHeight(ax, az));
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
      shrineEntityId,
      avatarEntityId,
      terrainHeightAt: PlaygroundSceneBuilder.terrainHeight,
    };
  }

  private static buildTerrain(
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

    const deepSlate = new THREE.Color('#141E2B');
    const mossGreen = new THREE.Color(config.palette.foliageAccent);
    const ridgeStone = new THREE.Color('#3C5266');
    const snowCap = new THREE.Color('#8CAEC4');
    const tmpColor = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = PlaygroundSceneBuilder.terrainHeight(x, z);
      pos.setY(i, y);

      if (y < -0.5) {
        tmpColor.copy(deepSlate);
      } else if (y < 1.3) {
        const t = THREE.MathUtils.clamp((y + 0.5) / 1.8, 0, 1);
        tmpColor.copy(deepSlate).lerp(mossGreen, t * 0.88);
      } else if (y < 3.8) {
        const t = THREE.MathUtils.clamp((y - 1.3) / 2.5, 0, 1);
        tmpColor.copy(mossGreen).lerp(ridgeStone, t);
      } else {
        const t = THREE.MathUtils.clamp((y - 3.8) / 2.8, 0, 1);
        tmpColor.copy(ridgeStone).lerp(snowCap, t * 0.72);
      }

      colors[i * 3] = tmpColor.r;
      colors[i * 3 + 1] = tmpColor.g;
      colors[i * 3 + 2] = tmpColor.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.88,
      metalness: 0.08,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);
  }

  private static buildWaterAndCauseway(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig
  ): { waterMesh: THREE.Mesh; waterMaterial: THREE.ShaderMaterial } {
    const [sx, sz] = mapDef.shrineCenter;
    const sy = PlaygroundSceneBuilder.terrainHeight(sx, sz) + 2.35;

    const waterGeo = new THREE.PlaneGeometry(mapDef.waterSize, mapDef.waterSize, 1, 1);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMaterial = createSanctuaryWaterMaterial({
      palette: config.palette,
      shrineLightPos: new THREE.Vector3(sx, sy, sz),
      moonDir: new THREE.Vector3(-14, 19, -12),
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
    waterMesh.position.y = mapDef.waterLevel;
    waterMesh.renderOrder = 1;
    scene.add(waterMesh);

    // Stepping-stone causeway across the reflective water moat
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x394b5c,
      roughness: 0.86,
      metalness: 0.12,
      flatShading: true,
    });

    for (let i = 0; i < mapDef.causewayStones; i++) {
      const z = 3.2 + i * 1.28;
      const x = Math.sin(i * 0.85) * 0.42;
      const radius = 0.62 - (i % 2) * 0.08;
      const stepGeo = new THREE.CylinderGeometry(radius, radius * 1.15, 0.28, 6);
      const step = new THREE.Mesh(stepGeo, stoneMat);
      step.position.set(x, mapDef.waterLevel + 0.06, z);
      step.rotation.y = i * 0.55;
      step.castShadow = true;
      step.receiveShadow = true;
      scene.add(step);
    }

    return { waterMesh, waterMaterial };
  }

  private static buildShrineArchitecture(
    scene: THREE.Scene,
    shrineX: number,
    baseY: number,
    shrineZ: number
  ): void {
    const group = new THREE.Group();
    group.position.set(shrineX, baseY, shrineZ);

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x3b4d5e,
      roughness: 0.86,
      metalness: 0.14,
      flatShading: true,
    });

    const darkStoneMat = new THREE.MeshStandardMaterial({
      color: 0x24313e,
      roughness: 0.92,
      metalness: 0.1,
      flatShading: true,
    });

    for (let step = 0; step < 3; step++) {
      const radius = 3.6 - step * 0.65;
      const height = 0.36;
      const stepGeo = new THREE.CylinderGeometry(radius * 0.94, radius, height, 8);
      const mesh = new THREE.Mesh(stepGeo, step % 2 === 0 ? stoneMat : darkStoneMat);
      mesh.position.y = step * height + height * 0.5 - 0.1;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }

    const pillarCount = 4;
    const archRadius = 2.35;
    for (let i = 0; i < pillarCount; i++) {
      const angle = (i / pillarCount) * Math.PI * 2 + Math.PI * 0.25;
      const px = Math.cos(angle) * archRadius;
      const pz = Math.sin(angle) * archRadius;

      const isBroken = i === 2;
      const pHeight = isBroken ? 2.1 : 3.45;
      const colGeo = new THREE.BoxGeometry(0.52, pHeight, 0.52);
      const col = new THREE.Mesh(colGeo, stoneMat);
      col.position.set(px, 0.95 + pHeight * 0.5, pz);
      col.rotation.y = -angle;
      col.castShadow = true;
      col.receiveShadow = true;
      group.add(col);

      const capGeo = new THREE.BoxGeometry(0.72, 0.28, 0.72);
      const cap = new THREE.Mesh(capGeo, darkStoneMat);
      cap.position.set(px, 0.95 + pHeight + 0.12, pz);
      cap.rotation.y = -angle;
      cap.castShadow = true;
      group.add(cap);
    }

    const lintelGeo = new THREE.BoxGeometry(3.85, 0.44, 0.62);
    const lintel = new THREE.Mesh(lintelGeo, darkStoneMat);
    lintel.position.set(0, 4.62, -archRadius * 0.7);
    lintel.castShadow = true;
    lintel.receiveShadow = true;
    group.add(lintel);

    scene.add(group);
  }

  private static buildFoliageAndBoulders(
    scene: THREE.Scene,
    mapDef: PlaygroundMapDefinition,
    config: EngineConfig
  ): void {
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3b281e,
      roughness: 0.95,
      flatShading: true,
    });

    const foliageMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.palette.foliageAccent),
      roughness: 0.82,
      metalness: 0.05,
      flatShading: true,
    });

    for (const spot of mapDef.trees) {
      const groundY = PlaygroundSceneBuilder.terrainHeight(spot.x, spot.z);
      if (groundY < -0.45) continue;

      const tree = new THREE.Group();
      tree.position.set(spot.x, groundY - 0.1, spot.z);
      tree.scale.setScalar(spot.scale);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 1.1, 5), trunkMat);
      trunk.position.y = 0.55;
      trunk.castShadow = true;
      tree.add(trunk);

      for (let tier = 0; tier < 3; tier++) {
        const coneRadius = 1.05 - tier * 0.24;
        const coneHeight = 1.35 - tier * 0.18;
        const cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius, coneHeight, 6), foliageMat);
        cone.position.y = 1.25 + tier * 0.78;
        cone.rotation.y = tier * 0.5;
        cone.castShadow = true;
        cone.receiveShadow = true;
        tree.add(cone);
      }

      scene.add(tree);
    }

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x2d3d4e,
      roughness: 0.9,
      flatShading: true,
    });

    for (let i = 0; i < mapDef.boulders.length; i++) {
      const r = mapDef.boulders[i]!;
      const y = PlaygroundSceneBuilder.terrainHeight(r.x, r.z);
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(r.scale, 0), rockMat);
      rock.position.set(r.x, y + r.scale * 0.32, r.z);
      rock.rotation.set(i * 0.7, i * 1.1, i * 0.4);
      rock.scale.set(1.2, 0.78, 1.0);
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    }
  }
}
