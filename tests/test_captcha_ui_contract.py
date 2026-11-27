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
CAPTCHA = (ROOT / "api" / "connectors" / "captcha.py").read_text(encoding="utf-8")
ERRORS = (ROOT / "api" / "connectors" / "errors.py").read_text(encoding="utf-8")
SERVER = (ROOT / "api" / "server.py").read_text(encoding="utf-8")
DOCS = (ROOT / "docs" / "api-reference.md").read_text(encoding="utf-8")

PT = json.loads((ROOT / "assets" / "i18n" / "pt-br.json").read_text(encoding="utf-8"))
EN = json.loads((ROOT / "assets" / "i18n" / "en.json").read_text(encoding="utf-8"))

DIALOG_IDS = (
    "captcha-dialog",
    "captcha-form",
    "captcha-image",
    "captcha-prompt",
    "captcha-expires",
    "captcha-token",
    "captcha-error",
    "captcha-submit",
    "captcha-cancel",
    "captcha-close",
)

# Ids of the old, heavy dialog: the popup is compact by contract.
REMOVED_DIALOG_IDS = (
    "captcha-provider",
    "captcha-site-key",
    "captcha-portal-link",
    "captcha-detail",
    "captcha-instructions",
    "captcha-session",
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
    "image_url",
    "image_data_url",
    # aliases produced by api/connectors/captcha.py + ConnectorCaptchaRequiredError
    "image_data_uri",
    "captcha_image",
    "image_base64",
    "image_mime_type",
    "image_endpoint",
    "challenge_text",
    "prompt_label",
)

GENERIC_FIELDS = {"status", "code", "detail", "data", "problem", "title", "type", "ok"}
# `raw.trim` is a String method on the sanitized input, not a backend field; `raw.text`
# and `raw.image` are the camelCase mirrors that keep sanitizeChallenge() idempotent.
NON_FIELDS = {"trim", "text", "image"}
# Product names and literal placeholders are intentionally identical in both languages.
UNTRANSLATED_OK: set[str] = set()


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
        # No remote frame is ever embedded and the portal page is never rendered.
        for tag in ("<iframe", "<frame", "<object", "<embed", "<script"):
            self.assertNotIn(tag, markup)
        self.assertIn('autocomplete="off"', markup)
        self.assertIn('role="alert"', markup)
        # Compact: one field, the challenge image and the two actions only.
        self.assertEqual(markup.count("<input"), 1, "the popup has a single answer field")
        for removed in REMOVED_DIALOG_IDS:
            self.assertNotIn(f'id="{removed}"', markup, f"#{removed} must not come back")
        for heavy in ("<dl", "<ol", "<table"):
            self.assertNotIn(heavy, markup, "no metadata/instructions blocks in the popup")
        self.assertIn('id="captcha-image"', markup)
        self.assertIn('referrerpolicy="no-referrer"', markup)
        markup_pixel = re.search(r'id="captcha-image"[^>]*src="(data:image/gif;base64,[^"]+)"', markup)
        self.assertIsNotNone(markup_pixel, "inert placeholder pixel in the markup")
        client_pixel = re.search(r"IMAGE_PLACEHOLDER = '([^']+)'", CLIENT)
        self.assertIsNotNone(client_pixel, "the module knows the inert placeholder")
        self.assertEqual(client_pixel.group(1), markup_pixel.group(1), "both use the same inert 1x1 pixel")
        self.assertIn('data-sensitive="true"', markup)

    def test_module_loads_after_i18n_and_before_main(self) -> None:
        i18n_at = HTML.index("assets/js/i18n.js")
        captcha_at = HTML.index("assets/js/captcha.js")
        main_at = HTML.index("assets/js/main.js")
        self.assertLess(i18n_at, captcha_at)
        self.assertLess(captcha_at, main_at)
        self.assertIn('<script src="assets/js/captcha.js" defer></script>', HTML)

    def test_backend_challenge_fields_are_consumed_by_the_client(self) -> None:
        emitted: set[str] = set()
        for source in (PROJUDI, CAPTCHA, ERRORS):
            emitted |= set(re.findall(r"\b(?:extra|payload)\[\s*[\"'](\w+)[\"']\s*\]", source))
            emitted |= set(re.findall(r"[\"'](\w+)[\"']\s*:", source))
        emitted &= set(CHALLENGE_FIELDS)
        self.assertTrue(emitted, "no challenge metadata found in the Python connectors")
        # Every image alias the backend can emit must be understood by sanitizeChallenge().
        self.assertTrue(
            {"image_data_uri", "captcha_image", "image_base64", "image_mime_type", "image_endpoint"}
            <= set(CHALLENGE_FIELDS)
        )
        for field in sorted(emitted):
            used = (
                f"raw.{field}" in CLIENT
                or f"field(raw, '{field}'" in CLIENT
                or f"'{field}'" in CLIENT
            )
            self.assertTrue(used, f"client ignores backend field {field!r}")

        # The client must not invent fields the backend never sends.
        read = set(re.findall(r"\braw\.(\w+)", CLIENT))
        read |= set(re.findall(r"field\(raw, '(\w+)'", CLIENT))
        self.assertTrue(read)
        self.assertEqual(read - set(CHALLENGE_FIELDS) - GENERIC_FIELDS - NON_FIELDS, set())

    def test_image_size_ceiling_matches_the_backend_mirror_limit(self) -> None:
        backend = re.search(r"MAX_CAPTCHA_IMAGE_BYTES\s*=\s*([\d_]+)", CAPTCHA)
        self.assertIsNotNone(backend, "the backend must cap the mirrored bitmap")
        limit = int(backend.group(1).replace("_", ""))
        client = re.search(r"MAX_IMAGE_DATA_LEN\s*=\s*(\d+)", CLIENT)
        self.assertIsNotNone(client, "the client must cap the data URI it renders")
        # base64 grows by 4/3 plus the `data:image/<mime>;base64,` prefix.
        self.assertGreaterEqual(int(client.group(1)), limit * 4 // 3, "a full-size bitmap would be dropped")

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
        # The challenge bitmap: strict base64 data URL or https on the TJPR hosts only.
        self.assertIn("function safeImageSource(raw)", CLIENT)
        self.assertIn("IMAGE_DATA_PATTERN", CLIENT)
        self.assertIn("var IMAGE_HOSTS = ['consulta.tjpr.jus.br', 'www.tjpr.jus.br', 'tjpr.jus.br'];", CLIENT)
        self.assertNotIn("image/svg", CLIENT, "scriptable SVG payloads are refused")
        # CSP parity: the dialog can only load images from those hosts (plus data:'self).
        csp = re.search(r'Content-Security-Policy" content="([^"]+)"', HTML)
        self.assertIsNotNone(csp)
        self.assertIn("img-src 'self' data:", csp.group(1))
        for host in ("consulta.tjpr.jus.br", "www.tjpr.jus.br", "tjpr.jus.br"):
            self.assertIn(f"https://{host}", csp.group(1))
        self.assertIn("frame-src 'none'", csp.group(1))
        allowlist = re.search(r"var ALLOWED_HOSTS = \[([\s\S]*?)\];", CLIENT)
        self.assertIsNotNone(allowlist)
        hosts = re.findall(r"'([^']+)'", allowlist.group(1))
        self.assertIn("consulta.tjpr.jus.br", hosts)
        self.assertIn("www.google.com", hosts)
        self.assertTrue(all("*" not in host for host in hosts), "no wildcard hosts in the allowlist")
        # There is no outbound link in the compact popup at all: nothing navigates away.
        self.assertNotIn("<a ", dialog_markup(), "the popup renders no anchor")
        self.assertNotIn("setAttribute('href'", CLIENT, "the module never builds a link")

    def test_popup_shows_the_bitmap_and_never_redirects_to_the_portal(self) -> None:
        markup = dialog_markup()
        # Image above the answer field, field label right below it.
        self.assertLess(markup.index('id="captcha-image"'), markup.index('id="captcha-prompt"'))
        self.assertLess(markup.index('id="captcha-prompt"'), markup.index('id="captcha-token"'))
        self.assertIn('placeholder="digite a resposta exibida na imagem"', markup)
        # The bitmap comes from the backend contract; no portal hint is ever rendered.
        for fragment in ("function imageOf(", "'captcha_image'", "'image_data_uri'", "'image_base64'"):
            self.assertIn(fragment, CLIENT)
        prompt = CLIENT.split("function promptOf")[1].split("function renderChallenge")[0]
        self.assertIn("captcha.imageUnavailable", prompt)
        self.assertNotIn("detail", prompt, "the backend detail line is not rendered in the popup")
        self.assertNotIn("portal", prompt.lower())
        for dictionary in (PT, EN):
            warning = dictionary["captcha.imageUnavailable"].lower()
            self.assertNotRegex(warning, r"portal|tjpr|https?://")
            self.assertRegex(warning, r"desafio|challenge")

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
        self.assertGreaterEqual(len(keys), 15)
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

    def test_temporary_penguin_slider_is_fully_removed(self) -> None:
        for leftover in ("penguin-font", "penguinFont"):
            self.assertNotIn(leftover, HTML, f"{leftover} was removed from the page")
            self.assertNotIn(leftover, CLIENT + MAIN, f"{leftover} was removed from the scripts")
        self.assertFalse(any(key.startswith("penguinFont.") for key in PT), "dictionary pruned")
        self.assertFalse(any(key.startswith("penguinFont.") for key in EN), "dictionary pruned")
        self.assertTrue((ROOT / "assets" / "js" / "penguin-font.js").exists() is False, "module deleted")

    def test_static_text_matches_the_portuguese_dictionary(self) -> None:
        pairs = re.findall(r'data-i18n="(captcha\.[^"]+)"[^>]*>([^<]*)<', dialog_markup())
        self.assertTrue(pairs)
        for key, body in pairs:
            self.assertEqual(body.strip(), PT[key].strip(), f"static text for {key} drifted")


if __name__ == "__main__":
    unittest.main()
