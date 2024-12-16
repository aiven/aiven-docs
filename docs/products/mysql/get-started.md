---
title: Get started with Aiven for MySQL®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"

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

<CreateService serviceType="MySQL"/>

</TabItem>
<TabItem value="2" label="Terraform">

1. [Create a token](/docs/platform/howto/create_authentication_token).
1. Store the token in an environment variable:

   ```bash
   export TF_VAR_aiven_api_token=YOUR_AIVEN_TOKEN
   ```

1. Create the following Terraform files:

   - `provider.tf` for the `aiven` provider configuration

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

   - `mysql.tf` including the `aiven_mysql` resource

      ```hcl
      resource "aiven_mysql" "mysql" {
        project      = var.project_name
        service_name = var.service_name
        cloud_name   = var.cloud_name
        plan         = var.service_plan
      }

      output "mysql_service_host" {
        value = aiven_mysql.mysql.service_host
      }

      output "mysql_service_port" {
        value = aiven_mysql.mysql.service_port
      }

      output "mysql_service_username" {
        value = aiven_mysql.mysql.service_username
      }

      output "mysql_service_password" {
        value     = aiven_mysql.mysql.service_password
        sensitive = true
      }
      ```

   - `variables.tf` for declaring your project variables

      ```hcl
      variable "aiven_api_token" {
        description = "Aiven token"
        type        = string
      }

      variable "project_name" {
        description = "Project name"
        type        = string
      }

      variable "cloud_name" {
        description = "Cloud name"
        type        = string
      }

      variable "service_name" {
        description = "Service name"
        type        = string
      }

      variable "service_plan" {
        description = "Service plan"
        type        = string
      }
      ```

   - `terraform.tfvars` for assigning actual values to your previously declared variables

      ```hcl
      project_name = "testproject-o3jb"
      cloud_name   = "google-europe-west3"
      service_name = "mysql"
      service_plan = "startup-4"
      ```

1. Run `terraform init` > `terraform plan` > `terraform apply --auto-approve`.

1. Store Terraform outputs in environment variables so that they can be used for
   [connecting](#connect-to-service):

   ```bash
   MYSQL_HOST="$(terraform output -raw mysql_service_host)"
   MYSQL_PORT="$(terraform output -raw mysql_service_port)"
   MYSQL_USER="$(terraform output -raw mysql_service_username)"
   MYSQL_PASSWORD="$(terraform output -raw mysql_service_password)"
   ```

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
  project      = var.project_name
  service_name = var.service_name
  cloud_name   = var.cloud_name
  plan         = var.service_plan
+
+  maintenance_window_dow  = "monday"
+  maintenance_window_time = "01:00:00"
+  termination_protection  = true
+
+  mysql_user_config {
+    backup_hour      = 01
+    backup_minute    = 30
+    ip_filter_string = ["10.20.0.0/16"]
+    service_log      = true
+
+    mysql {
+      slow_query_log  = true
+      long_query_time = 5
+    }
+  }
}

output "mysql_service_host" {
  value = aiven_mysql.mysql.service_host
}

output "mysql_service_port" {
  value = aiven_mysql.mysql.service_port
}

output "mysql_service_username" {
  value = aiven_mysql.mysql.service_username
}

output "mysql_service_password" {
  value     = aiven_mysql.mysql.service_password
  sensitive = true
}
```

</TabItem>
</Tabs>

See the available configuration options in
[Advanced parameters for Aiven for MySQL](/docs/products/mysql/reference/advanced-params).

## Connect to the service{#connect-to-service}

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your
   organization > project > Aiven for MySQL service.
1. On the <ConsoleLabel name="overview"/> page of your service, click
   **Quick connect**.
1. In the **Connect** window, select a tool or language to connect to your service, follow
   the connection instructions, and click **Done**.

   ```bash
   mysql --user avnadmin --password=ADMIN_PASSWORD --host mysql-sakila-dev-sandbox.f.aivencloud.com --port 12691 defaultdb
   ```

</TabItem>
<TabItem value="2" label="Terraform">

Access your new service with the MySQL client using the environment variables assigned to
Terraform outputs:

```bash
mysql --host=$MYSQL_HOST --port=$MYSQL_PORT --user=$MYSQL_USER --password=$MYSQL_PASSWORD --database defaultdb
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

1.  Download the `sakila` database archive (`tar` or `zip` format) from the
    [MySQL example databases](https://dev.mysql.com/doc/sakila/en/sakila-installation.html)
    page, and extract it to your desired location (for example `/tmp/`).

1.  From the folder where you unpacked the archive,
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
        ```text
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
    ```text
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
    ```text
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
    ```text
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
