
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
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
      <b>external_image_storage</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">External image store settings</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>provider</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Provider type</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>bucket_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Bucket URL for S3</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>access_key</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">S3 access key. Requires permissions to the S3 bucket for the s3:PutObject and s3:PutObjectAcl actions</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>secret_key</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">S3 secret key</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>smtp_server</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">SMTP server settings</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>host</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Server hostname or IP</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>port</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>65535</code>
            </div>
          </p>
          <p class="title">SMTP server port</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>skip_verify</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Skip verifying server certificate. Defaults to false</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>username</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">Username for SMTP authentication</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>password</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">Password for SMTP authentication</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>from_address</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Address used for sending emails</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>from_name</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">Name used in outgoing emails, defaults to Grafana</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>starttls_policy</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Either OpportunisticStartTLS, MandatoryStartTLS or NoStartTLS. Default is OpportunisticStartTLS.</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>auth_basic_enabled</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable or disable basic authentication form, used by Grafana built-in login</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>oauth_allow_insecure_email_lookup</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enforce user lookup based on email instead of the unique ID provided by the IdP</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>auth_generic_oauth</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Generic OAuth integration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>allow_sign_up</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Automatically sign-up users on successful sign-in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_domains</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Allowed domains</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_organizations</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Require user to be member of one of the listed organizations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>api_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">API URL</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auth_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Authorization URL</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auto_login</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow users to bypass the login screen and automatically log in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client ID from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_secret</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client secret from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>name</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Name of the OAuth integration</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>scopes</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">OAuth scopes</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>token_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Token URL</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>auth_google</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Google Auth integration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>allow_sign_up</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Automatically sign-up users on successful sign-in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client ID from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_secret</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client secret from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_domains</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Domains allowed to sign-in to this Grafana</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>auth_github</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Github Auth integration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>allow_sign_up</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Automatically sign-up users on successful sign-in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auto_login</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow users to bypass the login screen and automatically log in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client ID from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_secret</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client secret from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>team_ids</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Require users to belong to one of given team IDs</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_organizations</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Require users to belong to one of given organizations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>skip_org_role_sync</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Stop automatically syncing user roles</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>auth_gitlab</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">GitLab Auth integration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>allow_sign_up</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Automatically sign-up users on successful sign-in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>api_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">API URL. This only needs to be set when using self hosted GitLab</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auth_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Authorization URL. This only needs to be set when using self hosted GitLab</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client ID from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_secret</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client secret from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_groups</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Require users to belong to one of given groups</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>token_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Token URL. This only needs to be set when using self hosted GitLab</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>auth_azuread</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Azure AD OAuth integration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>allow_sign_up</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Automatically sign-up users on successful sign-in</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client ID from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_secret</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client secret from provider</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auth_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Authorization URL</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>token_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Token URL</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_groups</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Require users to belong to one of given groups</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>allowed_domains</b>&nbsp;<code class="type">array</code>
          </p>
          <p class="title">Allowed domains</p>
          <div class="description"></div>
        </td>
      </tr>
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
            <b>grafana</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to grafana with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>privatelink_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service components through Privatelink</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>grafana</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable grafana</p>
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
            <b>grafana</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to grafana from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>recovery_basebackup_name</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Name of the basebackup to restore in forked service</p>
    <div class="description"></div>
    <table class="service-param-children">
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
<tr>
  <td>
    <p class="name">
      <b>user_auto_assign_org</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Auto-assign new users on signup to main organization. Defaults to false</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>user_auto_assign_org_role</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Set role for new signups. Defaults to Viewer</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>google_analytics_ua_id</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Google Analytics ID</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>metrics_enabled</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable Grafana /metrics endpoint</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>cookie_samesite</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Cookie SameSite attribute: 'strict' prevents sending cookie for cross-site requests, effectively disabling direct linking from other sites to Grafana. 'lax' is the default value.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>alerting_error_or_timeout</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Default error or timeout setting for new alerting rules</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>alerting_nodata_or_nullvalues</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Default value for 'no data or null values' for new alerting rules</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>alerting_enabled</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable or disable Grafana legacy alerting functionality. This should not be enabled with unified_alerting_enabled.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>alerting_max_annotations_to_keep</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            max: <code>1000000</code>
        </div>
    </p>
    <p class="title">Max number of alert annotations that Grafana stores. 0 (default) keeps all alert annotations.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>dashboards_min_refresh_interval</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Minimum refresh interval</p>
    <div class="description">Signed sequence of decimal numbers, followed by a unit suffix (ms, s, m, h, d), e.g. 30s, 1h</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>dashboards_versions_to_keep</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>1</code>
            max: <code>100</code>
        </div>
    </p>
    <p class="title">Dashboard versions to keep per dashboard</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>dataproxy_timeout</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>15</code>
            max: <code>90</code>
        </div>
    </p>
    <p class="title">Timeout for data proxy requests in seconds</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>dataproxy_send_user_header</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Send 'X-Grafana-User' header to data source</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>dashboard_previews_enabled</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable browsing of dashboards in grid (pictures) mode</p>
    <div class="description">This feature is new in Grafana 9 and is quite resource intensive. It may cause low-end plans to work more slowly while the dashboard previews are rendering.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>viewers_can_edit</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Users with view-only permission can edit but not save dashboards</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>editors_can_admin</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Editors can manage folders, teams and dashboards created by them</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>disable_gravatar</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Set to true to disable gravatar. Defaults to false (gravatar is enabled)</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>allow_embedding</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Allow embedding Grafana dashboards with iframe/frame/object/embed tags. Disabled by default to limit impact of clickjacking</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>date_formats</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Grafana date format specifications</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>full_date</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string for cases where full date is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interval_second</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string used when a time requiring second accuracy is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interval_minute</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string used when a time requiring minute accuracy is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interval_hour</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string used when a time requiring hour accuracy is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interval_day</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string used when a time requiring day accuracy is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interval_month</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string used when a time requiring month accuracy is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>interval_year</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Moment.js style format string used when a time requiring year accuracy is shown</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>default_timezone</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Default time zone for user preferences. Value 'browser' uses browser local time zone.</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>unified_alerting_enabled</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable or disable Grafana unified alerting functionality. By default this is enabled and any legacy alerts will be migrated on upgrade to Grafana 9+. To stay on legacy alerting, set unified_alerting_enabled to false and alerting_enabled to true. See https://grafana.com/docs/grafana/latest/alerting/set-up/migrating-alerts/ for more details.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
</table>
    