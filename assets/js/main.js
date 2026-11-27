/* Wiring: typewriter, tabs, API buttons, audio toggle and status. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var t = function (key, vars) { return TP.i18n ? TP.i18n.t(key, vars) : key; };
  var sceneFullscreenState = { active: false, syncLabels: null };

  var CONTACT_EMAIL_URL = 'mailto:yamah1337@gmail.com';
  var CONTACT_WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=5544920009249';

  // Mobile keeps the existing "write an email" action; every other device opens WhatsApp.
  // UA hints are combined with pointer/viewport media queries so a touch laptop or a
  // resized desktop is not misclassified. Detection never binds mouse/pointer handlers.
  function isMobileContactDevice() {
    var nav = window.navigator || {};
    var mobileUa = /Android|iPhone|iPad|iPod|Mobile/i.test(nav.userAgent || '');
    var mobileHint = Boolean(nav.userAgentData && nav.userAgentData.mobile);
    var coarsePointer = false;
    var narrowViewport = false;
    try {
      coarsePointer = Boolean(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      narrowViewport = Boolean(window.matchMedia && window.matchMedia('(max-width: 900px)').matches);
    } catch (error) {
      coarsePointer = false;
      narrowViewport = false;
    }
    return mobileUa || mobileHint || (coarsePointer && narrowViewport);
  }

  function contactDestination() {
    return isMobileContactDevice() ? CONTACT_EMAIL_URL : CONTACT_WHATSAPP_URL;
  }

  TP.contact = {
    isMobile: isMobileContactDevice,
    destination: contactDestination
  };

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
    var src = result.source || '/api/v1';
    var label = result.method && result.route
      ? t('api.routeStatus', {
          method: result.method,
          route: result.route,
          status: result.status,
          ms: result.ms,
          source: src
        })
      : t('api.status', { status: result.status, ms: result.ms, source: src });
    if (meta) meta.textContent = '// ' + label;
    if (output) output.textContent = JSON.stringify(data, null, 2);
  }

  function renderError(error, metaId, outputId) {
    var meta = document.getElementById(metaId);
    var output = document.getElementById(outputId);
    if (error && error.cause && error.problem && error.status >= 400) {
      renderResponse(error.problem, error.cause, metaId, outputId);
      return;
    }
    var detail = TP.apiClient ? TP.apiClient.describeError(error) : String(error);
    if (meta) meta.textContent = t('api.offline', { detail: detail });
    if (output) output.textContent = JSON.stringify((error && error.problem) || { error: String(error) }, null, 2);
  }

  function isBackendOfflineError(error, backendOnline) {
    if (!error) return false;
    if (error.status === 0) return true;
    if (!backendOnline && (error.status === 404 || error.status === 405) && !error.problem) return true;
    if (!backendOnline && (error.status === 404 || error.status === 405) && error.problem && !error.problem.detail) return true;
    return false;
  }

  function initApiButtons() {
    var transparenciaBtn = document.getElementById('transparencia-button');
    var projudiConsultaBtn = document.getElementById('projudi-consulta-button');
    var projudiDetalheBtn = document.getElementById('projudi-detalhe-button');
    var bcbIndicadoresBtn = document.getElementById('bcb-indicadores-button');
    var bcbInstituicoesBtn = document.getElementById('bcb-instituicoes-button');
    var siscomexNcmBtn = document.getElementById('siscomex-ncm-button');
    var projudiResumoBtn = document.getElementById('projudi-resumo-button');
    var extract = document.getElementById('extract-button');
    var invoice = document.getElementById('invoice-button');
    var workflowRun = document.getElementById('workflow-run');
    var workflowStatus = document.getElementById('workflow-status');
    var token = document.getElementById('workflow-token');
    var client = TP.apiClient;
    var backendOnline = false;

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

    function bindConnectorAction(button, metaId, outputId, liveCall, staticCall) {
      if (!button || !client) return;
      button.addEventListener('click', async function () {
        button.disabled = true;
        try {
          if (!backendOnline && window.location.protocol === 'file:' && staticCall) {
            var fileSim = await staticCall();
            renderResponse(fileSim.data, fileSim, metaId, outputId);
            return;
          }
          var result = await liveCall();
          renderResponse(result.data, result, metaId, outputId);
        } catch (error) {
          if (staticCall && isBackendOfflineError(error, backendOnline)) {
            var sim = await staticCall();
            renderResponse(sim.data, sim, metaId, outputId);
          } else {
            renderError(error, metaId, outputId);
          }
        } finally {
          button.disabled = false;
        }
      });
    }

    function valOf(id, fallback) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : (fallback || '');
    }

    bindConnectorAction(
      transparenciaBtn,
      'extract-meta',
      'extract-output',
      function () { return client.transparenciaMunicipio(valOf('etl-cidade', 'Paranavaí'), valOf('etl-uf', 'PR')); },
      function () { return TP.api.transparenciaMunicipio(valOf('etl-cidade', 'Paranavaí'), valOf('etl-uf', 'PR')); }
    );

    bindConnectorAction(
      projudiConsultaBtn,
      'extract-meta',
      'extract-output',
      function () {
        var req = {
          cpf: valOf('projudi-cpf'),
          tribunal: valOf('projudi-tribunal', 'TJPR')
        };
        var cap = valOf('projudi-captcha', '');
        if (cap) req.captcha_token = cap;
        return client.projudiConsulta(req);
      },
      function () {
        var req = {
          cpf: valOf('projudi-cpf'),
          tribunal: valOf('projudi-tribunal', 'TJPR')
        };
        var cap = valOf('projudi-captcha', '');
        if (cap) req.captcha_token = cap;
        return TP.api.projudiConsulta(req);
      }
    );

    bindConnectorAction(
      projudiDetalheBtn,
      'extract-meta',
      'extract-output',
      function () {
        var cap = valOf('projudi-captcha', '');
        return client.projudiProcesso(valOf('projudi-numero'), cap ? { captcha_token: cap } : undefined);
      },
      function () { return TP.api.projudiProcesso(valOf('projudi-numero')); }
    );

    bindConnectorAction(
      bcbIndicadoresBtn,
      'invoice-meta',
      'invoice-output',
      function () { return client.bcbIndicadores(Number(valOf('bcb-ultimos', '5')) || 5); },
      function () { return TP.api.bcbIndicadores(Number(valOf('bcb-ultimos', '5')) || 5); }
    );

    bindConnectorAction(
      bcbInstituicoesBtn,
      'invoice-meta',
      'invoice-output',
      function () { return client.bcbInstituicoes(valOf('bcb-busca', '')); },
      function () { return TP.api.bcbInstituicoes(valOf('bcb-busca', '')); }
    );

    bindConnectorAction(
      siscomexNcmBtn,
      'invoice-meta',
      'invoice-output',
      function () { return client.siscomexNcm(valOf('siscomex-query', '')); },
      function () { return TP.api.siscomexNcm(valOf('siscomex-query', '')); }
    );

    bindConnectorAction(
      projudiResumoBtn,
      'workflow-meta',
      'workflow-output',
      function () {
        return client.projudiResumo(valOf('resumo-numero'), {
          texto_processo: valOf('resumo-texto')
        });
      },
      function () {
        return TP.api.projudiResumo(valOf('resumo-numero'), {
          texto_processo: valOf('resumo-texto')
        });
      }
    );

    if (extract && client) {
      extract.addEventListener('click', async function () {
        extract.disabled = true;
        try {
          var result;
          try {
            result = await client.datasetSummary('ledger');
          } catch (firstErr) {
            if (firstErr && firstErr.status === 404 && backendOnline) {
              result = await client.extract();
            } else {
              throw firstErr;
            }
          }
          renderResponse(result.data, result, 'extract-meta', 'extract-output');
        } catch (error) {
          if (isBackendOfflineError(error, backendOnline) && TP.api) {
            var simExt = await TP.api.extract();
            renderResponse(simExt.data, simExt, 'extract-meta', 'extract-output');
          } else {
            renderError(error, 'extract-meta', 'extract-output');
          }
        } finally {
          extract.disabled = false;
        }
      });
    }

    if (invoice && client) {
      invoice.addEventListener('click', async function () {
        invoice.disabled = true;
        try {
          var result;
          try {
            result = await client.submitInvoice(sampleInvoice);
          } catch (firstErr) {
            if (firstErr && firstErr.status === 404 && backendOnline) {
              result = await client.parseLegacyInvoice({
                invoice_key: sampleInvoice.invoice_key,
                document_type: 'NF-e',
                event_id: 'evt-ui-3522'
              });
            } else {
              throw firstErr;
            }
          }
          renderResponse(result.data, result, 'invoice-meta', 'invoice-output');
        } catch (error) {
          if (isBackendOfflineError(error, backendOnline) && TP.api) {
            var simInv = await TP.api.parseInvoice({
              invoice_key: sampleInvoice.invoice_key,
              document_type: 'NF-e',
              event_id: 'evt-ui-3522'
            });
            renderResponse(simInv.data, simInv, 'invoice-meta', 'invoice-output');
          } else {
            renderError(error, 'invoice-meta', 'invoice-output');
          }
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
      var Controller = window.AbortController;
      var controller = typeof Controller === 'function' ? new Controller() : null;
      var timer = null;
      if (controller) {
        timer = window.setTimeout(function () { controller.abort(); }, 5000);
      }
      fetch('api-status.json', { cache: 'no-store', signal: controller ? controller.signal : undefined })
        .then(function (response) { return response.ok ? response.json() : { ok: false }; })
        .then(function (status) {
          if (!status.ok) {
            backendOnline = false;
            var offline = document.getElementById('connection-status');
            if (offline) offline.textContent = t('console.statusSim');
            return null;
          }
          backendOnline = true;
          return client.health().then(function (result) {
            var label = document.getElementById('connection-status');
            if (label) {
              label.textContent = t('console.statusApi');
              label.title = result.data.service + '@' + (result.data.version || '1.0');
            }
            var dot = document.querySelector('.status-dot');
            if (dot) dot.style.background = 'var(--green)';
            return client.build().catch(function () { return null; });
          }).then(function (buildResult) {
            if (!buildResult || !buildResult.data) return;
            var label = document.getElementById('connection-status');
            if (label && buildResult.data.sha) label.title += ' · ' + String(buildResult.data.sha).slice(0, 8);
          });
        })
        .catch(function () {
          backendOnline = false;
          var label = document.getElementById('connection-status');
          if (label) label.textContent = t('console.statusSim');
        })
        .finally(function () {
          if (timer) window.clearTimeout(timer);
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
    var modeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-scene-mode]'));
    var help = document.querySelector('.scene-help');
    var activeMode = 'night';

    var scene = TP.scene.create(stage, { preset: activeMode });
    var penguin = penguinStage
      ? TP.scene.create(penguinStage, {
          preset: 'night',
          weather: false,
          mascotFocus: true,
          config: { mode: 'mascot', maxFps: 36, cellSize: 8, dofStrength: 0.0, edgeStrength: 0.96 }
        })
      : null;

    stage.addEventListener('tp:scene-mode', function (event) {
      var engineReady = event.detail.mode === 'engine';
      if (badge) badge.textContent = engineReady ? 'ENGINE' : 'FALLBACK';
      [toggle].concat(modeButtons).forEach(function (control) {
        if (control) control.disabled = !engineReady;
      });
      if (help) {
        help.textContent = engineReady ? t('scene.engineHelp') : t('scene.fallbackHelp');
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

    modeButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeMode = button.getAttribute('data-scene-mode');
        scene.setPreset(activeMode);
        modeButtons.forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === button));
        });
      });
    });

    scene.mount();
    if (penguin) penguin.mount();
  }

  function initBrightness() {
    var input = document.getElementById('brightness-control');
    var output = document.getElementById('brightness-value');
    if (!input) return;

    var storageKey = 'tp-page-brightness';
    var min = Number(input.min) || 100;
    var max = Number(input.max) || 150;
    var fallback = Number(input.value) || 130;

    function apply(value, persist) {
      var amount = Math.min(max, Math.max(min, Number(value) || fallback));
      document.documentElement.style.setProperty('--page-brightness', String(amount / 100));
      input.value = String(amount);
      if (output) output.textContent = amount + '%';
      if (persist) {
        try { localStorage.setItem(storageKey, String(amount)); } catch (error) { /* storage disabled */ }
      }
    }

    var saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (error) { saved = null; }
    apply(saved === null ? fallback : saved, false);
    input.addEventListener('input', function () { apply(input.value, true); });
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

  // The contact control stays a real <a>, so keyboard activation and its translated
  // label are unchanged. Only its href follows the current device profile.
  function initContactButton() {
    var link = document.getElementById('contact-button');
    if (!link) return;

    function syncHref() {
      var href = contactDestination();
      if (link.getAttribute('href') !== href) link.setAttribute('href', href);
    }

    syncHref();
    if (window.addEventListener) {
      window.addEventListener('resize', syncHref, { passive: true });
      window.addEventListener('orientationchange', syncHref, { passive: true });
    }
  }

  // Secrets typed in the UI are masked, never persisted and wiped when the tab
  // stops being visible: no localStorage/sessionStorage write exists for them.
  function initSensitiveInputs() {
    var fields = Array.prototype.slice.call(document.querySelectorAll('input[data-sensitive]'));

    function wipe() {
      Array.prototype.forEach.call(document.querySelectorAll('input[data-sensitive]'), function (field) {
        field.value = '';
      });
    }

    fields.forEach(function (field) {
      field.setAttribute('autocomplete', 'new-password');
      field.setAttribute('spellcheck', 'false');
      field.setAttribute('data-lpignore', 'true');
    });

    if (!fields.length) return;
    window.addEventListener('pagehide', wipe);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') wipe();
    });
  }

  /* Fullscreen is a viewport/layout change only: no scene instance is created,
     destroyed or remounted. The existing adapter ResizeObserver handles the new
     container size, so the rest of the portfolio keeps running. */
  function initSceneFullscreen() {
    var section = document.getElementById('scene');
    var button = document.getElementById('scene-fullscreen');
    if (!section || !button) return;

    var nativeFullscreen = typeof section.requestFullscreen === 'function' &&
      typeof document.exitFullscreen === 'function';

    function syncLabels() {
      var active = sceneFullscreenState.active;
      button.textContent = t(active ? 'scene.exitFullscreen' : 'scene.fullscreen');
      button.setAttribute('aria-label', t(active ? 'scene.exitFullscreenAria' : 'scene.fullscreenAria'));
      button.setAttribute('aria-pressed', String(active));
    }
    sceneFullscreenState.syncLabels = syncLabels;

    function setActive(active) {
      var next = Boolean(active);
      if (sceneFullscreenState.active === next && section.classList.contains('is-scene-fullscreen') === next) return;

      sceneFullscreenState.active = next;
      section.classList.toggle('is-scene-fullscreen', next);
      section.setAttribute('data-fullscreen-view', next ? 'true' : 'false');
      document.body.classList.toggle('scene-fullscreen-active', next);
      // Fullscreen means "show the whole scene": lift any collapsed clamp.
      if (next && TP.collapse) TP.collapse.expand(section);
      syncLabels();

      if (!next && document.fullscreenElement === section && typeof document.exitFullscreen === 'function') {
        var exit = document.exitFullscreen();
        if (exit && typeof exit.catch === 'function') exit.catch(function () {});
      }
    }

    button.addEventListener('click', function () {
      if (sceneFullscreenState.active) {
        setActive(false);
        return;
      }
      setActive(true);
      if (nativeFullscreen) {
        var request = section.requestFullscreen();
        if (request && typeof request.catch === 'function') request.catch(function () {});
      }
    });

    document.addEventListener('fullscreenchange', function () {
      setActive(document.fullscreenElement === section);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && sceneFullscreenState.active) setActive(false);
    });

    window.addEventListener('pagehide', function () { setActive(false); });
    syncLabels();
  }

  /* Compact-by-default presentation sections. Collapsing only clamps the body
     height (CSS) and marks its children inert: no engine instance is created,
     destroyed or remeasured, so the 3D scene keeps its public contract. */
  var collapseSections = [];

  function collapseLabel(button, collapsed) {
    button.textContent = t(collapsed ? 'common.expand' : 'common.collapse');
    button.setAttribute('aria-expanded', String(!collapsed));
  }

  function setSectionCollapsed(section, collapsed) {
    if (!section) return;
    var toggle = section.querySelector('[data-collapse-toggle]');
    var bodyId = toggle && toggle.getAttribute('aria-controls');
    var body = bodyId ? document.getElementById(bodyId) : null;
    var next = Boolean(collapsed);

    section.setAttribute('data-collapsed', next ? 'true' : 'false');
    if (body) {
      body.inert = next;
      body.classList.toggle('is-clamped', next);
    }
    if (toggle) collapseLabel(toggle, next);
  }

  function initCollapsibles() {
    collapseSections = Array.prototype.slice.call(document.querySelectorAll('[data-collapsible]'));
    collapseSections.forEach(function (section) {
      var toggle = section.querySelector('[data-collapse-toggle]');
      if (!toggle || toggle.dataset.bound === 'true') return;
      toggle.dataset.bound = 'true';
      toggle.addEventListener('click', function () {
        setSectionCollapsed(section, section.getAttribute('data-collapsed') !== 'true');
      });
      setSectionCollapsed(section, section.getAttribute('data-collapsed') === 'true');
    });

    window.addEventListener('tp:languagechange', function () {
      collapseSections.forEach(function (section) {
        var toggle = section.querySelector('[data-collapse-toggle]');
        if (toggle) collapseLabel(toggle, section.getAttribute('data-collapsed') === 'true');
      });
    });
  }

  TP.collapse = {
    init: initCollapsibles,
    set: setSectionCollapsed,
    expand: function (section) { setSectionCollapsed(section, false); },
    sections: function () { return collapseSections.slice(); }
  };

  function applyDynamicLabels() {
    var toggle = document.getElementById('scene-toggle');
    var audio = document.getElementById('audio-toggle');
    var status = document.getElementById('connection-status');
    if (toggle && toggle.textContent.indexOf('resume') >= 0) toggle.textContent = t('scene.resume');
    if (audio && audio.getAttribute('aria-pressed') === 'true') audio.textContent = t('console.audioOn');
    if (status && status.textContent === t('console.statusSim')) status.textContent = t('console.statusSim');
    if (sceneFullscreenState.syncLabels) sceneFullscreenState.syncLabels();
  }

  function init() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    initCollapsibles();
    TP.pipeline.init();
    TP.console.init();
    if (TP.neofetch) TP.neofetch.init();
    initBrightness();
    initContactButton();
    initSensitiveInputs();
    initTypewriter();
    initTabs();
    initScene();
    initSceneFullscreen();
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
      var action = target.closest(
        '#transparencia-button, #projudi-consulta-button, #projudi-detalhe-button, ' +
        '#bcb-indicadores-button, #bcb-instituicoes-button, #siscomex-ncm-button, ' +
        '#projudi-resumo-button, #extract-button, #invoice-button, #workflow-run, #workflow-status'
      );
      if (action && !started) {
        event.preventDefault();
        event.stopPropagation();
        queuedClicks.push(action.id);
        start();
        return;
      }
      if (target.closest('#gateway') && !started) {
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
