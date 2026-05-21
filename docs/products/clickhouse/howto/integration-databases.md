---
title: Create and manage Aiven for ClickHouse® integration databases
sidebar_label: Create integration databases
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create and manage integration databases in Aiven for ClickHouse® to query data from integrated services:

- Aiven for Apache Kafka®
- Aiven for PostgreSQL®

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- An Aiven for ClickHouse service
- A [service integration](/docs/products/clickhouse/howto/data-service-integration) with
  Aiven for Kafka or Aiven for PostgreSQL

## Create integration databases

:::note
Your Aiven for ClickHouse service can support up to 400 databases simultaneously.
:::

Depending on your data source, select **PostgreSQL** or **Apache Kafka**.

<Tabs groupId="group1">
<TabItem value="pg" label="PostgreSQL" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Click **Create database** > **PostgreSQL integration database**.
1.  In the **Create PostgreSQL integration database** wizard:

    1. Select the data source service, and click **Continue**.
    1. Enter **Database name** and **Schema name**, and click **Save**.

</TabItem>
<TabItem value="kafka" label="Apache Kafka">
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service.
1.  In the sidebar, click <ConsoleLabel name="integrations"/>.
1.  On the **Integrations** page, find your data source integration and click
    <ConsoleLabel name="actions"/> > **Create database**.
1.  In the **Create Kafka integration database** wizard:

    1. Select the data source service, and click **Continue**.
    1. Configure the integration table:
       - Enter a table name.
       - Enter a consumer group name.
       - Select topics.
       - Select a data format.
       - Enter table columns.
    1. Click **Save table details** > **Save**.

</TabItem>
</Tabs>

## View integration databases or tables

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Expand the integration database using <ConsoleLabel name="downarrow"/>.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="viewdetails"/> on the table.

## Edit integration databases or tables

Add or delete integration databases or tables. Update table details.

:::note
You cannot edit tables inside PostgreSQL integration databases.
:::

Depending on what you intend to edit, select **Database** or **Table**.

<Tabs groupId="group1">
<TabItem value="db" label="Database" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    with the database.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="editdatabase"/> on the
    integration database.
1.  Use <ConsoleLabel name="add"/> or <ConsoleLabel name="delete"/> to add or remove
    integration databases, and click **Save**.

:::note[Alternative for PostgreSQL]
On the **Integrations** page, find the integration and click
<ConsoleLabel name="actions"/> > <ConsoleLabel name="editdatabase"/>.
:::

</TabItem>
<TabItem value="tb" label="Table">

### Add or delete tables

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    with the database.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="editdatabase"/> on the
    database.
1.  Use <ConsoleLabel name="addtable"/> or <ConsoleLabel name="delete"/> to add or remove
    tables, and click **Save**.

### Update table details{#update-table-details}

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    with the table.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Expand the database using <ConsoleLabel name="downarrow"/>.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="edittable"/> on the table.
1.  Update the table details, and click **Save**.

</TabItem>
</Tabs>

## Delete integration databases or tables

Depending on what you intend to delete, select **Database** or **Table**.

<Tabs groupId="group1">
<TabItem value="db" label="Database" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    with the database.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="deletedatabase"/> on the
    integration database.
1.  Review the impact in the confirmation dialog, and click **Confirm** to delete the
    database and its tables.

</TabItem>
<TabItem value="tb" label="Table">

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    with the table.
1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1.  Expand the integration database using <ConsoleLabel name="downarrow"/>.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="deletetable"/> on the table.
1.  Review the impact in the confirmation dialog, and click **Confirm** to delete the table.

</TabItem>
</Tabs>

<RelatedPages/>

-   [Manage Aiven for ClickHouse® data service integrations](/docs/products/clickhouse/howto/data-service-integration)
-   [Aiven for ClickHouse® service integrations](/docs/products/clickhouse/concepts/data-integration-overview)
