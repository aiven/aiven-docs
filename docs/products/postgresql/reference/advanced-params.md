---
title: Advanced parameters for Aiven for PostgreSQL®
---

On creating a PostgreSQL® database, you can customize it using a series
of the following advanced parameters:

## General parameters

+---------------------------+------------+---------------------------+
| Parameter                 | Value Type | Description               |
+===========================+============+===========================+
| `admin_password`          | string     | Custom password for the   |
|                           |            | admin user. It defaults   |
|                           |            | to a random string, and   |
|                           |            | should be set when a new  |
|                           |            | service is being created. |
+---------------------------+------------+---------------------------+
| `admin_username`          | string     | Custom username for admin |
|                           |            | user. It should be set    |
|                           |            | when a new service is     |
|                           |            | being created.            |
|                           |            |                           |
|                           |            | The default value is:     |
|                           |            | `avnadmin`                |
+---------------------------+------------+---------------------------+
| `backup_hour`             | integer    | The hour of the day (in   |
|                           |            | UTC) when backup for the  |
|                           |            | service is started. New   |
|                           |            | backup is started only if |
|                           |            | the previous backup has   |
|                           |            | been completed.           |
|                           |            |                           |
|                           |            | A valid range is: 0-24    |
+---------------------------+------------+---------------------------+
| `backup_minute`           | integer    | The minute of the hour    |
|                           |            | when backup for the       |
|                           |            | service is started. New   |
|                           |            | backup is started only if |
|                           |            | the previous backup has   |
|                           |            | been completed.           |
|                           |            |                           |
|                           |            | A valid range is: 0-60    |
+---------------------------+------------+---------------------------+
| `ip_filter`               | array      | Restricts the incoming    |
|                           |            | connections from the      |
|                           |            | Classless Inter-Domain    |
|                           |            | Routing (CIDR) address    |
|                           |            | block, e.g.               |
|                           |            | `10.20.0.0/16`.           |
|                           |            |                           |
|                           |            | The default value is:     |
|                           |            | `0.0.0.0/0`               |
+---------------------------+------------+---------------------------+
| `pg.deadlock_timeout`     | integer    | Amount of waiting time on |
|                           |            | a lock, in milliseconds,  |
|                           |            | before the check to see   |
|                           |            | if there is a deadlock    |
|                           |            | condition.                |
+---------------------------+------------+---------------------------+
| `pg.d                     | string     | Specifies the default     |
| efault_toast_compression` |            | TOAST compression method  |
|                           |            | for values of             |
|                           |            | compressible columns.     |
|                           |            | Available since           |
|                           |            | PostgreSQL version 14.    |
|                           |            |                           |
|                           |            | The default value is      |
|                           |            | `lz4`. Valid values: are  |
|                           |            | `lz4`, `pglz`.            |
+---------------------------+------------+---------------------------+
| `pg.idle_in_tra           | integer    | Times out all sessions    |
| nsaction_session_timeout` |            | with open transactions    |
|                           |            | after this time in        |
|                           |            | milliseconds.             |
+---------------------------+------------+---------------------------+
| `pg.jit`                  | boolean    | Controls the system-wide  |
|                           |            | use of Just-in-Time       |
|                           |            | Compilation (JIT).        |
+---------------------------+------------+---------------------------+
| `pg.log_error_verbosity`  | string     | Controls the amount of    |
|                           |            | detail written in the     |
|                           |            | server log for each       |
|                           |            | message that is logged.   |
|                           |            |                           |
|                           |            | A valid range is: terse,  |
|                           |            | default, verbose          |
+---------------------------+------------+---------------------------+
| `pg.log_line_prefix`      | string     | Lets you choose from one  |
|                           |            | of the available          |
|                           |            | log-formats. This         |
|                           |            | supports log analysers,   |
|                           |            | such as: `pgbadger`,      |
|                           |            | `pganalyze`, etc.         |
+---------------------------+------------+---------------------------+
| `pg.lo                    | integer    | Logs statements that take |
| g_min_duration_statement` |            | more than the specified   |
|                           |            | number of milliseconds to |
|                           |            | run. The -1 disables it.  |
+---------------------------+------------+---------------------------+
| `                         | integer    | The maximum number of     |
| pg.max_files_per_process` |            | PostgreSQL files that can |
|                           |            | be open per process.      |
+---------------------------+------------+---------------------------+
| `pg.m                     | integer    | The maximum PostgreSQL    |
| ax_locks_per_transaction` |            | locks per transaction.    |
+---------------------------+------------+---------------------------+
| `pg.max_log               | integer    | The maximum PostgreSQL    |
| ical_replication_workers` |            | logical replication       |
|                           |            | workers (as defined by    |
|                           |            | the pool of               |
|                           |            | `max_parallel_workers`).  |
+---------------------------+------------+---------------------------+
| `pg.max_parallel_workers` | integer    | The maximum number of     |
|                           |            | workers that the system   |
|                           |            | can support for parallel  |
|                           |            | queries.                  |
+---------------------------+------------+---------------------------+
| `pg.max_par               | integer    | The maximum number of     |
| allel_workers_per_gather` |            | workers that can be       |
|                           |            | started by a single       |
|                           |            | `Gather` or               |
|                           |            | `Gather Merge` node.      |
+---------------------------+------------+---------------------------+
| `pg.max_pr                | integer    | The maximum predicate     |
| ed_locks_per_transaction` |            | locks per transaction.    |
+---------------------------+------------+---------------------------+
| `pg.m                     | integer    | The maximum prepared      |
| ax_prepared_transactions` |            | transactions.             |
+---------------------------+------------+---------------------------+
| `                         | integer    | The maximum replication   |
| pg.max_replication_slots` |            | slots.                    |
+---------------------------+------------+---------------------------+
| `pg.max_stack_depth`      | integer    | The maximum depth of the  |
|                           |            | stack in bytes.           |
+---------------------------+------------+---------------------------+
| `pg.m                     | integer    | The maximum standby       |
| ax_standby_archive_delay` |            | archive delay in          |
|                           |            | milliseconds.             |
+---------------------------+------------+---------------------------+
| `pg.max                   | integer    | The maximum standby       |
| _standby_streaming_delay` |            | streaming delay in        |
|                           |            | milliseconds.             |
+---------------------------+------------+---------------------------+
| `pg.max_wal_senders`      | integer    | The maximum Write-ahead   |
|                           |            | logging (WAL) senders.    |
+---------------------------+------------+---------------------------+
| `pg.max_worker_processes` | integer    | The maximum number of     |
|                           |            | background processes that |
|                           |            | the system can support.   |
+---------------------------+------------+---------------------------+
| `pg                       | integer    | Time interval between the |
| .pg_partman_bgw.interval` |            | `pg_partman` scheduled    |
|                           |            | tasks.                    |
+---------------------------+------------+---------------------------+
| `pg.pg_partman_bgw.role`  | string     | Controls which role to    |
|                           |            | use for the `pg_partman`  |
|                           |            | scheduled background      |
|                           |            | tasks.                    |
+---------------------------+------------+---------------------------+
| `pg.                      | string     | Controls which statements |
| pg_stat_statements.track` |            | are counted. Specify      |
|                           |            | `top` to track top-level  |
|                           |            | statements (those issued  |
|                           |            | directly by clients),     |
|                           |            | `all` to track nested     |
|                           |            | statements (such as       |
|                           |            | statements invoked within |
|                           |            | functions), or `none` to  |
|                           |            | disable statement         |
|                           |            | statistics collection.    |
|                           |            |                           |
|                           |            | The default value is:     |
|                           |            | `top`\`       |
|                           |            |                           |
|                           |            | A valid range is: `top`,  |
|                           |            | `all`, `none`             |
+---------------------------+------------+---------------------------+
| `pg.temp_file_limit`      | integer    | Temporary file limit in   |
|                           |            | KiB. Set -1 for           |
|                           |            | unlimited.                |
+---------------------------+------------+---------------------------+
| `pg.timezone`             | string     | The service timezone.     |
+---------------------------+------------+---------------------------+
| `pg.t                     | integer    | The number of bytes       |
| rack_activity_query_size` |            | reserved to track the     |
|                           |            | command being executed    |
|                           |            | for each active session.  |
+---------------------------+------------+---------------------------+
| `p                        | string     | The recording of          |
| g.track_commit_timestamp` |            | transactions commit time. |
+---------------------------+------------+---------------------------+
| `pg.track_functions`      | string     | The tracking of function  |
|                           |            | call counts and time      |
|                           |            | used.                     |
+---------------------------+------------+---------------------------+
| `pg.track_io_timing`      | string     | The timing of the         |
|                           |            | database input/output     |
|                           |            | calls. The parameter is   |
|                           |            | off by default, as it     |
|                           |            | repeatedly queries the    |
|                           |            | operating system for the  |
|                           |            | current time, which can   |
|                           |            | cause significant         |
|                           |            | overhead on some          |
|                           |            | platforms.                |
|                           |            |                           |
|                           |            | The default value is:     |
|                           |            | `off`                     |
+---------------------------+------------+---------------------------+
| `pg.wal_sender_timeout`   | integer    | Terminates the            |
|                           |            | replication connections   |
|                           |            | that are inactive for     |
|                           |            | longer than the specified |
|                           |            | amount of time, in        |
|                           |            | milliseconds. Setting     |
|                           |            | this value to zero        |
|                           |            | disables the timeout.     |
+---------------------------+------------+---------------------------+
| `pg.wal_writer_delay`     | integer    | Write-ahead logging       |
|                           |            | (`WAL`) flush interval in |
|                           |            | milliseconds. Setting     |
|                           |            | this value to anything    |
|                           |            | lower than the default    |
|                           |            | `200ms` can negatively    |
|                           |            | impact performance.       |
|                           |            |                           |
|                           |            | The default value is:     |
|                           |            | `200ms`                   |
+---------------------------+------------+---------------------------+
| `pg_read_replica`         | boolean    | Defines the forked        |
| (deprecated)              |            | service as a read-only    |
|                           |            | replica. **The setting is |
|                           |            | deprecated**. Use         |
|                           |            | `read-replica` service    |
|                           |            | integration instead.      |
+---------------------------+------------+---------------------------+
| `pg_service_to_fork_from` | string     | The name of the           |
| (deprecated)              |            | PostgreSQL service from   |
|                           |            | which to fork. **The      |
|                           |            | setting is deprecated**.  |
|                           |            | Use                       |
|                           |            | `service_to_fork_from`    |
|                           |            | instead.                  |
+---------------------------+------------+---------------------------+
| `project_to_fork_from`    | string     | The name of a project to  |
|                           |            | fork a service from. It   |
|                           |            | can only be used when a   |
|                           |            | new service is being      |
|                           |            | created.                  |
+---------------------------+------------+---------------------------+
| `pg_version`              | string     | The major version of      |
|                           |            | PostgreSQL.               |
+---------------------------+------------+---------------------------+
| `private_access.pg`       | boolean    | Allows clients to connect |
|                           |            | to PostgreSQL with a      |
|                           |            | domain name system (DNS)  |
|                           |            | name that always resolves |
|                           |            | to the service private IP |
|                           |            | addresses. It is only     |
|                           |            | available in certain      |
|                           |            | network locations.        |
+---------------------------+------------+---------------------------+
| `p                        | boolean    | Allows clients to connect |
| rivate_access.prometheus` |            | to Prometheus with a      |
|                           |            | domain name system (DNS)  |
|                           |            | name that always resolves |
|                           |            | to the service private IP |
|                           |            | addresses. It is only     |
|                           |            | available in certain      |
|                           |            | network locations.        |
+---------------------------+------------+---------------------------+
| `privatelink_access.pg`   | boolean    | Enables PostgreSQL over   |
|                           |            | private link.             |
+---------------------------+------------+---------------------------+
| `public_access.pg`        | boolean    | Allows clients to connect |
|                           |            | to PostgreSQL from the    |
|                           |            | public internet for       |
|                           |            | service nodes that are in |
|                           |            | a project VPC or another  |
|                           |            | type of private network.  |
+---------------------------+------------+---------------------------+
| `                         | boolean    | Allow clients to connect  |
| public_access.prometheus` |            | to Prometheus from the    |
|                           |            | public internet for       |
|                           |            | service nodes that are in |
|                           |            | a Virtual Private Cloud   |
|                           |            | (VPC) project or another  |
|                           |            | type of private network.  |
+---------------------------+------------+---------------------------+
| `recovery_target_time`    | string     | The recovery target time  |
|                           |            | when forking a service.   |
|                           |            | It can only be used when  |
|                           |            | a new service is being    |
|                           |            | created.                  |
+---------------------------+------------+---------------------------+
| `service_to_fork_from`    | string     | The name of a service to  |
|                           |            | fork from. This can only  |
|                           |            | be used when a new        |
|                           |            | service is being created. |
+---------------------------+------------+---------------------------+
| `s                        | number     | The percentage of total   |
| hared_buffers_percentage` |            | RAM that the database     |
|                           |            | server uses for shared    |
|                           |            | memory buffers. A valid   |
|                           |            | range is 20-60 (float),   |
|                           |            | which corresponds to      |
|                           |            | 20% - 60%. This setting   |
|                           |            | adjusts the               |
|                           |            | shared_buffers            |
|                           |            | configuration value.      |
|                           |            |                           |
|                           |            | A valid range is: 20-60   |
|                           |            | (float)                   |
+---------------------------+------------+---------------------------+
| `static_ips`              | boolean    | The static IP addresses:  |
|                           |            | Use static public IP      |
|                           |            | addresses.                |
+---------------------------+------------+---------------------------+
| `synchronous_replication` | string     | Enables synchronous       |
|                           |            | replication type. Only    |
|                           |            | available on premium      |
|                           |            | service plans.            |
+---------------------------+------------+---------------------------+
| `timescaled               | integer    | The number of background  |
| b.max_background_workers` |            | workers for `timescaledb` |
|                           |            | operations. You should    |
|                           |            | configure this setting to |
|                           |            | the sum of your number of |
|                           |            | databases, and the total  |
|                           |            | number of the concurrent  |
|                           |            | background workers you    |
|                           |            | want running at any given |
|                           |            | point in time.            |
+---------------------------+------------+---------------------------+
| `variant`                 | string     | The variant of the        |
|                           |            | PostgreSQL service which  |
|                           |            | can affect the features   |
|                           |            | that are delivered by     |
|                           |            | default.                  |
+---------------------------+------------+---------------------------+
| `work_mem`                | integer    | Sets the maximum amount   |
|                           |            | of memory to be used by a |
|                           |            | query operation (such as  |
|                           |            | a sort or hash table)     |
|                           |            | before writing to         |
|                           |            | temporary disk files, in  |
|                           |            | MB. The default is 1MB +  |
|                           |            | 0.075% of total RAM (up   |
|                           |            | to 32MB).                 |
|                           |            |                           |
|                           |            | Default is 1MB + 0.075%   |
|                           |            | of total RAM (up to       |
|                           |            | 32MB).                    |
+---------------------------+------------+---------------------------+

## Migration parameters {#pg_migration}

  Parameter                     Value Type   Description
  ----------------------------- ------------ -------------------------------------------------------------------------------------------------------------------------
  `--remove-option migration`                Removes the migration option.
  `migration.dbname`            string       The database name for bootstrapping the initial connection.
  `migration.host`              string       The hostname or IP address of the server to migrate data from.
  `migration.ignore_dbs`        string       The comma-separated list of databases which should be ignored during migration (only supported by MySQL at the moment).
  `migration.password`          string       The password for server authentication to migrate data from.
  `migration.port`              integer      The port number of the server to migrate data from.
  `migration.ssl`               boolean      `True` if the server to migrate data from is secured with SSL.
  `migration.username`          string       The user name for server authentication to migrate data from.

## `autovacuum` parameters

+---------------------------+------------+---------------------------+
| Parameter                 | Value Type | Description               |
+===========================+============+===========================+
| `pg.autovac               | number     | The fraction of the table |
| uum_analyze_scale_factor` |            | size to add to            |
|                           |            | `auto                     |
|                           |            | vacuum_analyze_threshold` |
|                           |            | when deciding whether to  |
|                           |            | trigger an `ANALYZE`.     |
|                           |            |                           |
|                           |            | The default value is: 0.1 |
|                           |            | (10% of table size)       |
|                           |            |                           |
|                           |            | A valid range is: 0-1     |
+---------------------------+------------+---------------------------+
| `pg.auto                  | integer    | The minimum number of     |
| vacuum_analyze_threshold` |            | inserted, updated or      |
|                           |            | deleted tuples needed to  |
|                           |            | trigger an `ANALYZE` in   |
|                           |            | any table.                |
|                           |            |                           |
|                           |            | The default value is: 50  |
+---------------------------+------------+---------------------------+
| `pg.a                     | integer    | The maximum age (in       |
| utovacuum_freeze_max_age` |            | transactions) that a      |
|                           |            | table                     |
|                           |            | `pg_class.relfrozenxid`   |
|                           |            | field can attain before a |
|                           |            | `VACUUM` operation is     |
|                           |            | forced to prevent         |
|                           |            | transaction ID wraparound |
|                           |            | within the table. Note    |
|                           |            | that the system launches  |
|                           |            | `autovacuum` processes to |
|                           |            | prevent wraparound even   |
|                           |            | when `autovacuum` is      |
|                           |            | disabled. This parameter  |
|                           |            | causes the server to be   |
|                           |            | restarted.                |
+---------------------------+------------+---------------------------+
| `p                        | integer    | The maximum number of     |
| g.autovacuum_max_workers` |            | `autovacuum` processes    |
|                           |            | (different than the       |
|                           |            | `autovacuum` launcher)    |
|                           |            | that can be running at a  |
|                           |            | time. This parameter can  |
|                           |            | only be set at the server |
|                           |            | start.                    |
|                           |            |                           |
|                           |            | The default value is: 3   |
+---------------------------+------------+---------------------------+
| `pg.autovacuum_naptime`   | integer    | The minimum delay between |
|                           |            | `autovacuum` runs on any  |
|                           |            | database. The delay is    |
|                           |            | measured in seconds.      |
|                           |            |                           |
|                           |            | The default value is: 60  |
+---------------------------+------------+---------------------------+
| `pg.auto                  | integer    | The cost delay value that |
| vacuum_vacuum_cost_delay` |            | is used in automatic      |
|                           |            | `VACUUM` operations. If   |
|                           |            | -1 is specified, the      |
|                           |            | regular                   |
|                           |            | `vacuum_cost_delay` value |
|                           |            | will be used.             |
|                           |            |                           |
|                           |            | The default value is: 20  |
+---------------------------+------------+---------------------------+
| `pg.auto                  | integer    | The cost limit value that |
| vacuum_vacuum_cost_limit` |            | is used in automatic      |
|                           |            | `VACUUM` operations. If   |
|                           |            | -1 is specified, the      |
|                           |            | regular                   |
|                           |            | `vacuum_cost_limit` value |
|                           |            | will be used.             |
|                           |            |                           |
|                           |            | The default value is: -1  |
+---------------------------+------------+---------------------------+
| `pg.autova                | number     | The fraction of the table |
| cuum_vacuum_scale_factor` |            | size to add to            |
|                           |            | `aut                      |
|                           |            | ovacuum_vacuum_threshold` |
|                           |            | when deciding whether to  |
|                           |            | trigger a `VACUUM`.       |
|                           |            |                           |
|                           |            | The default value is: 0.2 |
|                           |            | (20% of table size)       |
|                           |            |                           |
|                           |            | A valid range is: 0-1     |
+---------------------------+------------+---------------------------+
| `pg.aut                   | integer    | The minimum number of     |
| ovacuum_vacuum_threshold` |            | updated or deleted tuples |
|                           |            | needed to trigger a       |
|                           |            | `VACUUM` in a table.      |
|                           |            |                           |
|                           |            | The default value is: 50  |
+---------------------------+------------+---------------------------+
| `pg.log                   | integer    | Causes each action        |
| _autovacuum_min_duration` |            | executed by `autovacuum`  |
|                           |            | to be logged, as long as  |
|                           |            | it runs for at least the  |
|                           |            | specified number of       |
|                           |            | milliseconds. Setting     |
|                           |            | this to zero logs all     |
|                           |            | `autovacuum` actions. -1  |
|                           |            | (the default) disables    |
|                           |            | logging the `autovacuum`  |
|                           |            | actions.                  |
|                           |            |                           |
|                           |            | The default value is: -1  |
+---------------------------+------------+---------------------------+

## `bgwriter` parameters

+---------------------------+------------+---------------------------+
| Parameter                 | Value Type | Description               |
+===========================+============+===========================+
| `pg.bgwriter_delay`       | integer    | Specifies the delay       |
|                           |            | between activity rounds   |
|                           |            | for the background writer |
|                           |            | in milliseconds.          |
|                           |            |                           |
|                           |            | The default value is: 200 |
+---------------------------+------------+---------------------------+
| `pg.bgwriter_flush_after` | integer    | If more than the          |
|                           |            | specified                 |
|                           |            | `bgwriter_flush_after`    |
|                           |            | bytes have been written   |
|                           |            | by the background writer, |
|                           |            | it attempts to force the  |
|                           |            | OS to issue the writes to |
|                           |            | the underlying storage.   |
|                           |            | It is specified in        |
|                           |            | kilobytes. Setting it to  |
|                           |            | 0 disables the forced     |
|                           |            | write-back.               |
|                           |            |                           |
|                           |            | The default value is: 512 |
|                           |            | (kilobytes)               |
+---------------------------+------------+---------------------------+
| `                         | integer    | The maximum number of     |
| pg.bgwriter_lru_maxpages` |            | buffers to be written by  |
|                           |            | the background writer on  |
|                           |            | each round. Setting this  |
|                           |            | to zero disables          |
|                           |            | background writing.       |
|                           |            |                           |
|                           |            | The default value is: 100 |
+---------------------------+------------+---------------------------+
| `pg                       | number     | The                       |
| .bgwriter_lru_multiplier` |            | `bgwriter_lru_multiplier` |
|                           |            | is a number used to       |
|                           |            | multiply the recent       |
|                           |            | average buffer needs in   |
|                           |            | order to arrive at an     |
|                           |            | estimate of the number    |
|                           |            | that will be needed       |
|                           |            | during the next round,    |
|                           |            | (up to                    |
|                           |            | `bgwriter_lru_maxpages`). |
|                           |            | 1.0 represents a "just in |
|                           |            | time" policy of writing   |
|                           |            | exactly the number of     |
|                           |            | buffers predicted to be   |
|                           |            | needed. Any bigger values |
|                           |            | provide a buffer for      |
|                           |            | spikes in demand, while   |
|                           |            | smaller values            |
|                           |            | intentionally leave       |
|                           |            | writes to be done by      |
|                           |            | server processes.         |
|                           |            |                           |
|                           |            | The default value is: 2.0 |
+---------------------------+------------+---------------------------+

## `pgbouncer` parameters

+---------------------------+------------+---------------------------+
| Parameter                 | Value Type | Description               |
+===========================+============+===========================+
| `pgbou                    | integer    | The number of seconds     |
| ncer.autodb_idle_timeout` |            | after which - if unused - |
|                           |            | the automatically created |
|                           |            | database pools are freed. |
|                           |            | If set to 0, then timeout |
|                           |            | is disabled.              |
+---------------------------+------------+---------------------------+
| `pgbouncer.a              | integer    | The overall maximum       |
| utodb_max_db_connections` |            | number of server          |
|                           |            | connections per database  |
|                           |            | (regardless of user).     |
|                           |            | Setting it to 0 means it  |
|                           |            | is unlimited.             |
+---------------------------+------------+---------------------------+
| `pg                       | string     | The `PgBouncer` pool      |
| bouncer.autodb_pool_mode` |            | mode: with `session`, the |
|                           |            | server is released back   |
|                           |            | to the pool after the     |
|                           |            | client disconnects; with  |
|                           |            | `transaction`, the server |
|                           |            | is released back to the   |
|                           |            | pool after the            |
|                           |            | transaction finishes;     |
|                           |            | with `statement` the      |
|                           |            | server is released back   |
|                           |            | to the pool after the     |
|                           |            | query finishes            |
|                           |            | (transactions spanning    |
|                           |            | multiple statements are   |
|                           |            | disallowed in this mode). |
|                           |            |                           |
|                           |            | The default value is:     |
|                           |            | `session` A valid range   |
|                           |            | is: `session`,            |
|                           |            | `transaction`,            |
|                           |            | `statement`               |
+---------------------------+------------+---------------------------+
| `pg                       | integer    | When set to non-zero, it  |
| bouncer.autodb_pool_size` |            | automatically creates a   |
|                           |            | pool of the specified     |
|                           |            | size per user, provided   |
|                           |            | that the pool doesn\'t    |
|                           |            | exist.                    |
+---------------------------+------------+---------------------------+
| `pgbouncer.i              | array      | The list of parameters to |
| gnore_startup_parameters` |            | ignore when given in      |
|                           |            | startup packet.           |
+---------------------------+------------+---------------------------+
| `pgbouncer.min_pool_size` | integer    | Adds more server          |
|                           |            | connections to the pool   |
|                           |            | if the pool connection    |
|                           |            | number is smaller than    |
|                           |            | this number. It improves  |
|                           |            | the behavior when the     |
|                           |            | usual load comes back     |
|                           |            | suddenly after a period   |
|                           |            | of total inactivity. The  |
|                           |            | value is capped at the    |
|                           |            | pool size.                |
+---------------------------+------------+---------------------------+
| `pgbou                    | integer    | The amount of time in     |
| ncer.server_idle_timeout` |            | seconds after which the   |
|                           |            | server connection is      |
|                           |            | dropped. If set to 0,     |
|                           |            | then timeout is disabled. |
+---------------------------+------------+---------------------------+
| `p                        | integer    | The amount of time after  |
| gbouncer.server_lifetime` |            | which the pooler closes   |
|                           |            | any unused server         |
|                           |            | connection.               |
+---------------------------+------------+---------------------------+
| `pgbouncer.s              | boolean    | Runs `server_reset_query` |
| erver_reset_query_always` |            | (`DISCARD ALL`) in all    |
|                           |            | pooling modes.            |
+---------------------------+------------+---------------------------+
| `pglookout.max_failo      | integer    | The number of seconds of  |
| ver_replication_time_lag` |            | master unavailability     |
|                           |            | before database failover  |
|                           |            | is triggered to standby.  |
|                           |            |                           |
|                           |            | The default value is: 60  |
+---------------------------+------------+---------------------------+
| `                         | boolean    | Allows the clients to     |
| private_access.pgbouncer` |            | connect to `pgbouncer`    |
|                           |            | with a domain name system |
|                           |            | (DNS) name that always    |
|                           |            | resolves to the service   |
|                           |            | private IP addresses. It  |
|                           |            | is only available in      |
|                           |            | certain network           |
|                           |            | locations.                |
+---------------------------+------------+---------------------------+
| `priv                     | boolean    | Enables the `PGbouncer`   |
| atelink_access.pgbouncer` |            | over a private link.      |
+---------------------------+------------+---------------------------+
| `public_access.pgbouncer` | boolean    | Allows the clients to     |
|                           |            | connect to                |
|                           |            | `PgBouncer`\` |
|                           |            | from the public internet  |
|                           |            | for service nodes that    |
|                           |            | are in a virtual private  |
|                           |            | cloud (VPC) or another    |
|                           |            | type of private network.  |
+---------------------------+------------+---------------------------+
