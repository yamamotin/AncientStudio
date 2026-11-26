/**
 * @ascii-realms/engine-module
 * Public Facade & Modular Subsystems API
 */

export { AsciiEngineCore as AsciiSceneEngine, AsciiEngineCore } from './core/AsciiEngineCore';
export {
  DEFAULT_ASCII_RAMP,
  DEFAULT_DRACO_DECODER_PATH,
  DEFAULT_ENGINE_CONFIG,
  DEFAULT_PALETTE,
  DEFAULT_SCENE_MODEL_URL,
  mergeEngineConfig,
} from './core/defaultConfig';
export { EngineLoop, type LoopFrameInfo, type LoopTelemetry } from './core/EngineLoop';
export { LifecycleManager } from './core/LifecycleManager';
export {
  computeAdaptiveResolution,
  detectResolutionTier,
  type ResolutionInput,
  ResolutionTransitionController,
} from './core/ResolutionController';

export {
  type AnimationStateComponent,
  type ArticulatedParts,
  type CameraFollowComponent,
  type CharacterAnimationComponent,
  type CharacterClipName,
  type ComponentMap,
  type ComponentName,
  type DepthLayerComponent,
  type EntityId,
  type InputStateComponent,
  type LifecycleTagComponent,
  type NavigationTargetComponent,
  type RenderableComponent,
  type RotationTargetComponent,
  type SceneDepthLayerName,
  type SidewalkBoundsComponent,
  type SidewalkObstacleBox,
  type TrafficCycleComponent,
  type TransformComponent,
  type VelocityComponent,
  World,
} from './ecs/World';
export {
  CameraFollowSystem,
  clampToSidewalkBounds,
  type EcsSystem,
  InputSystem,
  MovementRotationSystem,
  RenderSyncSystem,
  type SystemContext,
  SystemRunner,
  TrafficFlowSystem,
} from './ecs/SystemRunner';

export {
  AnimationSystem,
  CharacterAnimationSystem,
  transitionCharacterClip,
} from './animation/AnimationSystem';
export { TuxEntityFactory, type TuxSpawnOptions } from './entities/TuxEntityFactory';
export { KeyboardInput, type KeyboardAxes, type KeyboardInputOptions } from './input/KeyboardInput';
export {
  PointerInput,
  type PointerInputOptions,
  type PointerSnapshot,
  type PointerTap,
} from './input/PointerInput';
export { AsciiPostProcessor, type PostProcessRenderMetrics } from './shaders/AsciiPostProcessor';
export { createGlyphAtlas, type GlyphAtlasData } from './shaders/glyphAtlas';
export {
  applyObjectOutline,
  clearObjectOutline,
  DEFAULT_OUTLINE_HIGHLIGHT_COLOR,
  ensureWeldedOutlineNormals,
  getObjectOutlineState,
  OUTLINE_SHELL_NAME,
} from './shaders/objectOutline';
export { VfxController, type VfxControllerOptions } from './vfx/VfxController';
export {
  extractAndPrepareGlbNodes,
  GLB_NODE_NAMES,
  GlbSceneLoader,
  type GlbSceneLoadOptions,
  normalizeCharacterClips,
  normalizeRelativeDecoderPath,
  normalizeRelativeModelUrl,
  type PreparedUrbanGlbAssets,
} from './world/GlbSceneLoader';
export {
  type BuiltMascotStage,
  MASCOT_BACKDROP_HEX,
  MASCOT_FLOOR_HEX,
  MascotStageBuilder,
} from './world/MascotStageBuilder';
export {
  DEFAULT_SCENE_GLB_URL,
  type LoadedSceneGlbAsset,
  REQUIRED_SCENE_NLA_TRACKS,
  REQUIRED_SCENE_ROOT_NODES,
  SceneGlbLoader,
  type SceneGlbLoaderOptions,
  type SceneGlbLoadMetrics,
} from './world/SceneGlbLoader';
export {
  type BuiltUrbanGlbStage,
  DEFAULT_URBAN_SIDEWALK_BOUNDS,
  URBAN_CAMERA_FOLLOW_DEFAULTS,
  URBAN_TRAFFIC_DEFAULTS,
  UrbanGlbSceneBuilder,
} from './world/UrbanGlbSceneBuilder';

export type {
  AtmosphereMode,
  EngineCallbacks,
  EngineConfig,
  EngineLifecycleState,
  EngineSceneMode,
  EngineStats,
  ObjectOutlineHandle,
  ObjectOutlineOptions,
  OutlineColorInput,
  OutlineTargetSelector,
  PartialEngineConfig,
  ResolutionProfile,
  ResolutionTier,
  ResolvedObjectOutlineState,
  SceneLoadProgress,
  ThemePalette,
  ViewportSize,
} from './types';
