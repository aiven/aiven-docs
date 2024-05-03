---
title: Manage Aiven for ClickHouse® integration databases
---

You can set up and manage integration databases from the the **Databases and tables** view of your Aiven for ClickHouse service.

By adding integrations databases in Aiven for ClickHouse, you create
streaming data pipelines across services. From Aiven for ClickHouse, you
can add integration databases connecting to Aiven for Kafka® and Aiven
for PostgreSQL®.

Aiven for ClickHouse supports
[regular integrations](/docs/products/clickhouse/howto/list-integrations) and
[data service integrations](/docs/products/clickhouse/howto/data-service-integration).

You can create Aiven for ClickHouse® integrations databases in the
[Aiven web console](https://console.aiven.io/) either when
[creating a new data service integration](/docs/products/clickhouse/howto/integration-databases#create-integ-db) or from the the **Databases and tables** view of your
service.

For information on how to set up integration databases when creating a
new data service integration, see
[Manage Aiven for ClickHouse® data service integrations](/docs/products/clickhouse/howto/data-service-integration).

## Prerequisites

-   Aiven account
-   Access to [Aiven web console](https://console.aiven.io/)

## Create integration databases {#create-integ-db}

:::note
You can create both PostgrSQL and Apache Kafka integration databases for
Aiven for ClickHouse. This instruction uses *PostgreSQL* as an example.
:::

1.  Log in to the [Aiven web console](https://console.aiven.io/).
2.  In the **Services** page, select an Aiven for ClickHouse service you
    want to add integration databases to.
3.  In your service's page, select **Databases and tables** from the
    sidebar.
4.  In the **Databases and tables** view, select **Create database** >
    **PostgreSQL integration database**.
5.  In **Create PostgreSQL integration database** wizard, select one of
    the following options:
    -   To add an integration database to a service that is not yet
        integrated, go to the **New data service integration** tab.

        <details><summary>
        Expand for next steps
        </summary>

        1.  Select a service from the list of services available for
            integration.
        2.  Select **Continue**.
        3.  In the **Add integration databases** section, enter database
            names and schema names and select **Integrate & Create**
            when ready.

        You can preview the created databases by selecting **Databases
        and tables** from the sidebar.

        </details>

    -   To add an integration database to an already integrated service,
        go to the **Existing integration** tab.

        <details><summary>
        Expand for next steps
        </summary>

        1.  Select a service from the list of integrated services.
        2.  Select **Continue**.
        3.  In the **Add integration databases** section, enter database
            names and schema names and select **Create** when ready.

        You can preview the created databases by selecting **Databases
        and tables** from the sidebar.

        </details>

## View integration databases

1.  Log in to the [Aiven web console](https://console.aiven.io/).
2.  In the **Services** page, select an Aiven for ClickHouse service you
    want to check integration databases for.
3.  In your service's page, select **Databases and tables** from the
    sidebar to discover your integration databases in the **Databases
    and tables** list.

:::note
PostgreSQL is currently only supported as a source.
:::

## Edit integration databases

:::note
You can only edit Apache Kafka integration databases and tables.
:::

1.  Log in to the [Aiven web console](https://console.aiven.io/).

2.  In the **Services** page, select an Aiven for ClickHouse service you
    want to edit integration databases for.

3.  In your service's page, select **Databases and tables** from the
    sidebar to find the **Databases and tables** list.

4.  From the **Databases and tables** list, select a pencil icon for an
    Apache Kafka integration database you want to edit.

5.  In the **Edit database** wizard, find a table to edit
    in the **Configured tables** list and expand its details by
    selecting the angle brackets icon.

    :::note
    You can also create a table for the database you are editing by
    selecting **Add another table**.
    :::

6.  In the table details section, update any of the following fields:

    -   Table name
    -   Consumer group name
    -   Topics
    -   Data format
    -   Table columns

7.  Select **Update table details** > **Save changes**.

Your integration database and/or its tables have been updated.

## Delete integration databases

1.  Log in to the [Aiven web console](https://console.aiven.io/).
2.  In the **Services** page, select an Aiven for ClickHouse service you
    want to delete integration databases for.
3.  In your service's page, select **Databases & Tables** from the
    sidebar to find the **Databases and tables** list.
4.  From the **Databases and tables** list, select the trash bin icon
    for the integration database to remove.
5.  In the **Delete database confirmation** popup, study the impact and
    select **Confirm** if you accept removing the database along with
    the tables inside it.

Your integration database has been removed from the **Databases and
tables** list.

## Related pages

-   [Manage Aiven for ClickHouse® data service integrations](/docs/products/clickhouse/howto/data-service-integration)
-   [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
