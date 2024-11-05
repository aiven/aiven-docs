---
title: Download Aiven for InfluxDB data backup
sidebar_label: Download InfluxDB data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

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

To configure access, go to the service's <ConsoleLabel name="overview" /> page,
click <ConsoleLabel name="service settings" />, go to **Advanced configuration**, and
click **Configure**.

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
   in the **Backup name** field.
1. Click **Request backup** to create a backup of your latest data.

   :::note
   The backup process may take several minutes, depending on the size of your data.
   Requesting a new backup will replace any existing backup. Download any existing backup
   you need before creating a new one.
   :::

1. After the backup is created, copy the Service URI, paste it into your browser, and
   download your backup.

#### Alternative method to download data

You can also request a download from the **Backups** section:

1. Click <ConsoleLabel name="backups" /> on the sidebar.
1. Click the <ConsoleLabel name="actions" /> > **Download backup**.
1. In the **Download InfluxDB data** window, review the details and enter a name in
   the **Backup name** field.
1. Click **Request backup** to create a backup of your latest data.

</TabItem>
<TabItem value="api" label="Aiven API">

1. Send a request to the Aiven API with `create_user_backup` as the task type.

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

   - `PROJECT_NAME`: Your project name.
   - `SERVICE_NAME`: Your service name.
   - `API_TOKEN`: Your API authentication
     [token](/docs/platform/concepts/authentication-tokens).

1. To download the backup, use the following URI format:

   ```plaintext
   <user_backup_uri>/<backup_name>.tar
   ```

  Adjust the URI based on your network settings:

   - **Public access**: For a service in a VPC configured for public access, add
     the prefix `public-` to the URI.
   - **Private access**: Use the URI as provided, with no additional prefix. Ensure that
    the private access setting, `private_access.user_backup`, is enabled in your
    service configuration.

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
