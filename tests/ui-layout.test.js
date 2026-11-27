'use strict';

/* Layout batch: contextual per-card API responses, the temporary penguin font bar,
   the console position after the API gateway and the 50%-100% brightness curve. */

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');

const html = read('index.html');
const main = read('assets/js/main.js');
const css = read('assets/css/style.css');
const adapter = read('assets/js/engine-adapter.js');
const penguinFont = read('assets/js/penguin-font.js');
const i18n = read('assets/js/i18n.js');
const pt = JSON.parse(read('assets/i18n/pt-br.json'));
const en = JSON.parse(read('assets/i18n/en.json'));

const CARDS = [
  { slug: 'municipio', meta: 'extract-meta', output: 'extract-output', buttons: ['transparencia-button', 'extract-button'] },
  { slug: 'projudi', meta: 'projudi-meta', output: 'projudi-output', buttons: ['projudi-consulta-button', 'projudi-detalhe-button'] },
  { slug: 'bcb', meta: 'bcb-meta', output: 'bcb-output', buttons: ['bcb-indicadores-button', 'bcb-instituicoes-button'] },
  { slug: 'siscomex', meta: 'invoice-meta', output: 'invoice-output', buttons: ['siscomex-ncm-button', 'invoice-button'] },
  { slug: 'resumo', meta: 'resumo-meta', output: 'resumo-output', buttons: ['projudi-resumo-button'] },
  { slug: 'n8n', meta: 'workflow-meta', output: 'workflow-output', buttons: ['workflow-run', 'workflow-status'] }
];

function cardOf(buttonId) {
  const marker = `id="${buttonId}"`;
  const at = html.indexOf(marker);
  assert.ok(at > 0, `${buttonId} exists`);
  const start = html.lastIndexOf('<div class="gateway-card">', at);
  const end = html.indexOf('</div>\n        </div>', at);
  return html.slice(start, end === -1 ? html.length : end);
}

test('every API card owns its response window, wired to that card only', () => {
  assert.equal((html.match(/class="api-response"/g) || []).length, CARDS.length);
  for (const card of CARDS) {
    const start = html.indexOf(`data-api-response="${card.slug}"`);
    const outputAt = html.indexOf(`id="${card.output}"`, start);
    const window = html.slice(start, html.indexOf('</div>', html.indexOf('</pre>', outputAt)) + 6);
    includesAll(window, [`id="${card.meta}"`, `id="${card.output}"`, 'data-response-close']);
    // The window lives inside the same card as the buttons that trigger it.
    for (const buttonId of card.buttons) {
      const owner = cardOf(buttonId);
      assert.ok(owner.includes(`data-api-response="${card.slug}"`), `${buttonId} is in the ${card.slug} card`);
      assert.ok(owner.includes(`id="${card.meta}"`), `${buttonId} writes to ${card.meta}`);
    }
    // It is closed by default: only one window is ever on screen.
    assert.match(window, /hidden/, `${card.slug} starts hidden`);
    // And main.js targets exactly this pair for those handlers.
    assert.ok(main.includes(`'${card.meta}'`), `main.js targets ${card.meta}`);
    assert.ok(main.includes(`'${card.output}'`), `main.js targets ${card.output}`);
  }
  // No response is left dangling at the bottom of a tab panel.
  assert.doesNotMatch(html, /<\/div>\s*<p id="extract-meta"/);
  for (const legacy of ['projudi-output', 'bcb-output', 'resumo-output']) {
    assert.ok(html.indexOf(`id="${legacy}"`) > html.indexOf('data-api-response'), `${legacy} is inside a card`);
  }
});

test('main.js keeps a single active response window and closes it on demand', () => {
  includesAll(main, [
    'function activateResponse(metaId, outputId)',
    "meta.closest('[data-api-response]')",
    "document.querySelectorAll('[data-api-response]')",
    'if (other !== container) closeResponse(other)',
    'function prepareResponse(metaId, outputId)',
    'prepareResponse(metaId, outputId);',
    "container.setAttribute('data-response-state', 'active')",
    'function initApiResponses()',
    "closest('[data-response-close]')",
    'initApiResponses();'
  ]);
  // renderResponse, renderError and the CAPTCHA notes all open their own window,
  // which is what guarantees "one at a time" for every code path.
  assert.ok((main.match(/activateResponse\(metaId, outputId\)/g) || []).length >= 3);
  // Closing resets the placeholder instead of leaving stale JSON behind.
  includesAll(main, [
    'function resetResponse(container)',
    "node.textContent = t(node.getAttribute('data-i18n'))",
    "container.setAttribute('hidden', '')"
  ]);
  assert.ok(pt['api.close'] && en['api.close'], 'close label is translated');
  assert.ok(pt['api.closeAria'] && en['api.closeAria'], 'close aria label is translated');
  includesAll(i18n, ['"api.close"', '"api.closeAria"']);
});

test('the temporary penguin font bar is translated, isolated and removable', () => {
  const stack = html.slice(html.indexOf('<section id="stack"'), html.indexOf('</main>'));
  includesAll(stack, [
    'id="penguin-font-bar"',
    'data-temporary="true"',
    'id="penguin-font-size"',
    'type="range"',
    'id="penguin-font-value"',
    '10px',
    'id="penguin-font-reset"',
    'data-i18n="penguinFont.label"',
    'data-i18n="penguinFont.reset"',
    'data-i18n="penguinFont.tag"'
  ]);
  // It targets the penguin stage area, before the neofetch block.
  assert.ok(stack.indexOf('penguin-font-bar') < stack.indexOf('class="neofetch"'));
  // The neofetch spec rows are untouched (still exactly seven).
  assert.equal((stack.match(/<dt/g) || []).length, 7);
  assert.equal((stack.match(/<dd/g) || []).length, 7);

  for (const key of ['penguinFont.label', 'penguinFont.aria', 'penguinFont.reset', 'penguinFont.resetAria', 'penguinFont.groupAria', 'penguinFont.tag']) {
    assert.ok(pt[key] && en[key], `missing translation for ${key}`);
    assert.ok(i18n.includes(`"${key}"`), `${key} is mirrored in BUNDLED`);
  }
  includesAll(css, [
    '.penguin-font-bar',
    '#penguin-stage[data-font-override="true"] .penguin-fallback',
    'font-size: var(--penguin-font-px, 10px) !important'
  ]);
  includesAll(penguinFont, ['TEMPORARY', 'HOW TO REMOVE IT', '--penguin-font-px', 'setMascotCellSize', 'resetMascotCellSize']);
  // The mascot mounts after boot: the chosen size is re-applied when the stage reports engine mode.
  includesAll(penguinFont, ["addEventListener('tp:scene-mode', onStageMode)", "event.detail.mode !== 'engine'"]);
  // The bar is the only place that owns the override, so deleting it is enough.
  assert.equal(
    (html.match(/<script src="assets\/js\/penguin-font\.js"/g) || []).length,
    1,
    'one script tag to delete'
  );
  assert.ok(main.includes('if (TP.penguinFont) TP.penguinFont.init();'));
  assert.doesNotMatch(read('assets/js/neofetch.js'), /penguinFont|penguin-font/, 'neofetch.js stays independent');
});

test('the penguin font bar resizes the fallback and the live mascot, then resets', () => {
  const calls = [];
  const stageHandlers = {};
  const stage = {
    attrs: {},
    styles: {},
    style: { setProperty(name, value) { stage.styles[name] = value; } },
    setAttribute(name, value) { stage.attrs[name] = value; },
    getAttribute(name) { return stage.attrs[name] === undefined ? null : stage.attrs[name]; },
    addEventListener(type, handler) { (stageHandlers[type] = stageHandlers[type] || []).push(handler); },
    removeEventListener(type, handler) {
      stageHandlers[type] = (stageHandlers[type] || []).filter((fn) => fn !== handler);
    },
    fire(type, detail) { (stageHandlers[type] || []).forEach((fn) => fn({ type, detail })); }
  };
  const input = {
    value: '10',
    min: '4',
    max: '20',
    step: '0.5',
    attrs: {},
    handlers: {},
    setAttribute(name, value) { input.attrs[name] = String(value); },
    getAttribute(name) { return input.attrs[name] === undefined ? null : input.attrs[name]; },
    addEventListener(type, handler) { (input.handlers[type] = input.handlers[type] || []).push(handler); },
    removeEventListener(type, handler) {
      input.handlers[type] = (input.handlers[type] || []).filter((fn) => fn !== handler);
    },
    fire(type) { (input.handlers[type] || []).forEach((fn) => fn({ type })); }
  };
  const output = { textContent: '10px' };
  const resetButton = {
    handlers: {},
    addEventListener(type, handler) { (resetButton.handlers[type] = resetButton.handlers[type] || []).push(handler); },
    removeEventListener() {},
    fire(type) { (resetButton.handlers[type] || []).forEach((fn) => fn({ type })); }
  };
  const sandbox = {
    console,
    Math,
    Number,
    isFinite,
    document: {
      getElementById(id) {
        if (id === 'penguin-stage') return stage;
        if (id === 'penguin-font-size') return input;
        if (id === 'penguin-font-value') return output;
        if (id === 'penguin-font-reset') return resetButton;
        return null;
      }
    }
  };
  sandbox.window = sandbox;
  sandbox.window.TP = {
    scene: {
      setMascotCellSize(px) { calls.push(['set', px]); return px; },
      resetMascotCellSize() { calls.push(['reset']); return 8; }
    }
  };
  sandbox.TP = sandbox.window.TP;
  const pagehide = [];
  sandbox.window.addEventListener = (type, handler) => { if (type === 'pagehide') pagehide.push(handler); };
  sandbox.window.removeEventListener = () => {};

  vm.createContext(sandbox);
  vm.runInContext(penguinFont, sandbox);

  assert.equal(sandbox.TP.penguinFont.init(), true);
  assert.equal(sandbox.TP.penguinFont.config.temporary, true);
  assert.equal(stage.styles['--penguin-font-px'], '10px', 'the declared default is applied at boot');
  assert.equal(stage.attrs['data-font-override'], 'true');
  assert.equal(output.textContent, '10px');
  assert.deepEqual(calls, [['set', 10]], 'the mascot receives the same size while mounted');

  // Slider moves reach both renders live.
  input.value = '16';
  input.fire('input');
  assert.equal(stage.styles['--penguin-font-px'], '16px');
  assert.equal(output.textContent, '16px');
  assert.equal(input.attrs['aria-valuetext'], '16px');
  assert.deepEqual(calls[calls.length - 1], ['set', 16]);

  // Out-of-range and fractional values are clamped to the declared window.
  sandbox.TP.penguinFont.setPixels(99);
  assert.equal(sandbox.TP.penguinFont.getPixels(), 20);
  sandbox.TP.penguinFont.setPixels(1);
  assert.equal(sandbox.TP.penguinFont.getPixels(), 4);
  sandbox.TP.penguinFont.setPixels(7.26);
  assert.equal(sandbox.TP.penguinFont.getPixels(), 7.5);

  // Reset restores the default size and the mascot's mounted density.
  input.value = '18';
  input.fire('input');
  resetButton.fire('click');
  assert.equal(stage.styles['--penguin-font-px'], '10px');
  assert.equal(input.value, '10');
  assert.equal(output.textContent, '10px');
  assert.deepEqual(calls[calls.length - 1], ['reset']);

  // When the mascot finishes mounting, the chosen size is pushed to it again.
  input.value = '14';
  input.fire('input');
  calls.length = 0;
  stage.fire('tp:scene-mode', { mode: 'engine' });
  assert.deepEqual(calls, [['set', 14]], 'the mounted mascot receives the current size');

  // pagehide removes the listeners: nothing keeps running after the tab goes away.
  assert.ok(pagehide.length >= 1);
  pagehide.forEach((handler) => handler({ type: 'pagehide' }));
  input.value = '19';
  input.fire('input');
  assert.equal(sandbox.TP.penguinFont.getPixels(), 14, 'no listener survives pagehide');
});

test('the mascot density hook is additive and never touches the main scene contract', () => {
  includesAll(adapter, [
    'function setMascotCellSize(px)',
    'function resetMascotCellSize()',
    'if (!isMascot) return null;',
    'setMascotCellSize: setMascotCellSize,',
    'resetMascotCellSize: resetMascotCellSize,',
    'setMascotCellSize: function (px) {',
    'resetMascotCellSize: function () {'
  ]);
  // The public scene contract is untouched.
  includesAll(adapter, [
    'create: function (container, options)',
    'mount: function (container, options)',
    'setPaused: function (paused)',
    'setPreset: function (name)',
    'setAutoOrbit: function (enabled)',
    'getScene: function ()',
    'destroy: function ()'
  ]);
  // Main-scene cell sizing still resets through the documented path.
  includesAll(adapter, ['function resetCellSize()', 'function setCellSize(px)']);
  assert.equal((adapter.match(/if \(isMascot\) return state\.mountCellSize;/g) || []).length, 2, 'setCellSize/resetCellSize keep ignoring the mascot');
});

test('the interactive console sits right after the API gateway', () => {
  const gateway = html.indexOf('<section id="gateway"');
  const consoleAt = html.indexOf('<section id="console"');
  const sceneAt = html.indexOf('<section id="scene"');
  const stackAt = html.indexOf('<section id="stack"');
  assert.ok(gateway > 0 && consoleAt > gateway, 'console follows the gateway');
  assert.ok(sceneAt > consoleAt, 'the 3D scene follows the console');
  assert.ok(stackAt > sceneAt, 'the stack closes the page');

  // Nothing but the closing gateway markup separates the two sections.
  const between = html.slice(html.indexOf('</section>', gateway), consoleAt);
  assert.match(between, /^<\/section>\s*(<!-- 4\. INTERACTIVE CONSOLE -->)?\s*$/);
  assert.ok(between.length < 200, `unexpected markup between gateway and console: ${between.slice(0, 120)}`);

  // Navigation follows the same order and every anchor still resolves.
  const nav = html.slice(html.indexOf('<nav class="topnav"'), html.indexOf('</nav>'));
  const hrefs = [...nav.matchAll(/href="#([a-z-]+)"/g)].map((match) => match[1]);
  assert.deepEqual(hrefs, ['pipeline', 'gateway', 'console', 'scene']);
  for (const id of hrefs) assert.ok(html.includes(`id="${id}"`), `#${id} target exists`);
  includesAll(nav, ['data-i18n="nav.pipeline"', 'data-i18n="nav.apis"', 'data-i18n="nav.console"', 'data-i18n="nav.scene"']);
  assert.equal(pt['nav.console'], '03 console');
  assert.equal(pt['nav.scene'], '04 cena');
  assert.equal(en['nav.scene'], '04 scene');
  // Console wiring is untouched by the move.
  includesAll(html, ['id="console-output"', 'id="console-form"', 'id="console-input"', 'id="console-title"']);
});

test('brightness keeps 50%-100% but the visual curve is amplified', () => {
  const topbar = html.slice(html.indexOf('<header class="topbar"'), html.indexOf('</header>'));
  includesAll(topbar, ['min="50"', 'max="100"', 'step="1"', 'value="100"', '>100%<']);
  includesAll(main, [
    'var BRIGHTNESS_CURVE = {',
    'brightness: { min: 0.5, max: 1.3 }',
    'contrast: { min: 0.78, max: 1.05 }',
    'function brightnessProfile(amount, min, max)'
  ]);
  includesAll(css, ['--page-contrast: 1.05', 'contrast(var(--page-contrast))']);
});
