---
title: Stream sample data from the Aiven Console
sidebar_label: Stream sample data
keywords: [sample data, test messages, kafka, data stream, onboarding]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Use the sample data generator to simulate streaming events and observe how data flows through topics and schemas in your Aiven for Apache Kafka® service.

## About the sample data generator

The sample data generator helps you explore Aiven for Apache Kafka by producing
realistic test messages to a Kafka topic in your service. It's designed for quick
onboarding with no client configuration required.

You can choose from the following data scenarios:

- **Logistics**: Tracks package events including timestamp, tracking ID, carrier,
  location, and delivery state such as *received*, *shipped*, or *in transit*.
- **User activity**: Captures app or website interactions such as action type, page,
  user ID, and country code.
- **Metrics**: Streams application metrics like percentages, averages, and totals
  across time windows (instant, hourly, 12-hour).

Use the sample data generator to:

- Start streaming data in as little as 30 seconds after service creation.
- Validate how your Kafka service handles schema-based messages.
- Explore how topics, schemas, and consumers interact.

## How it works

When you start a sample data session, the generator:

- Enables the Schema Registry and REST Proxy if they are not already active.
- Creates a system-generated topic for the selected scenario.
- Applies a predefined Avro schema to the topic.
- Produces messages at a steady, test-friendly rate.
- Streams data for the selected duration, up to 4 hours.

## Limitations

- Only one sample data session can run per Aiven for Apache Kafka service at a time.
- Each user can run only one data generator scenario at a time.
- Only the **Avro** schema format is supported.
- Sample data is retained for up to one week.
- The stream stops automatically when the selected time ends or the browser session
  is closed.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io).
- Permission to create and manage Aiven for Apache Kafka services in your project

To create an Aiven for Apache Kafka service, see [Create new service](/docs/platform/howto/create_new_service).

## Start a data stream

1. In the [Aiven Console](https://console.aiven.io), select an existing
   **Aiven for Apache Kafka** service or
   [create a service](/docs/platform/howto/create_new_service).
1. On the <ConsoleLabel name="overview" /> page, in the **Start data stream** section,
   click **Generate sample data**.
1. In the setup wizard:
   1. Choose a data scenario and click **Continue**.
   1. Click **Enable & continue** to proceed. Aiven ensures the Karapace Schema
      Registry and REST Proxy are enabled for sample data generation. If they are not
      already active, Aiven enables them for you.
   1. Review the auto-generated topic name and Avro schema. Click **Confirm**.
   1. Select a stream duration between 15 minutes and 4 hours. Click
      **Start data stream**.

After the stream starts, click **Open service overview** to monitor progress from
the <ConsoleLabel name="overview" /> page. You can view the message rate, remaining
time, and a link to review messages.

### Monitor and manage the stream

- To view the streamed data, click **Review messages** on the
  <ConsoleLabel name="overview" /> page.
  The **Messages** page opens for the topic. Messages appear in `avro` format within a
  few seconds.
- To stop the stream, click **Stop streaming** in the **Data generator** section on
  the <ConsoleLabel name="overview" /> page. This option is only visible in the browser
  tab where the generator was started.
- To view topic settings, message details, or the applied schema, click
  <ConsoleLabel name="topics" /> in the sidebar, then select the topic created by the
  generator.

<RelatedPages/>

- [View topic details and partitions](/docs/products/kafka/howto/get-topic-partition-details)
- [Enable Schema Registry and Kafka REST Proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Create an Aiven for Apache Kafka service](/docs/platform/howto/create_new_service)
