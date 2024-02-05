---
title: Get started with Aiven for ClickHouse®
sidebar_label: Get started
---

Start using Aiven for ClickHouse® by creating a service, adding a database, and connecting using [Docker](https://www.docker.com/).

## Create a ClickHouse service

1.  Log in to the [Aiven Console](https://console.aiven.io/).

1.  [Create an Aiven for ClickHouse® service](/docs/platform/howto/create_new_service).

    Once the service is ready, its status changes to **Running**, which typically takes a
    couple of minutes, depending on your selected cloud provider and region.

## Create a database

1.  When the service is running, select **Databases and tables** from
    the sidebar of your service's page.

1.  In the **Databases and tables** page, select **Create database** \>
    **ClickHouse database**.

1.  In the **Create ClickHouse database** window, enter a name for your
    database and select **Create database**.

    :::note
    All databases must be created through the [Aiven Console](https://console.aiven.io/).
    :::

## Connect to ClickHouse

1.  Get the latest Docker image of [the ClickHouse client from Docker
    Hub](https://hub.docker.com/r/clickhouse/clickhouse-client)

1.  Go to the **Overview** page of your service, and copy the **Host**,
    **Port**, **User**, and **Password**, which you need for connecting
    to the service.

1.  Run the following command to connect to your service and run SQL
    queries on your database, substitute the placeholders for
    `USERNAME`, `PASSWORD`, `HOST` and `PORT`:

    ``` bash
    docker run -it                       \
    --rm clickhouse/clickhouse-client    \
    --user USERNAME                      \
    --password PASSWORD                  \
    --host HOST                          \
    --port PORT                          \
    --secure
    ```

For more information on using the ClickHouse client, see
[Connect to a ClickHouse® cluster with CLI](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).

## Next steps

Now that you have your service and connection set up, check out
[Load sample data into Aiven for ClickHouse®](/docs/products/clickhouse/howto/load-dataset)
to try out your service with actual data.
