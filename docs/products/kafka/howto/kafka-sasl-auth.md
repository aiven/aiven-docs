---
title: Enable and configure SASL authentication

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven for Apache Kafka® provides [multiple authentication methods](/docs/products/kafka/concepts/auth-types) to secure your Apache Kafka® data, including the highly secure Simple Authentication and Security Layer ([SASL](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer)).

## Enable SASL authentication

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io) and select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, set `kafka_authentication_methods.sasl` to
   **Enabled**.
1. Click **Save configurations**.

The **Connection information** in the <ConsoleLabel name="overview"/> page now
allows connections via SASL or Client certificate.

:::note
Although these connections use a different port, the host, CA, and user
credentials remain consistent.
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
</Tabs>

## Configure SASL mechanisms

After [enabling SASL authentication](#enable-sasl-authentication), fine-tune the active SASL mechanisms for your
Aiven for Apache Kafka service. By default, all mechanisms (PLAIN, SCRAM-SHA-256,
SCRAM-SHA-512) are enabled. Configure these settings only to disable any mechanisms.

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io) and select your
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="Service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** window, set the corresponding
   `kafka_sasl_mechanisms` value to either `Enabled` or `Disabled`:

   - **PLAIN**: `kafka_sasl_mechanisms.plain`
   - **SCRAM-SHA-256**: `kafka_sasl_mechanisms.scram_sha_256`
   - **SCRAM-SHA-512**: `kafka_sasl_mechanisms.scram_sha_512`

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

1. Configure specific mechanisms:

   ```bash
   avn service update SERVICE_NAME             \
    -c kafka_sasl_mechanisms.plain=true          \
    -c kafka_sasl_mechanisms.scram_sha_256=true  \
    -c kafka_sasl_mechanisms.scram_sha_512=true
   ```

   Parameters:

   - `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
   - `kafka_sasl_mechanisms.plain`: Set to `true` to enable the **PLAIN** mechanism.
   - `kafka_sasl_mechanisms.scram_sha_256`: Set to `true` to enable the
     **SCRAM-SHA-256** mechanism.
   - `kafka_sasl_mechanisms.scram_sha_512`: Set to `true` to enable the
     **SCRAM-SHA-512** mechanism.

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
- `API_TOKEN`: API token for authentication.
- `kafka_sasl_mechanisms.plain`: Set to `true` or `false` to enable or disable the
  **PLAIN** mechanism.
- `kafka_sasl_mechanisms.scram_sha_256`: Set to `true` or `false` to enable or disable
  the **SCRAM-SHA-256** mechanism.
- `kafka_sasl_mechanisms.scram_sha_512`: Set to `true` or `false` to enable or disable
  the **SCRAM-SHA-512** mechanism.

</TabItem>
</Tabs>

:::note

- At least one SASL mechanism must remain enabled. Disabling all results in an error.
- `OAUTHBEARER` is enabled if `sasl_oauthbearer_jwks_endpoint_url` is specified.

:::

## Related pages

- [Enable OAUTH2/OIDC authentication for Aiven for Apache Kafka](/docs/products/kafka/howto/enable-oidc)
- [Authentication types](/docs/products/kafka/concepts/auth-types)
