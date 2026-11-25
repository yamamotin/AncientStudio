"""FastAPI dependency providers for the Modular Monolith.

Tests override these providers to inject deterministic settings, stores, queues,
inspectors, and ``httpx.MockTransport`` instances without touching production code.
"""

from __future__ import annotations

from collections.abc import Callable

from app.cache import CacheBackend, IdempotencyStore, create_cache_backend
from app.core.config import Settings, get_settings
from app.core.security import ApiKeyVerifier, ApiPrincipal, Scope
from app.domains.ai_workflows import (
    AIWorkflowService,
    OpenAICompatibleInferenceAdapter,
    StructuredInferencePort,
)
from app.domains.automation_n8n import N8NAutomationService, N8NClient
from app.domains.etl import ETLService
from app.domains.gateway import GatewayService
from app.domains.pipelines_simulator import (
    DEFAULT_REPO_ROOT,
    PipelineSimulatorService,
    PipelineStageInspectorPort,
    RepositoryStageInspector,
)
from app.domains.rag_console import (
    EmbeddingProviderPort,
    RAGConsoleService,
    RAGIndexStore,
    create_embedding_provider,
)
from app.domains.scraping import HttpxPageFetcher, PageFetcherPort, ScrapingService
from app.queue import EventBus, JobQueue, create_job_queue
from app.workers import WorkerRegistry
from fastapi import Depends, Header, Request


def get_correlation_id(request: Request) -> str:
    return getattr(request.state, "correlation_id", "unknown")


def get_cache_backend(settings: Settings = Depends(get_settings)) -> CacheBackend:
    return create_cache_backend(settings)


def get_idempotency_store(settings: Settings = Depends(get_settings)) -> IdempotencyStore:
    return IdempotencyStore(settings.idempotency_ttl_seconds)


def get_job_queue(settings: Settings = Depends(get_settings)) -> JobQueue:
    return create_job_queue(settings)


def get_event_bus() -> EventBus:
    return EventBus()


def get_worker_registry() -> WorkerRegistry:
    return WorkerRegistry()


def get_page_fetcher(settings: Settings = Depends(get_settings)) -> PageFetcherPort:
    return HttpxPageFetcher(settings)


def get_inference_port(
    settings: Settings = Depends(get_settings),
) -> StructuredInferencePort:
    return OpenAICompatibleInferenceAdapter(settings)


def get_pipeline_inspector() -> PipelineStageInspectorPort:
    return RepositoryStageInspector()


def get_embedding_provider(
    settings: Settings = Depends(get_settings),
) -> EmbeddingProviderPort:
    return create_embedding_provider(settings)


def get_rag_index_store() -> RAGIndexStore:
    return RAGIndexStore()


def get_etl_service(cache: CacheBackend = Depends(get_cache_backend)) -> ETLService:
    return ETLService(cache=cache)


def get_gateway_service(
    store: IdempotencyStore = Depends(get_idempotency_store),
) -> GatewayService:
    return GatewayService(store)


def get_n8n_client(settings: Settings = Depends(get_settings)) -> N8NClient:
    return N8NClient(settings)


def get_n8n_service(
    client: N8NClient = Depends(get_n8n_client),
    queue: JobQueue = Depends(get_job_queue),
    cache: CacheBackend = Depends(get_cache_backend),
    store: IdempotencyStore = Depends(get_idempotency_store),
    event_bus: EventBus = Depends(get_event_bus),
) -> N8NAutomationService:
    return N8NAutomationService(
        client,
        queue=queue,
        cache=cache,
        idempotency_store=store,
        event_bus=event_bus,
    )


def get_scraping_service(
    settings: Settings = Depends(get_settings),
    queue: JobQueue = Depends(get_job_queue),
    cache: CacheBackend = Depends(get_cache_backend),
    fetcher: PageFetcherPort = Depends(get_page_fetcher),
    event_bus: EventBus = Depends(get_event_bus),
) -> ScrapingService:
    return ScrapingService(
        settings=settings,
        queue=queue,
        cache=cache,
        fetcher=fetcher,
        event_bus=event_bus,
    )


def get_ai_workflow_service(
    queue: JobQueue = Depends(get_job_queue),
    inference_port: StructuredInferencePort = Depends(get_inference_port),
    event_bus: EventBus = Depends(get_event_bus),
) -> AIWorkflowService:
    return AIWorkflowService(
        queue=queue,
        inference_port=inference_port,
        event_bus=event_bus,
    )


def get_pipeline_simulator_service(
    settings: Settings = Depends(get_settings),
    queue: JobQueue = Depends(get_job_queue),
    inspector: PipelineStageInspectorPort = Depends(get_pipeline_inspector),
    cache: CacheBackend = Depends(get_cache_backend),
    event_bus: EventBus = Depends(get_event_bus),
) -> PipelineSimulatorService:
    repo_root = settings.repo_root_override or DEFAULT_REPO_ROOT
    return PipelineSimulatorService(
        queue=queue,
        repo_root=repo_root,
        inspector=inspector,
        cache=cache,
        event_bus=event_bus,
    )


def get_rag_console_service(
    settings: Settings = Depends(get_settings),
    index_store: RAGIndexStore = Depends(get_rag_index_store),
    embedder: EmbeddingProviderPort = Depends(get_embedding_provider),
    inference_port: StructuredInferencePort = Depends(get_inference_port),
    cache: CacheBackend = Depends(get_cache_backend),
    queue: JobQueue = Depends(get_job_queue),
    event_bus: EventBus = Depends(get_event_bus),
) -> RAGConsoleService:
    return RAGConsoleService(
        settings=settings,
        index_store=index_store,
        embedder=embedder,
        inference_port=inference_port,
        cache=cache,
        queue=queue,
        event_bus=event_bus,
    )


def require_workflow_token(
    x_api_key: str = Header(..., alias="X-API-Key"),
    settings: Settings = Depends(get_settings),
) -> ApiPrincipal:
    return ApiKeyVerifier(settings).authorize(x_api_key, [Scope.WORKFLOWS_TRIGGER])


def require_scopes(*scopes: Scope) -> Callable[..., ApiPrincipal]:
    """Build a FastAPI dependency enforcing ``X-API-Key`` authentication and scope grants."""

    def _dependency(
        x_api_key: str = Header(..., alias="X-API-Key"),
        settings: Settings = Depends(get_settings),
    ) -> ApiPrincipal:
        return ApiKeyVerifier(settings).authorize(x_api_key, scopes)

    return _dependency
