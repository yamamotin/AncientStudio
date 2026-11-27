'use strict';

/* CAPTCHA_REQUIRED flow: 422 -> focused dialog -> resend of the original call.
   The module is executed inside a vm sandbox with a hand-built DOM (the repo has no
   jsdom dependency), so every assertion here exercises the real shipped code. */

const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const test = require('node:test');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const pt = JSON.parse(readFileSync(path.join(root, 'assets/i18n/pt-br.json'), 'utf8'));
const en = JSON.parse(readFileSync(path.join(root, 'assets/i18n/en.json'), 'utf8'));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const captchaSrc = readFileSync(path.join(root, 'assets/js/captcha.js'), 'utf8');
const main = readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const i18n = readFileSync(path.join(root, 'assets/js/i18n.js'), 'utf8');

const IDS = [
  'captcha-dialog',
  'captcha-form',
  'captcha-provider',
  'captcha-site-key',
  'captcha-portal-link',
  'captcha-expires',
  'captcha-detail',
  'captcha-instructions',
  'captcha-token',
  'captcha-session',
  'captcha-error',
  'captcha-submit',
  'captcha-cancel',
  'captcha-close'
];

const BACKEND_CHALLENGE = {
  ok: false,
  status: 422,
  code: 'CAPTCHA_REQUIRED',
  title: 'CAPTCHA obrigatório',
  detail: 'O PROJUDI TJPR exige validação humana.',
  site_key: '6Lc_aX8qAAAAAKzXQ0zX9hXm1mQXbH8V1cJ9dE2f',
  portal_url: 'https://consulta.tjpr.jus.br/projudi_consulta/',
  form_url: 'https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar',
  recaptcha_callback: 'executaRecaptchaPBC_actre_consulta_publica',
  instructions: ['Abra o portal oficial.', 'Resolva o reCAPTCHA.', 'Cole o token aqui.']
};

function makeEl(id) {
  const el = {
    id,
    value: '',
    text: '',
    hidden: false,
    disabled: false,
    children: [],
    attrs: {},
    handlers: {},
    showing: false,
    focusCount: 0,
    get textContent() { return el.text; },
    set textContent(value) {
      el.text = String(value);
      if (value === '') el.children = [];
    },
    getAttribute(name) { return el.attrs[name] === undefined ? null : el.attrs[name]; },
    setAttribute(name, value) { el.attrs[name] = String(value); },
    removeAttribute(name) { delete el.attrs[name]; },
    hasAttribute(name) { return Object.prototype.hasOwnProperty.call(el.attrs, name); },
    addEventListener(type, handler) { (el.handlers[type] = el.handlers[type] || []).push(handler); },
    focus() { el.focusCount += 1; sandbox.document.activeElement = el; },
    appendChild(child) { el.children.push(child); },
    showModal() { el.showing = true; el.attrs.open = ''; },
    close() { el.showing = false; delete el.attrs.open; },
    fire(type, extra) {
      (el.handlers[type] || []).forEach((handler) => handler(Object.assign({ type, target: el, preventDefault() {} }, extra)));
    }
  };
  return el;
}

let sandbox;

function mount(language) {
  const nodes = new Map(IDS.map((id) => [id, makeEl(id)]));
  const timers = { timeouts: [], intervals: [] };
  const windowHandlers = {};

  const box = {
    console,
    JSON,
    Promise,
    Error,
    Number,
    String,
    Object,
    Array,
    Math,
    Date,
    isFinite,
    URL,
    setTimeout(fn, ms) { timers.timeouts.push({ fn, ms }); return timers.timeouts.length; },
    clearTimeout() {},
    setInterval(fn) { timers.intervals.push(fn); return timers.intervals.length; },
    clearInterval() {},
    document: {
      documentElement: { lang: '' },
      activeElement: null,
      getElementById: (id) => nodes.get(id) || null,
      createElement: (tag) => ({ tag, textContent: '', children: [] }),
      querySelectorAll: () => []
    },
    __lang: language || 'pt-br',
    __timers: timers
  };
  box.window = box;
  box.window.TP = {};
  box.TP = box.window.TP;
  box.TP.i18n = {
    // Real dictionaries, minimal translator: proves the dialog is fully translated.
    t(key, vars) {
      const table = box.__lang === 'en' ? en : pt;
      const text = table[key] === undefined ? key : table[key];
      if (!vars) return text;
      return text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] === undefined ? '{' + name + '}' : String(vars[name])));
    },
    getLanguage() { return box.__lang; }
  };
  box.window.addEventListener = (type, handler) => { (windowHandlers[type] = windowHandlers[type] || []).push(handler); };
  box.__windowHandlers = windowHandlers;
  vm.createContext(box);
  vm.runInContext(captchaSrc, box);
  sandbox = box;
  box.__nodes = nodes;
  return box;
}

test('index.html ships the dialog, ships the module, and never embeds a remote frame', () => {
  for (const id of IDS) {
    assert.match(html, new RegExp(`id="${id}"`), `#${id} is missing from index.html`);
  }
  const dialog = html.slice(html.indexOf('<dialog id="captcha-dialog"'), html.indexOf('</dialog>'));
  assert.ok(dialog.length > 0, 'the dialog element is closed');
  assert.doesNotMatch(dialog, /<iframe|<frame|<object|<embed/i, 'no remote/allowed frame inside the dialog');
  assert.doesNotMatch(dialog, /<script/i, 'no inline script inside the dialog');
  assert.match(dialog, /<form id="captcha-form"[^>]*novalidate/);
  assert.match(dialog, /id="captcha-token"[^>]*autocomplete="off"/);
  assert.match(dialog, /id="captcha-session"[^>]*type="password"/);
  assert.match(dialog, /role="alert"/, 'errors are announced');

  // The dialog lives after <main> and the module loads before main.js, after i18n.js.
  assert.ok(html.indexOf('</main>') < html.indexOf('<dialog id="captcha-dialog"'));
  const i18nAt = html.indexOf('assets/js/i18n.js');
  const captchaAt = html.indexOf('assets/js/captcha.js');
  const mainAt = html.indexOf('assets/js/main.js');
  assert.ok(i18nAt !== -1 && captchaAt !== -1 && mainAt !== -1, 'all three scripts are referenced');
  assert.ok(i18nAt < captchaAt && captchaAt < mainAt, 'script order: i18n -> captcha -> main');
  assert.match(html, /<script src="assets\/js\/captcha\.js" defer><\/script>/);
});

test('captcha copy is translated in both languages and mirrored in BUNDLED', () => {
  const keys = Object.keys(pt).filter((key) => key.startsWith('captcha.'));
  assert.ok(keys.length >= 20, `expected the full captcha namespace, got ${keys.length}`);
  assert.deepEqual(keys.sort(), Object.keys(en).filter((key) => key.startsWith('captcha.')).sort());
  for (const key of keys) {
    assert.match(pt[key], /\[|\{\w+\}|[A-Za-zÀ-ÿ]/, `${key} looks empty in pt-br`);
    assert.match(en[key], /\[|\{\w+\}|[A-Za-z]/, `${key} looks empty in en`);
  }
  const bundled = JSON.parse(i18n.match(/var BUNDLED = (\{[\s\S]*?\n\});/)[1]);
  for (const key of keys) {
    assert.equal(bundled['pt-br'][key], pt[key], `${key} drifts from BUNDLED pt-br`);
    assert.equal(bundled.en[key], en[key], `${key} drifts from BUNDLED en`);
  }
  // HTML static text must already be the pt-br value (no flash of raw keys).
  for (const [, key, body] of html.matchAll(/data-i18n="(captcha\.[^"]+)"[^>]*>([^<]*)</g)) {
    assert.equal(body.trim(), pt[key], `static ${key} differs from the dictionary`);
  }
});

test('safeExternalUrl only allows https on the CAPTCHA allowlist', () => {
  const box = mount();
  const safe = box.TP.captcha.safeExternalUrl;
  assert.equal(safe('https://consulta.tjpr.jus.br/projudi_consulta/'), 'https://consulta.tjpr.jus.br/projudi_consulta/');
  assert.equal(safe('https://www.google.com/recaptcha/api2/anchor?k=abc'), 'https://www.google.com/recaptcha/api2/anchor?k=abc');
  assert.equal(safe('  https://www.tjpr.jus.br/  '), 'https://www.tjpr.jus.br/');
  for (const rejected of [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(document.cookie)',
    'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
    'http://consulta.tjpr.jus.br/',
    'https://consulta.tjpr.jus.br.evil.io/',
    'https://evil.io/?next=consulta.tjpr.jus.br',
    'https://user:pass@consulta.tjpr.jus.br/',
    '//consulta.tjpr.jus.br/projudi_consulta/',
    'file:///etc/passwd',
    '',
    null,
    undefined,
    'https://' + 'a'.repeat(3000)
  ]) {
    assert.equal(safe(rejected), '', `must reject: ${String(rejected)}`);
  }
});

test('sanitizeChallenge bounds untrusted metadata and keeps only safe URLs', () => {
  const box = mount();
  const challenge = box.TP.captcha.sanitizeChallenge(BACKEND_CHALLENGE);
  assert.equal(challenge.code, 'CAPTCHA_REQUIRED');
  assert.equal(challenge.provider, 'recaptcha');
  assert.equal(challenge.siteKey, BACKEND_CHALLENGE.site_key);
  assert.equal(challenge.portalUrl, 'https://consulta.tjpr.jus.br/projudi_consulta/');
  assert.equal(challenge.callback, 'executaRecaptchaPBC_actre_consulta_publica');
  assert.equal(challenge.instructions.length, 3);
  assert.ok(challenge.expiresAt > Date.now(), 'default TTL is in the future');
  assert.ok(challenge.expiresAt <= Date.now() + box.TP.captcha.config.challengeTtlMs + 1000);

  const hostile = box.TP.captcha.sanitizeChallenge({
    status: 422,
    code: 'CAPTCHA_REQUIRED',
    site_key: '<script>alert(1)</script>',
    portal_url: 'javascript:alert(1)',
    form_url: 'https://evil.io/form',
    detail: '<img src=x onerror=alert(1)>'.repeat(40),
    instructions: new Array(50).fill('<b>bold</b>'),
    expires_at: '2000-01-01T00:00:00Z',
    recaptcha_callback: 'x(){};alert(1)'
  });
  assert.equal(hostile.siteKey, '', 'invalid site keys are dropped');
  assert.equal(hostile.portalUrl, '', 'javascript: URLs are dropped');
  assert.equal(hostile.formUrl, '', 'non-allowlisted hosts are dropped');
  assert.equal(hostile.callback, '', 'callbacks must be plain identifiers');
  assert.ok(hostile.instructions.length <= box.TP.captcha.config.maxInstructions);
  assert.ok(hostile.instructions.every((item) => item.length <= 241));
  assert.equal(hostile.expiresAt <= Date.now(), true, 'an already-expired challenge is reported as expired');

  // Idempotent: request() receives the output of fromError(), so sanitizing twice must
  // keep site key, URLs, callback and instructions (regression: main.js fed the dialog an
  // already-sanitized challenge and the metadata came back empty).
  const twice = box.TP.captcha.sanitizeChallenge(challenge);
  for (const key of ['siteKey', 'challengeId', 'portalUrl', 'formUrl', 'callback', 'provider']) {
    assert.equal(twice[key], challenge[key], `${key} is lost when a challenge is re-sanitized`);
  }
  assert.deepEqual([...twice.instructions], [...challenge.instructions]);
  assert.ok(Math.abs(twice.expiresAt - challenge.expiresAt) < 1000, 'the deadline survives re-sanitizing');

  // Nested problem bodies (ApiClientError.problem) and static fallbacks are understood.
  const nested = box.TP.captcha.sanitizeChallenge({ problem: BACKEND_CHALLENGE });
  assert.equal(nested.portalUrl, BACKEND_CHALLENGE.portal_url);
  assert.equal(box.TP.captcha.sanitizeChallenge({ data: BACKEND_CHALLENGE }).siteKey, BACKEND_CHALLENGE.site_key);
  assert.equal(box.TP.captcha.isRequired({ status: 422, code: 'CAPTCHA_REQUIRED' }), true);
  assert.equal(box.TP.captcha.isRequired({ problem: { status: 422, code: 'captcha_required' } }), true);
  assert.equal(box.TP.captcha.isRequired({ status: 422, code: 'INVALID_CPF' }), false);
  assert.equal(box.TP.captcha.isRequired({ status: 500, code: 'CAPTCHA_REQUIRED' }), false);
  assert.equal(box.TP.captcha.isRequired(null), false);
});

test('buildResolution validates the pasted token and the optional session cookie', () => {
  const box = mount();
  const challenge = box.TP.captcha.sanitizeChallenge({ code: 'CAPTCHA_REQUIRED', challenge_id: 'chal-01' });
  const resolution = box.TP.captcha.buildResolution(challenge, {
    token: '  03AGdBq26-token_value.1  ',
    session_cookie: 'JSESSIONID=ABC123;'
  });
  assert.deepEqual({ ...resolution }, {
    captcha_token: '03AGdBq26-token_value.1',
    session_cookie: 'JSESSIONID=ABC123;',
    challenge_id: 'chal-01'
  });
  assert.equal(box.TP.captcha.buildResolution(challenge, { token: '' }), null);
  assert.equal(box.TP.captcha.buildResolution(challenge, { token: 'abc' }), null, 'too short');
  assert.equal(box.TP.captcha.buildResolution(challenge, { token: '<script>alert(1)</script>' }), null);
  assert.equal(box.TP.captcha.buildResolution(challenge, { token: 'a b c d e f' }), null, 'no whitespace allowed');
  const minimal = box.TP.captcha.buildResolution({}, { token: 'token-123456', session_cookie: '<b>' });
  assert.deepEqual({ ...minimal }, { captcha_token: 'token-123456' }, 'bad cookie is omitted, no challenge id when unknown');
});

test('challenge -> dialog -> submit resolves with the resolved token and wipes the field', async () => {
  const box = mount('pt-br');
  const nodes = box.__nodes;
  nodes.get('captcha-token').value = 'typed-but-not-submitted'; // stale value from a previous run

  const pending = box.TP.captcha.request(BACKEND_CHALLENGE);
  const dialog = nodes.get('captcha-dialog');
  assert.equal(dialog.showing, true, 'the dialog is modal-opened');
  assert.equal(nodes.get('captcha-token').value, '', 'the token field starts empty');
  assert.equal(nodes.get('captcha-token').focusCount, 1, 'focus goes to the token field');
  assert.equal(nodes.get('captcha-provider').textContent, pt['captcha.providerRecaptcha']);
  assert.equal(nodes.get('captcha-site-key').textContent, BACKEND_CHALLENGE.site_key);
  assert.match(nodes.get('captcha-expires').textContent, /^expira em \d+:\d\d$/);
  assert.equal(nodes.get('captcha-portal-link').hidden, false);
  assert.equal(nodes.get('captcha-portal-link').attrs.href, BACKEND_CHALLENGE.form_url);
  assert.equal(nodes.get('captcha-portal-link').attrs.rel, 'noopener noreferrer');
  assert.equal(nodes.get('captcha-portal-link').attrs.target, '_blank');
  assert.deepEqual(nodes.get('captcha-instructions').children.map((li) => li.textContent), BACKEND_CHALLENGE.instructions);
  assert.equal(nodes.get('captcha-detail').textContent, BACKEND_CHALLENGE.detail);

  // A short token is rejected in place; the dialog stays open and nothing resolves.
  nodes.get('captcha-token').value = 'abc';
  nodes.get('captcha-form').fire('submit');
  assert.equal(nodes.get('captcha-error').textContent, pt['captcha.invalidToken']);
  assert.equal(nodes.get('captcha-error').hidden, false);
  assert.equal(nodes.get('captcha-token').attrs['aria-invalid'], 'true');
  assert.equal(nodes.get('captcha-submit').disabled, false);
  assert.equal(dialog.showing, true);

  nodes.get('captcha-session').value = 'JSESSIONID=9F2C';
  nodes.get('captcha-token').value = '03AGdBq26-valid_token.9';
  nodes.get('captcha-form').fire('submit');
  const resolution = await pending;
  assert.deepEqual({ ...resolution }, {
    captcha_token: '03AGdBq26-valid_token.9',
    session_cookie: 'JSESSIONID=9F2C'
  });
  assert.equal(dialog.showing, false, 'the dialog closes on submit');
  assert.equal(nodes.get('captcha-token').value, '', 'the token is wiped');
  assert.equal(nodes.get('captcha-session').value, '', 'the session cookie is wiped');
  assert.equal(nodes.get('captcha-instructions').children.length, 0, 'challenge data is released');
  assert.equal(nodes.get('captcha-error').hidden, true);
});

test('cancel, close button, Escape and backdrop click reject with CAPTCHA_CANCELLED', async () => {
  const cases = [
    ['cancel button', (box) => box.__nodes.get('captcha-cancel').fire('click')],
    ['close button', (box) => box.__nodes.get('captcha-close').fire('click')],
    ['escape', (box) => box.__nodes.get('captcha-dialog').fire('cancel')],
    ['backdrop click', (box) => {
      const dialog = box.__nodes.get('captcha-dialog');
      (dialog.handlers.click || []).forEach((handler) => handler({ type: 'click', target: dialog }));
    }]
  ];
  for (const [label, act] of cases) {
    const box = mount();
    const pending = box.TP.captcha.request(BACKEND_CHALLENGE);
    box.__nodes.get('captcha-token').value = 'half-typed-token';
    act(box);
    await assert.rejects(pending, (error) => {
      assert.equal(error.code, 'CAPTCHA_CANCELLED', `${label}: wrong code`);
      return true;
    });
    assert.equal(box.__nodes.get('captcha-dialog').showing, false, `${label}: dialog stays closed`);
    assert.equal(box.__nodes.get('captcha-token').value, '', `${label}: token wiped`);
  }
});

test('an expired challenge blocks submission, says so, and rejects with CAPTCHA_EXPIRED', async () => {
  const box = mount();
  const pending = box.TP.captcha.request({
    code: 'CAPTCHA_REQUIRED',
    expires_at: new Date(Date.now() - 1000).toISOString()
  });
  const nodes = box.__nodes;
  assert.equal(nodes.get('captcha-submit').disabled, true);
  assert.equal(nodes.get('captcha-error').textContent, pt['captcha.expired']);
  assert.equal(nodes.get('captcha-expires').textContent, pt['captcha.expiredShort']);

  nodes.get('captcha-token').value = '03AGdBq26-late_token.1';
  nodes.get('captcha-form').fire('submit');
  assert.equal(nodes.get('captcha-error').textContent, pt['captcha.expired'], 'submit does not sneak through');

  nodes.get('captcha-cancel').fire('click');
  await assert.rejects(pending, (error) => error.code === 'CAPTCHA_EXPIRED');

  // A countdown that runs out while the dialog is open does the same.
  const live = mount();
  const livePending = live.TP.captcha.request({ code: 'CAPTCHA_REQUIRED' });
  const timeouts = live.__timers.timeouts;
  assert.ok(timeouts.length > 0, 'an expiry timer is scheduled');
  timeouts.forEach((entry) => entry.fn());
  assert.equal(live.__nodes.get('captcha-submit').disabled, true);
  assert.equal(live.__nodes.get('captcha-error').textContent, pt['captcha.expired']);
  live.__nodes.get('captcha-dialog').fire('cancel');
  await assert.rejects(livePending, (error) => error.code === 'CAPTCHA_EXPIRED');
});

test('the dialog re-renders in the active language and releases listeners on pagehide', async () => {
  const box = mount('pt-br');
  const nodes = box.__nodes;
  const pending = box.TP.captcha.request(BACKEND_CHALLENGE);
  assert.equal(nodes.get('captcha-provider').textContent, pt['captcha.providerRecaptcha']);
  assert.equal(nodes.get('captcha-expires').textContent.startsWith('expira em'), true);

  box.__lang = 'en';
  box.__windowHandlers['tp:languagechange'].forEach((handler) => handler({ type: 'tp:languagechange' }));
  assert.equal(nodes.get('captcha-provider').textContent, en['captcha.providerRecaptcha']);
  assert.equal(nodes.get('captcha-expires').textContent.startsWith('expires in'), true);

  // pagehide (reload, tab discard, bfcache) must not leave the token in the DOM.
  nodes.get('captcha-token').value = 'secret-token-12345';
  box.__windowHandlers.pagehide.forEach((handler) => handler({ type: 'pagehide' }));
  assert.equal(nodes.get('captcha-token').value, '');
  box.__nodes.get('captcha-cancel').fire('click');
  await assert.rejects(pending, (error) => error.code === 'CAPTCHA_CANCELLED');
});

test('a second challenge replaces the first instead of stacking dialogs', async () => {
  const box = mount();
  const first = box.TP.captcha.request(BACKEND_CHALLENGE);
  const second = box.TP.captcha.request({ code: 'CAPTCHA_REQUIRED', site_key: '6Lc_other_key_1234567890' });
  await assert.rejects(first, (error) => error.code === 'CAPTCHA_CANCELLED');
  assert.equal(box.__nodes.get('captcha-site-key').textContent, '6Lc_other_key_1234567890');
  box.__nodes.get('captcha-token').value = '03AGdBq26-second_token.2';
  box.__nodes.get('captcha-form').fire('submit');
  assert.deepEqual({ ...(await second) }, { captcha_token: '03AGdBq26-second_token.2' });
});

test('main.js opens the popup on CAPTCHA_REQUIRED and resends the same call with the resolution', () => {
  includesAll(main, [
    "TP.captcha.isRequired(error)",
    'TP.captcha.fromError(error)',
    'await TP.captcha.request(challenge)',
    'await liveCall(resolution)',
    'Object.assign(req, resolution)',
    'Object.assign(params, resolution)',
    'Object.assign({ texto_processo: valOf(\'resumo-texto\') }, resolution || {})',
    'renderResponse(retried.data, retried, metaId, outputId)',
    "captchaNote('captcha.cancelled'",
    "captchaNote('captcha.expired'",
    "captchaNote('captcha.rejected'",
    "captchaNote('captcha.unavailable'",
    "captchaNote('captcha.staticMode'"
  ]);
  // No retry storm: a rejected token reports back instead of reopening the dialog.
  assert.doesNotMatch(main, /while \(TP\.captcha/, 'no automatic CAPTCHA loop');
  assert.match(main, /if \(TP\.captcha\.isRequired\(retryError\)\) captchaNote\('captcha\.rejected'/);

  // The resolved token is a one-shot credential: never echoed into the visible route label.
  includesAll(main, [
    'function redactSecrets(text)',
    'redactSecrets(label)',
    "/(captcha_token|session_cookie)=[^&\\s]*/gi"
  ]);

  // Nothing user-controlled is ever written as HTML.
  assert.doesNotMatch(captchaSrc, /\.innerHTML\s*=/, 'captcha.js must not assign innerHTML');
  assert.doesNotMatch(captchaSrc, /insertAdjacentHTML|outerHTML|document\.write/);
  assert.match(captchaSrc, /textContent/);
});
