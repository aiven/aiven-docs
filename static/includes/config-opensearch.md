
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
      <b>opensearch_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">OpenSearch major version</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>disable_replication_factor_adjustment</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Disable replication factor adjustment</p>
    <div class="description">DEPRECATED: Disable automatic replication factor adjustment for multi-node services. By default, Aiven ensures all indexes are replicated at least to two nodes. Note: Due to potential data loss in case of losing a service node, this setting can no longer be activated.</div>
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
      <b>saml</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">OpenSearch SAML configuration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable or disable OpenSearch SAML authentication</p>
          <div class="description">Enables or disables SAML-based authentication for OpenSearch. When enabled, users can authenticate using SAML with an Identity Provider.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>idp_metadata_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Identity Provider (IdP) SAML metadata URL</p>
          <div class="description">The URL of the SAML metadata for the Identity Provider (IdP). This is used to configure SAML-based authentication with the IdP.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>idp_entity_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Identity Provider Entity ID</p>
          <div class="description">The unique identifier for the Identity Provider (IdP) entity that is used for SAML authentication. This value is typically provided by the IdP.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sp_entity_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Service Provider Entity ID</p>
          <div class="description">The unique identifier for the Service Provider (SP) entity that is used for SAML authentication. This value is typically provided by the SP.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>subject_key</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">SAML response subject attribute</p>
          <div class="description">Optional. Specifies the attribute in the SAML response where the subject identifier is stored. If not configured, the NameID attribute is used by default.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>roles_key</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">SAML response role attribute</p>
          <div class="description">Optional. Specifies the attribute in the SAML response where role information is stored, if available. Role attributes are not required for SAML authentication, but can be included in SAML assertions by most Identity Providers (IdPs) to determine user access levels or permissions.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>idp_pemtrustedcas_content</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">PEM-encoded root CA Content for SAML IdP server verification</p>
          <div class="description">This parameter specifies the PEM-encoded root certificate authority (CA) content for the SAML identity provider (IdP) server verification. The root CA content is used to verify the SSL/TLS certificate presented by the server.</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>openid</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">OpenSearch OpenID Connect Configuration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable or disable OpenSearch OpenID Connect authentication</p>
          <div class="description">Enables or disables OpenID Connect authentication for OpenSearch. When enabled, users can authenticate using OpenID Connect with an Identity Provider.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>connect_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">OpenID Connect metadata/configuration URL</p>
          <div class="description">The URL of your IdP where the Security plugin can find the OpenID Connect metadata/configuration settings.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>roles_key</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">The key in the JSON payload that stores the user’s roles</p>
          <div class="description">The key in the JSON payload that stores the user’s roles. The value of this key must be a comma-separated list of roles. Required only if you want to use roles in the JWT</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>subject_key</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">The key in the JSON payload that stores the user’s name</p>
          <div class="description">The key in the JSON payload that stores the user’s name. If not defined, the subject registered claim is used. Most IdP providers use the preferred_username claim. Optional.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>jwt_header</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">The HTTP header that stores the token</p>
          <div class="description">The HTTP header that stores the token. Typically the Authorization header with the Bearer schema: Authorization: Bearer &lt;token&gt;. Optional. Default is Authorization.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>jwt_url_parameter</b>&nbsp;<code class="type">string,null</code>
          </p>
          <p class="title">URL JWT token.</p>
          <div class="description">If the token is not transmitted in the HTTP header, but as an URL parameter, define the name of the parameter here. Optional.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>refresh_rate_limit_count</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The maximum number of unknown key IDs in the time frame</p>
          <div class="description">The maximum number of unknown key IDs in the time frame. Default is 10. Optional.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>refresh_rate_limit_time_window_ms</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                min: <code>10000</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The time frame to use when checking the maximum number of unknown key IDs, in milliseconds</p>
          <div class="description">The time frame to use when checking the maximum number of unknown key IDs, in milliseconds. Optional.Default is 10000 (10 seconds).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_id</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The ID of the OpenID Connect client</p>
          <div class="description">The ID of the OpenID Connect client configured in your IdP. Required.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>client_secret</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The client secret of the OpenID Connect</p>
          <div class="description">The client secret of the OpenID Connect client configured in your IdP. Required.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>scope</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The scope of the identity token issued by the IdP</p>
          <div class="description">The scope of the identity token issued by the IdP. Optional. Default is openid profile email address phone.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>header</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">HTTP header name of the JWT token</p>
          <div class="description">HTTP header name of the JWT token. Optional. Default is Authorization.</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>index_patterns</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">Index patterns</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>max_index_count</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            max: <code>9223372036854776000</code>
        </div>
    </p>
    <p class="title">Maximum index count</p>
    <div class="description">DEPRECATED: use index_patterns instead</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>keep_index_refresh_interval</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Don't reset index.refresh_interval to the default value</p>
    <div class="description">Aiven automation resets index.refresh_interval to default value for every index to be sure that indices are always visible to search. If it doesn't fit your case, you can disable this by setting up this flag to true.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>opensearch_dashboards</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">OpenSearch Dashboards settings</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable or disable OpenSearch Dashboards</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_old_space_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>64</code>
                max: <code>2048</code>
            </div>
          </p>
          <p class="title">max_old_space_size</p>
          <div class="description">Limits the maximum amount of memory (in MiB) the OpenSearch Dashboards process can use. This sets the max_old_space_size option of the nodejs running the OpenSearch Dashboards. Note: the memory reserved by OpenSearch Dashboards is not available for OpenSearch.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>opensearch_request_timeout</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>5000</code>
                max: <code>120000</code>
            </div>
          </p>
          <p class="title">Timeout in milliseconds for requests made by OpenSearch Dashboards towards OpenSearch</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>opensearch</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">OpenSearch settings</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>reindex_remote_whitelist</b>&nbsp;<code class="type">array,null</code>
          </p>
          <p class="title">reindex_remote_whitelist</p>
          <div class="description">Whitelisted addresses for reindexing. Changing this value will cause all OpenSearch instances to restart.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>http_max_content_length</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">http.max_content_length</p>
          <div class="description">Maximum content length for HTTP requests to the OpenSearch HTTP API, in bytes.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>http_max_header_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1024</code>
                max: <code>262144</code>
            </div>
          </p>
          <p class="title">http.max_header_size</p>
          <div class="description">The max size of allowed headers, in bytes</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>http_max_initial_line_length</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1024</code>
                max: <code>65536</code>
            </div>
          </p>
          <p class="title">http.max_initial_line_length</p>
          <div class="description">The max length of an HTTP URL, in bytes</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_query_bool_max_clause_count</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>64</code>
                max: <code>4096</code>
            </div>
          </p>
          <p class="title">indices.query.bool.max_clause_count</p>
          <div class="description">Maximum number of clauses Lucene BooleanQuery can have. The default value (1024) is relatively high, and increasing it may cause performance issues. Investigate other approaches first before increasing this value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>search_max_buckets</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>1000000</code>
            </div>
          </p>
          <p class="title">search.max_buckets</p>
          <div class="description">Maximum number of aggregation buckets allowed in a single response. OpenSearch default value is used when this is not defined.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_fielddata_cache_size</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                min: <code>3</code>
                max: <code>100</code>
            </div>
          </p>
          <p class="title">indices.fielddata.cache.size</p>
          <div class="description">Relative amount. Maximum amount of heap memory used for field data cache. This is an expert setting; decreasing the value too much will increase overhead of loading field data; too much memory used for field data cache will decrease amount of heap available for other operations.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_memory_index_buffer_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>3</code>
                max: <code>40</code>
            </div>
          </p>
          <p class="title">indices.memory.index_buffer_size</p>
          <div class="description">Percentage value. Default is 10%. Total amount of heap used for indexing buffer, before writing segments to disk. This is an expert setting. Too low value will slow down indexing; too high value will increase indexing performance but causes performance issues for query performance.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_memory_min_index_buffer_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>3</code>
                max: <code>2048</code>
            </div>
          </p>
          <p class="title">indices.memory.min_index_buffer_size</p>
          <div class="description">Absolute value. Default is 48mb. Doesn't work without indices.memory.index_buffer_size. Minimum amount of heap used for query cache, an absolute indices.memory.index_buffer_size minimal hard limit.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_memory_max_index_buffer_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>3</code>
                max: <code>2048</code>
            </div>
          </p>
          <p class="title">indices.memory.max_index_buffer_size</p>
          <div class="description">Absolute value. Default is unbound. Doesn't work without indices.memory.index_buffer_size. Maximum amount of heap used for query cache, an absolute indices.memory.index_buffer_size maximum hard limit.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_queries_cache_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>3</code>
                max: <code>40</code>
            </div>
          </p>
          <p class="title">indices.queries.cache.size</p>
          <div class="description">Percentage value. Default is 10%. Maximum amount of heap used for query cache. This is an expert setting. Too low value will decrease query performance and increase performance for other operations; too high value will cause issues with other OpenSearch functionality.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_recovery_max_bytes_per_sec</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>40</code>
                max: <code>400</code>
            </div>
          </p>
          <p class="title">indices.recovery.max_bytes_per_sec</p>
          <div class="description">Limits total inbound and outbound recovery traffic for each node. Applies to both peer recoveries as well as snapshot recoveries (i.e., restores from a snapshot). Defaults to 40mb</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>indices_recovery_max_concurrent_file_chunks</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>2</code>
                max: <code>5</code>
            </div>
          </p>
          <p class="title">indices.recovery.max_concurrent_file_chunks</p>
          <div class="description">Number of file chunks sent in parallel for each recovery. Defaults to 2.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>action_auto_create_index_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">action.auto_create_index</p>
          <div class="description">Explicitly allow or block automatic creation of indices. Defaults to true</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>plugins_alerting_filter_by_backend_roles</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">plugins.alerting.filter_by_backend_roles</p>
          <div class="description">Enable or disable filtering of alerting by backend roles. Requires Security plugin. Defaults to false</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auth_failure_listeners</b>&nbsp;<code class="type">object</code>
          </p>
          <p class="title">Opensearch Security Plugin Settings</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>enable_security_audit</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable/Disable security audit</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_search_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>128</code>
            </div>
          </p>
          <p class="title">search thread pool size</p>
          <div class="description">Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_search_throttled_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>128</code>
            </div>
          </p>
          <p class="title">search_throttled thread pool size</p>
          <div class="description">Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_get_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>128</code>
            </div>
          </p>
          <p class="title">get thread pool size</p>
          <div class="description">Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_analyze_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>128</code>
            </div>
          </p>
          <p class="title">analyze thread pool size</p>
          <div class="description">Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_write_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>128</code>
            </div>
          </p>
          <p class="title">write thread pool size</p>
          <div class="description">Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_force_merge_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>128</code>
            </div>
          </p>
          <p class="title">force_merge thread pool size</p>
          <div class="description">Size for the thread pool. See documentation for exact details. Do note this may have maximum value depending on CPU count - value is automatically lowered if set to higher than maximum value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_search_queue_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>2000</code>
            </div>
          </p>
          <p class="title">search thread pool queue size</p>
          <div class="description">Size for the thread pool queue. See documentation for exact details.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_search_throttled_queue_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>2000</code>
            </div>
          </p>
          <p class="title">search_throttled thread pool queue size</p>
          <div class="description">Size for the thread pool queue. See documentation for exact details.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_get_queue_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>2000</code>
            </div>
          </p>
          <p class="title">get thread pool queue size</p>
          <div class="description">Size for the thread pool queue. See documentation for exact details.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_analyze_queue_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>2000</code>
            </div>
          </p>
          <p class="title">analyze thread pool queue size</p>
          <div class="description">Size for the thread pool queue. See documentation for exact details.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>thread_pool_write_queue_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>2000</code>
            </div>
          </p>
          <p class="title">write thread pool queue size</p>
          <div class="description">Size for the thread pool queue. See documentation for exact details.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>action_destructive_requires_name</b>&nbsp;<code class="type">boolean,null</code>
          </p>
          <p class="title">Require explicit index names when deleting</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>cluster_max_shards_per_node</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>100</code>
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">cluster.max_shards_per_node</p>
          <div class="description">Controls the number of shards allowed in the cluster per data node</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>override_main_response_version</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">compatibility.override_main_response_version</p>
          <div class="description">Compatibility mode sets OpenSearch to report its version as 7.10 so clients continue to work. Default is false</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>script_max_compilations_rate</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Script max compilation rate - circuit breaker to prevent/minimize OOMs</p>
          <div class="description">Script compilation circuit breaker limits the number of inline script compilations within a period of time. Default is use-context</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>cluster_routing_allocation_node_concurrent_recoveries</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>2</code>
                max: <code>16</code>
            </div>
          </p>
          <p class="title">Concurrent incoming/outgoing shard recoveries per node</p>
          <div class="description">How many concurrent incoming/outgoing shard recoveries (normally replicas) are allowed to happen on a node. Defaults to 2.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>email_sender_name</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Sender name placeholder to be used in Opensearch Dashboards and Opensearch keystore</p>
          <div class="description">This should be identical to the Sender name defined in Opensearch dashboards</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>email_sender_username</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Sender username for Opensearch alerts</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>email_sender_password</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Sender password for Opensearch alerts to authenticate with SMTP server</p>
          <div class="description">Sender password for Opensearch alerts to authenticate with SMTP server</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ism_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Specifies whether ISM is enabled or not</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ism_history_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Specifies whether audit history is enabled or not. The logs from ISM are automatically indexed to a logs document.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ism_history_max_age</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">The maximum age before rolling over the audit history index in hours</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ism_history_max_docs</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">The maximum number of documents before rolling over the audit history index.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ism_history_rollover_check_period</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">The time between rollover checks for the audit history index in hours.</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ism_history_rollover_retention_period</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">How long audit history indices are kept in days.</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>index_template</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Template settings for all new indexes</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>mapping_nested_objects_limit</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                max: <code>100000</code>
            </div>
          </p>
          <p class="title">index.mapping.nested_objects.limit</p>
          <div class="description">The maximum number of nested JSON objects that a single document can contain across all nested types. This limit helps to prevent out of memory errors when a document contains too many nested objects. Default is 10000.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>number_of_shards</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>1024</code>
            </div>
          </p>
          <p class="title">index.number_of_shards</p>
          <div class="description">The number of primary shards that an index should have.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>number_of_replicas</b>&nbsp;<code class="type">integer,null</code>
            <div class="constraints">
                max: <code>29</code>
            </div>
          </p>
          <p class="title">index.number_of_replicas</p>
          <div class="description">The number of replicas each primary shard has.</div>
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
            <b>opensearch</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to opensearch with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>opensearch_dashboards</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to opensearch_dashboards with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
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
            <b>opensearch</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable opensearch</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>opensearch_dashboards</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable opensearch_dashboards</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable prometheus</p>
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
            <b>opensearch</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to opensearch from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>opensearch_dashboards</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to opensearch_dashboards from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
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
</table>
    