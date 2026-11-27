'use strict';

/* Layout batch: contextual per-card API responses, the fixed 4px penguin with its
   lighter outline, the console position after the API gateway and the 50%-100%
   brightness curve. */

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
const i18n = read('assets/js/i18n.js');
const neofetch = read('assets/js/neofetch.js');
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

test('the temporary penguin font slider is gone and the penguin is fixed at 4px', () => {
  const stack = html.slice(html.indexOf('<section id="stack"'), html.indexOf('</main>'));
  // No slider, no px readout, no reset button, no temporary marker anywhere in the page.
  for (const gone of ['penguin-font-bar', 'penguin-font-size', 'penguin-font-value', 'penguin-font-reset']) {
    assert.ok(!html.includes(gone), `#${gone} was removed from index.html`);
  }
  assert.ok(!html.includes('penguinFont'), 'no penguinFont i18n keys remain in the markup');
  assert.ok(!html.includes('data-temporary'), 'the temporary container is gone');
  assert.equal((html.match(/<script src="assets\/js\/penguin-font\.js"/g) || []).length, 0);
  // The stack section itself is untouched: fixed (no scene-style collapse removal),
  // seven spec rows and the penguin stage in place.
  includesAll(stack, ['id="penguin-stage"', 'class="penguin-fallback"', 'id="stack-body"']);
  assert.equal((stack.match(/<dt/g) || []).length, 7);
  assert.equal((stack.match(/<dd/g) || []).length, 7);
  assert.ok(!stack.includes('type="range"'), 'no range input is left in the penguin section');

  // The module and its translations are gone from every layer.
  assert.ok(!read('assets/js/main.js').includes('penguinFont'), 'main.js no longer boots the module');
  for (const key of ['penguinFont.label', 'penguinFont.aria', 'penguinFont.reset', 'penguinFont.resetAria', 'penguinFont.groupAria', 'penguinFont.tag']) {
    assert.ok(!pt[key] && !en[key], `${key} was pruned from both dictionaries`);
    assert.ok(!i18n.includes(`"${key}"`), `${key} was pruned from BUNDLED`);
  }
  assert.ok(!css.includes('.penguin-font-bar'), 'the bar CSS is gone');
  assert.ok(!css.includes('data-font-override'), 'the override CSS is gone');

  // 4px is the single source of truth for the ASCII fallback.
  includesAll(neofetch, ['var PENGUIN_FONT_PX = 4;', 'fontPx: PENGUIN_FONT_PX']);
  includesAll(css, ['font-size: var(--penguin-font-px, 4px)']);
  assert.doesNotMatch(neofetch, /fontPx = 9\.5|fontPx = 8\.5|fontPx = 8\.0|fontPx = 8\.8/, 'no adaptive font sizes remain');
});

test('the penguin outline is lighter and readable on the dark stage', () => {
  const fallback = css.slice(css.indexOf('.penguin-fallback {'), css.indexOf('}', css.indexOf('.penguin-fallback {')));
  // A light text color plus a white/mint halo instead of the old flat green glow.
  assert.match(fallback, /color:\s*#E9FFF6/, 'the typos are drawn in a light ink');
  includesAll(fallback, [
    'text-shadow:',
    'rgba(255, 255, 255, 0.9)',
    'rgba(180, 255, 220, 0.5)'
  ]);
  assert.doesNotMatch(fallback, /color:\s*var\(--green\)/, 'the flat dark green ink was replaced');

  // The live mascot gets the same light halo through CSS only (shaders untouched).
  const halo = css.slice(css.indexOf('#penguin-stage canvas {'), css.indexOf('}', css.indexOf('#penguin-stage canvas {')));
  includesAll(halo, ['filter: drop-shadow(', 'rgba(255, 255, 255, 0.55)', 'rgba(150, 255, 205, 0.22)']);
  // Rotation and lifecycle stay owned by the engine adapter.
  includesAll(adapter, ["getObjectByName('TuxMascotRoot')", 'startMascotSpin']);
});

test('the removed mascot hooks leave the public scene contract intact', () => {
  // The slider-only hooks are gone.
  assert.ok(!adapter.includes('MascotCellSize'), 'no mascot density hook survives');
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
