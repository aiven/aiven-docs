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
  project                  = "<PROJECT_NAME>"
  integration_type         = "opensearch_cross_cluster_replication"
  source_service_name      = "<LEADER_SERVICE_NAME>"
  destination_service_name = "<FOLLOWER_SERVICE_NAME>"
}
```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<LEADER_SERVICE_NAME>`: Leader (source) cluster service name.
- `<FOLLOWER_SERVICE_NAME>`: Follower (destination) cluster service name.

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

## Promote a follower cluster to a standalone service

Promote a follower cluster to a standalone status to enable it to operate independently
without replicating data from a leader cluster. Use this in scenarios such as
disaster recovery to stop replication and make the follower cluster a standalone,
write-enabled service.

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

  :::note
  This action will stop replication and make the follower cluster standalone.
  :::

The follower cluster is now a standalone service and can accept writes. You can set up
replication again if needed.

</TabItem>
<TabItem value="API" label="Aiven API">

To promote a follower cluster to standalone using the Aiven API,
remove the `opensearch_cross_cluster_replication` integration from the service.

```bash
curl -X DELETE https://api.aiven.io/v1/project/<PROJECT_NAME>/integration/<INTEGRATION_ID> \
  -H "Authorization: Bearer <API_TOKEN>"
```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<INTEGRATION_ID>`: ID of the `opensearch_cross_cluster_replication` integration.
- `<API_TOKEN>`: API authentication token.

After the integration is removed, the follower cluster transitions to a
standalone service.

</TabItem>
<TabItem value="CLI" label="Aiven CLI">

To promote a follower cluster to standalone using the
[Aiven CLI](/docs/tools/cli), remove the `opensearch_cross_cluster_replication`
integration with the following command:

```bash
avn service integration-delete \
  --project <PROJECT_NAME> \
  --integration-id <INTEGRATION_ID>
```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<INTEGRATION_ID>`: ID of the `opensearch_cross_cluster_replication` integration.

After the integration is deleted, the follower cluster transitions to a standalone
service.

</TabItem>
<TabItem value="Terraform" label="Terraform">

To promote a follower cluster to standalone using
[Terraform](/docs/tools/terraform), remove the `opensearch_cross_cluster_replication`
integration by deleting or commenting out the corresponding resource in the configuration.

```hcl
resource "aiven_service_integration" "ccr" {
  # Remove or comment out this resource to delete the integration
}
```

After applying the changes (`terraform apply`), the follower cluster transitions to a
standalone service.

</TabItem>
</Tabs>
