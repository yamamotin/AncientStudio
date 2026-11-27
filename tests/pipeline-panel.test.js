'use strict';

const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');
const exists = (relative) => existsSync(path.join(root, relative));

const html = read('index.html');
const pipeline = read('assets/js/pipeline.js');
const main = read('assets/js/main.js');
const css = read('assets/css/style.css');
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
  assert.equal(api.config.runsUrl, 'https://api.github.com/repos/yamamotin/AncientStudio/actions/runs?per_page=10');
  assert.equal(api.config.workflowsUrl, 'https://api.github.com/repos/yamamotin/AncientStudio/actions/workflows');
  assert.equal(api.config.cacheTtl, 300000);
  assert.equal(api.config.requestTimeout, 8000);
  assert.equal(api.config.refreshCooldown, 4000);
  assert.equal(api.config.maxRuns, 6);

  includesAll(html, [
    'id="pipeline-runs"',
    'id="pipeline-status"',
    'id="pipeline-refresh"',
    'rel="noopener noreferrer"',
    'class="tech-doc"',
    'data-i18n="pipeline.doc.securityTitle"'
  ]);
  assert.doesNotMatch(html, /pipeline-success|pipeline-failure|rca-box|rca-button|SANDBOX|SIMULATOR/);
});

test('monitoring screen: executive summary, filtered noise and collapsible shell', () => {
  const api = loadPipeline();

  // The list of runs is no longer a wall of external links.
  const pipelineSection = html.slice(
    html.indexOf('<section id="pipeline"'),
    html.indexOf('<!-- 3. API GATEWAY')
  );
  assert.doesNotMatch(pipelineSection, /open run|abrir run|open actions|abrir actions/i);
  for (const key of ['pipeline.runLink', 'pipeline.openActions']) {
    assert.ok(!Object.prototype.hasOwnProperty.call(pt, key), `${key} retired from pt-br`);
    assert.ok(!Object.prototype.hasOwnProperty.call(en, key), `${key} retired from en`);
  }
  assert.doesNotMatch(pipeline, /runLink|openActions/);

  // Executive summary cards are always visible, outside the collapsed body.
  includesAll(pipelineSection, [
    'id="pipeline-summary"',
    'id="pipeline-summary-state"',
    'id="pipeline-summary-reliability"',
    'id="pipeline-summary-docker"',
    'id="pipeline-summary-workflows"',
    'id="pipeline-filter-note"',
    'id="pipeline-last-run-link"'
  ]);
  assert.ok(
    pipelineSection.indexOf('id="pipeline-summary"') < pipelineSection.indexOf('id="pipeline-body"'),
    'summary sits outside the collapsible body'
  );

  // Collapsible contract: markup, translated labels and clamping CSS.
  assert.match(pipelineSection, /<section id="pipeline"[^>]*data-collapsible data-collapsed="true"/);
  assert.match(pipelineSection, /data-collapse-toggle aria-controls="pipeline-body"/);
  includesAll(css, ['.collapse-body', '.monitor-summary', '.monitor-card', 'data-collapsed="true"']);
  assert.doesNotMatch(css, /collapse-body[^{]*\{[^}]*display:\s*none/);
  for (const key of ['common.expand', 'common.collapse', 'pipeline.summaryAria',
    'pipeline.summary.stateLabel', 'pipeline.summary.reliabilityLabel',
    'pipeline.summary.dockerLabel', 'pipeline.summary.workflowsLabel',
    'pipeline.summary.stateValue', 'pipeline.summary.reliabilityValue',
    'pipeline.summary.dockerValue', 'pipeline.summary.workflowsValue',
    'pipeline.summary.none', 'pipeline.summary.dockerScheduled', 'pipeline.filtersNote', 'pipeline.doc.lastRun',
    'pipeline.doc.frontFilter']) {
    assert.ok(pt[key], `pt-br has ${key}`);
    assert.ok(en[key], `en has ${key}`);
    assert.ok(i18n.includes(JSON.stringify(pt[key]).slice(1, -1)), `BUNDLED mirrors ${key}`);
    assert.ok(i18n.includes(JSON.stringify(en[key]).slice(1, -1)), `BUNDLED mirrors en ${key}`);
  }
  includesAll(main, ['data-collapsible', 'data-collapse-toggle', 'TP.collapse', 'tp:languagechange']);
  assert.match(main, /body\.inert = next/);

  // Internal noise is filtered instead of rendered.
  const run = (name, conclusion, status = 'completed') => ({
    name, conclusion, status, html_url: 'https://github.com/yamamotin/AncientStudio/actions/runs/1'
  });
  assert.equal(api.isMeaningful(run('Auto-merge verified PRs', 'success')), false);
  assert.equal(api.isMeaningful(run('CI/CD — backend, Docker and deploy', 'skipped')), false);
  assert.equal(api.isMeaningful(run('VCR Image Retention Cleanup', 'cancelled')), false);
  assert.equal(api.isMeaningful(run('CI/CD — backend, Docker and deploy', 'success')), true);
  assert.equal(api.isMeaningful(run('Deploy static site to GitHub Pages', '', 'in_progress')), true);
  assert.equal(api.isMeaningful(null), false);

  // Technical documentation link: rendered HTML, not a raw Markdown asset.
  assert.match(pipelineSection, /id="pipeline-doc-link" href="docs\/ci-cd-pipeline\.html"/);
  assert.ok(exists('docs/ci-cd-pipeline.html'), 'docs/ci-cd-pipeline.html exists');
  assert.ok(exists('docs/ci-cd-pipeline.md'), 'docs/ci-cd-pipeline.md stays the source');
  const docHtml = read('docs/ci-cd-pipeline.html');
  assert.match(docHtml, /<!DOCTYPE html>/);
  assert.doesNotMatch(docHtml, /<script/i);
  includesAll(docHtml, ['[ voltar ao portfólio ]', 'ci-cd-pipeline.md', '<table>']);
});

test('every collapsible section has a toggle wired to an existing body', () => {
  const sections = html.match(/<section[^>]*data-collapsible[^>]*>/g) || [];
  assert.equal(sections.length, 2, 'only pipeline and gateway are collapsible');
  const bodies = new Set();
  const controls = html.match(/aria-controls="([a-z-]+)"/g) || [];
  controls.forEach((attr) => bodies.add(attr.split('"')[1]));
  for (const id of ['pipeline-body', 'gateway-body']) {
    assert.ok(bodies.has(id), `toggle targets ${id}`);
    assert.ok(html.includes(`id="${id}"`), `${id} exists in the document`);
  }
  // Tall sections are compact by default.
  assert.match(html, /<section id="gateway"[^>]*data-collapsed="true"/);
  assert.match(html, /<section id="pipeline"[^>]*data-collapsed="true"/);

  // The penguin/neofetch section is always expanded: no collapsible hooks at all.
  const stack = html.slice(html.indexOf('<section id="stack"'), html.indexOf('<!-- CAPTCHA challenge dialog'));
  assert.match(stack, /<section id="stack" class="section" aria-labelledby="stack-title">/);
  assert.doesNotMatch(stack, /data-collapsible|data-collapsed|collapse-toggle|collapse-body|panel-head-actions/);
  assert.doesNotMatch(stack, /\[\s*(recolher|expandir|collapse|expand)\s*\]/i, 'no collapse label in the stack');
  assert.doesNotMatch(html, /aria-controls="stack-body"/, 'no toggle targets the stack body');
  assert.ok(stack.includes('id="stack-body"'), 'the stack body still exists, just never clamped');

  // The 3D scene stays the other exception: always mounted and expanded, no collapse control.
  const scene = html.slice(html.indexOf('<section id="scene"'), html.indexOf('<!-- 6. NEOFETCH STACK'));
  assert.doesNotMatch(scene, /data-collapsible|data-collapsed|collapse-toggle|aria-controls="scene-body"/);
  assert.doesNotMatch(scene, /class="[^"]*collapse-body/);
  assert.doesNotMatch(html, /id="scene-body"/);
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

  // Dynamic labels must never paint raw i18n keys: i18n is in the deferred chain
  // before the UI modules that render them.
  assert.ok(
    html.indexOf('assets/js/i18n.js') < html.indexOf('assets/js/main.js'),
    'i18n.js loads before main.js'
  );
  assert.match(html, /<script src="assets\/js\/i18n\.js" defer data-i18n-js><\/script>/);
  assert.ok(
    html.indexOf('assets/js/i18n.js') < html.indexOf('assets/js/pipeline.js'),
    'i18n.js loads before pipeline.js'
  );

  // Every fetch in the frontend is time-boxed with AbortController.
  for (const [name, source] of [['api-client.js', apiClient], ['main.js', main], ['i18n.js', i18n], ['api.js', legacyApi]]) {
    includesAll(source, ['AbortController', 'abort()', 'signal'], `${name} request timeout`);
  }

  includesAll(main, ["querySelectorAll('input[data-sensitive]')", "'pagehide'", 'visibilitychange']);

  // CPF typed in the public PROJUDI form: masked when unfocused, never persisted.
  assert.match(html, /id="projudi-cpf"[^>]*data-sensitive="true"/);
  assert.match(html, /id="projudi-cpf"[^>]*aria-describedby="projudi-cpf-note"/);
  assert.match(html, /id="projudi-cpf-note"[^>]*data-i18n="etl.cpfNote"/);
  assert.ok(pt['etl.cpfNote'] && en['etl.cpfNote'], 'CPF hygiene note is translated');
  includesAll(css, ['input[data-sensitive]:not(:focus)', 'text-security: disc']);
  assert.doesNotMatch(main, /localStorage\.setItem\([^)]*cpf/i);
  assert.doesNotMatch(main, /sessionStorage\.setItem\([^)]*cpf/i);
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
  // wasm-unsafe-eval permits Draco WebAssembly, not JavaScript unsafe-eval.
  assert.doesNotMatch(policy, /'unsafe-inline'|'unsafe-eval'|\*/);
  assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin">/);
});
