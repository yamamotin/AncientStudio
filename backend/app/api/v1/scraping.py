"""Modular Web Scraping API routes (async queue jobs + synchronous CAPTCHA-aware extraction)."""

from __future__ import annotations

from api.connectors import ConnectorError
from app.api.deps import get_correlation_id, get_scraping_service, require_scopes
from app.core.security import Scope
from app.domains.public_connectors import raise_as_problem
from app.domains.scraping import (
    ScrapedDocument,
    ScrapeJobAccepted,
    ScrapeJobRequest,
    ScrapeSyncRequest,
    ScrapingService,
)
from fastapi import APIRouter, Depends, Header, status

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


@router.post(
    "/extract",
    response_model=ScrapedDocument,
    summary="Execute synchronous SSRF-safe scrape with 422 CAPTCHA_REQUIRED challenge & resumption",
)
async def extract_scrape_sync(
    body: ScrapeSyncRequest,
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    correlation_id: str = Depends(get_correlation_id),
    service: ScrapingService = Depends(get_scraping_service),
) -> ScrapedDocument:
    merged = body.model_copy(
        update={
            "challenge_id": body.challenge_id or x_challenge_id,
            "captcha_token": body.captcha_token or x_captcha_token,
            "captcha_solution": body.captcha_solution or x_captcha_solution,
            "session_cookie": body.session_cookie or x_captcha_session,
        }
    )
    try:
        return await service.extract_sync(merged, correlation_id=correlation_id)
    except ConnectorError as exc:
        raise_as_problem(exc)
