---
title: Create a Stream Reactor sink connector from Apache Kafka® to Redis®*
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Note from "@site/static/includes/streamreactor-compatibility-note.md"

The Redis®\* Stream Reactor sink connector enables you to move data from an Aiven for Apache Kafka® cluster to a Redis®\* database.
It uses [KCQL transformations](https://docs.lenses.io/connectors/sink/redis) to filter
and map topic data before sending it to Redis.


:::important
In version 4.2.0 of the Redis Stream Reactor sink connector, a known issue with the
`GEOADD` command may cause exceptions during initialization under specific configurations.

For more information, see the
[GitHub issue](https://github.com/lensesio/stream-reactor/issues/990).
:::

<Note/>

## Prerequisites {#connect_redis_lenses_sink_prereq}

- An Aiven for Apache Kafka service
  [with Apache Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Gather the following information for the target Redis database:

  - `REDIS_HOSTNAME`: The Redis hostname.
  - `REDIS_PORT`: The Redis port.
  - `REDIS_PASSWORD`: The Redis password.
  - `REDIS_SSL`: Set to `true` or `false`, depending on your SSL setup.
  - `TOPIC_LIST`: A comma-separated list of Kafka topics to sink.
  - `KCQL_TRANSFORMATION`: A KCQL statement to map topic fields to Redis cache entries. Use the following format:

    ```sql
    INSERT INTO REDIS_CACHE
    SELECT LIST_OF_FIELDS
    FROM APACHE_KAFKA_TOPIC
    ```

  - `APACHE_KAFKA_HOST`: The Apache Kafka host. Required only when using Avro as the
    data format.
  - `SCHEMA_REGISTRY_PORT`: The schema registry port. Required only when using Avro.
  - `SCHEMA_REGISTRY_USER`: The schema registry username. Required only when using Avro.
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password. Required only when using Avro.

:::note
If you are using Aiven for Caching and Aiven for Apache Kafka, get all required
connection details, including schema registry information, from the
**Connection information** section on the <ConsoleLabel name="overview"/> page.

As of version 3.0, Aiven for Apache Kafka uses Karapace as the schema registry and
no longer supports the Confluent Schema Registry.
:::

## Create a connector configuration file

Create a file named `redis_sink.json` and add the following configuration:

```json
{
  "name": "CONNECTOR_NAME",
  "connector.class": "com.datamountaineer.streamreactor.connect.redis.sink.RedisSinkConnector",
  "topics": "TOPIC_LIST",
  "connect.redis.host": "REDIS_HOSTNAME",
  "connect.redis.port": "REDIS_PORT",
  "connect.redis.password": "REDIS_PASSWORD",
  "connect.redis.ssl.enabled": "REDIS_SSL",
  "connect.redis.kcql": "KCQL_TRANSFORMATION",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD"
}
```

Parameters:

- `name`: The connector name. Replace `CONNECTOR_NAME` with your desired name.
- `connect.redis.*`: Redis connection parameters collected in the
  [prerequisite step](#connect_redis_lenses_sink_prereq).
- `key.converter` and `value.converter`: Define the message data format in the
  Kafka topic. This example uses `io.confluent.connect.avro.AvroConverter` to translate
  messages in Avro format. The schema is retrieved from Aiven's
  [Karapace schema registry](https://github.com/aiven/karapace) using the
  `schema.registry.url` and related credentials.

:::note
The `key.converter` and `value.converter` fields define how Kafka messages are parsed
and must be included in the configuration.

When using Avro as the source format, set the following:

- `value.converter.schema.registry.url`: Use the Aiven for Apache Kafka schema registry
  URL in the format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`.
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO`, which means
  authentication is done using a username and password.
- `value.converter.schema.registry.basic.auth.user.info`: Provide the schema registry
  credentials in the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`.

You can retrieve these values from the
[prerequisite step](#connect_redis_lenses_sink_prereq).
:::

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>


1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the sink connectors list, select **Redis Sink Connector**, and click **Get started**.
1. On the **Stream Reactor Redis Sink** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `redis_sink.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data is written to the Redis target database.
</TabItem>
<TabItem value="cli" label="Aiven CLI">

To create the connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @redis_sink.json
```

Replace:

* `SERVICE_NAME`: Your Kafka or Kafka Connect service name.
* `@redis_sink.json`: Path to your configuration file.

</TabItem>
</Tabs>

## Sink topic data to Redis

The following example shows how to sink data from a Kafka topic to a Redis database.
If your Kafka topic `students` contains the following data:

```json
{"id":1, "name":"carlo", "age": 77}
{"id":2, "name":"lucy", "age": 55}
{"id":3, "name":"carlo", "age": 33}
{"id":2, "name":"lucy", "age": 21}
```

To write this data to Redis, use the following connector configuration:

```json
{
  "name": "my-redis-sink",
  "connector.class": "com.datamountaineer.streamreactor.connect.redis.sink.RedisSinkConnector",
  "connect.redis.host": "REDIS_HOSTNAME",
  "connect.redis.port": "REDIS_PORT",
  "connect.redis.password": "REDIS_PASSWORD",
  "connect.redis.ssl.enabled": "REDIS_SSL",
  "topics": "students",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "false",
  "connect.redis.kcql": "INSERT INTO students- SELECT * FROM students PK id"
}
```

Replace all placeholder values (such as `REDIS_HOSTNAME`, `REDIS_PORT`, and `REDIS_PASSWORD`)
with your actual Redis connection details.

This configuration does the following:

- `"topics": "students"`: Specifies the Kafka topic to sink.
- Connection settings (`connect.redis.*`): Provide the Redis host, port, password, and
  SSL setting.
- `"value.converter"` and `"value.converter.schemas.enable"`: Set the message format.
  The topic uses raw JSON without a schema.
- `"connect.redis.kcql"`: Defines the insert logic. Each Kafka message is written
  as a key-value pair in Redis. The key is built from the `id` field and prefixed
  with `students-`.

After creating the connector, check your Redis database. You should see the following entries:

```text
1. "students-1" containing "{\"name\":\"carlo\",\"id\":1,\"age\":77}"
2. "students-2" containing "{\"name\":\"lucy\",\"id\":2,\"age\":21}"
3. "students-3" containing "{\"name\":\"carlo\",\"id\":3,\"age\":33}"
```

Only three keys are present because two Kafka messages shared the same `"id": 2`.
Redis overwrites entries that use the same key.
