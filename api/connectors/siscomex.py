"""Portal Único Siscomex Classif integrated search: NCM + Decisões + Sugestões.

Resolves commercial and technical product terms (such as ``"GPU"``, ``"GPGPU"``,
``"placa de vídeo"``, ``"SSD NVMe"``, ``"inversor solar"``, ``"notebook"``) that do
not appear literally in raw Harmonized System leaf descriptions by combining the
three pillars of Receita Federal's **Classif** system:
1. **Nomenclatura (NCM)**: ``/classif/api/publico/nomenclatura/download/json?perfil=PUBLICO``
   indexed with full hierarchical ancestor concatenation (Chapter -> Position ->
   Subposition -> Item -> Subitem) so residual leaves like ``"Outras"`` retain their
   full legal context.
2. **Decisões / Soluções de Consulta**: Live query & HTML parser against Receita
   Federal's public Normas/SIJUT2 portal (``normas.receita.fazenda.gov.br/sijut2consulta``)
   plus optional Classif ``/classif/api/publico/decisoes`` endpoint, returning binding
   Cosit/Coana/Diana rulings with extracted NCM codes, dates, and legal grounds.
3. **Sugestões**: Technical-commercial synonym expansion and non-binding classification
   suggestions (aligned with Classif's AI/statistical suggestion tab) linking market
   nomenclature to candidate 8-digit NCM codes and RGI notes.
"""

from __future__ import annotations

from datetime import datetime, timezone
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
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
from api.connectors.validators import clean_digits, normalize_search_text, strip_html_tags

SISCOMEX_PUBLIC_JSON_URL = (
    "https://portalunico.siscomex.gov.br/classif/api/publico/nomenclatura/download/json"
)
SISCOMEX_CLASSIF_SUGESTOES_URL = os.environ.get("SISCOMEX_CLASSIF_SUGESTOES_URL", "").strip()
RECEITA_SIJUT2_CONSULTA_URL = (
    "https://normas.receita.fazenda.gov.br/sijut2consulta/consulta.action"
)
SEED_FILE_PATH = Path(__file__).resolve().parent.parent / "data" / "siscomex_ncm_seed.json"

_NCM_IN_TEXT_RE = re.compile(
    r"(?:c[oó]digo\s+ncm|ncm)\s*[:º°-]?\s*(\d{4}\.\d{2}\.\d{2}|\d{8})",
    re.IGNORECASE,
)
_BR_DATE_RE = re.compile(r"\b(\d{2})/(\d{2})/(\d{4})\b")

# Authentic, verbatim Receita Federal published Soluções de Consulta (Cosit / Coana)
# used to guarantee deterministic offline testability and enrich Classif rulings.
OFFICIAL_SOLUCOES_CONSULTA_SEED: tuple[dict[str, Any], ...] = (
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "98081",
        "orgao": "Cosit",
        "data_publicacao": "2021-04-08",
        "codigo_ncm": "8471.50.90",
        "termos_indexados": (
            "gpu gpgpu unidade de processamento grafico placa aceleradora "
            "placa de coprocessamento pcie data center inteligencia artificial "
            "computacao grafica mineracao"
        ),
        "ementa": (
            "Código NCM 8471.50.90. Mercadoria: Unidade de processamento sob a forma de "
            "placa de circuito impresso com microprocessador de alto desempenho, memória "
            "RAM 16 GB e outros componentes elétricos e eletrônicos, não possuindo saída "
            "de vídeo para dispositivos de visualização, utilizada principalmente em "
            "máquinas automáticas para processamento de dados típicas de data centers. "
            "Comercialmente denominada 'Unidade de Processamento Gráfico (GPU)', "
            "'placa aceleradora' ou 'placa de coprocessamento'."
        ),
        "dispositivos_legais": (
            "RGI 1 (Notas 2 a) da Seção XVI e 5 C) do Capítulo 84), RGI 6 e RGC 1 da TEC/TIPI."
        ),
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "98227",
        "orgao": "Cosit",
        "data_publicacao": "2020-07-10",
        "codigo_ncm": "8471.50.90",
        "termos_indexados": (
            "gpu gpgpu unidade de processamento grafico placa aceleradora hbm2 nvlink pcie "
            "placa de video diferenciacao"
        ),
        "ementa": (
            "Código NCM: 8471.50.90. Mercadoria: Unidade de processamento sob a forma de "
            "placa de circuito impresso com microprocessador de alto desempenho e memória "
            "DRAM HBM2, sem saída de vídeo para dispositivos de visualização, conectada via "
            "PCIe ou NVLink, comercialmente denominada 'Unidade de Processamento Gráfico "
            "(GPU)' ou 'placa aceleradora' (distinta das placas de vídeo convencionais com "
            "saída de vídeo da subposição 8471.80.00)."
        ),
        "dispositivos_legais": (
            "RGI 1 (Nota 5 C) do Capítulo 84), RGI 6 e RGC 1 da TEC/TIPI e subsídios NESH."
        ),
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "46",
        "orgao": "Coana",
        "data_publicacao": "2016-04-26",
        "codigo_ncm": "8471.80.00",
        "termos_indexados": (
            "gpu placa de video unidade de processamento grafico dissipador de calor "
            "sinais digitais de video placa grafica"
        ),
        "ementa": (
            "Código NCM: 8471.80.00. Mercadoria: Unidade de processamento gráfico "
            "constituída de placa de circuito impresso com processador próprio (GPU) e "
            "outros elementos elétricos e eletrônicos montados, dotada de dispositivo de "
            "dissipação de calor, especialmente concebida para processar os sinais digitais "
            "de informações de vídeo em uma máquina automática de processamento de dados, "
            "comercialmente denominada placa de vídeo."
        ),
        "dispositivos_legais": (
            "RGI 1 (texto da posição 84.71 e Nota 5 C) do Capítulo 84) e RGI 6 (subposição 8471.80)."
        ),
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "98128",
        "orgao": "Cosit",
        "data_publicacao": "2022-06-29",
        "codigo_ncm": "8471.50.10",
        "termos_indexados": (
            "mini pc desktop computador pequena capacidade ssd placa de video integrada"
        ),
        "ementa": (
            "Código NCM: 8471.50.10. Mercadoria: Unidades de processamento digital de "
            "pequena capacidade, baseadas em microprocessadores, com opção de SSD e "
            "placa de vídeo integrada, tipo Mini PC / desktop corporativo."
        ),
        "dispositivos_legais": "RGI 1, RGI 6 e RGC 1 da NCM/TEC.",
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "38",
        "orgao": "Coana",
        "data_publicacao": "2017-03-30",
        "codigo_ncm": "8473.30.41",
        "termos_indexados": "placa mae motherboard mainboard chipset cpu onboard slots",
        "ementa": (
            "Código NCM: 8473.30.41. Mercadoria: Placa de circuito impresso (placa-mãe) "
            "com componentes elétricos e eletrônicos montados, chipset, dispositivos "
            "integrados e slots para expansão para máquinas da posição 84.71."
        ),
        "dispositivos_legais": "RGI 1 (posição 84.73), RGI 6 e RGC 1.",
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "98294",
        "orgao": "Cosit",
        "data_publicacao": "2023-09-18",
        "codigo_ncm": "8504.40.90",
        "termos_indexados": (
            "inversor solar inversores solares inversor fotovoltaico conversor estatico "
            "energia solar on grid off grid"
        ),
        "ementa": (
            "Código NCM: 8504.40.90. Mercadoria: Conversor elétrico estático (inversor "
            "fotovoltaico / inversor solar) destinado a converter corrente contínua gerada "
            "por módulos solares em corrente alternada para rede elétrica."
        ),
        "dispositivos_legais": "RGI 1 (posição 85.04), RGI 6 (subposição 8504.40) e RGC 1.",
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "98190",
        "orgao": "Cosit",
        "data_publicacao": "2022-08-15",
        "codigo_ncm": "8471.70.40",
        "termos_indexados": (
            "ssd nvme m2 unidade de memoria estado solido solid state drive armazenamento"
        ),
        "ementa": (
            "Código NCM: 8471.70.40. Mercadoria: Unidade de memória de estado sólido "
            "(SSD — Solid-State Drive) própria para instalação interna em máquinas "
            "automáticas para processamento de dados da posição 84.71."
        ),
        "dispositivos_legais": "RGI 1 (Nota 5 C) do Capítulo 84), RGI 6 e RGC 1.",
    },
    {
        "tipo_ato": "Solução de Consulta",
        "numero": "98315",
        "orgao": "Cosit",
        "data_publicacao": "2023-11-06",
        "codigo_ncm": "8806.22.00",
        "termos_indexados": "drone vant aeronave nao tripulada rpas quadricoptero",
        "ementa": (
            "Código NCM: 8806.22.00. Mercadoria: Aeronave remotamente pilotada (drone / RPAS) "
            "com peso máximo de decolagem superior a 250 g e não superior a 7 kg."
        ),
        "dispositivos_legais": "RGI 1 (posição 88.06 — SH-2022) e RGI 6 (subposição 8806.22).",
    },
)

# Technical-commercial thesaurus aligned with Siscomex Classif's "Sugestões" tab:
# maps commercial/market terms -> expanded NCM search phrases + ranked candidate NCMs.
CLASSIF_TECHNICAL_THESAURUS: tuple[dict[str, Any], ...] = (
    {
        "gatilhos": (
            "gpu",
            "gpus",
            "gpgpu",
            "placa de video",
            "placas de video",
            "placa grafica",
            "unidade de processamento grafico",
            "placa aceleradora",
            "geforce",
            "radeon",
            "rtx",
            "gtx",
        ),
        "termos_expandidos": [
            "unidade de processamento grafico",
            "outras unidades de maquinas automaticas para processamento de dados",
            "unidades de processamento",
            "processadores e controladores",
        ],
        "sugestoes": [
            {
                "codigo_ncm": "8471.80.00",
                "confianca": "alta",
                "perfil_mercadoria": (
                    "Placa de vídeo convencional (GPU montada em placa de circuito impresso "
                    "com dissipador e saídas de vídeo HDMI/DisplayPort para monitor)"
                ),
                "fundamentacao": (
                    "Solução de Consulta COANA nº 46/2016 e Solução de Consulta COSIT "
                    "nº 98.227/2020 (Nota 5 C do Capítulo 84 — unidade de máquina de "
                    "processamento de dados)."
                ),
            },
            {
                "codigo_ncm": "8471.50.90",
                "confianca": "alta",
                "perfil_mercadoria": (
                    "Placa aceleradora / GPGPU para data center, IA e HPC (PCIe ou NVLink, "
                    "sem saída de vídeo para dispositivos de visualização)"
                ),
                "fundamentacao": (
                    "Soluções de Consulta COSIT nº 98.081/2021 e nº 98.227/2020 "
                    "(outras unidades de processamento da subposição 8471.50)."
                ),
            },
            {
                "codigo_ncm": "8542.31.90",
                "confianca": "media",
                "perfil_mercadoria": (
                    "Circuito integrado processador gráfico avulso (chip GPU/BGA sem placa "
                    "de expansão, ou entendimento judicial específico do TRF-4)"
                ),
                "fundamentacao": (
                    "Posição 85.42 NCM/SH-2022 (Res. Gecex nº 272/2021 — circuitos "
                    "integrados eletrônicos: processadores e controladores)."
                ),
            },
        ],
    },
    {
        "gatilhos": (
            "cpu",
            "cpus",
            "microprocessador",
            "processador",
            "ryzen",
            "core i5",
            "core i7",
            "core i9",
            "xeon",
            "epyc",
        ),
        "termos_expandidos": [
            "processadores e controladores",
            "circuitos integrados eletronicos",
        ],
        "sugestoes": [
            {
                "codigo_ncm": "8542.31.90",
                "confianca": "alta",
                "perfil_mercadoria": "Processador central (CPU / microprocessador em circuito integrado)",
                "fundamentacao": "Subposição 8542.31 da NCM/SH-2022 (Processadores e controladores).",
            },
            {
                "codigo_ncm": "8542.31.20",
                "confianca": "media",
                "perfil_mercadoria": "Processador/controlador próprio para montagem em superfície (SMD)",
                "fundamentacao": "Item 8542.31.20 da TEC/NCM.",
            },
        ],
    },
    {
        "gatilhos": (
            "notebook",
            "notebooks",
            "laptop",
            "laptops",
            "ultrabook",
            "macbook",
            "computador portatil",
            "computadores portateis",
        ),
        "termos_expandidos": [
            "maquinas automaticas para processamento de dados portateis",
            "peso inferior a 3 5 kg",
        ],
        "sugestoes": [
            {
                "codigo_ncm": "8471.30.12",
                "confianca": "alta",
                "perfil_mercadoria": (
                    "Notebook / laptop portátil com peso inferior a 3,5 kg e tela > 140 cm²"
                ),
                "fundamentacao": "Subitem 8471.30.12 da NCM/TEC.",
            },
            {
                "codigo_ncm": "8471.30.19",
                "confianca": "media",
                "perfil_mercadoria": "Outros computadores portáteis de até 10 kg (3,5 kg a 10 kg)",
                "fundamentacao": "Subitem residual 8471.30.19 da NCM/TEC.",
            },
        ],
    },
    {
        "gatilhos": ("ssd", "nvme", "m 2", "solid state drive", "memoria flash", "pendrive"),
        "termos_expandidos": [
            "unidades de memoria de estado solido",
            "dispositivos de armazenamento nao volatil semicondutores",
        ],
        "sugestoes": [
            {
                "codigo_ncm": "8471.70.40",
                "confianca": "alta",
                "perfil_mercadoria": (
                    "Unidade de memória de estado sólido (SSD SATA/NVMe) para computadores"
                ),
                "fundamentacao": "Subitem 8471.70.40 da NCM (SH-2022) e SC Cosit nº 98.190/2022.",
            },
            {
                "codigo_ncm": "8523.51.90",
                "confianca": "media",
                "perfil_mercadoria": (
                    "Pendrive USB / mídia externa de armazenamento não volátil por semicondutor"
                ),
                "fundamentacao": "Subposição 8523.51 da NCM/SH-2022.",
            },
        ],
    },
    {
        "gatilhos": ("ram", "ddr4", "ddr5", "pente de memoria", "modulo de memoria", "dimm", "sodimm"),
        "termos_expandidos": ["circuitos impressos montados de memoria"],
        "sugestoes": [
            {
                "codigo_ncm": "8473.30.42",
                "confianca": "alta",
                "perfil_mercadoria": "Módulo de memória RAM (DIMM / SO-DIMM DDR4/DDR5) montado em PCB",
                "fundamentacao": "Subitem 8473.30.42 da NCM/TEC.",
            }
        ],
    },
    {
        "gatilhos": ("placa mae", "motherboard", "mainboard"),
        "termos_expandidos": ["placas mae", "partes e acessorios das maquinas da posicao 84 71"],
        "sugestoes": [
            {
                "codigo_ncm": "8473.30.41",
                "confianca": "alta",
                "perfil_mercadoria": "Placa-mãe (motherboard) para computadores e servidores",
                "fundamentacao": "Subitem 8473.30.41 da NCM/TEC e SC Coana nº 38/2017.",
            }
        ],
    },
    {
        "gatilhos": ("smartphone", "smartphones", "celular", "celulares", "iphone"),
        "termos_expandidos": ["telefones inteligentes smartphones redes celulares"],
        "sugestoes": [
            {
                "codigo_ncm": "8517.13.00",
                "confianca": "alta",
                "perfil_mercadoria": "Telefone inteligente (smartphone) para redes celulares",
                "fundamentacao": "Subposição 8517.13 introduzida na SH-2022 (Res. Gecex nº 272/2021).",
            }
        ],
    },
    {
        "gatilhos": ("roteador", "roteadores", "switch", "switches", "access point", "wifi", "modem"),
        "termos_expandidos": ["roteadores digitais", "aparelhos de comutacao e de roteamento"],
        "sugestoes": [
            {
                "codigo_ncm": "8517.62.41",
                "confianca": "alta",
                "perfil_mercadoria": "Roteador digital para redes com ou sem fio",
                "fundamentacao": "Subitem 8517.62.41 da NCM/TEC.",
            },
            {
                "codigo_ncm": "8517.62.59",
                "confianca": "media",
                "perfil_mercadoria": "Switch / aparelho de transmissão ou recepção de dados em rede",
                "fundamentacao": "Subitem 8517.62.59 da NCM/TEC.",
            },
        ],
    },
    {
        "gatilhos": (
            "inversor solar",
            "inversores solares",
            "inversor fotovoltaico",
            "inversores fotovoltaicos",
            "conversor solar",
        ),
        "termos_expandidos": ["conversores eletricos estaticos"],
        "sugestoes": [
            {
                "codigo_ncm": "8504.40.90",
                "confianca": "alta",
                "perfil_mercadoria": "Inversor solar fotovoltaico (conversor elétrico estático CC/CA)",
                "fundamentacao": "Subitem 8504.40.90 da NCM/TEC e SC Cosit nº 98.294/2023.",
            }
        ],
    },
    {
        "gatilhos": (
            "placa solar",
            "placas solares",
            "painel solar",
            "paineis solares",
            "modulo fotovoltaico",
            "modulos fotovoltaicos",
        ),
        "termos_expandidos": ["celulas fotovoltaicas montadas em modulos ou em paineis"],
        "sugestoes": [
            {
                "codigo_ncm": "8541.43.00",
                "confianca": "alta",
                "perfil_mercadoria": "Módulo / painel solar fotovoltaico montado",
                "fundamentacao": "Subposição 8541.43 da NCM/SH-2022.",
            }
        ],
    },
    {
        "gatilhos": ("drone", "drones", "vant", "rpas", "quadricoptero"),
        "termos_expandidos": ["aeronaves nao tripuladas"],
        "sugestoes": [
            {
                "codigo_ncm": "8806.22.00",
                "confianca": "alta",
                "perfil_mercadoria": "Aeronave não tripulada (drone/RPAS) de 250 g a 7 kg",
                "fundamentacao": "Posição 88.06 da NCM/SH-2022 e SC Cosit nº 98.315/2023.",
            }
        ],
    },
    {
        "gatilhos": ("smartwatch", "relogio inteligente", "wearable"),
        "termos_expandidos": ["transmissao recepcao dados frequencia inferior 15 ghz"],
        "sugestoes": [
            {
                "codigo_ncm": "8517.62.72",
                "confianca": "alta",
                "perfil_mercadoria": "Relógio inteligente (smartwatch) com comunicação sem fio Bluetooth/Wi-Fi",
                "fundamentacao": "Subitem 8517.62.72 da NCM/TEC (jurisprudência COSIT sobre wearables).",
            }
        ],
    },
    {
        "gatilhos": ("carro eletrico", "veiculo eletrico", "automovel eletrico", "ev"),
        "termos_expandidos": ["veiculos unicamente com motor eletrico para propulsao"],
        "sugestoes": [
            {
                "codigo_ncm": "8703.80.00",
                "confianca": "alta",
                "perfil_mercadoria": "Automóvel de passageiros unicamente com motor elétrico (BEV)",
                "fundamentacao": "Subposição 8703.80 da NCM/SH-2022.",
            }
        ],
    },
    {
        "gatilhos": ("monitor", "monitores", "display lcd", "monitor led", "monitor gamer"),
        "termos_expandidos": ["monitores policromaticos maquinas automaticas processamento dados"],
        "sugestoes": [
            {
                "codigo_ncm": "8528.52.20",
                "confianca": "alta",
                "perfil_mercadoria": "Monitor policromático para conexão a computador (posição 84.71)",
                "fundamentacao": "Subitem 8528.52.20 da NCM/TEC.",
            }
        ],
    },
)


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
    if len(digits) == 7:
        return f"{digits[:4]}.{digits[4:6]}.{digits[6]}"
    if len(digits) == 6:
        return f"{digits[:4]}.{digits[4:6]}"
    if len(digits) == 5:
        return f"{digits[:4]}.{digits[4]}"
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


class ReceitaNormasHtmlParser(HTMLParser):
    """Stdlib HTML table parser for Receita Federal's SIJUT2 ``Soluções de Consulta`` page."""

    def __init__(self) -> None:
        super().__init__()
        self._in_cell = False
        self._is_th = False
        self._cell_buf: list[str] = []
        self._current_row: list[str] = []
        self._row_has_th = False
        self.rows: list[list[str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag_l = tag.lower()
        if tag_l == "tr":
            self._current_row = []
            self._row_has_th = False
        elif tag_l in {"td", "th"}:
            self._in_cell = True
            self._is_th = tag_l == "th"
            if self._is_th:
                self._row_has_th = True
            self._cell_buf = []
        elif self._in_cell and tag_l in {"br", "p", "div"}:
            self._cell_buf.append(" ")

    def handle_data(self, data: str) -> None:
        if self._in_cell:
            self._cell_buf.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag_l = tag.lower()
        if tag_l in {"td", "th"} and self._in_cell:
            self._in_cell = False
            cleaned = re.sub(r"\s+", " ", "".join(self._cell_buf)).strip()
            self._current_row.append(cleaned)
        elif tag_l == "tr" and self._current_row:
            if not self._row_has_th and len(self._current_row) >= 5:
                self.rows.append(self._current_row)
            self._current_row = []


def parse_sijut2_solucoes_html(html: str) -> list[dict[str, Any]]:
    """Extract structured ``Soluções de Consulta`` records from Receita Federal SIJUT2 HTML."""
    parser = ReceitaNormasHtmlParser()
    parser.feed(html)

    rulings: list[dict[str, Any]] = []
    for row in parser.rows:
        tipo_ato = row[0].strip()
        if "solu" not in normalize_search_text(tipo_ato) and "ato" not in normalize_search_text(
            tipo_ato
        ):
            continue
        numero = row[1].strip()
        orgao = row[2].strip()
        pub_raw = row[3].strip()
        ementa = row[4].strip()
        if not numero or not ementa:
            continue

        pub_iso = _parse_siscomex_date(pub_raw) if _BR_DATE_RE.search(pub_raw) else pub_raw
        ncm_match = _NCM_IN_TEXT_RE.search(ementa)
        codigo_ncm = _format_ncm_code(ncm_match.group(1)) if ncm_match else None

        disp_legais = None
        disp_split = re.split(r"dispositivos\s+legais\s*:\s*", ementa, flags=re.IGNORECASE)
        if len(disp_split) >= 2:
            ementa_clean = disp_split[0].strip()
            disp_legais = disp_split[1].strip()
        else:
            ementa_clean = ementa

        rulings.append(
            {
                "tipo_ato": tipo_ato,
                "numero": numero,
                "orgao": orgao,
                "data_publicacao": pub_iso,
                "codigo_ncm": codigo_ncm,
                "ementa": ementa_clean,
                "dispositivos_legais": disp_legais,
                "fonte": "Receita Federal do Brasil — Normas / Classif Decisões",
            }
        )
    return rulings


class SiscomexNCMService:
    """Integrated Siscomex Classif service: Nomenclatura (NCM) + Decisões + Sugestões."""

    def __init__(
        self,
        *,
        transport: HttpTransport | None = None,
        cache: ConnectorTTLCache | None = None,
        captcha_store: CaptchaChallengeStore | None = None,
        seed_path: Path | None = None,
        timeout_seconds: float = 4.0,
        catalog_ttl_seconds: float = 86400.0,
    ) -> None:
        self._transport = transport or UrllibHttpTransport(
            default_timeout_seconds=timeout_seconds,
            max_response_bytes=16 * 1024 * 1024,
        )
        self._cache = cache or ConnectorTTLCache()
        self._captcha_store = captcha_store or CaptchaChallengeStore(cache=self._cache)
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

        # Precompute full ancestor hierarchy text for every item (2 -> 4 -> 5 -> 6 -> 7 -> 8)
        for entry in entries:
            d = entry["codigo_numerico"]
            ancestor_descs: list[str] = []
            for prefix_len in (2, 4, 5, 6, 7):
                if len(d) > prefix_len and d[:prefix_len] in by_digits:
                    ancestor_descs.append(by_digits[d[:prefix_len]]["descricao"])
            ancestor_descs.append(entry["descricao"])
            entry["norm_hierarchy"] = normalize_search_text(" ".join(ancestor_descs))

        return {
            "data_atualizacao": str(raw_payload.get("Data_Ultima_Atualizacao_NCM") or ""),
            "ato_referencia": str(raw_payload.get("Ato") or ""),
            "entries": entries,
            "by_digits": by_digits,
            "fonte_modo": fonte_modo,
            "avisos": avisos,
        }

    def _build_request_headers(
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

    def _get_catalog(
        self,
        *,
        consulta_payload: dict[str, Any] | None = None,
        cookie_jar: dict[str, str] | None = None,
        raw_session_cookie: str | None = None,
        solution: str | None = None,
        prefetched_response: HttpResponse | None = None,
        bypass_cache: bool = False,
    ) -> tuple[dict[str, Any], bool]:
        cache_key = "siscomex:ncm:catalog:v2"
        if not bypass_cache:
            hit, cached = self._cache.get(cache_key)
            if hit:
                return cached, True

        active_jar = cookie_jar if cookie_jar is not None else {}
        avisos: list[str] = []
        try:
            if prefetched_response is not None:
                resp = prefetched_response
            else:
                req_params: dict[str, Any] = {"perfil": "PUBLICO"}
                if solution and not active_jar and not raw_session_cookie:
                    req_params["g-recaptcha-response"] = solution
                resp = self._transport.request(
                    SISCOMEX_PUBLIC_JSON_URL,
                    params=req_params,
                    headers=self._build_request_headers(
                        active_jar, raw_session_cookie, solution
                    ),
                    timeout_seconds=self._timeout,
                )
            active_jar.update(resp.cookies())
            self._captcha_store.inspect_response_for_captcha(
                resp,
                connector="siscomex",
                operation="search_ncm_catalog",
                consulta_payload=consulta_payload or {},
                resume_endpoint="/api/v1/siscomex/ncm",
                resume_method="GET",
                portal_url=SISCOMEX_PUBLIC_JSON_URL,
                cookie_jar=active_jar,
                raw_session_cookie=raw_session_cookie,
                transport=self._transport,
                timeout_seconds=self._timeout,
            )
            raw_json = resp.json()
            if not isinstance(raw_json, dict):
                raise UpstreamConnectorError("Formato inesperado no JSON público do Siscomex.")
            catalog = self._build_indexed_catalog(
                raw_json, "online_portal_unico_siscomex", avisos
            )
        except UpstreamConnectorError as exc:
            self._captcha_store.inspect_upstream_error_for_captcha(
                exc,
                connector="siscomex",
                operation="search_ncm_catalog",
                consulta_payload=consulta_payload or {},
                resume_endpoint="/api/v1/siscomex/ncm",
                resume_method="GET",
                portal_url=SISCOMEX_PUBLIC_JSON_URL,
                cookie_jar=active_jar,
                raw_session_cookie=raw_session_cookie,
                transport=self._transport,
                timeout_seconds=self._timeout,
            )
            avisos.append(
                f"Download online Siscomex indisponível ({exc.detail}); "
                "consultando base local oficial NCM/SH-2022."
            )
            seed_data = self._read_seed_payload()
            catalog = self._build_indexed_catalog(seed_data, "cache_local_oficial_ncm", avisos)

        self._cache.set(cache_key, catalog, ttl_seconds=self._catalog_ttl)
        return catalog, False

    def _resolve_sugestoes(
        self, raw_query: str, norm_query: str, digit_query: str
    ) -> tuple[list[dict[str, Any]], list[str], str]:
        """Resolve Classif technical/commercial suggestions & synonym expansions."""
        sugestoes: list[dict[str, Any]] = []
        expanded_terms: list[str] = []
        modo = "thesaurus_tecnico_classif"

        if SISCOMEX_CLASSIF_SUGESTOES_URL and norm_query:
            try:
                resp = self._transport.request(
                    SISCOMEX_CLASSIF_SUGESTOES_URL,
                    params={"descricao": raw_query, "perfil": "PUBLICO"},
                    timeout_seconds=self._timeout,
                )
                remote_items = resp.json()
                if isinstance(remote_items, list):
                    for item in remote_items[:10]:
                        if isinstance(item, dict) and item.get("codigo"):
                            sugestoes.append(
                                {
                                    "codigo_ncm": _format_ncm_code(str(item["codigo"])),
                                    "confianca": str(item.get("confianca") or "alta"),
                                    "perfil_mercadoria": str(item.get("descricao") or raw_query),
                                    "fundamentacao": "Portal Único Siscomex — Classif Sugestões (IA)",
                                    "carater": "orientativo_nao_vinculante",
                                }
                            )
                    if sugestoes:
                        modo = "online_classif_sugestoes"
            except UpstreamConnectorError:
                pass

        query_tokens = set(norm_query.split()) if norm_query else set()
        for rule in CLASSIF_TECHNICAL_THESAURUS:
            matched = False
            for trigger in rule["gatilhos"]:
                if " " in trigger:
                    if trigger in norm_query:
                        matched = True
                        break
                elif trigger in query_tokens:
                    matched = True
                    break

            if not matched and digit_query and len(digit_query) >= 4:
                for cand in rule["sugestoes"]:
                    if clean_digits(cand["codigo_ncm"]).startswith(digit_query):
                        matched = True
                        break

            if matched:
                for term in rule["termos_expandidos"]:
                    if term not in expanded_terms:
                        expanded_terms.append(term)
                for sug in rule["sugestoes"]:
                    if not any(s["codigo_ncm"] == sug["codigo_ncm"] for s in sugestoes):
                        sugestoes.append(
                            {
                                **sug,
                                "carater": "orientativo_nao_vinculante",
                            }
                        )

        return sugestoes, expanded_terms, modo

    def _search_decisoes(
        self,
        raw_query: str,
        norm_query: str,
        digit_query: str,
        expanded_terms: list[str],
        avisos: list[str],
        *,
        consulta_payload: dict[str, Any] | None = None,
        cookie_jar: dict[str, str] | None = None,
        raw_session_cookie: str | None = None,
        solution: str | None = None,
        prefetched_response: HttpResponse | None = None,
        bypass_cache: bool = False,
    ) -> tuple[list[dict[str, Any]], str]:
        """Search Receita Federal ``Soluções de Consulta`` (live SIJUT2 + verified seed)."""
        cache_key = f"siscomex:decisoes:{norm_query or digit_query}"
        if not bypass_cache:
            hit, cached = self._cache.get(cache_key)
            if hit:
                return cached["items"], cached["modo"]

        active_jar = cookie_jar if cookie_jar is not None else {}
        live_rulings: list[dict[str, Any]] = []
        modo = "base_verificada_solucoes_consulta_rfb"

        search_term = raw_query.strip()
        if search_term:
            try:
                if prefetched_response is not None:
                    resp = prefetched_response
                else:
                    sijut_params: dict[str, Any] = {
                        "tipoAtoFacet": "Solução de Consulta",
                        "termoBusca": search_term,
                        "optOrdem": "relevancia",
                    }
                    if solution and not active_jar and not raw_session_cookie:
                        sijut_params["g-recaptcha-response"] = solution
                    resp = self._transport.request(
                        RECEITA_SIJUT2_CONSULTA_URL,
                        params=sijut_params,
                        headers=self._build_request_headers(
                            active_jar, raw_session_cookie, solution
                        ),
                        timeout_seconds=self._timeout,
                    )
                active_jar.update(resp.cookies())
                self._captcha_store.inspect_response_for_captcha(
                    resp,
                    connector="siscomex",
                    operation="search_ncm_sijut2",
                    consulta_payload=consulta_payload or {},
                    resume_endpoint="/api/v1/siscomex/ncm",
                    resume_method="GET",
                    portal_url=RECEITA_SIJUT2_CONSULTA_URL,
                    cookie_jar=active_jar,
                    raw_session_cookie=raw_session_cookie,
                    transport=self._transport,
                    timeout_seconds=self._timeout,
                )
                live_rulings = parse_sijut2_solucoes_html(resp.text())
                if live_rulings:
                    modo = "online_receita_federal_sijut2"
            except UpstreamConnectorError as exc:
                self._captcha_store.inspect_upstream_error_for_captcha(
                    exc,
                    connector="siscomex",
                    operation="search_ncm_sijut2",
                    consulta_payload=consulta_payload or {},
                    resume_endpoint="/api/v1/siscomex/ncm",
                    resume_method="GET",
                    portal_url=RECEITA_SIJUT2_CONSULTA_URL,
                    cookie_jar=active_jar,
                    raw_session_cookie=raw_session_cookie,
                    transport=self._transport,
                    timeout_seconds=self._timeout,
                )
                avisos.append(
                    f"Consulta online SIJUT2/Decisões RFB indisponível ({exc.detail}); "
                    "utilizando decisões publicadas verificadas."
                )

        # Merge / enrich with verified published Soluções de Consulta matching query or NCM
        seen_keys = {(r["orgao"].lower(), str(r["numero"])) for r in live_rulings}
        query_tokens = [tok for tok in norm_query.split() if len(tok) >= 2]

        for seed_sc in OFFICIAL_SOLUCOES_CONSULTA_SEED:
            key = (seed_sc["orgao"].lower(), seed_sc["numero"])
            if key in seen_keys:
                continue
            haystack = normalize_search_text(
                f"{seed_sc['termos_indexados']} {seed_sc['ementa']} {seed_sc['codigo_ncm']}"
            )
            sc_digits = clean_digits(seed_sc["codigo_ncm"])

            matched = False
            if digit_query and len(digit_query) >= 4 and sc_digits.startswith(digit_query):
                matched = True
            elif norm_query and norm_query in haystack:
                matched = True
            elif query_tokens and all(tok in haystack for tok in query_tokens):
                matched = True
            elif any(exp in haystack for exp in expanded_terms):
                matched = True

            if matched:
                live_rulings.append(
                    {
                        "tipo_ato": seed_sc["tipo_ato"],
                        "numero": seed_sc["numero"],
                        "orgao": seed_sc["orgao"],
                        "data_publicacao": seed_sc["data_publicacao"],
                        "codigo_ncm": seed_sc["codigo_ncm"],
                        "ementa": seed_sc["ementa"],
                        "dispositivos_legais": seed_sc["dispositivos_legais"],
                        "fonte": "Receita Federal do Brasil — Soluções de Consulta (COSIT/COANA)",
                    }
                )

        self._cache.set(
            cache_key,
            {"items": live_rulings[:10], "modo": modo},
            ttl_seconds=3600.0,
        )
        return live_rulings[:10], modo

    def search_ncm(
        self,
        q: str | None = None,
        *,
        limite: int | None = None,
        somente_vigentes: bool | None = None,
        challenge_id: str | None = None,
        captcha_token: str | None = None,
        captcha_solution: str | None = None,
        session_cookie: str | None = None,
        consulta_payload: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Search NCM nomenclature + Soluções de Consulta (Decisões) + Sugestões."""
        explicit_lookup = dict(consulta_payload or {})
        if q is not None and str(q).strip():
            explicit_lookup["q"] = str(q).strip()
        if limite is not None:
            explicit_lookup["limite"] = limite
        if somente_vigentes is not None:
            explicit_lookup["somente_vigentes"] = somente_vigentes

        resolved: ResolvedCaptchaInput = self._captcha_store.resolve_inputs(
            challenge_id=challenge_id,
            captcha_token=captcha_token,
            captcha_solution=captcha_solution,
            session_cookie=session_cookie,
            consulta_payload=explicit_lookup or None,
        )

        effective_q = (
            q
            if (q is not None and str(q).strip())
            else resolved.consulta_payload.get("q")
        )
        effective_limite = (
            limite
            if limite is not None
            else (
                int(resolved.consulta_payload["limite"])
                if resolved.consulta_payload.get("limite") is not None
                else 10
            )
        )
        effective_vigentes = (
            somente_vigentes
            if somente_vigentes is not None
            else (
                bool(resolved.consulta_payload["somente_vigentes"])
                if resolved.consulta_payload.get("somente_vigentes") is not None
                else True
            )
        )

        raw_query = str(effective_q or "").strip()
        norm_query = normalize_search_text(raw_query)
        digit_query = clean_digits(raw_query)

        if len(norm_query) < 2 and len(digit_query) < 2:
            raise ConnectorValidationError(
                "Informe ao menos 2 caracteres em 'q' (descrição comercial/técnica ou código NCM).",
                extra={"field": "q"},
            )
        if not isinstance(effective_limite, int) or effective_limite < 1 or effective_limite > 50:
            raise ConnectorValidationError(
                "Parâmetro 'limite' deve ser um inteiro entre 1 e 50.",
                extra={"field": "limite"},
            )

        active_payload: dict[str, Any] = {
            "q": raw_query,
            "limite": effective_limite,
            "somente_vigentes": effective_vigentes,
        }
        cookie_jar = dict(resolved.cookie_jar)
        prefetched_catalog: HttpResponse | None = None
        prefetched_sijut: HttpResponse | None = None
        resuming_captcha = bool(resolved.challenge_id or resolved.solution)

        if resolved.challenge is not None and resolved.challenge.connector == "siscomex":
            extra_params: dict[str, Any] | None = None
            if resolved.challenge.operation == "search_ncm_catalog":
                extra_params = {"perfil": "PUBLICO"}
            elif resolved.challenge.operation == "search_ncm_sijut2":
                extra_params = {
                    "tipoAtoFacet": "Solução de Consulta",
                    "termoBusca": raw_query,
                    "optOrdem": "relevancia",
                }
            sub_resp, cookie_jar = self._captcha_store.submit_upstream_solution(
                resolved.challenge,
                resolved,
                transport=self._transport,
                timeout_seconds=self._timeout,
                extra_params=extra_params,
            )
            if resolved.challenge.operation == "search_ncm_catalog":
                try:
                    maybe_json = sub_resp.json()
                    if isinstance(maybe_json, dict) and isinstance(
                        maybe_json.get("Nomenclaturas"), list
                    ):
                        prefetched_catalog = sub_resp
                except UpstreamConnectorError:
                    prefetched_catalog = None
            elif resolved.challenge.operation == "search_ncm_sijut2":
                if parse_sijut2_solucoes_html(sub_resp.text()):
                    prefetched_sijut = sub_resp

        catalog, cache_hit = self._get_catalog(
            consulta_payload=active_payload,
            cookie_jar=cookie_jar,
            raw_session_cookie=resolved.session_cookie,
            solution=resolved.solution,
            prefetched_response=prefetched_catalog,
            bypass_cache=resuming_captcha and (
                resolved.challenge is None
                or resolved.challenge.operation == "search_ncm_catalog"
            ),
        )
        avisos = list(catalog["avisos"])
        by_digits: dict[str, dict[str, str]] = catalog["by_digits"]

        sugestoes, expanded_terms, sugestoes_modo = self._resolve_sugestoes(
            raw_query, norm_query, digit_query
        )
        decisoes, decisoes_modo = self._search_decisoes(
            raw_query,
            norm_query,
            digit_query,
            expanded_terms,
            avisos,
            consulta_payload=active_payload,
            cookie_jar=cookie_jar,
            raw_session_cookie=resolved.session_cookie,
            solution=resolved.solution,
            prefetched_response=prefetched_sijut,
            bypass_cache=resuming_captcha and (
                resolved.challenge is None
                or resolved.challenge.operation == "search_ncm_sijut2"
            ),
        )
        limite = effective_limite
        somente_vigentes = effective_vigentes

        # Build boost map from Sugestões and Decisões (Soluções de Consulta)
        suggested_ncm_boost: dict[str, tuple[float, str]] = {}
        for idx, sug in enumerate(sugestoes):
            sug_digits = clean_digits(sug.get("codigo_ncm"))
            if len(sug_digits) == 8:
                base_boost = 950.0 if sug.get("confianca") == "alta" else 700.0
                suggested_ncm_boost[sug_digits] = (
                    max(suggested_ncm_boost.get(sug_digits, (0.0, ""))[0], base_boost - idx * 25.0),
                    "sugestao_tecnica_classif",
                )

        for dec in decisoes:
            dec_digits = clean_digits(dec.get("codigo_ncm"))
            if len(dec_digits) == 8:
                prev_score = suggested_ncm_boost.get(dec_digits, (0.0, ""))[0]
                suggested_ncm_boost[dec_digits] = (
                    max(prev_score, 900.0) + 120.0,
                    "decisao_solucao_consulta",
                )

        tokens = [tok for tok in norm_query.split(" ") if len(tok) >= 2]
        expanded_token_sets = [
            [tok for tok in exp.split(" ") if len(tok) >= 3]
            for exp in expanded_terms
        ]

        scored: list[tuple[float, str, dict[str, Any]]] = []
        for entry in catalog["entries"]:
            if somente_vigentes and not entry["vigencia"]["vigente"]:
                continue

            code_digits = entry["codigo_numerico"]
            full_context_norm = entry["norm_hierarchy"]

            score = 0.0
            match_origin = "nomenclatura_direta"

            if digit_query:
                if code_digits == digit_query:
                    score += 1400.0
                elif code_digits.startswith(digit_query):
                    score += 850.0

            if norm_query:
                if norm_query in entry["norm_desc"]:
                    score += 500.0
                elif norm_query in full_context_norm:
                    score += 320.0

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
                        score += 340.0
                    elif context_hits == len(tokens):
                        score += 240.0
                    elif direct_hits > 0:
                        score += (direct_hits / len(tokens)) * 110.0

            if code_digits in suggested_ncm_boost:
                boost_val, boost_origin = suggested_ncm_boost[code_digits]
                if score == 0.0:
                    match_origin = boost_origin
                score += boost_val
            elif expanded_token_sets and score == 0.0:
                for exp_tokens in expanded_token_sets:
                    if exp_tokens and all(tok in full_context_norm for tok in exp_tokens):
                        score += 280.0
                        match_origin = "expansao_sinonimo_tecnico"
                        break

            if score <= 0:
                continue

            if len(code_digits) == 8:
                score += 380.0
            elif len(code_digits) == 6:
                score += 80.0

            scored.append((score, match_origin, entry))

        scored.sort(key=lambda item: (-item[0], item[2]["codigo_numerico"]))

        resultados: list[dict[str, Any]] = []
        for score, match_origin, entry in scored[:limite]:
            code_digits = entry["codigo_numerico"]
            cap = by_digits.get(code_digits[:2]) or {
                "codigo": code_digits[:2],
                "descricao": "Capítulo NCM",
            }
            pos = by_digits.get(code_digits[:4]) if len(code_digits) >= 4 else None
            sub = (
                by_digits.get(code_digits[:6])
                if len(code_digits) >= 6 and code_digits[:6] in by_digits
                else (by_digits.get(code_digits[:5]) if len(code_digits) >= 5 else None)
            )

            breadcrumb_parts = [f"Cap. {cap['codigo']}: {cap['descricao']}"]
            if pos and len(code_digits) > 4:
                breadcrumb_parts.append(f"Pos. {pos['codigo']}: {pos['descricao']}")
            if sub and len(code_digits) > 6:
                breadcrumb_parts.append(f"Subpos. {sub['codigo']}: {sub['descricao']}")
            breadcrumb_parts.append(f"{entry['codigo']} — {entry['descricao']}")

            resultados.append(
                {
                    "codigo": entry["codigo"],
                    "codigo_numerico": code_digits,
                    "nivel": "ncm_8_digitos" if len(code_digits) == 8 else "agrupamento_sh",
                    "descricao": entry["descricao"],
                    "descricao_completa": " > ".join(breadcrumb_parts),
                    "origem_correspondencia": match_origin,
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
            "fonte": (
                "Portal Único Siscomex — Classif (Nomenclatura NCM + Decisões "
                "COSIT/COANA + Sugestões Técnicas)"
            ),
            "fonte_modo": catalog["fonte_modo"],
            "fontes_consultadas": {
                "nomenclatura_ncm": catalog["fonte_modo"],
                "decisoes_solucoes_consulta": decisoes_modo,
                "sugestoes_classif": sugestoes_modo,
            },
            "cache_hit": cache_hit,
            "captcha_resumed": resuming_captcha,
            "data_atualizacao_tabela": catalog["data_atualizacao"],
            "ato_referencia": catalog["ato_referencia"],
            "termo_busca": raw_query,
            "termo_normalizado": norm_query,
            "termos_expandidos": expanded_terms,
            "somente_vigentes": somente_vigentes,
            "total_encontrado": len(scored),
            "resultados": resultados,
            "nomenclaturas": resultados,
            "total_decisoes": len(decisoes),
            "decisoes": decisoes,
            "total_sugestoes": len(sugestoes),
            "sugestoes": sugestoes,
            "avisos": avisos,
        }
