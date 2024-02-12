---
title: Load sample data into ClickHouse®
---

The official ClickHouse® website offers [a list of example
datasets](https://clickhouse.com/docs/en/getting-started/example-datasets/)
to get you started. Each dataset has a description on how to download,
upload, and transform the data samples as needed.

This article takes a closer look at how to use the
`Anonymized Web Analytics Data` [example
dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica/).
This contains two tables:

-   `hits_v1`, with data for every user action
-   `visits_v1`, with information about every user session

The steps below show you how to download the dataset, set up a
connection with the server, and load the data into your cluster.
ClickHouse already offers detailed instructions [on setting up this
dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica/),
but these steps add some more details on how to run commands by using a
ClickHouse client running in Docker.

## Download the dataset

Download the original dataset directly from [the dataset documentation
page](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica/).
You can do this using cURL, where the generic command looks like this:

```
curl address_to_file_in_format_tsv_xz | unxz --threads=`nproc` > file-name.tsv
```

:::note
The `nproc` Linux command, which prints the number of processing units,
is not available on macOS. To use the above command, add an alias for
`nproc` into your `~/.zshrc` file:
`alias nproc="sysctl -n hw.logicalcpu"`.
:::

This command allows you to download and extract data from the URLs
specified in the [ClickHouse
documentation](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica).

Once done, you should have two files available: `hits_v1.tsv` and
`visits_v1.tsv`.

## Set up the service and database

If you don\'t yet have an Aiven for ClickHouse service, follow the steps
in our
[getting started guide](/docs/products/clickhouse/get-started) to create one.

When you create a service, a default database was already added.
However, you can create separate databases specific to your use case. We
will create a database with the name `datasets`, keeping it the same as
in the ClickHouse documentation.

To create the new database, take the following steps:

1.  Log in to the [Aiven web console](https://console.aiven.io/), and
    select your service from the **Services** page.
2.  In your service's page, select **Databases and tables** from the
    sidebar.
3.  In the **Databases and tables** page, select **Create database** \>
    **ClickHouse database**.
4.  In the **Create ClickHouse database** window, enter name `datasets`
    for your database and select **Create database**.

## Connect to the ClickHouse database

We will be using the ClickHouse client to connect to the server. Follow
[the separate guide](/docs/products/clickhouse/howto/connect-with-clickhouse-cli) to familiarize yourself with how to set up and start using
the ClickHouse client.

To connect to the server, use the connection details that you can find
in the **Connection information** section of the **Overview** page in
the Aiven web console. You will need **Host**, **Port**, **User**, and
**Password**.

```bash
docker run --interactive            \
--rm clickhouse/clickhouse-server clickhouse-client   \
--user USERNAME                     \
--password PASSWORD                 \
--host HOST                         \
--port PORT                         \
--secure
```

Once you're connected, you can run queries from within the ClickHouse
client.

## Create tables

The next step is to add new tables to your newly created database. The
ClickHouse documentation includes sample `CREATE TABLE` commands with
[the recommended table
structure](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica),
use it to create the tables for both `hits_v1` and `visits_v1`:

```sql
CREATE TABLE datasets.hits_v1 [...]
```

```sql
CREATE TABLE datasets.visits_v1 [...]
```

:::note
If no database is specified, the default one is used.
:::

## Load data

Now that you have a dataset with two empty tables, we'll load data into
each of the tables. However, because we need to access files outside the
docker container, we'll run the command specifying `--query` parameter.
To do this:

1.  Go to the folder where you stored the downloaded files for
    `hits_v1.tsv` and `visits_v1.tsv`.

2.  Run the following command:

    ```
    cat hits_v1.tsv | docker run        \
    --interactive                       \
    --rm clickhouse/clickhouse-server clickhouse-client  \
    --user USERNAME                     \
    --password PASSWORD                 \
    --host HOST                         \
    --port PORT                         \
    --secure                            \
    --max_insert_block_size=100000      \
    --query="INSERT INTO datasets.hits_v1 FORMAT TSV"
    ```

    `hits_v1.tsv` contains approximately 7Gb of data. Depending on your
    internet connection, it can take some time to load all the items.

3.  Run the corresponding command for `visits_v1.tsv`:

    ```
    cat visits_v1.tsv | docker run      \
    --interactive                       \
    --rm clickhouse/clickhouse-server clickhouse-client   \
    --user USERNAME                     \
    --password PASSWORD                 \
    --host HOST                         \
    --port PORT                         \
    --secure                            \
    --max_insert_block_size=100000      \
    --query="INSERT INTO datasets.visits_v1 FORMAT TSV"
    ```

You should now see the two tables in your database and you are ready to
try out some queries.

## Run queries

Once the data is loaded, you can run queries against the sample data you
imported. For example, here is a command to query the number of items in
the `hits_v1` table:

```sql
SELECT COUNT(*) FROM datasets.hits_v1
```

Another example uses some additional query features to find the longest
lasting sessions:

```sql
SELECT StartURL AS URL,
    MAX(Duration) AS MaxDuration
FROM datasets.visits_v1
GROUP BY URL
ORDER BY MaxDuration DESC
LIMIT 10
```

## View tables in the console

You can also use the database and added tables with the data in the
[Aiven web console](https://console.aiven.io/). You can find them by
selecting **Databases & Tables** from the sidebar of your service's
page in [Aiven Console](https://console.aiven.io/).
