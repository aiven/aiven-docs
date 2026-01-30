---
title: Storage usage and settings in Aiven Console
sidebar_label: Storage usage and settings
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

Use the tiered storage overview page to review storage usage, billing, and retention settings for your Aiven for Apache Kafka® service.

In the Aiven Console, storage is labeled differently based on the cluster type.
Classic Kafka clusters show **Tiered storage**, which can be enabled and configured.
Inkless Kafka clusters show **Storage**, reflecting that object storage is always part of the data path.

## Prerequisite

- An Aiven for Apache Kafka® service.
- For Classic Kafka clusters, tiered storage enabled. For details, see
  [Enable tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage).

## Access tiered storage overview page

1. In the [Aiven Console](https://console.aiven.io/), select your project and your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="Tiered storage" /> (Classic Kafka) or
   <ConsoleLabel name="Inkless storage" /> (Inkless Kafka).

   For Classic Kafka clusters:

  - If tiered storage is not enabled for the service, the option to enable it is shown.
  - If tiered storage is enabled but not configured for any topics, the option to enable it
    for topics is shown. For details, see [Enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage).

1. Once configured, you can view an overview of tiered storage and its details.

## Key insights

View essential metrics and details related to tiered storage:

- **Current billing expenses in USD:** Your tiered storage costs, calculated at hourly rates
- **Forecasted month cost in USD:** Your upcoming monthly costs based on current usage
- **Remote tier usage in bytes:** The volume of data that has been tiered
- **Storage overview:** An overview of how topics use [remote storage](/docs/products/kafka/howto/view-kafka-storage-in-console#remote-storage-overview)

## Storage settings and retention

View the current local cache details and retention policy configurations for tiered storage:

- **Default local retention time (ms):** The current local data retention set in milliseconds
- **Default local retention bytes:** The configured volume of data, in bytes, for local retention

### Modify retention policies {#modify-retention-polices}

1. In the **Tiered storage settings** section, click
   <ConsoleLabel name="actions"/> > **Update tiered storage settings**.
1. In the **Update tiered storage settings** page, adjust the values for:
   - **Default local retention time (ms)**
   - **Default local retention bytes**
1. Click **Save changes**.

## Remote storage overview

View storage usage and configurations:

- **Remote storage usage by topics:** The amount of tiered storage each topic uses
- **Filter by topic:** Narrow down your view to specific topics
