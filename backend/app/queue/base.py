"""Protocols for asynchronous job queues and domain event buses."""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Awaitable, Callable
from typing import Any, Protocol, runtime_checkable

from app.queue.models import DomainEvent, JobEnvelope, QueueMetrics

EventSubscriber = Callable[[DomainEvent], Awaitable[None]]


@runtime_checkable
class JobQueue(Protocol):
    """Queue backend contract (in-memory async locally, Redis Streams/Broker in production)."""

    backend_name: str

    async def enqueue(
        self,
        topic: str,
        payload: dict[str, Any],
        *,
        correlation_id: str,
        max_retries: int | None = None,
        idempotency_key: str | None = None,
    ) -> JobEnvelope: ...

    async def dequeue(self, *, timeout: float = 0.1) -> JobEnvelope | None: ...

    async def complete(
        self, job_id: str, result: dict[str, Any] | None = None
    ) -> JobEnvelope: ...

    async def fail(
        self, job_id: str, error: str, *, retry_delay_seconds: float = 0.0
    ) -> JobEnvelope: ...

    def get_job(self, job_id: str) -> JobEnvelope | None: ...

    def list_dead_letters(self, *, limit: int = 50) -> list[JobEnvelope]: ...

    def metrics(self) -> QueueMetrics: ...


class EventBus:
    """In-process async domain event dispatcher decoupling publishers from subscribers."""

    def __init__(self, *, max_history: int = 200) -> None:
        self._subscribers: dict[str, list[EventSubscriber]] = defaultdict(list)
        self._history: list[DomainEvent] = []
        self._max_history = max_history

    def subscribe(self, event_type: str, subscriber: EventSubscriber) -> None:
        self._subscribers[event_type].append(subscriber)

    async def publish(self, event: DomainEvent) -> None:
        self._history.append(event)
        if len(self._history) > self._max_history:
            del self._history[: len(self._history) - self._max_history]

        handlers = [
            *self._subscribers.get(event.event_type, ()),
            *self._subscribers.get("*", ()),
        ]
        for handler in handlers:
            await handler(event)

    def recent_events(self, *, limit: int = 50) -> list[DomainEvent]:
        return list(reversed(self._history[-limit:]))
