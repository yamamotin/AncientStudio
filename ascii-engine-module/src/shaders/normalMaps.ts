import * as THREE from 'three';

/**
 * Lightweight, zero-CDN procedural tangent-space normal maps synthesized in memory
 * (`64x64` linear `THREE.DataTexture`s, ~16 KB each) for flat glTF/procedural surfaces
 * that lack embedded `normalTexture`s (character suit, car bodywork, flat walls, curbs).
 */
export interface ProceduralNormalMapSet {
  /** Coarse mineral aggregate + subtle tire-lane micro-undulation for unmapped roadbeds. */
  readonly asphalt: THREE.DataTexture;
  /** Architectural expansion joints + brushed stone bevels for sidewalks and plaza curbs. */
  readonly pavement: THREE.DataTexture;
  /** Brutalist horizontal/vertical cladding seams + masonry relief for unmapped facades. */
  readonly facade: THREE.DataTexture;
  /** Low-frequency tailored contour/panel seam relief for `Player_Rig` and `Carro_Grupo`. */
  readonly contourTrim: THREE.DataTexture;
  /** Deterministically releases all procedural GPU normal textures. */
  dispose(): void;
}

/**
 * Deterministic integer hash in `[0, 1]` on a periodic `(x, y)` lattice (`period` wraps seamlessly).
 */
function periodicLatticeHash(x: number, y: number, period: number, seed: number): number {
  const px = ((x % period) + period) % period;
  const py = ((y % period) + period) % period;
  let n = Math.imul(px + 37, 374761393) + Math.imul(py + 17, 668265263) + Math.imul(seed, 1442695041);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

/**
 * Seamless tileable value noise in `[0, 1]` over normalized UV `[0, 1)` at integer `freq`.
 */
function seamlessValueNoise(u: number, v: number, freq: number, seed: number): number {
  const x = u * freq;
  const y = v * freq;
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = periodicLatticeHash(ix, iy, freq, seed);
  const n10 = periodicLatticeHash(ix + 1, iy, freq, seed);
  const n01 = periodicLatticeHash(ix, iy + 1, freq, seed);
  const n11 = periodicLatticeHash(ix + 1, iy + 1, freq, seed);

  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

/**
 * Converts an analytical seamless heightfield `heightFn(u, v)` into a linear tangent-space
 * `THREE.DataTexture` (`RGB = normalize([-dh/du, -dh/dv, 1]) * 0.5 + 0.5`).
 */
function buildNormalDataTexture(
  size: number,
  strength: number,
  repeatX: number,
  repeatY: number,
  heightFn: (u: number, v: number) => number
): THREE.DataTexture {
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      heights[y * size + x] = heightFn(u, v);
    }
  }

  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const yPrev = (y - 1 + size) % size;
    const yNext = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xPrev = (x - 1 + size) % size;
      const xNext = (x + 1) % size;

      const hL = heights[y * size + xPrev]!;
      const hR = heights[y * size + xNext]!;
      const hD = heights[yPrev * size + x]!;
      const hU = heights[yNext * size + x]!;

      const nxRaw = -(hR - hL) * strength;
      const nyRaw = -(hU - hD) * strength;
      const nzRaw = 1.0;
      const invLen = 1.0 / Math.hypot(nxRaw, nyRaw, nzRaw);

      const idx = (y * size + x) * 4;
      data[idx] = Math.round(THREE.MathUtils.clamp((nxRaw * invLen * 0.5 + 0.5) * 255, 0, 255));
      data[idx + 1] = Math.round(THREE.MathUtils.clamp((nyRaw * invLen * 0.5 + 0.5) * 255, 0, 255));
      data[idx + 2] = Math.round(THREE.MathUtils.clamp((nzRaw * invLen * 0.5 + 0.5) * 255, 0, 255));
      data[idx + 3] = 255;
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.repeat.set(repeatX, repeatY);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Synthesizes all 4 procedural tangent-space normal maps offline in `< 1 ms` with zero network I/O.
 */
export function createProceduralNormalMapSet(size = 64): ProceduralNormalMapSet {
  // 1. Asphalt aggregate + subtle longitudinal lane crown undulation
  const asphalt = buildNormalDataTexture(size, 2.4, 8, 8, (u, v) => {
    const coarse = seamlessValueNoise(u, v, 8, 11) * 0.55;
    const fine = seamlessValueNoise(u, v, 16, 29) * 0.30;
    const laneTrack = Math.cos(u * Math.PI * 4.0) * 0.15;
    return coarse + fine + laneTrack;
  });

  // 2. Sidewalk stone slabs: clean orthogonal expansion grooves + subtle brushed grain
  const pavement = buildNormalDataTexture(size, 2.8, 6, 6, (u, v) => {
    const cellU = (u * 2.0) % 1.0;
    const cellV = (v * 2.0) % 1.0;
    const edgeU = Math.min(cellU, 1.0 - cellU);
    const edgeV = Math.min(cellV, 1.0 - cellV);
    const grooveU = THREE.MathUtils.smoothstep(edgeU, 0.0, 0.075);
    const grooveV = THREE.MathUtils.smoothstep(edgeV, 0.0, 0.075);
    const slabBevel = Math.min(grooveU, grooveV);
    const grain = seamlessValueNoise(u, v, 12, 47) * 0.14;
    return slabBevel * 0.86 + grain;
  });

  // 3. Architectural facade cladding: horizontal courses + staggered vertical panel joints
  const facade = buildNormalDataTexture(size, 2.6, 4, 4, (u, v) => {
    const row = Math.floor(v * 4.0);
    const rowFract = (v * 4.0) % 1.0;
    const staggeredU = (u * 2.0 + (row % 2) * 0.5) % 1.0;
    const hSeam = THREE.MathUtils.smoothstep(Math.min(rowFract, 1.0 - rowFract), 0.0, 0.085);
    const vSeam = THREE.MathUtils.smoothstep(Math.min(staggeredU, 1.0 - staggeredU), 0.0, 0.065);
    const relief = Math.min(hSeam, vSeam);
    const micro = seamlessValueNoise(u, v, 8, 73) * 0.12;
    return relief * 0.88 + micro;
  });

  // 4. Smooth low-frequency contour seam relief for Player_Rig garment & Carro_Grupo panels
  const contourTrim = buildNormalDataTexture(size, 1.65, 3, 3, (u, v) => {
    const rib = Math.sin(u * Math.PI * 4.0) * 0.35 + Math.cos(v * Math.PI * 2.0) * 0.35;
    const softWeave = seamlessValueNoise(u, v, 6, 101) * 0.30;
    return rib + softWeave;
  });

  return {
    asphalt,
    pavement,
    facade,
    contourTrim,
    dispose(): void {
      asphalt.dispose();
      pavement.dispose();
      facade.dispose();
      contourTrim.dispose();
    },
  };
}

interface SavedMeshMaterialEntry {
  mesh: THREE.Mesh;
  originalMaterial: THREE.Material | THREE.Material[];
}

/**
 * Manages cached `THREE.MeshNormalMaterial` variants for Pass 2 (`normalTarget`) so per-material
 * `normalMap`s (both embedded glTF textures with `KHR_texture_transform` and procedural normal maps)
 * perturb view-space normals in `tNormal` at a controlled macro-relief scale without high-frequency static.
 */
export class NormalPassMaterialCache {
  private readonly fallbackMaterial = new THREE.MeshNormalMaterial();
  private readonly bySourceUuid = new Map<
    string,
    { normalMat: THREE.MeshNormalMaterial; sourceMap: THREE.Texture }
  >();
  private readonly swappedMeshes: SavedMeshMaterialEntry[] = [];
  private readonly hiddenObjects: THREE.Object3D[] = [];

  /**
   * Prepares `scene` for Pass 2 (`normalTarget`): hides `skipNormalPass` objects (alpha decals, VFX)
   * plus `Points`/`Line` primitives, and binds macro-filtered normal-map `MeshNormalMaterial`s onto
   * visible opaque `Mesh` / `SkinnedMesh` instances without traversing hidden subtrees.
   */
  public beginPass(scene: THREE.Scene): void {
    this.swappedMeshes.length = 0;
    this.hiddenObjects.length = 0;

    scene.traverseVisible((obj) => {
      if (
        obj.userData?.skipNormalPass === true ||
        (obj as THREE.Points).isPoints === true ||
        (obj as THREE.Line).isLine === true
      ) {
        this.hiddenObjects.push(obj);
        return;
      }

      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const orig = mesh.material;
      // MeshNormalMaterial does not implement alpha-test chunks. Avoid painting
      // opaque rectangles over cutout cards; mixed-material meshes are skipped
      // as a whole until a cutout-aware normal shader is available.
      const materials = Array.isArray(orig) ? orig : [orig];
      if (materials.some((material) => material && material.alphaTest > 0)) {
        this.hiddenObjects.push(mesh);
        return;
      }
      this.swappedMeshes.push({ mesh, originalMaterial: orig });

      if (Array.isArray(orig)) {
        mesh.material = orig.map((m) => this.resolveNormalMaterial(m));
      } else {
        mesh.material = this.resolveNormalMaterial(orig);
      }
    });

    for (let i = 0; i < this.hiddenObjects.length; i++) {
      this.hiddenObjects[i]!.visible = false;
    }
  }

  /**
   * Restores all original PBR/Shader materials and `skipNormalPass` visibility immediately after Pass 2.
   */
  public endPass(): void {
    for (let i = 0; i < this.swappedMeshes.length; i++) {
      const entry = this.swappedMeshes[i]!;
      entry.mesh.material = entry.originalMaterial;
    }
    this.swappedMeshes.length = 0;

    for (let i = 0; i < this.hiddenObjects.length; i++) {
      this.hiddenObjects[i]!.visible = true;
    }
    this.hiddenObjects.length = 0;
  }

  private resolveNormalMaterial(source: THREE.Material | null | undefined): THREE.Material {
    if (!source) return this.fallbackMaterial;

    const candidate = source as THREE.MeshStandardMaterial;
    const normalMap = candidate.normalMap;
    if (!normalMap || !normalMap.isTexture) {
      return this.fallbackMaterial;
    }

    const srcScaleX = candidate.normalScale ? Math.abs(candidate.normalScale.x) : 0.6;
    const srcScaleY = candidate.normalScale ? Math.abs(candidate.normalScale.y) : 0.6;
    // Attenuate micro-grain in Pass 2 so macro bevels/joints/grooves drive ASCII lighting cleanly without static
    const macroScaleX = THREE.MathUtils.clamp(srcScaleX * 0.42, 0.14, 0.48);
    const macroScaleY = THREE.MathUtils.clamp(srcScaleY * 0.42, 0.14, 0.48);

    const existing = this.bySourceUuid.get(source.uuid);
    if (existing && existing.sourceMap === normalMap) {
      existing.normalMat.normalScale.set(macroScaleX, macroScaleY);
      existing.normalMat.side = source.side;
      return existing.normalMat;
    }

    if (existing) {
      existing.normalMat.dispose();
    }

    const normalMat = new THREE.MeshNormalMaterial({
      normalMap,
      normalMapType: candidate.normalMapType ?? THREE.TangentSpaceNormalMap,
      normalScale: new THREE.Vector2(macroScaleX, macroScaleY),
      flatShading: candidate.flatShading === true,
      side: source.side,
    });
    this.bySourceUuid.set(source.uuid, { normalMat, sourceMap: normalMap });
    return normalMat;
  }

  public dispose(): void {
    this.endPass();
    this.fallbackMaterial.dispose();
    for (const entry of this.bySourceUuid.values()) {
      entry.normalMat.dispose();
    }
    this.bySourceUuid.clear();
  }
}

const _lightWorldPos = new THREE.Vector3();
const _targetWorldPos = new THREE.Vector3();
const _worldDir = new THREE.Vector3();

/**
 * Extracts view-space surface-to-light directions (`outKeyViewDir`, `outRimViewDir`) and true
 * gravity world-up (`outWorldUpViewDir`) for the active `camera` with zero heap allocations.
 */
export function extractSceneDirectionalVectors(
  scene: THREE.Scene,
  camera: THREE.Camera,
  outKeyViewDir: THREE.Vector3,
  outRimViewDir: THREE.Vector3,
  outWorldUpViewDir: THREE.Vector3
): void {
  camera.updateMatrixWorld();
  const invCam = camera.matrixWorldInverse;

  // True world-up (0, 1, 0) transformed into view space so pitched cameras distinguish ground vs walls accurately
  outWorldUpViewDir.set(0, 1, 0).transformDirection(invCam).normalize();

  let keyLight: THREE.DirectionalLight | null = null;
  let rimLight: THREE.DirectionalLight | null = null;

  for (let i = 0; i < scene.children.length; i++) {
    const child = scene.children[i]!;
    if (child instanceof THREE.DirectionalLight && child.visible && child.intensity > 0.01) {
      if (child.name === 'KeyDirectionalLight' || (!keyLight && child.name !== 'RimDirectionalLight')) {
        keyLight = child;
      } else if (child.name === 'RimDirectionalLight' || !rimLight) {
        rimLight = child;
      }
    }
  }

  if (keyLight) {
    keyLight.getWorldPosition(_lightWorldPos);
    keyLight.target.getWorldPosition(_targetWorldPos);
    _worldDir.subVectors(_lightWorldPos, _targetWorldPos);
    if (_worldDir.lengthSq() > 1e-6) {
      outKeyViewDir.copy(_worldDir.normalize()).transformDirection(invCam).normalize();
    } else {
      outKeyViewDir.set(-0.48, 0.72, 0.50).normalize();
    }
  } else {
    outKeyViewDir.set(-0.48, 0.72, 0.50).normalize();
  }

  if (rimLight) {
    rimLight.getWorldPosition(_lightWorldPos);
    rimLight.target.getWorldPosition(_targetWorldPos);
    _worldDir.subVectors(_lightWorldPos, _targetWorldPos);
    if (_worldDir.lengthSq() > 1e-6) {
      outRimViewDir.copy(_worldDir.normalize()).transformDirection(invCam).normalize();
    } else {
      outRimViewDir.set(0.58, 0.42, -0.70).normalize();
    }
  } else {
    outRimViewDir.set(0.58, 0.42, -0.70).normalize();
  }
}
