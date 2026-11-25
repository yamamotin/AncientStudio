"""n8n Automation domain: authenticated webhook triggers, status polling, and workflow catalog."""

from app.domains.automation_n8n.client import N8NClient, normalize_n8n_status
from app.domains.automation_n8n.schemas import (
    WorkflowCatalogItem,
    WorkflowExecutionStatus,
    WorkflowRunIn,
    WorkflowRunOut,
    WorkflowStatusOut,
)
from app.domains.automation_n8n.service import N8N_TRIGGER_TOPIC, N8NAutomationService

__all__ = [
    "N8N_TRIGGER_TOPIC",
    "N8NAutomationService",
    "N8NClient",
    "WorkflowCatalogItem",
    "WorkflowExecutionStatus",
    "WorkflowRunIn",
    "WorkflowRunOut",
    "WorkflowStatusOut",
    "normalize_n8n_status",
]
