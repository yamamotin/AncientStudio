"""RFC 7807-style problem responses shared by every router."""

from __future__ import annotations

from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


class Problem(Exception):
    """Domain error mapped to a stable problem+json response."""

    def __init__(
        self,
        status_code: int,
        title: str,
        detail: str,
        *,
        headers: dict[str, str] | None = None,
        extra: dict[str, Any] | None = None,
    ) -> None:
        self.status_code = status_code
        self.title = title
        self.detail = detail
        self.headers = headers or {}
        self.extra = extra or {}
        super().__init__(detail)


def problem_response(
    *,
    status_code: int,
    title: str,
    detail: str,
    correlation_id: str | None,
    headers: dict[str, str] | None = None,
    extra: dict[str, Any] | None = None,
) -> JSONResponse:
    body: dict[str, Any] = {
        "type": "about:blank",
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
    """Attach consistent handlers to the application instance."""

    @app.exception_handler(Problem)
    async def handle_problem(request: Request, exc: Problem) -> JSONResponse:  # noqa: ARG001
        return problem_response(
            status_code=exc.status_code,
            title=exc.title,
            detail=exc.detail,
            correlation_id=getattr(request.state, "correlation_id", None),
            headers=exc.headers,
            extra=exc.extra,
        )

    @app.exception_handler(HTTPException)
    async def handle_http(request: Request, exc: HTTPException) -> JSONResponse:  # noqa: ARG001
        return problem_response(
            status_code=exc.status_code,
            title="HTTP error",
            detail=str(exc.detail),
            correlation_id=getattr(request.state, "correlation_id", None),
            headers=exc.headers,
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation(request: Request, exc: RequestValidationError) -> JSONResponse:  # noqa: ARG001
        return problem_response(
            status_code=422,
            title="Validation error",
            detail="The request payload is invalid.",
            correlation_id=getattr(request.state, "correlation_id", None),
            extra={"errors": exc.errors()},
        )
