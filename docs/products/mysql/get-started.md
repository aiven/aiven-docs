---
title: Get started with Aiven for MySQL®
sidebar_label: Get started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Start using Aiven for MySQL® by creating a service, connecting to it, and loading sample data.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- [MySQL CLI client](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)
  installed
- [Terraform installed](https://developer.hashicorp.com/terraform/install) if you prefer
  to get started using code

## Create a service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
[Create an Aiven for MySQL® service](/docs/platform/howto/create_new_service)  in the
[Aiven Console](https://console.aiven.io).
</TabItem>
<TabItem value="2" label="Terraform">

1. [Create an authentication token](/docs/platform/howto/create_authentication_token).
1. Create the following Terraform files:

   - ``provider.tf``, where you specify the version in the ``required_providers`` block

      ```hcl
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

   - ``mysql.tf``, where you include the ``aiven_mysql`` resource

      ```hcl
        resource "aiven_mysql" "mysql" {
          project                = data.aiven_project.my_project.project
          service_name           = "mysql"
          cloud_name             = "google-europe-west3"
          plan                   = "startup-4"
        }

        output "mysql_service_uri" {
          value     = aiven_mysql.mysql.service_uri
          sensitive = true
        }
      ```

   - ``variables.tf``, where you declare the API token and project name variables

      ```hcl
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

      ```hcl
        aiven_api_token = "AIVEN_AUTHENTICATION_TOKEN"
        project_name    = "AIVEN_PROJECT_NAME"
        admin_username  = "YOUR_SERVICE_USERNAME"
        admin_password  = "YOUR_SERVICE_PASSWORD"
      ```

1. Run ``terraform init`` > ``terraform plan`` > ``terraform apply --auto-approve``.

</TabItem>
</Tabs>

## Configure a service

Edit your service settings if the default service configuration doesn't meet your needs.

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Select the new service from the list of services on
   the <ConsoleLabel name="Services"/> page.
1. On the <ConsoleLabel name="overview"/> page, select <ConsoleLabel name="service settings"/>
   from the sidebar.
1. In the **Advanced configuration** section, make changes to the service configuration.
</TabItem>
<TabItem value="2" label="Terraform">

Configure service parameters by updating the `aiven_mysql` resource, for example:

```hcl
resource "aiven_mysql" "mysql" {
  project                = data.aiven_project.my_project.project
  service_name           = "mysql"
  cloud_name             = "google-europe-west3"
  plan                   = "startup-4"
  maintenance_window_dow  = "monday"
  maintenance_window_time = "10:00:00"
  termination_protection = true

  static_ips = toset([
    aiven_static_ip.ips[0].static_ip_address_id,
    aiven_static_ip.ips[1].static_ip_address_id,
    aiven_static_ip.ips[2].static_ip_address_id,
    aiven_static_ip.ips[3].static_ip_address_id,
  ])

  mysql_user_config {
    mysql_version = 8.0.30
    backup_hour               = 01
    backup_minute             = 30
    shared_buffers_percentage = 40
    static_ips = true
    ip_filter_string = ["0.0.0.0/0"]
    admin_username = var.admin_username
    admin_password = var.admin_password

    public_access {
      mysql         = true
      prometheus = false
    }

    ## project_to_fork_from  = "source-project-name"
    ## service_to_fork_from  = "source-mysql-service"
    ## mysql_read_replica       = true

    mysql {
      idle_in_transaction_session_timeout = 900
      log_min_duration_statement          = -1
      deadlock_timeout                    = 2000
    }
  }

  timeouts {
    create = "20m"
    update = "15m"
  }
}
```

</TabItem>
</Tabs>

See the available configuration options in
[Advanced parameters for Aiven for MySQL](/docs/products/mysql/reference/advanced-params).

## Connect to the service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your
   organization > project > Aiven for MySQL service.
1. On the <ConsoleLabel name="overview"/> page of your service, click
   **Quick connect**.
1. In the **Connect** window, select a tool or language to connect to your service, follow
   the connection instructions, and click **Done**.

   ```sql
   mysql --user avnadmin --password=ADMIN_PASSWORD --host mysql-sakila-dev-sandbox.f.aivencloud.com --port 12691 defaultdb
   ```

</TabItem>
<TabItem value="2" label="Terraform">

Access your new service with the MySQL client using the `mysql_service_uri` output you
received after running `terraform apply --auto-approve`.

```sql
mysql "$(terraform output -raw mysql_service_uri)"
```

</TabItem>
<TabItem value="3" label="mysql">
[Connect to your new service](/docs/products/mysql/howto/connect-from-cli) with
[mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html).
</TabItem>
</Tabs>

:::tip
Check more tools for connecting to Aiven for MySQL in
[Connect to Aiven for MySQL](/docs/products/mysql/howto/list-code-samples).
:::

## Load a test dataset

`Sakila` is a sample dataset that represents a DVD rental store. It provides a standard
schema highlighting MySQL features.

1.  Download the `sakila-db.tar.gz` file from the
    [MySQL example databases](https://dev.mysql.com/doc/sakila/en/sakila-installation.html)
    page and unzip it.

1. From the folder where you unzipped the file,
   [connect to your MySQL service](/docs/products/mysql/howto/connect-from-cli),
   create a `sakila` database, and connect to it:

    ```sql
    CREATE DATABASE sakila;
    USE sakila;
    ```

1.  Populate the database:

    ```sql
    source sakila-schema.sql;
    source sakila-data.sql;
    ```

1.  Verify what objects have been created:

    ```sql
    SHOW FULL TABLES;
    ```
    <!-- vale off -->
    <details>
    <summary>Expected output</summary>
    <div>
        ```sql
        +----------------------------+------------+
        | Tables_in_sakila           | Table_type |
        +----------------------------+------------+
        | actor                      | BASE TABLE |
        | actor_info                 | VIEW       |
        | address                    | BASE TABLE |
        | category                   | BASE TABLE |
        | city                       | BASE TABLE |
        | country                    | BASE TABLE |
        | customer                   | BASE TABLE |
        | customer_list              | VIEW       |
        | film                       | BASE TABLE |
        | film_actor                 | BASE TABLE |
        | film_category              | BASE TABLE |
        | film_list                  | VIEW       |
        | film_text                  | BASE TABLE |
        | inventory                  | BASE TABLE |
        | language                   | BASE TABLE |
        | nicer_but_slower_film_list | VIEW       |
        | payment                    | BASE TABLE |
        | rental                     | BASE TABLE |
        | sales_by_film_category     | VIEW       |
        | sales_by_store             | VIEW       |
        | staff                      | BASE TABLE |
        | staff_list                 | VIEW       |
        | store                      | BASE TABLE |
        +----------------------------+------------+
        23 rows in set
        ```
    </div>
    </details>
    <!-- vale on -->

## Query data

### Read data

Retrieve all the data from a table, for example, from `language`:

```sql
SELECT * FROM language;
```

<!-- vale off -->
<details>
<summary>Expected output</summary>
<div>
    ```sql
    +-------------+----------+---------------------+
    | language_id | name     | last_update         |
    +-------------+----------+---------------------+
    |           1 | English  | 2006-02-15 05:02:19 |
    |           2 | Italian  | 2006-02-15 05:02:19 |
    |           3 | Japanese | 2006-02-15 05:02:19 |
    |           4 | Mandarin | 2006-02-15 05:02:19 |
    |           5 | French   | 2006-02-15 05:02:19 |
    |           6 | German   | 2006-02-15 05:02:19 |
    +-------------+----------+---------------------+
    6 rows in set
    ```
</div>
</details>
<!-- vale on -->

### Write data

Add a row to a table, for example, to `category`:

```sql
INSERT INTO category(category_id,name) VALUES(17,'Thriller');
```

<!-- vale off -->
<details>
<summary>Expected output</summary>
<div>
    ```sql
    Query OK, 1 row affected
    ```
</div>
</details>
<!-- vale on -->

Check that your new row is there:

```sql
SELECT * FROM category WHERE name = 'Thriller';
```

<!-- vale off -->
<details>
<summary>Expected output</summary>
<div>
    ```sql
    +-------------+----------+---------------------+
    | category_id | name     | last_update         |
    +-------------+----------+---------------------+
    |          17 | Thriller | 2024-05-22 11:04:03 |
    +-------------+----------+---------------------+
    1 row in set
    ```
</div>
</details>
<!-- vale on -->

## Related pages

- [Connect to Aiven for MySQL with MySQL Workbench](/docs/products/mysql/howto/connect-from-mysql-workbench)
- [Migrate to Aiven from an external MySQL](/docs/products/mysql/howto/migrate-from-external-mysql)
- [Create additional databases](/docs/products/mysql/howto/create-database)
- [Aiven Service Level Agreement](https://aiven.io/sla)
