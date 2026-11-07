import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

For a project that has the backup to another region (BTAR) feature enabled, you can add or
change a secondary backup location, check the secondary backup status, monitor the
replication lag, fork and restore using the cross-region backup, or migrate to another
cloud or region.

BTAR is configured with the `additional_backup_regions` option in your service
configuration.

## Prerequisites

- At least one Aiven service in a project with BTAR enabled
- One of the following: the [Aiven Console](https://console.aiven.io/), the
  [Aiven CLI](/docs/tools/cli), the [Aiven API](/docs/tools/api), the
  [Aiven Provider for Terraform](/docs/tools/terraform), or the
  [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Add a secondary backup location

<Tabs groupId="btar-tools">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your project.
1. Go to <ConsoleLabel name="Services"/>, then select the Aiven service on which you'd
   like to enable BTAR.
1. On your service page, {props.backupsNav || <>click <ConsoleLabel name="backups"/></>}.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> >
   **Add secondary backup location**.
1. In the **Add secondary backup location** window, turn on
   **Secondary backup location enabled**.
1. Use the **Backup location** menu to select a region for your secondary backup.
1. Click **Save**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Use the [avn service update](/docs/tools/cli/service-cli) command to set
`additional_backup_regions` to the region you want to hold the secondary backup.

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
endpoint to set `additional_backup_regions` in the service configuration.

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
<TabItem value="terraform" label="Terraform">

Set `additional_backup_regions` in the service's user configuration block. The example
uses Aiven for PostgreSQL®; for other services, use that service's resource and user
configuration block.

```hcl
resource "aiven_pg" "example" {
  project      = var.project_name
  service_name = "example-service"
  cloud_name   = "google-europe-west1"
  plan         = "business-4"

  pg_user_config {
    additional_backup_regions = ["google-europe-north1"]
  }
}
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Set `additional_backup_regions` under `spec.userConfig`. The example uses the `PostgreSQL`
kind; for other services, use that service's kind.

```yaml
apiVersion: aiven.io/v1alpha1
kind: PostgreSQL
metadata:
  name: example-service
spec:
  project: PROJECT_NAME
  cloudName: google-europe-west1
  plan: business-4
  userConfig:
    additional_backup_regions:
      - google-europe-north1
```

</TabItem>
</Tabs>

Aiven provisions storage in the region you selected and starts replicating backup files
to it. Until the first backup finishes replicating, you cannot fork your service from the
secondary backup.

## Change a backup region

Repeat [Add a secondary backup location](#add-a-secondary-backup-location) and select a
different region. In the Aiven Console, the action is called **Edit secondary backup
location** once the service already has a secondary location.

:::important
Changing the secondary backup region starts a new base backup. You can fork your service
from the new region only after that backup finishes.
:::

## Monitor a service with BTAR

There are a few things you may want to check for your Aiven service in the context of
BTAR:

- What is the status of a secondary backup?

  - Does your service have a backup in another region?
  - What is the target region of the secondary backup?

- What is the replication lag between data availability in the primary region and the
  secondary region?

### Check BTAR status

<Tabs groupId="btar-tools">
<TabItem value="gui" label="Aiven Console" default>

To see the availability, the status, and the target region of a secondary (BTAR)
backup, go to your service page > <ConsoleLabel name="backups"/> >
**Secondary backup location**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run [avn service get](/docs/tools/cli/service-cli) and read
`user_config.additional_backup_regions`. The field lists the region holding the secondary
backup. If the service has no secondary backup, the field is not set.

```bash
avn service get SERVICE_NAME --project PROJECT_NAME --json
```

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceGet](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) endpoint
and read `user_config.additional_backup_regions` in the response. The field lists the
region holding the secondary backup. If the service has no secondary backup, the field is
not set.

```bash
curl --request GET                                                              \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME     \
    --header 'Authorization: Bearer BEARER_TOKEN'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Read the attribute from the Terraform state.

```bash
terraform state show aiven_pg.example
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Read the field from the service manifest.

```bash
kubectl get postgresql example-service \
    -o jsonpath='{.spec.userConfig.additional_backup_regions}'
```

</TabItem>
</Tabs>

### Determine replication lag

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
<TabItem value="gui" label="Aiven Console" default>

1. Open the [Aiven Console](https://console.aiven.io/) and go to your service
   homepage.
1. Click <ConsoleLabel name="backups"/>.
1. On the **Backups** page, click **Fork service**.
1. In the **New database fork** window:

   1. Set **Backup location** to either **Primary location** or **Secondary location**.
   1. Set **Backup version** to one of the following:

      - **Latest transaction**
      - **Point in time**: Set it up to no earlier than the time of taking the oldest
        replicated base backup.

   1. Specify a name for the new fork service.
   1. Select **Create fork**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

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
<TabItem value="terraform" label="Terraform">

Create a new service in the secondary backup region, with `service_to_fork_from` and
`recovery_target_time` set in its user configuration block. Set `recovery_target_time` to
no earlier than the time of taking the oldest replicated base backup. The example uses
Aiven for PostgreSQL®; for other services, use that service's resource and user
configuration block.

```hcl
resource "aiven_pg" "fork" {
  project      = var.project_name
  service_name = "example-fork"
  cloud_name   = "google-europe-north1"
  plan         = "business-4"

  pg_user_config {
    service_to_fork_from = "example-service"
    recovery_target_time = "2026-11-04T10:00:00+00:00"
  }
}
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Create a new service in the secondary backup region, with `service_to_fork_from` and
`recovery_target_time` set under `spec.userConfig`. Set `recovery_target_time` to no
earlier than the time of taking the oldest replicated base backup. The example uses the
`PostgreSQL` kind; for other services, use that service's kind.

```yaml
apiVersion: aiven.io/v1alpha1
kind: PostgreSQL
metadata:
  name: example-fork
spec:
  project: PROJECT_NAME
  cloudName: google-europe-north1
  plan: business-4
  userConfig:
    service_to_fork_from: example-service
    recovery_target_time: "2026-11-04T10:00:00+00:00"
```

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
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. From the **Services** view, select an Aiven service on which you'd like to disable BTAR.
1. On your service's page, {props.backupsNav || <>click <ConsoleLabel name="backups"/></>}.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> >
   **Edit secondary backup location**.
1. In the **Edit secondary backup location** window, turn off
   **Secondary backup location enabled**.
1. Click **Save**.

Your additional service backup is no longer visible on your service's **Backups** page in
the **Secondary backup location** column.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To remove secondary backups for your service, use the
[avn service update](/docs/tools/cli/service-cli) command to remove all target region names
from the `additional_backup_regions` array.

```bash
avn service update SERVICE_NAME       \
    --project PROJECT_NAME            \
    -c additional_backup_regions='[]'
```

</TabItem>
<TabItem value="api" label="Aiven API">

To remove secondary backups for your service, update the service configuration. Use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint
to remove all target regions names from the `additional_backup_regions` array.

```bash
curl --request PUT                                                              \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME     \
    --header 'Authorization: Bearer BEARER_TOKEN'                               \
    --header 'content-type: application/json'                                   \
    --data '{"user_config": {"additional_backup_regions": []}}'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Set `additional_backup_regions` to an empty list, then apply the change.

```hcl
  pg_user_config {
    additional_backup_regions = []
  }
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Set `additional_backup_regions` to an empty list, then apply the manifest.

```yaml
spec:
  userConfig:
    additional_backup_regions: []
```

</TabItem>
</Tabs>
