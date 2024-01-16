---
title: Migrate to Aiven for Apache Cassandra® with no downtime
---

Zero Downtime Migration (ZDM) Proxy is an open-source component
developed in Go and based on client-server architecture. It enables you
to migrate from one Apache Cassandra® cluster to another without
downtime or code changes in the application client.

:::note[See also]
For details on ZDM Proxy, check out [zdm-proxy
GitHub](https://github.com/datastax/zdm-proxy).
:::

This article shows how to use ZDM Proxy to migrate your Apache Cassandra
instances to Aiven.

## How it works

When using ZDM Proxy, the client connects to the proxy rather than to
the source cluster. The proxy connects both to the source cluster and
the target cluster. It sends read requests to the source cluster only,
while write requests are forwarded to both clusters.

:::note[See also]
For details on how ZDM Proxy works, check out [Introduction to Zero
Downtime
Migration](https://docs.datastax.com/en/astra-serverless/docs/migrate/introduction.html).
:::

## Prerequisites

-   Apache Cassandra instance that you want to migrate to the Aiven
    platform (migration source)
-   Aiven for Apache Cassandra service where you want to migrate your
    external instance (migration target)
-   [Aiven CLI client installed](/docs/tools/cli)
-   `cqlsh`
    [installed](https://cassandra.apache.org/doc/latest/cassandra/getting_started/installing.html)

## Migrate to Aiven

### Connect to the target

[Connect to your Aiven for Apache Cassandra service](/docs/products/cassandra/howto/connect-cqlsh-cli) using `cqlsh`, for example.

``` bash
cqlsh --ssl -u avnadmin -p YOUR_SECRET_PASSWORD cassandra-target-cluster-name.a.avns.net 12345
```

You can expect to receive output similar to the following:

``` bash
Connected to a1b2c3d4-1a2b-3c4d-5e6f-a1b2c3d4e5f6 at cassandra-target-cluster-name.a.avns.net:12345
[cqlsh 6.1.0 | Cassandra 4.0.11 | CQL spec 3.4.5 | Native protocol v5]
```

### Create keyspaces and tables

In your target service, create the same keyspaces and tables you have in
your source Apache Cassandra cluster.

``` bash
create keyspace SOURCE_KEYSPACE_NAME with replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
create table SOURCE_TABLE_NAME.SOURCE_DATABASE_NAME (n_id int, value int, primary key (n_id));
```

### Download the binary

Download the ZDM Proxy's binary from [ZDM Proxy
releases](https://github.com/datastax/zdm-proxy/releases).

``` bash
wget https://github.com/datastax/zdm-proxy/releases/download/v2.1.0/zdm-proxy-linux-amd64-v2.1.0.tgz
tar xf zdm-proxy-linux-amd64-v2.1.0.tgz
```

Check if the binary has been downloaded successfully using `ls` in the
relevant directory. You can expect to receive output similar to the
following:

``` bash
LICENSE  zdm-proxy-linux-amd64-v2.1.0.tgz  zdm-proxy-v2.1.0
```

### Run ZDM Proxy

To run ZDM Proxy, specify connection information by setting `ZDM_*`
environment variables using the `export` command. Next, run the binary.

``` bash
export ZDM_SOURCE_CONTACT_POINTS=localhost
export ZDM_SOURCE_USERNAME=cassandra
export ZDM_SOURCE_PASSWORD=cassandra
export ZDM_SOURCE_PORT=1234

export ZDM_TARGET_CONTACT_POINTS=cassandra-target-cluster-name.a.avns.net
export ZDM_TARGET_USERNAME=avnadmin
export ZDM_TARGET_PASSWORD=YOUR_SECRET_PASSWORD
export ZDM_TARGET_PORT=12345
export ZDM_TARGET_TLS_SERVER_CA_PATH="/tmp/ca.pem"

export ZDM_TARGET_ENABLE_HOST_ASSIGNMENT=false

./zdm-proxy-v2.1.0
```

:::note[ENABLE_HOST_ASSIGNMENT]
Make sure you set the ZDM_TARGET_ENABLE_HOST_ASSIGNMENT variable.
Otherwise, ZDM Proxy tries to connect to one of internal addresses of
the cluster nodes, which are unavailable from outside. If this occurs to
your source cluster, set `ZDM_SOURCE_ENABLE_HOST_ASSIGNMENT=false`.
:::

## Verify that it works

### Add more data using the proxy

To connect to ZDM Proxy, use, for example, `cqlsh`. Provide connection
details and, if your source or target require authentication, specify
target username and password.

:::note[See also]
Check more details on using the credentials in [Client application
credentials](https://docs.datastax.com/en/astra-serverless/docs/migrate/connect-clients-to-proxy.html#_client_application_credentials).
:::

The port that ZDM Proxy uses is 14002, which can be overridden.

1.  Connect using ZDM Proxy.

``` bash
cqlsh -u avnadmin -p YOUR_SECRET_PASSWORD localhost 14002
```

You can expect to receive output similar to the following:

``` bash
Connected to CLUSTER_NAME at localhost:14002
[cqlsh 6.1.0 | Cassandra 4.1.3 | CQL spec 3.4.6 | Native protocol v4]
```

2.  Check data in the table.

``` bash
select * from TABLE_NAME.DATABASE_NAME;
```

You can expect to receive output similar to the following:

``` bash
n_id | value
------+-------
    1 |    42
    2 |    44
    3 |    46

(3 rows)
```

3.  Insert more data into the table to test how ZDM Proxy handles write
    request.

``` bash
insert into TABLE_NAME.DATABASE_NAME (n_id, value) values (4, 48);
insert into TABLE_NAME.DATABASE_NAME (n_id, value) values (5, 50);
```

4.  Check again data inside the table.

``` bash
select * from TABLE_NAME.DATABASE_NAME;
```

You can expect to receive output similar to the following:

``` bash
n_id | value
------+-------
    5 |    50
    1 |    42
    2 |    44
    4 |    48
    3 |    46

(5 rows)
```

### Check data in the source

1.  Connect to the source:

``` bash
cqlsh localhost 1234
```

You can expect to receive output similar to the following:

``` bash
Connected to SOURCE_CLUSTER_NAME at localhost:1234
[cqlsh 6.1.0 | Cassandra 4.1.3 | CQL spec 3.4.6 | Native protocol v5]
```

2.  Check data in the table:

``` bash
select * from SOURCE_TABLE_NAME.SOURCE_DATABASE_NAME;
```

You can expect to receive output similar to the following:

``` bash
n_id | value
------+-------
    5 |    50
    1 |    42
    2 |    44
    4 |    48
    3 |    46

(5 rows)
```

:::note[Result]
ZDM Proxy has forwarded both the write request and the read request to
the source cluster. As a result, all the values are there: both
newly-added ones (`50` and `48`) and previously-added ones (`42`, `44`,
and `46`).
:::

### Check data in the target

1.  Connect to the target service.

``` bash
cqlsh --ssl -u avnadmin -p YOUR_SECRET_PASSWORD cassandra-target-cluster-name.a.avns.net 12345
```

You can expect to receive output similar to the following:

``` bash
Connected to a1b2c3d4-1a2b-3c4d-5e6f-a1b2c3d4e5f6 at cassandra-target-cluster-name.a.avns.net:12345
[cqlsh 6.1.0 | Cassandra 4.0.11 | CQL spec 3.4.5 | Native protocol v5]
```

2.  Check data in the table.

``` bash
select * from TARGET_TABLE_NAME.TARGET_DATABASE_NAME;
```

You can expect to receive output similar to the following:

``` bash
n_id | value
------+-------
    5 |    50
    4 |    48

(2 rows)
```

:::note[Result]
`50` and `48` are there in the target table since ZDM Proxy has
forwarded the write request to the target service. `42`, `44`, and `46`
are not there since ZDM Proxy has not sent the read request to the
target service.
:::

## Related pages

-   [zdm-proxy GitHub](https://github.com/datastax/zdm-proxy)
-   [Introduction to Zero Downtime
    Migration](https://docs.datastax.com/en/astra-serverless/docs/migrate/introduction.html)
-   [ZDM Proxy releases](https://github.com/datastax/zdm-proxy/releases)
-   [Client application
    credentials](https://docs.datastax.com/en/astra-serverless/docs/migrate/connect-clients-to-proxy.html#_client_application_credentials)
