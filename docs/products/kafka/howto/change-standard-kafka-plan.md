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
1. In **Average ingress**, click a rate.

   Aiven uses the rate to estimate compute demand. Aiven assumes egress is three
   times ingress. Optional: Click **Custom** and enter a rate.
1. If **Cost optimization** is shown, set the estimated share of traffic in
   diskless topics.

   **Cost optimization** is shown when you click **10 MB/s** or **Custom**. The
   slider previews estimated network cost for diskless topic traffic. The slider
   does not change the service configuration.
1. In **Retention**, click a retention period.

   Aiven uses the period for the storage estimate. Optional: Click **Custom** and
   enter a period of 1 to 30 days.
1. In **Service summary**, review the estimated monthly cost.

   The estimate is based on the selected configuration. The invoice reflects
   actual usage in the billing period.
1. Click **Upgrade service**.
1. Wait until the service status is **Running**.

<RelatedPages/>

- [Change the plan for your Aiven for Apache Kafka® service](/docs/products/kafka/howto/change-service-plan)
- [Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing)
- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
