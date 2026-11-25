import type { EngineConfig, PartialEngineConfig, ThemePalette } from '../types';

/**
 * High-contrast Cyberpunk Nocturnal Street Palette:
 * - Deep night urban shadow floor (`#05060D`)
 * - Electric neon magenta (`#FF2A85`), golden-amber (`#FFC145`), and cyber-cyan (`#00F0FF`)
 */
export const DEFAULT_PALETTE: ThemePalette = {
  background: '#05060D',
  warmLight: '#FF2A85',
  warmCore: '#FFC145',
  coolAmbient: '#00F0FF',
  foliageAccent: '#8A5CFF',
  cursorLight: '#64F5FF',
};

/**
 * High-resolution 24-step calibrated ASCII luminance ramp for rich micro-texture in rain,
 * wet asphalt reflections, illuminated window grids, neon signs, and crisp focal silhouettes.
 */
export const DEFAULT_ASCII_RAMP = " .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  mode: 'playground',
  mapId: 'cyberpunk-citadel',
  atmosphere: 'night',
  enableKeyboard: false,
  pauseOffscreen: true,
  palette: { ...DEFAULT_PALETTE },
  cellSize: 8,
  autoResponsiveDensity: true,
  characterRamp: DEFAULT_ASCII_RAMP,
  structuralChars: '/\\|_[]',
  edgeStrength: 0.96,
  blockBlendWeight: 0.35,
  windStrength: 1.0,
  bloomIntensity: 1.48,
  bloomThreshold: 0.28,
  dofFocusDistance: 10.6,
  dofStrength: 0.36,
  parallaxIntensity: 1.65,
  parallaxSmoothing: 5.6,
  cursorLightIntensity: 1.55,
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
