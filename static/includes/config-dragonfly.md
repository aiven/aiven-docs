
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
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
        <div className="param"><p className="name" id="private_access"><strong>private_access</strong></p><p><code className="type">object</code></p><a href="#private_access">#</a></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_prometheus"><strong>private_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#private_access_prometheus">#</a></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_dragonfly"><strong>private_access.dragonfly</strong></p><p><code className="type">boolean</code></p><a href="#private_access_dragonfly">#</a></div>
              <p className="title">Allow clients to connect to dragonfly with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name" id="privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_prometheus">#</a></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_dragonfly"><strong>privatelink_access.dragonfly</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_dragonfly">#</a></div>
              <p className="title">Enable dragonfly</p>
              
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
              <div className="param"><p className="name" id="public_access_prometheus"><strong>public_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#public_access_prometheus">#</a></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_dragonfly"><strong>public_access.dragonfly</strong></p><p><code className="type">boolean</code></p><a href="#public_access_dragonfly">#</a></div>
              <p className="title">Allow clients to connect to dragonfly from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
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
        <div className="param"><p className="name" id="recovery_basebackup_name"><strong>recovery_basebackup_name</strong></p><p><code className="type">string</code></p><a href="#recovery_basebackup_name">#</a></div>
        <p className="title">Name of the basebackup to restore in forked service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="dragonfly_ssl"><strong>dragonfly_ssl</strong></p><p><code className="type">boolean</code></p><a href="#dragonfly_ssl">#</a></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
        <p className="title">Require SSL to access Dragonfly</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="cache_mode"><strong>cache_mode</strong></p><p><code className="type">boolean</code></p><a href="#cache_mode">#</a></div>
        <p className="title">Evict entries when getting close to maxmemory limit</p>
        
        <table className="service-param-children">
          <tbody>
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
        <div className="param"><p className="name" id="dragonfly_persistence"><strong>dragonfly_persistence</strong></p><p><code className="type">string</code></p><a href="#dragonfly_persistence">#</a></div>
        <p className="title">Dragonfly persistence</p>
        <div className="description"><p>When persistence is 'rdb' or 'dfs', Dragonfly does RDB or DFS dumps every 10 minutes. Dumps are done according to the backup schedule for backup purposes. When persistence is 'off', no RDB/DFS dumps or backups are done, so data can be lost at any moment if the service is restarted for any reason, or if the service is powered off. Also, the service can't be forked.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    