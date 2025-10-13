---
title: Perform Aiven for PostgreSQL® failback to the primary region
sidebar_label: Failback
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Shift your workloads back to the primary region, where your service was hosted originally before failing over to the recovery region. Restore your CRDR setup.

## Prerequisites

- [CRDR failover](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery) completed
- One of the following tools for operating CRDR:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

## Revert to the primary region

Initiate a
[revert process](/docs/products/postgresql/crdr/crdr-overview#failback-to-the-primary-region)
using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross-region disaster recovery** page, click <ConsoleLabel name="actions"/> >
   **Failback to primary region**.
1. In **Service recovery cycle** wizard:

   1. Click **Restore primary service**.

      This puts the primary service in the **Rebuilding** state. As soon as **Rebuilding**
      changes to **Passive**, consider your primary service recreated and proceed to
      the next step.

   1. Click **Promote primary to active**.

      This takes effect when the primary service becomes **Active** and the recovery service
      becomes **Passive**, which means traffic and replication direction are switched back
      to the recreated primary service and your CRDR setup is restored to its original
      configuration.

   1. Click **Done**.

</TabItem>
<TabItem value="cli" label="CLI">

1. Restore the primary service by running
   [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update):

   ```bash
   avn service update PRIMARY_SERVICE_NAME \
      --disaster-recovery-role passive
   ```

   Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`.

1. Promote the primary service to active by running
   [avn byoc update](/docs/tools/cli/service-cli#avn-cli-service-update):

   ```bash
   avn service update PRIMARY_SERVICE_NAME \
      --disaster-recovery-role active
   ```

   Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`.

</TabItem>
<TabItem value="api" label="API">

1. Trigger the recreation of the primary service by calling the
   [ServiceUpdate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
   to change the `disaster_recovery_role` of the primary service to `passive`:

   ```bash {5}
   curl --request PUT \
   --url https://api.aiven.io/v1/project/PROJECT_NAME/service/PRIMARY_SERVICE_NAME \
   -H 'Authorization: Bearer BEARER_TOKEN' \
   -H 'content-type: application/json' \
   --data '{"disaster_recovery_role": "passive"}'
   ```

   Replace the following placeholders with meaningful data:

   - `PROJECT_NAME`, for example `crdr-test`
   - `PRIMARY_SERVICE_NAME`, for example `pg-primary-test`
   - `BEARER_TOKEN`

   After sending the request, you can check the CRDR status on each of the CRDR peer services:

   - Primary service status

      ```bash
      avn service get pg-primary
         --project $PROJECT_NAME
         --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
      ```

      Expect the following output:

      ```json
      {
        "state": "REBUILDING",
        "disaster_recovery_role": "passive"
      }
      ```

   - Recovery service status

      ```bash
      avn service get pg-primary-dr
      --project $PROJECT_NAME
      --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
      ```

      Expect the following output:

      ```json
      {
        "state": "RUNNING",
        "disaster_recovery_role": "active"
      }
      ```

1. Promote the primary service as active by calling the
   [ServiceUpdte endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
   to change `disaster_recovery_role` of the primary service to `active`:

   ```bash {5}
   curl --request PUT \
   --url https://api.aiven.io/v1/project/PROJECT_NAME/service/PRIMARY_SERVICE_NAME \
   -H 'Authorization: Bearer BEARER_TOKEN' \
   -H 'content-type: application/json' \
   --data '{"disaster_recovery_role": "active"}'
   ```

   Replace the following placeholders with meaningful data:

   - `PROJECT_NAME`, for example `crdr-test`
   - `PRIMARY_SERVICE_NAME`, for example `pg-primary-test`
   - `BEARER_TOKEN`

   After sending the request, you can check the CRDR status on each of the CRDR peer services:

   - Primary service status

      ```bash
      avn service get pg-primary
      --project $PROJECT_NAME
      --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
      ```

      Expect the following output:

      ```json
      {
        "state": "RUNNING",
        "disaster_recovery_role": "active"
      }
      ```

   - Recovery service status

      ```bash
      avn service get pg-primary-dr
      --project $PROJECT_NAME
      --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
      ```

      Expect the following output:

      ```json
      {
        "state": "RUNNING",
        "disaster_recovery_role": "passive"
      }
      ```

</TabItem>
<TabItem value="tf" label="Terraform">

The
[aiven_service_integration](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resource with the `disaster_recovery` type manages the active-passive relationship between
services. CRDR operations are performed by manipulating this integration.

To get back to the original primary-recovery setup:

1. Ensure both services exist and are healthy.

   ```hcl
   resource "aiven_postgresql" "primary" {
     project      = var.project_name
     service_name = var.primary_service_name
     plan         = var.service_plan
     cloud_name   = var.primary_cloud_region
   }

   resource "aiven_postgresql" "recovery" {
     project      = var.project_name
     service_name = var.recovery_service_name
     plan         = var.service_plan
     cloud_name   = var.recovery_cloud_region
   }
   ```

   If the services were removed from the Terraform state during the disaster, re-import
   them:

   ```bash
   terraform import aiven_postgresql.primary PROJECT_NAME/PRIMARY_SERVICE_NAME
   terraform import aiven_postgresql.recovery PROJECT_NAME/RECOVERY_SERVICE_NAME
   ```

1. Re-establish CRDR with the original primary as active:

   ```hcl
   resource "aiven_service_integration" "disaster_recovery_restored" {
     project                  = var.project_name
     integration_type         = "disaster_recovery"
     source_service_name      = aiven_postgresql.primary.service_name    # Original primary back to active
     destination_service_name = aiven_postgresql.recovery.service_name   # Back to passive role

     depends_on = [
       aiven_postgresql.primary,
       aiven_postgresql.recovery
     ]
   }
   ```

1. Apply to restore the original CRDR setup:

   ```bash
   terraform apply
   ```

1. Verify the failback:

   ```bash
   terraform output disaster_recovery_status
   ```

</TabItem>
</Tabs>

<RelatedPages/>

[Aiven for PostgreSQL® CRDR failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
