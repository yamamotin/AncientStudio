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
                body_str = (data or b"").decode("ascii", errors="replace")
                if method == "POST" and "SOLVED_STDLIB_TOKEN" in body_str:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=REALISTIC_TJPR_RESULTS_HTML.encode("iso-8859-1"),
                    )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={
                        "content-type": "text/html; charset=ISO-8859-1",
                        "set-cookie": "JSESSIONID=STDLIB_SRV_01; Path=/projudi_consulta",
                    },
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
        self.assertTrue(proj_err["challenge_id"].startswith("cap_"))
        self.assertEqual(proj_err["provider"], "recaptcha")
        self.assertEqual(proj_err["connector"], "projudi")
        self.assertEqual(proj_err["resolve_endpoint"], "/api/v1/captcha/resolve")

        cid = proj_err["challenge_id"]
        st_meta, meta = self._request_json(f"/api/v1/captcha/challenges/{cid}")
        self.assertEqual(st_meta, 200)
        self.assertEqual(meta["data"]["challenge_id"], cid)

        st_res, res_body = self._request_json(
            "/api/v1/captcha/resolve",
            method="POST",
            payload={"challenge_id": cid, "captcha_token": "SOLVED_STDLIB_TOKEN"},
        )
        self.assertEqual(st_res, 200)
        self.assertTrue(res_body["ok"])
        self.assertTrue(res_body["data"]["captcha_resolved"])
        self.assertEqual(res_body["data"]["total_processos"], 2)
        self.assertEqual(
            res_body["data"]["processos"][0]["numero_processo"], VALID_CNJ_1
        )


class InteractiveCaptchaRoundTripTestCase(unittest.TestCase):
    """End-to-end verification of 422 CAPTCHA_REQUIRED -> popup solution -> real query."""

    def test_projudi_challenge_store_reuses_jsessionid_and_completes_real_scrape(self) -> None:
        from api.connectors import create_public_connectors

        bootstrap_count = 0
        submitted_cookies: list[str] = []
        submitted_bodies: list[str] = []

        def tjpr_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            nonlocal bootstrap_count
            if method == "GET" and "actionType=visualizar" not in url:
                bootstrap_count += 1
                sid = f"JSESSIONID_BOOT_{bootstrap_count}"
                html = (
                    REALISTIC_TJPR_FRAMESET_HTML
                    if "consultaPublica.do" not in url
                    else REALISTIC_TJPR_FORM_HTML
                )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={
                        "content-type": "text/html; charset=ISO-8859-1",
                        "set-cookie": f"JSESSIONID={sid}; Path=/projudi_consulta",
                    },
                    body=html.encode("iso-8859-1"),
                )

            if method == "POST" and "actionType=pesquisar" in url:
                cookie_hdr = headers.get("Cookie", "")
                body_str = (data or b"").decode("ascii", errors="replace")
                submitted_cookies.append(cookie_hdr)
                submitted_bodies.append(body_str)
                # Reject wrong token with TJPR CAPTCHA error HTML
                if "g-recaptcha-response=BAD_TOKEN" in body_str:
                    err_html = (
                        REALISTIC_TJPR_FORM_HTML
                        + "<div class='error'>Validação do reCAPTCHA inválida.</div>"
                    )
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=err_html.encode("iso-8859-1"),
                    )
                # Require exact JSESSIONID from initial bootstrap + solved token
                if "JSESSIONID=JSESSIONID_BOOT_2" in cookie_hdr and "VALID_TOKEN" in body_str:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=REALISTIC_TJPR_RESULTS_HTML.encode("iso-8859-1"),
                    )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=REALISTIC_TJPR_FORM_HTML.encode("iso-8859-1"),
                )

            raise UpstreamConnectorError(f"Unexpected URL {url}", status_code=503)

        registry = create_public_connectors(
            transport=FakeRouteTransport({"consulta.tjpr.jus.br": tjpr_handler})
        )

        # Step 1: Initial query raises standardized 422 CAPTCHA_REQUIRED
        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx:
            registry.projudi.consulta_por_cpf("111.444.777-35", tribunal="TJPR")

        err = ctx.exception
        self.assertEqual(err.status_code, 422)
        self.assertEqual(err.code, "CAPTCHA_REQUIRED")
        cid1 = err.extra["challenge_id"]
        self.assertTrue(cid1.startswith("cap_"))
        self.assertEqual(err.extra["provider"], "recaptcha")
        self.assertEqual(err.extra["session_cookie"], "JSESSIONID=JSESSIONID_BOOT_2")
        self.assertEqual(err.extra["consulta_payload"]["cpf_mascarado"], "***.444.777-**")
        self.assertNotIn("cpf", err.extra["consulta_payload"])
        self.assertEqual(bootstrap_count, 2)  # frameset + mainFrame

        # Public metadata endpoint returns active challenge without leaking raw CPF
        meta = registry.get_captcha_challenge(cid1)
        self.assertEqual(meta["challenge_id"], cid1)
        self.assertNotIn("11144477735", json.dumps(meta))

        # Step 2: Invalid token consumes cid1 and issues a fresh challenge (no extra bootstrap GET!)
        with self.assertRaises(ConnectorCaptchaRequiredError) as retry_ctx:
            registry.resolve_captcha(challenge_id=cid1, captcha_token="BAD_TOKEN")

        cid2 = retry_ctx.exception.extra["challenge_id"]
        self.assertNotEqual(cid1, cid2)
        self.assertTrue(retry_ctx.exception.extra["challenge_data"]["rejected_previous_attempt"])
        self.assertEqual(bootstrap_count, 2)  # Reused stored session without re-bootstrapping!
        with self.assertRaises(ConnectorNotFoundError):
            registry.get_captcha_challenge(cid1)

        # Step 3: Valid token completes the real TJPR query using stored CPF + JSESSIONID
        completed = registry.resolve_captcha(challenge_id=cid2, captcha_token="VALID_TOKEN")
        self.assertTrue(completed["captcha_resolved"])
        self.assertTrue(completed["captcha_resumed"])
        self.assertEqual(completed["modo_execucao"], "raspagem_real_projudi_tjpr")
        self.assertEqual(completed["total_processos"], 2)
        self.assertEqual(completed["processos"][0]["numero_processo"], VALID_CNJ_1)
        self.assertIn("JSESSIONID=JSESSIONID_BOOT_2", submitted_cookies[-1])
        self.assertIn("cpfCnpj=11144477735", submitted_bodies[-1])
        self.assertEqual(bootstrap_count, 2)

        # Challenge is one-time and consumed after real completion
        with self.assertRaises(ConnectorNotFoundError):
            registry.get_captcha_challenge(cid2)

    def test_siscomex_waf_image_captcha_fetches_base64_and_resumes_real_ncm_query(self) -> None:
        from api.connectors import create_public_connectors

        fake_png = b"\x89PNG\r\n\x1a\nCAPTCHA_BYTES"
        waf_html = """<!DOCTYPE html>
        <html>
          <body>
            <form action="/classif/api/publico/nomenclatura/download/json" method="get">
              <input type="hidden" name="waf_nonce" value="nonce-987" />
              <label>Digite os caracteres da imagem abaixo:</label>
              <img src="/waf/captcha-img.png" alt="captcha" />
              <input type="text" name="cod_captcha" placeholder="Código da imagem" />
            </form>
          </body>
        </html>
        """
        image_cookie_seen: list[str] = []

        def siscomex_waf_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            cookie_hdr = headers.get("Cookie", "")
            if "/waf/captcha-img.png" in url:
                image_cookie_seen.append(cookie_hdr)
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "image/png"},
                    body=fake_png,
                )
            # Unlocked when WAF session cookie + solved cod_captcha are sent
            if "WAF_SID=sec999" in cookie_hdr and (
                (params and params.get("cod_captcha") == "X7K9P")
                or headers.get("X-Captcha-Response") == "X7K9P"
            ):
                live_catalog = {
                    "Data_Ultima_Atualizacao_NCM": "25/11/2026",
                    "Ato": "Resolução Gecex nº 926/2026",
                    "Nomenclaturas": [
                        {
                            "Codigo": "84",
                            "Descricao": "Reatores nucleares, caldeiras, máquinas",
                            "Data_Inicio": "01/04/2022",
                            "Data_Fim": "31/12/9999",
                        },
                        {
                            "Codigo": "84.71",
                            "Descricao": "Máquinas automáticas para processamento de dados",
                            "Data_Inicio": "01/04/2022",
                            "Data_Fim": "31/12/9999",
                        },
                        {
                            "Codigo": "8471.80.00",
                            "Descricao": "Outras unidades de máquinas automáticas para processamento de dados",
                            "Data_Inicio": "01/04/2022",
                            "Data_Fim": "31/12/9999",
                        },
                    ],
                }
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "application/json; charset=utf-8"},
                    body=json.dumps(live_catalog).encode("utf-8"),
                )

            # Simulate HTTP 403 WAF HTML CAPTCHA challenge (must NOT fall back to offline seed!)
            err_resp = HttpResponse(
                url=url,
                status_code=403,
                headers={
                    "content-type": "text/html; charset=utf-8",
                    "set-cookie": "WAF_SID=sec999; Path=/",
                },
                body=waf_html.encode("utf-8"),
            )
            raise UpstreamConnectorError(
                "HTTP 403 WAF Challenge",
                status_code=403,
                http_response=err_resp,
            )

        registry = create_public_connectors(
            transport=FakeRouteTransport(
                {
                    "portalunico.siscomex.gov.br": siscomex_waf_handler,
                    "receita.fazenda.gov.br": HttpResponse(
                        url="https://normas.receita.fazenda.gov.br/sijut2consulta/consulta.action",
                        status_code=200,
                        headers={"content-type": "text/html; charset=utf-8"},
                        body=REALISTIC_SIJUT2_GPU_HTML.encode("utf-8"),
                    ),
                }
            )
        )

        # Step 1: 403 WAF HTML CAPTCHA raises 422 CAPTCHA_REQUIRED instead of offline seed fallback
        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx:
            registry.siscomex.search_ncm("GPU", limite=5)

        cap_err = ctx.exception
        self.assertEqual(cap_err.status_code, 422)
        self.assertEqual(cap_err.code, "CAPTCHA_REQUIRED")
        self.assertEqual(cap_err.extra["provider"], "image")
        self.assertEqual(cap_err.extra["response_field"], "cod_captcha")
        self.assertEqual(cap_err.extra["session_cookie"], "WAF_SID=sec999")
        self.assertTrue(
            cap_err.extra["challenge_data"]["image_data_uri"].startswith(
                "data:image/png;base64,"
            )
        )
        self.assertEqual(image_cookie_seen, ["WAF_SID=sec999"])

        # Step 2: Resolving via unified resolver completes REAL online Siscomex query
        resumed = registry.resolve_captcha(
            challenge_id=cap_err.extra["challenge_id"],
            captcha_solution="X7K9P",
        )
        self.assertTrue(resumed["captcha_resolved"])
        self.assertTrue(resumed["captcha_resumed"])
        self.assertEqual(resumed["fonte_modo"], "online_portal_unico_siscomex")
        self.assertEqual(resumed["termo_busca"], "GPU")
        self.assertEqual(resumed["resultados"][0]["codigo"], "8471.80.00")

    def test_projudi_struts_image_captcha_popup_metadata_refresh_and_real_resumption(self) -> None:
        from api.connectors import create_public_connectors

        png_attempt_1 = b"\x89PNG\r\n\x1a\nPROJUDI_IMG_CHALLENGE_1"
        png_attempt_2 = b"\x89PNG\r\n\x1a\nPROJUDI_IMG_CHALLENGE_2"

        struts_img_form_1 = """<!DOCTYPE html>
        <html>
          <body>
            <form id="buscaProcessoForm" name="buscaProcessoForm"
                  action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar"
                  method="post">
              <input type="hidden" name="org.apache.struts.taglib.html.TOKEN" value="struts-tok-1" />
              <input type="hidden" name="tipoConsulta" value="1" />
              <img id="imagemCaptcha" src="/projudi_consulta/captcha.svl?d=1" alt="Código de segurança" />
              <input type="text" name="resposta" id="resposta" placeholder="Digite os caracteres" />
            </form>
          </body>
        </html>
        """
        struts_img_form_2 = """<!DOCTYPE html>
        <html>
          <body>
            <div class="erro">Código de segurança inválido.</div>
            <form id="buscaProcessoForm" name="buscaProcessoForm"
                  action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar"
                  method="post">
              <input type="hidden" name="org.apache.struts.taglib.html.TOKEN" value="struts-tok-2" />
              <input type="hidden" name="tipoConsulta" value="1" />
              <img id="imagemCaptcha" src="/projudi_consulta/captcha.svl?d=2" alt="Código de segurança" />
              <input type="text" name="resposta" id="resposta" placeholder="Novo código" />
            </form>
          </body>
        </html>
        """

        img_requests: list[tuple[str, str]] = []
        post_bodies: list[str] = []

        def projudi_img_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            cookie_hdr = headers.get("Cookie", "")
            if "captcha.svl" in url:
                img_requests.append((url, cookie_hdr))
                body_bytes = png_attempt_2 if "d=2" in url else png_attempt_1
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "image/png"},
                    body=body_bytes,
                )
            if method == "GET" and url.rstrip("/").endswith("/projudi_consulta"):
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={
                        "content-type": "text/html; charset=ISO-8859-1",
                        "set-cookie": "JSESSIONID=PROJUDI_IMG_1; Path=/projudi_consulta",
                    },
                    body=REALISTIC_TJPR_FRAMESET_HTML.encode("iso-8859-1"),
                )
            if method == "GET" and "actionType=iniciar" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=struts_img_form_1.encode("iso-8859-1"),
                )
            if method == "POST" and "consultaPublica.do" in url:
                form_body = (data or b"").decode("ascii", errors="replace")
                post_bodies.append(form_body)
                if "resposta=A7K9P2" in form_body and "PROJUDI_IMG_1" in cookie_hdr:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=REALISTIC_TJPR_RESULTS_HTML.encode("iso-8859-1"),
                    )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=struts_img_form_2.encode("iso-8859-1"),
                )
            raise UpstreamConnectorError(f"Unexpected URL: {url}", status_code=503)

        registry = create_public_connectors(
            transport=FakeRouteTransport({"consulta.tjpr.jus.br": projudi_img_handler})
        )

        # 1. Initial CPF lookup returns compact-popup-ready 422 CAPTCHA_REQUIRED with PNG data URI
        with self.assertRaises(ConnectorCaptchaRequiredError) as first_ctx:
            registry.projudi.consulta_por_cpf("111.444.777-35", tribunal="TJPR")

        err1 = first_ctx.exception
        self.assertEqual(err1.status_code, 422)
        self.assertEqual(err1.code, "CAPTCHA_REQUIRED")
        self.assertEqual(err1.extra["provider"], "image")
        self.assertEqual(err1.extra["response_field"], "resposta")
        self.assertEqual(err1.extra["expected_param"], "captcha_token")
        self.assertEqual(err1.extra["accepted_params"], ["captcha_token", "captcha_solution"])
        self.assertEqual(err1.extra["session_cookie"], "JSESSIONID=PROJUDI_IMG_1")
        self.assertTrue(err1.extra["image_data_uri"].startswith("data:image/png;base64,"))
        self.assertEqual(err1.extra["captcha_image"], err1.extra["image_data_uri"])
        self.assertEqual(
            err1.extra["image_endpoint"],
            f"/api/v1/captcha/challenges/{err1.extra['challenge_id']}/image",
        )
        self.assertEqual(err1.extra["popup"]["mode"], "image")
        self.assertEqual(err1.extra["popup"]["response_field"], "resposta")
        self.assertEqual(err1.extra["popup"]["expected_param"], "captcha_token")
        self.assertEqual(err1.extra["popup"]["image_data_uri"], err1.extra["image_data_uri"])
        # LGPD check: raw CPF never serialized in 422 payload
        self.assertNotIn("cpf", err1.extra["consulta_payload"])
        self.assertEqual(err1.extra["consulta_payload"]["cpf_mascarado"], "***.444.777-**")
        # Binary image helper returns exact PNG bytes
        raw_img, raw_mime = registry.get_captcha_challenge_image(err1.extra["challenge_id"])
        self.assertEqual(raw_img, png_attempt_1)
        self.assertEqual(raw_mime, "image/png")

        # 2. Wrong code rotates to new d=2 image and refreshes image_base64 + Struts token
        with self.assertRaises(ConnectorCaptchaRequiredError) as retry_ctx:
            registry.projudi.consulta_por_cpf(
                challenge_id=err1.extra["challenge_id"],
                captcha_token="WRONG1",
            )
        err2 = retry_ctx.exception
        self.assertNotEqual(err2.extra["challenge_id"], err1.extra["challenge_id"])
        self.assertNotEqual(err2.extra["image_base64"], err1.extra["image_base64"])
        raw_img_2, _ = registry.get_captcha_challenge_image(err2.extra["challenge_id"])
        self.assertEqual(raw_img_2, png_attempt_2)

        # 3. Correct solution completes real TJPR scrape using rotated Struts token + JSESSIONID
        done = registry.projudi.consulta_por_cpf(
            challenge_id=err2.extra["challenge_id"],
            captcha_token="A7K9P2",
        )
        self.assertTrue(done["captcha_resumed"])
        self.assertTrue(done["captcha_token_informado"])
        self.assertFalse(done["compliance"]["dados_sinteticos_ou_mock"])
        self.assertEqual(done["total_processos"], 2)
        self.assertIn("resposta=A7K9P2", post_bodies[-1])
        self.assertIn("org.apache.struts.taglib.html.TOKEN=struts-tok-2", post_bodies[-1])
        self.assertEqual(len(img_requests), 2)

    def test_unsafe_svg_captcha_image_is_blocked_for_popup_security(self) -> None:
        from api.connectors.captcha import CaptchaChallengeStore

        malicious_svg = b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'
        store = CaptchaChallengeStore()
        ch = store.issue_challenge(
            connector="projudi",
            operation="consulta_por_cpf",
            provider="image",
            challenge_url="https://consulta.tjpr.jus.br/projudi_consulta/form.do",
            image_url="https://consulta.tjpr.jus.br/projudi_consulta/captcha.svl",
            resume_endpoint="/api/v1/projudi/processos/consulta",
            transport=FakeRouteTransport(
                {
                    "captcha.svl": HttpResponse(
                        url="https://consulta.tjpr.jus.br/projudi_consulta/captcha.svl",
                        status_code=200,
                        headers={"content-type": "image/svg+xml"},
                        body=malicious_svg,
                    )
                }
            ),
        )
        pub = ch.to_public_payload()
        self.assertIsNone(pub.get("image_data_uri"))
        self.assertIsNone(pub.get("image_base64"))

    def test_projudi_recaptcha_fallback_image_mirroring_and_in_popup_exchange(self) -> None:
        from api.connectors import create_public_connectors

        png_challenge_1 = b"\x89PNG\r\n\x1a\nFALLBACK_GRID_IMG_1"
        png_challenge_2 = b"\x89PNG\r\n\x1a\nFALLBACK_GRID_IMG_2"
        minted_token = "03AFcWeA_REAL_MINTED_RECAPTCHA_VERIFICATION_TOKEN_" + ("X" * 160)
        fallback_posts: list[str] = []
        projudi_posts: list[tuple[str, str]] = []

        fallback_html_1 = """
        <html><body>
          <div class="rc-imageselect-desc-no-canonical">Selecione todos os quadros com semáforos</div>
          <img class="fbc-imageselect-payload" src="/recaptcha/api2/payload?c=FB_C_1&amp;k=6LcTestKey1234567890" />
          <form method="post">
            <input type="hidden" name="c" value="FB_C_1" />
            <input type="checkbox" name="response" value="0" />
            <input type="checkbox" name="response" value="3" />
            <input type="checkbox" name="response" value="6" />
          </form>
        </body></html>
        """
        fallback_html_2 = """
        <html><body>
          <div class="rc-imageselect-desc-no-canonical">Tente novamente: selecione faixas de pedestres</div>
          <img class="fbc-imageselect-payload" src="/recaptcha/api2/payload?c=FB_C_2&amp;k=6LcTestKey1234567890" />
          <form method="post">
            <input type="hidden" name="c" value="FB_C_2" />
            <input type="checkbox" name="response" value="1" />
          </form>
        </body></html>
        """
        fallback_verified_html = f"""
        <html><body>
          <textarea class="fbc-verification-token" readonly>{minted_token}</textarea>
        </body></html>
        """

        def google_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            _ = params, headers
            if method == "GET" and "api/fallback" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=utf-8"},
                    body=fallback_html_1.encode("utf-8"),
                )
            if method == "GET" and "api2/payload" in url:
                payload_bytes = png_challenge_2 if "FB_C_2" in url else png_challenge_1
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "image/png"},
                    body=payload_bytes,
                )
            if method == "POST" and "api/fallback" in url:
                raw_form = (data or b"").decode("utf-8", errors="replace")
                fallback_posts.append(raw_form)
                if "c=FB_C_2" in raw_form and "response=1" in raw_form:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=utf-8"},
                        body=fallback_verified_html.encode("utf-8"),
                    )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=utf-8"},
                    body=fallback_html_2.encode("utf-8"),
                )
            raise UpstreamConnectorError(f"Unexpected Google URL: {url}", status_code=503)

        def tjpr_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            _ = params
            if method == "GET":
                html = (
                    REALISTIC_TJPR_FRAMESET_HTML
                    if "consultaPublica.do" not in url
                    else REALISTIC_TJPR_FORM_HTML
                )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={
                        "content-type": "text/html; charset=ISO-8859-1",
                        "set-cookie": "JSESSIONID=TJPR_FB_SID_1; Path=/projudi_consulta",
                    },
                    body=html.encode("iso-8859-1"),
                )
            if method == "POST" and "actionType=pesquisar" in url:
                body_str = (data or b"").decode("ascii", errors="replace")
                cookie_str = headers.get("Cookie", "")
                projudi_posts.append((cookie_str, body_str))
                if "JSESSIONID=TJPR_FB_SID_1" in cookie_str and minted_token in body_str:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=REALISTIC_TJPR_RESULTS_HTML.encode("iso-8859-1"),
                    )
            raise UpstreamConnectorError(f"Unexpected TJPR request {method} {url}", status_code=503)

        registry = create_public_connectors(
            transport=FakeRouteTransport(
                {
                    "consulta.tjpr.jus.br": tjpr_handler,
                    "www.google.com": google_handler,
                }
            )
        )

        # 1. Initial call returns 422 with mirrored PNG Base64, expires_in_seconds, and in-popup guidance
        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx1:
            registry.projudi.consulta_por_cpf("111.444.777-35", tribunal="TJPR")

        err1 = ctx1.exception
        self.assertEqual(err1.status_code, 422)
        self.assertEqual(err1.code, "CAPTCHA_REQUIRED")
        self.assertTrue(err1.extra["captcha_image"].startswith("data:image/png;base64,"))
        self.assertEqual(err1.extra["image_data_url"], err1.extra["captcha_image"])
        self.assertIsNotNone(err1.extra["image_base64"])
        self.assertEqual(err1.extra["session_cookie"], "JSESSIONID=TJPR_FB_SID_1")
        self.assertIn("consultaPublica.do?actionType=iniciar", err1.extra["form_url"])
        self.assertGreater(err1.extra["expires_in_seconds"], 0)
        self.assertLessEqual(err1.extra["expires_in_seconds"], 300)
        self.assertIn("semáforos", err1.extra["challenge_text"])
        # Secret fallback 'c' token must never leak to client JSON
        self.assertNotIn("FB_C_1", json.dumps(err1.extra))
        # Instructions must NEVER ask the user to leave the portfolio or open external portal
        joined_inst = " ".join(err1.extra["instructions"]).lower()
        self.assertNotIn("acesse o formulário público", joined_inst)
        self.assertIn("popup", joined_inst)

        # 2. Wrong popup grid answer refreshes image without losing TJPR JSESSIONID
        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx2:
            registry.projudi.consulta_por_cpf(
                challenge_id=err1.extra["challenge_id"],
                captcha_token="9",
            )
        err2 = ctx2.exception
        self.assertNotEqual(err2.extra["challenge_id"], err1.extra["challenge_id"])
        self.assertNotEqual(err2.extra["image_base64"], err1.extra["image_base64"])
        self.assertEqual(err2.extra["session_cookie"], "JSESSIONID=TJPR_FB_SID_1")
        self.assertTrue(err2.extra["challenge_data"]["rejected_previous_attempt"])

        # 3. Correct 1-based tile answer '2' (-> 0-based '1') mints g-recaptcha-response & completes scrape
        completed = registry.projudi.consulta_por_cpf(
            challenge_id=err2.extra["challenge_id"],
            captcha_token="2",
        )
        self.assertEqual(completed["modo_execucao"], "raspagem_real_projudi_tjpr")
        self.assertFalse(completed["compliance"]["dados_sinteticos_ou_mock"])
        self.assertEqual(completed["total_processos"], 2)
        self.assertIn("response=1", fallback_posts[-1])
        self.assertEqual(len(projudi_posts), 1)
        self.assertIn("JSESSIONID=TJPR_FB_SID_1", projudi_posts[0][0])

    def test_script_assigned_captcha_servlet_and_stateless_cookie_resume(self) -> None:
        from api.connectors import create_public_connectors

        png_bytes = b"\x89PNG\r\n\x1a\nJS_SERVLET_PNG"
        js_form_html = """
        <html><body>
          <form id="buscaProcessoForm" action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar" method="post">
            <input type="hidden" name="actionType" value="pesquisar" />
            <input type="text" name="codCaptcha" placeholder="Digite o código exibido" />
          </form>
          <script>
            var imgEl = document.getElementById('imgSeg');
            imgEl.src = '/projudi_consulta/gerarCaptcha.do?seed=42';
          </script>
        </body></html>
        """
        seen_cookies: list[str] = []

        def handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            _ = params
            if method == "GET" and "gerarCaptcha.do" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "image/png"},
                    body=png_bytes,
                )
            if method == "POST" and "actionType=pesquisar" in url:
                cookie_hdr = headers.get("Cookie", "")
                body_str = (data or b"").decode("ascii", errors="replace")
                seen_cookies.append(cookie_hdr)
                if "JSESSIONID=STATELESS_SID_9" in cookie_hdr and "codCaptcha=K8M2P" in body_str:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=REALISTIC_TJPR_RESULTS_HTML.encode("iso-8859-1"),
                    )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={
                    "content-type": "text/html; charset=ISO-8859-1",
                    "set-cookie": "JSESSIONID=BOOT_OTHER; Path=/projudi_consulta",
                },
                body=js_form_html.encode("iso-8859-1"),
            )

        registry = create_public_connectors(
            transport=FakeRouteTransport({"consulta.tjpr.jus.br": handler})
        )

        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx:
            registry.projudi.consulta_por_cpf("111.444.777-35", tribunal="TJPR")
        err = ctx.exception
        self.assertEqual(err.extra["provider"], "image")
        self.assertEqual(err.extra["response_field"], "codCaptcha")
        self.assertIn("gerarCaptcha.do", err.extra["image_url"])
        self.assertTrue(err.extra["image_data_url"].startswith("data:image/png;base64,"))

        # Stateless resumption passing cpf + session_cookie + captcha_token without challenge_id
        res = registry.projudi.consulta_por_cpf(
            "111.444.777-35",
            tribunal="TJPR",
            session_cookie="JSESSIONID=STATELESS_SID_9",
            captcha_token="K8M2P",
        )
        self.assertEqual(res["total_processos"], 2)
        self.assertFalse(res["compliance"]["dados_sinteticos_ou_mock"])
        self.assertIn("JSESSIONID=STATELESS_SID_9", seen_cookies[-1])

    def test_projudi_http_reverse_proxy_contextual_image_and_recaptcha_attestation_reason(
        self,
    ) -> None:
        import base64
        from api.connectors import create_public_connectors
        from api.connectors.captcha import CaptchaChallengeStore

        png_bytes = b"\x89PNG\r\n\x1a\nCONTEXTUAL_PROXY_PNG"
        contextual_form_html = """
        <html><body>
          <form id="buscaProcessoForm" action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar" method="post">
            <img src="/projudi_consulta/imagens/logo_tjpr.png" alt="Logo" />
            <img data-src="http://consulta.tjpr.jus.br/projudi_consulta/servlet/Verificador?id=7" />
            <input type="text" name="codCaptcha" placeholder="Digite o código" />
          </form>
        </body></html>
        """
        img_headers_seen: list[dict[str, str]] = []

        def proxy_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            _ = params, data
            if method == "GET" and "servlet/Verificador" in url:
                img_headers_seen.append(dict(headers))
                self.assertTrue(url.startswith("https://consulta.tjpr.jus.br/"))
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "image/png"},
                    body=png_bytes,
                )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={
                    "content-type": "text/html; charset=ISO-8859-1",
                    "set-cookie": "JSESSIONID=PROXY_SID_7; Path=/projudi_consulta",
                },
                body=contextual_form_html.encode("iso-8859-1"),
            )

        registry = create_public_connectors(
            transport=FakeRouteTransport({"consulta.tjpr.jus.br": proxy_handler})
        )
        with self.assertRaises(ConnectorCaptchaRequiredError) as ctx:
            registry.projudi.consulta_por_cpf("111.444.777-35", tribunal="TJPR")

        err = ctx.exception
        self.assertTrue(err.extra["image"].startswith("data:image/png;base64,"))
        self.assertTrue(err.extra["image_available"])
        self.assertEqual(err.extra["image_source"], "portal_session_servlet")
        self.assertIsNone(err.extra["image_unavailable_reason"])
        self.assertTrue(err.extra["image_url"].startswith("https://consulta.tjpr.jus.br/"))
        self.assertIn("image/png", img_headers_seen[-1].get("Accept", ""))
        self.assertIn("JSESSIONID=PROXY_SID_7", img_headers_seen[-1].get("Cookie", ""))

        # Now verify Google reCAPTCHA v2 widget when /recaptcha/api/fallback is retired:
        # zero mocked images, explicit RECAPTCHA_WIDGET_REQUIRES_BROWSER_ATTESTATION reason,
        # and session + real resumption preserved.
        deprecated_noscript_html = (
            "<html><body>Please upgrade to a supported browser "
            "to get a reCAPTCHA challenge.</body></html>"
        )

        def widget_tjpr_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            _ = params
            if method == "POST" and "actionType=pesquisar" in url:
                body_str = (data or b"").decode("ascii", errors="replace")
                if (
                    "JSESSIONID=WIDGET_SID_1" in headers.get("Cookie", "")
                    and "g-recaptcha-response=03AFcWeA_REAL_TOKEN" in body_str
                ):
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=REALISTIC_TJPR_RESULTS_HTML.encode("iso-8859-1"),
                    )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={
                    "content-type": "text/html; charset=ISO-8859-1",
                    "set-cookie": "JSESSIONID=WIDGET_SID_1; Path=/projudi_consulta",
                },
                body=REALISTIC_TJPR_FORM_HTML.encode("iso-8859-1"),
            )

        def google_deprecated_handler(
            *,
            url: str,
            method: str,
            params: dict[str, Any] | None,
            headers: dict[str, str],
            data: bytes | None,
        ) -> HttpResponse:
            _ = method, params, headers, data
            return HttpResponse(
                url=url,
                status_code=200,
                headers={"content-type": "text/html; charset=utf-8"},
                body=deprecated_noscript_html.encode("utf-8"),
            )

        widget_registry = create_public_connectors(
            transport=FakeRouteTransport(
                {
                    "consulta.tjpr.jus.br": widget_tjpr_handler,
                    "www.google.com": google_deprecated_handler,
                }
            )
        )
        with self.assertRaises(ConnectorCaptchaRequiredError) as w_ctx:
            widget_registry.projudi.consulta_por_cpf("111.444.777-35", tribunal="TJPR")

        w_err = w_ctx.exception
        self.assertIsNone(w_err.extra["image"])
        self.assertFalse(w_err.extra["image_available"])
        self.assertIsNone(w_err.extra["image_source"])
        self.assertEqual(
            w_err.extra["image_unavailable_reason"],
            "RECAPTCHA_WIDGET_REQUIRES_BROWSER_ATTESTATION",
        )
        self.assertFalse(w_err.extra["dados_sinteticos_ou_mock"])
        self.assertEqual(w_err.extra["session_cookie"], "JSESSIONID=WIDGET_SID_1")

        # Real resumption still succeeds with preserved challenge_id + JSESSIONID
        resumed = widget_registry.projudi.consulta_por_cpf(
            challenge_id=w_err.extra["challenge_id"],
            captcha_token="03AFcWeA_REAL_TOKEN",
        )
        self.assertTrue(resumed["captcha_resumed"])
        self.assertEqual(resumed["total_processos"], 2)
        self.assertFalse(resumed["compliance"]["dados_sinteticos_ou_mock"])

        # Optional headless renderer hook delivers real bitmap when configured
        rendered_b64 = base64.b64encode(png_bytes).decode("ascii")
        custom_store = CaptchaChallengeStore(
            challenge_renderer=lambda **_kw: {
                "image_base64": rendered_b64,
                "image_mime_type": "image/png",
                "prompt_label": "Selecione os semáforos",
            }
        )
        ch = custom_store.issue_challenge(
            connector="projudi",
            operation="consulta_por_cpf",
            provider="recaptcha",
            site_key="6LcCustomKey",
            challenge_url="https://consulta.tjpr.jus.br/projudi_consulta/form.do",
            resume_endpoint="/api/v1/projudi/processos/consulta",
        )
        pub = ch.to_public_payload()
        self.assertTrue(pub["image_available"])
        self.assertEqual(pub["image_source"], "headless_renderer")
        self.assertIsNone(pub["image_unavailable_reason"])
        self.assertTrue(pub["image"].startswith("data:image/png;base64,"))


if __name__ == "__main__":
    unittest.main()
