"""AI Workflows domain (structured extraction, classification, triage; excludes RAG console)."""

from app.domains.ai_workflows.adapters import OpenAICompatibleInferenceAdapter
from app.domains.ai_workflows.contracts import StructuredInferencePort
from app.domains.ai_workflows.schemas import (
    AIWorkflowDefinition,
    AIWorkflowExecutionResult,
    AIWorkflowKind,
    AIWorkflowRunAccepted,
    AIWorkflowRunRequest,
    AIWorkflowStepResult,
    AIWorkflowStepSpec,
    AnomalyTriageOutput,
    EntityExtractionOutput,
    ExtractedEntityItem,
    IncidentClassificationOutput,
    SeverityLevel,
)
from app.domains.ai_workflows.service import (
    AI_WORKFLOW_COMPLETED_EVENT,
    AI_WORKFLOW_EXECUTE_TOPIC,
    DEFAULT_AI_WORKFLOWS,
    AIWorkflowService,
)

__all__ = [
    "AI_WORKFLOW_COMPLETED_EVENT",
    "AI_WORKFLOW_EXECUTE_TOPIC",
    "DEFAULT_AI_WORKFLOWS",
    "AIWorkflowDefinition",
    "AIWorkflowExecutionResult",
    "AIWorkflowKind",
    "AIWorkflowRunAccepted",
    "AIWorkflowRunRequest",
    "AIWorkflowService",
    "AIWorkflowStepResult",
    "AIWorkflowStepSpec",
    "AnomalyTriageOutput",
    "EntityExtractionOutput",
    "ExtractedEntityItem",
    "IncidentClassificationOutput",
    "OpenAICompatibleInferenceAdapter",
    "SeverityLevel",
    "StructuredInferencePort",
]
