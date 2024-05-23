---
title: Settings for Apache Kafka® connectors
---

Explore the necessary settings for standard and upsert Kafka connectors in Aiven for Apache Flink®.

:::note
Aiven for Apache Flink® supports the following data formats: JSON
(default), Apache Avro, Confluent Avro, Debezium CDC. For more
information on these, see the [Apache Flink® documentation on
formats](https://ci.apache.org/projects/flink/flink-docs-release-1.19/docs/connectors/table/formats/overview/).
:::

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Standard connector</th>
    <th>Upsert connector</th>
  </tr>
  <tr>
    <td>Key data format</td>
    <td>Sets the format that is used to convert the *key* part of Kafka messages.</td>
    <td>Optional</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Key fields</td>
    <td>Defines the columns from the SQL schema of the data table that are considered keys in the Kafka messages.</td>
    <td>Optional (required if a key data format is selected)</td>
    <td>Not available</td>
  </tr>
  <tr>
    <td>Value data format</td>
    <td>Sets the format that is used to convert the *value* part of Kafka messages.</td>
    <td>Required</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>Primary key</td>
    <td>Defines the column in the SQL schema that is used to identify each message. Flink uses this to determine whether to insert a new message or update or delete an existing message. Defined with the `PRIMARY KEY` entry in the SQL schema for the data table. For example: `PRIMARY KEY (hostname) NOT ENFORCED`</td>
    <td>Optional</td>
    <td>Required</td>
  </tr>
</table>
