import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

1. Log in to the [AWS Management Console](https://console.aws.amazon.com), open the
   navigation menu, and select **All services**.
1. Find **Networking & Content Delivery**, and go to **VPC** > **Peering connections**.
1. Find your peering connection from Aiven pending acceptance, select it, and click
   **Actions** > **Accept request**.
1. Create or update your
   [AWS route tables](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-routing)
   to match your Aiven CIDR settings.

At this point, your peering connection status should be visible as **Active** both in the
[Aiven Console](https://console.aiven.io/) and in the
[AWS Management Console](https://console.aws.amazon.com).
