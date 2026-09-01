---
title: Apache Kafka® REST API
sidebar_label: Apache Kafka REST API
description: Produce and consume Apache Kafka messages over HTTP with the Karapace REST proxy.
---

import RelatedPages from "@site/src/components/RelatedPages";

The Apache Kafka® REST API lets you produce and consume messages over HTTP.
Use it from tools such as `curl`, scripts, or services that speak HTTP instead of the
Kafka protocol.

[Karapace](/docs/products/kafka/karapace) serves these APIs through the REST proxy,
which forwards HTTP requests to Apache Kafka.

Karapace also provides Schema Registry REST APIs to register, update, and delete
schemas. Those APIs are separate from the Kafka REST API.

## Enable the REST API

The REST API is available after you enable the REST proxy on your service.
In **Connection information**, open the **Apache Kafka REST** tab and click
**Enable**, or enable **Apache Kafka REST API (Karapace)** from
**Service management**.
For automation, set the `kafka_rest` parameter.

See
[Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace).

## Use the REST API

Requests authenticate with a service user's username and password.
To produce and consume messages with generated `curl` commands from the Aiven Console,
see [Connect with Kafka REST](/docs/products/kafka/howto/connect-with-kafka-rest).

## Control access

REST proxy authorization applies
[Kafka ACLs](/docs/products/kafka/concepts/acl) to REST requests.
See
[Enable Apache Kafka® REST proxy authorization](/docs/products/kafka/karapace/howto/enable-kafka-rest-proxy-authorization).

<RelatedPages/>

- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Connect with Kafka REST](/docs/products/kafka/howto/connect-with-kafka-rest)
- [Enable Apache Kafka® REST proxy authorization](/docs/products/kafka/karapace/howto/enable-kafka-rest-proxy-authorization)
