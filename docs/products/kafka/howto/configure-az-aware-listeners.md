---
title: Configure AZ-aware listeners for diskless topics
sidebar_label: Configure AZ-aware listeners
description: Configure availability zone (AZ)-aware Kafka endpoints to reduce cross-AZ traffic for producers and consumers of diskless topics.
keywords: [kafka, diskless, availability zones, az-aware listeners]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ThemedImage from "@theme/ThemedImage";
import AzListenerFlowLight from "@site/static/images/content/figma/az-aware-listeners-flow.png";
import AzListenerFlowDark from "@site/static/images/content/figma/az-aware-listeners-flow-dark.png";
import RelatedPages from "@site/src/components/RelatedPages";

Use availability zone (AZ)-aware listeners to reduce cross-AZ network traffic between your clients and diskless topics in Aiven for Apache Kafka®.

Cloud providers typically charge for data transferred between availability zones. In bring
your own cloud (BYOC) deployments, you pay these charges directly. Diskless topics remove
cross-AZ replication traffic, but producers and consumers still generate cross-AZ traffic
when they connect to brokers in another AZ.

With AZ-aware listeners, each AZ has its own set of listeners, which are Kafka ports that
accept client connections. You connect clients to an AZ-specific Kafka endpoint, without
changing their `client.id`. Kafka then routes diskless-topic requests to a broker in that
AZ, if one is available.

## Choose an AZ-aware routing method

Aiven for Apache Kafka supports two methods for routing diskless-topic traffic to brokers
in the client's AZ. You can choose a method for each client and use both methods in the
same deployment.

| Method | Use when | How to configure |
| --- | --- | --- |
| `diskless_az` in `client.id` | You can change the client ID, or your clients connect through PrivateLink. | Append `diskless_az` and the AZ to `client.id`. |
| AZ-aware listeners | You need to preserve `client.id`, for example, when Kafka Connect source connectors generate it or when quotas, metrics, or logs depend on it. | Set `bootstrap.servers` to an AZ-specific endpoint. |

The `diskless_az` method needs less setup but can affect quotas, metrics, and logs that
depend on the exact client ID.

For example, to specify the `use1-az1` AZ using `client.id`:

```properties
client.id=my-producer,diskless_az=use1-az1
```

## How AZ-aware listeners work

AZ-specific endpoints use the same hostname as the default Kafka endpoint, but each AZ,
authentication method, and access route has its own port. Find the default endpoints in
**Connection information** on the service <ConsoleLabel name="overview"/> page. Every
Kafka broker exposes the AZ-specific listeners, regardless of which AZ it runs in.

When a client connects through an AZ-specific endpoint:

1. The client sends a metadata request to find out which brokers to use for each
   partition. The request can reach a broker in any AZ.
1. The broker identifies the AZ from the port the client connected to.
1. For diskless topics, the broker returns metadata directing the client to a broker in
   that AZ, when one is available.
1. The client sends subsequent produce and fetch requests to that broker.

<ThemedImage
  className="centered"
  alt="A client in AZ1 connects to the bootstrap port for AZ1. Its metadata request reaches a broker in AZ2, which responds with a broker in AZ1. The client then produces and fetches from the broker in AZ1."
  width="100%"
  sources={{ light: AzListenerFlowLight, dark: AzListenerFlowDark }}
/>

If you use more than one AZ-routing method, the broker selects the AZ in the following
order:

1. The `diskless_az` value in `client.id`, if specified.
1. The AZ associated with the endpoint the client connects through.
1. Default routing, if neither method specifies an AZ.

If no broker runs in the selected AZ, Kafka routes requests to a broker in another AZ.
The client keeps producing and consuming without configuration changes, but traffic
crosses AZ boundaries. An AZ-specific endpoint can remain after all brokers leave that AZ.

## Prerequisites

- An Aiven for Apache Kafka service with
  [diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
  enabled.
- AZ-aware listeners enabled for your project. To request access, contact
  [Aiven support](/docs/platform/howto/support#create-a-support-ticket).
- The [Aiven CLI](/docs/tools/cli) or access to the [Aiven API](/docs/tools/api) to find
  the AZ-specific endpoints.
- Firewall rules and allowlists that permit the AZ-specific Kafka ports. To find them, see
  [Find the AZ-specific Kafka endpoint](#find-the-az-specific-kafka-endpoint).

:::warning[Warning]
AZ-aware listeners apply to every Aiven for Apache Kafka service with diskless topics in
the project. Aiven applies the change with a rolling restart of the brokers.

To check whether a service has AZ-specific endpoints, run the command in
[Find the AZ-specific Kafka endpoint](#find-the-az-specific-kafka-endpoint). If it
returns no rows, the change hasn't reached that service.
:::

## Limitations

- **Diskless topics only:** AZ-aware listeners don't affect classic topics. To reduce
  cross-AZ traffic for classic-topic consumers, use
  [follower fetching](/docs/products/kafka/howto/enable-follower-fetching).
- **PrivateLink:** AZ-aware listeners don't work with PrivateLink connections. Add
  `diskless_az` to your `client.id` instead.
- **Broker placement:** Routing to an AZ requires a broker in that AZ. Use
  [preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones) to
  influence broker placement. Placement isn't guaranteed.

{/* TODO: Azure works and passes integration tests in azure-westeurope, but the Identify
the client's availability zone section has no Azure example. Add an Azure tab after
confirming how the Azure zone value maps to the endpoint's `az` value. */}

## Configure AZ-aware listeners

### Identify the client's availability zone

Find the AZ where your Kafka producer or consumer runs.

<Tabs groupId="cloud-provider">
<TabItem value="aws" label="AWS" default>

On an Amazon EC2 instance, use Instance Metadata Service Version 2 (IMDSv2) to get the
AZ ID:

```bash
TOKEN=$(curl -fsS -X PUT \
  "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

curl -fsS \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  "http://169.254.169.254/latest/meta-data/placement/availability-zone-id"
```

Example output:

```text
use1-az1
```

Use AZ IDs such as `use1-az1`, not AZ names such as `us-east-1a`. AWS can map the same
AZ name to different physical AZs in different accounts. For example, `us-east-1a` can be
`use1-az1` in your account and `use1-az2` in another account. For more information, see
[Zone ID formats](/docs/products/kafka/howto/configure-preferred-zones#zone-id-formats).

</TabItem>
<TabItem value="gcp" label="Google Cloud">

On a Google Compute Engine instance, retrieve the AZ name:

```bash
curl -fsS \
  -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/zone" |
awk -F/ '{print $NF}'
```

Example output:

```text
europe-west1-b
```

</TabItem>
</Tabs>

### Find the AZ-specific Kafka endpoint

Retrieve the AZ-specific endpoints with the Aiven CLI or the Aiven API. The examples use
[`jq`](https://jqlang.github.io/jq/) to filter the response.

<Tabs groupId="config-methods">
<TabItem value="cli" label="CLI" default>

Retrieve the endpoints with the [Aiven CLI](/docs/tools/cli):

```bash
avn service get SERVICE_NAME \
  --project PROJECT_NAME \
  --json |
jq -r '.components[]
  | select(.component == "kafka" and .az != null)
  | [.az, .route, .kafka_authentication_method, .kafka_ssl_ca,
     "\(.host):\(.port)"]
  | @tsv'
```

Replace the following:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `PROJECT_NAME`: Name of your Aiven project.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceGet](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) API
operation:

```bash
curl --silent \
  --header "Authorization: Bearer API_TOKEN" \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" |
jq -r '.service.components[]
  | select(.component == "kafka" and .az != null)
  | [.az, .route, .kafka_authentication_method, .kafka_ssl_ca,
     "\(.host):\(.port)"]
  | @tsv'
```

Replace the following:

- `API_TOKEN`: Your Aiven API token.
- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

Each row is one endpoint, with the AZ, network route, authentication method, certificate
authority (CA), and `host:port`. An AZ can have several endpoints, depending on the
enabled authentication methods and routes.

Example output:

```text
europe-west1-b  dynamic  certificate  project_ca   kafka.example.com:31084
europe-west1-b  dynamic  sasl         project_ca   kafka.example.com:31096
europe-west1-b  dynamic  sasl         letsencrypt  kafka.example.com:31108
europe-west1-c  dynamic  certificate  project_ca   kafka.example.com:31085
europe-west1-c  dynamic  sasl         project_ca   kafka.example.com:31097
europe-west1-c  dynamic  sasl         letsencrypt  kafka.example.com:31109
```

The `route` field shows the network access route:

- `dynamic`: The default hostname. It resolves to a private IP address when accessed
  from a VPC, which is the case for VPC peering.
- `public`: Public access to a service in a VPC.
- `private`: Private access for BYOC and partner VPCs, where the default hostname
  resolves to a public IP address.

The `kafka_ssl_ca` field shows whether the endpoint uses the Aiven project CA (`project_ca`)
or Let's Encrypt (`letsencrypt`).

Select the row that matches your client's AZ, route, authentication method, and CA. On
AWS, the `az` value is an AZ ID such as `use1-az1`. Match it to the AZ ID that the
instance metadata service returns. Use the `host:port` value from that row in
`bootstrap.servers`.

If no row matches your client's AZ, keep using the default Kafka endpoint.

### Configure the Kafka client

1. Set `bootstrap.servers` to the endpoint matching your client's AZ:

   ```properties
   bootstrap.servers=kafka.example.com:31084
   ```

1. Keep your existing authentication settings and `client.id` unchanged.

   If `client.id` contains a `diskless_az` value, make sure the value matches the intended
   AZ. This value takes precedence over the AZ of the endpoint.

1. Connect your client and confirm that it can produce or consume records for a diskless
   topic.

### Verify AZ-local routing

Ensure that the partition leaders returned through the AZ-specific endpoint belong to
brokers in the selected AZ. This checks the broker assignments in the metadata Kafka
returns. It doesn't measure network traffic.

Repeat this check after scaling or broker replacement.

{/* TODO: The rack matches the endpoint's `az` value (confirmed from the code). Before
publishing, run the commands once against an Aiven service and confirm that:
- The commands accept `--command-config` with the same SSL or SASL settings as the client.
- `kafka-broker-api-versions.sh` prints `rack: ...` for each broker.
- Confirm which permissions the Kafka user needs for both commands. Test with a service
  user restricted to one topic. If listing brokers fails, add a note about the
  required permission. */}

1. Describe a diskless topic through the AZ-specific endpoint:

   ```bash
   kafka-topics.sh \
     --bootstrap-server AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT \
     --command-config CLIENT_CONFIG_FILE \
     --describe \
     --topic DISKLESS_TOPIC_NAME
   ```

   Note the `Leader` ID of each partition.

1. List the brokers and their racks:

   ```bash
   kafka-broker-api-versions.sh \
     --bootstrap-server AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT \
     --command-config CLIENT_CONFIG_FILE | grep 'id:'
   ```

   A broker's rack is its AZ.

1. Ensure that each leader ID from the topic description belongs to a broker whose rack
   matches the AZ of the endpoint you used.

Replace the following:

- `AZ_SPECIFIC_HOST`: Hostname of the AZ-specific endpoint for your client's AZ.
- `AZ_SPECIFIC_PORT`: Port of the AZ-specific endpoint for your client's AZ.
- `DISKLESS_TOPIC_NAME`: Name of a diskless topic.
- `CLIENT_CONFIG_FILE`: Path to a client configuration file with the same SSL or SASL
  settings as your client.

This check can't confirm AZ-local routing in the following cases:

- No broker runs in the AZ, so the leaders belong to other AZs.
- A broker's rack is empty.

In BYOC deployments, you can also review cross-AZ data transfer costs in your cloud bill.

## Use AZ-aware listeners with Kafka Connect and MirrorMaker 2

### Aiven-managed services

When AZ-aware listeners are enabled for your project, Aiven for Apache Kafka Connect and
Aiven for Apache Kafka MirrorMaker 2 services integrated with your Kafka service use
AZ-specific endpoints. Each node connects through the endpoint for its own AZ. You don't
need to change connector configurations or replication flows. The nodes restart
automatically to use the new endpoints.

If the node's AZ is unknown or no matching endpoint exists, the node uses the default
Kafka endpoint. To reduce cross-AZ traffic, deploy integrated services in the same region
as your Kafka service.

### MirrorMaker 2 without AZ-aware listeners

If AZ-aware listeners aren't enabled for your project, you can set `diskless_az_enabled`
to `true` on a MirrorMaker 2
[replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow).
MirrorMaker 2 then sets the producer and consumer client IDs of that flow to
`diskless_az` with the node's AZ, for example `diskless_az=use1-az1`. This replaces the
default client IDs and can affect quotas, metrics, and logs that depend on them. The
default is `false`.

This option is available to all MirrorMaker 2 customers. If the API returns an error when
you set it, contact
[Aiven support](/docs/platform/howto/support#create-a-support-ticket).

To set the option, update the replication flow with the Aiven API. The request changes
only the fields you send:

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/MIRRORMAKER_SERVICE_NAME/mirrormaker/replication-flows/SOURCE_CLUSTER/TARGET_CLUSTER" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "content-type: application/json" \
  --data '{"diskless_az_enabled": true}'
```

Replace the following:

- `PROJECT_NAME`: Name of your Aiven project.
- `MIRRORMAKER_SERVICE_NAME`: Name of your Aiven for Apache Kafka MirrorMaker 2 service.
- `SOURCE_CLUSTER`: Alias of the source cluster in the replication flow.
- `TARGET_CLUSTER`: Alias of the target cluster in the replication flow.
- `API_TOKEN`: Your Aiven API token.

### Self-managed deployments

For self-managed deployments, run one group of workers in each AZ. Configure each group
to use the AZ-specific Kafka endpoint for its AZ.

For Kafka Connect, set `bootstrap.servers` in the `connect-distributed.properties` file:

```properties
bootstrap.servers=AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT
```

For MirrorMaker 2, set the bootstrap endpoint for the relevant Kafka cluster in the
`mm2.properties` file:

```properties
CLUSTER_ALIAS.bootstrap.servers=AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT
```

Replace the following:

- `AZ_SPECIFIC_HOST`: Hostname of the AZ-specific endpoint for the worker's AZ.
- `AZ_SPECIFIC_PORT`: Port of the AZ-specific endpoint for the worker's AZ.
- `CLUSTER_ALIAS`: Alias of the diskless Kafka cluster in your MirrorMaker 2 configuration.

## Troubleshoot AZ-aware routing

### Client uses an endpoint for a different AZ

If a client connects through an endpoint for a different AZ, Kafka routes its
diskless-topic requests to brokers in the endpoint's AZ. Traffic then crosses AZ
boundaries, and Kafka returns no error.

Set `bootstrap.servers` to the endpoint for the AZ where the client runs. If `client.id`
contains a `diskless_az` value, that value takes precedence over the endpoint's AZ. Ensure
that the value specifies the intended AZ. For more information, see
[How AZ-aware listeners work](#how-az-aware-listeners-work).

### Endpoints after scaling or migration

AZ-specific ports stay the same during scaling and broker replacement. Ports can change if
you migrate to another cloud. After a migration, retrieve the endpoints again and update
`bootstrap.servers`.

<RelatedPages/>

- [Diskless topics for Apache Kafka](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Configure preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones)
- [Enable follower fetching](/docs/products/kafka/howto/enable-follower-fetching)
- [Aiven for Apache Kafka Connect](/docs/products/kafka/kafka-connect)
- [Aiven for Apache Kafka MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
