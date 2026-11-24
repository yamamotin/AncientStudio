/**
 * PointerInput: Unified mouse & touch input tracker.
 * - Normalizes pointer coordinates relative to the container [-1, +1]
 * - Supports hover tracking on desktop AND touch/drag yaw+pitch accumulation on mobile/tablet
 * - Uses `{ passive: true }` exclusively so page scrolling on mobile/touch is NEVER blocked!
 */

export interface PointerSnapshot {
  /** Container-relative normalized X in [-1, +1] */
  normX: number;
  /** Container-relative normalized Y in [-1, +1] (up is +1) */
  normY: number;
  /** Accumulated drag yaw offset in radians (for touch/mouse drag) */
  dragYaw: number;
  /** Accumulated drag pitch offset in radians */
  dragPitch: number;
  /** True when pointer is actively inside or recently moved */
  active: boolean;
  /** True while primary button or touch finger is pressed */
  isDown: boolean;
  /** Motion speed magnitude [0..1] for reactive character excitement */
  motionSpeed: number;
  /** Last user interaction timestamp (ms) */
  lastInteractionMs: number;
}

export interface PointerInputOptions {
  /** Also listen to window pointermove for mascot look-at across adjacent section cards (default: false) */
  trackWindowHover?: boolean;
}

export class PointerInput {
  private readonly container: HTMLElement;
  private readonly trackWindowHover: boolean;

  private normX = 0;
  private normY = 0;
  private dragYaw = 0;
  private dragPitch = 0;
  private active = false;
  private isDown = false;
  private lastClientX = 0;
  private lastClientY = 0;
  private motionSpeed = 0;
  private lastInteractionMs = 0;
  private attached = false;

  private readonly onPointerDownBound: (ev: PointerEvent) => void;
  private readonly onPointerMoveBound: (ev: PointerEvent) => void;
  private readonly onWindowPointerMoveBound: (ev: PointerEvent) => void;
  private readonly onPointerUpBound: () => void;
  private readonly onPointerLeaveBound: () => void;

  constructor(container: HTMLElement, options?: PointerInputOptions) {
    this.container = container;
    this.trackWindowHover = Boolean(options?.trackWindowHover);

    this.onPointerDownBound = this.handlePointerDown.bind(this);
    this.onPointerMoveBound = this.handleContainerPointerMove.bind(this);
    this.onWindowPointerMoveBound = this.handleWindowPointerMove.bind(this);
    this.onPointerUpBound = this.handlePointerUp.bind(this);
    this.onPointerLeaveBound = this.handlePointerLeave.bind(this);
  }

  public attach(): void {
    if (this.attached) return;
    this.attached = true;

    // Allow vertical page scrolling seamlessly on touchscreens while horizontal/diagonal gestures still feed pointer events
    if (!this.container.style.touchAction) {
      this.container.style.touchAction = 'pan-y';
    }

    this.container.addEventListener('pointerdown', this.onPointerDownBound, { passive: true });
    this.container.addEventListener('pointermove', this.onPointerMoveBound, { passive: true });
    this.container.addEventListener('pointerup', this.onPointerUpBound, { passive: true });
    this.container.addEventListener('pointercancel', this.onPointerUpBound, { passive: true });
    this.container.addEventListener('pointerleave', this.onPointerLeaveBound, { passive: true });

    if (this.trackWindowHover && typeof window !== 'undefined') {
      window.addEventListener('pointermove', this.onWindowPointerMoveBound, { passive: true });
      window.addEventListener('pointerup', this.onPointerUpBound, { passive: true });
    }
  }

  public detach(): void {
    if (!this.attached) return;
    this.attached = false;

    this.container.removeEventListener('pointerdown', this.onPointerDownBound);
    this.container.removeEventListener('pointermove', this.onPointerMoveBound);
    this.container.removeEventListener('pointerup', this.onPointerUpBound);
    this.container.removeEventListener('pointercancel', this.onPointerUpBound);
    this.container.removeEventListener('pointerleave', this.onPointerLeaveBound);

    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.onWindowPointerMoveBound);
      window.removeEventListener('pointerup', this.onPointerUpBound);
    }
  }

  /**
   * Decays motion speed smoothly per frame and returns the current normalized snapshot.
   */
  public sample(dt: number): PointerSnapshot {
    this.motionSpeed = Math.max(0, this.motionSpeed - dt * 2.4);

    // Gently decay drag offset back toward hover center when user releases touch/drag
    if (!this.isDown && !this.active) {
      const relax = 1 - Math.exp(-2.2 * dt);
      this.dragYaw += (0 - this.dragYaw) * relax;
      this.dragPitch += (0 - this.dragPitch) * relax;
    }

    return {
      normX: this.normX,
      normY: this.normY,
      dragYaw: this.dragYaw,
      dragPitch: this.dragPitch,
      active: this.active,
      isDown: this.isDown,
      motionSpeed: this.motionSpeed,
      lastInteractionMs: this.lastInteractionMs,
    };
  }

  /**
   * Programmatic injection helper (useful for automated tests or gentle auto-orbit).
   */
  public setNormalized(nx: number, ny: number, active = true): void {
    this.normX = Math.max(-1, Math.min(1, nx));
    this.normY = Math.max(-1, Math.min(1, ny));
    this.active = active;
  }

  private handlePointerDown(ev: PointerEvent): void {
    this.isDown = true;
    this.active = true;
    this.lastClientX = ev.clientX;
    this.lastClientY = ev.clientY;
    if (ev.isTrusted) {
      this.lastInteractionMs = Date.now();
    }
    this.updateNormalizedFromEvent(ev, false);
  }

  private handleContainerPointerMove(ev: PointerEvent): void {
    if (ev.isTrusted) {
      this.lastInteractionMs = Date.now();
    }

    if (this.isDown) {
      const dx = ev.clientX - this.lastClientX;
      const dy = ev.clientY - this.lastClientY;
      this.lastClientX = ev.clientX;
      this.lastClientY = ev.clientY;

      this.dragYaw = Math.max(-Math.PI, Math.min(Math.PI, this.dragYaw + dx * 0.011));
      this.dragPitch = Math.max(-0.55, Math.min(0.55, this.dragPitch + dy * 0.007));
      this.motionSpeed = Math.min(1, this.motionSpeed + Math.hypot(dx, dy) * 0.025);
    }

    this.active = true;
    this.updateNormalizedFromEvent(ev, false);
  }

  private handleWindowPointerMove(ev: PointerEvent): void {
    if (!ev.isTrusted) return;
    this.lastInteractionMs = Date.now();
    this.active = true;
    this.updateNormalizedFromEvent(ev, true);
  }

  private handlePointerUp(): void {
    this.isDown = false;
  }

  private handlePointerLeave(): void {
    this.isDown = false;
    if (!this.trackWindowHover) {
      this.active = false;
    }
  }

  private updateNormalizedFromEvent(ev: PointerEvent, wideSpan: boolean): void {
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const prevX = this.normX;
    const prevY = this.normY;

    if (wideSpan && typeof window !== 'undefined') {
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      const spanX = Math.max(rect.width * 0.7, window.innerWidth * 0.38, 160);
      const spanY = Math.max(rect.height * 0.7, window.innerHeight * 0.38, 140);
      this.normX = Math.max(-1, Math.min(1, (ev.clientX - cx) / spanX));
      this.normY = Math.max(-1, Math.min(1, -((ev.clientY - cy) / spanY)));
    } else {
      const relX = (ev.clientX - rect.left) / rect.width;
      const relY = (ev.clientY - rect.top) / rect.height;
      this.normX = Math.max(-1, Math.min(1, relX * 2 - 1));
      this.normY = Math.max(-1, Math.min(1, -(relY * 2 - 1)));
    }

    const delta = Math.hypot(this.normX - prevX, this.normY - prevY);
    this.motionSpeed = Math.min(1, this.motionSpeed + delta * 1.4);
  }
}
