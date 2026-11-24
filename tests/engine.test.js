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
