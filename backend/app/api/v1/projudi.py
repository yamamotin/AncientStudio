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


@router.get(
    "",
    response_model=ConnectorEnvelope,
    summary="Real public PROJUDI/TJPR case lookup by CPF/CNPJ query string (no mocks)",
)
def listar_processos_projudi_por_cpf(
    cpf: str | None = Query(default=None, max_length=24),
    tribunal: str | None = Query(default=None, max_length=16),
    challenge_id: str | None = Query(default=None, max_length=128),
    captcha_token: str | None = Query(default=None, max_length=8192),
    captcha_solution: str | None = Query(default=None, max_length=8192),
    resposta: str | None = Query(default=None, max_length=8192),
    g_recaptcha_response: str | None = Query(
        default=None, alias="g-recaptcha-response", max_length=8192
    ),
    session_cookie: str | None = Query(default=None, max_length=4096),
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    eff_solution = (
        captcha_solution or g_recaptcha_response or resposta or x_captcha_solution
    )
    try:
        data = connectors.projudi.consulta_por_cpf(
            cpf=cpf,
            tribunal=tribunal,
            challenge_id=challenge_id or x_challenge_id,
            captcha_token=captcha_token or x_captcha_token,
            captcha_solution=eff_solution,
            session_cookie=session_cookie or x_captcha_session or x_projudi_session,
            resume_endpoint="/api/v1/projudi/processos",
            resume_method="GET",
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)


@router.post(
    "/consulta",
    response_model=ConnectorEnvelope,
    summary="Real public PROJUDI/TJPR case lookup by CPF/CNPJ (no mocks)",
)
def consultar_processos_projudi(
    body: ProjudiConsultaRequest,
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    eff_solution = (
        body.captcha_solution
        or body.g_recaptcha_response
        or body.resposta
        or x_captcha_solution
    )
    try:
        data = connectors.projudi.consulta_por_cpf(
            cpf=body.cpf,
            tribunal=body.tribunal,
            challenge_id=body.challenge_id or x_challenge_id,
            captcha_token=body.captcha_token or x_captcha_token,
            captcha_solution=eff_solution,
            session_cookie=(
                body.session_cookie or x_captcha_session or x_projudi_session
            ),
            consulta_payload=body.consulta_payload,
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
    challenge_id: str | None = Query(default=None, max_length=128),
    captcha_token: str | None = Query(default=None, max_length=8192),
    captcha_solution: str | None = Query(default=None, max_length=8192),
    resposta: str | None = Query(default=None, max_length=8192),
    g_recaptcha_response: str | None = Query(
        default=None, alias="g-recaptcha-response", max_length=8192
    ),
    session_cookie: str | None = Query(default=None, max_length=4096),
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    eff_solution = (
        captcha_solution or g_recaptcha_response or resposta or x_captcha_solution
    )
    try:
        data = connectors.projudi.obter_processo(
            numero_processo,
            challenge_id=challenge_id or x_challenge_id,
            captcha_token=captcha_token or x_captcha_token,
            captcha_solution=eff_solution,
            session_cookie=session_cookie or x_captcha_session or x_projudi_session,
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
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    x_projudi_session: str | None = Header(default=None, alias="X-Projudi-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    raw_payload = (
        body.model_dump(by_alias=True, exclude_none=True) if body is not None else {}
    )
    try:
        data = connectors.projudi.resumir_processo(
            numero_processo,
            raw_payload,
            challenge_id=x_challenge_id,
            captcha_token=x_captcha_token,
            captcha_solution=x_captcha_solution,
            session_cookie=x_captcha_session or x_projudi_session,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
