import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

1. Log in to the [AWS Management Console](https://console.aws.amazon.com), and go to the
   VPC service (**All services** > **Networking & Content Delivery** > **VPC**).
1. Click **Peering connections** in the sidebar.
1. Find and select the peering request from Aiven, and  click **Actions** > **Accept request**.
1. Create or update your [AWS route
    tables](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-routing) to match
    your Aiven CIDR settings.

When you accept the request in your AWS account, the peering connection gets
activated in the [Aiven Console](https://console.aiven.io/).
