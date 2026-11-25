"""Redis-backed ``JobQueue`` adapter supporting deduplication, delayed retries, and DLQ."""

from __future__ import annotations

import asyncio
import logging
import time
from collections.abc import Callable, Mapping
from typing import Any, Protocol, runtime_checkable

from app.core.config import Settings
from app.core.errors import ResourceNotFoundError, ServiceUnavailableError
from app.core.time import utc_now
from app.queue.base import JobQueue
from app.queue.memory import InMemoryJobQueue
from app.queue.models import JobEnvelope, JobStatus, QueueMetrics

logger = logging.getLogger("ancientstudio.queue")


@runtime_checkable
class SyncRedisQueueClient(Protocol):
    """Subset of ``redis.Redis`` commands used by ``RedisJobQueue``."""

    def hget(self, name: str, key: str) -> str | None: ...

    def hset(self, name: str, key: str, value: str) -> int: ...

    def hsetnx(self, name: str, key: str, value: str) -> int: ...

    def hvals(self, name: str) -> list[str]: ...

    def rpush(self, name: str, *values: str) -> int: ...

    def lpop(self, name: str) -> str | None: ...

    def lpush(self, name: str, *values: str) -> int: ...

    def ltrim(self, name: str, start: int, end: int) -> bool: ...

    def lrange(self, name: str, start: int, end: int) -> list[str]: ...

    def llen(self, name: str) -> int: ...

    def zadd(self, name: str, mapping: Mapping[str, float]) -> int: ...

    def zrangebyscore(self, name: str, min: float, max: float) -> list[str]: ...

    def zrem(self, name: str, *values: str) -> int: ...

    def incr(self, name: str, amount: int = 1) -> int: ...

    def get(self, name: str) -> str | None: ...

    def ping(self) -> bool: ...


class RedisJobQueue:
    """Distributed asynchronous job queue backed by Redis hashes, lists, and sorted sets."""

    backend_name = "redis"

    def __init__(
        self,
        client: SyncRedisQueueClient,
        *,
        key_prefix: str = "ancientstudio",
        max_size: int = 1000,
        default_max_retries: int = 3,
        max_dead_letters: int = 500,
        clock: Callable[[], float] = time.time,
    ) -> None:
        self._client = client
        self._max_size = max_size
        self._default_max_retries = default_max_retries
        self._max_dead_letters = max_dead_letters
        self._clock = clock

        base = f"{key_prefix.rstrip(':')}:queue"
        self._jobs_key = f"{base}:jobs"
        self._ready_key = f"{base}:ready"
        self._delayed_key = f"{base}:delayed"
        self._idem_key = f"{base}:idem"
        self._dlq_key = f"{base}:dlq"
        self._seq_key = f"{base}:total_enqueued"

    def _enqueue_sync(
        self,
        topic: str,
        payload: dict[str, Any],
        correlation_id: str,
        max_retries: int | None,
        idempotency_key: str | None,
    ) -> JobEnvelope:
        idem_field = f"{topic}:{idempotency_key}" if idempotency_key else None
        if idem_field is not None:
            existing_id = self._client.hget(self._idem_key, idem_field)
            if existing_id:
                existing_raw = self._client.hget(self._jobs_key, existing_id)
                if existing_raw:
                    return JobEnvelope.model_validate_json(existing_raw)

        pending_depth = self._client.llen(self._ready_key)
        if pending_depth >= self._max_size:
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

        if idem_field is not None:
            claimed = self._client.hsetnx(self._idem_key, idem_field, envelope.job_id)
            if not claimed:
                winner_id = self._client.hget(self._idem_key, idem_field)
                if winner_id:
                    winner_raw = self._client.hget(self._jobs_key, winner_id)
                    if winner_raw:
                        return JobEnvelope.model_validate_json(winner_raw)

        self._client.hset(self._jobs_key, envelope.job_id, envelope.model_dump_json())
        self._client.rpush(self._ready_key, envelope.job_id)
        self._client.incr(self._seq_key)
        return envelope

    async def enqueue(
        self,
        topic: str,
        payload: dict[str, Any],
        *,
        correlation_id: str = "unknown",
        max_retries: int | None = None,
        idempotency_key: str | None = None,
    ) -> JobEnvelope:
        return await asyncio.to_thread(
            self._enqueue_sync,
            topic,
            payload,
            correlation_id,
            max_retries,
            idempotency_key,
        )

    def _promote_due_delayed_sync(self) -> None:
        due_ids = self._client.zrangebyscore(self._delayed_key, 0.0, self._clock())
        for job_id in due_ids:
            if self._client.zrem(self._delayed_key, job_id):
                self._client.rpush(self._ready_key, job_id)

    def _try_dequeue_sync(self) -> JobEnvelope | None:
        self._promote_due_delayed_sync()
        job_id = self._client.lpop(self._ready_key)
        if not job_id:
            return None
        raw = self._client.hget(self._jobs_key, job_id)
        if not raw:
            return None
        job = JobEnvelope.model_validate_json(raw)
        now = utc_now()
        job.attempts += 1
        job.status = JobStatus.RUNNING
        job.started_at = job.started_at or now
        job.updated_at = now
        self._client.hset(self._jobs_key, job.job_id, job.model_dump_json())
        return job

    async def dequeue(self, *, timeout: float = 0.1) -> JobEnvelope | None:
        deadline = time.monotonic() + max(0.0, timeout)
        while True:
            job = await asyncio.to_thread(self._try_dequeue_sync)
            if job is not None:
                return job
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                return None
            await asyncio.sleep(min(0.01, remaining))

    def _complete_sync(
        self, job_id: str, result: dict[str, Any] | None
    ) -> JobEnvelope:
        raw = self._client.hget(self._jobs_key, job_id)
        if not raw:
            raise ResourceNotFoundError(f"Unknown job: {job_id}")
        job = JobEnvelope.model_validate_json(raw)
        now = utc_now()
        job.status = JobStatus.COMPLETED
        job.result = dict(result) if result is not None else {}
        job.last_error = None
        job.updated_at = now
        job.finished_at = now
        self._client.hset(self._jobs_key, job.job_id, job.model_dump_json())
        return job

    async def complete(
        self, job_id: str, result: dict[str, Any] | None = None
    ) -> JobEnvelope:
        return await asyncio.to_thread(self._complete_sync, job_id, result)

    def _fail_sync(
        self, job_id: str, error: str, retry_delay_seconds: float
    ) -> JobEnvelope:
        raw = self._client.hget(self._jobs_key, job_id)
        if not raw:
            raise ResourceNotFoundError(f"Unknown job: {job_id}")
        job = JobEnvelope.model_validate_json(raw)
        now = utc_now()
        job.last_error = error
        job.updated_at = now

        if job.attempts <= job.max_retries:
            job.status = JobStatus.RETRYING
            self._client.hset(self._jobs_key, job.job_id, job.model_dump_json())
            delay = max(0.0, retry_delay_seconds)
            if delay <= 0:
                self._client.rpush(self._ready_key, job.job_id)
            else:
                self._client.zadd(self._delayed_key, {job.job_id: self._clock() + delay})
        else:
            job.status = JobStatus.DEAD_LETTER
            job.finished_at = now
            self._client.hset(self._jobs_key, job.job_id, job.model_dump_json())
            self._client.lpush(self._dlq_key, job.job_id)
            self._client.ltrim(self._dlq_key, 0, self._max_dead_letters - 1)

        return job

    async def fail(
        self, job_id: str, error: str, *, retry_delay_seconds: float = 0.0
    ) -> JobEnvelope:
        return await asyncio.to_thread(
            self._fail_sync, job_id, error, retry_delay_seconds
        )

    def get_job(self, job_id: str) -> JobEnvelope | None:
        raw = self._client.hget(self._jobs_key, job_id)
        return JobEnvelope.model_validate_json(raw) if raw else None

    def list_dead_letters(self, *, limit: int = 50) -> list[JobEnvelope]:
        ids = self._client.lrange(self._dlq_key, 0, max(0, limit - 1))
        items: list[JobEnvelope] = []
        for job_id in ids:
            raw = self._client.hget(self._jobs_key, job_id)
            if raw:
                items.append(JobEnvelope.model_validate_json(raw))
        return items

    def metrics(self) -> QueueMetrics:
        counts = {
            JobStatus.QUEUED: 0,
            JobStatus.RUNNING: 0,
            JobStatus.RETRYING: 0,
            JobStatus.COMPLETED: 0,
            JobStatus.DEAD_LETTER: 0,
        }
        for raw in self._client.hvals(self._jobs_key):
            job = JobEnvelope.model_validate_json(raw)
            if job.status in counts:
                counts[job.status] += 1
        seq_raw = self._client.get(self._seq_key)
        total_enqueued = int(seq_raw) if seq_raw and seq_raw.isdigit() else 0
        return QueueMetrics(
            queued=counts[JobStatus.QUEUED],
            running=counts[JobStatus.RUNNING],
            retrying=counts[JobStatus.RETRYING],
            completed=counts[JobStatus.COMPLETED],
            dead_letter=counts[JobStatus.DEAD_LETTER],
            total_enqueued=total_enqueued,
        )


def create_job_queue(settings: Settings) -> JobQueue:
    """Create a ``RedisJobQueue`` when ``redis_url`` is reachable, falling back to memory."""
    if not settings.redis_url:
        return InMemoryJobQueue(
            max_size=settings.queue_max_size,
            default_max_retries=settings.worker_max_retries,
        )

    try:
        import redis

        client = redis.Redis.from_url(
            settings.redis_url,
            decode_responses=True,
            socket_connect_timeout=settings.redis_connect_timeout_seconds,
            socket_timeout=settings.redis_connect_timeout_seconds,
        )
        client.ping()
        return RedisJobQueue(
            client,
            key_prefix=settings.redis_key_prefix,
            max_size=settings.queue_max_size,
            default_max_retries=settings.worker_max_retries,
        )
    except Exception as exc:
        if settings.redis_fallback_to_memory:
            logger.warning(
                "queue_redis_unreachable_fallback_memory",
                extra={"error": str(exc)},
            )
            return InMemoryJobQueue(
                max_size=settings.queue_max_size,
                default_max_retries=settings.worker_max_retries,
            )
        raise ServiceUnavailableError(
            "Redis job queue backend is configured without fallback and could not be reached."
        ) from exc
