
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <tbody>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="sasl_oauthbearer_expected_audience" to="#sasl_oauthbearer_expected_audience">
                  <strong>sasl_oauthbearer_expected_audience</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>The (optional) comma-delimited setting for the broker to use to verify that the JWT was issued for one of the expected audiences. (Default: null)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="sasl_oauthbearer_expected_issuer" to="#sasl_oauthbearer_expected_issuer">
                  <strong>sasl_oauthbearer_expected_issuer</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Optional setting for the broker to use to verify that the JWT was created by the expected issuer.(Default: null)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="sasl_oauthbearer_jwks_endpoint_url" to="#sasl_oauthbearer_jwks_endpoint_url">
                  <strong>sasl_oauthbearer_jwks_endpoint_url</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>OIDC JWKS endpoint URL. By setting this the SASL SSL OAuth2/OIDC authentication is enabled. See also other options for SASL OAuth2/OIDC. (Default: null)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="auto_create_topics_enable" to="#auto_create_topics_enable">
                  <strong>auto_create_topics_enable</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Enable auto-creation of topics. (Default: false)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="log_local_retention_ms" to="#log_local_retention_ms">
                  <strong>log_local_retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>900000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The number of milliseconds to keep the local log segments before it gets eligible for deletion. If set to -2, the value of log.retention.ms is used. The effective value should always be less than or equal to log.retention.ms value. (Default: -2)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="log_local_retention_bytes" to="#log_local_retention_bytes">
                  <strong>log_local_retention_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>5368709120</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum size of local log segments that can grow for a partition before it gets eligible for deletion. If set to -2, the value of log.retention.bytes is used. The effective value should always be less than or equal to log.retention.bytes value. (Default: -2)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="log_retention_bytes" to="#log_retention_bytes">
                  <strong>log_retention_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>-1</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum size of the log before deleting messages (Default: -1)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="log_retention_hours" to="#log_retention_hours">
                  <strong>log_retention_hours</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>-1</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The number of hours to keep a log file before deleting it. Use -1 for unlimited retention or 1 or higher. Setting 0 is invalid and prevents Kafka from starting. (Default: 168 hours, or 1 week)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="log_retention_ms" to="#log_retention_ms">
                  <strong>log_retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>range: <code>-1</code> or between <code>60000</code> and <code>9223372036854775807</code></li>
                  <li>min: <code>-1</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used. If set to -1, no time limit is applied. (Default: null, log.retention.hours applies)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="message_max_bytes" to="#message_max_bytes">
                  <strong>message_max_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>20971520</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum size of message that the server can receive. (Default: 1048588 bytes (1 mebibyte + 12 bytes))</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="default_replication_factor" to="#default_replication_factor">
                  <strong>default_replication_factor</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>3</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Replication factor for auto-created topics (Default: 3)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="num_partitions" to="#num_partitions">
                  <strong>num_partitions</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>2048</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Number of partitions for auto-created topics (Default: 1)</p>
              </div>
        </td>
      </tr>
  </tbody>
</table>
