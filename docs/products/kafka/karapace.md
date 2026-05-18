---
title: Karapace
---

[Karapace](https://karapace.io/) is an Aiven-built open-source Schema Registry for
Apache Kafka®, and provides a central repository to store and retrieve schemas.
It consists of a **Schema Registry** and a **REST API**. All Kafka services on Aiven
support both these features, and you can enable or disable them based on your
requirements.

Karapace supports storing schemas in a central repository, which clients can access
to serialize and deserialize messages. The schemas maintain their own version histories
and you can check compatibility between versions.

## Supported schema formats

Karapace supports the following schema formats:

| Format      | Schema registration | Schema references |
|-------------|--------------------|--------------------|
| Avro        | ✓                  | ✓                  |
| Protobuf    | ✓                  | ✓                  |
| JSON Schema | ✓                  | -                  |

**Schema references** allow you to register a schema that depends on one or more
previously registered schemas, rather than inlining those definitions each time.
Karapace supports Avro schema references from v6.1.0 onward.
See [Schema references in Karapace](/docs/products/kafka/karapace/concepts/schema-references)
for details and examples.

Karapace REST provides a RESTful interface to your Apache Kafka cluster, allowing
you to produce and consume messages and perform administrative cluster work using
standard HTTP.

## Karapace resources

- The Karapace schema registry that Aiven maintains and makes available for every
  Aiven for Apache Kafka service: [https://karapace.io/](https://karapace.io/)
- [GitHub repository](https://github.com/aiven/karapace)
