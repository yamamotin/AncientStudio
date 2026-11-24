/**
 * Custom GLSL shaders for the 3D ASCII Post-Processing Pipeline:
 * 1. Bloom Extract & Kawase Blur Shader (warm light bleed across neighboring ASCII cells)
 * 2. ASCII Realms Composite Shader:
 *    - Cell quantization in physical viewport coordinates
 *    - Depth-of-Field (DoF) focus softening using linearized camera depth buffer
 *    - Sobel luminance + depth discontinuity detection for structural ASCII glyphs (/ \ | _ [ ])
 *    - Calibrated perceptual luminance -> glyph atlas lookup
 *    - Chromatic preservation + warm torch bloom bleed into neighboring glyphs and subtle cell aura
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
    // Boost warm amber/orange emissions slightly for torch/lantern glow
    float warmth = max(0.0, color.r - color.b * 0.65);
    float metric = max(luma, warmth * 0.95);
    float knee = uThreshold * 0.45 + 0.0001;
    float soft = clamp(metric - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee);
    float contribution = max(soft, metric - uThreshold) / max(metric, 0.0001);
    return color * clamp(contribution, 0.0, 2.5);
  }

  void main() {
    // 9-tap tent/Kawase hybrid kernel for smooth wide bloom spread across ASCII cells
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

  void main() {
    // 1. Quantize screen space into discrete monospace character cells
    vec2 pixelPos = vUv * uResolution;
    vec2 cellIndex = floor(pixelPos / uCellSize);
    vec2 localCellUv = fract(pixelPos / uCellSize);
    // Flip Y inside cell so Canvas2D top-down glyphs render upright in WebGL bottom-up UV space
    vec2 glyphUv = vec2(localCellUv.x, 1.0 - localCellUv.y);

    vec2 cellCenterUv = (cellIndex + 0.5) * uCellSize / uResolution;
    vec2 cellStepUv = uCellSize / uResolution;

    // 2. Depth & Depth-of-Field calculation at the cell center
    float rawCenterDepth = texture2D(tDepth, cellCenterUv).r;
    float linearDist = linearizeDepth(rawCenterDepth);
    bool isSky = rawCenterDepth >= 0.9995;

    // Circle of confusion (CoC): foreground silhouettes (< 7.5u) & distant horizon (> 24u) soften
    float focalDiff = abs(linearDist - uDofFocus);
    float coc = clamp((focalDiff - 4.2) / 15.0, 0.0, 1.0) * uDofStrength;
    if (isSky) {
      coc *= 0.35; // Keep ASCII stars crisp in the night sky
    }

    // 3. Sample scene color with DoF spread across neighboring cells
    vec2 dofSpread = cellStepUv * (0.32 + coc * 1.45);
    vec3 colCenter = texture2D(tScene, cellCenterUv).rgb;
    vec3 colN = texture2D(tScene, clamp(cellCenterUv + vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colS = texture2D(tScene, clamp(cellCenterUv - vec2(0.0, dofSpread.y), 0.001, 0.999)).rgb;
    vec3 colE = texture2D(tScene, clamp(cellCenterUv + vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;
    vec3 colW = texture2D(tScene, clamp(cellCenterUv - vec2(dofSpread.x, 0.0), 0.001, 0.999)).rgb;

    vec3 avgNeighbors = (colN + colS + colE + colW) * 0.25;
    vec3 cellColor = mix(colCenter, (colCenter * 0.35 + avgNeighbors * 0.65), coc);

    // 4. Sample multi-tap bloom buffer (allows warm light to bleed across adjacent ASCII cells)
    vec3 bloomCell = texture2D(tBloom, cellCenterUv).rgb;
    vec3 bloomSmooth = texture2D(tBloom, vUv).rgb;
    vec3 bloomBleed = (bloomCell * 0.68 + bloomSmooth * 0.32) * uBloomIntensity;

    // Effective lit color of this ASCII cell (scene + bled light)
    vec3 litCellColor = cellColor + bloomBleed * 0.82;
    float luma = getLuma(litCellColor);

    // Subtle organic dither so shadow gradients transition through ':', '-', '=' naturally
    float dither = (hash12(cellIndex) - 0.5) * 0.032;
    float perceivedLuma = clamp(pow(max(luma, 0.0), 0.82) + dither, 0.0, 1.0);

    // 5. Structural Edge Detection (Sobel on depth + luminance across neighboring cells)
    float dN = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dS = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(0.0, cellStepUv.y), 0.001, 0.999)).r);
    float dE = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv + vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);
    float dW = linearizeDepth(texture2D(tDepth, clamp(cellCenterUv - vec2(cellStepUv.x, 0.0), 0.001, 0.999)).r);

    float lN = getLuma(colN);
    float lS = getLuma(colS);
    float lE = getLuma(colE);
    float lW = getLuma(colW);

    // Gradient along X and Y
    float normScale = 1.0 / max(linearDist, 2.0);
    float gxDepth = (dE - dW) * normScale * 3.8;
    float gyDepth = (dN - dS) * normScale * 3.8;
    float gxLuma = (lE - lW) * 1.45;
    float gyLuma = (lN - lS) * 1.45;

    float gx = abs(gxDepth) > abs(gxLuma) ? gxDepth : gxLuma;
    float gy = abs(gyDepth) > abs(gyLuma) ? gyDepth : gyLuma;
    float edgeMag = length(vec2(gx, gy));

    // Suppress crisp structural glyphs when out-of-focus (DoF) or in pitch-darkness
    float effectiveEdge = edgeMag * uEdgeStrength * (1.0 - coc * 0.82) * smoothstep(0.035, 0.14, perceivedLuma);

    // 6. Select glyph index in the 1D horizontal atlas
    float glyphIndex = floor(perceivedLuma * (uRampCount - 0.001));

    // If strong silhouette/normal discontinuity, pick directional structural glyph (/ \ | _ [ ])
    // Atlas order for structural chars: [0]='/' [1]='\\' [2]='|' [3]='_' [4]='[' [5]=']'
    if (effectiveEdge > 0.34 && uStructuralCount >= 6.0 && !isSky) {
      // Tangent direction is perpendicular to gradient (-gy, gx)
      float absGx = abs(gx);
      float absGy = abs(gy);
      float structOffset = 2.0; // default '|'

      if (absGy > absGx * 2.0) {
        // Horizontal ridge / cliff top -> '_'
        structOffset = 3.0;
      } else if (absGx > absGy * 2.0) {
        // Vertical pillar / monolith edge -> '|', '[', or ']' depending on depth step sign
        if (gxDepth > 0.22) {
          structOffset = 4.0; // '['
        } else if (gxDepth < -0.22) {
          structOffset = 5.0; // ']'
        } else {
          structOffset = 2.0; // '|'
        }
      } else {
        // Diagonal slope -> '/' or '\\'
        // In screen space (+X right, +Y up), tangent (-gy, gx) has positive slope when (-gy * gx) > 0
        structOffset = (gx * gy < 0.0) ? 0.0 : 1.0;
      }

      glyphIndex = uRampCount + clamp(structOffset, 0.0, uStructuralCount - 1.0);
    }

    // 7. Sample glyph mask from atlas (inset X slightly to avoid neighbor texel bleed)
    float clampedLocalX = clamp(glyphUv.x, 0.04, 0.96);
    float clampedLocalY = clamp(glyphUv.y, 0.04, 0.96);
    float atlasU = (glyphIndex + clampedLocalX) / uTotalGlyphs;
    float glyphMask = texture2D(tGlyphAtlas, vec2(atlasU, clampedLocalY)).r;

    // 8. Color grading, chroma boost & atmospheric bloom aura
    // Boost color saturation slightly so glyphs read vibrantly against #050508
    float rawLuma = max(getLuma(litCellColor), 0.0001);
    vec3 normalizedHue = litCellColor / rawLuma;
    float boostedBrightness = mix(perceivedLuma, min(1.35, rawLuma * 1.45 + 0.06), 0.68);
    vec3 glyphColor = normalizedHue * boostedBrightness;

    // Clamp extreme highlights toward warm incandescent core
    glyphColor = min(glyphColor, vec3(1.45, 1.32, 1.18));

    // Soft atmospheric sub-glyph glow: bright torches cast a faint warm halo behind & between glyphs
    vec3 cellBackdrop = uBgColor + bloomSmooth * (0.24 * uBloomIntensity) + cellColor * 0.045;

    // Subtle scanline / CRT phosphor micro-modulation (very gentle, keeps typography clean)
    float phosphor = 0.97 + 0.03 * sin(pixelPos.y * 3.14159265);

    vec3 finalColor = mix(cellBackdrop, glyphColor * phosphor, glyphMask);

    // Gentle vignette framing the RPG diorama toward #050508
    vec2 centeredUv = vUv - 0.5;
    float vignette = 1.0 - dot(centeredUv, centeredUv) * 0.42;
    finalColor = mix(uBgColor, finalColor, clamp(vignette, 0.55, 1.0));

    // Tone-map gently & output sRGB-ready values
    finalColor = finalColor / (1.0 + finalColor * 0.18);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
