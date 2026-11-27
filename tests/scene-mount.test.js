'use strict';

/* Scene mount / wheel-zoom contract.
 *
 * The interactive 3D section used to fail silently: when the strict WebGL2 probe refused
 * the context (common on blocklisted or remote-session drivers) or when the lazily injected
 * engine bundle never arrived, the stage stayed on the static skeleton with no explanation
 * and no retry. These tests pin the fix: a second, flag-free WebGL2 probe, bounded retries,
 * a `tp:scene-status` verdict the UI can render, and the wheel/zoom wiring. */

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const adapterSrc = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');
const mainSrc = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const css = readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const pt = JSON.parse(readFileSync(path.join(root, 'assets/i18n/pt-br.json'), 'utf8'));
const en = JSON.parse(readFileSync(path.join(root, 'assets/i18n/en.json'), 'utf8'));

class SandboxEvent {
  constructor(type, init) {
    this.type = type;
    this.detail = (init && init.detail) || null;
    this.bubbles = Boolean(init && init.bubbles);
  }
}

/* Minimal but honest DOM: a container that records dispatched events, a window with a
   handler registry and a controllable WebGL2 `getContext`. */
function createAdapterSandbox(options = {}) {
  const windowHandlers = new Map();
  const timers = [];
  const created = [];
  const contextCalls = [];

  function glStub(renderer) {
    return {
      getExtension: (name) => (name === 'WEBGL_debug_renderer_info' ? { name } : null),
      getParameter: () => renderer
    };
  }

  const document = {
    readyState: 'complete',
    hidden: false,
    createElement(tag) {
      if (tag === 'canvas') {
        return {
          getContext(type, attrs) {
            contextCalls.push({ type, attrs: attrs || {} });
            return (options.getContext || (() => glStub('ANGLE (NVIDIA GeForce RTX 3060)')))(type, attrs || {});
          }
        };
      }
      const script = {
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        addEventListener(type, handler) { this[`on${type}`] = handler; }
      };
      created.push(script);
      return script;
    },
    querySelector: () => null,
    getElementById: () => null,
    head: { appendChild() {} },
    addEventListener() {},
    removeEventListener() {}
  };

  const window = {
    TP: {},
    document,
    devicePixelRatio: 1,
    addEventListener(type, handler) {
      if (!windowHandlers.has(type)) windowHandlers.set(type, []);
      windowHandlers.get(type).push(handler);
    },
    removeEventListener() {},
    dispatchEvent(event) {
      (windowHandlers.get(event.type) || []).forEach((handler) => handler(event));
      return true;
    },
    setTimeout(fn, delay) {
      timers.push({ fn, delay });
      return timers.length;
    },
    clearTimeout() {},
    requestAnimationFrame(fn) {
      if (typeof fn === 'function') fn(0);
      return 1;
    },
    cancelAnimationFrame() {},
    matchMedia: () => ({ matches: false, addEventListener() {} })
  };

  if (options.ASCIIRealms !== null) window.ASCIIRealms = options.ASCIIRealms;

  const sandbox = { window, document, console, Event: SandboxEvent, CustomEvent: SandboxEvent, Math, Date, Number, String, Object, Array, Boolean, JSON, Promise };
  sandbox.TP = window.TP;
  vm.createContext(sandbox);
  vm.runInContext(adapterSrc, sandbox);

  const events = [];
  const container = {
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute(name) { return this.attributes[name]; },
    removeAttribute(name) { delete this.attributes[name]; },
    dispatchEvent(event) {
      events.push(event);
      return true;
    },
    addEventListener() {},
    removeEventListener() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1200, height: 675 })
  };

  return { window, sandbox, container, events, timers, contextCalls, created, windowHandlers };
}

function fakeEngine(state) {
  return {
    AsciiSceneEngine: function (element, config) {
      state.mounts += 1;
      this.config = { ...config };
      this.mount = () => { if (state.throwOnMount) throw new Error('webgl init failed'); };
      this.getState = () => 'running';
      this.getConfig = () => ({ ...this.config });
      this.getStats = () => ({ activeCellSize: 6.5, fps: 60 });
      this.getScene = () => ({ isScene: true });
      this.updateConfig = () => {};
      this.pause = () => {};
      this.resume = () => {};
      this.destroy = () => {};
    }
  };
}

function statusEvents(events) {
  return events.filter((event) => event.type === 'tp:scene-status').map((event) => event.detail);
}

test('a real GPU driver that only trips failIfMajorPerformanceCaveat still mounts the scene', async () => {
  const state = { mounts: 0, throwOnMount: false };
  // Driver behaviour: the strict request is refused, the plain one returns a real GPU.
  const box = createAdapterSandbox({
    ASCIIRealms: fakeEngine(state),
    getContext: (type, attrs) => (attrs.failIfMajorPerformanceCaveat
      ? null
      : {
          getExtension: (name) => (name === 'WEBGL_debug_renderer_info' ? { name } : null),
          getParameter: () => 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0)'
        })
  });

  const controller = box.sandbox.TP.scene.create(box.container, { preset: 'night' });
  const mounted = await controller.mount();

  assert.equal(mounted, true, 'the second probe must rescue the stage');
  assert.equal(controller.getMode(), 'engine');
  assert.equal(box.container.getAttribute('data-mode'), 'engine');
  assert.equal(box.contextCalls.length, 2, 'strict probe first, then the flag-free retry');
  assert.equal(box.contextCalls[0].attrs.failIfMajorPerformanceCaveat, true);
  assert.equal(box.contextCalls[1].attrs.failIfMajorPerformanceCaveat, undefined);
  assert.deepEqual({ ...controller.getStatus() }, {
    mode: 'engine', reason: null, mounted: true, attempts: 1, cellSize: 6.5
  });
  assert.equal(box.timers.length, 0, 'a mounted scene never schedules retries');
});

test('a software rasterizer keeps the static fallback and says why', async () => {
  const state = { mounts: 0, throwOnMount: false };
  const box = createAdapterSandbox({
    ASCIIRealms: fakeEngine(state),
    getContext: () => ({
      getExtension: (name) => (name === 'WEBGL_debug_renderer_info' ? { name } : null),
      getParameter: () => 'Google SwiftShader'
    })
  });

  const controller = box.sandbox.TP.scene.create(box.container, { preset: 'night' });
  assert.equal(await controller.mount(), false);
  assert.equal(state.mounts, 0, 'SwiftShader/llvmpipe never gets the heavy GLB pipeline');
  assert.equal(controller.getStatus().reason, 'webgl-software');
  assert.equal(box.container.getAttribute('data-mode'), 'fallback');
  assert.equal(box.timers.length, 0, 'no retry storm on a permanently unsupported device');
  assert.deepEqual({ ...statusEvents(box.events).pop() }, {
    mode: 'fallback', reason: 'webgl-software', mounted: false, attempts: 1, cellSize: 8
  });
});

test('no WebGL2 at all is reported instead of leaving a bare skeleton', async () => {
  const box = createAdapterSandbox({ ASCIIRealms: fakeEngine({ mounts: 0 }), getContext: () => null });
  const controller = box.sandbox.TP.scene.create(box.container, { preset: 'night' });
  assert.equal(await controller.mount(), false);
  assert.equal(controller.getStatus().reason, 'webgl-unavailable');
  assert.equal(box.contextCalls.length, 2, 'both probes are attempted before giving up');
  assert.equal(box.timers.length, 0);
});

test('a missing engine bundle schedules a bounded retry and recovers on ascii-realms:ready', async () => {
  const state = { mounts: 0, throwOnMount: false };
  const box = createAdapterSandbox({ ASCIIRealms: null });

  const controller = box.sandbox.TP.scene.create(box.container, { preset: 'night' });
  assert.equal(await controller.mount(), false);
  assert.equal(controller.getStatus().reason, 'engine-unavailable');
  assert.equal(controller.getStatus().mounted, false);
  assert.equal(box.timers.length, 1, 'the lazy bundle gets another chance');
  assert.equal(box.timers[0].delay, 250);

  // The injected bundle finishes loading: the adapter must remount every fallback stage.
  box.window.ASCIIRealms = fakeEngine(state);
  box.window.dispatchEvent(new SandboxEvent('ascii-realms:ready'));
  assert.equal(controller.getMode(), 'engine');
  assert.equal(state.mounts, 1);
  assert.deepEqual({ ...controller.getStatus() }, {
    mode: 'engine', reason: null, mounted: true, attempts: 1, cellSize: 6.5
  });
});

test('a mount that throws is retried once the bundle/GLB settles', async () => {
  const state = { mounts: 0, throwOnMount: true };
  const box = createAdapterSandbox({ ASCIIRealms: fakeEngine(state) });

  const controller = box.sandbox.TP.scene.create(box.container, { preset: 'night' });
  assert.equal(await controller.mount(), false);
  assert.equal(controller.getStatus().reason, 'mount-failed');
  assert.equal(box.timers.length, 1, 'mount failures are retried too');

  state.throwOnMount = false;
  assert.equal(await controller.remount(), true);
  assert.equal(controller.getMode(), 'engine');
  assert.equal(controller.getStatus().reason, null);
});

test('the adapter exposes the mount verdict and asks the engine for wheel zoom', () => {
  includesAll(adapterSrc, [
    'function webgl2Support()',
    'webgl-software',
    'webgl-unavailable',
    'engine-unavailable',
    'mount-failed',
    'tp:scene-status',
    'getStatus: statusPayload',
    'remount: function ()',
    'ascii-realms:error',
    'enableWheelZoom: true'
  ]);
  // The scroll wheel belongs to the engine (non-passive, preventDefault inside the stage);
  // the adapter must never swallow wheel events itself.
  assert.doesNotMatch(adapterSrc, /addEventListener\('wheel',[\s\S]{0,80}\{\s*passive:\s*false/);
  assert.match(adapterSrc, /\['pointerdown', 'keydown', 'wheel'\]\.forEach[\s\S]{0,120}\{ once: true, passive: true \}/);
});

test('main.js waits for the lazy adapter, binds once and explains a failed mount', () => {
  includesAll(mainSrc, [
    'SCENE_ADAPTER_POLL_TRIES',
    "stage.getAttribute('data-scene-bound')",
    "stage.setAttribute('data-scene-bound', 'true')",
    "stage.addEventListener('tp:scene-status', onSceneStatus)",
    "stage.setAttribute('data-scene-failure', detail.reason)",
    "'NO WEBGL'",
    "t('scene.statusWebgl')",
    "t('scene.statusEngine')"
  ]);
  // A single one-shot listener is what used to strand the section.
  assert.doesNotMatch(
    mainSrc,
    /if \(!TP\.scene\) \{\s*window\.addEventListener\('engine-adapter:ready', initScene, \{ once: true \}\);\s*return;\s*\}/
  );
});

test('stage CSS keeps the canvas full-bleed, the wheel inside the stage and the zoom cue visible', () => {
  const engineMode = css.split('.scene-stage[data-mode="engine"] {')[1].split('}')[0];
  includesAll(engineMode, ['cursor: zoom-in', 'touch-action: pan-y', 'overscroll-behavior: contain', 'padding: 0']);
  const canvasRule = css.split('.scene-stage > canvas {')[1].split('}')[0];
  includesAll(canvasRule, [
    'position: absolute',
    'inset: 0',
    'width: 100%',
    'height: 100%',
    'pointer-events: none'
  ]);
  // The fallback art must never sit on top of the live canvas and eat its gestures.
  assert.match(css, /\.scene-stage\[data-mode="engine"\] \.scene-fallback \{ display: none; \}/);
  // Section markup: the stage is a plain relative box, no overlay wrapper.
  const section = html.slice(html.indexOf('<section id="scene"'), html.indexOf('</section>', html.indexOf('<section id="scene"')));
  assert.match(section, /id="ascii-scene" class="scene-stage"/);
  assert.match(section, /class="scene-help/);
  includesAll(section, ['id="scene-cell-size"', 'id="scene-fullscreen"']);
});

test('the zoom affordance is documented in both locales', () => {
  for (const dictionary of [pt, en]) {
    includesAll(dictionary['scene.engineHelp'], ['zoom']);
    includesAll(dictionary['scene.presetHelp'], ['zoom']);
    assert.ok(dictionary['scene.statusWebgl'].length > 10);
    assert.ok(dictionary['scene.statusEngine'].length > 10);
  }
});
