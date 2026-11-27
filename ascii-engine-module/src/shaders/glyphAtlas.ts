import * as THREE from 'three';

export interface GlyphAtlasData {
  texture: THREE.CanvasTexture;
  /** Number of fine luminance ramp characters */
  rampCount: number;
  /** Number of directional structural edge characters */
  structuralCount: number;
  /** Number of seamless block-mass density tiles (`░▒▓█`) used for ~35% GPU `lighten` composition */
  blockCount: number;
  /** Total columns in the 1D horizontal strip */
  totalGlyphs: number;
  /** Tile height in pixels (backward-compatible alias for `tileHeight`) */
  tileSize: number;
  /** Exact integer pixel width of each monospace tile (`tileHeight * 0.625`, e.g. 40 or 60) */
  tileWidth: number;
  /** Exact integer pixel height of each monospace tile (multiple of 8, e.g. 64 or 96) */
  tileHeight: number;
}

const DEFAULT_FONT_STACK =
  '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

/**
 * Generates a crisp, gutter-free 1D horizontal 2D Canvas glyph atlas with authentic 5:8 (`0.625`)
 * monospace terminal tile proportions (`40x64` @ 1x, `60x96` @ HiDPI):
 *  1. `[0 .. rampCount - 1]`: calibrated luminance glyphs sized at 90% of tile height so characters
 *     naturally span ~86-90% of cell width/height with zero hollow box gaps between columns or rows.
 *  2. `[rampCount .. rampCount + structuralCount - 1]`: directional structural glyphs (`/ \ | _ [ ]`)
 *     sized at 96% of tile height so silhouettes connect smoothly across cell boundaries.
 *  3. `[rampCount + structuralCount .. totalGlyphs - 1]`: 4 full-bleed (`pad = 0`, zero gutter)
 *     ordered halftone & solid block tiles (`░▒▓█`) that tile edge-to-edge across cells without
 *     producing any rectangular grid lines!
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
  const safeStructural = structuralChars.length >= 4 ? structuralChars : '|/\\-+';
  const blockCount = 4;
  const textGlyphCount = safeRamp.length + safeStructural.length;
  const totalGlyphs = textGlyphCount + blockCount;

  // Snap tileHeight to a multiple of 8 (e.g. 64 or 96) so 5:8 tileWidth (40 or 60) is an exact integer multiple of 4!
  const tileHeight = Math.max(48, Math.min(128, Math.round(tileSize / 8) * 8));
  const tileWidth = Math.round(tileHeight * 0.625);

  const rampFontPx = Math.round(tileHeight * 0.86);
  const structFontPx = Math.round(tileHeight * 0.94);

  const canvas = document.createElement('canvas');
  canvas.width = tileWidth * totalGlyphs;
  canvas.height = tileHeight;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.');
  }

  if ('imageSmoothingEnabled' in ctx) {
    ctx.imageSmoothingEnabled = true;
  }
  if ('imageSmoothingQuality' in ctx) {
    ctx.imageSmoothingQuality = 'high';
  }

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const family = fontFamily || DEFAULT_FONT_STACK;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const combinedText = safeRamp + safeStructural;
  for (let i = 0; i < textGlyphCount; i++) {
    const ch = combinedText[i] ?? ' ';
    if (ch === ' ') continue;

    const isStructural = i >= safeRamp.length;
    ctx.font = `${isStructural ? 700 : 600} ${isStructural ? structFontPx : rampFontPx}px ${family}`;

    // Clip drawing strictly inside a 2px-inset tile box so strokes never bleed across tile boundaries even under micro-cell RGSS filtering
    if (typeof ctx.save === 'function' && typeof ctx.beginPath === 'function' && typeof ctx.clip === 'function') {
      ctx.save();
      ctx.beginPath();
      ctx.rect(i * tileWidth + 2, 1, Math.max(1, tileWidth - 4), Math.max(1, tileHeight - 2));
      ctx.clip();
      ctx.fillText(ch, i * tileWidth + tileWidth * 0.5, tileHeight * 0.52);
      ctx.restore();
    } else {
      ctx.fillText(ch, i * tileWidth + tileWidth * 0.5, tileHeight * 0.52);
    }
  }

  // Rasterize 4 deterministic FULL-BLEED (`pad = 0`, zero border/gutter!) block-shade tiles (`░`, `▒`, `▓`, `█`)
  // using exact integer sub-cell divisors (`subGridX = 4`, `subGridY = 8`) so adjacent cells tile
  // seamlessly without any checkered grid or inter-cell gap!
  const subGridX = 4;
  const subGridY = 8;
  const subW = tileWidth / subGridX;
  const subH = tileHeight / subGridY;

  for (let b = 0; b < blockCount; b++) {
    const tileOriginX = (textGlyphCount + b) * tileWidth;

    if (b === 3) {
      // 100% continuous edge-to-edge solid block (`█`) — zero margin/gutter!
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(tileOriginX, 0, tileWidth, tileHeight);
      continue;
    }

    // Ordered Bayer halftone thresholds for b=0 (~28% `░`), b=1 (~54% `▒`), b=2 (~80% `▓`)
    const density = b === 0 ? 0.28 : b === 1 ? 0.54 : 0.8;
    ctx.fillStyle = '#FFFFFF';
    for (let gy = 0; gy < subGridY; gy++) {
      for (let gx = 0; gx < subGridX; gx++) {
        const bayer4 =
          (((gx & 1) << 2) | ((gy & 1) << 3) | ((gx & 2) >> 1) | (gy & 2)) / 16.0;
        if (bayer4 < density) {
          ctx.fillRect(
            Math.round(tileOriginX + gx * subW),
            Math.round(gy * subH),
            Math.ceil(subW),
            Math.ceil(subH)
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
    tileSize: tileHeight,
    tileWidth,
    tileHeight,
  };
}
