"""Domain and transport exceptions for public data connectors."""

from __future__ import annotations

from typing import Any


class ConnectorError(Exception):
    """Base error raised by public data connector services."""

    status_code: int = 500
    title: str = "Connector error"

    def __init__(self, detail: str, *, extra: dict[str, Any] | None = None) -> None:
        super().__init__(detail)
        self.detail = detail
        self.extra = extra or {}


class ConnectorValidationError(ConnectorError):
    """Raised when input parameters (CPF, UF, NCM query, CNJ number) are invalid."""

    status_code = 422
    title = "Validation error"


class ConnectorNotFoundError(ConnectorError):
    """Raised when a requested municipality or public case does not exist."""

    status_code = 404
    title = "Resource not found"


class UpstreamConnectorError(ConnectorError):
    """Raised internally when an external public endpoint times out or fails."""

    status_code = 502
    title = "Upstream data source unavailable"
