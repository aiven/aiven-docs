## additional_backup_regions

**Title:** Additional Cloud Regions for Backup Replication


**Type:** `array`

## opensearch_version

**Title:** OpenSearch major version


**Type:** `string,null`

## disable_replication_factor_adjustment

**Title:** Disable replication factor adjustment

**Description:** DEPRECATED: Disable automatic replication factor adjustment for multi-node services. By default, Aiven ensures all indexes are replicated at least to two nodes. Note: Due to potential data loss in case of losing a service node, this setting can no longer be activated.

**Type:** `boolean,null`

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

## saml

**Title:** OpenSearch SAML configuration


**Type:** `object`

### enabled

**Title:** Enable or disable OpenSearch SAML authentication

**Description:** Enables or disables SAML-based authentication for OpenSearch. When enabled, users can authenticate using SAML with an Identity Provider.

**Type:** `boolean`

### idp_metadata_url

**Title:** Identity Provider (IdP) SAML metadata URL

**Description:** The URL of the SAML metadata for the Identity Provider (IdP). This is used to configure SAML-based authentication with the IdP.

**Type:** `string`

### idp_entity_id

**Title:** Identity Provider Entity ID

**Description:** The unique identifier for the Identity Provider (IdP) entity that is used for SAML authentication. This value is typically provided by the IdP.

**Type:** `string`

### sp_entity_id

**Title:** Service Provider Entity ID

**Description:** The unique identifier for the Service Provider (SP) entity that is used for SAML authentication. This value is typically provided by the SP.

**Type:** `string`

### subject_key

**Title:** SAML response subject attribute

**Description:** Optional. Specifies the attribute in the SAML response where the subject identifier is stored. If not configured, the NameID attribute is used by default.

**Type:** `string,null`

### roles_key

**Title:** SAML response role attribute

**Description:** Optional. Specifies the attribute in the SAML response where role information is stored, if available. Role attributes are not required for SAML authentication, but can be included in SAML assertions by most Identity Providers (IdPs) to determine user access levels or permissions.

**Type:** `string,null`

### idp_pemtrustedcas_content

**Title:** PEM-encoded root CA Content for SAML IdP server verification

**Description:** This parameter specifies the PEM-encoded root certificate authority (CA) content for the SAML identity provider (IdP) server verification. The root CA content is used to verify the SSL/TLS certificate presented by the server.

**Type:** `string,null`

## openid

**Title:** OpenSearch OpenID Connect Configuration


**Type:** `object`

### enabled

**Title:** Enable or disable OpenSearch OpenID Connect authentication

**Description:** Enables or disables OpenID Connect authentication for OpenSearch. When enabled, users can authenticate using OpenID Connect with an Identity Provider.

**Type:** `boolean`

### connect_url

**Title:** OpenID Connect metadata/configuration URL

**Description:** The URL of your IdP where the Security plugin can find the OpenID Connect metadata/configuration settings.

**Type:** `string`

### roles_key

**Title:** The key in the JSON payload that stores the user’s roles

**Description:** The key in the JSON payload that stores the user’s roles. The value of this key must be a comma-separated list of roles. Required only if you want to use roles in the JWT

**Type:** `string,null`

### subject_key

**Title:** The key in the JSON payload that stores the user’s name

**Description:** The key in the JSON payload that stores the user’s name. If not defined, the subject registered claim is used. Most IdP providers use the preferred_username claim. Optional.

**Type:** `string,null`

### jwt_header

**Title:** The HTTP header that stores the token

**Description:** The HTTP header that stores the token. Typically the Authorization header with the Bearer schema: Authorization: Bearer &lt;token&gt;. Optional. Default is Authorization.

**Type:** `string,null`

### jwt_url_parameter

**Title:** URL JWT token.

**Description:** If the token is not transmitted in the HTTP header, but as an URL parameter, define the name of the parameter here. Optional.

**Type:** `string,null`

### refresh_rate_limit_count

**Title:** The maximum number of unknown key IDs in the time frame

**Description:** The maximum number of unknown key IDs in the time frame. Default is 10. Optional.

**Type:** `integer,null`

### refresh_rate_limit_time_window_ms

**Title:** The time frame to use when checking the maximum number of unknown key IDs, in milliseconds

**Description:** The time frame to use when checking the maximum number of unknown key IDs, in milliseconds. Optional.Default is 10000 (10 seconds).

**Type:** `integer,null`

### client_id

**Title:** The ID of the OpenID Connect client

**Description:** The ID of the OpenID Connect client configured in your IdP. Required.

**Type:** `string`

### client_secret

**Title:** The client secret of the OpenID Connect

**Description:** The client secret of the OpenID Connect client configured in your IdP. Required.

**Type:** `string`

### scope

**Title:** The scope of the identity token issued by the IdP

**Description:** The scope of the identity token issued by the IdP. Optional. Default is openid profile email address phone.

**Type:** `string`

### header

**Title:** HTTP header name of the JWT token

**Description:** HTTP header name of the JWT token. Optional. Default is Authorization.

**Type:** `string`

## index_patterns

**Title:** Index patterns


**Type:** `array`

## max_index_count

**Title:** Maximum index count

**Description:** DEPRECATED: use index_patterns instead

**Type:** `integer`

## keep_index_refresh_interval

**Title:** Don't reset index.refresh_interval to the default value

**Description:** Aiven automation resets index.refresh_interval to default value for every index to be sure that indices are always visible to search. If it doesn't fit your case, you can disable this by setting up this flag to true.

**Type:** `boolean`

## opensearch_dashboards

**Title:** OpenSearch Dashboards settings


**Type:** `object`

### enabled

**Title:** Enable or disable OpenSearch Dashboards


**Type:** `boolean`

### max_old_space_size

**Title:** max_old_space_size

**Description:** Limits the maximum amount of memory (in MiB) the OpenSearch Dashboards process can use. This sets the max_old_space_size option of the nodejs running the OpenSearch Dashboards. Note: the memory reserved by OpenSearch Dashboards is not available for OpenSearch.

**Type:** `integer`

### opensearch_request_timeout

**Title:** Timeout in milliseconds for requests made by OpenSearch Dashboards towards OpenSearch


**Type:** `integer`

## opensearch

**Title:** OpenSearch settings


**Type:** `object`

### reindex_remote_whitelist

**Title:** reindex_remote_whitelist

**Description:** Whitelisted addresses for reindexing. Changing this value will cause all OpenSearch instances to restart.

**Type:** `array,null`

### http_max_content_length

**Title:** http.max_content_length

**Description:** Maximum content length for HTTP requests to the OpenSearch HTTP API, in bytes.

**Type:** `integer`

### http_max_header_size

**Title:** http.max_header_size

**Description:** The max size of allowed headers, in bytes

**Type:** `integer`

### http_max_initial_line_length

**Title:** http.max_initial_line_length

**Description:** The max length of an HTTP URL, in bytes

**Type:** `integer`

### indices_query_bool_max_clause_count

**Title:** indices.query.bool.max_clause_count

**Description:** Maximum number of clauses Lucene BooleanQuery can have. The default value (1024) is relatively high, and increasing it may cause performance issues. Investigate other approaches first before increasing this value.

**Type:** `integer`

### search_max_buckets

**Title:** search.max_buckets

**Description:** Maximum number of aggregation buckets allowed in a single response. OpenSearch default value is used when this is not defined.

**Type:** `integer,null`

### indices_fielddata_cache_size

**Title:** indices.fielddata.cache.size

**Description:** Relative amount. Maximum amount of heap memory used for field data cache. This is an expert setting; decreasing the value too much will increase overhead of loading field data; too much memory used for field data cache will decrease amount of heap available for other operations.

**Type:** `integer,null`

### indices_memory_index_buffer_size

**Title:** indices.memory.index_buffer_size

**Description:** Percentage value. Default is 10%. Total amount of heap used for indexing buffer, before writing segments to disk. This is an expert setting. Too low value will slow down indexing; too high value will increase indexing performance but causes performance issues for query performance.

**Type:** `integer`

### indices_memory_min_index_buffer_size

**Title:** indices.memory.min_index_buffer_size

**Description:** Absolute value. Default is 48mb. Doesn't work without indices.memory.index_buffer_size. Minimum amount of heap used for query cache, an absolute indices.memory.index_buffer_size minimal hard limit.

**Type:** `integer`

### indices_memory_max_index_buffer_size

**Title:** indices.memory.max_index_buffer_size

**Description:** Absolute value. Default is unbound. Doesn't work without indices.memory.index_buffer_size. Maximum amount of heap used for query cache, an absolute indices.memory.index_buffer_size maximum hard limit.

**Type:** `integer`

### indices_queries_cache_size

**Title:** indices.queries.cache.size

**Description:** Percentage value. Default is 10%. Maximum amount of heap used for query cache. This is an expert setting. Too low value will decrease query performance and increase performance for other operations; too high value will cause issues with other OpenSearch functionality.

**Type:** `integer`

### indices_recovery_max_bytes_per_sec

**Title:** indices.recovery.max_bytes_per_sec

**Description:** Limits total inbound and outbound recovery traffic for each node. Applies to both peer recoveries as well as snapshot recoveries (i.e., restores from a snapshot). Defaults to 40mb

**Type:** `integer`

### indices_recovery_max_concurrent_file_chunks

**Title:** indices.recovery.max_concurrent_file_chunks

**Description:** Number of file chunks sent in parallel for each recovery. Defaults to 2.

**Type:** `integer`

### action_auto_create_index_enabled

**Title:** action.auto_create_index

**Description:** Explicitly allow or block automatic creation of indices. Defaults to true

**Type:** `boolean`

### plugins_alerting_filter_by_backend_roles

**Title:** plugins.alerting.filter_by_backend_roles

**Description:** Enable or disable filtering of alerting by backend roles. Requires Security plugin. Defaults to false

**Type:** `boolean`

### auth_failure_listeners

**Title:** Opensearch Security Plugin Settings


**Type:** `object`

### enable_security_audit

**Title:** Enable/Disable security audit


**Type:** `boolean`

### thread_pool_search_size

**Title:** search thread pool size

**Description:** Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.

**Type:** `integer`

### thread_pool_search_throttled_size

**Title:** search_throttled thread pool size

**Description:** Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.

**Type:** `integer`

### thread_pool_get_size

**Title:** get thread pool size

**Description:** Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.

**Type:** `integer`

### thread_pool_analyze_size

**Title:** analyze thread pool size

**Description:** Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.

**Type:** `integer`

### thread_pool_write_size

**Title:** write thread pool size

**Description:** Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.

**Type:** `integer`

### thread_pool_force_merge_size

**Title:** force_merge thread pool size

**Description:** Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.

**Type:** `integer`

### thread_pool_search_queue_size

**Title:** search thread pool queue size

**Description:** Size for the thread pool queue. See documentation for exact details.

**Type:** `integer`

### thread_pool_search_throttled_queue_size

**Title:** search_throttled thread pool queue size

**Description:** Size for the thread pool queue. See documentation for exact details.

**Type:** `integer`

### thread_pool_get_queue_size

**Title:** get thread pool queue size

**Description:** Size for the thread pool queue. See documentation for exact details.

**Type:** `integer`

### thread_pool_analyze_queue_size

**Title:** analyze thread pool queue size

**Description:** Size for the thread pool queue. See documentation for exact details.

**Type:** `integer`

### thread_pool_write_queue_size

**Title:** write thread pool queue size

**Description:** Size for the thread pool queue. See documentation for exact details.

**Type:** `integer`

### action_destructive_requires_name

**Title:** Require explicit index names when deleting


**Type:** `boolean,null`

### cluster_max_shards_per_node

**Title:** cluster.max_shards_per_node

**Description:** Controls the number of shards allowed in the cluster per data node

**Type:** `integer`

### override_main_response_version

**Title:** compatibility.override_main_response_version

**Description:** Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work. Default is false

**Type:** `boolean`

### script_max_compilations_rate

**Title:** Script max compilation rate - circuit breaker to prevent/minimize OOMs

**Description:** Script compilation circuit breaker limits the number of inline script compilations within a period of time. Default is use-context

**Type:** `string`

### cluster_routing_allocation_node_concurrent_recoveries

**Title:** Concurrent incoming/outgoing shard recoveries per node

**Description:** How many concurrent incoming/outgoing shard recoveries (normally replicas) are allowed to happen on a node. Defaults to 2.

**Type:** `integer`

### email_sender_name

**Title:** Sender name placeholder to be used in Opensearch Dashboards and Opensearch keystore

**Description:** This should be identical to the Sender name defined in Opensearch dashboards

**Type:** `string`

### email_sender_username

**Title:** Sender username for Opensearch alerts


**Type:** `string`

### email_sender_password

**Title:** Sender password for Opensearch alerts to authenticate with SMTP server

**Description:** Sender password for Opensearch alerts to authenticate with SMTP server

**Type:** `string`

### ism_enabled

**Title:** Specifies whether ISM is enabled or not


**Type:** `boolean`

### ism_history_enabled

**Title:** Specifies whether audit history is enabled or not. The logs from ISM are automatically indexed to a logs document.


**Type:** `boolean`

### ism_history_max_age

**Title:** The maximum age before rolling over the audit history index in hours


**Type:** `integer`

### ism_history_max_docs

**Title:** The maximum number of documents before rolling over the audit history index.


**Type:** `integer`

### ism_history_rollover_check_period

**Title:** The time between rollover checks for the audit history index in hours.


**Type:** `integer`

### ism_history_rollover_retention_period

**Title:** How long audit history indices are kept in days.


**Type:** `integer`

## index_template

**Title:** Template settings for all new indexes


**Type:** `object`

### mapping_nested_objects_limit

**Title:** index.mapping.nested_objects.limit

**Description:** The maximum number of nested JSON objects that a single document can contain across all nested types. This limit helps to prevent out of memory errors when a document contains too many nested objects. Default is 10000.

**Type:** `integer,null`

### number_of_shards

**Title:** index.number_of_shards

**Description:** The number of primary shards that an index should have.

**Type:** `integer,null`

### number_of_replicas

**Title:** index.number_of_replicas

**Description:** The number of replicas each primary shard has.

**Type:** `integer,null`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### opensearch

**Title:** Allow clients to connect to opensearch with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### opensearch_dashboards

**Title:** Allow clients to connect to opensearch_dashboards with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### opensearch

**Title:** Enable opensearch


**Type:** `boolean`

### opensearch_dashboards

**Title:** Enable opensearch_dashboards


**Type:** `boolean`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### opensearch

**Title:** Allow clients to connect to opensearch from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### opensearch_dashboards

**Title:** Allow clients to connect to opensearch_dashboards from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


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

    