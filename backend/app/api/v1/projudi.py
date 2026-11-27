"""PROJUDI public case consultation, details, and AI/n8n-ready summarization routes."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import (
    ConnectorEnvelope,
    ProjudiConsultaRequest,
    ProjudiResumoRequest,
    raise_as_problem,
)
from fastapi import APIRouter, Body, Depends

router = APIRouter(prefix="/projudi/processos", tags=["projudi"])


@router.post(
    "/consulta",
    response_model=ConnectorEnvelope,
    summary="Consult public PROJUDI cases by validated CPF with LGPD masking",
)
def consultar_processos_projudi(
    body: ProjudiConsultaRequest,
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.projudi.consulta_por_cpf(
            cpf=body.cpf,
            tribunal=body.tribunal,
            captcha_token=body.captcha_token,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)


@router.get(
    "/{numero_processo}",
    response_model=ConnectorEnvelope,
    summary="Fetch complete public case details and chronological movements",
)
def obter_processo_projudi(
    numero_processo: str,
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.projudi.obter_processo(numero_processo)
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)


@router.post(
    "/{numero_processo}/resumo",
    response_model=ConnectorEnvelope,
    summary="Deterministic triage metrics and ready_for_llm summarization contract",
)
def resumir_processo_projudi(
    numero_processo: str,
    body: ProjudiResumoRequest | None = Body(default=None),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    raw_payload = body.model_dump(exclude_none=True) if body is not None else {}
    try:
        data = connectors.projudi.resumir_processo(numero_processo, raw_payload)
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
