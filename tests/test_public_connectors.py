"""Comprehensive tests for BCB, Siscomex Classif, Municipal Transparency (BRL), and real PROJUDI TJPR."""

from __future__ import annotations

import json
import threading
import unittest
from typing import Any
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from api.connectors import (
    ConnectorCaptchaRequiredError,
    ConnectorNotFoundError,
    ConnectorTTLCache,
    ConnectorValidationError,
    HttpResponse,
    MunicipalTransparencyService,
    ProjudiConnectorService,
    SiscomexNCMService,
    UpstreamConnectorError,
    compute_cnj_check_digits,
    is_valid_cnpj,
    is_valid_cpf,
    mask_cnpj,
    mask_cpf,
    mask_sensitive_text,
    parse_projudi_search_result,
    parse_sijut2_solucoes_html,
    validate_cnj_process_number,
    validate_cpf,
    validate_cpf_or_cnpj,
    validate_uf,
)
import api.server as stdlib_server


class FakeRouteTransport:
    """Deterministic stub implementing HttpTransport without real network sockets."""

    def __init__(self, routes: dict[str, Any] | None = None, *, fail_all: bool = False) -> None:
        self.routes = routes or {}
        self.fail_all = fail_all
        self.calls: list[dict[str, Any]] = []

    def request(
        self,
        url: str,
        *,
        method: str = "GET",
        params: dict[str, Any] | None = None,
        headers: dict[str, str] | None = None,
        data: bytes | None = None,
        timeout_seconds: float | None = None,
    ) -> HttpResponse:
        self.calls.append(
            {
                "url": url,
                "method": method,
                "params": params,
                "headers": headers or {},
                "data": data,
            }
        )
        if self.fail_all:
            raise UpstreamConnectorError("Simulated offline environment", status_code=503)

        for pattern, responder in self.routes.items():
            if pattern in url:
                if callable(responder):
                    return responder(
                        url=url,
                        method=method,
                        params=params,
                        headers=headers or {},
                        data=data,
                    )
                if isinstance(responder, Exception):
                    raise responder
                if isinstance(responder, HttpResponse):
                    return responder
                raw_bytes = (
                    responder.encode("utf-8")
                    if isinstance(responder, str)
                    else json.dumps(responder).encode("utf-8")
                )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "application/json; charset=utf-8"},
                    body=raw_bytes,
                )

        raise UpstreamConnectorError(f"Unmocked URL: {url}", status_code=502)


VALID_CNJ_1 = f"0001234-{compute_cnj_check_digits('0001234', '2024', '8', '16', '0130')}.2024.8.16.0130"
VALID_CNJ_2 = f"0005678-{compute_cnj_check_digits('0005678', '2024', '8', '16', '0130')}.2024.8.16.0130"

REALISTIC_TJPR_FRAMESET_HTML = """<!DOCTYPE html>
<html>
  <head><title>PROJUDI - Tribunal de Justiça do Estado do Paraná</title></head>
  <frameset id="frameSetTeste" rows="100%">
    <frame id="mainFrame" name="mainFrame"
           src="/projudi_consulta/processo/consultaPublica.do?actionType=iniciar" />
  </frameset>
</html>
"""

REALISTIC_TJPR_FORM_HTML = """<!DOCTYPE html>
<html>
  <body>
    <form id="buscaProcessoForm" name="buscaProcessoForm"
          action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar"
          method="post">
      <input type="hidden" name="pageNumber" value="1" />
      <input type="text" name="cpfCnpj" value="" />
      <input type="text" name="numeroProcesso" value="" />
      <div class="g-recaptcha"
           data-sitekey="6LcProjudiRealSiteKeyTJPR00000000000001"
           data-callback="executaRecaptchaPBC_actre_consulta_publica"></div>
      <textarea id="g-recaptcha-response" name="g-recaptcha-response"></textarea>
    </form>
  </body>
</html>
"""

REALISTIC_TJPR_RESULTS_HTML = f"""<!DOCTYPE html>
<html>
  <body>
    <div id="navigator">2 registros encontrados, mostrando de 1 até 2</div>
    <table class="resultTable">
      <tr>
        <th>Processo</th>
        <th>Partes</th>
        <th>Distribuição</th>
        <th>Classe Processual (Assunto Principal)</th>
      </tr>
      <tr class="odd">
        <td>
          <a href="/projudi_consulta/processo/consultaPublica.do?actionType=visualizar&idProcesso=991">
            {VALID_CNJ_1}
          </a>
        </td>
        <td>
          Exequente: MUNICÍPIO DE PARANAVAÍ (CNPJ 76.977.768/0001-81)<br/>
          Executado: JOÃO CARLOS PEREIRA (CPF 111.444.777-35)
        </td>
        <td>18/03/2024</td>
        <td>Execução Fiscal (IPTU / Imposto Predial e Territorial Urbano)</td>
      </tr>
      <tr class="even">
        <td>{VALID_CNJ_2}</td>
        <td>
          Autor: JOÃO CARLOS PEREIRA<br/>
          Réu: COPEL DISTRIBUIÇÃO S.A.
        </td>
        <td>09/09/2024</td>
        <td>Procedimento do Juizado Especial Cível (Indenização por Dano Moral)</td>
      </tr>
    </table>
  </body>
</html>
"""

REALISTIC_TJPR_DETAIL_HTML = """<!DOCTYPE html>
<html>
  <body>
    <table>
      <tr><td class="label">Comarca:</td><td>Comarca de Paranavaí</td></tr>
      <tr><td class="label">Vara / Juízo:</td><td>1ª Vara da Fazenda Pública de Paranavaí</td></tr>
      <tr><td class="label">Situação:</td><td>Ativo - Aguardando Pagamento / Penhora</td></tr>
      <tr><td class="label">Valor da Causa:</td><td>R$ 14.850,90</td></tr>
    </table>
    <table>
      <tr><th>Sequência</th><th>Data</th><th>Movimentação</th></tr>
      <tr><td>1</td><td>18/03/2024</td><td>Distribuído por sorteio eletrônico</td></tr>
      <tr><td>2</td><td>04/04/2024</td><td>Proferido despacho de citação - CPF 111.444.777-35</td></tr>
    </table>
  </body>
</html>
"""

REALISTIC_TJPR_EMPTY_HTML = """<!DOCTYPE html>
<html>
  <body>
    <div class="mensagem">Nenhum registro encontrado para os parâmetros informados.</div>
  </body>
</html>
"""

REALISTIC_SIJUT2_GPU_HTML = """<!DOCTYPE html>
<html>
  <body>
    <table>
      <tr>
        <th>Tipo do ato</th>
        <th>Nº do ato</th>
        <th>Órgão / unidade</th>
        <th>Publicação</th>
        <th>Ementa</th>
      </tr>
      <tr>
        <td>Solução de Consulta</td>
        <td>98081</td>
        <td>Cosit</td>
        <td>08/04/2021</td>
        <td>
          Código NCM 8471.50.90. Mercadoria: Unidade de processamento sob a forma de placa
          de circuito impresso sem saída de vídeo, comercialmente denominada Unidade de
          Processamento Gráfico (GPU) ou placa aceleradora. Dispositivos Legais: RGI 1 e RGI 6.
        </td>
      </tr>
      <tr>
        <td>Solução de Consulta</td>
        <td>46</td>
        <td>Coana</td>
        <td>26/04/2016</td>
        <td>
          Código NCM: 8471.80.00. Mercadoria: Unidade de processamento gráfico constituída
          de placa de circuito impresso com processador próprio (GPU), comercialmente
          denominada placa de vídeo.
        </td>
      </tr>
    </table>
  </body>
</html>
"""


class ValidatorsTestCase(unittest.TestCase):
    def test_cpf_cnpj_uf_and_cnj_validators(self) -> None:
        self.assertTrue(is_valid_cpf("111.444.777-35"))
        self.assertFalse(is_valid_cpf("111.111.111-11"))
        self.assertEqual(validate_cpf("11144477735"), "11144477735")
        self.assertEqual(mask_cpf("111.444.777-35"), "***.444.777-**")

        self.assertTrue(is_valid_cnpj("76.977.768/0001-81"))
        self.assertFalse(is_valid_cnpj("11.111.111/1111-11"))
        digits, doc_type = validate_cpf_or_cnpj("76.977.768/0001-81")
        self.assertEqual(digits, "76977768000181")
        self.assertEqual(doc_type, "CNPJ")
        self.assertEqual(mask_cnpj("76.977.768/0001-81"), "76.***.***/0001-**")

        self.assertEqual(validate_uf("pr"), "PR")
        with self.assertRaises(ConnectorValidationError):
            validate_uf("XX")

        dd = compute_cnj_check_digits("0001234", "2024", "8", "16", "0130")
        self.assertEqual(dd, "57")
        cnj = validate_cnj_process_number("00012345720248160130")
        self.assertEqual(cnj, "0001234-57.2024.8.16.0130")
        with self.assertRaises(ConnectorValidationError):
            validate_cnj_process_number("0001234-99.1950.0.00.0130")

        masked = mask_sensitive_text(
            "Parte: 111.444.777-35 · Empresa 76.977.768/0001-81 · eron@dominio.com"
        )
        self.assertNotIn("111.444.777-35", masked)
        self.assertNotIn("76.977.768/0001-81", masked)
        self.assertIn("***.444.777-**", masked)
        self.assertIn("76.***.***/0001-**", masked)


class ProjudiRealScraperTestCase(unittest.TestCase):
    def _make_tjpr_transport(
        self, search_html: str = REALISTIC_TJPR_RESULTS_HTML
    ) -> FakeRouteTransport:
        def handle_projudi(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            from urllib.parse import parse_qs

            if "actionType=iniciar" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={
                        "content-type": "text/html; charset=ISO-8859-1",
                        "set-cookie": "JSESSIONID=TJPRNODE01ABCDEF; Path=/projudi_consulta; Secure",
                    },
                    body=REALISTIC_TJPR_FORM_HTML.encode("iso-8859-1"),
                )
            if "actionType=pesquisar" in url and method == "POST":
                parsed_form = parse_qs((data or b"").decode("utf-8"))
                token = (parsed_form.get("g-recaptcha-response") or [""])[0]
                if not token or token == "expired-token":
                    err_html = (
                        REALISTIC_TJPR_FORM_HTML
                        + "<div class='erro'>Validação do reCAPTCHA inválida ou expirada.</div>"
                    )
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=err_html.encode("iso-8859-1"),
                    )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=search_html.encode("iso-8859-1"),
                )
            if "actionType=visualizar" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=REALISTIC_TJPR_DETAIL_HTML.encode("iso-8859-1"),
                )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={"content-type": "text/html; charset=ISO-8859-1"},
                body=REALISTIC_TJPR_FRAMESET_HTML.encode("iso-8859-1"),
            )

        return FakeRouteTransport({"consulta.tjpr.jus.br": handle_projudi})

    def test_missing_captcha_raises_structured_422_captcha_required_without_mocks(self) -> None:
        transport = self._make_tjpr_transport()
        svc = ProjudiConnectorService(transport=transport, cache=ConnectorTTLCache())

        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx:
            svc.consulta_por_cpf("111.444.777-35", tribunal="TJPR")

        err = ctx.exception
        self.assertEqual(err.status_code, 422)
        self.assertEqual(err.code, "CAPTCHA_REQUIRED")
        self.assertEqual(err.extra["site_key"], "6LcProjudiRealSiteKeyTJPR00000000000001")
        self.assertIn("consultaPublica.do?actionType=iniciar", err.extra["form_url"])
        self.assertTrue(len(err.extra["instructions"]) >= 3)

    def test_upstream_failure_raises_503_and_never_returns_fake_cases(self) -> None:
        svc = ProjudiConnectorService(
            transport=FakeRouteTransport(fail_all=True),
            cache=ConnectorTTLCache(),
        )
        with self.assertRaises(UpstreamConnectorError) as ctx:
            svc.consulta_por_cpf("111.444.777-35", tribunal="TJPR", captcha_token="tok-123")
        self.assertEqual(ctx.exception.status_code, 503)
        self.assertEqual(ctx.exception.extra["code"], "PROJUDI_UPSTREAM_UNAVAILABLE")

    def test_real_tjpr_html_scraping_for_cpf_and_cnj_detail(self) -> None:
        transport = self._make_tjpr_transport()
        svc = ProjudiConnectorService(transport=transport, cache=ConnectorTTLCache())

        res = svc.consulta_por_cpf(
            "111.444.777-35",
            tribunal="TJPR",
            captcha_token="valid-recaptcha-token-xyz",
        )
        self.assertEqual(res["modo_execucao"], "raspagem_real_projudi_tjpr")
        self.assertFalse(res["compliance"]["dados_sinteticos_ou_mock"])
        self.assertEqual(res["cpf_mascarado"], "***.444.777-**")
        self.assertEqual(res["total_processos"], 2)

        p0 = res["processos"][0]
        self.assertEqual(p0["numero_processo"], VALID_CNJ_1)
        self.assertEqual(p0["classe_processual"], "Execução Fiscal")
        self.assertIn("IPTU", p0["assunto_principal"])
        self.assertEqual(p0["data_distribuicao"], "2024-03-18")
        self.assertIn("Exequente", p0["partes_por_polo"])
        self.assertIn("Executado", p0["partes_por_polo"])
        self.assertEqual(p0["partes"][0]["polo"], "ATIVO")
        self.assertEqual(p0["partes"][1]["polo"], "PASSIVO")

        serialized = json.dumps(res, ensure_ascii=False)
        self.assertNotIn("111.444.777-35", serialized)
        self.assertNotIn("76.977.768/0001-81", serialized)

        # Evaluate uncached detail scraping directly against a fresh cache
        svc_fresh = ProjudiConnectorService(
            transport=self._make_tjpr_transport(),
            cache=ConnectorTTLCache(),
        )
        detail = svc_fresh.obter_processo(
            VALID_CNJ_1,
            captcha_token="valid-recaptcha-token-xyz",
        )
        self.assertEqual(detail["modo_execucao"], "raspagem_real_projudi_tjpr")
        self.assertEqual(detail["comarca"], "Comarca de Paranavaí")
        self.assertEqual(detail["vara"], "1ª Vara da Fazenda Pública de Paranavaí")
        self.assertEqual(detail["valor_causa_brl"], 14850.90)
        self.assertEqual(len(detail["movimentacoes"]), 2)
        self.assertIn("***.444.777-**", detail["movimentacoes"][1]["descricao"])

    def test_zero_records_html_and_resumir_processo_boundaries(self) -> None:
        parsed_empty = parse_projudi_search_result(REALISTIC_TJPR_EMPTY_HTML, "TJPR")
        self.assertEqual(parsed_empty["total_navigator"], 0)
        self.assertEqual(parsed_empty["processos"], [])

        svc = ProjudiConnectorService(
            transport=self._make_tjpr_transport(),
            cache=ConnectorTTLCache(),
        )
        with self.assertRaises(ConnectorCaptchaRequiredError):
            svc.resumir_processo(VALID_CNJ_1, {})

        summary = svc.resumir_processo(
            VALID_CNJ_1,
            {
                "texto_processo": (
                    "Deferida tutela de urgência pelo CPF 111.444.777-35; "
                    "autos conclusos para sentença."
                )
            },
        )
        self.assertEqual(summary["status"], "ready_for_llm")
        self.assertEqual(summary["origem_dados"], "corpus_fornecido_pelo_cliente")
        self.assertTrue(summary["metricas"]["possui_tutela_urgencia"])
        self.assertNotIn("111.444.777-35", summary["llm_placeholder"]["prompt_context"])


class MunicipalTransparencyMonetaryTestCase(unittest.TestCase):
    def test_offline_paranavai_contingency_has_real_brl_monetary_and_tse_77496(self) -> None:
        svc = MunicipalTransparencyService(
            transport=FakeRouteTransport(fail_all=True),
            cache=ConnectorTTLCache(),
        )
        data = svc.get_municipio("Paranavai", "PR")
        self.assertEqual(data["unidade_moeda"], "BRL")
        self.assertEqual(data["municipio"]["codigo_ibge"], "4118402")
        self.assertEqual(data["municipio"]["codigo_tse"], "77496")

        resumo = data["resumo_monetario"]
        self.assertEqual(resumo["unidade_moeda"], "BRL")
        self.assertEqual(resumo["pib_municipal_brl"], 4189765000.0)
        self.assertEqual(resumo["pib_per_capita_brl"], 45540.43)
        self.assertGreater(resumo["receitas_realizadas_brl"], 500_000_000.0)
        self.assertGreater(resumo["despesas_empenhadas_brl"], 500_000_000.0)
        self.assertEqual(resumo["bens_declarados_prefeito_brl"], 7479000.0)
        self.assertEqual(resumo["despesas_campanha_prefeito_brl"], 256896.2)

        self.assertEqual(data["executivo"]["prefeito"]["nome_urna"], "MAURÍCIO GEHLEN")
        self.assertEqual(data["executivo"]["vice_prefeito"]["partido"], "PP")
        self.assertEqual(data["legislativo"]["total_vereadores_listados"], 15)

    def test_online_ibge_siconfi_and_tse_monetary_aggregation(self) -> None:
        def responder(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            if "localidades/estados/PR/municipios" in url:
                payload: Any = [
                    {
                        "id": 4118402,
                        "nome": "Paranavaí",
                        "microrregiao": {
                            "nome": "Paranavaí",
                            "mesorregiao": {
                                "nome": "Noroeste Paranaense",
                                "UF": {"Regiao": {"nome": "Sul"}},
                            },
                        },
                    }
                ]
            elif "agregados/5938" in url:
                payload = [{"resultados": [{"series": [{"serie": {"2021": "4168436"}}]}]}]
            elif "pesquisas/indicadores" in url:
                payload = [
                    {"id": 47001, "res": [{"localidade": "411840", "res": {"2021": "45295.30"}}]},
                    {"id": 29171, "res": [{"localidade": "411840", "res": {"2025": "96209"}}]},
                    {"id": 28141, "res": [{"localidade": "411840", "res": {"2024": "572821.92"}}]},
                    {"id": 29749, "res": [{"localidade": "411840", "res": {"2024": "540219.23"}}]},
                ]
            elif "ords/siconfi/tt/dca" in url:
                anexo = (params or {}).get("no_anexo", "")
                if anexo == "DCA-Anexo I-C":
                    payload = {
                        "items": [
                            {
                                "coluna": "Receitas Brutas Realizadas",
                                "cod_conta": "ReceitasExcetoIntraOrcamentarias",
                                "valor": 562413615.32,
                            },
                            {
                                "coluna": "Receitas Brutas Realizadas",
                                "cod_conta": "RO1.7.0.0.00",
                                "valor": 397240906.84,
                            },
                        ]
                    }
                else:
                    payload = {
                        "items": [
                            {
                                "coluna": "Despesas Empenhadas",
                                "cod_conta": "TotalDespesas",
                                "valor": 540219225.49,
                            },
                            {
                                "coluna": "Despesas Pagas",
                                "cod_conta": "TotalDespesas",
                                "valor": 492030972.37,
                            },
                        ]
                    }
            elif "eleicao/buscar/PR" in url:
                payload = {"municipios": [{"codigo": "77496", "nome": "PARANAVAÍ"}]}
            elif "candidatura/listar" in url and "/11" in url:
                payload = {
                    "candidatos": [
                        {
                            "id": 160002232878,
                            "nomeUrna": "MAURICIO GEHLEN",
                            "nomeCompleto": "MAURICIO GEHLEN",
                            "numero": 55,
                            "partido": {"sigla": "PSD"},
                            "descricaoTotalizacao": "Eleito",
                        }
                    ]
                }
            elif "candidatura/listar" in url and "/12" in url:
                payload = {
                    "candidatos": [
                        {
                            "id": 160002232877,
                            "nomeUrna": "PEDRO BARALDI",
                            "nomeCompleto": "PEDRO BARALDI",
                            "numero": 55,
                            "partido": {"sigla": "PP"},
                            "descricaoTotalizacao": "Eleito",
                        }
                    ]
                }
            elif "candidatura/listar" in url and "/13" in url:
                payload = {
                    "candidatos": [
                        {
                            "id": 1001,
                            "nomeUrna": "CARLOS AUGUSTO",
                            "nomeCompleto": "CARLOS AUGUSTO",
                            "numero": 44123,
                            "partido": {"sigla": "UNIÃO"},
                            "descricaoTotalizacao": "Eleito por QP",
                        }
                    ]
                }
            elif "candidatura/buscar" in url:
                payload = {"totalDeBens": 70768329.37}
            elif "prestador/consulta" in url:
                payload = {
                    "dadosConsolidados": {
                        "totalRecebido": 819000.0,
                        "totalDespesasContratadas": 816437.39,
                        "totalDespesasPagas": 816437.39,
                    },
                    "despesas": {"limiteDeGasto1T": 817552.14},
                }
            else:
                raise UpstreamConnectorError(f"Unexpected URL {url}")

            return HttpResponse(
                url=url,
                status_code=200,
                headers={"content-type": "application/json"},
                body=json.dumps(payload).encode("utf-8"),
            )

        svc = MunicipalTransparencyService(
            transport=FakeRouteTransport(
                {
                    "ibge.gov.br": responder,
                    "tesouro.gov.br": responder,
                    "tse.jus.br": responder,
                }
            ),
            cache=ConnectorTTLCache(),
        )
        res = svc.get_municipio("Paranavaí", "PR")
        self.assertEqual(res["unidade_moeda"], "BRL")
        self.assertEqual(res["resumo_monetario"]["pib_municipal_brl"], 4168436000.0)
        self.assertEqual(
            res["execucao_orcamentaria_siconfi"]["receitas_brutas_realizadas_brl"],
            562413615.32,
        )
        self.assertEqual(
            res["resumo_monetario"]["bens_declarados_prefeito_brl"],
            70768329.37,
        )

        with self.assertRaises(ConnectorNotFoundError):
            svc.get_municipio("Cidade Inexistente XYZ", "PR")


class SiscomexClassifSearchTestCase(unittest.TestCase):
    def test_gpu_search_integrates_nomenclatura_decisoes_and_sugestoes(self) -> None:
        transport = FakeRouteTransport(
            {"normas.receita.fazenda.gov.br": REALISTIC_SIJUT2_GPU_HTML}
        )
        svc = SiscomexNCMService(transport=transport, cache=ConnectorTTLCache())
        res = svc.search_ncm("GPU", limite=10)

        self.assertGreaterEqual(res["total_encontrado"], 3)
        returned_codes = [item["codigo"] for item in res["resultados"]]
        self.assertIn("8471.80.00", returned_codes)
        self.assertIn("8471.50.90", returned_codes)
        self.assertIn("8542.31.90", returned_codes)
        self.assertEqual(res["nomenclaturas"], res["resultados"])

        self.assertGreaterEqual(res["total_decisoes"], 2)
        dec_numbers = {d["numero"] for d in res["decisoes"]}
        self.assertIn("98081", dec_numbers)
        self.assertIn("46", dec_numbers)

        self.assertGreaterEqual(res["total_sugestoes"], 3)
        sug_codes = [s["codigo_ncm"] for s in res["sugestoes"]]
        self.assertIn("8471.80.00", sug_codes)
        self.assertIn("8471.50.90", sug_codes)

    def test_gpu_search_works_completely_offline_and_ancestor_indexing_works(self) -> None:
        svc = SiscomexNCMService(
            transport=FakeRouteTransport(fail_all=True),
            cache=ConnectorTTLCache(),
        )
        gpu = svc.search_ncm("GPU", limite=5)
        self.assertGreaterEqual(gpu["total_encontrado"], 3)
        self.assertGreaterEqual(gpu["total_decisoes"], 3)
        self.assertGreaterEqual(gpu["total_sugestoes"], 3)

        cafe = svc.search_ncm("cafe nao torrado", limite=5)
        self.assertEqual(cafe["resultados"][0]["codigo"], "0901.11.10")

        notebooks = svc.search_ncm("computadores portateis", limite=5)
        self.assertEqual(notebooks["resultados"][0]["codigo"], "8471.30.12")

        solar = svc.search_ncm("inversores solares", limite=5)
        self.assertEqual(solar["resultados"][0]["codigo"], "8504.40.90")

        active_only = svc.search_ncm("85171231", somente_vigentes=True)
        self.assertEqual(active_only["total_encontrado"], 0)
        with_revoked = svc.search_ncm("85171231", somente_vigentes=False)
        self.assertEqual(with_revoked["total_encontrado"], 1)
        self.assertFalse(with_revoked["resultados"][0]["vigencia"]["vigente"])

    def test_sijut2_html_parser(self) -> None:
        rulings = parse_sijut2_solucoes_html(REALISTIC_SIJUT2_GPU_HTML)
        self.assertEqual(len(rulings), 2)
        self.assertEqual(rulings[0]["numero"], "98081")
        self.assertEqual(rulings[0]["codigo_ncm"], "8471.50.90")
        self.assertEqual(rulings[1]["codigo_ncm"], "8471.80.00")


class BCBAndStdlibServerEndToEndTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        from api.connectors import create_public_connectors

        def server_route_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            if "consulta.tjpr.jus.br" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=REALISTIC_TJPR_FORM_HTML.encode("iso-8859-1"),
                )
            raise UpstreamConnectorError("Offline fallback test", status_code=503)

        cls._orig_connectors = stdlib_server.CONNECTORS
        stdlib_server.CONNECTORS = create_public_connectors(
            transport=FakeRouteTransport(
                {
                    "consulta.tjpr.jus.br": server_route_handler,
                    "bcb.gov.br": UpstreamConnectorError("offline", status_code=503),
                    "siscomex.gov.br": UpstreamConnectorError("offline", status_code=503),
                    "receita.fazenda.gov.br": UpstreamConnectorError("offline", status_code=503),
                    "ibge.gov.br": UpstreamConnectorError("offline", status_code=503),
                    "tesouro.gov.br": UpstreamConnectorError("offline", status_code=503),
                    "tse.jus.br": UpstreamConnectorError("offline", status_code=503),
                }
            )
        )
        cls.httpd = stdlib_server.create_server("127.0.0.1", 0)
        cls.port = cls.httpd.server_address[1]
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.httpd.shutdown()
        cls.httpd.server_close()
        stdlib_server.CONNECTORS = cls._orig_connectors

    def _request_json(
        self, path: str, *, method: str = "GET", payload: dict[str, Any] | None = None
    ) -> tuple[int, dict[str, Any]]:
        url = f"http://127.0.0.1:{self.port}{path}"
        body_bytes = json.dumps(payload).encode("utf-8") if payload is not None else None
        headers = {"Accept": "application/json"}
        if body_bytes is not None:
            headers["Content-Type"] = "application/json"
        req = Request(url, data=body_bytes, headers=headers, method=method)
        try:
            with urlopen(req, timeout=5) as resp:
                return resp.status, json.loads(resp.read().decode("utf-8"))
        except HTTPError as err:
            return err.code, json.loads(err.read().decode("utf-8"))

    def test_stdlib_server_serves_gpu_ncm_monetary_transparencia_and_projudi_captcha_422(self) -> None:
        st_bcb, bcb = self._request_json("/api/v1/bcb/indicadores?ultimos=3")
        self.assertEqual(st_bcb, 200)
        self.assertIn("selic_meta", bcb["data"]["indicadores"])

        st_ncm, ncm = self._request_json("/api/v1/siscomex/ncm?q=GPU&limite=5")
        self.assertEqual(st_ncm, 200)
        codes = [r["codigo"] for r in ncm["data"]["resultados"]]
        self.assertIn("8471.80.00", codes)
        self.assertIn("8471.50.90", codes)
        self.assertGreaterEqual(ncm["data"]["total_decisoes"], 3)

        st_mun, mun = self._request_json("/api/v1/transparencia/municipio?cidade=Paranavai&uf=PR")
        self.assertEqual(st_mun, 200)
        self.assertEqual(mun["data"]["unidade_moeda"], "BRL")
        self.assertEqual(mun["data"]["municipio"]["codigo_tse"], "77496")
        self.assertEqual(mun["data"]["resumo_monetario"]["pib_municipal_brl"], 4189765000.0)

        st_proj, proj_err = self._request_json(
            "/api/v1/projudi/processos/consulta",
            method="POST",
            payload={"cpf": "111.444.777-35", "tribunal": "TJPR"},
        )
        self.assertEqual(st_proj, 422)
        self.assertEqual(proj_err["code"], "CAPTCHA_REQUIRED")
        self.assertIn("site_key", proj_err)


if __name__ == "__main__":
    unittest.main()
