---
title: Perform Aiven for PostgreSQL® switchover to the recovery region
sidebar_label: Switchover
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Switch over](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region) to your Aiven for PostgreSQL® recovery service to simulate a disaster or test the resilience of your infrastructure.

## Prerequisites

- [CRDR setup](/docs/products/postgresql/crdr/enable-crdr) up and running
- Access to the [Aiven Console](https://console.aiven.io/)

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
</Tabs>

<RelatedPages/>

- [Perform Aiven for PostgreSQL® switchback to the primary region](/docs/products/postgresql/crdr/switchover/crdr-switchback)
- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
