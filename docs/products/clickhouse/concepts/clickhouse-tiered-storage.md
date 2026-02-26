---
title: Tiered storage in Aiven for ClickHouse®
sidebar_label: Tiered storage
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

The tiered storage feature introduces a method of organizing and storing data in two tiers for improved efficiency and cost optimization. TThe data is automatically moved to an appropriate tier based on your database's disk usage.

On top of this default data allocation mechanism, you can control the tier your
data is stored in using custom data retention periods.

## Tiered storage architecture

The tiered storage in Aiven for ClickHouse® consists of the following two
layers:

- Network-attached block storage (cloud provider-managed disks) - the first tier:
  Fast storage with limited capacity, optimized for fresh and frequently
  queried data, and relatively costly compared to object storage
- Object storage - the second tier: Affordable storage with unlimited capacity, better
  suited for historical and more rarely queried data, and relatively slower.

The network-attached block storage implementation depends on the cloud provider:

- AWS: Amazon EBS (gp3)
- Azure: Azure Managed Disks (Premium SSD v2)
- GCP: Google Persistent Disk (Hyperdisk Balanced)

Aiven for ClickHouse's tiered storage supports
[local on-disk cache for remote files](/docs/products/clickhouse/howto/local-cache-tiered-storage),
which is enabled by default. You can
[disable the cache](/docs/products/clickhouse/howto/local-cache-tiered-storage#disable-the-cache)
or
[drop it](/docs/products/clickhouse/howto/local-cache-tiered-storage#free-up-space) to free
up the space it occupies.

## Supported cloud platforms

On the Aiven tenant (in non-[BYOC](/docs/platform/concepts/byoc) environments), Aiven for
ClickHouse tiered storage is supported on the following cloud platforms:

- Microsoft Azure
- Amazon Web Services (AWS)
- Google Cloud

## Why use it

By
[enabling](/docs/products/clickhouse/howto/enable-tiered-storage) and properly
[configuring](/docs/products/clickhouse/howto/configure-tiered-storage) the tiered storage
feature in Aiven for ClickHouse, you can
use storage resources efficiently and, therefore, significantly reduce
storage costs of your Aiven for ClickHouse instance.

## How it works

After you
[enable](/docs/products/clickhouse/howto/enable-tiered-storage) the tiered storage feature,
Aiven for ClickHouse by default
stores data on network-attached block storage until it reaches 80% of its capacity. After exceeding
this size-based threshold, data is stored in object storage.

Optionally, you can
[configure the time-based threshold](/docs/products/clickhouse/howto/configure-tiered-storage)
for your storage. Based on the time-based threshold, the
data moves from network-attached block storage to object storage after a specified time
period.

```mermaid
sequenceDiagram
        Application->>+Network-attached block storage: writing data
        Network-attached block storage->>Object storage: moving data based <br> on storage policies
        par Application to Network-attached block storage
            Application-->>Network-attached block storage: querying data
        and Application to Object storage
            Application-->>Object storage: querying data
        end
        alt if stored in Object storage
            Object storage->>Application: reading data
        else if stored in Network-attached block storage
            Network-attached block storage->>Application: reading data
        end
```

:::note
Aiven backs up data that resides on network-attached block storage and in object
storage.
:::

## Typical use case

In your Aiven for ClickHouse service, a significant amount of
data sits unused for a long time and is rarely accessed. That data is stored
on network-attached block storage, which is relatively costly. You decide to
[enable](/docs/products/clickhouse/howto/enable-tiered-storage) tiered storage to make
your data storage more efficient and reduce the costs. For that purpose, you
[enable](/docs/products/clickhouse/howto/enable-tiered-storage) the feature on tables to
be optimized. You
[configure](/docs/products/clickhouse/howto/configure-tiered-storage) the time-based
threshold to control how your data is stored between the two layers.

## Limitations {#tiered-storage-limitations}

-   You can [enable](/docs/products/clickhouse/howto/enable-tiered-storage) tiered storage
    on the Aiven tenant (in non-[BYOC](/docs/platform/concepts/byoc) environments) if your
    Aiven for ClickHouse service is hosted on Azure, AWS, or GCP.
-   When
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage), the tiered storage
    feature cannot be deactivated.

    :::tip
    As a workaround, you can create a table (without enabling tiered
    storage on it) and copy the data from the original table (with the
    tiered storage feature
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage)) to the new table. As
    soon as the data is copied to the
    new table, you can remove the original table.
    :::

-   With the tiered storage feature
    [enabled](/docs/products/clickhouse/howto/enable-tiered-storage), it's not possible to
    connect to an external existing object storage or cloud storage bucket.

-   In the [Aiven Console](https://console.aiven.io/), there can be a mismatch in the
    displayed amount of data in object storage between what's shown in
    [<ConsoleLabel name="tieredstorage"/>](/docs/products/clickhouse/howto/list-tiered-storage#access-tiered-storage-details)
    and
    [Storage details](/docs/products/clickhouse/howto/list-tiered-storage#access-tiered-storage-details).

    This is because:

    - Information in
      [<ConsoleLabel name="tieredstorage"/>](/docs/products/clickhouse/howto/list-tiered-storage#access-tiered-storage-details)
      is updated every hour.

      :::tip
      To check if you successfully transferred data to object storage, display
      [Storage details](/docs/products/clickhouse/howto/list-tiered-storage#access-tiered-storage-details)
      of your table in the [Aiven Console](https://console.aiven.io/).
      :::

    - There can be unused data in object storage, for example before Aiven for ClickHouse
      performs a merge of parts or when a backup is performed before your table changes.
      Such unused data is removed once a day.

## What's next

-   [Enable tiered storage in Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)
-   [Configure data retention thresholds for tiered storage](/docs/products/clickhouse/howto/configure-tiered-storage)

<RelatedPages/>

-   [Check data volume distribution between different disks](/docs/products/clickhouse/howto/check-data-tiered-storage)
-   [Transfer data between network-attached block storage and object storage](/docs/products/clickhouse/howto/transfer-data-tiered-storage)
