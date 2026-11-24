#!/usr/bin/env python3
"""Optional zero-dependency API for the terminal portfolio.

Serves the static site and two demo endpoints. The front end falls back to
in-browser simulation when this server is not available (e.g. GitHub Pages).
"""

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import mimetypes
import os
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8000"))


def extract_payload():
    """Fictitious ETL output: raw value -> normalized value."""
    return {
        "mode": "python-api",
        "pipeline": ["fetch", "parse", "normalize", "validate"],
        "records": [
            {"id": "demo-001", "field": "export_value", "raw": "1.234,56", "normalized": 1234.56, "valid": True},
            {"id": "demo-002", "field": "exchange_rate", "raw": "5,12", "normalized": 5.12, "valid": True},
        ],
        "checks": ["schema_ok", "duplicates_removed", "currency_normalized"],
    }


def invoice_payload():
    """Fictitious fiscal/payment gateway response."""
    return {
        "mode": "python-api",
        "http_status": 200,
        "payload": {
            "invoice_key": "DEMO-3522-0000-0000",
            "document_type": "NF-e",
            "status": "parsed",
            "totals_match": True,
        },
        "checks": ["xml_well_formed", "issuer_present", "tax_fields_validated"],
    }


class PortfolioHandler(BaseHTTPRequestHandler):
    server_version = "EronTerminal/1.0"

    def _send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _serve_static(self, path):
        relative = path.lstrip("/") or "index.html"
        target = (ROOT / relative).resolve()
        try:
            parts = target.relative_to(ROOT).parts
        except ValueError:
            self._send_json({"error": "forbidden"}, 403)
            return
        if any(part.startswith(".") for part in parts) or not target.is_file():
            self._send_json({"error": "not found"}, 404)
            return

        body = target.read_bytes()
        content_type = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        if content_type.startswith("text/") or content_type in {
            "application/javascript",
            "application/json",
        }:
            content_type += "; charset=utf-8"
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        path = unquote(urlparse(self.path).path).rstrip("/") or "/"
        if path == "/api-status.json":
            # Same file name exists for static hosting; here it reports the live API.
            self._send_json({"ok": True, "service": "python-api"})
        elif path == "/api/v1/build":
            # Exposed so CI can compare the deployed SHA with Pages build.txt.
            self._send_json({"sha": os.environ.get("VERCEL_GIT_COMMIT_SHA") or os.environ.get("GITHUB_SHA") or "local"})
        elif path == "/api/v1/health":
            self._send_json({"ok": True, "service": "eron-terminal-portfolio"})
        elif path == "/api/v1/extract":
            self._send_json(extract_payload())
        elif path.startswith("/api/"):
            self._send_json({"error": "not found"}, 404)
        else:
            self._serve_static(path)

    def do_POST(self):
        path = unquote(urlparse(self.path).path).rstrip("/") or "/"
        if path == "/api/v1/invoices/parse":
            length = int(self.headers.get("Content-Length") or 0)
            if length:
                self.rfile.read(min(length, 64_000))  # body is optional in the demo
            self._send_json(invoice_payload())
        else:
            self._send_json({"error": "not found"}, 404)


def main():
    server = ThreadingHTTPServer((HOST, PORT), PortfolioHandler)
    print(f"Serving {ROOT} on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()


if __name__ == "__main__":
    main()
