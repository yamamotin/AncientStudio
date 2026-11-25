"""Central typed application configuration.

Values come from environment variables (or a local ``.env`` file) and are validated
at startup. No secret has a production-safe default: placeholder credentials fail
fast in any non-local environment.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

_LOCAL_ENVIRONMENTS = frozenset({"local", "test", "dev", "development"})


class Settings(BaseSettings):
    """Runtime settings for the Modular Monolith API, workers, cache, and integrations."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
        populate_by_name=True,
    )

    # Core runtime
    app_name: str = "AncientStudio API"
    environment: str = "local"
    api_version: str = "1.0.0"
    commit_sha: str = Field(default="local", alias="VERCEL_GIT_COMMIT_SHA")
    port: int = Field(default=8000, ge=1, le=65535)

    # Security, HMAC & active rate limiting
    gateway_hmac_secret: str = Field(default="dev-only-gateway-secret", min_length=16)
    signature_max_age_seconds: int = Field(default=300, ge=30, le=3600)
    workflow_api_token: str = Field(default="dev-only-workflow-token", min_length=16)
    admin_api_token: str | None = Field(default=None, min_length=16)
    rate_limit_enabled: bool = True
    rate_limit_requests_per_minute: int = Field(default=120, ge=1, le=100_000)
    rate_limit_authenticated_per_minute: int = Field(default=240, ge=1, le=100_000)
    rate_limit_admin_per_minute: int = Field(default=600, ge=1, le=100_000)
    rate_limit_window_seconds: int = Field(default=60, ge=1, le=3600)

    # Cache, idempotency & Redis distributed adapters
    cache_default_ttl_seconds: int = Field(default=300, ge=1, le=86400)
    cache_max_entries: int = Field(default=4096, ge=64, le=1_000_000)
    idempotency_ttl_seconds: int = Field(default=300, ge=1, le=86400)
    redis_url: str | None = None
    redis_key_prefix: str = Field(default="ancientstudio", min_length=2, max_length=64)
    redis_connect_timeout_seconds: float = Field(default=1.5, gt=0, le=30.0)
    redis_fallback_to_memory: bool = True

    # Async events queue & FastAPI lifespan workers
    queue_max_size: int = Field(default=1000, ge=1, le=100_000)
    worker_autostart: bool = True
    worker_concurrency: int = Field(default=2, ge=1, le=32)
    worker_poll_timeout_seconds: float = Field(default=0.05, gt=0, le=10.0)
    worker_max_retries: int = Field(default=3, ge=0, le=20)
    worker_retry_base_delay_seconds: float = Field(default=0.5, ge=0.0, le=300.0)

    # n8n automation integration & EventBus bridge
    n8n_base_url: str = "http://n8n:5678"
    n8n_webhook_base_url: str = "http://n8n:5678/webhook"
    n8n_api_token: str = Field(default="dev-only-n8n-token", min_length=8)
    n8n_webhook_token: str = Field(default="dev-only-n8n-webhook-token", min_length=8)
    n8n_timeout_seconds: float = Field(default=10.0, gt=0, le=60)
    n8n_event_bridge_enabled: bool = True

    # Web scraping safety & transport limits
    scraper_timeout_seconds: float = Field(default=10.0, gt=0, le=60)
    scraper_max_response_bytes: int = Field(default=1_048_576, ge=1024, le=20_971_520)
    scraper_max_redirects: int = Field(default=5, ge=0, le=15)
    scraper_max_retries: int = Field(default=2, ge=0, le=10)
    scraper_retry_backoff_seconds: float = Field(default=0.2, ge=0.0, le=30.0)
    scraper_user_agent: str = (
        "AncientStudioBot/1.0 (+https://github.com/yamamotin/AncientStudio)"
    )
    scraper_allowed_hosts: tuple[str, ...] = ()

    # AI Workflows OpenAI-compatible structured inference provider
    ai_provider_base_url: str = "https://api.openai.com/v1"
    ai_provider_api_key: str | None = Field(default=None, min_length=8)
    ai_provider_model: str = "gpt-4o-mini"
    ai_provider_timeout_seconds: float = Field(default=20.0, gt=0, le=120.0)

    # Pipeline simulator root override
    repo_root_override: Path | None = None

    @property
    def is_local_like(self) -> bool:
        return self.environment.strip().lower() in _LOCAL_ENVIRONMENTS

    @model_validator(mode="after")
    def normalize_urls(self) -> Settings:
        """Remove trailing slashes so URL joins stay predictable."""
        self.n8n_base_url = self.n8n_base_url.rstrip("/")
        self.n8n_webhook_base_url = self.n8n_webhook_base_url.rstrip("/")
        self.ai_provider_base_url = self.ai_provider_base_url.rstrip("/")
        return self

    @model_validator(mode="after")
    def reject_placeholder_secrets(self) -> Settings:
        """Fail fast outside local/test instead of shipping dev-only credentials."""
        if self.is_local_like:
            return self

        placeholders: dict[str, str] = {
            "gateway_hmac_secret": self.gateway_hmac_secret,
            "workflow_api_token": self.workflow_api_token,
            "n8n_api_token": self.n8n_api_token,
            "n8n_webhook_token": self.n8n_webhook_token,
        }
        if self.admin_api_token is not None:
            placeholders["admin_api_token"] = self.admin_api_token
        if self.ai_provider_api_key is not None:
            placeholders["ai_provider_api_key"] = self.ai_provider_api_key

        offenders = [
            name
            for name, value in placeholders.items()
            if value.startswith("dev-only-") or "change-me" in value.lower()
        ]
        if offenders:
            joined = ", ".join(sorted(offenders))
            raise ValueError(
                f"placeholder secrets are not allowed in {self.environment!r}: {joined}"
            )
        return self


@lru_cache
def get_settings() -> Settings:
    """Cached settings singleton; overridable in tests through dependency injection."""
    return Settings()
