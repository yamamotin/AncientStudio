'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const adapter = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');
const main = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');

test('index.html keeps relative, file://-safe asset paths', () => {
  includesAll(html, [
    'assets/css/style.css',
    'assets/js/main.js'
  ], 'relative asset');
  includesAll(main, ['assets/js/engine-adapter.js', 'IntersectionObserver'], 'deferred adapter');
  includesAll(adapter, ['assets/js/ascii-engine.bundle.js', 'requestIdleCallback'], 'deferred engine');
  assertNoAbsoluteAssetPaths(html);
});

function assertNoAbsoluteAssetPaths(source) {
  const { assert } = require('./helpers/assert');
  const remoteSources = source.match(/src="https?:\/\/[^"]+"/g) || [];
  assert.deepEqual(remoteSources, [], 'no remote runtime assets');

  // Only the professional profile links may be absolute; runtime assets stay local.
  const allowedHosts = ['https://www.linkedin.com/', 'https://github.com/yamamotin/AncientStudio/actions'];
  const remoteLinks = source.match(/href="https?:\/\/[^"]+"/g) || [];
  remoteLinks.forEach((link) => {
    assert.ok(allowedHosts.some((host) => link.includes(host)), `unexpected remote link: ${link}`);
  });

  const externalAnchors = source.match(/<a\b[^>]*href="https?:\/\/[^"]+"[^>]*>/g) || [];
  assert.ok(externalAnchors.length > 0, 'external anchors exist');
  externalAnchors.forEach((anchor) => {
    assert.match(anchor, /rel="noopener noreferrer"/, `missing rel=noopener: ${anchor}`);
  });
}

test('required sections and real identity are present', () => {
  includesAll(html, [
    '| ____|  _ \\ / _ \\',
    '[ CENA 3D INTERATIVA ]',
    '[ API GATEWAY // INTEGRAÇÕES ]',
    '[ LIVE CI/CD &amp; DOCKER PIPELINE ]',
    'STACK // NEOFETCH',
    'assets/img/eron-portrait-ascii.png',
    'id="penguin-stage"',
    'id="ascii-scene"',
    '>[ github ]</button>',
    '>[ curriculo-pt-br ]</a>',
    '>[ curriculo-en ]</a>',
    'id="contact-button"',
    'href="https://www.linkedin.com/in/eron-yamamoto/"'
  ]);
});

test('no phone number or analytics in browser-facing HTML', () => {
  const { assert } = require('./helpers/assert');
  assert.ok(!/\+?55\s?\(?\d{2}\)?[\s.]*9?\d{4}/.test(html), 'no phone number');
  assert.ok(!/(gtag|googletagmanager|plausible|fathom)/i.test(html), 'no trackers');
});

test('scene help static fallback matches its pt-br dictionary key', () => {
  const { assert } = require('./helpers/assert');
  const pt = JSON.parse(readFileSync(path.join(root, 'assets/i18n/pt-br.json'), 'utf8'));
  const match = html.match(
    /<span[^>]*class="[^"]*scene-help[^"]*"[^>]*data-i18n="scene\.presetHelp"[^>]*>([^<]+)<\/span>/
  );

  assert.ok(match, 'scene help element with data-i18n hook');
  assert.equal(match[1], pt['scene.presetHelp']);
  assert.doesNotMatch(html, /scene\.engineHelp/, 'no raw i18n key leaks into static HTML');
});
