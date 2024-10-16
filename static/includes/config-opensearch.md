
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="additional_backup_regions"><strong>additional_backup_regions</strong></p><p><code className="type">array</code></p><a href="#additional_backup_regions">#</a></div>
        <p className="title">Additional Cloud Regions for Backup Replication</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="opensearch_version"><strong>opensearch_version</strong></p><p><code className="type">string,null</code></p><a href="#opensearch_version">#</a></div>
        <p className="title">OpenSearch major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="disable_replication_factor_adjustment"><strong>disable_replication_factor_adjustment</strong></p><p><code className="type">boolean,null</code></p><a href="#disable_replication_factor_adjustment">#</a></div>
        <p className="title">Disable replication factor adjustment</p>
        <div className="description"><p>DEPRECATED: Disable automatic replication factor adjustment for multi-node services. By default, Aiven ensures all indexes are replicated at least to two nodes. Note: Due to potential data loss in case of losing a service node, this setting can no longer be activated.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="custom_domain"><strong>custom_domain</strong></p><p><code className="type">string,null</code></p><a href="#custom_domain">#</a></div>
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
        <div className="param"><p className="name" id="ip_filter"><strong>ip_filter</strong></p><p><code className="type">array</code></p><a href="#ip_filter">#</a></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
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
        <div className="param"><p className="name" id="service_log"><strong>service_log</strong></p><p><code className="type">boolean,null</code></p><a href="#service_log">#</a></div>
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
        <div className="param"><p className="name" id="static_ips"><strong>static_ips</strong></p><p><code className="type">boolean</code></p><a href="#static_ips">#</a></div>
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
        <div className="param"><p className="name" id="saml"><strong>saml</strong></p><p><code className="type">object</code></p><a href="#saml">#</a></div>
        <p className="title">OpenSearch SAML configuration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_enabled"><strong>saml.enabled</strong></p><p><code className="type">boolean</code></p><a href="#saml_enabled">#</a></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable or disable OpenSearch SAML authentication</p>
              <div className="description"><p>Enables or disables SAML-based authentication for OpenSearch. When enabled, users can authenticate using SAML with an Identity Provider.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_idp_metadata_url"><strong>saml.idp_metadata_url</strong></p><p><code className="type">string</code></p><a href="#saml_idp_metadata_url">#</a></div>
              <p className="title">Identity Provider (IdP) SAML metadata URL</p>
              <div className="description"><p>The URL of the SAML metadata for the Identity Provider (IdP). This is used to configure SAML-based authentication with the IdP.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_idp_entity_id"><strong>saml.idp_entity_id</strong></p><p><code className="type">string</code></p><a href="#saml_idp_entity_id">#</a></div>
              <p className="title">Identity Provider Entity ID</p>
              <div className="description"><p>The unique identifier for the Identity Provider (IdP) entity that is used for SAML authentication. This value is typically provided by the IdP.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_sp_entity_id"><strong>saml.sp_entity_id</strong></p><p><code className="type">string</code></p><a href="#saml_sp_entity_id">#</a></div>
              <p className="title">Service Provider Entity ID</p>
              <div className="description"><p>The unique identifier for the Service Provider (SP) entity that is used for SAML authentication. This value is typically provided by the SP.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_subject_key"><strong>saml.subject_key</strong></p><p><code className="type">string,null</code></p><a href="#saml_subject_key">#</a></div>
              <p className="title">SAML response subject attribute</p>
              <div className="description"><p>Optional. Specifies the attribute in the SAML response where the subject identifier is stored. If not configured, the NameID attribute is used by default.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_roles_key"><strong>saml.roles_key</strong></p><p><code className="type">string,null</code></p><a href="#saml_roles_key">#</a></div>
              <p className="title">SAML response role attribute</p>
              <div className="description"><p>Optional. Specifies the attribute in the SAML response where role information is stored, if available. Role attributes are not required for SAML authentication, but can be included in SAML assertions by most Identity Providers (IdPs) to determine user access levels or permissions.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="saml_idp_pemtrustedcas_content"><strong>saml.idp_pemtrustedcas_content</strong></p><p><code className="type">string,null</code></p><a href="#saml_idp_pemtrustedcas_content">#</a></div>
              <p className="title">PEM-encoded root CA Content for SAML IdP server verification</p>
              <div className="description"><p>This parameter specifies the PEM-encoded root certificate authority (CA) content for the SAML identity provider (IdP) server verification. The root CA content is used to verify the SSL/TLS certificate presented by the server.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="openid"><strong>openid</strong></p><p><code className="type">object</code></p><a href="#openid">#</a></div>
        <p className="title">OpenSearch OpenID Connect Configuration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_enabled"><strong>openid.enabled</strong></p><p><code className="type">boolean</code></p><a href="#openid_enabled">#</a></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable or disable OpenSearch OpenID Connect authentication</p>
              <div className="description"><p>Enables or disables OpenID Connect authentication for OpenSearch. When enabled, users can authenticate using OpenID Connect with an Identity Provider.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_connect_url"><strong>openid.connect_url</strong></p><p><code className="type">string</code></p><a href="#openid_connect_url">#</a></div>
              <p className="title">OpenID Connect metadata/configuration URL</p>
              <div className="description"><p>The URL of your IdP where the Security plugin can find the OpenID Connect metadata/configuration settings.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_roles_key"><strong>openid.roles_key</strong></p><p><code className="type">string,null</code></p><a href="#openid_roles_key">#</a></div>
              <p className="title">The key in the JSON payload that stores the user’s roles</p>
              <div className="description"><p>The key in the JSON payload that stores the user’s roles. The value of this key must be a comma-separated list of roles. Required only if you want to use roles in the JWT</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_subject_key"><strong>openid.subject_key</strong></p><p><code className="type">string,null</code></p><a href="#openid_subject_key">#</a></div>
              <p className="title">The key in the JSON payload that stores the user’s name</p>
              <div className="description"><p>The key in the JSON payload that stores the user’s name. If not defined, the subject registered claim is used. Most IdP providers use the preferred_username claim. Optional.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_jwt_header"><strong>openid.jwt_header</strong></p><p><code className="type">string,null</code></p><a href="#openid_jwt_header">#</a></div>
              <p className="title">The HTTP header that stores the token</p>
              <div className="description"><p>The HTTP header that stores the token. Typically the Authorization header with the Bearer schema: Authorization: Bearer &lt;token&gt;. Optional. Default is Authorization.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_jwt_url_parameter"><strong>openid.jwt_url_parameter</strong></p><p><code className="type">string,null</code></p><a href="#openid_jwt_url_parameter">#</a></div>
              <p className="title">URL JWT token.</p>
              <div className="description"><p>If the token is not transmitted in the HTTP header, but as an URL parameter, define the name of the parameter here. Optional.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_refresh_rate_limit_count"><strong>openid.refresh_rate_limit_count</strong></p><p><code className="type">integer,null</code></p><a href="#openid_refresh_rate_limit_count">#</a></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>10</code></li></ul></div>
              <p className="title">The maximum number of unknown key IDs in the time frame</p>
              <div className="description"><p>The maximum number of unknown key IDs in the time frame. Default is 10. Optional.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_refresh_rate_limit_time_window_ms"><strong>openid.refresh_rate_limit_time_window_ms</strong></p><p><code className="type">integer,null</code></p><a href="#openid_refresh_rate_limit_time_window_ms">#</a></div><div className="constraints"><ul><li>min: <code>10000</code></li><li>max: <code>9223372036854776000</code></li><li>default: <code>10000</code></li></ul></div>
              <p className="title">The time frame to use when checking the maximum number of unknown key IDs, in milliseconds</p>
              <div className="description"><p>The time frame to use when checking the maximum number of unknown key IDs, in milliseconds. Optional.Default is 10000 (10 seconds).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_client_id"><strong>openid.client_id</strong></p><p><code className="type">string</code></p><a href="#openid_client_id">#</a></div>
              <p className="title">The ID of the OpenID Connect client</p>
              <div className="description"><p>The ID of the OpenID Connect client configured in your IdP. Required.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_client_secret"><strong>openid.client_secret</strong></p><p><code className="type">string</code></p><a href="#openid_client_secret">#</a></div>
              <p className="title">The client secret of the OpenID Connect</p>
              <div className="description"><p>The client secret of the OpenID Connect client configured in your IdP. Required.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_scope"><strong>openid.scope</strong></p><p><code className="type">string</code></p><a href="#openid_scope">#</a></div>
              <p className="title">The scope of the identity token issued by the IdP</p>
              <div className="description"><p>The scope of the identity token issued by the IdP. Optional. Default is openid profile email address phone.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="openid_header"><strong>openid.header</strong></p><p><code className="type">string</code></p><a href="#openid_header">#</a></div><div className="constraints"><ul><li>default: <code>Authorization</code></li></ul></div>
              <p className="title">HTTP header name of the JWT token</p>
              <div className="description"><p>HTTP header name of the JWT token. Optional. Default is Authorization.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="azure_migration"><strong>azure_migration</strong></p><p><code className="type">object</code></p><a href="#azure_migration">#</a></div>
        
        <div className="description"><p>Azure migration settings</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_snapshot_name"><strong>azure_migration.snapshot_name</strong></p><p><code className="type">string</code></p><a href="#azure_migration_snapshot_name">#</a></div>
              <p className="title">The snapshot name to restore from</p>
              <div className="description"><p>The snapshot name to restore from</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_base_path"><strong>azure_migration.base_path</strong></p><p><code className="type">string</code></p><a href="#azure_migration_base_path">#</a></div>
              <p className="title">The path to the repository data within its container</p>
              <div className="description"><p>The path to the repository data within its container. The value of this setting should not start or end with a /</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_compress"><strong>azure_migration.compress</strong></p><p><code className="type">boolean</code></p><a href="#azure_migration_compress">#</a></div>
              <p className="title">Metadata files are stored in compressed format</p>
              <div className="description"><p>when set to true metadata files are stored in compressed format</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_chunk_size"><strong>azure_migration.chunk_size</strong></p><p><code className="type">string</code></p><a href="#azure_migration_chunk_size">#</a></div>
              <p className="title">Chunk size</p>
              <div className="description"><p>Big files can be broken down into chunks during snapshotting if needed. Should be the same as for the 3rd party repository</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_indices"><strong>azure_migration.indices</strong></p><p><code className="type">string</code></p><a href="#azure_migration_indices">#</a></div>
              <p className="title">Indices to restore</p>
              <div className="description"><p>A comma-delimited list of indices to restore from the snapshot. Multi-index syntax is supported. By default, a restore operation includes all data streams and indices in the snapshot. If this argument is provided, the restore operation only includes the data streams and indices that you specify.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_container"><strong>azure_migration.container</strong></p><p><code className="type">string</code></p><a href="#azure_migration_container">#</a></div>
              <p className="title">Azure container name</p>
              <div className="description"><p>Azure container name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_account"><strong>azure_migration.account</strong></p><p><code className="type">string</code></p><a href="#azure_migration_account">#</a></div>
              <p className="title">Account name</p>
              <div className="description"><p>Azure account name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_key"><strong>azure_migration.key</strong></p><p><code className="type">string</code></p><a href="#azure_migration_key">#</a></div>
              <p className="title">Account secret key</p>
              <div className="description"><p>Azure account secret key. One of key or sas_token should be specified</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_sas_token"><strong>azure_migration.sas_token</strong></p><p><code className="type">string</code></p><a href="#azure_migration_sas_token">#</a></div>
              <p className="title">SAS token</p>
              <div className="description"><p>A shared access signatures (SAS) token. One of key or sas_token should be specified</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="azure_migration_endpoint_suffix"><strong>azure_migration.endpoint_suffix</strong></p><p><code className="type">string</code></p><a href="#azure_migration_endpoint_suffix">#</a></div>
              <p className="title">Endpoint suffix</p>
              <div className="description"><p>Defines the DNS suffix for Azure Storage endpoints.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="gcs_migration"><strong>gcs_migration</strong></p><p><code className="type">object</code></p><a href="#gcs_migration">#</a></div>
        
        <div className="description"><p>Google Cloud Storage migration settings</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_snapshot_name"><strong>gcs_migration.snapshot_name</strong></p><p><code className="type">string</code></p><a href="#gcs_migration_snapshot_name">#</a></div>
              <p className="title">The snapshot name to restore from</p>
              <div className="description"><p>The snapshot name to restore from</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_base_path"><strong>gcs_migration.base_path</strong></p><p><code className="type">string</code></p><a href="#gcs_migration_base_path">#</a></div>
              <p className="title">The path to the repository data within its container</p>
              <div className="description"><p>The path to the repository data within its container. The value of this setting should not start or end with a /</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_compress"><strong>gcs_migration.compress</strong></p><p><code className="type">boolean</code></p><a href="#gcs_migration_compress">#</a></div>
              <p className="title">Metadata files are stored in compressed format</p>
              <div className="description"><p>when set to true metadata files are stored in compressed format</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_chunk_size"><strong>gcs_migration.chunk_size</strong></p><p><code className="type">string</code></p><a href="#gcs_migration_chunk_size">#</a></div>
              <p className="title">Chunk size</p>
              <div className="description"><p>Big files can be broken down into chunks during snapshotting if needed. Should be the same as for the 3rd party repository</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_indices"><strong>gcs_migration.indices</strong></p><p><code className="type">string</code></p><a href="#gcs_migration_indices">#</a></div>
              <p className="title">Indices to restore</p>
              <div className="description"><p>A comma-delimited list of indices to restore from the snapshot. Multi-index syntax is supported. By default, a restore operation includes all data streams and indices in the snapshot. If this argument is provided, the restore operation only includes the data streams and indices that you specify.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_bucket"><strong>gcs_migration.bucket</strong></p><p><code className="type">string</code></p><a href="#gcs_migration_bucket">#</a></div>
              <p className="title">The path to the repository data within its container</p>
              <div className="description"><p>Google Cloud Storage bucket name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="gcs_migration_credentials"><strong>gcs_migration.credentials</strong></p><p><code className="type">string</code></p><a href="#gcs_migration_credentials">#</a></div>
              <p className="title">Credentials</p>
              <div className="description"><p>Google Cloud Storage credentials file content</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="s3_migration"><strong>s3_migration</strong></p><p><code className="type">object</code></p><a href="#s3_migration">#</a></div>
        
        <div className="description"><p>AWS S3 / AWS S3 compatible migration settings</p></div>
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_snapshot_name"><strong>s3_migration.snapshot_name</strong></p><p><code className="type">string</code></p><a href="#s3_migration_snapshot_name">#</a></div>
              <p className="title">The snapshot name to restore from</p>
              <div className="description"><p>The snapshot name to restore from</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_base_path"><strong>s3_migration.base_path</strong></p><p><code className="type">string</code></p><a href="#s3_migration_base_path">#</a></div>
              <p className="title">The path to the repository data within its container</p>
              <div className="description"><p>The path to the repository data within its container. The value of this setting should not start or end with a /</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_compress"><strong>s3_migration.compress</strong></p><p><code className="type">boolean</code></p><a href="#s3_migration_compress">#</a></div>
              <p className="title">Metadata files are stored in compressed format</p>
              <div className="description"><p>when set to true metadata files are stored in compressed format</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_chunk_size"><strong>s3_migration.chunk_size</strong></p><p><code className="type">string</code></p><a href="#s3_migration_chunk_size">#</a></div>
              <p className="title">Chunk size</p>
              <div className="description"><p>Big files can be broken down into chunks during snapshotting if needed. Should be the same as for the 3rd party repository</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_indices"><strong>s3_migration.indices</strong></p><p><code className="type">string</code></p><a href="#s3_migration_indices">#</a></div>
              <p className="title">Indices to restore</p>
              <div className="description"><p>A comma-delimited list of indices to restore from the snapshot. Multi-index syntax is supported. By default, a restore operation includes all data streams and indices in the snapshot. If this argument is provided, the restore operation only includes the data streams and indices that you specify.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_bucket"><strong>s3_migration.bucket</strong></p><p><code className="type">string</code></p><a href="#s3_migration_bucket">#</a></div>
              <p className="title">S3 bucket name</p>
              <div className="description"><p>S3 bucket name</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_region"><strong>s3_migration.region</strong></p><p><code className="type">string</code></p><a href="#s3_migration_region">#</a></div>
              <p className="title">S3 region</p>
              <div className="description"><p>S3 region</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_endpoint"><strong>s3_migration.endpoint</strong></p><p><code className="type">string</code></p><a href="#s3_migration_endpoint">#</a></div>
              <p className="title">The S3 service endpoint to connect</p>
              <div className="description"><p>The S3 service endpoint to connect to. If you are using an S3-compatible service then you should set this to the service’s endpoint</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_server_side_encryption"><strong>s3_migration.server_side_encryption</strong></p><p><code className="type">boolean</code></p><a href="#s3_migration_server_side_encryption">#</a></div>
              <p className="title">Server side encryption</p>
              <div className="description"><p>When set to true files are encrypted on server side</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_access_key"><strong>s3_migration.access_key</strong></p><p><code className="type">string</code></p><a href="#s3_migration_access_key">#</a></div>
              <p className="title">AWS Access key</p>
              <div className="description"><p>AWS Access key</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="s3_migration_secret_key"><strong>s3_migration.secret_key</strong></p><p><code className="type">string</code></p><a href="#s3_migration_secret_key">#</a></div>
              <p className="title">AWS secret key</p>
              <div className="description"><p>AWS secret key</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="index_patterns"><strong>index_patterns</strong></p><p><code className="type">array</code></p><a href="#index_patterns">#</a></div>
        <p className="title">Index patterns</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="max_index_count"><strong>max_index_count</strong></p><p><code className="type">integer</code></p><a href="#max_index_count">#</a></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
        <p className="title">Maximum index count</p>
        <div className="description"><p>DEPRECATED: use index_patterns instead</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="keep_index_refresh_interval"><strong>keep_index_refresh_interval</strong></p><p><code className="type">boolean</code></p><a href="#keep_index_refresh_interval">#</a></div>
        <p className="title">Don't reset index.refresh_interval to the default value</p>
        <div className="description"><p>Aiven automation resets index.refresh_interval to default value for every index to be sure that indices are always visible to search. If it doesn't fit your case, you can disable this by setting up this flag to true.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="opensearch_dashboards"><strong>opensearch_dashboards</strong></p><p><code className="type">object</code></p><a href="#opensearch_dashboards">#</a></div>
        <p className="title">OpenSearch Dashboards settings</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_dashboards_enabled"><strong>opensearch_dashboards.enabled</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_dashboards_enabled">#</a></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable or disable OpenSearch Dashboards</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_dashboards_max_old_space_size"><strong>opensearch_dashboards.max_old_space_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_dashboards_max_old_space_size">#</a></div><div className="constraints"><ul><li>min: <code>64</code></li><li>max: <code>2048</code></li><li>default: <code>128</code></li></ul></div>
              <p className="title">max_old_space_size</p>
              <div className="description"><p>Limits the maximum amount of memory (in MiB) the OpenSearch Dashboards process can use. This sets the max_old_space_size option of the nodejs running the OpenSearch Dashboards. Note: the memory reserved by OpenSearch Dashboards is not available for OpenSearch.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_dashboards_opensearch_request_timeout"><strong>opensearch_dashboards.opensearch_request_timeout</strong></p><p><code className="type">integer</code></p><a href="#opensearch_dashboards_opensearch_request_timeout">#</a></div><div className="constraints"><ul><li>min: <code>5000</code></li><li>max: <code>120000</code></li><li>default: <code>30000</code></li></ul></div>
              <p className="title">Timeout in milliseconds for requests made by OpenSearch Dashboards towards OpenSearch</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="index_rollup"><strong>index_rollup</strong></p><p><code className="type">object</code></p><a href="#index_rollup">#</a></div>
        <p className="title">Index rollup settings</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_rollup_rollup_search_backoff_millis"><strong>index_rollup.rollup_search_backoff_millis</strong></p><p><code className="type">integer</code></p><a href="#index_rollup_rollup_search_backoff_millis">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li></ul></div>
              <p className="title">plugins.rollup.search.backoff_millis</p>
              <div className="description"><p>The backoff time between retries for failed rollup jobs. Defaults to 1000ms.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_rollup_rollup_search_backoff_count"><strong>index_rollup.rollup_search_backoff_count</strong></p><p><code className="type">integer</code></p><a href="#index_rollup_rollup_search_backoff_count">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li></ul></div>
              <p className="title">plugins.rollup.search.backoff_count</p>
              <div className="description"><p>How many retries the plugin should attempt for failed rollup jobs. Defaults to 5.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_rollup_rollup_search_search_all_jobs"><strong>index_rollup.rollup_search_search_all_jobs</strong></p><p><code className="type">boolean</code></p><a href="#index_rollup_rollup_search_search_all_jobs">#</a></div>
              <p className="title">plugins.rollup.search.all_jobs</p>
              <div className="description"><p>Whether OpenSearch should return all jobs that match all specified search terms. If disabled, OpenSearch returns just one, as opposed to all, of the jobs that matches the search terms. Defaults to false.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_rollup_rollup_dashboards_enabled"><strong>index_rollup.rollup_dashboards_enabled</strong></p><p><code className="type">boolean</code></p><a href="#index_rollup_rollup_dashboards_enabled">#</a></div>
              <p className="title">plugins.rollup.dashboards.enabled</p>
              <div className="description"><p>Whether rollups are enabled in OpenSearch Dashboards. Defaults to true.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_rollup_rollup_enabled"><strong>index_rollup.rollup_enabled</strong></p><p><code className="type">boolean</code></p><a href="#index_rollup_rollup_enabled">#</a></div>
              <p className="title">plugins.rollup.enabled</p>
              <div className="description"><p>Whether the rollup plugin is enabled. Defaults to true.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="opensearch"><strong>opensearch</strong></p><p><code className="type">object</code></p><a href="#opensearch">#</a></div>
        <p className="title">OpenSearch settings</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_reindex_remote_whitelist"><strong>opensearch.reindex_remote_whitelist</strong></p><p><code className="type">array,null</code></p><a href="#opensearch_reindex_remote_whitelist">#</a></div>
              <p className="title">reindex_remote_whitelist</p>
              <div className="description"><p>Whitelisted addresses for reindexing. Changing this value will cause all OpenSearch instances to restart.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_http_max_content_length"><strong>opensearch.http_max_content_length</strong></p><p><code className="type">integer</code></p><a href="#opensearch_http_max_content_length">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">http.max_content_length</p>
              <div className="description"><p>Maximum content length for HTTP requests to the OpenSearch HTTP API, in bytes.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_http_max_header_size"><strong>opensearch.http_max_header_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_http_max_header_size">#</a></div><div className="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>262144</code></li></ul></div>
              <p className="title">http.max_header_size</p>
              <div className="description"><p>The max size of allowed headers, in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_http_max_initial_line_length"><strong>opensearch.http_max_initial_line_length</strong></p><p><code className="type">integer</code></p><a href="#opensearch_http_max_initial_line_length">#</a></div><div className="constraints"><ul><li>min: <code>1024</code></li><li>max: <code>65536</code></li></ul></div>
              <p className="title">http.max_initial_line_length</p>
              <div className="description"><p>The max length of an HTTP URL, in bytes</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_query_bool_max_clause_count"><strong>opensearch.indices_query_bool_max_clause_count</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_query_bool_max_clause_count">#</a></div><div className="constraints"><ul><li>min: <code>64</code></li><li>max: <code>4096</code></li></ul></div>
              <p className="title">indices.query.bool.max_clause_count</p>
              <div className="description"><p>Maximum number of clauses Lucene BooleanQuery can have. The default value (1024) is relatively high, and increasing it may cause performance issues. Investigate other approaches first before increasing this value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_search_max_buckets"><strong>opensearch.search_max_buckets</strong></p><p><code className="type">integer,null</code></p><a href="#opensearch_search_max_buckets">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000000</code></li></ul></div>
              <p className="title">search.max_buckets</p>
              <div className="description"><p>Maximum number of aggregation buckets allowed in a single response. OpenSearch default value is used when this is not defined.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_fielddata_cache_size"><strong>opensearch.indices_fielddata_cache_size</strong></p><p><code className="type">integer,null</code></p><a href="#opensearch_indices_fielddata_cache_size">#</a></div><div className="constraints"><ul><li>min: <code>3</code></li><li>max: <code>100</code></li></ul></div>
              <p className="title">indices.fielddata.cache.size</p>
              <div className="description"><p>Relative amount. Maximum amount of heap memory used for field data cache. This is an expert setting; decreasing the value too much will increase overhead of loading field data; too much memory used for field data cache will decrease amount of heap available for other operations.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_memory_index_buffer_size"><strong>opensearch.indices_memory_index_buffer_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_memory_index_buffer_size">#</a></div><div className="constraints"><ul><li>min: <code>3</code></li><li>max: <code>40</code></li></ul></div>
              <p className="title">indices.memory.index_buffer_size</p>
              <div className="description"><p>Percentage value. Default is 10%. Total amount of heap used for indexing buffer, before writing segments to disk. This is an expert setting. Too low value will slow down indexing; too high value will increase indexing performance but causes performance issues for query performance.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_memory_min_index_buffer_size"><strong>opensearch.indices_memory_min_index_buffer_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_memory_min_index_buffer_size">#</a></div><div className="constraints"><ul><li>min: <code>3</code></li><li>max: <code>2048</code></li></ul></div>
              <p className="title">indices.memory.min_index_buffer_size</p>
              <div className="description"><p>Absolute value. Default is 48mb. Doesn't work without indices.memory.index_buffer_size. Minimum amount of heap used for query cache, an absolute indices.memory.index_buffer_size minimal hard limit.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_memory_max_index_buffer_size"><strong>opensearch.indices_memory_max_index_buffer_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_memory_max_index_buffer_size">#</a></div><div className="constraints"><ul><li>min: <code>3</code></li><li>max: <code>2048</code></li></ul></div>
              <p className="title">indices.memory.max_index_buffer_size</p>
              <div className="description"><p>Absolute value. Default is unbound. Doesn't work without indices.memory.index_buffer_size. Maximum amount of heap used for query cache, an absolute indices.memory.index_buffer_size maximum hard limit.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_queries_cache_size"><strong>opensearch.indices_queries_cache_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_queries_cache_size">#</a></div><div className="constraints"><ul><li>min: <code>3</code></li><li>max: <code>40</code></li></ul></div>
              <p className="title">indices.queries.cache.size</p>
              <div className="description"><p>Percentage value. Default is 10%. Maximum amount of heap used for query cache. This is an expert setting. Too low value will decrease query performance and increase performance for other operations; too high value will cause issues with other OpenSearch functionality.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_recovery_max_bytes_per_sec"><strong>opensearch.indices_recovery_max_bytes_per_sec</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_recovery_max_bytes_per_sec">#</a></div><div className="constraints"><ul><li>min: <code>40</code></li><li>max: <code>400</code></li></ul></div>
              <p className="title">indices.recovery.max_bytes_per_sec</p>
              <div className="description"><p>Limits total inbound and outbound recovery traffic for each node. Applies to both peer recoveries as well as snapshot recoveries (i.e., restores from a snapshot). Defaults to 40mb</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_indices_recovery_max_concurrent_file_chunks"><strong>opensearch.indices_recovery_max_concurrent_file_chunks</strong></p><p><code className="type">integer</code></p><a href="#opensearch_indices_recovery_max_concurrent_file_chunks">#</a></div><div className="constraints"><ul><li>min: <code>2</code></li><li>max: <code>5</code></li></ul></div>
              <p className="title">indices.recovery.max_concurrent_file_chunks</p>
              <div className="description"><p>Number of file chunks sent in parallel for each recovery. Defaults to 2.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_action_auto_create_index_enabled"><strong>opensearch.action_auto_create_index_enabled</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_action_auto_create_index_enabled">#</a></div>
              <p className="title">action.auto_create_index</p>
              <div className="description"><p>Explicitly allow or block automatic creation of indices. Defaults to true</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_plugins_alerting_filter_by_backend_roles"><strong>opensearch.plugins_alerting_filter_by_backend_roles</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_plugins_alerting_filter_by_backend_roles">#</a></div>
              <p className="title">plugins.alerting.filter_by_backend_roles</p>
              <div className="description"><p>Enable or disable filtering of alerting by backend roles. Requires Security plugin. Defaults to false</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_knn_memory_circuit_breaker_limit"><strong>opensearch.knn_memory_circuit_breaker_limit</strong></p><p><code className="type">integer</code></p><a href="#opensearch_knn_memory_circuit_breaker_limit">#</a></div><div className="constraints"><ul><li>min: <code>3</code></li><li>max: <code>100</code></li></ul></div>
              <p className="title">knn.memory.circuit_breaker.limit</p>
              <div className="description"><p>Maximum amount of memory that can be used for KNN index. Defaults to 50% of the JVM heap size.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_knn_memory_circuit_breaker_enabled"><strong>opensearch.knn_memory_circuit_breaker_enabled</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_knn_memory_circuit_breaker_enabled">#</a></div>
              <p className="title">knn.memory.circuit_breaker.enabled</p>
              <div className="description"><p>Enable or disable KNN memory circuit breaker. Defaults to true.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_auth_failure_listeners"><strong>opensearch.auth_failure_listeners</strong></p><p><code className="type">object</code></p><a href="#opensearch_auth_failure_listeners">#</a></div>
              <p className="title">Opensearch Security Plugin Settings</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_enable_security_audit"><strong>opensearch.enable_security_audit</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_enable_security_audit">#</a></div>
              <p className="title">Enable/Disable security audit</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_search_size"><strong>opensearch.thread_pool_search_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_search_size">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p className="title">search thread pool size</p>
              <div className="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_search_throttled_size"><strong>opensearch.thread_pool_search_throttled_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_search_throttled_size">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p className="title">search_throttled thread pool size</p>
              <div className="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_get_size"><strong>opensearch.thread_pool_get_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_get_size">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p className="title">get thread pool size</p>
              <div className="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_analyze_size"><strong>opensearch.thread_pool_analyze_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_analyze_size">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p className="title">analyze thread pool size</p>
              <div className="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_write_size"><strong>opensearch.thread_pool_write_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_write_size">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p className="title">write thread pool size</p>
              <div className="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_force_merge_size"><strong>opensearch.thread_pool_force_merge_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_force_merge_size">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>128</code></li></ul></div>
              <p className="title">force_merge thread pool size</p>
              <div className="description"><p>Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_search_queue_size"><strong>opensearch.thread_pool_search_queue_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_search_queue_size">#</a></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p className="title">search thread pool queue size</p>
              <div className="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_search_throttled_queue_size"><strong>opensearch.thread_pool_search_throttled_queue_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_search_throttled_queue_size">#</a></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p className="title">search_throttled thread pool queue size</p>
              <div className="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_get_queue_size"><strong>opensearch.thread_pool_get_queue_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_get_queue_size">#</a></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p className="title">get thread pool queue size</p>
              <div className="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_analyze_queue_size"><strong>opensearch.thread_pool_analyze_queue_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_analyze_queue_size">#</a></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p className="title">analyze thread pool queue size</p>
              <div className="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_thread_pool_write_queue_size"><strong>opensearch.thread_pool_write_queue_size</strong></p><p><code className="type">integer</code></p><a href="#opensearch_thread_pool_write_queue_size">#</a></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>2000</code></li></ul></div>
              <p className="title">write thread pool queue size</p>
              <div className="description"><p>Size for the thread pool queue. See documentation for exact details.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_action_destructive_requires_name"><strong>opensearch.action_destructive_requires_name</strong></p><p><code className="type">boolean,null</code></p><a href="#opensearch_action_destructive_requires_name">#</a></div>
              <p className="title">Require explicit index names when deleting</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_cluster_max_shards_per_node"><strong>opensearch.cluster_max_shards_per_node</strong></p><p><code className="type">integer</code></p><a href="#opensearch_cluster_max_shards_per_node">#</a></div><div className="constraints"><ul><li>min: <code>100</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">cluster.max_shards_per_node</p>
              <div className="description"><p>Controls the number of shards allowed in the cluster per data node</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_override_main_response_version"><strong>opensearch.override_main_response_version</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_override_main_response_version">#</a></div>
              <p className="title">compatibility.override_main_response_version</p>
              <div className="description"><p>Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work. Default is false</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_script_max_compilations_rate"><strong>opensearch.script_max_compilations_rate</strong></p><p><code className="type">string</code></p><a href="#opensearch_script_max_compilations_rate">#</a></div>
              <p className="title">Script max compilation rate - circuit breaker to prevent/minimize OOMs</p>
              <div className="description"><p>Script compilation circuit breaker limits the number of inline script compilations within a period of time. Default is use-context</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_cluster_routing_allocation_node_concurrent_recoveries"><strong>opensearch.cluster_routing_allocation_node_concurrent_recoveries</strong></p><p><code className="type">integer</code></p><a href="#opensearch_cluster_routing_allocation_node_concurrent_recoveries">#</a></div><div className="constraints"><ul><li>min: <code>2</code></li><li>max: <code>16</code></li></ul></div>
              <p className="title">Concurrent incoming/outgoing shard recoveries per node</p>
              <div className="description"><p>How many concurrent incoming/outgoing shard recoveries (normally replicas) are allowed to happen on a node. Defaults to node cpu count * 2.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_email_sender_name"><strong>opensearch.email_sender_name</strong></p><p><code className="type">string</code></p><a href="#opensearch_email_sender_name">#</a></div>
              <p className="title">Sender name placeholder to be used in Opensearch Dashboards and Opensearch keystore</p>
              <div className="description"><p>This should be identical to the Sender name defined in Opensearch dashboards</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_email_sender_username"><strong>opensearch.email_sender_username</strong></p><p><code className="type">string</code></p><a href="#opensearch_email_sender_username">#</a></div>
              <p className="title">Sender username for Opensearch alerts</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_email_sender_password"><strong>opensearch.email_sender_password</strong></p><p><code className="type">string</code></p><a href="#opensearch_email_sender_password">#</a></div>
              <p className="title">Sender password for Opensearch alerts to authenticate with SMTP server</p>
              <div className="description"><p>Sender password for Opensearch alerts to authenticate with SMTP server</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_ism_enabled"><strong>opensearch.ism_enabled</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_ism_enabled">#</a></div>
              <p className="title">Specifies whether ISM is enabled or not</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_ism_history_enabled"><strong>opensearch.ism_history_enabled</strong></p><p><code className="type">boolean</code></p><a href="#opensearch_ism_history_enabled">#</a></div>
              <p className="title">Specifies whether audit history is enabled or not. The logs from ISM are automatically indexed to a logs document.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_ism_history_max_age"><strong>opensearch.ism_history_max_age</strong></p><p><code className="type">integer</code></p><a href="#opensearch_ism_history_max_age">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">The maximum age before rolling over the audit history index in hours</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_ism_history_max_docs"><strong>opensearch.ism_history_max_docs</strong></p><p><code className="type">integer</code></p><a href="#opensearch_ism_history_max_docs">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">The maximum number of documents before rolling over the audit history index.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_ism_history_rollover_check_period"><strong>opensearch.ism_history_rollover_check_period</strong></p><p><code className="type">integer</code></p><a href="#opensearch_ism_history_rollover_check_period">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">The time between rollover checks for the audit history index in hours.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_ism_history_rollover_retention_period"><strong>opensearch.ism_history_rollover_retention_period</strong></p><p><code className="type">integer</code></p><a href="#opensearch_ism_history_rollover_retention_period">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">How long audit history indices are kept in days.</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_search_backpressure"><strong>opensearch.search_backpressure</strong></p><p><code className="type">object</code></p><a href="#opensearch_search_backpressure">#</a></div>
              <p className="title">Search Backpressure Settings</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="opensearch_shard_indexing_pressure"><strong>opensearch.shard_indexing_pressure</strong></p><p><code className="type">object</code></p><a href="#opensearch_shard_indexing_pressure">#</a></div>
              <p className="title">Shard indexing back pressure settings</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="index_template"><strong>index_template</strong></p><p><code className="type">object</code></p><a href="#index_template">#</a></div>
        <p className="title">Template settings for all new indexes</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_template_mapping_nested_objects_limit"><strong>index_template.mapping_nested_objects_limit</strong></p><p><code className="type">integer,null</code></p><a href="#index_template_mapping_nested_objects_limit">#</a></div><div className="constraints"><ul><li>max: <code>100000</code></li></ul></div>
              <p className="title">index.mapping.nested_objects.limit</p>
              <div className="description"><p>The maximum number of nested JSON objects that a single document can contain across all nested types. This limit helps to prevent out of memory errors when a document contains too many nested objects. Default is 10000.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_template_number_of_shards"><strong>index_template.number_of_shards</strong></p><p><code className="type">integer,null</code></p><a href="#index_template_number_of_shards">#</a></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1024</code></li></ul></div>
              <p className="title">index.number_of_shards</p>
              <div className="description"><p>The number of primary shards that an index should have.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="index_template_number_of_replicas"><strong>index_template.number_of_replicas</strong></p><p><code className="type">integer,null</code></p><a href="#index_template_number_of_replicas">#</a></div><div className="constraints"><ul><li>max: <code>29</code></li></ul></div>
              <p className="title">index.number_of_replicas</p>
              <div className="description"><p>The number of replicas each primary shard has.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="private_access"><strong>private_access</strong></p><p><code className="type">object</code></p><a href="#private_access">#</a></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_opensearch"><strong>private_access.opensearch</strong></p><p><code className="type">boolean</code></p><a href="#private_access_opensearch">#</a></div>
              <p className="title">Allow clients to connect to opensearch with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_opensearch_dashboards"><strong>private_access.opensearch_dashboards</strong></p><p><code className="type">boolean</code></p><a href="#private_access_opensearch_dashboards">#</a></div>
              <p className="title">Allow clients to connect to opensearch_dashboards with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_prometheus"><strong>private_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#private_access_prometheus">#</a></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="privatelink_access"><strong>privatelink_access</strong></p><p><code className="type">object</code></p><a href="#privatelink_access">#</a></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_opensearch"><strong>privatelink_access.opensearch</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_opensearch">#</a></div>
              <p className="title">Enable opensearch</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_opensearch_dashboards"><strong>privatelink_access.opensearch_dashboards</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_opensearch_dashboards">#</a></div>
              <p className="title">Enable opensearch_dashboards</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#privatelink_access_prometheus">#</a></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="public_access"><strong>public_access</strong></p><p><code className="type">object</code></p><a href="#public_access">#</a></div>
        <p className="title">Allow access to selected service ports from the public Internet</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_opensearch"><strong>public_access.opensearch</strong></p><p><code className="type">boolean</code></p><a href="#public_access_opensearch">#</a></div>
              <p className="title">Allow clients to connect to opensearch from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_opensearch_dashboards"><strong>public_access.opensearch_dashboards</strong></p><p><code className="type">boolean</code></p><a href="#public_access_opensearch_dashboards">#</a></div>
              <p className="title">Allow clients to connect to opensearch_dashboards from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_prometheus"><strong>public_access.prometheus</strong></p><p><code className="type">boolean</code></p><a href="#public_access_prometheus">#</a></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="recovery_basebackup_name"><strong>recovery_basebackup_name</strong></p><p><code className="type">string</code></p><a href="#recovery_basebackup_name">#</a></div>
        <p className="title">Name of the basebackup to restore in forked service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="service_to_fork_from"><strong>service_to_fork_from</strong></p><p><code className="type">string,null</code></p><a href="#service_to_fork_from">#</a></div>
        <p className="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="project_to_fork_from"><strong>project_to_fork_from</strong></p><p><code className="type">string,null</code></p><a href="#project_to_fork_from">#</a></div>
        <p className="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    