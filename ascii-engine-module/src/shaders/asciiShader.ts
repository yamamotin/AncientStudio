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
  uniform vec2 uSceneTexelSize;
  uniform vec2 uCellPixelSize;
  uniform float uCellCssSize;
  uniform vec2 uAtlasTileSize;
  uniform float uSubCellSpread;
  uniform float uRampCount;
  uniform float uStructCount;
  uniform float uBlockCount;
  uniform float uTotalGlyphs;
  uniform vec3 uHighlightGlyphs;
  uniform float uEdgeStrength;
  uniform float uBlockBlendWeight;
  uniform float uBloomIntensity;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uDaylight;
  uniform float uWetness;
  uniform float uCameraNear;
  uniform float uCameraFar;
  uniform float uVolumeWrapStrength;
  uniform float uNormalReliefStrength;
  uniform vec3 uKeyLightViewDir;
  uniform vec3 uRimLightViewDir;
  uniform vec3 uWorldUpViewDir;
  uniform vec3 uBgColor;
  uniform vec3 uCoolTint;
  uniform vec3 uWarmTint;
  uniform float uTime;

  varying vec2 vUv;

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  vec3 linearToSrgb(vec3 c) {
    return pow(max(c, vec3(0.0)), vec3(0.454545));
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
   * 2x2 Sub-Cell Multi-Point Filtered Downsampling (sampleCellIntegrated):
   * Samples all 4 sub-quadrant centers ((-q,-q), (+q,-q), (-q,+q), (+q,+q)) plus the
   * cell center in the supersampled 3D tScene buffer (each tap hardware-bilinearly filtering
   * 4 supersampled texels), integrating weighted mean color/luminance while preserving crisp
   * sub-cell highlight peaks (headlights, character rim, mullions, wet specular glints)
   * without reintroducing 1-pixel granular noise.
   */
  vec3 sampleCellIntegrated(vec2 centerUv, vec2 cellUvSpan) {
    vec2 q = cellUvSpan * uSubCellSpread;

    vec3 qBL = texture2D(tScene, clamp(centerUv + vec2(-q.x, -q.y), 0.001, 0.999)).rgb;
    vec3 qBR = texture2D(tScene, clamp(centerUv + vec2( q.x, -q.y), 0.001, 0.999)).rgb;
    vec3 qTL = texture2D(tScene, clamp(centerUv + vec2(-q.x,  q.y), 0.001, 0.999)).rgb;
    vec3 qTR = texture2D(tScene, clamp(centerUv + vec2( q.x,  q.y), 0.001, 0.999)).rgb;
    vec3 qC  = texture2D(tScene, centerUv).rgb;

    vec3 avgCol = (qBL + qBR + qTL + qTR) * 0.205 + qC * 0.18;
    vec3 peakCol = max(max(qBL, qBR), max(qTL, qTR));
    float peakLuma = getLuma(peakCol);
    float avgLuma = getLuma(avgCol);
    // Preserve thin luminous features crossing a single sub-quadrant while keeping flat areas smooth
    float peakKeep = smoothstep(0.24, 0.86, peakLuma) * smoothstep(0.06, 0.36, peakLuma - avgLuma) * 0.38;
    return mix(avgCol, peakCol, peakKeep);
  }

  /**
   * Selective vertical rippled reflection sampler for upward-facing wet asphalt & sidewalk:
   * Perturbs reflection rays by actual surface normal tilt ('normalTilt' from embedded/procedural
   * normal maps) plus gentle rain ripples, reflecting only genuinely luminous upper-screen sources.
   */
  vec3 sampleGroundReflection(
    vec2 centerUv,
    vec2 cellIndex,
    vec2 cellUvSpan,
    float upwardMask,
    vec2 normalTilt
  ) {
    if (upwardMask <= 0.01 || uWetness <= 0.01) {
      return vec3(0.0);
    }

    float rainAnim = smoothstep(0.45, 0.95, uWetness);
    float wavePhase = cellIndex.y * 0.88 + cellIndex.x * 0.19 - uTime * (0.45 + 1.65 * rainAnim);
    float rippleX = sin(wavePhase) * cellUvSpan.x * (0.28 + 0.56 * rainAnim);
    float normalRefractX = normalTilt.x * cellUvSpan.x * (1.85 + 1.35 * uWetness);
    float normalRefractY = normalTilt.y * cellUvSpan.y * 1.25;
    float rippleBand = 0.74 + 0.26 * sin(cellIndex.y * 1.35 - uTime * (0.55 + 1.95 * rainAnim) + normalTilt.x * 3.2);

    vec3 reflAcc = vec3(0.0);
    float weightSum = 0.0;

    float stepReflY = max(cellUvSpan.y * 2.85, 0.022);
    for (int i = 1; i <= 6; i++) {
      float fi = float(i);
      float w = 1.0 / (0.70 + fi * 0.58);
      float subWave = sin(wavePhase + fi * 0.82) * max(cellUvSpan.x, 0.004) * (0.24 + 0.52 * rainAnim);
      vec2 sampleUv = clamp(
        centerUv + vec2(
          normalRefractX + rippleX * 0.55 + subWave * 0.45,
          fi * stepReflY + normalRefractY
        ),
        vec2(0.002),
        vec2(0.998)
      );
      vec3 sCol = texture2D(tScene, sampleUv).rgb;
      vec3 bCol = texture2D(tBloom, sampleUv).rgb;
      float sLum = getLuma(sCol);
      // Reflect warm storefronts, illuminated facades, neon trims & headlights on wet pavement
      float specGate = smoothstep(0.12, 0.65, sLum);
      reflAcc += (sCol * specGate * 0.92 + bCol * 1.38) * w;
      weightSum += w;
    }

    vec3 reflected = (reflAcc / max(weightSum, 0.001)) * rippleBand;
    return reflected * upwardMask * uWetness;
  }

  /**
   * Samples a glyph tile from the horizontal 1D atlas strip with half-texel UV clamping,
   * 4-tap rotated-grid sub-pixel anti-aliasing (RGSS) when cells shrink below 8.5 physical px,
   * and adaptive stem sharpening so 2.0px–6.8px characters stay crisp without stroke dropout.
   */
  float sampleAtlasTile(float tileIndex, vec2 glyphUv, vec2 cellSize) {
    vec2 safeTileDims = max(uAtlasTileSize, vec2(16.0, 24.0));
    float microCellFactor = 1.0 - smoothstep(3.5, 8.5, cellSize.y);
    vec2 inset = mix(0.55 / safeTileDims, 1.65 / safeTileDims, microCellFactor);
    vec2 clampedUv = clamp(glyphUv, inset, vec2(1.0) - inset);
    vec2 atlasUv = vec2((tileIndex + clampedUv.x) / uTotalGlyphs, clampedUv.y);
    float rawGlyph = texture2D(tGlyphAtlas, atlasUv).r;

    if (microCellFactor > 0.001) {
      vec2 subStep = vec2(0.19, 0.38) / max(cellSize, vec2(1.25, 2.0));
      vec2 uv0 = clamp(glyphUv + vec2( subStep.x,  subStep.y), inset, vec2(1.0) - inset);
      vec2 uv1 = clamp(glyphUv + vec2(-subStep.x, -subStep.y), inset, vec2(1.0) - inset);
      vec2 uv2 = clamp(glyphUv + vec2(-subStep.y,  subStep.x), inset, vec2(1.0) - inset);
      vec2 uv3 = clamp(glyphUv + vec2( subStep.y, -subStep.x), inset, vec2(1.0) - inset);
      float s0 = texture2D(tGlyphAtlas, vec2((tileIndex + uv0.x) / uTotalGlyphs, uv0.y)).r;
      float s1 = texture2D(tGlyphAtlas, vec2((tileIndex + uv1.x) / uTotalGlyphs, uv1.y)).r;
      float s2 = texture2D(tGlyphAtlas, vec2((tileIndex + uv2.x) / uTotalGlyphs, uv2.y)).r;
      float s3 = texture2D(tGlyphAtlas, vec2((tileIndex + uv3.x) / uTotalGlyphs, uv3.y)).r;
      float avgGlyph = (s0 + s1 + s2 + s3) * 0.25;
      float peakGlyph = max(max(s0, s1), max(s2, s3));
      rawGlyph = mix(rawGlyph, mix(avgGlyph, peakGlyph, 0.44 * microCellFactor), microCellFactor);
    }

    float lowKnee = mix(0.35, 0.15, microCellFactor);
    float highKnee = mix(0.70, 0.50, microCellFactor);
    return mix(rawGlyph, smoothstep(lowKnee, highKnee, rawGlyph), mix(0.36, 0.62, microCellFactor));
  }

  void main() {
    vec2 cellSize = max(uCellPixelSize, vec2(1.25, 2.0));
    float microCellFactor = 1.0 - smoothstep(3.5, 8.5, cellSize.y);
    float smallFontFactor = uVolumeWrapStrength > 0.5 ? (1.0 - smoothstep(3.0, 6.0, max(uCellCssSize, 2.0))) : 0.0;
    float cellDensitySupport = max(microCellFactor, smallFontFactor);

    // Anchor the ASCII character grid to viewport center so resizes expand symmetrically
    vec2 screenCenter = floor(uResolution * 0.5);
    vec2 relFrag = gl_FragCoord.xy - screenCenter;
    vec2 cellIndex = floor(relFrag / cellSize);
    vec2 glyphUv = fract(relFrag / cellSize);

    vec2 cellCenterPx = screenCenter + (cellIndex + 0.5) * cellSize;
    vec2 cellCenterUv = clamp(cellCenterPx / uResolution, vec2(0.001), vec2(0.999));
    vec2 cellUvSpan = cellSize / uResolution;
    vec2 subQuadOffset = cellUvSpan * uSubCellSpread;

    // 1. 2x2 Sub-Cell Multi-Point Filtered Downsampling (radiance + foreground depth + normals)
    vec3 sceneCol = sampleCellIntegrated(cellCenterUv, cellUvSpan);
    vec3 bloomCol = texture2D(tBloom, cellCenterUv).rgb;

    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float rawDepthBL = texture2D(tDepth, clamp(cellCenterUv + vec2(-subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).r;
    float rawDepthBR = texture2D(tDepth, clamp(cellCenterUv + vec2( subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).r;
    float rawDepthTL = texture2D(tDepth, clamp(cellCenterUv + vec2(-subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).r;
    float rawDepthTR = texture2D(tDepth, clamp(cellCenterUv + vec2( subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).r;
    float minSubRawDepth = min(min(rawDepthBL, rawDepthBR), min(rawDepthTL, rawDepthTR));
    float maxSubRawDepth = max(max(rawDepthBL, rawDepthBR), max(rawDepthTL, rawDepthTR));

    float linCenterOnly = linearizeDepth(rawCenterDepth);
    float linSubMin = linearizeDepth(minSubRawDepth);
    float linSubMax = linearizeDepth(maxSubRawDepth);
    // Favor foreground sub-quadrant when a thin character/vehicle contour crosses the cell
    float fgSnap = smoothstep(0.014, 0.055, linCenterOnly - linSubMin);
    float centerLinDepth = mix(linCenterOnly, linSubMin, fgSnap * 0.72);
    float isGeometry = step(mix(rawCenterDepth, minSubRawDepth, fgSnap * 0.72), 0.9994);
    float subDepthPeak = clamp((linSubMax - linSubMin) * 9.5, 0.0, 1.15) * isGeometry;

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

    // Gentle atmospheric depth haze that preserves background architecture & skyline continuity
    // instead of blacking out distant facades into disconnected floating blocks
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float farFade = smoothstep(0.52, 0.96, centerLinDepth) * (1.0 - uDaylight * 0.85);
      float emissiveKeep = smoothstep(0.32, 0.85, getLuma(sceneCol + bloomCol * 1.15));
      sceneCol *= mix(1.0, 0.86, farFade * (1.0 - emissiveKeep));
    }

    // 3. Dual 3x3 Sobel Silhouette & Crease Detection + Balanced Foreground Silhouette Moat
    // Floor stepUv to 1.15 supersampled texels so 2.0px micro-cells still sample crisp Sobel gradients
    vec2 stepUv = max((cellSize * 0.85) / uResolution, uSceneTexelSize * 1.15);

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
    float depthEdgeMag = length(vec2(gxD, gyD)) * 13.5;

    // Distinguish outer background side vs inner foreground side of 3D depth silhouettes:
    // Tightly scope silhouetteOuterMoat to close focal subjects so background structures never fragment
    float minNeighborDepth = min(min(min(dTL, dTC), min(dTR, dML)), min(min(dMR, dBL), min(dBC, dBR)));
    float maxNeighborDepth = max(max(max(dTL, dTC), max(dTR, dML)), max(max(dMR, dBL), max(dBC, dBR)));
    float silhouetteOuterMoat =
      uVolumeWrapStrength *
      smoothstep(0.022, 0.075, centerLinDepth - minNeighborDepth) *
      (1.0 - smoothstep(0.22, 0.44, minNeighborDepth));
    float silhouetteInnerRim =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.016, 0.062, maxNeighborDepth - centerLinDepth) *
      (1.0 - smoothstep(0.55, 0.88, centerLinDepth));

    vec3 nCenterEnc = texture2D(tNormal, cellCenterUv).xyz;
    vec3 nSubBL = texture2D(tNormal, clamp(cellCenterUv + vec2(-subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubBR = texture2D(tNormal, clamp(cellCenterUv + vec2( subQuadOffset.x, -subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubTL = texture2D(tNormal, clamp(cellCenterUv + vec2(-subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubTR = texture2D(tNormal, clamp(cellCenterUv + vec2( subQuadOffset.x,  subQuadOffset.y), 0.001, 0.999)).xyz;
    vec3 nSubIntegrated = (nSubBL + nSubBR + nSubTL + nSubTR) * 0.20 + nCenterEnc * 0.20;
    vec3 subGxN = (nSubTR + nSubBR) - (nSubTL + nSubBL);
    vec3 subGyN = (nSubTL + nSubTR) - (nSubBL + nSubBR);
    float subNormalPeak =
      length(vec2(dot(subGxN, vec3(0.38, 0.38, 0.24)), dot(subGyN, vec3(0.38, 0.38, 0.24)))) *
      0.52 *
      isGeometry;

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
    float normalEdgeMag = max(length(vec2(gxN, gyN)) * 0.38 * isGeometry, subNormalPeak * 0.72);
    depthEdgeMag = max(depthEdgeMag, subDepthPeak * 0.78);

    // 4. Reconstruct Normal-Mapped Surface Orientation & View-Space Directional Lighting
    vec3 rawViewN = normalize(nSubIntegrated * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    vec3 macroViewN = normalize(((nTC + nBC + nML + nMR) * 0.25) * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    // Distance-filter micro-normals into macro planar normals so distant facades never alias into static
    vec3 viewN = normalize(mix(rawViewN, macroViewN, smoothstep(0.24, 0.74, centerLinDepth) * 0.68));

    // Exact surface slope relative to world gravity '+Y' (independent of camera pitch or orbit)
    float worldUpY = clamp(dot(viewN, uWorldUpViewDir), -1.0, 1.0);
    vec2 normalTilt = (viewN - uWorldUpViewDir * worldUpY).xy;
    float upwardSurfaceMask =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.68, 0.90, worldUpY) *
      (1.0 - smoothstep(0.62, 0.92, centerLinDepth));

    // Directional key & rim incidence (Lambertian N*L, back-facing self-occlusion, Blinn-Phong N*H, Fresnel rim)
    float rawKeyDot = dot(viewN, uKeyLightViewDir);
    float keyNdotL = clamp(rawKeyDot, 0.0, 1.0);
    float keyAway = clamp(-rawKeyDot, 0.0, 1.0);
    float rimNdotL = clamp(dot(viewN, uRimLightViewDir), 0.0, 1.0);
    vec3 halfVec = normalize(uKeyLightViewDir + vec3(0.0, 0.0, 1.0));
    float specPower = mix(22.0, 44.0, uWetness);
    float normalSpec = pow(max(dot(viewN, halfVec), 0.0), specPower) * mix(0.075, 0.165, uWetness);
    float grazingRim = pow(1.0 - clamp(abs(viewN.z), 0.0, 1.0), 2.15) * (0.36 + 0.64 * rimNdotL) * 0.105;
    float hemiCatch = worldUpY * 0.038;

    // Suppress fine internal bevel noise on far facades while letting architectural creases read clearly
    float creaseLightCatch = 0.64 + 0.58 * max(keyNdotL, rimNdotL);
    float depthCreaseAtten = mix(1.0, 0.34, smoothstep(0.24, 0.78, centerLinDepth));
    float effectiveNormalEdge = normalEdgeMag * depthCreaseAtten * creaseLightCatch * (1.0 - silhouetteOuterMoat * 0.75);
    float effectiveDepthEdge = depthEdgeMag * (1.0 - silhouetteOuterMoat * 0.65);
    float combinedEdge = max(effectiveDepthEdge, effectiveNormalEdge) * uEdgeStrength * (1.0 - dofBlurFactor * 0.45);
    vec2 domGrad = effectiveDepthEdge >= effectiveNormalEdge ? vec2(gxD, gyD) : vec2(gxN, gyN);

    vec3 groundRefl = sampleGroundReflection(cellCenterUv, cellIndex, cellUvSpan, upwardSurfaceMask, normalTilt);

    // Calibrated linear structural floor on real 3D geometry so roofs/walls/streets read as connected 3D mass
    vec3 structuralMassFloor =
      uCoolTint *
      mix(0.085, 0.22, uDaylight) *
      (0.60 + 0.40 * clamp(worldUpY * 0.5 + 0.5, 0.0, 1.0)) *
      isGeometry *
      uVolumeWrapStrength;
    vec3 baseGeomCol = max(sceneCol, structuralMassFloor);

    // Contained typographic light halo: bloom lifts nearby character indices into crisp bright glyphs
    vec3 haloLift = bloomCol * (uBloomIntensity * 1.06);
    vec3 combinedHdr = baseGeomCol + haloLift + groundRefl * mix(0.92, 1.12, uWetness);

    // Modulate scene radiance by directional surface orientation so 90-degree return walls separate cleanly
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float emissiveKeep = smoothstep(0.55, 0.96, getLuma(combinedHdr));
      float planarFactor = mix(
        1.0 + (keyNdotL * 0.26 - keyAway * 0.16 + hemiCatch * 1.65) * uNormalReliefStrength,
        1.0,
        emissiveKeep
      );
      combinedHdr = combinedHdr * clamp(planarFactor, 0.80, 1.32) + vec3(normalSpec * 0.56 * uNormalReliefStrength);
    }

    // Soft-shoulder tone curve in linear space + perceptual sRGB transfer for urban 3D offscreen target
    // (Pass 1 renders linear radiance into HalfFloatType and Pass 4 writes directly to sRGB framebuffer)
    vec3 combinedSignal;
    if (uVolumeWrapStrength > 0.5) {
      vec3 workingHdr = isGeometry > 0.5
        ? combinedHdr
        : (max(sceneCol - uBgColor * 1.04, vec3(0.0)) + haloLift);
      float exposureGain = mix(1.55, 1.85, uDaylight);
      vec3 exposedLinear = (workingHdr * exposureGain) / (vec3(1.0) + workingHdr * (0.38 * exposureGain));
      combinedSignal = linearToSrgb(exposedLinear);
    } else {
      combinedSignal = (combinedHdr / (vec3(1.0) + combinedHdr * 0.36)) * 1.28;
    }

    // Selective chromatic discipline: cohesive stone/asphalt base with amber, cyan & moss accents
    float rawLuma = getLuma(combinedSignal);
    float warmAccentMask = clamp((combinedHdr.r - combinedHdr.b) * 1.85, 0.0, 1.0);
    float coolCyanMask = clamp((combinedHdr.b - combinedHdr.r) * 1.65, 0.0, 1.0);
    float foliageMask = clamp((combinedHdr.g - max(combinedHdr.r * 0.90, combinedHdr.b * 0.94)) * 2.65, 0.0, 1.0);
    float baseSatKeep = mix(mix(0.60, 0.76, uDaylight), 0.96, max(max(warmAccentMask, foliageMask), coolCyanMask * 0.86));
    if (uVolumeWrapStrength > 0.5) {
      combinedSignal = mix(vec3(rawLuma), combinedSignal, baseSatKeep);
    }

    // Gate directional 3D normal relief so sky stays calm while 3D forms wrap with volume
    float litGate = smoothstep(0.04, 0.24, rawLuma);
    float directionalRelief =
      (keyNdotL * 0.072 - keyAway * 0.044 + hemiCatch + grazingRim * 1.15 + normalSpec) * uNormalReliefStrength;
    float volumeRelief =
      (directionalRelief * litGate + silhouetteInnerRim * 0.12) *
      isGeometry *
      uVolumeWrapStrength;

    // Perceptual value hierarchy across day / night / rain and micro-cells (down to 2px–4px):
    // - Sky/void ('isGeometry == 0') stays clean unless crossed by bloom halos or rain streaks
    // - Every 3D surface clears the 4 leading empty spaces of DEFAULT_ASCII_RAMP and preserves mass at 4px
    // - Foreground focal subjects ('silhouetteOuterMoat') get a subtle, non-destructive contrast cushion
    float shapedLuma = clamp(getLuma(combinedSignal), 0.0, 1.0);
    if (uVolumeWrapStrength > 0.5) {
      if (isGeometry > 0.5) {
        shapedLuma = pow(max(shapedLuma, 0.0001), mix(0.94, 0.86, uDaylight));
        float geomMinLuma = mix(0.16, 0.28, uDaylight) + cellDensitySupport * 0.07;
        shapedLuma = mix(geomMinLuma, 0.98, clamp((shapedLuma - 0.10) / 0.88, 0.0, 1.0));
        float highlightProtect = smoothstep(0.54, 0.90, shapedLuma);
        float moatAtten = mix(0.80, 0.90, max(uDaylight, cellDensitySupport));
        shapedLuma *= mix(1.0, moatAtten, silhouetteOuterMoat * (1.0 - highlightProtect));
      } else {
        shapedLuma = smoothstep(0.05, 0.88, shapedLuma) * (1.0 - uDaylight * 0.35);
      }
    } else {
      shapedLuma = pow(shapedLuma, 0.82);
    }

    float luma = clamp(shapedLuma + volumeRelief, 0.0, 1.0);

    // 5. Graduated Surface Glyph Fill + Highlight Sparkles ('*', 'o') + Directional Contours ('|', '/', '\', '-', '+')
    float varietyJitter = 0.0;
    if (uVolumeWrapStrength > 0.5) {
      // Restrained planar jitter so surfaces display smooth graduated glyph progressions across light falloff
      float midtoneEnvelope =
        smoothstep(0.14, 0.30, luma) *
        (1.0 - smoothstep(0.88, 0.985, luma)) *
        (1.0 - clamp(combinedEdge * 1.25, 0.0, 1.0)) *
        smoothstep(0.08, 0.22, centerLinDepth);
      vec2 normalSector = floor(macroViewN.xy * 2.5 + 0.5);
      float wordClusterHash = glyphVarietyHash(
        floor(vec2(cellIndex.x * 0.24, cellIndex.y * 0.48)) + normalSector * 4.1 + vec2(11.7, 5.3)
      );
      float cellSubtleHash = glyphVarietyHash(cellIndex * 0.85 + vec2(3.1, 7.9));
      float blendedHash = wordClusterHash * 0.84 + cellSubtleHash * 0.16;
      float wetRippleShift =
        upwardSurfaceMask * uWetness * sin(cellIndex.y * 1.35 - uTime * 1.8 + normalTilt.x * 4.0) * 0.85;
      varietyJitter = (blendedHash * 1.45 + wetRippleShift) * midtoneEnvelope * (1.0 - cellDensitySupport * 0.65);
    }

    float detailTileIndex = floor(luma * (uRampCount - 1.0) + 0.5 + varietyJitter);
    detailTileIndex = clamp(detailTileIndex, 0.0, uRampCount - 1.0);

    // Curated '*' and 'o' highlight accents on light halos, wet ground reflections & storm rain particles
    bool isSparkleHighlight = false;
    if (uVolumeWrapStrength > 0.5) {
      float nocturnalBoost = mix(1.0, 0.22, uDaylight);
      float bloomLuma = getLuma(bloomCol);
      float reflLuma = getLuma(groundRefl);
      float sparkleNoise = glyphVarietyHash(cellIndex + floor(uTime * 2.2) * vec2(0.0, uWetness > 0.85 ? 1.0 : 0.0));
      float staticSparkle = glyphVarietyHash(cellIndex * 1.13 + vec2(17.3, 9.1));

      // Wet ground reflection glints ('*' on bright ripple crests, 'o' on soft wet shimmer)
      bool wetReflAccent =
        upwardSurfaceMask > 0.35 &&
        reflLuma > 0.065 &&
        luma > 0.22 &&
        luma < 0.88 &&
        staticSparkle > mix(0.32, 0.14, uWetness);

      // Light-source halo & lamp/headlight aura points ('*' / 'o' around warm/cyan emitters at night/rain)
      bool haloAccent =
        nocturnalBoost > 0.5 &&
        bloomLuma > 0.075 &&
        luma > 0.26 &&
        luma < 0.84 &&
        staticSparkle > 0.24;

      // Falling rain particle & mist droplet glints in 'rain' mode
      bool rainParticleAccent =
        uWetness > 0.85 &&
        subDepthPeak > 0.26 &&
        luma > 0.24 &&
        sparkleNoise > 0.16;

      if (wetReflAccent || haloAccent || rainParticleAccent) {
        bool pickStar =
          (luma > 0.56 && staticSparkle > 0.28) ||
          (rainParticleAccent && sparkleNoise > 0.30) ||
          (reflLuma > 0.18);
        detailTileIndex = clamp(pickStar ? uHighlightGlyphs.x : uHighlightGlyphs.y, 0.0, uRampCount - 1.0);
        isSparkleHighlight = true;
      }
    }

    // Geometrically-aligned directional structural contours ('|', '/', '\', '-', '+')
    float edgeThresh = uVolumeWrapStrength > 0.5 ? mix(0.44, 0.52, cellDensitySupport) : 0.30;
    bool isStrongSilhouette = (effectiveDepthEdge * uEdgeStrength) > 0.36;
    bool allowGroundCurbEdge = combinedEdge > 0.68;
    bool useStructuralEdge =
      (isStrongSilhouette || combinedEdge > edgeThresh) &&
      (luma > 0.06 || silhouetteInnerRim > 0.28) &&
      (silhouetteOuterMoat < 0.65) &&
      (uStructCount >= 4.0) &&
      (upwardSurfaceMask < 0.52 || allowGroundCurbEdge);

    if (useStructuralEdge) {
      // Tangent vector to gradient (gx, gy) is (-gy, gx); angle in [0..180) from +X horizontal axis
      float tangentAngle = atan(domGrad.x, -domGrad.y);
      float deg = mod(degrees(tangentAngle) + 180.0, 180.0);

      float absGx = abs(domGrad.x);
      float absGy = abs(domGrad.y);
      float cornerRatio = min(absGx, absGy) / max(max(absGx, absGy), 0.0001);

      float structOffset = 0.0; // '|' vertical (67.5..112.5 deg)
      if (uVolumeWrapStrength > 0.5 && uStructCount >= 5.0 && cornerRatio > 0.72 && combinedEdge > edgeThresh * 1.32 && subNormalPeak > 0.22) {
        structOffset = 4.0; // '+' orthogonal structural corner / frame junction
      } else if (deg >= 22.5 && deg < 67.5) {
        structOffset = 1.0; // '/' rising diagonal
      } else if (deg >= 67.5 && deg < 112.5) {
        structOffset = 0.0; // '|' vertical edge
      } else if (deg >= 112.5 && deg < 157.5) {
        structOffset = 2.0; // '\' falling diagonal
      } else {
        structOffset = 3.0; // '-' horizontal roof, lintel, curb, step
      }
      detailTileIndex = uRampCount + min(structOffset, uStructCount - 1.0);
      isSparkleHighlight = false;
    }

    float detailGlyphMask = sampleAtlasTile(detailTileIndex, glyphUv, cellSize);

    // 6. GPU Lighten Stipple-Detail Blend (adaptive halftone support preserves solid surface mass at 4px)
    float compositeGlyphMask = detailGlyphMask;
    float stippleGate = uVolumeWrapStrength > 0.5 ? mix(0.24, 0.14, cellDensitySupport) : 0.065;
    float effectiveBlockWeight = uVolumeWrapStrength > 0.5
      ? clamp(uBlockBlendWeight + cellDensitySupport * 0.24, 0.0, 0.46)
      : uBlockBlendWeight;
    if (uBlockCount >= 3.0 && effectiveBlockWeight > 0.001 && luma > stippleGate && !isSparkleHighlight) {
      float blockTier = clamp(floor(smoothstep(stippleGate, 0.96, luma) * 3.0), 0.0, min(2.0, uBlockCount - 2.0));
      float blockTileIndex = uRampCount + uStructCount + blockTier;
      float blockMask = sampleAtlasTile(blockTileIndex, glyphUv, cellSize) * effectiveBlockWeight;
      compositeGlyphMask = max(detailGlyphMask, blockMask);
    }
    // Preserve stable micro-engraving luminance density when cell size enters the small range (2.0px–5.5px)
    if (cellDensitySupport > 0.01 && isGeometry > 0.5) {
      float microDensityFloor = smoothstep(0.10, 0.86, luma) * (useStructuralEdge ? 0.84 : 0.62);
      compositeGlyphMask = mix(compositeGlyphMask, max(compositeGlyphMask, microDensityFloor), cellDensitySupport * 0.48);
    }

    // 7. Calibrated Perceptual Foreground Ink, Accents & Grounded 3D Tonal Underlayer
    vec3 coolTintOut = uVolumeWrapStrength > 0.5 ? linearToSrgb(uCoolTint) : uCoolTint;
    vec3 warmTintOut = uVolumeWrapStrength > 0.5 ? linearToSrgb(uWarmTint) : uWarmTint;
    vec3 bgColorOut = uVolumeWrapStrength > 0.5 ? linearToSrgb(uBgColor) : uBgColor;

    vec3 normColor = combinedSignal / max(rawLuma, 0.08);
    normColor = clamp(normColor, vec3(0.32), vec3(1.42));

    vec3 shadowGrade = mix(normColor, coolTintOut * 1.06, 0.34);
    vec3 highlightGrade = mix(normColor, warmTintOut * 1.10, 0.18);
    vec3 charColor = mix(shadowGrade, highlightGrade, smoothstep(0.14, 0.82, luma));

    if (uVolumeWrapStrength > 0.5) {
      // Warm golden-amber ink on storefront lights, streetlamps & headlight halos
      vec3 amberInk = vec3(1.06, 0.82, 0.48);
      charColor = mix(charColor, mix(charColor, amberInk, 0.54), warmAccentMask * smoothstep(0.18, 0.82, luma));

      // Contained cool cyber-slate/cyan accent on neon trim, rain streaks & wet reflections
      vec3 cyanInk = vec3(0.62, 0.87, 0.97);
      charColor = mix(charColor, mix(charColor, cyanInk, 0.40), coolCyanMask * smoothstep(0.18, 0.82, luma));

      // Readable emerald / sage ink on tree canopies & grass planters
      vec3 mossInk = mix(vec3(0.34, 0.72, 0.46), vec3(0.42, 0.78, 0.50), uDaylight);
      charColor = mix(charColor, mix(charColor, mossInk, 0.52), foliageMask * (1.0 - warmAccentMask * 0.7));

      // Crisp ivory-white core on peak lights, '*' / 'o' sparkles & character silhouette rims
      float sparkleLift = isSparkleHighlight ? 0.36 : 0.0;
      float peakIvory = max(max(smoothstep(0.72, 0.96, luma) * 0.64, silhouetteInnerRim * 0.42), sparkleLift);
      charColor = mix(charColor, vec3(1.06, 1.04, 0.98), clamp(peakIvory, 0.0, 0.78));
    }

    if (useStructuralEdge) {
      vec3 edgeInk = uVolumeWrapStrength > 0.5
        ? mix(coolTintOut * 1.12, vec3(0.96, 0.98, 1.02), max(silhouetteInnerRim * 0.66, smoothstep(0.32, 0.84, luma) * 0.48))
        : warmTintOut * 1.16;
      charColor = mix(charColor, edgeInk, 0.34 * clamp(combinedEdge, 0.0, 1.0));
    }

    // Readable structural ink across shadowed streets/walls and bright sunlit/nocturnal focal planes
    float brightness = uVolumeWrapStrength > 0.5
      ? mix(mix(0.46, 0.58, uDaylight), 1.32, smoothstep(0.08, 0.86, luma))
      : mix(0.18, 1.24, smoothstep(0.02, 0.94, luma));
    vec3 litGlyph = charColor * brightness * compositeGlyphMask;

    // Grounded 3D Tonal Base Underneath Glyphs ('smoothBackdrop'):
    // Gives solid continuous 3D mass to streets, sidewalks, facades, trees & characters even at 4px cell size
    vec3 deepVoid = uVolumeWrapStrength > 0.5 ? bgColorOut * mix(0.92, 1.0, uDaylight) : bgColorOut;
    float formUnderlayerStrength = uVolumeWrapStrength > 0.5
      ? (mix(0.28, 0.44, uDaylight) + cellDensitySupport * 0.14) * isGeometry * (1.0 - silhouetteOuterMoat * 0.35)
      : mix(0.036, 0.095, uDaylight);
    vec3 perceptualBase = uVolumeWrapStrength > 0.5
      ? mix(vec3(luma), normColor * luma, 0.58)
      : mix(vec3(getLuma(combinedSignal)), combinedSignal, 0.58);
    vec3 tonedUnderlayer = perceptualBase * formUnderlayerStrength;
    vec3 smoothBackdrop = mix(
      deepVoid,
      deepVoid * (1.0 - formUnderlayerStrength * 0.45 * isGeometry) + tonedUnderlayer,
      smoothstep(0.06, 0.64, luma)
    );
    smoothBackdrop *= mix(1.0, mix(0.84, 0.92, max(uDaylight, cellDensitySupport)), silhouetteOuterMoat);

    vec2 vigUv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vigUv, vigUv) * mix(0.09, 0.035, uDaylight);

    vec3 finalRgb = mix(smoothBackdrop, litGlyph, clamp(compositeGlyphMask, 0.0, 1.0));
    // Glyph-locked halo aura (subtle ambient + glyph-masked glow around streetlamps/headlights)
    vec3 bloomSrgb = uVolumeWrapStrength > 0.5 ? linearToSrgb(bloomCol * 0.85) : bloomCol;
    finalRgb += bloomSrgb * (uBloomIntensity * mix(0.26, 0.10, uDaylight) * (0.10 + 0.90 * compositeGlyphMask));
    finalRgb *= clamp(vignette, 0.86, 1.0);

    gl_FragColor = vec4(finalRgb, 1.0);
  }
`;
