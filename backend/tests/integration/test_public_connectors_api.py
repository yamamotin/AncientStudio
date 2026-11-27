"""FastAPI integration tests for BCB, Siscomex NCM, IBGE/TSE, and PROJUDI endpoints."""

from __future__ import annotations

import pytest
from api.connectors import (
    ConnectorTTLCache,
    HttpResponse,
    UpstreamConnectorError,
    create_public_connectors,
)
from app.api.deps import get_public_connectors
from app.main import create_app
from fastapi.testclient import TestClient


class OfflineMockTransport:
    """Deterministic offline transport forcing local seed/resilient fallback paths."""

    def request(self, url: str, **kwargs: object) -> HttpResponse:
        raise UpstreamConnectorError(f"Offline test transport [{url}]")


@pytest.fixture
def connectors_client() -> TestClient:
    app = create_app()
    registry = create_public_connectors(
        transport=OfflineMockTransport(),
        cache=ConnectorTTLCache(),
    )
    app.dependency_overrides[get_public_connectors] = lambda: registry
    return TestClient(app)


@pytest.mark.integration
def test_api_status_and_bcb_endpoints(connectors_client: TestClient) -> None:
    status_resp = connectors_client.get("/api-status.json")
    assert status_resp.status_code == 200
    assert status_resp.json()["ok"] is True

    ind_resp = connectors_client.get("/api/v1/bcb/indicadores?ultimos=4")
    assert ind_resp.status_code == 200
    ind_data = ind_resp.json()["data"]
    assert ind_data["cache_hit"] is False
    assert set(ind_data["indicadores"].keys()) == {
        "selic_meta",
        "ipca_mensal",
        "ptax_usd_brl",
    }

    ind_cached = connectors_client.get("/api/v1/bcb/indicadores?ultimos=4")
    assert ind_cached.status_code == 200
    assert ind_cached.json()["data"]["cache_hit"] is True

    pix_resp = connectors_client.get("/api/v1/bcb/instituicoes?busca=18236120")
    assert pix_resp.status_code == 200
    assert pix_resp.json()["data"]["instituicoes"][0]["ispb"] == "18236120"


@pytest.mark.integration
def test_siscomex_and_transparencia_endpoints(connectors_client: TestClient) -> None:
    ncm_resp = connectors_client.get("/api/v1/siscomex/ncm?q=computadores+portateis")
    assert ncm_resp.status_code == 200
    top = ncm_resp.json()["data"]["resultados"][0]
    assert top["codigo"] == "8471.30.12"
    assert top["hierarquia"]["capitulo"]["codigo"] == "84"

    bad_ncm = connectors_client.get("/api/v1/siscomex/ncm?q=x")
    assert bad_ncm.status_code == 422

    mun_resp = connectors_client.get(
        "/api/v1/transparencia/municipio?cidade=Paranavai&uf=PR"
    )
    assert mun_resp.status_code == 200
    mun_data = mun_resp.json()["data"]
    assert mun_data["municipio"]["codigo_ibge"] == "4118402"
    assert mun_data["executivo"]["prefeito"]["situacao"] == "ELEITO"

    not_found = connectors_client.get(
        "/api/v1/transparencia/municipio?cidade=CidadeInexistente&uf=PR"
    )
    assert not_found.status_code == 404


@pytest.mark.integration
def test_projudi_consulta_detalhe_and_resumo_llm(connectors_client: TestClient) -> None:
    bad_cpf = connectors_client.post(
        "/api/v1/projudi/processos/consulta",
        json={"cpf": "111.111.111-11", "tribunal": "TJPR"},
    )
    assert bad_cpf.status_code == 422

    ok_cpf = connectors_client.post(
        "/api/v1/projudi/processos/consulta",
        json={"cpf": "111.444.777-35", "tribunal": "TJPR"},
    )
    assert ok_cpf.status_code == 200
    assert ok_cpf.json()["data"]["cpf_mascarado"] == "***.444.777-**"

    det = connectors_client.get(
        "/api/v1/projudi/processos/0001234-42.2024.8.16.0130"
    )
    assert det.status_code == 200
    assert len(det.json()["data"]["movimentacoes"]) >= 3

    resumo = connectors_client.post(
        "/api/v1/projudi/processos/0001234-42.2024.8.16.0130/resumo",
        json={"texto_processo": "Deferida tutela de urgência; conclusos para sentença."},
    )
    assert resumo.status_code == 200
    resumo_data = resumo.json()["data"]
    assert resumo_data["status"] == "ready_for_llm"
    assert resumo_data["llm_placeholder"]["status"] == "ready_for_llm"
