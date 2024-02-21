---
title: Setup cross cluster replication for Aiven for OpenSearch®
limited: true
pro: true
---

Learn how to set up Cross-cluster replication in Aiven for OpenSearch and replicate indexes, mappings, and metadata across multiple regions and cloud providers.

## Set up CCR using the Aiven Console

Follow these steps to set up
[cross cluster replication](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch) for your Aiven for OpenSearch service:

1. Log in to the [Aiven Console](https://console.aiven.io/), and select
   the Aiven for OpenSearch service for which you want to set up cross
   cluster replication.
1. In the service's **Overview** screen, scroll to the **Cross cluster replications**
   section and select **Create follower**.

1. In the **Create OpenSearch follower cluster** page:

    - Enter a name for the follower cluster.
    - Select the desired cloud provider.
    - Select the desired cloud region.
    - Select the service plan.

    :::note
    During creation, the follower cluster service must have the same
    service plan as the leader cluster service. This ensures the
    follower cluster service has as much memory as the leader cluster.
    You can change the service plan as required later.
    :::

    - Add additional disk storage based on your business requirements

1. Select **Create**.

The follower cluster is initially in a `Rebuilding` state and, once complete, can pull
all data and indexes from the leader service.

:::note
To learn about the current limitations with cross cluster replications
for Aiven for OpenSearch, see the
[Limitations](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch#ccr-limitatons) section.
:::

### View follower clusters

To view the follower clusters set up for your Aiven for OpenSearch service:

- Go to the service’s **Overview** page.
- Scroll down to the **Cross cluster replication** section where you can view all
the active follower clusters configured.
- Click on a follower cluster to view its OpenSearch service the details.
  While you can perform all service-related operations on these follower services,
  creating a follower from another follower service is not allowed.

To help you identify the services, Aiven for OpenSearch services display **Leader** and
**Follower** tags below the service name.

## Setup cross-cluster replication via API

You can set up the cross cluster replication for Aiven for OpenSearch
service using the service integration endpoint and setting the
`integration-type` to `opensearch_cross_cluster_replication`. For more
information, see [Create a new service
integration](https://api.aiven.io/doc/#tag/Service_Integrations).

## Setup cross-cluster replication via Terraform provider

You can set up the cross cluster replication for Aiven for OpenSearch
service via the
[Aiven Terraform provider](/docs/tools/terraform). Set the `integration-type` to
`opensearch_cross_cluster_replication` in the [Service Integration
resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration).
