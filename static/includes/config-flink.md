
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
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
        <div className="param"><p className="name" id="flink_version"><a href="#flink_version"><strong>flink_version</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Flink major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="number_of_task_slots"><a href="#number_of_task_slots"><strong>number_of_task_slots</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
        <p className="title">Flink taskmanager.numberOfTaskSlots</p>
        <div className="description"><p>Task slots per node. For a 3 node plan, total number of task slots is 3x this value</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pekko_ask_timeout_s"><a href="#pekko_ask_timeout_s"><strong>pekko_ask_timeout_s</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>5</code></li><li>max: <code>60</code></li></ul></div>
        <p className="title">Flink pekko.ask.timeout</p>
        <div className="description"><p>Timeout in seconds used for all futures and blocking Pekko requests</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="pekko_framesize_b"><a href="#pekko_framesize_b"><strong>pekko_framesize_b</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>52428800</code></li></ul></div>
        <p className="title">Flink pekko.framesize</p>
        <div className="description"><p>Maximum size in bytes for messages exchanged between the JobManager and the TaskManagers</p></div>
        <table className="service-param-children">
          <tbody>
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
              <div className="param"><p className="name" id="privatelink_access_flink"><a href="#privatelink_access_flink"><strong>privatelink_access.flink</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable flink</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_prometheus"><a href="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
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
              <div className="param"><p className="name" id="public_access_flink"><a href="#public_access_flink"><strong>public_access.flink</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to flink from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    