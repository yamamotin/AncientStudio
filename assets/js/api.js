/* API client with an offline simulation fallback. Same JSON shape in both modes. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var mode = 'sim';

  function simulatedExtract() {
    return {
      mode: 'local-simulation',
      pipeline: ['fetch', 'parse', 'normalize', 'validate'],
      records: [
        { id: 'demo-001', field: 'export_value', raw: '1.234,56', normalized: 1234.56, valid: true },
        { id: 'demo-002', field: 'exchange_rate', raw: '5,12', normalized: 5.12, valid: true }
      ],
      checks: ['schema_ok', 'duplicates_removed', 'currency_normalized']
    };
  }

  function simulatedInvoice() {
    return {
      mode: 'local-simulation',
      http_status: 200,
      payload: {
        invoice_key: 'DEMO-3522-0000-0000',
        document_type: 'NF-e',
        status: 'parsed',
        totals_match: true
      },
      checks: ['xml_well_formed', 'issuer_present', 'tax_fields_validated']
    };
  }

  async function request(path, method) {
    var started = window.performance ? performance.now() : Date.now();
    var options = { method: method || 'GET', headers: { Accept: 'application/json' } };
    if (method === 'POST') {
      options.headers['Content-Type'] = 'application/json';
      options.body = '{}';
    }
    try {
      var response = await fetch(path, options);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var data = await response.json();
      var ended = window.performance ? performance.now() : Date.now();
      return { data: data, ms: Math.round(ended - started), source: 'api' };
    } catch (error) {
      return null;
    }
  }

  async function withFallback(path, fallback, method) {
    if (mode === 'api') {
      var live = await request(path, method);
      if (live) return live;
    }
    await utils.sleep(220);
    return { data: fallback(), ms: 220, source: 'sim' };
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
    extract: function () { return withFallback('/api/v1/extract', simulatedExtract); },
    parseInvoice: function () { return withFallback('/api/v1/invoices/parse', simulatedInvoice, 'POST'); }
  };
})(window.TP);
