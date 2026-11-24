"""FastAPI application factory for the AncientStudio backend."""

from __future__ import annotations

from pathlib import Path

from app.api.deps import get_idempotency_store
from app.api.v1.router import router as v1_router
from app.config import Settings, get_settings
from app.core.errors import register_error_handlers
from app.core.logging import CorrelationIdMiddleware, configure_logging
from app.services.idempotency import IdempotencyStore
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

REPO_ROOT = Path(__file__).resolve().parents[2]


def create_app(settings: Settings | None = None) -> FastAPI:
    active = settings or get_settings()
    configure_logging(active.environment)

    app = FastAPI(
        title=active.app_name,
        version=active.api_version,
        description="Real FastAPI backend for ETL, fiscal gateway and n8n workflows.",
        docs_url="/api/docs",
        redoc_url=None,
        openapi_url="/api/openapi.json",
    )
    app.state.settings = active
    # Keep every dependency on the same settings instance, including in tests.
    app.dependency_overrides[get_settings] = lambda: active
    idempotency_store = IdempotencyStore(active.idempotency_ttl_seconds)
    app.dependency_overrides[get_idempotency_store] = lambda: idempotency_store

    app.add_middleware(CorrelationIdMiddleware)
    register_error_handlers(app)
    app.include_router(v1_router, prefix="/api")

    static_dir = REPO_ROOT if (REPO_ROOT / "index.html").is_file() else None
    if static_dir is not None:
        app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

    return app


app = create_app()
