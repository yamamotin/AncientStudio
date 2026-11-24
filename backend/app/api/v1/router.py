"""Versioned API aggregation."""

from app.api.v1 import etl, gateway, health, workflows
from fastapi import APIRouter

router = APIRouter(prefix="/v1")
router.include_router(health.router)
router.include_router(etl.router)
router.include_router(gateway.router)
router.include_router(workflows.router)
