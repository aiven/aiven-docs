---
title: Connect with pgAdmin
---

[pgAdmin](https://www.pgadmin.org/) is one of the most popular PostgreSQL® clients. Use it to manage and query your database.

## Variables

These are the placeholders you will need to replace in the code sample:

| Variable   | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| `HOSTNAME` | Hostname for PostgreSQL connection, from the service overview page      |
| `PORT`     | Port for PostgreSQL connection, from the service overview page          |
| `DATABASE` | Database Name for PostgreSQL connection, from the service overview page |
| `PASSWORD` | `avnadmin` password, from the service overview page                     |

## Prerequisites

For this example you'll need pgAdmin already installed on your
computer, for installation instructions follow the [pgAdmin
website](https://www.pgadmin.org/download/)

## Connect to PostgreSQL

1.  Open pgAdmin and click **Create New Server**.

1.  In the **General** Tab give the connection a name, for example
    `MyDatabase`.

1. In the **Connection** tab, set:

   - **Host name/address** to `HOSTNAME`
   - **Port**: to `PORT`
   - **Maintenance database** to `DATABASE`
   - **Username** to `avnadmin`
   - **Password** to `PASSWORD`

1.  In the **SSL** tab, set **SSL mode** to `Require`

1.  Click **Save**

:::tip
If you experience a SSL error while connecting, add the service CA
certificate as the **Root certificate**.

1.   Download the CA Certificate file to your computer.
1.   In the pgAdmin connection settings, click the SSL tab and select
     the CA certificate file you downloaded. Save the settings.
:::

Your connection to PostgreSQL should now be opened, with a **Dashboard**
page showing activity metrics on your PostgreSQL database.

![Screenshot of a pgAdmin Dashboard window](/images/content/products/postgresql/pg-pgadmin-activity.png)
