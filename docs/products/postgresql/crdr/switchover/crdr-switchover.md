---
title: Perform Aiven for PostgreSQL® switchover to the recovery region
sidebar_label: Switchover
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Perform a planned promotion of your recovery service while the primary service is healthy.

[Switch over](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region)
to your Aiven for PostgreSQL® recovery service for planned maintenance, simulating a
disaster, or testing the resilience of your infrastructure.

## Prerequisites

- [CRDR setup](/docs/products/postgresql/crdr/enable-crdr) up and running
- One of the following tools for operating CRDR:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

## Switch over

<Tabs>
<TabItem value="console" label="Console">

Initiate a [switchover](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region)
using the [Aiven Console](https://console.aiven.io/):

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click <ConsoleLabel name="actions"/> >
   **Switchover to recovery service**.
1. In **Switchover to recovery service** window, click **Promote to active** > **Confirm** >
   **Close**.

When the switchover process is completed, your primary service is **Passive**, and the
recovery service is **Active**, which means the recovery service is in control over your
workloads now.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [Aiven CLI](/docs/tools/cli) to perform a switchover:

```bash
avn service disaster-recovery promote-to-master \
  --project PROJECT_NAME \
  SERVICE_NAME
```

Replace the placeholders with your actual values:

- `PROJECT_NAME`: Your Aiven project name
- `SERVICE_NAME`: Name of your recovery PostgreSQL service

Monitor the switchover status:

```bash
avn service disaster-recovery get \
  --project PROJECT_NAME \
  SERVICE_NAME
```

Verify the service state after switchover:

```bash
avn service get \
  --project PROJECT_NAME \
  SERVICE_NAME
```

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) API
endpoint to perform a switchover:

```bash
curl -X PUT \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  -H "Authorization: aivenv1 API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "disaster_recovery_promote_to_master": true
  }'
```

Replace the placeholders:

- `PROJECT_NAME`: Your Aiven project name
- `SERVICE_NAME`: Name of your recovery PostgreSQL service
- `API_TOKEN`: Your Aiven API authentication token

Check the disaster recovery status:

```bash
curl -X GET \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/disaster-recovery" \
  -H "Authorization: aivenv1 API_TOKEN"
```

Verify the service state after switchover:

```bash
curl -X GET \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  -H "Authorization: aivenv1 API_TOKEN"
```

</TabItem>
<TabItem value="tf" label="Terraform">

The
[aiven_service_integration](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resource with disaster_recovery type manages the active-passive relationship between
services. CRDR operations are performed by manipulating this integration.

1. Comment out or remove the existing disaster recovery integration.

   ```hcl
   # resource "aiven_service_integration" "disaster_recovery" {
   #   project                  = var.project_name
   #   integration_type         = "disaster_recovery"
   #   source_service_name      = aiven_postgresql.primary.service_name
   #   destination_service_name = aiven_postgresql.recovery.service_name
   # }
   ```

   or

   ```bash
   terraform destroy -target=aiven_service_integration.disaster_recovery
   ```

1. Create an integration with roles reversed.

   ```hcl
   resource "aiven_service_integration" "disaster_recovery_switched" {
     project                  = var.project_name
     integration_type         = "disaster_recovery"
     source_service_name      = aiven_postgresql.recovery.service_name   # Now active
     destination_service_name = aiven_postgresql.primary.service_name    # Now passive
   }
   ```

1. Wait for the switchover to complete before applying the new configuration.

   ```bash
   terraform apply
   ```

</TabItem>
</Tabs>

<RelatedPages/>

- [Perform Aiven for PostgreSQL® switchback to the primary region](/docs/products/postgresql/crdr/switchover/crdr-switchback)
- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
