import * as THREE from 'three';
import type { AtmosphereMode, ThemePalette } from '../types';

/**
 * Custom GLSL shader & factory for the Unified Cyberpunk Boulevard Surface:
 * - Adapts cohesively across all three atmospheric states:
 *    * 'day' ("Dia"): Sunlit dry urban asphalt with crisp painted lane/crosswalk markings and
 *      high-contrast real-time PCF solar shadows cast by buildings, poles, overpass & Netrunner.
 *    * 'night' ("Noite"): Nocturnal avenue with selective damp sheen, crisp moonlight shadows,
 *      neon reflections, and zero raindrop ripples.
 *    * 'rain' ("Com chuva"): Storm-flooded mirror-wet boulevard with raindrop impact rings,
 *      wind-driven ripples, elongated neon reflection columns, and storm-diffused shadows.
 * - Real-time 5-tap PCF directional shadow sampling (unpacking Three.js RGBADepthPacking)
 *   plus contact ambient-occlusion grounding beneath the foreground protagonist.
 */

let sharedWhiteShadowPlaceholder: THREE.DataTexture | null = null;

function getDefaultShadowPlaceholder(): THREE.DataTexture {
  if (!sharedWhiteShadowPlaceholder) {
    const data = new Uint8Array([255, 255, 255, 255]);
    const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    sharedWhiteShadowPlaceholder = tex;
  }
  return sharedWhiteShadowPlaceholder;
}

export const WATER_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uWetness;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    // Surface micro-swell scales with wetness (flat solid asphalt in Day, shimmering puddles in Rain)
    float swell = (sin(worldPos.x * 1.15 + uTime * 1.85) * 0.015 +
                   cos(worldPos.z * 1.45 - uTime * 1.35) * 0.013) * uWetness;
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

  // Atmosphere & real-time directional shadow uniforms
  uniform float uWetness;
  uniform float uRainIntensity;
  uniform float uDaylight;
  uniform sampler2D uDirShadowMap;
  uniform mat4 uDirShadowMatrix;
  uniform vec2 uShadowMapSize;
  uniform float uShadowEnabled;
  uniform float uShadowStrength;
  uniform vec3 uAvatarPos;

  // 4 neon street/pylon light positions (xyz) + intensity (w)
  uniform vec4 uTorch0;
  uniform vec4 uTorch1;
  uniform vec4 uTorch2;
  uniform vec4 uTorch3;
  // Central holo-arch / focal light
  uniform vec4 uShrineLight;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  // Exact Three.js RGBADepthPacking constants for DirectionalLight shadow map unpacking
  const float UnpackDownscale = 255.0 / 256.0;
  const vec4 PackFactors = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
  const vec4 UnpackFactors4 = vec4(UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a);

  float unpackRGBAToDepth(const in vec4 v) {
    return dot(v, UnpackFactors4);
  }

  float sampleDirectionalShadow(vec3 worldPos) {
    if (uShadowEnabled < 0.5) return 1.0;

    vec4 shadowCoord = uDirShadowMatrix * vec4(worldPos, 1.0);
    shadowCoord.xyz /= max(shadowCoord.w, 0.0001);
    shadowCoord.z -= 0.00055;

    if (
      shadowCoord.x <= 0.002 || shadowCoord.x >= 0.998 ||
      shadowCoord.y <= 0.002 || shadowCoord.y >= 0.998 ||
      shadowCoord.z >= 1.0 || shadowCoord.z <= 0.0
    ) {
      return 1.0;
    }

    vec2 texel = 1.35 / max(uShadowMapSize, vec2(512.0));
    float s0 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy)));
    float s1 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2( texel.x,  texel.y * 0.5))));
    float s2 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2(-texel.x, -texel.y * 0.5))));
    float s3 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2(-texel.x * 0.5,  texel.y))));
    float s4 = step(shadowCoord.z, unpackRGBAToDepth(texture2D(uDirShadowMap, shadowCoord.xy + vec2( texel.x * 0.5, -texel.y))));

    float rawVis = s0 * 0.28 + (s1 + s2 + s3 + s4) * 0.18;
    return mix(1.0, rawVis, uShadowStrength);
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Procedural raindrop impact ripples on wet puddles (active ONLY in 'rain' mode)
  float raindropRings(vec2 xz, float t) {
    if (uRainIntensity <= 0.01) return 0.0;
    vec2 cell = floor(xz * 1.65);
    vec2 local = fract(xz * 1.65) - 0.5;
    float seed = hash21(cell);
    float life = fract(t * (0.85 + seed * 0.65) + seed * 7.13);
    float radius = life * 0.46;
    float ring = exp(-pow((length(local) - radius) * 18.0, 2.0)) * (1.0 - life);
    return ring * uRainIntensity;
  }

  vec3 computeRippleNormal(vec2 p, float t, float camDist) {
    // Attenuate high-frequency ripples at distance to prevent subpixel aliasing in dense ASCII grids
    float hiFreqFade = clamp(1.0 - (camDist - 12.0) / 26.0, 0.22, 1.0);
    float rippleAmp = 0.12 + 0.88 * uWetness;

    float w1 = sin(p.x * 2.8 + t * 2.45 + sin(p.y * 1.45)) * 0.040 * rippleAmp;
    float w2 = cos(p.y * 3.4 - t * 2.10 + cos(p.x * 1.85)) * 0.036 * rippleAmp;
    float w3 = sin((p.x * 1.3 + p.y) * 5.2 + t * 3.2) * 0.022 * hiFreqFade * rippleAmp;
    float drop = raindropRings(p, t) * 0.08 * hiFreqFade;

    float dx = w1 + w3 + drop;
    float dz = w2 - w3 + drop;
    return normalize(vec3(-dx * 2.2, 1.0, -dz * 1.6));
  }

  vec3 evalPointReflection(
    vec3 worldPos,
    vec3 normal,
    vec3 viewDir,
    vec3 lightPos,
    vec3 lightColor,
    float intensity,
    float mirrorGain
  ) {
    if (intensity <= 0.01 || mirrorGain <= 0.01) return vec3(0.0);

    vec3 mirroredLight = vec3(lightPos.x, 2.0 * worldPos.y - lightPos.y, lightPos.z);
    vec3 toMirrored = normalize(mirroredLight - worldPos);
    vec3 reflDir = reflect(-viewDir, normal);
    vec3 targetDir = normalize(vec3(toMirrored.x, abs(toMirrored.y) * 0.58, toMirrored.z));

    float specAlign = max(0.0, dot(reflDir, targetDir));
    float dx = abs(lightPos.x - worldPos.x);
    float dz = abs(lightPos.z - worldPos.z);

    float streakMask = exp(-dx * 0.58) * (1.0 / (1.0 + dz * 0.085));
    float dist = length(lightPos.xz - worldPos.xz);
    float attenuation = 1.0 / (1.0 + dist * dist * 0.085);

    float rippleBand = 0.78 + 0.22 * uWetness * sin(worldPos.z * 6.4 - uTime * 4.2 + worldPos.x * 2.2);
    float specCore = pow(specAlign, 22.0) * 1.9;
    float specWide = pow(specAlign, 4.5) * 0.65;
    float wetColumn = streakMask * 0.42 * uWetness;

    return lightColor * ((specCore + specWide) * attenuation + wetColumn) * rippleBand * (intensity * 0.055 * mirrorGain);
  }

  void main() {
    vec3 viewVec = uCamPos - vWorldPos;
    float camDist = length(viewVec);
    vec3 viewDir = viewVec / max(camDist, 0.001);

    vec3 normal = computeRippleNormal(vWorldPos.xz, uTime, camDist);
    vec3 reflDir = reflect(-viewDir, normal);

    // Real-time PCF directional shadow + soft contact AO beneath foreground protagonist
    float dirShadow = sampleDirectionalShadow(vWorldPos);
    float avatarDist = length(vWorldPos.xz - uAvatarPos.xz);
    float contactAo = 1.0 - 0.36 * exp(-avatarDist * avatarDist * 2.4) * uShadowEnabled;
    float shadowMask = clamp(dirShadow * contactAo, 0.18, 1.0);

    // Puddle distribution & Fresnel mirror strength governed by uWetness
    float puddleWave = sin(vWorldPos.x * 0.75 + cos(vWorldPos.z * 0.55)) * 0.5 + 0.5;
    float puddleMask = smoothstep(0.24, 0.78, puddleWave);
    float effectiveMirror = clamp(uWetness * (0.55 + 0.45 * puddleMask), 0.06, 1.0);

    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.6);
    fresnel = clamp(0.18 + fresnel * 0.82, 0.0, 1.0) * effectiveMirror;

    // Base asphalt surface: sunlit textured concrete-asphalt in Day vs deep reflective asphalt in Night/Rain
    float grain = (hash21(floor(vWorldPos.xz * 6.0)) - 0.5) * 0.04;
    vec3 dayAsphaltLit = vec3(0.34, 0.42, 0.52) + grain;
    vec3 dayAsphaltShadow = vec3(0.10, 0.15, 0.23) + grain * 0.5;
    vec3 dayBase = mix(dayAsphaltShadow, dayAsphaltLit, shadowMask);

    vec3 skyReflect = mix(uDeepColor * 1.30, uShallowColor * 0.90, clamp(reflDir.y * 1.5 + 0.22, 0.0, 1.0));
    vec3 nightBase = mix(uDeepColor * 0.88, skyReflect, fresnel) * mix(0.46, 1.0, shadowMask);

    vec3 color = mix(nightBase, dayBase, uDaylight);

    // Painted & illuminated cybernetic lane lines & pedestrian crosswalk bars along central street (|x| < 4.6)
    float inRoad = step(abs(vWorldPos.x), 4.6);
    float centerDash = step(abs(vWorldPos.x), 0.09) * step(0.45, fract(vWorldPos.z * 0.45));
    float sideLine = step(abs(abs(vWorldPos.x) - 3.85), 0.08);
    float crossZ1 = step(abs(vWorldPos.z - 4.5), 0.58);
    float crossZ2 = step(abs(vWorldPos.z + 0.8), 0.52);
    float zebra = step(0.48, fract(vWorldPos.x * 1.35)) * max(crossZ1, crossZ2) * step(abs(vWorldPos.x), 3.6);

    float paintShadowScale = mix(1.0, 0.45 + 0.55 * shadowMask, uDaylight);
    color += uWarmCoreColor * centerDash * inRoad * 0.50 * paintShadowScale;
    color += uShallowColor * sideLine * 0.44 * paintShadowScale;
    color += mix(uShallowColor, vec3(0.95, 0.98, 1.0), 0.52) * zebra * 0.44 * paintShadowScale;

    // Reflected flanking storefront neon strips (strong in Rain, subtle in Night, minimal in Day)
    float neonMirrorGain = mix(0.22 + 0.78 * uWetness, 0.12, uDaylight);
    float leftFacadeGlow = exp(-abs(vWorldPos.x + 4.2) * 0.62) * (0.55 + 0.45 * sin(vWorldPos.z * 1.4 + 0.8));
    float rightFacadeGlow = exp(-abs(vWorldPos.x - 4.2) * 0.62) * (0.55 + 0.45 * cos(vWorldPos.z * 1.3 - 0.5));
    color += uShallowColor * leftFacadeGlow * fresnel * 0.48 * neonMirrorGain;
    color += uWarmColor * rightFacadeGlow * fresnel * 0.48 * neonMirrorGain;

    // Sun / Moon specular glint along street perspective (attenuated inside cast shadows!)
    float moonAlign = max(0.0, dot(reflDir, normalize(uMoonDir)));
    float moonGlint = (pow(moonAlign, 28.0) * 1.3 + pow(moonAlign, 6.5) * 0.30) * shadowMask;
    vec3 skySpecTint = mix(uShallowColor, uWarmCoreColor, uDaylight * 0.75);
    color += skySpecTint * moonGlint * mix(0.35 + 0.85 * uWetness, 0.42, uDaylight);

    // Reflected Holo-Portal Core + 4 Street Neon Beacons/Signs
    color += evalPointReflection(vWorldPos, normal, viewDir, uShrineLight.xyz, uWarmCoreColor, uShrineLight.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch0.xyz, uShallowColor, uTorch0.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch1.xyz, uWarmColor, uTorch1.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch2.xyz, uShallowColor, uTorch2.w, neonMirrorGain);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch3.xyz, uWarmColor, uTorch3.w, neonMirrorGain);

    // Interactive cursor/touch spotlight reflection
    color += evalPointReflection(
      vWorldPos,
      normal,
      viewDir,
      uCursorPos,
      uCursorColor,
      uCursorIntensity,
      mix(0.35 + 0.65 * uWetness, 0.25, uDaylight)
    );

    // Raindrop splash glints (active ONLY when uRainIntensity > 0)
    if (uRainIntensity > 0.01) {
      float splash = raindropRings(vWorldPos.xz * 1.25, uTime * 1.15);
      color += mix(uShallowColor, uWarmColor, 0.45) * splash * 0.56 * clamp(1.2 - camDist / 22.0, 0.0, 1.0);
    }

    // Distance perspective haze blending smoothly toward horizon
    float fogRate = mix(0.00038 + uRainIntensity * 0.00022, 0.00018, uDaylight);
    float fogFactor = 1.0 - exp(-fogRate * camDist * camDist);
    vec3 horizonTint = mix(uDeepColor * 0.48 + uWarmColor * 0.05, vec3(0.20, 0.34, 0.50), uDaylight);
    color = mix(color, horizonTint, clamp(fogFactor, 0.0, 1.0));

    float surfaceAlpha = mix(0.76 + 0.20 * effectiveMirror, 0.88, uDaylight);
    gl_FragColor = vec4(color, surfaceAlpha);
  }
`;

export function atmosphereWaterParams(atmosphere: AtmosphereMode): {
  wetness: number;
  rainIntensity: number;
  daylight: number;
  shadowStrength: number;
} {
  switch (atmosphere) {
    case 'day':
      return { wetness: 0.12, rainIntensity: 0.0, daylight: 1.0, shadowStrength: 0.68 };
    case 'rain':
      return { wetness: 0.96, rainIntensity: 1.0, daylight: 0.0, shadowStrength: 0.45 };
    case 'night':
    default:
      return { wetness: 0.36, rainIntensity: 0.0, daylight: 0.0, shadowStrength: 0.55 };
  }
}

export function createSanctuaryWaterMaterial(options: {
  palette: ThemePalette;
  shrineLightPos: THREE.Vector3;
  moonDir: THREE.Vector3;
  atmosphere?: AtmosphereMode;
  enableShadows?: boolean;
}): THREE.ShaderMaterial {
  const { palette, shrineLightPos, moonDir } = options;
  const atm = atmosphereWaterParams(options.atmosphere ?? 'night');

  const deepWater = new THREE.Color(palette.background).lerp(
    new THREE.Color(palette.coolAmbient),
    0.28
  );
  const shallowWater = new THREE.Color(palette.coolAmbient).lerp(
    new THREE.Color('#96F2FF'),
    0.36
  );

  return new THREE.ShaderMaterial({
    vertexShader: WATER_VERTEX_SHADER,
    fragmentShader: WATER_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: true,
    uniforms: {
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3(0, 3.8, 12.6) },
      uDeepColor: { value: deepWater },
      uShallowColor: { value: shallowWater },
      uWarmColor: { value: new THREE.Color(palette.warmLight) },
      uWarmCoreColor: { value: new THREE.Color(palette.warmCore) },
      uCursorColor: { value: new THREE.Color(palette.cursorLight) },
      uCursorPos: { value: new THREE.Vector3(0, 2.2, 3.2) },
      uCursorIntensity: { value: 14 },
      uMoonDir: { value: moonDir.clone().normalize() },
      uWetness: { value: atm.wetness },
      uRainIntensity: { value: atm.rainIntensity },
      uDaylight: { value: atm.daylight },
      uDirShadowMap: { value: getDefaultShadowPlaceholder() },
      uDirShadowMatrix: { value: new THREE.Matrix4() },
      uShadowMapSize: { value: new THREE.Vector2(1536, 1536) },
      uShadowEnabled: { value: options.enableShadows === false ? 0.0 : 1.0 },
      uShadowStrength: { value: atm.shadowStrength },
      uAvatarPos: { value: new THREE.Vector3(0, 0.04, 4.15) },
      uTorch0: { value: new THREE.Vector4(-3.4, 2.2, 2.8, 18) },
      uTorch1: { value: new THREE.Vector4(3.4, 2.2, 2.8, 18) },
      uTorch2: { value: new THREE.Vector4(-3.8, 2.8, -3.6, 20) },
      uTorch3: { value: new THREE.Vector4(3.8, 2.8, -3.6, 20) },
      uShrineLight: { value: new THREE.Vector4(shrineLightPos.x, shrineLightPos.y, shrineLightPos.z, 48) },
    },
  });
}
