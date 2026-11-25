"""Schemas for deterministic, multi-step AI Workflows.

Note: Interactive RAG console capabilities are intentionally excluded from this
domain and scheduled exclusively for the final roadmap phase.
"""

from __future__ import annotations

from enum import Enum
from typing import Any

from app.queue.models import JobStatus
from pydantic import BaseModel, Field


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
