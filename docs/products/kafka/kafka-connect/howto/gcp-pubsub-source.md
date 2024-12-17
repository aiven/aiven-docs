---
title: Create a Google Pub/Sub source connector to Apache Kafka®
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

The [Google Pub/Sub source connector](https://github.com/googleapis/java-pubsub-group-kafka-connector) enables you to push from a Google Pub/Sub subscription to an Aiven for Apache Kafka® topic.

:::note
See the complete set of available parameters and configuration
options in the [connector's
documentation](https://github.com/googleapis/java-pubsub-group-kafka-connector).
:::

## Prerequisites {#connect_pubsub_source_prereq}

To set up a Google Pub/Sub source connector, ensure you have the following:

- An Aiven for Apache Kafka service with [Kafka Connect enabled](enable-connect) or a
  [dedicated Aiven for Apache Kafka Connect service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- Google Cloud Pub/Sub details:
  - `GCP_PROJECT_NAME`: The name of the Google Cloud project where the Pub/Sub
    subscription is located
  - `GCP_SUBSCRIPTION`: The name of the [Google Pub/Sub subscription](https://cloud.google.com/pubsub/docs/create-subscription)
  - `GCP_SERVICE_KEY`: A valid Google Cloud service account key for the
    `GCP_PROJECT_NAME`: To create this key, see [Configure GCP for a Google BigQuery sink connector](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink-prereq#gcp-bigquery-sink-connector-google-account)

    :::warning
    The GCP Pub/Sub source connector accepts the `GCP_SERVICE_KEY` as a JSON string.
    Escape all `"` symbols as `\"`, and replace any `\n` symbols in the `private_key` field with `\\n`.

    Format the `GCP_SERVICE_KEY` like this:

    `{\"type\": \"service_account\",\"project_id\": \"XXXXXX\", ...}`

    :::

- IAM Roles: The service account used by the Google Pub/Sub source connector must have
  the following IAM roles:
  - `roles/pubsub.subscriber`: Allows the connector to subscribe to the Pub/Sub topic
  - `roles/pubsub.viewer`: Required to verify the subscription and perform
    `pubsub.subscriptions.get` operations
  - Alternatively, use `roles/pubsub.editor`, which includes both the `subscriber` and
    `viewer` permissions

  :::note
  Without these roles, the connector will fail with a `PERMISSION_DENIED` error during
  the verification process.
  :::

- Apache Kafka details: The target topic in Aiven for Apache Kafka, `KAFKA_TOPIC`,
  where data from the Pub/Sub subscription is written
- Schema registry details (if using Avro as the data format):
  - `APACHE_KAFKA_HOST`: The hostname of your Apache Kafka service
  - `SCHEMA_REGISTRY_PORT`: The schema registry port for your Apache Kafka service
  - `SCHEMA_REGISTRY_USER`: The schema registry username for your Apache Kafka service
  - `SCHEMA_REGISTRY_PASSWORD`: The schema registry password for your Apache Kafka service

 :::note

 To find the `SCHEMA_REGISTRY` details, go to the Aiven for Apache Kafka®
 <ConsoleLabel name="overview"/> page, click <ConsoleLabel name="service settings"/>, and
 scroll to the **Service management** section.

 Since Apache Kafka version 3.0, Aiven for Apache Kafka® uses Karapace instead of
 Confluent Schema Registry. For more information, see
 [Karapace](/docs/products/kafka/karapace).

 :::

## Setup a Google Pub/Sub source connector

This example shows how to set up a Google Pub/Sub source connector for Aiven for Apache
Kafka using the [Aiven Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Create a configuration file, `pubsub_source.json`, with the following content:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.google.pubsub.kafka.source.CloudPubSubSourceConnector",
    "kafka.topic": "KAFKA_TOPIC",
    "cps.project": "GCP_PROJECT_NAME",
    "cps.subscription": "GCP_SUBSCRIPTION",
    "gcp.credentials.json": "GCP_SERVICE_KEY",
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

This configuration file includes:

- `name`: Connector name
- `kafka.topic`: Target Apache Kafka topic name
- `cps.project`: GCP project name where the target Google Pub/Sub
    is located
- `cps.subscription`: Name of the [Google Pub/Sub subscription](https://cloud.google.com/pubsub/docs/create-subscription)
- `gcp.credentials.json`: GCP service account key, correctly escaped as defined in the
  [prerequisite](/docs/products/kafka/kafka-connect/howto/gcp-pubsub-source#connect_pubsub_source_prereq)
- `key.converter` and `value.converter`: Define the message format in the Apache Kafka
  topic. The `io.confluent.connect.avro.AvroConverter` translates messages from the
  Avro format. To retrieve the message schema, use Aiven's
  [Karapace schema registry](https://github.com/aiven/karapace), as specified
  by the `schema.registry.url` parameter and related credentials

  :::note
  Use the `key.converter` and `value.converter` sections only if the source data is in
  Avro format. If omitted, messages are read as binary.

  When using Avro as the source data format, set the following parameters:

  - `value.converter.schema.registry.url`: Points to the Aiven for Apache Kafka schema
    registry URL (`https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`)
  - `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to log in to the
    schema registry using a username and password
  - `value.converter.schema.registry.basic.auth.user.info`: Pass the schema registry
    credentials in the form `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`

   :::

For a full list of parameters, see the
[java-pubsub-group-kafka-connector GitHub repository](https://github.com/googleapis/java-pubsub-group-kafka-connector/).

### Create a Google Pub/Sub source connector

<Tabs groupId="setup-method"> <TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the Aiven for
   Apache Kafka® or Aiven for Apache Kafka Connect® service.
1. Click  <ConsoleLabel name="connectors"/> from the left sidebar.
1. Click **Create New Connector**. If connectors are not enabled,
   click **Enable connector on this service**.
1. Click **See all connectors** to view all available options.
1. Select **Google Pub/Sub source** and click **Get started**.
1. In the **Common** tab, find the **Connector configuration** text box and
   click <ConsoleLabel name="edit"/>.
1. Paste the `pubsub_source.json` connector configuration into the form.
1. Click **Apply**.

   :::note
   The Aiven Console parses the configuration file and fills in the relevant UI fields.
   Review and modify fields as needed. Changes are reflected in
   the **Connector configuration** text box in JSON format.
   :::

1. After verifying the settings, click **Create connector**.
1. Check the connector status on the **Connectors** screen.
1. Verify that data appears in the target Pub/Sub dataset. By default, the table name is
   derived from the Apache Kafka topic name. To change the table name, use the Kafka
   Connect `RegexRouter` transformation. This transformation allows you to rename
   topics using regular expressions, ensuring that the data is routed to the desired
   table.


    :::note
    You can also create connectors using the
    [Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
    :::

</TabItem> <TabItem value="cli" label="Aiven CLI">

To create a Google Pub/Sub source connector using the
[Aiven CLI](/docs/tools/cli/service-cli), run:

```bash
avn service connector create SERVICE_NAME @pubsub_source.json
```

Parameters:

- `SERVICE_NAME`: Your Aiven for Apache Kafka service name.
- `@pubsub_source.json`: The path to your JSON configuration file.

To check the connector status, run:

```bash
avn service connector status SERVICE_NAME CONNECTOR_NAME
```

Verify that topic and data are present in the Apache Kafka target instance.

</TabItem> </Tabs>

## Example: Create a Google Pub/Sub source connector

Use the following configuration to push data from a Google Pub/Sub subscription
(`GCP_SUBSCRIPTION`) to an Aiven for Apache Kafka topic named `measurements`. Replace the
placeholders `GCP_PROJECT_NAME` and `GCP_SERVICE_KEY` with the appropriate values:

```json
{
   "name":"CONNECTOR_NAME",
   "connector.class": "com.google.pubsub.kafka.source.CloudPubSubSourceConnector",
   "kafka.topic": "measurements",
   "cps.project": "GCP_PROJECT_NAME",
   "cps.subscription": "GCP_SUBSCRIPTION",
   "gcp.credentials.json": "GCP_SERVICE_KEY"
}
```

The default Apache Kafka topic format is bytes. To use the Avro schema, include
the `value.converter` and `key.converter` properties defined earlier.
