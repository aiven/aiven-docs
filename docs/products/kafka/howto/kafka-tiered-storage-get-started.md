---
title: Get started with tiered storage

---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven for Apache Kafka tiered storage optimizes resources by storing recent, frequently accessed data on faster local disks.
As data becomes less active, it moves to more economical, slower storage, balancing
performance with cost efficiency.

For a detailed understanding of tiered storage, its workings, and benefits, see
[Tiered storage in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-tiered-storage).

## Step 1: Enable tiered storage for service

First, enable tiered storage for your Aiven for Apache Kafka service. This
sets up the necessary infrastructure for using tiered storage.

1. Log in to the [Aiven console](https://console.aiven.io/).
1. Select your project and the Aiven for Apache Kafka service.
1. See [enable tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage).

:::note

- Aiven for Apache Kafka® supports tiered storage starting from Apache Kafka® version
  3.6 or later. It is recommended to upgrade to the latest default version and apply
  [maintenance updates](/docs/platform/concepts/maintenance-window#maintenance-updates)
  when using tiered storage for the latest fixes and improvements.
- Tiered storage is not available on startup-2 plans.

:::

## Step 2: Configure tiered storage per topic

After enabling tiered storage at the service level, configure it for specific
topics to have granular control over your data storage.

- Follow the detailed instructions to [enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage).
- On the <ConsoleLabel name="topics" /> page, topics using tiered storage display
  **Active** in the **Tiered storage** column.

## Step 3: Monitor tiered storage usage

Monitor your tiered storage usage to ensure optimal performance and cost efficiency.

- Access the <ConsoleLabel name="Tiered storage" /> overviwe page in your
  Aiven for Apache Kafka service.
- Review details on billing, settings, and specific storage aspects.

## Related Pages

- [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
- [Tiered storage usage overview in the Aiven Console](/docs/products/kafka/howto/tiered-storage-overview-page)
