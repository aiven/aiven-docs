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

- One of the following tools for operating CRDR:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

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
<TabItem value="api" label="Aiven API">

Call the
[ServiceCreate endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate) to
create a recovery service and enable the `disaster_recovery` service integration between
the recovery service and the primary service, for example:

```bash {14}
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service \
  -H 'accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{
    "service_name": "RECOVERY_SERCICE_NAME",
    "cloud": "CLOUD_PROVIDER_REGION",
    "plan": "SERVICE_PLAN",
    "service_type": "SERVICE_TYPE",
    "disk_space_mb": DISK_SIZE,
    "service_integrations": [
      {
        "integration_type": "disaster_recovery",
        "source_service": "PRIMARY_SERVICE_NAME",
        "user_config": {}
      }
    ]
  }'
```

Replace the following placeholders with meaningful data:

- `PROJECT_NAME`, for example `crdr-test`
- `BEARER_TOKEN`
- `RECOVERY_SERCICE_NAME`, for example `pg-dr-test`
- `CLOUD_PROVIDER_REGION`, for example `google-europe-west10`
- `SERVICE_PLAN`, for example `startup-4`
- `SERVICE_TYPE`, for example `pg`
- `DISK_SIZE` in MiB, for example `81920`
- `PRIMARY_SERVICE_NAME`, for example `pg-primary-test`

After sending the request, you can check the CRDR status on each of the CRDR peer services:

- Primary service status

  ```bash
  avn service get PRIMARY_SERVICE_NAME
    --project PROJECT_NAME
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
  avn service get RECOVERY_SERVICE_NAME
    --project PROJECT_NAME
    --json | jq '{state: .state, disaster_recovery_role: .disaster_recovery_role}'
  ```

  Expect the following output:

  ```json
  {
    "state": "REBUILDING",
    "disaster_recovery_role": "passive"
  }
  ```

</TabItem>
</Tabs>

## Related pages

- [Aiven for PostgreSQL® CRDR failover to the recovery region](/docs/products/postgresql/crdr/crdr-failover-to-recovery)
- [Aiven for PostgreSQL® CRDR revert to the primary region](/docs/products/postgresql/crdr/crdr-revert-to-primary)
