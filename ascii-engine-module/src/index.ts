import type * as THREE from 'three';
import { AsciiEngineCore } from './core/AsciiEngineCore';
import { DEFAULT_ASCII_RAMP, DEFAULT_ENGINE_CONFIG, DEFAULT_PALETTE } from './core/defaultConfig';
import { EngineLoop } from './core/EngineLoop';
import { LifecycleManager } from './core/LifecycleManager';
import { computeAdaptiveResolution, detectResolutionTier } from './core/ResolutionController';
import { AnimationSystem } from './animation/AnimationSystem';
import {
  InputSystem,
  MovementRotationSystem,
  RenderSyncSystem,
  SystemRunner,
} from './ecs/SystemRunner';
import { World } from './ecs/World';
import { PlaygroundEntityFactory } from './entities/PlaygroundEntityFactory';
import { TuxEntityFactory } from './entities/TuxEntityFactory';
import { KeyboardInput } from './input/KeyboardInput';
import { PointerInput } from './input/PointerInput';
import { VfxController } from './vfx/VfxController';
import { MapLoader } from './world/MapLoader';
import { PlaygroundSceneBuilder } from './world/PlaygroundSceneBuilder';
import type {
  DeepPartial,
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  LifecycleCallbacks,
  PartialEngineConfig,
  ResolutionProfile,
  ResolutionTier,
  SceneMode,
  ThemePalette,
} from './types';

export type {
  DeepPartial,
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  LifecycleCallbacks,
  PartialEngineConfig,
  ResolutionProfile,
  ResolutionTier,
  SceneMode,
  ThemePalette,
};

export {
  DEFAULT_ASCII_RAMP,
  DEFAULT_ENGINE_CONFIG,
  DEFAULT_PALETTE,
  EngineLoop,
  LifecycleManager,
  computeAdaptiveResolution,
  detectResolutionTier,
  World,
  SystemRunner,
  InputSystem,
  MovementRotationSystem,
  AnimationSystem,
  RenderSyncSystem,
  MapLoader,
  PlaygroundSceneBuilder,
  TuxEntityFactory,
  PlaygroundEntityFactory,
  PointerInput,
  KeyboardInput,
  VfxController,
};

/**
 * Clean, framework-agnostic Facade for the modular 3D ASCII Playground & Mascot Engine.
 *
 * Usage:
 * ```ts
 * const engine = new AsciiSceneEngine(containerElement, { mode: 'playground', cellSize: 10 });
 * engine.mount();
 * ```
 */
export class AsciiSceneEngine {
  private readonly core: AsciiEngineCore;

  constructor(container: HTMLElement, config?: PartialEngineConfig) {
    this.core = new AsciiEngineCore(container, config);
  }

  /** Initializes WebGL2 context, builds the 3D scene & ASCII pipeline, attaches observers, and starts rendering. */
  public mount(): void {
    this.core.mount();
  }

  /** Cleanly halts the `requestAnimationFrame` loop without losing scene state. */
  public pause(): void {
    this.core.pause();
  }

  /** Resumes the render loop seamlessly with zero `deltaTime` jump. */
  public resume(): void {
    this.core.resume();
  }

  /** Updates theme colors, glyph density, bloom, DoF, or FPS cap dynamically at runtime. */
  public updateConfig(partialConfig: PartialEngineConfig): void {
    this.core.updateConfig(partialConfig);
  }

  /** Enables or disables opt-in focus-gated keyboard input for playable exploration. */
  public setPlayableKeyboardEnabled(enabled: boolean): void {
    this.core.setPlayableKeyboardEnabled(enabled);
  }

  /** Disposes all GPU geometries, materials, textures, render targets, observers, and DOM listeners. */
  public destroy(): void {
    this.core.destroy();
  }

  /** Current lifecycle status (`'idle' | 'running' | 'paused' | 'destroyed'`). */
  public getState(): EngineLifecycleState {
    return this.core.getState();
  }

  /** Returns an immutable snapshot of the active engine configuration. */
  public getConfig(): EngineConfig {
    return this.core.getConfig();
  }

  /** Returns the latest smoothed FPS, frame time, active cell grid dimensions, and entity count. */
  public getStats(): EngineStats {
    return this.core.getStats();
  }

  /** Safe read-only access to the underlying Three.js Scene when mounted. */
  public getScene(): THREE.Scene | null {
    return this.core.getScene();
  }

  /** Safe read-only access to the underlying Three.js PerspectiveCamera when mounted. */
  public getCamera(): THREE.PerspectiveCamera | null {
    return this.core.getCamera();
  }

  /** Returns current `{ yaw, pitch }` in radians of the primary entity (e.g. Tux in mascot mode). */
  public getPrimaryEntityAngles(): { yaw: number; pitch: number } | null {
    return this.core.getPrimaryEntityAngles();
  }
}

export default AsciiSceneEngine;
