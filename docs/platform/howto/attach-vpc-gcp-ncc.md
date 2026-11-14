---
title: Attach VPCs to Google Cloud Network Connectivity Center
sidebar_label: Attach VPCs to GCP NCC
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Attach an Aiven VPC to your [Google Cloud Network Connectivity Center](https://cloud.google.com/network-connectivity/docs/network-connectivity-center) hub so that services in the VPC reach every spoke in your hub-and-spoke topology.

:::important
This feature is in <LimitedBadge/>.
:::

Network Connectivity Center (NCC) connects VPCs through a central hub. Each VPC joins the
hub as a spoke, and every spoke exchanges subnet routes with every other spoke. Services
in an Aiven VPC then reach all of your spokes, and workloads in any spoke reach your Aiven
services.

Use NCC when your services need to reach more than one of your networks. VPC Network
Peering is not transitive, so a peering to a single VPC does not carry routes to the
networks behind it.

## How the attachment works

The Aiven VPC lives in a Google Cloud project owned by Aiven, and your hub lives in your
own project. Creating the spoke is therefore split between you and Aiven:

1. You create the hub and allow spokes from the Aiven project.
1. Aiven creates a linked VPC spoke for the Aiven VPC on your hub. The spoke enters the
   `INACTIVE` state with the `PENDING_REVIEW` reason.
1. You accept the spoke on your hub. The spoke moves to the `ACTIVE` state and routes
   start propagating.

Aiven creates the spoke in the Google Cloud project that holds the Aiven VPC. Aiven never
creates a spoke in your project.

## Prerequisites

- [Manage project networking](/docs/platform/concepts/permissions#project-permissions)
  permissions in Aiven
- An [Aiven VPC](/docs/platform/howto/manage-project-vpc) hosted in Google Cloud
- A Google Cloud project with the Compute Engine API and the Network Connectivity API
  (`networkconnectivity.googleapis.com`) enabled
- The `networkconnectivity.hubs.admin` role, or equivalent permissions, on the project
  that holds your hub
- Tools:
  - [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
  - [Aiven Console](https://console.aiven.io/) or [Aiven CLI](/docs/tools/cli)

## Collect the required data

1. Find your Aiven VPC ID.

   Depending on the type of your Aiven VPC, select **Project VPC** or
   **Organization VPC**:

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

   The Aiven VPC ID is referred to as `VPC_ID`.

1. Note your Google Cloud project ID and the name you give your hub.

   These are referred to as `USER_PROJECT_ID` and `USER_HUB_NAME`.

## Create the hub

1. Set your project and create a hub with a mesh topology:

   ```bash
   gcloud config set project USER_PROJECT_ID

   gcloud network-connectivity hubs create USER_HUB_NAME \
     --description="Hub for Aiven services"              \
     --policy-mode=preset                                \
     --preset-topology=mesh
   ```

1. Attach your own workload VPCs to the hub as spokes, each in the project that holds
   the VPC:

   ```bash
   NCC_API="https://www.googleapis.com/networkconnectivity/v1"
   COMPUTE_API="https://www.googleapis.com/compute/v1"

   HUB="$NCC_API/projects/USER_PROJECT_ID/locations/global/hubs/USER_HUB_NAME"
   USER_VPC="$COMPUTE_API/projects/USER_PROJECT_ID/global/networks/USER_VPC_NAME"

   gcloud network-connectivity spokes linked-vpc-network create USER_SPOKE_NAME \
     --hub="$HUB"                                                              \
     --vpc-network="$USER_VPC"                                                 \
     --global
   ```

The hub URI that identifies this hub to Aiven has the following form:

```text
https://www.googleapis.com/networkconnectivity/v1/projects/USER_PROJECT_ID/locations/global/hubs/USER_HUB_NAME
```

The hub URI is referred to as `USER_HUB_URI`.

:::note
A hub with a mesh topology exchanges subnet routes between all of its spokes. Overlapping
subnet ranges between your spokes and the Aiven VPC prevent the spoke from becoming
active, so check your address plan before you attach the Aiven VPC.
:::

## Request the attachment

Send `USER_HUB_URI` and `VPC_ID` to Aiven to request the spoke. Aiven verifies that the
hub is yours and then creates a linked VPC spoke for the Aiven VPC, in the Google Cloud
project that holds the Aiven VPC.

When it completes, the spoke appears on your hub in the `INACTIVE` state with the
`PENDING_REVIEW` reason, waiting for you to accept it.

## Accept the spoke

1. List the spokes awaiting review on your hub:

   ```bash
   gcloud network-connectivity hubs list-spokes USER_HUB_NAME \
     --filter="reasons:PENDING_REVIEW"                        \
     --format=yaml
   ```

   Copy the `name` of the spoke that Aiven created. It has the form
   `projects/AIVEN_PROJECT_ID/locations/global/spokes/AIVEN_SPOKE_NAME` and is referred
   to as `AIVEN_SPOKE_URI`.

1. Accept the spoke:

   ```bash
   gcloud network-connectivity hubs accept-spoke USER_HUB_NAME \
     --spoke="AIVEN_SPOKE_URI"
   ```

Once accepted, the spoke moves to the `ACTIVE` state, and the hub starts exchanging subnet
routes between the Aiven VPC and your other spokes.

## Verify the attachment

1. Confirm that the spoke is active on your hub:

   ```bash
   gcloud network-connectivity hubs list-spokes USER_HUB_NAME --format=yaml
   ```

   The Aiven spoke reads `state: ACTIVE`.

1. Allow traffic from your spoke subnet ranges to the Aiven VPC subnet range:

   ```bash
   gcloud compute firewall-rules create USER_RULE_NAME \
     --network=USER_VPC_NAME                           \
     --allow=tcp,icmp                                  \
     --source-ranges=AIVEN_VPC_CIDR
   ```

1. Connect to a service in the Aiven VPC from a workload in one of your spokes.

:::note
The spoke resource lives in the Google Cloud project that holds the Aiven VPC, so
`gcloud network-connectivity spokes describe` against that project fails for you. Check
the spoke through your own hub with `hubs list-spokes`.
:::

:::important
Network Connectivity Center exchanges routes, it does not open firewall rules. To reach a
service in the Aiven VPC on its service port, add the
[VPC CIDR of your spokes to the allowed IP addresses](/docs/platform/howto/list-vpc-peering)
of that service, and allow the Aiven VPC range in your own firewall rules.
:::

## Detach the VPC

To remove the attachment, contact Aiven to delete the spoke. Rejecting the spoke on your
hub stops route exchange, but leaves the spoke resource in place.

Deleting the Aiven VPC also removes the spoke.

<RelatedPages/>

- [VPC peering in Aiven](/docs/platform/howto/list-vpc-peering)
- [Manage a project VPC peering with Google Cloud](/docs/platform/howto/vpc-peering-gcp)
- [Attach VPCs to AWS Transit Gateway](/docs/platform/howto/attach-vpc-aws-tgw)
- [Network Connectivity Center overview](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview)
