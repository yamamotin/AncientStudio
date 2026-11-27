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

test('cena_completa.glb is Draco+WebP compressed (<50 MB, non-LFS) with preserved nodes and NLA tracks', () => {
  const { existsSync, openSync, readSync, closeSync, statSync } = require('node:fs');
  const { assert } = require('./helpers/assert');

  assert.equal(existsSync(path.join(root, '.gitattributes')), false, 'Git LFS must not be used (breaks GitHub Pages)');

  const glbPath = path.join(root, 'assets/models/cena_completa.glb');
  assert.ok(existsSync(glbPath), 'assets/models/cena_completa.glb exists');

  const sizeBytes = statSync(glbPath).size;
  assert.ok(sizeBytes > 1024 * 1024, 'compressed GLB is a real binary asset, not a tiny LFS pointer');
  assert.ok(sizeBytes < 50 * 1024 * 1024, `GLB (${sizeBytes} B) must stay well below GitHub 50 MB GH001 limit`);
  assert.ok(sizeBytes < 20 * 1024 * 1024, `GLB (${sizeBytes} B) stays compact after Draco + WebP compression`);

  // Read only the 20-byte GLB header + JSON chunk (fast, low memory).
  const fd = openSync(glbPath, 'r');
  let gltf;
  try {
    const header = Buffer.alloc(20);
    readSync(fd, header, 0, 20, 0);
    assert.equal(header.toString('ascii', 0, 4), 'glTF', 'valid GLB magic header (not a Git LFS pointer)');
    assert.equal(header.readUInt32LE(4), 2, 'glTF version 2');
    assert.equal(header.readUInt32LE(8), sizeBytes, 'GLB header length matches file size');

    const jsonLength = header.readUInt32LE(12);
    assert.equal(header.toString('ascii', 16, 20), 'JSON', 'first chunk is JSON');
    const jsonBuf = Buffer.alloc(jsonLength);
    readSync(fd, jsonBuf, 0, jsonLength, 20);
    gltf = JSON.parse(jsonBuf.toString('utf8'));
  } finally {
    closeSync(fd);
  }

  const extensionsUsed = gltf.extensionsUsed || [];
  assert.ok(extensionsUsed.includes('KHR_draco_mesh_compression'), 'uses Draco mesh compression');
  assert.ok(extensionsUsed.includes('EXT_texture_webp'), 'uses WebP texture compression');

  const nodeNames = new Set((gltf.nodes || []).map((n) => n.name).filter(Boolean));
  for (const requiredNode of ['Cidade_Sketchfab_model', 'Player_Rig', 'Carro_Grupo']) {
    assert.ok(nodeNames.has(requiredNode), `preserves required scene node "${requiredNode}"`);
  }

  const animNames = new Set((gltf.animations || []).map((a) => a.name).filter(Boolean));
  for (const requiredTrack of ['Idle', 'Walking', 'Casting']) {
    assert.ok(animNames.has(requiredTrack), `preserves required NLA animation track "${requiredTrack}"`);
  }
});

test('self-hosted Draco decoder lives in assets/draco/ and uses relative ./assets/draco/ path (zero CDN)', () => {
  const { existsSync, statSync } = require('node:fs');
  const { assert } = require('./helpers/assert');

  for (const file of ['draco_decoder.js', 'draco_decoder.wasm', 'draco_wasm_wrapper.js']) {
    const full = path.join(root, 'assets/draco', file);
    assert.ok(existsSync(full), `missing assets/draco/${file}`);
    assert.ok(statSync(full).size > 10_000, `assets/draco/${file} must be non-empty`);
  }

  const wasmHeader = readFileSync(path.join(root, 'assets/draco/draco_decoder.wasm')).subarray(0, 4);
  assert.deepEqual([...wasmHeader], [0x00, 0x61, 0x73, 0x6d], 'draco_decoder.wasm has valid \\0asm header');

  const engineReadme = readFileSync(path.join(root, 'ascii-engine-module/README.md'), 'utf8');
  const integrationDoc = readFileSync(path.join(root, 'docs/engine-integration.md'), 'utf8');
  includesAll(engineReadme, ['./assets/draco/', './assets/models/cena_completa.glb']);
  includesAll(integrationDoc, ['./assets/draco/', './assets/models/cena_completa.glb']);
  assert.doesNotMatch(adapter, /gstatic\.com\/draco|unpkg\.com|jsdelivr\.net/i, 'zero external Draco CDN');
});
