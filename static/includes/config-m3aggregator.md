
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>custom_domain</strong></p><code class="type">string,null</code></p></div>
        <p class="title">Custom domain</p>
        <div class="description"><p>Serve the web frontend using a custom CNAME pointing to the Aiven DNS name</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div><p class="name"><p class="type"><strong>m3_version</strong></p><code class="type">string,null</code></p></div>
        <p class="title">M3 major version (deprecated, use m3aggregator_version)</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>m3aggregator_version</strong></p><code class="type">string,null</code></p></div>
        <p class="title">M3 major version (the minimum compatible version)</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    