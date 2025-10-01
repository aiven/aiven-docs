---
title: MySQL max_connections
service_label: max_connections
---

The maximum number of simultaneous connections in Aiven for MySQL® depends on [how much RAM your service has](/docs/platform/howto/scale-services).

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
