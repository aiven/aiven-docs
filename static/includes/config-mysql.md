
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="additional_backup_regions"><strong>additional_backup_regions</strong></p><p><code className="type">array</code></p><a href="#additional_backup_regions">#</a></div>
        <p className="title">Additional Cloud Regions for Backup Replication</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="ip_filter"><strong>ip_filter</strong></p><p><code className="type">array</code></p><a href="#ip_filter">#</a></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
        <p className="title">IP filter</p>
        <div className="description"><p>Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="service_log"><strong>service_log</strong></p><p><code className="type">boolean,null</code></p><a href="#service_log">#</a></div>
        <p className="title">Service logging</p>
        <div className="description"><p>Store logs for the service so that they are available in the HTTP API and console.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="static_ips"><strong>static_ips</strong></p><p><code className="type">boolean</code></p><a href="#static_ips">#</a></div>
        <p className="title">Static IP addresses</p>
        <div className="description"><p>Use static public IP addresses</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="admin_username"><strong>admin_username</strong></p><p><code className="type">string,null</code></p><a href="#admin_username">#</a></div>
        <p className="title">Custom username for admin user. This must be set only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="admin_password"><strong>admin_password</strong></p><p><code className="type">string,null</code></p><a href="#admin_password">#</a></div>
        <p className="title">Custom password for admin user. Defaults to random string. This must be set only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="backup_hour"><strong>backup_hour</strong></p><p><code className="type">integer,null</code></p><a href="#backup_hour">#</a></div><div className="constraints"><ul><li>max: <code>23</code></li></ul></div>
        <p className="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="backup_minute"><strong>backup_minute</strong></p><p><code className="type">integer,null</code></p><a href="#backup_minute">#</a></div><div className="constraints"><ul><li>max: <code>59</code></li></ul></div>
        <p className="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="migration"><strong>migration</strong></p><p><code className="type">object,null</code></p><a href="#migration">#</a></div>
        <p className="title">Migrate data from existing server</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_host"><strong>migration.host</strong></p><p><code className="type">string</code></p><a href="#migration_host">#</a></div>
              <p className="title">Hostname or IP address of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_port"><strong>migration.port</strong></p><p><code className="type">integer</code></p><a href="#migration_port">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div>
              <p className="title">Port number of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_password"><strong>migration.password</strong></p><p><code className="type">string</code></p><a href="#migration_password">#</a></div>
              <p className="title">Password for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_ssl"><strong>migration.ssl</strong></p><p><code className="type">boolean</code></p><a href="#migration_ssl">#</a></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">The server where to migrate data from is secured with SSL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_username"><strong>migration.username</strong></p><p><code className="type">string</code></p><a href="#migration_username">#</a></div>
              <p className="title">User name for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_dbname"><strong>migration.dbname</strong></p><p><code className="type">string</code></p><a href="#migration_dbname">#</a></div>
              <p className="title">Database name for bootstrapping the initial connection</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_ignore_dbs"><strong>migration.ignore_dbs</strong></p><p><code className="type">string</code></p><a href="#migration_ignore_dbs">#</a></div>
              <p className="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_ignore_roles"><strong>migration.ignore_roles</strong></p><p><code className="type">string</code></p><a href="#migration_ignore_roles">#</a></div>
              <p className="title">Comma-separated list of database roles, which should be ignored during migration (supported by PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_method"><strong>migration.method</strong></p><p><code className="type">string</code></p><a href="#migration_method">#</a></div>
              <p className="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="private_access"><strong>private_access</strong></p><p><code className="type">object</code></p><a href="#private_access">#</a></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_mysql"><strong>private_access.mysql</strong></p><p><code className="type">boolean</code></p><a href="#private_access_mysql">#</a></div>
              <p className="title">Allow clients to connect to mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_mysqlx"><strong>private_access.mysqlx</strong></p><p><code className="type">boolean</code></p><a href="#private_access_mysqlx">#</a></div>
              <p className="title">Allow clients to connect to mysqlx with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_prometheus"><strong>private_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#private_access_prometheus">#</a></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="privatelink_access"><strong>privatelink_access</strong></p><p><code className="type">object</code></p><a href="#privatelink_access">#</a></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_mysql"><strong>privatelink_access.mysql</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_mysql">#</a></div>
              <p className="title">Enable mysql</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_mysqlx"><strong>privatelink_access.mysqlx</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_mysqlx">#</a></div>
              <p className="title">Enable mysqlx</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_prometheus">#</a></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="public_access"><strong>public_access</strong></p><p><code className="type">object</code></p><a href="#public_access">#</a></div>
        <p className="title">Allow access to selected service ports from the public Internet</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_mysql"><strong>public_access.mysql</strong></p><p><code className="type">boolean</code></p><a href="#public_access_mysql">#</a></div>
              <p className="title">Allow clients to connect to mysql from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_mysqlx"><strong>public_access.mysqlx</strong></p><p><code className="type">boolean</code></p><a href="#public_access_mysqlx">#</a></div>
              <p className="title">Allow clients to connect to mysqlx from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_prometheus"><strong>public_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#public_access_prometheus">#</a></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="service_to_fork_from"><strong>service_to_fork_from</strong></p><p><code className="type">string,null</code></p><a href="#service_to_fork_from">#</a></div>
        <p className="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="project_to_fork_from"><strong>project_to_fork_from</strong></p><p><code className="type">string,null</code></p><a href="#project_to_fork_from">#</a></div>
        <p className="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="mysql_version"><strong>mysql_version</strong></p><p><code className="type">string,null</code></p><a href="#mysql_version">#</a></div>
        <p className="title">MySQL major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="recovery_target_time"><strong>recovery_target_time</strong></p><p><code className="type">string,null</code></p><a href="#recovery_target_time">#</a></div>
        <p className="title">Recovery target time when forking a service. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="binlog_retention_period"><strong>binlog_retention_period</strong></p><p><code className="type">integer</code></p><a href="#binlog_retention_period">#</a></div><div className="constraints"><ul><li>min: <code>600</code></li><li>max: <code>86400</code></li></ul></div>
        <p className="title">The minimum amount of time in seconds to keep binlog entries before deletion. This may be extended for services that require binlog entries for longer than the default for example if using the MySQL Debezium Kafka connector.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="mysql"><strong>mysql</strong></p><p><code className="type">object</code></p><a href="#mysql">#</a></div>
        <p className="title">mysql.conf configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_sql_mode"><strong>mysql.sql_mode</strong></p><p><code className="type">string</code></p><a href="#mysql_sql_mode">#</a></div>
              <p className="title">sql_mode</p>
              <div className="description"><p>Global SQL mode. Set to empty to use MySQL server defaults. When creating a new service and not setting this field Aiven default SQL mode (strict, SQL standard compliant) will be assigned.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_connect_timeout"><strong>mysql.connect_timeout</strong></p><p><code className="type">integer</code></p><a href="#mysql_connect_timeout">#</a></div><div className="constraints"><ul><li>min: <code>2</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">connect_timeout</p>
              <div className="description"><p>The number of seconds that the mysqld server waits for a connect packet before responding with Bad handshake</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_default_time_zone"><strong>mysql.default_time_zone</strong></p><p><code className="type">string</code></p><a href="#mysql_default_time_zone">#</a></div>
              <p className="title">default_time_zone</p>
              <div className="description"><p>Default server time zone as an offset from UTC (from -12:00 to +12:00), a time zone name, or 'SYSTEM' to use the MySQL server default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_group_concat_max_len"><strong>mysql.group_concat_max_len</strong></p><p><code className="type">integer</code></p><a href="#mysql_group_concat_max_len">#</a></div><div className="constraints"><ul><li>min: <code>4</code></li><li>max: <code>18446744073709552000</code></li></ul></div>
              <p className="title">group_concat_max_len</p>
              <div className="description"><p>The maximum permitted result length in bytes for the GROUP_CONCAT() function.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_information_schema_stats_expiry"><strong>mysql.information_schema_stats_expiry</strong></p><p><code className="type">integer</code></p><a href="#mysql_information_schema_stats_expiry">#</a></div><div className="constraints"><ul><li>min: <code>900</code></li><li>max: <code>31536000</code></li></ul></div>
              <p className="title">information_schema_stats_expiry</p>
              <div className="description"><p>The time, in seconds, before cached statistics expire</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_change_buffer_max_size"><strong>mysql.innodb_change_buffer_max_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_change_buffer_max_size">#</a></div><div className="constraints"><ul><li>max: <code>50</code></li></ul></div>
              <p className="title">innodb_change_buffer_max_size</p>
              <div className="description"><p>Maximum size for the InnoDB change buffer, as a percentage of the total size of the buffer pool. Default is 25</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_flush_neighbors"><strong>mysql.innodb_flush_neighbors</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_flush_neighbors">#</a></div><div className="constraints"><ul><li>max: <code>2</code></li></ul></div>
              <p className="title">innodb_flush_neighbors</p>
              <div className="description"><p>Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent (default is 1): 0 - dirty pages in the same extent are not flushed, 1 - flush contiguous dirty pages in the same extent, 2 - flush dirty pages in the same extent</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_ft_min_token_size"><strong>mysql.innodb_ft_min_token_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_ft_min_token_size">#</a></div><div className="constraints"><ul><li>max: <code>16</code></li></ul></div>
              <p className="title">innodb_ft_min_token_size</p>
              <div className="description"><p>Minimum length of words that are stored in an InnoDB FULLTEXT index. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_ft_server_stopword_table"><strong>mysql.innodb_ft_server_stopword_table</strong></p><p><code className="type">null,string</code></p><a href="#mysql_innodb_ft_server_stopword_table">#</a></div>
              <p className="title">innodb_ft_server_stopword_table</p>
              <div className="description"><p>This option is used to specify your own InnoDB FULLTEXT index stopword list for all InnoDB tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_lock_wait_timeout"><strong>mysql.innodb_lock_wait_timeout</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_lock_wait_timeout">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">innodb_lock_wait_timeout</p>
              <div className="description"><p>The length of time in seconds an InnoDB transaction waits for a row lock before giving up. Default is 120.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_log_buffer_size"><strong>mysql.innodb_log_buffer_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_log_buffer_size">#</a></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>4294967295</code></li></ul></div>
              <p className="title">innodb_log_buffer_size</p>
              <div className="description"><p>The size in bytes of the buffer that InnoDB uses to write to the log files on disk.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_online_alter_log_max_size"><strong>mysql.innodb_online_alter_log_max_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_online_alter_log_max_size">#</a></div><div className="constraints"><ul><li>min: <code>65536</code></li><li>max: <code>1099511627776</code></li></ul></div>
              <p className="title">innodb_online_alter_log_max_size</p>
              <div className="description"><p>The upper limit in bytes on the size of the temporary log files used during online DDL operations for InnoDB tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_print_all_deadlocks"><strong>mysql.innodb_print_all_deadlocks</strong></p><p><code className="type">boolean</code></p><a href="#mysql_innodb_print_all_deadlocks">#</a></div>
              <p className="title">innodb_print_all_deadlocks</p>
              <div className="description"><p>When enabled, information about all deadlocks in InnoDB user transactions is recorded in the error log. Disabled by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_read_io_threads"><strong>mysql.innodb_read_io_threads</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_read_io_threads">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">innodb_read_io_threads</p>
              <div className="description"><p>The number of I/O threads for read operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_rollback_on_timeout"><strong>mysql.innodb_rollback_on_timeout</strong></p><p><code className="type">boolean</code></p><a href="#mysql_innodb_rollback_on_timeout">#</a></div>
              <p className="title">innodb_rollback_on_timeout</p>
              <div className="description"><p>When enabled a transaction timeout causes InnoDB to abort and roll back the entire transaction. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_thread_concurrency"><strong>mysql.innodb_thread_concurrency</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_thread_concurrency">#</a></div><div className="constraints"><ul><li>max: <code>1000</code></li></ul></div>
              <p className="title">innodb_thread_concurrency</p>
              <div className="description"><p>Defines the maximum number of threads permitted inside of InnoDB. Default is 0 (infinite concurrency - no limit)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_innodb_write_io_threads"><strong>mysql.innodb_write_io_threads</strong></p><p><code className="type">integer</code></p><a href="#mysql_innodb_write_io_threads">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">innodb_write_io_threads</p>
              <div className="description"><p>The number of I/O threads for write operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_interactive_timeout"><strong>mysql.interactive_timeout</strong></p><p><code className="type">integer</code></p><a href="#mysql_interactive_timeout">#</a></div><div className="constraints"><ul><li>min: <code>30</code></li><li>max: <code>604800</code></li></ul></div>
              <p className="title">interactive_timeout</p>
              <div className="description"><p>The number of seconds the server waits for activity on an interactive connection before closing it.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_internal_tmp_mem_storage_engine"><strong>mysql.internal_tmp_mem_storage_engine</strong></p><p><code className="type">string</code></p><a href="#mysql_internal_tmp_mem_storage_engine">#</a></div>
              <p className="title">internal_tmp_mem_storage_engine</p>
              <div className="description"><p>The storage engine for in-memory internal temporary tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_net_buffer_length"><strong>mysql.net_buffer_length</strong></p><p><code className="type">integer</code></p><a href="#mysql_net_buffer_length">#</a></div><div className="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>1048576</code></li></ul></div>
              <p className="title">net_buffer_length</p>
              <div className="description"><p>Start sizes of connection buffer and result buffer. Default is 16384 (16K). Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_net_read_timeout"><strong>mysql.net_read_timeout</strong></p><p><code className="type">integer</code></p><a href="#mysql_net_read_timeout">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">net_read_timeout</p>
              <div className="description"><p>The number of seconds to wait for more data from a connection before aborting the read.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_net_write_timeout"><strong>mysql.net_write_timeout</strong></p><p><code className="type">integer</code></p><a href="#mysql_net_write_timeout">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">net_write_timeout</p>
              <div className="description"><p>The number of seconds to wait for a block to be written to a connection before aborting the write.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_sql_require_primary_key"><strong>mysql.sql_require_primary_key</strong></p><p><code className="type">boolean</code></p><a href="#mysql_sql_require_primary_key">#</a></div>
              <p className="title">sql_require_primary_key</p>
              <div className="description"><p>Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_wait_timeout"><strong>mysql.wait_timeout</strong></p><p><code className="type">integer</code></p><a href="#mysql_wait_timeout">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483</code></li></ul></div>
              <p className="title">wait_timeout</p>
              <div className="description"><p>The number of seconds the server waits for activity on a noninteractive connection before closing it.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_max_allowed_packet"><strong>mysql.max_allowed_packet</strong></p><p><code className="type">integer</code></p><a href="#mysql_max_allowed_packet">#</a></div><div className="constraints"><ul><li>min: <code>102400</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">max_allowed_packet</p>
              <div className="description"><p>Size of the largest message in bytes that can be received by the server. Default is 67108864 (64M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_max_heap_table_size"><strong>mysql.max_heap_table_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_max_heap_table_size">#</a></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">max_heap_table_size</p>
              <div className="description"><p>Limits the size of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_sort_buffer_size"><strong>mysql.sort_buffer_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_sort_buffer_size">#</a></div><div className="constraints"><ul><li>min: <code>32768</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">sort_buffer_size</p>
              <div className="description"><p>Sort buffer size in bytes for ORDER BY optimization. Default is 262144 (256K)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_tmp_table_size"><strong>mysql.tmp_table_size</strong></p><p><code className="type">integer</code></p><a href="#mysql_tmp_table_size">#</a></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">tmp_table_size</p>
              <div className="description"><p>Limits the size of internal in-memory tables. Also set max_heap_table_size. Default is 16777216 (16M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_slow_query_log"><strong>mysql.slow_query_log</strong></p><p><code className="type">boolean</code></p><a href="#mysql_slow_query_log">#</a></div>
              <p className="title">slow_query_log</p>
              <div className="description"><p>Slow query log enables capturing of slow queries. Setting slow_query_log to false also truncates the mysql.slow_log table.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_long_query_time"><strong>mysql.long_query_time</strong></p><p><code className="type">number</code></p><a href="#mysql_long_query_time">#</a></div><div className="constraints"><ul><li>max: <code>3600</code></li></ul></div>
              <p className="title">long_query_time</p>
              <div className="description"><p>The slow_query_logs work as SQL statements that take more than long_query_time seconds to execute.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="mysql_log_output"><strong>mysql.log_output</strong></p><p><code className="type">string</code></p><a href="#mysql_log_output">#</a></div>
              <p className="title">log_output</p>
              <div className="description"><p>The slow log output destination when slow_query_log is ON. To enable MySQL AI Insights, choose INSIGHTS. To use MySQL AI Insights and the mysql.slow_log table at the same time, choose INSIGHTS,TABLE. To only use the mysql.slow_log table, choose TABLE. To silence slow logs, choose NONE.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    