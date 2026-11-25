"""ETL / financial ledger dataset routes."""

from __future__ import annotations

from app.api.deps import get_etl_service
from app.domains.etl import DatasetInfo, ETLRecordPage, ETLService, ETLSummary
from fastapi import APIRouter, Depends, Query

router = APIRouter(prefix="/etl", tags=["etl"])


@router.get(
    "/datasets",
    response_model=list[DatasetInfo],
    summary="List available datasets",
)
def list_datasets(service: ETLService = Depends(get_etl_service)) -> list[DatasetInfo]:
    return service.list_datasets()


@router.get(
    "/datasets/{dataset}/summary",
    response_model=ETLSummary,
    summary="Aggregate a dataset",
)
def dataset_summary(
    dataset: str,
    service: ETLService = Depends(get_etl_service),
) -> ETLSummary:
    return service.summarize(dataset)


@router.get(
    "/datasets/{dataset}/records",
    response_model=ETLRecordPage,
    summary="Page through records",
)
def dataset_records(
    dataset: str,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    service: ETLService = Depends(get_etl_service),
) -> ETLRecordPage:
    return service.get_page(dataset, limit=limit, offset=offset)
