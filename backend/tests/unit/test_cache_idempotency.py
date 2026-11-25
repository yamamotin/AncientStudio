"""Unit tests for InMemoryTTLCache and unified IdempotencyStore."""

from __future__ import annotations

import pytest
from app.cache import IdempotencyStore, InMemoryTTLCache
from app.core.errors import ConflictError

pytestmark = pytest.mark.unit


def test_ttl_cache_expires_and_evicts_deterministically() -> None:
    now = 1000.0
    cache = InMemoryTTLCache(
        default_ttl_seconds=10,
        max_entries=2,
        clock=lambda: now,
    )

    cache.set("k1", "v1")
    cache.set("k2", "v2")
    assert cache.get("k1") == "v1"  # k1 becomes most-recently-used

    # Inserting k3 must evict k2 (least-recently-used).
    cache.set("k3", "v3")
    assert cache.get("k2") is None
    assert cache.get("k1") == "v1"
    assert cache.get("k3") == "v3"

    # Advance virtual clock past TTL.
    now += 11.0
    assert cache.get("k1") is None
    stats = cache.stats()
    assert stats.size == 0
    assert stats.hits >= 3
    assert stats.misses >= 2


def test_unified_idempotency_store_shares_cache_backend_without_collision() -> None:
    now = 500.0
    shared_cache = InMemoryTTLCache(default_ttl_seconds=60, clock=lambda: now)
    shared_cache.set("order-1", "domain-cache-value")

    store = IdempotencyStore(ttl_seconds=30, backend=shared_cache)
    calls = 0

    def compute() -> dict[str, str]:
        nonlocal calls
        calls += 1
        return {"status": "accepted", "seq": str(calls)}

    first, replayed_first = store.get_or_create("order-1", "fp-aaa", compute)
    second, replayed_second = store.get_or_create("order-1", "fp-aaa", compute)

    assert replayed_first is False
    assert replayed_second is True
    assert first == second == {"status": "accepted", "seq": "1"}
    assert calls == 1
    assert shared_cache.get("order-1") == "domain-cache-value"

    with pytest.raises(ConflictError) as exc_info:
        store.get_or_create("order-1", "fp-different", compute)
    assert exc_info.value.status_code == 409

    # After TTL expires, the same key can be reused cleanly.
    now += 31.0
    third, replayed_third = store.get_or_create("order-1", "fp-new", compute)
    assert replayed_third is False
    assert third == {"status": "accepted", "seq": "2"}
