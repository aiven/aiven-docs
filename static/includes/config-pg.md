
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
        <div className="param"><p className="name"><Link id="enable_ipv6"/><Link to="#enable_ipv6"><strong>enable_ipv6</strong></Link></p><p><code className="type">boolean</code></p></div>
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
        <div className="param"><p className="name"><Link id="pglookout"/><Link to="#pglookout"><strong>pglookout</strong></Link></p><p><code className="type">object</code></p></div><div className="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p className="title">PGLookout settings</p>
        <div className="description"><p>System-wide settings for pglookout.</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pglookout_max_failover_replication_time_lag"/><Link to="#pglookout_max_failover_replication_time_lag"><strong>pglookout.max_failover_replication_time_lag</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>60</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="pg_service_to_fork_from"/><Link to="#pg_service_to_fork_from"><strong>pg_service_to_fork_from</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of the PG Service from which to fork (deprecated, use service_to_fork_from). This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
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
        <div className="param"><p className="name"><Link id="synchronous_replication"/><Link to="#synchronous_replication"><strong>synchronous_replication</strong></Link></p><p><code className="type">string</code></p></div>
        <p className="title">Synchronous replication type. Note that the service plan also needs to support synchronous replication.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="pg_read_replica"/><Link to="#pg_read_replica"><strong>pg_read_replica</strong></Link></p><p><code className="type">boolean,null</code></p></div>
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
        <div className="param"><p className="name"><Link id="pg_stat_monitor_enable"/><Link to="#pg_stat_monitor_enable"><strong>pg_stat_monitor_enable</strong></Link></p><p><code className="type">boolean</code></p></div>
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
        <div className="param"><p className="name"><Link id="pg_version"/><Link to="#pg_version"><strong>pg_version</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">PostgreSQL major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="pgbouncer"/><Link to="#pgbouncer"><strong>pgbouncer</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">PGBouncer connection pooling settings</p>
        <div className="description"><p>System-wide settings for pgbouncer.</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_server_reset_query_always"/><Link to="#pgbouncer_server_reset_query_always"><strong>pgbouncer.server_reset_query_always</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Run server_reset_query (DISCARD ALL) in all pooling modes</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_ignore_startup_parameters"/><Link to="#pgbouncer_ignore_startup_parameters"><strong>pgbouncer.ignore_startup_parameters</strong></Link></p><p><code className="type">array</code></p></div>
              <p className="title">List of parameters to ignore when given in startup packet</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_min_pool_size"/><Link to="#pgbouncer_min_pool_size"><strong>pgbouncer.min_pool_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p className="title">Add more server connections to pool if below this number. Improves behavior when usual load comes suddenly back after period of total inactivity. The value is effectively capped at the pool size.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_server_lifetime"/><Link to="#pgbouncer_server_lifetime"><strong>pgbouncer.server_lifetime</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>60</code></li><li>max: <code>86400</code></li><li>default: <code>3600</code></li></ul></div>
              <p className="title">The pooler will close an unused server connection that has been connected longer than this. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_server_idle_timeout"/><Link to="#pgbouncer_server_idle_timeout"><strong>pgbouncer.server_idle_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>86400</code></li><li>default: <code>600</code></li></ul></div>
              <p className="title">If a server connection has been idle more than this many seconds it will be dropped. If 0 then timeout is disabled. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_autodb_pool_size"/><Link to="#pgbouncer_autodb_pool_size"><strong>pgbouncer.autodb_pool_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p className="title">If non-zero then create automatically a pool of that size per user when a pool doesn't exist.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_autodb_pool_mode"/><Link to="#pgbouncer_autodb_pool_mode"><strong>pgbouncer.autodb_pool_mode</strong></Link></p><p><code className="type">string</code></p></div><div className="constraints"><ul><li>default: <code>transaction</code></li></ul></div>
              <p className="title">PGBouncer pool mode</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_autodb_max_db_connections"/><Link to="#pgbouncer_autodb_max_db_connections"><strong>pgbouncer.autodb_max_db_connections</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">Do not allow more than this many server connections per database (regardless of user). Setting it to 0 means unlimited.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_autodb_idle_timeout"/><Link to="#pgbouncer_autodb_idle_timeout"><strong>pgbouncer.autodb_idle_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>86400</code></li><li>default: <code>3600</code></li></ul></div>
              <p className="title">If the automatically created database pools have been unused this many seconds, they are freed. If 0 then timeout is disabled. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pgbouncer_max_prepared_statements"/><Link to="#pgbouncer_max_prepared_statements"><strong>pgbouncer.max_prepared_statements</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>3000</code></li><li>default: <code>100</code></li></ul></div>
              <p className="title">PgBouncer tracks protocol-level named prepared statements related commands sent by the client in transaction and statement pooling modes when max_prepared_statements is set to a non-zero value. Setting it to 0 disables prepared statements. max_prepared_statements defaults to 100, and its maximum is 3000.</p>
              
            </td>
          </tr>
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
        <div className="param"><p className="name"><Link id="variant"/><Link to="#variant"><strong>variant</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Variant of the PostgreSQL service, may affect the features that are exposed by default</p>
        
        <table className="service-param-children">
          <tbody>
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
              <div className="param"><p className="name"><Link id="private_access_pg"/><Link to="#private_access_pg"><strong>private_access.pg</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pg with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_pgbouncer"/><Link to="#private_access_pgbouncer"><strong>private_access.pgbouncer</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pgbouncer with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name"><Link id="privatelink_access_pg"/><Link to="#privatelink_access_pg"><strong>privatelink_access.pg</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable pg</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_pgbouncer"/><Link to="#privatelink_access_pgbouncer"><strong>privatelink_access.pgbouncer</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable pgbouncer</p>
              
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
              <div className="param"><p className="name"><Link id="public_access_pg"/><Link to="#public_access_pg"><strong>public_access.pg</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pg from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_pgbouncer"/><Link to="#public_access_pgbouncer"><strong>public_access.pgbouncer</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to pgbouncer from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
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
        <div className="param"><p className="name"><Link id="pg"/><Link to="#pg"><strong>pg</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">postgresql.conf configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_freeze_max_age"/><Link to="#pg_autovacuum_freeze_max_age"><strong>pg.autovacuum_freeze_max_age</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>200000000</code></li><li>max: <code>1500000000</code></li></ul></div>
              <p className="title">autovacuum_freeze_max_age</p>
              <div className="description"><p>Specifies the maximum age (in transactions) that a table's pg_class.relfrozenxid field can attain before a VACUUM operation is forced to prevent transaction ID wraparound within the table. Note that the system will launch autovacuum processes to prevent wraparound even when autovacuum is otherwise disabled. This parameter will cause the server to be restarted.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_max_workers"/><Link to="#pg_autovacuum_max_workers"><strong>pg.autovacuum_max_workers</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>20</code></li></ul></div>
              <p className="title">autovacuum_max_workers</p>
              <div className="description"><p>Specifies the maximum number of autovacuum processes (other than the autovacuum launcher) that may be running at any one time. The default is three. This parameter can only be set at server start.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_naptime"/><Link to="#pg_autovacuum_naptime"><strong>pg.autovacuum_naptime</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>86400</code></li></ul></div>
              <p className="title">autovacuum_naptime</p>
              <div className="description"><p>Specifies the minimum delay between autovacuum runs on any given database. The delay is measured in seconds, and the default is one minute</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_vacuum_threshold"/><Link to="#pg_autovacuum_vacuum_threshold"><strong>pg.autovacuum_vacuum_threshold</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">autovacuum_vacuum_threshold</p>
              <div className="description"><p>Specifies the minimum number of updated or deleted tuples needed to trigger a VACUUM in any one table. The default is 50 tuples</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_analyze_threshold"/><Link to="#pg_autovacuum_analyze_threshold"><strong>pg.autovacuum_analyze_threshold</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">autovacuum_analyze_threshold</p>
              <div className="description"><p>Specifies the minimum number of inserted, updated or deleted tuples needed to trigger an ANALYZE in any one table. The default is 50 tuples.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_vacuum_scale_factor"/><Link to="#pg_autovacuum_vacuum_scale_factor"><strong>pg.autovacuum_vacuum_scale_factor</strong></Link></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>1</code></li></ul></div>
              <p className="title">autovacuum_vacuum_scale_factor</p>
              <div className="description"><p>Specifies a fraction of the table size to add to autovacuum_vacuum_threshold when deciding whether to trigger a VACUUM. The default is 0.2 (20% of table size)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_analyze_scale_factor"/><Link to="#pg_autovacuum_analyze_scale_factor"><strong>pg.autovacuum_analyze_scale_factor</strong></Link></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>1</code></li></ul></div>
              <p className="title">autovacuum_analyze_scale_factor</p>
              <div className="description"><p>Specifies a fraction of the table size to add to autovacuum_analyze_threshold when deciding whether to trigger an ANALYZE. The default is 0.2 (20% of table size)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_vacuum_cost_delay"/><Link to="#pg_autovacuum_vacuum_cost_delay"><strong>pg.autovacuum_vacuum_cost_delay</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>100</code></li></ul></div>
              <p className="title">autovacuum_vacuum_cost_delay</p>
              <div className="description"><p>Specifies the cost delay value that will be used in automatic VACUUM operations. If -1 is specified, the regular vacuum_cost_delay value will be used. The default value is 20 milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_autovacuum_vacuum_cost_limit"/><Link to="#pg_autovacuum_vacuum_cost_limit"><strong>pg.autovacuum_vacuum_cost_limit</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">autovacuum_vacuum_cost_limit</p>
              <div className="description"><p>Specifies the cost limit value that will be used in automatic VACUUM operations. If -1 is specified (which is the default), the regular vacuum_cost_limit value will be used.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_bgwriter_delay"/><Link to="#pg_bgwriter_delay"><strong>pg.bgwriter_delay</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">bgwriter_delay</p>
              <div className="description"><p>Specifies the delay between activity rounds for the background writer in milliseconds. Default is 200.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_bgwriter_flush_after"/><Link to="#pg_bgwriter_flush_after"><strong>pg.bgwriter_flush_after</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2048</code></li></ul></div>
              <p className="title">bgwriter_flush_after</p>
              <div className="description"><p>Whenever more than bgwriter_flush_after bytes have been written by the background writer, attempt to force the OS to issue these writes to the underlying storage. Specified in kilobytes, default is 512. Setting of 0 disables forced writeback.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_bgwriter_lru_maxpages"/><Link to="#pg_bgwriter_lru_maxpages"><strong>pg.bgwriter_lru_maxpages</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>1073741823</code></li></ul></div>
              <p className="title">bgwriter_lru_maxpages</p>
              <div className="description"><p>In each round, no more than this many buffers will be written by the background writer. Setting this to zero disables background writing. Default is 100.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_bgwriter_lru_multiplier"/><Link to="#pg_bgwriter_lru_multiplier"><strong>pg.bgwriter_lru_multiplier</strong></Link></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>max: <code>10</code></li></ul></div>
              <p className="title">bgwriter_lru_multiplier</p>
              <div className="description"><p>The average recent need for new buffers is multiplied by bgwriter_lru_multiplier to arrive at an estimate of the number that will be needed during the next round, (up to bgwriter_lru_maxpages). 1.0 represents a “just in time” policy of writing exactly the number of buffers predicted to be needed. Larger values provide some cushion against spikes in demand, while smaller values intentionally leave writes to be done by server processes. The default is 2.0.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_deadlock_timeout"/><Link to="#pg_deadlock_timeout"><strong>pg.deadlock_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>500</code></li><li>max: <code>1800000</code></li></ul></div>
              <p className="title">deadlock_timeout</p>
              <div className="description"><p>This is the amount of time, in milliseconds, to wait on a lock before checking to see if there is a deadlock condition.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_password_encryption"/><Link to="#pg_password_encryption"><strong>pg.password_encryption</strong></Link></p><p><code className="type">string,null</code></p></div><div className="constraints"><ul><li>default: <code>md5</code></li></ul></div>
              <p className="title">password_encryption</p>
              <div className="description"><p>Chooses the algorithm for encrypting passwords.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_default_toast_compression"/><Link to="#pg_default_toast_compression"><strong>pg.default_toast_compression</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">default_toast_compression</p>
              <div className="description"><p>Specifies the default TOAST compression method for values of compressible columns (the default is lz4).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_idle_in_transaction_session_timeout"/><Link to="#pg_idle_in_transaction_session_timeout"><strong>pg.idle_in_transaction_session_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>604800000</code></li></ul></div>
              <p className="title">idle_in_transaction_session_timeout</p>
              <div className="description"><p>Time out sessions with open transactions after this number of milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_jit"/><Link to="#pg_jit"><strong>pg.jit</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">jit</p>
              <div className="description"><p>Controls system-wide use of Just-in-Time Compilation (JIT).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_log_autovacuum_min_duration"/><Link to="#pg_log_autovacuum_min_duration"><strong>pg.log_autovacuum_min_duration</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">log_autovacuum_min_duration</p>
              <div className="description"><p>Causes each action executed by autovacuum to be logged if it ran for at least the specified number of milliseconds. Setting this to zero logs all autovacuum actions. Minus-one (the default) disables logging autovacuum actions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_log_error_verbosity"/><Link to="#pg_log_error_verbosity"><strong>pg.log_error_verbosity</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">log_error_verbosity</p>
              <div className="description"><p>Controls the amount of detail written in the server log for each message that is logged.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_log_line_prefix"/><Link to="#pg_log_line_prefix"><strong>pg.log_line_prefix</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">log_line_prefix</p>
              <div className="description"><p>Choose from one of the available log formats.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_log_min_duration_statement"/><Link to="#pg_log_min_duration_statement"><strong>pg.log_min_duration_statement</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>86400000</code></li></ul></div>
              <p className="title">log_min_duration_statement</p>
              <div className="description"><p>Log statements that take more than this number of milliseconds to run, -1 disables</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_log_temp_files"/><Link to="#pg_log_temp_files"><strong>pg.log_temp_files</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">log_temp_files</p>
              <div className="description"><p>Log statements for each temporary file created larger than this number of kilobytes, -1 disables</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_files_per_process"/><Link to="#pg_max_files_per_process"><strong>pg.max_files_per_process</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>4096</code></li></ul></div>
              <p className="title">max_files_per_process</p>
              <div className="description"><p>PostgreSQL maximum number of files that can be open per process</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_prepared_transactions"/><Link to="#pg_max_prepared_transactions"><strong>pg.max_prepared_transactions</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p className="title">max_prepared_transactions</p>
              <div className="description"><p>PostgreSQL maximum prepared transactions</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_pred_locks_per_transaction"/><Link to="#pg_max_pred_locks_per_transaction"><strong>pg.max_pred_locks_per_transaction</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>64</code></li><li>max: <code>5120</code></li></ul></div>
              <p className="title">max_pred_locks_per_transaction</p>
              <div className="description"><p>PostgreSQL maximum predicate locks per transaction</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_locks_per_transaction"/><Link to="#pg_max_locks_per_transaction"><strong>pg.max_locks_per_transaction</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>64</code></li><li>max: <code>6400</code></li></ul></div>
              <p className="title">max_locks_per_transaction</p>
              <div className="description"><p>PostgreSQL maximum locks per transaction</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_slot_wal_keep_size"/><Link to="#pg_max_slot_wal_keep_size"><strong>pg.max_slot_wal_keep_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">max_slot_wal_keep_size</p>
              <div className="description"><p>PostgreSQL maximum WAL size (MB) reserved for replication slots. Default is -1 (unlimited). wal_keep_size minimum WAL size setting takes precedence over this.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_stack_depth"/><Link to="#pg_max_stack_depth"><strong>pg.max_stack_depth</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>2097152</code></li><li>max: <code>6291456</code></li></ul></div>
              <p className="title">max_stack_depth</p>
              <div className="description"><p>Maximum depth of the stack in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_standby_archive_delay"/><Link to="#pg_max_standby_archive_delay"><strong>pg.max_standby_archive_delay</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>43200000</code></li></ul></div>
              <p className="title">max_standby_archive_delay</p>
              <div className="description"><p>Max standby archive delay in milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_standby_streaming_delay"/><Link to="#pg_max_standby_streaming_delay"><strong>pg.max_standby_streaming_delay</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>43200000</code></li></ul></div>
              <p className="title">max_standby_streaming_delay</p>
              <div className="description"><p>Max standby streaming delay in milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_replication_slots"/><Link to="#pg_max_replication_slots"><strong>pg.max_replication_slots</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>8</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">max_replication_slots</p>
              <div className="description"><p>PostgreSQL maximum replication slots</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_logical_replication_workers"/><Link to="#pg_max_logical_replication_workers"><strong>pg.max_logical_replication_workers</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>4</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">max_logical_replication_workers</p>
              <div className="description"><p>PostgreSQL maximum logical replication workers (taken from the pool of max_parallel_workers)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_parallel_workers"/><Link to="#pg_max_parallel_workers"><strong>pg.max_parallel_workers</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>96</code></li></ul></div>
              <p className="title">max_parallel_workers</p>
              <div className="description"><p>Sets the maximum number of workers that the system can support for parallel queries</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_parallel_workers_per_gather"/><Link to="#pg_max_parallel_workers_per_gather"><strong>pg.max_parallel_workers_per_gather</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>96</code></li></ul></div>
              <p className="title">max_parallel_workers_per_gather</p>
              <div className="description"><p>Sets the maximum number of workers that can be started by a single Gather or Gather Merge node</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_worker_processes"/><Link to="#pg_max_worker_processes"><strong>pg.max_worker_processes</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>8</code></li><li>max: <code>96</code></li></ul></div>
              <p className="title">max_worker_processes</p>
              <div className="description"><p>Sets the maximum number of background processes that the system can support</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_pg_partman_bgw.role"/><Link to="#pg_pg_partman_bgw.role"><strong>pg.pg_partman_bgw.role</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">pg_partman_bgw.role</p>
              <div className="description"><p>Controls which role to use for pg_partman's scheduled background tasks.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_pg_partman_bgw.interval"/><Link to="#pg_pg_partman_bgw.interval"><strong>pg.pg_partman_bgw.interval</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>3600</code></li><li>max: <code>604800</code></li></ul></div>
              <p className="title">pg_partman_bgw.interval</p>
              <div className="description"><p>Sets the time interval to run pg_partman's scheduled tasks</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_pg_stat_monitor.pgsm_max_buckets"/><Link to="#pg_pg_stat_monitor.pgsm_max_buckets"><strong>pg.pg_stat_monitor.pgsm_max_buckets</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>10</code></li></ul></div>
              <p className="title">pg_stat_monitor.pgsm_max_buckets</p>
              <div className="description"><p>Sets the maximum number of buckets </p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_pg_stat_monitor.pgsm_enable_query_plan"/><Link to="#pg_pg_stat_monitor.pgsm_enable_query_plan"><strong>pg.pg_stat_monitor.pgsm_enable_query_plan</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">pg_stat_monitor.pgsm_enable_query_plan</p>
              <div className="description"><p>Enables or disables query plan monitoring</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_pg_stat_statements.track"/><Link to="#pg_pg_stat_statements.track"><strong>pg.pg_stat_statements.track</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">pg_stat_statements.track</p>
              <div className="description"><p>Controls which statements are counted. Specify top to track top-level statements (those issued directly by clients), all to also track nested statements (such as statements invoked within functions), or none to disable statement statistics collection. The default value is top.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_temp_file_limit"/><Link to="#pg_temp_file_limit"><strong>pg.temp_file_limit</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">temp_file_limit</p>
              <div className="description"><p>PostgreSQL temporary file limit in KiB, -1 for unlimited</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_timezone"/><Link to="#pg_timezone"><strong>pg.timezone</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">timezone</p>
              <div className="description"><p>PostgreSQL service timezone</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_track_activity_query_size"/><Link to="#pg_track_activity_query_size"><strong>pg.track_activity_query_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>10240</code></li></ul></div>
              <p className="title">track_activity_query_size</p>
              <div className="description"><p>Specifies the number of bytes reserved to track the currently executing command for each active session.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_track_commit_timestamp"/><Link to="#pg_track_commit_timestamp"><strong>pg.track_commit_timestamp</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">track_commit_timestamp</p>
              <div className="description"><p>Record commit time of transactions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_track_functions"/><Link to="#pg_track_functions"><strong>pg.track_functions</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">track_functions</p>
              <div className="description"><p>Enables tracking of function call counts and time used.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_track_io_timing"/><Link to="#pg_track_io_timing"><strong>pg.track_io_timing</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">track_io_timing</p>
              <div className="description"><p>Enables timing of database I/O calls. This parameter is off by default, because it will repeatedly query the operating system for the current time, which may cause significant overhead on some platforms.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_max_wal_senders"/><Link to="#pg_max_wal_senders"><strong>pg.max_wal_senders</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>20</code></li><li>max: <code>64</code></li></ul></div>
              <p className="title">max_wal_senders</p>
              <div className="description"><p>PostgreSQL maximum WAL senders</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_wal_sender_timeout"/><Link to="#pg_wal_sender_timeout"><strong>pg.wal_sender_timeout</strong></Link></p><p><code className="type">integer</code></p></div>
              <p className="title">wal_sender_timeout</p>
              <div className="description"><p>Terminate replication connections that are inactive for longer than this amount of time, in milliseconds. Setting this value to zero disables the timeout.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="pg_wal_writer_delay"/><Link to="#pg_wal_writer_delay"><strong>pg.wal_writer_delay</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>200</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="shared_buffers_percentage"/><Link to="#shared_buffers_percentage"><strong>shared_buffers_percentage</strong></Link></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>min: <code>20</code></li><li>max: <code>60</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="timescaledb"/><Link to="#timescaledb"><strong>timescaledb</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">TimescaleDB extension configuration values</p>
        <div className="description"><p>System-wide settings for the timescaledb extension</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="timescaledb_max_background_workers"/><Link to="#timescaledb_max_background_workers"><strong>timescaledb.max_background_workers</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>4096</code></li><li>default: <code>16</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="work_mem"/><Link to="#work_mem"><strong>work_mem</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
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
    