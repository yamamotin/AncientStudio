'use strict';

const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { Worker: NodeThreadWorker } = require('node:worker_threads');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const adapter = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');
const core = readFileSync(path.join(root, 'ascii-engine-module/src/index.ts'), 'utf8');
const engineCore = readFileSync(
  path.join(root, 'ascii-engine-module/src/core/AsciiEngineCore.ts'),
  'utf8'
);

function createBundleSandbox(overrides = {}) {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  assert.ok(existsSync(bundlePath), 'Built portfolio bundle assets/js/ascii-engine.bundle.js must exist');

  let nowMs = 1000;
  let nextBlobId = 1;
  const blobRegistry = new Map();

  class MockHTMLElement {}

  class MockImage {
    constructor() {
      this.width = 1;
      this.height = 1;
      this.onload = null;
      this.onerror = null;
    }
    set src(_value) {
      Promise.resolve().then(() => {
        if (typeof this.onload === 'function') this.onload();
      });
    }
  }

  class SandboxRequest {
    constructor(input, init) {
      this.url = typeof input === 'string' ? input : input.url;
      this.init = init || {};
    }
  }

  class SandboxWebWorker {
    constructor(scriptUrl) {
      const source = blobRegistry.get(scriptUrl);
      if (!source || typeof source.code !== 'string') {
        throw new Error(`Unknown Worker Blob URL: ${scriptUrl}`);
      }
      const bootstrap = `
        const { parentPort } = require('node:worker_threads');
        globalThis.self = globalThis;
        globalThis.postMessage = (data, transfer) => parentPort.postMessage(data, transfer || []);
        parentPort.on('message', (data) => {
          if (typeof globalThis.onmessage === 'function') {
            globalThis.onmessage({ data });
          }
        });
        ${source.code}
      `;
      this.onmessage = null;
      this.onerror = null;
      this._thread = new NodeThreadWorker(bootstrap, { eval: true });
      this._thread.unref();
      this._thread.on('message', (data) => {
        if (typeof this.onmessage === 'function') {
          this.onmessage({ data });
        }
      });
      this._thread.on('error', (error) => {
        if (typeof this.onerror === 'function') {
          this.onerror(error);
        }
      });
    }
    postMessage(data, transfer) {
      this._thread.postMessage(data, transfer || []);
    }
    terminate() {
      return this._thread.terminate();
    }
  }

  const SandboxURL = Object.assign(
    function SandboxURL(input, base) {
      return new URL(input, base);
    },
    {
      createObjectURL(blob) {
        const id = `blob:node-${nextBlobId++}`;
        blobRegistry.set(id, {
          blob,
          code: Array.isArray(blob && blob.__parts) ? blob.__parts.join('') : ''
        });
        return id;
      },
      revokeObjectURL(id) {
        blobRegistry.delete(id);
      }
    }
  );

  class SandboxBlob extends Blob {
    constructor(parts = [], options = {}) {
      super(parts, options);
      this.__parts = parts;
    }
  }

  async function sandboxFetch(input) {
    const rawUrl = typeof input === 'string' ? input : input.url;
    if (String(rawUrl).startsWith('blob:')) {
      const entry = blobRegistry.get(rawUrl);
      if (!entry) return new Response(null, { status: 404 });
      return new Response(await entry.blob.arrayBuffer(), { status: 200 });
    }
    const cleanRel = String(rawUrl).replace(/^(\.\/|\/)+/, '');
    const resolved = path.resolve(root, cleanRel);
    if (!resolved.startsWith(root) || !existsSync(resolved)) {
      return new Response(null, { status: 404 });
    }
    return new Response(readFileSync(resolved), { status: 200 });
  }

  const sandbox = Object.assign(
    {
      window: {},
      self: {},
      WebAssembly,
      ArrayBuffer,
      Int8Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
      DataView,
      TextDecoder,
      TextEncoder,
      Blob: SandboxBlob,
      Headers,
      Request: SandboxRequest,
      Response,
      fetch: sandboxFetch,
      Worker: SandboxWebWorker,
      Image: MockImage,
      URL: SandboxURL,
      Date: { now: () => nowMs },
      HTMLElement: MockHTMLElement,
      document: {
        createElement: () => ({ style: {}, getContext: () => null, addEventListener() {}, removeEventListener() {} }),
        createElementNS: () => ({ style: {}, addEventListener() {}, removeEventListener() {} })
      },
      navigator: { userAgent: 'node' },
      performance: { now: () => nowMs },
      setTimeout,
      clearTimeout,
      __advanceClock(ms) {
        nowMs += ms;
      }
    },
    overrides
  );
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);
  return sandbox;
}

test('page CSP supports self-hosted Draco workers, WASM and embedded GLB textures', () => {
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  const policy = html.match(/Content-Security-Policy" content="([^"]+)"/)[1];
  const directive = name => policy.split(';').map(s => s.trim()).find(s => s.startsWith(name + ' '));
  assert.match(directive('script-src'), /'wasm-unsafe-eval'/);
  assert.doesNotMatch(directive('script-src'), /'unsafe-eval'/);
  assert.match(directive('worker-src'), /blob:/);
  assert.match(directive('img-src'), /blob:/);
  assert.match(directive('connect-src'), /blob:/);
  assert.doesNotMatch(directive('script-src'), /https?:|\*/);
});

test('depth classification preserves distant geometry while keeping the cleared sky empty', () => {
  const shader = readFileSync(path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'), 'utf8');
  assert.match(shader, /1\.0 - step\(0\.9999999, foregroundDepth\)/);
  const near = 0.15, far = 160;
  const rawDepth = distance => far / (far - near) - far * near / ((far - near) * distance);
  assert.ok(rawDepth(120) > 0.9994, 'old threshold rejected distant architecture');
  assert.ok(rawDepth(120) < 0.9999999, 'new threshold retains it');
  assert.ok(1 >= 0.9999999, 'cleared depth remains empty sky');
});

test('engine core keeps its public facade intact', () => {
  includesAll(core, [
    'export { AsciiEngineCore as AsciiSceneEngine',
    'GlbSceneLoader',
    'UrbanGlbSceneBuilder',
    'MascotStageBuilder',
    'TuxEntityFactory'
  ]);
  includesAll(engineCore, [
    'mount()',
    'pause()',
    'resume()',
    'updateConfig(',
    'setAutoOrbit(',
    'getScene()',
    'destroy()'
  ]);
});

test('adapter uses the real facade, relative GLB + Draco paths, and preserves scroll-friendly pointer input', () => {
  includesAll(adapter, [
    'AsciiSceneEngine',
    "'./assets/models/cena_completa.glb'",
    "'./assets/draco/'",
    'ResizeObserver',
    'requestAnimationFrame'
  ]);
  assert.match(adapter, /setAutoOrbit[\s\S]*state\.instance\.setAutoOrbit/);
  assert.doesNotMatch(adapter, /new PointerEvent\(/);
  assert.doesNotMatch(adapter, /https?:\/\//i, 'adapter contains zero external CDN URLs');
});

test('adapter exposes the integration surface requested by the UI', () => {
  includesAll(adapter, ['create', 'mount', 'setPaused', 'setPreset', 'setAutoOrbit', 'destroy']);
});

test('engine uses passive pointer listeners (no scroll blocking)', () => {
  assert.match(engineCore, /addEventListener\('pointermove',[\s\S]{0,200}\{\s*passive:\s*true,?\s*\}/);
  const pointerInput = readFileSync(
    path.join(root, 'ascii-engine-module/src/input/PointerInput.ts'),
    'utf8'
  );
  includesAll(pointerInput, ['pointerdown', 'pointermove', 'pointerup', 'touchstart', 'touchmove', '{ passive: true }']);
});

test('playground exposes exactly three scene modes and removes legacy procedural cyberpunk builders', () => {
  includesAll(adapter, [
    "DEFAULT_MODE = 'night'",
    "SCENE_MODES = ['day', 'night', 'rain']",
    "mode !== 'rain'",
    'atmosphere: atmosphere',
    'blockBlendWeight: preset.blockBlendWeight',
    'windStrength: preset.windStrength',
    'blockBlendWeight: 0.0',
    'cellSize: 8'
  ]);
  assert.doesNotMatch(adapter, /sanctuary|dawn|storm|emerald|setCycle|syncPalette|cyberpunk-citadel/);

  const removedProceduralFiles = [
    'ascii-engine-module/src/world/PlaygroundSceneBuilder.ts',
    'ascii-engine-module/src/entities/PlaygroundEntityFactory.ts',
    'ascii-engine-module/src/world/MapLoader.ts',
    'ascii-engine-module/src/world/SceneComposerKit.ts',
    'ascii-engine-module/src/shaders/waterShader.ts',
    'ascii-engine-module/src/ecs/EntityBlueprint.ts',
    'ascii-engine-module/src/scene/noise.ts'
  ];
  for (const rel of removedProceduralFiles) {
    assert.equal(existsSync(path.join(root, rel)), false, `Legacy procedural file must be removed: ${rel}`);
  }
});

test('self-hosted Draco decoders and cena_completa.glb exist locally with zero external CDN usage', () => {
  const requiredAssets = [
    'assets/models/cena_completa.glb',
    'assets/draco/draco_decoder.js',
    'assets/draco/draco_decoder.wasm',
    'assets/draco/draco_wasm_wrapper.js'
  ];
  for (const rel of requiredAssets) {
    assert.ok(existsSync(path.join(root, rel)), `Missing required local 3D asset/decoder: ${rel}`);
  }

  const requiredModules = [
    'ascii-engine-module/src/core/EngineLoop.ts',
    'ascii-engine-module/src/core/LifecycleManager.ts',
    'ascii-engine-module/src/core/ResolutionController.ts',
    'ascii-engine-module/src/ecs/World.ts',
    'ascii-engine-module/src/ecs/SystemRunner.ts',
    'ascii-engine-module/src/world/GlbSceneLoader.ts',
    'ascii-engine-module/src/world/UrbanGlbSceneBuilder.ts',
    'ascii-engine-module/src/world/MascotStageBuilder.ts',
    'ascii-engine-module/src/entities/TuxEntityFactory.ts',
    'ascii-engine-module/src/animation/AnimationSystem.ts',
    'ascii-engine-module/src/vfx/VfxController.ts',
    'ascii-engine-module/src/input/PointerInput.ts',
    'ascii-engine-module/src/input/KeyboardInput.ts'
  ];
  for (const rel of requiredModules) {
    assert.ok(existsSync(path.join(root, rel)), `Missing engine module: ${rel}`);
  }

  const loaderSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/world/GlbSceneLoader.ts'),
    'utf8'
  );
  assert.doesNotMatch(loaderSrc, /gstatic\.com|unpkg\.com|jsdelivr\.net/i);

  const sandbox = createBundleSandbox();
  const pkg = sandbox.ASCIIRealms;
  assert.equal(pkg.DEFAULT_SCENE_MODEL_URL, './assets/models/cena_completa.glb');
  assert.equal(pkg.DEFAULT_DRACO_DECODER_PATH, './assets/draco/');
  assert.equal(pkg.normalizeRelativeDecoderPath('./assets/draco'), './assets/draco/');
  assert.throws(
    () => pkg.normalizeRelativeDecoderPath('https://www.gstatic.com/draco/v1/decoders/'),
    /External CDN URLs are forbidden/
  );
  assert.throws(
    () => pkg.normalizeRelativeModelUrl('https://cdn.example.com/cena_completa.glb'),
    /External CDN URLs are forbidden/
  );
});

test('neofetch fallback is static ASCII art and Tux 3D mascot stage stays intact and pointer-free', () => {
  const neofetch = readFileSync(path.join(root, 'assets/js/neofetch.js'), 'utf8');
  const cssSrc = readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');
  const mascotBuilderSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/world/MascotStageBuilder.ts'),
    'utf8'
  );

  includesAll(neofetch, [
    'STATIC_PENGUIN',
    'renderStaticPenguinArt',
    'renderFallback',
    'tp:scene-mode',
    'penguin-stage'
  ]);
  assert.doesNotMatch(neofetch, /AUTO_SPIN_RAD_PER_SEC|state\.yaw \+=|requestAnimationFrame|renderPenguinAscii/);
  assert.doesNotMatch(neofetch, /pointermove|pointerdown|updateFromClientPoint/);

  includesAll(adapter, [
    'TuxMascotRoot',
    'TuxAutoSpin',
    'data-pointer-locked',
    'data-auto-spin',
    'getScene',
    "background: '#13222E'",
    "coolAmbient: '#1D2B36'",
    'blockBlendWeight: 0.0',
    'enableShadows: true'
  ]);
  includesAll(cssSrc, ['#13222E', '#1D2B36', 'pointer-events: none']);
  includesAll(mascotBuilderSrc, ['sampleSoftKeyShadow', 'reflect(', 'uSubjectYaw', 'uReflectBellyColor', 'uReflectAmberColor']);

  const sandbox = createBundleSandbox();
  const pkg = sandbox.ASCIIRealms;
  assert.equal(pkg.MASCOT_BACKDROP_HEX, '#13222E');
  assert.equal(pkg.MASCOT_FLOOR_HEX, '#1D2B36');

  const mascotConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, {
    mode: 'mascot',
    fov: 38,
    enableShadows: true
  });
  const stage = pkg.MascotStageBuilder.build(mascotConfig);
  const ecs = new pkg.World();
  const { entityId, rootGroup: tuxRoot } = pkg.TuxEntityFactory.spawn(ecs, stage.scene, {
    position: [0, 0.04, 0],
    scale: 1.02,
    includeShowcaseRig: false,
    bobAmplitude: 0.018
  });

  assert.equal(ecs.getEntityCount(), 1);
  assert.ok(stage.backdropMesh && stage.floorMesh);
  const torsoMesh = tuxRoot.getObjectByName('TuxTorso');
  assert.ok(torsoMesh && torsoMesh.material.vertexColors === true);

  const runner = new pkg.SystemRunner()
    .addSystem(new pkg.MovementRotationSystem(), 20)
    .addSystem(new pkg.AnimationSystem(), 30)
    .addSystem(new pkg.RenderSyncSystem(), 40);
  runner.run(ecs, { dt: 0.05, elapsed: 0.5 });
  assert.equal(tuxRoot.position.y, ecs.getComponent(entityId, 'Transform').y);

  ecs.clear(true);
  pkg.LifecycleManager.disposeObject3D(stage.scene);
  assert.equal(stage.scene.children.length, 0);
});

test('cena_completa.glb loads end-to-end into ECS: Cidade_Sketchfab_model, Player_Rig (WASD + NLA Idle/Walking/Casting + clamp), CameraFollow, Carro_Grupo 30s light cycle, and presets', async () => {
  const sandbox = createBundleSandbox();
  const pkg = sandbox.ASCIIRealms;
  const THREE = pkg.THREE;

  // Stub Three.js ImageLoader inside Node VM so GLTFLoader decodes all 186 meshes, skeletons, materials & NLA clips
  THREE.ImageLoader.prototype.load = function (_url, onLoad) {
    const img = { width: 2, height: 2, data: new Uint8Array(16) };
    if (onLoad) onLoad(img);
    return img;
  };

  const rawGlb = readFileSync(path.join(root, 'assets/models/cena_completa.glb'));
  const gltfJson = JSON.parse(rawGlb.subarray(20, 20 + rawGlb.readUInt32LE(12)).toString('utf8'));
  const girlNode = gltfJson.nodes.find(n => n.name === 'FuturisticGirl');
  const girlPrimitive = gltfJson.meshes[girlNode.mesh].primitives[0];
  assert.equal(girlPrimitive.material, undefined, 'Character primitive in the source GLB has no material or assigned texture');
  assert.ok(girlPrimitive.attributes.TEXCOORD_0 !== undefined, 'Character UV coordinates exist');
  const glbBuffer = rawGlb.buffer.slice(rawGlb.byteOffset, rawGlb.byteOffset + rawGlb.byteLength);

  const loader = new pkg.GlbSceneLoader();
  const prepared = await loader.parseBuffer(glbBuffer, '');

  // 1. Verify all 3 embedded root nodes & invisible helper sanitization
  assert.equal(prepared.nodes.cidade.name, 'Cidade_Sketchfab_model');
  assert.equal(prepared.nodes.playerRig.name, 'Player_Rig');
  assert.equal(prepared.nodes.carroGrupo.name, 'Carro_Grupo');
  assert.ok(prepared.clips.Idle && prepared.clips.Walking && prepared.clips.Casting, 'All 3 NLA clips extracted');

  const helperBox = prepared.nodes.cidade.getObjectByName('Cidade_Object_331');
  assert.ok(helperBox && helperBox.visible === false, 'Invisible exporter bounding box hidden cleanly');

  // Verify material legibility fixes: Player_Rig & Carro_Grupo diffuse restoration + alpha-card normal-pass exclusion
  assert.ok(
    prepared.materials.character.length >= 1 &&
      prepared.materials.character.every((m) => m.metalness <= 0.25),
    'Player_Rig unassigned glTF metalness=1 material replaced with sculpted readable albedo'
  );
  assert.ok(
    prepared.materials.carBody.length >= 1 &&
      prepared.materials.carBody.every((m) => m.metalness <= 0.35),
    'Carro_Grupo baked metalness=1 palette materials tuned for crisp coupe silhouette'
  );
  let skipNormalCount = 0;
  prepared.nodes.cidade.traverse((obj) => {
    if (obj.userData && obj.userData.skipNormalPass === true) skipNormalCount += 1;
  });
  assert.ok(skipNormalCount >= 35, `Alpha-blended billboard decals excluded from normal pass (${skipNormalCount})`);

  // Verify embedded + procedural normal maps cover roads, sidewalks, facades, Player_Rig, and Carro_Grupo
  for (const groupName of ['roads', 'sidewalks', 'walls', 'character', 'carBody']) {
    const mats = prepared.materials[groupName];
    assert.ok(mats.length >= 1, `Material group "${groupName}" populated`);
    assert.ok(
      mats.every((m) => Boolean(m.normalMap && m.normalMap.isTexture)),
      `Every "${groupName}" material carries an embedded or procedural normalMap`
    );
  }

  // Verify Hips horizontal root offset normalization across Idle, Walking, and Casting
  const walkHips = prepared.clips.Walking.tracks.find((t) => /hips\.position$/i.test(t.name));
  const castHips = prepared.clips.Casting.tracks.find((t) => /hips\.position$/i.test(t.name));
  assert.ok(Math.hypot(walkHips.values[0], walkHips.values[1]) < 0.1, 'Walking Hips aligned to Player_Rig foot pivot');
  assert.ok(Math.hypot(castHips.values[0], castHips.values[1]) < 0.1, 'Casting Hips aligned to Player_Rig foot pivot');

  // 2. Attach prepared GLB assets into ECS World & UrbanGlbSceneBuilder
  const ecsWorld = new pkg.World();
  const nightConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, { atmosphere: 'night' });
  const stage = pkg.UrbanGlbSceneBuilder.createStage(nightConfig, ecsWorld, prepared);

  assert.equal(ecsWorld.getEntityCount(), 3, 'Maps Cidade_Sketchfab_model, Player_Rig, and Carro_Grupo to 3 ECS entities');
  assert.ok(stage.cidadeEntityId && stage.playerEntityId && stage.carroEntityId);

  // Real decoded city bounds must fit at maximum zoom, including portrait viewports.
  const overview = ecsWorld.getComponent(stage.playerEntityId, 'CameraFollow').overviewBounds;
  assert.ok(overview && overview.max.x - overview.min.x > 50);
  assert.ok(overview.max.z >= pkg.URBAN_TRAFFIC_DEFAULTS.endZ);
  for (const aspect of [16 / 9, 1, 0.6]) {
    const viewWorld = new pkg.World();
    const id = viewWorld.createEntity();
    viewWorld.addComponent(id, 'Transform', { x: -3.8, y: 0.08635, z: -1.1, rotX: 0, rotY: 0, rotZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 });
    viewWorld.addComponent(id, 'CameraFollow', { ...pkg.URBAN_CAMERA_FOLLOW_DEFAULTS, overviewBounds: overview, autoOrbit: false, orbitAngle: 0, orbitSpeed: 0.42, initialized: false });
    const cam = new THREE.PerspectiveCamera(58, aspect, 0.15, 160);
    const followSystem = new pkg.CameraFollowSystem(cam);
    const input = new pkg.InputSystem(new pkg.PointerInput({ style: {} }), new pkg.KeyboardInput(), cam);
    followSystem.update(viewWorld, { dt: 0, elapsed: 0 });
    const follow = viewWorld.getComponent(id, 'CameraFollow');
    const nearDistance = follow.currentDistance;
    // Use the same input path as a wheel gesture, then allow camera damping to settle.
    for (let i = 0; i < 100; i++) {
      input.pointer.triggerWheel(180);
      input.update(viewWorld, { dt: 0.05, elapsed: i * 0.05 });
      followSystem.update(viewWorld, { dt: 0.05, elapsed: i * 0.05 });
    }
    assert.ok(follow.currentDistance > nearDistance * 2, `overview zooms out at aspect ${aspect}`);
    cam.updateMatrixWorld(true);
    for (let i = 0; i < 8; i++) {
      const point = new THREE.Vector3(i & 1 ? overview.max.x : overview.min.x, i & 2 ? overview.max.y : overview.min.y, i & 4 ? overview.max.z : overview.min.z).project(cam);
      assert.ok(Math.abs(point.x) <= 1 && Math.abs(point.y) <= 1 && point.z >= -1 && point.z <= 1,
        `city corner ${i} fits viewport at aspect ${aspect}: ${point.toArray()}`);
    }
    const maxDistance = follow.currentDistance;
    for (let i = 0; i < 100; i++) {
      input.pointer.triggerWheel(-180);
      input.update(viewWorld, { dt: 0.05, elapsed: i * 0.05 });
      followSystem.update(viewWorld, { dt: 0.05, elapsed: i * 0.05 });
    }
    assert.ok(follow.currentDistance < maxDistance * 0.5, 'wheel zoom reverses without per-frame reset');
  }

  // Set up Input + ECS Systems + PerspectiveCamera
  const mockListeners = {};
  const mockContainer = {
    style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 960, height: 540 }),
    addEventListener(type, fn, opts) {
      mockListeners[type] = { fn, opts };
    },
    removeEventListener(type) {
      delete mockListeners[type];
    }
  };
  const pointer = new pkg.PointerInput(mockContainer);
  pointer.attach();
  assert.equal(mockContainer.style.touchAction, 'pan-y');
  assert.equal(mockListeners.pointermove.opts.passive, true);

  const keyboard = new pkg.KeyboardInput({ enabled: true, focusTarget: mockContainer });
  const camera = new THREE.PerspectiveCamera(58, 16 / 9, 0.15, 160);

  const runner = new pkg.SystemRunner()
    .addSystem(new pkg.InputSystem(pointer, keyboard, camera), 10)
    .addSystem(new pkg.TrafficFlowSystem(), 15)
    .addSystem(new pkg.MovementRotationSystem(stage.waypointMarker), 20)
    .addSystem(new pkg.CharacterAnimationSystem(), 28)
    .addSystem(new pkg.AnimationSystem(), 30)
    .addSystem(new pkg.CameraFollowSystem(camera), 38)
    .addSystem(new pkg.LineOfSightOcclusionSystem(camera), 39)
    .addSystem(new pkg.RenderSyncSystem(), 40);

  // Initial frame at t = 0: Player_Rig in Idle, camera snapped to exact 45° CCW elevated pulled-back offset, Carro_Grupo active
  runner.run(ecsWorld, { dt: 0, elapsed: 0 });

  const playerTransform = ecsWorld.getComponent(stage.playerEntityId, 'Transform');
  const charAnim = ecsWorld.getComponent(stage.playerEntityId, 'CharacterAnimation');
  const camFollow = ecsWorld.getComponent(stage.playerEntityId, 'CameraFollow');
  const carRenderable = ecsWorld.getComponent(stage.carroEntityId, 'Renderable');
  const carTraffic = ecsWorld.getComponent(stage.carroEntityId, 'TrafficCycle');
  const fgOccluders = ecsWorld.getComponent(stage.cidadeEntityId, 'ForegroundOccluders');

  assert.equal(charAnim.activeClip, 'Idle', 'Player_Rig starts in looped Idle animation');
  assert.AlmostEqual = (a, b, eps = 1e-3) => assert.ok(Math.abs(a - b) <= eps, `Expected ${a} ≈ ${b}`);
  assert.AlmostEqual(camera.position.x, playerTransform.x + camFollow.offsetX);
  assert.AlmostEqual(camera.position.y, playerTransform.y + camFollow.offsetY);
  assert.AlmostEqual(camera.position.z, playerTransform.z + camFollow.offsetZ);

  // Verify exact 45° counter-clockwise camera rotation, top-to-ground tilt, pulled-back framing & cyber lights
  const camAzimuthDeg = (Math.atan2(camFollow.offsetX, camFollow.offsetZ) * 180) / Math.PI;
  const camDist3D = Math.hypot(camFollow.offsetX, camFollow.offsetY, camFollow.offsetZ);
  assert.AlmostEqual(camAzimuthDeg, 45.0, 0.5);
  assert.ok(camFollow.offsetY >= 11.0 && camDist3D >= 18.0, 'Camera is inclined top-to-ground and pulled back');
  assert.ok(
    stage.urbanLightRig &&
      stage.urbanLightRig.storefrontEastLight.intensity > 6 &&
      stage.urbanLightRig.storefrontWestLight.intensity > 6 &&
      stage.urbanLightRig.kioskWarmLight.intensity > 4 &&
      stage.urbanLightRig.streetLampWest.intensity > 9 &&
      stage.urbanLightRig.streetLampCenter.intensity > 8 &&
      stage.urbanLightRig.streetLampEast.intensity > 7 &&
      stage.urbanLightRig.avenueBeaconLight.intensity > 4,
    'Storefront facade lights, streetlamps, and cyber avenue beacon illuminate the nocturnal scene'
  );

  // Verify foreground obstacles (eastTree, westTree, frontSign) are identified and cleared from camera sightline
  assert.ok(fgOccluders && fgOccluders.groups.length === 3, 'Identifies eastTree, westTree, and frontSign occluders');
  const roles = Array.from(fgOccluders.groups.map((g) => String(g.role))).sort();
  assert.deepEqual(roles, ['eastTree', 'frontSign', 'westTree']);
  for (const grp of fgOccluders.groups) {
    assert.equal(grp.occluded, true, `${grp.role} is occluded at central spawn so center & Player_Rig stay clear`);
    assert.ok(grp.meshes.every((m) => m.visible === false), `${grp.role} obstructing meshes hidden cleanly`);
  }

  // Real Three.js raycast from camera to Player_Rig confirms 100% unobstructed line-of-sight
  stage.scene.updateMatrixWorld(true);
  const losRay = new THREE.Raycaster();
  const targetTorso = new THREE.Vector3(playerTransform.x, playerTransform.y + 1.05, playerTransform.z);
  const rayDir = targetTorso.clone().sub(camera.position);
  const rayLen = rayDir.length();
  losRay.set(camera.position, rayDir.normalize());
  losRay.far = rayLen - 0.2;
  const blockingHits = losRay
    .intersectObject(prepared.nodes.cidade, true)
    .filter((h) => h.object.visible);
  assert.equal(blockingHits.length, 0, 'Camera -> Player_Rig line of sight is 100% unobstructed');

  // 3. WASD Locomotion (`KeyW` + `KeyA`), smooth rotation, Walking cross-fade, and sidewalk clamping
  const startX = playerTransform.x;
  const startZ = playerTransform.z;
  keyboard.setKeyState('KeyW', true);
  keyboard.setKeyState('KeyA', true);

  for (let i = 1; i <= 10; i += 1) {
    runner.run(ecsWorld, { dt: 0.05, elapsed: i * 0.05 });
  }

  assert.equal(charAnim.activeClip, 'Walking', 'Pressing WASD cross-fades AnimationMixer to Walking');
  assert.ok(playerTransform.x < startX && playerTransform.z < startZ, 'Player_Rig moves diagonally along XZ with W+A');
  assert.ok(Math.abs(playerTransform.rotY) > 0.3, 'Player_Rig smoothly rotates toward WASD movement vector');

  // Verify fixed-direction 3rd-person camera smoothly lerps along with Player_Rig
  assert.ok(camera.position.x < startX + camFollow.offsetX, '3rd-person camera smoothly follows Player_Rig X');
  assert.ok(camera.position.z < startZ + camFollow.offsetZ, '3rd-person camera smoothly follows Player_Rig Z');

  // Drive hard into North wall (`KeyW` for 4 seconds) -> `THREE.MathUtils.clamp` keeps Player_Rig on sidewalk (`z >= -3.30`)
  keyboard.setKeyState('KeyA', false);
  for (let i = 1; i <= 80; i += 1) {
    runner.run(ecsWorld, { dt: 0.05, elapsed: 0.5 + i * 0.05 });
  }
  assert.ok(
    playerTransform.z >= pkg.DEFAULT_URBAN_SIDEWALK_BOUNDS.minZ - 1e-5,
    `Sidewalk clamp prevents crossing north building wall (z=${playerTransform.z})`
  );

  // Release WASD -> smoothly cross-fades back to Idle
  keyboard.setKeyState('KeyW', false);
  for (let i = 1; i <= 10; i += 1) {
    runner.run(ecsWorld, { dt: 0.05, elapsed: 4.5 + i * 0.05 });
  }
  assert.equal(charAnim.activeClip, 'Idle', 'Releasing WASD cross-fades AnimationMixer back to Idle');

  // 4. Interaction key `E` triggers `Casting` (`THREE.LoopOnce`) and returns to `Idle` on completion
  keyboard.setKeyState('KeyE', true);
  runner.run(ecsWorld, { dt: 0.05, elapsed: 5.1 });
  keyboard.setKeyState('KeyE', false);
  assert.equal(charAnim.activeClip, 'Casting', 'Pressing E triggers Casting NLA clip');
  assert.equal(charAnim.actions.Casting.loop, THREE.LoopOnce, 'Casting runs with THREE.LoopOnce');

  // Advance past Casting duration (1.47s) -> automatically returns to Idle
  for (let i = 1; i <= 35; i += 1) {
    runner.run(ecsWorld, { dt: 0.05, elapsed: 5.1 + i * 0.05 });
  }
  assert.equal(charAnim.activeClip, 'Idle', 'Casting returns smoothly to Idle after completion');

  // 5. Verify `setAutoOrbit` toggle on CameraFollow
  camFollow.autoOrbit = true;
  const fixedCamX = camera.position.x;
  for (let i = 1; i <= 12; i += 1) {
    runner.run(ecsWorld, { dt: 0.05, elapsed: 7.0 + i * 0.05 });
  }
  assert.notEqual(camera.position.x, fixedCamX, 'CameraFollowSystem gently orbits when setAutoOrbit(true) is active');
  camFollow.autoOrbit = false;

  // 6. Verify `Carro_Grupo` 30-second traffic cycle (8s moving with lights + 22s hidden)
  runner.run(ecsWorld, { dt: 0.016, elapsed: 1.0 });
  const zAt1s = ecsWorld.getComponent(stage.carroEntityId, 'Transform').z;
  assert.equal(carRenderable.object3D.visible, true, 'Carro_Grupo is visible during 0..8s window (t=1s)');
  assert.ok(carTraffic.headlightLeft.intensity > 0 && carTraffic.streetThrowLight.intensity > 0, 'Headlights illuminate avenue while moving');

  runner.run(ecsWorld, { dt: 0.016, elapsed: 5.0 });
  const zAt5s = ecsWorld.getComponent(stage.carroEntityId, 'Transform').z;
  assert.equal(carRenderable.object3D.visible, true, 'Carro_Grupo remains visible at t=5s');
  assert.ok(zAt5s > zAt1s, 'Carro_Grupo advances in a straight line along the left lateral avenue');
  assert.AlmostEqual(
    (zAt5s - zAt1s) / 4.0,
    (carTraffic.endZ - carTraffic.startZ) / 8.0,
    1e-2
  );

  // Hidden phase: 8s..30s (22 seconds hidden)
  for (const hiddenTime of [8.05, 15.0, 29.95]) {
    runner.run(ecsWorld, { dt: 0.016, elapsed: hiddenTime });
    assert.equal(
      carRenderable.object3D.visible,
      false,
      `Carro_Grupo must stay hidden (visible=false) during 22s pause (t=${hiddenTime}s)`
    );
    assert.equal(carTraffic.headlightLeft.intensity, 0, 'Headlights off while Carro_Grupo is hidden');
    assert.equal(carTraffic.streetThrowLight.intensity, 0);
    assert.equal(carTraffic.headlightEmitterGroup.visible, false, 'Headlight emitter meshes hidden while inactive');
    assert.equal(carTraffic.headlightLensMaterial.emissiveIntensity, 0, 'Headlight lens emissive zeroed while inactive');
    assert.equal(carTraffic.headlightHaloMaterial.opacity, 0, 'Headlight halo opacity zeroed while inactive');
    assert.equal(carTraffic.headlightRoadPoolMaterial.opacity, 0, 'Headlight road pool zeroed while inactive');
  }

  // Cycle restart at t = 30.5s: verify visible emitters + forward SpotLight targets on Carro_Grupo
  runner.run(ecsWorld, { dt: 0.016, elapsed: 30.5 });
  assert.equal(carRenderable.object3D.visible, true, 'Carro_Grupo reappears cleanly when 30s cycle restarts');
  assert.ok(carTraffic.headlightRight.intensity > 0, 'Headlights reactivate on cycle restart');
  assert.equal(carTraffic.headlightEmitterGroup.visible, true, 'Headlight emitter group visible on active pass');
  assert.ok(carTraffic.headlightLensMaterial.emissiveIntensity > 1.5, 'Headlight lenses emit bright HDR glow');
  assert.ok(carTraffic.headlightHaloMaterial.opacity > 0.2, 'Headlight optical halos active');
  assert.ok(carTraffic.headlightRoadPoolMaterial.opacity > 0.1, 'Headlight asphalt specular pool active');

  const lensLeft = carTraffic.headlightEmitterGroup.getObjectByName('HeadlightLensLeft');
  const lensRight = carTraffic.headlightEmitterGroup.getObjectByName('HeadlightLensRight');
  const haloLeft = carTraffic.headlightEmitterGroup.getObjectByName('HeadlightHaloLeft');
  const haloRight = carTraffic.headlightEmitterGroup.getObjectByName('HeadlightHaloRight');
  assert.ok(lensLeft && lensRight && haloLeft && haloRight, 'Both left & right front headlight lenses and halos exist');
  assert.ok(lensLeft.position.x < lensRight.position.x, 'Left and right front headlight emitters sit symmetrically on front fascia');
  assert.equal(lensLeft.userData.skipNormalPass, true, 'Headlight emitter meshes skip Pass 2 normal render');
  assert.equal(haloLeft.userData.skipNormalPass, true, 'Headlight halo meshes skip Pass 2 normal render');
  assert.equal(carTraffic.headlightLeft.target.parent, carRenderable.object3D, 'Left SpotLight target is parented to Carro_Grupo');
  assert.equal(carTraffic.headlightRight.target.parent, carRenderable.object3D, 'Right SpotLight target is parented to Carro_Grupo');
  assert.ok(
    carTraffic.headlightLeft.target.position.z > carTraffic.headlightLeft.position.z &&
      carTraffic.headlightLeft.target.position.y < carTraffic.headlightLeft.position.y,
    'Front SpotLights point forward (+Z) and downward onto the asphalt ahead of Carro_Grupo'
  );

  // 7. Verify UI Preset Integration (`day`, `night`, `rain`) + VfxController rain particles
  const vfx = new pkg.VfxController({
    scene: stage.scene,
    config: nightConfig,
    baseCameraPos: [camera.position.x, camera.position.y, camera.position.z],
    lookAtTarget: [-2, 1.4, -1]
  });
  assert.equal(vfx.isRainActive(), false, 'No rain particles in night mode');

  const dayConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, {
    atmosphere: 'day',
    palette: Object.assign({}, pkg.DEFAULT_PALETTE, { background: '#162029', coolAmbient: '#7A8894' })
  });
  pkg.UrbanGlbSceneBuilder.applyAtmosphere(stage, dayConfig, ecsWorld);
  vfx.applyConfig(dayConfig);
  assert.equal(vfx.isRainActive(), false, 'No rain particles in day mode');
  assert.ok(stage.keyDirLight.intensity > 2.5, 'Solar directional light stronger in day mode');
  assert.ok(prepared.materials.roads[0].roughness > 0.85, 'Dry matte asphalt in day mode');
  assert.ok(carTraffic.baseSpotIntensity < 8.0, 'Headlights dimmed in day mode');

  const rainConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, {
    atmosphere: 'rain',
    windStrength: 1.45,
    palette: Object.assign({}, pkg.DEFAULT_PALETTE, { background: '#0A0F14', coolAmbient: '#5E6C78' })
  });
  pkg.UrbanGlbSceneBuilder.applyAtmosphere(stage, rainConfig, ecsWorld);
  vfx.applyConfig(rainConfig);
  assert.equal(vfx.isRainActive(), true, 'Rain particles active in rain mode');
  assert.ok(prepared.materials.roads[0].roughness > 0.7, 'Rain asphalt stays moderately rough rather than mirror-bright');
  const rainRoadNormalX = prepared.materials.roads[0].normalScale.x;
  pkg.UrbanGlbSceneBuilder.applyAtmosphere(stage, rainConfig, ecsWorld);
  assert.AlmostEqual(
    prepared.materials.roads[0].normalScale.x,
    rainRoadNormalX,
    1e-5
  );
  assert.ok(stage.scene.fog.density > 0.02, 'Thicker storm mist in rain mode');
  assert.ok(carTraffic.baseSpotIntensity >= 22.0, 'Headlights intensified against wet storm asphalt');

  // 8. Complete leak-free disposal of ECS World, AnimationMixer, VfxController, Scene & DRACOLoader
  pointer.detach();
  keyboard.detach();
  vfx.dispose();
  ecsWorld.clear(true);
  assert.equal(ecsWorld.getEntityCount(), 0);
  prepared.dispose();
  loader.dispose();
  assert.equal(loader.isDisposed(), true);
  pkg.LifecycleManager.disposeObject3D(stage.scene);
  assert.equal(stage.scene.children.length, 0);
});

test('modern 3D-wrapping ASCII shader, adaptive resolution guardrails, and per-object outline API work cleanly', () => {
  const asciiShaderSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'),
    'utf8'
  );
  const atlasSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/glyphAtlas.ts'),
    'utf8'
  );

  // 1. Modern 3D-wrapping ASCII shader invariants (glyph variety + dark breathing + silhouette moat + tonal underlayer + ground reflections)
  includesAll(asciiShaderSrc, [
    'tNormal',
    'tDepth',
    'linearizeDepth',
    'glyphVarietyHash',
    'sampleGroundReflection',
    'silhouetteOuterMoat',
    'silhouetteInnerRim',
    'tonedUnderlayer',
    'uWetness',
    'uCameraNear',
    'uCameraFar',
    'uVolumeWrapStrength',
    'uNormalReliefStrength',
    'uKeyLightViewDir',
    'uRimLightViewDir',
    'uWorldUpViewDir',
    'keyNdotL',
    'keyAway',
    'normalSpec',
    'normalTilt',
    'macroViewN',
    'sampleCellIntegrated',
    'qBL',
    'qBR',
    'qTL',
    'qTR',
    'nSubIntegrated',
    'subDepthPeak',
    'uSceneTexelSize',
    'uSubCellSpread',
    'uAtlasTileSize',
    'floor(uResolution * 0.5)',
    '0.55 / safeTileDims',
    'smoothBackdrop',
    'uBlockBlendWeight',
    'max(detailGlyphMask'
  ]);
  assert.doesNotMatch(asciiShaderSrc, /b\s*==\s*3/, '100% solid block fill (█) is never emitted on highlights');
  includesAll(atlasSrc, ['blockCount = 4', 'bayer4']);

  const fillRectCalls = [];
  const sandbox = createBundleSandbox({
    document: {
      createElement: () => ({
        width: 0,
        height: 0,
        style: {},
        getContext: () => ({
          clearRect: () => {},
          fillRect: (x, y, w, h) => fillRectCalls.push({ x, y, w, h }),
          fillText: () => {},
          font: '',
          textAlign: '',
          textBaseline: '',
          fillStyle: ''
        })
      })
    }
  });

  const pkg = sandbox.ASCIIRealms;
  assert.equal(pkg.DEFAULT_PALETTE.background, '#0C1217');
  assert.equal(pkg.DEFAULT_PALETTE.warmLight, '#4A7C7E');
  assert.equal(pkg.DEFAULT_PALETTE.warmCore, '#8A99A6');
  assert.equal(pkg.DEFAULT_PALETTE.coolAmbient, '#6E7B87');
  assert.equal(pkg.DEFAULT_PALETTE.foliageAccent, '#2A3540');
  includesAll(pkg.DEFAULT_ASCII_RAMP, ['o', 'u', 's', 'a', '$', '8', 'Q', '=', '-', '~', '^', '*']);
  assert.ok(pkg.DEFAULT_ASCII_RAMP.startsWith('    '), 'DEFAULT_ASCII_RAMP reserves leading empty spaces for dark breathing shadows');

  // 2. High-legibility 5:8 glyph atlas proportions
  const atlas = pkg.createGlyphAtlas(' .:-=+*#%@', '|/-\\', 'monospace', 64);
  assert.equal(atlas.tileHeight, 64);
  assert.equal(atlas.tileWidth, 40);
  atlas.texture.dispose();

  // 3. Adaptive resolution, 3D supersampling & calibrated high-definition typographic grid
  const mobileRes = pkg.computeAdaptiveResolution({
    cssWidth: 360,
    cssHeight: 300,
    devicePixelRatio: 3.0,
    config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: 8, autoResponsiveDensity: true },
    isCoarsePointer: true
  });
  assert.equal(mobileRes.tier, 'mobile');
  assert.ok(mobileRes.effectiveDpr <= 1.5);
  assert.ok(mobileRes.supersampleScale >= 1.3 && mobileRes.renderTargetWidth > mobileRes.physicalWidth);

  const desktopRes = pkg.computeAdaptiveResolution({
    cssWidth: 840,
    cssHeight: 500,
    devicePixelRatio: 2.0,
    config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: 8, autoResponsiveDensity: true },
    isCoarsePointer: false
  });
  assert.equal(desktopRes.tier, 'desktop');
  assert.equal(desktopRes.effectiveDpr, 2.0, 'Desktop operates at full DPR 2.0 sharpness');
  assert.ok(
    desktopRes.activeCellSize >= 6.0 && desktopRes.activeCellSize <= 6.8,
    `Desktop cell density calibrated in [6.0, 6.8]px (got ${desktopRes.activeCellSize})`
  );
  assert.ok(
    desktopRes.supersampleScale >= 1.5 && desktopRes.supersampleScale <= 2.0,
    `Desktop 3D supersampling in [1.5, 2.0]x (got ${desktopRes.supersampleScale})`
  );

  const hdRes = pkg.computeAdaptiveResolution({
    cssWidth: 1280,
    cssHeight: 720,
    devicePixelRatio: 2.0,
    config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: 8, autoResponsiveDensity: true },
    isCoarsePointer: false
  });
  assert.equal(hdRes.tier, 'hd');
  assert.equal(hdRes.effectiveDpr, 2.0, 'HD operates at full DPR 2.0 sharpness');
  assert.ok(
    hdRes.activeCellSize >= 5.5 && hdRes.activeCellSize <= 6.2,
    `HD cell density calibrated in [5.5, 6.2]px (got ${hdRes.activeCellSize})`
  );
  assert.ok(
    hdRes.supersampleScale >= 1.45 && hdRes.renderTargetWidth <= 4096 && hdRes.renderTargetHeight <= 4096,
    'HD 3D supersampling stays within safe GPU limits (<= 4096)'
  );

  const uhdRes = pkg.computeAdaptiveResolution({
    cssWidth: 1600,
    cssHeight: 900,
    devicePixelRatio: 1.5,
    config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: 8, autoResponsiveDensity: true },
    isCoarsePointer: false
  });
  assert.equal(uhdRes.tier, 'uhd');
  assert.ok(
    uhdRes.activeCellSize >= 5.5 && uhdRes.activeCellSize <= 6.2,
    `UHD cell density calibrated in [5.5, 6.2]px (got ${uhdRes.activeCellSize})`
  );

  const extreme4k = pkg.computeAdaptiveResolution({
    cssWidth: 3840,
    cssHeight: 1600,
    devicePixelRatio: 2.0,
    config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: 8, autoResponsiveDensity: true },
    isCoarsePointer: false
  });
  assert.ok(extreme4k.columns <= 680);
  assert.ok(extreme4k.renderTargetWidth <= 4096 && extreme4k.renderTargetHeight <= 4096);

  const transition = new pkg.ResolutionTransitionController(14.0);
  transition.setTarget(mobileRes, true);
  assert.equal(transition.step(0).isTransitioning, false);
  transition.setTarget(extreme4k, false);
  assert.equal(transition.step(0.016).isTransitioning, true);

  // 4. Per-object silhouette outline helper stays opt-in and leak-free
  const testScene = new pkg.THREE.Scene();
  const box = new pkg.THREE.Mesh(
    new pkg.THREE.BoxGeometry(1, 1, 1),
    new pkg.THREE.MeshStandardMaterial({ color: 0x223344 })
  );
  testScene.add(box);
  assert.equal(pkg.getObjectOutlineState(box), null);
  const handle = pkg.applyObjectOutline(box, { highlightColor: '#4A7C7E', thickness: 1.3 });
  assert.equal(handle.getState().enabled, true);
  assert.equal(handle.getState().highlightColor, '#4A7C7E');
  const outlineShell = box.children.find(child => child.userData.__isAsciiOutlineShell);
  assert.equal(outlineShell.userData.skipNormalPass, true);
  assert.equal(handle.dispose(), 1);
  assert.equal(pkg.getObjectOutlineState(box), null);
  pkg.LifecycleManager.disposeObject3D(testScene);

  // 5. Procedural normal maps, Pass 2 NormalPassMaterialCache (skipNormalPass) & view-space light extraction
  const normalSet = pkg.createProceduralNormalMapSet(32);
  for (const key of ['asphalt', 'pavement', 'facade', 'contourTrim']) {
    const tex = normalSet[key];
    assert.ok(tex && tex.isDataTexture, `procedural normal map "${key}" is a DataTexture`);
    assert.equal(tex.colorSpace, pkg.THREE.NoColorSpace, `normal map "${key}" uses linear NoColorSpace`);
    assert.equal(tex.image.data.length, 32 * 32 * 4);
  }

  const passScene = new pkg.THREE.Scene();
  const mappedMat = new pkg.THREE.MeshStandardMaterial({
    color: 0x667788,
    normalMap: normalSet.facade,
    normalScale: new pkg.THREE.Vector2(0.8, 0.8)
  });
  const mappedMesh = new pkg.THREE.Mesh(new pkg.THREE.BoxGeometry(1, 1, 1), mappedMat);
  const decalMesh = new pkg.THREE.Mesh(
    new pkg.THREE.PlaneGeometry(1, 1),
    new pkg.THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5 })
  );
  decalMesh.userData.skipNormalPass = true;
  const cutout = new pkg.THREE.Mesh(new pkg.THREE.PlaneGeometry(), new pkg.THREE.MeshStandardMaterial({ alphaTest: 0.5 }));
  const roadMat = new pkg.THREE.MeshStandardMaterial({ side: pkg.THREE.DoubleSide });
  roadMat.userData.asciiRoadSurface = true;
  const roadMesh = new pkg.THREE.Mesh(new pkg.THREE.PlaneGeometry(), roadMat);
  passScene.add(mappedMesh, decalMesh, cutout, roadMesh);

  const passCache = new pkg.NormalPassMaterialCache();
  passCache.beginPass(passScene);
  assert.equal(decalMesh.visible, false, 'skipNormalPass decal hidden during Pass 2');
  assert.equal(cutout.visible, false, 'alpha-tested geometry must not become a solid normal card');
  assert.equal(roadMesh.material.opacity, 0, 'Pass 2 tags road in alpha even without a normal map');
  assert.equal(roadMesh.material.blending, pkg.THREE.NoBlending, 'road marker writes alpha without transparent blending');
  assert.equal(roadMesh.material.transparent, false, 'road remains depth-tested in opaque draw order');
  assert.equal(roadMesh.material.side, pkg.THREE.DoubleSide);
  assert.equal(mappedMesh.material.opacity, 1, 'ordinary geometry is never tagged as road');
  assert.ok(
    mappedMesh.material.isMeshNormalMaterial && mappedMesh.material.normalMap === normalSet.facade,
    'Opaque mesh receives normal-mapped MeshNormalMaterial during Pass 2'
  );
  assert.ok(
    mappedMesh.material.normalScale.x >= 0.14 && mappedMesh.material.normalScale.x <= 0.48,
    'Pass 2 normalScale is macro-filtered to prevent ASCII static'
  );
  passCache.endPass();
  assert.equal(decalMesh.visible, true, 'skipNormalPass decal restored immediately after Pass 2');
  assert.equal(cutout.visible, true);
  assert.equal(mappedMesh.material, mappedMat, 'Original PBR material restored immediately after Pass 2');
  assert.equal(roadMesh.material, roadMat, 'road source material restored after Pass 2');
  mappedMat.normalScale.set(0, 0);
  passCache.beginPass(passScene);
  assert.equal(mappedMesh.material.normalScale.length(), 0, 'Pass 2 respects explicitly flat road normals');
  passCache.endPass();

  const dirKey = new pkg.THREE.DirectionalLight(0xffffff, 2.0);
  dirKey.name = 'KeyDirectionalLight';
  dirKey.position.set(16, 28, 18);
  passScene.add(dirKey, dirKey.target);
  const testCam = new pkg.THREE.PerspectiveCamera(58, 16 / 9, 0.1, 120);
  testCam.position.set(10, 12, 10);
  testCam.lookAt(0, 1, 0);
  const outKey = new pkg.THREE.Vector3();
  const outRim = new pkg.THREE.Vector3();
  const outUp = new pkg.THREE.Vector3();
  pkg.extractSceneDirectionalVectors(passScene, testCam, outKey, outRim, outUp);
  assert.ok(Math.abs(outKey.length() - 1.0) < 1e-4, 'uKeyLightViewDir is unit length');
  assert.ok(Math.abs(outRim.length() - 1.0) < 1e-4, 'uRimLightViewDir is unit length');
  assert.ok(Math.abs(outUp.length() - 1.0) < 1e-4, 'uWorldUpViewDir is unit length');

  passCache.dispose();
  normalSet.dispose();
  pkg.LifecycleManager.disposeObject3D(passScene);

  // 6. Directional structural glyphs ('|/\-+') & highlight accents ('*', 'o')
  assert.equal(pkg.DEFAULT_ENGINE_CONFIG.structuralChars, '|/\\-+');
  const fullAtlas = pkg.createGlyphAtlas(
    pkg.DEFAULT_ASCII_RAMP,
    pkg.DEFAULT_ENGINE_CONFIG.structuralChars,
    'monospace',
    48
  );
  assert.equal(fullAtlas.structuralCount, 5);
  fullAtlas.texture.dispose();
  includesAll(asciiShaderSrc, [
    'uHighlightGlyphs',
    'structuralMassFloor',
    'atan(domGrad.x, -domGrad.y)',
    'isSparkleHighlight'
  ]);
});

test('tree-planter sidewalk pockets clamp smoothly without entering planters', () => {
  const pkg = createBundleSandbox().ASCIIRealms;
  const bounds = pkg.DEFAULT_URBAN_SIDEWALK_BOUNDS;
  for (const [startX, direction] of [[-5.4, -1], [0.4, 1]]) {
    let previous = { x: startX, z: 1.0 };
    for (let i = 0; i < 30; i++) {
      const next = pkg.clampToSidewalkBounds(previous.x + direction * 0.1, previous.z, bounds);
      assert.ok(Math.hypot(next.x - previous.x, next.z - previous.z) <= 0.101, 'no sideways teleport at plaza/tree transition');
      previous = next;
    }
    assert.ok(Math.abs(previous.x - startX) > 2.5, 'walkway beside tree remains accessible');
  }
  for (const [x, z] of [[-9, 3], [4, 3]]) {
    const result = pkg.clampToSidewalkBounds(x, z, bounds);
    assert.ok(bounds.obstacles.every(b => !(result.x > b.minX && result.x < b.maxX && result.z > b.minZ && result.z < b.maxZ)), 'outside all planter obstacles');
    assert.ok(Math.abs(result.x - x) < 4.1 && Math.abs(result.z - z) <= 1.25);
  }
  for (const x of [-18, -16, -10, -8, -5.6, -5.5, 0.5, 0.6, 7.7, 8, 10.5]) {
    for (const z of [-3.3, -2.5, -1.92, 0, 1.7, 2.2, 4.1]) {
      const result = pkg.clampToSidewalkBounds(x, z, bounds);
      assert.ok(bounds.obstacles.every(b => !(result.x > b.minX && result.x < b.maxX && result.z > b.minZ && result.z < b.maxZ)));
      const second = pkg.clampToSidewalkBounds(result.x, result.z, bounds);
      assert.ok(Math.hypot(second.x - result.x, second.z - result.z) < 1e-8, 'clamp is stable at obstacle and sidewalk edges');
    }
  }
});

test('Mouse scroll-wheel zoom: smooth damping, safe min/max bounds, WASD & autoOrbit coexistence, and destroy() cleanup', () => {
  const addedListeners = new Map();
  const removedListeners = new Set();
  const mockContainer = {
    style: { touchAction: '' },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 500 }),
    addEventListener(type, fn, opts) {
      addedListeners.set(type, { fn, opts });
    },
    removeEventListener(type, fn) {
      const entry = addedListeners.get(type);
      if (entry && entry.fn === fn) {
        removedListeners.add(type);
        addedListeners.delete(type);
      }
    }
  };

  const sandbox = createBundleSandbox({
    window: {
      addEventListener() {},
      removeEventListener() {},
      devicePixelRatio: 1
    }
  });

  const pkg = sandbox.ASCIIRealms;
  const pointer = new pkg.PointerInput(mockContainer, { enableWheelZoom: true });
  const keyboard = new pkg.KeyboardInput();
  pointer.attach();

  assert.ok(addedListeners.has('wheel'), 'PointerInput attaches wheel listener on playground container');
  assert.equal(addedListeners.get('wheel').opts.passive, false, 'wheel listener uses passive: false to prevent page jump');
  assert.equal(addedListeners.get('pointermove').opts.passive, true, 'pointermove listener stays passive: true');

  const world = new pkg.World();
  const camera = new pkg.THREE.PerspectiveCamera(58, 16 / 9, 0.1, 140);
  const inputSys = new pkg.InputSystem(pointer, keyboard, camera);
  const navSys = new pkg.MovementRotationSystem();
  const camFollowSys = new pkg.CameraFollowSystem(camera);

  const playerId = world.createEntity();
  world
    .addComponent(playerId, 'Transform', {
      x: -4.2, y: 0, z: -2.4,
      rotX: 0, rotY: 0, rotZ: 0,
      scaleX: 1, scaleY: 1, scaleZ: 1
    })
    .addComponent(playerId, 'Velocity', {
      vx: 0, vy: 0, vz: 0,
      angularVx: 0, angularVy: 0, angularVz: 0,
      damping: 12
    })
    .addComponent(playerId, 'InputState', {
      pointerX: 0, pointerY: 0, pointerActive: false, isDragging: false,
      moveX: 0, moveZ: 0, yawSensitivity: 0.6, pitchSensitivity: 0.25,
      moveSpeed: 3.6, boundsRadius: 0
    })
    .addComponent(playerId, 'SidewalkBounds', {
      ...pkg.DEFAULT_URBAN_SIDEWALK_BOUNDS,
      obstacles: pkg.DEFAULT_URBAN_SIDEWALK_BOUNDS.obstacles.map((o) => ({ ...o }))
    })
    .addComponent(playerId, 'CameraFollow', {
      ...pkg.URBAN_CAMERA_FOLLOW_DEFAULTS,
      autoOrbit: false,
      orbitAngle: 0,
      orbitSpeed: 0.42,
      initialized: false
    });

  // Initial snap matches baseline 3rd-person offset
  camFollowSys.update(world, { dt: 0, elapsed: 0 });
  const follow = world.getComponent(playerId, 'CameraFollow');
  const getDistToLook = () => {
    const t = world.getComponent(playerId, 'Transform');
    const lx = t.x + follow.lookAtOffsetX;
    const ly = t.y + follow.lookAtOffsetY;
    const lz = t.z + follow.lookAtOffsetZ;
    return Math.hypot(camera.position.x - lx, camera.position.y - ly, camera.position.z - lz);
  };
  const initialDist = getDistToLook();
  assert.ok(initialDist > 19.0 && initialDist < 20.5, `Initial camera distance ~19.65m (got ${initialDist})`);

  // Dispatch wheel zoom-in (deltaY < 0) via real listener and verify preventDefault() + smooth damping
  let prevented = false;
  addedListeners.get('wheel').fn({
    deltaY: -120,
    deltaMode: 0,
    cancelable: true,
    isTrusted: true,
    preventDefault() {
      prevented = true;
    }
  });
  assert.equal(prevented, true, 'Cancelable wheel event calls preventDefault() inside 3D viewport');

  inputSys.update(world, { dt: 0.016, elapsed: 0.016 });
  assert.ok(follow.targetDistance < initialDist, 'Scroll up reduces targetDistance (zoom in)');

  camFollowSys.update(world, { dt: 0.016, elapsed: 0.016 });
  const afterOneFrameDist = getDistToLook();
  assert.ok(
    afterOneFrameDist < initialDist && afterOneFrameDist > follow.targetDistance,
    'Camera distance interpolates smoothly with damping rather than snapping instantaneously'
  );

  // Extreme zoom-in burst clamps strictly at minDistance (never clips inside Player_Rig)
  for (let i = 0; i < 40; i++) {
    pointer.triggerWheel(-180, 0);
    inputSys.update(world, { dt: 0.05, elapsed: 0.1 + i * 0.05 });
    camFollowSys.update(world, { dt: 0.05, elapsed: 0.1 + i * 0.05 });
  }
  const minClampedDist = getDistToLook();
  assert.ok(
    Math.abs(minClampedDist - follow.minDistance) < 0.05,
    `Zoom-in clamps cleanly at minDistance=${follow.minDistance}m (got ${minClampedDist})`
  );

  // Coexistence with WASD movement + setAutoOrbit(true) during extreme zoom-out burst
  follow.autoOrbit = true;
  const inputComp = world.getComponent(playerId, 'InputState');
  for (let i = 0; i < 50; i++) {
    pointer.triggerWheel(180, 0);
    inputSys.update(world, { dt: 0.05, elapsed: 3.0 + i * 0.05 });
    inputComp.moveZ = -1; // Simulate holding 'W' while zooming & auto-orbiting
    navSys.update(world, { dt: 0.05, elapsed: 3.0 + i * 0.05 });
    camFollowSys.update(world, { dt: 0.05, elapsed: 3.0 + i * 0.05 });
  }
  const maxClampedDist = getDistToLook();
  const movedTransform = world.getComponent(playerId, 'Transform');
  assert.ok(movedTransform.z < -2.4, 'WASD movement continues unimpeded while zooming & auto-orbiting');
  assert.ok(follow.orbitAngle > 0, 'setAutoOrbit sweep continues unimpeded while zooming');
  assert.ok(
    Math.abs(maxClampedDist - follow.maxDistance) < 0.15,
    `Zoom-out clamps cleanly at maxDistance=${follow.maxDistance}m (got ${maxClampedDist})`
  );

  // Mascot mode isolation: enableWheelZoom=false attaches zero wheel listener
  const mascotListeners = new Map();
  const mascotPointer = new pkg.PointerInput(
    {
      style: {},
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 300, height: 300 }),
      addEventListener(type, fn, opts) { mascotListeners.set(type, { fn, opts }); },
      removeEventListener(type) { mascotListeners.delete(type); }
    },
    { enableWheelZoom: false }
  );
  mascotPointer.attach();
  assert.equal(mascotListeners.has('wheel'), false, 'enableWheelZoom:false attaches no wheel listener');
  mascotPointer.detach();

  // Deterministic cleanup on detach() / destroy()
  pointer.detach();
  assert.equal(pointer.isAttached(), false);
  assert.equal(addedListeners.size, 0, 'All container listeners (including wheel) removed on detach()');
  assert.ok(removedListeners.has('wheel'), 'wheel listener explicitly removed via removeEventListener');
});

test('Scene toolbar below title: micro font/cell range [2px..mountMax], 0.25px low-end steps, no reset button, RGSS shader & bilingual i18n', async () => {
  const htmlSrc = readFileSync(path.join(root, 'index.html'), 'utf8');
  const mainSrc = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
  const adapterSrc = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');
  const shaderSrc = readFileSync(path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'), 'utf8');
  const ptJson = JSON.parse(readFileSync(path.join(root, 'assets/i18n/pt-br.json'), 'utf8'));
  const enJson = JSON.parse(readFileSync(path.join(root, 'assets/i18n/en.json'), 'utf8'));

  // 1. Control bar positioned directly below #scene-title and above #ascii-scene with pt-br & en i18n
  const titlePos = htmlSrc.indexOf('id="scene-title"');
  const toolbarPos = htmlSrc.indexOf('class="scene-toolbar"');
  const sliderPos = htmlSrc.indexOf('id="scene-cell-size"');
  const stagePos = htmlSrc.indexOf('id="ascii-scene"');
  assert.ok(titlePos > 0 && toolbarPos > titlePos && toolbarPos < stagePos, 'Toolbar sits directly below scene title and above 3D stage');
  assert.ok(sliderPos > toolbarPos && sliderPos < stagePos, 'Slider sits inside scene toolbar');

  // The `[ restaurar ]` button was removed: only the slider and its readout remain.
  assert.equal(htmlSrc.indexOf('id="scene-cell-reset"'), -1, 'no reset button in the scene toolbar');
  assert.doesNotMatch(htmlSrc, /\[\s*restaurar\s*\]/i, 'no reset label left in the markup');
  assert.ok(!ptJson['scene.fontReset'] && !ptJson['scene.fontResetAria'], 'pt-br reset keys pruned');
  assert.ok(!enJson['scene.fontReset'] && !enJson['scene.fontResetAria'], 'en reset keys pruned');

  for (const key of ['scene.fontGroupAria', 'scene.fontSizeLabel', 'scene.fontSizeAria']) {
    assert.ok(ptJson[key] && enJson[key], `Missing translation for ${key}`);
  }
  includesAll(mainSrc, ['scene-cell-size', 'scene-cell-value', 'setCellSize', 'cleanupSceneUiListeners']);
  assert.doesNotMatch(mainSrc, /scene-cell-reset|onCellReset|resetCellSize/, 'no dead wiring for the removed button');

  // 2. Micro cell stop table: min=2.0px, 0.25px steps in [2.0..6.0], 0.50px in (6.0..max], capped at mount max
  const sandbox = createBundleSandbox({
    document: {
      createElement: () => ({
        width: 0,
        height: 0,
        getContext: () => ({
          fillRect() {},
          fillText() {},
          save() {},
          beginPath() {},
          rect() {},
          clip() {},
          restore() {},
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
          font: '',
          textAlign: '',
          textBaseline: '',
          fillStyle: ''
        })
      })
    }
  });
  const pkg = sandbox.ASCIIRealms;
  assert.equal(pkg.MIN_MICRO_CELL_SIZE, 2.0);

  const stops65 = pkg.buildMicroCellStops(6.5, 2.0);
  assert.equal(stops65[0], 2.0, 'Minimum cell size starts at 2.0px');
  assert.equal(stops65[stops65.length - 1], 6.5, 'Maximum cell size locks strictly to mounted value (6.5px)');
  includesAll(stops65.map(String).join(','), ['2', '2.25', '2.5', '2.75', '3', '4.25', '5.75', '6', '6.5']);
  assert.equal(pkg.snapToMicroCellStop(99, 6.5, 2.0), 6.5, 'Values above mount ceiling clamp strictly to max');
  assert.equal(pkg.snapToMicroCellStop(0.5, 6.5, 2.0), 2.0, 'Values below min clamp strictly to 2.0px');
  assert.equal(pkg.snapToMicroCellStop(2.36, 6.5, 2.0), 2.25, 'Snaps to nearest 0.25px low-end step');
  assert.ok(
    pkg.mapNormalizedToMicroCell(0.5, 8.0, 2.0) < 5.0,
    'Curved normalized helper concentrates slider midpoint below linear midpoint (<5.0px)'
  );

  // 3. Monotonic grid resolution down to 2.0px at 0.25px increments on both DPR=1 and DPR=2 without rebuilding atlas
  for (const dpr of [1.0, 2.0]) {
    let prevCols = 0;
    let prevCell = Infinity;
    for (const px of [6.0, 5.0, 4.0, 3.0, 2.75, 2.5, 2.25, 2.0]) {
      const prof = pkg.computeAdaptiveResolution({
        cssWidth: 1000,
        cssHeight: 560,
        devicePixelRatio: dpr,
        config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: px, autoResponsiveDensity: false },
        isCoarsePointer: false
      });
      assert.equal(prof.activeCellSize, px, `DPR=${dpr}: activeCellSize matches ${px}px`);
      assert.ok(prof.cellPhysH < prevCell, `DPR=${dpr}: cellPhysH decreases monotonically at ${px}px`);
      assert.ok(prof.columns >= prevCols, `DPR=${dpr}: columns increase monotonically at ${px}px`);
      prevCell = prof.cellPhysH;
      prevCols = prof.columns;
    }
  }

  for (const width of [300, 1000, 3840]) for (const dpr of [1, 1.25, 2]) {
    for (const px of [2.25, 12, 21]) {
      const profile = pkg.computeAdaptiveResolution({ cssWidth: width, cssHeight: 320, devicePixelRatio: dpr,
        config: { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: px, autoResponsiveDensity: false }, isCoarsePointer: false });
      assert.equal(profile.activeCellSize, px, `${width}px DPR ${dpr} uses ${px}px cells`);
      assert.ok(profile.renderTargetWidth <= 4096 && profile.renderTargetWidth * profile.renderTargetHeight <= 3840 * 2160);
    }
  }

  // Verify AsciiPostProcessor updates uCellPixelSize down to 2.0px without recreating atlas texture after mount sizing
  const post = new pkg.AsciiPostProcessor(pkg.DEFAULT_ENGINE_CONFIG);
  post.applyConfig(pkg.DEFAULT_ENGINE_CONFIG, false, 1200, 680, 2.0, false);
  const mountedAtlasTex = post.compositeMaterial.uniforms.tGlyphAtlas.value;
  const microProf = post.applyConfig(
    { ...pkg.DEFAULT_ENGINE_CONFIG, cellSize: 2.25, autoResponsiveDensity: false },
    false,
    1200,
    680,
    2.0,
    false
  );
  assert.equal(microProf.activeCellSize, 2.25);
  assert.equal(post.sceneTarget.width, microProf.renderTargetWidth);
  assert.equal(post.normalTarget.height, microProf.renderTargetHeight);
  post.applyConfig({ ...pkg.DEFAULT_ENGINE_CONFIG, reflectionStrength: 0.8 }, false, 1200, 680, 2, false);
  assert.equal(post.compositeMaterial.uniforms.uReflectionStrength.value, 0.8);
  assert.equal(post.compositeMaterial.uniforms.uResolution.value.x, microProf.physicalWidth);
  assert.AlmostEqual(post.bloomMaterial.uniforms.uTexelSize.value.x, 1 / post.bloomTarget.width, 1e-8);
  assert.doesNotMatch(adapter, /new PointerEvent\(/);
  assert.equal(
    post.compositeMaterial.uniforms.tGlyphAtlas.value,
    mountedAtlasTex,
    'Glyph atlas CanvasTexture is reused without reallocation when adjusting cell size'
  );
  post.dispose();

  // Verify shader micro-cell RGSS anti-aliasing & lowered vec2(1.25, 2.0) cell floor
  includesAll(shaderSrc, [
    'max(uCellPixelSize, vec2(1.25, 2.0))',
    'microCellFactor',
    'uSceneTexelSize * 1.15'
  ]);

  // 4. Verify engine-adapter locks max to mounted activeCellSize, updates live without remount, and resets cleanly
  let updateCalls = [];
  let mountCount = 0;
  const adapterSandbox = {
    console,
    Date,
    Math,
    Number,
    Boolean,
    String,
    Object,
    CustomEvent: function (type, init) { this.type = type; this.detail = init && init.detail; },
    Event: function (type) { this.type = type; },
    PointerEvent: function () {},
    setTimeout() { return 1; },
    clearTimeout() {},
    setInterval() { return 1; },
    clearInterval() {}
  };
  adapterSandbox.document = {
    readyState: 'complete',
    createElement: () => ({
      getContext: () => ({
        getExtension: () => null,
        getParameter: () => 'NVIDIA GeForce RTX'
      }),
      setAttribute() {},
      addEventListener() {}
    }),
    querySelector: () => null,
    getElementById: () => null,
    head: { appendChild() {} },
    addEventListener() {},
    removeEventListener() {}
  };
  adapterSandbox.window = {
    TP: {},
    ASCIIRealms: {
      buildMicroCellStops: pkg.buildMicroCellStops,
      snapToMicroCellStop: pkg.snapToMicroCellStop,
      AsciiSceneEngine: function (el, cfg) {
        this._cfg = { ...cfg };
        this.mount = () => { mountCount += 1; };
        this.getState = () => 'running';
        this.getConfig = () => ({ ...this._cfg });
        this.getStats = () => ({ activeCellSize: 6.25, gridColumns: 192, gridRows: 108, fps: 60 });
        this.getScene = () => ({ isScene: true });
        this.updateConfig = (partial) => {
          updateCalls.push(partial);
          Object.assign(this._cfg, partial);
        };
        this.pause = () => {};
        this.resume = () => {};
        this.destroy = () => {};
      }
    },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
    requestAnimationFrame() { return 1; },
    cancelAnimationFrame() {}
  };
  adapterSandbox.TP = adapterSandbox.window.TP;
  vm.createContext(adapterSandbox);
  vm.runInContext(adapterSrc, adapterSandbox);

  const stageContainer = {
    setAttribute() {},
    removeAttribute() {},
    dispatchEvent() {},
    addEventListener() {},
    removeEventListener() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1200, height: 675 })
  };
  let activeConfig;
  const OriginalEngine = adapterSandbox.window.ASCIIRealms.AsciiSceneEngine;
  adapterSandbox.window.ASCIIRealms.AsciiSceneEngine = function (el, cfg) { activeConfig = cfg; return new OriginalEngine(el, cfg); };
  let loadErrorReceived = false;
  const ctrl = adapterSandbox.TP.scene.create(stageContainer, { preset: 'night', config: { callbacks: { onLoadError() { loadErrorReceived = true; } } } });
  const mounted = await ctrl.mount();
  assert.equal(mounted, true);
  assert.equal(mountCount, 1);

  const range = ctrl.getCellSizeRange();
  assert.equal(range.min, 2.0, 'Adapter min cell size is 2.0px');
  assert.equal(range.max, 21, 'Adapter allows up to 21px');
  assert.equal(range.current, 2.25);
  assert.equal(ctrl.setCellSize(99), 21, 'Cannot exceed 21px');
  assert.equal(ctrl.setCellSize(12), 12);
  assert.equal(ctrl.setCellSize(3.25), 3.25);
  assert.equal(mountCount, 1, 'WebGL engine is never remounted when changing cell size');
  assert.deepEqual({ ...updateCalls[updateCalls.length - 1] }, { cellSize: 3.25, autoResponsiveDensity: false });

  assert.equal(ctrl.resetCellSize(), 2.25, 'Reset restores default cell size');
  assert.deepEqual({ ...updateCalls[updateCalls.length - 1] }, { cellSize: 2.25, autoResponsiveDensity: false });
  assert.equal(ctrl.setReflection(0.8), 0.8);
  assert.deepEqual({ ...updateCalls[updateCalls.length - 1] }, { reflectionStrength: 0.8 });
  ctrl.setPreset('rain');
  assert.equal(ctrl.getReflection(), 0.8, 'Reflection slider survives preset changes');
  assert.equal(ctrl.setReflection(-1), 0);
  assert.equal(ctrl.setReflection(2), 1);
  assert.ok(ctrl.getScene().isScene, 'Public getScene() contract preserved');
  activeConfig.callbacks.onLoadError(new Error('decoder failure'));
  assert.equal(ctrl.getMode(), 'fallback');
  assert.equal(loadErrorReceived, true, 'caller load-error callback remains intact');
  ctrl.destroy();
});

test('3D scene section is always mounted and expanded: no collapse control, controls preserved', () => {
  const htmlSrc = readFileSync(path.join(root, 'index.html'), 'utf8');
  const mainSrc = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
  const cssSrc = readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');

  const start = htmlSrc.indexOf('<section id="scene"');
  const end = htmlSrc.indexOf('<!-- 6. NEOFETCH STACK');
  assert.ok(start > 0 && end > start, '#scene section is delimited in the document');
  const scene = htmlSrc.slice(start, end);

  // 1. No collapse affordance and no clamped/inert body for the scene.
  assert.match(scene, /<section id="scene" class="section" aria-labelledby="scene-title">/);
  assert.doesNotMatch(scene, /data-collapsible|data-collapsed|collapse-toggle|collapse-body|scene-body/);
  assert.doesNotMatch(scene, /\[\s*(expandir|recolher|expand|collapse)\s*\]/i, 'no collapse label inside the scene');
  assert.doesNotMatch(mainSrc, /scene-body|#scene[^'"]*collapse-toggle/i);

  // 2. Scene controls stay untouched: font/shader toolbar (slider + readout, no reset
  //    button), presets, pause, fullscreen and the wheel-zoom hint.
  assert.doesNotMatch(scene, /scene-cell-reset|scene\.fontReset/, 'the reset button is gone');
  includesAll(scene, [
    'id="ascii-scene"',
    'class="scene-stage"',
    'class="scene-toolbar"',
    'id="scene-cell-size"',
    'id="scene-cell-value"',
    'data-scene-mode="day"',
    'data-scene-mode="night"',
    'data-scene-mode="rain"',
    'id="scene-toggle"',
    'id="scene-fullscreen"',
    'data-i18n="scene.presetHelp"'
  ]);
  // The stage is a direct child of the section, not wrapped in a clampable body.
  assert.ok(scene.indexOf('id="ascii-scene"') > scene.indexOf('class="scene-toolbar"'));
  assert.equal(scene.indexOf('id="scene-body"'), -1, 'no #scene-body wrapper remains');

  // 3. No scene-specific collapse CSS and no runtime clamp for the scene.
  assert.doesNotMatch(cssSrc, /#scene[^{]*collapse-body/);
  assert.doesNotMatch(cssSrc, /#scene[^{]*data-collapsed/);
  assertsNoSceneCollapse(mainSrc);

  // 4. The adapter mounts without waiting for an expand gesture: the scene is
  //    wired during init and the deferred adapter observes the stage subtree.
  includesAll(mainSrc, ['initScene()', 'initSceneFullscreen()', 'scheduleEngineAdapterLoad']);
  includesAll(adapter, ['ResizeObserver', 'instance.resize']);
});

function assertsNoSceneCollapse(mainSrc) {
  // The generic collapse module stays for the other sections, but nothing in it
  // references the 3D scene any more.
  assert.ok(mainSrc.includes('function initCollapsibles()'), 'generic collapse module kept');
  assert.ok(mainSrc.includes("querySelectorAll('[data-collapsible]')"), 'collapse module is opt-in via markup');
  assert.doesNotMatch(mainSrc, /TP\.collapse\.expand\(section\)/, 'fullscreen no longer expands a clamped scene');
}

test('day, night, and rain presets produce distinct legible 3D illumination, complete GLB material coverage, and 4px small-cell shader mass', async () => {
  const asciiShaderSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'),
    'utf8'
  );
  const postProcSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/AsciiPostProcessor.ts'),
    'utf8'
  );

  // 1. Perceptual linear-to-sRGB transfer & DPR-invariant small-cell ('uCellCssSize') calibration
  includesAll(postProcSrc, ['uCellCssSize', 'profile.activeCellSize']);
  includesAll(asciiShaderSrc, [
    'uniform float uCellCssSize',
    'linearToSrgb',
    'smallFontFactor',
    'cellDensitySupport',
    'geomMinLuma',
    'effectiveBlockWeight',
    'stepReflY',
    'normalCenterSample.a',
    'mix(max(sceneCol, structuralMassFloor), sceneCol, roadMask)',
    'finalRgb = mix(finalRgb, darkRoad, roadMask)',
    'vec3(0.16)',
    '* uReflectionStrength',
    'exp(-max(finalRgb - vec3(0.70)'
  ]);

  // The road luminance shoulder is continuous and retains a positive difference
  // between dark pavement and brighter lane marks, even at high illumination.
  const roadGrade = l => l * 0.32 / (0.32 + l);
  for (const l of [0, 0.03, 0.1, 0.3, 1, 10]) assert.ok(roadGrade(l) < 0.32);
  assert.ok(roadGrade(0.4) > roadGrade(0.1));
  assert.ok(roadGrade(0.8) - roadGrade(0.4) < 0.1, 'bright pavement stays subdued');

  // 2. Adapter preset palettes must clearly differentiate day, night, and rain
  assert.match(adapter, /day:\s*\{[\s\S]*?background:\s*'#213242'/);
  assert.match(adapter, /night:\s*\{[\s\S]*?background:\s*'#0E161F'/);
  assert.match(adapter, /rain:\s*\{[\s\S]*?background:\s*'#111C27'/);

  // 3. Load real cena_completa.glb and verify zero unclassified opaque materials, zero residual metalnessMap, and calibrated presets
  const sandbox = createBundleSandbox();
  const pkg = sandbox.ASCIIRealms;
  pkg.THREE.ImageLoader.prototype.load = function (_url, onLoad) {
    const img = { width: 2, height: 2, data: new Uint8Array(16) };
    if (onLoad) onLoad(img);
    return img;
  };

  const rawGlb = readFileSync(path.join(root, 'assets/models/cena_completa.glb'));
  const glbBuffer = rawGlb.buffer.slice(rawGlb.byteOffset, rawGlb.byteOffset + rawGlb.byteLength);
  const loader = new pkg.GlbSceneLoader();
  const prepared = await loader.parseBuffer(glbBuffer, '');

  const classifiedUuids = new Set();
  for (const group of Object.values(prepared.materials)) {
    if (Array.isArray(group)) {
      for (const mat of group) classifiedUuids.add(mat.uuid);
    }
  }

  let unclassifiedOpaque = 0;
  let residualMetalnessMap = 0;
  prepared.nodes.cidade.traverse((obj) => {
    if (!obj.isMesh || !obj.visible) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const mat of mats) {
      if (!mat) continue;
      if (mat.metalnessMap) residualMetalnessMap += 1;
      if (!mat.transparent && !classifiedUuids.has(mat.uuid)) unclassifiedOpaque += 1;
    }
  });
  assert.equal(unclassifiedOpaque, 0, 'All visible opaque Cidade materials participate in atmosphere lighting');
  assert.equal(residualMetalnessMap, 0, 'Baked ORM metalnessMap detached so scene.environment=null preserves diffuse albedo');
  assert.ok(
    prepared.materials.foliage.some((m) => /material\.006/i.test(m.name)),
    'Large tree canopy Material.006 classified as foliage'
  );
  assert.ok(
    prepared.materials.sidewalks.some((m) => /material\.010/i.test(m.name)),
    'Courtyard ground slab Material.010 classified as sidewalk'
  );

  const ecsWorld = new pkg.World();
  const baseCfg = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG);
  const stage = pkg.UrbanGlbSceneBuilder.createStage(baseCfg, ecsWorld, prepared);
  assert.ok(stage.ambientFill && stage.ambientFill.isAmbientLight, 'Dedicated UrbanAmbientFillLight present');
  const roadA = prepared.nodes.cidade.getObjectByName('Cidade_Object_64');
  const roadB = prepared.nodes.cidade.getObjectByName('Cidade_Object_67');
  assert.equal(roadA.material, roadB.material, 'Both adjoining asphalt halves share a material');
  assert.equal(roadA.material.roughnessMap, null, 'Baked roughness map no longer creates inconsistent specular patches');
  assert.ok(roadA.material.map, 'Original road albedo and lane markings remain');
  assert.equal(roadA.material.userData.asciiRoadSurface, true);
  assert.equal(roadA.material.fog, false, 'dark road is not washed toward fog color');
  assert.ok(prepared.materials.sidewalks.every(m => !m.userData.asciiRoadSurface));
  assert.ok(prepared.materials.character.every(m => !m.userData.asciiRoadSurface));
  assert.ok(prepared.materials.carBody.every(m => !m.userData.asciiRoadSurface));
  const roadPass = new pkg.NormalPassMaterialCache();
  roadPass.beginPass(stage.scene);
  assert.equal(roadA.material.opacity, 0);
  assert.equal(roadB.material.opacity, 0);
  const sidewalkMesh = prepared.nodes.cidade.getObjectByName('Cidade_Object_61');
  assert.equal(sidewalkMesh.material.opacity, 1, 'sidewalk does not receive road grade');
  roadPass.endPass();
  roadPass.dispose();
  assert.ok(roadA.matrixWorld.determinant() * roadB.matrixWorld.determinant() < 0, 'Second road tile has mirrored transform');
  for (const mesh of [roadA, roadB]) {
    assert.equal(mesh.receiveShadow, false, 'Identical shadow policy across road tiles');
    assert.equal(mesh.material.normalScale.length(), 0, 'Mirrored tangent map cannot split road lighting');
  }
  const girl = prepared.nodes.playerRig.getObjectByName('FuturisticGirl');
  assert.ok(girl.isSkinnedMesh && girl.geometry.getAttribute('uv'));
  assert.equal(girl.material.name, 'PlayerProtagonistMaterial');
  assert.equal(girl.material.map, null, 'GLB has UVs but no assigned character base-color map');
  assert.ok(prepared.materials.character.every(m => m.color.r < 0.5 && m.roughness >= 0.7));

  pkg.UrbanGlbSceneBuilder.applyAtmosphere(
    stage,
    Object.assign({}, baseCfg, {
      atmosphere: 'day',
      palette: Object.assign({}, pkg.DEFAULT_PALETTE, { background: '#213242', coolAmbient: '#9EB4C8', warmLight: '#C9A86A' })
    }),
    ecsWorld
  );
  const dayKey = stage.keyDirLight.intensity;
  const dayHemi = stage.ambientHemi.intensity;
  const dayAmb = stage.ambientFill.intensity;
  const dayFog = stage.scene.fog.density;
  const dayRoadScale = prepared.materials.roads[0].color.g;

  pkg.UrbanGlbSceneBuilder.applyAtmosphere(
    stage,
    Object.assign({}, baseCfg, {
      atmosphere: 'night',
      palette: Object.assign({}, pkg.DEFAULT_PALETTE, { background: '#0E161F', coolAmbient: '#7D92A6', warmLight: '#5C8E92' })
    }),
    ecsWorld
  );
  const nightKey = stage.keyDirLight.intensity;
  const nightHemi = stage.ambientHemi.intensity;
  const nightAmb = stage.ambientFill.intensity;
  const nightFog = stage.scene.fog.density;
  const nightRoadScale = prepared.materials.roads[0].color.g;
  const nightLamp = stage.urbanLightRig.streetLampWest.intensity;

  pkg.UrbanGlbSceneBuilder.applyAtmosphere(
    stage,
    Object.assign({}, baseCfg, {
      atmosphere: 'rain',
      palette: Object.assign({}, pkg.DEFAULT_PALETTE, { background: '#111C27', coolAmbient: '#7890A6', warmLight: '#5A909C' })
    }),
    ecsWorld
  );
  const rainAmb = stage.ambientFill.intensity;
  const rainFog = stage.scene.fog.density;
  const rainLamp = stage.urbanLightRig.streetLampWest.intensity;

  for (const atmosphere of ['day', 'night', 'rain']) {
    const values = [];
    for (const reflectionStrength of [0, 0.25, 1]) {
      pkg.UrbanGlbSceneBuilder.applyAtmosphere(stage, { ...baseCfg, atmosphere, reflectionStrength }, ecsWorld);
      values.push({ road: roadA.material.roughness, sidewalk: prepared.materials.sidewalks[0].roughness });
      assert.equal(roadA.material.normalScale.length(), 0);
      assert.ok(roadA.material.metalness <= 0.02);
      assert.ok(prepared.materials.sidewalks[0].metalness <= 0.02);
    }
    assert.ok(values[0].road > values[1].road && values[1].road > values[2].road);
    assert.ok(values[0].sidewalk > values[1].sidewalk && values[1].sidewalk > values[2].sidewalk);
    assert.ok(values[2].road >= 0.78 && values[2].sidewalk >= 0.72, '100% reflection remains bounded');
  }

  // Verify clear preset hierarchy: day wide sunlight >> storm/night, night local lamps >> day, rain fog > night > day
  assert.ok(dayKey > nightKey && dayKey < 3.0, `Day key (${dayKey}) remains stronger but avoids previous overexposure`);
  assert.ok(dayHemi > nightHemi && dayAmb > nightAmb, 'Day sky/ambient fill brighter than night');
  assert.ok(dayRoadScale > nightRoadScale && dayRoadScale < 8 && nightRoadScale >= 5, 'road texture albedo compensated without prior extreme gain');
  assert.ok(rainAmb > nightAmb && rainLamp > nightLamp && nightLamp > 15.0, 'Rain storm fill and wet lamp reflections stronger than dry night');
  assert.ok(dayFog < nightFog && nightFog < rainFog, `Fog density hierarchy preserved: day (${dayFog}) < night (${nightFog}) < rain (${rainFog})`);

  prepared.dispose();
  loader.dispose();
  pkg.LifecycleManager.disposeObject3D(stage.scene);
});
