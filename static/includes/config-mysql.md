
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
  <td>
    <p class="name">
      <b>additional_backup_regions</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">Additional Cloud Regions for Backup Replication</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>ip_filter</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">IP filter</p>
    <div class="description">Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_log</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Service logging</p>
    <div class="description">Store logs for the service so that they are available in the HTTP API and console.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>static_ips</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Static IP addresses</p>
    <div class="description">Use static public IP addresses</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>admin_username</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Custom username for admin user. This must be set only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>admin_password</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Custom password for admin user. Defaults to random string. This must be set only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>backup_hour</b>&nbsp;<code class="type">integer,null</code>
        <div class="constraints">
            max: <code>23</code>
        </div>
    </p>
    <p class="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>backup_minute</b>&nbsp;<code class="type">integer,null</code>
        <div class="constraints">
            max: <code>59</code>
        </div>
    </p>
    <p class="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>migration</b>&nbsp;<code class="type">object,null</code>
    </p>
    <p class="title">Migrate data from existing server</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>host</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Hostname or IP address of the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>port</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>65535</code>
            </div>
          </p>
          <p class="title">Port number of the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>password</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Password for authentication with the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ssl</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">The server where to migrate data from is secured with SSL</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>username</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">User name for authentication with the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>dbname</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Database name for bootstrapping the initial connection</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ignore_dbs</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ignore_roles</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Comma-separated list of database roles, which should be ignored during migration (supported by PostgreSQL only at the moment)</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>method</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>private_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from private networks</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>mysql</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>mysqlx</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to mysqlx with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>privatelink_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service components through Privatelink</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>mysql</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable mysql</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>mysqlx</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable mysqlx</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable prometheus</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>public_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from the public Internet</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>mysql</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to mysql from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>mysqlx</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to mysqlx from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>project_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>mysql_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">MySQL major version</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>recovery_target_time</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Recovery target time when forking a service. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>binlog_retention_period</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>600</code>
            max: <code>86400</code>
        </div>
    </p>
    <p class="title">The minimum amount of time in seconds to keep binlog entries before deletion. This may be extended for services that require binlog entries for longer than the default for example if using the MySQL Debezium Kafka connector.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>mysql</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">mysql.conf configuration values</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>sql_mode</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">sql_mode</p>
          <div class="description">Global SQL mode. Set to empty to use MySQL server defaults. When creating a new service and not setting this field Aiven default SQL mode (strict, SQL standard compliant) will be assigned.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>connect_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>2</code>
                max: <code>3600</code>
            </div>
          </p>
          <p class="title">connect_timeout</p>
          <div class="description">The number of seconds that the mysqld server waits for a connect packet before responding with Bad handshake</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>default_time_zone</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">default_time_zone</p>
          <div class="description">Default server time zone as an offset from UTC (from -12:00 to +12:00), a time zone name, or 'SYSTEM' to use the MySQL server default.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>group_concat_max_len</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>4</code>
                max: <code>18446744073709552000</code>
            </div>
          </p>
          <p class="title">group_concat_max_len</p>
          <div class="description">The maximum permitted result length in bytes for the GROUP_CONCAT() function.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>information_schema_stats_expiry</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>900</code>
                max: <code>31536000</code>
            </div>
          </p>
          <p class="title">information_schema_stats_expiry</p>
          <div class="description">The time, in seconds, before cached statistics expire</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_change_buffer_max_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>50</code>
            </div>
          </p>
          <p class="title">innodb_change_buffer_max_size</p>
          <div class="description">Maximum size for the InnoDB change buffer, as a percentage of the total size of the buffer pool. Default is 25</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_flush_neighbors</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>2</code>
            </div>
          </p>
          <p class="title">innodb_flush_neighbors</p>
          <div class="description">Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent (default is 1): 0 - dirty pages in the same extent are not flushed, 1 - flush contiguous dirty pages in the same extent, 2 - flush dirty pages in the same extent</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_ft_min_token_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>16</code>
            </div>
          </p>
          <p class="title">innodb_ft_min_token_size</p>
          <div class="description">Minimum length of words that are stored in an InnoDB FULLTEXT index. Changing this parameter will lead to a restart of the MySQL service.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_ft_server_stopword_table</b>&nbsp;<code class="type">null,string</code>
          </p>
          <p class="title">innodb_ft_server_stopword_table</p>
          <div class="description">This option is used to specify your own InnoDB FULLTEXT index stopword list for all InnoDB tables.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_lock_wait_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>3600</code>
            </div>
          </p>
          <p class="title">innodb_lock_wait_timeout</p>
          <div class="description">The length of time in seconds an InnoDB transaction waits for a row lock before giving up. Default is 120.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_log_buffer_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>4294967295</code>
            </div>
          </p>
          <p class="title">innodb_log_buffer_size</p>
          <div class="description">The size in bytes of the buffer that InnoDB uses to write to the log files on disk.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_online_alter_log_max_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>65536</code>
                max: <code>1099511627776</code>
            </div>
          </p>
          <p class="title">innodb_online_alter_log_max_size</p>
          <div class="description">The upper limit in bytes on the size of the temporary log files used during online DDL operations for InnoDB tables.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_print_all_deadlocks</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">innodb_print_all_deadlocks</p>
          <div class="description">When enabled, information about all deadlocks in InnoDB user transactions is recorded in the error log. Disabled by default.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_read_io_threads</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>64</code>
            </div>
          </p>
          <p class="title">innodb_read_io_threads</p>
          <div class="description">The number of I/O threads for read operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_rollback_on_timeout</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">innodb_rollback_on_timeout</p>
          <div class="description">When enabled a transaction timeout causes InnoDB to abort and roll back the entire transaction. Changing this parameter will lead to a restart of the MySQL service.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_thread_concurrency</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>1000</code>
            </div>
          </p>
          <p class="title">innodb_thread_concurrency</p>
          <div class="description">Defines the maximum number of threads permitted inside of InnoDB. Default is 0 (infinite concurrency - no limit)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>innodb_write_io_threads</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>64</code>
            </div>
          </p>
          <p class="title">innodb_write_io_threads</p>
          <div class="description">The number of I/O threads for write operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interactive_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>30</code>
                max: <code>604800</code>
            </div>
          </p>
          <p class="title">interactive_timeout</p>
          <div class="description">The number of seconds the server waits for activity on an interactive connection before closing it.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>internal_tmp_mem_storage_engine</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">internal_tmp_mem_storage_engine</p>
          <div class="description">The storage engine for in-memory internal temporary tables.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>net_buffer_length</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1024</code>
                max: <code>1048576</code>
            </div>
          </p>
          <p class="title">net_buffer_length</p>
          <div class="description">Start sizes of connection buffer and result buffer. Default is 16384 (16K). Changing this parameter will lead to a restart of the MySQL service.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>net_read_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>3600</code>
            </div>
          </p>
          <p class="title">net_read_timeout</p>
          <div class="description">The number of seconds to wait for more data from a connection before aborting the read.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>net_write_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>3600</code>
            </div>
          </p>
          <p class="title">net_write_timeout</p>
          <div class="description">The number of seconds to wait for a block to be written to a connection before aborting the write.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sql_require_primary_key</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">sql_require_primary_key</p>
          <div class="description">Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>wait_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483</code>
            </div>
          </p>
          <p class="title">wait_timeout</p>
          <div class="description">The number of seconds the server waits for activity on a noninteractive connection before closing it.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_allowed_packet</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>102400</code>
                max: <code>1073741824</code>
            </div>
          </p>
          <p class="title">max_allowed_packet</p>
          <div class="description">Size of the largest message in bytes that can be received by the server. Default is 67108864 (64M)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_heap_table_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>1073741824</code>
            </div>
          </p>
          <p class="title">max_heap_table_size</p>
          <div class="description">Limits the size of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sort_buffer_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>32768</code>
                max: <code>1073741824</code>
            </div>
          </p>
          <p class="title">sort_buffer_size</p>
          <div class="description">Sort buffer size in bytes for ORDER BY optimization. Default is 262144 (256K)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>tmp_table_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>1073741824</code>
            </div>
          </p>
          <p class="title">tmp_table_size</p>
          <div class="description">Limits the size of internal in-memory tables. Also set max_heap_table_size. Default is 16777216 (16M)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>slow_query_log</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">slow_query_log</p>
          <div class="description">Slow query log enables capturing of slow queries. Setting slow_query_log to false also truncates the mysql.slow_log table. Default is off</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>long_query_time</b>&nbsp;<code class="type">number</code>
            <div class="constraints">
                max: <code>3600</code>
            </div>
          </p>
          <p class="title">long_query_time</p>
          <div class="description">The slow_query_logs work as SQL statements that take more than long_query_time seconds to execute. Default is 10s</div>
        </td>
      </tr>
</table>
  </td>
</tr>
</table>
    