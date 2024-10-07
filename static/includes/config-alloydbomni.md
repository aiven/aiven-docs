
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
        <div class="param"><p class="name"><strong>enable_ipv6</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable IPv6</p>
        <div class="description"><p>Register AAAA DNS records for the service, and allow IPv6 packets to service ports</p></div>
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
        <div class="param"><p class="name"><strong>pglookout</strong></p><p><code class="type">object</code></p></div><div class="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p class="title">PGLookout settings</p>
        <div class="description"><p>System-wide settings for pglookout.</p></div>
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pglookout.max_failover_replication_time_lag</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>60</code></li></ul></div>
              <p class="title">max_failover_replication_time_lag</p>
              <div class="description"><p>Number of seconds of master unavailability before triggering database failover to standby</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>pg_service_to_fork_from</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Name of the PG Service from which to fork (deprecated, use service_to_fork_from). This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
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
        <div class="param"><p class="name"><strong>synchronous_replication</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Synchronous replication type. Note that the service plan also needs to support synchronous replication.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>pg_read_replica</strong></p><p><code class="type">boolean,null</code></p></div>
        <p class="title">Should the service which is being forked be a read replica (deprecated, use read_replica service integration instead).</p>
        <div class="description"><p>This setting is deprecated. Use read_replica service integration instead.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>alloydbomni_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">PostgreSQL major version</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>pg_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">PostgreSQL major version</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>pgbouncer</strong></p><p><code class="type">object</code></p></div>
        <p class="title">PGBouncer connection pooling settings</p>
        <div class="description"><p>System-wide settings for pgbouncer.</p></div>
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.server_reset_query_always</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Run server_reset_query (DISCARD ALL) in all pooling modes</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.ignore_startup_parameters</strong></p><p><code class="type">array</code></p></div>
              <p class="title">List of parameters to ignore when given in startup packet</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.min_pool_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p class="title">Add more server connections to pool if below this number. Improves behavior when usual load comes suddenly back after period of total inactivity. The value is effectively capped at the pool size.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.server_lifetime</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>60</code></li><li>max: <code>86400</code></li><li>default: <code>3600</code></li></ul></div>
              <p class="title">The pooler will close an unused server connection that has been connected longer than this. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.server_idle_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>86400</code></li><li>default: <code>600</code></li></ul></div>
              <p class="title">If a server connection has been idle more than this many seconds it will be dropped. If 0 then timeout is disabled. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.autodb_pool_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p class="title">If non-zero then create automatically a pool of that size per user when a pool doesn't exist.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.autodb_pool_mode</strong></p><p><code class="type">string</code></p></div><div class="constraints"><ul><li>default: <code>transaction</code></li></ul></div>
              <p class="title">PGBouncer pool mode</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.autodb_max_db_connections</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">Do not allow more than this many server connections per database (regardless of user). Setting it to 0 means unlimited.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.autodb_idle_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>86400</code></li><li>default: <code>3600</code></li></ul></div>
              <p class="title">If the automatically created database pools have been unused this many seconds, they are freed. If 0 then timeout is disabled. [seconds]</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pgbouncer.max_prepared_statements</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>3000</code></li><li>default: <code>100</code></li></ul></div>
              <p class="title">PgBouncer tracks protocol-level named prepared statements related commands sent by the client in transaction and statement pooling modes when max_prepared_statements is set to a non-zero value. Setting it to 0 disables prepared statements. max_prepared_statements defaults to 100, and its maximum is 3000.</p>
              
            </td>
          </tr>
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
        <div class="param"><p class="name"><strong>variant</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Variant of the PostgreSQL service, may affect the features that are exposed by default</p>
        
        <table class="service-param-children">
          <tbody>
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
              <div class="param"><p class="name"><strong>private_access.pg</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to pg with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>private_access.pgbouncer</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to pgbouncer with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div class="param"><p class="name"><strong>privatelink_access.pg</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable pg</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.pgbouncer</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable pgbouncer</p>
              
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
              <div class="param"><p class="name"><strong>public_access.pg</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to pg from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.pgbouncer</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to pgbouncer from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
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
        <div class="param"><p class="name"><strong>pg</strong></p><p><code class="type">object</code></p></div>
        <p class="title">postgresql.conf configuration values</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_freeze_max_age</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>200000000</code></li><li>max: <code>1500000000</code></li></ul></div>
              <p class="title">autovacuum_freeze_max_age</p>
              <div class="description"><p>Specifies the maximum age (in transactions) that a table's pg_class.relfrozenxid field can attain before a VACUUM operation is forced to prevent transaction ID wraparound within the table. Note that the system will launch autovacuum processes to prevent wraparound even when autovacuum is otherwise disabled. This parameter will cause the server to be restarted.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_max_workers</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>20</code></li></ul></div>
              <p class="title">autovacuum_max_workers</p>
              <div class="description"><p>Specifies the maximum number of autovacuum processes (other than the autovacuum launcher) that may be running at any one time. The default is three. This parameter can only be set at server start.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_naptime</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>86400</code></li></ul></div>
              <p class="title">autovacuum_naptime</p>
              <div class="description"><p>Specifies the minimum delay between autovacuum runs on any given database. The delay is measured in seconds, and the default is one minute</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_vacuum_threshold</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">autovacuum_vacuum_threshold</p>
              <div class="description"><p>Specifies the minimum number of updated or deleted tuples needed to trigger a VACUUM in any one table. The default is 50 tuples</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_analyze_threshold</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">autovacuum_analyze_threshold</p>
              <div class="description"><p>Specifies the minimum number of inserted, updated or deleted tuples needed to trigger an ANALYZE in any one table. The default is 50 tuples.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_vacuum_scale_factor</strong></p><p><code class="type">number</code></p></div><div class="constraints"><ul><li>max: <code>1</code></li></ul></div>
              <p class="title">autovacuum_vacuum_scale_factor</p>
              <div class="description"><p>Specifies a fraction of the table size to add to autovacuum_vacuum_threshold when deciding whether to trigger a VACUUM. The default is 0.2 (20% of table size)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_analyze_scale_factor</strong></p><p><code class="type">number</code></p></div><div class="constraints"><ul><li>max: <code>1</code></li></ul></div>
              <p class="title">autovacuum_analyze_scale_factor</p>
              <div class="description"><p>Specifies a fraction of the table size to add to autovacuum_analyze_threshold when deciding whether to trigger an ANALYZE. The default is 0.2 (20% of table size)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_vacuum_cost_delay</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>100</code></li></ul></div>
              <p class="title">autovacuum_vacuum_cost_delay</p>
              <div class="description"><p>Specifies the cost delay value that will be used in automatic VACUUM operations. If -1 is specified, the regular vacuum_cost_delay value will be used. The default value is 20 milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.autovacuum_vacuum_cost_limit</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>10000</code></li></ul></div>
              <p class="title">autovacuum_vacuum_cost_limit</p>
              <div class="description"><p>Specifies the cost limit value that will be used in automatic VACUUM operations. If -1 is specified (which is the default), the regular vacuum_cost_limit value will be used.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.bgwriter_delay</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>10000</code></li></ul></div>
              <p class="title">bgwriter_delay</p>
              <div class="description"><p>Specifies the delay between activity rounds for the background writer in milliseconds. Default is 200.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.bgwriter_flush_after</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>2048</code></li></ul></div>
              <p class="title">bgwriter_flush_after</p>
              <div class="description"><p>Whenever more than bgwriter_flush_after bytes have been written by the background writer, attempt to force the OS to issue these writes to the underlying storage. Specified in kilobytes, default is 512. Setting of 0 disables forced writeback.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.bgwriter_lru_maxpages</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>1073741823</code></li></ul></div>
              <p class="title">bgwriter_lru_maxpages</p>
              <div class="description"><p>In each round, no more than this many buffers will be written by the background writer. Setting this to zero disables background writing. Default is 100.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.bgwriter_lru_multiplier</strong></p><p><code class="type">number</code></p></div><div class="constraints"><ul><li>max: <code>10</code></li></ul></div>
              <p class="title">bgwriter_lru_multiplier</p>
              <div class="description"><p>The average recent need for new buffers is multiplied by bgwriter_lru_multiplier to arrive at an estimate of the number that will be needed during the next round, (up to bgwriter_lru_maxpages). 1.0 represents a “just in time” policy of writing exactly the number of buffers predicted to be needed. Larger values provide some cushion against spikes in demand, while smaller values intentionally leave writes to be done by server processes. The default is 2.0.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.deadlock_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>500</code></li><li>max: <code>1800000</code></li></ul></div>
              <p class="title">deadlock_timeout</p>
              <div class="description"><p>This is the amount of time, in milliseconds, to wait on a lock before checking to see if there is a deadlock condition.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.default_toast_compression</strong></p><p><code class="type">string</code></p></div>
              <p class="title">default_toast_compression</p>
              <div class="description"><p>Specifies the default TOAST compression method for values of compressible columns (the default is lz4).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.idle_in_transaction_session_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>604800000</code></li></ul></div>
              <p class="title">idle_in_transaction_session_timeout</p>
              <div class="description"><p>Time out sessions with open transactions after this number of milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.jit</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">jit</p>
              <div class="description"><p>Controls system-wide use of Just-in-Time Compilation (JIT).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.log_autovacuum_min_duration</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">log_autovacuum_min_duration</p>
              <div class="description"><p>Causes each action executed by autovacuum to be logged if it ran for at least the specified number of milliseconds. Setting this to zero logs all autovacuum actions. Minus-one (the default) disables logging autovacuum actions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.log_error_verbosity</strong></p><p><code class="type">string</code></p></div>
              <p class="title">log_error_verbosity</p>
              <div class="description"><p>Controls the amount of detail written in the server log for each message that is logged.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.log_line_prefix</strong></p><p><code class="type">string</code></p></div>
              <p class="title">log_line_prefix</p>
              <div class="description"><p>Choose from one of the available log formats.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.log_min_duration_statement</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>86400000</code></li></ul></div>
              <p class="title">log_min_duration_statement</p>
              <div class="description"><p>Log statements that take more than this number of milliseconds to run, -1 disables</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.log_temp_files</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">log_temp_files</p>
              <div class="description"><p>Log statements for each temporary file created larger than this number of kilobytes, -1 disables</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_files_per_process</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>4096</code></li></ul></div>
              <p class="title">max_files_per_process</p>
              <div class="description"><p>PostgreSQL maximum number of files that can be open per process</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_prepared_transactions</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>10000</code></li></ul></div>
              <p class="title">max_prepared_transactions</p>
              <div class="description"><p>PostgreSQL maximum prepared transactions</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_pred_locks_per_transaction</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>64</code></li><li>max: <code>5120</code></li></ul></div>
              <p class="title">max_pred_locks_per_transaction</p>
              <div class="description"><p>PostgreSQL maximum predicate locks per transaction</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_locks_per_transaction</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>64</code></li><li>max: <code>6400</code></li></ul></div>
              <p class="title">max_locks_per_transaction</p>
              <div class="description"><p>PostgreSQL maximum locks per transaction</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_slot_wal_keep_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">max_slot_wal_keep_size</p>
              <div class="description"><p>PostgreSQL maximum WAL size (MB) reserved for replication slots. Default is -1 (unlimited). wal_keep_size minimum WAL size setting takes precedence over this.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_stack_depth</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>2097152</code></li><li>max: <code>6291456</code></li></ul></div>
              <p class="title">max_stack_depth</p>
              <div class="description"><p>Maximum depth of the stack in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_standby_archive_delay</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>43200000</code></li></ul></div>
              <p class="title">max_standby_archive_delay</p>
              <div class="description"><p>Max standby archive delay in milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_standby_streaming_delay</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>43200000</code></li></ul></div>
              <p class="title">max_standby_streaming_delay</p>
              <div class="description"><p>Max standby streaming delay in milliseconds</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_replication_slots</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>8</code></li><li>max: <code>64</code></li></ul></div>
              <p class="title">max_replication_slots</p>
              <div class="description"><p>PostgreSQL maximum replication slots</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_logical_replication_workers</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>4</code></li><li>max: <code>64</code></li></ul></div>
              <p class="title">max_logical_replication_workers</p>
              <div class="description"><p>PostgreSQL maximum logical replication workers (taken from the pool of max_parallel_workers)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_parallel_workers</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>96</code></li></ul></div>
              <p class="title">max_parallel_workers</p>
              <div class="description"><p>Sets the maximum number of workers that the system can support for parallel queries</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_parallel_workers_per_gather</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>96</code></li></ul></div>
              <p class="title">max_parallel_workers_per_gather</p>
              <div class="description"><p>Sets the maximum number of workers that can be started by a single Gather or Gather Merge node</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_worker_processes</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>8</code></li><li>max: <code>96</code></li></ul></div>
              <p class="title">max_worker_processes</p>
              <div class="description"><p>Sets the maximum number of background processes that the system can support</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.pg_partman_bgw.role</strong></p><p><code class="type">string</code></p></div>
              <p class="title">pg_partman_bgw.role</p>
              <div class="description"><p>Controls which role to use for pg_partman's scheduled background tasks.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.pg_partman_bgw.interval</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>3600</code></li><li>max: <code>604800</code></li></ul></div>
              <p class="title">pg_partman_bgw.interval</p>
              <div class="description"><p>Sets the time interval to run pg_partman's scheduled tasks</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.pg_stat_statements.track</strong></p><p><code class="type">string</code></p></div>
              <p class="title">pg_stat_statements.track</p>
              <div class="description"><p>Controls which statements are counted. Specify top to track top-level statements (those issued directly by clients), all to also track nested statements (such as statements invoked within functions), or none to disable statement statistics collection. The default value is top.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.temp_file_limit</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">temp_file_limit</p>
              <div class="description"><p>PostgreSQL temporary file limit in KiB, -1 for unlimited</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.timezone</strong></p><p><code class="type">string</code></p></div>
              <p class="title">timezone</p>
              <div class="description"><p>PostgreSQL service timezone</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.track_activity_query_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>10240</code></li></ul></div>
              <p class="title">track_activity_query_size</p>
              <div class="description"><p>Specifies the number of bytes reserved to track the currently executing command for each active session.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.track_commit_timestamp</strong></p><p><code class="type">string</code></p></div>
              <p class="title">track_commit_timestamp</p>
              <div class="description"><p>Record commit time of transactions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.track_functions</strong></p><p><code class="type">string</code></p></div>
              <p class="title">track_functions</p>
              <div class="description"><p>Enables tracking of function call counts and time used.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.track_io_timing</strong></p><p><code class="type">string</code></p></div>
              <p class="title">track_io_timing</p>
              <div class="description"><p>Enables timing of database I/O calls. This parameter is off by default, because it will repeatedly query the operating system for the current time, which may cause significant overhead on some platforms.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.max_wal_senders</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>20</code></li><li>max: <code>64</code></li></ul></div>
              <p class="title">max_wal_senders</p>
              <div class="description"><p>PostgreSQL maximum WAL senders</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.wal_sender_timeout</strong></p><p><code class="type">integer</code></p></div>
              <p class="title">wal_sender_timeout</p>
              <div class="description"><p>Terminate replication connections that are inactive for longer than this amount of time, in milliseconds. Setting this value to zero disables the timeout.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>pg.wal_writer_delay</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>200</code></li></ul></div>
              <p class="title">wal_writer_delay</p>
              <div class="description"><p>WAL flush interval in milliseconds. Note that setting this value to lower than the default 200ms may negatively impact performance</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>shared_buffers_percentage</strong></p><p><code class="type">number</code></p></div><div class="constraints"><ul><li>min: <code>20</code></li><li>max: <code>60</code></li></ul></div>
        <p class="title">shared_buffers_percentage</p>
        <div class="description"><p>Percentage of total RAM that the database server uses for shared memory buffers. Valid range is 20-60 (float), which corresponds to 20% - 60%. This setting adjusts the shared_buffers configuration value.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>work_mem</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
        <p class="title">work_mem</p>
        <div class="description"><p>Sets the maximum amount of memory to be used by a query operation (such as a sort or hash table) before writing to temporary disk files, in MB. Default is 1MB + 0.075% of total RAM (up to 32MB).</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>google_columnar_engine_memory_size_percentage</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>50</code></li><li>default: <code>10</code></li></ul></div>
        <p class="title">Columnar data store size</p>
        <div class="description"><p>Allocate the amount of RAM to store columnar data.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>google_columnar_engine_enabled</strong></p><p><code class="type">boolean</code></p></div><div class="constraints"><ul><li>default: <code>true</code></li></ul></div>
        <p class="title">Columnar engine control</p>
        <div class="description"><p>Enables or disables the columnar engine. When enabled, it accelerates SQL query processing.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    