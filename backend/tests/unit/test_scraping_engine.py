"""Unit tests for Fase 3A: HttpxPageFetcher (SSRF redirects, byte limits, retries) & extractors."""

from __future__ import annotations

import asyncio

import httpx
import pytest
from app.cache import InMemoryTTLCache
from app.core.config import Settings
from app.core.errors import DomainValidationError
from app.domains.scraping import (
    HttpStaticExtractor,
    HttpxPageFetcher,
    RawHttpDocument,
    ScrapeStrategy,
    ScrapingService,
    SitemapXmlExtractor,
    StructuredMetadataExtractor,
)
from app.queue import EventBus, InMemoryJobQueue

pytestmark = pytest.mark.unit

SAMPLE_HTML = """<!doctype html>
<html lang="en">
  <head>
    <title>OpenShift Enterprise Guide</title>
    <meta name="description" content="Production container orchestration architecture." />
    <meta property="og:title" content="OpenShift Guide" />
    <link rel="canonical" href="/docs/openshift" />
    <script>window.__SECRET__ = "ignored";</script>
  </head>
  <body>
    <h1>Cluster Topology</h1>
    <p>Control plane nodes enforce strict RBAC and network policies.</p>
    <a href="/docs/security">Security Reference</a>
  </body>
</html>
"""


def test_httpx_fetcher_retries_transient_503_and_follows_safe_redirect() -> None:
    calls: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        url = str(request.url)
        calls.append(url)
        if url == "https://docs.example.com/start":
            return httpx.Response(302, headers={"Location": "/final"})
        if len(calls) == 2:
            return httpx.Response(503, text="temporary overload")
        return httpx.Response(
            200,
            headers={"Content-Type": "text/html; charset=utf-8"},
            text=SAMPLE_HTML,
        )

    cfg = Settings(
        environment="test",
        scraper_max_retries=2,
        scraper_retry_backoff_seconds=0.0,
    )
    fetcher = HttpxPageFetcher(cfg, transport=httpx.MockTransport(handler))

    doc = asyncio.run(fetcher.fetch("https://docs.example.com/start", timeout_seconds=5.0))
    assert doc.final_url == "https://docs.example.com/final"
    assert doc.status_code == 200
    assert "Cluster Topology" in doc.body_text
    assert len(calls) == 3


def test_httpx_fetcher_blocks_ssrf_on_redirect_hop_and_oversized_payload() -> None:
    def ssrf_redirect_handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            302,
            headers={"Location": "http://169.254.169.254/latest/meta-data/"},
        )

    cfg = Settings(environment="test", scraper_max_response_bytes=1024)
    ssrf_fetcher = HttpxPageFetcher(
        cfg, transport=httpx.MockTransport(ssrf_redirect_handler)
    )
    with pytest.raises(DomainValidationError, match="Private, loopback, or link-local"):
        asyncio.run(ssrf_fetcher.fetch("https://public.example.com/jump", timeout_seconds=5.0))

    def huge_payload_handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            200,
            headers={"Content-Type": "text/plain"},
            content=b"x" * 2048,
        )

    oversize_fetcher = HttpxPageFetcher(
        cfg, transport=httpx.MockTransport(huge_payload_handler)
    )
    with pytest.raises(DomainValidationError, match="exceeds limit"):
        asyncio.run(
            oversize_fetcher.fetch("https://public.example.com/large", timeout_seconds=5.0)
        )

    class _InfiniteChunkStream(httpx.AsyncByteStream):
        async def __aiter__(self):  # type: ignore[no-untyped-def]
            for _ in range(4):
                yield b"y" * 512

    def chunked_oversize_handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            200,
            headers={"Content-Type": "text/plain"},
            stream=_InfiniteChunkStream(),
        )

    chunked_fetcher = HttpxPageFetcher(
        cfg, transport=httpx.MockTransport(chunked_oversize_handler)
    )
    with pytest.raises(DomainValidationError, match="exceeded maximum payload limit"):
        asyncio.run(
            chunked_fetcher.fetch("https://public.example.com/chunked", timeout_seconds=5.0)
        )


def test_concrete_extractors_and_scraping_worker_caching() -> None:
    raw_html_doc = RawHttpDocument(
        requested_url="https://docs.example.com",
        final_url="https://docs.example.com/guide",
        status_code=200,
        content_type="text/html",
        body_text=SAMPLE_HTML,
    )

    meta_out = StructuredMetadataExtractor().extract(
        raw_html_doc, selectors=["h1", "meta[name='description']"]
    )
    assert meta_out["title"] == "OpenShift Enterprise Guide"
    assert meta_out["canonical_url"] == "https://docs.example.com/docs/openshift"
    assert meta_out["open_graph"]["og:title"] == "OpenShift Guide"
    assert meta_out["selector_matches"]["h1"] == ["Cluster Topology"]

    static_out = HttpStaticExtractor().extract(raw_html_doc, selectors=[])
    assert static_out["paragraph_count"] == 1
    assert "ignored" not in static_out["text_excerpt"]

    sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://docs.example.com/a</loc><priority>0.8</priority></url>
    </urlset>"""
    sitemap_doc = RawHttpDocument(
        requested_url="https://docs.example.com/sitemap.xml",
        final_url="https://docs.example.com/sitemap.xml",
        status_code=200,
        content_type="application/xml",
        body_text=sitemap_xml,
    )
    sitemap_out = SitemapXmlExtractor().extract(sitemap_doc, selectors=[])
    assert sitemap_out["entry_count"] == 1
    assert sitemap_out["entries"][0]["loc"] == "https://docs.example.com/a"

    # DTD/XXE guard check.
    xxe_doc = RawHttpDocument(
        requested_url="https://docs.example.com/evil.xml",
        final_url="https://docs.example.com/evil.xml",
        status_code=200,
        content_type="application/xml",
        body_text='<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><urlset/>',
    )
    with pytest.raises(DomainValidationError, match="DTD and entity declarations"):
        SitemapXmlExtractor().extract(xxe_doc, selectors=[])

    # Verify ScrapingService.execute_scrape_job caches document and publishes event.
    async def run_worker_flow() -> None:
        upstream_hits = 0

        def handler(request: httpx.Request) -> httpx.Response:
            nonlocal upstream_hits
            upstream_hits += 1
            return httpx.Response(
                200, headers={"Content-Type": "text/html"}, text=SAMPLE_HTML
            )

        cfg = Settings(environment="test")
        queue = InMemoryJobQueue()
        cache = InMemoryTTLCache()
        bus = EventBus()
        fetcher = HttpxPageFetcher(cfg, transport=httpx.MockTransport(handler))
        service = ScrapingService(cfg, queue, cache, fetcher=fetcher, event_bus=bus)

        job = await queue.enqueue(
            "scraping.extract",
            {
                "url": "https://docs.example.com/guide",
                "strategy": ScrapeStrategy.STRUCTURED_METADATA.value,
                "selectors": ["h1"],
                "cache_ttl_seconds": 120,
            },
            correlation_id="corr-scrape-1",
        )
        first_result = await service.execute_scrape_job(job)
        second_result = await service.execute_scrape_job(job)

        assert first_result["cached"] is False
        assert second_result["cached"] is True
        assert upstream_hits == 1
        assert len(bus.recent_events()) == 1
        assert bus.recent_events()[0].event_type == "scraping.document.extracted"

    asyncio.run(run_worker_flow())
