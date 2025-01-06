
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name"><Link id="additional_backup_regions"/><Link to="#additional_backup_regions"><strong>additional_backup_regions</strong></Link></p><p><code className="type">array</code></p></div>
        <p className="title">Additional Cloud Regions for Backup Replication</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div className="param"><p className="name"><Link id="cassandra"/><Link to="#cassandra"><strong>cassandra</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">cassandra configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="cassandra_batch_size_warn_threshold_in_kb"/><Link to="#cassandra_batch_size_warn_threshold_in_kb"><strong>cassandra.batch_size_warn_threshold_in_kb</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000000</code></li></ul></div>
              <p className="title">batch_size_warn_threshold_in_kb</p>
              <div className="description"><p>Log a warning message on any multiple-partition batch size exceeding this value.5kb per batch by default.Caution should be taken on increasing the size of this thresholdas it can lead to node instability.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="cassandra_batch_size_fail_threshold_in_kb"/><Link to="#cassandra_batch_size_fail_threshold_in_kb"><strong>cassandra.batch_size_fail_threshold_in_kb</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000000</code></li></ul></div>
              <p className="title">batch_size_fail_threshold_in_kb</p>
              <div className="description"><p>Fail any multiple-partition batch exceeding this value. 50kb (10x warn threshold) by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="cassandra_datacenter"/><Link to="#cassandra_datacenter"><strong>cassandra.datacenter</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Cassandra datacenter name</p>
              <div className="description"><p>Name of the datacenter to which nodes of this service belong. Can be set only when creating the service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="cassandra_write_request_timeout_in_ms"/><Link to="#cassandra_write_request_timeout_in_ms"><strong>cassandra.write_request_timeout_in_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">write_request_timeout_in_ms</p>
              <div className="description"><p>How long the coordinator waits for write requests to complete with at least one node in the local datacenter. 2 seconds by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="cassandra_read_request_timeout_in_ms"/><Link to="#cassandra_read_request_timeout_in_ms"><strong>cassandra.read_request_timeout_in_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">read_request_timeout_in_ms</p>
              <div className="description"><p>How long the coordinator waits for read operations to complete before timing it out. 5 seconds by default.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="migrate_sstableloader"/><Link to="#migrate_sstableloader"><strong>migrate_sstableloader</strong></Link></p><p><code className="type">boolean</code></p></div>
        <p className="title">Migration mode for the sstableloader utility</p>
        <div className="description"><p>Sets the service into migration mode enabling the sstableloader utility to be used to upload Cassandra data files. Available only on service create.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="service_to_join_with"/><Link to="#service_to_join_with"><strong>service_to_join_with</strong></Link></p><p><code className="type">string</code></p></div>
        <p className="title">Name of the service to form a bigger cluster with</p>
        <div className="description"><p>When bootstrapping, instead of creating a new Cassandra cluster try to join an existing one from another service. Can only be set on service creation.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="cassandra_version"/><Link to="#cassandra_version"><strong>cassandra_version</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Cassandra version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="private_access"/><Link to="#private_access"><strong>private_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_prometheus"/><Link to="#private_access_prometheus"><strong>private_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name"><Link id="public_access_prometheus"/><Link to="#public_access_prometheus"><strong>public_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="service_to_fork_from"/><Link to="#service_to_fork_from"><strong>service_to_fork_from</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="project_to_fork_from"/><Link to="#project_to_fork_from"><strong>project_to_fork_from</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="backup_hour"/><Link to="#backup_hour"><strong>backup_hour</strong></Link></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>max: <code>23</code></li></ul></div>
        <p className="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="backup_minute"/><Link to="#backup_minute"><strong>backup_minute</strong></Link></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>max: <code>59</code></li></ul></div>
        <p className="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    