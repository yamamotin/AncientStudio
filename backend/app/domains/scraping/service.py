"""Modular Web Scraping orchestration service (SSRF validation, cache keys, queue dispatch)."""

from __future__ import annotations

from app.cache.base import CacheBackend
from app.core.config import Settings
from app.core.security import fingerprint, sanitize_text, validate_public_http_url
from app.domains.scraping.contracts import ContentExtractorPort
from app.domains.scraping.schemas import (
    ScrapedDocument,
    ScrapeJobAccepted,
    ScrapeJobRequest,
    ScrapeStrategy,
)
from app.queue.base import JobQueue

SCRAPING_EXTRACT_TOPIC = "scraping.extract"


class ScrapingService:
    """Validates scraping requests, enforces SSRF boundaries, and dispatches worker jobs."""

    def __init__(
        self,
        settings: Settings,
        queue: JobQueue,
        cache: CacheBackend,
    ) -> None:
        self._settings = settings
        self._queue = queue
        self._cache = cache
        self._extractors: dict[ScrapeStrategy, ContentExtractorPort] = {}

    def register_extractor(self, extractor: ContentExtractorPort) -> None:
        self._extractors[extractor.strategy] = extractor

    def registered_strategies(self) -> list[str]:
        return sorted(strategy.value for strategy in self._extractors)

    @staticmethod
    def build_cache_key(url: str, strategy: ScrapeStrategy, selectors: list[str]) -> str:
        digest = fingerprint(url, strategy.value, *selectors)
        return f"scraping:doc:{digest[:32]}"

    def get_cached_document(
        self, url: str, strategy: ScrapeStrategy, selectors: list[str]
    ) -> ScrapedDocument | None:
        key = self.build_cache_key(url, strategy, selectors)
        cached = self._cache.get(key)
        if isinstance(cached, ScrapedDocument):
            return cached.model_copy(update={"cached": True})
        return None

    async def enqueue_scrape(
        self,
        request: ScrapeJobRequest,
        *,
        correlation_id: str,
    ) -> ScrapeJobAccepted:
        safe_url = validate_public_http_url(
            request.url,
            allowed_hosts=self._settings.scraper_allowed_hosts,
        )
        cleaned_selectors = [
            sanitize_text(sel, max_length=160) for sel in request.selectors if sel.strip()
        ]
        dedup_key = request.idempotency_key or fingerprint(
            safe_url, request.strategy.value, *cleaned_selectors
        )[:32]

        job = await self._queue.enqueue(
            SCRAPING_EXTRACT_TOPIC,
            {
                "url": safe_url,
                "strategy": request.strategy.value,
                "selectors": cleaned_selectors,
                "cache_ttl_seconds": request.cache_ttl_seconds,
            },
            correlation_id=correlation_id,
            idempotency_key=dedup_key,
        )
        return ScrapeJobAccepted(
            job_id=job.job_id,
            topic=job.topic,
            status=job.status,
            target_url=safe_url,
            strategy=request.strategy,
            correlation_id=correlation_id,
        )
