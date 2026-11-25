"""Python 3.10+ compatible UTC datetime utilities."""

from __future__ import annotations

import datetime as _dt
from datetime import datetime, timezone


def resolve_utc_timezone(dt_module: object = _dt) -> timezone:
    """Return ``datetime.UTC`` on Python 3.11+ or ``timezone.utc`` on Python 3.10."""
    candidate = getattr(dt_module, "UTC", None)
    return candidate if isinstance(candidate, timezone) else timezone.utc


UTC: timezone = resolve_utc_timezone()


def utc_now() -> datetime:
    """Return timezone-aware current UTC timestamp."""
    return datetime.now(UTC)


def ensure_utc(value: datetime) -> datetime:
    """Normalize a naive or offset-aware ``datetime`` into UTC."""
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value.astimezone(UTC)


def utc_iso(value: datetime | None = None) -> str:
    """Format a UTC timestamp as canonical ISO-8601 ``YYYY-MM-DDTHH:MM:SSZ``."""
    target = ensure_utc(value) if value is not None else utc_now()
    return target.strftime("%Y-%m-%dT%H:%M:%SZ")
