---
title: S3 sink connector by Aiven naming and data formats
sidebar_label: Aiven connector
---

import RelatedPages from "@site/src/components/RelatedPages";

The Apache Kafka Connect® S3 sink connector by Aiven moves data from an Aiven for Apache Kafka® cluster to Amazon S3. You can configure object naming and output data formats.

Aiven provides two S3 sink connectors:

- An Aiven-developed connector
- A Confluent-developed connector

This content applies to the Aiven version. For the Confluent
version, see
[S3 sink connector additional parameters (Confluent)](s3-sink-additional-parameters-confluent).

## Object naming in S3

The connector writes data as objects in the configured S3 bucket. By default, object
names follow this pattern:

```text
<AWS_S3_PREFIX><TOPIC_NAME>-<PARTITION_NUMBER>-<START_OFFSET>.<FILE_EXTENSION>
```

The following placeholders define the pattern:

- `AWS_S3_PREFIX`: An optional string prefix. Use placeholders such
  as `{{ utc_date }}` and `{{ local_date }}` to create date-based object paths.

- `TOPIC_NAME`: The Kafka topic name written to Amazon S3.

- `PARTITION_NUMBER`: The Kafka topic partition number.

- `START_OFFSET`: The starting offset of the records in the file.

- `FILE_EXTENSION`: Depends on the value of
  `file.compression.type`. For example, `gzip` compression produces files with a
  `.gz` extension.

You can configure object naming and how records are grouped into files. See the file
naming format section in the
[Aiven S3 sink connector GitHub repository](https://github.com/aiven/aiven-kafka-connect-s3).

The connector creates one file per partition for each interval defined by
`offset.flush.interval.ms`. A file is created only if the partition receives at least
one record during the interval. The default interval is 60 seconds.

## S3 data format

By default, the connector writes one record per line in CSV format.

To change the output format to JSON or Parquet, set `format.output.type`.

The `format.output.fields` configuration controls the output fields. If included,
the connector Base64-encodes the record key and value.

For example, setting `format.output.fields` to `value,key,timestamp` produces output
similar to the following:

```text
bWVzc2FnZV9jb250ZW50,cGFydGl0aW9uX2tleQ==,1511801218777
```

To disable Base64 encoding for values, set
`format.output.fields.value.encoding` to `none`.

<RelatedPages/>

- [File naming format in the Aiven S3 sink connector GitHub repository](https://github.com/aiven/aiven-kafka-connect-s3)
