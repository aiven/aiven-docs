---
title: Get started with Aiven for PostgreSQL®
sidebar_label: Get started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CogIcon from "@site/static/images/icons/cog.svg";
import DashboardIcon from "@site/static/images/icons/speedometer.svg";
import DatabaseIcon from "@site/static/images/icons/database.svg";

Start using Aiven for PostgreSQL® by creating a service, connecting to it, and loading sample data.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- [psql](https://www.postgresql.org/download/) command line tool installed
- [Terraform installed](https://developer.hashicorp.com/terraform/install) if you prefer
  to get started using code

## Create a service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
[Create an Aiven for PostgreSQL® service](/docs/platform/howto/create_new_service)  in the
[Aiven Console](https://console.aiven.io).
</TabItem>
<TabItem value="2" label="Terraform">

1. [Create an authentication token](/docs/platform/howto/create_authentication_token).
1. Create the following Terraform files:

   - ``provider.tf``, where you specify the version in the ``required_providers`` block

      ```terraform
        terraform {
          required_providers {
            aiven = {
              source  = "aiven/aiven"
              version = ">=4.0.0, < 5.0.0"
            }
          }
        }

        provider "aiven" {
          api_token = var.aiven_api_token
        }
      ```

   - ``postgresql.tf``, where you include the ``aiven_pg`` resource

      ```terraform
        resource "aiven_pg" "postgresql" {
          project                = data.aiven_project.my_project.project
          service_name           = "postgresql"
          cloud_name             = "google-europe-west3"
          plan                   = "startup-4"

          termination_protection = true

          pg_user_config {
            pg_version = 13
            admin_username = "admin"

            pgbouncer {
              autodb_max_db_connections = 200
            }
          }
        }

        output "postgresql_service_uri" {
          value     = aiven_pg.postgresql.service_uri
          sensitive = true
        }
      ```

   - ``variables.tf``, where you declare the API token and project name variables

      ```terraform
      variable "aiven_api_token" {
        description = "Aiven console API token"
        type        = string
      }

      variable "project_name" {
        description = "Aiven console project name"
        type        = string
      }
      ```

   - ``terraform.tfvars``, where you add the Aiven access token and project name

      ```terraform
        aiven_api_token = "AIVEN_AUTHENTICATION_TOKEN"
        project_name    = "AIVEN_PROJECT_NAME"
      ```

1. Run ``terraform init`` > ``terraform plan`` > ``terraform apply --auto-approve``.

</TabItem>
</Tabs>

## Configure a service

Configure your service if the default service setup doesn't meet your needs.

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Select the new service from the list of services on
   the <DatabaseIcon className="icon"/> **Services** page.
1. On the <DashboardIcon className="icon"/> **Overview** page, select <CogIcon className="icon"/>
   **Service settings** from the sidebar.
1. In the **Advanced configuration** section, make changes to the service
configuration.
</TabItem>
<TabItem value="2" label="Terraform">

</TabItem>
</Tabs>

See the available configuration options in
[Advanced parameters for Aiven for PostgreSQL](/docs/products/postgresql/reference/advanced-params).

## Connect to the service

<Tabs groupId="group1">
<TabItem value="psql" label="psql" default>
[Connect to your new service](/docs/products/postgresql/howto/connect-psql) with, for
example, [psql](https://www.postgresql.org/download/) CLI tool.
</TabItem>
<TabItem value="Terraform" label="Terraform">

Access your new service with ``psql`` using the ``postgresql_service_uri`` output you
received after runing ``terraform apply --auto-approve``.

```sql
psql "$(terraform output -raw postgresql_service_uri)"
psql (13.2)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

defaultdb=>
```

</TabItem>
</Tabs>

:::tip
Check more tools for connecting to Aiven for PostgreSQL in
[Connect to Aiven for PostgreSQL](/docs/products/postgresql/howto/list-code-samples).
:::

## Load a test dataset

`dellstore2` is a standard store dataset with products, orders, inventory, and customer
information.

1.  Download the `dellstore2-normal-1.0.tar.gz` file from the
    [PostgreSQL
    website](https://www.postgresql.org/ftp/projects/pgFoundry/dbsamples/dellstore2/dellstore2-normal-1.0/)
    and unzip it.

1. From the folder where you unzipped the file,
   [connect to your PostgreSQL instance](/docs/products/postgresql/howto/connect-psql),
   create a `dellstore` database, and connect to it:

    ```sql
    CREATE DATABASE dellstore;
    \c dellstore
    ```

1.  Populate the database:

    ```sql
    \i dellstore2-normal-1.0.sql
    ```

1.  Verify what objects have been created:

    ```sql
    \d
    ```
    <!-- vale off -->
    <details>
    <summary>Expected output</summary>
    <div>
        ```sql
         List of relations
         Schema |           Name           |   Type   |  Owner
        --------+--------------------------+----------+----------
         public | categories               | table    | avnadmin
         public | categories_category_seq  | sequence | avnadmin
         public | cust_hist                | table    | avnadmin
         public | customers                | table    | avnadmin
         public | customers_customerid_seq | sequence | avnadmin
         public | inventory                | table    | avnadmin
         public | orderlines               | table    | avnadmin
         public | orders                   | table    | avnadmin
         public | orders_orderid_seq       | sequence | avnadmin
         public | products                 | table    | avnadmin
         public | products_prod_id_seq     | sequence | avnadmin
         public | reorder                  | table    | avnadmin
         (12 rows)
        ```
    </div>
    </details>
    <!-- vale on -->

## Query data

### Read data

Retrieve all the data from a table, for example, from `orders`:

```sql
SELECT * FROM orders;
```

<!-- vale off -->
<details>
<summary>Expected output</summary>
<div>
    ```sql
     orderid | orderdate  | customerid | netamount |  tax  | totalamount
    ---------+------------+------------+-----------+-------+-------------
           1 | 2004-01-27 |       7888 |    313.24 | 25.84 |      339.08
           2 | 2004-01-01 |       4858 |     54.90 |  4.53 |       59.43
           3 | 2004-01-17 |      15399 |    160.10 | 13.21 |      173.31
           4 | 2004-01-28 |      17019 |    106.67 |  8.80 |      115.47
           5 | 2004-01-09 |      14771 |    256.00 | 21.12 |      277.12
           6 | 2004-01-11 |      13734 |    382.59 | 31.56 |      414.15
           7 | 2004-01-05 |      17622 |    256.44 | 21.16 |      277.60
           8 | 2004-01-18 |       8331 |     67.85 |  5.60 |       73.45
           9 | 2004-01-06 |      14902 |     29.82 |  2.46 |       32.28
          10 | 2004-01-18 |      15112 |     20.78 |  1.71 |       22.49
          ...
          (20000 rows)
    ```
</div>
</details>
<!-- vale on -->

### Write data

Add a row to a table, for example, to `customers`:

```sql
INSERT INTO customers(customerid,firstname,lastname,address1,city,country,region,email,creditcardtype,creditcard,creditcardexpiration,username,password,age,gender)
VALUES(20001,'John','Doe','WEDEBTRTBD','NY','US',11,'john.doe@mailbox.com',3,1879279217775922,2025/11,'user20001','password',44,'M');
```

<!-- vale off -->
<details>
<summary>Expected output</summary>
<div>
    ```sql
    INSERT 0 1
    ```
</div>
</details>
<!-- vale on -->

Check that your new row is there:

```sql
SELECT * FROM customers WHERE firstname = 'John';
```

<!-- vale off -->
<details>
<summary>Expected output</summary>
<div>
    ```sql
     customerid | firstname | lastname |  address1  | address2 | city | state | zip | country | region |        email         | phone | creditcardtype |    creditcard    | creditcardexpiration | username  |  password  | age | income | gender
    ------------+-----------+----------+------------+----------+------+-------+-----+---------+--------+----------------------+-------+----------------+------------------+----------------------+-----------+------------+-----+--------+--------
          20001 | John      | Doe      | WEDEBTRTBD |          | NY   |       |     | US      |     11 | john.doe@mailbox.com |       |              3 | 1879279217775922 | 184                  | user20001 | password   |  44 |        | M
    (1 row)
    ```
</div>
</details>
<!-- vale on -->

## Related pages

- [High availability](/docs/products/postgresql/concepts/high-availability)
- [Restrict access](/docs/products/postgresql/howto/readonly-user)
- [Code examples for connecting to PostgreSQL from your application](/docs/products/postgresql/howto/list-code-samples)
- [Migrate your PostgreSQL to Aiven](concepts/aiven-db-migrate)
- [Aiven Service Level Agreement](https://aiven.io/sla)
