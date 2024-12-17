---
title: Connect with cqlsh
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for Apache Cassandra® service using `cqlsh`.

## Prerequisites

- `cqlsh` client installed as part of the
  [Cassandra server installation](https://cassandra.apache.org/doc/latest/cassandra/getting_started/installing.html)
- Your service's CA certificate downloaded and saved in your file system

## Variables

These are the placeholders to be replaced in the code sample:

| Variable       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `PASSWORD`     | Password of the `avnadmin` user                        |
| `HOST`         | Host name for the connection                           |
| `PORT`         | Port number to use for the Cassandra service           |
| `SSL_CERTFILE` | Path of the `CA Certificate` for the Cassandra service |

:::tip
Find all the variables and the CA client certificate file in
the [Aiven Console](https://console.aiven.io/)> your service's
<ConsoleLabel name="overview"/> > **Connection information**.
:::

## Code

Set the `SSL_CERTFILE` environment variable to the location of the CA
certificate for the Cassandra service:

```bash
export SSL_CERTFILE=<PATH>
```

:::note
Alternatively, you can provide the path to the CA certificate file in
the `[ssl]` section by setting the the `certfile` parameter in
`~/.cassandra/cqlshrc`.
:::

Go to the directory of your local Cassandra installation and run:

```bash
./cqlsh --ssl -u avnadmin -p <PASSWORD> <HOST> <PORT>
```

You are now connected to the Cassandra database.
