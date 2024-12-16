---
title: Manage SSL connectivity
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Manage SSL connectivity for your Aiven for Caching service by enabling secure connections and configuring stunnel for clients without SSL support.

## Client support for SSL-encrypted connections

### Default support

Aiven for Caching uses SSL encrypted connections by default. This is indicated by the
`rediss://` (with double `s`) prefix in the
`Service URI` on the [Aiven Console](https://console.aiven.io/).

Since **Redis 6**, the `redis-cli` tool supports SSL connections. You can connect directly
to your service using:

```bash
redis-cli -u rediss://username:password@host:port
```

Alternatively, you can use the third-party [Redli tool](https://github.com/IBM-Cloud/redli):

```bash
redli -u rediss://username:password@host:port
```

Not every Redis client supports SSL-encrypted connections. In such cases, disabling or
bypassing SSL is possible but **not recommended**. You can use one of the following
options to achieve this.

## Set up `stunnel` process

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
Adjust settings according to your service. On the <ConsoleLabel name="overview"/> page,
the **Connection information** section lists your Host and Port to configure the
connection.
:::

HAProxy terminates SSL connections before forwarding them to Aiven for Caching. The
HAProxy connection timeout is set to 300 seconds (5 minutes) by default, matching
the `redis_timeout` value. This prevents idle connections from staying open too long. You
can adjust the `redis_timeout` value in the service's **Advanced configuration** section
in the [Aiven Console](https://console.aiven.io).

## Allow plain-text connections

As an alternative to SSL, you can enable plain-text connections.

<Tabs groupId="ssl-config">
<TabItem value="console" label="Aiven Console" default>

1. In the service's <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="service settings"/>.
1. Go to the **Advanced configuration** section.
1. Set **redis_ssl** to `false`.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To disable SSL on an existing Aiven for Caching service, use the following command,
replacing `SERVICE_NAME `with your service name:

```bash
avn service update SERVICE_NAME -c "redis_ssl=false"
```

</TabItem>
</Tabs>

:::warning
Enabling plain-text connections compromises the security of your Aiven for Caching
service. Disabling SSL allows potential eavesdroppers to access sensitive credentials and data.
:::

After these changes, the `Service URI` will change to a new URL, starting with
the `redis://` prefix (removing the extra 's'). This indicates a direct, non-SSL
connection to the Aiven for Caching service.
