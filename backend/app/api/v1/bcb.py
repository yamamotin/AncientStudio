"""Banco Central do Brasil (BCB) Open Data routes (SGS indicators & PIX institutions)."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import ConnectorEnvelope, raise_as_problem
from fastapi import APIRouter, Depends, Header, Query

router = APIRouter(prefix="/bcb", tags=["bcb-fintech"])


@router.get(
    "/indicadores",
    response_model=ConnectorEnvelope,
    summary="Selic, IPCA, and PTAX USD/BRL series via BCB SGS Open Data",
)
def get_bcb_indicadores(
    ultimos: int | None = Query(default=None, ge=1, le=30),
    challenge_id: str | None = Query(default=None, max_length=128),
    captcha_token: str | None = Query(default=None, max_length=8192),
    captcha_solution: str | None = Query(default=None, max_length=8192),
    session_cookie: str | None = Query(default=None, max_length=4096),
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    eff_challenge = challenge_id or x_challenge_id
    try:
        data = connectors.bcb.get_indicadores(
            ultimos=ultimos if ultimos is not None else (None if eff_challenge else 5),
            challenge_id=eff_challenge,
            captcha_token=captcha_token or x_captcha_token,
            captcha_solution=captcha_solution or x_captcha_solution,
            session_cookie=session_cookie or x_captcha_session,
        )
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
    busca: str | None = Query(default=None, max_length=120),
    limite: int | None = Query(default=None, ge=1, le=100),
    challenge_id: str | None = Query(default=None, max_length=128),
    captcha_token: str | None = Query(default=None, max_length=8192),
    captcha_solution: str | None = Query(default=None, max_length=8192),
    session_cookie: str | None = Query(default=None, max_length=4096),
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    eff_challenge = challenge_id or x_challenge_id
    try:
        data = connectors.bcb.search_instituicoes(
            busca=busca if busca is not None else (None if eff_challenge else ""),
            limite=limite if limite is not None else (None if eff_challenge else 20),
            challenge_id=eff_challenge,
            captcha_token=captcha_token or x_captcha_token,
            captcha_solution=captcha_solution or x_captcha_solution,
            session_cookie=session_cookie or x_captcha_session,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
