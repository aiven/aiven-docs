---
title: Perform Aiven for PostgreSQL® failover to the recovery region
sidebar_label: Failover
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Move your workload to another region for disaster recovery or testing purposes.

A [failover](/docs/products/postgresql/crdr/crdr-overview#failover-to-the-recovery-region)
allows you to respond to a region outage or simulate a disaster and test the resilience of
your infrastructure.

## Prerequisites

- [CRDR setup](/docs/products/postgresql/crdr/enable-crdr) up and running
- One of the following tools for operating CRDR:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

## Perform a failover

Initiate a
[failover](/docs/products/postgresql/crdr/crdr-overview#failover-to-the-recovery-region)
using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross-region disaster recovery** page, click <ConsoleLabel name="actions"/> >
   **Failover to recovery region**.
1. In the **Service recovery cycle** wizard, click **Initiate failover** > **Confirm** >
   **Close**.

When the failover process is completed, your primary service is **Failed**, and the
recovery service is **Active**, which means the recovery service is in control over your
workloads now.

</TabItem>
<TabItem value="cli" label="CLI">

Run [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update):

```bash
avn service update PRIMARY_SERVICE_NAME \
   --disaster-recovery-role failed
```

Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`.

</TabItem>
<TabItem value="api" label="API">

Call the [ServiceUpdte endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to change the `disaster_recovery_role` of the primary service to `failed`:

```bash {5}
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/PRIMARY_SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{"disaster_recovery_role": "failed"}'
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
   "state": "POWEROFF",
   "disaster_recovery_role": "failed"
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

</TabItem>
<TabItem value="tf" label="Terraform">

The
[`aiven_service_integration`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resource with the `disaster_recovery` type manages the active-passive relationship between
services. CRDR operations are performed by manipulating this integration.

To trigger failover and promote the recovery service to active:

1. Remove the existing disaster recovery integration from the Terraform state.

   ```bash
   terraform state rm aiven_service_integration.disaster_recovery
   ```

1. If primary service is completely unreachable, remove it from the Terraform state.

   ```bash
   terraform state rm aiven_postgresql.primary
   ```

The recovery service is now promoted to active and can handle traffic.

</TabItem>
</Tabs>

<RelatedPages/>

[Aiven for PostgreSQL® CRDR revert to the primary region](/docs/products/postgresql/crdr/failover/crdr-revert-to-primary)
