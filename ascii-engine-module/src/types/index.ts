/**
 * Strict TypeScript definitions for the decoupled 3D ASCII Scene Engine.
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
 * Art-directed color palette inspired by modern 3D ASCII RPGs (ASCII Realms / Asciify).
 * Hex strings (e.g. '#050508') or CSS color strings supported by THREE.Color.
 */
export interface ThemePalette {
  /** Deep night backdrop & shadow floor (default: '#050508') */
  background: string;
  /** Warm amber/orange focal torch & shrine light (default: '#FF8C24') */
  warmLight: string;
  /** Secondary warm ember accent for inner flames & sparks (default: '#FFB85C') */
  warmCore: string;
  /** Cool cyan/slate ambient moonlight on rocky ridges (default: '#2E6F95') */
  coolAmbient: string;
  /** Emerald green accent for moss, pines, and ancient relief vegetation (default: '#3A7D5C') */
  foliageAccent: string;
  /** Interactive cursor lantern tint (default: '#7AD7F0') */
  cursorLight: string;
}

/**
 * Runtime performance & telemetry snapshot emitted via `onFrame` / `onFpsUpdate`.
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
}

/**
 * Optional lifecycle & telemetry hooks for external host applications.
 */
export interface LifecycleCallbacks {
  /** Fired once WebGL context, shaders, and ResizeObserver are mounted */
  onMount?: () => void;
  /** Fired when rendering loop is paused */
  onPause?: () => void;
  /** Fired when rendering loop resumes */
  onResume?: () => void;
  /** Fired after all GPU buffers, listeners, and DOM elements are disposed */
  onDestroy?: () => void;
  /** Fired periodically (~2x/sec) with smoothed FPS & grid metrics */
  onFpsUpdate?: (stats: EngineStats) => void;
  /** Fired if WebGL initialization or context loss occurs */
  onError?: (error: Error) => void;
}

/**
 * Complete engine configuration contract.
 */
export interface EngineConfig {
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
  /** Smooth damping factor for camera & cursor light lerp (default: 4.5) */
  parallaxSmoothing: number;
  /** Intensity of the secondary interactive cursor-following light (default: 1.4) */
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
  /** Optional lifecycle hooks */
  callbacks?: LifecycleCallbacks;
}

export type PartialEngineConfig = DeepPartial<EngineConfig>;

export type EngineLifecycleState = 'idle' | 'running' | 'paused' | 'destroyed';
