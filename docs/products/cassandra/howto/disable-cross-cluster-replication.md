---
title: Disable cross-cluster replication in Aiven for Apache Cassandra®
limited: true
---

Learn how to discontinue the cross-cluster replication (CCR) for your Aiven for Apache Cassandra® service.

## About disabling CCR

When you enable CCR for your service, you connect it to another service,
which results in creating a CCR pair of services. You can disable CCR
for your service either by splitting the services constituting the CCR
pair or by deleting one of them.

-   [Aiven Console](https://console.aiven.io/)
-   CLI
-   API

It's recommended to use Aiven Console for disabling CCR.

:::warning
As soon as you split the cluster, the two services constituting the CCR
pair become independent. It's not possible to recreate the CCR pair
connecting back to the same service. To enable CCR on your service
again, you can create a service and CCR-connect it to your existing
service.
:::

## Prerequisites

-   Aiven account
-   Depending on the method you choose to use for disabling CCR
    -   Access to [Aiven Console](https://console.aiven.io/)
    -   `cURL` CLI tool
    -   [Aiven CLI tool](https://github.com/aiven/aiven-client)
-   CCR enabled on a pair of Aiven for Apache Cassandra services

## Disable CCR in the console

In the console, use either of the two following methods to disable CCR
on your services, split the services or delete one of them.

### Split the services

1.  Log in to [Aiven Console](https://console.aiven.io/).
2.  From the **Services** page, select the service for which you'd like
    to disable CCR.
3.  In the **Overview** page of the service, go to **Cross Cluster
    Replication** and select **Split cluster**.
4.  In the **Warning** popup, get familiar with the consequences of
    splitting the cluster, consider the impact, and
    select **Split cluster**.

You service no longer replicates to the other service since the services
have been disconnected.

### Delete a service

To disable CCR on your service, delete the service that is connected to
your services for CCR purposes.

1.  Log in to [Aiven Console](https://console.aiven.io/).

2.  From the **Services** page, select an Aiven for Apache Cassandra
    service on which you'd like to enable CCR.

3.  In the **Overview** page of the service, go to the **Cross
    Cluster Replication** section and select the name of the service
    provided in the CCR description, which is supposed to take you to
    the service's page.

4.  In the **Overview** page of the service, select **Delete service**
    from the meatballs menu in the top right corner.

    :::warning
    As soon as you delete the service where your data has been
    replicated, CCR gets disabled and your data is no longer replicated
    between regions.
    :::

5.  When in the **Delete confirmation** popup, consider
    the impact, copy-paste the service name, and select **Delete**.

You've disabled CCR on your service by deleting one of the peer
services in the CCR service pair.

## Disable CCR with CLI

You can disable CCR for your Aiven for Apache Cassandra service using
the Aiven CLI to delete one of the services constituting the CCR pair.

:::tip
See how to get started with the Aiven CLI in
[Aiven CLI](/docs/tools/cli).
:::

Use the
[avn service terminate](/docs/tools/cli/service-cli#avn-cli-service-terminate) command to disable CCR on your service by deleting the
service used as a sink for your replicated data.

```bash
avn service terminate --project PROJECT_NAME ccr_peer_service_name
```

## Disable CCR with API

You can disable CCR for your Aiven for Apache Cassandra services by
calling the
[ServiceDelete](https://api.aiven.io/doc/#tag/Service/operation/ServiceDelete)
endpoint to delete one of the services that constitute the CCR pair.

:::note
In this instruction, the `curl` command line tool is used to interact
with Aiven APIs.
:::

:::tip
See how to get started with Aiven APIs in [Aiven API](/docs/tools/api).
:::

To call the
[ServiceDelete](https://api.aiven.io/doc/#tag/Service/operation/ServiceDelete)
endpoint, specify the project name and the service name as path
parameters and provide your token as a header in the request.

```bash
curl --request DELETE \
   --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
   --header 'Authorization: Bearer YOUR_TOKEN'
```

## More on Apache Cassandra CCR

-   [About cross-cluster replication on Aiven for Apache Cassandra](/docs/products/cassandra/concepts/cross-cluster-replication)
-   [Enable CCR on Aiven for Apache Cassandra](/docs/products/cassandra/howto/enable-cross-cluster-replication)
-   [Manage CCR on Aiven for Apache Cassandra](/docs/products/cassandra/howto/manage-cross-cluster-replication)

## More on CCR with Aiven

-   [OpenSearch® cross-cluster replication](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
-   [Set up cross-cluster replication for OpenSearch](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
-   [Enabling cross-cluster replication for Apache Kafka® via
    Terraform](https://aiven.io/developer/kafka-mirrormaker-crosscluster).
