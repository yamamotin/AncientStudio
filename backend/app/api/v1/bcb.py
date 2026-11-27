"""Banco Central do Brasil (BCB) Open Data routes (SGS indicators & PIX institutions)."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import ConnectorEnvelope, raise_as_problem
from fastapi import APIRouter, Depends, Query

router = APIRouter(prefix="/bcb", tags=["bcb-fintech"])


@router.get(
    "/indicadores",
    response_model=ConnectorEnvelope,
    summary="Selic, IPCA, and PTAX USD/BRL series via BCB SGS Open Data",
)
def get_bcb_indicadores(
    ultimos: int = Query(default=5, ge=1, le=30),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.bcb.get_indicadores(ultimos=ultimos)
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)


@router.get(
    "/instituicoes",
    response_model=ConnectorEnvelope,
    summary="Search PIX / BCB-authorized institutions by name or ISPB",
)
def get_bcb_instituicoes(
    busca: str = Query(default="", max_length=120),
    limite: int = Query(default=20, ge=1, le=100),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.bcb.search_instituicoes(busca=busca, limite=limite)
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
