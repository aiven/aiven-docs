---
title: Windows
---

Apache Flink® uses the concept of *windows* to manage the continuous flow of data in streams by segmenting it into manageable chunks. This approach is essential due to the continuous and unbounded nature of data streams, where waiting for all data to arrive is impractical.

## How windows work

Windows in Apache Flink® is defined to segment the data stream into subsets for
processing and analysis. A window is created when the first element that meets
the specified criteria arrives.

The trigger of a window determines when the window is ready for processing.
Once the window is ready, the processing function determines how the data within the
window is analyzed or manipulated. Additionally, each window has an **allowed lateness**
value, indicating how long new events are accepted into the window after the
trigger has closed it.

### Example scenario

Consider setting a time-based window from 15:00 to 15:10 with an allowed lateness
of one minute. The window is created upon the arrival of the first event within this
interval. Events arriving between 15:10 and 15:11, but still within the window's
time range, are included. This mechanism provides flexibility in managing data that is
slightly out of order or arrives later than expected.

### Handling late events

Events that arrive after the allowed lateness should be managed separately, such as by
logging and discarding them. This is done to ensure the integrity of windowed processing.

## Further reading

- [Apache Flink® windows](https://ci.apache.org/projects/flink/flink-docs-release-1.19/docs/dev/datastream/operators/windows/)
