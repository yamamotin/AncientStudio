"""Portal Único Siscomex official NCM nomenclature search and hierarchy service."""

from __future__ import annotations

from datetime import datetime, timezone
import json
from pathlib import Path
from typing import Any

from api.connectors.cache import ConnectorTTLCache
from api.connectors.errors import ConnectorValidationError, UpstreamConnectorError
from api.connectors.http_client import HttpTransport, UrllibHttpTransport
from api.connectors.validators import clean_digits, normalize_search_text, strip_html_tags

SISCOMEX_PUBLIC_JSON_URL = (
    "https://portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json"
)
SEED_FILE_PATH = Path(__file__).resolve().parent.parent / "data" / "siscomex_ncm_seed.json"


def _utc_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _parse_siscomex_date(raw_date: str) -> str:
    text = str(raw_date or "").strip()
    if "/" in text:
        parts = text.split("/")
        if len(parts) == 3:
            return f"{parts[2]}-{parts[1].zfill(2)}-{parts[0].zfill(2)}"
    return text[:10] if text else ""


def _is_vigente(inicio_iso: str, fim_iso: str, today_iso: str) -> bool:
    if inicio_iso and inicio_iso > today_iso:
        return False
    if fim_iso and fim_iso != "9999-12-31" and fim_iso < today_iso:
        return False
    return True


def _format_ncm_code(raw_code: str) -> str:
    digits = clean_digits(raw_code)
    if len(digits) == 8:
        return f"{digits[:4]}.{digits[4:6]}.{digits[6:8]}"
    if len(digits) == 6:
        return f"{digits[:4]}.{digits[4:6]}"
    if len(digits) == 4:
        return f"{digits[:2]}.{digits[2:4]}"
    return raw_code.strip()


def _format_ato_legal(item: dict[str, Any]) -> str | None:
    tipo = str(item.get("Tipo_Ato_Ini") or "").strip()
    numero = str(item.get("Numero_Ato_Ini") or "").strip()
    ano = str(item.get("Ano_Ato_Ini") or "").strip()
    if tipo and numero and ano:
        return f"{tipo} nº {numero}/{ano}"
    return None


class SiscomexNCMService:
    """Searches the official Siscomex NCM nomenclature table with accent-free ranking."""

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        seed_path: Path | None = None,
        timeout_seconds: float = 3.5,
        catalog_ttl_seconds: float = 86400.0,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(
            default_timeout_seconds=timeout_seconds,
            max_response_bytes=16 * 1024 * 1024,
        )
        self._cache = cache or ConnectorTTLCache()
        self._seed_path = seed_path or SEED_FILE_PATH
        self._timeout = timeout_seconds
        self._catalog_ttl = catalog_ttl_seconds

    def _read_seed_payload(self) -> dict[str, Any]:
        return json.loads(self._seed_path.read_text(encoding="utf-8"))

    def _build_indexed_catalog(
        self, raw_payload: dict[str, Any], fonte_modo: str, avisos: list[str]
    ) -> dict[str, Any]:
        raw_items = raw_payload.get("Nomenclaturas")
        if not isinstance(raw_items, list) or not raw_items:
            raise UpstreamConnectorError("Tabela Nomenclaturas Siscomex ausente ou vazia.")

        by_digits: dict[str, dict[str, str]] = {}
        entries: list[dict[str, Any]] = []
        today_iso = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        for raw in raw_items:
            if not isinstance(raw, dict):
                continue
            raw_code = str(raw.get("Codigo") or "").strip()
            digits = clean_digits(raw_code)
            desc = strip_html_tags(str(raw.get("Descricao") or "")).lstrip("- ").strip()
            if not digits or not desc:
                continue

            formatted_code = _format_ncm_code(raw_code)
            inicio_iso = _parse_siscomex_date(str(raw.get("Data_Inicio") or ""))
            fim_iso = _parse_siscomex_date(str(raw.get("Data_Fim") or ""))
            vigente = _is_vigente(inicio_iso, fim_iso, today_iso)

            if digits not in by_digits or vigente:
                by_digits[digits] = {"codigo": formatted_code, "descricao": desc}

            entries.append(
                {
                    "codigo": formatted_code,
                    "codigo_numerico": digits,
                    "descricao": desc,
                    "norm_desc": normalize_search_text(desc),
                    "vigencia": {
                        "inicio": inicio_iso or None,
                        "fim": None if fim_iso == "9999-12-31" else (fim_iso or None),
                        "vigente": vigente,
                        "ato_legal": _format_ato_legal(raw),
                    },
                }
            )

        return {
            "data_atualizacao": str(raw_payload.get("Data_Ultima_Atualizacao_NCM") or ""),
            "ato_referencia": str(raw_payload.get("Ato") or ""),
            "entries": entries,
            "by_digits": by_digits,
            "fonte_modo": fonte_modo,
            "avisos": avisos,
        }

    def _get_catalog(self) -> tuple[dict[str, Any], bool]:
        cache_key = "siscomex:ncm:catalog"
        hit, cached = self._cache.get(cache_key)
        if hit:
            return cached, True

        avisos: list[str] = []
        try:
            resp = self._transport.request(
                SISCOMEX_PUBLIC_JSON_URL,
                params={"perfil": "PUBLICO"},
                timeout_seconds=self._timeout,
            )
            raw_json = resp.json()
            if not isinstance(raw_json, dict):
                raise UpstreamConnectorError("Formato inesperado no JSON público do Siscomex.")
            catalog = self._build_indexed_catalog(
                raw_json, "online_portal_unico_siscomex", avisos
            )
        except UpstreamConnectorError as exc:
            avisos.append(
                f"Download online Siscomex indisponível ({exc.detail}); "
                "consultando base local oficial NCM/SH-2022."
            )
            seed_data = self._read_seed_payload()
            catalog = self._build_indexed_catalog(seed_data, "cache_local_oficial_ncm", avisos)

        self._cache.set(cache_key, catalog, ttl_seconds=self._catalog_ttl)
        return catalog, False

    def search_ncm(
        self,
        q: str | None,
        *,
        limite: int = 10,
        somente_vigentes: bool = True,
    ) -> dict[str, Any]:
        """Search NCM codes and product descriptions without accents, returning full hierarchy."""
        raw_query = str(q or "").strip()
        norm_query = normalize_search_text(raw_query)
        digit_query = clean_digits(raw_query)

        if len(norm_query) < 2 and len(digit_query) < 2:
            raise ConnectorValidationError(
                "Informe ao menos 2 caracteres em 'q' (descrição do produto ou código NCM).",
                extra={"field": "q"},
            )
        if not isinstance(limite, int) or limite < 1 or limite > 50:
            raise ConnectorValidationError(
                "Parâmetro 'limite' deve ser um inteiro entre 1 e 50.",
                extra={"field": "limite"},
            )

        catalog, cache_hit = self._get_catalog()
        by_digits: dict[str, dict[str, str]] = catalog["by_digits"]
        tokens = [tok for tok in norm_query.split(" ") if len(tok) >= 2]

        scored: list[tuple[float, dict[str, Any]]] = []
        for entry in catalog["entries"]:
            if somente_vigentes and not entry["vigencia"]["vigente"]:
                continue

            code_digits = entry["codigo_numerico"]
            cap_info = by_digits.get(code_digits[:2])
            pos_info = by_digits.get(code_digits[:4]) if len(code_digits) >= 4 else None
            sub_info = by_digits.get(code_digits[:6]) if len(code_digits) >= 6 else None

            full_context_norm = normalize_search_text(
                " ".join(
                    part["descricao"]
                    for part in (cap_info, pos_info, sub_info)
                    if part is not None
                )
                + " "
                + entry["descricao"]
            )

            score = 0.0
            if digit_query:
                if code_digits == digit_query:
                    score += 1200.0
                elif code_digits.startswith(digit_query):
                    score += 800.0

            if norm_query:
                if norm_query in entry["norm_desc"]:
                    score += 450.0
                elif norm_query in full_context_norm:
                    score += 260.0

                if tokens:
                    direct_hits = sum(
                        1
                        for tok in tokens
                        if tok in entry["norm_desc"]
                        or (len(tok) >= 6 and tok[:5] in entry["norm_desc"])
                    )
                    context_hits = sum(
                        1
                        for tok in tokens
                        if tok in full_context_norm
                        or (len(tok) >= 6 and tok[:5] in full_context_norm)
                    )
                    if direct_hits == len(tokens):
                        score += 320.0
                    elif context_hits == len(tokens):
                        score += 200.0
                    elif direct_hits > 0:
                        score += (direct_hits / len(tokens)) * 120.0

            if score <= 0:
                continue

            # Prefer actionable 8-digit NCM codes over broad 2/4-digit SH groupings
            if len(code_digits) == 8:
                score += 360.0
            elif len(code_digits) == 6:
                score += 80.0

            scored.append((score, entry))

        scored.sort(key=lambda pair: (-pair[0], pair[1]["codigo_numerico"]))

        resultados: list[dict[str, Any]] = []
        for score, entry in scored[:limite]:
            code_digits = entry["codigo_numerico"]
            cap = by_digits.get(code_digits[:2]) or {
                "codigo": code_digits[:2],
                "descricao": "Capítulo NCM",
            }
            pos = (
                by_digits.get(code_digits[:4])
                if len(code_digits) >= 4
                else None
            )
            sub = (
                by_digits.get(code_digits[:6])
                if len(code_digits) >= 6
                else None
            )

            breadcrumb_parts = [f"Cap. {cap['codigo']}: {cap['descricao']}"]
            if pos and len(code_digits) > 4:
                breadcrumb_parts.append(f"Pos. {pos['codigo']}: {pos['descricao']}")
            breadcrumb_parts.append(f"{entry['codigo']} — {entry['descricao']}")

            resultados.append(
                {
                    "codigo": entry["codigo"],
                    "codigo_numerico": code_digits,
                    "nivel": "ncm_8_digitos" if len(code_digits) == 8 else "agrupamento_sh",
                    "descricao": entry["descricao"],
                    "descricao_completa": " > ".join(breadcrumb_parts),
                    "hierarquia": {
                        "capitulo": cap,
                        "posicao": pos,
                        "subposicao": sub,
                    },
                    "vigencia": entry["vigencia"],
                    "relevancia": round(score, 2),
                }
            )

        return {
            "consultado_em": _utc_iso(),
            "fonte": "Portal Único Siscomex — Classif / Tabela Oficial NCM (MDIC/RFB)",
            "fonte_modo": catalog["fonte_modo"],
            "cache_hit": cache_hit,
            "data_atualizacao_tabela": catalog["data_atualizacao"],
            "ato_referencia": catalog["ato_referencia"],
            "termo_busca": raw_query,
            "termo_normalizado": norm_query,
            "somente_vigentes": somente_vigentes,
            "total_encontrado": len(scored),
            "resultados": resultados,
            "avisos": list(catalog["avisos"]),
        }
