"""Real sandboxed monorepo stage inspectors implementing ``PipelineStageInspectorPort``."""

from __future__ import annotations

import ast
import asyncio
import json
import re
import time
from collections.abc import Callable
from html.parser import HTMLParser
from pathlib import Path

from app.core.security import sha256_hex
from app.domains.pipelines_simulator.contracts import StageCheckOutcome
from app.domains.pipelines_simulator.schemas import (
    PipelineStageSpec,
    PipelineTargetId,
    StageArtifactFinding,
    StageExecutionStatus,
)

_LIVE_SECRET_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("OpenAI live key", re.compile(r"\bsk-(?:proj|live)-[A-Za-z0-9_-]{12,}")),
    ("GitHub personal token", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}")),
    ("AWS access key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
)
_TRACKER_RE = re.compile(r"\b(?:gtag|googletagmanager|plausible|fathom)\b", re.IGNORECASE)
_SENSITIVE_DOCKER_ENV_RE = re.compile(
    r"(?:SECRET|PASSWORD|API_KEY|PRIVATE_KEY|TOKEN)\s*=\s*([^\s\"']+)",
    re.IGNORECASE,
)
_TOML_LINE_LENGTH_RE = re.compile(r"^\s*line-length\s*=\s*(\d+)\s*$", re.MULTILINE)
_TOML_TARGET_VER_RE = re.compile(r'^\s*target-version\s*=\s*"([^"]+)"', re.MULTILINE)


class _PortfolioHtmlInspector(HTMLParser):
    """Extracts asset URLs, external runtime tags, and ``data-i18n`` keys from HTML."""

    def __init__(self) -> None:
        super().__init__()
        self.local_assets: list[str] = []
        self.external_runtime_assets: list[str] = []
        self.i18n_keys: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {k.lower(): (v or "") for k, v in attrs}
        i18n_key = attr_map.get("data-i18n", "").strip()
        if i18n_key:
            self.i18n_keys.append(i18n_key)

        ref = ""
        if tag in {"script", "img"}:
            ref = attr_map.get("src", "").strip()
        elif tag == "link":
            rel = attr_map.get("rel", "").lower()
            if "stylesheet" in rel or "icon" in rel or "preload" in rel:
                ref = attr_map.get("href", "").strip()

        if not ref or ref.startswith(("#", "data:", "mailto:", "javascript:")):
            return

        if ref.startswith(("http://", "https://", "//")):
            if tag in {"script", "link"}:
                self.external_runtime_assets.append(ref)
            return

        clean_ref = ref.split("?", 1)[0].split("#", 1)[0].lstrip("./")
        if clean_ref:
            self.local_assets.append(clean_ref)


def _resolve_repo_path(
    repo_root: Path,
    relpath: str,
    findings: list[StageArtifactFinding],
) -> Path | None:
    """Resolve ``relpath`` while guaranteeing strict containment inside ``repo_root``."""
    root_resolved = repo_root.resolve()
    candidate = (repo_root / relpath).resolve()
    if not candidate.is_relative_to(root_resolved):
        findings.append(
            StageArtifactFinding(
                code="PATH_TRAVERSAL_BLOCKED",
                severity="error",
                file_path=relpath,
                message=f"Resolved path '{relpath}' escapes repository root containment.",
                remediation="Remove symlinks or relative segments pointing outside repo_root.",
            )
        )
        return None
    return candidate


def _parse_dockerfile_instructions(content: str) -> list[tuple[int, str, str]]:
    """Join continuation lines and return ``(line_number, INSTRUCTION, arguments)``."""
    instructions: list[tuple[int, str, str]] = []
    buffer = ""
    start_line = 1

    for idx, raw_line in enumerate(content.splitlines(), start=1):
        stripped = raw_line.strip()
        if not buffer:
            if not stripped or stripped.startswith("#"):
                continue
            start_line = idx

        if stripped.startswith("#"):
            continue

        if stripped.endswith("\\"):
            buffer += stripped[:-1].rstrip() + " "
            continue

        buffer += stripped
        parts = buffer.strip().split(None, 1)
        if parts:
            instr = parts[0].upper()
            rest = parts[1].strip() if len(parts) > 1 else ""
            instructions.append((start_line, instr, rest))
        buffer = ""

    if buffer.strip():
        parts = buffer.strip().split(None, 1)
        instructions.append(
            (start_line, parts[0].upper(), parts[1].strip() if len(parts) > 1 else "")
        )
    return instructions


def _finalize_outcome(
    stage_id: str,
    started_ns: int,
    *,
    inspected_files: list[str],
    metrics: dict[str, int | float | str | bool],
    findings: list[StageArtifactFinding],
    logs: list[str],
) -> StageCheckOutcome:
    duration_ms = round((time.perf_counter_ns() - started_ns) / 1_000_000, 3)
    has_errors = any(item.severity == "error" for item in findings)
    status = StageExecutionStatus.FAILED if has_errors else StageExecutionStatus.PASSED
    return StageCheckOutcome(
        stage_id=stage_id,
        status=status,
        duration_ms=duration_ms,
        logs=tuple(logs),
        inspected_files=tuple(dict.fromkeys(inspected_files)),
        metrics=metrics,
        findings=tuple(findings),
    )


class RepositoryStageInspector:
    """Executes real manifest, AST, Dockerfile, bundle, and static security audits."""

    async def inspect_stage(
        self,
        *,
        repo_root: Path,
        target_id: PipelineTargetId,
        stage: PipelineStageSpec,
    ) -> StageCheckOutcome:
        return await asyncio.to_thread(
            self._inspect_stage_sync,
            repo_root,
            target_id,
            stage,
        )

    def _inspect_stage_sync(
        self,
        repo_root: Path,
        target_id: PipelineTargetId,
        stage: PipelineStageSpec,
    ) -> StageCheckOutcome:
        dispatch: dict[tuple[PipelineTargetId, str], Callable[[Path], StageCheckOutcome]] = {
            (PipelineTargetId.BACKEND_API, "ruff-lint"): self._audit_backend_lint,
            (PipelineTargetId.BACKEND_API, "pytest-suite"): self._audit_backend_pytest,
            (PipelineTargetId.BACKEND_API, "docker-audit"): self._audit_backend_dockerfile,
            (PipelineTargetId.ASCII_ENGINE, "ts-typecheck"): self._audit_engine_typecheck,
            (PipelineTargetId.ASCII_ENGINE, "bundle-integrity"): self._audit_engine_bundle,
            (PipelineTargetId.PORTFOLIO_STATIC, "static-contracts"): self._audit_static_contracts,
            (PipelineTargetId.PORTFOLIO_STATIC, "security-audit"): self._audit_static_security,
        }
        handler = dispatch.get((target_id, stage.stage_id))
        if handler is None:
            started_ns = time.perf_counter_ns()
            finding = StageArtifactFinding(
                code="UNSUPPORTED_PIPELINE_STAGE",
                severity="error",
                file_path=".",
                message=f"No inspector registered for {target_id.value}:{stage.stage_id}.",
                remediation="Register a real inspector handler for this target stage.",
            )
            return _finalize_outcome(
                stage.stage_id,
                started_ns,
                inspected_files=[],
                metrics={},
                findings=[finding],
                logs=[f"[ERROR] Unsupported stage {stage.stage_id} for {target_id.value}."],
            )
        return handler(repo_root)

    def _audit_backend_lint(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        pyproject_rel = "backend/pyproject.toml"
        pyproject_path = _resolve_repo_path(repo_root, pyproject_rel, findings)
        line_limit = 100
        target_version = "unknown"

        if pyproject_path is None or not pyproject_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="MANIFEST_MISSING",
                    severity="error",
                    file_path=pyproject_rel,
                    message="Backend manifest backend/pyproject.toml was not found.",
                    remediation="Create backend/pyproject.toml with Ruff and Python >=3.10 config.",
                )
            )
        else:
            inspected.append(pyproject_rel)
            raw_toml = pyproject_path.read_text(encoding="utf-8")
            ll_match = _TOML_LINE_LENGTH_RE.search(raw_toml)
            if ll_match:
                line_limit = int(ll_match.group(1))
            tv_match = _TOML_TARGET_VER_RE.search(raw_toml)
            if tv_match:
                target_version = tv_match.group(1)
            if ">=3.10" not in raw_toml and target_version != "py310":
                findings.append(
                    StageArtifactFinding(
                        code="PY310_TARGET_MISCONFIGURED",
                        severity="error",
                        file_path=pyproject_rel,
                        message="pyproject.toml does not enforce Python >=3.10 / target py310.",
                        remediation='Set requires-python = ">=3.10" and target-version = "py310".',
                    )
                )
            logs.append(
                f"Loaded {pyproject_rel} (target={target_version}, line_limit={line_limit})."
            )

        app_dir = _resolve_repo_path(repo_root, "backend/app", findings)
        tests_dir = _resolve_repo_path(repo_root, "backend/tests", findings)
        py_files: list[tuple[Path, bool]] = []
        if app_dir and app_dir.is_dir():
            py_files.extend((p, True) for p in sorted(app_dir.rglob("*.py")))
        else:
            findings.append(
                StageArtifactFinding(
                    code="SOURCE_TREE_MISSING",
                    severity="error",
                    file_path="backend/app",
                    message="Directory backend/app is missing.",
                    remediation="Ensure FastAPI application package exists under backend/app.",
                )
            )
        if tests_dir and tests_dir.is_dir():
            py_files.extend((p, False) for p in sorted(tests_dir.rglob("*.py")))

        root_resolved = repo_root.resolve()
        total_loc = 0
        max_line_seen = 0
        parsed_count = 0

        for py_path, is_app_code in py_files:
            resolved = py_path.resolve()
            if not resolved.is_relative_to(root_resolved):
                findings.append(
                    StageArtifactFinding(
                        code="PATH_TRAVERSAL_BLOCKED",
                        severity="error",
                        file_path=str(py_path),
                        message="Python file symlink points outside repository root.",
                        remediation="Replace external symlink with an in-repo source file.",
                    )
                )
                continue

            rel = resolved.relative_to(root_resolved).as_posix()
            inspected.append(rel)
            source = resolved.read_text(encoding="utf-8")
            lines = source.splitlines()
            total_loc += len(lines)

            for line_no, line in enumerate(lines, start=1):
                effective = re.sub(r"\s+#\s*(?:noqa|type:\s*ignore)\b.*$", "", line)
                length = len(effective)
                if length > max_line_seen:
                    max_line_seen = length
                if length > line_limit:
                    findings.append(
                        StageArtifactFinding(
                            code="LINE_LENGTH_EXCEEDED",
                            severity="error",
                            file_path=rel,
                            line=line_no,
                            message=f"Line length {length} exceeds configured limit {line_limit}.",
                            remediation=f"Wrap line {line_no} in {rel} to <= {line_limit} chars.",
                        )
                    )

            try:
                tree = ast.parse(source, filename=rel)
                parsed_count += 1
            except SyntaxError as exc:
                findings.append(
                    StageArtifactFinding(
                        code="PYTHON_SYNTAX_ERROR",
                        severity="error",
                        file_path=rel,
                        line=exc.lineno,
                        message=f"Python syntax error: {exc.msg}.",
                        remediation=f"Fix syntax error at {rel}:{exc.lineno}.",
                    )
                )
                continue

            if is_app_code:
                for node in ast.walk(tree):
                    if isinstance(node, ast.ImportFrom) and node.module == "datetime":
                        names = {alias.name for alias in node.names}
                        if "UTC" in names:
                            findings.append(
                                StageArtifactFinding(
                                    code="PY310_DATETIME_UTC_IMPORT",
                                    severity="error",
                                    file_path=rel,
                                    line=node.lineno,
                                    message="Direct 'from datetime import UTC' breaks Python 3.10.",
                                    remediation="Import UTC from app.core.time instead.",
                                )
                            )
                    if isinstance(node, ast.Import) and any(
                        alias.name == "pickle" for alias in node.names
                    ):
                        findings.append(
                            StageArtifactFinding(
                                code="UNSAFE_PICKLE_IMPORT",
                                severity="error",
                                file_path=rel,
                                line=node.lineno,
                                message="Unsafe pickle module imported inside backend/app.",
                                remediation="Use safe JSON/Pydantic serialization instead.",
                            )
                        )
                    if isinstance(node, ast.ImportFrom) and node.module == "pickle":
                        findings.append(
                            StageArtifactFinding(
                                code="UNSAFE_PICKLE_IMPORT",
                                severity="error",
                                file_path=rel,
                                line=node.lineno,
                                message="Unsafe pickle symbol imported inside backend/app.",
                                remediation="Use safe JSON/Pydantic serialization instead.",
                            )
                        )

        logs.append(
            f"Parsed {parsed_count} Python ASTs ({total_loc} LOC, max_line={max_line_seen})."
        )
        return _finalize_outcome(
            "ruff-lint",
            started_ns,
            inspected_files=inspected,
            metrics={
                "python_files_parsed": parsed_count,
                "total_loc": total_loc,
                "max_line_length_observed": max_line_seen,
                "configured_line_limit": line_limit,
                "target_version": target_version,
            },
            findings=findings,
            logs=logs,
        )

    def _audit_backend_pytest(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        for req_rel in ("backend/requirements.txt", "backend/requirements-dev.txt"):
            req_path = _resolve_repo_path(repo_root, req_rel, findings)
            is_empty = (
                req_path is None
                or not req_path.is_file()
                or not req_path.read_text("utf-8").strip()
            )
            if is_empty:
                findings.append(
                    StageArtifactFinding(
                        code="REQUIREMENTS_MISSING",
                        severity="error",
                        file_path=req_rel,
                        message=f"Required dependency manifest {req_rel} is missing or empty.",
                        remediation=f"Populate {req_rel} with pinned package constraints.",
                    )
                )
            else:
                inspected.append(req_rel)

        ci_rel = ".github/workflows/ci-cd.yml"
        ci_path = _resolve_repo_path(repo_root, ci_rel, findings)
        if ci_path is None or not ci_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="WORKFLOW_MANIFEST_MISSING",
                    severity="error",
                    file_path=ci_rel,
                    message="Backend CI/CD workflow .github/workflows/ci-cd.yml is missing.",
                    remediation="Restore ci-cd.yml with Ruff, pytest, and Docker steps.",
                )
            )
        else:
            inspected.append(ci_rel)
            ci_body = ci_path.read_text(encoding="utf-8")
            if "pytest" not in ci_body or "ruff" not in ci_body:
                findings.append(
                    StageArtifactFinding(
                        code="CI_MISSING_PYTEST_OR_RUFF",
                        severity="error",
                        file_path=ci_rel,
                        message="ci-cd.yml does not invoke both ruff and pytest.",
                        remediation="Add ruff check and pytest execution steps to ci-cd.yml.",
                    )
                )

        tests_root = _resolve_repo_path(repo_root, "backend/tests", findings)
        root_resolved = repo_root.resolve()
        unit_files = 0
        integration_files = 0
        test_functions = 0

        if tests_root is None or not tests_root.is_dir():
            findings.append(
                StageArtifactFinding(
                    code="PYTEST_SUITE_EMPTY",
                    severity="error",
                    file_path="backend/tests",
                    message="Directory backend/tests was not found.",
                    remediation="Create backend/tests/unit and backend/tests/integration suites.",
                )
            )
        else:
            for test_file in sorted(tests_root.rglob("test_*.py")):
                resolved = test_file.resolve()
                if not resolved.is_relative_to(root_resolved):
                    continue
                rel = resolved.relative_to(root_resolved).as_posix()
                inspected.append(rel)
                if "/unit/" in rel:
                    unit_files += 1
                elif "/integration/" in rel:
                    integration_files += 1

                try:
                    tree = ast.parse(resolved.read_text(encoding="utf-8"), filename=rel)
                except SyntaxError as exc:
                    findings.append(
                        StageArtifactFinding(
                            code="PYTHON_SYNTAX_ERROR",
                            severity="error",
                            file_path=rel,
                            line=exc.lineno,
                            message=f"Syntax error in test module: {exc.msg}.",
                            remediation=f"Fix syntax error in {rel}:{exc.lineno}.",
                        )
                    )
                    continue

                for node in ast.walk(tree):
                    if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and (
                        node.name.startswith("test_")
                    ):
                        test_functions += 1

            if test_functions == 0 or unit_files == 0 or integration_files == 0:
                findings.append(
                    StageArtifactFinding(
                        code="PYTEST_SUITE_INCOMPLETE",
                        severity="error",
                        file_path="backend/tests",
                        message=(
                            f"Incomplete test topology (functions={test_functions}, "
                            f"unit_files={unit_files}, integration_files={integration_files})."
                        ),
                        remediation="Maintain non-empty unit and integration pytest test suites.",
                    )
                )

        logs.append(
            f"Discovered {test_functions} test cases across "
            f"{unit_files} unit and {integration_files} integration modules."
        )
        return _finalize_outcome(
            "pytest-suite",
            started_ns,
            inspected_files=inspected,
            metrics={
                "test_functions_discovered": test_functions,
                "unit_test_files": unit_files,
                "integration_test_files": integration_files,
            },
            findings=findings,
            logs=logs,
        )

    def _audit_backend_dockerfile(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        docker_rel = "infra/docker/Dockerfile"
        docker_path = _resolve_repo_path(repo_root, docker_rel, findings)
        if docker_path is None or not docker_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="DOCKERFILE_MISSING",
                    severity="error",
                    file_path=docker_rel,
                    message="Backend Dockerfile infra/docker/Dockerfile does not exist.",
                    remediation="Create infra/docker/Dockerfile with pinned base and USER.",
                )
            )
            return _finalize_outcome(
                "docker-audit",
                started_ns,
                inspected_files=inspected,
                metrics={"instructions_count": 0},
                findings=findings,
                logs=["[ERROR] Missing infra/docker/Dockerfile."],
            )

        inspected.append(docker_rel)
        instructions = _parse_dockerfile_instructions(docker_path.read_text(encoding="utf-8"))

        stages_count = 0
        final_user = "root"
        has_healthcheck = False
        exposed_ports: list[str] = []
        has_exec_cmd = False
        has_any_cmd = False

        for line_no, instr, args in instructions:
            if instr == "FROM":
                stages_count += 1
                final_user = "root"
                image_ref = args.split()[0] if args.split() else ""
                if image_ref.lower() != "scratch" and (
                    ":" not in image_ref and "@" not in image_ref or image_ref.endswith(":latest")
                ):
                    findings.append(
                        StageArtifactFinding(
                            code="DOCKER_UNPINNED_BASE_IMAGE",
                            severity="error",
                            file_path=docker_rel,
                            line=line_no,
                            message=f"Base image '{image_ref}' is unpinned or uses ':latest'.",
                            remediation="Pin the base image to an explicit version tag or digest.",
                        )
                    )
            elif instr == "USER":
                final_user = args.split()[0] if args.split() else "root"
            elif instr == "HEALTHCHECK":
                if args.upper() != "NONE":
                    has_healthcheck = True
            elif instr == "EXPOSE":
                exposed_ports.extend(args.split())
            elif instr in {"CMD", "ENTRYPOINT"}:
                has_any_cmd = True
                if args.startswith("[") and args.endswith("]"):
                    has_exec_cmd = True
                else:
                    findings.append(
                        StageArtifactFinding(
                            code="DOCKER_SHELL_FORM_CMD",
                            severity="error",
                            file_path=docker_rel,
                            line=line_no,
                            message=f"{instr} uses shell form instead of JSON exec array.",
                            remediation=f'Convert {instr} to exec array (e.g. ["uvicorn", ...]).',
                        )
                    )
            elif instr == "ENV":
                secret_match = _SENSITIVE_DOCKER_ENV_RE.search(args)
                if secret_match:
                    findings.append(
                        StageArtifactFinding(
                            code="DOCKER_SECRET_IN_ENV",
                            severity="error",
                            file_path=docker_rel,
                            line=line_no,
                            message="Sensitive credential appears hardcoded in Dockerfile ENV.",
                            remediation="Inject secrets at runtime via environment/secret manager.",
                        )
                    )
            elif instr == "COPY":
                tokens = [tok for tok in args.split() if not tok.startswith("--")]
                has_from_stage = any(tok.startswith("--from=") for tok in args.split())
                if not has_from_stage and len(tokens) >= 2:
                    for src_tok in tokens[:-1]:
                        clean_src = src_tok.rstrip("/") or "."
                        if clean_src == ".":
                            continue
                        src_path = _resolve_repo_path(repo_root, clean_src, findings)
                        if src_path is None or not src_path.exists():
                            findings.append(
                                StageArtifactFinding(
                                    code="DOCKER_COPY_SOURCE_MISSING",
                                    severity="error",
                                    file_path=docker_rel,
                                    line=line_no,
                                    message=f"COPY source '{src_tok}' does not exist in repo.",
                                    remediation=f"Ensure '{src_tok}' exists or update COPY path.",
                                )
                            )

        if stages_count == 0:
            findings.append(
                StageArtifactFinding(
                    code="DOCKER_MISSING_FROM",
                    severity="error",
                    file_path=docker_rel,
                    message="Dockerfile contains no FROM instruction.",
                    remediation="Define a valid FROM base image instruction.",
                )
            )
        if final_user.lower() in {"root", "0", ""}:
            findings.append(
                StageArtifactFinding(
                    code="DOCKER_RUNS_AS_ROOT",
                    severity="error",
                    file_path=docker_rel,
                    message="Final container stage runs as root instead of an unprivileged user.",
                    remediation="Create and switch to a non-root USER before CMD/ENTRYPOINT.",
                )
            )
        if not has_healthcheck:
            findings.append(
                StageArtifactFinding(
                    code="DOCKER_MISSING_HEALTHCHECK",
                    severity="error",
                    file_path=docker_rel,
                    message="Backend Dockerfile lacks an active HEALTHCHECK probe.",
                    remediation="Add a HEALTHCHECK probing /api/v1/health.",
                )
            )
        if not exposed_ports:
            findings.append(
                StageArtifactFinding(
                    code="DOCKER_MISSING_EXPOSE",
                    severity="error",
                    file_path=docker_rel,
                    message="Backend Dockerfile does not declare EXPOSE port.",
                    remediation="Add EXPOSE 8000 to document container runtime port.",
                )
            )
        if not has_any_cmd:
            findings.append(
                StageArtifactFinding(
                    code="DOCKER_MISSING_ENTRYPOINT",
                    severity="error",
                    file_path=docker_rel,
                    message="Dockerfile defines neither CMD nor ENTRYPOINT.",
                    remediation="Define an exec-form CMD or ENTRYPOINT.",
                )
            )

        logs.append(
            f"Audited {docker_rel}: {len(instructions)} instructions, "
            f"user={final_user}, healthcheck={has_healthcheck}, ports={exposed_ports}."
        )
        return _finalize_outcome(
            "docker-audit",
            started_ns,
            inspected_files=inspected,
            metrics={
                "instructions_count": len(instructions),
                "stages_count": stages_count,
                "final_user": final_user,
                "has_healthcheck": has_healthcheck,
                "exec_form_entrypoint": has_exec_cmd,
                "exposed_ports": ",".join(exposed_ports),
            },
            findings=findings,
            logs=logs,
        )

    def _audit_engine_typecheck(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        pkg_rel = "ascii-engine-module/package.json"
        tsconfig_rel = "ascii-engine-module/tsconfig.json"
        ci_rel = ".github/workflows/ci.yml"
        strict_mode = False
        scripts_count = 0

        pkg_path = _resolve_repo_path(repo_root, pkg_rel, findings)
        if pkg_path is None or not pkg_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="MANIFEST_MISSING",
                    severity="error",
                    file_path=pkg_rel,
                    message=f"Engine manifest {pkg_rel} does not exist.",
                    remediation=f"Restore {pkg_rel} with typecheck and build scripts.",
                )
            )
        else:
            inspected.append(pkg_rel)
            try:
                pkg_data = json.loads(pkg_path.read_text(encoding="utf-8"))
                scripts = pkg_data.get("scripts") or {}
                scripts_count = len(scripts)
                for req_script in ("typecheck", "build:portfolio"):
                    if req_script not in scripts:
                        findings.append(
                            StageArtifactFinding(
                                code="TS_SCRIPT_MISSING",
                                severity="error",
                                file_path=pkg_rel,
                                message=f"Required npm script '{req_script}' missing in {pkg_rel}.",
                                remediation=f"Define '{req_script}' under scripts in {pkg_rel}.",
                            )
                        )
            except json.JSONDecodeError as exc:
                findings.append(
                    StageArtifactFinding(
                        code="MANIFEST_INVALID_JSON",
                        severity="error",
                        file_path=pkg_rel,
                        line=exc.lineno,
                        message=f"Invalid JSON in {pkg_rel}: {exc.msg}.",
                        remediation=f"Fix JSON syntax in {pkg_rel}.",
                    )
                )

        tsconfig_path = _resolve_repo_path(repo_root, tsconfig_rel, findings)
        if tsconfig_path is None or not tsconfig_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="TSCONFIG_MISSING",
                    severity="error",
                    file_path=tsconfig_rel,
                    message=f"TypeScript configuration {tsconfig_rel} is missing.",
                    remediation=f"Create {tsconfig_rel} with compilerOptions.strict = true.",
                )
            )
        else:
            inspected.append(tsconfig_rel)
            try:
                ts_data = json.loads(tsconfig_path.read_text(encoding="utf-8"))
                strict_mode = bool((ts_data.get("compilerOptions") or {}).get("strict"))
                if not strict_mode:
                    findings.append(
                        StageArtifactFinding(
                            code="TS_STRICT_DISABLED",
                            severity="error",
                            file_path=tsconfig_rel,
                            message="TypeScript strict mode is not enabled in tsconfig.json.",
                            remediation='Enable "strict": true in compilerOptions.',
                        )
                    )
            except json.JSONDecodeError as exc:
                findings.append(
                    StageArtifactFinding(
                        code="MANIFEST_INVALID_JSON",
                        severity="error",
                        file_path=tsconfig_rel,
                        line=exc.lineno,
                        message=f"Invalid JSON in {tsconfig_rel}: {exc.msg}.",
                        remediation=f"Fix JSON syntax in {tsconfig_rel}.",
                    )
                )

        src_dir = _resolve_repo_path(repo_root, "ascii-engine-module/src", findings)
        ts_files = sorted(src_dir.rglob("*.ts")) if src_dir and src_dir.is_dir() else []
        index_ts = _resolve_repo_path(repo_root, "ascii-engine-module/src/index.ts", findings)
        if not ts_files or index_ts is None or not index_ts.is_file():
            findings.append(
                StageArtifactFinding(
                    code="TS_SOURCE_TREE_MISSING",
                    severity="error",
                    file_path="ascii-engine-module/src/index.ts",
                    message="TypeScript engine source entrypoint src/index.ts is missing.",
                    remediation="Ensure ascii-engine-module/src/index.ts and modules exist.",
                )
            )
        else:
            inspected.append("ascii-engine-module/src/index.ts")

        ci_path = _resolve_repo_path(repo_root, ci_rel, findings)
        if ci_path is None or not ci_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="WORKFLOW_MANIFEST_MISSING",
                    severity="error",
                    file_path=ci_rel,
                    message=f"Engine CI workflow {ci_rel} was not found.",
                    remediation=f"Restore {ci_rel} to gate engine builds on pull requests.",
                )
            )
        else:
            inspected.append(ci_rel)

        total_ts_bytes = sum(p.stat().st_size for p in ts_files if p.is_file())
        logs.append(
            f"Verified {len(ts_files)} TypeScript modules "
            f"({total_ts_bytes} bytes, strict={strict_mode})."
        )
        return _finalize_outcome(
            "ts-typecheck",
            started_ns,
            inspected_files=inspected,
            metrics={
                "ts_source_files": len(ts_files),
                "total_ts_bytes": total_ts_bytes,
                "strict_mode": strict_mode,
                "scripts_count": scripts_count,
            },
            findings=findings,
            logs=logs,
        )

    def _audit_engine_bundle(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        bundle_rel = "assets/js/ascii-engine.bundle.js"
        adapter_rel = "assets/js/engine-adapter.js"
        bundle_size = 0
        bundle_digest = ""
        adapter_size = 0

        bundle_path = _resolve_repo_path(repo_root, bundle_rel, findings)
        if bundle_path is None or not bundle_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="BUNDLE_EMPTY_OR_MISSING",
                    severity="error",
                    file_path=bundle_rel,
                    message=f"Built portfolio bundle {bundle_rel} is missing.",
                    remediation="Run npm --prefix ascii-engine-module run build:portfolio.",
                )
            )
        else:
            inspected.append(bundle_rel)
            raw_bytes = bundle_path.read_bytes()
            bundle_size = len(raw_bytes)
            bundle_digest = sha256_hex(raw_bytes)[:16]
            bundle_text = raw_bytes.decode("utf-8", errors="replace")
            if bundle_size < 1024:
                findings.append(
                    StageArtifactFinding(
                        code="BUNDLE_EMPTY_OR_MISSING",
                        severity="error",
                        file_path=bundle_rel,
                        message=f"Bundle {bundle_rel} is unexpectedly small ({bundle_size} bytes).",
                        remediation="Rebuild the IIFE bundle from ascii-engine-module.",
                    )
                )
            for symbol in ("AsciiEngineCore", "TuxEntityFactory", "World"):
                if symbol not in bundle_text:
                    findings.append(
                        StageArtifactFinding(
                            code="BUNDLE_MISSING_ENGINE_EXPORTS",
                            severity="error",
                            file_path=bundle_rel,
                            message=f"Public engine facade symbol '{symbol}' missing from bundle.",
                            remediation="Re-export the full facade in integration-entry.ts.",
                        )
                    )

        adapter_path = _resolve_repo_path(repo_root, adapter_rel, findings)
        if adapter_path is None or not adapter_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="ADAPTER_BUNDLE_DISCONNECTED",
                    severity="error",
                    file_path=adapter_rel,
                    message=f"Adapter {adapter_rel} was not found.",
                    remediation=f"Restore {adapter_rel} linking the UI to ascii-engine.bundle.js.",
                )
            )
        else:
            inspected.append(adapter_rel)
            adapter_text = adapter_path.read_text(encoding="utf-8")
            adapter_size = len(adapter_text.encode("utf-8"))
            if "assets/js/ascii-engine.bundle.js" not in adapter_text:
                findings.append(
                    StageArtifactFinding(
                        code="ADAPTER_BUNDLE_DISCONNECTED",
                        severity="error",
                        file_path=adapter_rel,
                        message="engine-adapter.js does not load assets/js/ascii-engine.bundle.js.",
                        remediation="Reference assets/js/ascii-engine.bundle.js in engine-adapter.",
                    )
                )

        logs.append(
            f"Bundle {bundle_rel}: {bundle_size} bytes (sha256={bundle_digest or 'none'})."
        )
        return _finalize_outcome(
            "bundle-integrity",
            started_ns,
            inspected_files=inspected,
            metrics={
                "bundle_size_bytes": bundle_size,
                "bundle_sha256_prefix": bundle_digest,
                "adapter_size_bytes": adapter_size,
            },
            findings=findings,
            logs=logs,
        )

    def _audit_static_contracts(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        index_rel = "index.html"
        pt_rel = "assets/i18n/pt-br.json"
        en_rel = "assets/i18n/en.json"
        pages_rel = ".github/workflows/pages.yml"

        parser = _PortfolioHtmlInspector()
        index_path = _resolve_repo_path(repo_root, index_rel, findings)
        if index_path is None or not index_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="MANIFEST_MISSING",
                    severity="error",
                    file_path=index_rel,
                    message="Static portfolio entrypoint index.html is missing.",
                    remediation="Restore index.html at the repository root.",
                )
            )
        else:
            inspected.append(index_rel)
            parser.feed(index_path.read_text(encoding="utf-8"))
            for asset_rel in dict.fromkeys(parser.local_assets):
                asset_path = _resolve_repo_path(repo_root, asset_rel, findings)
                if asset_path is None or not asset_path.is_file():
                    findings.append(
                        StageArtifactFinding(
                            code="STATIC_BROKEN_ASSET_REF",
                            severity="error",
                            file_path=index_rel,
                            message=f"Referenced local asset '{asset_rel}' does not exist.",
                            remediation=f"Add '{asset_rel}' or update the tag in index.html.",
                        )
                    )
                else:
                    inspected.append(asset_rel)

        pt_keys: set[str] = set()
        en_keys: set[str] = set()
        for rel, target_set in ((pt_rel, pt_keys), (en_rel, en_keys)):
            i18n_path = _resolve_repo_path(repo_root, rel, findings)
            if i18n_path is None or not i18n_path.is_file():
                findings.append(
                    StageArtifactFinding(
                        code="I18N_DICTIONARY_MISSING",
                        severity="error",
                        file_path=rel,
                        message=f"Translation dictionary {rel} is missing.",
                        remediation=f"Restore {rel} with synchronized translation keys.",
                    )
                )
            else:
                inspected.append(rel)
                try:
                    loaded = json.loads(i18n_path.read_text(encoding="utf-8"))
                    if isinstance(loaded, dict):
                        target_set.update(loaded.keys())
                except json.JSONDecodeError as exc:
                    findings.append(
                        StageArtifactFinding(
                            code="MANIFEST_INVALID_JSON",
                            severity="error",
                            file_path=rel,
                            line=exc.lineno,
                            message=f"Invalid JSON in {rel}: {exc.msg}.",
                            remediation=f"Fix JSON formatting in {rel}.",
                        )
                    )

        if pt_keys and en_keys and pt_keys != en_keys:
            drift = sorted(pt_keys ^ en_keys)[:5]
            findings.append(
                StageArtifactFinding(
                    code="I18N_KEY_DRIFT",
                    severity="error",
                    file_path=pt_rel,
                    message=f"pt-br and en dictionaries differ on keys: {', '.join(drift)}.",
                    remediation="Synchronize translation keys across pt-br.json and en.json.",
                )
            )

        if pt_keys:
            for hook_key in dict.fromkeys(parser.i18n_keys):
                if hook_key not in pt_keys:
                    findings.append(
                        StageArtifactFinding(
                            code="I18N_MISSING_TRANSLATION_KEY",
                            severity="error",
                            file_path=index_rel,
                            message=f"HTML data-i18n key '{hook_key}' is absent from pt-br.json.",
                            remediation=f"Add '{hook_key}' to pt-br.json, en.json, and i18n.js.",
                        )
                    )

        pages_path = _resolve_repo_path(repo_root, pages_rel, findings)
        if pages_path is None or not pages_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="WORKFLOW_MANIFEST_MISSING",
                    severity="error",
                    file_path=pages_rel,
                    message=f"GitHub Pages workflow {pages_rel} is missing.",
                    remediation=f"Restore {pages_rel} for static artifact deployment.",
                )
            )
        else:
            inspected.append(pages_rel)

        logs.append(
            f"Verified {len(set(parser.local_assets))} local assets, "
            f"{len(pt_keys)} i18n keys, and {len(set(parser.i18n_keys))} HTML hooks."
        )
        return _finalize_outcome(
            "static-contracts",
            started_ns,
            inspected_files=inspected,
            metrics={
                "referenced_assets_verified": len(set(parser.local_assets)),
                "i18n_key_count": len(pt_keys),
                "data_i18n_hooks_verified": len(set(parser.i18n_keys)),
            },
            findings=findings,
            logs=logs,
        )

    def _audit_static_security(self, repo_root: Path) -> StageCheckOutcome:
        started_ns = time.perf_counter_ns()
        findings: list[StageArtifactFinding] = []
        inspected: list[str] = []
        logs: list[str] = []

        index_rel = "index.html"
        env_rel = ".env.example"
        root_docker_rel = "Dockerfile"
        external_assets_count = 0
        env_keys_count = 0
        scoped_copy = True

        index_path = _resolve_repo_path(repo_root, index_rel, findings)
        if index_path is not None and index_path.is_file():
            inspected.append(index_rel)
            html_body = index_path.read_text(encoding="utf-8")
            parser = _PortfolioHtmlInspector()
            parser.feed(html_body)
            external_assets_count = len(parser.external_runtime_assets)
            for ext_url in parser.external_runtime_assets:
                findings.append(
                    StageArtifactFinding(
                        code="STATIC_EXTERNAL_CDN_ASSET",
                        severity="error",
                        file_path=index_rel,
                        message=f"External runtime asset '{ext_url}' violates zero-CDN policy.",
                        remediation="Vendor runtime assets locally under assets/.",
                    )
                )
            if _TRACKER_RE.search(html_body):
                findings.append(
                    StageArtifactFinding(
                        code="STATIC_TRACKER_DETECTED",
                        severity="error",
                        file_path=index_rel,
                        message="Third-party analytics tracker script detected in index.html.",
                        remediation="Remove external analytics/tracking snippets from index.html.",
                    )
                )

        env_path = _resolve_repo_path(repo_root, env_rel, findings)
        if env_path is None or not env_path.is_file():
            findings.append(
                StageArtifactFinding(
                    code="ENV_EXAMPLE_MISSING",
                    severity="error",
                    file_path=env_rel,
                    message=".env.example template is missing from repository root.",
                    remediation="Provide a sanitized .env.example documenting required variables.",
                )
            )
        else:
            inspected.append(env_rel)
            env_text = env_path.read_text(encoding="utf-8")
            for line_no, raw_line in enumerate(env_text.splitlines(), start=1):
                stripped = raw_line.strip()
                if stripped and not stripped.startswith("#") and "=" in stripped:
                    env_keys_count += 1
                for label, pattern in _LIVE_SECRET_PATTERNS:
                    if pattern.search(raw_line):
                        findings.append(
                            StageArtifactFinding(
                                code="SECRET_LIVE_TOKEN_DETECTED",
                                severity="error",
                                file_path=env_rel,
                                line=line_no,
                                message=f"Potential live credential ({label}) found in {env_rel}.",
                                remediation="Replace live tokens with dev-only placeholders.",
                            )
                        )

        docker_path = _resolve_repo_path(repo_root, root_docker_rel, findings)
        if docker_path is not None and docker_path.is_file():
            inspected.append(root_docker_rel)
            for line_no, instr, args in _parse_dockerfile_instructions(
                docker_path.read_text(encoding="utf-8")
            ):
                if instr != "COPY":
                    continue
                tokens = [tok for tok in args.split() if not tok.startswith("--")]
                if len(tokens) >= 2:
                    for src_tok in tokens[:-1]:
                        if src_tok in {".", "./"}:
                            scoped_copy = False
                            findings.append(
                                StageArtifactFinding(
                                    code="DOCKER_UNSCOPED_ROOT_COPY",
                                    severity="error",
                                    file_path=root_docker_rel,
                                    line=line_no,
                                    message="Root Dockerfile uses unscoped 'COPY .'.",
                                    remediation="Copy only explicit static allowlist paths.",
                                )
                            )
                        else:
                            clean_src = src_tok.rstrip("/")
                            src_path = _resolve_repo_path(repo_root, clean_src, findings)
                            if src_path is None or not src_path.exists():
                                findings.append(
                                    StageArtifactFinding(
                                        code="DOCKER_COPY_SOURCE_MISSING",
                                        severity="error",
                                        file_path=root_docker_rel,
                                        line=line_no,
                                        message=f"Root Dockerfile COPY source '{src_tok}' missing.",
                                        remediation=f"Restore '{src_tok}' or update Dockerfile.",
                                    )
                                )

        logs.append(
            f"Security audit complete: external_assets={external_assets_count}, "
            f"env_keys={env_keys_count}, dockerfile_scoped_copy={scoped_copy}."
        )
        return _finalize_outcome(
            "security-audit",
            started_ns,
            inspected_files=inspected,
            metrics={
                "external_runtime_assets": external_assets_count,
                "env_example_keys": env_keys_count,
                "dockerfile_scoped_copy": scoped_copy,
            },
            findings=findings,
            logs=logs,
        )
