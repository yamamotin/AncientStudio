/* Interactive 3D ASCII Tux penguin fallback & instant boot stage for [ STACK // NEOFETCH ].
   - Targets `#penguin-stage` and `.penguin-fallback` (with backward compatibility for `.neofetch .ascii-logo`)
   - Renders a high-contrast 3D raycast Tux silhouette inspired by classic dense ASCII Tux art:
     dense dark dorsal coat (`M`, `W`, `#`, `@`), bright clean white belly (` `, `.`, `:`),
     defined eyes, sculpted beak, flippers, and webbed feet.
   - Tracks mouse & touch (`pointermove` / `pointerdown`) passively (`{ passive: true }`) without blocking page scroll.
   - Automatically yields its `requestAnimationFrame` loop as soon as `#penguin-stage[data-mode="engine"]` mounts! */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var COLS = 30;
  var ROWS = 18;
  var ASPECT_Y = 1.92;

  // High-contrast ramps calibrated to the Tux ASCII reference:
  // Dark outer coat uses dense heavy glyphs ('RM#W@'), white belly stays crisp & open (' .,:;+i')
  var RAMP_COAT = 'itIYVRBM#W@';
  var RAMP_BELLY = '   ..,:;+iI';
  var RAMP_BEAK = '.:;+itIYVR#';

  // Ellipsoid parts in penguin local space (x right, y up, z forward toward viewer)
  // mat: 0=dense dark coat, 1=bright white belly/cheeks, 2=beak/webbed feet, 3=eye sclera, 4=pupil
  var PARTS = [
    // Pear-shaped torso
    { cx: 0.0, cy: -0.22, cz: 0.0, rx: 0.74, ry: 0.94, rz: 0.65, mat: 0 },
    // Crisp high-contrast white belly patch
    { cx: 0.0, cy: -0.28, cz: 0.22, rx: 0.54, ry: 0.76, rz: 0.50, mat: 1 },
    // Head
    { cx: 0.0, cy: 0.74, cz: 0.04, rx: 0.50, ry: 0.47, rz: 0.48, mat: 0 },
    // White brow/cheek masks
    { cx: -0.15, cy: 0.76, cz: 0.30, rx: 0.19, ry: 0.21, rz: 0.22, mat: 1 },
    { cx:  0.15, cy: 0.76, cz: 0.30, rx: 0.19, ry: 0.21, rz: 0.22, mat: 1 },
    // Left & Right flippers (articulated in renderPenguinAscii via breathe/sway)
    { cx: -0.80, cy: -0.18, cz: 0.02, rx: 0.17, ry: 0.62, rz: 0.28, mat: 0, wing: -1 },
    { cx:  0.80, cy: -0.18, cz: 0.02, rx: 0.17, ry: 0.62, rz: 0.28, mat: 0, wing: 1 },
    // Sculpted Tux beak
    { cx: 0.0, cy: 0.65, cz: 0.52, rx: 0.24, ry: 0.13, rz: 0.28, mat: 2 },
    // Splayed webbed feet
    { cx: -0.38, cy: -1.10, cz: 0.26, rx: 0.26, ry: 0.13, rz: 0.36, mat: 2 },
    { cx:  0.38, cy: -1.10, cz: 0.26, rx: 0.26, ry: 0.13, rz: 0.36, mat: 2 },
    // Eye sclera
    { cx: -0.16, cy: 0.82, cz: 0.43, rx: 0.11, ry: 0.14, rz: 0.11, mat: 3 },
    { cx:  0.16, cy: 0.82, cz: 0.43, rx: 0.11, ry: 0.14, rz: 0.11, mat: 3 },
    // Pupils
    { cx: -0.15, cy: 0.82, cz: 0.52, rx: 0.055, ry: 0.065, rz: 0.055, mat: 4 },
    { cx:  0.15, cy: 0.82, cz: 0.52, rx: 0.055, ry: 0.065, rz: 0.055, mat: 4 },
    // Stubby tail
    { cx: 0.0, cy: -0.94, cz: -0.58, rx: 0.18, ry: 0.14, rz: 0.22, mat: 0 }
  ];

  var state = {
    frameEl: null,
    logoEl: null,
    angleBadgeEl: null,
    targetYaw: 0.14,
    targetPitch: 0,
    yaw: 0.14,
    pitch: 0,
    pointerActive: false,
    visible: true,
    engineActive: false,
    rafId: null,
    lastRenderedText: ''
  };

  function intersectPart(ox, oy, oz, dx, dy, dz, p, wingSway) {
    var cx = p.cx + (p.wing ? p.wing * wingSway : 0);
    var cy = p.cy + (p.wing ? Math.abs(wingSway) * 0.35 : 0);

    var invRx = 1 / p.rx;
    var invRy = 1 / p.ry;
    var invRz = 1 / p.rz;

    var rox = (ox - cx) * invRx;
    var roy = (oy - cy) * invRy;
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

  function renderPenguinAscii(yaw, pitch, timeSec) {
    var tSec = timeSec || 0;
    var breathe = Math.sin(tSec * 2.1) * 0.025;
    var wingSway = Math.sin(tSec * 2.6) * 0.035;

    var cosY = Math.cos(yaw);
    var sinY = Math.sin(yaw);
    var cosX = Math.cos(pitch);
    var sinX = Math.sin(pitch);

    var lx = -0.46;
    var ly = 0.64;
    var lz = 0.61;

    var lines = [];

    for (var row = 0; row < ROWS; row += 1) {
      var sy = (((ROWS - 1) * 0.5 - row) / (ROWS * 0.44)) * (1 - breathe);
      var rowChars = '';

      for (var col = 0; col < COLS; col += 1) {
        var sx = ((col - (COLS - 1) * 0.5) / (COLS * 0.44 * (ASPECT_Y * 0.52))) * (1 + breathe * 0.5);

        var wox = sx * 1.18;
        var woy = sy * 1.32 - 0.06;
        var woz = 3.5;

        var wdx = -sx * 0.08;
        var wdy = -sy * 0.08;
        var wdz = -1.0;
        var wLen = Math.sqrt(wdx * wdx + wdy * wdy + wdz * wdz);
        wdx /= wLen;
        wdy /= wLen;
        wdz /= wLen;

        var oy1 = woy * cosX + woz * sinX;
        var oz1 = -woy * sinX + woz * cosX;
        var ox = wox * cosY - oz1 * sinY;
        var oy = oy1;
        var oz = wox * sinY + oz1 * cosY;

        var dy1 = wdy * cosX + wdz * sinX;
        var dz1 = -wdy * sinX + wdz * cosX;
        var dx = wdx * cosY - dz1 * sinY;
        var dy = dy1;
        var dz = wdx * sinY + dz1 * cosY;

        var bestT = 1e9;
        var bestPart = null;

        for (var i = 0; i < PARTS.length; i += 1) {
          var t = intersectPart(ox, oy, oz, dx, dy, dz, PARTS[i], wingSway);
          if (t > 0 && t < bestT) {
            bestT = t;
            bestPart = PARTS[i];
          }
        }

        if (!bestPart) {
          rowChars += ' ';
          continue;
        }

        var hx = ox + dx * bestT;
        var hy = oy + dy * bestT;
        var hz = oz + dz * bestT;

        var pcx = bestPart.cx + (bestPart.wing ? bestPart.wing * wingSway : 0);
        var pcy = bestPart.cy + (bestPart.wing ? Math.abs(wingSway) * 0.35 : 0);

        var lnx = (hx - pcx) / (bestPart.rx * bestPart.rx);
        var lny = (hy - pcy) / (bestPart.ry * bestPart.ry);
        var lnz = (hz - bestPart.cz) / (bestPart.rz * bestPart.rz);
        var nLen = Math.sqrt(lnx * lnx + lny * lny + lnz * lnz) || 1;
        lnx /= nLen;
        lny /= nLen;
        lnz /= nLen;

        var nx1 = lnx * cosY + lnz * sinY;
        var nz1 = -lnx * sinY + lnz * cosY;
        var wnx = nx1;
        var wny = lny * cosX - nz1 * sinX;
        var wnz = lny * sinX + nz1 * cosX;

        var ndotl = Math.max(0, wnx * lx + wny * ly + wnz * lz);

        var ch = '#';
        if (bestPart.mat === 4) {
          ch = '#'; // Dark pupil
        } else if (bestPart.mat === 3) {
          ch = '.'; // Crisp bright sclera
        } else if (bestPart.mat === 2) {
          var bLum = Math.min(0.99, 0.28 + ndotl * 0.68);
          ch = RAMP_BEAK.charAt(Math.floor(bLum * RAMP_BEAK.length));
        } else if (bestPart.mat === 1) {
          // High-contrast bright belly (sparse dots near core, subtle shading near coat seam)
          var seam = Math.max(0, 1 - Math.max(0, wnz));
          var wIdx = Math.min(RAMP_BELLY.length - 1, Math.floor((seam * 0.72 + (1 - ndotl) * 0.28) * RAMP_BELLY.length));
          ch = RAMP_BELLY.charAt(wIdx);
        } else {
          // Dense dark coat + crisp structural silhouette edges
          if (wnz < 0.26) {
            if (Math.abs(wnx) > Math.abs(wny) * 1.6) {
              ch = '|';
            } else if (wnx * wny > 0) {
              ch = '\\';
            } else {
              ch = '/';
            }
          } else {
            var coatDensity = Math.min(0.99, 0.35 + (1 - ndotl) * 0.62);
            ch = RAMP_COAT.charAt(Math.floor(coatDensity * RAMP_COAT.length));
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
    if (rect.width <= 0 || rect.height <= 0) return;

    var centerX = rect.left + rect.width * 0.5;
    var centerY = rect.top + rect.height * 0.5;

    var halfSpanX = Math.max(160, window.innerWidth * 0.38);
    var halfSpanY = Math.max(140, window.innerHeight * 0.38);

    var nx = Math.max(-1, Math.min(1, (clientX - centerX) / halfSpanX));
    var ny = Math.max(-1, Math.min(1, (clientY - centerY) / halfSpanY));

    state.targetYaw = nx * 1.25;
    state.targetPitch = ny * 0.44;
    state.pointerActive = true;
  }

  function tick(now) {
    state.rafId = null;
    if (!state.visible || !state.logoEl || state.engineActive) return;

    var tSec = (now || 0) * 0.001;
    var idleYaw = Math.sin(tSec * 0.85) * 0.28;
    var idlePitch = Math.cos(tSec * 0.65) * 0.06;

    var desiredYaw = state.pointerActive ? state.targetYaw : idleYaw;
    var desiredPitch = state.pointerActive ? state.targetPitch : idlePitch;

    state.yaw += (desiredYaw - state.yaw) * 0.14;
    state.pitch += (desiredPitch - state.pitch) * 0.14;

    var ascii = renderPenguinAscii(state.yaw, state.pitch, tSec);
    if (ascii !== state.lastRenderedText) {
      state.logoEl.textContent = ascii;
      state.lastRenderedText = ascii;
    }

    if (state.angleBadgeEl) {
      var degYaw = Math.round((state.yaw * 180) / Math.PI);
      var degPitch = Math.round((-state.pitch * 180) / Math.PI);
      state.angleBadgeEl.textContent =
        'yaw ' + (degYaw >= 0 ? '+' : '') + degYaw + '° · pitch ' + (degPitch >= 0 ? '+' : '') + degPitch + '°';
    }

    state.rafId = window.requestAnimationFrame(tick);
  }

  function startLoop() {
    if (state.rafId === null && state.visible && !state.engineActive) {
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
    var frameEl =
      document.getElementById('penguin-stage') ||
      document.querySelector('.neofetch .logo-frame');
    var logoEl =
      document.querySelector('#penguin-stage .penguin-fallback') ||
      document.querySelector('.neofetch .ascii-logo');

    if (!logoEl || !frameEl) return;

    state.logoEl = logoEl;
    state.frameEl = frameEl;
    state.angleBadgeEl = document.getElementById('neofetch-penguin-telemetry');
    frameEl.setAttribute('data-penguin-ready', 'true');

    // Watch for WebGL2 engine handoff so there is NEVER a dual-rAF conflict
    state.engineActive = frameEl.getAttribute('data-mode') === 'engine';
    frameEl.addEventListener('tp:scene-mode', function (ev) {
      state.engineActive = Boolean(ev && ev.detail && ev.detail.mode === 'engine');
      if (state.engineActive) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    state.logoEl.textContent = renderPenguinAscii(0.14, -0.04, 0);

    if (TP.utils && TP.utils.reducedMotion) {
      window.addEventListener('pointermove', function (ev) {
        if (state.engineActive) return;
        updateFromClientPoint(ev.clientX, ev.clientY);
        state.yaw = state.targetYaw;
        state.pitch = state.targetPitch;
        state.logoEl.textContent = renderPenguinAscii(state.yaw, state.pitch, 0);
      }, { passive: true });
      return;
    }

    window.addEventListener('pointermove', function (ev) {
      updateFromClientPoint(ev.clientX, ev.clientY);
    }, { passive: true });

    frameEl.addEventListener('pointerdown', function (ev) {
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
      if (state.logoEl && !state.engineActive) {
        state.logoEl.textContent = renderPenguinAscii(yawRad, pitchRad, 0);
      }
    },
    getState: function () {
      return {
        yaw: state.yaw,
        pitch: state.pitch,
        targetYaw: state.targetYaw,
        targetPitch: state.targetPitch,
        pointerActive: state.pointerActive,
        engineActive: state.engineActive
      };
    }
  };
})(window.TP);
