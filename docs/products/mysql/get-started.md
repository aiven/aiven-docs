---
title: Get started with Aiven for MySQL®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import CreateServiceFreeDBLegacy from "@site/static/includes/create-service-console-free-db-legacy.md";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Start using Aiven for MySQL® by creating a service, connecting to it, and loading sample data.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)
- [MySQL CLI client](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)
  installed

</TabItem>
<TabItem value="terraform" label="Terraform" default>

- [Terraform installed](https://www.terraform.io/downloads)
- A [personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)
- [MySQL CLI client](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)
  installed

</TabItem>
</Tabs>

## Create a service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateServiceFreeDBLegacy serviceType="MySQL"/>

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/mysql) on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='mysql/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='mysql/service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='mysql/variables.tf' />

1. Create a file named `terraform.tfvars` and add values for the variables
   without defaults:

   - `aiven_token`: your token
   - `aiven_project_name`: the name of one of your Aiven projects
   - `mysql_password`: a password for the service user

1. To output connection details, create a file named `output.tf` and add the following:

    <TerraformSample filename='mysql/output.tf' />

<TerraformApply />

</TabItem>
</Tabs>

## Configure a service

Edit your service settings if the default service configuration doesn't meet your needs.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Select the new service from the list of services on
   the <ConsoleLabel name="Services"/> page.
1. On the <ConsoleLabel name="overview"/> page, select <ConsoleLabel name="service settings"/>
   from the sidebar.
1. In the **Advanced configuration** section, make changes to the service configuration.

See the available configuration options in
[Advanced parameters for Aiven for MySQL](/docs/products/mysql/reference/advanced-params).

</TabItem>
<TabItem value="terraform" label="Terraform">

See
[the `aiven_mysql` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql)
for the full schema.

</TabItem>
</Tabs>

## Connect to the service{#connect-to-service}

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>
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
<TabItem value="terraform" label="Terraform">

Access your new service with [the MySQL client](/docs/products/mysql/howto/connect-from-cli)
using the outputs.

1. To store the outputs in environment variables, run:

   ```bash
   MYSQL_HOST="$(terraform output -raw mysql_service_host)"
   MYSQL_PORT="$(terraform output -raw mysql_service_port)"
   MYSQL_USER="$(terraform output -raw mysql_service_username)"
   MYSQL_PASSWORD="$(terraform output -raw mysql_service_password)"
   ```

1. To use the environment variables with the MySQL client to connect to the service, run:

   ```bash
   mysql --host=$MYSQL_HOST --port=$MYSQL_PORT --user=$MYSQL_USER --password=$MYSQL_PASSWORD --database defaultdb
   ```

</TabItem>
<TabItem value="mysql" label="mysql">
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

<RelatedPages/>

- [Connect to Aiven for MySQL with MySQL Workbench](/docs/products/mysql/howto/connect-from-mysql-workbench)
- [Migrate to Aiven from an external MySQL](/docs/products/mysql/howto/migrate-from-external-mysql)
- [Create additional databases](/docs/products/mysql/howto/create-database)
- [Aiven Service Level Agreement](https://aiven.io/sla)
