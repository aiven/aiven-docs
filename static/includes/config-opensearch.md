
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
        <div class="param"><p class="name"><strong>opensearch_version</strong></p><p><code class="type">string,null</code></p></div>
        <p class="title">OpenSearch major version</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>disable_replication_factor_adjustment</strong></p><p><code class="type">boolean,null</code></p></div>
        <p class="title">Disable replication factor adjustment</p>
        <div class="description"><p>DEPRECATED: Disable automatic replication factor adjustment for multi-node services. By default, Aiven ensures all indexes are replicated at least to two nodes. Note: Due to potential data loss in case of losing a service node, this setting can no longer be activated.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
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
        <div class="param"><p class="name"><strong>saml</strong></p><p><code class="type">object</code></p></div>
        <p class="title">OpenSearch SAML configuration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.enabled</strong></p><p><code class="type">boolean</code></p></div><div class="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p class="title">Enable or disable OpenSearch SAML authentication</p>
              <div class="description"><p>Enables or disables SAML-based authentication for OpenSearch. When enabled, users can authenticate using SAML with an Identity Provider.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.idp_metadata_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Identity Provider (IdP) SAML metadata URL</p>
              <div class="description"><p>The URL of the SAML metadata for the Identity Provider (IdP). This is used to configure SAML-based authentication with the IdP.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.idp_entity_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Identity Provider Entity ID</p>
              <div class="description"><p>The unique identifier for the Identity Provider (IdP) entity that is used for SAML authentication. This value is typically provided by the IdP.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.sp_entity_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Service Provider Entity ID</p>
              <div class="description"><p>The unique identifier for the Service Provider (SP) entity that is used for SAML authentication. This value is typically provided by the SP.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.subject_key</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">SAML response subject attribute</p>
              <div class="description"><p>Optional. Specifies the attribute in the SAML response where the subject identifier is stored. If not configured, the NameID attribute is used by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.roles_key</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">SAML response role attribute</p>
              <div class="description"><p>Optional. Specifies the attribute in the SAML response where role information is stored, if available. Role attributes are not required for SAML authentication, but can be included in SAML assertions by most Identity Providers (IdPs) to determine user access levels or permissions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>saml.idp_pemtrustedcas_content</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">PEM-encoded root CA Content for SAML IdP server verification</p>
              <div class="description"><p>This parameter specifies the PEM-encoded root certificate authority (CA) content for the SAML identity provider (IdP) server verification. The root CA content is used to verify the SSL/TLS certificate presented by the server.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>openid</strong></p><p><code class="type">object</code></p></div>
        <p class="title">OpenSearch OpenID Connect Configuration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.enabled</strong></p><p><code class="type">boolean</code></p></div><div class="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p class="title">Enable or disable OpenSearch OpenID Connect authentication</p>
              <div class="description"><p>Enables or disables OpenID Connect authentication for OpenSearch. When enabled, users can authenticate using OpenID Connect with an Identity Provider.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.connect_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">OpenID Connect metadata/configuration URL</p>
              <div class="description"><p>The URL of your IdP where the Security plugin can find the OpenID Connect metadata/configuration settings.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.roles_key</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">The key in the JSON payload that stores the user’s roles</p>
              <div class="description"><p>The key in the JSON payload that stores the user’s roles. The value of this key must be a comma-separated list of roles. Required only if you want to use roles in the JWT</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.subject_key</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">The key in the JSON payload that stores the user’s name</p>
              <div class="description"><p>The key in the JSON payload that stores the user’s name. If not defined, the subject registered claim is used. Most IdP providers use the preferred_username claim. Optional.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.jwt_header</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">The HTTP header that stores the token</p>
              <div class="description"><p>The HTTP header that stores the token. Typically the Authorization header with the Bearer schema: Authorization: Bearer &lt;token&gt;. Optional. Default is Authorization.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.jwt_url_parameter</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">URL JWT token.</p>
              <div class="description"><p>If the token is not transmitted in the HTTP header, but as an URL parameter, define the name of the parameter here. Optional.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.refresh_rate_limit_count</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>10</code></li></ul></div>
              <p class="title">The maximum number of unknown key IDs in the time frame</p>
              <div class="description"><p>The maximum number of unknown key IDs in the time frame. Default is 10. Optional.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.refresh_rate_limit_time_window_ms</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>min: <code>10000</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>10000</code></li></ul></div>
              <p class="title">The time frame to use when checking the maximum number of unknown key IDs, in milliseconds</p>
              <div class="description"><p>The time frame to use when checking the maximum number of unknown key IDs, in milliseconds. Optional.Default is 10000 (10 seconds).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.client_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The ID of the OpenID Connect client</p>
              <div class="description"><p>The ID of the OpenID Connect client configured in your IdP. Required.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.client_secret</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The client secret of the OpenID Connect</p>
              <div class="description"><p>The client secret of the OpenID Connect client configured in your IdP. Required.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.scope</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The scope of the identity token issued by the IdP</p>
              <div class="description"><p>The scope of the identity token issued by the IdP. Optional. Default is openid profile email address phone.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>openid.header</strong></p><p><code class="type">string</code></p></div><div class="constraints"><ul><li>default: <code>Authorization</code></li></ul></div>
              <p class="title">HTTP header name of the JWT token</p>
              <div class="description"><p>HTTP header name of the JWT token. Optional. Default is Authorization.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>azure_migration</strong></p><p><code class="type">object</code></p></div>
        
        <div class="description"><p>Azure migration settings</p></div>
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.snapshot_name</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The snapshot name to restore from</p>
              <div class="description"><p>The snapshot name to restore from</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.base_path</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The path to the repository data within its container</p>
              <div class="description"><p>The path to the repository data within its container. The value of this setting should not start or end with a /</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.compress</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Metadata files are stored in compressed format</p>
              <div class="description"><p>when set to true metadata files are stored in compressed format</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.chunk_size</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Chunk size</p>
              <div class="description"><p>Big files can be broken down into chunks during snapshotting if needed. Should be the same as for the 3rd party repository</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.indices</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Indices to restore</p>
              <div class="description"><p>A comma-delimited list of indices to restore from the snapshot. Multi-index syntax is supported. By default, a restore operation includes all data streams and indices in the snapshot. If this argument is provided, the restore operation only includes the data streams and indices that you specify.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.container</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Azure container name</p>
              <div class="description"><p>Azure container name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.account</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Account name</p>
              <div class="description"><p>Azure account name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.key</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Account secret key</p>
              <div class="description"><p>Azure account secret key. One of key or sas_token should be specified</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.sas_token</strong></p><p><code class="type">string</code></p></div>
              <p class="title">SAS token</p>
              <div class="description"><p>A shared access signatures (SAS) token. One of key or sas_token should be specified</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>azure_migration.endpoint_suffix</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Endpoint suffix</p>
              <div class="description"><p>Defines the DNS suffix for Azure Storage endpoints.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>gcs_migration</strong></p><p><code class="type">object</code></p></div>
        
        <div class="description"><p>Google Cloud Storage migration settings</p></div>
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.snapshot_name</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The snapshot name to restore from</p>
              <div class="description"><p>The snapshot name to restore from</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.base_path</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The path to the repository data within its container</p>
              <div class="description"><p>The path to the repository data within its container. The value of this setting should not start or end with a /</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.compress</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Metadata files are stored in compressed format</p>
              <div class="description"><p>when set to true metadata files are stored in compressed format</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.chunk_size</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Chunk size</p>
              <div class="description"><p>Big files can be broken down into chunks during snapshotting if needed. Should be the same as for the 3rd party repository</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.indices</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Indices to restore</p>
              <div class="description"><p>A comma-delimited list of indices to restore from the snapshot. Multi-index syntax is supported. By default, a restore operation includes all data streams and indices in the snapshot. If this argument is provided, the restore operation only includes the data streams and indices that you specify.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.bucket</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The path to the repository data within its container</p>
              <div class="description"><p>Google Cloud Storage bucket name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>gcs_migration.credentials</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Credentials</p>
              <div class="description"><p>Google Cloud Storage credentials file content</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>s3_migration</strong></p><p><code class="type">object</code></p></div>
        
        <div class="description"><p>AWS S3 / AWS S3 compatible migration settings</p></div>
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.snapshot_name</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The snapshot name to restore from</p>
              <div class="description"><p>The snapshot name to restore from</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.base_path</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The path to the repository data within its container</p>
              <div class="description"><p>The path to the repository data within its container. The value of this setting should not start or end with a /</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.compress</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Metadata files are stored in compressed format</p>
              <div class="description"><p>when set to true metadata files are stored in compressed format</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.chunk_size</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Chunk size</p>
              <div class="description"><p>Big files can be broken down into chunks during snapshotting if needed. Should be the same as for the 3rd party repository</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.indices</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Indices to restore</p>
              <div class="description"><p>A comma-delimited list of indices to restore from the snapshot. Multi-index syntax is supported. By default, a restore operation includes all data streams and indices in the snapshot. If this argument is provided, the restore operation only includes the data streams and indices that you specify.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.bucket</strong></p><p><code class="type">string</code></p></div>
              <p class="title">S3 bucket name</p>
              <div class="description"><p>S3 bucket name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.region</strong></p><p><code class="type">string</code></p></div>
              <p class="title">S3 region</p>
              <div class="description"><p>S3 region</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.endpoint</strong></p><p><code class="type">string</code></p></div>
              <p class="title">The S3 service endpoint to connect</p>
              <div class="description"><p>The S3 service endpoint to connect to. If you are using an S3-compatible service then you should set this to the service’s endpoint</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.server_side_encryption</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Server side encryption</p>
              <div class="description"><p>When set to true files are encrypted on server side</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.access_key</strong></p><p><code class="type">string</code></p></div>
              <p class="title">AWS Access key</p>
              <div class="description"><p>AWS Access key</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>s3_migration.secret_key</strong></p><p><code class="type">string</code></p></div>
              <p class="title">AWS secret key</p>
              <div class="description"><p>AWS secret key</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>index_patterns</strong></p><p><code class="type">array</code></p></div>
        <p class="title">Index patterns</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>max_index_count</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
        <p class="title">Maximum index count</p>
        <div class="description"><p>DEPRECATED: use index_patterns instead</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>keep_index_refresh_interval</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Don't reset index.refresh_interval to the default value</p>
        <div class="description"><p>Aiven automation resets index.refresh_interval to default value for every index to be sure that indices are always visible to search. If it doesn't fit your case, you can disable this by setting up this flag to true.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>opensearch_dashboards</strong></p><p><code class="type">object</code></p></div>
        <p class="title">OpenSearch Dashboards settings</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch_dashboards.enabled</strong></p><p><code class="type">boolean</code></p></div><div class="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p class="title">Enable or disable OpenSearch Dashboards</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch_dashboards.max_old_space_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>64</code></li><li>max: <code>2048</code></li><li>default: <code>128</code></li></ul></div>
              <p class="title">max_old_space_size</p>
              <div class="description"><p>Limits the maximum amount of memory (in MiB) the OpenSearch Dashboards process can use. This sets the max_old_space_size option of the nodejs running the OpenSearch Dashboards. Note: the memory reserved by OpenSearch Dashboards is not available for OpenSearch.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch_dashboards.opensearch_request_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>5000</code></li><li>max: <code>120000</code></li><li>default: <code>30000</code></li></ul></div>
              <p class="title">Timeout in milliseconds for requests made by OpenSearch Dashboards towards OpenSearch</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>index_rollup</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Index rollup settings</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_rollup.rollup_search_backoff_millis</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li></ul></div>
              <p class="title">plugins.rollup.search.backoff_millis</p>
              <div class="description"><p>The backoff time between retries for failed rollup jobs. Defaults to 1000ms.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_rollup.rollup_search_backoff_count</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li></ul></div>
              <p class="title">plugins.rollup.search.backoff_count</p>
              <div class="description"><p>How many retries the plugin should attempt for failed rollup jobs. Defaults to 5.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_rollup.rollup_search_search_all_jobs</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">plugins.rollup.search.all_jobs</p>
              <div class="description"><p>Whether OpenSearch should return all jobs that match all specified search terms. If disabled, OpenSearch returns just one, as opposed to all, of the jobs that matches the search terms. Defaults to false.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_rollup.rollup_dashboards_enabled</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">plugins.rollup.dashboards.enabled</p>
              <div class="description"><p>Whether rollups are enabled in OpenSearch Dashboards. Defaults to true.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_rollup.rollup_enabled</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">plugins.rollup.enabled</p>
              <div class="description"><p>Whether the rollup plugin is enabled. Defaults to true.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>opensearch</strong></p><p><code class="type">object</code></p></div>
        <p class="title">OpenSearch settings</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.reindex_remote_whitelist</strong></p><p><code class="type">array,null</code></p></div>
              <p class="title">reindex_remote_whitelist</p>
              <div class="description"><p>Whitelisted addresses for reindexing. Changing this value will cause all OpenSearch instances to restart.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.http_max_content_length</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">http.max_content_length</p>
              <div class="description"><p>Maximum content length for HTTP requests to the OpenSearch HTTP API, in bytes.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.http_max_header_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>262144</code></li></ul></div>
              <p class="title">http.max_header_size</p>
              <div class="description"><p>The max size of allowed headers, in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.http_max_initial_line_length</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>65536</code></li></ul></div>
              <p class="title">http.max_initial_line_length</p>
              <div class="description"><p>The max length of an HTTP URL, in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_query_bool_max_clause_count</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>64</code></li><li>max: <code>4096</code></li></ul></div>
              <p class="title">indices.query.bool.max_clause_count</p>
              <div class="description"><p>Maximum number of clauses Lucene BooleanQuery can have. The default value (1024) is relatively high, and increasing it may cause performance issues. Investigate other approaches first before increasing this value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.search_max_buckets</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000000</code></li></ul></div>
              <p class="title">search.max_buckets</p>
              <div class="description"><p>Maximum number of aggregation buckets allowed in a single response. OpenSearch default value is used when this is not defined.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_fielddata_cache_size</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>min: <code>3</code></li><li>max: <code>100</code></li></ul></div>
              <p class="title">indices.fielddata.cache.size</p>
              <div class="description"><p>Relative amount. Maximum amount of heap memory used for field data cache. This is an expert setting; decreasing the value too much will increase overhead of loading field data; too much memory used for field data cache will decrease amount of heap available for other operations.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_memory_index_buffer_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>3</code></li><li>max: <code>40</code></li></ul></div>
              <p class="title">indices.memory.index_buffer_size</p>
              <div class="description"><p>Percentage value. Default is 10%. Total amount of heap used for indexing buffer, before writing segments to disk. This is an expert setting. Too low value will slow down indexing; too high value will increase indexing performance but causes performance issues for query performance.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_memory_min_index_buffer_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>3</code></li><li>max: <code>2048</code></li></ul></div>
              <p class="title">indices.memory.min_index_buffer_size</p>
              <div class="description"><p>Absolute value. Default is 48mb. Doesn't work without indices.memory.index_buffer_size. Minimum amount of heap used for query cache, an absolute indices.memory.index_buffer_size minimal hard limit.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_memory_max_index_buffer_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>3</code></li><li>max: <code>2048</code></li></ul></div>
              <p class="title">indices.memory.max_index_buffer_size</p>
              <div class="description"><p>Absolute value. Default is unbound. Doesn't work without indices.memory.index_buffer_size. Maximum amount of heap used for query cache, an absolute indices.memory.index_buffer_size maximum hard limit.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_queries_cache_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>3</code></li><li>max: <code>40</code></li></ul></div>
              <p class="title">indices.queries.cache.size</p>
              <div class="description"><p>Percentage value. Default is 10%. Maximum amount of heap used for query cache. This is an expert setting. Too low value will decrease query performance and increase performance for other operations; too high value will cause issues with other OpenSearch functionality.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_recovery_max_bytes_per_sec</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>40</code></li><li>max: <code>400</code></li></ul></div>
              <p class="title">indices.recovery.max_bytes_per_sec</p>
              <div class="description"><p>Limits total inbound and outbound recovery traffic for each node. Applies to both peer recoveries as well as snapshot recoveries (i.e., restores from a snapshot). Defaults to 40mb</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.indices_recovery_max_concurrent_file_chunks</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>2</code></li><li>max: <code>5</code></li></ul></div>
              <p class="title">indices.recovery.max_concurrent_file_chunks</p>
              <div class="description"><p>Number of file chunks sent in parallel for each recovery. Defaults to 2.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.action_auto_create_index_enabled</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">action.auto_create_index</p>
              <div class="description"><p>Explicitly allow or block automatic creation of indices. Defaults to true</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.plugins_alerting_filter_by_backend_roles</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">plugins.alerting.filter_by_backend_roles</p>
              <div class="description"><p>Enable or disable filtering of alerting by backend roles. Requires Security plugin. Defaults to false</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.knn_memory_circuit_breaker_limit</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>3</code></li><li>max: <code>100</code></li></ul></div>
              <p class="title">knn.memory.circuit_breaker.limit</p>
              <div class="description"><p>Maximum amount of memory that can be used for KNN index. Defaults to 50% of the JVM heap size.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.knn_memory_circuit_breaker_enabled</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">knn.memory.circuit_breaker.enabled</p>
              <div class="description"><p>Enable or disable KNN memory circuit breaker. Defaults to true.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.auth_failure_listeners</strong></p><p><code class="type">object</code></p></div>
              <p class="title">Opensearch Security Plugin Settings</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.enable_security_audit</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable/Disable security audit</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_search_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p class="title">search thread pool size</p>
              <div class="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_search_throttled_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p class="title">search_throttled thread pool size</p>
              <div class="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_get_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p class="title">get thread pool size</p>
              <div class="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_analyze_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p class="title">analyze thread pool size</p>
              <div class="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_write_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p class="title">write thread pool size</p>
              <div class="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_force_merge_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p class="title">force_merge thread pool size</p>
              <div class="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_search_queue_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p class="title">search thread pool queue size</p>
              <div class="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_search_throttled_queue_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p class="title">search_throttled thread pool queue size</p>
              <div class="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_get_queue_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p class="title">get thread pool queue size</p>
              <div class="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_analyze_queue_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p class="title">analyze thread pool queue size</p>
              <div class="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.thread_pool_write_queue_size</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p class="title">write thread pool queue size</p>
              <div class="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.action_destructive_requires_name</strong></p><p><code class="type">boolean,null</code></p></div>
              <p class="title">Require explicit index names when deleting</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.cluster_max_shards_per_node</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>100</code></li><li>max: <code>10000</code></li></ul></div>
              <p class="title">cluster.max_shards_per_node</p>
              <div class="description"><p>Controls the number of shards allowed in the cluster per data node</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.override_main_response_version</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">compatibility.override_main_response_version</p>
              <div class="description"><p>Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work. Default is false</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.script_max_compilations_rate</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Script max compilation rate - circuit breaker to prevent/minimize OOMs</p>
              <div class="description"><p>Script compilation circuit breaker limits the number of inline script compilations within a period of time. Default is use-context</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.cluster_routing_allocation_node_concurrent_recoveries</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>2</code></li><li>max: <code>16</code></li></ul></div>
              <p class="title">Concurrent incoming/outgoing shard recoveries per node</p>
              <div class="description"><p>How many concurrent incoming/outgoing shard recoveries (normally replicas) are allowed to happen on a node. Defaults to node cpu count * 2.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.email_sender_name</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Sender name placeholder to be used in Opensearch Dashboards and Opensearch keystore</p>
              <div class="description"><p>This should be identical to the Sender name defined in Opensearch dashboards</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.email_sender_username</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Sender username for Opensearch alerts</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.email_sender_password</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Sender password for Opensearch alerts to authenticate with SMTP server</p>
              <div class="description"><p>Sender password for Opensearch alerts to authenticate with SMTP server</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.ism_enabled</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Specifies whether ISM is enabled or not</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.ism_history_enabled</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Specifies whether audit history is enabled or not. The logs from ISM are automatically indexed to a logs document.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.ism_history_max_age</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">The maximum age before rolling over the audit history index in hours</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.ism_history_max_docs</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p class="title">The maximum number of documents before rolling over the audit history index.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.ism_history_rollover_check_period</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">The time between rollover checks for the audit history index in hours.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>opensearch.ism_history_rollover_retention_period</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p class="title">How long audit history indices are kept in days.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>index_template</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Template settings for all new indexes</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_template.mapping_nested_objects_limit</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>max: <code>100000</code></li></ul></div>
              <p class="title">index.mapping.nested_objects.limit</p>
              <div class="description"><p>The maximum number of nested JSON objects that a single document can contain across all nested types. This limit helps to prevent out of memory errors when a document contains too many nested objects. Default is 10000.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_template.number_of_shards</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
              <p class="title">index.number_of_shards</p>
              <div class="description"><p>The number of primary shards that an index should have.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>index_template.number_of_replicas</strong></p><p><code class="type">integer,null</code></p></div><div class="constraints"><ul><li>max: <code>29</code></li></ul></div>
              <p class="title">index.number_of_replicas</p>
              <div class="description"><p>The number of replicas each primary shard has.</p></div>
            </td>
          </tr>
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
              <div class="param"><p class="name"><strong>private_access.opensearch</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to opensearch with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>private_access.opensearch_dashboards</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to opensearch_dashboards with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
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
        <div class="param"><p class="name"><strong>privatelink_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service components through Privatelink</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.opensearch</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable opensearch</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>privatelink_access.opensearch_dashboards</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable opensearch_dashboards</p>
              
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
    <tr>
      <td>
        <div class="param"><p class="name"><strong>public_access</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Allow access to selected service ports from the public Internet</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.opensearch</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to opensearch from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>public_access.opensearch_dashboards</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to opensearch_dashboards from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
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
        <div class="param"><p class="name"><strong>recovery_basebackup_name</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Name of the basebackup to restore in forked service</p>
        
        <table class="service-param-children">
          <tbody>
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
    