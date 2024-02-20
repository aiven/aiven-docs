---
title: Create a sink connector from Apache Kafka® to Snowflake
---

The Apache Kafka Connect® Snowflake sink connector enables you to move
data from an Aiven for Apache Kafka® cluster to a Snowflake database.
The full connector documentation is available in the dedicated [GitHub
repository](https://docs.snowflake.com/en/user-guide/kafka-connector.html).

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://docs.snowflake.net/manuals/user-guide/kafka-connector.html).
:::

## Prerequisites {#connect_sink_snowflake_prereq}

To setup the Snowflake sink connector, you need an Aiven for Apache
Kafka® service
[with Apache Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to follow the steps
[to prepare the Snowflake account](snowflake-sink-prereq) and collect the following information about the target
Snowflake database upfront:

- `SNOWFLAKE_URL`: The URL used to access the Snowflake account in the format of `ACCOUNT_LOCATOR.REGION_ID.snowflakecomputing.com` where:

  -   `ACCOUNT_LOCATOR` is the name of the account, more
      information are available in the dedicated [Snowflake
      documentation](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html)
  -   `REGION_ID` is the Id of the region where the Snowflake
      service is available, you can review the region Ids in the
      [dedicated
      documentation](https://docs.snowflake.com/en/user-guide/intro-regions.html)

  :::tip
  The Snowflake account Id and region name can be obtained in the
  Snowflake UI by issuing the following query in a worksheet:

  ```
  select current_account(), current_region()
  ```

  :::

-   `SNOWFLAKE_USERNAME`: A valid Snowflake username with enough
    privileges to write data in the target database as mentioned in the
    [prerequisite document](snowflake-sink-prereq).

-   `SNOWFLAKE_PRIVATE_KEY`: The private key associated to the
    `SNOWFLAKE_USERNAME` as mentioned in the
    [prerequisite document](snowflake-sink-prereq).

-   `SNOWFLAKE_PRIVATE_KEY_PASSPHRASE`: The private key passphrase

-   `SNOWFLAKE_DATABASE`: The target Snowflake database name

-   `SNOWFLAKE_SCHEMA`: The target Snowflake database schema name

-   `TOPIC_LIST`: The list of topics to sink divided by comma

-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format

-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format

-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format

-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

## Setup a Snowflake sink connector with Aiven Console

The following example demonstrates how to setup an Apache Kafka Connect®
Snowflake sink connector using the [Aiven
Console](https://console.aiven.io/).

### Define an Apache Kafka Connect® configuration file

Define the connector configurations in a file (we'll refer to it with
the name `snowflake_sink.json`) with the following content:

```json
{
    "name": "my-test-snowflake",
    "connector.class": "com.snowflake.kafka.connector.SnowflakeSinkConnector",
    "topics": "TOPIC_LIST",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter.basic.auth.credentials.source": "USER_INFO",
    "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "value.converter.basic.auth.credentials.source": "USER_INFO",
    "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "snowflake.url.name": "SNOWFLAKE_URL",
    "snowflake.user.name": "SNOWFLAKE_USERNAME",
    "snowflake.private.key": "SNOWFLAKE_PRIVATE_KEY",
    "snowflake.private.key.passphrase": "SNOWFLAKE_PRIVATE_KEY_PASSPHRASE",
    "snowflake.database.name": "SNOWFLAKE_DATABASE",
    "snowflake.schema.name": "SNOWFLAKE_SCHEMA"
}
```

The configuration file contains the following entries:

-   `name`: The connector name
-   `topics`: The list of Apache Kafka® topics to sink to the Snowflake
    database
-   `key.converter` and `value.converter`: defines the messages data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter translates
    messages from the Avro format. To retrieve the messages schema we
    use Aiven's [Karapace schema
    registry](https://github.com/aiven/karapace) as specified by the
    `schema.registry.url` parameter and related credentials.

:::note
The `key.converter` and `value.converter` sections define how the topic
messages will be parsed and needs to be included in the connector
configuration.

When using Avro as source data format, you need to set following
parameters

-   `value.converter.schema.registry.url`: pointing to the Aiven for
    Apache Kafka schema registry URL in the form of
    `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT` with the
    `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/snowflake-sink#connect_sink_snowflake_prereq).
-   `value.converter.basic.auth.credentials.source`: to the value
    `USER_INFO`, since you're going to login to the schema registry
    using username and password.
-   `value.converter.schema.registry.basic.auth.user.info`: passing the
    required schema registry credentials in the form of
    `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
    `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
    [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/snowflake-sink#connect_sink_snowflake_prereq).
:::

-   `snowflake.url.name`: The URL to access the Snowflake service
-   `snowflake.user.name`: The connection user
-   `snowflake.private.key`: The user's private key
-   `snowflake.private.key.passphrase`: The private key passphrase
-   `snowflake.database.name`: The Snowflake database name
-   `snowflake.schema.name`: The Snowflake schema name

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector, follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, the button is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Snowflake Sink**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `snowflake_sink.json` file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tab and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target Snowflake database.

    :::note
    You can also create connectors using the
    [Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
    :::

## Example: Create a Snowflake sink connector on a topic in Avro format

The example creates an Snowflake sink connector with the following
properties:

-   connector name: `my_snowflake_sink`

-   source topics: `test`

-   Snowflake database: `testdb`

-   Snowflake schema: `testschema`

-   Snowflake URL: `XX0000.eu-central-1.snowflakecomputing.com`

-   Snowflake user: `testuser`

-   User private key:

    ```
    XXXXXXXYYY
    ZZZZZZZZZZ
    KKKKKKKKKK
    YY
    ```

-   User private key passphrase: `password123`

The connector configuration is the following:

```json
{
    "name": "my_snowflake_sink",
    "connector.class": "com.snowflake.kafka.connector.SnowflakeSinkConnector",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter.basic.auth.credentials.source": "USER_INFO",
    "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "value.converter.basic.auth.credentials.source": "USER_INFO",
    "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "topics": "test",
    "snowflake.url.name": "XX0000.eu-central-1.snowflakecomputing.com",
    "snowflake.user.name": "testkafka",
    "snowflake.private.key": "XXXXXXXYYYZZZZZZZZZZKKKKKKKKKKYY",
    "snowflake.private.key.passphrase": "password123",
    "snowflake.database.name": "testdb",
    "snowflake.schema.name": "testschema"
}
```

## Example: Create a Snowflake sink connector on a topic with a JSON schema

If you have a topic named `iot_measurements` containing the following
data in JSON format, with a defined JSON schema:

```json
{
    "schema": {
        "type":"struct",
        "fields":[{
            "type":"int64",
            "optional": false,
            "field": "iot_id"
            },{
            "type":"string",
            "optional": false,
            "field": "metric"
            },{
            "type":"int32",
            "optional": false,
            "field": "measurement"
            }]
    },
    "payload":{ "iot_id":1, "metric":"Temperature", "measurement":14}
}
{
    "schema": {
        "type":"struct",
        "fields":[{
            "type":"int64",
            "optional": false,
            "field": "iot_id"
            },{
            "type":"string",
            "optional": false,
            "field": "metric"
            },{
            "type":"int32",
            "optional": false,
            "field": "measurement"
            }]
    },
    "payload":{"iot_id":2, "metric":"Humidity", "measurement":60}
}
```

:::note
Since the JSON schema needs to be defined in every message, there is a
big overhead to transmit the information. To achieve a better
performance in term of information-message ratio you should use the Avro
format together with the [Karapace schema
registry](https://karapace.io/) provided by Aiven
:::

You can sink the `iot_measurements` topic to Snowflake with the
following connector configuration, after replacing the placeholders for
`SNOWFLAKE_URL`, `SNOWFLAKE_USERNAME`, `SNOWFLAKE_PRIVATE_KEY`,
`SNOWFLAKE_PRIVATE_KEY_PASSPHRASE`, `SNOWFLAKE_DATABASE` and
`SNOWFLAKE_SCHEMA`:

```json
{
    "name": "my-test-snowflake-1",
    "connector.class": "com.snowflake.kafka.connector.SnowflakeSinkConnector",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "topics": "iot_measurements",
    "snowflake.url.name": "SNOWFLAKE_URL",
    "snowflake.user.name": "SNOWFLAKE_USERNAME",
    "snowflake.private.key": "SNOWFLAKE_PRIVATE_KEY",
    "snowflake.private.key.passphrase": "SNOWFLAKE_PRIVATE_KEY_PASSPHRASE",
    "snowflake.database.name": "SNOWFLAKE_DATABASE",
    "snowflake.schema.name": "SNOWFLAKE_SCHEMA"
}
```

The configuration file contains the following peculiarities:

-   `"topics": "iot_measurements"`: setting the topic to sink
-   `"value.converter": "org.apache.kafka.connect.json.JsonConverter"`:
    the message value is in JSON format with a schema, there is not key
    converter defined for the key since it's empty
