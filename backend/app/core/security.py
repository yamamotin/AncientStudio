"""Security primitives: HMAC signatures, API keys/scopes, sanitization, SSRF guard & rate limit."""

from __future__ import annotations

import hashlib
import hmac
import ipaddress
import re
import threading
import time
import unicodedata
from collections import deque
from collections.abc import Iterable
from dataclasses import dataclass
from enum import Enum
from urllib.parse import urlparse

from app.core.config import Settings
from app.core.errors import (
    AuthenticationError,
    AuthorizationError,
    DomainValidationError,
    Problem,
    RateLimitExceededError,
)

_SAFE_IDENTIFIER_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$")
_BLOCKED_HOSTNAMES = frozenset(
    {
        "localhost",
        "localhost.localdomain",
        "metadata.google.internal",
        "host.docker.internal",
    }
)


class Scope(str, Enum):
    """Authorization scopes for API keys across modular domains."""

    GATEWAY_WRITE = "gateway:write"
    WORKFLOWS_TRIGGER = "workflows:trigger"
    WORKFLOWS_READ = "workflows:read"
    SCRAPING_RUN = "scraping:run"
    AI_WORKFLOWS_RUN = "ai_workflows:run"
    PIPELINES_RUN = "pipelines:run"
    QUEUE_INSPECT = "queue:inspect"
    ADMIN = "admin"


DEFAULT_WORKFLOW_SCOPES: frozenset[Scope] = frozenset(
    {
        Scope.WORKFLOWS_TRIGGER,
        Scope.WORKFLOWS_READ,
        Scope.SCRAPING_RUN,
        Scope.AI_WORKFLOWS_RUN,
        Scope.PIPELINES_RUN,
        Scope.QUEUE_INSPECT,
    }
)


@dataclass(frozen=True)
class ApiPrincipal:
    """Authenticated caller identity and granted scopes."""

    subject: str
    scopes: frozenset[Scope]

    def has_scopes(self, required: Iterable[Scope]) -> bool:
        if Scope.ADMIN in self.scopes:
            return True
        return set(required).issubset(self.scopes)


class ApiKeyVerifier:
    """Constant-time API key authenticator with scope enforcement."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def authenticate(self, raw_key: str) -> ApiPrincipal:
        candidate = (raw_key or "").strip()
        if not candidate:
            raise AuthenticationError("Missing X-API-Key header.")

        if self._settings.admin_api_token and hmac.compare_digest(
            candidate, self._settings.admin_api_token
        ):
            return ApiPrincipal(subject="admin-key", scopes=frozenset({Scope.ADMIN}))

        if hmac.compare_digest(candidate, self._settings.workflow_api_token):
            return ApiPrincipal(subject="workflow-key", scopes=DEFAULT_WORKFLOW_SCOPES)

        raise AuthenticationError("Invalid X-API-Key for protected operation.")

    def authorize(self, raw_key: str, required_scopes: Iterable[Scope] = ()) -> ApiPrincipal:
        principal = self.authenticate(raw_key)
        if not principal.has_scopes(required_scopes):
            missing = sorted(scope.value for scope in set(required_scopes) - principal.scopes)
            raise AuthorizationError(
                f"API key lacks required scope(s): {', '.join(missing)}"
            )
        return principal


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fingerprint(*parts: str) -> str:
    """Stable digest used for idempotency keys and reproducible identifiers."""
    payload = "\x1f".join(parts).encode("utf-8")
    return sha256_hex(payload)


def sign_body(body: bytes, timestamp: str, secret: str) -> str:
    """Create the signature expected by :func:`verify_hmac_signature`."""
    return (
        "sha256="
        + hmac.new(
            secret.encode("utf-8"),
            f"{timestamp}.{sha256_hex(body)}".encode(),
            hashlib.sha256,
        ).hexdigest()
    )


def verify_hmac_signature(
    *,
    body: bytes,
    timestamp: str,
    signature: str,
    secret: str,
    max_age_seconds: int,
    now: float | None = None,
) -> str:
    """Verify ``sha256=<hmac(timestamp.sha256(body))>`` with constant-time compare."""
    current = int(now if now is not None else time.time())
    try:
        sent_at = int(timestamp)
    except (TypeError, ValueError) as exc:
        raise Problem(
            401, "Invalid signature", "X-Timestamp must be a Unix timestamp."
        ) from exc

    if abs(current - sent_at) > max_age_seconds:
        raise Problem(
            401,
            "Invalid signature",
            "Signature timestamp is outside the allowed window.",
        )

    expected = (
        "sha256="
        + hmac.new(
            secret.encode("utf-8"),
            f"{sent_at}.{sha256_hex(body)}".encode(),
            hashlib.sha256,
        ).hexdigest()
    )

    if not hmac.compare_digest(signature.strip(), expected):
        raise Problem(
            401, "Invalid signature", "HMAC signature does not match the payload."
        )
    return expected


def sanitize_identifier(value: str, *, field_name: str = "identifier") -> str:
    """Validate and normalize slugs/identifiers to prevent path or header injection."""
    cleaned = unicodedata.normalize("NFC", value).strip()
    if not _SAFE_IDENTIFIER_RE.match(cleaned) or ".." in cleaned:
        raise DomainValidationError(
            f"Invalid {field_name}: must contain only safe alphanumeric, "
            "'.', '_', ':', or '-' characters."
        )
    return cleaned


def sanitize_text(value: str, *, max_length: int = 4096) -> str:
    """Normalize text input and strip ASCII/Unicode control characters except newline/tab."""
    normalized = unicodedata.normalize("NFC", value)
    filtered = "".join(
        ch for ch in normalized if ch in {"\n", "\t"} or unicodedata.category(ch)[0] != "C"
    ).strip()
    return filtered[:max_length]


def validate_public_http_url(
    url: str,
    *,
    allowed_hosts: tuple[str, ...] = (),
) -> str:
    """Validate an outbound HTTP(S) URL and reject SSRF targets (loopback/private/link-local)."""
    candidate = url.strip()
    parsed = urlparse(candidate)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise DomainValidationError("URL must be an absolute http:// or https:// address.")

    host = parsed.hostname.lower().rstrip(".")
    if host in _BLOCKED_HOSTNAMES or host.endswith((".local", ".internal")):
        raise DomainValidationError(f"Target host '{host}' is not permitted.")

    try:
        ip = ipaddress.ip_address(host)
    except ValueError:
        ip = None

    if ip is not None and (
        ip.is_private
        or ip.is_loopback
        or ip.is_link_local
        or ip.is_multicast
        or ip.is_reserved
        or ip.is_unspecified
    ):
        raise DomainValidationError("Private, loopback, or link-local IP targets are forbidden.")

    if allowed_hosts:
        normalized_allowlist = {item.lower().rstrip(".") for item in allowed_hosts}
        if host not in normalized_allowlist:
            raise DomainValidationError(f"Host '{host}' is not in the configured allowlist.")

    return candidate


@dataclass(frozen=True)
class RateLimitPolicy:
    max_requests: int
    window_seconds: int


@dataclass(frozen=True)
class RateLimitDecision:
    allowed: bool
    limit: int
    remaining: int
    retry_after_seconds: int


class SlidingWindowRateLimiter:
    """Thread-safe monotonic sliding-window rate limiter."""

    def __init__(self, policy: RateLimitPolicy) -> None:
        self._policy = policy
        self._buckets: dict[str, deque[float]] = {}
        self._lock = threading.Lock()

    def check(self, key: str, *, now: float | None = None) -> RateLimitDecision:
        current = now if now is not None else time.monotonic()
        cutoff = current - self._policy.window_seconds

        with self._lock:
            bucket = self._buckets.get(key)
            if bucket is None:
                bucket = deque()
                self._buckets[key] = bucket

            while bucket and bucket[0] <= cutoff:
                bucket.popleft()

            if len(bucket) >= self._policy.max_requests:
                oldest = bucket[0]
                retry_after = max(1, int(round((oldest + self._policy.window_seconds) - current)))
                return RateLimitDecision(
                    allowed=False,
                    limit=self._policy.max_requests,
                    remaining=0,
                    retry_after_seconds=retry_after,
                )

            bucket.append(current)
            remaining = self._policy.max_requests - len(bucket)
            return RateLimitDecision(
                allowed=True,
                limit=self._policy.max_requests,
                remaining=remaining,
                retry_after_seconds=0,
            )

    def enforce(self, key: str, *, now: float | None = None) -> RateLimitDecision:
        decision = self.check(key, now=now)
        if not decision.allowed:
            raise RateLimitExceededError(
                "Rate limit exceeded for this client or key.",
                retry_after_seconds=decision.retry_after_seconds,
            )
        return decision
