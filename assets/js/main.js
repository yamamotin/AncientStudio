/* Wiring: typewriter, tabs, API buttons, audio toggle and status. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;

  /* The full line is present in the HTML for a fast, stable LCP; the terminal
     caret animation in CSS keeps the typewriter feel without delaying paint. */
  function initTypewriter() {
    var element = document.getElementById('typewriter');
    if (!element) return;
    var frame = element.closest('.typewriter-frame');
    var text = frame && frame.getAttribute('data-text');
    if (text && element.textContent !== text) element.textContent = text;
  }

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function select(index, moveFocus) {
      tabs.forEach(function (tab, position) {
        var selected = position === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
      });
      if (moveFocus) tabs[index].focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(index, false); });
      tab.addEventListener('keydown', function (event) {
        var target = null;
        if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== null) {
          event.preventDefault();
          select(target, true);
        }
      });
    });
  }

  function renderResponse(data, result, metaId, outputId) {
    var meta = document.getElementById(metaId);
    var output = document.getElementById(outputId);
    var source = result.source === 'api' ? 'API LOCAL' : 'SIM LOCAL';
    meta.textContent = '// ' + source + ' · ' + result.ms + 'ms · ' +
      (data.mode || (data.http_status ? 'HTTP ' + data.http_status : 'ok'));
    output.textContent = JSON.stringify(data, null, 2);
  }

  function initApiButtons() {
    var extract = document.getElementById('extract-button');
    var invoice = document.getElementById('invoice-button');

    if (extract) {
      extract.addEventListener('click', async function () {
        extract.disabled = true;
        var result = await TP.api.extract();
        renderResponse(result.data, result, 'extract-meta', 'extract-output');
        extract.disabled = false;
      });
    }

    if (invoice) {
      invoice.addEventListener('click', async function () {
        invoice.disabled = true;
        var result = await TP.api.parseInvoice();
        renderResponse(result.data, result, 'invoice-meta', 'invoice-output');
        invoice.disabled = false;
      });
    }

    TP.api.detect().then(function (mode) {
      var label = document.getElementById('connection-status');
      if (label) label.textContent = mode === 'api' ? 'API ONLINE' : 'SIM MODE';
      var dot = document.querySelector('.status-dot');
      if (dot && mode === 'api') dot.style.background = 'var(--green)';
    });
  }

  function initAudio() {
    var button = document.getElementById('audio-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      var enabled = !utils.isAudioEnabled();
      utils.setAudio(enabled);
      button.textContent = enabled ? '[ audio: on ]' : '[ audio: off ]';
      button.setAttribute('aria-pressed', String(enabled));
    });

    document.addEventListener('click', function (event) {
      if (event.target.closest('.cmd-button')) utils.beep(760);
    });
  }

  function initScene() {
    var stage = document.getElementById('ascii-scene');
    var penguinStage = document.getElementById('penguin-stage');
    if (!stage) return;
    if (!TP.scene) {
      window.addEventListener('engine-adapter:ready', initScene, { once: true });
      return;
    }

    var badge = document.getElementById('scene-mode');
    var toggle = document.getElementById('scene-toggle');
    var cycle = document.getElementById('scene-cycle');
    var preset = document.getElementById('scene-preset');
    var help = document.querySelector('.scene-help');

    var scene = TP.scene.create(stage, { preset: preset ? preset.value : 'sanctuary' });
    var penguin = penguinStage
      ? TP.scene.create(penguinStage, {
          preset: 'sanctuary',
          weather: false,
          mascotFocus: true,
          config: { mode: 'mascot', maxFps: 36, cellSize: 8, dofStrength: 0.0, edgeStrength: 0.96 }
        })
      : null;

    stage.addEventListener('tp:scene-mode', function (event) {
      var engineReady = event.detail.mode === 'engine';
      if (badge) badge.textContent = engineReady ? 'ENGINE' : 'FALLBACK';
      [toggle, cycle, preset].forEach(function (control) {
        if (control) control.disabled = !engineReady;
      });
      if (help) {
        help.textContent = engineReady
          ? '// motor WebGL2 3D conectado · mouse/toque controlam câmera e reflexo na água'
          : '// controles ativam quando o motor estiver disponível';
      }
    });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var paused = toggle.getAttribute('aria-pressed') !== 'true';
        scene.setPaused(paused);
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? '[ resume ]' : '[ pause ]';
      });
    }

    if (cycle) {
      cycle.addEventListener('click', function () {
        var enabled = cycle.getAttribute('aria-pressed') !== 'true';
        scene.setCycle(enabled);
        cycle.setAttribute('aria-pressed', String(enabled));
        cycle.textContent = enabled ? '[ cycle: on ]' : '[ cycle: off ]';
      });
    }

    if (preset) {
      preset.addEventListener('change', function () {
        scene.setPreset(preset.value);
      });
    }

    scene.mount();
    if (penguin) penguin.mount();
  }

  function initGithubButton() {
    var button = document.getElementById('github-button');
    if (!button) return;
    button.addEventListener('click', function () {
      TP.console.print([
        '[ TODO ] GitHub ainda não informado pelo Eron.',
        'Envie o username para adicionar o link real aqui.'
      ]);
      var input = document.getElementById('console-input');
      if (input) input.focus();
    });
  }

  function init() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    TP.pipeline.init();
    TP.console.init();
    if (TP.neofetch) TP.neofetch.init();
    initTypewriter();
    initTabs();
    initScene();
    initApiButtons();
    initAudio();
    initGithubButton();
    scheduleEngineAdapterLoad();
  }

  /* The adapter and its large WebGL bundle load after first paint, so neither
     can delay the terminal's LCP. The scene wires itself when the adapter lands. */
  function scheduleEngineAdapterLoad() {
    if (TP.scene || document.querySelector('script[data-engine-adapter]')) return;

    function inject() {
      if (document.querySelector('script[data-engine-adapter]')) return;
      var script = document.createElement('script');
      script.src = 'assets/js/engine-adapter.js';
      script.defer = true;
      script.setAttribute('data-engine-adapter', '');
      document.head.appendChild(script);
    }

    var stages = [document.getElementById('penguin-stage'), document.getElementById('ascii-scene')].filter(Boolean);
    if (window.IntersectionObserver && stages.length) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          observer.disconnect();
          inject();
        }
      }, { rootMargin: '300px' });
      stages.forEach(function (stage) { observer.observe(stage); });
    }

    ['pointerdown', 'keydown', 'wheel'].forEach(function (type) {
      window.addEventListener(type, inject, { once: true, passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window.TP);
