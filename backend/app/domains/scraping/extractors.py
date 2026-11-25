"""Concrete HTML metadata, static text, and XML sitemap extractors."""

from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from typing import Any
from urllib.parse import urljoin

from app.core.errors import DomainValidationError
from app.domains.scraping.contracts import ContentExtractorPort, RawHttpDocument
from app.domains.scraping.schemas import ScrapeStrategy

_SELECTOR_ATTR_RE = re.compile(
    r"^(?P<tag>[a-zA-Z0-9_-]+)(?:\[(?P<attr>[a-zA-Z0-9_:-]+)=['\"]?(?P<val>[^'\"\]]+)['\"]?\])?$"
)
_WHITESPACE_RE = re.compile(r"\s+")


def _collapse(text: str) -> str:
    return _WHITESPACE_RE.sub(" ", text).strip()


class _DocumentHtmlParser(HTMLParser):
    """Single-pass standard-library HTML5 parser ignoring script/style/noscript blocks."""

    _IGNORED_TAGS = frozenset({"script", "style", "noscript", "template"})
    _TEXT_BLOCK_TAGS = frozenset({"p", "li", "blockquote", "article", "section"})
    _HEADING_TAGS = frozenset({"h1", "h2", "h3"})

    def __init__(self, base_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self._base_url = base_url
        self.html_lang: str | None = None
        self.title: str | None = None
        self.canonical_url: str | None = None
        self.meta: dict[str, str] = {}
        self.headings: dict[str, list[str]] = {"h1": [], "h2": [], "h3": []}
        self.paragraphs: list[str] = []
        self.links: list[dict[str, str]] = []
        self.elements: list[tuple[str, dict[str, str], str]] = []

        self._ignored_depth = 0
        self._active_stack: list[tuple[str, dict[str, str], list[str]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        lower = tag.lower()
        attr_map = {k.lower(): (v or "") for k, v in attrs}

        if lower == "html" and attr_map.get("lang"):
            self.html_lang = attr_map["lang"].strip()

        if lower in self._IGNORED_TAGS:
            self._ignored_depth += 1
            return
        if self._ignored_depth > 0:
            return

        if lower == "meta":
            key = (attr_map.get("name") or attr_map.get("property") or "").strip().lower()
            content = attr_map.get("content", "").strip()
            if key and content:
                self.meta[key] = content
            self.elements.append((lower, attr_map, content))
            return

        if lower == "link":
            rel = attr_map.get("rel", "").lower().split()
            href = attr_map.get("href", "").strip()
            if "canonical" in rel and href:
                self.canonical_url = urljoin(self._base_url, href)
            self.elements.append((lower, attr_map, href))
            return

        self._active_stack.append((lower, attr_map, []))

    def handle_data(self, data: str) -> None:
        if self._ignored_depth > 0 or not self._active_stack:
            return
        for _, _, buffer in self._active_stack:
            buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        lower = tag.lower()
        if lower in self._IGNORED_TAGS:
            if self._ignored_depth > 0:
                self._ignored_depth -= 1
            return
        if self._ignored_depth > 0 or not self._active_stack:
            return

        # Pop matching tag (tolerant to malformed/unclosed nested tags).
        for idx in range(len(self._active_stack) - 1, -1, -1):
            open_tag, attr_map, chunks = self._active_stack[idx]
            if open_tag == lower:
                del self._active_stack[idx:]
                text = _collapse("".join(chunks))
                self.elements.append((open_tag, attr_map, text))

                if open_tag == "title" and text and self.title is None:
                    self.title = text
                elif open_tag in self._HEADING_TAGS and text:
                    self.headings[open_tag].append(text)
                elif open_tag in self._TEXT_BLOCK_TAGS and text:
                    self.paragraphs.append(text)
                elif open_tag == "a":
                    href = attr_map.get("href", "").strip()
                    if href and not href.startswith(("javascript:", "mailto:", "#")):
                        self.links.append(
                            {
                                "url": urljoin(self._base_url, href),
                                "text": text[:200],
                            }
                        )
                break


def _evaluate_selectors(
    elements: list[tuple[str, dict[str, str], str]],
    selectors: list[str],
) -> dict[str, list[str]]:
    results: dict[str, list[str]] = {}
    for raw_selector in selectors:
        match = _SELECTOR_ATTR_RE.match(raw_selector.strip())
        if not match:
            results[raw_selector] = []
            continue
        target_tag = match.group("tag").lower()
        attr_name = (match.group("attr") or "").lower()
        attr_val = match.group("val")

        matched_values: list[str] = []
        for elem_tag, elem_attrs, elem_text in elements:
            if elem_tag != target_tag:
                continue
            if attr_name and elem_attrs.get(attr_name) != attr_val:
                continue
            candidate = elem_text or elem_attrs.get("content") or elem_attrs.get("href") or ""
            if candidate:
                matched_values.append(candidate)
        results[raw_selector] = matched_values[:50]
    return results


class StructuredMetadataExtractor:
    """Extracts page title, OpenGraph/Twitter metadata, headings, links, and selector hits."""

    strategy = ScrapeStrategy.STRUCTURED_METADATA

    def extract(
        self, document: RawHttpDocument, *, selectors: list[str]
    ) -> dict[str, Any]:
        parser = _DocumentHtmlParser(document.final_url)
        parser.feed(document.body_text)

        open_graph = {
            k: v for k, v in parser.meta.items() if k.startswith("og:")
        }
        twitter = {
            k: v for k, v in parser.meta.items() if k.startswith("twitter:")
        }

        payload: dict[str, Any] = {
            "title": parser.title,
            "description": parser.meta.get("description") or open_graph.get("og:description"),
            "canonical_url": parser.canonical_url,
            "language": parser.html_lang,
            "open_graph": open_graph,
            "twitter": twitter,
            "headings": parser.headings,
            "links_count": len(parser.links),
            "links_sample": parser.links[:25],
        }
        if selectors:
            payload["selector_matches"] = _evaluate_selectors(parser.elements, selectors)
        return payload


class HttpStaticExtractor:
    """Extracts clean readable static text blocks, word counts, and structural summaries."""

    strategy = ScrapeStrategy.HTTP_STATIC

    def extract(
        self, document: RawHttpDocument, *, selectors: list[str]
    ) -> dict[str, Any]:
        parser = _DocumentHtmlParser(document.final_url)
        parser.feed(document.body_text)

        full_text = "\n".join(parser.paragraphs[:100])
        words = full_text.split()
        payload: dict[str, Any] = {
            "title": parser.title,
            "language": parser.html_lang,
            "headings": parser.headings,
            "paragraph_count": len(parser.paragraphs),
            "word_count": len(words),
            "text_excerpt": full_text[:4000],
            "links_count": len(parser.links),
        }
        if selectors:
            payload["selector_matches"] = _evaluate_selectors(parser.elements, selectors)
        return payload


def _local_xml_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1] if "}" in tag else tag


class SitemapXmlExtractor:
    """Safely parses ``<urlset>`` and ``<sitemapindex>`` XML sitemaps (blocking DTD/entities)."""

    strategy = ScrapeStrategy.SITEMAP

    def extract(
        self, document: RawHttpDocument, *, selectors: list[str]
    ) -> dict[str, Any]:
        upper_head = document.body_text[:2048].upper()
        if "<!DOCTYPE" in upper_head or "<!ENTITY" in upper_head:
            raise DomainValidationError(
                "XML DTD and entity declarations are forbidden in sitemap documents."
            )

        try:
            root = ET.fromstring(document.body_text)
        except ET.ParseError as exc:
            raise DomainValidationError(f"Malformed sitemap XML document: {exc}") from exc

        root_kind = _local_xml_name(root.tag).lower()
        entries: list[dict[str, str]] = []
        for child in list(root)[:500]:
            child_kind = _local_xml_name(child.tag).lower()
            if child_kind not in {"url", "sitemap"}:
                continue
            item: dict[str, str] = {}
            for field in child:
                key = _local_xml_name(field.tag).lower()
                if field.text and key in {"loc", "lastmod", "changefreq", "priority"}:
                    item[key] = field.text.strip()
            if "loc" in item:
                entries.append(item)

        return {
            "title": f"Sitemap ({root_kind})",
            "sitemap_kind": root_kind,
            "entry_count": len(entries),
            "entries": entries,
        }


def build_default_extractors() -> tuple[ContentExtractorPort, ...]:
    return (
        StructuredMetadataExtractor(),
        HttpStaticExtractor(),
        SitemapXmlExtractor(),
    )
