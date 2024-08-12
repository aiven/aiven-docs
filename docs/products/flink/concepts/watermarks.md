---
title: Watermarks
---

Apache Flink® uses watermarks to synchronize and process events in data streams accurately. These watermarks are timestamps embedded in the data stream that track the progression of event time.

## Role of watermarks

Watermarks signal when all events up to a certain time have arrived, allowing
Apache Flink operators to synchronize their event time clocks with these timestamps.
This mechanism is crucial for timely and accurate event processing.

Apache Flink® defines the watermark logic using watermark strategies and watermark
generators. For example, you can configure Apache Flink to generate
watermarks either periodically at specific intervals or when an event or element
with a specific marker triggers it.

## Related pages

For detailed information on watermarks and how to generate them in Apache Flink®,
visit the [official documentation](https://ci.apache.org/projects/flink/flink-docs-release-1.19/docs/dev/datastream/event-time/generating_watermarks/).
