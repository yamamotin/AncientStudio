"""Decoupled HTTP client transport with short timeouts and response byte caps."""

from __future__ import annotations

from dataclasses import dataclass
import json
import socket
from typing import Any, Protocol
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from api.connectors.errors import UpstreamConnectorError

DEFAULT_USER_AGENT = "AncientStudio-PublicConnectors/1.0 (+https://github.com/yamamotin/AncientStudio)"


@dataclass(frozen=True)
class HttpResponse:
    """Normalized HTTP response returned by a connector transport."""

    url: str
    status_code: int
    headers: dict[str, str]
    body: bytes

    def text(self, encoding: str = "utf-8") -> str:
        return self.body.decode(encoding, errors="replace")

    def json(self) -> Any:
        try:
            return json.loads(self.body.decode("utf-8-sig"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise UpstreamConnectorError(
                f"Resposta JSON inválida recebida de {self.url}: {exc}"
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
    """Append URL-encoded query parameters while preserving OData ``$`` keys."""
    if not params:
        return base_url
    filtered = {k: v for k, v in params.items() if v is not None}
    if not filtered:
        return base_url
    query = urlencode(filtered, safe="$")
    sep = "&" if "?" in base_url else "?"
    return f"{base_url}{sep}{query}"


class UrllibHttpTransport:
    """Zero-dependency HTTP transport with short timeouts and strict streaming byte cap."""

    def __init__(
        self,
        *,
        default_timeout_seconds: float = 3.5,
        max_response_bytes: int = 4 * 1024 * 1024,
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
        }
        if headers:
            req_headers.update(headers)

        req = Request(full_url, data=data, headers=req_headers, method=method.upper())
        try:
            with urlopen(req, timeout=timeout) as resp:
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
                return HttpResponse(
                    url=full_url,
                    status_code=int(resp.status),
                    headers=resp_headers,
                    body=b"".join(chunks),
                )
        except HTTPError as exc:
            raise UpstreamConnectorError(
                f"HTTP {exc.code} ao consultar fonte pública {full_url}.",
                extra={"status_code": exc.code, "url": full_url},
            ) from exc
        except (URLError, TimeoutError, socket.timeout, OSError) as exc:
            raise UpstreamConnectorError(
                f"Falha de rede/timeout ({timeout:.1f}s) ao consultar {full_url}: {exc}",
                extra={"url": full_url},
            ) from exc
