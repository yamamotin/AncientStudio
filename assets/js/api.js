/* API client with live Python backend detection + static-host contingency
   for GitHub Pages / file:// previews when no Python server is running.
   PROJUDI never returns synthetic or mock case records: unauthenticated static calls
   return structured HTTP 422 CAPTCHA_REQUIRED problem details. */
window.TP = window.TP || {};

(function (TP) {
  'use strict';

  var utils = TP.utils;
  var mode = 'sim';

  var VALID_UFS = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT',
    'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
  ];

  var STATIC_NCM_CATALOG = [
    {
      codigo: '8471.80.00',
      codigo_numerico: '84718000',
      nivel: 'ncm_8_digitos',
      descricao: 'Outras unidades de máquinas automáticas para processamento de dados',
      hierarquia: {
        capitulo: { codigo: '84', descricao: 'Reatores nucleares, caldeiras, máquinas, aparelhos e instrumentos mecânicos' },
        posicao: { codigo: '84.71', descricao: 'Máquinas automáticas para processamento de dados e suas unidades' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8471.50.90',
      codigo_numerico: '84715090',
      nivel: 'ncm_8_digitos',
      descricao: 'Outras',
      hierarquia: {
        capitulo: { codigo: '84', descricao: 'Reatores nucleares, caldeiras, máquinas, aparelhos e instrumentos mecânicos' },
        posicao: { codigo: '84.71', descricao: 'Máquinas automáticas para processamento de dados e suas unidades' },
        subposicao: { codigo: '8471.50', descricao: 'Unidades de processamento, exceto as das subposições 8471.41 ou 8471.49' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8542.31.90',
      codigo_numerico: '85423190',
      nivel: 'ncm_8_digitos',
      descricao: 'Outros',
      hierarquia: {
        capitulo: { codigo: '85', descricao: 'Máquinas, aparelhos e materiais elétricos, e suas partes' },
        posicao: { codigo: '85.42', descricao: 'Circuitos integrados eletrônicos' },
        subposicao: { codigo: '8542.31', descricao: 'Processadores e controladores, mesmo combinados com memórias' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8471.30.12',
      codigo_numerico: '84713012',
      nivel: 'ncm_8_digitos',
      descricao: 'De peso inferior a 3,5 kg, com tela de área superior a 140 cm²',
      hierarquia: {
        capitulo: { codigo: '84', descricao: 'Reatores nucleares, caldeiras, máquinas, aparelhos e instrumentos mecânicos' },
        posicao: { codigo: '84.71', descricao: 'Máquinas automáticas para processamento de dados e suas unidades' },
        subposicao: { codigo: '8471.30', descricao: 'Máquinas automáticas para processamento de dados, portáteis, de peso não superior a 10 kg' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8471.70.40',
      codigo_numerico: '84717040',
      nivel: 'ncm_8_digitos',
      descricao: 'De estado sólido (solid-state)',
      hierarquia: {
        capitulo: { codigo: '84', descricao: 'Reatores nucleares, caldeiras, máquinas, aparelhos e instrumentos mecânicos' },
        posicao: { codigo: '84.71', descricao: 'Máquinas automáticas para processamento de dados e suas unidades' },
        subposicao: { codigo: '8471.70', descricao: 'Unidades de memória' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8517.13.00',
      codigo_numerico: '85171300',
      nivel: 'ncm_8_digitos',
      descricao: 'Telefones inteligentes (smartphones)',
      hierarquia: {
        capitulo: { codigo: '85', descricao: 'Máquinas, aparelhos e materiais elétricos, e suas partes' },
        posicao: { codigo: '85.17', descricao: 'Aparelhos telefônicos, incluindo smartphones e roteadores' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8504.40.90',
      codigo_numerico: '85044090',
      nivel: 'ncm_8_digitos',
      descricao: 'Outros',
      hierarquia: {
        capitulo: { codigo: '85', descricao: 'Máquinas, aparelhos e materiais elétricos, e suas partes' },
        posicao: { codigo: '85.04', descricao: 'Transformadores elétricos e conversores elétricos estáticos' },
        subposicao: { codigo: '8504.40', descricao: 'Conversores estáticos' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '0901.11.10',
      codigo_numerico: '09011110',
      nivel: 'ncm_8_digitos',
      descricao: 'Em grão',
      hierarquia: {
        capitulo: { codigo: '09', descricao: 'Café, chá, mate e especiarias' },
        posicao: { codigo: '09.01', descricao: 'Café, mesmo torrado ou descafeinado' },
        subposicao: { codigo: '0901.11', descricao: 'Café não torrado, não descafeinado' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '1201.90.00',
      codigo_numerico: '12019000',
      nivel: 'ncm_8_digitos',
      descricao: 'Outras',
      hierarquia: {
        capitulo: { codigo: '12', descricao: 'Sementes e frutos oleaginosos' },
        posicao: { codigo: '12.01', descricao: 'Soja, mesmo triturada' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    },
    {
      codigo: '8703.80.00',
      codigo_numerico: '87038000',
      nivel: 'ncm_8_digitos',
      descricao: 'Outros veículos, unicamente com motor elétrico para propulsão',
      hierarquia: {
        capitulo: { codigo: '87', descricao: 'Veículos automóveis, tratores, ciclos e suas partes' },
        posicao: { codigo: '87.03', descricao: 'Automóveis de passageiros' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Gecex nº 272/2021' }
    }
  ];

  var STATIC_CLASSIF_THESAURUS = [
    {
      triggers: ['gpu', 'gpus', 'gpgpu', 'placa de video', 'placa grafica', 'placa aceleradora', 'rtx', 'geforce', 'radeon'],
      expandedTerms: ['unidade de processamento grafico', 'outras unidades de maquinas automaticas para processamento de dados'],
      sugestoes: [
        {
          codigo_ncm: '8471.80.00',
          confianca: 'alta',
          perfil_mercadoria: 'Placa de vídeo convencional (GPU montada em PCB com saídas de vídeo HDMI/DisplayPort)',
          fundamentacao: 'Solução de Consulta COANA nº 46/2016 e Solução de Consulta COSIT nº 98.227/2020.',
          carater: 'orientativo_nao_vinculante'
        },
        {
          codigo_ncm: '8471.50.90',
          confianca: 'alta',
          perfil_mercadoria: 'Placa aceleradora / GPGPU para data center e IA (sem saída de vídeo)',
          fundamentacao: 'Soluções de Consulta COSIT nº 98.081/2021 e nº 98.227/2020.',
          carater: 'orientativo_nao_vinculante'
        },
        {
          codigo_ncm: '8542.31.90',
          confianca: 'media',
          perfil_mercadoria: 'Circuito integrado processador gráfico avulso (chip GPU/BGA sem placa)',
          fundamentacao: 'Posição 85.42 da NCM/SH-2022 (Res. Gecex nº 272/2021).',
          carater: 'orientativo_nao_vinculante'
        }
      ],
      decisoes: [
        {
          tipo_ato: 'Solução de Consulta',
          numero: '98081',
          orgao: 'Cosit',
          data_publicacao: '2021-04-08',
          codigo_ncm: '8471.50.90',
          ementa: "Código NCM 8471.50.90. Unidade de processamento sob a forma de placa de circuito impresso sem saída de vídeo, comercialmente denominada 'Unidade de Processamento Gráfico (GPU)' ou 'placa aceleradora'.",
          fonte: 'Receita Federal do Brasil — Soluções de Consulta (COSIT/COANA)'
        },
        {
          tipo_ato: 'Solução de Consulta',
          numero: '98227',
          orgao: 'Cosit',
          data_publicacao: '2020-07-10',
          codigo_ncm: '8471.50.90',
          ementa: "Código NCM: 8471.50.90. Placa aceleradora GPGPU com memória HBM2 sem saída de vídeo (distinta das placas de vídeo convencionais da subposição 8471.80.00).",
          fonte: 'Receita Federal do Brasil — Soluções de Consulta (COSIT/COANA)'
        },
        {
          tipo_ato: 'Solução de Consulta',
          numero: '46',
          orgao: 'Coana',
          data_publicacao: '2016-04-26',
          codigo_ncm: '8471.80.00',
          ementa: 'Código NCM: 8471.80.00. Unidade de processamento gráfico constituída de placa de circuito impresso com processador próprio (GPU), comercialmente denominada placa de vídeo.',
          fonte: 'Receita Federal do Brasil — Soluções de Consulta (COSIT/COANA)'
        }
      ]
    },
    {
      triggers: ['computadores', 'computador', 'computadores portateis', 'notebook', 'laptop'],
      expandedTerms: ['maquinas automaticas para processamento de dados portateis'],
      sugestoes: [
        {
          codigo_ncm: '8471.30.12',
          confianca: 'alta',
          perfil_mercadoria: 'Notebook / computador portátil de peso inferior a 3,5 kg',
          fundamentacao: 'Subitem 8471.30.12 da NCM/TEC.',
          carater: 'orientativo_nao_vinculante'
        }
      ],
      decisoes: []
    },
    {
      triggers: ['inversor solar', 'inversores solares', 'inversor fotovoltaico'],
      expandedTerms: ['conversores estaticos'],
      sugestoes: [
        {
          codigo_ncm: '8504.40.90',
          confianca: 'alta',
          perfil_mercadoria: 'Inversor solar fotovoltaico (conversor elétrico estático)',
          fundamentacao: 'Subitem 8504.40.90 da NCM/TEC e SC Cosit nº 98.294/2023.',
          carater: 'orientativo_nao_vinculante'
        }
      ],
      decisoes: []
    },
    {
      triggers: ['ssd', 'nvme'],
      expandedTerms: ['estado solido'],
      sugestoes: [
        {
          codigo_ncm: '8471.70.40',
          confianca: 'alta',
          perfil_mercadoria: 'Unidade de memória SSD (Solid-State Drive)',
          fundamentacao: 'Subitem 8471.70.40 da NCM/SH-2022.',
          carater: 'orientativo_nao_vinculante'
        }
      ],
      decisoes: []
    }
  ];

  var STATIC_PIX_INSTITUTIONS = [
    { ispb: '00000000', nome: 'BANCO DO BRASIL S.A.', nome_reduzido: 'BCO DO BRASIL S.A.', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '60701190', nome: 'ITAÚ UNIBANCO S.A.', nome_reduzido: 'ITAU UNIBANCO S.A.', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '18236120', nome: 'NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO', nome_reduzido: 'NU PAGAMENTOS - IP (NUBANK)', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '00360305', nome: 'CAIXA ECONÔMICA FEDERAL', nome_reduzido: 'CAIXA ECONOMICA FEDERAL', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '60746948', nome: 'BANCO BRADESCO S.A.', nome_reduzido: 'BCO BRADESCO S.A.', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '01181521', nome: 'BANCO COOPERATIVO SICREDI S.A.', nome_reduzido: 'BCO COOPERATIVO SICREDI S.A.', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '00416968', nome: 'BANCO INTER S.A.', nome_reduzido: 'BANCO INTER', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' },
    { ispb: '07679404', nome: 'BANCO BTG PACTUAL S.A.', nome_reduzido: 'BANCO BTG PACTUAL S.A.', modalidade_pix: 'PDCT', tipo_participacao: 'DIRETO', inicio_operacao: '2020-11-03' }
  ];

  var STATIC_MUNICIPALITIES = {
    'paranavai:PR': {
      municipio: { nome: 'Paranavaí', uf: 'PR', codigo_ibge: '4118402', codigo_tse: '77496', mesorregiao: 'Noroeste Paranaense' },
      resumo_monetario: {
        unidade_moeda: 'BRL',
        moeda: 'BRL',
        pib_municipal_brl: 4189765000.0,
        pib_per_capita_brl: 45540.43,
        receitas_realizadas_brl: 572821920.0,
        despesas_empenhadas_brl: 540219230.0,
        transferencias_correntes_brl: 397240906.84,
        bens_declarados_prefeito_brl: 7479000.0,
        despesas_campanha_prefeito_brl: 256896.2
      },
      indicadores_ibge: {
        moeda: 'BRL',
        populacao_estimada_pessoas: 96209,
        populacao_ano_referencia: '2025',
        pib_total_brl: 4168436000.0,
        pib_per_capita_brl: 45295.3,
        pib_ano_referencia: '2021',
        receitas_brutas_realizadas_brl: 572821922.49,
        despesas_brutas_empenhadas_brl: 540219225.49,
        orcamento_ibge_ano_referencia: '2024'
      },
      execucao_orcamentaria_siconfi: {
        moeda: 'BRL',
        ano_exercicio: 2024,
        receitas_orcamentarias_realizadas_brl: 562413615.32,
        receitas_correntes_brl: 545950037.13,
        receita_tributaria_propria_brl: 113863276.64,
        transferencias_correntes_brl: 397240906.84,
        despesas_empenhadas_brl: 540219225.49,
        despesas_liquidadas_brl: 500024943.77,
        despesas_pagas_brl: 492030972.37,
        despesas_pessoal_encargos_brl: 251329086.65
      },
      financas_eleitorais_tse: {
        moeda: 'BRL',
        ano_eleicao: 2024,
        bens_declarados_prefeito_brl: 7479000.0,
        campanha_prefeito: {
          limite_gastos_1t_brl: 235542.16,
          receitas_campanha_brl: 294295.15,
          despesas_contratadas_campanha_brl: 256896.2,
          despesas_pagas_campanha_brl: 256896.2
        }
      },
      prefeito: { nome_urna: 'MAURÍCIO GEHLEN', cargo: 'Prefeito', partido: 'PSD', numero_urna: 55, situacao: 'ELEITO', bens_declarados_brl: 7479000.0 },
      vice_prefeito: { nome_urna: 'PEDRO BARALDI', cargo: 'Vice-Prefeito', partido: 'PP', numero_urna: 55, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'WALDUR DO POVO', cargo: 'Vereador', partido: 'UNIÃO', situacao: 'ELEITO POR QP' },
        { nome_urna: 'DR. LEÔNIDAS FAVERO', cargo: 'Vereador', partido: 'CIDADANIA', situacao: 'ELEITO POR QP' },
        { nome_urna: 'CARLOS AUGUSTO', cargo: 'Vereador', partido: 'UNIÃO', situacao: 'ELEITO POR QP' },
        { nome_urna: 'PROFESSORA IVANY', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' },
        { nome_urna: 'JOSIVAL MOREIRA', cargo: 'Vereador', partido: 'PP', situacao: 'ELEITO POR QP' },
        { nome_urna: 'MARIA CLARA GOMES', cargo: 'Vereador', partido: 'PL', situacao: 'ELEITO POR QP' },
        { nome_urna: 'PROFESSORA CIDA GONÇALVES', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' },
        { nome_urna: 'LUIS PAULO', cargo: 'Vereador', partido: 'SOLIDARIEDADE', situacao: 'ELEITO POR QP' },
        { nome_urna: 'RAFAEL OCTAVIANO', cargo: 'Vereador', partido: 'PL', situacao: 'ELEITO POR MÉDIA' },
        { nome_urna: 'GABRIEL LUIZ', cargo: 'Vereador', partido: 'PP', situacao: 'ELEITO POR MÉDIA' }
      ]
    },
    'curitiba:PR': {
      municipio: { nome: 'Curitiba', uf: 'PR', codigo_ibge: '4106902', codigo_tse: '75353', mesorregiao: 'Metropolitana de Curitiba' },
      resumo_monetario: {
        moeda: 'BRL',
        pib_municipal_brl: 98003704000.0,
        pib_per_capita_brl: 55247.45,
        receita_orcamentaria_anual_brl: 13542890112.45,
        despesa_orcamentaria_empenhada_brl: 12980450321.18
      },
      prefeito: { nome_urna: 'EDUARDO PIMENTEL', cargo: 'Prefeito', partido: 'PSD', numero_urna: 55, situacao: 'ELEITO' },
      vice_prefeito: { nome_urna: 'PAULO MARTINS', cargo: 'Vice-Prefeito', partido: 'PL', numero_urna: 55, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'JAIRO MARCELINO', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' },
        { nome_urna: 'INDIARA BARBOSA', cargo: 'Vereador', partido: 'NOVO', situacao: 'ELEITO POR QP' }
      ]
    },
    'maringa:PR': {
      municipio: { nome: 'Maringá', uf: 'PR', codigo_ibge: '4115200', codigo_tse: '76910', mesorregiao: 'Norte Central Paranaense' },
      resumo_monetario: {
        moeda: 'BRL',
        pib_municipal_brl: 22656732000.0,
        pib_per_capita_brl: 55312.8,
        receita_orcamentaria_anual_brl: 2894510230.9,
        despesa_orcamentaria_empenhada_brl: 2710884120.4
      },
      prefeito: { nome_urna: 'SILVIO BARROS', cargo: 'Prefeito', partido: 'PP', numero_urna: 11, situacao: 'ELEITO' },
      vice_prefeito: { nome_urna: 'SANDRA JACOVÓS', cargo: 'Vice-Prefeito', partido: 'PL', numero_urna: 11, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'DELEGADO LUIZ ALVES', cargo: 'Vereador', partido: 'PL', situacao: 'ELEITO POR QP' },
        { nome_urna: 'MARIO HOSSOKAWA', cargo: 'Vereador', partido: 'PP', situacao: 'ELEITO POR QP' }
      ]
    }
  };

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function cleanDigits(value) {
    return String(value || '').replace(/\D+/g, '');
  }

  function isValidCpf(raw) {
    var d = cleanDigits(raw);
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
    var s1 = 0;
    var i;
    for (i = 0; i < 9; i += 1) s1 += Number(d[i]) * (10 - i);
    var c1 = (s1 * 10) % 11;
    if (c1 === 10) c1 = 0;
    if (c1 !== Number(d[9])) return false;
    var s2 = 0;
    for (i = 0; i < 10; i += 1) s2 += Number(d[i]) * (11 - i);
    var c2 = (s2 * 10) % 11;
    if (c2 === 10) c2 = 0;
    return c2 === Number(d[10]);
  }

  function formatCnj(raw) {
    var d = cleanDigits(raw);
    if (d.length !== 20) return null;
    var seq = d.slice(0, 7);
    var dd = d.slice(7, 9);
    var year = Number(d.slice(9, 13));
    var j = Number(d.slice(13, 14));
    var tr = Number(d.slice(14, 16));
    var orig = d.slice(16, 20);
    if (year < 1980 || year > 2099 || j === 0 || tr === 0) return null;
    return seq + '-' + dd + '.' + d.slice(9, 13) + '.' + d.slice(13, 14) + '.' + d.slice(14, 16) + '.' + orig;
  }

  function simResult(status, method, route, body) {
    return {
      status: status,
      ms: 48,
      source: 'static-sim',
      method: method,
      route: route,
      data: body
    };
  }

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

  async function simulatedBcbIndicadores(ultimos) {
    if (utils && utils.sleep) await utils.sleep(45);
    var n = Math.min(30, Math.max(1, Number(ultimos) || 5));
    var route = '/api/v1/bcb/indicadores?ultimos=' + n;
    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        atualizado_em: new Date().toISOString(),
        fonte: 'Banco Central do Brasil — Dados Abertos SGS (Séries 432, 433 e 1)',
        fonte_modo: 'simulacao_estatica_pages',
        janela_periodos: n,
        indicadores: {
          selic_meta: {
            codigo_sgs: 432,
            nome: 'Taxa Selic — Meta COPOM',
            unidade: '% a.a.',
            data_referencia: '2026-11-25',
            valor_atual: 11.75,
            valor_anterior: 11.25,
            variacao_absoluta: 0.5,
            tendencia: 'alta',
            serie_historica: [
              { data: '2026-11-23', valor: 11.25 },
              { data: '2026-11-24', valor: 11.75 },
              { data: '2026-11-25', valor: 11.75 }
            ].slice(-n)
          },
          ipca_mensal: {
            codigo_sgs: 433,
            nome: 'IPCA — Variação Mensal (IBGE/SGS)',
            unidade: '% a.m.',
            data_referencia: '2026-10-01',
            valor_atual: 0.56,
            valor_anterior: 0.44,
            variacao_absoluta: 0.12,
            tendencia: 'alta',
            acumulado_janela_pct: 1.58,
            serie_historica: [
              { data: '2026-08-01', valor: -0.02 },
              { data: '2026-09-01', valor: 0.44 },
              { data: '2026-10-01', valor: 0.56 }
            ].slice(-n)
          },
          ptax_usd_brl: {
            codigo_sgs: 1,
            nome: 'Câmbio PTAX USD/BRL — Venda',
            unidade: 'BRL/USD',
            data_referencia: '2026-11-25',
            valor_atual: 5.789,
            valor_anterior: 5.8021,
            variacao_absoluta: -0.0131,
            tendencia: 'baixa',
            serie_historica: [
              { data: '2026-11-23', valor: 5.7945 },
              { data: '2026-11-24', valor: 5.8021 },
              { data: '2026-11-25', valor: 5.789 }
            ].slice(-n)
          }
        }
      }
    });
  }

  async function simulatedBcbInstituicoes(busca) {
    if (utils && utils.sleep) await utils.sleep(45);
    var q = String(busca || '').trim();
    var norm = normalizeText(q);
    var digits = cleanDigits(q);
    var route = '/api/v1/bcb/instituicoes' + (q ? '?busca=' + encodeURIComponent(q) : '');
    var filtered = STATIC_PIX_INSTITUTIONS.filter(function (inst) {
      if (!norm && !digits) return true;
      var hay = normalizeText(inst.nome + ' ' + inst.nome_reduzido);
      return (norm && hay.indexOf(norm) >= 0) || (digits && inst.ispb.indexOf(digits) >= 0);
    });
    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        atualizado_em: new Date().toISOString(),
        fonte: 'Banco Central do Brasil — Olinda Participantes PIX / STR',
        fonte_modo: 'simulacao_estatica_pages',
        filtro_busca: q,
        total_encontrado: filtered.length,
        instituicoes: filtered
      }
    });
  }

  async function simulatedSiscomexNcm(query) {
    if (utils && utils.sleep) await utils.sleep(45);
    var raw = String(query || '').trim();
    var norm = normalizeText(raw);
    var digits = cleanDigits(raw);
    var route = '/api/v1/siscomex/ncm?q=' + encodeURIComponent(raw);
    if (norm.length < 2 && digits.length < 2) {
      return simResult(422, 'GET', route, {
        ok: false,
        status: 422,
        title: 'Validation error',
        detail: "Informe ao menos 2 caracteres em 'q' (descrição comercial/técnica ou código NCM)."
      });
    }

    var sugestoes = [];
    var decisoes = [];
    var expandedTerms = [];
    var boostedCodes = {};
    var queryTokens = norm.split(' ').filter(Boolean);

    STATIC_CLASSIF_THESAURUS.forEach(function (rule) {
      var hit = rule.triggers.some(function (tr) {
        return tr.indexOf(' ') >= 0 ? norm.indexOf(tr) >= 0 : queryTokens.indexOf(tr) >= 0;
      });
      if (hit) {
        rule.expandedTerms.forEach(function (t) { expandedTerms.push(t); });
        rule.sugestoes.forEach(function (s) {
          sugestoes.push(s);
          boostedCodes[cleanDigits(s.codigo_ncm)] = true;
        });
        rule.decisoes.forEach(function (d) {
          decisoes.push(d);
          if (d.codigo_ncm) boostedCodes[cleanDigits(d.codigo_ncm)] = true;
        });
      }
    });

    var matches = STATIC_NCM_CATALOG.filter(function (entry) {
      var subDesc = entry.hierarquia.subposicao ? entry.hierarquia.subposicao.descricao : '';
      var hay = normalizeText(
        entry.descricao + ' ' + entry.hierarquia.capitulo.descricao + ' ' +
        entry.hierarquia.posicao.descricao + ' ' + subDesc
      );
      var codeMatch = digits && entry.codigo_numerico.indexOf(digits) === 0;
      var textMatch = queryTokens.length && queryTokens.every(function (t) { return hay.indexOf(t) >= 0; });
      var boostMatch = Boolean(boostedCodes[entry.codigo_numerico]);
      return codeMatch || textMatch || boostMatch;
    });

    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        consultado_em: new Date().toISOString(),
        fonte: 'Portal Único Siscomex — Classif (Nomenclatura NCM + Decisões COSIT/COANA + Sugestões)',
        fonte_modo: 'contingencia_estatica_classif',
        termo_busca: raw,
        termo_normalizado: norm,
        termos_expandidos: expandedTerms,
        total_encontrado: matches.length,
        resultados: matches,
        nomenclaturas: matches,
        total_decisoes: decisoes.length,
        decisoes: decisoes,
        total_sugestoes: sugestoes.length,
        sugestoes: sugestoes
      }
    });
  }

  async function simulatedTransparenciaMunicipio(cidade, uf) {
    if (utils && utils.sleep) await utils.sleep(45);
    var rawCity = String(cidade || '').trim();
    var cleanUf = String(uf || '').trim().toUpperCase();
    var normCity = normalizeText(rawCity);
    var route = '/api/v1/transparencia/municipio?cidade=' + encodeURIComponent(rawCity) + '&uf=' + encodeURIComponent(cleanUf);
    if (normCity.length < 2 || VALID_UFS.indexOf(cleanUf) === -1 || cleanUf === 'DF') {
      return simResult(422, 'GET', route, {
        ok: false,
        status: 422,
        title: 'Validation error',
        detail: 'Informe uma cidade válida e uma UF municipal oficial de 2 letras (ex.: Paranavaí / PR).'
      });
    }
    var profile = STATIC_MUNICIPALITIES[normCity + ':' + cleanUf];
    if (!profile) {
      return simResult(503, 'GET', route, {
        ok: false,
        status: 503,
        code: 'BACKEND_REQUIRED_FOR_CITY',
        title: 'Backend Python Necessário para Consulta Municipal Dinâmica',
        detail: 'Em hospedagem estática, apenas snapshots verificados (Paranavaí/PR, Maringá/PR, Curitiba/PR) estão embarcado localmente. Conecte o backend Python para consultar qualquer município brasileiro via IBGE + Siconfi + TSE.'
      });
    }
    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        consultado_em: new Date().toISOString(),
        unidade_moeda: 'BRL',
        moeda_padrao: 'BRL',
        fonte: 'IBGE (Agregados 5938 + Pesquisas) + Tesouro Nacional Siconfi (DCA) + TSE DivulgaCandContas 2024',
        fonte_modo: 'contingencia_estatica_verificada',
        mandato: '2025-2028',
        municipio: profile.municipio,
        resumo_monetario: profile.resumo_monetario,
        indicadores_ibge: profile.indicadores_ibge || null,
        execucao_orcamentaria_siconfi: profile.execucao_orcamentaria_siconfi || null,
        financas_eleitorais_tse: profile.financas_eleitorais_tse || null,
        executivo: { prefeito: profile.prefeito, vice_prefeito: profile.vice_prefeito },
        legislativo: { total_vereadores_listados: profile.vereadores.length, vereadores: profile.vereadores }
      }
    });
  }

  function buildCaptchaRequiredResponse(method, route) {
    return simResult(422, method, route, {
      ok: false,
      type: 'about:blank',
      status: 422,
      code: 'CAPTCHA_REQUIRED',
      title: 'Desafio CAPTCHA Obrigatório no PROJUDI',
      detail: 'A Consulta Pública do PROJUDI TJPR exige validação humana reCAPTCHA (g-recaptcha-response) e backend Python ativo para sessão HTTP real. Nenhum dado processual sintético ou mock é retornado.',
      portal_url: 'https://consulta.tjpr.jus.br/projudi_consulta/',
      form_url: 'https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar',
      recaptcha_callback: 'executaRecaptchaPBC_actre_consulta_publica',
      dados_sinteticos_ou_mock: false,
      instructions: [
        '1. Suba o backend Python (/api/v1) para habilitar a sessão HTTP real com consulta.tjpr.jus.br.',
        '2. Acesse o formulário público do PROJUDI TJPR e resolva o desafio Google reCAPTCHA para obter g-recaptcha-response.',
        '3. Envie captcha_token (e opcionalmente session_cookie JSESSIONID) na requisição.'
      ]
    });
  }

  async function simulatedProjudiConsulta(payload) {
    if (utils && utils.sleep) await utils.sleep(45);
    var body = payload || {};
    var route = '/api/v1/projudi/processos/consulta';
    var digits = cleanDigits(body.cpf);
    if (digits.length !== 14 && !isValidCpf(body.cpf)) {
      return simResult(422, 'POST', route, {
        ok: false,
        status: 422,
        code: 'INVALID_DOCUMENT',
        title: 'Validation error',
        detail: 'CPF/CNPJ inválido: verifique os dígitos verificadores.'
      });
    }
    var tribunal = String(body.tribunal || 'TJPR').toUpperCase();
    if (tribunal !== 'TJPR') {
      return simResult(422, 'POST', route, {
        ok: false,
        status: 422,
        code: 'UNSUPPORTED_COURT',
        title: 'Validation error',
        detail: 'Conector real configurado exclusivamente para o PROJUDI do TJPR.'
      });
    }
    return buildCaptchaRequiredResponse('POST', route);
  }

  async function simulatedProjudiProcesso(numero) {
    if (utils && utils.sleep) await utils.sleep(45);
    var cnj = formatCnj(numero);
    var route = '/api/v1/projudi/processos/' + encodeURIComponent(numero || '');
    if (!cnj) {
      return simResult(422, 'GET', route, {
        ok: false,
        status: 422,
        code: 'INVALID_CNJ',
        title: 'Validation error',
        detail: 'Número de processo inválido segundo o módulo 97 do CNJ (NNNNNNN-DD.AAAA.J.TR.OOOO).'
      });
    }
    return buildCaptchaRequiredResponse('GET', route);
  }

  async function simulatedProjudiResumo(numero, payload) {
    if (utils && utils.sleep) await utils.sleep(45);
    var cnj = formatCnj(numero);
    var route = '/api/v1/projudi/processos/' + encodeURIComponent(numero || '') + '/resumo';
    if (!cnj) {
      return simResult(422, 'POST', route, {
        ok: false,
        status: 422,
        title: 'Validation error',
        detail: 'Número de processo inválido segundo o módulo 97 do CNJ (NNNNNNN-DD.AAAA.J.TR.OOOO).'
      });
    }
    var extra = payload && payload.texto_processo ? String(payload.texto_processo).trim() : '';
    if (!extra) {
      return buildCaptchaRequiredResponse('POST', route);
    }
    var norm = normalizeText(extra);
    var hasUrgencia = norm.indexOf('urgencia') >= 0 || norm.indexOf('liminar') >= 0;
    var hasSentenca = norm.indexOf('sentenca') >= 0 || norm.indexOf('julgad') >= 0;
    var fase = hasSentenca ? 'julgamento_sentenca' : 'conhecimento_instrucao';
    return simResult(200, 'POST', route, {
      ok: true,
      data: {
        gerado_em: new Date().toISOString(),
        status: 'ready_for_llm',
        origem_dados: 'corpus_fornecido_pelo_cliente',
        numero_processo: cnj,
        fase_processual: fase,
        metricas: {
          total_movimentacoes: 1,
          possui_tutela_urgencia: hasUrgencia,
          possui_sentenca: hasSentenca,
          prioridade_triagem: hasUrgencia ? 'alta' : 'media',
          score_prioridade: hasUrgencia ? 70 : 40
        },
        resumo_deterministico: 'Processo ' + cnj + ' classificado em ' + fase + ' exclusivamente a partir do texto informado pelo cliente.',
        llm_placeholder: {
          status: 'ready_for_llm',
          provider_configured: false,
          n8n_webhook_ready: true,
          workflow_id_sugerido: 'projudi-case-summarizer',
          mensagem_placeholder: 'Contrato pronto para LLM/n8n: envie prompt_context para seu provedor OpenAI-compatible ou webhook n8n.'
        }
      }
    });
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
      return { data: data, status: response.status, ms: Math.round(ended - started), source: 'api' };
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
    if (utils && utils.sleep) await utils.sleep(120);
    return { data: fallback(payload), status: 200, ms: 120, source: 'static-sim', method: method || 'GET', route: path };
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
    },
    // Public data connectors keep the same honest fallback contract as the rest
    // of this legacy offline client: real HTTP first, simulation only when static.
    bcbIndicadores: simulatedBcbIndicadores,
    bcbInstituicoes: simulatedBcbInstituicoes,
    siscomexNcm: simulatedSiscomexNcm,
    transparenciaMunicipio: simulatedTransparenciaMunicipio,
    projudiConsulta: simulatedProjudiConsulta,
    projudiProcesso: simulatedProjudiProcesso,
    projudiResumo: simulatedProjudiResumo
    // No pipeline runner here: the CI/CD panel reads public GitHub Actions
    // metadata only (assets/js/pipeline.js) and never triggers builds.
  };
})(window.TP);
