
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
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
        <div className="param"><p className="name" id="external_image_storage"><a href="#external_image_storage"><strong>external_image_storage</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">External image store settings</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="external_image_storage_provider"><a href="#external_image_storage_provider"><strong>external_image_storage.provider</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Provider type</p>
              <div className="description"><p>External image store provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="external_image_storage_bucket_url"><a href="#external_image_storage_bucket_url"><strong>external_image_storage.bucket_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Bucket URL</p>
              <div className="description"><p>Bucket URL for S3</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="external_image_storage_access_key"><a href="#external_image_storage_access_key"><strong>external_image_storage.access_key</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">S3 access key</p>
              <div className="description"><p>S3 access key. Requires permissions to the S3 bucket for the s3:PutObject and s3:PutObjectAcl actions</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="external_image_storage_secret_key"><a href="#external_image_storage_secret_key"><strong>external_image_storage.secret_key</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">S3 secret key</p>
              <div className="description"><p>S3 secret key</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="smtp_server"><a href="#smtp_server"><strong>smtp_server</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">SMTP server settings</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_host"><a href="#smtp_server_host"><strong>smtp_server.host</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">SMTP server hostname</p>
              <div className="description"><p>Server hostname or IP</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_port"><a href="#smtp_server_port"><strong>smtp_server.port</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div>
              <p className="title">SMTP server port</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_skip_verify"><a href="#smtp_server_skip_verify"><strong>smtp_server.skip_verify</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Skip certificate verification</p>
              <div className="description"><p>Skip verifying server certificate. Defaults to false</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_username"><a href="#smtp_server_username"><strong>smtp_server.username</strong></a></p><p><code className="type">string,null</code></p></div>
              <p className="title">Username for SMTP authentication</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_password"><a href="#smtp_server_password"><strong>smtp_server.password</strong></a></p><p><code className="type">string,null</code></p></div>
              <p className="title">Password for SMTP authentication</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_from_address"><a href="#smtp_server_from_address"><strong>smtp_server.from_address</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">From address</p>
              <div className="description"><p>Address used for sending emails</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_from_name"><a href="#smtp_server_from_name"><strong>smtp_server.from_name</strong></a></p><p><code className="type">string,null</code></p></div>
              <p className="title">From name</p>
              <div className="description"><p>Name used in outgoing emails, defaults to Grafana</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="smtp_server_starttls_policy"><a href="#smtp_server_starttls_policy"><strong>smtp_server.starttls_policy</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">StartTLS policy</p>
              <div className="description"><p>Either OpportunisticStartTLS, MandatoryStartTLS or NoStartTLS. Default is OpportunisticStartTLS.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="auth_basic_enabled"><a href="#auth_basic_enabled"><strong>auth_basic_enabled</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Basic authentication enabled</p>
        <div className="description"><p>Enable or disable basic authentication form, used by Grafana built-in login</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="oauth_allow_insecure_email_lookup"><a href="#oauth_allow_insecure_email_lookup"><strong>oauth_allow_insecure_email_lookup</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Allow insecure email lookup</p>
        <div className="description"><p>Enforce user lookup based on email instead of the unique ID provided by the IdP</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="auth_generic_oauth"><a href="#auth_generic_oauth"><strong>auth_generic_oauth</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Generic OAuth integration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_allow_sign_up"><a href="#auth_generic_oauth_allow_sign_up"><strong>auth_generic_oauth.allow_sign_up</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow sign-up</p>
              <div className="description"><p>Automatically sign-up users on successful sign-in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_allowed_domains"><a href="#auth_generic_oauth_allowed_domains"><strong>auth_generic_oauth.allowed_domains</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">Allowed domains</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_allowed_organizations"><a href="#auth_generic_oauth_allowed_organizations"><strong>auth_generic_oauth.allowed_organizations</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">Allowed organizations</p>
              <div className="description"><p>Require user to be member of one of the listed organizations</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_api_url"><a href="#auth_generic_oauth_api_url"><strong>auth_generic_oauth.api_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">API URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_auth_url"><a href="#auth_generic_oauth_auth_url"><strong>auth_generic_oauth.auth_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Authorization URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_auto_login"><a href="#auth_generic_oauth_auto_login"><strong>auth_generic_oauth.auto_login</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Auto login</p>
              <div className="description"><p>Allow users to bypass the login screen and automatically log in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_client_id"><a href="#auth_generic_oauth_client_id"><strong>auth_generic_oauth.client_id</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client ID</p>
              <div className="description"><p>Client ID from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_client_secret"><a href="#auth_generic_oauth_client_secret"><strong>auth_generic_oauth.client_secret</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client secret</p>
              <div className="description"><p>Client secret from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_name"><a href="#auth_generic_oauth_name"><strong>auth_generic_oauth.name</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Name of the OAuth integration</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_scopes"><a href="#auth_generic_oauth_scopes"><strong>auth_generic_oauth.scopes</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">OAuth scopes</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_token_url"><a href="#auth_generic_oauth_token_url"><strong>auth_generic_oauth.token_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Token URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_generic_oauth_use_refresh_token"><a href="#auth_generic_oauth_use_refresh_token"><strong>auth_generic_oauth.use_refresh_token</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Use refresh token</p>
              <div className="description"><p>Set to true to use refresh token and check access token expiration.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="auth_google"><a href="#auth_google"><strong>auth_google</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Google Auth integration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_google_allow_sign_up"><a href="#auth_google_allow_sign_up"><strong>auth_google.allow_sign_up</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow sign-up</p>
              <div className="description"><p>Automatically sign-up users on successful sign-in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_google_client_id"><a href="#auth_google_client_id"><strong>auth_google.client_id</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client ID</p>
              <div className="description"><p>Client ID from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_google_client_secret"><a href="#auth_google_client_secret"><strong>auth_google.client_secret</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client secret</p>
              <div className="description"><p>Client secret from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_google_allowed_domains"><a href="#auth_google_allowed_domains"><strong>auth_google.allowed_domains</strong></a></p><p><code className="type">array</code></p></div>
              
              <div className="description"><p>Domains allowed to sign-in to this Grafana</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="auth_github"><a href="#auth_github"><strong>auth_github</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Github Auth integration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_allow_sign_up"><a href="#auth_github_allow_sign_up"><strong>auth_github.allow_sign_up</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow sign-up</p>
              <div className="description"><p>Automatically sign-up users on successful sign-in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_auto_login"><a href="#auth_github_auto_login"><strong>auth_github.auto_login</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Auto login</p>
              <div className="description"><p>Allow users to bypass the login screen and automatically log in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_client_id"><a href="#auth_github_client_id"><strong>auth_github.client_id</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client ID</p>
              <div className="description"><p>Client ID from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_client_secret"><a href="#auth_github_client_secret"><strong>auth_github.client_secret</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client secret</p>
              <div className="description"><p>Client secret from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_team_ids"><a href="#auth_github_team_ids"><strong>auth_github.team_ids</strong></a></p><p><code className="type">array</code></p></div>
              
              <div className="description"><p>Require users to belong to one of given team IDs</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_allowed_organizations"><a href="#auth_github_allowed_organizations"><strong>auth_github.allowed_organizations</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">Allowed organizations</p>
              <div className="description"><p>Require users to belong to one of given organizations</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_github_skip_org_role_sync"><a href="#auth_github_skip_org_role_sync"><strong>auth_github.skip_org_role_sync</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Skip organization role sync</p>
              <div className="description"><p>Stop automatically syncing user roles</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="auth_gitlab"><a href="#auth_gitlab"><strong>auth_gitlab</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">GitLab Auth integration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_allow_sign_up"><a href="#auth_gitlab_allow_sign_up"><strong>auth_gitlab.allow_sign_up</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow sign-up</p>
              <div className="description"><p>Automatically sign-up users on successful sign-in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_api_url"><a href="#auth_gitlab_api_url"><strong>auth_gitlab.api_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">API URL</p>
              <div className="description"><p>This only needs to be set when using self hosted GitLab</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_auth_url"><a href="#auth_gitlab_auth_url"><strong>auth_gitlab.auth_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Authorization URL</p>
              <div className="description"><p>This only needs to be set when using self hosted GitLab</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_client_id"><a href="#auth_gitlab_client_id"><strong>auth_gitlab.client_id</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client ID</p>
              <div className="description"><p>Client ID from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_client_secret"><a href="#auth_gitlab_client_secret"><strong>auth_gitlab.client_secret</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client secret</p>
              <div className="description"><p>Client secret from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_allowed_groups"><a href="#auth_gitlab_allowed_groups"><strong>auth_gitlab.allowed_groups</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">Allowed groups</p>
              <div className="description"><p>Require users to belong to one of given groups</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_gitlab_token_url"><a href="#auth_gitlab_token_url"><strong>auth_gitlab.token_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Token URL</p>
              <div className="description"><p>This only needs to be set when using self hosted GitLab</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="auth_azuread"><a href="#auth_azuread"><strong>auth_azuread</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Azure AD OAuth integration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_allow_sign_up"><a href="#auth_azuread_allow_sign_up"><strong>auth_azuread.allow_sign_up</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow sign-up</p>
              <div className="description"><p>Automatically sign-up users on successful sign-in</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_client_id"><a href="#auth_azuread_client_id"><strong>auth_azuread.client_id</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client ID</p>
              <div className="description"><p>Client ID from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_client_secret"><a href="#auth_azuread_client_secret"><strong>auth_azuread.client_secret</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client secret</p>
              <div className="description"><p>Client secret from provider</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_auth_url"><a href="#auth_azuread_auth_url"><strong>auth_azuread.auth_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Authorization URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_token_url"><a href="#auth_azuread_token_url"><strong>auth_azuread.token_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Token URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_allowed_groups"><a href="#auth_azuread_allowed_groups"><strong>auth_azuread.allowed_groups</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">Allowed groups</p>
              <div className="description"><p>Require users to belong to one of given groups</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="auth_azuread_allowed_domains"><a href="#auth_azuread_allowed_domains"><strong>auth_azuread.allowed_domains</strong></a></p><p><code className="type">array</code></p></div>
              <p className="title">Allowed domains</p>
              
            </td>
          </tr>
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
              <div className="param"><p className="name" id="private_access_grafana"><a href="#private_access_grafana"><strong>private_access.grafana</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to grafana with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="privatelink_access"><a href="#privatelink_access"><strong>privatelink_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_grafana"><a href="#privatelink_access_grafana"><strong>privatelink_access.grafana</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable grafana</p>
              
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
              <div className="param"><p className="name" id="public_access_grafana"><a href="#public_access_grafana"><strong>public_access.grafana</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to grafana from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="recovery_basebackup_name"><a href="#recovery_basebackup_name"><strong>recovery_basebackup_name</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Name of the basebackup to restore in forked service</p>
        
        <table className="service-param-children">
          <tbody>
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
    <tr>
      <td>
        <div className="param"><p className="name" id="user_auto_assign_org"><a href="#user_auto_assign_org"><strong>user_auto_assign_org</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Auto-assign new users to main organization</p>
        <div className="description"><p>Auto-assign new users on signup to main organization. Defaults to false</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="user_auto_assign_org_role"><a href="#user_auto_assign_org_role"><strong>user_auto_assign_org_role</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Auto-assign role for new users</p>
        <div className="description"><p>Set role for new signups. Defaults to Viewer</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="google_analytics_ua_id"><a href="#google_analytics_ua_id"><strong>google_analytics_ua_id</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Google Analytics ID</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="metrics_enabled"><a href="#metrics_enabled"><strong>metrics_enabled</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Metrics enabled</p>
        <div className="description"><p>Enable Grafana's /metrics endpoint</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="cookie_samesite"><a href="#cookie_samesite"><strong>cookie_samesite</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Cookie SameSite attribute</p>
        <div className="description"><p>Cookie SameSite attribute: 'strict' prevents sending cookie for cross-site requests, effectively disabling direct linking from other sites to Grafana. 'lax' is the default value.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="alerting_error_or_timeout"><a href="#alerting_error_or_timeout"><strong>alerting_error_or_timeout</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Default error or timeout setting</p>
        <div className="description"><p>Default error or timeout setting for new alerting rules</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="alerting_nodata_or_nullvalues"><a href="#alerting_nodata_or_nullvalues"><strong>alerting_nodata_or_nullvalues</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Default no data or null values setting</p>
        <div className="description"><p>Default value for 'no data or null values' for new alerting rules</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="alerting_enabled"><a href="#alerting_enabled"><strong>alerting_enabled</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">(DEPRECATED) Alerting enabled</p>
        <div className="description"><p>DEPRECATED: setting has no effect with Grafana 11 and onward. Enable or disable Grafana legacy alerting functionality. This should not be enabled with unified_alerting_enabled.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="alerting_max_annotations_to_keep"><a href="#alerting_max_annotations_to_keep"><strong>alerting_max_annotations_to_keep</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>1000000</code></li></ul></div>
        <p className="title">Max alert annotations to keep</p>
        <div className="description"><p>Max number of alert annotations that Grafana stores. 0 (default) keeps all alert annotations.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="dashboards_min_refresh_interval"><a href="#dashboards_min_refresh_interval"><strong>dashboards_min_refresh_interval</strong></a></p><p><code className="type">string</code></p></div>
        <p className="title">Minimum refresh interval</p>
        <div className="description"><p>Signed sequence of decimal numbers, followed by a unit suffix (ms, s, m, h, d), e.g. 30s, 1h</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="dashboards_versions_to_keep"><a href="#dashboards_versions_to_keep"><strong>dashboards_versions_to_keep</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>100</code></li></ul></div>
        <p className="title">Dashboard versions to keep</p>
        <div className="description"><p>Dashboard versions to keep per dashboard</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="dataproxy_timeout"><a href="#dataproxy_timeout"><strong>dataproxy_timeout</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>15</code></li><li>max: <code>90</code></li></ul></div>
        <p className="title">Data proxy timeout</p>
        <div className="description"><p>Timeout for data proxy requests in seconds</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="dataproxy_send_user_header"><a href="#dataproxy_send_user_header"><strong>dataproxy_send_user_header</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Send user header to data source</p>
        <div className="description"><p>Send 'X-Grafana-User' header to data source</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="dashboard_previews_enabled"><a href="#dashboard_previews_enabled"><strong>dashboard_previews_enabled</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable dashboard previews</p>
        <div className="description"><p>Enable browsing of dashboards in grid (pictures) mode. This feature is new in Grafana 9 and is quite resource intensive. It may cause low-end plans to work more slowly while the dashboard previews are rendering.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="viewers_can_edit"><a href="#viewers_can_edit"><strong>viewers_can_edit</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Viewers can edit</p>
        <div className="description"><p>Users with view-only permission can edit but not save dashboards</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="editors_can_admin"><a href="#editors_can_admin"><strong>editors_can_admin</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Editors can admin</p>
        <div className="description"><p>Editors can manage folders, teams and dashboards created by them</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="disable_gravatar"><a href="#disable_gravatar"><strong>disable_gravatar</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Disable Gravatar</p>
        <div className="description"><p>Set to true to disable gravatar. Defaults to false (gravatar is enabled)</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="allow_embedding"><a href="#allow_embedding"><strong>allow_embedding</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Allow embedding</p>
        <div className="description"><p>Allow embedding Grafana dashboards with iframe/frame/object/embed tags. Disabled by default to limit impact of clickjacking</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="date_formats"><a href="#date_formats"><strong>date_formats</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Grafana date format specifications</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_full_date"><a href="#date_formats_full_date"><strong>date_formats.full_date</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Full date format</p>
              <div className="description"><p>Moment.js style format string for cases where full date is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_interval_second"><a href="#date_formats_interval_second"><strong>date_formats.interval_second</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Interval second format</p>
              <div className="description"><p>Moment.js style format string used when a time requiring second accuracy is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_interval_minute"><a href="#date_formats_interval_minute"><strong>date_formats.interval_minute</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Interval minute format</p>
              <div className="description"><p>Moment.js style format string used when a time requiring minute accuracy is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_interval_hour"><a href="#date_formats_interval_hour"><strong>date_formats.interval_hour</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Interval hour format</p>
              <div className="description"><p>Moment.js style format string used when a time requiring hour accuracy is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_interval_day"><a href="#date_formats_interval_day"><strong>date_formats.interval_day</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Interval day format</p>
              <div className="description"><p>Moment.js style format string used when a time requiring day accuracy is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_interval_month"><a href="#date_formats_interval_month"><strong>date_formats.interval_month</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Interval month format</p>
              <div className="description"><p>Moment.js style format string used when a time requiring month accuracy is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_interval_year"><a href="#date_formats_interval_year"><strong>date_formats.interval_year</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Interval year format</p>
              <div className="description"><p>Moment.js style format string used when a time requiring year accuracy is shown</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="date_formats_default_timezone"><a href="#date_formats_default_timezone"><strong>date_formats.default_timezone</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Default time zone</p>
              <div className="description"><p>Default time zone for user preferences. Value 'browser' uses browser local time zone.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="unified_alerting_enabled"><a href="#unified_alerting_enabled"><strong>unified_alerting_enabled</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Unified alerting enabled</p>
        <div className="description"><p>Enable or disable Grafana unified alerting functionality. By default this is enabled and any legacy alerts will be migrated on upgrade to Grafana 9+. To stay on legacy alerting, set unified_alerting_enabled to false and alerting_enabled to true. See https://grafana.com/docs/grafana/latest/alerting/ for more details.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="wal"><a href="#wal"><strong>wal</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Write-Ahead Logging</p>
        <div className="description"><p>Setting to enable/disable Write-Ahead Logging. The default value is false (disabled).</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    