import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  DEFAULT_DRACO_DECODER_PATH,
  DEFAULT_SCENE_MODEL_URL,
} from '../core/defaultConfig';
import { LifecycleManager } from '../core/LifecycleManager';
import type { SceneLoadProgress } from '../types';

export const GLB_NODE_NAMES = {
  cidade: 'Cidade_Sketchfab_model',
  playerRig: 'Player_Rig',
  carroGrupo: 'Carro_Grupo',
} as const;

export type ForegroundOccluderRole = 'eastTree' | 'westTree' | 'frontSign';

export interface ForegroundOccluderGroup {
  role: ForegroundOccluderRole;
  label: string;
  meshes: THREE.Mesh[];
  worldBox: THREE.Box3;
  occluded: boolean;
}

export interface PreparedUrbanGlbAssets {
  sceneRoot: THREE.Group;
  nodes: {
    cidade: THREE.Object3D;
    playerRig: THREE.Object3D;
    carroGrupo: THREE.Object3D;
  };
  clips: {
    Idle: THREE.AnimationClip | null;
    Walking: THREE.AnimationClip | null;
    Casting: THREE.AnimationClip | null;
  };
  materials: {
    roads: THREE.MeshStandardMaterial[];
    sidewalks: THREE.MeshStandardMaterial[];
    windows: THREE.MeshStandardMaterial[];
    streetLamps: THREE.MeshStandardMaterial[];
    foliage: THREE.MeshStandardMaterial[];
    kioskGlass: THREE.MeshStandardMaterial[];
    billboards: THREE.MeshStandardMaterial[];
    carHeadlightCovers: THREE.MeshStandardMaterial[];
  };
  foregroundOccluders: ForegroundOccluderGroup[];
  dispose: () => void;
}

export interface GlbSceneLoadOptions {
  modelUrl?: string;
  dracoDecoderPath?: string;
  workerLimit?: number;
  onProgress?: (progress: SceneLoadProgress) => void;
}

/**
 * Ensures a relative path is preserved without any external CDN origin,
 * adding a trailing slash for `DRACOLoader.setDecoderPath(...)`.
 */
export function normalizeRelativeDecoderPath(rawPath?: string): string {
  const path = (rawPath ?? DEFAULT_DRACO_DECODER_PATH).trim() || DEFAULT_DRACO_DECODER_PATH;
  if (/^https?:\/\//i.test(path)) {
    throw new Error(
      `[GlbSceneLoader] External CDN URLs are forbidden for Draco decoders ("${path}"). Use a relative local path such as "./assets/draco/".`
    );
  }
  return path.endsWith('/') ? path : `${path}/`;
}

export function normalizeRelativeModelUrl(rawUrl?: string): string {
  const url = (rawUrl ?? DEFAULT_SCENE_MODEL_URL).trim() || DEFAULT_SCENE_MODEL_URL;
  if (/^https?:\/\//i.test(url)) {
    throw new Error(
      `[GlbSceneLoader] External CDN URLs are forbidden for GLB models ("${url}"). Use a relative local path such as "./assets/models/cena_completa.glb".`
    );
  }
  return url;
}

/**
 * Clones and normalizes the embedded NLA animation clips (`Idle`, `Walking`, `Casting`) so
 * horizontal Mixamo root offsets (`mixamorigHips.position` X/Y) are aligned with `Idle`'s
 * foot-centered anchor while preserving natural vertical pelvis motion (`Z` in Armature space).
 * Prevents lateral mesh jumps during `AnimationMixer.crossFadeTo(...)`.
 */
export function normalizeCharacterClips(animations: THREE.AnimationClip[]): {
  Idle: THREE.AnimationClip | null;
  Walking: THREE.AnimationClip | null;
  Casting: THREE.AnimationClip | null;
} {
  const findClip = (targetName: string): THREE.AnimationClip | null => {
    const exact = animations.find(
      (clip) => clip.name.toLowerCase() === targetName.toLowerCase()
    );
    if (exact) return exact.clone();
    const partial = animations.find((clip) =>
      clip.name.toLowerCase().includes(targetName.toLowerCase())
    );
    return partial ? partial.clone() : null;
  };

  const idle = findClip('Idle');
  const walking = findClip('Walking');
  const casting = findClip('Casting');

  let anchorX = 0;
  let anchorY = 0;
  if (idle) {
    const idleHipsTrack = idle.tracks.find((t) => /hips\.position$/i.test(t.name));
    if (idleHipsTrack && idleHipsTrack.values.length >= 3) {
      anchorX = idleHipsTrack.values[0]!;
      anchorY = idleHipsTrack.values[1]!;
    }
  }

  const alignClipHips = (clip: THREE.AnimationClip | null): THREE.AnimationClip | null => {
    if (!clip) return null;
    for (const track of clip.tracks) {
      if (!/hips\.position$/i.test(track.name) || track.values.length < 3) continue;
      const values = Float32Array.from(track.values);
      const dx = values[0]! - anchorX;
      const dy = values[1]! - anchorY;
      if (Math.hypot(dx, dy) > 0.05) {
        for (let i = 0; i < values.length; i += 3) {
          values[i] = values[i]! - dx;
          values[i + 1] = values[i + 1]! - dy;
        }
        track.values = values;
      }
    }
    return clip;
  };

  return {
    Idle: alignClipHips(idle),
    Walking: alignClipHips(walking),
    Casting: alignClipHips(casting),
  };
}

/**
 * Validates, sanitizes, and classifies the 3 embedded root hierarchies (`Cidade_Sketchfab_model`,
 * `Player_Rig`, `Carro_Grupo`) and NLA clips from a parsed `GLTF` payload.
 */
export function extractAndPrepareGlbNodes(
  gltf: Pick<GLTF, 'scene' | 'animations'>,
  onDisposeExtra?: () => void
): PreparedUrbanGlbAssets {
  const sceneRoot = gltf.scene;
  const cidade = sceneRoot.getObjectByName(GLB_NODE_NAMES.cidade);
  const playerRig = sceneRoot.getObjectByName(GLB_NODE_NAMES.playerRig);
  const carroGrupo = sceneRoot.getObjectByName(GLB_NODE_NAMES.carroGrupo);

  if (!cidade || !playerRig || !carroGrupo) {
    const missing = [
      !cidade ? GLB_NODE_NAMES.cidade : null,
      !playerRig ? GLB_NODE_NAMES.playerRig : null,
      !carroGrupo ? GLB_NODE_NAMES.carroGrupo : null,
    ]
      .filter(Boolean)
      .join(', ');
    LifecycleManager.disposeObject3D(sceneRoot);
    throw new Error(
      `[GlbSceneLoader] Missing required root node(s) in cena_completa.glb: ${missing}`
    );
  }

  const roads: THREE.MeshStandardMaterial[] = [];
  const sidewalks: THREE.MeshStandardMaterial[] = [];
  const windows: THREE.MeshStandardMaterial[] = [];
  const streetLamps: THREE.MeshStandardMaterial[] = [];
  const foliage: THREE.MeshStandardMaterial[] = [];
  const kioskGlass: THREE.MeshStandardMaterial[] = [];
  const billboards: THREE.MeshStandardMaterial[] = [];
  const carHeadlightCovers: THREE.MeshStandardMaterial[] = [];
  const seenMats = new Set<string>();

  const eastTreeMeshes: THREE.Mesh[] = [];
  const westTreeMeshes: THREE.Mesh[] = [];
  const frontSignMeshes: THREE.Mesh[] = [];

  cidade.updateMatrixWorld(true);

  const getAncestorPath = (obj: THREE.Object3D): string => {
    const names: string[] = [obj.name];
    let cur = obj.parent;
    while (cur && cur !== cidade) {
      if (cur.name) names.push(cur.name);
      cur = cur.parent;
    }
    return names.join('/');
  };

  // 1. Sanitize, classify materials & identify foreground occluders (`Cidade_Sketchfab_model`)
  cidade.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;

    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const primaryMat = mats[0] as THREE.MeshStandardMaterial | undefined;

    // Hide invisible exporter bounding boxes (e.g. Cidade_Object_331 with opacity=0, transparent=false)
    if (
      mesh.name === 'Cidade_Object_331' ||
      (primaryMat && primaryMat.opacity === 0 && !primaryMat.transparent)
    ) {
      mesh.visible = false;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      return;
    }

    // Identify the 2 foreground plaza trees (`Cidade_leaves_0_3` & `Cidade_leaves001_1_7`)
    // and the hanging sign assembly in front (`Plane052/053` + `Cylinder001..005`) without touching `.glb` on disk
    const pathLabel = getAncestorPath(mesh);
    if (
      /Cidade_leaves_0_3/i.test(pathLabel) ||
      /^Cidade_Object_(8|10|12)$/i.test(mesh.name)
    ) {
      eastTreeMeshes.push(mesh);
    } else if (
      /Cidade_leaves001_1_7/i.test(pathLabel) ||
      /^Cidade_Object_(15|17|19)$/i.test(mesh.name)
    ) {
      westTreeMeshes.push(mesh);
    } else if (
      /Cidade_(Plane05[23]_8[56]|Cylinder00[1-5]_(79|80|81|84|87))/i.test(pathLabel) ||
      /^Cidade_Object_(296|299|302|304|313|315|318|321|323|326|328)$/i.test(mesh.name)
    ) {
      frontSignMeshes.push(mesh);
    }

    const matLabel = mats.map((m) => m?.name ?? '').join(' ').toLowerCase();
    const isFoliage = /grass|leav|material\.005|material\.009/i.test(matLabel);
    mesh.castShadow = !isFoliage;
    mesh.receiveShadow = true;

    for (const rawMat of mats) {
      const mat = rawMat as THREE.MeshStandardMaterial;
      if (!mat || seenMats.has(mat.uuid)) continue;
      seenMats.add(mat.uuid);

      const name = (mat.name || '').toLowerCase();
      if (/real_road|road|asphalt/i.test(name)) {
        roads.push(mat);
      } else if (/concrete_pavement|tiles/i.test(name)) {
        sidewalks.push(mat);
      } else if (/window|wiind/i.test(name)) {
        windows.push(mat);
      } else if (/grass|leav|material\.005|material\.009/i.test(name)) {
        foliage.push(mat);
      } else if (/palettematerial005|material\.033/i.test(name)) {
        kioskGlass.push(mat);
      } else if (/material\.026|material\.035/i.test(name)) {
        billboards.push(mat);
      } else if (
        mat.emissive &&
        (mat.emissive.r + mat.emissive.g + mat.emissive.b > 0.25)
      ) {
        streetLamps.push(mat);
      }
    }
  });

  const buildOccluderGroup = (
    role: ForegroundOccluderRole,
    label: string,
    meshes: THREE.Mesh[]
  ): ForegroundOccluderGroup | null => {
    if (meshes.length === 0) return null;
    const worldBox = new THREE.Box3();
    for (const m of meshes) {
      worldBox.union(new THREE.Box3().setFromObject(m));
    }
    return {
      role,
      label,
      meshes,
      worldBox,
      occluded: false,
    };
  };

  const foregroundOccluders = [
    buildOccluderGroup('eastTree', 'Cidade_leaves_0_3 (East Plaza Tree)', eastTreeMeshes),
    buildOccluderGroup('westTree', 'Cidade_leaves001_1_7 (West Plaza Tree)', westTreeMeshes),
    buildOccluderGroup('frontSign', 'Cidade_Plane052_053 (Foreground Hanging Sign)', frontSignMeshes),
  ].filter((g): g is ForegroundOccluderGroup => g !== null);

  // 2. Configure `Player_Rig` SkinnedMesh shadows & disable premature frustum culling during skinning
  playerRig.traverse((obj) => {
    const skinned = obj as THREE.SkinnedMesh;
    if ((obj as THREE.Mesh).isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
    if (skinned.isSkinnedMesh) {
      skinned.frustumCulled = false;
    }
  });

  // 3. Configure `Carro_Grupo` shadows & capture headlight cover materials
  carroGrupo.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const rawMat of mats) {
      const mat = rawMat as THREE.MeshStandardMaterial;
      if (!mat || seenMats.has(mat.uuid)) continue;
      seenMats.add(mat.uuid);
      if (/headlight/i.test(`${mesh.name} ${mat.name}`)) {
        carHeadlightCovers.push(mat);
      }
    }
  });

  const clips = normalizeCharacterClips(gltf.animations ?? []);

  let disposed = false;
  const dispose = (): void => {
    if (disposed) return;
    disposed = true;
    LifecycleManager.disposeObject3D(cidade);
    LifecycleManager.disposeObject3D(playerRig);
    LifecycleManager.disposeObject3D(carroGrupo);
    LifecycleManager.disposeObject3D(sceneRoot);
    onDisposeExtra?.();
  };

  return {
    sceneRoot,
    nodes: {
      cidade,
      playerRig,
      carroGrupo,
    },
    clips,
    materials: {
      roads,
      sidewalks,
      windows,
      streetLamps,
      foliage,
      kioskGlass,
      billboards,
      carHeadlightCovers,
    },
    foregroundOccluders,
    dispose,
  };
}

/**
 * GlbSceneLoader: Modular, zero-CDN `.glb` + `DRACOLoader` asset loader.
 * - Defaults to relative paths `'./assets/models/cena_completa.glb'` and `'./assets/draco/'`
 *   so deployments at root (`/`, Vercel) and subpath (`/AncientStudio/`, GitHub Pages) work identically.
 * - Reports streaming progress and structured errors.
 * - Guarantees complete worker + GPU disposal even if `dispose()` is called mid-flight.
 */
export class GlbSceneLoader {
  private dracoLoader: DRACOLoader | null = null;
  private gltfLoader: GLTFLoader | null = null;
  private disposed = false;

  public load(options?: GlbSceneLoadOptions): Promise<PreparedUrbanGlbAssets> {
    if (this.disposed) {
      return Promise.reject(new Error('[GlbSceneLoader] Loader has already been disposed.'));
    }

    const modelUrl = normalizeRelativeModelUrl(options?.modelUrl);
    const decoderPath = normalizeRelativeDecoderPath(options?.dracoDecoderPath);

    if (!this.dracoLoader) {
      this.dracoLoader = new DRACOLoader();
    }
    this.dracoLoader.setDecoderPath(decoderPath);
    this.dracoLoader.setWorkerLimit(
      Math.max(1, Math.min(8, Math.round(options?.workerLimit ?? 4)))
    );
    this.dracoLoader.preload();

    if (!this.gltfLoader) {
      this.gltfLoader = new GLTFLoader();
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    }

    return new Promise<PreparedUrbanGlbAssets>((resolve, reject) => {
      this.gltfLoader!.load(
        modelUrl,
        (gltf) => {
          if (this.disposed) {
            LifecycleManager.disposeObject3D(gltf.scene);
            reject(new Error('[GlbSceneLoader] Load cancelled because engine was destroyed.'));
            return;
          }
          try {
            const prepared = extractAndPrepareGlbNodes(gltf);
            resolve(prepared);
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        },
        (event) => {
          if (this.disposed || !options?.onProgress) return;
          const loaded = event.loaded ?? 0;
          const total = event.lengthComputable && event.total > 0 ? event.total : 0;
          options.onProgress({
            url: modelUrl,
            loaded,
            total,
            ratio: total > 0 ? Math.min(1, loaded / total) : -1,
          });
        },
        (err) => {
          const message =
            err instanceof Error
              ? err.message
              : typeof err === 'object' && err !== null && 'message' in err
                ? String((err as { message: unknown }).message)
                : String(err);
          reject(
            new Error(`[GlbSceneLoader] Failed to load "${modelUrl}": ${message}`)
          );
        }
      );
    });
  }

  /**
   * Parses an in-memory `.glb` `ArrayBuffer` (ideal for offline/headless Node & integration tests).
   */
  public parseBuffer(buffer: ArrayBuffer, resourcePath = ''): Promise<PreparedUrbanGlbAssets> {
    if (this.disposed) {
      return Promise.reject(new Error('[GlbSceneLoader] Loader has already been disposed.'));
    }
    if (!this.dracoLoader) {
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath(DEFAULT_DRACO_DECODER_PATH);
      this.dracoLoader.setWorkerLimit(4);
    }
    if (!this.gltfLoader) {
      this.gltfLoader = new GLTFLoader();
      this.gltfLoader.setDRACOLoader(this.dracoLoader);
    }

    return new Promise<PreparedUrbanGlbAssets>((resolve, reject) => {
      this.gltfLoader!.parse(
        buffer,
        resourcePath,
        (gltf) => {
          try {
            resolve(extractAndPrepareGlbNodes(gltf));
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        },
        (err) => {
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      );
    });
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.dracoLoader) {
      this.dracoLoader.dispose();
      this.dracoLoader = null;
    }
    this.gltfLoader = null;
  }

  public isDisposed(): boolean {
    return this.disposed;
  }
}
