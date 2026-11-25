"""Asynchronous worker registry and background job execution runner."""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Awaitable, Callable
from typing import Any

from app.core.logging import bind_correlation_id
from app.queue.base import JobQueue
from app.queue.models import JobEnvelope, RetryPolicy

logger = logging.getLogger("ancientstudio.workers")

JobHandler = Callable[[JobEnvelope], Awaitable[dict[str, Any]]]


class WorkerRegistry:
    """Topic-to-handler routing table populated by bounded-context domains."""

    def __init__(self) -> None:
        self._handlers: dict[str, JobHandler] = {}

    def register(self, topic: str, handler: JobHandler) -> None:
        if not topic or not topic.strip():
            raise ValueError("Worker topic must not be empty.")
        self._handlers[topic.strip()] = handler

    def get(self, topic: str) -> JobHandler | None:
        return self._handlers.get(topic)

    def topics(self) -> list[str]:
        return sorted(self._handlers)


class AsyncWorkerRunner:
    """Consumes ``JobQueue`` envelopes, binds correlation IDs, and applies retry/DLQ rules."""

    def __init__(
        self,
        queue: JobQueue,
        registry: WorkerRegistry,
        *,
        retry_policy: RetryPolicy | None = None,
    ) -> None:
        self._queue = queue
        self._registry = registry
        self._retry_policy = retry_policy or RetryPolicy()
        self._tasks: list[asyncio.Task[None]] = []
        self._running = False

    @property
    def is_running(self) -> bool:
        return self._running

    async def process_one(self, *, timeout: float = 0.05) -> JobEnvelope | None:
        """Dequeue and execute at most one ready job; deterministic for both runtime and tests."""
        job = await self._queue.dequeue(timeout=timeout)
        if job is None:
            return None

        handler = self._registry.get(job.topic)
        with bind_correlation_id(job.correlation_id):
            if handler is None:
                error_msg = f"No worker handler registered for topic '{job.topic}'."
                logger.error(
                    "job_unhandled_topic",
                    extra={"job_id": job.job_id, "topic": job.topic},
                )
                return await self._queue.fail(job.job_id, error_msg, retry_delay_seconds=0.0)

            try:
                result = await handler(job)
                completed = await self._queue.complete(job.job_id, result)
                logger.info(
                    "job_completed",
                    extra={"job_id": job.job_id, "topic": job.topic},
                )
                return completed
            except Exception as exc:
                delay = self._retry_policy.compute_delay(job.attempts)
                failed = await self._queue.fail(
                    job.job_id,
                    f"{type(exc).__name__}: {exc}",
                    retry_delay_seconds=delay,
                )
                logger.warning(
                    "job_failed",
                    extra={
                        "job_id": job.job_id,
                        "topic": job.topic,
                    },
                )
                return failed

    async def _worker_loop(self, poll_timeout: float) -> None:
        while self._running:
            await self.process_one(timeout=poll_timeout)

    def start(self, *, concurrency: int = 2, poll_timeout: float = 0.1) -> None:
        """Spawn background ``asyncio.Task`` workers inside the active event loop."""
        if self._running:
            return
        self._running = True
        for idx in range(max(1, concurrency)):
            task = asyncio.create_task(
                self._worker_loop(poll_timeout),
                name=f"ancientstudio-worker-{idx}",
            )
            self._tasks.append(task)

    async def stop(self) -> None:
        """Gracefully stop background worker tasks."""
        self._running = False
        if not self._tasks:
            return
        for task in self._tasks:
            task.cancel()
        await asyncio.gather(*self._tasks, return_exceptions=True)
        self._tasks.clear()
