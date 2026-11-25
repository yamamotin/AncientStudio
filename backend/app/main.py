"""FastAPI Modular Monolith application factory for the AncientStudio backend."""

from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from app.api.deps import (
    get_cache_backend,
    get_event_bus,
    get_idempotency_store,
    get_inference_port,
    get_job_queue,
    get_n8n_client,
    get_page_fetcher,
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
) -> WorkerRegistry:
    """Register real async worker handlers for n8n, web scraping, and AI workflows."""
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

    registry.register(N8N_TRIGGER_TOPIC, handle_n8n_trigger)
    registry.register(SCRAPING_EXTRACT_TOPIC, handle_scraping_extract)
    registry.register(AI_WORKFLOW_EXECUTE_TOPIC, handle_ai_workflow_execute)
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
            "AI Workflows, and Live CI/CD & Docker Pipeline Simulator."
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
    worker_registry = _build_default_worker_registry(
        app,
        active,
        cache_backend=cache_backend,
        job_queue=job_queue,
        event_bus=event_bus,
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
    app.state.worker_registry = worker_registry
    app.state.worker_runner = worker_runner
    app.state.rate_limiter = scoped_rate_limiter

    # Bind dependency providers to the active application singletons.
    app.dependency_overrides[get_settings] = lambda: active
    app.dependency_overrides[get_cache_backend] = lambda: cache_backend
    app.dependency_overrides[get_idempotency_store] = lambda: idempotency_store
    app.dependency_overrides[get_event_bus] = lambda: event_bus
    app.dependency_overrides[get_job_queue] = lambda: job_queue
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

    static_dir = REPO_ROOT if (REPO_ROOT / "index.html").is_file() else None
    if static_dir is not None:
        app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

    return app


app = create_app()
