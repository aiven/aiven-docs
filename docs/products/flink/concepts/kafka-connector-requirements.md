---
title: Settings for Apache Kafka® connectors
---

This article outlines the required settings for standard and upsert
Kafka connectors in Aiven for Apache Flink®.

:::note
Aiven for Apache Flink® supports the following data formats: JSON
(default), Apache Avro, Confluent Avro, Debezium CDC. For more
information on these, see the [Apache Flink® documentation on
formats](https://ci.apache.org/projects/flink/flink-docs-release-1.15/docs/connectors/table/formats/overview/).
:::

+----------------+----------------+----------------+----------------+
| Parameter      | Description    | Standard       | Upsert         |
|                |                | connector      | connector      |
+================+================+================+================+
| Key data       | Sets the       | Optional       | Required       |
| format         | format that is |                |                |
|                | used to        |                |                |
|                | convert the    |                |                |
|                | *key* part of  |                |                |
|                | Kafka          |                |                |
|                | messages.      |                |                |
+----------------+----------------+----------------+----------------+
| Key fields     | Defines the    | Optional       | Not available  |
|                | columns from   | (required if a |                |
|                | the SQL schema | key data       |                |
|                | of the data    | format is      |                |
|                | table that are | selected)      |                |
|                | considered     |                |                |
|                | keys in the    |                |                |
|                | Kafka          |                |                |
|                | messages.      |                |                |
+----------------+----------------+----------------+----------------+
| Value data     | Sets the       | Required       | Required       |
| format         | format that is |                |                |
|                | used to        |                |                |
|                | convert the    |                |                |
|                | *value* part   |                |                |
|                | of Kafka       |                |                |
|                | messages.      |                |                |
+----------------+----------------+----------------+----------------+
| Primary key    | Defines the    | Optional       | Required       |
|                | column in the  |                |                |
|                | SQL schema     |                |                |
|                | that is used   |                |                |
|                | to identify    |                |                |
|                | each message.  |                |                |
|                | Flink uses     |                |                |
|                | this to        |                |                |
|                | determine      |                |                |
|                | whether to     |                |                |
|                | insert a new   |                |                |
|                | message or     |                |                |
|                | update or      |                |                |
|                | delete an      |                |                |
|                | existing       |                |                |
|                | message.       |                |                |
|                | Defined with   |                |                |
|                | the            |                |                |
|                | `PRIMARY KEY`  |                |                |
|                | entry in the   |                |                |
|                | SQL schema for |                |                |
|                | the data       |                |                |
|                | table. For     |                |                |
|                | example:       |                |                |
|                |                |                |                |
|                |     PRIMARY    |                |                |
|                |  KEY (hostname |                |                |
|                | ) NOT ENFORCED |                |                |
+----------------+----------------+----------------+----------------+
