"""Settings validation tests."""

from __future__ import annotations

import pytest
from app.config import Settings
from pydantic import ValidationError


def test_local_and_test_allow_placeholder_secrets() -> None:
    for environment in ("local", "test", "dev", "development"):
        settings = Settings(environment=environment)
        assert settings.environment == environment
        assert settings.gateway_hmac_secret.startswith("dev-only-")


def test_non_local_environment_rejects_placeholder_secrets() -> None:
    with pytest.raises(ValidationError, match="placeholder secrets are not allowed"):
        Settings(environment="production")


@pytest.mark.parametrize("environment", ["production", "staging", "prod"])
def test_non_local_environment_accepts_explicit_secrets(environment: str) -> None:
    settings = Settings(
        environment=environment,
        gateway_hmac_secret="prod-gateway-secret-0123456789",
        workflow_api_token="prod-workflow-token-0123456789",
        n8n_api_token="prod-n8n-api-token",
        n8n_webhook_token="prod-n8n-webhook-token",
    )

    assert settings.environment == environment
    assert settings.gateway_hmac_secret == "prod-gateway-secret-0123456789"
