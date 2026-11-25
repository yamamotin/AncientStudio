"""Modular Web Scraping orchestration and worker execution service."""

from __future__ import annotations

from typing import Any

from app.cache.base import CacheBackend
from app.core.config import Settings
from app.core.errors import DomainValidationError
from app.core.security import (
    fingerprint,
    sanitize_text,
    sha256_hex,
    validate_public_http_url,
)
from app.core.time import utc_now
from app.domains.scraping.contracts import ContentExtractorPort, PageFetcherPort
from app.domains.scraping.extractors import build_default_extractors
from app.domains.scraping.fetcher import HttpxPageFetcher
from app.domains.scraping.schemas import (
    ScrapedDocument,
    ScrapeJobAccepted,
    ScrapeJobRequest,
    ScrapeStrategy,
)
from app.queue.base import EventBus, JobQueue
from app.queue.models import DomainEvent, JobEnvelope

SCRAPING_EXTRACT_TOPIC = "scraping.extract"
SCRAPING_COMPLETED_EVENT = "scraping.document.extracted"


class ScrapingService:
    """Validates scraping requests, executes concrete extractors, caches results & emits events."""

    def __init__(
        self,
        settings: Settings,
        queue: JobQueue,
        cache: CacheBackend,
        *,
        fetcher: PageFetcherPort | None = None,
        event_bus: EventBus | None = None,
        extractors: tuple[ContentExtractorPort, ...] | None = None,
    ) -> None:
        self._settings = settings
        self._queue = queue
        self._cache = cache
        self._fetcher: PageFetcherPort = fetcher or HttpxPageFetcher(settings)
        self._event_bus = event_bus
        self._extractors: dict[ScrapeStrategy, ContentExtractorPort] = {}
        for extractor in extractors if extractors is not None else build_default_extractors():
            self.register_extractor(extractor)

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

    async def execute_scrape_job(self, job: JobEnvelope) -> dict[str, Any]:
        """Worker handler executing ``scraping.extract`` jobs end-to-end."""
        raw_url = str(job.payload.get("url") or "")
        safe_url = validate_public_http_url(
            raw_url,
            allowed_hosts=self._settings.scraper_allowed_hosts,
        )
        strategy = ScrapeStrategy(
            str(job.payload.get("strategy") or ScrapeStrategy.STRUCTURED_METADATA.value)
        )
        selectors = [str(item) for item in (job.payload.get("selectors") or [])]
        cache_ttl = int(job.payload.get("cache_ttl_seconds") or 300)

        cached = self.get_cached_document(safe_url, strategy, selectors)
        if cached is not None:
            return cached.model_dump(mode="json")

        extractor = self._extractors.get(strategy)
        if extractor is None:
            raise DomainValidationError(f"No extractor registered for strategy '{strategy.value}'.")

        raw_doc = await self._fetcher.fetch(
            safe_url,
            timeout_seconds=self._settings.scraper_timeout_seconds,
        )
        extracted = extractor.extract(raw_doc, selectors=selectors)
        title_candidate = extracted.get("title")
        title = str(title_candidate) if isinstance(title_candidate, str) else None

        document = ScrapedDocument(
            url=safe_url,
            final_url=raw_doc.final_url,
            status_code=raw_doc.status_code,
            content_type=raw_doc.content_type,
            title=title,
            extracted=extracted,
            content_sha256=sha256_hex(raw_doc.body_text.encode("utf-8")),
            fetched_at=utc_now(),
            cached=False,
        )
        cache_key = self.build_cache_key(safe_url, strategy, selectors)
        self._cache.set(cache_key, document, ttl_seconds=cache_ttl)

        if self._event_bus is not None:
            await self._event_bus.publish(
                DomainEvent(
                    event_type=SCRAPING_COMPLETED_EVENT,
                    source="scraping",
                    correlation_id=job.correlation_id,
                    payload={
                        "job_id": job.job_id,
                        "url": document.url,
                        "final_url": document.final_url,
                        "strategy": strategy.value,
                        "title": document.title,
                        "content_sha256": document.content_sha256,
                    },
                )
            )

        return document.model_dump(mode="json")
