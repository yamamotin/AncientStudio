"""Event and job contracts, states, and retry policy models."""

from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Any

from app.core.time import utc_now
from pydantic import BaseModel, Field


class JobStatus(str, Enum):
    """Lifecycle states of an asynchronous background job."""

    QUEUED = "queued"
    RUNNING = "running"
    RETRYING = "retrying"
    COMPLETED = "completed"
    FAILED = "failed"
    DEAD_LETTER = "dead_letter"


class RetryPolicy(BaseModel):
    """Configurable exponential backoff policy before routing a job to Dead-Letter Queue."""

    max_retries: int = Field(default=3, ge=0, le=20)
    base_delay_seconds: float = Field(default=0.5, ge=0.0, le=300.0)
    max_delay_seconds: float = Field(default=30.0, ge=0.0, le=3600.0)
    backoff_multiplier: float = Field(default=2.0, ge=1.0, le=10.0)

    def compute_delay(self, attempt: int) -> float:
        """Compute retry delay (seconds) for 1-based failed ``attempt``."""
        if self.base_delay_seconds <= 0:
            return 0.0
        exponent = max(0, attempt - 1)
        raw = self.base_delay_seconds * (self.backoff_multiplier**exponent)
        return float(min(self.max_delay_seconds, raw))


class DomainEvent(BaseModel):
    """Immutable domain event envelope published across bounded contexts."""

    event_id: str = Field(default_factory=lambda: f"evt-{uuid.uuid4().hex[:16]}")
    event_type: str = Field(min_length=3, max_length=120)
    source: str = Field(min_length=2, max_length=80)
    correlation_id: str = Field(default="unknown", max_length=120)
    occurred_at: datetime = Field(default_factory=utc_now)
    payload: dict[str, Any] = Field(default_factory=dict)


class JobEnvelope(BaseModel):
    """Tracked asynchronous job envelope with retry and Dead-Letter Queue metadata."""

    job_id: str = Field(default_factory=lambda: f"job-{uuid.uuid4().hex[:16]}")
    topic: str = Field(min_length=3, max_length=120)
    payload: dict[str, Any] = Field(default_factory=dict)
    correlation_id: str = Field(default="unknown", max_length=120)
    idempotency_key: str | None = Field(default=None, max_length=120)
    status: JobStatus = JobStatus.QUEUED
    attempts: int = Field(default=0, ge=0)
    max_retries: int = Field(default=3, ge=0, le=20)
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)
    started_at: datetime | None = None
    finished_at: datetime | None = None
    result: dict[str, Any] | None = None
    last_error: str | None = None


class QueueMetrics(BaseModel):
    """Operational telemetry snapshot of the job queue and Dead-Letter Queue."""

    queued: int
    running: int
    retrying: int
    completed: int
    dead_letter: int
    total_enqueued: int
