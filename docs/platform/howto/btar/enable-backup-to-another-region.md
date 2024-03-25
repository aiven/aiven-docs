---
title: Add a backup to another region
sidebar_label: Add cross-region backup
enterprise: true
---

Enable [the backup to another region (BTAR) feature](/docs/platform/concepts/backup-to-another-region) and create an additional cross-region service backup on top of a regular backup stored in the region where your service is hosted.

:::important
BTAR is supported for Aiven for MySQL® and Aiven for PostgreSQL®.
:::

To add an additional service backup for your service, you can use the Aiven
[console](#enable-btar-console), [CLI](#enable-btar-cli), or [API](#enable-btar-api).

## Prerequisites

- [Aiven Enterprise](/docs/platform/howto/aiven-enterprise) enabled
- At least one running Aiven for MySQL® or Aiven for PostgreSQL® service
- Depending on the tool you choose to use for enabling BTAR

  - Access to the [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI client](/docs/tools/cli)
  - [cURL](https://curl.se/download.html) CLI tool

## Back up to another region via console {#enable-btar-console}

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. From the **Services** view, select an Aiven service on which you'd like to enable BTAR.
1. On your service's page, select **Backups** from the sidebar.
1. On the **Backups** page, select the actions (**...**) menu > **Secondary backup
   location**.
1. In the **Secondary backup location** window, use the **Secondary location** dropdown
   menu to select a region for your additional backup. Confirm your choice by selecting
   **Enable**.

   :::tip
   For names of the cloud regions supported in Aiven, see column *Cloud* in
   [List of available cloud regions](/docs/platform/reference/list_of_clouds).
   :::

Your new additional backup is now visible on your service's **Backups** page in the
**Secondary backup location** column.

## Back up to another region with CLI {#enable-btar-cli}

Using the [Aiven CLI client](/docs/tools/cli), you can enable BTAR for

- [New Aiven service](#new-service-cli) or
- [Existing Aiven service](#existing-service-cli)

:::note[additional_backup_regions]
To enable BTAR on an Aiven service, add the `additional_backup_regions`
parameter to relevant commands.
:::

### Create a new service with BTAR via CLI {#new-service-cli}

Use the [avn service create](/docs/tools/cli/service-cli) command to create a new
service. Include `additional_backup_regions` as a parameter to the command and set its
value to the name of the desired cloud region.

```bash
avn service create                                            \
    --service-type service_type_name                          \
    --cloud cloud_region_name                                 \
    --plan service_plan_name                                  \
    -c additional_backup_regions=\[\"name_of_cloud_region\"\] \
    new_service_name
```

### Enable BTAR on an existing service via CLI {#existing-service-cli}

Use the [avn service update](/docs/tools/cli/service-cli) command to configure your
service so that it supports BTAR. Include `additional_backup_regions` as a parameter to
the command and set its value to the name of desired cloud region.

```bash
avn service update name_of_existing_service         \
    -c additional_backup_regions=[\"name_of_cloud_region\"]
```

## Back up to another region with API {#enable-btar-api}

Using [Aiven APIs](/docs/tools/api), you can enable BTAR for:

- [New Aiven service](#new-service-api) or
- [Existing Aiven service](#existing-service-api)

:::note[additional_backup_regions]
To enable BTAR on an Aiven service, include the `additional_backup_regions`
parameter in relevant calls.
:::

### Create a new service with BTAR via API {#new-service-api}

Use the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate) API
to create a new service with BTAR enabled. When constructing the API request, add the
`user_config` object to the request body and nest the `additional_backup_regions`
field inside.

```bash
curl --request POST                                                    \
    --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service    \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
    --header 'content-type: application/json'                          \
    --data
        '{
        "cloud": "string",
        "plan": "string",
        "service_name": "service_2_name",
        "service_type": "cassandra",
        "user_config": {
            "additional_backup_regions": ["cloud-region-name"]
        }
    }'
```

### Enable BTAR on an existing service via API {#existing-service-api}

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) API
to configure your existing service so that it supports BTAR. When constructing the API
request, add the `user_config` object to the request body and nest the
`additional_backup_regions` field inside. Set the value of the
`additional_backup_regions` parameter to the name of desired cloud region.

```bash
curl --request PUT                                                                       \
    --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME    \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
    --header 'content-type: application/json'                          \
    --data
        '{
        "user_config": {
            "additional_backup_regions": ["cloud-region-name"]
        }
    }'
```

## Related pages

- [About the backup to another region feature in Aiven](/docs/platform/concepts/backup-to-another-region)
- [Manage BTAR for your Aiven service](/docs/platform/howto/btar/manage-backup-to-another-region)
- [Disable BTAR for your Aiven service](/docs/platform/howto/btar/disable-backup-to-another-region)
