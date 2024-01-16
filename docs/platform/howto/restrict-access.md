---
title: Restrict network access to services
---

By default, Aiven services are publicly accessible, but you can restrict
access to your service to a single IP, an address block, or any
combination of both.

:::important
IP filters apply to publicly-accessible endpoints only.
:::

1.  Log in to [Aiven Console](https://console.aiven.io).

2.  On the **Services** page, select the service you want to restrict.

3.  On the **Overview** page of your service, select **Service
    settings** from the sidebar.

4.  On the **Service settings** page, navigate to the **Cloud and
    network** section and select **Set public IP filters** from the
    actions (**\...**) menu.

5.  In the **Allowed inbound IP addresses** window, enter your address
    or address block using the CIDR notation, and select the **+** icon
    to add it to the list of the trusted IP addresses.

    :::note
    You can add multiple addresses or address blocks or combination of
    both at once.
    :::

6.  Select **Close**.

:::note[Result]
Now your service can be accessed from the specified IP addresses only.
:::

:::note[Alternative method]
You can also use the
[dedicated service update function](/docs/tools/cli/service#avn-cli-service-update) to create or update the IP filter for your service via the
[Aiven CLI](/docs/tools/cli).
:::

:::note See also
For more ways of securing your service, check information on Virtual
Private Cloud (VPC) in
[Networking with VPC peering](/docs/platform/concepts/cloud-security#networking-with-vpc-peering) and
[Configure VPC peering](/docs/platform/howto/manage-vpc-peering#platform_howto_setup_vpc_peering).
:::
