---
title: Set up cross-cluster replication for Aiven for OpenSearch®
limited: true
---
Set up cross-cluster replication (CCR) for your Aiven for OpenSearch service to ensure efficient data synchronization across different regions and cloud providers.

:::note
Cross cluster replication is not available for the Hobbyist and Startup plans.
:::

## Steps to set up CCR

1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    the Aiven for OpenSearch service for which to set up cross-cluster replication.

2.  In the service's **Overview** page, scroll to the **Cross cluster
    replications** section and click **Create follower**.

3.  In the **Create OpenSearch follower cluster** page:

    -   Enter a name for the follower cluster.
    -   Select the desired cloud provider.
    -   Select the desired cloud region.
    -   Select the service plan.

    :::note
    During creation, the follower cluster service must have the same
    service plan as the leader cluster service. This ensures the
    follower cluster service has as much memory as the leader cluster.
    You can change the service plan as required later.
    :::

    -   Add additional disk storage based on your business requirements

4.  Select **Create**.

:::note
To learn about the current limitations with cross cluster replications
for Aiven for OpenSearch, see the
[Limitations](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch#ccr-limitatons) section.
:::

## View follower cluster services

You can view all the follower cluster services configured for your
OpenSearch service either from the **Service integration** section on
the service **Overview** screen or in the **Integrations** tab.
Additionally, the OpenSearch services display **Leader** and
**Follower** tags below the service name to help identify leader cluster
and follower cluster services.

## Setup cross-cluster replication via API

You can set up the cross cluster replication for Aiven for OpenSearch
service using the service integration endpoint and setting the
`integration-type` to `opensearch_cross_cluster_replication`. For more
information, see [Create new service
integration](https://api.aiven.io/doc/#tag/Service_Integrations).

## Setup cross-cluster replication via Terraform

You can set up the cross-cluster replication for Aiven for OpenSearch
service via the
[Aiven Terraform Provider](/docs/tools/terraform). Set the `integration-type` to
`opensearch_cross_cluster_replication` in the [Service Integration
resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration).
