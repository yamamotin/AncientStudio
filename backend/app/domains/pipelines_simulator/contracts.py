"""Execution port contracts for the Live CI/CD & Docker Pipeline Simulator."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Protocol, runtime_checkable

from app.domains.pipelines_simulator.schemas import (
    PipelineStageSpec,
    PipelineTargetId,
    StageArtifactFinding,
    StageExecutionStatus,
)


@dataclass(frozen=True)
class StageCheckOutcome:
    """Structured telemetry emitted by a single real pipeline stage inspector."""

    stage_id: str
    status: StageExecutionStatus
    duration_ms: float
    logs: tuple[str, ...]
    inspected_files: tuple[str, ...] = ()
    metrics: dict[str, int | float | str | bool] = field(default_factory=dict)
    findings: tuple[StageArtifactFinding, ...] = ()


@runtime_checkable
class PipelineStageInspectorPort(Protocol):
    """Sandboxed stage inspector operating on real repository manifests and Dockerfiles."""

    async def inspect_stage(
        self,
        *,
        repo_root: Path,
        target_id: PipelineTargetId,
        stage: PipelineStageSpec,
    ) -> StageCheckOutcome: ...
