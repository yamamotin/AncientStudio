/* Interactive 3D ASCII Tux penguin for [ STACK // NEOFETCH ].
   Tracks pointer coordinates smoothly across the page/section, rotating a volumetric
   voxel/ellipsoid penguin in 3D and rasterizing directional & luminance ASCII glyphs in real time.
   Zero external dependencies; gracefully preserves static <pre> if reduced-motion is requested. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var COLS = 26;
  var ROWS = 17;
  var ASPECT_Y = 1.9; // Monospace character height/width ratio compensation

  // Luminance ramps per surface material (body, belly, beak/feet, eyes)
  var RAMP_DARK = ' .:-=+*#%@';
  var RAMP_BELLY = ' .:+*#@@@';
  var RAMP_BEAK = ' .-~=+*#%@';

  // Ellipsoids composing Tux in local penguin space (x right, y up, z forward toward viewer)
  // { cx, cy, cz, rx, ry, rz, mat: 0=obsidian coat, 1=white belly, 2=amber beak/feet, 3=eye sclera, 4=pupil }
  var PARTS = [
    // Torso
    { cx: 0.0, cy: -0.22, cz: 0.0, rx: 0.72, ry: 0.92, rz: 0.64, mat: 0 },
    // White belly patch (protrudes slightly forward +Z)
    { cx: 0.0, cy: -0.30, cz: 0.19, rx: 0.52, ry: 0.74, rz: 0.52, mat: 1 },
    // Head
    { cx: 0.0, cy: 0.74, cz: 0.03, rx: 0.52, ry: 0.48, rz: 0.50, mat: 0 },
    // Left & Right flippers
    { cx: -0.78, cy: -0.18, cz: 0.02, rx: 0.17, ry: 0.62, rz: 0.28, mat: 0 },
    { cx:  0.78, cy: -0.18, cz: 0.02, rx: 0.17, ry: 0.62, rz: 0.28, mat: 0 },
    // Beak (protrudes forward +Z so yaw rotation is unmistakably 3D!)
    { cx: 0.0, cy: 0.66, cz: 0.52, rx: 0.22, ry: 0.13, rz: 0.28, mat: 2 },
    // Left & Right webbed feet
    { cx: -0.34, cy: -1.12, cz: 0.24, rx: 0.24, ry: 0.12, rz: 0.36, mat: 2 },
    { cx:  0.34, cy: -1.12, cz: 0.24, rx: 0.24, ry: 0.12, rz: 0.36, mat: 2 },
    // Left & Right eyes
    { cx: -0.20, cy: 0.84, cz: 0.44, rx: 0.13, ry: 0.15, rz: 0.12, mat: 3 },
    { cx:  0.20, cy: 0.84, cz: 0.44, rx: 0.13, ry: 0.15, rz: 0.12, mat: 3 },
    // Pupils
    { cx: -0.20, cy: 0.84, cz: 0.54, rx: 0.06, ry: 0.07, rz: 0.06, mat: 4 },
    { cx:  0.20, cy: 0.84, cz: 0.54, rx: 0.06, ry: 0.07, rz: 0.06, mat: 4 },
    // Stubby tail (+Z negative)
    { cx: 0.0, cy: -0.95, cz: -0.58, rx: 0.18, ry: 0.14, rz: 0.22, mat: 0 }
  ];

  var state = {
    frameEl: null,
    logoEl: null,
    angleBadgeEl: null,
    targetYaw: 0,
    targetPitch: 0,
    yaw: 0,
    pitch: 0,
    pointerActive: false,
    visible: true,
    rafId: null,
    lastRenderedText: ''
  };

  /**
   * Ray-ellipsoid intersection in penguin local space.
   * Ray origin O = (ox, oy, oz), unit direction D = (dx, dy, dz).
   */
  function intersectPart(ox, oy, oz, dx, dy, dz, p) {
    var invRx = 1 / p.rx;
    var invRy = 1 / p.ry;
    var invRz = 1 / p.rz;

    var rox = (ox - p.cx) * invRx;
    var roy = (oy - p.cy) * invRy;
    var roz = (oz - p.cz) * invRz;

    var rdx = dx * invRx;
    var rdy = dy * invRy;
    var rdz = dz * invRz;

    var a = rdx * rdx + rdy * rdy + rdz * rdz;
    var b = 2 * (rox * rdx + roy * rdy + roz * rdz);
    var c = rox * rox + roy * roy + roz * roz - 1;

    var disc = b * b - 4 * a * c;
    if (disc < 0) return -1;

    var t = (-b - Math.sqrt(disc)) / (2 * a);
    return t > 0 ? t : -1;
  }

  function renderPenguinAscii(yaw, pitch) {
    var cosY = Math.cos(yaw);
    var sinY = Math.sin(yaw);
    var cosX = Math.cos(pitch);
    var sinX = Math.sin(pitch);

    // Light direction in world space (upper-left-front)
    var lx = -0.48;
    var ly = 0.62;
    var lz = 0.62;

    // Transform world ray into penguin local space (inverse rotation R_y(-yaw) * R_x(-pitch))
    // Camera sits at world (0, -0.08, 3.8) looking toward -Z
    var lines = [];

    for (var row = 0; row < ROWS; row += 1) {
      var sy = ((ROWS - 1) * 0.5 - row) / (ROWS * 0.44);
      var rowChars = '';

      for (var col = 0; col < COLS; col += 1) {
        var sx = (col - (COLS - 1) * 0.5) / (COLS * 0.44 * (ASPECT_Y * 0.52));

        // Orthographic-perspective hybrid ray in world space
        var wox = sx * 1.18;
        var woy = sy * 1.32 - 0.08;
        var woz = 3.5;

        var wdx = -sx * 0.08;
        var wdy = -sy * 0.08;
        var wdz = -1.0;
        var wLen = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
        wdx /= wLen;
        wdy /= wLen;
        wdz /= wLen;

        // Rotate origin by R_x(-pitch) then R_y(-yaw)
        var oy1 = woy * cosX + woz * sinX;
        var oz1 = -woy * sinX + woz * cosX;
        var ox = wox * cosY - oz1 * sinY;
        var oy = oy1;
        var oz = wox * sinY + oz1 * cosY;

        // Rotate direction by R_x(-pitch) then R_y(-yaw)
        var dy1 = wdy * cosX + wdz * sinX;
        var dz1 = -wdy * sinX + wdz * cosX;
        var dx = wdx * cosY - dz1 * sinY;
        var dy = dy1;
        var dz = wdx * sinY + dz1 * cosY;

        var bestT = 1e9;
        var bestPart = null;

        for (var i = 0; i < PARTS.length; i += 1) {
          var t = intersectPart(ox, oy, oz, dx, dy, dz, PARTS[i]);
          if (t > 0 && t < bestT) {
            bestT = t;
            bestPart = PARTS[i];
          }
        }

        if (!bestPart) {
          rowChars += ' ';
          continue;
        }

        // Hit point & local surface normal
        var hx = ox + dx * bestT;
        var hy = oy + dy * bestT;
        var hz = oz + dz * bestT;

        var lnx = (hx - bestPart.cx) / (bestPart.rx * bestPart.rx);
        var lny = (hy - bestPart.cy) / (bestPart.ry * bestPart.ry);
        var lnz = (hz - bestPart.cz) / (bestPart.rz * bestPart.rz);
        var nLen = Math.sqrt(lnx * lnx + lny * lny + lnz * lnz) || 1;
        lnx /= nLen;
        lny /= nLen;
        lnz /= nLen;

        // Rotate normal back to world space: R_x(pitch) * R_y(yaw)
        var nx1 = lnx * cosY + lnz * sinY;
        var nz1 = -lnx * sinY + lnz * cosY;
        var wnx = nx1;
        var wny = lny * cosX - nz1 * sinX;
        var wnz = lny * sinX + nz1 * cosX;

        var ndotl = Math.max(0, wnx * lx + wny * ly + wnz * lz);
        var rim = Math.pow(Math.max(0, 1 - Math.max(0, wnz)), 2.2) * 0.35;

        var ch = '#';
        if (bestPart.mat === 4) {
          ch = 'o'; // Crisp pupil
        } else if (bestPart.mat === 3) {
          ch = '@'; // Bright eye sclera
        } else if (bestPart.mat === 2) {
          // Beak & webbed feet
          var bLum = Math.min(0.99, 0.32 + ndotl * 0.65);
          ch = RAMP_BEAK.charAt(Math.floor(bLum * RAMP_BEAK.length));
        } else if (bestPart.mat === 1) {
          // Bright white belly
          var wLum = Math.min(0.99, 0.48 + ndotl * 0.52);
          ch = RAMP_BELLY.charAt(Math.floor(wLum * RAMP_BELLY.length));
        } else {
          // Obsidian penguin coat + silhouette rim
          if (wnz < 0.28) {
            // Silhouette contour glyph based on normal angle
            if (Math.abs(wnx) > Math.abs(wny) * 1.6) {
              ch = '|';
            } else if (wnx * wny > 0) {
              ch = '\\';
            } else {
              ch = '/';
            }
          } else {
            var cLum = Math.min(0.99, 0.14 + ndotl * 0.52 + rim);
            ch = RAMP_DARK.charAt(Math.floor(cLum * RAMP_DARK.length));
          }
        }

        rowChars += ch;
      }

      lines.push(rowChars.replace(/\s+$/, ''));
    }

    return lines.join('\n');
  }

  function updateFromClientPoint(clientX, clientY) {
    if (!state.frameEl) return;
    var rect = state.frameEl.getBoundingClientRect();
    var centerX = rect.left + rect.width * 0.5;
    var centerY = rect.top + rect.height * 0.5;

    // Normalize relative to penguin center across viewport width/height so moving the mouse
    // anywhere near or inside [ STACK // NEOFETCH ] smoothly rotates Tux up to +-75 deg yaw & +-28 deg pitch
    var halfSpanX = Math.max(180, window.innerWidth * 0.42);
    var halfSpanY = Math.max(160, window.innerHeight * 0.42);

    var nx = Math.max(-1, Math.min(1, (clientX - centerX) / halfSpanX));
    var ny = Math.max(-1, Math.min(1, (clientY - centerY) / halfSpanY));

    state.targetYaw = nx * 1.28;   // ~ +-73 degrees yaw
    state.targetPitch = ny * 0.46; // ~ +-26 degrees pitch
    state.pointerActive = true;
  }

  function tick(now) {
    state.rafId = null;
    if (!state.visible || !state.logoEl) return;

    var idleYaw = Math.sin((now || 0) * 0.0014) * 0.38;
    var idlePitch = Math.cos((now || 0) * 0.0011) * 0.08;

    var desiredYaw = state.pointerActive ? state.targetYaw : idleYaw;
    var desiredPitch = state.pointerActive ? state.targetPitch : idlePitch;

    state.yaw += (desiredYaw - state.yaw) * 0.14;
    state.pitch += (desiredPitch - state.pitch) * 0.14;

    var ascii = renderPenguinAscii(state.yaw, state.pitch);
    if (ascii !== state.lastRenderedText) {
      state.logoEl.textContent = ascii;
      state.lastRenderedText = ascii;
    }

    if (state.angleBadgeEl) {
      var degYaw = Math.round((state.yaw * 180) / Math.PI);
      var degPitch = Math.round((-state.pitch * 180) / Math.PI);
      state.angleBadgeEl.textContent = 'yaw ' + (degYaw >= 0 ? '+' : '') + degYaw + '° · pitch ' + (degPitch >= 0 ? '+' : '') + degPitch + '°';
    }

    state.rafId = window.requestAnimationFrame(tick);
  }

  function startLoop() {
    if (state.rafId === null && state.visible) {
      state.rafId = window.requestAnimationFrame(tick);
    }
  }

  function stopLoop() {
    if (state.rafId !== null) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
  }

  function init() {
    var logoEl = document.querySelector('.neofetch .ascii-logo');
    var frameEl = document.querySelector('.neofetch .logo-frame');
    if (!logoEl || !frameEl) return;

    state.logoEl = logoEl;
    state.frameEl = frameEl;
    state.angleBadgeEl = document.getElementById('neofetch-penguin-telemetry');
    frameEl.setAttribute('data-penguin-ready', 'true');

    // Render initial 3D frame even if reduced motion is active
    state.logoEl.textContent = renderPenguinAscii(0.18, -0.05);

    if (TP.utils && TP.utils.reducedMotion) {
      // Still respond immediately on pointermove without continuous idle rAF
      window.addEventListener('pointermove', function (ev) {
        updateFromClientPoint(ev.clientX, ev.clientY);
        state.yaw = state.targetYaw;
        state.pitch = state.targetPitch;
        state.logoEl.textContent = renderPenguinAscii(state.yaw, state.pitch);
      }, { passive: true });
      return;
    }

    window.addEventListener('pointermove', function (ev) {
      updateFromClientPoint(ev.clientX, ev.clientY);
    }, { passive: true });

    window.addEventListener('mousemove', function (ev) {
      updateFromClientPoint(ev.clientX, ev.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      state.pointerActive = false;
    });

    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        if (!entry) return;
        state.visible = entry.isIntersecting;
        if (state.visible) {
          startLoop();
        } else {
          stopLoop();
        }
      }, { threshold: 0.02 });
      io.observe(frameEl);
    }

    startLoop();
  }

  TP.neofetch = {
    init: init,
    setAngles: function (yawRad, pitchRad) {
      state.pointerActive = true;
      state.targetYaw = yawRad;
      state.targetPitch = pitchRad;
      state.yaw = yawRad;
      state.pitch = pitchRad;
      if (state.logoEl) {
        state.logoEl.textContent = renderPenguinAscii(yawRad, pitchRad);
      }
    },
    getState: function () {
      return {
        yaw: state.yaw,
        pitch: state.pitch,
        targetYaw: state.targetYaw,
        targetPitch: state.targetPitch,
        pointerActive: state.pointerActive
      };
    }
  };
})(window.TP);
