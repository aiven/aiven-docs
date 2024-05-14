---
title: Estimate maximum number of connection
---

The number of simultaneous connections for Aiven for Caching depends on the total available memory on the server.


You can use the following to estimate:

```plaintext
max_number_of_connections = 4 * m
```

where `m` represents the memory in megabytes. With at least 10,000
connections available, even on the smallest servers. For example, on a
server with 4 GB memory (4,096 MB), the estimated simultaneous connections are:

```plaintext
4 * 4096 = 16384 connections
```

:::note
Make sure to convert the memory figure `m` to megabytes.
:::

This number is an estimate based on the available memory, so it varies between plans
and cloud providers. To see the exact maximum connections allowed for your
specific service, use the [redis-cli](/docs/products/caching/howto/connect-redis-cli)
with the `info` command as follows:

```shell
echo "info" | redis-cli -u REDIS_URI | grep maxclients
```
