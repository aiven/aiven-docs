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

- Supported storage services are:
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- [Restoring from snapshots](/docs/products/opensearch/howto/manage-snapshots#restore-from-snapshots)
  is not supported in the Aiven Console.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

- Supported storage services are:
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- The following operations are not supported via native OpenSearch API:
  - [List snapshots in progress](/docs/products/opensearch/howto/manage-snapshots#list-snapshots-in-progress)
  - [List snapshots in a repository](http://localhost:3000/docs/products/opensearch/howto/manage-snapshots#list-snapshots-in-a-repository)
- [Restore from snapshot](/docs/products/opensearch/howto/manage-snapshots#restore-from-snapshots)
  has a couple of
  [security-related restrictions](https://docs.opensearch.org/docs/2.19/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/#security-considerations).
- [Create a snapshot](/docs/products/opensearch/howto/manage-snapshots#create-a-snapshot)
  and
  [delete a snapshot](/docs/products/opensearch/howto/manage-snapshots#delete-a-snapshot)
  are not supported for snapshots in Aiven-managed repositories (prefixed with `aiven_repo`).

</TabItem>
<TabItem value="api" label="Aiven API">

- Supported storage services are:
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- [Restoring from snapshots](/docs/products/opensearch/howto/manage-snapshots#restore-from-snapshots)
  is not supported in the Aiven API.

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
--url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot/aws-repo/first-snapshot" \
--header "Authorization: Bearer $TOKEN" \
--header "Content-Type: application/json" \
-d '{"indices": "test*", "include_global_state": false}'
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

To restore data from a snapshot, use the
[Restore Snapshot](https://docs.opensearch.org/docs/latest/api-reference/snapshots/restore-snapshot/)
native OpenSearch API endpoint.

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
