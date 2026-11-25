"""Unit tests for Phase 4 real monorepo stage inspectors, RCA synthesis, and path guards."""

from __future__ import annotations

import asyncio
from pathlib import Path

import pytest
from app.cache import InMemoryTTLCache
from app.domains.pipelines_simulator import (
    DEFAULT_REPO_ROOT,
    PipelineSimulationReport,
    PipelineSimulationRequest,
    PipelineSimulatorService,
    PipelineTargetId,
    RepositoryStageInspector,
    StageExecutionStatus,
)
from app.queue import EventBus, InMemoryJobQueue

pytestmark = pytest.mark.unit


async def _record_async(sink: list[str], item: str) -> None:
    sink.append(item)


def test_real_monorepo_targets_pass_all_stage_inspections() -> None:
    async def _run() -> None:
        queue = InMemoryJobQueue()
        cache = InMemoryTTLCache(default_ttl_seconds=60)
        bus = EventBus()
        emitted: list[str] = []
        bus.subscribe(
            "pipelines.run.completed",
            lambda ev: _record_async(emitted, ev.event_type),
        )

        service = PipelineSimulatorService(
            queue=queue,
            repo_root=DEFAULT_REPO_ROOT,
            inspector=RepositoryStageInspector(),
            cache=cache,
            event_bus=bus,
        )

        for target_id in (
            PipelineTargetId.BACKEND_API,
            PipelineTargetId.ASCII_ENGINE,
            PipelineTargetId.PORTFOLIO_STATIC,
        ):
            accepted = await service.enqueue_simulation(
                PipelineSimulationRequest(target_id=target_id, include_docker_audit=True),
                correlation_id=f"corr-{target_id.value}",
            )
            job = await queue.dequeue(timeout=0.1)
            assert job is not None
            raw_report = await service.execute_simulation_job(job)
            await queue.complete(job.job_id, raw_report)

            report = PipelineSimulationReport.model_validate(raw_report)
            assert report.overall_status == "passed", f"{target_id} failed: {report.rca}"
            assert report.rca is None
            assert all(st.status == StageExecutionStatus.PASSED for st in report.stages)

            status_out = service.get_run_status(accepted.job_id)
            assert status_out.report is not None
            assert status_out.report.overall_status == "passed"

        assert len(emitted) == 3

    asyncio.run(_run())


def test_backend_inspector_detects_py310_pickle_and_dockerfile_defects_with_rca(
    tmp_path: Path,
) -> None:
    async def _run() -> None:
        (tmp_path / "backend" / "app").mkdir(parents=True)
        (tmp_path / "backend" / "tests" / "unit").mkdir(parents=True)
        (tmp_path / "infra" / "docker").mkdir(parents=True)

        (tmp_path / "backend" / "pyproject.toml").write_text(
            '[project]\nrequires-python = ">=3.10"\n[tool.ruff]\nline-length = 100\n'
            'target-version = "py310"\n',
            encoding="utf-8",
        )
        (tmp_path / "backend" / "app" / "bad_mod.py").write_text(
            "from datetime import UTC\nimport pickle\n\nx = 1\n",
            encoding="utf-8",
        )
        (tmp_path / "infra" / "docker" / "Dockerfile").write_text(
            "FROM python:latest\nENV API_SECRET=hardcoded123\nCOPY missing_dir /app\n"
            "USER root\nCMD uvicorn app.main:app\n",
            encoding="utf-8",
        )

        queue = InMemoryJobQueue()
        service = PipelineSimulatorService(queue=queue, repo_root=tmp_path)

        await service.enqueue_simulation(
            PipelineSimulationRequest(
                target_id=PipelineTargetId.BACKEND_API,
                include_docker_audit=True,
                fail_fast=True,
            ),
            correlation_id="corr-ff-true",
        )
        ff_job = await queue.dequeue(timeout=0.1)
        assert ff_job is not None
        ff_report = PipelineSimulationReport.model_validate(
            await service.execute_simulation_job(ff_job)
        )
        assert ff_report.overall_status == "failed"
        assert ff_report.stages[0].status == StageExecutionStatus.FAILED
        assert ff_report.stages[1].status == StageExecutionStatus.SKIPPED
        assert ff_report.stages[2].status == StageExecutionStatus.SKIPPED
        assert ff_report.rca is not None
        assert ff_report.rca.failed_stage_id == "ruff-lint"
        assert ff_report.rca.root_cause_code in {
            "PY310_DATETIME_UTC_IMPORT",
            "UNSAFE_PICKLE_IMPORT",
        }

        await service.enqueue_simulation(
            PipelineSimulationRequest(
                target_id=PipelineTargetId.BACKEND_API,
                include_docker_audit=True,
                fail_fast=False,
            ),
            correlation_id="corr-ff-false",
        )
        full_job = await queue.dequeue(timeout=0.1)
        assert full_job is not None
        full_report = PipelineSimulationReport.model_validate(
            await service.execute_simulation_job(full_job)
        )
        assert full_report.overall_status == "failed"
        assert all(st.status == StageExecutionStatus.FAILED for st in full_report.stages)
        assert full_report.rca is not None
        codes = {ev.code for ev in full_report.rca.evidence}
        assert "PY310_DATETIME_UTC_IMPORT" in codes
        assert "UNSAFE_PICKLE_IMPORT" in codes
        assert "DOCKER_UNPINNED_BASE_IMAGE" in codes
        assert "DOCKER_RUNS_AS_ROOT" in codes
        assert "DOCKER_MISSING_HEALTHCHECK" in codes
        assert "DOCKER_SHELL_FORM_CMD" in codes
        assert "DOCKER_SECRET_IN_ENV" in codes
        assert "DOCKER_COPY_SOURCE_MISSING" in codes

    asyncio.run(_run())


def test_static_inspector_detects_cdn_broken_assets_i18n_drift_and_unscoped_copy(
    tmp_path: Path,
) -> None:
    async def _run() -> None:
        (tmp_path / "assets" / "i18n").mkdir(parents=True)
        (tmp_path / "index.html").write_text(
            '<!doctype html><html><head>'
            '<script src="https://cdn.evil.example/sdk.js"></script>'
            '<script src="assets/js/missing.js"></script>'
            '</head><body><span data-i18n="hero.missing">Hi</span>'
            '<script>gtag("config", "G-123");</script></body></html>',
            encoding="utf-8",
        )
        (tmp_path / "assets" / "i18n" / "pt-br.json").write_text(
            '{"hero.role": "Engenheiro", "only.pt": "sim"}',
            encoding="utf-8",
        )
        (tmp_path / "assets" / "i18n" / "en.json").write_text(
            '{"hero.role": "Engineer"}',
            encoding="utf-8",
        )
        (tmp_path / ".env.example").write_text(
            "AI_PROVIDER_API_KEY=sk-proj-ABCDEFGHIJKLMNOPQRSTUVWX\n",
            encoding="utf-8",
        )
        (tmp_path / "Dockerfile").write_text(
            'FROM python:3.11-slim\nCOPY . .\nCMD ["python3", "api/server.py"]\n',
            encoding="utf-8",
        )

        queue = InMemoryJobQueue()
        service = PipelineSimulatorService(queue=queue, repo_root=tmp_path)
        await service.enqueue_simulation(
            PipelineSimulationRequest(
                target_id=PipelineTargetId.PORTFOLIO_STATIC,
                fail_fast=False,
            ),
            correlation_id="corr-static-bad",
        )
        job = await queue.dequeue(timeout=0.1)
        assert job is not None
        report = PipelineSimulationReport.model_validate(
            await service.execute_simulation_job(job)
        )
        assert report.overall_status == "failed"
        assert report.rca is not None
        codes = {ev.code for ev in report.rca.evidence}
        assert "STATIC_BROKEN_ASSET_REF" in codes
        assert "I18N_KEY_DRIFT" in codes
        assert "I18N_MISSING_TRANSLATION_KEY" in codes
        assert "STATIC_EXTERNAL_CDN_ASSET" in codes
        assert "STATIC_TRACKER_DETECTED" in codes
        assert "SECRET_LIVE_TOKEN_DETECTED" in codes
        assert "DOCKER_UNSCOPED_ROOT_COPY" in codes

    asyncio.run(_run())


def test_inspector_blocks_symlink_escaping_repository_root(tmp_path: Path) -> None:
    async def _run() -> None:
        outside = tmp_path / "outside_secret.txt"
        outside.write_text("top-secret", encoding="utf-8")

        repo = tmp_path / "repo"
        (repo / "backend" / "app").mkdir(parents=True)
        (repo / "backend" / "pyproject.toml").symlink_to(outside)

        queue = InMemoryJobQueue()
        service = PipelineSimulatorService(queue=queue, repo_root=repo)
        await service.enqueue_simulation(
            PipelineSimulationRequest(
                target_id=PipelineTargetId.BACKEND_API,
                fail_fast=True,
            ),
            correlation_id="corr-symlink",
        )
        job = await queue.dequeue(timeout=0.1)
        assert job is not None
        report = PipelineSimulationReport.model_validate(
            await service.execute_simulation_job(job)
        )
        assert report.overall_status == "failed"
        assert report.rca is not None
        assert report.rca.root_cause_code == "PATH_TRAVERSAL_BLOCKED"

    asyncio.run(_run())
