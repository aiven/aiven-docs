---
title: Set up cross-cluster replication for Aiven for OpenSearch®
limited: true
sidebar_label: Cross-cluster replication
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up cross-cluster replication (CCR) for your Aiven for OpenSearch service to synchronize data across regions and cloud providers efficiently.

:::note
Cross cluster replication is not available for the Free and Startup plans.
:::

## Steps to set up CCR

<Tabs groupId="ccr-setup-method">
<TabItem value="Console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and select the
   Aiven for OpenSearch service.
1. On the service's <ConsoleLabel name="overview"/> page, scroll to the
   **Cross cluster replication** section.
1. Click **Create follower**.

1. On the **Create OpenSearch follower cluster** page:

   - Enter a name for the follower service.
   - Select the cloud provider, region, and service plan.
   - Add additional disk storage if required.

   :::note
   The follower service must use the same service plan as the leader service
   during creation to ensure sufficient memory. You can change the service plan later.
   :::

1. Click **Create**.

</TabItem>
<TabItem value="API" label="Aiven API">

To set up cross-cluster replication using the Aiven API, create the follower service
and include the `opensearch_cross_cluster_replication` integration in the service
creation request. For more information, see
[Create service](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate).

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "service_type": "opensearch",
      "plan": "business-4",
      "cloud": "gcp-us-east1",
      "service_name": "follower-os-cluster",
      "service_integrations": [
         {
            "integration_type": "opensearch_cross_cluster_replication",
            "source_service": "LEADER_SERVICE_NAME",
            "user_config": {}
         }
      ]
  }'
```

Parameters:

- `PROJECT_NAME`: Aiven project name
- `API_TOKEN`: API authentication token
- `LEADER_SERVICE_NAME`: Leader service name

</TabItem>
</Tabs>

:::note
To learn about the limitations with cross-cluster replications
for Aiven for OpenSearch, see the
[Limitations](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch#ccr-limitatons) section.
:::

## View follower services

To view the follower services configured for your Aiven for OpenSearch service:

1. Go to the <ConsoleLabel name="overview"/> page of your service.
1. Scroll to the **Cross-cluster replication** section.
1. Click a follower service name to view its details.

The **Leader** and **Follower** chips below the service names identify the service roles.

## Promote a follower service to a standalone service

You can promote a follower service to standalone status to make it work independently,
without replicating data from a leader service. This is helpful in disaster recovery
situations where replication needs to stop, and the service must function on its own.

:::note
Promoting a follower service to standalone stops replication and deletes the
replication integration.
A standalone service cannot be reverted to a follower service.
:::

<Tabs groupId="promote-cluster-method">
<TabItem value="Console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and select the
   Aiven for OpenSearch service.
1. On the service's <ConsoleLabel name="overview" /> page, scroll to
   the **Cross-cluster replica status** section.
1. Click the follower Aiven for OpenSearch service to promote.
1. On the follower service's <ConsoleLabel name="overview" /> page, click
   **Promote to standalone** in the **Cross-cluster replica status**.
1. Click **Confirm** to complete the promotion.

The follower service is now a standalone service and can accept writes. You can set up
replication again if needed.

</TabItem>
<TabItem value="API" label="Aiven API">

To promote a follower service to standalone using the Aiven API,
delete the `opensearch_cross_cluster_replication` integration from the service.

```bash
curl -X DELETE https://api.aiven.io/v1/project/<PROJECT_NAME>/integration/<INTEGRATION_ID> \
  -H "Authorization: Bearer <API_TOKEN>"
```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<INTEGRATION_ID>`: ID of the `opensearch_cross_cluster_replication` integration.
- `<API_TOKEN>`: API authentication token.

Removing the integration transitions the follower service to a standalone service.

</TabItem>
</Tabs>
