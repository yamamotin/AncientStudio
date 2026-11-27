'use strict';

const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const read = (relative) => readFileSync(path.join(root, relative), 'utf8');

const html = read('index.html');
const main = read('assets/js/main.js');
const adapter = read('assets/js/engine-adapter.js');
const neofetch = read('assets/js/neofetch.js');
const css = read('assets/css/style.css');
const i18n = read('assets/js/i18n.js');
const pt = JSON.parse(read('assets/i18n/pt-br.json'));
const en = JSON.parse(read('assets/i18n/en.json'));
const heroSection = html.slice(
  html.indexOf('<section id="top"'),
  html.indexOf('<!-- 2. LIVE CI/CD & DOCKER PIPELINE')
);
const stackSection = html.slice(
  html.indexOf('<section id="stack"'),
  html.indexOf('</main>')
);

test('scene controls include a bilingual fullscreen button', () => {
  includesAll(html, [
    'id="scene-fullscreen"',
    'data-i18n="scene.fullscreen"',
    'data-i18n-attr="aria-label:scene.fullscreenAria"'
  ]);
  for (const key of ['scene.fullscreen', 'scene.exitFullscreen', 'scene.fullscreenAria', 'scene.exitFullscreenAria']) {
    assert.ok(pt[key] && en[key], `missing translation for ${key}`);
    includesAll(i18n, [`"${key}"`]);
  }
});

test('fullscreen uses the native API with a CSS fallback and simple exit', () => {
  const start = main.indexOf('function initSceneFullscreen');
  const end = main.indexOf('function applyDynamicLabels', start);
  const block = main.slice(start, end);

  includesAll(block, [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenchange',
    "event.key === 'Escape'",
    "classList.toggle('is-scene-fullscreen'",
    "setAttribute('data-fullscreen-view'",
    'syncLabels'
  ]);
  assert.doesNotMatch(block, /TP\.scene\.create|TP\.scene\.mount/, 'no duplicate engine instances');

  includesAll(css, ['#scene:fullscreen', '#scene.is-scene-fullscreen', 'body.scene-fullscreen-active']);
});

test('uploaded portrait is a local, responsive asset with bilingual alt text', () => {
  assert.ok(existsSync(path.join(root, 'assets/img/eron-portrait-ascii.png')), 'portrait asset exists');
  includesAll(html, [
    'src="assets/img/eron-portrait-ascii.png"',
    'width="892"',
    'height="1184"',
    'alt="Retrato em arte ASCII de Eron Yamamoto com casaco escuro sobre fundo preto."',
    'data-i18n-attr="alt:hero.portraitAlt"',
    'loading="lazy"'
  ]);
  assert.ok(pt['hero.portraitAlt'] && en['hero.portraitAlt'], 'portrait alt is translated');
  assert.doesNotMatch(heroSection, /ERON YAMAMOTO/, 'no duplicate plain-text name above the ASCII banner');
  includesAll(css, [
    '.hero-portrait',
    'aspect-ratio: 3 / 4',
    'object-fit: cover',
    'grid-template-columns: clamp(8rem, 18vw, 11rem) minmax(0, 1fr)',
    'grid-row: 2 / span 4',
    'margin: var(--space-5) 0 0'
  ]);
  assert.doesNotMatch(css, /\.hero-portrait\s*\{[^}]*float:/s);
  assert.ok(
    heroSection.indexOf('class="banner-frame"') < heroSection.indexOf('class="hero-portrait"'),
    'ASCII banner is the only visible name heading before the portrait'
  );
});

test('stack section shows only the penguin and the exact requested rows', () => {
  assert.doesNotMatch(stackSection, /neofetch-penguin-telemetry|engine-hint|sr-only|yaw|pitch/i);
  assert.equal((stackSection.match(/<dt/g) || []).length, 7);
  assert.equal((stackSection.match(/<dd/g) || []).length, 7);

  const text = stackSection
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  const rows = [
    'User eron@production',
    'OS Linux Production (Troubleshooting N3 & RCA)',
    'Languages Python, SQL, Bash',
    'DevOps Docker, GitHub Actions (CI/CD), Git',
    'Data & AI ETL Pipelines, Pandas, NumPy, n8n, Web Scraping',
    'Certifications Harvard CS50, Microsoft SC-900, UFPR Machine Learning',
    'Education [B.Sc](http://B.Sc). Electrical Engineering (IFPR) + Erasmus+ International Program'
  ];
  rows.forEach((row) => assert.ok(text.includes(row), `missing exact row: ${row}`));
});

test('scene modes replace the old preset selector with day, night and rain', () => {
  assert.doesNotMatch(html, /id="scene-preset"|id="scene-cycle"|value="sanctuary"|value="dawn"|value="storm"|value="emerald"/);
  includesAll(html, [
    'data-scene-mode="day"',
    'data-scene-mode="night"',
    'data-scene-mode="rain"',
    'data-i18n="scene.day"',
    'data-i18n="scene.night"',
    'data-i18n="scene.rain"',
    'aria-pressed="true"'
  ]);
  for (const key of ['scene.day', 'scene.night', 'scene.rain', 'scene.presetLabel']) {
    assert.ok(pt[key] && en[key], `missing translation for ${key}`);
  }
  assert.deepEqual(
    [pt['scene.day'], pt['scene.night'], pt['scene.rain']],
    ['[ Dia ]', '[ Noite ]', '[ Chuva ]']
  );
  assert.deepEqual([en['scene.day'], en['scene.night'], en['scene.rain']], ['[ Day ]', '[ Night ]', '[ Rain ]']);
  // Rain is the default atmosphere: it is the pressed preset in the markup.
  assert.match(html, /<button[^>]*data-scene-mode="rain"[^>]*aria-pressed="true"/);
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1, 'only one preset is pressed at a time');
  assert.doesNotMatch(main, /scene-cycle|scene-preset|setCycle/);
  includesAll(main, ['data-scene-mode', 'scene.setPreset(activeMode)', 'aria-pressed']);

  // Reflection is fixed at 100% and the slider was removed together with its wiring.
  assert.doesNotMatch(html, /scene-reflection/, 'no reflection slider remains');
  assert.doesNotMatch(main, /scene-reflection|onReflectionInput|reflectionSlider|reflectionOutput/);
  includesAll(main, ['FIXED_REFLECTION = 1', 'scene.setReflection(FIXED_REFLECTION)']);
  for (const dictionary of [pt, en]) {
    assert.equal(dictionary['scene.reflectionLabel'], undefined);
    assert.equal(dictionary['scene.reflectionAria'], undefined);
  }
  assert.doesNotMatch(i18n, /scene\.reflection(Label|Aria)/);
});

test('page brightness is a 50%-100% top-bar slider with an amplified curve', () => {
  // The control replaced the old `ERON@PRODUCTION:~$` brand in the top bar.
  const topbar = html.slice(html.indexOf('<header class="topbar"'), html.indexOf('</header>'));
  includesAll(topbar, [
    'id="brightness-control"',
    'type="range"',
    'min="50"',
    'max="100"',
    'step="1"',
    'value="100"',
    'id="brightness-value"',
    'data-i18n="brightness.short"',
    'data-i18n-attr="aria-label:brightness.label"',
    'href="#pipeline"',
    'href="#gateway"',
    'href="#console"',
    'href="#scene"',
    'id="lang-toggle"'
  ]);
  assert.doesNotMatch(html, /ERON@PRODUCTION/, 'the brand text is gone from the top bar');
  assert.doesNotMatch(html, /class="brand"/);
  assert.match(html, /<output id="brightness-value" for="brightness-control">100%<\/output>/);
  // No second control is left behind in the footer.
  assert.equal((html.match(/id="brightness-control"/g) || []).length, 1);
  assert.ok(pt['brightness.label'] && en['brightness.label'], 'brightness label is translated');
  assert.ok(pt['brightness.short'] && en['brightness.short'], 'top-bar short label is translated');

  includesAll(css, [
    '--page-brightness: 1.3',
    '--page-contrast: 1.05',
    'brightness(var(--page-brightness)) contrast(var(--page-contrast))',
    '.brightness-control input[type="range"]',
    '.topbar-brightness'
  ]);
  // The top bar is not filtered, so the control stays usable at the 50% end.
  assert.doesNotMatch(css, /body > \.topbar,[\s\S]{0,80}filter:/);
  includesAll(main, [
    "getElementById('brightness-control')",
    "setProperty('--page-brightness'",
    "setProperty('--page-contrast'",
    "addEventListener('input'",
    "localStorage.setItem(storageKey"
  ]);
  // The visual response is wider than the numeric range: 2.6x brightness + a
  // contrast ramp, not a subtle linear 1.0-1.5 multiplier.
  includesAll(main, ['BRIGHTNESS_CURVE', 'min: 0.5, max: 1.3', 'min: 0.78, max: 1.05']);
});

test('contact button uses email on mobile and WhatsApp on other devices', () => {
  function loadContactApi(profile) {
    const sandbox = {
      console,
      document: {
        readyState: 'loading',
        addEventListener() {},
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => []
      }
    };
    sandbox.window = {
      TP: {},
      navigator: profile.navigator || {},
      matchMedia: (query) => ({
        matches: Boolean(profile.matches && profile.matches[query])
      }),
      addEventListener() {}
    };
    sandbox.TP = sandbox.window.TP;
    vm.createContext(sandbox);
    vm.runInContext(main, sandbox);
    return sandbox.TP.contact;
  }

  const email = 'mailto:yamah1337@gmail.com';
  const whatsapp = 'https://api.whatsapp.com/send/?phone=5544920009249';

  const iphone = loadContactApi({ navigator: { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)' } });
  assert.equal(iphone.isMobile(), true);
  assert.equal(iphone.destination(), email);

  const smallTouch = loadContactApi({
    matches: { '(pointer: coarse)': true, '(max-width: 900px)': true }
  });
  assert.equal(smallTouch.destination(), email);

  const desktop = loadContactApi({ navigator: { userAgent: 'Mozilla/5.0 (X11; Linux x86_64)' } });
  assert.equal(desktop.isMobile(), false);
  assert.equal(desktop.destination(), whatsapp);

  const touchLaptop = loadContactApi({ matches: { '(pointer: coarse)': true } });
  assert.equal(touchLaptop.destination(), whatsapp);

  includesAll(main, [
    'CONTACT_EMAIL_URL',
    'CONTACT_WHATSAPP_URL',
    '(pointer: coarse)',
    '(max-width: 900px)',
    'initContactButton();'
  ]);
  const initStart = main.indexOf('function init()');
  const initEnd = main.indexOf('function scheduleUiIntegrations');
  assert.ok(
    main.indexOf('initContactButton();', initStart) < initEnd,
    'contact href is synced during init, before deferred UI wiring'
  );
  assert.match(html, /id="contact-button"[^>]*href="mailto:yamah1337@gmail\.com"/);
});

test('fallback penguin is static ASCII art without pointer events or RAF', () => {
  let queuedFrame = null;
  let sceneModeHandler = null;
  const frame = {
    attrs: {},
    setAttribute(name, value) { this.attrs[name] = value; },
    getAttribute(name) { return this.attrs[name] || null; },
    getBoundingClientRect() { return { width: 420, height: 240, left: 0, top: 0 }; },
    addEventListener(type, handler) {
      if (type === 'tp:scene-mode') sceneModeHandler = handler;
    }
  };
  const logo = { style: {}, textContent: '' };
  const sandbox = {
    console,
    Math,
    JSON,
    performance: { now: () => 0 },
    document: {
      getElementById(id) {
        if (id === 'penguin-stage') return frame;
        return null;
      },
      querySelector(selector) {
        if (selector.includes('penguin-fallback')) return logo;
        return null;
      },
      addEventListener() {}
    }
  };
  sandbox.window = sandbox;
  sandbox.window.innerWidth = 1280;
  sandbox.window.innerHeight = 800;
  sandbox.window.matchMedia = () => ({ matches: false });
  sandbox.window.addEventListener = () => {};
  sandbox.window.requestAnimationFrame = (callback) => { queuedFrame = callback; return 1; };
  sandbox.window.cancelAnimationFrame = () => { queuedFrame = null; };
  sandbox.window.TP = {};
  sandbox.TP = sandbox.window.TP;

  vm.createContext(sandbox);
  vm.runInContext(neofetch, sandbox);
  sandbox.TP.neofetch.init();

  const staticArt = logo.textContent;
  assert.match(staticArt, /o o/, 'friendly eyes are legible');
  assert.match(staticArt, />/, 'wide beak is legible');
  assert.match(staticArt, /-----/, 'belly is legible');
  assert.ok(staticArt.includes('/_\\'), 'webbed feet are legible');
  assert.equal(queuedFrame, null, 'no fallback RAF loop is scheduled');
  // Fixed 4px typography, independent of the container width (the slider is gone).
  assert.equal(logo.style.fontSize, '4px', 'the fallback is rendered at 4px');
  assert.equal(sandbox.TP.neofetch.getState().fontPx, 4, 'the reported font size is 4px');
  assert.equal(sandbox.TP.neofetch.computeFallbackGrid(320, 200).fontPx, 4);
  assert.equal(sandbox.TP.neofetch.computeFallbackGrid(1280, 720).fontPx, 4);
  assert.equal(sandbox.TP.neofetch.getState().autoSpin, false);
  assert.equal(frame.getAttribute('data-auto-spin'), 'false');

  // API compatibility: yaw can be recorded, but the placeholder never re-renders.
  sandbox.TP.neofetch.setYaw(1.2);
  assert.equal(sandbox.TP.neofetch.getState().yaw, 1.2);
  assert.equal(logo.textContent, staticArt, 'static art does not react to setYaw');

  // Engine ready: the fallback is left untouched and no animation loop is started.
  assert.equal(typeof sceneModeHandler, 'function');
  sceneModeHandler({ detail: { mode: 'engine' } });
  assert.equal(sandbox.TP.neofetch.getState().engineActive, true);
  assert.equal(logo.textContent, staticArt);
  assert.equal(queuedFrame, null);

  // Engine failure: the same static art remains as a safe fallback.
  sceneModeHandler({ detail: { mode: 'fallback' } });
  assert.equal(sandbox.TP.neofetch.getState().engineActive, false);
  assert.equal(logo.textContent, staticArt);
  assert.equal(queuedFrame, null);

  assert.equal(sandbox.TP.neofetch.getState().pitch, undefined, 'no pitch state remains');
  assert.doesNotMatch(neofetch, /requestAnimationFrame|AUTO_SPIN_RAD_PER_SEC|state\.yaw \+=/);
  assert.doesNotMatch(neofetch, /angleBadge|neofetch-penguin-telemetry|state\.pitch/);
});

test('engine mascot rotation is pointer-free and single-instance', () => {
  includesAll(adapter, [
    "getObjectByName('TuxMascotRoot')",
    "group.name = 'TuxAutoSpin'",
    'data-pointer-locked',
    'getScene'
  ]);
  assert.doesNotMatch(adapter, /fromPointer|targetYaw|targetPitch|mascotPointerBlockers|stopImmediatePropagation/);
  assert.match(css, /#penguin-stage[^}]*pointer-events: none/s);
});
