"""Repository corpus discovery, AST/Markdown chunking, and on-disk SHA-256 verification."""

from __future__ import annotations

import ast
import re
from pathlib import Path

from app.core.security import fingerprint, sha256_hex
from app.domains.rag_console.schemas import DocumentChunk, SourceKind

_EXCLUDED_DIRS = frozenset(
    {
        ".git",
        ".venv",
        "venv",
        "node_modules",
        "__pycache__",
        ".pytest_cache",
        ".ruff_cache",
        ".mypy_cache",
        "dist",
        "build",
        "coverage",
        "Unselected files",
    }
)
_EXCLUDED_SUFFIXES = (".bundle.js", ".min.js", ".min.css", ".map", ".lock")
_MD_HEADING_RE = re.compile(r"^(#{1,3})\s+(.+?)\s*$")
_TS_SYMBOL_RE = re.compile(
    r"^\s*(?:export\s+)?(?:default\s+)?(?:abstract\s+)?"
    r"(?:class|interface|function|type|const)\s+([A-Za-z0-9_]+)"
)


def compute_line_slice_sha256(lines: list[str], start_line: int, end_line: int) -> str:
    """Compute canonical UTF-8 SHA-256 over 1-based inclusive line range."""
    sliced = "\n".join(lines[start_line - 1 : end_line])
    return sha256_hex(sliced.encode("utf-8"))


def verify_chunk_on_disk(
    repo_root: Path,
    chunk: DocumentChunk,
) -> tuple[bool, str | None]:
    """Verify that ``chunk`` still matches the exact line slice on disk."""
    root_resolved = repo_root.resolve()
    target = (repo_root / chunk.source_path).resolve()
    if not target.is_relative_to(root_resolved) or not target.is_file():
        return False, None

    try:
        lines = target.read_text(encoding="utf-8").splitlines()
    except OSError:
        return False, None

    if chunk.start_line < 1 or chunk.end_line > len(lines) or chunk.start_line > chunk.end_line:
        return False, None

    current_sha = compute_line_slice_sha256(lines, chunk.start_line, chunk.end_line)
    return current_sha == chunk.content_sha256, current_sha


def _classify_source(relpath: str) -> SourceKind | None:
    lower = relpath.lower()
    name = Path(relpath).name

    if any(lower.endswith(sfx) for sfx in _EXCLUDED_SUFFIXES):
        return None
    if name.startswith(".env"):
        return None

    if lower.endswith(".md"):
        return "documentation"
    if relpath.startswith("backend/app/") and lower.endswith(".py"):
        return "backend_code"
    if lower.endswith(".py") and not relpath.startswith(("backend/tests/", "tests/")):
        return "backend_code"
    if relpath.startswith("ascii-engine-module/src/") and lower.endswith(".ts"):
        return "engine_code"
    if lower.endswith(".ts") and not lower.endswith(".test.ts"):
        return "engine_code"
    if relpath.startswith("assets/js/") and lower.endswith(".js"):
        return "frontend_code"
    if (
        relpath.startswith((".github/workflows/", "infra/n8n/workflows/", "scripts/"))
        and lower.endswith((".yml", ".yaml", ".json", ".sh"))
    ) or name == "Dockerfile":
        return "infra_cicd"
    return None


def discover_repository_files(repo_root: Path) -> list[tuple[Path, str, SourceKind]]:
    """Discover real documentation, source code, and CI/CD blueprints under ``repo_root``."""
    root_resolved = repo_root.resolve()
    discovered: list[tuple[Path, str, SourceKind]] = []

    for path in sorted(root_resolved.rglob("*")):
        if not path.is_file() or path.is_symlink():
            continue
        rel_parts = path.relative_to(root_resolved).parts
        if any(part in _EXCLUDED_DIRS for part in rel_parts):
            continue
        rel_posix = path.relative_to(root_resolved).as_posix()
        kind = _classify_source(rel_posix)
        if kind is not None:
            discovered.append((path, rel_posix, kind))

    return discovered


def _build_chunk(
    *,
    relpath: str,
    source_kind: SourceKind,
    symbol_or_heading: str,
    lines: list[str],
    start_line: int,
    end_line: int,
) -> DocumentChunk | None:
    # Trim leading/trailing blank lines while adjusting exact 1-based line numbers.
    s_idx = start_line
    e_idx = end_line
    while s_idx <= e_idx and not lines[s_idx - 1].strip():
        s_idx += 1
    while e_idx >= s_idx and not lines[e_idx - 1].strip():
        e_idx -= 1
    if s_idx > e_idx:
        return None

    content = "\n".join(lines[s_idx - 1 : e_idx])
    content_sha = compute_line_slice_sha256(lines, s_idx, e_idx)
    chunk_digest = fingerprint(relpath, str(s_idx), str(e_idx), content_sha)
    tokens = len(re.findall(r"[A-Za-z0-9_]+", content))

    return DocumentChunk(
        chunk_id=f"chk_{chunk_digest[:16]}",
        source_path=relpath,
        source_kind=source_kind,
        symbol_or_heading=symbol_or_heading,
        start_line=s_idx,
        end_line=e_idx,
        content=content,
        content_sha256=content_sha,
        token_count=tokens,
    )


def _window_lines(
    *,
    relpath: str,
    source_kind: SourceKind,
    symbol_or_heading: str,
    lines: list[str],
    start_line: int,
    end_line: int,
    max_chars: int,
    overlap_lines: int,
) -> list[DocumentChunk]:
    """Split a span [start_line..end_line] into bounded-size chunks with exact line numbers."""
    raw_len = sum(len(lines[i - 1]) + 1 for i in range(start_line, end_line + 1))
    if raw_len <= max_chars:
        single = _build_chunk(
            relpath=relpath,
            source_kind=source_kind,
            symbol_or_heading=symbol_or_heading,
            lines=lines,
            start_line=start_line,
            end_line=end_line,
        )
        return [single] if single is not None else []

    chunks: list[DocumentChunk] = []
    cursor = start_line
    part = 1
    while cursor <= end_line:
        char_acc = 0
        win_end = cursor
        while win_end <= end_line:
            line_chars = len(lines[win_end - 1]) + 1
            if win_end > cursor and char_acc + line_chars > max_chars:
                break
            char_acc += line_chars
            win_end += 1
        actual_end = win_end - 1
        label = symbol_or_heading if part == 1 else f"{symbol_or_heading} (part {part})"
        chunk = _build_chunk(
            relpath=relpath,
            source_kind=source_kind,
            symbol_or_heading=label,
            lines=lines,
            start_line=cursor,
            end_line=actual_end,
        )
        if chunk is not None:
            chunks.append(chunk)
        if actual_end >= end_line:
            break
        next_cursor = actual_end + 1 - overlap_lines
        cursor = max(cursor + 1, next_cursor)
        part += 1

    return chunks


def _chunk_markdown(
    relpath: str,
    source_kind: SourceKind,
    lines: list[str],
    max_chars: int,
    overlap_lines: int,
) -> list[DocumentChunk]:
    sections: list[tuple[str, int, int]] = []
    current_heading = Path(relpath).name
    section_start = 1

    for line_no, raw in enumerate(lines, start=1):
        match = _MD_HEADING_RE.match(raw)
        if match:
            if line_no > section_start:
                sections.append((current_heading, section_start, line_no - 1))
            current_heading = match.group(2).strip()
            section_start = line_no

    if section_start <= len(lines):
        sections.append((current_heading, section_start, len(lines)))

    output: list[DocumentChunk] = []
    for heading, s_line, e_line in sections:
        output.extend(
            _window_lines(
                relpath=relpath,
                source_kind=source_kind,
                symbol_or_heading=heading,
                lines=lines,
                start_line=s_line,
                end_line=e_line,
                max_chars=max_chars,
                overlap_lines=overlap_lines,
            )
        )
    return output


def _chunk_python(
    relpath: str,
    source_kind: SourceKind,
    source: str,
    lines: list[str],
    max_chars: int,
    overlap_lines: int,
) -> list[DocumentChunk]:
    try:
        tree = ast.parse(source, filename=relpath)
    except SyntaxError:
        return _window_lines(
            relpath=relpath,
            source_kind=source_kind,
            symbol_or_heading=Path(relpath).name,
            lines=lines,
            start_line=1,
            end_line=len(lines),
            max_chars=max_chars,
            overlap_lines=overlap_lines,
        )

    spans: list[tuple[str, int, int]] = []
    for node in tree.body:
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            decorator_lines = [dec.lineno for dec in node.decorator_list if hasattr(dec, "lineno")]
            start = min([node.lineno, *decorator_lines])
            end = getattr(node, "end_lineno", node.lineno) or node.lineno
            prefix = "class" if isinstance(node, ast.ClassDef) else "def"
            spans.append((f"{prefix} {node.name}", start, end))

    if not spans:
        return _window_lines(
            relpath=relpath,
            source_kind=source_kind,
            symbol_or_heading=f"module {Path(relpath).stem}",
            lines=lines,
            start_line=1,
            end_line=len(lines),
            max_chars=max_chars,
            overlap_lines=overlap_lines,
        )

    output: list[DocumentChunk] = []
    first_symbol_line = spans[0][1]
    if first_symbol_line > 1:
        output.extend(
            _window_lines(
                relpath=relpath,
                source_kind=source_kind,
                symbol_or_heading=f"module {Path(relpath).stem} (header)",
                lines=lines,
                start_line=1,
                end_line=first_symbol_line - 1,
                max_chars=max_chars,
                overlap_lines=overlap_lines,
            )
        )

    for label, s_line, e_line in spans:
        output.extend(
            _window_lines(
                relpath=relpath,
                source_kind=source_kind,
                symbol_or_heading=label,
                lines=lines,
                start_line=s_line,
                end_line=e_line,
                max_chars=max_chars,
                overlap_lines=overlap_lines,
            )
        )
    return output


def _chunk_generic(
    relpath: str,
    source_kind: SourceKind,
    lines: list[str],
    max_chars: int,
    overlap_lines: int,
) -> list[DocumentChunk]:
    if source_kind == "engine_code":
        boundaries: list[tuple[str, int]] = []
        for idx, line in enumerate(lines, start=1):
            match = _TS_SYMBOL_RE.match(line)
            if match:
                boundaries.append((match.group(1), idx))
        if boundaries:
            output: list[DocumentChunk] = []
            if boundaries[0][1] > 1:
                output.extend(
                    _window_lines(
                        relpath=relpath,
                        source_kind=source_kind,
                        symbol_or_heading=f"{Path(relpath).stem} (imports)",
                        lines=lines,
                        start_line=1,
                        end_line=boundaries[0][1] - 1,
                        max_chars=max_chars,
                        overlap_lines=overlap_lines,
                    )
                )
            for b_idx, (sym, s_line) in enumerate(boundaries):
                e_line = (
                    boundaries[b_idx + 1][1] - 1
                    if b_idx + 1 < len(boundaries)
                    else len(lines)
                )
                output.extend(
                    _window_lines(
                        relpath=relpath,
                        source_kind=source_kind,
                        symbol_or_heading=sym,
                        lines=lines,
                        start_line=s_line,
                        end_line=e_line,
                        max_chars=max_chars,
                        overlap_lines=overlap_lines,
                    )
                )
            return output

    return _window_lines(
        relpath=relpath,
        source_kind=source_kind,
        symbol_or_heading=Path(relpath).name,
        lines=lines,
        start_line=1,
        end_line=len(lines),
        max_chars=max_chars,
        overlap_lines=overlap_lines,
    )


def build_repository_corpus(
    repo_root: Path,
    *,
    max_chars: int = 1400,
    overlap_lines: int = 4,
) -> tuple[list[DocumentChunk], int, str]:
    """Scan ``repo_root`` and return ``(chunks, total_documents, corpus_fingerprint)``."""
    files = discover_repository_files(repo_root)
    chunks: list[DocumentChunk] = []
    file_digests: list[str] = []

    for abs_path, relpath, source_kind in files:
        try:
            raw = abs_path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        lines = raw.splitlines()
        if not lines:
            continue

        file_digests.append(f"{relpath}:{sha256_hex(raw.encode('utf-8'))}")
        if source_kind == "documentation":
            chunks.extend(_chunk_markdown(relpath, source_kind, lines, max_chars, overlap_lines))
        elif source_kind == "backend_code":
            chunks.extend(
                _chunk_python(relpath, source_kind, raw, lines, max_chars, overlap_lines)
            )
        else:
            chunks.extend(_chunk_generic(relpath, source_kind, lines, max_chars, overlap_lines))

    corpus_fp = sha256_hex("\n".join(file_digests).encode("utf-8"))[:24]
    return chunks, len(file_digests), corpus_fp
