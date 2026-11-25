"""Domain service for n8n workflow catalog inspection and async/direct execution."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from app.domains.automation_n8n.client import N8NClient
from app.domains.automation_n8n.schemas import (
    WorkflowCatalogItem,
    WorkflowRunOut,
    WorkflowStatusOut,
)
from app.queue.base import JobQueue
from app.queue.models import JobEnvelope

N8N_TRIGGER_TOPIC = "automation.n8n.trigger"
DEFAULT_WORKFLOWS_DIR = (
    Path(__file__).resolve().parents[4] / "infra" / "n8n" / "workflows"
)


class N8NAutomationService:
    """Coordinates n8n catalog discovery, synchronous triggers, and queued triggers."""

    def __init__(
        self,
        client: N8NClient,
        *,
        queue: JobQueue | None = None,
        workflows_dir: Path = DEFAULT_WORKFLOWS_DIR,
    ) -> None:
        self._client = client
        self._queue = queue
        self._workflows_dir = workflows_dir

    def list_catalog(self) -> list[WorkflowCatalogItem]:
        """Inspect real versioned n8n workflow JSON exports on disk."""
        if not self._workflows_dir.is_dir():
            return []

        catalog: list[WorkflowCatalogItem] = []
        for path in sorted(self._workflows_dir.glob("*.json")):
            try:
                raw = json.loads(path.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError):
                continue

            nodes = raw.get("nodes") if isinstance(raw.get("nodes"), list) else []
            webhook_path: str | None = None
            for node in nodes:
                if isinstance(node, dict) and "webhook" in str(node.get("type", "")).lower():
                    params = node.get("parameters")
                    if isinstance(params, dict) and isinstance(params.get("path"), str):
                        webhook_path = params["path"]
                        break

            catalog.append(
                WorkflowCatalogItem(
                    workflow_id=path.stem,
                    name=str(raw.get("name") or path.stem),
                    active=bool(raw.get("active", False)),
                    webhook_path=webhook_path,
                    node_count=len(nodes),
                )
            )
        return catalog

    async def trigger_now(
        self,
        workflow_id: str,
        payload: dict[str, Any],
        correlation_id: str,
    ) -> WorkflowRunOut:
        return await self._client.trigger(workflow_id, payload, correlation_id)

    async def get_status(self, execution_id: str) -> WorkflowStatusOut:
        return await self._client.get_execution(execution_id)

    async def enqueue_trigger(
        self,
        workflow_id: str,
        payload: dict[str, Any],
        *,
        correlation_id: str,
        idempotency_key: str | None = None,
    ) -> JobEnvelope:
        if self._queue is None:
            raise RuntimeError("JobQueue is required for asynchronous workflow triggers.")
        return await self._queue.enqueue(
            N8N_TRIGGER_TOPIC,
            {"workflow_id": workflow_id, "payload": payload},
            correlation_id=correlation_id,
            idempotency_key=idempotency_key,
        )
