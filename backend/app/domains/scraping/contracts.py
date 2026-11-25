"""Pluggable transport and extractor protocols for the Web Scraping domain."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Protocol, runtime_checkable

from app.domains.scraping.schemas import ScrapeStrategy


@dataclass(frozen=True)
class RawHttpDocument:
    """Raw upstream HTTP response captured by a scraper fetcher."""

    requested_url: str
    final_url: str
    status_code: int
    content_type: str | None
    body_text: str


@runtime_checkable
class PageFetcherPort(Protocol):
    """Async HTTP fetching port (implemented with httpx + robots/rate-limit rules in Phase 2)."""

    async def fetch(self, url: str, *, timeout_seconds: float) -> RawHttpDocument: ...


@runtime_checkable
class ContentExtractorPort(Protocol):
    """Strategy-specific parser turning ``RawHttpDocument`` into structured fields."""

    strategy: ScrapeStrategy

    def extract(
        self, document: RawHttpDocument, *, selectors: list[str]
    ) -> dict[str, Any]: ...
