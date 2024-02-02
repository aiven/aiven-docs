## additional_backup_regions

**Title:** Additional Cloud Regions for Backup Replication


**Type:** `array`

## ip_filter

**Title:** IP filter

**Description:** Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'

**Type:** `array`

## service_log

**Title:** Service logging

**Description:** Store logs for the service so that they are available in the HTTP API and console.

**Type:** `boolean,null`

## static_ips

**Title:** Static IP addresses

**Description:** Use static public IP addresses

**Type:** `boolean`

## admin_username

**Title:** Custom username for admin user. This must be set only when a new service is being created.


**Type:** `string,null`

## admin_password

**Title:** Custom password for admin user. Defaults to random string. This must be set only when a new service is being created.


**Type:** `string,null`

## backup_hour

**Title:** The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.


**Type:** `integer,null`

## backup_minute

**Title:** The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.


**Type:** `integer,null`

## migration

**Title:** Migrate data from existing server


**Type:** `object,null`

### host

**Title:** Hostname or IP address of the server where to migrate data from


**Type:** `string`

### port

**Title:** Port number of the server where to migrate data from


**Type:** `integer`

### password

**Title:** Password for authentication with the server where to migrate data from


**Type:** `string`

### ssl

**Title:** The server where to migrate data from is secured with SSL


**Type:** `boolean`

### username

**Title:** User name for authentication with the server where to migrate data from


**Type:** `string`

### dbname

**Title:** Database name for bootstrapping the initial connection


**Type:** `string`

### ignore_dbs

**Title:** Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)


**Type:** `string`

### method

**Title:** The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)


**Type:** `string`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### mysql

**Title:** Allow clients to connect to mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### mysqlx

**Title:** Allow clients to connect to mysqlx with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### mysql

**Title:** Enable mysql


**Type:** `boolean`

### mysqlx

**Title:** Enable mysqlx


**Type:** `boolean`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### mysql

**Title:** Allow clients to connect to mysql from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### mysqlx

**Title:** Allow clients to connect to mysqlx from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

## mysql_version

**Title:** MySQL major version


**Type:** `string,null`

## recovery_target_time

**Title:** Recovery target time when forking a service. This has effect only when a new service is being created.


**Type:** `string,null`

## binlog_retention_period

**Title:** The minimum amount of time in seconds to keep binlog entries before deletion. This may be extended for services that require binlog entries for longer than the default for example if using the MySQL Debezium Kafka connector.


**Type:** `integer`

## mysql

**Title:** mysql.conf configuration values


**Type:** `object`

### sql_mode

**Title:** sql_mode

**Description:** Global SQL mode. Set to empty to use MySQL server defaults. When creating a new service and not setting this field Aiven default SQL mode (strict, SQL standard compliant) will be assigned.

**Type:** `string`

### connect_timeout

**Title:** connect_timeout

**Description:** The number of seconds that the mysqld server waits for a connect packet before responding with Bad handshake

**Type:** `integer`

### default_time_zone

**Title:** default_time_zone

**Description:** Default server time zone as an offset from UTC (from -12:00 to +12:00), a time zone name, or 'SYSTEM' to use the MySQL server default.

**Type:** `string`

### group_concat_max_len

**Title:** group_concat_max_len

**Description:** The maximum permitted result length in bytes for the GROUP_CONCAT() function.

**Type:** `integer`

### information_schema_stats_expiry

**Title:** information_schema_stats_expiry

**Description:** The time, in seconds, before cached statistics expire

**Type:** `integer`

### innodb_change_buffer_max_size

**Title:** innodb_change_buffer_max_size

**Description:** Maximum size for the InnoDB change buffer, as a percentage of the total size of the buffer pool. Default is 25

**Type:** `integer`

### innodb_flush_neighbors

**Title:** innodb_flush_neighbors

**Description:** Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent (default is 1): 0 - dirty pages in the same extent are not flushed,  1 - flush contiguous dirty pages in the same extent,  2 - flush dirty pages in the same extent

**Type:** `integer`

### innodb_ft_min_token_size

**Title:** innodb_ft_min_token_size

**Description:** Minimum length of words that are stored in an InnoDB FULLTEXT index. Changing this parameter will lead to a restart of the MySQL service.

**Type:** `integer`

### innodb_ft_server_stopword_table

**Title:** innodb_ft_server_stopword_table

**Description:** This option is used to specify your own InnoDB FULLTEXT index stopword list for all InnoDB tables.

**Type:** `null,string`

### innodb_lock_wait_timeout

**Title:** innodb_lock_wait_timeout

**Description:** The length of time in seconds an InnoDB transaction waits for a row lock before giving up. Default is 120.

**Type:** `integer`

### innodb_log_buffer_size

**Title:** innodb_log_buffer_size

**Description:** The size in bytes of the buffer that InnoDB uses to write to the log files on disk.

**Type:** `integer`

### innodb_online_alter_log_max_size

**Title:** innodb_online_alter_log_max_size

**Description:** The upper limit in bytes on the size of the temporary log files used during online DDL operations for InnoDB tables.

**Type:** `integer`

### innodb_print_all_deadlocks

**Title:** innodb_print_all_deadlocks

**Description:** When enabled, information about all deadlocks in InnoDB user transactions is recorded in the error log. Disabled by default.

**Type:** `boolean`

### innodb_read_io_threads

**Title:** innodb_read_io_threads

**Description:** The number of I/O threads for read operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.

**Type:** `integer`

### innodb_rollback_on_timeout

**Title:** innodb_rollback_on_timeout

**Description:** When enabled a transaction timeout causes InnoDB to abort and roll back the entire transaction. Changing this parameter will lead to a restart of the MySQL service.

**Type:** `boolean`

### innodb_thread_concurrency

**Title:** innodb_thread_concurrency

**Description:** Defines the maximum number of threads permitted inside of InnoDB. Default is 0 (infinite concurrency - no limit)

**Type:** `integer`

### innodb_write_io_threads

**Title:** innodb_write_io_threads

**Description:** The number of I/O threads for write operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.

**Type:** `integer`

### interactive_timeout

**Title:** interactive_timeout

**Description:** The number of seconds the server waits for activity on an interactive connection before closing it.

**Type:** `integer`

### internal_tmp_mem_storage_engine

**Title:** internal_tmp_mem_storage_engine

**Description:** The storage engine for in-memory internal temporary tables.

**Type:** `string`

### net_buffer_length

**Title:** net_buffer_length

**Description:** Start sizes of connection buffer and result buffer. Default is 16384 (16K). Changing this parameter will lead to a restart of the MySQL service.

**Type:** `integer`

### net_read_timeout

**Title:** net_read_timeout

**Description:** The number of seconds to wait for more data from a connection before aborting the read.

**Type:** `integer`

### net_write_timeout

**Title:** net_write_timeout

**Description:** The number of seconds to wait for a block to be written to a connection before aborting the write.

**Type:** `integer`

### sql_require_primary_key

**Title:** sql_require_primary_key

**Description:** Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.

**Type:** `boolean`

### wait_timeout

**Title:** wait_timeout

**Description:** The number of seconds the server waits for activity on a noninteractive connection before closing it.

**Type:** `integer`

### max_allowed_packet

**Title:** max_allowed_packet

**Description:** Size of the largest message in bytes that can be received by the server. Default is 67108864 (64M)

**Type:** `integer`

### max_heap_table_size

**Title:** max_heap_table_size

**Description:** Limits the size of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M)

**Type:** `integer`

### sort_buffer_size

**Title:** sort_buffer_size

**Description:** Sort buffer size in bytes for ORDER BY optimization. Default is 262144 (256K)

**Type:** `integer`

### tmp_table_size

**Title:** tmp_table_size

**Description:** Limits the size of internal in-memory tables. Also set max_heap_table_size. Default is 16777216 (16M)

**Type:** `integer`

### slow_query_log

**Title:** slow_query_log

**Description:** Slow query log enables capturing of slow queries. Setting slow_query_log to false also truncates the mysql.slow_log table. Default is off

**Type:** `boolean`

### long_query_time

**Title:** long_query_time

**Description:** The slow_query_logs work as SQL statements that take more than long_query_time seconds to execute. Default is 10s

**Type:** `number`

    