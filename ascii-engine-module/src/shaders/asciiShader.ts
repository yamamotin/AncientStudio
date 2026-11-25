/**
 * Modern Full-Screen 3D-Wrapping ASCII Post-Processing Shader Pipeline (`asciiShader.ts`):
 * - Multi-tap sub-cell supersampling (`sampleCellIntegrated`) prevents subpixel aliasing across
 *   dense architectural textures, vehicle bodywork, and character geometry.
 * - Linearized view-space depth (`linearizeDepth` via `uCameraNear` / `uCameraFar`) + dual 3x3
 *   Sobel operator across both Linear Depth and View-Space Normals (`tNormal`) wraps 3D volumes
 *   (buildings, illuminated passing car, and character) in crisp directional structural contours
 *   (`| / \ _`) at both foreground and background distances.
 * - View-space normal curvature relief (`uVolumeWrapStrength`) modulates glyph density subtly
 *   along 3D surface orientation so objects read as cohesive 3D ASCII volumes.
 * - Soft-shoulder highlight tone-mapping + contained chroma guardrail prevents blown-out blocks
 *   (solid full-fill block tier never emitted) and prevents oversaturation, preserving the portfolio's
 *   sober Cyber-Noir + Entropism aesthetic.
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
    // 9-tap soft box downsample + soft-knee luminance extraction
    vec3 acc = vec3(0.0);
    acc += texture2D(tScene, vUv).rgb * 0.25;
    acc += texture2D(tScene, vUv + vec2( uTexelSize.x,  uTexelSize.y)).rgb * 0.125;
    acc += texture2D(tScene, vUv + vec2(-uTexelSize.x,  uTexelSize.y)).rgb * 0.125;
    acc += texture2D(tScene, vUv + vec2( uTexelSize.x, -uTexelSize.y)).rgb * 0.125;
    acc += texture2D(tScene, vUv + vec2(-uTexelSize.x, -uTexelSize.y)).rgb * 0.125;
    acc += texture2D(tScene, vUv + vec2( uTexelSize.x * 2.0, 0.0)).rgb * 0.0625;
    acc += texture2D(tScene, vUv + vec2(-uTexelSize.x * 2.0, 0.0)).rgb * 0.0625;
    acc += texture2D(tScene, vUv + vec2(0.0,  uTexelSize.y * 2.0)).rgb * 0.0625;
    acc += texture2D(tScene, vUv + vec2(0.0, -uTexelSize.y * 2.0)).rgb * 0.0625;

    float lum = luma(acc);
    float knee = 0.24;
    float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee + 0.0001);
    float contrib = max(soft, lum - uThreshold) / max(lum, 0.0001);

    // Cap extracted bloom peak so bright car headlights stay atmospheric without blowing out glyphs
    vec3 extracted = min(acc * clamp(contrib, 0.0, 1.25), vec3(1.15));
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

    // 2. Depth-of-Field softening at extreme background depths
    float depthDelta = abs(centerLinDepth - uDofFocus);
    float dofBlurFactor = clamp(depthDelta * uDofStrength * 2.2, 0.0, 0.72) * isGeometry;

    if (dofBlurFactor > 0.02) {
      vec2 blurStep = cellUvSpan * (1.0 + dofBlurFactor * 1.4);
      vec3 farSample = 0.25 * (
        texture2D(tScene, clamp(cellCenterUv + vec2( blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(-blurStep.x, 0.0), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0,  blurStep.y), 0.001, 0.999)).rgb +
        texture2D(tScene, clamp(cellCenterUv + vec2(0.0, -blurStep.y), 0.001, 0.999)).rgb
      );
      sceneCol = mix(sceneCol, farSample, dofBlurFactor * 0.58);
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
    float normalEdgeMag = length(vec2(gxN, gyN)) * 0.48 * isGeometry;

    // Attenuate internal normal creases gently at far distance so skyline stays clean
    float depthCreaseAtten = mix(1.0, 0.42, smoothstep(0.25, 0.85, centerLinDepth));
    float combinedEdge = max(depthEdgeMag, normalEdgeMag * depthCreaseAtten) * uEdgeStrength * (1.0 - dofBlurFactor * 0.55);

    // Choose dominant gradient axis so structural glyph ('|' '/' '\' '_') wraps along the true 3D contour
    vec2 domGrad = depthEdgeMag >= normalEdgeMag * depthCreaseAtten ? vec2(gxD, gyD) : vec2(gxN, gyN);

    // 4. 3D Surface-Normal Curvature Relief + Soft-Shoulder Tone Mapping (Zero Blowout)
    vec3 viewN = normalize(nCenterEnc * 2.0 - 1.0 + vec3(0.0, 0.0, 0.0001));
    float zenithCatch = clamp(viewN.y, -0.35, 0.75) * 0.048;
    float grazingRim = pow(1.0 - clamp(abs(viewN.z), 0.0, 1.0), 2.1) * 0.058;
    float volumeRelief = (zenithCatch + grazingRim) * isGeometry * uVolumeWrapStrength;

    vec3 combinedHdr = sceneCol + bloomCol * (uBloomIntensity * 0.55);

    // Soft-shoulder tone curve compresses bright SpotLight/PBR peaks smoothly without clipping
    vec3 combinedSignal = (combinedHdr / (vec3(1.0) + combinedHdr * 0.40)) * 1.24;

    // Contained saturation guardrail: keep colors sober and prevent neon/texture oversaturation
    float rawLuma = getLuma(combinedSignal);
    float maxChroma = mix(0.46, 0.32, smoothstep(0.45, 0.92, rawLuma));
    combinedSignal = mix(vec3(rawLuma), combinedSignal, uVolumeWrapStrength > 0.5 ? (1.0 - (1.0 - maxChroma) * 0.45) : 1.0);

    float luma = clamp(pow(clamp(getLuma(combinedSignal), 0.0, 1.0), 0.84) + volumeRelief, 0.0, 1.0);

    // 5. Select Primary Detail ASCII Glyph (Luminance Ramp vs Directional Structural Contour)
    float detailTileIndex = floor(luma * (uRampCount - 1.0) + 0.5);
    detailTileIndex = clamp(detailTileIndex, 0.0, uRampCount - 1.0);

    bool useStructuralEdge = (combinedEdge > 0.30) && (luma > 0.032) && (uStructCount >= 4.0);
    if (useStructuralEdge) {
      float tangentAngle = atan(-domGrad.x, domGrad.y);
      float deg = mod(degrees(tangentAngle) + 180.0, 180.0);

      float structOffset = 0.0; // '|'
      if (deg >= 22.5 && deg < 67.5) {
        structOffset = 1.0; // '/'
      } else if (deg >= 67.5 && deg < 112.5) {
        structOffset = 3.0; // '_'
      } else if (deg >= 112.5 && deg < 157.5) {
        structOffset = 2.0; // '\'
      }
      detailTileIndex = uRampCount + min(structOffset, uStructCount - 1.0);
    }

    float detailGlyphMask = sampleAtlasTile(detailTileIndex, glyphUv);

    // 6. GPU Lighten Stipple-Detail Blend (strictly capped to tiers 0..2 so strokes never wash out)
    float compositeGlyphMask = detailGlyphMask;
    if (uBlockCount >= 3.0 && uBlockBlendWeight > 0.001 && luma > 0.055) {
      float blockTier = clamp(floor(smoothstep(0.06, 0.96, luma) * 3.0), 0.0, min(2.0, uBlockCount - 2.0));
      float blockTileIndex = uRampCount + uStructCount + blockTier;
      float blockMask = sampleAtlasTile(blockTileIndex, glyphUv) * uBlockBlendWeight;
      compositeGlyphMask = max(detailGlyphMask, blockMask);
    }

    // 7. Calibrated Foreground Ink & Dark Terminal Substrate
    vec3 normColor = combinedSignal / max(rawLuma, 0.065);
    normColor = clamp(normColor, vec3(0.18), vec3(1.42));

    vec3 shadowGrade = mix(normColor, uCoolTint * 1.08, 0.24);
    vec3 highlightGrade = mix(normColor, uWarmTint * 1.12, 0.16);
    vec3 charColor = mix(shadowGrade, highlightGrade, smoothstep(0.16, 0.80, luma));

    if (useStructuralEdge) {
      charColor = mix(charColor, uWarmTint * 1.16, 0.20 * clamp(combinedEdge, 0.0, 1.0));
    }

    float brightness = mix(0.20, 1.18, smoothstep(0.02, 0.94, luma));
    vec3 litGlyph = charColor * brightness * compositeGlyphMask;

    // Dark substrate preserves clear separation between glyph ink and terminal backdrop
    float substrateLift = mix(0.045, 0.105, uDaylight);
    vec3 smoothBackdrop = mix(uBgColor, uBgColor + combinedSignal * substrateLift, smoothstep(0.03, 0.58, luma));

    vec2 vigUv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - dot(vigUv, vigUv) * mix(0.13, 0.06, uDaylight);

    vec3 finalRgb = mix(smoothBackdrop, litGlyph, clamp(compositeGlyphMask, 0.0, 1.0));
    finalRgb += bloomCol * (uBloomIntensity * mix(0.16, 0.08, uDaylight) * (0.28 + 0.72 * compositeGlyphMask));
    finalRgb *= clamp(vignette, 0.76, 1.0);

    gl_FragColor = vec4(finalRgb, 1.0);
  }
`;
