"""Live CI/CD & Docker Pipeline Simulator domain service over real repository targets."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from app.core.errors import ResourceNotFoundError
from app.domains.pipelines_simulator.schemas import (
    PipelineRunAccepted,
    PipelineSimulationRequest,
    PipelineStageSpec,
    PipelineTargetId,
    PipelineTargetInfo,
)
from app.queue.base import JobQueue

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


class PipelineSimulatorService:
    """Discovers real monorepo targets on disk and dispatches pipeline simulation jobs."""

    def __init__(
        self,
        queue: JobQueue,
        *,
        repo_root: Path = DEFAULT_REPO_ROOT,
    ) -> None:
        self._queue = queue
        self._repo_root = repo_root

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
