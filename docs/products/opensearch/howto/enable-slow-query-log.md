---
title: Enable slow query logging
sidebar_label: Enable slow query logs
---

Identify inefficient or time-consuming queries by enabling [slow query log](https://docs.opensearch.org/latest/install-and-configure/configuring-opensearch/logs/#search-request-slow-logs) in your Aiven for OpenSearch® service.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/) or any other dev tool to enable
  slow query logging with

## Enable slow query logging

1.  Log in to [Aiven Console](https://console.aiven.io/).
1.  In the **Services** page, select your Aiven for MySQL service.
1.  In the **Service settings** page of your service, scroll down to the
    **Advanced configuration** section and select **Configure**.
1.  In the **Advanced configuration** window

    1.  Click **Add configuration options**. From the unfolded list,
        choose `opensearch.cluster.search.request.slowlog.level`.
    1.  Set its value to one of the following: `debug`, `info`, `trace`, `warn`.
    1.  Click **Add configuration options**. From the unfolded list,
        choose either of the following:

        - `opensearch.cluster.search.request.slowlog.threshold.debug`
        - `opensearch.cluster.search.request.slowlog.threshold.info`
        - `opensearch.cluster.search.request.slowlog.threshold.trace`
        - `opensearch.cluster.search.request.slowlog.threshold.warn`

    1.  Set the `threshold` value unless you want to keep default `-1`.

        note:::
        - As a value, enter a number followed by a unit with no space between, for example
          `1s`.
        - Allowed unit shortcuts: `s`, `m`, `h`, `d`, `nanos`, `ms`, `micros`
        :::

    1.  Click **Save configuration**.
