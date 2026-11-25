"""Real ETL service over local ledger datasets with optional cache acceleration."""

from __future__ import annotations

import csv
from collections import defaultdict
from datetime import date
from pathlib import Path

from app.cache.base import CacheBackend
from app.core.errors import ResourceNotFoundError
from app.domains.etl.schemas import (
    CurrencyTotal,
    DatasetInfo,
    ETLRecord,
    ETLRecordPage,
    ETLSummary,
)

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

DATASETS: dict[str, str] = {
    "ledger": "Livro de transações financeiras — valores em BRL e USD.",
}


def parse_localized_amount(raw: str) -> float:
    """Normalize Brazilian/accounting formatted currency strings to signed floats."""
    value = raw.strip()
    negative = value.startswith("(") and value.endswith(")")
    if negative:
        value = value[1:-1]
    value = value.replace(" ", "").replace("R$", "").replace("US$", "")
    if "," in value and "." in value:
        value = value.replace(".", "").replace(",", ".")
    elif "," in value:
        value = value.replace(",", ".")
    result = float(value)
    return -result if negative else result


class ETLService:
    """Loads, normalizes, and aggregates CSV datasets from disk."""

    def __init__(
        self,
        data_dir: Path = DATA_DIR,
        *,
        cache: CacheBackend | None = None,
        cache_ttl_seconds: int = 120,
    ) -> None:
        self._data_dir = data_dir
        self._cache = cache
        self._cache_ttl = cache_ttl_seconds

    def _load_from_disk(self, dataset: str) -> list[ETLRecord]:
        path = self._data_dir / f"{dataset}.csv"
        if not path.is_file():
            raise ResourceNotFoundError(
                f"Dataset file is missing: {dataset}",
                title="Dataset not found",
            )

        records: list[ETLRecord] = []
        with path.open(encoding="utf-8", newline="") as handle:
            for row in csv.DictReader(handle):
                records.append(
                    ETLRecord(
                        id=row["id"],
                        description=row["description"],
                        amount=round(parse_localized_amount(row["raw_amount"]), 2),
                        currency=row["currency"],
                        category=row["category"],
                        occurred_at=date.fromisoformat(row["occurred_at"]),
                    )
                )
        return records

    def _records(self, dataset: str) -> list[ETLRecord]:
        if dataset not in DATASETS:
            raise ResourceNotFoundError(
                f"Unknown dataset: {dataset}",
                title="Dataset not found",
            )
        if self._cache is None:
            return self._load_from_disk(dataset)

        cache_key = f"etl:records:{self._data_dir}:{dataset}"
        records, _ = self._cache.get_or_set(
            cache_key,
            lambda: self._load_from_disk(dataset),
            ttl_seconds=self._cache_ttl,
        )
        return records

    def list_datasets(self) -> list[DatasetInfo]:
        return [
            DatasetInfo(
                name=name,
                description=description,
                record_count=len(self._records(name)),
                fields=list(ETLRecord.model_fields),
            )
            for name, description in DATASETS.items()
        ]

    def get_page(self, dataset: str, limit: int, offset: int) -> ETLRecordPage:
        records = self._records(dataset)
        return ETLRecordPage(
            dataset=dataset,
            total=len(records),
            limit=limit,
            offset=offset,
            items=records[offset : offset + limit],
        )

    def summarize(self, dataset: str) -> ETLSummary:
        records = self._records(dataset)
        by_currency: dict[str, float] = defaultdict(float)
        by_category: dict[str, float] = defaultdict(float)
        for record in records:
            by_currency[record.currency] += record.amount
            by_category[record.category] += record.amount

        dates = [record.occurred_at for record in records]
        return ETLSummary(
            dataset=dataset,
            record_count=len(records),
            gross_total=round(sum(by_currency.values()), 2),
            by_currency=[
                CurrencyTotal(currency=key, total=round(value, 2))
                for key, value in sorted(by_currency.items())
            ],
            by_category={
                key: round(value, 2) for key, value in sorted(by_category.items())
            },
            first_occurrence=min(dates) if dates else None,
            last_occurrence=max(dates) if dates else None,
            checks=["schema_ok", "amounts_normalized", "dates_parsed"],
        )
