#!/usr/bin/env python3
"""Controlled diagnostic for the PROJUDI TJPR connector.

Runs the real session flow (GET root -> frame -> form -> POST search) against
``https://consulta.tjpr.jus.br/projudi_consulta/`` and prints a LGPD-safe,
structural evidence report: HTTP status, final URL after redirects, session
cookie presence, whether the dynamic ``_tj`` token was found, whether a
reCAPTCHA ``sitekey``/widget is present, HTML size, whether ``resultTable``
was found and how many ``<tr>`` rows were detected, and the parsed
``total_processos``.

Privacy / LGPD:
- Never prints the full CPF or captcha tokens.
- The CPF is only used as an opaque query payload and is masked in the output.

Requires outbound network access to consulta.tjpr.jus.br. In a sandbox without
that access the script reports the network error clearly so it can be run in
an environment that has it.

Usage:
    python3 scripts/diagnose_projudi.py [cpf]

If ``cpf`` is omitted a structural probe (form/resultTable detection on the
landing page) is run without submitting a search.
"""

from __future__ import annotations

import logging
import os
import sys

# Enable the connector's opt-in diagnostic logging.
os.environ.setdefault("PROJUDI_DIAGNOSTIC_LOGS", "1")

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.connectors.cache import ConnectorTTLCache
from api.connectors.captcha import CaptchaChallengeStore
from api.connectors.errors import ConnectorError
from api.connectors.http_client import UrllibHttpTransport
from api.connectors.projudi import ProjudiConnectorService, _html_diagnostics_helper


def _mask(cpf: str) -> str:
    digits = "".join(ch for ch in cpf if ch.isdigit())
    if len(digits) != 11:
        return "***"
    return f"***.{digits[3:6]}.{digits[6:9]}-**"


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    cpf = sys.argv[1].strip() if len(sys.argv) > 1 else ""

    transport = UrllibHttpTransport(default_timeout_seconds=8.0)
    svc = ProjudiConnectorService(
        transport=transport,
        cache=ConnectorTTLCache(default_ttl_seconds=300.0),
        captcha_store=CaptchaChallengeStore(cache=ConnectorTTLCache()),
        timeout_seconds=8.0,
    )

    print("=== PROJUDI TJPR diagnostic ===")
    print(f"cpf_mascarado: {_mask(cpf) if cpf else '(nenhum informado)'}")

    if not cpf:
        # Structural probe: bootstrap only, no search submission.
        try:
            session = svc._bootstrap_session(None)
            print("bootstrap_ok: True")
            print(f"form_url: {session['form_url']}")
            print(f"action_url: {session['action_url']}")
            print(f"provider: {session['provider']}")
            print(f"site_key_present: {bool(session['site_key'])}")
            print(f"requires_captcha: {session['requires_captcha']}")
            print(
                "session_token_fields: "
                f"{[k for k in session['form_fields'] if k in svc._SESSION_TOKEN_FIELDS]}"
            )
            print("probe concluido sem submeter pesquisa.")
            return 0
        except ConnectorError as exc:
            print(f"bootstrap_falhou: {exc.detail} (status={exc.status_code})")
            return 1

    # Full flow with a real search submission.
    try:
        result = svc.consulta_por_cpf(cpf, tribunal="TJPR")
    except ConnectorError as exc:
        print(f"consulta_falhou: {exc.detail} (status={exc.status_code})")
        print(f"extra: {exc.extra}")
        return 1

    print("consulta_ok: True")
    print(f"modo_execucao: {result.get('modo_execucao')}")
    print(f"total_processos: {result.get('total_processos')}")
    print(f"total_navigator: {result.get('total_navigator')}")
    html = result.get("raw_html", "")
    diag = _html_diagnostics_helper(html)
    print(f"html_diagnostics: {diag}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
