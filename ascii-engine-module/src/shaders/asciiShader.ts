/**
 * Custom GLSL shaders for the 3D ASCII Post-Processing Pipeline:
 * 1. Bloom Extract & Kawase Blur Shader (vivid neon/solar atmospheric bleed across neighboring cells)
 * 2. Seamless Grid-Free Adaptive ASCII Composite Shader with GPU Lighten Block-Detail Blend:
 *    - Integer-snapped center-anchored monospace cell quantization using hardware gl_FragCoord.xy
 *      and floor(uResolution * 0.5) so odd/fractional viewports never create boundary cracks
 *    - Exact half-texel atlas UV seam guard (0.5 / uAtlasTileSize) eliminating neighbor bleed AND
 *      artificial border padding/margins
 *    - Continuous screen-space atmospheric backdrop & gutter-free ~35% lighten block mass so ASCII
 *      characters flow continuously without any checkered grid between cells
 *    - Adaptive daylight vs nocturnal contrast curve supporting Day, Night, and Rain modes cleanly.
 */

export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const BLOOM_DOWNSAMPLE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D tScene;
  uniform vec2 uTexelSize;
  uniform float uThreshold;
  uniform float uTime;

  varying vec2 vUv;

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  vec3 extractBright(vec3 color) {
    float luma = getLuma(color);
    float maxCh = max(color.r, max(color.g, color.b));
    float minCh = min(color.r, min(color.g, color.b));
    float neonChroma = (maxCh - minCh) * 0.66 + maxCh * 0.46;
    float metric = max(luma, neonChroma);
    float knee = uThreshold * 0.45 + 0.0001;
    float soft = clamp(metric - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee);
    float contribution = max(soft, metric - uThreshold) / max(metric, 0.0001);
    return color * clamp(contribution, 0.0, 2.8);
  }

  void main() {
    vec2 d = uTexelSize * 1.75;
    vec3 sum = extractBright(texture2D(tScene, vUv).rgb) * 0.28;
    sum += extractBright(texture2D(tScene, vUv + vec2( d.x,  d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2(-d.x,  d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2( d.x, -d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2(-d.x, -d.y)).rgb) * 0.12;
    sum += extractBright(texture2D(tScene, vUv + vec2( d.x * 2.2, 0.0)).rgb) * 0.06;
    sum += extractBright(texture2D(tScene, vUv + vec2(-d.x * 2.2, 0.0)).rgb) * 0.06;
    sum += extractBright(texture2D(tScene, vUv + vec2(0.0,  d.y * 2.2)).rgb) * 0.06;
    sum += extractBright(texture2D(tScene, vUv + vec2(0.0, -d.y * 2.2)).rgb) * 0.06;

    gl_FragColor = vec4(sum, 1.0);
  }
`;

export const BLOOM_BLUR_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D tInput;
  uniform vec2 uTexelSize;
  uniform vec2 uDirection;

  varying vec2 vUv;

  void main() {
    vec2 off1 = vec2(1.3846153846) * uDirection * uTexelSize;
    vec2 off2 = vec2(3.2307692308) * uDirection * uTexelSize;
    vec2 off3 = vec2(5.4000000000) * uDirection * uTexelSize;

    vec3 color = texture2D(tInput, vUv).rgb * 0.204;
    color += texture2D(tInput, vUv + off1).rgb * 0.244;
    color += texture2D(tInput, vUv - off1).rgb * 0.244;
    color += texture2D(tInput, vUv + off2).rgb * 0.112;
    color += texture2D(tInput, vUv - off2).rgb * 0.112;
    color += texture2D(tInput, vUv + off3).rgb * 0.042;
    color += texture2D(tInput, vUv - off3).rgb * 0.042;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const ASCII_COMPOSITE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tDepth;
  uniform sampler2D tBloom;
  uniform sampler2D tGlyphAtlas;

  uniform vec2 uResolution;
  uniform vec2 uCellSize;
  uniform vec2 uAtlasTileSize;
  uniform float uSubCellSpread;
  uniform float uTransitionMix;
  uniform float uRampCount;
  uniform float uStructuralCount;
  uniform float uBlockCount;
  uniform float uTotalGlyphs;

  uniform float uCameraNear;
  uniform float uCameraFar;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uEdgeStrength;
  uniform float uBlockBlendWeight;
  uniform float uBloomIntensity;
  uniform float uDaylight;
  uniform float uMascotStudio;
  uniform vec3 uBgColor;
  uniform float uTime;

  varying vec2 vUv;

  vec3 linearToSrgb(vec3 c) {
    vec3 safe = max(c, vec3(0.0));
    vec3 lo = safe * 12.92;
    vec3 hi = 1.055 * pow(safe, vec3(1.0 / 2.4)) - 0.055;
    return mix(lo, hi, step(vec3(0.0031308), safe));
  }

  float linearizeDepth(float rawDepth) {
    float zNdc = rawDepth * 2.0 - 1.0;
    return (2.0 * uCameraNear * uCameraFar) /
           (uCameraFar + uCameraNear - zNdc * (uCameraFar - uCameraNear));
  }

  float getLuma(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
  }

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  /**
   * 5-tap sub-cell rotated-grid supersampling: integrates scene radiance across the footprint
   * of a single ASCII character cell so high-DPI 3D geometry, rain & street glints never flicker.
   */
  vec3 sampleCellIntegrated(vec2 centerUv, vec2 cellStepUv, float spread) {
    vec2 ox = vec2(cellStepUv.x * spread, cellStepUv.y * spread * 0.5);
    vec2 oy = vec2(-cellStepUv.x * spread * 0.5, cellStepUv.y * spread);

    vec3 c0 = texture2D(tScene, centerUv).rgb * 0.36;
    vec3 c1 = texture2D(tScene, clamp(centerUv + ox, 0.001, 0.999)).rgb * 0.16;
    vec3 c2 = texture2D(tScene, clamp(centerUv - ox, 0.001, 0.999)).rgb * 0.16;
    vec3 c3 = texture2D(tScene, clamp(centerUv + oy, 0.001, 0.999)).rgb * 0.16;
    vec3 c4 = texture2D(tScene, clamp(centerUv - oy, 0.001, 0.999)).rgb * 0.16;
    return c0 + c1 + c2 + c3 + c4;
  }

  void main() {
    // 1. Integer-aligned center-anchored cell quantization:
    //    - floor(uResolution * 0.5) guarantees pixel centers (gl_FragCoord.xy = k + 0.5) never land
    //      on exact integer 0.0 cell borders even when physicalWidth/Height is odd.
    //    - Once resize transitions settle (uTransitionMix <= 0.001), activeCell snaps to exact integers.
    vec2 halfRes = floor(uResolution * 0.5);
    vec2 activeCell = uTransitionMix > 0.001 ? uCellSize : max(vec2(4.0), floor(uCellSize + 0.5));
    vec2 centeredPx = gl_FragCoord.xy - halfRes;
    vec2 cellCoord = centeredPx / activeCell;
    vec2 cellIndex = floor(cellCoord);
    vec2 localCellUv = fract(cellCoord);
    vec2 glyphUv = vec2(localCellUv.x, 1.0 - localCellUv.y);

    vec2 cellCenterUv = clamp(((cellIndex + 0.5) * activeCell + halfRes) / uResolution, 0.001, 0.999);
    vec2 cellStepUv = activeCell / uResolution;

    // 2. Depth & Depth-of-Field calculation at the cell center
    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float linearDist = linearizeDepth(rawCenterDepth);
    bool isSky = rawCenterDepth >= 0.9995;

    float focalDiff = abs(linearDist - uDofFocus);
    float coc = clamp((focalDiff - 5.2) / 18.0, 0.0, 1.0) * uDofStrength;
    if (isSky) {
      coc *= 0.30;
    }

    // 3. Sub-cell supersampled color + optional DoF neighbor softening
    vec3 colIntegrated = sampleCellIntegrated(cellCenterUv, cellStepUv, uSubCellSpread);

    vec2 dofSpread = cellStepUv * (0.65 + coc * 1.25);
    vec3 colN = texture2D(tScene, clamp(cellCenterUv + vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colS = texture2D(tScene, clamp(cellCenterUv - vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colE = texture2D(tScene, clamp(cellCenterUv + vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;
    vec3 colW = texture2D(tScene, clamp(cellCenterUv - vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;

    vec3 avgNeighbors = (colN + colS + colE + colW) * 0.25;
    vec3 cellColor = mix(colIntegrated, (colIntegrated * 0.45 + avgNeighbors * 0.55), coc);

    // 4. Sample multi-tap bloom buffer
    vec3 bloomCell = texture2D(tBloom, cellCenterUv).rgb;
    vec3 bloomSmooth = texture2D(tBloom, vUv).rgb;
    vec3 bloomBleed = (bloomCell * 0.62 + bloomSmooth * 0.38) * uBloomIntensity;

    vec3 litCellColor = cellColor + bloomBleed * 0.85;
    float luma = getLuma(litCellColor);
    float peakCh = max(litCellColor.r, max(litCellColor.g, litCellColor.b));

    // Perceptual luminance curve: preserves shadow contrast in Day mode while lifting saturated neon in Night/Rain
    float chromaLift = mix(0.38, 0.18, uDaylight);
    float gammaExp = mix(0.74, 0.86, uDaylight);
    float neonLuma = mix(luma, peakCh, chromaLift);
    float dither = (hash12(cellIndex) - 0.5) * 0.02;
    float perceivedLuma = clamp(pow(max(neonLuma, 0.0), gammaExp) + dither, 0.0, 1.0);

    // 5. Resolution-invariant Structural Edge Detection (Sobel on depth + luminance across 1 cell step)
    float dN = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dS = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dE = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);
    float dW = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);

    float lN = getLuma(texture2D(tScene, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).rgb);
    float lS = getLuma(texture2D(tScene, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).rgb);
    float lE = getLuma(texture2D(tScene, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).rgb);
    float lW = getLuma(texture2D(tScene, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).rgb);

    float normScale = 1.0 / max(linearDist, 1.6);
    float gxDepth = (dE - dW) * normScale * 4.2;
    float gyDepth = (dN - dS) * normScale * 4.2;
    float gxLuma = (lE - lW) * 1.82;
    float gyLuma = (lN - lS) * 1.82;

    float gx = abs(gxDepth) > abs(gxLuma) ? gxDepth : gxLuma;
    float gy = abs(gyDepth) > abs(gyLuma) ? gyDepth : gyLuma;
    float edgeMag = length(vec2(gx, gy));

    // Adaptive compact-grid silhouette boost so smaller viewports keep sharp outlines
    float gridColsApprox = uResolution.x / max(activeCell.x, 4.0);
    float compactEdgeBoost = mix(1.22, 1.0, clamp((gridColsApprox - 48.0) / 72.0, 0.0, 1.0));
    float effectiveEdge = edgeMag * uEdgeStrength * compactEdgeBoost * (1.0 - coc * 0.78) * smoothstep(0.025, 0.12, perceivedLuma);

    // 6. Select fine typographic glyph index in the 1D horizontal atlas
    float glyphIndex = floor(perceivedLuma * (uRampCount - 0.001));

    // Directional structural silhouette glyphs: [0]='/' [1]='\\' [2]='|' [3]='_' [4]='[' [5]=']'
    if (effectiveEdge > 0.27 && uStructuralCount >= 6.0 && !isSky) {
      float absGx = abs(gx);
      float absGy = abs(gy);
      float structOffset = 2.0;

      if (absGy > absGx * 1.95) {
        structOffset = 3.0; // '_'
      } else if (absGx > absGy * 1.95) {
        if (gxDepth > 0.18) {
          structOffset = 4.0; // '['
        } else if (gxDepth < -0.18) {
          structOffset = 5.0; // ']'
        } else {
          structOffset = 2.0; // '|'
        }
      } else {
        structOffset = (gx * gy < 0.0) ? 0.0 : 1.0; // '/' or '\\'
      }

      glyphIndex = uRampCount + clamp(structOffset, 0.0, uStructuralCount - 1.0);
    }

    // 7. Exact half-texel UV seam guard (0.5 / uAtlasTileSize):
    //    Eliminates neighbor glyph bleed while preserving 100% edge-to-edge full-bleed block continuity (zero cell border gap!)
    vec2 safeTileDims = max(uAtlasTileSize, vec2(32.0, 48.0));
    vec2 halfTexel = 0.55 / safeTileDims;
    vec2 safeGlyphUv = clamp(glyphUv, halfTexel, vec2(1.0) - halfTexel);

    float aaWidth = clamp(1.25 / max(activeCell.y, 6.0) + uTransitionMix * 0.06, 0.055, 0.24);
    float detailAtlasU = (glyphIndex + safeGlyphUv.x) / uTotalGlyphs;
    float rawDetailMask = texture2D(tGlyphAtlas, vec2(detailAtlasU, safeGlyphUv.y)).r;
    float detailGlyphMask = smoothstep(0.44 - aaWidth, 0.44 + aaWidth, rawDetailMask);

    // Continuous screen-space radiance for seamless block-layer & backdrop (zero rectangular cell stepping!)
    vec3 smoothSceneCol = texture2D(tScene, vUv).rgb;
    vec3 pixelLitCol = smoothSceneCol + bloomSmooth * (0.48 * uBloomIntensity);
    float continuousLuma = clamp(pow(max(getLuma(pixelLitCol), 0.0), gammaExp), 0.0, 1.15);

    // Single-pass GPU lighten block composition using gutter-free full-bleed block tiles
    float blockPresence = smoothstep(0.08, 0.86, continuousLuma) * (isSky ? mix(0.22, 0.48, uDaylight) : 1.0);
    float blockTier = floor(clamp((perceivedLuma - 0.06) / 0.86, 0.0, 0.999) * max(uBlockCount, 1.0));
    float blockIndex = uRampCount + uStructuralCount + blockTier;
    float blockAtlasU = (blockIndex + safeGlyphUv.x) / uTotalGlyphs;
    float rawBlockMask = uBlockCount > 0.5 ? texture2D(tGlyphAtlas, vec2(blockAtlasU, safeGlyphUv.y)).r : 0.0;
    float sharpBlockMask = smoothstep(0.36 - aaWidth, 0.36 + aaWidth, rawBlockMask);

    float weightedBlockLayer = sharpBlockMask * blockPresence * uBlockBlendWeight * clamp(continuousLuma + 0.18, 0.25, 1.12);
    float compositeMask = max(detailGlyphMask, clamp(weightedBlockLayer, 0.0, 0.88));

    // 8. Color grading & continuous smooth backdrop (completely free of per-cell square borders!)
    float rawLuma = max(getLuma(litCellColor), 0.0001);
    vec3 normalizedHue = litCellColor / rawLuma;
    float boostGain = mix(1.64, 1.38, uDaylight);
    float boostedBrightness = mix(perceivedLuma, min(1.68, rawLuma * boostGain + 0.10), 0.78);
    vec3 glyphColor = normalizedHue * boostedBrightness;

    float hotCore = smoothstep(0.76, 1.32, peakCh);
    glyphColor = mix(glyphColor, vec3(1.42, 1.46, 1.52), hotCore * 0.30);
    glyphColor = min(glyphColor, vec3(1.68, 1.62, 1.72));

    vec3 blockTone = glyphColor * 0.88 + bloomSmooth * (0.16 * uBloomIntensity);
    vec3 litForeground = mix(blockTone, glyphColor, clamp(detailGlyphMask * 1.15, 0.0, 1.0));

    // Continuous smooth backdrop (uses unquantized smoothSceneCol + bloomSmooth so zero grid squares appear!)
    vec3 smoothBackdrop =
      uBgColor +
      bloomSmooth * (0.26 * uBloomIntensity) +
      smoothSceneCol * (0.08 + uBlockBlendWeight * 0.08);

    vec3 finalColor = mix(smoothBackdrop, litForeground, compositeMask);

    vec2 centeredUv = vUv - 0.5;
    float vignette = 1.0 - dot(centeredUv, centeredUv) * mix(0.30, 0.18, uDaylight);
    finalColor = mix(uBgColor, finalColor, clamp(vignette, 0.66, 1.0));

    finalColor = finalColor / (1.0 + finalColor * 0.15);

    if (uMascotStudio > 0.5) {
      // Faithful color-theory studio compositing for [ STACK // NEOFETCH ]:
      // - Backdrop (#13222E, luma ~0.124) & Floor (#1D2B36, luma ~0.160, shadow ~0.106) stay clean & true
      // - Tux's charcoal coat (luma ~0.043 < #13222E) stays deeper than the backdrop with crisp ASCII contours
      // - Tux's snow-white belly & warm amber beak/feet (luma > 0.30) pop with modeled ASCII glyph detail
      vec3 surfaceSrgb = linearToSrgb(smoothSceneCol);
      vec3 cellSrgb = linearToSrgb(colIntegrated);
      vec3 bloomSrgb = linearToSrgb(bloomSmooth) * (0.16 * uBloomIntensity);
      float cellLumaSrgb = getLuma(cellSrgb);
      float edgeAccent = clamp(effectiveEdge * 1.35, 0.0, 1.0);

      // 1. Calm, low-contrast typographic texture on #13222E backdrop & #1D2B36 floor (shadow + reflection intact)
      vec3 studioStageCol = mix(surfaceSrgb * 0.97, surfaceSrgb * 1.04, detailGlyphMask * 0.34);

      // 2. Tux's dark obsidian coat (strictly darker than #13222E backdrop & floor shadow)
      float darkCoatMask = 1.0 - smoothstep(0.055, 0.092, cellLumaSrgb);
      vec3 darkCoatBase = surfaceSrgb * 0.86;
      vec3 darkCoatGlyph = surfaceSrgb + vec3(0.038, 0.058, 0.076) * (0.52 + edgeAccent * 0.88);
      vec3 darkSubjectCol = mix(darkCoatBase, darkCoatGlyph, clamp(detailGlyphMask * 0.86, 0.0, 1.0));

      // 3. Tux's bright belly, rim-lit contour & warm complementary amber beak/feet
      float brightFeatureMask = smoothstep(0.24, 0.42, cellLumaSrgb);
      vec3 brightBase = mix(surfaceSrgb * 0.80, cellSrgb * 0.88, 0.5);
      vec3 brightGlyph = min(vec3(1.0), cellSrgb * 1.05 + bloomSrgb);
      vec3 brightSubjectCol = mix(brightBase, brightGlyph, clamp(compositeMask * 1.06, 0.0, 1.0));

      vec3 studioFinal = mix(studioStageCol, darkSubjectCol, darkCoatMask);
      studioFinal = mix(studioFinal, brightSubjectCol, brightFeatureMask);
      studioFinal += bloomSrgb * 0.30;

      float studioVignette = 1.0 - dot(centeredUv, centeredUv) * 0.06;
      finalColor = clamp(studioFinal * studioVignette, 0.0, 1.0);
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
