/* Integration layer for the modular ASCII Engine (`ascii-engine.bundle.js`).
   Connects:
   1. `#ascii-scene` -> Lightweight interactive ASCII Realms Playground (`mode: 'playground'`)
   2. `#penguin-stage` -> High-contrast 3D articulated Tux mascot (`mode: 'mascot'`)
   Zero framework dependencies. The playground keeps scroll-safe passive pointer input;
   the mascot has no pointer interaction and spins on its own via a single RAF loop. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var controllers = [];

  // The UI exposes one scene with exactly three modes: day, night and rain.
  // These are palette/weather states only; engine internals are untouched.
  var DEFAULT_MODE = 'night';
  var SCENE_MODES = ['day', 'night', 'rain'];
  var PRESETS = {
    night: {
      palette: { background: '#05060D', warmLight: '#FF2A85', warmCore: '#FFC145', coolAmbient: '#00F0FF', foliageAccent: '#8A5CFF', cursorLight: '#64F5FF' },
      bloomIntensity: 1.48, dofStrength: 0.36, edgeStrength: 0.96, blockBlendWeight: 0.35, windStrength: 1.0, parallaxIntensity: 1.65
    },
    day: {
      palette: { background: '#08101C', warmLight: '#FF8E3C', warmCore: '#FFEE99', coolAmbient: '#5CEEFF', foliageAccent: '#4895EF', cursorLight: '#E0FBFC' },
      bloomIntensity: 1.02, dofStrength: 0.28, edgeStrength: 0.88, blockBlendWeight: 0.33, windStrength: 0.72, parallaxIntensity: 1.3
    },
    rain: {
      palette: { background: '#04050B', warmLight: '#FF1E6E', warmCore: '#FF9F1C', coolAmbient: '#00C8F0', foliageAccent: '#560BAD', cursorLight: '#90E0EF' },
      bloomIntensity: 1.82, dofStrength: 0.46, edgeStrength: 0.98, blockBlendWeight: 0.38, windStrength: 1.65, parallaxIntensity: 1.8
    },
  };

  function configFor(name) {
    var preset = PRESETS[name] || PRESETS[DEFAULT_MODE];
    return {
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
      weatherEnabled: !isMascot && (!options || options.weather !== false),
      orbitTimer: null,
      lastUserPointer: 0,
      mascotSpinGroup: null,
      mascotSpinLast: 0,
      telemetryRaf: null,
      weather: null,
      weatherRaf: null,
      weatherMode: '',
      observer: null,
      resizeRaf: null,
      fullscreenListener: null,
      pointerListener: null
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
       Transform; rotating the wrapper gives a continuous spin without touching
       the engine core, ECS systems or shaders. */
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
      // Integration-only wrapper: yaw only, with no pitch/badge updates.
      if (state.mascotSpinGroup) state.mascotSpinGroup.rotation.y += delta * 0.55;

      state.telemetryRaf = window.requestAnimationFrame(stepMascotSpin);
    }

    function startMascotSpin() {
      if (!isMascot || state.paused || state.telemetryRaf) return;
      state.mascotSpinLast = 0;
      state.telemetryRaf = window.requestAnimationFrame(stepMascotSpin);
    }

    function removeWeather() {
      if (state.weatherRaf) window.cancelAnimationFrame(state.weatherRaf);
      state.weatherRaf = null;
      if (!state.weather) return;
      if (state.weather.points.parent) state.weather.points.parent.remove(state.weather.points);
      state.weather.points.geometry.dispose();
      state.weather.points.material.dispose();
      state.weather = null;
    }

    function setWeather(mode) {
      if (!state.weatherEnabled) return;
      if (state.weatherMode === mode && state.weather) return;
      removeWeather();
      state.weatherMode = mode;

      var THREE = state.engine && state.engine.THREE;
      var scene = getThreeScene();
      if (!THREE || !scene || mode !== 'rain') return;

      var count = 180;
      var positions = new Float32Array(count * 3);
      var speeds = new Float32Array(count);

      for (var index = 0; index < count; index += 1) {
        positions[index * 3] = (Math.random() - 0.5) * 26;
        positions[index * 3 + 1] = Math.random() * 18 - 1;
        positions[index * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
        speeds[index] = 7 + Math.random() * 8;
      }

      var geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      var material = new THREE.PointsMaterial({
        color: 0x9fc6e8,
        size: 0.16,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false
      });
      var points = new THREE.Points(geometry, material);
      scene.add(points);
      state.weather = { points: points, speeds: speeds, last: performance.now() };
      if (!state.paused) state.weatherRaf = window.requestAnimationFrame(stepWeather);
    }

    function stepWeather(now) {
      var weather = state.weather;
      if (!weather || state.paused) return;
      var delta = Math.min(0.05, (now - weather.last) / 1000);
      weather.last = now;
      var attribute = weather.points.geometry.getAttribute('position');
      var values = attribute.array;

      for (var index = 0; index < weather.speeds.length; index += 1) {
        var y = index * 3 + 1;
        values[y] -= weather.speeds[index] * delta;
        if (values[y] < -2) {
          values[y] = 16;
          values[index * 3] = (Math.random() - 0.5) * 26;
          values[index * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
        }
      }
      attribute.needsUpdate = true;
      state.weatherRaf = window.requestAnimationFrame(stepWeather);
    }

    function stopOrbit() {
      if (state.orbitTimer) window.clearInterval(state.orbitTimer);
      state.orbitTimer = null;
    }

    function setAutoOrbit(enabled) {
      stopOrbit();
      if (!enabled || state.mode !== 'engine' || isMascot) return;

      state.orbitTimer = window.setInterval(function () {
        if (state.paused || Date.now() - state.lastUserPointer < 4500) return;
        var rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        var angle = Date.now() / 2800;
        var x = rect.left + rect.width * (0.5 + Math.cos(angle) * 0.38);
        var y = rect.top + rect.height * (0.5 + Math.sin(angle) * 0.28);
        container.dispatchEvent(new PointerEvent('pointermove', {
          clientX: x, clientY: y, bubbles: true, pointerType: 'mouse'
        }));
      }, 75);
    }

    function setPaused(paused) {
      state.paused = Boolean(paused);
      if (!state.instance) return;
      if (state.paused) {
        if (typeof state.instance.pause === 'function') state.instance.pause();
        if (state.telemetryRaf) window.cancelAnimationFrame(state.telemetryRaf);
        state.telemetryRaf = null;
        if (state.weatherRaf) window.cancelAnimationFrame(state.weatherRaf);
        state.weatherRaf = null;
      } else {
        if (typeof state.instance.resume === 'function') state.instance.resume();
        if (isMascot) startMascotSpin();
        if (state.weather && !state.weatherRaf) {
          state.weather.last = performance.now();
          state.weatherRaf = window.requestAnimationFrame(stepWeather);
        }
      }
    }

    function setPreset(name) {
      state.preset = name;
      applyConfig(configFor(name));
      if (state.weatherEnabled) setWeather(name === 'rain' ? 'rain' : 'ambient');
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
              cellSize: 8,
              autoResponsiveDensity: true,
              maxPixelRatio: 2,
              bloomIntensity: 0.45,
              dofStrength: 0.0,
              edgeStrength: 0.96,
              blockBlendWeight: 0.28,
              enableShadows: false
            }
          : {
              mode: 'playground',
              mapId: 'cyberpunk-citadel',
              cellSize: 8,
              autoResponsiveDensity: true,
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

        emit('engine');
        if (isMascot) startMascotSpin();
        if (state.weatherEnabled) setWeather(state.preset === 'rain' ? 'rain' : 'ambient');
        observe();
        setPaused(state.paused);
        if (!isMascot) setAutoOrbit(true);
        return true;
      } catch (error) {
        state.instance = null;
        state.engine = null;
        emit('fallback');
        return false;
      }
    }

    function destroy() {
      stopOrbit();
      removeWeather();
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
      if (state.pointerListener) {
        container.removeEventListener('pointermove', state.pointerListener);
        container.removeEventListener('touchstart', state.pointerListener);
        container.removeEventListener('touchmove', state.pointerListener);
        state.pointerListener = null;
      }
      if (state.instance && typeof state.instance.destroy === 'function') state.instance.destroy();
      state.instance = null;
      state.engine = null;
      emit('fallback');
    }

    /* The mascot stage is pointer-inert via CSS (`pointer-events: none`), so no
       mouse/touch event reaches the Tux entity. Only the scene stage keeps
       pointer tracking; the marker below documents that contract. */
    if (isMascot) {
      container.setAttribute('data-pointer-locked', 'true');
    } else {
      state.pointerListener = function (event) {
        if (event.isTrusted) state.lastUserPointer = Date.now();
      };
      container.addEventListener('pointermove', state.pointerListener, { passive: true });
      container.addEventListener('touchstart', state.pointerListener, { passive: true });
      container.addEventListener('touchmove', state.pointerListener, { passive: true });
    }

    window.addEventListener('pagehide', destroy);

    return {
      mount: mount,
      setPaused: setPaused,
      setPreset: setPreset,
      setAutoOrbit: setAutoOrbit,
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
    destroy: function () { controllers.forEach(function (c) { c.destroy(); }); controllers = []; },
    getMode: function () { return controllers.length ? controllers[0].getMode() : 'fallback'; }
  };

  window.addEventListener('ascii-realms:ready', function () {
    controllers.forEach(function (controller) {
      if (controller.getMode() === 'fallback') controller.mount();
    });
  });

  window.dispatchEvent(new Event('engine-adapter:ready'));
})(window.TP);
