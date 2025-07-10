---
title: Handle resolution errors of private IP addresses
displayed_sidebar: platformSidebar
---

When an Aiven service is placed in a VPC (Virtual Private Cloud), the
DNS hostname of the service will resolve to a private IP address within
the VPC's network address range. Any application connecting to the
service needs to be on the same VPC.

Some DNS resolvers used in office and home networks block the resolution
of external hostnames to private IP addresses, known as [DNS-rebinding
protection](https://en.wikipedia.org/wiki/DNS_rebinding#Protection).

If the hostname of a service in a VPC cannot be resolved, this can be
due to DNS-rebinding protection on your network. To verify this
assumption:

1.  Enable public access to your service. If the `public-` prefixed
    hostname of the service resolves successfully, then the problem is
    with the private IP.

2.  Request the hostname using a known resolver such as Google Public
    DNS at `8.8.8.8`. This has no rebinding protection so serves as a
    good test. You can use the `dig` command:

    ```
    dig +short myservice-myproject.aivencloud.com @8.8.8.8
    ```

3.  Compare the output of the above command with the response from your
    default DNS resolver:

    ```
    dig +short myservice-myproject.aivencloud.com
    ```

4.  If the response from your default DNS resolver does not return the
    same IP address as the earlier test, then your default DNS resolver
    is blocking the resolution.

The recommended fix for this issue is to configure your DNS resolver
(normally a server for offices, or a home router for home networks) to
allow the resolution of hostnames in the Aiven service domain,
`aivencloud.com`, to bypass the DNS-rebinding protection.

:::note
It is preferable to allow a single domain to bypass the DNS-rebinding if
your DNS resolver allows it, instead of disabling DNS-rebinding
protection entirely.
:::
