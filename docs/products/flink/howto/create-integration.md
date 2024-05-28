---
title: Create Apache Flink® data service integrations
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

With Apache Flink®, you can create streaming data pipelines across services. Aiven for Apache Flink® currently supports Aiven for Apache Kafka®, Aiven for PostgreSQL®, and Aiven for OpenSearch® as sources and targets for Flink applications.

To use Aiven for Apache Kafka, Aiven for PostgreSQL, or Aiven for
OpenSearch as a source or target for a Flink application, you will need
to integrate the related service with Aiven for Apache Flink.

## Create data service integration

You can create Aiven for Apache Flink® data service integrations
via the [Aiven Console](https://console.aiven.io/) by following these
steps:

1.  Go to the Aiven for Apache Flink® service page.

2.  If you are setting up the first integration for the selected Aiven
    for Apache Flink service, click **Get Started** in the service
    **Overview** screen.

    ![Image of the Aiven for Apache Flink Overview page with focus on the Get Started Icon](/images/content/products/flink/integrations-get-started.png)

3.  To configure the data flow with Apache Flink®, click the Aiven for
    Apache Kafka®, Aiven for PostgreSQL®, or Aiven for OpenSearch®
    service that you wish to integrate. Click  <ConsoleLabel name="integrations"/>.
    to complete the integration process.

    ![Image of the Aiven for Apache Flink Integration page showing an Aiven for Apache Kafka® and an Aiven for PostgreSQL® services](/images/content/products/flink/integrations-select-services.png)

4.  You can include additional integrations by clicking <ConsoleLabel name="plus"/>
    in the **Data Flow** section.

    ![Image of the Aiven for Apache Flink Integration page showing an existing Aiven for Apache Kafka integration and the + icon to add additional integrations](/images/content/products/flink/integrations-add.png)
