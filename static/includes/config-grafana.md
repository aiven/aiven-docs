
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
        <div class="param"><p class="name"><strong>external_image_storage</strong></p><p><code class="type">object</code></p></div>
        <p class="title">External image store settings</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>external_image_storage.provider</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Provider type</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>external_image_storage.bucket_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Bucket URL for S3</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>external_image_storage.access_key</strong></p><p><code class="type">string</code></p></div>
              <p class="title">S3 access key. Requires permissions to the S3 bucket for the s3:PutObject and s3:PutObjectAcl actions</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>external_image_storage.secret_key</strong></p><p><code class="type">string</code></p></div>
              <p class="title">S3 secret key</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>smtp_server</strong></p><p><code class="type">object</code></p></div>
        <p class="title">SMTP server settings</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.host</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Server hostname or IP</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.port</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>65535</code></li></ul></div>
              <p class="title">SMTP server port</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.skip_verify</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Skip verifying server certificate. Defaults to false</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.username</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">Username for SMTP authentication</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.password</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">Password for SMTP authentication</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.from_address</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Address used for sending emails</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.from_name</strong></p><p><code class="type">string,null</code></p></div>
              <p class="title">Name used in outgoing emails, defaults to Grafana</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>smtp_server.starttls_policy</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Either OpportunisticStartTLS, MandatoryStartTLS or NoStartTLS. Default is OpportunisticStartTLS.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>auth_basic_enabled</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable or disable basic authentication form, used by Grafana built-in login</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>oauth_allow_insecure_email_lookup</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enforce user lookup based on email instead of the unique ID provided by the IdP</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>auth_generic_oauth</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Generic OAuth integration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.allow_sign_up</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Automatically sign-up users on successful sign-in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.allowed_domains</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Allowed domains</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.allowed_organizations</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Require user to be member of one of the listed organizations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.api_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">API URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.auth_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Authorization URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.auto_login</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow users to bypass the login screen and automatically log in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.client_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client ID from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.client_secret</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client secret from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.name</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Name of the OAuth integration</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.scopes</strong></p><p><code class="type">array</code></p></div>
              <p class="title">OAuth scopes</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.token_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Token URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_generic_oauth.use_refresh_token</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Set to true to use refresh token and check access token expiration.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>auth_google</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Google Auth integration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_google.allow_sign_up</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Automatically sign-up users on successful sign-in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_google.client_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client ID from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_google.client_secret</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client secret from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_google.allowed_domains</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Domains allowed to sign-in to this Grafana</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>auth_github</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Github Auth integration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.allow_sign_up</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Automatically sign-up users on successful sign-in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.auto_login</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow users to bypass the login screen and automatically log in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.client_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client ID from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.client_secret</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client secret from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.team_ids</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Require users to belong to one of given team IDs</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.allowed_organizations</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Require users to belong to one of given organizations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_github.skip_org_role_sync</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Stop automatically syncing user roles</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>auth_gitlab</strong></p><p><code class="type">object</code></p></div>
        <p class="title">GitLab Auth integration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.allow_sign_up</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Automatically sign-up users on successful sign-in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.api_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">API URL. This only needs to be set when using self hosted GitLab</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.auth_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Authorization URL. This only needs to be set when using self hosted GitLab</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.client_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client ID from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.client_secret</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client secret from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.allowed_groups</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Require users to belong to one of given groups</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_gitlab.token_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Token URL. This only needs to be set when using self hosted GitLab</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>auth_azuread</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Azure AD OAuth integration</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.allow_sign_up</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Automatically sign-up users on successful sign-in</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.client_id</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client ID from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.client_secret</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Client secret from provider</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.auth_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Authorization URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.token_url</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Token URL</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.allowed_groups</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Require users to belong to one of given groups</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>auth_azuread.allowed_domains</strong></p><p><code class="type">array</code></p></div>
              <p class="title">Allowed domains</p>
              
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
              <div class="param"><p class="name"><strong>private_access.grafana</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to grafana with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
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
              <div class="param"><p class="name"><strong>privatelink_access.grafana</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Enable grafana</p>
              
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
              <div class="param"><p class="name"><strong>public_access.grafana</strong></p><p><code class="type">boolean</code></p></div>
              <p class="title">Allow clients to connect to grafana from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
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
    <tr>
      <td>
        <div class="param"><p class="name"><strong>user_auto_assign_org</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Auto-assign new users on signup to main organization. Defaults to false</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>user_auto_assign_org_role</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Set role for new signups. Defaults to Viewer</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>google_analytics_ua_id</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Google Analytics ID</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>metrics_enabled</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable Grafana /metrics endpoint</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>cookie_samesite</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Cookie SameSite attribute: 'strict' prevents sending cookie for cross-site requests, effectively disabling direct linking from other sites to Grafana. 'lax' is the default value.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>alerting_error_or_timeout</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Default error or timeout setting for new alerting rules</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>alerting_nodata_or_nullvalues</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Default value for 'no data or null values' for new alerting rules</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>alerting_enabled</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable or disable Grafana legacy alerting functionality. This should not be enabled with unified_alerting_enabled.</p>
        <div class="description"><p>DEPRECATED: setting has no effect with Grafana 11 and onward.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>alerting_max_annotations_to_keep</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>max: <code>1000000</code></li></ul></div>
        <p class="title">Max number of alert annotations that Grafana stores. 0 (default) keeps all alert annotations.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>dashboards_min_refresh_interval</strong></p><p><code class="type">string</code></p></div>
        <p class="title">Minimum refresh interval</p>
        <div class="description"><p>Signed sequence of decimal numbers, followed by a unit suffix (ms, s, m, h, d), e.g. 30s, 1h</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>dashboards_versions_to_keep</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>100</code></li></ul></div>
        <p class="title">Dashboard versions to keep per dashboard</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>dataproxy_timeout</strong></p><p><code class="type">integer</code></p></div><div class="constraints"><ul><li>min: <code>15</code></li><li>max: <code>90</code></li></ul></div>
        <p class="title">Timeout for data proxy requests in seconds</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>dataproxy_send_user_header</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Send 'X-Grafana-User' header to data source</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>dashboard_previews_enabled</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable browsing of dashboards in grid (pictures) mode</p>
        <div class="description"><p>This feature is new in Grafana 9 and is quite resource intensive. It may cause low-end plans to work more slowly while the dashboard previews are rendering.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>viewers_can_edit</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Users with view-only permission can edit but not save dashboards</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>editors_can_admin</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Editors can manage folders, teams and dashboards created by them</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>disable_gravatar</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Set to true to disable gravatar. Defaults to false (gravatar is enabled)</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>allow_embedding</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Allow embedding Grafana dashboards with iframe/frame/object/embed tags. Disabled by default to limit impact of clickjacking</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>date_formats</strong></p><p><code class="type">object</code></p></div>
        <p class="title">Grafana date format specifications</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.full_date</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string for cases where full date is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.interval_second</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string used when a time requiring second accuracy is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.interval_minute</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string used when a time requiring minute accuracy is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.interval_hour</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string used when a time requiring hour accuracy is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.interval_day</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string used when a time requiring day accuracy is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.interval_month</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string used when a time requiring month accuracy is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.interval_year</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Moment.js style format string used when a time requiring year accuracy is shown</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div class="param"><p class="name"><strong>date_formats.default_timezone</strong></p><p><code class="type">string</code></p></div>
              <p class="title">Default time zone for user preferences. Value 'browser' uses browser local time zone.</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>unified_alerting_enabled</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Enable or disable Grafana unified alerting functionality. By default this is enabled and any legacy alerts will be migrated on upgrade to Grafana 9+. To stay on legacy alerting, set unified_alerting_enabled to false and alerting_enabled to true. See https://grafana.com/docs/grafana/latest/alerting/set-up/migrating-alerts/ for more details.</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div class="param"><p class="name"><strong>wal</strong></p><p><code class="type">boolean</code></p></div>
        <p class="title">Setting to enable/disable Write-Ahead Logging. The default value is false (disabled).</p>
        
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    