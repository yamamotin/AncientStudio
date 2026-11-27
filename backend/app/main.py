"""FastAPI Modular Monolith application factory for the AncientStudio backend."""

from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from api.connectors import create_public_connectors
from app.api.deps import (
    get_cache_backend,
    get_embedding_provider,
    get_event_bus,
    get_idempotency_store,
    get_inference_port,
    get_job_queue,
    get_n8n_client,
    get_page_fetcher,
    get_pipeline_inspector,
    get_public_connectors,
    get_rag_index_store,
    get_worker_registry,
)
from app.api.v1.router import router as v1_router
from app.cache import CacheBackend, IdempotencyStore, create_cache_backend
from app.core.config import Settings, get_settings
from app.core.errors import register_error_handlers
from app.core.logging import CorrelationIdMiddleware, configure_logging
from app.core.middleware import (
    RateLimitMiddleware,
    ScopedRateLimiter,
    SecurityHeadersMiddleware,
)
from app.domains.ai_workflows import (
    AI_WORKFLOW_EXECUTE_TOPIC,
    AIWorkflowService,
    OpenAICompatibleInferenceAdapter,
    StructuredInferencePort,
)
from app.domains.automation_n8n import (
    N8N_TRIGGER_TOPIC,
    N8NAutomationService,
    N8NClient,
)
from app.domains.pipelines_simulator import (
    DEFAULT_REPO_ROOT,
    PIPELINE_SIMULATE_TOPIC,
    PipelineSimulatorService,
    PipelineStageInspectorPort,
    RepositoryStageInspector,
)
from app.domains.rag_console import (
    RAG_REINDEX_TOPIC,
    EmbeddingProviderPort,
    RAGConsoleService,
    RAGIndexStore,
    create_embedding_provider,
)
from app.domains.scraping import (
    SCRAPING_EXTRACT_TOPIC,
    HttpxPageFetcher,
    PageFetcherPort,
    ScrapingService,
)
from app.queue import EventBus, JobEnvelope, JobQueue, RetryPolicy, create_job_queue
from app.workers import AsyncWorkerRunner, WorkerRegistry
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

REPO_ROOT = Path(__file__).resolve().parents[2]


def _build_default_worker_registry(
    app: FastAPI,
    settings: Settings,
    *,
    cache_backend: CacheBackend,
    job_queue: JobQueue,
    event_bus: EventBus,
    rag_index_store: RAGIndexStore,
) -> WorkerRegistry:
    """Register real async worker handlers across all event-driven domains."""
    registry = WorkerRegistry()

    def resolve_n8n_client() -> N8NClient:
        override = app.dependency_overrides.get(get_n8n_client)
        return override() if override is not None else N8NClient(settings)

    def resolve_page_fetcher() -> PageFetcherPort:
        override = app.dependency_overrides.get(get_page_fetcher)
        return override() if override is not None else HttpxPageFetcher(settings)

    def resolve_inference_port() -> StructuredInferencePort:
        override = app.dependency_overrides.get(get_inference_port)
        return (
            override()
            if override is not None
            else OpenAICompatibleInferenceAdapter(settings)
        )

    def resolve_pipeline_inspector() -> PipelineStageInspectorPort:
        override = app.dependency_overrides.get(get_pipeline_inspector)
        return override() if override is not None else RepositoryStageInspector()

    def resolve_embedding_provider() -> EmbeddingProviderPort:
        override = app.dependency_overrides.get(get_embedding_provider)
        return (
            override()
            if override is not None
            else create_embedding_provider(settings)
        )

    async def handle_n8n_trigger(job: JobEnvelope) -> dict[str, Any]:
        workflow_id = str(job.payload["workflow_id"])
        payload = dict(job.payload.get("payload") or {})
        outcome = await resolve_n8n_client().trigger(
            workflow_id,
            payload,
            job.correlation_id,
        )
        return outcome.model_dump(mode="json")

    async def handle_scraping_extract(job: JobEnvelope) -> dict[str, Any]:
        service = ScrapingService(
            settings=settings,
            queue=job_queue,
            cache=cache_backend,
            fetcher=resolve_page_fetcher(),
            event_bus=event_bus,
        )
        return await service.execute_scrape_job(job)

    async def handle_ai_workflow_execute(job: JobEnvelope) -> dict[str, Any]:
        service = AIWorkflowService(
            queue=job_queue,
            inference_port=resolve_inference_port(),
            event_bus=event_bus,
        )
        return await service.execute_workflow_job(job)

    async def handle_pipeline_simulate(job: JobEnvelope) -> dict[str, Any]:
        repo_root = settings.repo_root_override or DEFAULT_REPO_ROOT
        service = PipelineSimulatorService(
            queue=job_queue,
            repo_root=repo_root,
            inspector=resolve_pipeline_inspector(),
            cache=cache_backend,
            event_bus=event_bus,
        )
        return await service.execute_simulation_job(job)

    async def handle_rag_reindex(job: JobEnvelope) -> dict[str, Any]:
        service = RAGConsoleService(
            settings=settings,
            index_store=rag_index_store,
            embedder=resolve_embedding_provider(),
            inference_port=resolve_inference_port(),
            cache=cache_backend,
            queue=job_queue,
            event_bus=event_bus,
        )
        return await service.execute_reindex_job(job)

    registry.register(N8N_TRIGGER_TOPIC, handle_n8n_trigger)
    registry.register(SCRAPING_EXTRACT_TOPIC, handle_scraping_extract)
    registry.register(AI_WORKFLOW_EXECUTE_TOPIC, handle_ai_workflow_execute)
    registry.register(PIPELINE_SIMULATE_TOPIC, handle_pipeline_simulate)
    registry.register(RAG_REINDEX_TOPIC, handle_rag_reindex)
    return registry


def create_app(settings: Settings | None = None) -> FastAPI:
    active = settings or get_settings()
    configure_logging(active.environment)

    @asynccontextmanager
    async def lifespan(instance: FastAPI) -> AsyncIterator[None]:
        runner: AsyncWorkerRunner = instance.state.worker_runner
        if active.worker_autostart:
            runner.start(
                concurrency=active.worker_concurrency,
                poll_timeout=active.worker_poll_timeout_seconds,
            )
        try:
            yield
        finally:
            await runner.stop()

    app = FastAPI(
        title=active.app_name,
        version=active.api_version,
        description=(
            "Modular Monolith FastAPI backend: Gateway/BFF, Event Queue & Workers, "
            "Redis/Memory Cache & Idempotency, ETL, real n8n Automation, Web Scraping, "
            "AI Workflows, Live CI/CD & Docker Pipeline Simulator, and Interactive RAG Console."
        ),
        docs_url="/api/docs",
        redoc_url=None,
        openapi_url="/api/openapi.json",
        lifespan=lifespan,
    )

    # Shared infrastructure singletons (Redis when configured & reachable, Memory fallback).
    cache_backend = create_cache_backend(active)
    idempotency_store = IdempotencyStore(
        active.idempotency_ttl_seconds,
        backend=cache_backend,
    )
    event_bus = EventBus()
    job_queue = create_job_queue(active)
    rag_index_store = RAGIndexStore()
    public_connectors = create_public_connectors(
        timeout_seconds=active.connector_timeout_seconds,
        transparencia_api_key=active.transparencia_api_key,
    )
    worker_registry = _build_default_worker_registry(
        app,
        active,
        cache_backend=cache_backend,
        job_queue=job_queue,
        event_bus=event_bus,
        rag_index_store=rag_index_store,
    )
    worker_runner = AsyncWorkerRunner(
        job_queue,
        worker_registry,
        retry_policy=RetryPolicy(
            max_retries=active.worker_max_retries,
            base_delay_seconds=active.worker_retry_base_delay_seconds,
        ),
    )
    scoped_rate_limiter = ScopedRateLimiter(active)

    if active.n8n_event_bridge_enabled:
        n8n_bridge = N8NAutomationService(
            N8NClient(active),
            queue=job_queue,
            cache=cache_backend,
            idempotency_store=idempotency_store,
            event_bus=event_bus,
        )
        n8n_bridge.register_event_subscriptions(event_bus)

    app.state.settings = active
    app.state.cache_backend = cache_backend
    app.state.idempotency_store = idempotency_store
    app.state.event_bus = event_bus
    app.state.job_queue = job_queue
    app.state.rag_index_store = rag_index_store
    app.state.public_connectors = public_connectors
    app.state.worker_registry = worker_registry
    app.state.worker_runner = worker_runner
    app.state.rate_limiter = scoped_rate_limiter

    # Bind dependency providers to the active application singletons.
    app.dependency_overrides[get_settings] = lambda: active
    app.dependency_overrides[get_cache_backend] = lambda: cache_backend
    app.dependency_overrides[get_idempotency_store] = lambda: idempotency_store
    app.dependency_overrides[get_event_bus] = lambda: event_bus
    app.dependency_overrides[get_job_queue] = lambda: job_queue
    app.dependency_overrides[get_rag_index_store] = lambda: rag_index_store
    app.dependency_overrides[get_public_connectors] = lambda: public_connectors
    app.dependency_overrides[get_worker_registry] = lambda: worker_registry

    # Starlette executes middlewares in reverse registration order (outermost registered last).
    app.add_middleware(
        RateLimitMiddleware,
        limiter=scoped_rate_limiter,
        enabled=active.rate_limit_enabled,
    )
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(CorrelationIdMiddleware)
    register_error_handlers(app)
    app.include_router(v1_router, prefix="/api")

    @app.get("/api-status.json", include_in_schema=False)
    def runtime_api_status() -> dict[str, Any]:
        return {
            "ok": True,
            "service": "fastapi-backend",
            "version": active.api_version,
        }

    static_dir = REPO_ROOT if (REPO_ROOT / "index.html").is_file() else None
    if static_dir is not None:
        app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

    return app


app = create_app()
