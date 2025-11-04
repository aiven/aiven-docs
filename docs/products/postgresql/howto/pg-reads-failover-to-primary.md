---
title: Aiven for PostgreSQL® reads failover to the primary
sidebar_label: Reads failover to primary
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleIcon from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Enable automatic failover for your Aiven for PostgreSQL® read workloads to ensure uninterrupted access when standby nodes are unavailable.

When you route read-only queries to standby nodes, a standby failure can make your replica
URI temporarily unreachable until a new standby is provisioned and catches up. Reads
failover to the primary automatically and temporarily redirects read-only traffic to the
healthy primary node when all standbys are unavailable, helping you avoid downtime.

## Benefits

-   Improves availability for read workloads during standby outages.
-   Reduces operational effort; no app-side routing changes required.
-   Uses a single, stable connection endpoint for read traffic.

## How it works

-   This feature doesn't create additional replicas; it redirects read traffic when
    replicas are unavailable. When enabled, your service exposes a dedicated HA replica
    DNS endpoint for read-only traffic.
-   Under normal conditions, this endpoint resolves to standby nodes.
-   If all standbys become unavailable, the endpoint automatically switches to the primary.
-   When standbys recover, the endpoint switches back to replicas.

## Enable the feature

You can manage reads failover to the primary from the Aiven Console, CLI, API, or using
Aiven Provider for Terraform.

### Prerequisites

- Aiven for PostgreSQL service on a [Business or Premium plan](https://aiven.io/pricing?product=pg) (see how to [change your plan](/docs/platform/howto/scale-services))
- Tool for managing the feature:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)
- During a failover to primary, read-only traffic is served by the primary. Ensure your
  application can tolerate reads from the primary if it assumes read-after-write or
  specific consistency behavior.

### Use your preferred tool

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1.   In the [Aiven Console](https://console.aiven.io/), open your Aiven for PostgreSQL®
     service.
1.   Go to service <ConsoleLabel name="service settings"/> > **Advanced configuration**.
1.   Click **Configure** > **Add configuration option**.
1.   Use the search bar to find `enable_ha_replica_dns`, and set it to **Enabled**.
1.   Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run

```bash
aiven service update SERVICE_NAME -c enable_ha_replica_dns=true
```

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceUpdate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to set the `enable_ha_replica_dns` configuration to `true`:

```bash {8}
curl --request PUT \
--url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
--header 'Authorization: Bearer BEARER_TOKEN' \
--header 'content-type: application/json' \
--data
  '{
    "user_config": {
      "enable_ha_replica_dns": true
      }
  }'
```

</TabItem>
<TabItem value="tf" label="Terraform">

Add or update your Terraform resource for the Aiven for PostgreSQL service:

```hcl {8}
resource "aiven_pg" "example" {
  project      = "PROJECT_NAME"
  cloud_name   = "CLOUD_REGION"
  plan         = "PLAN_NAME"
  service_name = "SERVICE_NAME"

  user_config = {
    enable_ha_replica_dns = true
    # ...other config options
  }
}
```

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Add or update your Aiven Service custom resource manifest:

```yaml {10}
apiVersion: aiven.io/v1alpha1
kind: PostgreSQL
metadata:
  name: SERVICE_NAME
spec:
  project: PROJECT_NAME
  cloudName: CLOUD_REGION
  plan: PLAN_NAME
  userConfig:
    enable_ha_replica_dns: true
    # ...other config options
```

</TabItem>
</Tabs>

## Use the HA-replica-DNS endpoint

1.  After enabling, retrieve the replica connection URI from the console, CLI, or API.
    This URI will automatically redirect to the primary when replicas are unavailable and
    switch back once replicas are healthy.
1.  Point your read-only clients to this URI to benefit from automatic failover without
    changing application logic.

Existing connections to replicas may fail during an outage. New connections using the HA replica DNS continue to succeed.

## Disable the feature

You can disable reads failover to the primary at any time.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1.   In the [Aiven Console](https://console.aiven.io/), open your Aiven for PostgreSQL®
     service.
1.   Go to service <ConsoleLabel name="service settings"/> > **Advanced configuration**.
1.   Click **Configure** > **Add configuration option**.
1.   Use the search bar to find `enable_ha_replica_dns`, and set it to **Disabled**.
1.   Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run

```bash
aiven service update SERVICE_NAME -c enable_ha_replica_dns=false
```

</TabItem>
<TabItem value="api" label="API">

Call the
[ServiceUpdate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to set the `enable_ha_replica_dns` configuration to `false`:

```bash {8}
curl --request PUT \
--url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
--header 'Authorization: Bearer BEARER_TOKEN' \
--header 'content-type: application/json' \
--data
  '{
    "user_config": {
      "enable_ha_replica_dns": false
      }
  }'
```

</TabItem>
<TabItem value="tf" label="Terraform">

Add or update your Terraform resource for the Aiven for PostgreSQL service:

```hcl {8}
resource "aiven_pg" "example" {
  project      = "PROJECT_NAME"
  cloud_name   = "CLOUD_REGION"
  plan         = "PLAN_NAME"
  service_name = "SERVICE_NAME"

  user_config = {
    enable_ha_replica_dns = false
    # ...other config options
  }
}
```

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Add or update your Aiven Service custom resource manifest:

```yaml {10}
apiVersion: aiven.io/v1alpha1
kind: PostgreSQL
metadata:
  name: SERVICE_NAME
spec:
  project: PROJECT_NAME
  cloudName: CLOUD_REGION
  plan: PLAN_NAME
  userConfig:
    enable_ha_replica_dns: false
    # ...other config options
```

</TabItem>
</Tabs>
