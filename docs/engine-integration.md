# ASCII 3D engine integration contract

The 3D engine lives on a separate branch and is **not** part of this branch.
Nothing in `assets/js/engine-adapter.js` imports or edits engine internals;
it only detects a public entry point at runtime. Until an engine is present,
`assets/js/engine-adapter.js` keeps the decorative fallback in the scene stage.

## Preferred public contract

```js
window.ASCIIRealms = {
  mount(container, options) {
    // options: { preset: 'outpost', paused: false }
    // returns an instance or Promise<instance>
  },
  setPaused(paused) {},
  setPreset(preset) {},
  resize({ width, height }) {},
  destroy() {}
};
```

An instance returned by `mount` may expose those same methods instead; the
adapter calls the instance first, then the namespace object. Accepted aliases:
`create`, `Engine` (constructor), `dispose` for `destroy`, and `setSize(width,
height)` for `resize`.

## Wrapper API used by the page

```js
TP.scene.mount(container, { preset, paused })   // Promise<boolean>
TP.scene.setPaused(true)                         // pause/resume
TP.scene.setPreset('terminal')                   // switch preset
TP.scene.destroy()                               // disconnect observer + engine
```

The wrapper owns a `ResizeObserver` on the stage container and forwards size
changes to the engine. On `pagehide` it calls `destroy()`.

## When the engine branch is merged

Only update the source list in `resolveEngine()` inside
`assets/js/engine-adapter.js` if the engine uses a different global/export.
The UI, controls and fallback need no changes.
