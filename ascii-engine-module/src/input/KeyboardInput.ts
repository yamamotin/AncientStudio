/**
 * KeyboardInput: Non-intrusive keyboard input hook for `Player_Rig` control (`WASD` + `E`).
 * - Disabled by default when instantiated standalone (`new KeyboardInput()`) so page shortcuts
 *   and scrolling are never hijacked unless explicitly enabled by the playground engine.
 * - Ignores keystrokes whenever an `<input>`, `<textarea>`, `<select>`, or `contentEditable`
 *   element is focused.
 * - Maps `W`/`A`/`S`/`D` directly to XZ planar locomotion and `E` to single-shot `Casting`
 *   interaction without interfering with native browser page scrolling.
 * - Also accepts Arrow keys and `Space` when the scene container (or fullscreen view) is hovered
 *   or focused, preventing accidental page scroll only in that active context.
 */

export interface KeyboardAxes {
  moveX: number;
  moveZ: number;
  interactPressed: boolean;
}

export interface KeyboardInputOptions {
  enabled?: boolean;
  focusTarget?: HTMLElement | null;
}

export class KeyboardInput {
  private readonly pressed = new Set<string>();
  private enabled = false;
  private attached = false;
  private interactQueued = false;
  private container: HTMLElement | null = null;
  private pointerInsideContainer = false;

  private readonly onKeyDownBound: (ev: KeyboardEvent) => void;
  private readonly onKeyUpBound: (ev: KeyboardEvent) => void;
  private readonly onBlurBound: () => void;
  private readonly onPointerEnterBound: () => void;
  private readonly onPointerLeaveBound: () => void;

  constructor(optionsOrContainer?: KeyboardInputOptions | HTMLElement | null) {
    if (
      optionsOrContainer &&
      typeof optionsOrContainer === 'object' &&
      ('enabled' in optionsOrContainer || 'focusTarget' in optionsOrContainer)
    ) {
      const opts = optionsOrContainer as KeyboardInputOptions;
      this.enabled = Boolean(opts.enabled);
      this.container = opts.focusTarget ?? null;
    } else {
      this.container = (optionsOrContainer as HTMLElement | null | undefined) ?? null;
    }

    this.onKeyDownBound = this.handleKeyDown.bind(this);
    this.onKeyUpBound = this.handleKeyUp.bind(this);
    this.onBlurBound = this.handleBlur.bind(this);
    this.onPointerEnterBound = () => {
      this.pointerInsideContainer = true;
    };
    this.onPointerLeaveBound = () => {
      this.pointerInsideContainer = false;
    };
  }

  public setContainer(container: HTMLElement | null): void {
    if (this.container === container) return;
    if (this.attached && this.container && typeof this.container.removeEventListener === 'function') {
      this.container.removeEventListener('pointerenter', this.onPointerEnterBound);
      this.container.removeEventListener('pointerleave', this.onPointerLeaveBound);
    }
    this.container = container;
    this.pointerInsideContainer = false;
    if (this.attached && this.container && typeof this.container.addEventListener === 'function') {
      this.container.addEventListener('pointerenter', this.onPointerEnterBound, { passive: true });
      this.container.addEventListener('pointerleave', this.onPointerLeaveBound, { passive: true });
    }
  }

  public setEnabled(enabled: boolean): void {
    if (this.enabled === enabled) return;
    this.enabled = enabled;
    if (enabled) {
      this.attach();
    } else {
      this.detach();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public attach(): void {
    if (this.attached || typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
      return;
    }
    this.attached = true;
    window.addEventListener('keydown', this.onKeyDownBound);
    window.addEventListener('keyup', this.onKeyUpBound);
    window.addEventListener('blur', this.onBlurBound);
    if (this.container && typeof this.container.addEventListener === 'function') {
      this.container.addEventListener('pointerenter', this.onPointerEnterBound, { passive: true });
      this.container.addEventListener('pointerleave', this.onPointerLeaveBound, { passive: true });
    }
  }

  public detach(): void {
    if (!this.attached) return;
    this.attached = false;
    this.pressed.clear();
    this.interactQueued = false;
    this.pointerInsideContainer = false;
    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      window.removeEventListener('keydown', this.onKeyDownBound);
      window.removeEventListener('keyup', this.onKeyUpBound);
      window.removeEventListener('blur', this.onBlurBound);
    }
    if (this.container && typeof this.container.removeEventListener === 'function') {
      this.container.removeEventListener('pointerenter', this.onPointerEnterBound);
      this.container.removeEventListener('pointerleave', this.onPointerLeaveBound);
    }
  }

  /**
   * Programmatic key injection helper (also useful for deterministic ECS integration tests).
   */
  public setKeyState(code: string, isDown: boolean): void {
    if (!this.enabled) return;
    if (isDown) {
      if (!this.pressed.has(code) && (code === 'KeyE' || code === 'Space')) {
        this.interactQueued = true;
      }
      this.pressed.add(code);
    } else {
      this.pressed.delete(code);
    }
  }

  public sampleAxes(): KeyboardAxes {
    if (!this.enabled) {
      return { moveX: 0, moveZ: 0, interactPressed: false };
    }

    let x = 0;
    let z = 0;
    if (this.pressed.has('KeyA') || this.pressed.has('ArrowLeft')) x -= 1;
    if (this.pressed.has('KeyD') || this.pressed.has('ArrowRight')) x += 1;
    if (this.pressed.has('KeyW') || this.pressed.has('ArrowUp')) z -= 1;
    if (this.pressed.has('KeyS') || this.pressed.has('ArrowDown')) z += 1;

    const len = Math.hypot(x, z);
    if (len > 1) {
      x /= len;
      z /= len;
    }

    const interact = this.interactQueued;
    this.interactQueued = false;

    return { moveX: x, moveZ: z, interactPressed: interact };
  }

  private isSceneStageFocusedOrHovered(): boolean {
    if (this.pointerInsideContainer) return true;
    if (typeof document === 'undefined') return false;
    if (document.fullscreenElement) return true;
    if (document.body?.classList?.contains('scene-fullscreen-active')) return true;
    if (this.container && document.activeElement && this.container.contains?.(document.activeElement)) {
      return true;
    }
    return false;
  }

  private handleKeyDown(ev: KeyboardEvent): void {
    if (!this.enabled) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    const active = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;
    if (
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.tagName === 'SELECT' ||
        active.isContentEditable)
    ) {
      return;
    }

    const code = ev.code;
    const isWasdOrE =
      code === 'KeyW' ||
      code === 'KeyA' ||
      code === 'KeyS' ||
      code === 'KeyD' ||
      code === 'KeyE';

    const isArrowOrSpace =
      code === 'ArrowUp' ||
      code === 'ArrowDown' ||
      code === 'ArrowLeft' ||
      code === 'ArrowRight' ||
      code === 'Space';

    if (!isWasdOrE && !isArrowOrSpace) return;

    if (isArrowOrSpace) {
      if (!this.isSceneStageFocusedOrHovered()) return;
      ev.preventDefault?.();
    }

    if (!ev.repeat && (code === 'KeyE' || code === 'Space')) {
      this.interactQueued = true;
    }

    this.pressed.add(code);
  }

  private handleKeyUp(ev: KeyboardEvent): void {
    this.pressed.delete(ev.code);
  }

  private handleBlur(): void {
    this.pressed.clear();
    this.interactQueued = false;
  }
}
