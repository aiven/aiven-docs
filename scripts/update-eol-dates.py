#!/usr/bin/env python3
"""
Update EOL/EOA date tables in eol-for-major-versions.md.

Services (MySQL, OpenSearch, PostgreSQL, Kafka, ClickHouse, Flink, Valkey):
sourced from api.aiven.io/v1/service_versions. Existing rows have date cells
updated when the API returns non-null values, including cells that currently
hold a placeholder ("To be announced", "N/A", etc.). Missing versions get new
rows. Columns set to None in SectionConfig are never auto-updated (the API
value is less accurate than what's in the doc).

Tooling (CLI, Terraform provider, Kubernetes operator): sourced from GitHub
releases. New major versions get a placeholder row; the preceding version's
EOL is set to today's date if it held a placeholder.

Exit codes: 0 = no changes, 1 = doc updated, 2 = error
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Callable
from urllib.error import URLError
from urllib.request import urlopen

API_URL = "https://api.aiven.io/v1/service_versions"
GITHUB_RELEASES_URL = "https://api.github.com/repos/{repo}/releases?per_page=100"
DOC_PATH = Path("docs/platform/reference/eol-for-major-versions.md")
PLACEHOLDER = "To be announced"
PLACEHOLDERS = frozenset({"To be announced", "Date not set", "N/A", "TBD"})


@dataclass
class SectionConfig:
    service_types: list[str]
    col_eol: int | None           # 0-based; None = don't auto-update this column
    col_avail_end: int | None
    col_avail_start: int | None
    label_fn: Callable[[str], str]
    static_cols: dict[int, str] = field(default_factory=dict)


@dataclass
class ToolsConfig:
    github_repo: str
    col_eol: int
    label_fn: Callable[[str], str]


def _vx(v: str) -> str:
    return f"{v}.x"

def _mysql_label(v: str) -> str:
    return f"{v}.0.x" if "." not in v else f"{v}.x"

_OS = {"1": "1.3.x", "2": "2.17.x", "2.19": "2.19.x LTS", "3.6": "3.6.x LTS"}


SECTION_CONFIG: dict[str, SectionConfig] = {
    "### Aiven for MySQL": SectionConfig(
        ["mysql"], col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=_mysql_label),
    "### Aiven for OpenSearch": SectionConfig(
        ["opensearch"], col_eol=1, col_avail_end=3,
        col_avail_start=None,   # API has internal pre-GA dates; doc values are accurate
        label_fn=lambda v: _OS.get(v, _vx(v)),
        static_cols={2: "Automatic upgrade to a supported version"}),
    "### Aiven for PostgreSQL": SectionConfig(
        ["pg"], col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=str),
    "### Aiven for Apache Kafka": SectionConfig(
        ["kafka"], col_eol=1, col_avail_end=2,
        col_avail_start=None,   # API has release-plan dates, not actual GA; doc is accurate
        label_fn=_vx),
    "### Aiven for ClickHouse": SectionConfig(
        ["clickhouse"], col_eol=1, col_avail_end=2, col_avail_start=None, label_fn=str),
    "### Aiven for Apache Flink": SectionConfig(
        ["flink"], col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=str),
    "### Aiven for Valkey": SectionConfig(
        ["valkey"], col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=_vx),
    # Dragonfly: not in API. Grafana: single-versioned, patch-version mismatch. Both skipped.
}

TOOLS_SECTION_CONFIG: dict[str, ToolsConfig] = {
    # Keys use startswith matching, so "### Aiven Operator for Kubernetes" also
    # matches the ® variant in the doc.
    "### Aiven CLI": ToolsConfig("aiven/aiven-client", col_eol=1, label_fn=_vx),
    "### Aiven Provider for Terraform": ToolsConfig("aiven/terraform-provider-aiven", col_eol=1, label_fn=_vx),
    "### Aiven Operator for Kubernetes": ToolsConfig("aiven/aiven-operator", col_eol=1, label_fn=_vx),
}

# Pre-merged for single-pass section detection inside the doc-processing loop.
ALL_SECTIONS: dict[str, SectionConfig | ToolsConfig] = {**SECTION_CONFIG, **TOOLS_SECTION_CONFIG}


def fetch_versions() -> dict[tuple[str, str], dict]:
    try:
        with urlopen(API_URL, timeout=30) as r:
            data = json.loads(r.read())
    except URLError as exc:
        print(f"ERROR: {API_URL}: {exc}", file=sys.stderr); sys.exit(2)
    return {(v["service_type"], v["major_version"]): v for v in data.get("service_versions", [])}


def fetch_github_major_versions(repo: str) -> set[str]:
    """Returns major version strings seen in GitHub releases, empty set on error."""
    url = GITHUB_RELEASES_URL.format(repo=repo)
    try:
        with urlopen(url, timeout=30) as r:
            data = json.loads(r.read())
    except URLError as exc:
        print(f"WARNING: {url}: {exc}", file=sys.stderr); return set()
    return {
        tag.split(".")[0]
        for rel in data
        if (tag := rel.get("tag_name", "").lstrip("v")).split(".")[0].isdigit()
    }


def fmt_date(iso: str) -> str:
    return iso[:10]

def version_sort_key(label: str) -> tuple[int, ...]:
    return tuple(int(x) for x in re.sub(r"[^0-9.]", "", label).split(".") if x.isdigit())

def is_separator_row(line: str) -> bool:
    return bool(re.match(r"^\|[-| :]+\|", line))

def is_pipe_row(line: str) -> bool:
    return line.startswith("|")


def set_cell(parts: list[str], col_idx: int, value: str) -> None:
    """Replace cell content at col_idx (0-based), preserving column width."""
    i = col_idx + 1
    if i >= len(parts) - 1 or not parts[i].strip():
        return
    new = f" {value} "
    parts[i] = new + " " * max(0, len(parts[i]) - len(new))


def build_new_row(label: str, api_entry: dict, config: SectionConfig, num_cols: int) -> str:
    """Build a new markdown table row for a service version not yet in the doc."""
    def d(f):
        v = api_entry.get(f); return fmt_date(v) if v else PLACEHOLDER

    cells = {0: label}
    for col, f in [(config.col_eol, "aiven_end_of_life_time"),
                   (config.col_avail_end, "availability_end_time"),
                   (config.col_avail_start, "availability_start_time")]:
        if col is not None:
            cells[col] = d(f)
    cells |= config.static_cols  # static_cols applied last, matching original precedence
    for i in range(num_cols):
        cells.setdefault(i, PLACEHOLDER)
    return "| " + " | ".join(cells[i] for i in range(num_cols)) + " |\n"


def process_tools_table(
    table_rows: list[str], config: ToolsConfig, github_majors: set[str],
    today: str, num_cols: int,
) -> tuple[list[str], bool]:
    """Detect new major versions; set preceding version's EOL to today if it was a placeholder."""
    def parse(row):
        s = row.rstrip("\n\r"); p = s.split("|")
        return (p[1].strip() if len(p) > 2 else ""), p, row[len(s):]

    parsed = [parse(r) for r in table_rows]
    existing = {lbl for lbl, _, _ in parsed if lbl}
    new_labels = {config.label_fn(m) for m in github_majors if config.label_fn(m) not in existing}

    if not new_labels:
        return table_rows, False

    highest = max(existing, key=version_sort_key) if existing else None
    out = []
    for lbl, parts, ending in parsed:
        if lbl == highest and parts[config.col_eol + 1].strip() in PLACEHOLDERS:
            parts = list(parts)
            set_cell(parts, config.col_eol, today)
        out.append("|".join(parts) + ending)

    new_rows = [
        "| " + " | ".join(lbl if i == 0 else PLACEHOLDER for i in range(num_cols)) + " |\n"
        for lbl in new_labels
    ]
    all_rows = out + new_rows
    all_rows.sort(key=lambda r: version_sort_key(r.split("|")[1].strip() if r.count("|") > 1 else ""))
    return all_rows, True


def process_doc(
    doc_path: Path,
    api_versions: dict[tuple[str, str], dict],
    tools_majors: dict[str, set[str]],
) -> bool:
    lines = doc_path.read_text(encoding="utf-8").splitlines(keepends=True)
    today = date.today().isoformat()

    current_section: str | None = None
    current_config: SectionConfig | None = None
    current_tools_config: ToolsConfig | None = None
    label_to_api: dict[str, dict] = {}
    past_separator = False
    num_cols = 0
    seen_labels: set[str] = set()
    tools_buffer: list[str] = []
    result: list[str] = []
    changed = False

    def missing_service_rows() -> list[str]:
        if not current_config:
            return []
        return [r for _, r in sorted(
            (version_sort_key(lbl), build_new_row(lbl, e, current_config, num_cols))
            for lbl, e in label_to_api.items() if lbl not in seen_labels
        )]

    def flush() -> None:
        nonlocal changed, tools_buffer
        if current_tools_config:
            updated, tc = process_tools_table(
                tools_buffer, current_tools_config,
                tools_majors.get(current_tools_config.github_repo, set()), today, num_cols,
            )
            if tc: changed = True
            result.extend(updated); tools_buffer = []
        elif rows := missing_service_rows():
            changed = True; result.extend(rows)

    for line in lines:
        stripped = line.rstrip("\n\r")

        if past_separator and current_section and not is_pipe_row(stripped):
            flush(); past_separator = False; seen_labels = set()

        if stripped.startswith("### "):
            current_section = current_config = current_tools_config = None
            label_to_api = {}; num_cols = 0
            for key, cfg in ALL_SECTIONS.items():
                if stripped.startswith(key):
                    current_section = key
                    if isinstance(cfg, SectionConfig):
                        current_config = cfg
                        for stype in cfg.service_types:
                            for (st, ver), entry in api_versions.items():
                                if st == stype:
                                    label_to_api[cfg.label_fn(ver)] = entry
                    else:
                        current_tools_config = cfg; tools_buffer = []
                    break

        if current_section and is_pipe_row(stripped) and is_separator_row(stripped):
            past_separator = True; num_cols = stripped.count("|") - 1

        if current_section and past_separator and is_pipe_row(stripped) and not is_separator_row(stripped):
            if current_tools_config:
                tools_buffer.append(line); continue
            if current_config:
                parts = stripped.split("|")
                version_cell = parts[1].strip() if len(parts) > 2 else ""
                seen_labels.add(version_cell)
                if entry := label_to_api.get(version_cell):
                    new_parts = list(parts); cfg = current_config
                    if cfg.col_eol is not None and entry.get("aiven_end_of_life_time"):
                        set_cell(new_parts, cfg.col_eol, fmt_date(entry["aiven_end_of_life_time"]))
                    if cfg.col_avail_end is not None and entry.get("availability_end_time"):
                        set_cell(new_parts, cfg.col_avail_end, fmt_date(entry["availability_end_time"]))
                    if cfg.col_avail_start is not None and entry.get("availability_start_time"):
                        set_cell(new_parts, cfg.col_avail_start, fmt_date(entry["availability_start_time"]))
                    if (new_stripped := "|".join(new_parts)) != stripped:
                        changed = True; line = new_stripped + line[len(stripped):]

        result.append(line)

    if past_separator and current_section:
        flush()

    if changed:
        doc_path.write_text("".join(result), encoding="utf-8")
    return changed


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--doc-path", type=Path, default=DOC_PATH)
    args = parser.parse_args()

    if not args.doc_path.exists():
        print(f"ERROR: doc not found at {args.doc_path}", file=sys.stderr); sys.exit(2)

    api_versions = fetch_versions()
    repos = {cfg.github_repo for cfg in TOOLS_SECTION_CONFIG.values()}
    tools_majors = {repo: fetch_github_major_versions(repo) for repo in repos}

    changed = process_doc(args.doc_path, api_versions, tools_majors)
    if changed:
        print(f"Updated: {args.doc_path}"); sys.exit(1)
    print("No changes."); sys.exit(0)


if __name__ == "__main__":
    main()
