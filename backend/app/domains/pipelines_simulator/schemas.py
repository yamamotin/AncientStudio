"""Schemas and contracts for the Live CI/CD & Docker Pipeline Simulator domain."""

from __future__ import annotations

from datetime import datetime
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
StageFindingSeverity = Literal["error", "warning", "info"]


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


class StageArtifactFinding(BaseModel):
    """Verifiable audit finding emitted during real manifest, AST, or Dockerfile inspection."""

    code: str = Field(min_length=3, max_length=80)
    severity: StageFindingSeverity
    file_path: str
    line: int | None = None
    message: str
    remediation: str


class StageTelemetryReport(BaseModel):
    """Per-stage structured telemetry, metrics, logs, and invariant findings."""

    stage_id: str
    title: str
    category: PipelineStageCategory
    status: StageExecutionStatus
    duration_ms: float = Field(ge=0.0)
    inspected_files: list[str] = Field(default_factory=list)
    metrics: dict[str, int | float | str | bool] = Field(default_factory=dict)
    findings: list[StageArtifactFinding] = Field(default_factory=list)
    logs: list[str] = Field(default_factory=list)


class PipelineRootCauseAnalysis(BaseModel):
    """Verifiable Root-Cause Analysis synthesized from failed pipeline stage findings."""

    failed_stage_id: str
    category: PipelineStageCategory
    root_cause_code: str
    summary: str
    affected_files: list[str] = Field(default_factory=list)
    remediation_steps: list[str] = Field(default_factory=list)
    evidence: list[StageArtifactFinding] = Field(default_factory=list)


class PipelineSimulationReport(BaseModel):
    """Complete execution report produced by the ``pipelines.simulate`` worker."""

    job_id: str
    target_id: PipelineTargetId
    overall_status: Literal["passed", "failed"]
    total_duration_ms: float = Field(ge=0.0)
    started_at: datetime
    completed_at: datetime
    include_docker_audit: bool
    fail_fast: bool
    stages: list[StageTelemetryReport]
    rca: PipelineRootCauseAnalysis | None = None


class PipelineRunStatusOut(BaseModel):
    """Queue envelope state combined with the structured pipeline audit report."""

    job_id: str
    topic: str
    target_id: PipelineTargetId
    status: JobStatus
    correlation_id: str
    attempts: int = 0
    error: str | None = None
    created_at: datetime
    updated_at: datetime
    report: PipelineSimulationReport | None = None
