---
title: Use tiered storage for AWS BYOC services
sidebar_label: AWS BYOC tiered storage
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

AWS BYOC environments use the tiered storage capability for data allocation. Cold data in your AWS custom cloud is stored in your AWS cloud account.

:::note
This is a
[limited availability feature](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
:::

AWS [BYOC](/docs/platform/concepts/byoc) environments allow using tiered storage to store
data. The tiered storage is a data allocation mechanism for improved efficiency and cost
optimization of data management. When enabled, tiered storage allows moving data
automatically between hot storage (for frequently accessed, critical, and often updated
data) and cold storage (for rarely accessed, static, or archived data).

Cold data of AWS BYOC-hosted services is stored in object storage in your AWS cloud
account. One bucket is created per custom cloud.

:::important

- AWS [BYOC](/docs/platform/concepts/byoc) tiered storage is only supported for
  [Aiven for Apache Kafka](/docs/products/kafka/howto/kafka-tiered-storage-get-started) and
  [Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage).
- Tiered storage enabled on non-BYOC services is owned by Aiven and as such doesn't allow
  to store cold data in your own cloud account.
- Non-BYOC services with Aiven-owned tiered storage cannot be migrated to BYOC.

:::

To use tiered storage in an AWS BYOC-hosted service, tiered storage needs to be enabled both
[in your custom cloud](/docs/platform/howto/byoc/store-data#enable-tiered-storage-in-an-aws-custom-cloud)
and
[in the BYOC-hosted service](/docs/platform/howto/byoc/store-data#enable-tiered-storage-on-a-service).

## Enable tiered storage in an AWS custom cloud

[Contact the Aiven support team](mailto:support@aiven.io) to request enabling tiered
storage in your AWS custom cloud.

## Enable tiered storage on a service

### Prerequisites

- At least one AWS [custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
- At least one [Aiven-managed service](/docs/platform/howto/create_new_service), either
  Aiven for Apache Kafka® or Aiven for ClickHouse®, hosted in a custom cloud

  :::note
  If your Aiven-managed service is not hosted in an AWS custom cloud, you can
  [migrate it](/docs/platform/howto/byoc/manage-byoc-service#migrate-an-existing-service-to-a-custom-cloud).
  :::

### Activate tiered storage

- [Enable for Aiven for Apache Kafka](/docs/products/kafka/howto/enable-kafka-tiered-storage)
- [Enable for Aiven for ClickHouse](/docs/products/clickhouse/howto/enable-tiered-storage)

<RelatedPages/>

-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
