---
title: Formats for Aiven for ClickHouse® - Aiven for Apache Kafka® data exchange
sidebar_label: ClickHouse-Kafka data exchange formats
---

When connecting Aiven for ClickHouse® to Aiven for Apache Kafka® using Aiven integrations, data exchange is possible with the following formats only:

| Format name                   | Notes                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Avro**                      | Binary Avro format with embedded schema. Libraries and documentation: [https://avro.apache.org/](https://avro.apache.org/) |
| **AvroConfluent**             | Binary Avro with schema registry. Requires the Karapace Schema Registry to be enabled in the Kafka service.                |
| **CSV**                       | Example: `123,"Hello"`                                                                                                     |
| **JSONASString**              | Example: `{"x":123,"y":"hello"}`                                                                                           |
| **JSONCompactEachRow**        | Example: `[123,"Hello"]`                                                                                                   |
| **JSONCompactStringsEachRow** | Example: `["123","Hello"]`                                                                                                 |
| **JSONEachRow**               | Example: `{"x":123,"y":"hello"}`                                                                                           |
| **JSONStringsEachRow**        | Example: `{"x":"123","y":"hello"}`                                                                                         |
| **MsgPack**                   | Example: `{\\xc4\\x05hello`. Libraries and documentation: [https://msgpack.org/](https://msgpack.org/)                     |
| **Parquet**                   | Binary parquet format. Libraries and documentation: [https://parquet.apache.org/](https://parquet.apache.org/)             |
| **TSKV**                      | Example: `x=123\ty=hello`                                                                                                  |
| **TSV**                       | Example: `123\thello`                                                                                                      |
| **TabSeparated**              | Example: `123\thello`                                                                                                      |
