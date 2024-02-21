---
title: Enable Karapace schema registry and REST APIs
---

To enable **Karapace schema registry** and **REST APIs** on Aiven for Apache Kafka® from the Aiven Console:

1. In the [Aiven Console](https://console.aiven.io/), select your
   project and choose your Aiven for Apache Kafka® service.
1. Click **Service settings** on the sidebar.
1. In the **Service management** section, click **Actions** (**...**).
1. From the dropdown menu, enable the setting for either or both of the
   features based on your requirements:
   1. Click **Enable REST API (Karapace)**. Confirm your choice in the
      dialog by clicking **Enable**.
   1. Click **Enable Schema Registry (Karapace)**. Confirm your choice
      in the dialog by clicking **Enable**.

To learn more about Karapace and its features, visit the [Karapace
homepage](https://www.karapace.io) and the [Karapace GitHub
project](https://github.com/aiven/karapace).

:::tip
For automation or integration setups, use the parameters
`schema_registry` and `kafka_rest` to enable the schema registry or REST
APIs on your service.
:::

## Related pages

To set up Karapace with Aiven for Apache Kafka®
using [Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest/docs),
see [Apache Kafka® with Karapace Schema Registry](https://aiven.io/developer/apache-kafka-karapace).
