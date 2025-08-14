---
title: Create and manage snapshots in Aiven for OpenSearch®
sidebar_label: Manage snapshots
limited: true
---
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create, list, retrieve, or delete snapshots in your Aiven for OpenSearch [custom repositories](/docs/products/opensearch/howto/custom-repositories).

## Prerequisites

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

- Custom repositories
  [enabled as a limited availability feature](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
- Running Aiven for OpenSearch service
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider
- Configured [custom repository](/docs/products/opensearch/howto/custom-repositories)

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

- Custom repositories
  [enabled as a limited availability feature](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
- [Maintenance updates](/docs/platform/concepts/maintenance-window#maintenance-updates)
  applied for your service
- [Security management enabled](/docs/products/opensearch/howto/enable-opensearch-security)
  for your service
- [Snapshot permissions](https://docs.opensearch.org/docs/latest/security/access-control/permissions/#snapshot-permissions)
  and
  [snapshot repository permissions](https://docs.opensearch.org/docs/latest/security/access-control/permissions/#snapshot-repository-permissions)
  configured

</TabItem>
<TabItem value="api" label="Aiven API">

- Custom repositories
  [enabled as a limited availability feature](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
- Running Aiven for OpenSearch service
- [Aiven API](/docs/tools/api) and authentication [token](/docs/platform/howto/create_authentication_token)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider
- Configured [custom repository](/docs/products/opensearch/howto/custom-repositories)

</TabItem>
</Tabs>

:::important
Automatic snapshot scheduling is not supported. You must create, list, and delete snapshots
manually.
:::

## Limitations

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

Supported storage services are:
- Amazon S3
- Google Cloud Storage (GCS)
- Microsoft Azure Blob Storage

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

- Supported storage services are:
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- The following operations are not supported via native OpenSearch API:
  - [List snapshots in progress](/docs/products/opensearch/howto/manage-snapshots#list-snapshots-in-progress)
  - [List snapshots in a repository](/docs/products/opensearch/howto/manage-snapshots#list-snapshots-in-a-repository)
- [Restore from snapshot](/docs/products/opensearch/howto/manage-snapshots#restore-from-snapshots)
  has a couple of
  [security-related restrictions](https://docs.opensearch.org/docs/2.19/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/#security-considerations).
- [Create a snapshot](/docs/products/opensearch/howto/manage-snapshots#create-a-snapshot)
  and
  [delete a snapshot](/docs/products/opensearch/howto/manage-snapshots#delete-a-snapshot)
  are not supported for snapshots in Aiven-managed repositories (prefixed with `aiven_repo`).

</TabItem>
<TabItem value="api" label="Aiven API">

Supported storage services are:
- Amazon S3
- Google Cloud Storage (GCS)
- Microsoft Azure Blob Storage

</TabItem>
</Tabs>

## Create a snapshot

Create a snapshot in a custom repository.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, do one of the following:
   - Click **Create snapshot**.
   - Find your custom repository and click <ConsoleLabel name="actions"/> >
     <ConsoleLabel name="createsnapshot"/>.
1. In the **Create snapshot** window:
   1. Select a destination repository.
   1. Enter a snapshot name.
   1. Specify which indices to include.
   1. Optionally, enable the following:
      - **Ignore unavailable indices**
      - **Include global state**
      - **Partial snapshot**
   1. Click **Create**.

Your snapshot is being created. Monitor its status until it shows **Success**.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

Use the
[Create Snapshot](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-snapshot/)
native OpenSearch API endpoint.

</TabItem>
<TabItem value="api" label="Aiven API">

```sh
curl -s -X POST \
--url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/{repository_name}/{snapshot_name}/_restore" \
--header "Authorization: Bearer $TOKEN" \
--header "Content-Type: application/json" \
-d '{"indices": "test*"}'
```

Example response:

```json
{
  "accepted": true
}
```

</TabItem>
</Tabs>

## Restore from snapshots

:::important
Refrain from actions such as updating firewalls, changing index settings, or modifying
security configurations during the restore process as it can cause restore failures.
:::

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console">

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside.
1. Find the snapshot to restore and click <ConsoleLabel name="actions"/> >
   <ConsoleLabel name="restorefromsnapshot"/>.
1. In the **Restore snapshot** window:

   1. Check the **I understand the effects of this action** box.
   1. In the **Indices** field, enter patterns to include or exclude indices to be closed
      during snapshot restore.
   1. Toggle **Use advanced configurations** to set the following:

      - Rename pattern: a regular expression that matches the original index name from the
        snapshot
      - Rename replacement: a string that replaces the matched part of the index name
      - Ignore unavailable
      - Include global state

   1. Click **Continue**.

      This triggers the closing of the selected indices. Wait for **Indices closed** to be
      displayed.

   1. Click **Start restore**.

      This triggers the restoration process. Its length depends on the snapshot size.

   1. Shut down the **Restore snapshot** window by clicking **Close** either during the
      restore process or when it completes.

      :::tip
      If you close the **Restore snapshot** window before the restore process is complete,
      you can check its status on the **Snapshots** page.
      :::

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

To restore data from a snapshot, use the
[Restore Snapshot](https://docs.opensearch.org/docs/latest/api-reference/snapshots/restore-snapshot/)
native OpenSearch API endpoint.

</TabItem>
<TabItem value="api" label="Aiven API" default>

```sh
curl -s -X POST \
"https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/{repository_name}/{snapshot_name}/_restore" \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "indices": "test-index-*",
  "include_global_state": true,
  "ignore_unavailable": false,
  "rename_pattern": "index_(.+)",
  "rename_replacement": "restored_index_$1"
}'
```

Example response:

```json
{
  "accepted": true
}
```

</TabItem>
</Tabs>

## List snapshots in progress

Preview snapshots that are still being created in a repository.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside.
1. In the column with snapshot status information, find **in progress** values.

</TabItem>
<TabItem value="api" label="Aiven API">

```sh
curl -s --url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/aws-repo/_status" \
--header "Authorization: Bearer $TOKEN"
--header "Content-Type: application/json"
```

Example response:

```json
{
  "snapshots": [
    {
      "repository": "aws-repo",
      "snapshot": "second-snapshot",
      "state": "SUCCESS",
      "shards_stats": {
        "done": 1,
        "failed": 0,
        "total": 1
      },
      "uuid": "osmCbdF-RMyyUKpWD-4bJA"
    }
  ]
}
```

</TabItem>
</Tabs>

## List snapshots in a repository

Preview all snapshots, including completed and failed ones.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

Use native OpenSearch API endpoint `GET /_snapshot/REPOSITORY_NAME/_all`, replacing the
`REPOSITORY_NAME` with the actual name of your repository.

Example response:

```json
{
  "snapshots" : [
    {
      "snapshot" : "opensearch-123qaz456wsx789edc123q-infrequent",
      "uuid" : "-abCabCabC-abCabCabCab",
      "version_id" : 123456789,
      "version" : "N.NN.N",
      "remote_store_index_shallow_copy" : false,
      "indices" : [
        ".plugins-ml-config",
        ".opensearch-sap-log-types-config",
        ".kibana_N",
        ".opensearch-observability"
      ],
      "data_streams" : [ ],
      "include_global_state" : true,
      "state" : "SUCCESS",
      "start_time" : "YYY-MM-DDTHH:MM:SS.619Z",
      "start_time_in_millis" : 1234567891234,
      "end_time" : "YYY-MM-DDTHH:MM:SS.624Z",
      "end_time_in_millis" : 1234567891234,
      "duration_in_millis" : 1234,
      "failures" : [ ],
      "shards" : {
        "total" : 4,
        "failed" : 0,
        "successful" : 4
      }
    },
    {
      "snapshot" : "opensearch-123qaz456wsx789edc123q-frequent",
      "uuid" : "-abCabCabC-abCabCabCab",
      "version_id" : 123456789,
      "version" : "N.NN.N",
      "remote_store_index_shallow_copy" : false,
      "indices" : [
        ".plugins-ml-config",
        ".opensearch-sap-log-types-config",
        ".kibana_N",
        ".opensearch-observability"
      ],
      "data_streams" : [ ],
      "include_global_state" : true,
      "state" : "SUCCESS",
      "start_time" : "YYY-MM-DDTHH:MM:SS.219Z",
      "start_time_in_millis" : 12345678912345,
      "end_time" : "YYY-MM-DDTHH:MM:SS.220Z",
      "end_time_in_millis" : 1234567891234,
      "duration_in_millis" : 1234,
      "failures" : [ ],
      "shards" : {
        "total" : 4,
        "failed" : 0,
        "successful" : 4
      }
    },
    {
      "snapshot" : "opensearch-123qaz456wsx789edc123q-frequent",
      "uuid" : "-abCabCabC-abCabCabCabQ",
      "version_id" : 123456789,
      "version" : "N.NN.N",
      "remote_store_index_shallow_copy" : false,
      "indices" : [
        ".plugins-ml-config",
        ".opensearch-sap-log-types-config",
        ".kibana_N",
        ".opensearch-observability"
      ],
      "data_streams" : [ ],
      "include_global_state" : true,
      "state" : "SUCCESS",
      "start_time" : "YYY-MM-DDTHH:MM:SS.088Z",
      "start_time_in_millis" : 12345678912345,
      "end_time" : "YYY-MM-DDTHH:MM:SS.890Z",
      "end_time_in_millis" : 1234567891234,
      "duration_in_millis" : 1234,
      "failures" : [ ],
      "shards" : {
        "total" : 4,
        "failed" : 0,
        "successful" : 4
      }
    }
  ]
}
```

</TabItem>
<TabItem value="api" label="Aiven API">

```sh
curl -s --url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/aws-repo/_all" \
--header "Authorization: Bearer $TOKEN"
--header "Content-Type: application/json"
```

Example response:

```json
{
  "snapshots": [
    {
      "snapshot": "first-snapshot",
      "state": "SUCCESS",
      "indices": ["test"],
      "uuid": "7cdWedW7RC6FMSktlZTCDw"
    },
    {
      "snapshot": "second-snapshot",
      "state": "SUCCESS",
      "indices": ["test"],
      "uuid": "osmCbdF-RMyyUKpWD-4bJA"
    }
  ]
}
```

</TabItem>
</Tabs>

## View snapshot details

Get details of a specific snapshot.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository, click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside, find a snapshot
   to be previewed, and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="viewsnapshot"/>.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

Use the native OpenSearch API endpoints:
[Get Snapshot](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot/)
or
[Get Snapshot Status](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-status/).

</TabItem>
<TabItem value="api" label="Aiven API">

```sh
curl -s --url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/aws-repo/first-snapshot" \
--header "Authorization: Bearer $TOKEN"
--header "Content-Type: application/json"
```

Example response:

```json
{
  "snapshots": [
    {
      "snapshot": "first-snapshot",
      "state": "SUCCESS",
      "indices": ["test"],
      "uuid": "7cdWedW7RC6FMSktlZTCDw"
    }
  ]
}
```

</TabItem>
</Tabs>

## Delete a snapshot

Delete a snapshot from a repository.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository, click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside, find a snapshot
   to be deleted, click <ConsoleLabel name="actions"/> >
   <ConsoleLabel name="deletesnapshot"/> > **Delete**.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

Use the
[Delete Snapshot](https://docs.opensearch.org/docs/latest/api-reference/snapshots/delete-snapshot/)
native OpenSearch API endpoint.

</TabItem>
<TabItem value="api" label="Aiven API">

```sh
curl -s -X DELETE \
--url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/aws-repo/first-snapshot" \
--header "Authorization: Bearer $TOKEN"
--header "Content-Type: application/json"
```

Example response:

```json
{
  "acknowledged": true
}
```

</TabItem>
</Tabs>

## Error handling

The Aiven API returns OpenSearch errors as they are.

**Exceptions:**

- 502: OpenSearch did not respond.
- 409: The service is not powered on or does not support this feature.

<RelatedPages/>

[OpenSearch snapshot API reference](https://opensearch.org/docs/latest/api-reference/snapshots/index/).
