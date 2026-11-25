"""HTTP security policy headers and scoped rate-limiting middlewares."""

from __future__ import annotations

from dataclasses import dataclass

from app.core.config import Settings
from app.core.errors import AuthenticationError, problem_response
from app.core.logging import get_current_correlation_id
from app.core.security import (
    ApiKeyVerifier,
    RateLimitDecision,
    RateLimitPolicy,
    Scope,
    SlidingWindowRateLimiter,
    sha256_hex,
)
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

_EXEMPT_RATE_LIMIT_PATHS = frozenset({"/api/v1/health", "/api/v1/build"})


@dataclass(frozen=True)
class ScopedQuotaEvaluation:
    """Evaluated rate-limit decision enriched with caller tier metadata."""

    tier: str
    decision: RateLimitDecision
    reset_seconds: int


class ScopedRateLimiter:
    """Maintains per-tier sliding-window buckets (anonymous IP, authenticated key, admin key)."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._verifier = ApiKeyVerifier(settings)
        window = settings.rate_limit_window_seconds
        self._window = window
        self._limiters: dict[str, SlidingWindowRateLimiter] = {
            "anonymous": SlidingWindowRateLimiter(
                RateLimitPolicy(settings.rate_limit_requests_per_minute, window)
            ),
            "authenticated": SlidingWindowRateLimiter(
                RateLimitPolicy(settings.rate_limit_authenticated_per_minute, window)
            ),
            "admin": SlidingWindowRateLimiter(
                RateLimitPolicy(settings.rate_limit_admin_per_minute, window)
            ),
        }

    def _resolve_caller(self, request: Request) -> tuple[str, str]:
        raw_key = request.headers.get("X-API-Key", "").strip()
        if raw_key:
            try:
                principal = self._verifier.authenticate(raw_key)
                key_hash = sha256_hex(raw_key.encode("utf-8"))[:16]
                if Scope.ADMIN in principal.scopes:
                    return "admin", f"admin:{key_hash}"
                return "authenticated", f"auth:{key_hash}"
            except AuthenticationError:
                # Unrecognized keys fall back to IP-scoped anonymous quota so brute-force
                # attempts cannot bypass rate limiting.
                pass

        forwarded = request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
        client_host = (
            forwarded
            or (request.client.host if request.client is not None else "unknown")
        )
        return "anonymous", f"ip:{client_host}"

    def evaluate(self, request: Request, *, now: float | None = None) -> ScopedQuotaEvaluation:
        tier, bucket_key = self._resolve_caller(request)
        decision = self._limiters[tier].check(bucket_key, now=now)
        reset_seconds = (
            decision.retry_after_seconds if not decision.allowed else self._window
        )
        return ScopedQuotaEvaluation(
            tier=tier,
            decision=decision,
            reset_seconds=max(1, reset_seconds),
        )


def _apply_quota_headers(headers: dict[str, str], evaluation: ScopedQuotaEvaluation) -> None:
    headers["X-RateLimit-Limit"] = str(evaluation.decision.limit)
    headers["X-RateLimit-Remaining"] = str(evaluation.decision.remaining)
    headers["X-RateLimit-Reset"] = str(evaluation.reset_seconds)
    headers["X-RateLimit-Scope"] = evaluation.tier


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Active HTTP middleware enforcing per-scope/IP rate quotas on ``/api/*`` routes."""

    def __init__(self, app, *, limiter: ScopedRateLimiter, enabled: bool = True) -> None:  # type: ignore[no-untyped-def]
        super().__init__(app)
        self._limiter = limiter
        self._enabled = enabled

    async def dispatch(self, request: Request, call_next) -> Response:  # type: ignore[no-untyped-def]
        path = request.url.path
        if not self._enabled or not path.startswith("/api/") or path in _EXEMPT_RATE_LIMIT_PATHS:
            return await call_next(request)

        evaluation = self._limiter.evaluate(request)
        if not evaluation.decision.allowed:
            correlation_id = getattr(request.state, "correlation_id", None) or (
                None
                if get_current_correlation_id() == "unknown"
                else get_current_correlation_id()
            )
            quota_headers = {
                "Retry-After": str(evaluation.decision.retry_after_seconds),
            }
            _apply_quota_headers(quota_headers, evaluation)
            return problem_response(
                status_code=429,
                title="Too many requests",
                detail=(
                    f"Rate limit exceeded for {evaluation.tier} tier "
                    f"({evaluation.decision.limit} requests/window)."
                ),
                correlation_id=correlation_id,
                headers=quota_headers,
                extra={
                    "retry_after_seconds": evaluation.decision.retry_after_seconds,
                    "scope": evaluation.tier,
                    "limit": evaluation.decision.limit,
                },
            )

        response = await call_next(request)
        quota_headers: dict[str, str] = {}
        _apply_quota_headers(quota_headers, evaluation)
        for header_name, header_value in quota_headers.items():
            response.headers[header_name] = header_value
        return response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Attach hardened OWASP baseline HTTP headers while preserving static preview embedding."""

    async def dispatch(self, request: Request, call_next) -> Response:  # type: ignore[no-untyped-def]
        response = await call_next(request)
        headers = response.headers
        headers.setdefault("X-Content-Type-Options", "nosniff")
        headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        headers.setdefault(
            "Permissions-Policy",
            "accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), usb=()",
        )
        headers.setdefault("X-XSS-Protection", "0")

        if request.url.path.startswith("/api/"):
            headers.setdefault("Cache-Control", "no-store")
            headers.setdefault(
                "Content-Security-Policy",
                "default-src 'none'; frame-ancestors 'none'",
            )
        return response
