---
title: Create and configure a Snowflake sink connector for Apache Kafka®
sidebar_label: Snowflake sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

<!-- markdownlint-disable-next-line MD013 -->
The Apache Kafka Connect® Snowflake sink connector moves data from Aiven for Apache Kafka® topics to a Snowflake database.
Configure access in Snowflake before creating the connector in Aiven.

Aiven provides two separate connectors:

- **Snowflake Sink**: version 3.x, which uses the
  `com.snowflake.kafka.connector.SnowflakeSinkConnector` class.
- **Snowflake v4 Sink**: version 4.2.1, which uses the
  `com.snowflake.kafka.connector.SnowflakeStreamingSinkConnector` class and the Snowpipe
  Streaming high-performance architecture.

Aiven doesn't automatically upgrade existing Snowflake Sink connectors to Snowflake v4
Sink. Version 4.x isn't backward compatible with 3.x. To move an existing connector to
4.x, review [Migrate from 3.x to 4.x](#migrate-from-3x-to-4x) before creating the
replacement.

## Prerequisites

- An Aiven for Apache Kafka service with
  [Apache Kafka Connect enabled](/docs/products/kafka/kafka-connect/howto/enable-connect),
  or a
  [dedicated Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Access to a Snowflake account with permissions to create users and roles and grant
  access to the target database and schema.
- OpenSSL installed locally to generate a key pair.
- The connection details listed in the following section.

### Connection details

Collect the following values:

- `SNOWFLAKE_URL`: your Snowflake account URL in the format
  `ACCOUNT_LOCATOR.REGION_ID.snowflakecomputing.com`
- `SNOWFLAKE_USERNAME`: the Snowflake user created for the connector
- `SNOWFLAKE_PRIVATE_KEY`: the private key for the user
- `SNOWFLAKE_PRIVATE_KEY_PASSPHRASE`: the private key passphrase
- `SNOWFLAKE_DATABASE`: the target database
- `SNOWFLAKE_SCHEMA`: the target schema
- `TOPIC_LIST`: a comma-separated list of Kafka topics

For Avro messages, also collect the following values:

- `APACHE_KAFKA_HOST`: the Aiven for Apache Kafka service host
- `SCHEMA_REGISTRY_PORT`: the Schema Registry port
- `SCHEMA_REGISTRY_USER`: the Schema Registry user
- `SCHEMA_REGISTRY_PASSWORD`: the Schema Registry password

:::tip[Tip]
To retrieve the Snowflake account locator and region, run the following in a Snowflake
worksheet:

```sql
SELECT CURRENT_ACCOUNT(), CURRENT_REGION();
```

:::

For more information about configuration options, see the
[Snowflake Kafka Connector documentation](https://docs.snowflake.com/en/user-guide/kafka-connector).

## Configure Snowflake

Set up key-pair authentication, create a Snowflake user and role, and grant access to the
target database and schema.

### Generate a key pair

Use OpenSSL to generate a 2048-bit RSA key pair:

```bash
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8
openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
```

- `rsa_key.p8` contains the passphrase-protected private key.
- `rsa_key.pub` contains the public key.

### Create a user

1. Open **Worksheets** in Snowflake.
1. Use a role with privileges to create users, such as `SECURITYADMIN` or `ACCOUNTADMIN`.
1. Create a user for the connector:

   ```sql
   CREATE USER aiven;
   ```

1. Copy the contents of `rsa_key.pub`, excluding the `-----BEGIN PUBLIC KEY-----` and
   `-----END PUBLIC KEY-----` lines. Remove line breaks.
1. Set the user's public key:

   ```sql
   ALTER USER aiven SET RSA_PUBLIC_KEY='PASTE_PUBLIC_KEY_HERE';
   ```

### Create a role and assign it to the user

1. Create a role:

   ```sql
   CREATE ROLE aiven_snowflake_sink_connector_role;
   ```

1. Grant the role to the connector user:

   ```sql
   GRANT ROLE aiven_snowflake_sink_connector_role TO USER aiven;
   ```

1. Set the user's default role:

   ```sql
   ALTER USER aiven SET DEFAULT_ROLE = aiven_snowflake_sink_connector_role;
   ```

### Grant privileges on the target database and schema

Replace `TESTDATABASE` and `TESTSCHEMA` with your Snowflake database and schema names. Use
a role authorized to grant the privileges.

<Tabs groupId="snowflake-version">
<TabItem value="3x" label="Version 3.x" default>

Version 3.x requires privileges for tables, stages, and pipes:

```sql
GRANT USAGE ON DATABASE TESTDATABASE TO ROLE aiven_snowflake_sink_connector_role;
GRANT USAGE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
GRANT CREATE TABLE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
GRANT CREATE STAGE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
GRANT CREATE PIPE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
```

</TabItem>
<TabItem value="4x" label="Version 4.x">

Version 4.x has different privilege requirements than 3.x. Grant the following
privileges on the database and schema:

```sql
GRANT USAGE ON DATABASE TESTDATABASE TO ROLE aiven_snowflake_sink_connector_role;
GRANT USAGE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
```

If the connector creates tables, or creates pipes in the default pipe mode, also grant
the corresponding privileges:

```sql
GRANT CREATE TABLE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
GRANT CREATE PIPE ON SCHEMA TESTDATABASE.TESTSCHEMA TO ROLE aiven_snowflake_sink_connector_role;
```

The connector always requires `INSERT` on destination tables. For an existing table,
grant it explicitly:

```sql
GRANT INSERT ON TABLE TESTDATABASE.TESTSCHEMA.TARGET_TABLE
  TO ROLE aiven_snowflake_sink_connector_role;
```

If you use a user-defined pipe, grant `OPERATE` on the existing pipe. Snowflake also
recommends granting `CREATE VIEW` on the schema for error table features.

Grant privileges directly to the connector role. Snowflake doesn't support inheriting them
through a role hierarchy. The 4.x requirements don't include `CREATE STAGE`.

For conditional grants and privilege details, see
[Configure Snowflake for connector 4.x](https://docs.snowflake.com/en/user-guide/kafka-connector/setup-snowflake).

</TabItem>
</Tabs>

## Create a Snowflake sink connector configuration

Create a JSON file such as `snowflake_sink.json`. Choose the example for the connector
you're creating, then replace the placeholders with your connection details.

The following examples read Avro messages using Aiven's Karapace Schema Registry.

<Tabs groupId="snowflake-version">
<TabItem value="3x" label="Version 3.x" default>

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

</TabItem>
<TabItem value="4x" label="Version 4.x">

This example creates a new 4.2.1 connector. It isn't a migration configuration.

```json
{
  "name": "my-test-snowflake",
  "connector.class": "com.snowflake.kafka.connector.SnowflakeStreamingSinkConnector",
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
  "snowflake.schema.name": "SNOWFLAKE_SCHEMA",
  "snowflake.role.name": "aiven_snowflake_sink_connector_role",
  "snowflake.validation": "client_side",
  "snowflake.streaming.validate.compatibility.with.classic": "false"
}
```

For new 4.x connectors, set `snowflake.streaming.validate.compatibility.with.classic`
to `false` to disable migration validation. By default, the connector validates the
migration-related properties at startup and fails to start unless you set them
explicitly.

The example uses `client_side` validation to determine column types from the Avro
schema.

Version 4.x enables schematization by default, which maps record fields to individual
Snowflake columns. To retain the 3.x layout with `RECORD_CONTENT` and `RECORD_METADATA`
columns, set `snowflake.enable.schematization` to `false`.

:::important[Important]
Don't use this configuration unchanged if you're migrating from 3.x. Review the
required compatibility and offset migration settings in the
[Snowflake migration guide](https://docs.snowflake.com/en/user-guide/kafka-connector/migrate-v3-to-v4)
first.
:::

</TabItem>
</Tabs>

### Configuration parameters

Connector and converter settings:

- `name`: Unique connector name
- `connector.class`: Connector implementation for the selected version
- `topics`: Comma-separated topics to load into Snowflake
- `key.converter` and `value.converter`: Converters for Kafka message keys and values. The
  example uses `io.confluent.connect.avro.AvroConverter`.

Schema Registry settings for Avro:

- `key.converter.schema.registry.url` and `value.converter.schema.registry.url`: Schema
  Registry URL in the form `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`
- `key.converter.basic.auth.credentials.source` and
  `value.converter.basic.auth.credentials.source`: Credentials source for basic
  authentication, set to `USER_INFO`
- `key.converter.schema.registry.basic.auth.user.info` and
  `value.converter.schema.registry.basic.auth.user.info`: Schema Registry credentials in
  the form `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`

Snowflake connection settings:

- `snowflake.url.name`: Snowflake account URL
- `snowflake.user.name`: Snowflake user for ingestion
- `snowflake.private.key`: Private key used to authenticate the user
- `snowflake.private.key.passphrase`: Passphrase protecting the private key
- `snowflake.database.name`: Target database
- `snowflake.schema.name`: Target schema

Additional 4.x settings shown in the example:

- `snowflake.role.name`: Role the connector uses to write data. The example uses the
  role you created in [Configure Snowflake](#configure-snowflake).
- `snowflake.validation`: Validation mode. Use `client_side` to validate against schema
  types before ingestion. The 4.x default is `server_side`.
- `snowflake.streaming.validate.compatibility.with.classic`: Migration-related
  compatibility checks. Set to `false` for new deployments, but not automatically for
  migrations.

For all 4.x settings, see
[Snowflake connector configuration](https://docs.snowflake.com/en/user-guide/kafka-connector/setup-kafka).

## Create a Snowflake sink connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), click your Aiven for Apache Kafka
   or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="manage stream" /> > **Connectors**.
1. Click **Create connector** if Apache Kafka Connect is already enabled on the service.
   If not, click **Enable connector on this service**.

   To enable connectors:

   1. In the sidebar, click <ConsoleLabel name="Service settings"/>.
   1. In the **Service management** section, click <ConsoleLabel name="Actions"/> >
      **Enable Kafka Connect**.
1. In the list of sink connectors, find **Snowflake Sink** for 3.x or
   **Snowflake v4 Sink** for 4.x, then click **Get started**.
1. On the connector page, go to the **Common** tab.
1. Locate **Connector configuration** and click <ConsoleLabel name="edit"/>.
1. Paste the configuration for the selected version from your `snowflake_sink.json` file.
   Replace all placeholders with actual values.
1. Click **Apply**.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="manage stream" /> >
   **Connectors** page.
1. Confirm that data from the Apache Kafka topics appears in the target Snowflake
   database.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Create the connector using the [Aiven CLI](/docs/tools/cli/service-cli):

```bash
avn service connector create SERVICE_NAME @snowflake_sink.json
```

Replace the following:

- `SERVICE_NAME`: name of your Aiven for Apache Kafka or Aiven for Apache Kafka
  Connect service
- `@snowflake_sink.json`: path to the JSON configuration for the selected connector
  version

</TabItem>
</Tabs>

## Migrate from 3.x to 4.x

Snowflake connector 4.x isn't backward compatible with 3.x and uses the Snowpipe
Streaming high-performance architecture.

Aiven provides **Snowflake Sink** (3.x) and **Snowflake v4 Sink** (4.x) as separate
connectors. Existing 3.x connectors aren't automatically upgraded to 4.x.

Before you migrate:

1. Review the
   [Snowflake migration guide](https://docs.snowflake.com/en/user-guide/kafka-connector/migrate-v3-to-v4)
   for breaking changes, configuration requirements, and migration steps.
1. Check whether your existing 3.x connector uses Snowpipe or Snowpipe Streaming. The
   offset migration procedure depends on the ingestion method.
1. Prepare a new configuration that uses the
   `com.snowflake.kafka.connector.SnowflakeStreamingSinkConnector` class and the
   migration settings for your ingestion method.
1. Test the migration procedure on a non-production service before you migrate
   production workloads.

<!-- TODO: Confirm with SME that deleting a connector keeps the consumer group offsets,
and that the name can be reused for a different connector type. -->
To preserve offsets, Snowflake's migration procedure requires the same connector name
for 3.x and 4.x. Delete the 3.x connector before you create the 4.x connector, and
follow Snowflake's instructions for your ingestion method.

:::important[Important]
Ingestion stops from the time you delete the 3.x connector until the 4.x connector
starts. Plan the migration accordingly.
:::

## Examples

The following examples show how to configure the Snowflake sink connector for Avro and
JSON messages. The Avro example covers both versions. The JSON schema example shows
Snowflake Sink 3.x only. Version 4.x uses a different class and can produce a different
Snowflake table structure by default, so review the
[4.x configuration](#create-a-snowflake-sink-connector-configuration) before you adapt
the JSON example.

### Create a Snowflake sink connector for an Avro topic

This example uses:

- Connector name: `my_snowflake_sink`
- Kafka topic: `test`
- Snowflake database: `testdb`
- Snowflake schema: `testschema`
- Snowflake URL: `XX0000.eu-central-1.snowflakecomputing.com`
- Snowflake user: `testkafka`

Replace the private key, passphrase, and Schema Registry placeholders with your own
values.

<Tabs groupId="snowflake-version">
<TabItem value="3x" label="Version 3.x" default>

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
  "snowflake.private.key": "SNOWFLAKE_PRIVATE_KEY",
  "snowflake.private.key.passphrase": "SNOWFLAKE_PRIVATE_KEY_PASSPHRASE",
  "snowflake.database.name": "testdb",
  "snowflake.schema.name": "testschema"
}
```

</TabItem>
<TabItem value="4x" label="Version 4.x">

```json
{
  "name": "my_snowflake_sink",
  "connector.class": "com.snowflake.kafka.connector.SnowflakeStreamingSinkConnector",
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
  "snowflake.private.key": "SNOWFLAKE_PRIVATE_KEY",
  "snowflake.private.key.passphrase": "SNOWFLAKE_PRIVATE_KEY_PASSPHRASE",
  "snowflake.database.name": "testdb",
  "snowflake.schema.name": "testschema",
  "snowflake.role.name": "aiven_snowflake_sink_connector_role",
  "snowflake.validation": "client_side",
  "snowflake.streaming.validate.compatibility.with.classic": "false"
}
```

</TabItem>
</Tabs>

### Create a Snowflake sink connector 3.x for a topic with a JSON schema

This example reads JSON messages from the `iot_measurements` topic. Each message includes
an inline schema.

Sample message:

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
```

Another message:

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
  "payload": { "iot_id": 2, "metric": "Humidity", "measurement": 60 }
}
```

:::note[Note]
Each JSON record includes a full schema, which adds overhead. To avoid repeating the
schema, use Avro with Aiven's [Karapace Schema Registry](https://karapace.io/).
:::

Create a connector configuration and replace the placeholders with your values:

```json
{
  "name": "my-test-snowflake-1",
  "connector.class": "com.snowflake.kafka.connector.SnowflakeSinkConnector",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter.schemas.enable": "true",
  "topics": "iot_measurements",
  "snowflake.url.name": "SNOWFLAKE_URL",
  "snowflake.user.name": "SNOWFLAKE_USERNAME",
  "snowflake.private.key": "SNOWFLAKE_PRIVATE_KEY",
  "snowflake.private.key.passphrase": "SNOWFLAKE_PRIVATE_KEY_PASSPHRASE",
  "snowflake.database.name": "SNOWFLAKE_DATABASE",
  "snowflake.schema.name": "SNOWFLAKE_SCHEMA"
}
```

- `topics`: Kafka topic the connector writes to Snowflake.
- `value.converter`: Kafka Connect's JSON converter
- `value.converter.schemas.enable`: Reads the inline schema and payload. The example sets
  this explicitly for clarity.
- The configuration has no key converter because the example messages have no keys.
