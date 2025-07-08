---
title: Manage project virtual private clouds (VPCs) in Aiven
sidebar_label: Manage project VPCs
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import CreateService from "@site/static/includes/create-service-console.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up or delete a project-wide VPC in your Aiven organization.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- One of the following tools for operating project VPCs:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

## Create a project VPC

Create a project VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1.  Log in to [Aiven Console](https://console.aiven.io/), go to your project page, and
    click <ConsoleLabel name="vpcs"/> in the sidebar.

1.  On the **Virtual private clouds** page, click **Create VPC**.

1.  In the **Create VPC** window:

    1. Select a cloud provider and region.

    1. Enter the IP range.
       Use an IP range that does not overlap with any networks that you
       want to connect via VPC peering.

       For example, if your own
       networks use the range `11.1.1.0/8`, you can set
       the range for your Aiven project's VPC to
       `191.161.1.0/24`.

       :::note
       Network prefix length must be between 20 and 24 inclusive.
       :::

1.  Click **Create VPC**.

The state of the VPC is shown in the table.

</TabItem>
<TabItem value="cli" label="Aiven CLI">
Run the
[avn vpc create](/docs/tools/cli/vpc#create-vpcs)
command:

```bash
avn vpc create                  \
  --cloud CLOUD_PROVIDER_REGION \
  --network-cidr NETWORK_CIDR   \
  --project PROJECT_NAME
```

Replace the following:

- `CLOUD_PROVIDER_REGION` with the cloud provider and region to host the VPC, for example
  `aws-eu-west-1`
- `NETWORK_CIDR` with the CIDR block (a range of IP addresses) for the VPC, for example,
  `10.0.0.0/24`
- `PROJECT_NAME` with the name of your Aiven project where to create the VPC

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[VpcCreate](https://api.aiven.io/doc/#tag/Project/operation/VpcCreate) endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "cloud_name": "CLOUD_PROVIDER_REGION",
      "network_cidr": "NETWORK_CIDR"
    }
  '
```

Replace `PROJECT_ID`, `BEARER_TOKEN`, `CLOUD_PROVIDER_REGION`, and `NETWORK_CIDR` with
meaningful data.

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Use the
[aiven_project_vpc](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project_vpc)
resource.
</TabItem>
</Tabs>

## Delete a project VPC

:::important
Remove all services from your VCP before you delete it. To remove the services from the VCP,
either migrate them out of the VCP or delete them. Deleting the VPC terminates its peering
connections, if any.
:::

Delete a project VPC using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/), and go to your project.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, find a VPC to be deleted and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="delete"/>.
1. In the **Confirmation** window, click **Delete VPC**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the [avn vpc delete](/docs/tools/cli/vpc#delete-vpcs) command:

```bash
avn vpc delete                    \
  --project-vpc-id PROJECT_VPC_ID
```

Replace `PROJECT_VPC_ID` with the ID of your Aiven project VPC, for example,
`12345678-1a2b-3c4d-5f6g-1a2b3c4d5e6f`.

</TabItem>
<TabItem value="api" label="Aiven API">

Make an API call to the
[VpcDelete](https://api.aiven.io/doc/#tag/Project/operation/VpcDelete) endpoint:

```bash
curl --request DELETE \
  --url https://api.aiven.io/v1/project/PROJECT_ID/vpcs/PROJECT_VPC_ID \
  --header 'Authorization: Bearer BEARER_TOKEN' \
```

Replace the following placeholders with meaningful data:

- `PROJECT_ID` (Aiven project name)
- `PROJECT_VPC_ID` (Aiven project VPC ID)
- `BEARER_TOKEN`

</TabItem>
</Tabs>
