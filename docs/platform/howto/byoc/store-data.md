---
title: Storing data in custom clouds
sidebar_label: Data storage
keywords: [bring your own cloud, byoc, custom cloud, BYOC cloud, object storage, tiered storage, S3 bucket, S3]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Depending on your cloud provider, data in your custom cloud and service backups can be stored either in Aiven-owned cloud or in your own cloud account.

## BYOC tiered storage

:::important
BYOC tiered storage is only supported in AWS custom clouds for
[Aiven for Apache Kafka](/docs/products/kafka/howto/kafka-tiered-storage-get-started) and
[Aiven for ClickHouse](/docs/products/clickhouse/concepts/clickhouse-tiered-storage).
:::

To store data, AWS [BYOC](/docs/platform/concepts/byoc) environments use tiered storage, a
data allocation mechanism for improved efficiency and cost optimization of data management.
When enabled, tiered storage allows moving data automatically between hot storage (for
frequently accessed, critical, and often updated data) and cold storage (for rarely
accessed, static, or archived data).

Cold data of AWS-BYOC-hosted services is stored in object storage in your own AWS cloud
account. One S3 bucket is created per custom cloud.

:::note

- Non-BYOC services with Aiven-owned tiered storage cannot be migrated to BYOC.
- Tiered storage enabled on non-BYOC services doesn't allow to store cold data in your
  own cloud account.

:::

To use tiered storage in an AWS-BYOC-hosted service, tiered storage needs to be enabled both
[in your custom cloud](/docs/platform/howto/byoc/store-data#enable-in-a-custom-cloud) and
[in the BYOC-hosted service](/docs/platform/howto/byoc/store-data#enable-on-a-service).

### Enable in a custom cloud

- **New AWS custom clouds** have tiered storage enabled by default.
- **Existing AWS custom clouds** created in the past with no tiered storage support,
  [contact the Aiven support team](mailto:support@aiven.io) to request enabling tiered
  storage.

:::note
You cannot deactivate tiered storage on your custom cloud once it's activated.
:::

### Enable on a service

#### Prerequisites

- At least one AWS [custom cloud](/docs/platform/howto/byoc/create-custom-cloud)
- At least one [Aiven-manged service](/docs/platform/howto/create_new_service), either
  Aiven for Apache Kafka® or Aiven for ClickHouse®, hosted in a custom cloud

  :::note
  If your service is not hosted in a custom cloud, find out whether you can
  [migrate to a custom cloud](/docs/platform/howto/byoc/manage-byoc-service#migrate-an-existing-service-to-a-custom-cloud).
  :::

#### Activate tiered storage

- [Enable for Aiven for Apache Kafka](/docs/products/kafka/howto/enable-kafka-tiered-storage)
- [Enable for Aiven for Clickhouse](/docs/products/clickhouse/howto/enable-tiered-storage)

## BYOC service backups

Aiven takes [regular service backups](/docs/platform/concepts/service_backups), which are
encrypted using Aiven-managed keys.

Backups of BYOC-hosted services are stored as follows:

- **AWS BYOC**: User-owned backups stored in object storage in your own AWS cloud account.
  One S3 bucket is created per custom cloud.
- **Google Cloud, Azure, or OCI BYOC**: Aiven-owned backups stored in Aiven-managed object
  storage.

## Related pages

-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
