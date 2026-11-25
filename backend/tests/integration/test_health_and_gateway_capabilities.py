"""Integration tests for health, build metadata, correlation headers, and BFF capabilities."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def test_health_reports_real_service(client: TestClient) -> None:
    response = client.get(
        "/api/v1/health", headers={"X-Correlation-ID": "corr-health-check"}
    )

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "ancientstudio-api",
        "environment": "test",
        "version": "1.0.0",
    }
    assert response.headers["X-Correlation-ID"] == "corr-health-check"


def test_build_exposes_commit_sha(client: TestClient) -> None:
    response = client.get("/api/v1/build")

    assert response.status_code == 200
    assert response.json() == {"sha": "test-sha-123"}


def test_gateway_capabilities_exposes_modular_domains_and_telemetry(
    client: TestClient,
) -> None:
    response = client.get("/api/v1/gateway/capabilities")

    assert response.status_code == 200
    body = response.json()
    assert body["architecture"] == "modular-monolith-event-driven"
    assert set(body["domains"]) == {
        "gateway",
        "etl",
        "automation_n8n",
        "scraping",
        "ai_workflows",
        "pipelines_simulator",
    }
    assert "automation.n8n.trigger" in body["worker_topics"]
    assert "queued" in body["queue"]
    assert "hits" in body["cache"]
