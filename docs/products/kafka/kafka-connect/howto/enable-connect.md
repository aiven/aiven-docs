---
title: Enable Apache Kafka® Connect on Aiven for Apache Kafka®
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

For a low-cost way to get started with Aiven for Apache Kafka® Connect, you can run Kafka Connect on the same nodes as your Apache Kafka cluster, sharing the resources. The Kafka service must be running on a business or premium plan.

To reduce load on the Kafka nodes and make the cluster more stable, you can
[create a standalone Kafka Connect service](/docs/products/kafka/kafka-connect/get-started)
instead. A standalone service offers more CPU time and memory, and allows
you to scale the service independently.

To enable Apache Kafka Connect on Aiven for Apache Kafka nodes:

1.  Select an Aiven for Apache Kafka service.
1.  Click <ConsoleLabel name="Service settings"/>.
1.  In the **Service management** section, click
    <ConsoleLabel name="Actions"/> > **Enable Connect**.

You can view information about the Apache Kafka Connect service on the
**Connectors** page.
