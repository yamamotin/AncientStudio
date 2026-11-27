"""Contract tests for the CAPTCHA_REQUIRED popup (frontend) against the Python API.

The popup only works if three things stay in sync: the 422 problem body the connectors
emit, the field names ``assets/js/captcha.js`` reads, and the query/body parameters the
stdlib server accepts on the resend. These tests fail on any silent rename.
"""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLIENT = (ROOT / "assets" / "js" / "captcha.js").read_text(encoding="utf-8")
MAIN = (ROOT / "assets" / "js" / "main.js").read_text(encoding="utf-8")
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
PROJUDI = (ROOT / "api" / "connectors" / "projudi.py").read_text(encoding="utf-8")
ERRORS = (ROOT / "api" / "connectors" / "errors.py").read_text(encoding="utf-8")
SERVER = (ROOT / "api" / "server.py").read_text(encoding="utf-8")
DOCS = (ROOT / "docs" / "api-reference.md").read_text(encoding="utf-8")

PT = json.loads((ROOT / "assets" / "i18n" / "pt-br.json").read_text(encoding="utf-8"))
EN = json.loads((ROOT / "assets" / "i18n" / "en.json").read_text(encoding="utf-8"))

DIALOG_IDS = (
    "captcha-dialog",
    "captcha-form",
    "captcha-provider",
    "captcha-site-key",
    "captcha-portal-link",
    "captcha-expires",
    "captcha-detail",
    "captcha-instructions",
    "captcha-token",
    "captcha-session",
    "captcha-error",
    "captcha-submit",
    "captcha-cancel",
    "captcha-close",
)

# Fields the connectors are allowed to put in the 422 body; the client must consume them.
CHALLENGE_FIELDS = (
    "site_key",
    "portal_url",
    "form_url",
    "challenge_url",
    "recaptcha_callback",
    "instructions",
    "expires_at",
    "challenge_id",
    "provider",
)

GENERIC_FIELDS = {"status", "code", "detail", "data", "problem", "title", "type", "ok"}
# `raw.trim` is a String method on the sanitized input, not a backend field.
NON_FIELDS = {"trim"}
# Product names and literal placeholders are intentionally identical in both languages.
UNTRANSLATED_OK = {
    "captcha.sessionPlaceholder",
    "captcha.providerHcaptcha",
    "captcha.providerRecaptcha",
}


def dialog_markup() -> str:
    start = HTML.index('<dialog id="captcha-dialog"')
    return HTML[start : HTML.index("</dialog>", start)]


class CaptchaPopupContractTestCase(unittest.TestCase):
    def test_dialog_is_marked_up_after_main_with_every_wired_id(self) -> None:
        markup = dialog_markup()
        self.assertLess(HTML.index("</main>"), HTML.index('<dialog id="captcha-dialog"'))
        for element_id in DIALOG_IDS:
            self.assertIn(f'id="{element_id}"', markup, f"#{element_id} missing from the dialog")
        self.assertIn("novalidate", markup)
        # No remote frame is ever embedded: the portal opens in a new tab instead.
        for tag in ("<iframe", "<frame", "<object", "<embed", "<script"):
            self.assertNotIn(tag, markup)
        self.assertIn('autocomplete="off"', markup)
        self.assertIn('type="password"', markup, "session cookies are masked")
        self.assertIn('role="alert"', markup)

    def test_module_loads_after_i18n_and_before_main(self) -> None:
        i18n_at = HTML.index("assets/js/i18n.js")
        captcha_at = HTML.index("assets/js/captcha.js")
        main_at = HTML.index("assets/js/main.js")
        self.assertLess(i18n_at, captcha_at)
        self.assertLess(captcha_at, main_at)
        self.assertIn('<script src="assets/js/captcha.js" defer></script>', HTML)

    def test_backend_challenge_fields_are_consumed_by_the_client(self) -> None:
        emitted = set(re.findall(r"\b(?:extra|payload)\[\s*[\"'](\w+)[\"']\s*\]", PROJUDI))
        emitted |= set(re.findall(r"[\"'](\w+)[\"']\s*:", PROJUDI))
        emitted &= set(CHALLENGE_FIELDS)
        self.assertTrue(emitted, "no challenge metadata found in the Projudi connector")
        for field in sorted(emitted):
            used = f"raw.{field}" in CLIENT or f"field(raw, '{field}'" in CLIENT
            self.assertTrue(used, f"client ignores backend field {field!r}")

        # The client must not invent fields the backend never sends.
        read = set(re.findall(r"\braw\.(\w+)", CLIENT))
        read |= set(re.findall(r"field\(raw, '(\w+)'", CLIENT))
        self.assertTrue(read)
        self.assertEqual(read - set(CHALLENGE_FIELDS) - GENERIC_FIELDS - NON_FIELDS, set())

    def test_error_code_and_status_match_the_python_exception(self) -> None:
        self.assertIn('code = "CAPTCHA_REQUIRED"', ERRORS)
        self.assertIn("status_code = 422", ERRORS)
        self.assertIn("class ConnectorCaptchaRequiredError", ERRORS)
        # The client tests both status and code, in a case-insensitive way.
        self.assertIn("status === 422", CLIENT)
        self.assertIn("CAPTCHA_REQUIRED", CLIENT)
        self.assertIn("CAPTCHA_REQUIRED", DOCS)

    def test_resend_parameters_match_every_projudi_endpoint(self) -> None:
        resolver = CLIENT.split("function buildResolution")[1].split("function providerLabel")[0]
        for param in ("captcha_token", "session_cookie"):
            self.assertTrue(param in resolver, f"buildResolution never sends {param}")
            self.assertEqual(
                SERVER.count(f'"{param}"') >= 2,
                True,
                f"server does not read {param!r} on every projudi route",
            )
            self.assertTrue(param in PROJUDI, f"connector never accepts {param!r}")
        # The payload keys the client builds are exactly the ones the server reads.
        payload_keys = set(re.findall(r"payload\.(\w+) =", CLIENT))
        payload_keys |= set(re.findall(r"var payload = \{ (\w+):", CLIENT))
        self.assertIn("captcha_token", payload_keys)
        self.assertIn("session_cookie", payload_keys)
        self.assertTrue(payload_keys <= {"captcha_token", "session_cookie", "challenge_id"})

    def test_only_safe_urls_are_used(self) -> None:
        self.assertTrue("parsed.protocol !== 'https:'" in CLIENT, "https is enforced")
        self.assertTrue("parsed.username || parsed.password" in CLIENT, "credentials in URLs are rejected")
        self.assertNotIn("http://", CLIENT, "the popup must never accept plain http URLs")
        allowlist = re.search(r"var ALLOWED_HOSTS = \[([\s\S]*?)\];", CLIENT)
        self.assertIsNotNone(allowlist)
        hosts = re.findall(r"'([^']+)'", allowlist.group(1))
        self.assertIn("consulta.tjpr.jus.br", hosts)
        self.assertIn("www.google.com", hosts)
        self.assertTrue(all("*" not in host for host in hosts), "no wildcard hosts in the allowlist")
        self.assertTrue("noopener noreferrer" in CLIENT, "portal links are opened safely")

    def test_no_html_injection_sink_and_state_is_wiped(self) -> None:
        for sink in (".innerHTML", "insertAdjacentHTML", "outerHTML", "document.write", "eval("):
            self.assertNotIn(sink, CLIENT)
        self.assertTrue("textContent" in CLIENT, "text is rendered as text")
        self.assertTrue("function wipeFields()" in CLIENT, "fields are wiped on close")
        self.assertTrue("function clearRendered()" in CLIENT, "challenge metadata is released")
        self.assertTrue("pagehide" in CLIENT, "state is wiped when the page goes away")
        self.assertTrue("removeAttribute('aria-invalid')" in CLIENT)

    def test_main_resends_the_original_call_and_reports_cancel_and_expiry(self) -> None:
        for fragment in (
            "TP.captcha.isRequired(error)",
            "TP.captcha.request(challenge)",
            "liveCall(resolution)",
            "renderResponse(retried.data, retried, metaId, outputId)",
        ):
            self.assertTrue(fragment in MAIN, f"main.js is missing: {fragment}")
        self.assertNotIn("while (", MAIN.split("function resolveCaptchaAndResend")[1].split("function bindConnectorAction")[0])
        # The token is never echoed back into the visible route label.
        self.assertIn("function redactSecrets(text)", MAIN)
        self.assertIn("redactSecrets(label)", MAIN)

    def test_copy_is_translated_in_both_locales(self) -> None:
        keys = {key for key in PT if key.startswith("captcha.")}
        self.assertGreaterEqual(len(keys), 20)
        self.assertEqual(keys, {key for key in EN if key.startswith("captcha.")})
        for key in keys:
            self.assertTrue(PT[key].strip(), f"{key} is empty in pt-br")
            self.assertTrue(EN[key].strip(), f"{key} is empty in en")
            if key not in UNTRANSLATED_OK:
                self.assertNotEqual(PT[key], EN[key], f"{key} was not translated")
        # Every key referenced by the module exists in both dictionaries.
        for key in set(re.findall(r"t\('(captcha\.\w+)'", CLIENT)) | set(
            re.findall(r"data-i18n=\"(captcha\.\w+)\"", HTML)
        ):
            self.assertIn(key, PT, f"missing pt-br key {key}")
            self.assertIn(key, EN, f"missing en key {key}")

    def test_static_text_matches_the_portuguese_dictionary(self) -> None:
        pairs = re.findall(r'data-i18n="(captcha\.[^"]+)"[^>]*>([^<]*)<', dialog_markup())
        self.assertTrue(pairs)
        for key, body in pairs:
            self.assertEqual(body.strip(), PT[key].strip(), f"static text for {key} drifted")


if __name__ == "__main__":
    unittest.main()
