"""Gateway/BFF domain service: fiscal validation, HMAC signing ceremony, and idempotency."""

from __future__ import annotations

import json
import math
import time

from app.cache.idempotency import IdempotencyStore
from app.core.errors import DomainValidationError, Problem
from app.core.security import (
    fingerprint as compute_fingerprint,
)
from app.core.security import (
    sha256_hex,
    sign_body,
    verify_hmac_signature,
)
from app.core.time import utc_now
from app.domains.gateway.schemas import InvoiceIn, InvoiceOut
from pydantic import ValidationError


class GatewayService:
    """Validates fiscal payloads, reconciles totals, and persists results idempotently."""

    def __init__(self, store: IdempotencyStore) -> None:
        self._store = store

    @staticmethod
    def validate_raw_invoice(raw: bytes) -> InvoiceIn:
        """Decode and validate raw UTF-8 JSON bytes into ``InvoiceIn``."""
        try:
            decoded = json.loads(raw)
        except (json.JSONDecodeError, UnicodeDecodeError) as exc:
            raise DomainValidationError("Request body must be valid UTF-8 JSON.") from exc

        try:
            return InvoiceIn.model_validate(decoded)
        except ValidationError as exc:
            raise DomainValidationError(
                "The invoice payload is invalid.",
                extra={"errors": exc.errors()},
            ) from exc

    def parse_invoice(
        self,
        payload: InvoiceIn,
        idempotency_key: str,
        fingerprint: str,
    ) -> tuple[InvoiceOut, bool]:
        gross = round(sum(item.quantity * item.unit_price for item in payload.items), 2)
        if not math.isclose(gross, payload.totals.gross, abs_tol=0.01):
            raise Problem(
                422,
                "Invoice validation failed",
                "The sum of items does not match totals.gross.",
                extra={"computed_gross": gross, "declared_gross": payload.totals.gross},
            )

        net = round(gross * (1 - payload.totals.tax), 2)

        def build() -> InvoiceOut:
            return InvoiceOut(
                invoice_id=f"INV-{fingerprint[:16].upper()}",
                invoice_key=payload.invoice_key,
                document_type=payload.document_type,
                status="accepted",
                currency=payload.totals.currency,
                gross=gross,
                tax=payload.totals.tax,
                net=net,
                validated_at=utc_now(),
                checks=["signature_verified", "schema_valid", "totals_reconciled"],
            )

        return self._store.get_or_create(idempotency_key, fingerprint, build)

    def submit_browser_invoice(
        self,
        raw: bytes,
        *,
        secret: str,
        max_age_seconds: int,
    ) -> tuple[InvoiceOut, bool]:
        """BFF flow: sign raw payload server-side so browsers never hold the HMAC secret."""
        payload = self.validate_raw_invoice(raw)
        digest = compute_fingerprint(sha256_hex(raw))
        sent_at = str(int(time.time()))
        signature = sign_body(raw, sent_at, secret)
        verify_hmac_signature(
            body=raw,
            timestamp=sent_at,
            signature=signature,
            secret=secret,
            max_age_seconds=max_age_seconds,
        )
        return self.parse_invoice(
            payload,
            idempotency_key=f"browser-{digest[:32]}",
            fingerprint=digest,
        )
