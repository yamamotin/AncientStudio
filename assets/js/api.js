/* API client with live Python backend detection + realistic static-host simulation
   for GitHub Pages / file:// previews when no Python server is running. */
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
      codigo: '8471.30.12',
      codigo_numerico: '84713012',
      nivel: 'ncm_8_digitos',
      descricao: 'Computadores portáteis (notebooks, laptops e tablets com teclado), de peso inferior a 3,5 kg',
      hierarquia: {
        capitulo: { codigo: '84', descricao: 'Reatores nucleares, caldeiras, máquinas e instrumentos mecânicos' },
        posicao: { codigo: '84.71', descricao: 'Máquinas automáticas para processamento de dados e suas unidades' },
        subposicao: { codigo: '8471.30', descricao: 'Máquinas automáticas para processamento de dados, portáteis' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Camex nº 272/2021' }
    },
    {
      codigo: '8517.13.00',
      codigo_numerico: '85171300',
      nivel: 'ncm_8_digitos',
      descricao: 'Telefones inteligentes (smartphones) para redes celulares e para outras redes sem fio',
      hierarquia: {
        capitulo: { codigo: '85', descricao: 'Máquinas, aparelhos e materiais elétricos, e suas partes' },
        posicao: { codigo: '85.17', descricao: 'Aparelhos telefônicos, incluindo smartphones e roteadores' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Camex nº 272/2021' }
    },
    {
      codigo: '8504.40.90',
      codigo_numerico: '85044090',
      nivel: 'ncm_8_digitos',
      descricao: 'Outros conversores elétricos estáticos, incluindo inversores fotovoltaicos para energia solar',
      hierarquia: {
        capitulo: { codigo: '85', descricao: 'Máquinas, aparelhos e materiais elétricos, e suas partes' },
        posicao: { codigo: '85.04', descricao: 'Transformadores elétricos e conversores estáticos' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Camex nº 272/2021' }
    },
    {
      codigo: '0901.11.10',
      codigo_numerico: '09011110',
      nivel: 'ncm_8_digitos',
      descricao: 'Café não torrado, não descafeinado, em grão',
      hierarquia: {
        capitulo: { codigo: '09', descricao: 'Café, chá, mate e especiarias' },
        posicao: { codigo: '09.01', descricao: 'Café, mesmo torrado ou descafeinado' },
        subposicao: { codigo: '0901.11', descricao: 'Café não torrado, não descafeinado' }
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Camex nº 272/2021' }
    },
    {
      codigo: '1201.90.00',
      codigo_numerico: '12019000',
      nivel: 'ncm_8_digitos',
      descricao: 'Soja, mesmo triturada, exceto para semeadura',
      hierarquia: {
        capitulo: { codigo: '12', descricao: 'Sementes e frutos oleaginosos' },
        posicao: { codigo: '12.01', descricao: 'Soja, mesmo triturada' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Camex nº 272/2021' }
    },
    {
      codigo: '8703.80.00',
      codigo_numerico: '87038000',
      nivel: 'ncm_8_digitos',
      descricao: 'Outros veículos automóveis de passageiros, unicamente com motor elétrico para propulsão',
      hierarquia: {
        capitulo: { codigo: '87', descricao: 'Veículos automóveis, tratores, ciclos e suas partes' },
        posicao: { codigo: '87.03', descricao: 'Automóveis de passageiros' },
        subposicao: null
      },
      vigencia: { inicio: '2022-04-01', fim: null, vigente: true, ato_legal: 'Res Camex nº 272/2021' }
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
      municipio: { nome: 'Paranavaí', uf: 'PR', codigo_ibge: '4118402', codigo_tse: '77498', mesorregiao: 'Noroeste Paranaense' },
      prefeito: { nome_urna: 'MAURICIO GEHLEN', cargo: 'Prefeito', partido: 'PSD', numero_urna: 55, situacao: 'ELEITO' },
      vice_prefeito: { nome_urna: 'PEDRO BARALDI', cargo: 'Vice-Prefeito', partido: 'PL', numero_urna: 55, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'CARLOS AUGUSTO', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' },
        { nome_urna: 'PROFESSORA IVANY', cargo: 'Vereador', partido: 'PP', situacao: 'ELEITO POR QP' },
        { nome_urna: 'DR. LEÔNIDAS', cargo: 'Vereador', partido: 'PL', situacao: 'ELEITO POR QP' },
        { nome_urna: 'JOSIVAL MOREIRA', cargo: 'Vereador', partido: 'UNIÃO', situacao: 'ELEITO POR QP' },
        { nome_urna: 'MARIA CLARA', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR MÉDIA' }
      ]
    },
    'curitiba:PR': {
      municipio: { nome: 'Curitiba', uf: 'PR', codigo_ibge: '4106902', codigo_tse: '75353', mesorregiao: 'Metropolitana de Curitiba' },
      prefeito: { nome_urna: 'EDUARDO PIMENTEL', cargo: 'Prefeito', partido: 'PSD', numero_urna: 55, situacao: 'ELEITO' },
      vice_prefeito: { nome_urna: 'PAULO MARTINS', cargo: 'Vice-Prefeito', partido: 'PL', numero_urna: 55, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'JAIRO MARCELINO', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' },
        { nome_urna: 'MARCELO FACHINELO', cargo: 'Vereador', partido: 'PODEMOS', situacao: 'ELEITO POR QP' },
        { nome_urna: 'INDIARA BARBOSA', cargo: 'Vereador', partido: 'NOVO', situacao: 'ELEITO POR QP' },
        { nome_urna: 'GIORGIA PRATES', cargo: 'Vereador', partido: 'PT', situacao: 'ELEITO POR QP' }
      ]
    },
    'maringa:PR': {
      municipio: { nome: 'Maringá', uf: 'PR', codigo_ibge: '4115200', codigo_tse: '76910', mesorregiao: 'Norte Central Paranaense' },
      prefeito: { nome_urna: 'SILVIO BARROS', cargo: 'Prefeito', partido: 'PP', numero_urna: 11, situacao: 'ELEITO' },
      vice_prefeito: { nome_urna: 'SANDRA JACOVÓS', cargo: 'Vice-Prefeito', partido: 'PL', numero_urna: 11, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'DELEGADO LUIZ ALVES', cargo: 'Vereador', partido: 'PL', situacao: 'ELEITO POR QP' },
        { nome_urna: 'MARIO HOSSOKAWA', cargo: 'Vereador', partido: 'PP', situacao: 'ELEITO POR QP' },
        { nome_urna: 'FLÁVIO MANTOVANI', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' }
      ]
    },
    'sao paulo:SP': {
      municipio: { nome: 'São Paulo', uf: 'SP', codigo_ibge: '3550308', codigo_tse: '71072', mesorregiao: 'Metropolitana de São Paulo' },
      prefeito: { nome_urna: 'RICARDO NUNES', cargo: 'Prefeito', partido: 'MDB', numero_urna: 15, situacao: 'ELEITO' },
      vice_prefeito: { nome_urna: 'CORONEL MELLO ARAUJO', cargo: 'Vice-Prefeito', partido: 'PL', numero_urna: 15, situacao: 'ELEITO' },
      vereadores: [
        { nome_urna: 'LUCAS PAVANATO', cargo: 'Vereador', partido: 'PL', situacao: 'ELEITO POR QP' },
        { nome_urna: 'ANA CAROLINA OLIVEIRA', cargo: 'Vereador', partido: 'PODEMOS', situacao: 'ELEITO POR QP' },
        { nome_urna: 'LUNA ZARATTINI', cargo: 'Vereador', partido: 'PT', situacao: 'ELEITO POR QP' }
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

  function maskCpf(raw) {
    var d = cleanDigits(raw);
    if (d.length !== 11) return '***.***.***-**';
    return '***.' + d.slice(3, 6) + '.' + d.slice(6, 9) + '-**';
  }

  function formatCnj(raw) {
    var d = cleanDigits(raw);
    if (d.length !== 20) return null;
    return d.slice(0, 7) + '-' + d.slice(7, 9) + '.' + d.slice(9, 13) + '.' + d.slice(13, 14) + '.' + d.slice(14, 16) + '.' + d.slice(16, 20);
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
        detail: "Informe ao menos 2 caracteres em 'q' (descrição do produto ou código NCM)."
      });
    }
    var tokens = norm.split(' ').filter(Boolean);
    var matches = STATIC_NCM_CATALOG.filter(function (entry) {
      var hay = normalizeText(entry.descricao + ' ' + entry.hierarquia.capitulo.descricao + ' ' + entry.hierarquia.posicao.descricao);
      var codeMatch = digits && entry.codigo_numerico.indexOf(digits) === 0;
      var textMatch = tokens.length && tokens.every(function (t) { return hay.indexOf(t) >= 0; });
      return codeMatch || textMatch;
    });
    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        consultado_em: new Date().toISOString(),
        fonte: 'Portal Único Siscomex — Tabela Oficial NCM (SH-2022)',
        fonte_modo: 'simulacao_estatica_pages',
        termo_busca: raw,
        termo_normalizado: norm,
        total_encontrado: matches.length,
        resultados: matches
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
      profile = {
        municipio: { nome: rawCity, uf: cleanUf, codigo_ibge: '0000000', codigo_tse: '00000', observacao: 'Amostra estática — suba o backend Python para consulta online completa IBGE/TSE.' },
        prefeito: { nome_urna: 'CONSULTA ONLINE REQUER BACKEND ATIVO', cargo: 'Prefeito', partido: 'PSD', situacao: 'ELEITO' },
        vice_prefeito: { nome_urna: 'VICE-PREFEITO ELEITO', cargo: 'Vice-Prefeito', partido: 'MDB', situacao: 'ELEITO' },
        vereadores: [
          { nome_urna: 'VEREADOR 01 (MODO ESTÁTICO)', cargo: 'Vereador', partido: 'PSD', situacao: 'ELEITO POR QP' }
        ]
      };
    }
    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        consultado_em: new Date().toISOString(),
        fonte: 'IBGE API de Localidades v1 + TSE Dados Abertos (DivulgaCandContas 2024)',
        fonte_modo: 'simulacao_estatica_pages',
        mandato: '2025-2028',
        municipio: profile.municipio,
        executivo: { prefeito: profile.prefeito, vice_prefeito: profile.vice_prefeito },
        legislativo: { total_vereadores_listados: profile.vereadores.length, vereadores: profile.vereadores }
      }
    });
  }

  async function simulatedProjudiConsulta(payload) {
    if (utils && utils.sleep) await utils.sleep(45);
    var body = payload || {};
    var route = '/api/v1/projudi/processos/consulta';
    if (!isValidCpf(body.cpf)) {
      return simResult(422, 'POST', route, {
        ok: false,
        status: 422,
        title: 'Validation error',
        detail: 'CPF inválido: verifique os 11 dígitos e os dígitos verificadores.'
      });
    }
    var tribunal = String(body.tribunal || 'TJPR').toUpperCase();
    return simResult(200, 'POST', route, {
      ok: true,
      data: {
        consultado_em: new Date().toISOString(),
        tribunal: tribunal,
        cpf_mascarado: maskCpf(body.cpf),
        modo_execucao: 'sandbox_demonstracao',
        politica_privacidade: 'LGPD_MASKED_PUBLIC_RECORDS_ONLY',
        total_processos: 2,
        processos: [
          {
            numero_processo: '0001234-42.2024.8.16.0130',
            tribunal: tribunal,
            classe: 'Procedimento Comum Cível',
            assunto: 'Indenização por Dano Material / Inadimplemento Contratual',
            vara_comarca: '1ª Vara Cível e da Fazenda Pública de Paranavaí — PR',
            situacao: 'Ativo — Concluso para Sentença'
          },
          {
            numero_processo: '0008421-18.2025.8.16.0001',
            tribunal: tribunal,
            classe: 'Cumprimento de Sentença',
            assunto: 'Repetição de Indébito Tributário / Tarifa Bancária',
            vara_comarca: '4ª Vara Cível de Curitiba — PR',
            situacao: 'Ativo — Fase de Cumprimento / Penhora Online'
          }
        ]
      }
    });
  }

  async function simulatedProjudiProcesso(numero) {
    if (utils && utils.sleep) await utils.sleep(45);
    var cnj = formatCnj(numero);
    var route = '/api/v1/projudi/processos/' + encodeURIComponent(numero || '');
    if (!cnj) {
      return simResult(422, 'GET', route, {
        ok: false,
        status: 422,
        title: 'Validation error',
        detail: 'Número de processo inválido. Use o padrão CNJ de 20 dígitos (NNNNNNN-DD.AAAA.J.TR.OOOO).'
      });
    }
    return simResult(200, 'GET', route, {
      ok: true,
      data: {
        consultado_em: new Date().toISOString(),
        modo_execucao: 'sandbox_demonstracao',
        numero_processo: cnj,
        tribunal: 'TJPR',
        classe: 'Procedimento Comum Cível',
        assunto_principal: 'Indenização por Dano Material / Inadimplemento Contratual',
        comarca: 'Comarca de Paranavaí — PR',
        vara: '1ª Vara Cível e da Fazenda Pública de Paranavaí',
        situacao: 'Ativo — Concluso para Sentença',
        partes: [
          { polo: 'ATIVO', tipo_participacao: 'Autor', nome: 'Comercial Agrícola Noroeste Ltda.', documento_mascarado: '14.***.***/0001-**' },
          { polo: 'PASSIVO', tipo_participacao: 'Réu', nome: 'J. R. S. Logística Integrada', documento_mascarado: '***.444.777-**' }
        ],
        movimentacoes: [
          { sequencia: 1, data: '2024-03-18', tipo: 'Distribuição', descricao: 'Distribuído por sorteio automático à 1ª Vara Cível de Paranavaí.' },
          { sequencia: 2, data: '2024-04-02', tipo: 'Decisão Interlocutória', descricao: 'Deferida parcialmente tutela de urgência e determinada citação.' },
          { sequencia: 3, data: '2026-10-29', tipo: 'Conclusão', descricao: 'Autos conclusos ao magistrado para prolação de sentença de mérito.' }
        ]
      }
    });
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
        detail: 'Número de processo inválido. Use o padrão CNJ de 20 dígitos (NNNNNNN-DD.AAAA.J.TR.OOOO).'
      });
    }
    var extra = payload && payload.texto_processo ? String(payload.texto_processo) : '';
    var norm = normalizeText(extra);
    var hasUrgencia = norm.indexOf('urgencia') >= 0 || norm.indexOf('liminar') >= 0;
    return simResult(200, 'POST', route, {
      ok: true,
      data: {
        gerado_em: new Date().toISOString(),
        status: 'ready_for_llm',
        numero_processo: cnj,
        fase_processual: 'julgamento_sentenca',
        metricas: {
          total_movimentacoes: 3,
          possui_tutela_urgencia: hasUrgencia,
          possui_sentenca: true,
          prioridade_triagem: hasUrgencia ? 'alta' : 'media',
          score_prioridade: hasUrgencia ? 70 : 45
        },
        resumo_deterministico: 'Processo ' + cnj + ' em fase de julgamento_sentenca. Triagem determinística concluída e pronta para sumarização LLM/n8n.',
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
    try {
      var response = await fetch(path, options);
      var data = await response.json();
      if (!response.ok && response.status !== 422) throw new Error('HTTP ' + response.status);
      var ended = window.performance ? performance.now() : Date.now();
      return { data: data, status: response.status, ms: Math.round(ended - started), source: 'api' };
    } catch (error) {
      return null;
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
    bcbIndicadores: simulatedBcbIndicadores,
    bcbInstituicoes: simulatedBcbInstituicoes,
    siscomexNcm: simulatedSiscomexNcm,
    transparenciaMunicipio: simulatedTransparenciaMunicipio,
    projudiConsulta: simulatedProjudiConsulta,
    projudiProcesso: simulatedProjudiProcesso,
    projudiResumo: simulatedProjudiResumo,
    runPipeline: function (forceFailure) {
      if (mode !== 'api') return Promise.resolve(null);
      return request('/api/v1/pipeline/run', 'POST', { force_failure: Boolean(forceFailure) });
    }
  };
})(window.TP);
