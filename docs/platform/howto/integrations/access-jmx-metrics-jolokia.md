---
title: Access JMX metrics via Jolokia
displayed_sidebar: platformSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

[Jolokia](https://jolokia.org/) is one of the external metrics integrations supported on the Aiven platform, along with [Datadog metrics](/docs/integrations/datadog/datadog-metrics) and [Prometheus metrics](/docs/platform/howto/integrations/prometheus-metrics).

:::note
JMX metrics via Jolokia are only supported for Aiven for Apache Kafka® services.
:::

## Configure a Jolokia endpoint

<Tabs groupId="endpoint-creation">
<TabItem value="console" label="Console" default>

To enable Jolokia integration, create a Jolokia endpoint:

1. In the [Aiven Console](https://console.aiven.io/), select your project.
1. Click <ConsoleLabel name="integration endpoints"/> in the sidebar.
1. Click **Jolokia** in the list of integration types.
1. Click **Add new endpoint**.
1. Enter an endpoint name and click **Create**.

A username and password are generated automatically. You can reuse the same Jolokia
endpoint for multiple services in the same project.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Use the
[avn service integration-endpoint create](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create)
command to create a Jolokia endpoint:

```bash
avn service integration-endpoint create \
  --project <PROJECT-NAME> \
  --endpoint-name <ENDPOINT-NAME> \
  --endpoint-type jolokia
```

</TabItem>
 </Tabs>

## Enable Jolokia integration

To enable Jolokia integration for an Aiven for Apache Kafka® service:

1. In the [Aiven Console](https://console.aiven.io/), select your Aiven for Apache Kafka
   service.
1. On the <ConsoleLabel name="overview" /> page,
   click <ConsoleLabel name="integrations" />.
1. Under **Endpoint integrations**, click **Jolokia**.
1. Select the Jolokia endpoint you created and click **Enable**.

This configures the endpoint on all service nodes and provides access to JMX metrics.

Jolokia supports HTTP POST requests to retrieve service-specific metrics and bulk
requests to collect metrics in batches. For details, see
the [Jolokia protocol documentation](https://jolokia.org/reference/html/manual/jolokia_protocol.html).

Several metrics are specific to individual Kafka® brokers. To get a complete view of
the cluster, you might need to query each broker. The brokers share a DNS name. Use
the `host` command (on Unix) or `nslookup` (on Windows) to list the associated IP
addresses.

```shell
host kafka-67bd7c5-myproject.aivencloud.com
kafka-67bd7c5-myproject.aivencloud.com has address 35.228.218.115
kafka-67bd7c5-myproject.aivencloud.com has address 35.228.234.106
kafka-67bd7c5-myproject.aivencloud.com has address 35.228.157.197
```

## Kafka topic-level metrics availability

Some Kafka topic-level JMX metrics might not be available if the topic has no recent
traffic. For example:

- Messages in per second: `kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec,topic=<topic>`
- Replication bytes in per second: `kafka.server:type=BrokerTopicMetrics,name=ReplicationBytesInPerSec`

Kafka stops exposing these metrics after several minutes (typically 10 to 15) without
message production or consumption on the topic. When traffic resumes, the metrics
typically reappear after a short delay.

If you request one of these metrics while the topic is inactive, Jolokia returns a `404`
response. This behavior is expected and does not indicate an issue with Kafka or Jolokia.

For more information, see the
[Kafka JMX documentation](https://kafka.apache.org/38/documentation.html#remote_jmx).

## Example cURL requests

Before sending a cURL request,
[download the CA certificate](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)
for your project. The same certificate applies to all endpoints and services
within the project.

To read a specific metric, use port `6733`, which is the default port for Jolokia.
Replace `joljkr2l:PWD` with the username and password generated during the Jolokia
endpoint setup. View the credentials in the endpoint details on the
<ConsoleLabel name="integration endpoints"/> page.

```shell
curl --cacert ca.pem \
    -X POST \
    https://joljkr2l:PWD@HOST_IP:6733/jolokia/  \
    -d \
'{"type":"read","mbean":"kafka.server:type=ReplicaManager,name=PartitionCount"}'
```

Jolokia supports searching beans using `search` command:

```shell
curl --cacert ca.pem \
    -X POST \
    https://joljkr2l:PWD@HOST_IP:6733/jolokia/  \
    -d \
'{"type":"search","mbean":"kafka.server:*"}'
```
