"""AI Workflows catalog and asynchronous execution dispatch service."""

from __future__ import annotations

from typing import Any

from app.core.errors import ResourceNotFoundError
from app.core.security import sanitize_identifier, sanitize_text
from app.domains.ai_workflows.contracts import StructuredInferencePort
from app.domains.ai_workflows.schemas import (
    AIWorkflowDefinition,
    AIWorkflowKind,
    AIWorkflowRunAccepted,
    AIWorkflowRunRequest,
    AIWorkflowStepSpec,
)
from app.queue.base import JobQueue

AI_WORKFLOW_EXECUTE_TOPIC = "ai_workflows.execute"

DEFAULT_AI_WORKFLOWS: tuple[AIWorkflowDefinition, ...] = (
    AIWorkflowDefinition(
        workflow_slug="invoice-anomaly-triage",
        kind=AIWorkflowKind.ANOMALY_TRIAGE,
        description="Audits fiscal payloads for tax-rate outliers and structural discrepancies.",
        steps=[
            AIWorkflowStepSpec(step_id="normalize", title="Normalize fiscal fields"),
            AIWorkflowStepSpec(step_id="triage", title="Evaluate anomaly heuristics & model score"),
        ],
    ),
    AIWorkflowDefinition(
        workflow_slug="scrape-entity-extraction",
        kind=AIWorkflowKind.STRUCTURED_EXTRACTION,
        description="Extracts typed technical entities and metadata from scraped web documents.",
        steps=[
            AIWorkflowStepSpec(step_id="clean-text", title="Sanitize document text"),
            AIWorkflowStepSpec(step_id="extract-schema", title="Structured schema extraction"),
        ],
    ),
    AIWorkflowDefinition(
        workflow_slug="incident-log-classification",
        kind=AIWorkflowKind.CLASSIFICATION,
        description="Classifies CI/CD and runtime failure logs by root-cause domain.",
        steps=[
            AIWorkflowStepSpec(step_id="parse-log", title="Extract failure signatures"),
            AIWorkflowStepSpec(step_id="classify", title="Assign severity and component owner"),
        ],
    ),
)


def _sanitize_inputs(payload: dict[str, Any]) -> dict[str, Any]:
    cleaned: dict[str, Any] = {}
    for key, value in payload.items():
        safe_key = sanitize_text(str(key), max_length=120)
        if isinstance(value, str):
            cleaned[safe_key] = sanitize_text(value, max_length=8192)
        else:
            cleaned[safe_key] = value
    return cleaned


class AIWorkflowService:
    """Manages registered AI workflow blueprints and enqueues asynchronous executions."""

    def __init__(
        self,
        queue: JobQueue,
        *,
        definitions: tuple[AIWorkflowDefinition, ...] = DEFAULT_AI_WORKFLOWS,
        inference_port: StructuredInferencePort | None = None,
    ) -> None:
        self._queue = queue
        self._definitions = {item.workflow_slug: item for item in definitions}
        self._inference_port = inference_port

    def register_definition(self, definition: AIWorkflowDefinition) -> None:
        self._definitions[definition.workflow_slug] = definition

    def list_definitions(self) -> list[AIWorkflowDefinition]:
        return [self._definitions[slug] for slug in sorted(self._definitions)]

    def get_definition(self, workflow_slug: str) -> AIWorkflowDefinition:
        safe_slug = sanitize_identifier(workflow_slug, field_name="workflow_slug")
        definition = self._definitions.get(safe_slug)
        if definition is None:
            raise ResourceNotFoundError(
                f"Unknown AI workflow definition: {safe_slug}",
                title="AI workflow not found",
            )
        return definition

    async def enqueue_run(
        self,
        request: AIWorkflowRunRequest,
        *,
        correlation_id: str,
    ) -> AIWorkflowRunAccepted:
        definition = self.get_definition(request.workflow_slug)
        sanitized_inputs = _sanitize_inputs(request.inputs)

        job = await self._queue.enqueue(
            AI_WORKFLOW_EXECUTE_TOPIC,
            {
                "workflow_slug": definition.workflow_slug,
                "kind": definition.kind.value,
                "inputs": sanitized_inputs,
            },
            correlation_id=correlation_id,
            idempotency_key=request.idempotency_key,
        )
        return AIWorkflowRunAccepted(
            job_id=job.job_id,
            topic=job.topic,
            workflow_slug=definition.workflow_slug,
            kind=definition.kind,
            status=job.status,
            correlation_id=correlation_id,
        )
