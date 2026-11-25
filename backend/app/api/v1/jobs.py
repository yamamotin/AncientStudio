"""Asynchronous job queue telemetry, Dead-Letter Queue, and job inspection routes."""

from __future__ import annotations

from app.api.deps import get_job_queue, require_scopes
from app.core.errors import ResourceNotFoundError
from app.core.security import Scope
from app.queue import JobEnvelope, JobQueue, QueueMetrics
from fastapi import APIRouter, Depends, Query

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
    dependencies=[Depends(require_scopes(Scope.QUEUE_INSPECT))],
)


@router.get(
    "/metrics",
    response_model=QueueMetrics,
    summary="Inspect queue depth, running jobs, completions, and Dead-Letter Queue count",
)
def queue_metrics(queue: JobQueue = Depends(get_job_queue)) -> QueueMetrics:
    return queue.metrics()


@router.get(
    "/dead-letters",
    response_model=list[JobEnvelope],
    summary="Inspect failed jobs routed to the Dead-Letter Queue",
)
def dead_letter_jobs(
    limit: int = Query(default=50, ge=1, le=200),
    queue: JobQueue = Depends(get_job_queue),
) -> list[JobEnvelope]:
    return queue.list_dead_letters(limit=limit)


@router.get(
    "/{job_id}",
    response_model=JobEnvelope,
    summary="Fetch asynchronous job state and execution metadata",
)
def get_job_status(
    job_id: str,
    queue: JobQueue = Depends(get_job_queue),
) -> JobEnvelope:
    job = queue.get_job(job_id)
    if job is None:
        raise ResourceNotFoundError(
            f"No queued or completed job named {job_id}.",
            title="Job not found",
        )
    return job
