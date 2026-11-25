"""Loop-agnostic asynchronous in-memory job queue with retry & Dead-Letter Queue support."""

from __future__ import annotations

import asyncio
import threading
import time
from collections import deque
from typing import Any

from app.core.errors import ResourceNotFoundError, ServiceUnavailableError
from app.core.time import utc_now
from app.queue.models import JobEnvelope, JobStatus, QueueMetrics


class InMemoryJobQueue:
    """Bounded async job queue supporting idempotent enqueue, retries, and DLQ inspection."""

    def __init__(
        self,
        *,
        max_size: int = 1000,
        default_max_retries: int = 3,
        max_dead_letters: int = 500,
    ) -> None:
        self._max_size = max_size
        self._default_max_retries = default_max_retries
        self._max_dead_letters = max_dead_letters

        self._lock = threading.RLock()
        self._ready: deque[tuple[float, str]] = deque()
        self._jobs: dict[str, JobEnvelope] = {}
        self._idempotency_index: dict[str, str] = {}
        self._dead_letters: deque[str] = deque(maxlen=max_dead_letters)
        self._total_enqueued = 0

    async def enqueue(
        self,
        topic: str,
        payload: dict[str, Any],
        *,
        correlation_id: str = "unknown",
        max_retries: int | None = None,
        idempotency_key: str | None = None,
    ) -> JobEnvelope:
        with self._lock:
            if idempotency_key:
                existing_id = self._idempotency_index.get(f"{topic}:{idempotency_key}")
                if existing_id and existing_id in self._jobs:
                    return self._jobs[existing_id].model_copy(deep=True)

            if len(self._ready) >= self._max_size:
                raise ServiceUnavailableError(
                    "Job queue is at maximum capacity; retry shortly."
                )

            now = utc_now()
            envelope = JobEnvelope(
                topic=topic,
                payload=dict(payload),
                correlation_id=correlation_id,
                idempotency_key=idempotency_key,
                status=JobStatus.QUEUED,
                max_retries=(
                    self._default_max_retries if max_retries is None else max_retries
                ),
                created_at=now,
                updated_at=now,
            )
            self._jobs[envelope.job_id] = envelope
            if idempotency_key:
                self._idempotency_index[f"{topic}:{idempotency_key}"] = envelope.job_id
            self._ready.append((time.monotonic(), envelope.job_id))
            self._total_enqueued += 1
            return envelope.model_copy(deep=True)

    def _try_pop_ready_locked(self) -> JobEnvelope | None:
        if not self._ready:
            return None
        now_mono = time.monotonic()
        checked = len(self._ready)
        for _ in range(checked):
            available_at, job_id = self._ready.popleft()
            if available_at > now_mono:
                self._ready.append((available_at, job_id))
                continue
            job = self._jobs.get(job_id)
            if job is None:
                continue
            now_utc = utc_now()
            job.attempts += 1
            job.status = JobStatus.RUNNING
            job.started_at = job.started_at or now_utc
            job.updated_at = now_utc
            return job.model_copy(deep=True)
        return None

    async def dequeue(self, *, timeout: float = 0.1) -> JobEnvelope | None:
        deadline = time.monotonic() + max(0.0, timeout)
        while True:
            with self._lock:
                job = self._try_pop_ready_locked()
                if job is not None:
                    return job
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                return None
            await asyncio.sleep(min(0.01, remaining))

    async def complete(
        self, job_id: str, result: dict[str, Any] | None = None
    ) -> JobEnvelope:
        with self._lock:
            job = self._jobs.get(job_id)
            if job is None:
                raise ResourceNotFoundError(f"Unknown job: {job_id}")
            now = utc_now()
            job.status = JobStatus.COMPLETED
            job.result = dict(result) if result is not None else {}
            job.last_error = None
            job.updated_at = now
            job.finished_at = now
            return job.model_copy(deep=True)

    async def fail(
        self, job_id: str, error: str, *, retry_delay_seconds: float = 0.0
    ) -> JobEnvelope:
        with self._lock:
            job = self._jobs.get(job_id)
            if job is None:
                raise ResourceNotFoundError(f"Unknown job: {job_id}")
            now = utc_now()
            job.last_error = error
            job.updated_at = now

            # First execution is attempt 1; allow up to ``max_retries`` additional retries.
            if job.attempts <= job.max_retries:
                job.status = JobStatus.RETRYING
                available_at = time.monotonic() + max(0.0, retry_delay_seconds)
                self._ready.append((available_at, job.job_id))
            else:
                job.status = JobStatus.DEAD_LETTER
                job.finished_at = now
                self._dead_letters.append(job.job_id)

            return job.model_copy(deep=True)

    def get_job(self, job_id: str) -> JobEnvelope | None:
        with self._lock:
            job = self._jobs.get(job_id)
            return job.model_copy(deep=True) if job is not None else None

    def list_dead_letters(self, *, limit: int = 50) -> list[JobEnvelope]:
        with self._lock:
            ids = list(self._dead_letters)[-limit:]
            return [
                self._jobs[jid].model_copy(deep=True)
                for jid in reversed(ids)
                if jid in self._jobs
            ]

    def metrics(self) -> QueueMetrics:
        with self._lock:
            counts = {
                JobStatus.QUEUED: 0,
                JobStatus.RUNNING: 0,
                JobStatus.RETRYING: 0,
                JobStatus.COMPLETED: 0,
                JobStatus.DEAD_LETTER: 0,
            }
            for job in self._jobs.values():
                if job.status in counts:
                    counts[job.status] += 1
            return QueueMetrics(
                queued=counts[JobStatus.QUEUED],
                running=counts[JobStatus.RUNNING],
                retrying=counts[JobStatus.RETRYING],
                completed=counts[JobStatus.COMPLETED],
                dead_letter=counts[JobStatus.DEAD_LETTER],
                total_enqueued=self._total_enqueued,
            )
