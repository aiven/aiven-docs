## additional_backup_regions

**Title:** Additional Cloud Regions for Backup Replication


**Type:** `array`

## custom_domain

**Title:** Custom domain

**Description:** Serve the web frontend using a custom CNAME pointing to the Aiven DNS name

**Type:** `string,null`

## ip_filter

**Title:** IP filter

**Description:** Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'

**Type:** `array`

## service_log

**Title:** Service logging

**Description:** Store logs for the service so that they are available in the HTTP API and console.

**Type:** `boolean,null`

## static_ips

**Title:** Static IP addresses

**Description:** Use static public IP addresses

**Type:** `boolean`

## external_image_storage

**Title:** External image store settings


**Type:** `object`

### provider

**Title:** Provider type


**Type:** `string`

### bucket_url

**Title:** Bucket URL for S3


**Type:** `string`

### access_key

**Title:** S3 access key. Requires permissions to the S3 bucket for the s3:PutObject and s3:PutObjectAcl actions


**Type:** `string`

### secret_key

**Title:** S3 secret key


**Type:** `string`

## smtp_server

**Title:** SMTP server settings


**Type:** `object`

### host

**Title:** Server hostname or IP


**Type:** `string`

### port

**Title:** SMTP server port


**Type:** `integer`

### skip_verify

**Title:** Skip verifying server certificate. Defaults to false


**Type:** `boolean`

### username

**Title:** Username for SMTP authentication


**Type:** `string,null`

### password

**Title:** Password for SMTP authentication


**Type:** `string,null`

### from_address

**Title:** Address used for sending emails


**Type:** `string`

### from_name

**Title:** Name used in outgoing emails, defaults to Grafana


**Type:** `string,null`

### starttls_policy

**Title:** Either OpportunisticStartTLS, MandatoryStartTLS or NoStartTLS. Default is OpportunisticStartTLS.


**Type:** `string`

## auth_basic_enabled

**Title:** Enable or disable basic authentication form, used by Grafana built-in login


**Type:** `boolean`

## oauth_allow_insecure_email_lookup

**Title:** Enforce user lookup based on email instead of the unique ID provided by the IdP


**Type:** `boolean`

## auth_generic_oauth

**Title:** Generic OAuth integration


**Type:** `object`

### allow_sign_up

**Title:** Automatically sign-up users on successful sign-in


**Type:** `boolean`

### allowed_domains

**Title:** Allowed domains


**Type:** `array`

### allowed_organizations

**Title:** Require user to be member of one of the listed organizations


**Type:** `array`

### api_url

**Title:** API URL


**Type:** `string`

### auth_url

**Title:** Authorization URL


**Type:** `string`

### auto_login

**Title:** Allow users to bypass the login screen and automatically log in


**Type:** `boolean`

### client_id

**Title:** Client ID from provider


**Type:** `string`

### client_secret

**Title:** Client secret from provider


**Type:** `string`

### name

**Title:** Name of the OAuth integration


**Type:** `string`

### scopes

**Title:** OAuth scopes


**Type:** `array`

### token_url

**Title:** Token URL


**Type:** `string`

## auth_google

**Title:** Google Auth integration


**Type:** `object`

### allow_sign_up

**Title:** Automatically sign-up users on successful sign-in


**Type:** `boolean`

### client_id

**Title:** Client ID from provider


**Type:** `string`

### client_secret

**Title:** Client secret from provider


**Type:** `string`

### allowed_domains

**Title:** Domains allowed to sign-in to this Grafana


**Type:** `array`

## auth_github

**Title:** Github Auth integration


**Type:** `object`

### allow_sign_up

**Title:** Automatically sign-up users on successful sign-in


**Type:** `boolean`

### auto_login

**Title:** Allow users to bypass the login screen and automatically log in


**Type:** `boolean`

### client_id

**Title:** Client ID from provider


**Type:** `string`

### client_secret

**Title:** Client secret from provider


**Type:** `string`

### team_ids

**Title:** Require users to belong to one of given team IDs


**Type:** `array`

### allowed_organizations

**Title:** Require users to belong to one of given organizations


**Type:** `array`

### skip_org_role_sync

**Title:** Stop automatically syncing user roles


**Type:** `boolean`

## auth_gitlab

**Title:** GitLab Auth integration


**Type:** `object`

### allow_sign_up

**Title:** Automatically sign-up users on successful sign-in


**Type:** `boolean`

### api_url

**Title:** API URL. This only needs to be set when using self hosted GitLab


**Type:** `string`

### auth_url

**Title:** Authorization URL. This only needs to be set when using self hosted GitLab


**Type:** `string`

### client_id

**Title:** Client ID from provider


**Type:** `string`

### client_secret

**Title:** Client secret from provider


**Type:** `string`

### allowed_groups

**Title:** Require users to belong to one of given groups


**Type:** `array`

### token_url

**Title:** Token URL. This only needs to be set when using self hosted GitLab


**Type:** `string`

## auth_azuread

**Title:** Azure AD OAuth integration


**Type:** `object`

### allow_sign_up

**Title:** Automatically sign-up users on successful sign-in


**Type:** `boolean`

### client_id

**Title:** Client ID from provider


**Type:** `string`

### client_secret

**Title:** Client secret from provider


**Type:** `string`

### auth_url

**Title:** Authorization URL


**Type:** `string`

### token_url

**Title:** Token URL


**Type:** `string`

### allowed_groups

**Title:** Require users to belong to one of given groups


**Type:** `array`

### allowed_domains

**Title:** Allowed domains


**Type:** `array`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### grafana

**Title:** Allow clients to connect to grafana with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### grafana

**Title:** Enable grafana


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### grafana

**Title:** Allow clients to connect to grafana from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## recovery_basebackup_name

**Title:** Name of the basebackup to restore in forked service


**Type:** `string`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

## user_auto_assign_org

**Title:** Auto-assign new users on signup to main organization. Defaults to false


**Type:** `boolean`

## user_auto_assign_org_role

**Title:** Set role for new signups. Defaults to Viewer


**Type:** `string`

## google_analytics_ua_id

**Title:** Google Analytics ID


**Type:** `string`

## metrics_enabled

**Title:** Enable Grafana /metrics endpoint


**Type:** `boolean`

## cookie_samesite

**Title:** Cookie SameSite attribute: 'strict' prevents sending cookie for cross-site requests, effectively disabling direct linking from other sites to Grafana. 'lax' is the default value.


**Type:** `string`

## alerting_error_or_timeout

**Title:** Default error or timeout setting for new alerting rules


**Type:** `string`

## alerting_nodata_or_nullvalues

**Title:** Default value for 'no data or null values' for new alerting rules


**Type:** `string`

## alerting_enabled

**Title:** Enable or disable Grafana legacy alerting functionality. This should not be enabled with unified_alerting_enabled.


**Type:** `boolean`

## alerting_max_annotations_to_keep

**Title:** Max number of alert annotations that Grafana stores. 0 (default) keeps all alert annotations.


**Type:** `integer`

## dashboards_min_refresh_interval

**Title:** Minimum refresh interval

**Description:** Signed sequence of decimal numbers, followed by a unit suffix (ms, s, m, h, d), e.g. 30s, 1h

**Type:** `string`

## dashboards_versions_to_keep

**Title:** Dashboard versions to keep per dashboard


**Type:** `integer`

## dataproxy_timeout

**Title:** Timeout for data proxy requests in seconds


**Type:** `integer`

## dataproxy_send_user_header

**Title:** Send 'X-Grafana-User' header to data source


**Type:** `boolean`

## dashboard_previews_enabled

**Title:** Enable browsing of dashboards in grid (pictures) mode

**Description:** This feature is new in Grafana 9 and is quite resource intensive. It may cause low-end plans to work more slowly while the dashboard previews are rendering.

**Type:** `boolean`

## viewers_can_edit

**Title:** Users with view-only permission can edit but not save dashboards


**Type:** `boolean`

## editors_can_admin

**Title:** Editors can manage folders, teams and dashboards created by them


**Type:** `boolean`

## disable_gravatar

**Title:** Set to true to disable gravatar. Defaults to false (gravatar is enabled)


**Type:** `boolean`

## allow_embedding

**Title:** Allow embedding Grafana dashboards with iframe/frame/object/embed tags. Disabled by default to limit impact of clickjacking


**Type:** `boolean`

## date_formats

**Title:** Grafana date format specifications


**Type:** `object`

### full_date

**Title:** Moment.js style format string for cases where full date is shown


**Type:** `string`

### interval_second

**Title:** Moment.js style format string used when a time requiring second accuracy is shown


**Type:** `string`

### interval_minute

**Title:** Moment.js style format string used when a time requiring minute accuracy is shown


**Type:** `string`

### interval_hour

**Title:** Moment.js style format string used when a time requiring hour accuracy is shown


**Type:** `string`

### interval_day

**Title:** Moment.js style format string used when a time requiring day accuracy is shown


**Type:** `string`

### interval_month

**Title:** Moment.js style format string used when a time requiring month accuracy is shown


**Type:** `string`

### interval_year

**Title:** Moment.js style format string used when a time requiring year accuracy is shown


**Type:** `string`

### default_timezone

**Title:** Default time zone for user preferences. Value 'browser' uses browser local time zone.


**Type:** `string`

## unified_alerting_enabled

**Title:** Enable or disable Grafana unified alerting functionality. By default this is enabled and any legacy alerts will be migrated on upgrade to Grafana 9+. To stay on legacy alerting, set unified_alerting_enabled to false and alerting_enabled to true. See https://grafana.com/docs/grafana/latest/alerting/set-up/migrating-alerts/ for more details.


**Type:** `boolean`

    