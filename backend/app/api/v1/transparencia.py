"""Municipal transparency & fiscal routes (IBGE + TSE + Siconfi DCA + optional CGU)."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import ConnectorEnvelope, raise_as_problem
from fastapi import APIRouter, Depends, Header, Query

router = APIRouter(prefix="/transparencia", tags=["transparencia-municipal"])


@router.get(
    "/municipio",
    response_model=ConnectorEnvelope,
    summary="Municipal governance, GDP, Siconfi budget execution, and TSE campaign finance in BRL",
)
@router.get(
    "/municipios",
    response_model=ConnectorEnvelope,
    include_in_schema=False,
)
def get_transparencia_municipio(
    cidade: str = Query(default="", max_length=120),
    uf: str = Query(default="", max_length=8),
    challenge_id: str | None = Query(default=None, max_length=128),
    captcha_token: str | None = Query(default=None, max_length=8192),
    captcha_solution: str | None = Query(default=None, max_length=8192),
    session_cookie: str | None = Query(default=None, max_length=4096),
    x_transparencia_api_key: str | None = Header(
        default=None, alias="X-Transparencia-Api-Key"
    ),
    x_challenge_id: str | None = Header(default=None, alias="X-Challenge-Id"),
    x_captcha_token: str | None = Header(default=None, alias="X-Captcha-Token"),
    x_captcha_solution: str | None = Header(default=None, alias="X-Captcha-Solution"),
    x_captcha_session: str | None = Header(default=None, alias="X-Captcha-Session"),
    connectors: PublicConnectorsRegistry = Depends(get_public_connectors),
) -> ConnectorEnvelope:
    started = time.perf_counter()
    try:
        data = connectors.transparencia.get_municipio(
            cidade=cidade or None,
            uf=uf or None,
            transparencia_api_key=x_transparencia_api_key,
            challenge_id=challenge_id or x_challenge_id,
            captcha_token=captcha_token or x_captcha_token,
            captcha_solution=captcha_solution or x_captcha_solution,
            session_cookie=session_cookie or x_captcha_session,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
