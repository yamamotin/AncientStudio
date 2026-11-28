import * as THREE from 'three';
import type { EngineConfig } from '../types';

/**
 * Color-theory reference palette for `[ STACK // NEOFETCH ]` — Antarctic ice (`gelo polar`),
 * tuned so the ASCII composite never blows out. The single canonical pass lifts every geometry
 * cell to `geomMinLuma` (~0.13–0.17) and then remaps it into 0.13→0.84, so a *pale* substrate
 * saturates the whole frame with dense glyphs and Tux (white belly ≈ 0.78) disappears into it:
 * that was the "washed out" look. The ice therefore stays cold but contained:
 * - Backdrop (`#25465B` / `rgb(37, 70, 91)`): deep polar-ice blue. After the shader's
 *   0.46–0.56 radiance band it lands at ≈0.12–0.15 raw (≈0.16–0.18 shaped): sparse stipple,
 *   so Tux's silhouette keeps a calm, near-void wall behind it.
 * - Floor (`#4E819A` / `rgb(78, 129, 154)`): glacier shelf, brighter than the wall but still
 *   contained (≈0.23–0.28 raw, ≈0.25–0.29 shaped) so the contact shadow, the yaw-synced
 *   reflection and the white belly (≈0.78) all keep their separation.
 */
export const MASCOT_BACKDROP_HEX = '#25465B';
export const MASCOT_FLOOR_HEX = '#4E819A';

/**
 * Frost-mint silhouette tint for Tux's per-object outline shell. The contained ice keeps the
 * frame calm, so value contrast alone would leave the obsidian coat (`#080D14`) sitting within
 * ~0.03 shaped luma of the wall — one ASCII ramp step at best. The inverted-hull outline
 * (`objectOutline.ts`) draws a cool, ice-lit edge around the mascot instead, which is what keeps
 * body, outline, beak, feet and legs legible without brightening the stage back into a white-out.
 */
export const MASCOT_OUTLINE_HEX = '#BFE4F6';

export interface BuiltMascotStage {
  scene: THREE.Scene;
  backdropMesh: THREE.Mesh;
  backdropMaterial: THREE.ShaderMaterial;
  floorMesh: THREE.Mesh;
  floorMaterial: THREE.ShaderMaterial;
  hemiLight: THREE.HemisphereLight;
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  backLeftRimLight: THREE.DirectionalLight;
}

const MASCOT_BACKDROP_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const MASCOT_BACKDROP_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec3 uBackdropColor;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    // Calibrated directly for the single canonical ASCII composite pass:
    // maps the deep polar-ice backdrop (#25465B) into a calm, cold ASCII stipple
    // (',' ':' ';'). Kept dark on purpose: the composite remaps geometry into
    // 0.13→0.84, so a bright wall would flood the frame with dense glyphs and wash
    // Tux out instead of framing his silhouette.
    vec3 backdropBase = pow(max(uBackdropColor, vec3(0.0001)), vec3(1.0 / 2.2));
    vec2 focus = vec2(vWorldPos.x * 0.24, (vWorldPos.y - 1.05) * 0.34);
    float studioPool = exp(-dot(focus, focus) * 1.45);
    float verticalFalloff = clamp(1.04 - max(vWorldPos.y, 0.0) * 0.055, 0.88, 1.04);
    float radianceScale = clamp(verticalFalloff * 0.500 + studioPool * 0.060, 0.460, 0.560);

    gl_FragColor = vec4(backdropBase * radianceScale, 1.0);
  }
`;

const MASCOT_FLOOR_VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const MASCOT_FLOOR_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec3 uFloorColor;
  uniform vec3 uBackdropColor;
  uniform vec3 uReflectBellyColor;
  uniform vec3 uReflectAmberColor;
  uniform vec3 uReflectRimColor;
  uniform vec3 uCamPos;
  uniform vec3 uSubjectPos;
  uniform float uSubjectYaw;
  uniform float uHorizonZ;

  uniform sampler2D uDirShadowMap;
  uniform mat4 uDirShadowMatrix;
  uniform vec2 uShadowMapSize;
  uniform float uShadowEnabled;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  const float UnpackDownscale = 255.0 / 256.0;
  const vec4 PackFactors = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
  const vec4 UnpackFactors4 = vec4(UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a);

  float unpackRGBAToDepth(const in vec4 v) {
    return dot(v, UnpackFactors4);
  }

  float sampleSoftKeyShadow(vec3 worldPos) {
    if (uShadowEnabled < 0.5) return 1.0;

    vec4 sc = uDirShadowMatrix * vec4(worldPos, 1.0);
    vec3 proj = sc.xyz / max(sc.w, 0.0001);
    proj.z -= 0.00065;

    if (proj.x <= 0.005 || proj.x >= 0.995 || proj.y <= 0.005 || proj.y >= 0.995 || proj.z <= 0.0 || proj.z >= 1.0) {
      return 1.0;
    }

    vec2 texel = 1.75 / max(uShadowMapSize, vec2(512.0));
    float s0 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy)));
    float s1 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2( texel.x,  texel.y * 0.5))));
    float s2 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2(-texel.x, -texel.y * 0.5))));
    float s3 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2(-texel.x * 0.5,  texel.y))));
    float s4 = step(proj.z, unpackRGBAToDepth(texture2D(uDirShadowMap, proj.xy + vec2( texel.x * 0.5, -texel.y))));
    return s0 * 0.28 + (s1 + s2 + s3 + s4) * 0.18;
  }

  void main() {
    vec2 relXz = vWorldPos.xz - uSubjectPos.xz;
    float cosY = cos(-uSubjectYaw);
    float sinY = sin(-uSubjectYaw);
    vec2 localGround = vec2(
      relXz.x * cosY - relXz.y * sinY,
      relXz.x * sinY + relXz.y * cosY
    );

    vec3 floorBase = pow(max(uFloorColor, vec3(0.0001)), vec3(1.0 / 2.2));
    vec3 backdropBase = pow(max(uBackdropColor, vec3(0.0001)), vec3(1.0 / 2.2));

    // 1. Calibrated #4E819A glacier-shelf radiance so the canonical ASCII ramp selects horizontal weave ('~' '+' '_' '-')
    float radialDist = length(relXz * vec2(0.38, 0.46));
    float depthGrade = clamp((vWorldPos.z - uHorizonZ) / 6.2, 0.0, 1.0);
    float floorLight = clamp(0.50 + depthGrade * 0.05 + exp(-radialDist * radialDist * 1.1) * 0.04, 0.49, 0.60);
    vec3 color = floorBase * floorLight;

    // 2. Soft grounding shadow under Tux (5-tap PCF directional shadow + smooth elliptical contact AO)
    float pcfLit = sampleSoftKeyShadow(vWorldPos);
    float bodyAoDist = length((relXz - vec2(0.08, -0.05)) / vec2(0.88, 0.72));
    float bodyContactAo = 1.0 - smoothstep(0.16, 1.10, bodyAoDist);

    float footLDist = length((localGround - vec2(-0.34, 0.42)) / vec2(0.30, 0.36));
    float footRDist = length((localGround - vec2( 0.34, 0.42)) / vec2(0.30, 0.36));
    float feetContactAo =
      (1.0 - smoothstep(0.14, 1.04, footLDist)) * 0.52 +
      (1.0 - smoothstep(0.14, 1.04, footRDist)) * 0.52;

    float combinedOcclusion = clamp(
      max(bodyContactAo * 0.42 + feetContactAo * 0.18, (1.0 - pcfLit) * 0.40),
      0.0,
      0.48
    );
    color *= (1.0 - combinedOcclusion);

    // 3. Subtle, diffused planar reflection quantized through the same ASCII pass
    vec3 viewInc = normalize(vWorldPos - uCamPos);
    vec3 reflDir = reflect(viewInc, vec3(0.0, 1.0, 0.0));
    float rHoriz2 = max(dot(reflDir.xz, reflDir.xz), 0.0001);
    float tHit = -dot(relXz, reflDir.xz) / rHoriz2;

    if (tHit > 0.0 && reflDir.y > 0.01) {
      vec3 q = vWorldPos + reflDir * tHit;
      float qy = q.y - uSubjectPos.y;

      if (qy > -0.05 && qy < 2.10) {
        vec2 qRel = q.xz - uSubjectPos.xz;
        vec2 qLocal = vec2(
          qRel.x * cosY - qRel.y * sinY,
          qRel.x * sinY + qRel.y * cosY
        );

        float blur = 0.18 + max(qy, 0.0) * 0.28;
        float heightFade = exp(-max(qy, 0.0) * 1.25);
        float floorProxFade = exp(-length(relXz) * 0.55);
        float reflEnvelope = heightFade * floorProxFade;

        vec2 coatEllip = vec2(qLocal.x / (0.72 + blur), (qy - 0.88) / (0.98 + blur));
        float coatMask = (1.0 - smoothstep(0.55, 1.08, length(coatEllip))) * reflEnvelope;
        float coatRim = smoothstep(0.54, 0.94, length(coatEllip)) * coatMask;
        color *= (1.0 - coatMask * 0.10);
        color += uReflectRimColor * (coatRim * 0.032);

        float frontFacing = smoothstep(-0.15, 0.65, cos(uSubjectYaw));
        vec2 bellyEllip = vec2(qLocal.x / (0.50 + blur), (qy - 0.76) / (0.82 + blur));
        float bellyMask = (1.0 - smoothstep(0.42, 1.02, length(bellyEllip))) * frontFacing * reflEnvelope;
        color += uReflectBellyColor * (bellyMask * 0.065);

        vec2 footLRefl = vec2((qLocal.x + 0.34) / (0.26 + blur * 0.65), (qy - 0.10) / (0.22 + blur * 0.65));
        vec2 footRRefl = vec2((qLocal.x - 0.34) / (0.26 + blur * 0.65), (qy - 0.10) / (0.22 + blur * 0.65));
        float footVisL = smoothstep(-0.35, 0.55, qLocal.y + 0.32);
        float feetReflMask = (
          (1.0 - smoothstep(0.35, 1.05, length(footLRefl))) +
          (1.0 - smoothstep(0.35, 1.05, length(footRRefl)))
        ) * footVisL * reflEnvelope;
        color += uReflectAmberColor * (clamp(feetReflMask, 0.0, 1.15) * 0.055);
      }
    }

    float ndotv = clamp(dot(-viewInc, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 4.0);
    color += uReflectRimColor * (fresnel * 0.018);

    float horizonSeam = smoothstep(uHorizonZ + 0.045, uHorizonZ - 0.005, vWorldPos.z);
    color = mix(color, backdropBase * 0.50, horizonSeam);

    gl_FragColor = vec4(color, 1.0);
  }
`;

let sharedMascotShadowPlaceholder: THREE.DataTexture | null = null;

function getMascotShadowPlaceholder(): THREE.DataTexture {
  if (!sharedMascotShadowPlaceholder) {
    const data = new Uint8Array([255, 255, 255, 255]);
    const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    sharedMascotShadowPlaceholder = tex;
  }
  return sharedMascotShadowPlaceholder;
}

/**
 * MascotStageBuilder: Builds the minimalist, pure-ASCII-calibrated 3D showcase stage
 * around Tux for `[ STACK // NEOFETCH ]`:
 * 1. Continuous backdrop plane (`#25465B` / `rgb(37, 70, 91)`, deep Antarctic ice)
 * 2. Horizontal ground floor plane (`#4E819A` / `rgb(78, 129, 154)`, glacier shelf)
 * 3. Balanced studio lighting (soft main key + front-right fill + cool hemi + discreet rim lights)
 * 4. Soft PCF + contact shadow & diffused yaw-synced floor reflection quantized through the single ASCII pipeline
 */
export class MascotStageBuilder {
  public static build(config: EngineConfig): BuiltMascotStage {
    const backdropColor = new THREE.Color(MASCOT_BACKDROP_HEX);
    const floorColor = new THREE.Color(MASCOT_FLOOR_HEX);

    const scene = new THREE.Scene();
    scene.background = backdropColor.clone();

    const horizonZ = -3.35;

    // 1. Minimalist Continuous Backdrop Plane (#25465B, deep Antarctic ice)
    const backdropMaterial = new THREE.ShaderMaterial({
      vertexShader: MASCOT_BACKDROP_VERTEX_SHADER,
      fragmentShader: MASCOT_BACKDROP_FRAGMENT_SHADER,
      uniforms: {
        uBackdropColor: { value: backdropColor.clone() },
      },
      depthWrite: true,
    });
    const backdropMesh = new THREE.Mesh(new THREE.PlaneGeometry(26, 14, 1, 1), backdropMaterial);
    backdropMesh.name = 'MascotStageBackdrop';
    backdropMesh.position.set(0, 4.6, horizonZ);
    backdropMesh.userData.isMascotBackdrop = true;
    backdropMesh.userData.skipObjectOutline = true;
    scene.add(backdropMesh);

    // 2. Minimalist Horizontal Floor Plane (#4E819A, glacier shelf) with Soft Shadow & Controlled Reflection
    const dummyShadowTex = getMascotShadowPlaceholder();
    const floorMaterial = new THREE.ShaderMaterial({
      vertexShader: MASCOT_FLOOR_VERTEX_SHADER,
      fragmentShader: MASCOT_FLOOR_FRAGMENT_SHADER,
      uniforms: {
        uFloorColor: { value: floorColor.clone() },
        uBackdropColor: { value: backdropColor.clone() },
        uReflectBellyColor: { value: new THREE.Color('#DCEBF5') },
        uReflectAmberColor: { value: new THREE.Color('#FF9F1C') },
        uReflectRimColor: { value: new THREE.Color('#7FA8C4') },
        uCamPos: { value: new THREE.Vector3(0, 1.08, 4.25) },
        uSubjectPos: { value: new THREE.Vector3(0, 0.0, 0) },
        uSubjectYaw: { value: 0.14 },
        uHorizonZ: { value: horizonZ },
        uDirShadowMap: { value: dummyShadowTex },
        uDirShadowMatrix: { value: new THREE.Matrix4() },
        uShadowMapSize: { value: new THREE.Vector2(1024, 1024) },
        uShadowEnabled: { value: 0.0 },
      },
      depthWrite: true,
    });

    const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(24, 12, 1, 1), floorMaterial);
    floorMesh.name = 'MascotStageFloor';
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0.0, -0.55);
    floorMesh.receiveShadow = true;
    floorMesh.userData.isMascotFloor = true;
    floorMesh.userData.skipObjectOutline = true;
    scene.add(floorMesh);

    // 3. Balanced Studio Lighting Rig (Soft Key + Soft Front Fill + Ground-Bounce Hemi + Discreet Dual Rim)
    const hemiLight = new THREE.HemisphereLight(0xd4e9f7, 0x354c5e, 0.92);
    hemiLight.name = 'MascotHemiLight';
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf6faff, 1.24);
    keyLight.name = 'MascotKeyLight';
    keyLight.position.set(-2.1, 3.6, 4.1);
    if (config.enableShadows) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.radius = 3.2;
      keyLight.shadow.bias = -0.0004;
      keyLight.shadow.normalBias = 0.02;
      keyLight.shadow.camera.left = -1.8;
      keyLight.shadow.camera.right = 1.8;
      keyLight.shadow.camera.top = 2.5;
      keyLight.shadow.camera.bottom = -0.6;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 12.0;
      keyLight.shadow.camera.updateProjectionMatrix();
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdcecf8, 0.56);
    fillLight.name = 'MascotFillLight';
    fillLight.position.set(2.4, 1.9, 3.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x9ad0f0, 0.82);
    rimLight.name = 'MascotRimLight';
    rimLight.position.set(2.35, 2.25, -2.9);
    scene.add(rimLight);

    const backLeftRimLight = new THREE.DirectionalLight(0x88bede, 0.60);
    backLeftRimLight.name = 'MascotBackLeftRimLight';
    backLeftRimLight.position.set(-2.25, 2.1, -2.8);
    scene.add(backLeftRimLight);

    return {
      scene,
      backdropMesh,
      backdropMaterial,
      floorMesh,
      floorMaterial,
      hemiLight,
      keyLight,
      fillLight,
      rimLight,
      backLeftRimLight,
    };
  }
}
