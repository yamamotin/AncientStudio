"""Unit tests for EventBus, InMemoryJobQueue, RetryPolicy, DLQ, and AsyncWorkerRunner."""

from __future__ import annotations

import asyncio

import pytest
from app.core.errors import ServiceUnavailableError
from app.core.logging import get_current_correlation_id
from app.queue import (
    DomainEvent,
    EventBus,
    InMemoryJobQueue,
    JobEnvelope,
    JobStatus,
    RetryPolicy,
)
from app.workers import AsyncWorkerRunner, WorkerRegistry

pytestmark = pytest.mark.unit


def test_worker_runner_executes_job_and_propagates_correlation_id() -> None:
    async def scenario() -> None:
        queue = InMemoryJobQueue()
        registry = WorkerRegistry()
        observed_corr: list[str] = []

        async def handle_echo(job: JobEnvelope) -> dict[str, object]:
            observed_corr.append(get_current_correlation_id())
            return {"echo": job.payload["value"]}

        registry.register("demo.echo", handle_echo)
        runner = AsyncWorkerRunner(queue, registry)

        enqueued = await queue.enqueue(
            "demo.echo",
            {"value": 42},
            correlation_id="corr-unit-99",
            idempotency_key="dedup-1",
        )
        duplicate = await queue.enqueue(
            "demo.echo",
            {"value": 42},
            correlation_id="corr-unit-99",
            idempotency_key="dedup-1",
        )
        assert duplicate.job_id == enqueued.job_id

        processed = await runner.process_one()
        assert processed is not None
        assert processed.status == JobStatus.COMPLETED
        assert processed.result == {"echo": 42}
        assert observed_corr == ["corr-unit-99"]
        assert queue.metrics().completed == 1

    asyncio.run(scenario())


def test_worker_retries_and_routes_exhausted_jobs_to_dead_letter_queue() -> None:
    async def scenario() -> None:
        queue = InMemoryJobQueue(default_max_retries=1)
        registry = WorkerRegistry()

        async def always_fails(job: JobEnvelope) -> dict[str, object]:
            raise RuntimeError(f"upstream timeout on attempt {job.attempts}")

        registry.register("fragile.task", always_fails)
        runner = AsyncWorkerRunner(
            queue,
            registry,
            retry_policy=RetryPolicy(max_retries=1, base_delay_seconds=0.0),
        )

        job = await queue.enqueue("fragile.task", {"target": "x"}, correlation_id="corr-dlq")

        first_attempt = await runner.process_one()
        assert first_attempt is not None
        assert first_attempt.status == JobStatus.RETRYING
        assert first_attempt.attempts == 1

        second_attempt = await runner.process_one()
        assert second_attempt is not None
        assert second_attempt.status == JobStatus.DEAD_LETTER
        assert second_attempt.attempts == 2
        assert "RuntimeError" in (second_attempt.last_error or "")

        dlq = queue.list_dead_letters()
        assert [item.job_id for item in dlq] == [job.job_id]
        assert queue.metrics().dead_letter == 1

    asyncio.run(scenario())


def test_queue_backpressure_and_event_bus_pubsub() -> None:
    async def scenario() -> None:
        queue = InMemoryJobQueue(max_size=1)
        await queue.enqueue("demo.topic", {}, correlation_id="c1")
        with pytest.raises(ServiceUnavailableError):
            await queue.enqueue("demo.topic", {}, correlation_id="c2")

        bus = EventBus()
        seen: list[str] = []

        async def on_event(event: DomainEvent) -> None:
            seen.append(f"{event.event_type}:{event.correlation_id}")

        bus.subscribe("gateway.invoice.accepted", on_event)
        await bus.publish(
            DomainEvent(
                event_type="gateway.invoice.accepted",
                source="gateway",
                correlation_id="corr-evt-1",
                payload={"invoice_id": "INV-1"},
            )
        )
        assert seen == ["gateway.invoice.accepted:corr-evt-1"]
        assert len(bus.recent_events()) == 1

    asyncio.run(scenario())
