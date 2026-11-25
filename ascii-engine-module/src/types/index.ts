import type * as THREE from 'three';

/**
 * Strict TypeScript definitions for the modular 3D ASCII Playground & Mascot Engine.
 * Framework-agnostic contract designed for seamless integration into any DOM host.
 */

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends (...args: never[]) => unknown
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};

/**
 * Engine scene mode:
 * - 'playground': Unified Cyberpunk urban boulevard scenario (`[ ASCII REALMS // SCENE ]`)
 * - 'mascot': Dedicated high-contrast 3D Linux Tux stage for `[ STACK // NEOFETCH ]`
 */
export type SceneMode = 'playground' | 'mascot';

/**
 * Environmental / atmospheric states supported on the unified playground scenario:
 * - 'day': Sunlit urban avenue with clear visibility, crisp solar shadows & dry pavement
 * - 'night': Clear nocturnal cyberpunk boulevard with stars, neon signage & moonlight shadows
 * - 'rain': Stormy rain-drenched cyberpunk avenue with wind-slanted rain, wet mirror puddles & raindrop ripples
 */
export type AtmosphereMode = 'day' | 'night' | 'rain';

export type ResolutionTier = 'mobile' | 'compact' | 'desktop' | 'hd' | 'uhd';

export interface ResolutionProfile {
  /** Classified device/viewport tier */
  tier: ResolutionTier;
  /** Container width/height in CSS pixels */
  cssWidth: number;
  cssHeight: number;
  /** Capped effective devicePixelRatio */
  effectiveDpr: number;
  /** Physical framebuffer dimensions in pixels */
  physicalWidth: number;
  physicalHeight: number;
  /** Effective ASCII cell height in CSS pixels */
  activeCellSize: number;
  /** Integer physical pixel width & height of each ASCII glyph cell */
  cellPhysW: number;
  cellPhysH: number;
  /** Active ASCII grid columns x rows */
  columns: number;
  rows: number;
  /** 2D Canvas glyph atlas tile resolution (64 or 96 px) */
  atlasTileSize: number;
  /** Sub-cell multi-sample offset in cell UV units (prevents subpixel aliasing) */
  subCellSampleSpread: number;
  /** Bloom buffer divisor (3 on desktop, 4 on mobile) */
  bloomDownsample: number;
}

/**
 * Art-directed color palette inspired by modern 3D ASCII RPGs (ASCII Realms / Asciify)
 * and classic high-contrast terminal Tux silhouettes.
 */
export interface ThemePalette {
  /** Deep night backdrop & shadow floor (default: '#04050B') */
  background: string;
  /** Primary warm/neon focal light — magenta/crimson or amber (default: '#FF2A85') */
  warmLight: string;
  /** Secondary bright incandescent/amber neon accent (default: '#FFB830') */
  warmCore: string;
  /** Cool nocturnal skyline / cyan haze ambient (default: '#00E5FF') */
  coolAmbient: string;
  /** Secondary architectural/structural neon accent (default: '#1E88E5') */
  foliageAccent: string;
  /** Interactive cursor drone/spotlight tint (default: '#56F2FF') */
  cursorLight: string;
}

/**
 * Runtime performance & telemetry snapshot emitted via `onFpsUpdate`.
 */
export interface EngineStats {
  /** Smoothed frames per second */
  fps: number;
  /** Last frame delta time in milliseconds */
  frameTimeMs: number;
  /** Current ASCII character cell size in CSS pixels */
  activeCellSize: number;
  /** Active ASCII grid columns x rows */
  gridColumns: number;
  gridRows: number;
  /** Active WebGL draw calls in the 3D scene pass */
  drawCalls: number;
  /** Active triangles rendered in the 3D scene pass */
  triangles: number;
  /** Active ECS entity count */
  entityCount?: number;
  /** Active effective devicePixelRatio */
  effectiveDpr?: number;
  /** Classified resolution tier ('mobile' | 'compact' | 'desktop' | 'hd' | 'uhd') */
  resolutionTier?: ResolutionTier;
}

/**
 * Optional lifecycle & telemetry hooks for external host applications.
 */
export interface LifecycleCallbacks {
  onMount?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onDestroy?: () => void;
  onFpsUpdate?: (stats: EngineStats) => void;
  onError?: (error: Error) => void;
}

/**
 * Complete engine configuration contract.
 */
export interface EngineConfig {
  /** Scene mode ('playground' for Cyberpunk avenue, 'mascot' for Neofetch 3D Tux) */
  mode: SceneMode;
  /** Map identifier loaded by MapLoader when mode === 'playground' (default: 'cyberpunk-citadel') */
  mapId: string;
  /** Active atmospheric/weather state on the unified scenario ('day' | 'night' | 'rain', default: 'night') */
  atmosphere: AtmosphereMode;
  /** Enable keyboard input capture ONLY when explicitly opted-in / focused (default: false) */
  enableKeyboard: boolean;
  /** Automatically pause when container leaves viewport via IntersectionObserver (default: true) */
  pauseOffscreen: boolean;
  /** Color theme palette */
  palette: ThemePalette;
  /** Base ASCII glyph cell size in CSS pixels on desktop (default: 10, range: 6..24) */
  cellSize: number;
  /** Automatically scale cell density on mobile/small viewports for readability & 60fps (default: true) */
  autoResponsiveDensity: boolean;
  /** Ordered character ramp from darkest (index 0) to brightest */
  characterRamp: string;
  /** Structural edge character ramp for silhouette & normal discontinuities (e.g. '/\\|_[]') */
  structuralChars: string;
  /** Strength of structural edge glyph substitution (0.0 = luminance only, 1.0 = crisp structural edges) */
  edgeStrength: number;
  /**
   * GPU `lighten` block-vs-detail composition weight [0..1] (default: 0.35):
   * Blends ~35% solid/shaded block mass (`░▒▓█`) with 100% crisp typographic ASCII detail (`max(detail, block * weight)`),
   * delivering luminous silhouettes and rich surface readability with zero extra CPU passes.
   */
  blockBlendWeight: number;
  /** Wind speed & sway intensity driving cyber-rain slant, rising steam, banners, and avatar coat/cables (default: 1.0) */
  windStrength: number;
  /** Bloom / warm light bleed intensity across neighboring ASCII cells (default: 1.15, range: 0..3) */
  bloomIntensity: number;
  /** Luminance threshold above which light bleeds into adjacent glyphs (default: 0.42) */
  bloomThreshold: number;
  /** Depth-of-field focus distance in world units from camera (default: 14.5) */
  dofFocusDistance: number;
  /** Depth-of-field blur/glyph-softening strength in foreground & far background (default: 0.65) */
  dofStrength: number;
  /** Camera parallax amplitude in world units in response to container-relative pointer (default: 1.35) */
  parallaxIntensity: number;
  /** Smooth damping factor for camera & rotation lerp (default: 4.8) */
  parallaxSmoothing: number;
  /** Intensity of the secondary interactive cursor-following light (default: 1.35) */
  cursorLightIntensity: number;
  /** Enable real-time shadow mapping from focal torch/moon lights (default: true) */
  enableShadows: boolean;
  /** Target maximum FPS cap (default: 60) */
  maxFps: number;
  /** Maximum devicePixelRatio cap to protect fill-rate on 3x/4x displays (default: 2) */
  maxPixelRatio: number;
  /** Automatically pause loop when browser tab is hidden via Page Visibility API (default: true) */
  pauseOnHiddenTab: boolean;
  /** Font stack used to rasterize the dynamic 2D glyph atlas */
  fontFamily: string;
  /** Optional explicit camera vertical/configured field-of-view in degrees (preserves custom FOV such as 106° across resizes when specified) */
  fov?: number;
  /** Optional lifecycle hooks */
  callbacks?: LifecycleCallbacks;
}

export type PartialEngineConfig = DeepPartial<EngineConfig>;

export type EngineLifecycleState = 'idle' | 'running' | 'paused' | 'destroyed';

/** Accepted color formats for configurable per-object outlines (`#RRGGBB`, CSS color string, hex number, or `THREE.Color`). */
export type OutlineColorInput = string | number | THREE.Color;

/**
 * Target selector accepted by `engine.setObjectOutline(...)`, `engine.clearObjectOutline(...)`,
 * and `engine.getObjectOutlineState(...)`:
 * - `THREE.Object3D`: direct Three.js Mesh or Group reference
 * - `'primary'`: active scene's primary entity (`TuxMascotRoot` in mascot mode, `CyberNetrunnerAvatar` in playground mode)
 * - `string`: object name resolved via `scene.getObjectByName(name)`
 * - `number`: ECS `EntityId` resolved via its `Renderable` component
 */
export type OutlineTargetSelector = THREE.Object3D | string | number;

/**
 * Configurable options for on-demand per-object silhouette outlines (`applyObjectOutline` / `engine.setObjectOutline`).
 * Designed for targeted application on specific objects (never global by default), including dark objects
 * (such as Tux's obsidian coat) over dark backgrounds via a configurable `highlightColor`.
 */
export interface ObjectOutlineOptions {
  /** Whether the outline is active/visible on the target (`default: true`). */
  enabled?: boolean;
  /** Alias for `enabled` controlling outline visibility (`default: true`). */
  visible?: boolean;
  /** Outline stroke thickness / width multiplier (`default: 1.0`, clamped to `[0.05, 8.0]`). */
  thickness?: number;
  /** Alias for `thickness` (stroke width multiplier). */
  width?: number;
  /**
   * Optional highlight color (`string | number | THREE.Color`, e.g. `'#7DF9FF'`, `'#FFD166'`, `0x64f5ff`).
   * Ensures strong luminance & chromatic contrast for dark meshes against dark backgrounds.
   * Defaults to `'#7DF9FF'` (or the engine's `palette.cursorLight` when called via `engine.setObjectOutline`).
   */
  highlightColor?: OutlineColorInput;
  /** Alias for `highlightColor`. */
  color?: OutlineColorInput;
  /** Emissive luminance multiplier (`default: 1.85`, clamped to `[0.1, 6.0]`) for crisp ASCII ramp & edge pickup. */
  intensity?: number;
  /** Outline alpha opacity (`default: 1.0`, clamped to `[0.0, 1.0]`). */
  opacity?: number;
  /** Clip-space depth bias (`default: 0.0012`) preventing interior concavities from z-fighting front surfaces. */
  depthBias?: number;
  /** Skips showcase plinths and flat ground rings by default (`default: true`). */
  excludePedestal?: boolean;
  /** Optional predicate to include/exclude specific child `THREE.Mesh` instances within the target hierarchy. */
  meshFilter?: (mesh: THREE.Mesh) => boolean;
}

/** Snapshot of the active outline configuration on a target object. */
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

/** Controller handle returned when applying an outline to a specific `THREE.Object3D`. */
export interface ObjectOutlineHandle {
  readonly target: THREE.Object3D;
  getState(): ResolvedObjectOutlineState;
  update(options: ObjectOutlineOptions): ResolvedObjectOutlineState;
  setVisible(visible: boolean): ResolvedObjectOutlineState;
  dispose(): number;
}
