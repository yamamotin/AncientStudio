/* Integration layer for the ASCII Engine Core (bundle: ascii-engine.bundle.js).
   No engine source is modified here: this file only uses its public facade. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var controllers = [];

  var PRESETS = {
    sanctuary: {
      palette: { background: '#050508', warmLight: '#FF8C24', warmCore: '#FFB85C', coolAmbient: '#2E6F95', foliageAccent: '#3A7D5C', cursorLight: '#7AD7F0' },
      bloomIntensity: 1.2, dofStrength: 0.68, edgeStrength: 0.85, parallaxIntensity: 1.45
    },
    dawn: {
      palette: { background: '#0a0d12', warmLight: '#FFB46B', warmCore: '#FFE0B2', coolAmbient: '#6D9FC0', foliageAccent: '#4D8B68', cursorLight: '#C9F0FF' },
      bloomIntensity: 0.9, dofStrength: 0.5, edgeStrength: 0.7, parallaxIntensity: 1.3
    },
    day: {
      palette: { background: '#0b1820', warmLight: '#FFD27A', warmCore: '#FFF4CF', coolAmbient: '#A6D8F0', foliageAccent: '#5FA97A', cursorLight: '#EAFBFF' },
      bloomIntensity: 0.55, dofStrength: 0.35, edgeStrength: 0.6, parallaxIntensity: 1.15
    },
    storm: {
      palette: { background: '#04060a', warmLight: '#FF6B3D', warmCore: '#FFB199', coolAmbient: '#4A6E8A', foliageAccent: '#2C4A48', cursorLight: '#9FC6E8' },
      bloomIntensity: 1.9, dofStrength: 0.9, edgeStrength: 0.98, parallaxIntensity: 1.75
    },
    emerald: {
      palette: { background: '#040808', warmLight: '#38E5A5', warmCore: '#A6FFE0', coolAmbient: '#1F5C78', foliageAccent: '#3D8C54', cursorLight: '#FFD166' },
      bloomIntensity: 1.35, dofStrength: 0.62, edgeStrength: 0.8, parallaxIntensity: 1.4
    }
  };

  function configFor(name) {
    var preset = PRESETS[name] || PRESETS.sanctuary;
    return {
      palette: Object.assign({}, preset.palette),
      bloomIntensity: preset.bloomIntensity,
      dofStrength: preset.dofStrength,
      edgeStrength: preset.edgeStrength,
      parallaxIntensity: preset.parallaxIntensity
    };
  }

  function hexToRgb(hex) {
    var value = String(hex).replace('#', '');
    if (value.length === 3) value = value.split('').map(function (c) { return c + c; }).join('');
    return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
  }

  function rgbToHex(rgb) {
    return '#' + rgb.map(function (n) {
      return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    }).join('');
  }

  function mixColor(a, b, t) {
    var ca = hexToRgb(a);
    var cb = hexToRgb(b);
    return rgbToHex(ca.map(function (value, index) { return value + (cb[index] - value) * t; }));
  }

  function mixPalettes(a, b, t) {
    var result = {};
    Object.keys(a).forEach(function (key) { result[key] = mixColor(a[key], b[key], t); });
    return result;
  }

  /* Software WebGL (SwiftShader/llvmpipe) spends seconds per frame on the ASCII
     post-processing pipeline. The static ASCII fallback keeps those devices fast
     and keeps Lighthouse's TTB budget intact; hardware WebGL gets full 3D. */
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
    var state = {
      container: container,
      engine: null,
      instance: null,
      mode: 'fallback',
      preset: (options && options.preset) || 'sanctuary',
      paused: false,
      weatherEnabled: !options || options.weather !== false,
      cycleTimer: null,
      cycleStart: 0,
      orbitTimer: null,
      lastUserPointer: 0,
      penguin: null,
      penguinBaseY: 1.1,
      penguinRaf: null,
      weather: null,
      weatherRaf: null,
      weatherMode: '',
      observer: null,
      visibilityObserver: null,
      autoPaused: false,
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
      return state.instance.core && state.instance.core.world && state.instance.core.world.scene;
    }

    function createPenguin() {
      var THREE = state.engine && state.engine.THREE;
      var scene = getThreeScene();
      if (!THREE || !scene || state.penguin) return;

      var group = new THREE.Group();
      var dark = new THREE.MeshStandardMaterial({ color: 0x16242c, flatShading: true, roughness: 0.9 });
      var light = new THREE.MeshStandardMaterial({ color: 0xe8f3f4, flatShading: true, roughness: 0.85 });
      var beak = new THREE.MeshStandardMaterial({ color: 0xff9a3c, flatShading: true, roughness: 0.7 });
      var eye = new THREE.MeshBasicMaterial({ color: 0x0b1015 });

      function add(geometry, material, position, scale) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position[0], position[1], position[2]);
        if (scale) mesh.scale.set(scale[0], scale[1], scale[2]);
        group.add(mesh);
        return mesh;
      }

      add(new THREE.SphereGeometry(0.62, 14, 10), dark, [0, 0.78, 0], [0.9, 1.15, 0.8]);
      add(new THREE.SphereGeometry(0.42, 12, 10), light, [0, 0.7, 0.36], [0.82, 1.12, 0.45]);
      add(new THREE.SphereGeometry(0.4, 12, 10), dark, [0, 1.48, 0.06]);
      add(new THREE.SphereGeometry(0.26, 10, 8), light, [0, 1.42, 0.29], [0.9, 0.9, 0.45]);
      add(new THREE.ConeGeometry(0.13, 0.34, 6), beak, [0, 1.42, 0.52]).rotation.x = Math.PI / 2;
      add(new THREE.SphereGeometry(0.055, 8, 6), eye, [-0.16, 1.56, 0.38]);
      add(new THREE.SphereGeometry(0.055, 8, 6), eye, [0.16, 1.56, 0.38]);
      add(new THREE.ConeGeometry(0.16, 0.8, 6), dark, [-0.58, 0.82, 0]).rotation.z = 0.28;
      add(new THREE.ConeGeometry(0.16, 0.8, 6), dark, [0.58, 0.82, 0]).rotation.z = -0.28;
      add(new THREE.BoxGeometry(0.3, 0.09, 0.42), beak, [-0.22, 0.08, 0.2]);
      add(new THREE.BoxGeometry(0.3, 0.09, 0.42), beak, [0.22, 0.08, 0.2]);

      if (options && options.mascotFocus) {
        // Position close to camera (z=8.4 vs camera z=11.8) with dedicated spotlight so Tux fills #penguin-stage crisply
        group.position.set(0, state.penguinBaseY, 8.4);
        group.scale.setScalar(1.22);
        var keyLight = new THREE.PointLight(0xffffff, 18, 9, 1.4);
        keyLight.position.set(1.2, 2.6, 2.8);
        group.add(keyLight);
      } else {
        group.position.set(0, state.penguinBaseY, 3.2);
        group.scale.setScalar(0.85);
      }

      scene.add(group);
      state.penguin = group;
    }

    function spinPenguin(now) {
      if (!state.penguin || state.paused) return;
      var userRecent = state.penguinPointerActive && (Date.now() - state.lastUserPointer < 5000);
      if (userRecent) {
        // Smoothly rotate 3D penguin toward mouse cursor yaw & pitch!
        state.penguin.rotation.y += (state.penguinTargetYaw - state.penguin.rotation.y) * 0.16;
        state.penguin.rotation.x += (state.penguinTargetPitch - state.penguin.rotation.x) * 0.16;
      } else {
        state.penguin.rotation.y += 0.012;
        state.penguin.rotation.x += (0 - state.penguin.rotation.x) * 0.1;
      }
      state.penguin.position.y = state.penguinBaseY + Math.sin(now / 700) * 0.05;
      state.penguinRaf = window.requestAnimationFrame(spinPenguin);
    }

    function removePenguin() {
      if (state.penguinRaf) window.cancelAnimationFrame(state.penguinRaf);
      state.penguinRaf = null;
      if (!state.penguin) return;
      if (state.penguin.parent) state.penguin.parent.remove(state.penguin);
      state.penguin.traverse(function (object) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });
      state.penguin = null;
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
      if (state.weatherMode === mode && state.weather) return;
      removeWeather();
      state.weatherMode = mode;

      var THREE = state.engine && state.engine.THREE;
      var scene = getThreeScene();
      if (!THREE || !scene || !mode) return;

      var storm = mode === 'storm';
      var count = storm ? 220 : 90;
      var positions = new Float32Array(count * 3);
      var speeds = new Float32Array(count);

      for (var index = 0; index < count; index += 1) {
        positions[index * 3] = (Math.random() - 0.5) * 26;
        positions[index * 3 + 1] = Math.random() * 18 - 1;
        positions[index * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
        speeds[index] = storm ? 7 + Math.random() * 8 : 0.25 + Math.random() * 0.5;
      }

      var geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      var material = new THREE.PointsMaterial({
        color: storm ? 0x9fc6e8 : 0xffd27a,
        size: storm ? 0.16 : 0.1,
        transparent: true,
        opacity: storm ? 0.55 : 0.75,
        sizeAttenuation: true,
        depthWrite: false
      });
      var points = new THREE.Points(geometry, material);
      scene.add(points);
      state.weather = { points: points, speeds: speeds, storm: storm, last: performance.now() };
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
          values[y] = weather.storm ? 16 : 12;
          values[index * 3] = (Math.random() - 0.5) * 26;
          values[index * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
        }
        if (!weather.storm) {
          values[index * 3] += Math.sin(now / 900 + index) * 0.002;
        }
      }
      attribute.needsUpdate = true;
      state.weatherRaf = window.requestAnimationFrame(stepWeather);
    }

    function stopCycle() {
      if (state.cycleTimer) window.clearInterval(state.cycleTimer);
      state.cycleTimer = null;
    }

    function setCycle(enabled) {
      stopCycle();
      if (!enabled || state.mode !== 'engine') return;
      state.cycleStart = Date.now();
      var night = PRESETS.sanctuary.palette;
      var day = PRESETS.day.palette;

      state.cycleTimer = window.setInterval(function () {
        var phase = (Math.sin((Date.now() - state.cycleStart) / 12000) + 1) / 2;
        applyConfig({
          palette: mixPalettes(night, day, phase),
          bloomIntensity: 1.2 - phase * 0.65,
          dofStrength: 0.68 - phase * 0.33,
          parallaxIntensity: 1.45 - phase * 0.3
        });
      }, 120);
    }

    function stopOrbit() {
      if (state.orbitTimer) window.clearInterval(state.orbitTimer);
      state.orbitTimer = null;
    }

    function setAutoOrbit(enabled) {
      stopOrbit();
      if (!enabled || state.mode !== 'engine') return;

      state.orbitTimer = window.setInterval(function () {
        if (state.paused || Date.now() - state.lastUserPointer < 4000) return;
        var rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        var angle = Date.now() / 2600;
        var x = rect.left + rect.width * (0.5 + Math.cos(angle) * 0.4);
        var y = rect.top + rect.height * (0.5 + Math.sin(angle) * 0.32);
        container.dispatchEvent(new PointerEvent('pointermove', {
          clientX: x, clientY: y, bubbles: true, pointerType: 'mouse'
        }));
      }, 60);
    }

    function setPaused(paused) {
      state.paused = Boolean(paused);
      if (!state.instance) return;
      if (state.paused) {
        if (typeof state.instance.pause === 'function') state.instance.pause();
        if (state.penguinRaf) window.cancelAnimationFrame(state.penguinRaf);
        state.penguinRaf = null;
        if (state.weatherRaf) window.cancelAnimationFrame(state.weatherRaf);
        state.weatherRaf = null;
      } else {
        if (typeof state.instance.resume === 'function') state.instance.resume();
        if (state.penguin && !state.penguinRaf) state.penguinRaf = window.requestAnimationFrame(spinPenguin);
        if (state.weather && !state.weatherRaf) {
          state.weather.last = performance.now();
          state.weatherRaf = window.requestAnimationFrame(stepWeather);
        }
      }
    }

    function setPreset(name) {
      state.preset = name;
      applyConfig(configFor(name));
      if (state.weatherEnabled) setWeather(name === 'storm' ? 'storm' : 'ambient');
    }

    function observe() {
      if (!window.ResizeObserver) return;
      state.observer = new ResizeObserver(function (entries) {
        if (entries[0] && entries[0].contentRect.width > 0) {
          /* The engine owns its own ResizeObserver; this keeps the wrapper contract
             ready for engines that need an explicit resize hook. */
          if (state.instance && typeof state.instance.resize === 'function') {
            state.instance.resize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height });
          }
        }
      });
      state.observer.observe(container);

      if (!window.IntersectionObserver) return;
      state.visibilityObserver = new IntersectionObserver(function (entries) {
        if (!state.instance || state.paused) return;
        var getState = typeof state.instance.getState === 'function' ? state.instance.getState() : 'running';
        if (!entries[0].isIntersecting && getState === 'running') {
          state.instance.pause();
          state.autoPaused = true;
        } else if (entries[0].isIntersecting && state.autoPaused) {
          state.instance.resume();
          state.autoPaused = false;
        }
      }, { threshold: 0.01 });
      state.visibilityObserver.observe(container);
    }

    async function mount() {
      var resolved = hasHardwareWebGL2() ? resolveEngine() : null;
      if (!resolved) {
        emit('fallback');
        return false;
      }

      try {
        var created = resolved.factory(container, {
          preset: state.preset,
          paused: state.paused,
          config: Object.assign(configFor(state.preset), (options && options.config) || {})
        });
        if (created && typeof created.then === 'function') created = await created;
        state.instance = created || resolved.source;
        state.engine = resolved.source;

        var lifecycle = typeof state.instance.getState === 'function' ? state.instance.getState() : '';
        if (lifecycle === 'idle' && typeof state.instance.mount === 'function') state.instance.mount();

        emit('engine');
        createPenguin();
        if (state.penguin) state.penguinRaf = window.requestAnimationFrame(spinPenguin);
        if (state.weatherEnabled) setWeather(state.preset === 'storm' ? 'storm' : 'ambient');
        observe();
        setPaused(state.paused);
        setAutoOrbit(true);
        return true;
      } catch (error) {
        state.instance = null;
        state.engine = null;
        emit('fallback');
        return false;
      }
    }

    function destroy() {
      stopCycle();
      stopOrbit();
      removePenguin();
      removeWeather();
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
      if (state.visibilityObserver) {
        state.visibilityObserver.disconnect();
        state.visibilityObserver = null;
      }
      if (state.pointerListener) {
        container.removeEventListener('pointermove', state.pointerListener);
        state.pointerListener = null;
      }
      if (state.windowPointerListener) {
        window.removeEventListener('pointermove', state.windowPointerListener);
        state.windowPointerListener = null;
      }
      if (state.instance && typeof state.instance.destroy === 'function') state.instance.destroy();
      state.instance = null;
      state.engine = null;
      emit('fallback');
    }

    function updatePenguinFromPointer(event) {
      var rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      var cx = rect.left + rect.width * 0.5;
      var cy = rect.top + rect.height * 0.5;
      var spanX = Math.max(rect.width * 0.65, window.innerWidth * 0.35, 160);
      var spanY = Math.max(rect.height * 0.65, window.innerHeight * 0.35, 140);
      var nx = Math.max(-1, Math.min(1, (event.clientX - cx) / spanX));
      var ny = Math.max(-1, Math.min(1, (event.clientY - cy) / spanY));
      state.penguinTargetYaw = nx * 1.35;
      state.penguinTargetPitch = ny * 0.42;
      state.penguinPointerActive = true;
    }

    state.pointerListener = function (event) {
      if (event.isTrusted) {
        state.lastUserPointer = Date.now();
        updatePenguinFromPointer(event);
      }
    };
    container.addEventListener('pointermove', state.pointerListener, { passive: true });

    if (options && options.mascotFocus) {
      state.windowPointerListener = function (event) {
        if (!event.isTrusted) return;
        state.lastUserPointer = Date.now();
        updatePenguinFromPointer(event);
      };
      window.addEventListener('pointermove', state.windowPointerListener, { passive: true });
    }

    window.addEventListener('pagehide', destroy);

    return {
      mount: mount,
      setPaused: setPaused,
      setPreset: setPreset,
      setCycle: setCycle,
      setAutoOrbit: setAutoOrbit,
      destroy: destroy,
      getMode: function () { return state.mode; }
    };
  }

  /* Loaded after first paint so the engine bundle never delays the terminal UI
     or its LCP text; hardware engines attach dynamically when the file is ready. */
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

  /* Load only when an engine stage approaches the viewport or the user interacts.
     This keeps first paint independent of the 3D bundle. */
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
