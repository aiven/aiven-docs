---
title: Attach VPCs to AWS Transit Gateway
sidebar_label: Attach VPCs to AWS TGW
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[AWS Transit Gateway (TGW)](https://aws.amazon.com/transit-gateway/) enables transitive routing from on-premises networks through VPN and from other VPC.

By creating a Transit Gateway VPC attachment, services in an Aiven VPC can route traffic
to all other networks attached, directly or indirectly, to the Transit Gateway.

## Prerequisites

- AWS Transit Gateway
- Aiven VPC in the same region as your Transit Gateway
- Tools
  - [Aiven Console](https://console.aiven.io/)
  - [AWS Management Console](https://console.aws.amazon.com)
  - [Aiven CLI](/docs/tools/cli)
  - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

## Prepare for an attachment

1. Find your AWS account ID and AWS Transit Gateway ID, for example, in the
   [AWS Management Console](https://console.aws.amazon.com).

   The AWS account ID and the AWS Transit Gateway ID will be referred to as
   `USER_ACCOUNT_ID` and `USER_TGW_ID`, respectively.

1. Share the TGW with the Aiven AWS account using one of the following:

   - [AWS Resource Access Manager](https://console.aws.amazon.com/ram/home)
     in [AWS Management Console](https://console.aws.amazon.com)
   - [AWS CLI](https://aws.amazon.com/cli/) command
     [`create-resource-share`](https://docs.aws.amazon.com/cli/latest/reference/ram/create-resource-share)

   :::important

   - Add the Transit Gateway as a shared resource.
   - Add Aiven AWS account ID `675999398324` as a principal.
   :::

1. Find your Aiven VPC ID using either the [Aiven Console](https://console.aiven.io/) or
   the [Aiven CLI](/docs/tools/cli).

   Depending on the type of your Aiven VPC, select **Project VPC** or **Organization VPC**:

   <Tabs groupId="group1">
   <TabItem value="pj-vpc" label="Project VPC" default>
    - In the [Aiven CLI](/docs/tools/cli), run the [avn vpc list](/docs/tools/cli/vpc)
      command.
    - In the [Aiven Console](https://console.aiven.io/):
      1. Go to your organization, and open your project's page.
      1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
      1. On the **Virtual private clouds** page, select your project VPC.
      1. On the **VPC details** page, go to the **Overview** section, and copy **ID**.
   </TabItem>
   <TabItem value="org-vpc" label="Organization VPC">
    - In the [Aiven CLI](/docs/tools/cli), run the
      [avn organization vpc list](/docs/tools/cli/vpc) command.
    - In the [Aiven Console](https://console.aiven.io/):
      1. Go to your organization, and click **Admin** in the top navigation bar.
      1. Click <ConsoleLabel name="vpcs"/> in the sidebar.
      1. On the **Virtual private clouds** page, select your organization VPC.
      1. On the **VPC details** page, go to the **Overview** section, and copy **ID**.
   </TabItem>
   </Tabs>

   The Aiven VPC ID will be referred to as `VPC_ID`.

1. If your Aiven VPC is an [organization VPC](/docs/platform/concepts/vpcs#vpc-types),
   find your organization ID. Otherwise, skip this step.

   [Find your organization ID in the Aiven Console](/docs/platform/reference/get-resource-IDs#get-an-organization-id)
   or retrieve your organization ID from the output of the `avn organization list` command.

   The organization ID, if applicable, will be referred to as `ORG_ID`.

1. Determine the IP ranges to route from the VPC to the AWS Transit Gateway.

   :::note
   A Transit Gateway has a route table of its own and, by default, routes traffic to each
   attached network (directly to an attached VPC or indirectly through VPN attachments).
   Attached route tables of the VPC need to be updated to include the TGW as a target for
   any IP range (CIDR) to be routed using the VPC attachment.
   :::

   The IP ranges will be referred to as `USER_PEER_NETWORK_CIDR`.

## Request the attachment

### Send the connection request

To create the Transit Gateway - VPC attachment, make a request to the Aiven API for a
peering connection.

:::note
In the request, you can use the `--user-peer-network-cidr` argument multiple times to
define more than one peer network CIDR. You can also create the attachment without a CIDR,
but you would need to add it later to make your attachment operational.
:::

Depending on the type of your Aiven VPC, select **Project VPC** or **Organization VPC**,
and run the provided commands, replacing placeholders with meaningful values.

   <Tabs groupId="group1">
   <TabItem value="pj-vpc" label="Project VPC" default>
```bash
avn vpc peering-connection create       \
  --project-vpc-id VPC_ID               \
  --peer-cloud-account USER_ACCOUNT_ID  \
  --peer-vpc USER_TGW_ID                \
  --user-peer-network-cidr USER_PEER_NETWORK_CIDR
```
   </TabItem>
   <TabItem value="org-vpc" label="Organization VPC">
```bash
avn organization vpc peering-connection create \
  --organization-id ORG_ID                     \
  --organization-vpc-id VPC_ID                 \
  --peer-cloud-account USER_ACCOUNT_ID         \
  --peer-vpc USER_TGW_ID                       \
  --user-peer-network-cidr USER_PEER_NETWORK_CIDR
```
   </TabItem>
   </Tabs>

Once submitted, the request gets the `APPROVED` status, and the Aiven Platform starts
building the connection by creating the AWS Transit Gateway VPC attachment, which can take
a few minutes. Once the connection is built, the status changes to `PENDING_PEER`.

### Check the connection status

To check the status of your peering connection request, select either **Project VPC** or
**Organization VPC**, depending on your Aiven VPC type, and run the provided commands,
replacing placeholders with meaningful values.

   <Tabs groupId="group1">
   <TabItem value="pj-vpc" label="Project VPC" default>
```bash
avn vpc peering-connection get         \
  --project-vpc-id VPC_ID              \
  --peer-cloud-account USER_ACCOUNT_ID \
  --peer-vpc USER_TGW_ID -v
```
   </TabItem>
   <TabItem value="org-vpc" label="Organization VPC">
```bash
avn organization vpc get   \
  --organization-id ORG_ID \
  --organization-vpc-id VPC_ID
```

   </TabItem>
   </Tabs>

The status that allows you to move on to accepting the attachment is `PENDING_PEER`.

## Accept the attachment

Once the status is `PENDING_PEER`, accept the attachment in your AWS account.

1. Log in to the [AWS Management Console](https://console.aws.amazon.com), and go to
   [Transit gateway attachments](https://console.aws.amazon.com/vpc/home#TransitGatewayAttachments).
1. In the **Transit gateway attachments** list, find and select your pending attachment.
1. Click **Actions** > **Accept request**.

The Aiven Platform monitors the attachment until it is accepted. Once it detects that the
request is accepted, the status changes to `ACTIVE`. This indicates that your attachment
is operational, the VPC route table is updated to route `USER_PEER_NETWORK_CIDR` to the
Transit Gateway, and service nodes in the VPC have open firewall access to those networks.

<RelatedPages/>

[AWS VPC peering connections](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering)
