/* API client with live Python backend integration + offline simulation fallback. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var mode = 'sim';

  function simulatedHealth() {
    return {
      ok: true,
      service: 'static-simulation',
      mode: 'local-simulation',
      ascii_engine_bundle: Boolean(window.ASCIIRealms),
      counters: { total: 0, extract: 0, invoices_parse: 0, pipeline_run: 0 }
    };
  }

  function simulatedExtract() {
    return {
      mode: 'local-simulation',
      pipeline: ['fetch', 'parse', 'normalize', 'validate'],
      duplicates_removed: 1,
      records: [
        { id: 'demo-001', field: 'export_value', raw: '1.234,56', normalized: 1234.56, valid: true },
        { id: 'demo-002', field: 'exchange_rate', raw: '5,12', normalized: 5.12, valid: true }
      ],
      checks: ['schema_ok', 'duplicates_removed', 'currency_normalized']
    };
  }

  function simulatedInvoice(body) {
    var eventId = body && body.event_id ? String(body.event_id) : '';
    return {
      mode: 'local-simulation',
      http_status: 200,
      idempotent_replay: false,
      payload: {
        invoice_key: (body && body.invoice_key) || 'DEMO-3522-0000-0000',
        document_type: (body && body.document_type) || 'NF-e',
        status: 'parsed',
        totals_match: true
      },
      checks: eventId
        ? ['xml_well_formed', 'issuer_present', 'tax_fields_validated', 'idempotency_key_recorded']
        : ['xml_well_formed', 'issuer_present', 'tax_fields_validated']
    };
  }

  function simulatedLogs() {
    return {
      mode: 'local-simulation',
      counters: { total: 0, extract: 0, invoices_parse: 0, pipeline_run: 0 },
      events: [
        { ts: new Date().toISOString(), method: 'LOCAL', path: '/sim', status: 200, detail: 'static host mode (no Python backend)' }
      ]
    };
  }

  async function request(path, method, payload) {
    var started = window.performance ? performance.now() : Date.now();
    var options = { method: method || 'GET', headers: { Accept: 'application/json' } };
    if (method === 'POST') {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(payload || {});
    }
    var Controller = window.AbortController;
    var controller = typeof Controller === 'function' ? new Controller() : null;
    var timer = null;
    if (controller) {
      options.signal = controller.signal;
      timer = window.setTimeout(function () { controller.abort(); }, 10000);
    }
    try {
      var response = await fetch(path, options);
      var data = await response.json();
      if (!response.ok && response.status !== 422) throw new Error('HTTP ' + response.status);
      var ended = window.performance ? performance.now() : Date.now();
      return { data: data, ms: Math.round(ended - started), source: 'api' };
    } catch (error) {
      return null;
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }

  async function withFallback(path, fallback, method, payload) {
    if (mode === 'api') {
      var live = await request(path, method, payload);
      if (live) return live;
    }
    await utils.sleep(200);
    return { data: fallback(payload), ms: 200, source: 'sim' };
  }

  async function detect() {
    if (window.location.protocol === 'file:') {
      mode = 'sim';
      return mode;
    }
    var health = await request('api-status.json');
    mode = health && health.data && health.data.ok ? 'api' : 'sim';
    return mode;
  }

  TP.api = {
    detect: detect,
    getMode: function () { return mode; },
    health: function () { return withFallback('/api/v1/health', simulatedHealth); },
    logs: function () { return withFallback('/api/v1/logs', simulatedLogs); },
    extract: function (payload) {
      return withFallback('/api/v1/extract', simulatedExtract, payload ? 'POST' : 'GET', payload);
    },
    parseInvoice: function (payload) {
      return withFallback('/api/v1/invoices/parse', simulatedInvoice, 'POST', payload || {
        invoice_key: 'DEMO-3522-0000-0000',
        document_type: 'NF-e',
        event_id: 'evt-demo-3522'
      });
    }
    // No pipeline runner here: the CI/CD panel reads public GitHub Actions
    // metadata only (assets/js/pipeline.js) and never triggers builds.
  };
})(window.TP);
