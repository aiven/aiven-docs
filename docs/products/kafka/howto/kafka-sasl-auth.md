---
title: Enable and configure SASL authentication for Apache Kafka®
sidebar_label: Enable SASL authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ConsoleIcon from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® supports [multiple authentication methods](/docs/products/kafka/concepts/auth-types), including Simple Authentication and Security Layer ([SASL](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer)) over SSL.

## Enable SASL authentication

To allow clients to authenticate with SASL, enable `kafka_authentication_methods.sasl`
on your Aiven for Apache Kafka service.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Select `kafka_authentication_methods.sasl` from the list and set the value to **Enabled**.
1. Click **Save configurations**.

The **Connection information** on the <ConsoleLabel name="overview"/> page now
shows connection details for SASL and client certificate authentication.

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
curl -X PUT "https://api.aiven.io/v1/project/{project_name}/service/{service_name}" \
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

After [enabling SASL authentication](#enable-sasl-authentication), choose which SASL
mechanisms clients can use.

### Supported mechanisms

Aiven for Apache Kafka supports the following SASL mechanisms:

- **PLAIN**: Enabled by default. Controlled by `kafka_sasl_mechanisms.plain`.
- **SCRAM-SHA-256**: Enabled by default. Controlled by
  `kafka_sasl_mechanisms.scram_sha_256`.
- **SCRAM-SHA-512**: Enabled by default. Controlled by
  `kafka_sasl_mechanisms.scram_sha_512`.
- **OAUTHBEARER**: Set `kafka.sasl_oauthbearer_jwks_endpoint_url` to enable
  [OAuth 2.0/OIDC authentication](/docs/products/kafka/howto/enable-oidc).
  `PLAIN`, `SCRAM-SHA-256`, and `SCRAM-SHA-512` remain enabled by default.
  Each client selects one SASL mechanism when it connects.

  To allow only OAuth 2.0/OIDC authentication, disable `kafka_sasl_mechanisms.plain`,
  `kafka_sasl_mechanisms.scram_sha_256`, and `kafka_sasl_mechanisms.scram_sha_512`.

  Optional OIDC parameters include `kafka.sasl_oauthbearer_expected_issuer`,
  `kafka.sasl_oauthbearer_expected_audience`, and
  `kafka.sasl_oauthbearer_sub_claim_name`.

:::note
When SASL authentication is enabled, at least one SASL mechanism must be available.
`OAUTHBEARER` satisfies this requirement when
`kafka.sasl_oauthbearer_jwks_endpoint_url` is set. If you disable PLAIN,
SCRAM-SHA-256, and SCRAM-SHA-512 without setting
`kafka.sasl_oauthbearer_jwks_endpoint_url`, the update fails because no SASL mechanism
is available.
:::

### Enable or disable PLAIN, SCRAM-SHA-256, and SCRAM-SHA-512

Use `kafka_sasl_mechanisms` to enable or disable these mechanisms using one of the
following methods.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, configure **PLAIN**, **SCRAM-SHA-256**,
   and **SCRAM-SHA-512**:

   - To enable or disable **PLAIN**, set `kafka_sasl_mechanisms.plain` to **Enabled**
     or **Disabled**.
   - To enable or disable **SCRAM-SHA-256**, set `kafka_sasl_mechanisms.scram_sha_256`
     to **Enabled** or **Disabled**.
   - To enable or disable **SCRAM-SHA-512**, set `kafka_sasl_mechanisms.scram_sha_512`
     to **Enabled** or **Disabled**.

1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="CLI">

Configure SASL mechanisms for your Aiven for Apache Kafka service using
[Aiven CLI](/docs/tools/cli):

1. Get the name of the Aiven for Apache Kafka service:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Disable the SASL mechanisms that clients do not use. By default, **PLAIN**,
   **SCRAM-SHA-256**, and **SCRAM-SHA-512** are enabled. For example, to disable
   **PLAIN** authentication:

   ```bash
   avn service update SERVICE_NAME \
       -c kafka_sasl_mechanisms.plain=false
   ```

   **SCRAM-SHA-256** and **SCRAM-SHA-512** remain enabled unless you disable them.

   Parameters:

   - `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
   - `kafka_sasl_mechanisms.plain`: Set to `true` or `false` to enable or disable
     **PLAIN**.
   - `kafka_sasl_mechanisms.scram_sha_256`: Set to `true` or `false` to enable or
     disable **SCRAM-SHA-256**.
   - `kafka_sasl_mechanisms.scram_sha_512`: Set to `true` or `false` to enable or
     disable **SCRAM-SHA-512**.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to configure **PLAIN** and **SCRAM** mechanisms on an existing service:

```bash
curl -X PUT "https://api.aiven.io/v1/project/{project_name}/service/{service_name}" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "user_config": {
             "kafka_sasl_mechanisms": {
               "plain": false,
               "scram_sha_256": true,
               "scram_sha_512": true
             }
           }
         }'
```

Parameters:

- `project_name`: Name of your Aiven project.
- `service_name`: Name of your Aiven for Apache Kafka service.
- `API_TOKEN`: Personal Aiven [token](/docs/platform/howto/create_authentication_token).
- `kafka_sasl_mechanisms.plain`: Set to `true` or `false` to enable or disable
  **PLAIN**.
- `kafka_sasl_mechanisms.scram_sha_256`: Set to `true` or `false` to enable or disable
  **SCRAM-SHA-256**.
- `kafka_sasl_mechanisms.scram_sha_512`: Set to `true` or `false` to enable or disable
  **SCRAM-SHA-512**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `kafka_sasl_mechanisms` attribute in [your `aiven_kafka` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka#kafka_sasl_mechanisms)
to enable or disable **PLAIN**, **SCRAM-SHA-256**, and **SCRAM-SHA-512**. Set each
mechanism to `true` or `false`:

- **PLAIN**: `kafka_sasl_mechanisms.plain`
- **SCRAM-SHA-256**: `kafka_sasl_mechanisms.scram_sha_256`
- **SCRAM-SHA-512**: `kafka_sasl_mechanisms.scram_sha_512`

</TabItem>
</Tabs>

## Enable public CA certificates for SASL authentication

After you enable SASL authentication, you can enable public CA certificates for clients
that cannot install or trust the default project CA.

Enable public CA certificates using one of the following methods.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Go to the **Cloud and network** section and click <ConsoleLabel name="actions" /> >
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

Enable the public CA certificates for SASL authentication using the [Aiven CLI](/docs/tools/cli):

1. List the services in your project to find your Aiven for Apache Kafka service name:

   ```bash
   avn service list
   ```

   Note the `SERVICE_NAME` corresponding to your Aiven for Apache Kafka service.

1. Enable public CA certificates for SASL authentication:

   ```bash
   avn service update SERVICE_NAME -c letsencrypt_sasl=true
   ```

   For PrivateLink, use `-c letsencrypt_sasl_privatelink=true` instead.

   Parameters:

   - `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to enable public CA certificates for SASL authentication on an existing service:

```bash
curl -X PUT "https://api.aiven.io/v1/project/{project_name}/service/{service_name}" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"user_config": {"letsencrypt_sasl": true}}'
```

For PrivateLink, use `letsencrypt_sasl_privatelink` instead of `letsencrypt_sasl`.

Parameters:

- `project_name`: Name of your Aiven project.
- `service_name`: Name of your Aiven for Apache Kafka service.
- `API_TOKEN`: Personal Aiven [token](/docs/platform/howto/create_authentication_token).
- `letsencrypt_sasl`: Set to `true` to enable public CA certificates for SASL authentication.

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

- [Enable OAuth 2.0/OIDC authentication for Apache Kafka](/docs/products/kafka/howto/enable-oidc)
- [Authentication types](/docs/products/kafka/concepts/auth-types)
