---
title: Restrict network access to services
sidebar_label: Restrict access
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Restrict access to your Aiven-managed service to a single IP, an address block, or any combination of both.

By default, a connection to an Aiven service can be established from any IP address. To
restrict access, you can use the IP filtering capability, which allows you to filter
traffic incoming to your services by specifying allowed IP addresses or network ranges.

:::note
If your service is within a VPC, the VPC configuration filters incoming traffic before the
IP filter is applied.
:::

By default, the IP filter is set to `0.0.0.0/0`, which allows all inbound connections. If you
remove `0.0.0.0/0` without adding networks or addresses used by clients, no client can
connect to your service.

:::tip
To access a non-publicly-accessible service from another service, use a
[service integration](/docs/platform/concepts/service-integration).
:::

## Restrict access

1. Log in to the [Aiven Console](https://console.aiven.io), and select the service to restrict
   access to.
1. On the <ConsoleLabel name="overview"/> page of your service, select
   <ConsoleLabel name="service settings"/>.
1. On the <ConsoleLabel name="service settings"/> page, in the **Cloud and
   network** section:

   - Set the IP filter for the first time:

     1. Click <ConsoleLabel name="actions"/> > **Set IP address allowlist**.
     1. In the **Allowed inbound IP addresses** window, remove `0.0.0.0/0` and enter an IP
        address or address block using the CIDR notation, for example `10.20.0.0/16`.

   - Edit the IP filter after the first setup change:

     1. Click <ConsoleLabel name="actions"/> > **Edit IP address allowlist**.
     1. In the **Allowed inbound IP addresses** window, enter an IP address or address
        block using the CIDR notation, for example `10.20.0.0/16`.

1. To add more IP addresses or ranges, click **Add IP address range**.
1. Select **Save changes**.

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
