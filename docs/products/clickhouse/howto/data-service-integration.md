---
title: Set up Aiven for ClickHouse® data service integrations
sidebar_label: Integrate with data source
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Connect an Aiven for ClickHouse® service with another Aiven service or external data source to make your data available in the Aiven for ClickHouse service. Depending on your use case, select either the managed-database integration or the managed-credentials integration.

:::note[See also]
For information on data service integration types and methods available with Aiven for
ClickHouse®, see
[About Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview).
:::

## Prerequisites

- Make yourself familiar with the limitations listed in
  [About Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview#limitations).
- You have an organization, a project, and an Aiven for ClickHouse service in Aiven.
- You have access to the [Aiven Console](https://console.aiven.io/).

## Create data service integrations {#create-data-service-integration}

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to a desired organization
   and project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to integrate
   with a data source.
1. In the service <ConsoleLabel name="overview"/>, go to **Data pipeline** and click
   <ConsoleLabel name="addnew"/>.

   As a result, the **Data service integrations** wizard opens, showing
   a list of all data sources available for integration. If there are no data sources to
   integrate with, create an Aiven-managed service or an integration endpoint by
   clicking **Create a service** or **Add external endpoint** respectively.

1. Depending on your use case, continue as instructed in either
  [Integrate with Aiven-managed services](#integrate-aiven-services) or
  [Integrate with external data sources](#integrate-external-services).

### Integrate with Aiven services {#integrate-aiven-services}

#### Integrate with a new Aiven service

To create an integration with a new service in the **Data service integrations** wizard:

1. Use the **Select data service type** menu to select the blank option for no data
   service type.
1. In the **Data service integrations** view, select **Create service**.
1. [Set up the new service](/docs/platform/howto/create_new_service).
1. Come back to your primary service and create an integration to the newly created
   service.
   For that purpose, skip the steps that follow and start over with building your
   integration using this instruction but now
   [Integrate with an existing Aiven service](#integrate-existing-aiven-services).

#### Integrate with an existing Aiven service {#integrate-existing-aiven-services}

To create an integration with an existing service in the **Data service integrations** wizard:

1. Select a type of an Aiven service to integrate with using the
   **Select data service type** menu.
1. Select a service of the chosen type from the list of services available for
   integration and click **Continue**.
1. Select either **Enable without databases** or **Add databases**.

   :::note
   If you prefer to create a data service integration without adding integration databases,
   you can create integration databases for your service any time later. See
   [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases)
   for guidance on how to do that.
   ::::

   - Enable your integration with databases:

     1. Select **Add databases**.
     1. Enter database names and schema names and select **Enable**.

     You can preview the created databases by selecting **Databases and tables** from the
     sidebar.

   - Enable your integration without databases:

     Select **Enable without databases**.

     You can preview the created integration by selecting **Overview** from the sidebar.

### Integrate with external data sources {#integrate-external-services}

For integration with external data sources, Aiven for ClickHouse offers two methods:

- [Managed databases](/docs/products/clickhouse/concepts/data-integration-overview.md#managed-databases-integration)
- [Managed credentials](/docs/products/clickhouse/concepts/data-integration-overview.md#managed-credentials-integration)

To create an integration with an external data source in the **Data service integrations**
wizard:

1. Select a type of an external service to integrate with using the **Select data
   service type** menu.
1. Select an external service of the chosen type from the list of services available for
   integration and click **Continue**
1. Select an integration method, either **Managed databases**  or **Managed credentials**,
   and click **Continue**.
1. [Integrate using managed databases](#integrate-managed-databases) or
   [integrate using managed credentials](#integrate-managed-credentials) depending on your
   use case.

#### Integrate using managed databases {#integrate-managed-databases}

The **Managed databases** integration uses databases engines and, when enabled,
automatically creates databases in your Aiven for ClickHouse, where you can ingest your
external data.

1. Enable the **Managed databases** integration by selecting **Managed databases** and
   confirming your choice by selecting **Continue**.
1. Click **Add databases** to have custom databases created along with the integration, or
   click **Enable without databases** to integrate with no custom databases created.
1. Populate your automatically created databases with your external data using the
   following query:

   ```sql
   SELECT data
   FROM ext-postgresql-resource-name.your-pg-table-name
   ```

#### Integrate using managed credentials {#integrate-managed-credentials}

The **Managed credentials** integration supports storing connection parameters in Aiven
and allows you to create tables for your external data.

1. Enable the **Managed credentials** integration by selecting **Managed credentials** and
   confirming your choice by selecting **Continue** > **Enable**.
1. Create tables using
   [table engines](/docs/products/clickhouse/reference/supported-table-engines).

:::note
The connection parameters for your integration are stored in Aiven and automatically
seeded in your external data queries.
:::

You can access your credentials storage by passing your external service name in the
following query:

```sql
SELECT data
FROM postgresql(ext-postgresql-resource-name,
   database='defaultdb',
   table='your-pg-table-name')
```

## View data service integrations

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to a desired organization
   and project.
1. From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service to check
   integrations for.
1. In the service <ConsoleLabel name="overview"/>, go to **Data pipeline**
   and find your integrations grouped according to service types.
1. Click <ConsoleIcon name="chevronRight"/> next to a particular service group to preview
   active data service integrations within that group.

## Stop data service integrations

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to a desired organization
    and project.
1.  From <ConsoleLabel name="services"/>, select an Aiven for ClickHouse service you
    want to stop integrations for.
1.  In the service <ConsoleLabel name="overview"/>, go to **Data pipeline** and click
    <ConsoleIcon name="chevronRight"/> next to a service group that the integration to be
    stopped belongs to.
1.  From the **Active data service integrations** list, select the
    service integration that you no longer need, and click **Disconnect integration**.
1.  Make yourself familiar with the impact of disconnecting from a service explained in
    **Warning**, and select **Disconnect integration** if you accept erasing all the
    databases and configuration information.

As a result, your integration is terminated and all the corresponding databases and
configuration information are deleted.

## Related pages

-   [About Aiven for ClickHouse® data service integration](/docs/products/clickhouse/concepts/data-integration-overview)
-   [Manage Aiven for ClickHouse® integration databases](/docs/products/clickhouse/howto/integration-databases)
-   [Integrate your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
