---
title: Connect to Aiven for ClickHouse® with clickhouse-client
sidebar_label: clickhouse-client
---
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Connect to Aiven for ClickHouse® with the `clickhouse-client` CLI. Install via Docker, connect with your credentials, and run SQL interactively or with `--query`.

## Before you begin

Get the following connection details from the **Connection information**
section on the <ConsoleLabel name="overview"/> page of your service in the
[Aiven Console](https://console.aiven.io/):

- **Host**
- **Port**
- **User**
- **Password**

## Install the ClickHouse client

You can use Docker to run `clickhouse-client` on any operating system. The
ClickHouse server image includes the client.

Pull the latest [ClickHouse server image from Docker Hub](https://hub.docker.com/r/clickhouse/clickhouse-server).

:::note
To install the client locally instead of using Docker, see the ClickHouse
documentation: [Install ClickHouse](https://clickhouse.com/docs/en/install) and
[clickhouse-local utility](https://clickhouse.com/docs/en/operations/utilities/clickhouse-local).
:::

## Connect to your service

Run the following command. Replace `USERNAME`, `PASSWORD`, `HOST`, and `PORT`
with your connection details:

```bash
docker run -it --rm clickhouse/clickhouse-server clickhouse-client \
  --host HOST \
  --port PORT \
  --user USERNAME \
  --password PASSWORD \
  --secure
```

Options used

- `-it`: Runs the container in interactive mode.
- `--rm`: Removes the container after exit.
- `--secure`: Enables TLS (required for Aiven services).

For the full list of client options, see
[ClickHouse CLI command-line options](https://clickhouse.com/docs/en/interfaces/cli/#command-line-options).

## Run queries

After you connect, you can run SQL statements directly in the client. For example:

```sql
SHOW DATABASES;
```

## Run a single query

To run a single query and exit to your shell immediately, add the `--query` option:

```bash
docker run --rm clickhouse/clickhouse-server clickhouse-client \
  --host HOST \
  --port PORT \
  --user USERNAME \
  --password PASSWORD \
  --secure \
  --query="SHOW DATABASES"
```
