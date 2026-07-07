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
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

## Switch over

<Tabs>
<TabItem value="cli" label="CLI">

Run [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) to promote
the recovery service to active:

```bash
avn service update RECOVERY_SERVICE_NAME \
   --disaster-recovery-role active
```

Replace `RECOVERY_SERVICE_NAME` with the name of the recovery service, for example,
`pg-demo-recovery`.

Verify the switchover by checking both services:

- Recovery service status:

  ```bash
  avn service get RECOVERY_SERVICE_NAME \
    --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
  ```

  Expect the following output:

  ```json
  {
    "state": "RUNNING",
    "disaster_recovery_role": "active"
  }
  ```

- Primary service status:

  ```bash
  avn service get PRIMARY_SERVICE_NAME \
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
<TabItem value="api" label="API">

Call the [ServiceUpdate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to change the `disaster_recovery_role` of the recovery service to `active`:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/RECOVERY_SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{"disaster_recovery_role": "active"}'
```

Replace the following:

- `PROJECT_NAME`, for example `crdr-test`
- `RECOVERY_SERVICE_NAME`, for example `pg-demo-recovery`
- `BEARER_TOKEN`

After sending the request, verify the status of each service:

- Recovery service status:

  ```bash
  avn service get RECOVERY_SERVICE_NAME \
    --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
  ```

  Expect the following output:

  ```json
  {
    "state": "RUNNING",
    "disaster_recovery_role": "active"
  }
  ```

- Primary service status:

  ```bash
  avn service get PRIMARY_SERVICE_NAME \
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

The Terraform provider manages the `disaster_recovery` integration as a static topology
declaration. All integration fields are immutable, so a switchover requires destroying the
existing integration and creating a new one with the source and destination reversed.
This approach has a window during which the DR integration is offline. For a
lower-risk switchover, use the Aiven CLI or API instead.

To use Terraform:

1. Remove the existing disaster recovery integration from Terraform state.

   ```bash
   terraform destroy -target=aiven_service_integration.disaster_recovery
   ```

1. Create an integration with the recovery service as the source.

   ```hcl
   resource "aiven_service_integration" "disaster_recovery_switched" {
     project                  = var.project_name
     integration_type         = "disaster_recovery"
     source_service_name      = aiven_postgresql.recovery.service_name
     destination_service_name = aiven_postgresql.primary.service_name
   }
   ```

1. Apply the new configuration:

   ```bash
   terraform apply
   ```

</TabItem>
</Tabs>

After the switchover completes, your primary service is **Passive**, and the
recovery service is **Active**, which means the recovery service is in control over your
workloads.

<RelatedPages/>

- [Perform Aiven for PostgreSQL® switchback to the primary region](/docs/products/postgresql/crdr/switchover/crdr-switchback)
- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
