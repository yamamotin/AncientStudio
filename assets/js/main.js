/* Wiring: typewriter, tabs, API buttons, audio toggle and status. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;

  function initTypewriter() {
    var element = document.getElementById('typewriter');
    if (!element || utils.reducedMotion) return;

    var text = element.textContent;
    element.textContent = '';
    var index = 0;

    function tick() {
      element.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) window.setTimeout(tick, 24);
    }
    tick();
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
    if (!stage || !TP.scene) return;

    var badge = document.getElementById('scene-mode');
    var toggle = document.getElementById('scene-toggle');
    var preset = document.getElementById('scene-preset');
    var help = document.querySelector('.scene-help');

    stage.addEventListener('tp:scene-mode', function (event) {
      var engineReady = event.detail.mode === 'engine';
      if (badge) badge.textContent = engineReady ? 'ENGINE' : 'FALLBACK';
      if (toggle) toggle.disabled = !engineReady;
      if (preset) preset.disabled = !engineReady;
      if (help) {
        help.textContent = engineReady
          ? '// motor WebGL2 3D conectado · mova o mouse para parallax + reflexo na água'
          : '// controles ativam quando o motor estiver disponível';
      }
    });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var paused = toggle.getAttribute('aria-pressed') !== 'true';
        TP.scene.setPaused(paused);
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? '[ resume ]' : '[ pause ]';
      });
    }

    if (preset) {
      preset.addEventListener('change', function () {
        TP.scene.setPreset(preset.value);
      });
    }

    TP.scene.mount(stage, { preset: preset ? preset.value : 'outpost', paused: false });

    // Auto-hibernate GPU when [ ASCII REALMS // SCENE ] scrolls completely out of viewport
    if (window.IntersectionObserver) {
      var sceneObserver = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        if (!entry || TP.scene.getMode() !== 'engine') return;
        var manuallyPaused = toggle && toggle.getAttribute('aria-pressed') === 'true';
        if (manuallyPaused) return;
        TP.scene.setPaused(!entry.isIntersecting);
      }, { threshold: 0.02 });
      sceneObserver.observe(stage);
    }
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window.TP);
