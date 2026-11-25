"""Modular Web Scraping domain."""

from app.domains.scraping.contracts import (
    ContentExtractorPort,
    PageFetcherPort,
    RawHttpDocument,
)
from app.domains.scraping.schemas import (
    ScrapedDocument,
    ScrapeJobAccepted,
    ScrapeJobRequest,
    ScrapeStrategy,
)
from app.domains.scraping.service import SCRAPING_EXTRACT_TOPIC, ScrapingService

__all__ = [
    "SCRAPING_EXTRACT_TOPIC",
    "ContentExtractorPort",
    "PageFetcherPort",
    "RawHttpDocument",
    "ScrapeJobAccepted",
    "ScrapeJobRequest",
    "ScrapeStrategy",
    "ScrapedDocument",
    "ScrapingService",
]
