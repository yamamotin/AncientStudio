'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');

const html = read('index.html');
const pipeline = read('assets/js/pipeline.js');
const main = read('assets/js/main.js');
const apiClient = read('assets/js/api-client.js');
const i18n = read('assets/js/i18n.js');
const legacyApi = read('assets/js/api.js');
const pt = JSON.parse(read('assets/i18n/pt-br.json'));
const en = JSON.parse(read('assets/i18n/en.json'));

function loadPipeline() {
  const sandbox = {
    console,
    Date,
    JSON,
    Math,
    isFinite,
    AbortController,
    setTimeout: () => 0,
    clearTimeout: () => {},
    fetch: () => Promise.reject(new Error('network disabled in tests')),
    document: {
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({ setAttribute() {}, appendChild() {}, attrs: {} }),
      addEventListener() {}
    }
  };
  sandbox.window = sandbox;
  sandbox.window.TP = {};
  sandbox.TP = sandbox.window.TP;
  sandbox.window.addEventListener = () => {};
  vm.createContext(sandbox);
  vm.runInContext(pipeline, sandbox);
  return sandbox.TP.pipeline;
}

test('pipeline panel is fed by the public read-only GitHub Actions API', () => {
  const api = loadPipeline();
  assert.equal(api.config.runsUrl, 'https://api.github.com/repos/yamamotin/AncientStudio/actions/runs?per_page=6');
  assert.equal(api.config.workflowsUrl, 'https://api.github.com/repos/yamamotin/AncientStudio/actions/workflows');
  assert.equal(api.config.actionsPage, 'https://github.com/yamamotin/AncientStudio/actions');
  assert.equal(api.config.cacheTtl, 300000);
  assert.equal(api.config.requestTimeout, 8000);
  assert.equal(api.config.refreshCooldown, 4000);

  includesAll(html, [
    'id="pipeline-runs"',
    'id="pipeline-status"',
    'id="pipeline-refresh"',
    'href="https://github.com/yamamotin/AncientStudio/actions"',
    'rel="noopener noreferrer"',
    'class="tech-doc"',
    'data-i18n="pipeline.doc.securityTitle"'
  ]);
  assert.doesNotMatch(html, /pipeline-success|pipeline-failure|rca-box|rca-button|SANDBOX|SIMULATOR/);
});

const pipelineCode = pipeline
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

test('client hardening: no credentials, abortable requests and DOM-safe rendering', () => {
  // No credential is ever attached to the request (the word may appear in comments).
  assert.doesNotMatch(pipelineCode, /["']Authorization["']\s*:/);
  assert.doesNotMatch(pipelineCode, /GITHUB_TOKEN|VERCEL_TOKEN|api[_-]?key\s*[:=]/i);
  includesAll(pipelineCode, [
    "credentials: 'omit'",
    'AbortController',
    'controller.abort()',
    'referrerPolicy: \'no-referrer\'',
    "cache: 'no-store'",
    'textContent',
    'createElement',
    'noopener noreferrer'
  ]);
  // External data never reaches innerHTML / insertAdjacentHTML / outerHTML.
  assert.doesNotMatch(pipelineCode, /innerHTML|outerHTML|insertAdjacentHTML|document\.write/);
  // Manual refresh cannot flood the public API.
  includesAll(pipelineCode, ['REFRESH_COOLDOWN', 'state.loading', "setAttribute('aria-busy'", 'removeAttribute']);

  // Every fetch in the frontend is time-boxed with AbortController.
  for (const [name, source] of [['api-client.js', apiClient], ['main.js', main], ['i18n.js', i18n], ['api.js', legacyApi]]) {
    includesAll(source, ['AbortController', 'abort()', 'signal'], `${name} request timeout`);
  }

  includesAll(main, ["querySelectorAll('input[data-sensitive]')", "'pagehide'", 'visibilitychange']);
  assert.doesNotMatch(main, /localStorage\.setItem\([^)]*token/i);
  includesAll(html, ['data-sensitive="true"', 'type="password"']);
});

test('run URLs and payload fields are validated before entering the DOM', () => {
  const api = loadPipeline();

  assert.equal(
    api.safeRunUrl('https://github.com/yamamotin/AncientStudio/actions/runs/45924347350'),
    'https://github.com/yamamotin/AncientStudio/actions/runs/45924347350'
  );
  for (const hostile of [
    'javascript:alert(1)',
    'https://github.com/attacker/AncientStudio/actions/runs/1',
    'https://github.com/yamamotin/AncientStudio/actions/runs/1/../../evil',
    'https://api.github.com/repos/yamamotin/AncientStudio/actions/runs/1',
    'https://github.com/yamamotin/AncientStudio/actions/runs/abc',
    ''
  ]) {
    assert.equal(api.safeRunUrl(hostile), '', `must reject ${hostile}`);
  }

  const sanitized = api.sanitizeRun({
    id: 45924347350,
    run_number: 812,
    name: 'CI — Backend\u0000 <img src=x onerror=alert(1)>',
    head_branch: 'main',
    head_sha: 'c1716ab0d6c1d3a2f4bb7a4e2b1f0e9d8c7b6a5f',
    status: 'completed',
    conclusion: 'success',
    run_started_at: '2026-11-27T01:45:05Z',
    updated_at: '2026-11-27T01:45:27Z',
    html_url: 'https://github.com/yamamotin/AncientStudio/actions/runs/45924347350'
  });

  assert.equal(sanitized.branch, 'main');
  assert.equal(sanitized.status, 'completed');
  assert.equal(sanitized.conclusion, 'success');
  assert.equal(sanitized.sha.slice(0, 7), 'c1716ab');
  assert.ok(!sanitized.name.includes('\u0000'), 'control characters are stripped');
  assert.ok(sanitized.name.length <= 73, 'names are length capped');
  assert.equal(sanitized.url, 'https://github.com/yamamotin/AncientStudio/actions/runs/45924347350');

  const blocked = api.sanitizeRun({
    name: 'evil',
    status: '<script>',
    conclusion: 'success',
    html_url: 'https://evil.example/actions/runs/1',
    head_sha: 'not-a-sha'
  });
  assert.equal(blocked.url, '', 'bad URL never survives sanitization');
  assert.equal(blocked.status, 'unknown');
  assert.equal(blocked.sha, '');

  assert.equal(api.sanitizeRun(null), null);
  assert.equal(api.sanitizeRun('nope'), null);
});

test('durations and timestamps are computed from validated ISO fields', () => {
  const api = loadPipeline();
  assert.equal(api.formatDuration('2026-11-27T01:45:05Z', '2026-11-27T01:45:27Z'), '22s');
  assert.equal(api.formatDuration('2026-11-27T01:45:05Z', '2026-11-27T01:47:09Z'), '2m 4s');
  assert.equal(api.formatDuration('2026-11-27T01:45:05Z', '2026-11-27T01:45:05Z'), '0s');
  assert.equal(api.formatDuration('', ''), '—');
  assert.equal(api.formatDuration('2026-11-27T01:45:05Z', '2026-11-27T01:00:00Z'), '—');
});

test('section titles are professional and localized, with no simulator wording', () => {
  assert.equal(pt['pipeline.title'], '[ LIVE CI/CD & DOCKER PIPELINE ]');
  assert.equal(en['pipeline.title'], '[ LIVE CI/CD & DOCKER PIPELINE ]');
  assert.equal(pt['gateway.title'], '[ API GATEWAY // INTEGRAÇÕES ]');
  assert.equal(en['gateway.title'], '[ API GATEWAY // INTEGRATIONS ]');
  assert.equal(pt['scene.title'], '[ CENA 3D INTERATIVA ]');
  assert.equal(en['scene.title'], '[ INTERACTIVE SCENE 3D ]');

  const copy = JSON.stringify({ pt, en });
  assert.doesNotMatch(copy, /playground|simulator|simulador|sandbox/i);
  assert.doesNotMatch(copy, /ASCII REALMS/);
  for (const key of Object.keys(pt)) {
    assert.ok(Object.prototype.hasOwnProperty.call(en, key), `missing en translation for ${key}`);
  }
});

test('CSP and referrer policy restrict origins to self and the GitHub public API', () => {
  const match = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
  assert.ok(match, 'CSP meta tag is present');
  const policy = match[1];
  includesAll(policy, [
    "default-src 'self'",
    "object-src 'none'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://api.github.com",
    "form-action 'self'"
  ]);
  assert.doesNotMatch(policy, /unsafe-inline|unsafe-eval|\*/);
  assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin">/);
});
