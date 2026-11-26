"""AncientStudio backend root package.

Ensures ``backend/`` is present on ``sys.path`` when imported as
``backend.app.main`` from the repository root (e.g. Docker/CI) so internal
``app.*`` imports resolve identically in both execution modes.
"""

from __future__ import annotations

import sys
from pathlib import Path

_BACKEND_DIR = str(Path(__file__).resolve().parent)
_REPO_ROOT = str(Path(__file__).resolve().parent.parent)
for _candidate in (_BACKEND_DIR, _REPO_ROOT):
    if _candidate not in sys.path:
        sys.path.insert(0, _candidate)
