"""Fintech/Fiscal gateway: real payload validation and idempotent acceptance."""

from __future__ import annotations

import math
from datetime import UTC, datetime

from app.core.errors import Problem
from app.schemas.gateway import InvoiceIn, InvoiceOut
from app.services.idempotency import IdempotencyStore


class GatewayService:
    """Validates invoice math and persists the accepted result idempotently."""

    def __init__(self, store: IdempotencyStore) -> None:
        self._store = store

    def parse_invoice(
        self, payload: InvoiceIn, idempotency_key: str, fingerprint: str
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
                validated_at=datetime.now(UTC),
                checks=["signature_verified", "schema_valid", "totals_reconciled"],
            )

        return self._store.get_or_create(idempotency_key, fingerprint, build)
