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

/**
 * Tight 5:8 (0.625) terminal monospace cell aspect ratio matching the rectangular glyph atlas tiles
 * (`40x64` @ 1x, `60x96` @ HiDPI). Eliminates wide inter-character horizontal box gaps so adjacent
 * ASCII glyphs flow continuously like clean terminal typography.
 */
const MONOSPACE_ASPECT = 0.625;

/**
 * Safe offscreen WebGL2 renderbuffer / depth-texture hardware ceilings so 1.5x–2.0x
 * 3D supersampling stays fast and crash-free across integrated, mobile, and 4K GPUs.
 */
const MAX_SAFE_SUPERSAMPLE_DIM = 4096;
const MAX_SAFE_SUPERSAMPLE_PIXELS = 3840 * 2160; // ~8.29 MP (4K UHD ceiling)

/**
 * Tiny/microscopic ASCII cell & font size bounds and fine-step constants:
 * - `MIN_MICRO_CELL_SIZE`: 2.0px minimum CSS cell height
 * - `[2.0px .. 6.0px]`: 0.25px fine steps for detailed micro-typography control
 * - `(6.0px .. maxMountCell]`: 0.50px steps capped strictly at the mounted scene ceiling
 */
export const MIN_MICRO_CELL_SIZE = 2.0;
export const MICRO_FINE_STEP_THRESHOLD = 6.0;
export const MICRO_FINE_STEP = 0.25;
export const MICRO_COARSE_STEP = 0.5;

/**
 * Builds the deterministic sorted stop table `[minCellSize .. maxCellSize]` with 0.25px steps
 * up to 6.0px and 0.50px steps above 6.0px, capped strictly at `maxCellSize` (never above mount).
 */
export function buildMicroCellStops(
  maxCellSize: number,
  minCellSize = MIN_MICRO_CELL_SIZE
): number[] {
  const safeMin = Math.max(1.5, Number(minCellSize.toFixed(2)));
  const safeMax = Math.max(safeMin, Number(maxCellSize.toFixed(2)));
  const stops: number[] = [];

  const fineCeiling = Math.min(safeMax, MICRO_FINE_STEP_THRESHOLD);
  const fineSteps = Math.floor((fineCeiling - safeMin + 1e-6) / MICRO_FINE_STEP);
  for (let i = 0; i <= fineSteps; i++) {
    const v = Number((safeMin + i * MICRO_FINE_STEP).toFixed(2));
    if (v <= safeMax + 1e-6) {
      stops.push(Math.min(v, safeMax));
    }
  }

  if (safeMax > MICRO_FINE_STEP_THRESHOLD + 1e-6) {
    let cursor = MICRO_FINE_STEP_THRESHOLD + MICRO_COARSE_STEP;
    while (cursor < safeMax - 1e-6) {
      stops.push(Number(cursor.toFixed(2)));
      cursor += MICRO_COARSE_STEP;
    }
  }

  const last = stops[stops.length - 1];
  if (last === undefined || Math.abs(last - safeMax) > 0.005) {
    stops.push(safeMax);
  }

  return stops;
}

/**
 * Snaps any raw pixel input to the nearest valid stop in `[minCellSize .. maxCellSize]`.
 */
export function snapToMicroCellStop(
  value: number,
  maxCellSize: number,
  minCellSize = MIN_MICRO_CELL_SIZE
): number {
  const stops = buildMicroCellStops(maxCellSize, minCellSize);
  if (!Number.isFinite(value)) return stops[stops.length - 1]!;

  const clamped = Math.max(stops[0]!, Math.min(stops[stops.length - 1]!, value));
  let best = stops[0]!;
  let bestDist = Math.abs(clamped - best);
  for (let i = 1; i < stops.length; i++) {
    const candidate = stops[i]!;
    const dist = Math.abs(clamped - candidate);
    if (dist < bestDist - 1e-6) {
      best = candidate;
      bestDist = dist;
    }
  }
  return best;
}

/**
 * Maps a normalized `[0 .. 1]` slider ratio through a low-end-weighted power curve (`t^1.35`)
 * and snaps to the micro-cell stop table, dedicating extra travel resolution to tiny sizes.
 */
export function mapNormalizedToMicroCell(
  normalizedT: number,
  maxCellSize: number,
  minCellSize = MIN_MICRO_CELL_SIZE
): number {
  const t = Number.isFinite(normalizedT) ? Math.max(0, Math.min(1, normalizedT)) : 1;
  const safeMin = Math.max(1.5, minCellSize);
  const safeMax = Math.max(safeMin, maxCellSize);
  const curved = safeMin + (safeMax - safeMin) * Math.pow(t, 1.35);
  return snapToMicroCellStop(curved, safeMax, safeMin);
}

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
  if (cssWidth >= 1440 && minDim >= 480 && !isCoarsePointer) {
    return 'uhd';
  }
  if (cssWidth >= 960 && minDim >= 360 && !isCoarsePointer) {
    return 'hd';
  }
  return cssWidth < 720 ? 'compact' : 'desktop';
}

/**
 * Computes an integer-aligned physical render budget, supersampled 3D render-target size,
 * and calibrated high-definition ASCII cell grid.
 *
 * Key invariants:
 * 1. `effectiveDpr` operates at full sharpness up to `2.0` (`config.maxPixelRatio`), capped on
 *    coarse-pointer mobile devices to `1.5` to protect battery and fill-rate.
 * 2. Offscreen 3D passes (`sceneTarget`, `normalTarget`, `depthTexture`) run at an internal
 *    supersampling factor of `~1.5x–1.85x` (up to `2.0x` on compact stages) within safe GPU
 *    dimension (`<= 4096`) and pixel (`<= 8.29 MP`) budgets.
 * 3. `activeCellSize` is calibrated for high spatial definition (`~6.0px–6.8px` on desktop and
 *    `~5.5px–6.2px` on HD/UHD), bounded by column guardrails (`390` cols in playground, `88` in
 *    mascot) so architecture, `Player_Rig`, and `Carro_Grupo` stay crisp without turning into dust.
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

  // 1. Crisp final canvas DPR up to 2.0 on desktop/HD/UHD, max 1.5 on coarse-pointer mobile
  const requestedMaxDpr = Math.min(2.0, Math.max(1, input.config.maxPixelRatio));
  const tierMaxDpr = tier === 'mobile' ? Math.min(1.5, requestedMaxDpr) : requestedMaxDpr;
  const effectiveDpr = Math.max(1, Math.min(rawDpr, tierMaxDpr));

  const physicalWidth = Math.max(2, Math.floor(cssW * effectiveDpr));
  const physicalHeight = Math.max(2, Math.floor(cssH * effectiveDpr));

  // 2. Internal 3D RenderTarget supersampling (~1.5x–2.0x within safe WebGL2 GPU budgets)
  let desiredSupersample = 1.65;
  if (tier === 'mobile') {
    desiredSupersample = 1.4;
  } else if (tier === 'compact') {
    desiredSupersample = effectiveDpr < 1.5 ? 1.9 : 1.6;
  } else if (tier === 'desktop') {
    desiredSupersample = effectiveDpr < 1.5 ? 1.85 : 1.6;
  } else if (tier === 'hd') {
    desiredSupersample = effectiveDpr < 1.5 ? 1.75 : 1.55;
  } else {
    desiredSupersample = effectiveDpr < 1.5 ? 1.65 : 1.5;
  }

  const maxPhysDim = Math.max(physicalWidth, physicalHeight, 1);
  const physArea = Math.max(1, physicalWidth * physicalHeight);
  const dimScaleCap = MAX_SAFE_SUPERSAMPLE_DIM / maxPhysDim;
  const areaScaleCap = Math.sqrt(MAX_SAFE_SUPERSAMPLE_PIXELS / physArea);
  const minSafeScale = Math.min(1.0, dimScaleCap);
  const appliedSupersample = Math.max(
    minSafeScale,
    Math.min(desiredSupersample, dimScaleCap, areaScaleCap)
  );

  const renderTargetWidth = Math.min(
    MAX_SAFE_SUPERSAMPLE_DIM,
    Math.max(2, Math.round(physicalWidth * appliedSupersample))
  );
  const renderTargetHeight = Math.min(
    MAX_SAFE_SUPERSAMPLE_DIM,
    Math.max(2, Math.round(physicalHeight * appliedSupersample))
  );
  const supersampleScale = Number(
    (renderTargetWidth / Math.max(1, physicalWidth)).toFixed(2)
  );

  // 3. Calibrated typographic grid density:
  //    - Default mount (`cellSize = 8`, `autoResponsiveDensity = true`):
  //      Desktop (720–959px): ~6.0px–6.8px; HD / UHD (>= 960px): ~5.5px–6.2px
  //    - Micro / explicit cell sizes (`2.0px .. < 7.5px` or `autoResponsiveDensity = false`):
  //      Unlocks fine 0.25px–0.50px resolution down to 2.0px without subpixel blur or 6px clamping
  const baseCell = Math.max(MIN_MICRO_CELL_SIZE, Math.min(28, input.config.cellSize));
  const userCellRatio = baseCell / 8.0;
  const isMicroOrManualCell =
    input.config.mode !== 'mascot' &&
    (!input.config.autoResponsiveDensity || baseCell < 7.5);
  let cellCss = baseCell;

  if (input.config.autoResponsiveDensity) {
    if (input.config.mode === 'mascot') {
      if (tier === 'mobile') {
        cellCss = Math.max(baseCell, 8.2);
      } else if (tier === 'compact') {
        cellCss = Math.max(6.2, baseCell * 0.9);
      } else if (tier === 'hd' || tier === 'uhd') {
        cellCss = Math.max(6.0, baseCell * 0.82);
      }
    } else if (baseCell < 7.5) {
      // Proportional micro scaling when autoResponsiveDensity is kept on with reduced cellSize
      const tierBase =
        tier === 'mobile'
          ? 8.2
          : tier === 'compact'
            ? 7.0
            : tier === 'desktop'
              ? 6.45
              : 5.95;
      cellCss = Math.max(
        MIN_MICRO_CELL_SIZE,
        Number((tierBase * userCellRatio).toFixed(2))
      );
    } else {
      if (tier === 'mobile') {
        cellCss = Math.max(7.6, Math.min(9.2, Number((8.2 * userCellRatio).toFixed(2))));
      } else if (tier === 'compact') {
        const t = Math.max(0, Math.min(1, (cssW - 460) / 260));
        const target = 7.2 - t * 0.45; // 7.20px -> 6.75px
        cellCss = Math.max(6.4, Math.min(7.8, Number((target * userCellRatio).toFixed(2))));
      } else if (tier === 'desktop') {
        const t = Math.max(0, Math.min(1, (cssW - 720) / 240));
        const target = 6.65 - t * 0.45; // 6.65px -> 6.20px (strictly within 6.0px–6.8px)
        cellCss = Math.max(6.0, Math.min(6.8, Number((target * userCellRatio).toFixed(2))));
      } else if (tier === 'hd') {
        const t = Math.max(0, Math.min(1, (cssW - 960) / 480));
        const target = 6.12 - t * 0.34; // 6.12px -> 5.78px (strictly within 5.5px–6.2px)
        cellCss = Math.max(5.5, Math.min(6.2, Number((target * userCellRatio).toFixed(2))));
      } else {
        // 'uhd' (>= 1440px)
        const t = Math.max(0, Math.min(1, (cssW - 1440) / 1120));
        const target = 5.82 - t * 0.28; // 5.82px -> 5.54px (strictly within 5.5px–6.2px)
        cellCss = Math.max(5.5, Math.min(6.2, Number((target * userCellRatio).toFixed(2))));
      }

      if (input.isFullscreen && tier !== 'mobile') {
        const floorPx = tier === 'hd' || tier === 'uhd' ? 5.5 : 6.0;
        cellCss = Math.max(floorPx, Number((cellCss * 0.96).toFixed(2)));
      }
    }
  }

  // 4. Physical pixel cell dimensions:
  //    - Standard automatic mode (>= 6px): integer physical pixels
  //    - Micro / manual mode (down to 2.0px): 0.25-pixel precision so every 0.25px step responds smoothly
  let cellPhysH: number;
  let cellPhysW: number;
  if (isMicroOrManualCell) {
    cellPhysH = Math.max(2.0, Math.round(cellCss * effectiveDpr * 4) / 4);
    cellPhysW = Math.max(1.25, Math.round(cellPhysH * MONOSPACE_ASPECT * 4) / 4);
  } else {
    cellPhysH = Math.max(6, Math.round(cellCss * effectiveDpr));
    cellPhysW = Math.max(4, Math.round(cellPhysH * MONOSPACE_ASPECT));
  }

  // 5. Enforce column guardrails:
  //    - Default auto mode caps 4K+ at 680 cols; micro/manual mode expands safely to 2400 cols
  //      (Pass 4 composite fragment cost is O(physicalWidth * physicalHeight), independent of columns)
  const maxCols =
    input.config.mode === 'mascot' ? 88 : isMicroOrManualCell ? 2400 : 680;
  const minCols = input.config.mode === 'mascot' ? 24 : 42;

  const tentativeCols = Math.floor(physicalWidth / cellPhysW);
  if (tentativeCols > maxCols) {
    if (isMicroOrManualCell) {
      cellPhysW = Math.max(1.25, Math.ceil((physicalWidth / maxCols) * 4) / 4);
      cellPhysH = Math.max(2.0, Math.round((cellPhysW / MONOSPACE_ASPECT) * 4) / 4);
    } else {
      cellPhysW = Math.max(4, Math.ceil(physicalWidth / maxCols));
      cellPhysH = Math.max(6, Math.round(cellPhysW / MONOSPACE_ASPECT));
    }
  } else if (tentativeCols < minCols && physicalWidth >= minCols * 4) {
    cellPhysW = Math.max(4, Math.floor(physicalWidth / minCols));
    cellPhysH = Math.max(6, Math.round(cellPhysW / MONOSPACE_ASPECT));
  }

  const columns = Math.max(1, Math.floor(physicalWidth / cellPhysW));
  const rows = Math.max(1, Math.floor(physicalHeight / cellPhysH));
  const activeCellSize = Number((cellPhysH / effectiveDpr).toFixed(2));

  // 6. Crisp HiDPI glyph atlas tile size (up to DPR 2.0) & exact 2x2 sub-quadrant spread (0.25)
  const atlasTileSize =
    effectiveDpr >= 1.75
      ? 112
      : effectiveDpr >= 1.25 || tier === 'hd' || tier === 'uhd'
        ? 96
        : 80;
  const subCellSampleSpread = 0.25;
  const bloomDownsample = tier === 'mobile' ? 4 : 3;

  return {
    tier,
    cssWidth: cssW,
    cssHeight: cssH,
    effectiveDpr: Number(effectiveDpr.toFixed(2)),
    physicalWidth,
    physicalHeight,
    supersampleScale,
    renderTargetWidth,
    renderTargetHeight,
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
