/**
 * ResolutionController: Adaptive resolution, DPR & ASCII typographic grid calculator.
 *
 * Ensures crisp, authentic ASCII aesthetics across mobile, compact stages, standard HD,
 * Retina/HiDPI laptops, and wide QHD/4K displays without turning into unreadable subpixel
 * noise or dropping below 60 FPS on mobile GPUs.
 */

import type { EngineConfig, ResolutionProfile, ResolutionTier } from '../types';

export interface ResolutionInput {
  cssWidth: number;
  cssHeight: number;
  devicePixelRatio: number;
  config: EngineConfig;
  /** Optional mobile/coarse-pointer hint */
  isCoarsePointer?: boolean;
}

const MONOSPACE_ASPECT = 0.82;

/**
 * Classifies the container + device into a deterministic resolution tier.
 */
export function detectResolutionTier(
  cssWidth: number,
  cssHeight: number,
  isCoarsePointer: boolean
): ResolutionTier {
  const minDim = Math.min(cssWidth, cssHeight);

  if (isCoarsePointer && cssWidth < 640) {
    return 'mobile';
  }
  if (cssWidth < 460 || minDim < 280) {
    return cssWidth < 380 && isCoarsePointer ? 'mobile' : 'compact';
  }
  if (cssWidth >= 1440 && minDim >= 520 && !isCoarsePointer) {
    return 'uhd';
  }
  if (cssWidth >= 960 && minDim >= 400 && !isCoarsePointer) {
    return 'hd';
  }
  return cssWidth < 720 ? 'compact' : 'desktop';
}

/**
 * Computes an integer-aligned physical render budget and ASCII cell grid.
 *
 * Key invariants:
 * 1. `effectiveDpr` is capped to `[1, config.maxPixelRatio]` (and further capped on mobile to `1.5`
 *    to protect fill-rate and battery while keeping glyphs sharp).
 * 2. `activeCellCssPx` adapts smoothly by tier & mode (`playground` vs `mascot`), bounded by
 *    minimum physical glyph dimensions (`>= 7px` wide, `>= 9px` tall) so characters never collapse
 *    into muddy subpixel noise, and bounded by maximum column caps (`185` cols in playground,
 *    `76` cols in mascot) so individual ASCII characters remain unmistakable!
 * 3. Multi-sample sub-cell anti-aliasing (`subCellSampleSpread`) scales up when `cellPhysH >= 12`
 *    so high-DPR glyphs represent true underlying 3D silhouettes & specular water glints accurately.
 */
export function computeAdaptiveResolution(input: ResolutionInput): ResolutionProfile {
  const cssW = Math.max(1, Math.floor(input.cssWidth));
  const cssH = Math.max(1, Math.floor(input.cssHeight));
  const rawDpr = Number.isFinite(input.devicePixelRatio) && input.devicePixelRatio > 0
    ? input.devicePixelRatio
    : 1;

  const coarse = Boolean(input.isCoarsePointer);
  const tier = detectResolutionTier(cssW, cssH, coarse);

  // 1. Cap DPR per device profile (max 2.0 on desktop/retina, max 1.5 on mobile coarse-pointer)
  const tierMaxDpr = tier === 'mobile' ? Math.min(1.5, input.config.maxPixelRatio) : input.config.maxPixelRatio;
  const effectiveDpr = Math.max(1, Math.min(rawDpr, Math.max(1, tierMaxDpr)));

  const physicalWidth = Math.max(2, Math.floor(cssW * effectiveDpr));
  const physicalHeight = Math.max(2, Math.floor(cssH * effectiveDpr));

  // 2. Adaptive CSS cell size preserving legibility & silhouette density
  const baseCell = Math.max(5, Math.min(28, input.config.cellSize));
  let cellCss = baseCell;

  if (input.config.autoResponsiveDensity) {
    if (input.config.mode === 'mascot') {
      // Neofetch Tux stage: target ~34..58 columns so Tux silhouette & white belly match reference art
      if (tier === 'mobile') {
        cellCss = Math.max(baseCell, 8.5);
      } else if (tier === 'compact') {
        cellCss = Math.max(6.5, baseCell * 0.92);
      } else if (tier === 'hd' || tier === 'uhd') {
        cellCss = Math.max(6.5, baseCell * 0.85);
      }
    } else {
      // ASCII Realms Playground: denser grid on wide desktop, larger crisp cells on mobile for 60 FPS
      if (tier === 'mobile') {
        cellCss = Math.max(11, Math.round(baseCell * 1.24));
      } else if (tier === 'compact') {
        cellCss = Math.max(9.5, Number((baseCell * 1.08).toFixed(1)));
      } else if (tier === 'hd') {
        cellCss = Math.max(8, Number((baseCell * 0.88).toFixed(1)));
      } else if (tier === 'uhd') {
        cellCss = Math.max(7.5, Number((baseCell * 0.80).toFixed(1)));
      }
    }
  }

  // 3. Convert to integer physical pixel cell dimensions (prevents moiré / uneven glyph stems!)
  let cellPhysH = Math.max(8, Math.round(cellCss * effectiveDpr));
  let cellPhysW = Math.max(6, Math.round(cellPhysH * MONOSPACE_ASPECT));

  // 4. Enforce maximum column/row guardrails so ultra-wide 4K monitors never turn ASCII into indistinguishable dust
  const maxCols = input.config.mode === 'mascot' ? 78 : 190;
  const minCols = input.config.mode === 'mascot' ? 24 : 36;

  const tentativeCols = Math.floor(physicalWidth / cellPhysW);
  if (tentativeCols > maxCols) {
    cellPhysW = Math.max(6, Math.ceil(physicalWidth / maxCols));
    cellPhysH = Math.max(8, Math.round(cellPhysW / MONOSPACE_ASPECT));
  } else if (tentativeCols < minCols && physicalWidth >= minCols * 6) {
    cellPhysW = Math.max(6, Math.floor(physicalWidth / minCols));
    cellPhysH = Math.max(8, Math.round(cellPhysW / MONOSPACE_ASPECT));
  }

  const columns = Math.max(1, Math.floor(physicalWidth / cellPhysW));
  const rows = Math.max(1, Math.floor(physicalHeight / cellPhysH));
  const activeCellSize = Number((cellPhysH / effectiveDpr).toFixed(2));

  // 5. Atlas tile resolution & sub-cell supersampling spread
  const atlasTileSize = effectiveDpr >= 1.5 || cellPhysH >= 14 ? 96 : 64;
  const subCellSampleSpread = cellPhysH >= 12 ? 0.26 : 0.18;
  const bloomDownsample = tier === 'mobile' ? 4 : 3;

  return {
    tier,
    cssWidth: cssW,
    cssHeight: cssH,
    effectiveDpr: Number(effectiveDpr.toFixed(2)),
    physicalWidth,
    physicalHeight,
    activeCellSize,
    cellPhysW,
    cellPhysH,
    columns,
    rows,
    atlasTileSize,
    subCellSampleSpread,
    bloomDownsample,
  };
}
