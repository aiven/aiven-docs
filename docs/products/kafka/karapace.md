---
title: Karapace
---

[Karapace](https://karapace.io/) is an Aiven built open-source Schema Registry for Apache Kafka®, and provides a central repository to store and retrieve schemas.
It consists of a **Schema Registry** and a **REST API**. All Kafka services on Aiven
support both these features (Schema
registry and REST API), and as a user, based on your requirements, you
can enable or disable them.

Karapace supports storing schemas in a central repository, which clients
can access to serialize and deserialize messages. The schemas also
maintain their own version histories and can be checked for
compatibility between their different respective versions. It also
includes support for JSON Schema, Avro and Protobuf data formats.

Karapace REST provides a RESTful interface to your Apache Kafka cluster,
allowing you to perform tasks such as producing and consuming messages
and performing administrative cluster work while using the web language.

## Karapace resources

If you are new to Karapace, learn more from the following resources:

-   The Karapace schema registry that Aiven maintains and makes
    available for every Aiven for Apache Kafka service:
    [https://karapace.io/](https://karapace.io/)
-   [GitHub repository](https://github.com/aiven/karapace).
