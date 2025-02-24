---
title: Manage a project VPC peering with AWS
sidebar_label: AWS peering
---

import CollectDataAws from "@site/static/includes/vpc/collect-data-aws.md";
import AcceptPeeringAws from "@site/static/includes/vpc/accept-peering-aws.md";
import DeletePjPeering from "@site/static/includes/vpc/delete-pj-peering.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a peering connection between your Aiven project VPC and an AWS VPC.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- Two VPCs to be peered: a
  [project VPC](/docs/platform/howto/manage-project-vpc)
- Access to the [AWS Management Console](https://console.aws.amazon.com)
- One of the following tools for operations on the Aiven Platform:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

## Create a peering connection

### Collect data from AWS

To
[create a peering connection in Aiven](/docs/platform/howto/vpc-peering-aws#create-a-peering-in-aiven),
first collect the required data from AWS:

<CollectDataAws/>

### Create a peering in Aiven

With the [data collected from AWS](/docs/platform/howto/vpc-peering-aws#collect-data-from-aws),
create a project VPC peering connection using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connections** section and click
   **Create peering request**.
1. In the **Create peering request** window:
   1. Enter the following:
      - **AWS account ID**
      - **AWS VPC region**
      - **AWS VPC ID**
   1. Click **Create**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the
[avn vpc peering-connection create](/docs/tools/cli/vpc#create-peering-connections)
command:

```bash
avn vpc peering-connection create       \
  --project-vpc-id AIVEN_PROJECT_VPC_ID \
  --peer-cloud-account AWS_ACCOUNT_ID   \
  --peer-vpc AWS_VPC_ID
```

Replace `AIVEN_PROJECT_VPC_ID`, `AWS_ACCOUNT_ID`, and `AWS_VPC_ID` as needed.

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[VpcPeeringConnectionCreate](https://api.aiven.io/doc/#tag/Project/operation/VpcPeeringConnectionCreate)
endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs/PROJECT_VPC_ID/peering-connections \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "peer_cloud_account":"AWS_ACCOUNT_ID",
      "peer_vpc":"AWS_VPC_ID"
    }
  '
```

Replace the following placeholders with meaningful data:

- `PROJECT_ID` (Aiven project name)
- `PROJECT_VPC_ID` (Aiven project VPC ID)
- `BEARER_TOKEN`
- `AWS_ACCOUNT_ID`
- `AWS_VPC_ID`

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Use the
[aiven_aws_vpc_peering_connection](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aws_vpc_peering_connection)
resource.

</TabItem>
</Tabs>

This adds a connection with the **Pending peer** status in the
[Aiven Console](https://console.aiven.io/) and a connection pending acceptance in
the [AWS Management Console](https://console.aws.amazon.com).

### Accept the peering request in AWS

<AcceptPeeringAws/>

## Delete the peering

<DeletePjPeering/>
