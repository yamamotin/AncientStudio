import type { EngineConfig, PartialEngineConfig, ThemePalette } from '../types';

/**
 * Contained Cyber Noir + Entropism + Techwear/Darkwear Base Palette:
 * - Entropic sky / nocturnal terminal substrate (`#0C1217`)
 * - Discreet oxidized verdigris accent (`#4A7C7E`), brushed steel-mist core (`#8A99A6`),
 *   cool steel-slate ambient (`#6E7B87`), and weathered ruin/structure slate (`#2A3540`).
 */
export const DEFAULT_PALETTE: ThemePalette = {
  background: '#0C1217',
  warmLight: '#4A7C7E',
  warmCore: '#8A99A6',
  coolAmbient: '#6E7B87',
  foliageAccent: '#2A3540',
  cursorLight: '#6E7B87',
};

/**
 * High-resolution calibrated ASCII luminance ramp for crisp glyph modulation across
 * weathered surfaces, restrained lights, wet pavement reflections, and silhouettes.
 */
export const DEFAULT_ASCII_RAMP = " .'`^,:;Il!i><~+_-?][1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  mode: 'playground',
  mapId: 'cyberpunk-citadel',
  atmosphere: 'night',
  fov: 106,
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
  bloomIntensity: 0.24,
  bloomThreshold: 0.62,
  dofFocusDistance: 4.1,
  dofStrength: 0.20,
  parallaxIntensity: 0.35,
  parallaxSmoothing: 6.0,
  cursorLightIntensity: 0.55,
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
