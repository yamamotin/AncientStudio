"""AI Workflows catalog, multi-step execution engine, and queue dispatch service."""

from __future__ import annotations

import json
import re
import time
from typing import Any

from app.core.errors import (
    ResourceNotFoundError,
    ServiceUnavailableError,
    UpstreamServiceError,
)
from app.core.security import sanitize_identifier, sanitize_text
from app.core.time import utc_now
from app.domains.ai_workflows.contracts import StructuredInferencePort
from app.domains.ai_workflows.schemas import (
    AIWorkflowDefinition,
    AIWorkflowExecutionResult,
    AIWorkflowKind,
    AIWorkflowRunAccepted,
    AIWorkflowRunRequest,
    AIWorkflowStepResult,
    AIWorkflowStepSpec,
    AnomalyTriageOutput,
    EntityExtractionOutput,
    IncidentClassificationOutput,
)
from app.queue.base import EventBus, JobQueue
from app.queue.models import DomainEvent, JobEnvelope
from pydantic import BaseModel, ValidationError

AI_WORKFLOW_EXECUTE_TOPIC = "ai_workflows.execute"
AI_WORKFLOW_COMPLETED_EVENT = "ai_workflows.run.completed"

_URL_RE = re.compile(r"https?://[^\s<>'\"]+")
_HTTP_CODE_RE = re.compile(r"\b[45]\d{2}\b")
_EXCEPTION_RE = re.compile(r"\b[A-Z][A-Za-z0-9_]*(?:Error|Exception|Timeout)\b")

DEFAULT_AI_WORKFLOWS: tuple[AIWorkflowDefinition, ...] = (
    AIWorkflowDefinition(
        workflow_slug="invoice-anomaly-triage",
        kind=AIWorkflowKind.ANOMALY_TRIAGE,
        description="Audits fiscal payloads for tax-rate outliers and structural discrepancies.",
        steps=[
            AIWorkflowStepSpec(step_id="normalize", title="Normalize fiscal fields"),
            AIWorkflowStepSpec(
                step_id="triage", title="Evaluate anomaly heuristics & model score"
            ),
        ],
    ),
    AIWorkflowDefinition(
        workflow_slug="scrape-entity-extraction",
        kind=AIWorkflowKind.STRUCTURED_EXTRACTION,
        description="Extracts typed technical entities and metadata from scraped web documents.",
        steps=[
            AIWorkflowStepSpec(step_id="clean-text", title="Sanitize document text"),
            AIWorkflowStepSpec(
                step_id="extract-schema", title="Structured schema extraction"
            ),
        ],
    ),
    AIWorkflowDefinition(
        workflow_slug="incident-log-classification",
        kind=AIWorkflowKind.CLASSIFICATION,
        description="Classifies CI/CD and runtime failure logs by root-cause domain.",
        steps=[
            AIWorkflowStepSpec(step_id="parse-log", title="Extract failure signatures"),
            AIWorkflowStepSpec(
                step_id="classify", title="Assign severity and component owner"
            ),
        ],
    ),
)

_OUTPUT_SCHEMAS: dict[AIWorkflowKind, type[BaseModel]] = {
    AIWorkflowKind.ANOMALY_TRIAGE: AnomalyTriageOutput,
    AIWorkflowKind.STRUCTURED_EXTRACTION: EntityExtractionOutput,
    AIWorkflowKind.CLASSIFICATION: IncidentClassificationOutput,
}

_SYSTEM_PROMPTS: dict[AIWorkflowKind, str] = {
    AIWorkflowKind.ANOMALY_TRIAGE: (
        "You are a fiscal compliance and anomaly triage engine. Analyze the normalized "
        "invoice telemetry and assess anomaly risk."
    ),
    AIWorkflowKind.STRUCTURED_EXTRACTION: (
        "You are a technical entity extraction engine. Extract named technical entities, "
        "topics, and a concise factual summary from the cleaned document context."
    ),
    AIWorkflowKind.CLASSIFICATION: (
        "You are an SRE incident classification engine. Classify the failure signatures "
        "into category, severity, owning domain, and root-cause hypothesis."
    ),
}


def _sanitize_inputs(payload: dict[str, Any]) -> dict[str, Any]:
    cleaned: dict[str, Any] = {}
    for key, value in payload.items():
        safe_key = sanitize_text(str(key), max_length=120)
        if isinstance(value, str):
            cleaned[safe_key] = sanitize_text(value, max_length=8192)
        else:
            cleaned[safe_key] = value
    return cleaned


def _preprocess_step(kind: AIWorkflowKind, inputs: dict[str, Any]) -> dict[str, Any]:
    """Execute deterministic Step 1 domain signal extraction prior to LLM inference."""
    if kind == AIWorkflowKind.ANOMALY_TRIAGE:
        items = inputs.get("items") if isinstance(inputs.get("items"), list) else []
        computed_gross = 0.0
        max_unit_price = 0.0
        for item in items:
            if isinstance(item, dict):
                qty = float(item.get("quantity") or 0)
                price = float(item.get("unit_price") or 0)
                computed_gross += qty * price
                max_unit_price = max(max_unit_price, price)

        declared_gross = float(inputs.get("gross") or computed_gross)
        tax_rate = float(inputs.get("tax") or 0.0)
        totals_delta = round(abs(declared_gross - computed_gross), 2) if items else 0.0
        heuristic_flags: list[str] = []
        if tax_rate > 0.35:
            heuristic_flags.append("high_tax_rate")
        if totals_delta > 0.01:
            heuristic_flags.append("gross_items_mismatch")

        return {
            "invoice_key": str(inputs.get("invoice_key") or "unknown"),
            "item_count": len(items),
            "declared_gross": round(declared_gross, 2),
            "computed_gross": round(computed_gross, 2),
            "totals_delta": totals_delta,
            "tax_rate": tax_rate,
            "max_unit_price": round(max_unit_price, 2),
            "heuristic_flags": heuristic_flags,
        }

    if kind == AIWorkflowKind.STRUCTURED_EXTRACTION:
        raw_text = sanitize_text(
            str(inputs.get("text") or inputs.get("content") or ""),
            max_length=8192,
        )
        urls = sorted(set(_URL_RE.findall(raw_text)))[:20]
        words = raw_text.split()
        return {
            "source_url": str(inputs.get("url") or ""),
            "char_count": len(raw_text),
            "word_count": len(words),
            "detected_urls": urls,
            "cleaned_text": raw_text,
        }

    raw_log = sanitize_text(str(inputs.get("log") or inputs.get("error") or ""), max_length=8192)
    lines = [line.strip() for line in raw_log.splitlines() if line.strip()]
    error_lines = [
        line
        for line in lines
        if any(token in line.upper() for token in ("ERROR", "FAIL", "TRACEBACK", "CRITICAL"))
    ][:15]
    return {
        "line_count": len(lines),
        "error_lines": error_lines,
        "http_error_codes": sorted(set(_HTTP_CODE_RE.findall(raw_log))),
        "exception_types": sorted(set(_EXCEPTION_RE.findall(raw_log))),
        "log_excerpt": raw_log[:3000],
    }


class AIWorkflowService:
    """Manages registered AI workflow blueprints and executes multi-step async pipelines."""

    def __init__(
        self,
        queue: JobQueue,
        *,
        definitions: tuple[AIWorkflowDefinition, ...] = DEFAULT_AI_WORKFLOWS,
        inference_port: StructuredInferencePort | None = None,
        event_bus: EventBus | None = None,
    ) -> None:
        self._queue = queue
        self._definitions = {item.workflow_slug: item for item in definitions}
        self._inference_port = inference_port
        self._event_bus = event_bus

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

    async def execute_workflow_job(self, job: JobEnvelope) -> dict[str, Any]:
        """Worker handler executing multi-step ``ai_workflows.execute`` pipelines."""
        if self._inference_port is None:
            raise ServiceUnavailableError(
                "No StructuredInferencePort adapter is configured for AI workflow execution."
            )

        workflow_slug = str(job.payload.get("workflow_slug") or "")
        definition = self.get_definition(workflow_slug)
        raw_inputs = job.payload.get("inputs")
        inputs = _sanitize_inputs(raw_inputs if isinstance(raw_inputs, dict) else {})

        step_results: list[AIWorkflowStepResult] = []

        # Step 1: Deterministic domain signal preprocessing.
        first_spec = definition.steps[0]
        t0 = time.perf_counter()
        preprocessed = _preprocess_step(definition.kind, inputs)
        step1_ms = round((time.perf_counter() - t0) * 1000, 2)
        step_results.append(
            AIWorkflowStepResult(
                step_id=first_spec.step_id,
                status="completed",
                duration_ms=step1_ms,
                output=preprocessed,
            )
        )

        # Step 2+: Structured inference + strict Pydantic schema validation.
        inference_spec = definition.steps[-1]
        output_model = _OUTPUT_SCHEMAS[definition.kind]
        t1 = time.perf_counter()
        raw_structured = await self._inference_port.generate_structured(
            system_prompt=_SYSTEM_PROMPTS[definition.kind],
            user_prompt=json.dumps(
                {
                    "workflow_slug": definition.workflow_slug,
                    "inputs": inputs,
                    "preprocessed": preprocessed,
                },
                ensure_ascii=False,
            ),
            response_schema=output_model.model_json_schema(),
            timeout_seconds=inference_spec.timeout_seconds,
        )
        try:
            validated_output = output_model.model_validate(raw_structured)
        except ValidationError as exc:
            raise UpstreamServiceError(
                f"AI provider output failed schema validation for '{definition.workflow_slug}'.",
                title="AI output schema violation",
                extra={"errors": exc.errors()},
            ) from exc

        step2_ms = round((time.perf_counter() - t1) * 1000, 2)
        final_dict = validated_output.model_dump(mode="json")
        step_results.append(
            AIWorkflowStepResult(
                step_id=inference_spec.step_id,
                status="completed",
                duration_ms=step2_ms,
                output=final_dict,
            )
        )

        execution = AIWorkflowExecutionResult(
            workflow_slug=definition.workflow_slug,
            kind=definition.kind,
            provider=self._inference_port.provider_name,
            steps=step_results,
            final_output=final_dict,
            completed_at=utc_now(),
        )

        if self._event_bus is not None:
            severity = str(final_dict.get("severity") or "low")
            requires_alert = severity in {"high", "critical"} or bool(
                final_dict.get("anomaly_detected")
            )
            await self._event_bus.publish(
                DomainEvent(
                    event_type=AI_WORKFLOW_COMPLETED_EVENT,
                    source="ai_workflows",
                    correlation_id=job.correlation_id,
                    payload={
                        "job_id": job.job_id,
                        "workflow_slug": definition.workflow_slug,
                        "kind": definition.kind.value,
                        "severity": severity,
                        "requires_alert": requires_alert,
                        "final_output": final_dict,
                    },
                )
            )

        return execution.model_dump(mode="json")
