---
title: Upgrade to Aiven for ClickHouse® 26.3
sidebar_label: Upgrade to 26.3
early: true
---

Aiven for ClickHouse® 26.3 is a long-term support (LTS) release available in
Early Availability starting August 1, 2026. You can select it for new services
or upgrade an existing service from version 25.8. Version 25.8 remains the
default for new services.

Version 26.3 makes full-text search generally available, enables asynchronous
inserts by default, and introduces materialized common table expressions
(CTEs), the native `Geometry` type, and improvements to JSON processing and
query performance.

Before upgrading:

- Review [Changes that require attention](#changes-that-require-attention).
- For production services, test the upgrade on a
  [service fork](/docs/platform/concepts/service-forking). Aiven does not
  support downgrades.
- If your service runs version 25.3, upgrade it to version 25.8 first. Direct
  upgrades from version 25.3 to 26.3 are not supported.
- Review the upstream changes introduced in versions 25.9 through 26.3. These
  changes are included when you upgrade from version 25.8.

For the complete list of upstream changes, see the
[ClickHouse changelog](https://clickhouse.com/docs/whats-new/changelog).

## Changes that require attention

Review these changes because they can affect existing workloads.

### Removed features

Migrate or remove these features before upgrading.

<!-- markdownlint-disable MD013 MD060 -->

| Removed feature | Removed in version | Action |
|-----------------|--------------------|--------|
| `Object('json')` column type | 25.11 | Migrate columns to the [`JSON` type](https://clickhouse.com/docs/sql-reference/data-types/newjson). |
| `LiveView` | 25.12 | Drop live views or replace them with refreshable materialized views. |
| `DEFLATE_QPL` and `ZSTD_QAT` codecs | 26.2 | Recompress affected columns with a supported codec, such as `ZSTD`. |
| Text indexes created in version 25.8 | 26.2 | Drop the indexes before upgrading. After the upgrade, recreate them using the current storage format. |
| Experimental hypothesis skip indexes | 26.3 | Drop the experimental hypothesis skip indexes. |
| `detectProgrammingLanguage()` function | 26.3 | Move language detection to your application or replace calls with a supported alternative. |
| `searchAny()` and `searchAll()` functions | 25.10 | Replace calls with `hasAnyTokens()` and `hasAllTokens()`. |

<!-- markdownlint-enable MD013 MD060 -->

### Automatic pre-upgrade checks

Aiven automatically scans your service running version 25.8 for columns that use
the removed `Object('json')` type, `LiveView` tables, and columns that use
removed codecs. Aiven blocks the upgrade if it finds any of these. For
`Object('json')` columns, Aiven also provides SQL statements to help you migrate
them. The service must be running for Aiven to complete the scan.

Aiven does not automatically check text indexes created in version 25.8,
hypothesis skip indexes, or uses of `detectProgrammingLanguage()`. Before
upgrading, check for and resolve:

- Text indexes created in version 25.8
- Experimental hypothesis skip indexes
- Uses of `detectProgrammingLanguage()`

### Insert behavior changes

Aiven for ClickHouse 26.3 uses these upstream insert defaults:

- **`async_insert` defaults to `1`.** In upstream ClickHouse 25.8, the default
  was `0`.
  The server batches small inserts instead of processing each insert
  synchronously. This change can affect when an insert is acknowledged and when
  its data becomes visible. To apply the setting defaults recorded for version
  25.8, set `compatibility = '25.8'`. This compatibility setting does not
  restore all version 25.8 behavior or server settings. Introduced in 26.3.
- **Insert deduplication applies to all insert paths.** This includes
  asynchronous inserts and inserts into dependent materialized views. The
  `deduplicate_insert` setting did not exist in version 25.8. To restore the
  previous deduplication behavior, set the following settings:

  ```sql
  SET deduplicate_insert = 'backward_compatible_choice';
  SET deduplicate_blocks_in_dependent_materialized_views = 0;
  ```

  Introduced in version 26.2.

- **The insert deduplication window is shorter.** The
  `replicated_deduplication_window_seconds` table setting changes from one week
  in version 25.8 to one hour. The `replicated_deduplication_window` setting
  changes from `1000` to `10000`. As a result, ClickHouse does not treat an
  insert retried more than one hour after the original insert as a duplicate.
  Introduced in version 25.10.

In Aiven for ClickHouse 26.3, `compatibility` defaults to an empty value. During
migration, you can set `compatibility = '25.8'` at the session or profile level
to apply earlier recorded setting defaults. This setting does not reproduce
every previous behavior or server setting. For details, see
[Changed default settings and behavior](#changed-default-settings-and-behavior).

### On-disk format changes

Aiven for ClickHouse 26.3 can write new part formats that earlier ClickHouse
versions cannot read. Because Aiven does not support downgrades, test the
upgrade on a service fork before upgrading your production service.

- **`object_serialization_version` changes from `v2` to `v3`.** This setting
  controls `JSON` column serialization compatibility. New parts can use a layout
  that earlier versions cannot read. Introduced in 25.12.
- **`propagate_types_serialization_versions_to_nested_types` defaults to `1`.**
  This applies serialization versions to nested types. Earlier ClickHouse
  versions cannot read parts that use this serialization. Introduced in 26.3.
- **`String` columns use a new serialization format.** When
  `serialization_info_version` is set to `with_types`, ClickHouse uses the
  `with_size_stream` format. Versions earlier than 25.10 cannot read parts
  written in this format. Introduced in 25.11.
- **Bucketed `Map` storage remains disabled by default.** No action is required
  unless you plan to use the new format. To enable it, set
  `map_serialization_version = 'with_buckets'`. Introduced in 26.3.
- **Filenames are escaped in wide parts.** This applies to tables with
  `Variant`, `Dynamic`, or `JSON` subcolumns. Introduced in 25.11.
- **Rebuild affected column statistics after upgrading.** If you use column
  statistics for a column changed from `String` to `Nullable(String)`, run
  `ALTER TABLE ... MATERIALIZE STATISTICS ALL`. Introduced in versions 25.12
  through 26.1.

### Query result and privilege changes

- **`NOT` operator precedence changed.** It follows standard SQL precedence.
  Review predicates that use `NOT`, especially expressions that do not use
  parentheses to make the evaluation order explicit. Introduced in 26.3.
- **Some `FINAL` queries read more partitions.** These queries cannot apply
  partition pruning before row merging. This preserves correctness but can
  increase the number of partitions read. Benchmark affected queries on the
  upgraded service fork, especially when the partition key is not part of the
  sorting key. Introduced in 26.3.
- **`joinGet()` and `joinGetOrNull()` require the `SELECT` privilege on the
  underlying `Join` table.** Grant the privilege to users or roles that call
  these functions. Introduced in 26.2.
- **`CREATE TABLE ... AS` requires `SHOW COLUMNS`.** Grant the privilege to users
  or roles that create tables from existing tables. Introduced in 26.2.
- **Nullable-to-non-nullable conversions require an explicit `DEFAULT`.** Add a
  default expression when you use `ALTER TABLE ... MODIFY COLUMN` to make a
  nullable column non-nullable. Introduced in 25.12.
- **Special MergeTree engines require a non-empty `ORDER BY`.** This applies to
  engines such as `ReplacingMergeTree` and `CollapsingMergeTree`. Introduced in
  25.12.
- **Schema inference uses source nullability metadata.** Schema inference now
  uses the nullability metadata provided by the source format instead of making
  every inferred column nullable (`schema_inference_make_columns_nullable`
  defaults to `3`). Review `s3()`, `url()`, and `file()` queries that expected
  all-nullable columns. Introduced in 25.10.
- **`Dynamic` columns are disabled in `JOIN` keys by default.**
  `allow_dynamic_type_in_join_keys` defaults to `0`. Cast the column to a
  concrete type, or set `allow_dynamic_type_in_join_keys = 1` to restore the
  previous behavior. Introduced in 25.10.
- **`JOIN ... USING` requires explicit key columns.** Rewrite affected joins
  to specify one or more join key columns in the `USING` clause. Introduced in
  26.1.
- **Invalid IP binary operations are rejected.** Update expressions that apply
  binary operators to `IPv4` or `IPv6` values and non-integer operands.
  Introduced in 25.9.
- **`JSON` `SKIP REGEXP` uses partial matching by default.**
  `type_json_use_partial_match_to_skip_paths_by_regexp` defaults to `1`, so a
  pattern skips any path it matches partially. Review `SKIP REGEXP` patterns
  used in `JSON` column definitions. Introduced in 26.1.
- **Formatter alias substitution can affect stored views.** A formatter fix can
  change stored `CREATE VIEW` statements that use `IN`. After upgrading, recheck
  those views. Introduced in 26.1.

### Integration behavior changes

Aiven for ClickHouse exposes the `MySQL`, `PostgreSQL`, and `Kafka` table
engines, so these integration defaults change when you upgrade:

- **MySQL and PostgreSQL date and timestamp columns map to wider ClickHouse
  types.** `DATE` columns map to `Date32`, and `DATETIME` or timestamp columns
  with precision map to `DateTime64`. This avoids range errors for pre-1970
  dates but changes inferred column types for existing integrations. Review
  downstream queries that assumed the previous types. For MySQL integrations,
  this behavior is controlled by `mysql_datatypes_support_level`, which defaults
  to `decimal,datetime64,date2Date32`. Introduced in 26.2 and 26.3.
- **Kafka table-level SASL settings in `CREATE TABLE` take precedence over
  configuration-file settings.** If the same SASL setting exists in both the
  table definition and the configuration file, verify that the table-level value
  is correct before upgrading. Introduced in version 25.11. For a summary, see
  [Changed default settings and behavior](#changed-default-settings-and-behavior).

## New features and improvements

Aiven for ClickHouse 26.3 includes the following features and improvements from
upstream ClickHouse versions 25.9 through 26.3.

### Query performance

- **Materialized CTEs.** The `WITH x AS MATERIALIZED (...)` syntax evaluates a
  CTE once and stores the result in a temporary table. This feature is
  experimental and disabled by default on Aiven (`enable_materialized_cte = 0`).
  It requires the analyzer, which Aiven enables by default.
- **Generally available full-text search.** Text indexes provide native inverted
  indexes for token-based search and no longer require experimental settings.
  If you created text indexes in 25.8, follow the steps in
  [Removed features](#removed-features). The tokenizer syntax also changed in
  version 25.10. Use the current `tokenizer = '...'` syntax when recreating the
  indexes.
- **Expanded automatic `JOIN` reordering.** Automatic reordering now supports
  `ANTI`, `SEMI`, and `FULL` joins and requires table statistics.
- **More flexible skip indexes.** Skip indexes support more complex query
  conditions.
- **Improved outer join performance.** `RIGHT` and `FULL OUTER` joins have
  improved performance.
- **Lower-memory `TTL DELETE` merges.** `TTL DELETE` merges use less memory on
  wide tables.

### JSON and data types

- **`JSONExtract*` support for `JSON`.** `JSONExtract*` functions work directly
  on the `JSON` type.
- **Lower-memory reads for large `JSON` objects.** Queries that read only a few
  subcolumns of a large `JSON` object use less memory through more accurate
  subcolumn size estimation.
- **Lazy JSON type hints.** Lazy JSON type hints support metadata-only
  `ALTER ... MODIFY COLUMN data JSON(...)` operations. This feature is
  experimental and disabled by default on Aiven.
- **Native `Geometry` type.** The `Geometry` type supports WKB and WKT
  representations. Introduced in 25.11.
- **Experimental ALP compression.** The ALP codec compresses floating-point
  columns and is disabled by default on Aiven.

### Ingestion and integrations

- **Bucketed `Map` storage.** Bucketed `Map` storage can improve single-key
  lookups in `Map` columns. The format is disabled by default.
- **S3Queue ordered mode.** S3Queue ordered mode lists only new objects, which
  reduces the number of `ListObjects` requests.
- **Experimental Delta Lake writes.** Delta Lake writes to existing tables are
  experimental and disabled by default on Aiven.
- **Apache Paimon table functions.** Apache Paimon tables can be read through
  the `paimon*` table functions. Aiven disables Paimon partition pruning by
  default (`use_paimon_partition_pruning = 0`).
- **Azure table-function variants.** Azure table-function variants, such as
  `deltaLakeAzure` and `icebergAzure`, support Azure-backed data lakes,
  including Microsoft OneLake.

### SQL and operational improvements

- **Readable query plans.** `EXPLAIN pretty=1, compact=1` produces readable
  query plans.
- **Human-friendly string ordering.** `naturalSortKey()` supports human-friendly
  string ordering.
- **Fractional and negative `LIMIT` and `OFFSET` values.** `LIMIT` and `OFFSET`
  support fractional and negative values. For example, use `LIMIT 0.25` to
  select a fraction of rows or a negative offset to count from the end.

### Experimental previews

These upstream features are experimental and disabled by default on Aiven for
ClickHouse 26.3. Test them on a service fork before using them in production.

- **`QBit` vector type.** The experimental `QBit` type supports tunable
  approximate vector search. The transposed distance functions, including
  `L2DistanceTransposed` and `cosineDistanceTransposed`, are available
  separately.
- **Polyglot SQL transpiler.** The transpiler converts supported SQL dialects to
  ClickHouse SQL. It is controlled by `allow_experimental_polyglot_dialect`,
  which defaults to `0`.

## Changed default settings and behavior

The following table lists ClickHouse default changes from 25.8 to 26.3 that
Aiven adopts and that can affect workloads.

<!-- markdownlint-disable MD013 MD060 -->

| Setting or behavior | Previous behavior | New behavior | Introduced | Effect |
|---------------------|-------------------|--------------|------------|--------|
| `async_insert` | `0` (25.8) | `1` | 26.3 | Small inserts are batched server-side. Setting `compatibility = '25.8'` applies the earlier default of `0` but does not restore every version 25.8 behavior. |
| `deduplicate_insert` | Unavailable | Enabled for all insert paths | 26.2 | Deduplication applies to all inserts, including asynchronous inserts and inserts into dependent materialized views. To restore earlier behavior, set this to `backward_compatible_choice` and `deduplicate_blocks_in_dependent_materialized_views` to `0`. |
| `replicated_deduplication_window_seconds` | `604800` (1 week) | `3600` (1 hour) | 25.10 | Retried inserts are deduplicated only within this window. A retry after one hour is no longer treated as a duplicate. |
| `schema_inference_make_columns_nullable` | `1` | `3` | 25.10 | Schema inference respects Parquet/ORC/Arrow nullability metadata instead of making all columns nullable. |
| `allow_dynamic_type_in_join_keys` | Unavailable | `0` | 25.10 | `Dynamic` columns are rejected in `JOIN` keys unless set to `1`. |
| `object_serialization_version` | `v2` | `v3` | 25.12 | Controls `JSON` column serialization compatibility. New parts can use a layout that earlier versions cannot read. |
| `propagate_types_serialization_versions_to_nested_types` | Unavailable | `1` | 26.3 | Applies serialization versions to nested types. Earlier ClickHouse versions cannot read parts that use this serialization. |
| `apply_row_policy_after_final` | Unavailable | `1` | 26.2 | Row policies are applied after `FINAL`, so row filtering happens after final row merging. |
| `cpu_slot_preemption` | `0` | `1` | 26.1 | Enables preemptive CPU slot scheduling. `compatibility` does not control this setting. |
| Kafka SASL precedence | Configuration file settings take precedence | Table-level settings take precedence | 25.11 | Verify table-level Kafka engine credentials when the same SASL setting also exists in the configuration file. |

<!-- markdownlint-enable MD013 MD060 -->

## Upgrade checklist

1. If your service runs version 25.3, upgrade it to 25.8. Only services on 25.8
   can upgrade directly to 26.3.
1. Keep the service on version 25.8 powered on until Aiven completes the
   pre-upgrade scan for removed `Object('json')` columns, `LiveView` tables, and
   codecs.
1. Check for and remove or migrate text indexes created in version 25.8,
   experimental hypothesis skip indexes, and uses of
   `detectProgrammingLanguage()`.
1. [Fork your service](/docs/platform/concepts/service-forking) and upgrade the
   fork.
1. Validate continuous ingestion and insert acknowledgment behavior on the fork.
1. Test external integrations, including Kafka engine authentication.
1. Test queries that use `NOT`, `FINAL`, dynamic join keys, or schema inference.
1. Verify the privilege changes described in
   [Query result and privilege changes](#query-result-and-privilege-changes).
1. Compare application results and query performance with the original service.
1. Follow [Manage versions](/docs/products/clickhouse/howto/manage-clickhouse-versions)
   to upgrade the production service.
