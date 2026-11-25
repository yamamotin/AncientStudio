"""Unit tests for typed config, API key scopes, sanitization, SSRF guard, and rate limit."""

from __future__ import annotations

import pytest
from app.core.config import Settings
from app.core.errors import (
    AuthenticationError,
    AuthorizationError,
    DomainValidationError,
    RateLimitExceededError,
)
from app.core.security import (
    ApiKeyVerifier,
    RateLimitPolicy,
    Scope,
    SlidingWindowRateLimiter,
    sanitize_identifier,
    sanitize_text,
    sign_body,
    validate_public_http_url,
    verify_hmac_signature,
)
from pydantic import ValidationError

pytestmark = pytest.mark.unit


def test_local_and_test_allow_placeholder_secrets() -> None:
    for environment in ("local", "test", "dev", "development"):
        cfg = Settings(environment=environment)
        assert cfg.environment == environment
        assert cfg.gateway_hmac_secret.startswith("dev-only-")


def test_non_local_environment_rejects_placeholder_secrets() -> None:
    with pytest.raises(ValidationError, match="placeholder secrets are not allowed"):
        Settings(environment="production")


@pytest.mark.parametrize("environment", ["production", "staging", "prod"])
def test_non_local_environment_accepts_explicit_secrets(environment: str) -> None:
    cfg = Settings(
        environment=environment,
        gateway_hmac_secret="prod-gateway-secret-0123456789",
        workflow_api_token="prod-workflow-token-0123456789",
        n8n_api_token="prod-n8n-api-token",
        n8n_webhook_token="prod-n8n-webhook-token",
        n8n_base_url="https://n8n.example.com/",
        n8n_webhook_base_url="https://n8n.example.com/webhook/",
    )

    assert cfg.environment == environment
    assert cfg.n8n_base_url == "https://n8n.example.com"
    assert cfg.n8n_webhook_base_url == "https://n8n.example.com/webhook"


def test_api_key_verifier_enforces_tokens_and_scopes(settings: Settings) -> None:
    verifier = ApiKeyVerifier(settings)

    workflow_principal = verifier.authorize(
        settings.workflow_api_token, [Scope.WORKFLOWS_TRIGGER, Scope.SCRAPING_RUN]
    )
    assert workflow_principal.subject == "workflow-key"

    with pytest.raises(AuthorizationError):
        verifier.authorize(settings.workflow_api_token, [Scope.ADMIN])

    assert settings.admin_api_token is not None
    admin_principal = verifier.authorize(
        settings.admin_api_token, [Scope.ADMIN, Scope.PIPELINES_RUN]
    )
    assert admin_principal.subject == "admin-key"

    with pytest.raises(AuthenticationError):
        verifier.authenticate("invalid-key")


def test_hmac_sign_and_verify_roundtrip() -> None:
    body = b'{"invoice_key":"NFE-1"}'
    sig = sign_body(body, "1700000000", "secret-0123456789abcdef")
    verified = verify_hmac_signature(
        body=body,
        timestamp="1700000000",
        signature=sig,
        secret="secret-0123456789abcdef",
        max_age_seconds=300,
        now=1700000100.0,
    )
    assert verified == sig


def test_sanitization_and_ssrf_url_guard() -> None:
    assert sanitize_identifier("invoice-enrichment_v1") == "invoice-enrichment_v1"
    with pytest.raises(DomainValidationError):
        sanitize_identifier("../etc/passwd")

    assert sanitize_text("hello\x00world\nnext") == "helloworld\nnext"

    assert (
        validate_public_http_url("https://developer.ibm.com/articles")
        == "https://developer.ibm.com/articles"
    )
    for forbidden in (
        "http://127.0.0.1:8000/admin",
        "http://localhost/secret",
        "http://169.254.169.254/latest/meta-data/",
        "http://10.0.0.12/internal",
        "file:///etc/passwd",
    ):
        with pytest.raises(DomainValidationError):
            validate_public_http_url(forbidden)


def test_sliding_window_rate_limiter_enforces_quota() -> None:
    limiter = SlidingWindowRateLimiter(RateLimitPolicy(max_requests=2, window_seconds=60))

    first = limiter.enforce("client-1", now=100.0)
    second = limiter.enforce("client-1", now=110.0)
    assert first.remaining == 1
    assert second.remaining == 0

    with pytest.raises(RateLimitExceededError) as exc_info:
        limiter.enforce("client-1", now=120.0)
    assert exc_info.value.status_code == 429
    assert int(exc_info.value.headers["Retry-After"]) >= 1

    recovered = limiter.enforce("client-1", now=161.0)
    assert recovered.allowed is True
