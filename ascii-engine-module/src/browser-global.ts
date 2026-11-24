import { AsciiSceneEngine, DEFAULT_PALETTE } from './index';
import type { PartialEngineConfig } from './types';

export interface AsciiRealmsHostOptions {
  preset?: string;
  paused?: boolean;
  config?: PartialEngineConfig;
}

const PRESET_MAP: Record<string, PartialEngineConfig> = {
  // Outpost: Nocturnal Sanctuary Island with warm amber torches, cool cyan lake reflections & emerald pines
  outpost: {
    palette: { ...DEFAULT_PALETTE },
    cellSize: 9,
    bloomIntensity: 1.28,
    edgeStrength: 0.88,
    dofStrength: 0.65,
  },
  // Terminal: Classic Phosphor Green & Cyan CRT Matrix/Linux aesthetic matching the portfolio shell
  terminal: {
    palette: {
      background: '#040806',
      warmLight: '#00FF41',
      warmCore: '#A8FFC0',
      coolAmbient: '#00A3CC',
      foliageAccent: '#00B862',
      cursorLight: '#00E5FF',
    },
    cellSize: 9,
    bloomIntensity: 1.35,
    edgeStrength: 0.95,
    dofStrength: 0.55,
  },
  // Cargo: Industrial Amber / Crimson Foundry glow over slate waters
  cargo: {
    palette: {
      background: '#070509',
      warmLight: '#FF5A26',
      warmCore: '#FFD07B',
      coolAmbient: '#4D5D85',
      foliageAccent: '#3C6E66',
      cursorLight: '#FFB85C',
    },
    cellSize: 10,
    bloomIntensity: 1.42,
    edgeStrength: 0.85,
    dofStrength: 0.68,
  },
};

class AsciiRealmsAdapterInstance {
  private readonly engine: AsciiSceneEngine;

  constructor(container: HTMLElement, options?: AsciiRealmsHostOptions) {
    const presetKey = options?.preset && PRESET_MAP[options.preset] ? options.preset : 'outpost';
    const basePreset = PRESET_MAP[presetKey] ?? PRESET_MAP.outpost!;

    this.engine = new AsciiSceneEngine(container, {
      ...basePreset,
      ...(options?.config ?? {}),
    });

    this.engine.mount();

    if (options?.paused) {
      this.engine.pause();
    }
  }

  public setPaused(paused: boolean): void {
    if (paused) {
      this.engine.pause();
    } else {
      this.engine.resume();
    }
  }

  public setPreset(preset: string): void {
    const cfg = PRESET_MAP[preset] ?? PRESET_MAP.outpost;
    if (cfg) {
      this.engine.updateConfig(cfg);
    }
  }

  public updateConfig(partial: PartialEngineConfig): void {
    this.engine.updateConfig(partial);
  }

  public resize(_dims?: { width: number; height: number }): void {
    // AsciiSceneEngine already owns an internal ResizeObserver on `container`,
    // so resize is automatically synchronized without double work.
  }

  public getStats() {
    return this.engine.getStats();
  }

  public destroy(): void {
    this.engine.destroy();
  }
}

const ASCIIRealmsGlobal = {
  AsciiSceneEngine,
  mount(container: HTMLElement, options?: AsciiRealmsHostOptions): AsciiRealmsAdapterInstance {
    return new AsciiRealmsAdapterInstance(container, options);
  },
};

declare global {
  interface Window {
    ASCIIRealms?: typeof ASCIIRealmsGlobal;
    AsciiSceneEngine?: typeof AsciiSceneEngine;
  }
}

if (typeof window !== 'undefined') {
  window.ASCIIRealms = ASCIIRealmsGlobal;
  window.AsciiSceneEngine = AsciiSceneEngine;
  window.dispatchEvent(new CustomEvent('ascii-realms:ready'));
}

export { ASCIIRealmsGlobal as ASCIIRealms, AsciiSceneEngine };
