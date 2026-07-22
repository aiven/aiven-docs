#!/usr/bin/env python3
"""
Update EOL/EOA date tables in eol-for-major-versions.md from the Aiven API
and GitHub releases.

For every service version returned by api.aiven.io/v1/service_versions:
  - If the version already has a row in the doc table, update its date cells.
  - If the version has no row yet, add one.

For Aiven tooling (CLI, Terraform provider, Kubernetes operator), GitHub
releases are checked for new major versions:
  - If a new major version is detected, a new row is inserted with placeholder
    dates.
  - The immediately preceding (highest existing) major version's EOL date is
    set to today's date, provided it currently holds a placeholder value.

Date cells are written whenever the API returns a non-null value — including
cells that currently contain a placeholder ("To be announced", "N/A",
"Date not set", "TBD"). Placeholders are replaced automatically as soon as
real dates become available in the API.

Columns explicitly set to None in SectionConfig (e.g. col_avail_start for
Kafka and OpenSearch) are never touched regardless of API data, because the
values stored there are more accurate than what the API returns.

Usage:
    python scripts/update-eol-dates.py [--doc-path PATH]

Exit codes:
    0 — no changes made
    1 — doc was updated
    2 — error
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

# Default placeholder used when building new rows with no data yet.
PLACEHOLDER = "To be announced"

# All placeholder strings recognised in existing rows. When the API returns a
# real date for a cell holding any of these values, the cell is updated
# automatically. Tools sections also use this set to decide whether the
# preceding version's EOL cell may be overwritten.
PLACEHOLDERS: frozenset[str] = frozenset({
    "To be announced",
    "Date not set",
    "N/A",
    "TBD",
})


# ---------------------------------------------------------------------------
# Section configuration — Aiven services (data from Aiven API)
# ---------------------------------------------------------------------------

@dataclass
class SectionConfig:
    service_types: list[str]
    # 0-based column indices (None = don't touch / not present in this table)
    col_eol: int | None        # aiven_end_of_life_time
    col_avail_end: int | None  # availability_end_time
    col_avail_start: int | None  # availability_start_time
    # Derives the doc version label from the API major_version string
    label_fn: Callable[[str], str]
    # Explicit overrides for cases where the label can't be derived automatically
    # e.g. OpenSearch "1" → "1.3.x" (the running minor version at that major)
    label_overrides: dict[str, str] = field(default_factory=dict)
    # Fixed values for columns not sourced from the API, used when inserting
    # new rows (e.g. OpenSearch col 2 = "After EOL" description)
    static_cols: dict[int, str] = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Section configuration — Aiven tools (data from GitHub releases)
# ---------------------------------------------------------------------------

@dataclass
class ToolsConfig:
    github_repo: str               # e.g. "aiven/aiven-client"
    col_eol: int                   # 0-based column index for the EOL date cell
    label_fn: Callable[[str], str]  # major version string → doc label


# ---------------------------------------------------------------------------
# Label helpers
# ---------------------------------------------------------------------------

def _vx(v: str) -> str:
    return f"{v}.x"


def _mysql_label(v: str) -> str:
    # "8" → "8.0.x",  "8.4" → "8.4.x"
    return f"{v}.0.x" if "." not in v else f"{v}.x"


# ---------------------------------------------------------------------------
# Service section map (matched with str.startswith against "### " headings)
# ---------------------------------------------------------------------------

# Keys are matched with str.startswith() against section headings.
SECTION_CONFIG: dict[str, SectionConfig] = {
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for MySQL": SectionConfig(
        service_types=["mysql"],
        col_eol=1, col_avail_end=2, col_avail_start=3,
        label_fn=_mysql_label,
    ),
    # | Version    | Aiven EOL | After EOL | Service creation supported until | Service creation supported from |
    # |     0      |     1     |     2     |               3                  |               4                 |
    # col_avail_start (4) intentionally None: API holds internal dates predating
    # public GA; doc's manually-set values are more accurate.
    # col 2 ("After EOL") is hand-maintained; static_cols provides a default for new rows.
    "### Aiven for OpenSearch": SectionConfig(
        service_types=["opensearch"],
        col_eol=1, col_avail_end=3, col_avail_start=None,
        label_fn=_vx,
        label_overrides={
            "1":    "1.3.x",
            "2":    "2.17.x",
            "2.19": "2.19.x LTS",
            "3.6":  "3.6.x LTS",
        },
        static_cols={2: "Automatic upgrade to a supported version"},
    ),
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for PostgreSQL": SectionConfig(
        service_types=["pg"],
        col_eol=1, col_avail_end=2, col_avail_start=3,
        label_fn=str,
    ),
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    # col_avail_start (3) intentionally None: API holds release-plan dates
    # ("no earlier than…"), not actual GA dates; doc values are accurate.
    "### Aiven for Apache Kafka": SectionConfig(
        service_types=["kafka"],
        col_eol=1, col_avail_end=2, col_avail_start=None,
        label_fn=_vx,
    ),
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    # ClickHouse: API currently returns null for aiven_end_of_life_time and
    # placeholder availability_start dates. New rows are added when they appear
    # in the API; EOL and avail_end cells update automatically once populated.
    "### Aiven for ClickHouse": SectionConfig(
        service_types=["clickhouse"],
        col_eol=1, col_avail_end=2, col_avail_start=None,
        label_fn=str,
    ),
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for Apache Flink": SectionConfig(
        service_types=["flink"],
        col_eol=1, col_avail_end=2, col_avail_start=3,
        label_fn=str,
    ),
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for Valkey": SectionConfig(
        service_types=["valkey"],
        col_eol=1, col_avail_end=2, col_avail_start=3,
        label_fn=_vx,
    ),
    # Dragonfly: not present in the API — skip
    # Grafana: single-versioned, patch version in doc differs from API major version — skip
}


# ---------------------------------------------------------------------------
# Tools section map (matched with str.startswith against "### " headings)
# ---------------------------------------------------------------------------

TOOLS_SECTION_CONFIG: dict[str, ToolsConfig] = {
    # | Version | Aiven EOL       |
    # |    0    |       1         |
    "### Aiven CLI": ToolsConfig(
        github_repo="aiven/aiven-client",
        col_eol=1,
        label_fn=_vx,
    ),
    # | Version | Aiven EOL       |
    # |    0    |       1         |
    "### Aiven Provider for Terraform": ToolsConfig(
        github_repo="aiven/terraform-provider-aiven",
        col_eol=1,
        label_fn=_vx,
    ),
    # | Version | Aiven EOL       |
    # |    0    |       1         |
    # Note: heading in the doc is "### Aiven Operator for Kubernetes®";
    # startswith matching catches the ® suffix.
    "### Aiven Operator for Kubernetes": ToolsConfig(
        github_repo="aiven/aiven-operator",
        col_eol=1,
        label_fn=_vx,
    ),
}


# ---------------------------------------------------------------------------
# Fetch helpers
# ---------------------------------------------------------------------------

def fetch_versions() -> dict[tuple[str, str], dict]:
    """Fetch service_versions from the Aiven API.
    Returns a dict keyed by (service_type, major_version)."""
    try:
        with urlopen(API_URL, timeout=30) as resp:
            data = json.loads(resp.read())
    except URLError as exc:
        print(f"ERROR: could not fetch {API_URL}: {exc}", file=sys.stderr)
        sys.exit(2)
    return {
        (v["service_type"], v["major_version"]): v
        for v in data.get("service_versions", [])
    }


def fetch_github_major_versions(repo: str) -> set[str]:
    """Return the set of distinct major version strings seen in GitHub releases.

    Tags like 'v4.16.0' and '4.16.0' both map to major version '4'.
    Returns an empty set (with a warning) on network error rather than aborting,
    so a single unreachable repo doesn't block the rest of the update.
    """
    url = GITHUB_RELEASES_URL.format(repo=repo)
    try:
        with urlopen(url, timeout=30) as resp:
            data = json.loads(resp.read())
    except URLError as exc:
        print(f"WARNING: could not fetch {url}: {exc}", file=sys.stderr)
        return set()
    majors: set[str] = set()
    for release in data:
        tag = release.get("tag_name", "").lstrip("v")
        parts = tag.split(".")
        if parts and parts[0].isdigit():
            majors.add(parts[0])
    return majors


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def fmt_date(iso: str) -> str:
    """'2026-11-12T00:00:00Z' → '2026-11-12'"""
    return iso[:10]


def version_sort_key(label: str) -> tuple[int, ...]:
    """'3.9.x' → (3, 9),  '25.3' → (25, 3),  '14' → (14,)"""
    clean = re.sub(r"[^0-9.]", "", label)
    return tuple(int(x) for x in clean.split(".") if x.isdigit())


def is_separator_row(line: str) -> bool:
    return bool(re.match(r"^\|[-| :]+\|", line))


def is_pipe_row(line: str) -> bool:
    return line.startswith("|")


def set_cell(parts: list[str], col_idx: int, value: str) -> None:
    """Update a cell (0-based col_idx) in a split row, preserving column width.

    No-ops if the cell is empty (header / structural gap). Replaces any
    existing content — including known placeholder strings — when called.
    """
    i = col_idx + 1
    if i >= len(parts) - 1:
        return
    old = parts[i]
    if not old.strip():
        return
    new = f" {value} "
    if len(new) < len(old):
        new = new + " " * (len(old) - len(new))
    parts[i] = new


def build_new_row(
    label: str,
    api_entry: dict,
    config: SectionConfig,
    num_cols: int,
) -> str:
    """Build a new markdown table row for a service version not yet in the doc."""
    eol = (
        fmt_date(api_entry["aiven_end_of_life_time"])
        if api_entry.get("aiven_end_of_life_time")
        else PLACEHOLDER
    )
    avail_end = (
        fmt_date(api_entry["availability_end_time"])
        if api_entry.get("availability_end_time")
        else PLACEHOLDER
    )
    avail_start = (
        fmt_date(api_entry["availability_start_time"])
        if api_entry.get("availability_start_time")
        else PLACEHOLDER
    )

    cells: dict[int, str] = {0: label}
    if config.col_eol is not None:
        cells[config.col_eol] = eol
    if config.col_avail_end is not None:
        cells[config.col_avail_end] = avail_end
    if config.col_avail_start is not None:
        cells[config.col_avail_start] = avail_start
    for col_idx, val in config.static_cols.items():
        cells[col_idx] = val
    # Fill any remaining columns with a placeholder
    for i in range(num_cols):
        cells.setdefault(i, PLACEHOLDER)

    return "| " + " | ".join(cells[i] for i in range(num_cols)) + " |\n"


# ---------------------------------------------------------------------------
# Tools table processing
# ---------------------------------------------------------------------------

def process_tools_table(
    table_rows: list[str],
    config: ToolsConfig,
    github_majors: set[str],
    today: str,
    num_cols: int,
) -> tuple[list[str], bool]:
    """Detect new major versions for a tools section and update the table.

    When one or more new major versions are found in GitHub:
    - A new row is added for each with PLACEHOLDER in the EOL cell.
    - The highest existing major version's EOL cell is set to *today* if it
      currently holds a placeholder value — it is now superseded.

    Returns (updated_rows, changed).
    """
    # Parse existing rows into (label, split_parts, line_ending)
    parsed: list[tuple[str, list[str], str]] = []
    for row in table_rows:
        stripped = row.rstrip("\n").rstrip("\r")
        ending = row[len(stripped):]
        parts = stripped.split("|")
        label = parts[1].strip() if len(parts) > 2 else ""
        parsed.append((label, parts, ending))

    existing_labels = {lbl for lbl, _, _ in parsed if lbl}

    # Determine which GitHub major versions are new to the doc
    new_labels = {
        config.label_fn(major)
        for major in github_majors
        if config.label_fn(major) not in existing_labels
    }

    if not new_labels:
        return table_rows, False

    # The highest existing version is now superseded → set its EOL to today
    # if (and only if) the EOL cell currently holds a placeholder value.
    highest_existing = (
        max(existing_labels, key=version_sort_key) if existing_labels else None
    )

    updated_parsed: list[tuple[str, list[str], str]] = []
    for label, parts, ending in parsed:
        if label == highest_existing:
            new_parts = list(parts)
            eol_cell = new_parts[config.col_eol + 1].strip()
            if eol_cell in PLACEHOLDERS:
                set_cell(new_parts, config.col_eol, today)
            updated_parsed.append((label, new_parts, ending))
        else:
            updated_parsed.append((label, parts, ending))

    # Rebuild existing rows from updated parse data
    updated_rows = [
        "|".join(parts) + ending for _, parts, ending in updated_parsed
    ]

    # Build new rows (one per new major version)
    new_row_entries: list[tuple[tuple[int, ...], str]] = []
    for label in new_labels:
        row = (
            "| "
            + " | ".join(label if i == 0 else PLACEHOLDER for i in range(num_cols))
            + " |\n"
        )
        new_row_entries.append((version_sort_key(label), row))

    # Merge existing + new rows in sorted version order
    all_entries: list[tuple[tuple[int, ...], str]] = []
    for row in updated_rows:
        stripped = row.rstrip("\n").rstrip("\r")
        lbl = stripped.split("|")[1].strip() if "|" in stripped else ""
        all_entries.append((version_sort_key(lbl), row))
    all_entries.extend(new_row_entries)
    all_entries.sort(key=lambda x: x[0])

    return [r for _, r in all_entries], True


# ---------------------------------------------------------------------------
# Doc processing
# ---------------------------------------------------------------------------

def process_doc(
    doc_path: Path,
    api_versions: dict[tuple[str, str], dict],
    tools_majors: dict[str, set[str]],
) -> bool:
    original = doc_path.read_text(encoding="utf-8")
    lines = original.splitlines(keepends=True)
    today = date.today().isoformat()

    current_section: str | None = None
    current_config: SectionConfig | None = None
    current_tools_config: ToolsConfig | None = None
    # doc_label → api_entry for the current service section
    label_to_api: dict[str, dict] = {}
    past_separator = False
    num_cols = 0
    seen_labels: set[str] = set()
    # Buffered data rows for tools sections (emitted only after processing)
    tools_buffer: list[str] = []

    result: list[str] = []
    changed = False

    def new_rows_for_current_section() -> list[str]:
        """Return sorted new rows for service versions in the API but not in doc."""
        if current_config is None:
            return []
        rows: list[tuple[tuple[int, ...], str]] = []
        for label, api_entry in label_to_api.items():
            if label not in seen_labels:
                row = build_new_row(label, api_entry, current_config, num_cols)
                rows.append((version_sort_key(label), row))
        rows.sort(key=lambda x: x[0])
        return [r for _, r in rows]

    def flush_section() -> None:
        """Flush buffered rows / insert missing rows at end of a table."""
        nonlocal changed, tools_buffer
        if current_tools_config is not None:
            gh = tools_majors.get(current_tools_config.github_repo, set())
            updated, tc = process_tools_table(
                tools_buffer, current_tools_config, gh, today, num_cols
            )
            if tc:
                changed = True
            result.extend(updated)
            tools_buffer = []
        elif current_config is not None:
            new_rows = new_rows_for_current_section()
            if new_rows:
                changed = True
                result.extend(new_rows)

    for line in lines:
        stripped = line.rstrip("\n").rstrip("\r")
        append_to_result = True

        # ── Leaving the current table (first non-pipe line after data rows) ──
        if past_separator and current_section and not is_pipe_row(stripped):
            flush_section()
            past_separator = False
            seen_labels = set()

        # ── Section heading ──
        if stripped.startswith("### "):
            current_section = None
            current_config = None
            current_tools_config = None
            label_to_api = {}
            num_cols = 0

            # Check service sections first
            for section_key, config in SECTION_CONFIG.items():
                if stripped.startswith(section_key):
                    current_section = section_key
                    current_config = config
                    for stype in config.service_types:
                        for (st, ver), entry in api_versions.items():
                            if st != stype:
                                continue
                            lbl = config.label_overrides.get(ver, config.label_fn(ver))
                            label_to_api[lbl] = entry
                    break

            # Then check tools sections
            if current_section is None:
                for section_key, config in TOOLS_SECTION_CONFIG.items():
                    if stripped.startswith(section_key):
                        current_section = section_key
                        current_tools_config = config
                        tools_buffer = []
                        break

        # ── Separator row → record column count ──
        if current_section and is_pipe_row(stripped) and is_separator_row(stripped):
            past_separator = True
            num_cols = stripped.count("|") - 1

        # ── Data rows ──
        if (
            current_section
            and past_separator
            and is_pipe_row(stripped)
            and not is_separator_row(stripped)
        ):
            if current_tools_config is not None:
                # Tools sections: buffer rows for deferred processing
                tools_buffer.append(line)
                append_to_result = False
            elif current_config is not None:
                # Service sections: update date cells inline
                parts = stripped.split("|")
                version_cell = parts[1].strip() if len(parts) > 2 else ""
                seen_labels.add(version_cell)
                api_entry = label_to_api.get(version_cell)
                if api_entry:
                    cfg = current_config
                    new_parts = list(parts)
                    if cfg.col_eol is not None and api_entry.get("aiven_end_of_life_time"):
                        set_cell(
                            new_parts, cfg.col_eol,
                            fmt_date(api_entry["aiven_end_of_life_time"]),
                        )
                    if cfg.col_avail_end is not None and api_entry.get("availability_end_time"):
                        set_cell(
                            new_parts, cfg.col_avail_end,
                            fmt_date(api_entry["availability_end_time"]),
                        )
                    if cfg.col_avail_start is not None and api_entry.get("availability_start_time"):
                        set_cell(
                            new_parts, cfg.col_avail_start,
                            fmt_date(api_entry["availability_start_time"]),
                        )
                    new_stripped = "|".join(new_parts)
                    if new_stripped != stripped:
                        changed = True
                        ending = line[len(stripped):]
                        line = new_stripped + ending

        if append_to_result:
            result.append(line)

    # ── Flush any remaining rows if the doc ends inside a table ──
    if past_separator and current_section:
        flush_section()

    if changed:
        doc_path.write_text("".join(result), encoding="utf-8")

    return changed


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--doc-path",
        type=Path,
        default=DOC_PATH,
        help=f"Path to the doc to update (default: {DOC_PATH})",
    )
    args = parser.parse_args()

    if not args.doc_path.exists():
        print(f"ERROR: doc not found at {args.doc_path}", file=sys.stderr)
        sys.exit(2)

    api_versions = fetch_versions()

    # Fetch GitHub major versions for all tools repos up front
    tools_majors: dict[str, set[str]] = {}
    for config in TOOLS_SECTION_CONFIG.values():
        if config.github_repo not in tools_majors:
            tools_majors[config.github_repo] = fetch_github_major_versions(
                config.github_repo
            )

    changed = process_doc(args.doc_path, api_versions, tools_majors)

    if changed:
        print(f"Updated: {args.doc_path}")
        sys.exit(1)
    else:
        print("No changes.")
        sys.exit(0)


if __name__ == "__main__":
    main()
