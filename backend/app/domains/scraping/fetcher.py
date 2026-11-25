"""Async HTTP page fetcher with payload limits, retries, timeouts, and redirect SSRF guards."""

from __future__ import annotations

import asyncio
from urllib.parse import urljoin

import httpx
from app.core.config import Settings
from app.core.errors import DomainValidationError, UpstreamServiceError
from app.core.security import validate_public_http_url
from app.domains.scraping.contracts import RawHttpDocument

_REDIRECT_STATUSES = frozenset({301, 302, 303, 307, 308})
_TRANSIENT_STATUSES = frozenset({429, 502, 503, 504})
_ALLOWED_CONTENT_TYPES = (
    "text/html",
    "application/xhtml+xml",
    "application/xml",
    "text/xml",
    "text/plain",
    "application/json",
    "application/rss+xml",
    "application/atom+xml",
)


def _is_allowed_content_type(header_value: str | None) -> bool:
    if not header_value:
        return True
    media_type = header_value.split(";", 1)[0].strip().lower()
    return media_type in _ALLOWED_CONTENT_TYPES


class HttpxPageFetcher:
    """Production ``PageFetcherPort`` built on ``httpx.AsyncClient`` with SSRF-safe redirects."""

    def __init__(
        self,
        settings: Settings,
        *,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._settings = settings
        self._transport = transport

    def _build_client(self, timeout_seconds: float) -> httpx.AsyncClient:
        kwargs: dict[str, object] = {
            "timeout": timeout_seconds,
            "follow_redirects": False,
            "headers": {
                "User-Agent": self._settings.scraper_user_agent,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8",
            },
        }
        if self._transport is not None:
            kwargs["transport"] = self._transport
        return httpx.AsyncClient(**kwargs)  # type: ignore[arg-type]

    async def _fetch_single_hop_streamed(
        self,
        client: httpx.AsyncClient,
        url: str,
    ) -> tuple[int, dict[str, str], bytes]:
        max_bytes = self._settings.scraper_max_response_bytes
        async with client.stream("GET", url) as response:
            status = response.status_code
            headers = {k.lower(): v for k, v in response.headers.items()}
            if status in _REDIRECT_STATUSES:
                return status, headers, b""

            if status not in _TRANSIENT_STATUSES and status < 400:
                content_type = headers.get("content-type")
                if not _is_allowed_content_type(content_type):
                    raise DomainValidationError(
                        f"Unsupported scrape Content-Type '{content_type}'."
                    )

                declared_len = headers.get("content-length")
                if declared_len and declared_len.isdigit() and int(declared_len) > max_bytes:
                    raise DomainValidationError(
                        f"Upstream Content-Length ({declared_len} bytes) "
                        f"exceeds limit ({max_bytes} bytes)."
                    )

            chunks: list[bytes] = []
            total = 0
            async for chunk in response.aiter_bytes():
                total += len(chunk)
                if total > max_bytes:
                    raise DomainValidationError(
                        f"Streamed response exceeded maximum payload limit ({max_bytes} bytes)."
                    )
                chunks.append(chunk)
            return status, headers, b"".join(chunks)

    async def _request_with_retries(
        self,
        client: httpx.AsyncClient,
        url: str,
    ) -> tuple[int, dict[str, str], bytes]:
        max_retries = self._settings.scraper_max_retries
        base_backoff = self._settings.scraper_retry_backoff_seconds

        last_exc: Exception | None = None
        for attempt in range(max_retries + 1):
            try:
                status, headers, raw_bytes = await self._fetch_single_hop_streamed(client, url)
            except httpx.HTTPError as exc:
                last_exc = exc
                if attempt < max_retries:
                    if base_backoff > 0:
                        await asyncio.sleep(base_backoff * (2**attempt))
                    continue
                raise UpstreamServiceError(
                    f"Failed to fetch target URL after {attempt + 1} attempt(s): {exc}",
                    title="Scraper upstream unreachable",
                ) from exc

            if status in _TRANSIENT_STATUSES and attempt < max_retries:
                if base_backoff > 0:
                    await asyncio.sleep(base_backoff * (2**attempt))
                continue

            if status >= 400:
                raise UpstreamServiceError(
                    f"Target URL answered with HTTP {status}.",
                    title="Scraper upstream HTTP error",
                    extra={"upstream_status": status, "url": url},
                )

            return status, headers, raw_bytes

        raise UpstreamServiceError(
            f"Scraper failed unexpectedly: {last_exc}",
            title="Scraper upstream unreachable",
        )

    async def fetch(self, url: str, *, timeout_seconds: float) -> RawHttpDocument:
        current_url = validate_public_http_url(
            url,
            allowed_hosts=self._settings.scraper_allowed_hosts,
        )
        max_redirects = self._settings.scraper_max_redirects

        async with self._build_client(timeout_seconds) as client:
            for hop in range(max_redirects + 1):
                status, headers, raw_bytes = await self._request_with_retries(
                    client, current_url
                )
                if status in _REDIRECT_STATUSES:
                    if hop >= max_redirects:
                        raise DomainValidationError(
                            f"Maximum redirect hops ({max_redirects}) exceeded."
                        )
                    location = headers.get("location", "").strip()
                    if not location:
                        raise UpstreamServiceError(
                            "Upstream redirect response omitted Location header.",
                            title="Invalid upstream redirect",
                        )
                    resolved_next = urljoin(current_url, location)
                    current_url = validate_public_http_url(
                        resolved_next,
                        allowed_hosts=self._settings.scraper_allowed_hosts,
                    )
                    continue

                text = raw_bytes.decode("utf-8", errors="replace")
                return RawHttpDocument(
                    requested_url=url,
                    final_url=current_url,
                    status_code=status,
                    content_type=headers.get("content-type"),
                    body_text=text,
                )

        raise DomainValidationError(f"Maximum redirect hops ({max_redirects}) exceeded.")
