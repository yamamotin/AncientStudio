"""PROJUDI (TJPR) real public process consultation, details, and AI/n8n triage routes."""

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
from fastapi import APIRouter, Body, Depends, Header, Query

router = APIRouter(prefix="/projudi/processos", tags=["projudi"])


@router.post(
    "/consulta",
    response_model=ConnectorEnvelope,
    summary="Real public PROJUDI/TJPR case lookup by CPF/CNPJ (no mocks)",
)
def consultar_processos_projudi(
    body: ProjudiConsultaRequest,
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.projudi.consulta_por_cpf(
            cpf=body.cpf,
            tribunal=body.tribunal,
            captcha_token=body.captcha_token,
            session_cookie=body.session_cookie or x_projudi_session,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)


@router.get(
    "/{numero_processo}",
    response_model=ConnectorEnvelope,
    summary="Fetch real public PROJUDI/TJPR case details and movements by CNJ number",
)
def obter_processo_projudi(
    numero_processo: str,
    captcha_token: str | None = Query(default=None, max_length=4096),
    session_cookie: str | None = Query(default=None, max_length=512),
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.projudi.obter_processo(
            numero_processo,
            captcha_token=captcha_token,
            session_cookie=session_cookie or x_projudi_session,
        )
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
