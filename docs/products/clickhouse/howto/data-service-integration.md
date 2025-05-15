---
title: Set up Aiven for ClickHouse® data source integrations
sidebar_label: Integrate with data source
---

import RelatedPages from "@site/src/components/RelatedPages";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect your Aiven for ClickHouse® service with another Aiven-managed service or external data source to make your data available in the Aiven for ClickHouse service.

## Prerequisites

- You are familiar with the limitations listed in
  [About Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview#supported-data-source-types).
- You have an organization, a project, and an Aiven for ClickHouse service in Aiven.
- You have access to the [Aiven Console](https://console.aiven.io/).

## Create Apache Kafka integrations

:::tip
Learn about [managed databases integrations](/docs/products/clickhouse/concepts/data-integration-overview#managed-databases-integration).
:::

Make Apache Kafka data available in Aiven for ClickHouse using the Kafka engine:

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
   and a project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to integrate
   with a data source.
1. On the service's <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="integrations"/> in the sidebar.
1. On the **Integrations** page, go to the **Data sources** section and click
   **Apache Kafka**.

   The **Apache Kafka data source integration** wizard opens and displays a list of external
   data sources or Aiven-managed data services available for integration. If there are
   no data sources to integrate with, the wizard allows you to create them either by
   clicking
   **Create service** (for Aiven-managed sources) or **Add external endpoint** (for external
   sources).

1. In the **Apache Kafka data source integration** wizard:

   1. Select a data source to integrate with, and click **Continue**.

      :::note
      If a data source to integrate with is not available on the list, click one of the
      following:
      - **Create service**: to create an Aiven-managed data service to integrate with
      - **Create external endpoint**: to make your external data source available for
        integration

   1. Create tables where your Apache Kafka data will be available in Aiven
      for ClickHouse. Enter **Table name**, **Consumer group name**, **Topics**, **Data
      format**, and **Table columns**. Click **Save table details**.

      :::tip
      You can query the created tables using the following statement:

      ```sql
      SELECT *
      FROM APACHE_KAFKA_RESOURCE_NAME.APACHE_KAFKA_TABLE_NAME
      ```

      :::

   1. Click **Enable integration** > **Close**.

## Create PostgreSQL integrations

:::tip
Learn about [managed databases integrations](/docs/products/clickhouse/concepts/data-integration-overview#managed-databases-integration).
:::

Make PostgreSQL data available in Aiven for ClickHouse using the PostgreSQL engine:

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
   and a project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to integrate
   with a data source.
1. On the service's <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="integrations"/> in the sidebar.
1. On the **Integrations** page, go to the **Data sources** section and click
   **PostgreSQL**.

   The **PostgreSQL data source integration** wizard opens and displays a list of external
   data sources or Aiven-managed data services available for integration. If there are no
   data sources to integrate with, the wizard allows you to create them either by
   clicking
   **Create service** (for Aiven-managed sources) or **Add external endpoint** (for external
   sources).

1. In the **PostgreSQL data source integration** wizard:

   1. Select a data source to integrate with, and click **Continue**.

      :::note
      If a data source to integrate with is not available on the list, click one of the
      following:
      - **Create service**: to create an Aiven-managed data service to integrate with
      - **Create external endpoint**: to make your external data source available for
        integration

   1. Optionally, create databases where your PostgreSQL data will be available in Aiven
      for ClickHouse. Enter **Database name** and **Database schema**.

      :::tip
      You can query the created databases using the following statement:

      ```sql
      SELECT *
      FROM POSTGRESQL_RESOURCE_NAME.POSTGRESQL_TABLE_NAME
      ```

      :::

      :::note
      You can
      [create such integration databases](/docs/products/clickhouse/howto/integration-databases)
      any time later, for example, by finding your integration on the **Integrations** page
      and clicking <ConsoleLabel name="actions"/> > <ConsoleLabel name="editdatabase"/>.
      ::::

   1. Click **Enable integration** > **Close**.

## Use managed-credentials integrations

:::tip
Learn about [managed credentials integrations](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration).
:::

[Set up a managed-credentials integration](/docs/products/clickhouse/howto/data-service-integration#create-managed-credentials-integrations)
and
[create tables](/docs/products/clickhouse/howto/data-service-integration#create-tables)
for the data to be made available through the integration.
[Access your stored credentials](/docs/products/clickhouse/howto/data-service-integration#access-credentials-storage).

### Create managed-credentials integrations

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
   and a project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to integrate
   with a data source.
1. On the service's <ConsoleLabel name="overview"/> page, click
   <ConsoleLabel name="integrations"/> in the sidebar.
1. On the **Integrations** page, go to the **Data sources** section and click
   **ClickHouse Credentials**.

   The **ClickHouse credentials integration** wizard opens and displays a list of external
   data sources or Aiven-managed data services available for integration. If there are no
   data sources to integrate with, the wizard allows you to create them either by
   clicking **Create service** (for Aiven-managed sources) or **Add external endpoint**
   (for external sources).

1. In the **ClickHouse credentials integration** wizard:

   1. Select a data source to integrate with.

      :::note
      If a data source to integrate with is not available on the list, click one of the
      following:
      - **Create service**: to create an Aiven-managed data service to integrate with
      - **Create external endpoint**: to make your external data source available for
        integration

   1. Click **Enable integration**.
   1. Optionally, click **Test connection** > **Open in query editor** > **Execute**.

      :::note[Alternative]
      You can test the connection any time later by going to your Aiven for ClickHouse
      service's **Integrations** page, finding the credentials integration, and
      clicking
       <ConsoleLabel name="actions"/> > <ConsoleLabel name="testconnection"/>.
      :::

   1. Click **Close**.

### Create tables

Create tables using
[table engines](/docs/products/clickhouse/reference/supported-table-engines), for
example the PostgreSQL engine:

```sql
CREATE TABLE default.POSTGRESQL_TABLE_NAME
(
   `float_nullable` Nullable(Float32),
   `str` String,
   `int_id` Int32
)
ENGINE = PostgreSQL(postgres_credentials);
```

:::tip
For details on how to use different table engines for integrations with external
systems, see the
[upstream ClickHouse documentation](https://clickhouse.com/docs/en/engines/table-engines/integrations).
:::

### Access credentials storage

Depending on the type of data source you are integrated with, you can access your credentials
storage by passing your data source name in the following query:

```sql title="PostgreSQL data source"
SELECT *
FROM postgresql(
   `service_POSTGRESQL_SOURCE_NAME`,
   database='defaultdb',
   table='tables',
   schema='information_schema'
)
```

```sql title="MySQL data source"
SELECT *
FROM mysql(
   `service_MYSQL_SOURCE_NAME`,
   database='mysql',
   table='slow_log'
)
```

```sql title="Amazon S3 data source"
SELECT * FROM s3(
   `endpoint_S3_SOURCE_NAME`,
   filename='*.csv',
   format='CSVWithNames')
```

:::warning
When you try to run a managed credentials query with a typo, the query fails with an
error message related to grants.
:::

## View data source integrations

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
   and a project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to display
   integrations for.
1. On the service's page, go to one of the following:

   - <ConsoleLabel name="overview"/> in the sidebar > **Integrations**
   - <ConsoleLabel name="integrations"/> in the sidebar

## Stop data source integrations

:::warning
By terminating a data source integration, you disconnect from the data source, which erases
all databases and configuration information from Aiven for ClickHouse.
:::

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
    and a project.
1.  From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service you
    want to stop integrations for.
1.  On the service's page, take one of the following courses of action:

    - Click <ConsoleLabel name="overview"/> > **Integrations**, find an
      integration to be stopped, and click <ConsoleLabel name="actions"/> >
      <ConsoleLabel name="disconnect"/>.
    - Click <ConsoleLabel name="integrations"/>, find an integration to be stopped,
      and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="disconnect"/>.

Your integration is terminated and all the corresponding databases and configuration
information are deleted.

<RelatedPages/>

-   [Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview)
    -   [Managed credentials integration](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)
    -   [Managed databases integration](/docs/products/clickhouse/concepts/data-integration-overview#managed-databases-integration)
-   [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases)
-   [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
