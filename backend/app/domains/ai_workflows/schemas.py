"""Schemas for deterministic, multi-step AI Workflows.

Note: Interactive RAG console capabilities are intentionally excluded from this
domain and scheduled exclusively for the final roadmap phase.
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any, Literal

from app.queue.models import JobStatus
from pydantic import BaseModel, Field

SeverityLevel = Literal["low", "medium", "high", "critical"]


class AIWorkflowKind(str, Enum):
    """Supported non-RAG operational AI workflow archetypes."""

    STRUCTURED_EXTRACTION = "structured_extraction"
    ANOMALY_TRIAGE = "anomaly_triage"
    CLASSIFICATION = "classification"


class AIWorkflowStepSpec(BaseModel):
    """Declarative step contract within an AI workflow pipeline."""

    step_id: str = Field(min_length=2, max_length=64)
    title: str = Field(min_length=2, max_length=120)
    timeout_seconds: float = Field(default=15.0, gt=0, le=120.0)


class AIWorkflowDefinition(BaseModel):
    """Versioned workflow blueprint registered in the AI Workflows catalog."""

    workflow_slug: str = Field(min_length=3, max_length=80)
    kind: AIWorkflowKind
    version: str = "1.0.0"
    description: str
    steps: list[AIWorkflowStepSpec] = Field(min_length=1)


class AIWorkflowRunRequest(BaseModel):
    """Execution payload submitted to run a registered AI workflow asynchronously."""

    workflow_slug: str = Field(min_length=3, max_length=80)
    inputs: dict[str, Any] = Field(default_factory=dict)
    idempotency_key: str | None = Field(default=None, min_length=8, max_length=120)


class AIWorkflowRunAccepted(BaseModel):
    """Acknowledgement returned when an AI workflow job is accepted into the queue."""

    job_id: str
    topic: str
    workflow_slug: str
    kind: AIWorkflowKind
    status: JobStatus
    correlation_id: str


class AnomalyTriageOutput(BaseModel):
    """Schema-validated output of the ``invoice-anomaly-triage`` workflow."""

    severity: SeverityLevel
    anomaly_detected: bool
    risk_score: float = Field(ge=0.0, le=1.0)
    findings: list[str] = Field(default_factory=list)
    recommended_action: str = Field(min_length=2, max_length=500)


class ExtractedEntityItem(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    entity_type: str = Field(min_length=1, max_length=80)


class EntityExtractionOutput(BaseModel):
    """Schema-validated output of the ``scrape-entity-extraction`` workflow."""

    entities: list[ExtractedEntityItem] = Field(default_factory=list)
    topics: list[str] = Field(default_factory=list)
    summary: str = Field(min_length=2, max_length=2000)


class IncidentClassificationOutput(BaseModel):
    """Schema-validated output of the ``incident-log-classification`` workflow."""

    category: str = Field(min_length=2, max_length=120)
    severity: SeverityLevel
    owner_domain: str = Field(min_length=2, max_length=120)
    root_cause_hypothesis: str = Field(min_length=2, max_length=1000)


class AIWorkflowStepResult(BaseModel):
    """Telemetry and output captured for one executed pipeline step."""

    step_id: str
    status: Literal["completed", "failed"]
    duration_ms: float
    output: dict[str, Any]


class AIWorkflowExecutionResult(BaseModel):
    """Complete multi-step execution artifact persisted on the completed job."""

    workflow_slug: str
    kind: AIWorkflowKind
    provider: str
    steps: list[AIWorkflowStepResult]
    final_output: dict[str, Any]
    completed_at: datetime
