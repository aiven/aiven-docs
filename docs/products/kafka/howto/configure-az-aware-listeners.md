---
title: Configure AZ-aware listeners for diskless topics
sidebar_label: Configure AZ-aware listeners
description: Configure availability zone (AZ)-aware Kafka endpoints to reduce cross-AZ traffic for producers and consumers of diskless topics.
keywords: [kafka, diskless, availability zones, az-aware listeners]
---

import ThemedImage from "@theme/ThemedImage";
import AzListenerFlowLight from "@site/static/images/content/figma/az-aware-listeners-flow.png";
import AzListenerFlowDark from "@site/static/images/content/figma/az-aware-listeners-flow-dark.png";
import RelatedPages from "@site/src/components/RelatedPages";

Use availability zone (AZ)-aware listeners to reduce cross-AZ network traffic between your clients and diskless topics in Aiven for Apache Kafka®.

Cloud providers usually charge for data transferred between availability zones. Diskless
topics reduce cross-AZ replication traffic, but client traffic still crosses zones unless
producers and consumers connect to brokers in their own AZ.

With AZ-aware listeners, you connect clients to an AZ-specific Kafka endpoint. Kafka then
routes diskless-topic requests to a broker in that AZ, if one is available.

## How AZ-aware listeners work

Each AZ has Kafka endpoints with dedicated ports, one for each authentication method and
access route. These endpoints use the same hostname as the regular Kafka endpoint but
different ports. Every Kafka broker exposes the AZ-specific listeners, regardless of which
AZ it runs in.

When a client connects through an AZ-specific endpoint:

1. The client sends a metadata request, which can reach a broker in another AZ.
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

{/* TODO: Confirm that AZ-aware listeners use the same fallback behavior as
`client.id`-based routing, including when an AZ-specific endpoint remains listed after all
brokers leave that AZ. Confirm that no connection error or client action is required. */}

## Choose an AZ-aware routing method

Aiven for Apache Kafka supports two methods for AZ-aware routing of diskless-topic
traffic.

| Method | When to use | Configuration |
| --- | --- | --- |
| `diskless_az` in `client.id` | You can modify the client ID. | Add the AZ to the ID. |
| AZ-aware listeners | You want to keep the client ID. | Use an AZ-specific endpoint. |

The `client.id` method works with PrivateLink. AZ-aware listeners require
[enablement for your project](#prerequisites) and don't work with PrivateLink.

For the `client.id` method, append `diskless_az` and the AZ to the client ID. For example,
to specify `use1-az1`:

```properties
client.id=my-producer,diskless_az=use1-az1
```

For AZ-aware listeners, set `bootstrap.servers` to an AZ-specific endpoint.

Use AZ-aware listeners when client IDs are generated automatically or when changing them
would affect client quotas, metrics, logging, or other application behavior.

## Prerequisites

- An Aiven for Apache Kafka® service with
  [diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
  enabled.
- AZ-aware listeners enabled for your project. To request access, contact your account
  team or [Aiven support](/docs/platform/howto/support#create-a-support-ticket).
  Enablement applies to every Aiven for Apache Kafka service with diskless topics in the
  project.
- Network access from your clients to the AZ-specific Kafka ports. These ports differ
  from the regular Kafka port. To find them, see
  [Find the AZ-specific Kafka endpoint](#find-the-az-specific-kafka-endpoint).

{/* TODO: Confirm how users enable AZ-aware listeners (contact support or account team,
or self-service through the Console, API, or a service setting) and the release stage
(limited or early availability). If it has a stage, add the standard note near the intro.
Update this page, "Enable follower fetching", and "Configure preferred availability
zones" to match.

Also confirm the minimum supported Kafka version for existing services, how the feature
becomes active on existing versus new services, and whether activation requires a service
update or broker restart or causes disruption. */}

## Limitations

- **Diskless topics only:** AZ-aware listeners don't affect classic topics. To reduce
  cross-AZ traffic for classic-topic consumers, use
  [follower fetching](/docs/products/kafka/howto/enable-follower-fetching).
- **PrivateLink:** AZ-aware listeners don't work with PrivateLink connections. Add
  `diskless_az` to your `client.id` instead.
- **Broker placement:** Routing to an AZ requires a broker in that AZ. Use
  [preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones) to
  influence broker placement. Placement isn't guaranteed, and traffic crosses AZs when no
  broker is available in the selected AZ.
- **Endpoint discovery:** You can find AZ-specific endpoints only through the Aiven API and
  CLI, not the Aiven Console.

{/* TODO: Confirm whether AZ-aware listeners are supported on Azure and the AZ identifier
format used by Azure endpoints. */}

## Configure AZ-aware listeners

### Identify the client's availability zone

Find the AZ where your Kafka producer or consumer runs.

On an Amazon EC2 instance, use Instance Metadata Service Version 2 (IMDSv2) to retrieve
the AZ ID:

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

On AWS, use AZ IDs such as `use1-az1`, not AZ names such as `us-east-1a`. For more
information, see
[Zone ID formats](/docs/products/kafka/howto/configure-preferred-zones#zone-id-formats).

{/* TODO: Confirm whether the API's `az` field consistently returns AWS AZ IDs, or whether
existing services with older nodes can return zone names such as us-east-1a. Update the
identification instructions if both formats are possible. */}

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

Use the returned AZ identifier to find the matching Kafka endpoint.

### Find the AZ-specific Kafka endpoint

Use the Aiven CLI to retrieve the AZ-specific Kafka endpoints for your service. The
command requires [`jq`](https://jqlang.github.io/jq/).

The command returns one row for each endpoint with these columns: AZ, network route,
authentication method, and `host:port`. Each AZ can have several endpoints, depending on
the enabled authentication methods and network access routes.

1. Run the following command:

   ```bash
   avn service get SERVICE_NAME \
     --project PROJECT_NAME \
     --json |
   jq -r '.components[]
     | select(.component == "kafka" and .az != null)
     | [.az, .route, .kafka_authentication_method, "\(.host):\(.port)"]
     | @tsv'
   ```

   Replace:

   - `SERVICE_NAME` with the name of your Aiven for Apache Kafka service.
   - `PROJECT_NAME` with the name of your Aiven project.

1. Find the endpoint matching your client's AZ, network route, and authentication method.

   Example output:

   ```text
   europe-west1-b  dynamic  certificate  kafka.example.com:31084
   europe-west1-b  dynamic  sasl         kafka.example.com:31096
   europe-west1-c  dynamic  certificate  kafka.example.com:31085
   europe-west1-c  dynamic  sasl         kafka.example.com:31097
   ```

1. Copy the matching hostname and port.

{/* TODO: Confirm whether `kafka_ssl_ca` is exposed in the API response for AZ-specific
SASL endpoints. If supported, add it to the CLI command and explain how to choose between
project-CA and Let's Encrypt endpoints. Also confirm which `route` value applies to VPC
peering, and that the command output lists every customer-facing AZ port. */}

:::note
An AZ-specific endpoint can remain listed even if no brokers currently run in that AZ. The
endpoint's presence doesn't guarantee that Kafka routes your client to a broker in that AZ.
:::

### Configure the Kafka client

Set `bootstrap.servers` to the endpoint matching your client's AZ:

```properties
bootstrap.servers=kafka.example.com:31084
```

Keep your existing authentication settings and `client.id` unchanged.

If `client.id` already contains a `diskless_az` value, make sure it matches the intended
AZ. An explicit `diskless_az` value takes precedence over the AZ of the endpoint.

{/* TODO: Confirm a customer-accessible method for verifying that diskless traffic is
routed to brokers in the client's AZ. Investigate whether the metrics proposed in KC-356
are available to customers, or whether broker IDs can be mapped to AZs. Once confirmed,
add a verification section after this one. Retrieving metadata with `kcat -L` doesn't
confirm that returned brokers are in the expected AZ. */}

## Use AZ-aware listeners with Kafka Connect and MirrorMaker 2

### Aiven-managed services

Aiven for Apache Kafka® Connect and Aiven for Apache Kafka® MirrorMaker 2 services
integrated with your Kafka service automatically select an AZ-specific Kafka bootstrap
endpoint when one is available for the node's AZ.

If the node's AZ is unknown, no matching endpoint exists, or AZ-specific endpoint
information isn't available, the node uses the regular Kafka endpoint.

You don't need to configure AZ-specific bootstrap endpoints for these integrations.

To keep traffic in the same AZ, deploy integrated services in the same region as your
Kafka service and use preferred availability zones to influence broker placement.

{/* TODO: Confirm when existing Kafka Connect and MirrorMaker 2 nodes adopt AZ-specific
endpoints after enablement, including whether the nodes require a restart. */}

If AZ-aware listeners aren't enabled for your project, set `diskless_az_enabled` to
`true` on a MirrorMaker 2 replication flow. MirrorMaker 2 then adds the node's AZ to the
producer and consumer client IDs using `diskless_az`. The default is `false`.

{/* TODO: Confirm that `diskless_az_enabled` is available to all customers, and add a
link to the replication flow documentation. */}

### Self-managed deployments

For self-managed deployments, configure workers to use an AZ-specific Kafka endpoint
matching their AZ.

For Kafka Connect, set `bootstrap.servers` in the worker configuration:

```properties
bootstrap.servers=AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT
```

For MirrorMaker 2, set the bootstrap endpoint for the relevant Kafka cluster:

```properties
CLUSTER_ALIAS.bootstrap.servers=AZ_SPECIFIC_HOST:AZ_SPECIFIC_PORT
```

Replace the following:

- `AZ_SPECIFIC_HOST`: hostname of the AZ-specific endpoint for the worker's AZ.
- `AZ_SPECIFIC_PORT`: port of the AZ-specific endpoint for the worker's AZ.
- `CLUSTER_ALIAS`: alias of the Kafka cluster in your MirrorMaker 2 configuration.

If workers run in multiple AZs, configure each worker or deployment to use its
corresponding AZ-specific endpoint.

## Troubleshoot AZ-aware routing

### Client uses an endpoint for a different AZ

If a client connects through an endpoint for another AZ, Kafka treats the client as
belonging to that AZ unless `client.id` contains an explicit `diskless_az` value.

The client doesn't receive an error solely because it uses an endpoint for a different AZ,
but the resulting routing can cause cross-AZ traffic.

To correct the configuration:

1. Identify the AZ where the client runs.
1. Retrieve the available AZ-specific Kafka endpoints.
1. Update `bootstrap.servers` to use the endpoint matching the client's AZ.
1. Check for a conflicting `diskless_az` value in `client.id`.

### No endpoint matches the client's AZ

If no AZ-specific endpoint matches your client's AZ and you configure the bootstrap
endpoint yourself, use the regular Kafka endpoint. Traffic can cross AZ boundaries.

To influence broker placement, configure
[preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones).
Preferred availability zones don't guarantee that a broker runs in the requested AZ.

### No brokers are available in the selected AZ

If no broker is available in the selected AZ, Kafka routes requests to a broker in another
AZ. This results in cross-AZ traffic and doesn't require changes to the client
configuration.

An AZ-specific endpoint can remain listed after all brokers leave that AZ. The endpoint
remains available. The client can continue using the endpoint, and Kafka routes requests
to brokers in other AZs without requiring changes to the client configuration.

{/* TODO: Confirm with an SME that a client using an AZ-specific endpoint for an AZ without
brokers connects without errors and automatically falls back to brokers in other AZs. This
includes endpoints that remain listed after their brokers leave. */}

### Broker placement or service location changes

AZ-specific ports remain stable during normal scaling and broker replacement. However,
broker placement can change.

After scaling, broker replacement, or migration to another cloud or region, retrieve the
AZ-specific endpoints again and check that your client configuration uses the
appropriate endpoint.

<RelatedPages/>

- [Diskless topics for Apache Kafka](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Configure preferred availability zones](/docs/products/kafka/howto/configure-preferred-zones)
- [Enable follower fetching](/docs/products/kafka/howto/enable-follower-fetching)
- [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect)
- [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
