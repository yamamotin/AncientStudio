"""Input normalization, document checksum validation, and LGPD masking helpers."""

from __future__ import annotations

import re
import unicodedata

from api.connectors.errors import ConnectorValidationError

VALID_BRAZILIAN_UFS: frozenset[str] = frozenset(
    {
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MS",
        "MT",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RO",
        "RR",
        "RS",
        "SC",
        "SE",
        "SP",
        "TO",
    }
)

_NON_DIGITS_RE = re.compile(r"\D+")
_WHITESPACE_RE = re.compile(r"\s+")
_HTML_TAG_RE = re.compile(r"<[^>]+>")
_CNJ_FORMATTED_RE = re.compile(r"^(\d{7})-(\d{2})\.(\d{4})\.(\d)\.(\d{2})\.(\d{4})$")
_CPF_INLINE_RE = re.compile(r"\b(\d{3})\.?(\d{3})\.?(\d{3})-?(\d{2})\b")
_CNPJ_INLINE_RE = re.compile(r"\b(\d{2})\.?(\d{3})\.?(\d{3})/?(\d{4})-?(\d{2})\b")
_EMAIL_INLINE_RE = re.compile(r"\b([A-Za-z0-9._%+-])[A-Za-z0-9._%+-]*@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b")


def clean_digits(value: str | None) -> str:
    """Keep only ASCII digits from ``value``."""
    return _NON_DIGITS_RE.sub("", str(value or ""))


def strip_html_tags(text: str | None) -> str:
    """Remove inline HTML formatting tags (such as ``<i>`` in Siscomex NCM descriptions)."""
    cleaned = _HTML_TAG_RE.sub(" ", str(text or ""))
    return _WHITESPACE_RE.sub(" ", cleaned).strip()


def strip_accents(text: str | None) -> str:
    """Fold Unicode diacritics into plain ASCII characters."""
    decomposed = unicodedata.normalize("NFKD", str(text or ""))
    return "".join(ch for ch in decomposed if not unicodedata.combining(ch))


def normalize_search_text(text: str | None) -> str:
    """Lowercase, strip accents and punctuation, and collapse whitespace for fuzzy matching."""
    folded = strip_accents(strip_html_tags(text)).lower()
    alnum = re.sub(r"[^a-z0-9]+", " ", folded)
    return _WHITESPACE_RE.sub(" ", alnum).strip()


def validate_uf(raw_uf: str | None) -> str:
    """Validate and uppercase a 2-letter Brazilian federative unit code."""
    candidate = strip_accents(raw_uf).strip().upper()
    if candidate not in VALID_BRAZILIAN_UFS:
        raise ConnectorValidationError(
            f"UF inválida '{raw_uf or ''}'. Informe uma sigla oficial de 2 letras (ex.: PR, SP).",
            extra={"field": "uf", "allowed": sorted(VALID_BRAZILIAN_UFS)},
        )
    return candidate


def is_valid_cpf(raw_cpf: str | None) -> bool:
    """Verify Brazilian CPF length, non-uniformity, and both mod-11 check digits."""
    digits = clean_digits(raw_cpf)
    if len(digits) != 11 or len(set(digits)) == 1:
        return False

    total_first = sum(int(digits[idx]) * (10 - idx) for idx in range(9))
    check_first = (total_first * 10) % 11
    if check_first == 10:
        check_first = 0
    if check_first != int(digits[9]):
        return False

    total_second = sum(int(digits[idx]) * (11 - idx) for idx in range(10))
    check_second = (total_second * 10) % 11
    if check_second == 10:
        check_second = 0
    return check_second == int(digits[10])


def validate_cpf(raw_cpf: str | None) -> str:
    """Return 11 canonical CPF digits or raise ``ConnectorValidationError`` (HTTP 422)."""
    digits = clean_digits(raw_cpf)
    if not is_valid_cpf(digits):
        raise ConnectorValidationError(
            "CPF inválido: verifique os 11 dígitos e os dígitos verificadores.",
            extra={"field": "cpf"},
        )
    return digits


def format_cpf(cpf_digits: str) -> str:
    digits = clean_digits(cpf_digits)
    if len(digits) != 11:
        return digits
    return f"{digits[:3]}.{digits[3:6]}.{digits[6:9]}-{digits[9:]}"


def mask_cpf(raw_cpf: str | None) -> str:
    """LGPD-compliant CPF masking preserving only middle 6 digits (``***.456.789-**``)."""
    digits = clean_digits(raw_cpf)
    if len(digits) != 11:
        return "***.***.***-**"
    return f"***.{digits[3:6]}.{digits[6:9]}-**"


def mask_cnpj(raw_cnpj: str | None) -> str:
    """Mask CNPJ preserving root branch context (``12.***.***/0001-**``)."""
    digits = clean_digits(raw_cnpj)
    if len(digits) != 14:
        return "**.***.***/****-**"
    return f"{digits[:2]}.***.***/{digits[8:12]}-**"


def mask_sensitive_text(text: str | None) -> str:
    """Mask embedded CPFs, CNPJs, and e-mail addresses inside public movement/party text."""
    value = str(text or "")
    value = _CNPJ_INLINE_RE.sub(lambda m: f"{m.group(1)}.***.***/{m.group(4)}-**", value)
    value = _CPF_INLINE_RE.sub(lambda m: f"***.{m.group(2)}.{m.group(3)}-**", value)
    value = _EMAIL_INLINE_RE.sub(lambda m: f"{m.group(1)}***@{m.group(2)}", value)
    return value


def format_cnj_number(digits: str) -> str:
    return (
        f"{digits[0:7]}-{digits[7:9]}.{digits[9:13]}."
        f"{digits[13]}.{digits[14:16]}.{digits[16:20]}"
    )


def compute_cnj_check_digits(seq7: str, year4: str, just1: str, tr2: str, orig4: str) -> str:
    """Compute official CNJ Resolution 65 ISO 7064 Mod 97-10 two-digit verifier."""
    remainder = int(seq7) % 97
    remainder = int(f"{remainder:02d}{year4}{just1}{tr2}") % 97
    remainder = int(f"{remainder:02d}{orig4}00") % 97
    verifier = 98 - remainder
    return f"{verifier:02d}"


def validate_cnj_process_number(raw_number: str | None) -> str:
    """Validate and format a 20-digit CNJ process identifier (``NNNNNNN-DD.AAAA.J.TR.OOOO``)."""
    raw = str(raw_number or "").strip()
    match = _CNJ_FORMATTED_RE.match(raw)
    if match:
        digits = "".join(match.groups())
    else:
        digits = clean_digits(raw)

    if len(digits) != 20:
        raise ConnectorValidationError(
            "Número de processo inválido. Use o padrão CNJ de 20 dígitos "
            "(NNNNNNN-DD.AAAA.J.TR.OOOO).",
            extra={"field": "numero_processo"},
        )

    year = int(digits[9:13])
    justice_segment = int(digits[13])
    tribunal_code = int(digits[14:16])
    if year < 1980 or year > 2099 or justice_segment == 0 or tribunal_code == 0:
        raise ConnectorValidationError(
            "Número de processo CNJ fora dos parâmetros estruturais (ano/segmento/tribunal).",
            extra={"field": "numero_processo"},
        )

    return format_cnj_number(digits)
