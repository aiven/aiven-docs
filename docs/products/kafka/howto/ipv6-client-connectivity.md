---
title: Enable IPv6 connectivity for Aiven for Apache Kafka®
sidebar_label: Enable IPv6 connectivity
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"

Aiven for Apache Kafka® supports dual-stack IPv4 and IPv6 connectivity.
Kafka clients can connect using either address type.

:::warning
This feature is in early availability. Enable it in a non-production environment first.
:::

## Enable IPv6 connectivity

To enable dual-stack IPv4 and IPv6 support, set the service user configuration
`enable_ipv6` to `true`.

<Tabs groupId="config-methods">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), select the Aiven for
   Apache Kafka® service.
1. Click <ConsoleLabel name="service settings"/> in the sidebar.
1. In the **Cloud and network** section, click <ConsoleLabel name="actions"/> and
   select **More network configurations**.
1. In the **Network configuration** dialog, click <ConsoleIcon name="Add config options"/>.
1. Search for `enable_ipv6`, select the option from the list, and set the value
   to **Enabled**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Enable IPv6 connectivity on an existing service using Aiven CLI:

```bash
avn service update SERVICE_NAME -c enable_ipv6=true
```

Parameters:

- `SERVICE_NAME`: Name of the Aiven for Apache Kafka® service.

</TabItem>
<TabItem value="api" label="API">

Use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to enable IPv6 connectivity:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "enable_ipv6": true
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of the project.
- `SERVICE_NAME`: Name of the service.
- `API_TOKEN`: API token for authentication.

</TabItem>
</Tabs>

## How IPv6 connectivity works

### Server behavior

When IPv6 connectivity is enabled:

- Existing DNS `A` records continue to resolve to IPv4 addresses.
- The service creates DNS `AAAA` records that resolve to IPv6 addresses.
- Kafka brokers listen on the same ports for both IPv4 and IPv6 traffic.

### Client behavior

Kafka clients that can resolve IPv6 addresses can connect using either IPv4 or IPv6,
depending on the client configuration and network setup.

To control the preferred address family:

- **Java clients**
  - Prefer IPv6: `-Djava.net.preferIPv6Addresses=true`
  - Prefer IPv4: `-Djava.net.preferIPv4Addresses=true`
- **librdkafka-based clients (for example, kcat)**
  - Prefer IPv6: `broker.address.family=v6`
  - Prefer IPv4: `broker.address.family=v4`

:::note
The Java JVM setting also affects HTTP connections, including Schema Registry. The
`librdkafka` setting does not.
:::

## Supported configurations

IPv6 connectivity supports the following configurations:

**Authentication methods**

- SSL certificate
- SASL using project CA
- SASL using public CA

**Access routes**

- Dynamic
- Public
- Private (excluding VPC peering and PrivateLink)

## Limitations

The following limitations apply when IPv6 connectivity is enabled:

- You cannot fully disable IPv4.
- VPC peering routes support IPv4 only.
- PrivateLink routes support IPv4 only.
- Static IP addresses support IPv4 only.

### Impact

When IPv6 connectivity is enabled, some clients may resolve IPv6 addresses but fail to
connect over access routes that rely on IPv4.

If connection failures occur, configure Kafka clients to prefer IPv4 addresses:

- **Java clients**: Set `-Djava.net.preferIPv4Addresses=true`.
- **librdkafka-based clients (for example, kcat)**: Set `broker.address.family=v4`.

If Schema Registry connections fail, configure the client to use the service public
endpoint.
