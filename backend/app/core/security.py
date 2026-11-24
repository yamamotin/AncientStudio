"""HMAC signature verification and small crypto helpers."""

from __future__ import annotations

import hashlib
import hmac
import time

from app.core.errors import Problem


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fingerprint(*parts: str) -> str:
    """Stable digest used for idempotency keys and reproducible identifiers."""
    payload = "\x1f".join(parts).encode("utf-8")
    return sha256_hex(payload)


def sign_body(body: bytes, timestamp: str, secret: str) -> str:
    """Create the signature expected by :func:`verify_hmac_signature`."""
    return "sha256=" + hmac.new(
        secret.encode("utf-8"),
        f"{timestamp}.{sha256_hex(body)}".encode(),
        hashlib.sha256,
    ).hexdigest()


def verify_hmac_signature(
    *,
    body: bytes,
    timestamp: str,
    signature: str,
    secret: str,
    max_age_seconds: int,
    now: float | None = None,
) -> str:
    """Verify `sha256=<hmac(timestamp.sha256(body))>` with constant-time compare.

    Raises Problem(401) on a missing/stale timestamp, malformed signature or mismatch.
    The caller keeps the raw bytes so the exact signed representation is verified.
    """
    current = int(now if now is not None else time.time())
    try:
        sent_at = int(timestamp)
    except (TypeError, ValueError) as exc:
        raise Problem(401, "Invalid signature", "X-Timestamp must be a Unix timestamp.") from exc

    if abs(current - sent_at) > max_age_seconds:
        raise Problem(
            401, "Invalid signature", "Signature timestamp is outside the allowed window."
        )

    expected = "sha256=" + hmac.new(
        secret.encode("utf-8"),
        f"{sent_at}.{sha256_hex(body)}".encode(),
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(signature.strip(), expected):
        raise Problem(401, "Invalid signature", "HMAC signature does not match the payload.")
    return expected
