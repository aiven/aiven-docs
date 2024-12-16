---
title: Get started with Aiven for Apache Flink®
sidebar_label: Get started
keywords: [quick start]
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"

Begin your experience with Aiven for Apache Flink® by setting up a service, configuring data integrations, and building streaming applications.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- [Aiven CLI](https://github.com/aiven/aiven-client)

## Create an Aiven for Apache Flink® service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>

<CreateService serviceType="Apache Flink®"/>

</TabItem>
<TabItem value="2" label="CLI">

1. [Create a token ](/docs/platform/howto/create_authentication_token).

1. Execute the following command:

   ```bash
   avn service create flink-demo \
   --service-type flink \
   --cloud google-europe-west3 \
   --plan business-4 \
   -c flink_version=1.19
   ```

Parameters:

- `flink-demo`: The `service_name` for your new service.
- `--service-type flink`: The type of service to be created, with `flink` indicating an Aiven for Apache Flink service.
- `--cloud google-europe-west3`: Identifies the cloud region where the service
  will be hosted.
- `--plan business-4`: Refers to the subscription plan that dictates the resource
  allocation for your service.
- `-c flink_version=1.19`: This configuration setting specifies the version of
  Apache Flink that your service will run.

</TabItem>
</Tabs>

## Configure data service integrations

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>

Aiven for Apache Flink® streamlines data processing by enabling integration with
various services. Currently, it supports integration with:

- **Aiven for Apache Kafka®** and **external Apache Kafka clusters**
- **Aiven for PostgreSQL®**
- **Aiven for OpenSearch®**
- **Google BigQuery®**

### Integration steps

1. Log in to [Aiven Console](https://console.aiven.io) and access your
   Aiven for Apache Flink service.
1. On the <ConsoleLabel name="overview"/> page, scroll to **Data pipeline**.
1. Click **Add data source**.
1. Choose the service you wish to integrate.
1. Click **Integrate**.

:::tip
For detailed integration steps with specific services, see the [Integrate service](/docs/products/flink/howto/create-integration).
:::

</TabItem>
<TabItem value="2" label="CLI">
You can set up your data service integrations using the Aiven CLI
with the following command:

```bash
avn service integration-create \
  --project demo-sandbox \
  --source-service kafka-demo \
  --dest-service flink-demo \
  --integration-type flink
```

Parameters:

- `--project demo-sandbox`: Defines the project for the integration.
- `--source-service kafka-demo`: Sets Aiven for Apache Kafka service
  as the data source.
- `--dest-service flink-demo`: Sets Aiven for Apache Flink service as
  the data destination.
- `--integration-type flink`: Determines the integration type, enabling data transfer
  from Aiven for Apache Kafka to Aiven for Apache Flink.

</TabItem>
</Tabs>

## Create an Aiven for Apache Flink® application

An [Aiven for Apache Flink® application](concepts/flink-applications) act as containers
that encapsulate all aspects of a Flink job. This includes data source and sink
connections, as well as the data processing logic.

### Application types

- **SQL applications**: These applications are ideal for executing SQL queries. The
  Aiven Console guides you through selecting source and sink tables, and setting up the
  SQL queries to process your data. To learn how to create SQL applications, see
  [Create an SQL application](/docs/products/flink/howto/create-sql-application).
- **JAR applications**:These applications allow you to deploy custom functionalities. The
  Aiven Console enables you to upload and manage your JAR files and execute custom Flink
  jobs that go beyond the standard SQL capabilities. To learn how to create
  JAR applications, see [Create a JAR application](/docs/products/flink/howto/create-jar-application).


## Next steps

-   Create source and sink data tables to map the data for
    [Apache Kafka®](howto/connect-kafka),
    [PostgreSQL®](howto/connect-pg) or
    [OpenSearch®](howto/connect-opensearch) services
-   For details on using the Aiven CLI to create and manage Aiven for
    Apache Flink® services, see the
    [Aiven CLI documentation](/docs/tools/cli) and the
    [Flink-specific command reference](/docs/tools/cli/service/flink)
