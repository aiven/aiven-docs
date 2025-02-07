---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"
import LimitedBadge from "@site/src/components/non-swizzled/Badges/LimitedBadge";
import EarlyBadge from "@site/src/components/non-swizzled/Badges/EarlyBadge";

Start using Aiven for Apache Kafka® by setting up and configuring a service, connecting to it, and managing your data.

## Prerequisites

Before you begin, ensure you have access to the following tools:

- [Aiven Console](https://console.aiven.io)
- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
- [Aiven CLI](/docs/tools/cli)

## Create an Aiven for Apache Kafka® service

You can create your Aiven for Apache Kafka service using the Aiven Console, the Aiven CLI,
or automate the process with Terraform.

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>

<CreateService serviceType="Apache Kafka®"/>

</TabItem>
<TabItem value="2" label="Terraform">

1. [Create a personal token](/docs/platform/howto/create_authentication_token).
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
     plan                    = "startup-2"
     service_name            = "my-kafka"
     maintenance_window_dow  = "friday"
     maintenance_window_time = "23:00:00"

     kafka_user_config {
       kafka_version = "3.7"
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

1. Create a `terraform.tfvars` file to assign values to your declared variables.

    ```hcl
    aiven_token       = "AIVEN_TOKEN"
    aiven_project_name = "PROJECT_NAME"
    ```

1. Run the following commands to initialize and apply the configuration:

   ```bash
   terraform init
   terraform plan
   terraform apply --auto-approve
   ```

1. Store the Terraform outputs in environment variables to use them when [connecting](#connect):

    ```bash
    KAFKA_HOST="$(terraform output -raw kafka_service_host)"
    KAFKA_PORT="$(terraform output -raw kafka_service_port)"
    KAFKA_USER="$(terraform output -raw kafka_service_username)"
    KAFKA_PASSWORD="$(terraform output -raw kafka_service_password)"
    ```

</TabItem>
<TabItem value="3" label="CLI">

Open your terminal and run the following command:

```bash
avn service create SERVICE_NAME           \
  --service-type kafka                    \
  --cloud CLOUD_REGION                    \
  --plan SERVICE_PLAN                     \
  -c kafka_connect=true                   \
  -c tiered_storage.enabled=true          \
  --disk-space-gib STORAGE_SIZE_GIB
```

Parameters:

- `SERVICE_NAME`: Name for your Aiven for Apache Kafka service.
- `CLOUD_REGION`: Cloud region for deployment. For example,
  `google-europe-west3`.
- `SERVICE_PLAN`: Aiven subscription plan. For example, `business-4`.
- `kafka_connect`: Enables Kafka Connect. Use `true` to enable.
- `tiered_storage.enabled`: Enables tiered storage. Use `true` to enable.
- `STORAGE_SIZE_GIB`: Disk space in GiB. For example, `600`.

</TabItem>
</Tabs>

## Create an Apache Kafka® topic

Once your service is created, you can add topics for organizing and managing your
messages.

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
<TabItem value="Terraform" label="Terraform">

1. Add the following Terraform configuration to your `.tf` file:

   ```hcl
   resource "aiven_kafka_topic" "example_topic" {
     project                = data.aiven_project.example_project.project
     service_name           = aiven_kafka.example_kafka.service_name
     topic_name             = "example-topic"
     partitions             = 5
     replication            = 3
     termination_protection = true

     config {
       flush_ms       = 10
       cleanup_policy = "compact,delete"
     }

     timeouts {
       create = "1m"
       read   = "5m"
     }
   }
   ```

   Parameters:
   - `project`: Name of the project.
   - `service_name`: Name of the Aiven for Apache Kafka service.
   - `topic_name`: Name of the Apache Kafka topic.
   - `partitions`: Number of partitions for the topic.
   - `replication`: Replication factor for the topic.
   - `termination_protection`: Enables or disables deletion protection for the topic.
   - `config`: Additional Apache Kafka settings, such as flush interval and
     cleanup policy. For a list of supported configurations, see
     [Aiven for Apache Kafka topic configurations](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka#nested-schema-for-kafka_user_configkafka).
   - `timeouts`: Optional timeouts for creating and reading the topic.

1. Run `terraform apply` to create the topic with the defined configurations.

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
   - `--project demo-kafka-project`: The name of the project in Aiven.
   - `--service-name demo-kafka-service`: The name of the Aiven for Apache Kafka® service.
   - `--topic exampleTopic`: The name of the topic to create.
   - `--partitions 2`: The number of partitions for the topic.
   - `--replication 2`: The replication factor for the topic.

</TabItem>
</Tabs>

## Connect to your Aiven for Apache Kafka service {#connect}

You can connect to your Aiven for Apache Kafka service to interact with Apache Kafka
topics, allowing you to produce and consume messages.
Use **Quick connect** in the Aiven Console to guide the process.

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project, and
   the Aiven for Apache Kafka service.
1. On the <ConsoleLabel name="overview"/> page, click **Quick connect**.
1. In the **Connect** window, select your preferred tool or language from the drop-down
   list.
1. Follow the connection instructions. You may need to download:

   - **[CA certificate](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)**:
     Required for secure communication.
   - **Access certificate** and **Access key**: Needed for client certificate
     authentication.
1. Select your authentication method based on your environment:
   - **Client certificate**: Provides secure communication using SSL/TLS certificates.
     For information on downloading CA certificates, see
     [TLS/SSL certificates](https://aiven.io/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).
   - **SASL**: Provides authentication using Simple Authentication and Security Layer
     (SASL).
1. Click **Done**.

## Produce and consume messages

After connecting, use your preferred Apache Kafka client to produce and consume messages.

### Produce messages

To produce messages using Python:

```python
from kafka import KafkaProducer

# Set up the Kafka producer
producer = KafkaProducer(
    bootstrap_servers='your-kafka-host:port',  # Replace with your Kafka service host and port
    security_protocol='SSL',
    ssl_cafile='path/to/ca.pem',
    ssl_certfile='path/to/service.cert',
    ssl_keyfile='path/to/service.key'
)

# Send a test message to a topic
producer.send('your-topic', b'This is a test message')
producer.flush()
producer.close()
```

### Consume messages

To consume messages using Python:

```python
from kafka import KafkaConsumer

# Set up the Kafka consumer
consumer = KafkaConsumer(
    'your-topic',  # Replace with your topic name
    bootstrap_servers='your-kafka-host:port',  # Replace with your Kafka service host and port
    security_protocol='SSL',
    ssl_cafile='path/to/ca.pem',
    ssl_certfile='path/to/service.cert',
    ssl_keyfile='path/to/service.key',
    auto_offset_reset='earliest'
)

# Consume and print messages from the topic
for message in consumer:
    print(f"Received message: {message.value}")
```

## Integrate Aiven for Apache Kafka with external systems

Aiven for Apache Kafka supports a wide range of integrations, allowing you to connect
with external systems. Key integration options include:

- [Apache Kafka Connect](/docs/products/kafka/kafka-connect): Integrates Apache Kafka
  with external systems for data import, export, and building complex data pipelines.
  [Learn more about configuring Kafka Connect](#configure-aiven-for-apache-kafka-connect).
- [Apache Kafka MirrorMaker](/docs/products/kafka/kafka-mirrormaker): Enables
  cross-cluster replication to replicate data between Apache Kafka clusters for disaster
  recovery or geographical distribution.
- [Prometheus and Datadog](/docs/products/kafka/howto/kafka-prometheus-privatelink):
  Monitors and manages Apache Kafka metrics to help maintain the health and performance
  of your Apache Kafka services.
- [Elasticsearch](/docs/integrations/send-logs-to-elasticsearch) and OpenSearch: Stores
  Apache Kafka logs and performs advanced search and analytics, making it easier to query
  and analyze your Apache Kafka data.
- [Apache Flink® and Apache Kafka® Streams](/docs/products/kafka/howto/kafka-streams-with-aiven-for-kafka):
  Processes and analyzes real-time data streams from Apache Kafka for complex event
  processing and stream transformations.

You can configure these integrations in the Aiven Console. In your project, click
<ConsoleLabel name="integration endpoints"/> to efficient connect your Apache Kafka
service with other platforms and tools.

## Configure Aiven for Apache Kafka® Connect {#configure-aiven-for-apache-kafka-connect}

Aiven for Apache Kafka® Connect integrates your Apache Kafka service with various data
sources and sinks, enabling you to build and manage data pipelines.

:::note
Make sure your Aiven for Apache Kafka service is running on a business or premium plan.
:::

You can deploy Aiven for Apache Kafka Connect in two ways:

- For a cost-effective setup,
  [enable Apache Kafka Connect on the same node](/docs/products/kafka/kafka-connect/howto/enable-connect)
  as your Aiven for Apache Kafka service. Suitable only for testing or hobbyist workloads
  where cost minimization is a priority.
- For better performance and stability,
  [deploy a dedicated Aiven for Apache Kafka Connect service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
  Recommended for production deployments and larger workloads requiring reliability.

## Enable Karapace

[Karapace](/docs/products/kafka/karapace), an Aiven-built open-source schema registry
for Apache Kafka®, provides schema management and REST APIs for interacting with
Aiven for Apache Kafka.

1. [Enable](/docs/products/kafka/karapace/howto/enable-karapace) Karapace schema
   registry and REST APIs in your Kafka service.
1. Use Karapace to register, update, and version control your schemas.

Learn more about the [Karapace schema registry](/docs/products/kafka/karapace/concepts/schema-registry-authorization).

## View topic catalog <EarlyBadge/>

The Aiven for Apache Kafka topic catalog provides a centralized interface to view,
request, and manage topics across projects. It simplifies topic management and ensures
governance within your Aiven for Apache Kafka infrastructure.

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Click **Tools**.
1. Select Apache Kafka topic catalog.

Learn more about the [Aiven for Apache Kafka® topic catalog](/docs/products/kafka/concepts/topic-catalog-overview).

## Enable governance <LimitedBadge/>

[Governance](/docs/products/kafka/concepts/governance-overview) in Aiven for Apache Kafka
provides a secure and efficient way to manage your Apache Kafka clusters. It centralizes
control through policies and roles, ensuring compliance and enforcing standards across
your Aiven for Apache Kafka environments.

:::note
You need [super admin](/docs/platform/howto/make-super-admin) permissions to enable
governance.
:::

1. Access the [Aiven Console](https://console.aiven.io/) and click **Admin**.
1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Click **Enable governance**.

Learn more about the [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview).

## Related pages

- Explore [examples project](https://github.com/aiven/aiven-examples) for code samples.
- Use the [sample data generator project](https://github.com/aiven/python-fake-data-producer-for-apache-kafka)
  to create test data.
- Learn about the [Karapace Schema Registry](https://github.com/Aiven-Open/karapace) for
  managing schemas and interacting with Apache Kafka.
- Use the [Apache Kafka REST API](/docs/products/kafka/concepts/kafka-rest-api) to
  programmatically access your Apache Kafka service, produce and consume messages, and
  manage schemas.
