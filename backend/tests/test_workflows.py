"""n8n workflow trigger and execution query tests using httpx MockTransport."""

from __future__ import annotations

import httpx
from app.config import Settings
from fastapi.testclient import TestClient


def _auth(settings: Settings) -> dict[str, str]:
    return {"X-API-Key": settings.workflow_api_token}


def test_trigger_calls_real_webhook_with_auth(
    client: TestClient,
    settings: Settings,
    use_n8n_transport,  # noqa: ANN001
) -> None:
    seen: dict[str, str] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["url"] = str(request.url)
        seen["token"] = request.headers.get("X-N8N-Webhook-Token", "")
        return httpx.Response(202, json={"executionId": "exec-77", "status": "running"})

    use_n8n_transport(httpx.MockTransport(handler))

    response = client.post(
        "/api/v1/workflows/invoice-enrichment/run",
        headers=_auth(settings),
        json={"payload": {"invoice": "NFE-1"}, "request_id": "req-42"},
    )

    assert response.status_code == 202
    body = response.json()
    assert body["execution_id"] == "exec-77"
    assert body["status"] == "running"
    assert body["workflow_id"] == "invoice-enrichment"
    assert seen["url"] == "http://n8n.test:5678/webhook/invoice-enrichment"
    assert seen["token"] == settings.n8n_webhook_token


def test_workflow_requires_api_key(client: TestClient) -> None:
    response = client.post("/api/v1/workflows/invoice-enrichment/run", json={})

    assert response.status_code in {401, 422}


def test_query_execution_uses_n8n_api_key(
    client: TestClient,
    settings: Settings,
    use_n8n_transport,  # noqa: ANN001
) -> None:
    seen: dict[str, str] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["url"] = str(request.url)
        seen["key"] = request.headers.get("X-N8N-API-KEY", "")
        return httpx.Response(
            200,
            json={"status": "success", "finished": True, "startedAt": "2026-11-23T12:00:00Z"},
        )

    use_n8n_transport(httpx.MockTransport(handler))

    response = client.get("/api/v1/workflows/runs/exec-77", headers=_auth(settings))

    assert response.status_code == 200
    body = response.json()
    assert body["execution_id"] == "exec-77"
    assert body["status"] == "completed"
    assert body["finished"] is True
    assert seen["url"] == "http://n8n.test:5678/rest/executions/exec-77"
    assert seen["key"] == settings.n8n_api_token


def test_upstream_failure_becomes_502(
    client: TestClient,
    settings: Settings,
    use_n8n_transport,  # noqa: ANN001
) -> None:
    use_n8n_transport(httpx.MockTransport(lambda request: httpx.Response(503)))

    response = client.post(
        "/api/v1/workflows/invoice-enrichment/run", headers=_auth(settings), json={}
    )

    assert response.status_code == 502
    assert response.json()["title"] == "n8n webhook rejected the request"
