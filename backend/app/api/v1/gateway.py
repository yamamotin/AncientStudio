"""Fintech/Fiscal gateway routes with real HMAC + idempotency handling."""

from __future__ import annotations

import json
import time

from app.api.deps import get_correlation_id, get_gateway_service
from app.config import Settings, get_settings
from app.core.errors import Problem
from app.core.security import (
    fingerprint,
    sha256_hex,
    sign_body,
    verify_hmac_signature,
)
from app.schemas.gateway import InvoiceIn
from app.services.gateway import GatewayService
from fastapi import APIRouter, Depends, Header, Request, Response
from fastapi.responses import JSONResponse
from pydantic import ValidationError

router = APIRouter(prefix="/gateway", tags=["gateway"])


def _validate_payload(raw: bytes) -> InvoiceIn:
    try:
        decoded = json.loads(raw)
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        raise Problem(422, "Validation error", "Request body must be valid UTF-8 JSON.") from exc

    try:
        return InvoiceIn.model_validate(decoded)
    except ValidationError as exc:
        raise Problem(
            422,
            "Validation error",
            "The invoice payload is invalid.",
            extra={"errors": exc.errors()},
        ) from exc


def _response(result, replayed: bool) -> JSONResponse:
    return JSONResponse(
        result.model_dump(mode="json"),
        status_code=200 if replayed else 201,
        headers={
            "Idempotent-Replay": "true" if replayed else "false",
            "Location": f"/api/v1/gateway/invoices/{result.invoice_id}",
        },
    )


@router.post(
    "/invoices/parse",
    summary="Validate and accept a fiscal document",
    responses={201: {"description": "Created"}, 200: {"description": "Idempotent replay"}},
)
async def parse_invoice(
    request: Request,
    x_signature: str = Header(..., alias="X-Signature"),
    x_timestamp: str = Header(..., alias="X-Timestamp"),
    idempotency_key: str = Header(..., alias="Idempotency-Key", min_length=8, max_length=120),
    settings: Settings = Depends(get_settings),
    service: GatewayService = Depends(get_gateway_service),
    correlation_id: str = Depends(get_correlation_id),
) -> Response:
    raw = await request.body()
    verify_hmac_signature(
        body=raw,
        timestamp=x_timestamp,
        signature=x_signature,
        secret=settings.gateway_hmac_secret,
        max_age_seconds=settings.signature_max_age_seconds,
    )

    payload = _validate_payload(raw)
    result, replayed = service.parse_invoice(
        payload,
        idempotency_key=idempotency_key,
        fingerprint=fingerprint(sha256_hex(raw)),
    )
    return _response(result, replayed)


@router.post(
    "/invoices/submit",
    summary="Browser-safe submission: server signs the payload before /parse",
    responses={201: {"description": "Created"}, 200: {"description": "Idempotent replay"}},
)
async def submit_invoice(
    request: Request,
    settings: Settings = Depends(get_settings),
    service: GatewayService = Depends(get_gateway_service),
) -> Response:
    """Sign on the server so the browser never holds the HMAC secret.

    The same verification path as /parse is still exercised before acceptance.
    """
    raw = await request.body()
    payload = _validate_payload(raw)
    digest = fingerprint(sha256_hex(raw))
    sent_at = str(int(time.time()))
    signature = sign_body(raw, sent_at, settings.gateway_hmac_secret)
    verify_hmac_signature(
        body=raw,
        timestamp=sent_at,
        signature=signature,
        secret=settings.gateway_hmac_secret,
        max_age_seconds=settings.signature_max_age_seconds,
    )
    result, replayed = service.parse_invoice(
        payload,
        idempotency_key=f"browser-{digest[:32]}",
        fingerprint=digest,
    )
    return _response(result, replayed)
