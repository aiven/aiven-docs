---
title: Create read replica in Aiven for Caching
sidebar_label: Create read replica
enterprise: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Aiven for Caching read replica](/docs/products/caching/concepts/caching-read-replica) enables data replication from a primary to a replica service, ensuring high availability and disaster recovery.

## Prerequisites

- This feature requires Aiven enterprise.
- An Aiven account and API token
- [Aiven CLI tool](https://github.com/aiven/aiven-client)
- Backup enabled for the service

## Limitations

- You can only create a maximum of **5 read replicas** per primary service.
- Read replicas can only be created on the **Startup-4** plan.


## Create a read replica

<Tabs>
<TabItem value="1" label="Aiven Console" groupId="group1" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project,
   and select your  Aiven for Caching service.
1. On the **Overview** page, click **Create replica**.
1. Enter a name for the read replica, select the cloud provider, region, and
   service plan, and click **Create**.

The read replica is created and listed within your project services. You can access
read replica services from the **Read replica** section on the service's **Overview**
page. Additionally, identify the service type by the chips
labeled **Primary** or **Replica** at the top.

</TabItem>
<TabItem value="2" label="Aiven CLI" groupId="group1">

To enable a read replica using the Aiven CLI, use the following command with placeholders:

```bash
avn service create -t redis -p startup-4 --project PROJECT_NAME \
    --read-replica-for PRIMARY_SERVICE_NAME REPLICA_SERVICE_NAME
```

Replace the placeholders with your actual values:

   - `PROJECT_NAME`: The name of your project.
   - `CLOUD_NAME`: The name of the cloud to use.
   - `PRIMARY_SERVICE_NAME`: The name of your primary service.
   - `REPLICA_SERVICE_NAME`: The name of your replica service.

</TabItem>
<TabItem value="3" label="Aiven API" groupId="group1">

To enable a read replica for your existing Aiven for Caching service via API,
use the following command:

```shell
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
-H "Content-Type: application/json" \
-H "Authorization: bearer YOUR_AUTH_TOKEN" \
-d '{
     "cloud": "CLOUD_NAME",
     "plan": "startup-4",
     "service_name": "REPLICA_SERVICE_NAME",
     "service_type": "redis",
     "project": "PROJECT_NAME",
     "service_integrations": [
     {
        "integration_type": "read_replica",
        "source_service_name": "PRIMARY_SERVICE_NAME"
        }
       ]
     }'
```

Replace the placeholders with your actual values:

- `PROJECT_NAME`: The name of your project.
- `YOUR_AUTH_TOKEN`: Your API authentication token.
- `CLOUD_NAME`: The name of the cloud to use.
- `REPLICA_SERVICE_NAME`: The name of your replica service.
- `PRIMARY_SERVICE_NAME`: The name of your primary service.

</TabItem>
</Tabs>

## Promote a replica to standalone primary

You can promote your read replica to become a primary service. After promotion, the
replica becomes an independent primary service,
disconnected from the original.

<Tabs>
<TabItem value="1" label="Aiven Console" groupId="group1" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   your Aiven for Caching service.
1. Click the replica service you intend to promote in the* Read replica* section on
   the service's **Overview** page.
1. On the *replica* service's **Overview** page, click **Promote to primary**.
1. Click **Promote**, in the confirmation dialog.

</TabItem>
<TabItem value="2" label="Aiven CLI" groupId="group1">

To promote the replica to primary using the Aiven CLI, follow these steps:

1. Retrieve the service integration ID using the integration-list command:

   ```bash
   avn service integration-list --project <project_name> <replica_service_name>
   ```

   Parameters:

   - `--project <project_name>`: The name of your project.
   - `<replica_service_name>`: The name of your replica service.

1. Delete the service integration using the following command:

   ...:::note
   Deleting the service integration breaks the replication link between the primary and
   the replica, promoting the replica to act as a standalone primary service.
   :::

   ```bash
   avn service integration-delete --project <project_name> <integration_id>
   ```

   Parameters:

   - `--project <project_name>`: The name of your project.
   - `<integration_id>`: The integration ID retrieved in the previous step.

</TabItem>
<TabItem value="3" label="Aiven API" groupId="group1">

To promote the replica to primary using the Aiven API, follow these steps:

1. Initiate an API call to retrieve the service integration ID.

   ```shell
   curl -s \
   -H "Authorization: bearer YOUR_AUTH_TOKEN" \
   "https://api.aiven.io/v1/project/<project_name>/service/<replica_service_name>/integration" \
   | jq -r '.service_integrations[] | select(.source_service_name=="<primary_service_name>").service_integration_id'

   ```

   Parameter:

   - `YOUR_AUTH_TOKEN`: Your API authentication token.
   - `<project_name>`: The name of your project.
   -` <replica_service_name>`: The name of your replica service.
   - `select(.source_service_name=="<primary_service_name>")`: Filters the integrations
     to find the one linked to your primary service.
   - `service_integration_id`: Extracts the integration ID.

1. Delete the service integration using the retrieved integration ID.

   ```shell
   curl -X DELETE -H "Authorization: bearer YOUR_AUTH_TOKEN" "https://api.aiven.io/v1/project/<project_name>/integration/<integration_id>"

   ```

   Parameters:

   - `YOUR_AUTH_TOKEN`: Your API authentication token.
   - `<project_name>`: The name of your project.
   - `<integration_id>`: The integration ID retrieved in the previous step.

The replica service will be promoted to a standalone primary service, disconnected
from the original primary service.

</TabItem>
</Tabs>
