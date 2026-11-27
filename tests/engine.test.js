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
    'pointermove',
    'passive: true',
    'ResizeObserver',
    'requestAnimationFrame'
  ]);
  assert.match(adapter, /setAutoOrbit[\s\S]*PointerEvent/);
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
  includesAll(pointerInput, ['pointerdown', 'pointermove', 'pointerup', '{ passive: true }']);
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
    'cellSize: 8',
    'touchstart',
    'touchmove'
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
  }

  // Cycle restart at t = 30.5s
  runner.run(ecsWorld, { dt: 0.016, elapsed: 30.5 });
  assert.equal(carRenderable.object3D.visible, true, 'Carro_Grupo reappears cleanly when 30s cycle restarts');
  assert.ok(carTraffic.headlightRight.intensity > 0, 'Headlights reactivate on cycle restart');

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
  assert.ok(prepared.materials.roads[0].roughness < 0.25, 'Mirror-wet reflective asphalt in rain mode');
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

  // 3. Adaptive resolution & smooth fullscreen transition controller
  const mobileRes = pkg.computeAdaptiveResolution({
    cssWidth: 360,
    cssHeight: 300,
    devicePixelRatio: 3.0,
    config: pkg.DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: true
  });
  assert.equal(mobileRes.tier, 'mobile');
  assert.ok(mobileRes.effectiveDpr <= 1.5);

  const extreme4k = pkg.computeAdaptiveResolution({
    cssWidth: 3840,
    cssHeight: 1600,
    devicePixelRatio: 2.0,
    config: pkg.DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: false
  });
  assert.ok(extreme4k.columns <= 190);

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
  passScene.add(mappedMesh, decalMesh);

  const passCache = new pkg.NormalPassMaterialCache();
  passCache.beginPass(passScene);
  assert.equal(decalMesh.visible, false, 'skipNormalPass decal hidden during Pass 2');
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
  assert.equal(mappedMesh.material, mappedMat, 'Original PBR material restored immediately after Pass 2');

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
});
