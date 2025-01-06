
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name"><Link id="custom_domain"/><Link to="#custom_domain"><strong>custom_domain</strong></Link></p><p><code className="type">string,null</code></p></div>
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
        <div className="param"><p className="name"><Link id="limits"/><Link to="#limits"><strong>limits</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">M3 limits</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="limits_query_series"/><Link to="#limits_query_series"><strong>limits.query_series</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10000</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of series fetched in single query.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="limits_query_docs"/><Link to="#limits_query_docs"><strong>limits.query_docs</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of docs fetched in single query.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="limits_query_require_exhaustive"/><Link to="#limits_query_require_exhaustive"><strong>limits.query_require_exhaustive</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Require exhaustive result</p>
              <div className="description"><p>When query limits are exceeded, whether to return error or return partial results.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="limits_max_recently_queried_series_disk_bytes_read"/><Link to="#limits_max_recently_queried_series_disk_bytes_read"><strong>limits.max_recently_queried_series_disk_bytes_read</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of disk bytes that can be read in a given lookback period.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="limits_max_recently_queried_series_blocks"/><Link to="#limits_max_recently_queried_series_blocks"><strong>limits.max_recently_queried_series_blocks</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of blocks that can be read in a given lookback period.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="limits_max_recently_queried_series_lookback"/><Link to="#limits_max_recently_queried_series_lookback"><strong>limits.max_recently_queried_series_lookback</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">The lookback period for 'max_recently_queried_series_blocks' and 'max_recently_queried_series_disk_bytes_read'.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="m3"/><Link to="#m3"><strong>m3</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">M3 specific configuration options</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="m3_tag_options"/><Link to="#m3_tag_options"><strong>m3.tag_options</strong></Link></p><p><code className="type">object</code></p></div>
              <p className="title">M3 Tag Options</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="m3coordinator_enable_graphite_carbon_ingest"/><Link to="#m3coordinator_enable_graphite_carbon_ingest"><strong>m3coordinator_enable_graphite_carbon_ingest</strong></Link></p><p><code className="type">boolean</code></p></div>
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
        <div className="param"><p className="name"><Link id="private_access"/><Link to="#private_access"><strong>private_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_m3coordinator"/><Link to="#private_access_m3coordinator"><strong>private_access.m3coordinator</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to m3coordinator with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div className="param"><p className="name"><Link id="public_access_m3coordinator"/><Link to="#public_access_m3coordinator"><strong>public_access.m3coordinator</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to m3coordinator from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div className="param"><p className="name"><Link id="m3_version"/><Link to="#m3_version"><strong>m3_version</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">M3 major version (deprecated, use m3db_version)</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="m3db_version"/><Link to="#m3db_version"><strong>m3db_version</strong></Link></p><p><code className="type">string,null</code></p></div>
        <p className="title">M3 major version (the minimum compatible version)</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="namespaces"/><Link to="#namespaces"><strong>namespaces</strong></Link></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p className="title">List of M3 namespaces</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="rules"/><Link to="#rules"><strong>rules</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">M3 rules</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="rules_mapping"/><Link to="#rules_mapping"><strong>rules.mapping</strong></Link></p><p><code className="type">array</code></p></div>
              <p className="title">List of M3 mapping rules</p>
              
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
  </tbody>
</table>
    