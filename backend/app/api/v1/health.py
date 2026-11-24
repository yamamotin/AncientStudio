"""Health and deployment metadata endpoints."""

from __future__ import annotations

from typing import Literal

from app.config import Settings, get_settings
from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter(tags=["system"])


class HealthOut(BaseModel):
    status: Literal["ok"]
    service: str
    environment: str
    version: str


class BuildOut(BaseModel):
    sha: str


@router.get("/health", response_model=HealthOut, summary="Liveness probe")
def health(settings: Settings = Depends(get_settings)) -> HealthOut:
    return HealthOut(
        status="ok",
        service="ancientstudio-api",
        environment=settings.environment,
        version=settings.api_version,
    )


@router.get("/build", response_model=BuildOut, summary="Deployed commit SHA")
def build(settings: Settings = Depends(get_settings)) -> BuildOut:
    return BuildOut(sha=settings.commit_sha)
