/**
 * Custom GLSL shaders for the 3D ASCII Post-Processing Pipeline:
 * 1. Bloom Extract & Kawase Blur Shader (warm light bleed across neighboring ASCII cells)
 * 2. High-Resolution Adaptive ASCII Realms Composite Shader:
 *    - Integer physical cell quantization (`uCellSize`) for moiré-free monospace alignment
 *    - 5-tap sub-cell supersampling (`uSubCellSpread`) so specular water glints, distant pines,
 *      and Tux's eyes/beak never shimmer or alias at high resolution
 *    - Depth-of-Field (DoF) focus softening using linearized camera depth buffer
 *    - Sobel luminance + depth discontinuity detection for crisp structural ASCII glyphs (/ \ | _ [ ])
 *    - Sharpened LinearFilter glyph atlas contour sampling (`smoothstep` stem preservation)
 *    - Chromatic preservation + warm torch bloom bleed into neighboring glyphs
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
    // Boost cyberpunk neon emissions (cyan, magenta, amber) equally for vivid halo bleed
    float maxCh = max(color.r, max(color.g, color.b));
    float minCh = min(color.r, min(color.g, color.b));
    float neonChroma = (maxCh - minCh) * 0.62 + maxCh * 0.45;
    float metric = max(luma, neonChroma);
    float knee = uThreshold * 0.45 + 0.0001;
    float soft = clamp(metric - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee);
    float contribution = max(soft, metric - uThreshold) / max(metric, 0.0001);
    return color * clamp(contribution, 0.0, 2.65);
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
  uniform float uSubCellSpread;
  uniform float uTransitionMix;
  uniform float uRampCount;
  uniform float uStructuralCount;
  uniform float uTotalGlyphs;

  uniform float uCameraNear;
  uniform float uCameraFar;
  uniform float uDofFocus;
  uniform float uDofStrength;
  uniform float uEdgeStrength;
  uniform float uBloomIntensity;
  uniform vec3 uBgColor;
  uniform float uTime;

  varying vec2 vUv;

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
   * of a single ASCII character cell so high-DPI 3D geometry & water glints never flicker!
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
    // 1. Center-anchored monospace cell quantization: expands/contracts symmetrically from
    //    viewport center during container resize & fullscreen transitions without corner crawling!
    vec2 halfRes = uResolution * 0.5;
    vec2 centeredPx = vUv * uResolution - halfRes;
    vec2 cellIndex = floor(centeredPx / uCellSize);
    vec2 localCellUv = fract(centeredPx / uCellSize);
    vec2 glyphUv = vec2(localCellUv.x, 1.0 - localCellUv.y);

    vec2 cellCenterUv = clamp(((cellIndex + 0.5) * uCellSize + halfRes) / uResolution, 0.001, 0.999);
    vec2 cellStepUv = uCellSize / uResolution;
    vec2 pixelPos = vUv * uResolution;

    // 2. Depth & Depth-of-Field calculation at the cell center
    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float linearDist = linearizeDepth(rawCenterDepth);
    bool isSky = rawCenterDepth >= 0.9995;

    float focalDiff = abs(linearDist - uDofFocus);
    float coc = clamp((focalDiff - 4.2) / 15.0, 0.0, 1.0) * uDofStrength;
    if (isSky) {
      coc *= 0.35;
    }

    // 3. Sub-cell supersampled color + optional DoF neighbor softening
    vec3 colIntegrated = sampleCellIntegrated(cellCenterUv, cellStepUv, uSubCellSpread);

    vec2 dofSpread = cellStepUv * (0.65 + coc * 1.35);
    vec3 colN = texture2D(tScene, clamp(cellCenterUv + vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colS = texture2D(tScene, clamp(cellCenterUv - vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colE = texture2D(tScene, clamp(cellCenterUv + vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;
    vec3 colW = texture2D(tScene, clamp(cellCenterUv - vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;

    vec3 avgNeighbors = (colN + colS + colE + colW) * 0.25;
    vec3 cellColor = mix(colIntegrated, (colIntegrated * 0.38 + avgNeighbors * 0.62), coc);

    // 4. Sample multi-tap bloom buffer (allows warm light to bleed across adjacent ASCII cells)
    vec3 bloomCell = texture2D(tBloom, cellCenterUv).rgb;
    vec3 bloomSmooth = texture2D(tBloom, vUv).rgb;
    vec3 bloomBleed = (bloomCell * 0.68 + bloomSmooth * 0.32) * uBloomIntensity;

    vec3 litCellColor = cellColor + bloomBleed * 0.82;
    float luma = getLuma(litCellColor);

    // Subtle organic dither so shadow gradients transition naturally without banding
    float dither = (hash12(cellIndex) - 0.5) * 0.026;
    float perceivedLuma = clamp(pow(max(luma, 0.0), 0.80) + dither, 0.0, 1.0);

    // 5. Resolution-invariant Structural Edge Detection (Sobel on depth + luminance across 1 cell step)
    float dN = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dS = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dE = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);
    float dW = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);

    float lN = getLuma(texture2D(tScene, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).rgb);
    float lS = getLuma(texture2D(tScene, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).rgb);
    float lE = getLuma(texture2D(tScene, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).rgb);
    float lW = getLuma(texture2D(tScene, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).rgb);

    float normScale = 1.0 / max(linearDist, 1.8);
    float gxDepth = (dE - dW) * normScale * 4.0;
    float gyDepth = (dN - dS) * normScale * 4.0;
    float gxLuma = (lE - lW) * 1.65;
    float gyLuma = (lN - lS) * 1.65;

    float gx = abs(gxDepth) > abs(gxLuma) ? gxDepth : gxLuma;
    float gy = abs(gyDepth) > abs(gyLuma) ? gyDepth : gyLuma;
    float edgeMag = length(vec2(gx, gy));

    float effectiveEdge = edgeMag * uEdgeStrength * (1.0 - coc * 0.82) * smoothstep(0.03, 0.13, perceivedLuma);

    // 6. Select glyph index in the 1D horizontal atlas
    float glyphIndex = floor(perceivedLuma * (uRampCount - 0.001));

    // Directional structural silhouette glyphs: [0]='/' [1]='\\' [2]='|' [3]='_' [4]='[' [5]=']'
    if (effectiveEdge > 0.32 && uStructuralCount >= 6.0 && !isSky) {
      float absGx = abs(gx);
      float absGy = abs(gy);
      float structOffset = 2.0;

      if (absGy > absGx * 2.0) {
        structOffset = 3.0; // '_'
      } else if (absGx > absGy * 2.0) {
        if (gxDepth > 0.20) {
          structOffset = 4.0; // '['
        } else if (gxDepth < -0.20) {
          structOffset = 5.0; // ']'
        } else {
          structOffset = 2.0; // '|'
        }
      } else {
        structOffset = (gx * gy < 0.0) ? 0.0 : 1.0; // '/' or '\\'
      }

      glyphIndex = uRampCount + clamp(structOffset, 0.0, uStructuralCount - 1.0);
    }

    // 7. Sample high-DPI glyph mask with adaptive contour sharpening (keeps stems crisp at any cell size!)
    float clampedLocalX = clamp(glyphUv.x, 0.05, 0.95);
    float clampedLocalY = clamp(glyphUv.y, 0.05, 0.95);
    float atlasU = (glyphIndex + clampedLocalX) / uTotalGlyphs;
    float rawMask = texture2D(tGlyphAtlas, vec2(atlasU, clampedLocalY)).r;

    // Adaptive edge sharpness based on physical cell height + subtle softening during active resize transition
    float aaWidth = clamp(1.35 / max(uCellSize.y, 6.0) + uTransitionMix * 0.06, 0.06, 0.28);
    float glyphMask = smoothstep(0.46 - aaWidth, 0.46 + aaWidth, rawMask);

    // 8. High-contrast Cyberpunk neon color grading & atmospheric bloom aura
    float rawLuma = max(getLuma(litCellColor), 0.0001);
    vec3 normalizedHue = litCellColor / rawLuma;
    float boostedBrightness = mix(perceivedLuma, min(1.52, rawLuma * 1.56 + 0.07), 0.74);
    vec3 glyphColor = normalizedHue * boostedBrightness;

    glyphColor = min(glyphColor, vec3(1.55, 1.48, 1.58));

    vec3 cellBackdrop = uBgColor + bloomSmooth * (0.26 * uBloomIntensity) + cellColor * 0.038;
    float phosphor = 0.972 + 0.028 * sin(pixelPos.y * 3.14159265);

    vec3 finalColor = mix(cellBackdrop, glyphColor * phosphor, glyphMask);

    vec2 centeredUv = vUv - 0.5;
    float vignette = 1.0 - dot(centeredUv, centeredUv) * 0.40;
    finalColor = mix(uBgColor, finalColor, clamp(vignette, 0.56, 1.0));

    finalColor = finalColor / (1.0 + finalColor * 0.18);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
