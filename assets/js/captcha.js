/* CAPTCHA challenge flow for the public connectors.
   The backend answers HTTP 422 with `code: "CAPTCHA_REQUIRED"` and a problem+json body
   carrying the challenge metadata. This module turns that response into a *compact*
   dialog — only the mirrored challenge image (or its short prompt), a single answer
   field and the send/cancel actions — and resolves with the fields the caller must
   resend so the backend can finish the real query.

   Security posture:
   - every URL is validated before use: https only, no credentials, strict host allowlist;
     `javascript:`, `data:` (except a strict base64 image), `http:` and unknown hosts are
     simply dropped;
   - the challenge image may be a strict `data:image/…;base64,` payload produced by the
     backend, or an https URL on the official TJPR hosts (the only ones present in the
     document CSP `img-src`); it is never loaded from an arbitrary origin;
   - all external text is bounded and rendered with createElement/textContent — the module
     never assigns innerHTML;
   - the dialog never embeds a remote frame (the CSP forbids frame-src) and never renders
     the portal page: the user only reads the cloned challenge and types the answer;
   - the answer (and the optional session cookie, kept for programmatic callers) is
     treated as sensitive: never persisted, wiped on close, on `pagehide` and when the
     challenge expires. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  // Only the official portals and the CAPTCHA vendors they use may be referenced.
  var ALLOWED_HOSTS = [
    'consulta.tjpr.jus.br',
    'www.tjpr.jus.br',
    'tjpr.jus.br',
    'www.google.com',
    'recaptcha.google.com',
    'www.recaptcha.net'
  ];
  // Hosts allowed to serve the cloned challenge image (mirrors the CSP `img-src`).
  var IMAGE_HOSTS = ['consulta.tjpr.jus.br', 'www.tjpr.jus.br', 'tjpr.jus.br'];
  var CHALLENGE_TTL_MS = 300000; // 5 minutes when the backend sends no expires_at
  var MAX_INSTRUCTIONS = 6;
  var MAX_INSTRUCTION_LEN = 240;
  var MAX_DETAIL_LEN = 320;
  var MAX_PROMPT_LEN = 160;
  var MAX_TOKEN_LEN = 4096;
  var MAX_ANSWER_LEN = 4096; // long portal tokens and short image answers share the field
  var TOKEN_MIN_LEN = 3;
  var MAX_COOKIE_LEN = 1024;
  var MAX_IMAGE_DATA_LEN = 400000;
  var TOKEN_PATTERN = /^[A-Za-z0-9._~+/=-]+$/;
  var COOKIE_PATTERN = /^[A-Za-z0-9._~=%:;+/@!$&'()*,-]+$/;
  var SITE_KEY_PATTERN = /^[A-Za-z0-9_-]{10,100}$/;
  var CHALLENGE_ID_PATTERN = /^[A-Za-z0-9._:-]{1,64}$/;
  var CALLBACK_PATTERN = /^[A-Za-z0-9_]{1,80}$/;
  // Strict mirror of the challenge bitmap: base64 of a real image type, nothing else.
  var IMAGE_DATA_PATTERN = /^data:image\/(?:png|jpe?g|gif|webp|bmp);base64,[A-Za-z0-9+/]+={0,2}$/;
  // Inert 1x1 pixel shipped in the markup: the real bitmap replaces it while the dialog
  // is open, and it is restored on close so no challenge data survives in the DOM.
  var IMAGE_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  var state = {
    challenge: null,
    pending: null,
    expiryTimer: null,
    countdownTimer: null,
    previousFocus: null,
    expired: false,
    imageBroken: false,
    bound: false
  };

  var els = {};

  function t(key, vars) {
    return TP.i18n ? TP.i18n.t(key, vars) : key;
  }

  function text(value, max) {
    if (value === null || value === undefined) return '';
    var limit = max || 120;
    var clean = String(value)
      .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return clean.length > limit ? clean.slice(0, limit) + '…' : clean;
  }

  function failure(code, message) {
    var error = new Error(message || code);
    error.name = 'CaptchaError';
    error.code = code;
    return error;
  }

  /* Strict allowlist: https, no credentials, known host only. */
  function safeExternalUrl(raw) {
    var value = String(raw === null || raw === undefined ? '' : raw).trim();
    if (!value || value.length > 2048) return '';
    var parsed;
    try {
      parsed = new URL(value);
    } catch (error) {
      return '';
    }
    if (parsed.protocol !== 'https:') return '';
    if (parsed.username || parsed.password) return '';
    var host = parsed.hostname.toLowerCase();
    if (ALLOWED_HOSTS.indexOf(host) === -1) return '';
    return parsed.href;
  }

  /* The challenge bitmap: either a strict base64 data URL (the backend mirrors the image,
     which is what the CSP `data:` entry is for) or https on the official TJPR hosts. */
  function safeImageSource(raw) {
    var value = String(raw === null || raw === undefined ? '' : raw).trim();
    if (!value) return '';
    if (value.slice(0, 5).toLowerCase() === 'data:') {
      if (value.length > MAX_IMAGE_DATA_LEN) return '';
      return IMAGE_DATA_PATTERN.test(value) ? value : '';
    }
    if (value.length > 2048) return '';
    var parsed;
    try {
      parsed = new URL(value);
    } catch (error) {
      return '';
    }
    if (parsed.protocol !== 'https:') return '';
    if (parsed.username || parsed.password) return '';
    if (IMAGE_HOSTS.indexOf(parsed.hostname.toLowerCase()) === -1) return '';
    return parsed.href;
  }

  function normalizeToken(raw) {
    var value = String(raw === null || raw === undefined ? '' : raw).trim();
    if (!value || value.length > MAX_TOKEN_LEN) return '';
    if (value.length < TOKEN_MIN_LEN || value.length > MAX_ANSWER_LEN) return '';
    return TOKEN_PATTERN.test(value) ? value : '';
  }

  function normalizeCookie(raw) {
    var value = String(raw === null || raw === undefined ? '' : raw).trim();
    if (!value || value.length > MAX_COOKIE_LEN) return '';
    return COOKIE_PATTERN.test(value) ? value : '';
  }

  function providerOf(raw, siteKey) {
    var hint = String(raw || '').toLowerCase();
    if (hint.indexOf('hcaptcha') !== -1) return 'hcaptcha';
    if (hint.indexOf('recaptcha') !== -1 || hint.indexOf('google') !== -1) return 'recaptcha';
    if (hint.indexOf('image') !== -1) return 'image';
    if (/^h/i.test(siteKey)) return 'hcaptcha';
    if (siteKey) return 'recaptcha';
    return 'image';
  }

  function expiryOf(raw) {
    var now = Date.now();
    var ms = 0;
    if (typeof raw === 'string' && raw.trim()) {
      // ISO timestamps (server-provided) vs epoch numbers ("1757123456" / "1757123456789").
      if (isNaN(Number(raw))) {
        var parsed = Date.parse(raw);
        ms = isNaN(parsed) ? 0 : parsed;
      } else {
        var numericString = Number(raw);
        // Seconds and milliseconds are told apart by magnitude: seconds stay below 10^12.
        ms = numericString < 1e12 ? numericString * 1000 : numericString;
      }
    } else if (raw !== null && raw !== undefined && raw !== '' && isFinite(Number(raw))) {
      var numeric = Number(raw);
      ms = numeric < 1e12 ? numeric * 1000 : numeric;
    }
    if (!ms || ms <= 0) return now + CHALLENGE_TTL_MS; // no hint: bounded local TTL
    if (ms <= now) return now; // already expired: the dialog opens in the expired state
    return Math.min(ms, now + 3600000);
  }

  function instructionsOf(raw) {
    var list = raw;
    if (typeof list === 'string') list = [list];
    if (!Array.isArray(list))
      return [];
    var cleaned = [];
    for (var i = 0; i < list.length && cleaned.length < MAX_INSTRUCTIONS; i += 1) {
      var item = text(list[i], MAX_INSTRUCTION_LEN);
      if (item) cleaned.push(item);
    }
    return cleaned;
  }

  /* Backend bodies are snake_case; a sanitized challenge is camelCase. Reading both
     keeps sanitizeChallenge() idempotent, so request() can be called with either. */
  function field(raw, snake, camel) {
    var value = raw[snake];
    if (value === undefined && camel) value = raw[camel];
    return value;
  }

  /* Pure: accepts a raw problem body, an ApiClientError or a static fallback result. */
  function sanitizeChallenge(source) {
    var raw = source && typeof source === 'object' ? source : {};
    if (raw.problem && typeof raw.problem === 'object') raw = raw.problem;
    else if (raw.data && typeof raw.data === 'object') raw = raw.data;

    var siteKey = text(field(raw, 'site_key', 'siteKey'), 100);
    if (!SITE_KEY_PATTERN.test(siteKey)) siteKey = '';
    var challengeId = text(field(raw, 'challenge_id', 'challengeId'), 64);
    if (!CHALLENGE_ID_PATTERN.test(challengeId)) challengeId = '';
    var callback = text(field(raw, 'recaptcha_callback', 'callback'), 80);
    if (!CALLBACK_PATTERN.test(callback)) callback = '';

    return {
      code: 'CAPTCHA_REQUIRED',
      provider: providerOf(raw.provider, siteKey),
      siteKey: siteKey,
      challengeId: challengeId,
      portalUrl: safeExternalUrl(field(raw, 'portal_url', 'portalUrl')),
      formUrl: safeExternalUrl(field(raw, 'form_url', 'formUrl')),
      challengeUrl: safeExternalUrl(field(raw, 'challenge_url', 'challengeUrl')),
      // `raw.image` keeps sanitizeChallenge() idempotent, like `raw.text` below.
      image: safeImageSource(field(raw, 'image_data_url', 'imageDataUrl')) ||
        safeImageSource(field(raw, 'image_url', 'imageUrl')) ||
        safeImageSource(raw.image),
      text: text(field(raw, 'challenge_text', 'challengeText') || raw.text, MAX_PROMPT_LEN),
      callback: callback,
      detail: text(raw.detail, MAX_DETAIL_LEN),
      instructions: instructionsOf(raw.instructions),
      expiresAt: expiryOf(field(raw, 'expires_at', 'expiresAt'))
    };
  }

  function isRequired(source) {
    if (!source || typeof source !== 'object') return false;
    var candidates = [];
    if (source.problem && typeof source.problem === 'object') candidates.push(source.problem);
    if (source.data && typeof source.data === 'object') candidates.push(source.data);
    candidates.push(source);
    return candidates.some(function (candidate) {
      var status = Number(candidate.status || source.status || 0);
      var code = String(candidate.code || '').toUpperCase();
      return status === 422 && code === 'CAPTCHA_REQUIRED';
    });
  }

  function fromError(error) {
    return sanitizeChallenge(error);
  }

  /* Payload appended to the retried request. `session_cookie` stays supported for
     programmatic callers, but the compact popup no longer exposes a field for it. */
  function buildResolution(challenge, fields) {
    var input = fields || {};
    var token = normalizeToken(input.token);
    if (!token) return null;
    var payload = { captcha_token: token };
    var cookie = normalizeCookie(input.session_cookie);
    if (cookie) payload.session_cookie = cookie;
    if (challenge && challenge.challengeId) payload.challenge_id = challenge.challengeId;
    return payload;
  }

  function formatCountdown(ms) {
    var seconds = Math.max(0, Math.ceil(ms / 1000));
    var minutes = Math.floor(seconds / 60);
    var rest = seconds % 60;
    return minutes + ':' + (rest < 10 ? '0' : '') + rest;
  }

  /* The single line of guidance under the challenge: backend prompt, then the backend
     detail, then the translated default. */
  function promptOf(challenge) {
    if (challenge.text) return challenge.text;
    if (state.imageBroken) return t('captcha.imageUnavailable');
    if (challenge.detail) return challenge.detail;
    return t('captcha.promptFallback');
  }

  function renderChallenge() {
    var challenge = state.challenge;
    if (!challenge || !els.dialog) return;

    if (els.image) {
      if (challenge.image && !state.imageBroken) {
        els.image.setAttribute('src', challenge.image);
        els.image.hidden = false;
      } else {
        els.image.setAttribute('src', IMAGE_PLACEHOLDER);
        els.image.hidden = true;
      }
      els.image.setAttribute('alt', t('captcha.imageAlt'));
    }

    if (els.prompt) els.prompt.textContent = promptOf(challenge);

    updateExpiryLabel();
  }

  function updateExpiryLabel() {
    if (!els.expires) return;
    var challenge = state.challenge;
    if (!challenge) {
      els.expires.textContent = '—';
      return;
    }
    var remaining = challenge.expiresAt - Date.now();
    els.expires.textContent = state.expired || remaining <= 0
      ? t('captcha.expiredShort')
      : t('captcha.expiresIn', { time: formatCountdown(remaining) });
  }

  function showError(message) {
    if (!els.error) return;
    els.error.textContent = message || '';
    els.error.hidden = !message;
  }

  function markExpired() {
    state.expired = true;
    clearTimers();
    if (els.submit) els.submit.disabled = true;
    showError(t('captcha.expired'));
    updateExpiryLabel();
  }

  function startTimers() {
    clearTimers();
    var challenge = state.challenge;
    if (!challenge) return;
    var remaining = challenge.expiresAt - Date.now();
    if (remaining <= 0) {
      markExpired();
      return;
    }
    state.expiryTimer = window.setTimeout(markExpired, Math.min(remaining, 2147483647));
    state.countdownTimer = window.setInterval(updateExpiryLabel, 1000);
  }

  function clearTimers() {
    if (state.expiryTimer) {
      window.clearTimeout(state.expiryTimer);
      state.expiryTimer = null;
    }
    if (state.countdownTimer) {
      window.clearInterval(state.countdownTimer);
      state.countdownTimer = null;
    }
  }

  /* Drop everything the challenge put on screen: nothing about a solved/abandoned
     challenge stays in the DOM once the dialog is gone (the image bitmap included). */
  function clearRendered() {
    if (els.image) {
      els.image.setAttribute('src', IMAGE_PLACEHOLDER);
      els.image.hidden = true;
    }
    if (els.prompt) els.prompt.textContent = t('captcha.promptFallback');
    if (els.expires) els.expires.textContent = '—';
    if (els.submit) els.submit.disabled = false;
  }

  function wipeFields() {
    if (els.token) {
      els.token.value = '';
      els.token.removeAttribute('aria-invalid');
    }
    showError('');
    clearRendered();
    state.challenge = null;
    state.expired = false;
    state.imageBroken = false;
  }

  function openDialog() {
    if (!els.dialog) return;
    if (typeof els.dialog.showModal === 'function') {
      try {
        els.dialog.showModal();
        return;
      } catch (error) {
        /* fall through to the attribute-based fallback */
      }
    }
    els.dialog.setAttribute('open', '');
  }

  function closeDialog() {
    if (!els.dialog) return;
    if (typeof els.dialog.close === 'function' && els.dialog.hasAttribute('open')) {
      try {
        els.dialog.close();
        return;
      } catch (error) {
        /* fall through */
      }
    }
    els.dialog.removeAttribute('open');
  }

  function restoreFocus() {
    if (state.previousFocus && typeof state.previousFocus.focus === 'function') {
      try {
        state.previousFocus.focus();
      } catch (error) {
        /* element may be gone */
      }
    }
    state.previousFocus = null;
  }

  function finish(reason) {
    var pending = state.pending;
    state.pending = null;
    clearTimers();
    var expired = state.expired || reason === 'expired';
    closeDialog();
    wipeFields();
    restoreFocus();
    if (!pending) return;
    if (reason === 'submit') return;
    pending.reject(failure(expired ? 'CAPTCHA_EXPIRED' : 'CAPTCHA_CANCELLED', expired ? 'challenge expired' : 'challenge cancelled'));
  }

  function onSubmit(event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    if (!state.pending) return;
    if (state.expired) {
      showError(t('captcha.expired'));
      return;
    }

    var resolution = buildResolution(state.challenge, {
      token: els.token ? els.token.value : ''
    });

    if (!resolution) {
      if (els.token) els.token.setAttribute('aria-invalid', 'true');
      showError(t('captcha.invalidToken'));
      if (els.token && typeof els.token.focus === 'function') els.token.focus();
      return;
    }

    var pending = state.pending;
    state.pending = null;
    clearTimers();
    closeDialog();
    wipeFields();
    restoreFocus();
    pending.resolve(resolution);
  }

  function bind() {
    if (state.bound) return;
    state.bound = true;
    if (els.form) els.form.addEventListener('submit', onSubmit);
    if (els.cancel) els.cancel.addEventListener('click', function () { finish('cancel'); });
    if (els.close) els.close.addEventListener('click', function () { finish('cancel'); });
    if (els.image) {
      // A blocked/broken image never blocks the flow: the prompt takes over.
      els.image.addEventListener('error', function () {
        state.imageBroken = true;
        if (els.image) {
          els.image.setAttribute('src', IMAGE_PLACEHOLDER);
          els.image.hidden = true;
        }
        if (els.prompt && state.challenge) els.prompt.textContent = promptOf(state.challenge);
      });
    }
    if (els.dialog) {
      els.dialog.addEventListener('cancel', function (event) {
        if (event && typeof event.preventDefault === 'function') event.preventDefault();
        finish(state.expired ? 'expired' : 'cancel');
      });
      els.dialog.addEventListener('click', function (event) {
        if (event && event.target === els.dialog) finish(state.expired ? 'expired' : 'cancel');
      });
    }
    window.addEventListener('pagehide', function () {
      // never leave an answer/image behind in memory/DOM
      wipeFields();
      clearTimers();
    });
  }

  function collect() {
    return {
      dialog: document.getElementById('captcha-dialog'),
      form: document.getElementById('captcha-form'),
      image: document.getElementById('captcha-image'),
      prompt: document.getElementById('captcha-prompt'),
      expires: document.getElementById('captcha-expires'),
      token: document.getElementById('captcha-token'),
      error: document.getElementById('captcha-error'),
      submit: document.getElementById('captcha-submit'),
      cancel: document.getElementById('captcha-cancel'),
      close: document.getElementById('captcha-close')
    };
  }

  function init() {
    els = collect();
    if (!els.dialog) return false;
    bind();
    window.addEventListener('tp:languagechange', function () {
      if (!state.challenge) return;
      renderChallenge();
      if (state.expired) showError(t('captcha.expired'));
    });
    return true;
  }

  /* Opens the dialog and resolves with `{ captcha_token, session_cookie?, challenge_id? }`.
     Rejects with code CAPTCHA_CANCELLED or CAPTCHA_EXPIRED. */
  function request(rawChallenge) {
    if (!els.dialog && !init()) {
      return Promise.reject(failure('CAPTCHA_UNAVAILABLE', 'dialog unavailable'));
    }
    if (state.pending) {
      // A newer challenge replaces the previous one instead of stacking dialogs.
      var previous = state.pending;
      state.pending = null;
      previous.reject(failure('CAPTCHA_CANCELLED', 'challenge replaced'));
    }

    state.challenge = sanitizeChallenge(rawChallenge);
    state.expired = false;
    state.imageBroken = false;
    state.previousFocus = document.activeElement || null;
    showError('');
    if (els.token) {
      els.token.value = '';
      els.token.removeAttribute('aria-invalid');
    }
    if (els.submit) els.submit.disabled = false;

    renderChallenge();
    openDialog();
    startTimers();

    return new Promise(function (resolve, reject) {
      state.pending = { resolve: resolve, reject: reject };
      if (els.token && typeof els.token.focus === 'function') els.token.focus();
    });
  }

  function close() {
    finish('cancel');
  }

  TP.captcha = {
    init: init,
    request: request,
    close: close,
    isRequired: isRequired,
    fromError: fromError,
    sanitizeChallenge: sanitizeChallenge,
    safeExternalUrl: safeExternalUrl,
    safeImageSource: safeImageSource,
    buildResolution: buildResolution,
    normalizeToken: normalizeToken,
    normalizeSessionCookie: normalizeCookie,
    config: {
      allowedHosts: ALLOWED_HOSTS.slice(),
      imageHosts: IMAGE_HOSTS.slice(),
      challengeTtlMs: CHALLENGE_TTL_MS,
      maxInstructions: MAX_INSTRUCTIONS,
      maxAnswerLen: MAX_ANSWER_LEN,
      tokenPattern: String(TOKEN_PATTERN),
      imageDataPattern: String(IMAGE_DATA_PATTERN),
      imagePlaceholder: IMAGE_PLACEHOLDER
    }
  };
})(window.TP);
