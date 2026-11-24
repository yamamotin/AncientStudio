import type { EngineConfig, PartialEngineConfig, ThemePalette } from '../types';

export const DEFAULT_PALETTE: ThemePalette = {
  background: '#050508',
  warmLight: '#FF8C24',
  warmCore: '#FFB85C',
  coolAmbient: '#2E6F95',
  foliageAccent: '#3A7D5C',
  cursorLight: '#7AD7F0',
};

/**
 * Calibrated high-contrast ASCII luminance ramp inspired by classic dense Tux art
 * (` .,:;i1tfLCG08@` / ` .,:;+itIYVRBM#@`), transitioning cleanly from sparse dots/colons
 * on bright surfaces to dense structural stems (`M`, `W`, `#`, `@`) on dark contours.
 */
export const DEFAULT_ASCII_RAMP = ' .,:;+itIYVRBM#@';

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  mode: 'playground',
  mapId: 'sanctuary-isle',
  enableKeyboard: false,
  pauseOffscreen: true,
  palette: { ...DEFAULT_PALETTE },
  cellSize: 10,
  autoResponsiveDensity: true,
  characterRamp: DEFAULT_ASCII_RAMP,
  structuralChars: '/\\|_[]',
  edgeStrength: 0.88,
  bloomIntensity: 1.2,
  bloomThreshold: 0.38,
  dofFocusDistance: 14.3,
  dofStrength: 0.65,
  parallaxIntensity: 1.45,
  parallaxSmoothing: 5.2,
  cursorLightIntensity: 1.35,
  enableShadows: true,
  maxFps: 60,
  maxPixelRatio: 2,
  pauseOnHiddenTab: true,
  fontFamily:
    '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
};

/**
 * Pure immutable configuration merger that safely combines partial updates without mutating external inputs.
 */
export function mergeEngineConfig(
  base: EngineConfig,
  partial?: PartialEngineConfig
): EngineConfig {
  if (!partial) {
    return {
      ...base,
      palette: { ...base.palette },
      callbacks: base.callbacks ? { ...base.callbacks } : undefined,
    };
  }

  return {
    ...base,
    ...partial,
    palette: {
      ...base.palette,
      ...(partial.palette ?? {}),
    },
    callbacks: partial.callbacks
      ? { ...(base.callbacks ?? {}), ...partial.callbacks }
      : base.callbacks
        ? { ...base.callbacks }
        : undefined,
  };
}
