
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div class="param"><p class="name"><strong>additional_backup_regions</strong></p><p><code class="type">array</code></p></div>
        <p class="title">Additional Cloud Regions for Backup Replication</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>ip_filter</strong></p><p><code class="type">array</code></p></div><div class="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
        <p class="title">IP filter</p>
        <div class="description"><p>Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>service_log</strong></p><p><code class="type">boolean,null</code></p></div>
        <p class="title">Service logging</p>
        <div class="description"><p>Store logs for the service so that they are available in the HTTP API and console.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>static_ips</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Static IP addresses</p>
        <div class="description"><p>Use static public IP addresses</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>admin_username</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Custom username for admin user. This must be set only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>admin_password</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Custom password for admin user. Defaults to random string. This must be set only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>backup_hour</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>max: <code>23</code></li></ul></div>
        <p class="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>backup_minute</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>max: <code>59</code></li></ul></div>
        <p class="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>migration</strong></p><p><code class="type">object,null</code></p></div>
        <p class="title">Migrate data from existing server</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.host</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Hostname or IP address of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.port</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div>
              <p class="title">Port number of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.password</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Password for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.ssl</strong></p><p><code class="type">boolean</code></p></div><div class="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p class="title">The server where to migrate data from is secured with SSL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.username</strong></p><p><code class="type">string</code></p></div>
              <p class="title">User name for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.dbname</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Database name for bootstrapping the initial connection</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.ignore_dbs</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.ignore_roles</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Comma-separated list of database roles, which should be ignored during migration (supported by PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>migration.method</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>private_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from private networks</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>private_access.mysql</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>private_access.mysqlx</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to mysqlx with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>private_access.prometheus</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>privatelink_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service components through Privatelink</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.mysql</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable mysql</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.mysqlx</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable mysqlx</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.prometheus</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>public_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from the public Internet</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.mysql</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to mysql from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.mysqlx</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to mysqlx from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.prometheus</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>service_to_fork_from</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>project_to_fork_from</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>mysql_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">MySQL major version</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>recovery_target_time</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Recovery target time when forking a service. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>binlog_retention_period</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>600</code></li><li>max: <code>86400</code></li></ul></div>
        <p class="title">The minimum amount of time in seconds to keep binlog entries before deletion. This may be extended for services that require binlog entries for longer than the default for example if using the MySQL Debezium Kafka connector.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>mysql</strong></p><p><code class="type">object</code></p></div>
        <p class="title">mysql.conf configuration values</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.sql_mode</strong></p><p><code class="type">string</code></p></div>
              <p class="title">sql_mode</p>
              <div class="description"><p>Global SQL mode. Set to empty to use MySQL server defaults. When creating a new service and not setting this field Aiven default SQL mode (strict, SQL standard compliant) will be assigned.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.connect_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>2</code></li><li>max: <code>3600</code></li></ul></div>
              <p class="title">connect_timeout</p>
              <div class="description"><p>The number of seconds that the mysqld server waits for a connect packet before responding with Bad handshake</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.default_time_zone</strong></p><p><code class="type">string</code></p></div>
              <p class="title">default_time_zone</p>
              <div class="description"><p>Default server time zone as an offset from UTC (from -12:00 to +12:00), a time zone name, or 'SYSTEM' to use the MySQL server default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.group_concat_max_len</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>4</code></li><li>max: <code>18446744073709552000</code></li></ul></div>
              <p class="title">group_concat_max_len</p>
              <div class="description"><p>The maximum permitted result length in bytes for the GROUP_CONCAT() function.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.information_schema_stats_expiry</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>900</code></li><li>max: <code>31536000</code></li></ul></div>
              <p class="title">information_schema_stats_expiry</p>
              <div class="description"><p>The time, in seconds, before cached statistics expire</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_change_buffer_max_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>50</code></li></ul></div>
              <p class="title">innodb_change_buffer_max_size</p>
              <div class="description"><p>Maximum size for the InnoDB change buffer, as a percentage of the total size of the buffer pool. Default is 25</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_flush_neighbors</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>2</code></li></ul></div>
              <p class="title">innodb_flush_neighbors</p>
              <div class="description"><p>Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent (default is 1): 0 - dirty pages in the same extent are not flushed, 1 - flush contiguous dirty pages in the same extent, 2 - flush dirty pages in the same extent</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_ft_min_token_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>16</code></li></ul></div>
              <p class="title">innodb_ft_min_token_size</p>
              <div class="description"><p>Minimum length of words that are stored in an InnoDB FULLTEXT index. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_ft_server_stopword_table</strong></p><p><code class="type">null,string</code></p></div>
              <p class="title">innodb_ft_server_stopword_table</p>
              <div class="description"><p>This option is used to specify your own InnoDB FULLTEXT index stopword list for all InnoDB tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_lock_wait_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p class="title">innodb_lock_wait_timeout</p>
              <div class="description"><p>The length of time in seconds an InnoDB transaction waits for a row lock before giving up. Default is 120.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_log_buffer_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>4294967295</code></li></ul></div>
              <p class="title">innodb_log_buffer_size</p>
              <div class="description"><p>The size in bytes of the buffer that InnoDB uses to write to the log files on disk.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_online_alter_log_max_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>65536</code></li><li>max: <code>1099511627776</code></li></ul></div>
              <p class="title">innodb_online_alter_log_max_size</p>
              <div class="description"><p>The upper limit in bytes on the size of the temporary log files used during online DDL operations for InnoDB tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_print_all_deadlocks</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">innodb_print_all_deadlocks</p>
              <div class="description"><p>When enabled, information about all deadlocks in InnoDB user transactions is recorded in the error log. Disabled by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_read_io_threads</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>64</code></li></ul></div>
              <p class="title">innodb_read_io_threads</p>
              <div class="description"><p>The number of I/O threads for read operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_rollback_on_timeout</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">innodb_rollback_on_timeout</p>
              <div class="description"><p>When enabled a transaction timeout causes InnoDB to abort and roll back the entire transaction. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_thread_concurrency</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>1000</code></li></ul></div>
              <p class="title">innodb_thread_concurrency</p>
              <div class="description"><p>Defines the maximum number of threads permitted inside of InnoDB. Default is 0 (infinite concurrency - no limit)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.innodb_write_io_threads</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>64</code></li></ul></div>
              <p class="title">innodb_write_io_threads</p>
              <div class="description"><p>The number of I/O threads for write operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.interactive_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>30</code></li><li>max: <code>604800</code></li></ul></div>
              <p class="title">interactive_timeout</p>
              <div class="description"><p>The number of seconds the server waits for activity on an interactive connection before closing it.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.internal_tmp_mem_storage_engine</strong></p><p><code class="type">string</code></p></div>
              <p class="title">internal_tmp_mem_storage_engine</p>
              <div class="description"><p>The storage engine for in-memory internal temporary tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.net_buffer_length</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>1048576</code></li></ul></div>
              <p class="title">net_buffer_length</p>
              <div class="description"><p>Start sizes of connection buffer and result buffer. Default is 16384 (16K). Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.net_read_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p class="title">net_read_timeout</p>
              <div class="description"><p>The number of seconds to wait for more data from a connection before aborting the read.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.net_write_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p class="title">net_write_timeout</p>
              <div class="description"><p>The number of seconds to wait for a block to be written to a connection before aborting the write.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.sql_require_primary_key</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">sql_require_primary_key</p>
              <div class="description"><p>Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.wait_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483</code></li></ul></div>
              <p class="title">wait_timeout</p>
              <div class="description"><p>The number of seconds the server waits for activity on a noninteractive connection before closing it.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.max_allowed_packet</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>102400</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p class="title">max_allowed_packet</p>
              <div class="description"><p>Size of the largest message in bytes that can be received by the server. Default is 67108864 (64M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.max_heap_table_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p class="title">max_heap_table_size</p>
              <div class="description"><p>Limits the size of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.sort_buffer_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>32768</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p class="title">sort_buffer_size</p>
              <div class="description"><p>Sort buffer size in bytes for ORDER BY optimization. Default is 262144 (256K)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.tmp_table_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p class="title">tmp_table_size</p>
              <div class="description"><p>Limits the size of internal in-memory tables. Also set max_heap_table_size. Default is 16777216 (16M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.slow_query_log</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">slow_query_log</p>
              <div class="description"><p>Slow query log enables capturing of slow queries. Setting slow_query_log to false also truncates the mysql.slow_log table.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.long_query_time</strong></p><p><code class="type">number</code></p></div><div class="constraints"><ul><li>max: <code>3600</code></li></ul></div>
              <p class="title">long_query_time</p>
              <div class="description"><p>The slow_query_logs work as SQL statements that take more than long_query_time seconds to execute.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>mysql.log_output</strong></p><p><code class="type">string</code></p></div>
              <p class="title">log_output</p>
              <div class="description"><p>The slow log output destination when slow_query_log is ON. To enable MySQL AI Insights, choose INSIGHTS. To use MySQL AI Insights and the mysql.slow_log table at the same time, choose INSIGHTS,TABLE. To only use the mysql.slow_log table, choose TABLE. To silence slow logs, choose NONE.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    