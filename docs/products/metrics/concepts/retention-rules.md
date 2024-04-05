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

Aiven for Metrics uses the Thanos Metrics Compactor to simplify retention settings.
A single parameter, `compactor.retention.days`, sets the same retention period for all
types of data: `raw`, 5`-minute downsampled`, and `1-hour downsampled`.

To adjust the `compactor.retention.days` parameter, access the **Advanced configuration**
options in the Aiven Console or use the Aiven API.This unified approach streamlines data
lifecycle management, supporting your storage, compliance, and cost management strategies.

## Downsampling

Downsampling in Aiven for Metrics transforms data series to lower resolution without
compromising accuracy. This technique enhances the performance of queries over large
time frames. Aiven for Metrics systematically aggregates data into resolutions of
5 minutes and 1 hour. This aggregation process significantly improves query performance
over extended periods and increases storage efficiency.

## Related pages

- [Enforcing retention of data](https://thanos.io/tip/components/compact.md/#enforcing-retention-of-data)
