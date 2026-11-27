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

  // Derive the expected counts from the shipped GLB instead of hardcoding them: a scene
  // re-export must not turn a correct build into a red CI run, but a partial decode must
  // still fail (the benchmark must cover every Draco primitive and WebP texture).
  const { readFileSync: readGlb } = require('node:fs');
  const glb = readGlb(path.join(root, 'assets/models/cena_completa.glb'));
  const glbJson = JSON.parse(glb.subarray(20, 20 + glb.readUInt32LE(12)).toString('utf8'));
  const expectedPrimitives = (glbJson.meshes || []).reduce(
    (sum, mesh) => sum + mesh.primitives.filter((prim) => prim.extensions && prim.extensions.KHR_draco_mesh_compression).length,
    0
  );
  const expectedWebp = (glbJson.images || []).filter((img) => img.mimeType === 'image/webp').length;

  assert.ok(expectedPrimitives > 0, 'GLB ships Draco-compressed primitives');
  assert.equal(
    report.scene.dracoPrimitives,
    expectedPrimitives,
    `all ${expectedPrimitives} Draco mesh primitives decoded`
  );
  assert.equal(report.scene.vertices, 621_591, 'all unique vertices decoded');
  assert.equal(report.scene.triangles, 612_502, 'all triangles decoded');
  assert.ok(report.scene.vertices >= 600_000 && report.scene.triangles >= 600_000, 'scene geometry fully decoded');
  assert.equal(report.scene.webpImages, expectedWebp, `all ${expectedWebp} WebP textures verified`);
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

test('repository stores zero uncompressed 3D scene files in working tree or active git history', () => {
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
    glbFiles.map((f) => path.relative(root, f)),
    ['assets/models/cena_completa.glb'],
    'only the single compressed cena_completa.glb exists in the repository'
  );

  const glbSize = statSync(glbFiles[0]).size;
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
      assert.ok(
        byteSize < 50 * 1024 * 1024,
        `Tracked HEAD tree stores an uncompressed >50 MB blob: ${objPath} (${byteSize} B)`
      );
    }
  }
});
