---
title: What's new in Aiven for ClickHouse® 26.3
sidebar_label: What's new in 26.3
---

Aiven for ClickHouse® 26.3 is a Long-Term Support (LTS) release, available in
Early Availability from August 1, 2026. You can select it for new services and
for upgrades from version 25.8. Version 25.8 remains the default for new
services.

This release makes full-text search generally available, enables asynchronous
inserts by default, and adds materialized CTEs, a native `Geometry` type, and a
range of JSON and query-performance improvements. See [Highlights](#highlights)
for the full list. Review the rest of this page for the changes that require
attention before upgrading.

Direct upgrades from 25.3 to 26.3 are not supported. Services on 25.3 must first
upgrade to 25.8. An upgrade from 25.8 includes all changes from the seven
upstream releases 25.9 through 26.3.

Review this page before upgrading, and test the upgrade by
[forking your service](/docs/platform/concepts/service-forking) first. A fork is
created from a backup and requires manual validation. It does not automatically
validate continuous ingestion or external integrations. Downgrading is not
supported.

For Aiven-managed settings that differ from upstream defaults, see
[Default settings in 26.3](/docs/products/clickhouse/reference/26-3-default-settings).
For the exhaustive upstream change list, see the
[ClickHouse changelog](https://clickhouse.com/docs/whats-new/changelog).

## Requires attention

These changes affect running workloads and need review before you upgrade.

### Removed features: migrate before upgrading

<!-- markdownlint-disable MD013 MD060 -->

| Removed | Removed in | What to do |
|---------|-----------|------------|
| `Object('json')` column type | 25.11 | Migrate columns to the [`JSON` type](https://clickhouse.com/docs/sql-reference/data-types/newjson). |
| `LIVE VIEW` | 25.12 | Drop live views or replace them, for example with refreshable materialized views. |
| `DEFLATE_QPL` and `ZSTD_QAT` codecs | 26.2 | Recompress affected columns with another codec, such as `ZSTD`. |
| Text indexes created on 25.8 | 26.2 | Drop and recreate the indexes to use the current storage format. |
| Experimental hypothesis skip index | 26.3 | Drop indexes that use the experimental hypothesis index type. |
| `detectProgrammingLanguage()` function | 26.3 | Replace calls with application-side language detection or another supported function. |
| `searchAny()` and `searchAll()` functions | 25.10 | Rename calls to `hasAnyTokens()` and `hasAllTokens()`. |

<!-- markdownlint-enable MD013 MD060 -->

### Aiven upgrade protection

Before upgrading to 26.3, Aiven automatically scans a running, powered-on 25.8
service for columns that use the removed `Object('json')` type,
`LiveView` tables, and columns that use removed codecs. Aiven blocks
the upgrade when it finds any of these. For `Object('json')` columns, Aiven also
provides remediation SQL. The service must be powered on for this scan.

Aiven does not automatically check text indexes created on 25.8, hypothesis
skip indexes, or uses of `detectProgrammingLanguage()`. Check and remediate
these manually before upgrading.

### Insert behaviour changes

Aiven for ClickHouse 26.3 adopts these upstream insert defaults:

- **`async_insert` defaults to `1` in 26.3** (was `0` in upstream 25.8).
  When enabled, the server batches small inserts; acknowledgement and visibility
  semantics differ from synchronous inserts. Landed in 26.3. The
  `compatibility = '25.8'` profile records `async_insert = 0`, but
  compatibility rewrites registered setting defaults only and does not restore
  every behavior or server setting.
- **Insert deduplication is enabled for all inserts in 26.3**, including async
  inserts and materialized views. Landed in 26.2. The `deduplicate_insert`
  setting did not exist in 25.8. To restore the previous deduplication behavior,
  set both settings:

  ```sql
  SET deduplicate_insert = 'backward_compatible_choice';
  SET deduplicate_blocks_in_dependent_materialized_views = 0;
  ```

- **The insert deduplication window is shorter in 26.3.** The
  `replicated_deduplication_window_seconds` table setting drops from one week in
  25.8 to one hour, and `replicated_deduplication_window` rises from `1000` to
  `10000`. Retried inserts are deduplicated only within this window, so a retry
  sent more than an hour after the original is no longer treated as a duplicate.
  Landed in 25.10.

On Aiven for ClickHouse 26.3, `compatibility` defaults to an empty value. You can
set `compatibility = '25.8'` at session or profile level to apply earlier
recorded setting defaults during migration. Compatibility does not reproduce
every previous behavior or server setting. See
[Default settings in 26.3](/docs/products/clickhouse/reference/26-3-default-settings).

### On-disk format changes

Aiven for ClickHouse 26.3 can write new part formats that earlier versions
cannot read. Because downgrading is not supported on Aiven, validate these
behaviors on a fork before upgrading production.

- **`object_serialization_version` moves from v2 to v3** (landed 25.12).
  Controls JSON column serialization compatibility; new parts may use a layout
  earlier versions cannot read.
- **`dynamic_serialization_version` moves from v2 to v3** (landed 25.12).
  Controls `Dynamic` column on-disk serialization; this is separate from JSON
  serialization.
- **`propagate_types_serialization_versions_to_nested_types` defaults to `1`**
  (introduced in 26.3). Parts written with the new nested serialization cannot
  be read by older versions.
- **`String` columns use the `with_size_stream` serialization format**
  (`serialization_info_version = with_types`, landed 25.11). Parts written in
  this format cannot be read by versions before 25.10, which is another reason
  downgrades are unsupported.
- **Bucketed Map storage** (`map_serialization_version = 'with_buckets'`) is
  opt-in. The default remains `basic`; enable bucketing explicitly to use the
  new on-disk layout (landed 26.3).
- Tables with Variant/Dynamic/JSON subcolumns: filenames are escaped in wide
  parts (landed 25.11).
- Column statistics: single-file format. If you use column statistics and
  altered a `String` column to `Nullable(String)`, run
  `ALTER TABLE ... MATERIALIZE STATISTICS ALL` after upgrading (landed
  25.12–26.1).

### Query result and privilege changes

- The `NOT` operator precedence changed to follow standard SQL precedence.
  Review predicates that relied on the previous precedence (landed 26.3).
- Some `FINAL` queries can no longer apply partition pruning before row
  merging. This preserves correctness but can increase the number of partitions
  read. Benchmark affected queries on the fork, especially when the partition
  key is not part of the sorting key (landed 26.3).
- `joinGet`/`joinGetOrNull` now require `SELECT` privilege on the underlying
  Join table (landed 26.2).
- `CREATE TABLE ... AS` now requires the `SHOW COLUMNS` privilege (landed
  26.2).
- Converting a column from nullable to non-nullable with `ALTER MODIFY COLUMN`
  requires an explicit `DEFAULT` (landed 25.12).
- Special MergeTree engines (Replacing, Collapsing, …) can no longer be created
  with an empty `ORDER BY` (landed 25.12).
- Schema inference now respects nullability metadata from Parquet, ORC, and
  Arrow instead of making every column nullable
  (`schema_inference_make_columns_nullable` defaults to `3`). Review
  `s3()`, `url()`, and `file()` queries that expected all-nullable columns
  (landed 25.10).
- `Dynamic` columns can no longer be used in `JOIN` keys by default
  (`allow_dynamic_type_in_join_keys` defaults to `0`). Cast the column to a
  concrete type, or set the value to `1` to restore the previous behavior
  (landed 25.10).
- `JOIN ... USING` no longer accepts an empty column list. Rewrite affected
  joins with explicit key columns (landed 26.1).
- Binary operations between `IPv4`/`IPv6` and non-integer types are rejected
  instead of returning nonsensical results. Review expressions that combined IP
  columns with other types (landed 25.9).
- The `JSON` type `SKIP REGEXP` uses partial matching by default
  (`type_json_use_partial_match_to_skip_paths_by_regexp` defaults to `1`), so a
  pattern now skips any path it matches partially. Review `SKIP REGEXP` patterns
  used in `JSON` column definitions (landed 26.1).
- A formatter fix to alias substitution can change how `CREATE VIEW` statements
  that use `IN` are stored. Recheck views created with `IN` after upgrading
  (landed 26.1).

### Integration behaviour changes

Aiven for ClickHouse exposes the `MySQL`, `PostgreSQL`, and `Kafka` table
engines, so these integration defaults changed on upgrade:

- MySQL and PostgreSQL `DATE` columns map to `Date32`, and `DATETIME`/timestamp
  columns with precision map to `DateTime64`
  (`mysql_datatypes_support_level` defaults to `decimal,datetime64,date2Date32`).
  This avoids range errors for pre-1970 dates but changes inferred column types
  for existing integrations. Review downstream queries that assumed the previous
  types (landed 26.2/26.3).
- Kafka table-level SASL settings in `CREATE TABLE` now take precedence over
  configuration-file settings. Verify Kafka engine credentials after upgrading
  (landed 25.11). See also the changed defaults table below.

## Highlights

The following capabilities were introduced upstream between 25.8 and 26.3.

**Query performance**

- Materialized CTEs: `WITH x AS MATERIALIZED (...)` evaluates once into a
  temporary table. This feature is experimental and disabled by default on
  Aiven (`enable_materialized_cte = 0`). It requires the analyzer, which Aiven
  enables by default.
- Full-text search is generally available. Text indexes provide native inverted
  indexing for token-based search and no longer require experimental settings.
  If you created text indexes on 25.8 while the feature was experimental,
  drop them before upgrading and recreate them afterwards. The tokenizer
  parameter syntax also changed (landed 25.10); use the current
  `tokenizer = '...'` form when recreating indexes.
- Automatic JOIN reordering extended to ANTI, SEMI, and FULL joins (requires
  table statistics).
- Skip indexes support complex conditions beyond the primary key.
- Faster RIGHT/FULL OUTER joins; lower-memory `TTL DELETE` merges on wide
  tables.

**JSON and data types**

- `JSONExtract*` functions work directly on the `JSON` type.
- Reading a few subcolumns of a large `JSON` object uses less memory through
  more accurate subcolumn size estimation.
- Lazy JSON type hints: experimental and disabled by default on Aiven.
  They support metadata-only `ALTER ... MODIFY COLUMN data JSON(...)`.
- `Geometry` is a full data type with WKB/WKT support (landed 25.11).
- ALP compression codec for floating-point columns: experimental and disabled
  by default on Aiven.

**Ingestion and integrations**

- Bucketed Map storage (`map_serialization_version = 'with_buckets'`): opt-in
  format with 2–49× faster single-key Map lookups when enabled.
- S3Queue ordered mode lists only new objects — fewer `ListObjects` requests.
- **Experimental:** Delta Lake writes to existing tables are disabled by
  default on Aiven.
- Apache Paimon read support through the `paimon*` table functions. Paimon
  partition pruning is available but off by default on Aiven
  (`use_paimon_partition_pruning = 0`). Azure-backed lakes, including Microsoft
  OneLake, are reached through the Azure table-function variants (for example
  `deltaLakeAzure`, `icebergAzure`).

**Operations and SQL ergonomics**

- `EXPLAIN pretty=1, compact=1` for readable query plans.
- `naturalSortKey()` for human-friendly string ordering.
- Fractional and negative `LIMIT`/`OFFSET`, for example `LIMIT 0.25` to select a
  fraction of rows or a negative offset counting from the end.

**Experimental previews**

These are experimental upstream and disabled by default on Aiven for ClickHouse
26.3. Evaluate them on a fork, not in production.

- QBit vector type for tunable approximate vector search. The `QBit` type itself
  remains experimental; the transposed distance functions
  (`L2DistanceTransposed`, `cosineDistanceTransposed`) are available.
- Polyglot SQL transpiler for translating other SQL dialects into ClickHouse
  SQL (`allow_experimental_polyglot_dialect = 0`).

## Changed defaults

This table lists impactful ClickHouse default changes between 25.8 and 26.3
that Aiven adopts. For settings where Aiven defaults differ from upstream, see
[Default settings in 26.3](/docs/products/clickhouse/reference/26-3-default-settings).

<!-- markdownlint-disable MD013 MD060 -->

| Setting | Old | New | Landed | Effect |
|---------|-----|-----|--------|--------|
| `async_insert` | `0` (25.8) | `1` | 26.3 | Small inserts batched server-side. `compatibility = '25.8'` records `0` but does not restore every behavior. |
| `deduplicate_insert` | not available | enabled for all inserts | 26.2 | Uniform dedup including async inserts and materialized views. To restore earlier behavior, set this to `backward_compatible_choice` and `deduplicate_blocks_in_dependent_materialized_views` to `0`. |
| `replicated_deduplication_window_seconds` | `604800` (1 week) | `3600` (1 hour) | 25.10 | Retried inserts are deduplicated only within this window; a retry after one hour is no longer treated as a duplicate. |
| `schema_inference_make_columns_nullable` | `1` | `3` | 25.10 | Schema inference respects Parquet/ORC/Arrow nullability metadata instead of making all columns nullable. |
| `allow_dynamic_type_in_join_keys` | not available | `0` | 25.10 | `Dynamic` columns are rejected in `JOIN` keys unless set to `1`. |
| `object_serialization_version` | `v2` | `v3` | 25.12 | JSON column serialization compatibility; new on-disk layout. |
| `dynamic_serialization_version` | `v2` | `v3` | 25.12 | `Dynamic` column on-disk serialization. |
| `propagate_types_serialization_versions_to_nested_types` | not available | `1` | 26.3 | Applies serialization versions to nested types; parts using the new serialization are unreadable by older versions. |
| `apply_row_policy_after_final` | not available | `1` | 26.2 | Row policies apply after `FINAL` when enabled. |
| `cpu_slot_preemption` | `0` | `1` | 26.1 | Preemptive CPU slot scheduling; not controlled by compatibility. |
| Kafka SASL precedence | config wins | table settings win | 25.11 | Verify Kafka engine credentials. |

<!-- markdownlint-enable MD013 MD060 -->

On Aiven for ClickHouse 26.3, `compatibility` defaults to an empty value. Set
`compatibility = '25.8'` to apply earlier recorded setting defaults during
migration. Compatibility rewrites registered defaults only and does not
reproduce every behavior or server setting from the earlier release.

## Upgrade checklist

1. If the service is on 25.3, upgrade it to 25.8. Only 25.8 services can upgrade
   directly to 26.3.
2. Keep the 25.8 service powered on so Aiven can scan it for removed
   `Object('json')` columns, `TableEngine.LiveView` tables, and removed codecs.
3. Manually check for text indexes created on 25.8, hypothesis skip indexes,
   and uses of `detectProgrammingLanguage()`.
4. [Fork your service](/docs/platform/concepts/service-forking) and upgrade the
   fork.
5. Manually validate continuous ingestion, external integrations, insert
   behavior, queries with `NOT` or `FINAL`, and Kafka credentials on the fork.
6. Upgrade production:
   [Manage versions](/docs/products/clickhouse/howto/manage-clickhouse-versions).
