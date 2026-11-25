"""Technical tokenizer and dense vector embedding adapters (local subword + OpenAI HTTP)."""

from __future__ import annotations

import hashlib
import math
import re
import unicodedata
from collections import Counter
from collections.abc import Sequence
from typing import Any, Protocol, runtime_checkable

import httpx
from app.core.config import Settings
from app.core.errors import ServiceUnavailableError, UpstreamServiceError

_CAMEL_BOUNDARY_RE = re.compile(r"([a-z0-9])([A-Z])")
_RAW_WORD_RE = re.compile(r"[A-Za-zÀ-ÿ0-9_]{2,}")
_STOPWORDS = frozenset(
    {
        "the",
        "and",
        "for",
        "with",
        "from",
        "that",
        "this",
        "are",
        "was",
        "into",
        "when",
        "como",
        "para",
        "com",
        "uma",
        "dos",
        "das",
        "nos",
        "nas",
        "por",
        "que",
        "sobre",
        "entre",
        "pelo",
        "pela",
        "self",
        "true",
        "false",
        "none",
        "return",
    }
)


def _fold_accents(value: str) -> str:
    decomposed = unicodedata.normalize("NFKD", value)
    return "".join(ch for ch in decomposed if not unicodedata.combining(ch))


def tokenize_technical_text(text: str) -> list[str]:
    """Tokenize code and PT-BR/EN prose while splitting camelCase and snake_case."""
    tokens: list[str] = []
    for raw in _RAW_WORD_RE.findall(text):
        folded = _fold_accents(raw)
        lower_full = folded.lower().strip("_")
        if len(lower_full) >= 2 and lower_full not in _STOPWORDS and not lower_full.isdigit():
            tokens.append(lower_full)

        expanded = _CAMEL_BOUNDARY_RE.sub(r"\1_\2", folded)
        if "_" in expanded:
            for part in expanded.lower().split("_"):
                if len(part) >= 2 and part not in _STOPWORDS and not part.isdigit():
                    tokens.append(part)
    return tokens


def l2_normalize(vec: list[float]) -> list[float]:
    norm = math.sqrt(sum(val * val for val in vec))
    if norm <= 1e-12:
        return [0.0 for _ in vec]
    inv = 1.0 / norm
    return [val * inv for val in vec]


def cosine_similarity(vec_a: Sequence[float], vec_b: Sequence[float]) -> float:
    """Dot product over L2-normalized vectors."""
    if len(vec_a) != len(vec_b):
        return 0.0
    return sum(a * b for a, b in zip(vec_a, vec_b, strict=False))


@runtime_checkable
class EmbeddingProviderPort(Protocol):
    """Port producing L2-normalized dense vectors for documents and queries."""

    provider_name: str
    dimensions: int

    async def embed_texts(self, texts: Sequence[str]) -> list[list[float]]: ...


def _signed_hash_feature(feature: str, dimensions: int) -> tuple[int, float]:
    digest = hashlib.blake2b(feature.encode("utf-8"), digest_size=8).digest()
    val = int.from_bytes(digest, "little")
    bucket = val % dimensions
    sign = 1.0 if ((val >> 32) & 1) == 0 else -1.0
    return bucket, sign


class LocalSubwordVectorEmbedder:
    """Deterministic signed random-projection dense embedder over words, bigrams & 4-grams."""

    provider_name = "local-subword-rp"

    def __init__(self, dimensions: int = 256) -> None:
        self.dimensions = dimensions

    def _embed_single(self, text: str) -> list[float]:
        vec = [0.0] * self.dimensions
        tokens = tokenize_technical_text(text)
        if not tokens:
            return vec

        counts = Counter(tokens)
        for term, tf in counts.items():
            weight = 1.0 + math.log(tf)
            idx, sign = _signed_hash_feature(f"u:{term}", self.dimensions)
            vec[idx] += sign * weight

            if len(term) >= 4:
                padded = f"<{term}>"
                for pos in range(len(padded) - 3):
                    ngram = padded[pos : pos + 4]
                    n_idx, n_sign = _signed_hash_feature(f"g:{ngram}", self.dimensions)
                    vec[n_idx] += n_sign * (0.42 * weight)

        for pos in range(len(tokens) - 1):
            bigram = f"b:{tokens[pos]}_{tokens[pos + 1]}"
            b_idx, b_sign = _signed_hash_feature(bigram, self.dimensions)
            vec[b_idx] += b_sign * 0.85

        return l2_normalize(vec)

    async def embed_texts(self, texts: Sequence[str]) -> list[list[float]]:
        return [self._embed_single(item) for item in texts]


class OpenAICompatibleEmbeddingAdapter:
    """HTTP adapter calling OpenAI-compatible ``/embeddings`` endpoints."""

    provider_name = "openai-compatible-embeddings"

    def __init__(
        self,
        settings: Settings,
        *,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._settings = settings
        self._transport = transport
        self.dimensions = settings.rag_vector_dimensions

    def _client(self) -> httpx.AsyncClient:
        kwargs: dict[str, Any] = {"timeout": self._settings.ai_provider_timeout_seconds}
        if self._transport is not None:
            kwargs["transport"] = self._transport
        return httpx.AsyncClient(**kwargs)

    async def embed_texts(self, texts: Sequence[str]) -> list[list[float]]:
        if not texts:
            return []
        api_key = (self._settings.ai_provider_api_key or "").strip()
        if not api_key:
            raise ServiceUnavailableError(
                "AI_PROVIDER_API_KEY is required when RAG_EMBEDDING_PROVIDER='openai'."
            )

        url = f"{self._settings.ai_provider_base_url}/embeddings"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self._settings.rag_embedding_model,
            "input": list(texts),
        }

        try:
            async with self._client() as client:
                response = await client.post(url, json=payload, headers=headers)
        except httpx.HTTPError as exc:
            raise UpstreamServiceError(
                "Could not reach the configured RAG embeddings endpoint.",
                title="Embedding provider unavailable",
            ) from exc

        if response.status_code >= 400:
            raise UpstreamServiceError(
                f"Embeddings endpoint returned HTTP {response.status_code}.",
                title="Embedding provider error",
                extra={"upstream_status": response.status_code},
            )

        try:
            body = response.json()
            items = sorted(body["data"], key=lambda item: int(item["index"]))
            vectors = [l2_normalize([float(x) for x in item["embedding"]]) for item in items]
        except (ValueError, KeyError, TypeError) as exc:
            raise UpstreamServiceError(
                "Embeddings endpoint returned a malformed response payload.",
                title="Embedding provider malformed response",
            ) from exc

        if len(vectors) != len(texts):
            raise UpstreamServiceError(
                "Embeddings count mismatch from upstream provider.",
                title="Embedding provider error",
            )
        if vectors:
            self.dimensions = len(vectors[0])
        return vectors


def create_embedding_provider(settings: Settings) -> EmbeddingProviderPort:
    if settings.rag_embedding_provider.strip().lower() == "openai":
        return OpenAICompatibleEmbeddingAdapter(settings)
    return LocalSubwordVectorEmbedder(dimensions=settings.rag_vector_dimensions)
