/* Static, friendly ASCII penguin placeholder for [ STACK // NEOFETCH ].
   - Targets `#penguin-stage` and `.penguin-fallback` (with backward compatibility for `.neofetch .ascii-logo`)
   - The font size is fixed at `PENGUIN_FONT_PX` (4px, set by CSS `--penguin-font-px` as well);
     the adaptive grid (`computeFallbackGrid`) only chooses the column/row density used to
     center the art, in parity with the engine's `ResolutionController`.
   - The placeholder is 100% static: no yaw advance, no animation loop, no pointer/touch.
   - It disappears via CSS as soon as `data-mode="engine"` / `tp:scene-mode` reports the live 3D
     mascot, and stays visible as a safe fallback if the engine never mounts. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  // Cute, legible Tux placeholder: round head, two eyes, a wide beak and webbed feet.
  // Kept deliberately compact so it fits the narrowest adaptive grid (28 columns).
  var STATIC_PENGUIN = [
    '       .-"""""-.',
    "     .'   o o   '.",
    '    /    \\   /    \\',
    '   |      \\_/      |',
    '   |       >       |',
    '   |    .-----.    |',
    '  /|   /       \\   |\\',
    ' / |  |         |  | \\',
    '|  |  |         |  |  |',
    '|  |   \\       /   |  |',
    " \\ |    '-----'    | /",
    '  \\|_______________|/',
    '     /_\\       /_\\'
  ];

  // Fixed by design: the penguin is no longer resizable (the temporary test bar is gone).
  var PENGUIN_FONT_PX = 4;

  var ART_WIDTH = STATIC_PENGUIN.reduce(function ( widest, line ) {
    return Math.max(widest, line.length);
  }, 0);

  var state = {
    frameEl: null,
    logoEl: null,
    cols: 34,
    rows: 20,
    fontPx: PENGUIN_FONT_PX,
    yaw: 0.14,
    engineActive: false,
    resizeObserver: null,
    lastRenderedText: ''
  };

  /**
   * Computes adaptive fallback ASCII grid dimensions from real container size & DPR/pointer profile,
   * mirroring `ResolutionController` so placeholder and WebGL2 share coherent density & proportions.
   * `fontPx` is intentionally constant: the penguin keeps its fixed 4px typography and only the
   * centering density follows the container.
   */
  function computeFallbackGrid(width, height) {
    var w = Math.max(160, width || 260);
    var h = Math.max(140, height || 200);
    var coarse = false;
    try {
      coarse = Boolean(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    } catch (e) {
      coarse = false;
    }

    var targetCols;
    if (coarse && w < 420) {
      targetCols = 28;
    } else if (w < 260) {
      targetCols = 30;
    } else if (w >= 420 && !coarse) {
      targetCols = 42;
    } else {
      targetCols = 36;
    }

    var targetRows = Math.max(16, Math.min(28, Math.round((targetCols * (h / w)) * 0.68)));
    return { cols: targetCols, rows: targetRows, fontPx: PENGUIN_FONT_PX };
  }

  function applyAdaptiveGrid(width, height) {
    var grid = computeFallbackGrid(width, height);
    if (grid.cols === state.cols && grid.rows === state.rows && grid.fontPx === state.fontPx) {
      return;
    }
    state.cols = grid.cols;
    state.rows = grid.rows;
    state.fontPx = grid.fontPx;
    state.lastRenderedText = '';

    if (state.logoEl) {
      state.logoEl.style.fontSize = PENGUIN_FONT_PX + 'px';
      state.logoEl.style.lineHeight = '1.06';
    }
  }

  // Builds the same art at every call; only horizontal centering depends on the adaptive grid.
  // No time, yaw or animation state is consulted.
  function renderStaticPenguinArt() {
    var padding = Math.max(0, Math.floor((state.cols - ART_WIDTH) / 2));
    var prefix = new Array(padding + 1).join(' ');
    return STATIC_PENGUIN.map(function (line) {
      return prefix + line;
    }).join('\n');
  }

  function renderFallback() {
    if (!state.logoEl) return;
    var art = renderStaticPenguinArt();
    if (art !== state.lastRenderedText) {
      state.logoEl.textContent = art;
      state.lastRenderedText = art;
    }
  }

  function init() {
    var frameEl =
      document.getElementById('penguin-stage') ||
      document.querySelector('.neofetch .logo-frame');
    var logoEl =
      document.querySelector('#penguin-stage .penguin-fallback') ||
      document.querySelector('.neofetch .ascii-logo');

    if (!logoEl || !frameEl) return;

    state.logoEl = logoEl;
    state.frameEl = frameEl;
    frameEl.setAttribute('data-penguin-ready', 'true');
    frameEl.setAttribute('data-auto-spin', 'false');

    var initialRect = frameEl.getBoundingClientRect();
    applyAdaptiveGrid(initialRect.width, initialRect.height);

    if (window.ResizeObserver) {
      state.resizeObserver = new ResizeObserver(function (entries) {
        var entry = entries[0];
        if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          applyAdaptiveGrid(entry.contentRect.width, entry.contentRect.height);
          renderFallback();
        }
      });
      state.resizeObserver.observe(frameEl);
    }

    state.engineActive = frameEl.getAttribute('data-mode') === 'engine';
    frameEl.addEventListener('tp:scene-mode', function (ev) {
      state.engineActive = Boolean(ev && ev.detail && ev.detail.mode === 'engine');
      // Re-rendering the static art is harmless on fallback and never touches the
      // engine-owned canvas/mascot. No timer or animation loop is ever created.
      if (!state.engineActive) renderFallback();
    });

    renderFallback();
  }

  TP.neofetch = {
    init: init,
    computeFallbackGrid: computeFallbackGrid,
    setYaw: function (yawRad) {
      // Kept for API compatibility with automated checks. The placeholder is
      // static, so yaw is recorded but never drives a render or an animation.
      state.yaw = yawRad;
    },
    fontPx: PENGUIN_FONT_PX,
    getState: function () {
      return {
        yaw: state.yaw,
        cols: state.cols,
        rows: state.rows,
        fontPx: PENGUIN_FONT_PX,
        autoSpin: false,
        engineActive: state.engineActive
      };
    }
  };
})(window.TP);
