
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
        <div className="param"><p className="name" id="private_access"><strong>private_access</strong></p><p><code className="type">object</code></p><a href="#private_access">#</a></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_clickhouse"><strong>private_access.clickhouse</strong></p><p><code className="type">boolean</code></p><a href="#private_access_clickhouse">#</a></div>
              <p className="title">Allow clients to connect to clickhouse with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_clickhouse_https"><strong>private_access.clickhouse_https</strong></p><p><code className="type">boolean</code></p><a href="#private_access_clickhouse_https">#</a></div>
              <p className="title">Allow clients to connect to clickhouse_https with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_clickhouse_mysql"><strong>private_access.clickhouse_mysql</strong></p><p><code className="type">boolean</code></p><a href="#private_access_clickhouse_mysql">#</a></div>
              <p className="title">Allow clients to connect to clickhouse_mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name" id="privatelink_access_clickhouse"><strong>privatelink_access.clickhouse</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_clickhouse">#</a></div>
              <p className="title">Enable clickhouse</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_clickhouse_https"><strong>privatelink_access.clickhouse_https</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_clickhouse_https">#</a></div>
              <p className="title">Enable clickhouse_https</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_clickhouse_mysql"><strong>privatelink_access.clickhouse_mysql</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_clickhouse_mysql">#</a></div>
              <p className="title">Enable clickhouse_mysql</p>
              
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
              <div className="param"><p className="name" id="public_access_clickhouse"><strong>public_access.clickhouse</strong></p><p><code className="type">boolean</code></p><a href="#public_access_clickhouse">#</a></div>
              <p className="title">Allow clients to connect to clickhouse from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_clickhouse_https"><strong>public_access.clickhouse_https</strong></p><p><code className="type">boolean</code></p><a href="#public_access_clickhouse_https">#</a></div>
              <p className="title">Allow clients to connect to clickhouse_https from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_clickhouse_mysql"><strong>public_access.clickhouse_mysql</strong></p><p><code className="type">boolean</code></p><a href="#public_access_clickhouse_mysql">#</a></div>
              <p className="title">Allow clients to connect to clickhouse_mysql from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
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
        <div className="param"><p className="name" id="recovery_basebackup_name"><strong>recovery_basebackup_name</strong></p><p><code className="type">string</code></p><a href="#recovery_basebackup_name">#</a></div>
        <p className="title">Name of the basebackup to restore in forked service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    