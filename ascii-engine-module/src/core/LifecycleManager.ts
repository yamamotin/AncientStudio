import * as THREE from 'three';

/**
 * LifecycleManager: Centralized resource, observer, and listener custodian.
 * - Manages container-scoped `ResizeObserver` (with rAF coalescing for smooth drag/fullscreen resize)
 * - Manages `IntersectionObserver`, `fullscreenchange`, and Page Visibility (`visibilitychange`)
 * - Tracks disposable functions and executes deep Three.js scene graph `.dispose()`
 *   on geometries, materials, shadow maps, and textures to guarantee zero GPU memory leaks.
 */

export interface LifecycleObserverCallbacks {
  onResize: (width: number, height: number, immediate?: boolean) => void;
  onVisibilityChange?: (isVisible: boolean) => void;
  onTabHiddenChange?: (isHidden: boolean) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export class LifecycleManager {
  private readonly container: HTMLElement;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private pendingResizeRaf: number | null = null;
  private pendingWidth = 0;
  private pendingHeight = 0;
  private cleanupCallbacks: Array<() => void> = [];
  private disposed = false;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public observeContainer(
    callbacks: LifecycleObserverCallbacks,
    options?: { observeViewportIntersection?: boolean; observeTabVisibility?: boolean }
  ): void {
    if (this.disposed) return;

    const scheduleResize = (width: number, height: number) => {
      if (width <= 0 || height <= 0 || this.disposed) return;
      this.pendingWidth = width;
      this.pendingHeight = height;

      if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        if (this.pendingResizeRaf !== null) return;
        this.pendingResizeRaf = window.requestAnimationFrame(() => {
          this.pendingResizeRaf = null;
          if (!this.disposed && this.pendingWidth > 0 && this.pendingHeight > 0) {
            callbacks.onResize(this.pendingWidth, this.pendingHeight, false);
          }
        });
      } else {
        callbacks.onResize(width, height, false);
      }
    };

    // 1. Container ResizeObserver (rAF-coalesced to prevent redundant WebGL renderTarget reallocations)
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === this.container) {
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0) {
              scheduleResize(width, height);
            }
          }
        }
      });
      this.resizeObserver.observe(this.container);
    }

    // 2. Fullscreen & Window Resize listeners for smooth fullscreen expansion/collapse
    if (typeof document !== 'undefined') {
      const handleFullscreen = () => {
        if (this.disposed) return;
        const fsElem =
          document.fullscreenElement ??
          (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement ??
          null;
        const isFs = Boolean(
          fsElem && (fsElem === this.container || fsElem.contains(this.container))
        );
        callbacks.onFullscreenChange?.(isFs);
        const rect = this.container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          scheduleResize(rect.width, rect.height);
        }
      };

      document.addEventListener('fullscreenchange', handleFullscreen);
      document.addEventListener('webkitfullscreenchange', handleFullscreen);
      this.registerCleanup(() => {
        document.removeEventListener('fullscreenchange', handleFullscreen);
        document.removeEventListener('webkitfullscreenchange', handleFullscreen);
      });
    }

    // 3. Viewport IntersectionObserver (auto-hibernate offscreen stages)
    if (
      options?.observeViewportIntersection !== false &&
      typeof IntersectionObserver !== 'undefined' &&
      callbacks.onVisibilityChange
    ) {
      const onVis = callbacks.onVisibilityChange;
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            onVis(entry.isIntersecting);
          }
        },
        { threshold: 0.01 }
      );
      this.intersectionObserver.observe(this.container);
    }

    // 4. Page Visibility API
    if (
      options?.observeTabVisibility !== false &&
      typeof document !== 'undefined' &&
      callbacks.onTabHiddenChange
    ) {
      const onTab = callbacks.onTabHiddenChange;
      const handler = () => onTab(document.hidden);
      document.addEventListener('visibilitychange', handler);
      this.registerCleanup(() => document.removeEventListener('visibilitychange', handler));
    }
  }

  public registerCleanup(fn: () => void): void {
    if (this.disposed) {
      fn();
      return;
    }
    this.cleanupCallbacks.push(fn);
  }

  /**
   * Traverses any Three.js Object3D hierarchy (Scene or Group) and disposes all
   * BufferGeometries, Materials, Textures, and Light ShadowMaps.
   */
  public static disposeObject3D(root: THREE.Object3D): void {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();

    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
        if (obj.geometry && !geometries.has(obj.geometry)) {
          obj.geometry.dispose();
          geometries.add(obj.geometry);
        }

        const matList = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const mat of matList) {
          if (mat && !materials.has(mat)) {
            LifecycleManager.disposeMaterialTextures(mat);
            mat.dispose();
            materials.add(mat);
          }
        }
      }

      if (obj instanceof THREE.Light && obj.shadow && obj.shadow.map) {
        obj.shadow.map.dispose();
      }
    });

    if (root instanceof THREE.Scene) {
      root.clear();
    }
  }

  private static disposeMaterialTextures(material: THREE.Material): void {
    const record = material as unknown as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      const val = record[key];
      if (val instanceof THREE.Texture) {
        val.dispose();
      }
    }
  }

  public disposeAll(sceneToDispose?: THREE.Object3D | null): void {
    if (this.disposed) return;
    this.disposed = true;

    if (this.pendingResizeRaf !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.pendingResizeRaf);
      this.pendingResizeRaf = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    for (let i = this.cleanupCallbacks.length - 1; i >= 0; i--) {
      try {
        this.cleanupCallbacks[i]?.();
      } catch {
        // Ignore individual cleanup errors to guarantee complete teardown
      }
    }
    this.cleanupCallbacks.length = 0;

    if (sceneToDispose) {
      LifecycleManager.disposeObject3D(sceneToDispose);
    }
  }
}
