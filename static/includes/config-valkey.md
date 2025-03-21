
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
        <div className="param"><p className="name"><Link id="ip_filter"/><Link to="#ip_filter"><strong>ip_filter</strong></Link></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0,::/0</code></li></ul></div>
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
              <div className="param"><p className="name"><Link id="private_access_prometheus"/><Link to="#private_access_prometheus"><strong>private_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_valkey"/><Link to="#private_access_valkey"><strong>private_access.valkey</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to valkey with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name"><Link id="privatelink_access_prometheus"/><Link to="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_valkey"/><Link to="#privatelink_access_valkey"><strong>privatelink_access.valkey</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable valkey</p>
              
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
              <div className="param"><p className="name"><Link id="public_access_prometheus"/><Link to="#public_access_prometheus"><strong>public_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_valkey"/><Link to="#public_access_valkey"><strong>public_access.valkey</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to valkey from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="recovery_basebackup_name"/><Link to="#recovery_basebackup_name"><strong>recovery_basebackup_name</strong></Link></p><p><code className="type">string</code></p></div>
        <p className="title">Name of the basebackup to restore in forked service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_maxmemory_policy"/><Link to="#valkey_maxmemory_policy"><strong>valkey_maxmemory_policy</strong></Link></p><p><code className="type">string,null</code></p></div><div className="constraints"><ul><li>default: <code>noeviction</code></li></ul></div>
        <p className="title">Valkey maxmemory-policy</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_pubsub_client_output_buffer_limit"/><Link to="#valkey_pubsub_client_output_buffer_limit"><strong>valkey_pubsub_client_output_buffer_limit</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>32</code></li><li>max: <code>512</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="valkey_number_of_databases"/><Link to="#valkey_number_of_databases"><strong>valkey_number_of_databases</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
        <p className="title">Number of Valkey databases</p>
        <div className="description"><p>Set number of Valkey databases. Changing this will cause a restart of the Valkey service.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_io_threads"/><Link to="#valkey_io_threads"><strong>valkey_io_threads</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>32</code></li></ul></div>
        <p className="title">Valkey IO thread count</p>
        <div className="description"><p>Set Valkey IO thread count. Changing this will cause a restart of the Valkey service.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_lfu_log_factor"/><Link to="#valkey_lfu_log_factor"><strong>valkey_lfu_log_factor</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>100</code></li><li>default: <code>10</code></li></ul></div>
        <p className="title">Counter logarithm factor for volatile-lfu and allkeys-lfu maxmemory-policies</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_lfu_decay_time"/><Link to="#valkey_lfu_decay_time"><strong>valkey_lfu_decay_time</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>120</code></li><li>default: <code>1</code></li></ul></div>
        <p className="title">LFU maxmemory-policy counter decay time in minutes</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_ssl"/><Link to="#valkey_ssl"><strong>valkey_ssl</strong></Link></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
        <p className="title">Require SSL to access Valkey</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_timeout"/><Link to="#valkey_timeout"><strong>valkey_timeout</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2073600</code></li><li>default: <code>300</code></li></ul></div>
        <p className="title">Valkey idle connection timeout in seconds</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_notify_keyspace_events"/><Link to="#valkey_notify_keyspace_events"><strong>valkey_notify_keyspace_events</strong></Link></p><p><code className="type">string</code></p></div>
        <p className="title">Set notify-keyspace-events option</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_persistence"/><Link to="#valkey_persistence"><strong>valkey_persistence</strong></Link></p><p><code className="type">string</code></p></div>
        <p className="title">Valkey persistence</p>
        <div className="description"><p>When persistence is 'rdb', Valkey does RDB dumps each 10 minutes if any key is changed. Also RDB dumps are done according to backup schedule for backup purposes. When persistence is 'off', no RDB dumps and backups are done, so data can be lost at any moment if service is restarted for any reason, or if service is powered off. Also service can't be forked.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="frequent_snapshots"/><Link to="#frequent_snapshots"><strong>frequent_snapshots</strong></Link></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
        <p className="title">Frequent RDB snapshots</p>
        <div className="description"><p>When enabled, Valkey will create frequent local RDB snapshots. When disabled, Valkey will only take RDB snapshots when a backup is created, based on the backup schedule. This setting is ignored when `valkey_persistence` is set to `off`.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_active_expire_effort"/><Link to="#valkey_active_expire_effort"><strong>valkey_active_expire_effort</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>10</code></li><li>default: <code>1</code></li></ul></div>
        <p className="title">Active expire effort</p>
        <div className="description"><p>Valkey reclaims expired keys both when accessed and in the background. The background process scans for expired keys to free memory. Increasing the active-expire-effort setting (default 1, max 10) uses more CPU to reclaim expired keys faster, reducing memory usage but potentially increasing latency.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="valkey_acl_channels_default"/><Link to="#valkey_acl_channels_default"><strong>valkey_acl_channels_default</strong></Link></p><p><code className="type">string</code></p></div>
        <p className="title">Default ACL for pub/sub channels used when a Valkey user is created</p>
        <div className="description"><p>Determines default pub/sub channels' ACL for new users if ACL is not supplied. When this option is not defined, all_channels is assumed to keep backward compatibility. This option doesn't affect Valkey configuration acl-pubsub-default.</p></div>
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
        <div className="param"><p className="name"><Link id="enable_ipv6"/><Link to="#enable_ipv6"><strong>enable_ipv6</strong></Link></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable IPv6</p>
        <div className="description"><p>Register AAAA DNS records for the service, and allow IPv6 packets to service ports</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    