---
title: Upgrade Aiven for Apache Flink
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Upgrading to the latest version of Aiven for Apache Flink® allows you to benefit from improved features, enhanced performance, and better security.

## Limitations

- Direct upgrades on active Aiven for Apache Flink services are not supported.
- Upgrading to Apache Flink 1.19 requires creating a new service and manually
  transferring applications.

## Migrate to a newer Apache Flink version

If you are using Aiven for Apache Flink version 1.16, which will soon
reach [end-of-life](/docs/platform/reference/eol-for-major-versions#aiven-for-flink),
create new service for version 1.19 and migrate your applications to continue
receiving support and take advantage of the latest enhancements.

### Step 1: Create an Aiven for Apache Flink service

1. Create an Aiven for Apache Flink service using the
   [Aiven Console](https://console.aiven.io/), [Aiven CLI](/docs/tools/cli/service/flink),
   or [Aiven Provider for Terraform](/docs/tools/terraform) (provider version 4.19.0).
1. Select Apache Flink 1.19 as the deployment version for the
   Aiven for Apache Flink service.

### Step 2: Transfer your applications

<Tabs groupId="transfer">
<TabItem value="manual" label="Manual" default>

For manually created applications:

1. Stop the application deployment in the existing Aiven for Apache Flink service.
1. Copy the source, sinks, and transformation statements from the existing
   service for your applications.
1. Create applications in the new service and add the copied source, sinks, and
   transformation statements.
1. Deploy the applications in the new service.

For more information, see [Aiven for Apache Flink applications](/docs/products/flink/howto/create-flink-applications).

</TabItem>
<TabItem value="terraform" label="Using Terraform">

If you used Terraform (ensure you're on provider version 4.19.0) to create your service
and applications:

1. Update the `flink_version` property in your Terraform script to 1.19.
1. Run Terraform to create Aiven for Apache Flink service with the updated
   version and applications. Terraform will automatically handle the recreation and
   deployment of your applications.

For more information, see [aiven_flink](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/flink).

</TabItem>
</Tabs>

:::note
For information on breaking changes between versions, refer to the official [Apache Flink release notes](https://nightlies.apache.org/flink/flink-docs-release-1.19/release-notes/flink-1.19/).
:::

### Step 3: Verify and power off the service

To complete the migration:

1. Verify that the applications are operating correctly in the new
   Aiven for Apache Flink service.
1. Power off and delete the old service after confirming the new service is running.
