---
title: Set up cross-region disaster recovery in Aiven for PostgreSQL®
sidebar_label: Set up CRDR
limited: true
keywords: [recovery, primary, outage, failure, failover]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enable the [cross-region disaster recovery (CRDR)](/docs/products/postgresql/crdr/crdr-overview) feature in in Aiven for PostgreSQL® by creating a recovery service, which takes over from a primary service in case of region outage.

## Prerequisites

- Powered-on Aiven for PostgreSQL service with a Startup plan at minimum

  :::tip
  If your Aiven for PostgreSQL service uses a Hobbyist plan or a Free plan,
  [upgrade your free plan](/docs/platform/concepts/free-plan#upgrading-and-downgrading) or
  [change your Hobbyist plan](/docs/platform/howto/scale-services) to at least a Startup
  plan.
  :::

- Access to the [Aiven Console](https://console.aiven.io/) or
  the [Aiven CLI client installed](/docs/tools/cli)

## Set up a recovery service

Create a [CRDR setup](/docs/products/postgresql/crdr/crdr-overview#crdr-setup) using
a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click **Create recovery service**.
1. In **Create recovery service** wizard:
   1. Select a cloud provider and a cloud region.
   1. Click **Create recovery service**.

Througout the process of creating the recovery service, the recovery service is in the
**Rebuilding** state. As soon as the recovery service is ready, its status changes to
**Passive**, which means your CRDR setup is up and running.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn byoc create](/docs/tools/cli/service-cli#avn-cli-service-create):

```bash
avn service create RECOVERY_SERVICE_NAME             \
   --service-type pg                                 \
   --plan SERVICE_PLAN                               \
   --cloud CLOUD_REGION                              \
   --disaster-recovery-copy-for PRIMARY_SERVICE_NAME
```

Replace the following:

- `RECOVERY_SERVICE_NAME` with the name of the recovery service, for example,
  `pg-demo-recovery`
- `SERVICE_PLAN` with the plan to use for the recovery service, for example, `startup-4`
- `CLOUD_REGION` with the cloud region where to host the recovery service, for example,
  `google-europe-west-4`
- `PRIMARY_SERVICE_NAME` with the name of the primary service, for example, `pg-demo`

</TabItem>
</Tabs>

## Related pages

- [Aiven for PostgreSQL® CRDR failover to the recovery region](/docs/products/postgresql/crdr/crdr-failover-to-recovery)
- [Aiven for PostgreSQL® CRDR revert to the primary region](/docs/products/postgresql/crdr/crdr-revert-to-primary)
