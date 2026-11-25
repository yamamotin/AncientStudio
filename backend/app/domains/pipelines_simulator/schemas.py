"""Schemas and contracts for the Live CI/CD & Docker Pipeline Simulator domain."""

from __future__ import annotations

from enum import Enum
from typing import Literal

from app.queue.models import JobStatus
from pydantic import BaseModel, Field


class PipelineTargetId(str, Enum):
    """Real application targets inside the AncientStudio monorepo."""

    BACKEND_API = "backend-api"
    ASCII_ENGINE = "ascii-engine"
    PORTFOLIO_STATIC = "portfolio-static"


PipelineStageCategory = Literal["lint", "test", "build", "docker", "security", "verify"]


class StageExecutionStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    PASSED = "passed"
    FAILED = "failed"
    SKIPPED = "skipped"


class PipelineStageSpec(BaseModel):
    """Declarative stage definition within a target's CI/CD & Docker pipeline."""

    stage_id: str = Field(min_length=2, max_length=64)
    title: str = Field(min_length=2, max_length=120)
    category: PipelineStageCategory
    command_preview: str


class PipelineTargetInfo(BaseModel):
    """Discovered repository application target with live manifest/Dockerfile verification."""

    target_id: PipelineTargetId
    name: str
    manifest_path: str
    manifest_present: bool
    dockerfile_path: str | None = None
    dockerfile_present: bool = False
    ci_workflow_path: str
    stages: list[PipelineStageSpec]


class PipelineSimulationRequest(BaseModel):
    """Request contract to enqueue a CI/CD & Docker pipeline inspection run."""

    target_id: PipelineTargetId = PipelineTargetId.BACKEND_API
    include_docker_audit: bool = True
    fail_fast: bool = True
    idempotency_key: str | None = Field(default=None, min_length=8, max_length=120)


class PipelineRunAccepted(BaseModel):
    """Acknowledgement returned when a pipeline run is accepted into the async queue."""

    job_id: str
    topic: str
    target_id: PipelineTargetId
    status: JobStatus
    correlation_id: str
