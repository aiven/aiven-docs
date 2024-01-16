---
title: Advanced parameters for Aiven for PostgreSQL®
---

On creating a PostgreSQL® database, you can customize it using a series
of the following advanced parameters:

## General parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Value Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>admin_password</code></td>
    <td>string</td>
    <td>Custom password for the admin user. It defaults to a random string, and should be set when a new service is being created.</td>
  </tr>
  <tr>
    <td><code>admin_username</code></td>
    <td>string</td>
    <td>Custom username for admin user. It should be set when a new service is being created. The default value is: <code>avnadmin</code></td>
  </tr>
  <tr>
    <td><code>backup_hour</code></td>
    <td>integer</td>
    <td>The hour of the day (in UTC) when backup for the service is started. New backup is started only if the previous backup has been completed. A valid range is: 0-24</td>
  </tr>
  <tr>
    <td><code>backup_minute</code></td>
    <td>integer</td>
    <td>The minute of the hour when backup for the service is started. New backup is started only if the previous backup has been completed. A valid range is: 0-60</td>
  </tr>
  <tr>
    <td><code>ip_filter</code></td>
    <td>array</td>
    <td>Restricts the incoming connections from the Classless Inter-Domain Routing (CIDR) address block, e.g. <code>10.20.0.0/16</code>. The default value is: <code>0.0.0.0/0</code></td>
  </tr>
  <tr>
    <td><code>pg.deadlock_timeout</code></td>
    <td>integer</td>
    <td>Amount of waiting time on a lock, in milliseconds, before the check to see if there is a deadlock condition.</td>
  </tr>
  <tr>
    <td><code>pg.default_toast_compression</code></td>
    <td>string</td>
    <td>Specifies the default TOAST compression method for values of compressible columns. Available since PostgreSQL version 14. The default value is <code>lz4</code>. Valid values are <code>lz4</code>, <code>pglz</code>.</td>
  </tr>
  <tr>
    <td><code>pg.idle_in_transaction_session_timeout</code></td>
    <td>integer</td>
    <td>Times out all sessions with open transactions after this time in milliseconds.</td>
  </tr>
  <tr>
    <td><code>pg.jit</code></td>
    <td>boolean</td>
    <td>Controls the system-wide use of Just-in-Time Compilation (JIT).</td>
  </tr>
  <tr>
    <td><code>pg.log_error_verbosity</code></td>
    <td>string</td>
    <td>Controls the amount of detail written in the server log for each message that is logged. A valid range is: terse, default, verbose</td>
  </tr>
  <tr>
    <td><code>pg.log_line_prefix</code></td>
    <td>string</td>
    <td>Lets you choose from one of the available log-formats. This supports log analysers, such as: <code>pgbadger</code>, <code>pganalyze</code>, etc.</td>
  </tr>
  <tr>
    <td><code>pg.log_min_duration_statement</code></td>
    <td>integer</td>
    <td>Logs statements that take more than the specified number of milliseconds to run. The -1 disables it.</td>
  </tr>
  <tr>
    <td><code>pg.max_files_per_process</code></td>
    <td>integer</td>
    <td>The maximum number of PostgreSQL files that can be open per process.</td>
  </tr>
  <tr>
    <td><code>pg.max_locks_per_transaction</code></td>
    <td>integer</td>
    <td>The maximum PostgreSQL locks per transaction.</td>
  </tr>
  <tr>
    <td><code>pg.max_logical_replication_workers</code></td>
    <td>integer</td>
    <td>The maximum PostgreSQL logical replication workers (as defined by the pool of <code>max_parallel_workers</code>).</td>
  </tr>
  <tr>
    <td><code>pg.max_parallel_workers</code></td>
    <td>integer</td>
    <td>The maximum number of workers that the system can support for parallel queries.</td>
  </tr>
  <tr>
    <td><code>pg.max_parallel_workers_per_gather</code></td>
    <td>integer</td>
    <td>The maximum number of workers that can be started by a single <code>Gather</code> or <code>Gather Merge</code> node.</td>
  </tr>
  <tr>
    <td><code>pg.max_predicate_locks_per_transaction</code></td>
    <td>integer</td>
    <td>The maximum predicate locks per transaction.</td>
  </tr>
  <tr>
    <td><code>pg.max_prepared_transactions</code></td>
    <td>integer</td>
    <td>The maximum prepared transactions.</td>
  </tr>
  <tr>
    <td><code>pg.max_replication_slots</code></td>
    <td>integer</td>
    <td>The maximum replication slots.</td>
  </tr>
  <tr>
    <td><code>pg.max_stack_depth</code></td>
    <td>integer</td>
    <td>The maximum depth of the stack in bytes.</td>
  </tr>
  <tr>
    <td><code>pg.max_standby_archive_delay</code></td>
    <td>integer</td>
    <td>The maximum standby archive delay in milliseconds.</td>
  </tr>
  <tr>
    <td><code>pg.max_standby_streaming_delay</code></td>
    <td>integer</td>
    <td>The maximum standby streaming delay in milliseconds.</td>
  </tr>
  <tr>
    <td><code>pg.max_wal_senders</code></td>
    <td>integer</td>
    <td>The maximum Write-ahead logging (WAL) senders.</td>
  </tr>
  <tr>
    <td><code>pg.max_worker_processes</code></td>
    <td>integer</td>
    <td>The maximum number of background processes that the system can support.</td>
  </tr>
  <tr>
    <td><code>pg.pg_partman_bgw.interval</code></td>
    <td>integer</td>
    <td>Time interval between the <code>pg_partman</code> scheduled tasks.</td>
  </tr>
  <tr>
    <td><code>pg.pg_partman_bgw.role</code></td>
    <td>string</td>
    <td>Controls which role to use for the <code>pg_partman</code> scheduled background tasks.</td>
  </tr>
  <tr>
    <td><code>pg_stat_statements.track</code></td>
    <td>string</td>
    <td>Controls which statements are counted. Specify <code>top</code> to track top-level statements (those issued directly by clients), <code>all</code> to track nested statements (such as statements invoked within functions), or <code>none</code> to disable statement statistics collection. The default value is: <code>top</code> A valid range is: <code>top</code>, <code>all</code>, <code>none</code></td>
  </tr>
  <tr>
    <td><code>pg.temp_file_limit</code></td>
    <td>integer</td>
    <td>Temporary file limit in KiB. Set -1 for unlimited.</td>
  </tr>
  <tr>
    <td><code>pg.timezone</code></td>
    <td>string</td>
    <td>The service timezone.</td>
  </tr>
  <tr>
    <td><code>pg.track_activity_query_size</code></td>
    <td>integer</td>
    <td>The number of bytes reserved to track the command being executed for each active session.</td>
  </tr>
  <tr>
    <td><code>pg.track_commit_timestamp</code></td>
    <td>string</td>
    <td>The recording of transactions commit time.</td>
  </tr>
  <tr>
    <td><code>pg.track_functions</code></td>
    <td>string</td>
    <td>The tracking of function call counts and time used.</td>
  </tr>
  <tr>
    <td><code>pg.track_io_timing</code></td>
    <td>string</td>
    <td>The timing of the database input/output calls. The parameter is off by default, as it repeatedly queries the operating system for the current time, which can cause significant overhead on some platforms. The default value is: <code>off</code></td>
  </tr>
  <tr>
    <td><code>pg.wal_sender_timeout</code></td>
    <td>integer</td>
    <td>Terminates the replication connections that are inactive for longer than the specified amount of time, in milliseconds. Setting this value to zero disables the timeout.</td>
  </tr>
  <tr>
    <td><code>pg.wal_writer_delay</code></td>
    <td>integer</td>
    <td>Write-ahead logging (WAL) flush interval in milliseconds. Setting this value to anything lower than the default <code>200ms</code> can negatively impact performance. The default value is: <code>200ms</code></td>
  </tr>
  <tr>
    <td><code>pg_read_replica</code></td>
    <td>boolean</td>
    <td>Defines the forked service as a read-only replica. **The setting is deprecated**. Use <code>read-replica</code> service integration instead.</td>
  </tr>
  <tr>
    <td><code>pg_service_to_fork_from</code></td>
    <td>string</td>
    <td>The name of the PostgreSQL service from which to fork. **The setting is deprecated**. Use <code>pg_service_to_fork_from</code> instead.</td>
  </tr>
  <tr>
    <td><code>project_to_fork_from</code></td>
    <td>string</td>
    <td>The name of a project to fork a service from. It can only be used when a new service is being created.</td>
  </tr>
  <tr>
    <td><code>pg_version</code></td>
    <td>string</td>
    <td>The major version of PostgreSQL.</td>
  </tr>
  <tr>
    <td><code>private_access.pg</code></td>
    <td>boolean</td>
    <td>Allows clients to connect to PostgreSQL with a domain name system (DNS) name that always resolves to the service private IP addresses. It is only available in certain network locations.</td>
  </tr>
  <tr>
    <td><code>private_access.prometheus</code></td>
    <td>boolean</td>
    <td>Allows clients to connect to Prometheus with a domain name system (DNS) name that always resolves to the service private IP addresses. It is only available in certain network locations.</td>
  </tr>
  <tr>
    <td><code>privatelink_access.pg</code></td>
    <td>boolean</td>
    <td>Enables PostgreSQL over private link.</td>
  </tr>
  <tr>
    <td><code>public_access.pg</code></td>
    <td>boolean</td>
    <td>Allows clients to connect to PostgreSQL from the public internet for service nodes that are in a project VPC or another type of private network.</td>
  </tr>
  <tr>
    <td><code>public_access.prometheus</code></td>
    <td>boolean</td>
    <td>Allow clients to connect to Prometheus from the public internet for service nodes that are in a Virtual Private Cloud (VPC) project or another type of private network.</td>
  </tr>
  <tr>
    <td><code>recovery_target_time</code></td>
    <td>string</td>
    <td>The recovery target time when forking a service. It can only be used when a new service is being created.</td>
  </tr>
  <tr>
    <td><code>service_to_fork_from</code></td>
    <td>string</td>
    <td>The name of a service to fork from. This can only be used when a new service is being created.</td>
  </tr>
  <tr>
    <td><code>shared_buffers_percentage</code></td>
    <td>number</td>
    <td>The percentage of total RAM that the database server uses for shared memory buffers. A valid range is 20-60 (float), which corresponds to 20% - 60%. This setting adjusts the shared_buffers configuration value. A valid range is: 20-60 (float)</td>
  </tr>
  <tr>
    <td><code>static_ips</code></td>
    <td>boolean</td>
    <td>The static IP addresses: Use static public IP addresses.</td>
  </tr>
  <tr>
    <td><code>synchronous_replication</code></td>
    <td>string</td>
    <td>Enables synchronous replication type. Only available on premium service plans.</td>
  </tr>
  <tr>
    <td><code>timescaledb.max_background_workers</code></td>
    <td>integer</td>
    <td>The number of background workers for <code>timescaledb</code> operations. You should configure this setting to the sum of your number of databases, and the total number of the concurrent background workers you want running at any given point in time.</td>
  </tr>
  <tr>
    <td><code>variant</code></td>
    <td>string</td>
    <td>The variant of the PostgreSQL service which can affect the features that are delivered by default.</td>
  </tr>
  <tr>
    <td><code>work_mem</code></td>
    <td>integer</td>
    <td>Sets the maximum amount of memory to be used by a query operation (such as a sort or hash table) before writing to temporary disk files, in MB. The default is 1MB + 0.075% of total RAM (up to 32MB). Default is 1MB + 0.075% of total RAM (up to 32MB).</td>
  </tr>
</table>

## Migration parameters {#pg_migration}

| Parameter                   | Value Type | Description                                                                                                             |
| --------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--remove-option migration` |            | Removes the migration option.                                                                                           |
| `migration.dbname`          | string     | The database name for bootstrapping the initial connection.                                                             |
| `migration.host`            | string     | The hostname or IP address of the server to migrate data from.                                                          |
| `migration.ignore_dbs`      | string     | The comma-separated list of databases which should be ignored during migration (only supported by MySQL at the moment). |
| `migration.password`        | string     | The password for server authentication to migrate data from.                                                            |
| `migration.port`            | integer    | The port number of the server to migrate data from.                                                                     |
| `migration.ssl`             | boolean    | `True` if the server to migrate data from is secured with SSL.                                                          |
| `migration.username`        | string     | The user name for server authentication to migrate data from.                                                           |

## `autovacuum` parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Value Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>pg.autovacuum_analyze_scale_factor</code></td>
    <td>number</td>
    <td>The fraction of the table size to add to <code>auto_vacuum_analyze_threshold</code> when deciding whether to trigger an <code>ANALYZE</code>. The default value is: 0.1 (10% of table size) A valid range is: 0-1</td>
  </tr>
  <tr>
    <td><code>pg.auto_vacuum_analyze_threshold</code></td>
    <td>integer</td>
    <td>The minimum number of inserted, updated, or deleted tuples needed to trigger an <code>ANALYZE</code> in any table. The default value is: 50</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_freeze_max_age</code></td>
    <td>integer</td>
    <td>The maximum age (in transactions) that a table <code>pg_class.relfrozenxid</code> field can attain before a <code>VACUUM</code> operation is forced to prevent transaction ID wraparound within the table. Note that the system launches <code>autovacuum</code> processes to prevent wraparound even when <code>autovacuum</code> is disabled. This parameter causes the server to be restarted.</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_max_workers</code></td>
    <td>integer</td>
    <td>The maximum number of <code>autovacuum</code> processes (different than the <code>autovacuum</code> launcher) that can be running at a time. This parameter can only be set at the server start. The default value is: 3</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_naptime</code></td>
    <td>integer</td>
    <td>The minimum delay between <code>autovacuum</code> runs on any database. The delay is measured in seconds. The default value is: 60</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_vacuum_cost_delay</code></td>
    <td>integer</td>
    <td>The cost delay value that is used in automatic <code>VACUUM</code> operations. If -1 is specified, the regular <code>vacuum_cost_delay</code> value will be used. The default value is: 20</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_vacuum_cost_limit</code></td>
    <td>integer</td>
    <td>The cost limit value that is used in automatic <code>VACUUM</code> operations. If -1 is specified, the regular <code>vacuum_cost_limit</code> value will be used. The default value is: -1</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_vacuum_scale_factor</code></td>
    <td>number</td>
    <td>The fraction of the table size to add to <code>autovacuum_vacuum_threshold</code> when deciding whether to trigger a <code>VACUUM</code>. The default value is: 0.2 (20% of table size) A valid range is: 0-1</td>
  </tr>
  <tr>
    <td><code>pg.autovacuum_vacuum_threshold</code></td>
    <td>integer</td>
    <td>The minimum number of updated or deleted tuples needed to trigger a <code>VACUUM</code> in a table. The default value is: 50</td>
  </tr>
  <tr>
    <td><code>pg.log_autovacuum_min_duration</code></td>
    <td>integer</td>
    <td>Causes each action executed by <code>autovacuum</code> to be logged, as long as it runs for at least the specified number of milliseconds. Setting this to zero logs all <code>autovacuum</code> actions. -1 (the default) disables logging the <code>autovacuum</code> actions. The default value is: -1</td>
  </tr>
</table>


## `bgwriter` parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Value Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>pg.bgwriter_delay</code></td>
    <td>integer</td>
    <td>Specifies the delay between activity rounds for the background writer in milliseconds. The default value is: 200</td>
  </tr>
  <tr>
    <td><code>pg.bgwriter_flush_after</code></td>
    <td>integer</td>
    <td>If more than the specified <code>bgwriter_flush_after</code> bytes have been written by the background writer, it attempts to force the OS to issue the writes to the underlying storage. It is specified in kilobytes. Setting it to 0 disables the forced write-back. The default value is: 512 (kilobytes)</td>
  </tr>
  <tr>
    <td><code>pg.bgwriter_lru_maxpages</code></td>
    <td>integer</td>
    <td>The maximum number of buffers to be written by the background writer on each round. Setting this to zero disables background writing. The default value is: 100</td>
  </tr>
  <tr>
    <td><code>pg.bgwriter_lru_multiplier</code></td>
    <td>number</td>
    <td>The <code>bgwriter_lru_multiplier</code> is a number used to multiply the recent average buffer needs in order to arrive at an estimate of the number that will be needed during the next round (up to <code>bgwriter_lru_maxpages</code>). 1.0 represents a "just in time" policy of writing exactly the number of buffers predicted to be needed. Any bigger values provide a buffer for spikes in demand, while smaller values intentionally leave writes to be done by server processes. The default value is: 2.0</td>
  </tr>
</table>

## `pgbouncer` parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Value Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>pgbouncer.autodb_idle_timeout</code></td>
    <td>integer</td>
    <td>The number of seconds after which - if unused - the automatically created database pools are freed. If set to 0, then timeout is disabled.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.autodb_max_db_connections</code></td>
    <td>integer</td>
    <td>The overall maximum number of server connections per database (regardless of user). Setting it to 0 means it is unlimited.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.autodb_pool_mode</code></td>
    <td>string</td>
    <td>The <code>PgBouncer</code> pool mode: with <code>session</code>, the server is released back to the pool after the client disconnects; with <code>transaction</code>, the server is released back to the pool after the transaction finishes; with <code>statement</code> the server is released back to the pool after the query finishes (transactions spanning multiple statements are disallowed in this mode). The default value is: <code>session</code>. A valid range is: <code>session</code>, <code>transaction</code>, <code>statement</code></td>
  </tr>
  <tr>
    <td><code>pgbouncer.autodb_pool_size</code></td>
    <td>integer</td>
    <td>When set to non-zero, it automatically creates a pool of the specified size per user, provided that the pool doesn't exist.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.ignore_startup_parameters</code></td>
    <td>array</td>
    <td>The list of parameters to ignore when given in the startup packet.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.min_pool_size</code></td>
    <td>integer</td>
    <td>Adds more server connections to the pool if the pool connection number is smaller than this number. It improves the behavior when the usual load comes back suddenly after a period of total inactivity. The value is capped at the pool size.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.server_idle_timeout</code></td>
    <td>integer</td>
    <td>The amount of time in seconds after which the server connection is dropped. If set to 0, then timeout is disabled.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.server_lifetime</code></td>
    <td>integer</td>
    <td>The amount of time after which the pooler closes any unused server connection.</td>
  </tr>
  <tr>
    <td><code>pgbouncer.server_reset_query_always</code></td>
    <td>boolean</td>
    <td>Runs <code>server_reset_query</code> (<code>DISCARD ALL</code>) in all pooling modes.</td>
  </tr>
  <tr>
    <td><code>pglookout.max_failover_replication_time_lag</code></td>
    <td>integer</td>
    <td>The number of seconds of master unavailability before database failover is triggered to standby. The default value is: 60</td>
  </tr>
  <tr>
    <td><code>private_access.pgbouncer</code></td>
    <td>boolean</td>
    <td>Allows the clients to connect to <code>pgbouncer</code> with a domain name system (DNS) name that always resolves to the service private IP addresses. It is only available in certain network locations.</td>
  </tr>
  <tr>
    <td><code>privatelink_access.pgbouncer</code></td>
    <td>boolean</td>
    <td>Enables the <code>PGBouncer</code> over a private link.</td>
  </tr>
  <tr>
    <td><code>public_access.pgbouncer</code></td>
    <td>boolean</td>
    <td>Allows the clients to connect to <code>PgBouncer</code> from the public internet for service nodes that are in a virtual private cloud (VPC) or another type of private network.</td>
  </tr>
</table>
