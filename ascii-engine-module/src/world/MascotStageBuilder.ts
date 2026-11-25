import * as THREE from 'three';
import type { EngineConfig } from '../types';

/**
 * Color-theory reference palette for `[ STACK // NEOFETCH ]`:
 * - Backdrop (`#13222E` / `rgb(19, 34, 46)`): dark desaturated slate/petrol blue with higher value
 *   than Tux's charcoal-black coat (`~#080C11`) and cool chromatic contrast against his amber beak.
 * - Floor (`#1D2B36` / `rgb(29, 43, 54)`): medium-low value, low-saturation blue-slate that separates
 *   cleanly from the backdrop wall and frames both dark and bright parts of Tux.
 */
export const MASCOT_BACKDROP_HEX = '#13222E';
export const MASCOT_FLOOR_HEX = '#1D2B36';

export interface BuiltMascotStage {
  scene: THREE.Scene;
  backdropMesh: THREE.Mesh;
  backdropMaterial: THREE.ShaderMaterial;
  floorMesh: THREE.Mesh;
  floorMaterial: THREE.ShaderMaterial;
  hemiLight: THREE.HemisphereLight;
  keyLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  backLeftRimLight: THREE.DirectionalLight;
}

const MASCOT_BACKDROP_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const MASCOT_BACKDROP_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec3 uBackdropColor;
  varying vec2 vUv;

  void main() {
    // Gentle, restrained studio falloff centered behind Tux so the backdrop stays calm and faithful to #13222E
    vec2 focusOffset = (vUv - vec2(0.5, 0.34)) * vec2(0.95, 1.15);
    float radial = clamp(1.0 - dot(focusOffset, focusOffset) * 0.22, 0.92, 1.04);
    float centerGlow = exp(-dot(focusOffset, focusOffset) * 3.2) * 0.05;
    vec3 col = uBackdropColor * (radial + centerGlow);
    gl_FragColor = vec4(col, 1.0);
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

    vec2 texel = 1.65 / max(uShadowMapSize, vec2(512.0));
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

    // 1. Base studio slate floor (#1D2B36) with gentle radial falloff so the plane stays balanced
    float radialDist = length(relXz * vec2(0.42, 0.52));
    float floorFalloff = clamp(1.03 - radialDist * 0.06, 0.90, 1.03);
    vec3 color = uFloorColor * floorFalloff;

    // 2. Soft grounding shadow under Tux (5-tap PCF key-light shadow + smooth contact AO under body & feet)
    float pcfLit = sampleSoftKeyShadow(vWorldPos);
    float bodyAoDist = length((relXz - vec2(0.10, -0.06)) / vec2(0.84, 0.68));
    float bodyContactAo = 1.0 - smoothstep(0.18, 1.12, bodyAoDist);

    float footLDist = length((localGround - vec2(-0.34, 0.42)) / vec2(0.28, 0.34));
    float footRDist = length((localGround - vec2( 0.34, 0.42)) / vec2(0.28, 0.34));
    float feetContactAo =
      (1.0 - smoothstep(0.15, 1.05, footLDist)) * 0.55 +
      (1.0 - smoothstep(0.15, 1.05, footRDist)) * 0.55;

    float combinedOcclusion = clamp(
      max(bodyContactAo * 0.30 + feetContactAo * 0.16, (1.0 - pcfLit) * 0.28),
      0.0,
      0.34
    );
    color *= (1.0 - combinedOcclusion);

    // 3. Subtle, diffused planar reflection of Tux synchronized with continuous horizontal yaw
    vec3 viewInc = normalize(vWorldPos - uCamPos);
    vec3 reflDir = reflect(viewInc, vec3(0.0, 1.0, 0.0));
    float rHoriz2 = max(dot(reflDir.xz, reflDir.xz), 0.0001);
    float tHit = -dot(relXz, reflDir.xz) / rHoriz2;

    if (tHit > 0.0 && reflDir.y > 0.01) {
      vec3 q = vWorldPos + reflDir * tHit;
      float qy = q.y - uSubjectPos.y;

      if (qy > -0.05 && qy < 2.15) {
        vec2 qRel = q.xz - uSubjectPos.xz;
        vec2 qLocal = vec2(
          qRel.x * cosY - qRel.y * sinY,
          qRel.x * sinY + qRel.y * cosY
        );

        // Matte-satin roughness blur cone widens smoothly with height above the floor
        float blur = 0.14 + max(qy, 0.0) * 0.26;
        float heightFade = exp(-max(qy, 0.0) * 1.18);
        float floorProxFade = exp(-length(relXz) * 0.48);
        float reflEnvelope = heightFade * floorProxFade;

        // Dark charcoal dorsal coat silhouette reflection (subtle darkening + cool rim edge)
        vec2 coatEllip = vec2(qLocal.x / (0.72 + blur), (qy - 0.88) / (0.98 + blur));
        float coatMask = (1.0 - smoothstep(0.55, 1.08, length(coatEllip))) * reflEnvelope;
        float coatRim = smoothstep(0.52, 0.92, length(coatEllip)) * coatMask;
        color *= (1.0 - coatMask * 0.10);
        color += uReflectRimColor * (coatRim * 0.07);

        // Snow-white belly reflection (visible when Tux's front +Z faces the reflected ray)
        float frontFacing = smoothstep(-0.15, 0.65, cos(uSubjectYaw));
        vec2 bellyEllip = vec2(qLocal.x / (0.50 + blur), (qy - 0.76) / (0.82 + blur));
        float bellyMask = (1.0 - smoothstep(0.42, 1.02, length(bellyEllip))) * frontFacing * reflEnvelope;
        color += uReflectBellyColor * (bellyMask * 0.13);

        // Warm amber webbed feet & beak reflection near the floor plane
        vec2 footLRefl = vec2((qLocal.x + 0.34) / (0.25 + blur * 0.65), (qy - 0.10) / (0.20 + blur * 0.65));
        vec2 footRRefl = vec2((qLocal.x - 0.34) / (0.25 + blur * 0.65), (qy - 0.10) / (0.20 + blur * 0.65));
        float footVisL = smoothstep(-0.35, 0.55, qLocal.y + 0.32);
        float feetReflMask = (
          (1.0 - smoothstep(0.35, 1.05, length(footLRefl))) +
          (1.0 - smoothstep(0.35, 1.05, length(footRRefl)))
        ) * footVisL * reflEnvelope;
        color += uReflectAmberColor * (clamp(feetReflMask, 0.0, 1.15) * 0.12);
      }
    }

    // Restrained grazing-angle studio sheen so floor feels dimensional without mirror glare
    float ndotv = clamp(dot(-viewInc, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 4.0);
    color += uReflectRimColor * (fresnel * 0.035);

    // Clean, tight anti-aliased horizon seam right where the floor meets the #13222E backdrop wall
    float horizonBlend = smoothstep(uHorizonZ + 0.16, uHorizonZ - 0.02, vWorldPos.z);
    color = mix(color, uBackdropColor * 0.96, horizonBlend);

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
 * MascotStageBuilder: Builds the minimalist, color-theory-calibrated 3D showcase stage
 * around Tux for `[ STACK // NEOFETCH ]`:
 * 1. Continuous backdrop plane (`#13222E` / `rgb(19, 34, 46)`)
 * 2. Horizontal ground floor plane (`#1D2B36` / `rgb(29, 43, 54)`)
 * 3. Balanced studio lighting (soft main key light + hemisphere fill + discreet rim lights)
 * 4. Soft PCF + contact shadow & diffused yaw-synced floor reflection (zero extra props or clutter)
 */
export class MascotStageBuilder {
  public static build(config: EngineConfig): BuiltMascotStage {
    const backdropColor = new THREE.Color(MASCOT_BACKDROP_HEX);
    const floorColor = new THREE.Color(MASCOT_FLOOR_HEX);

    const scene = new THREE.Scene();
    scene.background = backdropColor.clone();

    const horizonZ = -3.35;

    // 1. Minimalist Continuous Backdrop Plane (#13222E)
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

    // 2. Minimalist Horizontal Floor Plane (#1D2B36) with Soft Shadow & Controlled Reflection
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

    // 3. Balanced Studio Lighting Rig (Soft Key + Cool-Slate Hemi Fill + Discreet Dual Rim)
    const hemiLight = new THREE.HemisphereLight(0xbfd9ec, 0x16232e, 0.72);
    hemiLight.name = 'MascotHemiLight';
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf5f9fc, 1.42);
    keyLight.name = 'MascotKeyLight';
    keyLight.position.set(-2.35, 3.85, 3.65);
    if (config.enableShadows) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.radius = 3.0;
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

    // Discreet rear-right & rear-left rim lights separating Tux's dark dorsal coat from #13222E across 360 deg spin
    const rimLight = new THREE.DirectionalLight(0x9ad0f0, 0.92);
    rimLight.name = 'MascotRimLight';
    rimLight.position.set(2.35, 2.3, -2.85);
    scene.add(rimLight);

    const backLeftRimLight = new THREE.DirectionalLight(0x84b9dc, 0.58);
    backLeftRimLight.name = 'MascotBackLeftRimLight';
    backLeftRimLight.position.set(-2.25, 2.1, -2.75);
    scene.add(backLeftRimLight);

    return {
      scene,
      backdropMesh,
      backdropMaterial,
      floorMesh,
      floorMaterial,
      hemiLight,
      keyLight,
      rimLight,
      backLeftRimLight,
    };
  }
}
