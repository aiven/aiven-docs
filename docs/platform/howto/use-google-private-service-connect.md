---
title: Use Google Private Service Connect with Aiven services
early: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enable Google Private Service Connect and use it with your Aiven-managed services.

:::important

- Google Private Service Connect is not supported for
[BYOC](/docs/platform/concepts/byoc)-hosted services.
- To activate Google Private Service Connect for Aiven for PostgreSQL®,
  [contact us](https://aiven.io/contact?department=1306714).

:::

Private Service Connect lets you bring your Aiven services into your
networks (virtual private clouds) over a private endpoint. The endpoint
receives a private IP address from a range that you assign. Next,
connectivity over the private endpoint is routed to your Aiven service.

:::note
For consistency, Google Private Service Connect is called *privatelink*
in Aiven tools. This applies to all clouds, including Google Cloud.
:::

## Prerequisites

- Google Private Service Connect is an
  [early availability](/docs/platform/concepts/service-and-feature-releases#early-availability-)
  feature.
- Your Aiven service needs to be hosted in
  [a project virtual private cloud (VPC)](/docs/platform/howto/manage-project-vpc) in the
  region where the connecting endpoint will be created.
- [Aiven CLI](/docs/tools/cli)
- Access to the [Google Cloud console](https://console.cloud.google.com/)
- Access to the [Aiven Console](https://console.aiven.io/)

:::note
Private Service Connect endpoints are service specific. For each service to connect to,
create a separate endpoint.
:::

## Set up a Private Service Connect connection

### Step 1: Enable Private Service Connect for an Aiven service

Using the Aiven CLI, enable a Private Service Connect for your Aiven
service:

```bash
avn service privatelink google create SERVICE_NAME
```

:::important
For publishing a service over Private Service Connect, a dedicated
address range needs to be allocated at the publishing / Aiven end. Aiven
reserves network 172.24.0.0/16 for this purpose and forbids creating
project VPCs in Google Cloud overlapping with this range.
:::

Creating a privatelink usually takes a minute or two. You can use the following command to
see the current state:

```bash
avn service privatelink google get SERVICE_NAME
```

When the state has changed from `creating` to `active`, resources at
Aiven end have been allocated, and it's possible to create connections.

When the privatelink has been successfully created, you can expect an
output similar to the following:

```text
GOOGLE_SERVICE_ATTACHMENT                                                             STATE
====================================================================================  ======
projects/aivenprod/regions/europe-west1/serviceAttachments/privatelink-s3fd836dfc60   active
```

The `GOOGLE_SERVICE_ATTACHMENT` value is used to connect an endpoint on the client side to
the Aiven service.

### Step 2: Create a connection in Google Cloud

Create a Private Service Connect endpoint and connection to your Aiven service:

1.  Go to the [Google Cloud console](https://console.cloud.google.com/net-services/psc/addConsumer)
    (**Networking** > **Network services** > **Private Service Connect** > **CONNECT ENDPOINT**).
1.  Select **Published service** as **Target**, and enter the `GOOGLE_SERVICE_ATTACHMENT`
    value into the **Target service** field.
1.  Specify the endpoint name.
1.  Select an existing subnet hosting your side of the endpoint.
1.  Click **ADD ENDPOINT**.

After the endpoint is created, initially it's status is `pending`. To allow connections via
the endpoint, it needs to be accepted at the service publisher (Aiven) end.

:::tip
If you use an automatically assigned IP address, note the IP address associated with the
endpoint to use it later.
:::

### Step 3: Approve the connection in Aiven

1.  Update the state of Private Service Connect connections for your
    Aiven service by running:

    ```bash
    avn service privatelink google refresh SERVICE_NAME
    ```

1.  Retry the following command until it returns the
    `pending-user-approval` status:

    ```bash
    avn service privatelink google connection list SERVICE_NAME
    ```

    ```text
    PRIVATELINK_CONNECTION_ID  PSC_CONNECTION_ID  STATE                  USER_IP_ADDRESS
    =========================  =================  =====================  ===============
    plc3fd852bec98             12870921937223780  pending-user-approval  null
    ```

    :::note
    -   `PSC_CONNECTION_ID` comes from Google Cloud and can help you verify that the
        connection matches your Private Service Connect endpoint.
    -   `PRIVATELINK_CONNECTION_ID` comes from Aiven, and you need it for the final
        connection approval.
    :::

1.  To enable the connection, approve it.

    :::note
    By approving the connection, you provide the IP address assigned to your Private
    Service Connect endpoint - whether automatically assigned or static. Aiven uses this
    IP address for pointing the service DNS records necessary for the clients to reach the
    Aiven service through the Private Service Connect connection.
    :::

    Run the following approval command:

    ```bash
    avn service privatelink google connection approve SERVICE_NAME \
      --privatelink-connection-id PRIVATELINK_CONNECTION_ID        \
      --user-ip-address PSC_ENDPOINT_IP_ADDRESS
    ```

    The connection initially transitions to the `user-approved` state:

    ```bash
    avn service privatelink google connection list SERVICE_NAME
    ```

    ```text
    PRIVATELINK_CONNECTION_ID  PSC_CONNECTION_ID  STATE          USER_IP_ADDRESS
    =========================  =================  =============  ===============
    plc3fd852bec98             12870921937223780  user-approved  10.0.0.100
    ```

1.  You may need to run the `avn service privatelink google refresh` command at this point
    since updates to service attachment accept lists are not immediately reflected in the
    states of returned connected endpoints:

    ```bash
    avn service privatelink google refresh SERVICE_NAME
    ```

    After establishing the connection and populating DNS records, the
    connection appears as `active`:

    ```bash
    avn service privatelink google connection list SERVICE_NAME
    ```

    ```text
    PRIVATELINK_CONNECTION_ID  PSC_CONNECTION_ID  STATE   USER_IP_ADDRESS
    =========================  =================  ======  ===============
    plc3fd852bec98             12870921937223780  active  10.0.0.100
    ```

The state of your Private Service Connect endpoint in Google Cloud should have transitioned
from `pending` to `accepted` at this point. Private Service Connect connectivity has been
established now.

### Step 4: Enable the access for service components

Allow connectivity to your Aiven services using the Private Service Connect endpoint.

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
In the [Aiven Console](https://console.aiven.io/):

1.  On the <ConsoleLabel name="overview"/> page of your service, click
    <ConsoleLabel name="service settings"/> in the sidebar.
1.  Go to the **Cloud and network** section, and click <ConsoleLabel name="actions"/> >
    **More network configurations**.
1.  In the **Network configuration** window:
    1.  Select **Add configuration options**.
    1.  In the search field, enter `privatelink_access`.
    1.  From the displayed component names, select the names of the components to enable
        (`privatelink_access.SERVICE_COMPONENT`).
    1.  Select the toggle switches for the selected components to enable them.
    1.  Select **Save configuration**.

</TabItem>
<TabItem value="2" label="CLI">
In the [Aiven CLI](/docs/tools/cli), set `user_config.privatelink_access.SERVICE_COMPONENT`
to `true` for the components to enable. Take the following command as an example for Aiven
for Apache Kafka®:

```bash
avn service update -c privatelink_access.kafka=true SERVICE_NAME
```

</TabItem>
</Tabs>

:::tip
Each service component can be controlled separately. For example, you can enable Private
Service Connect access for your Aiven for Apache Kafka service while allowing Aiven for
Apache Kafka Connect to only be connected via VPC peering.
:::

## Acquire connection information

### One Private Service Connect connection

If you have one private endpoint connected to your Aiven service, preview the connection
information (URI, hostname, or port required to access the service through the
private endpoint) in the [Aiven Console](https://console.aiven.io/):

1. Go to your Aiven project, and click <ConsoleLabel name="Services"/> in the sidebar.
1. Open your service's <ConsoleLabel name="overview"/> page, and go to the
   **Connection information** section.
1. Switch to the `privatelink` access route to preview values for `host` and `port`, which
   differ from those for the `dynamic` access route used by default to connect to the service.

### Multiple Private Service Connect connections

Use the [Aiven CLI](/docs/tools/cli) to acquire connection information for more than one
Private Service Connect connection.

Each endpoint (connection) has `PRIVATELINK_CONNECTION_ID`, which you can check using the
[avn service privatelink google connection list SERVICE_NAME](/docs/tools/cli/service/privatelink)
command.

To acquire connection information for your service component using Private Service Connect,
run the [avn service connection-info](/docs/tools/cli/service/connection-info) command.

- Get SSL connection information for your service component using Private Service Connect:

  ```bash
  avn service connection-info UTILITY_NAME SERVICE_NAME -p PRIVATELINK_CONNECTION_ID
  ```

  Where:

  -   `UTILITY_NAME` is `kcat`, for example
  -   `SERVICE_NAME` is `kafka-12a3b4c5`, for example
  -   `PRIVATELINK_CONNECTION_ID` is `plc39413abcdef`, for example

- Get SASL connection information for Aiven for Apache Kafka service components using
  Private Service Connect:

  ```bash
  avn service connection-info UTILITY_NAME SERVICE_NAME -p PRIVATELINK_CONNECTION_ID -a sasl
  ```

  Where:

  -   `UTILITY_NAME` is `kcat`, for example
  -   `SERVICE_NAME` is `kafka-12a3b4c5`, for example
  -   `PRIVATELINK_CONNECTION_ID` is `plc39413abcdef`, for example

:::note
SSL certificates and SASL credentials are the same for all the connections.
:::

## Delete a Private Service Connect connection

Use the [Aiven CLI](/docs/tools/cli) to delete the Private Service Connect connection for
your Aiven service:

```bash
avn service privatelink google delete SERVICE_NAME
```
