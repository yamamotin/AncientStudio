"""Cache protocol and shared telemetry contracts."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any, Protocol, TypeVar, runtime_checkable

T = TypeVar("T")


@dataclass(frozen=True)
class CacheStats:
    """Point-in-time cache hit/miss and occupancy snapshot."""

    hits: int
    misses: int
    sets: int
    evictions: int
    size: int


@runtime_checkable
class CacheBackend(Protocol):
    """Pluggable key-value cache contract (in-memory TTL locally, Redis in multi-replica)."""

    def get(self, key: str) -> Any | None: ...

    def set(self, key: str, value: Any, *, ttl_seconds: int | None = None) -> None: ...

    def get_or_set(
        self,
        key: str,
        factory: Callable[[], T],
        *,
        ttl_seconds: int | None = None,
    ) -> tuple[T, bool]:
        """Atomically return ``(existing_value, True)`` on hit or ``(factory(), False)`` on miss."""
        ...

    def delete(self, key: str) -> bool: ...

    def clear(self) -> None: ...

    def stats(self) -> CacheStats: ...
