/* TEMPORARY visual-test control: penguin font/cell size.
   ---------------------------------------------------------------------------
   This is a deliberately isolated, disposable feature used to try different
   typographic densities on the `[ STACK // NEOFETCH ]` penguin. It is the only
   place that writes `--penguin-font-px`/`data-font-override` and the only caller
   of `TP.scene.setMascotCellSize()`.

   HOW TO REMOVE IT AFTER THE VISUAL TESTS (nothing else depends on it):
     1. delete `assets/js/penguin-font.js`;
     2. delete `<script src="assets/js/penguin-font.js" defer></script>` in `index.html`;
     3. delete `#penguin-font-bar` (inside `#stack-body`) in `index.html`;
     4. delete the `.penguin-font-bar` + `#penguin-stage[data-font-override]` CSS block;
     5. delete the `penguinFont.*` keys from `assets/i18n/*.json` and the embedded
        `BUNDLED` dictionary in `assets/js/i18n.js`.
   The penguin keeps working at its adaptive default size without any of the above:
   `neofetch.js` owns that sizing and never reads this module.

   What it drives:
   - fallback ASCII art: the CSS variable `--penguin-font-px` is applied with
     `!important` through `#penguin-stage[data-font-override="true"]`, so the
     adaptive `font-size` written inline by `neofetch.js` cannot win;
   - live 3D mascot: `TP.scene.setMascotCellSize(px)`, an additive adapter hook that
     only touches mascot controllers and never the main scene's `setCellSize`;
   - reset: back to the default px for the fallback and to the mounted density for
     the mascot (`TP.scene.resetMascotCellSize()`). */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var DEFAULT_PX = 10;
  var MIN_PX = 4;
  var MAX_PX = 20;
  var STEP_PX = 0.5;

  var state = {
    bound: false,
    stage: null,
    input: null,
    output: null,
    reset: null,
    px: DEFAULT_PX
  };

  function clamp(px) {
    var value = Number(px);
    if (!isFinite(value)) return DEFAULT_PX;
    var snapped = Math.round(value / STEP_PX) * STEP_PX;
    return Math.min(MAX_PX, Math.max(MIN_PX, Number(snapped.toFixed(2))));
  }

  function format(px) {
    return Number(Number(px).toFixed(2)) + 'px';
  }

  function syncMascot(px) {
    if (!TP.scene || typeof TP.scene.setMascotCellSize !== 'function') return;
    try {
      TP.scene.setMascotCellSize(px);
    } catch (error) {
      /* the mascot stage may not be mounted yet; the fallback still resizes */
    }
  }

  /* Applies a size to both renderers. `px === null` restores the defaults. */
  function apply(px) {
    var stage = state.stage;
    if (!stage) return DEFAULT_PX;
    var restore = px === null || px === undefined;
    var value = restore ? DEFAULT_PX : clamp(px);

    state.px = value;
    stage.style.setProperty('--penguin-font-px', format(value));
    stage.setAttribute('data-font-override', 'true');
    stage.setAttribute('data-penguin-font-px', format(value));

    if (state.input) {
      state.input.value = String(value);
      state.input.setAttribute('aria-valuetext', format(value));
    }
    if (state.output) state.output.textContent = format(value);

    if (restore) {
      if (TP.scene && typeof TP.scene.resetMascotCellSize === 'function') {
        try {
          TP.scene.resetMascotCellSize();
        } catch (error) {
          /* no mascot mounted */
        }
      }
    } else {
      syncMascot(value);
    }

    return value;
  }

  function onInput() {
    apply(state.input ? state.input.value : state.px);
  }

  /* The mascot mounts asynchronously (engine bundle + WebGL2); re-apply the chosen
     size as soon as the stage reports `mode: engine`, so the bar and the render agree. */
  function onStageMode(event) {
    if (!event || !event.detail || event.detail.mode !== 'engine') return;
    syncMascot(state.px);
  }

  function onReset() {
    apply(null);
    if (state.input && typeof state.input.focus === 'function') state.input.focus();
  }

  function cleanup() {
    if (state.stage) state.stage.removeEventListener('tp:scene-mode', onStageMode);
    if (state.input) {
      state.input.removeEventListener('input', onInput);
      state.input.removeEventListener('change', onInput);
    }
    if (state.reset) state.reset.removeEventListener('click', onReset);
    window.removeEventListener('pagehide', cleanup);
    state.bound = false;
  }

  function init() {
    state.stage = document.getElementById('penguin-stage');
    state.input = document.getElementById('penguin-font-size');
    state.output = document.getElementById('penguin-font-value');
    state.reset = document.getElementById('penguin-font-reset');
    if (!state.stage || !state.input) return false;

    if (state.input.min) state.input.min = String(MIN_PX);
    if (state.input.max) state.input.max = String(MAX_PX);
    state.input.step = String(STEP_PX);

    if (!state.bound) {
      state.bound = true;
      state.input.addEventListener('input', onInput);
      state.input.addEventListener('change', onInput);
      if (state.reset) state.reset.addEventListener('click', onReset);
      state.stage.addEventListener('tp:scene-mode', onStageMode);
      window.addEventListener('pagehide', cleanup);
    }

    // The bar owns the size while it is present: start from its declared default.
    apply(Number(state.input.value) || DEFAULT_PX);
    return true;
  }

  TP.penguinFont = {
    init: init,
    setPixels: apply,
    reset: onReset,
    getPixels: function () { return state.px; },
    config: {
      temporary: true,
      defaultPx: DEFAULT_PX,
      minPx: MIN_PX,
      maxPx: MAX_PX,
      stepPx: STEP_PX,
      cssVar: '--penguin-font-px',
      module: 'assets/js/penguin-font.js'
    }
  };
})(window.TP);
