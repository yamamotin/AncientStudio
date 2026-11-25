"""Thread-safe bounded in-memory TTL cache implementation."""

from __future__ import annotations

import threading
import time
from collections import OrderedDict
from collections.abc import Callable
from dataclasses import dataclass
from typing import Any, TypeVar

from app.cache.base import CacheStats

T = TypeVar("T")


@dataclass(frozen=True)
class _CacheItem:
    expires_at: float
    value: Any


class InMemoryTTLCache:
    """Bounded LRU-ordered TTL cache backed by a monotonic clock."""

    def __init__(
        self,
        default_ttl_seconds: int = 300,
        *,
        max_entries: int = 4096,
        clock: Callable[[], float] = time.monotonic,
    ) -> None:
        if default_ttl_seconds < 1:
            raise ValueError("default_ttl_seconds must be >= 1")
        if max_entries < 1:
            raise ValueError("max_entries must be >= 1")
        self._default_ttl = default_ttl_seconds
        self._max_entries = max_entries
        self._clock = clock
        self._items: OrderedDict[str, _CacheItem] = OrderedDict()
        self._lock = threading.RLock()
        self._hits = 0
        self._misses = 0
        self._sets = 0
        self._evictions = 0

    def _purge_expired_locked(self, now: float) -> None:
        expired_keys = [
            key for key, item in self._items.items() if now >= item.expires_at
        ]
        for key in expired_keys:
            self._items.pop(key, None)
            self._evictions += 1

    def _ensure_capacity_locked(self) -> None:
        while len(self._items) >= self._max_entries:
            self._items.popitem(last=False)
            self._evictions += 1

    def get(self, key: str) -> Any | None:
        now = self._clock()
        with self._lock:
            item = self._items.get(key)
            if item is None:
                self._misses += 1
                return None
            if now >= item.expires_at:
                self._items.pop(key, None)
                self._evictions += 1
                self._misses += 1
                return None
            self._items.move_to_end(key)
            self._hits += 1
            return item.value

    def set(self, key: str, value: Any, *, ttl_seconds: int | None = None) -> None:
        ttl = self._default_ttl if ttl_seconds is None else max(1, ttl_seconds)
        now = self._clock()
        with self._lock:
            self._purge_expired_locked(now)
            if key not in self._items:
                self._ensure_capacity_locked()
            self._items[key] = _CacheItem(expires_at=now + ttl, value=value)
            self._items.move_to_end(key)
            self._sets += 1

    def get_or_set(
        self,
        key: str,
        factory: Callable[[], T],
        *,
        ttl_seconds: int | None = None,
    ) -> tuple[T, bool]:
        ttl = self._default_ttl if ttl_seconds is None else max(1, ttl_seconds)
        now = self._clock()
        with self._lock:
            self._purge_expired_locked(now)
            existing = self._items.get(key)
            if existing is not None:
                self._items.move_to_end(key)
                self._hits += 1
                return existing.value, True

            self._misses += 1
            computed = factory()
            self._ensure_capacity_locked()
            self._items[key] = _CacheItem(expires_at=now + ttl, value=computed)
            self._items.move_to_end(key)
            self._sets += 1
            return computed, False

    def delete(self, key: str) -> bool:
        with self._lock:
            return self._items.pop(key, None) is not None

    def clear(self) -> None:
        with self._lock:
            self._items.clear()

    def stats(self) -> CacheStats:
        now = self._clock()
        with self._lock:
            self._purge_expired_locked(now)
            return CacheStats(
                hits=self._hits,
                misses=self._misses,
                sets=self._sets,
                evictions=self._evictions,
                size=len(self._items),
            )
