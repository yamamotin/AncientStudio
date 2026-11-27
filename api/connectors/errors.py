"""Domain and transport exceptions for public data connectors and scrapers."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from api.connectors.http_client import HttpResponse


class ConnectorError(Exception):
    """Base error raised by public data connector and scraper services."""

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
    """Raised when input parameters (CPF, UF, NCM query, CNJ number, challenge) are invalid."""

    status_code = 422
    code = "VALIDATION_ERROR"
    title = "Validation error"


class ConnectorCaptchaRequiredError(ConnectorError):
    """Standardized 422 CAPTCHA_REQUIRED challenge contract for interactive popup resolution.

    Carries every field required for the frontend to render a popup challenge
    (reCAPTCHA, hCaptcha, Cloudflare Turnstile, or session-bound image CAPTCHA)
    and resume the exact real query on the backend without mock/demo fallbacks.
    """

    status_code = 422
    code = "CAPTCHA_REQUIRED"
    title = "CAPTCHA verification required"

    def __init__(
        self,
        detail: str,
        *,
        challenge_id: str | None = None,
        provider: str = "recaptcha",
        site_key: str | None = None,
        challenge_url: str | None = None,
        form_url: str | None = None,
        portal_url: str | None = None,
        action_url: str | None = None,
        session_cookie: str | None = None,
        callback: str | None = None,
        recaptcha_callback: str | None = None,
        response_field: str | None = None,
        challenge_data: dict[str, Any] | None = None,
        consulta_payload: dict[str, Any] | None = None,
        connector: str | None = None,
        operation: str | None = None,
        resume_endpoint: str | None = None,
        resume_method: str | None = None,
        resolve_endpoint: str = "/api/v1/captcha/resolve",
        expires_at: str | None = None,
        ttl_seconds: int | None = None,
        instructions: str | list[str] | None = None,
        status_code: int = 422,
        extra: dict[str, Any] | None = None,
    ) -> None:
        resolved_challenge_url = challenge_url or form_url or portal_url
        resolved_form_url = form_url or challenge_url or portal_url
        resolved_callback = callback if callback is not None else recaptcha_callback
        resolved_recaptcha_cb = (
            recaptcha_callback if recaptcha_callback is not None else callback
        )
        default_field_by_provider = {
            "recaptcha": "g-recaptcha-response",
            "hcaptcha": "h-captcha-response",
            "turnstile": "cf-turnstile-response",
            "image": "captcha",
        }
        resolved_response_field = response_field or default_field_by_provider.get(
            provider, "captcha_token"
        )
        expected_param = "captcha_token"
        accepted_params = ["captcha_token", "captcha_solution"]
        normalized_challenge_data = dict(challenge_data or {})
        normalized_challenge_data.setdefault("provider", provider)
        normalized_challenge_data.setdefault("site_key", site_key)
        normalized_challenge_data.setdefault("response_field", resolved_response_field)
        normalized_challenge_data.setdefault("expected_param", expected_param)
        normalized_challenge_data.setdefault("accepted_params", list(accepted_params))
        normalized_challenge_data.setdefault("callback", resolved_callback)
        normalized_challenge_data.setdefault("challenge_url", resolved_challenge_url)

        image_endpoint = (
            f"/api/v1/captcha/challenges/{challenge_id}/image"
            if challenge_id and normalized_challenge_data.get("image_base64")
            else None
        )
        popup_descriptor: dict[str, Any] = {
            "mode": provider,
            "challenge_id": challenge_id,
            "provider": provider,
            "prompt_label": normalized_challenge_data.get("prompt_label"),
            "expected_param": expected_param,
            "accepted_params": list(accepted_params),
            "challenge_param": "challenge_id",
            "session_param": "session_cookie",
            "response_field": resolved_response_field,
            "session_initialized": bool(
                session_cookie or normalized_challenge_data.get("session_initialized")
            ),
            "image_data_uri": normalized_challenge_data.get("image_data_uri"),
            "image_mime_type": normalized_challenge_data.get("image_mime_type"),
            "image_endpoint": image_endpoint,
            "site_key": site_key,
            "challenge_url": resolved_challenge_url,
            "expires_at": expires_at,
        }

        merged_extra: dict[str, Any] = {
            "code": "CAPTCHA_REQUIRED",
            "challenge_id": challenge_id,
            "provider": provider,
            "connector": connector,
            "operation": operation,
            "site_key": site_key,
            "challenge_url": resolved_challenge_url,
            "form_url": resolved_form_url,
            "portal_url": portal_url or resolved_challenge_url,
            "action_url": action_url or resolved_form_url,
            "session_cookie": session_cookie,
            "callback": resolved_callback,
            "recaptcha_callback": resolved_recaptcha_cb,
            "response_field": resolved_response_field,
            "expected_param": expected_param,
            "accepted_params": list(accepted_params),
            "popup": popup_descriptor,
            "challenge_data": normalized_challenge_data,
            "consulta_payload": dict(consulta_payload or {}),
            "resume_endpoint": resume_endpoint,
            "resume_method": resume_method,
            "resolve_endpoint": resolve_endpoint,
            "expires_at": expires_at,
            "ttl_seconds": ttl_seconds,
            "instructions": instructions
            or (
                "Resolva o desafio CAPTCHA exibido pelo portal oficial e reenvie a "
                "requisição informando 'challenge_id' e 'captcha_token' (ou 'captcha_solution'), "
                "preservando 'session_cookie' quando aplicável."
            ),
        }
        for img_key in ("image_url", "image_base64", "image_mime_type", "image_data_uri"):
            if normalized_challenge_data.get(img_key) is not None:
                merged_extra[img_key] = normalized_challenge_data[img_key]
        if normalized_challenge_data.get("image_data_uri") is not None:
            merged_extra["image_data_url"] = normalized_challenge_data["image_data_uri"]
            merged_extra["captcha_image"] = normalized_challenge_data["image_data_uri"]
        if normalized_challenge_data.get("prompt_label") is not None:
            merged_extra["challenge_text"] = normalized_challenge_data["prompt_label"]
        if image_endpoint is not None:
            merged_extra["image_endpoint"] = image_endpoint

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
    """Raised when a requested municipality, challenge, or public case does not exist."""

    status_code = 404
    code = "NOT_FOUND"
    title = "Resource not found"


class UpstreamConnectorError(ConnectorError):
    """Raised internally when an external public endpoint times out or fails."""

    status_code = 502
    code = "UPSTREAM_UNAVAILABLE"
    title = "Upstream data source unavailable"

    def __init__(
        self,
        detail: str,
        *,
        status_code: int | None = None,
        code: str | None = None,
        title: str | None = None,
        extra: dict[str, Any] | None = None,
        http_response: HttpResponse | None = None,
    ) -> None:
        self.http_response = http_response
        super().__init__(
            detail,
            status_code=status_code,
            code=code,
            title=title,
            extra=extra,
        )
