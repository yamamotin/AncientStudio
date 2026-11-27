"""PROJUDI public case inquiry, HTML parser, LGPD masking, and AI/n8n triage contract."""

from __future__ import annotations

from datetime import date, datetime, timezone
import hashlib
from html.parser import HTMLParser
import os
import re
from typing import Any

from api.connectors.cache import ConnectorTTLCache
from api.connectors.errors import (
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import HttpTransport, UrllibHttpTransport
from api.connectors.validators import (
    compute_cnj_check_digits,
    format_cnj_number,
    mask_cpf,
    mask_sensitive_text,
    normalize_search_text,
    validate_cnj_process_number,
    validate_cpf,
)

SUPPORTED_TRIBUNALS: dict[str, dict[str, str]] = {
    "TJPR": {"justica": "8", "codigo_tr": "16", "nome": "Tribunal de Justiça do Estado do Paraná"},
    "TJSP": {"justica": "8", "codigo_tr": "26", "nome": "Tribunal de Justiça de São Paulo"},
    "TJMG": {"justica": "8", "codigo_tr": "13", "nome": "Tribunal de Justiça de Minas Gerais"},
    "TJSC": {"justica": "8", "codigo_tr": "24", "nome": "Tribunal de Justiça de Santa Catarina"},
    "TJRS": {"justica": "8", "codigo_tr": "21", "nome": "Tribunal de Justiça do Rio Grande do Sul"},
    "TJGO": {"justica": "8", "codigo_tr": "09", "nome": "Tribunal de Justiça do Estado de Goiás"},
    "TJBA": {"justica": "8", "codigo_tr": "05", "nome": "Tribunal de Justiça do Estado da Bahia"},
}

_DATE_ISO_RE = re.compile(r"\b(\d{4})-(\d{2})-(\d{2})\b")
_DATE_BR_RE = re.compile(r"\b(\d{2})/(\d{2})/(\d{4})\b")


def _utc_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _parse_any_date(text: str) -> date | None:
    iso_m = _DATE_ISO_RE.search(text)
    if iso_m:
        try:
            return date(int(iso_m.group(1)), int(iso_m.group(2)), int(iso_m.group(3)))
        except ValueError:
            return None
    br_m = _DATE_BR_RE.search(text)
    if br_m:
        try:
            return date(int(br_m.group(3)), int(br_m.group(2)), int(br_m.group(1)))
        except ValueError:
            return None
    return None


class ProjudiPublicHtmlParser(HTMLParser):
    """Decoupled stdlib HTML parser for PROJUDI public consultation tables.

    Extracts table rows (``<tr>``/``<td>``) and labeled metadata pairs without external
    scraping libraries or CAPTCHA circumvention.
    """

    def __init__(self) -> None:
        super().__init__()
        self._in_cell = False
        self._cell_buf: list[str] = []
        self._current_row: list[str] = []
        self.rows: list[list[str]] = []
        self.contains_captcha_challenge = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_dict = {k.lower(): (v or "") for k, v in attrs}
        joined_attrs = " ".join(attr_dict.values()).lower()
        if "captcha" in joined_attrs or "g-recaptcha" in joined_attrs or "hcaptcha" in joined_attrs:
            self.contains_captcha_challenge = True
        if tag in {"td", "th"}:
            self._in_cell = True
            self._cell_buf = []
        elif tag == "tr":
            self._current_row = []

    def handle_data(self, data: str) -> None:
        if "digite os caracteres da imagem" in data.lower():
            self.contains_captcha_challenge = True
        if self._in_cell:
            self._cell_buf.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag in {"td", "th"} and self._in_cell:
            self._in_cell = False
            cleaned = re.sub(r"\s+", " ", "".join(self._cell_buf)).strip()
            self._current_row.append(cleaned)
        elif tag == "tr" and self._current_row:
            if any(cell for cell in self._current_row):
                self.rows.append(self._current_row)
            self._current_row = []


def parse_projudi_search_html(html: str, tribunal: str) -> list[dict[str, Any]]:
    """Convert parsed PROJUDI HTML table rows into masked structured case summaries."""
    parser = ProjudiPublicHtmlParser()
    parser.feed(html)
    if parser.contains_captcha_challenge and not parser.rows:
        raise UpstreamConnectorError("Desafio CAPTCHA ativo na página pública do PROJUDI.")

    cases: list[dict[str, Any]] = []
    for row in parser.rows:
        if len(row) < 4:
            continue
        first_cell = row[0]
        try:
            cnj = validate_cnj_process_number(first_cell)
        except ConnectorValidationError:
            continue

        cases.append(
            {
                "numero_processo": cnj,
                "tribunal": tribunal,
                "classe": mask_sensitive_text(row[1]),
                "assunto": mask_sensitive_text(row[2]),
                "vara_comarca": mask_sensitive_text(row[3]),
                "data_distribuicao": row[4] if len(row) > 4 else "2024-05-10",
                "situacao": row[5] if len(row) > 5 else "Ativo — Em tramitação",
                "ultima_movimentacao": mask_sensitive_text(row[6]) if len(row) > 6 else "",
                "segredo_justica": False,
            }
        )
    return cases


def _build_sandbox_cnj(seq_int: int, year: int, just: str, tr: str, orig: str) -> str:
    seq7 = f"{seq_int % 10_000_000:07d}"
    year4 = f"{year:04d}"
    dd = compute_cnj_check_digits(seq7, year4, just, tr, orig)
    return format_cnj_number(f"{seq7}{dd}{year4}{just}{tr}{orig}")


SANDBOX_KNOWN_PROCESSES: dict[str, dict[str, Any]] = {
    "0001234-42.2024.8.16.0130": {
        "numero_processo": "0001234-42.2024.8.16.0130",
        "tribunal": "TJPR",
        "grau": "1º Grau",
        "classe": "Procedimento Comum Cível",
        "assunto_principal": "Indenização por Dano Material / Inadimplemento Contratual",
        "comarca": "Comarca de Paranavaí — PR",
        "vara": "1ª Vara Cível e da Fazenda Pública de Paranavaí",
        "juizo": "Juízo Titular da 1ª Vara Cível",
        "data_distribuicao": "2024-03-18",
        "situacao": "Ativo — Concluso para Sentença",
        "valor_causa_brl": 48500.00,
        "segredo_justica": False,
        "partes": [
            {
                "polo": "ATIVO",
                "tipo_participacao": "Autor",
                "nome": "Comercial Agrícola Noroeste Ltda.",
                "documento_mascarado": "14.***.***/0001-**",
                "advogados": ["Dra. Helena M. Sato (OAB/PR 68.410)"],
            },
            {
                "polo": "PASSIVO",
                "tipo_participacao": "Réu",
                "nome": "J. R. S. Logística Integrada",
                "documento_mascarado": "***.444.777-**",
                "advogados": ["Dr. Marcos V. Almeida (OAB/PR 54.122)"],
            },
        ],
        "movimentacoes": [
            {
                "sequencia": 1,
                "data": "2024-03-18",
                "codigo_cnj": 26,
                "tipo": "Distribuição",
                "descricao": "Distribuído por sorteio automático à 1ª Vara Cível de Paranavaí.",
            },
            {
                "sequencia": 2,
                "data": "2024-04-02",
                "codigo_cnj": 11010,
                "tipo": "Decisão Interlocutória",
                "descricao": "Deferida parcialmente tutela de urgência para depósito caucionado e determinada citação.",
            },
            {
                "sequencia": 3,
                "data": "2024-05-14",
                "codigo_cnj": 85,
                "tipo": "Juntada de Contestação",
                "descricao": "Juntada de contestação tempestiva com documentos comprobatórios de entrega parcial.",
            },
            {
                "sequencia": 4,
                "data": "2024-08-22",
                "codigo_cnj": 970,
                "tipo": "Audiência / Instrução",
                "descricao": "Encerrada a instrução probatória; aberto prazo sucessivo para memoriais finais.",
            },
            {
                "sequencia": 5,
                "data": "2026-10-29",
                "codigo_cnj": 51,
                "tipo": "Conclusão",
                "descricao": "Autos conclusos ao magistrado para prolação de sentença de mérito.",
            },
        ],
    },
    "0008421-18.2025.8.16.0001": {
        "numero_processo": "0008421-18.2025.8.16.0001",
        "tribunal": "TJPR",
        "grau": "1º Grau",
        "classe": "Cumprimento de Sentença",
        "assunto_principal": "Repetição de Indébito Tributário / Tarifa Bancária",
        "comarca": "Foro Central da Comarca da Região Metropolitana de Curitiba",
        "vara": "4ª Vara Cível de Curitiba",
        "juizo": "Juízo da 4ª Vara Cível",
        "data_distribuicao": "2025-02-11",
        "situacao": "Ativo — Fase de Cumprimento / Penhora Online",
        "valor_causa_brl": 19240.80,
        "segredo_justica": False,
        "partes": [
            {
                "polo": "ATIVO",
                "tipo_participacao": "Exequente",
                "nome": "Parte Autora (CPF ***.444.777-**)",
                "documento_mascarado": "***.444.777-**",
                "advogados": ["Dr. Lucas F. Rocha (OAB/PR 79.305)"],
            },
            {
                "polo": "PASSIVO",
                "tipo_participacao": "Executado",
                "nome": "Instituição Financeira S.A.",
                "documento_mascarado": "60.***.***/0001-**",
                "advogados": ["Dra. Camila T. Pires (OAB/SP 312.880)"],
            },
        ],
        "movimentacoes": [
            {
                "sequencia": 1,
                "data": "2025-02-11",
                "codigo_cnj": 156,
                "tipo": "Início de Cumprimento",
                "descricao": "Recebido pedido de cumprimento definitivo de sentença transitada em julgado.",
            },
            {
                "sequencia": 2,
                "data": "2025-06-19",
                "codigo_cnj": 11382,
                "tipo": "Bloqueio / SISBAJUD",
                "descricao": "Realizado bloqueio eletrônico via SISBAJUD para garantia integral do débito exequendo.",
            },
            {
                "sequencia": 3,
                "data": "2026-11-12",
                "codigo_cnj": 60,
                "tipo": "Expedição de Alvará",
                "descricao": "Determinada expedição de alvará eletrônico de levantamento após preclusão.",
            },
        ],
    },
}


def _classify_phase_and_metrics(
    movimentacoes: list[dict[str, Any]],
    extra_text: str,
    data_distribuicao: str,
) -> dict[str, Any]:
    joined_raw = " ".join(
        [str(m.get("tipo") or "") + " " + str(m.get("descricao") or "") for m in movimentacoes]
        + [extra_text]
    )
    norm = normalize_search_text(joined_raw)

    has_urgencia = any(
        kw in norm for kw in ("tutela de urgencia", "liminar", "efeito suspensivo", "urgente")
    )
    has_sentenca = any(
        kw in norm for kw in ("proferida sentenca", "julgado procedente", "julgado improcedente", "sentenca transitada")
    )
    concluso_sentenca = "conclusos" in norm and "sentenca" in norm
    has_recurso = any(
        kw in norm for kw in ("apelacao", "agravo de instrumento", "recurso inominado", "embargos de declaracao")
    )
    has_penhora = any(
        kw in norm for kw in ("sisbajud", "penhora", "bloqueio", "cumprimento de sentenca", "cumprimento definitivo", "alvara")
    )
    is_arquivado = any(
        kw in norm for kw in ("arquivado definitivamente", "baixa definitiva", "extinto o processo")
    )

    if is_arquivado:
        fase = "arquivado_baixado"
    elif has_penhora:
        fase = "cumprimento_sentenca_execucao"
    elif has_recurso:
        fase = "fase_recursal"
    elif has_sentenca or concluso_sentenca:
        fase = "julgamento_sentenca"
    elif "instrucao" in norm or "audiencia" in norm or "pericia" in norm or "contestacao" in norm:
        fase = "instrucao_probatoria"
    else:
        fase = "postulatoria_citacao"

    today = datetime.now(timezone.utc).date()
    dist_date = _parse_any_date(data_distribuicao)
    parsed_mov_dates = [
        dt for dt in (_parse_any_date(str(m.get("data") or "")) for m in movimentacoes) if dt is not None
    ]
    if not dist_date and parsed_mov_dates:
        dist_date = min(parsed_mov_dates)

    last_date = max(parsed_mov_dates) if parsed_mov_dates else dist_date
    dias_tramitacao = max(0, (today - dist_date).days) if dist_date else 0
    dias_ultima = max(0, (today - last_date).days) if last_date else 0

    score = 25
    if has_urgencia:
        score += 35
    if has_penhora:
        score += 25
    if has_recurso:
        score += 15
    if concluso_sentenca or has_sentenca:
        score += 10
    if is_arquivado:
        score = 10
    score = min(100, max(0, score))

    if score >= 70:
        prioridade = "alta"
    elif score >= 40:
        prioridade = "media"
    else:
        prioridade = "baixa"

    return {
        "fase_processual": fase,
        "metricas": {
            "total_movimentacoes": len(movimentacoes),
            "dias_tramitacao": dias_tramitacao,
            "dias_desde_ultima_movimentacao": dias_ultima,
            "possui_tutela_urgencia": has_urgencia,
            "possui_sentenca": has_sentenca or concluso_sentenca,
            "possui_recurso": has_recurso,
            "possui_penhora_bloqueio": has_penhora,
            "prioridade_triagem": prioridade,
            "score_prioridade": score,
        },
    }


class ProjudiConnectorService:
    """Public PROJUDI inquiry & deterministic AI/n8n triage connector.

    Strictly respects CAPTCHA & legal boundaries: never attempts CAPTCHA bypass.
    Uses ``ProjudiPublicHtmlParser`` when an authorized upstream URL + ``captcha_token``
    is configured, and falls back to deterministic LGPD-masked sandbox records otherwise.
    """

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        upstream_search_url: str | None = None,
        timeout_seconds: float = 3.5,
        ttl_seconds: float = 600.0,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
        self._cache = cache or ConnectorTTLCache()
        self._upstream_url = (
            upstream_search_url or os.environ.get("PROJUDI_PUBLIC_SEARCH_URL") or ""
        ).strip()
        self._timeout = timeout_seconds
        self._ttl = ttl_seconds

    def _validate_tribunal(self, raw_tribunal: str | None) -> str:
        tribunal = str(raw_tribunal or "TJPR").strip().upper()
        if tribunal not in SUPPORTED_TRIBUNALS:
            raise ConnectorValidationError(
                f"Tribunal '{raw_tribunal}' não suportado. Use um dos códigos: "
                f"{', '.join(sorted(SUPPORTED_TRIBUNALS))}.",
                extra={"field": "tribunal", "allowed": sorted(SUPPORTED_TRIBUNALS)},
            )
        return tribunal

    def _generate_sandbox_cases_for_cpf(
        self, cpf_digits: str, cpf_masked: str, tribunal: str
    ) -> list[dict[str, Any]]:
        if tribunal == "TJPR" and cpf_digits == "11144477735":
            return [
                {
                    "numero_processo": item["numero_processo"],
                    "tribunal": item["tribunal"],
                    "classe": item["classe"],
                    "assunto": item["assunto_principal"],
                    "vara_comarca": f"{item['vara']} — {item['comarca']}",
                    "data_distribuicao": item["data_distribuicao"],
                    "situacao": item["situacao"],
                    "polo_parte_consultada": item["partes"][1 if idx == 0 else 0]["polo"],
                    "ultima_movimentacao": item["movimentacoes"][-1]["descricao"],
                    "segredo_justica": False,
                }
                for idx, item in enumerate(SANDBOX_KNOWN_PROCESSES.values())
            ]

        meta = SUPPORTED_TRIBUNALS[tribunal]
        seed = int(hashlib.sha256(f"{cpf_digits}:{tribunal}".encode()).hexdigest()[:8], 16)
        cnj_one = _build_sandbox_cnj(
            100000 + (seed % 800000),
            2024,
            meta["justica"],
            meta["codigo_tr"],
            "0130" if tribunal == "TJPR" else "0001",
        )
        return [
            {
                "numero_processo": cnj_one,
                "tribunal": tribunal,
                "classe": "Procedimento do Juizado Especial Cível",
                "assunto": "Obrigação de Fazer / Direito do Consumidor",
                "vara_comarca": f"1º Juizado Especial Cível ({tribunal})",
                "data_distribuicao": "2024-07-15",
                "situacao": "Ativo — Aguardando Audiência de Conciliação",
                "polo_parte_consultada": "ATIVO",
                "documento_parte_mascarado": cpf_masked,
                "ultima_movimentacao": "Designada sessão de conciliação por videoconferência.",
                "segredo_justica": False,
            }
        ]

    def consulta_por_cpf(
        self,
        *,
        cpf: str | None,
        tribunal: str | None = "TJPR",
        captcha_token: str | None = None,
    ) -> dict[str, Any]:
        """Validate CPF, execute public PROJUDI lookup (or sandbox), and mask sensitive data."""
        cpf_digits = validate_cpf(cpf)
        clean_tribunal = self._validate_tribunal(tribunal)
        cpf_masked = mask_cpf(cpf_digits)
        token_clean = str(captcha_token or "").strip()

        cpf_hash = hashlib.sha256(f"{cpf_digits}:{clean_tribunal}".encode()).hexdigest()[:16]
        cache_key = f"projudi:cpf:{cpf_hash}:tok={bool(token_clean)}"
        hit, cached = self._cache.get(cache_key)
        if hit:
            return {**cached, "cache_hit": True}

        avisos: list[str] = []
        modo_execucao = "sandbox_demonstracao"
        if token_clean and self._upstream_url:
            try:
                body_bytes = (
                    f"cpf={cpf_digits}&tribunal={clean_tribunal}&captcha_token={token_clean}"
                ).encode()
                resp = self._transport.request(
                    self._upstream_url,
                    method="POST",
                    headers={"Content-Type": "application/x-www-form-urlencoded"},
                    data=body_bytes,
                    timeout_seconds=self._timeout,
                )
                processos = parse_projudi_search_html(resp.text(), clean_tribunal)
                modo_execucao = "conector_html_publico"
            except UpstreamConnectorError as exc:
                avisos.append(
                    f"Consulta externa PROJUDI indisponível ({exc.detail}); "
                    "retornando registros do modo sandbox."
                )
                processos = self._generate_sandbox_cases_for_cpf(
                    cpf_digits, cpf_masked, clean_tribunal
                )
        else:
            if not token_clean:
                avisos.append(
                    "Nenhum captcha_token ativo informado: operando em modo sandbox/demonstração "
                    "(sem burla de CAPTCHA, em conformidade legal e LGPD)."
                )
            else:
                avisos.append(
                    "captcha_token validado no contrato; PROJUDI_PUBLIC_SEARCH_URL não configurada, "
                    "usando modo sandbox."
                )
            processos = self._generate_sandbox_cases_for_cpf(
                cpf_digits, cpf_masked, clean_tribunal
            )

        payload: dict[str, Any] = {
            "consultado_em": _utc_iso(),
            "tribunal": clean_tribunal,
            "tribunal_nome": SUPPORTED_TRIBUNALS[clean_tribunal]["nome"],
            "cpf_mascarado": cpf_masked,
            "modo_execucao": modo_execucao,
            "captcha_token_informado": bool(token_clean),
            "cache_hit": False,
            "politica_privacidade": "LGPD_MASKED_PUBLIC_RECORDS_ONLY",
            "total_processos": len(processos),
            "processos": processos,
            "avisos": avisos,
        }
        self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
        return payload

    def obter_processo(self, numero_processo: str | None) -> dict[str, Any]:
        """Return full public case details (class, subject, court, masked parties, movements)."""
        cnj = validate_cnj_process_number(numero_processo)
        if cnj.startswith("9999999-"):
            raise ConnectorNotFoundError(
                f"Processo público '{cnj}' não encontrado na base do PROJUDI."
            )

        cache_key = f"projudi:proc:{cnj}"
        hit, cached = self._cache.get(cache_key)
        if hit:
            return {**cached, "cache_hit": True}

        if cnj in SANDBOX_KNOWN_PROCESSES:
            record = SANDBOX_KNOWN_PROCESSES[cnj]
            payload: dict[str, Any] = {
                "consultado_em": _utc_iso(),
                "modo_execucao": "sandbox_demonstracao",
                "cache_hit": False,
                **record,
            }
        else:
            tr_code = cnj.split(".")[-2]
            tribunal = next(
                (sigla for sigla, info in SUPPORTED_TRIBUNALS.items() if info["codigo_tr"] == tr_code),
                "TJPR",
            )
            year = cnj.split(".")[1]
            payload = {
                "consultado_em": _utc_iso(),
                "modo_execucao": "sandbox_demonstracao",
                "cache_hit": False,
                "numero_processo": cnj,
                "tribunal": tribunal,
                "grau": "1º Grau",
                "classe": "Procedimento do Juizado Especial Cível",
                "assunto_principal": "Obrigação de Fazer / Revisão Contratual",
                "comarca": f"Foro Regional ({tribunal})",
                "vara": f"1º Juizado Especial Cível ({tribunal})",
                "juizo": "Juízo Titular do Juizado Especial",
                "data_distribuicao": f"{year}-07-15",
                "situacao": "Ativo — Em Instrução",
                "valor_causa_brl": 12800.00,
                "segredo_justica": False,
                "partes": [
                    {
                        "polo": "ATIVO",
                        "tipo_participacao": "Reclamante",
                        "nome": "Parte Reclamante (Dados Públicos Mascarados)",
                        "documento_mascarado": "***.***.***-**",
                        "advogados": ["Defensoria / Advogado Constituído (OAB Ativa)"],
                    },
                    {
                        "polo": "PASSIVO",
                        "tipo_participacao": "Reclamado",
                        "nome": "Empresa Prestadora de Serviços S.A.",
                        "documento_mascarado": "00.***.***/0001-**",
                        "advogados": ["Departamento Jurídico Credenciado"],
                    },
                ],
                "movimentacoes": [
                    {
                        "sequencia": 1,
                        "data": f"{year}-07-15",
                        "codigo_cnj": 26,
                        "tipo": "Distribuição",
                        "descricao": "Processo autuado e distribuído eletronicamente no PROJUDI.",
                    },
                    {
                        "sequencia": 2,
                        "data": f"{year}-08-05",
                        "codigo_cnj": 122,
                        "tipo": "Citação / Intimação",
                        "descricao": "Expedida citação eletrônica da parte reclamada com prazo legal.",
                    },
                    {
                        "sequencia": 3,
                        "data": "2026-10-18",
                        "codigo_cnj": 85,
                        "tipo": "Juntada de Manifestação",
                        "descricao": "Juntada de impugnação à contestação; autos aguardando saneamento.",
                    },
                ],
            }

        self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
        return payload

    def resumir_processo(
        self,
        numero_processo: str | None,
        body: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Extract deterministic case metrics/phases and prepare an AI/n8n-ready summary."""
        cnj = validate_cnj_process_number(numero_processo)
        req_data = body if isinstance(body, dict) else {}
        raw_text = mask_sensitive_text(str(req_data.get("texto_processo") or "").strip())
        incoming_movs = req_data.get("movimentacoes")
        objetivo = str(req_data.get("objetivo") or "triagem_juridica_executiva").strip()

        base_case = self.obter_processo(cnj)
        normalized_movs: list[dict[str, Any]] = []

        if isinstance(incoming_movs, list) and incoming_movs:
            for idx, item in enumerate(incoming_movs, start=1):
                if isinstance(item, dict):
                    normalized_movs.append(
                        {
                            "sequencia": int(item.get("sequencia") or idx),
                            "data": str(item.get("data") or ""),
                            "tipo": mask_sensitive_text(str(item.get("tipo") or "Movimentação")),
                            "descricao": mask_sensitive_text(str(item.get("descricao") or "")),
                        }
                    )
                elif isinstance(item, str) and item.strip():
                    normalized_movs.append(
                        {
                            "sequencia": idx,
                            "data": "",
                            "tipo": "Movimentação Informada",
                            "descricao": mask_sensitive_text(item.strip()),
                        }
                    )
        else:
            normalized_movs = [
                {
                    "sequencia": m["sequencia"],
                    "data": m["data"],
                    "tipo": m["tipo"],
                    "descricao": mask_sensitive_text(m["descricao"]),
                }
                for m in base_case["movimentacoes"]
            ]

        analysis = _classify_phase_and_metrics(
            normalized_movs,
            raw_text,
            str(base_case.get("data_distribuicao") or ""),
        )
        fase = analysis["fase_processual"]
        metricas = analysis["metricas"]

        ultima_desc = (
            normalized_movs[-1]["descricao"]
            if normalized_movs
            else (raw_text[:180] if raw_text else "Sem movimentações registradas.")
        )
        resumo_deterministico = (
            f"Processo {cnj} ({base_case['classe']} — {base_case['assunto_principal']}) em "
            f"tramitação perante {base_case['vara']}. Fase atual classificada como '{fase}' "
            f"com {metricas['total_movimentacoes']} movimentação(ões) analisada(s) e prioridade "
            f"de triagem '{metricas['prioridade_triagem']}' (score {metricas['score_prioridade']}/100). "
            f"Último evento relevante: {ultima_desc}"
        )

        canonical_context = "\n".join(
            [
                f"Processo: {cnj}",
                f"Classe: {base_case['classe']}",
                f"Assunto: {base_case['assunto_principal']}",
                f"Fase detectada: {fase}",
                *[
                    f"[{m.get('sequencia')}] {m.get('data')} - {m.get('tipo')}: {m.get('descricao')}"
                    for m in normalized_movs
                ],
                f"Notas adicionais: {raw_text}" if raw_text else "",
            ]
        ).strip()
        context_digest = hashlib.sha256(canonical_context.encode("utf-8")).hexdigest()

        return {
            "gerado_em": _utc_iso(),
            "status": "ready_for_llm",
            "numero_processo": cnj,
            "tribunal": base_case["tribunal"],
            "classe": base_case["classe"],
            "assunto_principal": base_case["assunto_principal"],
            "objetivo_triagem": objetivo,
            "fase_processual": fase,
            "metricas": metricas,
            "marcos_extraidos": normalized_movs[-4:],
            "resumo_deterministico": resumo_deterministico,
            "llm_placeholder": {
                "status": "ready_for_llm",
                "provider_configured": False,
                "n8n_webhook_ready": True,
                "workflow_id_sugerido": "projudi-case-summarizer",
                "context_sha256": context_digest,
                "system_prompt": (
                    "Você é um assistente jurídico de triagem processual. Resuma de forma "
                    "objetiva os fatos, fase atual, riscos e próximos passos sem inventar datas "
                    "ou peças ausentes nas movimentações."
                ),
                "mensagem_placeholder": (
                    "Contrato pronto para LLM/n8n: envie 'prompt_context' para seu provedor "
                    "OpenAI-compatible ou webhook n8n para gerar o parecer narrativo final."
                ),
                "prompt_context": canonical_context,
            },
        }
