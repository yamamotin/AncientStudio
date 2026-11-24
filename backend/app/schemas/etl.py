"""Schemas for the ETL/dados API."""

from __future__ import annotations

from datetime import date
from typing import Literal

from pydantic import BaseModel


class ETLRecord(BaseModel):
    id: str
    description: str
    amount: float
    currency: str
    category: str
    occurred_at: date


class DatasetInfo(BaseModel):
    name: str
    description: str
    record_count: int
    fields: list[str]


class ETLRecordPage(BaseModel):
    dataset: str
    total: int
    limit: int
    offset: int
    items: list[ETLRecord]


class CurrencyTotal(BaseModel):
    currency: str
    total: float


class ETLSummary(BaseModel):
    dataset: str
    record_count: int
    gross_total: float
    by_currency: list[CurrencyTotal]
    by_category: dict[str, float]
    first_occurrence: date | None
    last_occurrence: date | None
    checks: list[Literal["schema_ok", "amounts_normalized", "dates_parsed"]]
