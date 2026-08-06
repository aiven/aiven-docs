---
title: MySQL max_connections
sidebar_label: max_connections
---

import RelatedPages from "@site/src/components/RelatedPages";

Calculate the total number of simultaneous connections available to all users combined on your Aiven for MySQL® service, and learn why the per-user connection limit is a separate setting.

The maximum number of simultaneous connections in Aiven for MySQL® depends on
[how much RAM your service has](/docs/platform/howto/scale-services). This
`max_connections` value applies to all users of the service combined, not to each user
individually.

:::note
Independent of the size, an `extra_connection` with a value of `1` is
added for the system process.
:::

## Under 4 GiB

For services with less than 4 GiB of RAM, the number of allowed connections is per
GiB:

$$
{max\_connections} =  75 \times RAM + extra\_connection
$$

:::note[Example]
With 2 GiB of RAM, the maximum number of connections is
${max\_connections} = 75 \times 2 + 1$
:::

## 4 GiB or more

For services with 4 GiB or more of RAM, the number of allowed connections is
per GiB:

$$
{max\_connections} = 100 \times RAM + extra\_connection
$$

:::note[Example]
With 7 GiB of RAM, the maximum number of connections is
${max\_connections} = 100 \times 7 + 1 $
:::

## Increase the maximum number of connections

`max_connections` isn't a configurable advanced parameter in Aiven for MySQL. Its value
is always calculated from your service's plan and RAM using the formulas described
earlier. To raise the total number of simultaneous connections available to your
service, [upgrade to a plan with more RAM](/docs/products/mysql/howto/change-service-plan).

## Per-user connection limits

MySQL supports a separate, per-user limit called `max_user_connections`, which caps how
many simultaneous connections a single database user can open. If a client reports an
error such as `User 'exampleuser' has exceeded the 'max_user_connections' resource`,
that user has hit this per-user limit, not the service-wide `max_connections` limit.

Aiven for MySQL doesn't expose `max_user_connections` as a configurable option, and
raising your service's `max_connections` value doesn't change any per-user limit. If
your application needs more concurrent connections for a specific database user,
[distribute connections across multiple database users](/docs/products/mysql/howto/manage-service-users)
or reduce the number of concurrent connections that user opens. For help with a
persistent per-user connection limit, contact
[Aiven support](/docs/platform/howto/support).

<RelatedPages />

- [Prepare your Aiven for MySQL service for high load](/docs/products/mysql/howto/prepare-for-high-load)
- [MySQL tuning for concurrency](/docs/products/mysql/concepts/mysql-tuning-and-concurrency)
- [Change the service plan](/docs/products/mysql/howto/change-service-plan)
- [Manage service users](/docs/products/mysql/howto/manage-service-users)
