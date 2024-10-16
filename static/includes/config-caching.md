
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="additional_backup_regions"><a href="#additional_backup_regions"><strong>additional_backup_regions</strong></a></p><p><code className="type">array</code></p></div>
        <p className="title">Additional Cloud Regions for Backup Replication</p>
        
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
        <div className="param"><p className="name" id="private_access"><a href="#private_access"><strong>private_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_prometheus"><a href="#private_access_prometheus"><strong>private_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_redis"><a href="#private_access_redis"><strong>private_access.redis</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to redis with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name" id="privatelink_access_prometheus"><a href="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_redis"><a href="#privatelink_access_redis"><strong>privatelink_access.redis</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable redis</p>
              
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
              <div className="param"><p className="name" id="public_access_prometheus"><a href="#public_access_prometheus"><strong>public_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_redis"><a href="#public_access_redis"><strong>public_access.redis</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to redis from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="recovery_basebackup_name"><a href="#recovery_basebackup_name"><strong>recovery_basebackup_name</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Name of the basebackup to restore in forked service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_maxmemory_policy"><a href="#redis_maxmemory_policy"><strong>redis_maxmemory_policy</strong></a></p><p><code className="type">string,null</code></p></div><div className="constraints"><ul><li>default: <code>noeviction</code></li></ul></div>
        <p className="title">Redis maxmemory-policy</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_pubsub_client_output_buffer_limit"><a href="#redis_pubsub_client_output_buffer_limit"><strong>redis_pubsub_client_output_buffer_limit</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>32</code></li><li>max: <code>512</code></li></ul></div>
        <p className="title">Pub/sub client output buffer hard limit in MB</p>
        <div className="description"><p>Set output buffer limit for pub / sub clients in MB. The value is the hard limit, the soft limit is 1/4 of the hard limit. When setting the limit, be mindful of the available memory in the selected service plan.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_number_of_databases"><a href="#redis_number_of_databases"><strong>redis_number_of_databases</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
        <p className="title">Number of Redis databases</p>
        <div className="description"><p>Set number of Redis databases. Changing this will cause a restart of the Redis service.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_io_threads"><a href="#redis_io_threads"><strong>redis_io_threads</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>32</code></li></ul></div>
        <p className="title">Redis IO thread count</p>
        <div className="description"><p>Set Redis IO thread count. Changing this will cause a restart of the Redis service.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_lfu_log_factor"><a href="#redis_lfu_log_factor"><strong>redis_lfu_log_factor</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>100</code></li><li>default: <code>10</code></li></ul></div>
        <p className="title">Counter logarithm factor for volatile-lfu and allkeys-lfu maxmemory-policies</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_lfu_decay_time"><a href="#redis_lfu_decay_time"><strong>redis_lfu_decay_time</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>120</code></li><li>default: <code>1</code></li></ul></div>
        <p className="title">LFU maxmemory-policy counter decay time in minutes</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_ssl"><a href="#redis_ssl"><strong>redis_ssl</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
        <p className="title">Require SSL to access Redis</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_timeout"><a href="#redis_timeout"><strong>redis_timeout</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2073600</code></li><li>default: <code>300</code></li></ul></div>
        <p className="title">Redis idle connection timeout in seconds</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_notify_keyspace_events"><a href="#redis_notify_keyspace_events"><strong>redis_notify_keyspace_events</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Set notify-keyspace-events option</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_persistence"><a href="#redis_persistence"><strong>redis_persistence</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Redis persistence</p>
        <div className="description"><p>When persistence is 'rdb', Redis does RDB dumps each 10 minutes if any key is changed. Also RDB dumps are done according to the backup schedule for backup purposes. When persistence is 'off', no RDB dumps or backups are done, so data can be lost at any moment if the service is restarted for any reason, or if the service is powered off. Also, the service can't be forked.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_acl_channels_default"><a href="#redis_acl_channels_default"><strong>redis_acl_channels_default</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Default ACL for pub/sub channels used when Redis user is created</p>
        <div className="description"><p>Determines default pub/sub channels' ACL for new users if ACL is not supplied. When this option is not defined, all_channels is assumed to keep backward compatibility. This option doesn't affect Redis configuration acl-pubsub-default.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="redis_version"><a href="#redis_version"><strong>redis_version</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Redis major version</p>
        
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
  </tbody>
</table>
    