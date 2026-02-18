---
title: S3 sink connector by Confluent naming and data formats
---

The Apache Kafka Connect® S3 sink connector moves data from Aiven for Apache Kafka® to Amazon S3 for long-term storage.

Aiven provides two S3 sink connectors:

- An Aiven-developed connector
- A Confluent-developed connector

This content applies to the Confluent version.
For the Aiven-developed connector,
see [S3 sink connector additional parameters](s3-sink-additional-parameters).

## S3 naming format

The connector stores data as objects in the configured S3 bucket. By default, object
names follow this pattern:

```text
topics/<TOPIC_NAME>/partition=<PARTITION_NUMBER>/<TOPIC_NAME>+<PARTITIOIN_NUMBER>+<START_OFFSET>.<FILE_EXTENSION>
```

The following placeholders define the pattern:

- `TOPIC_NAME`: The Kafka topic name written to Amazon S3.
- `PARTITION_NUMBER`: The Kafka topic partition number.
- `START_OFFSET`: The starting offset of the records in the file.
- `FILE_EXTENSION`: Depends on the configured serialization format.
  For example, binary serialization produces files with a `.bin` extension.

For example, a topic with 3 partitions initially generates the following
files in the destination S3 bucket:

```text
topics/<TOPIC_NAME>/partition=0/<TOPIC_NAME>+0+0000000000.bin
topics/<TOPIC_NAME>/partition=1/<TOPIC_NAME>+1+0000000000.bin
topics/<TOPIC_NAME>/partition=2/<TOPIC_NAME>+2+0000000000.bin
```

## S3 data format

By default, the connector stores data in binary format, with one message per line. The
connector creates a file after a fixed number of messages. The `flush.size`
parameter defines this number. Setting `flush.size` to `1` creates one file per message.

For example, for a topic with three partitions and ten messages, setting `flush.size`
to `1` produces the following files in the destination S3 bucket (one file per message):

```text
topics/<TOPIC_NAME>/partition=0/<TOPIC_NAME>+0+0000000000.bin
topics/<TOPIC_NAME>/partition=0/<TOPIC_NAME>+0+0000000001.bin
topics/<TOPIC_NAME>/partition=0/<TOPIC_NAME>+0+0000000002.bin
topics/<TOPIC_NAME>/partition=0/<TOPIC_NAME>+0+0000000003.bin
topics/<TOPIC_NAME>/partition=1/<TOPIC_NAME>+1+0000000000.bin
topics/<TOPIC_NAME>/partition=1/<TOPIC_NAME>+1+0000000001.bin
topics/<TOPIC_NAME>/partition=1/<TOPIC_NAME>+1+0000000002.bin
topics/<TOPIC_NAME>/partition=2/<TOPIC_NAME>+2+0000000000.bin
topics/<TOPIC_NAME>/partition=2/<TOPIC_NAME>+2+0000000001.bin
topics/<TOPIC_NAME>/partition=2/<TOPIC_NAME>+2+0000000002.bin
```

For more information, see the
[Confluent S3 sink connector documentation](https://docs.confluent.io/5.0.0/connect/kafka-connect-s3/index).
