/* Lightweight i18n layer: pt-br is primary, en is a fast client-side switch.
   Dictionaries are also embedded so file:// works when fetch() is blocked. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var BUNDLED = {
  "pt-br": {
    "skip": "Pular para o conteúdo",
    "nav.sections": "Seções",
    "nav.pipeline": "01 pipeline",
    "nav.apis": "02 APIs",
    "nav.scene": "03 scene",
    "nav.console": "04 console",
    "lang.switchToEn": "[ en ]",
    "lang.switchToPt": "[ pt-br ]",
    "lang.label": "Idioma",
    "hero.heading": "ERON // DEV — Eron Yamamoto D. Justina",
    "hero.role": "Engenheiro de Software Backend, Dados & Automação | Python • Linux • APIs REST • CI/CD | Inglês Fluente",
    "hero.portraitAlt": "Retrato em arte ASCII de Eron Yamamoto com casaco escuro sobre fundo preto.",
    "hero.location": "Paranavaí, PR · Remoto / LATAM · yamah1337@gmail.com",
    "actions.aria": "Ações",
    "actions.cvPt": "[ curriculo-pt-br ]",
    "actions.cvEn": "[ curriculo-en ]",
    "actions.github": "[github]",
    "actions.linkedin": "[ --linkedin ]",
    "actions.contact": "[ --contact ]",
    "pipeline.title": "[ LIVE CI/CD & DOCKER PIPELINE SIMULATOR ]",
    "pipeline.badge": "SANDBOX",
    "pipeline.hint": "Clique para ver os quatro estágios. O modo \"--force\" falha de propósito no Step 1 e abre a análise de causa raiz.",
    "pipeline.success": "> git push origin main",
    "pipeline.failure": "> git push --force (simulate bug)",
    "pipeline.waiting": "$ waiting for git push...",
    "pipeline.rca": "[ > run N3 Root Cause Analysis (RCA) ]",
    "tabs.aria": "Projetos",
    "tabs.etl": "ETL & Web Scraping",
    "tabs.fintech": "Fintech & Tax API",
    "tabs.workflow": "n8n & AI Workflows",
    "etl.hint": "Consulta real ao backend FastAPI: datasets ETL carregados do ledger.csv e normalizados.",
    "etl.button": "GET /api/v1/etl/datasets/ledger/summary",
    "gateway.hint": "Gateway fiscal real: o backend assina o payload no servidor e valida HMAC, esquema e idempotência.",
    "gateway.button": "POST /api/v1/gateway/invoices/submit",
    "workflow.hint": "Orquestração real com n8n via webhook autenticado. Informe um X-API-Key válido para disparar ou consultar.",
    "workflow.diagramAria": "Diagrama: Webhook para Python Worker, LLM/IA e SQL Database.",
    "workflow.note": "Webhooks disparam o worker; o resultado validado é gravado no banco.",
    "workflow.token": "X-API-Key (token do backend)",
    "workflow.run": "POST /run",
    "workflow.status": "GET /status",
    "workflow.needToken": "// informe o X-API-Key para chamar o n8n",
    "api.waiting": "// aguardando requisição",
    "api.placeholder": "// resposta aparecerá aqui",
    "api.status": "HTTP {status} · {ms} ms · {source}",
    "api.offline": "// backend indisponível: {detail}",
    "scene.hint": "Palco do motor ASCII 3D. Se WebGL não estiver disponível, o fallback estático permanece.",
    "scene.aria": "Cena decorativa em ASCII com um terminal, uma colina e um barramento de dados.",
    "scene.presetLabel": "Modos do cenário",
    "scene.day": "[ Dia ]",
    "scene.night": "[ Noite ]",
    "scene.rain": "[ Com chuva ]",
    "scene.presetHelp": "// mouse/toque rotacionam a câmera; scroll continua livre",
    "scene.fallbackHelp": "// controles ativam quando o motor estiver disponível",
    "scene.pause": "[ pause ]",
    "scene.resume": "[ resume ]",
    "specs.user": "User",
    "specs.os": "OS",
    "specs.languages": "Languages",
    "specs.devops": "DevOps",
    "specs.data": "Data & AI",
    "specs.certifications": "Certifications",
    "specs.education": "Education",
    "console.title": "[ INTERACTIVE CONSOLE ]",
    "console.statusSim": "API OFFLINE",
    "console.statusApi": "API ONLINE",
    "console.audioOn": "[ audio: on ]",
    "console.audioOff": "[ audio: off ]",
    "console.hint": "Comandos: help, skills, experience, projects, contact, cv, clear.",
    "console.ready": "terminal ready. Digite help para começar.",
    "console.prompt": "eron@production:~$",
    "console.enter": "[ enter ]",
    "console.githubTodo": "[ TODO ] GitHub ainda não informado pelo Eron.",
    "console.githubDetail": "Envie o username para adicionar o link real aqui.",
    "brightness.label": "Brilho da página",
    "footer.note": "// no trackers · no analytics · self-hosted fonts",
    "scene.engineHelp": "// motor WebGL2 3D conectado · mouse/toque controlam câmera e reflexo na água",
    "scene.fullscreen": "[ tela cheia ]",
    "scene.exitFullscreen": "[ sair da tela cheia ]",
    "scene.fullscreenAria": "Ampliar a seção ASCII REALMS",
    "scene.exitFullscreenAria": "Restaurar a seção ASCII REALMS"
  },
  "en": {
    "skip": "Skip to content",
    "nav.sections": "Sections",
    "nav.pipeline": "01 pipeline",
    "nav.apis": "02 APIs",
    "nav.scene": "03 scene",
    "nav.console": "04 console",
    "lang.switchToEn": "[ en ]",
    "lang.switchToPt": "[ pt-br ]",
    "lang.label": "Language",
    "hero.heading": "ERON // DEV — Eron Yamamoto D. Justina",
    "hero.role": "Backend, Data & Automation Engineer | Python • Linux • REST APIs • CI/CD | Fluent English",
    "hero.portraitAlt": "ASCII-art portrait of Eron Yamamoto in a dark coat against a black background.",
    "hero.location": "Paranavaí, PR · Remote / LATAM · yamah1337@gmail.com",
    "actions.aria": "Actions",
    "actions.cvPt": "[ curriculo-pt-br ]",
    "actions.cvEn": "[ curriculo-en ]",
    "actions.github": "[github]",
    "actions.linkedin": "[ --linkedin ]",
    "actions.contact": "[ --contact ]",
    "pipeline.title": "[ LIVE CI/CD & DOCKER PIPELINE SIMULATOR ]",
    "pipeline.badge": "SANDBOX",
    "pipeline.hint": "Click to see the four stages. \"--force\" deliberately fails at Step 1 and opens the root cause analysis.",
    "pipeline.success": "> git push origin main",
    "pipeline.failure": "> git push --force (simulate bug)",
    "pipeline.waiting": "$ waiting for git push...",
    "pipeline.rca": "[ > run N3 Root Cause Analysis (RCA) ]",
    "tabs.aria": "Projects",
    "tabs.etl": "ETL & Web Scraping",
    "tabs.fintech": "Fintech & Tax API",
    "tabs.workflow": "n8n & AI Workflows",
    "etl.hint": "Live FastAPI backend call: ETL datasets loaded from ledger.csv and normalized.",
    "etl.button": "GET /api/v1/etl/datasets/ledger/summary",
    "gateway.hint": "Real fiscal gateway: the backend signs the payload server-side and validates HMAC, schema and idempotency.",
    "gateway.button": "POST /api/v1/gateway/invoices/submit",
    "workflow.hint": "Real n8n orchestration through an authenticated webhook. Provide a valid X-API-Key to trigger or query.",
    "workflow.diagramAria": "Diagram: Webhook to Python Worker, LLM/AI and SQL Database.",
    "workflow.note": "Webhooks trigger the worker; validated results are stored in the database.",
    "workflow.token": "X-API-Key (backend token)",
    "workflow.run": "POST /run",
    "workflow.status": "GET /status",
    "workflow.needToken": "// enter the X-API-Key to call n8n",
    "api.waiting": "// waiting for request",
    "api.placeholder": "// response will appear here",
    "api.status": "HTTP {status} · {ms} ms · {source}",
    "api.offline": "// backend unavailable: {detail}",
    "scene.hint": "ASCII 3D engine stage. If WebGL is unavailable, the static fallback remains.",
    "scene.aria": "Decorative ASCII scene with a terminal, a hill and a data bus.",
    "scene.presetLabel": "Scene modes",
    "scene.day": "[ Day ]",
    "scene.night": "[ Night ]",
    "scene.rain": "[ Rain ]",
    "scene.presetHelp": "// mouse/touch rotate the camera; scrolling stays free",
    "scene.fallbackHelp": "// controls enable when the engine is available",
    "scene.pause": "[ pause ]",
    "scene.resume": "[ resume ]",
    "specs.user": "User",
    "specs.os": "OS",
    "specs.languages": "Languages",
    "specs.devops": "DevOps",
    "specs.data": "Data & AI",
    "specs.certifications": "Certifications",
    "specs.education": "Education",
    "console.title": "[ INTERACTIVE CONSOLE ]",
    "console.statusSim": "API OFFLINE",
    "console.statusApi": "API ONLINE",
    "console.audioOn": "[ audio: on ]",
    "console.audioOff": "[ audio: off ]",
    "console.hint": "Commands: help, skills, experience, projects, contact, cv, clear.",
    "console.ready": "terminal ready. Type help to begin.",
    "console.prompt": "eron@production:~$",
    "console.enter": "[ enter ]",
    "console.githubTodo": "[ TODO ] GitHub username not provided by Eron yet.",
    "console.githubDetail": "Send the username to add the real link here.",
    "brightness.label": "Page brightness",
    "footer.note": "// no trackers · no analytics · self-hosted fonts",
    "scene.engineHelp": "// WebGL2 3D engine online · mouse/touch control camera and water reflections",
    "scene.fullscreen": "[ fullscreen ]",
    "scene.exitFullscreen": "[ exit fullscreen ]",
    "scene.fullscreenAria": "Expand the ASCII REALMS section",
    "scene.exitFullscreenAria": "Restore the ASCII REALMS section"
  }
};
  var STORAGE_KEY = 'ancientstudio.lang';
  var current = 'pt-br';
  var dictionary = BUNDLED['pt-br'];
  var ready = false;

  function normalize(lang) {
    var value = String(lang || '').toLowerCase();
    return value.indexOf('en') === 0 ? 'en' : 'pt-br';
  }

  function lookup(lang) {
    return (TP.i18n.dictionaries && TP.i18n.dictionaries[lang]) || BUNDLED[lang] || BUNDLED['pt-br'];
  }

  function translate(key, vars) {
    var text = dictionary[key];
    if (text === undefined) text = BUNDLED['pt-br'][key] || key;
    if (!vars) return text;
    return String(text).replace(/\{(\w+)\}/g, function (_, name) {
      return vars[name] === undefined ? '{' + name + '}' : String(vars[name]);
    });
  }

  function applyAttributes(element, spec) {
    String(spec || '').split(',').forEach(function (pair) {
      var parts = pair.split(':');
      if (parts.length !== 2) return;
      var attribute = parts[0].trim();
      var value = translate(parts[1].trim());
      element.setAttribute(attribute, value);
    });
  }

  function apply() {
    document.documentElement.lang = current === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = translate(node.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (node) {
      applyAttributes(node, node.getAttribute('data-i18n-attr'));
    });
    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.textContent = current === 'pt-br' ? translate('lang.switchToEn') : translate('lang.switchToPt');
    }
    window.dispatchEvent(new CustomEvent('tp:languagechange', {
      detail: { language: current, t: translate }
    }));
  }

  function persist(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (error) { /* storage optional */ }
  }

  function saved() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (error) { return null; }
  }

  function setLanguage(lang) {
    current = normalize(lang);
    dictionary = lookup(current);
    persist(current);
    apply();
    return current;
  }

  function loadDictionary(lang) {
    if (window.location.protocol === 'file:') return Promise.resolve(lookup(lang));
    return fetch('assets/i18n/' + lang + '.json', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .catch(function () { return lookup(lang); });
  }

  function init() {
    if (ready) return Promise.resolve(current);
    ready = true;
    var stored = saved();
    var initial = normalize(stored || 'pt-br');
    return loadDictionary(initial).then(function (data) {
      TP.i18n.dictionaries[initial] = data;
      dictionary = lookup(initial);
      current = initial;
      // The HTML already ships the pt-br strings: repainting them on first load
      // would delay LCP for no benefit. Only re-apply for en or a saved choice.
      if (stored && normalize(stored) !== 'pt-br') apply();
      return current;
    });
  }

  TP.i18n = {
    dictionaries: {},
    init: init,
    setLanguage: setLanguage,
    getLanguage: function () { return current; },
    t: translate
  };

  function bindToggle() {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle || toggle.dataset.bound === 'true') return;
    toggle.dataset.bound = 'true';
    toggle.addEventListener('click', function () {
      setLanguage(current === 'pt-br' ? 'en' : 'pt-br');
    });
  }

  TP.i18n.bindToggle = bindToggle;
  window.addEventListener('DOMContentLoaded', bindToggle);
})(window.TP);
