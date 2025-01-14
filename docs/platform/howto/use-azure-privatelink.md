---
title: Use Azure Private Link with Aiven services
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Azure Private Link lets you bring your Aiven services into your virtual network (VNet) over a private endpoint. The endpoint creates a network interface into one of the VNet subnets, and receives a private IP address from its IP range. The private endpoint is routed to your Aiven service.

Azure Private Link is supported for the following services:

- Aiven for Apache Kafka®
- Aiven for Apache Kafka Connect®
- Aiven for ClickHouse®
- Aiven for Grafana®
- Aiven for InfluxDB®
- Aiven for Metrics
- Aiven for MySQL®
- Aiven for OpenSearch®
- Aiven for PostgreSQL®
- Aiven for Caching

## Prerequisites

- This feature is in [early availability](/docs/platform/concepts/beta_services#early-availability-).

- [Aiven CLI](/docs/tools/cli) is
  installed.

- The Aiven service is in
  [a project VPC](/docs/platform/howto/manage-vpc-peering). This ensures the service is not accessible from the
  public internet.

  :::note
  If you are not using regular VNet peerings, any private IP range can
  be used for the VPC. There is no network routing between your Azure
  subscription and the Aiven VPC, so overlapping IP ranges are not an
  issue.
  :::

- The Aiven service is using
  [static IP addresses](/docs/platform/concepts/static-ips).

  :::note
  Even though services in a VPC only communicate using private IP
  addresses, Azure load balancers require [standard SKU IP
  addresses](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-upgrade-portal)
  for target virtual machines. Azure sends TCP health probes to load
  balancer target ports from a public IP address.
  :::

## Variables

| Variable          | Description                |
| ----------------- | -------------------------- |
| `SUBSCRIPTION_ID` | Azure subscription ID      |
| `AIVEN_SERVICE`   | Name of your Aiven service |

## Set up a Private Link connection

There are three steps to setting up an Azure Private Link with your
Aiven service:

1.  Create a Private Link service
1.  Create a private endpoint
1.  Enable Private Link access service components

### Step 1: Create a Private Link service

1.  In the Aiven CLI, create a Private Link resource on your Aiven
    service:

    ```shell
    avn service privatelink azure create AIVEN_SERVICE --user-subscription-id SUBSCRIPTION_ID
    ```

    This creates an [Azure Standard Internal Load
    Balancer](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview)
    dedicated to your Aiven service and attaches it to an Azure Private
    Link service. Connections from other subscriptions are automatically
    rejected.

1.  Check the status of the Private Link service:

    ```shell
    avn service privatelink azure get AIVEN_SERVICE
    ```

    The service is in the `creating` state until Azure provisions a load
    balancer and Private Link service.

1.  When the state changes to `active`, note the `azure_service_alias`
    and `azure_service_id`:

    ```shell
    avn service privatelink azure get AIVEN_SERVICE
    ```

### Step 2: Create a private endpoint

Azure resources in the Aiven service are now ready to be connected to
your Azure subscription and virtual network.

1.  In the Azure web console or Azure CLI, [create a private
    endpoint](https://learn.microsoft.com/en-us/azure/private-link/create-private-endpoint-portal?tabs=dynamic-ip).
    If you are using the console, select **Connect to an Azure resource
    by resource ID or alias** and enter the `azure_service_alias` or
    `azure_service_id`.

1.  Refresh the Aiven Private Link service:

    ```shell
    avn service privatelink azure refresh AIVEN_SERVICE
    ```

    :::note
    Azure does not provide notifications about endpoint connections and
    the Aiven API will not be aware of new endpoints until it's
    refreshed.
    :::

1.  In the Aiven CLI, check that the endpoint is connected to the
    service:

    ```shell
    avn service privatelink azure connection list AIVEN_SERVICE
    ```

    The output will look similar to this:

    ```text
    PRIVATELINK_CONNECTION_ID  PRIVATE_ENDPOINT_ID                                                                                                                                         STATE                  USER_IP_ADDRESS
    =========================  ==========================================================================================================================================================  =====================  ===============
    plc35843e8051.             /subscriptions/8eefec94-5d63-40c9-983c-03ab083b411d/resourceGroups/test-privatelink/providers/Microsoft.Network/privateEndpoints/my-endpoint                pending-user-approval  null
    ```

1.  Check that the endpoint ID matches the one created in your
    subscription and approve it:

    ```shell
    avn service privatelink azure connection approve AIVEN_SERVICE PRIVATELINK_CONNECTION_ID
    ```

    The endpoint in your Azure subscription is now connected to the
    Private Link service in the Aiven service. The state of the endpoint
    is `pending`.

1.  In the Azure web console, go to the private endpoint and select
    **Network interface**. Copy the private IP address.

1.  In the Aiven CLI, add the endpoint's IP address you copied to the
    connection:

    ```shell
    avn service privatelink azure connection update \
       --endpoint-ip-address IP_ADDRESS             \
       AIVEN_SERVICE PRIVATELINK_CONNECTION_ID
    ```

Once the endpoint IP address is added, the connection's status changes
to `active`. A DNS name for the service is registered pointing to that
IP address.

### Step 3: Enable Private Link access for Aiven service components

Enable Private Link access on your Aiven services using either
the Aiven CLI or [Aiven Console](https://console.aiven.io/).

<Tabs groupId="group1">
<TabItem value="cli" label="Aiven CLI" default>

To enable Private Link access for your service in the Aiven CLI, set
`user_config.privatelink_access.<service component>` to true for the
components to enable. For example, for PostgreSQL the command
is:

```shell
avn service update -c privatelink_access.pg=true AIVEN_SERVICE
```

</TabItem>
<TabItem value="Console" label="Console">

To enable Private Link access in [Aiven
Console](https://console.aiven.io/):

1.  On the **Overview** page of your service, select **Service
    settings** from the sidebar.
1.  On the **Service settings** page, in the **Cloud and
    network** section, click <ConsoleLabel name="actions" /> > **More network configurations**.
1.  In the **Network configuration** window, take the following actions:
    1.  Select **Add configuration options**.
    1.  In the search field, enter `privatelink_access`.
    1.  From the displayed component names, select the names of the
        components to enable
        (`privatelink_access.<service component>`).
    1.  Enable the required components.
    1.  Select **Save configuration**.

:::tip
Each service component can be controlled separately. For example, you
can enable Private Link access for your Aiven for Apache Kafka® service,
while allowing Kafka® Connect to only be connected via VNet peering.
:::

After toggling the values, your Private Link resource will be rebuilt
with load balancer rules added for the service component's ports.

:::note
For Aiven for Apache Kafka® services, the security group for the VPC
endpoint must allow ingress in the port range `10000-31000`. This is to
accommodate the pool of Kafka broker ports used in the Private Link
implementation.
:::

</TabItem>
</Tabs>

## Acquire connection information

### One Azure Private Link connection

If you have one private endpoint connected to your Aiven service, you
can preview the connection information (URI, hostname, or port required
to access the service through the private endpoint) in [Aiven
Console](https://console.aiven.io/) > the service's **Overview** page >
the **Connection information** section, where you'll also find the
switch for the `privatelink` access route. `privatelink`-access-route
values for `host` and `port` differ from those for the `dynamic` access
route used by default to connect to the service.

### Multiple Azure Private Link connections

Use CLI to acquire connection information for more than one AWS
PrivateLink connection.

Each endpoint (connection) has PRIVATELINK_CONNECTION_ID, which you can
check using the
[avn service privatelink azure connection list SERVICE_NAME](/docs/tools/cli/service/privatelink)
command.

To acquire connection information for your service component using Azure
Private Link, run the
[avn service connection-info](/docs/tools/cli/service/connection-info) command.

- For SSL connection information for your service component using
  Azure Private Link, run the following command:

  ```bash
  avn service connection-info UTILITY_NAME SERVICE_NAME -p PRIVATELINK_CONNECTION_ID
  ```

    Where:

    - UTILITY_NAME is `kcat`, for example
    - SERVICE_NAME is `kafka-12a3b4c5`, for example
    - PRIVATELINK_CONNECTION_ID is `plc39413abcdef`, for example

- For SASL connection information for Aiven for Apache Kafka® service
  components using Azure Private Link, run the following command:

  ```bash
  avn service connection-info UTILITY_NAME SERVICE_NAME -p PRIVATELINK_CONNECTION_ID -a sasl
  ```

    Where:

    - UTILITY_NAME is `kcat`, for example
    - SERVICE_NAME is `kafka-12a3b4c5`, for example
    - PRIVATELINK_CONNECTION_ID is `plc39413abcdef`, for example

:::note
SSL certificates and SASL credentials are the same for all the connections.
:::

## Update subscription list

In the Aiven CLI, you can update the list of Azure subscriptions that
have access to Aiven service endpoints:

```shell
avn service privatelink azure update AIVEN_SERVICE --user-subscription-id SUBSCRIPTION_ID
```

To update a few subscription IDs, repeat the `SUBSCRIPTION_ID` argument, for example:

```shell
avn service privatelink azure update AIVEN_SERVICE --user-subscription-id SUBSCRIPTION_ID_1 --user-subscription-id SUBSCRIPTION_ID_2
```

## Delete a Private Link service

Use the Aiven CLI to delete the Azure Load Balancer and Private Link
service:

```shell
avn service privatelink azure delete AIVEN_SERVICE
```
