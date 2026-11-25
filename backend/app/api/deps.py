"""FastAPI dependency providers for the Modular Monolith.

Tests override these providers to inject deterministic settings, stores, queues,
and ``httpx.MockTransport`` instances without touching production code.
"""

from __future__ import annotations

from collections.abc import Callable

from app.cache import CacheBackend, IdempotencyStore, InMemoryTTLCache
from app.core.config import Settings, get_settings
from app.core.security import ApiKeyVerifier, ApiPrincipal, Scope
from app.domains.ai_workflows import AIWorkflowService
from app.domains.automation_n8n import N8NAutomationService, N8NClient
from app.domains.etl import ETLService
from app.domains.gateway import GatewayService
from app.domains.pipelines_simulator import DEFAULT_REPO_ROOT, PipelineSimulatorService
from app.domains.scraping import ScrapingService
from app.queue import EventBus, InMemoryJobQueue, JobQueue
from app.workers import WorkerRegistry
from fastapi import Depends, Header, Request


def get_correlation_id(request: Request) -> str:
    return getattr(request.state, "correlation_id", "unknown")


def get_cache_backend(settings: Settings = Depends(get_settings)) -> CacheBackend:
    return InMemoryTTLCache(
        default_ttl_seconds=settings.cache_default_ttl_seconds,
        max_entries=settings.cache_max_entries,
    )


def get_idempotency_store(settings: Settings = Depends(get_settings)) -> IdempotencyStore:
    return IdempotencyStore(settings.idempotency_ttl_seconds)


def get_job_queue(settings: Settings = Depends(get_settings)) -> JobQueue:
    return InMemoryJobQueue(
        max_size=settings.queue_max_size,
        default_max_retries=settings.worker_max_retries,
    )


def get_event_bus() -> EventBus:
    return EventBus()


def get_worker_registry() -> WorkerRegistry:
    return WorkerRegistry()


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
) -> N8NAutomationService:
    return N8NAutomationService(client, queue=queue)


def get_scraping_service(
    settings: Settings = Depends(get_settings),
    queue: JobQueue = Depends(get_job_queue),
    cache: CacheBackend = Depends(get_cache_backend),
) -> ScrapingService:
    return ScrapingService(settings=settings, queue=queue, cache=cache)


def get_ai_workflow_service(
    queue: JobQueue = Depends(get_job_queue),
) -> AIWorkflowService:
    return AIWorkflowService(queue=queue)


def get_pipeline_simulator_service(
    settings: Settings = Depends(get_settings),
    queue: JobQueue = Depends(get_job_queue),
) -> PipelineSimulatorService:
    repo_root = settings.repo_root_override or DEFAULT_REPO_ROOT
    return PipelineSimulatorService(queue=queue, repo_root=repo_root)


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
