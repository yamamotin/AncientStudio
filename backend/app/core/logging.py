"""Request correlation context and structured logging."""

from __future__ import annotations

import json
import logging
import time
import uuid
from collections.abc import Iterator
from contextlib import contextmanager
from contextvars import ContextVar

from app.core.time import utc_iso
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

_CORRELATION_ID_CTX: ContextVar[str] = ContextVar("correlation_id", default="unknown")

logger = logging.getLogger("ancientstudio.api")


def get_current_correlation_id() -> str:
    """Return the correlation ID bound to the active async/thread context."""
    return _CORRELATION_ID_CTX.get()


@contextmanager
def bind_correlation_id(correlation_id: str) -> Iterator[str]:
    """Bind ``correlation_id`` to the current execution context (requests or workers)."""
    token = _CORRELATION_ID_CTX.set(correlation_id)
    try:
        yield correlation_id
    finally:
        _CORRELATION_ID_CTX.reset(token)


class StructuredJsonFormatter(logging.Formatter):
    """Compact single-line JSON log formatter for non-local environments."""

    _EXTRA_FIELDS = (
        "correlation_id",
        "method",
        "path",
        "status_code",
        "duration_ms",
        "job_id",
        "topic",
    )

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, object] = {
            "timestamp": utc_iso(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "correlation_id": getattr(
                record, "correlation_id", get_current_correlation_id()
            ),
        }
        for field in self._EXTRA_FIELDS:
            value = getattr(record, field, None)
            if value is not None:
                payload[field] = value
        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)
        return json.dumps(payload, ensure_ascii=False)


class CorrelationIdMiddleware(BaseHTTPMiddleware):
    """Guarantee an ``X-Correlation-ID`` on every HTTP request, context, and response."""

    async def dispatch(self, request: Request, call_next):  # type: ignore[no-untyped-def]
        incoming = request.headers.get("X-Correlation-ID", "").strip()
        # Bound incoming header length to prevent header-bloat injection.
        correlation_id = incoming[:120] if incoming else uuid.uuid4().hex
        request.state.correlation_id = correlation_id
        started = time.perf_counter()

        with bind_correlation_id(correlation_id):
            response = await call_next(request)
            duration_ms = round((time.perf_counter() - started) * 1000, 2)
            response.headers["X-Correlation-ID"] = correlation_id
            logger.info(
                "request_completed",
                extra={
                    "correlation_id": correlation_id,
                    "method": request.method,
                    "path": request.url.path,
                    "status_code": response.status_code,
                    "duration_ms": duration_ms,
                },
            )
            return response


def configure_logging(environment: str) -> None:
    """Configure root/application logging idempotently for local or server runtimes."""
    normalized = environment.strip().lower()
    is_local = normalized in {"local", "test", "dev", "development"}
    level = logging.DEBUG if normalized == "local" else logging.INFO

    root_logger = logging.getLogger("ancientstudio")
    root_logger.setLevel(level)
    if not root_logger.handlers:
        handler = logging.StreamHandler()
        if is_local:
            handler.setFormatter(
                logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s")
            )
        else:
            handler.setFormatter(StructuredJsonFormatter())
        root_logger.addHandler(handler)
        root_logger.propagate = False
