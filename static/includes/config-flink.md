
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div class="param"><p class="name"><strong>ip_filter</strong></p><p><code class="type">array</code></p></div><div class="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
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
        <div class="param"><p class="name"><strong>service_log</strong></p><p><code class="type">boolean,null</code></p></div>
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
        <div class="param"><p class="name"><strong>static_ips</strong></p><p><code class="type">boolean</code></p></div>
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
        <div class="param"><p class="name"><strong>flink_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Flink major version</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>number_of_task_slots</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
        <p class="title">Flink taskmanager.numberOfTaskSlots</p>
        <div class="description"><p>Task slots per node. For a 3 node plan, total number of task slots is 3x this value</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>pekko_ask_timeout_s</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>5</code></li><li>max: <code>60</code></li></ul></div>
        <p class="title">Flink pekko.ask.timeout</p>
        <div class="description"><p>Timeout in seconds used for all futures and blocking Pekko requests</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>pekko_framesize_b</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>52428800</code></li></ul></div>
        <p class="title">Flink pekko.framesize</p>
        <div class="description"><p>Maximum size in bytes for messages exchanged between the JobManager and the TaskManagers</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>privatelink_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service components through Privatelink</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.flink</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable flink</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.prometheus</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    