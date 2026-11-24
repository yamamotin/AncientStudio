"""Gateway signature, validation and idempotency tests."""

from collections.abc import Callable
from typing import Any

from fastapi.testclient import TestClient


def test_valid_invoice_is_accepted(
    client: TestClient, signed_headers: Callable[..., Any], invoice_payload: dict
) -> None:
    raw, headers = signed_headers(invoice_payload)

    response = client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "accepted"
    assert body["gross"] == 250.5
    assert body["net"] == 225.45
    assert response.headers["Idempotent-Replay"] == "false"
    assert body["invoice_id"].startswith("INV-")


def test_same_key_and_payload_replays_without_reprocessing(
    client: TestClient, signed_headers: Callable[..., Any], invoice_payload: dict
) -> None:
    raw, headers = signed_headers(invoice_payload)

    first = client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)
    second = client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)

    assert first.status_code == 201
    assert second.status_code == 200
    assert second.headers["Idempotent-Replay"] == "true"
    assert second.json()["invoice_id"] == first.json()["invoice_id"]


def test_same_key_with_other_payload_is_a_conflict(
    client: TestClient, signed_headers: Callable[..., Any], invoice_payload: dict
) -> None:
    raw, headers = signed_headers(invoice_payload)
    client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)

    changed = dict(invoice_payload)
    changed["invoice_key"] = "NFE-2026-0002"
    other_raw, other_headers = signed_headers(
        changed, idempotency_key=headers["Idempotency-Key"]
    )
    response = client.post(
        "/api/v1/gateway/invoices/parse", content=other_raw, headers=other_headers
    )

    assert response.status_code == 409
    assert response.json()["title"] == "Idempotency conflict"


def test_invalid_signature_is_rejected(
    client: TestClient, signed_headers: Callable[..., Any], invoice_payload: dict
) -> None:
    raw, headers = signed_headers(invoice_payload, signature="sha256=deadbeef")

    response = client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)

    assert response.status_code == 401
    assert response.json()["title"] == "Invalid signature"


def test_stale_timestamp_is_rejected(
    client: TestClient, signed_headers: Callable[..., Any], invoice_payload: dict
) -> None:
    raw, headers = signed_headers(invoice_payload, timestamp="1")

    response = client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)

    assert response.status_code == 401
    assert "outside the allowed window" in response.json()["detail"]


def test_totals_mismatch_returns_422(
    client: TestClient, signed_headers: Callable[..., Any], invoice_payload: dict
) -> None:
    payload = dict(invoice_payload)
    payload["totals"] = {**invoice_payload["totals"], "gross": 999.0}
    raw, headers = signed_headers(payload, idempotency_key="idem-key-0002")

    response = client.post("/api/v1/gateway/invoices/parse", content=raw, headers=headers)

    assert response.status_code == 422
    assert response.json()["title"] == "Invoice validation failed"
