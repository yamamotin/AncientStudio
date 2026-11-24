import * as THREE from 'three';
import { DEFAULT_ENGINE_CONFIG, mergeEngineConfig } from './defaultConfig';
import { AsciiWorldScene } from '../scene/AsciiWorldScene';
import { AsciiPostProcessor } from '../shaders/AsciiPostProcessor';
import type {
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  PartialEngineConfig,
} from '../types';

/**
 * Core WebGL runtime orchestrator:
 * - Container-scoped ResizeObserver (adapts to any arbitrary div size, not window)
 * - Container-scoped Pointer tracking (works seamlessly beneath HTML HUD overlays)
 * - Deterministic requestAnimationFrame loop with FPS limiter & zero-jump pause/resume deltaTime
 * - Page Visibility auto-hibernation
 * - Complete, leak-free GPU & DOM disposal
 */
export class AsciiEngineCore {
  private readonly container: HTMLElement;
  private config: EngineConfig;
  private state: EngineLifecycleState = 'idle';

  private renderer: THREE.WebGLRenderer | null = null;
  private world: AsciiWorldScene | null = null;
  private postProcessor: AsciiPostProcessor | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private rafId: number | null = null;
  private lastFrameTimestamp: number | null = null;
  private elapsedSeconds = 0;
  private autoPausedByVisibility = false;

  // Viewport & ASCII grid tracking
  private containerWidth = 1;
  private containerHeight = 1;
  private activeCellSize = 10;
  private gridColumns = 1;
  private gridRows = 1;
  private lastDrawCalls = 0;
  private lastTriangles = 0;

  // Smoothed FPS telemetry
  private fpsAccumulatorFrames = 0;
  private fpsAccumulatorMs = 0;
  private currentSmoothedFps = 60;
  private lastFrameDurationMs = 16.67;

  // Bound event listeners for guaranteed removal on destroy()
  private readonly onPointerMoveBound: (ev: PointerEvent) => void;
  private readonly onPointerLeaveBound: () => void;
  private readonly onVisibilityChangeBound: () => void;
  private readonly onContextLostBound: (ev: Event) => void;
  private readonly tickBound: (now: number) => void;

  constructor(container: HTMLElement, initialConfig?: PartialEngineConfig) {
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error(
        '[AsciiSceneEngine] A valid container HTMLElement is required to instantiate the engine.'
      );
    }

    this.container = container;
    this.config = mergeEngineConfig(DEFAULT_ENGINE_CONFIG, initialConfig);

    this.onPointerMoveBound = this.handlePointerMove.bind(this);
    this.onPointerLeaveBound = this.handlePointerLeave.bind(this);
    this.onVisibilityChangeBound = this.handleVisibilityChange.bind(this);
    this.onContextLostBound = this.handleContextLost.bind(this);
    this.tickBound = this.tick.bind(this);
  }

  public mount(): void {
    if (this.state === 'destroyed') {
      throw new Error(
        '[AsciiSceneEngine] Cannot mount an engine instance that has already been destroyed. Create a new instance instead.'
      );
    }
    if (this.state !== 'idle') {
      return; // Idempotent if already mounted
    }

    try {
      // Ensure container establishes a positioning context if static
      const computedPosition = window.getComputedStyle(this.container).position;
      if (computedPosition === 'static') {
        this.container.style.position = 'relative';
      }

      // Initialize WebGLRenderer (prefer WebGL2 context automatically in modern Three.js)
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      });

      const pixelRatio = Math.min(window.devicePixelRatio || 1, this.config.maxPixelRatio);
      renderer.setPixelRatio(pixelRatio);
      renderer.shadowMap.enabled = this.config.enableShadows;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.info.autoReset = true;

      // Style canvas to fill container cleanly behind any HTML HUD overlay
      const canvas = renderer.domElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.zIndex = '0';
      canvas.style.pointerEvents = 'none'; // Allow HUD buttons/links or container events without canvas hijacking
      canvas.setAttribute('aria-hidden', 'true');
      canvas.dataset.asciiEngineCanvas = 'true';

      canvas.addEventListener('webglcontextlost', this.onContextLostBound, false);

      this.container.prepend(canvas);
      this.renderer = renderer;

      // Build 3D RPG scene & ASCII post-processing pipeline
      this.world = new AsciiWorldScene(this.config);
      this.postProcessor = new AsciiPostProcessor(this.config);

      // Measure initial container bounds immediately
      const rect = this.container.getBoundingClientRect();
      this.applyResize(Math.max(1, rect.width), Math.max(1, rect.height));

      // Attach container-scoped ResizeObserver
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === this.container) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            if (width > 0 && height > 0) {
              this.applyResize(width, height);
            }
          }
        }
      });
      this.resizeObserver.observe(this.container);

      // Attach pointer listeners to container so HUD overlays (buttons/cards) keep receiving clicks
      // while mouse movement anywhere inside the container drives camera parallax & lantern light!
      this.container.addEventListener('pointermove', this.onPointerMoveBound, { passive: true });
      this.container.addEventListener('pointerleave', this.onPointerLeaveBound, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibilityChangeBound);

      this.state = 'running';
      this.lastFrameTimestamp = null;
      this.scheduleNextFrame();

      this.config.callbacks?.onMount?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      this.config.callbacks?.onError?.(error);
      throw error;
    }
  }

  public pause(): void {
    if (this.state !== 'running') {
      return;
    }
    this.autoPausedByVisibility = false;
    this.cancelScheduledFrame();
    this.lastFrameTimestamp = null;
    this.state = 'paused';
    this.config.callbacks?.onPause?.();
  }

  public resume(): void {
    if (this.state !== 'paused') {
      return;
    }
    this.autoPausedByVisibility = false;
    this.state = 'running';
    // Reset timestamp to null so the first resumed frame computes dt = 0 (zero jump!)
    this.lastFrameTimestamp = null;
    this.scheduleNextFrame();
    this.config.callbacks?.onResume?.();
  }

  public updateConfig(partialConfig: PartialEngineConfig): void {
    if (this.state === 'destroyed') {
      return;
    }

    const prevRamp = this.config.characterRamp;
    const prevStruct = this.config.structuralChars;
    const prevFont = this.config.fontFamily;
    const prevShadows = this.config.enableShadows;
    const prevMaxDpr = this.config.maxPixelRatio;

    this.config = mergeEngineConfig(this.config, partialConfig);

    if (!this.renderer || !this.world || !this.postProcessor) {
      return;
    }

    if (prevShadows !== this.config.enableShadows) {
      this.renderer.shadowMap.enabled = this.config.enableShadows;
      this.renderer.shadowMap.needsUpdate = true;
    }

    const rebuildAtlas =
      prevRamp !== this.config.characterRamp ||
      prevStruct !== this.config.structuralChars ||
      prevFont !== this.config.fontFamily;

    this.world.applyConfig(this.config);

    if (prevMaxDpr !== this.config.maxPixelRatio) {
      this.applyResize(this.containerWidth, this.containerHeight);
    } else {
      const grid = this.postProcessor.applyConfig(
        this.config,
        rebuildAtlas,
        this.containerWidth,
        this.containerHeight
      );
      this.activeCellSize = grid.activeCellSize;
      this.gridColumns = grid.columns;
      this.gridRows = grid.rows;
    }

    // If currently paused, render a single refreshed frame immediately so live config edits preview cleanly
    if (this.state === 'paused') {
      this.renderSingleFrame(0);
    }
  }

  public destroy(): void {
    if (this.state === 'destroyed') {
      return;
    }

    this.cancelScheduledFrame();
    this.lastFrameTimestamp = null;

    // 1. Disconnect observers & DOM listeners
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    this.container.removeEventListener('pointermove', this.onPointerMoveBound);
    this.container.removeEventListener('pointerleave', this.onPointerLeaveBound);
    document.removeEventListener('visibilitychange', this.onVisibilityChangeBound);

    // 2. Dispose 3D scene geometries, materials, shadow maps & textures
    if (this.world) {
      this.world.dispose();
      this.world = null;
    }

    // 3. Dispose post-processor render targets, glyph atlas & shader programs
    if (this.postProcessor) {
      this.postProcessor.dispose();
      this.postProcessor = null;
    }

    // 4. Dispose WebGLRenderer, release GPU context, and remove canvas from DOM
    if (this.renderer) {
      const canvas = this.renderer.domElement;
      canvas.removeEventListener('webglcontextlost', this.onContextLostBound, false);
      this.renderer.renderLists.dispose();
      this.renderer.dispose();

      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      this.renderer = null;
    }

    this.state = 'destroyed';
    this.config.callbacks?.onDestroy?.();
  }

  public getState(): EngineLifecycleState {
    return this.state;
  }

  public getConfig(): EngineConfig {
    return mergeEngineConfig(this.config);
  }

  public getStats(): EngineStats {
    return {
      fps: Math.round(this.currentSmoothedFps),
      frameTimeMs: Number(this.lastFrameDurationMs.toFixed(2)),
      activeCellSize: this.activeCellSize,
      gridColumns: this.gridColumns,
      gridRows: this.gridRows,
      drawCalls: this.lastDrawCalls,
      triangles: this.lastTriangles,
    };
  }

  public getScene(): THREE.Scene | null {
    return this.world ? this.world.scene : null;
  }

  public getCamera(): THREE.PerspectiveCamera | null {
    return this.world ? this.world.camera : null;
  }

  private scheduleNextFrame(): void {
    if (this.rafId === null && this.state === 'running') {
      this.rafId = window.requestAnimationFrame(this.tickBound);
    }
  }

  private cancelScheduledFrame(): void {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick(now: number): void {
    this.rafId = null;
    if (this.state !== 'running') {
      return;
    }

    if (this.lastFrameTimestamp === null) {
      // First frame after mount() or resume() -> smooth zero-jump start
      this.lastFrameTimestamp = now;
      this.renderSingleFrame(1 / 60);
      this.scheduleNextFrame();
      return;
    }

    const elapsedMs = now - this.lastFrameTimestamp;
    const minIntervalMs = this.config.maxFps > 0 ? 1000 / this.config.maxFps : 0;

    // Optional FPS cap tolerance (1.5ms slack for 60Hz VSync alignment)
    if (minIntervalMs > 0 && elapsedMs < minIntervalMs - 1.5) {
      this.scheduleNextFrame();
      return;
    }

    this.lastFrameTimestamp = now;

    // Clamp deltaTime to max 100ms (0.1s) to prevent any physics/lerp overshoot on heavy main-thread stalls
    const clampedDt = Math.min(0.1, Math.max(0.0001, elapsedMs / 1000));
    this.lastFrameDurationMs = elapsedMs;

    this.renderSingleFrame(clampedDt);

    // Update FPS telemetry (~every 450ms)
    this.fpsAccumulatorFrames += 1;
    this.fpsAccumulatorMs += elapsedMs;
    if (this.fpsAccumulatorMs >= 450) {
      const instantFps = (this.fpsAccumulatorFrames * 1000) / this.fpsAccumulatorMs;
      this.currentSmoothedFps = this.currentSmoothedFps * 0.35 + instantFps * 0.65;
      this.fpsAccumulatorFrames = 0;
      this.fpsAccumulatorMs = 0;
      this.config.callbacks?.onFpsUpdate?.(this.getStats());
    }

    this.scheduleNextFrame();
  }

  private renderSingleFrame(dt: number): void {
    if (!this.renderer || !this.world || !this.postProcessor) {
      return;
    }

    this.elapsedSeconds += dt;
    this.world.update(dt, this.elapsedSeconds, this.config);

    const renderMetrics = this.postProcessor.render(
      this.renderer,
      this.world.scene,
      this.world.camera,
      this.elapsedSeconds
    );

    this.lastDrawCalls = renderMetrics.drawCalls;
    this.lastTriangles = renderMetrics.triangles;
  }

  private applyResize(cssWidth: number, cssHeight: number): void {
    if (!this.renderer || !this.world || !this.postProcessor) {
      return;
    }

    this.containerWidth = Math.max(1, Math.floor(cssWidth));
    this.containerHeight = Math.max(1, Math.floor(cssHeight));

    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.config.maxPixelRatio);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.containerWidth, this.containerHeight, false);

    this.world.resizeCamera(this.containerWidth, this.containerHeight);

    const grid = this.postProcessor.setSize(
      this.containerWidth,
      this.containerHeight,
      pixelRatio,
      this.config
    );

    this.activeCellSize = grid.activeCellSize;
    this.gridColumns = grid.columns;
    this.gridRows = grid.rows;

    if (this.state === 'paused') {
      this.renderSingleFrame(0);
    }
  }

  private handlePointerMove(ev: PointerEvent): void {
    if (!this.world) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    // Container-relative normalized coordinates: [-1, +1] on X (left..right) and Y (bottom..top)
    const relX = (ev.clientX - rect.left) / rect.width;
    const relY = (ev.clientY - rect.top) / rect.height;

    const nx = relX * 2 - 1;
    const ny = -(relY * 2 - 1);

    this.world.setPointerNormalized(nx, ny, true);
  }

  private handlePointerLeave(): void {
    if (!this.world) return;
    this.world.setPointerNormalized(0, 0, false);
  }

  private handleVisibilityChange(): void {
    if (!this.config.pauseOnHiddenTab) return;

    if (document.hidden && this.state === 'running') {
      this.cancelScheduledFrame();
      this.lastFrameTimestamp = null;
      this.state = 'paused';
      this.autoPausedByVisibility = true;
      this.config.callbacks?.onPause?.();
    } else if (!document.hidden && this.state === 'paused' && this.autoPausedByVisibility) {
      this.autoPausedByVisibility = false;
      this.state = 'running';
      this.lastFrameTimestamp = null;
      this.scheduleNextFrame();
      this.config.callbacks?.onResume?.();
    }
  }

  private handleContextLost(ev: Event): void {
    ev.preventDefault();
    this.cancelScheduledFrame();
    this.config.callbacks?.onError?.(
      new Error('[AsciiSceneEngine] WebGL context lost.')
    );
  }
}
