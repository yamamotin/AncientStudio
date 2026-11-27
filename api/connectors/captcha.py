"""Standardized interactive CAPTCHA challenge detection, session store, and replay engine.

Provides a single reusable contract across every Python backend connector and scraper:
1. Detects reCAPTCHA, hCaptcha, Cloudflare Turnstile, and session-bound image CAPTCHAs
   directly from real upstream HTML responses (HTTP 200 or 401/403/422/429/503).
2. Persists live upstream session cookies (e.g. ``JSESSIONID``), hidden form tokens,
   target action URLs, and original query parameters (``consulta_payload``) under a
   short-lived ``challenge_id`` in ``CaptchaChallengeStore``.
3. Emits HTTP 422 ``CAPTCHA_REQUIRED`` with all metadata needed by a frontend popup
   (including ``image_base64`` / ``image_data_uri`` fetched with the same upstream
   session cookie so strict ``img-src 'self' data:`` CSP policies work seamlessly).
4. Resumes and completes the real upstream query once the user resolves the challenge,
   never falling back to demo, simulated, or mocked records.
"""

from __future__ import annotations

import base64
import re
import secrets
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser
from typing import Any
from urllib.parse import urlencode, urljoin, urlparse

from api.connectors.cache import ConnectorTTLCache
from api.connectors.errors import (
    ConnectorCaptchaRequiredError,
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import (
    HttpResponse,
    HttpTransport,
    merge_cookie_header,
    parse_cookie_string,
)
from api.connectors.validators import clean_digits, mask_cnpj, mask_cpf

DEFAULT_CHALLENGE_TTL_SECONDS = 300
MAX_CAPTCHA_IMAGE_BYTES = 1_048_576

_SITEKEY_JS_RE = re.compile(
    r"(?:data-sitekey|['\"]?sitekey['\"]?)\s*[=:]\s*['\"]([0-9A-Za-z_-]{12,100})['\"]",
    re.IGNORECASE,
)
_CALLBACK_JS_RE = re.compile(
    r"(?:data-callback|['\"]?callback['\"]?)\s*[=:]\s*['\"]?([A-Za-z_$][0-9A-Za-z_$]{2,80})['\"]?"
    r"|\b(executaRecaptcha[0-9A-Za-z_]*)\b"
)
_CAPTCHA_REJECTION_RE = re.compile(
    r"recaptcha\s+incorretamente|"
    r"recaptcha\s+inv[aá]lido|"
    r"valida[cç][aã]o\s+do\s+(?:re)?captcha\s+(?:falhou|inv[aá]lida|expirada)|"
    r"captcha\s+(?:inv[aá]lido|incorreto|expirado)|"
    r"c[oó]digo\s+de\s+seguran[cç]a\s+inv[aá]lido|"
    r"caracteres\s+da\s+imagem\s+incorretos|"
    r"confirme\s+que\s+n[aã]o\s+[eé]\s+um\s+rob[oô]|"
    r"selecione\s+o\s+recaptcha",
    re.IGNORECASE,
)
_IMAGE_PROMPT_RE = re.compile(
    r"(digite\s+os\s+caracteres[^.<\n]{0,80}|"
    r"informe\s+o\s+c[oó]digo\s+da\s+imagem[^.<\n]{0,80}|"
    r"digite\s+o\s+texto\s+da\s+imagem[^.<\n]{0,80})",
    re.IGNORECASE,
)
_DATA_URI_RE = re.compile(
    r"^data:(?P<mime>image/[A-Za-z0-9.+-]+);base64,(?P<b64>[A-Za-z0-9+/=\s]+)$",
    re.IGNORECASE,
)
_CAPTCHA_INPUT_NAME_RE = re.compile(
    r"(captcha|codcaptcha|kaptcha|jcaptcha|codigoseguranca|codigo_seguranca|"
    r"codseguranca|vlcaptcha|txtcaptcha|desafio|verificacao)",
    re.IGNORECASE,
)
_CONTEXTUAL_CAPTCHA_INPUT_NAMES = frozenset(
    {"resposta", "codigo", "caracteres", "letras", "valor"}
)
_CAPTCHA_IMG_HINT_RE = re.compile(
    r"(captcha|kaptcha|jcaptcha|gerarcaptcha|gerarimagem|imagemcaptcha|"
    r"imagemseguranca|imagem_seguranca|codigoseguranca|codseguranca|"
    r"simplecaptcha|stickyimg|desafio)",
    re.IGNORECASE,
)
_UNSAFE_SVG_RE = re.compile(
    rb"(<\s*script\b|javascript\s*:|on[a-z]+\s*=|<\s*foreignobject\b)",
    re.IGNORECASE,
)


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _format_utc(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def _sanitize_cookie_str(value: str | None) -> str | None:
    if not value:
        return None
    cleaned = re.sub(r"[\r\n\x00-\x1f\x7f]", "", str(value)).strip()
    return cleaned or None


def _is_safe_http_url(url: str | None) -> bool:
    if not url or re.search(r"[\r\n\x00-\x1f\x7f]", url):
        return False
    parsed = urlparse(url)
    return (
        parsed.scheme.lower() in {"http", "https"}
        and bool(parsed.hostname)
        and parsed.username is None
        and parsed.password is None
    )


def _is_safe_image_payload(raw_bytes: bytes, mime_type: str) -> bool:
    if not raw_bytes or len(raw_bytes) > MAX_CAPTCHA_IMAGE_BYTES:
        return False
    return mime_type in {
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "image/bmp",
    }


def _sniff_image_mime(raw_bytes: bytes, content_type: str | None = None) -> str:
    if content_type:
        media = content_type.split(";", 1)[0].strip().lower()
        if media.startswith("image/"):
            return media
    if raw_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if raw_bytes.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if raw_bytes.startswith((b"GIF87a", b"GIF89a")):
        return "image/gif"
    if raw_bytes.startswith(b"RIFF") and raw_bytes[8:12] == b"WEBP":
        return "image/webp"
    if b"<svg" in raw_bytes[:256].lower():
        return "image/svg+xml"
    return "image/png"


@dataclass
class DetectedCaptcha:
    """Normalized metadata parsed from an upstream HTML CAPTCHA page."""

    detected: bool = False
    provider: str = "recaptcha"
    site_key: str | None = None
    callback: str | None = None
    action_url: str | None = None
    http_method: str = "POST"
    form_fields: dict[str, str] = field(default_factory=dict)
    response_field: str = "g-recaptcha-response"
    image_url: str | None = None
    image_base64: str | None = None
    image_mime_type: str | None = None
    image_data_uri: str | None = None
    prompt_label: str | None = None
    rejected_previous_attempt: bool = False


class _CaptchaDomParser(HTMLParser):
    """Single-pass HTML parser detecting reCAPTCHA, hCaptcha, Turnstile, and image CAPTCHAs."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.provider: str | None = None
        self.site_key: str | None = None
        self.callback: str | None = None
        self.form_action: str | None = None
        self.form_method: str = "POST"
        self.form_fields: dict[str, str] = {}
        self.response_field: str | None = None
        self.image_src: str | None = None
        self.prompt_label: str | None = None

        self._in_form = False
        self._form_has_captcha = False
        self._current_form_action: str | None = None
        self._current_form_method: str = "POST"
        self._current_form_fields: dict[str, str] = {}
        self._in_script = False
        self._script_chunks: list[str] = []
        self._text_chunks: list[str] = []

    def _mark_provider(self, candidate: str) -> None:
        # Widget providers take precedence unless already explicitly identified
        priority = {"turnstile": 4, "hcaptcha": 4, "recaptcha": 3, "image": 2}
        if self.provider is None or priority.get(candidate, 1) > priority.get(
            self.provider, 1
        ):
            self.provider = candidate
        if self._in_form:
            self._form_has_captcha = True

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {k.lower(): (v or "") for k, v in attrs}
        tag_l = tag.lower()
        joined = " ".join(f"{k}={v}" for k, v in attr.items()).lower()

        if "cf-turnstile" in joined or "challenges.cloudflare.com/turnstile" in joined:
            self._mark_provider("turnstile")
            self.response_field = self.response_field or "cf-turnstile-response"
        elif "h-captcha" in joined or "hcaptcha.com" in joined:
            self._mark_provider("hcaptcha")
            self.response_field = self.response_field or "h-captcha-response"
        elif "g-recaptcha" in joined or "recaptcha" in joined:
            self._mark_provider("recaptcha")
            self.response_field = self.response_field or "g-recaptcha-response"

        if attr.get("data-sitekey"):
            self.site_key = attr["data-sitekey"].strip()
            if self.provider is None:
                self._mark_provider("recaptcha")
        if attr.get("data-callback"):
            self.callback = attr["data-callback"].strip()

        if tag_l == "form":
            self._in_form = True
            self._form_has_captcha = False
            self._current_form_action = attr.get("action", "").strip() or None
            self._current_form_method = (attr.get("method") or "POST").strip().upper()
            self._current_form_fields = {}
            if self.form_action is None and self._current_form_action:
                self.form_action = self._current_form_action
                self.form_method = self._current_form_method

        elif tag_l == "img":
            src = attr.get("src", "").strip()
            img_hint = " ".join(
                [
                    attr.get("id", ""),
                    attr.get("class", ""),
                    attr.get("alt", ""),
                    attr.get("title", ""),
                    src[:160],
                ]
            )
            if src and _CAPTCHA_IMG_HINT_RE.search(img_hint):
                self.image_src = src
                self._mark_provider("image")

        elif tag_l in {"input", "textarea"}:
            name = attr.get("name", "").strip()
            input_type = attr.get("type", "text").strip().lower()
            if name in {
                "g-recaptcha-response",
                "h-captcha-response",
                "cf-turnstile-response",
            }:
                if "h-captcha" in name:
                    self._mark_provider("hcaptcha")
                elif "turnstile" in name:
                    self._mark_provider("turnstile")
                else:
                    self._mark_provider("recaptcha")
                self.response_field = name
                return

            is_explicit_captcha_input = bool(
                _CAPTCHA_INPUT_NAME_RE.search(
                    f"{name} {attr.get('id', '')} {attr.get('placeholder', '')}"
                )
            )
            is_contextual_captcha_input = bool(
                (self.image_src or self._form_has_captcha)
                and name.lower() in _CONTEXTUAL_CAPTCHA_INPUT_NAMES
            )
            if (
                name
                and input_type in {"text", "tel", "search", "number"}
                and (is_explicit_captcha_input or is_contextual_captcha_input)
            ):
                if self.provider is None:
                    self._mark_provider("image")
                if self.response_field is None:
                    self.response_field = name
                if attr.get("placeholder") and not self.prompt_label:
                    self.prompt_label = attr["placeholder"].strip()
                return

            if self._in_form and name:
                if input_type in {"submit", "button", "reset", "image", "file"}:
                    return
                if input_type in {"radio", "checkbox"} and "checked" not in attr:
                    return
                self._current_form_fields.setdefault(name, attr.get("value", ""))

        elif tag_l == "iframe":
            src = attr.get("src", "").lower()
            if "recaptcha" in src:
                self._mark_provider("recaptcha")
            elif "hcaptcha" in src:
                self._mark_provider("hcaptcha")
            elif "turnstile" in src:
                self._mark_provider("turnstile")

        elif tag_l == "script":
            self._in_script = True
            src = attr.get("src", "").lower()
            if "turnstile" in src:
                self._mark_provider("turnstile")
            elif "hcaptcha" in src:
                self._mark_provider("hcaptcha")
            elif "recaptcha" in src:
                self._mark_provider("recaptcha")

    def handle_data(self, data: str) -> None:
        if self._in_script:
            self._script_chunks.append(data)
            return
        if data.strip():
            self._text_chunks.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag_l = tag.lower()
        if tag_l == "form" and self._in_form:
            if self._form_has_captcha or not self.form_fields:
                if self._current_form_action:
                    self.form_action = self._current_form_action
                self.form_method = self._current_form_method
                self.form_fields = dict(self._current_form_fields)
            self._in_form = False
            self._form_has_captcha = False
        elif tag_l == "script" and self._in_script:
            self._in_script = False

    def finalize(
        self,
        raw_html: str,
        *,
        base_url: str,
        default_site_key: str | None = None,
        default_callback: str | None = None,
    ) -> DetectedCaptcha:
        script_blob = "\n".join(self._script_chunks) + "\n" + raw_html
        visible_text = " ".join(self._text_chunks)

        if not self.site_key:
            sk_match = _SITEKEY_JS_RE.search(script_blob)
            if sk_match:
                self.site_key = sk_match.group(1).strip()
                if self.provider is None:
                    self._mark_provider("recaptcha")

        if not self.callback:
            cb_match = _CALLBACK_JS_RE.search(script_blob)
            if cb_match:
                candidate_cb = (cb_match.group(1) or cb_match.group(2) or "").strip()
                reserved = {"function", "null", "true", "false"}
                if candidate_cb and candidate_cb.lower() not in reserved:
                    self.callback = candidate_cb
                    if candidate_cb.startswith("executaRecaptcha") and self.provider is None:
                        self._mark_provider("recaptcha")

        prompt_match = _IMAGE_PROMPT_RE.search(visible_text)
        if prompt_match:
            if not self.prompt_label:
                self.prompt_label = re.sub(r"\s+", " ", prompt_match.group(1)).strip()
            if self.provider is None:
                self._mark_provider("image")

        rejected = bool(_CAPTCHA_REJECTION_RE.search(raw_html))
        if rejected and self.provider is None:
            self._mark_provider("recaptcha" if "recaptcha" in raw_html.lower() else "image")

        if self.provider is None:
            return DetectedCaptcha(detected=False)

        provider = self.provider
        default_field_map = {
            "recaptcha": "g-recaptcha-response",
            "hcaptcha": "h-captcha-response",
            "turnstile": "cf-turnstile-response",
            "image": "captcha",
        }
        response_field = self.response_field or default_field_map.get(provider, "captcha_token")
        form_fields = {
            k: v for k, v in self.form_fields.items() if k != response_field
        }

        image_url: str | None = None
        image_b64: str | None = None
        image_mime: str | None = None
        image_data_uri: str | None = None
        if self.image_src:
            data_match = _DATA_URI_RE.match(self.image_src)
            if data_match:
                image_mime = data_match.group("mime").lower()
                image_b64 = re.sub(r"\s+", "", data_match.group("b64"))
                image_data_uri = f"data:{image_mime};base64,{image_b64}"
            else:
                image_url = urljoin(base_url, self.image_src)

        resolved_site_key = self.site_key or (
            default_site_key if provider in {"recaptcha", "hcaptcha", "turnstile"} else None
        )
        resolved_callback = self.callback or (
            default_callback if provider == "recaptcha" else None
        )
        action_url = urljoin(base_url, self.form_action) if self.form_action else base_url

        default_prompts = {
            "recaptcha": "Resolva o desafio Google reCAPTCHA exigido pelo portal oficial.",
            "hcaptcha": "Resolva o desafio hCaptcha exigido pelo portal oficial.",
            "turnstile": "Confirme a verificação Cloudflare Turnstile exigida pelo portal.",
            "image": "Digite os caracteres exibidos na imagem de segurança do portal.",
        }

        return DetectedCaptcha(
            detected=True,
            provider=provider,
            site_key=resolved_site_key,
            callback=resolved_callback,
            action_url=action_url,
            http_method=self.form_method if self.form_method in {"GET", "POST"} else "POST",
            form_fields=form_fields,
            response_field=response_field,
            image_url=image_url,
            image_base64=image_b64,
            image_mime_type=image_mime,
            image_data_uri=image_data_uri,
            prompt_label=self.prompt_label or default_prompts.get(provider),
            rejected_previous_attempt=rejected,
        )


def detect_captcha_in_html(
    html: str,
    *,
    base_url: str,
    default_site_key: str | None = None,
    default_callback: str | None = None,
) -> DetectedCaptcha:
    """Inspect an HTML document and return structured CAPTCHA metadata if present."""
    if not html or len(html.strip()) < 16:
        return DetectedCaptcha(detected=False)
    stripped = html.lstrip()
    if stripped.startswith(("{", "[")):
        return DetectedCaptcha(detected=False)

    parser = _CaptchaDomParser()
    parser.feed(html)
    return parser.finalize(
        html,
        base_url=base_url,
        default_site_key=default_site_key,
        default_callback=default_callback,
    )


@dataclass
class CaptchaChallenge:
    """Server-side stateful CAPTCHA challenge bound to an active upstream session."""

    challenge_id: str
    connector: str
    operation: str
    provider: str
    site_key: str | None
    challenge_url: str
    portal_url: str
    action_url: str
    http_method: str
    callback: str | None
    response_field: str
    session_cookie: str | None
    cookie_jar: dict[str, str]
    form_fields: dict[str, str]
    challenge_data: dict[str, Any]
    consulta_payload: dict[str, Any]
    resume_endpoint: str
    resume_method: str
    created_at: str
    expires_at: str
    ttl_seconds: int
    instructions: list[str]
    resolve_endpoint: str = "/api/v1/captcha/resolve"

    def public_consulta_payload(self) -> dict[str, Any]:
        """Return LGPD-safe ``consulta_payload`` omitting raw CPF/CNPJ digits."""
        sanitized = dict(self.consulta_payload)
        raw_cpf = sanitized.pop("cpf", None)
        if raw_cpf and "cpf_mascarado" not in sanitized:
            digits = clean_digits(str(raw_cpf))
            if len(digits) == 11:
                sanitized["cpf_mascarado"] = mask_cpf(digits)
            elif len(digits) == 14:
                sanitized["cnpj_mascarado"] = mask_cnpj(digits)
        raw_cnpj = sanitized.pop("cnpj", None)
        if raw_cnpj and "cnpj_mascarado" not in sanitized:
            digits = clean_digits(str(raw_cnpj))
            if len(digits) == 14:
                sanitized["cnpj_mascarado"] = mask_cnpj(digits)
        return sanitized

    def to_public_payload(self) -> dict[str, Any]:
        """Serialize challenge metadata safe for compact frontend popup rendering & resumption."""
        expected_param = "captcha_token"
        accepted_params = ["captcha_token", "captcha_solution"]
        session_init = bool(self.cookie_jar or self.session_cookie)
        image_endpoint = (
            f"/api/v1/captcha/challenges/{self.challenge_id}/image"
            if self.challenge_data.get("image_base64")
            else None
        )
        popup_descriptor: dict[str, Any] = {
            "mode": self.provider,
            "challenge_id": self.challenge_id,
            "provider": self.provider,
            "prompt_label": self.challenge_data.get("prompt_label"),
            "expected_param": expected_param,
            "accepted_params": list(accepted_params),
            "challenge_param": "challenge_id",
            "session_param": "session_cookie",
            "response_field": self.response_field,
            "session_initialized": session_init,
            "image_data_uri": self.challenge_data.get("image_data_uri"),
            "image_mime_type": self.challenge_data.get("image_mime_type"),
            "image_endpoint": image_endpoint,
            "site_key": self.site_key,
            "challenge_url": self.challenge_url,
            "expires_at": self.expires_at,
        }
        payload: dict[str, Any] = {
            "challenge_id": self.challenge_id,
            "connector": self.connector,
            "operation": self.operation,
            "provider": self.provider,
            "site_key": self.site_key,
            "challenge_url": self.challenge_url,
            "form_url": self.challenge_url,
            "portal_url": self.portal_url,
            "action_url": self.action_url,
            "session_cookie": self.session_cookie,
            "session_initialized": session_init,
            "callback": self.callback,
            "recaptcha_callback": self.callback,
            "response_field": self.response_field,
            "expected_param": expected_param,
            "accepted_params": list(accepted_params),
            "popup": popup_descriptor,
            "challenge_data": dict(self.challenge_data),
            "consulta_payload": self.public_consulta_payload(),
            "resume_endpoint": self.resume_endpoint,
            "resume_method": self.resume_method,
            "resolve_endpoint": self.resolve_endpoint,
            "created_at": self.created_at,
            "expires_at": self.expires_at,
            "ttl_seconds": self.ttl_seconds,
            "instructions": list(self.instructions),
        }
        for img_key in ("image_url", "image_base64", "image_mime_type", "image_data_uri"):
            if self.challenge_data.get(img_key) is not None:
                payload[img_key] = self.challenge_data[img_key]
        if self.challenge_data.get("image_data_uri") is not None:
            payload["image_data_url"] = self.challenge_data["image_data_uri"]
            payload["captcha_image"] = self.challenge_data["image_data_uri"]
        if self.challenge_data.get("prompt_label") is not None:
            payload["challenge_text"] = self.challenge_data["prompt_label"]
        if image_endpoint is not None:
            payload["image_endpoint"] = image_endpoint
        return payload

    def public_metadata(self) -> dict[str, Any]:
        """Alias returning public popup metadata for ``GET /api/v1/captcha/challenges/{id}``."""
        return self.to_public_payload()

    def to_exception(
        self,
        detail: str,
        *,
        extra: dict[str, Any] | None = None,
    ) -> ConnectorCaptchaRequiredError:
        """Build the standardized 422 ``ConnectorCaptchaRequiredError`` for this challenge."""
        merged_extra = {
            "session_initialized": bool(self.cookie_jar or self.session_cookie),
            **(extra or {}),
        }
        return ConnectorCaptchaRequiredError(
            detail,
            challenge_id=self.challenge_id,
            provider=self.provider,
            site_key=self.site_key,
            challenge_url=self.challenge_url,
            form_url=self.challenge_url,
            portal_url=self.portal_url,
            action_url=self.action_url,
            session_cookie=self.session_cookie,
            callback=self.callback,
            recaptcha_callback=self.callback,
            response_field=self.response_field,
            challenge_data=self.challenge_data,
            consulta_payload=self.public_consulta_payload(),
            connector=self.connector,
            operation=self.operation,
            resume_endpoint=self.resume_endpoint,
            resume_method=self.resume_method,
            resolve_endpoint=self.resolve_endpoint,
            expires_at=self.expires_at,
            ttl_seconds=self.ttl_seconds,
            instructions=self.instructions,
            extra=merged_extra,
        )


@dataclass
class ResolvedCaptchaInput:
    """Normalized CAPTCHA resolution inputs merged with any stored server-side challenge."""

    challenge_id: str | None
    solution: str | None
    session_cookie: str | None
    cookie_jar: dict[str, str]
    consulta_payload: dict[str, Any]
    challenge: CaptchaChallenge | None

    @property
    def has_resolution(self) -> bool:
        return bool(self.solution or self.session_cookie)


class CaptchaChallengeStore:
    """Thread-safe TTL store managing pending CAPTCHA challenges across connectors/scrapers."""

    def __init__(
        self,
        *,
        cache: ConnectorTTLCache | None = None,
        default_ttl_seconds: int = DEFAULT_CHALLENGE_TTL_SECONDS,
    ) -> None:
        self._ttl_seconds = max(30, int(default_ttl_seconds))
        self._cache = cache or ConnectorTTLCache(
            default_ttl_seconds=float(self._ttl_seconds),
            max_entries=512,
        )

    @staticmethod
    def _cache_key(challenge_id: str) -> str:
        return f"captcha:challenge:{challenge_id}"

    def get_challenge(self, challenge_id: str | None) -> CaptchaChallenge | None:
        if not challenge_id:
            return None
        cid = str(challenge_id).strip()
        if not cid:
            return None
        hit, value = self._cache.get(self._cache_key(cid))
        return value if hit and isinstance(value, CaptchaChallenge) else None

    def require_challenge(self, challenge_id: str | None) -> CaptchaChallenge:
        if not challenge_id or not str(challenge_id).strip():
            raise ConnectorValidationError(
                "Informe 'challenge_id' para consultar ou concluir o desafio CAPTCHA.",
                extra={"field": "challenge_id", "code": "CHALLENGE_ID_REQUIRED"},
            )
        found = self.get_challenge(challenge_id)
        if found is None:
            raise ConnectorNotFoundError(
                f"Desafio CAPTCHA '{challenge_id}' não encontrado ou expirado. "
                "Execute novamente a consulta original para gerar um novo desafio.",
                extra={"challenge_id": challenge_id, "code": "CAPTCHA_CHALLENGE_NOT_FOUND"},
            )
        return found

    def consume_challenge(self, challenge_id: str | None) -> None:
        """Invalidate a challenge after successful completion so tokens are single-use."""
        if not challenge_id:
            return
        cid = str(challenge_id).strip()
        if cid:
            self._cache.set(self._cache_key(cid), None, ttl_seconds=0.05)

    def build_default_instructions(
        self,
        *,
        provider: str,
        challenge_url: str,
        site_key: str | None,
        callback: str | None,
        resume_endpoint: str,
        challenge_id: str,
    ) -> list[str]:
        if provider == "image":
            return [
                (
                    "1. Visualize a imagem do desafio "
                    f"(challenge_data.image_data_uri ou {challenge_url})."
                ),
                (
                    "2. Digite os caracteres exibidos na imagem no campo "
                    "'captcha_solution' (ou 'captcha_token')."
                ),
                (
                    f"3. Envie 'challenge_id' ('{challenge_id}') + 'captcha_solution' "
                    f"para '{resume_endpoint}' ou para 'POST /api/v1/captcha/resolve' "
                    "para concluir a consulta real."
                ),
            ]
        key_hint = site_key or "<site_key do portal>"
        cb_hint = f", callback: {callback}" if callback else ""
        return [
            (
                f"1. Exiba/resolva o desafio {provider} referente a "
                f"{challenge_url} (site_key: {key_hint}{cb_hint})."
            ),
            "2. Capture o token de resolução em 'captcha_token' (ou 'captcha_solution').",
            (
                f"3. Reenvie para '{resume_endpoint}' (ou 'POST /api/v1/captcha/resolve') "
                f"informando 'challenge_id': '{challenge_id}' e 'captcha_token' "
                "(preservando 'session_cookie' se enviado)."
            ),
        ]

    def issue_challenge(
        self,
        *,
        connector: str,
        operation: str,
        provider: str = "recaptcha",
        site_key: str | None = None,
        challenge_url: str,
        portal_url: str | None = None,
        action_url: str | None = None,
        http_method: str = "POST",
        callback: str | None = None,
        response_field: str | None = None,
        cookie_jar: dict[str, str] | None = None,
        raw_session_cookie: str | None = None,
        form_fields: dict[str, str] | None = None,
        consulta_payload: dict[str, Any] | None = None,
        resume_endpoint: str,
        resume_method: str = "POST",
        image_url: str | None = None,
        image_base64: str | None = None,
        image_mime_type: str | None = None,
        image_data_uri: str | None = None,
        prompt_label: str | None = None,
        rejected_previous_attempt: bool = False,
        instructions: list[str] | None = None,
        transport: HttpTransport | None = None,
        timeout_seconds: float = 3.5,
        ttl_seconds: int | None = None,
    ) -> CaptchaChallenge:
        """Create, persist, and return a standardized ``CaptchaChallenge``."""
        jar: dict[str, str] = {
            k: v
            for k, v in (cookie_jar or {}).items()
            if _sanitize_cookie_str(k) and _sanitize_cookie_str(v) is not None
        }
        jar.update(parse_cookie_string(_sanitize_cookie_str(raw_session_cookie)))
        if image_url and not _is_safe_http_url(image_url):
            image_url = None

        # When an image CAPTCHA URL is session-bound on the origin portal, fetch its bytes
        # using the exact same session cookie so the frontend popup can render a data: URI.
        if (
            provider == "image"
            and image_url
            and not image_base64
            and transport is not None
            and _is_safe_http_url(image_url)
        ):
            img_headers: dict[str, str] = {"Referer": challenge_url}
            cookie_hdr = merge_cookie_header(jar)
            if cookie_hdr:
                img_headers["Cookie"] = cookie_hdr
            try:
                img_resp = transport.request(
                    image_url,
                    method="GET",
                    headers=img_headers,
                    timeout_seconds=timeout_seconds,
                )
                jar.update(img_resp.cookies())
                if img_resp.status_code == 200 and img_resp.body:
                    sniffed_mime = _sniff_image_mime(
                        img_resp.body, img_resp.headers.get("content-type")
                    )
                    if _is_safe_image_payload(img_resp.body, sniffed_mime):
                        image_mime_type = sniffed_mime
                        image_base64 = base64.b64encode(img_resp.body).decode("ascii")
                        image_data_uri = f"data:{image_mime_type};base64,{image_base64}"
            except UpstreamConnectorError:
                pass

        if image_base64 and not image_data_uri:
            mime = image_mime_type or "image/png"
            image_mime_type = mime
            image_data_uri = f"data:{mime};base64,{image_base64}"

        default_field_map = {
            "recaptcha": "g-recaptcha-response",
            "hcaptcha": "h-captcha-response",
            "turnstile": "cf-turnstile-response",
            "image": "captcha",
        }
        resolved_field = response_field or default_field_map.get(provider, "captcha_token")
        resolved_portal = portal_url or challenge_url
        resolved_action = action_url or challenge_url
        session_cookie_str = _sanitize_cookie_str(merge_cookie_header(jar))

        challenge_id = f"cap_{secrets.token_urlsafe(18)}"
        ttl = max(30, int(ttl_seconds or self._ttl_seconds))
        now = _utc_now()
        created_iso = _format_utc(now)
        expires_iso = _format_utc(now + timedelta(seconds=ttl))

        cleaned_form_fields = {
            k: v for k, v in (form_fields or {}).items() if k != resolved_field
        }

        challenge_data: dict[str, Any] = {
            "provider": provider,
            "site_key": site_key,
            "response_field": resolved_field,
            "expected_param": "captcha_token",
            "accepted_params": ["captcha_token", "captcha_solution"],
            "callback": callback,
            "challenge_url": challenge_url,
            "http_method": http_method.upper(),
            "image_url": image_url,
            "image_base64": image_base64,
            "image_mime_type": image_mime_type,
            "image_data_uri": image_data_uri,
            "prompt_label": prompt_label
            or (
                "Digite os caracteres da imagem de segurança."
                if provider == "image"
                else f"Resolva a verificação {provider} exigida pelo portal oficial."
            ),
            "rejected_previous_attempt": rejected_previous_attempt,
            "session_initialized": bool(jar),
        }

        resolved_instructions = instructions or self.build_default_instructions(
            provider=provider,
            challenge_url=challenge_url,
            site_key=site_key,
            callback=callback,
            resume_endpoint=resume_endpoint,
            challenge_id=challenge_id,
        )

        challenge = CaptchaChallenge(
            challenge_id=challenge_id,
            connector=connector,
            operation=operation,
            provider=provider,
            site_key=site_key,
            challenge_url=challenge_url,
            portal_url=resolved_portal,
            action_url=resolved_action,
            http_method=http_method.upper(),
            callback=callback,
            response_field=resolved_field,
            session_cookie=session_cookie_str,
            cookie_jar=jar,
            form_fields=cleaned_form_fields,
            challenge_data=challenge_data,
            consulta_payload=dict(consulta_payload or {}),
            resume_endpoint=resume_endpoint,
            resume_method=resume_method.upper(),
            created_at=created_iso,
            expires_at=expires_iso,
            ttl_seconds=ttl,
            instructions=resolved_instructions,
        )
        self._cache.set(self._cache_key(challenge_id), challenge, ttl_seconds=float(ttl))
        return challenge

    def get_challenge_image(self, challenge_id: str | None) -> tuple[bytes, str]:
        """Return ``(raw_image_bytes, mime_type)`` for an active image CAPTCHA challenge."""
        challenge = self.require_challenge(challenge_id)
        b64 = challenge.challenge_data.get("image_base64")
        if not b64 or not isinstance(b64, str):
            raise ConnectorNotFoundError(
                f"O desafio '{challenge.challenge_id}' ({challenge.provider}) "
                "não possui imagem CAPTCHA binária associada.",
                extra={
                    "challenge_id": challenge.challenge_id,
                    "provider": challenge.provider,
                    "code": "CAPTCHA_IMAGE_NOT_AVAILABLE",
                },
            )
        raw_bytes = base64.b64decode(b64)
        mime = str(challenge.challenge_data.get("image_mime_type") or "image/png")
        return raw_bytes, mime

    def resolve_inputs(
        self,
        *,
        challenge_id: str | None = None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
        require_known_challenge_when_only_id: bool = True,
    ) -> ResolvedCaptchaInput:
        """Merge caller CAPTCHA inputs with stored challenge state when given."""
        cid = str(challenge_id or "").strip() or None
        solution = str(captcha_token or captcha_solution or "").strip() or None
        raw_cookie = _sanitize_cookie_str(session_cookie)

        challenge = self.get_challenge(cid) if cid else None
        if not solution and isinstance(consulta_payload, dict):
            fallback_keys = [
                "captcha_token",
                "captcha_solution",
                "g-recaptcha-response",
                "resposta",
                "captcha",
            ]
            if challenge is not None and challenge.response_field not in fallback_keys:
                fallback_keys.insert(0, challenge.response_field)
            for key in fallback_keys:
                candidate = str(consulta_payload.get(key) or "").strip()
                if candidate:
                    solution = candidate
                    break
        if (
            cid
            and challenge is None
            and require_known_challenge_when_only_id
            and not consulta_payload
        ):
            # Caller relied on challenge_id state that expired or does not exist
            raise ConnectorValidationError(
                f"Desafio CAPTCHA '{cid}' expirado ou inválido. "
                "Execute novamente a consulta original para obter um novo challenge_id.",
                extra={"field": "challenge_id", "code": "CAPTCHA_CHALLENGE_EXPIRED"},
            )

        merged_jar: dict[str, str] = {}
        if challenge is not None:
            merged_jar.update(challenge.cookie_jar)
        merged_jar.update(parse_cookie_string(raw_cookie))
        merged_cookie_str = merge_cookie_header(merged_jar) or None

        merged_payload: dict[str, Any] = {}
        if challenge is not None:
            merged_payload.update(challenge.consulta_payload)
        if isinstance(consulta_payload, dict):
            merged_payload.update(
                {k: v for k, v in consulta_payload.items() if v is not None}
            )

        return ResolvedCaptchaInput(
            challenge_id=cid,
            solution=solution,
            session_cookie=merged_cookie_str,
            cookie_jar=merged_jar,
            consulta_payload=merged_payload,
            challenge=challenge,
        )

    def inspect_response_for_captcha(
        self,
        resp: HttpResponse | None,
        *,
        connector: str,
        operation: str,
        consulta_payload: dict[str, Any],
        resume_endpoint: str,
        resume_method: str = "GET",
        portal_url: str | None = None,
        cookie_jar: dict[str, str] | None = None,
        raw_session_cookie: str | None = None,
        transport: HttpTransport | None = None,
        timeout_seconds: float = 3.5,
        default_site_key: str | None = None,
        default_callback: str | None = None,
        rejected_previous_attempt: bool = False,
    ) -> None:
        """Raise ``ConnectorCaptchaRequiredError`` if ``resp`` is an HTML CAPTCHA."""
        if resp is None or not resp.body:
            return
        ctype = resp.headers.get("content-type", "").lower()
        if "json" in ctype and not resp.body.lstrip().startswith(b"<"):
            return

        html = resp.text()
        detected = detect_captcha_in_html(
            html,
            base_url=resp.url,
            default_site_key=default_site_key,
            default_callback=default_callback,
        )
        if not detected.detected:
            return

        merged_jar = dict(cookie_jar or {})
        merged_jar.update(resp.cookies())
        was_rejected = bool(
            rejected_previous_attempt or detected.rejected_previous_attempt
        )

        challenge = self.issue_challenge(
            connector=connector,
            operation=operation,
            provider=detected.provider,
            site_key=detected.site_key,
            challenge_url=resp.url,
            portal_url=portal_url or resp.url,
            action_url=detected.action_url or resp.url,
            http_method=detected.http_method,
            callback=detected.callback,
            response_field=detected.response_field,
            cookie_jar=merged_jar,
            raw_session_cookie=raw_session_cookie,
            form_fields=detected.form_fields,
            consulta_payload=consulta_payload,
            resume_endpoint=resume_endpoint,
            resume_method=resume_method,
            image_url=detected.image_url,
            image_base64=detected.image_base64,
            image_mime_type=detected.image_mime_type,
            image_data_uri=detected.image_data_uri,
            prompt_label=detected.prompt_label,
            rejected_previous_attempt=was_rejected,
            transport=transport,
            timeout_seconds=timeout_seconds,
        )
        detail_msg = (
            f"O portal de origem ({connector}) recusou a resposta anterior do CAPTCHA "
            f"({detected.provider}) e emitiu um novo desafio."
            if was_rejected
            else (
                f"O portal oficial ({connector}) exigiu verificação humana CAPTCHA "
                f"({detected.provider}) para concluir a consulta real."
            )
        )
        raise challenge.to_exception(detail_msg)

    def inspect_upstream_error_for_captcha(
        self,
        exc: UpstreamConnectorError,
        *,
        connector: str,
        operation: str,
        consulta_payload: dict[str, Any],
        resume_endpoint: str,
        resume_method: str = "GET",
        portal_url: str | None = None,
        cookie_jar: dict[str, str] | None = None,
        raw_session_cookie: str | None = None,
        transport: HttpTransport | None = None,
        timeout_seconds: float = 3.5,
        rejected_previous_attempt: bool = False,
    ) -> None:
        """Inspect ``exc.http_response`` (e.g. HTTP 403/429 WAF or non-JSON HTML) for CAPTCHA."""
        if exc.http_response is not None:
            self.inspect_response_for_captcha(
                exc.http_response,
                connector=connector,
                operation=operation,
                consulta_payload=consulta_payload,
                resume_endpoint=resume_endpoint,
                resume_method=resume_method,
                portal_url=portal_url,
                cookie_jar=cookie_jar,
                raw_session_cookie=raw_session_cookie,
                transport=transport,
                timeout_seconds=timeout_seconds,
                rejected_previous_attempt=rejected_previous_attempt,
            )

    def submit_upstream_solution(
        self,
        challenge: CaptchaChallenge,
        resolved: ResolvedCaptchaInput,
        *,
        transport: HttpTransport,
        timeout_seconds: float = 4.5,
        extra_params: dict[str, Any] | None = None,
    ) -> tuple[HttpResponse, dict[str, str]]:
        """Submit a solved CAPTCHA to ``challenge.action_url`` and return ``(resp, jar)``."""
        if not resolved.solution:
            raise ConnectorValidationError(
                "Informe 'captcha_token' ou 'captcha_solution' para concluir o desafio CAPTCHA.",
                extra={"field": "captcha_solution", "challenge_id": challenge.challenge_id},
            )

        jar = dict(challenge.cookie_jar)
        jar.update(resolved.cookie_jar)

        payload_fields: dict[str, Any] = dict(extra_params or {})
        payload_fields.update(challenge.form_fields)
        payload_fields[challenge.response_field] = resolved.solution

        submit_headers: dict[str, str] = {
            "Referer": challenge.challenge_url,
            "X-Captcha-Token": resolved.solution,
            "X-Captcha-Response": resolved.solution,
        }
        cookie_hdr = merge_cookie_header(jar, resolved.session_cookie)
        if cookie_hdr:
            submit_headers["Cookie"] = cookie_hdr

        self.consume_challenge(challenge.challenge_id)

        try:
            if challenge.http_method.upper() == "POST":
                submit_headers["Content-Type"] = "application/x-www-form-urlencoded"
                body_bytes = urlencode(
                    {k: str(v) for k, v in payload_fields.items()}
                ).encode("utf-8")
                verify_resp = transport.request(
                    challenge.action_url,
                    method="POST",
                    headers=submit_headers,
                    data=body_bytes,
                    timeout_seconds=timeout_seconds,
                )
            else:
                verify_resp = transport.request(
                    challenge.action_url,
                    method="GET",
                    params=payload_fields,
                    headers=submit_headers,
                    timeout_seconds=timeout_seconds,
                )
            jar.update(verify_resp.cookies())
        except UpstreamConnectorError as exc:
            self.inspect_upstream_error_for_captcha(
                exc,
                connector=challenge.connector,
                operation=challenge.operation,
                consulta_payload=resolved.consulta_payload or challenge.consulta_payload,
                resume_endpoint=challenge.resume_endpoint,
                resume_method=challenge.resume_method,
                portal_url=challenge.portal_url,
                cookie_jar=jar,
                raw_session_cookie=resolved.session_cookie,
                transport=transport,
                timeout_seconds=timeout_seconds,
                rejected_previous_attempt=True,
            )
            raise

        self.inspect_response_for_captcha(
            verify_resp,
            connector=challenge.connector,
            operation=challenge.operation,
            consulta_payload=resolved.consulta_payload or challenge.consulta_payload,
            resume_endpoint=challenge.resume_endpoint,
            resume_method=challenge.resume_method,
            portal_url=challenge.portal_url,
            cookie_jar=jar,
            raw_session_cookie=resolved.session_cookie,
            transport=transport,
            timeout_seconds=timeout_seconds,
            rejected_previous_attempt=True,
        )
        return verify_resp, jar
