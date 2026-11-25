"""Redis-backed ``CacheBackend`` adapter with safe JSON/Pydantic codec and automatic fallback."""

from __future__ import annotations

import importlib
import json
import logging
import threading
from collections.abc import Callable, Iterator
from typing import Any, Protocol, TypeVar, runtime_checkable

from app.cache.base import CacheBackend, CacheStats
from app.cache.idempotency import IdempotencyRecord
from app.cache.memory import InMemoryTTLCache
from app.core.config import Settings
from app.core.errors import ServiceUnavailableError
from pydantic import BaseModel

logger = logging.getLogger("ancientstudio.cache")

T = TypeVar("T")


@runtime_checkable
class SyncRedisCacheClient(Protocol):
    """Subset of ``redis.Redis`` commands used by ``RedisTTLCache``."""

    def get(self, name: str) -> str | None: ...

    def set(
        self,
        name: str,
        value: str,
        *,
        ex: int | None = None,
        nx: bool = False,
    ) -> bool | None: ...

    def delete(self, *names: str) -> int: ...

    def scan_iter(self, match: str | None = None) -> Iterator[str]: ...

    def ping(self) -> bool: ...


def encode_cache_value(value: Any) -> str:
    """Serialize domain values safely to JSON without ``pickle`` RCE exposure."""
    return json.dumps(_to_wire(value), ensure_ascii=False)


def _to_wire(value: Any) -> dict[str, Any]:
    if isinstance(value, IdempotencyRecord):
        return {
            "__kind__": "idempotency_record",
            "fingerprint": value.fingerprint,
            "result": _to_wire(value.result),
        }
    if isinstance(value, BaseModel):
        cls = type(value)
        return {
            "__kind__": "pydantic",
            "cls": f"{cls.__module__}:{cls.__qualname__}",
            "data": value.model_dump(mode="json"),
        }
    if isinstance(value, list):
        return {
            "__kind__": "list",
            "items": [_to_wire(item) for item in value],
        }
    return {
        "__kind__": "json",
        "value": value,
    }


def decode_cache_value(raw: str) -> Any:
    """Deserialize JSON envelopes produced by :func:`encode_cache_value`."""
    envelope = json.loads(raw)
    return _from_wire(envelope)


def _from_wire(envelope: Any) -> Any:
    if not isinstance(envelope, dict) or "__kind__" not in envelope:
        return envelope

    kind = envelope["__kind__"]
    if kind == "json":
        return envelope.get("value")
    if kind == "list":
        items = envelope.get("items") or []
        return [_from_wire(item) for item in items]
    if kind == "idempotency_record":
        return IdempotencyRecord(
            fingerprint=str(envelope["fingerprint"]),
            result=_from_wire(envelope["result"]),
        )
    if kind == "pydantic":
        fqn = str(envelope["cls"])
        module_name, _, qualname = fqn.partition(":")
        if not module_name.startswith("app.") or not qualname or "." in qualname:
            raise ValueError(f"Disallowed cached model class '{fqn}'.")
        module = importlib.import_module(module_name)
        cls = getattr(module, qualname, None)
        if not isinstance(cls, type) or not issubclass(cls, BaseModel):
            raise ValueError(f"Invalid Pydantic model reference '{fqn}'.")
        return cls.model_validate(envelope["data"])

    raise ValueError(f"Unsupported cache envelope kind '{kind}'.")


class RedisTTLCache:
    """Distributed TTL cache using atomic Redis ``SET ... EX ... NX`` semantics."""

    backend_name = "redis"

    def __init__(
        self,
        client: SyncRedisCacheClient,
        *,
        default_ttl_seconds: int = 300,
        key_prefix: str = "ancientstudio",
    ) -> None:
        if default_ttl_seconds < 1:
            raise ValueError("default_ttl_seconds must be >= 1")
        self._client = client
        self._default_ttl = default_ttl_seconds
        self._prefix = f"{key_prefix.rstrip(':')}:cache:"
        self._lock = threading.Lock()
        self._hits = 0
        self._misses = 0
        self._sets = 0

    def _key(self, key: str) -> str:
        return f"{self._prefix}{key}"

    def get(self, key: str) -> Any | None:
        raw = self._client.get(self._key(key))
        if raw is None:
            with self._lock:
                self._misses += 1
            return None
        with self._lock:
            self._hits += 1
        return decode_cache_value(raw)

    def set(self, key: str, value: Any, *, ttl_seconds: int | None = None) -> None:
        ttl = self._default_ttl if ttl_seconds is None else max(1, ttl_seconds)
        encoded = encode_cache_value(value)
        self._client.set(self._key(key), encoded, ex=ttl)
        with self._lock:
            self._sets += 1

    def get_or_set(
        self,
        key: str,
        factory: Callable[[], T],
        *,
        ttl_seconds: int | None = None,
    ) -> tuple[T, bool]:
        ttl = self._default_ttl if ttl_seconds is None else max(1, ttl_seconds)
        redis_key = self._key(key)

        existing_raw = self._client.get(redis_key)
        if existing_raw is not None:
            with self._lock:
                self._hits += 1
            return decode_cache_value(existing_raw), True

        with self._lock:
            self._misses += 1

        computed = factory()
        encoded = encode_cache_value(computed)
        inserted = bool(self._client.set(redis_key, encoded, ex=ttl, nx=True))
        if inserted:
            with self._lock:
                self._sets += 1
            return computed, False

        # Another replica/worker populated the key concurrently; return the winning value.
        winner_raw = self._client.get(redis_key)
        if winner_raw is not None:
            with self._lock:
                self._hits += 1
            return decode_cache_value(winner_raw), True

        self._client.set(redis_key, encoded, ex=ttl)
        with self._lock:
            self._sets += 1
        return computed, False

    def delete(self, key: str) -> bool:
        return int(self._client.delete(self._key(key))) > 0

    def clear(self) -> None:
        keys = list(self._client.scan_iter(match=f"{self._prefix}*"))
        if keys:
            self._client.delete(*keys)

    def stats(self) -> CacheStats:
        size = sum(1 for _ in self._client.scan_iter(match=f"{self._prefix}*"))
        with self._lock:
            return CacheStats(
                hits=self._hits,
                misses=self._misses,
                sets=self._sets,
                evictions=0,
                size=size,
            )


def create_cache_backend(settings: Settings) -> CacheBackend:
    """Create a ``RedisTTLCache`` when ``redis_url`` is reachable, falling back to memory."""
    if not settings.redis_url:
        return InMemoryTTLCache(
            default_ttl_seconds=settings.cache_default_ttl_seconds,
            max_entries=settings.cache_max_entries,
        )

    try:
        import redis

        client = redis.Redis.from_url(
            settings.redis_url,
            decode_responses=True,
            socket_connect_timeout=settings.redis_connect_timeout_seconds,
            socket_timeout=settings.redis_connect_timeout_seconds,
        )
        client.ping()
        return RedisTTLCache(
            client,
            default_ttl_seconds=settings.cache_default_ttl_seconds,
            key_prefix=settings.redis_key_prefix,
        )
    except Exception as exc:
        if settings.redis_fallback_to_memory:
            logger.warning(
                "cache_redis_unreachable_fallback_memory",
                extra={"error": str(exc)},
            )
            return InMemoryTTLCache(
                default_ttl_seconds=settings.cache_default_ttl_seconds,
                max_entries=settings.cache_max_entries,
            )
        raise ServiceUnavailableError(
            "Redis cache backend is configured without fallback and could not be reached."
        ) from exc
