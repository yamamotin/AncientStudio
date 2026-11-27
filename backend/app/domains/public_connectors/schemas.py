"""Pydantic v2 contracts for BCB, Siscomex Classif, Municipal Transparency, and PROJUDI."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ConnectorEnvelope(BaseModel):
    """Standard ``{"ok": true, "data": ...}`` envelope shared across runtime hosts."""

    model_config = ConfigDict(extra="allow")

    ok: bool = True
    data: dict[str, Any]


class ProjudiConsultaRequest(BaseModel):
    """Request body for ``POST /api/v1/projudi/processos/consulta``."""

    model_config = ConfigDict(extra="forbid")

    cpf: str = Field(
        ...,
        min_length=1,
        max_length=32,
        description="CPF ou CNPJ da parte (com ou sem pontuação).",
    )
    tribunal: str = Field(default="TJPR", min_length=2, max_length=12)
    captcha_token: str | None = Field(
        default=None,
        max_length=4096,
        description="Token Google reCAPTCHA (g-recaptcha-response) resolvido no portal TJPR.",
    )
    session_cookie: str | None = Field(
        default=None,
        max_length=512,
        description="Cookie JSESSIONID opcional obtido no formulário público do PROJUDI/TJPR.",
    )


class ProjudiResumoRequest(BaseModel):
    """Request body for ``POST /api/v1/projudi/processos/{numero_processo}/resumo``."""

    model_config = ConfigDict(extra="ignore")

    texto_processo: str | None = Field(default=None, max_length=32000)
    movimentacoes: list[Any] | None = None
    objetivo: str = Field(default="triagem_juridica_executiva", max_length=120)
    captcha_token: str | None = Field(default=None, max_length=4096)
    session_cookie: str | None = Field(default=None, max_length=512)
