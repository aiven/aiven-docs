---
title: Manage organization VPC peering with Google Cloud
sidebar_label: Google Cloud peering
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import CollectDataGoogle from "@site/static/includes/vpc/collect-data-google.md"
import AcceptPeeringGoogle from "@site/static/includes/vpc/accept-peering-google.md"
import DeleteOrgPeering from "@site/static/includes/vpc/delete-org-peering.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a peering connection between your Aiven organization VPC and a Google Cloud VPC.

Establishing a peering connection between an Aiven VPC and a Google Cloud VPC requires
creating the peering both from the VPC in Aiven and from the VPC in Google Cloud.

## Prerequisites

- [Manage organization networking](/docs/platform/concepts/permissions#organization-permissions)
  permissions
- Two VPCs to be peered: an
  [organization VPC](/docs/platform/howto/manage-organization-vpc#create-an-organization-vpc)
  in Aiven and a VPC in your Google Cloud account
- Access to the [Google Cloud console](https://console.cloud.google.com/)
- One of the following tools for operations on the Aiven Platform:
  - [Aiven Console](https://console.aiven.io/)
    <!-- [Aiven CLI](/docs/tools/cli) -->
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)

## Create a peering connection

### Collect data from Google Cloud

To [create a peering in Aiven](/docs/platform/howto/manage-org-vpc-peering-google#create-the-peering-in-aiven),
first collect required data from Google Cloud:

<CollectDataGoogle/>

### Create the peering in Aiven

With the
[data collected from Google Cloud](/docs/platform/howto/manage-org-vpc-peering-google#collect-data-from-google-cloud),
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
      - **GCP project ID**
      - **GCP VPC network name**
   1. Click **Create**.

      This adds a connection with the **Pending peer** status in the
      [Aiven Console](https://console.aiven.io/).
1. While still on the **VPC details** page, make a note of the **ID** of your Aiven VPC.
1. Click <ConsoleLabel name="service settings"/> in the sidebar, and make a note of your
   **Project name** in the **Project settings** section.

</TabItem>
<!--
<TabItem value="cli" label="Aiven CLI">

Run the `avn organization vpc peering-connection create` command:

```bash
avn organization vpc peering-connection create \
  --organization-id AIVEN_ORGANIZATION_ID      \
  --project-vpc-id AIVEN_ORGANIZATION_VPC_ID   \
  --peer-cloud-account GOOGLE_CLOUD_PROJECT_ID \
  --peer-vpc GOOGLE_CLOUD_VPC_NETWORK_NAME
```

Replace `AIVEN_ORGANIZATION_ID`, `AIVEN_ORGANIZATION_VPC_ID`, `GOOGLE_CLOUD_PROJECT_ID`,
and `GOOGLE_CLOUD_VPC_NETWORK_NAME` as needed.

</TabItem>
-->
<TabItem value="api" label="Aiven API">

Make an API call to the `OrganizationVpcPeeringConnectionCreate` endpoint:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/vpcs/ORGANIZATION_VPC_ID/peering-connections \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '
    {
      "peer_cloud_account":"GOOGLE_CLOUD_PROJECT_ID",
      "peer_vpc":"GOOGLE_CLOUD_VPC_NETWORK_NAME"
    }
  '
```

Replace the following placeholders with meaningful data:

- `ORGANIZATION_ID`
- `ORGANIZATION_VPC_ID`
- `BEARER_TOKEN`
- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_CLOUD_VPC_NETWORK_NAME`

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Use the
[aiven_gcp_organization_vpc_peering_connection](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/gcp_organization_vpc_peering_connection)
resource.
</TabItem>
</Tabs>

### Create the peering in Google Cloud

Use the
[data collected in the Aiven Console](/docs/platform/howto/manage-org-vpc-peering-google#create-the-peering-in-aiven)
to create the VPC peering connection in Google Cloud:

<AcceptPeeringGoogle/>

## Set up multiple organization VPC peerings

To peer multiple Google Cloud VPC networks to your Aiven-managed organization VPC,
[add peering connections](/docs/platform/howto/manage-org-vpc-peering-google#create-a-peering-connection)
one by one in the [Aiven Console](https://console.aiven.io).

For the limit on the number of VPC peering connections allowed to a single VPC network,
see the [Google Cloud documentation](https://cloud.google.com/vpc/docs/quota).

## Delete the peering

<DeleteOrgPeering/>
