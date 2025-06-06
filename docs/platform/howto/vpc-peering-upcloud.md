---
title: Manage a project VPC peering with UpCloud
sidebar_label: UpCloud peering
---

import RelatedPages from "@site/src/components/RelatedPages"
import CollectDataUpcloud from "@site/static/includes/vpc/collect-data-upcloud.md";
import AcceptPeeringUpcloud from "@site/static/includes/vpc/accept-peering-upcloud.md";
import DeletePjPeering from "@site/static/includes/vpc/delete-pj-peering.md";
import RenewLeaseUpcloud from "@site/static/includes/vpc/renew-lease-upcloud.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a peering connection between your Aiven project VPC and an UpCloud SDN network.

Establishing a peering connection between an Aiven VPC and an UpCloud SDN network requires
creating the peering both from the VPC in Aiven and from the SDN network in UpCloud.

- Setting up the peering from Aiven to UpCloud in the
  [Aiven Console](https://console.aiven.io/) requires the UpCloud SDN network UUID.
  To find it, you can use either the [UpCloud Control Panel](https://hub.upcloud.com/)
  or the [UpCloud API](https://developers.upcloud.com/1.3/).
- Setting up the peering from UpCloud to Aiven is possible either in the
  [UpCloud Control Panel](https://hub.upcloud.com/) or through the
  [UpCloud API](https://developers.upcloud.com/1.3/).

## Limitations

-   Peering connections are only supported between networks of type
    `private`.
-   You cannot initiate a peering between two networks with overlapping
    CIDR ranges.
-   The networks to be peered need to be in the same cloud zone.

:::important
Make sure you only create peerings between accounts, platforms, or
networks you trust. There is no limit on what traffic can flow between
the peered components. The server firewall has no effect on `private`
type networks.
:::

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions
- Two networks to be peered: a
  [project VPC](/docs/platform/howto/manage-project-vpc)
  in Aiven and an SDN network in your UpCloud account
- Either access to the [UpCloud Control Panel](https://hub.upcloud.com/) or the
  [UpCloud API](https://developers.upcloud.com/1.3/)
- One of the following tools for operations on the Aiven Platform:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Create a peering connection

### Collect data from UpCloud

To
[create a peering connection in Aiven](/docs/platform/howto/vpc-peering-upcloud#create-the-peering-in-aiven),
first collect the required data from UpCloud using either the
[UpCloud Control Panel](https://hub.upcloud.com/) or the
[UpCloud API](https://developers.upcloud.com/1.3/):

<CollectDataUpcloud/>

### Create the peering in Aiven

With the
[data collected from UpCloud](/docs/platform/howto/vpc-peering-upcloud#collect-data-from-upcloud),
create an organization VPC peering connection using a tool of your choice:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your project page.
1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
1. On the **Virtual private clouds** page, select a project VPC to peer.
1. On the **VPC details** page, go to the **VPC peering connections** section and click
   **Create peering request**.
1. In the **Create peering request** window:
   1. Enter your UpCloud SDN network UUID in the **UpCloud Network UUID** field.
   1. Click **Create**.

      This adds a connection with the **Pending peer** status in the
      [Aiven Console](https://console.aiven.io/).

1. While still on the **VPC details** page, make a note of the **ID** of your Aiven VPC.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the
[avn vpc peering-connection create](/docs/tools/cli/vpc#create-peering-connections)
command:

```bash
avn vpc peering-connection create              \
  --project-vpc-id AIVEN_PROJECT_VPC_ID        \
  --peer-cloud-account upcloud                 \
  --peer-vpc UPCLOUD_SDN_NETWORK_UUID
```

Replace `AIVEN_PROJECT_VPC_ID` and `UPCLOUD_SDN_NETWORK_UUID` as needed.

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
      "peer_cloud_account":"upcloud",
      "peer_vpc":"UPCLOUD_SDN_NETWORK_UUID"
    }
  '
```

Replace the following placeholders with meaningful data:

- `PROJECT_ID` (Aiven project name)
- `PROJECT_VPC_ID` (Aiven project VPC ID)
- `BEARER_TOKEN`
- `UPCLOUD_SDN_NETWORK_UUID`

</TabItem>
</Tabs>

### Create the peering in UpCloud

Use the Aiven VPC network ID
[collected in the Aiven Console](/docs/platform/howto/vpc-peering-upcloud#create-the-peering-in-aiven)
to create the VPC peering connection in UpCloud either in the
[UpCloud Control Panel](https://hub.upcloud.com/) or through the
[UpCloud API](https://developers.upcloud.com/1.3/):

<AcceptPeeringUpcloud/>

## Renew a DHCP lease

<RenewLeaseUpcloud/>

## Delete the peering

<DeletePjPeering/>

<RelatedPages/>

-   [Manage Virtual Private Cloud (VPC) peering](/docs/platform/howto/manage-project-vpc)
-   [Set up Virtual Private Cloud (VPC) peering on AWS](/docs/platform/howto/vpc-peering-aws)
-   [Set up Virtual Private Cloud (VPC) peering on Google Cloud Platform (GCP)](/docs/platform/howto/vpc-peering-gcp)
-   [Set up Azure virtual network peering](/docs/platform/howto/vnet-peering-azure)
