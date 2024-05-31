---
title: Upgrade Aiven for Apache Flink
---

Upgrading to the latest version of Aiven for Apache Flink® allows you to benefit from improved features, enhanced performance, and better security.

:::note
Aiven for Apache Flink version 1.16 will soon reach
[end-of-life](/docs/platform/reference/eol-for-major-versions#aiven-for-flink).
:::

## Limitations

- Direct upgrades on active Aiven for Apache Flink services are not supported.
- Upgrading to Apache Flink 1.19 requires creating a new service and manually
  transferring applications.

## Migrate to a newer Apache Flink version

If you are using Aiven for Apache Flink version 1.16 and want to take advantage of
the enhancements in Aiven for Apache Flink 1.19, you must migrate your applications
to a new Flink service. Follow these steps:

### Step 1: Create new Aiven for Apache Flink service

1. Create new Aiven for Apache Flink service using the
   [Aiven Console](https://console.aiven.io/), [Aiven Client](/docs/tools/cli/service/flink),
   or [Terraform](/docs/tools/terraform) (provider version 4.19.0).
1. Select Apache Flink 1.19 as the deployment version for your new
   Aiven for Apache Flink service.

### Step 2: Transfer your applications

**Manual transfer**: If you created your Aiven for Apache Flink applications manually:

  1. Stop the application deployment in the old Aiven for Apache Flink service.
  1. Copy the source, sinks, and transformation statements from the old service for your
     applications.
  1. Create new applications in the new service and add the copied source, sinks, and
     transformation statements.
  1. Deploy the new applications in the new service.

     For more information, see
    [Aiven for Apache Flink applications](/docs/products/flink/howto/create-flink-applications).

**Using Terraform**: If you used Terraform (ensure you’re on provider version 4.19.0)
  to create your service and applications:

  1. Update the `flink_version` property in your Terraform script to 1.19.
  1. Run Terraform to create new Aiven for Apache Flink service with the updated
     version and applications. Terraform will automatically handle the recreation and
     deployment of your applications.

     For more information, see [aiven_flink ](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/flink).

:::note
 For information on breaking changes between versions, refer to the official
 [Apache Flink release notes](https://nightlies.apache.org/flink/flink-docs-release-1.19/release-notes/flink-1.19/).
:::

### Step 3: Verify and power off service

To complete the migration:

1. Verify that the applications are operating correctly on the new
   Aiven for Apache Flink service.
1. Power off and delete the old service after confirming the new service is running.
