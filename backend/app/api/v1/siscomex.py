"""Portal Único Siscomex NCM nomenclature search routes."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import ConnectorEnvelope, raise_as_problem
from fastapi import APIRouter, Depends, Query

router = APIRouter(prefix="/siscomex", tags=["siscomex-ncm"])


@router.get(
    "/ncm",
    response_model=ConnectorEnvelope,
    summary="Accent-insensitive NCM search by product description or code",
)
def search_siscomex_ncm(
    q: str = Query(default="", max_length=160),
    limite: int = Query(default=10, ge=1, le=50),
    somente_vigentes: bool = Query(default=True),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.siscomex.search_ncm(
            q,
            limite=limite,
            somente_vigentes=somente_vigentes,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
