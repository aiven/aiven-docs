---
title: Connect with DBeaver
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using [DBeaver](https://dbeaver.com/).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- Aiven for AlloyDB Omni service running
- [DBeaver](https://dbeaver.io/download/) installed on your machine

## Get JDBC URI from Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io/) and go
1. On the service's <ConsoleLabel name="overview"/> page, select **Quick connect**.
1. Choose to connect with DBeaver.
1. Copy the generated JDBC URI and click **Done**.

## Connect to JDBC URI from DBeaver

1. Open DBeaver on your machine, and select **Database** > **New Database Connection**
   from the top navigation menu.
1. In the **Connect to database** window, select PostgreSQL and click **Next**.
1. In the **Connection Settings** window > **Main** tab > **Server** section,
   choose to connect with URL and paste the copied URI from the
   [Aiven Console](https://console.aiven.io/).
1. Click **Finish** to create and save the connection.

The connection to your service has been established and is visible in
DBeaver > **Database Navigator**.
