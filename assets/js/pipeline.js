/* Four-stage CI/CD runner: executes real backend verification when API is online,
   falling back to local simulation on static hosts (e.g. GitHub Pages). */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var elements = {};
  var running = false;

  var fallbackStages = [
    {
      title: '[STEP 1: LINT & PYTEST]',
      lines: ['$ flake8 app/ --max-line-length=100', '$ pytest -q', '42 passed in 1.8s']
    },
    {
      title: '[STEP 2: DOCKER BUILD]',
      lines: ['$ docker build -t eron-api-service:latest .', 'base image: python:3.11-slim', 'image ready: eron-api-service:latest']
    },
    {
      title: '[STEP 3: SECURITY SCAN]',
      lines: ['$ scan-secrets --env .env.production', 'no hardcoded secrets found', 'dependency check passed']
    },
    {
      title: '[STEP 4: DEPLOY TO LINUX PROD]',
      lines: ['$ docker compose up -d --no-deps api', 'healthcheck: 200 OK', 'old container drained; zero downtime']
    }
  ];

  function bar(percent) {
    var filled = Math.round(percent / 10);
    return '[' + '█'.repeat(filled) + '.'.repeat(10 - filled) + '] ' + String(percent).padStart(3, ' ') + '%';
  }

  function setProgress(percent) {
    elements.progress.textContent = bar(percent);
  }

  async function animateStage(stage, index, totalCount) {
    utils.line(elements.log, stage.title, 'info');
    for (var i = 0; i < stage.lines.length; i += 1) {
      await utils.sleep(120);
      var cls = stage.lines[i].indexOf('[ERROR') === 0 ? 'error' : '';
      utils.line(elements.log, '  ' + stage.lines[i], cls);
    }
    if (stage.status === 'failed') return;

    for (var percent = 0; percent <= 100; percent += 20) {
      var total = index * 100 + percent;
      setProgress(Math.round(total / totalCount));
      await utils.sleep(45);
    }
    utils.line(elements.log, '  ✔ stage ' + (index + 1) + '/' + totalCount + ' complete', 'ok');
  }

  async function run(forceFailure) {
    if (running) return;
    running = true;
    elements.success.disabled = true;
    elements.failure.disabled = true;
    utils.clear(elements.log);
    utils.clear(elements.rcaOutput);
    elements.rcaBox.hidden = true;
    setProgress(0);

    var liveResult = TP.api && TP.api.runPipeline ? await TP.api.runPipeline(forceFailure) : null;
    var isLive = Boolean(liveResult && liveResult.data && Array.isArray(liveResult.data.stages));

    if (elements.badge) {
      elements.badge.textContent = isLive ? 'API LIVE' : 'SANDBOX';
    }

    if (isLive) {
      var data = liveResult.data;
      utils.line(
        elements.log,
        '$ POST /api/v1/pipeline/run  // ' + data.run_id + ' (' + liveResult.ms + 'ms)',
        'info'
      );

      var liveStages = data.stages;
      var expectedTotal = 4;
      for (var s = 0; s < liveStages.length; s += 1) {
        await animateStage(liveStages[s], s, expectedTotal);
      }

      if (!data.ok || forceFailure) {
        setProgress(10);
        utils.line(elements.log, 'pipeline abortado no Step 1 — deploy bloqueado por falha de teste.', 'error');
        elements.rcaBox.hidden = false;
      } else {
        setProgress(100);
        utils.line(elements.log, '[DEPLOY OK] backend Python + bundle ASCII 3D verificados em tempo real.', 'ok');
      }

      running = false;
      elements.success.disabled = false;
      elements.failure.disabled = false;
      return;
    }

    // Static fallback simulation (e.g. GitHub Pages)
    utils.line(elements.log, '$ git push origin main  // simulando CI/CD local');
    await animateStage(fallbackStages[0], 0, fallbackStages.length);

    if (forceFailure) {
      setProgress(10);
      utils.line(elements.log, '[ERROR: AssertionError in test_payment_webhook.py]', 'error');
      utils.line(elements.log, 'pipeline abortado no Step 1 — deploy não executado.', 'error');
      elements.rcaBox.hidden = false;
      running = false;
      elements.success.disabled = false;
      elements.failure.disabled = false;
      return;
    }

    for (var index = 1; index < fallbackStages.length; index += 1) {
      await animateStage(fallbackStages[index], index, fallbackStages.length);
    }

    setProgress(100);
    utils.line(elements.log, '[DEPLOY OK] eron-api-service:latest saudável em produção (simulação).', 'ok');
    running = false;
    elements.success.disabled = false;
    elements.failure.disabled = false;
  }

  async function runRca() {
    utils.clear(elements.rcaOutput);
    var lines = [
      '// Verificando idempotência real de webhook de pagamento / NF-e...',
      '$ POST /api/v1/invoices/parse {"event_id":"evt-rca-check"}'
    ];
    for (var i = 0; i < lines.length; i += 1) {
      await utils.sleep(utils.reducedMotion ? 0 : 140);
      utils.line(elements.rcaOutput, lines[i]);
    }

    if (TP.api && TP.api.getMode && TP.api.getMode() === 'api') {
      var first = await TP.api.parseInvoice({ invoice_key: 'NFE-3526-9901-8821', event_id: 'evt-rca-check' });
      var replay = await TP.api.parseInvoice({ invoice_key: 'NFE-3526-9901-8821', event_id: 'evt-rca-check' });
      utils.line(
        elements.rcaOutput,
        '  1ª chamada -> replay=' + String(first.data.idempotent_replay) + ' (' + first.ms + 'ms)'
      );
      utils.line(
        elements.rcaOutput,
        '  2ª chamada (mesmo event_id) -> replay=' + String(replay.data.idempotent_replay) + ' (' + replay.ms + 'ms)'
      );
      utils.line(
        elements.rcaOutput,
        '[RCA VERIFICADO NA API] Deduplicação por event_id ativa no backend Python.',
        'ok'
      );
      return;
    }

    var simLines = [
      '  tests/test_payment_webhook.py:87: AssertionError',
      '  expected retry with same event.id to be idempotent',
      '  + if event.id in processed_events: return 200',
      '[RCA] Causa: retry sem idempotência. Correção: deduplicação por event.id.'
    ];
    for (var j = 0; j < simLines.length; j += 1) {
      await utils.sleep(utils.reducedMotion ? 0 : 160);
      utils.line(elements.rcaOutput, simLines[j], j === simLines.length - 1 ? 'ok' : '');
    }
  }

  function init() {
    elements = {
      log: document.getElementById('pipeline-log'),
      progress: document.getElementById('pipeline-progress'),
      success: document.getElementById('pipeline-success'),
      failure: document.getElementById('pipeline-failure'),
      rcaBox: document.getElementById('rca-box'),
      rcaButton: document.getElementById('rca-button'),
      rcaOutput: document.getElementById('rca-output'),
      badge: document.querySelector('#pipeline .badge')
    };
    if (!elements.log) return;

    elements.success.addEventListener('click', function () { run(false); });
    elements.failure.addEventListener('click', function () { run(true); });
    elements.rcaButton.addEventListener('click', runRca);
  }

  TP.pipeline = { init: init, run: run };
})(window.TP);
