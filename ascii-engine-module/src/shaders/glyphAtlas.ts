import * as THREE from 'three';

export interface GlyphAtlasData {
  texture: THREE.CanvasTexture;
  /** Number of luminance ramp characters */
  rampCount: number;
  /** Number of structural edge characters */
  structuralCount: number;
  /** Total columns in the 1D horizontal strip */
  totalGlyphs: number;
  /** Tile pixel resolution used when rasterizing this atlas */
  tileSize: number;
}

const DEFAULT_FONT_STACK =
  '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

/**
 * Generates a crisp, high-DPI single-row 2D Canvas texture containing:
 *  - [0 .. rampCount - 1]: calibrated luminance glyphs (e.g. ' .,:;+itIYVRBM#@')
 *  - [rampCount .. rampCount + structuralCount - 1]: directional structural glyphs (e.g. '/\\|_[]')
 *
 * Supports adaptive `tileSize` (64px standard, 96px HiDPI/Retina) with gentle linear-clamped
 * stroke anti-aliasing so monospace stems stay razor-sharp without jagged pixel stair-stepping
 * across integer physical cell sizes.
 */
export function createGlyphAtlas(
  characterRamp: string,
  structuralChars: string,
  fontFamily?: string,
  tileSize = 64
): GlyphAtlasData {
  const safeRamp = characterRamp.length >= 2 ? characterRamp : ' .,:;+itIYVRBM#@';
  const safeStructural = structuralChars.length >= 4 ? structuralChars : '/\\|_[]';
  const combined = safeRamp + safeStructural;
  const totalGlyphs = combined.length;

  const resolvedTile = Math.max(48, Math.min(128, Math.round(tileSize)));
  const fontPx = Math.round(resolvedTile * 0.74);

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

  for (let i = 0; i < totalGlyphs; i++) {
    const ch = combined[i] ?? ' ';
    if (ch === ' ') continue;
    const centerX = i * resolvedTile + resolvedTile * 0.5;
    const centerY = resolvedTile * 0.53;
    ctx.fillText(ch, centerX, centerY);
  }

  const texture = new THREE.CanvasTexture(canvas);
  // LinearFilter combined with fragment-shader smoothstep sharpening prevents uneven stem widths
  // when physical cell sizes vary between 8px and 22px, while remaining razor-crisp!
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
    totalGlyphs,
    tileSize: resolvedTile,
  };
}
