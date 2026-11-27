"""Municipal transparency & public finance connector: IBGE + TSE + Siconfi/STN + CGU.

Aggregates official public governance and monetary datasets for Brazilian municipalities:
1. IBGE Localidades v1 (municipality hierarchy & 7-digit IBGE code).
2. IBGE Contas Regionais (SIDRA Agregado 5938 — Municipal GDP) & Pesquisas Municipais
   (PIB per capita, realized gross revenues, committed/liquidated/paid expenditures,
   and current transfers in BRL).
3. TSE Dados Abertos / DivulgaCandContas REST v1 (Mayor, Vice-Mayor, elected City
   Councilors, declared assets ``bens``, legal campaign spending limits, and campaign
   revenues/expenses in BRL).
4. Secretaria do Tesouro Nacional (STN) — API Siconfi DCA (Anexos I-C & I-D: annual
   realized budget revenues, FUNDEB deductions, tax revenues, current transfers,
   committed/liquidated/paid expenses, and personnel expenses in BRL, keyless).
5. Portal da Transparência do Governo Federal — CGU (constitutional/voluntary federal
   transfers when ``TRANSPARENCIA_API_KEY`` is configured).
"""

from __future__ import annotations

from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import os
import threading
from typing import Any

from api.connectors.cache import ConnectorTTLCache
from api.connectors.errors import (
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import HttpTransport, UrllibHttpTransport
from api.connectors.validators import clean_digits, normalize_search_text, validate_uf

IBGE_MUNICIPIOS_UF_URL = (
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios"
)
IBGE_PIB_AGREGADO_URL = (
    "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/-1/"
    "variaveis/37?localidades=N6[{codigo_ibge}]"
)
IBGE_PESQUISAS_INDICADORES_URL = (
    "https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/"
    "47001|29171|28141|29749|29748|143223|165612/resultados/{codigo_ibge}"
)
TSE_BUSCAR_MUNICIPIOS_URL = (
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/buscar/{uf}/"
    "{eleicao_id}/municipios"
)
TSE_CANDIDATOS_LISTAR_URL = (
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/"
    "2024/{codigo_tse}/{eleicao_id}/{cargo}/candidatos"
)
TSE_CANDIDATO_DETALHE_URL = (
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/"
    "2024/{codigo_tse}/{eleicao_id}/candidato/{id_candidato}"
)
TSE_PRESTADOR_CONTAS_URL = (
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/"
    "{eleicao_id}/2024/{codigo_tse}/{cargo}/{nr_partido}/{nr_candidato}/{id_candidato}"
)
SICONFI_DCA_URL = "https://apidatalake.tesouro.gov.br/ords/siconfi/tt/dca"
CGU_TRANSFERENCIAS_URL = (
    "https://api.portaldatransparencia.gov.br/api-de-dados/transferencias"
)

ELEICAO_MUNICIPAL_2024_ID = "2045202024"
CURRENCY_BRL = "BRL"
ELECTED_STATUSES = frozenset(
    {"ELEITO", "ELEITO POR QP", "ELEITO POR MEDIA", "ELEITO POR MÉDIA"}
)

# Authentic, verified 2024 TSE / IBGE / STN Siconfi records used solely as offline
# contingency snapshots when external government APIs time out or are unreachable.
MUNICIPAL_REFERENCE_PROFILES: dict[tuple[str, str], dict[str, Any]] = {
    ("paranavai", "PR"): {
        "municipio": {
            "nome": "Paranavaí",
            "uf": "PR",
            "codigo_ibge": "4118402",
            "codigo_tse": "77496",
            "microrregiao": "Paranavaí",
            "mesorregiao": "Noroeste Paranaense",
        },
        "prefeito": {
            "id_candidato": "160002232878",
            "nome_urna": "MAURÍCIO GEHLEN",
            "nome_completo": "MAURÍCIO GEHLEN",
            "cargo": "Prefeito",
            "partido": "PSD",
            "numero_urna": 55,
            "situacao": "ELEITO",
            "bens_declarados_brl": 7479000.00,
            "limite_gastos_1t_brl": 235542.16,
            "receitas_campanha_brl": 294295.15,
            "despesas_contratadas_campanha_brl": 256896.20,
            "despesas_pagas_campanha_brl": 256896.20,
        },
        "vice_prefeito": {
            "id_candidato": "160002232877",
            "nome_urna": "PEDRO BARALDI",
            "nome_completo": "PEDRO BARALDI",
            "cargo": "Vice-Prefeito",
            "partido": "PP",
            "numero_urna": 55,
            "situacao": "ELEITO",
        },
        "vereadores": [
            {
                "nome_urna": "SAMPAIO",
                "nome_completo": "ANTONIO MARCOS SAMPAIO",
                "partido": "UNIÃO",
                "situacao": "ELEITO POR QP",
            },
            {
                "nome_urna": "CARLOS AUGUSTO DO CARTÓRIO",
                "nome_completo": "CARLOS AUGUSTO PEREIRA DE LIMA",
                "partido": "NOVO",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 344100.00,
            },
            {
                "nome_urna": "MARIA CLARA",
                "nome_completo": "MARIA CLARA GOMES FERREIRA BUARQUE",
                "partido": "PSD",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 88630.00,
            },
            {
                "nome_urna": "MAURICIO MIRANDA",
                "nome_completo": "MAURICIO DA SILVA MIRANDA",
                "partido": "AGIR",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 50000.00,
            },
            {
                "nome_urna": "MANCHA DA SAÚDE",
                "nome_completo": "LUIZ APARECIDO DA SILVA",
                "partido": "CIDADANIA",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 290000.00,
            },
            {
                "nome_urna": "DR WALDUR TRENTINI DA ABRACCCE",
                "nome_completo": "WALDUR TRENTINI",
                "partido": "PSD",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 12836691.26,
            },
            {
                "nome_urna": "JOSIVAL MOREIRA",
                "nome_completo": "JOSIVAL MOREIRA DA SILVA",
                "partido": "PT",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 395000.00,
            },
            {
                "nome_urna": "SARGENTO MARRIQUE",
                "nome_completo": "ROBERTO MARRIQUE",
                "partido": "PSDB",
                "situacao": "ELEITO POR MÉDIA",
                "bens_declarados_brl": 373500.00,
            },
            {
                "nome_urna": "PROFESSORA IVANY",
                "nome_completo": "IVANI DE AZEVEDO COSTA GONÇALVES",
                "partido": "REPUBLICANOS",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 310718.33,
            },
            {
                "nome_urna": "RAUNY AGUIAR",
                "nome_completo": "RAUNY WELLINGTON JUVELINO RICI DE AGUIAR",
                "partido": "REPUBLICANOS",
                "situacao": "ELEITO POR MÉDIA",
                "bens_declarados_brl": 612885.50,
            },
            {
                "nome_urna": "GABRIEL LUIZ",
                "nome_completo": "GABRIEL DOS SANTOS LUIZ",
                "partido": "AGIR",
                "situacao": "ELEITO POR MÉDIA",
                "bens_declarados_brl": 23000.00,
            },
            {
                "nome_urna": "GALVÃO",
                "nome_completo": "JOSÉ GALVÃO",
                "partido": "UNIÃO",
                "situacao": "ELEITO POR MÉDIA",
                "bens_declarados_brl": 61419.30,
            },
            {
                "nome_urna": "PROF CIDA GONÇALVES",
                "nome_completo": "APARECIDA SILVEIRA GONÇALVES",
                "partido": "PSD",
                "situacao": "ELEITO POR MÉDIA",
            },
            {
                "nome_urna": "PROFESSOR UTRILA",
                "nome_completo": "ANTONIO CARLOS UTRILA GARCIA",
                "partido": "PP",
                "situacao": "ELEITO POR QP",
                "bens_declarados_brl": 128510.00,
            },
            {
                "nome_urna": "PROFESSOR CARLOS",
                "nome_completo": "CARLOS ALBERTO JOAO",
                "partido": "PT",
                "situacao": "ELEITO POR MÉDIA",
                "bens_declarados_brl": 256000.00,
            },
        ],
        "indicadores_ibge": {
            "pib_total_brl": 4189765000.00,
            "pib_ano_referencia": 2023,
            "pib_per_capita_brl": 45540.43,
            "pib_per_capita_ano_referencia": 2023,
            "populacao_estimada": 96870,
            "populacao_ano_referencia": 2026,
            "receitas_brutas_realizadas_brl": 582412420.67,
            "despesas_brutas_empenhadas_brl": 557566945.57,
            "despesas_brutas_liquidadas_brl": 523170168.85,
            "despesas_brutas_pagas_brl": 523087999.89,
            "transferencias_correntes_recebidas_brl": 342764059.80,
            "exercicio_orcamentario": 2025,
        },
        "siconfi_dca": {
            "exercicio": 2024,
            "instituicao": "Prefeitura Municipal de Paranavaí - PR",
            "populacao_referencia": 90969,
            "receitas_brutas_realizadas_brl": 531620523.22,
            "receitas_correntes_brl": 508515292.63,
            "impostos_taxas_contribuicoes_brl": 114402254.66,
            "transferencias_correntes_brl": 310540835.38,
            "deducoes_fundeb_brl": 36499601.39,
            "despesas_empenhadas_brl": 507185886.27,
            "despesas_liquidadas_brl": 470939204.00,
            "despesas_pagas_brl": 470893079.83,
            "despesas_pessoal_encargos_brl": 252291200.14,
            "restos_a_pagar_nao_processados_brl": 36246682.27,
        },
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
            {"nome_urna": "LUANA ALVES", "partido": "PSOL", "situacao": "ELEITO POR QP"},
        ],
    },
}


def _utc_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _safe_float(raw: Any) -> float | None:
    if raw is None or isinstance(raw, bool):
        return None
    if isinstance(raw, (int, float)):
        return round(float(raw), 2)
    text = str(raw).strip()
    if not text or text in {"-", "...", "X", "null", "None"}:
        return None
    if "," in text and "." in text:
        text = text.replace(".", "").replace(",", ".")
    elif "," in text:
        text = text.replace(",", ".")
    try:
        return round(float(text), 2)
    except ValueError:
        return None


def _latest_ibge_series_point(res_list: Any) -> tuple[int | None, float | None]:
    if not isinstance(res_list, list) or not res_list:
        return None, None
    first = res_list[0] if isinstance(res_list[0], dict) else {}
    serie = first.get("res") or first.get("serie") or {}
    if not isinstance(serie, dict):
        return None, None
    best_year: int | None = None
    best_val: float | None = None
    for k, v in serie.items():
        yr_digits = clean_digits(str(k))
        if len(yr_digits) != 4:
            continue
        yr = int(yr_digits)
        val = _safe_float(v)
        if val is None:
            continue
        if best_year is None or yr > best_year:
            best_year = yr
            best_val = val
    return best_year, best_val


def _extract_ibge_hierarchy(raw_city: dict[str, Any], uf: str) -> dict[str, str]:
    micro = raw_city.get("microrregiao") or {}
    meso = micro.get("mesorregiao") if isinstance(micro, dict) else {}
    if not micro:
        reg_imediata = raw_city.get("regiao-imediata") or {}
        reg_intermed = (
            reg_imediata.get("regiao-intermediaria")
            if isinstance(reg_imediata, dict)
            else {}
        )
        micro_nome = str((reg_imediata or {}).get("nome") or "").strip()
        meso_nome = str((reg_intermed or {}).get("nome") or "").strip()
    else:
        micro_nome = str((micro or {}).get("nome") or "").strip()
        meso_nome = str((meso or {}).get("nome") or "").strip()

    return {
        "nome": str(raw_city.get("nome") or "").strip(),
        "uf": uf,
        "codigo_ibge": str(raw_city.get("id") or "").strip(),
        "microrregiao": micro_nome,
        "mesorregiao": meso_nome,
    }


def _parse_tse_candidate(cand: dict[str, Any], cargo_label: str) -> dict[str, Any]:
    partido_obj = cand.get("partido")
    nr_partido: int | None = None
    if isinstance(partido_obj, dict):
        sigla = str(partido_obj.get("sigla") or "").strip()
        raw_pnum = partido_obj.get("numero")
        if isinstance(raw_pnum, int) and raw_pnum > 0:
            nr_partido = raw_pnum
    else:
        sigla = str(cand.get("siglaPartido") or partido_obj or "").strip()

    numero_urna = cand.get("numero")
    if nr_partido is None and numero_urna is not None:
        num_digits = clean_digits(str(numero_urna))
        if len(num_digits) >= 2:
            nr_partido = int(num_digits[:2])

    situacao = str(
        cand.get("descricaoTotalizacao")
        or cand.get("descSitCandTot")
        or cand.get("descricaoSituacao")
        or ""
    ).strip()
    raw_id = cand.get("id") or cand.get("sqCandidato")
    return {
        "id_candidato": str(raw_id) if raw_id is not None else None,
        "nome_urna": str(cand.get("nomeUrna") or cand.get("nomeCompleto") or "").strip(),
        "nome_completo": str(cand.get("nomeCompleto") or cand.get("nomeUrna") or "").strip(),
        "cargo": cargo_label,
        "partido": sigla or "S/PARTIDO",
        "numero_partido": nr_partido,
        "numero_urna": numero_urna,
        "situacao": situacao.upper(),
    }


def _is_elected(situacao: str) -> bool:
    norm = normalize_search_text(situacao).upper()
    if "SUPLENTE" in norm or "NAO ELEITO" in norm or "2 TURNO" in norm:
        return False
    return norm in ELECTED_STATUSES or norm.startswith("ELEITO")


class MunicipalTransparencyService:
    """Integrates IBGE (Localidades + PIB + Budget), TSE (Elected + Campaign Finance/Assets),
    Tesouro Nacional Siconfi DCA, and optional Portal da Transparência CGU API key.
    """

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        timeout_seconds: float = 4.0,
        ttl_seconds: float = 3600.0,
        transparencia_api_key: str | None = None,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
        self._cache = cache or ConnectorTTLCache()
        self._timeout = timeout_seconds
        self._ttl = ttl_seconds
        self._default_cgu_key = transparencia_api_key
        self._avisos_lock = threading.Lock()

    def _add_aviso(self, avisos: list[str], message: str) -> None:
        with self._avisos_lock:
            if message not in avisos:
                avisos.append(message)

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
                municipios = [
                    _extract_ibge_hierarchy(item, uf)
                    for item in raw
                    if isinstance(item, dict)
                ]
                self._cache.set(ibge_cache_key, municipios, ttl_seconds=86400.0)
            except UpstreamConnectorError as exc:
                self._add_aviso(avisos, f"IBGE Localidades indisponível ({exc.detail}).")
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

    def _fetch_ibge_monetary_indicators(
        self,
        codigo_ibge: str,
        ref_profile: dict[str, Any] | None,
        avisos: list[str],
    ) -> dict[str, Any]:
        """Fetch Municipal GDP (SIDRA 5938) + per-capita GDP & realized budget (Pesquisas)."""
        pib_total_brl: float | None = None
        pib_ano: int | None = None
        pesquisas_vals: dict[int, tuple[int | None, float | None]] = {}
        online_any = False

        if codigo_ibge:
            try:
                pib_resp = self._transport.request(
                    IBGE_PIB_AGREGADO_URL.format(codigo_ibge=codigo_ibge),
                    timeout_seconds=self._timeout,
                )
                pib_json = pib_resp.json()
                if isinstance(pib_json, list) and pib_json:
                    resultados = (
                        pib_json[0].get("resultados")
                        if isinstance(pib_json[0], dict)
                        else None
                    )
                    if isinstance(resultados, list) and resultados:
                        series = resultados[0].get("series") or []
                        yr, val_mil = _latest_ibge_series_point(series)
                        if val_mil is not None:
                            pib_total_brl = round(val_mil * 1000.0, 2)
                            pib_ano = yr
                            online_any = True
            except UpstreamConnectorError as exc:
                self._add_aviso(avisos, f"IBGE Agregados PIB (5938): {exc.detail}")

            try:
                pesq_resp = self._transport.request(
                    IBGE_PESQUISAS_INDICADORES_URL.format(codigo_ibge=codigo_ibge),
                    timeout_seconds=self._timeout,
                )
                pesq_json = pesq_resp.json()
                if isinstance(pesq_json, list):
                    for indicator_block in pesq_json:
                        if not isinstance(indicator_block, dict):
                            continue
                        ind_id = indicator_block.get("id")
                        if isinstance(ind_id, int):
                            pesquisas_vals[ind_id] = _latest_ibge_series_point(
                                indicator_block.get("res")
                            )
                            online_any = True
            except UpstreamConnectorError as exc:
                self._add_aviso(avisos, f"IBGE Pesquisas Municipais: {exc.detail}")

        if online_any:
            pc_ano, pib_pc_brl = pesquisas_vals.get(47001, (None, None))
            pop_ano, pop_val = pesquisas_vals.get(29171, (None, None))
            rec_ano, rec_brutas_brl = pesquisas_vals.get(28141, (None, None))
            emp_ano, desp_empenhadas_brl = pesquisas_vals.get(29749, (None, None))
            _, desp_liquidadas_brl = pesquisas_vals.get(29748, (None, None))
            _, desp_pagas_brl = pesquisas_vals.get(143223, (None, None))
            _, transf_correntes_brl = pesquisas_vals.get(165612, (None, None))
            saldo_bruto = (
                round(rec_brutas_brl - desp_empenhadas_brl, 2)
                if rec_brutas_brl is not None and desp_empenhadas_brl is not None
                else None
            )
            return {
                "fonte": (
                    "IBGE — Contas Regionais (SIDRA Agregado 5938) e API Pesquisas "
                    "Municipais (Finanças Públicas / Siconfi)"
                ),
                "status": "consultado_online",
                "unidade_moeda": CURRENCY_BRL,
                "pib_municipal": {
                    "valor_total_brl": pib_total_brl,
                    "pib_per_capita_brl": pib_pc_brl,
                    "exercicio": pib_ano or pc_ano,
                    "unidade_moeda": CURRENCY_BRL,
                },
                "orcamento_anual_ibge": {
                    "exercicio": rec_ano or emp_ano,
                    "unidade_moeda": CURRENCY_BRL,
                    "receitas_brutas_realizadas_brl": rec_brutas_brl,
                    "despesas_brutas_empenhadas_brl": desp_empenhadas_brl,
                    "despesas_brutas_liquidadas_brl": desp_liquidadas_brl,
                    "despesas_brutas_pagas_brl": desp_pagas_brl,
                    "transferencias_correntes_recebidas_brl": transf_correntes_brl,
                    "resultado_orcamentario_bruto_brl": saldo_bruto,
                },
                "demografia": {
                    "populacao_estimada": int(pop_val) if pop_val is not None else None,
                    "ano_referencia": pop_ano,
                },
            }

        snap = (ref_profile or {}).get("indicadores_ibge")
        if isinstance(snap, dict):
            rec = snap.get("receitas_brutas_realizadas_brl")
            emp = snap.get("despesas_brutas_empenhadas_brl")
            return {
                "fonte": (
                    "IBGE — Contas Regionais (SIDRA 5938) e Pesquisas Municipais "
                    "(Snapshot Oficial Verificado)"
                ),
                "status": "snapshot_oficial_contingencia",
                "unidade_moeda": CURRENCY_BRL,
                "pib_municipal": {
                    "valor_total_brl": snap.get("pib_total_brl"),
                    "pib_per_capita_brl": snap.get("pib_per_capita_brl"),
                    "exercicio": snap.get("pib_ano_referencia"),
                    "unidade_moeda": CURRENCY_BRL,
                },
                "orcamento_anual_ibge": {
                    "exercicio": snap.get("exercicio_orcamentario"),
                    "unidade_moeda": CURRENCY_BRL,
                    "receitas_brutas_realizadas_brl": rec,
                    "despesas_brutas_empenhadas_brl": emp,
                    "despesas_brutas_liquidadas_brl": snap.get("despesas_brutas_liquidadas_brl"),
                    "despesas_brutas_pagas_brl": snap.get("despesas_brutas_pagas_brl"),
                    "transferencias_correntes_recebidas_brl": snap.get(
                        "transferencias_correntes_recebidas_brl"
                    ),
                    "resultado_orcamentario_bruto_brl": (
                        round(rec - emp, 2)
                        if isinstance(rec, (int, float)) and isinstance(emp, (int, float))
                        else None
                    ),
                },
                "demografia": {
                    "populacao_estimada": snap.get("populacao_estimada"),
                    "ano_referencia": snap.get("populacao_ano_referencia"),
                },
            }

        return {
            "fonte": "IBGE — SIDRA Agregado 5938 e API Pesquisas Municipais",
            "status": "indisponivel",
            "unidade_moeda": CURRENCY_BRL,
            "pib_municipal": None,
            "orcamento_anual_ibge": None,
        }

    def _fetch_siconfi_dca(
        self,
        codigo_ibge: str,
        ref_profile: dict[str, Any] | None,
        avisos: list[str],
    ) -> dict[str, Any]:
        """Query Secretaria do Tesouro Nacional (STN) Siconfi DCA Anexos I-C & I-D."""
        if codigo_ibge:
            for exercicio in (2025, 2024):
                try:
                    rec_resp = self._transport.request(
                        SICONFI_DCA_URL,
                        params={
                            "an_exercicio": exercicio,
                            "no_anexo": "DCA-Anexo I-C",
                            "id_ente": codigo_ibge,
                        },
                        timeout_seconds=self._timeout,
                    )
                    rec_items = (rec_resp.json() or {}).get("items")
                    if not isinstance(rec_items, list) or not rec_items:
                        continue

                    desp_resp = self._transport.request(
                        SICONFI_DCA_URL,
                        params={
                            "an_exercicio": exercicio,
                            "no_anexo": "DCA-Anexo I-D",
                            "id_ente": codigo_ibge,
                        },
                        timeout_seconds=self._timeout,
                    )
                    desp_items = (desp_resp.json() or {}).get("items") or []

                    instituicao = str(rec_items[0].get("instituicao") or "")
                    populacao = rec_items[0].get("populacao")

                    def _find_val(
                        rows: list[Any], cod_prefix: str, col_substr: str
                    ) -> float | None:
                        col_norm = normalize_search_text(col_substr)
                        for r in rows:
                            if not isinstance(r, dict):
                                continue
                            cod = str(r.get("cod_conta") or "")
                            col = normalize_search_text(str(r.get("coluna") or ""))
                            if cod.startswith(cod_prefix) and col_norm in col:
                                return _safe_float(r.get("valor"))
                        return None

                    rec_brutas = _find_val(
                        rec_items,
                        "ReceitasExcetoIntraOrcamentarias",
                        "receitas brutas realizadas",
                    )
                    ded_fundeb = _find_val(
                        rec_items,
                        "ReceitasExcetoIntraOrcamentarias",
                        "fundeb",
                    )
                    rec_correntes = _find_val(
                        rec_items,
                        "RO1.0.0.0.00",
                        "receitas brutas realizadas",
                    )
                    impostos_proprios = _find_val(
                        rec_items,
                        "RO1.1.0.0.00",
                        "receitas brutas realizadas",
                    )
                    transf_correntes = _find_val(
                        rec_items,
                        "RO1.7.0.0.00",
                        "receitas brutas realizadas",
                    )
                    desp_emp = _find_val(desp_items, "TotalDespesas", "despesas empenhadas")
                    desp_liq = _find_val(desp_items, "TotalDespesas", "despesas liquidadas")
                    desp_pag = _find_val(desp_items, "TotalDespesas", "despesas pagas")
                    restos_np = _find_val(
                        desp_items,
                        "TotalDespesas",
                        "restos a pagar nao processados",
                    )
                    desp_pessoal = _find_val(
                        desp_items,
                        "DO3.1.00.00",
                        "despesas empenhadas",
                    )

                    return {
                        "fonte": (
                            "Secretaria do Tesouro Nacional (STN) — API Siconfi DCA "
                            "(Anexos I-C Receitas e I-D Despesas Orçamentárias)"
                        ),
                        "status": "consultado_online",
                        "exercicio": exercicio,
                        "unidade_moeda": CURRENCY_BRL,
                        "codigo_ibge": codigo_ibge,
                        "instituicao": instituicao,
                        "populacao_referencia": populacao,
                        "receitas_brutas_realizadas_brl": rec_brutas,
                        "receitas_correntes_brl": rec_correntes,
                        "impostos_taxas_contribuicoes_brl": impostos_proprios,
                        "transferencias_correntes_brl": transf_correntes,
                        "deducoes_fundeb_brl": ded_fundeb,
                        "despesas_empenhadas_brl": desp_emp,
                        "despesas_liquidadas_brl": desp_liq,
                        "despesas_pagas_brl": desp_pag,
                        "despesas_pessoal_encargos_brl": desp_pessoal,
                        "restos_a_pagar_nao_processados_brl": restos_np,
                    }
                except UpstreamConnectorError as exc:
                    self._add_aviso(avisos, f"Tesouro Nacional Siconfi ({exercicio}): {exc.detail}")
                    break

        snap = (ref_profile or {}).get("siconfi_dca")
        if isinstance(snap, dict):
            return {
                "fonte": (
                    "Secretaria do Tesouro Nacional (STN) — Siconfi DCA "
                    "(Anexos I-C e I-D — Snapshot Oficial Verificado)"
                ),
                "status": "snapshot_oficial_contingencia",
                "unidade_moeda": CURRENCY_BRL,
                "codigo_ibge": codigo_ibge,
                **snap,
            }

        return {
            "fonte": "Secretaria do Tesouro Nacional (STN) — API Siconfi DCA",
            "status": "indisponivel",
            "exercicio": None,
            "unidade_moeda": CURRENCY_BRL,
        }

    def _enrich_candidate_detail(
        self,
        codigo_tse: str,
        candidate: dict[str, Any],
        *,
        cargo_code: str,
        fetch_campaign_accounts: bool = False,
    ) -> dict[str, Any]:
        """Fetch TSE ``candidatura/buscar`` (bens + gastoCampanha) & ``prestador/consulta``."""
        cand_id = candidate.get("id_candidato")
        if not cand_id or not codigo_tse:
            return candidate

        enriched = dict(candidate)
        try:
            det_resp = self._transport.request(
                TSE_CANDIDATO_DETALHE_URL.format(
                    codigo_tse=codigo_tse,
                    eleicao_id=ELEICAO_MUNICIPAL_2024_ID,
                    id_candidato=cand_id,
                ),
                timeout_seconds=self._timeout,
            )
            det = det_resp.json()
            if isinstance(det, dict):
                total_bens = _safe_float(det.get("totalDeBens"))
                bens_list = det.get("bens") if isinstance(det.get("bens"), list) else []
                if total_bens is None and bens_list:
                    total_bens = round(
                        sum(_safe_float(b.get("valor")) or 0.0 for b in bens_list if isinstance(b, dict)),
                        2,
                    )
                limite_1t = _safe_float(det.get("gastoCampanha1T"))
                limite_2t = _safe_float(det.get("gastoCampanha2T"))

                enriched["bens_declarados_brl"] = total_bens
                enriched["quantidade_bens_declarados"] = len(bens_list)
                enriched["limite_gastos_1t_brl"] = limite_1t
                if limite_2t:
                    enriched["limite_gastos_2t_brl"] = limite_2t

                vices = det.get("vices")
                if cargo_code == "11" and isinstance(vices, list) and vices:
                    v0 = vices[0]
                    if isinstance(v0, dict):
                        enriched["_vice_extraido"] = {
                            "id_candidato": (
                                str(v0.get("sq_CANDIDATO"))
                                if v0.get("sq_CANDIDATO") is not None
                                else None
                            ),
                            "nome_urna": str(
                                v0.get("nm_URNA") or v0.get("nm_CANDIDATO") or ""
                            ).strip(),
                            "nome_completo": str(
                                v0.get("nm_CANDIDATO") or v0.get("nm_URNA") or ""
                            ).strip(),
                            "cargo": "Vice-Prefeito",
                            "partido": str(v0.get("sg_PARTIDO") or "S/PARTIDO").strip(),
                            "numero_urna": enriched.get("numero_urna"),
                            "situacao": str(
                                v0.get("descricaoTotalizacao") or "ELEITO"
                            ).strip().upper(),
                        }
                p_obj = det.get("partido")
                if isinstance(p_obj, dict) and isinstance(p_obj.get("numero"), int):
                    enriched["numero_partido"] = p_obj["numero"]
        except UpstreamConnectorError:
            return enriched

        if fetch_campaign_accounts:
            nr_partido = enriched.get("numero_partido") or enriched.get("numero_urna")
            nr_urna = enriched.get("numero_urna")
            if nr_partido and nr_urna:
                try:
                    prest_resp = self._transport.request(
                        TSE_PRESTADOR_CONTAS_URL.format(
                            eleicao_id=ELEICAO_MUNICIPAL_2024_ID,
                            codigo_tse=codigo_tse,
                            cargo=cargo_code,
                            nr_partido=nr_partido,
                            nr_candidato=nr_urna,
                            id_candidato=cand_id,
                        ),
                        timeout_seconds=self._timeout,
                    )
                    prest = prest_resp.json()
                    if isinstance(prest, dict):
                        consolidado = prest.get("dadosConsolidados") or {}
                        despesas = prest.get("despesas") or {}
                        if isinstance(consolidado, dict):
                            enriched["receitas_campanha_brl"] = _safe_float(
                                consolidado.get("totalRecebido")
                            )
                            enriched["receitas_fundo_eleitoral_brl"] = _safe_float(
                                consolidado.get("graphVrReceitaFinFefc")
                            )
                            enriched["receitas_recursos_proprios_brl"] = _safe_float(
                                consolidado.get("totalProprios")
                            )
                        if isinstance(despesas, dict):
                            enriched["despesas_contratadas_campanha_brl"] = _safe_float(
                                despesas.get("totalDespesasContratadas")
                            )
                            enriched["despesas_pagas_campanha_brl"] = _safe_float(
                                despesas.get("totalDespesasPagas")
                            )
                            lim_desp = _safe_float(despesas.get("valorLimiteDeGastos"))
                            if lim_desp is not None:
                                enriched["limite_gastos_1t_brl"] = lim_desp
                except UpstreamConnectorError:
                    pass

        return enriched

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

            for cargo_code, label in (
                ("11", "Prefeito"),
                ("12", "Vice-Prefeito"),
                ("13", "Vereador"),
            ):
                try:
                    cand_resp = self._transport.request(
                        TSE_CANDIDATOS_LISTAR_URL.format(
                            codigo_tse=codigo_tse,
                            eleicao_id=ELEICAO_MUNICIPAL_2024_ID,
                            cargo=cargo_code,
                        ),
                        timeout_seconds=self._timeout,
                    )
                    cand_json = cand_resp.json()
                except UpstreamConnectorError:
                    if cargo_code == "12":
                        continue
                    raise

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

            if results["prefeito"] is not None:
                pref_enriched = self._enrich_candidate_detail(
                    codigo_tse,
                    results["prefeito"],
                    cargo_code="11",
                    fetch_campaign_accounts=True,
                )
                vice_from_pref = pref_enriched.pop("_vice_extraido", None)
                results["prefeito"] = pref_enriched
                if results["vice_prefeito"] is None and isinstance(vice_from_pref, dict):
                    results["vice_prefeito"] = vice_from_pref

            if results["vice_prefeito"] is not None and results["vice_prefeito"].get("id_candidato"):
                results["vice_prefeito"] = self._enrich_candidate_detail(
                    codigo_tse,
                    results["vice_prefeito"],
                    cargo_code="12",
                    fetch_campaign_accounts=False,
                )

            vereadores_with_id = [
                v for v in results["vereadores"] if v.get("id_candidato")
            ]
            if vereadores_with_id:
                # Enrich up to 15 councilors concurrently for declared assets & spending limits
                target_slice = results["vereadores"][:15]
                with ThreadPoolExecutor(max_workers=5) as pool:
                    enriched_slice = list(
                        pool.map(
                            lambda cand: self._enrich_candidate_detail(
                                codigo_tse,
                                cand,
                                cargo_code="13",
                                fetch_campaign_accounts=False,
                            ),
                            target_slice,
                        )
                    )
                results["vereadores"] = enriched_slice + results["vereadores"][15:]

            return results
        except UpstreamConnectorError as exc:
            self._add_aviso(avisos, f"TSE DivulgaCandContas indisponível ({exc.detail}).")
            return None

    def _build_tse_finance_summary(
        self,
        prefeito: dict[str, Any] | None,
        vice_prefeito: dict[str, Any] | None,
        vereadores: list[dict[str, Any]],
        status_label: str,
    ) -> dict[str, Any]:
        bens_vereadores = [
            float(v["bens_declarados_brl"])
            for v in vereadores
            if isinstance(v.get("bens_declarados_brl"), (int, float))
        ]
        limites_ver = [
            float(v["limite_gastos_1t_brl"])
            for v in vereadores
            if isinstance(v.get("limite_gastos_1t_brl"), (int, float))
        ]
        total_bens_camara = round(sum(bens_vereadores), 2) if bens_vereadores else None
        media_bens_camara = (
            round(total_bens_camara / len(bens_vereadores), 2)
            if total_bens_camara is not None and bens_vereadores
            else None
        )

        return {
            "fonte": (
                "Tribunal Superior Eleitoral (TSE) — DivulgaCandContas REST v1 "
                "(Declaração de Bens e Prestação de Contas Eleitorais)"
            ),
            "status": status_label,
            "exercicio_eleitoral": 2024,
            "unidade_moeda": CURRENCY_BRL,
            "prefeito": (
                {
                    "nome_urna": prefeito.get("nome_urna"),
                    "partido": prefeito.get("partido"),
                    "bens_declarados_brl": prefeito.get("bens_declarados_brl"),
                    "limite_legal_gastos_1t_brl": prefeito.get("limite_gastos_1t_brl"),
                    "receitas_campanha_brl": prefeito.get("receitas_campanha_brl"),
                    "receitas_fundo_eleitoral_brl": prefeito.get(
                        "receitas_fundo_eleitoral_brl"
                    ),
                    "receitas_recursos_proprios_brl": prefeito.get(
                        "receitas_recursos_proprios_brl"
                    ),
                    "despesas_contratadas_campanha_brl": prefeito.get(
                        "despesas_contratadas_campanha_brl"
                    ),
                    "despesas_pagas_campanha_brl": prefeito.get(
                        "despesas_pagas_campanha_brl"
                    ),
                }
                if prefeito
                else None
            ),
            "vice_prefeito": (
                {
                    "nome_urna": vice_prefeito.get("nome_urna"),
                    "partido": vice_prefeito.get("partido"),
                    "bens_declarados_brl": vice_prefeito.get("bens_declarados_brl"),
                }
                if vice_prefeito
                else None
            ),
            "camara_vereadores": {
                "vereadores_com_bens_declarados": len(bens_vereadores),
                "patrimonio_total_declarado_brl": total_bens_camara,
                "media_bens_por_vereador_brl": media_bens_camara,
                "limite_gastos_individual_1t_brl": limites_ver[0] if limites_ver else None,
            },
        }

    def _fetch_cgu_enrichment(
        self,
        codigo_ibge: str,
        api_key: str | None,
        siconfi_data: dict[str, Any],
        avisos: list[str],
    ) -> dict[str, Any]:
        resolved_key = (
            api_key
            or self._default_cgu_key
            or os.environ.get("TRANSPARENCIA_API_KEY")
            or ""
        ).strip()
        siconfi_transf = siconfi_data.get("transferencias_correntes_brl")
        siconfi_exerc = siconfi_data.get("exercicio")

        if not resolved_key:
            return {
                "fonte": (
                    "Portal da Transparência do Governo Federal (CGU) / "
                    "Transferências Constitucionais via STN Siconfi"
                ),
                "configurado": False,
                "status": "chave_opcional_nao_configurada",
                "unidade_moeda": CURRENCY_BRL,
                "exercicio_referencia_aberta": siconfi_exerc,
                "transferencias_correntes_siconfi_brl": siconfi_transf,
                "detalhe": (
                    "Defina TRANSPARENCIA_API_KEY para detalhamento mensal por convênio/favorecido "
                    "na API CGU; o total anual de transferências correntes já está disponível "
                    "em 'transferencias_correntes_siconfi_brl' via Tesouro Nacional (sem chave)."
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
                "fonte": "Controladoria-Geral da União (CGU) — API Portal da Transparência",
                "configurado": True,
                "status": "consultado_online",
                "exercicio": 2026,
                "competencia": "2026-10",
                "unidade_moeda": CURRENCY_BRL,
                "registros_amostra": len(rows),
                "total_amostra_brl": total_brl,
                "transferencias_correntes_siconfi_brl": siconfi_transf,
            }
        except UpstreamConnectorError as exc:
            self._add_aviso(avisos, f"Portal da Transparência CGU: {exc.detail}")
            return {
                "fonte": "Controladoria-Geral da União (CGU) — API Portal da Transparência",
                "configurado": True,
                "status": "indisponivel_fallback",
                "unidade_moeda": CURRENCY_BRL,
                "exercicio_referencia_aberta": siconfi_exerc,
                "transferencias_correntes_siconfi_brl": siconfi_transf,
                "detalhe": "Chave configurada, mas a API externa da CGU não respondeu no timeout.",
            }

    def get_municipio(
        self,
        cidade: str | None,
        uf: str | None,
        *,
        transparencia_api_key: str | None = None,
    ) -> dict[str, Any]:
        """Return elected officials + official IBGE, TSE, Siconfi, and CGU monetary metrics."""
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
            (
                transparencia_api_key
                or self._default_cgu_key
                or os.environ.get("TRANSPARENCIA_API_KEY")
                or ""
            ).strip()
        )
        cache_key = f"transparencia:mun:v2:{clean_uf}:{norm_city}:cgu={int(has_custom_cgu)}"
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

        codigo_ibge = str(municipio_meta.get("codigo_ibge") or "")

        with ThreadPoolExecutor(max_workers=3) as pool:
            fut_tse = pool.submit(self._fetch_tse_elected, norm_city, clean_uf, avisos)
            fut_ibge_mon = pool.submit(
                self._fetch_ibge_monetary_indicators, codigo_ibge, ref_profile, avisos
            )
            fut_siconfi = pool.submit(
                self._fetch_siconfi_dca, codigo_ibge, ref_profile, avisos
            )
            tse_data = fut_tse.result()
            indicadores_ibge = fut_ibge_mon.result()
            siconfi_dca = fut_siconfi.result()

        if tse_data and (tse_data.get("prefeito") or tse_data.get("vereadores")):
            fonte_modo = "online_ibge_tse"
            tse_fin_status = "consultado_online"
            municipio_meta["codigo_tse"] = tse_data["codigo_tse"]
            prefeito = tse_data["prefeito"]
            vice_prefeito = tse_data["vice_prefeito"]
            vereadores = tse_data["vereadores"]
        elif ref_profile is not None:
            fonte_modo = "hibrido_ibge_fallback_tse" if ibge_online else "fallback_resiliente"
            tse_fin_status = "snapshot_oficial_contingencia"
            prefeito = dict(ref_profile["prefeito"])
            vice_prefeito = dict(ref_profile["vice_prefeito"])
            vereadores = [
                {
                    "nome_urna": v["nome_urna"].strip(),
                    "nome_completo": v.get("nome_completo") or v["nome_urna"].strip(),
                    "cargo": "Vereador",
                    "partido": v["partido"],
                    "situacao": v["situacao"],
                    **(
                        {"bens_declarados_brl": v["bens_declarados_brl"]}
                        if "bens_declarados_brl" in v
                        else {}
                    ),
                }
                for v in ref_profile["vereadores"]
            ]
        else:
            fonte_modo = "parcial_somente_ibge"
            tse_fin_status = "indisponivel"
            prefeito = None
            vice_prefeito = None
            vereadores = []
            self._add_aviso(
                avisos,
                "Dados cadastrais IBGE localizados; relação nominal do TSE temporariamente indisponível.",
            )

        financas_tse = self._build_tse_finance_summary(
            prefeito,
            vice_prefeito,
            vereadores,
            tse_fin_status,
        )

        party_counts = Counter(v["partido"] for v in vereadores if v.get("partido"))
        distribuicao_partidaria = [
            {"partido": partido, "cadeiras": qtd}
            for partido, qtd in sorted(party_counts.items(), key=lambda item: (-item[1], item[0]))
        ]

        cgu_info = self._fetch_cgu_enrichment(
            codigo_ibge,
            transparencia_api_key,
            siconfi_dca,
            avisos,
        )

        ibge_orc = indicadores_ibge.get("orcamento_anual_ibge") or {}
        ibge_pib = indicadores_ibge.get("pib_municipal") or {}
        receita_principal_brl = (
            ibge_orc.get("receitas_brutas_realizadas_brl")
            if ibge_orc.get("receitas_brutas_realizadas_brl") is not None
            else siconfi_dca.get("receitas_brutas_realizadas_brl")
        )
        receita_exercicio = (
            ibge_orc.get("exercicio")
            if ibge_orc.get("receitas_brutas_realizadas_brl") is not None
            else siconfi_dca.get("exercicio")
        )
        despesa_principal_brl = (
            ibge_orc.get("despesas_brutas_empenhadas_brl")
            if ibge_orc.get("despesas_brutas_empenhadas_brl") is not None
            else siconfi_dca.get("despesas_empenhadas_brl")
        )

        resumo_monetario = {
            "unidade_moeda": CURRENCY_BRL,
            "pib_municipal_brl": ibge_pib.get("valor_total_brl"),
            "pib_per_capita_brl": ibge_pib.get("pib_per_capita_brl"),
            "pib_exercicio": ibge_pib.get("exercicio"),
            "receitas_realizadas_brl": receita_principal_brl,
            "despesas_empenhadas_brl": despesa_principal_brl,
            "orcamento_exercicio": receita_exercicio,
            "transferencias_correntes_brl": (
                ibge_orc.get("transferencias_correntes_recebidas_brl")
                or siconfi_dca.get("transferencias_correntes_brl")
            ),
            "bens_declarados_prefeito_brl": (prefeito or {}).get("bens_declarados_brl"),
            "limite_gastos_campanha_prefeito_brl": (prefeito or {}).get("limite_gastos_1t_brl"),
            "despesas_campanha_prefeito_brl": (prefeito or {}).get(
                "despesas_contratadas_campanha_brl"
            ),
        }

        payload: dict[str, Any] = {
            "consultado_em": _utc_iso(),
            "fonte": (
                "IBGE (Localidades, SIDRA 5938 e Pesquisas) + TSE DivulgaCandContas 2024 + "
                "Tesouro Nacional Siconfi DCA + Portal da Transparência CGU"
            ),
            "fonte_modo": fonte_modo,
            "unidade_moeda": CURRENCY_BRL,
            "cache_hit": False,
            "mandato": "2025-2028",
            "municipio": municipio_meta,
            "resumo_monetario": resumo_monetario,
            "executivo": {
                "prefeito": prefeito,
                "vice_prefeito": vice_prefeito,
            },
            "legislativo": {
                "total_vereadores_listados": len(vereadores),
                "distribuicao_partidaria": distribuicao_partidaria,
                "vereadores": vereadores,
            },
            "indicadores_ibge": indicadores_ibge,
            "financas_eleitorais_tse": financas_tse,
            "execucao_orcamentaria_siconfi": siconfi_dca,
            "portal_transparencia_cgu": cgu_info,
            "avisos": avisos,
        }
        self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
        return payload
