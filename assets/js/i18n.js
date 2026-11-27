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
    "nav.apis": "02 gateway",
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
    "actions.github": "[ github ]",
    "actions.linkedin": "[ linkedin ]",
    "actions.contact": "[ contato ]",
    "pipeline.title": "[ LIVE CI/CD & DOCKER PIPELINE ]",
    "pipeline.badge": "GITHUB ACTIONS",
    "pipeline.hint": "Execuções reais de yamamotin/AncientStudio lidas da API pública do GitHub Actions: somente leitura, sem token e com cache de 5 minutos.",
    "tabs.aria": "Integrações",
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
    "footer.note": "// no trackers · no analytics · self-hosted fonts",
    "scene.engineHelp": "// motor WebGL2 3D conectado · mouse/toque controlam câmera e reflexo na água",
    "scene.fullscreen": "[ tela cheia ]",
    "scene.exitFullscreen": "[ sair da tela cheia ]",
    "scene.fullscreenAria": "Ampliar a seção Cena 3D Interativa",
    "scene.exitFullscreenAria": "Restaurar a seção Cena 3D Interativa",
    "scene.day": "[ Dia ]",
    "scene.night": "[ Noite ]",
    "scene.rain": "[ Com chuva ]",
    "brightness.label": "Brilho da página",
    "pipeline.refresh": "[ atualizar ]",
    "pipeline.openActions": "[ abrir actions ]",
    "pipeline.loading": "// carregando execuções públicas do GitHub Actions…",
    "pipeline.loaded": "// {count} execuções · atualizado às {time} UTC",
    "pipeline.quota": "// cota da API pública: {remaining} restantes (redefine às {time} UTC)",
    "pipeline.cached": "// dados em cache ({age}s) — a API pública não respondeu",
    "pipeline.rateLimit": "// limite da API pública atingido; nova consulta após {time} UTC. O link do Actions continua disponível.",
    "pipeline.offline": "// API pública indisponível ({detail}); o link do Actions continua disponível.",
    "pipeline.empty": "// nenhuma execução pública encontrada",
    "pipeline.runLink": "[ abrir run ]",
    "pipeline.docsSummary": "[ documentação técnica ]",
    "pipeline.doc.archTitle": "Arquitetura real dos workflows",
    "pipeline.doc.archCi": "ci.yml — CI — Backend, ASCII 3D Engine & Portfolio Integrity: typecheck, build do bundle ASCII, contrato do engine, node --test e unittest do backend.",
    "pipeline.doc.archCicd": "ci-cd.yml — Ruff + pytest no backend, build da imagem Docker e deploy de produção na Vercel.",
    "pipeline.doc.archPages": "pages.yml — publicação estática no GitHub Pages com verificação de paridade (não bloqueante) entre Pages e Vercel.",
    "pipeline.doc.archVcr": "vcr-cleanup.yml — retenção das 3 imagens mais recentes dockerfile no Vercel Container Registry, com modo dry_run.",
    "pipeline.doc.frontTitle": "Como o frontend consome os dados",
    "pipeline.doc.frontApi": "Duas chamadas GET públicas: /actions/runs (até 6 execuções) e /actions/workflows (nomes e paths), sem autenticação.",
    "pipeline.doc.frontCache": "Cache de 5 minutos em localStorage (memória por fallback) e AbortController com timeout de 8 s por requisição.",
    "pipeline.doc.frontFallback": "Em falha ou rate-limit o painel mantém os últimos dados e exibe aviso com link direto para o Actions.",
    "pipeline.doc.securityTitle": "Controles de segurança no cliente",
    "pipeline.doc.securityDom": "Somente createElement + textContent; nenhum innerHTML com dado externo, com limite de tamanho e remoção de caracteres de controle.",
    "pipeline.doc.securityUrl": "href aceito apenas para https://github.com/yamamotin/AncientStudio/actions/runs/<id>; links externos com rel=\"noopener noreferrer\".",
    "pipeline.doc.securitySecrets": "Zero segredos: nenhum token em JS, credentials: 'omit' e nenhum header Authorization.",
    "pipeline.doc.securityCsp": "CSP restritiva via meta http-equiv, com connect-src limitado a 'self' e https://api.github.com.",
    "pipeline.doc.securityFlood": "Botão de atualizar bloqueado durante a requisição e cooldown de 4 s contra clique duplo ou flood.",
    "pipeline.doc.reference": "Referência completa: docs/ci-cd-pipeline.md",
    "gateway.title": "[ API GATEWAY // INTEGRAÇÕES ]",
    "scene.title": "[ CENA 3D INTERATIVA ]",
    "workflow.tokenHygiene": "// a chave fica apenas na memória desta aba e é apagada ao sair"
  },
  "en": {
    "skip": "Skip to content",
    "nav.sections": "Sections",
    "nav.pipeline": "01 pipeline",
    "nav.apis": "02 gateway",
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
    "actions.cvPt": "[ resume-pt-br ]",
    "actions.cvEn": "[ resume-en ]",
    "actions.github": "[ github ]",
    "actions.linkedin": "[ linkedin ]",
    "actions.contact": "[ contact ]",
    "pipeline.title": "[ LIVE CI/CD & DOCKER PIPELINE ]",
    "pipeline.badge": "GITHUB ACTIONS",
    "pipeline.hint": "Live yamamotin/AncientStudio runs read from the public GitHub Actions API: read-only, token-free and cached for 5 minutes.",
    "tabs.aria": "Integrations",
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
    "footer.note": "// no trackers · no analytics · self-hosted fonts",
    "scene.engineHelp": "// WebGL2 3D engine online · mouse/touch control camera and water reflections",
    "scene.fullscreen": "[ fullscreen ]",
    "scene.exitFullscreen": "[ exit fullscreen ]",
    "scene.fullscreenAria": "Expand the Interactive Scene 3D section",
    "scene.exitFullscreenAria": "Restore the Interactive Scene 3D section",
    "scene.day": "[ Day ]",
    "scene.night": "[ Night ]",
    "scene.rain": "[ Rain ]",
    "brightness.label": "Page brightness",
    "pipeline.refresh": "[ refresh ]",
    "pipeline.openActions": "[ open actions ]",
    "pipeline.loading": "// loading public GitHub Actions runs…",
    "pipeline.loaded": "// {count} runs · updated {time} UTC",
    "pipeline.quota": "// public API quota: {remaining} left (resets {time} UTC)",
    "pipeline.cached": "// cached data ({age}s) — the public API did not respond",
    "pipeline.rateLimit": "// public API rate limit reached; next query after {time} UTC. The Actions link still works.",
    "pipeline.offline": "// public API unavailable ({detail}); the Actions link still works.",
    "pipeline.empty": "// no public run found",
    "pipeline.runLink": "[ open run ]",
    "pipeline.docsSummary": "[ technical documentation ]",
    "pipeline.doc.archTitle": "Real workflow architecture",
    "pipeline.doc.archCi": "ci.yml — CI — Backend, ASCII 3D Engine & Portfolio Integrity: typecheck, ASCII bundle build, engine contract, node --test and backend unittest.",
    "pipeline.doc.archCicd": "ci-cd.yml — ruff + pytest on the backend, Docker image build and production deploy on Vercel.",
    "pipeline.doc.archPages": "pages.yml — static publishing to GitHub Pages with a non-blocking Pages/Vercel parity check.",
    "pipeline.doc.archVcr": "vcr-cleanup.yml — retains the 3 most recent dockerfile images in the Vercel Container Registry, with a dry_run mode.",
    "pipeline.doc.frontTitle": "How the frontend consumes the data",
    "pipeline.doc.frontApi": "Two public GET calls: /actions/runs (up to 6 runs) and /actions/workflows (names and paths), unauthenticated.",
    "pipeline.doc.frontCache": "Five-minute localStorage cache (memory fallback) and AbortController with an 8 s timeout per request.",
    "pipeline.doc.frontFallback": "On failure or rate limit the panel keeps the last data and shows a notice with a direct Actions link.",
    "pipeline.doc.securityTitle": "Client-side security controls",
    "pipeline.doc.securityDom": "createElement + textContent only; no innerHTML with external data, plus length caps and control-character stripping.",
    "pipeline.doc.securityUrl": "href accepted only for https://github.com/yamamotin/AncientStudio/actions/runs/<id>; external links use rel=\"noopener noreferrer\".",
    "pipeline.doc.securitySecrets": "Zero secrets: no token in JS, credentials: 'omit' and no Authorization header.",
    "pipeline.doc.securityCsp": "Strict CSP via meta http-equiv, with connect-src limited to 'self' and https://api.github.com.",
    "pipeline.doc.securityFlood": "Refresh button locked while the request is in flight plus a 4 s cooldown against double click or flood.",
    "pipeline.doc.reference": "Full reference: docs/ci-cd-pipeline.md",
    "gateway.title": "[ API GATEWAY // INTEGRATIONS ]",
    "scene.title": "[ INTERACTIVE SCENE 3D ]",
    "workflow.tokenHygiene": "// the key lives only in this tab memory and is wiped on exit"
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
    var Controller = window.AbortController;
    var controller = typeof Controller === 'function' ? new Controller() : null;
    if (controller) window.setTimeout(function () { controller.abort(); }, 4000);
    return fetch('assets/i18n/' + lang + '.json', {
      cache: 'no-store',
      signal: controller ? controller.signal : undefined
    })
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
