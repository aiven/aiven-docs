---
title: Enable and configure SASL authentication

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ConsoleIcon from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® provides [multiple authentication methods](/docs/products/kafka/concepts/auth-types) to secure Kafka data, including Simple Authentication and Security Layer ([SASL](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer)) over SSL.

## Enable SASL authentication

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Select `kafka_authentication_methods.sasl` from the list and set the value to **Enabled**.
1. Click **Save configurations**.

The **Connection information** on the <ConsoleLabel name="overview"/> page now
allows connections using SASL or client certificate authentication.

:::note
SASL and client certificate connections use different ports. The host, CA, and user
credentials remain the same.
:::

</TabItem>
<TabItem value="cli" label="CLI">

Enable SASL authentication for your Aiven for Apache Kafka service using
[Aiven CLI](/docs/tools/cli):

1. Get the name of the Aiven for Apache Kafka service:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Enable SASL authentication:

   ```bash
   avn service update SERVICE_NAME -c kafka_authentication_methods.sasl=true
   ```

   Parameters:

   - `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
   - `kafka_authentication_methods.sasl`: Set to `true` to enable SASL authentication.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to enable SASL authentication on an existing service:

  ```bash
   curl -X PUT "https://console.aiven.io/v1/project/{project_name}/service/{service_name}" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "user_config": {
             "kafka_authentication_methods": {
               "sasl": true
             }
          }
       }'
   ```

   Parameters:

   - `project_name`: Name of your Aiven project.
   - `service_name`: Name of your Aiven for Apache Kafka service.
   - `API_TOKEN`: Personal Aiven [token](/docs/platform/howto/create_authentication_token).
   - `kafka_authentication_methods.sasl`: Set to `true` to enable SASL authentication.

</TabItem>
<TabItem value="terraform" label="Terraform">

Set the `kafka_authentication_methods.sasl` attribute in [your `aiven_kafka` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka#kafka_authentication_methods) to `true`.

</TabItem>
</Tabs>

## Configure SASL mechanisms

After [enabling SASL authentication](#enable-sasl-authentication), configure the SASL
mechanisms that clients can use.

Aiven for Apache Kafka® supports the following SASL mechanisms:

- **PLAIN**
- **SCRAM-SHA-256**
- **SCRAM-SHA-512**
- **OAUTHBEARER**

Use `kafka_sasl_mechanisms` to enable or disable **PLAIN**, **SCRAM-SHA-256**, and
**SCRAM-SHA-512**. These three mechanisms are enabled by default. Configure these
settings only to disable mechanisms that you do not need.

To enable **OAUTHBEARER**, set `kafka.sasl_oauthbearer_jwks_endpoint_url`. For optional
OIDC settings, see
[Enable OAuth2/OIDC authentication for Apache Kafka®](/docs/products/kafka/howto/enable-oidc).

You can use **OAUTHBEARER** with **PLAIN**, **SCRAM-SHA-256**, and **SCRAM-SHA-512**, or
use **OAUTHBEARER** as the only SASL mechanism.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, configure one or more SASL mechanisms:

   - To enable or disable **PLAIN**, set `kafka_sasl_mechanisms.plain` to **Enabled**
     or **Disabled**.
   - To enable or disable **SCRAM-SHA-256**, set `kafka_sasl_mechanisms.scram_sha_256`
     to **Enabled** or **Disabled**.
   - To enable or disable **SCRAM-SHA-512**, set `kafka_sasl_mechanisms.scram_sha_512`
     to **Enabled** or **Disabled**.
   - To enable **OAUTHBEARER**, set `kafka.sasl_oauthbearer_jwks_endpoint_url` to your
     provider's JWKS URL.

   Optional: For OAuth/OIDC-only authentication, disable `kafka_sasl_mechanisms.plain`,
   `kafka_sasl_mechanisms.scram_sha_256`, and `kafka_sasl_mechanisms.scram_sha_512`.

1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="CLI">

Configure SASL mechanisms for your Aiven for Apache Kafka service using
[Aiven CLI](/docs/tools/cli):

1. Get the name of the Aiven for Apache Kafka service:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` of your Aiven for Apache Kafka® service.

1. Configure **PLAIN** and **SCRAM** mechanisms. By default, all three are enabled; set
   a mechanism to `false` to disable it:

   ```bash
   avn service update SERVICE_NAME             \
    -c kafka_sasl_mechanisms.plain=true          \
    -c kafka_sasl_mechanisms.scram_sha_256=true  \
    -c kafka_sasl_mechanisms.scram_sha_512=true
   ```

   Parameters:

   - `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
   - `kafka_sasl_mechanisms.plain`: Set to `true` or `false` to enable or disable
     **PLAIN**.
   - `kafka_sasl_mechanisms.scram_sha_256`: Set to `true` or `false` to enable or
     disable **SCRAM-SHA-256**.
   - `kafka_sasl_mechanisms.scram_sha_512`: Set to `true` or `false` to enable or
     disable **SCRAM-SHA-512**.

1. To enable **OAUTHBEARER**, set `kafka.sasl_oauthbearer_jwks_endpoint_url`. The
   following example enables OAuth/OIDC-only authentication:

   ```bash
   avn service update SERVICE_NAME \
       -c kafka.sasl_oauthbearer_jwks_endpoint_url="https://my-jwks-endpoint.example.com/jwks" \
       -c kafka_sasl_mechanisms.plain=false \
       -c kafka_sasl_mechanisms.scram_sha_256=false \
       -c kafka_sasl_mechanisms.scram_sha_512=false
   ```

   To keep **PLAIN** or **SCRAM** mechanisms enabled, omit the corresponding
   `kafka_sasl_mechanisms` settings. SASL must already be enabled on the service.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to configure SASL mechanisms on an existing service:

```bash
curl -X PUT "https://console.aiven.io/v1/project/{project_name}/service/{service_name}" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "user_config": {
             "kafka_authentication_methods": {
               "sasl": true
             },
             "kafka": {
               "sasl_oauthbearer_jwks_endpoint_url": "https://my-jwks-endpoint.example.com/jwks"
             },
             "kafka_sasl_mechanisms": {
               "plain": false,
               "scram_sha_256": false,
               "scram_sha_512": false
             }
           }
         }'
```

Parameters:

- `project_name`: Name of your Aiven project.
- `service_name`: Name of your Aiven for Apache Kafka service.
- `API_TOKEN`: API token for authentication.
- `kafka_authentication_methods.sasl`: Set to `true` if SASL is not already enabled.
- `kafka.sasl_oauthbearer_jwks_endpoint_url`: JWKS endpoint URL; enables
  **OAUTHBEARER** when set.
- `kafka_sasl_mechanisms.plain`: Set to `true` or `false` to enable or disable
  **PLAIN**.
- `kafka_sasl_mechanisms.scram_sha_256`: Set to `true` or `false` to enable or disable
  **SCRAM-SHA-256**.
- `kafka_sasl_mechanisms.scram_sha_512`: Set to `true` or `false` to enable or disable
  **SCRAM-SHA-512**.

To keep **PLAIN** or **SCRAM** mechanisms enabled, omit the `kafka_sasl_mechanisms`
block or set the values to `true`.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `kafka_sasl_mechanisms` attribute in [your `aiven_kafka` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka#kafka_sasl_mechanisms)
to enable or disable SASL mechanisms. Set each mechanism to `true` or `false`:

- **PLAIN**: `kafka_sasl_mechanisms.plain`
- **SCRAM-SHA-256**: `kafka_sasl_mechanisms.scram_sha_256`
- **SCRAM-SHA-512**: `kafka_sasl_mechanisms.scram_sha_512`

To enable **OAUTHBEARER**, set `sasl_oauthbearer_jwks_endpoint_url` in the `kafka`
block of `user_config`. See
[Enable OAuth2/OIDC authentication for Apache Kafka®](/docs/products/kafka/howto/enable-oidc).

</TabItem>
</Tabs>

:::note

At least one SASL mechanism must be available when SASL authentication is enabled.
**OAUTHBEARER** is available when `kafka.sasl_oauthbearer_jwks_endpoint_url` is set.
**PLAIN**, **SCRAM-SHA-256**, and **SCRAM-SHA-512** can be disabled independently.

Disabling all three `kafka_sasl_mechanisms` options without setting a JWKS URL results
in an error.

:::

## Enable public CA for SASL authentication

After you enable SASL authentication, you can enable the public CA for clients that
cannot install or trust the default project CA.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Go to the **Cloud and network** section, click <ConsoleLabel name="actions" /> >
  **More network configurations**.
1. In the **Network configuration** dialog:

   1. Click <ConsoleIcon name="Add config options"/>.
   1. Find `letsencrypt_sasl` (or `letsencrypt_sasl_privatelink` for PrivateLink).
   1. Select the configuration option.
   1. Set the value to **Enabled**.
   1. Click **Save configurations**.

The **Connection information** on the <ConsoleLabel name="overview" /> page now
supports SASL connections using either Project CA or Public CA.

</TabItem>
<TabItem value="cli" label="CLI">

Enable the public CA for SASL authentication using the [Aiven CLI](/docs/tools/cli):

1. List the services in your project to find the Kafka service name:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` for the Kafka service.

1. Enable public CA for SASL authentication:

   ```bash
   avn service update SERVICE_NAME -c CONFIG_NAME=true
   ```

   Parameters:

   - `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
   - `CONFIG_NAME`: Name of the configuration parameter to set. Use `letsencrypt_sasl`
   for enabling public CA for SASL authentication via regular routes or
   `letsencrypt_sasl_privatelink` via PrivateLink connection.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to enable public CA for SASL authentication on an existing service:

```bash
curl -X PUT "https://console.aiven.io/v1/project/{project_name}/service/{service_name}" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_config": {"letsencrypt_sasl": true}}'   # or letsencrypt_sasl_privatelink for PrivateLink
```

</TabItem>
<TabItem value="terraform" label="Terraform">

This Terraform example enables SASL authentication and public CA for SASL on a Kafka
service. It configures SCRAM-SHA-256 and includes a data source that outputs the SASL
port for connections that use the public CA.

The complete example is available in the [Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/kafka/kafka_sasl_authentication) on GitHub.

<TerraformSample filename='kafka/kafka_sasl_authentication/service.tf' />

<TerraformApply />

</TabItem>
</Tabs>

:::note

- The public certificate is issued and validated by [Let's Encrypt](https://letsencrypt.org),
  a widely trusted certification authority. For details, see
  [How it works](https://letsencrypt.org/how-it-works).

- When enabling the public CA over a PrivateLink connection, network configuration may
  take several minutes before clients can connect. A new port must be allocated and the
  load balancer route table updated before clients can connect.

:::

<RelatedPages/>

- [Enable OAuth2/OIDC authentication for Aiven for Apache Kafka®](/docs/products/kafka/howto/enable-oidc)
- [Authentication types](/docs/products/kafka/concepts/auth-types)
