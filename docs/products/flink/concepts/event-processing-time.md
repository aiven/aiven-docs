---
title: Event and processing times
---

Event time refers to when events occur, and processing time is when a system observes or processes these events. Understanding the difference between these two is essential for data processing and streaming. It affects data handling, analysis, and storage.

## Factors affecting processing

Several factors can cause differences between event time and processing time,
including:

- Shared hardware resources can lead to variable processing capabilities.
- Changes in network traffic can delay data transmission, affecting when data is processed.
- The complexities of distributed systems can introduce delays or reorder data.
- Variations in the volume of data and the order in which it arrives can further
  complicate processing times.

Ideally, event time and processing time would be the same, but this is rarely the
case in practice.

## Use event time

In Apache Flink®, data might not always arrive in the order in which the events occurred.
Relying on processing time can lead to inaccuracies and issues in system behavior.
To mitigate these issues, Aiven recommends using **event time** when processing data.
This approach maintains the correct sequence of events throughout the data streaming
pipeline. Additionally, event time allows for consistent data reprocessing,
improving reliability and system resilience.

## Related pages

- [Apache Flink® event time and processing time](https://nightlies.apache.org/flink/flink-docs-release-1.19/docs/concepts/time/)
