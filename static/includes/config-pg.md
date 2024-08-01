
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
      <b>enable_ipv6</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable IPv6</p>
    <div class="description">Register AAAA DNS records for the service, and allow IPv6 packets to service ports</div>
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
      <b>pglookout</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">PGLookout settings</p>
    <div class="description">System-wide settings for pglookout.</div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>max_failover_replication_time_lag</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">max_failover_replication_time_lag</p>
          <div class="description">Number of seconds of master unavailability before triggering database failover to standby</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>pg_service_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of the PG Service from which to fork (deprecated, use service_to_fork_from). This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
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
      <b>synchronous_replication</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Synchronous replication type. Note that the service plan also needs to support synchronous replication.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>pg_read_replica</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Should the service which is being forked be a read replica (deprecated, use read_replica service integration instead).</p>
    <div class="description">This setting is deprecated. Use read_replica service integration instead.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>pg_stat_monitor_enable</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable pg_stat_monitor extension if available for the current cluster</p>
    <div class="description">Enable the pg_stat_monitor extension. Enabling this extension will cause the cluster to be restarted.When this extension is enabled, pg_stat_statements results for utility commands are unreliable</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>pg_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">PostgreSQL major version</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>pgbouncer</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">PGBouncer connection pooling settings</p>
    <div class="description">System-wide settings for pgbouncer.</div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>server_reset_query_always</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Run server_reset_query (DISCARD ALL) in all pooling modes</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ignore_startup_parameters</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">List of parameters to ignore when given in startup packet</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>min_pool_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">Add more server connections to pool if below this number. Improves behavior when usual load comes suddenly back after period of total inactivity. The value is effectively capped at the pool size.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>server_lifetime</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>60</code>
                max: <code>86400</code>
            </div>
          </p>
          <p class="title">The pooler will close an unused server connection that has been connected longer than this. [seconds]</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>server_idle_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>86400</code>
            </div>
          </p>
          <p class="title">If a server connection has been idle more than this many seconds it will be dropped. If 0 then timeout is disabled. [seconds]</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autodb_pool_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">If non-zero then create automatically a pool of that size per user when a pool doesn't exist.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autodb_pool_mode</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">PGBouncer pool mode</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autodb_max_db_connections</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">Do not allow more than this many server connections per database (regardless of user). Setting it to 0 means unlimited.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autodb_idle_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>86400</code>
            </div>
          </p>
          <p class="title">If the automatically created database pools have been unused this many seconds, they are freed. If 0 then timeout is disabled. [seconds]</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_prepared_statements</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>3000</code>
            </div>
          </p>
          <p class="title">PgBouncer tracks protocol-level named prepared statements related commands sent by the client in transaction and statement pooling modes when max_prepared_statements is set to a non-zero value. Setting it to 0 disables prepared statements. max_prepared_statements defaults to 100, and its maximum is 3000.</p>
          <div class="description"></div>
        </td>
      </tr>
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
      <b>variant</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Variant of the PostgreSQL service, may affect the features that are exposed by default</p>
    <div class="description"></div>
    <table class="service-param-children">
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
            <b>pg</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to pg with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pgbouncer</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to pgbouncer with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
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
            <b>pg</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable pg</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pgbouncer</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable pgbouncer</p>
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
            <b>pg</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to pg from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pgbouncer</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to pgbouncer from the public internet for service nodes that are in a project VPC or another type of private network</p>
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
      <b>pg</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">postgresql.conf configuration values</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_freeze_max_age</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>200000000</code>
                max: <code>1500000000</code>
            </div>
          </p>
          <p class="title">autovacuum_freeze_max_age</p>
          <div class="description">Specifies the maximum age (in transactions) that a table's pg_class.relfrozenxid field can attain before a VACUUM operation is forced to prevent transaction ID wraparound within the table. Note that the system will launch autovacuum processes to prevent wraparound even when autovacuum is otherwise disabled. This parameter will cause the server to be restarted.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_max_workers</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>20</code>
            </div>
          </p>
          <p class="title">autovacuum_max_workers</p>
          <div class="description">Specifies the maximum number of autovacuum processes (other than the autovacuum launcher) that may be running at any one time. The default is three. This parameter can only be set at server start.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_naptime</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>86400</code>
            </div>
          </p>
          <p class="title">autovacuum_naptime</p>
          <div class="description">Specifies the minimum delay between autovacuum runs on any given database. The delay is measured in seconds, and the default is one minute</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_vacuum_threshold</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">autovacuum_vacuum_threshold</p>
          <div class="description">Specifies the minimum number of updated or deleted tuples needed to trigger a VACUUM in any one table. The default is 50 tuples</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_analyze_threshold</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">autovacuum_analyze_threshold</p>
          <div class="description">Specifies the minimum number of inserted, updated or deleted tuples needed to trigger an ANALYZE in any one table. The default is 50 tuples.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_vacuum_scale_factor</b>&nbsp;<code class="type">number</code>
            <div class="constraints">
                max: <code>1</code>
            </div>
          </p>
          <p class="title">autovacuum_vacuum_scale_factor</p>
          <div class="description">Specifies a fraction of the table size to add to autovacuum_vacuum_threshold when deciding whether to trigger a VACUUM. The default is 0.2 (20% of table size)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_analyze_scale_factor</b>&nbsp;<code class="type">number</code>
            <div class="constraints">
                max: <code>1</code>
            </div>
          </p>
          <p class="title">autovacuum_analyze_scale_factor</p>
          <div class="description">Specifies a fraction of the table size to add to autovacuum_analyze_threshold when deciding whether to trigger an ANALYZE. The default is 0.2 (20% of table size)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_vacuum_cost_delay</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>100</code>
            </div>
          </p>
          <p class="title">autovacuum_vacuum_cost_delay</p>
          <div class="description">Specifies the cost delay value that will be used in automatic VACUUM operations. If -1 is specified, the regular vacuum_cost_delay value will be used. The default value is 20 milliseconds</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>autovacuum_vacuum_cost_limit</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">autovacuum_vacuum_cost_limit</p>
          <div class="description">Specifies the cost limit value that will be used in automatic VACUUM operations. If -1 is specified (which is the default), the regular vacuum_cost_limit value will be used.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>bgwriter_delay</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">bgwriter_delay</p>
          <div class="description">Specifies the delay between activity rounds for the background writer in milliseconds. Default is 200.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>bgwriter_flush_after</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>2048</code>
            </div>
          </p>
          <p class="title">bgwriter_flush_after</p>
          <div class="description">Whenever more than bgwriter_flush_after bytes have been written by the background writer, attempt to force the OS to issue these writes to the underlying storage. Specified in kilobytes, default is 512. Setting of 0 disables forced writeback.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>bgwriter_lru_maxpages</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>1073741823</code>
            </div>
          </p>
          <p class="title">bgwriter_lru_maxpages</p>
          <div class="description">In each round, no more than this many buffers will be written by the background writer. Setting this to zero disables background writing. Default is 100.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>bgwriter_lru_multiplier</b>&nbsp;<code class="type">number</code>
            <div class="constraints">
                max: <code>10</code>
            </div>
          </p>
          <p class="title">bgwriter_lru_multiplier</p>
          <div class="description">The average recent need for new buffers is multiplied by bgwriter_lru_multiplier to arrive at an estimate of the number that will be needed during the next round, (up to bgwriter_lru_maxpages). 1.0 represents a “just in time” policy of writing exactly the number of buffers predicted to be needed. Larger values provide some cushion against spikes in demand, while smaller values intentionally leave writes to be done by server processes. The default is 2.0.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>deadlock_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>500</code>
                max: <code>1800000</code>
            </div>
          </p>
          <p class="title">deadlock_timeout</p>
          <div class="description">This is the amount of time, in milliseconds, to wait on a lock before checking to see if there is a deadlock condition.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>default_toast_compression</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">default_toast_compression</p>
          <div class="description">Specifies the default TOAST compression method for values of compressible columns (the default is lz4).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>idle_in_transaction_session_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>604800000</code>
            </div>
          </p>
          <p class="title">idle_in_transaction_session_timeout</p>
          <div class="description">Time out sessions with open transactions after this number of milliseconds</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>jit</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">jit</p>
          <div class="description">Controls system-wide use of Just-in-Time Compilation (JIT).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_autovacuum_min_duration</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">log_autovacuum_min_duration</p>
          <div class="description">Causes each action executed by autovacuum to be logged if it ran for at least the specified number of milliseconds. Setting this to zero logs all autovacuum actions. Minus-one (the default) disables logging autovacuum actions.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_error_verbosity</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">log_error_verbosity</p>
          <div class="description">Controls the amount of detail written in the server log for each message that is logged.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_line_prefix</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">log_line_prefix</p>
          <div class="description">Choose from one of the available log formats.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_min_duration_statement</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>86400000</code>
            </div>
          </p>
          <p class="title">log_min_duration_statement</p>
          <div class="description">Log statements that take more than this number of milliseconds to run, -1 disables</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_temp_files</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">log_temp_files</p>
          <div class="description">Log statements for each temporary file created larger than this number of kilobytes, -1 disables</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_files_per_process</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1000</code>
                max: <code>4096</code>
            </div>
          </p>
          <p class="title">max_files_per_process</p>
          <div class="description">PostgreSQL maximum number of files that can be open per process</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_prepared_transactions</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">max_prepared_transactions</p>
          <div class="description">PostgreSQL maximum prepared transactions</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_pred_locks_per_transaction</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>64</code>
                max: <code>5120</code>
            </div>
          </p>
          <p class="title">max_pred_locks_per_transaction</p>
          <div class="description">PostgreSQL maximum predicate locks per transaction</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_locks_per_transaction</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>64</code>
                max: <code>6400</code>
            </div>
          </p>
          <p class="title">max_locks_per_transaction</p>
          <div class="description">PostgreSQL maximum locks per transaction</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_slot_wal_keep_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">max_slot_wal_keep_size</p>
          <div class="description">PostgreSQL maximum WAL size (MB) reserved for replication slots. Default is -1 (unlimited). wal_keep_size minimum WAL size setting takes precedence over this.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_stack_depth</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>2097152</code>
                max: <code>6291456</code>
            </div>
          </p>
          <p class="title">max_stack_depth</p>
          <div class="description">Maximum depth of the stack in bytes</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_standby_archive_delay</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>43200000</code>
            </div>
          </p>
          <p class="title">max_standby_archive_delay</p>
          <div class="description">Max standby archive delay in milliseconds</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_standby_streaming_delay</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>43200000</code>
            </div>
          </p>
          <p class="title">max_standby_streaming_delay</p>
          <div class="description">Max standby streaming delay in milliseconds</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_replication_slots</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>8</code>
                max: <code>64</code>
            </div>
          </p>
          <p class="title">max_replication_slots</p>
          <div class="description">PostgreSQL maximum replication slots</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_logical_replication_workers</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>4</code>
                max: <code>64</code>
            </div>
          </p>
          <p class="title">max_logical_replication_workers</p>
          <div class="description">PostgreSQL maximum logical replication workers (taken from the pool of max_parallel_workers)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_parallel_workers</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>96</code>
            </div>
          </p>
          <p class="title">max_parallel_workers</p>
          <div class="description">Sets the maximum number of workers that the system can support for parallel queries</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_parallel_workers_per_gather</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>96</code>
            </div>
          </p>
          <p class="title">max_parallel_workers_per_gather</p>
          <div class="description">Sets the maximum number of workers that can be started by a single Gather or Gather Merge node</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_worker_processes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>8</code>
                max: <code>96</code>
            </div>
          </p>
          <p class="title">max_worker_processes</p>
          <div class="description">Sets the maximum number of background processes that the system can support</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pg_partman_bgw.role</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">pg_partman_bgw.role</p>
          <div class="description">Controls which role to use for pg_partman's scheduled background tasks.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pg_partman_bgw.interval</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>3600</code>
                max: <code>604800</code>
            </div>
          </p>
          <p class="title">pg_partman_bgw.interval</p>
          <div class="description">Sets the time interval to run pg_partman's scheduled tasks</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pg_stat_monitor.pgsm_max_buckets</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>10</code>
            </div>
          </p>
          <p class="title">pg_stat_monitor.pgsm_max_buckets</p>
          <div class="description">Sets the maximum number of buckets </div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pg_stat_monitor.pgsm_enable_query_plan</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">pg_stat_monitor.pgsm_enable_query_plan</p>
          <div class="description">Enables or disables query plan monitoring</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>pg_stat_statements.track</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">pg_stat_statements.track</p>
          <div class="description">Controls which statements are counted. Specify top to track top-level statements (those issued directly by clients), all to also track nested statements (such as statements invoked within functions), or none to disable statement statistics collection. The default value is top.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>temp_file_limit</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">temp_file_limit</p>
          <div class="description">PostgreSQL temporary file limit in KiB, -1 for unlimited</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>timezone</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">timezone</p>
          <div class="description">PostgreSQL service timezone</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>track_activity_query_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1024</code>
                max: <code>10240</code>
            </div>
          </p>
          <p class="title">track_activity_query_size</p>
          <div class="description">Specifies the number of bytes reserved to track the currently executing command for each active session.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>track_commit_timestamp</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">track_commit_timestamp</p>
          <div class="description">Record commit time of transactions.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>track_functions</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">track_functions</p>
          <div class="description">Enables tracking of function call counts and time used.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>track_io_timing</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">track_io_timing</p>
          <div class="description">Enables timing of database I/O calls. This parameter is off by default, because it will repeatedly query the operating system for the current time, which may cause significant overhead on some platforms.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_wal_senders</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>20</code>
                max: <code>64</code>
            </div>
          </p>
          <p class="title">max_wal_senders</p>
          <div class="description">PostgreSQL maximum WAL senders</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>wal_sender_timeout</b>&nbsp;<code class="type">integer</code>
          </p>
          <p class="title">wal_sender_timeout</p>
          <div class="description">Terminate replication connections that are inactive for longer than this amount of time, in milliseconds. Setting this value to zero disables the timeout.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>wal_writer_delay</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>200</code>
            </div>
          </p>
          <p class="title">wal_writer_delay</p>
          <div class="description">WAL flush interval in milliseconds. Note that setting this value to lower than the default 200ms may negatively impact performance</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>shared_buffers_percentage</b>&nbsp;<code class="type">number</code>
        <div class="constraints">
            min: <code>20</code>
            max: <code>60</code>
        </div>
    </p>
    <p class="title">shared_buffers_percentage</p>
    <div class="description">Percentage of total RAM that the database server uses for shared memory buffers. Valid range is 20-60 (float), which corresponds to 20% - 60%. This setting adjusts the shared_buffers configuration value.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>timescaledb</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">TimescaleDB extension configuration values</p>
    <div class="description">System-wide settings for the timescaledb extension</div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>max_background_workers</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>4096</code>
            </div>
          </p>
          <p class="title">timescaledb.max_background_workers</p>
          <div class="description">The number of background workers for timescaledb operations. You should configure this setting to the sum of your number of databases and the total number of concurrent background workers you want running at any given point in time.</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>work_mem</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>1</code>
            max: <code>1024</code>
        </div>
    </p>
    <p class="title">work_mem</p>
    <div class="description">Sets the maximum amount of memory to be used by a query operation (such as a sort or hash table) before writing to temporary disk files, in MB. Default is 1MB + 0.075% of total RAM (up to 32MB).</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
</table>
    