---
title: Enable cross-cluster replication in Aiven for Apache Cassandra®
---

:::important
Aiven for Apache Cassandra® cross-cluster replication (CCR) is a
[limited availability feature](/docs/platform/concepts/beta_services). If you're interested in trying out this feature, contact
the sales team at [sales@aiven.io](mailto:sales@aiven.io).
:::

Enabling the cross-cluster replication (CCR) feature requires building a
CCR setup in the Aiven platform and, next, configuring the replication
on the Apache Cassandra side. This article covers the first part only by
providing instructions on how to set up CCR for your Aiven for Apache
Cassandra® service on the Aiven side.

For the other part (the configuration of the replication factor on the
Apache Cassandra side), which ultimately makes the replication work, see
the instruction in
[Set up the replication factor](/docs/products/cassandra/howto/manage-cross-cluster-replication#set-up-replication-factor).

## About enabling CCR

You can enable CCR either when creating a new Aiven for Apache Cassandra
service or for an existing service.

### Limitations

See [CCR limitations](/docs/products/cassandra/concepts/cross-cluster-replication#ccr-limitations)
for limitations that apply to CCR on Aiven for Apache Cassandra.

### Tools

To enable CCR, you can use the following tools:

-   [Aiven Console](https://console.aiven.io/)
-   CLI
-   API

## Prerequisites

-   Aiven account
-   Depending on the method you choose to use for enabling CCR
    -   Access to [Aiven Console](https://console.aiven.io/)
    -   `cURL` CLI tool
    -   [Aiven CLI tool](https://github.com/aiven/aiven-client)
-   See [Limitations](/docs/products/cassandra/concepts/cross-cluster-replication#ccr-limitations).

## Enable CCR in the console

Using [Aiven Console](https://console.aiven.io/), you can enable CCR for

-   New Aiven for Apache Cassandra service by
    [creating a totally new CCR service pair](/docs/products/cassandra/howto/enable-cross-cluster-replication#new-pair) or
-   Existing Aiven for Apache Cassandra service by
    [adding a CCR peer service in another region to an existing service](/docs/products/cassandra/howto/enable-cross-cluster-replication#new-peer).

### Create a new CCR service pair {#new-pair}

1.  Log in to [Aiven Console](https://console.aiven.io/).
2.  From the **Services** page, select **+Create service**.
3.  In the **Create service** view
    1.  Select Apache Cassandra® and, next, a cloud provider and a cloud
        region for your service.
    2.  To activate CCR, select the **Enable Cross Cluster Replication**
        toggle, which unfolds an additional section for setting up
        another Apache Cassandra service.
    3.  Select a cloud provider and a cloud region for the second
        service.
    4.  Select one service plan for your two new services.
    5.  Optionally, add an additional disk storage for your services.
    6.  Enter names for your services.

:::note[Datacenters names]
Notice that the service names you enter are automatically copied as the
names for datacenters for the services. The datacenters names can be
required when executing statements on your databases.
:::

4.  Verify your choices in the **Services summary** card on the right
    and, if your configuration turns out as expected, select **+Create
    services** if the setting looks.

You\'ve created two new services that are connected for CCR purposes.
You can preview CCR details for your services by selecting **Overview**
from the sidebar and going to the **Cross Cluster replication** section.

### Add a CCR peer to an existing service {#new-peer}

1.  Log in to [Aiven Console](https://console.aiven.io/).

2.  From the **Services** page, select an Aiven for Apache Cassandra
    service on which you'd like to enable CCR.

3.  In the **Overview** page of your service, navigate to the **Cross
    Cluster Replication** section and select **Migrate to Cross
    Cluster**.

    :::note
    When you enable CCR on a particular service, you create another
    service with the same plan, number of nodes, and disk storage.
    :::

4.  In the **Create a Cross Cluster Replica** view

    1.  Select a cloud provider and a cloud region, define a name for
        your new service, and select **Continue**.
    2.  Examine the **Service Summary** section and make sure the
        configuration for your new service meets your expectations. If
        so, select **Create Cross Cluster Replica**.

CCR has been enabled by connecting your service to another new service,
which is now visible in the **Overview** page in the **Cross Cluster
replication** section.

## Enable CCR with CLI

Using CLI, you can enable CCR for

-   New Aiven for Apache Cassandra service by
    [creating a totally new CCR service pair](/docs/products/cassandra/howto/enable-cross-cluster-replication#new-ccr-service-pair) or
-   Existing Aiven for Apache Cassandra service by
    [adding a CCR peer service in another region to an existing service](/docs/products/cassandra/howto/enable-cross-cluster-replication#new-ccr-peer-service).

:::note
In this instruction, the
[Aiven CLI client](/docs/tools/cli) is
used to interact with Aiven APIs.
:::

:::note[Understand parameters to be supplied]
-   `service_to_join_with` parameter value needs to be set to a name of
    an existing service in the same project. The supplied service name
    indicates the service you connect to for enabling CCR. The two
    connected services create a CCR service pair.
-   `cassandra.datacenter` is a datacenter name used to identify nodes
    from a particular service in the cluster's topology. In CCR for
    Aiven for Apache Cassandra, all nodes of either of the two services
    belong to a single datacenter; therefore, a value of the
    `cassandra.datacenter` parameter needs to be unique for each
    service. It's recommended to set it equal to the service name.
:::

### Create a new CCR service pair {#new-ccr-service-pair}

1.  Use the
    [avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) command to create a new service (`service_1`).

    ``` bash
    avn service create                                   \
       --project project_name                            \
       --service-type cassandra                          \
       --cloud cloud_region_name                         \
       --plan service_plan_name                          \
       -c cassandra.datacenter=datacenter_1_name         \
       service_1_name
    ```

2.  Create another new service (`service_2`). This time, include the
    `service_to_join_with` parameter to connect it to `service_1` and
    create a CCR pair. Set the value of the `service_to_join_with`
    parameter to the name of `service_1`.

    :::important
    See [Limitations](/docs/products/cassandra/concepts/cross-cluster-replication#ccr-limitations)
    before you set the parameters.
    :::

    ``` bash
    avn service create                                   \
       --project project_name                            \
       --service-type cassandra                          \
       --cloud cloud_region_name                         \
       --plan service_plan_name                          \
       -c cassandra.datacenter=datacenter_2_name         \
       -c service_to_join_with=service_1_name            \
       service_2_name
    ```

### Add a CCR peer to an existing service {#new-ccr-peer-service}

Use the [avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) command to create a new service with CCR enabled. Use the
`service_to_join_with` parameter to connect your new service to an
existing service creating a CCR pair. Set the value of the
`service_to_join_with` parameter to the name of the existing service.

:::important
See [Limitations](/docs/products/cassandra/concepts/cross-cluster-replication#ccr-limitations) before
you set the parameters.
:::

``` bash
avn service create                                   \
   --project project_name                            \
   --service-type cassandra                          \
   --cloud cloud_region_name                         \
   --plan service_plan_name                          \
   -c cassandra.datacenter=datacenter_name           \
   -c service_to_join_with=existing_service_name     \
   new_service_name
```

## Enable CCR with API

Using [Aiven APIs](/docs/tools/api), you
can enable CCR for

-   New Aiven for Apache Cassandra service by
    [creating a totally new CCR service pair](/docs/products/cassandra/howto/enable-cross-cluster-replication#new-ccr-pair) or
-   Existing Aiven for Apache Cassandra service by
    [adding a CCR peer service in another region to an existing service](/docs/products/cassandra/howto/enable-cross-cluster-replication#new-ccr-peer).

:::note
In this instruction, the `curl` command line tool is used to interact
with Aiven APIs.
:::

:::note[Understand parameters to be supplied]
-   `service_to_join_with` parameter value needs to be set to a name of
    an existing service in the same project. The supplied service name
    indicates the service you connect to for enabling CCR. The two
    connected services create a CCR service pair.
-   `cassandra.datacenter` is a datacenter name used to identify nodes
    from a particular service in the cluster's topology. In CCR for
    Aiven for Apache Cassandra, all nodes of either of the two services
    belong to a single datacenter; therefore, a value of the
    `cassandra.datacenter` parameter needs to be unique for each
    service. It's recommended to set it equal to the service name.
:::

### Create a new CCR service pair {#new-ccr-pair}

Use the
[ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
API to create a new service with CCR enabled. When constructing the API
request, add the `user_config` object to the request body and nest
inside it the `service_to_join_with` and `datacenter` fields.

1.  Use the
    [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
    API to create a new service (`service_1`).

    ``` bash
    curl --request POST                                                   \
       --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service    \
       --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
       --header 'content-type: application/json'                          \
       --data
          '{
             "cloud": "string",
             "plan": "string",
             "service_name": "service_1_name",
             "service_type": "cassandra"
          }'
    ```

2.  Create another new service (`service_2`). This time when
    constructing the API request, add the `user_config` object to the
    request body and nest inside it the `service_to_join_with` and
    `datacenter` fields. Set the value of the `service_to_join_with`
    parameter to the name of `service_1` to connect both services and
    create a CCR pair.

    :::important
    See [Limitations](/docs/products/cassandra/concepts/cross-cluster-replication#ccr-limitations)
    before you set the parameters.
    :::

    ``` bash
    curl --request POST                                                   \
       --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service    \
       --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
       --header 'content-type: application/json'                          \
       --data
          '{
             "cloud": "string",
             "plan": "string",
             "service_name": "service_2_name",
             "service_type": "cassandra",
             "user_config": {
                "cassandra": {
                   "datacenter": "datacenter_name"
                },
                "service_to_join_with": "service_1_name"
             }
          }'
    ```

### Add a CCR peer to an existing service {#new-ccr-peer}

Use the
[ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
API to create a new service with CCR enabled. When constructing the API
request, add the `user_config` object to the request body and nest
inside it the `service_to_join_with` and `datacenter` fields. Set the
value of the `service_to_join_with` parameter to the name of your
existing service to connect it to your new service and create a CCR
pair.

:::important
See [Limitations](/docs/products/cassandra/concepts/cross-cluster-replication#ccr-limitations) before
you set the parameters.
:::

``` bash
curl --request POST                                                   \
   --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service    \
   --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
   --header 'content-type: application/json'                          \
   --data
      '{
         "cloud": "string",
         "plan": "string",
         "service_name": "new_service_name",
         "service_type": "cassandra",
         "user_config": {
            "cassandra": {
               "datacenter": "datacenter_name"
            },
            "service_to_join_with": "existing_service_name"
         }
      }'
```

## What's next

-   [Manage CCR on Aiven for Apache Cassandra](/docs/products/cassandra/howto/manage-cross-cluster-replication)
-   [Disable CCR on Aiven for Apache Cassandra](/docs/products/cassandra/howto/disable-cross-cluster-replication)

## Related pages

-   [About cross-cluster replication on Aiven for Apache Cassandra](/docs/products/cassandra/concepts/cross-cluster-replication)
-   [Multi-master Replication: Versioned Data and Tunable
    Consistency](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html#multi-master-replication-versioned-data-and-tunable-consistency)
-   [OpenSearch® cross-cluster replication](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
-   [Set up cross-cluster replication for OpenSearch](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
-   [Cross-cluster replication for Apache Kafka® with
    Terraform](https://aiven.io/developer/kafka-mirrormaker-crosscluster)
