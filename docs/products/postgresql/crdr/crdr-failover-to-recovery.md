---
title: Fail over to Aiven for PostgreSQL® recovery service
sidebar_label: Fail over to recovery region
limited: true
keywords: [recovery, primary, outage, failure, failover, CRDR, cross-region disaster recovery]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

At the event of a region outage,
[failover](/docs/products/postgresql/crdr/crdr-overview#failover-to-the-recovery-region)
happens automatically. To simulate a disaster and test the resilience of your
infrastructure, you can also perform a manual failover.

## Prerequisites

- [CRDR setup](/docs/products/postgresql/crdr/enable-crdr) up and running
- One of the following tools for operating CRDR:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Automatic failover

[Automatic failover](/docs/products/postgresql/crdr/crdr-overview#automatic-failover) is
enabled by default with your CRDR setup. It's triggered automatically at the event of a
region outage.

## Fail over manually

Initiate a [manual failover](/docs/products/postgresql/crdr/crdr-overview#manual-failover)
using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click **Manage**.
1. In **Disaster recovery cycle** wizard, click **Initiate failover** > **Confirm**.

When the failover process is completed, your primary service is **Failed**, and the
recovery service is **Active**, which means the recovery service is in control over your
workloads now.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn byoc update](/docs/tools/cli/service-cli#avn-cli-service-update):

```bash
avn service update PRIMARY_SERVICE_NAME \
   --disaster-recovery-role failed
```

Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`.

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceUpdte endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
to change `disaster_recovery_role` of the primary service to `failed`:

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
</Tabs>

## Related pages

[Aiven for PostgreSQL® CRDR revert to the primary region](/docs/products/postgresql/crdr/crdr-revert-to-primary)
