import * as THREE from 'three';

export interface GlyphAtlasData {
  texture: THREE.CanvasTexture;
  /** Number of luminance ramp characters */
  rampCount: number;
  /** Number of structural edge characters */
  structuralCount: number;
  /** Total columns in the 1D horizontal strip */
  totalGlyphs: number;
}

const DEFAULT_FONT =
  '700 46px "JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

/**
 * Generates a crisp, single-row 2D Canvas texture containing:
 *  - [0 .. rampCount - 1]: calibrated luminance glyphs (e.g. ' .:-=+*#%@')
 *  - [rampCount .. rampCount + structuralCount - 1]: directional structural glyphs (e.g. '/\\|_[]')
 *
 * NearestFilter + no mipmaps ensures razor-sharp typographic edges at any cell scale.
 */
export function createGlyphAtlas(
  characterRamp: string,
  structuralChars: string,
  fontFamily?: string
): GlyphAtlasData {
  const safeRamp = characterRamp.length >= 2 ? characterRamp : ' .:-=+*#%@';
  const safeStructural = structuralChars.length >= 4 ? structuralChars : '/\\|_[]';
  const combined = safeRamp + safeStructural;
  const totalGlyphs = combined.length;

  const tileSize = 64;
  const canvas = document.createElement('canvas');
  canvas.width = tileSize * totalGlyphs;
  canvas.height = tileSize;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('[AsciiSceneEngine] Unable to create 2D Canvas context for glyph atlas.');
  }

  // Clear to pitch black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Configure crisp monospace typography
  ctx.font = fontFamily ? `700 46px ${fontFamily}` : DEFAULT_FONT;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < totalGlyphs; i++) {
    const ch = combined[i] ?? ' ';
    if (ch === ' ') continue;
    const centerX = i * tileSize + tileSize * 0.5;
    const centerY = tileSize * 0.53;
    ctx.fillText(ch, centerX, centerY);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return {
    texture,
    rampCount: safeRamp.length,
    structuralCount: safeStructural.length,
    totalGlyphs,
  };
}
