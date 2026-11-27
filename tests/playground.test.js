'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { assert, includesAll } = require('./helpers/assert');

const root = path.resolve(__dirname, '..');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const clientJs = readFileSync(path.join(root, 'assets/js/api-client.js'), 'utf8');
const apiJs = readFileSync(path.join(root, 'assets/js/api.js'), 'utf8');

test('API Playground exposes interactive controls for all 3 tabs and 7 public endpoints', () => {
  includesAll(html, [
    'id="etl-cidade"',
    'id="etl-uf"',
    'id="transparencia-button"',
    'id="projudi-cpf"',
    'id="projudi-tribunal"',
    'id="projudi-numero"',
    'id="projudi-consulta-button"',
    'id="projudi-detalhe-button"',
    'id="bcb-ultimos"',
    'id="bcb-busca"',
    'id="bcb-indicadores-button"',
    'id="bcb-instituicoes-button"',
    'id="siscomex-query"',
    'id="siscomex-ncm-button"',
    'id="resumo-numero"',
    'id="resumo-texto"',
    'id="projudi-resumo-button"',
    'id="workflow-token"'
  ]);
});

test('api-client wires all 7 public connector routes and static TP.api fallback validates inputs cleanly', async () => {
  const calls = [];
  const sandbox = {
    console,
    URLSearchParams,
    performance: { now: () => 10 },
    fetch: async (url, init) => {
      calls.push({ url, method: (init && init.method) || 'GET' });
      return {
        ok: true,
        status: 200,
        headers: {},
        json: async () => ({ ok: true, data: {} })
      };
    },
    window: {
      location: { protocol: 'https:' },
      performance: { now: () => 10 },
      TP: { utils: { sleep: async () => {} } }
    }
  };
  sandbox.TP = sandbox.window.TP;
  vm.createContext(sandbox);
  vm.runInContext(clientJs, sandbox);
  vm.runInContext(apiJs, sandbox);

  await sandbox.TP.apiClient.bcbIndicadores(5);
  await sandbox.TP.apiClient.bcbInstituicoes('Nubank', 10);
  await sandbox.TP.apiClient.siscomexNcm('computadores', 5);
  await sandbox.TP.apiClient.transparenciaMunicipio('Paranavaí', 'PR');
  await sandbox.TP.apiClient.projudiConsulta({ cpf: '111.444.777-35', tribunal: 'TJPR' });
  await sandbox.TP.apiClient.projudiProcesso('0001234-42.2024.8.16.0130');
  await sandbox.TP.apiClient.projudiResumo('0001234-42.2024.8.16.0130', { texto_processo: 'urgente' });

  assert.equal(calls.length, 7);
  assert.equal(calls[0].url, 'api/v1/bcb/indicadores?ultimos=5');
  assert.equal(calls[2].url, 'api/v1/siscomex/ncm?q=computadores&limite=5');
  assert.equal(calls[4].method, 'POST');
  assert.equal(calls[6].url, 'api/v1/projudi/processos/0001234-42.2024.8.16.0130/resumo');

  // Verify static GitHub Pages fallback realism & validation
  const ncmOk = await sandbox.TP.api.siscomexNcm('cafe');
  assert.equal(ncmOk.status, 200);
  assert.equal(ncmOk.data.data.resultados[0].codigo, '0901.11.10');

  const cpfBad = await sandbox.TP.api.projudiConsulta({ cpf: '111.111.111-11' });
  assert.equal(cpfBad.status, 422);

  const resumoOk = await sandbox.TP.api.projudiResumo('0001234-42.2024.8.16.0130', {
    texto_processo: 'tutela de urgencia deferida'
  });
  assert.equal(resumoOk.status, 200);
  assert.equal(resumoOk.data.data.status, 'ready_for_llm');
});
