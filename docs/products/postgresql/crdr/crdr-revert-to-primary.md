---
title: Revert to Aiven for PostgreSQL® primary service
sidebar_label: Revert to primary region
limited: true
keywords: [recovery, primary, outage, failure, failover, CRDR, cross-region disaster recovery]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Shift your workloads back to the primary region, where your service was hosted originally before failing over to the recovery region. Restore your CRDR setup.

## Prerequisites

- [CRDR failover](/docs/products/postgresql/crdr/crdr-failover-to-recovery) completed
- Access to the [Aiven Console](https://console.aiven.io/) or
  the [Aiven CLI client installed](/docs/tools/cli)

## Revert to the primary region

Initiate a
[revert process](/docs/products/postgresql/crdr/crdr-overview#revert-to-the-primary-region)
using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click **Manage**.
1. In **Disaster recovery cycle** wizard:

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
<TabItem value="cli" label="Aiven CLI">

1. Restore the primary service by running
   [avn byoc update](/docs/tools/cli/service-cli#avn-cli-service-update):

   ```bash
   avn service update PRIMARY_SERVICE_NAME \
      --disaster-recovery-role passive
   ```

   Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`.

1. Promote the primary service as active by running
   [avn byoc update](/docs/tools/cli/service-cli#avn-cli-service-update):

   ```bash
   avn service update PRIMARY_SERVICE_NAME \
      --disaster-recovery-role active
   ```

   Replace `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`.

</TabItem>
</Tabs>

## Related pages

[Aiven for PostgreSQL® CRDR failover to the recovery region](/docs/products/postgresql/crdr/crdr-failover-to-recovery)
