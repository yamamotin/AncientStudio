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
  const remoteAssets = source.match(/(?:src|href)="https?:\/\/[^"]+"/g) || [];
  const allowed = remoteAssets.filter((tag) => tag.includes('linkedin.com/'));
  assert.equal(remoteAssets.length, allowed.length, 'no remote runtime assets');
}

test('required sections and real identity are present', () => {
  includesAll(html, [
    '| ____|  _ \\ / _ \\',
    'ASCII REALMS // SCENE',
    'STACK // NEOFETCH',
    'id="penguin-stage"',
    'id="ascii-scene"',
    '>[github]</button>',
    '>[ curriculo-pt-br ]</a>',
    '>[ curriculo-en ]</a>'
  ]);
});

test('no phone number or analytics in browser-facing HTML', () => {
  const { assert } = require('./helpers/assert');
  assert.ok(!/\+?55\s?\(?\d{2}\)?[\s.]*9?\d{4}/.test(html), 'no phone number');
  assert.ok(!/(gtag|googletagmanager|plausible|fathom)/i.test(html), 'no trackers');
});
