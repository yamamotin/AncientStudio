"""AI Workflows domain (structured extraction, classification, triage; excludes RAG console)."""

from app.domains.ai_workflows.contracts import StructuredInferencePort
from app.domains.ai_workflows.schemas import (
    AIWorkflowDefinition,
    AIWorkflowKind,
    AIWorkflowRunAccepted,
    AIWorkflowRunRequest,
    AIWorkflowStepSpec,
)
from app.domains.ai_workflows.service import (
    AI_WORKFLOW_EXECUTE_TOPIC,
    DEFAULT_AI_WORKFLOWS,
    AIWorkflowService,
)

__all__ = [
    "AI_WORKFLOW_EXECUTE_TOPIC",
    "DEFAULT_AI_WORKFLOWS",
    "AIWorkflowDefinition",
    "AIWorkflowKind",
    "AIWorkflowRunAccepted",
    "AIWorkflowRunRequest",
    "AIWorkflowService",
    "AIWorkflowStepSpec",
    "StructuredInferencePort",
]
