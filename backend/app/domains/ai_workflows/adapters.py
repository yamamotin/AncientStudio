"""Real OpenAI-compatible HTTP adapter implementing ``StructuredInferencePort``."""

from __future__ import annotations

import json
import re
from typing import Any

import httpx
from app.core.config import Settings
from app.core.errors import ServiceUnavailableError, UpstreamServiceError

_CODE_FENCE_RE = re.compile(r"^```(?:json)?\s*|\s*```$", re.IGNORECASE)


def _parse_json_object(raw_content: str) -> dict[str, Any]:
    cleaned = _CODE_FENCE_RE.sub("", raw_content.strip()).strip()
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise UpstreamServiceError(
            "AI inference provider returned non-JSON content.",
            title="AI provider invalid JSON",
        ) from exc

    if not isinstance(parsed, dict):
        raise UpstreamServiceError(
            "AI inference provider did not return a JSON object.",
            title="AI provider invalid JSON",
        )
    return parsed


class OpenAICompatibleInferenceAdapter:
    """Calls OpenAI-compatible ``/chat/completions`` endpoints (OpenAI, vLLM, OpenShift AI)."""

    provider_name = "openai-compatible"

    def __init__(
        self,
        settings: Settings,
        *,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._settings = settings
        self._transport = transport

    def _client(self, timeout_seconds: float) -> httpx.AsyncClient:
        kwargs: dict[str, Any] = {"timeout": timeout_seconds}
        if self._transport is not None:
            kwargs["transport"] = self._transport
        return httpx.AsyncClient(**kwargs)

    async def generate_structured(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        response_schema: dict[str, Any],
        timeout_seconds: float = 15.0,
    ) -> dict[str, Any]:
        api_key = (self._settings.ai_provider_api_key or "").strip()
        if not api_key:
            raise ServiceUnavailableError(
                "AI_PROVIDER_API_KEY is not configured for structured inference execution."
            )

        url = f"{self._settings.ai_provider_base_url}/chat/completions"
        schema_hint = json.dumps(response_schema, ensure_ascii=False)
        enriched_system = (
            f"{system_prompt.strip()}\n"
            f"Respond strictly with a valid JSON object matching this JSON Schema: {schema_hint}"
        )

        request_body = {
            "model": self._settings.ai_provider_model,
            "temperature": 0.1,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": enriched_system},
                {"role": "user", "content": user_prompt},
            ],
        }
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with self._client(timeout_seconds) as client:
                response = await client.post(url, json=request_body, headers=headers)
        except httpx.HTTPError as exc:
            raise UpstreamServiceError(
                "Could not reach the configured AI inference endpoint.",
                title="AI provider unavailable",
            ) from exc

        if response.status_code >= 400:
            raise UpstreamServiceError(
                f"AI inference endpoint answered with HTTP {response.status_code}.",
                title="AI provider error",
                extra={"upstream_status": response.status_code},
            )

        try:
            payload = response.json()
            choices = payload.get("choices") or []
            message = choices[0]["message"]
            content = str(message["content"])
        except (ValueError, KeyError, IndexError, TypeError) as exc:
            raise UpstreamServiceError(
                "AI inference response lacked a valid choices[0].message.content payload.",
                title="AI provider malformed response",
            ) from exc

        return _parse_json_object(content)
