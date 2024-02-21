---
title: Tiered storage overview page in Aiven Console
sidebar_label: Tiered storage overview page
early: true
---

Aiven for Apache Kafka® offers a comprehensive overview of tiered storage, allowing you to understand its usage and make informed decisions.

This overview page provides insights into various aspects of tiered storage, including
hourly billing, settings, and storage details.

## Prerequisite

-   [Tiered storage enabled for the Aiven for Apache Kafka service](/docs/products/kafka/howto/enable-kafka-tiered-storage).

## Access tiered storage overview page

1.  Log in to the [Aiven console](https://console.aiven.io/), choose
    your project and select your Aiven for Apache Kafka service.
1.  From the left sidebar, select **Tiered Storage**.
    -   If tiered storage is not yet enabled for your service, you will
        see the option to enabled it.
    -   If tiered storage is enabled but not configured for any topics,
        you have the option to set it up for topics directly. For more
        details, see
        [Enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage).
1.  Once configured, you can view an overview of tiered storage and its
    associated details.

## Key insights of tiered storage

Get a quick snapshot of the essential metrics and details related to
tiered storage:

-   **Current billing expenses in USD**: Displays your tiered storage
    costs, calculated at hourly rates.
-   **Forecasted month cost in USD**: Estimate your upcoming monthly
    costs based on current usage.
-   **Remote tier usage in bytes**: View the volume of data that has
    been tiered.
-   **Storage overview**: View how topics use
    [remote storage](/docs/products/kafka/howto/tiered-storage-overview-page#remote-storage-overview).

## Current tiered storage settings

This section provides an overview of the current local cache details and
retention policy configurations for tiered storage:

-   **Default local retention time (ms)**: Shows the current local data
    retention set in milliseconds.
-   **Default local retention bytes**: Shows the configured volume of
    data, in bytes, for local retention.

### Modify retention policies {#modify-retention-polices}

1.  In the **Tiered storage settings** section, click **Actions(\...)**
    and click **Update tiered storage settings**.
1.  Within **Update tiered storage settings** page, adjust the values
    for:
    -   Local Cache
    -   Default Local Retention Time (ms)
    -   Default Local Retention Bytes
1.  Click **Save changes**.

## Remote storage overview

Explore the specifics of your storage usage and configurations:

-   **Remote storage usage by topics**: Analyze how much tiered storage
    each topic uses.
-   **Filter by topic**: Narrow down your view to specific topics for
    focused insights.
