---
title: Change the plan for your Standard Kafka service
sidebar_label: Change Standard Kafka plan
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Change the service plan for your Standard Kafka service to scale resources up or down and optimize costs.

1. In the [Aiven Console](https://console.aiven.io), open your Standard Kafka service.
1. On the <ConsoleLabel name="overview" /> page, in **Service usage**, click
   **Change plan**.
1. In **Select compute size**, click a plan in the table.

   If you're not sure which plan to choose, click **Get recommendation**.
1. In **Estimate storage and network costs**, click your expected **Average ingress**.

   If you click **Custom**, enter a rate between 11 and 300 MB/s.

   If you click **10 MB/s** or **Custom**, use the slider in **Cost optimization** to
   preview the network cost for different shares of diskless topic traffic. The slider
   does not change the service configuration.
1. In **Data retention**, click a retention period. If you click **Custom**, enter a period
   of 1 to 30 days.
1. In **Service summary**, review the estimated monthly cost.
1. Click **Upgrade service**.
1. Wait until the service status is **Running**.

<RelatedPages/>

- [Change the plan for your Aiven for Apache Kafka® service](/docs/products/kafka/howto/change-service-plan)
- [Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing)
- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
