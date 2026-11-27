"""FastAPI integration tests for BCB, Siscomex Classif, Municipal BRL, and real PROJUDI TJPR."""

from __future__ import annotations

from typing import Any

from api.connectors import (
    ConnectorTTLCache,
    HttpResponse,
    PublicConnectorsRegistry,
    UpstreamConnectorError,
    create_public_connectors,
)
from app.api.deps import get_public_connectors
from app.main import create_app
from fastapi.testclient import TestClient

VALID_CNJ = "0001234-57.2024.8.16.0130"

TJPR_FORM_FIXTURE = """<!DOCTYPE html>
<html>
  <body>
    <form id="buscaProcessoForm"
          action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar"
          method="post">
      <div class="g-recaptcha"
           data-sitekey="6LcFastApiTestSiteKey00000000000000000099"
           data-callback="executaRecaptchaPBC_actre_consulta_publica"></div>
    </form>
  </body>
</html>
"""

TJPR_RESULTS_FIXTURE = f"""<!DOCTYPE html>
<html>
  <body>
    <div id="navigator">1 registro encontrado, mostrando de 1 até 1</div>
    <table class="resultTable">
      <tr>
        <th>Processo</th>
        <th>Partes</th>
        <th>Distribuição</th>
        <th>Classe Processual (Assunto Principal)</th>
      </tr>
      <tr>
        <td>{VALID_CNJ}</td>
        <td>Autor: MARIA APARECIDA (CPF 111.444.777-35)<br/>Réu: BANCO EXEMPLO S.A.</td>
        <td>18/03/2024</td>
        <td>Procedimento Comum Cível (Revisão Contratual)</td>
      </tr>
    </table>
  </body>
</html>
"""


class StubIntegrationTransport:
    def __init__(self, *, fail_projudi: bool = False) -> None:
        self.fail_projudi = fail_projudi

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
        if "consulta.tjpr.jus.br" in url:
            if self.fail_projudi:
                raise UpstreamConnectorError("TJPR connection timeout", status_code=503)
            if "actionType=pesquisar" in url and method == "POST":
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=TJPR_RESULTS_FIXTURE.encode("iso-8859-1"),
                )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={"content-type": "text/html; charset=ISO-8859-1"},
                body=TJPR_FORM_FIXTURE.encode("iso-8859-1"),
            )
        raise UpstreamConnectorError("Offline test transport", status_code=503)


def _build_client(*, fail_projudi: bool = False) -> TestClient:
    app = create_app()
    registry: PublicConnectorsRegistry = create_public_connectors(
        transport=StubIntegrationTransport(fail_projudi=fail_projudi),
        cache=ConnectorTTLCache(default_ttl_seconds=300.0),
    )
    app.dependency_overrides[get_public_connectors] = lambda: registry
    return TestClient(app)


def test_bcb_indicadores_and_instituicoes_endpoints() -> None:
    client = _build_client()
    r1 = client.get("/api/v1/bcb/indicadores?ultimos=4")
    assert r1.status_code == 200
    payload = r1.json()
    assert payload["ok"] is True
    assert "selic_meta" in payload["data"]["indicadores"]
    assert "ipca_mensal" in payload["data"]["indicadores"]
    assert "ptax_usd_brl" in payload["data"]["indicadores"]

    r2 = client.get("/api/v1/bcb/instituicoes?busca=nubank&limite=5")
    assert r2.status_code == 200
    inst = r2.json()["data"]
    assert inst["total_encontrado"] >= 1
    assert inst["instituicoes"][0]["ispb"] == "18236120"


def test_siscomex_ncm_classif_resolves_gpu_and_accent_insensitive_queries() -> None:
    client = _build_client()

    gpu_resp = client.get("/api/v1/siscomex/ncm?q=GPU&limite=10")
    assert gpu_resp.status_code == 200
    gpu_data = gpu_resp.json()["data"]
    assert gpu_data["total_encontrado"] >= 3
    codes = [item["codigo"] for item in gpu_data["resultados"]]
    assert "8471.80.00" in codes
    assert "8471.50.90" in codes
    assert "8542.31.90" in codes
    assert gpu_data["total_decisoes"] >= 3
    assert gpu_data["total_sugestoes"] >= 3

    cafe_resp = client.get("/api/v1/siscomex/ncm?q=cafe%20nao%20torrado")
    assert cafe_resp.status_code == 200
    assert cafe_resp.json()["data"]["resultados"][0]["codigo"] == "0901.11.10"

    bad = client.get("/api/v1/siscomex/ncm?q=x")
    assert bad.status_code == 422


def test_transparencia_municipio_includes_brl_monetary_and_fiscal_indicators() -> None:
    client = _build_client()
    resp = client.get("/api/v1/transparencia/municipio?cidade=Paranava%C3%AD&uf=pr")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["unidade_moeda"] == "BRL"
    assert data["municipio"]["codigo_ibge"] == "4118402"
    assert data["municipio"]["codigo_tse"] == "77496"
    assert data["resumo_monetario"]["unidade_moeda"] == "BRL"
    assert data["resumo_monetario"]["pib_municipal_brl"] == 4189765000.0
    assert data["resumo_monetario"]["receitas_realizadas_brl"] > 500_000_000.0
    assert data["executivo"]["prefeito"]["nome_urna"] == "MAURÍCIO GEHLEN"
    assert data["executivo"]["vice_prefeito"]["partido"] == "PP"
    assert data["legislativo"]["total_vereadores_listados"] == 15

    df_resp = client.get("/api/v1/transparencia/municipio?cidade=Brasilia&uf=DF")
    assert df_resp.status_code == 422


def test_projudi_enforces_captcha_required_scrapes_real_html_and_never_mocks() -> None:
    client = _build_client()

    bad_cpf = client.post(
        "/api/v1/projudi/processos/consulta",
        json={"cpf": "111.111.111-11", "tribunal": "TJPR"},
    )
    assert bad_cpf.status_code == 422

    no_cap = client.post(
        "/api/v1/projudi/processos/consulta",
        json={"cpf": "111.444.777-35", "tribunal": "TJPR"},
    )
    assert no_cap.status_code == 422
    problem = no_cap.json()
    assert problem["code"] == "CAPTCHA_REQUIRED"
    assert problem["site_key"] == "6LcFastApiTestSiteKey00000000000000000099"
    assert "instructions" in problem

    ok_consulta = client.post(
        "/api/v1/projudi/processos/consulta",
        json={
            "cpf": "111.444.777-35",
            "tribunal": "TJPR",
            "captcha_token": "solved-recaptcha-token",
        },
    )
    assert ok_consulta.status_code == 200
    cdata = ok_consulta.json()["data"]
    assert cdata["modo_execucao"] == "raspagem_real_projudi_tjpr"
    assert cdata["compliance"]["dados_sinteticos_ou_mock"] is False
    assert cdata["cpf_mascarado"] == "***.444.777-**"
    assert cdata["total_processos"] == 1
    assert cdata["processos"][0]["numero_processo"] == VALID_CNJ
    assert "111.444.777-35" not in ok_consulta.text

    ok_det = client.get(
        f"/api/v1/projudi/processos/{VALID_CNJ}?captcha_token=solved-recaptcha-token"
    )
    assert ok_det.status_code == 200
    assert ok_det.json()["data"]["numero_processo"] == VALID_CNJ

    ok_resumo = client.post(
        f"/api/v1/projudi/processos/{VALID_CNJ}/resumo",
        json={
            "texto_processo": "Deferida liminar de urgência; autos conclusos para sentença.",
            "objetivo": "parecer_executivo",
        },
    )
    assert ok_resumo.status_code == 200
    rdata = ok_resumo.json()["data"]
    assert rdata["status"] == "ready_for_llm"
    assert rdata["metricas"]["possui_tutela_urgencia"] is True


def test_projudi_upstream_unavailable_returns_503_without_fake_fallback() -> None:
    offline_client = _build_client(fail_projudi=True)
    resp = offline_client.post(
        "/api/v1/projudi/processos/consulta",
        json={
            "cpf": "111.444.777-35",
            "tribunal": "TJPR",
            "captcha_token": "solved-recaptcha-token",
        },
    )
    assert resp.status_code == 503
    assert resp.json()["code"] == "PROJUDI_UPSTREAM_UNAVAILABLE"
