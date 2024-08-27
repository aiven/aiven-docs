---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"

Start using Aiven for Apache Kafka® by creating and configuring a service, connecting to it, and working with your data.

## Create an Aiven for Apache Kafka® service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>

<CreateService serviceType="Apache Kafka®"/>

</TabItem>
<TabItem value="2" label="Terraform">

1. [Create an authentication token](/docs/platform/howto/create_authentication_token).
1. Create a `sample.tf` file for the `aiven` provider configuration and the `aiven_kafka`
   resource.

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

   resource "aiven_kafka" "kafka" {
     project                 = var.aiven_project_name
     cloud_name              = "google-europe-west1"
     plan                    = "startup-16"
     service_name            = "my-kafka"
     maintenance_window_dow  = "friday"
     maintenance_window_time = "23:00:00"

     kafka_user_config {
       kafka_version = "2.7"
     }
   }

   output "kafka_service_host" {
     value = aiven_kafka.kafka.service_host
   }

   output "kafka_service_port" {
     value = aiven_kafka.kafka.service_port
   }

   output "kafka_service_username" {
     value = aiven_kafka.kafka.service_username
   }

   output "kafka_service_password" {
     value     = aiven_kafka.kafka.service_password
     sensitive = true
   }
   ```

1. Create the `terraform.tfvars` file to assign values to your declared variables.

    ```hcl
    aiven_token       = "AIVEN_TOKEN"
    aiven_project_name = "PROJECT_NAME"
    ```

1. Run `terraform init` > `terraform plan` > `terraform apply --auto-approve`.
1. Store Terraform outputs in environment variables to use them for [connecting](#connect-to-service):

    ```bash
    KAFKA_HOST="$(terraform output -raw kafka_service_host)"
    KAFKA_PORT="$(terraform output -raw kafka_service_port)"
    KAFKA_USER="$(terraform output -raw kafka_service_username)"
    KAFKA_PASSWORD="$(terraform output -raw kafka_service_password)"
    ```

</TabItem>
</Tabs>

## Create an Apache Kafka® topic

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="topics" /> in the sidebar.
1. Click **Create topic** and enter a name for the topic.
1. If required, set the advanced configuration option to **Yes**.
1. Set properties like replication factor, number of partitions, and other settings.
   These can be changed later.
1. Click **Create topic**.


</TabItem>
<TabItem value="CLI" label="CLI">

1. Determine the topic specifications, including the number of partitions, replication
   factor, and other settings.
1. Run the following command to create the `exampleTopic` topic:

   ```bash
   avn service topic-create             \
       --project demo-kafka-project    \
       --service-name demo-kafka-service \
       --topic exampleTopic            \
       --partitions 2                  \
       --replication 2
   ```

   Parameters:
   - `avn service topic-create`: Creates a topic.
   - `--project demo-kafka-project`: Specifies the project name.
   - `--service-name demo-kafka-service`: Specifies the Aiven for Apache Kafka® service name.
   - `--topic exampleTopic`: Specifies the name of the topic to create.
   - `--partitions 2`: Specifies the number of partitions for the topic.
   - `--replication 2`: Specifies the replication factor for the topic.

</TabItem>
</Tabs>

## Connect and produce/consume messages

Connect to your Aiven for Apache Kafka service to start producing and consuming messages.
The **Quick connect** in the Aiven Console helps you establish a connection.

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project, and
   the Aiven for Apache Kafka® service.
1. On the <ConsoleLabel name="overview"/> page of your service, click
   **Quick connect**.
1. In the **Connect** window, select a tool or language to connect to your service,
   follow the connection instructions, and click **Done**.

After connecting, use your client to produce messages to your Apache Kafka® topics
and consume messages using the appropriate consumer setup.

## Integration with Aiven for Apache Kafka

Aiven for Apache Kafka® supports a wide range of integrations that extend its
capabilities, allowing you to seamlessly connect with external systems. Some key integration options include:

- [Apache Kafka Connect](/docs/products/kafka/kafka-connect): Integrate
  with external systems like databases and file systems.
- [Apache Kafka MirrorMaker](/docs/products/kafka/kafka-mirrormaker):
  Enable cross-cluster replication.
- [Prometheus and Datadog](/docs/products/kafka/howto/kafka-prometheus-privatelink):
  Monitor and manage Kafka metrics.
- [Elasticsearch](/docs/integrations/send-logs-to-elasticsearch) and OpenSearch: Store
  logs and perform search and analytics.
- [Apache Flink® and Apache Kafka® Streams](/docs/products/kafka/howto/kafka-streams-with-aiven-for-kafka):
  Process and analyze real-time data streams.

These integrations can be configured within the Aiven Console
under **Integration endpoints**, allowing you to connect your Kafka service
with other platforms and tools efficiently.

## View topic catalog

The Aiven for Apache Kafka® topic catalog provides a centralized interface to view,
request, and manage topics across projects. It simplifies topic management and ensures
governance within your Aiven for Apache Kafka infrastructure.

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Click **Tools**.
1. Select Apache Kafka topic catalog.

Explore more in the [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview).

## Enable governance

Governance in Aiven for Apache Kafka® provides a secure and efficient way to manage your
Apache Kafka clusters. It centralizes control through policies and roles, ensuring
compliance and enforcing standards across your Aiven for Apache Kafka environments.

:::note
You need super admin permissions to enable governance.
:::

1. Access the [Aiven Console](https://console.aiven.io/) and click **Admin**.
1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Click **Enable governance**.

Manage topic creation and ownership requests for Apache Kafka® resources, ensuring
they meet governance standards.

Discover more in the [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview).

## Configure Aiven for Apache Kafka® Connect

Aiven for Apache Kafka® Connect lets you integrate your Aiven for Apache Kafka
service with other data sources and sinks. Set up Apache Kafka Connect in your project
to start building data pipelines.

1. Ensure your project includes a Kafka service.
1. Create a dedicated Kafka Connect service via the Aiven Console.
1. Set up and deploy connectors to integrate with external systems.

## Enable and use Karapace

Karapace provides schema registry and REST APIs for managing schemas and interacting
with Aiven for Apache Kafka.

1. Enable Karapace schema registry and REST APIs in your Kafka service.
2. Use Karapace to manage schemas and access Kafka via REST APIs.

Learn more about [Karapace schema registry](/docs/products/kafka/karapace/concepts/schema-registry-authorization).


## Next steps

- Explore our [examples project](https://github.com/aiven/aiven-examples) for code samples.
- Use our [sample data generator project](https://github.com/aiven/python-fake-data-producer-for-apache-kafka) to create test data.
