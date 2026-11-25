"""Unit tests for Fase 3B: OpenAICompatibleInferenceAdapter & multi-step AIWorkflowService."""

from __future__ import annotations

import asyncio
import json

import httpx
import pytest
from app.core.config import Settings
from app.core.errors import ServiceUnavailableError, UpstreamServiceError
from app.domains.ai_workflows import (
    AIWorkflowService,
    OpenAICompatibleInferenceAdapter,
)
from app.queue import EventBus, InMemoryJobQueue

pytestmark = pytest.mark.unit


def test_openai_compatible_adapter_requires_key_and_parses_structured_json() -> None:
    no_key_cfg = Settings(environment="test", ai_provider_api_key=None)
    no_key_adapter = OpenAICompatibleInferenceAdapter(no_key_cfg)

    with pytest.raises(ServiceUnavailableError, match="AI_PROVIDER_API_KEY"):
        asyncio.run(
            no_key_adapter.generate_structured(
                system_prompt="sys",
                user_prompt="usr",
                response_schema={"type": "object"},
            )
        )

    captured_auth = ""

    def handler(request: httpx.Request) -> httpx.Response:
        nonlocal captured_auth
        captured_auth = request.headers.get("Authorization", "")
        return httpx.Response(
            200,
            json={
                "choices": [
                    {
                        "message": {
                            "content": "```json\n"
                            + json.dumps(
                                {
                                    "severity": "high",
                                    "anomaly_detected": True,
                                    "risk_score": 0.91,
                                    "findings": ["Tax rate outlier"],
                                    "recommended_action": "Hold invoice for fiscal audit.",
                                }
                            )
                            + "\n```"
                        }
                    }
                ]
            },
        )

    cfg = Settings(
        environment="test",
        ai_provider_base_url="https://llm.internal.example/v1/",
        ai_provider_api_key="real-test-inference-key-12345",
        ai_provider_model="granite-3-8b-instruct",
    )
    adapter = OpenAICompatibleInferenceAdapter(
        cfg, transport=httpx.MockTransport(handler)
    )
    out = asyncio.run(
        adapter.generate_structured(
            system_prompt="Audit fiscal data",
            user_prompt='{"invoice_key": "NFE-1"}',
            response_schema={"type": "object"},
        )
    )
    assert captured_auth == "Bearer real-test-inference-key-12345"
    assert out["severity"] == "high"
    assert out["risk_score"] == 0.91


def test_ai_workflow_service_executes_multi_step_pipeline_and_validates_schema() -> None:
    async def scenario() -> None:
        def valid_llm_handler(request: httpx.Request) -> httpx.Response:
            return httpx.Response(
                200,
                json={
                    "choices": [
                        {
                            "message": {
                                "content": json.dumps(
                                    {
                                        "severity": "critical",
                                        "anomaly_detected": True,
                                        "risk_score": 0.97,
                                        "findings": [
                                            "Declared gross diverges from item sum",
                                            "Tax rate exceeds 35% threshold",
                                        ],
                                        "recommended_action": "Escalate to tax compliance.",
                                    }
                                )
                            }
                        }
                    ]
                },
            )

        cfg = Settings(
            environment="test",
            ai_provider_api_key="real-test-inference-key-12345",
        )
        queue = InMemoryJobQueue()
        bus = EventBus()
        adapter = OpenAICompatibleInferenceAdapter(
            cfg, transport=httpx.MockTransport(valid_llm_handler)
        )
        service = AIWorkflowService(queue, inference_port=adapter, event_bus=bus)

        job = await queue.enqueue(
            "ai_workflows.execute",
            {
                "workflow_slug": "invoice-anomaly-triage",
                "inputs": {
                    "invoice_key": "NFE-999",
                    "gross": 500.0,
                    "tax": 0.45,
                    "items": [{"quantity": 2, "unit_price": 100.0}],
                },
            },
            correlation_id="corr-ai-1",
        )
        result = await service.execute_workflow_job(job)

        assert result["workflow_slug"] == "invoice-anomaly-triage"
        assert len(result["steps"]) == 2
        assert result["steps"][0]["step_id"] == "normalize"
        assert set(result["steps"][0]["output"]["heuristic_flags"]) == {
            "high_tax_rate",
            "gross_items_mismatch",
        }
        assert result["final_output"]["severity"] == "critical"

        events = bus.recent_events()
        assert len(events) == 1
        assert events[0].event_type == "ai_workflows.run.completed"
        assert events[0].payload["requires_alert"] is True

        # Verify schema violation from LLM raises UpstreamServiceError.
        def invalid_schema_handler(request: httpx.Request) -> httpx.Response:
            return httpx.Response(
                200,
                json={
                    "choices": [
                        {
                            "message": {
                                "content": json.dumps(
                                    {"severity": "critical", "risk_score": 99.0}
                                )
                            }
                        }
                    ]
                },
            )

        bad_adapter = OpenAICompatibleInferenceAdapter(
            cfg, transport=httpx.MockTransport(invalid_schema_handler)
        )
        bad_service = AIWorkflowService(queue, inference_port=bad_adapter)
        with pytest.raises(UpstreamServiceError, match="schema validation"):
            await bad_service.execute_workflow_job(job)

    asyncio.run(scenario())
