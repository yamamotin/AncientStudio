"""Comprehensive deterministic unit and HTTP integration tests for public connectors.

Covers:
- CPF, UF, NCM query, and CNJ 20-digit process validation + LGPD masking
- BCB SGS indicators & Olinda PIX institution filtering (mocked transport)
- Portal Único Siscomex accent-insensitive NCM search, hierarchy, and validity
- IBGE + TSE DivulgaCandContas + optional CGU municipal governance lookup
- PROJUDI HTML parser, CAPTCHA legal boundary fallback, case details, and ready_for_llm summary
- In-memory TTL cache hit/expiration/LRU eviction and upstream timeout/HTTP 5xx fallback
- End-to-end HTTP contract tests against api/server.py
"""

from __future__ import annotations

import json
import threading
import time
from typing import Any
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from api import server
from api.connectors import (
    BCBConnectorService,
    ConnectorNotFoundError,
    ConnectorTTLCache,
    ConnectorValidationError,
    HttpResponse,
    MunicipalTransparencyService,
    ProjudiConnectorService,
    SiscomexNCMService,
    UpstreamConnectorError,
    create_public_connectors,
    is_valid_cpf,
    mask_cpf,
    mask_sensitive_text,
    normalize_search_text,
    parse_projudi_search_html,
    validate_cnj_process_number,
    validate_cpf,
    validate_uf,
)


class FakeHttpTransport:
    """Deterministic in-memory transport returning canned responses or raising timeouts."""

    def __init__(self, handler) -> None:
        self._handler = handler
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
        call = {
            "url": url,
            "method": method,
            "params": params or {},
            "headers": headers or {},
            "data": data,
            "timeout_seconds": timeout_seconds,
        }
        self.calls.append(call)
        return self._handler(call)


def _json_resp(url: str, payload: Any, status_code: int = 200) -> HttpResponse:
    return HttpResponse(
        url=url,
        status_code=status_code,
        headers={"content-type": "application/json"},
        body=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
    )


class FailingTransport:
    """Simulates external public API timeouts / HTTP 503 errors."""

    def __init__(self, message: str = "Simulated upstream timeout (3.5s)") -> None:
        self.message = message
        self.calls = 0

    def request(self, url: str, **kwargs: Any) -> HttpResponse:
        self.calls += 1
        raise UpstreamConnectorError(f"{self.message} [{url}]")


class ValidatorAndCacheUnitTests(unittest.TestCase):
    def test_cpf_validation_and_lgpd_masking(self) -> None:
        self.assertTrue(is_valid_cpf("111.444.777-35"))
        self.assertTrue(is_valid_cpf("11144477735"))
        self.assertEqual(validate_cpf("111.444.777-35"), "11144477735")
        self.assertEqual(mask_cpf("111.444.777-35"), "***.444.777-**")

        for invalid in ("", "123", "111.111.111-11", "00000000000", "111.444.777-99"):
            self.assertFalse(is_valid_cpf(invalid))
            with self.assertRaises(ConnectorValidationError):
                validate_cpf(invalid)

        redacted = mask_sensitive_text(
            "Parte João (CPF 111.444.777-35, CNPJ 12.345.678/0001-90, email joao.silva@empresa.com.br)"
        )
        self.assertIn("***.444.777-**", redacted)
        self.assertIn("12.***.***/0001-**", redacted)
        self.assertIn("j***@empresa.com.br", redacted)
        self.assertNotIn("111.444.777-35", redacted)

    def test_uf_and_cnj_validation(self) -> None:
        self.assertEqual(validate_uf("pr"), "PR")
        self.assertEqual(validate_uf(" sp "), "SP")
        with self.assertRaises(ConnectorValidationError):
            validate_uf("XX")

        cnj = validate_cnj_process_number("00012344220248160130")
        self.assertEqual(cnj, "0001234-42.2024.8.16.0130")
        self.assertEqual(
            validate_cnj_process_number("0001234-42.2024.8.16.0130"),
            "0001234-42.2024.8.16.0130",
        )
        for bad_cnj in ("12345", "0001234-42.1950.8.16.0130", "0001234-42.2024.0.16.0130"):
            with self.assertRaises(ConnectorValidationError):
                validate_cnj_process_number(bad_cnj)

    def test_normalize_search_text_strips_accents_and_html(self) -> None:
        self.assertEqual(
            normalize_search_text("<i>Café</i> não torrado — Paranavaí/PR!"),
            "cafe nao torrado paranavai pr",
        )

    def test_ttl_cache_hits_expiration_and_lru_eviction(self) -> None:
        cache = ConnectorTTLCache(default_ttl_seconds=0.08, max_entries=16)
        hit, val = cache.get("missing")
        self.assertFalse(hit)
        self.assertIsNone(val)

        cache.set("k1", {"v": 1})
        hit, val = cache.get("k1")
        self.assertTrue(hit)
        self.assertEqual(val, {"v": 1})

        time.sleep(0.11)
        hit_after, _ = cache.get("k1")
        self.assertFalse(hit_after)

        for idx in range(20):
            cache.set(f"item-{idx}", idx, ttl_seconds=10.0)
        stats = cache.stats()
        self.assertEqual(stats.size, 16)
        self.assertGreaterEqual(stats.evictions, 4)


class PublicConnectorsServiceTests(unittest.TestCase):
    def test_bcb_indicadores_and_pix_instituicoes_with_mock_transport(self) -> None:
        def router(call: dict[str, Any]) -> HttpResponse:
            url = call["url"]
            if "bcdata.sgs.432" in url:
                return _json_resp(
                    url,
                    [
                        {"data": "24/11/2026", "valor": "11,25"},
                        {"data": "25/11/2026", "valor": "11,75"},
                    ],
                )
            if "bcdata.sgs.433" in url:
                return _json_resp(
                    url,
                    [
                        {"data": "01/09/2026", "valor": "0,44"},
                        {"data": "01/10/2026", "valor": "0,56"},
                    ],
                )
            if "bcdata.sgs.1/" in url:
                return _json_resp(
                    url,
                    [
                        {"data": "24/11/2026", "valor": "5,8021"},
                        {"data": "25/11/2026", "valor": "5,7890"},
                    ],
                )
            if "ParticipantesPix" in url:
                return _json_resp(
                    url,
                    {
                        "value": [
                            {
                                "ISPB": "60701190",
                                "Nome_Extenso": "ITAÚ UNIBANCO S.A.",
                                "Nome_Reduzido": "ITAU UNIBANCO S.A.",
                                "Modalidade_Participacao": "PDCT",
                                "Tipo_Participacao": "DIRETO",
                                "Inicio_Operacao": "03/11/2020",
                            },
                            {
                                "ISPB": "18236120",
                                "Nome_Extenso": "NU PAGAMENTOS S.A.",
                                "Nome_Reduzido": "NUBANK IP",
                                "Modalidade_Participacao": "PDCT",
                                "Tipo_Participacao": "DIRETO",
                                "Inicio_Operacao": "03/11/2020",
                            },
                        ]
                    },
                )
            raise UpstreamConnectorError(f"Unexpected URL {url}")

        transport = FakeHttpTransport(router)
        service = BCBConnectorService(transport=transport, cache=ConnectorTTLCache())

        ind = service.get_indicadores(ultimos=2)
        self.assertEqual(ind["fonte_modo"], "online_bcb_sgs")
        self.assertFalse(ind["cache_hit"])
        self.assertEqual(ind["indicadores"]["selic_meta"]["valor_atual"], 11.75)
        self.assertEqual(ind["indicadores"]["selic_meta"]["variacao_absoluta"], 0.5)
        self.assertEqual(ind["indicadores"]["selic_meta"]["tendencia"], "alta")
        self.assertIn("acumulado_janela_pct", ind["indicadores"]["ipca_mensal"])
        self.assertEqual(ind["indicadores"]["ptax_usd_brl"]["tendencia"], "baixa")

        ind_cached = service.get_indicadores(ultimos=2)
        self.assertTrue(ind_cached["cache_hit"])

        by_name = service.search_instituicoes("itau")
        self.assertEqual(by_name["total_encontrado"], 1)
        self.assertEqual(by_name["instituicoes"][0]["ispb"], "60701190")

        by_ispb = service.search_instituicoes("18236120")
        self.assertEqual(by_ispb["total_encontrado"], 1)
        self.assertEqual(by_ispb["instituicoes"][0]["ispb"], "18236120")

    def test_siscomex_ncm_accent_free_search_hierarchy_and_validity(self) -> None:
        # Use FailingTransport so Siscomex deterministically loads local official seed JSON
        service = SiscomexNCMService(
            transport=FailingTransport("offline test"),
            cache=ConnectorTTLCache(),
        )

        res_coffee = service.search_ncm("cafe nao torrado")
        self.assertEqual(res_coffee["fonte_modo"], "cache_local_oficial_ncm")
        self.assertGreaterEqual(res_coffee["total_encontrado"], 1)
        top = res_coffee["resultados"][0]
        self.assertEqual(top["codigo"], "0901.11.10")
        self.assertEqual(top["hierarquia"]["capitulo"]["codigo"], "09")
        self.assertEqual(top["hierarquia"]["posicao"]["codigo"], "09.01")
        self.assertTrue(top["vigencia"]["vigente"])

        res_laptop = service.search_ncm("computadores portateis")
        self.assertEqual(res_laptop["resultados"][0]["codigo"], "8471.30.12")

        # Expired SH-2017 smartphone code 8517.12.31 excluded by default, included when requested
        active_only = service.search_ncm("85171231", somente_vigentes=True)
        self.assertEqual(active_only["total_encontrado"], 0)
        with_historical = service.search_ncm("85171231", somente_vigentes=False)
        self.assertEqual(with_historical["total_encontrado"], 1)
        self.assertFalse(with_historical["resultados"][0]["vigencia"]["vigente"])

        with self.assertRaises(ConnectorValidationError):
            service.search_ncm("a")

    def test_transparencia_municipio_ibge_tse_and_optional_cgu_key(self) -> None:
        def router(call: dict[str, Any]) -> HttpResponse:
            url = call["url"]
            if "servicodados.ibge.gov.br" in url:
                return _json_resp(
                    url,
                    [
                        {
                            "id": 4118402,
                            "nome": "Paranavaí",
                            "microrregiao": {
                                "nome": "Paranavaí",
                                "mesorregiao": {"nome": "Noroeste Paranaense"},
                            },
                        }
                    ],
                )
            if "/eleicao/buscar/PR/" in url:
                return _json_resp(
                    url,
                    {"municipios": [{"codigo": "77498", "nome": "PARANAVAÍ"}]},
                )
            if "/11/candidatos" in url:
                return _json_resp(
                    url,
                    {
                        "candidatos": [
                            {
                                "nomeUrna": "PREFEITO TESTE",
                                "nomeCompleto": "Prefeito Teste Oficial",
                                "numero": 55,
                                "partido": {"sigla": "PSD"},
                                "descricaoTotalizacao": "ELEITO",
                            }
                        ]
                    },
                )
            if "/12/candidatos" in url:
                return _json_resp(
                    url,
                    {
                        "candidatos": [
                            {
                                "nomeUrna": "VICE TESTE",
                                "numero": 55,
                                "partido": {"sigla": "PL"},
                                "descricaoTotalizacao": "ELEITO",
                            }
                        ]
                    },
                )
            if "/13/candidatos" in url:
                return _json_resp(
                    url,
                    {
                        "candidatos": [
                            {
                                "nomeUrna": "VEREADORA ELEITA",
                                "partido": {"sigla": "PSD"},
                                "descricaoTotalizacao": "ELEITO POR QP",
                            },
                            {
                                "nomeUrna": "CANDIDATO SUPLENTE",
                                "partido": {"sigla": "MDB"},
                                "descricaoTotalizacao": "SUPLENTE",
                            },
                        ]
                    },
                )
            if "portaldatransparencia.gov.br" in url:
                return _json_resp(url, [{"valor": 125000.50}, {"valor": 74999.50}])
            raise UpstreamConnectorError(f"Unexpected URL {url}")

        transport = FakeHttpTransport(router)
        service = MunicipalTransparencyService(
            transport=transport,
            cache=ConnectorTTLCache(),
            transparencia_api_key="cgu-test-token-do-not-echo",
        )

        res = service.get_municipio("paranavai", "pr")
        self.assertEqual(res["fonte_modo"], "online_ibge_tse")
        self.assertEqual(res["municipio"]["codigo_ibge"], "4118402")
        self.assertEqual(res["executivo"]["prefeito"]["nome_urna"], "PREFEITO TESTE")
        self.assertEqual(res["legislativo"]["total_vereadores_listados"], 1)
        self.assertEqual(res["portal_transparencia_cgu"]["status"], "consultado_online")
        self.assertAlmostEqual(res["portal_transparencia_cgu"]["total_amostra_brl"], 200000.0)
        # Ensure API key never leaks in serialized payload
        self.assertNotIn("cgu-test-token-do-not-echo", json.dumps(res))

        with self.assertRaises(ConnectorNotFoundError):
            service.get_municipio("Cidade Inexistente XYZ", "PR")

        with self.assertRaises(ConnectorValidationError):
            service.get_municipio("Brasília", "DF")

    def test_projudi_html_parser_captcha_respect_and_llm_summary(self) -> None:
        sample_html = """
        <table>
          <tr><th>Processo</th><th>Classe</th><th>Assunto</th><th>Vara</th></tr>
          <tr>
            <td>0001234-42.2024.8.16.0130</td>
            <td>Procedimento Comum Cível</td>
            <td>Indenização — CPF 111.444.777-35</td>
            <td>1ª Vara Cível de Paranavaí</td>
          </tr>
        </table>
        """
        parsed = parse_projudi_search_html(sample_html, "TJPR")
        self.assertEqual(len(parsed), 1)
        self.assertEqual(parsed[0]["numero_processo"], "0001234-42.2024.8.16.0130")
        self.assertIn("***.444.777-**", parsed[0]["assunto"])

        captcha_html = '<div class="g-recaptcha">Digite os caracteres da imagem</div>'
        with self.assertRaises(UpstreamConnectorError):
            parse_projudi_search_html(captcha_html, "TJPR")

        service = ProjudiConnectorService(
            transport=FailingTransport("CAPTCHA challenge active"),
            cache=ConnectorTTLCache(),
            upstream_search_url="https://projudi.exemplo.jus.br/consulta",
        )
        consulta = service.consulta_por_cpf(
            cpf="111.444.777-35",
            tribunal="TJPR",
            captcha_token="user-solved-token",
        )
        self.assertEqual(consulta["modo_execucao"], "sandbox_demonstracao")
        self.assertEqual(consulta["cpf_mascarado"], "***.444.777-**")
        self.assertGreaterEqual(consulta["total_processos"], 1)

        detalhe = service.obter_processo("0001234-42.2024.8.16.0130")
        self.assertEqual(detalhe["tribunal"], "TJPR")
        self.assertGreaterEqual(len(detalhe["movimentacoes"]), 3)

        resumo = service.resumir_processo(
            "0001234-42.2024.8.16.0130",
            {"texto_processo": "Pedido de tutela de urgência apreciado pelo juízo."},
        )
        self.assertEqual(resumo["status"], "ready_for_llm")
        self.assertEqual(resumo["llm_placeholder"]["status"], "ready_for_llm")
        self.assertTrue(resumo["metricas"]["possui_tutela_urgencia"])

    def test_upstream_failures_trigger_clean_resilient_fallback(self) -> None:
        registry = create_public_connectors(
            transport=FailingTransport("Simulated HTTP 503 / socket timeout"),
            cache=ConnectorTTLCache(),
        )

        bcb_ind = registry.bcb.get_indicadores(ultimos=4)
        self.assertEqual(bcb_ind["fonte_modo"], "fallback_resiliente")
        self.assertEqual(len(bcb_ind["indicadores"]["selic_meta"]["serie_historica"]), 4)

        bcb_inst = registry.bcb.search_instituicoes("nubank")
        self.assertEqual(bcb_inst["fonte_modo"], "fallback_resiliente")
        self.assertEqual(bcb_inst["instituicoes"][0]["ispb"], "18236120")

        mun = registry.transparencia.get_municipio("Paranavaí", "PR")
        self.assertEqual(mun["fonte_modo"], "fallback_resiliente")
        self.assertEqual(mun["municipio"]["codigo_ibge"], "4118402")


class PublicConnectorsHttpServerIntegrationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._orig_connectors = server.CONNECTORS
        server.CONNECTORS = create_public_connectors(
            transport=FailingTransport("Deterministic offline HTTP test mode"),
            cache=ConnectorTTLCache(),
        )
        cls.httpd = server.create_server("127.0.0.1", 0)
        cls.port = cls.httpd.server_address[1]
        cls.base_url = f"http://127.0.0.1:{cls.port}"
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.thread.join(timeout=2)
        server.CONNECTORS = cls._orig_connectors

    def _req(self, path: str, method: str = "GET", payload: Any = None) -> tuple[int, dict[str, Any]]:
        raw = None
        headers = {"Accept": "application/json"}
        if payload is not None:
            raw = json.dumps(payload).encode("utf-8")
            headers["Content-Type"] = "application/json"
        req = Request(f"{self.base_url}{path}", data=raw, headers=headers, method=method)
        try:
            with urlopen(req, timeout=5) as resp:
                return resp.status, json.loads(resp.read().decode("utf-8"))
        except HTTPError as err:
            return err.code, json.loads(err.read().decode("utf-8"))

    def test_all_seven_public_connector_endpoints_and_error_contracts(self) -> None:
        # 1. BCB Indicadores
        code, body = self._req("/api/v1/bcb/indicadores?ultimos=3")
        self.assertEqual(code, 200)
        self.assertTrue(body["ok"])
        self.assertIn("selic_meta", body["data"]["indicadores"])
        self.assertIn("ipca_mensal", body["data"]["indicadores"])
        self.assertIn("ptax_usd_brl", body["data"]["indicadores"])

        code_bad_ult, _ = self._req("/api/v1/bcb/indicadores?ultimos=999")
        self.assertEqual(code_bad_ult, 422)

        # 2. BCB Instituicoes
        code, body = self._req("/api/v1/bcb/instituicoes?busca=Sicredi")
        self.assertEqual(code, 200)
        self.assertEqual(body["data"]["instituicoes"][0]["ispb"], "01181521")

        # 3. Siscomex NCM
        code, body = self._req("/api/v1/siscomex/ncm?q=inversores+solares")
        self.assertEqual(code, 200)
        self.assertEqual(body["data"]["resultados"][0]["codigo"], "8504.40.90")

        code_bad_ncm, _ = self._req("/api/v1/siscomex/ncm?q=")
        self.assertEqual(code_bad_ncm, 422)

        # 4. Transparencia Municipio
        code, body = self._req("/api/v1/transparencia/municipio?cidade=Paranavai&uf=PR")
        self.assertEqual(code, 200)
        self.assertEqual(body["data"]["municipio"]["codigo_ibge"], "4118402")
        self.assertGreater(len(body["data"]["legislativo"]["vereadores"]), 0)

        code_404_mun, _ = self._req("/api/v1/transparencia/municipio?cidade=Atlantida&uf=PR")
        self.assertEqual(code_404_mun, 404)

        # 5. PROJUDI Consulta por CPF
        code, body = self._req(
            "/api/v1/projudi/processos/consulta",
            method="POST",
            payload={"cpf": "111.444.777-35", "tribunal": "TJPR"},
        )
        self.assertEqual(code, 200)
        self.assertEqual(body["data"]["cpf_mascarado"], "***.444.777-**")

        code_bad_cpf, _ = self._req(
            "/api/v1/projudi/processos/consulta",
            method="POST",
            payload={"cpf": "111.111.111-11", "tribunal": "TJPR"},
        )
        self.assertEqual(code_bad_cpf, 422)

        # 6. PROJUDI Detalhes do Processo
        code, body = self._req("/api/v1/projudi/processos/0001234-42.2024.8.16.0130")
        self.assertEqual(code, 200)
        self.assertEqual(body["data"]["numero_processo"], "0001234-42.2024.8.16.0130")

        code_404_proc, _ = self._req("/api/v1/projudi/processos/9999999-42.2024.8.16.0130")
        self.assertEqual(code_404_proc, 404)

        # 7. PROJUDI Resumo estruturado pronto para LLM
        code, body = self._req(
            "/api/v1/projudi/processos/0001234-42.2024.8.16.0130/resumo",
            method="POST",
            payload={"texto_processo": "Deferida liminar urgente e autos conclusos."},
        )
        self.assertEqual(code, 200)
        self.assertEqual(body["data"]["status"], "ready_for_llm")
        self.assertEqual(body["data"]["llm_placeholder"]["status"], "ready_for_llm")


if __name__ == "__main__":
    unittest.main()
