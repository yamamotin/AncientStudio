"""Schemas for the API Gateway / BFF and Fiscal Gateway domain."""

from __future__ import annotations

from datetime import datetime
from typing import Literal

from app.queue.models import QueueMetrics
from pydantic import BaseModel, Field


class InvoiceItemIn(BaseModel):
    description: str = Field(min_length=1, max_length=200)
    quantity: int = Field(ge=1)
    unit_price: float = Field(gt=0, le=10_000_000)


class InvoiceTotalsIn(BaseModel):
    gross: float = Field(ge=0)
    tax: float = Field(ge=0, le=1)
    currency: str = Field(min_length=3, max_length=3, pattern=r"^[A-Z]{3}$")


class InvoiceIn(BaseModel):
    invoice_key: str = Field(min_length=4, max_length=80)
    issuer_cnpj: str = Field(pattern=r"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$|^\d{14}$")
    document_type: Literal["nfe", "nfse", "receipt"]
    issued_at: datetime
    items: list[InvoiceItemIn] = Field(min_length=1, max_length=200)
    totals: InvoiceTotalsIn


class InvoiceOut(BaseModel):
    invoice_id: str
    invoice_key: str
    document_type: Literal["nfe", "nfse", "receipt"]
    status: Literal["accepted"]
    currency: str
    gross: float
    tax: float
    net: float
    validated_at: datetime
    checks: list[str]


class CacheTelemetryOut(BaseModel):
    hits: int
    misses: int
    sets: int
    evictions: int
    size: int


class GatewayCapabilitiesOut(BaseModel):
    """BFF capability and architecture manifest for observability and frontend discovery."""

    service: str
    version: str
    environment: str
    python_runtime: str
    architecture: Literal["modular-monolith-event-driven"]
    domains: list[str]
    worker_topics: list[str]
    cache: CacheTelemetryOut
    queue: QueueMetrics
