"""Modular Web Scraping domain: SSRF-safe fetcher, extractors, cache, and queue dispatch."""

from app.domains.scraping.contracts import (
    ContentExtractorPort,
    PageFetcherPort,
    RawHttpDocument,
)
from app.domains.scraping.extractors import (
    HttpStaticExtractor,
    SitemapXmlExtractor,
    StructuredMetadataExtractor,
    build_default_extractors,
)
from app.domains.scraping.fetcher import HttpxPageFetcher
from app.domains.scraping.schemas import (
    ScrapedDocument,
    ScrapeJobAccepted,
    ScrapeJobRequest,
    ScrapeStrategy,
)
from app.domains.scraping.service import (
    SCRAPING_COMPLETED_EVENT,
    SCRAPING_EXTRACT_TOPIC,
    ScrapingService,
)

__all__ = [
    "SCRAPING_COMPLETED_EVENT",
    "SCRAPING_EXTRACT_TOPIC",
    "ContentExtractorPort",
    "HttpStaticExtractor",
    "HttpxPageFetcher",
    "PageFetcherPort",
    "RawHttpDocument",
    "ScrapeJobAccepted",
    "ScrapeJobRequest",
    "ScrapeStrategy",
    "ScrapedDocument",
    "ScrapingService",
    "SitemapXmlExtractor",
    "StructuredMetadataExtractor",
    "build_default_extractors",
]
