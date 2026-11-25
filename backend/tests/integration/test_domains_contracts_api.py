"""Integration tests for modular Scraping, AI Workflows, Pipeline Simulator, and Jobs routes."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def test_scraping_enqueues_valid_url_and_blocks_ssrf(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    blocked = client.post(
        "/api/v1/scraping/jobs",
        headers=auth_headers,
        json={"url": "http://127.0.0.1:8000/internal"},
    )
    assert blocked.status_code == 422

    accepted = client.post(
        "/api/v1/scraping/jobs",
        headers=auth_headers,
        json={
            "url": "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
            "strategy": "structured_metadata",
            "selectors": ["h1", "meta[name='description']"],
        },
    )
    assert accepted.status_code == 202
    job_id = accepted.json()["job_id"]

    job_status = client.get(f"/api/v1/jobs/{job_id}", headers=auth_headers)
    assert job_status.status_code == 200
    assert job_status.json()["topic"] == "scraping.extract"
    assert job_status.json()["status"] == "queued"


def test_ai_workflows_blueprints_and_async_dispatch_stay_distinct_from_rag_console(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    defs_resp = client.get("/api/v1/ai-workflows/definitions")
    assert defs_resp.status_code == 200
    slugs = {item["workflow_slug"] for item in defs_resp.json()}
    assert "invoice-anomaly-triage" in slugs
    assert all("rag" not in slug for slug in slugs)

    # Phase 5 mounts dedicated /api/v1/rag/* console routes separately from ai-workflows.
    openapi_paths = set(client.get("/api/openapi.json").json()["paths"])
    assert "/api/v1/rag/query" in openapi_paths
    assert "/api/v1/rag/search" in openapi_paths

    run_resp = client.post(
        "/api/v1/ai-workflows/runs",
        headers=auth_headers,
        json={
            "workflow_slug": "invoice-anomaly-triage",
            "inputs": {"invoice_key": "NFE-2026-0001"},
        },
    )
    assert run_resp.status_code == 202
    assert run_resp.json()["topic"] == "ai_workflows.execute"


def test_pipeline_simulator_discovers_real_monorepo_targets_and_enqueues_run(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    targets_resp = client.get("/api/v1/pipelines/targets")
    assert targets_resp.status_code == 200
    targets = {item["target_id"]: item for item in targets_resp.json()}

    assert set(targets) == {"backend-api", "ascii-engine", "portfolio-static"}
    assert targets["backend-api"]["manifest_present"] is True
    assert targets["backend-api"]["dockerfile_present"] is True
    assert targets["ascii-engine"]["manifest_present"] is True
    assert targets["portfolio-static"]["manifest_present"] is True

    run_resp = client.post(
        "/api/v1/pipelines/runs",
        headers=auth_headers,
        json={"target_id": "backend-api", "include_docker_audit": True},
    )
    assert run_resp.status_code == 202
    assert run_resp.json()["topic"] == "pipelines.simulate"

    metrics_resp = client.get("/api/v1/jobs/metrics", headers=auth_headers)
    assert metrics_resp.status_code == 200
    assert metrics_resp.json()["queued"] >= 1
