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
 * ASCII RPG aesthetics (`o`, `u`, `s`, `a`, `$`, `8`, `Q`, `=`, `-`, `~`, `^`, `*`), with dedicated
 * leading dark-breathing empty space (`' '`) and quiet punctuation before midtone/highlight glyphs.
 */
export const DEFAULT_ASCII_RAMP =
  "    .,'-~_:;^+=*o!?rcvusaez<>kpqdbwm0OQCJL8$&#%@";

export const DEFAULT_SCENE_MODEL_URL = './assets/models/cena_completa.glb';
export const DEFAULT_DRACO_DECODER_PATH = './assets/draco/';

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  mode: 'playground',
  modelUrl: DEFAULT_SCENE_MODEL_URL,
  dracoDecoderPath: DEFAULT_DRACO_DECODER_PATH,
  atmosphere: 'night',
  fov: 58,
  enableKeyboard: true,
  autoOrbit: false,
  pauseOffscreen: true,
  palette: { ...DEFAULT_PALETTE },
  cellSize: 2.25,
  autoResponsiveDensity: false,
  characterRamp: DEFAULT_ASCII_RAMP,
  structuralChars: '|/\\-+',
  edgeStrength: 0.96,
  blockBlendWeight: 0.06,
  windStrength: 1.0,
  reflectionStrength: 0.25,
  bloomIntensity: 0.28,
  bloomThreshold: 0.58,
  dofFocusDistance: 0.34,
  dofStrength: 0.20,
  parallaxIntensity: 0.35,
  parallaxSmoothing: 6.5,
  cursorLightIntensity: 0.32,
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
