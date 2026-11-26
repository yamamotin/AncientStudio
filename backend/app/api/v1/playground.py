"""Portfolio compatibility routes (/extract, /invoices/parse, /pipeline/run, /logs)."""

from __future__ import annotations

from typing import Any

from api.server import (
    RECENT_LOGS,
    REQUEST_COUNTERS,
    extract_payload,
    invoice_payload,
    pipeline_run_payload,
)
from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

router = APIRouter(tags=["playground-utilities"])


@router.get("/extract", summary="Default ETL currency normalization & deduplication")
def get_extract_demo() -> dict[str, Any]:
    return extract_payload()


@router.post("/extract", summary="Normalize & deduplicate custom ETL records")
def post_extract_demo(
    body: dict[str, Any] = Body(default_factory=dict),
) -> dict[str, Any]:
    return extract_payload(body)


@router.post("/invoices/parse", summary="Idempotent fiscal webhook validation")
def parse_playground_invoice(
    body: dict[str, Any] = Body(default_factory=dict),
) -> JSONResponse:
    result = invoice_payload(body)
    return JSONResponse(result, status_code=int(result["http_status"]))


@router.post("/pipeline/run", summary="Run lightweight portfolio CI/CD check")
def run_playground_pipeline(
    body: dict[str, Any] = Body(default_factory=dict),
) -> dict[str, Any]:
    return pipeline_run_payload(body)


@router.get("/logs", summary="Recent portfolio API request diagnostics")
def get_playground_logs() -> dict[str, Any]:
    return {
        "mode": "fastapi-backend",
        "counters": dict(REQUEST_COUNTERS),
        "events": list(RECENT_LOGS)[:20],
    }
