import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

For a project that has the backup to another region (BTAR) feature enabled, you can add or
change a secondary backup location, check the secondary backup status, monitor the
replication lag, fork and restore using the cross-region backup, or migrate to another
cloud or region.

:::note
The Aiven Console does not support BTAR for this service. Manage the secondary backup
location with the [Aiven CLI](/docs/tools/cli), the [Aiven API](/docs/tools/api), the
[Aiven Provider for Terraform](/docs/tools/terraform), or the
[Aiven Operator for Kubernetes®](/docs/tools/kubernetes), by setting the
`additional_backup_regions` option in your service configuration.
:::

## Prerequisites

- At least one Aiven service in a project with BTAR enabled
- The [Aiven CLI](/docs/tools/cli) or the [Aiven API](/docs/tools/api)

## Add or change a secondary backup location

Set `additional_backup_regions` to the cloud and region you want to hold the secondary
backup. To change the region later, set the option to a different value.

<Tabs groupId="btar-tools">
<TabItem value="cli" label="Aiven CLI" default>

Use the [avn service update](/docs/tools/cli/service-cli) command.

```bash
avn service update SERVICE_NAME                            \
    --project PROJECT_NAME                                 \
    -c additional_backup_regions='["SECONDARY_REGION"]'
```

Replace the following:

- `SERVICE_NAME`: the name of your service
- `PROJECT_NAME`: the name of your project
- `SECONDARY_REGION`: the cloud and region to hold the secondary backup, for example
  `aws-us-east-2`

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint.

```bash
curl --request PUT                                                              \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME     \
    --header 'Authorization: Bearer BEARER_TOKEN'                               \
    --header 'content-type: application/json'                                   \
    --data '{"user_config": {"additional_backup_regions": ["SECONDARY_REGION"]}}'
```

Replace the following:

- `PROJECT_NAME`: the name of your project
- `SERVICE_NAME`: the name of your service
- `BEARER_TOKEN`: your authentication token
- `SECONDARY_REGION`: the cloud and region to hold the secondary backup, for example
  `aws-us-east-2`

</TabItem>
</Tabs>

Aiven provisions storage in the region you selected and starts replicating backup files
to it. Until the first backup finishes replicating, you cannot fork your service from the
secondary backup.

:::important
Changing the secondary backup region starts a new base backup. You can fork your service
from the new region only after that backup finishes.
:::

## Check BTAR status

To see whether your service has a secondary backup and which region holds it, read
`user_config.additional_backup_regions` for the service. The field is empty when the
service has no secondary backup.

<Tabs groupId="btar-tools">
<TabItem value="cli" label="Aiven CLI" default>

```bash
avn service get SERVICE_NAME --project PROJECT_NAME --json
```

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceGet](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) endpoint.

```bash
curl --request GET                                                              \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME     \
    --header 'Authorization: Bearer BEARER_TOKEN'
```

</TabItem>
</Tabs>

## Determine replication lag

Determine the target region and the replication lag for a secondary (BTAR) backup of
your service, call the
[ServiceBackupToAnotherRegionReport](https://api.aiven.io/doc/#tag/Service/operation/ServiceBackupToAnotherRegionReport)
endpoint.

Configure the call as follows:

1. Enter `YOUR-PROJECT-NAME` and `YOUR-SERVICE-NAME` into the URL.
1. Specify `DESIRED-TIME-PERIOD` depending on the time period you need the metrics for:
   select one of the following values for the `period` key: `hour`, `day`, `week`,
   `month`, or `year`.

```bash
curl --request POST                                                                                                     \
   --url https://api.aiven.io/v1/project/YOUR-PROJECT-NAME/service/YOUR-SERVICE-NAME/backup_to_another_region/report    \
   --header 'Authorization: Bearer YOUR-BEARER-TOKEN'                                                                   \
   --header 'content-type: application/json'                                                                            \
   --data '{"period":"DESIRED-TIME-PERIOD"}'
```

As output, you get metrics including replication lags at specific points in time.

## Fork and restore a service with BTAR {#fork-and-restore}

To restore your service using BTAR, create a fork of the original service in the region
where the secondary backup resides.

:::note
When you fork and restore from the secondary backup, your new fork service is created in
the cloud and region where the secondary backup is located. The fork service gets the same
plan that the primary service uses. Backups of the fork service are located in the region
where this new service is hosted.
:::

<Tabs groupId="btar-tools">
<TabItem value="cli" label="Aiven CLI" default>

Run the [avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) command
with the `--service-to-fork-from` option and the `--recovery-target-time`option. Set
`--recovery-target-time` to no earlier than the time of taking the oldest replicated base
backup.

```bash {6,7}
avn service create FORK_SERVICE_NAME                 \
  --plan SERVICE_PLAN                                \
  --project PROJECT_NAME                             \
  --service-type SERVICE_TYPE                        \
  --cloud SECONDARY_BACKUP_REGION                    \
  --recovery-target-time "YYYY-MM-DDTHH:MM:SS+00:00" \
  --service-to-fork-from PRIMARY_SERVICE_NAME
```

Replace the following with meaningful data:

- `FORK_SERVICE_NAME`
- `SERVICE_PLAN`
- `PROJECT_NAME`
- `SERVICE_TYPE`
- `SECONDARY_BACKUP_REGION`
- `PRIMARY_SERVICE_NAME`
- `YYYY-MM-DDTHH:MM:SS+00:00`

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate) API
to create a fork service. When constructing the API request, add the `user_config` object
to the request body and nest the `service_to_fork_from` field and the
`recovery_target_time` field inside. Set `recovery_target_time` to no earlier than the
time of taking the oldest replicated base backup.

```bash
curl --request POST                                                    \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service         \
    --header 'Authorization: Bearer BEARER_TOKEN'                      \
    --header 'content-type: application/json'                          \
    --data
        '{
        "cloud": "SECONDARY_BACKUP_REGION",
        "plan": "SERVICE_PLAN",
        "service_name": "FORK_SERVICE_NAME",
        "service_type": "SERVICE_TYPE",
        "user_config": {
            "service_to_fork_from": "PRIMARY_SERVICE_NAME",
            "recovery_target_time": "YYYY-MM-DDTHH:MM:SS+00:00"
        }
    }'
```

Replace the following with meaningful data:

- `FORK_SERVICE_NAME`
- `SERVICE_PLAN`
- `PROJECT_NAME`
- `SERVICE_TYPE`
- `SECONDARY_BACKUP_REGION`
- `PRIMARY_SERVICE_NAME`
- `YYYY-MM-DDTHH:MM:SS+00:00`

</TabItem>
</Tabs>

## Migrate a service with BTAR

You can migrate a service with BTAR the same way you
[migrate a service with a regular backup](/docs/platform/howto/migrate-services-cloud-region).

:::note
When you migrate your service, locations of service backups, both primary and secondary
ones, do not change.
:::

## Delete a cross-region backup

Delete an additional service backup created in a region different from your primary backup
region. When you delete the additional cross-region backup, you still have the default
backup located in the primary, service-hosting region.

<Tabs groupId="btar-tools">
<TabItem value="cli" label="Aiven CLI" default>

Use the [avn service update](/docs/tools/cli/service-cli) command to remove all target
region names from the `additional_backup_regions` array.

```bash
avn service update SERVICE_NAME       \
    --project PROJECT_NAME            \
    -c additional_backup_regions='[]'
```

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to remove all target region names from the `additional_backup_regions` array.

```bash
curl --request PUT                                                              \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME     \
    --header 'Authorization: Bearer BEARER_TOKEN'                               \
    --header 'content-type: application/json'                                   \
    --data '{"user_config": {"additional_backup_regions": []}}'
```

</TabItem>
</Tabs>
