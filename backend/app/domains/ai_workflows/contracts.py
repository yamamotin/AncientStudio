"""Vendor-neutral inference contracts for the AI Workflows domain (Phase 2 providers)."""

from __future__ import annotations

from typing import Any, Protocol, runtime_checkable


@runtime_checkable
class StructuredInferencePort(Protocol):
    """Port for real LLM providers returning schema-validated structured outputs."""

    provider_name: str

    async def generate_structured(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        response_schema: dict[str, Any],
        timeout_seconds: float = 15.0,
    ) -> dict[str, Any]: ...
