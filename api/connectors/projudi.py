"""Real PROJUDI TJPR public case scraper, HTML parser, LGPD masking, and AI/n8n triage.

Operates directly against ``https://consulta.tjpr.jus.br/projudi_consulta/`` with zero
fictitious or mocked process records:
1. Resolves ``frameset#frameSetTeste`` -> ``frame#mainFrame`` and session cookies.
2. Parses ``form#buscaProcessoForm``, hidden Struts inputs, and Google reCAPTCHA metadata
   (``data-sitekey`` and callback ``executaRecaptchaPBC_actre_consulta_publica``).
3. Enforces legal/technical boundaries: when reCAPTCHA is active and no valid
   ``captcha_token`` (``g-recaptcha-response``) or ``session_cookie`` is supplied, raises
   ``ConnectorCaptchaRequiredError`` (HTTP 422, ``code="CAPTCHA_REQUIRED"``) with the
   portal's public ``site_key`` and usage instructions — never returning fake processes.
4. Parses ``table.resultTable`` (``tbody > tr.even`` / ``tr.odd``), ``#navigator`` record
   totals, parties grouped by procedural pole, distribution dates, and procedural class /
   principal subject, applying LGPD masking throughout.
"""

from __future__ import annotations

from datetime import date, datetime, timezone
import hashlib
from html.parser import HTMLParser
import os
import re
from typing import Any
from urllib.parse import urlencode, urljoin

from api.connectors.cache import ConnectorTTLCache
from api.connectors.captcha import (
    CaptchaChallengeStore,
    ResolvedCaptchaInput,
    _normalize_portal_image_url,
    detect_captcha_in_html,
)
from api.connectors.errors import (
    ConnectorCaptchaRequiredError,
    ConnectorNotFoundError,
    ConnectorValidationError,
    UpstreamConnectorError,
)
from api.connectors.http_client import (
    HttpTransport,
    UrllibHttpTransport,
    merge_cookie_header,
)
from api.connectors.validators import (
    clean_digits,
    mask_cnpj,
    mask_cpf,
    mask_sensitive_text,
    normalize_search_text,
    validate_cnj_process_number,
    validate_cpf_or_cnpj,
)

PROJUDI_TJPR_ROOT_URL = "https://consulta.tjpr.jus.br/projudi_consulta/"
PROJUDI_TJPR_FORM_URL = (
    "https://consulta.tjpr.jus.br/projudi_consulta/processo/"
    "consultaPublica.do?actionType=iniciar"
)
PROJUDI_TJPR_SEARCH_URL = (
    "https://consulta.tjpr.jus.br/projudi_consulta/processo/"
    "consultaPublica.do?actionType=pesquisar"
)
DEFAULT_RECAPTCHA_CALLBACK = "executaRecaptchaPBC_actre_consulta_publica"

SUPPORTED_TRIBUNALS: dict[str, dict[str, str]] = {
    "TJPR": {
        "justica": "8",
        "codigo_tr": "16",
        "nome": "Tribunal de Justiça do Estado do Paraná",
        "root_url": PROJUDI_TJPR_ROOT_URL,
    },
}

ACTIVE_POLE_ROLES: frozenset[str] = frozenset(
    {
        "autor",
        "autora",
        "exequente",
        "reclamante",
        "requerente",
        "impetrante",
        "apelante",
        "agravante",
        "embargante",
        "deprecante",
        "promovente",
        "suscitante",
        "inventariante",
        "noticiante",
        "querelante",
    }
)
PASSIVE_POLE_ROLES: frozenset[str] = frozenset(
    {
        "reu",
        "re",
        "executado",
        "executada",
        "reclamado",
        "reclamada",
        "requerido",
        "requerida",
        "impetrado",
        "impetrada",
        "apelado",
        "apelada",
        "agravado",
        "agravada",
        "embargado",
        "embargada",
        "deprecado",
        "deprecada",
        "promovido",
        "promovida",
        "suscitado",
        "noticiado",
        "acusado",
        "indiciado",
        "querelado",
    }
)

_KNOWN_ROLE_LABELS = (
    "Terceiro Interessado",
    "Ministério Público",
    "Exequente",
    "Executado",
    "Executada",
    "Reclamante",
    "Reclamado",
    "Reclamada",
    "Requerente",
    "Requerido",
    "Requerida",
    "Impetrante",
    "Impetrado",
    "Apelante",
    "Apelado",
    "Agravante",
    "Agravado",
    "Embargante",
    "Embargado",
    "Deprecante",
    "Deprecado",
    "Inventariante",
    "Promovente",
    "Promovido",
    "Suscitante",
    "Suscitado",
    "Noticiante",
    "Noticiado",
    "Terceiro",
    "Espólio",
    "Vítima",
    "Autora",
    "Autor",
    "Réu",
    "Ré",
)

_PARTY_ROLE_SPLIT_RE = re.compile(
    r"(?i)\b("
    + "|".join(re.escape(label) for label in _KNOWN_ROLE_LABELS)
    + r")\s*:\s*"
)

_DATE_ISO_RE = re.compile(r"\b(\d{4})-(\d{2})-(\d{2})\b")
_DATE_BR_RE = re.compile(r"\b(\d{2})/(\d{2})/(\d{4})\b")
_CNJ_INLINE_RE = re.compile(r"\b\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}\b")
_NAVIGATOR_COUNT_RE = re.compile(
    r"(\d[\d.]*)\s+registro(?:\(s\)|s)?\s+encontrado(?:\(s\)|s)?",
    re.IGNORECASE,
)
_NO_RECORDS_RE = re.compile(
    r"nenhum\s+(?:registro|processo)\s+encontrado|"
    r"nao\s+foram\s+encontrados\s+(?:registros|processos)",
    re.IGNORECASE,
)
_SITEKEY_JS_RE = re.compile(
    r"(?:data-sitekey|['\"]?sitekey['\"]?)\s*[=:]\s*['\"]([0-9A-Za-z_-]{20,80})['\"]",
    re.IGNORECASE,
)
_RECAPTCHA_CB_RE = re.compile(
    r"\b(executaRecaptcha[0-9A-Za-z_]*)\b"
)
_CAPTCHA_ERROR_RE = re.compile(
    r"recaptcha\s+incorretamente|"
    r"valida[cç][aã]o\s+do\s+captcha\s+falhou|"
    r"captcha\s+inv[aá]lido|"
    r"c[oó]digo\s+de\s+seguran[cç]a\s+inv[aá]lido|"
    r"confirme\s+que\s+n[aã]o\s+[eé]\s+um\s+rob[oô]|"
    r"selecione\s+o\s+recaptcha",
    re.IGNORECASE,
)
_TRAILING_SUBJECT_PARENS_RE = re.compile(r"^(.*?)\s*\(([^()]+)\)\s*$", re.DOTALL)


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


def _normalize_date_str(text: str) -> str:
    parsed = _parse_any_date(text)
    return parsed.isoformat() if parsed else text.strip()


def _merge_cookie_header(jar: dict[str, str], raw_cookie: str | None) -> str:
    merged = dict(jar)
    if raw_cookie:
        cleaned = str(raw_cookie).strip()
        if cleaned:
            if "=" not in cleaned:
                merged["JSESSIONID"] = cleaned
            else:
                for part in cleaned.split(";"):
                    token = part.strip()
                    if "=" in token:
                        k, v = token.split("=", 1)
                        if k.strip():
                            merged[k.strip()] = v.strip()
    return "; ".join(f"{k}={v}" for k, v in merged.items())


def _classify_pole(role_label: str) -> str:
    norm_role = normalize_search_text(role_label)
    if norm_role in ACTIVE_POLE_ROLES:
        return "ATIVO"
    if norm_role in PASSIVE_POLE_ROLES:
        return "PASSIVO"
    return "OUTROS"


def parse_projudi_parties_cell(
    raw_cell: str,
) -> tuple[dict[str, list[str]], list[dict[str, Any]]]:
    """Group a PROJUDI ``Partes`` cell into ``partes_por_polo`` and structured ``partes``."""
    masked_cell = mask_sensitive_text(raw_cell).strip()
    if not masked_cell:
        return {}, []

    grouped: dict[str, list[str]] = {}
    structured: list[dict[str, Any]] = []

    matches = list(_PARTY_ROLE_SPLIT_RE.finditer(masked_cell))
    if matches:
        for idx, match in enumerate(matches):
            raw_role = match.group(1).strip()
            canonical_role = next(
                (
                    lbl
                    for lbl in _KNOWN_ROLE_LABELS
                    if normalize_search_text(lbl) == normalize_search_text(raw_role)
                ),
                raw_role.title(),
            )
            start = match.end()
            end = matches[idx + 1].start() if idx + 1 < len(matches) else len(masked_cell)
            segment = masked_cell[start:end].strip(" \n\r\t-;/|")
            names = [
                re.sub(r"\s+", " ", line).strip(" -;,")
                for line in re.split(r"[\n\r]+|\s{2,}\/\s{2,}", segment)
                if line.strip(" -;,")
            ]
            if not names and segment:
                names = [re.sub(r"\s+", " ", segment).strip()]

            for name in names:
                grouped.setdefault(canonical_role, [])
                if name not in grouped[canonical_role]:
                    grouped[canonical_role].append(name)
                    structured.append(
                        {
                            "polo": _classify_pole(canonical_role),
                            "tipo_participacao": canonical_role,
                            "nome": name,
                        }
                    )
        return grouped, structured

    lines = [
        re.sub(r"\s+", " ", ln).strip()
        for ln in masked_cell.splitlines()
        if ln.strip()
    ]
    for ln in lines:
        if ":" in ln:
            left, right = ln.split(":", 1)
            role = left.strip() or "Parte"
            name = right.strip()
        else:
            role = "Parte"
            name = ln
        if not name:
            continue
        grouped.setdefault(role, []).append(name)
        structured.append(
            {
                "polo": _classify_pole(role),
                "tipo_participacao": role,
                "nome": name,
            }
        )
    return grouped, structured


def split_classe_and_assunto(raw_cell: str) -> tuple[str, str]:
    """Split ``Classe Processual (Assunto Principal)`` cell into ``(classe, assunto)``."""
    cleaned = mask_sensitive_text(raw_cell).strip()
    if not cleaned:
        return "", ""

    lines = [re.sub(r"\s+", " ", ln).strip() for ln in cleaned.splitlines() if ln.strip()]
    if len(lines) >= 2:
        classe_line = lines[0]
        rest = " / ".join(lines[1:]).strip()
        if rest.startswith("(") and rest.endswith(")"):
            rest = rest[1:-1].strip()
        return classe_line, rest

    single = lines[0]
    paren_match = _TRAILING_SUBJECT_PARENS_RE.match(single)
    if paren_match:
        return paren_match.group(1).strip(), paren_match.group(2).strip()
    return single, ""


class ProjudiBootstrapHtmlParser(HTMLParser):
    """Extracts ``frameset#frameSetTeste``, ``frame#mainFrame``, ``form#buscaProcessoForm``
    hidden inputs, and Google reCAPTCHA parameters from TJPR PROJUDI pages.
    """

    def __init__(self) -> None:
        super().__init__()
        self.frameset_id: str | None = None
        self.main_frame_src: str | None = None
        self.any_frame_src: str | None = None
        self.form_found = False
        self.form_action: str | None = None
        self.form_method: str = "POST"
        self.form_fields: dict[str, str] = {}
        self._in_target_form = False
        self._in_script = False
        self._script_chunks: list[str] = []
        self.site_key: str | None = None
        self.recaptcha_callback: str | None = None
        self.captcha_image_src: str | None = None
        self.requires_captcha = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {k.lower(): (v or "") for k, v in attrs}
        tag_l = tag.lower()
        joined_vals = " ".join(attr.values()).lower()

        if (
            "g-recaptcha" in joined_vals
            or "recaptcha" in joined_vals
            or "captcha" in joined_vals
            or "stickyimg" in joined_vals
            or "codseguranca" in joined_vals
            or "codigoseguranca" in joined_vals
        ):
            self.requires_captcha = True
        if attr.get("data-sitekey"):
            self.site_key = attr["data-sitekey"].strip()
            self.requires_captcha = True
        if attr.get("data-callback"):
            self.recaptcha_callback = attr["data-callback"].strip()

        if tag_l == "frameset" and attr.get("id"):
            self.frameset_id = attr["id"]
        elif tag_l in {"frame", "iframe"}:
            src = attr.get("src", "").strip()
            if src:
                if self.any_frame_src is None:
                    self.any_frame_src = src
                if attr.get("id") == "mainFrame" or attr.get("name") == "mainFrame":
                    self.main_frame_src = src
        elif tag_l == "form":
            form_id = attr.get("id", "")
            form_name = attr.get("name", "")
            action = attr.get("action", "")
            if (
                form_id == "buscaProcessoForm"
                or form_name == "buscaProcessoForm"
                or "consultapublica" in action.lower()
                or not self.form_found
            ):
                self.form_found = True
                self._in_target_form = True
                if action:
                    self.form_action = action.strip()
                if attr.get("method"):
                    self.form_method = attr["method"].strip().upper()
        elif tag_l == "img":
            src = (
                attr.get("src")
                or attr.get("data-captcha-src")
                or attr.get("data-src")
                or ""
            ).strip()
            img_hint = " ".join(
                [
                    attr.get("id", ""),
                    attr.get("class", ""),
                    attr.get("alt", ""),
                    attr.get("title", ""),
                    src[:160],
                ]
            ).lower()
            if src and any(
                token in img_hint
                for token in (
                    "captcha",
                    "kaptcha",
                    "jcaptcha",
                    "stickyimg",
                    "imagemseguranca",
                    "codseguranca",
                    "codigoseguranca",
                    "desafio",
                    "actiontype=captcha",
                    "actiontype=imagem",
                )
            ):
                self.captcha_image_src = src
                self.requires_captcha = True
        elif tag_l == "input" and self._in_target_form:
            name = attr.get("name", "").strip()
            input_type = attr.get("type", "text").strip().lower()
            if input_type == "image":
                src = (attr.get("src") or attr.get("data-src") or "").strip()
                if src and ("captcha" in f"{name} {src}".lower()):
                    self.captcha_image_src = src
                    self.requires_captcha = True
                return
            if not name:
                return
            if input_type in {"submit", "button", "reset", "file"}:
                return
            if input_type in {"radio", "checkbox"} and "checked" not in attr:
                return
            if name == "g-recaptcha-response":
                self.requires_captcha = True
                return
            self.form_fields.setdefault(name, attr.get("value", ""))
        elif tag_l == "textarea" and self._in_target_form:
            if attr.get("name", "").strip() == "g-recaptcha-response":
                self.requires_captcha = True
        elif tag_l == "script":
            self._in_script = True
            src = attr.get("src", "").lower()
            if "recaptcha" in src or "captcha" in src:
                self.requires_captcha = True

    def handle_data(self, data: str) -> None:
        if self._in_script:
            self._script_chunks.append(data)
        lowered = data.lower()
        if "digite os caracteres da imagem" in lowered or "g-recaptcha" in lowered:
            self.requires_captcha = True

    def handle_endtag(self, tag: str) -> None:
        tag_l = tag.lower()
        if tag_l == "form" and self._in_target_form:
            self._in_target_form = False
        elif tag_l == "script" and self._in_script:
            self._in_script = False

    def finalize(self, raw_html: str) -> None:
        script_blob = "\n".join(self._script_chunks) + "\n" + raw_html
        if not self.site_key:
            sk_match = _SITEKEY_JS_RE.search(script_blob)
            if sk_match:
                self.site_key = sk_match.group(1).strip()
                self.requires_captcha = True
        if not self.recaptcha_callback:
            cb_match = _RECAPTCHA_CB_RE.search(script_blob)
            if cb_match:
                self.recaptcha_callback = cb_match.group(1).strip()
                self.requires_captcha = True


class ProjudiPublicHtmlParser(HTMLParser):
    """Stdlib HTML parser for PROJUDI TJPR ``table.resultTable`` and ``#navigator``."""

    def __init__(self) -> None:
        super().__init__()
        self._in_result_table = False
        self._table_depth = 0
        self._result_table_depth = 0
        self._in_navigator = False
        self._navigator_depth = 0
        self._navigator_buf: list[str] = []
        self._in_cell = False
        self._is_header_cell = False
        self._cell_buf: list[str] = []
        self._cell_links: list[str] = []
        self._current_row: list[str] = []
        self._current_row_links: list[list[str]] = []
        self._current_row_is_header = False
        self._current_row_class = ""

        self.headers: list[str] = []
        self.rows: list[list[str]] = []
        self.row_links: list[list[list[str]]] = []
        self.row_classes: list[str] = []
        self._fallback_headers: list[str] = []
        self._fallback_rows: list[list[str]] = []
        self._fallback_links: list[list[list[str]]] = []
        self.navigator_text: str = ""
        self.page_text_chunks: list[str] = []
        self.contains_captcha_challenge = False
        self.site_key: str | None = None
        self.has_search_form = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_dict = {k.lower(): (v or "") for k, v in attrs}
        tag_l = tag.lower()
        joined_attrs = " ".join(attr_dict.values()).lower()

        if (
            "g-recaptcha" in joined_attrs
            or "hcaptcha" in joined_attrs
            or "recaptcha" in joined_attrs
            or "captcha" in joined_attrs
        ):
            self.contains_captcha_challenge = True
        if attr_dict.get("data-sitekey"):
            self.site_key = attr_dict["data-sitekey"].strip()

        if tag_l == "form" and (
            attr_dict.get("id") == "buscaProcessoForm"
            or attr_dict.get("name") == "buscaProcessoForm"
        ):
            self.has_search_form = True

        if tag_l in {"div", "span", "td"}:
            elem_id = attr_dict.get("id", "").lower()
            elem_cls = attr_dict.get("class", "").lower()
            if elem_id == "navigator" or "navigator" in elem_cls.split():
                self._in_navigator = True
                self._navigator_depth = 1
            elif self._in_navigator and tag_l in {"div", "span"}:
                self._navigator_depth += 1

        if tag_l == "table":
            self._table_depth += 1
            cls_tokens = attr_dict.get("class", "").split()
            if "resultTable" in cls_tokens or "resulttable" in attr_dict.get("class", "").lower():
                self._in_result_table = True
                self._result_table_depth = self._table_depth
        elif tag_l == "tr" and self._table_depth > 0:
            self._current_row = []
            self._current_row_links = []
            self._current_row_is_header = False
            self._current_row_class = attr_dict.get("class", "")
        elif tag_l in {"td", "th"} and self._table_depth > 0:
            self._in_cell = True
            self._is_header_cell = tag_l == "th"
            if self._is_header_cell:
                self._current_row_is_header = True
            self._cell_buf = []
            self._cell_links = []
        elif self._in_cell and tag_l in {"br", "li", "p", "div", "tr"}:
            self._cell_buf.append("\n")
        elif self._in_cell and tag_l == "a":
            href = attr_dict.get("href", "").strip()
            if href and not href.lower().startswith("javascript:"):
                self._cell_links.append(href)

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.page_text_chunks.append(data)
        if "digite os caracteres da imagem" in data.lower():
            self.contains_captcha_challenge = True
        if self._in_navigator:
            self._navigator_buf.append(data)
        if self._in_cell:
            self._cell_buf.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag_l = tag.lower()
        if self._in_navigator and tag_l in {"div", "span"}:
            self._navigator_depth -= 1
            if self._navigator_depth <= 0:
                self._in_navigator = False
                nav = re.sub(r"\s+", " ", "".join(self._navigator_buf)).strip()
                if nav:
                    self.navigator_text = nav
                self._navigator_buf = []

        if tag_l in {"td", "th"} and self._in_cell:
            self._in_cell = False
            raw = "".join(self._cell_buf)
            lines = [re.sub(r"[ \t\r\f\v]+", " ", ln).strip() for ln in raw.split("\n")]
            cleaned = "\n".join(ln for ln in lines if ln)
            self._current_row.append(cleaned)
            self._current_row_links.append(list(self._cell_links))
        elif tag_l == "tr" and self._current_row:
            if any(cell for cell in self._current_row):
                if self._in_result_table:
                    if self._current_row_is_header and not self.headers:
                        self.headers = [c.replace("\n", " ") for c in self._current_row]
                    elif not self._current_row_is_header:
                        self.rows.append(self._current_row)
                        self.row_links.append(self._current_row_links)
                        self.row_classes.append(self._current_row_class)
                else:
                    if self._current_row_is_header and not self._fallback_headers:
                        self._fallback_headers = [c.replace("\n", " ") for c in self._current_row]
                    elif not self._current_row_is_header:
                        self._fallback_rows.append(self._current_row)
                        self._fallback_links.append(self._current_row_links)
            self._current_row = []
            self._current_row_links = []
        elif tag_l == "table" and self._table_depth > 0:
            if self._in_result_table and self._table_depth == self._result_table_depth:
                self._in_result_table = False
                self._result_table_depth = 0
            self._table_depth -= 1

    def finalize(self, raw_html: str) -> None:
        if not self.rows and self._fallback_rows:
            self.rows = self._fallback_rows
            self.row_links = self._fallback_links
            if not self.headers:
                self.headers = self._fallback_headers
        if not self.site_key:
            sk = _SITEKEY_JS_RE.search(raw_html)
            if sk:
                self.site_key = sk.group(1).strip()


def parse_projudi_search_result(
    html: str,
    tribunal: str = "TJPR",
    *,
    base_url: str = PROJUDI_TJPR_FORM_URL,
) -> dict[str, Any]:
    """Parse real PROJUDI ``table.resultTable`` + ``#navigator`` HTML into structured records."""
    parser = ProjudiPublicHtmlParser()
    parser.feed(html)
    parser.finalize(html)

    full_text = " ".join(parser.page_text_chunks)
    norm_full_text = normalize_search_text(full_text)

    nav_source = parser.navigator_text or full_text
    nav_match = _NAVIGATOR_COUNT_RE.search(nav_source)
    navigator_total: int | None = None
    if nav_match:
        navigator_total = int(clean_digits(nav_match.group(1)) or "0")
    elif _NO_RECORDS_RE.search(norm_full_text):
        navigator_total = 0

    captcha_error_detected = bool(_CAPTCHA_ERROR_RE.search(html))
    if (
        (captcha_error_detected or parser.contains_captcha_challenge)
        and not parser.rows
        and navigator_total != 0
    ):
        raise ConnectorCaptchaRequiredError(
            "O portal público do PROJUDI exigiu ou recusou a verificação reCAPTCHA "
            "(g-recaptcha-response).",
            site_key=parser.site_key,
            portal_url=PROJUDI_TJPR_ROOT_URL,
            form_url=PROJUDI_TJPR_FORM_URL,
            recaptcha_callback=DEFAULT_RECAPTCHA_CALLBACK,
        )

    norm_headers = [normalize_search_text(h) for h in parser.headers]
    uses_tjpr_partes_layout = (
        not norm_headers
        or (len(norm_headers) >= 2 and "parte" in norm_headers[1])
        or (len(norm_headers) >= 4 and "distribuicao" in norm_headers[2])
    )

    cases: list[dict[str, Any]] = []
    for row_idx, row in enumerate(parser.rows):
        if len(row) < 3:
            continue

        cnj_candidate = row[0]
        inline_cnj = _CNJ_INLINE_RE.search(row[0])
        if inline_cnj:
            cnj_candidate = inline_cnj.group(0)
        try:
            cnj = validate_cnj_process_number(cnj_candidate)
        except ConnectorValidationError:
            continue

        links_for_row = parser.row_links[row_idx] if row_idx < len(parser.row_links) else []
        first_links = links_for_row[0] if links_for_row else []
        detail_url = urljoin(base_url, first_links[0]) if first_links else None

        row_norm = normalize_search_text(" ".join(row))
        segredo = "segredo de justica" in row_norm or "sigilo" in row_norm

        if uses_tjpr_partes_layout:
            partes_por_polo, partes_list = parse_projudi_parties_cell(row[1])
            dist_raw = row[2] if len(row) > 2 else ""
            dist_lines = [ln.strip() for ln in dist_raw.splitlines() if ln.strip()]
            data_dist = _normalize_date_str(dist_lines[0] if dist_lines else dist_raw)
            vara_comarca = (
                mask_sensitive_text(" — ".join(dist_lines[1:]))
                if len(dist_lines) > 1
                else ""
            )
            classe_raw = row[3] if len(row) > 3 else ""
            classe_proc, assunto_princ = split_classe_and_assunto(classe_raw)
            situacao = (
                "Arquivado"
                if "arquivado" in row_norm
                else "Em tramitação (Consulta Pública PROJUDI)"
            )
            ultima_mov = mask_sensitive_text(row[4]) if len(row) > 4 else ""
        else:
            # Generic table layout: Processo | Classe | Assunto | Vara | Distribuição | Situação
            partes_por_polo, partes_list = {}, []
            classe_proc = mask_sensitive_text(row[1]).replace("\n", " ").strip()
            assunto_princ = (
                mask_sensitive_text(row[2]).replace("\n", " ").strip()
                if len(row) > 2
                else ""
            )
            vara_comarca = (
                mask_sensitive_text(row[3]).replace("\n", " ").strip()
                if len(row) > 3
                else ""
            )
            data_dist = _normalize_date_str(row[4]) if len(row) > 4 else ""
            situacao = (
                mask_sensitive_text(row[5]).strip()
                if len(row) > 5 and row[5].strip()
                else "Em tramitação"
            )
            ultima_mov = mask_sensitive_text(row[6]).strip() if len(row) > 6 else ""

        cases.append(
            {
                "numero_processo": cnj,
                "tribunal": tribunal,
                "classe_processual": classe_proc,
                "assunto_principal": assunto_princ,
                "classe": classe_proc,
                "assunto": assunto_princ,
                "partes_por_polo": partes_por_polo,
                "partes": partes_list,
                "data_distribuicao": data_dist,
                "vara_comarca": vara_comarca,
                "situacao": situacao,
                "ultima_movimentacao": ultima_mov,
                "segredo_justica": segredo,
                "url_detalhe": detail_url,
            }
        )

    if navigator_total is None:
        navigator_total = len(cases)

    return {
        "total_navigator": navigator_total,
        "navigator_texto": parser.navigator_text or None,
        "processos": cases,
    }


def parse_projudi_search_html(html: str, tribunal: str = "TJPR") -> list[dict[str, Any]]:
    """Backward-compatible helper returning the parsed list of PROJUDI case records."""
    return parse_projudi_search_result(html, tribunal)["processos"]


def parse_projudi_detail_html(
    html: str,
    expected_cnj: str,
    tribunal: str = "TJPR",
) -> dict[str, Any]:
    """Parse a PROJUDI public process detail page (metadata, parties, and movements)."""
    parser = ProjudiPublicHtmlParser()
    parser.feed(html)
    parser.finalize(html)

    if parser.contains_captcha_challenge and not parser.rows:
        raise ConnectorCaptchaRequiredError(
            f"O detalhamento do processo {expected_cnj} no PROJUDI exige verificação reCAPTCHA.",
            site_key=parser.site_key,
            portal_url=PROJUDI_TJPR_ROOT_URL,
            form_url=PROJUDI_TJPR_FORM_URL,
            recaptcha_callback=DEFAULT_RECAPTCHA_CALLBACK,
        )

    kv_meta: dict[str, str] = {}
    movimentacoes: list[dict[str, Any]] = []
    partes_raw_chunks: list[str] = []

    for row in parser.rows:
        if len(row) == 2:
            label_norm = normalize_search_text(row[0])
            val = mask_sensitive_text(row[1]).strip()
            if label_norm and val:
                kv_meta[label_norm] = val
                if any(
                    normalize_search_text(role) == label_norm
                    for role in _KNOWN_ROLE_LABELS
                ):
                    partes_raw_chunks.append(f"{row[0].strip().rstrip(':')}: {val}")
        elif len(row) >= 3:
            maybe_date = _parse_any_date(row[1]) or _parse_any_date(row[0])
            seq_digits = clean_digits(row[0])
            if maybe_date and (seq_digits or _parse_any_date(row[0])):
                seq_num = int(seq_digits) if seq_digits and len(seq_digits) <= 6 else len(movimentacoes) + 1
                desc_text = " — ".join(
                    mask_sensitive_text(cell).replace("\n", " ").strip()
                    for cell in row[2:]
                    if cell.strip()
                )
                tipo_text = (
                    mask_sensitive_text(row[2]).splitlines()[0].strip()
                    if row[2].strip()
                    else "Movimentação"
                )
                movimentacoes.append(
                    {
                        "sequencia": seq_num,
                        "data": maybe_date.isoformat(),
                        "tipo": tipo_text[:120],
                        "descricao": desc_text or tipo_text,
                    }
                )

    partes_por_polo, partes_list = parse_projudi_parties_cell("\n".join(partes_raw_chunks))

    def _pick(*keys: str) -> str:
        for key in keys:
            for meta_k, meta_v in kv_meta.items():
                if key in meta_k and meta_v:
                    return meta_v
        return ""

    classe_proc = _pick("classe processual", "classe")
    assunto_princ = _pick("assunto principal", "assunto")
    comarca = _pick("comarca", "foro")
    vara = _pick("juizo", "vara", "competencia", "orgao julgador")
    situacao = _pick("situacao", "status") or "Em tramitação (Consulta Pública PROJUDI)"
    dist_raw = _pick("distribuicao", "autuacao")
    data_dist = _normalize_date_str(dist_raw) if dist_raw else ""
    valor_raw = _pick("valor da causa", "valor causa")
    valor_causa_brl: float | None = None
    if valor_raw:
        m_val = re.search(r"([\d.]+,\d{2}|\d+\.\d{2})", valor_raw)
        if m_val:
            num_txt = m_val.group(1)
            if "," in num_txt:
                num_txt = num_txt.replace(".", "").replace(",", ".")
            try:
                valor_causa_brl = round(float(num_txt), 2)
            except ValueError:
                valor_causa_brl = None

    movimentacoes.sort(key=lambda item: item["sequencia"])
    full_norm = normalize_search_text(" ".join(parser.page_text_chunks))

    return {
        "numero_processo": expected_cnj,
        "tribunal": tribunal,
        "classe_processual": classe_proc,
        "assunto_principal": assunto_princ,
        "classe": classe_proc,
        "assunto": assunto_princ,
        "comarca": comarca,
        "vara": vara,
        "valor_causa_brl": valor_causa_brl,
        "data_distribuicao": data_dist,
        "situacao": situacao,
        "segredo_justica": "segredo de justica" in full_norm,
        "partes_por_polo": partes_por_polo,
        "partes": partes_list,
        "movimentacoes": movimentacoes,
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
        kw in norm
        for kw in (
            "proferida sentenca",
            "julgado procedente",
            "julgado improcedente",
            "sentenca transitada",
        )
    )
    concluso_sentenca = "conclusos" in norm and "sentenca" in norm
    has_recurso = any(
        kw in norm
        for kw in (
            "apelacao",
            "agravo de instrumento",
            "recurso inominado",
            "embargos de declaracao",
        )
    )
    has_penhora = any(
        kw in norm
        for kw in (
            "sisbajud",
            "penhora",
            "bloqueio",
            "cumprimento de sentenca",
            "cumprimento definitivo",
            "alvara",
        )
    )
    is_arquivado = any(
        kw in norm
        for kw in ("arquivado definitivamente", "baixa definitiva", "extinto o processo")
    )

    if is_arquivado:
        fase = "arquivado_baixado"
    elif has_penhora:
        fase = "cumprimento_sentenca_execucao"
    elif has_recurso:
        fase = "fase_recursal"
    elif has_sentenca or concluso_sentenca:
        fase = "julgamento_sentenca"
    elif any(kw in norm for kw in ("instrucao", "audiencia", "pericia", "contestacao")):
        fase = "instrucao_probatoria"
    else:
        fase = "postulatoria_citacao"

    today = datetime.now(timezone.utc).date()
    dist_date = _parse_any_date(data_distribuicao)
    parsed_mov_dates = [
        dt
        for dt in (_parse_any_date(str(m.get("data") or "")) for m in movimentacoes)
        if dt is not None
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
    """Real TJPR PROJUDI public consultation scraper & deterministic AI/n8n triage service.

    Zero mock/sandbox process generation:
    - Navigates ``https://consulta.tjpr.jus.br/projudi_consulta/`` -> ``frame#mainFrame``
      -> ``form#buscaProcessoForm``.
    - Raises ``ConnectorCaptchaRequiredError`` (HTTP 422, ``code="CAPTCHA_REQUIRED"``) when
      the portal requires ``g-recaptcha-response`` and no valid ``captcha_token`` or
      ``session_cookie`` is supplied.
    """

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        captcha_store: CaptchaChallengeStore | None = None,
        upstream_search_url: str | None = None,
        timeout_seconds: float = 5.0,
        ttl_seconds: float = 300.0,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(default_timeout_seconds=timeout_seconds)
        self._cache = cache or ConnectorTTLCache()
        self._captcha_store = captcha_store or CaptchaChallengeStore(cache=self._cache)
        self._root_url = (
            upstream_search_url
            or os.environ.get("PROJUDI_PUBLIC_SEARCH_URL")
            or PROJUDI_TJPR_ROOT_URL
        ).strip()
        self._configured_site_key = (
            os.environ.get("PROJUDI_RECAPTCHA_SITE_KEY") or ""
        ).strip() or None
        self._timeout = timeout_seconds
        self._ttl = ttl_seconds

    def _validate_tribunal(self, raw_tribunal: str | None) -> str:
        tribunal = str(raw_tribunal or "TJPR").strip().upper()
        if tribunal not in SUPPORTED_TRIBUNALS:
            raise ConnectorValidationError(
                f"Tribunal '{raw_tribunal}' não suportado pelo scraper direto do PROJUDI. "
                f"Tribunais habilitados sem mocks: {', '.join(sorted(SUPPORTED_TRIBUNALS))}.",
                extra={"field": "tribunal", "allowed": sorted(SUPPORTED_TRIBUNALS)},
            )
        return tribunal

    def _bootstrap_session(
        self,
        session_cookie: str | None,
        *,
        operation: str = "consulta_por_cpf",
        consulta_payload: dict[str, Any] | None = None,
        resume_endpoint: str = "/api/v1/projudi/processos/consulta",
        resume_method: str = "POST",
    ) -> dict[str, Any]:
        """Resolve ``frameset#frameSetTeste`` -> ``frame#mainFrame`` -> ``form#buscaProcessoForm``."""
        cookie_jar: dict[str, str] = {}
        init_headers: dict[str, str] = {}
        initial_cookie = merge_cookie_header(cookie_jar, session_cookie)
        if initial_cookie:
            init_headers["Cookie"] = initial_cookie

        try:
            root_resp = self._transport.request(
                self._root_url,
                method="GET",
                headers=init_headers,
                timeout_seconds=self._timeout,
            )
        except UpstreamConnectorError as exc:
            self._captcha_store.inspect_upstream_error_for_captcha(
                exc,
                connector="projudi",
                operation=operation,
                consulta_payload=consulta_payload or {},
                resume_endpoint=resume_endpoint,
                resume_method=resume_method,
                portal_url=self._root_url,
                cookie_jar=cookie_jar,
                raw_session_cookie=session_cookie,
                transport=self._transport,
                timeout_seconds=self._timeout,
            )
            raise UpstreamConnectorError(
                f"Portal público do PROJUDI TJPR indisponível no momento: {exc.detail}",
                status_code=503,
                extra={
                    "code": "PROJUDI_UPSTREAM_UNAVAILABLE",
                    "portal_url": self._root_url,
                },
            ) from exc

        cookie_jar.update(root_resp.cookies())
        root_html = root_resp.text()
        boot = ProjudiBootstrapHtmlParser()
        boot.feed(root_html)
        boot.finalize(root_html)

        form_url = root_resp.url
        form_html = root_html

        frame_target = boot.main_frame_src or boot.any_frame_src
        if frame_target and not boot.form_found:
            resolved_frame_url = urljoin(root_resp.url, frame_target)
            frame_headers: dict[str, str] = {"Referer": root_resp.url}
            merged_cookie = merge_cookie_header(cookie_jar, session_cookie)
            if merged_cookie:
                frame_headers["Cookie"] = merged_cookie

            try:
                frame_resp = self._transport.request(
                    resolved_frame_url,
                    method="GET",
                    headers=frame_headers,
                    timeout_seconds=self._timeout,
                )
            except UpstreamConnectorError as exc:
                self._captcha_store.inspect_upstream_error_for_captcha(
                    exc,
                    connector="projudi",
                    operation=operation,
                    consulta_payload=consulta_payload or {},
                    resume_endpoint=resume_endpoint,
                    resume_method=resume_method,
                    portal_url=self._root_url,
                    cookie_jar=cookie_jar,
                    raw_session_cookie=session_cookie,
                    transport=self._transport,
                    timeout_seconds=self._timeout,
                )
                raise UpstreamConnectorError(
                    f"Falha ao carregar o frame principal de consulta do PROJUDI: {exc.detail}",
                    status_code=503,
                    extra={
                        "code": "PROJUDI_UPSTREAM_UNAVAILABLE",
                        "portal_url": self._root_url,
                        "form_url": resolved_frame_url,
                    },
                ) from exc

            cookie_jar.update(frame_resp.cookies())
            form_url = frame_resp.url
            form_html = frame_resp.text()
            boot = ProjudiBootstrapHtmlParser()
            boot.feed(form_html)
            boot.finalize(form_html)

        detected_cap = detect_captcha_in_html(
            form_html,
            base_url=form_url,
            default_site_key=self._configured_site_key,
            default_callback=DEFAULT_RECAPTCHA_CALLBACK,
        )

        action_url = (
            urljoin(form_url, boot.form_action)
            if boot.form_action
            else (
                detected_cap.action_url
                if detected_cap.detected and detected_cap.action_url
                else (
                    PROJUDI_TJPR_SEARCH_URL
                    if "consulta.tjpr.jus.br" in form_url
                    else form_url
                )
            )
        )
        provider = detected_cap.provider if detected_cap.detected else "recaptcha"
        response_field = (
            detected_cap.response_field if detected_cap.detected else "g-recaptcha-response"
        )
        site_key = (
            boot.site_key
            or detected_cap.site_key
            or (self._configured_site_key if provider != "image" else None)
        )
        callback_name = (
            boot.recaptcha_callback
            or detected_cap.callback
            or (DEFAULT_RECAPTCHA_CALLBACK if provider == "recaptcha" else None)
        )
        merged_fields = dict(detected_cap.form_fields)
        merged_fields.update(boot.form_fields)
        merged_fields.pop(response_field, None)
        resolved_image_url = detected_cap.image_url or (
            _normalize_portal_image_url(urljoin(form_url, boot.captcha_image_src), form_url)
            if boot.captcha_image_src and not boot.captcha_image_src.lower().startswith("data:")
            else None
        )

        return {
            "portal_url": self._root_url,
            "form_url": form_url,
            "action_url": action_url,
            "form_fields": merged_fields,
            "cookie_jar": cookie_jar,
            "requires_captcha": bool(boot.requires_captcha or detected_cap.detected),
            "provider": provider,
            "response_field": response_field,
            "site_key": site_key,
            "recaptcha_callback": callback_name,
            "image_url": resolved_image_url,
            "image_base64": detected_cap.image_base64,
            "image_mime_type": detected_cap.image_mime_type,
            "image_data_uri": detected_cap.image_data_uri,
            "fallback_url": detected_cap.fallback_url,
            "prompt_label": detected_cap.prompt_label,
        }

    def _build_captcha_instructions(
        self,
        *,
        form_url: str,
        site_key: str | None,
        callback_name: str | None,
        provider: str = "recaptcha",
        resume_endpoint: str = "/api/v1/projudi/processos/consulta",
    ) -> list[str]:
        _ = form_url, site_key, callback_name
        if provider == "image":
            return [
                "1. Visualize a imagem de segurança do PROJUDI exibida diretamente neste popup (`image_data_url` / `captcha_image`).",
                "2. Digite os caracteres exibidos na imagem no campo `captcha_token` (ou `captcha_solution`) sem sair do portfólio.",
                (
                    f"3. Confirme o envio para '{resume_endpoint}' (ou 'POST /api/v1/captcha/resolve') "
                    "com `challenge_id` e `session_cookie` (`JSESSIONID=...`) para concluir a consulta real."
                ),
            ]
        return [
            "1. Visualize o desafio de segurança do PROJUDI TJPR apresentado diretamente neste popup.",
            "2. Informe a resposta/token de segurança no campo `captcha_token` (ou `captcha_solution`) sem sair do portfólio.",
            (
                f"3. Confirme o envio para '{resume_endpoint}' (ou 'POST /api/v1/captcha/resolve') "
                "com `challenge_id` (preservando `session_cookie` `JSESSIONID=...`) para concluir a consulta real."
            ),
        ]

    def _raise_captcha_challenge(
        self,
        detail: str,
        *,
        session: dict[str, Any],
        operation: str,
        consulta_payload: dict[str, Any],
        resume_endpoint: str,
        resume_method: str,
        raw_session_cookie: str | None = None,
        rejected_previous_attempt: bool = False,
        override_html: str | None = None,
        override_url: str | None = None,
    ) -> None:
        """Issue a session-bound HTTP 422 ``CAPTCHA_REQUIRED`` challenge for PROJUDI TJPR.

        Sempre disparado a partir de uma **resposta real da pesquisa** que indica um
        desafio/erro de CAPTCHA (ou da rejeição de um token anterior), nunca como
        pré-disparo baseado apenas na presença do widget ``g-recaptcha`` no HTML do
        formulário inicial — a consulta pública do TJPR é submetida primeiro e só
        exige verificação humana quando o portal realmente recusa a submissão.

        Image extraction & Google reCAPTCHA v2 limitation:
        - Whenever PROJUDI exposes a session-bound bitmap (inline ``data:image/...``,
          Struts/Servlet ``<img>`` such as ``captcha.svl`` / ``gerarCaptcha``, or a
          Google ``/recaptcha/api/fallback?k=<site_key>`` HTML payload), ``issue_challenge``
          downloads the real raster bytes using the active ``JSESSIONID`` cookie jar and
          embeds ``image`` / ``captcha_image`` / ``image_data_url`` / ``image_data_uri`` /
          ``image_base64`` + ``/api/v1/captcha/challenges/{challenge_id}/image``.
        - When ``consulta.tjpr.jus.br`` serves a pure Google reCAPTCHA v2 JS widget
          (``div.g-recaptcha[data-sitekey]``) and Google's ``/recaptcha/api/fallback``
          endpoint declines to serve a static ``<noscript>`` bitmap, Google's active v2
          protocol (``/recaptcha/api2/anchor`` -> ``/recaptcha/api2/reload``) requires
          browser-side BotGuard JS VM attestation bound to ``https://consulta.tjpr.jus.br``.
          In that case ``image`` is ``None``, ``image_available`` is ``False``, and
          ``image_unavailable_reason`` is ``"RECAPTCHA_WIDGET_REQUIRES_BROWSER_ATTESTATION"``
          — never emitting synthetic/mocked CAPTCHA bitmaps or mocked process data.
        """
        provider = str(session.get("provider") or "recaptcha")
        site_key = session.get("site_key")
        callback_name = session.get("recaptcha_callback")
        response_field = str(session.get("response_field") or "g-recaptcha-response")
        image_url = session.get("image_url")
        image_base64 = session.get("image_base64")
        image_mime_type = session.get("image_mime_type")
        image_data_uri = session.get("image_data_uri")
        fallback_url = session.get("fallback_url")
        prompt_label = session.get("prompt_label")
        form_url = str(session.get("form_url") or PROJUDI_TJPR_FORM_URL)
        action_url = str(session.get("action_url") or PROJUDI_TJPR_SEARCH_URL)
        form_fields = dict(session.get("form_fields") or {})

        if override_html:
            det = detect_captcha_in_html(
                override_html,
                base_url=override_url or form_url,
                default_site_key=site_key or self._configured_site_key,
                default_callback=callback_name or DEFAULT_RECAPTCHA_CALLBACK,
            )
            if det.detected:
                provider = det.provider
                site_key = det.site_key if provider != "image" else None
                callback_name = det.callback if provider != "image" else None
                response_field = det.response_field or response_field
                if det.action_url:
                    action_url = det.action_url
                if det.form_fields:
                    form_fields.update(det.form_fields)
                    form_fields.pop(response_field, None)
                if det.image_data_uri:
                    image_url = det.image_url
                    image_base64 = det.image_base64
                    image_mime_type = det.image_mime_type
                    image_data_uri = det.image_data_uri
                elif det.image_url:
                    image_url = det.image_url
                    image_base64 = None
                    image_mime_type = None
                    image_data_uri = None
                if det.fallback_url:
                    fallback_url = det.fallback_url
                prompt_label = det.prompt_label or prompt_label

        challenge = self._captcha_store.issue_challenge(
            connector="projudi",
            operation=operation,
            provider=provider,
            site_key=site_key,
            challenge_url=form_url,
            portal_url=str(session.get("portal_url") or self._root_url),
            action_url=action_url,
            http_method="POST",
            callback=callback_name,
            response_field=response_field,
            cookie_jar=session.get("cookie_jar"),
            raw_session_cookie=raw_session_cookie,
            form_fields=form_fields,
            consulta_payload=consulta_payload,
            resume_endpoint=resume_endpoint,
            resume_method=resume_method,
            image_url=image_url,
            image_base64=image_base64,
            image_mime_type=image_mime_type,
            image_data_uri=image_data_uri,
            fallback_url=fallback_url,
            prompt_label=prompt_label,
            rejected_previous_attempt=rejected_previous_attempt,
            instructions=self._build_captcha_instructions(
                form_url=form_url,
                site_key=site_key,
                callback_name=callback_name,
                provider=provider,
                resume_endpoint=resume_endpoint,
            ),
            transport=self._transport,
            timeout_seconds=self._timeout,
        )
        raise challenge.to_exception(
            detail,
            extra={"dados_sinteticos_ou_mock": False},
        )

    def _execute_search(
        self,
        *,
        search_params: dict[str, str],
        tribunal: str,
        resolved_captcha: ResolvedCaptchaInput,
        operation: str,
        consulta_payload: dict[str, Any],
        resume_endpoint: str,
        resume_method: str,
    ) -> dict[str, Any]:
        token_clean = resolved_captcha.solution or ""
        cookie_clean = resolved_captcha.session_cookie or ""
        stored = resolved_captcha.challenge

        if stored is not None and stored.connector == "projudi":
            merged_jar = dict(stored.cookie_jar)
            merged_jar.update(resolved_captcha.cookie_jar)
            session: dict[str, Any] = {
                "portal_url": stored.portal_url,
                "form_url": stored.challenge_url,
                "action_url": stored.action_url,
                "form_fields": dict(stored.form_fields),
                "cookie_jar": merged_jar,
                "requires_captcha": True,
                "provider": stored.provider,
                "response_field": stored.response_field,
                "site_key": stored.site_key,
                "recaptcha_callback": stored.callback
                or (DEFAULT_RECAPTCHA_CALLBACK if stored.provider == "recaptcha" else None),
                "image_url": stored.challenge_data.get("image_url"),
                "image_base64": stored.challenge_data.get("image_base64"),
                "image_mime_type": stored.challenge_data.get("image_mime_type"),
                "image_data_uri": stored.challenge_data.get("image_data_uri"),
                "prompt_label": stored.challenge_data.get("prompt_label"),
            }
        else:
            session = self._bootstrap_session(
                cookie_clean or None,
                operation=operation,
                consulta_payload=consulta_payload,
                resume_endpoint=resume_endpoint,
                resume_method=resume_method,
            )

        form_url = session["form_url"]

        # A consulta real é sempre submetida primeiro. O widget reCAPTCHA presente
        # no HTML do formulário inicial (``div.g-recaptcha[data-sitekey]``) não é, por
        # si só, um sinal de que a consulta exige CAPTCHA: o portal público do TJPR
        # permite a consulta direta sem solucionar o widget. O desafio só é exigido
        # quando a resposta da pesquisa indica um erro/desafio real de CAPTCHA
        # (detectado por ``parse_projudi_search_result`` ou pelo probe do formulário
        # vazio abaixo), garantindo que não haja falso desafio nem modal travado.

        if token_clean and stored is not None and stored.connector == "projudi":
            token_clean = self._captcha_store.resolve_recaptcha_fallback_if_needed(
                stored,
                token_clean,
                transport=self._transport,
                timeout_seconds=self._timeout,
                raw_session_cookie=cookie_clean or None,
                instructions=self._build_captcha_instructions(
                    form_url=form_url,
                    site_key=session.get("site_key"),
                    callback_name=session.get("recaptcha_callback"),
                    provider=str(session.get("provider") or "recaptcha"),
                    resume_endpoint=resume_endpoint,
                ),
                extra={"dados_sinteticos_ou_mock": False},
            )

        form_payload: dict[str, str] = dict(session["form_fields"])
        form_payload.setdefault("actionType", "pesquisar")
        form_payload.setdefault("tipoConsulta", "1")
        form_payload.setdefault("tipoNumero", "1")
        form_payload.update(search_params)
        if token_clean:
            resp_field = str(session.get("response_field") or "g-recaptcha-response")
            form_payload[resp_field] = token_clean

        post_headers: dict[str, str] = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": form_url,
        }
        cookie_header = merge_cookie_header(session["cookie_jar"], cookie_clean or None)
        if cookie_header:
            post_headers["Cookie"] = cookie_header

        encoded_body = urlencode(form_payload, encoding="iso-8859-1", errors="replace").encode(
            "ascii"
        )
        try:
            search_resp = self._transport.request(
                session["action_url"],
                method="POST",
                headers=post_headers,
                data=encoded_body,
                timeout_seconds=self._timeout,
            )
        except UpstreamConnectorError as exc:
            self._captcha_store.inspect_upstream_error_for_captcha(
                exc,
                connector="projudi",
                operation=operation,
                consulta_payload=consulta_payload,
                resume_endpoint=resume_endpoint,
                resume_method=resume_method,
                portal_url=session["portal_url"],
                cookie_jar=session["cookie_jar"],
                raw_session_cookie=cookie_clean or None,
                transport=self._transport,
                timeout_seconds=self._timeout,
            )
            raise UpstreamConnectorError(
                f"Falha ao submeter pesquisa no PROJUDI TJPR: {exc.detail}",
                status_code=503,
                extra={
                    "code": "PROJUDI_UPSTREAM_UNAVAILABLE",
                    "portal_url": session["portal_url"],
                    "action_url": session["action_url"],
                },
            ) from exc

        session["cookie_jar"].update(search_resp.cookies())
        html = search_resp.text()
        try:
            parsed = parse_projudi_search_result(html, tribunal, base_url=search_resp.url)
        except ConnectorCaptchaRequiredError as exc:
            if stored is not None:
                self._captcha_store.consume_challenge(stored.challenge_id)
            if exc.extra.get("site_key"):
                session["site_key"] = exc.extra["site_key"]
            self._raise_captcha_challenge(
                exc.detail,
                session=session,
                operation=operation,
                consulta_payload=consulta_payload,
                resume_endpoint=resume_endpoint,
                resume_method=resume_method,
                raw_session_cookie=cookie_clean or None,
                rejected_previous_attempt=True,
                override_html=html,
                override_url=search_resp.url,
            )

        # Guard against Struts silently re-rendering the empty search form without resultTable
        probe = ProjudiPublicHtmlParser()
        probe.feed(html)
        if (
            not parsed["processos"]
            and parsed["navigator_texto"] is None
            and probe.has_search_form
            and not _NO_RECORDS_RE.search(normalize_search_text(html))
        ):
            if stored is not None:
                self._captcha_store.consume_challenge(stored.challenge_id)
            resp_field_hint = str(session.get("response_field") or "g-recaptcha-response")
            self._raise_captcha_challenge(
                "O PROJUDI TJPR retornou novamente o formulário de busca sem resultados "
                f"(solução '{resp_field_hint}' expirada/inválida ou JSESSIONID ausente).",
                session=session,
                operation=operation,
                consulta_payload=consulta_payload,
                resume_endpoint=resume_endpoint,
                resume_method=resume_method,
                raw_session_cookie=cookie_clean or None,
                rejected_previous_attempt=True,
                override_html=html,
                override_url=search_resp.url,
            )

        if stored is not None:
            self._captcha_store.consume_challenge(stored.challenge_id)

        return {
            **parsed,
            "raw_html": html,
            "response_url": search_resp.url,
            "cookie_jar": session["cookie_jar"],
        }

    def consulta_por_cpf(
        self,
        cpf: str | None = None,
        *,
        tribunal: str | None = None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        challenge_id: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
        resume_endpoint: str = "/api/v1/projudi/processos/consulta",
        resume_method: str = "POST",
    ) -> dict[str, Any]:
        """Validate CPF/CNPJ and scrape real PROJUDI ``table.resultTable`` records."""
        explicit_lookup = dict(consulta_payload or {})
        if cpf and "*" not in str(cpf):
            explicit_lookup["cpf"] = cpf
        if tribunal:
            explicit_lookup["tribunal"] = tribunal

        resolved = self._captcha_store.resolve_inputs(
            challenge_id=challenge_id,
            captcha_token=captcha_token,
            captcha_solution=captcha_solution,
            session_cookie=session_cookie,
            consulta_payload=explicit_lookup or None,
        )

        effective_cpf = (
            cpf
            if (cpf and "*" not in str(cpf))
            else resolved.consulta_payload.get("cpf") or cpf
        )
        effective_tribunal = (
            tribunal or resolved.consulta_payload.get("tribunal") or "TJPR"
        )

        doc_digits, doc_kind = validate_cpf_or_cnpj(effective_cpf)
        clean_tribunal = self._validate_tribunal(effective_tribunal)
        doc_masked = mask_cpf(doc_digits) if doc_kind == "CPF" else mask_cnpj(doc_digits)

        doc_hash = hashlib.sha256(f"{doc_digits}:{clean_tribunal}".encode()).hexdigest()[:16]
        cache_key = f"projudi:real:doc:{doc_hash}"
        if not resolved.solution and not resolved.session_cookie and not resolved.challenge_id:
            hit, cached = self._cache.get(cache_key)
            if hit:
                return {**cached, "cache_hit": True}

        active_payload = {
            "cpf": doc_digits,
            "cpf_mascarado": doc_masked,
            "tribunal": clean_tribunal,
        }
        result = self._execute_search(
            search_params={
                "cpfCnpj": doc_digits,
                "numeroProcesso": "",
            },
            tribunal=clean_tribunal,
            resolved_captcha=resolved,
            operation="consulta_por_cpf",
            consulta_payload=active_payload,
            resume_endpoint=resume_endpoint,
            resume_method=resume_method,
        )

        processos = result["processos"]
        for proc in processos:
            proc_cnj = proc.get("numero_processo")
            if proc_cnj:
                self._cache.set(
                    f"projudi:real:proc:{proc_cnj}",
                    {
                        "consultado_em": _utc_iso(),
                        "fonte": PROJUDI_TJPR_ROOT_URL,
                        "modo_execucao": "raspagem_real_projudi_tjpr",
                        "cache_hit": False,
                        **proc,
                        "movimentacoes": proc.get("movimentacoes") or [],
                    },
                    ttl_seconds=self._ttl,
                )

        payload: dict[str, Any] = {
            "consultado_em": _utc_iso(),
            "fonte": PROJUDI_TJPR_ROOT_URL,
            "tribunal": clean_tribunal,
            "tribunal_nome": SUPPORTED_TRIBUNALS[clean_tribunal]["nome"],
            "tipo_documento": doc_kind,
            "cpf_mascarado": doc_masked,
            "modo_execucao": "raspagem_real_projudi_tjpr",
            "captcha_token_informado": bool(resolved.solution),
            "captcha_resumed": bool(resolved.challenge_id or resolved.solution),
            "cache_hit": False,
            "politica_privacidade": "LGPD_MASKED_PUBLIC_RECORDS_ONLY",
            "compliance": {
                "lgpd_cpf_mascarado_nos_logs": True,
                "raspagem_respeita_controles_acesso": True,
                "dados_sinteticos_ou_mock": False,
                "portal_consulta_publica": PROJUDI_TJPR_ROOT_URL,
            },
            "navigator_texto": result["navigator_texto"],
            "total_processos": result["total_navigator"],
            "processos_pagina": len(processos),
            "processos": processos,
            "avisos": [
                "A consulta pública de processos criminais no PROJUDI TJPR ocorre apenas "
                "mediante número único do processo."
            ],
        }
        self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
        return payload

    def obter_processo(
        self,
        numero_processo: str | None = None,
        *,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        challenge_id: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Lookup a single CNJ process on real PROJUDI TJPR (zero mocked records)."""
        explicit_lookup = dict(consulta_payload or {})
        if numero_processo:
            explicit_lookup["numero_processo"] = numero_processo

        resolved = self._captcha_store.resolve_inputs(
            challenge_id=challenge_id,
            captcha_token=captcha_token,
            captcha_solution=captcha_solution,
            session_cookie=session_cookie,
            consulta_payload=explicit_lookup or None,
        )
        effective_cnj = numero_processo or resolved.consulta_payload.get("numero_processo")

        cnj = validate_cnj_process_number(effective_cnj)
        tr_code = cnj.split(".")[-2]
        if tr_code != "16":
            raise ConnectorValidationError(
                f"O processo '{cnj}' pertence ao tribunal TR={tr_code}; este conector "
                "opera diretamente sobre o PROJUDI TJPR (TR=16, sem mocks).",
                extra={"field": "numero_processo", "expected_tr": "16"},
            )

        cache_key = f"projudi:real:proc:{cnj}"
        if not resolved.solution and not resolved.session_cookie and not resolved.challenge_id:
            hit, cached = self._cache.get(cache_key)
            if hit:
                return {**cached, "cache_hit": True}

        active_payload = {"numero_processo": cnj, "tribunal": "TJPR"}
        search_res = self._execute_search(
            search_params={
                "numeroProcesso": cnj,
                "cpfCnpj": "",
            },
            tribunal="TJPR",
            resolved_captcha=resolved,
            operation="obter_processo",
            consulta_payload=active_payload,
            resume_endpoint=f"/api/v1/projudi/processos/{cnj}",
            resume_method="GET",
        )

        matched = next(
            (p for p in search_res["processos"] if p["numero_processo"] == cnj),
            search_res["processos"][0] if search_res["processos"] else None,
        )

        if matched is None:
            # Check if PROJUDI navigated straight to the detail view for an exact CNJ match
            if cnj in search_res["raw_html"]:
                detail = parse_projudi_detail_html(search_res["raw_html"], cnj, "TJPR")
                if detail["classe_processual"] or detail["movimentacoes"] or detail["partes"]:
                    payload = {
                        "consultado_em": _utc_iso(),
                        "fonte": PROJUDI_TJPR_ROOT_URL,
                        "modo_execucao": "raspagem_real_projudi_tjpr",
                        "captcha_resumed": bool(resolved.challenge_id or resolved.solution),
                        "cache_hit": False,
                        **detail,
                    }
                    self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
                    return payload

            raise ConnectorNotFoundError(
                f"Processo público '{cnj}' não encontrado na consulta pública do PROJUDI TJPR."
            )

        detail_data: dict[str, Any] = {
            **matched,
            "movimentacoes": [],
        }
        detail_url = matched.get("url_detalhe")
        if detail_url:
            cookie_hdr = merge_cookie_header(
                search_res["cookie_jar"], resolved.session_cookie
            )
            det_headers = {"Referer": search_res["response_url"]}
            if cookie_hdr:
                det_headers["Cookie"] = cookie_hdr
            try:
                det_resp = self._transport.request(
                    detail_url,
                    method="GET",
                    headers=det_headers,
                    timeout_seconds=self._timeout,
                )
                parsed_det = parse_projudi_detail_html(det_resp.text(), cnj, "TJPR")
                for key, val in parsed_det.items():
                    if val:
                        detail_data[key] = val
            except (UpstreamConnectorError, ConnectorCaptchaRequiredError):
                pass

        payload = {
            "consultado_em": _utc_iso(),
            "fonte": PROJUDI_TJPR_ROOT_URL,
            "modo_execucao": "raspagem_real_projudi_tjpr",
            "captcha_resumed": bool(resolved.challenge_id or resolved.solution),
            "cache_hit": False,
            **detail_data,
        }
        self._cache.set(cache_key, payload, ttl_seconds=self._ttl)
        return payload

    def resumir_processo(
        self,
        numero_processo: str | None = None,
        body: dict[str, Any] | None = None,
        *,
        challenge_id: str | None = None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        session_cookie: str | None = None,
    ) -> dict[str, Any]:
        """Extract deterministic case metrics/phases and prepare an AI/n8n-ready summary.

        Uses real PROJUDI TJPR data when ``captcha_token``/``captcha_solution``/``session_cookie``
        or a cached lookup is available, or summarizes caller-supplied ``texto_processo`` /
        ``movimentacoes`` directly without inventing synthetic process data.
        """
        req_data = dict(body) if isinstance(body, dict) else {}
        eff_challenge_id = (
            challenge_id or str(req_data.get("challenge_id") or "").strip() or None
        )
        eff_token = (
            captcha_token or str(req_data.get("captcha_token") or "").strip() or None
        )
        eff_solution = (
            captcha_solution
            or str(
                req_data.get("captcha_solution")
                or req_data.get("g-recaptcha-response")
                or req_data.get("resposta")
                or req_data.get("captcha")
                or ""
            ).strip()
            or None
        )
        eff_cookie = (
            session_cookie or str(req_data.get("session_cookie") or "").strip() or None
        )
        nested_payload = (
            req_data.get("consulta_payload")
            if isinstance(req_data.get("consulta_payload"), dict)
            else {}
        )
        explicit_lookup = dict(nested_payload)
        if numero_processo:
            explicit_lookup["numero_processo"] = numero_processo

        resolved = self._captcha_store.resolve_inputs(
            challenge_id=eff_challenge_id,
            captcha_token=eff_token,
            captcha_solution=eff_solution,
            session_cookie=eff_cookie,
            consulta_payload=explicit_lookup or None,
        )
        effective_cnj = numero_processo or resolved.consulta_payload.get("numero_processo")
        cnj = validate_cnj_process_number(effective_cnj)

        raw_text = mask_sensitive_text(
            str(
                req_data.get("texto_processo")
                or resolved.consulta_payload.get("texto_processo")
                or ""
            ).strip()
        )
        incoming_movs = (
            req_data.get("movimentacoes")
            if req_data.get("movimentacoes") is not None
            else resolved.consulta_payload.get("movimentacoes")
        )
        objetivo = str(
            req_data.get("objetivo")
            or resolved.consulta_payload.get("objetivo")
            or "triagem_juridica_executiva"
        ).strip()

        has_caller_corpus = bool(
            raw_text or (isinstance(incoming_movs, list) and len(incoming_movs) > 0)
        )

        base_case: dict[str, Any] | None = None
        cached_hit, cached_proc = self._cache.get(f"projudi:real:proc:{cnj}")
        if (
            cached_hit
            and isinstance(cached_proc, dict)
            and not resolved.solution
            and not resolved.challenge_id
        ):
            base_case = cached_proc
        elif (
            resolved.solution
            or resolved.session_cookie
            or resolved.challenge_id
            or not has_caller_corpus
        ):
            try:
                base_case = self.obter_processo(
                    cnj,
                    captcha_token=eff_token,
                    captcha_solution=eff_solution,
                    challenge_id=eff_challenge_id,
                    session_cookie=eff_cookie,
                )
            except ConnectorCaptchaRequiredError as exc:
                if not has_caller_corpus:
                    # Rebind challenge metadata to resumir_processo so popup resumes /resumo
                    old_cid = exc.extra.get("challenge_id")
                    old_ch = self._captcha_store.get_challenge(old_cid)
                    if old_ch is not None:
                        self._captcha_store.consume_challenge(old_cid)
                        resumo_endpoint = f"/api/v1/projudi/processos/{cnj}/resumo"
                        resumo_ch = self._captcha_store.issue_challenge(
                            connector="projudi",
                            operation="resumir_processo",
                            provider=old_ch.provider,
                            site_key=old_ch.site_key,
                            challenge_url=old_ch.challenge_url,
                            portal_url=old_ch.portal_url,
                            action_url=old_ch.action_url,
                            http_method=old_ch.http_method,
                            callback=old_ch.callback,
                            response_field=old_ch.response_field,
                            cookie_jar=old_ch.cookie_jar,
                            form_fields=old_ch.form_fields,
                            consulta_payload={
                                "numero_processo": cnj,
                                "objetivo": objetivo,
                            },
                            resume_endpoint=resumo_endpoint,
                            resume_method="POST",
                            image_url=old_ch.challenge_data.get("image_url"),
                            image_base64=old_ch.challenge_data.get("image_base64"),
                            image_mime_type=old_ch.challenge_data.get("image_mime_type"),
                            image_data_uri=old_ch.challenge_data.get("image_data_uri"),
                            extra_challenge_data=old_ch.challenge_data,
                            prompt_label=old_ch.challenge_data.get("prompt_label"),
                            rejected_previous_attempt=bool(
                                old_ch.challenge_data.get("rejected_previous_attempt")
                            ),
                            instructions=self._build_captcha_instructions(
                                form_url=old_ch.challenge_url,
                                site_key=old_ch.site_key,
                                callback_name=old_ch.callback,
                                provider=old_ch.provider,
                                resume_endpoint=resumo_endpoint,
                            ),
                        )
                        raise resumo_ch.to_exception(
                            exc.detail,
                            extra={"dados_sinteticos_ou_mock": False},
                        ) from exc
                    raise
            except UpstreamConnectorError:
                if not has_caller_corpus:
                    raise

        tr_code = cnj.split(".")[-2]
        tribunal = (
            str(base_case.get("tribunal"))
            if base_case and base_case.get("tribunal")
            else ("TJPR" if tr_code == "16" else f"TR-{tr_code}")
        )
        classe = str(
            (base_case or {}).get("classe_processual")
            or (base_case or {}).get("classe")
            or req_data.get("classe_processual")
            or req_data.get("classe")
            or "Não informada (texto fornecido pelo cliente)"
        )
        assunto = str(
            (base_case or {}).get("assunto_principal")
            or (base_case or {}).get("assunto")
            or req_data.get("assunto_principal")
            or req_data.get("assunto")
            or "Não informado"
        )
        vara = str(
            (base_case or {}).get("vara")
            or (base_case or {}).get("vara_comarca")
            or req_data.get("vara")
            or f"Unidade Judiciária ({tribunal})"
        )
        data_dist = str(
            (base_case or {}).get("data_distribuicao")
            or req_data.get("data_distribuicao")
            or ""
        )

        normalized_movs: list[dict[str, Any]] = []
        if isinstance(incoming_movs, list) and incoming_movs:
            for idx, item in enumerate(incoming_movs, start=1):
                if isinstance(item, dict):
                    normalized_movs.append(
                        {
                            "sequencia": int(item.get("sequencia") or idx),
                            "data": _normalize_date_str(str(item.get("data") or "")),
                            "tipo": mask_sensitive_text(str(item.get("tipo") or "Movimentação")),
                            "descricao": mask_sensitive_text(str(item.get("descricao") or "")),
                        }
                    )
                elif isinstance(item, str) and item.strip():
                    normalized_movs.append(
                        {
                            "sequencia": idx,
                            "data": _normalize_date_str(item),
                            "tipo": "Movimentação Informada",
                            "descricao": mask_sensitive_text(item.strip()),
                        }
                    )
        elif base_case and isinstance(base_case.get("movimentacoes"), list):
            normalized_movs = [
                {
                    "sequencia": int(m.get("sequencia") or idx),
                    "data": str(m.get("data") or ""),
                    "tipo": mask_sensitive_text(str(m.get("tipo") or "Movimentação")),
                    "descricao": mask_sensitive_text(str(m.get("descricao") or "")),
                }
                for idx, m in enumerate(base_case["movimentacoes"], start=1)
                if isinstance(m, dict)
            ]

        if not normalized_movs and raw_text:
            lines = [ln.strip() for ln in raw_text.splitlines() if ln.strip()]
            for idx, ln in enumerate(lines[:25], start=1):
                dt_found = _parse_any_date(ln)
                normalized_movs.append(
                    {
                        "sequencia": idx,
                        "data": dt_found.isoformat() if dt_found else "",
                        "tipo": "Trecho Processual Informado",
                        "descricao": ln,
                    }
                )

        analysis = _classify_phase_and_metrics(normalized_movs, raw_text, data_dist)
        fase = analysis["fase_processual"]
        metricas = analysis["metricas"]

        ultima_desc = (
            normalized_movs[-1]["descricao"]
            if normalized_movs
            else (raw_text[:180] if raw_text else "Sem movimentações detalhadas.")
        )
        origem_dados = (
            "raspagem_real_projudi_tjpr"
            if base_case is not None
            else "corpus_fornecido_pelo_cliente"
        )
        resumo_deterministico = (
            f"Processo {cnj} ({classe} — {assunto}) vinculado a {vara}. "
            f"Fase classificada como '{fase}' sobre {metricas['total_movimentacoes']} "
            f"evento(s) analisado(s), prioridade '{metricas['prioridade_triagem']}' "
            f"(score {metricas['score_prioridade']}/100). Último registro: {ultima_desc}"
        )

        canonical_context = "\n".join(
            [
                f"Processo: {cnj}",
                f"Tribunal: {tribunal}",
                f"Origem dos dados: {origem_dados}",
                f"Classe Processual: {classe}",
                f"Assunto Principal: {assunto}",
                f"Fase detectada: {fase}",
                *[
                    f"[{m.get('sequencia')}] {m.get('data')} - {m.get('tipo')}: {m.get('descricao')}"
                    for m in normalized_movs
                ],
                f"Texto complementar: {raw_text}" if raw_text else "",
            ]
        ).strip()
        context_digest = hashlib.sha256(canonical_context.encode("utf-8")).hexdigest()

        return {
            "gerado_em": _utc_iso(),
            "status": "ready_for_llm",
            "origem_dados": origem_dados,
            "captcha_token_informado": bool(resolved.solution),
            "captcha_resumed": bool(resolved.challenge_id or resolved.solution),
            "numero_processo": cnj,
            "tribunal": tribunal,
            "classe_processual": classe,
            "classe": classe,
            "assunto_principal": assunto,
            "objetivo_triagem": objetivo,
            "fase_processual": fase,
            "metricas": metricas,
            "marcos_extraidos": normalized_movs[-5:],
            "resumo_deterministico": resumo_deterministico,
            "llm_placeholder": {
                "status": "ready_for_llm",
                "provider_configured": False,
                "n8n_webhook_ready": True,
                "workflow_id_sugerido": "projudi-case-summarizer",
                "context_sha256": context_digest,
                "system_prompt": (
                    "Você é um assistente jurídico de triagem processual. Resuma de forma "
                    "objetiva os fatos, fase atual, riscos e próximos passos exclusivamente "
                    "a partir dos eventos reais fornecidos, sem inventar peças ou datas."
                ),
                "mensagem_placeholder": (
                    "Contrato pronto para LLM/n8n: envie 'prompt_context' para seu provedor "
                    "OpenAI-compatible ou webhook n8n para gerar o parecer narrativo final."
                ),
                "prompt_context": canonical_context,
            },
        }
