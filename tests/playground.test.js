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
    'id="projudi-captcha"',
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

test('api-client wires all 7 public connector routes and static TP.api enforces no-mock PROJUDI + BRL + GPU Classif', async () => {
  const calls = [];
  const sandbox = {
    console,
    BigInt,
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
  await sandbox.TP.apiClient.siscomexNcm('GPU', 5);
  await sandbox.TP.apiClient.transparenciaMunicipio('Paranavaí', 'PR');
  await sandbox.TP.apiClient.projudiConsulta({ cpf: '111.444.777-35', tribunal: 'TJPR' });
  await sandbox.TP.apiClient.projudiProcesso('0001234-57.2024.8.16.0130', { captcha_token: 'tok' });
  await sandbox.TP.apiClient.projudiResumo('0001234-57.2024.8.16.0130', { texto_processo: 'urgente' });

  assert.equal(calls.length, 7);
  assert.equal(calls[0].url, 'api/v1/bcb/indicadores?ultimos=5');
  assert.equal(calls[2].url, 'api/v1/siscomex/ncm?q=GPU&limite=5');
  assert.equal(calls[4].method, 'POST');
  assert.equal(calls[5].url, 'api/v1/projudi/processos/0001234-57.2024.8.16.0130?captcha_token=tok');
  assert.equal(calls[6].url, 'api/v1/projudi/processos/0001234-57.2024.8.16.0130/resumo');

  // Siscomex Classif resolves both "cafe" and "GPU" (Nomenclatura + Decisoes + Sugestoes)
  const ncmCafe = await sandbox.TP.api.siscomexNcm('cafe');
  assert.equal(ncmCafe.status, 200);
  assert.equal(ncmCafe.data.data.resultados[0].codigo, '0901.11.10');

  const ncmGpu = await sandbox.TP.api.siscomexNcm('GPU');
  assert.equal(ncmGpu.status, 200);
  const gpuCodes = ncmGpu.data.data.resultados.map((r) => r.codigo);
  assert.ok(gpuCodes.includes('8471.80.00'));
  assert.ok(gpuCodes.includes('8471.50.90'));
  assert.ok(ncmGpu.data.data.total_decisoes >= 3);
  assert.ok(ncmGpu.data.data.total_sugestoes >= 3);

  // Municipal transparency returns real BRL monetary values and TSE code 77496
  const munOk = await sandbox.TP.api.transparenciaMunicipio('Paranavaí', 'PR');
  assert.equal(munOk.status, 200);
  assert.equal(munOk.data.data.moeda_padrao, 'BRL');
  assert.equal(munOk.data.data.municipio.codigo_tse, '77496');
  assert.equal(munOk.data.data.resumo_monetario.pib_municipal_brl, 4189765000.0);

  // PROJUDI rejects invalid CPF (422) AND returns 422 CAPTCHA_REQUIRED without fake data for valid CPF/CNJ
  const cpfBad = await sandbox.TP.api.projudiConsulta({ cpf: '111.111.111-11' });
  assert.equal(cpfBad.status, 422);

  const projNoMock = await sandbox.TP.api.projudiConsulta({ cpf: '111.444.777-35', tribunal: 'TJPR' });
  assert.equal(projNoMock.status, 422);
  assert.equal(projNoMock.data.code, 'CAPTCHA_REQUIRED');
  assert.equal(projNoMock.data.dados_sinteticos_ou_mock, false);

  const detNoMock = await sandbox.TP.api.projudiProcesso('0001234-57.2024.8.16.0130');
  assert.equal(detNoMock.status, 422);
  assert.equal(detNoMock.data.code, 'CAPTCHA_REQUIRED');

  const resumoOk = await sandbox.TP.api.projudiResumo('0001234-57.2024.8.16.0130', {
    texto_processo: 'tutela de urgencia deferida'
  });
  assert.equal(resumoOk.status, 200);
  assert.equal(resumoOk.data.data.status, 'ready_for_llm');
  assert.equal(resumoOk.data.data.origem_dados, 'corpus_fornecido_pelo_cliente');
});
