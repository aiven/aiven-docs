---
title: Restrict network access to services
sidebar_label: Restrict access
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

By default, Aiven services are publicly accessible, but you can restrict access to your service to a single IP, an address block, or any combination of both.

:::important
IP filters apply to inbound traffic coming from specified IP addresses / network ranges to
Aiven service ports.
:::

:::tip
To access a non-publicly-accessible service from another service, use a
[service integration](/docs/platform/concepts/service-integration).
:::

## Restrict access

1. Log in to [Aiven Console](https://console.aiven.io).

1. On the **Services** page, select the service to restrict.

1. On the **Overview** page of your service, select **Service
    settings** from the sidebar.

1. On the **Service settings** page, in the **Cloud and
   network** section, click <ConsoleLabel name="actions"/> > **Set public IP filters**.

1. In the **Allowed inbound IP addresses** window, enter your address
   or address block using the CIDR notation, and select the **+** icon
   to add it to the list of the trusted IP addresses.

   :::note
   You can add multiple addresses or address blocks or combination of
   both at once.
   :::

1. Select **Close**.

Now your service can be accessed from the specified IP addresses only.

:::note[Alternative method]
You can also use the
[dedicated service update function](/docs/tools/cli/service-cli#avn-cli-service-update) to
create or update the IP filter for your service via the [Aiven CLI](/docs/tools/cli).
:::

## Related pages

For more ways of securing your service, see:

- [Networking with VPC peering](/docs/platform/concepts/cloud-security#networking-with-vpc-peering)
- [Configure VPC peering](/docs/platform/howto/manage-vpc-peering#platform_howto_setup_vpc_peering).
