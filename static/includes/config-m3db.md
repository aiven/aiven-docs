
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
  <td>
    <p class="name">
      <b>custom_domain</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Custom domain</p>
    <div class="description">Serve the web frontend using a custom CNAME pointing to the Aiven DNS name</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>ip_filter</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">IP filter</p>
    <div class="description">Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_log</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Service logging</p>
    <div class="description">Store logs for the service so that they are available in the HTTP API and console.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>static_ips</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Static IP addresses</p>
    <div class="description">Use static public IP addresses</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>limits</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">M3 limits</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>query_series</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10000</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The maximum number of series fetched in single query.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>query_docs</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The maximum number of docs fetched in single query.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>query_require_exhaustive</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Require exhaustive result</p>
          <div class="description">When query limits are exceeded, whether to return error or return partial results.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_recently_queried_series_disk_bytes_read</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The maximum number of disk bytes that can be read in a given lookback period.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_recently_queried_series_blocks</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The maximum number of blocks that can be read in a given lookback period.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_recently_queried_series_lookback</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The lookback period for 'max_recently_queried_series_blocks' and 'max_recently_queried_series_disk_bytes_read'.</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>m3</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">M3 specific configuration options</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>tag_options</b>&nbsp;<code class="type">object</code>
          </p>
          <p class="title">M3 Tag Options</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>m3coordinator_enable_graphite_carbon_ingest</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable Graphite ingestion using Carbon plaintext protocol</p>
    <div class="description">Enables access to Graphite Carbon plaintext metrics ingestion. It can be enabled only for services inside VPCs. The metrics are written to aggregated namespaces only.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>private_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from private networks</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>m3coordinator</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to m3coordinator with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>public_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from the public Internet</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>m3coordinator</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to m3coordinator from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>additional_backup_regions</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">Additional Cloud Regions for Backup Replication</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>m3_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">M3 major version (deprecated, use m3db_version)</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>m3db_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">M3 major version (the minimum compatible version)</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>namespaces</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">List of M3 namespaces</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>rules</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">M3 rules</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>mapping</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">List of M3 mapping rules</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>project_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
</table>
    