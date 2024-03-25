---
title: Set up VPC peering on AWS
---

import ActionsIcon from "@site/static/images/icons/more.svg";

Learn how to set up VPC peering on AWS.

## Prerequisites

Create a
[VPC on the Aiven platform](/docs/platform/howto/manage-vpc-peering).

## Set up VPC peering

1.  Open your AWS Console.

1.  Go to **My Account** and make note of your account ID.

1.  Go to the VPC service to find the VPC that you want to connect and
    copy the ID for that VPC.

1.  In [Aiven Console](https://console.aiven.io/), select **VPCs** from
    the sidebar on the **Services** page.

1.  On the **Virtual private clouds** page, select the VPC connection
    that you created.

1.  On the **VPC Peering connections** page, enter your AWS account ID
    and VPC ID, select the region for your AWS VPC, and select **Add
    peering connection**.

    :::note
    A new connection with the **Pending Acceptance** status
    is added in your AWS Console.
    :::

1.  In your AWS Console, check that the account ID and VPC ID match
    those listed in the [Aiven Console](https://console.aiven.io/) and,
    if so, click <ActionsIcon className="icon"/> **Actions** > **Accept Request**.

1.  Update [your AWS route
    tables](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-routing.html)
    to match your Aiven CIDR settings.

When you accept the request in AWS Console, the peering connection gets
activated in the [Aiven Console](https://console.aiven.io/).
