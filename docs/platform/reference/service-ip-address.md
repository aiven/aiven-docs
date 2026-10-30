---
title: Default service IP address and hostname
---

import RelatedPages from "@site/src/components/RelatedPages";

When a new Aiven service is created, it automatically gets a hostname and one or more public IP addresses.

## Default service IP address

Your cloud service provider dynamically assigns one or more public IP addresses from its
connection pool.

These IP addresses are not permanent. With every service maintenance, such as a failover,
maintenance upgrade, or cloud migration, the IP addresses change because Aiven creates a
new node, migrates the existing data to it, and retires the old node.

:::note
If your service needs an address that doesn't change, Aiven also offers
[static IP addresses](/docs/platform/concepts/static-ips).
:::

If you have your own cloud account and want to keep your Aiven services isolated from the
public internet, you can create a VPC and a peering connection to your own cloud account.
For more information, see
[Manage project VPCs](/docs/platform/howto/manage-project-vpc).

## Default service hostname

When a new service is being provisioned, its hostname is usually defined as follows:

```text
<SERVICE_REF>-<PROJECT_REF>.*.aivencloud.com
```

Where:

-   `<SERVICE_REF>` is usually a reference to the service name.
-   `<PROJECT_REF>` is usually a reference to the project name.
-   `*` is a variable component consisting of one or more levels of
    alphanumeric subdomains for the purpose of load balancing between
    DNS zones.

Whether these parts match your service or project name exactly is not guaranteed.
Depending on the length of the service and project names, some parts can be shortened
or missing. You cannot determine a service hostname before the service is created.

:::important
Always use a fully qualified domain name returned by Aiven API. Make
sure your code doesn't put any constraints on the domain part or format
of the returned service hostname.
:::

The second-level domain part of `aivencloud.com` can change to another name in the future
if the domain becomes unavailable for updates.

<RelatedPages/>

- [Static IP addresses](/docs/platform/concepts/static-ips)
- [Manage VPC peering](/docs/platform/howto/manage-project-vpc)
- [Resolve private IPs](/docs/platform/howto/private-ip-resolution)
- [Get service connection details](/docs/tools/cli/service/connection-info)
