"""Live CI/CD & Docker Pipeline Simulator routes over real repository targets."""

from __future__ import annotations

from app.api.deps import (
    get_correlation_id,
    get_pipeline_simulator_service,
    require_scopes,
)
from app.core.security import Scope
from app.domains.pipelines_simulator import (
    PipelineRunAccepted,
    PipelineRunStatusOut,
    PipelineSimulationRequest,
    PipelineSimulatorService,
    PipelineTargetInfo,
)
from fastapi import APIRouter, Depends, status

router = APIRouter(prefix="/pipelines", tags=["pipelines-simulator"])


@router.get(
    "/targets",
    response_model=list[PipelineTargetInfo],
    summary="List real AncientStudio application targets and verify manifest presence on disk",
)
def list_pipeline_targets(
    service: PipelineSimulatorService = Depends(get_pipeline_simulator_service),
) -> list[PipelineTargetInfo]:
    return service.list_targets()


@router.post(
    "/runs",
    response_model=PipelineRunAccepted,
    status_code=status.HTTP_202_ACCEPTED,
    dependencies=[Depends(require_scopes(Scope.PIPELINES_RUN))],
    summary="Enqueue a CI/CD & Docker pipeline inspection run for a repository target",
)
async def enqueue_pipeline_run(
    body: PipelineSimulationRequest,
    correlation_id: str = Depends(get_correlation_id),
    service: PipelineSimulatorService = Depends(get_pipeline_simulator_service),
) -> PipelineRunAccepted:
    return await service.enqueue_simulation(body, correlation_id=correlation_id)


@router.get(
    "/runs/{job_id}",
    response_model=PipelineRunStatusOut,
    dependencies=[Depends(require_scopes(Scope.PIPELINES_RUN))],
    summary="Fetch pipeline run status, per-stage telemetry, and verifiable RCA",
)
def get_pipeline_run_status(
    job_id: str,
    service: PipelineSimulatorService = Depends(get_pipeline_simulator_service),
) -> PipelineRunStatusOut:
    return service.get_run_status(job_id)
