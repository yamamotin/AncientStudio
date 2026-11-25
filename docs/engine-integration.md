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
(`SceneComposerKit`, `SceneDepthRig`, `EntityBlueprintRegistry`, `World`,
`SystemRunner`) and standalone per-object outline helpers (`applyObjectOutline`,
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
the unified Cyberpunk Neo-Sector boulevard (`MapLoader` + `PlaygroundSceneBuilder`
+ `PlaygroundEntityFactory`), elevated maglev viaduct and train, neon towers and
holograms, cyber-trees animated by `WindSystem`, patrolling drones/hover-vehicles,
5-tap PCF street shadows, ~35% GPU `max()` lighten block-detail blend, `5:8`
grid-free glyph cells, cursor light and smooth HiDPI resolution scaling. The
adapter maps the three UI buttons to `atmosphere` + palette/weather state on that
single scene: `day`, `night` and `rain` (`rain` enables ASCII precipitation and
stronger wind). [`docs/changelog-2026-11-25.md`](changelog-2026-11-25.md) records
the engine-side tools added on that date.

`[ STACK // NEOFETCH ]` mounts `#penguin-stage` in `mode: 'mascot'` (built by
`TuxEntityFactory` with `TuxShowcasePlinth`, falling back to the 2D ASCII
raycaster in `assets/js/neofetch.js` when hardware WebGL2 is unavailable). It
spins only on the horizontal axis (`yaw`), continuously, with no pitch and no
pointer, mouse or touch response; the stage is `pointer-events: none`. Text
content is limited to the seven specified stack rows. The page does **not** yet
call the engine outline API on the penguin.

## Per-object outline API (engine side, not yet consumed by the UI)

`AsciiSceneEngine` exposes `setObjectOutline(target, options)`,
`clearObjectOutline(target?)` and `getObjectOutlineState(target)`. Targets can be
an `Object3D`, `'primary'`, a scene object name or an ECS `EntityId`. Options
include `highlightColor`/`color`, `thickness`/`width`, `intensity`, `opacity` and
`enabled`/`visible`. The effect is opt-in per object, not a global post-process.
Frontend integration is intentionally pending after 2026-11-25.

## Rebuilding the bundle

```bash
cd ascii-engine-module
npm install
npm run typecheck
npm run build:portfolio
```
