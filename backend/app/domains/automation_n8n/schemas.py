"""Schemas for real n8n workflow orchestration and versioned workflow catalog."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field

WorkflowExecutionStatus = Literal["queued", "running", "completed", "failed", "unknown"]


class WorkflowRunIn(BaseModel):
    payload: dict[str, Any] = Field(default_factory=dict)
    request_id: str | None = Field(default=None, min_length=3, max_length=120)


class WorkflowRunOut(BaseModel):
    execution_id: str
    status: WorkflowExecutionStatus
    workflow_id: str
    correlation_id: str


class WorkflowStatusOut(BaseModel):
    execution_id: str
    status: WorkflowExecutionStatus
    finished: bool
    started_at: str | None = None
    ended_at: str | None = None


class WorkflowCatalogItem(BaseModel):
    """Metadata read from versioned n8n JSON workflow exports under ``infra/n8n/workflows``."""

    workflow_id: str
    name: str
    active: bool
    webhook_path: str | None = None
    node_count: int
