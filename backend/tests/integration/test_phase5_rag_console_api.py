"""Integration tests for Phase 5 Interactive Technical RAG Console HTTP routes."""

from __future__ import annotations

import json
import time

import httpx
import pytest
from app.api.deps import get_inference_port
from app.core.config import Settings
from app.domains.ai_workflows import OpenAICompatibleInferenceAdapter
from app.main import create_app
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def test_rag_console_index_search_verified_sources_and_extractive_query(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    status_resp = client.get("/api/v1/rag/index/status")
    assert status_resp.status_code == 200
    status_body = status_resp.json()
    assert status_body["indexed"] is True
    assert status_body["total_documents"] >= 25
    assert status_body["total_chunks"] >= 60

    search_resp = client.post(
        "/api/v1/rag/search",
        json={
            "query": "HttpxPageFetcher SSRF redirect validation streaming",
            "top_k": 4,
            "retrieval_mode": "hybrid",
            "source_kinds": ["backend_code", "documentation"],
        },
    )
    assert search_resp.status_code == 200
    results = search_resp.json()["results"]
    assert len(results) == 4
    top_hit = results[0]
    assert top_hit["verified_on_disk"] is True
    assert top_hit["scores"]["hybrid_score"] > 0

    source_resp = client.get(f"/api/v1/rag/sources/{top_hit['chunk_id']}")
    assert source_resp.status_code == 200
    source_body = source_resp.json()
    assert source_body["verified_on_disk"] is True
    assert source_body["indexed_sha256"] == source_body["current_disk_sha256"]
    assert len(source_body["content"]) > 20

    missing_resp = client.get("/api/v1/rag/sources/chk_nonexistent0000")
    assert missing_resp.status_code == 404

    # Protected query requires valid X-API-Key with rag:query scope.
    unauth_resp = client.post(
        "/api/v1/rag/query",
        headers={"X-API-Key": "invalid-api-key"},
        json={"question": "How does RateLimitMiddleware work?"},
    )
    assert unauth_resp.status_code == 401

    q1 = client.post(
        "/api/v1/rag/query",
        headers=auth_headers,
        json={
            "question": "How does RateLimitMiddleware enforce sliding window quotas?",
            "top_k": 4,
            "retrieval_mode": "hybrid",
            "generation_mode": "auto",
        },
    )
    assert q1.status_code == 200
    q1_body = q1.json()
    assert q1_body["generation_used"] == "extractive-grounded"
    assert q1_body["cached"] is False
    assert "[1]" in q1_body["answer"]
    assert len(q1_body["citations"]) == 4
    assert all(c["verified_on_disk"] is True for c in q1_body["citations"])

    q2 = client.post(
        "/api/v1/rag/query",
        headers=auth_headers,
        json={
            "question": "How does RateLimitMiddleware enforce sliding window quotas?",
            "top_k": 4,
            "retrieval_mode": "hybrid",
            "generation_mode": "auto",
        },
    )
    assert q2.status_code == 200
    assert q2.json()["cached"] is True


def test_rag_console_llm_grounded_synthesis_and_async_worker_reindex() -> None:
    cfg = Settings(
        environment="test",
        worker_autostart=True,
        worker_concurrency=2,
        worker_poll_timeout_seconds=0.02,
        workflow_api_token="test-workflow-token-0123456789",
        ai_provider_api_key="sk-test-rag-llm-provider-key",
        ai_provider_base_url="https://llm.rag.test/v1",
        n8n_event_bridge_enabled=False,
    )
    app = create_app(cfg)
    headers = {"X-API-Key": cfg.workflow_api_token}

    def llm_transport(request: httpx.Request) -> httpx.Response:
        assert request.url.path.endswith("/chat/completions")
        synthesized = {
            "answer": (
                "O pipeline de CI/CD executa merge após os 4 checks, remove a branch "
                "remota e dispara os workflows de redeploy [1] [2]."
            ),
            "cited_ids": ["[1]", "[2]", "[88]"],
            "architectural_highlights": [
                "[1] Ordem estrita merge -> delete-branch -> redeploy",
            ],
        }
        return httpx.Response(
            200,
            json={"choices": [{"message": {"content": json.dumps(synthesized)}}]},
        )

    app.dependency_overrides[get_inference_port] = lambda: OpenAICompatibleInferenceAdapter(
        cfg,
        transport=httpx.MockTransport(llm_transport),
    )

    with TestClient(app) as client:
        query_resp = client.post(
            "/api/v1/rag/query",
            headers=headers,
            json={
                "question": "Qual é a ordem do pipeline de auto-merge e redeploy?",
                "top_k": 3,
                "generation_mode": "llm",
                "source_kinds": ["documentation", "infra_cicd"],
            },
        )
        assert query_resp.status_code == 200
        q_body = query_resp.json()
        assert q_body["generation_used"] == "llm-grounded"
        assert "[1]" in q_body["answer"]
        assert len(q_body["citations"]) == 3

        # Trigger async background re-index on worker topic 'rag.reindex'.
        rebuild_resp = client.post(
            "/api/v1/rag/index/rebuild?async_job=true",
            headers=headers,
        )
        assert rebuild_resp.status_code == 202
        rebuild_body = rebuild_resp.json()
        assert rebuild_body["mode"] == "queued"
        job_id = rebuild_body["job_id"]
        assert job_id is not None

        deadline = time.monotonic() + 5.0
        settled = None
        while time.monotonic() < deadline:
            job_resp = client.get(f"/api/v1/jobs/{job_id}", headers=headers)
            assert job_resp.status_code == 200
            data = job_resp.json()
            if data["status"] in {"completed", "dead_letter"}:
                settled = data
                break
            time.sleep(0.03)

        assert settled is not None
        assert settled["status"] == "completed"
        assert settled["result"]["indexed"] is True
        assert settled["result"]["total_chunks"] >= 60
