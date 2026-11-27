'use strict';

const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const pt = JSON.parse(readFileSync(path.join(root, 'assets/i18n/pt-br.json'), 'utf8'));
const en = JSON.parse(readFileSync(path.join(root, 'assets/i18n/en.json'), 'utf8'));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const i18n = readFileSync(path.join(root, 'assets/js/i18n.js'), 'utf8');
const client = readFileSync(path.join(root, 'assets/js/api-client.js'), 'utf8');
const main = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const consoleSrc = readFileSync(path.join(root, 'assets/js/console.js'), 'utf8');

test('pt-br is the primary language and dictionaries have identical keys', () => {
  assert.deepEqual(Object.keys(pt).sort(), Object.keys(en).sort());
  assert.ok(Object.keys(pt).length > 60);
  assert.match(i18n, /normalize\(stored \|\| 'pt-br'\)/);
});

test('embedded dictionaries match the standalone translation files', () => {
  const match = i18n.match(/var BUNDLED = (\{[\s\S]*?\n\});/);
  assert.ok(match, 'embedded BUNDLED object is present');
  const bundled = JSON.parse(match[1]);
  assert.deepEqual(Object.keys(bundled['pt-br']).sort(), Object.keys(pt).sort());
  assert.deepEqual(Object.keys(bundled.en).sort(), Object.keys(en).sort());
});

test('action labels use the [ term ] pattern and match the active language', () => {
  const keys = ['actions.cvPt', 'actions.cvEn', 'actions.github', 'actions.linkedin', 'actions.contact'];
  for (const key of keys) {
    for (const [lang, dictionary] of [['pt-br', pt], ['en', en]]) {
      assert.match(dictionary[key], /^\[ [^\]]+ \]$/, `${lang}.${key} must be bracketed with inner spaces`);
    }
  }
  assert.deepEqual(keys.map((key) => pt[key]), [
    '[ curriculo-pt-br ]',
    '[ curriculo-en ]',
    '[ github ]',
    '[ linkedin ]',
    '[ contato ]'
  ]);
  assert.deepEqual(keys.map((key) => en[key]), [
    '[ resume-pt-br ]',
    '[ resume-en ]',
    '[ github ]',
    '[ linkedin ]',
    '[ contact ]'
  ]);
  assert.doesNotMatch(JSON.stringify({ pt, en }), /\[--|\[github\]|\[ --/);
});

test('HTML carries data-i18n hooks for labels and attributes', () => {
  assert.match(html, /id="lang-toggle"/);
  assert.match(html, /data-i18n-attr="data-text:hero.role"/);
  assert.match(html, /data-i18n="actions.cvPt"/);
  assert.match(html, /data-i18n="actions.cvEn"/);
  assert.match(html, /data-i18n-attr="alt:hero.portraitAlt"/);
  assert.match(html, /id="workflow-token"/);
});

test('api-client performs real /api/v1 requests only', () => {
  assert.match(client, /var BASE = 'api\/v1'/);
  assert.match(client, /fetch\(BASE \+ path, init\)/);
  assert.match(client, /gateway\/invoices\/submit/);
  assert.match(client, /workflows\/runs/);
  assert.doesNotMatch(client, /simulated|fallback\(\)|local-simulation/);
});

test('no phone numbers or invented GitHub URL in i18n strings', () => {
  const joined = JSON.stringify({ pt, en });
  assert.doesNotMatch(joined, /\+\d{2}\s?\(?\d{2}/);
  // The only GitHub URL allowed in copy is the canonical Actions/repository path.
  const githubUrls = joined.match(/https:\/\/github\.com\/[^"]+/gi) || [];
  githubUrls.forEach((url) => {
    assert.match(url, /^https:\/\/github\.com\/yamamotin\/AncientStudio\//, `invented GitHub URL: ${url}`);
  });
});

test('language toggle is bound at init, never intercepted, and re-applies every label', () => {
  // The toggle must not sit behind the lazy gateway loader: no capture handler may
  // swallow its click, and i18n is wired during init.
  assert.doesNotMatch(main, /closest\('#lang-toggle'\)/, 'no click interception on #lang-toggle');
  assert.doesNotMatch(main, /pendingLang/, 'no hard-coded language override');
  assert.match(main, /function initI18n\(\)/);
  assert.match(main, /TP\.i18n\.bindToggle\(\)/);
  assert.match(main, /TP\.i18n\.init\(\)/);
  assert.match(main, /initI18n\(\);\n\s+initCollapsibles\(\);/, 'i18n is initialised during init()');

  // Dynamic labels follow state (attributes), not prose comparisons.
  includesAll(main, [
    "addEventListener('tp:languagechange'",
    'applyDynamicLabels',
    "getAttribute('data-mode')",
    "getAttribute('aria-pressed')",
    'dataset.state'
  ]);
  assert.doesNotMatch(main, /textContent\.indexOf\('resume'\)/);

  // The toggle exposes a translated accessible name.
  assert.match(html, /id="lang-toggle"[^>]*data-i18n-attr="aria-label:lang\.label"/);
  assert.ok(pt['lang.label'] && en['lang.label']);
});

test('clicking #lang-toggle switches pt-br <-> en and repaints the interface', async () => {
  const makeNode = (key, text) => ({
    textContent: text,
    attrs: { 'data-i18n': key },
    getAttribute(name) { return this.attrs[name] === undefined ? null : this.attrs[name]; },
    setAttribute(name, value) { this.attrs[name] = value; }
  });

  // Nodes start with the pt-br strings shipped in the HTML (no repaint on load).
  const titleNode = makeNode('gateway.title', pt['gateway.title']);
  const sceneNode = makeNode('scene.title', pt['scene.title']);
  const collapseNode = makeNode('common.expand', pt['common.expand']);
  const toggle = {
    textContent: pt['lang.switchToEn'],
    dataset: {},
    attrs: { 'data-i18n': 'lang.switchToEn' },
    handlers: [],
    getAttribute(name) { return this.attrs[name] === undefined ? null : this.attrs[name]; },
    setAttribute(name, value) { this.attrs[name] = value; },
    addEventListener(type, handler) { if (type === 'click') this.handlers.push(handler); },
    click() { this.handlers.forEach((handler) => handler({ type: 'click' })); }
  };
  const events = [];
  const stored = new Map();

  const sandbox = {
    console,
    JSON,
    Promise,
    setTimeout: () => 0,
    clearTimeout: () => {},
    AbortController,
    CustomEvent: class CustomEvent {
      constructor(type, init) { this.type = type; this.detail = init && init.detail; }
    },
    document: {
      documentElement: { lang: '' },
      getElementById: (id) => (id === 'lang-toggle' ? toggle : null),
      querySelectorAll: (selector) => {
        if (selector === '[data-i18n]') return [titleNode, sceneNode, collapseNode, toggle];
        return [];
      },
      addEventListener(type, handler) { if (type === 'DOMContentLoaded') sandbox.__domReady = handler; }
    },
    localStorage: {
      getItem: (key) => (stored.has(key) ? stored.get(key) : null),
      setItem: (key, value) => stored.set(key, value)
    },
    fetch: () => Promise.reject(new Error('network disabled in tests'))
  };
  sandbox.window = sandbox;
  sandbox.window.TP = {};
  sandbox.TP = sandbox.window.TP;
  sandbox.window.dispatchEvent = (event) => { events.push(event); return true; };
  sandbox.window.addEventListener = (type, handler) => {
    if (type === 'DOMContentLoaded') sandbox.__domReady = handler;
  };
  sandbox.location = { protocol: 'https:' };
  sandbox.window.location = sandbox.location;

  vm.createContext(sandbox);
  vm.runInContext(i18n, sandbox);
  vm.runInContext(consoleSrc.replace(/utils\.line/g, 'void 0'), sandbox);

  await sandbox.TP.i18n.init();
  sandbox.__domReady();
  assert.equal(sandbox.TP.i18n.getLanguage(), 'pt-br');
  assert.equal(titleNode.textContent, pt['gateway.title'], 'static pt-br text is untouched on first load');
  assert.equal(toggle.textContent, pt['lang.switchToEn']);

  // First click: pt-br -> en, everything translated, html lang + storage updated.
  toggle.click();
  assert.equal(sandbox.TP.i18n.getLanguage(), 'en');
  assert.equal(titleNode.textContent, en['gateway.title']);
  assert.equal(sceneNode.textContent, en['scene.title']);
  assert.equal(collapseNode.textContent, en['common.expand'], 'collapsible controls follow the language');
  assert.equal(toggle.textContent, en['lang.switchToPt']);
  assert.equal(sandbox.document.documentElement.lang, 'en');
  assert.equal(stored.get('ancientstudio.lang'), 'en');
  const lastEvent = events[events.length - 1];
  assert.equal(lastEvent.type, 'tp:languagechange');
  assert.equal(lastEvent.detail.language, 'en');

  // Second click: back to pt-br — the toggle is not one-way.
  toggle.click();
  assert.equal(sandbox.TP.i18n.getLanguage(), 'pt-br');
  assert.equal(titleNode.textContent, pt['gateway.title']);
  assert.equal(toggle.textContent, pt['lang.switchToEn']);
  assert.equal(sandbox.document.documentElement.lang, 'pt-BR');
  assert.equal(stored.get('ancientstudio.lang'), 'pt-br');
});

test('[ github ] is a real link to the profile, not a TODO button', () => {
  const anchor = html.match(/<a\b[^>]*id="github-button"[^>]*>/);
  assert.ok(anchor, '#github-button is an anchor');
  const tag = anchor[0];
  assert.match(tag, /href="https:\/\/github\.com\/yamamotin"/);
  assert.match(tag, /target="_blank"/);
  assert.match(tag, /rel="noopener noreferrer"/);
  assert.match(tag, /data-i18n="actions\.github"/);
  assert.match(tag, /data-i18n-attr="aria-label:actions\.githubAria"/);
  assert.doesNotMatch(html, /<button[^>]*id="github-button"/);

  // No pending TODO about the GitHub profile anywhere in the browser-facing code.
  const copy = JSON.stringify({ pt, en });
  assert.doesNotMatch(copy, /githubTodo|githubDetail|username não informado|username not provided/i);
  assert.doesNotMatch(main, /githubTodo|githubDetail/);
  assert.doesNotMatch(html, /TODO/i);
  includesAll(consoleSrc, ['https://github.com/yamamotin', 'https://www.linkedin.com/in/eron-yamamoto/']);
});

test('i18n state variables stay declared (no implicit global behind the toggle)', () => {
  // `current` and STORAGE_KEY are module-scope state; a missing declaration turns
  // every setLanguage() call into a strict-mode ReferenceError.
  assert.match(i18n, /var STORAGE_KEY = 'ancientstudio\.lang';\n\s+var current = 'pt-br';\n\s+var dictionary = /);
  assert.match(i18n, /^\s*'use strict';$/m);
});

test('static pt-br text equals the dictionary: the first paint is already translated', () => {
  const unescape = (value) => value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const pattern = /<([a-z]+)\b[^>]*?data-i18n="([^"]+)"[^>]*>([^<]*)<\/\1>/gs;
  const drifts = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const [, , key, body] = match;
    if (!(key in pt)) {
      drifts.push(`${key}: missing from pt-br.json`);
      continue;
    }
    if (unescape(body).trim() !== unescape(pt[key]).trim()) {
      drifts.push(`${key}: "${unescape(body).trim().slice(0, 48)}" != "${pt[key].slice(0, 48)}"`);
    }
  }
  assert.deepEqual(drifts, [], 'no static text drifts from the pt-br dictionary');

  // Dynamic controls keep a pt-br first paint too (JS rewrites them on interaction).
  assert.match(html, /id="scene-toggle"[^>]*>\[ pausar \]</);
});
