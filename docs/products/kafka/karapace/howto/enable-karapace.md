---
title: Enable schema registry and REST proxy
sidebar_label: Enable schema registry and REST proxy
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

You can enable the Karapace schema registry and REST proxy independently on Aiven for Apache Kafka®.

## Enable from Connection information

1. In the [Aiven Console](https://console.aiven.io/), select your project and choose
   your Aiven for Apache Kafka® service.
1. On the <ConsoleLabel name="overview"/> page, open **Connection information**.
1. To enable the REST proxy, open the **Apache Kafka REST** tab.
   When the feature is off, the tab shows **Enable REST Proxy**.
1. Click **Enable**.
   This sets `kafka_rest`.
1. To enable Schema Registry, open the **Schema Registry** tab.
   When the feature is off, the tab shows **Enable schema registry**.
1. Click **Enable**.
   This sets `schema_registry`.

## Enable from Service settings

1. In the [Aiven Console](https://console.aiven.io/), select your project and choose
   your Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="service settings"/>.
1. In **Service management**, click **Actions** (**...**).
1. To enable the REST proxy, click **Enable REST API (Karapace)**, then click
   **Enable**.
   This sets `kafka_rest`.
   In Service management, the feature appears as
   **Apache Kafka REST API (Karapace)**.
1. To enable Schema Registry, click **Enable Schema Registry (Karapace)**, then
   click **Enable**.
   This sets `schema_registry`.
   In Service management, the feature appears as **Schema Registry (Karapace)**.

:::tip
For automation, set the `schema_registry` and `kafka_rest` service parameters.
:::

<RelatedPages/>

- [Karapace](/docs/products/kafka/karapace)
- [Karapace on GitHub](https://github.com/Aiven-Open/karapace)
- [Aiven Terraform Provider `aiven_kafka` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka)
