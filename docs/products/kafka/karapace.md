---
title: Karapace
sidebar_label: Karapace
---

import RelatedPages from "@site/src/components/RelatedPages";

[Karapace](https://karapace.io/) is an Aiven-built open-source Schema Registry and REST Proxy for Aiven for Apache Kafka®.
Use it to store and manage message schemas, and to produce and consume Kafka messages
over HTTP.
You can [enable or disable each feature independently](/docs/products/kafka/karapace/howto/enable-karapace).

## Schema Registry

Schema Registry stores schemas in a central repository.
Producers and consumers use those schemas to serialize and deserialize messages.
You can version schemas and check compatibility before you publish changes.

Supported formats:

| Format      | Schema registration | Schema references |
|-------------|--------------------|-------------------|
| Avro        | ✓                  | ✓                 |
| Protobuf    | ✓                  | ✓                 |
| JSON Schema | ✓                  | -                 |

Schema references let one schema depend on other registered schemas instead of
inlining every definition.
Karapace supports Avro schema references from version 6.1.0 onward.
For details, see
[Schema references in Karapace](/docs/products/kafka/karapace/concepts/schema-references).

## REST Proxy

The REST Proxy is a Karapace component that produces and consumes Kafka events over HTTP.
It exposes REST APIs for those operations.
Use those APIs from tools such as `curl`, scripts, or HTTP-based services.

You manage Schema Registry over HTTP with REST APIs that register, update, and delete
schemas.
Those APIs are separate from the Kafka REST APIs served by the REST Proxy.
For more information, see
[Apache Kafka REST API](/docs/products/kafka/concepts/kafka-rest-api).

## Next steps

1. [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
1. [Use schema registry with Java producers and consumers](/docs/products/kafka/howto/use-schema-registry-in-java)
1. [Connect with Kafka REST](/docs/products/kafka/howto/connect-with-kafka-rest)
1. [Enable OAuth 2.0/OIDC authentication for Schema Registry](/docs/products/kafka/karapace/howto/enable-oauth-oidc-schema-registry)

## Karapace resources

- [Karapace project site](https://karapace.io/)
- [GitHub repository](https://github.com/Aiven-Open/karapace)

<RelatedPages/>

- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Apache Kafka REST API](/docs/products/kafka/concepts/kafka-rest-api)
- [Schema references in Karapace](/docs/products/kafka/karapace/concepts/schema-references)
