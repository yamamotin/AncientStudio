"""Shared deterministic fixtures for unit and integration tests.

No real network calls, external brokers, or production secrets are used.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import time
from collections.abc import Callable

import httpx
import pytest
from app.api.deps import get_n8n_client
from app.core.config import Settings
from app.domains.automation_n8n import N8NClient
from app.main import create_app
from fastapi.testclient import TestClient


@pytest.fixture
def settings() -> Settings:
    return Settings(
        environment="test",
        commit_sha="test-sha-123",
        gateway_hmac_secret="test-gateway-secret-0123456789",
        signature_max_age_seconds=300,
        workflow_api_token="test-workflow-token-0123456789",
        admin_api_token="test-admin-api-token-0123456789",
        n8n_base_url="http://n8n.test:5678",
        n8n_webhook_base_url="http://n8n.test:5678/webhook",
        n8n_api_token="test-n8n-api-token",
        n8n_webhook_token="test-n8n-webhook-token",
        idempotency_ttl_seconds=300,
    )


@pytest.fixture
def client(settings: Settings) -> TestClient:
    return TestClient(create_app(settings))


@pytest.fixture
def auth_headers(settings: Settings) -> dict[str, str]:
    return {"X-API-Key": settings.workflow_api_token}


@pytest.fixture
def use_n8n_transport(
    client: TestClient,
    settings: Settings,
) -> Callable[[httpx.MockTransport], None]:
    def apply(transport: httpx.MockTransport) -> None:
        client.app.dependency_overrides[get_n8n_client] = (
            lambda: N8NClient(settings, transport=transport)
        )

    return apply


@pytest.fixture
def signed_headers(
    settings: Settings,
) -> Callable[..., tuple[bytes, dict[str, str]]]:
    def build(
        payload: dict,
        *,
        idempotency_key: str = "idem-key-0001",
        timestamp: str | None = None,
        signature: str | None = None,
    ) -> tuple[bytes, dict[str, str]]:
        raw = json.dumps(payload, separators=(",", ":"), ensure_ascii=False).encode(
            "utf-8"
        )
        sent_at = timestamp or str(int(time.time()))
        digest = hashlib.sha256(raw).hexdigest()
        expected = (
            "sha256="
            + hmac.new(
                settings.gateway_hmac_secret.encode("utf-8"),
                f"{sent_at}.{digest}".encode(),
                hashlib.sha256,
            ).hexdigest()
        )
        return raw, {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotency_key,
            "X-Timestamp": sent_at,
            "X-Signature": signature or expected,
        }

    return build


@pytest.fixture
def invoice_payload() -> dict:
    return {
        "invoice_key": "NFE-2026-0001",
        "issuer_cnpj": "12.345.678/0001-90",
        "document_type": "nfe",
        "issued_at": "2026-11-23T12:00:00Z",
        "items": [
            {"description": "Consultoria", "quantity": 2, "unit_price": 100.0},
            {"description": "Licença", "quantity": 1, "unit_price": 50.5},
        ],
        "totals": {"gross": 250.5, "tax": 0.1, "currency": "BRL"},
    }
