---
title: Troubleshoot Valkey connection issues
---

Learn troubleshooting techniques for your Aiven for Valkey service and resolve common connection issues.

:::important
By default,
[Aiven for Valkey uses SSL connections](/docs/products/valkey/howto/manage-ssl-connectivity),
and these connections are closed automatically after 12 hours. This is not a parameter
that can be changed. Aiven also sets the `valkey_timeout` advanced parameter to
300 seconds by default.

:::
## Some Valkey connections are closed intermittently

When experiencing connection issues with your Aiven for Valkey service, some common
things to check:

- Some Redis®* clients do not support SSL connections. It is recommended to check the
  documentation for the Redis®* client being used to ensure SSL connections
  are supported.
- If you notice older connections terminating, check the value configured for the
  [valkey_timeout advanced parameter](/docs/products/valkey/reference/advanced-params).
  This parameter controls the timeout value for idle connections. Once the timeout is
  reached, the connection is terminated.

## Methods for troubleshooting connections

A great way to troubleshoot connection issues is to arrange for a packet
capture to take place. This can be achieved with tools like
[Tcpdump](https://www.tcpdump.org/) and
[Wireshark](https://www.wireshark.org/). This allows you to see if
connections are making it outside your network to the Aiven for Valkey
instance.

Another tool you can use to help diagnose connection issues is the
Socket Statistics CLI tool which dumps socket statistics.
