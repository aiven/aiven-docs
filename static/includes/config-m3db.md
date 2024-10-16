
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="custom_domain"><a href="#custom_domain"><strong>custom_domain</strong></a></p><p><code className="type">string,null</code></p></div>
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
        <div className="param"><p className="name" id="limits"><a href="#limits"><strong>limits</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">M3 limits</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="limits_query_series"><a href="#limits_query_series"><strong>limits.query_series</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10000</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of series fetched in single query.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="limits_query_docs"><a href="#limits_query_docs"><strong>limits.query_docs</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of docs fetched in single query.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="limits_query_require_exhaustive"><a href="#limits_query_require_exhaustive"><strong>limits.query_require_exhaustive</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Require exhaustive result</p>
              <div className="description"><p>When query limits are exceeded, whether to return error or return partial results.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="limits_max_recently_queried_series_disk_bytes_read"><a href="#limits_max_recently_queried_series_disk_bytes_read"><strong>limits.max_recently_queried_series_disk_bytes_read</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of disk bytes that can be read in a given lookback period.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="limits_max_recently_queried_series_blocks"><a href="#limits_max_recently_queried_series_blocks"><strong>limits.max_recently_queried_series_blocks</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of blocks that can be read in a given lookback period.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="limits_max_recently_queried_series_lookback"><a href="#limits_max_recently_queried_series_lookback"><strong>limits.max_recently_queried_series_lookback</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">The lookback period for 'max_recently_queried_series_blocks' and 'max_recently_queried_series_disk_bytes_read'.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="m3"><a href="#m3"><strong>m3</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">M3 specific configuration options</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="m3_tag_options"><a href="#m3_tag_options"><strong>m3.tag_options</strong></a></p><p><code className="type">object</code></p></div>
              <p className="title">M3 Tag Options</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="m3coordinator_enable_graphite_carbon_ingest"><a href="#m3coordinator_enable_graphite_carbon_ingest"><strong>m3coordinator_enable_graphite_carbon_ingest</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable Graphite ingestion using Carbon plaintext protocol</p>
        <div className="description"><p>Enables access to Graphite Carbon plaintext metrics ingestion. It can be enabled only for services inside VPCs. The metrics are written to aggregated namespaces only.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="private_access"><a href="#private_access"><strong>private_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_m3coordinator"><a href="#private_access_m3coordinator"><strong>private_access.m3coordinator</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to m3coordinator with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name" id="public_access_m3coordinator"><a href="#public_access_m3coordinator"><strong>public_access.m3coordinator</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to m3coordinator from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="additional_backup_regions"><a href="#additional_backup_regions"><strong>additional_backup_regions</strong></a></p><p><code className="type">array</code></p></div>
        <p className="title">Additional Cloud Regions for Backup Replication</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="m3_version"><a href="#m3_version"><strong>m3_version</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">M3 major version (deprecated, use m3db_version)</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="m3db_version"><a href="#m3db_version"><strong>m3db_version</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">M3 major version (the minimum compatible version)</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="namespaces"><a href="#namespaces"><strong>namespaces</strong></a></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p className="title">List of M3 namespaces</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="rules"><a href="#rules"><strong>rules</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">M3 rules</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="rules_mapping"><a href="#rules_mapping"><strong>rules.mapping</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">List of M3 mapping rules</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="service_to_fork_from"><a href="#service_to_fork_from"><strong>service_to_fork_from</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="project_to_fork_from"><a href="#project_to_fork_from"><strong>project_to_fork_from</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    