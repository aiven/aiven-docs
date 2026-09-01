#!/usr/bin/env python3
"""
Update EOL/EOA date tables in the shared static/includes/eol-table-*.md components.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA SOURCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service versions are sourced from the public Aiven API — no authentication
required:

  https://api.aiven.io/v1/service_versions

The API returns a list of objects, each with:
  - service_type          e.g. "pg", "kafka", "opensearch"
  - major_version         e.g. "16", "3.6"
  - aiven_end_of_life_time      ISO 8601 datetime or null
  - availability_end_time       ISO 8601 datetime or null  (service creation end)
  - availability_start_time     ISO 8601 datetime or null  (service creation start)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT THE SCRIPT UPDATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each covered service has its version table in exactly one place: a shared
MDX include under static/includes/eol-table-<service>.md. Both
docs/platform/reference/eol-for-major-versions.md and that service's own
docs/products/<service>/reference/version-lifecycle.md import the same
include, so updating the include file here keeps both pages in sync
automatically — there is no separate step for the per-service articles.

Covered services: MySQL, OpenSearch, PostgreSQL, Kafka, ClickHouse, Flink,
Valkey. For each version returned by the API:
  - Existing rows: the Aiven EOL, "Service creation supported until", and
    "Service creation supported from" cells are overwritten whenever the API
    returns a non-null value. This includes cells that currently hold a
    placeholder string ("To be announced", "Date not set", "N/A", "TBD") —
    placeholders are replaced as soon as real dates appear in the API.
  - Missing versions: a new row is inserted with all available dates filled
    in and "To be announced" for any date the API does not yet provide. The
    whole table is then re-rendered with recomputed column widths, so a wide
    new value (for example a long placeholder) realigns every row, not just
    the one that changed.

NOT covered (out of scope for this script — update the include manually):
  - eol-table-dragonfly.md  (not present in the Aiven API)
  - eol-table-grafana.md    (single-versioned; patch version in doc differs
                              from API major)
  - Aiven CLI, Aiven Provider for Terraform, Aiven Operator for Kubernetes
    (tooling, not a managed service; these tables stay inline in
    eol-for-major-versions.md, not in a shared include)

Columns intentionally excluded from auto-update (col_avail_start = None):
  - OpenSearch  "Service creation supported from": the API stores internal
    pre-GA dates that predate the public launch; the manually set dates in
    the include are more accurate.
  - Kafka       "Service creation supported from": the API stores release-plan
    ("no earlier than") dates, not actual GA dates; the include's values are
    accurate.
  - ClickHouse  "Service creation supported from": same reason as Kafka.

OpenSearch major version label mapping (API major → doc label):
  The API uses short major version keys ("1", "2", "2.19", "3.6") while the
  doc displays the running minor version at that major:
    "1"    → "1.3.x"
    "2"    → "2.17.x"
    "2.19" → "2.19.x LTS"
    "3.6"  → "3.6.x LTS"
  Any future OpenSearch major not listed above falls back to "{major}.x".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    python scripts/update-eol-dates.py [--includes-dir PATH]

Exit codes: 0 = no changes, 1 = one or more includes updated, 2 = error

This script is run automatically by the GitHub Actions workflow
.github/workflows/update-eol-dates.yaml (weekly on Mondays, 07:00 UTC) and
opens a pull request against main when changes are detected.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable
from urllib.error import URLError
from urllib.request import urlopen


API_URL = "https://api.aiven.io/v1/service_versions"
INCLUDES_DIR = Path("static/includes")
PLACEHOLDER = "To be announced"

# (TableConfig attribute, API field) for every date column a table may have.
DATE_FIELDS = [
    ("col_eol", "aiven_end_of_life_time"),
    ("col_avail_end", "availability_end_time"),
    ("col_avail_start", "availability_start_time"),
]


@dataclass
class TableConfig:
    file_name: str                # under static/includes/
    service_type: str
    col_eol: int | None            # 0-based; None = don't auto-update this column
    col_avail_end: int | None
    col_avail_start: int | None
    label_fn: Callable[[str], str]
    static_cols: dict[int, str] = field(default_factory=dict)


def _vx(v: str) -> str:
    return f"{v}.x"

def _mysql_label(v: str) -> str:
    return f"{v}.0.x" if "." not in v else f"{v}.x"

_OS = {"1": "1.3.x", "2": "2.17.x", "2.19": "2.19.x LTS", "3.6": "3.6.x LTS"}


TABLE_CONFIG: dict[str, TableConfig] = {
    "mysql": TableConfig(
        "eol-table-mysql.md", "mysql",
        col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=_mysql_label),
    "opensearch": TableConfig(
        "eol-table-opensearch.md", "opensearch",
        col_eol=1, col_avail_end=3,
        col_avail_start=None,   # API has internal pre-GA dates; include values are accurate
        label_fn=lambda v: _OS.get(v, _vx(v)),
        static_cols={2: "Automatic upgrade to a supported version"}),
    "postgresql": TableConfig(
        "eol-table-postgresql.md", "pg",
        col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=str),
    "kafka": TableConfig(
        "eol-table-kafka.md", "kafka",
        col_eol=1, col_avail_end=2,
        col_avail_start=None,   # API has release-plan dates, not actual GA; include is accurate
        label_fn=_vx),
    "clickhouse": TableConfig(
        "eol-table-clickhouse.md", "clickhouse",
        col_eol=1, col_avail_end=2, col_avail_start=None, label_fn=str),
    "flink": TableConfig(
        "eol-table-flink.md", "flink",
        col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=str),
    "valkey": TableConfig(
        "eol-table-valkey.md", "valkey",
        col_eol=1, col_avail_end=2, col_avail_start=3, label_fn=_vx),
    # Dragonfly: not in API. Grafana: single-versioned, patch-version mismatch. Both skipped.
}


def fetch_versions() -> dict[str, dict[str, dict]]:
    try:
        with urlopen(API_URL, timeout=30) as r:
            data = json.loads(r.read())
    except URLError as exc:
        print(f"ERROR: {API_URL}: {exc}", file=sys.stderr); sys.exit(2)
    by_type: dict[str, dict[str, dict]] = {}
    for v in data.get("service_versions", []):
        by_type.setdefault(v["service_type"], {})[v["major_version"]] = v
    return by_type


def fmt_date(iso: str) -> str:
    return iso[:10]

def version_sort_key(label: str) -> tuple[int, ...]:
    return tuple(int(x) for x in re.sub(r"[^0-9.]", "", label).split(".") if x.isdigit())

def is_separator_row(line: str) -> bool:
    return bool(re.match(r"^\|[-| :]+\|", line))

def is_pipe_row(line: str) -> bool:
    return line.startswith("|")


def parse_table(lines: list[str]) -> tuple[list[str], list[str], list[list[str]], list[str]] | None:
    """Split file lines into (prefix, header_cells, data_rows, suffix) around the
    file's single table, identified as a pipe row immediately followed by a
    separator row. Returns None if no table is found."""
    for i, line in enumerate(lines):
        stripped = line.rstrip("\n\r")
        if (is_pipe_row(stripped) and not is_separator_row(stripped)
                and i + 1 < len(lines) and is_separator_row(lines[i + 1].rstrip("\n\r"))):
            header_cells = [c.strip() for c in stripped.split("|")[1:-1]]
            j = i + 2
            data_rows = []
            while j < len(lines) and is_pipe_row(lines[j].rstrip("\n\r")):
                data_rows.append([c.strip() for c in lines[j].rstrip("\n\r").split("|")[1:-1]])
                j += 1
            return lines[:i], header_cells, data_rows, lines[j:]
    return None


def build_new_row_cells(label: str, api_entry: dict, config: TableConfig, ncols: int) -> list[str]:
    """Build the cell values for a service version not yet in the table."""
    cells = {0: label}
    for col_attr, field_name in DATE_FIELDS:
        col = getattr(config, col_attr)
        if col is not None:
            v = api_entry.get(field_name)
            cells[col] = fmt_date(v) if v else PLACEHOLDER
    cells |= config.static_cols  # static_cols applied last, matching original precedence
    for i in range(ncols):
        cells.setdefault(i, PLACEHOLDER)
    return [cells[i] for i in range(ncols)]


def render_table(header_cells: list[str], data_rows: list[list[str]]) -> list[str]:
    """Render header, separator, and data rows with widths recomputed from the
    full table, so every row — including any just-inserted one — stays aligned."""
    ncols = len(header_cells)
    widths = [len(header_cells[i]) for i in range(ncols)]
    for row in data_rows:
        for i in range(ncols):
            widths[i] = max(widths[i], len(row[i]))

    def fmt_row(cells: list[str]) -> str:
        return "| " + " | ".join(cells[i].ljust(widths[i]) for i in range(ncols)) + " |\n"

    sep = "| " + " | ".join("-" * widths[i] for i in range(ncols)) + " |\n"
    return [fmt_row(header_cells), sep] + [fmt_row(row) for row in data_rows]


def process_file(path: Path, config: TableConfig, api_versions: dict[str, dict[str, dict]]) -> bool:
    """Update the single table found in this include file."""
    original_text = path.read_text(encoding="utf-8")
    parsed = parse_table(original_text.splitlines(keepends=True))
    if parsed is None:
        print(f"WARNING: no table found in {path}", file=sys.stderr)
        return False
    prefix, header_cells, data_rows, suffix = parsed
    ncols = len(header_cells)

    label_to_api = {config.label_fn(ver): entry
                     for ver, entry in api_versions.get(config.service_type, {}).items()}

    seen_labels: set[str] = set()
    new_rows: list[list[str]] = []
    for row in data_rows:
        label = row[0] if row else ""
        seen_labels.add(label)
        if entry := label_to_api.get(label):
            row = list(row)
            for col_attr, field_name in DATE_FIELDS:
                col = getattr(config, col_attr)
                if col is not None and entry.get(field_name):
                    row[col] = fmt_date(entry[field_name])
        new_rows.append(row)

    missing_labels = sorted(
        (lbl for lbl in label_to_api if lbl not in seen_labels), key=version_sort_key)
    for label in missing_labels:
        new_rows.append(build_new_row_cells(label, label_to_api[label], config, ncols))

    new_text = "".join(prefix) + "".join(render_table(header_cells, new_rows)) + "".join(suffix)
    if new_text != original_text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--includes-dir", type=Path, default=INCLUDES_DIR)
    args = parser.parse_args()

    for service, cfg in TABLE_CONFIG.items():
        path = args.includes_dir / cfg.file_name
        if not path.exists():
            print(f"ERROR: table include not found for {service} at {path}", file=sys.stderr)
            sys.exit(2)

    api_versions = fetch_versions()

    changed_files = []
    for service, cfg in TABLE_CONFIG.items():
        path = args.includes_dir / cfg.file_name
        if process_file(path, cfg, api_versions):
            changed_files.append(str(path))

    if changed_files:
        print("Updated:\n  " + "\n  ".join(changed_files))
        sys.exit(1)
    print("No changes.")
    sys.exit(0)


if __name__ == "__main__":
    main()
