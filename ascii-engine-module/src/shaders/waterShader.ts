import * as THREE from 'three';
import type { ThemePalette } from '../types';

/**
 * Custom GLSL shader & factory for the Cyberpunk Rain-Slicked Street & Reflective Neon Boulevard:
 * - Subdivision-ready vertex micro-swell (`48x48` reflective plane)
 * - Distance-adaptive normal & specular anti-aliasing (`hiFreqFade`) so dense ASCII grids
 *   never suffer from subpixel moiré
 * - Anisotropic wet-asphalt reflection streaks (`mirroredLight`) of urban neon billboards,
 *   streetlamps, central holo-gate, crosswalk markings, raindrop impact rings, and cursor spotlight!
 * - Zero dead/flat black zones: wet asphalt micro-sheen + neon puddle specular columns keep the
 *   entire street perspective alive and deeply layered.
 */

export const WATER_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    // Subtle wind-driven surface shimmer across puddles & wet street channels
    float swell = sin(worldPos.x * 1.15 + uTime * 1.85) * 0.016 +
                  cos(worldPos.z * 1.45 - uTime * 1.35) * 0.014;
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

  // 4 neon street/pylon light positions (xyz) + intensity (w)
  uniform vec4 uTorch0;
  uniform vec4 uTorch1;
  uniform vec4 uTorch2;
  uniform vec4 uTorch3;
  // Central holo-arch / focal light
  uniform vec4 uShrineLight;

  varying vec3 vWorldPos;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Procedural raindrop impact ripples on wet puddles
  float raindropRings(vec2 xz, float t) {
    vec2 cell = floor(xz * 1.65);
    vec2 local = fract(xz * 1.65) - 0.5;
    float seed = hash21(cell);
    float life = fract(t * (0.85 + seed * 0.65) + seed * 7.13);
    float radius = life * 0.46;
    float ring = exp(-pow((length(local) - radius) * 18.0, 2.0)) * (1.0 - life);
    return ring;
  }

  vec3 computeRippleNormal(vec2 p, float t, float camDist) {
    // Attenuate high-frequency ripples at distance to prevent subpixel aliasing in dense ASCII grids
    float hiFreqFade = clamp(1.0 - (camDist - 12.0) / 26.0, 0.22, 1.0);

    // Wind-driven diagonal street surface ripples + raindrop micro-rings
    float w1 = sin(p.x * 2.8 + t * 2.45 + sin(p.y * 1.45)) * 0.042;
    float w2 = cos(p.y * 3.4 - t * 2.10 + cos(p.x * 1.85)) * 0.038;
    float w3 = sin((p.x * 1.3 + p.y) * 5.2 + t * 3.2) * 0.024 * hiFreqFade;
    float drop = raindropRings(p, t) * 0.075 * hiFreqFade;

    float dx = w1 + w3 + drop;
    float dz = w2 - w3 + drop;
    return normalize(vec3(-dx * 2.25, 1.0, -dz * 1.65));
  }

  vec3 evalPointReflection(
    vec3 worldPos,
    vec3 normal,
    vec3 viewDir,
    vec3 lightPos,
    vec3 lightColor,
    float intensity
  ) {
    if (intensity <= 0.01) return vec3(0.0);

    // True planar mirror across the wet street plane y = worldPos.y
    vec3 mirroredLight = vec3(lightPos.x, 2.0 * worldPos.y - lightPos.y, lightPos.z);
    vec3 toMirrored = normalize(mirroredLight - worldPos);
    vec3 reflDir = reflect(-viewDir, normal);
    vec3 targetDir = normalize(vec3(toMirrored.x, abs(toMirrored.y) * 0.58, toMirrored.z));

    float specAlign = max(0.0, dot(reflDir, targetDir));
    float dx = abs(lightPos.x - worldPos.x);
    float dz = abs(lightPos.z - worldPos.z);

    // Elongated vertical neon reflection streaks on wet rain-slicked asphalt!
    float streakMask = exp(-dx * 0.58) * (1.0 / (1.0 + dz * 0.085));
    float dist = length(lightPos.xz - worldPos.xz);
    float attenuation = 1.0 / (1.0 + dist * dist * 0.085);

    float rippleBand = 0.72 + 0.28 * sin(worldPos.z * 6.4 - uTime * 4.2 + worldPos.x * 2.2);
    float specCore = pow(specAlign, 22.0) * 1.95;
    float specWide = pow(specAlign, 4.5) * 0.68;
    float wetColumn = streakMask * 0.42;

    return lightColor * ((specCore + specWide) * attenuation + wetColumn) * rippleBand * (intensity * 0.055);
  }

  void main() {
    vec3 viewVec = uCamPos - vWorldPos;
    float camDist = length(viewVec);
    vec3 viewDir = viewVec / max(camDist, 0.001);

    vec3 normal = computeRippleNormal(vWorldPos.xz, uTime, camDist);
    vec3 reflDir = reflect(-viewDir, normal);

    // Puddle mask: richer mirror puddles interwoven with textured damp asphalt grain
    float puddleWave = sin(vWorldPos.x * 0.75 + cos(vWorldPos.z * 0.55)) * 0.5 + 0.5;
    float puddleMask = smoothstep(0.22, 0.78, puddleWave);

    // Fresnel reflectance (grazing street angles reflect bright neon skyline)
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.6);
    fresnel = clamp(0.24 + fresnel * 0.76, 0.0, 1.0) * (0.68 + 0.32 * puddleMask);

    // Base wet asphalt + reflected nocturnal cyan/magenta skyline gradient
    vec3 skyReflect = mix(uDeepColor * 1.35, uShallowColor * 0.92, clamp(reflDir.y * 1.5 + 0.22, 0.0, 1.0));
    vec3 color = mix(uDeepColor * 0.85, skyReflect, fresnel);

    // Illuminated cybernetic lane lines & pedestrian crosswalk bars along central street (|x| < 4.6)
    float inRoad = step(abs(vWorldPos.x), 4.6);
    float centerDash = step(abs(vWorldPos.x), 0.09) * step(0.45, fract(vWorldPos.z * 0.45));
    float sideLine = step(abs(abs(vWorldPos.x) - 3.85), 0.08);
    // Glowing crosswalk stripes in foreground/midground (z around 4.4 and -0.6)
    float crossZ1 = step(abs(vWorldPos.z - 4.5), 0.58);
    float crossZ2 = step(abs(vWorldPos.z + 0.8), 0.52);
    float zebra = step(0.48, fract(vWorldPos.x * 1.35)) * max(crossZ1, crossZ2) * step(abs(vWorldPos.x), 3.6);

    color += uWarmCoreColor * centerDash * inRoad * 0.52;
    color += uShallowColor * sideLine * 0.48;
    color += mix(uShallowColor, vec3(0.95, 0.98, 1.0), 0.45) * zebra * 0.42;

    // Reflected flanking storefront neon strips along street canyon (x = +/- 5.4)
    float leftFacadeGlow = exp(-abs(vWorldPos.x + 4.2) * 0.62) * (0.55 + 0.45 * sin(vWorldPos.z * 1.4 + 0.8));
    float rightFacadeGlow = exp(-abs(vWorldPos.x - 4.2) * 0.62) * (0.55 + 0.45 * cos(vWorldPos.z * 1.3 - 0.5));
    color += uShallowColor * leftFacadeGlow * fresnel * 0.46;
    color += uWarmColor * rightFacadeGlow * fresnel * 0.48;

    // Sky halo / moon specular reflection down the center of the wet avenue
    float moonAlign = max(0.0, dot(reflDir, normalize(uMoonDir)));
    float moonGlint = pow(moonAlign, 30.0) * 1.35 + pow(moonAlign, 6.5) * 0.32;
    color += uShallowColor * moonGlint * 1.15;

    // Reflected Holo-Portal Core + 4 Street Neon Beacons/Signs
    color += evalPointReflection(vWorldPos, normal, viewDir, uShrineLight.xyz, uWarmCoreColor, uShrineLight.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch0.xyz, uShallowColor, uTorch0.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch1.xyz, uWarmColor, uTorch1.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch2.xyz, uShallowColor, uTorch2.w);
    color += evalPointReflection(vWorldPos, normal, viewDir, uTorch3.xyz, uWarmColor, uTorch3.w);

    // Interactive cursor/touch spotlight reflection on wet asphalt
    color += evalPointReflection(
      vWorldPos,
      normal,
      viewDir,
      uCursorPos,
      uCursorColor,
      uCursorIntensity
    );

    // Raindrop splash glints catching neon light across the foreground street
    float splash = raindropRings(vWorldPos.xz * 1.25, uTime * 1.15);
    color += mix(uShallowColor, uWarmColor, 0.45) * splash * 0.52 * clamp(1.2 - camDist / 22.0, 0.0, 1.0);

    // Distance perspective haze blending smoothly toward horizon glow
    float fogFactor = 1.0 - exp(-0.00042 * camDist * camDist);
    color = mix(color, uDeepColor * 0.45 + uWarmColor * 0.06, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(color, 0.95);
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
    0.30
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
      uTorch0: { value: new THREE.Vector4(-3.4, 2.2, 2.8, 18) },
      uTorch1: { value: new THREE.Vector4(3.4, 2.2, 2.8, 18) },
      uTorch2: { value: new THREE.Vector4(-3.8, 2.8, -3.6, 20) },
      uTorch3: { value: new THREE.Vector4(3.8, 2.8, -3.6, 20) },
      uShrineLight: { value: new THREE.Vector4(shrineLightPos.x, shrineLightPos.y, shrineLightPos.z, 48) },
    },
  });
}
