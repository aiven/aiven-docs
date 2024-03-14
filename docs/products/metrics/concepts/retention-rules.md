---
title: Retention rules
---
Retention periods in Aiven for Metrics® help you manage how long your metrics data is stored. Understanding how to set these periods allows you to optimize storage space while maintaining access to historical data for analysis.

## Understand retention rules

Retention rules define the duration for which Aiven for Metrics stores your metrics data.
By default, all data is stored indefinitely,  providing uninterrupted access to
historical insights. However, tailoring these settings allows you to align with
specific data storage strategies, compliance needs, and cost management goals.

## Define retention rules

In Aiven for Metrics, the Thanos Metrics Compactor component manages retention settings.
You can modify these settings by accessing the Advanced configuration options in the
Aiven Console or using Aiven API.

Available configuration options:

- **Raw data**: Retains your metrics data at the highest level of detail,
  which is crucial for comprehensive analysis where each data point matters.
- **5-minute downsampled data**: This approach aggregates metrics into 5-minute
  intervals. It balances detail and storage efficiency, facilitating straightforward
  analysis over extended periods without significantly affecting data fidelity.
- **1-hour downsampled data**: This view groups metrics into 1-hour intervals, suitable
  for tracking long-term trends. It is less detailed but ideal for strategic insights
  and broad analyses.


## Downsampling

Downsampling in Aiven for Metrics restructures data series to lower resolution without
losing accuracy. This approach improves the efficiency of queries spanning large
time frames. Aiven for Metrics systematically uses this process to aggregate data
into broader intervals (5 minutes and 1 hour). This method makes query operations
more efficient over lengthy durations and contributes to more effective storage
utilization.

## Related pages

- [Enforcing retention of data](https://thanos.io/tip/components/compact.md/#enforcing-retention-of-data)
