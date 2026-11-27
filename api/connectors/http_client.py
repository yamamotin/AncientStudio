"""Decoupled HTTP client transport with short timeouts, cookies, and response byte caps."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from http.cookiejar import CookieJar
from typing import Any, Protocol
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import HTTPCookieProcessor, Request, build_opener

from api.connectors.errors import UpstreamConnectorError

DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

_CHARSET_RE = re.compile(r"charset\s*=\s*['\"]?([A-Za-z0-9._-]+)", re.IGNORECASE)
_COOKIE_ATTR_NAMES = frozenset(
    {
        "path",
        "domain",
        "expires",
        "max-age",
        "secure",
        "httponly",
        "samesite",
        "priority",
        "partitioned",
        "version",
        "comment",
    }
)


def parse_cookie_string(
    raw_cookie: str | None, *, default_name: str = "JSESSIONID"
) -> dict[str, str]:
    """Parse a raw ``Cookie`` or ``Set-Cookie`` string into a clean ``{name: value}`` map."""
    if not raw_cookie:
        return {}
    cleaned = str(raw_cookie).strip()
    if not cleaned:
        return {}
    if "=" not in cleaned:
        return {default_name: cleaned}

    jar: dict[str, str] = {}
    for line in cleaned.splitlines():
        for part in line.split(";"):
            token = part.strip()
            if "=" not in token:
                continue
            key, val = token.split("=", 1)
            k_clean = key.strip()
            if not k_clean or k_clean.lower() in _COOKIE_ATTR_NAMES:
                continue
            jar[k_clean] = val.strip()
    return jar


def merge_cookie_header(
    jar: dict[str, str] | None,
    raw_cookie: str | None = None,
    *,
    default_name: str = "JSESSIONID",
) -> str:
    """Merge a cookie dictionary and optional caller cookie string into a ``Cookie`` header."""
    merged: dict[str, str] = dict(jar or {})
    merged.update(parse_cookie_string(raw_cookie, default_name=default_name))
    return "; ".join(f"{k}={v}" for k, v in merged.items() if k and v is not None)


@dataclass(frozen=True)
class HttpResponse:
    """Normalized HTTP response returned by a connector transport."""

    url: str
    status_code: int
    headers: dict[str, str]
    body: bytes

    def text(self, encoding: str | None = None) -> str:
        """Decode response body honoring explicit, Content-Type, or HTML meta charsets."""
        if encoding:
            return self.body.decode(encoding, errors="replace")

        content_type = self.headers.get("content-type", "")
        match = _CHARSET_RE.search(content_type)
        if match:
            detected = match.group(1).strip()
            try:
                return self.body.decode(detected, errors="replace")
            except LookupError:
                pass

        head_ascii = self.body[:2048].decode("ascii", errors="ignore")
        meta_match = _CHARSET_RE.search(head_ascii)
        if meta_match:
            detected_meta = meta_match.group(1).strip()
            try:
                return self.body.decode(detected_meta, errors="replace")
            except LookupError:
                pass

        try:
            return self.body.decode("utf-8")
        except UnicodeDecodeError:
            return self.body.decode("iso-8859-1", errors="replace")

    def cookies(self) -> dict[str, str]:
        """Extract cookie key-value pairs emitted via ``Set-Cookie`` headers."""
        raw_header = self.headers.get("set-cookie", "")
        if not raw_header:
            return {}
        jar: dict[str, str] = {}
        for segment in raw_header.split("\n"):
            first_pair = segment.split(";", 1)[0].strip()
            if "=" in first_pair:
                key, val = first_pair.split("=", 1)
                if key.strip():
                    jar[key.strip()] = val.strip()
        return jar

    def json(self) -> Any:
        try:
            return json.loads(self.body.decode("utf-8-sig"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise UpstreamConnectorError(
                f"Resposta JSON inválida recebida de {self.url}: {exc}",
                http_response=self,
            ) from exc


class HttpTransport(Protocol):
    """Protocol allowing unit/integration tests to inject deterministic mock transports."""

    def request(
        self,
        url: str,
        *,
        method: str = "GET",
        params: dict[str, Any] | None = None,
        headers: dict[str, str] | None = None,
        data: bytes | None = None,
        timeout_seconds: float | None = None,
    ) -> HttpResponse: ...


def build_url(base_url: str, params: dict[str, Any] | None = None) -> str:
    """Append URL-encoded query parameters while preserving OData ``$`` and pipe keys."""
    if not params:
        return base_url
    filtered = {k: v for k, v in params.items() if v is not None}
    if not filtered:
        return base_url
    query = urlencode(filtered, safe="$|[]")
    sep = "&" if "?" in base_url else "?"
    return f"{base_url}{sep}{query}"


class UrllibHttpTransport:
    """Zero-dependency HTTP transport with short timeouts, Set-Cookie capture, and byte cap."""

    def __init__(
        self,
        *,
        default_timeout_seconds: float = 4.5,
        max_response_bytes: int = 8 * 1024 * 1024,
        user_agent: str = DEFAULT_USER_AGENT,
    ) -> None:
        self._default_timeout = max(0.2, float(default_timeout_seconds))
        self._max_bytes = max(4096, int(max_response_bytes))
        self._user_agent = user_agent

    def request(
        self,
        url: str,
        *,
        method: str = "GET",
        params: dict[str, Any] | None = None,
        headers: dict[str, str] | None = None,
        data: bytes | None = None,
        timeout_seconds: float | None = None,
    ) -> HttpResponse:
        full_url = build_url(url, params)
        timeout = (
            self._default_timeout
            if timeout_seconds is None
            else max(0.2, float(timeout_seconds))
        )
        req_headers = {
            "User-Agent": self._user_agent,
            "Accept": "application/json, text/html;q=0.9, */*;q=0.8",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.7,en;q=0.6",
        }
        if headers:
            req_headers.update(headers)

        cookie_jar = CookieJar()
        opener = build_opener(HTTPCookieProcessor(cookie_jar))
        req = Request(full_url, data=data, headers=req_headers, method=method.upper())
        try:
            with opener.open(req, timeout=timeout) as resp:
                chunks: list[bytes] = []
                total = 0
                while True:
                    chunk = resp.read(65536)
                    if not chunk:
                        break
                    total += len(chunk)
                    if total > self._max_bytes:
                        raise UpstreamConnectorError(
                            f"Resposta de {full_url} excedeu o limite de {self._max_bytes} bytes."
                        )
                    chunks.append(chunk)

                resp_headers = {k.lower(): v for k, v in resp.headers.items()}
                cookie_lines: list[str] = [f"{c.name}={c.value}" for c in cookie_jar]
                get_all = getattr(resp.headers, "get_all", None)
                if callable(get_all):
                    all_cookies = get_all("Set-Cookie")
                    if all_cookies:
                        cookie_lines.extend(all_cookies)
                if cookie_lines:
                    resp_headers["set-cookie"] = "\n".join(cookie_lines)

                final_url = getattr(resp, "geturl", lambda: full_url)() or full_url
                return HttpResponse(
                    url=final_url,
                    status_code=int(resp.status),
                    headers=resp_headers,
                    body=b"".join(chunks),
                )
        except HTTPError as exc:
            err_body = b""
            err_headers: dict[str, str] = {}
            try:
                cookie_lines = [f"{c.name}={c.value}" for c in cookie_jar]
                if exc.headers is not None:
                    err_headers = {k.lower(): v for k, v in exc.headers.items()}
                    get_all = getattr(exc.headers, "get_all", None)
                    if callable(get_all):
                        all_cookies = get_all("Set-Cookie")
                        if all_cookies:
                            cookie_lines.extend(all_cookies)
                if cookie_lines:
                    err_headers["set-cookie"] = "\n".join(cookie_lines)
                err_body = exc.read(131072) or b""
            except Exception:
                err_body = b""
            err_response = HttpResponse(
                url=getattr(exc, "url", full_url) or full_url,
                status_code=int(exc.code),
                headers=err_headers,
                body=err_body,
            )
            raise UpstreamConnectorError(
                f"HTTP {exc.code} ao consultar fonte pública {full_url}.",
                extra={"status_code": exc.code, "url": full_url},
                http_response=err_response,
            ) from exc
        except (URLError, TimeoutError, OSError) as exc:
            raise UpstreamConnectorError(
                f"Falha de rede/timeout ({timeout:.1f}s) ao consultar {full_url}: {exc}",
                extra={"url": full_url},
            ) from exc
