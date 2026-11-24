/* Decoupled wrapper for the ASCII 3D engine developed on another branch.
   It never imports engine internals: it detects a public entry point at runtime. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var state = {
    container: null,
    instance: null,
    engine: null,
    observer: null,
    mode: 'fallback',
    preset: 'outpost',
    paused: false
  };

  /* Only this list needs updating if the engine exposes a different global. */
  function resolveEngine() {
    var globals = [
      window.ASCIIRealms,
      window.AsciiRealms,
      window.AsciiRealmsEngine,
      TP.engine,
      TP.asciiRealms
    ];

    for (var i = 0; i < globals.length; i += 1) {
      var source = globals[i];
      if (!source) continue;
      if (source.default) source = source.default;

      var factory = source.mount || source.create || source.createASCIIRealms;
      if (typeof source === 'function' && !factory) factory = source;
      if (!factory && typeof source.Engine === 'function') {
        factory = function (options) { return new source.Engine(options); };
      }
      if (typeof factory === 'function') return { source: source, factory: factory };
    }
    return null;
  }

  function setMode(mode) {
    state.mode = mode;
    if (!state.container) return;
    state.container.setAttribute('data-mode', mode);
    state.container.dispatchEvent(new CustomEvent('tp:scene-mode', {
      detail: { mode: mode },
      bubbles: true
    }));
  }

  function target() {
    return state.instance || state.engine || null;
  }

  function invoke(method, value, alias) {
    var object = target();
    if (!object) return;
    var fn = object[method] || (state.engine && state.engine[method]);
    if (typeof fn !== 'function' && alias) {
      fn = object[alias] || (state.engine && state.engine[alias]);
    }
    if (typeof fn === 'function') fn.call(object, value);
  }

  function resize(width, height) {
    var object = target();
    if (!object) return;
    if (typeof object.resize === 'function') {
      object.resize.call(object, { width: width, height: height });
    } else if (typeof object.setSize === 'function') {
      object.setSize.call(object, width, height);
    }
  }

  function observe() {
    if (!state.container || !window.ResizeObserver) return;
    state.observer = new ResizeObserver(function (entries) {
      var rect = entries[0] && entries[0].contentRect;
      if (rect) resize(Math.round(rect.width), Math.round(rect.height));
    });
    state.observer.observe(state.container);
  }

  async function mount(container, options) {
    if (!container) return false;
    state.container = container;
    state.preset = (options && options.preset) || state.preset;
    state.paused = options && typeof options.paused === 'boolean' ? options.paused : false;

    var resolved = resolveEngine();
    if (!resolved) {
      setMode('fallback');
      return false;
    }

    try {
      var created = resolved.factory(container, {
        preset: state.preset,
        paused: state.paused
      });
      if (created && typeof created.then === 'function') created = await created;
      state.instance = created || resolved.source;
      state.engine = resolved.source;
      setMode('engine');
      observe();
      setPaused(state.paused);
      setPreset(state.preset);
      return true;
    } catch (error) {
      state.instance = null;
      state.engine = null;
      setMode('fallback');
      return false;
    }
  }

  function setPaused(paused) {
    state.paused = Boolean(paused);
    invoke('setPaused', state.paused);
  }

  function setPreset(preset) {
    state.preset = preset;
    invoke('setPreset', preset);
  }

  function destroy() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
    invoke('destroy', undefined, 'dispose');
    state.instance = null;
    state.engine = null;
    state.container = null;
    setMode('fallback');
  }

  /* If the engine loads after this adapter, one event is enough to attach it. */
  window.addEventListener('ascii-realms:ready', function () {
    if (state.container && !state.instance) mount(state.container, state);
  });
  window.addEventListener('pagehide', destroy);

  TP.scene = {
    mount: mount,
    setPaused: setPaused,
    setPreset: setPreset,
    destroy: destroy,
    getMode: function () { return state.mode; }
  };
})(window.TP);
