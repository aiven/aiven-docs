---
title: Connect to Aiven for PostgreSQL® with DataGrip
sidebar_label: Connect with DataGrip
---

Use [DataGrip](https://www.jetbrains.com/datagrip/) to connect to your Aiven for
PostgreSQL® service.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for PostgreSQL service
- [DataGrip](https://www.jetbrains.com/datagrip/download/) installed on your machine

## Get JDBC URI from Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io/) and go to your
   organization > project > Aiven for PostgreSQL service.
1. On the service **Overview** page, select **Quick connect**.
1. In the **Connect** window

   1. Choose to connect with Java using the **Connect with**
      dropdown menu.
   1. Copy the generated JDBC URI.
   1. Select **Done**.

## Connect to JDBC URI from DataGrip

1. Open DataGrip on your machine, and select **File** > **New** > **Data Source** >
   **PostgreSQL** from the top navigation menu.
1. In the **Data Sources and Drivers** window > **General** tab, paste the URI copied from
   the [Aiven Console](https://console.aiven.io/).
1. Select **OK** to create and save the connection.

![Connect to Aiven for PostgreSQL with DataGrip](/images/content/products/postgresql/datagrip-create-connection.png)

The connection to your Aiven for PostgreSQL service has been established and is visible in
DataGrip > **Database Explorer**.

## Related pages

- [Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples) for
more tools you can use for connecting to your service
- [DataGrip](https://www.jetbrains.com/datagrip/)
- [DataGrip download](https://www.jetbrains.com/datagrip/download/)
