"""Pydantic v2 request/response contracts for Public Connectors & Interactive CAPTCHA endpoints."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ProjudiConsultaRequest(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    cpf: str | None = Field(
        default=None,
        min_length=3,
        max_length=24,
        description=(
            "CPF (11 dígitos) ou CNPJ (14 dígitos) para consulta pública no PROJUDI TJPR. "
            "Opcional na retomada quando 'challenge_id' ou 'consulta_payload.cpf' é enviado."
        ),
    )
    tribunal: str | None = Field(default="TJPR", max_length=16)
    challenge_id: str | None = Field(
        default=None,
        max_length=128,
        description=(
            "Identificador do desafio retornado em HTTP 422 CAPTCHA_REQUIRED para reutilizar "
            "a sessão JSESSIONID, campos ocultos do formulário e parâmetros da consulta."
        ),
    )
    captcha_token: str | None = Field(
        default=None,
        max_length=8192,
        description=(
            "Token público obtido na resolução do desafio (ex.: g-recaptcha-response, "
            "h-captcha-response ou cf-turnstile-response)."
        ),
    )
    captcha_solution: str | None = Field(
        default=None,
        max_length=8192,
        description=(
            "Solução textual ou token do desafio CAPTCHA (ex.: caracteres do CAPTCHA de imagem "
            "ou alias para captcha_token)."
        ),
    )
    g_recaptcha_response: str | None = Field(
        default=None,
        alias="g-recaptcha-response",
        max_length=8192,
    )
    resposta: str | None = Field(default=None, max_length=8192)
    session_cookie: str | None = Field(
        default=None,
        max_length=4096,
        description=(
            "Cookie de sessão HTTP pública (ex.: 'JSESSIONID=...') vinculado ao desafio."
        ),
    )
    consulta_payload: dict[str, Any] | None = Field(
        default=None,
        description="Parâmetros originais da consulta em andamento para retomada automática.",
    )


class ProjudiMovimentacaoInput(BaseModel):
    model_config = ConfigDict(extra="ignore")

    sequencia: int | None = None
    data: str | None = None
    tipo: str | None = None
    descricao: str


class ProjudiResumoRequest(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    texto_processo: str | None = Field(default=None, max_length=32000)
    movimentacoes: list[ProjudiMovimentacaoInput | str] | None = None
    objetivo: str = Field(default="triagem_juridica_executiva", max_length=120)
    challenge_id: str | None = Field(default=None, max_length=128)
    captcha_token: str | None = Field(default=None, max_length=8192)
    captcha_solution: str | None = Field(default=None, max_length=8192)
    g_recaptcha_response: str | None = Field(
        default=None,
        alias="g-recaptcha-response",
        max_length=8192,
    )
    resposta: str | None = Field(default=None, max_length=8192)
    session_cookie: str | None = Field(default=None, max_length=4096)
    consulta_payload: dict[str, Any] | None = Field(default=None)


class CaptchaResolveRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    challenge_id: str = Field(
        ...,
        min_length=4,
        max_length=128,
        description="Identificador emitido na resposta 422 CAPTCHA_REQUIRED.",
    )
    captcha_token: str | None = Field(
        default=None,
        max_length=8192,
        description="Token retornado pelo widget reCAPTCHA / hCaptcha / Turnstile.",
    )
    captcha_solution: str | None = Field(
        default=None,
        max_length=8192,
        description="Solução textual (CAPTCHA de imagem) ou token do provedor.",
    )
    session_cookie: str | None = Field(
        default=None,
        max_length=4096,
        description="Cookie de sessão opcional da consulta em andamento.",
    )
    consulta_payload: dict[str, Any] | None = Field(
        default=None,
        description="Sobrescrita opcional de parâmetros da consulta original.",
    )


class ConnectorEnvelope(BaseModel):
    ok: bool = True
    data: dict[str, Any]
