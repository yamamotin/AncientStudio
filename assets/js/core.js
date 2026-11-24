/* Shared utilities: tiny helpers, no dependencies. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var audioEnabled = false;
  var audioContext = null;

  function sleep(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, reducedMotion ? Math.min(ms, 20) : ms);
    });
  }

  function beep(frequency) {
    if (!audioEnabled) return;
    try {
      var Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      audioContext = audioContext || new Context();
      var oscillator = audioContext.createOscillator();
      var gain = audioContext.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = frequency || 760;
      gain.gain.value = 0.018;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.04);
    } catch (error) {
      /* Sound is optional; silence is always acceptable. */
    }
  }

  function line(container, text, className) {
    var paragraph = document.createElement('p');
    if (className) paragraph.className = className;
    paragraph.textContent = text;
    container.appendChild(paragraph);
    container.scrollTop = container.scrollHeight;
    return paragraph;
  }

  function clear(container) {
    container.textContent = '';
  }

  function setAudio(enabled) {
    audioEnabled = Boolean(enabled);
  }

  TP.utils = {
    sleep: sleep,
    beep: beep,
    line: line,
    clear: clear,
    setAudio: setAudio,
    isAudioEnabled: function () { return audioEnabled; },
    reducedMotion: reducedMotion
  };
})(window.TP);
