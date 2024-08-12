
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div class="param"><p class="name"><strong>custom_domain</strong></p><p><code class="type">string,null</code></p></div>
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
        <div class="param"><p class="name"><strong>limits</strong></p><p><code class="type">object</code></p></div>
        <p class="title">M3 limits</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>limits.query_series</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10000</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p class="title">The maximum number of series fetched in single query.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>limits.query_docs</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p class="title">The maximum number of docs fetched in single query.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>limits.query_require_exhaustive</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Require exhaustive result</p>
              <div class="description"><p>When query limits are exceeded, whether to return error or return partial results.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>limits.max_recently_queried_series_disk_bytes_read</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p class="title">The maximum number of disk bytes that can be read in a given lookback period.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>limits.max_recently_queried_series_blocks</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p class="title">The maximum number of blocks that can be read in a given lookback period.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>limits.max_recently_queried_series_lookback</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The lookback period for 'max_recently_queried_series_blocks' and 'max_recently_queried_series_disk_bytes_read'.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>m3</strong></p><p><code class="type">object</code></p></div>
        <p class="title">M3 specific configuration options</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>m3.tag_options</strong></p><p><code class="type">object</code></p></div>
              <p class="title">M3 Tag Options</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>m3coordinator_enable_graphite_carbon_ingest</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable Graphite ingestion using Carbon plaintext protocol</p>
        <div class="description"><p>Enables access to Graphite Carbon plaintext metrics ingestion. It can be enabled only for services inside VPCs. The metrics are written to aggregated namespaces only.</p></div>
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
              <div class="param"><p class="name"><strong>private_access.m3coordinator</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to m3coordinator with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div class="param"><p class="name"><strong>public_access.m3coordinator</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to m3coordinator from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div class="param"><p class="name"><strong>m3_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">M3 major version (deprecated, use m3db_version)</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>m3db_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">M3 major version (the minimum compatible version)</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>namespaces</strong></p><p><code class="type">array</code></p></div><div class="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p class="title">List of M3 namespaces</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>rules</strong></p><p><code class="type">object</code></p></div>
        <p class="title">M3 rules</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>rules.mapping</strong></p><p><code class="type">array</code></p></div>
              <p class="title">List of M3 mapping rules</p>
              
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
  </tbody>
</table>
    