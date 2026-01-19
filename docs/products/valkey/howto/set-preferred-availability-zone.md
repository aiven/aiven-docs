---
title: Set preferred availability zone for Aiven for Valkey™
sidebar_label: Set preferred AZ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Configure a preferred availability zone (AZ) for your Aiven for Valkey™ primary node to optimize latency and align with your application's deployment architecture.

## About this feature

The preferred availability zone feature provides a hint to the Aiven platform about
where to deploy the primary node of your Valkey service. When you set a preferred AZ,
the system attempts to place the primary node in that zone and perform automatic
failover to nodes in that zone when available.

### How it works

When a preferred AZ is configured:

- During service creation, the system attempts to deploy the primary node in the
  specified AZ
- During failover events, the system prefers promoting nodes in the specified AZ to
  become the new primary
- Replica nodes are distributed across other available AZs for high availability

### Benefits

- **Reduced latency**: Place the primary node closer to your application workloads
- **Predictable topology**: Align database placement with application architecture
- **Cost optimization**: Minimize cross-AZ data transfer costs in the same region

## Prerequisites

- Aiven for Valkey service on **Business**, **Premium**, or **Custom** plan (services
  with multiple nodes)
- Access to the [Aiven Console](https://console.aiven.io), Aiven CLI, or Aiven API

## Limitations

This is a best-effort feature with the following constraints:

- **No guarantees**: The platform attempts to honor the preference but cannot guarantee
  the primary node deploys in the specified AZ
- **Availability-dependent**: The preferred AZ must be available in your selected cloud
  region
- **Node distribution**: If your service has fewer nodes than available AZs in the
  region, no node may be deployed in the preferred AZ
  - Example: A 2-node service in a region with 3 AZs might not have a node in your
    preferred AZ
- **Cloud provider limitations**: The selected AZ must exist and be accessible in your
  cloud provider's region

## Set preferred availability zone

<Tabs groupId="method">
<TabItem value="1" label="Aiven Console">

1. Log in to the [Aiven Console](https://console.aiven.io) and select your Valkey
   service.
1. Click <ConsoleLabel name="service settings"/> from the sidebar.
1. On the **Service settings** page, scroll to the **Cloud and network** section.
1. Click <ConsoleLabel name="actions"/> > **Change cloud or region**.
1. In the **Preferred availability zone** dropdown, select your preferred AZ from the
   available options for your current region.
1. Click **Save changes**.

The system attempts to place the primary node in the selected AZ. If a failover occurs,
the system prefers promoting a node from this AZ to primary.

</TabItem>
<TabItem value="2" label="Aiven CLI">

Set the preferred AZ using the `service update` command:

```bash
avn service update SERVICE_NAME \
  -c preferred_az=AVAILABILITY_ZONE
```

Parameters:

- `SERVICE_NAME`: Name of your Valkey service
- `AVAILABILITY_ZONE`: AZ identifier such as `use1-az1` (AWS) or `europe-west1-b`
  (Google Cloud)

Example:

```bash
avn service update my-valkey-service \
  -c preferred_az=use1-az1
```

</TabItem>
<TabItem value="3" label="Aiven API">

Update the service configuration with a `PATCH` request:

```bash
curl -X PATCH https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "user_config": {
      "preferred_az": "AVAILABILITY_ZONE"
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project
- `SERVICE_NAME`: Name of your Valkey service
- `YOUR_AUTH_TOKEN`: Your Aiven API token
- `AVAILABILITY_ZONE`: AZ identifier such as `use1-az1` or `europe-west1-b`

Example:

```bash
curl -X PATCH https://api.aiven.io/v1/project/my-project/service/my-valkey-service \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer aiven-api-token-abc123" \
  -d '{
    "user_config": {
      "preferred_az": "use1-az1"
    }
  }'
```

</TabItem>
</Tabs>

## Verify preferred availability zone

<Tabs groupId="method">
<TabItem value="1" label="Aiven Console">

1. Go to your service's <ConsoleLabel name="overview"/> page.
1. In the **Connection information** section, view the current primary node endpoint.
1. Check the **Nodes** section to see which AZ each node is deployed in.

</TabItem>
<TabItem value="2" label="Aiven CLI">

View service details to see node distribution:

```bash
avn service get SERVICE_NAME --json | grep -A 5 "node_states"
```

</TabItem>
<TabItem value="3" label="Aiven API">

Retrieve service information:

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```

Check the `node_states` section in the response to see which AZ each node is deployed in
and which node is currently the primary.

</TabItem>
</Tabs>

## Remove preferred availability zone

To remove the preference and allow the system to choose the primary node location
automatically, set the value to `null` or an empty string.

<Tabs groupId="method">
<TabItem value="1" label="Aiven Console">

1. Click <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll to the **Cloud and network** section.
1. Click <ConsoleLabel name="actions"/> > **Change cloud or region**.
1. In the **Preferred availability zone** dropdown, select **No preference**.
1. Click **Save changes**.

</TabItem>
<TabItem value="2" label="Aiven CLI">

```bash
avn service update SERVICE_NAME \
  -c preferred_az=null
```

</TabItem>
<TabItem value="3" label="Aiven API">

```bash
curl -X PATCH https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "user_config": {
      "preferred_az": null
    }
  }'
```

</TabItem>
</Tabs>

<RelatedPages/>

- [High availability in Aiven for Valkey™](/docs/products/valkey/concepts/high-availability)
- [Plans & pricing](https://aiven.io/pricing?product=redis)
