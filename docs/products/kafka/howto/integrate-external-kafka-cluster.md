---
title: Integrate an external Apache Kafka® cluster in Aiven
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

You can integrate an external Apache Kafka® cluster with your Aiven for Apache Kafka® service.
This setup supports use cases such as replication, data ingestion, or connecting
Aiven Kafka to on-premises or third-party clusters.

To integrate, define an external Kafka service endpoint in the Aiven Console.

## Prerequisites

- An active Aiven account with access to the [Aiven Console](https://console.aiven.io/)
- Connection details for your external Kafka cluster, depending on your setup:
  - Bootstrap server addresses
  - Security protocol type
  - Authentication credentials (if required)
  - SSL certificates (if using SSL/TLS)

## Define an external Apache Kafka® endpoint

1. Log in to the [Aiven Console](https://console.aiven.io/) and select your project.
1. In the left sidebar, click <ConsoleLabel name="integration endpoints"/>.
1. From the list of available services, select **External Apache Kafka**.
1. Click **Add a new endpoint**.
1. In the **Create new External Apache Kafka endpoint** dialog, enter the following
   details:
   - **Endpoint name**: Enter a descriptive name for your Kafka connection.
   - **Bootstrap servers**: Enter a comma-separated list of bootstrap server addresses
     (for example, `kafka-broker-1:9092,kafka-broker-2:9092`).
     The minimum length is 3 characters and the maximum is 256 characters.
1. Select the **Security protocol** from the dropdown menu. The available options and
   required fields depend on your selection:

1. Select the **Security protocol** from the dropdown menu. The available options and
   required fields depend on your selection:

   | Security protocol | Description | Required fields |
   |-------------------|--------------|-----------------|
   | PLAINTEXT | No encryption or authentication. | <ul><li>Bootstrap servers</li></ul> |
   | SSL | SSL encryption and optional client authentication. | <ul><li>CA certificate</li><li>Client certificate (optional)</li><li>Client key (optional)</li><li>Endpoint identification algorithm</li></ul> |
   | SASL_PLAINTEXT | SASL authentication without encryption. | <ul><li>Username</li><li>Password</li><li>SASL mechanism</li></ul> |
   | SASL_SSL | SASL authentication with SSL encryption. | <ul><li>Username</li><li>Password</li><li>SASL mechanism</li><li>CA certificate</li><li>Endpoint identification algorithm</li></ul> |

1. Click **Create**.

The external Kafka cluster appears in the **Integration endpoints** list under the name
specified in **Endpoint name**.
You can review, edit, or remove it from this list at any time.


<RelatedPages/>

- [Apache Kafka® documentation](https://kafka.apache.org/documentation/)
- [MirrorMaker 2 overview](/docs/products/kafka/kafka-mirrormaker)
- [Permissions and internal topics in MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker/concepts/permissions-internal-topics)
