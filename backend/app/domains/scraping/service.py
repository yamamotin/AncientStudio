"""Modular Web Scraping orchestration and worker execution service."""

from __future__ import annotations

import base64
import inspect
from typing import Any
from urllib.parse import urlencode

from api.connectors.captcha import CaptchaChallengeStore, detect_captcha_in_html
from api.connectors.errors import ConnectorValidationError
from api.connectors.http_client import merge_cookie_header, parse_cookie_string
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
from app.domains.scraping.contracts import (
    ContentExtractorPort,
    PageFetcherPort,
    RawHttpDocument,
)
from app.domains.scraping.extractors import build_default_extractors
from app.domains.scraping.fetcher import HttpxPageFetcher
from app.domains.scraping.schemas import (
    ScrapedDocument,
    ScrapeJobAccepted,
    ScrapeJobRequest,
    ScrapeStrategy,
    ScrapeSyncRequest,
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
        captcha_store: CaptchaChallengeStore | None = None,
    ) -> None:
        self._settings = settings
        self._queue = queue
        self._cache = cache
        self._fetcher: PageFetcherPort = fetcher or HttpxPageFetcher(settings)
        self._event_bus = event_bus
        self._captcha_store = captcha_store or CaptchaChallengeStore()
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

    async def _fetch_interactive_doc(
        self,
        url: str,
        *,
        timeout_seconds: float,
        method: str = "GET",
        headers: dict[str, str] | None = None,
        form_data: dict[str, str] | None = None,
        cookies: dict[str, str] | None = None,
    ) -> RawHttpDocument:
        sig = inspect.signature(self._fetcher.fetch)
        supports_extended = "allow_captcha_pages" in sig.parameters or any(
            p.kind == inspect.Parameter.VAR_KEYWORD for p in sig.parameters.values()
        )
        if supports_extended:
            return await self._fetcher.fetch(  # type: ignore[call-arg]
                url,
                timeout_seconds=timeout_seconds,
                method=method,
                headers=headers,
                form_data=form_data,
                cookies=cookies,
                allow_captcha_pages=True,
            )
        target = url
        if method.upper() == "GET" and form_data:
            sep = "&" if "?" in target else "?"
            target = f"{target}{sep}{urlencode(form_data)}"
        return await self._fetcher.fetch(target, timeout_seconds=timeout_seconds)

    async def extract_sync(
        self,
        request: ScrapeSyncRequest,
        *,
        correlation_id: str = "sync",
    ) -> ScrapedDocument:
        """Execute synchronous SSRF-safe scraping with 422 CAPTCHA_REQUIRED resumption."""
        explicit_lookup: dict[str, Any] = dict(request.consulta_payload or {})
        if request.url:
            explicit_lookup["url"] = request.url
        explicit_lookup.setdefault("strategy", request.strategy.value)
        if request.selectors:
            explicit_lookup["selectors"] = list(request.selectors)
        explicit_lookup.setdefault("cache_ttl_seconds", request.cache_ttl_seconds)

        resolved = self._captcha_store.resolve_inputs(
            challenge_id=request.challenge_id,
            captcha_token=request.captcha_token,
            captcha_solution=request.captcha_solution,
            session_cookie=request.session_cookie,
            consulta_payload=explicit_lookup,
        )

        raw_url = str(request.url or resolved.consulta_payload.get("url") or "").strip()
        if not raw_url:
            raise ConnectorValidationError(
                "Informe 'url' ou um 'challenge_id' válido para executar a raspagem.",
                extra={"field": "url"},
            )
        safe_url = validate_public_http_url(
            raw_url,
            allowed_hosts=self._settings.scraper_allowed_hosts,
        )
        strategy_raw = str(
            resolved.consulta_payload.get("strategy") or request.strategy.value
        )
        strategy = ScrapeStrategy(strategy_raw)
        raw_selectors = (
            request.selectors
            if request.selectors
            else [str(s) for s in (resolved.consulta_payload.get("selectors") or [])]
        )
        cleaned_selectors = [
            sanitize_text(sel, max_length=160)
            for sel in raw_selectors
            if str(sel).strip()
        ]
        cache_ttl = int(
            resolved.consulta_payload.get("cache_ttl_seconds")
            or request.cache_ttl_seconds
        )

        resuming_captcha = bool(resolved.challenge_id or resolved.solution)
        if not resuming_captcha and not resolved.session_cookie:
            cached = self.get_cached_document(safe_url, strategy, cleaned_selectors)
            if cached is not None:
                return cached

        extractor = self._extractors.get(strategy)
        if extractor is None:
            raise DomainValidationError(
                f"No extractor registered for strategy '{strategy.value}'."
            )

        active_consulta_payload: dict[str, Any] = {
            "url": safe_url,
            "strategy": strategy.value,
            "selectors": cleaned_selectors,
            "cache_ttl_seconds": cache_ttl,
        }
        cookie_jar = dict(resolved.cookie_jar)
        cookie_jar.update(parse_cookie_string(resolved.session_cookie))

        if (
            resolved.challenge is not None
            and resolved.challenge.connector == "scraping"
        ):
            if not resolved.solution:
                raise ConnectorValidationError(
                    "Informe 'captcha_token' ou 'captcha_solution' para retomar a raspagem.",
                    extra={
                        "field": "captcha_solution",
                        "challenge_id": resolved.challenge.challenge_id,
                    },
                )
            safe_action_url = validate_public_http_url(
                resolved.challenge.action_url,
                allowed_hosts=self._settings.scraper_allowed_hosts,
            )
            form_data = dict(resolved.challenge.form_fields)
            form_data[resolved.challenge.response_field] = resolved.solution
            req_headers: dict[str, str] = {
                "Referer": resolved.challenge.challenge_url,
                "X-Captcha-Response": resolved.solution,
            }
            merged_cookie = merge_cookie_header(cookie_jar, resolved.session_cookie)
            if merged_cookie:
                req_headers["Cookie"] = merged_cookie

            raw_doc = await self._fetch_interactive_doc(
                safe_action_url,
                timeout_seconds=self._settings.scraper_timeout_seconds,
                method=resolved.challenge.http_method,
                headers=req_headers,
                form_data=form_data,
                cookies=cookie_jar,
            )
            cookie_jar.update(raw_doc.cookies)
        else:
            req_headers = {}
            if resolved.solution:
                req_headers["X-Captcha-Response"] = resolved.solution
            merged_cookie = merge_cookie_header(cookie_jar, resolved.session_cookie)
            if merged_cookie:
                req_headers["Cookie"] = merged_cookie
            raw_doc = await self._fetch_interactive_doc(
                safe_url,
                timeout_seconds=self._settings.scraper_timeout_seconds,
                method="GET",
                headers=req_headers or None,
                cookies=cookie_jar,
            )
            cookie_jar.update(raw_doc.cookies)

        detected = detect_captcha_in_html(
            raw_doc.body_text, base_url=raw_doc.final_url
        )
        if detected.detected:
            img_b64 = detected.image_base64
            img_mime = detected.image_mime_type
            img_uri = detected.image_data_uri
            if (
                detected.image_url
                and not img_b64
                and hasattr(self._fetcher, "fetch_binary")
            ):
                try:
                    raw_img, fetched_mime = await self._fetcher.fetch_binary(  # type: ignore[attr-defined]
                        detected.image_url,
                        timeout_seconds=min(self._settings.scraper_timeout_seconds, 10.0),
                        headers={"Referer": raw_doc.final_url},
                        cookies=cookie_jar,
                    )
                    if raw_img:
                        img_mime = fetched_mime or "image/png"
                        img_b64 = base64.b64encode(raw_img).decode("ascii")
                        img_uri = f"data:{img_mime};base64,{img_b64}"
                except Exception:
                    pass

            if resolved.challenge is not None:
                self._captcha_store.consume_challenge(resolved.challenge.challenge_id)

            challenge = self._captcha_store.issue_challenge(
                connector="scraping",
                operation="extract_sync",
                provider=detected.provider,
                site_key=detected.site_key,
                challenge_url=raw_doc.final_url,
                portal_url=safe_url,
                action_url=detected.action_url or raw_doc.final_url,
                http_method=detected.http_method,
                callback=detected.callback,
                response_field=detected.response_field,
                cookie_jar=cookie_jar,
                raw_session_cookie=resolved.session_cookie,
                form_fields=detected.form_fields,
                consulta_payload=active_consulta_payload,
                resume_endpoint="/api/v1/scraping/extract",
                resume_method="POST",
                image_url=detected.image_url,
                image_base64=img_b64,
                image_mime_type=img_mime,
                image_data_uri=img_uri,
                prompt_label=detected.prompt_label,
                rejected_previous_attempt=resuming_captcha,
            )
            detail_msg = (
                "A solução CAPTCHA enviada foi recusada ou expirou na URL alvo; "
                "resolva o novo desafio para concluir a extração real."
                if resuming_captcha
                else f"A página pública '{raw_doc.final_url}' exige resolução de CAPTCHA "
                f"({detected.provider}) antes de liberar o conteúdo real."
            )
            raise challenge.to_exception(detail_msg)

        if resolved.challenge is not None:
            self._captcha_store.consume_challenge(resolved.challenge.challenge_id)

        extracted = extractor.extract(raw_doc, selectors=cleaned_selectors)
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
            captcha_resumed=resuming_captcha,
        )
        cache_key = self.build_cache_key(safe_url, strategy, cleaned_selectors)
        self._cache.set(cache_key, document, ttl_seconds=cache_ttl)

        if self._event_bus is not None:
            await self._event_bus.publish(
                DomainEvent(
                    event_type=SCRAPING_COMPLETED_EVENT,
                    source="scraping",
                    correlation_id=correlation_id,
                    payload={
                        "url": document.url,
                        "final_url": document.final_url,
                        "strategy": strategy.value,
                        "title": document.title,
                        "content_sha256": document.content_sha256,
                        "captcha_resumed": resuming_captcha,
                    },
                )
            )

        return document
