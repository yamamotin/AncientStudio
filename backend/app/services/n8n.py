"""HTTP client for real n8n webhook triggers and execution queries."""

from __future__ import annotations

from typing import Any

import httpx
from app.config import Settings
from app.core.errors import Problem
from app.schemas.workflows import WorkflowRunOut, WorkflowStatusOut

_VALID_STATUSES = {"queued", "running", "completed", "failed", "unknown"}
_STATUS_ALIASES = {
    "success": "completed",
    "error": "failed",
    "failed": "failed",
    "waiting": "queued",
    "new": "queued",
}


def _status(value: Any) -> str:
    candidate = str(value or "unknown").lower()
    candidate = _STATUS_ALIASES.get(candidate, candidate)
    return candidate if candidate in _VALID_STATUSES else "unknown"


class N8NClient:
    """Calls n8n with authenticated webhooks and the REST execution API."""

    def __init__(
        self, settings: Settings, transport: httpx.AsyncBaseTransport | None = None
    ) -> None:
        self._settings = settings
        self._transport = transport

    def _client(self) -> httpx.AsyncClient:
        kwargs: dict[str, Any] = {"timeout": self._settings.n8n_timeout_seconds}
        if self._transport is not None:
            kwargs["transport"] = self._transport
        return httpx.AsyncClient(**kwargs)

    async def trigger(
        self, workflow_id: str, body: dict[str, Any], correlation_id: str
    ) -> WorkflowRunOut:
        url = f"{self._settings.n8n_webhook_base_url}/{workflow_id.lstrip('/')}"
        headers = {
            "X-N8N-Webhook-Token": self._settings.n8n_webhook_token,
            "X-Correlation-ID": correlation_id,
            "Content-Type": "application/json",
        }
        try:
            async with self._client() as client:
                response = await client.post(url, json=body, headers=headers)
        except httpx.HTTPError as exc:
            raise Problem(502, "n8n unavailable", "Could not reach the n8n webhook.") from exc

        if response.status_code >= 400:
            raise Problem(
                502,
                "n8n webhook rejected the request",
                f"n8n answered with HTTP {response.status_code}.",
                extra={"upstream_status": response.status_code},
            )

        try:
            data = response.json()
        except ValueError:
            data = {}

        execution_id = str(data.get("executionId") or data.get("id") or correlation_id)
        return WorkflowRunOut(
            execution_id=execution_id,
            status=_status(data.get("status") or "queued"),
            workflow_id=workflow_id,
            correlation_id=correlation_id,
        )

    async def get_execution(self, execution_id: str) -> WorkflowStatusOut:
        url = f"{self._settings.n8n_base_url}/rest/executions/{execution_id}"
        headers = {"X-N8N-API-KEY": self._settings.n8n_api_token}
        try:
            async with self._client() as client:
                response = await client.get(url, headers=headers)
        except httpx.HTTPError as exc:
            raise Problem(502, "n8n unavailable", "Could not reach the n8n REST API.") from exc

        if response.status_code == 404:
            raise Problem(404, "Execution not found", f"No n8n execution named {execution_id}.")
        if response.status_code >= 400:
            raise Problem(
                502,
                "n8n execution query failed",
                f"n8n answered with HTTP {response.status_code}.",
                extra={"upstream_status": response.status_code},
            )

        try:
            data = response.json()
        except ValueError:
            data = {}

        return WorkflowStatusOut(
            execution_id=execution_id,
            status=_status(data.get("status")),
            finished=bool(data.get("finished", False)),
            started_at=data.get("startedAt"),
            ended_at=data.get("stoppedAt") or data.get("endedAt"),
        )
