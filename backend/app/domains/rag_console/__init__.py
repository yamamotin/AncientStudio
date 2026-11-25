"""Phase 5 Interactive Technical RAG Console domain."""

from app.domains.rag_console.corpus import (
    build_repository_corpus,
    compute_line_slice_sha256,
    discover_repository_files,
    verify_chunk_on_disk,
)
from app.domains.rag_console.embeddings import (
    EmbeddingProviderPort,
    LocalSubwordVectorEmbedder,
    OpenAICompatibleEmbeddingAdapter,
    cosine_similarity,
    create_embedding_provider,
    l2_normalize,
    tokenize_technical_text,
)
from app.domains.rag_console.retriever import HybridCorpusIndex, RankedChunkHit
from app.domains.rag_console.schemas import (
    DocumentChunk,
    GenerationStrategy,
    GenerationUsed,
    RAGConsoleQueryRequest,
    RAGConsoleQueryResponse,
    RAGGroundedSynthesisPayload,
    RAGIndexRebuildOut,
    RAGIndexStatusOut,
    RAGSearchRequest,
    RAGSearchResponse,
    RAGSourceDetailOut,
    RetrievalMode,
    RetrievalScoreBreakdown,
    SourceKind,
    VerifiableCitation,
)
from app.domains.rag_console.service import (
    RAG_REINDEX_TOPIC,
    RAGConsoleService,
    RAGIndexStore,
)

__all__ = [
    "DocumentChunk",
    "EmbeddingProviderPort",
    "GenerationStrategy",
    "GenerationUsed",
    "HybridCorpusIndex",
    "LocalSubwordVectorEmbedder",
    "OpenAICompatibleEmbeddingAdapter",
    "RAGConsoleQueryRequest",
    "RAGConsoleQueryResponse",
    "RAGConsoleService",
    "RAGGroundedSynthesisPayload",
    "RAGIndexRebuildOut",
    "RAGIndexStatusOut",
    "RAGIndexStore",
    "RAGSearchRequest",
    "RAGSearchResponse",
    "RAGSourceDetailOut",
    "RAG_REINDEX_TOPIC",
    "RankedChunkHit",
    "RetrievalMode",
    "RetrievalScoreBreakdown",
    "SourceKind",
    "VerifiableCitation",
    "build_repository_corpus",
    "compute_line_slice_sha256",
    "cosine_similarity",
    "create_embedding_provider",
    "discover_repository_files",
    "l2_normalize",
    "tokenize_technical_text",
    "verify_chunk_on_disk",
]
