/* Four-stage CI/CD simulator, including the deliberate failure + RCA path. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var elements = {};
  var running = false;

  var stages = [
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

  async function animateStage(stage, index) {
    utils.line(elements.log, stage.title, 'info');
    for (var i = 0; i < stage.lines.length; i += 1) {
      await utils.sleep(130);
      utils.line(elements.log, '  ' + stage.lines[i]);
    }
    for (var percent = 0; percent <= 100; percent += 10) {
      var total = index * 100 + percent;
      setProgress(Math.round(total / stages.length));
      await utils.sleep(55);
    }
    utils.line(elements.log, '  ✔ stage ' + (index + 1) + '/4 complete', 'ok');
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
    utils.line(elements.log, '$ git push origin main  // simulando CI/CD');

    await animateStage(stages[0], 0);

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

    for (var index = 1; index < stages.length; index += 1) {
      await animateStage(stages[index], index);
    }

    setProgress(100);
    utils.line(elements.log, '[DEPLOY OK] eron-api-service:latest saudável em produção (simulação).', 'ok');
    running = false;
    elements.success.disabled = false;
    elements.failure.disabled = false;
  }

  async function runRca() {
    var lines = [
      '// Simulação didática de troubleshooting N3 — não é um incidente real.',
      '$ grep -n "assert" logs/test_payment_webhook.log',
      '  tests/test_payment_webhook.py:87: AssertionError',
      '$ sed -n "80,92p" tests/test_payment_webhook.py',
      '  expected retry with same event.id to be idempotent',
      '$ git diff -- tests/test_payment_webhook.py',
      '  + if event.id in processed_events: return 200',
      '$ pytest -q tests/test_payment_webhook.py',
      '  1 passed in 0.4s',
      '[RCA] Causa: retry sem idempotência. Correção: deduplicação por event.id.'
    ];
    utils.clear(elements.rcaOutput);
    for (var i = 0; i < lines.length; i += 1) {
      await utils.sleep(utils.reducedMotion ? 0 : 180);
      utils.line(elements.rcaOutput, lines[i], i === lines.length - 1 ? 'ok' : '');
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
      rcaOutput: document.getElementById('rca-output')
    };
    if (!elements.log) return;

    elements.success.addEventListener('click', function () { run(false); });
    elements.failure.addEventListener('click', function () { run(true); });
    elements.rcaButton.addEventListener('click', runRca);
  }

  TP.pipeline = { init: init, run: run };
})(window.TP);
