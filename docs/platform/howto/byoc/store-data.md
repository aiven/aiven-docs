---
title: Store data in custom clouds
sidebar_label: Storage data
keywords: [bring your own cloud, byoc, custom cloud, BYOC cloud, object storage, tiered storage, bucket]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

BYOC environments use the tiered storage capability for data allocation. Cold data in your
custom cloud is stored in your AWS cloud account or your Google Cloud organization.

## BYOC tiered storage

:::important
[BYOC](/docs/platform/concepts/byoc) tiered storage is only supported for
[Aiven for Apache Kafka](/docs/products/kafka/howto/kafka-tiered-storage-get-started) and
[Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage).
:::

To store data, [BYOC](/docs/platform/concepts/byoc) environments use tiered storage, a
data allocation mechanism for improved efficiency and cost optimization of data management.
When enabled, tiered storage allows moving data automatically between hot storage (for
frequently accessed, critical, and often updated data) and cold storage (for rarely
accessed, static, or archived data).

Cold data of BYOC-hosted services is stored in object storage in your AWS cloud
account or your Google Cloud organization. One bucket is created per custom cloud.

:::note

- Tiered storage enabled on non-BYOC services is owned by Aiven and as such doesn't allow
  to store cold data in your own cloud account.
- Non-BYOC services with Aiven-owned tiered storage cannot be migrated to BYOC.

:::

To use tiered storage in an BYOC-hosted service, tiered storage needs to be enabled both
[in your custom cloud](/docs/platform/howto/byoc/store-data#enable-tiered-storage-in-a-custom-cloud)
and
[in the BYOC-hosted service](/docs/platform/howto/byoc/store-data#enable-tiered-storage-on-a-service).

## Enable tiered storage in a custom cloud

- **New custom clouds**: Tiered storage is enabled by default in all new custom
  clouds so you can proceed to
  [enabling tiered storage on a service](/docs/platform/howto/byoc/store-data#enable-tiered-storage-on-a-service).
- **Existing custom clouds with no tiered storage support**:
  [Contact the Aiven support team](mailto:support@aiven.io) to request enabling tiered
  storage in your custom cloud.

## Enable tiered storage on a service

### Prerequisites

- At least one [custom cloud](/docs/platform/howto/byoc/create-custom-cloud)
- At least one [Aiven-manged service](/docs/platform/howto/create_new_service), either
  Aiven for Apache Kafka® or Aiven for ClickHouse®, hosted in an custom cloud

  :::note
  If your Aiven-managed service is not hosted in a custom cloud, you can
  [migrate it](/docs/platform/howto/byoc/manage-byoc-service#migrate-an-existing-service-to-a-custom-cloud).
  :::

### Activate tiered storage

- [Enable for Aiven for Apache Kafka](/docs/products/kafka/howto/enable-kafka-tiered-storage)
- [Enable for Aiven for Clickhouse](/docs/products/clickhouse/howto/enable-tiered-storage)

## Related pages

-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
