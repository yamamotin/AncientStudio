"""Integration, resilience, and concurrent load tests for Phase 4 Pipeline Simulator & workers."""

from __future__ import annotations

import asyncio
import time
from pathlib import Path
from typing import Any

import pytest
from app.core.config import Settings
from app.domains.pipelines_simulator import (
    PIPELINE_SIMULATE_TOPIC,
    PipelineSimulationRequest,
    PipelineSimulatorService,
    PipelineTargetId,
)
from app.main import create_app
from app.queue import InMemoryJobQueue, JobEnvelope, RetryPolicy
from app.workers import AsyncWorkerRunner, WorkerRegistry
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def _wait_for_pipeline_run(
    client: TestClient,
    job_id: str,
    headers: dict[str, str],
    *,
    timeout: float = 5.0,
) -> dict[str, Any]:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        resp = client.get(f"/api/v1/pipelines/runs/{job_id}", headers=headers)
        assert resp.status_code == 200
        body = resp.json()
        if body["status"] in {"completed", "dead_letter"}:
            return body
        time.sleep(0.03)
    raise AssertionError(f"Pipeline job {job_id} did not settle within {timeout}s.")


def test_e2e_pipeline_simulator_executes_all_real_targets_via_lifespan_workers() -> None:
    cfg = Settings(
        environment="test",
        worker_autostart=True,
        worker_concurrency=3,
        worker_poll_timeout_seconds=0.02,
        workflow_api_token="test-workflow-token-0123456789",
        n8n_event_bridge_enabled=False,
    )
    app = create_app(cfg)
    headers = {"X-API-Key": cfg.workflow_api_token}

    with TestClient(app) as client:
        for target in ("backend-api", "ascii-engine", "portfolio-static"):
            accepted = client.post(
                "/api/v1/pipelines/runs",
                headers=headers,
                json={"target_id": target, "include_docker_audit": True, "fail_fast": True},
            )
            assert accepted.status_code == 202
            job_id = accepted.json()["job_id"]

            settled = _wait_for_pipeline_run(client, job_id, headers)
            assert settled["status"] == "completed"
            report = settled["report"]
            assert report is not None
            assert report["target_id"] == target
            assert report["overall_status"] == "passed"
            assert report["rca"] is None
            assert len(report["stages"]) >= 2


def test_e2e_pipeline_simulator_surfaces_verifiable_rca_on_defective_repo(
    tmp_path: Path,
) -> None:
    (tmp_path / "backend" / "app").mkdir(parents=True)
    (tmp_path / "backend" / "pyproject.toml").write_text(
        '[project]\nrequires-python = ">=3.10"\n[tool.ruff]\nline-length = 100\n'
        'target-version = "py310"\n',
        encoding="utf-8",
    )
    (tmp_path / "backend" / "app" / "broken.py").write_text(
        "def broken(:\n    pass\n",
        encoding="utf-8",
    )

    cfg = Settings(
        environment="test",
        worker_autostart=True,
        worker_concurrency=1,
        worker_poll_timeout_seconds=0.02,
        workflow_api_token="test-workflow-token-0123456789",
        repo_root_override=tmp_path,
        n8n_event_bridge_enabled=False,
    )
    app = create_app(cfg)
    headers = {"X-API-Key": cfg.workflow_api_token}

    with TestClient(app) as client:
        accepted = client.post(
            "/api/v1/pipelines/runs",
            headers=headers,
            json={"target_id": "backend-api", "fail_fast": True},
        )
        assert accepted.status_code == 202
        settled = _wait_for_pipeline_run(client, accepted.json()["job_id"], headers)
        assert settled["status"] == "completed"
        report = settled["report"]
        assert report["overall_status"] == "failed"
        assert report["rca"]["failed_stage_id"] == "ruff-lint"
        assert report["rca"]["root_cause_code"] == "PYTHON_SYNTAX_ERROR"
        assert "backend/app/broken.py" in report["rca"]["affected_files"]


def test_resilience_load_burst_concurrency_idempotency_storm_and_dlq_isolation() -> None:
    async def _run() -> None:
        queue = InMemoryJobQueue(max_size=200)
        registry = WorkerRegistry()
        service = PipelineSimulatorService(queue=queue)

        flaky_attempts: dict[str, int] = {}

        async def handle_pipeline(job: JobEnvelope) -> dict[str, Any]:
            return await service.execute_simulation_job(job)

        async def handle_flaky(job: JobEnvelope) -> dict[str, Any]:
            key = str(job.payload["seq"])
            count = flaky_attempts.get(key, 0) + 1
            flaky_attempts[key] = count
            if job.payload.get("poison"):
                raise RuntimeError(f"Permanent failure for poison job {key}")
            if count < 3:
                raise RuntimeError(f"Transient glitch #{count} for job {key}")
            return {"recovered_after": count, "seq": key}

        registry.register(PIPELINE_SIMULATE_TOPIC, handle_pipeline)
        registry.register("resilience.flaky", handle_flaky)

        runner = AsyncWorkerRunner(
            queue,
            registry,
            retry_policy=RetryPolicy(
                max_retries=2,
                base_delay_seconds=0.0,
                max_delay_seconds=0.0,
            ),
        )
        runner.start(concurrency=4, poll_timeout=0.01)

        try:
            storm_results = await asyncio.gather(
                *[
                    service.enqueue_simulation(
                        PipelineSimulationRequest(
                            target_id=PipelineTargetId.ASCII_ENGINE,
                            idempotency_key="idem-storm-pipeline-01",
                        ),
                        correlation_id=f"storm-{idx}",
                    )
                    for idx in range(20)
                ]
            )
            unique_storm_ids = {item.job_id for item in storm_results}
            assert len(unique_storm_ids) == 1

            burst_jobs: list[str] = [next(iter(unique_storm_ids))]
            targets = [
                PipelineTargetId.BACKEND_API,
                PipelineTargetId.ASCII_ENGINE,
                PipelineTargetId.PORTFOLIO_STATIC,
            ]
            for idx in range(15):
                accepted = await service.enqueue_simulation(
                    PipelineSimulationRequest(target_id=targets[idx % len(targets)]),
                    correlation_id=f"burst-pipe-{idx}",
                )
                burst_jobs.append(accepted.job_id)

            for idx in range(12):
                flaky = await queue.enqueue(
                    "resilience.flaky",
                    {"seq": f"transient-{idx}", "poison": False},
                    correlation_id=f"flaky-{idx}",
                )
                burst_jobs.append(flaky.job_id)

            poison_ids: list[str] = []
            for idx in range(4):
                poison = await queue.enqueue(
                    "resilience.flaky",
                    {"seq": f"poison-{idx}", "poison": True},
                    correlation_id=f"poison-{idx}",
                )
                poison_ids.append(poison.job_id)

            deadline = time.monotonic() + 10.0
            while time.monotonic() < deadline:
                metrics = queue.metrics()
                if (
                    metrics.queued == 0
                    and metrics.running == 0
                    and metrics.completed == len(burst_jobs)
                    and metrics.dead_letter == len(poison_ids)
                ):
                    break
                await asyncio.sleep(0.02)

            final_metrics = queue.metrics()
            assert final_metrics.queued == 0
            assert final_metrics.running == 0
            assert final_metrics.completed == len(burst_jobs)
            assert final_metrics.dead_letter == len(poison_ids)

            dlq_ids = {env.job_id for env in queue.list_dead_letters(limit=20)}
            assert dlq_ids == set(poison_ids)
        finally:
            await runner.stop()

    asyncio.run(_run())


def test_queue_backpressure_returns_503_problem_json_under_saturation() -> None:
    cfg = Settings(
        environment="test",
        worker_autostart=False,
        queue_max_size=2,
        workflow_api_token="test-workflow-token-0123456789",
        n8n_event_bridge_enabled=False,
    )
    app = create_app(cfg)
    headers = {"X-API-Key": cfg.workflow_api_token}

    with TestClient(app) as client:
        r1 = client.post("/api/v1/pipelines/runs", headers=headers, json={})
        r2 = client.post("/api/v1/pipelines/runs", headers=headers, json={})
        r3 = client.post("/api/v1/pipelines/runs", headers=headers, json={})

        assert r1.status_code == 202
        assert r2.status_code == 202
        assert r3.status_code == 503
        assert r3.json()["title"] == "Service unavailable"
