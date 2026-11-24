"""Authenticated n8n workflow trigger/query routes."""

from __future__ import annotations

from app.api.deps import (
    get_correlation_id,
    get_n8n_client,
    require_workflow_token,
)
from app.schemas.workflows import WorkflowRunIn, WorkflowRunOut, WorkflowStatusOut
from app.services.n8n import N8NClient
from fastapi import APIRouter, Depends, status

router = APIRouter(
    prefix="/workflows",
    tags=["workflows"],
    dependencies=[Depends(require_workflow_token)],
)


@router.post(
    "/{workflow_id}/run",
    response_model=WorkflowRunOut,
    status_code=status.HTTP_202_ACCEPTED,
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


@router.get(
    "/runs/{execution_id}",
    response_model=WorkflowStatusOut,
    summary="Query an n8n execution",
)
async def workflow_status(
    execution_id: str,
    client: N8NClient = Depends(get_n8n_client),
) -> WorkflowStatusOut:
    return await client.get_execution(execution_id)
