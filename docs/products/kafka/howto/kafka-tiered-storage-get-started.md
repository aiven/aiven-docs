---
title: Get started with tiered storage
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

Aiven for Apache Kafka tiered storage optimizes resources by storing recent, frequently accessed data on faster local disks and moving less active data to more economical, slower storage.

For a detailed understanding of tiered storage, its workings, and benefits, see
[Tiered storage in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-tiered-storage).

These steps apply only to Classic Kafka clusters. Tiered storage is optional and
configurable in Classic Kafka.

## Step 1: Enable tiered storage for the service

Enable tiered storage for your Aiven for Apache Kafka service to set up the necessary infrastructure.

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Select your project and the Aiven for Apache Kafka service.
1. See [enable tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage).

:::note

- Aiven for Apache Kafka® supports tiered storage starting from Apache Kafka® version
  3.6 or later. Upgrade to the latest default version and apply
  [maintenance updates](/docs/platform/concepts/maintenance-window#maintenance-updates) when using tiered storage for the latest fixes and improvements.
- Tiered storage is not available on startup-2 plans.

:::

## Step 2: Configure tiered storage per topic

Configure tiered storage for specific topics to control your data storage.

- Follow the instructions to [enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage).
- On the <ConsoleLabel name="topics" /> page, topics using tiered storage display
  **Active** in the **Tiered storage** column.

## Step 3: Monitor storage usage

Monitor storage usage for your Aiven for Apache Kafka® service.

- Open the <ConsoleLabel name="Tiered storage" />.
- Review billing, retention settings, and storage usage details.

## Related Pages

- [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
- [Storage usage and settings in Aiven Console](/docs/products/kafka/howto/view-kafka-storage-in-console)
