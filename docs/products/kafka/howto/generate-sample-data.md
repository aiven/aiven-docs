---
title: Stream sample data from the Aiven Console
sidebar_label: Stream sample data
keywords: [sample data, test messages, kafka, data stream, onboarding]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Use the sample data producer to stream predefined messages to your Apache Kafka® service and observe how they move through topics and schemas.

## About the sample data generator

The sample data generator streams realistic, predefined messages to your
Aiven for Apache Kafka service. It shows how streaming works without requiring any
client setup.

You can choose from the following data scenarios:

- **Logistics**: Simulates package tracking events with details such as timestamp,
  tracking ID, carrier, current location, and delivery state. Example states
  include received, shipped, or in transit.
- **User activity**: Represents user interactions on a website or app, including
  action ID and type, page and section visited, user ID, and country code.
- **Metrics**: Produces application metrics such as percentage values, averages, and
  totals over different time windows like instant, one hour, or twelve hours.

The sample data generator is useful if you are:

- New to Aiven or exploring Aiven for Apache Kafka for the first time
- Testing your service after creation
- Evaluating how data flows through topics and schemas

The generator automatically:

- Enables the Schema Registry and REST Proxy if needed
- Creates a topic and applies an Avro schema
- Streams data for the selected duration (up to 12 hours)

### Stream behavior and limitations

- Only one sample data generator session can be active at a time per Apache Kafka
  service.
- Each user can run only one data generator scenario at a time.
- Only the **Avro** schema format is supported.
- Data is written to a system-generated topic based on the selected scenario.
- Messages are sent at a steady rate for testing and demonstration.
- Generated data is retained for up to one week.
- The stream stops automatically after the selected duration or when the browser
  session ends.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io).
- Permission to create and manage Aiven for Apache Kafka services in your project

To create an Aiven for Apache Kafka service, see [Create new service](/docs/platform/howto/create_new_service).

## Start a data stream

1. In the [Aiven Console](https://console.aiven.io), select an existing
   **Aiven for Apache Kafka** service or
   [create a service](/docs/platform/howto/create_new_service).
1. On the <ConsoleLabel name="overview" /> page, under
   the **Start data stream** section, click **Generate sample data**.
1. In the setup wizard:
   - Choose a data scenario and click **Continue**.
   - The schema registry and REST proxy are required for data generation. Click
     **Enable & Continue** to enable them if they are not already active.
   - Review the auto-generated topic name and Avro schema. Click **Confirm** to continue.
   - Choose a stream duration between 30 minutes and 12 hours. Click **Start data stream**
     to begin generating messages.
   - After you start the stream, the sample data producer runs in the background. You
     can monitor progress from the <ConsoleLabel name="overview" /> page, where you’ll
     see message rate, duration, and a link to review messages.
1. To view the generated messages:
   - On the <ConsoleLabel name="overview" /> page, click **Review messages**.
   - The **Messages** tab opens in the **Topics** view. Set **FORMAT** to `avro`, then
     click **Fetch messages** to view the data.
   - To stop the stream, go to the **Overview** page and click **Stop streaming**.
   - To review topic settings and schema details, open the topic from the **Topics** tab.

<RelatedPages/>

- [View topic details and partitions](/docs/products/kafka/howto/get-topic-partition-details)
- [Enable Schema Registry and Kafka REST Proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Create an Aiven for Apache Kafka service](/docs/platform/howto/create_new_service)
