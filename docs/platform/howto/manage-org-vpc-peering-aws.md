---
title: Manage an organization VPC peering with AWS
sidebar_label: AWS peering
---

import CollectDataAws from "@site/static/includes/vpc/collect-data-aws.md";
import AcceptPeeringAws from "@site/static/includes/vpc/accept-peering-aws.md";
import DeleteOrgPeering from "@site/static/includes/vpc/delete-org-peering.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a peering connection between your Aiven organization VPC and an AWS VPC.

Before you start, review the
[VPC peering limitations](/docs/platform/howto/list-vpc-peering#limitations).

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions
- Two VPCs to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and a VPC in your AWS account
- Access to the [AWS Management Console](https://console.aws.amazon.com)
- One of the following tools for operations on the Aiven Platform:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

## Create a peering connection

### Collect data from AWS

To
[create a peering connection in Aiven](/docs/platform/howto/manage-org-vpc-peering-aws#create-a-peering-in-aiven),
first collect the required data from AWS:

<CollectDataAws/>

### Create a peering in Aiven

With the [data collected from AWS](/docs/platform/howto/manage-org-vpc-peering-aws#collect-data-from-aws),
create an organization VPC peering connection using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and click **Admin** in the
   top navigation bar.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select an organization VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connections** section and
   click **Create peering request**.
1. In the **Create peering request** window:
   1. Enter the following:
      - **AWS account ID**
      - **AWS VPC region**
      - **AWS VPC ID**
   1. Click **Create**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the `avn organization vpc peering-connection create` command:

```bash
avn organization vpc peering-connection create    \
  --organization-id AIVEN_ORGANIZATION_ID         \
  --organization-vpc-id AIVEN_ORGANIZATION_VPC_ID \
  --peer-cloud-account AWS_ACCOUNT_ID             \
  --peer-vpc AWS_VPC_ID                           \
  --peer-region AWS_VPC_REGION
```

Replace `AIVEN_ORGANIZATION_ID`, `AIVEN_ORGANIZATION_VPC_ID`, `AWS_ACCOUNT_ID`, and
`AWS_VPC_ID` as needed. Set `AWS_VPC_REGION` to the region of your AWS VPC, for example
`aws-us-east-2`. You can omit `--peer-region` when your AWS VPC is in the same region as
your Aiven organization VPC.

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[OrganizationVpcPeeringConnectionCreate](https://api.aiven.io/doc/#tag/Organization_Vpc/operation/OrganizationVpcPeeringConnectionCreate)
endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpc/ORGANIZATION_VPC_ID/peering-connections \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "peer_cloud_account":"AWS_ACCOUNT_ID",
      "peer_vpc":"AWS_VPC_ID",
      "peer_region":"AWS_VPC_REGION"
    }
  '
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`
- `ORGANIZATION_VPC_ID`
- `BEARER_TOKEN`
- `AWS_ACCOUNT_ID`
- `AWS_VPC_ID`
- `AWS_VPC_REGION`: the region of your AWS VPC, for example `aws-us-east-2`. Omit
  `peer_region` when your AWS VPC is in the same region as your Aiven organization VPC.

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">

Use the
[aiven_aws_org_vpc_peering_connection](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/aws_org_vpc_peering_connection)
resource:

<TerraformSample filename='resources/aiven_aws_org_vpc_peering_connection/resource.tf' />

</TabItem>
</Tabs>

This adds a connection with the **Pending peer** status in the
[Aiven Console](https://console.aiven.io/) and a connection pending acceptance in
the [AWS Management Console](https://console.aws.amazon.com).

### Accept the peering request in AWS

<AcceptPeeringAws/>

## Delete the peering

<DeleteOrgPeering/>

<RelatedPages/>

- [Manage organization VPCs](/docs/platform/howto/manage-organization-vpc)
- [Set up an organization VPC peering](/docs/platform/howto/list-organization-vpc-peering)
- [VPC peering in Aiven](/docs/platform/howto/list-vpc-peering)
- [Manage project VPCs](/docs/platform/howto/manage-project-vpc)
