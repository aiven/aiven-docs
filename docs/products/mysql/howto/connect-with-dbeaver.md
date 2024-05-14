---
title: Connect to Aiven for MySQL® with DBeaver
sidebar_label: Connect with DBeaver
---

Use [DBeaver](https://dbeaver.com/) to connect to your Aiven for MySQL® service.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- At least one running Aiven for MySQL service
- [DBeaver](https://dbeaver.io/download/) installed on your machine

## Get JDBC URI from Aiven Console

1. Log in to [Aiven Console](https://console.aiven.io/) and go to your organization
   \> project > Aiven for MySQL service.
1. On the service **Overview** page, click **Quick connect**.
1. In the **Connect** window:

   1. Choose to connect with Java using the **Connect with**
      dropdown menu.
   1. Copy the generated JDBC URI.
   1. Click **Done**.

## Connect to JDBC URI from DBeaver

1. Open DBeaver on your machine, and select **Database** > **New Database Connection**
   from the top navigation menu.
1. In the **Connect to database** window, select MySQL and click **Next**.
1. In the **Connection Settings** window > **Main** tab > **Server** section,
   choose to connect with URL and paste the URI copied from the
   [Aiven Console](https://console.aiven.io/).
1. Click **Finish** to create and save the connection.

The connection to your Aiven for MySQL service has been established and is visible in
DBeaver > **Database Navigator**.

## Related pages

- [Connect to Aiven for MySQL](/docs/products/mysql/howto/list-code-samples) for more
  tools you can use for connecting to your service
- [DBeaver](https://dbeaver.com/)
- [DBeaver Community](https://dbeaver.io/)
