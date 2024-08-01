
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div><p class="name"><strong>ip_filter</strong><code class="type">array</code></p><div class="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div></div>
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
        <div><p class="name"><strong>service_log</strong><code class="type">boolean,null</code></p></div>
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
        <div><p class="name"><strong>static_ips</strong><code class="type">boolean</code></p></div>
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
        <div><p class="name"><strong>private_access</strong><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from private networks</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><strong>private_access.prometheus</strong><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>private_access.dragonfly</strong><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to dragonfly with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>privatelink_access</strong><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service components through Privatelink</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><strong>privatelink_access.prometheus</strong><code class="type">boolean</code></p></div>
              <p class="title">Enable prometheus</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>privatelink_access.dragonfly</strong><code class="type">boolean</code></p></div>
              <p class="title">Enable dragonfly</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>public_access</strong><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from the public Internet</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><strong>public_access.prometheus</strong><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>public_access.dragonfly</strong><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to dragonfly from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>migration</strong><code class="type">object,null</code></p></div>
        <p class="title">Migrate data from existing server</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><strong>migration.host</strong><code class="type">string</code></p></div>
              <p class="title">Hostname or IP address of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.port</strong><code class="type">integer</code></p><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div></div>
              <p class="title">Port number of the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.password</strong><code class="type">string</code></p></div>
              <p class="title">Password for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.ssl</strong><code class="type">boolean</code></p><div class="constraints"><ul><li>default: <code>true</code></li></ul></div></div>
              <p class="title">The server where to migrate data from is secured with SSL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.username</strong><code class="type">string</code></p></div>
              <p class="title">User name for authentication with the server where to migrate data from</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.dbname</strong><code class="type">string</code></p></div>
              <p class="title">Database name for bootstrapping the initial connection</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.ignore_dbs</strong><code class="type">string</code></p></div>
              <p class="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.ignore_roles</strong><code class="type">string</code></p></div>
              <p class="title">Comma-separated list of database roles, which should be ignored during migration (supported by PostgreSQL only at the moment)</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><strong>migration.method</strong><code class="type">string</code></p></div>
              <p class="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>recovery_basebackup_name</strong><code class="type">string</code></p></div>
        <p class="title">Name of the basebackup to restore in forked service</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>dragonfly_ssl</strong><code class="type">boolean</code></p><div class="constraints"><ul><li>default: <code>true</code></li></ul></div></div>
        <p class="title">Require SSL to access Dragonfly</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>cache_mode</strong><code class="type">boolean</code></p></div>
        <p class="title">Evict entries when getting close to maxmemory limit</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>service_to_fork_from</strong><code class="type">string,null</code></p></div>
        <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>project_to_fork_from</strong><code class="type">string,null</code></p></div>
        <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><strong>dragonfly_persistence</strong><code class="type">string</code></p></div>
        <p class="title">Dragonfly persistence</p>
        <div class="description"><p>When persistence is 'rdb' or 'dfs', Dragonfly does RDB or DFS dumps every 10 minutes. Dumps are done according to the backup schedule for backup purposes. When persistence is 'off', no RDB/DFS dumps or backups are done, so data can be lost at any moment if the service is restarted for any reason, or if the service is powered off. Also, the service can't be forked.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    