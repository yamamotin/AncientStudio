/**
 * Modern Full-Screen 3D-Wrapping ASCII Post-Processing Shader Pipeline (`asciiShader.ts`):
 * - Multi-tap sub-cell supersampling (`sampleCellIntegrated`) prevents subpixel aliasing across
 *   architectural textures, vehicle bodywork, foliage, and character geometry.
 * - Dark-breathing value hierarchy (`shadowToe` + empty-space ramp floor) keeps shadowed roads,
 *   unlit roofs, and night air quiet instead of filling the screen with uniform noisy text.
 * - Grounded 3D tonal underlayer (`smoothBackdrop`) + depth silhouette separation (`silhouetteMoat`)
 *   preserves unmistakable silhouettes for `Player_Rig`, `Carro_Grupo`, and street structures
 *   underneath crisp ASCII typography.
 * - Coherent spatial cluster variety (`glyphVarietyHash`) diversifies active lit surfaces into
 *   natural groupings (`o`, `u`, `s`, `a`, `c`, `$`, `8`, `Q`, `=`, `-`, `~`, `^`, `*`) without
 *   1-cell salt-and-pepper static.
 * - Vertical rippled ground/asphalt/water reflection pass (`sampleGroundReflection`) + contained
 *   typographic light halos (solid full-fill block tier is never emitted).
 */

export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const BLOOM_EXTRACT_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D tScene;
  uniform vec2 uTexelSize;
  uniform float uThreshold;

  varying vec2 vUv;

  float luma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  void main() {
    // 13-tap dual-ring Kawase downsample for smooth, contained typographic light halos
    vec3 acc = texture2D(tScene, vUv).rgb * 0.22;

    vec2 r1 = uTexelSize * 1.25;
    acc += texture2D(tScene, clamp(vUv + vec2( r1.x,  r1.y), 0.001, 0.999)).rgb * 0.105;
    acc += texture2D(tScene, clamp(vUv + vec2(-r1.x,  r1.y), 0.001, 0.999)).rgb * 0.105;
    acc += texture2D(tScene, clamp(vUv + vec2( r1.x, -r1.y), 0.001, 0.999)).rgb * 0.105;
    acc += texture2D(tScene, clamp(vUv + vec2(-r1.x, -r1.y), 0.001, 0.999)).rgb * 0.105;

    vec2 r2 = uTexelSize * 2.65;
    acc += texture2D(tScene, clamp(vUv + vec2( r2.x,  0.0 ), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2(-r2.x,  0.0 ), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2( 0.0,   r2.y), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2( 0.0,  -r2.y), 0.001, 0.999)).rgb * 0.055;

    vec2 r3 = uTexelSize * 4.10;
    acc += texture2D(tScene, clamp(vUv + vec2( r3.x,  r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2(-r3.x,  r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2( r3.x, -r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2(-r3.x, -r3.y), 0.001, 0.999)).rgb * 0.035;

    float lum = luma(acc);
    float knee = 0.22;
    float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee + 0.0001);
    float contrib = max(soft, lum - uThreshold) / max(lum, 0.0001);

    // Cap peak bloom radiance so lamp/headlight halos lift nearby glyphs without solid whitewash
    vec3 extracted = min(acc * clamp(contrib, 0.0, 1.25), vec3(1.05));
    gl_FragColor = vec4(extracted, 1.0);
  }
`;

export const ASCII_COMPOSITE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform sampler2D tGlyphAtlas;

  uniform vec2 uResolution;
  uniform vec2 uCellPixelSize;
  uniform vec2 uAtlasTileSize;
  uniform float uSubCellSpread;
  uniform float uRampCount;
  uniform float uStructCount;
  uniform float uBlockCount;
  uniform float uTotalGlyphs;
  uniform float uEdgeStrength;
  uniform float uBlockBlendWeight;
  uniform float uBloomIntensity;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uDaylight;
  uniform float uWetness;
  uniform float uCamPitchCos;
  uniform float uCamPitchSin;
  uniform float uCameraNear;
  uniform float uCameraFar;
  uniform float uVolumeWrapStrength;
  uniform vec3 uBgColor;
  uniform vec3 uCoolTint;
  uniform vec3 uWarmTint;
  uniform float uTime;

  varying vec2 vUv;

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  /**
   * Deterministic flicker-free 2D spatial hash in [-0.5 .. +0.5] anchored to cell clusters.
   */
  float glyphVarietyHash(vec2 cellCoord) {
    vec2 p = fract(cellCoord * vec2(0.3183099, 0.3678794)) + 0.07;
    p += dot(p, p.yx + 19.19);
    return fract((p.x + p.y) * p.x) - 0.5;
  }

  /**
   * Converts non-linear [0..1] DepthTexture sample into normalized linear view-space depth [0..1].
   */
  float linearizeDepth(float rawDepth) {
    float nearP = max(0.05, uCameraNear);
    float farP = max(nearP + 1.0, uCameraFar);
    float zNdc = rawDepth * 2.0 - 1.0;
    float viewZ = (2.0 * nearP * farP) / max(farP + nearP - zNdc * (farP - nearP), 0.0001);
    return clamp((viewZ - nearP) / (farP - nearP), 0.0, 1.0);
  }

  /**
   * 5-tap sub-cell area integration (center + 4 rotated-grid sub-cell offsets).
   */
  vec3 sampleCellIntegrated(vec2 centerUv, vec2 cellUvSpan) {
    vec2 o1 = vec2( uSubCellSpread,  uSubCellSpread * 0.5) * cellUvSpan;
    vec2 o2 = vec2(-uSubCellSpread * 0.5,  uSubCellSpread) * cellUvSpan;

    vec3 c0 = texture2D(tScene, centerUv).rgb * 0.42;
    vec3 c1 = texture2D(tScene, clamp(centerUv + o1, 0.001, 0.999)).rgb * 0.145;
    vec3 c2 = texture2D(tScene, clamp(centerUv - o1, 0.001, 0.999)).rgb * 0.145;
    vec3 c3 = texture2D(tScene, clamp(centerUv + o2, 0.001, 0.999)).rgb * 0.145;
    vec3 c4 = texture2D(tScene, clamp(centerUv - o2, 0.001, 0.999)).rgb * 0.145;

    return c0 + c1 + c2 + c3 + c4;
  }

  /**
   * Selective vertical rippled reflection sampler for upward-facing wet asphalt & sidewalk:
   * Only reflects genuinely luminous upper-screen sources (storefronts, streetlamps, car headlights,
   * and bright character rims) so dark ground stays clean instead of mirroring noisy grey walls.
   */
  vec3 sampleGroundReflection(vec2 centerUv, vec2 cellIndex, vec2 cellUvSpan, float upwardMask) {
    if (upwardMask <= 0.01 || uWetness <= 0.01) {
      return vec3(0.0);
    }

    float wavePhase = cellIndex.y * 0.88 + cellIndex.x * 0.19 - uTime * 2.05;
    float rippleX = sin(wavePhase) * cellUvSpan.x * (0.50 + 0.42 * uWetness);
    float rippleBand = 0.68 + 0.32 * sin(cellIndex.y * 1.40 - uTime * 2.55 + cellIndex.x * 0.28);

    vec3 reflAcc = vec3(0.0);
    float weightSum = 0.0;

    for (int i = 1; i <= 6; i++) {
      float fi = float(i);
      float w = 1.0 / (0.70 + fi * 0.58);
      float subWave = sin(wavePhase + fi * 0.82) * cellUvSpan.x * (0.42 + 0.48 * uWetness);
      vec2 sampleUv = clamp(
        centerUv + vec2(rippleX * 0.60 + subWave * 0.50, fi * cellUvSpan.y * 2.85),
        vec2(0.002),
        vec2(0.998)
      );
      vec3 sCol = texture2D(tScene, sampleUv).rgb;
      vec3 bCol = texture2D(tBloom, sampleUv).rgb;
      float sLum = getLuma(sCol);
      // High-pass specular gate: only reflect lit sources & silhouettes (never dull unlit walls)
      float specGate = smoothstep(0.26, 0.82, sLum);
      reflAcc += (sCol * specGate * 0.82 + bCol * 1.30) * w;
      weightSum += w;
    }

    vec3 reflected = (reflAcc / max(weightSum, 0.001)) * rippleBand;
    return reflected * upwardMask * uWetness;
  }

  /**
   * Samples a glyph tile from the horizontal 1D atlas strip with half-texel UV clamping
   * so adjacent characters never bleed into neighboring cells.
   */
  float sampleAtlasTile(float tileIndex, vec2 glyphUv) {
    vec2 safeTileDims = max(uAtlasTileSize, vec2(16.0, 24.0));
    vec2 inset = 0.55 / safeTileDims;
    vec2 clampedUv = clamp(glyphUv, inset, vec2(1.0) - inset);
    vec2 atlasUv = vec2((tileIndex + clampedUv.x) / uTotalGlyphs, clampedUv.y);
    return texture2D(tGlyphAtlas, atlasUv).r;
  }

  void main() {
    vec2 cellSize = max(uCellPixelSize, vec2(4.0, 6.0));

    // Anchor the ASCII character grid to viewport center so resizes expand symmetrically
    vec2 screenCenter = floor(uResolution * 0.5);
    vec2 relFrag = gl_FragCoord.xy - screenCenter;
    vec2 cellIndex = floor(relFrag / cellSize);
    vec2 glyphUv = fract(relFrag / cellSize);

    vec2 cellCenterPx = screenCenter + (cellIndex + 0.5) * cellSize;
    vec2 cellCenterUv = clamp(cellCenterPx / uResolution, vec2(0.001), vec2(0.999));
    vec2 cellUvSpan = cellSize / uResolution;

    // 1. Sub-cell integrated scene radiance + depth + view-space normal
    vec3 sceneCol = sampleCellIntegrated(cellCenterUv, cellUvSpan);
    vec3 bloomCol = texture2D(tBloom, cellCenterUv).rgb;
    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float centerLinDepth = linearizeDepth(rawCenterDepth);
    float isGeometry = step(rawCenterDepth, 0.9994);

    // 2. Atmospheric Depth Layering & Far-Plane Suppression (dark background with light points)
    float depthDelta = abs(centerLinDepth - uDofFocus);
    float dofBlurFactor = clamp(depthDelta * uDofStrength * 2.0, 0.0, 0.68) * isGeometry;

    if (dofBlurFactor > 0.02) {
      vec2 blurStep = cellUvSpan * (1.0 + dofBlurFactor * 1.25);
      vec3 farSample = 0.25 * (
        texture2D(tScene, clamp(cellCenterUv + vec2( blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(-blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0,  blurStep.y), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0, -blurStep.y), 0.001, 0.999)).rgb
      );
      sceneCol = mix(sceneCol, farSample, dofBlurFactor * 0.52);
    }

    // Strongly quiet non-emissive far background structures so distant background breathes darkly
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float farFade = smoothstep(0.28, 0.78, centerLinDepth) * (1.0 - uDaylight * 0.55);
      float emissiveKeep = smoothstep(0.45, 0.92, getLuma(sceneCol + bloomCol * 1.15));
      sceneCol *= mix(1.0, 0.36, farFade * (1.0 - emissiveKeep));
    }

    // 3. Dual 3x3 Sobel Silhouette & Crease Detection + Foreground Silhouette Separation Moat
    vec2 stepUv = (cellSize * 0.85) / uResolution;

    float dTL = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(-stepUv.x,  stepUv.y), 0.001, 0.999)).r);
    float dTC = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( 0.0,       stepUv.y), 0.001, 0.999)).r);
    float dTR = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( stepUv.x,  stepUv.y), 0.001, 0.999)).r);
    float dML = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(-stepUv.x,  0.0     ), 0.001, 0.999)).r);
    float dMR = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( stepUv.x,  0.0     ), 0.001, 0.999)).r);
    float dBL = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(-stepUv.x, -stepUv.y), 0.001, 0.999)).r);
    float dBC = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( 0.0,      -stepUv.y), 0.001, 0.999)).r);
    float dBR = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2( stepUv.x, -stepUv.y), 0.001, 0.999)).r);

    float gxD = (dTR + 2.0 * dMR + dBR) - (dTL + 2.0 * dML + dBL);
    float gyD = (dTL + 2.0 * dTC + dTR) - (dBL + 2.0 * dBC + dBR);
    float depthEdgeMag = length(vec2(gxD, gyD)) * 13.0;

    // Distinguish outer background side vs inner foreground side of 3D depth silhouettes
    float minNeighborDepth = min(min(min(dTL, dTC), min(dTR, dML)), min(min(dMR, dBL), min(dBC, dBR)));
    float maxNeighborDepth = max(max(max(dTL, dTC), max(dTR, dML)), max(max(dMR, dBL), max(dBC, dBR)));
    // Background pixel immediately outside a closer object (e.g. street right behind Player_Rig / Carro_Grupo)
    float silhouetteOuterMoat =
      uVolumeWrapStrength *
      smoothstep(0.018, 0.065, centerLinDepth - minNeighborDepth) *
      (1.0 - smoothstep(0.45, 0.80, minNeighborDepth));
    // Foreground pixel right on the outer contour of a closer object
    float silhouetteInnerRim =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.018, 0.065, maxNeighborDepth - centerLinDepth) *
      (1.0 - smoothstep(0.48, 0.82, centerLinDepth));

    vec3 nCenterEnc = texture2D(tNormal, cellCenterUv).xyz;
    vec3 nTL = texture2D(tNormal, clamp(cellCenterUv + vec2(-stepUv.x,  stepUv.y), 0.001, 0.999)).xyz;
    vec3 nTC = texture2D(tNormal, clamp(cellCenterUv + vec2( 0.0,       stepUv.y), 0.001, 0.999)).xyz;
    vec3 nTR = texture2D(tNormal, clamp(cellCenterUv + vec2( stepUv.x,  stepUv.y), 0.001, 0.999)).xyz;
    vec3 nML = texture2D(tNormal, clamp(cellCenterUv + vec2(-stepUv.x,  0.0     ), 0.001, 0.999)).xyz;
    vec3 nMR = texture2D(tNormal, clamp(cellCenterUv + vec2( stepUv.x,  0.0     ), 0.001, 0.999)).xyz;
    vec3 nBL = texture2D(tNormal, clamp(cellCenterUv + vec2(-stepUv.x, -stepUv.y), 0.001, 0.999)).xyz;
    vec3 nBC = texture2D(tNormal, clamp(cellCenterUv + vec2( 0.0,      -stepUv.y), 0.001, 0.999)).xyz;
    vec3 nBR = texture2D(tNormal, clamp(cellCenterUv + vec2( stepUv.x, -stepUv.y), 0.001, 0.999)).xyz;

    vec3 gxNVec = (nTR + 2.0 * nMR + nBR) - (nTL + 2.0 * nML + nBL);
    vec3 gyNVec = (nTL + 2.0 * nTC + nTR) - (nBL + 2.0 * nBC + nBR);
    float gxN = dot(gxNVec, vec3(0.38, 0.38, 0.24));
    float gyN = dot(gyNVec, vec3(0.38, 0.38, 0.24));
    float normalEdgeMag = length(vec2(gxN, gyN)) * 0.36 * isGeometry;

    // Suppress fine internal bevel noise on mid/far facades while keeping true silhouettes crisp
    float depthCreaseAtten = mix(1.0, 0.24, smoothstep(0.16, 0.62, centerLinDepth));
    float effectiveNormalEdge = normalEdgeMag * depthCreaseAtten * (1.0 - silhouetteOuterMoat);
    float effectiveDepthEdge = depthEdgeMag * (1.0 - silhouetteOuterMoat * 0.85);
    float combinedEdge = max(effectiveDepthEdge, effectiveNormalEdge) * uEdgeStrength * (1.0 - dofBlurFactor * 0.55);
    vec2 domGrad = effectiveDepthEdge >= effectiveNormalEdge ? vec2(gxD, gyD) : vec2(gxN, gyN);

    // 4. Reconstruct Upward Surface Mask + Selective Wet Ground Reflections + Lit-Only Relief
    vec3 viewN = normalize(nCenterEnc * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    float worldUpY = clamp(viewN.y * uCamPitchCos + viewN.z * uCamPitchSin, -1.0, 1.0);
    float upwardSurfaceMask =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.74, 0.94, worldUpY) *
      (1.0 - smoothstep(0.62, 0.92, centerLinDepth));

    vec3 groundRefl = sampleGroundReflection(cellCenterUv, cellIndex, cellUvSpan, upwardSurfaceMask);

    // Contained typographic light halo: bloom lifts nearby character indices into crisp bright glyphs
    vec3 haloLift = bloomCol * (uBloomIntensity * 0.96);
    vec3 combinedHdr = sceneCol + haloLift + groundRefl * 0.78;

    // Soft-shoulder tone curve compresses bright lamp/headlight peaks smoothly without solid clipping
    vec3 combinedSignal = (combinedHdr / (vec3(1.0) + combinedHdr * 0.38)) * 1.26;

    // Selective chromatic discipline: dark desaturated stone/asphalt base with amber, cyan & moss accents
    float rawLuma = getLuma(combinedSignal);
    float warmAccentMask = clamp((combinedHdr.r - combinedHdr.b) * 1.72, 0.0, 1.0);
    float coolCyanMask = clamp((combinedHdr.b - combinedHdr.r) * 1.55, 0.0, 1.0);
    float foliageMask = clamp((combinedHdr.g - max(combinedHdr.r * 0.90, combinedHdr.b * 0.94)) * 2.55, 0.0, 1.0);
    float baseSatKeep = mix(0.55, 0.94, max(max(warmAccentMask, foliageMask), coolCyanMask * 0.85));
    if (uVolumeWrapStrength > 0.5) {
      combinedSignal = mix(vec3(rawLuma), combinedSignal, baseSatKeep);
    }

    // Gate 3D rim/zenith relief strictly to lit surfaces so unlit shadows stay genuinely dark & empty!
    float litGate = smoothstep(0.07, 0.28, rawLuma);
    float zenithCatch = clamp(viewN.y, -0.25, 0.75) * 0.034;
    float grazingRim = pow(1.0 - clamp(abs(viewN.z), 0.0, 1.0), 2.2) * 0.068;
    float volumeRelief =
      ((zenithCatch + grazingRim) * litGate + silhouetteInnerRim * 0.11) *
      isGeometry *
      uVolumeWrapStrength;

    // Value hierarchy S-curve in playground mode:
    // - Carves true dark breathing space in shadows ('rawLuma < 0.08' -> empty space)
    // - Carves a crisp dark moat ('silhouetteOuterMoat') right outside foreground silhouettes
    float shapedLuma = clamp(getLuma(combinedSignal), 0.0, 1.0);
    if (uVolumeWrapStrength > 0.5) {
      float shadowFloor = mix(0.068, 0.032, uDaylight);
      shapedLuma = smoothstep(shadowFloor, 0.95, shapedLuma);
      shapedLuma = pow(shapedLuma, mix(1.08, 0.92, uDaylight));
      // Quiet background clutter immediately behind Player_Rig / Carro_Grupo silhouettes
      float highlightProtect = smoothstep(0.62, 0.92, shapedLuma);
      shapedLuma *= mix(1.0, 0.14, silhouetteOuterMoat * (1.0 - highlightProtect));
    } else {
      shapedLuma = pow(shapedLuma, 0.82);
    }

    float luma = clamp(shapedLuma + volumeRelief, 0.0, 1.0);

    // 5. Select Primary Detail ASCII Glyph (Coherent Spatial Clusters, Zero 1-Cell White Noise!)
    float varietyJitter = 0.0;
    if (uVolumeWrapStrength > 0.5) {
    // Only diversify active midtones/highlights ('luma > 0.18'), keeping shadows & silhouettes clean
      float midtoneEnvelope =
        smoothstep(0.18, 0.34, luma) *
        (1.0 - smoothstep(0.88, 0.985, luma)) *
        (1.0 - clamp(combinedEdge * 1.2, 0.0, 1.0)) *
        smoothstep(0.14, 0.28, centerLinDepth);
      // Coherent horizontal word-like clusters (~3x2 cells) instead of noisy 1-cell TV static
      float wordClusterHash = glyphVarietyHash(floor(vec2(cellIndex.x * 0.32, cellIndex.y * 0.66)) + vec2(11.7, 5.3));
      float cellSubtleHash = glyphVarietyHash(cellIndex * 0.85 + vec2(3.1, 7.9));
      float blendedHash = wordClusterHash * 0.74 + cellSubtleHash * 0.26;
      float wetRippleShift = upwardSurfaceMask * uWetness * sin(cellIndex.y * 1.35 - uTime * 2.5) * 1.25;
      varietyJitter = (blendedHash * 4.2 + wetRippleShift) * midtoneEnvelope;
    }

    float detailTileIndex = floor(luma * (uRampCount - 1.0) + 0.5 + varietyJitter);
    detailTileIndex = clamp(detailTileIndex, 0.0, uRampCount - 1.0);

    // Reserve directional structural glyphs ('|' '/' '\' '_') strictly for true silhouettes & strong creases
    float edgeThresh = uVolumeWrapStrength > 0.5 ? 0.62 : 0.30;
    bool isStrongSilhouette = (effectiveDepthEdge * uEdgeStrength) > 0.42;
    bool useStructuralEdge =
      (isStrongSilhouette || combinedEdge > edgeThresh) &&
      (luma > 0.10 || silhouetteInnerRim > 0.35) &&
      (silhouetteOuterMoat < 0.45) &&
      (uStructCount >= 4.0) &&
      (upwardSurfaceMask < 0.45);

    if (useStructuralEdge) {
      float tangentAngle = atan(-domGrad.x, domGrad.y);
      float deg = mod(degrees(tangentAngle) + 180.0, 180.0);

      float structOffset = 0.0; // '|'
      if (deg >= 22.5 && deg < 67.5) {
        structOffset = 1.0; // '/'
      } else if (deg >= 67.5 && deg < 112.5) {
        if (uVolumeWrapStrength < 0.5 || isStrongSilhouette) {
          structOffset = 3.0; // '_'
        } else {
          useStructuralEdge = false;
        }
      } else if (deg >= 112.5 && deg < 157.5) {
        structOffset = 2.0; // '\'
      }
      if (useStructuralEdge) {
        detailTileIndex = uRampCount + min(structOffset, uStructCount - 1.0);
      }
    }

    float detailGlyphMask = sampleAtlasTile(detailTileIndex, glyphUv);

    // 6. GPU Lighten Stipple-Detail Blend (gated to active lit surfaces 'luma > 0.34', zero shadow dots)
    float compositeGlyphMask = detailGlyphMask;
    float stippleGate = uVolumeWrapStrength > 0.5 ? 0.34 : 0.065;
    if (uBlockCount >= 3.0 && uBlockBlendWeight > 0.001 && luma > stippleGate) {
      float blockTier = clamp(floor(smoothstep(stippleGate, 0.96, luma) * 3.0), 0.0, min(2.0, uBlockCount - 2.0));
      float blockTileIndex = uRampCount + uStructCount + blockTier;
      float blockMask = sampleAtlasTile(blockTileIndex, glyphUv) * uBlockBlendWeight;
      compositeGlyphMask = max(detailGlyphMask, blockMask);
    }

    // 7. Calibrated Foreground Ink, Contained Amber/Emerald Accents & Grounded 3D Tonal Underlayer
    vec3 normColor = combinedSignal / max(rawLuma, 0.065);
    normColor = clamp(normColor, vec3(0.20), vec3(1.50));

    vec3 shadowGrade = mix(normColor, uCoolTint * 1.04, 0.28);
    vec3 highlightGrade = mix(normColor, uWarmTint * 1.12, 0.14);
    vec3 charColor = mix(shadowGrade, highlightGrade, smoothstep(0.18, 0.82, luma));

    if (uVolumeWrapStrength > 0.5) {
      // Warm golden-amber ink on storefront lights, streetlamps & headlight halos (Image 3 & 4 reference)
      vec3 amberInk = vec3(1.06, 0.80, 0.44);
      charColor = mix(charColor, mix(charColor, amberInk, 0.56), warmAccentMask * smoothstep(0.22, 0.82, luma));

      // Contained cool cyber-slate/cyan accent on neon trim & wet reflections (Image 4 reference)
      vec3 cyanInk = vec3(0.58, 0.85, 0.95);
      charColor = mix(charColor, mix(charColor, cyanInk, 0.40), coolCyanMask * smoothstep(0.22, 0.82, luma));

      // Contained dark-emerald / sage ink on foliage & grass planters (Image 2 & 5 reference)
      vec3 mossInk = vec3(0.28, 0.66, 0.42);
      charColor = mix(charColor, mix(charColor, mossInk, 0.52), foliageMask * (1.0 - warmAccentMask * 0.7));

      // Crisp ivory-white core on peak light & character silhouette glyphs without losing legibility
      float peakIvory = max(smoothstep(0.74, 0.96, luma) * 0.64, silhouetteInnerRim * 0.42);
      charColor = mix(charColor, vec3(1.08, 1.05, 0.98), clamp(peakIvory, 0.0, 0.78));
    }

    if (useStructuralEdge) {
      vec3 edgeInk = uVolumeWrapStrength > 0.5 ? mix(uWarmTint * 1.15, vec3(0.94, 0.97, 1.0), silhouetteInnerRim * 0.65) : uWarmTint * 1.16;
      charColor = mix(charColor, edgeInk, 0.26 * clamp(combinedEdge, 0.0, 1.0));
    }

    // Quiet low-contrast ink on sparse shadow punctuation so dark areas breathe naturally;
    // crisp luminous ink on active midtones, silhouettes, reflections, and focal lights.
    float brightness = uVolumeWrapStrength > 0.5
      ? mix(0.12, 1.28, smoothstep(0.10, 0.88, luma))
      : mix(0.18, 1.24, smoothstep(0.02, 0.94, luma));
    vec3 litGlyph = charColor * brightness * compositeGlyphMask;

    // Grounded 3D Tonal Base Underneath Glyphs ('smoothBackdrop'):
    // - Deep dark slate-black in shadows & silhouette moats for clean breathing contrast
    // - Cohesive shaded 3D form underlayer beneath lit characters, vehicles, planters & storefronts
    //   so silhouettes never dissolve into floating text static!
    vec3 deepVoid = uVolumeWrapStrength > 0.5 ? uBgColor * mix(0.76, 0.92, uDaylight) : uBgColor;
    float formUnderlayerStrength = uVolumeWrapStrength > 0.5
      ? mix(0.19, 0.25, uDaylight) * isGeometry * (1.0 - silhouetteOuterMoat * 0.85)
      : mix(0.036, 0.095, uDaylight);
    vec3 tonedUnderlayer = mix(vec3(getLuma(combinedSignal)), combinedSignal, 0.58) * formUnderlayerStrength;
    vec3 smoothBackdrop = mix(
      deepVoid,
      deepVoid + tonedUnderlayer,
      smoothstep(0.14, 0.72, luma)
    );
    // Reinforce dark separation moat right outside foreground silhouettes
    smoothBackdrop *= mix(1.0, 0.58, silhouetteOuterMoat);

    vec2 vigUv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vigUv, vigUv) * mix(0.16, 0.06, uDaylight);

    vec3 finalRgb = mix(smoothBackdrop, litGlyph, clamp(compositeGlyphMask, 0.0, 1.0));
    // Glyph-locked halo aura (0.06 ambient + 0.94 glyph-masked so dark breathing areas never wash out!)
    finalRgb += bloomCol * (uBloomIntensity * mix(0.22, 0.08, uDaylight) * (0.06 + 0.94 * compositeGlyphMask));
    finalRgb *= clamp(vignette, 0.74, 1.0);

    gl_FragColor = vec4(finalRgb, 1.0);
  }
`;
