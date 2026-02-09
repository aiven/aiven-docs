import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

### Google credential source restrictions

When using Google Cloud external account credentials with Aiven for Apache Kafka® Connect,
Aiven applies security restrictions to prevent unauthorized file access and network
requests.

If the Google Cloud credential JSON file includes a `credential_source` object, the
following restrictions apply:

- `credential_source.file`: Not allowed
- `credential_source.executable.command`: Not allowed
- `credential_source.url`: Allowed only when allow-listed in the service configuration
  (`gcp_auth_allowed_urls`)

Example `credential_source` object using a URL-based credential:

```json
{
  "credential_source": {
    "url": "https://sts.googleapis.com/v1/token",
    "headers": {
      "Metadata-Flavor": "Google"
    }
  }
}
```

:::important
`gcp_auth_allowed_urls` is a **Kafka Connect service-level configuration**, not a
connector configuration. Configure it in the Kafka Connect service settings. This setting
applies to all connectors in the service.
:::

#### Configure allowed authentication URLs

To use URL-based credentials (`credential_source.url`), configure the following:

1. Configure the Kafka Connect service with allowed authentication URLs.
1. Configure each connector to use one of the allowed URLs.

Set `gcp_auth_allowed_urls` on the Kafka Connect service to define which HTTPS
authentication endpoints the service can access. This setting applies to all connectors
in the service.

<Tabs groupId="kafka-connect-auth-urls">
<TabItem value="console" label="Console" default>

1. Go to the [Aiven Console](https://console.aiven.io/).
1. Select the Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="service settings"/>.
1. Scroll to the **Advanced configuration** section and click **Configure**.
1. Set **`gcp_auth_allowed_urls`** to the required HTTPS endpoints.
1. Save the changes.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```bash
avn service update KAFKA_CONNECT_SERVICE_NAME \
-c gcp_auth_allowed_urls='["https://sts.googleapis.com","https://iamcredentials.googleapis.com"]'
```

</TabItem>
</Tabs>

If multiple connectors use URL-based credentials, add all required authentication URLs to
`gcp_auth_allowed_urls`. Each unique URL needs to be added only once.

If `credential_source.url` is set but the URL is not included in `gcp_auth_allowed_urls`,
connector creation fails.

In the connector configuration JSON, set `credential_source.url` to match one of the URLs
configured in the service.
