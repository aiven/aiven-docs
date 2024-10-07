
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div class="param"><p class="name"><strong>additional_backup_regions</strong></p><p><code class="type">array</code></p></div>
        <p class="title">Additional Cloud Regions for Backup Replication</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div class="param"><p class="name"><strong>cassandra</strong></p><p><code class="type">object</code></p></div>
        <p class="title">cassandra configuration values</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>cassandra.batch_size_warn_threshold_in_kb</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000000</code></li></ul></div>
              <p class="title">batch_size_warn_threshold_in_kb</p>
              <div class="description"><p>Log a warning message on any multiple-partition batch size exceeding this value.5kb per batch by default.Caution should be taken on increasing the size of this thresholdas it can lead to node instability.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>cassandra.batch_size_fail_threshold_in_kb</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000000</code></li></ul></div>
              <p class="title">batch_size_fail_threshold_in_kb</p>
              <div class="description"><p>Fail any multiple-partition batch exceeding this value. 50kb (10x warn threshold) by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>cassandra.datacenter</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Cassandra datacenter name</p>
              <div class="description"><p>Name of the datacenter to which nodes of this service belong. Can be set only when creating the service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>cassandra.write_request_timeout_in_ms</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>10000</code></li></ul></div>
              <p class="title">write_request_timeout_in_ms</p>
              <div class="description"><p>How long the coordinator waits for write requests to complete with at least one node in the local datacenter. 2 seconds by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>cassandra.read_request_timeout_in_ms</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>10000</code></li></ul></div>
              <p class="title">read_request_timeout_in_ms</p>
              <div class="description"><p>How long the coordinator waits for read operations to complete before timing it out. 5 seconds by default.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>migrate_sstableloader</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Migration mode for the sstableloader utility</p>
        <div class="description"><p>Sets the service into migration mode enabling the sstableloader utility to be used to upload Cassandra data files. Available only on service create.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>service_to_join_with</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Name of the service to form a bigger cluster with</p>
        <div class="description"><p>When bootstrapping, instead of creating a new Cassandra cluster try to join an existing one from another service. Can only be set on service creation.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>cassandra_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Cassandra version</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>private_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from private networks</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>private_access.prometheus</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>public_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from the public Internet</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.prometheus</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>service_to_fork_from</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>project_to_fork_from</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>backup_hour</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>max: <code>23</code></li></ul></div>
        <p class="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>backup_minute</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>max: <code>59</code></li></ul></div>
        <p class="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    