"""Registry and public exports for decoupled public data, tax/fintech, and ETL connectors."""

from __future__ import annotations

from dataclasses import dataclass

from api.connectors.bcb import BCBConnectorService
from api.connectors.cache import ConnectorTTLCache, TTLCacheStats
from api.connectors.errors import (
    ConnectorCaptchaRequiredError,
    ConnectorError,
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import HttpResponse, HttpTransport, UrllibHttpTransport
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
    """Groups all decoupled connector services sharing a common cache and HTTP transport."""

    cache: ConnectorTTLCache
    bcb: BCBConnectorService
    siscomex: SiscomexNCMService
    transparencia: MunicipalTransparencyService
    projudi: ProjudiConnectorService


def create_public_connectors(
    *,
    transport: HttpTransport | None = None,
    cache: ConnectorTTLCache | None = None,
    timeout_seconds: float = 4.0,
    transparencia_api_key: str | None = None,
) -> PublicConnectorsRegistry:
    shared_cache = cache or ConnectorTTLCache(default_ttl_seconds=900.0, max_entries=512)
    shared_transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
    return PublicConnectorsRegistry(
        cache=shared_cache,
        bcb=BCBConnectorService(
            transport=shared_transport,
            cache=shared_cache,
            timeout_seconds=timeout_seconds,
        ),
        siscomex=SiscomexNCMService(
            transport=shared_transport,
            cache=shared_cache,
            timeout_seconds=timeout_seconds,
        ),
        transparencia=MunicipalTransparencyService(
            transport=shared_transport,
            cache=shared_cache,
            timeout_seconds=timeout_seconds,
            transparencia_api_key=transparencia_api_key,
        ),
        projudi=ProjudiConnectorService(
            transport=shared_transport,
            cache=shared_cache,
            timeout_seconds=timeout_seconds,
        ),
    )


__all__ = [
    "BCBConnectorService",
    "ConnectorCaptchaRequiredError",
    "ConnectorError",
    "ConnectorNotFoundError",
    "ConnectorTTLCache",
    "ConnectorValidationError",
    "HttpResponse",
    "HttpTransport",
    "MunicipalTransparencyService",
    "ProjudiBootstrapHtmlParser",
    "ProjudiConnectorService",
    "ProjudiPublicHtmlParser",
    "PublicConnectorsRegistry",
    "SiscomexNCMService",
    "TTLCacheStats",
    "UpstreamConnectorError",
    "UrllibHttpTransport",
    "VALID_BRAZILIAN_UFS",
    "clean_digits",
    "compute_cnj_check_digits",
    "create_public_connectors",
    "format_cnj_number",
    "format_cnpj",
    "format_cpf",
    "is_valid_cnpj",
    "is_valid_cpf",
    "mask_cnpj",
    "mask_cpf",
    "mask_sensitive_text",
    "normalize_search_text",
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
