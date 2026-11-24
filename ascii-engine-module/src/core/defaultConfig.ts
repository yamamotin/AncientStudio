import type { EngineConfig, PartialEngineConfig, ThemePalette } from '../types';

export const DEFAULT_PALETTE: ThemePalette = {
  background: '#050508',
  warmLight: '#FF8C24',
  warmCore: '#FFB85C',
  coolAmbient: '#2E6F95',
  foliageAccent: '#3A7D5C',
  cursorLight: '#7AD7F0',
};

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  palette: { ...DEFAULT_PALETTE },
  cellSize: 10,
  autoResponsiveDensity: true,
  characterRamp: ' .,:;-=+*#%@',
  structuralChars: '/\\|_[]',
  edgeStrength: 0.85,
  bloomIntensity: 1.2,
  bloomThreshold: 0.38,
  dofFocusDistance: 14.3,
  dofStrength: 0.68,
  parallaxIntensity: 1.45,
  parallaxSmoothing: 4.8,
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
