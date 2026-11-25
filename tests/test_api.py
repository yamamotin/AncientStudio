import json
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from api import server


class PortfolioBackendTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.httpd = server.create_server("127.0.0.1", 0)
        cls.port = cls.httpd.server_address[1]
        cls.base_url = f"http://127.0.0.1:{cls.port}"
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.thread.join(timeout=2)

    def _request_json(self, path: str, method: str = "GET", payload=None):
        data = None
        headers = {"Accept": "application/json"}
        if payload is not None:
            data = json.dumps(payload).encode("utf-8")
            headers["Content-Type"] = "application/json"
        req = Request(f"{self.base_url}{path}", data=data, headers=headers, method=method)
        try:
            with urlopen(req, timeout=5) as resp:
                return resp.status, json.loads(resp.read().decode("utf-8"))
        except HTTPError as err:
            return err.code, json.loads(err.read().decode("utf-8"))

    def test_health_and_api_status(self):
        status_code, status_body = self._request_json("/api-status.json")
        self.assertEqual(status_code, 200)
        self.assertTrue(status_body["ok"])
        self.assertEqual(status_body["service"], "python-api")

        health_code, health_body = self._request_json("/api/v1/health")
        self.assertEqual(health_code, 200)
        self.assertTrue(health_body["ok"])
        self.assertTrue(health_body["ascii_engine_bundle"])

    def test_etl_extract_normalization_and_deduplication(self):
        code, body = self._request_json(
            "/api/v1/extract",
            method="POST",
            payload={
                "records": [
                    {"id": "exp-10", "field": "fob_brl", "raw": "R$ 12.500,75"},
                    {"id": "exp-10", "field": "fob_brl", "raw": "R$ 12.500,75"},
                    {"id": "exp-11", "field": "usd_rate", "raw": "5,25"},
                ]
            },
        )
        self.assertEqual(code, 200)
        self.assertEqual(body["duplicates_removed"], 1)
        self.assertEqual(len(body["records"]), 2)
        self.assertAlmostEqual(body["records"][0]["normalized"], 12500.75)
        self.assertAlmostEqual(body["records"][1]["normalized"], 5.25)

    def test_invoice_webhook_idempotency_and_validation(self):
        code1, first = self._request_json(
            "/api/v1/invoices/parse",
            method="POST",
            payload={"invoice_key": "NFE-3526-0001-9999", "event_id": "evt-unit-001"},
        )
        self.assertEqual(code1, 200)
        self.assertFalse(first["idempotent_replay"])

        code2, second = self._request_json(
            "/api/v1/invoices/parse",
            method="POST",
            payload={"invoice_key": "NFE-3526-0001-9999", "event_id": "evt-unit-001"},
        )
        self.assertEqual(code2, 200)
        self.assertTrue(second["idempotent_replay"])
        self.assertIn("idempotency_dedup_hit", second["checks"])

        code_bad, bad = self._request_json(
            "/api/v1/invoices/parse",
            method="POST",
            payload={"invoice_key": "SHORT"},
        )
        self.assertEqual(code_bad, 422)
        self.assertEqual(bad["payload"]["status"], "invalid_key")

    def test_pipeline_run_success_and_forced_failure(self):
        code_ok, ok_body = self._request_json(
            "/api/v1/pipeline/run", method="POST", payload={"force_failure": False}
        )
        self.assertEqual(code_ok, 200)
        self.assertTrue(ok_body["ok"])
        self.assertEqual(len(ok_body["stages"]), 4)

        code_fail, fail_body = self._request_json(
            "/api/v1/pipeline/run", method="POST", payload={"force_failure": True}
        )
        self.assertEqual(code_fail, 200)
        self.assertFalse(fail_body["ok"])
        self.assertEqual(fail_body["stages"][0]["status"], "failed")

    def test_static_serving_and_dotfile_protection(self):
        req = Request(f"{self.base_url}/index.html")
        with urlopen(req, timeout=5) as resp:
            html = resp.read().decode("utf-8")
            self.assertEqual(resp.status, 200)
            self.assertIn("[ ASCII REALMS // SCENE ]", html)
            self.assertIn("[ STACK // NEOFETCH ]", html)
            self.assertIn("assets/js/neofetch.js", html)

        req_bundle = Request(f"{self.base_url}/assets/js/ascii-engine.bundle.js", method="HEAD")
        with urlopen(req_bundle, timeout=5) as resp_b:
            self.assertEqual(resp_b.status, 200)
            self.assertGreater(int(resp_b.headers.get("Content-Length", "0")), 100000)

        req_wasm = Request(f"{self.base_url}/assets/draco/draco_decoder.wasm", method="HEAD")
        with urlopen(req_wasm, timeout=5) as resp_wasm:
            self.assertEqual(resp_wasm.status, 200)
            self.assertEqual(resp_wasm.headers.get("Content-Type"), "application/wasm")
            self.assertGreater(int(resp_wasm.headers.get("Content-Length", "0")), 100000)

        req_glb = Request(f"{self.base_url}/assets/models/cena_completa.glb", method="HEAD")
        with urlopen(req_glb, timeout=5) as resp_glb:
            self.assertEqual(resp_glb.status, 200)
            self.assertEqual(resp_glb.headers.get("Content-Type"), "model/gltf-binary")
            self.assertGreater(int(resp_glb.headers.get("Content-Length", "0")), 1000000)

        code_dot, _ = self._request_json("/.gitignore")
        self.assertEqual(code_dot, 404)

    def test_logs_endpoint_records_requests(self):
        code, body = self._request_json("/api/v1/logs")
        self.assertEqual(code, 200)
        self.assertGreater(body["counters"]["total"], 0)
        self.assertTrue(len(body["events"]) > 0)


if __name__ == "__main__":
    unittest.main()
