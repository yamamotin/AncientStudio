"""Portal Único Siscomex Classif integrated search (NCM + Decisões + Sugestões)."""

from __future__ import annotations

import time

from api.connectors import ConnectorError, PublicConnectorsRegistry
from app.api.deps import get_public_connectors
from app.domains.public_connectors import ConnectorEnvelope, raise_as_problem
from fastapi import APIRouter, Depends, Header, Query

router = APIRouter(prefix="/siscomex", tags=["siscomex-ncm"])


@router.get(
    "/ncm",
    response_model=ConnectorEnvelope,
    summary="Integrated Classif search: NCM nomenclature + RFB rulings + suggestions",
)
def search_siscomex_ncm(
    q: str = Query(default="", max_length=160),
    termo: str = Query(default="", max_length=160),
    limite: int | None = Query(default=None, ge=1, le=50),
    somente_vigentes: bool | None = Query(default=None),
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
        data = connectors.siscomex.search_ncm(
            (q or termo) or None,
            limite=limite if limite is not None else (None if eff_challenge else 10),
            somente_vigentes=(
                somente_vigentes
                if somente_vigentes is not None
                else (None if eff_challenge else True)
            ),
            challenge_id=eff_challenge,
            captcha_token=captcha_token or x_captcha_token,
            captcha_solution=captcha_solution or x_captcha_solution,
            session_cookie=session_cookie or x_captcha_session,
        )
    except ConnectorError as exc:
        raise_as_problem(exc)
    data["latency_ms"] = round((time.perf_counter() - started) * 1000, 2)
    return ConnectorEnvelope(ok=True, data=data)
