"""Unit tests for Phase 5 Console RAG hybrid/vector retrieval and citation verification."""

from __future__ import annotations

import asyncio
import json
import math
from pathlib import Path

import httpx
import pytest
from app.cache import InMemoryTTLCache
from app.core.config import Settings
from app.core.errors import ServiceUnavailableError, UpstreamServiceError
from app.domains.pipelines_simulator import DEFAULT_REPO_ROOT
from app.domains.rag_console import (
    OpenAICompatibleEmbeddingAdapter,
    RAGConsoleQueryRequest,
    RAGConsoleService,
    RAGIndexStore,
    RAGSearchRequest,
    verify_chunk_on_disk,
)

pytestmark = pytest.mark.unit


def test_real_repository_hybrid_vector_and_lexical_indexing_and_citations(
    settings: Settings,
) -> None:
    async def _run() -> None:
        store = RAGIndexStore()
        service = RAGConsoleService(
            settings=settings,
            index_store=store,
            repo_root=DEFAULT_REPO_ROOT,
        )

        status = await service.get_index_status()
        assert status.indexed is True
        assert status.total_documents >= 25
        assert status.total_chunks >= 60
        assert status.embedding_dimensions == settings.rag_vector_dimensions
        assert set(status.breakdown_by_kind) >= {
            "documentation",
            "backend_code",
            "engine_code",
            "frontend_code",
            "infra_cicd",
        }

        assert store.index is not None
        sample_chunk = store.index.chunks[0]
        verified, disk_sha = verify_chunk_on_disk(DEFAULT_REPO_ROOT, sample_chunk)
        assert verified is True
        assert disk_sha == sample_chunk.content_sha256

        for mode in ("hybrid", "vector", "lexical"):
            res = await service.search(
                RAGSearchRequest(
                    query="RedisJobQueue ZSET delayed retry dead letter queue",
                    top_k=5,
                    retrieval_mode=mode,
                    source_kinds=["backend_code", "documentation"],
                )
            )
            assert len(res.results) == 5
            assert all(item.verified_on_disk is True for item in res.results)
            paths = [item.source_path for item in res.results]
            assert any("redis_queue.py" in p or "ARCHITECTURE.md" in p for p in paths)

    asyncio.run(_run())


def test_citation_verification_detects_disk_mutation_until_reindexed(
    settings: Settings,
    tmp_path: Path,
) -> None:
    async def _run() -> None:
        (tmp_path / "docs").mkdir()
        (tmp_path / "backend" / "app").mkdir(parents=True)

        arch_md = tmp_path / "docs" / "architecture.md"
        arch_md.write_text(
            "# Gateway Security\n\nHMAC-SHA256 validation protects /invoices/parse.\n",
            encoding="utf-8",
        )
        sec_py = tmp_path / "backend" / "app" / "security.py"
        sec_py.write_text(
            'def verify_hmac_signature(payload: bytes) -> bool:\n'
            '    """Constant-time HMAC check."""\n'
            '    return len(payload) > 0\n',
            encoding="utf-8",
        )

        cache = InMemoryTTLCache(default_ttl_seconds=300)
        store = RAGIndexStore()
        service = RAGConsoleService(
            settings=settings,
            index_store=store,
            cache=cache,
            repo_root=tmp_path,
        )

        initial_status = await service.get_index_status()
        first_query = await service.query(
            RAGConsoleQueryRequest(
                question="How does HMAC verify_hmac_signature protect invoices?",
                top_k=2,
                generation_mode="extractive",
            ),
            correlation_id="corr-rag-1",
        )
        assert first_query.cached is False
        assert first_query.generation_used == "extractive-grounded"
        assert len(first_query.citations) == 2
        assert all(c.verified_on_disk is True for c in first_query.citations)

        sec_py.write_text(
            'def verify_hmac_signature(payload: bytes) -> bool:\n'
            '    """TAMPERED IMPLEMENTATION."""\n'
            '    return False\n',
            encoding="utf-8",
        )

        cached_query = await service.query(
            RAGConsoleQueryRequest(
                question="How does HMAC verify_hmac_signature protect invoices?",
                top_k=2,
                generation_mode="extractive",
            ),
            correlation_id="corr-rag-2",
        )
        assert cached_query.cached is True
        by_path = {c.source_path: c.verified_on_disk for c in cached_query.citations}
        assert by_path["backend/app/security.py"] is False
        assert by_path["docs/architecture.md"] is True

        rebuilt = await service.rebuild_index(correlation_id="corr-rebuild")
        assert rebuilt.corpus_fingerprint != initial_status.corpus_fingerprint

        fresh_query = await service.query(
            RAGConsoleQueryRequest(
                question="How does HMAC verify_hmac_signature protect invoices?",
                top_k=2,
                generation_mode="extractive",
            ),
            correlation_id="corr-rag-3",
        )
        assert fresh_query.cached is False
        assert all(c.verified_on_disk is True for c in fresh_query.citations)

    asyncio.run(_run())


def test_openai_embedding_adapter_and_llm_grounded_citation_filtering(
    tmp_path: Path,
) -> None:
    async def _run() -> None:
        (tmp_path / "docs").mkdir()
        (tmp_path / "docs" / "guide.md").write_text(
            "# Event Queue\n\nRedisJobQueue uses ZSET for delayed backoff retries.\n",
            encoding="utf-8",
        )

        missing_key_settings = Settings(
            environment="test",
            rag_embedding_provider="openai",
            ai_provider_api_key=None,
        )
        no_key_adapter = OpenAICompatibleEmbeddingAdapter(missing_key_settings)
        with pytest.raises(ServiceUnavailableError):
            await no_key_adapter.embed_texts(["hello"])

        active_settings = Settings(
            environment="test",
            rag_embedding_provider="openai",
            ai_provider_api_key="sk-test-valid-embedding-key",
            ai_provider_base_url="https://llm.example.test/v1",
        )

        def handler(request: httpx.Request) -> httpx.Response:
            if request.url.path.endswith("/embeddings"):
                body = json.loads(request.content.decode("utf-8"))
                data = [
                    {"index": idx, "embedding": [3.0, 4.0, 0.0, 0.0]}
                    for idx, _ in enumerate(body["input"])
                ]
                return httpx.Response(200, json={"data": data})
            return httpx.Response(502, json={"error": "bad gateway"})

        embedder = OpenAICompatibleEmbeddingAdapter(
            active_settings,
            transport=httpx.MockTransport(handler),
        )
        vecs = await embedder.embed_texts(["Redis ZSET queue"])
        assert len(vecs) == 1
        assert math.isclose(sum(v * v for v in vecs[0]), 1.0, rel_tol=1e-6)
        assert math.isclose(vecs[0][0], 0.6, rel_tol=1e-5)
        assert math.isclose(vecs[0][1], 0.8, rel_tol=1e-5)

        bad_embedder = OpenAICompatibleEmbeddingAdapter(
            active_settings,
            transport=httpx.MockTransport(lambda req: httpx.Response(503)),
        )
        with pytest.raises(UpstreamServiceError):
            await bad_embedder.embed_texts(["test"])

        class StubStructuredLLM:
            async def generate_structured(
                self,
                *,
                system_prompt: str,
                user_prompt: str,
                response_schema: dict,
                timeout_seconds: float = 15.0,
            ) -> dict:
                assert "[1]" in user_prompt
                return {
                    "answer": "RedisJobQueue schedules retries via ZSET [1].",
                    "cited_ids": ["[1]", "[99]"],
                    "architectural_highlights": [],
                }

        store = RAGIndexStore()
        rag = RAGConsoleService(
            settings=active_settings,
            index_store=store,
            embedder=embedder,
            inference_port=StubStructuredLLM(),
            repo_root=tmp_path,
        )
        ans = await rag.query(
            RAGConsoleQueryRequest(
                question="How are retries scheduled in RedisJobQueue?",
                generation_mode="llm",
            ),
            correlation_id="corr-llm-rag",
        )
        assert ans.generation_used == "llm-grounded"
        assert "[1]" in ans.answer
        assert len(ans.architectural_highlights) == 1
        assert ans.architectural_highlights[0].startswith("[1] docs/guide.md:")

    asyncio.run(_run())
