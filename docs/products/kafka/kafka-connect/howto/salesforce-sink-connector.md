---
title: Create a Salesforce sink connector for Aiven for Apache Kafka®
sidebar_label: Salesforce sink connector
early: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The Salesforce sink connector writes records from Apache Kafka® topics to Salesforce objects, such as `Account` or `Contact`.
It consumes Kafka records and submits them as Salesforce Bulk API 2.0 insert jobs.

:::note
The connector provides at-least-once delivery. If records are retried before Kafka
offsets are committed, Salesforce can receive duplicate records.
:::

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- A Salesforce account with the following:
  - A connected app configured for the OAuth 2.0 client credentials flow, with a
    client ID and client secret. For setup details, see
    [Configure the client credentials flow for external client apps](https://help.salesforce.com/s/articleView?id=xcloud.configure_client_credentials_flow_for_external_client_apps.htm&type=5)
    in the Salesforce documentation.
  - Bulk API 2.0 access enabled.
  - The target Salesforce object already exists, for example `Account` or `Contact`.
- A Kafka topic that contains the records to send to Salesforce.
- Kafka records that use one of the following value formats:
  - `Struct` values with a schema
  - `Map` values with a schema
  - Schemaless `Map` values, such as JSON records produced when
    `value.converter.schemas.enable` is set to `false`
- Field names in `Struct` values or keys in `Map` values that match Salesforce field
  API names on the target object.

## Create a Salesforce sink connector configuration file

Create a file named `salesforce_sink_connector.json` with the following configuration:

```json
{
    "name": "salesforce_sink_connector",
    "connector.class": "io.aiven.kafka.connect.salesforce.sink.SalesforceSinkConnector",
    "tasks.max": "1",
    "topics": "test_topic",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "true",
    "salesforce.bulk.api.sink.object": "Contact",
    "salesforce.client.id": "YOUR_OAUTH_CLIENT_ID",
    "salesforce.client.secret": "YOUR_OAUTH_CLIENT_SECRET",
    "salesforce.oauth.uri": "https://YOUR_INSTANCE.salesforce.com/services/oauth2/token",
    "salesforce.uri": "https://YOUR_INSTANCE.salesforce.com",
    "salesforce.api.version": "v65.0",
    "salesforce.max.retries": "3",
    "offset.flush.interval.ms": "60000",
    "offset.flush.timeout.ms": "30000"
}
```

The example uses schema-based JSON values. To use schemaless JSON values, set
`value.converter.schemas.enable` to `false`.

Parameters:

- `name`: Name of the connector.
- `connector.class`: Use
  `io.aiven.kafka.connect.salesforce.sink.SalesforceSinkConnector`.
- `tasks.max`: Maximum number of connector tasks.
- `topics`: Kafka topics to read from.
- `value.converter`: Converter for Kafka record values. Use
  `org.apache.kafka.connect.json.JsonConverter` for JSON. For Avro, use the appropriate
  converter and set `schema.registry.url`.
- `value.converter.schemas.enable`: Set to `true` to use schema-based JSON values.
  Set to `false` to use schemaless JSON values. The connector supports both
  schema-based `Struct` values and schemaless `Map` values.
- `salesforce.bulk.api.sink.object`: Salesforce object to write records to, such as
  `Account` or `Contact`.
- `salesforce.client.id`: OAuth 2.0 client ID from your Salesforce connected app.
- `salesforce.client.secret`: OAuth 2.0 client secret from your Salesforce connected app.
- `salesforce.oauth.uri`: OAuth token endpoint for your Salesforce org. Set together with
  `salesforce.uri` so both match your deployment.
- `salesforce.uri`: Base URL of your Salesforce instance.
- `salesforce.api.version`: Salesforce REST API version string supported by your org.
  Examples use `v65.0`.
- `salesforce.max.retries`: Maximum retries for Salesforce API and authentication
  requests. See the
  [configuration reference](https://aiven-open.github.io/salesforce-connector-for-apache-kafka/sink/configuration.html).
- `offset.flush.interval.ms`: How often, in milliseconds, Kafka Connect flushes
  records to Salesforce. Default: `60000`. Each flush is submitted as one Bulk API 2.0
  insert job. A larger interval reduces Salesforce API calls but produces larger
  batches that take longer to process and can require a higher
  `offset.flush.timeout.ms`.
- `offset.flush.timeout.ms`: Maximum time in milliseconds for a flush before Kafka
  Connect marks it failed. Default: `5000`. The configuration examples use `30000` when
  each flush includes many records or when Salesforce Bulk API responses are slower than
  the default allows. Raise this value if flush operations exceed `5000` ms or fail
  with timeout errors.

For all available configuration options, see the
[Salesforce sink connector configuration reference](https://aiven-open.github.io/salesforce-connector-for-apache-kafka/sink/configuration.html).

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

1. In the sink connectors list, select **Salesforce**, and click **Get started**.
1. On the **Salesforce** connector page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `salesforce_sink_connector.json` file into the
   text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
  <TabItem value="cli" label="Aiven CLI">

To create the Salesforce sink connector using the
[Aiven CLI](/docs/tools/cli/service/connector#avn_service_connector_create), run:

```bash
avn service connector create SERVICE_NAME @salesforce_sink_connector.json
```

To check the connector status, run:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® or Aiven for Apache Kafka
  Connect® service.
- `@salesforce_sink_connector.json`: Path to your JSON configuration file.
- `CONNECTOR_NAME`: Value of the `name` field in the connector configuration.

Verify that records are written to the expected Salesforce object.

</TabItem>
</Tabs>

## Verify the connector

After you create the connector, confirm that records are flowing to Salesforce:

1. Open the target Salesforce object, for example `Contact`.
1. Confirm that new records appear.
1. Optionally, verify that field names and values match the records in the Kafka topic.

For a sample record shape when writing to `Contact`, see
[Example record for Salesforce](#example-record-for-salesforce).

## Example record for Salesforce {#example-record-for-salesforce}

If the connector writes to the Salesforce `Contact` object, a Kafka record value can use
schema-based or schemaless JSON. For schemaless JSON, the value can look like this:

```json
{
  "FirstName": "Alice",
  "LastName": "Example",
  "Email": "alice@example.com"
}
```

The connector uses the JSON keys as Salesforce field API names: `FirstName`,
`LastName`, and `Email`.

## Data format

The connector accepts Kafka record values as `Struct` or `Map` values.

For `Struct` values, use field names that match Salesforce object field API names.
For `Map` values, use keys that match Salesforce object field API names.

For example, the following Kafka record value:

```json
{
  "Name": "Alice",
  "Email": "alice@example.com",
  "ExternalId__c": "EXT001"
}
```

is written to Salesforce using the following field names:

```text
Name,Email,ExternalId__c
```

For custom Salesforce fields, use the Salesforce API field name, such as
`ExternalId__c`.

## Schema behavior

The connector detects Salesforce field names dynamically from the records buffered
during each flush. For `Struct` values, it uses schema field names. For `Map` values,
it uses map keys.

If records in the same flush contain different fields or keys, the connector creates
one CSV header that includes all detected Salesforce field names.

For example, if one record contains `Name` and `Email`, and another record contains
`Name` and `ExternalId__c`, the generated CSV header includes all three fields:

```text
Email,ExternalId__c,Name
```

Records that do not contain a detected field or key are sent with an empty value in
that column.

To reduce failures, keep records in a topic consistent with the target Salesforce
object schema.

## How it works

When Kafka Connect flushes records, the connector:

1. Collects buffered records for that flush interval.
1. Detects field names from the buffered records.
1. Uses schema field names for `Struct` values and map keys for `Map` values.
1. Creates CSV data with a header row that contains the detected field names.
1. Sends the CSV data to Salesforce as a Bulk API 2.0 multipart insert job.
1. Polls Salesforce until the job reaches a final state.
1. Commits Kafka offsets after the Salesforce job completes successfully.

## Limitations

The Salesforce sink connector has the following limitations:

- **Insert only:** Only insert operations are supported. Update and upsert operations
  are not supported.
- **At-least-once delivery:** The connector can write the same record more than once if
  a task restarts or Kafka Connect replays records before offsets are committed.
- **Supported value types:** The connector processes `Struct` and `Map` values.
  Records with other value types are skipped. If the errant record reporter is
  configured, skipped records are reported as errant records. If a flush contains
  no supported values (`Struct` or `Map`), the batch can fail.
- **No automatic data mapping:** The connector does not transform field names, keys,
  or values. Use Kafka record field names or keys that match Salesforce field API
  names.
- **Dynamic fields:** Field names and keys are discovered dynamically from buffered
  records. Inconsistent fields or keys across records in the same flush interval
  produce sparse rows with empty values where a field is missing.
- **Single batch per flush:** All records buffered within one flush interval are
  submitted as a single Salesforce Bulk API 2.0 job. Large batches may approach
  Salesforce API limits or exceed the Kafka Connect flush timeout.

<RelatedPages/>

- [Salesforce connector for Apache Kafka on GitHub](https://github.com/Aiven-Open/salesforce-connector-for-apache-kafka)
- [Salesforce Bulk API 2.0 Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/bulk_api_2_0.htm)
