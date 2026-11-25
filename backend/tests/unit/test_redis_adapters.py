"""Unit tests for Fase 2 Redis Cache & JobQueue adapters, safe codec, and memory fallback."""

from __future__ import annotations

import asyncio
from collections.abc import Iterator, Mapping

import pytest
from app.cache import (
    IdempotencyStore,
    InMemoryTTLCache,
    RedisTTLCache,
    create_cache_backend,
    decode_cache_value,
)
from app.core.config import Settings
from app.core.errors import ConflictError, ServiceUnavailableError
from app.core.time import utc_now
from app.domains.etl import ETLRecord
from app.domains.gateway import InvoiceOut
from app.queue import (
    InMemoryJobQueue,
    JobEnvelope,
    JobStatus,
    RedisJobQueue,
    RetryPolicy,
    create_job_queue,
)
from app.workers import AsyncWorkerRunner, WorkerRegistry

pytestmark = pytest.mark.unit


class FakeRedisServer:
    """Deterministic in-memory emulator implementing exact Redis commands & TTLs."""

    def __init__(self) -> None:
        self.now = 1_700_000_000.0
        self._strings: dict[str, tuple[str, float | None]] = {}
        self._hashes: dict[str, dict[str, str]] = {}
        self._lists: dict[str, list[str]] = {}
        self._zsets: dict[str, dict[str, float]] = {}

    def _purge_if_expired(self, key: str) -> None:
        entry = self._strings.get(key)
        if entry is not None and entry[1] is not None and self.now >= entry[1]:
            self._strings.pop(key, None)

    def ping(self) -> bool:
        return True

    def get(self, name: str) -> str | None:
        self._purge_if_expired(name)
        entry = self._strings.get(name)
        return entry[0] if entry is not None else None

    def set(
        self,
        name: str,
        value: str,
        *,
        ex: int | None = None,
        nx: bool = False,
    ) -> bool | None:
        self._purge_if_expired(name)
        if nx and name in self._strings:
            return None
        expires_at = (self.now + ex) if ex is not None else None
        self._strings[name] = (value, expires_at)
        return True

    def delete(self, *names: str) -> int:
        removed = 0
        for name in names:
            if self._strings.pop(name, None) is not None:
                removed += 1
        return removed

    def scan_iter(self, match: str | None = None) -> Iterator[str]:
        prefix = (match or "*").rstrip("*")
        for key in list(self._strings):
            self._purge_if_expired(key)
            if key in self._strings and key.startswith(prefix):
                yield key

    def incr(self, name: str, amount: int = 1) -> int:
        current = int(self.get(name) or "0") + amount
        self.set(name, str(current))
        return current

    def hget(self, name: str, key: str) -> str | None:
        return self._hashes.get(name, {}).get(key)

    def hset(self, name: str, key: str, value: str) -> int:
        bucket = self._hashes.setdefault(name, {})
        is_new = 0 if key in bucket else 1
        bucket[key] = value
        return is_new

    def hsetnx(self, name: str, key: str, value: str) -> int:
        bucket = self._hashes.setdefault(name, {})
        if key in bucket:
            return 0
        bucket[key] = value
        return 1

    def hvals(self, name: str) -> list[str]:
        return list(self._hashes.get(name, {}).values())

    def rpush(self, name: str, *values: str) -> int:
        lst = self._lists.setdefault(name, [])
        lst.extend(values)
        return len(lst)

    def lpop(self, name: str) -> str | None:
        lst = self._lists.get(name)
        return lst.pop(0) if lst else None

    def lpush(self, name: str, *values: str) -> int:
        lst = self._lists.setdefault(name, [])
        for val in values:
            lst.insert(0, val)
        return len(lst)

    def ltrim(self, name: str, start: int, end: int) -> bool:
        lst = self._lists.get(name)
        if lst is not None:
            self._lists[name] = lst[start : end + 1]
        return True

    def lrange(self, name: str, start: int, end: int) -> list[str]:
        lst = self._lists.get(name, [])
        return lst[start : end + 1]

    def llen(self, name: str) -> int:
        return len(self._lists.get(name, []))

    def zadd(self, name: str, mapping: Mapping[str, float]) -> int:
        zset = self._zsets.setdefault(name, {})
        added = 0
        for member, score in mapping.items():
            if member not in zset:
                added += 1
            zset[member] = score
        return added

    def zrangebyscore(self, name: str, min: float, max: float) -> list[str]:
        zset = self._zsets.get(name, {})
        return [
            member
            for member, score in sorted(zset.items(), key=lambda item: item[1])
            if min <= score <= max
        ]

    def zrem(self, name: str, *values: str) -> int:
        zset = self._zsets.get(name, {})
        removed = 0
        for val in values:
            if zset.pop(val, None) is not None:
                removed += 1
        return removed


def test_redis_ttl_cache_roundtrips_pydantic_lists_and_idempotency() -> None:
    fake_redis = FakeRedisServer()
    cache = RedisTTLCache(fake_redis, default_ttl_seconds=30, key_prefix="test")

    records = [
        ETLRecord(
            id="TX-1",
            description="Venda",
            amount=100.5,
            currency="BRL",
            category="receita",
            occurred_at="2026-11-01",  # type: ignore[arg-type]
        )
    ]
    cache.set("etl:ledger", records)
    loaded = cache.get("etl:ledger")
    assert loaded == records

    # Verify IdempotencyStore works transparently over RedisTTLCache.
    store = IdempotencyStore(ttl_seconds=30, backend=cache)
    invoice = InvoiceOut(
        invoice_id="INV-REDIS-1",
        invoice_key="NFE-99",
        document_type="nfe",
        status="accepted",
        currency="BRL",
        gross=100.0,
        tax=0.1,
        net=90.0,
        validated_at=utc_now(),
        checks=["signature_verified"],
    )

    first, replayed_1 = store.get_or_create("idem-redis-1", "fp-1", lambda: invoice)
    second, replayed_2 = store.get_or_create("idem-redis-1", "fp-1", lambda: invoice)
    assert replayed_1 is False
    assert replayed_2 is True
    assert first.invoice_id == second.invoice_id == "INV-REDIS-1"

    with pytest.raises(ConflictError):
        store.get_or_create("idem-redis-1", "fp-2", lambda: invoice)

    # Advance virtual Redis clock beyond TTL.
    fake_redis.now += 31.0
    assert cache.get("etl:ledger") is None

    # Codec security check: reject non-app.* class names.
    with pytest.raises(ValueError, match="Disallowed cached model class"):
        decode_cache_value('{"__kind__": "pydantic", "cls": "os:system", "data": {}}')


def test_redis_job_queue_executes_retries_delayed_backoff_and_dlq() -> None:
    async def scenario() -> None:
        fake_redis = FakeRedisServer()
        queue = RedisJobQueue(
            fake_redis,
            key_prefix="test",
            max_size=10,
            default_max_retries=1,
            clock=lambda: fake_redis.now,
        )
        registry = WorkerRegistry()
        attempts_seen = 0

        async def flaky_handler(job: JobEnvelope) -> dict[str, object]:
            nonlocal attempts_seen
            attempts_seen += 1
            raise RuntimeError(f"boom-{job.attempts}")

        registry.register("redis.flaky", flaky_handler)
        runner = AsyncWorkerRunner(
            queue,
            registry,
            retry_policy=RetryPolicy(max_retries=1, base_delay_seconds=5.0),
        )

        enqueued = await queue.enqueue(
            "redis.flaky",
            {"item": 1},
            correlation_id="corr-redis-q",
            idempotency_key="dedup-redis",
        )
        dup = await queue.enqueue(
            "redis.flaky",
            {"item": 1},
            correlation_id="corr-redis-q",
            idempotency_key="dedup-redis",
        )
        assert dup.job_id == enqueued.job_id

        # Attempt 1 fails and schedules delayed retry at now + 5s.
        first = await runner.process_one(timeout=0.01)
        assert first is not None
        assert first.status == JobStatus.RETRYING

        # Before 5s elapse, queue does not release the delayed job.
        premature = await runner.process_one(timeout=0.01)
        assert premature is None

        # Advance virtual Redis clock past backoff window; Attempt 2 fails -> DLQ.
        fake_redis.now += 6.0
        second = await runner.process_one(timeout=0.01)
        assert second is not None
        assert second.status == JobStatus.DEAD_LETTER
        assert attempts_seen == 2

        dlq = queue.list_dead_letters()
        assert [item.job_id for item in dlq] == [enqueued.job_id]
        metrics = queue.metrics()
        assert metrics.dead_letter == 1
        assert metrics.total_enqueued == 1

    asyncio.run(scenario())


def test_unreachable_redis_falls_back_to_memory_or_raises_when_strict() -> None:
    fallback_cfg = Settings(
        environment="test",
        redis_url="redis://127.0.0.1:6399/0",
        redis_connect_timeout_seconds=0.05,
        redis_fallback_to_memory=True,
    )
    cache = create_cache_backend(fallback_cfg)
    queue = create_job_queue(fallback_cfg)
    assert isinstance(cache, InMemoryTTLCache)
    assert isinstance(queue, InMemoryJobQueue)

    strict_cfg = Settings(
        environment="test",
        redis_url="redis://127.0.0.1:6399/0",
        redis_connect_timeout_seconds=0.05,
        redis_fallback_to_memory=False,
    )
    with pytest.raises(ServiceUnavailableError):
        create_cache_backend(strict_cfg)
    with pytest.raises(ServiceUnavailableError):
        create_job_queue(strict_cfg)
