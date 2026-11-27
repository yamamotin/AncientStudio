# ASCII 3D engine integration contract

The real engine is the `ascii-engine-module/` package merged from PR #4. No core
file is edited by the site: `assets/js/ascii-engine.bundle.js` is an integration
build of the module's public facade (plus its `three` dependency), and
`assets/js/engine-adapter.js` is the only bridge used by the page.

## Real facade

```ts
new AsciiSceneEngine(container, config) // facade from ascii-engine-module/src/index.ts
  .mount() .pause() .resume() .resize(dims, immediate?) .updateConfig(partial) .destroy()
  .setPlayableKeyboardEnabled(enabled)
  .setObjectOutline(target, options?) .clearObjectOutline(target?) .getObjectOutlineState(target)
  .getState() .getConfig() .getStats() .getScene() .getCamera() .getPrimaryEntityAngles()
```

`window.ASCIIRealms` exposes `AsciiSceneEngine`, `THREE`, `DEFAULT_ENGINE_CONFIG`,
`DEFAULT_PALETTE`, `DEFAULT_ASCII_RAMP`, GLB/Draco & scene builders
(`GlbSceneLoader`, `UrbanGlbSceneBuilder`, `MascotStageBuilder`,
`MASCOT_BACKDROP_HEX`, `MASCOT_FLOOR_HEX`, `World`, `SystemRunner`,
`CharacterAnimationSystem`, `TrafficFlowSystem`, `CameraFollowSystem`) and
standalone per-object outline helpers (`applyObjectOutline`,
`clearObjectOutline`, `getObjectOutlineState`, `DEFAULT_OUTLINE_HIGHLIGHT_COLOR`).
The adapter also tolerates older namespace-style engines (`mount`/`create`/`Engine`)
so the static site continues to work if the bundle is replaced by another
implementation.

## Loading strategy

- `index.html` only loads the small terminal scripts. `main.js` lazily injects
  `engine-adapter.js` when an engine stage approaches the viewport or the user
  first interacts; the adapter lazily injects the WebGL bundle the same way.
  This keeps the large bundle off the critical path (Lighthouse ≥95).
- Hardware WebGL2 is required. Software renderers (SwiftShader/llvmpipe) keep
  the decorative ASCII fallback, avoiding multi-second post-processing frames.
- `IntersectionObserver` pauses offscreen engines; `ResizeObserver`, passive
  pointer listeners and `pagehide` cleanup remain in the adapter.

## Wrapper API used by the page

```js
var scene = TP.scene.create(container, { preset: 'night', weather: true });
scene.mount()            // Promise<boolean>; false means fallback
scene.setPaused(bool)
scene.setPreset('day')   // only 'day' | 'night' | 'rain'
scene.setAutoOrbit(true) // synthetic pointer movement drives camera rotation
scene.getCellSizeRange() // { min: 2, max: mountedCellPx, current, stops }
scene.setCellSize(2.5)   // fine 0.25px (<6px) / 0.5px (>6px) stops up to mounted max
scene.resetCellSize()    // restores initial mounted cell size & density config
scene.getScene()         // active THREE.Scene or null
scene.destroy()
```

`setCycle()` and the old presets (`sanctuary`, `dawn`, `storm`, `emerald`) were
removed in 2026-11-25. `TP.scene.mount/setPaused/setPreset/destroy` remain as
convenience wrappers for all created controllers. Controller instances emit
`tp:scene-mode` with `{ mode: 'engine' | 'fallback' }` so the UI enables controls
only when ready.

## Interactive scene systems

`[ CENA 3D INTERATIVA ]` / `[ INTERACTIVE SCENE 3D ]` runs `AsciiSceneEngine` in `mode: 'playground'`
loading `./assets/models/cena_completa.glb` via `GlbSceneLoader` (`GLTFLoader` +
self-hosted `DRACOLoader` at `./assets/draco/`, zero external CDN) and mapping
its three embedded root nodes into ECS entities (`UrbanGlbSceneBuilder`):
- `Cidade_Sketchfab_model`: static urban environment with atmosphere-reactive
  road/sidewalk PBR wetness and building window/streetlamp emissives;
- `Player_Rig`: controllable character moved on the XZ plane via `WASD` (and
  click/tap sidewalk navigation), clamped to walkable sidewalk boundaries via
  `THREE.MathUtils.clamp`, with `THREE.AnimationMixer` (`CharacterAnimationSystem`)
  cross-fading smoothly (`crossFadeTo`) between embedded NLA clips `Idle`,
  `Walking` and `Casting` (`THREE.LoopOnce` triggered by `E`);
- `Carro_Grupo`: moving light-source vehicle on the left lateral avenue driven
  by `TrafficFlowSystem` on a continuous **30-second** cycle (**8s** straight-line
  pass along `+Z` with `CarroHeadlightEmitterRig` — two front HDR emissive
  projector lenses, two additive optical halos, two volumetric beam cones, and
  two asphalt specular pools marked `skipNormalPass` — plus two front
  `SpotLight`s with `target`s parented to `Carro_Grupo` aimed onto the asphalt
  ahead and a forward `PointLight` throw, followed by **22s** hidden out of
  frame with `visible = false` and intensities zeroed).

A 45°-counter-clockwise elevated 3/4 camera (`CameraFollowSystem`, `fov: 58°`,
`offset: (10.3, 11.3, 10.3)`, inclined top-to-ground and pulled back to widen
framing of the street, storefront facades, streetlamps and vehicle lane)
accompanies `Player_Rig` smoothly (`lerp`) while respecting `setAutoOrbit` when
toggled. `LineOfSightOcclusionSystem` (ECS priority `39`) dynamically inspects
the two foreground plaza trees (`Cidade_leaves_0_3` and `Cidade_leaves001_1_7`)
and the hanging front sign (`Cidade_Plane052/053` + `Cylinder001..005`) without
modifying `cena_completa.glb` on disk, clearing obstructing foreground meshes
whenever they enter the camera-to-`Player_Rig` or central plaza sightline.
`GlbSceneLoader` also restores diffuse/sculpted PBR response on `Player_Rig`
(which ships with `material: undefined` / glTF `metalness = 1.0`) and
`Carro_Grupo` (`PaletteMaterial001..004`), preserves all embedded glTF
`normalTexture`s (`real_road`, `concrete_pavement`, `tiles`, `wall`, `hous4`,
`roof`, `tireProtector`), synthesizes lightweight zero-CDN procedural
tangent-space normal maps (`src/shaders/normalMaps.ts`: `asphalt`, `pavement`,
`facade`, `contourTrim`) for flat surfaces lacking embedded normal maps, and
tags alpha-blended billboard decals (`grass_medium_01`, `leavesfall`,
`PaletteMaterial005`) with `skipNormalPass` so `AsciiPostProcessor` Pass 2
(`normalTarget` via `NormalPassMaterialCache`) captures macro-filtered
normal-mapped view-space normals without rectangular quad contour noise.
Storefront facade lights (`StorefrontEastTransom`, `StorefrontWestTransom`,
`StorefrontEastNeon`, `StorefrontWestNeon`, `KioskCanopyGlow`), streetlamp
luminaires (`StreetLampGlobeWest/Center/East`), and the distant avenue beacon
(`AvenueCyberBeacon`) cast warm amber and contained cyber-cyan pools surrounded
by dark breathing shadows. The full-screen ASCII post-processing shader
(`AsciiPostProcessor` + `asciiShader.ts`) extracts view-space key/rim
directional light vectors (`uKeyLightViewDir`, `uRimLightViewDir`) and true
world-up (`uWorldUpViewDir`) each frame to drive normal-mapped directional
incidence (`N·L`, back-facing planar self-shadowing, Blinn-Phong `N·H` specular
glints, and Fresnel rim lighting), internal 3D offscreen supersampling
(`sceneTarget`, `normalTarget`, and `depthTexture` at `~1.5x–2.0x` within safe
`4096px` / `8.29 MP` GPU budgets) with full `effectiveDpr` sharpness up to `2.0`,
2x2 sub-quadrant multi-point filtered downsampling (`sampleCellIntegrated`,
`nSubIntegrated`, `subDepthPeak`), calibrated high-definition typographic cell
density (`~6.0px–6.8px` desktop, `~5.5px–6.2px` HD/UHD), rebalanced architectural
mass continuity (`structuralMassFloor` + gentle `farFade`), geometrically-aligned
directional structural contours (`|`, `/`, `\`, `-`, `+`), graduated surface
glyph ramps (`DEFAULT_ASCII_RAMP`), curated `*` and `o` highlight accents on
light halos, wet reflections and rain particles (`uHighlightGlyphs`), grounded 3D
shaded tonal underlayers (`smoothBackdrop` + `tonedUnderlayer`), foreground-scoped
depth-silhouette separation moats (`silhouetteOuterMoat` / `silhouetteInnerRim`),
normal-perturbed vertical rippled ground reflections (`sampleGroundReflection`),
and smooth damped mouse scroll-wheel zoom (`minDistance: 8.2m`, `maxDistance:
31.5m`, baseline `~19.65m`) along the 3rd-person camera sightline without
interfering with `WASD` or `setAutoOrbit`.
The adapter maps the three UI buttons (`day`, `night`, `rain`) to lighting, fog,
car headlights, pavement wetness, normal-map relief scale, and 3D rain particles.
[`docs/changelog-2026-11-25.md`](changelog-2026-11-25.md) records the earlier
engine-side tools added on that date.

`[ STACK // NEOFETCH ]` mounts `#penguin-stage` in `mode: 'mascot'` (`fov: 38°`)
using `MascotStageBuilder` (`#13222E` backdrop + `#1D2B36` floor with soft
PCF/contact shadow and yaw-synced diffused reflection) and `TuxEntityFactory`
(`includeShowcaseRig: false`, unified smooth vertex-colored torso quantized
strictly through pure ASCII glyphs with `blockBlendWeight: 0.0`). While the engine
is still loading, or if it fails, `assets/js/neofetch.js` shows a cute **static**
ASCII penguin placeholder (eyes, beak and webbed feet) that is never animated. As
soon as `data-mode="engine"` / `tp:scene-mode` reports the live scene, the
placeholder is hidden by CSS and no fallback loop touches the 3D mascot. The
active penguin spins only on the horizontal axis (`yaw`), continuously, with no
pitch and no pointer, mouse or touch response; the stage is `pointer-events: none`.
Text content is limited to the seven specified stack rows. The page does **not**
yet call the engine outline API on the penguin.

Mandatory architectural, stylistic (full-scene ASCII coherence, sober/desaturated
base palettes and value hierarchy), interaction and lifecycle (`deltaTime`,
listener cleanup and `.dispose()`) rules for any new `ascii-engine-module`
implementation are consolidated in
[`ascii-engine-module/README.md`](../ascii-engine-module/README.md).

## Per-object outline API (engine side, not yet consumed by the UI)

`AsciiSceneEngine` exposes `setObjectOutline(target, options)`,
`clearObjectOutline(target?)` and `getObjectOutlineState(target)`. Targets can be
an `Object3D`, `'primary'`, a scene object name or an ECS `EntityId`. Options
include `highlightColor`/`color`, `thickness`/`width`, `intensity`, `opacity` and
`enabled`/`visible`. The effect is opt-in per object, not a global post-process.
Frontend integration is intentionally pending after 2026-11-25.

## Self-hosted 3D scene asset & Draco decoder (zero CDN)

- Compressed scene model: `./assets/models/cena_completa.glb` (`KHR_draco_mesh_compression` + `EXT_texture_webp` at `1024px`, `11.52 MiB`, without Git LFS, preserving root nodes `Cidade_Sketchfab_model`, `Player_Rig`, `Carro_Grupo` and NLA tracks `Idle`, `Walking`, `Casting`).
- Self-hosted Draco decoder directory: `./assets/draco/` (`draco_decoder.js`, `draco_decoder.wasm`, `draco_wasm_wrapper.js` copied from `three/examples/jsm/libs/draco/`).
- Frontend decompression pipeline (`SceneGlbLoader` in `ascii-engine-module/src/world/SceneGlbLoader.ts`, exported on `window.ASCIIRealms` and wired via `TP.scene.loadSceneGlb()` / `TP.scene.getGlbMetrics()` in `assets/js/engine-adapter.js`):
  1. `DRACOLoader` fetches `./assets/draco/draco_wasm_wrapper.js` (`text`) and `./assets/draco/draco_decoder.wasm` (`arraybuffer`, `Content-Type: application/wasm`) in parallel, compiles a Blob Web Worker URL, and initializes a load-balanced pool of **4 Web Workers** (`workerLimit = 4`) — rejecting any external CDN URL.
  2. `SceneGlbLoader.load('./assets/models/cena_completa.glb')` downloads the `.glb` (`ArrayBuffer`) and calls `gltfLoader.parseAsync()`, dispatching all `154` Draco mesh primitives (`498,351` unique vertices, `438,122` triangles) via zero-copy `Transferable` `ArrayBuffer`s across the 4 WebAssembly Workers off the main UI thread while the browser decodes the `77` `EXT_texture_webp` textures asynchronously.
  3. On `TP.scene.destroy()` / `loader.dispose()`, all 4 Web Workers are terminated (`worker.terminate()`), the `blob:` URL is revoked (`URL.revokeObjectURL`), and GPU geometries/materials/textures are disposed via `LifecycleManager.disposeObject3D`.
- End-to-end benchmark: `node scripts/benchmark-site-load.js` and `tests/benchmark-site-load.test.js`.

## Rebuilding the bundle

```bash
cd ascii-engine-module
npm install
npm run typecheck
npm run build:portfolio
```
