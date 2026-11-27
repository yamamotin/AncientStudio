"""Domain and transport exceptions for public data connectors."""

from __future__ import annotations

from typing import Any


class ConnectorError(Exception):
    """Base error raised by public data connector services."""

    status_code: int = 500
    code: str = "CONNECTOR_ERROR"
    title: str = "Connector error"

    def __init__(
        self,
        detail: str,
        *,
        status_code: int | None = None,
        code: str | None = None,
        title: str | None = None,
        extra: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(detail)
        if status_code is not None:
            self.status_code = int(status_code)
        if title is not None:
            self.title = title
        self.detail = detail
        self.extra = dict(extra or {})
        resolved_code = code or str(self.extra.get("code") or self.code)
        self.code = resolved_code
        self.extra.setdefault("code", resolved_code)


class ConnectorValidationError(ConnectorError):
    """Raised when input parameters (CPF, UF, NCM query, CNJ number) are invalid."""

    status_code = 422
    code = "VALIDATION_ERROR"
    title = "Validation error"


class ConnectorCaptchaRequiredError(ConnectorError):
    """Raised when an official portal requires a human-solved CAPTCHA or active session."""

    status_code = 422
    code = "CAPTCHA_REQUIRED"
    title = "CAPTCHA verification required"

    def __init__(
        self,
        detail: str,
        *,
        site_key: str | None = None,
        portal_url: str | None = None,
        form_url: str | None = None,
        recaptcha_callback: str | None = None,
        instructions: str | list[str] | None = None,
        status_code: int = 422,
        extra: dict[str, Any] | None = None,
    ) -> None:
        merged_extra: dict[str, Any] = {
            "code": "CAPTCHA_REQUIRED",
            "site_key": site_key,
            "portal_url": portal_url,
            "form_url": form_url,
            "recaptcha_callback": recaptcha_callback,
            "instructions": instructions
            or (
                "Resolva o reCAPTCHA no portal público do PROJUDI TJPR e envie o token "
                "em 'captcha_token' (g-recaptcha-response) juntamente com 'session_cookie' "
                "(JSESSIONID), ou reutilize um cookie de sessão validado."
            ),
        }
        if extra:
            merged_extra.update(extra)
        super().__init__(
            detail,
            status_code=status_code,
            code="CAPTCHA_REQUIRED",
            title=self.title,
            extra=merged_extra,
        )


class ConnectorNotFoundError(ConnectorError):
    """Raised when a requested municipality or public case does not exist."""

    status_code = 404
    code = "NOT_FOUND"
    title = "Resource not found"


class UpstreamConnectorError(ConnectorError):
    """Raised internally when an external public endpoint times out or fails."""

    status_code = 502
    code = "UPSTREAM_UNAVAILABLE"
    title = "Upstream data source unavailable"
