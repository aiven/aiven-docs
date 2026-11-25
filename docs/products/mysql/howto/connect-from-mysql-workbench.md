---
title: Connect to Aiven for MySQL® with MySQL Workbench
sidebar_label: MySQL Workbench
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

You can use a graphical client like [MySQL Workbench](https://www.mysql.com/products/workbench/) to connect to Aiven for MySQL® services.

## Connect to Aiven for MySQL®

Enter the individual connection parameters as shown in [Aiven
Console](https://console.aiven.io/) (the **Overview** page of your
service > the **Connection information** section) and also download the
SSL CA certificate and specify the file on SSL page.

![Screenshot of the MySQL Workbench settings screen](/images/content/products/mysql/mysql-workbench.png)

:::important
Using SSL is strongly recommended. To secure your
connection, download the CA certificate and configure it in client
settings.
:::

## Create an additional database

To create more databases, go to the service's page in [Aiven
Console](https://console.aiven.io/). In the <ConsoleLabel name="connect"/> section, click
**Databases**. In the **Databases** view, click **Create database**, enter a
name for your database and click **Add database**.

## Add a database user

To add database users, go to [Aiven Console](https://console.aiven.io/)
and select your Aiven for MySQL service from the **Services** page. In
your service's page, in the <ConsoleLabel name="connect"/> section, click **Users**. In the
**Users** view, click **Add service user**.

In the **Add service user** window, you can choose the
authentication method to use. By default, the web console uses the
`caching_sha2_password` authentication mechanism. To successfully
connect, your client libraries need to be new enough. If for any reason
you are forced to use a client that only supports the older
`mysql_native_password` authentication mechanism, select this separately
while adding the user.

:::tip
You can change this later in the **Users** view for your service ([Aiven
Console](https://console.aiven.io/)).
:::

:::note
Changing the authentication method for a user resets the password.
:::

In addition to the authentication method, enter a name for the user in
**Username**, and then click **Add service user**.
