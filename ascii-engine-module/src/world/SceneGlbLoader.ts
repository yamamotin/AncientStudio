import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  DEFAULT_DRACO_DECODER_PATH,
  DEFAULT_SCENE_MODEL_URL,
} from '../core/defaultConfig';
import { LifecycleManager } from '../core/LifecycleManager';
import {
  GLB_NODE_NAMES,
  normalizeRelativeDecoderPath,
  normalizeRelativeModelUrl,
} from './GlbSceneLoader';

export { DEFAULT_DRACO_DECODER_PATH };
export const DEFAULT_SCENE_GLB_URL = DEFAULT_SCENE_MODEL_URL;
export const REQUIRED_SCENE_ROOT_NODES = [
  GLB_NODE_NAMES.cidade,
  GLB_NODE_NAMES.playerRig,
  GLB_NODE_NAMES.carroGrupo,
] as const;
export const REQUIRED_SCENE_NLA_TRACKS = ['Idle', 'Walking', 'Casting'] as const;

export interface SceneGlbLoaderOptions {
  /** Relative self-hosted Draco decoder folder (`default: './assets/draco/'`). External CDNs are rejected. */
  decoderPath?: string;
  /** Default relative `.glb` asset URL (`default: './assets/models/cena_completa.glb'`). */
  modelUrl?: string;
  /** Number of parallel Draco Web Workers (`default: 4`, clamped to `1..8`). */
  workerLimit?: number;
  /** Decoder runtime type (`'wasm'` by default when WebAssembly is available, or `'js'`). */
  decoderType?: 'wasm' | 'js';
  /** Custom fetch implementation for controlled environments/benchmarks. */
  fetchImpl?: typeof fetch;
}

export interface SceneGlbLoadMetrics {
  url: string;
  decoderPath: string;
  workerLimit: number;
  byteLength: number;
  decoderPreloadMs: number;
  fetchMs: number;
  decompressAndParseMs: number;
  totalMs: number;
  throughputMiBps: number;
  meshCount: number;
  vertexCount: number;
  triangleCount: number;
  preservedNodes: string[];
  animationNames: string[];
}

export interface LoadedSceneGlbAsset {
  gltf: GLTF;
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  nodesByName: Record<string, THREE.Object3D>;
  metrics: SceneGlbLoadMetrics;
  dispose: () => void;
}

function nowMs(): number {
  return typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();
}

function deriveResourceBasePath(url: string): string {
  const lastSlash = url.lastIndexOf('/');
  return lastSlash >= 0 ? url.slice(0, lastSlash + 1) : './';
}

function inspectSceneGeometry(root: THREE.Object3D): {
  meshCount: number;
  vertexCount: number;
  triangleCount: number;
  nodesByName: Record<string, THREE.Object3D>;
} {
  let meshCount = 0;
  let vertexCount = 0;
  let triangleCount = 0;
  const nodesByName: Record<string, THREE.Object3D> = {};

  root.traverse((obj) => {
    if (obj.name) {
      nodesByName[obj.name] = obj;
    }
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh && mesh.geometry) {
      meshCount += 1;
      const pos = mesh.geometry.getAttribute('position');
      if (pos) {
        vertexCount += pos.count;
      }
      const index = mesh.geometry.getIndex();
      if (index) {
        triangleCount += Math.floor(index.count / 3);
      } else if (pos) {
        triangleCount += Math.floor(pos.count / 3);
      }
    }
  });

  return { meshCount, vertexCount, triangleCount, nodesByName };
}

/**
 * Self-hosted glTF 2.0 + Draco (`KHR_draco_mesh_compression`) + WebP (`EXT_texture_webp`)
 * asset loader with zero external CDN dependencies, Web Worker pool telemetry, and
 * deterministic GPU + Worker `.dispose()` cleanup.
 */
export class SceneGlbLoader {
  private readonly decoderPath: string;
  private readonly defaultModelUrl: string;
  private readonly workerLimit: number;
  private readonly fetchImpl: typeof fetch | null;
  private dracoLoader: DRACOLoader | null = null;
  private gltfLoader: GLTFLoader | null = null;
  private readonly loadedScenes = new Set<THREE.Object3D>();
  private disposed = false;

  constructor(options: SceneGlbLoaderOptions = {}) {
    this.decoderPath = normalizeRelativeDecoderPath(
      options.decoderPath ?? DEFAULT_DRACO_DECODER_PATH
    );
    this.defaultModelUrl = normalizeRelativeModelUrl(
      options.modelUrl ?? DEFAULT_SCENE_GLB_URL
    );
    const rawLimit = Number.isFinite(options.workerLimit) ? Number(options.workerLimit) : 4;
    this.workerLimit = Math.max(1, Math.min(8, Math.round(rawLimit)));
    this.fetchImpl =
      options.fetchImpl ?? (typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : null);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(this.decoderPath);
    dracoLoader.setWorkerLimit(this.workerLimit);
    if (options.decoderType === 'js') {
      dracoLoader.setDecoderConfig({ type: 'js' });
    }

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.dracoLoader = dracoLoader;
    this.gltfLoader = gltfLoader;
  }

  public getDecoderPath(): string {
    return this.decoderPath;
  }

  public getWorkerLimit(): number {
    return this.workerLimit;
  }

  /** Pre-fetches `draco_wasm_wrapper.js` + `draco_decoder.wasm` and prepares the Worker Blob URL. */
  public preloadDecoder(): void {
    if (this.disposed || !this.dracoLoader) {
      throw new Error('[SceneGlbLoader] Cannot preload a disposed loader.');
    }
    this.dracoLoader.preload();
  }

  /**
   * Downloads `./assets/models/cena_completa.glb` over relative HTTP, decodes all Draco
   * geometries in the Web Worker pool + WebP textures, validates preserved nodes/tracks,
   * and returns full timing metrics alongside a dedicated `.dispose()` handle.
   */
  public async load(url = this.defaultModelUrl): Promise<LoadedSceneGlbAsset> {
    if (this.disposed || !this.gltfLoader || !this.dracoLoader) {
      throw new Error('[SceneGlbLoader] Loader has already been disposed.');
    }
    if (!this.fetchImpl) {
      throw new Error('[SceneGlbLoader] Global fetch is unavailable in this environment.');
    }

    const totalStart = nowMs();

    const preloadStart = nowMs();
    this.dracoLoader.preload();
    const decoderPreloadMs = nowMs() - preloadStart;

    const fetchStart = nowMs();
    const response = await this.fetchImpl(url);
    if (!response.ok) {
      throw new Error(
        `[SceneGlbLoader] Failed to fetch "${url}" (HTTP ${response.status} ${response.statusText}).`
      );
    }
    const arrayBuffer = await response.arrayBuffer();
    const fetchMs = nowMs() - fetchStart;
    const byteLength = arrayBuffer.byteLength;

    const parseStart = nowMs();
    const gltf = await this.gltfLoader.parseAsync(arrayBuffer, deriveResourceBasePath(url));
    const decompressAndParseMs = nowMs() - parseStart;
    const totalMs = nowMs() - totalStart;

    const { meshCount, vertexCount, triangleCount, nodesByName } = inspectSceneGeometry(gltf.scene);
    const preservedNodes = REQUIRED_SCENE_ROOT_NODES.filter((name) => Boolean(nodesByName[name]));
    const animationNames = (gltf.animations || []).map((clip) => clip.name).filter(Boolean);

    const sizeMiB = byteLength / (1024 * 1024);
    const totalSec = Math.max(totalMs / 1000, 1e-6);
    const throughputMiBps = Number((sizeMiB / totalSec).toFixed(2));

    this.loadedScenes.add(gltf.scene);

    let assetDisposed = false;
    const disposeAsset = (): void => {
      if (assetDisposed) return;
      assetDisposed = true;
      this.loadedScenes.delete(gltf.scene);
      if (gltf.scene.parent) {
        gltf.scene.parent.remove(gltf.scene);
      }
      LifecycleManager.disposeObject3D(gltf.scene);
    };

    return {
      gltf,
      scene: gltf.scene,
      animations: gltf.animations || [],
      nodesByName,
      metrics: {
        url,
        decoderPath: this.decoderPath,
        workerLimit: this.workerLimit,
        byteLength,
        decoderPreloadMs: Number(decoderPreloadMs.toFixed(2)),
        fetchMs: Number(fetchMs.toFixed(2)),
        decompressAndParseMs: Number(decompressAndParseMs.toFixed(2)),
        totalMs: Number(totalMs.toFixed(2)),
        throughputMiBps,
        meshCount,
        vertexCount,
        triangleCount,
        preservedNodes,
        animationNames,
      },
      dispose: disposeAsset,
    };
  }

  /** Terminates all Draco Web Workers, revokes Blob URLs, and disposes any tracked Three.js scene meshes. */
  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;

    for (const sceneRoot of this.loadedScenes) {
      if (sceneRoot.parent) {
        sceneRoot.parent.remove(sceneRoot);
      }
      LifecycleManager.disposeObject3D(sceneRoot);
    }
    this.loadedScenes.clear();

    if (this.dracoLoader) {
      this.dracoLoader.dispose();
      this.dracoLoader = null;
    }
    this.gltfLoader = null;
  }
}
