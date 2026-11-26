/* Real integration layer for the FastAPI and Python stdlib backends.
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
      source: '/api/v1',
      method: init.method,
      route: '/api/v1' + path,
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

  function buildQuery(params) {
    var entries = Object.keys(params || {}).filter(function (k) {
      return params[k] !== undefined && params[k] !== null && params[k] !== '';
    });
    if (!entries.length) return '';
    var search = new URLSearchParams();
    entries.forEach(function (k) { search.set(k, String(params[k])); });
    return '?' + search.toString();
  }

  TP.apiClient = {
    request: request,
    health: function () { return request('/health'); },
    build: function () { return request('/build'); },
    extract: function (payload) {
      return payload ? request('/extract', { method: 'POST', body: payload }) : request('/extract');
    },
    listDatasets: function () { return request('/etl/datasets'); },
    datasetSummary: function (dataset) { return request('/etl/datasets/' + encodeURIComponent(dataset) + '/summary'); },
    datasetRecords: function (dataset, params) {
      return request('/etl/datasets/' + encodeURIComponent(dataset) + '/records' + buildQuery(params));
    },
    bcbIndicadores: function (ultimos) {
      return request('/bcb/indicadores' + buildQuery({ ultimos: ultimos }));
    },
    bcbInstituicoes: function (busca, limite) {
      return request('/bcb/instituicoes' + buildQuery({ busca: busca, limite: limite }));
    },
    siscomexNcm: function (q, limite) {
      return request('/siscomex/ncm' + buildQuery({ q: q, limite: limite }));
    },
    transparenciaMunicipio: function (cidade, uf) {
      return request('/transparencia/municipio' + buildQuery({ cidade: cidade, uf: uf }));
    },
    projudiConsulta: function (payload) {
      return request('/projudi/processos/consulta', { method: 'POST', body: payload || {} });
    },
    projudiProcesso: function (numeroProcesso) {
      return request('/projudi/processos/' + encodeURIComponent(numeroProcesso || ''));
    },
    projudiResumo: function (numeroProcesso, payload) {
      return request('/projudi/processos/' + encodeURIComponent(numeroProcesso || '') + '/resumo', {
        method: 'POST',
        body: payload || {}
      });
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
    parseLegacyInvoice: function (payload) {
      return request('/invoices/parse', { method: 'POST', body: payload || {} });
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
    pipelineTargets: function () {
      return request('/pipelines/targets');
    },
    runPipeline: function (payload, apiKey) {
      return request('/pipelines/runs', {
        method: 'POST',
        body: payload || {},
        headers: { 'X-API-Key': apiKey || '' }
      });
    },
    pipelineRunStatus: function (jobId, apiKey) {
      return request('/pipelines/runs/' + encodeURIComponent(jobId), {
        headers: { 'X-API-Key': apiKey || '' }
      });
    },
    ragIndexStatus: function () {
      return request('/rag/index/status');
    },
    ragRebuildIndex: function (asyncJob, apiKey) {
      var suffix = asyncJob ? '?async_job=true' : '';
      return request('/rag/index/rebuild' + suffix, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey || '' }
      });
    },
    ragSearch: function (payload) {
      return request('/rag/search', { method: 'POST', body: payload || {} });
    },
    ragQuery: function (payload, apiKey) {
      return request('/rag/query', {
        method: 'POST',
        body: payload || {},
        headers: { 'X-API-Key': apiKey || '' }
      });
    },
    ragSourceDetail: function (chunkId) {
      return request('/rag/sources/' + encodeURIComponent(chunkId));
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
