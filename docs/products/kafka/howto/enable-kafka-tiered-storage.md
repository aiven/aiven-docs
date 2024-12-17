---
title: Enable tiered storage for Aiven for Apache Kafka®
sidebar_label: Enable tiered storage
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"

Tiered storage significantly improves the storage efficiency of your Aiven for Apache Kafka® service.

## Prerequisites

- Access to an Aiven organization and at least one project.
- Aiven for Apache Kafka® service with Apache Kafka version 3.6 or later. Upgrade to the
  latest default version and apply
  [maintenance updates](/docs/platform/concepts/maintenance-window#maintenance-updates)
  for the latest fixes and improvements when using tiered storage.
- [Aiven CLI](/docs/tools/cli).

:::note
Review the
[trade-offs and limitations](/docs/products/kafka/concepts/tiered-storage-limitations)
of tiered storage before enabling it.
:::

## Steps to enable tiered storage

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven console](https://console.aiven.io/), and select
   your project.
1. Create an Aiven for Apache Kafka service or select an
   existing one.
   - For [a new service](/docs/platform/howto/create_new_service):

     1. On the **Create Apache Kafka® service** page, scroll down to
        the **Tiered storage** section.
     1. Click **Enable tiered storage**.
     1. View the pricing for tiered storage in the **Service summary**.
   - For an existing service:
     1. Go to the service's <ConsoleLabel name="overview"/> page and
        click <ConsoleLabel name="service settings"/> from the sidebar.
     1. In the **Service plan** section, click **Enable tiered storage**
        to activate it.
     1. Click **Activate tiered storage** in the confirmation window.

After activating tiered storage for your service and configuring it for your
[topics](/docs/products/kafka/howto/configure-topic-tiered-storage), you can monitor
usage and costs in the
[Tiered storage overview](/docs/products/kafka/howto/tiered-storage-overview-page) section.

:::note
Alternatively, if tiered storage is not yet active for your service, you can enable
it by selecting **Tiered storage** from the sidebar.
:::

</TabItem>
<TabItem value="CLI" label="CLI">

Enable tiered storage for your Aiven for Apache Kafka service using
the [Aiven CLI](/docs/tools/cli):

1. Retrieve the project information with:

   ```bash
   avn project details
   ```

   For a specific project, use:

   ```bash
   avn project details --project <PROJECT_NAME>
   ```

1. Find the name of the Aiven for Apache Kafka service for enabling tiered storage with:

   ```bash
   avn service list
   ```

   Make a note of the `SERVICE_NAME` corresponding to your Aiven for
   Apache Kafka service.

1. Enable tiered storage with:

   ```bash
   avn service update                  \
      --project demo-kafka-project     \
      demo-kafka-service               \
      -c tiered_storage.enabled=true
   ```

In this command:

-  `--project demo-kafka-project`: Replace `demo-kafka-project` with
   your project name.
-  `demo-kafka-service`: Specify the Aiven for Apache Kafka service you
   intend to update.
-  `-c tiered_storage.enabled=true`: Activates tiered storage.

</TabItem>
</Tabs>

## Configure default retention policies at service-level

To manage data retention, set default policies for tiered storage at
the service level.

1. Access [Aiven console](https://console.aiven.io/), select your
   project, and choose your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll to the **Advanced configuration** section, and click **Configure**.
1. In the **Advanced configuration** dialog, click <ConsoleLabel name="addadvancedconfiguration" />.
1. Define the retention policy:
   -   Find `kafka.log_local_retention_ms` and set the value to define
       the retention period in milliseconds for time-based retention.
   -   Find `kafka.log_local_retention_bytes` and set the value to
       define the retention limit in bytes for size-based retention.
1. Click **Save configuration** to apply your changes.

You can also configure the retention policies from the
[Tiered storage overview](/docs/products/kafka/howto/tiered-storage-overview-page#modify-retention-polices) page.

## Optional: Configure client-side parameter

For optimal performance and reduced risk of broker interruptions when
using tiered storage, it is recommended to update the client-side
parameter `fetch.max.wait.ms` from its default value of 500 ms to 5000 ms.

This consumer configuration is no longer necessary starting from Apache Kafka
version 3.6.2. Consider upgrading to Apache Kafka version 3.6.2 or later before
enabling tiered storage.

## Related pages

- [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
- [How tiered storage works in Aiven for Apache Kafka®](/docs/products/kafka/concepts/tiered-storage-how-it-works)
- [Enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage)
