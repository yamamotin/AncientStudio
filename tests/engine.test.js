'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const adapter = readFileSync(path.join(root, 'assets/js/engine-adapter.js'), 'utf8');
const core = readFileSync(path.join(root, 'ascii-engine-module/src/index.ts'), 'utf8');
const engineCore = readFileSync(path.join(root, 'ascii-engine-module/src/core/AsciiEngineCore.ts'), 'utf8');

test('engine core keeps its public facade intact', () => {
  includesAll(core, ['export class AsciiSceneEngine', 'mount', 'updateConfig', 'destroy']);
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
});

test('playground presets cover day/night and weather lighting', () => {
  includesAll(adapter, ['sanctuary', 'dawn', 'day', 'storm', 'emerald']);
});
