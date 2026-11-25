"""Integration tests for ETL endpoints over the real ledger dataset and cache layer."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

pytestmark = pytest.mark.integration


def test_list_datasets_reads_disk_and_populates_cache(client: TestClient) -> None:
    first = client.get("/api/v1/etl/datasets")
    second = client.get("/api/v1/etl/datasets")

    assert first.status_code == 200
    assert second.status_code == 200
    datasets = first.json()
    assert len(datasets) == 1
    assert datasets[0]["name"] == "ledger"
    assert datasets[0]["record_count"] == 5
    assert client.app.state.cache_backend.stats().hits >= 1


def test_summary_normalizes_brazilian_amounts(client: TestClient) -> None:
    response = client.get("/api/v1/etl/datasets/ledger/summary")

    assert response.status_code == 200
    body = response.json()
    assert body["record_count"] == 5
    assert body["gross_total"] == 2614.4
    assert body["by_currency"] == [
        {"currency": "BRL", "total": 1614.4},
        {"currency": "USD", "total": 1000.0},
    ]
    assert body["by_category"] == {"infra": 44.4, "receita": 2570.0}
    assert body["first_occurrence"] == "2026-11-01"
    assert body["last_occurrence"] == "2026-11-05"


def test_records_are_paginated_and_normalized(client: TestClient) -> None:
    response = client.get(
        "/api/v1/etl/datasets/ledger/records",
        params={"limit": 2, "offset": 1},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 5
    assert body["limit"] == 2
    assert body["offset"] == 1
    assert [item["id"] for item in body["items"]] == ["TX-002", "TX-003"]
    assert body["items"][1]["amount"] == -45.5


def test_unknown_dataset_returns_404_problem(client: TestClient) -> None:
    response = client.get("/api/v1/etl/datasets/missing/summary")

    assert response.status_code == 404
    assert response.json()["title"] == "Dataset not found"
    assert response.json()["status"] == 404
