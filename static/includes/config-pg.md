
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="migration"><a href="#migration"><strong>migration</strong></a></p><p><code className="type">object,null</code></p></div>
        <p className="title">Migrate data from existing server</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_host"><a href="#migration_host"><strong>migration.host</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Hostname or IP address of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_port"><a href="#migration_port"><strong>migration.port</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div>
              <p className="title">Port number of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_password"><a href="#migration_password"><strong>migration.password</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Password for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_ssl"><a href="#migration_ssl"><strong>migration.ssl</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">The server where to migrate data from is secured with SSL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_username"><a href="#migration_username"><strong>migration.username</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">User name for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_dbname"><a href="#migration_dbname"><strong>migration.dbname</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Database name for bootstrapping the initial connection</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_ignore_dbs"><a href="#migration_ignore_dbs"><strong>migration.ignore_dbs</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_ignore_roles"><a href="#migration_ignore_roles"><strong>migration.ignore_roles</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Comma-separated list of database roles, which should be ignored during migration (supported by PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="migration_method"><a href="#migration_method"><strong>migration.method</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="ip_filter"><a href="#ip_filter"><strong>ip_filter</strong></a></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
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
        <div className="param"><p className="name" id="static_ips"><a href="#static_ips"><strong>static_ips</strong></a></p><p><code className="type">boolean</code></p></div>
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
        <div className="param"><p className="name" id="service_log"><a href="#service_log"><strong>service_log</strong></a></p><p><code className="type">boolean,null</code></p></div>
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
        <div className="param"><p className="name" id="enable_ipv6"><a href="#enable_ipv6"><strong>enable_ipv6</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable IPv6</p>
        <div className="description"><p>Register AAAA DNS records for the service, and allow IPv6 packets to service ports</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="admin_username"><a href="#admin_username"><strong>admin_username</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Custom username for admin user. This must be set only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="admin_password"><a href="#admin_password"><strong>admin_password</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Custom password for admin user. Defaults to random string. This must be set only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="backup_hour"><a href="#backup_hour"><strong>backup_hour</strong></a></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>max: <code>23</code></li></ul></div>
        <p className="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="backup_minute"><a href="#backup_minute"><strong>backup_minute</strong></a></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>max: <code>59</code></li></ul></div>
        <p className="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pglookout"><a href="#pglookout"><strong>pglookout</strong></a></p><p><code className="type">object</code></p></div><div className="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p className="title">PGLookout settings</p>
        <div className="description"><p>System-wide settings for pglookout.</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="pglookout_max_failover_replication_time_lag"><a href="#pglookout_max_failover_replication_time_lag"><strong>pglookout.max_failover_replication_time_lag</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>60</code></li></ul></div>
              <p className="title">max_failover_replication_time_lag</p>
              <div className="description"><p>Number of seconds of master unavailability before triggering database failover to standby</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pg_service_to_fork_from"><a href="#pg_service_to_fork_from"><strong>pg_service_to_fork_from</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of the PG Service from which to fork (deprecated, use service_to_fork_from). This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="service_to_fork_from"><a href="#service_to_fork_from"><strong>service_to_fork_from</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="project_to_fork_from"><a href="#project_to_fork_from"><strong>project_to_fork_from</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="synchronous_replication"><a href="#synchronous_replication"><strong>synchronous_replication</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Synchronous replication type. Note that the service plan also needs to support synchronous replication.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pg_read_replica"><a href="#pg_read_replica"><strong>pg_read_replica</strong></a></p><p><code className="type">boolean,null</code></p></div>
        <p className="title">Should the service which is being forked be a read replica (deprecated, use read_replica service integration instead).</p>
        <div className="description"><p>This setting is deprecated. Use read_replica service integration instead.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pg_stat_monitor_enable"><a href="#pg_stat_monitor_enable"><strong>pg_stat_monitor_enable</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable pg_stat_monitor extension if available for the current cluster</p>
        <div className="description"><p>Enable the pg_stat_monitor extension. Enabling this extension will cause the cluster to be restarted.When this extension is enabled, pg_stat_statements results for utility commands are unreliable</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pg_version"><a href="#pg_version"><strong>pg_version</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">PostgreSQL major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pgbouncer"><a href="#pgbouncer"><strong>pgbouncer</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">PGBouncer connection pooling settings</p>
        <div className="description"><p>System-wide settings for pgbouncer.</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_server_reset_query_always"><a href="#pgbouncer_server_reset_query_always"><strong>pgbouncer.server_reset_query_always</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Run server_reset_query (DISCARD ALL) in all pooling modes</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_ignore_startup_parameters"><a href="#pgbouncer_ignore_startup_parameters"><strong>pgbouncer.ignore_startup_parameters</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">List of parameters to ignore when given in startup packet</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_min_pool_size"><a href="#pgbouncer_min_pool_size"><strong>pgbouncer.min_pool_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p className="title">Add more server connections to pool if below this number. Improves behavior when usual load comes suddenly back after period of total inactivity. The value is effectively capped at the pool size.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_server_lifetime"><a href="#pgbouncer_server_lifetime"><strong>pgbouncer.server_lifetime</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>60</code></li><li>max: <code>86400</code></li><li>default: <code>3600</code></li></ul></div>
              <p className="title">The pooler will close an unused server connection that has been connected longer than this. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_server_idle_timeout"><a href="#pgbouncer_server_idle_timeout"><strong>pgbouncer.server_idle_timeout</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>86400</code></li><li>default: <code>600</code></li></ul></div>
              <p className="title">If a server connection has been idle more than this many seconds it will be dropped. If 0 then timeout is disabled. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_autodb_pool_size"><a href="#pgbouncer_autodb_pool_size"><strong>pgbouncer.autodb_pool_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p className="title">If non-zero then create automatically a pool of that size per user when a pool doesn't exist.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_autodb_pool_mode"><a href="#pgbouncer_autodb_pool_mode"><strong>pgbouncer.autodb_pool_mode</strong></a></p><p><code className="type">string</code></p></div><div className="constraints"><ul><li>default: <code>transaction</code></li></ul></div>
              <p className="title">PGBouncer pool mode</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_autodb_max_db_connections"><a href="#pgbouncer_autodb_max_db_connections"><strong>pgbouncer.autodb_max_db_connections</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">Do not allow more than this many server connections per database (regardless of user). Setting it to 0 means unlimited.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_autodb_idle_timeout"><a href="#pgbouncer_autodb_idle_timeout"><strong>pgbouncer.autodb_idle_timeout</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>86400</code></li><li>default: <code>3600</code></li></ul></div>
              <p className="title">If the automatically created database pools have been unused this many seconds, they are freed. If 0 then timeout is disabled. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pgbouncer_max_prepared_statements"><a href="#pgbouncer_max_prepared_statements"><strong>pgbouncer.max_prepared_statements</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>3000</code></li><li>default: <code>100</code></li></ul></div>
              <p className="title">PgBouncer tracks protocol-level named prepared statements related commands sent by the client in transaction and statement pooling modes when max_prepared_statements is set to a non-zero value. Setting it to 0 disables prepared statements. max_prepared_statements defaults to 100, and its maximum is 3000.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="recovery_target_time"><a href="#recovery_target_time"><strong>recovery_target_time</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Recovery target time when forking a service. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="variant"><a href="#variant"><strong>variant</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Variant of the PostgreSQL service, may affect the features that are exposed by default</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="private_access"><a href="#private_access"><strong>private_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_pg"><a href="#private_access_pg"><strong>private_access.pg</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pg with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_pgbouncer"><a href="#private_access_pgbouncer"><strong>private_access.pgbouncer</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pgbouncer with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_prometheus"><a href="#private_access_prometheus"><strong>private_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="privatelink_access"><a href="#privatelink_access"><strong>privatelink_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_pg"><a href="#privatelink_access_pg"><strong>privatelink_access.pg</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable pg</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_pgbouncer"><a href="#privatelink_access_pgbouncer"><strong>privatelink_access.pgbouncer</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable pgbouncer</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_prometheus"><a href="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="public_access"><a href="#public_access"><strong>public_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from the public Internet</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_pg"><a href="#public_access_pg"><strong>public_access.pg</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pg from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_pgbouncer"><a href="#public_access_pgbouncer"><strong>public_access.pgbouncer</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pgbouncer from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_prometheus"><a href="#public_access_prometheus"><strong>public_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pg"><a href="#pg"><strong>pg</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">postgresql.conf configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_freeze_max_age"><a href="#pg_autovacuum_freeze_max_age"><strong>pg.autovacuum_freeze_max_age</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>200000000</code></li><li>max: <code>1500000000</code></li></ul></div>
              <p className="title">autovacuum_freeze_max_age</p>
              <div className="description"><p>Specifies the maximum age (in transactions) that a table's pg_class.relfrozenxid field can attain before a VACUUM operation is forced to prevent transaction ID wraparound within the table. Note that the system will launch autovacuum processes to prevent wraparound even when autovacuum is otherwise disabled. This parameter will cause the server to be restarted.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_max_workers"><a href="#pg_autovacuum_max_workers"><strong>pg.autovacuum_max_workers</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>20</code></li></ul></div>
              <p className="title">autovacuum_max_workers</p>
              <div className="description"><p>Specifies the maximum number of autovacuum processes (other than the autovacuum launcher) that may be running at any one time. The default is three. This parameter can only be set at server start.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_naptime"><a href="#pg_autovacuum_naptime"><strong>pg.autovacuum_naptime</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>86400</code></li></ul></div>
              <p className="title">autovacuum_naptime</p>
              <div className="description"><p>Specifies the minimum delay between autovacuum runs on any given database. The delay is measured in seconds, and the default is one minute</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_vacuum_threshold"><a href="#pg_autovacuum_vacuum_threshold"><strong>pg.autovacuum_vacuum_threshold</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">autovacuum_vacuum_threshold</p>
              <div className="description"><p>Specifies the minimum number of updated or deleted tuples needed to trigger a VACUUM in any one table. The default is 50 tuples</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_analyze_threshold"><a href="#pg_autovacuum_analyze_threshold"><strong>pg.autovacuum_analyze_threshold</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">autovacuum_analyze_threshold</p>
              <div className="description"><p>Specifies the minimum number of inserted, updated or deleted tuples needed to trigger an ANALYZE in any one table. The default is 50 tuples.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_vacuum_scale_factor"><a href="#pg_autovacuum_vacuum_scale_factor"><strong>pg.autovacuum_vacuum_scale_factor</strong></a></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>1</code></li></ul></div>
              <p className="title">autovacuum_vacuum_scale_factor</p>
              <div className="description"><p>Specifies a fraction of the table size to add to autovacuum_vacuum_threshold when deciding whether to trigger a VACUUM. The default is 0.2 (20% of table size)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_analyze_scale_factor"><a href="#pg_autovacuum_analyze_scale_factor"><strong>pg.autovacuum_analyze_scale_factor</strong></a></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>1</code></li></ul></div>
              <p className="title">autovacuum_analyze_scale_factor</p>
              <div className="description"><p>Specifies a fraction of the table size to add to autovacuum_analyze_threshold when deciding whether to trigger an ANALYZE. The default is 0.2 (20% of table size)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_vacuum_cost_delay"><a href="#pg_autovacuum_vacuum_cost_delay"><strong>pg.autovacuum_vacuum_cost_delay</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>100</code></li></ul></div>
              <p className="title">autovacuum_vacuum_cost_delay</p>
              <div className="description"><p>Specifies the cost delay value that will be used in automatic VACUUM operations. If -1 is specified, the regular vacuum_cost_delay value will be used. The default value is 20 milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_autovacuum_vacuum_cost_limit"><a href="#pg_autovacuum_vacuum_cost_limit"><strong>pg.autovacuum_vacuum_cost_limit</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">autovacuum_vacuum_cost_limit</p>
              <div className="description"><p>Specifies the cost limit value that will be used in automatic VACUUM operations. If -1 is specified (which is the default), the regular vacuum_cost_limit value will be used.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_bgwriter_delay"><a href="#pg_bgwriter_delay"><strong>pg.bgwriter_delay</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">bgwriter_delay</p>
              <div className="description"><p>Specifies the delay between activity rounds for the background writer in milliseconds. Default is 200.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_bgwriter_flush_after"><a href="#pg_bgwriter_flush_after"><strong>pg.bgwriter_flush_after</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2048</code></li></ul></div>
              <p className="title">bgwriter_flush_after</p>
              <div className="description"><p>Whenever more than bgwriter_flush_after bytes have been written by the background writer, attempt to force the OS to issue these writes to the underlying storage. Specified in kilobytes, default is 512. Setting of 0 disables forced writeback.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_bgwriter_lru_maxpages"><a href="#pg_bgwriter_lru_maxpages"><strong>pg.bgwriter_lru_maxpages</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>1073741823</code></li></ul></div>
              <p className="title">bgwriter_lru_maxpages</p>
              <div className="description"><p>In each round, no more than this many buffers will be written by the background writer. Setting this to zero disables background writing. Default is 100.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_bgwriter_lru_multiplier"><a href="#pg_bgwriter_lru_multiplier"><strong>pg.bgwriter_lru_multiplier</strong></a></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>10</code></li></ul></div>
              <p className="title">bgwriter_lru_multiplier</p>
              <div className="description"><p>The average recent need for new buffers is multiplied by bgwriter_lru_multiplier to arrive at an estimate of the number that will be needed during the next round, (up to bgwriter_lru_maxpages). 1.0 represents a “just in time” policy of writing exactly the number of buffers predicted to be needed. Larger values provide some cushion against spikes in demand, while smaller values intentionally leave writes to be done by server processes. The default is 2.0.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_deadlock_timeout"><a href="#pg_deadlock_timeout"><strong>pg.deadlock_timeout</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>500</code></li><li>max: <code>1800000</code></li></ul></div>
              <p className="title">deadlock_timeout</p>
              <div className="description"><p>This is the amount of time, in milliseconds, to wait on a lock before checking to see if there is a deadlock condition.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_default_toast_compression"><a href="#pg_default_toast_compression"><strong>pg.default_toast_compression</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">default_toast_compression</p>
              <div className="description"><p>Specifies the default TOAST compression method for values of compressible columns (the default is lz4).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_idle_in_transaction_session_timeout"><a href="#pg_idle_in_transaction_session_timeout"><strong>pg.idle_in_transaction_session_timeout</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>604800000</code></li></ul></div>
              <p className="title">idle_in_transaction_session_timeout</p>
              <div className="description"><p>Time out sessions with open transactions after this number of milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_jit"><a href="#pg_jit"><strong>pg.jit</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">jit</p>
              <div className="description"><p>Controls system-wide use of Just-in-Time Compilation (JIT).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_log_autovacuum_min_duration"><a href="#pg_log_autovacuum_min_duration"><strong>pg.log_autovacuum_min_duration</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">log_autovacuum_min_duration</p>
              <div className="description"><p>Causes each action executed by autovacuum to be logged if it ran for at least the specified number of milliseconds. Setting this to zero logs all autovacuum actions. Minus-one (the default) disables logging autovacuum actions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_log_error_verbosity"><a href="#pg_log_error_verbosity"><strong>pg.log_error_verbosity</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">log_error_verbosity</p>
              <div className="description"><p>Controls the amount of detail written in the server log for each message that is logged.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_log_line_prefix"><a href="#pg_log_line_prefix"><strong>pg.log_line_prefix</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">log_line_prefix</p>
              <div className="description"><p>Choose from one of the available log formats.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_log_min_duration_statement"><a href="#pg_log_min_duration_statement"><strong>pg.log_min_duration_statement</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>86400000</code></li></ul></div>
              <p className="title">log_min_duration_statement</p>
              <div className="description"><p>Log statements that take more than this number of milliseconds to run, -1 disables</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_log_temp_files"><a href="#pg_log_temp_files"><strong>pg.log_temp_files</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">log_temp_files</p>
              <div className="description"><p>Log statements for each temporary file created larger than this number of kilobytes, -1 disables</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_files_per_process"><a href="#pg_max_files_per_process"><strong>pg.max_files_per_process</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>4096</code></li></ul></div>
              <p className="title">max_files_per_process</p>
              <div className="description"><p>PostgreSQL maximum number of files that can be open per process</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_prepared_transactions"><a href="#pg_max_prepared_transactions"><strong>pg.max_prepared_transactions</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p className="title">max_prepared_transactions</p>
              <div className="description"><p>PostgreSQL maximum prepared transactions</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_pred_locks_per_transaction"><a href="#pg_max_pred_locks_per_transaction"><strong>pg.max_pred_locks_per_transaction</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>64</code></li><li>max: <code>5120</code></li></ul></div>
              <p className="title">max_pred_locks_per_transaction</p>
              <div className="description"><p>PostgreSQL maximum predicate locks per transaction</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_locks_per_transaction"><a href="#pg_max_locks_per_transaction"><strong>pg.max_locks_per_transaction</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>64</code></li><li>max: <code>6400</code></li></ul></div>
              <p className="title">max_locks_per_transaction</p>
              <div className="description"><p>PostgreSQL maximum locks per transaction</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_slot_wal_keep_size"><a href="#pg_max_slot_wal_keep_size"><strong>pg.max_slot_wal_keep_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">max_slot_wal_keep_size</p>
              <div className="description"><p>PostgreSQL maximum WAL size (MB) reserved for replication slots. Default is -1 (unlimited). wal_keep_size minimum WAL size setting takes precedence over this.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_stack_depth"><a href="#pg_max_stack_depth"><strong>pg.max_stack_depth</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>2097152</code></li><li>max: <code>6291456</code></li></ul></div>
              <p className="title">max_stack_depth</p>
              <div className="description"><p>Maximum depth of the stack in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_standby_archive_delay"><a href="#pg_max_standby_archive_delay"><strong>pg.max_standby_archive_delay</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>43200000</code></li></ul></div>
              <p className="title">max_standby_archive_delay</p>
              <div className="description"><p>Max standby archive delay in milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_standby_streaming_delay"><a href="#pg_max_standby_streaming_delay"><strong>pg.max_standby_streaming_delay</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>43200000</code></li></ul></div>
              <p className="title">max_standby_streaming_delay</p>
              <div className="description"><p>Max standby streaming delay in milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_replication_slots"><a href="#pg_max_replication_slots"><strong>pg.max_replication_slots</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>8</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">max_replication_slots</p>
              <div className="description"><p>PostgreSQL maximum replication slots</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_logical_replication_workers"><a href="#pg_max_logical_replication_workers"><strong>pg.max_logical_replication_workers</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>4</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">max_logical_replication_workers</p>
              <div className="description"><p>PostgreSQL maximum logical replication workers (taken from the pool of max_parallel_workers)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_parallel_workers"><a href="#pg_max_parallel_workers"><strong>pg.max_parallel_workers</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>96</code></li></ul></div>
              <p className="title">max_parallel_workers</p>
              <div className="description"><p>Sets the maximum number of workers that the system can support for parallel queries</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_parallel_workers_per_gather"><a href="#pg_max_parallel_workers_per_gather"><strong>pg.max_parallel_workers_per_gather</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>96</code></li></ul></div>
              <p className="title">max_parallel_workers_per_gather</p>
              <div className="description"><p>Sets the maximum number of workers that can be started by a single Gather or Gather Merge node</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_worker_processes"><a href="#pg_max_worker_processes"><strong>pg.max_worker_processes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>8</code></li><li>max: <code>96</code></li></ul></div>
              <p className="title">max_worker_processes</p>
              <div className="description"><p>Sets the maximum number of background processes that the system can support</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_pg_partman_bgw.role"><a href="#pg_pg_partman_bgw.role"><strong>pg.pg_partman_bgw.role</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">pg_partman_bgw.role</p>
              <div className="description"><p>Controls which role to use for pg_partman's scheduled background tasks.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_pg_partman_bgw.interval"><a href="#pg_pg_partman_bgw.interval"><strong>pg.pg_partman_bgw.interval</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>3600</code></li><li>max: <code>604800</code></li></ul></div>
              <p className="title">pg_partman_bgw.interval</p>
              <div className="description"><p>Sets the time interval to run pg_partman's scheduled tasks</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_pg_stat_monitor.pgsm_max_buckets"><a href="#pg_pg_stat_monitor.pgsm_max_buckets"><strong>pg.pg_stat_monitor.pgsm_max_buckets</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>10</code></li></ul></div>
              <p className="title">pg_stat_monitor.pgsm_max_buckets</p>
              <div className="description"><p>Sets the maximum number of buckets </p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_pg_stat_monitor.pgsm_enable_query_plan"><a href="#pg_pg_stat_monitor.pgsm_enable_query_plan"><strong>pg.pg_stat_monitor.pgsm_enable_query_plan</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">pg_stat_monitor.pgsm_enable_query_plan</p>
              <div className="description"><p>Enables or disables query plan monitoring</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_pg_stat_statements.track"><a href="#pg_pg_stat_statements.track"><strong>pg.pg_stat_statements.track</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">pg_stat_statements.track</p>
              <div className="description"><p>Controls which statements are counted. Specify top to track top-level statements (those issued directly by clients), all to also track nested statements (such as statements invoked within functions), or none to disable statement statistics collection. The default value is top.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_temp_file_limit"><a href="#pg_temp_file_limit"><strong>pg.temp_file_limit</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">temp_file_limit</p>
              <div className="description"><p>PostgreSQL temporary file limit in KiB, -1 for unlimited</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_timezone"><a href="#pg_timezone"><strong>pg.timezone</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">timezone</p>
              <div className="description"><p>PostgreSQL service timezone</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_track_activity_query_size"><a href="#pg_track_activity_query_size"><strong>pg.track_activity_query_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>10240</code></li></ul></div>
              <p className="title">track_activity_query_size</p>
              <div className="description"><p>Specifies the number of bytes reserved to track the currently executing command for each active session.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_track_commit_timestamp"><a href="#pg_track_commit_timestamp"><strong>pg.track_commit_timestamp</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">track_commit_timestamp</p>
              <div className="description"><p>Record commit time of transactions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_track_functions"><a href="#pg_track_functions"><strong>pg.track_functions</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">track_functions</p>
              <div className="description"><p>Enables tracking of function call counts and time used.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_track_io_timing"><a href="#pg_track_io_timing"><strong>pg.track_io_timing</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">track_io_timing</p>
              <div className="description"><p>Enables timing of database I/O calls. This parameter is off by default, because it will repeatedly query the operating system for the current time, which may cause significant overhead on some platforms.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_max_wal_senders"><a href="#pg_max_wal_senders"><strong>pg.max_wal_senders</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>20</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">max_wal_senders</p>
              <div className="description"><p>PostgreSQL maximum WAL senders</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_wal_sender_timeout"><a href="#pg_wal_sender_timeout"><strong>pg.wal_sender_timeout</strong></a></p><p><code className="type">integer</code></p></div>
              <p className="title">wal_sender_timeout</p>
              <div className="description"><p>Terminate replication connections that are inactive for longer than this amount of time, in milliseconds. Setting this value to zero disables the timeout.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="pg_wal_writer_delay"><a href="#pg_wal_writer_delay"><strong>pg.wal_writer_delay</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>200</code></li></ul></div>
              <p className="title">wal_writer_delay</p>
              <div className="description"><p>WAL flush interval in milliseconds. Note that setting this value to lower than the default 200ms may negatively impact performance</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="shared_buffers_percentage"><a href="#shared_buffers_percentage"><strong>shared_buffers_percentage</strong></a></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>min: <code>20</code></li><li>max: <code>60</code></li></ul></div>
        <p className="title">shared_buffers_percentage</p>
        <div className="description"><p>Percentage of total RAM that the database server uses for shared memory buffers. Valid range is 20-60 (float), which corresponds to 20% - 60%. This setting adjusts the shared_buffers configuration value.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="timescaledb"><a href="#timescaledb"><strong>timescaledb</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">TimescaleDB extension configuration values</p>
        <div className="description"><p>System-wide settings for the timescaledb extension</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="timescaledb_max_background_workers"><a href="#timescaledb_max_background_workers"><strong>timescaledb.max_background_workers</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>4096</code></li><li>default: <code>16</code></li></ul></div>
              <p className="title">timescaledb.max_background_workers</p>
              <div className="description"><p>The number of background workers for timescaledb operations. You should configure this setting to the sum of your number of databases and the total number of concurrent background workers you want running at any given point in time.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="work_mem"><a href="#work_mem"><strong>work_mem</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
        <p className="title">work_mem</p>
        <div className="description"><p>Sets the maximum amount of memory to be used by a query operation (such as a sort or hash table) before writing to temporary disk files, in MB. Default is 1MB + 0.075% of total RAM (up to 32MB).</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    