---
title: Get started with Aiven for Apache Kafka® Connect
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Get started with Aiven for Apache Kafka® Connect and integrate it with an Aiven for Apache Kafka® service.

## Prerequisites

Your project must include at least one Aiven for Apache Kafka® service. If it does
not, [create one](/docs/platform/howto/create_new_service).

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
</Tabs>

## Create a dedicated Aiven for Apache Kafka® Connect service {#apache_kafka_connect_dedicated_cluster}

Create a Kafka Connect service and integrate it with an Aiven for Apache Kafka® service.

:::note
For Inkless Kafka services, Kafka Connect must run as a dedicated service.

If no Kafka Connect service exists, create a Kafka Connect service and enable the
integration from the Kafka service.
:::


<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io) and open the
   **Aiven for Apache Kafka** service.
1. In the left sidebar, click <ConsoleLabel name="Connectors"/>.
   - For Classic Kafka services, click **Integrate standalone service**.
   - For Inkless Kafka services, click **Create Kafka Connect**.
1. In the Kafka Connect integration dialog, do one of the following:
   - If a compatible Kafka Connect service exists, select **Existing service** and
     choose the service.
   - If no compatible service exists, select **New service** to create one.
1. If you create a new Kafka Connect service, configure the service:
   1. Select a cloud provider and region.
   1. Select a service plan.
   1. In **Service basics**, enter a service name. You cannot change the service name
      after creation.
1. Click **Create service**.
1. After the service is created, return to the integration dialog and click **Enable**
   to enable the Kafka Connect integration.

After the integration is enabled, Kafka Connect appears as an integration on the Kafka
service. Wait until the service status changes from **Rebuilding** to **Running** before
using it.

</TabItem>
<TabItem value="terraform" label="Terraform">

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/kafka_connect)
on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/kafka_connect_service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

<TerraformApply />

</TabItem>
</Tabs>

## Next steps

- Review the [Aiven examples repository](https://github.com/aiven/aiven-examples) for
  Kafka Connect configuration examples.
- Generate test data using the
  [sample data generator](https://github.com/aiven/python-fake-data-producer-for-apache-kafka).
- Find available connectors in the
  [list of supported Kafka Connect plugins](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins).
