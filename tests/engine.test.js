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

test('playground presets cover day/night and weather lighting', () => {
  includesAll(adapter, ['sanctuary', 'dawn', 'day', 'storm', 'emerald']);
});

test('neofetch penguin tracks mouse pointer in both WebGL2 and fallback raycaster', () => {
  const neofetch = readFileSync(path.join(root, 'assets/js/neofetch.js'), 'utf8');
  includesAll(adapter, ['updatePenguinFromPointer', 'penguinTargetYaw', 'penguinTargetPitch', 'getScene']);
  includesAll(neofetch, ['renderPenguinAscii', 'pointermove', 'targetYaw', 'targetPitch', 'penguin-stage']);
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

  // Verify MapLoader loads lightweight sanctuary-isle definition
  const mapDef = enginePkg.MapLoader.load('sanctuary-isle');
  assert.equal(mapDef.id, 'sanctuary-isle');
  assert.ok(mapDef.trees.length > 0 && mapDef.braziers.length === 2);

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
  assert.ok(droneRenderable.object3D.parent === built.scene, 'Drone mesh attached to scene');
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
