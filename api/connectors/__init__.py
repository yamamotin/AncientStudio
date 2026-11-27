"""Registry and public exports for decoupled public data, tax, ETL, and CAPTCHA connectors."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from api.connectors.bcb import BCBConnectorService
from api.connectors.cache import ConnectorTTLCache, TTLCacheStats
from api.connectors.captcha import (
    CaptchaChallenge,
    CaptchaChallengeStore,
    DetectedCaptcha,
    ResolvedCaptchaInput,
    detect_captcha_in_html,
)
from api.connectors.errors import (
    ConnectorCaptchaRequiredError,
    ConnectorError,
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import (
    HttpResponse,
    HttpTransport,
    UrllibHttpTransport,
    merge_cookie_header,
    parse_cookie_string,
)
from api.connectors.projudi import (
    ProjudiBootstrapHtmlParser,
    ProjudiConnectorService,
    ProjudiPublicHtmlParser,
    parse_projudi_detail_html,
    parse_projudi_parties_cell,
    parse_projudi_search_html,
    parse_projudi_search_result,
)
from api.connectors.siscomex import SiscomexNCMService, parse_sijut2_solucoes_html
from api.connectors.transparencia import MunicipalTransparencyService
from api.connectors.validators import (
    VALID_BRAZILIAN_UFS,
    clean_digits,
    compute_cnj_check_digits,
    format_cnj_number,
    format_cnpj,
    format_cpf,
    is_valid_cnpj,
    is_valid_cpf,
    mask_cnpj,
    mask_cpf,
    mask_sensitive_text,
    normalize_search_text,
    strip_accents,
    validate_cnj_process_number,
    validate_cpf,
    validate_cpf_or_cnpj,
    validate_uf,
)


@dataclass
class PublicConnectorsRegistry:
    """Groups decoupled connector services sharing cache, transport, and CAPTCHA store."""

    cache: ConnectorTTLCache
    bcb: BCBConnectorService
    siscomex: SiscomexNCMService
    transparencia: MunicipalTransparencyService
    projudi: ProjudiConnectorService
    captcha: CaptchaChallengeStore = field(default_factory=CaptchaChallengeStore)

    def get_captcha_challenge(self, challenge_id: str | None) -> dict[str, Any]:
        """Return active public metadata for a pending CAPTCHA challenge."""
        challenge = self.captcha.require_challenge(challenge_id)
        return challenge.public_metadata()

    def get_captcha_challenge_image(self, challenge_id: str | None) -> tuple[bytes, str]:
        """Return ``(raw_bytes, mime_type)`` for an active image CAPTCHA challenge."""
        return self.captcha.get_challenge_image(challenge_id)

    def resolve_captcha(
        self,
        *,
        challenge_id: str | None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
        transparencia_api_key: str | None = None,
    ) -> dict[str, Any]:
        """Resolve an active CAPTCHA challenge and complete the real upstream query."""
        challenge = self.captcha.require_challenge(challenge_id)
        token_clean = str(captcha_token or "").strip() or None
        solution_clean = str(captcha_solution or "").strip() or None
        if not token_clean and not solution_clean:
            raise ConnectorValidationError(
                "Informe 'captcha_token' ou 'captcha_solution' para concluir o desafio CAPTCHA.",
                extra={"field": "captcha_solution", "challenge_id": challenge.challenge_id},
            )

        merged_payload = dict(challenge.consulta_payload)
        if isinstance(consulta_payload, dict):
            merged_payload.update(
                {k: v for k, v in consulta_payload.items() if v is not None}
            )

        connector = challenge.connector
        operation = challenge.operation

        if connector == "projudi":
            if operation == "consulta_por_cpf":
                result = self.projudi.consulta_por_cpf(
                    merged_payload.get("cpf"),
                    tribunal=merged_payload.get("tribunal"),
                    captcha_token=token_clean,
                    captcha_solution=solution_clean,
                    challenge_id=challenge.challenge_id,
                    session_cookie=session_cookie,
                    consulta_payload=merged_payload,
                )
            elif operation == "obter_processo":
                result = self.projudi.obter_processo(
                    merged_payload.get("numero_processo"),
                    captcha_token=token_clean,
                    captcha_solution=solution_clean,
                    challenge_id=challenge.challenge_id,
                    session_cookie=session_cookie,
                    consulta_payload=merged_payload,
                )
            elif operation == "resumir_processo":
                result = self.projudi.resumir_processo(
                    merged_payload.get("numero_processo"),
                    merged_payload,
                    challenge_id=challenge.challenge_id,
                    captcha_token=token_clean,
                    captcha_solution=solution_clean,
                    session_cookie=session_cookie,
                )
            else:
                raise ConnectorValidationError(
                    f"Operação PROJUDI '{operation}' não suportada para retomada automática.",
                    extra={"connector": connector, "operation": operation},
                )
        elif connector == "siscomex":
            result = self.siscomex.search_ncm(
                merged_payload.get("q"),
                limite=merged_payload.get("limite"),
                somente_vigentes=merged_payload.get("somente_vigentes"),
                challenge_id=challenge.challenge_id,
                captcha_token=token_clean,
                captcha_solution=solution_clean,
                session_cookie=session_cookie,
                consulta_payload=merged_payload,
            )
        elif connector == "transparencia":
            result = self.transparencia.get_municipio(
                merged_payload.get("cidade"),
                merged_payload.get("uf"),
                transparencia_api_key=transparencia_api_key,
                challenge_id=challenge.challenge_id,
                captcha_token=token_clean,
                captcha_solution=solution_clean,
                session_cookie=session_cookie,
                consulta_payload=merged_payload,
            )
        elif connector == "bcb":
            if operation == "search_instituicoes":
                result = self.bcb.search_instituicoes(
                    merged_payload.get("busca"),
                    limite=merged_payload.get("limite"),
                    challenge_id=challenge.challenge_id,
                    captcha_token=token_clean,
                    captcha_solution=solution_clean,
                    session_cookie=session_cookie,
                    consulta_payload=merged_payload,
                )
            else:
                result = self.bcb.get_indicadores(
                    ultimos=merged_payload.get("ultimos"),
                    challenge_id=challenge.challenge_id,
                    captcha_token=token_clean,
                    captcha_solution=solution_clean,
                    session_cookie=session_cookie,
                    consulta_payload=merged_payload,
                )
        else:
            raise ConnectorValidationError(
                f"Conector '{connector}' não suportado pelo registro público de retomada.",
                extra={"connector": connector, "operation": operation},
            )

        return {
            **result,
            "challenge_id": challenge.challenge_id,
            "captcha_resolved": True,
            "connector": connector,
            "operation": operation,
        }


def create_public_connectors(
    *,
    transport: HttpTransport | None = None,
    cache: ConnectorTTLCache | None = None,
    captcha_store: CaptchaChallengeStore | None = None,
    timeout_seconds: float = 4.0,
    transparencia_api_key: str | None = None,
) -> PublicConnectorsRegistry:
    shared_cache = cache or ConnectorTTLCache(default_ttl_seconds=900.0, max_entries=512)
    shared_transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
    shared_captcha = captcha_store or CaptchaChallengeStore(cache=shared_cache)
    return PublicConnectorsRegistry(
        cache=shared_cache,
        captcha=shared_captcha,
        bcb=BCBConnectorService(
            transport=shared_transport,
            cache=shared_cache,
            captcha_store=shared_captcha,
            timeout_seconds=timeout_seconds,
        ),
        siscomex=SiscomexNCMService(
            transport=shared_transport,
            cache=shared_cache,
            captcha_store=shared_captcha,
            timeout_seconds=timeout_seconds,
        ),
        transparencia=MunicipalTransparencyService(
            transport=shared_transport,
            cache=shared_cache,
            captcha_store=shared_captcha,
            timeout_seconds=timeout_seconds,
            transparencia_api_key=transparencia_api_key,
        ),
        projudi=ProjudiConnectorService(
            transport=shared_transport,
            cache=shared_cache,
            captcha_store=shared_captcha,
            timeout_seconds=timeout_seconds,
        ),
    )


__all__ = [
    "BCBConnectorService",
    "CaptchaChallenge",
    "CaptchaChallengeStore",
    "ConnectorCaptchaRequiredError",
    "ConnectorError",
    "ConnectorNotFoundError",
    "ConnectorTTLCache",
    "ConnectorValidationError",
    "DetectedCaptcha",
    "HttpResponse",
    "HttpTransport",
    "MunicipalTransparencyService",
    "ProjudiBootstrapHtmlParser",
    "ProjudiConnectorService",
    "ProjudiPublicHtmlParser",
    "PublicConnectorsRegistry",
    "ResolvedCaptchaInput",
    "SiscomexNCMService",
    "TTLCacheStats",
    "UpstreamConnectorError",
    "UrllibHttpTransport",
    "VALID_BRAZILIAN_UFS",
    "clean_digits",
    "compute_cnj_check_digits",
    "create_public_connectors",
    "detect_captcha_in_html",
    "format_cnj_number",
    "format_cnpj",
    "format_cpf",
    "is_valid_cnpj",
    "is_valid_cpf",
    "mask_cnpj",
    "mask_cpf",
    "mask_sensitive_text",
    "merge_cookie_header",
    "normalize_search_text",
    "parse_cookie_string",
    "parse_projudi_detail_html",
    "parse_projudi_parties_cell",
    "parse_projudi_search_html",
    "parse_projudi_search_result",
    "parse_sijut2_solucoes_html",
    "strip_accents",
    "validate_cnj_process_number",
    "validate_cpf",
    "validate_cpf_or_cnpj",
    "validate_uf",
]
