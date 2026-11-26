/**
 * Modern Full-Screen 3D-Wrapping ASCII Post-Processing Shader Pipeline (`asciiShader.ts`):
 * - Multi-tap sub-cell supersampling (`sampleCellIntegrated`) prevents subpixel aliasing across
 *   dense architectural textures, vehicle bodywork, foliage, and character geometry.
 * - Deterministic 2D spatial glyph-variety modulation (`glyphVarietyHash`) breaks up monotonous
 *   runs of uniform dashes/bars across broad walls and roads into organic alphanumeric/symbolic
 *   textures (`o`, `u`, `s`, `a`, `c`, `$`, `8`, `Q`, `=`, `-`, `~`, `^`, `*`).
 * - Linearized view-space depth (`linearizeDepth` via `uCameraNear` / `uCameraFar`) + dual 3x3
 *   Sobel operator across Linear Depth and View-Space Normals (`tNormal`) wraps true 3D silhouettes
 *   and sharp architectural creases in directional structural glyphs (`| / \ _`).
 * - Vertical rippled ground/asphalt/water reflection pass (`sampleGroundReflection`) projects
 *   nearby lights, storefronts, lampposts, passing headlights, and foreground silhouettes onto
 *   upward-facing wet surfaces directly inside the quantized ASCII grid.
 * - Contained typographic light halos + chromatic discipline: dark desaturated slate base with
 *   selective warm-amber light accents, crisp ivory cores, and muted emerald/sage foliage tones
 *   (solid full-fill block tier is never emitted).
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

    vec2 r2 = uTexelSize * 2.75;
    acc += texture2D(tScene, clamp(vUv + vec2( r2.x,  0.0 ), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2(-r2.x,  0.0 ), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2( 0.0,   r2.y), 0.001, 0.999)).rgb * 0.055;
    acc += texture2D(tScene, clamp(vUv + vec2( 0.0,  -r2.y), 0.001, 0.999)).rgb * 0.055;

    vec2 r3 = uTexelSize * 4.25;
    acc += texture2D(tScene, clamp(vUv + vec2( r3.x,  r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2(-r3.x,  r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2( r3.x, -r3.y), 0.001, 0.999)).rgb * 0.035;
    acc += texture2D(tScene, clamp(vUv + vec2(-r3.x, -r3.y), 0.001, 0.999)).rgb * 0.035;

    float lum = luma(acc);
    float knee = 0.26;
    float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee + 0.0001);
    float contrib = max(soft, lum - uThreshold) / max(lum, 0.0001);

    // Cap peak bloom radiance so lamp/headlight halos lift nearby glyphs without solid whitewash
    vec3 extracted = min(acc * clamp(contrib, 0.0, 1.30), vec3(1.12));
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
   * Deterministic flicker-free 2D spatial hash in [-0.5 .. +0.5] anchored to integer cell coordinates.
   * Diversifies glyph selection across flat walls and roads so broad surfaces read as rich ASCII
   * tapestries ('o u s c a $ 8 Q = ~ ^ *') instead of monotonous runs of identical dashes.
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

    vec3 c0 = texture2D(tScene, centerUv).rgb * 0.40;
    vec3 c1 = texture2D(tScene, clamp(centerUv + o1, 0.001, 0.999)).rgb * 0.15;
    vec3 c2 = texture2D(tScene, clamp(centerUv - o1, 0.001, 0.999)).rgb * 0.15;
    vec3 c3 = texture2D(tScene, clamp(centerUv + o2, 0.001, 0.999)).rgb * 0.15;
    vec3 c4 = texture2D(tScene, clamp(centerUv - o2, 0.001, 0.999)).rgb * 0.15;

    return c0 + c1 + c2 + c3 + c4;
  }

  /**
   * Vertical rippled reflection sampler for upward-facing asphalt, sidewalk, and puddle surfaces:
   * Integrates upper-screen radiance & bloom vertically downward with gentle wave oscillation so
   * storefronts, streetlamps, car headlights, and foreground silhouettes cast ASCII-quantized
   * reflections onto the ground plane.
   */
  vec3 sampleGroundReflection(vec2 centerUv, vec2 cellIndex, vec2 cellUvSpan, float upwardMask) {
    if (upwardMask <= 0.01 || uWetness <= 0.01) {
      return vec3(0.0);
    }

    float wavePhase = cellIndex.y * 0.92 + cellIndex.x * 0.21 - uTime * 2.15;
    float rippleX = sin(wavePhase) * cellUvSpan.x * (0.55 + 0.45 * uWetness);
    float rippleBand = 0.72 + 0.28 * sin(cellIndex.y * 1.45 - uTime * 2.8 + cellIndex.x * 0.33);

    vec3 reflAcc = vec3(0.0);
    float weightSum = 0.0;

    for (int i = 1; i <= 4; i++) {
      float fi = float(i);
      float w = 1.0 / (0.85 + fi * 0.65);
      vec2 sampleUv = clamp(
        centerUv + vec2(rippleX * (0.6 + fi * 0.2), fi * cellUvSpan.y * 3.1),
        vec2(0.002),
        vec2(0.998)
      );
      vec3 sCol = texture2D(tScene, sampleUv).rgb;
      vec3 bCol = texture2D(tBloom, sampleUv).rgb;
      reflAcc += (sCol * 0.55 + bCol * 1.15) * w;
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

    // 2. Atmospheric Depth Layering & Far-Plane Softening
    float depthDelta = abs(centerLinDepth - uDofFocus);
    float dofBlurFactor = clamp(depthDelta * uDofStrength * 2.1, 0.0, 0.70) * isGeometry;

    if (dofBlurFactor > 0.02) {
      vec2 blurStep = cellUvSpan * (1.0 + dofBlurFactor * 1.35);
      vec3 farSample = 0.25 * (
        texture2D(tScene, clamp(cellCenterUv + vec2( blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(-blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0,  blurStep.y), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0, -blurStep.y), 0.001, 0.999)).rgb
      );
      sceneCol = mix(sceneCol, farSample, dofBlurFactor * 0.54);
    }

    // Attenuate non-emissive far background structures for crisp foreground/midground/background depth separation
    if (uVolumeWrapStrength > 0.5 && isGeometry > 0.5) {
      float farFade = smoothstep(0.42, 0.92, centerLinDepth) * (1.0 - uDaylight * 0.45);
      float emissiveKeep = smoothstep(0.42, 0.88, getLuma(sceneCol + bloomCol));
      sceneCol *= mix(1.0, 0.64, farFade * (1.0 - emissiveKeep));
    }

    // 3. Dual 3x3 Sobel Edge & Crease Detection (Linear Depth + View-Space Normals)
    vec2 stepUv = (cellSize * 0.82) / uResolution;

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
    float depthEdgeMag = length(vec2(gxD, gyD)) * 11.5;

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
    float normalEdgeMag = length(vec2(gxN, gyN)) * 0.44 * isGeometry;

    float depthCreaseAtten = mix(1.0, 0.38, smoothstep(0.22, 0.82, centerLinDepth));
    float combinedEdge = max(depthEdgeMag, normalEdgeMag * depthCreaseAtten) * uEdgeStrength * (1.0 - dofBlurFactor * 0.55);
    vec2 domGrad = depthEdgeMag >= normalEdgeMag * depthCreaseAtten ? vec2(gxD, gyD) : vec2(gxN, gyN);

    // 4. Reconstruct Upward Surface Mask + Vertical Rippled Ground Reflections + Volume Relief
    vec3 viewN = normalize(nCenterEnc * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    float worldUpY = clamp(viewN.y * uCamPitchCos + viewN.z * uCamPitchSin, -1.0, 1.0);
    float upwardSurfaceMask =
      uVolumeWrapStrength *
      isGeometry *
      smoothstep(0.70, 0.93, worldUpY) *
      (1.0 - smoothstep(0.68, 0.95, centerLinDepth));

    vec3 groundRefl = sampleGroundReflection(cellCenterUv, cellIndex, cellUvSpan, upwardSurfaceMask);

    float zenithCatch = clamp(viewN.y, -0.35, 0.75) * 0.046;
    float grazingRim = pow(1.0 - clamp(abs(viewN.z), 0.0, 1.0), 2.1) * 0.062;
    float volumeRelief = (zenithCatch + grazingRim) * isGeometry * uVolumeWrapStrength;

    // Contained typographic light halo: bloom lifts nearby character indices into bright symbols
    vec3 haloLift = bloomCol * (uBloomIntensity * 0.88);
    vec3 combinedHdr = sceneCol + haloLift + groundRefl * 0.58;

    // Soft-shoulder tone curve compresses bright lamp/headlight peaks smoothly without solid clipping
    vec3 combinedSignal = (combinedHdr / (vec3(1.0) + combinedHdr * 0.38)) * 1.26;

    // Selective chromatic discipline: dark desaturated stone/asphalt base with warm-amber & moss-green accents
    float rawLuma = getLuma(combinedSignal);
    float warmAccentMask = clamp((combinedHdr.r - combinedHdr.b) * 1.65, 0.0, 1.0);
    float foliageMask = clamp((combinedHdr.g - max(combinedHdr.r * 0.92, combinedHdr.b * 0.95)) * 2.4, 0.0, 1.0);
    float baseSatKeep = mix(0.64, 0.94, max(warmAccentMask, foliageMask));
    if (uVolumeWrapStrength > 0.5) {
      combinedSignal = mix(vec3(rawLuma), combinedSignal, baseSatKeep);
    }

    float luma = clamp(pow(clamp(getLuma(combinedSignal), 0.0, 1.0), 0.82) + volumeRelief, 0.0, 1.0);

    // 5. Select Primary Detail ASCII Glyph (Diverse Alphanumeric/Symbolic Ramp vs Sharp Contour)
    float varietyJitter = 0.0;
    if (uVolumeWrapStrength > 0.5) {
      float midtoneEnvelope = smoothstep(0.035, 0.16, luma) * (1.0 - smoothstep(0.86, 0.985, luma));
      float hashVal = glyphVarietyHash(cellIndex + floor(viewN.xy * 5.0));
      // Subtle animated ripple shimmer exclusively on wet ground reflection cells
      float wetRippleShift = upwardSurfaceMask * uWetness * sin(cellIndex.y * 1.3 - uTime * 2.6) * 1.35;
      varietyJitter = (hashVal * 6.4 + wetRippleShift) * midtoneEnvelope;
    }

    float detailTileIndex = floor(luma * (uRampCount - 1.0) + 0.5 + varietyJitter);
    detailTileIndex = clamp(detailTileIndex, 0.0, uRampCount - 1.0);

    // Reserve directional bars ('|' '/' '\' '_') strictly for true silhouettes & sharp 3D creases
    // so broad surfaces never degenerate into long repetitive rows of dashes!
    float edgeThresh = uVolumeWrapStrength > 0.5 ? 0.52 : 0.30;
    bool useStructuralEdge =
      (combinedEdge > edgeThresh) &&
      (luma > 0.04) &&
      (uStructCount >= 4.0) &&
      (upwardSurfaceMask < 0.45);

    if (useStructuralEdge) {
      float tangentAngle = atan(-domGrad.x, domGrad.y);
      float deg = mod(degrees(tangentAngle) + 180.0, 180.0);

      float structOffset = 0.0; // '|'
      if (deg >= 22.5 && deg < 67.5) {
        structOffset = 1.0; // '/'
      } else if (deg >= 67.5 && deg < 112.5) {
        // Only emit '_' on sharp depth silhouettes, keeping horizontal wall bands richly varied
        if (uVolumeWrapStrength < 0.5 || depthEdgeMag > 0.36) {
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

    // 6. GPU Lighten Stipple-Detail Blend (strictly capped to tiers 0..2 so strokes stay crisp)
    float compositeGlyphMask = detailGlyphMask;
    if (uBlockCount >= 3.0 && uBlockBlendWeight > 0.001 && luma > 0.065) {
      float blockTier = clamp(floor(smoothstep(0.08, 0.96, luma) * 3.0), 0.0, min(2.0, uBlockCount - 2.0));
      float blockTileIndex = uRampCount + uStructCount + blockTier;
      float blockMask = sampleAtlasTile(blockTileIndex, glyphUv) * uBlockBlendWeight;
      compositeGlyphMask = max(detailGlyphMask, blockMask);
    }

    // 7. Calibrated Foreground Ink, Contained Amber/Emerald Accents & Dark Terminal Substrate
    vec3 normColor = combinedSignal / max(rawLuma, 0.062);
    normColor = clamp(normColor, vec3(0.18), vec3(1.52));

    vec3 shadowGrade = mix(normColor, uCoolTint * 1.05, 0.26);
    vec3 highlightGrade = mix(normColor, uWarmTint * 1.12, 0.14);
    vec3 charColor = mix(shadowGrade, highlightGrade, smoothstep(0.14, 0.80, luma));

    if (uVolumeWrapStrength > 0.5) {
      // Warm golden-amber ink on storefront lights, streetlamps & headlight halos (Image 2 & 3 reference)
      vec3 amberInk = vec3(1.02, 0.78, 0.44);
      charColor = mix(charColor, mix(charColor, amberInk, 0.48), warmAccentMask * smoothstep(0.24, 0.82, luma));

      // Contained dark-emerald / sage ink on foliage & grass canopies (Image 1, 3 & 4 reference)
      vec3 mossInk = vec3(0.30, 0.62, 0.42);
      charColor = mix(charColor, mix(charColor, mossInk, 0.42), foliageMask * (1.0 - warmAccentMask * 0.7));

      // Crisp ivory-white core on peak light glyphs without losing character legibility
      charColor = mix(charColor, vec3(1.06, 1.02, 0.94), smoothstep(0.80, 0.98, luma) * 0.55);
    }

    if (useStructuralEdge) {
      charColor = mix(charColor, uWarmTint * 1.16, 0.18 * clamp(combinedEdge, 0.0, 1.0));
    }

    float brightness = mix(0.18, 1.24, smoothstep(0.02, 0.94, luma));
    vec3 litGlyph = charColor * brightness * compositeGlyphMask;

    // Deep dark substrate preserves crisp typographic contrast between glyph ink and terminal backdrop
    float substrateLift = mix(0.036, 0.095, uDaylight);
    vec3 smoothBackdrop = mix(uBgColor, uBgColor + combinedSignal * substrateLift, smoothstep(0.04, 0.62, luma));

    vec2 vigUv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vigUv, vigUv) * mix(0.14, 0.06, uDaylight);

    vec3 finalRgb = mix(smoothBackdrop, litGlyph, clamp(compositeGlyphMask, 0.0, 1.0));
    // Restrained glyph-locked halo aura (0.14 ambient + 0.86 glyph-masked so dark background never washes out)
    finalRgb += bloomCol * (uBloomIntensity * mix(0.20, 0.08, uDaylight) * (0.14 + 0.86 * compositeGlyphMask));
    finalRgb *= clamp(vignette, 0.75, 1.0);

    gl_FragColor = vec4(finalRgb, 1.0);
  }
`;
