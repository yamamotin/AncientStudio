"""Typed schemas and contracts for the Phase 5 Interactive Technical RAG Console."""

from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

SourceKind = Literal[
    "documentation",
    "backend_code",
    "engine_code",
    "frontend_code",
    "infra_cicd",
]
RetrievalMode = Literal["hybrid", "vector", "lexical"]
GenerationStrategy = Literal["auto", "extractive", "llm"]
GenerationUsed = Literal["extractive-grounded", "llm-grounded"]


class DocumentChunk(BaseModel):
    """Immutable indexed slice of a real repository file with verifiable digest."""

    chunk_id: str
    source_path: str
    source_kind: SourceKind
    symbol_or_heading: str
    start_line: int = Field(ge=1)
    end_line: int = Field(ge=1)
    content: str
    content_sha256: str
    token_count: int = Field(ge=0)


class RetrievalScoreBreakdown(BaseModel):
    """Transparent lexical, dense vector, and fused hybrid relevance metrics."""

    hybrid_score: float
    bm25_score: float
    vector_score: float
    matched_terms: list[str] = Field(default_factory=list)


class VerifiableCitation(BaseModel):
    """Verifiable source citation pointing to exact repository lines and SHA-256."""

    citation_id: str
    chunk_id: str
    source_path: str
    source_kind: SourceKind
    symbol_or_heading: str
    start_line: int
    end_line: int
    content_sha256: str
    verified_on_disk: bool
    excerpt: str
    scores: RetrievalScoreBreakdown


class RAGIndexStatusOut(BaseModel):
    """Live telemetry of the hybrid lexical + dense vector repository index."""

    indexed: bool
    corpus_fingerprint: str
    total_documents: int
    total_chunks: int
    embedding_backend: str
    embedding_dimensions: int
    indexed_at: datetime | None = None
    breakdown_by_kind: dict[str, int] = Field(default_factory=dict)


class RAGIndexRebuildOut(BaseModel):
    """Outcome of a synchronous or asynchronous RAG corpus re-indexing trigger."""

    mode: Literal["sync", "queued"]
    job_id: str | None = None
    status: RAGIndexStatusOut | None = None


class RAGSearchRequest(BaseModel):
    """Pure hybrid/vector/lexical search request over the indexed repository."""

    query: str = Field(min_length=2, max_length=600)
    top_k: int = Field(default=5, ge=1, le=20)
    retrieval_mode: RetrievalMode = "hybrid"
    alpha: float | None = Field(default=None, ge=0.0, le=1.0)
    source_kinds: list[SourceKind] | None = None
    path_prefix: str | None = Field(default=None, max_length=200)


class RAGSearchResponse(BaseModel):
    """Ranked verifiable citations returned by hybrid/vector/lexical search."""

    query: str
    retrieval_mode: RetrievalMode
    corpus_fingerprint: str
    total_candidates: int
    results: list[VerifiableCitation]


class RAGConsoleQueryRequest(BaseModel):
    """Interactive technical console query request with citation grounding."""

    question: str = Field(min_length=3, max_length=1000)
    top_k: int = Field(default=5, ge=1, le=15)
    retrieval_mode: RetrievalMode = "hybrid"
    generation_mode: GenerationStrategy = "auto"
    alpha: float | None = Field(default=None, ge=0.0, le=1.0)
    source_kinds: list[SourceKind] | None = None
    path_prefix: str | None = Field(default=None, max_length=200)


class RAGGroundedSynthesisPayload(BaseModel):
    """Strict output schema validated when an LLM synthesizes a grounded answer."""

    answer: str = Field(min_length=10, max_length=4000)
    cited_ids: list[str] = Field(default_factory=list)
    architectural_highlights: list[str] = Field(default_factory=list, max_length=8)


class RAGConsoleQueryResponse(BaseModel):
    """Grounded technical console response with verifiable repository citations."""

    question: str
    answer: str
    architectural_highlights: list[str]
    citations: list[VerifiableCitation]
    retrieval_mode: RetrievalMode
    generation_used: GenerationUsed
    corpus_fingerprint: str
    cached: bool
    correlation_id: str


class RAGSourceDetailOut(BaseModel):
    """Detailed source chunk view with live disk SHA-256 verification."""

    chunk_id: str
    source_path: str
    source_kind: SourceKind
    symbol_or_heading: str
    start_line: int
    end_line: int
    content: str
    indexed_sha256: str
    current_disk_sha256: str | None = None
    verified_on_disk: bool
