import type { EngineConfig, PartialEngineConfig, ThemePalette } from '../types';

/**
 * Contained Cyber Noir + Entropism + Techwear/Darkwear Base Palette:
 * - Entropic sky / nocturnal terminal substrate (`#0C1217`)
 * - Discreet oxidized verdigris accent (`#4A7C7E`), brushed steel-mist core (`#8A99A6`),
 *   cool steel-slate ambient (`#6E7B87`), and weathered structure slate (`#2A3540`).
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
 * Expressive multi-symbol & alphanumeric ASCII luminance ramp inspired by classic & modern
 * ASCII RPG aesthetics (`o`, `u`, `s`, `a`, `$`, `8`, `Q`, `=`, `-`, `~`, `^`, `*`), ordered
 * from sparse punctuation to dense typographic highlights to avoid repetitive bar runs.
 */
export const DEFAULT_ASCII_RAMP =
  " .',:;~-_^+=*!i1r?cvunxzjft<>saoeukpqdbwmh0OQCJLZUYX$8&#%B@";

export const DEFAULT_SCENE_MODEL_URL = './assets/models/cena_completa.glb';
export const DEFAULT_DRACO_DECODER_PATH = './assets/draco/';

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  mode: 'playground',
  modelUrl: DEFAULT_SCENE_MODEL_URL,
  dracoDecoderPath: DEFAULT_DRACO_DECODER_PATH,
  atmosphere: 'night',
  fov: 66,
  enableKeyboard: true,
  autoOrbit: false,
  pauseOffscreen: true,
  palette: { ...DEFAULT_PALETTE },
  cellSize: 8,
  autoResponsiveDensity: true,
  characterRamp: DEFAULT_ASCII_RAMP,
  structuralChars: '/\\|_[]',
  edgeStrength: 0.94,
  blockBlendWeight: 0.12,
  windStrength: 1.0,
  bloomIntensity: 0.28,
  bloomThreshold: 0.56,
  dofFocusDistance: 0.34,
  dofStrength: 0.18,
  parallaxIntensity: 0.35,
  parallaxSmoothing: 6.5,
  cursorLightIntensity: 0.42,
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
