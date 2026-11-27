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
    "actions.github": "[ github ]",
    "actions.linkedin": "[ linkedin ]",
    "actions.contact": "[ contato ]",
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
    "etl.hint": "Conectores públicos de dados e ETL: consulta municipal IBGE/TSE, triagem pública PROJUDI (LGPD) e normalização contábil, com fallback automático em hospedagem estática.",
    "etl.municipioTitle": "IBGE + TSE // Governança Pública Municipal",
    "etl.cidadeLabel": "Município",
    "etl.ufLabel": "UF",
    "etl.municipioButton": "GET /api/v1/transparencia/municipio",
    "etl.projudiTitle": "PROJUDI // Consulta Processual Pública (LGPD)",
    "etl.cpfLabel": "CPF (validação mod-11)",
    "etl.tribunalLabel": "Tribunal",
    "etl.processoLabel": "Processo CNJ (20 dígitos)",
    "etl.projudiConsultaBtn": "POST /api/v1/projudi/processos/consulta",
    "etl.projudiDetalheBtn": "GET /api/v1/projudi/processos/{numero}",
    "etl.button": "GET /api/v1/etl/datasets/ledger/summary",
    "gateway.hint": "APIs Financeiras e Tributárias: séries oficiais BCB SGS (Selic, IPCA, PTAX), instituições PIX/ISPB, tabela NCM do Portal Único Siscomex sem acentos e gateway fiscal idempotente.",
    "fintech.bcbTitle": "Banco Central // Séries SGS & Instituições PIX",
    "fintech.ultimosLabel": "Períodos SGS",
    "fintech.buscaLabel": "Instituição ou ISPB",
    "fintech.bcbIndicadoresBtn": "GET /api/v1/bcb/indicadores",
    "fintech.bcbInstituicoesBtn": "GET /api/v1/bcb/instituicoes",
    "fintech.siscomexTitle": "Portal Único Siscomex // Classificação NCM & Fiscal",
    "fintech.ncmLabel": "Descrição do produto ou código NCM",
    "fintech.siscomexBtn": "GET /api/v1/siscomex/ncm",
    "gateway.button": "POST /api/v1/gateway/invoices/submit",
    "workflow.hint": "Pipelines de IA & Automação n8n: extração determinística de fases/métricas processuais pronta para LLM (ready_for_llm) e disparo autenticado de webhooks n8n.",
    "workflow.diagramAria": "Diagrama: Webhook para Python Worker, LLM/IA e SQL Database.",
    "workflow.resumoTitle": "PROJUDI + IA // Triagem Determinística & Resumo LLM",
    "workflow.resumoProcessoLabel": "Processo CNJ",
    "workflow.resumoTextoLabel": "Texto / Movimentação para triagem",
    "workflow.resumoBtn": "POST /api/v1/projudi/processos/{numero}/resumo",
    "workflow.n8nTitle": "n8n // Orquestração Autenticada (X-API-Key)",
    "workflow.note": "Webhooks disparam o worker; o resultado validado é gravado no banco.",
    "workflow.token": "X-API-Key (token do backend)",
    "workflow.run": "POST /run",
    "workflow.status": "GET /status",
    "workflow.needToken": "// informe o X-API-Key para chamar o n8n",
    "api.waiting": "// aguardando requisição",
    "api.placeholder": "// resposta aparecerá aqui",
    "api.status": "HTTP {status} · {ms} ms · {source}",
    "api.routeStatus": "{method} {route} · HTTP {status} · {ms} ms · {source}",
    "api.offline": "// backend indisponível: {detail}",
    "scene.hint": "Palco do motor ASCII 3D. Se WebGL não estiver disponível, o fallback estático permanece.",
    "scene.aria": "Cena decorativa em ASCII com um terminal, uma colina e um barramento de dados.",
    "scene.presetLabel": "Modos do cenário",
    "scene.presetHelp": "// WASD ou clique/toque move o personagem · E interage · scroll livre",
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
    "scene.engineHelp": "// motor WebGL2 3D conectado · WASD move · E interage",
    "scene.fullscreen": "[ tela cheia ]",
    "scene.exitFullscreen": "[ sair da tela cheia ]",
    "scene.fullscreenAria": "Ampliar a seção ASCII REALMS",
    "scene.exitFullscreenAria": "Restaurar a seção ASCII REALMS",
    "scene.day": "[ Dia ]",
    "scene.night": "[ Noite ]",
    "scene.rain": "[ Com chuva ]",
    "brightness.label": "Brilho da página"
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
    "actions.cvPt": "[ resume-pt-br ]",
    "actions.cvEn": "[ resume-en ]",
    "actions.github": "[ github ]",
    "actions.linkedin": "[ linkedin ]",
    "actions.contact": "[ contact ]",
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
    "etl.hint": "Public data & ETL connectors: IBGE/TSE municipal governance lookup, LGPD-masked PROJUDI public screening, and ledger normalization, with automatic static-host fallback.",
    "etl.municipioTitle": "IBGE + TSE // Municipal Public Governance",
    "etl.cidadeLabel": "Municipality",
    "etl.ufLabel": "State (UF)",
    "etl.municipioButton": "GET /api/v1/transparencia/municipio",
    "etl.projudiTitle": "PROJUDI // Public Case Inquiry (LGPD)",
    "etl.cpfLabel": "CPF (mod-11 check)",
    "etl.tribunalLabel": "Court",
    "etl.processoLabel": "CNJ Case Number (20 digits)",
    "etl.projudiConsultaBtn": "POST /api/v1/projudi/processos/consulta",
    "etl.projudiDetalheBtn": "GET /api/v1/projudi/processos/{numero}",
    "etl.button": "GET /api/v1/etl/datasets/ledger/summary",
    "gateway.hint": "Fintech & Tax APIs: official BCB SGS series (Selic, IPCA, PTAX), PIX/ISPB directory, accent-insensitive Siscomex NCM nomenclature search, and idempotent fiscal gateway.",
    "fintech.bcbTitle": "Central Bank // SGS Series & PIX Institutions",
    "fintech.ultimosLabel": "SGS Periods",
    "fintech.buscaLabel": "Institution or ISPB",
    "fintech.bcbIndicadoresBtn": "GET /api/v1/bcb/indicadores",
    "fintech.bcbInstituicoesBtn": "GET /api/v1/bcb/instituicoes",
    "fintech.siscomexTitle": "Siscomex Single Portal // NCM & Fiscal Classification",
    "fintech.ncmLabel": "Product description or NCM code",
    "fintech.siscomexBtn": "GET /api/v1/siscomex/ncm",
    "gateway.button": "POST /api/v1/gateway/invoices/submit",
    "workflow.hint": "AI Pipelines & n8n Automation: deterministic case phase/metrics extraction ready for LLM (ready_for_llm) and authenticated n8n webhook dispatch.",
    "workflow.diagramAria": "Diagram: Webhook to Python Worker, LLM/AI and SQL Database.",
    "workflow.resumoTitle": "PROJUDI + AI // Deterministic Triage & LLM Summary",
    "workflow.resumoProcessoLabel": "CNJ Case Number",
    "workflow.resumoTextoLabel": "Case text / movement for triage",
    "workflow.resumoBtn": "POST /api/v1/projudi/processos/{numero}/resumo",
    "workflow.n8nTitle": "n8n // Authenticated Orchestration (X-API-Key)",
    "workflow.note": "Webhooks trigger the worker; validated results are stored in the database.",
    "workflow.token": "X-API-Key (backend token)",
    "workflow.run": "POST /run",
    "workflow.status": "GET /status",
    "workflow.needToken": "// enter the X-API-Key to call n8n",
    "api.waiting": "// waiting for request",
    "api.placeholder": "// response will appear here",
    "api.status": "HTTP {status} · {ms} ms · {source}",
    "api.routeStatus": "{method} {route} · HTTP {status} · {ms} ms · {source}",
    "api.offline": "// backend unavailable: {detail}",
    "scene.hint": "ASCII 3D engine stage. If WebGL is unavailable, the static fallback remains.",
    "scene.aria": "Decorative ASCII scene with a terminal, a hill and a data bus.",
    "scene.presetLabel": "Scene modes",
    "scene.presetHelp": "// WASD or click/tap moves the character · E interacts · scroll stays free",
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
    "scene.engineHelp": "// WebGL2 3D engine online · WASD moves · E interacts",
    "scene.fullscreen": "[ fullscreen ]",
    "scene.exitFullscreen": "[ exit fullscreen ]",
    "scene.fullscreenAria": "Expand the ASCII REALMS section",
    "scene.exitFullscreenAria": "Restore the ASCII REALMS section",
    "scene.day": "[ Day ]",
    "scene.night": "[ Night ]",
    "scene.rain": "[ Rain ]",
    "brightness.label": "Page brightness"
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
