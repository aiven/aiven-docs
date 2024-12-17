---
title: Set up Aiven for ClickHouse® data service integrations
sidebar_label: Integrate with data source
keywords: [data service integration, data source integration, managed credentials integration, managed databases integration, named collections]
---

import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect your Aiven for ClickHouse® service with another Aiven-managed service or external data source to make your data available in the Aiven for ClickHouse service.

:::tip
Read about data service integration types and methods available with Aiven for
ClickHouse® in
[Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview).
:::

## Prerequisites

- You are familiar with the limitations listed in
  [About Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview#supported-data-source-types).
- You have an organization, a project, and an Aiven for ClickHouse service in Aiven.
- You have access to the [Aiven Console](https://console.aiven.io/).

## Create data service integrations {#create-data-service-integration}

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
   and a project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to integrate
   with a data source.
1. In the service <ConsoleLabel name="overview"/>, go to **Data pipeline**.

   - To create the first integration for that service, click **Add data source**.
   - To add an integrtion for that service, click <ConsoleIcon name="plus"/>.

   As a result, the **Data service integrations** wizard opens, showing
   a list of all data sources available for integration. If there are no data sources to
   integrate with, create an Aiven-managed service or an integration endpoint by
   clicking **Create service** or **Add external endpoint** respectively.

1. Depending on your use case, continue as instructed in either
  [Integrate with Aiven-managed services](#integrate-aiven-services) or
  [Integrate with external data sources](#integrate-with-external-data-sources).

### Integrate with Aiven-managed services {#integrate-aiven-services}

You can integrate either with a new Aiven-managed service or with an existing Aiven-managed
services:

<Tabs groupId="group1">
<TabItem value="1" label="Integrate with a new service" default>
To create an integration with a new service in the **Data service integrations** wizard:

1. Unselect all available data **Service types**.
1. Click **Create service**.
1. [Set up the new service](/docs/platform/howto/create_new_service).
1. Come back to your Aiven for ClickHouse service (<ConsoleLabel name="overview"/> >
   **Data pipeline** > **Add data source**), and create an integration to the newly created
   service following the **Integrate with an existing service** tab.
</TabItem>
<TabItem value="2" label="Integrate with an existing service">
To create an integration with an existing service in the **Data service integrations** wizard:

1. Select **Service types** of Aiven-managed services to integrate with. See
   [supported data source types](/docs/products/clickhouse/concepts/data-integration-overview#supported-data-source-types)
   for supported service types.
1. Select **Data service** of the chosen type from the list of services available for
   integration, and click **Continue**.
1. Click either **Enable without databases** or **Add databases**.

   :::note
   If you prefer to create a data service integration without adding integration databases,
   you can create integration databases for your service any time later. See
   [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases).
   ::::

   - Enable your integration with databases:

     Click **Add databases**, enter database and schema names, and click **Enable**.

     You can preview the created databases by selecting <ConsoleLabel name="databasesandtables"/>
     from the sidebar.

   - Enable your integration without databases:

     Click **Enable without databases**.

     To preview the created integration, from the sidebar, click <ConsoleLabel name="overview"/>.
</TabItem>
</Tabs>

### Integrate with external data sources

For integration with external data sources, Aiven for ClickHouse offers two methods:

- [Managed databases](/docs/products/clickhouse/concepts/data-integration-overview.md#managed-databases-integration)
- [Managed credentials](/docs/products/clickhouse/concepts/data-integration-overview.md#managed-credentials-integration)

To create an integration with an external data source in the **Data service integrations**
wizard:

1. Select **Service types** of an external data source to integrate with. See
   [supported data source types](/docs/products/clickhouse/concepts/data-integration-overview#supported-data-source-types)
   for supported service types.
1. Select an external **Data service** of the chosen type from the list of services available
   for integration, and click **Continue**.
1. Select an integration method, either **Managed databases**  or **Managed credentials**,
   and click **Continue**.
1. Integrate with managed databases or with managed credentials:

   <Tabs groupId="group2">
   <TabItem value="1" label="Integrate with managed databases" default>
   The managed databases integration uses databases engines and, when enabled,
   automatically creates databases in your Aiven for ClickHouse, where you can ingest your
   external data.

   1. Select **Managed databases**, and click **Continue**.
   1. Click **Add databases** to have custom databases created along with the integration, or
      click **Enable without databases** to integrate with no custom databases created.

      :::tip
      If you choose to have databases created automatically, you can query them using a
      statement similar to the following:

      ```sql
      SELECT *
      FROM EXTERNAL_POSTGRESQL_RESOURCE_NAME.POSTGRESQL_TABLE_NAME
      ```

      :::

   </TabItem>
   <TabItem value="2" label="Integrate with managed credentials">
   The managed credentials integration supports storing connection parameters in Aiven
   and allows you to create tables for your external data. The stored connection parameters
   are automatically seeded in your external data queries.

   1. Select **Managed credentials**, and click **Continue** > **Enable**.
   1. Create tables using
      [table engines](/docs/products/clickhouse/reference/supported-table-engines), for
      example the PostgreSQL engine:

      ```sql
      CREATE TABLE default.POSTGRESQL_TABLE_NAME
      (
         `float_nullable` Nullable(Float32),
         `str` String,
         `int_id` Int32
      )
      ENGINE = PostgreSQL(postgres_creds);
      ```

      :::tip
      For details on how to use different table engines for integrations with external
      systems, see the
      [upstream ClickHouse documentation](https://clickhouse.com/docs/en/engines/table-engines/integrations).
      :::

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
   </TabItem>
   </Tabs>

## View data service integrations

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
   and a project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to display
   integrations for.
1. In the service <ConsoleLabel name="overview"/>, go to **Data pipeline**
   and find your integrations grouped according to service types.
1. Click <ConsoleIcon name="chevronRight"/> next to a particular service group to preview
   active data service integrations within that group.

## Stop data service integrations

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to an organization
    and a project.
1.  From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service you
    want to stop integrations for.
1.  In the service <ConsoleLabel name="overview"/>, go to **Data pipeline** and click
    <ConsoleIcon name="chevronRight"/> next to a service group that the integration to be
    stopped belongs to.
1.  From the **Active data service integrations** list, select the
    service integration that you no longer need, and click **Disconnect integration**.
1.  Evaluate the impact of disconnecting from a service explained in
    **Warning**, and click **Disconnect integration** if you accept erasing all the
    databases and configuration information.

As a result, your integration is terminated and all the corresponding databases and
configuration information are deleted.

## Related pages

-   [Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview)
-   [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases)
-   [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
