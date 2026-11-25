"""Bounded-context domains of the AncientStudio Modular Monolith."""

DOMAIN_MODULES: tuple[str, ...] = (
    "gateway",
    "etl",
    "automation_n8n",
    "scraping",
    "ai_workflows",
    "pipelines_simulator",
)

__all__ = ["DOMAIN_MODULES"]
