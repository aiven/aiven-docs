---
title: Configure AZ-aware listeners for diskless topics
sidebar_label: Configure AZ-aware listeners
description: Configure availability zone (AZ)-aware Kafka endpoints to reduce cross-AZ traffic for producers and consumers of diskless topics.
keywords: [kafka, diskless, availability zones, az-aware listeners]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
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
accept client connections. You connect clients to an AZ-specific Kafka endpoint. Kafka then
routes diskless-topic requests to a broker in that AZ, if one is available.

## Choose an AZ-aware routing method

Aiven for Apache Kafka supports two methods for AZ-aware routing of diskless-topic
traffic.

| Method | Use when | How to configure |
| --- | --- | --- |
| `diskless_az` in `client.id` | You can change the client ID, or you use PrivateLink. This method needs less setup. | Append `diskless_az` and the AZ to the client ID. |
| AZ-aware listeners | The client ID is generated, for example by Kafka Connect source connectors, or quotas, metrics, or logs depend on it. | Set `bootstrap.servers` to an AZ-specific endpoint. |

For example, to use the `client.id` method for the `use1-az1` AZ:

```properties
client.id=my-producer,diskless_az=use1-az1
```

## How AZ-aware listeners work

Each AZ has Kafka endpoints with dedicated ports, one for each authentication method and
access route. These endpoints use the same hostname as the regular Kafka endpoint but
different ports. Every Kafka broker exposes the AZ-specific listeners, regardless of which
AZ it runs in.

When a client connects through an AZ-specific endpoint:

1. The client sends a metadata request, which asks the cluster which brokers serve each
   partition. The request can reach a broker in another AZ.
1. The broker identifies the AZ associated with the listener port.
1. For diskless topics, the broker returns metadata directing the client to a broker in
   the selected AZ, when one is available.
1. The client sends subsequent produce and fetch requests to that broker.

<ThemedImage
  className="centered"
  alt="A client in AZ1 connects to the bootstrap port for AZ1. Its metadata request reaches a broker in AZ2, which responds with a broker in AZ1. The client then produces and fetches from the broker in AZ1."
  width="100%"
  sources={{ light: AzListenerFlowLight, dark: AzListenerFlowDark }}
/>

If multiple AZ-routing methods are configured, the broker determines the selected AZ in
the following order:

1. The `diskless_az` value in `client.id`, if specified.
1. The AZ associated with the endpoint the client connects through.
1. Default routing, if neither method specifies an AZ.

If no broker is available in the selected AZ, Kafka falls back to a broker in another AZ.
The client can continue producing and consuming records without changing its
configuration, but traffic crosses AZ boundaries.

## Prerequisites

- An Aiven for Apache Kafka service with
  [diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
  enabled.
- AZ-aware listeners enabled for your project. To request access, contact
  [Aiven support](/docs/platform/howto/support#create-a-support-ticket).
- Firewall rules and allowlists that let your clients reach the AZ-specific Kafka ports.
  These ports differ from the regular Kafka ports. After Aiven enables AZ-aware listeners
  for your project, find them in
  [Find the AZ-specific Kafka endpoint](#find-the-az-specific-kafka-endpoint).

:::warning[Warning]
Enabling AZ-aware listeners applies to every Aiven for Apache Kafka service with diskless
topics in the project and triggers a rolling restart of their brokers.
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
- **Endpoint discovery:** AZ-specific endpoints are available only through the Aiven API
  and the Aiven CLI.

{/* TODO: Azure is supported but untested. Confirm with Product whether Azure
needs provider-specific guidance, and confirm the AZ identifier format that Azure
endpoints return. */}

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

Use AZ IDs such as `use1-az1`, not AZ names such as `us-east-1a`. For more information,
see [Zone ID formats](/docs/products/kafka/howto/configure-preferred-zones#zone-id-formats).

{/* TODO: Confirm whether the API's `az` field consistently returns AWS AZ IDs, or whether
existing services with older nodes can return zone names such as us-east-1a. Update the
identification instructions if both formats are possible. */}

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

Run the following command using the [Aiven CLI](/docs/tools/cli):

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

The output has one row for each endpoint with these columns: AZ, network route,
authentication method, certificate authority, and `host:port`. Each AZ can have several
endpoints, depending on the enabled authentication methods and network access routes.

Example output:

```text
europe-west1-b  dynamic  certificate  project_ca   kafka.example.com:31084
europe-west1-b  dynamic  sasl         project_ca   kafka.example.com:31096
europe-west1-b  dynamic  sasl         letsencrypt  kafka.example.com:31108
europe-west1-c  dynamic  certificate  project_ca   kafka.example.com:31085
europe-west1-c  dynamic  sasl         project_ca   kafka.example.com:31097
europe-west1-c  dynamic  sasl         letsencrypt  kafka.example.com:31109
```

The `route` field shows the network access route. VPC peering uses `dynamic`. Other
values are `public` (public access) and `private` (private network access). The
`kafka_ssl_ca` field shows whether the endpoint uses the Aiven project CA (`project_ca`)
or Let's Encrypt (`letsencrypt`).

{/* TODO: Verify the `public` and `private` route mapping against a real service
response. */}

To choose an endpoint:

1. Select the row that matches your client's AZ, network route, authentication method,
   and certificate authority. The endpoint hostname should match the hostname that your
   client uses today.
1. Copy the hostname and port from that row.

An endpoint's presence doesn't guarantee that a broker runs in that AZ. To understand
what happens when no broker runs in the AZ, see
[No endpoint or broker for the client's AZ](#no-endpoint-or-broker-for-the-clients-az).

### Configure the Kafka client

1. Set `bootstrap.servers` to the endpoint matching your client's AZ:

   ```properties
   bootstrap.servers=kafka.example.com:31084
   ```

1. Keep your existing authentication settings and `client.id` unchanged.

   If `client.id` already contains a `diskless_az` value, make sure it matches the
   intended AZ. An explicit `diskless_az` value takes precedence over the AZ of the
   endpoint.

1. Connect your client and confirm that it can produce or consume records for a diskless
   topic.

### Verify AZ-local routing

To verify AZ-local routing, confirm that the partition leader IDs returned through the
AZ-specific endpoint belong to brokers in the selected AZ. If no broker runs in that AZ,
the leaders can belong to other AZs, and this check can't confirm AZ-local routing.

{/* TODO: The rack matches the endpoint's `az` value (confirmed from the code). Before
publishing, run the commands once against an Aiven service and confirm that:
- The commands accept `--command-config` with the same SSL or SASL settings as the client.
- `kafka-broker-api-versions.sh` prints `rack: ...` for each broker, and is the right
  tool for the documented Kafka version.
- The Kafka user needs only permission to describe the topic. */}

1. Describe a diskless topic through the AZ-specific endpoint and note the leader of each
   partition:

   ```bash
   kafka-topics.sh \
     --bootstrap-server AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT \
     --command-config client.properties \
     --describe \
     --topic DISKLESS_TOPIC_NAME
   ```

1. List the brokers and their racks. The rack of a broker is its AZ:

   ```bash
   kafka-broker-api-versions.sh \
     --bootstrap-server AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT \
     --command-config client.properties | grep 'id:'
   ```

1. Ensure that each leader ID from step 1 belongs to a broker whose rack matches the AZ of
   the endpoint you used.

Replace the following:

- `AZ_SPECIFIC_HOST`: Hostname of the AZ-specific endpoint for your client's AZ.
- `AZ_SPECIFIC_PORT`: Port of the AZ-specific endpoint for your client's AZ.
- `DISKLESS_TOPIC_NAME`: Name of a diskless topic.
- `client.properties`: Path to a client configuration file with the same SSL or SASL
  settings as your client.

If a broker's rack is empty, you can't use this method to verify the service. In BYOC
deployments, you can also check cross-AZ data transfer costs in your cloud bill.

## Use AZ-aware listeners with Kafka Connect and MirrorMaker 2

### Aiven-managed services

When AZ-aware listeners are enabled for your project, Aiven for Apache Kafka Connect and
Aiven for Apache Kafka MirrorMaker 2 services integrated with your Kafka service connect
through the AZ-specific endpoint for their node's AZ, when one is available. You don't
change any settings on these services. Their nodes restart automatically to use the new
endpoint.

If the node's AZ is unknown, no matching endpoint exists, or AZ-specific endpoint
information isn't available, the node uses the regular Kafka endpoint.

To reduce cross-AZ traffic, deploy integrated services in the same region as your Kafka
service and use preferred availability zones to influence broker placement.

### MirrorMaker 2 without AZ-aware listeners

If AZ-aware listeners aren't enabled for your project, you can set `diskless_az_enabled`
to `true` on a MirrorMaker 2 replication flow. MirrorMaker 2 then adds the node's AZ to the
producer and consumer client IDs using `diskless_az`. The default is `false`.

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

If your MirrorMaker 2 service doesn't support the option, the API returns an error.

{/* TODO: Confirm that `diskless_az_enabled` is available to all customers, add a link to
the replication flow documentation, test the request against a real service, and check
whether the CLI has a flag for this option. */}

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

If a client connects through an endpoint for another AZ, Kafka treats it as belonging to
that AZ unless `client.id` contains a `diskless_az` value. The client gets no error, but
routing can cause cross-AZ traffic.

To correct the configuration, set `bootstrap.servers` to the endpoint for the AZ where
the client runs. Also check `client.id` for a conflicting `diskless_az` value.

### No endpoint or broker for the client's AZ

If no AZ-specific endpoint matches your client's AZ, use the regular Kafka endpoint. If
an endpoint exists but no broker runs in that AZ, Kafka routes requests to a broker in
another AZ and the client needs no configuration change. In both cases traffic crosses AZ
boundaries. To reduce it, use
[preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones) to
influence broker placement.

### Endpoints after scaling or migration

AZ-specific ports stay the same during scaling and broker replacement. If scaling or
replacement changes which AZs have brokers, run the steps in
[Verify AZ-local routing](#verify-az-local-routing) again.

Ports can also change if you migrate to another cloud. After a migration, retrieve the
endpoints again and update `bootstrap.servers`.

<RelatedPages/>

- [Diskless topics for Apache Kafka](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Configure preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones)
- [Enable follower fetching](/docs/products/kafka/howto/enable-follower-fetching)
- [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect)
- [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
