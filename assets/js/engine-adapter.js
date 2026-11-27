/* Integration layer for the modular ASCII Engine (`ascii-engine.bundle.js`).
   Connects:
   1. `#ascii-scene` -> Pre-built 3D Urban GLB scene (`./assets/models/cena_completa.glb` + `./assets/draco/`, `mode: 'playground'`)
      with three cohesive atmosphere states: `day` ("Dia"), `night` ("Noite"), and `rain` ("Com chuva")
   2. `#penguin-stage` -> High-contrast 3D articulated Tux mascot (`mode: 'mascot'`)
   Zero framework dependencies and zero external CDNs. The playground keeps scroll-safe passive pointer input
   and WASD + E character controls; the mascot has no pointer interaction and spins on its own via a single RAF loop. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var controllers = [];

  // The UI exposes one Cyber-Noir + Entropism scene with three modes: day, night and rain.
  var DEFAULT_MODE = 'night';
  var SCENE_MODES = ['day', 'night', 'rain'];
  var MIN_CELL_PX = 2.0;
  var FINE_CELL_THRESHOLD_PX = 6.0;
  var FINE_CELL_STEP_PX = 0.25;
  var COARSE_CELL_STEP_PX = 0.5;

  function buildCellSizeStops(maxPx, minPx) {
    var resolved = resolveEngine();
    if (resolved && resolved.source && typeof resolved.source.buildMicroCellStops === 'function') {
      return resolved.source.buildMicroCellStops(maxPx, minPx);
    }
    var safeMin = Math.max(1.5, Number((minPx || MIN_CELL_PX).toFixed(2)));
    var safeMax = Math.max(safeMin, Number((maxPx || 8).toFixed(2)));
    var stops = [];
    var fineCeil = Math.min(safeMax, FINE_CELL_THRESHOLD_PX);
    var fineCount = Math.floor((fineCeil - safeMin + 1e-6) / FINE_CELL_STEP_PX);
    for (var i = 0; i <= fineCount; i += 1) {
      var v = Number((safeMin + i * FINE_CELL_STEP_PX).toFixed(2));
      if (v <= safeMax + 1e-6) stops.push(Math.min(v, safeMax));
    }
    if (safeMax > FINE_CELL_THRESHOLD_PX + 1e-6) {
      var cur = FINE_CELL_THRESHOLD_PX + COARSE_CELL_STEP_PX;
      while (cur < safeMax - 1e-6) {
        stops.push(Number(cur.toFixed(2)));
        cur += COARSE_CELL_STEP_PX;
      }
    }
    var last = stops[stops.length - 1];
    if (last === undefined || Math.abs(last - safeMax) > 0.005) stops.push(safeMax);
    return stops;
  }

  function snapCellSize(value, maxPx, minPx) {
    var resolved = resolveEngine();
    if (resolved && resolved.source && typeof resolved.source.snapToMicroCellStop === 'function') {
      return resolved.source.snapToMicroCellStop(value, maxPx, minPx);
    }
    var stops = buildCellSizeStops(maxPx, minPx);
    var num = Number(value);
    if (!Number.isFinite(num)) return stops[stops.length - 1];
    var clamped = Math.max(stops[0], Math.min(stops[stops.length - 1], num));
    var best = stops[0];
    var bestDist = Math.abs(clamped - best);
    for (var i = 1; i < stops.length; i += 1) {
      var dist = Math.abs(clamped - stops[i]);
      if (dist < bestDist - 1e-6) {
        best = stops[i];
        bestDist = dist;
      }
    }
    return best;
  }
  var PRESETS = {
    night: {
      palette: {
        background: '#0E161F',
        warmLight: '#5C8E92',
        warmCore: '#9DB0BF',
        coolAmbient: '#7D92A6',
        foliageAccent: '#2E404E',
        cursorLight: '#7D92A6'
      },
      bloomIntensity: 0.30,
      dofStrength: 0.16,
      edgeStrength: 0.94,
      blockBlendWeight: 0.14,
      windStrength: 0.62,
      parallaxIntensity: 0.35
    },
    day: {
      palette: {
        background: '#213242',
        warmLight: '#C9A86A',
        warmCore: '#E6EEF5',
        coolAmbient: '#9EB4C8',
        foliageAccent: '#3D5E4C',
        cursorLight: '#B8CCE0'
      },
      bloomIntensity: 0.16,
      dofStrength: 0.10,
      edgeStrength: 0.92,
      blockBlendWeight: 0.16,
      windStrength: 0.42,
      parallaxIntensity: 0.30
    },
    rain: {
      palette: {
        background: '#111C27',
        warmLight: '#5A909C',
        warmCore: '#A2B6C6',
        coolAmbient: '#7890A6',
        foliageAccent: '#2C424E',
        cursorLight: '#7E98AE'
      },
      bloomIntensity: 0.34,
      dofStrength: 0.18,
      edgeStrength: 0.95,
      blockBlendWeight: 0.16,
      windStrength: 1.45,
      parallaxIntensity: 0.40
    }
  };

  function configFor(name) {
    var mode = SCENE_MODES.indexOf(name) >= 0 ? name : DEFAULT_MODE;
    var preset = PRESETS[mode] || PRESETS[DEFAULT_MODE];
    var atmosphere = mode !== 'rain' ? mode : 'rain';
    return {
      atmosphere: atmosphere,
      palette: Object.assign({}, preset.palette),
      bloomIntensity: preset.bloomIntensity,
      dofStrength: preset.dofStrength,
      edgeStrength: preset.edgeStrength,
      blockBlendWeight: preset.blockBlendWeight,
      windStrength: preset.windStrength,
      parallaxIntensity: preset.parallaxIntensity
    };
  }

  /* Software WebGL (SwiftShader/llvmpipe) spends seconds per frame on multi-pass shaders.
     Keep software devices on the instant 3D raycast / static ASCII fallback; hardware GPUs get full WebGL2. */
  function hasHardwareWebGL2() {
    try {
      var canvas = document.createElement('canvas');
      var gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
      if (!gl) return false;
      var extension = gl.getExtension('WEBGL_debug_renderer_info');
      var renderer = extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : '';
      var lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      return !/swiftshader|llvmpipe|software|basic render/i.test(String(renderer));
    } catch (error) {
      return false;
    }
  }

  function resolveEngine() {
    var globals = [window.ASCIIRealms, window.AsciiRealms, TP.engine, TP.asciiRealms];

    for (var i = 0; i < globals.length; i += 1) {
      var source = globals[i];
      if (!source) continue;
      if (source.default) source = source.default;

      if (typeof source.AsciiSceneEngine === 'function') {
        return {
          source: source,
          factory: function (container, options) {
            var instance = new source.AsciiSceneEngine(container, options.config);
            instance.mount();
            return instance;
          }
        };
      }

      var factory = source.mount || source.create || source.createASCIIRealms;
      if (typeof source === 'function' && !factory) factory = source;
      if (!factory && typeof source.Engine === 'function') {
        factory = function (options) { return new source.Engine(options); };
      }
      if (typeof factory === 'function') return { source: source, factory: factory };
    }
    return null;
  }

  function createController(container, options) {
    var isMascot = Boolean(options && options.mascotFocus);

    var state = {
      container: container,
      engine: null,
      instance: null,
      mode: 'fallback',
      preset: SCENE_MODES.indexOf((options && options.preset) || '') >= 0
        ? (options && options.preset)
        : DEFAULT_MODE,
      paused: false,
      mascotSpinGroup: null,
      mascotSpinLast: 0,
      telemetryRaf: null,
      observer: null,
      resizeRaf: null,
      fullscreenListener: null,
      initialConfigCellSize: Number(options && options.config && options.config.cellSize) || 8,
      initialAutoResponsive: !(options && options.config && options.config.autoResponsiveDensity === false),
      mountCellSize: Number(options && options.config && options.config.cellSize) || 8,
      currentCellSize: Number(options && options.config && options.config.cellSize) || 8,
      customCellActive: false,
      measuredInitialSize: false
    };

    function emit(mode) {
      state.mode = mode;
      container.setAttribute('data-mode', mode);
      container.dispatchEvent(new CustomEvent('tp:scene-mode', { detail: { mode: mode }, bubbles: true }));
    }

    function applyConfig(partial) {
      if (state.instance && typeof state.instance.updateConfig === 'function') {
        state.instance.updateConfig(partial);
      }
    }

    function getThreeScene() {
      if (!state.instance) return null;
      if (typeof state.instance.getScene === 'function') return state.instance.getScene();
      return null;
    }

    /* Wrap the Tux root in an integration-only group. The ECS still owns its
       Transform; rotating the wrapper gives a continuous horizontal spin without
       mouse/touch reaction or yaw/pitch telemetry. */
    function ensureMascotSpinGroup() {
      if (state.mascotSpinGroup) return;
      var scene = getThreeScene();
      var THREE = state.engine && state.engine.THREE;
      if (!scene || !THREE || typeof scene.getObjectByName !== 'function') return;

      var root = scene.getObjectByName('TuxMascotRoot');
      if (!root || root.parent === state.mascotSpinGroup) return;

      var group = new THREE.Group();
      group.name = 'TuxAutoSpin';
      scene.add(group);
      if (typeof group.attach === 'function') group.attach(root);
      else group.add(root);
      state.mascotSpinGroup = group;
      container.setAttribute('data-auto-spin', 'true');
    }

    function clearMascotSpin() {
      var scene = getThreeScene();
      if (state.mascotSpinGroup) {
        var root = state.mascotSpinGroup.children[0];
        if (root && scene) {
          if (typeof scene.attach === 'function') scene.attach(root);
          else scene.add(root);
        }
        if (state.mascotSpinGroup.parent) state.mascotSpinGroup.parent.remove(state.mascotSpinGroup);
      }
      state.mascotSpinGroup = null;
      state.mascotSpinLast = 0;
      container.removeAttribute('data-auto-spin');
    }

    function stepMascotSpin(now) {
      state.telemetryRaf = null;
      if (!isMascot || state.paused || !state.instance) return;

      ensureMascotSpinGroup();
      var tSec = (now || performance.now()) * 0.001;
      var delta = state.mascotSpinLast ? Math.min(0.05, tSec - state.mascotSpinLast) : 0;
      state.mascotSpinLast = tSec;
      // Integration-only wrapper: horizontal yaw only, with no pitch/badge updates.
      if (state.mascotSpinGroup) state.mascotSpinGroup.rotation.y += delta * 0.55;

      state.telemetryRaf = window.requestAnimationFrame(stepMascotSpin);
    }

    function startMascotSpin() {
      if (!isMascot || state.paused || state.telemetryRaf) return;
      state.mascotSpinLast = 0;
      state.telemetryRaf = window.requestAnimationFrame(stepMascotSpin);
    }

    function setAutoOrbit(enabled) {
      // CameraFollow owns orbit; synthetic PointerEvent motion would also
      // perturb the cursor light and character animation.
      if (state.instance && typeof state.instance.setAutoOrbit === 'function' && !isMascot) {
        state.instance.setAutoOrbit(Boolean(enabled));
      }
    }

    function setPaused(paused) {
      state.paused = Boolean(paused);
      if (!state.instance) return;
      if (state.paused) {
        if (typeof state.instance.pause === 'function') state.instance.pause();
        if (state.telemetryRaf) window.cancelAnimationFrame(state.telemetryRaf);
        state.telemetryRaf = null;
      } else {
        if (typeof state.instance.resume === 'function') state.instance.resume();
        if (isMascot) startMascotSpin();
      }
    }

    function setPreset(name) {
      var mode = SCENE_MODES.indexOf(name) >= 0 ? name : DEFAULT_MODE;
      state.preset = mode;
      if (!isMascot) {
        applyConfig(configFor(mode));
      }
    }

    function scheduleSmoothResize(width, height) {
      if (!width || !height || width <= 0 || height <= 0) return;
      if (state.resizeRaf) window.cancelAnimationFrame(state.resizeRaf);
      state.resizeRaf = window.requestAnimationFrame(function () {
        state.resizeRaf = null;
        if (state.instance && typeof state.instance.resize === 'function') {
          state.instance.resize({ width: width, height: height }, false);
          if (!state.measuredInitialSize && !state.customCellActive) {
            var stats = typeof state.instance.getStats === 'function' ? state.instance.getStats() : null;
            var active = stats && Number(stats.activeCellSize);
            if (active > 0) {
              state.mountCellSize = Math.max(MIN_CELL_PX, Math.min(state.initialConfigCellSize, Number(active.toFixed(2))));
              state.currentCellSize = state.mountCellSize;
              state.measuredInitialSize = true;
            }
          }
        }
      });
    }

    function observe() {
      if (window.ResizeObserver) {
        state.observer = new ResizeObserver(function (entries) {
          if (entries[0] && entries[0].contentRect.width > 0) {
            scheduleSmoothResize(entries[0].contentRect.width, entries[0].contentRect.height);
          }
        });
        state.observer.observe(container);
      }

      state.fullscreenListener = function () {
        var rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          scheduleSmoothResize(rect.width, rect.height);
        }
      };
      document.addEventListener('fullscreenchange', state.fullscreenListener);
    }

    async function mount() {
      var resolved = hasHardwareWebGL2() ? resolveEngine() : null;
      if (!resolved) {
        emit('fallback');
        return false;
      }

      try {
        var basePresetConfig = configFor(state.preset);
        var modeDefaults = isMascot
          ? {
              mode: 'mascot',
              atmosphere: 'night',
              palette: {
                background: '#13222E',
                warmLight: '#9AD0F0',
                warmCore: '#FF9F1C',
                coolAmbient: '#1D2B36',
                foliageAccent: '#2B4254',
                cursorLight: '#9AD0F0'
              },
              cellSize: 8,
              autoResponsiveDensity: true,
              maxPixelRatio: 2,
              bloomIntensity: 0.08,
              dofStrength: 0.0,
              edgeStrength: 0.96,
              blockBlendWeight: 0.0,
              enableShadows: true
            }
          : {
              mode: 'playground',
              modelUrl: './assets/models/cena_completa.glb',
              dracoDecoderPath: './assets/draco/',
              fov: 58,
              enableKeyboard: true,
              cellSize: 8,
              autoResponsiveDensity: true,
              enableShadows: true,
              maxPixelRatio: 2
            };

        var mergedConfig = Object.assign(
          {},
          basePresetConfig,
          modeDefaults,
          (options && options.config) || {}
        );

        var created = resolved.factory(container, {
          preset: state.preset,
          paused: state.paused,
          config: mergedConfig
        });
        if (created && typeof created.then === 'function') created = await created;
        state.instance = created || resolved.source;
        state.engine = resolved.source;

        var lifecycle = typeof state.instance.getState === 'function' ? state.instance.getState() : '';
        if (lifecycle === 'idle' && typeof state.instance.mount === 'function') state.instance.mount();

        // Capture ceiling (`max`) directly from the mounted scene/config (never expanding above it)
        var instCfg = typeof state.instance.getConfig === 'function' ? state.instance.getConfig() : mergedConfig;
        var instStats = typeof state.instance.getStats === 'function' ? state.instance.getStats() : null;
        var cfgCell = Number(instCfg && instCfg.cellSize) || Number(mergedConfig.cellSize) || 8;
        state.initialConfigCellSize = cfgCell;
        state.initialAutoResponsive = instCfg ? instCfg.autoResponsiveDensity !== false : mergedConfig.autoResponsiveDensity !== false;
        var activeAtMount = instStats && Number(instStats.activeCellSize) > 0
          ? Number(instStats.activeCellSize)
          : cfgCell;
        state.mountCellSize = Math.max(MIN_CELL_PX, Math.min(cfgCell, Number(activeAtMount.toFixed(2))));
        state.currentCellSize = state.mountCellSize;
        state.customCellActive = false;

        emit('engine');
        if (isMascot) startMascotSpin();
        observe();
        setPaused(state.paused);
        return true;
      } catch (error) {
        state.instance = null;
        state.engine = null;
        emit('fallback');
        return false;
      }
    }

    function destroy() {
      window.removeEventListener('pagehide', destroy);
      if (state.telemetryRaf) {
        window.cancelAnimationFrame(state.telemetryRaf);
        state.telemetryRaf = null;
      }
      if (state.resizeRaf) {
        window.cancelAnimationFrame(state.resizeRaf);
        state.resizeRaf = null;
      }
      clearMascotSpin();
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
      if (state.fullscreenListener) {
        document.removeEventListener('fullscreenchange', state.fullscreenListener);
        state.fullscreenListener = null;
      }
      if (state.instance && typeof state.instance.destroy === 'function') state.instance.destroy();
      state.instance = null;
      state.engine = null;
      emit('fallback');
    }

    if (isMascot) container.setAttribute('data-pointer-locked', 'true');

    window.addEventListener('pagehide', destroy);

    function setCellSize(px) {
      if (isMascot) return state.mountCellSize;
      var snapped = snapCellSize(px, state.mountCellSize, MIN_CELL_PX);
      state.currentCellSize = snapped;
      if (Math.abs(snapped - state.mountCellSize) < 0.005) {
        state.customCellActive = false;
        applyConfig({
          cellSize: state.initialConfigCellSize,
          autoResponsiveDensity: state.initialAutoResponsive
        });
      } else {
        state.customCellActive = true;
        applyConfig({
          cellSize: snapped,
          autoResponsiveDensity: false
        });
      }
      return snapped;
    }

    function resetCellSize() {
      if (isMascot) return state.mountCellSize;
      state.customCellActive = false;
      state.currentCellSize = state.mountCellSize;
      applyConfig({
        cellSize: state.initialConfigCellSize,
        autoResponsiveDensity: state.initialAutoResponsive
      });
      return state.mountCellSize;
    }

    function getCellSizeRange() {
      return {
        min: MIN_CELL_PX,
        max: state.mountCellSize,
        current: state.currentCellSize,
        stops: buildCellSizeStops(state.mountCellSize, MIN_CELL_PX)
      };
    }

    return {
      mount: mount,
      setPaused: setPaused,
      setPreset: setPreset,
      setAutoOrbit: setAutoOrbit,
      setCellSize: setCellSize,
      resetCellSize: resetCellSize,
      getCellSize: function () { return state.currentCellSize; },
      getMaxCellSize: function () { return state.mountCellSize; },
      getCellSizeRange: getCellSizeRange,
      getScene: getThreeScene,
      setPlayableKeyboard: function (enabled) {
        if (state.instance && typeof state.instance.setPlayableKeyboardEnabled === 'function') {
          state.instance.setPlayableKeyboardEnabled(Boolean(enabled));
        }
      },
      getStats: function () {
        return state.instance && typeof state.instance.getStats === 'function'
          ? state.instance.getStats()
          : null;
      },
      destroy: destroy,
      getMode: function () { return state.mode; }
    };
  }

  function loadEngineBundle() {
    if (window.ASCIIRealms || document.querySelector('script[data-ascii-engine]')) return;
    var script = document.createElement('script');
    script.src = 'assets/js/ascii-engine.bundle.js';
    script.defer = true;
    script.setAttribute('data-ascii-engine', '');
    script.addEventListener('load', function () {
      window.dispatchEvent(new Event('ascii-realms:ready'));
    });
    document.head.appendChild(script);
  }

  function scheduleEngineLoad() {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadEngineBundle, { timeout: 1500 });
    } else {
      window.setTimeout(loadEngineBundle, 400);
    }
  }

  function initDeferredEngineLoad() {
    var stages = [document.getElementById('penguin-stage'), document.getElementById('ascii-scene')].filter(Boolean);
    var trigger = function () { scheduleEngineLoad(); };

    if (window.IntersectionObserver && stages.length) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          observer.disconnect();
          trigger();
        }
      }, { rootMargin: '200px' });
      stages.forEach(function (stage) { observer.observe(stage); });
    }

    ['pointerdown', 'keydown', 'wheel'].forEach(function (type) {
      window.addEventListener(type, trigger, { once: true, passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeferredEngineLoad, { once: true });
  } else {
    initDeferredEngineLoad();
  }

  var DEFAULT_DRACO_PATH = './assets/draco/';
  var DEFAULT_GLB_URL = './assets/models/cena_completa.glb';
  var sharedGlbLoader = null;
  var lastGlbMetrics = null;

  function ensureGlbLoader(options) {
    var resolved = resolveEngine();
    if (!resolved || !resolved.source || typeof resolved.source.SceneGlbLoader !== 'function') {
      return null;
    }
    if (!sharedGlbLoader) {
      sharedGlbLoader = new resolved.source.SceneGlbLoader({
        decoderPath: (options && options.decoderPath) || DEFAULT_DRACO_PATH,
        modelUrl: (options && options.modelUrl) || DEFAULT_GLB_URL,
        workerLimit: (options && options.workerLimit) || 4,
        decoderType: options && options.decoderType,
        fetchImpl: options && options.fetchImpl
      });
    }
    return sharedGlbLoader;
  }

  function disposeGlbLoader() {
    if (sharedGlbLoader && typeof sharedGlbLoader.dispose === 'function') {
      sharedGlbLoader.dispose();
    }
    sharedGlbLoader = null;
  }

  async function loadSceneGlb(options) {
    var loader = ensureGlbLoader(options);
    if (!loader) {
      throw new Error('SceneGlbLoader is unavailable until ascii-engine.bundle.js is loaded.');
    }
    var url = (options && options.url) || DEFAULT_GLB_URL;
    var asset = await loader.load(url);
    lastGlbMetrics = asset.metrics;
    if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('tp:scene-glb-loaded', { detail: asset.metrics }));
    }
    return asset;
  }

  TP.scene = {
    create: function (container, options) {
      var controller = createController(container, options);
      controllers.push(controller);
      return controller;
    },
    mount: function (container, options) {
      return TP.scene.create(container, options).mount();
    },
    setPaused: function (paused) { controllers.forEach(function (c) { c.setPaused(paused); }); },
    setPreset: function (name) { controllers.forEach(function (c) { c.setPreset(name); }); },
    setAutoOrbit: function (enabled) { controllers.forEach(function (c) { c.setAutoOrbit(enabled); }); },
    getScene: function () { return controllers.length ? controllers[0].getScene() : null; },
    loadSceneGlb: loadSceneGlb,
    getGlbMetrics: function () { return lastGlbMetrics; },
    disposeGlbLoader: disposeGlbLoader,
    destroy: function () {
      controllers.forEach(function (c) { c.destroy(); });
      controllers = [];
      disposeGlbLoader();
    },
    getMode: function () { return controllers.length ? controllers[0].getMode() : 'fallback'; }
  };

  window.addEventListener('ascii-realms:ready', function () {
    controllers.forEach(function (controller) {
      if (controller.getMode() === 'fallback') controller.mount();
    });
  });

  window.dispatchEvent(new Event('engine-adapter:ready'));
})(window.TP);
