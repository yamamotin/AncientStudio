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
  walkablePockets: [
    // Paved areas alongside the two tree planters (Cidade_Object_78 / 70).
    { minX: -14.0, maxX: -5.55, minZ: -1.92, maxZ: 4.1 },
    { minX: 0.55, maxX: 7.8, minZ: -1.92, maxZ: 4.1 },
  ],
  obstacles: [
    { minX: -13.5, maxX: -5.55, minZ: 2.05, maxZ: 4.1 },
    { minX: 2.1, maxX: 7.2, minZ: 1.75, maxZ: 4.05 },
    // Sidewalk kiosks (Cidade_Object_161 & Cidade_Object_266) with 0.22m character clearance
    { minX: -4.8, maxX: -2.08, minZ: 2.08, maxZ: 3.62 },
    // Curbside luminaire base (-5.25, 4.00) clearance
    { minX: -5.52, maxX: -4.98, minZ: 3.74, maxZ: 4.26 },
  ],
  groundY: 0.08635,
};

/**
 * Default promenade spawn coordinates for `Player_Rig` in the open central clearing
 * centered in front of the storefront facade.
 */
export const DEFAULT_URBAN_PLAYER_SPAWN = {
  x: -3.8,
  y: 0.08635,
  z: -1.1,
} as const;

/**
 * Elevated 3/4 diagonal camera rotated exactly 45.0° counter-clockwise (`offsetX = 10.6`,
 * `offsetZ = 10.6` -> `atan2(10.6, 10.6) = 45.0°`), tilted from top toward the ground
 * (`offsetY = 11.6`, ~40.6° downward pitch), and pulled back (~18.96m 3D distance, `fov = 64°`)
 * to widen framing of the street, storefront facades, streetlamps, and `Carro_Grupo` avenue
 * while smoothly following (`lerp`) `Player_Rig`.
 */
export const URBAN_CAMERA_FOLLOW_DEFAULTS = {
  offsetX: 10.3,
  offsetY: 11.3,
  offsetZ: 10.3,
  lookAtOffsetX: -1.85,
  lookAtOffsetY: 1.05,
  lookAtOffsetZ: -1.25,
  followSharpness: 6.5,
  minDistance: 8.2,
  maxDistance: 31.5,
  zoomSmoothing: 10.5,
  zoomSpeed: 4.0,
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
  avenueBeaconLight: THREE.PointLight;
  poleMaterial: THREE.MeshStandardMaterial;
  emissiveFixtureMaterials: THREE.MeshStandardMaterial[];
}

export interface BuiltUrbanGlbStage {
  scene: THREE.Scene;
  ambientFill: THREE.AmbientLight;
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
 * NLA `AnimationMixer` clips, `SidewalkBounds`, `ForegroundOccluders` line-of-sight clearance,
 * 45° counter-clockwise elevated camera, cyber-noir storefront/streetlamp lighting,
 * 30s `TrafficCycle` headlight rig, and `day`/`night`/`rain` presets.
 */
export class UrbanGlbSceneBuilder {
  private static createHeadlightFlareTexture(size = 32): THREE.DataTexture {
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      const ny = (y + 0.5) / size * 2 - 1;
      for (let x = 0; x < size; x++) {
        const nx = (x + 0.5) / size * 2 - 1;
        // Elliptical core + subtle horizontal optical glare streak
        const r = Math.hypot(nx * 0.92, ny * 1.18);
        const core = Math.exp(-r * r * 5.2);
        const streak = Math.exp(-ny * ny * 18.0) * Math.exp(-nx * nx * 2.1) * 0.42;
        const edgeFade = Math.max(0, 1 - Math.hypot(nx, ny));
        const alpha = Math.min(1, (core + streak) * Math.min(1, edgeFade * 2.2));
        const idx = (y * size + x) * 4;
        data[idx] = 255;
        data[idx + 1] = Math.round(238 + 17 * core);
        data[idx + 2] = Math.round(188 + 62 * core);
        data[idx + 3] = Math.round(alpha * 255);
      }
    }
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  private static createBeamFalloffTexture(width = 16, height = 48): THREE.DataTexture {
    const data = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) {
      // ConeGeometry v=1 sits at apex (headlight lens) and v=0 sits at far base
      const v = y / Math.max(1, height - 1);
      const axial = Math.pow(v, 1.85) * Math.min(1, (1 - v) * 8.5 + 0.18);
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        data[idx] = 255;
        data[idx + 1] = 232;
        data[idx + 2] = 178;
        data[idx + 3] = Math.round(Math.min(1, axial) * 255);
      }
    }
    const tex = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  private static createRoadPoolTexture(width = 32, height = 64): THREE.DataTexture {
    const data = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) {
      // PlaneGeometry rotated -PI/2 around X: v=1 is near bumper (+Z start), v=0 is far down-road (+Z end)
      const tForward = 1 - y / Math.max(1, height - 1); // 0 at bumper -> 1 far ahead
      const nearRamp = THREE.MathUtils.smoothstep(tForward, 0.0, 0.16);
      const farFade = Math.pow(Math.max(0, 1 - tForward), 1.45);
      // Cone widens laterally as beam travels forward across asphalt
      const coneHalfWidth = 0.26 + tForward * 0.68;
      for (let x = 0; x < width; x++) {
        const nx = ((x + 0.5) / width * 2 - 1) / coneHalfWidth;
        const lateral = Math.exp(-nx * nx * 2.6) * Math.max(0, 1 - Math.abs(nx));
        const alpha = Math.min(1, nearRamp * farFade * lateral);
        const idx = (y * width + x) * 4;
        data[idx] = 255;
        data[idx + 1] = Math.round(218 + 32 * (1 - tForward));
        data[idx + 2] = Math.round(154 + 68 * (1 - tForward));
        data[idx + 3] = Math.round(alpha * 255);
      }
    }
    const tex = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }

  private static attachVehicleHeadlightRig(
    carroGrupo: THREE.Object3D,
    carHeadlightCovers: THREE.MeshStandardMaterial[]
  ): {
    headlightLeft: THREE.SpotLight;
    headlightRight: THREE.SpotLight;
    streetThrowLight: THREE.PointLight;
    taillightGlow: THREE.PointLight;
    emitterGroup: THREE.Group;
    lensMaterial: THREE.MeshStandardMaterial;
    haloMaterial: THREE.MeshBasicMaterial;
    coneMaterial: THREE.MeshBasicMaterial;
    roadPoolMaterial: THREE.MeshBasicMaterial;
  } {
    const scaleX = Math.max(0.0001, Math.abs(carroGrupo.scale.x || 1));
    const scaleY = Math.max(0.0001, Math.abs(carroGrupo.scale.y || scaleX));
    const scaleZ = Math.max(0.0001, Math.abs(carroGrupo.scale.z || scaleX));
    const invX = 1 / scaleX;
    const invY = 1 / scaleY;
    const invZ = 1 / scaleZ;

    // Inspect Carro_Grupo's actual front headlight housing (`Cube.031_headlightCovers_0`) in world meters
    // relative to Carro_Grupo origin when oriented along +Z (headingYaw = 0).
    const savedPos = carroGrupo.position.clone();
    const savedQuat = carroGrupo.quaternion.clone();
    carroGrupo.position.set(0, 0, 0);
    carroGrupo.rotation.set(0, URBAN_TRAFFIC_DEFAULTS.headingYaw, 0);
    carroGrupo.updateMatrixWorld(true);

    let centerX_m = -0.051;
    let leftX_m = -1.128;
    let rightX_m = 1.026;
    let lensY_m = 1.168;
    let frontNoseZ_m = 0.19;

    const coverBox = new THREE.Box3();
    let foundCover = false;
    carroGrupo.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh && /headlight/i.test(mesh.name)) {
        coverBox.expandByObject(mesh);
        foundCover = true;
      }
    });

    if (foundCover && !coverBox.isEmpty()) {
      const spanX = coverBox.max.x - coverBox.min.x;
      const spanY = coverBox.max.y - coverBox.min.y;
      if (spanX > 0.4 && spanY > 0.1) {
        centerX_m = (coverBox.min.x + coverBox.max.x) * 0.5;
        const halfSpanX = spanX * 0.5;
        leftX_m = centerX_m - halfSpanX * 0.78;
        rightX_m = centerX_m + halfSpanX * 0.78;
        lensY_m = coverBox.min.y + spanY * 0.44;
        // Sit 3.5cm proud of the front bumper glass so emitters are unobstructed from every camera angle
        frontNoseZ_m = coverBox.max.z + 0.035;
      }
    }

    carroGrupo.position.copy(savedPos);
    carroGrupo.quaternion.copy(savedQuat);
    carroGrupo.updateMatrixWorld(true);

    // Asphalt surface (`Cidade_Object_67` `real_road`) sits at worldY = -0.286m while laneY = -0.092m
    const roadSurfaceRelY_m = -0.286 - URBAN_TRAFFIC_DEFAULTS.laneY; // -0.194m

    const beamColor = new THREE.Color('#FFF0C2');
    const streetPoolColor = new THREE.Color('#F5C878');

    // 1. Visual Headlight Emitter Group (2 high-intensity projector lenses + 2 halos + 2 cones + 2 road pools)
    const emitterGroup = new THREE.Group();
    emitterGroup.name = 'CarroHeadlightEmitterRig';
    emitterGroup.userData.skipNormalPass = true;
    emitterGroup.userData.skipObjectOutline = true;

    const lensGeo = new THREE.SphereGeometry(1, 14, 10);
    const lensMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFDF5'),
      emissive: new THREE.Color('#FFE8AD'),
      emissiveIntensity: 4.0,
      roughness: 0.1,
      metalness: 0.05,
    });

    const lensLeft = new THREE.Mesh(lensGeo, lensMaterial);
    lensLeft.name = 'HeadlightLensLeft';
    lensLeft.position.set(leftX_m * invX, lensY_m * invY, frontNoseZ_m * invZ);
    lensLeft.scale.set(0.28 * invX, 0.165 * invY, 0.125 * invZ);
    lensLeft.userData.skipNormalPass = true;
    lensLeft.userData.skipObjectOutline = true;
    lensLeft.renderOrder = 2;
    emitterGroup.add(lensLeft);

    const lensRight = new THREE.Mesh(lensGeo, lensMaterial);
    lensRight.name = 'HeadlightLensRight';
    lensRight.position.set(rightX_m * invX, lensY_m * invY, frontNoseZ_m * invZ);
    lensRight.scale.set(0.28 * invX, 0.165 * invY, 0.125 * invZ);
    lensRight.userData.skipNormalPass = true;
    lensRight.userData.skipObjectOutline = true;
    lensRight.renderOrder = 2;
    emitterGroup.add(lensRight);

    // Optical halo/flare quads around left & right lenses (feeds bloomTarget + crisp ASCII core)
    const flareTex = UrbanGlbSceneBuilder.createHeadlightFlareTexture(32);
    const haloGeo = new THREE.PlaneGeometry(1, 1);
    const haloMaterial = new THREE.MeshBasicMaterial({
      map: flareTex,
      color: new THREE.Color('#FFE49E'),
      transparent: true,
      opacity: 0.64,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const haloZ_m = frontNoseZ_m + 0.04;
    const haloLeft = new THREE.Mesh(haloGeo, haloMaterial);
    haloLeft.name = 'HeadlightHaloLeft';
    haloLeft.position.set(leftX_m * invX, lensY_m * invY, haloZ_m * invZ);
    haloLeft.rotation.x = -0.24;
    haloLeft.scale.set(0.96 * invX, 0.64 * invY, 1);
    haloLeft.userData.skipNormalPass = true;
    haloLeft.userData.skipObjectOutline = true;
    haloLeft.renderOrder = 3;
    emitterGroup.add(haloLeft);

    const haloRight = new THREE.Mesh(haloGeo, haloMaterial);
    haloRight.name = 'HeadlightHaloRight';
    haloRight.position.set(rightX_m * invX, lensY_m * invY, haloZ_m * invZ);
    haloRight.rotation.x = -0.24;
    haloRight.scale.set(0.96 * invX, 0.64 * invY, 1);
    haloRight.userData.skipNormalPass = true;
    haloRight.userData.skipObjectOutline = true;
    haloRight.renderOrder = 3;
    emitterGroup.add(haloRight);

    // Subtle volumetric forward beam cones aimed from each lens down onto the asphalt ahead (+Z)
    const beamTex = UrbanGlbSceneBuilder.createBeamFalloffTexture(16, 48);
    const coneLength_m = 6.2;
    const coneRadius_m = 0.88;
    const coneGeo = new THREE.ConeGeometry(coneRadius_m, coneLength_m, 14, 1, true);
    // Shift apex to local origin (0,0,0) and orient cone axis from -Y onto +Z forward vector
    coneGeo.translate(0, -coneLength_m * 0.5, 0);
    coneGeo.rotateX(-Math.PI * 0.5);

    const coneMaterial = new THREE.MeshBasicMaterial({
      map: beamTex,
      color: new THREE.Color('#FFE6A8'),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const beamPitchDown = Math.atan2(lensY_m - roadSurfaceRelY_m, 9.5);
    const coneLeft = new THREE.Mesh(coneGeo, coneMaterial);
    coneLeft.name = 'HeadlightBeamConeLeft';
    coneLeft.position.set(leftX_m * invX, lensY_m * invY, frontNoseZ_m * invZ);
    coneLeft.rotation.set(beamPitchDown, 0.02, 0);
    coneLeft.scale.set(invX, invY, invZ);
    coneLeft.userData.skipNormalPass = true;
    coneLeft.userData.skipObjectOutline = true;
    coneLeft.renderOrder = 2;
    emitterGroup.add(coneLeft);

    const coneRight = new THREE.Mesh(coneGeo, coneMaterial);
    coneRight.name = 'HeadlightBeamConeRight';
    coneRight.position.set(rightX_m * invX, lensY_m * invY, frontNoseZ_m * invZ);
    coneRight.rotation.set(beamPitchDown, 0.06, 0);
    coneRight.scale.set(invX, invY, invZ);
    coneRight.userData.skipNormalPass = true;
    coneRight.userData.skipObjectOutline = true;
    coneRight.renderOrder = 2;
    emitterGroup.add(coneRight);

    // Forward asphalt light-cone & wet specular reflection pools hovering 2.4cm above `real_road`
    const poolTex = UrbanGlbSceneBuilder.createRoadPoolTexture(32, 64);
    const poolGeo = new THREE.PlaneGeometry(1, 1);
    poolGeo.rotateX(-Math.PI * 0.5);
    const roadPoolMaterial = new THREE.MeshBasicMaterial({
      map: poolTex,
      color: new THREE.Color('#F7CF84'),
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const poolRelY_m = roadSurfaceRelY_m + 0.024;
    const poolLen_m = 10.6;
    const poolCenterZ_m = frontNoseZ_m + 0.55 + poolLen_m * 0.5;

    const roadPoolLeft = new THREE.Mesh(poolGeo, roadPoolMaterial);
    roadPoolLeft.name = 'HeadlightRoadPoolLeft';
    roadPoolLeft.position.set((leftX_m + 0.12) * invX, poolRelY_m * invY, poolCenterZ_m * invZ);
    roadPoolLeft.scale.set(2.45 * invX, 1, poolLen_m * invZ);
    roadPoolLeft.userData.skipNormalPass = true;
    roadPoolLeft.userData.skipObjectOutline = true;
    roadPoolLeft.renderOrder = 1;
    emitterGroup.add(roadPoolLeft);

    const roadPoolRight = new THREE.Mesh(poolGeo, roadPoolMaterial);
    roadPoolRight.name = 'HeadlightRoadPoolRight';
    roadPoolRight.position.set((rightX_m + 0.42) * invX, poolRelY_m * invY, poolCenterZ_m * invZ);
    roadPoolRight.rotation.y = 0.05;
    roadPoolRight.scale.set(2.65 * invX, 1, (poolLen_m + 0.8) * invZ);
    roadPoolRight.userData.skipNormalPass = true;
    roadPoolRight.userData.skipObjectOutline = true;
    roadPoolRight.renderOrder = 1;
    emitterGroup.add(roadPoolRight);

    carroGrupo.add(emitterGroup);

    // 2. Two Front SpotLights + Targets properly parented to `Carro_Grupo`, aimed forward (+Z) onto asphalt
    const spotOriginZ_m = frontNoseZ_m + 0.06;
    const headlightLeft = new THREE.SpotLight(beamColor, 54.0, 42.0, Math.PI * 0.27, 0.56, 1.08);
    headlightLeft.name = 'CarroHeadlightSpotLeft';
    headlightLeft.position.set(leftX_m * invX, lensY_m * invY, spotOriginZ_m * invZ);
    headlightLeft.target.name = 'CarroHeadlightTargetLeft';
    headlightLeft.target.position.set(
      (leftX_m + 0.22) * invX,
      roadSurfaceRelY_m * invY,
      13.2 * invZ
    );
    carroGrupo.add(headlightLeft);
    carroGrupo.add(headlightLeft.target);

    const headlightRight = new THREE.SpotLight(beamColor, 54.0, 44.0, Math.PI * 0.29, 0.56, 1.08);
    headlightRight.name = 'CarroHeadlightSpotRight';
    headlightRight.position.set(rightX_m * invX, lensY_m * invY, spotOriginZ_m * invZ);
    headlightRight.target.name = 'CarroHeadlightTargetRight';
    // Sweeps forward asphalt, curbside, and adjacent building base as Carro_Grupo drives along +Z
    headlightRight.target.position.set(
      (rightX_m + 1.45) * invX,
      roadSurfaceRelY_m * invY,
      14.4 * invZ
    );
    carroGrupo.add(headlightRight);
    carroGrupo.add(headlightRight.target);

    // Forward asphalt specular throw light gliding 7.0m ahead of the front bumper
    const streetThrowLight = new THREE.PointLight(streetPoolColor, 24.0, 29.0, 1.24);
    streetThrowLight.name = 'CarroStreetThrowLight';
    streetThrowLight.position.set((centerX_m + 0.35) * invX, 1.08 * invY, 7.0 * invZ);
    carroGrupo.add(streetThrowLight);

    const taillightGlow = new THREE.PointLight(new THREE.Color('#C83E3E'), 3.4, 10.5, 1.55);
    taillightGlow.name = 'CarroTaillightGlow';
    taillightGlow.position.set(centerX_m * invX, 1.02 * invY, -9.55 * invZ);
    carroGrupo.add(taillightGlow);

    for (const mat of carHeadlightCovers) {
      mat.emissive = new THREE.Color('#FFE4A0');
      mat.emissiveIntensity = 1.65;
      if (mat.transparent) {
        mat.opacity = Math.max(mat.opacity, 0.74);
      }
    }

    return {
      headlightLeft,
      headlightRight,
      streetThrowLight,
      taillightGlow,
      emitterGroup,
      lensMaterial,
      haloMaterial,
      coneMaterial,
      roadPoolMaterial,
    };
  }

  private static createArchitecturalLightRig(scene: THREE.Scene): UrbanArchitecturalLightRig {
    const group = new THREE.Group();
    group.name = 'UrbanArchitecturalLightRig';

    const emissiveFixtureMaterials: THREE.MeshStandardMaterial[] = [];

    const makeFixtureMat = (
      hex: string,
      emissiveHex: string,
      intensity: number
    ): THREE.MeshStandardMaterial => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hex),
        emissive: new THREE.Color(emissiveHex),
        emissiveIntensity: intensity,
        roughness: 0.32,
        metalness: 0.14,
      });
      emissiveFixtureMaterials.push(mat);
      return mat;
    };

    // 1. Storefront Facade Lights, Warm Amber Transoms & Cyber-Cyan Neon Trim (`fachadas das lojas`)
    // Broad, smooth attenuation illuminates adjacent sidewalks, streets, and multi-story masonry facades
    const storefrontEastLight = new THREE.PointLight(new THREE.Color('#F4AA4C'), 13.5, 24.0, 1.32);
    storefrontEastLight.position.set(-4.35, 3.05, -2.55);
    group.add(storefrontEastLight);

    const eastSignGeo = new THREE.BoxGeometry(5.8, 0.28, 0.14);
    const eastSignMat = makeFixtureMat('#3A2B1C', '#F6B85C', 1.52);
    const eastSignMesh = new THREE.Mesh(eastSignGeo, eastSignMat);
    eastSignMesh.name = 'StorefrontEastTransom';
    eastSignMesh.position.set(-4.35, 3.22, -3.45);
    eastSignMesh.userData.skipObjectOutline = true;
    group.add(eastSignMesh);

    const neonStripGeo = new THREE.BoxGeometry(0.12, 2.35, 0.12);
    const neonCyanMat = makeFixtureMat('#162C33', '#58B6C6', 1.32);

    const eastNeonStrip = new THREE.Mesh(neonStripGeo, neonCyanMat);
    eastNeonStrip.name = 'StorefrontEastNeon';
    eastNeonStrip.position.set(-0.52, 2.25, -3.44);
    eastNeonStrip.userData.skipObjectOutline = true;
    group.add(eastNeonStrip);

    const storefrontWestLight = new THREE.PointLight(new THREE.Color('#ED9F44'), 12.8, 24.0, 1.32);
    storefrontWestLight.position.set(-13.35, 3.1, -1.75);
    group.add(storefrontWestLight);

    const westSignGeo = new THREE.BoxGeometry(5.4, 0.26, 0.14);
    const westSignMat = makeFixtureMat('#38291A', '#F0AC50', 1.45);
    const westSignMesh = new THREE.Mesh(westSignGeo, westSignMat);
    westSignMesh.name = 'StorefrontWestTransom';
    westSignMesh.position.set(-13.35, 3.25, -2.55);
    westSignMesh.userData.skipObjectOutline = true;
    group.add(westSignMesh);

    const westNeonStrip = new THREE.Mesh(neonStripGeo, neonCyanMat);
    westNeonStrip.name = 'StorefrontWestNeon';
    westNeonStrip.position.set(-9.82, 2.3, -2.56);
    westNeonStrip.userData.skipObjectOutline = true;
    group.add(westNeonStrip);

    // Sidewalk Kiosk Warm Counter & Canopy Glow (casts vertical golden reflections onto foreground asphalt)
    const kioskWarmLight = new THREE.PointLight(new THREE.Color('#F2B258'), 9.4, 20.0, 1.35);
    kioskWarmLight.position.set(-3.42, 2.35, 3.65);
    group.add(kioskWarmLight);

    const kioskBarGeo = new THREE.BoxGeometry(2.15, 0.12, 0.12);
    const kioskBarMat = makeFixtureMat('#3B2B1B', '#F7BC64', 1.48);
    const kioskBarMesh = new THREE.Mesh(kioskBarGeo, kioskBarMat);
    kioskBarMesh.name = 'KioskCanopyGlow';
    kioskBarMesh.position.set(-3.42, 2.54, 3.42);
    kioskBarMesh.userData.skipObjectOutline = true;
    group.add(kioskBarMesh);

    // 2. Streetlamps / Luminaires Along the Roadway (`postes/luminárias`)
    const lampGlobeGeo = new THREE.SphereGeometry(0.22, 10, 8);
    const lampGlobeMat = makeFixtureMat('#FFF4DC', '#FAD284', 1.82);

    const streetLampWest = new THREE.PointLight(new THREE.Color('#F6C270'), 17.5, 30.0, 1.28);
    streetLampWest.position.set(-17.99, 6.0, 3.14);
    group.add(streetLampWest);

    const globeWest = new THREE.Mesh(lampGlobeGeo, lampGlobeMat);
    globeWest.name = 'StreetLampGlobeWest';
    globeWest.position.set(-17.99, 6.2, 3.14);
    globeWest.userData.skipObjectOutline = true;
    group.add(globeWest);

    // Sleek curbside luminaire at `(-5.25, y, 4.00)` outside central player sightline, illuminating wet roadbed
    const poleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3C4A56'),
      roughness: 0.52,
      metalness: 0.18,
    });
    const postGeo = new THREE.CylinderGeometry(0.06, 0.085, 5.35, 8);
    const postMesh = new THREE.Mesh(postGeo, poleMat);
    postMesh.name = 'CurbsideLuminairePost';
    postMesh.position.set(-5.25, 2.75, 4.0);
    postMesh.castShadow = true;
    postMesh.receiveShadow = true;
    group.add(postMesh);

    const armGeo = new THREE.BoxGeometry(0.08, 0.08, 0.72);
    const armMesh = new THREE.Mesh(armGeo, poleMat);
    armMesh.name = 'CurbsideLuminaireArm';
    armMesh.position.set(-5.25, 5.42, 4.3);
    group.add(armMesh);

    const streetLampCenter = new THREE.PointLight(new THREE.Color('#F2BA68'), 15.6, 28.0, 1.28);
    streetLampCenter.position.set(-5.25, 5.25, 4.58);
    group.add(streetLampCenter);

    const globeCenter = new THREE.Mesh(lampGlobeGeo, lampGlobeMat);
    globeCenter.name = 'StreetLampGlobeCenter';
    globeCenter.position.set(-5.25, 5.32, 4.58);
    globeCenter.userData.skipObjectOutline = true;
    group.add(globeCenter);

    const streetLampEast = new THREE.PointLight(new THREE.Color('#ECAF5E'), 13.8, 28.0, 1.28);
    streetLampEast.position.set(8.4, 6.0, 4.83);
    group.add(streetLampEast);

    const globeEast = new THREE.Mesh(lampGlobeGeo, lampGlobeMat);
    globeEast.name = 'StreetLampGlobeEast';
    globeEast.position.set(8.4, 6.2, 4.83);
    globeEast.userData.skipObjectOutline = true;
    group.add(globeEast);

    // 3. Distant West Avenue Cyber-Slate Beacon (depth layering light point in upper-left background)
    const avenueBeaconLight = new THREE.PointLight(new THREE.Color('#5CA8BA'), 8.8, 26.0, 1.32);
    avenueBeaconLight.position.set(-27.2, 4.8, 1.6);
    group.add(avenueBeaconLight);

    const beaconGeo = new THREE.SphereGeometry(0.18, 8, 6);
    const beaconMat = makeFixtureMat('#1B323A', '#6AC2D4', 1.35);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.name = 'AvenueCyberBeacon';
    beaconMesh.position.set(-27.6, 4.95, 1.6);
    beaconMesh.userData.skipObjectOutline = true;
    group.add(beaconMesh);

    scene.add(group);

    return {
      group,
      storefrontEastLight,
      storefrontWestLight,
      kioskWarmLight,
      streetLampWest,
      streetLampCenter,
      streetLampEast,
      avenueBeaconLight,
      poleMaterial: poleMat,
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
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.011);

    const ambientFill = new THREE.AmbientLight(new THREE.Color('#6E88A4'), 0.56);
    ambientFill.name = 'UrbanAmbientFillLight';
    scene.add(ambientFill);

    const ambientHemi = new THREE.HemisphereLight(
      new THREE.Color(config.palette.coolAmbient),
      new THREE.Color('#2C3C4C'),
      1.58
    );
    scene.add(ambientHemi);

    const keyDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.coolAmbient).lerp(new THREE.Color('#C8DCF0'), 0.55),
      2.15
    );
    keyDirLight.name = 'KeyDirectionalLight';
    keyDirLight.position.set(16, 28, 18);
    keyDirLight.target.position.set(-6, 0.5, 0);
    scene.add(keyDirLight.target);

    keyDirLight.castShadow = config.enableShadows;
    keyDirLight.shadow.mapSize.width = 1536;
    keyDirLight.shadow.mapSize.height = 1536;
    keyDirLight.shadow.camera.near = 2.0;
    keyDirLight.shadow.camera.far = 90.0;
    keyDirLight.shadow.camera.left = -34;
    keyDirLight.shadow.camera.right = 24;
    keyDirLight.shadow.camera.top = 26;
    keyDirLight.shadow.camera.bottom = -26;
    keyDirLight.shadow.bias = -0.0005;
    keyDirLight.shadow.normalBias = 0.035;
    scene.add(keyDirLight);

    const rimDirLight = new THREE.DirectionalLight(
      new THREE.Color(config.palette.warmLight),
      1.08
    );
    rimDirLight.name = 'RimDirectionalLight';
    rimDirLight.position.set(-20, 14, -15);
    rimDirLight.target.position.set(-4, 1.0, -1);
    scene.add(rimDirLight.target);
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
    waypointMarker.userData.skipNormalPass = true;
    waypointMarker.visible = false;
    scene.add(waypointMarker);

    const stage: BuiltUrbanGlbStage = {
      scene,
      ambientFill,
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
   * `Carro_Grupo`) into ECS entities with NLA animations, sidewalk clamping, foreground
   * line-of-sight occlusion metadata, and moving traffic lights.
   */
  public static attachPreparedAssets(
    stage: BuiltUrbanGlbStage,
    assets: PreparedUrbanGlbAssets,
    config: EngineConfig,
    ecsWorld: World
  ): void {
    stage.assets = assets;
    stage.urbanLightRig.poleMaterial.normalMap = assets.proceduralNormals.facade;
    stage.urbanLightRig.poleMaterial.normalScale.set(0.36, 0.36);

    const { cidade, playerRig, carroGrupo } = assets.nodes;

    // Detach from temporary GLTF wrapper scene and mount directly onto our managed THREE.Scene
    stage.scene.add(cidade);
    stage.scene.add(playerRig);
    stage.scene.add(carroGrupo);

    // Compute visible city bounds once, ignoring exporter helper boxes. A scene-wide
    // overview can then be fitted to the actual viewport instead of an arbitrary cap.
    cidade.updateWorldMatrix(true, true);
    const overviewBounds = new THREE.Box3().makeEmpty();
    const meshBounds = new THREE.Box3();
    cidade.traverseVisible((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      if (mesh.geometry.boundingBox) {
        meshBounds.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
        overviewBounds.union(meshBounds);
      }
    });
    // Include the full vehicle route even when the car is temporarily hidden.
    overviewBounds.expandByPoint(new THREE.Vector3(URBAN_TRAFFIC_DEFAULTS.laneX, 0, URBAN_TRAFFIC_DEFAULTS.startZ));
    overviewBounds.expandByPoint(new THREE.Vector3(URBAN_TRAFFIC_DEFAULTS.laneX, 0, URBAN_TRAFFIC_DEFAULTS.endZ));

    // 1. Static Urban Environment Entity (`Cidade_Sketchfab_model` + runtime `ForegroundOccluders`)
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
      .addComponent(cidadeId, 'ForegroundOccluders', {
        groups: assets.foregroundOccluders,
        centralFocusX: -4.2,
        centralFocusY: 1.8,
        centralFocusZ: -2.4,
        playerClearanceRadius: 1.65,
        centralNdcHalfWidth: 0.52,
        centralNdcHalfHeight: 0.58,
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

    // Crisp ivory silhouette catchlight on `Player_Rig` so character stands out cleanly on dark pavement
    const rigScale = Math.max(0.001, Math.abs(playerRig.scale.y || 1));
    const playerRimLight = new THREE.PointLight(new THREE.Color('#EEF6FF'), 3.4, 4.6, 1.95);
    playerRimLight.position.set(0.18 / rigScale, 2.75 / rigScale, 0.35 / rigScale);
    playerRig.add(playerRimLight);
    stage.playerRimLight = playerRimLight;

    const sidewalkBounds: SidewalkBoundsComponent = {
      ...DEFAULT_URBAN_SIDEWALK_BOUNDS,
      obstacles: DEFAULT_URBAN_SIDEWALK_BOUNDS.obstacles.map((o) => ({ ...o })),
      walkablePockets: DEFAULT_URBAN_SIDEWALK_BOUNDS.walkablePockets?.map((p) => ({ ...p })),
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
        overviewBounds,
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
    const carHeadlights = UrbanGlbSceneBuilder.attachVehicleHeadlightRig(
      carroGrupo,
      assets.materials.carHeadlightCovers
    );
    const {
      headlightLeft,
      headlightRight,
      streetThrowLight,
      taillightGlow,
      emitterGroup: headlightEmitterGroup,
      lensMaterial: headlightLensMaterial,
      haloMaterial: headlightHaloMaterial,
      coneMaterial: headlightConeMaterial,
      roadPoolMaterial: headlightRoadPoolMaterial,
    } = carHeadlights;

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
        headlightEmitterGroup,
        headlightLensMaterial,
        headlightHaloMaterial,
        headlightConeMaterial,
        headlightRoadPoolMaterial,
        baseSpotIntensity: 54.0,
        basePointIntensity: 24.0,
        baseTailIntensity: 3.4,
        baseLensEmissive: 4.0,
        baseHaloOpacity: 0.64,
        baseConeOpacity: 0.22,
        baseRoadPoolOpacity: 0.36,
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
   * rooftop billboards, and `Carro_Grupo` headlight intensities across `'day'`, `'night'`, and `'rain'`.
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
      fog.density = mode === 'rain' ? 0.0205 : mode === 'day' ? 0.0055 : 0.011;
    }

    const cool = new THREE.Color(config.palette.coolAmbient);
    const warm = new THREE.Color(config.palette.warmLight);
    const rig = stage.urbanLightRig;

    if (mode === 'day') {
      // Bright, open sunlit urban day: clear sky fill, warm solar key, and opposite-azimuth bounce
      // so streets, sidewalks, shaded facades, trees, Player_Rig, and Carro_Grupo read effortlessly
      stage.ambientFill.color.set('#D6E4F0');
      stage.ambientFill.intensity = 0.70;

      stage.ambientHemi.color.copy(cool).lerp(new THREE.Color('#E4F0FA'), 0.72);
      stage.ambientHemi.groundColor.set('#6E7F8E');
      stage.ambientHemi.intensity = 1.70;

      stage.keyDirLight.color.set('#FFF6E8');
      stage.keyDirLight.intensity = 2.65;
      stage.keyDirLight.position.set(20, 34, 18);

      stage.rimDirLight.color.copy(cool).lerp(new THREE.Color('#C6DCF0'), 0.55);
      stage.rimDirLight.intensity = 0.70;

      rig.storefrontEastLight.intensity = 1.4;
      rig.storefrontWestLight.intensity = 1.3;
      rig.kioskWarmLight.intensity = 0.95;
      rig.streetLampWest.intensity = 1.15;
      rig.streetLampCenter.intensity = 1.05;
      rig.streetLampEast.intensity = 0.95;
      rig.avenueBeaconLight.intensity = 0.75;
      for (const m of rig.emissiveFixtureMaterials) {
        m.emissiveIntensity = 0.28;
      }
      if (stage.playerRimLight) {
        stage.playerRimLight.intensity = 0.30;
      }
    } else if (mode === 'rain') {
      // Stormy Cyber-Noir: cool overcast storm-cloud wash + intense wet-asphalt reflection pools
      stage.ambientFill.color.set('#7B9AB8');
      stage.ambientFill.intensity = 0.72;

      stage.ambientHemi.color.copy(cool).lerp(new THREE.Color('#B0CAE2'), 0.56);
      stage.ambientHemi.groundColor.set('#34485C');
      stage.ambientHemi.intensity = 1.92;

      stage.keyDirLight.color.copy(cool).lerp(new THREE.Color('#C2DAF0'), 0.58);
      stage.keyDirLight.intensity = 2.48;
      stage.keyDirLight.position.set(14, 27, 18);

      stage.rimDirLight.color.copy(warm).lerp(new THREE.Color('#92C2DA'), 0.52);
      stage.rimDirLight.intensity = 1.38;

      rig.storefrontEastLight.intensity = 15.2;
      rig.storefrontWestLight.intensity = 14.4;
      rig.kioskWarmLight.intensity = 10.6;
      rig.streetLampWest.intensity = 19.6;
      rig.streetLampCenter.intensity = 17.4;
      rig.streetLampEast.intensity = 15.2;
      rig.avenueBeaconLight.intensity = 9.8;
      for (const m of rig.emissiveFixtureMaterials) {
        m.emissiveIntensity = 1.95;
      }
      if (stage.playerRimLight) {
        stage.playerRimLight.intensity = 0.5;
      }
    } else {
      // 'night' — darker than day yet genuinely legible: moonlit skyline + broad warm street/facade pools
      stage.ambientFill.color.set('#6E88A4');
      stage.ambientFill.intensity = 0.56;

      stage.ambientHemi.color.copy(cool).lerp(new THREE.Color('#9AB4CC'), 0.48);
      stage.ambientHemi.groundColor.set('#2C3C4C');
      stage.ambientHemi.intensity = 1.58;

      stage.keyDirLight.color.copy(cool).lerp(new THREE.Color('#C8DCF0'), 0.55);
      stage.keyDirLight.intensity = 2.15;
      stage.keyDirLight.position.set(16, 28, 18);

      stage.rimDirLight.color.copy(warm).lerp(new THREE.Color('#88B4C6'), 0.42);
      stage.rimDirLight.intensity = 1.08;

      rig.storefrontEastLight.intensity = 13.5;
      rig.storefrontWestLight.intensity = 12.8;
      rig.kioskWarmLight.intensity = 9.4;
      rig.streetLampWest.intensity = 17.5;
      rig.streetLampCenter.intensity = 15.6;
      rig.streetLampEast.intensity = 13.8;
      rig.avenueBeaconLight.intensity = 8.8;
      for (const m of rig.emissiveFixtureMaterials) {
        m.emissiveIntensity = 1.72;
      }
      if (stage.playerRimLight) {
        stage.playerRimLight.intensity = 0.45;
      }
    }

    stage.keyDirLight.castShadow = config.enableShadows;
    (stage.waypointMarker.material as THREE.MeshBasicMaterial).color.copy(warm);

    // Update road wetness, calibrated linear albedo (`real_road` WebP is 0.0084 linear), normal relief & emissives
    if (stage.assets) {
      const applyScaledNormal = (mat: THREE.MeshStandardMaterial, factor: number): void => {
        if (!mat.normalMap || !mat.normalScale) return;
        const baseX =
          typeof mat.userData.__baseNormalScaleX === 'number'
            ? mat.userData.__baseNormalScaleX
            : mat.normalScale.x;
        const baseY =
          typeof mat.userData.__baseNormalScaleY === 'number'
            ? mat.userData.__baseNormalScaleY
            : mat.normalScale.y;
        mat.normalScale.set(baseX * factor, baseY * factor);
      };

      const reflection = THREE.MathUtils.clamp(config.reflectionStrength ?? 0.25, 0, 1);
      const roadRoughness = THREE.MathUtils.lerp(0.98, mode === 'rain' ? 0.78 : 0.86, reflection);
      const roadMetalness = 0.02 * reflection;
      // Compensate `real_road` embedded texture's 0.0084 linear albedo while keeping full aggregate texture detail
      const roadColorScale: [number, number, number] =
        mode === 'day'
          ? [7.0, 7.4, 7.8]
          : mode === 'rain'
            ? [5.0, 5.5, 6.0]
            : [5.2, 5.7, 6.2];
      const roadEmissiveIntensity = mode === 'day' ? 0.03 : mode === 'rain' ? 0.09 : 0.08;
      const roadNormalFactor = mode === 'rain' ? 0.62 : mode === 'day' ? 1.08 : 0.92;
      for (const mat of stage.assets.materials.roads) {
        mat.roughness = roadRoughness;
        mat.metalness = roadMetalness;
        // Both road tiles use the same real_road material. Its baked roughness
        // map multiplied the preset roughness and produced harsh specular patches.
        if (mat.roughnessMap) { mat.roughnessMap = null; mat.needsUpdate = true; }
        mat.color.setRGB(roadColorScale[0], roadColorScale[1], roadColorScale[2]);
        if (mat.emissive) {
          mat.emissive.set(mode === 'day' ? '#2A3642' : '#121D28');
          mat.emissiveIntensity = roadEmissiveIntensity;
        }
        applyScaledNormal(mat, roadNormalFactor);
      }

      const sidewalkRoughness = THREE.MathUtils.lerp(0.98, mode === 'rain' ? 0.72 : 0.84, reflection);
      const sidewalkMetalness = 0.02 * reflection;
      const sidewalkColorScale: [number, number, number] =
        mode === 'day'
          ? [0.90, 0.94, 0.98]
          : mode === 'rain'
            ? [0.98, 1.08, 1.18]
            : [1.04, 1.12, 1.2];
      const sidewalkEmissive = mode === 'day' ? 0.02 : mode === 'rain' ? 0.07 : 0.06;
      const sidewalkNormalFactor = mode === 'rain' ? 0.74 : mode === 'day' ? 1.08 : 0.96;
      for (const mat of stage.assets.materials.sidewalks) {
        mat.roughness = sidewalkRoughness;
        mat.metalness = sidewalkMetalness;
        mat.color.setRGB(
          sidewalkColorScale[0],
          sidewalkColorScale[1],
          sidewalkColorScale[2]
        );
        if (mat.emissive) {
          mat.emissive.set('#16222E');
          mat.emissiveIntensity = sidewalkEmissive;
        }
        applyScaledNormal(mat, sidewalkNormalFactor);
      }

      // Keep architectural walls, roofs, lampposts & urban props cohesive and sculpted across all 3 presets
      const wallColorScale: [number, number, number] =
        mode === 'day'
          ? [0.90, 0.94, 0.98]
          : mode === 'rain'
            ? [0.96, 1.06, 1.16]
            : [1.02, 1.1, 1.18];
      const wallEmissive = mode === 'day' ? 0.05 : mode === 'rain' ? 0.1 : 0.09;
      const wallNormalFactor = mode === 'day' ? 1.15 : mode === 'rain' ? 0.98 : 1.08;
      for (const mat of stage.assets.materials.walls) {
        mat.color.setRGB(wallColorScale[0], wallColorScale[1], wallColorScale[2]);
        if (mat.emissive) {
          mat.emissive.set(mode === 'day' ? '#243240' : '#16222E');
          mat.emissiveIntensity = wallEmissive;
        }
        applyScaledNormal(mat, wallNormalFactor);
      }

      // Protagonist (`Player_Rig`) sculpted contrast across day / night / rain
      const charEmissive = mode === 'day' ? 0.03 : mode === 'rain' ? 0.08 : 0.07;
      const charNormalFactor = mode === 'day' ? 1.08 : 1.0;
      for (const mat of stage.assets.materials.character) {
        // Do not replace authored character albedo/maps when a future GLB supplies them.
        const authoredColor = mat.userData.__playerBaseColor as THREE.Color | undefined;
        if (authoredColor) mat.color.copy(authoredColor);
        else mat.color.set('#55778A');
        mat.roughness = Math.max(0.7, mat.roughness);
        mat.metalness = Math.min(0.04, mat.metalness);
        applyScaledNormal(mat, charNormalFactor);
        if (mat.emissive) {
          mat.emissive.set('#2C4456');
          mat.emissiveIntensity = charEmissive;
        }
      }

      // Vehicle (`Carro_Grupo`) clear silhouette response during its 8s active pass
      const carEmissive = mode === 'day' ? 0.14 : mode === 'rain' ? 0.3 : 0.26;
      const carNormalFactor = mode === 'rain' ? 0.88 : 1.0;
      for (const mat of stage.assets.materials.carBody) {
        mat.color.set(mode === 'day' ? '#D8E4EE' : '#CEDCE8');
        applyScaledNormal(mat, carNormalFactor);
        if (mat.emissive) {
          mat.emissive.set('#1F3140');
          mat.emissiveIntensity = carEmissive;
        }
      }

      // Warm golden-amber window glow on storefronts & upper stories (`Q 8 $ # o a` reference look)
      const windowGlow = mode === 'day' ? 0.12 : mode === 'rain' ? 0.92 : 0.85;
      const windowAmber = new THREE.Color('#ECA84C');
      for (const mat of stage.assets.materials.windows) {
        if (mat.emissive) {
          mat.emissive.copy(windowAmber);
          mat.emissiveIntensity = windowGlow;
        }
      }

      const kioskGlow = mode === 'day' ? 0.12 : mode === 'rain' ? 0.76 : 0.68;
      const kioskAmber = new THREE.Color('#E2A24A');
      for (const mat of stage.assets.materials.kioskGlass) {
        if (mat.emissive) {
          mat.emissive.copy(kioskAmber);
          mat.emissiveIntensity = kioskGlow;
        }
      }

      // Subtle background rooftop billboard glow for depth layering
      const billboardGlow = mode === 'day' ? 0.08 : mode === 'rain' ? 0.48 : 0.42;
      const billboardTint = new THREE.Color('#5AA6B8');
      for (const mat of stage.assets.materials.billboards) {
        if (mat.emissive) {
          mat.emissive.copy(billboardTint);
          mat.emissiveIntensity = billboardGlow;
        }
      }

      // Readable emerald / moss-sage canopies & ground grass beds across all 3 atmospheres
      const foliageColorScale: [number, number, number] =
        mode === 'day'
          ? [1.38, 1.54, 1.32]
          : mode === 'rain'
            ? [1.04, 1.18, 1.08]
            : [1.06, 1.2, 1.06];
      const foliageLift = mode === 'day' ? 0.12 : mode === 'rain' ? 0.2 : 0.18;
      const mossEmissive = new THREE.Color(mode === 'day' ? '#234E34' : '#1E4A30');
      for (const mat of stage.assets.materials.foliage) {
        mat.color.setRGB(foliageColorScale[0], foliageColorScale[1], foliageColorScale[2]);
        if (mat.emissive) {
          mat.emissive.copy(mossEmissive);
          mat.emissiveIntensity = foliageLift;
        }
      }

      const lampScale = mode === 'day' ? 0.22 : mode === 'rain' ? 1.38 : 1.25;
      for (const mat of stage.assets.materials.streetLamps) {
        mat.emissiveIntensity = lampScale;
      }
    }

    // Update `Carro_Grupo` moving headlight SpotLights, emissive lenses, halos, cones & road reflection per preset
    if (ecsWorld && stage.carroEntityId !== null) {
      const traffic = ecsWorld.getComponent(stage.carroEntityId, 'TrafficCycle');
      if (traffic) {
        if (mode === 'day') {
          traffic.baseSpotIntensity = 5.5;
          traffic.basePointIntensity = 3.2;
          traffic.baseTailIntensity = 1.0;
          traffic.baseLensEmissive = 0.95;
          traffic.baseHaloOpacity = 0.18;
          traffic.baseConeOpacity = 0.0;
          traffic.baseRoadPoolOpacity = 0.06;
        } else if (mode === 'rain') {
          traffic.baseSpotIntensity = 72.0;
          traffic.basePointIntensity = 32.0;
          traffic.baseTailIntensity = 4.5;
          traffic.baseLensEmissive = 4.8;
          traffic.baseHaloOpacity = 0.82;
          traffic.baseConeOpacity = 0.32;
          traffic.baseRoadPoolOpacity = 0.52;
        } else {
          traffic.baseSpotIntensity = 58.0;
          traffic.basePointIntensity = 26.0;
          traffic.baseTailIntensity = 3.6;
          traffic.baseLensEmissive = 4.2;
          traffic.baseHaloOpacity = 0.68;
          traffic.baseConeOpacity = 0.24;
          traffic.baseRoadPoolOpacity = 0.4;
        }
      }
    }
  }
}
