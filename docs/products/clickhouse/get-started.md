---
title: Get started with Aiven for ClickHouse®
sidebar_label: Get started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Start using Aiven for ClickHouse® by creating and configuring a service, connecting to it, and loading sample data.

## Prerequisites

Depending on a dev tool to use for working with Aiven for ClickHouse:

- Access to the [Aiven Console](https://console.aiven.io)
- [ClickHouse CLI client](https://clickhouse.com/docs/en/install)
- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
- [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/helm.html)

## Create a service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
[Create an Aiven for ClickHouse® service](/docs/platform/howto/create_new_service) in the
[Aiven Console](https://console.aiven.io).
</TabItem>
<TabItem value="2" label="Terraform">

1. [Create an authentication token](/docs/platform/howto/create_authentication_token).

1. Create the `sample.tf` file for the `aiven` provider configuration and
   the `aiven_clickhouse` resource.

    ```hcl
    variable "aiven_api_token" {
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
      api_token = var.aiven_api_token
    }

    resource "aiven_clickhouse" "clickhouse" {
      project                 = var.aiven_project_name
      cloud_name              = "google-europe-west1"
      plan                    = "startup-16"
      service_name            = "my-clickhouse"
      maintenance_window_dow  = "friday"
      maintenance_window_time = "23:00:00"

      clickhouse_user_config {
        service_log = false
      }
    }

    output "clickhouse_service_host" {
      value = aiven_clickhouse.clickhouse.service_host
    }
    output "clickhouse_service_port" {
      value = aiven_clickhouse.clickhouse.service_port
    }
    output "clickhouse_service_username" {
      value = aiven_clickhouse.clickhouse.service_username
    }
    output "clickhouse_service_password" {
      value     = aiven_clickhouse.clickhouse.service_password
      sensitive = true
    }
    ```

1. Create the `terraform.tfvars` file for assigning actual values to your previously
   declared variables.

   ```hcl
   aiven_api_token    = "AIVEN_API_TOKEN"
   aiven_project_name = "PROJECT_NAME"
   ```

1. Run `terraform init` > `terraform plan` > `terraform apply --auto-approve`.

1. Store Terraform outputs in environment variables so that they can be used for
   [connecting](#connect-to-service):

   ```bash
   CLICKHOUSE_HOST="$(terraform output -raw clickhouse_service_host)"
   CLICKHOUSE_PORT="$(terraform output -raw clickhouse_service_port)"
   CLICKHOUSE_USER="$(terraform output -raw clickhouse_service_username)"
   CLICKHOUSE_PASSWORD="$(terraform output -raw clickhouse_service_password)"
   ```

</TabItem>
<TabItem value="3" label="K8s">

Create an Aiven for ClickHouse service using the Aiven Operator for Kubernetes.

1. [Get authenticated and authorized](https://aiven.github.io/aiven-operator/authentication.html).
1. Create file `example.yaml` with the following content:

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: Clickhouse
   metadata:
     name: my-clickhouse
   spec:
     authSecretRef:
       name: aiven-token
       key: token

     connInfoSecretTarget:
       name: my-clickhouse-connection
       annotations:
         foo: bar
       labels:
         baz: egg

     tags:
       env: test
       instance: foo

     project: my-aiven-project
     cloudName: google-europe-west1
     plan: startup-16

     maintenanceWindowDow: friday
     maintenanceWindowTime: 23:00:00
     ```

1. Create the service by applying the configuration:

   ```go
   kubectl apply -f example.yaml
   ```

1. Review the resource you created with the following command:

   ```go
   kubectl get clickhouses my-clickhouse
   ```

The output is similar to the following:

```text
Name             Project             Region                 Plan          State
my-clickhouse    my-aiven-project    google-europe-west1    startup-16    RUNNING
```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
</Tabs>

## Configure the service

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

1. Updating the `aiven_clickhouse` resource in the `sample.tf` file:

   - Add `service_log = true` and `termination_protection = true`.
   - Update `maintenance_window_dow = "sunday"` and `maintenance_window_time = "22:00:00"`.

    ```hcl
    variable "aiven_api_token" {
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
      api_token = var.aiven_api_token
    }

    resource "aiven_clickhouse" "clickhouse" {
      project                 = var.aiven_project_name
      cloud_name              = "google-europe-west1"
      plan                    = "startup-16"
      service_name            = "my-clickhouse"
      maintenance_window_dow  = "sunday"
      maintenance_window_time = "22:00:00"
      termination_protection  = true

      clickhouse_user_config {
        service_log = true
      }
    }

    output "clickhouse_service_host" {
      value = aiven_clickhouse.clickhouse.service_host
    }
    output "clickhouse_service_port" {
      value = aiven_clickhouse.clickhouse.service_port
    }
    output "clickhouse_service_username" {
      value = aiven_clickhouse.clickhouse.service_username
    }
    output "clickhouse_service_password" {
      value     = aiven_clickhouse.clickhouse.service_password
      sensitive = true
    }
    ```

1. Run `terraform init` > `terraform plan` > `terraform apply --auto-approve`.

</TabItem>
<TabItem value="3" label="K8s">
1. Update file `example.yaml`:

   - Add `service_log: true` and `terminationProtection: true`.
   - Update `maintenanceWindowDow: sunday` and `maintenanceWindowTime: 22:00:00`.

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: Clickhouse
   metadata:
     name: my-clickhouse
   spec:
     authSecretRef:
       name: aiven-token
       key: token

     connInfoSecretTarget:
       name: my-clickhouse-connection
       annotations:
         foo: bar
       labels:
         baz: egg

     tags:
       env: test
       instance: foo

     userConfig:
       service_log: true

     project: my-aiven-project
     cloudName: google-europe-west1
     plan: startup-16

     maintenanceWindowDow: sunday
     maintenanceWindowTime: 22:00:00
     terminationProtection: true
     ```

1. Update the service by applying the configuration:

   ```go
   kubectl apply -f example.yaml
   ```

1. Review the resource you updated with the following command:

   ```go
   kubectl get clickhouses my-clickhouse
   ```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
</Tabs>

See the available configuration options in:

- [Aiven Operator for Kubernetes®: ClickHouse](https://aiven.github.io/aiven-operator/api-reference/clickhouse.html)
- [Advanced parameters for Aiven for ClickHouse®](/docs/products/clickhouse/reference/advanced-params).

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
   docker run -it \
   --rm clickhouse/clickhouse-server clickhouse-client \
   --user avnadmin \
   --password admin_password \
   --host clickhouse-service-name-project-name.e.aivencloud.com \
   --port 12691 \
   --secure
   ```

</TabItem>
<TabItem value="2" label="Terraform">
Access your new service with the ClickHouse client using the environment variables
assigned to Terraform outputs:

```bash
docker run -it \
--rm clickhouse/clickhouse-server clickhouse-client \
--user=$CLICKHOUSE_USER \
--password=$CLICKHOUSE_PASSWORD \
--host=$CLICKHOUSE_HOST \
--port=$CLICKHOUSE_PORT \
--secure
```

</TabItem>
<TabItem value="3" label="K8s">
You can verify your Aiven for ClickHouse connection from a Kubernetes workload by deploying
a Pod that runs the `clickhouse-client` command.

1. Create file `pod-clickhouse-client.yaml`:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: clickhouse-client-test-connection
    spec:
      restartPolicy: Never
      containers:
        - image: clickhouse-server:23.8
          name: clickhouse
          command: ["clickhouse-client", "$(DATABASE_URI)", "-c", "SELECT version();"]
          envFrom:
            - secretRef:
                name: my-clickhouse-connection
    ```

   It runs once and stops due to the `restartPolicy: Never` flag.

1. Inspect the log:

   ```go
   kubectl logs clickhouse-client-test-connection
   ```

   The output is similar to the following:

   ```text
                                              version
   ---------------------------------------------------------------------------------------------
   ClickHouse 23.8 on x86_64-pc-linux-gnu, compiled by gcc, a 68c5366192 p 6b9244f01a, 64-bit
   (1 row)
   ```

You have now connected to your Aiven for ClickHouse service and executed
the `SELECT version();` query.
</TabItem>
<TabItem value="4" label="ClickHouse client">
[Connect to your new service with CLI](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)
using the
[ClickHouse client](https://clickhouse.com/docs/en/integrations/sql-clients/cli).
</TabItem>
</Tabs>

:::tip
Discover more tools for connecting to Aiven for ClickHouse in
[Connect to Aiven for ClickHouse®](/docs/products/clickhouse/howto/list-connect-to-service).
:::

## Load a dataset

1. Download a dataset from
   [Example Datasets](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica/)
   using cURL:

   ```bash
   curl address_to_file_in_format_tsv_xz | unxz --threads=`nproc` > file-name.tsv
   ```

   :::note
   The `nproc` Linux command, which prints the number of processing units,
   is not available on macOS. To use the command, add an alias for
   `nproc` into your `~/.zshrc` file: `alias nproc="sysctl -n hw.logicalcpu"`.
   :::

   Once done, you should have two files: `hits_v1.tsv` and `visits_v1.tsv`.

1. [Create database](/docs/products/clickhouse/howto/manage-databases-tables#create-a-clickhouse-database)
   `datasets`.
1. Create tables in the `datasets` database: `hits_v1` and `visits_v1`.

   ```sql
   CREATE TABLE datasets.hits_v1 [...]
   ```

   ```sql
   CREATE TABLE datasets.visits_v1 [...]
   ```

1. Load data into tables `hits_v1` and `visits_v1`.

    1.  Go to the folder where you stored the downloaded files for
        `hits_v1.tsv` and `visits_v1.tsv`.

    1.  Run the following commands:

        ```bash
        cat hits_v1.tsv | docker run        \
        --interactive                       \
        --rm clickhouse/clickhouse-server clickhouse-client  \
        --user USERNAME                     \
        --password PASSWORD                 \
        --host HOST                         \
        --port PORT                         \
        --secure                            \
        --max_insert_block_size=100000      \
        --query="INSERT INTO datasets.hits_v1 FORMAT TSV"
        ```

        ```bash
        cat visits_v1.tsv | docker run      \
        --interactive                       \
        --rm clickhouse/clickhouse-server clickhouse-client   \
        --user USERNAME                     \
        --password PASSWORD                 \
        --host HOST                         \
        --port PORT                         \
        --secure                            \
        --max_insert_block_size=100000      \
        --query="INSERT INTO datasets.visits_v1 FORMAT TSV"
        ```

## Query data

Once the data is loaded, you can run queries against the sample data you imported.

- Query the number of items in the `hits_v1` table:

  ```sql
  SELECT COUNT(*) FROM datasets.hits_v1
  ```

- Find the longest lasting sessions using additional query features:

  ```sql
  SELECT StartURL AS URL,
      MAX(Duration) AS MaxDuration
  FROM datasets.visits_v1
  GROUP BY URL
  ORDER BY MaxDuration DESC
  LIMIT 10
  ```

## Next steps

- [Secure an Aiven for ClickHouse® service](/docs/products/clickhouse/howto/secure-service)
- [Manage Aiven for ClickHouse® users and roles](/docs/products/clickhouse/howto/manage-users-roles)
- [Manage Aiven for ClickHouse® database and tables](/docs/products/clickhouse/howto/manage-databases-tables)
- [Integrate an Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
