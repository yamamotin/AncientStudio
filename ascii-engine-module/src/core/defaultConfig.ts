import type { EngineConfig, PartialEngineConfig, ThemePalette } from '../types';

/**
 * High-contrast Cyberpunk Nocturnal Palette:
 * - Deep obsidian night sky (`#04050B`)
 * - Electric neon magenta (`#FF2A85`), golden-amber (`#FFB830`), and cyber-cyan (`#00E5FF`)
 */
export const DEFAULT_PALETTE: ThemePalette = {
  background: '#04050B',
  warmLight: '#FF2A85',
  warmCore: '#FFB830',
  coolAmbient: '#00E5FF',
  foliageAccent: '#7C4DFF',
  cursorLight: '#56F2FF',
};

/**
 * Calibrated high-contrast ASCII luminance ramp transitioning cleanly from deep void space
 * through sharp cybernetic punctuation (`.,:;+i`) to dense neon blocks (`IYVRBM#@`).
 */
export const DEFAULT_ASCII_RAMP = ' .,:;+itIYVRBM#@';

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  mode: 'playground',
  mapId: 'cyberpunk-citadel',
  enableKeyboard: false,
  pauseOffscreen: true,
  palette: { ...DEFAULT_PALETTE },
  cellSize: 9,
  autoResponsiveDensity: true,
  characterRamp: DEFAULT_ASCII_RAMP,
  structuralChars: '/\\|_[]',
  edgeStrength: 0.94,
  bloomIntensity: 1.35,
  bloomThreshold: 0.34,
  dofFocusDistance: 14.2,
  dofStrength: 0.48,
  parallaxIntensity: 1.55,
  parallaxSmoothing: 5.4,
  cursorLightIntensity: 1.45,
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
