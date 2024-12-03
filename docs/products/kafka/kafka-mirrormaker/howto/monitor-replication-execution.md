---
title: Monitor replication execution
---

Apache Kafka® MirrorMaker 2 leverages Kafka Connect to help with state management 
and monitoring.

## Tips

To ensure that the replication is up-to-date with message processing, check this:

1.  **Consumer lag metric**: Monitor the `kafka.consumer_lag` metric.

1.  **Dashboard metrics**: If MirrorMaker 2 stops adding records to a
    topic, the `jmx.kafka.connect.mirror.record_count` metric stops
    increasing, showing a flat line on the dashboard.

1.  **Retrieve latest messages with \`kt\`**: Use
    [kt](https://github.com/fgeller/kt) to retrieve the latest messages
    from all partitions with the following command:

    ```
    kt consume -auth ./mykafka.conf \
    -brokers SERVICE-PROJECT.aivencloud.com:PORT \
    -topic topicname -offsets all=newest:newest | \
    jq -c -s 'sort_by(.partition) | .[] | \
    {partition: .partition, value: .value, timestamp: .timestamp}'
    ```
