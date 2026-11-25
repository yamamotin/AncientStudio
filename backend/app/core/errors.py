"""Domain exceptions and RFC 7807-style problem+json responses."""

from __future__ import annotations

from typing import Any

from app.core.logging import get_current_correlation_id
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


class Problem(Exception):
    """Base domain error mapped to a stable RFC 7807 problem+json response."""

    def __init__(
        self,
        status_code: int,
        title: str,
        detail: str,
        *,
        problem_type: str = "about:blank",
        headers: dict[str, str] | None = None,
        extra: dict[str, Any] | None = None,
    ) -> None:
        self.status_code = status_code
        self.title = title
        self.detail = detail
        self.problem_type = problem_type
        self.headers = headers or {}
        self.extra = extra or {}
        super().__init__(detail)


class AuthenticationError(Problem):
    """Raised when credentials or cryptographic signatures are invalid (401)."""

    def __init__(
        self,
        detail: str,
        *,
        title: str = "Unauthorized",
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(401, title, detail, headers=headers)


class AuthorizationError(Problem):
    """Raised when an authenticated principal lacks required scopes (403)."""

    def __init__(self, detail: str, *, title: str = "Forbidden") -> None:
        super().__init__(403, title, detail)


class ResourceNotFoundError(Problem):
    """Raised when a requested domain entity or dataset does not exist (404)."""

    def __init__(self, detail: str, *, title: str = "Resource not found") -> None:
        super().__init__(404, title, detail)


class ConflictError(Problem):
    """Raised on idempotency key payload mismatch or state conflicts (409)."""

    def __init__(self, detail: str, *, title: str = "Conflict") -> None:
        super().__init__(409, title, detail)


class DomainValidationError(Problem):
    """Raised when domain invariants or semantic checks fail (422)."""

    def __init__(
        self,
        detail: str,
        *,
        title: str = "Validation error",
        extra: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(422, title, detail, extra=extra)


class RateLimitExceededError(Problem):
    """Raised when a caller exceeds its configured rate-limit window (429)."""

    def __init__(self, detail: str, *, retry_after_seconds: int) -> None:
        super().__init__(
            429,
            "Too many requests",
            detail,
            headers={"Retry-After": str(max(1, retry_after_seconds))},
            extra={"retry_after_seconds": max(1, retry_after_seconds)},
        )


class UpstreamServiceError(Problem):
    """Raised when an external dependency such as n8n fails or rejects a call (502)."""

    def __init__(
        self,
        detail: str,
        *,
        title: str = "Bad gateway",
        extra: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(502, title, detail, extra=extra)


class ServiceUnavailableError(Problem):
    """Raised when a bounded resource such as a queue is at capacity (503)."""

    def __init__(self, detail: str, *, title: str = "Service unavailable") -> None:
        super().__init__(503, title, detail)


def _resolve_correlation_id(request: Request) -> str | None:
    from_state = getattr(request.state, "correlation_id", None)
    if from_state:
        return str(from_state)
    current = get_current_correlation_id()
    return None if current == "unknown" else current


def problem_response(
    *,
    status_code: int,
    title: str,
    detail: str,
    correlation_id: str | None,
    problem_type: str = "about:blank",
    headers: dict[str, str] | None = None,
    extra: dict[str, Any] | None = None,
) -> JSONResponse:
    body: dict[str, Any] = {
        "type": problem_type,
        "title": title,
        "status": status_code,
        "detail": detail,
        "correlation_id": correlation_id,
    }
    if extra:
        body.update(extra)
    response_headers = dict(headers or {})
    if correlation_id:
        response_headers["X-Correlation-ID"] = correlation_id
    return JSONResponse(body, status_code=status_code, headers=response_headers)


def register_error_handlers(app: FastAPI) -> None:
    """Attach consistent RFC 7807 handlers to the FastAPI instance."""

    @app.exception_handler(Problem)
    async def handle_problem(request: Request, exc: Problem) -> JSONResponse:
        return problem_response(
            status_code=exc.status_code,
            title=exc.title,
            detail=exc.detail,
            problem_type=exc.problem_type,
            correlation_id=_resolve_correlation_id(request),
            headers=exc.headers,
            extra=exc.extra,
        )

    @app.exception_handler(HTTPException)
    async def handle_http(request: Request, exc: HTTPException) -> JSONResponse:
        return problem_response(
            status_code=exc.status_code,
            title="HTTP error",
            detail=str(exc.detail),
            correlation_id=_resolve_correlation_id(request),
            headers=dict(exc.headers) if exc.headers else None,
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        return problem_response(
            status_code=422,
            title="Validation error",
            detail="The request payload is invalid.",
            correlation_id=_resolve_correlation_id(request),
            extra={"errors": exc.errors()},
        )
