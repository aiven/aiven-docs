---
title: Enable automatic restart for Apache Kafka® Connect connectors
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Automatic restart can help recover a connector task after a rare transient failure, such as an out-of-memory error caused by a sudden data surge.

Before you enable automatic restart, investigate the cause of the connector failure.
Automatic restart is not recommended for recurring failures because the connector might
continue to fail until the underlying issue is fixed.

:::note
In some cases, the Debezium source connector for PostgreSQL® can stop after PostgreSQL
maintenance if PostgreSQL cannot create replication slots before failover. Automatic
restart can help recover the connector in this scenario.
:::

## Enable automatic restart in the Aiven Console

All Aiven-managed Apache Kafka Connect connectors support automatic restart.

To enable automatic restart for an existing connector:

1. In the [Aiven Console](https://console.aiven.io/), select the Aiven for Apache Kafka
   or Aiven for Apache Kafka Connect service where the connector is defined.
1. Select <ConsoleLabel name="manage stream" /> > **Connectors** from the sidebar.
1. Open the connector to update.
1. Select the **Aiven** tab.
1. For **Automatic restart**, select **True**.

After you enable automatic restart, the connector restarts automatically when a failure
is detected.

:::warning
Automatic restart restarts the entire connector, not only the failed tasks.
:::
