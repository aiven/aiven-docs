---
title: Set up cross-cluster replication for Aiven for OpenSearch®
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up cross-cluster replication (CCR) for your Aiven for OpenSearch service to ensure efficient data synchronization across different regions and cloud providers.

:::note
Cross cluster replication is not available for the Hobbyist and Startup plans.
:::

## Steps to set up CCR

<Tabs groupId="ccr-setup-method">
<TabItem value="Console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and select the
   Aiven for OpenSearch service.
1. On the service's <ConsoleLabel name="overview"/> page, scroll to the **Cross cluster
    replications** section.
1. Click **Create follower**.

1. On the **Create OpenSearch follower cluster** page:

   - Enter a name for the follower cluster.
   - Select the cloud provider, region, and service plan.
   - Add additional disk storage if required.

   :::note
   The follower cluster must use the same service plan as the leader cluster
   during creation to ensure sufficient memory. You can change the service plan later.
   :::

1.  Click **Create**.

</TabItem>
<TabItem value="API" label="Aiven API">

To set up cross-cluster replication using the Aiven API, use the service integration
endpoint and specify the `integration_type` as `opensearch_cross_cluster_replication`.
For more information, see
[Create service integration](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate).

```bash
curl -X POST https://api.aiven.io/v1/project/<PROJECT_NAME>/integration \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "source_service": "<LEADER_SERVICE_NAME>",
    "dest_service": "<FOLLOWER_SERVICE_NAME>",
    "integration_type": "opensearch_cross_cluster_replication"
  }'
```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<LEADER_SERVICE_NAME>`: Leader (source) cluster service name.
- `<FOLLOWER_SERVICE_NAME>`: Follower (destination) cluster service name.
- `<API_TOKEN>`: API authentication token.


</TabItem>
<TabItem value="CLI" label="Aiven CLI">

### Set up CCR using the Aiven CLI

To set up cross-cluster replication with the [Aiven CLI](/docs/tools/cli), use the
`avn service integration-create` command and
specify the `integration-type` as `opensearch_cross_cluster_replication`.

```bash
avn service integration-create \
  --project <PROJECT_NAME> \
  --source-service <LEADER_SERVICE_NAME> \
  --dest-service <FOLLOWER_SERVICE_NAME> \
  --integration-type opensearch_cross_cluster_replication

```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<LEADER_SERVICE_NAME>`: Leader (source) cluster service name.
- `<FOLLOWER_SERVICE_NAME>`: Follower (destination) cluster service name.


</TabItem>
<TabItem value="Terraform" label="Terraform">

To set up cross-cluster replication with Terraform, configure
 the [Aiven Provider for Terraform](/docs/tools/terraform) and
 set the `integration-type` to `opensearch_cross_cluster_replication` in the
 service integration resource. For example:

```hcl
resource "aiven_service_integration" "ccr" {
  project                = "<project_name>"
  integration_type       = "opensearch_cross_cluster_replication"
  source_service_name    = "<leader_service_name>"
  destination_service_name = "<follower_service_name>"
}
```

Parameters:

- `project`: Your Aiven project name.
- `source_service_name`: Name of the leader cluster service.
- `destination_service_name`: Name of the follower cluster service.

For detailed information, see the
[Service Integration resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration).

</TabItem>
</Tabs>

:::note
To learn about the limitations with cross cluster replications
for Aiven for OpenSearch, see the
[Limitations](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch#ccr-limitatons) section.
:::

## View follower cluster services

To view the follower cluster services configured for your Aiven for OpenSearch service:

1. Go to the <ConsoleLabel name="overview"/> page of your service.
1. Scroll to the **Cross-cluster replication** section.
1. Click a follower cluster name to view its details.

The **Leader** and **Follower** chips below the service names identify the cluster roles.
