---
title: Get started with Aiven for Apache Cassandra®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"

Start using Aiven for Apache Cassandra® by creating and configuring a service, connecting to it, and playing with sample data.

## Prerequisites

You need some of the following dev tools for different Aiven for Apache Cassandra operations:

- [Apache Cassandra and the `cqlsh` client](https://cassandra.apache.org/doc/stable/cassandra/getting_started/installing.html)
- Access to the [Aiven Console](https://console.aiven.io)
- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
- [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/prerequisites.html)

## Create an Aiven for Apache Cassandra® service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>

<CreateService serviceType="Apache Cassandra®"/>

</TabItem>
<TabItem value="2" label="Terraform">
Create an Aiven for Apache Cassandra service using the Aiven Provider for Terraform.

1. [Create a token](/docs/platform/howto/create_authentication_token).

1. Create the `cassandra-sample.tf` file for the `aiven` provider configuration and
   the `aiven_cassandra` resource.

   ```hcl
   variable "aiven_token" {
     type = string
   }

   variable "aiven_project_name" {
     type = string
   }

   terraform {
     required_providers {
       aiven = {
         source  = "aiven/aiven"
         version = ">=4.0.0, <5.0.0"
       }
     }
   }

   provider "aiven" {
     api_token = var.aiven_token
   }

   resource "aiven_cassandra" "example_cassandra" {
     project                 = var.aiven_project_name
     cloud_name              = "google-europe-west1"
     plan                    = "startup-4"
     service_name            = "cassandra-sample"
     maintenance_window_dow  = "friday"
     maintenance_window_time = "23:00:00"
     termination_protection  = false

     cassandra_user_config {
       migrate_sstableloader = true
       service_log           = false
     }
   }

   output "cassandra_service_host" {
     value = aiven_cassandra.example_cassandra.service_host
   }

   output "cassandra_service_port" {
     value = aiven_cassandra.example_cassandra.service_port
   }

   output "cassandra_service_username" {
     value = aiven_cassandra.example_cassandra.service_username
   }

   output "cassandra_service_password" {
     value     = aiven_cassandra.example_cassandra.service_password
     sensitive = true
   }
    ```

1. Create the `terraform.tfvars` file for assigning actual values to your previously
   declared variables.

   ```hcl
   aiven_token    = "AIVEN_TOKEN"
   aiven_project_name = "PROJECT_NAME"
   ```

1. Run `terraform init` > `terraform plan` > `terraform apply`.

1. Store Terraform outputs in environment variables so that they can be used for
   [connecting](#connect-to-service):

   ```bash
   CASSANDRA_HOST="$(terraform output -raw cassandra_service_host)"
   CASSANDRA_PORT="$(terraform output -raw cassandra_service_port)"
   CASSANDRA_USER="$(terraform output -raw cassandra_service_username)"
   CASSANDRA_PASSWORD="$(terraform output -raw cassandra_service_password)"
   ```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
<TabItem value="3" label="Kubernetes">
Create an Aiven for Apache Cassandra service using the Aiven Operator for Kubernetes.

1. [Get authenticated and authorized](https://aiven.github.io/aiven-operator/authentication.html).
1. Create file `cassandra-sample.yaml` with the following content:

    ```yaml
    apiVersion: aiven.io/v1alpha1
    kind: Cassandra
    metadata:
      name: cassandra-sample
    spec:
      authSecretRef:
        name: aiven-token
        key: token

      connInfoSecretTarget:
        name: cassandra-secret

      userConfig:
        migrate_sstableloader: true
        service_log: false

      project: PROJECT_NAME
      cloudName: google-europe-west1
      plan: startup-4

      maintenanceWindowDow: friday
      maintenanceWindowTime: 23:00:00
    ```

1. Create the service by applying the configuration:

   ```shell
   kubectl apply -f cassandra-sample.yaml
   ```

1. Review the resource you created with the following command:

   ```shell
   kubectl get cassandras cassandra-sample
   ```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
</Tabs>

## Configure the service

You can change your service settings by updating the service configuration.

:::tip
See configuration options in
[Advanced parameters for Aiven for Apache Cassandra®](/docs/products/cassandra/reference/advanced-params).
:::

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Select the new service from the list of services on
   the <ConsoleLabel name="Services"/> page.
1. On the <ConsoleLabel name="overview"/> page, select <ConsoleLabel name="service settings"/>
   from the sidebar.
1. In the **Advanced configuration** section, make changes to the service configuration.
</TabItem>
<TabItem value="2" label="Terraform">
:::note
Your changes can force the recreation of the `aiven_cassandra` resource.
:::

See attributes available for the `aiven_cassandra` resource in
[the Aiven Provider for Terraform® documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cassandra).

1. Update the `aiven_cassandra` resource in the `cassandra-sample.tf` file:

   - Add `service_log = true` and `termination_protection = true`.
   - Update `maintenance_window_dow = "sunday"` and `maintenance_window_time = "22:00:00"`.

    ```hcl
    variable "aiven_token" {
      type = string
    }

    variable "aiven_project_name" {
      type = string
    }

    terraform {
      required_providers {
        aiven = {
          source  = "aiven/aiven"
          version = ">=4.0.0, <5.0.0"
        }
      }
    }

    provider "aiven" {
      api_token = var.aiven_token
    }

    resource "aiven_cassandra" "example_cassandra" {
      project                 = var.aiven_project_name
      cloud_name              = "google-europe-west1"
      plan                    = "startup-4"
      service_name            = "cassandra-sample"
      maintenance_window_dow  = "sunday"
      maintenance_window_time = "22:00:00"
      termination_protection  = true

      cassandra_user_config {
        migrate_sstableloader = true
        service_log = true
      }
    }

    output "cassandra_service_host" {
      value = aiven_cassandra.example_cassandra.service_host
    }

    output "cassandra_service_port" {
      value = aiven_cassandra.example_cassandra.service_port
    }

    output "cassandra_service_username" {
    value = aiven_cassandra.example_cassandra.service_username
    }

    output "cassandra_service_password" {
      value     = aiven_cassandra.example_cassandra.service_password
      sensitive = true
    }
    ```

1. Run `terraform plan` > `terraform apply`.

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
<TabItem value="3" label="Kubernetes">
:::note
Your changes can force the recreation of the `aiven_cassandra` resource.
:::

See available configuration options in
[Aiven Operator for Kubernetes®: Cassandra](https://aiven.github.io/aiven-operator/api-reference/cassandra.html).

1. Update file `cassandra-sample.yaml`:

   - Add `service_log: true` and `terminationProtection: true`.
   - Update `maintenanceWindowDow: sunday` and `maintenanceWindowTime: 22:00:00`.

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: Cassandra
   metadata:
     name: cassandra-sample
   spec:
     authSecretRef:
       name: aiven-token
       key: token

     connInfoSecretTarget:
       name: cassandra-secret

     userConfig:
       migrate_sstableloader: true
       service_log: true

     project: PROJECT_NAME
     cloudName: google-europe-west1
     plan: startup-4

     maintenanceWindowDow: sunday
     maintenanceWindowTime: 22:00:00
     terminationProtection: true
   ```

1. Update the service by applying the configuration:

   ```shell
   kubectl apply -f cassandra-sample.yaml
   ```

1. Review the resource you updated with the following command:

   ```shell
   kubectl describe cassandra.aiven.io cassandra-sample
   ```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
</Tabs>

## Connect to the service{#connect-to-service}

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your
   organization > project > Aiven for Apache Cassandra service.
1. On the <ConsoleLabel name="overview"/> page of your service, click
   **Quick connect**.
1. In the **Connect** window, select a tool or language to connect to your service, follow
   the connection instructions, and click **Done**.

   ```bash
   # Sample command for connecting with the cqlsh client

   ./cqlsh --ssl -u USER_NAME -p PASSWORD HOST_NAME PORT_NUMBER
   ```

</TabItem>
<TabItem value="2" label="Terraform">
Access your new service with the Apache Cassandra client using the environment variables
assigned to Terraform outputs:

```bash
./cqlsh --ssl --host=$CASSANDRA_HOST --port=$CASSANDRA_PORT --user=$CASSANDRA_USER --password=$CASSANDRA_PASSWORD
```

</TabItem>
<TabItem value="cqlsh" label="cqlsh client">
[Connect to your new service with CLI](/docs/products/cassandra/howto/connect-cqlsh-cli)
using the
[the `cqlsh` client](https://cassandra.apache.org/doc/stable/cassandra/tools/cqlsh.html).
</TabItem>
</Tabs>

:::tip
Discover more tools for connecting to Aiven for Apache Cassandra in
[Connect to Aiven for Apache Cassandra®](/docs/products/cassandra/howto/list-code-samples).
:::

## Create keyspaces and tables

Use `cqlsh` to create a keyspace and a table where you can insert your data next.

1. Create a keyspace, for example `library`:

   ```sql
   CREATE KEYSPACE IF NOT EXISTS library WITH REPLICATION = { 'class': 'NetworkTopologyStrategy', 'aiven': 3 };
   ```

   where `aiven` is the default datacenter name for Aiven for Apache Cassandra services.

1. Create a table within the `library` keyspace, for example `book_tracker`:

   ```sql
   CREATE TABLE IF NOT EXISTS library.book_tracker (book_id text PRIMARY KEY, item_count int, genre text, status text, last_update_timestamp timestamp);
   ```

## Insert data

Use `cqlsh` to write data in the `book_tracker` table, for example:

```sql
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('01234', 6, 'true_crime', 'available', toTimeStamp(now()));
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('56789', 13, 'romance', 'unavailable', toTimeStamp(now()));
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('12345', 55, 'spirituality_religions', 'available', toTimeStamp(now()));
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('67890', 3, 'adventure', 'unavailable', toTimeStamp(now()));
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('98765', 6, 'true_crime', 'available', '2024-08-01');
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('98765', 22, 'history', 'available', '2024-08-01');
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('87654', 4, 'psychology', 'unavailable', '2022-02-11');
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('76543', 101, 'health', 'available', '2010-09-23');
INSERT INTO library.book_tracker (book_id, item_count, genre, status, last_update_timestamp) VALUES ('65432', 74, 'horror', 'unavailable', '2007-11-19');
```

:::tip
For importing large amount of data or for batch data load, see:

- [Use DSBULK to load, unload, and count data](/docs/products/cassandra/howto/use-dsbulk-with-cassandra)
- [Migrate to Aiven with the ZDM Proxy](/docs/products/cassandra/howto/zdm-proxy)

:::

## Read data

Use `cqlsh` to read data from the `book_tracker` table, for example:

- ```sql
  SELECT * FROM library.book_tracker WHERE book_id = '01234';

  book_id | genre      | item_count | last_update_timestamp           | status
  --------+------------+------------+---------------------------------+----------
   01234  | true_crime |          6 | 2024-07-31 11:21:14.263000+0000 | available
  ```

- ```sql
  SELECT genre, item_count FROM library.book_tracker WHERE book_id IN ('01234', '12345');

  genre                  | item_count
  -----------------------+-----------
              true_crime |          6
  spirituality_religions |         55
  ```

- ```sql
  SELECT last_update_timestamp, status FROM library.book_tracker WHERE book_id IN ('01234', '12345', '98765', '87654');

  last_update_timestamp           | status
  --------------------------------+------------
  2024-07-31 11:21:14.263000+0000 |   available
  2024-07-31 11:24:20.373000+0000 |   available
  2022-02-11 00:00:00.000000+0000 | unavailable
  2024-08-01 00:00:00.000000+0000 |   available
  ```

## Related pages

- [Supported Aiven for Apache Cassandra versions](/docs/platform/reference/eol-for-major-versions#h_0f2929c770)
- [Aiven for Apache Cassandra backups](/docs/platform/concepts/service_backups#aiven-for-apache-cassandra)
- [Cross-cluster replication](/docs/products/cassandra/concepts/cross-cluster-replication)
