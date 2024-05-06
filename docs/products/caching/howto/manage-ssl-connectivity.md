---
title: Manage SSL connectivity
---

Manage SSL connectivity for your Aiven for Caching service, including enabling secure connections and configuring stunnel for clients without SSL support.

## Client support for SSL-encrypted connections

### Default support

Aiven for Caching uses SSL encrypted connections by default. This is
shown by the use of `rediss://` (with double `s`) prefix in the
`Service URI` on the [Aiven Console](https://console.aiven.io/).

:::tip
The `Service URI` is available on the [Aiven console](https://console.aiven.io/).
:::

Since **Redis 6**, the `redis-cli` tool itself supports SSL connections;
therefore, you can connect directly to your service using:


```bash
redis-cli -u rediss://username:password@host:port
```

Alternatively, you can use the third-party [Redli tool](https://github.com/IBM-Cloud/redli):

```bash
redli -u rediss://username:password@host:port
```

Not every Redis client supports SSL-encrypted connections. In such cases, turning off or
bypassing SSL is possible but **not recommended**. Use one of the following options to
achieve this.

### Set up `stunnel` process

Set up a `stunnel` process on the client to manage SSL settings on the database
side while hiding it from the client.

Use the following `stunnel` configuration, for example
`stunnel.conf`, to set up a `stunnel` process.

```plaintext
client = yes
foreground = yes
debug = info
delay = yes

[redis]
accept = 127.0.0.1:6380
connect = myredis.testproject.aivencloud.com:28173
TIMEOUTclose = 0
; For old services only. New ones use Let's Encrypt and there's no
; CA cert available from Aiven console. Most environments trust
; Let's Encrypt by default without any explicit CAfile config.
; CAfile = /path/to/optional/project/cacert/that/you/can/download/from/aiven/console
```

For details about the global options of the stunnel configuration, see the
[Stunnel Global Options](https://www.stunnel.org/static/stunnel.html#GLOBAL-OPTIONS).
More details about setting up such a process are available on the
[Stunnel website page](https://www.stunnel.org/index.html).

For `service-level option`, the following parameters are configured:

- `accept => *[host:]port*`: Accept connections on the specified
  address.
- `connect => *[host:]port*`: Connect to a remote address.
- `TIMEOUTclose => *seconds*`: Time to wait for `close_notify`.

:::note
Adjust settings according to your service. The **Overview** page lists your
**Overview** > **Host** and **Overview** > **Port** for configuring the connect parameter.
:::

When SSL is in use, HAProxy is responsible for terminating the SSL
connections before they get forwarded to Redis. This process has a
connection timeout set to 12 hours which is not configurable by the
users. If you allow very long Redis timeouts, this SSL-terminating
HAProxy may end up closing the connection before the Redis timeout has
expired. This timeout is independent of Redis timeout.

### Allow plain-text connections

An alternative is disable database SSL allowing allow plain-text
connections. To allow plain-text connections, you can change this
setting on **Overview** in the **Advanced configuration** section, or
using the
[Aiven Command Line interface](/docs/tools/cli).

:::warning
Enabling plain-text connections compromises the security of your Aiven for Caching
service. Disabling SSL allows potential eavesdroppers to access sensitive credentials and data.
:::

To disable SSL on an existing caching instance, use the following Aiven CLI
command substituting `<my-caching>` with your chosen service name when the service was created.

```console
avn service update <my-Caching> -c "Caching_ssl=false"
```

After executing the command, the `Service URI` changes to a new location and starts with
the `Caching://` prefix (removing the extra 's'), indicating a direct connection to the
Aiven for Caching service that does not use SSL.
