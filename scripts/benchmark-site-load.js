#!/usr/bin/env node
'use strict';

/**
 * End-to-end benchmark for AncientStudio:
 *   1. Starts the real static/API server (`api/server.py`) on an ephemeral port.
 *   2. Measures critical site load (`index.html`, CSS, core JS, WOFF2 font, portrait, `/api/v1/health`).
 *   3. Measures deferred 3D engine bundle load (`engine-adapter.js` + `ascii-engine.bundle.js`).
 *   4. Measures self-hosted Draco WASM initialization (`./assets/draco/draco_wasm_wrapper.js` + `draco_decoder.wasm`).
 *   5. Measures `cena_completa.glb` (`11.52 MiB`) transfer + real C++/WASM Draco decompression
 *      across a 4-Worker parallel pool (matching Three.js `DRACOLoader`'s `workerLimit = 4`)
 *      and compares against 1-thread WASM + network bandwidth profiles (100 Mbps / 25 Mbps).
 *
 * Zero external npm dependencies: uses Node.js built-ins + self-hosted `assets/draco/`.
 */

const { spawn } = require('node:child_process');
const { appendFileSync } = require('node:fs');
const net = require('node:net');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const vm = require('node:vm');
const { Worker } = require('node:worker_threads');

const ROOT = path.resolve(__dirname, '..');
const LEGACY_UNCOMPRESSED_GLB_BYTES = 84_960_556; // 81.02 MiB before Draco+WebP optimization
const DEFAULT_ITERATIONS = 5;
const DEFAULT_WORKER_LIMIT = 4;

const WORKER_SCRIPT = `
'use strict';
const { parentPort, workerData } = require('node:worker_threads');
const vm = require('node:vm');

const ctx = {
  WebAssembly,
  console,
  Math,
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  ArrayBuffer,
  DataView,
  Promise,
  TextDecoder
};
ctx.self = ctx;
vm.createContext(ctx);
vm.runInContext(workerData.wrapperCode, ctx);

const moduleReady = new Promise((resolve) => {
  ctx.DracoDecoderModule({
    wasmBinary: workerData.wasmBinary,
    onModuleLoaded: (mod) => resolve(mod)
  });
});

parentPort.on('message', async (msg) => {
  if (msg.type === 'ping') {
    await moduleReady;
    parentPort.postMessage({ type: 'ready' });
    return;
  }
  if (msg.type === 'decode') {
    try {
      const draco = await moduleReady;
      const decoder = new draco.Decoder();
      const dracoMesh = new draco.Mesh();
      try {
        const encoded = new Int8Array(msg.buffer);
        const status = decoder.DecodeArrayToMesh(encoded, encoded.byteLength, dracoMesh);
        if (!status.ok()) {
          throw new Error(status.error_msg());
        }
        const numPoints = dracoMesh.num_points();
        const numFaces = dracoMesh.num_faces();
        const transfers = [];
        let decodedBytes = 0;

        for (const uniqueId of Object.values(msg.attributes)) {
          const attr = decoder.GetAttributeByUniqueId(dracoMesh, uniqueId);
          const numValues = numPoints * attr.num_components();
          const byteSize = numValues * 4;
          const ptr = draco._malloc(byteSize);
          decoder.GetAttributeDataArrayForAllPoints(dracoMesh, attr, draco.DT_FLOAT32, byteSize, ptr);
          const arr = new Float32Array(numValues);
          arr.set(new Float32Array(draco.HEAPF32.buffer, ptr, numValues));
          draco._free(ptr);
          transfers.push(arr.buffer);
          decodedBytes += arr.byteLength;
        }

        const useUint16 = numPoints <= 65535;
        const numIndices = numFaces * 3;
        if (useUint16) {
          const idxByteSize = numIndices * 2;
          const idxPtr = draco._malloc(idxByteSize);
          decoder.GetTrianglesUInt16Array(dracoMesh, idxByteSize, idxPtr);
          const indices = new Uint16Array(numIndices);
          indices.set(new Uint16Array(draco.HEAPU16.buffer, idxPtr, numIndices));
          draco._free(idxPtr);
          transfers.push(indices.buffer);
          decodedBytes += indices.byteLength;
        } else {
          const idxByteSize = numIndices * 4;
          const idxPtr = draco._malloc(idxByteSize);
          decoder.GetTrianglesUInt32Array(dracoMesh, idxByteSize, idxPtr);
          const indices = new Uint32Array(numIndices);
          indices.set(new Uint32Array(draco.HEAPU32.buffer, idxPtr, numIndices));
          draco._free(idxPtr);
          transfers.push(indices.buffer);
          decodedBytes += indices.byteLength;
        }

        parentPort.postMessage(
          {
            type: 'decoded',
            id: msg.id,
            numPoints,
            numFaces,
            decodedBytes
          },
          transfers
        );
      } finally {
        draco.destroy(dracoMesh);
        draco.destroy(decoder);
      }
    } catch (err) {
      parentPort.postMessage({
        type: 'error',
        id: msg.id,
        error: err && err.message ? err.message : String(err)
      });
    }
  }
});
`;

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      srv.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

async function startPortfolioServer() {
  const port = await getFreePort();
  const child = spawn('python3', [path.join(ROOT, 'api/server.py')], {
    cwd: ROOT,
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`api/server.py exited prematurely with code ${child.exitCode}`);
    }
    try {
      const res = await fetch(`${baseUrl}/api-status.json`);
      if (res.ok) {
        return {
          baseUrl,
          port,
          async stop() {
            if (child.exitCode !== null) return;
            child.kill('SIGTERM');
            await new Promise((resolve) => {
              const timer = setTimeout(() => {
                if (child.exitCode === null) child.kill('SIGKILL');
                resolve();
              }, 2000);
              child.once('exit', () => {
                clearTimeout(timer);
                resolve();
              });
            });
          }
        };
      }
    } catch (_) {
      // Server still binding.
    }
    await new Promise((r) => setTimeout(r, 40));
  }

  child.kill('SIGKILL');
  throw new Error('Timed out waiting for api/server.py to start for benchmark.');
}

async function createDracoWorkerPool(wrapperCode, wasmBinary, workerLimit = DEFAULT_WORKER_LIMIT) {
  const workers = [];
  const callbacks = new Map();
  let nextTaskId = 1;

  for (let i = 0; i < workerLimit; i += 1) {
    const worker = new Worker(WORKER_SCRIPT, {
      eval: true,
      workerData: { wrapperCode, wasmBinary }
    });
    worker._load = 0;
    worker._ready = new Promise((resolve, reject) => {
      const onMsg = (msg) => {
        if (msg.type === 'ready') {
          worker.off('message', onMsg);
          resolve();
        }
      };
      worker.on('message', onMsg);
      worker.once('error', reject);
    });
    worker.on('message', (msg) => {
      if (msg.type === 'decoded' || msg.type === 'error') {
        const entry = callbacks.get(msg.id);
        if (!entry) return;
        callbacks.delete(msg.id);
        entry.worker._load -= entry.cost;
        if (msg.type === 'error') {
          entry.reject(new Error(msg.error));
        } else {
          entry.resolve(msg);
        }
      }
    });
    worker.postMessage({ type: 'ping' });
    workers.push(worker);
  }

  await Promise.all(workers.map((w) => w._ready));

  return {
    decodePrimitive(sliceUint8, attributes) {
      const id = nextTaskId++;
      const copy = new Uint8Array(sliceUint8.byteLength);
      copy.set(sliceUint8);
      const cost = copy.byteLength;

      // Dispatch to least-loaded worker, matching Three.js DRACOLoader._getWorker().
      let chosen = workers[0];
      for (let i = 1; i < workers.length; i += 1) {
        if (workers[i]._load < chosen._load) {
          chosen = workers[i];
        }
      }
      chosen._load += cost;

      return new Promise((resolve, reject) => {
        callbacks.set(id, { resolve, reject, worker: chosen, cost });
        chosen.postMessage({ type: 'decode', id, buffer: copy.buffer, attributes }, [copy.buffer]);
      });
    },
    async dispose() {
      await Promise.all(workers.map((w) => w.terminate()));
    }
  };
}

function parseGlbBuffer(glbBuffer) {
  const buf = Buffer.from(glbBuffer);
  const magic = buf.toString('ascii', 0, 4);
  const version = buf.readUInt32LE(4);
  if (magic !== 'glTF' || version !== 2) {
    throw new Error(`Invalid GLB header (${magic} v${version})`);
  }
  const jsonLen = buf.readUInt32LE(12);
  const gltf = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
  const binStart = 20 + jsonLen + 8;
  const binChunk = new Uint8Array(buf.buffer, buf.byteOffset + binStart, buf.length - binStart);

  // Verify WebP image headers across embedded images.
  let webpImageCount = 0;
  for (const img of gltf.images || []) {
    if (typeof img.bufferView === 'number') {
      const bv = gltf.bufferViews[img.bufferView];
      const offset = bv.byteOffset || 0;
      if (
        binChunk[offset] === 0x52 && // 'R'
        binChunk[offset + 1] === 0x49 && // 'I'
        binChunk[offset + 2] === 0x46 && // 'F'
        binChunk[offset + 3] === 0x46 && // 'F'
        binChunk[offset + 8] === 0x57 && // 'W'
        binChunk[offset + 9] === 0x45 && // 'E'
        binChunk[offset + 10] === 0x42 && // 'B'
        binChunk[offset + 11] === 0x50 // 'P'
      ) {
        webpImageCount += 1;
      }
    }
  }

  const dracoPrimitives = [];
  for (const mesh of gltf.meshes || []) {
    for (const prim of mesh.primitives || []) {
      const ext = prim.extensions && prim.extensions.KHR_draco_mesh_compression;
      if (!ext) continue;
      const bv = gltf.bufferViews[ext.bufferView];
      const offset = bv.byteOffset || 0;
      dracoPrimitives.push({
        slice: binChunk.subarray(offset, offset + bv.byteLength),
        attributes: ext.attributes
      });
    }
  }

  const nodeNames = new Set((gltf.nodes || []).map((n) => n.name).filter(Boolean));
  const animationNames = (gltf.animations || []).map((a) => a.name).filter(Boolean);

  return {
    gltf,
    webpImageCount,
    dracoPrimitives,
    nodeNames,
    animationNames
  };
}

async function decodeSingleThreadReference(wrapperCode, wasmBinary, dracoPrimitives) {
  const ctx = {
    WebAssembly,
    console,
    Math,
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    ArrayBuffer,
    DataView,
    Promise,
    TextDecoder
  };
  ctx.self = ctx;
  vm.createContext(ctx);
  vm.runInContext(wrapperCode, ctx);

  const draco = await new Promise((resolve) => {
    ctx.DracoDecoderModule({
      wasmBinary,
      onModuleLoaded: (mod) => resolve(mod)
    });
  });

  const t0 = performance.now();
  for (const prim of dracoPrimitives) {
    const decoder = new draco.Decoder();
    const dracoMesh = new draco.Mesh();
    try {
      const arr = new Int8Array(prim.slice.buffer, prim.slice.byteOffset, prim.slice.byteLength);
      const status = decoder.DecodeArrayToMesh(arr, arr.byteLength, dracoMesh);
      if (!status.ok()) throw new Error(status.error_msg());
      const numPoints = dracoMesh.num_points();
      const numFaces = dracoMesh.num_faces();
      for (const uniqueId of Object.values(prim.attributes)) {
        const attr = decoder.GetAttributeByUniqueId(dracoMesh, uniqueId);
        const numValues = numPoints * attr.num_components();
        const byteSize = numValues * 4;
        const ptr = draco._malloc(byteSize);
        decoder.GetAttributeDataArrayForAllPoints(dracoMesh, attr, draco.DT_FLOAT32, byteSize, ptr);
        draco._free(ptr);
      }
      const idxByteSize = numFaces * 3 * (numPoints <= 65535 ? 2 : 4);
      const idxPtr = draco._malloc(idxByteSize);
      if (numPoints <= 65535) {
        decoder.GetTrianglesUInt16Array(dracoMesh, idxByteSize, idxPtr);
      } else {
        decoder.GetTrianglesUInt32Array(dracoMesh, idxByteSize, idxPtr);
      }
      draco._free(idxPtr);
    } finally {
      draco.destroy(dracoMesh);
      draco.destroy(decoder);
    }
  }
  return performance.now() - t0;
}

function computeStats(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const avg = sum / sorted.length;
  const mid = Math.floor(sorted.length / 2);
  const p50 =
    sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const p95Idx = Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1);
  return {
    avg: Number(avg.toFixed(2)),
    p50: Number(p50.toFixed(2)),
    min: Number(sorted[0].toFixed(2)),
    max: Number(sorted[sorted.length - 1].toFixed(2)),
    p95: Number(sorted[p95Idx].toFixed(2))
  };
}

function extractCriticalUrlsFromHtml(html) {
  const urls = new Set([
    'assets/fonts/jetbrains-mono-latin-400-normal.woff2',
    'api-status.json',
    'api/v1/health'
  ]);
  const attrRegex = /(?:href|src)="([^"]+)"/g;
  let match;
  while ((match = attrRegex.exec(html)) !== null) {
    const ref = match[1];
    if (
      !ref ||
      ref.startsWith('#') ||
      ref.startsWith('data:') ||
      ref.startsWith('http://') ||
      ref.startsWith('https://') ||
      ref.startsWith('mailto:') ||
      ref.endsWith('.pdf')
    ) {
      continue;
    }
    urls.add(ref.replace(/^\.?\//, ''));
  }
  return [...urls];
}

async function runSingleIteration(baseUrl, workerLimit) {
  const tStart = performance.now();

  // Stage 1: Critical Site Boot (HTML + CSS + Core JS + Font + Portrait + API status)
  const tCritStart = performance.now();
  const htmlRes = await fetch(`${baseUrl}/index.html`);
  if (!htmlRes.ok) throw new Error(`GET /index.html failed (${htmlRes.status})`);
  const html = await htmlRes.text();
  const criticalAssets = extractCriticalUrlsFromHtml(html);

  let criticalBytes = Buffer.byteLength(html, 'utf8');
  await Promise.all(
    criticalAssets.map(async (rel) => {
      const r = await fetch(`${baseUrl}/${rel}`);
      if (!r.ok) throw new Error(`GET /${rel} failed (${r.status})`);
      const ab = await r.arrayBuffer();
      criticalBytes += ab.byteLength;
    })
  );
  const criticalSiteMs = performance.now() - tCritStart;

  // Stage 2: Deferred ASCII 3D Engine Bundle (`engine-adapter.js` + `ascii-engine.bundle.js`)
  const tEngineStart = performance.now();
  const [adapterRes, bundleRes] = await Promise.all([
    fetch(`${baseUrl}/assets/js/engine-adapter.js`),
    fetch(`${baseUrl}/assets/js/ascii-engine.bundle.js`)
  ]);
  if (!adapterRes.ok || !bundleRes.ok) {
    throw new Error('Failed to fetch engine-adapter.js or ascii-engine.bundle.js');
  }
  const [adapterBuf, bundleBuf] = await Promise.all([
    adapterRes.arrayBuffer(),
    bundleRes.arrayBuffer()
  ]);
  const engineBytes = adapterBuf.byteLength + bundleBuf.byteLength;
  const deferredEngineMs = performance.now() - tEngineStart;

  // Stage 3: Self-hosted Draco WASM fetch + 4-Worker Pool initialization
  const tDracoStart = performance.now();
  const [wrapperRes, wasmRes] = await Promise.all([
    fetch(`${baseUrl}/assets/draco/draco_wasm_wrapper.js`),
    fetch(`${baseUrl}/assets/draco/draco_decoder.wasm`)
  ]);
  if (!wrapperRes.ok || !wasmRes.ok) {
    throw new Error('Failed to fetch self-hosted Draco decoder files');
  }
  const wasmContentType = wasmRes.headers.get('content-type') || '';
  const [wrapperCode, wasmAb] = await Promise.all([
    wrapperRes.text(),
    wasmRes.arrayBuffer()
  ]);
  const dracoBytes = Buffer.byteLength(wrapperCode, 'utf8') + wasmAb.byteLength;
  const pool = await createDracoWorkerPool(wrapperCode, wasmAb, workerLimit);
  const dracoInitMs = performance.now() - tDracoStart;

  try {
    // Stage 4: Download `assets/models/cena_completa.glb`
    const tGlbFetchStart = performance.now();
    const glbRes = await fetch(`${baseUrl}/assets/models/cena_completa.glb`);
    if (!glbRes.ok) throw new Error(`GET /assets/models/cena_completa.glb failed (${glbRes.status})`);
    const glbContentType = glbRes.headers.get('content-type') || '';
    const glbAb = await glbRes.arrayBuffer();
    const glbDownloadMs = performance.now() - tGlbFetchStart;

    // Stage 5: Parse GLB + Parallel 4-Worker WASM Draco Decompression of all 154 primitives
    const tDecompressStart = performance.now();
    const parsed = parseGlbBuffer(glbAb);
    const decodedResults = await Promise.all(
      parsed.dracoPrimitives.map((prim) => pool.decodePrimitive(prim.slice, prim.attributes))
    );
    const dracoDecompressParallelMs = performance.now() - tDecompressStart;
    const totalSiteWithSceneMs = performance.now() - tStart;

    let totalVertices = 0;
    let totalFaces = 0;
    let totalDecodedGeometryBytes = 0;
    for (const r of decodedResults) {
      totalVertices += r.numPoints;
      totalFaces += r.numFaces;
      totalDecodedGeometryBytes += r.decodedBytes;
    }

    return {
      criticalSiteMs,
      deferredEngineMs,
      dracoInitMs,
      glbDownloadMs,
      dracoDecompressParallelMs,
      totalSiteWithSceneMs,
      criticalBytes,
      engineBytes,
      dracoBytes,
      glbBytes: glbAb.byteLength,
      totalTransferredBytes: criticalBytes + engineBytes + dracoBytes + glbAb.byteLength,
      totalDecodedGeometryBytes,
      dracoPrimitiveCount: parsed.dracoPrimitives.length,
      webpImageCount: parsed.webpImageCount,
      totalVertices,
      totalFaces,
      nodeNames: parsed.nodeNames,
      animationNames: parsed.animationNames,
      wasmContentType,
      glbContentType,
      wrapperCode,
      wasmAb,
      dracoPrimitives: parsed.dracoPrimitives
    };
  } finally {
    await pool.dispose();
  }
}

function estimateNetworkMs(totalBytes, bandwidthMbps, rttMs) {
  const bits = totalBytes * 8;
  const transferMs = (bits / (bandwidthMbps * 1_000_000)) * 1000;
  return Number((transferMs + rttMs * 3).toFixed(1));
}

async function runSiteLoadBenchmark(options = {}) {
  const iterations = Math.max(
    1,
    Number.parseInt(String(options.iterations ?? process.env.BENCH_ITERATIONS ?? DEFAULT_ITERATIONS), 10) ||
      DEFAULT_ITERATIONS
  );
  const workerLimit = Math.max(1, Number(options.workerLimit || DEFAULT_WORKER_LIMIT));

  const server = await startPortfolioServer();
  try {
    // 1 warmup pass to prime OS file cache & JIT (mirrors browser warm HTTP/WASM cache behavior).
    const warmup = await runSingleIteration(server.baseUrl, workerLimit);
    const singleThreadMs = await decodeSingleThreadReference(
      warmup.wrapperCode,
      warmup.wasmAb,
      warmup.dracoPrimitives
    );

    const samples = [];
    for (let i = 0; i < iterations; i += 1) {
      const sample = await runSingleIteration(server.baseUrl, workerLimit);
      // Drop large raw references after measurement.
      delete sample.wrapperCode;
      delete sample.wasmAb;
      delete sample.dracoPrimitives;
      samples.push(sample);
    }

    const last = samples[samples.length - 1];
    const stats = {
      criticalSiteMs: computeStats(samples.map((s) => s.criticalSiteMs)),
      deferredEngineMs: computeStats(samples.map((s) => s.deferredEngineMs)),
      dracoInitMs: computeStats(samples.map((s) => s.dracoInitMs)),
      glbDownloadMs: computeStats(samples.map((s) => s.glbDownloadMs)),
      dracoDecompressParallelMs: computeStats(samples.map((s) => s.dracoDecompressParallelMs)),
      totalSiteWithSceneMs: computeStats(samples.map((s) => s.totalSiteWithSceneMs))
    };

    const singleThreadDecodeMs = Number(singleThreadMs.toFixed(2));
    const parallelSpeedup = Number(
      (singleThreadDecodeMs / Math.max(stats.dracoDecompressParallelMs.avg, 0.01)).toFixed(2)
    );
    const glbMiB = Number((last.glbBytes / (1024 * 1024)).toFixed(2));
    const totalPayloadMiB = Number((last.totalTransferredBytes / (1024 * 1024)).toFixed(2));
    const decodedGeomMiB = Number((last.totalDecodedGeometryBytes / (1024 * 1024)).toFixed(2));
    const decompressThroughputMiBps = Number(
      (decodedGeomMiB / Math.max(stats.dracoDecompressParallelMs.avg / 1000, 1e-6)).toFixed(2)
    );

    const cpuComputeAvgMs = Number(
      (stats.dracoInitMs.avg + stats.dracoDecompressParallelMs.avg).toFixed(2)
    );
    const legacyTotalBytes =
      last.criticalBytes + last.engineBytes + LEGACY_UNCOMPRESSED_GLB_BYTES;

    const profiles = {
      fiber100Mbps: {
        compressedTotalMs: Number(
          (estimateNetworkMs(last.totalTransferredBytes, 100, 18) + cpuComputeAvgMs).toFixed(1)
        ),
        uncompressedLegacyMs: Number(
          (estimateNetworkMs(legacyTotalBytes, 100, 18) + 85).toFixed(1)
        )
      },
      mobile25Mbps: {
        compressedTotalMs: Number(
          (estimateNetworkMs(last.totalTransferredBytes, 25, 45) + cpuComputeAvgMs).toFixed(1)
        ),
        uncompressedLegacyMs: Number(
          (estimateNetworkMs(legacyTotalBytes, 25, 45) + 85).toFixed(1)
        )
      }
    };

    return {
      iterations,
      workerLimit,
      payload: {
        criticalKiB: Number((last.criticalBytes / 1024).toFixed(1)),
        engineKiB: Number((last.engineBytes / 1024).toFixed(1)),
        dracoDecoderKiB: Number((last.dracoBytes / 1024).toFixed(1)),
        glbBytes: last.glbBytes,
        glbMiB,
        totalPayloadMiB,
        decodedGeomMiB
      },
      scene: {
        dracoPrimitives: last.dracoPrimitiveCount,
        webpImages: last.webpImageCount,
        vertices: last.totalVertices,
        triangles: last.totalFaces,
        preservedNodes: ['Cidade_Sketchfab_model', 'Player_Rig', 'Carro_Grupo'].filter((n) =>
          last.nodeNames.has(n)
        ),
        animations: last.animationNames,
        wasmContentType: last.wasmContentType,
        glbContentType: last.glbContentType
      },
      stats,
      singleThreadDecodeMs,
      parallelSpeedup,
      decompressThroughputMiBps,
      profiles
    };
  } finally {
    await server.stop();
  }
}

function formatBenchmarkNotification(report) {
  const { stats, payload, scene, profiles } = report;
  const fiberSavedSec = (
    (profiles.fiber100Mbps.uncompressedLegacyMs - profiles.fiber100Mbps.compressedTotalMs) /
    1000
  ).toFixed(2);
  const mobileSavedSec = (
    (profiles.mobile25Mbps.uncompressedLegacyMs - profiles.mobile25Mbps.compressedTotalMs) /
    1000
  ).toFixed(2);

  return [
    '╔══════════════════════════════════════════════════════════════════════════════╗',
    '║   BENCHMARK — CARREGAMENTO DO SITE + DESCOMPRESSÃO DO CENÁRIO 3D (DRACO)    ║',
    '╠══════════════════════════════════════════════════════════════════════════════╣',
    `║ Iterações medidas : ${String(report.iterations).padEnd(4)} │ Pool WebAssembly : ${report.workerLimit} Workers (padrão DRACOLoader)   ║`,
    `║ Cenário .glb      : ${payload.glbMiB} MiB (${scene.dracoPrimitives} malhas Draco · ${scene.webpImages} texturas WebP · ${scene.vertices.toLocaleString('en-US')} vértices) ║`,
    '╠══════════════════════════════════════════════════════════════════════════════╣',
    `║ 1. Site crítico (HTML+CSS+JS+WOFF2, ${(payload.criticalKiB / 1024).toFixed(2)} MiB) : média ${String(stats.criticalSiteMs.avg + ' ms').padEnd(10)} (p50 ${stats.criticalSiteMs.p50} ms) ║`,
    `║ 2. Bundle motor ASCII diferido (${payload.engineKiB} KiB)      : média ${String(stats.deferredEngineMs.avg + ' ms').padEnd(10)} (p50 ${stats.deferredEngineMs.p50} ms) ║`,
    `║ 3. Init decoder Draco WASM (${payload.dracoDecoderKiB} KiB, 4 Wkr)   : média ${String(stats.dracoInitMs.avg + ' ms').padEnd(10)} (p50 ${stats.dracoInitMs.p50} ms) ║`,
    `║ 4. Download HTTP local cena_completa.glb        : média ${String(stats.glbDownloadMs.avg + ' ms').padEnd(10)} (p50 ${stats.glbDownloadMs.p50} ms) ║`,
    `║ 5. Descompressão Draco WASM (4 Workers)         : média ${String(stats.dracoDecompressParallelMs.avg + ' ms').padEnd(10)} (p50 ${stats.dracoDecompressParallelMs.p50} ms) ║`,
    `║    └─ Referência 1 thread: ${report.singleThreadDecodeMs} ms (${report.parallelSpeedup}x speedup · ${report.decompressThroughputMiBps} MiB/s geom)         ║`,
    '╠══════════════════════════════════════════════════════════════════════════════╣',
    `║ ▶ MÉDIA TOTAL (Site + Descompressão, Local/Edge): ${stats.totalSiteWithSceneMs.avg} ms (min ${stats.totalSiteWithSceneMs.min} / max ${stats.totalSiteWithSceneMs.max} ms) ║`,
    `║ ▶ Estimativa Fibra 100 Mbps (Site + Decompress) : ${(profiles.fiber100Mbps.compressedTotalMs / 1000).toFixed(2)} s  (antes s/ compressão: ${(profiles.fiber100Mbps.uncompressedLegacyMs / 1000).toFixed(2)} s -> -${fiberSavedSec} s) ║`,
    `║ ▶ Estimativa 4G/5G  25 Mbps (Site + Decompress) : ${(profiles.mobile25Mbps.compressedTotalMs / 1000).toFixed(2)} s  (antes s/ compressão: ${(profiles.mobile25Mbps.uncompressedLegacyMs / 1000).toFixed(2)} s -> -${mobileSavedSec} s) ║`,
    '╚══════════════════════════════════════════════════════════════════════════════╝'
  ].join('\n');
}

function writeGithubSummary(report) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;
  const { stats, payload, profiles } = report;
  const md = [
    '### Benchmark — Carregamento do Site + Descompressão Draco WASM (`cena_completa.glb`)',
    '',
    '| Etapa | Payload | Média (`ms`) | Mediana `p50` (`ms`) | Min–Max (`ms`) |',
    '|---|---:|---:|---:|---:|',
    `| 1. Site crítico (\`index.html\` + CSS + JS + fonte + retrato) | \`${payload.criticalKiB} KiB\` | **${stats.criticalSiteMs.avg}** | ${stats.criticalSiteMs.p50} | ${stats.criticalSiteMs.min}–${stats.criticalSiteMs.max} |`,
    `| 2. Motor ASCII 3D diferido (\`engine-adapter\` + \`bundle\`) | \`${payload.engineKiB} KiB\` | **${stats.deferredEngineMs.avg}** | ${stats.deferredEngineMs.p50} | ${stats.deferredEngineMs.min}–${stats.deferredEngineMs.max} |`,
    `| 3. Init Decoder Draco WASM (\`./assets/draco/\`, ${report.workerLimit} Workers) | \`${payload.dracoDecoderKiB} KiB\` | **${stats.dracoInitMs.avg}** | ${stats.dracoInitMs.p50} | ${stats.dracoInitMs.min}–${stats.dracoInitMs.max} |`,
    `| 4. Download HTTP \`cena_completa.glb\` | \`${payload.glbMiB} MiB\` | **${stats.glbDownloadMs.avg}** | ${stats.glbDownloadMs.p50} | ${stats.glbDownloadMs.min}–${stats.glbDownloadMs.max} |`,
    `| 5. Descompressão Draco WASM (${report.workerLimit} Workers paralelos) | \`${payload.decodedGeomMiB} MiB\` geom | **${stats.dracoDecompressParallelMs.avg}** | ${stats.dracoDecompressParallelMs.p50} | ${stats.dracoDecompressParallelMs.min}–${stats.dracoDecompressParallelMs.max} |`,
    `| **Total Ponta a Ponta (Local / Edge Cache)** | \`${payload.totalPayloadMiB} MiB\` | **${stats.totalSiteWithSceneMs.avg} ms** | **${stats.totalSiteWithSceneMs.p50} ms** | ${stats.totalSiteWithSceneMs.min}–${stats.totalSiteWithSceneMs.max} |`,
    '',
    `- **Speedup paralelo (${report.workerLimit} Workers vs 1 thread)**: \`${report.parallelSpeedup}x\` (\`${stats.dracoDecompressParallelMs.avg} ms\` vs \`${report.singleThreadDecodeMs} ms\`, throughput \`${report.decompressThroughputMiBps} MiB/s\`).`,
    `- **Projeção Fibra 100 Mbps**: **${(profiles.fiber100Mbps.compressedTotalMs / 1000).toFixed(2)} s** *(vs ${(profiles.fiber100Mbps.uncompressedLegacyMs / 1000).toFixed(2)} s com os 81.02 MiB sem compressão)*.`,
    `- **Projeção 4G/5G 25 Mbps**: **${(profiles.mobile25Mbps.compressedTotalMs / 1000).toFixed(2)} s** *(vs ${(profiles.mobile25Mbps.uncompressedLegacyMs / 1000).toFixed(2)} s sem compressão)*.`
  ];
  try {
    appendFileSync(summaryPath, `${md.join('\n')}\n`, 'utf8');
  } catch (_) {
    // Ignore outside GitHub Actions.
  }
}

async function main(argv = process.argv.slice(2)) {
  const jsonOnly = argv.includes('--json');
  const iterArg = argv.find((a) => a.startsWith('--iterations='));
  const iterations = iterArg ? Number.parseInt(iterArg.split('=')[1], 10) : DEFAULT_ITERATIONS;
  const report = await runSiteLoadBenchmark({ iterations });
  writeGithubSummary(report);
  if (jsonOnly) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatBenchmarkNotification(report));
  }
  return report;
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[benchmark-site-load] ERROR:', err && err.stack ? err.stack : err);
    process.exitCode = 1;
  });
}

module.exports = {
  runSiteLoadBenchmark,
  formatBenchmarkNotification,
  writeGithubSummary
};
