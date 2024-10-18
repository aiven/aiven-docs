---
title: Create a ClickHouse sink connector for Aiven for Apache Kafka®
sidebar_label: ClickHouse sink connector
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

The ClickHouse sink connector delivers data from Apache Kafka® topics to a ClickHouse database for efficient querying and analysis.

## Prerequisites

Before you begin, ensure that you have the following:

- An [Aiven for Apache Kafka® service](https://docs.aiven.io/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled or a [dedicated Aiven for Apache Kafka Connect® service](https://docs.aiven.io/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Access to a ClickHouse instance with the following connection details:
  - Hostname, port, and credentials.
  - A target database and table that have already been created in ClickHouse.

## Create a ClickHouse sink connector configuration file

Create a file named `clickhouse_sink_connector.json` with the following configuration:

```json
{
    "name": "clickhouse_sink_connector",
    "connector.class": "com.clickhouse.kafka.connect.ClickHouseSinkConnector",
    "tasks.max": "1",
    "topics": "test-topic",
    "hostname": "clickhouse-31d766f9-systest-project.avns.net",
    "port": "14420",
    "database": "default",
    "username": "avnadmin",
    "password": "mypassword",
    "ssl": "true",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.storage.StringConverter"
}
```

### Parameters

- `name`: Name of the connector.
- `topics`: Apache Kafka topics from which to pull data.
- `hostname`: ClickHouse service hostname.
- `port`: ClickHouse service port.
- `database`: Target database in ClickHouse.
- `username`: ClickHouse username for authentication.
- `password`: ClickHouse password for authentication.
- `ssl`: Set to `true` to enable SSL encryption.

For more configuration options, see the
[ClickHouse sink connector GitHub repository](https://github.com/ClickHouse/clickhouse-kafka-connect).

## Create the connector

<Tabs groupId="setup-method">
  <TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is already enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the sink connectors list, select **ClickHouse**, and click **Get started**.
1. On the **ClickHouse** connector page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `clickhouse_sink_connector.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To create the ClickHouse sink connector using the [Aiven CLI](/docs/tools/cli), run:

```bash
avn service connector create SERVICE_NAME @clickhouse_sink_connector.json
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `@clickhouse_sink_connector.json`: Path to the JSON configuration file.

</TabItem>
</Tabs>

## Example: Define and create a ClickHouse sink connector

This example shows how to create a ClickHouse sink connector with the
following properties:

- Connector name: `clickhouse_sink_connector`
- Apache Kafka topic: `test-topic`
- ClickHouse hostname: `clickhouse-31d766f9-systest-project.avns.net`
- ClickHouse port: `14420`
- Target database: `default`
- Username: `avnadmin`
- Password: `mypassword`
- SSL: Enabled

```json
{
    "name": "clickhouse_sink_connector",
    "connector.class": "com.clickhouse.kafka.connect.ClickHouseSinkConnector",
    "tasks.max": "1",
    "topics": "test-topic",
    "hostname": "clickhouse-31d766f9-systest-project.avns.net",
    "port": "14420",
    "database": "default",
    "username": "avnadmin",
    "password": "mypassword",
    "ssl": "true"
}
```

Once this configuration is saved in the `clickhouse_sink_connector.json` file, you can
create the connector using the Aiven Console or CLI, and verify that data from the
Apache Kafka topic `test-topic` is successfully delivered to your ClickHouse instance.

## Limitations

The ClickHouse sink connector has the following limitations related to data consistency
and exactly-once delivery:

1. **No exactly-once delivery after restore**: The connector does not guarantee
   exactly-once delivery after restoring from a backup, powering off, or forking a
   service. This may result in duplicate records in ClickHouse.

1. **Manual removal of duplicate records**: If duplicate records occur, remove them by
   running the following command:

   ```sql
   OPTIMIZE TABLE table_name DEDUPLICATE;
   ```

    Make sure all potential duplicates are written before running the command to keep
    data consistent in ClickHouse."
