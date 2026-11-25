"""Schemas for real n8n workflow orchestration, callbacks, and versioned catalog."""

from __future__ import annotations

from datetime import datetime
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


class WebhookCallbackIn(BaseModel):
    """Signed inbound callback payload posted by n8n when an execution transitions."""

    execution_id: str = Field(min_length=2, max_length=120)
    status: WorkflowExecutionStatus = "completed"
    finished: bool = True
    started_at: str | None = None
    ended_at: str | None = None
    output: dict[str, Any] = Field(default_factory=dict)


class WebhookCallbackOut(BaseModel):
    """Acknowledgement returned to n8n after verifying HMAC and recording callback state."""

    execution_id: str
    workflow_id: str
    status: WorkflowExecutionStatus
    acknowledged_at: datetime
    replayed: bool
