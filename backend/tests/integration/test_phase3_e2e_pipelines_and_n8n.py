"""End-to-end Fase 3 integration tests: Scraping, AI Workflows, EventBus -> n8n & HMAC callbacks."""

from __future__ import annotations

import json
import time

import httpx
import pytest
from app.api.deps import get_inference_port, get_n8n_client, get_page_fetcher
from app.core.config import Settings
from app.core.security import sign_body
from app.domains.ai_workflows import OpenAICompatibleInferenceAdapter
from app.domains.automation_n8n import N8NClient
from app.domains.scraping import HttpxPageFetcher
from app.main import create_app
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def _wait_for_job_completion(
    client: TestClient,
    job_id: str,
    headers: dict[str, str],
    *,
    timeout_seconds: float = 3.0,
) -> dict:
    deadline = time.monotonic() + timeout_seconds
    last_body: dict = {}
    while time.monotonic() < deadline:
        resp = client.get(f"/api/v1/jobs/{job_id}", headers=headers)
        assert resp.status_code == 200
        last_body = resp.json()
        if last_body["status"] in {"completed", "dead_letter"}:
            return last_body
        time.sleep(0.02)
    raise AssertionError(f"Job {job_id} did not finish within timeout: {last_body}")


def test_lifespan_workers_execute_scraping_and_ai_workflows_and_trigger_n8n_bridge() -> None:
    cfg = Settings(
        environment="test",
        workflow_api_token="test-workflow-token-0123456789",
        n8n_base_url="http://n8n.test:5678",
        n8n_webhook_base_url="http://n8n.test:5678/webhook",
        n8n_api_token="test-n8n-api-token",
        n8n_webhook_token="test-n8n-webhook-token",
        ai_provider_api_key="test-ai-provider-key-0123456789",
        worker_autostart=True,
        worker_concurrency=2,
        worker_poll_timeout_seconds=0.02,
        n8n_event_bridge_enabled=True,
    )
    app = create_app(cfg)

    triggered_n8n_webhooks: list[str] = []

    def n8n_handler(request: httpx.Request) -> httpx.Response:
        triggered_n8n_webhooks.append(request.url.path)
        return httpx.Response(202, json={"executionId": "exec-bridge-1", "status": "completed"})

    def page_handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            200,
            headers={"Content-Type": "text/html; charset=utf-8"},
            text=(
                "<html><head><title>IBM Hybrid Cloud Architecture</title>"
                '<meta name="description" content="Enterprise event-driven patterns." />'
                "</head><body><h1>Event Backbone</h1></body></html>"
            ),
        )

    def llm_handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            200,
            json={
                "choices": [
                    {
                        "message": {
                            "content": json.dumps(
                                {
                                    "severity": "high",
                                    "anomaly_detected": True,
                                    "risk_score": 0.88,
                                    "findings": ["Suspicious tax variance"],
                                    "recommended_action": "Trigger automated fiscal review.",
                                }
                            )
                        }
                    }
                ]
            },
        )

    app.dependency_overrides[get_n8n_client] = lambda: N8NClient(
        cfg, transport=httpx.MockTransport(n8n_handler)
    )
    app.dependency_overrides[get_page_fetcher] = lambda: HttpxPageFetcher(
        cfg, transport=httpx.MockTransport(page_handler)
    )
    app.dependency_overrides[get_inference_port] = lambda: OpenAICompatibleInferenceAdapter(
        cfg, transport=httpx.MockTransport(llm_handler)
    )

    headers = {"X-API-Key": cfg.workflow_api_token}

    with TestClient(app) as live_client:
        # 1. Enqueue scrape job -> lifespan worker -> EventBus -> scraping-postprocess n8n.
        scrape_resp = live_client.post(
            "/api/v1/scraping/jobs",
            headers=headers,
            json={
                "url": "https://www.ibm.com/architectures/hybrid",
                "strategy": "structured_metadata",
                "selectors": ["h1"],
            },
        )
        assert scrape_resp.status_code == 202
        scrape_job = _wait_for_job_completion(
            live_client, scrape_resp.json()["job_id"], headers
        )
        assert scrape_job["status"] == "completed"
        assert scrape_job["result"]["title"] == "IBM Hybrid Cloud Architecture"
        assert scrape_job["result"]["extracted"]["selector_matches"]["h1"] == [
            "Event Backbone"
        ]

        # 2. Enqueue multi-step AI workflow -> lifespan worker -> EventBus -> ai-anomaly-alert n8n.
        ai_resp = live_client.post(
            "/api/v1/ai-workflows/runs",
            headers=headers,
            json={
                "workflow_slug": "invoice-anomaly-triage",
                "inputs": {
                    "invoice_key": "NFE-BRIDGE-1",
                    "gross": 1000.0,
                    "tax": 0.42,
                    "items": [{"quantity": 1, "unit_price": 800.0}],
                },
            },
        )
        assert ai_resp.status_code == 202
        ai_job = _wait_for_job_completion(live_client, ai_resp.json()["job_id"], headers)
        assert ai_job["status"] == "completed"
        assert ai_job["result"]["final_output"]["severity"] == "high"

        # Wait briefly for bridged n8n jobs enqueued by EventBus to finish on the worker pool.
        deadline = time.monotonic() + 2.0
        while time.monotonic() < deadline and len(triggered_n8n_webhooks) < 2:
            time.sleep(0.02)

        assert "/webhook/scraping-postprocess" in triggered_n8n_webhooks
        assert "/webhook/ai-anomaly-alert" in triggered_n8n_webhooks


def test_expanded_n8n_catalog_and_hmac_signed_webhook_callbacks(
    client: TestClient,
    settings: Settings,
    auth_headers: dict[str, str],
) -> None:
    catalog_resp = client.get("/api/v1/workflows/catalog", headers=auth_headers)
    assert catalog_resp.status_code == 200
    workflow_ids = {item["workflow_id"] for item in catalog_resp.json()}
    assert {
        "invoice-enrichment",
        "scraping-postprocess",
        "ai-anomaly-alert",
    }.issubset(workflow_ids)

    callback_payload = {
        "execution_id": "exec-cb-900",
        "status": "completed",
        "finished": True,
        "started_at": "2026-11-25T01:00:00Z",
        "ended_at": "2026-11-25T01:00:02Z",
        "output": {"enriched": True},
    }
    raw = json.dumps(callback_payload, separators=(",", ":")).encode("utf-8")
    ts = str(int(time.time()))
    sig = sign_body(raw, ts, settings.n8n_webhook_token)
    cb_headers = {
        "Content-Type": "application/json",
        "X-Timestamp": ts,
        "X-N8N-Signature": sig,
    }

    first_cb = client.post(
        "/api/v1/workflows/callbacks/invoice-enrichment",
        content=raw,
        headers=cb_headers,
    )
    second_cb = client.post(
        "/api/v1/workflows/callbacks/invoice-enrichment",
        content=raw,
        headers=cb_headers,
    )

    assert first_cb.status_code == 202
    assert first_cb.headers["Idempotent-Replay"] == "false"
    assert first_cb.json()["replayed"] is False

    assert second_cb.status_code == 200
    assert second_cb.headers["Idempotent-Replay"] == "true"
    assert second_cb.json()["replayed"] is True

    # Invalid HMAC signature must be rejected with 401.
    bad_cb = client.post(
        "/api/v1/workflows/callbacks/invoice-enrichment",
        content=raw,
        headers={**cb_headers, "X-N8N-Signature": "sha256=invalid"},
    )
    assert bad_cb.status_code == 401

    # Querying execution status returns the cached completed callback state directly.
    status_resp = client.get("/api/v1/workflows/runs/exec-cb-900", headers=auth_headers)
    assert status_resp.status_code == 200
    assert status_resp.json()["status"] == "completed"
    assert status_resp.json()["finished"] is True
