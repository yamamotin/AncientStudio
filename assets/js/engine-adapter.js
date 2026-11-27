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
  var MAX_CELL_PX = 21.0;
  var DEFAULT_CELL_PX = 2.25;
  var DEFAULT_REFLECTION = 0.35;
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

  var SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen|angle \(google/i;
  var RETRY_DELAYS = [250, 600, 1200, 2400, 4000];

  /* One throw-away WebGL2 context. Returns null when the driver refuses the request. */
  function probeWebGL2(attributes) {
    try {
      var canvas = document.createElement('canvas');
      var gl = canvas.getContext('webgl2', attributes);
      if (!gl) return null;
      var extension = gl.getExtension('WEBGL_debug_renderer_info');
      var renderer = extension ? String(gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) || '') : '';
      var lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      return { renderer: renderer };
    } catch (error) {
      return null;
    }
  }

  /* Software WebGL (SwiftShader/llvmpipe) spends seconds per frame on multi-pass shaders,
     so those devices keep the instant 3D raycast / static ASCII fallback.

     `failIfMajorPerformanceCaveat: true` is the fast path, but several real hardware
     drivers (blocklisted Windows builds, remote sessions, older Mesa) refuse the context
     *because of that flag only*. Those used to leave the section on the static skeleton
     forever, so a second, flag-free probe runs and the renderer string decides: a real GPU
     name is accepted, an actual software rasterizer is not. */
  function webgl2Support() {
    var strict = probeWebGL2({ failIfMajorPerformanceCaveat: true });
    if (strict && !SOFTWARE_RENDERER.test(strict.renderer)) {
      return { ok: true, reason: '', renderer: strict.renderer };
    }
    var relaxed = strict || probeWebGL2({
      antialias: false,
      depth: true,
      stencil: false,
      powerPreference: 'high-performance'
    });
    if (relaxed && !SOFTWARE_RENDERER.test(relaxed.renderer)) {
      return { ok: true, reason: '', renderer: relaxed.renderer };
    }
    return {
      ok: false,
      reason: relaxed ? 'webgl-software' : 'webgl-unavailable',
      renderer: relaxed ? relaxed.renderer : ''
    };
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
      initialConfigCellSize: Number(options && options.config && options.config.cellSize) || (isMascot ? 8 : DEFAULT_CELL_PX),
      initialAutoResponsive: isMascot ? true : Boolean(options && options.config && options.config.autoResponsiveDensity),
      mountCellSize: Number(options && options.config && options.config.cellSize) || (isMascot ? 8 : DEFAULT_CELL_PX),
      currentCellSize: Number(options && options.config && options.config.cellSize) || (isMascot ? 8 : DEFAULT_CELL_PX),
      customCellActive: false,
      reflectionStrength: DEFAULT_REFLECTION,
      // Diagnostics: why the stage is still on the static skeleton (null once mounted).
      failure: null,
      attempts: 0,
      mounting: false,
      retryTimer: null,
      support: null
    };

    function statusPayload() {
      return {
        mode: state.mode,
        reason: state.failure,
        mounted: Boolean(state.instance),
        attempts: state.attempts,
        cellSize: state.currentCellSize
      };
    }

    /* `tp:scene-status` carries the mount verdict so the UI can explain a fallback stage
       instead of leaving a bare skeleton behind. */
    function notifyStatus() {
      container.dispatchEvent(new CustomEvent('tp:scene-status', {
        detail: statusPayload(),
        bubbles: true
      }));
    }

    function emit(mode) {
      state.mode = mode;
      container.setAttribute('data-mode', mode);
      container.dispatchEvent(new CustomEvent('tp:scene-mode', { detail: { mode: mode }, bubbles: true }));
      notifyStatus();
    }

    /* The bundle is injected lazily; a slow network, a blocked script or a mount that threw
       must not strand the stage. Retries are bounded and only run while nothing is mounted. */
    function scheduleRetry() {
      if (state.instance || state.retryTimer) return;
      if (state.attempts > RETRY_DELAYS.length) return;
      if (state.failure !== 'engine-unavailable' && state.failure !== 'mount-failed') return;
      // `attempts` already counts the attempt that just failed.
      var delay = RETRY_DELAYS[Math.min(state.attempts - 1, RETRY_DELAYS.length - 1)];
      state.retryTimer = window.setTimeout(function () {
        state.retryTimer = null;
        mount();
      }, delay);
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
      if (state.instance || state.mounting) return Boolean(state.instance);
      state.mounting = true;
      state.attempts += 1;

      if (!state.support) state.support = webgl2Support();
      if (!state.support.ok) {
        // No WebGL2 at all (or only a software rasterizer): nothing to retry.
        state.failure = state.support.reason;
        state.mounting = false;
        emit('fallback');
        return false;
      }

      var resolved = resolveEngine();
      if (!resolved) {
        state.failure = 'engine-unavailable';
        state.mounting = false;
        emit('fallback');
        scheduleRetry();
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
              // Wheel = camera zoom on the stage (the engine owns a non-passive listener
              // there and preventDefaults it, so the page never jumps while zooming).
              enableWheelZoom: true,
              cellSize: DEFAULT_CELL_PX,
              autoResponsiveDensity: false,
              reflectionStrength: state.reflectionStrength,
              enableShadows: true,
              maxPixelRatio: 2
            };

        var mergedConfig = Object.assign(
          {},
          basePresetConfig,
          modeDefaults,
          (options && options.config) || {}
        );

        if (!isMascot) {
          var originalCallbacks = mergedConfig.callbacks || {};
          mergedConfig.callbacks = Object.assign({}, originalCallbacks, {
            onLoadError: function (error) {
              // A live renderer without the GLB only shows isolated light points.
              // Restore the explicit fallback instead of claiming the scene loaded.
              if (state.instance && typeof state.instance.pause === 'function') state.instance.pause();
              emit('fallback');
              if (typeof originalCallbacks.onLoadError === 'function') originalCallbacks.onLoadError(error);
            }
          });
        }

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

        // The default/reset value is independent of the slider's 21px ceiling.
        var instCfg = typeof state.instance.getConfig === 'function' ? state.instance.getConfig() : mergedConfig;
        state.initialConfigCellSize = Number(instCfg && instCfg.cellSize) || (isMascot ? 8 : DEFAULT_CELL_PX);
        state.initialAutoResponsive = Boolean(instCfg && instCfg.autoResponsiveDensity);
        state.mountCellSize = state.initialConfigCellSize;
        state.currentCellSize = state.mountCellSize;
        state.reflectionStrength = Math.max(0, Math.min(1, Number.isFinite(Number(instCfg && instCfg.reflectionStrength)) ? Number(instCfg.reflectionStrength) : DEFAULT_REFLECTION));
        state.customCellActive = false;

        state.failure = null;
        state.mounting = false;
        emit('engine');
        if (isMascot) startMascotSpin();
        observe();
        setPaused(state.paused);
        return true;
      } catch (error) {
        state.instance = null;
        state.engine = null;
        state.failure = 'mount-failed';
        state.mounting = false;
        emit('fallback');
        scheduleRetry();
        return false;
      }
    }

    function destroy() {
      window.removeEventListener('pagehide', destroy);
      if (state.retryTimer) {
        window.clearTimeout(state.retryTimer);
        state.retryTimer = null;
      }
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
      var snapped = snapCellSize(px, MAX_CELL_PX, MIN_CELL_PX);
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
        max: MAX_CELL_PX,
        current: state.currentCellSize,
        stops: buildCellSizeStops(MAX_CELL_PX, MIN_CELL_PX)
      };
    }

    return {
      mount: mount,
      setPaused: setPaused,
      setPreset: setPreset,
      setAutoOrbit: setAutoOrbit,
      setCellSize: setCellSize,
      setReflection: function (value) {
        if (isMascot) return state.reflectionStrength;
        var amount = Number(value);
        if (!Number.isFinite(amount)) return state.reflectionStrength;
        state.reflectionStrength = Math.max(0, Math.min(1, amount));
        applyConfig({ reflectionStrength: state.reflectionStrength });
        return state.reflectionStrength;
      },
      getReflection: function () { return state.reflectionStrength; },
      resetCellSize: resetCellSize,
      getCellSize: function () { return state.currentCellSize; },
      getMaxCellSize: function () { return isMascot ? state.mountCellSize : MAX_CELL_PX; },
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
      getMode: function () { return state.mode; },
      getStatus: statusPayload,
      remount: function () {
        if (state.retryTimer) {
          window.clearTimeout(state.retryTimer);
          state.retryTimer = null;
        }
        state.attempts = 0;
        state.support = null;
        return mount();
      }
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
    // A blocked/failed bundle must be visible: the stage would otherwise stay a skeleton.
    script.addEventListener('error', function () {
      window.dispatchEvent(new Event('ascii-realms:error'));
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
    setReflection: function (value) { controllers.forEach(function (c) { c.setReflection(value); }); },
    getScene: function () { return controllers.length ? controllers[0].getScene() : null; },
    loadSceneGlb: loadSceneGlb,
    getGlbMetrics: function () { return lastGlbMetrics; },
    disposeGlbLoader: disposeGlbLoader,
    destroy: function () {
      controllers.forEach(function (c) { c.destroy(); });
      controllers = [];
      disposeGlbLoader();
    },
    getMode: function () { return controllers.length ? controllers[0].getMode() : 'fallback'; },
    getStatus: function () { return controllers.length ? controllers[0].getStatus() : null; },
    remount: function () { return controllers.length ? controllers[0].remount() : false; }
  };

  /* The bundle arrived: retry every stage that is still on the static skeleton. */
  window.addEventListener('ascii-realms:ready', function () {
    controllers.forEach(function (controller) {
      if (controller.getMode() === 'fallback') controller.remount();
    });
  });

  window.addEventListener('ascii-realms:error', function () {
    controllers.forEach(function (controller) {
      if (controller.getMode() === 'fallback') controller.remount();
    });
  });

  /* Last chance after every subresource settled (fonts, GLB, decoders). */
  window.addEventListener('load', function () {
    controllers.forEach(function (controller) {
      if (controller.getMode() === 'fallback') controller.remount();
    });
  }, { once: true });

  window.dispatchEvent(new Event('engine-adapter:ready'));
})(window.TP);
