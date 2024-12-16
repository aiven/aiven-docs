---
title: Download Aiven for InfluxDB data backup
sidebar_label: Download InfluxDB data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

Download a backup of your Aiven for InfluxDB service data by requesting a backup. This creates a snapshot of your latest data, ready for download.

## Prerequisites

Before you download a backup, make sure you have the following:

- [Aiven API token](/docs/platform/howto/create_authentication_token) with the necessary
  permissions
- [Aiven CLI](/docs/tools/cli)

If your InfluxDB service is in a Virtual Private Cloud (VPC) or if you need specific
network access to your backup, confirm that the correct access settings are enabled.
Based on your network setup, enable one of the following settings:

- `public_access.user_backup`: Allows access to backups from the public internet
- `private_access.user_backup`: Allows access to backups within a private network
- `privatelink_access.user_backup`: Allows access to backups via a private link

To configure access:

1. Go to the service's <ConsoleLabel name="overview" /> page.
1. Click <ConsoleLabel name="service settings" />, then go to **Cloud and network**.
1. Click the <ConsoleLabel name="actions" /> menu and select
   **More network configurations**.
1. Click <ConsoleIcon name="Add config options"/>.
1. In the search field, enter the access setting to enable. For example,
   `private_access.user_backup`.
1. Select the value to **Enabled**.
1. Click **Save configuration**.

## Backup format

The backup created is in a **portable format** that includes all databases and retention
policies from your Aiven for InfluxDB service. This backup is packaged as a single `.tar`
file for easy storage and transfer. For more information, see the
[InfluxDB backup and restore documentation](https://docs.influxdata.com/influxdb/v1/administration/backup_and_restore/).

## Download data

<Tabs groupId="method">
<TabItem value="console" label="Aiven Console">

1. Log in to the [Aiven Console](https://console.aiven.io/), select your project, and
   choose your Aiven for InfluxDB service.
1. On the service's <ConsoleLabel name="overview"/> page, click
  <ConsoleLabel name="service settings"/>.
1. In the  **Service management** section, click <ConsoleLabel name="actions"/> >
   **Download data**.
1. In the **Download InfluxDB data** window, review the details and enter a name
   in the **Backup name** field. Use only letters, numbers, and the characters `.:_+-`
   without spaces or parentheses.
1. Click **Request backup** to create a backup of your latest data.

   :::note
   The duration of the backup process varies based on the size of your data. For larger
   instances, it may take several hours. Requesting a new backup will replace any
   existing backup, so download any existing backup you need before creating a new one.
   :::

1. After the backup is created, copy the **Service URI** to access the backup files
   directly. Paste the URI into your browser to download your backup.

Alternatively, you can also request a download from the **Backups** section:

1. Go to the service's <ConsoleLabel name="overview" /> page and click
   <ConsoleLabel name="backups" />.
1. Click the <ConsoleLabel name="actions" /> > **Download backup**.
1. In the **Download InfluxDB data** window, review the details and enter a name in
   the **Backup name** field.
1. Click **Request backup** to create a backup of your latest data.

</TabItem>
<TabItem value="api" label="Aiven API">

1. Create a backup using the [Aiven API](https://api.aiven.io/doc/) by
   specifying `create_user_backup` as the task type.

   ```bash
   curl -X POST "https://api.aiven.io/v1/project/<project_name>/service/<service_name>/task" \
      -H "Authorization: Bearer <API_TOKEN>" \
      -H "Content-Type: application/json" \
      -d '{
          "task_type": "create_user_backup",
          "create_user_backup": {
              "backup_name": "my-influxdb-backup"
          }
      }'
   ```

   Parameters:

   - `project_name`: Your project name.
   - `service_name`: Your service name.
   - `api_token`: Your API authentication
     [token](/docs/platform/concepts/authentication-tokens).

1. Get the `user_backup_uri` from your service connection information by using
   the [Aiven API](https://api.aiven.io/doc/) endpoint:

   ```plaintext
   curl -X GET "https://api.aiven.io/v1/project/<project_name>/service/<service_name>" \
   -H "Authorization: Bearer <API_TOKEN>"
   ```

1. Download the backup using the following Service URI format:

   ```plaintext
   <user_backup_uri>/<backup_name>.tar
   ```

   Adjust the Service URI based on your network configuration:

   - **Public access**: If your service is in a VPC configured for public access, add
     the prefix `public-` to the Service URI.
   - **Private access**: Use the Service URI as provided, without any prefix. Ensure that
     the `private_access.user_backup` setting is enabled in your service's network
     configuration.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

1. Create a backup by running the following command:

   ```bash
   avn service task-create <service_name> \
     --task-type create_user_backup       \
     --backup-name <backup_name>

   ```

   Replace `<service_name>` with your Aiven for InfluxDB service name and
   `<backup_name>` with a descriptive name for the backup.

1. To download the backup, use the following URI format:

   ```plaintext
   <user_backup_uri>/<backup_name>.tar
   ```

   Adjust the URI based on your network settings:

   - **Public access**: For a service in a VPC configured for public access, add the
     prefix `public-` to the URI.
   - **Private access**: Use the URI as is if private access is enabled. Ensure that
    the private access setting, `private_access.user_backup`, is enabled in your
    service configuration.

</TabItem>
</Tabs>
