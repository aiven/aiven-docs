---
title: Manage Aiven for ClickHouse® integration databases
---

<!-- vale off -->
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up and manage Aiven for ClickHouse® integration databases to access data hosted by
services you're integrated with.

By adding integrations databases in Aiven for ClickHouse, you create
streaming data pipelines across services. From Aiven for ClickHouse, you
can add integration databases connecting to:

- Aiven for Apache Kafka®
- Aiven for PostgreSQL®

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- Running Aiven for ClickHouse service
- [Service integration](/docs/products/clickhouse/howto/data-service-integration) between
  the Aiven for ClickHouse service and a data source service (Aiven for Kafka or Aiven for
  PostgreSQL)

## Create integration databases

:::note
Your Aiven for ClickHouse service can support up to 400 databases simultaneously.
:::

Depending on your data source, select **PostgreSQL** or **Apache Kafka**.

<Tabs groupId="group1">
<TabItem value="pg" label="PostgreSQL" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  On the **Databases and tables** page, click **Create database** >
    **PostgreSQL integration database**.
1.  In the **Create PostgreSQL integration database** wizard:

    1. Select a service to be a data source for the integration database, and click
       **Continue**.
    1. Enter **Database name** and **Schema name**, and click **Save**.

</TabItem>
<TabItem value="kafka" label="Apache Kafka">
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service.
1.  On your service's page, click <ConsoleLabel name="integrations"/> in the
    sidebar.
1.  On the **Integrations** page, find your data source integration and click
    <ConsoleLabel name="actions"/> > **Create database**.
1.  In the **Create Kafka integration database** wizard:

    1. Select a service to be a data source for the integration database, and click
       **Continue**.
    1. Set up the integration table details:
       - Enter a table name.
       - Enter a consumer group name.
       - Select topics.
       - Select a data format.
       - Enter table columns.
    1. Click **Save table details** > **Save**.

</TabItem>
</Tabs>

## View integration databases or tables

To preview integration databases or tables for your Aiven for ClickHouse service:

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service to
    preview data structures for.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  Find your integration database, and expand it using <ConsoleLabel name="downarrow"/>
    to display tables inside it.
1.  Find your table, and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="viewdetails"/>.

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
    that includes a database to be edited.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  Find the integration database to be edited, and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="editdatabase"/>.
1.  Add or delete integration databases using <ConsoleLabel name="add"/> or
    <ConsoleLabel name="delete"/> respectively, and click **Save**.

:::note[Alternative for PostgreSQL]
Go to your Aiven for ClickHouse service's **Integrations** page,
find an integration, and clicking click <ConsoleLabel name="actions"/> >
<ConsoleLabel name="editdatabase"/>.
:::

</TabItem>
<TabItem value="tb" label="Table">

#### Add or delete tables

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    that includes a database where you intend to add or delete tables.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  Find the database, and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="editdatabase"/>.
1.  Add or delete tables using <ConsoleLabel name="addtable"/> or
    <ConsoleLabel name="delete"/> respectively, and click **Save**.

#### Update table details

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    that includes a table to be edited.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  Find a database including the table to be edited, and expand the database using
    <ConsoleLabel name="downarrow"/> to display tables inside it.
1.  Find the table to be edited, and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="edittable"/>.
1.  In the **Edit table** window, update table details, and click **Saves**.

</TabItem>
</Tabs>

## Delete integration databases or tables

Depending on what you intend to delete, select **Database** or **Table**.

<Tabs groupId="group1">
<TabItem value="db" label="Database" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    where a database to be deleted resides.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  On the **Databases and tables** page, find your integration database and click
    <ConsoleLabel name="actions"/> > <ConsoleLabel name="deletedatabase"/>.
1.  In the **Delete database confirmation** window, study the impact and
    click **Confirm** if you accept removing the database along with the tables inside it.

</TabItem>
<TabItem value="tb" label="Table">

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your project.
1.  On the <ConsoleLabel name="Services"/> page, select an Aiven for ClickHouse service
    where  a table to be deleted resides.
1.  On your service's page, click <ConsoleLabel name="databasesandtables"/> in the
    sidebar.
1.  Find the integration database including the table, and expand it using
    <ConsoleLabel name="downarrow"/> to display tables inside it.
1.  Find the table to be deleted, and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="deletetable"/>.
1.  In the **Delete table confirmation** window, study the impact and click **Confirm** if
    you accept removing the table.

</TabItem>
</Tabs>

<RelatedPages/>

-   [Manage Aiven for ClickHouse® data service integrations](/docs/products/clickhouse/howto/data-service-integration)
-   [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
