---
title: Connect with Rivery
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using [Rivery](https://rivery.io/), a platform for data ingestion, transformation, orchestration, reverse ETL, and more.

## Prerequisites

- Active Rivery account and workspace
- Aiven for AlloyDB Omni service running
- Connection details for your service available in the
  [Aiven Console](https://console.aiven.io) > the service's <ConsoleLabel name="overview"/>
  page > **Connection information**:
    - Database name
    - Host (server)
    - Port
    - User
    - Password

## Connect to a service

1. Log in to your Rivery workspace, and click **Connections** > **New connection**.
1. Select **PostgreSQL** for your new connection.
1. Give the connection a name, for example `MyDatabase`.
1. Set the `MyDatabase` connection parameters using the connection details from the
   [Aiven Console](https://console.aiven.io) > the service's
   <ConsoleLabel name="overview"/> page > **Connection information**.
1. Expand **SSL Options**, and set **SSL Mode** to `Require`.
1. Click **Save**.
