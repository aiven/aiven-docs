---
title: Create read replica in Aiven for Valkey
sidebar_label: Create read replica
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

[Aiven for Valkey read replica](/docs/products/valkey/concepts/read-replica) enables data replication from a primary to a replica service, improving performance and increasing redundancy for high availability and disaster recovery.

## Prerequisites

- An Aiven account and API token.
- [Aiven CLI tool](https://github.com/aiven/aiven-client).

## Limitations

- You can create a maximum of **5 read replicas** per primary service.
- Read replicas are supported only on the **Startup** plan.

## Create a read replica

<Tabs groupId="method">
<TabItem value="1" label="Aiven Console">

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project,
   and select your Aiven for Valkey service.
1. On the <ConsoleLabel name="overview"/> page, scroll to the **Read replica** section,
1. Click **Create replica**.
1. Enter a name for the read replica, select the cloud provider, region, and service
   plan, and click **Create**.

The read replica is listed in your project services and can be accessed from the
**Read replica** section on the service's <ConsoleLabel name="overview"/> page. The
service type is identified by chips labeled **Primary** or **Replica** at the top.

</TabItem>
<TabItem value="2" label="Aiven CLI">

To create a read replica using the Aiven CLI, use the following command with placeholders:

```bash
avn service create -t valkey -p startup-4 --project PROJECT_NAME \
    --read-replica-for PRIMARY_SERVICE_NAME REPLICA_SERVICE_NAME
```

Parameters:

- `PROJECT_NAME`: Your project name.
- `CLOUD_NAME`: Cloud provider name.
- `PRIMARY_SERVICE_NAME`: Primary service name.
- `REPLICA_SERVICE_NAME`: Replica service name.

</TabItem>
<TabItem value="3" label="Aiven API">

To create a read replica for your Aiven for Valkey service via API, use the following
command:

```shell
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
-H "Content-Type: application/json" \
-H "Authorization: bearer YOUR_AUTH_TOKEN" \
-d '{
     "cloud": "CLOUD_NAME",
     "plan": "startup-4",
     "service_name": "REPLICA_SERVICE_NAME",
     "service_type": "valkey",
     "project": "PROJECT_NAME",
     "service_integrations": [
     {
        "integration_type": "read_replica",
        "source_service_name": "PRIMARY_SERVICE_NAME"
        }
       ]
     }'
```

Parameters:

- `PROJECT_NAME`: Your project name.
- `YOUR_AUTH_TOKEN`: Your API authentication token.
- `CLOUD_NAME`: Cloud provider name.
- `REPLICA_SERVICE_NAME`: Replica service name.
- `PRIMARY_SERVICE_NAME`: Primary service name.

</TabItem>
</Tabs>

## Promote a replica to a standalone primary

You can promote your read replica to a primary service. After promotion, the replica
becomes an independent primary service, disconnected from the original.

<Tabs groupId="method">
<TabItem value="1" label="Aiven Console">

1. Log in to the [Aiven Console](https://console.aiven.io/) and select your Aiven for
   Valkey service.
1. On the <ConsoleLabel name="overview"/> page, scroll to the **Read replica** section.
1. Click the replica service to promote.
1. On the **Replica** service's <ConsoleLabel name="overview"/> page, click
   **Promote to primary**.
1. In the confirmation dialog, click **Promote**.

</TabItem>
<TabItem value="2" label="Aiven CLI">

To promote the replica to primary using the Aiven CLI:

1. Retrieve the service integration ID with the `integration-list` command:

   ```bash
   avn service integration-list --project <project_name> <replica_service_name>
   ```

   Parameters:

   - `--project <project_name>`: Your project name.
   - `<replica_service_name>`: Your replica service name.

1. Delete the service integration with the following command:

   :::note
   Deleting the service integration breaks the replication link, promoting the replica
   to a standalone primary service.
   :::

   ```bash
   avn service integration-delete --project PROJECT_NAME <integration_id>
   ```

   Parameters:

   - `PROJECT_NAME`: Your project name.
   - `<integration_id>`: The integration ID obtained in the previous step.

</TabItem>
<TabItem value="3" label="Aiven API">

To promote the replica to primary using the Aiven API:

1. Get the service integration ID via an API call.

   ```shell
   curl -s \
   -H "Authorization: Bearer <token>" \
   "https://api.aiven.io/v1/project/PROJECT_NAME/service/REPLICA_SERVICE_NAME/integration" \
   | jq -r '.service_integrations[] | select(.source_service_name=="PRIMARY_SERVICE_NAME").service_integration_id'
   ```

   Parameters:

   - `Authorization: Bearer <token>`: Your API authentication
     [token](/docs/platform/concepts/authentication-tokens).
   - `PROJECT_NAME`: Your project name.
   - `REPLICA_SERVICE_NAME`: Your replica service name.
   - `PRIMARY_SERVICE_NAME`: Your primary service name.
   - `service_integration_id`: Extracts the integration ID.

1. Delete the service integration using the obtained integration ID.

   :::note
   Deleting the service integration breaks the replication link, promoting the replica
   to a standalone primary service.
   :::

   ```shell
   curl -X DELETE \
   -H "Authorization: Bearer <token>" \
   "https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID"

   ```

   Parameters:

   - `YOUR_AUTH_TOKEN`: Your API authentication
     [token](/docs/platform/concepts/authentication-tokens).
   - `PROJECT_NAME`: Your project name.
   - `INTEGRATION_ID`: The integration ID obtained in the previous step.


</TabItem>
</Tabs>

## Related pages

- [Aiven for Valkey read replica](/docs/products/valkey/concepts/read-replica)
