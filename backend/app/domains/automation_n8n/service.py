"""Domain service for n8n catalog, EventBus automations, and HMAC webhook callbacks."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from app.cache.base import CacheBackend
from app.cache.idempotency import IdempotencyStore
from app.core.errors import DomainValidationError
from app.core.security import (
    fingerprint,
    sanitize_identifier,
    sha256_hex,
    verify_hmac_signature,
)
from app.core.time import utc_now
from app.domains.automation_n8n.client import N8NClient
from app.domains.automation_n8n.schemas import (
    WebhookCallbackIn,
    WebhookCallbackOut,
    WorkflowCatalogItem,
    WorkflowRunOut,
    WorkflowStatusOut,
)
from app.queue.base import EventBus, JobQueue
from app.queue.models import DomainEvent, JobEnvelope
from pydantic import ValidationError

N8N_TRIGGER_TOPIC = "automation.n8n.trigger"
N8N_CALLBACK_RECEIVED_EVENT = "automation.n8n.callback.received"
DEFAULT_WORKFLOWS_DIR = (
    Path(__file__).resolve().parents[4] / "infra" / "n8n" / "workflows"
)


class N8NAutomationService:
    """Coordinates n8n catalog discovery, EventBus triggers, and signed callbacks."""

    def __init__(
        self,
        client: N8NClient,
        *,
        queue: JobQueue | None = None,
        cache: CacheBackend | None = None,
        idempotency_store: IdempotencyStore | None = None,
        event_bus: EventBus | None = None,
        workflows_dir: Path = DEFAULT_WORKFLOWS_DIR,
    ) -> None:
        self._client = client
        self._queue = queue
        self._cache = cache
        self._idempotency_store = idempotency_store
        self._event_bus = event_bus
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
                if (
                    isinstance(node, dict)
                    and "webhook" in str(node.get("type", "")).lower()
                ):
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
        safe_id = sanitize_identifier(execution_id, field_name="execution_id")
        if self._cache is not None:
            cached = self._cache.get(f"n8n:execution:{safe_id}")
            if isinstance(cached, WorkflowStatusOut):
                return cached
        return await self._client.get_execution(safe_id)

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
        safe_workflow_id = sanitize_identifier(workflow_id, field_name="workflow_id")
        return await self._queue.enqueue(
            N8N_TRIGGER_TOPIC,
            {"workflow_id": safe_workflow_id, "payload": payload},
            correlation_id=correlation_id,
            idempotency_key=idempotency_key,
        )

    def register_event_subscriptions(self, event_bus: EventBus) -> None:
        """Bridge domain events from ``EventBus`` into deduplicated n8n workflow jobs."""

        async def on_scrape_extracted(event: DomainEvent) -> None:
            await self.enqueue_trigger(
                "scraping-postprocess",
                dict(event.payload),
                correlation_id=event.correlation_id,
                idempotency_key=f"evt-{event.event_id}",
            )

        async def on_ai_workflow_completed(event: DomainEvent) -> None:
            if not event.payload.get("requires_alert"):
                return
            await self.enqueue_trigger(
                "ai-anomaly-alert",
                dict(event.payload),
                correlation_id=event.correlation_id,
                idempotency_key=f"evt-{event.event_id}",
            )

        async def on_invoice_accepted(event: DomainEvent) -> None:
            await self.enqueue_trigger(
                "invoice-enrichment",
                dict(event.payload),
                correlation_id=event.correlation_id,
                idempotency_key=f"evt-{event.event_id}",
            )

        event_bus.subscribe("scraping.document.extracted", on_scrape_extracted)
        event_bus.subscribe("ai_workflows.run.completed", on_ai_workflow_completed)
        event_bus.subscribe("gateway.invoice.accepted", on_invoice_accepted)

    async def process_webhook_callback(
        self,
        workflow_id: str,
        raw_body: bytes,
        *,
        signature: str,
        timestamp: str,
        secret: str,
        max_age_seconds: int,
        correlation_id: str,
        idempotency_key: str | None = None,
    ) -> tuple[WebhookCallbackOut, bool]:
        """Verify HMAC signature on inbound n8n webhook callback and persist execution status."""
        safe_workflow_id = sanitize_identifier(workflow_id, field_name="workflow_id")
        verify_hmac_signature(
            body=raw_body,
            timestamp=timestamp,
            signature=signature,
            secret=secret,
            max_age_seconds=max_age_seconds,
        )

        try:
            decoded = json.loads(raw_body)
        except (json.JSONDecodeError, UnicodeDecodeError) as exc:
            raise DomainValidationError("Callback body must be valid UTF-8 JSON.") from exc

        try:
            callback = WebhookCallbackIn.model_validate(decoded)
        except ValidationError as exc:
            raise DomainValidationError(
                "Invalid n8n webhook callback payload.",
                extra={"errors": exc.errors()},
            ) from exc

        safe_exec_id = sanitize_identifier(
            callback.execution_id, field_name="execution_id"
        )
        dedup_key = idempotency_key or f"n8n-cb:{safe_workflow_id}:{safe_exec_id}"
        body_fp = fingerprint(safe_workflow_id, sha256_hex(raw_body))

        def build_ack() -> WebhookCallbackOut:
            return WebhookCallbackOut(
                execution_id=safe_exec_id,
                workflow_id=safe_workflow_id,
                status=callback.status,
                acknowledged_at=utc_now(),
                replayed=False,
            )

        if self._idempotency_store is not None:
            ack, replayed = self._idempotency_store.get_or_create(
                dedup_key, body_fp, build_ack
            )
            if replayed:
                ack = ack.model_copy(update={"replayed": True})
        else:
            ack, replayed = build_ack(), False

        if not replayed:
            if self._cache is not None:
                status_snapshot = WorkflowStatusOut(
                    execution_id=safe_exec_id,
                    status=callback.status,
                    finished=callback.finished,
                    started_at=callback.started_at,
                    ended_at=callback.ended_at,
                )
                self._cache.set(f"n8n:execution:{safe_exec_id}", status_snapshot)

            if self._event_bus is not None:
                await self._event_bus.publish(
                    DomainEvent(
                        event_type=N8N_CALLBACK_RECEIVED_EVENT,
                        source="automation_n8n",
                        correlation_id=correlation_id,
                        payload={
                            "workflow_id": safe_workflow_id,
                            "execution_id": safe_exec_id,
                            "status": callback.status,
                            "finished": callback.finished,
                            "output": callback.output,
                        },
                    )
                )

        return ack, replayed
