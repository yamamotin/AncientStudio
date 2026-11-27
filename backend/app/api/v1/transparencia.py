"""Municipal transparency & fiscal routes (IBGE + TSE + Siconfi DCA + optional CGU)."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import ConnectorEnvelope, raise_as_problem
from fastapi import APIRouter, Depends, Query

router = APIRouter(prefix="/transparencia", tags=["transparencia-municipal"])


@router.get(
    "/municipio",
    response_model=ConnectorEnvelope,
    summary="Municipal governance, GDP, Siconfi budget execution, and TSE campaign finance in BRL",
)
def get_transparencia_municipio(
    cidade: str = Query(default="", max_length=120),
    uf: str = Query(default="", max_length=8),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.transparencia.get_municipio(cidade=cidade, uf=uf)
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
