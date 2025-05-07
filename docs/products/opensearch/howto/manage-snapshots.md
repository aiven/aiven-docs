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
<TabItem value="gui" label="Console" default>

- Running Aiven for OpenSearch service
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider
- Configured [custom repository](/docs/products/opensearch/howto/custom-repositories)

</TabItem>
<TabItem value="api" label="API">

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

## Create a snapshot

Create a snapshot in a custom repository.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, click **Create snapshot**.
1. In the **Create snapshot** window:
   1. Select a snapshot version.
   1. Specify which indices to include or exclude using by providing patterns.
   1. Select a destination repository.
   1. Click **Create**.

Your snapshot is being created. Monitor its status until it shows **Success**.

</TabItem>
<TabItem value="api" label="API">

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

## List snapshots in progress

Preview snapshots that are still being created in a repository.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside.
1. In the column with snapshot status information, find **in progress** values.

</TabItem>
<TabItem value="api" label="API">

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
<TabItem value="gui" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside.

</TabItem>
<TabItem value="api" label="API">

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
<TabItem value="gui" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository, click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside, find a snapshot
   to be previewed, and click <ConsoleLabel name="actions"/> > <ConsoleLabel name="viewsnapshot"/>.

</TabItem>
<TabItem value="api" label="API">

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
<TabItem value="gui" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository, click
   <ConsoleLabel name="downarrow"/> to expand the list of snapshots inside, find a snapshot
   to be deleted, click <ConsoleLabel name="actions"/> >
   <ConsoleLabel name="deletesnapshot"/> > **Delete**.

</TabItem>
<TabItem value="api" label="API">

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
