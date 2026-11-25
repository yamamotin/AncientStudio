/**
 * PointerInput: Unified mouse & touch input tracker.
 * - Normalizes pointer coordinates relative to the container [-1, +1]
 * - Supports hover tracking on desktop AND full touch interaction (`pointer*` + explicit
 *   `touchstart` / `touchmove` / `touchend` / `touchcancel` listeners) on mobile & tablets
 * - Uses `{ passive: true }` + `touch-action: pan-y` exclusively so vertical page scrolling
 *   is NEVER blocked when swiping or scrolling outside/across the stage!
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
  /** True when pointer/touch is actively inside or recently moved */
  active: boolean;
  /** True while primary button or touch finger is pressed */
  isDown: boolean;
  /** True when the active/most recent gesture came from touch input */
  isTouch: boolean;
  /** Motion speed magnitude [0..1] for reactive character/VFX excitement */
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
  private isTouch = false;
  private activeTouchId: number | null = null;
  private lastClientX = 0;
  private lastClientY = 0;
  private motionSpeed = 0;
  private lastInteractionMs = 0;
  private touchReleaseHoldTimer = 0;
  private attached = false;

  private readonly onPointerDownBound: (ev: PointerEvent) => void;
  private readonly onPointerMoveBound: (ev: PointerEvent) => void;
  private readonly onWindowPointerMoveBound: (ev: PointerEvent) => void;
  private readonly onPointerUpBound: (ev: PointerEvent) => void;
  private readonly onPointerLeaveBound: (ev: PointerEvent) => void;
  private readonly onTouchStartBound: (ev: TouchEvent) => void;
  private readonly onTouchMoveBound: (ev: TouchEvent) => void;
  private readonly onTouchEndBound: (ev: TouchEvent) => void;

  constructor(container: HTMLElement, options?: PointerInputOptions) {
    this.container = container;
    this.trackWindowHover = Boolean(options?.trackWindowHover);

    this.onPointerDownBound = this.handlePointerDown.bind(this);
    this.onPointerMoveBound = this.handleContainerPointerMove.bind(this);
    this.onWindowPointerMoveBound = this.handleWindowPointerMove.bind(this);
    this.onPointerUpBound = this.handlePointerUp.bind(this);
    this.onPointerLeaveBound = this.handlePointerLeave.bind(this);
    this.onTouchStartBound = this.handleTouchStart.bind(this);
    this.onTouchMoveBound = this.handleTouchMove.bind(this);
    this.onTouchEndBound = this.handleTouchEnd.bind(this);
  }

  public attach(): void {
    if (this.attached) return;
    this.attached = true;

    // Allow vertical page scrolling seamlessly on touchscreens while horizontal/diagonal gestures still feed scene camera & avatar
    if (!this.container.style.touchAction) {
      this.container.style.touchAction = 'pan-y';
    }

    this.container.addEventListener('pointerdown', this.onPointerDownBound, { passive: true });
    this.container.addEventListener('pointermove', this.onPointerMoveBound, { passive: true });
    this.container.addEventListener('pointerup', this.onPointerUpBound, { passive: true });
    this.container.addEventListener('pointercancel', this.onPointerUpBound, { passive: true });
    this.container.addEventListener('pointerleave', this.onPointerLeaveBound, { passive: true });

    // Explicit passive touch listeners guarantee smooth mobile interaction across iOS Safari, Android WebView & touch laptops
    this.container.addEventListener('touchstart', this.onTouchStartBound, { passive: true });
    this.container.addEventListener('touchmove', this.onTouchMoveBound, { passive: true });
    this.container.addEventListener('touchend', this.onTouchEndBound, { passive: true });
    this.container.addEventListener('touchcancel', this.onTouchEndBound, { passive: true });

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

    this.container.removeEventListener('touchstart', this.onTouchStartBound);
    this.container.removeEventListener('touchmove', this.onTouchMoveBound);
    this.container.removeEventListener('touchend', this.onTouchEndBound);
    this.container.removeEventListener('touchcancel', this.onTouchEndBound);

    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      window.removeEventListener('pointermove', this.onWindowPointerMoveBound);
      window.removeEventListener('pointerup', this.onPointerUpBound);
    }
  }

  /**
   * Decays motion speed & post-touch hold smoothly per frame and returns the normalized snapshot.
   */
  public sample(dt: number): PointerSnapshot {
    this.motionSpeed = Math.max(0, this.motionSpeed - dt * 2.4);

    if (this.touchReleaseHoldTimer > 0 && !this.isDown) {
      this.touchReleaseHoldTimer = Math.max(0, this.touchReleaseHoldTimer - dt);
      if (this.touchReleaseHoldTimer === 0 && !this.trackWindowHover) {
        this.active = false;
      }
    }

    // Gently decay drag & touch offset back toward center when user releases touch/drag
    if (!this.isDown && !this.active) {
      const relax = 1 - Math.exp(-2.2 * dt);
      this.dragYaw += (0 - this.dragYaw) * relax;
      this.dragPitch += (0 - this.dragPitch) * relax;
      this.normX += (0 - this.normX) * relax;
      this.normY += (0 - this.normY) * relax;
    }

    return {
      normX: this.normX,
      normY: this.normY,
      dragYaw: this.dragYaw,
      dragPitch: this.dragPitch,
      active: this.active,
      isDown: this.isDown,
      isTouch: this.isTouch,
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
    if (ev.pointerType === 'touch') {
      this.isTouch = true;
      // Touch coordinates are handled uniformly with touch sensitivity below
    } else {
      this.isTouch = false;
    }

    this.isDown = true;
    this.active = true;
    this.touchReleaseHoldTimer = 0;
    this.lastClientX = ev.clientX;
    this.lastClientY = ev.clientY;
    if (ev.isTrusted) {
      this.lastInteractionMs = Date.now();
    }
    this.updateNormalizedFromClient(ev.clientX, ev.clientY, false);
  }

  private handleContainerPointerMove(ev: PointerEvent): void {
    // Avoid double-accumulating dragYaw when both TouchEvent and touch PointerEvent fire on mobile browsers
    if (ev.pointerType === 'touch' && this.activeTouchId !== null) {
      return;
    }

    if (ev.isTrusted) {
      this.lastInteractionMs = Date.now();
    }

    const touchFactor = ev.pointerType === 'touch' ? 1.35 : 1.0;
    if (this.isDown) {
      const dx = ev.clientX - this.lastClientX;
      const dy = ev.clientY - this.lastClientY;
      this.lastClientX = ev.clientX;
      this.lastClientY = ev.clientY;

      this.dragYaw = Math.max(-Math.PI, Math.min(Math.PI, this.dragYaw + dx * 0.012 * touchFactor));
      this.dragPitch = Math.max(-0.55, Math.min(0.55, this.dragPitch + dy * 0.0075 * touchFactor));
      this.motionSpeed = Math.min(1, this.motionSpeed + Math.hypot(dx, dy) * 0.026);
    }

    this.active = true;
    this.updateNormalizedFromClient(ev.clientX, ev.clientY, false);
  }

  private handleWindowPointerMove(ev: PointerEvent): void {
    if (!ev.isTrusted) return;
    this.lastInteractionMs = Date.now();
    this.active = true;
    this.updateNormalizedFromClient(ev.clientX, ev.clientY, true);
  }

  private handlePointerUp(ev: PointerEvent): void {
    if (ev.pointerType === 'touch') {
      this.touchReleaseHoldTimer = 1.6;
    }
    this.isDown = false;
  }

  private handlePointerLeave(ev: PointerEvent): void {
    if (ev.pointerType === 'touch') return;
    this.isDown = false;
    if (!this.trackWindowHover) {
      this.active = false;
    }
  }

  private handleTouchStart(ev: TouchEvent): void {
    const touch = ev.changedTouches?.[0] ?? ev.touches?.[0];
    if (!touch) return;

    this.isTouch = true;
    this.isDown = true;
    this.active = true;
    this.touchReleaseHoldTimer = 0;
    this.activeTouchId = touch.identifier ?? 0;
    this.lastClientX = touch.clientX;
    this.lastClientY = touch.clientY;
    if (ev.isTrusted !== false) {
      this.lastInteractionMs = Date.now();
    }
    this.updateNormalizedFromClient(touch.clientX, touch.clientY, false);
  }

  private handleTouchMove(ev: TouchEvent): void {
    const touches = ev.changedTouches ?? ev.touches;
    if (!touches || touches.length === 0) return;

    let touch = touches[0]!;
    if (this.activeTouchId !== null) {
      for (let i = 0; i < touches.length; i++) {
        if (touches[i]!.identifier === this.activeTouchId) {
          touch = touches[i]!;
          break;
        }
      }
    }

    if (ev.isTrusted !== false) {
      this.lastInteractionMs = Date.now();
    }

    const dx = touch.clientX - this.lastClientX;
    const dy = touch.clientY - this.lastClientY;
    this.lastClientX = touch.clientX;
    this.lastClientY = touch.clientY;

    // Smooth touch look/orbit pan: responsive horizontal pan while allowing natural vertical page scroll (`pan-y`)
    this.dragYaw = Math.max(-Math.PI, Math.min(Math.PI, this.dragYaw + dx * 0.015));
    this.dragPitch = Math.max(-0.55, Math.min(0.55, this.dragPitch + dy * 0.0085));
    this.motionSpeed = Math.min(1, this.motionSpeed + Math.hypot(dx, dy) * 0.03);

    this.active = true;
    this.isDown = true;
    this.updateNormalizedFromClient(touch.clientX, touch.clientY, false);
  }

  private handleTouchEnd(ev: TouchEvent): void {
    const remaining = ev.touches ? ev.touches.length : 0;
    if (remaining === 0) {
      this.isDown = false;
      this.activeTouchId = null;
      // Hold camera look angle briefly after finger lift before smoothly relaxing back
      this.touchReleaseHoldTimer = 1.8;
    }
  }

  private updateNormalizedFromClient(clientX: number, clientY: number, wideSpan: boolean): void {
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const prevX = this.normX;
    const prevY = this.normY;

    if (wideSpan && typeof window !== 'undefined') {
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      const spanX = Math.max(rect.width * 0.7, window.innerWidth * 0.38, 160);
      const spanY = Math.max(rect.height * 0.7, window.innerHeight * 0.38, 140);
      this.normX = Math.max(-1, Math.min(1, (clientX - cx) / spanX));
      this.normY = Math.max(-1, Math.min(1, -((clientY - cy) / spanY)));
    } else {
      const relX = (clientX - rect.left) / rect.width;
      const relY = (clientY - rect.top) / rect.height;
      this.normX = Math.max(-1, Math.min(1, relX * 2 - 1));
      this.normY = Math.max(-1, Math.min(1, -(relY * 2 - 1)));
    }

    const delta = Math.hypot(this.normX - prevX, this.normY - prevY);
    this.motionSpeed = Math.min(1, this.motionSpeed + delta * 1.4);
  }
}
