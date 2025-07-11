---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Start using Aiven for Apache Kafka® by setting up and configuring a service, connecting to it, and managing your data.

## Prerequisites

Before you begin, ensure you have access to the following tools:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
<TabItem value="cli" label="CLI">

- [Aiven CLI](https://github.com/aiven/aiven-client#installation) installed
- [A personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)

</TabItem>
</Tabs>

## Create an Aiven for Apache Kafka® service

You can create your Aiven for Apache Kafka service using the Aiven Console, the Aiven CLI,
or automate the process with Terraform.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateService serviceType="Apache Kafka®"/>

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files create only one Kafka service in your Aiven project.
They are part of the Kafka Connect example in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/kafka_connect) on GitHub. The complete example in the repository creates a
Kafka service and
[integrates it with a Kafka Connect service](/docs/products/kafka/kafka-connect/get-started).

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/kafka_service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

1. Optional: To output connection details, create a file named `output.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/output.tf' />

<TerraformApply />

</TabItem>
<TabItem value="cli" label="CLI">

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

## Stream sample messages to explore your service

Use the built-in sample data generator in the Aiven Console to test your Kafka service
in seconds and observe how messages move through topics and schemas.

The generator automatically creates a topic, applies an Avro schema, and streams
sample data for a selected duration.

1. In the [Aiven Console](https://console.aiven.io), go to your
   Aiven for Apache Kafka service.
1. On the <ConsoleLabel name="overview" /> page, scroll to the **Start data stream**
   section.
1. Click **Generate sample data** and follow the setup wizard.

To learn more,
see [Stream sample data from the Aiven Console](/docs/products/kafka/howto/generate-sample-data).

## Create an Apache Kafka® topic

Once your service is created, you can add topics for organizing and managing your
messages.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="topics" /> in the sidebar.
1. Click **Create topic** and enter a name for the topic.
1. If required, set the advanced configuration option to **Yes**.
1. Set properties like replication factor, number of partitions, and other settings.
   These can be changed later.
1. Click **Create topic**.

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_kafka_topic/resource.tf' />

More information on this resource and its configuration options are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_topic).

</TabItem>
<TabItem value="cli" label="CLI">

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
You need [super admin](/docs/platform/howto/manage-permissions#make-users-super-admin)
permissions to enable governance.
:::

1. Access the [Aiven Console](https://console.aiven.io/) and click **Admin**.
1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Click **Enable governance**.

Learn more about the [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview).

<RelatedPages/>

- Explore [examples project](https://github.com/aiven/aiven-examples) for code samples.
- Use the [sample data generator project](https://github.com/aiven/python-fake-data-producer-for-apache-kafka)
  to create test data.
- Learn about the [Karapace Schema Registry](https://github.com/Aiven-Open/karapace) for
  managing schemas and interacting with Apache Kafka.
- Use the [Apache Kafka REST API](/docs/products/kafka/concepts/kafka-rest-api) to
  programmatically access your Apache Kafka service, produce and consume messages, and
  manage schemas.
