/* Integration-only entry: bundles the public engine facade plus THREE so the
   portfolio can create custom entities (the 3D penguin) without touching core. */
export {
  AsciiSceneEngine,
  DEFAULT_ENGINE_CONFIG,
  DEFAULT_PALETTE,
} from './src/index';

export * as THREE from 'three';
