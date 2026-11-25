"""Interactive Technical RAG Console routes: hybrid/vector search, verified sources & Q&A."""

from __future__ import annotations

from app.api.deps import (
    get_correlation_id,
    get_rag_console_service,
    require_scopes,
)
from app.core.security import Scope
from app.domains.rag_console import (
    RAGConsoleQueryRequest,
    RAGConsoleQueryResponse,
    RAGConsoleService,
    RAGIndexRebuildOut,
    RAGIndexStatusOut,
    RAGSearchRequest,
    RAGSearchResponse,
    RAGSourceDetailOut,
)
from fastapi import APIRouter, Depends, Query, Response, status

router = APIRouter(prefix="/rag", tags=["rag-console"])


@router.get(
    "/index/status",
    response_model=RAGIndexStatusOut,
    summary="Inspect hybrid lexical + dense vector index telemetry over repository docs and code",
)
async def rag_index_status(
    service: RAGConsoleService = Depends(get_rag_console_service),
) -> RAGIndexStatusOut:
    return await service.get_index_status()


@router.post(
    "/index/rebuild",
    response_model=RAGIndexRebuildOut,
    dependencies=[Depends(require_scopes(Scope.RAG_INDEX))],
    summary="Rebuild the repository RAG index synchronously or dispatch an async worker job",
)
async def rag_index_rebuild(
    response: Response,
    async_job: bool = Query(
        default=False,
        description="Enqueue rebuild on worker topic 'rag.reindex' when true",
    ),
    idempotency_key: str | None = Query(default=None, min_length=8, max_length=120),
    correlation_id: str = Depends(get_correlation_id),
    service: RAGConsoleService = Depends(get_rag_console_service),
) -> RAGIndexRebuildOut:
    if async_job:
        response.status_code = status.HTTP_202_ACCEPTED
        return await service.enqueue_rebuild(
            correlation_id=correlation_id,
            idempotency_key=idempotency_key,
        )
    status_out = await service.rebuild_index(correlation_id=correlation_id)
    return RAGIndexRebuildOut(mode="sync", status=status_out)


@router.post(
    "/search",
    response_model=RAGSearchResponse,
    summary="Execute hybrid (BM25 + dense vector RRF), pure vector, or lexical repository search",
)
async def rag_search(
    body: RAGSearchRequest,
    service: RAGConsoleService = Depends(get_rag_console_service),
) -> RAGSearchResponse:
    return await service.search(body)


@router.post(
    "/query",
    response_model=RAGConsoleQueryResponse,
    dependencies=[Depends(require_scopes(Scope.RAG_QUERY))],
    summary="Query the interactive technical RAG console with verifiable source citations",
)
async def rag_console_query(
    body: RAGConsoleQueryRequest,
    correlation_id: str = Depends(get_correlation_id),
    service: RAGConsoleService = Depends(get_rag_console_service),
) -> RAGConsoleQueryResponse:
    return await service.query(body, correlation_id=correlation_id)


@router.get(
    "/sources/{chunk_id}",
    response_model=RAGSourceDetailOut,
    summary="Inspect an indexed source chunk and verify its SHA-256 against disk lines",
)
async def rag_source_detail(
    chunk_id: str,
    service: RAGConsoleService = Depends(get_rag_console_service),
) -> RAGSourceDetailOut:
    return await service.get_source_detail(chunk_id)
