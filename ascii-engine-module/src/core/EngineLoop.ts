/**
 * EngineLoop: Deterministic requestAnimationFrame scheduler with:
 * - Safe deltaTime clamping (zero jump across pause/resume or tab switches)
 * - Configurable maxFps cap with VSync tolerance
 * - Smoothed FPS & frame-time telemetry reporting
 */

export interface LoopFrameInfo {
  dt: number;
  elapsed: number;
  rawFrameMs: number;
}

export interface LoopTelemetry {
  fps: number;
  frameTimeMs: number;
}

export class EngineLoop {
  private rafId: number | null = null;
  private running = false;
  private lastTimestamp: number | null = null;
  private elapsedSeconds = 0;
  private maxFps: number;

  private accumFrames = 0;
  private accumMs = 0;
  private smoothedFps = 60;
  private lastFrameMs = 16.67;

  private readonly onFrame: (info: LoopFrameInfo) => void;
  private readonly onTelemetry?: (telemetry: LoopTelemetry) => void;
  private readonly tickBound: (now: number) => void;

  constructor(options: {
    maxFps: number;
    onFrame: (info: LoopFrameInfo) => void;
    onTelemetry?: (telemetry: LoopTelemetry) => void;
  }) {
    this.maxFps = options.maxFps;
    this.onFrame = options.onFrame;
    this.onTelemetry = options.onTelemetry;
    this.tickBound = this.tick.bind(this);
  }

  public start(): void {
    if (this.running) return;
    this.running = true;
    // Reset lastTimestamp so first tick computes a clean, zero-jump frame
    this.lastTimestamp = null;
    this.schedule();
  }

  public pause(): void {
    if (!this.running) return;
    this.running = false;
    this.cancel();
    this.lastTimestamp = null;
  }

  public resume(): void {
    this.start();
  }

  public stop(): void {
    this.pause();
    this.elapsedSeconds = 0;
  }

  public setMaxFps(maxFps: number): void {
    this.maxFps = maxFps;
  }

  public isRunning(): boolean {
    return this.running;
  }

  public getElapsedSeconds(): number {
    return this.elapsedSeconds;
  }

  public getTelemetry(): LoopTelemetry {
    return {
      fps: Math.round(this.smoothedFps),
      frameTimeMs: Number(this.lastFrameMs.toFixed(2)),
    };
  }

  /**
   * Executes a single manual step (e.g. while paused after `updateConfig` or resize).
   */
  public stepOnce(dt = 0): void {
    this.elapsedSeconds += dt;
    this.onFrame({
      dt,
      elapsed: this.elapsedSeconds,
      rawFrameMs: this.lastFrameMs,
    });
  }

  private schedule(): void {
    if (this.rafId === null && this.running) {
      this.rafId = window.requestAnimationFrame(this.tickBound);
    }
  }

  private cancel(): void {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick(now: number): void {
    this.rafId = null;
    if (!this.running) return;

    if (this.lastTimestamp === null) {
      this.lastTimestamp = now;
      this.stepOnce(1 / 60);
      this.schedule();
      return;
    }

    const elapsedMs = now - this.lastTimestamp;
    const minIntervalMs = this.maxFps > 0 ? 1000 / this.maxFps : 0;

    if (minIntervalMs > 0 && elapsedMs < minIntervalMs - 1.5) {
      this.schedule();
      return;
    }

    this.lastTimestamp = now;
    const clampedDt = Math.min(0.1, Math.max(0.0001, elapsedMs / 1000));
    this.lastFrameMs = elapsedMs;

    this.stepOnce(clampedDt);

    this.accumFrames += 1;
    this.accumMs += elapsedMs;
    if (this.accumMs >= 450) {
      const instantFps = (this.accumFrames * 1000) / this.accumMs;
      this.smoothedFps = this.smoothedFps * 0.35 + instantFps * 0.65;
      this.accumFrames = 0;
      this.accumMs = 0;
      this.onTelemetry?.(this.getTelemetry());
    }

    this.schedule();
  }
}
