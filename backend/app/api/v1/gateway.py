"""API Gateway / BFF and Fiscal Gateway routes (HMAC + unified idempotency + EventBus)."""

from __future__ import annotations

import platform

from app.api.deps import (
    get_cache_backend,
    get_correlation_id,
    get_event_bus,
    get_gateway_service,
    get_job_queue,
    get_worker_registry,
)
from app.cache import CacheBackend
from app.core.config import Settings, get_settings
from app.core.security import fingerprint, sha256_hex, verify_hmac_signature
from app.domains import DOMAIN_MODULES
from app.domains.gateway import (
    CacheTelemetryOut,
    GatewayCapabilitiesOut,
    GatewayService,
    InvoiceOut,
)
from app.queue import DomainEvent, EventBus, JobQueue
from app.workers import WorkerRegistry
from fastapi import APIRouter, Depends, Header, Request, Response
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/gateway", tags=["gateway"])


def _invoice_response(result: InvoiceOut, replayed: bool) -> JSONResponse:
    return JSONResponse(
        result.model_dump(mode="json"),
        status_code=200 if replayed else 201,
        headers={
            "Idempotent-Replay": "true" if replayed else "false",
            "Location": f"/api/v1/gateway/invoices/{result.invoice_id}",
        },
    )


async def _emit_invoice_accepted(
    event_bus: EventBus,
    result: InvoiceOut,
    correlation_id: str,
) -> None:
    await event_bus.publish(
        DomainEvent(
            event_type="gateway.invoice.accepted",
            source="gateway",
            correlation_id=correlation_id,
            payload=result.model_dump(mode="json"),
        )
    )


@router.get(
    "/capabilities",
    response_model=GatewayCapabilitiesOut,
    summary="BFF architecture, active domains, cache, queue, and worker telemetry",
)
def gateway_capabilities(
    request: Request,
    settings: Settings = Depends(get_settings),
    cache: CacheBackend = Depends(get_cache_backend),
    queue: JobQueue = Depends(get_job_queue),
    workers: WorkerRegistry = Depends(get_worker_registry),
) -> GatewayCapabilitiesOut:
    stats = cache.stats()
    runner = getattr(request.app.state, "worker_runner", None)
    cache_kind = getattr(cache, "backend_name", "memory")
    queue_kind = getattr(queue, "backend_name", "memory")

    return GatewayCapabilitiesOut(
        service="ancientstudio-api",
        version=settings.api_version,
        environment=settings.environment,
        python_runtime=platform.python_version(),
        architecture="modular-monolith-event-driven",
        cache_backend=cache_kind,
        queue_backend=queue_kind,
        workers_running=bool(runner and runner.is_running),
        domains=list(DOMAIN_MODULES),
        worker_topics=workers.topics(),
        cache=CacheTelemetryOut(
            backend=cache_kind,
            hits=stats.hits,
            misses=stats.misses,
            sets=stats.sets,
            evictions=stats.evictions,
            size=stats.size,
        ),
        queue=queue.metrics(),
    )


@router.post(
    "/invoices/parse",
    summary="Validate and accept a fiscal document",
    responses={
        201: {"description": "Created"},
        200: {"description": "Idempotent replay"},
    },
)
async def parse_invoice(
    request: Request,
    x_signature: str = Header(..., alias="X-Signature"),
    x_timestamp: str = Header(..., alias="X-Timestamp"),
    idempotency_key: str = Header(
        ..., alias="Idempotency-Key", min_length=8, max_length=120
    ),
    settings: Settings = Depends(get_settings),
    service: GatewayService = Depends(get_gateway_service),
    event_bus: EventBus = Depends(get_event_bus),
    correlation_id: str = Depends(get_correlation_id),
) -> Response:
    raw = await request.body()
    verify_hmac_signature(
        body=raw,
        timestamp=x_timestamp,
        signature=x_signature,
        secret=settings.gateway_hmac_secret,
        max_age_seconds=settings.signature_max_age_seconds,
    )
    payload = service.validate_raw_invoice(raw)
    result, replayed = service.parse_invoice(
        payload,
        idempotency_key=idempotency_key,
        fingerprint=fingerprint(sha256_hex(raw)),
    )
    if not replayed:
        await _emit_invoice_accepted(event_bus, result, correlation_id)
    return _invoice_response(result, replayed)


@router.post(
    "/invoices/submit",
    summary="Browser-safe submission: server signs the payload before /parse",
    responses={
        201: {"description": "Created"},
        200: {"description": "Idempotent replay"},
    },
)
async def submit_invoice(
    request: Request,
    settings: Settings = Depends(get_settings),
    service: GatewayService = Depends(get_gateway_service),
    event_bus: EventBus = Depends(get_event_bus),
    correlation_id: str = Depends(get_correlation_id),
) -> Response:
    raw = await request.body()
    result, replayed = service.submit_browser_invoice(
        raw,
        secret=settings.gateway_hmac_secret,
        max_age_seconds=settings.signature_max_age_seconds,
    )
    if not replayed:
        await _emit_invoice_accepted(event_bus, result, correlation_id)
    return _invoice_response(result, replayed)
