/* Real integration layer for the FastAPI backend.
   No mocked responses live here: every method performs an HTTP request to /api/v1
   and preserves the real status code, problem+json body and network errors. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var BASE = 'api/v1';

  function integrationError(message, status, problem, cause) {
    var error = new Error(message);
    error.name = 'ApiClientError';
    error.status = status || 0;
    error.problem = problem || null;
    error.cause = cause || null;
    return error;
  }

  async function request(path, options) {
    var settings = options || {};
    var started = window.performance ? performance.now() : Date.now();
    var headers = Object.assign({ Accept: 'application/json' }, settings.headers || {});
    var init = { method: settings.method || 'GET', headers: headers };

    if (settings.body !== undefined) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      init.body = typeof settings.body === 'string' ? settings.body : JSON.stringify(settings.body);
    }

    var response;
    try {
      response = await fetch(BASE + path, init);
    } catch (cause) {
      throw integrationError('Network error while calling ' + path, 0, null, cause);
    }

    var data = null;
    try {
      data = await response.json();
    } catch (cause) {
      data = null;
    }

    var ended = window.performance ? performance.now() : Date.now();
    var result = {
      data: data,
      status: response.status,
      ms: Math.round(ended - started),
      source: 'api',
      headers: response.headers
    };

    if (!response.ok) {
      var detail = data && (data.detail || data.title) ? (data.title || 'Error') + ': ' + data.detail : null;
      throw integrationError(detail || 'HTTP ' + response.status, response.status, data, result);
    }
    return result;
  }

  function withKey(path, key) {
    return path + (path.indexOf('?') === -1 ? '?' : '&') + 'key=' + encodeURIComponent(key);
  }

  TP.apiClient = {
    request: request,
    health: function () { return request('/health'); },
    build: function () { return request('/build'); },
    listDatasets: function () { return request('/etl/datasets'); },
    datasetSummary: function (dataset) { return request('/etl/datasets/' + encodeURIComponent(dataset) + '/summary'); },
    datasetRecords: function (dataset, params) {
      var query = params ? '?' + new URLSearchParams(params).toString() : '';
      return request('/etl/datasets/' + encodeURIComponent(dataset) + '/records' + query);
    },
    submitInvoice: function (payload) {
      return request('/gateway/invoices/submit', { method: 'POST', body: payload });
    },
    parseInvoice: function (payload, signatureHeaders) {
      return request('/gateway/invoices/parse', {
        method: 'POST',
        body: payload,
        headers: signatureHeaders || {}
      });
    },
    runWorkflow: function (workflowId, payload, apiKey) {
      return request('/workflows/' + encodeURIComponent(workflowId) + '/run', {
        method: 'POST',
        body: payload || {},
        headers: { 'X-API-Key': apiKey || '' }
      });
    },
    workflowStatus: function (executionId, apiKey) {
      return request('/workflows/runs/' + encodeURIComponent(executionId), {
        headers: { 'X-API-Key': apiKey || '' }
      });
    },
    describeError: function (error) {
      if (!error) return 'unknown error';
      if (error.status === 0) return 'network unreachable';
      return 'HTTP ' + error.status;
    },
    // Exposed for tests/demos that need a cache-busting URL, never for fake data.
    withKey: withKey
  };
})(window.TP);
