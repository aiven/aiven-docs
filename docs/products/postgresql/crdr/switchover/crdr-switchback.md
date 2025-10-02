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
- Access to the [Aiven Console](https://console.aiven.io/)

## Switch back

<Tabs>
<TabItem value="console" label="Console">

Initiate a
[switchback](/docs/products/postgresql/crdr/crdr-overview#switchback-to-the-primary-region)
using the [Aiven Console](https://console.aiven.io/):

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click <ConsoleLabel name="actions"/> >
   **Switchback to primary service**.
1. In **Switchback to primary service** window, click **Promote to active** > **Confirm** >
   **Close**.

When the switchback process is completed, your primary service is **Active**, and the
recovery service is **Passive**, which means the primary service is in control over your
workloads now.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [Aiven CLI](/docs/tools/cli) to perform a switchback:

```bash
avn service disaster-recovery promote-to-master \
  --project PROJECT_NAME \
  SERVICE_NAME
```

Replace the placeholders with your actual values:

- `PROJECT_NAME`: Your Aiven project name
- `SERVICE_NAME`: Name of your primary PostgreSQL service

Monitor the switchback status:

```bash
avn service disaster-recovery get \
  --project PROJECT_NAME \
  SERVICE_NAME
```

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) API
endpoint to perform a switchback:

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
- `SERVICE_NAME`: Name of your primary PostgreSQL service
- `API_TOKEN`: Your Aiven API authentication token

Check the disaster recovery status:

```bash
curl -X GET \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/disaster-recovery" \
  -H "Authorization: aivenv1 API_TOKEN"
```

</TabItem>
</Tabs>

<RelatedPages/>

- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
- [Perform Aiven for PostgreSQL® switchover to the recovery region](/docs/products/postgresql/crdr/switchover/crdr-switchover)
