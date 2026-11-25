"""n8n Automation domain: authenticated triggers, EventBus bridge, and signed callbacks."""

from app.domains.automation_n8n.client import N8NClient, normalize_n8n_status
from app.domains.automation_n8n.schemas import (
    WebhookCallbackIn,
    WebhookCallbackOut,
    WorkflowCatalogItem,
    WorkflowExecutionStatus,
    WorkflowRunIn,
    WorkflowRunOut,
    WorkflowStatusOut,
)
from app.domains.automation_n8n.service import (
    N8N_CALLBACK_RECEIVED_EVENT,
    N8N_TRIGGER_TOPIC,
    N8NAutomationService,
)

__all__ = [
    "N8N_CALLBACK_RECEIVED_EVENT",
    "N8N_TRIGGER_TOPIC",
    "N8NAutomationService",
    "N8NClient",
    "WebhookCallbackIn",
    "WebhookCallbackOut",
    "WorkflowCatalogItem",
    "WorkflowExecutionStatus",
    "WorkflowRunIn",
    "WorkflowRunOut",
    "WorkflowStatusOut",
    "normalize_n8n_status",
]
