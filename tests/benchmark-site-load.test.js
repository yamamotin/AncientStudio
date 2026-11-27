'use strict';

const { execFileSync } = require('node:child_process');
const { existsSync, readdirSync, readFileSync, statSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const {
  runSiteLoadBenchmark,
  formatBenchmarkNotification,
  writeGithubSummary
} = require('../scripts/benchmark-site-load');

const root = path.resolve(__dirname, '..');

test('benchmark notifies average site loading speed with real Draco WASM scene decompression', async (t) => {
  const report = await runSiteLoadBenchmark({ iterations: 5, workerLimit: 4 });
  const notification = formatBenchmarkNotification(report);

  // Surface notification prominently in node:test output and CI step summary.
  for (const line of notification.split('\n')) {
    t.diagnostic(line);
  }
  writeGithubSummary(report);

  assert.equal(report.iterations, 5);
  assert.equal(report.workerLimit, 4);
  assert.equal(report.scene.dracoPrimitives, 154, 'all 154 Draco mesh primitives decoded');
  assert.equal(report.scene.vertices, 498_351, 'all 498,351 unique vertices decoded');
  assert.equal(report.scene.triangles, 438_122, 'all 438,122 triangles decoded');
  assert.ok(report.scene.webpImages >= 70, 'embedded WebP textures verified');
  assert.deepEqual(
    report.scene.preservedNodes,
    ['Cidade_Sketchfab_model', 'Player_Rig', 'Carro_Grupo'],
    'required scene root nodes preserved'
  );
  for (const track of ['Idle', 'Walking', 'Casting']) {
    assert.ok(report.scene.animations.includes(track), `missing NLA track ${track}`);
  }

  assert.match(report.scene.wasmContentType, /^application\/wasm/i);
  assert.match(report.scene.glbContentType, /^model\/gltf-binary/i);

  assert.ok(report.stats.criticalSiteMs.avg < 500, `critical site load too slow: ${report.stats.criticalSiteMs.avg} ms`);
  assert.ok(
    report.stats.dracoDecompressParallelMs.avg < 2500,
    `Draco WASM 4-worker decompression too slow: ${report.stats.dracoDecompressParallelMs.avg} ms`
  );
  assert.ok(
    report.stats.totalSiteWithSceneMs.avg < 4000,
    `total site + scene decompression too slow: ${report.stats.totalSiteWithSceneMs.avg} ms`
  );
  assert.ok(
    report.profiles.fiber100Mbps.compressedTotalMs <
      report.profiles.fiber100Mbps.uncompressedLegacyMs * 0.5,
    'compressed Draco+WebP load must be >2x faster than legacy 81 MB uncompressed asset on 100 Mbps'
  );
});

test('frontend bundle exports SceneGlbLoader with self-hosted ./assets/draco/ and rejects external CDNs', () => {
  const bundleCode = readFileSync(path.join(root, 'assets/js/ascii-engine.bundle.js'), 'utf8');
  const adapterCode = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');

  includesAll(adapterCode, [
    "DEFAULT_DRACO_PATH = './assets/draco/'",
    "DEFAULT_GLB_URL = './assets/models/cena_completa.glb'",
    'loadSceneGlb:',
    'getGlbMetrics:',
    'disposeGlbLoader:'
  ]);

  const sandbox = {
    console,
    Math,
    Date,
    performance,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Float32Array,
    ArrayBuffer,
    DataView,
    TextDecoder,
    URL,
    Blob,
    Promise,
    Set,
    Map,
    WeakMap
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(bundleCode, sandbox);

  const api = sandbox.ASCIIRealms;
  assert.ok(api && typeof api.SceneGlbLoader === 'function', 'SceneGlbLoader exported on window.ASCIIRealms');
  assert.equal(api.DEFAULT_DRACO_DECODER_PATH, './assets/draco/');
  assert.equal(api.DEFAULT_SCENE_GLB_URL, './assets/models/cena_completa.glb');

  const loader = new api.SceneGlbLoader();
  assert.equal(loader.getDecoderPath(), './assets/draco/');
  assert.equal(loader.getWorkerLimit(), 4);
  loader.dispose();

  assert.throws(
    () => new api.SceneGlbLoader({ decoderPath: 'https://www.gstatic.com/draco/v1/decoders/' }),
    /zero-CDN policy/i
  );
});

test('active scene stays compressed and existing alternate model is preserved', () => {
  const forbiddenExt = /\.(blend|blend1|fbx|obj|orig\.glb|raw\.glb|uncompressed\.glb)$/i;
  const glbFiles = [];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist') {
        continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        assert.doesNotMatch(entry.name, forbiddenExt, `uncompressed authoring file must not exist: ${full}`);
        if (/\.glb$/i.test(entry.name)) {
          glbFiles.push(full);
        }
      }
    }
  }

  walk(root);
  assert.deepEqual(
    glbFiles.map((f) => path.relative(root, f)).sort(),
    ['assets/models/cena_completa.glb', 'assets/models/cena_final.glb'],
    'the active compressed scene and existing alternate model both remain available'
  );

  const glbSize = statSync(path.join(root, 'assets/models/cena_completa.glb')).size;
  assert.ok(glbSize < 20 * 1024 * 1024, `cena_completa.glb (${glbSize} B) must remain compressed (<20 MiB)`);

  if (existsSync(path.join(root, '.git'))) {
    const treeListing = execFileSync('git', ['ls-tree', '-r', '-l', 'HEAD'], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024
    });

    for (const line of treeListing.split('\n')) {
      if (!line.trim()) continue;
      const [meta, objPath] = line.split('\t');
      const parts = meta.trim().split(/\s+/);
      if (parts[1] !== 'blob') continue;
      const byteSize = Number(parts[3]);
      // The alternate textured model was already present on main; keep it without
      // allowing other large blobs or loading it as the active scene by accident.
      const limit = objPath === 'assets/models/cena_final.glb' ? 100 : 50;
      assert.ok(
        byteSize < limit * 1024 * 1024,
        `Tracked HEAD blob exceeds its ${limit} MiB limit: ${objPath} (${byteSize} B)`
      );
    }
  }
});
