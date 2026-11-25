"""Integration tests for Fase 2: lifespan worker pool, HTTP security headers & scoped rate limit."""

from __future__ import annotations

import pytest
from app.core.config import Settings
from app.main import create_app
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def test_lifespan_starts_and_stops_concurrent_worker_runner_cleanly() -> None:
    cfg = Settings(
        environment="test",
        worker_autostart=True,
        worker_concurrency=2,
        worker_poll_timeout_seconds=0.02,
    )
    app = create_app(cfg)

    with TestClient(app) as live_client:
        cap = live_client.get("/api/v1/gateway/capabilities")
        assert cap.status_code == 200
        body = cap.json()
        assert body["workers_running"] is True
        assert body["cache_backend"] == "memory"
        assert body["queue_backend"] == "memory"
        assert set(body["worker_topics"]) == {
            "ai_workflows.execute",
            "automation.n8n.trigger",
            "pipelines.simulate",
            "rag.reindex",
            "scraping.extract",
        }

    assert app.state.worker_runner.is_running is False


def test_security_headers_are_attached_to_api_and_static_responses(
    client: TestClient,
) -> None:
    api_resp = client.get("/api/v1/health")
    assert api_resp.status_code == 200
    assert api_resp.headers["X-Content-Type-Options"] == "nosniff"
    assert api_resp.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"
    assert api_resp.headers["Cache-Control"] == "no-store"
    assert "default-src 'none'" in api_resp.headers["Content-Security-Policy"]
    assert "camera=()" in api_resp.headers["Permissions-Policy"]


def test_rate_limit_middleware_enforces_tiers_and_exempts_health_probes() -> None:
    cfg = Settings(
        environment="test",
        workflow_api_token="test-workflow-token-0123456789",
        admin_api_token="test-admin-api-token-0123456789",
        rate_limit_enabled=True,
        rate_limit_requests_per_minute=2,
        rate_limit_authenticated_per_minute=4,
        rate_limit_admin_per_minute=10,
        rate_limit_window_seconds=60,
    )
    limited_client = TestClient(create_app(cfg))

    r1 = limited_client.get("/api/v1/etl/datasets")
    r2 = limited_client.get("/api/v1/etl/datasets")
    r3 = limited_client.get("/api/v1/etl/datasets")

    assert r1.status_code == 200
    assert r1.headers["X-RateLimit-Limit"] == "2"
    assert r1.headers["X-RateLimit-Remaining"] == "1"
    assert r1.headers["X-RateLimit-Scope"] == "anonymous"

    assert r2.status_code == 200
    assert r2.headers["X-RateLimit-Remaining"] == "0"

    assert r3.status_code == 429
    assert r3.json()["title"] == "Too many requests"
    assert r3.headers["Retry-After"]
    assert r3.headers["X-RateLimit-Scope"] == "anonymous"

    # Health probe stays exempt even when anonymous IP quota is exhausted.
    health = limited_client.get("/api/v1/health")
    assert health.status_code == 200

    # Authenticated and admin keys receive their dedicated higher-tier quotas.
    auth_resp = limited_client.get(
        "/api/v1/workflows/catalog",
        headers={"X-API-Key": cfg.workflow_api_token},
    )
    assert auth_resp.status_code == 200
    assert auth_resp.headers["X-RateLimit-Scope"] == "authenticated"
    assert auth_resp.headers["X-RateLimit-Limit"] == "4"

    assert cfg.admin_api_token is not None
    admin_resp = limited_client.get(
        "/api/v1/jobs/metrics",
        headers={"X-API-Key": cfg.admin_api_token},
    )
    assert admin_resp.status_code == 200
    assert admin_resp.headers["X-RateLimit-Scope"] == "admin"
    assert admin_resp.headers["X-RateLimit-Limit"] == "10"
