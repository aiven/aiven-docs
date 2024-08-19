---
title: Connect to a ClickHouse® cluster with CLI
---

It's recommended to connect to a ClickHouse® cluster with the ClickHouse® client.

## Use the ClickHouse® client

To use the ClickHouse® client across different operating systems, we
recommend utilizing [Docker](https://www.docker.com/). You can get the
latest image of the ClickHouse server which contains the most recent
ClickHouse client directly from [the dedicated page in Docker
hub](https://hub.docker.com/r/clickhouse/clickhouse-server).

:::note
There are other installation options available for ClickHouse clients
for different operating systems. See them in [ClickHouse
local](https://clickhouse.com/docs/en/operations/utilities/clickhouse-local)
and [Install ClickHouse](https://clickhouse.com/docs/en/install) in the
official ClickHouse documentation.
:::

## Connection properties

You will need to know the following properties to establish a secure
connection with your Aiven for ClickHouse service: **Host**, **Port**,
**User** and **Password**. You will find these in the **Connection
information** section on the **Overview** page of your service in the
[Aiven Console](https://console.aiven.io/).

## Command template

The command to connect to the service looks like this, substitute the
placeholders for `USERNAME`, `PASSWORD`, `HOST` and `PORT`:

```bash
docker run -it \
--rm clickhouse/clickhouse-server clickhouse-client \
--user USERNAME \
--password PASSWORD \
--host HOST \
--port PORT \
--secure
```

This example includes the `-it` option (a combination of `--interactive`
and `--tty`) to take you inside the container and the `--rm` option to
automatically remove the container after exiting.

The other parameters, such as `--user`, `--password`, `--host`,
`--port`, `--secure`, and `--query` are arguments accepted by the
ClickHouse client. You can see the full list of command line options in
[the ClickHouse CLI
documentation](https://clickhouse.com/docs/en/interfaces/cli/#command-line-options).

Once you're connected to the server, you can type queries directly
within the client, for example, to see the list of existing databases,
run

```sql
SHOW DATABASES
```

Alternatively, sometimes you might want to run individual queries and be
able to access the command prompt outside the docker container. In this
case you can set `--interactive` and use `--query` parameter without
entering the docker container:

```bash
docker run --interactive            \
--rm clickhouse/clickhouse-server clickhouse-client \
--user USERNAME                     \
--password PASSWORD                 \
--host HOST                         \
--port PORT                         \
--secure                            \
--query="YOUR SQL QUERY GOES HERE"
```

Similar to above example, you can request the list of present databases
directly:

```bash
docker run --interactive            \
--rm clickhouse/clickhouse-server clickhouse-client \
--user USERNAME                     \
--password PASSWORD                 \
--host HOST                         \
--port PORT                         \
--secure                            \
--query="SHOW DATABASES"
```
