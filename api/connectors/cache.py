"""Thread-safe in-memory TTL cache for public API connectors."""

from __future__ import annotations

from collections import OrderedDict
from dataclasses import dataclass
import threading
import time
from typing import Any


@dataclass(frozen=True)
class TTLCacheStats:
    """Telemetry snapshot for in-memory connector cache."""

    hits: int
    misses: int
    sets: int
    evictions: int
    size: int


class ConnectorTTLCache:
    """Bounded LRU + monotonic TTL in-memory cache safe across threads and async workers."""

    def __init__(self, default_ttl_seconds: float = 900.0, max_entries: int = 512) -> None:
        self._default_ttl = max(0.05, float(default_ttl_seconds))
        self._max_entries = max(16, int(max_entries))
        self._entries: OrderedDict[str, tuple[float, Any]] = OrderedDict()
        self._lock = threading.RLock()
        self._hits = 0
        self._misses = 0
        self._sets = 0
        self._evictions = 0

    def get(self, key: str) -> tuple[bool, Any]:
        """Return ``(hit, value)`` evicting expired entries lazily."""
        now = time.monotonic()
        with self._lock:
            entry = self._entries.get(key)
            if entry is None:
                self._misses += 1
                return False, None
            expires_at, value = entry
            if now >= expires_at:
                del self._entries[key]
                self._misses += 1
                return False, None
            self._entries.move_to_end(key)
            self._hits += 1
            return True, value

    def set(self, key: str, value: Any, *, ttl_seconds: float | None = None) -> None:
        """Store ``value`` under ``key`` with an explicit or default monotonic TTL."""
        ttl = self._default_ttl if ttl_seconds is None else max(0.05, float(ttl_seconds))
        expires_at = time.monotonic() + ttl
        with self._lock:
            if key in self._entries:
                self._entries.move_to_end(key)
            self._entries[key] = (expires_at, value)
            self._sets += 1
            while len(self._entries) > self._max_entries:
                self._entries.popitem(last=False)
                self._evictions += 1

    def clear(self) -> None:
        """Remove all cached entries while resetting counters."""
        with self._lock:
            self._entries.clear()
            self._hits = 0
            self._misses = 0
            self._sets = 0
            self._evictions = 0

    def stats(self) -> TTLCacheStats:
        with self._lock:
            return TTLCacheStats(
                hits=self._hits,
                misses=self._misses,
                sets=self._sets,
                evictions=self._evictions,
                size=len(self._entries),
            )
