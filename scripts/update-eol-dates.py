#!/usr/bin/env python3
"""
Update EOL/EOA date tables in eol-for-major-versions.md from the Aiven API.

Fetches service version lifecycle data from https://api.aiven.io/v1/service_versions
and patches date cells in the doc in place. Only cells whose corresponding field
is non-null in the API response are touched; hand-maintained values like
"To be announced", "Date not set", and the OpenSearch "After EOL" column are
left unchanged.

Usage:
    python scripts/update-eol-dates.py [--doc-path PATH]

Exit codes:
    0 — no changes made
    1 — doc was updated (changes written)
    2 — error
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.request import urlopen
from urllib.error import URLError

API_URL = "https://api.aiven.io/v1/service_versions"
DOC_PATH = Path("docs/platform/reference/eol-for-major-versions.md")

# ---------------------------------------------------------------------------
# Service version map
#
# Each entry: (api_service_type, api_major_version, doc_version_label,
#              col_eol, col_avail_end, col_avail_start)
#
# api_service_type    — service_type field from the API response
# api_major_version   — major_version field from the API response
# doc_version_label   — exact string in the Version column of the doc table;
#                       None = single-versioned service, match the first data row
# col_eol             — 0-based column index for aiven_end_of_life_time;
#                       None = skip this field
# col_avail_end       — column index for availability_end_time; None = skip
# col_avail_start     — column index for availability_start_time; None = skip
#
# Section keys are matched with str.startswith() against the section heading.
# ---------------------------------------------------------------------------
SECTION_MAP: dict[
    str,
    list[tuple[str, str, str | None, int | None, int | None, int | None]],
] = {
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for MySQL": [
        # API does not carry aiven_end_of_life_time for MySQL yet
        ("mysql", "8",   "8.0.x", None, 2, 3),
        ("mysql", "8.4", "8.4.x", None, 2, 3),
    ],
    # | Version    | Aiven EOL | After EOL | Service creation supported until | Service creation supported from |
    # |     0      |     1     |     2     |               3                  |               4                 |
    # col_avail_start (col 4) intentionally None — API holds internal availability
    # dates that predate public GA; the doc's manually-set dates are more accurate.
    "### Aiven for OpenSearch": [
        # API version "1" = service running 1.3.x; "2" = service running 2.17.x
        ("opensearch", "1",    "1.3.x",      1, 3, None),
        ("opensearch", "2",    "2.17.x",     1, 3, None),
        ("opensearch", "2.19", "2.19.x LTS", 1, 3, None),
        ("opensearch", "3.3",  "3.3.x",      1, 3, None),
        ("opensearch", "3.6",  "3.6.x LTS",  1, 3, None),
    ],
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for PostgreSQL": [
        ("pg", "15", "15", 1, 2, 3),
        ("pg", "16", "16", 1, 2, 3),
        ("pg", "17", "17", 1, 2, 3),
        ("pg", "18", "18", 1, 2, 3),
    ],
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    # col_avail_start (col 3) intentionally None — API holds release-plan dates
    # ("no earlier than…"), not actual GA dates; the doc has the accurate values.
    "### Aiven for Apache Kafka": [
        ("kafka", "3.9", "3.9.x", 1, 2, None),
        ("kafka", "4.1", "4.1.x", 1, 2, None),
        ("kafka", "4.2", "4.2.x", 1, 2, None),
    ],
    # Flink: API returns aiven_end_of_life_time=null for all versions — skip
    # ClickHouse: API returns aiven_end_of_life_time=null; availability_start
    # values are placeholders. Skip until EOL dates are added to the API.
    # | Version | Aiven EOL | Service creation supported until | Service creation supported from |
    # |    0    |     1     |               2                  |               3                 |
    "### Aiven for Valkey": [
        ("valkey", "8.1", "8.1.x", 1, 2, 3),
        ("valkey", "9.0", "9.0.x", 1, 2, 3),
        ("valkey", "9.1", "9.1.x", 1, 2, 3),
    ],
    # Dragonfly: not present in the API — skip
}


def fetch_versions() -> dict[tuple[str, str], dict]:
    """Fetch service_versions from the Aiven API.
    Returns a dict keyed by (service_type, major_version)."""
    try:
        with urlopen(API_URL, timeout=30) as resp:
            data = json.loads(resp.read())
    except URLError as exc:
        print(f"ERROR: could not fetch {API_URL}: {exc}", file=sys.stderr)
        sys.exit(2)

    result: dict[tuple[str, str], dict] = {}
    for v in data.get("service_versions", []):
        key = (v["service_type"], v["major_version"])
        result[key] = v
    return result


def fmt_date(iso: str) -> str:
    """Convert '2026-11-12T00:00:00Z' (or '2026-11-12 00:00:00') to '2026-11-12'."""
    return iso[:10]


def set_cell(parts: list[str], col_idx: int, value: str) -> None:
    """Replace a cell's content (0-based col_idx) in a split table row,
    preserving the original cell width where possible."""
    cell_idx = col_idx + 1  # offset for the leading empty string before first |
    if cell_idx >= len(parts) - 1:  # -1 to skip trailing empty string
        return
    old = parts[cell_idx]
    if not old.strip():
        return
    old_width = len(old)
    new_cell = f" {value} "
    if len(new_cell) < old_width:
        new_cell = new_cell + " " * (old_width - len(new_cell))
    parts[cell_idx] = new_cell


def is_separator_row(line: str) -> bool:
    return bool(re.match(r"^\|[-| :]+\|", line))


def is_pipe_row(line: str) -> bool:
    return line.startswith("|")


def get_version_cell(parts: list[str]) -> str:
    return parts[1].strip() if len(parts) > 2 else ""


def process_doc(doc_path: Path, api_versions: dict[tuple[str, str], dict]) -> bool:
    """Update the doc in place. Returns True if any changes were made."""
    original = doc_path.read_text(encoding="utf-8")
    lines = original.splitlines(keepends=True)

    current_section: str | None = None
    # Pre-computed updates for the current section:
    # doc_version_label (or None) → {col_idx: new_value}
    section_updates: dict[str | None, dict[int, str]] = {}
    # Whether we've passed the separator row in the current table (prevents
    # the header row from being treated as a data row — critical for
    # single-versioned services where doc_version_label is None)
    past_separator = False
    first_row_matched: set[str | None] = set()

    result: list[str] = []
    changed = False

    for line in lines:
        stripped = line.rstrip("\n").rstrip("\r")

        # Detect section change — reset all table state
        if stripped.startswith("### "):
            current_section = None
            section_updates = {}
            past_separator = False
            first_row_matched = set()
            for section_key in SECTION_MAP:
                if stripped.startswith(section_key):
                    current_section = section_key
                    for stype, api_ver, doc_label, col_eol, col_end, col_start in SECTION_MAP[section_key]:
                        api_entry = api_versions.get((stype, api_ver))
                        if api_entry is None:
                            continue
                        updates: dict[int, str] = {}
                        if col_eol is not None and api_entry.get("aiven_end_of_life_time"):
                            updates[col_eol] = fmt_date(api_entry["aiven_end_of_life_time"])
                        if col_end is not None and api_entry.get("availability_end_time"):
                            updates[col_end] = fmt_date(api_entry["availability_end_time"])
                        if col_start is not None and api_entry.get("availability_start_time"):
                            updates[col_start] = fmt_date(api_entry["availability_start_time"])
                        if updates:
                            section_updates[doc_label] = updates
                    break
        elif current_section and not is_pipe_row(stripped):
            # Leaving the table (blank line, prose, admonition, new heading…)
            past_separator = False

        # Track when we pass the separator row
        if current_section and is_pipe_row(stripped) and is_separator_row(stripped):
            past_separator = True

        # Patch table data rows (only after the separator has been seen)
        if (
            current_section
            and past_separator
            and is_pipe_row(stripped)
            and not is_separator_row(stripped)
        ):
            parts = stripped.split("|")
            version_cell = get_version_cell(parts)

            for doc_label, updates in section_updates.items():
                matched = False
                if doc_label is None:
                    if doc_label not in first_row_matched:
                        matched = True
                        first_row_matched.add(doc_label)
                else:
                    matched = (version_cell == doc_label)

                if matched:
                    new_parts = list(parts)
                    for col_idx, new_val in updates.items():
                        set_cell(new_parts, col_idx, new_val)
                    new_line = "|".join(new_parts)
                    ending = line[len(stripped):]
                    patched = new_line + ending
                    if patched != line:
                        changed = True
                        line = patched
                    break

        result.append(line)

    if changed:
        doc_path.write_text("".join(result), encoding="utf-8")

    return changed


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
    changed = process_doc(args.doc_path, api_versions)

    if changed:
        print(f"Updated: {args.doc_path}")
        sys.exit(1)
    else:
        print("No changes.")
        sys.exit(0)


if __name__ == "__main__":
    main()
