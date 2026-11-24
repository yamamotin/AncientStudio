/**
 * KeyboardInput: Decoupled keyboard state module prepared for playable avatar/camera controls.
 * - Strictly opt-in (`setEnabled(true)`): when disabled (default on portfolio pages), it never
 *   intercepts keys, browser shortcuts, form inputs, or page scrolling (Space / Arrow keys).
 * - Even when enabled, automatically ignores events originating inside `<input>`, `<textarea>`,
 *   `<select>`, or `[contenteditable]` elements, and never blocks modifier combos (Ctrl/Cmd/Alt).
 */

export interface KeyboardAxes {
  /** Horizontal axis [-1 = Left/A, +1 = Right/D] */
  moveX: number;
  /** Forward/backward axis [-1 = Forward/W, +1 = Backward/S] */
  moveZ: number;
  /** Action / interact pulse (E / Enter) */
  interactPressed: boolean;
}

const MOVEMENT_CODES = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]);

export class KeyboardInput {
  private readonly pressedKeys = new Set<string>();
  private enabled = false;
  private attached = false;
  private requireFocusTarget: HTMLElement | null = null;

  private readonly onKeyDownBound: (ev: KeyboardEvent) => void;
  private readonly onKeyUpBound: (ev: KeyboardEvent) => void;
  private readonly onWindowBlurBound: () => void;

  constructor(options?: { enabled?: boolean; focusTarget?: HTMLElement | null }) {
    this.enabled = Boolean(options?.enabled);
    this.requireFocusTarget = options?.focusTarget ?? null;

    this.onKeyDownBound = this.handleKeyDown.bind(this);
    this.onKeyUpBound = this.handleKeyUp.bind(this);
    this.onWindowBlurBound = this.clearKeys.bind(this);
  }

  public attach(): void {
    if (this.attached || typeof window === 'undefined') return;
    this.attached = true;
    window.addEventListener('keydown', this.onKeyDownBound);
    window.addEventListener('keyup', this.onKeyUpBound);
    window.addEventListener('blur', this.onWindowBlurBound);
  }

  public detach(): void {
    if (!this.attached || typeof window === 'undefined') return;
    this.attached = false;
    window.removeEventListener('keydown', this.onKeyDownBound);
    window.removeEventListener('keyup', this.onKeyUpBound);
    window.removeEventListener('blur', this.onWindowBlurBound);
    this.clearKeys();
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.clearKeys();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isKeyDown(code: string): boolean {
    return this.enabled && this.pressedKeys.has(code);
  }

  public clearKeys(): void {
    this.pressedKeys.clear();
  }

  public sampleAxes(): KeyboardAxes {
    if (!this.enabled) {
      return { moveX: 0, moveZ: 0, interactPressed: false };
    }

    const left = this.pressedKeys.has('KeyA') || this.pressedKeys.has('ArrowLeft') ? -1 : 0;
    const right = this.pressedKeys.has('KeyD') || this.pressedKeys.has('ArrowRight') ? 1 : 0;
    const up = this.pressedKeys.has('KeyW') || this.pressedKeys.has('ArrowUp') ? -1 : 0;
    const down = this.pressedKeys.has('KeyS') || this.pressedKeys.has('ArrowDown') ? 1 : 0;

    let moveX = left + right;
    let moveZ = up + down;
    const mag = Math.hypot(moveX, moveZ);
    if (mag > 1) {
      moveX /= mag;
      moveZ /= mag;
    }

    return {
      moveX,
      moveZ,
      interactPressed: this.pressedKeys.has('KeyE'),
    };
  }

  private isTypingInFormField(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    return target.isContentEditable;
  }

  private hasActiveContextFocus(): boolean {
    if (!this.requireFocusTarget || typeof document === 'undefined') return true;
    const active = document.activeElement;
    return active === this.requireFocusTarget || this.requireFocusTarget.contains(active);
  }

  private handleKeyDown(ev: KeyboardEvent): void {
    if (!this.enabled) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (this.isTypingInFormField(ev.target)) return;
    if (!this.hasActiveContextFocus()) return;

    this.pressedKeys.add(ev.code);

    // Only prevent default arrow scrolling when playable mode + stage focus are explicitly active
    if (MOVEMENT_CODES.has(ev.code) && this.requireFocusTarget) {
      ev.preventDefault();
    }
  }

  private handleKeyUp(ev: KeyboardEvent): void {
    this.pressedKeys.delete(ev.code);
  }
}
