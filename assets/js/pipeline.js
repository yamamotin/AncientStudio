/* Live CI/CD & Docker pipeline panel.
   Reads the public, read-only GitHub Actions metadata of yamamotin/AncientStudio
   (https://api.github.com/repos/.../actions/runs and /actions/workflows).

   Security posture of this file:
   - no credentials of any kind (no token, no Authorization header, credentials: 'omit');
   - every external value is coerced to a bounded string and rendered with
     createElement + textContent; innerHTML is never used with external data;
   - links are only accepted when they match the strict action-run allowlist;
   - every request is time-boxed with AbortController;
   - one in-flight request and a cooldown guard against double click/flood;
   - results are cached (5 min) and a stale cache is preferred over a blank panel. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var OWNER = 'yamamotin';
  var REPO = 'AncientStudio';
  var API_ROOT = 'https://api.github.com/repos/' + OWNER + '/' + REPO;
  var RUNS_URL = API_ROOT + '/actions/runs?per_page=6';
  var WORKFLOWS_URL = API_ROOT + '/actions/workflows';
  var ACTIONS_PAGE = 'https://github.com/' + OWNER + '/' + REPO + '/actions';
  var RUN_URL_PATTERN = /^https:\/\/github\.com\/yamamotin\/AncientStudio\/actions\/runs\/\d{1,20}$/;

  var CACHE_KEY = 'tp.gh-actions.v1';
  var CACHE_TTL = 300000;        // 5 minutes of fresh data
  var WORKFLOWS_TTL = 86400000;  // workflow names change rarely
  var REQUEST_TIMEOUT = 8000;
  var REFRESH_COOLDOWN = 4000;
  var MAX_RUNS = 6;
  var MAX_TEXT = 96;

  var elements = {};
  var state = {
    runs: [],
    workflows: [],
    fetchedAt: 0,
    lastAttempt: 0,
    remaining: null,
    resetAt: null,
    stale: false,
    loading: false
  };

  function t(key, vars) {
    return TP.i18n ? TP.i18n.t(key, vars) : key;
  }

  /* Coerce any external value into a bounded, control-character-free string. */
  function text(value, max) {
    if (value === null || value === undefined) return '';
    var limit = max || MAX_TEXT;
    var clean = String(value)
      .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return clean.length > limit ? clean.slice(0, limit) + '…' : clean;
  }

  function isoTimestamp(value) {
    var candidate = String(value || '');
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(candidate) ? candidate : '';
  }

  /* Strict allowlist: the only href this panel may ever assign. */
  function safeRunUrl(value) {
    var url = String(value || '');
    return RUN_URL_PATTERN.test(url) ? url : '';
  }

  function positiveInteger(value) {
    var number = typeof value === 'number' ? value : Number(value);
    return isFinite(number) && number > 0 ? Math.floor(number) : 0;
  }

  function sanitizeRun(raw) {
    if (!raw || typeof raw !== 'object') return null;

    var name = text(raw.name || (raw.workflow && raw.workflow.name), 72);
    var url = safeRunUrl(raw.html_url);
    if (!name && !url) return null;

    var sha = String(raw.head_sha || '').toLowerCase();
    if (!/^[0-9a-f]{40}$/.test(sha) && !/^[0-9a-f]{7,39}$/.test(sha)) sha = '';

    var status = text(raw.status, 24).toLowerCase();
    if (!/^[a-z_]{3,24}$/.test(status)) status = 'unknown';

    var conclusion = raw.conclusion ? text(raw.conclusion, 24).toLowerCase() : '';
    if (conclusion && !/^[a-z_]{3,24}$/.test(conclusion)) conclusion = '';

    return {
      id: positiveInteger(raw.id),
      number: positiveInteger(raw.run_number),
      name: name || 'workflow',
      branch: text(raw.head_branch, 64) || '—',
      sha: sha,
      event: text(raw.event, 24),
      status: status,
      conclusion: conclusion,
      startedAt: isoTimestamp(raw.run_started_at || raw.created_at),
      updatedAt: isoTimestamp(raw.updated_at || raw.run_started_at),
      url: url
    };
  }

  function sanitizeRuns(payload) {
    var list = payload && Array.isArray(payload.workflow_runs) ? payload.workflow_runs : [];
    var runs = [];
    for (var i = 0; i < list.length && runs.length < MAX_RUNS; i += 1) {
      var run = sanitizeRun(list[i]);
      if (run) runs.push(run);
    }
    return runs;
  }

  function sanitizeWorkflows(payload) {
    var list = payload && Array.isArray(payload.workflows) ? payload.workflows : [];
    var workflows = [];
    for (var i = 0; i < list.length && workflows.length < 20; i += 1) {
      var item = list[i];
      if (!item || typeof item !== 'object') continue;
      var name = text(item.name, 72);
      var path = text(item.path, 96);
      if (!name) continue;
      workflows.push({
        name: name,
        path: /^[\w./-]{1,96}$/.test(path) ? path : '',
        state: /^[a-z_]{3,24}$/.test(String(item.state || '')) ? String(item.state) : ''
      });
    }
    return workflows;
  }

  function statusClass(run) {
    if (run.conclusion === 'success') return 'is-success';
    if (run.conclusion === 'failure' || run.conclusion === 'timed_out' || run.conclusion === 'startup_failure') {
      return 'is-failure';
    }
    if (run.status === 'in_progress' || run.status === 'queued' || run.status === 'requested' || run.status === 'waiting') {
      return 'is-running';
    }
    return 'is-neutral';
  }

  function formatTimestamp(iso) {
    if (!iso) return '—';
    return iso.slice(0, 16).replace('T', ' ') + ' UTC';
  }

  function formatDuration(startIso, endIso) {
    var start = Date.parse(startIso);
    var end = Date.parse(endIso);
    if (isNaN(start) || isNaN(end) || end < start) return '—';
    var seconds = Math.round((end - start) / 1000);
    if (seconds < 60) return seconds + 's';
    var minutes = Math.floor(seconds / 60);
    return minutes + 'm ' + (seconds % 60) + 's';
  }

  function formatClock(timestamp) {
    var date = new Date(timestamp);
    if (isNaN(date.getTime())) return '—';
    return date.toISOString().slice(11, 16);
  }

  function storage() {
    try {
      return window.localStorage || null;
    } catch (error) {
      return null;
    }
  }

  function readCache() {
    var store = storage();
    if (!store) return null;
    try {
      var parsed = JSON.parse(store.getItem(CACHE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.runs)) return null;
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function writeCache() {
    var store = storage();
    if (!store) return;
    try {
      store.setItem(CACHE_KEY, JSON.stringify({
        savedAt: state.fetchedAt,
        remaining: state.remaining,
        resetAt: state.resetAt,
        runs: state.runs,
        workflows: state.workflows
      }));
    } catch (error) {
      /* Storage is optional: memory keeps working. */
    }
  }

  function setStatus(message) {
    if (elements.status) elements.status.textContent = String(message || '');
  }

  function describeError(error) {
    if (!error) return 'unknown';
    if (error.name === 'AbortError') return 'timeout ' + REQUEST_TIMEOUT + 'ms';
    if (error.status) return 'HTTP ' + error.status;
    return text(error.message, 64) || 'network';
  }

  function statusMessage(kind, error) {
    var count = state.runs.length;
    if (kind === 'loading') return t('pipeline.loading');
    if (kind === 'loaded') {
      var message = t('pipeline.loaded', { count: count, time: formatClock(state.fetchedAt) });
      if (state.remaining !== null && state.remaining <= 10) {
        message += ' ' + t('pipeline.quota', {
          remaining: state.remaining,
          time: state.resetAt ? formatClock(state.resetAt * 1000) : '—'
        });
      }
      return message;
    }
    if (kind === 'cached') {
      var age = Math.max(1, Math.round((Date.now() - state.fetchedAt) / 1000));
      return t('pipeline.cached', { age: age });
    }
    if (kind === 'rateLimit') {
      return t('pipeline.rateLimit', {
        time: state.resetAt ? formatClock(state.resetAt * 1000) : '—'
      });
    }
    if (kind === 'empty') return t('pipeline.empty');
    return t('pipeline.offline', { detail: describeError(error) });
  }

  function renderEmpty() {
    if (!elements.list) return;
    elements.list.textContent = '';
    var item = document.createElement('li');
    item.className = 'run-empty';
    item.textContent = t('pipeline.empty');
    elements.list.appendChild(item);
  }

  function renderRuns() {
    if (!elements.list) return;
    elements.list.textContent = '';
    if (!state.runs.length) {
      renderEmpty();
      return;
    }

    state.runs.forEach(function (run) {
      var item = document.createElement('li');
      item.className = 'run-item';

      var head = document.createElement('div');
      head.className = 'run-head';

      var name = document.createElement('span');
      name.className = 'run-name';
      name.textContent = run.name;

      var pill = document.createElement('span');
      pill.className = 'status-pill ' + statusClass(run);
      pill.textContent = run.conclusion || run.status;

      head.appendChild(name);
      head.appendChild(pill);
      item.appendChild(head);

      var meta = document.createElement('p');
      meta.className = 'run-meta';
      var parts = [];
      if (run.number) parts.push('#' + run.number);
      parts.push(run.branch);
      if (run.sha) parts.push(run.sha.slice(0, 7));
      parts.push(formatDuration(run.startedAt, run.updatedAt));
      parts.push(formatTimestamp(run.updatedAt));
      meta.textContent = parts.join(' · ');
      item.appendChild(meta);

      var href = safeRunUrl(run.url);
      if (href) {
        var link = document.createElement('a');
        link.className = 'run-link';
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = t('pipeline.runLink');
        item.appendChild(link);
      }

      elements.list.appendChild(item);
    });
  }

  function render() {
    renderRuns();
  }

  function adoptCache(entry) {
    state.runs = sanitizeRuns({ workflow_runs: entry.runs });
    state.workflows = Array.isArray(entry.workflows) ? entry.workflows.slice(0, 20) : [];
    state.fetchedAt = positiveInteger(entry.savedAt);
    state.remaining = entry.remaining === null || entry.remaining === undefined ? null : positiveInteger(entry.remaining);
    state.resetAt = entry.resetAt ? positiveInteger(entry.resetAt) : null;
  }

  async function fetchJson(url) {
    if (typeof fetch !== 'function') {
      var unsupported = new Error('fetch unavailable');
      unsupported.status = 0;
      throw unsupported;
    }

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = null;
    if (controller) {
      timer = window.setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT);
    }

    try {
      // Public metadata only: credentials are explicitly omitted and no
      // Authorization header exists anywhere in this file.
      var response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        referrerPolicy: 'no-referrer',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        signal: controller ? controller.signal : undefined
      });

      var headers = response.headers;
      var remaining = headers && typeof headers.get === 'function' ? headers.get('x-ratelimit-remaining') : null;
      var reset = headers && typeof headers.get === 'function' ? headers.get('x-ratelimit-reset') : null;
      if (remaining !== null) state.remaining = positiveInteger(remaining) || 0;
      if (reset !== null) state.resetAt = positiveInteger(reset) || null;

      if (!response.ok) {
        var error = new Error('HTTP ' + response.status);
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }

  async function refresh(force) {
    if (state.loading) return null;

    var entry = readCache();
    if (entry && !state.fetchedAt) adoptCache(entry);

    var now = Date.now();
    if (!force && state.fetchedAt && now - state.fetchedAt < CACHE_TTL) {
      state.stale = false;
      render();
      setStatus(statusMessage(state.runs.length ? 'loaded' : 'empty'));
      return null;
    }
    // Flood/double-click guard: a manual refresh cannot hammer the public API.
    if (now - state.lastAttempt < REFRESH_COOLDOWN) return null;

    state.lastAttempt = now;
    state.loading = true;
    if (elements.refresh) {
      elements.refresh.disabled = true;
      elements.refresh.setAttribute('aria-busy', 'true');
    }

    if (state.runs.length) {
      state.stale = true;
      render();
    }

    setStatus(statusMessage('loading'));

    try {
      var payload = await fetchJson(RUNS_URL);
      var runs = sanitizeRuns(payload);

      var needsWorkflows = !state.workflows.length ||
        !entry ||
        !entry.savedAt ||
        Date.now() - positiveInteger(entry.savedAt) > WORKFLOWS_TTL;
      if (needsWorkflows) {
        try {
          state.workflows = sanitizeWorkflows(await fetchJson(WORKFLOWS_URL));
        } catch (workflowError) {
          /* Workflow names are decorative: run data still renders. */
        }
      }

      state.runs = runs;
      state.fetchedAt = Date.now();
      state.stale = false;
      writeCache();
      render();
      setStatus(statusMessage(runs.length ? 'loaded' : 'empty'));
    } catch (error) {
      if (state.runs.length) {
        state.stale = true;
        render();
        setStatus(statusMessage(error.status === 403 || error.status === 429 ? 'rateLimit' : 'cached'));
      } else {
        state.runs = [];
        render();
        setStatus(statusMessage(error.status === 403 || error.status === 429 ? 'rateLimit' : 'offline', error));
      }
    } finally {
      state.loading = false;
      if (elements.refresh) {
        elements.refresh.disabled = false;
        elements.refresh.removeAttribute('aria-busy');
      }
    }
    return null;
  }

  function init() {
    elements = {
      list: document.getElementById('pipeline-runs'),
      status: document.getElementById('pipeline-status'),
      refresh: document.getElementById('pipeline-refresh'),
      link: document.getElementById('pipeline-actions-link'),
      badge: document.getElementById('pipeline-source')
    };
    if (!elements.list) return;

    if (elements.refresh && elements.refresh.dataset.bound !== 'true') {
      elements.refresh.dataset.bound = 'true';
      elements.refresh.addEventListener('click', function () { refresh(true); });
    }

    // The static markup already points at ACTIONS_PAGE; keep the constant honest
    // if the repository ever moves, without trusting anything from the network.
    if (elements.link && elements.link.getAttribute('href') !== ACTIONS_PAGE) {
      elements.link.setAttribute('href', ACTIONS_PAGE);
    }

    window.addEventListener('tp:languagechange', function () {
      render();
      if (state.loading) {
        setStatus(statusMessage('loading'));
      } else if (state.runs.length) {
        setStatus(statusMessage(state.stale ? 'cached' : 'loaded'));
      }
    });

    refresh(false);
  }

  TP.pipeline = {
    init: init,
    refresh: refresh,
    render: render,
    sanitizeRun: sanitizeRun,
    safeRunUrl: safeRunUrl,
    formatDuration: formatDuration,
    config: {
      owner: OWNER,
      repo: REPO,
      runsUrl: RUNS_URL,
      workflowsUrl: WORKFLOWS_URL,
      actionsPage: ACTIONS_PAGE,
      runUrlPattern: String(RUN_URL_PATTERN),
      cacheKey: CACHE_KEY,
      cacheTtl: CACHE_TTL,
      requestTimeout: REQUEST_TIMEOUT,
      refreshCooldown: REFRESH_COOLDOWN,
      maxRuns: MAX_RUNS
    }
  };
})(window.TP);
