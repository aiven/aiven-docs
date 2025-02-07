
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name"><Link id="additional_backup_regions"/><Link to="#additional_backup_regions"><strong>additional_backup_regions</strong></Link></p><p><code className="type">array</code></p></div>
        <p className="title">Additional Cloud Regions for Backup Replication</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="ip_filter"/><Link to="#ip_filter"><strong>ip_filter</strong></Link></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="service_log"/><Link to="#service_log"><strong>service_log</strong></Link></p><p><code className="type">boolean,null</code></p></div>
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
        <div className="param"><p className="name"><Link id="static_ips"/><Link to="#static_ips"><strong>static_ips</strong></Link></p><p><code className="type">boolean</code></p></div>
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
        <div className="param"><p className="name"><Link id="admin_username"/><Link to="#admin_username"><strong>admin_username</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Custom username for admin user. This must be set only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="admin_password"/><Link to="#admin_password"><strong>admin_password</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Custom password for admin user. Defaults to random string. This must be set only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="backup_hour"/><Link to="#backup_hour"><strong>backup_hour</strong></Link></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>max: <code>23</code></li></ul></div>
        <p className="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="backup_minute"/><Link to="#backup_minute"><strong>backup_minute</strong></Link></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>max: <code>59</code></li></ul></div>
        <p className="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="migration"/><Link to="#migration"><strong>migration</strong></Link></p><p><code className="type">object,null</code></p></div>
        <p className="title">Migrate data from existing server</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_host"/><Link to="#migration_host"><strong>migration.host</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Hostname or IP address of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_port"/><Link to="#migration_port"><strong>migration.port</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div>
              <p className="title">Port number of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_password"/><Link to="#migration_password"><strong>migration.password</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Password for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_ssl"/><Link to="#migration_ssl"><strong>migration.ssl</strong></Link></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">The server where to migrate data from is secured with SSL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_username"/><Link to="#migration_username"><strong>migration.username</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">User name for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_dbname"/><Link to="#migration_dbname"><strong>migration.dbname</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Database name for bootstrapping the initial connection</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_ignore_dbs"/><Link to="#migration_ignore_dbs"><strong>migration.ignore_dbs</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_ignore_roles"/><Link to="#migration_ignore_roles"><strong>migration.ignore_roles</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Comma-separated list of database roles, which should be ignored during migration (supported by PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="migration_method"/><Link to="#migration_method"><strong>migration.method</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="private_access"/><Link to="#private_access"><strong>private_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_mysql"/><Link to="#private_access_mysql"><strong>private_access.mysql</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_mysqlx"/><Link to="#private_access_mysqlx"><strong>private_access.mysqlx</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to mysqlx with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_prometheus"/><Link to="#private_access_prometheus"><strong>private_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="privatelink_access"/><Link to="#privatelink_access"><strong>privatelink_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_mysql"/><Link to="#privatelink_access_mysql"><strong>privatelink_access.mysql</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable mysql</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_mysqlx"/><Link to="#privatelink_access_mysqlx"><strong>privatelink_access.mysqlx</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable mysqlx</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_prometheus"/><Link to="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="public_access"/><Link to="#public_access"><strong>public_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from the public Internet</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_mysql"/><Link to="#public_access_mysql"><strong>public_access.mysql</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to mysql from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_mysqlx"/><Link to="#public_access_mysqlx"><strong>public_access.mysqlx</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to mysqlx from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_prometheus"/><Link to="#public_access_prometheus"><strong>public_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="service_to_fork_from"/><Link to="#service_to_fork_from"><strong>service_to_fork_from</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="project_to_fork_from"/><Link to="#project_to_fork_from"><strong>project_to_fork_from</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="mysql_version"/><Link to="#mysql_version"><strong>mysql_version</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">MySQL major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="recovery_target_time"/><Link to="#recovery_target_time"><strong>recovery_target_time</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Recovery target time when forking a service. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="binlog_retention_period"/><Link to="#binlog_retention_period"><strong>binlog_retention_period</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>600</code></li><li>max: <code>86400</code></li></ul></div>
        <p className="title">The minimum amount of time in seconds to keep binlog entries before deletion. This may be extended for services that require binlog entries for longer than the default for example if using the MySQL Debezium Kafka connector.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="mysql"/><Link to="#mysql"><strong>mysql</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">mysql.conf configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_sql_mode"/><Link to="#mysql_sql_mode"><strong>mysql.sql_mode</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">sql_mode</p>
              <div className="description"><p>Global SQL mode. Set to empty to use MySQL server defaults. When creating a new service and not setting this field Aiven default SQL mode (strict, SQL standard compliant) will be assigned.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_connect_timeout"/><Link to="#mysql_connect_timeout"><strong>mysql.connect_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>2</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">connect_timeout</p>
              <div className="description"><p>The number of seconds that the mysqld server waits for a connect packet before responding with Bad handshake</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_default_time_zone"/><Link to="#mysql_default_time_zone"><strong>mysql.default_time_zone</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">default_time_zone</p>
              <div className="description"><p>Default server time zone as an offset from UTC (from -12:00 to +12:00), a time zone name, or 'SYSTEM' to use the MySQL server default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_group_concat_max_len"/><Link to="#mysql_group_concat_max_len"><strong>mysql.group_concat_max_len</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>4</code></li><li>max: <code>18446744073709552000</code></li></ul></div>
              <p className="title">group_concat_max_len</p>
              <div className="description"><p>The maximum permitted result length in bytes for the GROUP_CONCAT() function.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_information_schema_stats_expiry"/><Link to="#mysql_information_schema_stats_expiry"><strong>mysql.information_schema_stats_expiry</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>900</code></li><li>max: <code>31536000</code></li></ul></div>
              <p className="title">information_schema_stats_expiry</p>
              <div className="description"><p>The time, in seconds, before cached statistics expire</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_change_buffer_max_size"/><Link to="#mysql_innodb_change_buffer_max_size"><strong>mysql.innodb_change_buffer_max_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>50</code></li></ul></div>
              <p className="title">innodb_change_buffer_max_size</p>
              <div className="description"><p>Maximum size for the InnoDB change buffer, as a percentage of the total size of the buffer pool. Default is 25</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_flush_neighbors"/><Link to="#mysql_innodb_flush_neighbors"><strong>mysql.innodb_flush_neighbors</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2</code></li></ul></div>
              <p className="title">innodb_flush_neighbors</p>
              <div className="description"><p>Specifies whether flushing a page from the InnoDB buffer pool also flushes other dirty pages in the same extent (default is 1): 0 - dirty pages in the same extent are not flushed, 1 - flush contiguous dirty pages in the same extent, 2 - flush dirty pages in the same extent</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_ft_min_token_size"/><Link to="#mysql_innodb_ft_min_token_size"><strong>mysql.innodb_ft_min_token_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>16</code></li></ul></div>
              <p className="title">innodb_ft_min_token_size</p>
              <div className="description"><p>Minimum length of words that are stored in an InnoDB FULLTEXT index. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_ft_server_stopword_table"/><Link to="#mysql_innodb_ft_server_stopword_table"><strong>mysql.innodb_ft_server_stopword_table</strong></Link></p><p><code className="type">null,string</code></p></div>
              <p className="title">innodb_ft_server_stopword_table</p>
              <div className="description"><p>This option is used to specify your own InnoDB FULLTEXT index stopword list for all InnoDB tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_lock_wait_timeout"/><Link to="#mysql_innodb_lock_wait_timeout"><strong>mysql.innodb_lock_wait_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">innodb_lock_wait_timeout</p>
              <div className="description"><p>The length of time in seconds an InnoDB transaction waits for a row lock before giving up. Default is 120.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_log_buffer_size"/><Link to="#mysql_innodb_log_buffer_size"><strong>mysql.innodb_log_buffer_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>4294967295</code></li></ul></div>
              <p className="title">innodb_log_buffer_size</p>
              <div className="description"><p>The size in bytes of the buffer that InnoDB uses to write to the log files on disk.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_online_alter_log_max_size"/><Link to="#mysql_innodb_online_alter_log_max_size"><strong>mysql.innodb_online_alter_log_max_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>65536</code></li><li>max: <code>1099511627776</code></li></ul></div>
              <p className="title">innodb_online_alter_log_max_size</p>
              <div className="description"><p>The upper limit in bytes on the size of the temporary log files used during online DDL operations for InnoDB tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_print_all_deadlocks"/><Link to="#mysql_innodb_print_all_deadlocks"><strong>mysql.innodb_print_all_deadlocks</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">innodb_print_all_deadlocks</p>
              <div className="description"><p>When enabled, information about all deadlocks in InnoDB user transactions is recorded in the error log. Disabled by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_read_io_threads"/><Link to="#mysql_innodb_read_io_threads"><strong>mysql.innodb_read_io_threads</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">innodb_read_io_threads</p>
              <div className="description"><p>The number of I/O threads for read operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_rollback_on_timeout"/><Link to="#mysql_innodb_rollback_on_timeout"><strong>mysql.innodb_rollback_on_timeout</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">innodb_rollback_on_timeout</p>
              <div className="description"><p>When enabled a transaction timeout causes InnoDB to abort and roll back the entire transaction. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_thread_concurrency"/><Link to="#mysql_innodb_thread_concurrency"><strong>mysql.innodb_thread_concurrency</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>1000</code></li></ul></div>
              <p className="title">innodb_thread_concurrency</p>
              <div className="description"><p>Defines the maximum number of threads permitted inside of InnoDB. Default is 0 (infinite concurrency - no limit)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_innodb_write_io_threads"/><Link to="#mysql_innodb_write_io_threads"><strong>mysql.innodb_write_io_threads</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">innodb_write_io_threads</p>
              <div className="description"><p>The number of I/O threads for write operations in InnoDB. Default is 4. Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_interactive_timeout"/><Link to="#mysql_interactive_timeout"><strong>mysql.interactive_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>30</code></li><li>max: <code>604800</code></li></ul></div>
              <p className="title">interactive_timeout</p>
              <div className="description"><p>The number of seconds the server waits for activity on an interactive connection before closing it.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_internal_tmp_mem_storage_engine"/><Link to="#mysql_internal_tmp_mem_storage_engine"><strong>mysql.internal_tmp_mem_storage_engine</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">internal_tmp_mem_storage_engine</p>
              <div className="description"><p>The storage engine for in-memory internal temporary tables.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_net_buffer_length"/><Link to="#mysql_net_buffer_length"><strong>mysql.net_buffer_length</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>1048576</code></li></ul></div>
              <p className="title">net_buffer_length</p>
              <div className="description"><p>Start sizes of connection buffer and result buffer. Default is 16384 (16K). Changing this parameter will lead to a restart of the MySQL service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_net_read_timeout"/><Link to="#mysql_net_read_timeout"><strong>mysql.net_read_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">net_read_timeout</p>
              <div className="description"><p>The number of seconds to wait for more data from a connection before aborting the read.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_net_write_timeout"/><Link to="#mysql_net_write_timeout"><strong>mysql.net_write_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>3600</code></li></ul></div>
              <p className="title">net_write_timeout</p>
              <div className="description"><p>The number of seconds to wait for a block to be written to a connection before aborting the write.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_sql_require_primary_key"/><Link to="#mysql_sql_require_primary_key"><strong>mysql.sql_require_primary_key</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">sql_require_primary_key</p>
              <div className="description"><p>Require primary key to be defined for new tables or old tables modified with ALTER TABLE and fail if missing. It is recommended to always have primary keys because various functionality may break if any large table is missing them.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_wait_timeout"/><Link to="#mysql_wait_timeout"><strong>mysql.wait_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483</code></li></ul></div>
              <p className="title">wait_timeout</p>
              <div className="description"><p>The number of seconds the server waits for activity on a noninteractive connection before closing it.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_max_allowed_packet"/><Link to="#mysql_max_allowed_packet"><strong>mysql.max_allowed_packet</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>102400</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">max_allowed_packet</p>
              <div className="description"><p>Size of the largest message in bytes that can be received by the server. Default is 67108864 (64M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_max_heap_table_size"/><Link to="#mysql_max_heap_table_size"><strong>mysql.max_heap_table_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">max_heap_table_size</p>
              <div className="description"><p>Limits the size of internal in-memory tables. Also set tmp_table_size. Default is 16777216 (16M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_sort_buffer_size"/><Link to="#mysql_sort_buffer_size"><strong>mysql.sort_buffer_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>32768</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">sort_buffer_size</p>
              <div className="description"><p>Sort buffer size in bytes for ORDER BY optimization. Default is 262144 (256K)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_tmp_table_size"/><Link to="#mysql_tmp_table_size"><strong>mysql.tmp_table_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">tmp_table_size</p>
              <div className="description"><p>Limits the size of internal in-memory tables. Also set max_heap_table_size. Default is 16777216 (16M)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_slow_query_log"/><Link to="#mysql_slow_query_log"><strong>mysql.slow_query_log</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">slow_query_log</p>
              <div className="description"><p>Slow query log enables capturing of slow queries. Setting slow_query_log to false also truncates the mysql.slow_log table.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_long_query_time"/><Link to="#mysql_long_query_time"><strong>mysql.long_query_time</strong></Link></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>3600</code></li></ul></div>
              <p className="title">long_query_time</p>
              <div className="description"><p>The slow_query_logs work as SQL statements that take more than long_query_time seconds to execute.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="mysql_log_output"/><Link to="#mysql_log_output"><strong>mysql.log_output</strong></Link></p><p><code className="type">string</code></p></div>
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
    