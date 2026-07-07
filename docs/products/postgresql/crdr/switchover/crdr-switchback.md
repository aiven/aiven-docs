---
title: Perform Aiven for PostgreSQL® switchback to the primary region
sidebar_label: Switchback
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Shift your workloads back to the primary region, where your service was hosted originally before [switching over to the recovery region](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region).

## Prerequisites

- [CRDR switchover](/docs/products/postgresql/crdr/switchover/crdr-switchover) completed
- One of the following tools for operating CRDR:
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

## Switch back

<Tabs>
<TabItem value="cli" label="CLI">

Run [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) to promote
the primary service back to active:

```bash
avn service update PRIMARY_SERVICE_NAME \
   --disaster-recovery-role active
```

Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example,
`pg-demo`.

Verify the switchback by checking both services:

- Primary service status:

  ```bash
  avn service get PRIMARY_SERVICE_NAME \
    --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
  ```

  Expect the following output:

  ```json
  {
    "state": "RUNNING",
    "disaster_recovery_role": "active"
  }
  ```

- Recovery service status:

  ```bash
  avn service get RECOVERY_SERVICE_NAME \
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
to change the `disaster_recovery_role` of the primary service to `active`:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/PRIMARY_SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{"disaster_recovery_role": "active"}'
```

Replace the following:

- `PROJECT_NAME`, for example `crdr-test`
- `PRIMARY_SERVICE_NAME`, for example `pg-demo`
- `BEARER_TOKEN`

After sending the request, verify the status of each service:

- Primary service status:

  ```bash
  avn service get PRIMARY_SERVICE_NAME \
    --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
  ```

  Expect the following output:

  ```json
  {
    "state": "RUNNING",
    "disaster_recovery_role": "active"
  }
  ```

- Recovery service status:

  ```bash
  avn service get RECOVERY_SERVICE_NAME \
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
declaration. All integration fields are immutable, so a switchback requires destroying the
switched integration and restoring the original one. This approach has a window during
which the DR integration is offline. For a lower-risk switchback, use the Aiven CLI or
API instead.

To use Terraform:

1. Remove the switched disaster recovery integration from Terraform state.

   ```bash
   terraform destroy -target=aiven_service_integration.disaster_recovery_switched
   ```

1. Restore the original integration with the primary service as the source.

   ```hcl
   resource "aiven_service_integration" "disaster_recovery" {
     project                  = var.project_name
     integration_type         = "disaster_recovery"
     source_service_name      = aiven_postgresql.primary.service_name
     destination_service_name = aiven_postgresql.recovery.service_name
   }
   ```

1. Apply the restored configuration:

   ```bash
   terraform apply
   ```

</TabItem>
</Tabs>

After the switchback completes, your primary service is **Active**, and the
recovery service is **Passive**, which means the primary service is in control over your
workloads.

<RelatedPages/>

- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
- [Perform Aiven for PostgreSQL® switchover to the recovery region](/docs/products/postgresql/crdr/switchover/crdr-switchover)
