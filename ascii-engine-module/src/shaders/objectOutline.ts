import * as THREE from 'three';
import type {
  ObjectOutlineHandle,
  ObjectOutlineOptions,
  OutlineColorInput,
  ResolvedObjectOutlineState,
} from '../types';

/**
 * Configurable Per-Object Silhouette Outline Module (`objectOutline.ts`):
 * - Applies an on-demand, watertight inverted-hull silhouette shell (`THREE.BackSide`) to a
 *   specific target `THREE.Object3D` (Mesh or Group hierarchy) without affecting the rest of the scene.
 * - Computes position-welded smooth miter normals (`aOutlineNormal`) once per geometry so flat-shaded
 *   boxes, cones, cylinders, prisms, and spheres all produce continuous gap-free corners.
 * - Supports configurable `thickness`/`width`, `enabled`/`visible` activation, `intensity`, `opacity`,
 *   and an optional `highlightColor`/`color` (default `#7DF9FF`) tailored to separate dark objects
 *   (such as Tux's obsidian coat) from dark backgrounds in the ASCII post-processing pipeline.
 */

export const DEFAULT_OUTLINE_HIGHLIGHT_COLOR = '#7DF9FF';
export const OUTLINE_SHELL_NAME = '__AsciiObjectOutlineShell__';

export const OUTLINE_VERTEX_SHADER = /* glsl */ `
  attribute vec3 aOutlineNormal;

  uniform float uOutlineThickness;
  uniform float uDepthBias;

  void main() {
    vec3 smoothN = length(aOutlineNormal) > 0.001 ? normalize(aOutlineNormal) : normalize(normal);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * smoothN);

    // Hybrid view-space + clip-space silhouette extrusion keeps outline crisp & uniform in ASCII cells
    mvPosition.xyz += viewNormal * (0.016 * uOutlineThickness);
    vec4 clipPos = projectionMatrix * mvPosition;

    vec2 projNormal = (projectionMatrix * vec4(viewNormal.xy, 0.0, 0.0)).xy;
    float projLen = length(projNormal);
    vec2 screenDir = projLen > 0.0001 ? (projNormal / projLen) : vec2(0.0, 1.0);

    clipPos.xy += screenDir * (0.0135 * uOutlineThickness) * clipPos.w;
    clipPos.z += uDepthBias * clipPos.w;

    gl_Position = clipPos;
  }
`;

export const OUTLINE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec3 uOutlineColor;
  uniform float uOutlineIntensity;
  uniform float uOutlineOpacity;

  void main() {
    gl_FragColor = vec4(uOutlineColor * uOutlineIntensity, uOutlineOpacity);
  }
`;

interface InternalOutlineRecord {
  target: THREE.Object3D;
  material: THREE.ShaderMaterial;
  shells: Map<THREE.Mesh, THREE.Mesh>;
  state: {
    enabled: boolean;
    thickness: number;
    highlightColor: string;
    intensity: number;
    opacity: number;
    depthBias: number;
    excludePedestal: boolean;
  };
  meshFilter?: (mesh: THREE.Mesh) => boolean;
  handle: ObjectOutlineHandle;
}

const outlineRegistry = new WeakMap<THREE.Object3D, InternalOutlineRecord>();

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function resolveHexColor(input: OutlineColorInput | undefined, fallbackHex: string): THREE.Color {
  const c = new THREE.Color();
  if (input === undefined || input === null) {
    c.set(fallbackHex);
    return c;
  }
  if (input instanceof THREE.Color) {
    return input.clone();
  }
  try {
    c.set(input as string | number);
    return c;
  } catch {
    c.set(fallbackHex);
    return c;
  }
}

/**
 * Computes position-welded smooth miter normals (`aOutlineNormal`) once on a `BufferGeometry`.
 * Deduplicating identical face normals per welded vertex position ensures symmetric 45°/54.7°
 * corner extrusion on flat-shaded boxes, cones, cylinders, and polyhedra without corner splits.
 */
export function ensureWeldedOutlineNormals(geometry: THREE.BufferGeometry): void {
  if (geometry.getAttribute('aOutlineNormal')) return;

  const posAttr = geometry.getAttribute('position');
  if (!posAttr || posAttr.count === 0) return;

  if (!geometry.getAttribute('normal')) {
    geometry.computeVertexNormals();
  }
  const normAttr = geometry.getAttribute('normal');
  if (!normAttr) return;

  const count = posAttr.count;
  const buckets = new Map<string, { sumX: number; sumY: number; sumZ: number; seen: Set<string> }>();
  const vertexKeys = new Array<string>(count);

  for (let i = 0; i < count; i++) {
    const px = Math.round(posAttr.getX(i) * 10000);
    const py = Math.round(posAttr.getY(i) * 10000);
    const pz = Math.round(posAttr.getZ(i) * 10000);
    const key = `${px},${py},${pz}`;
    vertexKeys[i] = key;

    let nx = normAttr.getX(i);
    let ny = normAttr.getY(i);
    let nz = normAttr.getZ(i);
    const nLen = Math.hypot(nx, ny, nz);
    if (nLen > 1e-6) {
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;
    }

    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { sumX: 0, sumY: 0, sumZ: 0, seen: new Set<string>() };
      buckets.set(key, bucket);
    }

    const nKey = `${Math.round(nx * 100)},${Math.round(ny * 100)},${Math.round(nz * 100)}`;
    if (!bucket.seen.has(nKey)) {
      bucket.seen.add(nKey);
      bucket.sumX += nx;
      bucket.sumY += ny;
      bucket.sumZ += nz;
    }
  }

  const welded = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const bucket = buckets.get(vertexKeys[i]!);
    let wx = bucket ? bucket.sumX : normAttr.getX(i);
    let wy = bucket ? bucket.sumY : normAttr.getY(i);
    let wz = bucket ? bucket.sumZ : normAttr.getZ(i);
    let len = Math.hypot(wx, wy, wz);

    if (len <= 1e-5) {
      wx = normAttr.getX(i);
      wy = normAttr.getY(i);
      wz = normAttr.getZ(i);
      len = Math.hypot(wx, wy, wz) || 1;
    }

    welded[i * 3] = wx / len;
    welded[i * 3 + 1] = wy / len;
    welded[i * 3 + 2] = wz / len;
  }

  geometry.setAttribute('aOutlineNormal', new THREE.BufferAttribute(welded, 3));
}

function isEligibleOutlineMesh(
  mesh: THREE.Mesh,
  excludePedestal: boolean,
  meshFilter?: (mesh: THREE.Mesh) => boolean
): boolean {
  if (mesh.userData?.__isAsciiOutlineShell) return false;
  if (mesh.userData?.skipObjectOutline) return false;
  if (mesh.name === OUTLINE_SHELL_NAME) return false;

  // Skip nested descendants if an ancestor is itself an outline shell
  let p = mesh.parent;
  while (p) {
    if (p.userData?.__isAsciiOutlineShell) return false;
    p = p.parent;
  }

  if (excludePedestal) {
    if (mesh.userData?.isShowcasePedestal) return false;
    if (mesh.name === 'TuxShowcasePlinth') return false;
    if (mesh.geometry?.type === 'RingGeometry') return false;
  }

  if (meshFilter && !meshFilter(mesh)) {
    return false;
  }

  return Boolean(mesh.geometry && mesh.geometry.getAttribute('position'));
}

function createOutlineMaterial(state: InternalOutlineRecord['state']): THREE.ShaderMaterial {
  const colorObj = resolveHexColor(state.highlightColor, DEFAULT_OUTLINE_HIGHLIGHT_COLOR);
  return new THREE.ShaderMaterial({
    name: 'AsciiObjectOutlineMaterial',
    vertexShader: OUTLINE_VERTEX_SHADER,
    fragmentShader: OUTLINE_FRAGMENT_SHADER,
    side: THREE.BackSide,
    transparent: state.opacity < 0.999,
    depthTest: true,
    depthWrite: state.opacity >= 0.999,
    toneMapped: false,
    uniforms: {
      uOutlineThickness: { value: state.thickness },
      uOutlineColor: { value: colorObj },
      uOutlineIntensity: { value: state.intensity },
      uOutlineOpacity: { value: state.opacity },
      uDepthBias: { value: state.depthBias },
    },
  });
}

function syncRecordShells(record: InternalOutlineRecord): void {
  const eligibleMeshes = new Set<THREE.Mesh>();

  record.target.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      if (isEligibleOutlineMesh(mesh, record.state.excludePedestal, record.meshFilter)) {
        eligibleMeshes.add(mesh);
      }
    }
  });

  // Remove shells from meshes no longer eligible or detached
  for (const [hostMesh, shell] of record.shells.entries()) {
    if (!eligibleMeshes.has(hostMesh)) {
      shell.parent?.remove(shell);
      record.shells.delete(hostMesh);
    }
  }

  // Attach shells to newly eligible meshes
  for (const hostMesh of eligibleMeshes) {
    let shell = record.shells.get(hostMesh);
    if (!shell) {
      ensureWeldedOutlineNormals(hostMesh.geometry);
      shell = new THREE.Mesh(hostMesh.geometry, record.material);
      shell.name = OUTLINE_SHELL_NAME;
      shell.userData.__isAsciiOutlineShell = true;
      shell.userData.skipNormalPass = true;
      shell.castShadow = false;
      shell.receiveShadow = false;
      shell.frustumCulled = hostMesh.frustumCulled;
      shell.renderOrder = (hostMesh.renderOrder || 0) + 1;
      hostMesh.add(shell);
      record.shells.set(hostMesh, shell);
    }
    shell.visible = record.state.enabled;
  }

  // Sync shared material uniforms
  const u = record.material.uniforms;
  if (u.uOutlineThickness) u.uOutlineThickness.value = record.state.thickness;
  if (u.uOutlineColor) {
    (u.uOutlineColor.value as THREE.Color).copy(
      resolveHexColor(record.state.highlightColor, DEFAULT_OUTLINE_HIGHLIGHT_COLOR)
    );
  }
  if (u.uOutlineIntensity) u.uOutlineIntensity.value = record.state.intensity;
  if (u.uOutlineOpacity) u.uOutlineOpacity.value = record.state.opacity;
  if (u.uDepthBias) u.uDepthBias.value = record.state.depthBias;

  const isTransparent = record.state.opacity < 0.999;
  if (record.material.transparent !== isTransparent) {
    record.material.transparent = isTransparent;
    record.material.depthWrite = !isTransparent;
    record.material.needsUpdate = true;
  }
}

function buildStateSnapshot(record: InternalOutlineRecord): ResolvedObjectOutlineState {
  return {
    enabled: record.state.enabled,
    thickness: record.state.thickness,
    highlightColor: record.state.highlightColor,
    intensity: record.state.intensity,
    opacity: record.state.opacity,
    depthBias: record.state.depthBias,
    excludePedestal: record.state.excludePedestal,
    outlinedMeshCount: record.shells.size,
  };
}

/**
 * Applies or updates a configurable silhouette outline on a specific target `THREE.Object3D`
 * (single `Mesh` or composite `Group` such as a character/mascot rig).
 *
 * Does NOT apply any global post-process outline to the scene and is strictly opt-in per target.
 */
export function applyObjectOutline(
  target: THREE.Object3D,
  options?: ObjectOutlineOptions
): ObjectOutlineHandle {
  if (!target || typeof target.traverse !== 'function') {
    throw new TypeError('[applyObjectOutline] Expected a valid THREE.Object3D target.');
  }

  const existing = outlineRegistry.get(target);
  const rawEnabled =
    options?.enabled !== undefined
      ? options.enabled
      : options?.visible !== undefined
        ? options.visible
        : existing?.state.enabled ?? true;

  const rawThickness =
    options?.thickness !== undefined
      ? options.thickness
      : options?.width !== undefined
        ? options.width
        : existing?.state.thickness ?? 1.0;

  const rawColorInput =
    options?.highlightColor !== undefined
      ? options.highlightColor
      : options?.color !== undefined
        ? options.color
        : existing?.state.highlightColor ?? DEFAULT_OUTLINE_HIGHLIGHT_COLOR;

  const resolvedColor = resolveHexColor(rawColorInput, DEFAULT_OUTLINE_HIGHLIGHT_COLOR);
  const nextState: InternalOutlineRecord['state'] = {
    enabled: Boolean(rawEnabled),
    thickness: clamp(rawThickness, 0.05, 8.0),
    highlightColor: `#${resolvedColor.getHexString().toUpperCase()}`,
    intensity: clamp(options?.intensity ?? existing?.state.intensity ?? 1.85, 0.1, 6.0),
    opacity: clamp(options?.opacity ?? existing?.state.opacity ?? 1.0, 0.0, 1.0),
    depthBias: clamp(options?.depthBias ?? existing?.state.depthBias ?? 0.0012, 0.0, 0.05),
    excludePedestal: options?.excludePedestal ?? existing?.state.excludePedestal ?? true,
  };

  if (existing) {
    existing.state = nextState;
    if (options?.meshFilter !== undefined) {
      existing.meshFilter = options.meshFilter;
    }
    syncRecordShells(existing);
    return existing.handle;
  }

  const material = createOutlineMaterial(nextState);
  const shells = new Map<THREE.Mesh, THREE.Mesh>();

  const record: InternalOutlineRecord = {
    target,
    material,
    shells,
    state: nextState,
    meshFilter: options?.meshFilter,
    handle: null as unknown as ObjectOutlineHandle,
  };

  const handle: ObjectOutlineHandle = {
    target,
    getState: () => buildStateSnapshot(record),
    update: (nextOpts: ObjectOutlineOptions) => {
      applyObjectOutline(target, nextOpts);
      return buildStateSnapshot(record);
    },
    setVisible: (visible: boolean) => {
      applyObjectOutline(target, { enabled: visible });
      return buildStateSnapshot(record);
    },
    dispose: () => clearObjectOutline(target),
  };

  record.handle = handle;
  outlineRegistry.set(target, record);
  syncRecordShells(record);

  return handle;
}

/**
 * Removes and disposes any per-object outline shells & shader material attached to `target`.
 * Returns the number of outline shell meshes detached.
 */
export function clearObjectOutline(target: THREE.Object3D): number {
  if (!target) return 0;

  const existing = outlineRegistry.get(target);
  let removed = 0;

  if (existing) {
    for (const shell of existing.shells.values()) {
      shell.parent?.remove(shell);
      removed += 1;
    }
    existing.shells.clear();
    existing.material.dispose();
    outlineRegistry.delete(target);
    return removed;
  }

  // Fallback sweep if any orphan outline shells exist in subtree
  const orphans: THREE.Mesh[] = [];
  target.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh && obj.userData?.__isAsciiOutlineShell) {
      orphans.push(obj as THREE.Mesh);
    }
  });
  const disposedMaterials = new Set<THREE.Material>();
  for (const shell of orphans) {
    shell.parent?.remove(shell);
    if (shell.material && !Array.isArray(shell.material) && !disposedMaterials.has(shell.material)) {
      disposedMaterials.add(shell.material);
      shell.material.dispose();
    }
    removed += 1;
  }

  return removed;
}

/**
 * Reads the current outline configuration and attached shell count on `target`,
 * or returns `null` if no outline has been applied to `target`.
 */
export function getObjectOutlineState(
  target: THREE.Object3D
): ResolvedObjectOutlineState | null {
  const existing = outlineRegistry.get(target);
  if (!existing) return null;
  return buildStateSnapshot(existing);
}
