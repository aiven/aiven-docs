---
title: Create Apache Flink® data service integrations
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

With Aiven for Apache Flink®, you can create streaming data pipelines to connect various services.

Aiven for Apache Flink® enables integration with internal and external services,
such as Aiven managed services, Google BigQuery®, and external Apache Kafka and
PostgreSQL instances. This flexibility allows you to build data processing pipelines
using a wide range of data sources and sinks.

## Create data service integration

Create Aiven for Apache Flink® data service integrations using the
[Aiven Console](https://console.aiven.io/).

### Integrate Aiven services

1. Log in to [Aiven Console](https://console.aiven.io) and access your
   Aiven for Apache Flink service.
1. If this is your first integration for the selected Aiven for Apache Flink service,
    on the <ConsoleLabel name="overview"/> page, scroll to **Data pipeline**.
1. Click **Add data source** to initiate the integration setup.
1. On the **Data service integrations** page, under **Create service integration** tab,
   choose the Aiven service to integrate: Aiven for Apache Kafka®,
   Aiven for PostgreSQL®, or Aiven for OpenSearch®.
1. Click **Integrate**.
1. To include additional integrations, click <ConsoleIcon name="plus"/> in the
   **Data pipeline** section.

### Integrate external services

1. On the **Data service integrations** page, click the
   **Create external integration endpoint** tab.
1. Select the type of external service to integrate: Google BigQuery®,
   External Apache Kafka, or External PostgreSQL.
1. If no external endpoints are available, go back to the **Projects** page.
1. Click <ConsoleLabel name="integrationendpoints"/> to add and configure external
   integration points.
1. Once the integration endpoint is added, return to your Aiven for Apache Flink service
   and the **Data pipeline** section.
1. Click **Add data source**.
1. On the **Data service integrations** page, under
   **Create external integration endpoint** tab, select the checkbox next to the
   external data service type and choose the integration endpoint just created.
1. To include additional integrations, click <ConsoleIcon name="plus"/> in the
   **Data pipeline** section.
