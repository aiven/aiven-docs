
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="custom_domain"><strong>custom_domain</strong></p><p><code className="type">string,null</code></p><a href="#custom_domain">#</a></div>
        <p className="title">Custom domain</p>
        <div className="description"><p>Serve the web frontend using a custom CNAME pointing to the Aiven DNS name</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div className="param"><p className="name" id="m3_version"><strong>m3_version</strong></p><p><code className="type">string,null</code></p><a href="#m3_version">#</a></div>
        <p className="title">M3 major version (deprecated, use m3aggregator_version)</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="m3aggregator_version"><strong>m3aggregator_version</strong></p><p><code className="type">string,null</code></p><a href="#m3aggregator_version">#</a></div>
        <p className="title">M3 major version (the minimum compatible version)</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    