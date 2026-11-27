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
MAX_POPUP_DATA_URL_CHARS = 1_450_000
DEFAULT_RECAPTCHA_FALLBACK_BASE = "https://www.google.com/recaptcha/api/fallback"

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
_SCRIPT_CAPTCHA_IMG_RE = re.compile(
    r"['\"]([^'\"\s<>]{3,240}(?:captcha\.svl|gerarCaptcha|gerarImagem|"
    r"imagemCaptcha|imagemSeguranca|jcaptcha|kaptcha|stickyImg|simpleCaptcha)"
    r"[^'\"\s<>]{0,160})['\"]",
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


def _parse_utc(iso_str: str | None) -> datetime | None:
    if not iso_str:
        return None
    cleaned = str(iso_str).strip()
    if not cleaned:
        return None
    if cleaned.endswith("Z"):
        cleaned = cleaned[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(cleaned)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


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
    if mime_type not in {
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "image/bmp",
    }:
        return False
    estimated_data_url_len = len(f"data:{mime_type};base64,") + ((len(raw_bytes) + 2) // 3) * 4
    return estimated_data_url_len <= MAX_POPUP_DATA_URL_CHARS


def _sniff_image_mime(raw_bytes: bytes, content_type: str | None = None) -> str:
    if content_type:
        media = content_type.split(";", 1)[0].strip().lower()
        if media == "image/jpg":
            return "image/jpeg"
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
    if raw_bytes.startswith(b"BM"):
        return "image/bmp"
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
    fallback_url: str | None = None
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
        self.fallback_src: str | None = None
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
            if input_type == "image":
                src = attr.get("src", "").strip()
                img_hint = f"{name} {attr.get('id', '')} {attr.get('alt', '')} {src[:160]}"
                if src and _CAPTCHA_IMG_HINT_RE.search(img_hint):
                    self.image_src = src
                    self._mark_provider("image")
                return
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
            raw_src = attr.get("src", "").strip()
            src = raw_src.lower()
            if "recaptcha" in src:
                self._mark_provider("recaptcha")
                if "api/fallback" in src and not self.fallback_src:
                    self.fallback_src = raw_src
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

        if not self.image_src:
            js_img_match = _SCRIPT_CAPTCHA_IMG_RE.search(script_blob)
            if js_img_match:
                self.image_src = js_img_match.group(1).strip()
                if self.provider is None:
                    self._mark_provider("image")

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
                raw_mime = data_match.group("mime").lower()
                if raw_mime == "image/jpg":
                    raw_mime = "image/jpeg"
                cleaned_b64 = re.sub(r"\s+", "", data_match.group("b64"))
                try:
                    decoded = base64.b64decode(cleaned_b64, validate=False)
                except Exception:
                    decoded = b""
                sniffed = _sniff_image_mime(decoded, raw_mime)
                if decoded and _is_safe_image_payload(decoded, sniffed):
                    image_mime = sniffed
                    image_b64 = cleaned_b64
                    image_data_uri = f"data:{image_mime};base64,{image_b64}"
            else:
                candidate_url = urljoin(base_url, self.image_src)
                if _is_safe_http_url(candidate_url):
                    image_url = candidate_url

        fallback_url: str | None = None
        if self.fallback_src:
            candidate_fb = urljoin(base_url, self.fallback_src)
            if _is_safe_http_url(candidate_fb):
                fallback_url = candidate_fb

        resolved_site_key = self.site_key or (
            default_site_key if provider in {"recaptcha", "hcaptcha", "turnstile"} else None
        )
        resolved_callback = self.callback or (
            default_callback if provider == "recaptcha" else None
        )
        action_url = urljoin(base_url, self.form_action) if self.form_action else base_url

        default_prompts = {
            "recaptcha": "Informe a resposta do desafio de segurança exibido neste popup.",
            "hcaptcha": "Informe a resposta do desafio hCaptcha exibido neste popup.",
            "turnstile": "Confirme a verificação de segurança exibida neste popup.",
            "image": "Digite os caracteres exibidos na imagem de segurança.",
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
            fallback_url=fallback_url,
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


class _RecaptchaFallbackParser(HTMLParser):
    """Parse Google reCAPTCHA HTML fallback (``/recaptcha/api/fallback?k=...``) challenges."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.fallback_c: str | None = None
        self.payload_img_src: str | None = None
        self.mode: str = "text"
        self.checkbox_values: list[str] = []
        self.verification_token: str | None = None
        self.prompt_label: str | None = None
        self._in_token_textarea = False
        self._token_chunks: list[str] = []
        self._desc_depth = 0
        self._desc_chunks: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {k.lower(): (v or "") for k, v in attrs}
        tag_l = tag.lower()
        classes = attr.get("class", "").lower()

        if tag_l == "input":
            name = attr.get("name", "").strip()
            input_type = attr.get("type", "text").strip().lower()
            if name == "c" and attr.get("value"):
                self.fallback_c = attr["value"].strip()
            elif name == "response" and input_type == "checkbox":
                self.mode = "tiles"
                if attr.get("value") is not None:
                    self.checkbox_values.append(attr["value"].strip())
        elif tag_l == "img":
            src = attr.get("src", "").strip()
            if src and ("fbc-imageselect-payload" in classes or "api2/payload" in src):
                self.payload_img_src = src
        elif tag_l == "textarea":
            if "fbc-verification-token" in classes or "readonly" in attr:
                self._in_token_textarea = True
                self._token_chunks = []
        elif tag_l in {"div", "label", "span"}:
            if self._desc_depth > 0:
                self._desc_depth += 1
            elif any(
                hint in classes
                for hint in (
                    "rc-imageselect-desc-no-canonical",
                    "rc-imageselect-desc",
                    "fbc-imageselect-message-text",
                )
            ):
                self._desc_depth = 1
                self._desc_chunks = []

    def handle_data(self, data: str) -> None:
        if self._in_token_textarea:
            self._token_chunks.append(data)
        if self._desc_depth > 0 and data.strip():
            self._desc_chunks.append(data.strip())

    def handle_endtag(self, tag: str) -> None:
        tag_l = tag.lower()
        if tag_l == "textarea" and self._in_token_textarea:
            self._in_token_textarea = False
            candidate = "".join(self._token_chunks).strip()
            if candidate and not self.verification_token:
                self.verification_token = candidate
        elif tag_l in {"div", "label", "span"} and self._desc_depth > 0:
            self._desc_depth -= 1
            if self._desc_depth == 0 and self._desc_chunks and not self.prompt_label:
                joined = re.sub(r"\s+", " ", " ".join(self._desc_chunks)).strip()
                if joined:
                    self.prompt_label = joined


def fetch_recaptcha_fallback_challenge(
    site_key: str,
    *,
    referer_url: str,
    fallback_url: str | None = None,
    transport: HttpTransport,
    timeout_seconds: float = 2.5,
) -> dict[str, Any] | None:
    """Fetch a visual challenge image + ``c`` token from Google's HTML fallback when available."""
    key_clean = str(site_key or "").strip()
    if not key_clean:
        return None
    target_url = fallback_url or f"{DEFAULT_RECAPTCHA_FALLBACK_BASE}?k={key_clean}"
    if not _is_safe_http_url(target_url):
        return None
    try:
        fb_resp = transport.request(
            target_url,
            method="GET",
            headers={"Referer": referer_url},
            timeout_seconds=timeout_seconds,
        )
    except UpstreamConnectorError:
        return None
    if fb_resp.status_code != 200 or not fb_resp.body:
        return None

    parser = _RecaptchaFallbackParser()
    parser.feed(fb_resp.text())
    if not parser.fallback_c or not parser.payload_img_src:
        return None

    img_url = urljoin(target_url, parser.payload_img_src)
    if not _is_safe_http_url(img_url):
        return None

    try:
        img_resp = transport.request(
            img_url,
            method="GET",
            headers={"Referer": target_url},
            timeout_seconds=timeout_seconds,
        )
    except UpstreamConnectorError:
        return None
    if img_resp.status_code != 200 or not img_resp.body:
        return None

    sniffed_mime = _sniff_image_mime(img_resp.body, img_resp.headers.get("content-type"))
    if not _is_safe_image_payload(img_resp.body, sniffed_mime):
        return None

    img_b64 = base64.b64encode(img_resp.body).decode("ascii")
    img_data_uri = f"data:{sniffed_mime};base64,{img_b64}"
    prompt = parser.prompt_label or "Resolva o desafio exibido na imagem acima."
    if parser.mode == "tiles" and "quadro" not in prompt.lower() and "índice" not in prompt.lower():
        prompt = f"{prompt} (informe os números dos quadros, ex.: 1,4,7)"

    return {
        "recaptcha_fallback_url": target_url,
        "recaptcha_fallback_c": parser.fallback_c,
        "recaptcha_fallback_mode": parser.mode,
        "upstream_image_url": img_url,
        "image_mime_type": sniffed_mime,
        "image_base64": img_b64,
        "image_data_uri": img_data_uri,
        "prompt_label": prompt,
    }


def _build_fallback_response_pairs(solution: str, mode: str) -> list[tuple[str, str]]:
    cleaned = solution.strip()
    if mode != "tiles":
        return [("response", cleaned)]
    tokens = [tok for tok in re.split(r"[\s,;/-]+", cleaned) if tok]
    if len(tokens) == 1 and tokens[0].isdigit() and len(tokens[0]) > 1:
        tokens = list(tokens[0])
    indices: list[str] = []
    if all(tok.isdigit() for tok in tokens) and tokens:
        nums = [int(tok) for tok in tokens]
        # Convert 1-based human grid numbers (1..9 / 1..16) to 0-based indices when >= 1
        zero_based = [n - 1 for n in nums] if min(nums) >= 1 and "0" not in tokens else nums
        indices = [str(max(0, idx)) for idx in zero_based]
    if not indices:
        return [("response", cleaned)]
    return [("response", idx) for idx in indices]


def exchange_recaptcha_fallback_solution(
    *,
    fallback_url: str,
    fallback_c: str,
    fallback_mode: str = "text",
    solution: str,
    transport: HttpTransport,
    timeout_seconds: float = 3.5,
) -> tuple[str | None, dict[str, Any] | None]:
    """Exchange a popup answer against ``/recaptcha/api/fallback`` for ``g-recaptcha-response``."""
    if not _is_safe_http_url(fallback_url) or not fallback_c or not solution.strip():
        return None, None

    pairs: list[tuple[str, str]] = [
        ("c", fallback_c),
        *_build_fallback_response_pairs(solution, fallback_mode),
    ]
    body_bytes = urlencode(pairs).encode("utf-8")
    fb_resp = transport.request(
        fallback_url,
        method="POST",
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": fallback_url,
        },
        data=body_bytes,
        timeout_seconds=timeout_seconds,
    )
    parser = _RecaptchaFallbackParser()
    parser.feed(fb_resp.text())
    if parser.verification_token:
        return parser.verification_token, None

    if parser.fallback_c and parser.payload_img_src:
        img_url = urljoin(fallback_url, parser.payload_img_src)
        refreshed: dict[str, Any] = {
            "recaptcha_fallback_url": fallback_url,
            "recaptcha_fallback_c": parser.fallback_c,
            "recaptcha_fallback_mode": parser.mode,
            "upstream_image_url": img_url,
            "prompt_label": parser.prompt_label
            or "Resposta incorreta. Resolva a nova imagem exibida neste popup.",
        }
        if _is_safe_http_url(img_url):
            try:
                img_resp = transport.request(
                    img_url,
                    method="GET",
                    headers={"Referer": fallback_url},
                    timeout_seconds=min(timeout_seconds, 2.5),
                )
                if img_resp.status_code == 200 and img_resp.body:
                    sniffed = _sniff_image_mime(
                        img_resp.body, img_resp.headers.get("content-type")
                    )
                    if _is_safe_image_payload(img_resp.body, sniffed):
                        b64 = base64.b64encode(img_resp.body).decode("ascii")
                        refreshed["image_mime_type"] = sniffed
                        refreshed["image_base64"] = b64
                        refreshed["image_data_uri"] = f"data:{sniffed};base64,{b64}"
            except UpstreamConnectorError:
                pass
        return None, refreshed

    return None, {
        "recaptcha_fallback_url": fallback_url,
        "prompt_label": "Resposta não validada. Tente novamente diretamente neste popup.",
    }


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

    def remaining_ttl_seconds(self) -> int:
        """Compute remaining lifetime in whole seconds from ``expires_at``."""
        expires_dt = _parse_utc(self.expires_at)
        if expires_dt is None:
            return max(0, int(self.ttl_seconds))
        delta = (expires_dt - _utc_now()).total_seconds()
        return max(0, min(int(self.ttl_seconds), int(delta + 0.999)))

    def to_public_payload(self) -> dict[str, Any]:
        """Serialize challenge metadata safe for compact frontend popup rendering & resumption."""
        expected_param = "captcha_token"
        accepted_params = ["captcha_token", "captcha_solution"]
        session_init = bool(self.cookie_jar or self.session_cookie)
        expires_in = self.remaining_ttl_seconds()
        data_uri = self.challenge_data.get("image_data_uri") or self.challenge_data.get(
            "image_data_url"
        )
        prompt_text = self.challenge_data.get("prompt_label") or (
            "Digite os caracteres exibidos na imagem de segurança."
            if data_uri or self.provider == "image"
            else "Informe a resposta do desafio de segurança exibido neste popup."
        )
        image_endpoint = (
            f"/api/v1/captcha/challenges/{self.challenge_id}/image"
            if self.challenge_data.get("image_base64")
            else None
        )
        popup_descriptor: dict[str, Any] = {
            "mode": self.provider,
            "challenge_id": self.challenge_id,
            "provider": self.provider,
            "prompt_label": prompt_text,
            "challenge_text": prompt_text,
            "expected_param": expected_param,
            "accepted_params": list(accepted_params),
            "challenge_param": "challenge_id",
            "session_param": "session_cookie",
            "response_field": self.response_field,
            "session_initialized": session_init,
            "captcha_image": data_uri,
            "image_data_url": data_uri,
            "image_data_uri": data_uri,
            "image_base64": self.challenge_data.get("image_base64"),
            "image_mime_type": self.challenge_data.get("image_mime_type"),
            "image_url": self.challenge_data.get("image_url"),
            "image_endpoint": image_endpoint,
            "site_key": self.site_key,
            "form_url": self.challenge_url,
            "challenge_url": self.challenge_url,
            "expires_at": self.expires_at,
            "expires_in_seconds": expires_in,
        }
        public_challenge_data = {
            k: v
            for k, v in self.challenge_data.items()
            if k
            not in {
                "recaptcha_fallback_c",
                "recaptcha_fallback_url",
                "upstream_image_url",
            }
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
            "captcha_image": data_uri,
            "image_data_url": data_uri,
            "image_data_uri": data_uri,
            "image_base64": self.challenge_data.get("image_base64"),
            "image_mime_type": self.challenge_data.get("image_mime_type"),
            "image_url": self.challenge_data.get("image_url"),
            "image_endpoint": image_endpoint,
            "challenge_text": prompt_text,
            "popup": popup_descriptor,
            "challenge_data": public_challenge_data,
            "consulta_payload": self.public_consulta_payload(),
            "resume_endpoint": self.resume_endpoint,
            "resume_method": self.resume_method,
            "resolve_endpoint": self.resolve_endpoint,
            "created_at": self.created_at,
            "expires_at": self.expires_at,
            "expires_in_seconds": expires_in,
            "ttl_seconds": self.ttl_seconds,
            "instructions": list(self.instructions),
        }
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
        public_challenge_data = {
            k: v
            for k, v in self.challenge_data.items()
            if k
            not in {
                "recaptcha_fallback_c",
                "recaptcha_fallback_url",
                "upstream_image_url",
            }
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
            challenge_data=public_challenge_data,
            consulta_payload=self.public_consulta_payload(),
            connector=self.connector,
            operation=self.operation,
            resume_endpoint=self.resume_endpoint,
            resume_method=self.resume_method,
            resolve_endpoint=self.resolve_endpoint,
            expires_at=self.expires_at,
            ttl_seconds=self.ttl_seconds,
            expires_in_seconds=self.remaining_ttl_seconds(),
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
        _ = challenge_url, site_key, callback
        if provider == "image":
            return [
                "1. Visualize a imagem do desafio exibida diretamente neste popup (`image_data_url` / `captcha_image`).",
                "2. Digite os caracteres exibidos na imagem no campo `captcha_token` (ou `captcha_solution`) sem sair do portfólio.",
                f"3. Confirme o envio com `challenge_id`: '{challenge_id}' para '{resume_endpoint}' (ou 'POST /api/v1/captcha/resolve') e conclua a consulta real.",
            ]
        return [
            f"1. Visualize o desafio de segurança ({provider}) apresentado diretamente neste popup.",
            "2. Informe a resposta/token no campo `captcha_token` (ou `captcha_solution`) sem abrir o portal externo.",
            f"3. Reenvie para '{resume_endpoint}' (ou 'POST /api/v1/captcha/resolve') com `challenge_id`: '{challenge_id}' (preservando `session_cookie`) para concluir a consulta real.",
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
        fallback_url: str | None = None,
        extra_challenge_data: dict[str, Any] | None = None,
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

        # When any CAPTCHA image URL is present on the origin portal, fetch its bytes
        # using the exact same session cookie so the frontend popup renders a data: URI.
        if (
            image_url
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

        fallback_meta: dict[str, Any] = dict(extra_challenge_data or {})
        if (
            not image_base64
            and provider == "recaptcha"
            and site_key
            and transport is not None
            and "recaptcha_fallback_c" not in fallback_meta
        ):
            mirrored = fetch_recaptcha_fallback_challenge(
                site_key,
                referer_url=challenge_url,
                fallback_url=fallback_url,
                transport=transport,
                timeout_seconds=min(timeout_seconds, 2.5),
            )
            if mirrored:
                image_mime_type = mirrored.get("image_mime_type")
                image_base64 = mirrored.get("image_base64")
                image_data_uri = mirrored.get("image_data_uri")
                if mirrored.get("prompt_label"):
                    prompt_label = str(mirrored["prompt_label"])
                fallback_meta.update(mirrored)

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

        resolved_prompt = prompt_label or (
            "Digite os caracteres exibidos na imagem de segurança."
            if image_data_uri or provider == "image"
            else f"Informe a resposta do desafio de segurança ({provider}) exibido neste popup."
        )
        challenge_data: dict[str, Any] = {
            **fallback_meta,
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
            "image_data_url": image_data_uri,
            "captcha_image": image_data_uri,
            "prompt_label": resolved_prompt,
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
            fallback_url=detected.fallback_url,
            prompt_label=detected.prompt_label,
            rejected_previous_attempt=was_rejected,
            transport=transport,
            timeout_seconds=timeout_seconds,
        )
        detail_msg = (
            f"A resposta anterior do desafio ({detected.provider}) foi recusada. "
            "Resolva o novo desafio exibido diretamente neste popup."
            if was_rejected
            else (
                f"Esta consulta requer verificação humana ({detected.provider}). "
                "Resolva o desafio exibido diretamente neste popup para concluir a consulta real."
            )
        )
        raise challenge.to_exception(detail_msg)

    def resolve_recaptcha_fallback_if_needed(
        self,
        challenge: CaptchaChallenge,
        solution: str,
        *,
        transport: HttpTransport,
        timeout_seconds: float = 3.5,
        raw_session_cookie: str | None = None,
        instructions: list[str] | None = None,
        extra: dict[str, Any] | None = None,
    ) -> str:
        """Exchange a popup answer against Google's HTML fallback if ``challenge`` uses one."""
        fallback_c = challenge.challenge_data.get("recaptcha_fallback_c")
        fallback_url = challenge.challenge_data.get("recaptcha_fallback_url")
        cleaned = solution.strip()
        # Pre-minted g-recaptcha-response tokens are long (~200+ chars); short answers are
        # direct popup responses to the mirrored fallback visual challenge.
        if not fallback_c or not fallback_url or len(cleaned) >= 120:
            return cleaned

        minted, refreshed = exchange_recaptcha_fallback_solution(
            fallback_url=str(fallback_url),
            fallback_c=str(fallback_c),
            fallback_mode=str(challenge.challenge_data.get("recaptcha_fallback_mode") or "text"),
            solution=cleaned,
            transport=transport,
            timeout_seconds=timeout_seconds,
        )
        if minted:
            return minted

        self.consume_challenge(challenge.challenge_id)
        refreshed_meta = refreshed or {}
        next_challenge = self.issue_challenge(
            connector=challenge.connector,
            operation=challenge.operation,
            provider=challenge.provider,
            site_key=challenge.site_key,
            challenge_url=challenge.challenge_url,
            portal_url=challenge.portal_url,
            action_url=challenge.action_url,
            http_method=challenge.http_method,
            callback=challenge.callback,
            response_field=challenge.response_field,
            cookie_jar=challenge.cookie_jar,
            raw_session_cookie=raw_session_cookie or challenge.session_cookie,
            form_fields=challenge.form_fields,
            consulta_payload=challenge.consulta_payload,
            resume_endpoint=challenge.resume_endpoint,
            resume_method=challenge.resume_method,
            image_base64=refreshed_meta.get("image_base64"),
            image_mime_type=refreshed_meta.get("image_mime_type"),
            image_data_uri=refreshed_meta.get("image_data_uri"),
            fallback_url=str(fallback_url),
            extra_challenge_data=refreshed_meta,
            prompt_label=refreshed_meta.get("prompt_label")
            or "Resposta não validada. Resolva a nova imagem exibida neste popup.",
            rejected_previous_attempt=True,
            instructions=instructions,
            transport=transport,
            timeout_seconds=timeout_seconds,
            ttl_seconds=challenge.ttl_seconds,
        )
        raise next_challenge.to_exception(
            "A resposta informada no popup não validou o desafio de segurança. "
            "Resolva a nova imagem exibida diretamente neste popup.",
            extra=extra,
        )

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

        effective_solution = self.resolve_recaptcha_fallback_if_needed(
            challenge,
            resolved.solution,
            transport=transport,
            timeout_seconds=timeout_seconds,
            raw_session_cookie=resolved.session_cookie,
        )

        payload_fields: dict[str, Any] = dict(extra_params or {})
        payload_fields.update(challenge.form_fields)
        payload_fields[challenge.response_field] = effective_solution

        submit_headers: dict[str, str] = {
            "Referer": challenge.challenge_url,
            "X-Captcha-Token": effective_solution,
            "X-Captcha-Response": effective_solution,
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
