# ASCII 3D engine integration contract

The real engine is the `ascii-engine-module/` package merged from PR #4. No core
file is edited by the site: `assets/js/ascii-engine.bundle.js` is an integration
build of the module's public facade (plus its `three` dependency), and
`assets/js/engine-adapter.js` is the only bridge used by the page.

## Real facade

```ts
new AsciiSceneEngine(container, config) // facade from ascii-engine-module/src/index.ts
  .mount() .pause() .resume() .updateConfig(partial) .destroy()
  .getState() .getConfig() .getStats()
```

`window.ASCIIRealms` exposes `AsciiSceneEngine`, `THREE`, `DEFAULT_ENGINE_CONFIG`
and `DEFAULT_PALETTE`. The adapter also tolerates older namespace-style engines
(`mount`/`create`/`Engine`) so the static site continues to work if the bundle is
replaced by another implementation.

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
var scene = TP.scene.create(container, { preset: 'sanctuary', weather: true });
scene.mount()          // Promise<boolean>; false means fallback
scene.setPaused(bool)
scene.setPreset('storm')
scene.setCycle(true)   // animated night ↔ day palette + lighting
scene.setAutoOrbit(true) // synthetic pointer movement drives camera rotation
scene.destroy()
```

`TP.scene.mount/setPaused/setPreset/destroy` remain as convenience wrappers for
all created controllers. Controller instances emit `tp:scene-mode` with
`{ mode: 'engine' | 'fallback' }` so the UI enables controls only when ready.

## Playground systems

`[ ASCII REALMS // SCENE ]` uses the merged engine's terrain, ruins/architecture,
torches, foreground silhouettes, forest, horizon, cursor light and ember
particles. The adapter adds ASCII rain (storm preset) or drifting motes, plus
palette/bloom/DoF/parallax changes for `sanctuary`, `dawn`, `day`, `storm` and
`emerald`. `[ STACK // NEOFETCH ]` adds a real `THREE.Group` penguin to the same
engine scene; it spins continuously and follows pointer movement through the
engine's passive parallax input, so touch scrolling is never prevented.

## Rebuilding the bundle

```bash
cd ascii-engine-module
npm install
npx esbuild integration-entry.ts --bundle --format=iife \
  --global-name=ASCIIRealms --minify --target=es2020 \
  --outfile=../assets/js/ascii-engine.bundle.js
```
