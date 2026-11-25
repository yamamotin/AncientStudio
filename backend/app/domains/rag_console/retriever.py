"""Hybrid BM25 lexical + dense cosine vector index with Reciprocal Rank Fusion (RRF)."""

from __future__ import annotations

import math
from collections import Counter
from dataclasses import dataclass
from datetime import datetime

from app.domains.rag_console.embeddings import cosine_similarity, tokenize_technical_text
from app.domains.rag_console.schemas import (
    DocumentChunk,
    RetrievalMode,
    RetrievalScoreBreakdown,
    SourceKind,
)

_BM25_K1 = 1.5
_BM25_B = 0.75
_RRF_K = 60.0


@dataclass(frozen=True)
class RankedChunkHit:
    chunk: DocumentChunk
    scores: RetrievalScoreBreakdown


def format_chunk_for_indexing(chunk: DocumentChunk) -> str:
    """Compose structural metadata + body for both BM25 and dense embedding."""
    return f"{chunk.source_path}\n{chunk.symbol_or_heading}\n{chunk.content}"


class HybridCorpusIndex:
    """In-memory hybrid BM25 + dense vector index over real repository chunks."""

    def __init__(
        self,
        *,
        chunks: list[DocumentChunk],
        vectors: list[list[float]],
        total_documents: int,
        corpus_fingerprint: str,
        embedding_backend: str,
        embedding_dimensions: int,
        indexed_at: datetime,
    ) -> None:
        self.chunks = chunks
        self.vectors = vectors
        self.total_documents = total_documents
        self.corpus_fingerprint = corpus_fingerprint
        self.embedding_backend = embedding_backend
        self.embedding_dimensions = embedding_dimensions
        self.indexed_at = indexed_at

        self._by_id: dict[str, DocumentChunk] = {c.chunk_id: c for c in chunks}
        self._doc_terms: list[Counter[str]] = []
        self._doc_lengths: list[int] = []
        self._doc_freqs: Counter[str] = Counter()

        for chunk in chunks:
            tokens = tokenize_technical_text(format_chunk_for_indexing(chunk))
            counts = Counter(tokens)
            self._doc_terms.append(counts)
            self._doc_lengths.append(len(tokens))
            for term in counts:
                self._doc_freqs[term] += 1

        total_len = sum(self._doc_lengths)
        self._avg_doc_len = (total_len / len(chunks)) if chunks else 1.0

    def get_chunk(self, chunk_id: str) -> DocumentChunk | None:
        return self._by_id.get(chunk_id)

    def breakdown_by_kind(self) -> dict[str, int]:
        counts: Counter[str] = Counter(chunk.source_kind for chunk in self.chunks)
        return dict(sorted(counts.items()))

    def _bm25_score(self, doc_idx: int, query_terms: list[str]) -> tuple[float, list[str]]:
        if not query_terms or not self.chunks:
            return 0.0, []

        n_docs = len(self.chunks)
        term_counts = self._doc_terms[doc_idx]
        doc_len = self._doc_lengths[doc_idx]
        norm_denom = _BM25_K1 * (1.0 - _BM25_B + _BM25_B * (doc_len / self._avg_doc_len))

        score = 0.0
        matched: list[str] = []
        seen_q: set[str] = set()

        for term in query_terms:
            if term in seen_q:
                continue
            seen_q.add(term)
            tf = term_counts.get(term, 0)
            if tf <= 0:
                continue
            matched.append(term)
            df = self._doc_freqs.get(term, 0)
            idf = math.log(1.0 + (n_docs - df + 0.5) / (df + 0.5))
            tf_comp = (tf * (_BM25_K1 + 1.0)) / (tf + norm_denom)
            score += idf * tf_comp

        return score, matched

    def search(
        self,
        *,
        query: str,
        query_vector: list[float],
        top_k: int = 5,
        mode: RetrievalMode = "hybrid",
        alpha: float = 0.5,
        source_kinds: list[SourceKind] | None = None,
        path_prefix: str | None = None,
    ) -> tuple[list[RankedChunkHit], int]:
        """Search candidates and return ``(ranked_hits, total_filtered_candidates)``."""
        if not self.chunks:
            return [], 0

        allowed_kinds = set(source_kinds) if source_kinds else None
        norm_prefix = path_prefix.strip().lstrip("./") if path_prefix else None

        candidate_indices: list[int] = []
        for idx, chunk in enumerate(self.chunks):
            if allowed_kinds is not None and chunk.source_kind not in allowed_kinds:
                continue
            if norm_prefix and not chunk.source_path.startswith(norm_prefix):
                continue
            candidate_indices.append(idx)

        if not candidate_indices:
            return [], 0

        query_terms = tokenize_technical_text(query)
        raw_bm25: dict[int, float] = {}
        raw_vec: dict[int, float] = {}
        matched_map: dict[int, list[str]] = {}

        for idx in candidate_indices:
            b_score, matched = self._bm25_score(idx, query_terms)
            raw_bm25[idx] = b_score
            matched_map[idx] = matched
            raw_vec[idx] = (
                max(0.0, cosine_similarity(query_vector, self.vectors[idx]))
                if query_vector
                else 0.0
            )

        if mode == "lexical":
            ordered = sorted(
                candidate_indices,
                key=lambda i: (raw_bm25[i], raw_vec[i]),
                reverse=True,
            )
            hits = [
                RankedChunkHit(
                    chunk=self.chunks[i],
                    scores=RetrievalScoreBreakdown(
                        hybrid_score=round(raw_bm25[i], 6),
                        bm25_score=round(raw_bm25[i], 6),
                        vector_score=round(raw_vec[i], 6),
                        matched_terms=matched_map[i],
                    ),
                )
                for i in ordered[:top_k]
            ]
            return hits, len(candidate_indices)

        if mode == "vector":
            ordered = sorted(
                candidate_indices,
                key=lambda i: (raw_vec[i], raw_bm25[i]),
                reverse=True,
            )
            hits = [
                RankedChunkHit(
                    chunk=self.chunks[i],
                    scores=RetrievalScoreBreakdown(
                        hybrid_score=round(raw_vec[i], 6),
                        bm25_score=round(raw_bm25[i], 6),
                        vector_score=round(raw_vec[i], 6),
                        matched_terms=matched_map[i],
                    ),
                )
                for i in ordered[:top_k]
            ]
            return hits, len(candidate_indices)

        # Hybrid mode: Reciprocal Rank Fusion + normalized score tie-breaker.
        bm25_order = sorted(candidate_indices, key=lambda i: raw_bm25[i], reverse=True)
        vec_order = sorted(candidate_indices, key=lambda i: raw_vec[i], reverse=True)
        bm25_rank = {idx: rank for rank, idx in enumerate(bm25_order, start=1)}
        vec_rank = {idx: rank for rank, idx in enumerate(vec_order, start=1)}

        max_bm25 = max(raw_bm25.values()) or 1.0
        max_vec = max(raw_vec.values()) or 1.0

        fused_scores: dict[int, float] = {}
        for idx in candidate_indices:
            lex_rrf = (1.0 / (_RRF_K + bm25_rank[idx])) if raw_bm25[idx] > 0 else 0.0
            vec_rrf = (1.0 / (_RRF_K + vec_rank[idx])) if raw_vec[idx] > 0 else 0.0
            norm_blend = (1.0 - alpha) * (raw_bm25[idx] / max_bm25) + alpha * (
                raw_vec[idx] / max_vec
            )
            fused_scores[idx] = ((1.0 - alpha) * lex_rrf + alpha * vec_rrf) + 0.05 * norm_blend

        ordered = sorted(
            candidate_indices,
            key=lambda i: (fused_scores[i], raw_bm25[i], raw_vec[i]),
            reverse=True,
        )
        hits = [
            RankedChunkHit(
                chunk=self.chunks[i],
                scores=RetrievalScoreBreakdown(
                    hybrid_score=round(fused_scores[i], 6),
                    bm25_score=round(raw_bm25[i], 6),
                    vector_score=round(raw_vec[i], 6),
                    matched_terms=matched_map[i],
                ),
            )
            for i in ordered[:top_k]
        ]
        return hits, len(candidate_indices)
