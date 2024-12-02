---
title: Default service IP address and hostname
---

When a new Aiven service is created, it automatically gets a hostname and one or more public IP addresses.

## Default service IP address

The chosen cloud service provider will dynamically assign one or more public IP
address from their connection pool.

This IP address is not permanent, and with every
service maintenance (in case of failover, maintenance upgrade or cloud
migration) the IP address changes since Aiven creates a new node,
migrates the existing data to it and retire the old node.

:::note
Aiven also offer the ability to define
[static IP addresses](/docs/platform/concepts/static-ips) if you need them in a service.
For more information about obtaining a static IP and assigning it to a particular service,
see the
[related guide](/docs/platform/concepts/static-ips).
:::

If you have your own cloud account and want to keep your Aiven services
isolated from the public internet, you can however create a VPC and a
peering connection to your own cloud account. For more information on
how to setup the VPC peering, check [the related
article](/docs/platform/howto/manage-vpc-peering).

## Default service hostname

When a new service is being provisioned, its hostname is defined as
follows:

```text
<SERVICE_NAME>-<PROJECT_NAME>.*.aivencloud.com
```

Where:

-   `<SERVICE_NAME>` is the name of the service.
-   `<PROJECT_NAME>` is the name of the project.
-   `*` is a variable component consisting of one or more levels of
    alphanumeric subdomains for the purpose of load balancing between
    DNS zones.

:::important
Always use a fully qualified domain name returned by Aiven API. Make
sure your code doesn't put any constraints on the domain part or format
of the returned service hostname.
:::

:::note
- Second-level domain part of `aivencloud.com` can change to another
  name in the future if the domain becomes unavailable for updates.
- If the `<SERVICE_NAME>` is too short or was recently used (for example,
  if you drop and recreate a service with the same name), the hostname
  format can be
  `<SERVICE_NAME><3RANDOMLETTERS>-<PROJECT_NAME>.*.aivencloud.com`.
:::
