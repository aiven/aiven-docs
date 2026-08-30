---
title: Aiven for ClickHouse® 26.3 default settings
sidebar_label: Default settings in 26.3
---

Aiven for ClickHouse® uses a managed configuration that differs from upstream ClickHouse defaults.
These differences help keep services reliable, secure, and predictable in
Aiven-managed environments.

Aiven applies conservative defaults and constraints where upstream behavior can
affect query correctness, upgrade compatibility, or shared resource isolation.

The following sections list the settings where Aiven defaults or constraints
differ from version 26.3, grouped by session, table, and server scope.

## How to read the settings tables

Each setting includes an Aiven default value and indicates whether you can change it:

- **Can be changed: No**: Aiven manages the setting value. You cannot override it.
- **Can be changed: Yes**: Aiven sets the default value, but you can change it
  where the setting is configurable.

Where Aiven defaults vary by service plan or node resources, the **Aiven default**
column shows ranges or placeholders. The **Description** column explains why the
default differs or lists any configurable bounds, such as an allowed range or
minimum value.

Values shown as ranges or placeholders, such as
`[3..80, depending on CPU count]`, `{cpu_count}`, or `[~7% of RAM]`, are sized
automatically based on your service plan and node resources.

:::note
For configurable settings and Aiven-defined limits, see
[Advanced parameters for Aiven for ClickHouse®](/docs/products/clickhouse/reference/advanced-params)
and [Limits and limitations](/docs/products/clickhouse/reference/limitations).
:::

## Session settings

These settings apply to sessions and queries.

<!-- markdownlint-disable MD013 MD060 -->

| Setting                                                 | Aiven default                           | Can be changed | Description                                                                                                                                                                      |
| ------------------------------------------------------- | --------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_deprecated_error_prone_window_functions`         | `0`                                     | No             | Keeps deprecated, error-prone window functions disabled.                                                                                                                         |
| `allow_deprecated_snowflake_conversion_functions`       | `0`                                     | No             | Keeps deprecated Snowflake conversion functions disabled.                                                                                                                        |
| `allow_experimental_kafka_offsets_storage_in_keeper`    | `0`                                     | No             | Keeps experimental Kafka offset storage in Keeper disabled.                                                                                                                      |
| `allow_introspection_functions`                         | `0`                                     | Yes            | Keeps sensitive debugging and introspection functions disabled by default.                                                                                                       |
| `allow_non_default_profile`                             | `0`                                     | No             | Prevents switching to unmanaged profiles.                                                                                                                                        |
| `cancel_http_readonly_queries_on_client_close`          | `1`                                     | Yes            | Cancels read-only HTTP queries when clients disconnect.                                                                                                                          |
| `check_named_collection_dependencies`                   | `1`                                     | No             | Prevents removal of named collections used by tables, protecting table availability and managed backup and restore operations.                                                                                         |
| `cluster_function_process_archive_on_multiple_nodes`    | `0`                                     | Yes            | Disables archive processing on multiple nodes by default.                                                                                                                        |
| `compatibility`                                         | `""`                                    | Yes            | Does not force a lower compatibility profile by default.                                                                                                                         |
| `correlated_subqueries_use_in_memory_buffer`            | `0`                                     | Yes            | Preserves compatibility with all join algorithms and prevents valid correlated subqueries from failing.                                                                          |
| `database_replicated_allow_replicated_engine_arguments` | `1`                                     | No             | Supports replicated database and table creation in Aiven-managed services.                                                                                                       |
| `delta_lake_snapshot_end_version`                       | `-1`                                    | No             | Prevents incorrect Delta Lake change data feed results because version 26.3 can silently ignore explicit end bounds on some storage backends.                                    |
| `delta_lake_snapshot_start_version`                     | `-1`                                    | No             | Prevents incorrect Delta Lake change data feed results because version 26.3 can silently ignore explicit start bounds on some storage backends.                                  |
| `distributed_ddl_entry_format_version`                  | `7`                                     | No             | Pins the distributed DDL entry format to avoid inconsistencies during version upgrades.                                                                                          |
| `distributed_ddl_output_mode`                           | `null_status_on_timeout`                | Yes            | Makes distributed DDL timeout reporting more resilient to recoverable errors.                                                                                                    |
| `enable_materialized_cte`                               | `0`                                     | No             | Keeps experimental materialized common table expressions disabled to prevent known crashes and incorrect dependency ordering.                                                    |
| `enable_producing_buckets_out_of_order_in_aggregation`  | `0`                                     | No             | Keeps aggregation buckets ordered to prevent failures in multi-layer distributed aggregations.                                                                                   |
| `format_display_secrets_in_show_and_select`             | `0`                                     | Yes            | Avoids exposing secrets in `SHOW` and `SELECT` output by default.                                                                                                                |
| `http_max_request_header_size`                          | `131072`                                | No             | Limits HTTP request headers to 128 KiB, protecting service availability by bounding memory allocated before authentication.                                                       |
| `http_write_exception_in_output_format`                 | `0`                                     | Yes            | Keeps exceptions out of the requested output format so client errors are easier to detect.                                                                                       |
| `max_autoincrement_series`                              | `1000`                                  | No             | Limits automatic sequence expansion.                                                                                                                                             |
| `max_concurrent_queries_for_all_users`                  | `[100..800, depending on service size]` | No             | Enforces a service-wide concurrency limit.                                                                                                                                       |
| `max_http_get_redirects`                                | `10`                                    | Yes            | Limits HTTP redirect following.                                                                                                                                                  |
| `max_insert_threads`                                    | `2`                                     | Yes            | Allowed range: `1..{cpu_count}`. Caps insert parallelism so a single query does not use too many shared service resources.                                                       |
| `max_threads`                                           | `{cpu_count}`                           | Yes            | Allowed range: `1..{cpu_count}`. Caps general query parallelism to the node CPU count.                                                                                           |
| `memory_profiler_sample_probability`                    | `0`                                     | No             | Disables random memory profiler sampling.                                                                                                                                        |
| `memory_profiler_step`                                  | `4194304`                               | Yes            | Minimum value: `100000`. Keeps the upstream memory profiler granularity while preventing very low values.                                                                        |
| `min_free_disk_ratio_to_perform_insert`                 | `0.05`                                  | No             | Keeps a disk headroom guard before accepting inserts.                                                                                                                            |
| `optimize_qbit_distance_function_reads`                 | `0`                                     | Yes            | Disables partial reads that can fail queries using nullable, `Variant`, or `Dynamic` vectors.                                                                                     |
| `os_thread_priority`                                    | `0`                                     | Yes            | Allowed range: `0..19`. Allows normal or lower query priority while preventing workloads from taking priority over shared service operations.                                     |
| `os_threads_nice_value_materialized_view`               | `0`                                     | Yes            | Allowed range: `0..19`. Allows normal or lower materialized-view priority while protecting shared service operations.                                                            |
| `os_threads_nice_value_query`                           | `0`                                     | Yes            | Allowed range: `0..19`. Allows normal or lower query priority while protecting shared service operations.                                                                        |
| `output_format_json_quote_64bit_integers`               | `1`                                     | Yes            | Keeps JSON output compatible with clients that cannot safely represent 64-bit integers. This default can change in a future version.                                             |
| `postgresql_connection_attempt_timeout`                 | `10`                                    | Yes            | Limits each PostgreSQL connection attempt.                                                                                                                                       |
| `postgresql_connection_pool_connect_timeout`            | `10`                                    | Yes            | Limits pooled PostgreSQL connection setup.                                                                                                                                       |
| `push_external_roles_in_interserver_queries`            | `0`                                     | No             | External authorization is not supported. Roles must be synchronized between nodes.                                                                                               |
| `query_profiler_cpu_time_period_ns`                     | `1000000000`                            | Yes            | Minimum value: `1000000`. Keeps the upstream CPU profiler sampling period while preventing sub-millisecond values.                                                               |
| `query_profiler_real_time_period_ns`                    | `1000000000`                            | Yes            | Minimum value: `1000000`. Keeps the upstream real-time profiler sampling period while preventing sub-millisecond values.                                                         |
| `query_plan_convert_any_join_to_semi_or_anti_join`      | `0`                                     | Yes            | Disables a join optimization that can return incorrect results when a dependent set is not ready.                                                                                |
| `query_plan_direct_read_from_text_index`                | `0`                                     | Yes            | Disables direct text-index reads because version 26.3 can return incorrect results for nullable columns and updated parts.                                                        |
| `query_plan_remove_unused_columns`                      | `0`                                     | Yes            | Preserves earlier query-plan behavior and avoids excessive memory use for aggregate queries with `PREWHERE` filters over wide string columns.                                     |
| `readonly`                                              | `0`                                     | Yes            | Controls read/write access for the session. You can change the value from `0` to `1`, but not from `1` to `0`.                                                                 |
| `stream_like_engine_allow_direct_select`                | `1`                                     | Yes            | Allows direct `SELECT` queries on stream-like engines, which can have suboptimal performance or behavior. A future release returns this default to the upstream default.         |
| `write_full_path_in_iceberg_metadata`                   | `1`                                     | Yes            | Writes full Iceberg metadata paths for compatibility with mainstream ClickHouse behavior.                                                                                        |

<!-- markdownlint-enable MD013 MD060 -->

## Replicated MergeTree table settings

These settings apply to the `ReplicatedMergeTree` table engine family. On the
Aiven platform, `MergeTree` engines are remapped to their `ReplicatedMergeTree`
variants. See
[Supported table engines](/docs/products/clickhouse/reference/supported-table-engines).

<!-- markdownlint-disable MD013 MD060 -->

| Setting                                                               | Aiven default | Can be changed | Description                                                                                                                    |
| --------------------------------------------------------------------- | ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `allow_remote_fs_zero_copy_replication`                               | `1`           | No             | Enables zero-copy replication for remote filesystem storage. Aiven manages this storage behavior.                              |
| `disable_detach_partition_for_zero_copy_replication`                  | `0`           | No             | Keeps `DETACH PARTITION` available for zero-copy replicated tables.                                                            |
| `disable_fetch_partition_for_zero_copy_replication`                   | `0`           | No             | Keeps `FETCH PARTITION` available for zero-copy replicated tables.                                                             |
| `disable_freeze_partition_for_zero_copy_replication`                  | `0`           | No             | Keeps `FREEZE PARTITION` available for zero-copy replicated tables.                                                            |
| `enable_max_bytes_limit_for_min_age_to_force_merge`                   | `1`           | No             | Enforces the byte-size limit when age-based forced merges are considered. This helps prevent creation of very large parts.     |
| `finished_mutations_to_keep`                                          | `10`          | Yes            | Limits retained finished mutation metadata so ZooKeeper or Keeper state does not grow unnecessarily.                           |
| `max_parts_in_total`                                                  | `10000`       | Yes            | Allowed range: `100..50000`. Sets a cap on table part count to protect merge performance and metadata size.                    |
| `number_of_free_entries_in_pool_to_execute_mutation`                  | `20`          | Yes            | Uses the upstream default while limiting the value below the service background pool capacity.                                 |
| `number_of_free_entries_in_pool_to_execute_optimize_entire_partition` | `25`          | Yes            | Uses the upstream default while limiting the value below the service background pool capacity.                                 |
| `number_of_free_entries_in_pool_to_lower_max_size_of_merge`           | `8`           | Yes            | Uses the upstream default while limiting the value below the service background pool capacity.                                 |
| `old_parts_lifetime`                                                  | `60`          | Yes            | Reduces the lifetime of outdated merged parts to lower the number of ZooKeeper or Keeper metadata nodes.                       |
| `serialization_info_version`                                          | `basic`       | Yes            | Preserves part compatibility with ClickHouse 25.8 during rolling upgrades, rollback, and restore operations.                    |
| `table_readonly`                                                      | `0`           | No             | Keeps an unsupported mode disabled because it can block managed operations and distributed DDL without protecting replicated tables. |

<!-- markdownlint-enable MD013 MD060 -->

## Server settings

These settings are configured at the server level and are managed by Aiven. They
are not configurable as session settings. Most settings are derived from your
service plan. Some settings, such as `vector_similarity_index_cache_size`, are
exposed through advanced configuration.

<!-- markdownlint-disable MD013 MD060 -->

| Setting                                         | Aiven default                                       | Description                                                                                                                                              |
| ----------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `background_pool_size`                          | `[8..32, depending on CPU count]`                   | Sizes the background merge and mutation pool based on service CPU capacity. If an explicit service-level override is configured, Aiven preserves it.     |
| `cgroups_memory_usage_observer_wait_time`       | `0`                                                 | Disables the ClickHouse cgroup memory usage observer because Aiven sets explicit memory limits for the managed server process.                           |
| `cluster_database`                              | `default`                                           | Sets the database used by cluster-related helpers to the managed default database.                                                                       |
| `database_atomic_delay_before_drop_table_sec`   | `0`                                                 | Removes the Atomic database delayed-drop wait to prevent race conditions in refreshable materialized views.                                              |
| `default_database`                              | `default`                                           | Uses the managed default database unless another database is selected explicitly.                                                                        |
| `default_replica_name`                          | `{replica}`                                         | Uses the Aiven-provided replica macro in replicated table paths.                                                                                         |
| `dictionary_user`                               | `avnadmin`                                          | Runs dictionary queries through the managed admin user.                                                                                                  |
| `disable_internal_dns_cache`                    | `1`                                                 | Prevents ClickHouse from keeping stale internal DNS results in a managed environment where node addresses can change.                                    |
| `display_secrets_in_show_and_select`            | `1`                                                 | Keeps server-level secret display available for privileged managed operations. User-facing profile settings hide secrets by default.                     |
| `iceberg_catalog_threadpool_pool_size`          | `[3..80, depending on CPU count]`                   | Scales Iceberg catalog worker concurrency with service CPU capacity.                                                                                     |
| `iceberg_metadata_files_cache_size`             | `[~7% of RAM]`                                      | Sizes the Iceberg metadata file cache based on the managed memory budget.                                                                                |
| `index_mark_cache_size`                         | `[~7% of RAM]`                                      | Sizes the secondary index mark cache based on the managed memory budget.                                                                                 |
| `keep_alive_timeout`                            | `10`                                                | Limits idle keep-alive connections to 10 seconds so clients cannot hold server resources indefinitely.                                                   |
| `mark_cache_size`                               | `[~7% of RAM]`                                      | Sizes the primary mark cache based on the managed memory budget.                                                                                         |
| `max_concurrent_queries`                        | `[147..847, depending on service size]`             | Sets a server-wide concurrency limit based on the service plan, with extra internal capacity reserved for monitoring, backup, and operator queries.      |
| `max_connections`                               | `[1000..4000, depending on service size]`           | Sets the connection limit based on service size. Smaller nodes have lower limits to prevent overload, and larger service plans allow higher limits.      |
| `max_database_num_to_throw`                     | `400`                                               | Enforces a hard limit on the number of databases to protect metadata and reduce operational overhead.                                                    |
| `max_database_num_to_warn`                      | `200`                                               | Warns before the hard database-count limit is reached.                                                                                                   |
| `max_format_parsing_thread_pool_size`           | `[3..80, depending on CPU count]`                   | Scales the format parsing thread pool with service CPU capacity.                                                                                         |
| `max_named_collection_num_to_throw`             | `5000`                                              | Bounds customer-managed named collections to protect Keeper metadata, configuration reloads, and backup operations.                                       |
| `max_partition_size_to_drop`                    | `0`                                                 | Removes the server-side partition-size guard for drops to avoid common operational issues.                                                               |
| `max_prefixes_deserialization_thread_pool_size` | `[3..80, depending on CPU count]`                   | Scales the prefixes deserialization thread pool with service CPU capacity.                                                                               |
| `max_server_memory_usage`                       | `[65%..70% of host RAM, depending on service size]` | Caps ClickHouse memory use below total host RAM so the node retains memory for the operating system, caching, and service management operations.         |
| `max_table_size_to_drop`                        | `0`                                                 | Removes the server-side table-size guard for drops to avoid common operational issues.                                                                   |
| `memory_worker_correct_memory_tracker`          | `1`                                                 | Lets the ClickHouse memory worker correct memory tracking drift.                                                                                         |
| `parquet_metadata_cache_size`                   | `[~7% of RAM]`                                      | Scales the Parquet metadata cache with service memory to prevent disproportionate use on smaller plans.                                                   |
| `prefetch_threadpool_pool_size`                 | `[3..80, depending on CPU count]`                   | Scales the prefetch thread pool with service CPU capacity.                                                                                               |
| `prepare_system_log_tables_on_startup`          | `1`                                                 | Ensures system log tables are ready immediately after startup for managed observability and diagnostics.                                                 |
| `reserved_replicated_database_prefixes`         | `["aiven", "endpoint_", "service_"]`                | Reserves internal database name prefixes for Aiven-managed objects.                                                                                      |
| `series_keeper_path`                            | `/clickhouse/series`                                | Sets the Keeper path for `generateSerialID` counter nodes.                                                                                               |
| `show_addresses_in_stack_traces`                | `0`                                                 | Avoids exposing raw addresses in stack traces returned to users or logs.                                                                                 |
| `text_index_header_cache_size`                  | `[~1.75% of RAM, maximum 1 GiB]`                    | Assigns 25% of a plan-scaled text-index cache budget to headers, protecting smaller services from disproportionate memory use.                            |
| `text_index_postings_cache_size`                | `[~3.5% of RAM, maximum 2 GiB]`                     | Assigns 50% of a plan-scaled text-index cache budget to posting lists, protecting smaller services from disproportionate memory use.                      |
| `text_index_tokens_cache_size`                  | `[~1.75% of RAM, maximum 1 GiB]`                    | Assigns 25% of a plan-scaled text-index cache budget to tokens, protecting smaller services from disproportionate memory use.                             |
| `threadpool_local_fs_reader_pool_size`          | `[3..80, depending on CPU count]`                   | Scales local filesystem reader concurrency with service CPU capacity.                                                                                    |
| `threadpool_remote_fs_reader_pool_size`         | `[3..80, depending on CPU count]`                   | Scales remote filesystem reader concurrency with service CPU capacity.                                                                                   |
| `threadpool_writer_pool_size`                   | `[3..80, depending on CPU count]`                   | Scales filesystem writer concurrency with service CPU capacity.                                                                                          |
| `uncompressed_cache_size`                       | `[~7% of RAM]`                                      | Sizes the uncompressed block cache based on the managed memory budget.                                                                                   |
| `user_with_indirect_database_creation`          | `avnadmin`                                          | Restricts indirect database creation privileges to the managed admin user.                                                                               |
| `vector_similarity_index_cache_size`            | `0.07`                                              | Sizes the vector similarity index cache as a fraction of total server memory. The default is `0.07`, or 7% of RAM. Set to `0` to disable the cache. Maximum value: `0.5`. This setting can be changed in advanced configuration and applies to ClickHouse 25.8 or later. |

<!-- markdownlint-enable MD013 MD060 -->
