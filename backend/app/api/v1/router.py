"""Versioned /api/v1 router aggregation across all Modular Monolith domains."""

from app.api.v1 import (
    ai_workflows,
    etl,
    gateway,
    health,
    jobs,
    pipelines,
    scraping,
    workflows,
)
from fastapi import APIRouter

router = APIRouter(prefix="/v1")
router.include_router(health.router)
router.include_router(gateway.router)
router.include_router(etl.router)
router.include_router(workflows.router)
router.include_router(jobs.router)
router.include_router(scraping.router)
router.include_router(ai_workflows.router)
router.include_router(pipelines.router)
