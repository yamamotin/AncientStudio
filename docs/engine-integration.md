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
`DEFAULT_PALETTE`, `DEFAULT_ASCII_RAMP`, scene composition tools
(`SceneComposerKit`, `SceneDepthRig`, `MascotStageBuilder`, `MASCOT_BACKDROP_HEX`,
`MASCOT_FLOOR_HEX`, `EntityBlueprintRegistry`, `World`, `SystemRunner`) and
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
scene.destroy()
```

`setCycle()` and the old presets (`sanctuary`, `dawn`, `storm`, `emerald`) were
removed in 2026-11-25. `TP.scene.mount/setPaused/setPreset/destroy` remain as
convenience wrappers for all created controllers. Controller instances emit
`tp:scene-mode` with `{ mode: 'engine' | 'fallback' }` so the UI enables controls
only when ready.

## Playground systems

`[ ASCII REALMS // SCENE ]` runs `AsciiSceneEngine` in `mode: 'playground'` with
the unified **Cyber Noir + Entropism** boulevard (`MapLoader` +
`PlaygroundSceneBuilder` + `PlaygroundEntityFactory`): `#0C1217` entropic sky,
`#1A222A` weathered ASCII floor, `#2A3540` brutalist structures/ruins,
Techwear/Darkwear protagonist (`#14171C` / `#3B424C`) with an articulated
cybernetic mechanical arm (`#6E7B87` / `#8A99A6`, zero glowing sword/weapon), and
discreet `#4A7C7E` punctual accents. The camera uses a `106°` FOV centered on and
accompanying the protagonist (`CameraFollowSystem`), while clicking or tapping on
the ground projects onto the walkable surface (`InputSystem` +
`NavigationTargetComponent`) and drives a smooth `deltaTime` walk cycle
(`AnimationSystem`) that settles back to idle on arrival. All lights, emissives
and planar reflections modulate brightness strictly through `5:8` ASCII glyph
density without solid-block blowouts. The adapter maps the three UI buttons to
`day`, `night` and `rain` on that single scene.
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
