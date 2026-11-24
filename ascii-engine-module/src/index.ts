import { AsciiEngineCore } from './core/AsciiEngineCore';
import { DEFAULT_ENGINE_CONFIG, DEFAULT_PALETTE } from './core/defaultConfig';
import type {
  DeepPartial,
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  LifecycleCallbacks,
  PartialEngineConfig,
  ThemePalette,
} from './types';

export type {
  DeepPartial,
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  LifecycleCallbacks,
  PartialEngineConfig,
  ThemePalette,
};

export { DEFAULT_ENGINE_CONFIG, DEFAULT_PALETTE };

/**
 * Primary decoupled Facade for the 3D WebGL ASCII Scene Engine.
 *
 * Zero framework dependencies (no React/Vue/DOM globals outside container lifecycle).
 * Designed to mount inside any arbitrary HTMLElement hero or card container,
 * adapt dynamically via `ResizeObserver`, hibernate cleanly offscreen, and
 * release 100% of GPU & DOM resources upon `destroy()`.
 */
export class AsciiSceneEngine {
  private readonly core: AsciiEngineCore;

  constructor(container: HTMLElement, config?: PartialEngineConfig) {
    this.core = new AsciiEngineCore(container, config);
  }

  /**
   * Initializes the WebGL canvas inside the container using `ResizeObserver`,
   * compiles custom ASCII + Bloom shaders, and starts the `requestAnimationFrame` loop.
   */
  public mount(): void {
    this.core.mount();
  }

  /**
   * Immediately halts the `requestAnimationFrame` loop to save GPU cycles
   * (e.g., when scrolling past the Hero section or switching browser tabs).
   */
  public pause(): void {
    this.core.pause();
  }

  /**
   * Smoothly resumes rendering from a paused state with zero jump in `deltaTime`.
   */
  public resume(): void {
    this.core.resume();
  }

  /**
   * Dynamically updates theme palette, bloom intensity, DoF, or ASCII cell density in real time.
   */
  public updateConfig(partialConfig: PartialEngineConfig): void {
    this.core.updateConfig(partialConfig);
  }

  /**
   * Removes the WebGL canvas from the DOM, disconnects `ResizeObserver` & event listeners,
   * and executes `.dispose()` across all geometries, materials, shadow maps, textures, and buffers.
   */
  public destroy(): void {
    this.core.destroy();
  }

  /**
   * Returns current lifecycle state ('idle' | 'running' | 'paused' | 'destroyed').
   */
  public getState(): EngineLifecycleState {
    return this.core.getState();
  }

  /**
   * Returns a read-only clone of the active configuration.
   */
  public getConfig(): EngineConfig {
    return this.core.getConfig();
  }

  /**
   * Returns the latest smoothed FPS, frame time, and ASCII grid dimensions.
   */
  public getStats(): EngineStats {
    return this.core.getStats();
  }

  /**
   * Exposes the underlying Three.js Scene so host adapters can attach custom 3D entities
   * (e.g., interactive mascots or weather systems) without coupling to internal private fields.
   */
  public getScene(): import('three').Scene | null {
    return this.core.getScene();
  }

  /**
   * Exposes the underlying Three.js PerspectiveCamera for custom stage framing if needed.
   */
  public getCamera(): import('three').PerspectiveCamera | null {
    return this.core.getCamera();
  }
}

export default AsciiSceneEngine;
