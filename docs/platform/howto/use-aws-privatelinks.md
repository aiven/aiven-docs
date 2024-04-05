---
title: Use AWS PrivateLink with Aiven services
---

AWS [PrivateLink](https://aws.amazon.com/privatelink/) brings Aiven
services to the selected virtual private cloud (VPC) in your AWS
account. In a traditional setup that uses
[VPC peering](/docs/platform/howto/manage-vpc-peering#platform_howto_setup_vpc_peering), traffic is routed through an AWS VPC peering connection to
your Aiven services. With PrivateLink, you can create a VPC endpoint in
your own VPC and access an Aiven service from that. The VPC endpoint
creates network interfaces (NIC) to the subnets and availability zones
that you choose and receives the private IP addresses that belong to the
IP range of your VPC. The VPC endpoint is routed to your Aiven service
located in one of Aiven's AWS accounts.

You can enable PrivateLink for Aiven services located in project VPC.
Before you can set up AWS PrivateLink,
[create a VPC](/docs/platform/howto/manage-vpc-peering#platform_howto_setup_vpc_peering) and launch the services that you want to connect to that
VPC. As there is no network routing between the VPC, you can use any
private IP range for the VPC, unless you also want to connect to the
project VPC using VPC peering connections. This means that overlaps in
the IP range are not an issue.

To set up AWS PrivateLink, use the
[Aiven CLI](/docs/tools/cli). You also
need the AWS console or CLI to create a VPC endpoint.

**Note:** Aiven for Apache Cassandra® and Aiven for M3 services do not
currently support AWS PrivateLink.

1.  Create an AWS PrivateLink resource on the Aiven service.

    The Amazon Resource Name (ARN) for the principals that are allowed
    to connect to the VPC endpoint service and the AWS network load
    balancer requires your Amazon account ID. In addition, you can set
    the access scope for an entire AWS account, a given user account, or
    a given role. Only give permissions to roles that you trust, as an
    allowed role can connect from any VPC.

    Use the Aiven CLI to run the following command including your AWS
    account ID, the access scope, and the name of your Aiven service:

    ```bash
    avn service privatelink aws create --principal arn:aws:iam::$AWS_account_ID:$access_scope $Aiven_service_name
    ```

    For example:

    ```bash
    avn service privatelink aws create --principal arn:aws:iam::012345678901:user/mwf my-kafka
    ```

    This creates an AWS network load balancer dedicated to your Aiven
    service and attaches it to an AWS VPC endpoint service that you can
    later use to connect to your account's VPC endpoint.

    The PrivateLink resource stays in the initial `creating` state for
    up to a few minutes while the load balancer is being launched. After
    the load balancer and VPC endpoint service have been created, the
    state changes to `active` and the `aws_service_id` and
    `aws_service_name` values are set.

1.  In the AWS CLI, run the following command to create a VPC endpoint:

    ```bash
    aws ec2 --region eu-west-1 create-vpc-endpoint --vpc-endpoint-type Interface --vpc-id $your_vpc_id --subnet-ids $space_separated_list_of_subnet_ids --security-group-ids $security_group_ids --service-name com.amazonaws.vpce.eu-west-1.vpce-svc-0b16e88f3b706aaf1
    ```

    Replace the `--service-name` value with the value shown either in
    the [Aiven Console](https://console.aiven.io) > **Service
    settings** page > **Cloud and network** section > actions
    (**...**) menu > **Edit AWS PrivateLink** > **AWS service name**
    or as an output of the following Aiven CLI command:

    ```bash
    avn service privatelink aws get aws_service_name
    ```

    Note that for fault tolerance, you should specify a subnet ID for
    each availability zone in the region. The security groups determine
    the instances that are allowed to connect to the endpoint network
    interfaces created by AWS into the specified subnets.

    Alternatively, you can create the VPC endpoint in [AWS
    Console](https://console.aws.amazon.com) under **VPC** >
    **Endpoints** > **Create endpoint** . See the [AWS
    documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint)
    for details.

    :::note
    For Aiven for Apache Kafka® services, the security group for the VPC
    endpoint must allow ingress in the port range `10000-31000` to
    accommodate the pool of Kafka broker ports used in our PrivateLink
    implementation.

    It takes a while before the endpoint is ready to use as AWS
    provisions network interfaces to each of the subnets and connects
    them to the Aiven VPC endpoint service. Once the AWS endpoint state
    changes to `available` , the connection is visible in Aiven.
    :::

1.  Enable PrivateLink access for Aiven service components:

    You can control each service component separately - for example, you
    can enable PrivateLink access for Kafka while allowing Kafka Connect
    to connect via VPC peering connections only.

    -   In the Aiven CLI, set
        `user_config.privatelink_access.<service component>` to `true`
        for the components that you want to enable. For example:

        ```bash
        avn service update -c privatelink_access.kafka=true $Aiven_service_name
        avn service update -c privatelink_access.kafka_connect=true $Aiven_service_name
        avn service update -c privatelink_access.kafka_rest=true $Aiven_service_name
        avn service update -c privatelink_access.schema_registry=true $Aiven_service_name
        ```

    -   In [Aiven Console](https://console.aiven.io):

        1.  On the **Overview** page of your service, select **Service
            settings** from the sidebar.

        1.  On the **Service settings** page, navigate to the **Cloud
            and network** section and select **More network
            configurations** from the actions (**...**) menu.

        1.  In the **Network configuration** window, select **Add
            configuration options**. In the search field, enter
            `privatelink_access`. From the displayed component names,
            select the names of the components that you want to switch
            on.

            ![Aiven Console private link configuration](/images/content/platform/howto/use-aws-privatelink_image1.png)

        1.  Select the toggle switches for the selected components to
            switch them on. Select **Save configuration**.

    It takes a couple of minutes before connectivity is available after
    you enable a service component. This is because AWS requires an AWS
    load balancer behind each VPC endpoint service, and the target rules
    on the load balancer for the service nodes need at least two
    successful heartbeats before they transition from the `initial`
    state to `healthy` and are included in the active forwarding rules
    of the load balancer.

## Acquire connection information {#h_b6605132ff}

### One AWS PrivateLink connection

If you have one private endpoint connected to your Aiven service, you
can preview the connection information (URI, hostname, or port required
to access the service through the private endpoint) in [Aiven
Console](https://console.aiven.io) > the service's **Overview** page > the **Connection information** section, where you'll also find the
switch for the `privatelink` access route. `privatelink`-access-route
values for `host` and `port` differ from those for the `dynamic` access
route used by default to connect to the service.

:::note
You can use the same credentials with any access route.
:::

### Multiple AWS PrivateLink connections

Use CLI to acquire connection information for more than one AWS
PrivateLink connection.

Each endpoint (connection) has a `PRIVATELINK_CONNECTION_ID`, which you can
check using the
[avn service privatelink AWS connection list SERVICE_NAME](/docs/tools/cli/service/privatelink) command.

To acquire connection information for your service component using AWS
PrivateLink, run the
[avn service connection-info](/docs/tools/cli/service/connection-info) command.

-   For SSL connection information for your service component using AWS
    PrivateLink, run the following command:

    ```bash
    avn service connection-info UTILITY_NAME SERVICE_NAME --privatelink-connection-id PRIVATELINK_CONNECTION_ID
    ```

Where:

-   UTILITY_NAME for Aiven for Apache Kafka®, for example, can be
    `kcat`.
-   SERVICE_NAME for Aiven for Apache Kafka®, for example, can be
    `kafka-12a3b4c5`.
-   PRIVATELINK_CONNECTION_ID can be `plc39413abcdef`.

-   For SASL connection information for Aiven for Apache Kafka® service
    components using AWS PrivateLink, run the following command:

    ```bash
    avn service connection-info UTILITY_NAME SERVICE_NAME --privatelink-connection-id PRIVATELINK_CONNECTION_ID -a sasl
    ```

Where:

-   UTILITY_NAME for Aiven for Apache Kafka®, for example, can be
    `kcat`.
-   SERVICE_NAME for Aiven for Apache Kafka®, for example, can be
    `kafka-12a3b4c5`.
-   PRIVATELINK_CONNECTION_ID can be `plc39413abcdef`.

:::note
SSL certificates and SASL credentials are the same for all the
connections. You can use the same credentials with any access route.
:::

## Update the allowed principals list {#h_2a1689a687}

To change the list of AWS accounts or IAM users or roles that are
allowed to connect a VPC endpoint:

-   Use the `update` command of the Aiven CLI:

    ```bash
    avn service privatelink aws update --principal arn:aws:iam::$AWS_account_ID:$access_scope $Aiven_service_name
    ```

    :::note
    When you add an entry, also include the `--principal` arguments for
    existing entries.
    :::

-   In [Aiven Console](https://console.aiven.io):

    1.  Select your service from the **Services** page.
    1.  On the **Overview** page, select **Service settings** from the
        sidebar.
    1.  On the **Service settings** page, navigate to the **Cloud and
        network** section and select **Edit AWS PrivateLink** from the
        actions (**...**) menu.
    1.  In the **Edit AWS PrivateLink** window, enter the principals
        that you want to include in the **Principal ARNs** field and
        select **Save** .

## Deleting a privatelink connection {#h_8de68d5894}

-   Using the Aiven CLI, run the following command:

    ```bash
    avn service privatelink aws delete $Aiven_service_name
    ```

    ```text
    AWS_SERVICE_ID             AWS_SERVICE_NAME                                        PRINCIPALS                         STATE
    ========================== ======================================================= ================================== ========
    vpce-svc-0b16e88f3b706aaf1 com.amazonaws.vpce.eu-west-1.vpce-svc-0b16e88f3b
    ```

-   Using [Aiven Console](https://console.aiven.io):

    1.  Select your service from the **Services** page.
    1.  On the **Overview** page, select **Service settings** from the
        sidebar.
    1.  On the **Service settings** page, navigate to the **Cloud and
        network** section and select **Delete AWS PrivateLink** from the
        actions (**...**) menu.
    1.  In the **Confirmation** window, select **Delete** .

This deletes the AWS load balancer and VPC service endpoint.
