"""Schemas for n8n workflow orchestration."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class WorkflowRunIn(BaseModel):
    payload: dict[str, Any] = Field(default_factory=dict)
    request_id: str | None = Field(default=None, min_length=3, max_length=120)


class WorkflowRunOut(BaseModel):
    execution_id: str
    status: Literal["queued", "running", "completed", "failed", "unknown"]
    workflow_id: str
    correlation_id: str


class WorkflowStatusOut(BaseModel):
    execution_id: str
    status: Literal["queued", "running", "completed", "failed", "unknown"]
    finished: bool
    started_at: str | None = None
    ended_at: str | None = None
