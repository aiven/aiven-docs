
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name"><Link id="ip_filter"/><Link to="#ip_filter"><strong>ip_filter</strong></Link></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="custom_code"/><Link to="#custom_code"><strong>custom_code</strong></Link></p><p><code className="type">boolean</code></p></div>
        <p className="title">Custom code enabled</p>
        <div className="description"><p>Enable to upload Custom JARs for Flink applications</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="flink_version"/><Link to="#flink_version"><strong>flink_version</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Flink major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="number_of_task_slots"/><Link to="#number_of_task_slots"><strong>number_of_task_slots</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="pekko_ask_timeout_s"/><Link to="#pekko_ask_timeout_s"><strong>pekko_ask_timeout_s</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>5</code></li><li>max: <code>60</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="pekko_framesize_b"/><Link to="#pekko_framesize_b"><strong>pekko_framesize_b</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>52428800</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="privatelink_access"/><Link to="#privatelink_access"><strong>privatelink_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_flink"/><Link to="#privatelink_access_flink"><strong>privatelink_access.flink</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable flink</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_prometheus"/><Link to="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
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
              <div className="param"><p className="name"><Link id="public_access_flink"/><Link to="#public_access_flink"><strong>public_access.flink</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to flink from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    