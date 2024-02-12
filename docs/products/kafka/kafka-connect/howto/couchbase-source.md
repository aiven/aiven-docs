---
title: Create a source connector from Couchbase to Apache Kafka®
---

The [Couchbase](https://www.couchbase.com/) source connector pushes data
from the NoSQL database, to Apache Kafka® where it can be transformed
and read by multiple consumers.

:::tip
Sourcing data from a database into Apache Kafka decouples the database
from the set of consumers. Once the data is in Apache Kafka, multiple
applications can access it without adding any additional query overhead
to the source database.
:::

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/couchbase/kafka-connect-couchbase).
:::

## Prerequisites {#connect_couchbase_source_prereq}

To setup a [Couchbase](https://www.couchbase.com/) source connector, you
need an Aiven for Apache Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to collect the following information about the
source Couchbase database upfront:

-   `COUCHBASE_SEED_NODES`: The database seed nodes
-   `COUCHBASE_USER`: The database user to connect
-   `COUCHBASE_PASSWORD`: The database password for the `COUCHBASE_USER`
-   `COUCHBASE_BUCKET`: The bucket from which extract the data
-   `COUCHBASE_SCOPE`: The scope from which extract the data (if none
    all the scopes within the bucket will be sourced)
-   `COUCHBASE_COLLECTIONS`: The list of collections from which extract
    the data (if none all the collections within the bucket and scope
    will be sourced)
-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

:::note
If you're using Aiven for Apache Kafka®, the Kafka related details are
available in the [Aiven console](https://console.aiven.io/) service
Overview tab or via the dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

## Setup a Couchbase source connector with Aiven Console

The following example demonstrates how to setup a Couchbase source
connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `couchbase-source.json`) with the following content. Creating a
file is not strictly necessary but allows to have all the information in
one place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.couchbase.connect.kafka.CouchbaseSourceConnector",
    "couchbase.seed.nodes": "COUCHBASE_SEED_NODES",
    "couchbase.username": "COUCHBASE_USER",
    "couchbase.password": "COUCHBASE_PASSWORD",
    "couchbase.bucket": "COUCHBASE_BUCKET",
    "couchbase.scope": "COUCHBASE_SCOPE",
    "couchbase.collections": "COUCHBASE_COLLECTIONS",
    "couchbase.source.handler": "com.couchbase.connect.kafka.handler.source.RawJsonSourceHandler",
    "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
}
```

The configuration file contains the following entries:

-   `name`: the connector name, replace CONNECTOR_NAME with the name you
    want to use for the connector
-   `COUCHBASE_SEED_NODES`, `COUCHBASE_BUCKET`, `COUCHBASE_SCOPE`,
    `COUCHBASE_COLLECTIONS`, `COUCHBASE_USER`, `COUCHBASE_PASSWORD`:
    source database parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/couchbase-source#connect_couchbase_source_prereq) phase.
-   `couchbase.source.handler` and `value.converter`: defines the
    messages data format in the Apache Kafka topic. The combination of
    `com.couchbase.connect.kafka.handler.source.RawJsonSourceHandler`
    and `org.apache.kafka.connect.converters.ByteArrayConverter` pushes
    the Couchbase documents in the Kafka topic in JSON format.

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector, follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, the button is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Couchbase Source**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `couchbase-source.json` file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tabs and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create
    connector**.

    :::tip
    If you're using Aiven for Apache Kafka, topics will not be created
    automatically. Either create them manually following the
    `database.server.name.schema_name.table_name` naming pattern or
    enable the `kafka.auto_create_topics_enable` advanced parameter.
    :::

9.  Verify the connector status under the **Connectors** tab

10. Verify the presence of the data in the target Apache Kafka topic
    coming from the MongoDB dataset. The topic name is equal to the
    concatenation of the database and collection name. If you need to
    change the target table name, you can do so using the Kafka Connect
    `RegexRouter` transformation.

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::

## Example: define a Couchbase source connector

The example creates an Couchbase source connector with the following
properties:

-   connector name: `couchbase_source`
-   Couchbase seeds: `test.cloud.couchbase.com`
-   Couchbase username: `testuser`
-   Couchbase password: `Test123!`
-   Couchbase bucket: `travel-sample`
-   Couchbase scope: `inventory`
-   Couchbase collections: `airline`

The connector configuration is the following:

```
{
    "name": "couchbase_source",
    "connector.class": "com.couchbase.connect.kafka.CouchbaseSourceConnector",
    "couchbase.seed.nodes": "test.cloud.couchbase.com",
    "couchbase.username": "testuser",
    "couchbase.password": "Test123!",
    "couchbase.bucket": "travel-sample",
    "couchbase.scope": "inventory",
    "couchbase.collections": "airline",
    "couchbase.source.handler": "com.couchbase.connect.kafka.handler.source.RawJsonSourceHandler",
    "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter"
}
```

With the above configuration stored in a `couchbase-source.json` file,
you can create the connector in the `demo-kafka` instance and you should
see the data landing in an Apache Kafka topic named
`${bucket}.${scope}.${collection}` by default, you can change the
landing topic logic by modifying the `couchbase.topic` parameter
definition.

------------------------------------------------------------------------

*Couchbase is a trademark of Couchbase, Inc.*
