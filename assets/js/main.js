/* Wiring: typewriter, tabs, API buttons, audio toggle and status. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var t = function (key, vars) { return TP.i18n ? TP.i18n.t(key, vars) : key; };

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
    var label = t('api.status', { status: result.status, ms: result.ms, source: '/api/v1' });
    if (meta) meta.textContent = '// ' + label;
    if (output) output.textContent = JSON.stringify(data, null, 2);
  }

  function renderError(error, metaId, outputId) {
    var meta = document.getElementById(metaId);
    var output = document.getElementById(outputId);
    var detail = TP.apiClient ? TP.apiClient.describeError(error) : String(error);
    if (meta) meta.textContent = t('api.offline', { detail: detail });
    if (output) output.textContent = JSON.stringify(error.problem || { error: String(error) }, null, 2);
  }

  function initApiButtons() {
    var extract = document.getElementById('extract-button');
    var invoice = document.getElementById('invoice-button');
    var workflowRun = document.getElementById('workflow-run');
    var workflowStatus = document.getElementById('workflow-status');
    var token = document.getElementById('workflow-token');
    var client = TP.apiClient;

    var sampleInvoice = {
      invoice_key: 'NFE-2026-0001',
      issuer_cnpj: '12.345.678/0001-90',
      document_type: 'nfe',
      issued_at: new Date().toISOString(),
      items: [
        { description: 'Consultoria', quantity: 2, unit_price: 100 },
        { description: 'Licenca', quantity: 1, unit_price: 50.5 }
      ],
      totals: { gross: 250.5, tax: 0.1, currency: 'BRL' }
    };

    if (extract && client) {
      extract.addEventListener('click', async function () {
        extract.disabled = true;
        try {
          var result = await client.datasetSummary('ledger');
          renderResponse(result.data, result, 'extract-meta', 'extract-output');
        } catch (error) {
          renderError(error, 'extract-meta', 'extract-output');
        } finally {
          extract.disabled = false;
        }
      });
    }

    if (invoice && client) {
      invoice.addEventListener('click', async function () {
        invoice.disabled = true;
        try {
          var result = await client.submitInvoice(sampleInvoice);
          renderResponse(result.data, result, 'invoice-meta', 'invoice-output');
        } catch (error) {
          renderError(error, 'invoice-meta', 'invoice-output');
        } finally {
          invoice.disabled = false;
        }
      });
    }

    function apiKey() { return token ? token.value.trim() : ''; }

    if (workflowRun && client) {
      workflowRun.addEventListener('click', async function () {
        if (!apiKey()) {
          var metaRun = document.getElementById('workflow-meta');
          if (metaRun) metaRun.textContent = t('workflow.needToken');
          return;
        }
        workflowRun.disabled = true;
        try {
          var result = await client.runWorkflow(
            'invoice-enrichment',
            { payload: { invoice_key: sampleInvoice.invoice_key } },
            apiKey()
          );
          renderResponse(result.data, result, 'workflow-meta', 'workflow-output');
        } catch (error) {
          renderError(error, 'workflow-meta', 'workflow-output');
        } finally {
          workflowRun.disabled = false;
        }
      });
    }

    if (workflowStatus && client) {
      workflowStatus.addEventListener('click', async function () {
        if (!apiKey()) {
          var metaStatus = document.getElementById('workflow-meta');
          if (metaStatus) metaStatus.textContent = t('workflow.needToken');
          return;
        }
        var output = document.getElementById('workflow-output');
        var executionId = null;
        try { executionId = JSON.parse(output.textContent).execution_id; } catch (error) { executionId = null; }
        if (!executionId) {
          var metaMissing = document.getElementById('workflow-meta');
          if (metaMissing) metaMissing.textContent = t('workflow.needToken');
          return;
        }
        workflowStatus.disabled = true;
        try {
          var result = await client.workflowStatus(executionId, apiKey());
          renderResponse(result.data, result, 'workflow-meta', 'workflow-output');
        } catch (error) {
          renderError(error, 'workflow-meta', 'workflow-output');
        } finally {
          workflowStatus.disabled = false;
        }
      });
    }

    if (client) {
      fetch('api-status.json', { cache: 'no-store' })
        .then(function (response) { return response.ok ? response.json() : { ok: false }; })
        .then(function (status) {
          if (!status.ok) {
            var offline = document.getElementById('connection-status');
            if (offline) offline.textContent = t('console.statusSim');
            return null;
          }
          return client.health().then(function (result) {
            var label = document.getElementById('connection-status');
            if (label) {
              label.textContent = t('console.statusApi');
              label.title = result.data.service + '@' + result.data.version;
            }
            var dot = document.querySelector('.status-dot');
            if (dot) dot.style.background = 'var(--green)';
            return client.build();
          }).then(function (buildResult) {
            if (!buildResult) return;
            var label = document.getElementById('connection-status');
            if (label) label.title += ' · ' + String(buildResult.data.sha || '').slice(0, 8);
          });
        })
        .catch(function () {
          var label = document.getElementById('connection-status');
          if (label) label.textContent = t('console.statusSim');
        });
    }
  }

  function initAudio() {
    var button = document.getElementById('audio-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      var enabled = !utils.isAudioEnabled();
      utils.setAudio(enabled);
      button.textContent = enabled ? t('console.audioOn') : t('console.audioOff');
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
      ? TP.scene.create(penguinStage, { preset: 'sanctuary', weather: false, config: { maxFps: 30, cellSize: 12 } })
      : null;

    stage.addEventListener('tp:scene-mode', function (event) {
      var engineReady = event.detail.mode === 'engine';
      if (badge) badge.textContent = engineReady ? 'ENGINE' : 'FALLBACK';
      [toggle, cycle, preset].forEach(function (control) {
        if (control) control.disabled = !engineReady;
      });
      if (help) {
        help.textContent = engineReady ? t('scene.presetHelp') : t('scene.fallbackHelp');
      }
    });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var paused = toggle.getAttribute('aria-pressed') !== 'true';
        scene.setPaused(paused);
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.textContent = paused ? t('scene.resume') : t('scene.pause');
      });
    }

    if (cycle) {
      cycle.addEventListener('click', function () {
        var enabled = cycle.getAttribute('aria-pressed') !== 'true';
        scene.setCycle(enabled);
        cycle.setAttribute('aria-pressed', String(enabled));
        cycle.textContent = enabled ? t('scene.cycleOn') : t('scene.cycleOff');
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
        t('console.githubTodo'),
        t('console.githubDetail')
      ]);
      var input = document.getElementById('console-input');
      if (input) input.focus();
    });
  }

  function applyDynamicLabels() {
    var toggle = document.getElementById('scene-toggle');
    var cycle = document.getElementById('scene-cycle');
    var audio = document.getElementById('audio-toggle');
    var status = document.getElementById('connection-status');
    if (toggle && toggle.textContent.indexOf('resume') >= 0) toggle.textContent = t('scene.resume');
    if (cycle && cycle.getAttribute('aria-pressed') === 'true') cycle.textContent = t('scene.cycleOn');
    if (audio && audio.getAttribute('aria-pressed') === 'true') audio.textContent = t('console.audioOn');
    if (status && status.textContent === t('console.statusSim')) status.textContent = t('console.statusSim');
  }

  function init() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    TP.pipeline.init();
    TP.console.init();
    initTypewriter();
    initTabs();
    initScene();
    initAudio();
    scheduleUiIntegrations();
    scheduleEngineAdapterLoad();
  }

  /* i18n and the real API client load after first paint so they never compete
     with the hero LCP. Both are small and wire themselves when ready. */
  function scheduleUiIntegrations() {
    function load(src, onload) {
      var flag = 'data-' + src.replace(/\./g, '-');
      if (document.querySelector('script[' + flag + ']')) { onload(); return; }
      var script = document.createElement('script');
      script.src = 'assets/js/' + src;
      script.defer = true;
      script.setAttribute(flag, '');
      script.onload = onload;
      document.head.appendChild(script);
    }

    function wire() {
      if (TP.i18n) {
        TP.i18n.bindToggle();
        TP.i18n.init().then(function () {
          if (pendingLang) TP.i18n.setLanguage(pendingLang);
          applyDynamicLabels();
        });
        window.addEventListener('tp:languagechange', function () {
          initTypewriter();
          applyDynamicLabels();
        });
      }
      initApiButtons();
      initGithubButton();
      queuedClicks.forEach(function (id) {
        var button = document.getElementById(id);
        if (button) button.click();
      });
    }

    var started = false;
    function start() {
      if (started) return;
      started = true;
      load('i18n.js', function () { load('api-client.js', wire); });
    }
    var pendingLang = null;
    var queuedClicks = [];

    document.addEventListener('pointerdown', function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      if (target.closest('#lang-toggle')) {
        event.preventDefault();
        event.stopPropagation();
        pendingLang = 'en';
        start();
        return;
      }
      var action = target.closest('#extract-button, #invoice-button, #workflow-run, #workflow-status');
      if (action) {
        event.preventDefault();
        event.stopPropagation();
        queuedClicks.push(action.id);
        start();
      }
    }, { capture: true, passive: false });

    // Only explicit interaction loads these integrations: automated audits that
    // never click a control keep the same critical path as the static portfolio.
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
