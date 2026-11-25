'use strict';

const { readFileSync } = require('node:fs');
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

test('penguin copy no longer advertises drag interaction', () => {
  assert.doesNotMatch(html, /Arraste com o mouse|mouse ou toque para girar|Drag with mouse/i);
  assert.match(pt['stack.penguinAria'], /automaticamente/);
  assert.match(en['stack.penguinAria'], /automatically/);
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
  const badge = { textContent: '' };
  const sandbox = {
    console,
    Math,
    JSON,
    performance: { now: () => 0 },
    document: {
      getElementById(id) {
        if (id === 'penguin-stage') return frame;
        if (id === 'neofetch-penguin-telemetry') return badge;
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
  assert.match(badge.textContent, /^yaw [+-]\d+° · pitch/);
});

test('engine mascot rotation is pointer-free and single-instance', () => {
  includesAll(adapter, [
    "getObjectByName('TuxMascotRoot')",
    "group.name = 'TuxAutoSpin'",
    'stopImmediatePropagation',
    'capture: true',
    'passive: true'
  ]);
  assert.doesNotMatch(adapter, /fromPointer|targetYaw|targetPitch/);
});
