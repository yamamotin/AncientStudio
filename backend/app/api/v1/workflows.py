"""Authenticated n8n workflow catalog, trigger, callback, and status routes."""

from __future__ import annotations

from app.api.deps import (
    get_correlation_id,
    get_n8n_client,
    get_n8n_service,
    require_workflow_token,
)
from app.core.config import Settings, get_settings
from app.domains.automation_n8n import (
    N8NAutomationService,
    N8NClient,
    WebhookCallbackOut,
    WorkflowCatalogItem,
    WorkflowRunIn,
    WorkflowRunOut,
    WorkflowStatusOut,
)
from fastapi import APIRouter, Depends, Header, Request, Response, status
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/workflows", tags=["workflows"])


@router.get(
    "/catalog",
    response_model=list[WorkflowCatalogItem],
    dependencies=[Depends(require_workflow_token)],
    summary="List versioned n8n workflow blueprints discovered on disk",
)
def list_workflow_catalog(
    service: N8NAutomationService = Depends(get_n8n_service),
) -> list[WorkflowCatalogItem]:
    return service.list_catalog()


@router.post(
    "/{workflow_id}/run",
    response_model=WorkflowRunOut,
    status_code=status.HTTP_202_ACCEPTED,
    dependencies=[Depends(require_workflow_token)],
    summary="Trigger a real n8n webhook",
)
async def run_workflow(
    workflow_id: str,
    body: WorkflowRunIn,
    request_id: str = Depends(get_correlation_id),
    client: N8NClient = Depends(get_n8n_client),
) -> WorkflowRunOut:
    payload = dict(body.payload)
    payload.setdefault("request_id", body.request_id or request_id)
    return await client.trigger(workflow_id, payload, request_id)


@router.post(
    "/callbacks/{workflow_id}",
    response_model=WebhookCallbackOut,
    summary="Receive an HMAC-signed n8n execution callback",
    responses={
        202: {"description": "Callback accepted"},
        200: {"description": "Idempotent callback replay"},
    },
)
async def receive_workflow_callback(
    workflow_id: str,
    request: Request,
    x_n8n_signature: str = Header(..., alias="X-N8N-Signature"),
    x_timestamp: str = Header(..., alias="X-Timestamp"),
    idempotency_key: str | None = Header(
        default=None, alias="Idempotency-Key", min_length=8, max_length=120
    ),
    correlation_id: str = Depends(get_correlation_id),
    settings: Settings = Depends(get_settings),
    service: N8NAutomationService = Depends(get_n8n_service),
) -> Response:
    raw = await request.body()
    ack, replayed = await service.process_webhook_callback(
        workflow_id,
        raw,
        signature=x_n8n_signature,
        timestamp=x_timestamp,
        secret=settings.n8n_webhook_token,
        max_age_seconds=settings.signature_max_age_seconds,
        correlation_id=correlation_id,
        idempotency_key=idempotency_key,
    )
    return JSONResponse(
        ack.model_dump(mode="json"),
        status_code=status.HTTP_200_OK if replayed else status.HTTP_202_ACCEPTED,
        headers={"Idempotent-Replay": "true" if replayed else "false"},
    )


@router.get(
    "/runs/{execution_id}",
    response_model=WorkflowStatusOut,
    dependencies=[Depends(require_workflow_token)],
    summary="Query an n8n execution",
)
async def workflow_status(
    execution_id: str,
    service: N8NAutomationService = Depends(get_n8n_service),
) -> WorkflowStatusOut:
    return await service.get_status(execution_id)
