"""Banco Central do Brasil (BCB) Open Data connector: SGS indicators & PIX institutions."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from api.connectors.cache import ConnectorTTLCache
from api.connectors.captcha import CaptchaChallengeStore, ResolvedCaptchaInput
from api.connectors.errors import ConnectorValidationError, UpstreamConnectorError
from api.connectors.http_client import (
    HttpResponse,
    HttpTransport,
    UrllibHttpTransport,
    merge_cookie_header,
)
from api.connectors.validators import clean_digits, normalize_search_text

BCB_SGS_BASE_URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{serie}/dados/ultimos/{ultimos}"
BCB_PIX_OLINDA_URL = (
    "https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/"
    "ParticipantesPix"
)

SGS_SERIES_SPECS: tuple[dict[str, Any], ...] = (
    {
        "chave": "selic_meta",
        "codigo_sgs": 432,
        "nome": "Taxa Selic — Meta COPOM",
        "unidade": "% a.a.",
        "periodicidade": "diaria",
        "fallback_serie": [
            {"data": "2026-11-19", "valor": 11.25},
            {"data": "2026-11-20", "valor": 11.25},
            {"data": "2026-11-23", "valor": 11.25},
            {"data": "2026-11-24", "valor": 11.75},
            {"data": "2026-11-25", "valor": 11.75},
        ],
    },
    {
        "chave": "ipca_mensal",
        "codigo_sgs": 433,
        "nome": "IPCA — Variação Mensal (IBGE/SGS)",
        "unidade": "% a.m.",
        "periodicidade": "mensal",
        "fallback_serie": [
            {"data": "2026-06-01", "valor": 0.21},
            {"data": "2026-07-01", "valor": 0.38},
            {"data": "2026-08-01", "valor": -0.02},
            {"data": "2026-09-01", "valor": 0.44},
            {"data": "2026-10-01", "valor": 0.56},
        ],
    },
    {
        "chave": "ptax_usd_brl",
        "codigo_sgs": 1,
        "nome": "Câmbio PTAX USD/BRL — Venda",
        "unidade": "BRL/USD",
        "periodicidade": "diaria",
        "fallback_serie": [
            {"data": "2026-11-19", "valor": 5.7684},
            {"data": "2026-11-20", "valor": 5.7812},
            {"data": "2026-11-23", "valor": 5.7945},
            {"data": "2026-11-24", "valor": 5.8021},
            {"data": "2026-11-25", "valor": 5.7890},
        ],
    },
)

FALLBACK_PIX_PARTICIPANTS: tuple[dict[str, str], ...] = (
    {
        "ispb": "00000000",
        "nome": "BANCO DO BRASIL S.A.",
        "nome_reduzido": "BCO DO BRASIL S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "60701190",
        "nome": "ITAÚ UNIBANCO S.A.",
        "nome_reduzido": "ITAU UNIBANCO S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "18236120",
        "nome": "NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO",
        "nome_reduzido": "NU PAGAMENTOS - IP (NUBANK)",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "60746948",
        "nome": "BANCO BRADESCO S.A.",
        "nome_reduzido": "BCO BRADESCO S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "00360305",
        "nome": "CAIXA ECONÔMICA FEDERAL",
        "nome_reduzido": "CAIXA ECONOMICA FEDERAL",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "90400888",
        "nome": "BANCO SANTANDER (BRASIL) S.A.",
        "nome_reduzido": "BCO SANTANDER (BRASIL) S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "00416968",
        "nome": "BANCO INTER S.A.",
        "nome_reduzido": "BANCO INTER",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "10573521",
        "nome": "MERCADO PAGO INSTITUIÇÃO DE PAGAMENTO LTDA.",
        "nome_reduzido": "MERCADO PAGO IP LTDA.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "33603457",
        "nome": "PAGSEGURO INTERNET INSTITUIÇÃO DE PAGAMENTO S.A.",
        "nome_reduzido": "PAGSEGURO INTERNET IP S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "07679404",
        "nome": "BANCO BTG PACTUAL S.A.",
        "nome_reduzido": "BANCO BTG PACTUAL S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "33923798",
        "nome": "BANCO C6 S.A.",
        "nome_reduzido": "BCO C6 S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "01181521",
        "nome": "BANCO COOPERATIVO SICREDI S.A.",
        "nome_reduzido": "BCO COOPERATIVO SICREDI S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "02038232",
        "nome": "BANCO COOPERATIVO SICOOB S.A. - BANCOOB",
        "nome_reduzido": "BANCO SICOOB S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "16501555",
        "nome": "STONE INSTITUIÇÃO DE PAGAMENTO S.A.",
        "nome_reduzido": "STONE IP S.A.",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
    {
        "ispb": "09089356",
        "nome": "EFÍ S.A. - INSTITUIÇÃO DE PAGAMENTO",
        "nome_reduzido": "EFI S.A. - IP",
        "modalidade_pix": "PDCT",
        "tipo_participacao": "DIRETO",
        "inicio_operacao": "2020-11-03",
    },
)


def _utc_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _parse_bcb_date(raw_date: str) -> str:
    text = str(raw_date or "").strip()
    if "/" in text:
        parts = text.split("/")
        if len(parts) == 3:
            return f"{parts[2]}-{parts[1].zfill(2)}-{parts[0].zfill(2)}"
    return text[:10]


def _parse_bcb_float(raw_value: Any) -> float | None:
    if isinstance(raw_value, (int, float)):
        return float(raw_value)
    text = str(raw_value or "").strip()
    if not text:
        return None
    if "," in text and "." in text:
        text = text.replace(".", "").replace(",", ".")
    elif "," in text:
        text = text.replace(",", ".")
    try:
        return float(text)
    except ValueError:
        return None


def _summarize_series(spec: dict[str, Any], points: list[dict[str, Any]]) -> dict[str, Any]:
    latest = points[-1]
    previous = points[-2] if len(points) >= 2 else latest
    val_now = round(float(latest["valor"]), 4)
    val_prev = round(float(previous["valor"]), 4)
    diff_abs = round(val_now - val_prev, 4)
    diff_pct = round((diff_abs / abs(val_prev)) * 100.0, 4) if val_prev != 0 else 0.0
    if diff_abs > 1e-6:
        trend = "alta"
    elif diff_abs < -1e-6:
        trend = "baixa"
    else:
        trend = "estavel"

    result: dict[str, Any] = {
        "chave": spec["chave"],
        "codigo_sgs": spec["codigo_sgs"],
        "nome": spec["nome"],
        "unidade": spec["unidade"],
        "periodicidade": spec["periodicidade"],
        "data_referencia": latest["data"],
        "valor_atual": val_now,
        "valor_anterior": val_prev,
        "variacao_absoluta": diff_abs,
        "variacao_percentual": diff_pct,
        "tendencia": trend,
        "serie_historica": points,
    }
    if spec["chave"] == "ipca_mensal":
        factor = 1.0
        for pt in points:
            factor *= 1.0 + (float(pt["valor"]) / 100.0)
        result["acumulado_janela_pct"] = round((factor - 1.0) * 100.0, 4)
    return result


def _normalize_pix_row(raw: dict[str, Any]) -> dict[str, str] | None:
    ispb_raw = str(raw.get("ISPB") or raw.get("ispb") or "").strip()
    digits = clean_digits(ispb_raw)
    if not digits:
        return None
    ispb = digits.zfill(8)[:8]
    nome = str(
        raw.get("Nome_Extenso")
        or raw.get("Nome")
        or raw.get("nome")
        or raw.get("Nome_Reduzido")
        or ""
    ).strip()
    nome_reduzido = str(
        raw.get("Nome_Reduzido") or raw.get("nome_reduzido") or nome
    ).strip()
    if not nome:
        return None
    modalidade = str(
        raw.get("Modalidade_Participacao") or raw.get("modalidade_pix") or "PDCT"
    ).strip()
    tipo = str(
        raw.get("Tipo_Participacao") or raw.get("tipo_participacao") or "DIRETO"
    ).strip()
    inicio = _parse_bcb_date(
        str(raw.get("Inicio_Operacao") or raw.get("inicio_operacao") or "")
    )
    return {
        "ispb": ispb,
        "nome": nome,
        "nome_reduzido": nome_reduzido,
        "modalidade_pix": modalidade,
        "tipo_participacao": tipo,
        "inicio_operacao": inicio,
    }


class BCBConnectorService:
    """Queries official BCB Open Data (SGS & Olinda PIX) with TTL cache and resilient fallback."""

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        captcha_store: CaptchaChallengeStore | None = None,
        timeout_seconds: float = 3.0,
        indicadores_ttl_seconds: float = 900.0,
        instituicoes_ttl_seconds: float = 3600.0,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
        self._cache = cache or ConnectorTTLCache()
        self._captcha_store = captcha_store or CaptchaChallengeStore(cache=self._cache)
        self._timeout = timeout_seconds
        self._indicadores_ttl = indicadores_ttl_seconds
        self._instituicoes_ttl = instituicoes_ttl_seconds

    def _build_headers(
        self,
        cookie_jar: dict[str, str],
        raw_session_cookie: str | None,
        solution: str | None,
    ) -> dict[str, str] | None:
        headers: dict[str, str] = {}
        merged_cookie = merge_cookie_header(cookie_jar, raw_session_cookie)
        if merged_cookie:
            headers["Cookie"] = merged_cookie
        if solution:
            headers["X-Captcha-Response"] = solution
        return headers or None

    def get_indicadores(
        self,
        ultimos: int | None = None,
        *,
        challenge_id: str | None = None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Return Selic, IPCA, and PTAX USD/BRL series with recent history and variation."""
        explicit_lookup = dict(consulta_payload or {})
        if ultimos is not None:
            explicit_lookup["ultimos"] = ultimos

        resolved: ResolvedCaptchaInput = self._captcha_store.resolve_inputs(
            challenge_id=challenge_id,
            captcha_token=captcha_token,
            captcha_solution=captcha_solution,
            session_cookie=session_cookie,
            consulta_payload=explicit_lookup or None,
        )

        effective_ultimos = (
            ultimos
            if ultimos is not None
            else (
                int(resolved.consulta_payload["ultimos"])
                if resolved.consulta_payload.get("ultimos") is not None
                else 5
            )
        )
        if (
            not isinstance(effective_ultimos, int)
            or effective_ultimos < 1
            or effective_ultimos > 30
        ):
            raise ConnectorValidationError(
                "Parâmetro 'ultimos' deve ser um inteiro entre 1 e 30.",
                extra={"field": "ultimos"},
            )

        resuming_captcha = bool(resolved.challenge_id or resolved.solution)
        cache_key = f"bcb:indicadores:{effective_ultimos}"
        if not resuming_captcha and not resolved.session_cookie:
            hit, cached = self._cache.get(cache_key)
            if hit:
                return {**cached, "cache_hit": True}

        cookie_jar = dict(resolved.cookie_jar)
        prefetched: dict[str, HttpResponse] = {}
        if resolved.challenge is not None and resolved.challenge.connector == "bcb":
            sub_resp, cookie_jar = self._captcha_store.submit_upstream_solution(
                resolved.challenge,
                resolved,
                transport=self._transport,
                timeout_seconds=self._timeout,
                extra_params={"formato": "json"},
            )
            try:
                if isinstance(sub_resp.json(), list):
                    prefetched[resolved.challenge.operation] = sub_resp
            except UpstreamConnectorError:
                pass

        active_payload = {"ultimos": effective_ultimos}
        indicadores: dict[str, Any] = {}
        avisos: list[str] = []
        live_count = 0

        for spec in SGS_SERIES_SPECS:
            op_name = f"sgs_{spec['codigo_sgs']}"
            url = BCB_SGS_BASE_URL.format(
                serie=spec["codigo_sgs"], ultimos=effective_ultimos
            )
            points: list[dict[str, Any]] = []
            try:
                if op_name in prefetched:
                    resp = prefetched.pop(op_name)
                else:
                    resp = self._transport.request(
                        url,
                        params={"formato": "json"},
                        headers=self._build_headers(
                            cookie_jar, resolved.session_cookie, resolved.solution
                        ),
                        timeout_seconds=self._timeout,
                    )
                cookie_jar.update(resp.cookies())
                self._captcha_store.inspect_response_for_captcha(
                    resp,
                    connector="bcb",
                    operation=op_name,
                    consulta_payload=active_payload,
                    resume_endpoint="/api/v1/bcb/indicadores",
                    resume_method="GET",
                    portal_url=url,
                    cookie_jar=cookie_jar,
                    raw_session_cookie=resolved.session_cookie,
                    transport=self._transport,
                    timeout_seconds=self._timeout,
                )
                raw_items = resp.json()
                if isinstance(raw_items, list):
                    for row in raw_items[-effective_ultimos:]:
                        if not isinstance(row, dict):
                            continue
                        val = _parse_bcb_float(row.get("valor"))
                        dt = _parse_bcb_date(str(row.get("data") or ""))
                        if val is not None and dt:
                            points.append({"data": dt, "valor": round(val, 4)})
                if points:
                    live_count += 1
                else:
                    raise UpstreamConnectorError(f"Série SGS {spec['codigo_sgs']} vazia.")
            except UpstreamConnectorError as exc:
                self._captcha_store.inspect_upstream_error_for_captcha(
                    exc,
                    connector="bcb",
                    operation=op_name,
                    consulta_payload=active_payload,
                    resume_endpoint="/api/v1/bcb/indicadores",
                    resume_method="GET",
                    portal_url=url,
                    cookie_jar=cookie_jar,
                    raw_session_cookie=resolved.session_cookie,
                    transport=self._transport,
                    timeout_seconds=self._timeout,
                )
                avisos.append(f"SGS {spec['codigo_sgs']} ({spec['chave']}): {exc.detail}")
                fallback_pts = list(spec["fallback_serie"])[-effective_ultimos:]
                points = [dict(item) for item in fallback_pts]

            indicadores[spec["chave"]] = _summarize_series(spec, points)

        if live_count == len(SGS_SERIES_SPECS):
            fonte_modo = "online_bcb_sgs"
        elif live_count > 0:
            fonte_modo = "hibrido_bcb_sgs_fallback"
        else:
            fonte_modo = "fallback_resiliente"

        payload: dict[str, Any] = {
            "atualizado_em": _utc_iso(),
            "fonte": "Banco Central do Brasil — Dados Abertos SGS (Séries 432, 433 e 1)",
            "fonte_modo": fonte_modo,
            "cache_hit": False,
            "captcha_resumed": resuming_captcha,
            "janela_periodos": effective_ultimos,
            "indicadores": indicadores,
            "avisos": avisos,
        }
        self._cache.set(cache_key, payload, ttl_seconds=self._indicadores_ttl)
        return payload

    def _load_pix_directory(
        self,
        *,
        consulta_payload: dict[str, Any] | None = None,
        cookie_jar: dict[str, str] | None = None,
        raw_session_cookie: str | None = None,
        solution: str | None = None,
        prefetched_response: HttpResponse | None = None,
        bypass_cache: bool = False,
    ) -> tuple[list[dict[str, str]], str, bool, list[str]]:
        dir_key = "bcb:pix:directory"
        if not bypass_cache:
            hit, cached_entry = self._cache.get(dir_key)
            if hit:
                rows, fonte_modo, avisos = cached_entry
                return rows, fonte_modo, True, list(avisos)

        active_jar = cookie_jar if cookie_jar is not None else {}
        avisos: list[str] = []
        rows: list[dict[str, str]] = []
        fonte_modo = "online_bcb_olinda"
        try:
            if prefetched_response is not None:
                resp = prefetched_response
            else:
                resp = self._transport.request(
                    BCB_PIX_OLINDA_URL,
                    params={"$top": 500, "$format": "json"},
                    headers=self._build_headers(
                        active_jar, raw_session_cookie, solution
                    ),
                    timeout_seconds=self._timeout,
                )
            active_jar.update(resp.cookies())
            self._captcha_store.inspect_response_for_captcha(
                resp,
                connector="bcb",
                operation="search_instituicoes",
                consulta_payload=consulta_payload or {},
                resume_endpoint="/api/v1/bcb/instituicoes",
                resume_method="GET",
                portal_url=BCB_PIX_OLINDA_URL,
                cookie_jar=active_jar,
                raw_session_cookie=raw_session_cookie,
                transport=self._transport,
                timeout_seconds=self._timeout,
            )
            body = resp.json()
            raw_list = body.get("value") if isinstance(body, dict) else body
            if isinstance(raw_list, list):
                seen: set[str] = set()
                for item in raw_list:
                    if not isinstance(item, dict):
                        continue
                    norm = _normalize_pix_row(item)
                    if norm and norm["ispb"] not in seen:
                        seen.add(norm["ispb"])
                        rows.append(norm)
            if not rows:
                raise UpstreamConnectorError("Lista Olinda ParticipantesPix vazia.")
        except UpstreamConnectorError as exc:
            self._captcha_store.inspect_upstream_error_for_captcha(
                exc,
                connector="bcb",
                operation="search_instituicoes",
                consulta_payload=consulta_payload or {},
                resume_endpoint="/api/v1/bcb/instituicoes",
                resume_method="GET",
                portal_url=BCB_PIX_OLINDA_URL,
                cookie_jar=active_jar,
                raw_session_cookie=raw_session_cookie,
                transport=self._transport,
                timeout_seconds=self._timeout,
            )
            fonte_modo = "fallback_resiliente"
            avisos.append(f"Olinda PIX indisponível ({exc.detail}); usando catálogo de referência.")
            rows = [dict(item) for item in FALLBACK_PIX_PARTICIPANTS]

        self._cache.set(dir_key, (rows, fonte_modo, avisos), ttl_seconds=self._instituicoes_ttl)
        return rows, fonte_modo, False, avisos

    def search_instituicoes(
        self,
        busca: str | None = None,
        *,
        limite: int | None = None,
        challenge_id: str | None = None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Filter BCB-authorized / PIX participant institutions by name or 8-digit ISPB."""
        explicit_lookup = dict(consulta_payload or {})
        if busca is not None and str(busca).strip():
            explicit_lookup["busca"] = str(busca).strip()
        if limite is not None:
            explicit_lookup["limite"] = limite

        resolved: ResolvedCaptchaInput = self._captcha_store.resolve_inputs(
            challenge_id=challenge_id,
            captcha_token=captcha_token,
            captcha_solution=captcha_solution,
            session_cookie=session_cookie,
            consulta_payload=explicit_lookup or None,
        )

        effective_busca = (
            busca
            if busca is not None
            else str(resolved.consulta_payload.get("busca") or "")
        )
        effective_limite = (
            limite
            if limite is not None
            else (
                int(resolved.consulta_payload["limite"])
                if resolved.consulta_payload.get("limite") is not None
                else 20
            )
        )

        if (
            not isinstance(effective_limite, int)
            or effective_limite < 1
            or effective_limite > 100
        ):
            raise ConnectorValidationError(
                "Parâmetro 'limite' deve ser um inteiro entre 1 e 100.",
                extra={"field": "limite"},
            )

        resuming_captcha = bool(resolved.challenge_id or resolved.solution)
        cookie_jar = dict(resolved.cookie_jar)
        prefetched_pix: HttpResponse | None = None
        if resolved.challenge is not None and resolved.challenge.connector == "bcb":
            sub_resp, cookie_jar = self._captcha_store.submit_upstream_solution(
                resolved.challenge,
                resolved,
                transport=self._transport,
                timeout_seconds=self._timeout,
                extra_params={"$top": 500, "$format": "json"},
            )
            try:
                maybe_body = sub_resp.json()
                if isinstance(maybe_body, (dict, list)):
                    prefetched_pix = sub_resp
            except UpstreamConnectorError:
                prefetched_pix = None

        raw_query = str(effective_busca or "").strip()
        active_payload = {"busca": raw_query, "limite": effective_limite}
        rows, fonte_modo, cache_hit, avisos = self._load_pix_directory(
            consulta_payload=active_payload,
            cookie_jar=cookie_jar,
            raw_session_cookie=resolved.session_cookie,
            solution=resolved.solution,
            prefetched_response=prefetched_pix,
            bypass_cache=resuming_captcha,
        )
        limite = effective_limite
        norm_query = normalize_search_text(raw_query)
        digit_query = clean_digits(raw_query)

        if not norm_query and not digit_query:
            matched = rows[:limite]
            total_encontrado = len(rows)
        else:
            tokens = [tok for tok in norm_query.split(" ") if tok]
            scored: list[tuple[int, dict[str, str]]] = []
            for inst in rows:
                haystack = normalize_search_text(f"{inst['nome']} {inst['nome_reduzido']}")
                ispb = inst["ispb"]
                score = 0
                if digit_query:
                    if ispb == digit_query.zfill(8):
                        score += 1000
                    elif ispb.startswith(digit_query) or digit_query in ispb:
                        score += 650
                if norm_query and norm_query in haystack:
                    score += 400
                elif tokens and all(tok in haystack for tok in tokens):
                    score += 250
                if score > 0:
                    scored.append((score, inst))

            scored.sort(key=lambda pair: (-pair[0], pair[1]["ispb"]))
            total_encontrado = len(scored)
            matched = [item for _, item in scored[:limite]]

        return {
            "atualizado_em": _utc_iso(),
            "fonte": "Banco Central do Brasil — Dados Abertos Olinda (Participantes PIX / STR)",
            "fonte_modo": fonte_modo,
            "cache_hit": cache_hit,
            "captcha_resumed": resuming_captcha,
            "filtro_busca": raw_query,
            "total_catalogo": len(rows),
            "total_encontrado": total_encontrado,
            "instituicoes": matched,
            "avisos": avisos,
        }
