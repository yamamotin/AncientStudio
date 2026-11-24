"""Small thread-safe TTL idempotency store.

Swap this for Redis in a multi-instance deployment; the interface stays the same.
"""

from __future__ import annotations

import threading
import time
from collections.abc import Callable
from dataclasses import dataclass
from typing import TypeVar

from app.core.errors import Problem

T = TypeVar("T")


@dataclass(frozen=True)
class _Entry:
    created_at: float
    fingerprint: str
    result: object


class IdempotencyStore:
    """Stores at most one result per key until its TTL expires."""

    def __init__(self, ttl_seconds: int) -> None:
        self._ttl = ttl_seconds
        self._items: dict[str, _Entry] = {}
        self._lock = threading.Lock()

    def get_or_create(
        self,
        key: str,
        fingerprint: str,
        factory: Callable[[], T],
    ) -> tuple[T, bool]:
        now = time.monotonic()
        with self._lock:
            expired = [
                name for name, item in self._items.items() if now - item.created_at >= self._ttl
            ]
            for name in expired:
                self._items.pop(name, None)

            existing = self._items.get(key)
            if existing is not None:
                if existing.fingerprint != fingerprint:
                    raise Problem(
                        409,
                        "Idempotency conflict",
                        "Idempotency-Key was already used with a different payload.",
                    )
                return existing.result, True  # type: ignore[return-value]

            result = factory()
            self._items[key] = _Entry(created_at=now, fingerprint=fingerprint, result=result)
            return result, False
