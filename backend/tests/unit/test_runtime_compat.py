"""Runtime compatibility tests: Python 3.10+ UTC fallback and dual-mode imports."""

from __future__ import annotations

import ast
import subprocess
import sys
import types
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest
from app.api.deps import GatewayService, get_idempotency_store
from app.core.time import UTC, ensure_utc, resolve_utc_timezone, utc_iso, utc_now
from app.main import app, create_app

pytestmark = pytest.mark.unit

BACKEND_ROOT = Path(__file__).resolve().parents[2]
REPO_ROOT = BACKEND_ROOT.parent


def test_entrypoints_and_contracts_import_cleanly() -> None:
    instance = create_app()
    assert app is not None
    assert instance.title == "AncientStudio API"
    assert callable(get_idempotency_store)
    assert GatewayService is not None


def test_repo_root_backend_package_import_works_for_docker_entrypoint() -> None:
    result = subprocess.run(
        [
            sys.executable,
            "-c",
            "from backend.app.main import app; assert app.title == 'AncientStudio API'",
        ],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr


def test_utc_fallback_supports_python_310_without_datetime_utc_attribute() -> None:
    simulated_py310_dt = types.SimpleNamespace(datetime=datetime, timezone=timezone)
    resolved = resolve_utc_timezone(simulated_py310_dt)

    assert resolved is timezone.utc
    assert UTC is timezone.utc

    now = utc_now()
    assert now.tzinfo is not None
    assert now.utcoffset() == timedelta(0)

    naive = datetime(2026, 11, 25, 12, 30, 0)
    normalized = ensure_utc(naive)
    assert normalized.tzinfo == timezone.utc
    assert utc_iso(normalized) == "2026-11-25T12:30:00Z"


def test_no_python_311_only_datetime_utc_import_in_backend_app() -> None:
    """Guardrail ensuring no module reintroduces ``from datetime import UTC``."""
    app_dir = BACKEND_ROOT / "app"
    offenders: list[str] = []

    for py_file in sorted(app_dir.rglob("*.py")):
        tree = ast.parse(py_file.read_text(encoding="utf-8"), filename=str(py_file))
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom) and node.module == "datetime":
                imported_names = {alias.name for alias in node.names}
                if "UTC" in imported_names:
                    offenders.append(str(py_file.relative_to(BACKEND_ROOT)))

    assert offenders == []
