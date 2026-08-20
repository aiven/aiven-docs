---
title: Use AWS PrivateLink with Aiven services
sidebar_label: Use AWS PrivateLink
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import AivenConsolePrivateLinkConfiguration from "@site/static/images/content/platform/howto/use-aws-privatelink_image2.png";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

AWS [PrivateLink](https://aws.amazon.com/privatelink/) brings Aiven services to the selected virtual private cloud (VPC) in your AWS account.

In a traditional setup that uses [VPC
peering](/docs/platform/howto/manage-project-vpc#create-a-project-vpc),
traffic is routed through an AWS VPC peering connection to your Aiven services.
With PrivateLink, you can create a VPC endpoint in your own VPC and access an
Aiven service from that. The VPC endpoint creates network interfaces (NIC) to
the subnets and availability zones that you choose and receives the private IP
addresses that belong to the IP range of your VPC. The VPC endpoint is routed to
your Aiven service located in one of Aiven's AWS accounts.

You can enable PrivateLink for Aiven services located in project VPC.
Before you can set up AWS PrivateLink,
[create a VPC](/docs/platform/howto/manage-project-vpc#create-a-project-vpc) and launch the services to connect to that
VPC. As there is no network routing between the VPC, you can use any
private IP range for the VPC, unless you also want to connect to the
project VPC using VPC peering connections. This means that overlaps in
the IP range are not an issue.

To set up AWS PrivateLink, use the
[Aiven CLI](/docs/tools/cli). You also
need [AWS Management Console](https://aws.amazon.com/console) or
[CLI](https://aws.amazon.com/cli) to create a VPC endpoint.

:::note
AWS PrivateLink is not supported for:

- Aiven for Apache Flink®
- Aiven for Apache Kafka® MirrorMaker 2
- Aiven for Metrics

:::

## Enable AWS PrivateLink

1.  Create an AWS PrivateLink resource on the Aiven service.

    The Amazon Resource Name (ARN) for the principals that are allowed
    to connect to the VPC endpoint service and the AWS network load
    balancer requires your Amazon account ID. In addition, you can set
    the access scope for an entire AWS account (`root`), a specific AWS
    user (for example, `user\john`), or a specific role. Only give permissions to
    roles that you trust, as an allowed role can connect from any VPC.

    Use the Aiven CLI to run the following command including your AWS
    account ID, the access scope, and the name of your Aiven service:

    ```bash
    avn service privatelink aws create --principal arn:aws:iam::$AWS_account_ID:$access_scope $Aiven_service_name
    ```

    For example:

    ```bash
    avn service privatelink aws create --principal arn:aws:iam::012345678901:user/john my-kafka
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
    aws ec2 --region eu-west-1 create-vpc-endpoint --vpc-endpoint-type Interface --vpc-id $your_aws_vpc_id --subnet-ids $space_separated_list_of_subnet_ids --security-group-ids $security_group_ids --service-name com.amazonaws.vpce.eu-west-1.vpce-svc-0b16e88f3b706aaf1
    ```

    Replace the following placeholders:

    - `--service-name` with the value shown either in
      the [Aiven Console](https://console.aiven.io) > **Service
      settings** page > **Cloud and network** section > <ConsoleLabel name="actions"/> > **Edit AWS PrivateLink** > **AWS service name**
      or as an output of:

      ```bash
      avn service privatelink aws get aiven_service_name
      ```

    - `--security-group-ids` with the IDs of the
      security groups to associate with the endpoint network interfaces.
      If this parameter is not specified, the default security group for
      the VPC is used.

    For fault tolerance, specify a subnet ID for
    each availability zone in the region. The security groups determine
    the instances that are allowed to connect to the endpoint network
    interfaces created by AWS into the specified subnets.

    Alternatively, create the VPC endpoint in [AWS
    Console](https://console.aws.amazon.com) under **VPC** >
    **Endpoints** > **Create endpoint**. See the [AWS
    documentation](https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html)
    for details.

    :::note
    For Aiven for Apache Kafka® services, the security group for the VPC
    endpoint must allow ingress in the port range `10000-31000` to
    accommodate the pool of Kafka broker ports used in our PrivateLink
    implementation. These are custom TCP ports not included
    by default rule type `All traffic`.

    It takes a while before the endpoint is ready to use as AWS
    provisions network interfaces to each of the subnets and connects
    them to the Aiven VPC endpoint service. Once the AWS endpoint state
    changes to `available`, the connection is visible in Aiven.
    :::

1.  If
    [your Aiven service is deployed using BYOC](/docs/platform/howto/byoc/aws-privatelink-byoc),
    run the
    [avn service privatelink aws refresh](/docs/tools/cli/service/privatelink#avn_service_privatelink_aws_refresh)
    command. Otherwise, skip this step.

    ```bash
    avn service privatelink aws refresh --project $project_name $byoc_service_name
    ```

    :::tip
    Check the deployment model of your service in the
    [Aiven Console](https://console.aiven.io/):
    Go to your service's <ConsoleLabel name="overview"/> page > **Network** >
    **Deployment model**.
    :::

1.  Enable PrivateLink access for Aiven service components:

    You can control each service component separately - for example, you
    can enable PrivateLink access for Kafka while allowing Kafka Connect
    to connect via VPC peering connections only.

    -   In the Aiven CLI, set
        `user_config.privatelink_access.<service component>` to `true`
        for the components to enable, for example:

        ```bash
        # For ClickHouse

        avn service update -c privatelink_access.clickhouse=true --project $project_name $Aiven_service_name
        ```

        ```bash
        # For PostgreSQL

        avn service update -c privatelink_access.pg=true --project $project_name $Aiven_service_name
        ```

        ```bash
        # For Kafka

        avn service update -c privatelink_access.kafka=true $Aiven_service_name
        avn service update -c privatelink_access.kafka_connect=true $Aiven_service_name
        avn service update -c privatelink_access.kafka_rest=true $Aiven_service_name
        avn service update -c privatelink_access.schema_registry=true $Aiven_service_name
        ```

    -   In [Aiven Console](https://console.aiven.io):

        1.  On the **Overview** page of your service, click **Service
            settings** from the sidebar.

        1.  On the **Service settings** page, go to the **Cloud
            and network** section and click
            <ConsoleLabel name="actions"/>  > **More network configurations** from the menu.

        1.  In the **Network configuration** window, click **Add
            configuration options**. In the search field, enter
            `privatelink_access`. From the displayed component names,
            select the names of the components to switch
            on.

            ![Aiven Console private link configuration](/images/content/platform/howto/use-aws-privatelink_image1.png)

        1.  Click the toggle switches for the selected components to
            switch them on. Click **Save configuration**.

    As a result, PrivateLink connection details are added to the **Connection information** section on the service
    <ConsoleLabel name="overview"/>.

    <img src={AivenConsolePrivateLinkConfiguration} className="image" alt="Screenshot of the configuration"/>

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
[`avn service privatelink aws connection list`](/docs/tools/cli/service/privatelink#avn_service_privatelink_aws_connection_list)
command.

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

    1.  Click your service from the **Services** page.
    1.  On the **Overview** page, click **Service settings** from the
        sidebar.
    1.  On the **Service settings** page, go to the **Cloud and
        network** section and click <ConsoleLabel name="actions"/> > **Edit AWS PrivateLink**.
    1.  In the **Edit AWS PrivateLink** window, enter the principals
        to include in the **Principal ARNs** field and
        click **Save**.

## Allow cross-region connections

AWS PrivateLink supports connections between different AWS regions. Use this
to let a VPC endpoint in another AWS region connect to your Aiven service's
PrivateLink endpoint service.

:::important
Cross-region connections for AWS PrivateLink are a <LimitedBadge/> feature.
Contact the [sales team](https://aiven.io/contact) to enable this for your
project.
:::

### Limitations

- Cross-region connections work only between regions in the same AWS
  [partition](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/partitions.html).
  For example, a standard AWS region can't connect to an AWS China region
  because they're in different partitions.
- Cross-region connections are supported only for AWS PrivateLink.
  [Azure Private Link](/docs/platform/howto/use-azure-privatelink) and
  [Google Private Service Connect](/docs/platform/howto/use-google-private-service-connect)
  don't support connections across regions.
- If your service is deployed with
  [bring your own cloud (BYOC)](/docs/platform/concepts/byoc), [set up the
  required permissions](/docs/platform/howto/byoc/aws-privatelink-byoc#set-up-permissions)
  before you enable cross-region connections.
- You can allow up to 16 additional regions for one PrivateLink connection.
- Creating endpoints in additional regions can add to your AWS costs. Check
  [AWS PrivateLink pricing](https://aws.amazon.com/privatelink/pricing/)
  before you enable additional regions.

### Set the allowed regions

Use the `supported_regions` parameter to set the additional AWS regions
where a VPC endpoint can connect to your PrivateLink endpoint service. Your
service's own AWS region is always included and can't be removed from this
list. This parameter isn't available in the Aiven CLI or the Aiven Console.

<Tabs groupId="cross-region-config">
<TabItem value="terraform" label="Terraform" default>

Add `supported_regions` to your `aiven_aws_privatelink` resource:

<TerraformSample filename='resources/aiven_aws_privatelink/resource.tf' />

</TabItem>
<TabItem value="api" label="API">

To set the allowed regions when you create a PrivateLink resource, call the
[ServicePrivatelinkAWSCreate](https://api.aiven.io/doc/#tag/Service/operation/ServicePrivatelinkAWSCreate)
endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT/service/SERVICE/privatelink/aws \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "principals": ["arn:aws:iam::012345678901:root"],
    "supported_regions": ["eu-west-2", "us-east-1"]
  }'
```

To update the allowed regions of an existing PrivateLink resource, call the
[ServicePrivatelinkAWSUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServicePrivatelinkAWSUpdate)
endpoint:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT/service/SERVICE/privatelink/aws \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "supported_regions": ["eu-west-2", "us-east-1"]
  }'
```

Replace the following:

- `PROJECT`: your project name.
- `SERVICE`: your service name.
- `BEARER_TOKEN`: your [Aiven authentication
  token](/docs/platform/concepts/authentication-tokens).

</TabItem>
</Tabs>

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

    1.  Click your service from the **Services** page.
    1.  On the **Overview** page, click **Service settings** from the
        sidebar.
    1.  On the **Service settings** page, go to the **Cloud and
        network** section and click <ConsoleLabel name="actions"/> > **Delete AWS PrivateLink**
        .
    1.  In the **Confirmation** window, click **Delete**.

This deletes the AWS load balancer and VPC service endpoint.

<RelatedPages/>

- [Use AWS PrivateLink with BYOC services](/docs/platform/howto/byoc/aws-privatelink-byoc)
- [Use Azure Private Link with Aiven services](/docs/platform/howto/use-azure-privatelink)
- [Use Google Private Service Connect with Aiven
  services](/docs/platform/howto/use-google-private-service-connect)
- [Manage project VPCs](/docs/platform/howto/manage-project-vpc)
