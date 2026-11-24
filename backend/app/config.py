"""Central application configuration.

Values come from environment variables (or a local .env file) and are validated
at startup. No secret has a production-safe default.
"""

from functools import lru_cache

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the API and its external integrations."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
        populate_by_name=True,
    )

    app_name: str = "AncientStudio API"
    environment: str = "local"
    api_version: str = "1.0.0"

    commit_sha: str = Field(default="local", alias="VERCEL_GIT_COMMIT_SHA")
    port: int = 8000

    gateway_hmac_secret: str = Field(default="dev-only-gateway-secret", min_length=16)
    signature_max_age_seconds: int = Field(default=300, ge=30, le=3600)

    workflow_api_token: str = Field(default="dev-only-workflow-token", min_length=16)
    n8n_base_url: str = "http://n8n:5678"
    n8n_webhook_base_url: str = "http://n8n:5678/webhook"
    n8n_api_token: str = Field(default="dev-only-n8n-token", min_length=8)
    n8n_webhook_token: str = Field(default="dev-only-n8n-webhook-token", min_length=8)
    n8n_timeout_seconds: float = Field(default=10.0, gt=0, le=60)

    idempotency_ttl_seconds: int = Field(default=300, ge=1, le=86400)

    @model_validator(mode="after")
    def normalize_urls(self) -> "Settings":
        """Remove trailing slashes so URL joins stay predictable."""
        self.n8n_base_url = self.n8n_base_url.rstrip("/")
        self.n8n_webhook_base_url = self.n8n_webhook_base_url.rstrip("/")
        return self


@lru_cache
def get_settings() -> Settings:
    """Cached settings singleton; overridable in tests through dependency injection."""
    return Settings()
