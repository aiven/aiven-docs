---
title: Retention rules in Aiven for Metrics
sidebar_label: Retention rules
---
Retention rules in Aiven for Metrics define how long your metrics data is stored.

By default, all data is retained indefinitely, ensuring uninterrupted access to
historical insights. Optimize storage and access to historical data by tailoring
retention periods to align with specific data strategies, compliance needs, and
cost management goals.

## Define retention rules

Aiven for Metrics uses the Thanos Metrics Compactor to simplify retention settings.
A single parameter, `compactor.retention.days`, sets the same retention period for all
types of data: `raw`, `5-minute downsampled`, and `1-hour downsampled`.

To adjust the `compactor.retention.days` parameter:

1. Click **Service settings** from the sidebar.
1. Scroll to **Advanced configuration** and click **Configure**.
1. Click **Add configuration options**.
1. Locate the `compactor.retention.days` parameter.
1. Set the desired retention period by adjusting the parameter value.
1. Click **Save configuration**.

## Downsampling time series data

Downsampling in Aiven for Metrics is the process of lowering the resolution of
time series data while preserving its essential informational value. By aggregating
this data into distinct 5-minute and 1-hour intervals, the technique significantly
enhances the speed and efficiency of queries over long periods. This approach optimizes
storage usage and ensures that the data remains manageable and accessible,
retaining crucial details.

## Related pages

- [Enforcing retention of data](https://thanos.io/tip/components/compact.md/#enforcing-retention-of-data)
