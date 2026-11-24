"""Fintech/Fiscal gateway routes with real HMAC + idempotency handling."""

from __future__ import annotations

import json

from app.api.deps import get_correlation_id, get_gateway_service
from app.config import Settings, get_settings
from app.core.errors import Problem
from app.core.security import fingerprint, sha256_hex, verify_hmac_signature
from app.schemas.gateway import InvoiceIn
from app.services.gateway import GatewayService
from fastapi import APIRouter, Depends, Header, Request, Response
from fastapi.responses import JSONResponse
from pydantic import ValidationError

router = APIRouter(prefix="/gateway", tags=["gateway"])


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

    try:
        decoded = json.loads(raw)
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        raise Problem(422, "Validation error", "Request body must be valid UTF-8 JSON.") from exc

    try:
        payload = InvoiceIn.model_validate(decoded)
    except ValidationError as exc:
        raise Problem(
            422,
            "Validation error",
            "The invoice payload is invalid.",
            extra={"errors": exc.errors()},
        ) from exc

    result, replayed = service.parse_invoice(
        payload,
        idempotency_key=idempotency_key,
        fingerprint=fingerprint(sha256_hex(raw)),
    )
    headers = {
        "Idempotent-Replay": "true" if replayed else "false",
        "Location": f"/api/v1/gateway/invoices/{result.invoice_id}",
    }
    return JSONResponse(
        result.model_dump(mode="json"),
        status_code=200 if replayed else 201,
        headers=headers,
    )
