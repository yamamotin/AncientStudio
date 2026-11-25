"""Interactive Technical RAG Console service: hybrid indexing, verified citations & grounding."""

from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any

from app.cache.base import CacheBackend
from app.core.config import Settings
from app.core.errors import (
    DomainValidationError,
    ResourceNotFoundError,
    UpstreamServiceError,
)
from app.core.security import fingerprint, sanitize_identifier, sanitize_text
from app.core.time import utc_now
from app.domains.ai_workflows import (
    OpenAICompatibleInferenceAdapter,
    StructuredInferencePort,
)
from app.domains.pipelines_simulator.service import DEFAULT_REPO_ROOT
from app.domains.rag_console.corpus import (
    build_repository_corpus,
    verify_chunk_on_disk,
)
from app.domains.rag_console.embeddings import (
    EmbeddingProviderPort,
    create_embedding_provider,
)
from app.domains.rag_console.retriever import (
    HybridCorpusIndex,
    RankedChunkHit,
    format_chunk_for_indexing,
)
from app.domains.rag_console.schemas import (
    GenerationUsed,
    RAGConsoleQueryRequest,
    RAGConsoleQueryResponse,
    RAGGroundedSynthesisPayload,
    RAGIndexRebuildOut,
    RAGIndexStatusOut,
    RAGSearchRequest,
    RAGSearchResponse,
    RAGSourceDetailOut,
    VerifiableCitation,
)
from app.queue.base import EventBus, JobQueue
from app.queue.models import DomainEvent, JobEnvelope
from pydantic import ValidationError

RAG_REINDEX_TOPIC = "rag.reindex"


class RAGIndexStore:
    """Shared concurrency-safe holder for the active ``HybridCorpusIndex``."""

    def __init__(self) -> None:
        self.index: HybridCorpusIndex | None = None
        self.lock = asyncio.Lock()


def _make_excerpt(content: str, max_len: int = 360) -> str:
    compact = "\n".join(line.rstrip() for line in content.splitlines() if line.strip())
    if len(compact) <= max_len:
        return compact
    return compact[: max_len - 3].rstrip() + "..."


def _synthesize_extractive_answer(
    question: str,
    citations: list[VerifiableCitation],
) -> tuple[str, list[str]]:
    """Build a deterministic, citation-grounded technical synthesis from retrieved chunks."""
    if not citations:
        return (
            "Nenhum trecho correspondente foi encontrado no índice arquitetural e de código "
            f"do repositório para a consulta '{question}'.",
            [],
        )

    lines: list[str] = []
    highlights: list[str] = []

    top = citations[0]
    lines.append(
        f"Referência primária localizada em `{top.source_path}` "
        f"(linhas {top.start_line}–{top.end_line}, `{top.symbol_or_heading}`) {top.citation_id}."
    )

    for cit in citations[:4]:
        first_meaningful = next(
            (
                ln.strip().lstrip("#*- ").strip()
                for ln in cit.excerpt.splitlines()
                if len(ln.strip()) >= 12
            ),
            cit.symbol_or_heading,
        )
        lines.append(
            f"- {cit.citation_id} `{cit.source_path}:{cit.start_line}-{cit.end_line}` "
            f"({cit.symbol_or_heading}): {first_meaningful[:180]}"
        )
        highlights.append(
            f"{cit.citation_id} {cit.source_path}:{cit.start_line}-{cit.end_line} "
            f"— {cit.symbol_or_heading} (sha256:{cit.content_sha256[:12]})"
        )

    return "\n".join(lines), highlights


class RAGConsoleService:
    """Orchestrates repository indexing, hybrid/vector retrieval, and grounded console Q&A."""

    def __init__(
        self,
        *,
        settings: Settings,
        index_store: RAGIndexStore,
        embedder: EmbeddingProviderPort | None = None,
        inference_port: StructuredInferencePort | None = None,
        cache: CacheBackend | None = None,
        queue: JobQueue | None = None,
        event_bus: EventBus | None = None,
        repo_root: Path | None = None,
    ) -> None:
        self._settings = settings
        self._store = index_store
        self._embedder = embedder or create_embedding_provider(settings)
        self._inference_port = inference_port
        self._cache = cache
        self._queue = queue
        self._event_bus = event_bus
        self._repo_root = repo_root or settings.repo_root_override or DEFAULT_REPO_ROOT

    def _status_from_index(self, index: HybridCorpusIndex) -> RAGIndexStatusOut:
        return RAGIndexStatusOut(
            indexed=True,
            corpus_fingerprint=index.corpus_fingerprint,
            total_documents=index.total_documents,
            total_chunks=len(index.chunks),
            embedding_backend=index.embedding_backend,
            embedding_dimensions=index.embedding_dimensions,
            indexed_at=index.indexed_at,
            breakdown_by_kind=index.breakdown_by_kind(),
        )

    async def ensure_indexed(self) -> HybridCorpusIndex:
        if self._store.index is not None:
            return self._store.index
        async with self._store.lock:
            if self._store.index is not None:
                return self._store.index
            return await self._build_and_swap_index()

    async def _build_and_swap_index(self) -> HybridCorpusIndex:
        chunks, doc_count, corpus_fp = await asyncio.to_thread(
            build_repository_corpus,
            self._repo_root,
            max_chars=self._settings.rag_chunk_max_chars,
            overlap_lines=self._settings.rag_chunk_overlap_lines,
        )
        texts = [format_chunk_for_indexing(chunk) for chunk in chunks]
        vectors = await self._embedder.embed_texts(texts) if texts else []
        dims = len(vectors[0]) if vectors else self._embedder.dimensions

        built = HybridCorpusIndex(
            chunks=chunks,
            vectors=vectors,
            total_documents=doc_count,
            corpus_fingerprint=corpus_fp,
            embedding_backend=self._embedder.provider_name,
            embedding_dimensions=dims,
            indexed_at=utc_now(),
        )
        self._store.index = built
        return built

    async def get_index_status(self) -> RAGIndexStatusOut:
        index = await self.ensure_indexed()
        return self._status_from_index(index)

    async def rebuild_index(self, *, correlation_id: str = "manual") -> RAGIndexStatusOut:
        async with self._store.lock:
            index = await self._build_and_swap_index()
        status_out = self._status_from_index(index)
        if self._event_bus is not None:
            await self._event_bus.publish(
                DomainEvent(
                    event_type="rag.index.rebuilt",
                    source="rag_console",
                    correlation_id=correlation_id,
                    payload=status_out.model_dump(mode="json"),
                )
            )
        return status_out

    async def enqueue_rebuild(
        self,
        *,
        correlation_id: str,
        idempotency_key: str | None = None,
    ) -> RAGIndexRebuildOut:
        if self._queue is None:
            status_out = await self.rebuild_index(correlation_id=correlation_id)
            return RAGIndexRebuildOut(mode="sync", status=status_out)

        job = await self._queue.enqueue(
            RAG_REINDEX_TOPIC,
            {"repo_root": str(self._repo_root)},
            correlation_id=correlation_id,
            idempotency_key=idempotency_key,
        )
        return RAGIndexRebuildOut(mode="queued", job_id=job.job_id)

    async def execute_reindex_job(self, job: JobEnvelope) -> dict[str, Any]:
        status_out = await self.rebuild_index(correlation_id=job.correlation_id)
        return status_out.model_dump(mode="json")

    def _build_verified_citations(self, hits: list[RankedChunkHit]) -> list[VerifiableCitation]:
        citations: list[VerifiableCitation] = []
        for rank, hit in enumerate(hits, start=1):
            chunk = hit.chunk
            verified, _ = verify_chunk_on_disk(self._repo_root, chunk)
            citations.append(
                VerifiableCitation(
                    citation_id=f"[{rank}]",
                    chunk_id=chunk.chunk_id,
                    source_path=chunk.source_path,
                    source_kind=chunk.source_kind,
                    symbol_or_heading=chunk.symbol_or_heading,
                    start_line=chunk.start_line,
                    end_line=chunk.end_line,
                    content_sha256=chunk.content_sha256,
                    verified_on_disk=verified,
                    excerpt=_make_excerpt(chunk.content),
                    scores=hit.scores,
                )
            )
        return citations

    async def search(self, request: RAGSearchRequest) -> RAGSearchResponse:
        clean_query = sanitize_text(request.query, max_length=600)
        if len(clean_query) < 2:
            raise DomainValidationError("Search query must contain at least 2 characters.")

        index = await self.ensure_indexed()
        alpha = (
            request.alpha if request.alpha is not None else self._settings.rag_hybrid_alpha
        )
        q_vecs = await self._embedder.embed_texts([clean_query])
        q_vec = q_vecs[0] if q_vecs else []

        hits, total_candidates = index.search(
            query=clean_query,
            query_vector=q_vec,
            top_k=request.top_k,
            mode=request.retrieval_mode,
            alpha=alpha,
            source_kinds=request.source_kinds,
            path_prefix=request.path_prefix,
        )
        citations = await asyncio.to_thread(self._build_verified_citations, hits)
        return RAGSearchResponse(
            query=clean_query,
            retrieval_mode=request.retrieval_mode,
            corpus_fingerprint=index.corpus_fingerprint,
            total_candidates=total_candidates,
            results=citations,
        )

    async def get_source_detail(self, chunk_id: str) -> RAGSourceDetailOut:
        safe_id = sanitize_identifier(chunk_id, field_name="chunk_id")
        index = await self.ensure_indexed()
        chunk = index.get_chunk(safe_id)
        if chunk is None:
            raise ResourceNotFoundError(
                f"No indexed source chunk found for id '{safe_id}'.",
                title="RAG chunk not found",
            )

        verified, current_sha = await asyncio.to_thread(
            verify_chunk_on_disk,
            self._repo_root,
            chunk,
        )
        return RAGSourceDetailOut(
            chunk_id=chunk.chunk_id,
            source_path=chunk.source_path,
            source_kind=chunk.source_kind,
            symbol_or_heading=chunk.symbol_or_heading,
            start_line=chunk.start_line,
            end_line=chunk.end_line,
            content=chunk.content,
            indexed_sha256=chunk.content_sha256,
            current_disk_sha256=current_sha,
            verified_on_disk=verified,
        )

    def _can_use_llm(self) -> bool:
        if self._inference_port is None:
            return False
        if isinstance(self._inference_port, OpenAICompatibleInferenceAdapter):
            return bool((self._settings.ai_provider_api_key or "").strip())
        return True

    async def _synthesize_llm_answer(
        self,
        question: str,
        citations: list[VerifiableCitation],
        index: HybridCorpusIndex,
    ) -> tuple[str, list[str]]:
        assert self._inference_port is not None
        context_blocks: list[str] = []
        valid_ids = {c.citation_id for c in citations}

        for cit in citations:
            chunk = index.get_chunk(cit.chunk_id)
            body = chunk.content if chunk is not None else cit.excerpt
            context_blocks.append(
                f"{cit.citation_id} {cit.source_path}:{cit.start_line}-{cit.end_line} "
                f"({cit.symbol_or_heading})\n{body}"
            )

        system_prompt = (
            "You are the AncientStudio Principal Architecture RAG Console. "
            "Answer strictly using the numbered repository excerpts provided. "
            "Cite sources inline using exact bracketed IDs like [1], [2], and list "
            "only valid cited IDs in cited_ids."
        )
        user_prompt = (
            f"Technical Question:\n{question}\n\n"
            f"Verified Repository Sources:\n\n" + "\n\n---\n\n".join(context_blocks)
        )
        raw = await self._inference_port.generate_structured(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            response_schema=RAGGroundedSynthesisPayload.model_json_schema(),
            timeout_seconds=self._settings.ai_provider_timeout_seconds,
        )
        try:
            validated = RAGGroundedSynthesisPayload.model_validate(raw)
        except ValidationError as exc:
            raise UpstreamServiceError(
                "LLM synthesis response failed RAG output schema validation.",
                title="RAG synthesis validation failed",
            ) from exc

        kept_ids = [cid for cid in validated.cited_ids if cid in valid_ids]
        highlights = list(validated.architectural_highlights)
        if not highlights and kept_ids:
            by_cid = {c.citation_id: c for c in citations}
            highlights = [
                f"{cid} {by_cid[cid].source_path}:{by_cid[cid].start_line}-{by_cid[cid].end_line}"
                for cid in kept_ids
            ]
        return validated.answer, highlights

    async def query(
        self,
        request: RAGConsoleQueryRequest,
        *,
        correlation_id: str,
    ) -> RAGConsoleQueryResponse:
        clean_question = sanitize_text(request.question, max_length=1000)
        if len(clean_question) < 3:
            raise DomainValidationError("Console question must contain at least 3 characters.")

        index = await self.ensure_indexed()
        alpha = (
            request.alpha if request.alpha is not None else self._settings.rag_hybrid_alpha
        )
        use_llm = request.generation_mode == "llm" or (
            request.generation_mode == "auto" and self._can_use_llm()
        )
        gen_tag: GenerationUsed = "llm-grounded" if use_llm else "extractive-grounded"

        cache_key = "rag:query:" + fingerprint(
            index.corpus_fingerprint,
            clean_question,
            str(request.top_k),
            request.retrieval_mode,
            gen_tag,
            f"{alpha:.3f}",
            ",".join(sorted(request.source_kinds or [])),
            request.path_prefix or "",
        )

        if self._cache is not None:
            cached_raw = self._cache.get(cache_key)
            if isinstance(cached_raw, dict):
                cached_resp = RAGConsoleQueryResponse.model_validate(cached_raw)
                # Re-verify every citation against disk so file mutations are never masked.
                fresh_citations: list[VerifiableCitation] = []
                for cit in cached_resp.citations:
                    chunk = index.get_chunk(cit.chunk_id)
                    verified = (
                        verify_chunk_on_disk(self._repo_root, chunk)[0]
                        if chunk is not None
                        else False
                    )
                    fresh_citations.append(
                        cit.model_copy(update={"verified_on_disk": verified})
                    )
                return cached_resp.model_copy(
                    update={
                        "citations": fresh_citations,
                        "cached": True,
                        "correlation_id": correlation_id,
                    }
                )

        search_out = await self.search(
            RAGSearchRequest(
                query=clean_question,
                top_k=request.top_k,
                retrieval_mode=request.retrieval_mode,
                alpha=alpha,
                source_kinds=request.source_kinds,
                path_prefix=request.path_prefix,
            )
        )
        citations = search_out.results

        if use_llm:
            if self._inference_port is None:
                self._inference_port = OpenAICompatibleInferenceAdapter(self._settings)
            answer, highlights = await self._synthesize_llm_answer(
                clean_question,
                citations,
                index,
            )
        else:
            answer, highlights = _synthesize_extractive_answer(clean_question, citations)

        response = RAGConsoleQueryResponse(
            question=clean_question,
            answer=answer,
            architectural_highlights=highlights,
            citations=citations,
            retrieval_mode=request.retrieval_mode,
            generation_used=gen_tag,
            corpus_fingerprint=index.corpus_fingerprint,
            cached=False,
            correlation_id=correlation_id,
        )

        if self._cache is not None:
            self._cache.set(cache_key, response.model_dump(mode="json"))

        if self._event_bus is not None:
            await self._event_bus.publish(
                DomainEvent(
                    event_type="rag.query.completed",
                    source="rag_console",
                    correlation_id=correlation_id,
                    payload={
                        "question": clean_question[:120],
                        "retrieval_mode": request.retrieval_mode,
                        "generation_used": gen_tag,
                        "citations_count": len(citations),
                        "corpus_fingerprint": index.corpus_fingerprint,
                    },
                )
            )

        return response
