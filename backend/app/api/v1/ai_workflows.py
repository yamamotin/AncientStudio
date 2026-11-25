"""AI Workflows catalog and async execution routes (non-RAG operational pipelines)."""

from __future__ import annotations

from app.api.deps import (
    get_ai_workflow_service,
    get_correlation_id,
    require_scopes,
)
from app.core.security import Scope
from app.domains.ai_workflows import (
    AIWorkflowDefinition,
    AIWorkflowRunAccepted,
    AIWorkflowRunRequest,
    AIWorkflowService,
)
from fastapi import APIRouter, Depends, status

router = APIRouter(prefix="/ai-workflows", tags=["ai-workflows"])


@router.get(
    "/definitions",
    response_model=list[AIWorkflowDefinition],
    summary="List registered operational AI workflow blueprints",
)
def list_ai_workflow_definitions(
    service: AIWorkflowService = Depends(get_ai_workflow_service),
) -> list[AIWorkflowDefinition]:
    return service.list_definitions()


@router.post(
    "/runs",
    response_model=AIWorkflowRunAccepted,
    status_code=status.HTTP_202_ACCEPTED,
    dependencies=[Depends(require_scopes(Scope.AI_WORKFLOWS_RUN))],
    summary="Sanitize inputs and enqueue an asynchronous AI workflow execution",
)
async def enqueue_ai_workflow_run(
    body: AIWorkflowRunRequest,
    correlation_id: str = Depends(get_correlation_id),
    service: AIWorkflowService = Depends(get_ai_workflow_service),
) -> AIWorkflowRunAccepted:
    return await service.enqueue_run(body, correlation_id=correlation_id)
