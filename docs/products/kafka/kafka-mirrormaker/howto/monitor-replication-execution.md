---
title: Monitor replication execution
---
Apache Kafka® MirrorMaker 2 uses Kafka® Connect for monitoring and state management, helping you track replication flows and address issues.

## Monitoring tips

Follow these tips to ensure that replication is up-to-date with message processing:

1. **Monitor consumer lag:** Use the `kafka.consumer_lag` metric to track replication
   progress and identify delays.

1. **Track dashboard metrics:** Check the `jmx.kafka.connect.mirror.record_count` metric.
   If MirrorMaker 2 stops adding records to a topic, this metric will show a flat line,
   indicating no new records are being replicated.

1. **Retrieve the latest messages using `kt`:** Use the
   [**kt**](https://github.com/fgeller/kt) tool to fetch the latest messages from all
   partitions. Run the following command:

   ```bash
   kt consume -auth ./mykafka.conf \
   -brokers SERVICE-PROJECT.aivencloud.com:PORT \
   -topic topicname -offsets all=newest:newest | \
   jq -c -s 'sort_by(.partition) | .[] | \
   {partition: .partition, value: .value, timestamp: .timestamp}'
   ```
