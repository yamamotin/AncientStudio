/**
 * ResolutionController: Adaptive resolution, DPR, fullscreen expansion & smooth ASCII grid
 * density transition controller.
 *
 * Ensures crisp, authentic ASCII aesthetics across mobile, compact stages, standard HD,
 * Retina/HiDPI laptops, wide QHD/4K displays, and dynamic container/fullscreen expansions
 * without turning into unreadable subpixel noise, tearing during resize, or dropping below 60 FPS.
 */

import type { EngineConfig, ResolutionProfile, ResolutionTier } from '../types';

export interface ResolutionInput {
  cssWidth: number;
  cssHeight: number;
  devicePixelRatio: number;
  config: EngineConfig;
  /** Optional mobile/coarse-pointer hint */
  isCoarsePointer?: boolean;
  /** Optional fullscreen state hint for expanded density budget */
  isFullscreen?: boolean;
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
 * 2. `activeCellSize` adapts smoothly by tier, fullscreen state & mode (`playground` vs `mascot`),
 *    bounded by minimum physical glyph dimensions (`>= 6px` wide, `>= 8px` tall) and bounded by
 *    maximum column caps (`190` cols in playground, `78` cols in mascot) so individual ASCII
 *    characters remain unmistakable even in fullscreen 4K!
 * 3. Multi-sample sub-cell anti-aliasing (`subCellSampleSpread`) scales up when `cellPhysH >= 12`.
 */
export function computeAdaptiveResolution(input: ResolutionInput): ResolutionProfile {
  const cssW = Math.max(1, Math.floor(input.cssWidth));
  const cssH = Math.max(1, Math.floor(input.cssHeight));
  const rawDpr =
    Number.isFinite(input.devicePixelRatio) && input.devicePixelRatio > 0
      ? input.devicePixelRatio
      : 1;

  const coarse = Boolean(input.isCoarsePointer);
  const tier = detectResolutionTier(cssW, cssH, coarse);

  // 1. Cap DPR per device profile (max 2.0 on desktop/retina, max 1.5 on mobile coarse-pointer)
  const tierMaxDpr =
    tier === 'mobile' ? Math.min(1.5, input.config.maxPixelRatio) : input.config.maxPixelRatio;
  const effectiveDpr = Math.max(1, Math.min(rawDpr, Math.max(1, tierMaxDpr)));

  const physicalWidth = Math.max(2, Math.floor(cssW * effectiveDpr));
  const physicalHeight = Math.max(2, Math.floor(cssH * effectiveDpr));

  // 2. Adaptive CSS cell size preserving legibility & silhouette density across container sizes
  const baseCell = Math.max(5, Math.min(28, input.config.cellSize));
  let cellCss = baseCell;

  if (input.config.autoResponsiveDensity) {
    if (input.config.mode === 'mascot') {
      if (tier === 'mobile') {
        cellCss = Math.max(baseCell, 8.5);
      } else if (tier === 'compact') {
        cellCss = Math.max(6.5, baseCell * 0.92);
      } else if (tier === 'hd' || tier === 'uhd') {
        cellCss = Math.max(6.5, baseCell * 0.85);
      }
    } else {
      // Continuous container-proportional ramp within tier bounds so resizing feels organic
      const widthNorm = Math.max(0, Math.min(1, (cssW - 360) / 1240));
      const continuousScale = 1.24 - widthNorm * 0.44; // smoothly spans 1.24x -> 0.80x
      if (tier === 'mobile') {
        cellCss = Math.max(11, Math.round(baseCell * Math.max(1.24, continuousScale)));
      } else if (tier === 'compact') {
        cellCss = Math.max(9.5, Number((baseCell * Math.max(1.04, continuousScale)).toFixed(2)));
      } else if (tier === 'hd') {
        cellCss = Math.max(8, Number((baseCell * Math.min(0.92, continuousScale)).toFixed(2)));
      } else if (tier === 'uhd') {
        cellCss = Math.max(7.5, Number((baseCell * Math.min(0.82, continuousScale)).toFixed(2)));
      } else {
        cellCss = Math.max(8.5, Number((baseCell * continuousScale).toFixed(2)));
      }

      if (input.isFullscreen && tier !== 'mobile') {
        // Slightly refine cell size in fullscreen so wide urban vistas reveal extra detail cleanly
        cellCss = Math.max(7.5, Number((cellCss * 0.94).toFixed(2)));
      }
    }
  }

  // 3. Convert to integer physical pixel cell dimensions (prevents moiré / uneven glyph stems!)
  let cellPhysH = Math.max(8, Math.round(cellCss * effectiveDpr));
  let cellPhysW = Math.max(6, Math.round(cellPhysH * MONOSPACE_ASPECT));

  // 4. Enforce maximum column/row guardrails so ultra-wide/fullscreen 4K never turns ASCII into dust
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

/**
 * ResolutionTransitionController: Smoothly interpolates ASCII cell physical dimensions (`cellPhysW`,
 * `cellPhysH`) and sub-cell sampling spread across container resizes and fullscreen transitions,
 * snapping cleanly to exact integer physical pixels once settled so stationary frames have zero moiré.
 */
export class ResolutionTransitionController {
  private currentCellW = 0;
  private currentCellH = 0;
  private targetCellW = 8;
  private targetCellH = 10;
  private currentSpread = 0.22;
  private targetSpread = 0.22;
  private transitionEnergy = 0;
  private initialized = false;
  private readonly smoothingSpeed: number;

  constructor(smoothingSpeed = 14.0) {
    this.smoothingSpeed = smoothingSpeed;
  }

  public setTarget(profile: ResolutionProfile, immediate = false): void {
    this.targetCellW = profile.cellPhysW;
    this.targetCellH = profile.cellPhysH;
    this.targetSpread = profile.subCellSampleSpread;

    if (!this.initialized || immediate) {
      this.currentCellW = profile.cellPhysW;
      this.currentCellH = profile.cellPhysH;
      this.currentSpread = profile.subCellSampleSpread;
      this.transitionEnergy = 0;
      this.initialized = true;
      return;
    }

    const delta =
      Math.abs(this.targetCellW - this.currentCellW) +
      Math.abs(this.targetCellH - this.currentCellH);
    if (delta > 0.05) {
      this.transitionEnergy = Math.min(1, Math.max(this.transitionEnergy, delta / 6));
    }
  }

  public step(dt: number): {
    cellW: number;
    cellH: number;
    subCellSpread: number;
    transitionMix: number;
    isTransitioning: boolean;
  } {
    if (!this.initialized) {
      return {
        cellW: this.targetCellW,
        cellH: this.targetCellH,
        subCellSpread: this.targetSpread,
        transitionMix: 0,
        isTransitioning: false,
      };
    }

    const clampedDt = Math.max(0, Math.min(0.1, dt));
    const alpha = clampedDt > 0 ? 1 - Math.exp(-this.smoothingSpeed * clampedDt) : 1;

    this.currentCellW += (this.targetCellW - this.currentCellW) * alpha;
    this.currentCellH += (this.targetCellH - this.currentCellH) * alpha;
    this.currentSpread += (this.targetSpread - this.currentSpread) * alpha;
    this.transitionEnergy *= Math.exp(-9.5 * clampedDt);

    const remaining =
      Math.abs(this.targetCellW - this.currentCellW) +
      Math.abs(this.targetCellH - this.currentCellH);

    // Snap cleanly to integer target once within 0.06 physical pixels so settled ASCII stems are 100% crisp
    if (remaining < 0.06 && this.transitionEnergy < 0.03) {
      this.currentCellW = this.targetCellW;
      this.currentCellH = this.targetCellH;
      this.currentSpread = this.targetSpread;
      this.transitionEnergy = 0;
      return {
        cellW: this.targetCellW,
        cellH: this.targetCellH,
        subCellSpread: this.targetSpread,
        transitionMix: 0,
        isTransitioning: false,
      };
    }

    return {
      cellW: this.currentCellW,
      cellH: this.currentCellH,
      subCellSpread: Math.max(this.currentSpread, 0.28),
      transitionMix: Math.min(1, this.transitionEnergy),
      isTransitioning: true,
    };
  }
}
