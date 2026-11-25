"""Live CI/CD & Docker Pipeline Simulator domain service over real repository targets."""

from __future__ import annotations

import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from app.cache.base import CacheBackend
from app.core.errors import DomainValidationError, ResourceNotFoundError
from app.core.time import utc_now
from app.domains.pipelines_simulator.contracts import PipelineStageInspectorPort
from app.domains.pipelines_simulator.inspectors import RepositoryStageInspector
from app.domains.pipelines_simulator.schemas import (
    PipelineRootCauseAnalysis,
    PipelineRunAccepted,
    PipelineRunStatusOut,
    PipelineSimulationReport,
    PipelineSimulationRequest,
    PipelineStageSpec,
    PipelineTargetId,
    PipelineTargetInfo,
    StageArtifactFinding,
    StageExecutionStatus,
    StageTelemetryReport,
)
from app.queue.base import EventBus, JobQueue
from app.queue.models import DomainEvent, JobEnvelope

PIPELINE_SIMULATE_TOPIC = "pipelines.simulate"
DEFAULT_REPO_ROOT = Path(__file__).resolve().parents[4]


@dataclass(frozen=True)
class _TargetBlueprint:
    target_id: PipelineTargetId
    name: str
    manifest_relpath: str
    dockerfile_relpath: str | None
    ci_workflow_relpath: str
    stages: tuple[PipelineStageSpec, ...]


_TARGET_BLUEPRINTS: dict[PipelineTargetId, _TargetBlueprint] = {
    PipelineTargetId.BACKEND_API: _TargetBlueprint(
        target_id=PipelineTargetId.BACKEND_API,
        name="AncientStudio FastAPI Modular Monolith",
        manifest_relpath="backend/pyproject.toml",
        dockerfile_relpath="infra/docker/Dockerfile",
        ci_workflow_relpath=".github/workflows/ci-cd.yml",
        stages=(
            PipelineStageSpec(
                stage_id="ruff-lint",
                title="Ruff static analysis & Python 3.10+ compatibility",
                category="lint",
                command_preview="ruff check backend/",
            ),
            PipelineStageSpec(
                stage_id="pytest-suite",
                title="Unit & integration pytest suite",
                category="test",
                command_preview="pytest backend/tests",
            ),
            PipelineStageSpec(
                stage_id="docker-audit",
                title="Backend Dockerfile & non-root runtime audit",
                category="docker",
                command_preview="docker build -f infra/docker/Dockerfile .",
            ),
        ),
    ),
    PipelineTargetId.ASCII_ENGINE: _TargetBlueprint(
        target_id=PipelineTargetId.ASCII_ENGINE,
        name="ASCII Realms 3D WebGL2/ECS Engine Module",
        manifest_relpath="ascii-engine-module/package.json",
        dockerfile_relpath=None,
        ci_workflow_relpath=".github/workflows/ci.yml",
        stages=(
            PipelineStageSpec(
                stage_id="ts-typecheck",
                title="TypeScript strict typecheck",
                category="lint",
                command_preview="npm --prefix ascii-engine-module run typecheck",
            ),
            PipelineStageSpec(
                stage_id="bundle-integrity",
                title="IIFE portfolio bundle parity check",
                category="build",
                command_preview="test -s assets/js/ascii-engine.bundle.js",
            ),
        ),
    ),
    PipelineTargetId.PORTFOLIO_STATIC: _TargetBlueprint(
        target_id=PipelineTargetId.PORTFOLIO_STATIC,
        name="Terminal Portfolio SPA & Static Host",
        manifest_relpath="index.html",
        dockerfile_relpath="Dockerfile",
        ci_workflow_relpath=".github/workflows/pages.yml",
        stages=(
            PipelineStageSpec(
                stage_id="static-contracts",
                title="Static HTML, i18n & asset integrity checks",
                category="verify",
                command_preview="node --test tests/*.test.js",
            ),
            PipelineStageSpec(
                stage_id="security-audit",
                title="Dotfile guard, zero-CDN & secret hygiene audit",
                category="security",
                command_preview="audit index.html Dockerfile .env.example",
            ),
        ),
    ),
}


def _synthesize_rca(stages: list[StageTelemetryReport]) -> PipelineRootCauseAnalysis | None:
    failed_stages = [st for st in stages if st.status == StageExecutionStatus.FAILED]
    if not failed_stages:
        return None

    primary = failed_stages[0]
    evidence: list[StageArtifactFinding] = []
    for st in failed_stages:
        evidence.extend(f for f in st.findings if f.severity == "error")
        if not evidence and st.findings:
            evidence.extend(st.findings)

    affected_files = list(
        dict.fromkeys(f.file_path for f in evidence if f.file_path and f.file_path != ".")
    )
    remediation_steps = list(
        dict.fromkeys(f.remediation for f in evidence if f.remediation)
    )
    root_code = evidence[0].code if evidence else "STAGE_CHECK_FAILED"
    first_detail = (
        evidence[0].message
        if evidence
        else (primary.logs[-1] if primary.logs else f"Stage '{primary.stage_id}' failed.")
    )

    if not remediation_steps:
        remediation_steps = [
            f"Inspect logs for stage '{primary.stage_id}' ({primary.title})."
        ]

    summary = (
        f"Pipeline failed at stage '{primary.stage_id}' ({primary.category}) "
        f"with {root_code}: {first_detail}"
    )
    return PipelineRootCauseAnalysis(
        failed_stage_id=primary.stage_id,
        category=primary.category,
        root_cause_code=root_code,
        summary=summary,
        affected_files=affected_files,
        remediation_steps=remediation_steps,
        evidence=evidence,
    )


class PipelineSimulatorService:
    """Discovers real monorepo targets on disk and executes pipeline simulation audits."""

    def __init__(
        self,
        queue: JobQueue,
        *,
        repo_root: Path = DEFAULT_REPO_ROOT,
        inspector: PipelineStageInspectorPort | None = None,
        cache: CacheBackend | None = None,
        event_bus: EventBus | None = None,
    ) -> None:
        self._queue = queue
        self._repo_root = repo_root
        self._inspector: PipelineStageInspectorPort = inspector or RepositoryStageInspector()
        self._cache = cache
        self._event_bus = event_bus

    def _build_target_info(self, blueprint: _TargetBlueprint) -> PipelineTargetInfo:
        manifest_file = self._repo_root / blueprint.manifest_relpath
        dockerfile_present = False
        if blueprint.dockerfile_relpath is not None:
            dockerfile_present = (self._repo_root / blueprint.dockerfile_relpath).is_file()

        return PipelineTargetInfo(
            target_id=blueprint.target_id,
            name=blueprint.name,
            manifest_path=blueprint.manifest_relpath,
            manifest_present=manifest_file.is_file(),
            dockerfile_path=blueprint.dockerfile_relpath,
            dockerfile_present=dockerfile_present,
            ci_workflow_path=blueprint.ci_workflow_relpath,
            stages=list(blueprint.stages),
        )

    def list_targets(self) -> list[PipelineTargetInfo]:
        return [
            self._build_target_info(blueprint)
            for blueprint in _TARGET_BLUEPRINTS.values()
        ]

    def get_target(self, target_id: PipelineTargetId) -> PipelineTargetInfo:
        blueprint = _TARGET_BLUEPRINTS.get(target_id)
        if blueprint is None:
            raise ResourceNotFoundError(
                f"Unknown pipeline target: {target_id}",
                title="Pipeline target not found",
            )
        return self._build_target_info(blueprint)

    async def enqueue_simulation(
        self,
        request: PipelineSimulationRequest,
        *,
        correlation_id: str,
    ) -> PipelineRunAccepted:
        target = self.get_target(request.target_id)
        job = await self._queue.enqueue(
            PIPELINE_SIMULATE_TOPIC,
            {
                "target_id": target.target_id.value,
                "manifest_path": target.manifest_path,
                "dockerfile_path": target.dockerfile_path,
                "include_docker_audit": request.include_docker_audit,
                "fail_fast": request.fail_fast,
            },
            correlation_id=correlation_id,
            idempotency_key=request.idempotency_key,
        )
        return PipelineRunAccepted(
            job_id=job.job_id,
            topic=job.topic,
            target_id=target.target_id,
            status=job.status,
            correlation_id=correlation_id,
        )

    async def execute_simulation_job(self, job: JobEnvelope) -> dict[str, Any]:
        """Worker handler executing real stage inspections, telemetry, and RCA synthesis."""
        raw_target = str(job.payload.get("target_id") or "")
        try:
            target_id = PipelineTargetId(raw_target)
        except ValueError as exc:
            raise DomainValidationError(
                f"Unsupported pipeline target '{raw_target}'."
            ) from exc

        blueprint = _TARGET_BLUEPRINTS[target_id]
        include_docker = bool(job.payload.get("include_docker_audit", True))
        fail_fast = bool(job.payload.get("fail_fast", True))

        started_at = utc_now()
        run_started_ns = time.perf_counter_ns()
        stage_reports: list[StageTelemetryReport] = []
        halted = False

        for stage in blueprint.stages:
            if halted:
                stage_reports.append(
                    StageTelemetryReport(
                        stage_id=stage.stage_id,
                        title=stage.title,
                        category=stage.category,
                        status=StageExecutionStatus.SKIPPED,
                        duration_ms=0.0,
                        logs=["Skipped due to fail_fast after preceding stage failure."],
                    )
                )
                continue

            if stage.category == "docker" and not include_docker:
                stage_reports.append(
                    StageTelemetryReport(
                        stage_id=stage.stage_id,
                        title=stage.title,
                        category=stage.category,
                        status=StageExecutionStatus.SKIPPED,
                        duration_ms=0.0,
                        logs=["Skipped Docker audit (include_docker_audit=false)."],
                    )
                )
                continue

            outcome = await self._inspector.inspect_stage(
                repo_root=self._repo_root,
                target_id=target_id,
                stage=stage,
            )
            stage_reports.append(
                StageTelemetryReport(
                    stage_id=outcome.stage_id,
                    title=stage.title,
                    category=stage.category,
                    status=outcome.status,
                    duration_ms=outcome.duration_ms,
                    inspected_files=list(outcome.inspected_files),
                    metrics=dict(outcome.metrics),
                    findings=list(outcome.findings),
                    logs=list(outcome.logs),
                )
            )
            if outcome.status == StageExecutionStatus.FAILED and fail_fast:
                halted = True

        total_duration_ms = round(
            (time.perf_counter_ns() - run_started_ns) / 1_000_000,
            3,
        )
        completed_at = utc_now()
        rca = _synthesize_rca(stage_reports)
        overall_status = "failed" if rca is not None else "passed"

        report = PipelineSimulationReport(
            job_id=job.job_id,
            target_id=target_id,
            overall_status=overall_status,
            total_duration_ms=total_duration_ms,
            started_at=started_at,
            completed_at=completed_at,
            include_docker_audit=include_docker,
            fail_fast=fail_fast,
            stages=stage_reports,
            rca=rca,
        )
        serialized = report.model_dump(mode="json")

        if self._cache is not None:
            self._cache.set(f"pipelines:report:{job.job_id}", serialized)

        if self._event_bus is not None:
            event_type = (
                "pipelines.run.completed"
                if overall_status == "passed"
                else "pipelines.run.failed"
            )
            await self._event_bus.publish(
                DomainEvent(
                    event_type=event_type,
                    source="pipelines_simulator",
                    correlation_id=job.correlation_id,
                    payload={
                        "job_id": job.job_id,
                        "target_id": target_id.value,
                        "overall_status": overall_status,
                        "total_duration_ms": total_duration_ms,
                        "root_cause_code": rca.root_cause_code if rca else None,
                    },
                )
            )

        return serialized

    def get_run_status(self, job_id: str) -> PipelineRunStatusOut:
        job = self._queue.get_job(job_id)
        if job is None or job.topic != PIPELINE_SIMULATE_TOPIC:
            raise ResourceNotFoundError(
                f"No pipeline simulation run found with id {job_id}.",
                title="Pipeline run not found",
            )

        raw_target = str(job.payload.get("target_id") or PipelineTargetId.BACKEND_API.value)
        target_id = PipelineTargetId(raw_target)

        report: PipelineSimulationReport | None = None
        if isinstance(job.result, dict):
            report = PipelineSimulationReport.model_validate(job.result)
        elif self._cache is not None:
            cached = self._cache.get(f"pipelines:report:{job_id}")
            if isinstance(cached, dict):
                report = PipelineSimulationReport.model_validate(cached)

        return PipelineRunStatusOut(
            job_id=job.job_id,
            topic=job.topic,
            target_id=target_id,
            status=job.status,
            correlation_id=job.correlation_id,
            attempts=job.attempts,
            error=job.last_error,
            created_at=job.created_at,
            updated_at=job.updated_at,
            report=report,
        )
