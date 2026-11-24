"""FastAPI dependency providers.

Tests override these providers to inject deterministic settings, stores and an
httpx MockTransport, keeping the production code untouched.
"""

from __future__ import annotations

import hmac

from app.config import Settings, get_settings
from app.core.errors import Problem
from app.services.etl import ETLService
from app.services.gateway import GatewayService
from app.services.idempotency import IdempotencyStore
from app.services.n8n import N8NClient
from fastapi import Depends, Header, Request


def get_correlation_id(request: Request) -> str:
    return getattr(request.state, "correlation_id", "unknown")


def get_etl_service() -> ETLService:
    return ETLService()


def get_idempotency_store(settings: Settings = Depends(get_settings)) -> IdempotencyStore:
    return IdempotencyStore(settings.idempotency_ttl_seconds)


def get_gateway_service(store: IdempotencyStore = Depends(get_idempotency_store)) -> GatewayService:
    return GatewayService(store)


def get_n8n_client(settings: Settings = Depends(get_settings)) -> N8NClient:
    return N8NClient(settings)


def require_workflow_token(
    x_api_key: str = Header(..., alias="X-API-Key"),
    settings: Settings = Depends(get_settings),
) -> None:
    if not hmac.compare_digest(x_api_key, settings.workflow_api_token):
        raise Problem(401, "Unauthorized", "Invalid X-API-Key for workflow operations.")
