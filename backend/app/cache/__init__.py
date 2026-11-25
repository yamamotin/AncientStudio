"""Cache abstraction, bounded TTL memory backend, Redis adapter, and unified idempotency store."""

from app.cache.base import CacheBackend, CacheStats
from app.cache.idempotency import IdempotencyRecord, IdempotencyStore
from app.cache.memory import InMemoryTTLCache
from app.cache.redis_backend import (
    RedisTTLCache,
    SyncRedisCacheClient,
    create_cache_backend,
    decode_cache_value,
    encode_cache_value,
)

__all__ = [
    "CacheBackend",
    "CacheStats",
    "IdempotencyRecord",
    "IdempotencyStore",
    "InMemoryTTLCache",
    "RedisTTLCache",
    "SyncRedisCacheClient",
    "create_cache_backend",
    "decode_cache_value",
    "encode_cache_value",
]
