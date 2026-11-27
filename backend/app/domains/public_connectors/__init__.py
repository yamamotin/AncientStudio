"""Public data connectors domain schemas and RFC 7807 error adapter."""

from __future__ import annotations

from typing import NoReturn

from api.connectors import (
    ConnectorCaptchaRequiredError,
    ConnectorError,
    ConnectorNotFoundError,
    ConnectorValidationError,
)
from app.core.errors import (
    DomainValidationError,
    Problem,
    UpstreamServiceError,
)
from app.domains.public_connectors.schemas import (
    ConnectorEnvelope,
    ProjudiConsultaRequest,
    ProjudiResumoRequest,
)


def raise_as_problem(exc: ConnectorError) -> NoReturn:
    """Translate stdlib connector exceptions into FastAPI RFC 7807 Problem instances."""
    extra_payload = {"code": exc.code, **exc.extra}
    if isinstance(exc, ConnectorCaptchaRequiredError):
        raise DomainValidationError(
            exc.detail,
            title=exc.title,
            extra=extra_payload,
        ) from exc
    if isinstance(exc, ConnectorValidationError):
        raise DomainValidationError(exc.detail, extra=extra_payload) from exc
    if isinstance(exc, ConnectorNotFoundError):
        raise Problem(404, exc.title, exc.detail, extra=extra_payload) from exc
    if exc.status_code == 502:
        raise UpstreamServiceError(exc.detail, extra=extra_payload) from exc
    raise Problem(exc.status_code, exc.title, exc.detail, extra=extra_payload) from exc


__all__ = [
    "ConnectorEnvelope",
    "ProjudiConsultaRequest",
    "ProjudiResumoRequest",
    "raise_as_problem",
]
