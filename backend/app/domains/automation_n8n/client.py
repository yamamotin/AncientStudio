"""HTTP client for real n8n webhook triggers and REST execution queries."""

from __future__ import annotations

from typing import Any

import httpx
from app.core.config import Settings
from app.core.errors import ResourceNotFoundError, UpstreamServiceError
from app.core.security import sanitize_identifier
from app.domains.automation_n8n.schemas import (
    WorkflowExecutionStatus,
    WorkflowRunOut,
    WorkflowStatusOut,
)

_VALID_STATUSES = {"queued", "running", "completed", "failed", "unknown"}
_STATUS_ALIASES = {
    "success": "completed",
    "error": "failed",
    "failed": "failed",
    "waiting": "queued",
    "new": "queued",
}


def normalize_n8n_status(value: Any) -> WorkflowExecutionStatus:
    candidate = str(value or "unknown").lower()
    candidate = _STATUS_ALIASES.get(candidate, candidate)
    if candidate in _VALID_STATUSES:
        return candidate  # type: ignore[return-value]
    return "unknown"


class N8NClient:
    """Calls n8n with authenticated webhooks and the REST execution API."""

    def __init__(
        self,
        settings: Settings,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._settings = settings
        self._transport = transport

    def _client(self) -> httpx.AsyncClient:
        kwargs: dict[str, Any] = {"timeout": self._settings.n8n_timeout_seconds}
        if self._transport is not None:
            kwargs["transport"] = self._transport
        return httpx.AsyncClient(**kwargs)

    async def trigger(
        self,
        workflow_id: str,
        body: dict[str, Any],
        correlation_id: str,
    ) -> WorkflowRunOut:
        safe_workflow_id = sanitize_identifier(workflow_id, field_name="workflow_id")
        url = f"{self._settings.n8n_webhook_base_url}/{safe_workflow_id}"
        headers = {
            "X-N8N-Webhook-Token": self._settings.n8n_webhook_token,
            "X-Correlation-ID": correlation_id,
            "Content-Type": "application/json",
        }
        try:
            async with self._client() as client:
                response = await client.post(url, json=body, headers=headers)
        except httpx.HTTPError as exc:
            raise UpstreamServiceError(
                "Could not reach the n8n webhook.",
                title="n8n unavailable",
            ) from exc

        if response.status_code >= 400:
            raise UpstreamServiceError(
                f"n8n answered with HTTP {response.status_code}.",
                title="n8n webhook rejected the request",
                extra={"upstream_status": response.status_code},
            )

        try:
            data = response.json()
        except ValueError:
            data = {}

        execution_id = str(data.get("executionId") or data.get("id") or correlation_id)
        return WorkflowRunOut(
            execution_id=execution_id,
            status=normalize_n8n_status(data.get("status") or "queued"),
            workflow_id=safe_workflow_id,
            correlation_id=correlation_id,
        )

    async def get_execution(self, execution_id: str) -> WorkflowStatusOut:
        safe_execution_id = sanitize_identifier(execution_id, field_name="execution_id")
        url = f"{self._settings.n8n_base_url}/rest/executions/{safe_execution_id}"
        headers = {"X-N8N-API-KEY": self._settings.n8n_api_token}
        try:
            async with self._client() as client:
                response = await client.get(url, headers=headers)
        except httpx.HTTPError as exc:
            raise UpstreamServiceError(
                "Could not reach the n8n REST API.",
                title="n8n unavailable",
            ) from exc

        if response.status_code == 404:
            raise ResourceNotFoundError(
                f"No n8n execution named {safe_execution_id}.",
                title="Execution not found",
            )
        if response.status_code >= 400:
            raise UpstreamServiceError(
                f"n8n answered with HTTP {response.status_code}.",
                title="n8n execution query failed",
                extra={"upstream_status": response.status_code},
            )

        try:
            data = response.json()
        except ValueError:
            data = {}

        return WorkflowStatusOut(
            execution_id=safe_execution_id,
            status=normalize_n8n_status(data.get("status")),
            finished=bool(data.get("finished", False)),
            started_at=data.get("startedAt"),
            ended_at=data.get("stoppedAt") or data.get("endedAt"),
        )
