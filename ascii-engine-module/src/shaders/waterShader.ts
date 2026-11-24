import * as THREE from 'three';
import type { ThemePalette } from '../types';

/**
 * Custom GLSL shader & factory for the Sanctuary Water Lake surface:
 * - Animated multi-wave ripple normal perturbation
 * - Planar reflection approximation of the moon, sky gradient, flickering torch pillars,
 *   central rune crystal, and interactive cursor spirit lantern
 * - Fresnel sky/shadow blending + crisp specular glints that quantize into shimmering '=', '+', '*', '#' ASCII glyphs!
 */

export const WATER_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    // Gentle surface swell
    float swell = sin(worldPos.x * 0.9 + uTime * 1.45) * 0.025 +
                  cos(worldPos.z * 1.15 - uTime * 1.1) * 0.025;
    worldPos.y += swell;
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const WATER_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3 uCamPos;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uWarmColor;
  uniform vec3 uWarmCoreColor;
  uniform vec3 uCursorColor;
  uniform vec3 uCursorPos;
  uniform float uCursorIntensity;
  uniform vec3 uMoonDir;

  // 4 torch positions (xyz) + intensity (w)
  uniform vec4 uTorch0;
  uniform vec4 uTorch1;
  uniform vec4 uTorch2;
  uniform vec4 uTorch3;
  // Central shrine crystal light
  uniform vec4 uShrineLight;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  vec3 computeRippleNormal(vec2 p, float t) {
    float w1 = sin(p.x * 2.6 + t * 2.1 + sin(p.y * 1.4)) * 0.055;
    float w2 = cos(p.y * 3.3 - t * 1.85 + cos(p.x * 1.8)) * 0.05;
    float w3 = sin((p.x + p.y) * 4.7 + t * 2.8) * 0.028;
    float w4 = cos((p.x - p.y * 1.3) * 6.2 - t * 3.2) * 0.018;

    float dx = w1 + w3 + w4;
    float dz = w2 + w3 - w4;
    return normalize(vec3(-dx * 2.4, 1.0, -dz * 2.4));
  }

  vec3 evalPointReflection(
    vec3 worldPos,
    vec3 normal,
    vec3 viewDir,
    vec3 lightPos,
    vec3 lightColor,
    float intensity
  ) {
    vec3 toMirrored = normalize(lightPos - worldPos);
    vec3 reflDir = reflect(-viewDir, normal);

    // Specular column trail stretched across ripples toward camera
    float specAlign = max(0.0, dot(reflDir, toMirrored));
    float dist = length(lightPos.xz - worldPos.xz);
    float attenuation = 1.0 / (1.0 + dist * dist * 0.14);

    // Shimmering horizontal bands characteristic of torchlight on dark RPG water
    float rippleBand = 0.65 + 0.35 * sin(dist * 5.5 - uTime * 3.8 + worldPos.x * 2.1);
    float specCore = pow(specAlign, 26.0) * 1.65;
    float specWide = pow(specAlign, 5.5) * 0.48;

    return lightColor * (specCore + specWide) * attenuation * rippleBand * (intensity * 0.055);
  }

  void main() {
    vec3 viewVec = uCamPos - vWorldPos;
    float camDist = length(viewVec);
    vec3 viewDir = viewVec / max(camDist, 0.001);

    vec3 normal = computeRippleNormal(vWorldPos.xz, uTime);
    vec3 reflDir = reflect(-viewDir, normal);

    // Fresnel reflectance (grazing angles reflect more nocturnal sky & torchlight)
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.2);
    fresnel = clamp(0.16 + fresnel * 0.84, 0.0, 1.0);

    // Base water body + reflected nocturnal sky gradient
    vec3 skyReflect = mix(uDeepColor, uShallowColor * 0.85, clamp(reflDir.y * 1.4, 0.0, 1.0));
    vec3 color = mix(uDeepColor * 0.55, skyReflect, fresnel);

    // Moon specular reflection trail across the water
    float moonAlign = max(0.0, dot(reflDir, normalize(uMoonDir)));
    float moonGlint = pow(moonAlign, 42.0) * 1.35 + pow(moonAlign, 8.0) * 0.25;
    color += uShallowColor * moonGlint * 1.25;

    // Reflected shrine crystal + 4 flickering braziers/lanterns
    color += evalPointReflection(vWorldPos, normal, viewDir, uShrineLight.xyz, uWarmCoreColor, uShrineLight.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch0.xyz, uWarmColor, uTorch0.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch1.xyz, uWarmColor, uTorch1.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch2.xyz, uWarmColor, uTorch2.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch3.xyz, uWarmColor, uTorch3.w);

    // Interactive cursor lantern reflection on water
    color += evalPointReflection(
      vWorldPos,
      normal,
      viewDir,
      uCursorPos,
      uCursorColor,
      uCursorIntensity
    );

    // Subtle shoreline foam / ripple ring around sanctuary island (center at 0, -1.8)
    float islandDist = length(vWorldPos.xz - vec2(0.0, -1.8));
    float shoreWave = sin(islandDist * 4.2 - uTime * 2.2) * 0.5 + 0.5;
    float shoreMask = exp(-pow((islandDist - 5.2) / 0.65, 2.0));
    color += uShallowColor * shoreMask * shoreWave * 0.28;

    // Distance fog blend so far water merges seamlessly into #050508 horizon
    float fogFactor = 1.0 - exp(-0.00048 * camDist * camDist);
    color = mix(color, uDeepColor * 0.25, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(color, 0.94);
  }
`;

export function createSanctuaryWaterMaterial(options: {
  palette: ThemePalette;
  shrineLightPos: THREE.Vector3;
  moonDir: THREE.Vector3;
}): THREE.ShaderMaterial {
  const { palette, shrineLightPos, moonDir } = options;

  const deepWater = new THREE.Color(palette.background).lerp(
    new THREE.Color(palette.coolAmbient),
    0.26
  );
  const shallowWater = new THREE.Color(palette.coolAmbient).lerp(
    new THREE.Color('#8be4ff'),
    0.32
  );

  return new THREE.ShaderMaterial({
    vertexShader: WATER_VERTEX_SHADER,
    fragmentShader: WATER_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: true,
    uniforms: {
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3(0, 5.2, 13.6) },
      uDeepColor: { value: deepWater },
      uShallowColor: { value: shallowWater },
      uWarmColor: { value: new THREE.Color(palette.warmLight) },
      uWarmCoreColor: { value: new THREE.Color(palette.warmCore) },
      uCursorColor: { value: new THREE.Color(palette.cursorLight) },
      uCursorPos: { value: new THREE.Vector3(0, 2.2, 3.2) },
      uCursorIntensity: { value: 12 },
      uMoonDir: { value: moonDir.clone().normalize() },
      uTorch0: { value: new THREE.Vector4(-2.05, 1.5, 1.65, 14) },
      uTorch1: { value: new THREE.Vector4(2.05, 1.5, 1.65, 14) },
      uTorch2: { value: new THREE.Vector4(-2.5, 1.2, -1.8, 10) },
      uTorch3: { value: new THREE.Vector4(2.5, 1.2, -1.8, 10) },
      uShrineLight: { value: new THREE.Vector4(shrineLightPos.x, shrineLightPos.y, shrineLightPos.z, 42) },
    },
  });
}
