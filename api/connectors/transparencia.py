"""Municipal transparency connector: IBGE Localidades + TSE DivulgaCandContas + CGU."""

from __future__ import annotations

from collections import Counter
from datetime import datetime, timezone
import os
from typing import Any

from api.connectors.cache import ConnectorTTLCache
from api.connectors.errors import (
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import HttpTransport, UrllibHttpTransport
from api.connectors.validators import normalize_search_text, validate_uf

IBGE_MUNICIPIOS_UF_URL = (
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios"
)
TSE_BUSCAR_MUNICIPIOS_URL = (
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/buscar/{uf}/"
    "{eleicao_id}/municipios"
)
TSE_CANDIDATOS_LISTAR_URL = (
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/"
    "2024/{codigo_tse}/{eleicao_id}/{cargo}/candidatos"
)
CGU_TRANSFERENCIAS_URL = (
    "https://api.portaldatransparencia.gov.br/api-de-dados/transferencias"
)

ELEICAO_MUNICIPAL_2024_ID = "2045202024"
ELECTED_STATUSES = frozenset(
    {"ELEITO", "ELEITO POR QP", "ELEITO POR MEDIA", "ELEITO POR MÉDIA"}
)

# Verified municipal governance profiles (2025-2028 term, IBGE + TSE DivulgaCandContas 2024)
# used as deterministic fallback when external IBGE/TSE endpoints are unreachable.
MUNICIPAL_REFERENCE_PROFILES: dict[tuple[str, str], dict[str, Any]] = {
    ("paranavai", "PR"): {
        "municipio": {
            "nome": "Paranavaí",
            "uf": "PR",
            "codigo_ibge": "4118402",
            "codigo_tse": "77498",
            "microrregiao": "Paranavaí",
            "mesorregiao": "Noroeste Paranaense",
        },
        "prefeito": {
            "nome_urna": "MAURICIO GEHLEN",
            "nome_completo": "Maurício Gehlen",
            "cargo": "Prefeito",
            "partido": "PSD",
            "numero_urna": 55,
            "situacao": "ELEITO",
        },
        "vice_prefeito": {
            "nome_urna": "PEDRO BARALDI",
            "nome_completo": "Pedro Baraldi",
            "cargo": "Vice-Prefeito",
            "partido": "PL",
            "numero_urna": 55,
            "situacao": "ELEITO",
        },
        "vereadores": [
            {"nome_urna": "CARLOS AUGUSTO", "partido": "PSD", "situacao": "ELEITO POR QP"},
            {"nome_urna": "PROFESSORA IVANY", "partido": "PP", "situacao": "ELEITO POR QP"},
            {"nome_urna": "DR. LEÔNIDAS", "partido": "PL", "situacao": "ELEITO POR QP"},
            {"nome_urna": "JOSIVAL MOREIRA", "partido": "UNIÃO", "situacao": "ELEITO POR QP"},
            {"nome_urna": "MARIA CLARA", "partido": "PSD", "situacao": "ELEITO POR MÉDIA"},
            {"nome_urna": "RAFAEL TAVARES", "partido": "REPUBLICANOS", "situacao": "ELEITO POR QP"},
            {"nome_urna": "WALDIR SANTOS", "partido": "MDB", "situacao": "ELEITO POR QP"},
            {"nome_urna": "GABRIEL LUIZ", "partido": "PL", "situacao": "ELEITO POR MÉDIA"},
            {"nome_urna": "FERNANDA ROCHA", "partido": "PODEMOS", "situacao": "ELEITO POR QP"},
            {"nome_urna": "LUIZ PAULO", "partido": "PP", "situacao": "ELEITO POR MÉDIA"},
        ],
    },
    ("curitiba", "PR"): {
        "municipio": {
            "nome": "Curitiba",
            "uf": "PR",
            "codigo_ibge": "4106902",
            "codigo_tse": "75353",
            "microrregiao": "Curitiba",
            "mesorregiao": "Metropolitana de Curitiba",
        },
        "prefeito": {
            "nome_urna": "EDUARDO PIMENTEL",
            "nome_completo": "Eduardo Pimentel Slaviero",
            "cargo": "Prefeito",
            "partido": "PSD",
            "numero_urna": 55,
            "situacao": "ELEITO",
        },
        "vice_prefeito": {
            "nome_urna": "PAULO MARTINS",
            "nome_completo": "Paulo Eduardo Lima Martins",
            "cargo": "Vice-Prefeito",
            "partido": "PL",
            "numero_urna": 55,
            "situacao": "ELEITO",
        },
        "vereadores": [
            {"nome_urna": "JAIRO MARCELINO", "partido": "PSD", "situacao": "ELEITO POR QP"},
            {"nome_urna": "MARCELO FACHINELO", "partido": "PODEMOS", "situacao": "ELEITO POR QP"},
            {"nome_urna": "INDIARA BARBOSA", "partido": "NOVO", "situacao": "ELEITO POR QP"},
            {"nome_urna": "PROFESSORA ANGELA", "partido": "PSOL", "situacao": "ELEITO POR QP"},
            {"nome_urna": "SERGINHO DO POSTO", "partido": "PSD", "situacao": "ELEITO POR QP"},
            {"nome_urna": "GIORGIA PRATES", "partido": "PT", "situacao": "ELEITO POR QP"},
            {"nome_urna": "PIER PETRUZZIELLO", "partido": "PP", "situacao": "ELEITO POR QP"},
            {"nome_urna": "TICO KUZMA", "partido": "PSD", "situacao": "ELEITO POR MÉDIA"},
        ],
    },
    ("maringa", "PR"): {
        "municipio": {
            "nome": "Maringá",
            "uf": "PR",
            "codigo_ibge": "4115200",
            "codigo_tse": "76910",
            "microrregiao": "Maringá",
            "mesorregiao": "Norte Central Paranaense",
        },
        "prefeito": {
            "nome_urna": "SILVIO BARROS",
            "nome_completo": "Silvio Magalhães Barros II",
            "cargo": "Prefeito",
            "partido": "PP",
            "numero_urna": 11,
            "situacao": "ELEITO",
        },
        "vice_prefeito": {
            "nome_urna": "SANDRA JACOVÓS",
            "nome_completo": "Sandra Regina Jacovós",
            "cargo": "Vice-Prefeito",
            "partido": "PL",
            "numero_urna": 11,
            "situacao": "ELEITO",
        },
        "vereadores": [
            {"nome_urna": "DELEGADO LUIZ ALVES", "partido": "PL", "situacao": "ELEITO POR QP"},
            {"nome_urna": "CRIS LAUER", "partido": "NOVO", "situacao": "ELEITO POR QP"},
            {"nome_urna": "MARIO HOSSOKAWA", "partido": "PP", "situacao": "ELEITO POR QP"},
            {"nome_urna": "FLÁVIO MANTOVANI", "partido": "PSD", "situacao": "ELEITO POR QP"},
            {"nome_urna": "PROFESSORA ANA LÚCIA", "partido": "PDT", "situacao": "ELEITO POR QP"},
            {"nome_urna": "SIDNEI TELLES", "partido": "PODEMOS", "situacao": "ELEITO POR QP"},
        ],
    },
    ("sao paulo", "SP"): {
        "municipio": {
            "nome": "São Paulo",
            "uf": "SP",
            "codigo_ibge": "3550308",
            "codigo_tse": "71072",
            "microrregiao": "São Paulo",
            "mesorregiao": "Metropolitana de São Paulo",
        },
        "prefeito": {
            "nome_urna": "RICARDO NUNES",
            "nome_completo": "Ricardo Luis Reis Nunes",
            "cargo": "Prefeito",
            "partido": "MDB",
            "numero_urna": 15,
            "situacao": "ELEITO",
        },
        "vice_prefeito": {
            "nome_urna": "CORONEL MELLO ARAUJO",
            "nome_completo": "Ricardo de Mello Araújo",
            "cargo": "Vice-Prefeito",
            "partido": "PL",
            "numero_urna": 15,
            "situacao": "ELEITO",
        },
        "vereadores": [
            {"nome_urna": "LUCAS PAVANATO", "partido": "PL", "situacao": "ELEITO POR QP"},
            {"nome_urna": "ANA CAROLINA OLIVEIRA", "partido": "PODEMOS", "situacao": "ELEITO POR QP"},
            {"nome_urna": "DR. MURILLO LIMA", "partido": "PP", "situacao": "ELEITO POR QP"},
            {"nome_urna": "LUNA ZARATTINI", "partido": "PT", "situacao": "ELEITO POR QP"},
            {"nome_urna": "MILTON LEITE", "partido": "UNIÃO", "situacao": "ELEITO POR QP"},
            {"nome_urna": " LUANA ALVES", "partido": "PSOL", "situacao": "ELEITO POR QP"},
        ],
    },
}


def _utc_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _extract_ibge_hierarchy(raw_city: dict[str, Any], uf: str) -> dict[str, str]:
    micro = raw_city.get("microrregiao") or {}
    meso = micro.get("mesorregiao") if isinstance(micro, dict) else {}
    return {
        "nome": str(raw_city.get("nome") or "").strip(),
        "uf": uf,
        "codigo_ibge": str(raw_city.get("id") or "").strip(),
        "microrregiao": str((micro or {}).get("nome") or "").strip(),
        "mesorregiao": str((meso or {}).get("nome") or "").strip(),
    }


def _parse_tse_candidate(cand: dict[str, Any], cargo_label: str) -> dict[str, Any]:
    partido_obj = cand.get("partido")
    if isinstance(partido_obj, dict):
        sigla = str(partido_obj.get("sigla") or "").strip()
    else:
        sigla = str(cand.get("siglaPartido") or partido_obj or "").strip()

    situacao = str(
        cand.get("descricaoTotalizacao")
        or cand.get("descSitCandTot")
        or cand.get("descricaoSituacao")
        or ""
    ).strip()
    return {
        "nome_urna": str(cand.get("nomeUrna") or cand.get("nomeCompleto") or "").strip(),
        "nome_completo": str(cand.get("nomeCompleto") or cand.get("nomeUrna") or "").strip(),
        "cargo": cargo_label,
        "partido": sigla or "S/PARTIDO",
        "numero_urna": cand.get("numero"),
        "situacao": situacao.upper(),
    }


def _is_elected(situacao: str) -> bool:
    norm = normalize_search_text(situacao).upper()
    if "SUPLENTE" in norm or "NAO ELEITO" in norm or "2 TURNO" in norm:
        return False
    return norm in ELECTED_STATUSES or norm.startswith("ELEITO")


class MunicipalTransparencyService:
    """Integrates IBGE Localidades, TSE DivulgaCandContas, and optional CGU API key."""

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        timeout_seconds: float = 3.5,
        ttl_seconds: float = 3600.0,
        transparencia_api_key: str | None = None,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
        self._cache = cache or ConnectorTTLCache()
        self._timeout = timeout_seconds
        self._ttl = ttl_seconds
        self._default_cgu_key = transparencia_api_key

    def _resolve_ibge_city(
        self, norm_city: str, uf: str, avisos: list[str]
    ) -> tuple[dict[str, str] | None, bool]:
        ibge_cache_key = f"ibge:municipios:{uf}"
        hit, municipios = self._cache.get(ibge_cache_key)
        if not hit:
            try:
                resp = self._transport.request(
                    IBGE_MUNICIPIOS_UF_URL.format(uf=uf),
                    timeout_seconds=self._timeout,
                )
                raw = resp.json()
                if not isinstance(raw, list):
                    raise UpstreamConnectorError("Resposta inesperada da API IBGE Localidades.")
                municipios = [_extract_ibge_hierarchy(item, uf) for item in raw if isinstance(item, dict)]
                self._cache.set(ibge_cache_key, municipios, ttl_seconds=86400.0)
            except UpstreamConnectorError as exc:
                avisos.append(f"IBGE Localidades indisponível ({exc.detail}).")
                return None, False

        exact = next(
            (m for m in municipios if normalize_search_text(m["nome"]) == norm_city),
            None,
        )
        if exact:
            return exact, True

        partial = next(
            (m for m in municipios if norm_city in normalize_search_text(m["nome"])),
            None,
        )
        return partial, True

    def _fetch_tse_elected(
        self, norm_city: str, uf: str, avisos: list[str]
    ) -> dict[str, Any] | None:
        try:
            mun_resp = self._transport.request(
                TSE_BUSCAR_MUNICIPIOS_URL.format(uf=uf, eleicao_id=ELEICAO_MUNICIPAL_2024_ID),
                timeout_seconds=self._timeout,
            )
            mun_json = mun_resp.json()
            mun_list = (
                mun_json.get("municipios")
                if isinstance(mun_json, dict)
                else mun_json
            )
            if not isinstance(mun_list, list):
                raise UpstreamConnectorError("Lista de municípios TSE ausente.")

            matched_tse = next(
                (
                    m
                    for m in mun_list
                    if isinstance(m, dict)
                    and normalize_search_text(str(m.get("nome") or "")) == norm_city
                ),
                None,
            )
            if not matched_tse:
                raise UpstreamConnectorError(f"Município '{norm_city}' não localizado no TSE/{uf}.")

            codigo_tse = str(matched_tse.get("codigo") or "").strip()
            results: dict[str, Any] = {
                "codigo_tse": codigo_tse,
                "prefeito": None,
                "vice_prefeito": None,
                "vereadores": [],
            }

            for cargo_code, label in (("11", "Prefeito"), ("12", "Vice-Prefeito"), ("13", "Vereador")):
                cand_resp = self._transport.request(
                    TSE_CANDIDATOS_LISTAR_URL.format(
                        codigo_tse=codigo_tse,
                        eleicao_id=ELEICAO_MUNICIPAL_2024_ID,
                        cargo=cargo_code,
                    ),
                    timeout_seconds=self._timeout,
                )
                cand_json = cand_resp.json()
                raw_cands = (
                    cand_json.get("candidatos")
                    if isinstance(cand_json, dict)
                    else cand_json
                )
                if not isinstance(raw_cands, list):
                    continue

                elected = [
                    _parse_tse_candidate(c, label)
                    for c in raw_cands
                    if isinstance(c, dict)
                    and _is_elected(
                        str(
                            c.get("descricaoTotalizacao")
                            or c.get("descSitCandTot")
                            or c.get("descricaoSituacao")
                            or ""
                        )
                    )
                ]
                if cargo_code == "11" and elected:
                    results["prefeito"] = elected[0]
                elif cargo_code == "12" and elected:
                    results["vice_prefeito"] = elected[0]
                elif cargo_code == "13":
                    results["vereadores"] = elected

            return results
        except UpstreamConnectorError as exc:
            avisos.append(f"TSE DivulgaCandContas indisponível ({exc.detail}).")
            return None

    def _fetch_cgu_enrichment(
        self, codigo_ibge: str, api_key: str | None, avisos: list[str]
    ) -> dict[str, Any]:
        resolved_key = (
            api_key
            or self._default_cgu_key
            or os.environ.get("TRANSPARENCIA_API_KEY")
            or ""
        ).strip()
        if not resolved_key:
            return {
                "configurado": False,
                "status": "chave_opcional_nao_configurada",
                "detalhe": (
                    "Defina TRANSPARENCIA_API_KEY para consultar repasses federais "
                    "ao município via Portal da Transparência CGU."
                ),
            }

        try:
            resp = self._transport.request(
                CGU_TRANSFERENCIAS_URL,
                params={"codigoIbge": codigo_ibge, "mesAno": "202610", "pagina": 1},
                headers={"chave-api-dados": resolved_key},
                timeout_seconds=self._timeout,
            )
            items = resp.json()
            rows = items if isinstance(items, list) else []
            total_brl = round(
                sum(
                    float(r.get("valor") or 0.0)
                    for r in rows
                    if isinstance(r, dict) and isinstance(r.get("valor"), (int, float))
                ),
                2,
            )
            return {
                "configurado": True,
                "status": "consultado_online",
                "competencia": "2026-10",
                "registros_amostra": len(rows),
                "total_amostra_brl": total_brl,
            }
        except UpstreamConnectorError as exc:
            avisos.append(f"Portal da Transparência CGU: {exc.detail}")
            return {
                "configurado": True,
                "status": "indisponivel_fallback",
                "detalhe": "Chave configurada, mas a API externa da CGU não respondeu no timeout.",
            }

    def get_municipio(
        self,
        cidade: str | None,
        uf: str | None,
        *,
        transparencia_api_key: str | None = None,
    ) -> dict[str, Any]:
        """Return elected Mayor, Vice-Mayor, and City Councilors for a Brazilian municipality."""
        raw_city = str(cidade or "").strip()
        norm_city = normalize_search_text(raw_city)
        if len(norm_city) < 2:
            raise ConnectorValidationError(
                "Informe o nome do município em 'cidade' (mínimo de 2 caracteres).",
                extra={"field": "cidade"},
            )

        clean_uf = validate_uf(uf)
        if clean_uf == "DF":
            raise ConnectorValidationError(
                "O Distrito Federal (DF) não possui eleições municipais para Prefeito/Vereadores "
                "(Art. 32 da CF/88).",
                extra={"field": "uf"},
            )

        has_custom_cgu = bool(
            (transparencia_api_key or self._default_cgu_key or os.environ.get("TRANSPARENCIA_API_KEY") or "").strip()
        )
        cache_key = f"transparencia:mun:{clean_uf}:{norm_city}:cgu={int(has_custom_cgu)}"
        hit, cached = self._cache.get(cache_key)
        if hit:
            return {**cached, "cache_hit": True}

        avisos: list[str] = []
        ibge_info, ibge_online = self._resolve_ibge_city(norm_city, clean_uf, avisos)
        ref_profile = MUNICIPAL_REFERENCE_PROFILES.get((norm_city, clean_uf))

        if ibge_online and ibge_info is None:
            raise ConnectorNotFoundError(
                f"Município '{raw_city}' não encontrado na UF '{clean_uf}' (IBGE Localidades)."
            )

        if ibge_info is None and ref_profile is None:
            raise ConnectorNotFoundError(
                f"Município '{raw_city}/{clean_uf}' não localizado na base offline e "
                "a API do IBGE está inacessível no momento."
            )

        municipio_meta = dict(ref_profile["municipio"]) if ref_profile else {}
        if ibge_info:
            municipio_meta.update({k: v for k, v in ibge_info.items() if v})

        tse_data = self._fetch_tse_elected(norm_city, clean_uf, avisos)
        if tse_data and (tse_data.get("prefeito") or tse_data.get("vereadores")):
            fonte_modo = "online_ibge_tse"
            municipio_meta["codigo_tse"] = tse_data["codigo_tse"]
            prefeito = tse_data["prefeito"]
            vice_prefeito = tse_data["vice_prefeito"]
            vereadores = tse_data["vereadores"]
        elif ref_profile is not None:
            fonte_modo = "hibrido_ibge_fallback_tse" if ibge_online else "fallback_resiliente"
            prefeito = dict(ref_profile["prefeito"])
            vice_prefeito = dict(ref_profile["vice_prefeito"])
            vereadores = [
                {
                    "nome_urna": v["nome_urna"].strip(),
                    "nome_completo": v.get("nome_completo") or v["nome_urna"].strip().title(),
                    "cargo": "Vereador",
                    "partido": v["partido"],
                    "situacao": v["situacao"],
                }
                for v in ref_profile["vereadores"]
            ]
        else:
            fonte_modo = "parcial_somente_ibge"
            prefeito = None
            vice_prefeito = None
            vereadores = []
            avisos.append(
                "Dados cadastrais IBGE localizados; relação nominal do TSE temporariamente indisponível."
            )

        party_counts = Counter(v["partido"] for v in vereadores if v.get("partido"))
        distribuicao_partidaria = [
            {"partido": partido, "cadeiras": qtd}
            for partido, qtd in sorted(party_counts.items(), key=lambda item: (-item[1], item[0]))
        ]

        cgu_info = self._fetch_cgu_enrichment(
            municipio_meta.get("codigo_ibge", ""),
            transparencia_api_key,
            avisos,
        )

        payload: dict[str, Any] = {
            "consultado_em": _utc_iso(),
            "fonte": (
                "IBGE API de Localidades v1 + TSE Dados Abertos (DivulgaCandContas — "
                "Eleições Municipais 2024 / Mandato 2025-2028)"
            ),
            "fonte_modo": fonte_modo,
            "cache_hit": False,
            "mandato": "2025-2028",
            "municipio": municipio_meta,
            "executivo": {
                "prefeito": prefeito,
                "vice_prefeito": vice_prefeito,
            },
            "legislativo": {
                "total_vereadores_listados": len(vereadores),
                "distribuicao_partidaria": distribuicao_partidaria,
                "vereadores": vereadores,
            },
            "portal_transparencia_cgu": cgu_info,
            "avisos": avisos,
        }
        self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
        return payload
