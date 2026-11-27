"""Async HTTP page fetcher with payload limits, retries, timeouts, and redirect SSRF guards."""

from __future__ import annotations

import asyncio
from urllib.parse import urljoin

import httpx
from api.connectors.captcha import detect_captcha_in_html
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

    def _build_client(
        self,
        timeout_seconds: float,
        *,
        extra_headers: dict[str, str] | None = None,
        cookies: dict[str, str] | None = None,
    ) -> httpx.AsyncClient:
        merged_headers: dict[str, str] = {
            "User-Agent": self._settings.scraper_user_agent,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8",
        }
        if extra_headers:
            merged_headers.update(extra_headers)
        kwargs: dict[str, object] = {
            "timeout": timeout_seconds,
            "follow_redirects": False,
            "headers": merged_headers,
        }
        if cookies:
            kwargs["cookies"] = cookies
        if self._transport is not None:
            kwargs["transport"] = self._transport
        return httpx.AsyncClient(**kwargs)  # type: ignore[arg-type]

    async def _fetch_single_hop_streamed(
        self,
        client: httpx.AsyncClient,
        url: str,
        *,
        method: str = "GET",
        form_data: dict[str, str] | None = None,
    ) -> tuple[int, dict[str, str], bytes, dict[str, str]]:
        max_bytes = self._settings.scraper_max_response_bytes
        req_kwargs: dict[str, object] = {}
        if form_data and method.upper() == "POST":
            req_kwargs["data"] = form_data
        stream_ctx = client.stream(
            method.upper(), url, **req_kwargs  # type: ignore[arg-type]
        )
        async with stream_ctx as response:
            status = response.status_code
            headers = {k.lower(): v for k, v in response.headers.items()}
            resp_cookies = {str(k): str(v) for k, v in response.cookies.items()}
            if status in _REDIRECT_STATUSES:
                return status, headers, b"", resp_cookies

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
            return status, headers, b"".join(chunks), resp_cookies

    async def _request_with_retries(
        self,
        client: httpx.AsyncClient,
        url: str,
        *,
        method: str = "GET",
        form_data: dict[str, str] | None = None,
        allow_captcha_pages: bool = False,
    ) -> tuple[int, dict[str, str], bytes, dict[str, str]]:
        max_retries = self._settings.scraper_max_retries
        base_backoff = self._settings.scraper_retry_backoff_seconds

        last_exc: Exception | None = None
        for attempt in range(max_retries + 1):
            try:
                status, headers, raw_bytes, resp_cookies = (
                    await self._fetch_single_hop_streamed(
                        client,
                        url,
                        method=method,
                        form_data=form_data,
                    )
                )
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

            if allow_captcha_pages and status in {403, 429} and raw_bytes:
                decoded_probe = raw_bytes.decode("utf-8", errors="replace")
                if detect_captcha_in_html(decoded_probe, base_url=url).detected:
                    return status, headers, raw_bytes, resp_cookies

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

            return status, headers, raw_bytes, resp_cookies

        raise UpstreamServiceError(
            f"Scraper failed unexpectedly: {last_exc}",
            title="Scraper upstream unreachable",
        )

    async def fetch(
        self,
        url: str,
        *,
        timeout_seconds: float,
        method: str = "GET",
        headers: dict[str, str] | None = None,
        form_data: dict[str, str] | None = None,
        cookies: dict[str, str] | None = None,
        allow_captcha_pages: bool = False,
    ) -> RawHttpDocument:
        current_url = validate_public_http_url(
            url,
            allowed_hosts=self._settings.scraper_allowed_hosts,
        )
        max_redirects = self._settings.scraper_max_redirects
        active_method = method.upper().strip() or "GET"
        active_form = dict(form_data) if form_data else None
        collected_cookies: dict[str, str] = dict(cookies or {})

        async with self._build_client(
            timeout_seconds,
            extra_headers=headers,
            cookies=collected_cookies or None,
        ) as client:
            for hop in range(max_redirects + 1):
                status, resp_headers, raw_bytes, hop_cookies = (
                    await self._request_with_retries(
                        client,
                        current_url,
                        method=active_method,
                        form_data=active_form,
                        allow_captcha_pages=allow_captcha_pages,
                    )
                )
                collected_cookies.update(hop_cookies)
                if status in _REDIRECT_STATUSES:
                    if hop >= max_redirects:
                        raise DomainValidationError(
                            f"Maximum redirect hops ({max_redirects}) exceeded."
                        )
                    location = resp_headers.get("location", "").strip()
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
                    if status in {301, 302, 303}:
                        active_method = "GET"
                        active_form = None
                    continue

                text = raw_bytes.decode("utf-8", errors="replace")
                return RawHttpDocument(
                    requested_url=url,
                    final_url=current_url,
                    status_code=status,
                    content_type=resp_headers.get("content-type"),
                    body_text=text,
                    cookies=collected_cookies,
                )

        raise DomainValidationError(f"Maximum redirect hops ({max_redirects}) exceeded.")

    async def fetch_binary(
        self,
        url: str,
        *,
        timeout_seconds: float = 10.0,
        headers: dict[str, str] | None = None,
        cookies: dict[str, str] | None = None,
    ) -> tuple[bytes, str]:
        """Fetch session-bound binary assets (such as CAPTCHA images) with SSRF checks."""
        safe_url = validate_public_http_url(
            url,
            allowed_hosts=self._settings.scraper_allowed_hosts,
        )
        max_bytes = min(self._settings.scraper_max_response_bytes, 1_048_576)
        async with self._build_client(
            timeout_seconds,
            extra_headers=headers,
            cookies=cookies,
        ) as client:
            resp = await client.get(safe_url)
            ctype = (
                resp.headers.get("content-type", "image/png").split(";", 1)[0].strip()
                or "image/png"
            )
            return resp.content[:max_bytes], ctype
