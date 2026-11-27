"""Unified interactive CAPTCHA challenge inspection & real-query resolution routes."""

from __future__ import annotations

import asyncio
import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import (
    get_correlation_id,
    get_public_connectors,
    get_scraping_service,
)
from app.core.config import Settings, get_settings
from app.core.security import ApiKeyVerifier, Scope
from app.domains.public_connectors import (
    CaptchaResolveRequest,
    ConnectorEnvelope,
    raise_as_problem,
)
from app.domains.scraping import ScrapeSyncRequest, ScrapingService
from fastapi import APIRouter, Depends, Header, Response

router = APIRouter(prefix="/captcha", tags=["captcha"])


@router.get(
    "/challenges/{challenge_id}",
    response_model=ConnectorEnvelope,
    summary="Inspect active CAPTCHA challenge metadata for frontend popup rendering",
)
def get_captcha_challenge(
    challenge_id: str,
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.get_captcha_challenge(challenge_id)
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)


@router.get(
    "/challenges/{challenge_id}/image",
    summary="Stream raw image bytes for an active session-bound image CAPTCHA challenge",
)
def get_captcha_challenge_image(
    challenge_id: str,
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> Response:
    try:
        img_bytes, img_mime = connectors.get_captcha_challenge_image(challenge_id)
    except ConnectorError as exc:
        raise_as_problem(exc)
    return Response(
        content=img_bytes,
        media_type=img_mime,
        headers={"Cache-Control": "no-store, no-cache, must-revalidate"},
    )


@router.post(
    "/resolve",
    response_model=ConnectorEnvelope,
    summary="Submit solved CAPTCHA token/solution, reuse live session, and complete real query",
)
async def resolve_captcha_challenge(
    body: CaptchaResolveRequest,
    x_api_key: str | None = Header(default=None, alias="X-API-Key"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    x_transparencia_api_key: str | None = Header(
        default=None, alias="X-Transparencia-Api-Key"
    ),
    correlation_id: str = Depends(get_correlation_id),
    settings: Settings = Depends(get_settings),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
    scraping_service: ScrapingService = Depends(get_scraping_service),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    eff_cookie = body.session_cookie or x_captcha_session or x_projudi_session

    try:
        challenge = connectors.captcha.require_challenge(body.challenge_id)
        if challenge.connector == "scraping":
            ApiKeyVerifier(settings).authorize(x_api_key or "", [Scope.SCRAPING_RUN])
            sync_req = ScrapeSyncRequest(
                challenge_id=challenge.challenge_id,
                captcha_token=body.captcha_token,
                captcha_solution=body.captcha_solution,
                session_cookie=eff_cookie,
                consulta_payload=body.consulta_payload,
            )
            doc = await scraping_service.extract_sync(
                sync_req, correlation_id=correlation_id
            )
            data = {
                **doc.model_dump(mode="json"),
                "challenge_id": challenge.challenge_id,
                "captcha_resolved": True,
                "connector": "scraping",
                "operation": challenge.operation,
            }
        else:
            data = await asyncio.to_thread(
                connectors.resolve_captcha,
                challenge_id=body.challenge_id,
                captcha_token=body.captcha_token,
                captcha_solution=body.captcha_solution,
                session_cookie=eff_cookie,
                consulta_payload=body.consulta_payload,
                transparencia_api_key=x_transparencia_api_key,
            )
    except ConnectorError as exc:
        raise_as_problem(exc)

    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
