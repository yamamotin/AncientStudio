"""Real ETL over the local ledger dataset.

No fictitious payloads: every value is parsed from ``app/data/ledger.csv`` and
normalized with Brazilian number conventions (1.234,56 and (45,50) negatives).
"""

from __future__ import annotations

import csv
from collections import defaultdict
from datetime import date
from pathlib import Path

from app.core.errors import Problem
from app.schemas.etl import CurrencyTotal, DatasetInfo, ETLRecord, ETLRecordPage, ETLSummary

DATA_DIR = Path(__file__).resolve().parents[1] / "data"

DATASETS = {
    "ledger": "Livro de transações financeiras — valores em BRL e USD.",
}


def _parse_amount(raw: str) -> float:
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
    """Loads and aggregates datasets from disk."""

    def __init__(self, data_dir: Path = DATA_DIR) -> None:
        self._data_dir = data_dir

    def _records(self, dataset: str) -> list[ETLRecord]:
        if dataset not in DATASETS:
            raise Problem(404, "Dataset not found", f"Unknown dataset: {dataset}")

        path = self._data_dir / f"{dataset}.csv"
        if not path.is_file():
            raise Problem(404, "Dataset not found", f"Dataset file is missing: {dataset}")

        records: list[ETLRecord] = []
        with path.open(encoding="utf-8", newline="") as handle:
            for row in csv.DictReader(handle):
                records.append(
                    ETLRecord(
                        id=row["id"],
                        description=row["description"],
                        amount=round(_parse_amount(row["raw_amount"]), 2),
                        currency=row["currency"],
                        category=row["category"],
                        occurred_at=date.fromisoformat(row["occurred_at"]),
                    )
                )
        return records

    def list_datasets(self) -> list[DatasetInfo]:
        result = []
        for name, description in DATASETS.items():
            result.append(
                DatasetInfo(
                    name=name,
                    description=description,
                    record_count=len(self._records(name)),
                    fields=list(ETLRecord.model_fields),
                )
            )
        return result

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
            by_category={key: round(value, 2) for key, value in sorted(by_category.items())},
            first_occurrence=min(dates) if dates else None,
            last_occurrence=max(dates) if dates else None,
            checks=["schema_ok", "amounts_normalized", "dates_parsed"],
        )
