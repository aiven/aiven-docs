---
title: Connect with pgAdmin
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using [pgAdmin](https://www.pgadmin.org/), which is a PostgreSQL® client useful for managing and querying databases.

## Prerequisites

- Aiven for AlloyDB Omni service running
- Connection details for your service available in the
  [Aiven Console](https://console.aiven.io) > the service's <ConsoleLabel name="overview"/>
  page > **Connection information**:

  - Database name
  - Host
  - Port
  - User
  - Password

- [pgAdmin installed on your computer](https://www.pgadmin.org/download/)

## Connect to a service

1. Open pgAdmin, go to a server group, and select **Register** to add a server connection.
1. In the **General** tab, give the connection a name, for example `MyDatabase`.
1. In the **Connection** tab, set the connection parameters using the values available in
   the Aiven Console > the service's <ConsoleLabel name="overview"/> page >
   **Connection information**.
1. In the **Parameters** tab, set **SSL mode** to `require`.
1. Click **Save**.

The connection to your Aiven for AlloyDB Omni service should now be opened, with the
pgAdmin **Dashboard** page showing activity metrics on your database.
