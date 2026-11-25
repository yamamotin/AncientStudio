'use strict';

const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const adapter = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');
const core = readFileSync(path.join(root, 'ascii-engine-module/src/index.ts'), 'utf8');
const engineCore = readFileSync(path.join(root, 'ascii-engine-module/src/core/AsciiEngineCore.ts'), 'utf8');

test('engine core keeps its public facade intact', () => {
  includesAll(core, ['export class AsciiSceneEngine', 'mount', 'pause', 'resume', 'updateConfig', 'destroy']);
});

test('adapter uses the real facade and preserves scroll-friendly pointer input', () => {
  includesAll(adapter, [
    'AsciiSceneEngine',
    'pointermove',
    'passive: true',
    'ResizeObserver',
    'requestAnimationFrame'
  ]);
  assert.match(adapter, /setAutoOrbit[\s\S]*PointerEvent/);
});

test('adapter exposes the integration surface requested by the UI', () => {
  includesAll(adapter, ['mount', 'setPaused', 'setPreset', 'destroy']);
});

test('engine uses passive pointer listeners (no scroll blocking)', () => {
  assert.match(engineCore, /addEventListener\('pointermove',[\s\S]{0,200}\{ passive: true \}/);
  const pointerInput = readFileSync(
    path.join(root, 'ascii-engine-module/src/input/PointerInput.ts'),
    'utf8'
  );
  includesAll(pointerInput, ['pointerdown', 'pointermove', 'pointerup', '{ passive: true }']);
});

test('playground exposes exactly three scene modes', () => {
  includesAll(adapter, [
    'DEFAULT_MODE = \'night\'',
    'SCENE_MODES = [\'day\', \'night\', \'rain\']',
    "mode !== 'rain'",
    'atmosphere: atmosphere',
    'blockBlendWeight: preset.blockBlendWeight',
    'windStrength: preset.windStrength',
    'blockBlendWeight: 0.28',
    'cellSize: 8',
    'touchstart',
    'touchmove'
  ]);
  assert.doesNotMatch(adapter, /sanctuary|dawn|storm|emerald|setCycle|syncPalette/);
});

test('neofetch penguin auto-rotates without mouse or touch interaction', () => {
  const neofetch = readFileSync(path.join(root, 'assets/js/neofetch.js'), 'utf8');

  // Fallback: continuous RAF yaw driven by elapsed time, not by pointer state.
  includesAll(neofetch, [
    'AUTO_SPIN_RAD_PER_SEC',
    'state.yaw += delta * AUTO_SPIN_RAD_PER_SEC',
    'renderPenguinAscii',
    'penguin-stage'
  ]);
  assert.doesNotMatch(neofetch, /pointermove|pointerdown|updateFromClientPoint/);

  // Engine: the mascot stage is pointer-inert via CSS and one integration-only
  // group rotates the Tux root on yaw only; no pitch/badge updates remain.
  includesAll(adapter, [
    'TuxMascotRoot',
    'TuxAutoSpin',
    'data-pointer-locked',
    'data-auto-spin',
    'getScene'
  ]);
  assert.doesNotMatch(neofetch, /angleBadge|state\.pitch|setAngles/);
  assert.doesNotMatch(adapter, /updatePenguinFromPointer|penguinTargetYaw|windowPointerListener|stopImmediatePropagation/);
});

test('modular engine architecture exposes ECS, Lifecycle, World, Entities, VFX, and Input modules', () => {
  const expectedFiles = [
    'ascii-engine-module/src/core/EngineLoop.ts',
    'ascii-engine-module/src/core/LifecycleManager.ts',
    'ascii-engine-module/src/core/ResolutionController.ts',
    'ascii-engine-module/src/ecs/World.ts',
    'ascii-engine-module/src/ecs/SystemRunner.ts',
    'ascii-engine-module/src/world/MapLoader.ts',
    'ascii-engine-module/src/world/PlaygroundSceneBuilder.ts',
    'ascii-engine-module/src/entities/TuxEntityFactory.ts',
    'ascii-engine-module/src/entities/PlaygroundEntityFactory.ts',
    'ascii-engine-module/src/animation/AnimationSystem.ts',
    'ascii-engine-module/src/vfx/VfxController.ts',
    'ascii-engine-module/src/input/PointerInput.ts',
    'ascii-engine-module/src/input/KeyboardInput.ts'
  ];

  for (const rel of expectedFiles) {
    assert.ok(existsSync(path.join(root, rel)), `Missing module: ${rel}`);
  }
});

test('built portfolio IIFE bundle executes cleanly and runs ECS, TuxEntityFactory, and MapLoader', async () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  assert.ok(existsSync(bundlePath), 'Built portfolio bundle assets/js/ascii-engine.bundle.js must exist');

  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => ({ getContext: () => null }) },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const enginePkg = sandbox.ASCIIRealms;
  assert.ok(enginePkg && typeof enginePkg.AsciiSceneEngine === 'function', 'ASCIIRealms.AsciiSceneEngine exported');

  const THREE = enginePkg.THREE;
  const ecs = new enginePkg.World();
  const scene = new THREE.Scene();

  const { entityId, rootGroup } = enginePkg.TuxEntityFactory.spawn(ecs, scene, {
    position: [0, 0, 0],
    includeShowcaseRig: true
  });

  assert.equal(ecs.getEntityCount(), 1, 'Tux entity registered in ECS World');
  assert.ok(ecs.hasComponent(entityId, 'Transform'));
  assert.ok(ecs.hasComponent(entityId, 'RotationTarget'));
  assert.ok(ecs.hasComponent(entityId, 'AnimationState'));
  assert.ok(ecs.hasComponent(entityId, 'InputState'));
  assert.ok(ecs.hasComponent(entityId, 'Renderable'));

  // Simulate pointer target yaw/pitch and run Movement + Animation + RenderSync systems
  const input = ecs.getComponent(entityId, 'InputState');
  const rotTarget = ecs.getComponent(entityId, 'RotationTarget');
  input.pointerActive = true;
  rotTarget.targetYaw = 0.85;
  rotTarget.targetPitch = -0.22;

  const runner = new enginePkg.SystemRunner()
    .addSystem(new enginePkg.MovementRotationSystem())
    .addSystem(new enginePkg.AnimationSystem())
    .addSystem(new enginePkg.RenderSyncSystem());

  runner.run(ecs, { dt: 0.05, elapsed: 0.5 });

  const transform = ecs.getComponent(entityId, 'Transform');
  assert.ok(transform.rotY > 0.2, 'Tux smoothly lerps yaw toward pointer target');
  assert.ok(transform.rotX < -0.02, 'Tux smoothly lerps pitch toward pointer target');
  assert.equal(rootGroup.rotation.y, transform.rotY, 'RenderSyncSystem syncs Three.js Object3D');

  // Verify MapLoader consolidates exclusively onto the single cyberpunk-citadel scenario
  assert.deepEqual(Array.from(enginePkg.MapLoader.listMapIds()), ['cyberpunk-citadel']);
  const mapDef = enginePkg.MapLoader.load('cyberpunk-citadel');
  assert.equal(mapDef.id, 'cyberpunk-citadel');
  assert.ok(mapDef.buildings.length === 14 && mapDef.braziers.length === 2);

  // Verify KeyboardInput stays disabled by default so page shortcuts/scroll are never hijacked
  const kb = new enginePkg.KeyboardInput();
  assert.equal(kb.isEnabled(), false);
  const axes = kb.sampleAxes();
  assert.equal(axes.moveX, 0);
  assert.equal(axes.moveZ, 0);
  assert.equal(axes.interactPressed, false);

  // Verify centralized LifecycleManager.disposeObject3D cleans scene cleanly
  enginePkg.LifecycleManager.disposeObject3D(scene);
  assert.equal(scene.children.length, 0);
});

test('adaptive resolution & shader pipeline enforce DPR caps, subpixel guardrails, and water reflection sync', () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  const asciiShader = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'),
    'utf8'
  );
  const waterShader = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/waterShader.ts'),
    'utf8'
  );
  const sceneBuilder = readFileSync(
    path.join(root, 'ascii-engine-module/src/world/PlaygroundSceneBuilder.ts'),
    'utf8'
  );
  const neofetchSrc = readFileSync(path.join(root, 'assets/js/neofetch.js'), 'utf8');

  // 1. Shader & mesh audit assertions: subdivided water plane, mirrored point reflections, sub-cell supersampling & cursor sync
  includesAll(asciiShader, ['uSubCellSpread', 'sampleCellIntegrated', 'smoothstep']);
  includesAll(waterShader, ['mirroredLight', 'hiFreqFade', 'uCursorPos', 'uTorch0']);
  assert.match(sceneBuilder, /PlaneGeometry\(mapDef\.waterSize,\s*mapDef\.waterSize,\s*48,\s*48\)/);
  includesAll(engineCore, ['uCursorPos', 'uCursorIntensity', 'uTorch0', 'computeAdaptiveResolution']);

  // 2. Run ResolutionController across mobile coarse, Retina HD, and 4K UHD profiles via built bundle
  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => ({ getContext: () => null }) },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const { computeAdaptiveResolution, DEFAULT_ENGINE_CONFIG } = sandbox.ASCIIRealms;
  assert.equal(typeof computeAdaptiveResolution, 'function');

  // Mobile 360x300 @ DPR 3.0 (coarse pointer) -> DPR capped at 1.5, larger legible cells, 1/4 bloom
  const mobileRes = computeAdaptiveResolution({
    cssWidth: 360,
    cssHeight: 300,
    devicePixelRatio: 3.0,
    config: DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: true
  });
  assert.equal(mobileRes.tier, 'mobile');
  assert.ok(mobileRes.effectiveDpr <= 1.5, 'Mobile DPR capped at 1.5 for 60 FPS');
  assert.ok(mobileRes.activeCellSize >= 11, 'Mobile enlarges cells for crisp readability');
  assert.equal(mobileRes.bloomDownsample, 4);

  // Desktop Retina 1440x680 @ DPR 2.5 -> DPR capped at maxPixelRatio (2.0), 96px HiDPI atlas, crisp dense grid
  const uhdRes = computeAdaptiveResolution({
    cssWidth: 1440,
    cssHeight: 680,
    devicePixelRatio: 2.5,
    config: DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: false
  });
  assert.equal(uhdRes.tier, 'uhd');
  assert.equal(uhdRes.effectiveDpr, 2);
  assert.equal(uhdRes.atlasTileSize, 96);
  assert.ok(uhdRes.columns <= 190 && uhdRes.columns > mobileRes.columns, 'Desktop scales up density within anti-noise cap');
  assert.ok(uhdRes.cellPhysW >= 6 && uhdRes.cellPhysH >= 8, 'Integer physical cells never collapse to subpixel dust');

  // Extreme 4K 3840x1600 @ DPR 2.0 -> column cap guardrail prevents subpixel noise
  const extreme4k = computeAdaptiveResolution({
    cssWidth: 3840,
    cssHeight: 1600,
    devicePixelRatio: 2.0,
    config: DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: false
  });
  assert.ok(extreme4k.columns <= 190, '4K viewport respects max column cap to preserve ASCII aesthetic');

  // Mascot mode (Neofetch Tux) -> tight 24..78 column guardrail matching Tux reference art
  const mascotRes = computeAdaptiveResolution({
    cssWidth: 420,
    cssHeight: 240,
    devicePixelRatio: 2.0,
    config: Object.assign({}, DEFAULT_ENGINE_CONFIG, { mode: 'mascot', cellSize: 8 }),
    isCoarsePointer: false
  });
  assert.ok(mascotRes.columns >= 24 && mascotRes.columns <= 78);

  // 3. Fallback neofetch adaptive grid parity
  const nfSandbox = {
    window: {
      innerWidth: 1280,
      innerHeight: 800,
      matchMedia: () => ({ matches: false }),
      addEventListener: () => {}
    },
    document: { querySelector: () => null, getElementById: () => null, addEventListener: () => {} }
  };
  nfSandbox.window.TP = {};
  nfSandbox.TP = nfSandbox.window.TP;
  vm.createContext(nfSandbox);
  vm.runInContext(neofetchSrc, nfSandbox);

  const desktopFallback = nfSandbox.TP.neofetch.computeFallbackGrid(440, 240);
  const compactFallback = nfSandbox.TP.neofetch.computeFallbackGrid(220, 180);
  assert.ok(desktopFallback.cols > compactFallback.cols, 'Fallback raycaster scales Tux grid density with stage width');
});

test('ECS ordered pipeline, WebGL disposal lifecycle, Cyberpunk scene builder & smooth resolution transitions work end-to-end', () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => ({ getContext: () => null }) },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const pkg = sandbox.ASCIIRealms;

  // 1. Deterministic priority ordering & removal in SystemRunner
  const runner = new pkg.SystemRunner();
  runner
    .addSystem(new pkg.RenderSyncSystem(), 40)
    .addSystem(new pkg.PatrolSystem(), 15)
    .addSystem(new pkg.NeonPulseSystem(), 35)
    .addSystem(new pkg.AnimationSystem(), 30);

  const names = runner.getSystemNames();
  assert.equal(names[0], 'PatrolSystem');
  assert.equal(names[1], 'AnimationSystem');
  assert.equal(names[2], 'NeonPulseSystem');
  assert.equal(names[3], 'RenderSyncSystem');
  assert.equal(runner.removeSystem('NeonPulseSystem'), true);
  assert.equal(runner.getSystemNames().length, 3);

  // 2. Cyberpunk scene construction + ECS entity components + GPU disposal on World.destroyEntity / clear
  const ecsWorld = new pkg.World();
  const cyberMap = pkg.MapLoader.load('cyberpunk-citadel');
  assert.equal(cyberMap.id, 'cyberpunk-citadel');
  assert.equal(cyberMap.themeStyle, 'cyberpunk');
  assert.ok(cyberMap.buildings.length >= 10, 'Cyberpunk skyline includes urban megastructures');
  assert.ok(cyberMap.drones.length >= 2, 'Cyberpunk skyline includes aerial hover-spinners');

  const built = pkg.PlaygroundSceneBuilder.build(cyberMap, pkg.DEFAULT_ENGINE_CONFIG, ecsWorld);
  assert.ok(built.scene.fog, 'Cyberpunk scene includes depth fog');
  assert.ok(ecsWorld.getEntityCount() >= 6, 'Spawns holo-reactor, neon pylons, hover-drones, and cyber-netrunner');

  const droneEntities = ecsWorld.query('Transform', 'PatrolPath', 'NeonBeacon');
  assert.ok(droneEntities.length >= 2, 'Hover-drones carry Transform + PatrolPath + NeonBeacon components');

  const droneId = droneEntities[0];
  const beforeX = ecsWorld.getComponent(droneId, 'Transform').x;

  const fullRunner = new pkg.SystemRunner()
    .addSystem(new pkg.PatrolSystem(), 15)
    .addSystem(new pkg.MovementRotationSystem(built.terrainHeightAt), 20)
    .addSystem(new pkg.AnimationSystem(), 30)
    .addSystem(new pkg.NeonPulseSystem(), 35)
    .addSystem(new pkg.RenderSyncSystem(), 40);

  fullRunner.run(ecsWorld, { dt: 0.05, elapsed: 1.25 });
  const afterX = ecsWorld.getComponent(droneId, 'Transform').x;
  assert.notEqual(beforeX, afterX, 'PatrolSystem moves hover-drone along cyberpunk skyline corridor');

  // Verify clean WebGL resource disposal & scene detachment when destroying an ECS entity
  const countBeforeDestroy = ecsWorld.getEntityCount();
  const droneRenderable = ecsWorld.getComponent(droneId, 'Renderable');
  assert.ok(droneRenderable.object3D.parent !== null, 'Drone mesh attached to scene depth layer group');
  assert.equal(ecsWorld.destroyEntity(droneId, true), true);
  assert.equal(ecsWorld.getEntityCount(), countBeforeDestroy - 1);
  assert.equal(droneRenderable.object3D.parent, null, 'destroyEntity detaches and disposes Object3D');

  ecsWorld.clear(true);
  assert.equal(ecsWorld.getEntityCount(), 0, 'World.clear disposes all remaining entities');
  pkg.LifecycleManager.disposeObject3D(built.scene);
  assert.equal(built.scene.children.length, 0);

  // 3. Smooth resolution & fullscreen cell-density transition controller
  const transition = new pkg.ResolutionTransitionController(14.0);
  const compactProfile = pkg.computeAdaptiveResolution({
    cssWidth: 620,
    cssHeight: 360,
    devicePixelRatio: 1.5,
    config: pkg.DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: false,
    isFullscreen: false
  });
  const fullscreenProfile = pkg.computeAdaptiveResolution({
    cssWidth: 1920,
    cssHeight: 1080,
    devicePixelRatio: 2.0,
    config: pkg.DEFAULT_ENGINE_CONFIG,
    isCoarsePointer: false,
    isFullscreen: true
  });

  transition.setTarget(compactProfile, true);
  const initialSnap = transition.step(0);
  assert.equal(initialSnap.isTransitioning, false);
  assert.equal(initialSnap.cellH, compactProfile.cellPhysH);

  // Expand to fullscreen -> smooth intermediate interpolation followed by exact integer snap
  transition.setTarget(fullscreenProfile, false);
  const midStep = transition.step(0.016);
  assert.equal(midStep.isTransitioning, true, 'Fullscreen expansion interpolates smoothly without abrupt jump');
  assert.ok(
    midStep.cellH > Math.min(compactProfile.cellPhysH, fullscreenProfile.cellPhysH) &&
      midStep.cellH < Math.max(compactProfile.cellPhysH, fullscreenProfile.cellPhysH),
    'Intermediate frame smoothly blends physical cell height'
  );

  // Advance ~0.8s so exponential damping settles and snaps cleanly to exact integer grid
  let settled = midStep;
  for (let i = 0; i < 50; i += 1) {
    settled = transition.step(0.02);
  }
  assert.equal(settled.isTransitioning, false, 'Transition settles cleanly with zero residual drift');
  assert.equal(settled.cellW, fullscreenProfile.cellPhysW);
  assert.equal(settled.cellH, fullscreenProfile.cellPhysH);
});

test('GPU lighten block-detail blend (~35%), WindSystem street props, and scroll-safe touch input work end-to-end', () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  const asciiShader = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'),
    'utf8'
  );
  const atlasSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/glyphAtlas.ts'),
    'utf8'
  );
  const pointerSrc = readFileSync(
    path.join(root, 'ascii-engine-module/src/input/PointerInput.ts'),
    'utf8'
  );

  // 1. Verify ~35% GPU lighten block-vs-detail composition in shader & procedural block tiles in atlas
  includesAll(asciiShader, ['uBlockBlendWeight', 'uBlockCount', 'max(detailGlyphMask']);
  includesAll(atlasSrc, ['blockCount = 4', 'bayer4']);
  includesAll(pointerSrc, ['touchstart', 'touchmove', 'touchend', 'pan-y', '{ passive: true }']);

  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => ({ getContext: () => null }) },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const pkg = sandbox.ASCIIRealms;
  assert.equal(pkg.DEFAULT_ENGINE_CONFIG.blockBlendWeight, 0.35, 'Default lighten block weight is ~35%');
  assert.equal(pkg.DEFAULT_ENGINE_CONFIG.windStrength, 1.0, 'Default wind strength active');

  // 2. Verify layered Cyberpunk street props (streetpoles, hanging banners, overhead cables) & WindSystem
  const ecsWorld = new pkg.World();
  const cyberMap = pkg.MapLoader.load('cyberpunk-citadel');
  assert.ok(cyberMap.buildings.length >= 14, 'Layered foreground/midground/background cyberpunk buildings');
  assert.ok(cyberMap.streetPoles.length >= 6, 'Street poles line both sides of the nocturnal boulevard');

  const built = pkg.PlaygroundSceneBuilder.build(cyberMap, pkg.DEFAULT_ENGINE_CONFIG, ecsWorld);
  const windEntities = ecsWorld.query('Transform', 'WindSway');
  assert.ok(windEntities.length >= 8, 'Hanging neon banners & overhead cables carry WindSway components');

  const sampleWindId = windEntities[0];
  const initialRotZ = ecsWorld.getComponent(sampleWindId, 'Transform').rotZ;
  const windSys = new pkg.WindSystem(1.2);
  windSys.update(ecsWorld, { dt: 0.033, elapsed: 1.4 });
  const swayedRotZ = ecsWorld.getComponent(sampleWindId, 'Transform').rotZ;
  assert.notEqual(initialRotZ, swayedRotZ, 'WindSystem oscillates suspended street banners & cables');

  // Verify central Netrunner avatar has articulated coatTail & high-contrast body components
  const avatarAnim = ecsWorld.getComponent(built.avatarEntityId, 'AnimationState');
  assert.ok(avatarAnim && avatarAnim.parts && avatarAnim.parts.coatTail, 'Central Netrunner has wind-animated coatTail');

  // 3. Verify PointerInput touchstart -> touchmove -> touchend drives dragYaw/normX passively without blocking scroll
  const listeners = {};
  const listenerOpts = {};
  const mockContainer = {
    style: {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 300 }),
    addEventListener(type, fn, opts) {
      listeners[type] = fn;
      listenerOpts[type] = opts;
    },
    removeEventListener(type) {
      delete listeners[type];
    }
  };

  const ptr = new pkg.PointerInput(mockContainer);
  ptr.attach();
  assert.equal(mockContainer.style.touchAction, 'pan-y', 'Preserves vertical page scrolling via touch-action: pan-y');
  assert.equal(listenerOpts.touchstart.passive, true);
  assert.equal(listenerOpts.touchmove.passive, true);
  assert.equal(listenerOpts.touchend.passive, true);

  listeners.touchstart({
    isTrusted: true,
    changedTouches: [{ identifier: 1, clientX: 200, clientY: 150 }]
  });
  listeners.touchmove({
    isTrusted: true,
    changedTouches: [{ identifier: 1, clientX: 290, clientY: 120 }]
  });

  const activeSnap = ptr.sample(0.016);
  assert.equal(activeSnap.isTouch, true);
  assert.equal(activeSnap.active, true);
  assert.ok(activeSnap.dragYaw > 0.5, 'Horizontal touch swipe pans street camera smoothly');
  assert.ok(activeSnap.normX > 0.3, 'Touch coordinates normalize cleanly to stage');

  listeners.touchend({ touches: [] });
  const releasedSnap = ptr.sample(0.016);
  assert.equal(releasedSnap.isDown, false);
  assert.equal(releasedSnap.active, true, 'Briefly holds view angle after finger release before smooth relax');

  ptr.detach();
  ecsWorld.clear(true);
  pkg.LifecycleManager.disposeObject3D(built.scene);
});

test('SceneComposerKit, SceneDepthRig & EntityBlueprintRegistry compose layered cyberpunk scenes cleanly', () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  assert.ok(
    existsSync(path.join(root, 'ascii-engine-module/src/ecs/EntityBlueprint.ts')),
    'EntityBlueprint.ts module exists'
  );
  assert.ok(
    existsSync(path.join(root, 'ascii-engine-module/src/world/SceneComposerKit.ts')),
    'SceneComposerKit.ts module exists'
  );

  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => ({ getContext: () => null }) },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const pkg = sandbox.ASCIIRealms;
  assert.equal(typeof pkg.EntityBlueprintRegistry, 'function');
  assert.equal(typeof pkg.SceneComposerKit, 'function');
  assert.equal(typeof pkg.SceneDepthRig, 'function');

  const ecsWorld = new pkg.World();
  const cyberMap = pkg.MapLoader.load('cyberpunk-citadel');
  const built = pkg.PlaygroundSceneBuilder.build(cyberMap, pkg.DEFAULT_ENGINE_CONFIG, ecsWorld);

  // 1. DepthRig groups organize foreground, midground, background & sky layers
  assert.ok(built.depthRig.foreground.children.length > 0, 'Foreground layer populated');
  assert.ok(built.depthRig.midground.children.length > 0, 'Midground layer populated');
  assert.ok(built.depthRig.background.children.length > 0, 'Background layer populated');
  assert.ok(built.depthRig.sky.children.length > 0, 'Sky layer populated');

  // 2. ECS DepthLayer & Blueprint Registry queries
  const fgEntities = ecsWorld.queryByLayer('foreground');
  const mgEntities = ecsWorld.queryByLayer('midground');
  assert.ok(fgEntities.includes(built.avatarEntityId), 'Central Netrunner protagonist sits in foreground layer');
  assert.ok(mgEntities.includes(built.shrineEntityId), 'Holo-Reactor sits in midground layer');
  assert.equal(
    ecsWorld.getComponent(built.avatarEntityId, 'DepthLayer').contrastPriority,
    1.0,
    'Foreground protagonist carries top silhouette contrast priority'
  );

  // 3. Blueprint Registry lists all reusable cyberpunk prefabs & supports role-scoped disposal
  const bpIds = built.blueprintRegistry.listIds();
  assert.ok(bpIds.includes('cyber.netrunner-avatar'));
  assert.ok(bpIds.includes('cyber.wind-banner'));
  assert.ok(bpIds.includes('cyber.hover-drone'));

  const removedVehicles = ecsWorld.destroyEntitiesByRole('vehicle', true);
  assert.ok(removedVehicles >= 3, 'destroyEntitiesByRole cleanly removes and disposes all hover-spinners');

  // 4. Palette live-update via NeonMaterialBank
  built.materialBank.updatePalette({
    background: '#020308',
    warmLight: '#00FFAA',
    warmCore: '#FFEE55',
    coolAmbient: '#22CCFF',
    foliageAccent: '#5588FF',
    cursorLight: '#FFFFFF'
  });
  assert.ok(built.materialBank.magenta.color.g > 0.8, 'NeonMaterialBank updates shared emissive materials in one call');

  ecsWorld.clear(true);
  pkg.LifecycleManager.disposeObject3D(built.scene);
});

test('single scenario supports Dia/Noite/Com chuva modes, calibrated PCF street shadows, and grid-free 5:8 glyph rendering', () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  const asciiShader = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/asciiShader.ts'),
    'utf8'
  );
  const waterShader = readFileSync(
    path.join(root, 'ascii-engine-module/src/shaders/waterShader.ts'),
    'utf8'
  );

  // 1. Legacy unused island noise & RPG presets removed; HTML exposes Noite / Dia / Com chuva
  assert.equal(
    existsSync(path.join(root, 'ascii-engine-module/src/scene/noise.ts')),
    false,
    'Unused legacy island noise module removed'
  );
  includesAll(html, [
    'data-scene-mode="day"',
    'data-scene-mode="night"',
    'data-scene-mode="rain"'
  ]);
  assert.doesNotMatch(html, /value="sanctuary"|value="emerald"/);

  // 2. Shader verification: street shader samples real-time directional PCF shadow map; ASCII shader eliminates grid seams
  includesAll(waterShader, [
    'uDirShadowMap',
    'uDirShadowMatrix',
    'sampleDirectionalShadow',
    'unpackRGBAToDepth',
    'uWetness',
    'uRainIntensity',
    'uDaylight',
    'uAvatarPos'
  ]);
  includesAll(asciiShader, [
    'uAtlasTileSize',
    'floor(uResolution * 0.5)',
    '0.55 / safeTileDims',
    'smoothBackdrop',
    'uDaylight'
  ]);
  assert.doesNotMatch(
    asciiShader,
    /clamp\(glyphUv,\s*0\.04,\s*0\.96\)|mod\(floor\(gl_FragCoord\.y\s*\*\s*0\.5\)/,
    'Removed 4% square UV margin clamp and 2px scanline striping that caused inter-character grid lines'
  );

  // 3. Runtime verification of atmosphere modes, shadows, and 5:8 full-bleed glyph atlas
  const fillRectCalls = [];
  const mockCanvas = {
    width: 0,
    height: 0,
    getContext: () => ({
      clearRect: () => {},
      fillRect: (x, y, w, h) => {
        fillRectCalls.push({ x, y, w, h });
      },
      fillText: () => {},
      font: '',
      textAlign: '',
      textBaseline: '',
      fillStyle: ''
    })
  };

  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => mockCanvas },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const pkg = sandbox.ASCIIRealms;
  assert.deepEqual(Array.from(pkg.MapLoader.listMapIds()), ['cyberpunk-citadel']);

  // Verify 5:8 proportional glyph atlas & gutter-free solid block fill (`pad = 0`)
  const atlas = pkg.createGlyphAtlas(' .:-=+*#%@', '|/-\\', 'monospace', 64);
  assert.equal(atlas.tileHeight, 64);
  assert.equal(atlas.tileWidth, 40, 'Atlas tile width matches 5:8 (0.625) monospace cell aspect');
  const solidBlockX = (atlas.totalGlyphs - 1) * atlas.tileWidth;
  const solidBlockFill = fillRectCalls.find(
    (c) => c.x === solidBlockX && c.y === 0 && c.w === atlas.tileWidth && c.h === atlas.tileHeight
  );
  assert.ok(solidBlockFill, 'Solid 100% block tile fills 100% of tileWidth x tileHeight with zero border gap');
  atlas.texture.dispose();

  // Verify shadows & Dia / Noite / Com chuva transitions on the unified scene
  const ecsWorld = new pkg.World();
  const mapDef = pkg.MapLoader.load('cyberpunk-citadel');
  const nightConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, { atmosphere: 'night' });
  const built = pkg.PlaygroundSceneBuilder.build(mapDef, nightConfig, ecsWorld);

  assert.equal(built.moonDirLight.castShadow, true, 'Primary directional light casts PCF shadows');
  assert.equal(built.moonDirLight.shadow.mapSize.width, 1536);
  assert.ok(built.moonDirLight.shadow.normalBias > 0, 'normalBias tuned to prevent shadow acne');

  let shadowCasterCount = 0;
  let shadowReceiverCount = 0;
  built.scene.traverse((obj) => {
    if (obj.isMesh && obj.castShadow) shadowCasterCount += 1;
    if (obj.isMesh && obj.receiveShadow) shadowReceiverCount += 1;
  });
  assert.ok(shadowCasterCount >= 40, 'Buildings, poles, overpass, props & protagonist cast shadows');
  assert.ok(shadowReceiverCount >= 20, 'Foundation, sidewalks, curbs & facades receive shadows');
  assert.ok(built.waterMaterial.uniforms.uDirShadowMap.value, 'Street shader initialized with shadow map texture');

  const vfx = new pkg.VfxController({
    scene: built.scene,
    config: nightConfig,
    baseCameraPos: mapDef.cameraAnchor,
    lookAtTarget: mapDef.cameraLookAt
  });

  // Night mode ("Noite"): stars visible, moderate wetness, NO rain particles or raindrop splashes
  assert.equal(vfx.isRainActive(), false);
  assert.equal(built.waterMaterial.uniforms.uRainIntensity.value, 0);
  assert.equal(built.waterMaterial.uniforms.uDaylight.value, 0);
  assert.equal(built.starPoints.visible, true);

  // Day mode ("Dia"): sunlit angle, stars & searchlights off, dry pavement, high-contrast solar shadows, NO rain
  const dayConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, {
    atmosphere: 'day',
    palette: Object.assign({}, pkg.DEFAULT_PALETTE, { background: '#1E3F66', coolAmbient: '#7AD4FF' })
  });
  pkg.PlaygroundSceneBuilder.applyAtmosphere(built, dayConfig);
  vfx.applyConfig(dayConfig);
  assert.equal(vfx.isRainActive(), false);
  assert.equal(built.waterMaterial.uniforms.uDaylight.value, 1.0);
  assert.equal(built.waterMaterial.uniforms.uRainIntensity.value, 0);
  assert.ok(built.waterMaterial.uniforms.uWetness.value < 0.2, 'Day mode uses dry sunlit asphalt');
  assert.equal(built.starPoints.visible, false, 'Stars hidden in Day mode');
  assert.ok(built.moonDirLight.intensity > 2.8, 'Solar directional light intensified in Day mode');

  // Rain mode ("Com chuva"): active rain streaks, flooded reflective pavement (`uWetness > 0.9`), raindrop ripples (`uRainIntensity === 1`)
  const rainConfig = Object.assign({}, pkg.DEFAULT_ENGINE_CONFIG, {
    atmosphere: 'rain',
    windStrength: 1.5
  });
  pkg.PlaygroundSceneBuilder.applyAtmosphere(built, rainConfig);
  vfx.applyConfig(rainConfig);
  assert.equal(vfx.isRainActive(), true, 'Rain particles active strictly in Com chuva mode');
  assert.equal(built.waterMaterial.uniforms.uRainIntensity.value, 1.0);
  assert.ok(built.waterMaterial.uniforms.uWetness.value > 0.9, 'Pavement mirror wetness maximized in Com chuva mode');
  assert.ok(built.scene.fog.density > 0.02, 'Atmospheric storm mist thickens in Com chuva mode');

  ecsWorld.clear(true);
  pkg.LifecycleManager.disposeObject3D(built.scene);
});

test('configurable per-object outline API is exported for on-demand targets, inactive by default, and supports optional highlightColor', () => {
  const bundlePath = path.join(root, 'assets/js/ascii-engine.bundle.js');
  assert.ok(
    existsSync(path.join(root, 'ascii-engine-module/src/shaders/objectOutline.ts')),
    'objectOutline.ts module exists'
  );

  const vm = require('node:vm');
  const sandbox = {
    window: {},
    self: {},
    document: { createElement: () => ({ getContext: () => null }) },
    navigator: { userAgent: 'node' },
    performance: { now: () => 0 }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(bundlePath, 'utf8'), sandbox);

  const pkg = sandbox.ASCIIRealms;
  assert.equal(typeof pkg.applyObjectOutline, 'function');
  assert.equal(typeof pkg.clearObjectOutline, 'function');
  assert.equal(typeof pkg.getObjectOutlineState, 'function');
  assert.equal(typeof pkg.AsciiSceneEngine.prototype.setObjectOutline, 'function');
  assert.equal(typeof pkg.AsciiSceneEngine.prototype.clearObjectOutline, 'function');
  assert.equal(typeof pkg.AsciiSceneEngine.prototype.getObjectOutlineState, 'function');

  // 1. Default spawns (Playground & Tux mascot) have ZERO outlines applied globally or on Tux
  const ecsWorld = new pkg.World();
  const mapDef = pkg.MapLoader.load('cyberpunk-citadel');
  const built = pkg.PlaygroundSceneBuilder.build(mapDef, pkg.DEFAULT_ENGINE_CONFIG, ecsWorld);

  let defaultPlaygroundOutlines = 0;
  built.scene.traverse((obj) => {
    if (obj.name === pkg.OUTLINE_SHELL_NAME || (obj.userData && obj.userData.__isAsciiOutlineShell)) {
      defaultPlaygroundOutlines += 1;
    }
  });
  assert.equal(defaultPlaygroundOutlines, 0, 'Playground has no global or default outline shells');

  const mascotScene = new pkg.THREE.Scene();
  const mascotEcs = new pkg.World();
  const { rootGroup: tuxRoot } = pkg.TuxEntityFactory.spawn(mascotEcs, mascotScene, {
    includeShowcaseRig: true
  });
  const bystanderBox = new pkg.THREE.Mesh(
    new pkg.THREE.BoxGeometry(1, 1, 1),
    new pkg.THREE.MeshStandardMaterial({ color: 0x223344 })
  );
  mascotScene.add(bystanderBox);

  assert.equal(pkg.getObjectOutlineState(tuxRoot), null, 'Tux has no outline active by default');
  assert.equal(pkg.getObjectOutlineState(bystanderBox), null);

  // 2. On-demand application on a specific target (with default highlightColor when omitted)
  const handle = pkg.applyObjectOutline(tuxRoot, { thickness: 1.4 });
  const initialState = handle.getState();
  assert.equal(initialState.enabled, true);
  assert.equal(initialState.thickness, 1.4);
  assert.equal(
    initialState.highlightColor,
    pkg.DEFAULT_OUTLINE_HIGHLIGHT_COLOR,
    'Uses high-visibility default highlightColor when omitted'
  );
  assert.ok(initialState.outlinedMeshCount >= 8, 'Outlines Tux body, head, beak, eyes, wings, feet & tail');

  // Verify bystander object in the same scene is completely unaffected (strictly per-target, not global)
  assert.equal(pkg.getObjectOutlineState(bystanderBox), null);
  let bystanderShells = 0;
  bystanderBox.traverse((obj) => {
    if (obj.name === pkg.OUTLINE_SHELL_NAME) bystanderShells += 1;
  });
  assert.equal(bystanderShells, 0, 'Non-targeted objects in scene receive zero outline shells');

  // Verify showcase pedestal plinth was skipped by default (`excludePedestal: true`)
  const plinth = tuxRoot.getObjectByName('TuxShowcasePlinth');
  assert.ok(plinth, 'TuxShowcasePlinth exists when includeShowcaseRig is true');
  assert.equal(
    plinth.children.some((c) => c.name === pkg.OUTLINE_SHELL_NAME),
    false,
    'Showcase floor plinth is excluded by default so only the character silhouette is outlined'
  );

  // 3. Dynamic update: custom highlightColor, width alias, and visibility toggle without reallocating shells
  const updated = handle.update({
    highlightColor: '#FFD166',
    width: 2.25,
    intensity: 2.4,
    opacity: 0.9
  });
  assert.equal(updated.highlightColor, '#FFD166', 'Custom highlightColor updates cleanly');
  assert.equal(updated.thickness, 2.25, 'width alias updates outline thickness');
  assert.equal(updated.intensity, 2.4);
  assert.equal(updated.opacity, 0.9);
  assert.equal(updated.outlinedMeshCount, initialState.outlinedMeshCount, 'Idempotent update creates zero duplicate shells');

  const hidden = handle.setVisible(false);
  assert.equal(hidden.enabled, false);
  let visibleShellsWhileHidden = 0;
  tuxRoot.traverse((obj) => {
    if (obj.name === pkg.OUTLINE_SHELL_NAME && obj.visible) visibleShellsWhileHidden += 1;
  });
  assert.equal(visibleShellsWhileHidden, 0, 'setVisible(false) hides all outline shells on target');

  // 4. Welded smooth corner normals on BoxGeometry (`aOutlineNormal` has symmetric ~0.577 components)
  pkg.applyObjectOutline(bystanderBox, { color: 0x00ffcc, thickness: 1.0 });
  const weldedAttr = bystanderBox.geometry.getAttribute('aOutlineNormal');
  assert.ok(weldedAttr && weldedAttr.count === 24, 'BoxGeometry receives welded smooth outline normals');
  assert.ok(
    Math.abs(Math.abs(weldedAttr.getX(0)) - 1 / Math.sqrt(3)) < 0.02 &&
      Math.abs(Math.abs(weldedAttr.getY(0)) - 1 / Math.sqrt(3)) < 0.02 &&
      Math.abs(Math.abs(weldedAttr.getZ(0)) - 1 / Math.sqrt(3)) < 0.02,
    'Cube corner welded normal is symmetric 1/sqrt(3) miter vector (gap-free corners)'
  );

  // 5. Clean disposal removes 100% of outline shells
  const removedCount = handle.dispose();
  assert.equal(removedCount, initialState.outlinedMeshCount);
  assert.equal(pkg.getObjectOutlineState(tuxRoot), null);
  let remainingShells = 0;
  tuxRoot.traverse((obj) => {
    if (obj.name === pkg.OUTLINE_SHELL_NAME) remainingShells += 1;
  });
  assert.equal(remainingShells, 0, 'dispose() detaches all outline shells cleanly');

  pkg.clearObjectOutline(bystanderBox);
  ecsWorld.clear(true);
  mascotEcs.clear(true);
  pkg.LifecycleManager.disposeObject3D(built.scene);
  pkg.LifecycleManager.disposeObject3D(mascotScene);
});
