"""FastAPI integration tests for BCB, Siscomex Classif, Municipal BRL, and real PROJUDI TJPR."""

from __future__ import annotations

from typing import Any

import httpx
from api.connectors import (
    ConnectorTTLCache,
    HttpResponse,
    PublicConnectorsRegistry,
    UpstreamConnectorError,
    create_public_connectors,
)
from app.api.deps import get_page_fetcher, get_public_connectors
from app.core.config import Settings
from app.domains.scraping import HttpxPageFetcher
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
                body_str = (data or b"").decode("ascii", errors="replace")
                if "g-recaptcha-response=BAD" in body_str:
                    rejected_html = (
                        TJPR_FORM_FIXTURE
                        + "<div class='error'>Validação do reCAPTCHA inválida.</div>"
                    )
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=rejected_html.encode("iso-8859-1"),
                    )
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "text/html; charset=ISO-8859-1"},
                    body=TJPR_RESULTS_FIXTURE.encode("iso-8859-1"),
                )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={
                    "content-type": "text/html; charset=ISO-8859-1",
                    "set-cookie": "JSESSIONID=FASTAPI_TJPR_SESSION_01; Path=/projudi_consulta",
                },
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


def test_fastapi_standardized_captcha_popup_roundtrip_for_projudi() -> None:
    client = _build_client()

    # 1. Initial consulta returns standardized 422 CAPTCHA_REQUIRED contract
    initial = client.post(
        "/api/v1/projudi/processos/consulta",
        json={"cpf": "111.444.777-35", "tribunal": "TJPR"},
    )
    assert initial.status_code == 422
    err = initial.json()
    assert err["ok"] is False
    assert err["code"] == "CAPTCHA_REQUIRED"
    assert err["provider"] == "recaptcha"
    assert err["connector"] == "projudi"
    assert err["operation"] == "consulta_por_cpf"
    assert err["session_cookie"] == "JSESSIONID=FASTAPI_TJPR_SESSION_01"
    assert err["callback"] == "executaRecaptchaPBC_actre_consulta_publica"
    assert err["resume_endpoint"] == "/api/v1/projudi/processos/consulta"
    assert err["resolve_endpoint"] == "/api/v1/captcha/resolve"
    assert err["consulta_payload"]["cpf_mascarado"] == "***.444.777-**"
    assert "cpf" not in err["consulta_payload"]
    cid = err["challenge_id"]

    # 2. Frontend popup can inspect challenge metadata by challenge_id
    inspect_resp = client.get(f"/api/v1/captcha/challenges/{cid}")
    assert inspect_resp.status_code == 200
    assert inspect_resp.json()["data"]["challenge_id"] == cid

    # 3. Invalid CAPTCHA token rotates challenge_id and flags rejected_previous_attempt
    bad_try = client.post(
        "/api/v1/captcha/resolve",
        json={"challenge_id": cid, "captcha_token": "BAD"},
    )
    assert bad_try.status_code == 422
    bad_err = bad_try.json()
    assert bad_err["code"] == "CAPTCHA_REQUIRED"
    assert bad_err["challenge_data"]["rejected_previous_attempt"] is True
    cid2 = bad_err["challenge_id"]
    assert cid2 != cid

    # 4. Valid resolution via unified /api/v1/captcha/resolve completes real TJPR query
    resolved = client.post(
        "/api/v1/captcha/resolve",
        json={"challenge_id": cid2, "captcha_token": "VALID_RECAPTCHA_TOKEN"},
    )
    assert resolved.status_code == 200
    rdata = resolved.json()["data"]
    assert rdata["captcha_resolved"] is True
    assert rdata["captcha_resumed"] is True
    assert rdata["modo_execucao"] == "raspagem_real_projudi_tjpr"
    assert rdata["processos"][0]["numero_processo"] == VALID_CNJ

    # Consumed challenge_id cannot be replayed
    gone = client.get(f"/api/v1/captcha/challenges/{cid2}")
    assert gone.status_code == 404


def test_fastapi_generic_scraper_extract_sync_handles_turnstile_captcha_roundtrip() -> None:
    cfg = Settings(
        environment="test",
        worker_autostart=False,
        workflow_api_token="test-scraper-token-0123456789",
        scraper_allowed_hosts=["93.184.216.34"],
        n8n_event_bridge_enabled=False,
    )
    app = create_app(cfg)

    challenge_html = """<!DOCTYPE html>
    <html>
      <head><title>Verificação de Segurança</title></head>
      <body>
        <form action="http://93.184.216.34/portal/dados" method="post">
          <input type="hidden" name="csrf_tok" value="tok-abc" />
          <div class="cf-turnstile" data-sitekey="0x4AAAAAAATurnstileTestKey"></div>
        </form>
      </body>
    </html>
    """
    real_data_html = """<!DOCTYPE html>
    <html>
      <head><title>Relatório Oficial Extraído</title></head>
      <body>
        <h1 class="headline">Dados Públicos Reais Liberados</h1>
      </body>
    </html>
    """

    def mock_handler(request: httpx.Request) -> httpx.Response:
        body_text = request.content.decode("utf-8", errors="replace")
        cookie_hdr = request.headers.get("cookie", "")
        if (
            request.method == "POST"
            and "cf-turnstile-response=TURNSTILE_OK" in body_text
            and "CF_CHALLENGE=passed1" in cookie_hdr
        ):
            return httpx.Response(
                200,
                headers={"content-type": "text/html; charset=utf-8"},
                text=real_data_html,
            )
        return httpx.Response(
            403,
            headers={
                "content-type": "text/html; charset=utf-8",
                "set-cookie": "CF_CHALLENGE=passed1; Path=/",
            },
            text=challenge_html,
        )

    mock_transport = httpx.MockTransport(mock_handler)
    app.dependency_overrides[get_page_fetcher] = lambda: HttpxPageFetcher(
        cfg, transport=mock_transport
    )
    client = TestClient(app)
    auth_headers = {"X-API-Key": cfg.workflow_api_token}

    # 1. Synchronous scrape detects Turnstile on 403 page and emits 422 CAPTCHA_REQUIRED
    first = client.post(
        "/api/v1/scraping/extract",
        headers=auth_headers,
        json={
            "url": "http://93.184.216.34/portal/dados",
            "strategy": "http_static",
            "selectors": ["h1.headline"],
        },
    )
    assert first.status_code == 422
    cap = first.json()
    assert cap["code"] == "CAPTCHA_REQUIRED"
    assert cap["provider"] == "turnstile"
    assert cap["site_key"] == "0x4AAAAAAATurnstileTestKey"
    assert cap["connector"] == "scraping"
    assert cap["session_cookie"] == "CF_CHALLENGE=passed1"
    cid = cap["challenge_id"]

    # 2. Resolving a scraping challenge via /api/v1/captcha/resolve enforces Scope.SCRAPING_RUN
    unauth = client.post(
        "/api/v1/captcha/resolve",
        json={"challenge_id": cid, "captcha_token": "TURNSTILE_OK"},
    )
    assert unauth.status_code == 401

    # 3. Authenticated resolution submits form + cookie and extracts real target HTML
    solved = client.post(
        "/api/v1/captcha/resolve",
        headers=auth_headers,
        json={"challenge_id": cid, "captcha_token": "TURNSTILE_OK"},
    )
    assert solved.status_code == 200
    sdata = solved.json()["data"]
    assert sdata["captcha_resolved"] is True
    assert sdata["captcha_resumed"] is True
    assert sdata["title"] == "Relatório Oficial Extraído"
    assert "Dados Públicos Reais Liberados" in str(sdata["extracted"])


def test_fastapi_projudi_image_captcha_popup_and_resumo_real_completion() -> None:
    png_bytes = b"\x89PNG\r\n\x1a\nPROJUDI_POPUP_PNG"
    img_form_html = """<!DOCTYPE html>
    <html>
      <body>
        <form id="buscaProcessoForm" name="buscaProcessoForm"
              action="/projudi_consulta/processo/consultaPublica.do?actionType=pesquisar"
              method="post">
          <input type="hidden" name="tipoConsulta" value="1" />
          <img id="imagemCaptcha" src="/projudi_consulta/captcha.svl" alt="Captcha" />
          <input type="text" name="resposta" id="resposta" />
        </form>
      </body>
    </html>
    """

    class _ImgTransport:
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
            cookie = (headers or {}).get("Cookie", "")
            if "captcha.svl" in url:
                return HttpResponse(
                    url=url,
                    status_code=200,
                    headers={"content-type": "image/png"},
                    body=png_bytes,
                )
            if method == "POST" and "consultaPublica.do" in url:
                body_text = (data or b"").decode("ascii", errors="replace")
                if "resposta=PRJ84K" in body_text and "JSESSIONID=FASTAPI_IMG_1" in cookie:
                    return HttpResponse(
                        url=url,
                        status_code=200,
                        headers={"content-type": "text/html; charset=ISO-8859-1"},
                        body=TJPR_RESULTS_FIXTURE.encode("iso-8859-1"),
                    )
            return HttpResponse(
                url=url,
                status_code=200,
                headers={
                    "content-type": "text/html; charset=ISO-8859-1",
                    "set-cookie": "JSESSIONID=FASTAPI_IMG_1; Path=/projudi_consulta",
                },
                body=img_form_html.encode("iso-8859-1"),
            )

    app = create_app(Settings(environment="test", worker_autostart=False))
    fake_registry = create_public_connectors(
        transport=_ImgTransport(),
        cache=ConnectorTTLCache(),
    )
    app.dependency_overrides[get_public_connectors] = lambda: fake_registry
    client = TestClient(app)

    # 1. GET /api/v1/projudi/processos emits compact-popup 422 with image + expected_param
    r_422 = client.get("/api/v1/projudi/processos?cpf=52998224725")
    assert r_422.status_code == 422
    err = r_422.json()
    assert err["code"] == "CAPTCHA_REQUIRED"
    assert err["provider"] == "image"
    assert err["response_field"] == "resposta"
    assert err["expected_param"] == "captcha_token"
    assert err["resume_endpoint"] == "/api/v1/projudi/processos"
    assert err["resume_method"] == "GET"
    assert err["image_data_uri"].startswith("data:image/png;base64,")
    assert err["image"] == err["image_data_uri"]
    assert err["image_available"] is True
    assert err["image_source"] == "portal_session_servlet"
    assert err["image_unavailable_reason"] is None
    assert err["image_data_url"] == err["image_data_uri"]
    assert err["captcha_image"] == err["image_data_uri"]
    assert isinstance(err["image_base64"], str) and len(err["image_base64"]) > 8
    assert "captcha.svl" in err["image_url"]
    assert err["session_cookie"] == "JSESSIONID=FASTAPI_IMG_1"
    assert "projudi_consulta" in err["form_url"]
    assert "consultaPublica.do" in err["action_url"]
    assert 0 < err["expires_in_seconds"] <= 300
    assert isinstance(err["challenge_text"], str) and err["challenge_text"]
    assert "acesse o formulário" not in " ".join(err["instructions"]).lower()
    assert err["popup"]["mode"] == "image"
    assert err["popup"]["expires_in_seconds"] == err["expires_in_seconds"]
    assert "52998224725" not in str(err["consulta_payload"])
    cid = err["challenge_id"]

    # 2. Stream raw CAPTCHA image via image_endpoint (no-store)
    img_res = client.get(err["image_endpoint"])
    assert img_res.status_code == 200
    assert img_res.headers["content-type"].startswith("image/png")
    assert "no-store" in img_res.headers["cache-control"]
    assert img_res.content == png_bytes

    # 3. Complete real query on GET /api/v1/projudi/processos with captcha_token
    done = client.get(
        f"/api/v1/projudi/processos?cpf=52998224725&challenge_id={cid}&captcha_token=PRJ84K"
    )
    assert done.status_code == 200
    ddata = done.json()["data"]
    assert ddata["captcha_resumed"] is True
    assert ddata["total_processos"] == 1
    assert ddata["processos"][0]["numero_processo"] == VALID_CNJ

    # 3b. POST /consulta resumption with blank cpf="" + challenge_id + captcha_token works
    fake_registry.cache.clear()
    post_422 = client.post(
        "/api/v1/projudi/processos/consulta",
        json={"cpf": "529.982.247-25", "tribunal": "TJPR"},
    )
    assert post_422.status_code == 422
    post_err = post_422.json()
    post_done = client.post(
        "/api/v1/projudi/processos/consulta",
        json={
            "cpf": "",
            "challenge_id": post_err["challenge_id"],
            "captcha_token": "PRJ84K",
        },
    )
    assert post_done.status_code == 200
    assert post_done.json()["data"]["total_processos"] == 1
    assert post_done.json()["data"]["compliance"]["dados_sinteticos_ou_mock"] is False

    # 4. /resumo on cold cache emits /resumo challenge and completes real scrape upon resolution
    fake_registry.cache.clear()
    resumo_422 = client.post(
        f"/api/v1/projudi/processos/{VALID_CNJ}/resumo",
        json={"objetivo": "triagem_juridica_executiva"},
    )
    assert resumo_422.status_code == 422
    r_err = resumo_422.json()
    assert r_err["resume_endpoint"] == f"/api/v1/projudi/processos/{VALID_CNJ}/resumo"
    resumo_ok = client.post(
        f"/api/v1/projudi/processos/{VALID_CNJ}/resumo",
        json={
            "objetivo": "triagem_juridica_executiva",
            "challenge_id": r_err["challenge_id"],
            "captcha_token": "PRJ84K",
        },
    )
    assert resumo_ok.status_code == 200
    rdata = resumo_ok.json()["data"]
    assert rdata["origem_dados"] == "raspagem_real_projudi_tjpr"
    assert rdata["captcha_resumed"] is True
    assert rdata["status"] == "ready_for_llm"

