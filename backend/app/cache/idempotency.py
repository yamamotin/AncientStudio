"""Unified idempotency store built on top of ``CacheBackend`` without duplicating TTL logic."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any, TypeVar

from app.cache.base import CacheBackend
from app.cache.memory import InMemoryTTLCache
from app.core.errors import ConflictError

T = TypeVar("T")


@dataclass(frozen=True)
class IdempotencyRecord:
    """Stored idempotent response envelope tied to a payload fingerprint."""

    fingerprint: str
    result: Any


class IdempotencyStore:
    """Guarantees at-most-once execution per key within its TTL window.

    Delegates storage, locking, and expiration to ``CacheBackend`` under a
    dedicated ``idempotency:`` namespace so a single Redis or in-memory backend
    serves both domain caching and idempotency without duplicated machinery.
    """

    def __init__(
        self,
        ttl_seconds: int,
        *,
        backend: CacheBackend | None = None,
        namespace: str = "idempotency",
    ) -> None:
        self._ttl_seconds = ttl_seconds
        self._backend: CacheBackend = backend or InMemoryTTLCache(
            default_ttl_seconds=ttl_seconds
        )
        self._namespace = namespace

    def _namespaced_key(self, key: str) -> str:
        return f"{self._namespace}:{key}"

    def get_or_create(
        self,
        key: str,
        fingerprint: str,
        factory: Callable[[], T],
    ) -> tuple[T, bool]:
        """Return ``(result, replayed)`` or raise ``ConflictError`` (409) on payload mismatch."""
        storage_key = self._namespaced_key(key)

        def build_record() -> IdempotencyRecord:
            return IdempotencyRecord(fingerprint=fingerprint, result=factory())

        record, replayed = self._backend.get_or_set(
            storage_key,
            build_record,
            ttl_seconds=self._ttl_seconds,
        )
        if replayed and record.fingerprint != fingerprint:
            raise ConflictError(
                "Idempotency-Key was already used with a different payload.",
                title="Idempotency conflict",
            )
        return record.result, replayed
