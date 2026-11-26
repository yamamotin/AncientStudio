"""Public data connectors domain schemas and error adapter."""

from __future__ import annotations

from typing import NoReturn

from api.connectors import (
    ConnectorError,
    ConnectorNotFoundError,
    ConnectorValidationError,
)
from app.core.errors import (
    DomainValidationError,
    Problem,
    ResourceNotFoundError,
    UpstreamServiceError,
)
from app.domains.public_connectors.schemas import (
    ConnectorEnvelope,
    ProjudiConsultaRequest,
    ProjudiResumoRequest,
)


def raise_as_problem(exc: ConnectorError) -> NoReturn:
    """Translate stdlib connector exceptions into FastAPI RFC 7807 Problem instances."""
    if isinstance(exc, ConnectorValidationError):
        raise DomainValidationError(exc.detail, extra=exc.extra) from exc
    if isinstance(exc, ConnectorNotFoundError):
        raise ResourceNotFoundError(exc.detail) from exc
    if exc.status_code == 502:
        raise UpstreamServiceError(exc.detail, extra=exc.extra) from exc
    raise Problem(exc.status_code, exc.title, exc.detail, extra=exc.extra) from exc


__all__ = [
    "ConnectorEnvelope",
    "ProjudiConsultaRequest",
    "ProjudiResumoRequest",
    "raise_as_problem",
]
