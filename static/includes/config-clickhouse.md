
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>ip_filter</strong></p><code class="type">array</code></p><div class="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div></div>
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
        <div><p class="name"><p class="type"><strong>service_log</strong></p><code class="type">boolean,null</code></p></div>
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
        <div><p class="name"><p class="type"><strong>static_ips</strong></p><code class="type">boolean</code></p></div>
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
        <div><p class="name"><p class="type"><strong>project_to_fork_from</strong></p><code class="type">string,null</code></p></div>
        <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>private_access</strong></p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from private networks</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>private_access.clickhouse</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to clickhouse with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>private_access.clickhouse_https</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to clickhouse_https with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>private_access.clickhouse_mysql</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to clickhouse_mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>private_access.prometheus</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>privatelink_access</strong></p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service components through Privatelink</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>privatelink_access.clickhouse</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Enable clickhouse</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>privatelink_access.clickhouse_https</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Enable clickhouse_https</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>privatelink_access.clickhouse_mysql</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Enable clickhouse_mysql</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>privatelink_access.prometheus</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>public_access</strong></p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from the public Internet</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>public_access.clickhouse</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to clickhouse from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>public_access.clickhouse_https</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to clickhouse_https from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>public_access.clickhouse_mysql</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to clickhouse_mysql from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>public_access.prometheus</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>service_to_fork_from</strong></p><code class="type">string,null</code></p></div>
        <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    