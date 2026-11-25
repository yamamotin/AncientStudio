'use strict';

const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');

const html = read('index.html');
const main = read('assets/js/main.js');
const adapter = read('assets/js/engine-adapter.js');
const neofetch = read('assets/js/neofetch.js');
const css = read('assets/css/style.css');
const i18n = read('assets/js/i18n.js');
const pt = JSON.parse(read('assets/i18n/pt-br.json'));
const en = JSON.parse(read('assets/i18n/en.json'));
const stackSection = html.slice(
  html.indexOf('<section id="stack"'),
  html.indexOf('<!-- 6. INTERACTIVE CONSOLE -->')
);

test('scene controls include a bilingual fullscreen button', () => {
  includesAll(html, [
    'id="scene-fullscreen"',
    'data-i18n="scene.fullscreen"',
    'data-i18n-attr="aria-label:scene.fullscreenAria"'
  ]);
  for (const key of ['scene.fullscreen', 'scene.exitFullscreen', 'scene.fullscreenAria', 'scene.exitFullscreenAria']) {
    assert.ok(pt[key] && en[key], `missing translation for ${key}`);
    includesAll(i18n, [`"${key}"`]);
  }
});

test('fullscreen uses the native API with a CSS fallback and simple exit', () => {
  const start = main.indexOf('function initSceneFullscreen');
  const end = main.indexOf('function applyDynamicLabels', start);
  const block = main.slice(start, end);

  includesAll(block, [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenchange',
    "event.key === 'Escape'",
    "classList.toggle('is-scene-fullscreen'",
    "setAttribute('data-fullscreen-view'",
    'syncLabels'
  ]);
  assert.doesNotMatch(block, /TP\.scene\.create|TP\.scene\.mount/, 'no duplicate engine instances');

  includesAll(css, ['#scene:fullscreen', '#scene.is-scene-fullscreen', 'body.scene-fullscreen-active']);
});

test('uploaded portrait is a local, responsive asset with bilingual alt text', () => {
  assert.ok(existsSync(path.join(root, 'assets/img/eron-portrait-ascii.png')), 'portrait asset exists');
  includesAll(html, [
    'src="assets/img/eron-portrait-ascii.png"',
    'width="892"',
    'height="1184"',
    'alt="Retrato em arte ASCII de Eron Yamamoto com casaco escuro sobre fundo preto."',
    'data-i18n-attr="alt:hero.portraitAlt"',
    'loading="lazy"'
  ]);
  assert.ok(pt['hero.portraitAlt'] && en['hero.portraitAlt'], 'portrait alt is translated');
  includesAll(css, ['.hero-portrait', 'aspect-ratio: 892 / 1184', 'object-fit: cover', 'float: right']);
});

test('stack section shows only the penguin and the exact requested rows', () => {
  assert.doesNotMatch(stackSection, /neofetch-penguin-telemetry|engine-hint|sr-only|yaw|pitch/i);
  assert.equal((stackSection.match(/<dt/g) || []).length, 7);
  assert.equal((stackSection.match(/<dd/g) || []).length, 7);

  const text = stackSection
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  const rows = [
    'User eron@production',
    'OS Linux Production (Troubleshooting N3 & RCA)',
    'Languages Python, SQL, Bash',
    'DevOps Docker, GitHub Actions (CI/CD), Git',
    'Data & AI ETL Pipelines, Pandas, NumPy, n8n, Web Scraping',
    'Certifications Harvard CS50, Microsoft SC-900, UFPR Machine Learning',
    'Education [B.Sc](http://B.Sc). Electrical Engineering (IFPR) + Erasmus+ International Program'
  ];
  rows.forEach((row) => assert.ok(text.includes(row), `missing exact row: ${row}`));
});

test('fallback penguin yaw advances from elapsed time without pointer events', () => {
  let queuedFrame = null;
  const frame = {
    attrs: {},
    setAttribute(name, value) { this.attrs[name] = value; },
    getAttribute(name) { return this.attrs[name] || null; },
    getBoundingClientRect() { return { width: 420, height: 240, left: 0, top: 0 }; },
    addEventListener() {}
  };
  const logo = { style: {}, textContent: '' };
  const sandbox = {
    console,
    Math,
    JSON,
    performance: { now: () => 0 },
    document: {
      getElementById(id) {
        if (id === 'penguin-stage') return frame;
        return null;
      },
      querySelector(selector) {
        if (selector.includes('penguin-fallback')) return logo;
        return null;
      },
      addEventListener() {}
    }
  };
  sandbox.window = sandbox;
  sandbox.window.innerWidth = 1280;
  sandbox.window.innerHeight = 800;
  sandbox.window.matchMedia = () => ({ matches: false });
  sandbox.window.addEventListener = () => {};
  sandbox.window.requestAnimationFrame = (callback) => { queuedFrame = callback; return 1; };
  sandbox.window.cancelAnimationFrame = () => { queuedFrame = null; };
  sandbox.window.TP = {};
  sandbox.TP = sandbox.window.TP;

  vm.createContext(sandbox);
  vm.runInContext(neofetch, sandbox);
  sandbox.TP.neofetch.init();

  const initialYaw = sandbox.TP.neofetch.getState().yaw;
  for (let index = 1; index <= 6; index += 1) {
    const callback = queuedFrame;
    assert.equal(typeof callback, 'function', 'RAF loop is scheduled');
    queuedFrame = null;
    callback(index * 100);
  }
  const finalYaw = sandbox.TP.neofetch.getState().yaw;

  assert.ok(finalYaw > initialYaw + 0.05, `yaw did not advance: ${initialYaw} -> ${finalYaw}`);
  assert.equal(frame.getAttribute('data-auto-spin'), 'true');
  assert.equal(sandbox.TP.neofetch.getState().pitch, undefined, 'no pitch state remains');
  assert.doesNotMatch(neofetch, /angleBadge|neofetch-penguin-telemetry|state\.pitch/);
});

test('engine mascot rotation is pointer-free and single-instance', () => {
  includesAll(adapter, [
    "getObjectByName('TuxMascotRoot')",
    "group.name = 'TuxAutoSpin'",
    'data-pointer-locked',
    'getScene'
  ]);
  assert.doesNotMatch(adapter, /fromPointer|targetYaw|targetPitch|mascotPointerBlockers|stopImmediatePropagation/);
  assert.match(css, /#penguin-stage[^}]*pointer-events: none/s);
});
