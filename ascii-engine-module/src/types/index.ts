import type * as THREE from 'three';

/**
 * High-level operational mode for the engine instance:
 * - `'playground'`: Interactive 3D urban GLB scene (`cena_completa.glb`) with WASD + NLA character,
 *   fixed-direction 3rd-person camera, and 30s left-avenue traffic light cycle (`[ ASCII REALMS // SCENE ]`)
 * - `'mascot'`: Dedicated 3D Linux Tux penguin showcase (`[ STACK // NEOFETCH ]`)
 */
export type EngineSceneMode = 'playground' | 'mascot';

/**
 * Atmospheric / weather preset state for the unified urban scene:
 * - `'night'`: Nocturnal Cyber-Noir street with lit windows, crisp car headlights, and dry/damp asphalt
 * - `'day'`: Overcast steel-daylight street with crisp solar PCF shadows and subdued artificial lights
 * - `'rain'`: Storm-drenched street with mirror-wet asphalt reflections, denser mist, and 3D rain streaks
 */
export type AtmosphereMode = 'day' | 'night' | 'rain';

/**
 * Lifecycle state machine states for `AsciiSceneEngine`.
 */
export type EngineLifecycleState = 'idle' | 'running' | 'paused' | 'destroyed';

/**
 * Adaptive resolution tier computed from container dimensions and device pointer profile.
 */
export type ResolutionTier = 'mobile' | 'compact' | 'desktop' | 'hd' | 'uhd';

/**
 * Computed physical & logical grid metrics exposed to telemetry and shaders.
 */
export interface ResolutionProfile {
  tier: ResolutionTier;
  cssWidth: number;
  cssHeight: number;
  effectiveDpr: number;
  physicalWidth: number;
  physicalHeight: number;
  activeCellSize: number;
  cellPhysW: number;
  cellPhysH: number;
  columns: number;
  rows: number;
  atlasTileSize: number;
  subCellSampleSpread: number;
  bloomDownsample: number;
}

/**
 * Real-time engine performance & grid telemetry snapshot.
 */
export interface EngineStats {
  fps: number;
  frameTimeMs: number;
  activeCellSize: number;
  gridColumns: number;
  gridRows: number;
  drawCalls: number;
  triangles: number;
  entityCount: number;
  effectiveDpr: number;
  resolutionTier: ResolutionTier;
}

/**
 * Color palette driving both 3D scene illumination and ASCII post-processing tinting.
 */
export interface ThemePalette {
  /** Deep terminal / nocturnal sky background hex (e.g. `#0C1217`) */
  background: string;
  /** Primary discreet punctual accent hex (e.g. `#4A7C7E`) */
  warmLight: string;
  /** Secondary highlight / headlight core hex (e.g. `#8A99A6`) */
  warmCore: string;
  /** Ambient fill / cool steel shadow tint hex (e.g. `#6E7B87`) */
  coolAmbient: string;
  /** Structural / weathered concrete accent hex (e.g. `#2A3540`) */
  foliageAccent: string;
  /** Interactive cursor light color hex */
  cursorLight: string;
}

/**
 * Flexible color input accepted by per-object outline APIs.
 */
export type OutlineColorInput = string | number | THREE.Color;

/**
 * Target selector accepted by `setObjectOutline` / `clearObjectOutline` / `getObjectOutlineState`.
 */
export type OutlineTargetSelector = THREE.Object3D | 'primary' | string | number;

/**
 * Configurable options for per-object 3D silhouette outlining (`setObjectOutline` / `applyObjectOutline`).
 */
export interface ObjectOutlineOptions {
  enabled?: boolean;
  visible?: boolean;
  thickness?: number;
  width?: number;
  highlightColor?: OutlineColorInput;
  color?: OutlineColorInput;
  intensity?: number;
  opacity?: number;
  depthBias?: number;
  excludePedestal?: boolean;
  meshFilter?: (mesh: THREE.Mesh) => boolean;
}

/**
 * Read-only snapshot of an object's active outline configuration.
 */
export interface ResolvedObjectOutlineState {
  enabled: boolean;
  thickness: number;
  highlightColor: string;
  intensity: number;
  opacity: number;
  depthBias: number;
  excludePedestal: boolean;
  outlinedMeshCount: number;
}

/**
 * Imperative controller handle returned when attaching an outline to a specific `THREE.Object3D`.
 */
export interface ObjectOutlineHandle {
  readonly target: THREE.Object3D;
  update: (options: Partial<ObjectOutlineOptions>) => ResolvedObjectOutlineState;
  setVisible: (visible: boolean) => ResolvedObjectOutlineState;
  getState: () => ResolvedObjectOutlineState;
  dispose: () => number;
}

/**
 * Progress snapshot emitted while streaming and decoding `./assets/models/cena_completa.glb`.
 */
export interface SceneLoadProgress {
  url: string;
  loaded: number;
  total: number;
  /** Normalized progress in `[0, 1]` when content-length is known, or `-1` when indeterminate */
  ratio: number;
}

/**
 * Optional telemetry & lifecycle callbacks emitted by the engine.
 */
export interface EngineCallbacks {
  onMount?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onDestroy?: () => void;
  onStateChange?: (state: EngineLifecycleState) => void;
  onFpsUpdate?: (stats: EngineStats) => void;
  onResolutionChange?: (profile: ResolutionProfile) => void;
  onLoadProgress?: (progress: SceneLoadProgress) => void;
  onLoadReady?: () => void;
  onLoadError?: (error: Error) => void;
  onError?: (error: Error) => void;
}

/**
 * Full runtime configuration for `AsciiSceneEngine`.
 */
export interface EngineConfig {
  /** Scene composition mode (`'playground'` or `'mascot'`) */
  mode: EngineSceneMode;
  /** Relative URL to the pre-built 3D GLB scene (defaults to `'./assets/models/cena_completa.glb'`) */
  modelUrl: string;
  /** Relative directory path to self-hosted Draco WASM/JS decoders (defaults to `'./assets/draco/'`) */
  dracoDecoderPath: string;
  /** Lighting, weather & surface wetness state (`'day'` | `'night'` | `'rain'`) */
  atmosphere: AtmosphereMode;
  /** Vertical field of view in degrees for the active `THREE.PerspectiveCamera` */
  fov: number;
  /** Enable keyboard WASD movement + `E` interaction in playground mode */
  enableKeyboard: boolean;
  /** Optional gentle 3rd-person camera auto-orbit around `Player_Rig` (`setAutoOrbit`) */
  autoOrbit: boolean;
  /** Automatically pause rendering when scrolled offscreen via IntersectionObserver */
  pauseOffscreen: boolean;
  /** Palette colors */
  palette: ThemePalette;
  /** Base ASCII cell height in CSS pixels (recommended range: 6..20, default: 8) */
  cellSize: number;
  /** Automatically scale cell density & DPR per container/device tier (default: true) */
  autoResponsiveDensity: boolean;
  /** Ordered luminance character ramp from darkest (index 0) to brightest */
  characterRamp: string;
  /** Directional structural edge characters (`| / \ _`) */
  structuralChars: string;
  /** Edge contour detection sensitivity [0..2] */
  edgeStrength: number;
  /** GPU Lighten blend weight [0..1] mixing subtle stipple density with ASCII glyph detail */
  blockBlendWeight: number;
  /** Wind speed & rain inclination multiplier [0..2.5] */
  windStrength: number;
  /** Subtle glow/bloom intensity on emissive elements [0..1.5] */
  bloomIntensity: number;
  /** Luminance threshold above which bloom contributes [0..1] */
  bloomThreshold: number;
  /** Normalized focal depth [0..1] for depth-of-field softening */
  dofFocusDistance: number;
  /** Depth-of-field blur/contrast attenuation strength [0..1] */
  dofStrength: number;
  /** Camera pointer/orbit sensitivity [0..1] */
  parallaxIntensity: number;
  /** Exponential damping speed for smooth camera tracking */
  parallaxSmoothing: number;
  /** Dynamic point light intensity attached to cursor in 3D space */
  cursorLightIntensity: number;
  /** Enable real-time shadow maps on primary directional/headlight sources */
  enableShadows: boolean;
  /** Target maximum frame rate cap (default: 60) */
  maxFps: number;
  /** Maximum devicePixelRatio cap to preserve 60fps on HiDPI screens (default: 2) */
  maxPixelRatio: number;
  /** Automatically pause RAF loop when browser tab is hidden */
  pauseOnHiddenTab: boolean;
  /** Monospace font stack used to bake the crisp glyph texture atlas */
  fontFamily: string;
  /** Optional lifecycle & telemetry hooks */
  callbacks?: EngineCallbacks;
}

/**
 * Deeply partial configuration accepted by constructor and `updateConfig()`.
 */
export type PartialEngineConfig = Omit<Partial<EngineConfig>, 'palette' | 'callbacks'> & {
  palette?: Partial<ThemePalette>;
  callbacks?: EngineCallbacks;
};

/**
 * Explicit dimensions payload for `resize()`.
 */
export interface ViewportSize {
  width: number;
  height: number;
}
