"""FastAPI Modular Monolith application factory for the AncientStudio backend."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from app.api.deps import (
    get_cache_backend,
    get_event_bus,
    get_idempotency_store,
    get_job_queue,
    get_worker_registry,
)
from app.api.v1.router import router as v1_router
from app.cache import IdempotencyStore, InMemoryTTLCache
from app.core.config import Settings, get_settings
from app.core.errors import register_error_handlers
from app.core.logging import CorrelationIdMiddleware, configure_logging
from app.core.security import RateLimitPolicy, SlidingWindowRateLimiter
from app.domains.automation_n8n import N8N_TRIGGER_TOPIC, N8NClient
from app.queue import EventBus, InMemoryJobQueue, JobEnvelope, RetryPolicy
from app.workers import AsyncWorkerRunner, WorkerRegistry
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

REPO_ROOT = Path(__file__).resolve().parents[2]


def _build_default_worker_registry(settings: Settings) -> WorkerRegistry:
    """Register real baseline async worker handlers (no simulated/fake responses)."""
    registry = WorkerRegistry()

    async def handle_n8n_trigger(job: JobEnvelope) -> dict[str, Any]:
        workflow_id = str(job.payload["workflow_id"])
        payload = dict(job.payload.get("payload") or {})
        outcome = await N8NClient(settings).trigger(
            workflow_id,
            payload,
            job.correlation_id,
        )
        return outcome.model_dump(mode="json")

    registry.register(N8N_TRIGGER_TOPIC, handle_n8n_trigger)
    return registry


def create_app(settings: Settings | None = None) -> FastAPI:
    active = settings or get_settings()
    configure_logging(active.environment)

    app = FastAPI(
        title=active.app_name,
        version=active.api_version,
        description=(
            "Modular Monolith FastAPI backend: Gateway/BFF, Event Queue & Workers, "
            "Cache/Idempotency, ETL, real n8n Automation, Web Scraping, AI Workflows, "
            "and Live CI/CD & Docker Pipeline Simulator."
        ),
        docs_url="/api/docs",
        redoc_url=None,
        openapi_url="/api/openapi.json",
    )

    # Shared in-process infrastructure singletons scoped to this application instance.
    cache_backend = InMemoryTTLCache(
        default_ttl_seconds=active.cache_default_ttl_seconds,
        max_entries=active.cache_max_entries,
    )
    idempotency_store = IdempotencyStore(
        active.idempotency_ttl_seconds,
        backend=cache_backend,
    )
    event_bus = EventBus()
    job_queue = InMemoryJobQueue(
        max_size=active.queue_max_size,
        default_max_retries=active.worker_max_retries,
    )
    worker_registry = _build_default_worker_registry(active)
    worker_runner = AsyncWorkerRunner(
        job_queue,
        worker_registry,
        retry_policy=RetryPolicy(
            max_retries=active.worker_max_retries,
            base_delay_seconds=active.worker_retry_base_delay_seconds,
        ),
    )
    rate_limiter = SlidingWindowRateLimiter(
        RateLimitPolicy(
            max_requests=active.rate_limit_requests_per_minute,
            window_seconds=active.rate_limit_window_seconds,
        )
    )

    app.state.settings = active
    app.state.cache_backend = cache_backend
    app.state.idempotency_store = idempotency_store
    app.state.event_bus = event_bus
    app.state.job_queue = job_queue
    app.state.worker_registry = worker_registry
    app.state.worker_runner = worker_runner
    app.state.rate_limiter = rate_limiter

    # Bind dependency providers to the active application singletons.
    app.dependency_overrides[get_settings] = lambda: active
    app.dependency_overrides[get_cache_backend] = lambda: cache_backend
    app.dependency_overrides[get_idempotency_store] = lambda: idempotency_store
    app.dependency_overrides[get_event_bus] = lambda: event_bus
    app.dependency_overrides[get_job_queue] = lambda: job_queue
    app.dependency_overrides[get_worker_registry] = lambda: worker_registry

    app.add_middleware(CorrelationIdMiddleware)
    register_error_handlers(app)
    app.include_router(v1_router, prefix="/api")

    static_dir = REPO_ROOT if (REPO_ROOT / "index.html").is_file() else None
    if static_dir is not None:
        app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

    return app


app = create_app()
