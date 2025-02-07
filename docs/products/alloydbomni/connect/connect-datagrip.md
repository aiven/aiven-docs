---
title: Connect with DataGrip
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using [JetBrains DataGrip](https://www.jetbrains.com/datagrip/).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- Aiven for AlloyDB Omni service running
- [DataGrip](https://www.jetbrains.com/datagrip/download/) installed on your machine

## Get JDBC URI from Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io/) and go to your
   organization > project > Aiven for AlloyDB Omni service.
1. On the service's <ConsoleLabel name="overview"/> page, select **Quick connect**.
1. Choose to connect with DataGrip.
1. Copy the generated JDBC URI and click **Done**.

## Connect to JDBC URI from DataGrip

1. Open DataGrip on your machine, and select **File** > **New** > **Data Source** >
   **PostgreSQL** from the top navigation menu.
1. In the **Data Sources and Drivers** window > **General** tab, paste the copied URI from
   the [Aiven Console](https://console.aiven.io/).
1. Click **OK** to create and save the connection.

The connection to your service has been established and is visible in
DataGrip > **Database Explorer**.
