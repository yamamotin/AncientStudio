"""System endpoint tests."""

from fastapi.testclient import TestClient


def test_health_reports_real_service(client: TestClient) -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "ancientstudio-api",
        "environment": "test",
        "version": "1.0.0",
    }
    assert response.headers["X-Correlation-ID"]


def test_build_exposes_commit_sha(client: TestClient) -> None:
    response = client.get("/api/v1/build")

    assert response.status_code == 200
    assert response.json() == {"sha": "test-sha-123"}
