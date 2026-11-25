"""Modular Web Scraping API routes."""

from __future__ import annotations

from app.api.deps import get_correlation_id, get_scraping_service, require_scopes
from app.core.security import Scope
from app.domains.scraping import ScrapeJobAccepted, ScrapeJobRequest, ScrapingService
from fastapi import APIRouter, Depends, status

router = APIRouter(
    prefix="/scraping",
    tags=["scraping"],
    dependencies=[Depends(require_scopes(Scope.SCRAPING_RUN))],
)


@router.post(
    "/jobs",
    response_model=ScrapeJobAccepted,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Validate target URL (SSRF guard) and enqueue an asynchronous scrape job",
)
async def enqueue_scrape_job(
    body: ScrapeJobRequest,
    correlation_id: str = Depends(get_correlation_id),
    service: ScrapingService = Depends(get_scraping_service),
) -> ScrapeJobAccepted:
    return await service.enqueue_scrape(body, correlation_id=correlation_id)
