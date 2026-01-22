---
title: Create and configure a Snowflake sink connector for Apache Kafka®
sidebar_label: Snowflake sink connector
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

The Apache Kafka Connect® Snowflake sink connector moves data from Aiven for Apache Kafka® topics to a Snowflake database. It requires configuration in both Snowflake and Aiven for Apache Kafka.

## Prerequisites

- An Aiven for Apache Kafka service with
  [Apache Kafka Connect enabled](/docs/products/kafka/kafka-connect/howto/enable-connect),
  or a [dedicated Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- Access to the target Snowflake account with privileges to create users, roles, and
  schemas
- OpenSSL installed locally to generate key pairs
- Collect the following connection details:

  - `SNOWFLAKE_URL`: In the format `ACCOUNT_LOCATOR.REGION_ID.snowflakecomputing.com`

    :::tip
    To retrieve your account locator and region ID, run the following in the Snowflake
    worksheet:

    ```sql
    SELECT CURRENT_ACCOUNT(), CURRENT_REGION();
    ```

    :::

  - `SNOWFLAKE_USERNAME`: The user created for the connector
  - `SNOWFLAKE_PRIVATE_KEY`: The private key for the user
  - `SNOWFLAKE_PRIVATE_KEY_PASSPHRASE`: The key passphrase
  - `SNOWFLAKE_DATABASE`: The target database
  - `SNOWFLAKE_SCHEMA`: The target schema
  - `TOPIC_LIST`: Comma-separated list of Kafka topics to sink

  If using Avro format:

  - `APACHE_KAFKA_HOST`
  - `SCHEMA_REGISTRY_PORT`
  - `SCHEMA_REGISTRY_USER`
  - `SCHEMA_REGISTRY_PASSWORD`

:::note
For a full list of configuration options, see
the [Snowflake Kafka Connector documentation](https://docs.snowflake.com/en/user-guide/kafka-connector).
:::

## Configure Snowflake

Set up Snowflake to authenticate the connector using key pair authentication.

### Generate a key pair

Use OpenSSL to generate a 2048-bit RSA key pair:

```bash
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8
openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
```

- `rsa_key.p8` contains the private key, secured with a passphrase.
- `rsa_key.pub` contains the public key.

### Create a user

1. Open the Snowflake UI and go to the **Worksheets** tab.

1. Use a role with `SECURITYADMIN` or `ACCOUNTADMIN` privileges.

1. Create a Snowflake user for the Aiven connector. Run the following SQL command:

   ```sql
   CREATE USER aiven;
   ```

1. Copy the contents of `rsa_key.pub`, excluding the `-----BEGIN` and `-----END` lines.
   Remove any line breaks.

   :::note
   When copying the public key, exclude the `-----BEGIN PUBLIC KEY-----` and
   `-----END PUBLIC KEY-----` lines. Remove all line breaks so the key is on a single
   line.
   :::

1. Set the public key for the user:

   ```sql
   ALTER USER aiven SET RSA_PUBLIC_KEY='PASTE_PUBLIC_KEY_HERE';
   ```

### Create a role and assign it to the user

1. Create a role for the connector:

   ```sql
   CREATE ROLE aiven_snowflake_sink_connector_role;
   ```

1. Grant the role to the `aiven` user:

   ```sql
   GRANT ROLE aiven_snowflake_sink_connector_role TO USER aiven;
   ```

1. Set the role as the user's default:

   ```sql
   ALTER USER aiven SET DEFAULT_ROLE = aiven_snowflake_sink_connector_role;
   ```

### Grant privileges on the target database and schema

The connector writes data to tables in a specific schema within a Snowflake database.
Grant the necessary privileges to the role you created.

1. In the Snowflake UI, open the **Worksheets** tab.

1. Use a role with `SECURITYADMIN` or `ACCOUNTADMIN` privileges.

1. Replace `TESTDATABASE` and `TESTSCHEMA` with your database and schema names, then run
   the following SQL commands:

   ```sql
   GRANT USAGE ON DATABASE TESTDATABASE TO ROLE aiven_snowflake_sink_connector_role;
   GRANT USAGE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
   GRANT CREATE TABLE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
   GRANT CREATE STAGE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
   GRANT CREATE PIPE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
   ```

These privileges allow the connector to access the database, write to the schema, and
manage tables, stages, and pipes.

## Create a Snowflake sink connector configuration

To configure the Snowflake sink connector, define a JSON file (for example,
`snowflake_sink.json`) with the required connection and converter settings. This helps
organize your configuration and makes it easier to use in the Aiven Console or CLI.

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

The configuration file includes the following parameters:

- `name`: Specifies the connector name.
- `topics`: Lists the Apache Kafka topics to write to the Snowflake database.
- `key.converter` and `value.converter`: Specify the format of messages in the Kafka
   topic. To use Avro, set these to `io.confluent.connect.avro.AvroConverter`.

To retrieve the message schema, use Aiven's
[Karapace schema registry](https://github.com/aiven/karapace). Set the following
parameters when using Avro as the message format:

- `key.converter.schema.registry.url` and `value.converter.schema.registry.url`: Specify
  the schema registry URL in the format `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`.
  Replace `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` with the values retrieved
  in the [prerequisites section](#prerequisites).
- `key.converter.basic.auth.credentials.source` and
  `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to enable basic
  authentication using a username and password.
- `key.converter.schema.registry.basic.auth.user.info` and
 `value.converter.schema.registry.basic.auth.user.info`: Specify the schema registry
 credentials in the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`. Replace
 these values with the credentials retrieved in the [prerequisites section](#prerequisites).

These converter parameters are required for parsing Avro messages from the Kafka topics.

Snowflake connection parameters:

- `snowflake.url.name`: Specifies the URL of the Snowflake service.
- `snowflake.user.name`: Specifies the Snowflake username.
- `snowflake.private.key`: Specifies the private key used to authenticate the Snowflake user.
- `snowflake.private.key.passphrase`: Specifies the passphrase for the private key.
- `snowflake.database.name`: Specifies the target Snowflake database.
- `snowflake.schema.name`: Specifies the target schema within the database.

## Create a Snowflake sink connector

<Tabs groupId="setup-method">
  <TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is already enabled on the service.
   If not, click **Enable connector on this service**.

   To enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the Service management section, click <ConsoleLabel name="Actions"/> >
      **Enable Kafka Connect**.
1. In the list of sink connectors, click **Get started** under **Snowflake Sink**.
1. On the **Snowflake Sink** connector page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `snowflake_sink.json` file into the text box.
   Replace all placeholders with actual values.
1. Click **Apply**.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data from the Apache Kafka topics appears in the target Snowflake database.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

To create a Snowflake sink connector using the [Aiven CLI](/docs/tools/cli/service-cli),
run:

```bash
avn service connector create SERVICE_NAME @snowflake_sink.json
```

Parameters:

- `SERVICE_NAME`: The name of your Aiven for Apache Kafka service.
- `@snowflake_sink.json`: The path to your connector configuration file.

</TabItem>
</Tabs>

## Examples

### Create a Snowflake sink connector for an Avro topic

This example creates a Snowflake sink connector with the following settings:

- Connector name: `my_snowflake_sink`
- Source topic: `test`
- Snowflake database: `testdb`
- Snowflake schema: `testschema`
- Snowflake URL: `XX0000.eu-central-1.snowflakecomputing.com`
- Snowflake user: `testuser`
- Private key:

  ```text
  XXXXXXXYYY
  ZZZZZZZZZZ
  KKKKKKKKKK
  YY
  ```

- Private key passphrase: `password123`

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

### Create a Snowflake sink connector for a topic with a JSON schema

This example sinks data from a Kafka topic named `iot_measurements` to Snowflake. The
topic contains messages in JSON format, each with an inline schema.

Sample messages:

```json
{
  "schema": {
    "type": "struct",
    "fields": [
      { "type": "int64", "optional": false, "field": "iot_id" },
      { "type": "string", "optional": false, "field": "metric" },
      { "type": "int32", "optional": false, "field": "measurement" }
    ]
  },
  "payload": { "iot_id": 1, "metric": "Temperature", "measurement": 14 }
}
{
  "schema": {
    "type": "struct",
    "fields": [
      { "type": "int64", "optional": false, "field": "iot_id" },
      { "type": "string", "optional": false, "field": "metric" },
      { "type": "int32", "optional": false, "field": "measurement" }
    ]
  },
  "payload": { "iot_id": 2, "metric": "Humidity", "measurement": 60 }
}
```

:::note
JSON messages must include the full schema in each record. This results in additional
overhead. For better performance, use the Avro format with
the [Karapace schema registry](https://karapace.io/) provided by Aiven.
:::

You can configure the Snowflake sink connector using the following JSON configuration.
Replace the placeholders with your actual values.

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

Details about the configuration:

- `"topics": "iot_measurements"`: Specifies the Kafka topic to write to Snowflake.
- `"value.converter": "org.apache.kafka.connect.json.JsonConverter"`: Parses message
  values from JSON with an inline schema.
- No key converter is defined because the message key is empty.
