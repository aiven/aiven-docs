---
title: Connect to Aiven for PostgreSQL® with DBeaver
sidebar_label: Connect with DBeaver
---

Use [DBeaver](https://dbeaver.com/) to connect to your Aiven for PostgreSQL® service.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for PostgreSQL service
- [DBeaver](https://dbeaver.io/download/) installed on your machine

## Get JDBC URI from Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io/) and navigate
   to your organization > project > Aiven for PostgreSQL service.
1. On the service **Overview** page, select **Quick connect**.
1. In the **Connect** window

   1. Choose to connect with Java using the **Connect with**
      dropdown menu.
   1. Copy the generated JDBC URI.
   1. Select **Done**.

## Connect to JDBC URI from DBeaver

1. Open DBeaver on your machine, and select **Database** > **New Database Connection**
   from the top navigation menu.
1. In the **Connect to database** window, select PostgreSQL and click **Next**.
1. In the **Connection Settings** window > **Main** tab > **Server** section,
   choose to connect with URL and paste the URI copied from the
   [Aiven Console](https://console.aiven.io/).
1. Select **Finish** to create and save the connection.

![Connect to Aiven for PostgreSQL with DBeaver](/images/content/products/postgresql/dbeaver-create-connection.png)

The connection to your Aiven for PostgreSQL service has been established and is visible in
DBeaver > **Database Navigator**.

## Related pages

- [Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples) for
more tools you can use for connecting to your service
- [DBeaver](https://dbeaver.com/)
- [DBeaver Community](https://dbeaver.io/)
