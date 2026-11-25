import * as THREE from 'three';

export interface GlyphAtlasData {
  texture: THREE.CanvasTexture;
  /** Number of fine luminance ramp characters */
  rampCount: number;
  /** Number of directional structural edge characters */
  structuralCount: number;
  /** Number of block-mass density tiles (`░▒▓█`) used for ~35% GPU `lighten` composition */
  blockCount: number;
  /** Total columns in the 1D horizontal strip */
  totalGlyphs: number;
  /** Tile pixel resolution used when rasterizing this atlas */
  tileSize: number;
}

const DEFAULT_FONT_STACK =
  '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

/**
 * Generates a crisp, high-DPI single-row 2D Canvas texture containing three contiguous bands:
 *  1. `[0 .. rampCount - 1]`: calibrated fine luminance glyphs (texture, rain, wet reflections, window grids)
 *  2. `[rampCount .. rampCount + structuralCount - 1]`: directional structural glyphs (`/ \ | _ [ ]`)
 *  3. `[rampCount + structuralCount .. totalGlyphs - 1]`: 4 calibrated halftone/solid block mass tiles
 *     (25% light stipple, 50% medium dither, 75% dense weave, 100% solid core block) enabling single-pass
 *     GPU `lighten` (`max(detailMask, blockMask * blockBlendWeight)`) at ~35% weight with zero CPU overhead!
 */
export function createGlyphAtlas(
  characterRamp: string,
  structuralChars: string,
  fontFamily?: string,
  tileSize = 64
): GlyphAtlasData {
  const safeRamp =
    characterRamp.length >= 2
      ? characterRamp
      : " .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
  const safeStructural = structuralChars.length >= 4 ? structuralChars : '/\\|_[]';
  const blockCount = 4;
  const textGlyphCount = safeRamp.length + safeStructural.length;
  const totalGlyphs = textGlyphCount + blockCount;

  const resolvedTile = Math.max(48, Math.min(128, Math.round(tileSize)));
  const fontPx = Math.round(resolvedTile * 0.76);

  const canvas = document.createElement('canvas');
  canvas.width = resolvedTile * totalGlyphs;
  canvas.height = resolvedTile;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.');
  }

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const family = fontFamily || DEFAULT_FONT_STACK;
  ctx.font = `700 ${fontPx}px ${family}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const combinedText = safeRamp + safeStructural;
  for (let i = 0; i < textGlyphCount; i++) {
    const ch = combinedText[i] ?? ' ';
    if (ch === ' ') continue;
    const centerX = i * resolvedTile + resolvedTile * 0.5;
    const centerY = resolvedTile * 0.53;
    ctx.fillText(ch, centerX, centerY);
  }

  // Rasterize 4 deterministic procedural block-shade tiles (`░`, `▒`, `▓`, `█` equivalents)
  // directly with crisp geometric sub-cells so block mass never depends on OS font fallback!
  const pad = Math.max(2, Math.round(resolvedTile * 0.06));
  const innerW = resolvedTile - pad * 2;
  const innerH = resolvedTile - pad * 2;
  const subGrid = 8;
  const cellW = innerW / subGrid;
  const cellH = innerH / subGrid;

  for (let b = 0; b < blockCount; b++) {
    const tileOriginX = (textGlyphCount + b) * resolvedTile + pad;
    const tileOriginY = pad;

    if (b === 3) {
      // 100% solid luminous block (`█`) with crisp 1px cell gutter for authentic terminal block feel
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(tileOriginX, tileOriginY, innerW, innerH);
      continue;
    }

    // Ordered Bayer-like halftone thresholds for b=0 (~28% `░`), b=1 (~52% `▒`), b=2 (~78% `▓`)
    const density = b === 0 ? 0.28 : b === 1 ? 0.54 : 0.8;
    ctx.fillStyle = '#FFFFFF';
    for (let gy = 0; gy < subGrid; gy++) {
      for (let gx = 0; gx < subGrid; gx++) {
        const bayer4 =
          (((gx & 1) << 2) | ((gy & 1) << 3) | ((gx & 2) >> 1) | (gy & 2)) / 16.0;
        if (bayer4 < density) {
          ctx.fillRect(
            Math.round(tileOriginX + gx * cellW),
            Math.round(tileOriginY + gy * cellH),
            Math.max(1, Math.ceil(cellW - 0.5)),
            Math.max(1, Math.ceil(cellH - 0.5))
          );
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return {
    texture,
    rampCount: safeRamp.length,
    structuralCount: safeStructural.length,
    blockCount,
    totalGlyphs,
    tileSize: resolvedTile,
  };
}
