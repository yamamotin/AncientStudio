"""Schemas and contracts for the modular Web Scraping domain."""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any

from app.queue.models import JobStatus
from pydantic import BaseModel, Field


class ScrapeStrategy(str, Enum):
    """Extraction strategies supported by modular web scrapers."""

    STRUCTURED_METADATA = "structured_metadata"
    HTTP_STATIC = "http_static"
    SITEMAP = "sitemap"


class ScrapeJobRequest(BaseModel):
    """Validated scraping job specification dispatched through the async queue."""

    url: str = Field(min_length=8, max_length=2048)
    strategy: ScrapeStrategy = ScrapeStrategy.STRUCTURED_METADATA
    selectors: list[str] = Field(default_factory=list, max_length=20)
    cache_ttl_seconds: int = Field(default=300, ge=1, le=86400)
    idempotency_key: str | None = Field(default=None, min_length=8, max_length=120)


class ScrapedDocument(BaseModel):
    """Normalized output contract produced by concrete scraper workers."""

    url: str
    final_url: str
    status_code: int
    content_type: str | None = None
    title: str | None = None
    extracted: dict[str, Any] = Field(default_factory=dict)
    content_sha256: str
    fetched_at: datetime
    cached: bool = False


class ScrapeJobAccepted(BaseModel):
    """Acknowledgement returned when a scrape request is validated and queued."""

    job_id: str
    topic: str
    status: JobStatus
    target_url: str
    strategy: ScrapeStrategy
    correlation_id: str
