import type * as THREE from 'three';

export type CleanupTask = () => void;

export interface ContainerObserverCallbacks {
  onResize?: (width: number, height: number) => void;
  onVisibilityChange?: (isVisible: boolean) => void;
  onTabHiddenChange?: (isHidden: boolean) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export interface ContainerObserverOptions {
  observeViewportIntersection?: boolean;
  observeTabVisibility?: boolean;
}

const MATERIAL_TEXTURE_KEYS = [
  'map',
  'alphaMap',
  'aoMap',
  'bumpMap',
  'clearcoatMap',
  'clearcoatNormalMap',
  'clearcoatRoughnessMap',
  'displacementMap',
  'emissiveMap',
  'envMap',
  'iridescenceMap',
  'iridescenceThicknessMap',
  'lightMap',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'sheenColorMap',
  'sheenRoughnessMap',
  'specularColorMap',
  'specularIntensityMap',
  'thicknessMap',
  'transmissionMap',
] as const;

/**
 * LifecycleManager: Centralized registry for deterministic teardown of:
 * - DOM & Window event listeners
 * - ResizeObserver / IntersectionObserver / Fullscreen / Visibility observers
 * - Three.js Scene hierarchies (geometries, PBR/glTF materials, textures, skeletons, lights, targets)
 * - Three.js `AnimationMixer` instances and Draco/GLTF loader workers
 */
export class LifecycleManager {
  private readonly container: HTMLElement | null;
  private readonly cleanups: CleanupTask[] = [];
  private disposed = false;

  constructor(container?: HTMLElement | null) {
    this.container = container ?? null;
  }

  public register(task: CleanupTask): void {
    if (this.disposed) {
      try {
        task();
      } catch {
        // Ignore cleanup errors after teardown
      }
      return;
    }
    this.cleanups.push(task);
  }

  public registerCleanup(task: CleanupTask): void {
    this.register(task);
  }

  /**
   * Attaches rAF-coalesced ResizeObserver, IntersectionObserver, Page Visibility, and Fullscreen
   * listeners to `this.container`, automatically disconnecting all of them on `disposeAll()`.
   */
  public observeContainer(
    callbacks: ContainerObserverCallbacks,
    options?: ContainerObserverOptions
  ): void {
    const target = this.container;
    if (!target || typeof window === 'undefined') return;

    let resizeRaf: number | null = null;
    const scheduleResize = (w: number, h: number): void => {
      if (w <= 0 || h <= 0) return;
      if (resizeRaf !== null) {
        window.cancelAnimationFrame(resizeRaf);
      }
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        if (!this.disposed) {
          callbacks.onResize?.(w, h);
        }
      });
    };

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          scheduleResize(entry.contentRect.width, entry.contentRect.height);
        }
      });
      ro.observe(target);
      this.register(() => {
        if (resizeRaf !== null) {
          window.cancelAnimationFrame(resizeRaf);
          resizeRaf = null;
        }
        ro.disconnect();
      });
    }

    if (options?.observeViewportIntersection !== false && typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && !this.disposed) {
            callbacks.onVisibilityChange?.(entry.isIntersecting);
          }
        },
        { threshold: 0.02 }
      );
      io.observe(target);
      this.register(() => io.disconnect());
    }

    if (options?.observeTabVisibility !== false && typeof document !== 'undefined') {
      const onVis = (): void => {
        if (!this.disposed) {
          callbacks.onTabHiddenChange?.(document.hidden);
        }
      };
      document.addEventListener('visibilitychange', onVis);
      this.register(() => document.removeEventListener('visibilitychange', onVis));
    }

    if (typeof document !== 'undefined') {
      const onFs = (): void => {
        if (this.disposed) return;
        const isFs = Boolean(
          document.fullscreenElement ||
            target.closest?.('[data-fullscreen-view="true"], .is-scene-fullscreen')
        );
        callbacks.onFullscreenChange?.(isFs);
        const rect = target.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          scheduleResize(rect.width, rect.height);
        }
      };
      document.addEventListener('fullscreenchange', onFs);
      this.register(() => document.removeEventListener('fullscreenchange', onFs));
    }
  }

  /**
   * Stops all actions and uncaches clips/bindings on a `THREE.AnimationMixer`.
   */
  public static disposeMixer(
    mixer: THREE.AnimationMixer | null | undefined,
    root?: THREE.Object3D | null
  ): void {
    if (!mixer) return;
    try {
      mixer.stopAllAction();
      const targetRoot = root ?? (mixer.getRoot() as THREE.Object3D | undefined);
      if (targetRoot) {
        mixer.uncacheRoot(targetRoot);
      }
    } catch {
      // Ignore mixer teardown errors on already-uncached roots
    }
  }

  /**
   * Recursively disposes all geometries, materials, PBR/extension textures, skeletons, and shadow maps
   * inside a Three.js Object3D / Scene tree.
   */
  public static disposeObject3D(root: THREE.Object3D | null | undefined): void {
    if (!root) return;

    const disposedGeometries = new Set<THREE.BufferGeometry>();
    const disposedMaterials = new Set<THREE.Material>();
    const disposedTextures = new Set<THREE.Texture>();

    root.traverse((obj) => {
      const meshLike = obj as THREE.Mesh & {
        skeleton?: THREE.Skeleton;
      };
      if (meshLike.geometry && !disposedGeometries.has(meshLike.geometry)) {
        disposedGeometries.add(meshLike.geometry);
        meshLike.geometry.dispose();
      }
      if (meshLike.skeleton && typeof meshLike.skeleton.dispose === 'function') {
        meshLike.skeleton.dispose();
      }
      if (meshLike.material) {
        if (Array.isArray(meshLike.material)) {
          for (const mat of meshLike.material) {
            LifecycleManager.disposeMaterial(mat, disposedMaterials, disposedTextures);
          }
        } else {
          LifecycleManager.disposeMaterial(meshLike.material, disposedMaterials, disposedTextures);
        }
      }

      const lightLike = obj as THREE.Light;
      if (lightLike.isLight && lightLike.shadow?.map) {
        lightLike.shadow.map.dispose();
      }
    });

    if (root.parent) {
      root.parent.remove(root);
    }

    while (root.children.length > 0) {
      const child = root.children[root.children.length - 1];
      if (child) root.remove(child);
    }
  }

  public static disposeMaterial(
    mat: THREE.Material | null | undefined,
    seenMaterials?: Set<THREE.Material>,
    seenTextures?: Set<THREE.Texture>
  ): void {
    if (!mat) return;
    if (seenMaterials) {
      if (seenMaterials.has(mat)) return;
      seenMaterials.add(mat);
    }

    const record = mat as unknown as Record<string, unknown>;

    const disposeTex = (candidate: unknown): void => {
      if (!candidate || typeof candidate !== 'object') return;
      const tex = candidate as THREE.Texture;
      if (!tex.isTexture || typeof tex.dispose !== 'function') return;
      if (seenTextures) {
        if (seenTextures.has(tex)) return;
        seenTextures.add(tex);
      }
      tex.dispose();
    };

    for (const key of MATERIAL_TEXTURE_KEYS) {
      disposeTex(record[key]);
    }

    for (const key of Object.keys(record)) {
      disposeTex(record[key]);
    }

    const shaderUniforms = (mat as THREE.ShaderMaterial).uniforms;
    if (shaderUniforms && typeof shaderUniforms === 'object') {
      for (const uKey of Object.keys(shaderUniforms)) {
        disposeTex(shaderUniforms[uKey]?.value);
      }
    }

    mat.dispose();
  }

  public disposeAll(scene?: THREE.Object3D | null): void {
    if (this.disposed) return;
    this.disposed = true;

    for (let i = this.cleanups.length - 1; i >= 0; i--) {
      try {
        this.cleanups[i]!();
      } catch {
        // Ensure every registered resource gets a chance to clean up
      }
    }
    this.cleanups.length = 0;

    if (scene) {
      LifecycleManager.disposeObject3D(scene);
    }
  }

  public isDisposed(): boolean {
    return this.disposed;
  }
}
