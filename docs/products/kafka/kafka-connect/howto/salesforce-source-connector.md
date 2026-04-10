---
title: Create a Salesforce source connector for Aiven for Apache Kafka®
early: true
sidebar_label: Salesforce source connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The Salesforce source connector retrieves data from Salesforce and writes it to Apache Kafka® topics.
It retrieves data in batches and tracks progress using the `LastModifiedDate` field.
The connector uses Salesforce Bulk API 2.0 to run SOQL (Salesforce Object Query Language)
queries on a polling schedule.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Aiven for Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- A Salesforce connected app configured for the client credentials flow with
  these OAuth scopes:
  - `api`: Grants access to Salesforce data using REST and Bulk APIs.
  - `refresh_token` / `offline_access`: Allows the connector to maintain session access
    without user interaction.
- Complete client credentials setup per
  [Configure the client credentials flow for external client apps](https://help.salesforce.com/s/articleView?id=xcloud.configure_client_credentials_flow_for_external_client_apps.htm&type=5)
  in the Salesforce documentation. From the connected app, copy:
  - `salesforce.client.id`: Consumer Key from your connected app.
  - `salesforce.client.secret`: Consumer Secret from your connected app.
  - `salesforce.oauth.uri`: The OAuth token endpoint.
  - `salesforce.uri`: Base URL of your Salesforce instance.
- SOQL queries for the Salesforce objects and fields to ingest.
- The `topic.prefix` or `topic` setting.
  - Use `topic.prefix` to write records to object-specific Apache Kafka topics.
    For more information, see [Topic naming](#topic-naming).
  - Use `topic` to write all records to a single topic. If you set `topic`, it
    overrides `topic.prefix`.

For more information about how the connector works, see the
[Salesforce connector for Apache Kafka documentation](https://github.com/aiven-open/salesforce-connector-for-apache-kafka/blob/main/README.md).

## Define SOQL queries

SOQL (Salesforce Object Query Language) is a SQL-like query language used to retrieve
data from Salesforce objects.

Set the `salesforce.bulk.api.queries` parameter to one or more SOQL queries, separated
by semicolons (`;`).

Each query must meet the following requirements:

- Include `LastModifiedDate` in the `SELECT` clause. This field is required for offset
  tracking and incremental reads.
- Do not include `LastModifiedDate` in the `WHERE` clause. The connector applies
  this filter internally.
- Do not include `ORDER BY` in SOQL queries. The connector applies ordering
  internally.

These requirements apply to both standard and custom objects.

Example:

```sql
SELECT Id, Name, LastModifiedDate FROM Account;
SELECT Id, FirstName, LastModifiedDate FROM Contact;
```

## Topic naming

By default, the connector writes records to topics using this format:

```text
<topic.prefix>.bulkApi.<objectName>
```

The `bulkApi` segment indicates that records are retrieved using the Salesforce Bulk API.

For example, if `topic.prefix` is `salesforce.test` and the query targets the
`Account` object, records are written to:

```text
salesforce.test.bulkApi.Account
```

If you set `topic`, the connector writes all records to that topic, regardless of
the number of SOQL queries or objects. When `topic` is set, it overrides
`topic.prefix` and the per-object naming pattern.

## Delivery semantics and duplicates

:::caution
The connector provides at-least-once delivery. Duplicate records can occur.
:::

If the connector restarts due to uncommitted offsets, an error, or a configuration
change, it reads again from the last `LastModifiedDate` it processed and includes
all records with that timestamp. This ensures that if a bulk update in Salesforce
assigns the same `LastModifiedDate` to many records, none are skipped. As a result,
some records can be written to Kafka more than once if they were already sent
before the restart.

Duplicates can also occur when:

- A record is updated and its `LastModifiedDate` changes.
- A field not included in the SOQL query is updated, which still updates
  `LastModifiedDate`.

To remove duplicates downstream, use the Salesforce `Id` field as the unique record
key.

## Limitations

- Single task only: `tasks.max` must be `1`. If you set a value greater than `1`,
  configuration validation fails. More than one task is not supported due to timing
  issues and offset conflicts.
- Polling-based ingestion: The connector does not stream changes in real time.
- At-least-once delivery: Duplicate records can occur. For more information, see
  [Delivery semantics and duplicates](#delivery-semantics-and-duplicates).
- Salesforce Bulk API quota: Each polling cycle consumes API quota. Use
  `salesforce.soql.query.wait` to control how long the connector waits before
  running queries again. The default is 5 minutes (300 seconds) and the maximum is
  1 week (604800 seconds). Use longer intervals when data changes are infrequent
  to reduce API usage.

## Create a Salesforce source connector configuration file

Create a file named `salesforce_source_connector.json` and add the following
configuration:

```json
{
  "name": "salesforce-source",
  "connector.class": "io.aiven.kafka.connect.salesforce.source.SalesforceSourceConnector",
  "tasks.max": 1,
  "key.converter": "org.apache.kafka.connect.storage.StringConverter",
  "value.converter": "org.apache.kafka.connect.storage.StringConverter",
  "topic.prefix": "salesforce.test",
  "max.retries": 3,
  "salesforce.api.version": "v65.0",
  "salesforce.client.id": "YOUR_CLIENT_ID",
  "salesforce.client.secret": "YOUR_CLIENT_SECRET",
  "salesforce.oauth.uri": "https://login.salesforce.com/services/oauth2/token",
  "salesforce.uri": "https://YOUR_INSTANCE.my.salesforce.com",
  "salesforce.bulk.api.queries": "SELECT Id, Name, LastModifiedDate FROM Account;",
  "salesforce.soql.query.wait": 3600,
  "salesforce.status.check.wait": 120
}
```

Parameters:

- `name`: A unique name for the connector.
- `connector.class`: The Java class for the connector,
  `io.aiven.kafka.connect.salesforce.source.SalesforceSourceConnector`.
- `tasks.max`: Must be `1`. Values greater than `1` fail validation. See
  [Limitations](#limitations).
- `key.converter` and `value.converter`: Set both to
  `org.apache.kafka.connect.storage.StringConverter`. See
  [Output record format](#output-record-format).
- `topic.prefix`: Prefix for Apache Kafka topic names when you do not set `topic`.
  For more information, see [Topic naming](#topic-naming).
- Optional: `topic`. Apache Kafka topic that receives all records from every SOQL query.
  This setting overrides `topic.prefix`. For more information, see
  [Topic naming](#topic-naming).
- `salesforce.api.version`: Salesforce API version, for example `v65.0`.
- `salesforce.client.id`: Consumer Key from your Salesforce connected app.
- `salesforce.client.secret`: Consumer Secret from your Salesforce connected app.
- `salesforce.oauth.uri`: The OAuth token endpoint.
- `salesforce.uri`: Base URL of your Salesforce instance, for example
  `https://YOUR_INSTANCE.my.salesforce.com`.
- `salesforce.bulk.api.queries`: One or more SOQL queries separated by semicolons.
  See [Define SOQL queries](#define-soql-queries).
- Optional: `salesforce.soql.query.wait`. Time in seconds between query executions.
  Longer intervals reduce Salesforce Bulk API usage. Default is `300`.
- Optional: `salesforce.status.check.wait`. Time in seconds between Bulk API job
  status checks. Default is `120`.
- Optional: `max.retries`. Number of retry attempts on failure. When retries are
  exhausted, the connector task fails and must be restarted manually. Default is `3`.

### Output record format

The connector retrieves data from Salesforce and converts each record into a Kafka
Connect record.

In the example configuration, `value.converter` is set to
`org.apache.kafka.connect.storage.StringConverter`. Record values are written as
strings that contain JSON objects. The JSON keys match the fields in your SOQL query.

Example value for `SELECT Id, Name, LastModifiedDate FROM Account`:

```json
{
  "Id": "0015g00000XyZAbAAL",
  "Name": "Acme Corp",
  "LastModifiedDate": "2024-11-01T10:23:45.000Z"
}
```

If your Apache Kafka cluster uses a schema registry, set `value.converter` to match
your registry format. For example, for Avro use
`io.confluent.connect.avro.AvroConverter` and set
`value.converter.schema.registry.url` to your registry URL. Aiven for Apache Kafka®
services use [Karapace](/docs/products/kafka/karapace) as the schema registry.

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the source connectors list, select **Salesforce source connector**, and click
   **Get started**.
1. On the **Salesforce Source Connector** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `salesforce_source_connector.json` file into the
   text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To create the Salesforce source connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @salesforce_source_connector.json
```

To check the connector status, run:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `@salesforce_source_connector.json`: Path to your JSON configuration file.
- `CONNECTOR_NAME`: Value of the `name` field in the JSON file—the same connector
  name the `connector status` command expects.

Verify that data flows to the expected Apache Kafka topics.

</TabItem>
</Tabs>

## Verify the connector

After you create the connector, confirm that records reach the topics you expect. In
the example configuration in
[Create a Salesforce source connector configuration file](#create-a-salesforce-source-connector-configuration-file),
`Account` records appear in `salesforce.test.bulkApi.Account`. For more information, see
[Topic naming](#topic-naming).

<RelatedPages/>

- [Salesforce connector for Apache Kafka on GitHub](https://github.com/Aiven-Open/salesforce-connector-for-apache-kafka)
- [Salesforce Bulk API 2.0 Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/bulk_api_2_0.htm)
