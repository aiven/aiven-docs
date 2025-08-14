---
title: Create and manage custom repositories in Aiven for OpenSearch®
sidebar_label: Manage custom repositories
limited: true
---
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure custom repositories in Aiven for OpenSearch to store [snapshots](/docs/products/opensearch/howto/manage-snapshots) in your cloud storage.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

- Custom repositories
  [enabled as a limited availability feature](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
- Running Aiven for OpenSearch service
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider

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
- To use the native OpenSearch
  [Register Snapshot Repository](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-repository/)
  endpoint:
  - [Storage credentials](/docs/products/opensearch/howto/snapshot-credentials)
  - Name of the [custom keystore](/docs/products/opensearch/howto/snapshot-credentials)

</TabItem>
<TabItem value="api" label="Aiven API">

- Custom repositories
  [enabled as a limited availability feature](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
- Running Aiven for OpenSearch service
- [Aiven API](/docs/tools/api) and authentication [token](/docs/platform/howto/create_authentication_token)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider

:::note

- Repository credentials are omitted from API responses for security reasons.
- Aiven API provides a direct interface to the OpenSearch snapshot API.

:::

</TabItem>
</Tabs>

## Limitations

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

You can configure custom repositories for the following object storage services:

- Amazon S3
- Google Cloud Storage (GCS)
- Microsoft Azure Blob Storage

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

- Supported storage services
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- The following operations are not supported via native OpenSearch API:
  - [Remove a repository](/docs/products/opensearch/howto/custom-repositories#remove-a-repository)
  - [Edit repository details](/docs/products/opensearch/howto/custom-repositories#view-or-edit-repository-details)
  - [List custom repositories](/docs/products/opensearch/howto/custom-repositories#list-custom-repositories)
- Using the native OpenSearch
  [Register Snapshot Repository](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-repository/)
  endpoint requires providing
  [storage credentials and the name of the custom keystore](/docs/products/opensearch/howto/snapshot-credentials).

</TabItem>
<TabItem value="api" label="Aiven API">

- Supported storage services
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- To
  [edit repository details](/docs/products/opensearch/howto/custom-repositories#view-or-edit-repository-details),
  you can only use the Aiven Console.
- The following operations are not supported via Aiven API:
  - [Remove a repository](/docs/products/opensearch/howto/custom-repositories#remove-a-repository)
  - [View or edit repository details](/docs/products/opensearch/howto/custom-repositories#view-or-edit-repository-details)

</TabItem>
</Tabs>

## Create custom repositories

Each repository requires a unique name, a storage type (such as S3, Azure, or GCS), and
the appropriate settings for the selected storage provider.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, click **Add repository**.
1. In the **Add custom repository** window:
   1. Enter a repository name.
   1. Select a storage provider.
   1. Give provider-specific details required for accessing the storage.
   1. Click **Add**.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

To create a repository, use the
[Register Snapshot Repository](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-repository/)
native OpenSearch API endpoint.

</TabItem>
<TabItem value="api" label="Aiven API">
Custom repositories are configured in the `user_config` of your Aiven for OpenSearch
service. Use the following API request to configure custom repositories:

```sh
curl -s --url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}" \
--header "Authorization: Bearer $TOKEN" \
--header "Content-Type: application/json" \
-X PUT -d '{
  "user_config": {
    "custom_repos": [
      {
        "name": "azure-repo",
        "type": "azure",
        "settings": {
          "account": "AZURE_ACCOUNT",
          "base_path": "your/path",
          "container": "AZURE_CONTAINER",
          "sas_token": "AZURE_SAS_TOKEN",
          "readonly": false
        }
      },
      {
        "name": "aws-repo",
        "type": "s3",
        "settings": {
          "access_key": "AWS_ACCESS_KEY",
          "secret_key": "AWS_SECRET_KEY",
          "base_path": "your/path",
          "bucket": "AWS_BUCKET",
          "region": "AWS_REGION",
          "server_side_encryption": true,
          "readonly": false
        }
      }
    ]
  }
}'
```

</TabItem>
</Tabs>

## List custom repositories

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.

Find your custom repositories listed on the **Snapshots** page.

</TabItem>
<TabItem value="api" label="Aiven API">
```sh
curl -s --url "https://api.aiven.io/v1/project/{project_name}/service/{service_name}/opensearch/_snapshot"\
--header "Authorization: Bearer $TOKEN" \
--header "Content-Type: application/json"
```

Example response:

```JSON
{
  "repositories": [
    {
      "name": "aws-repo",
      "settings": {
        "base_path": "test/path",
        "bucket": "testbucket",
        "endpoint": "http://s3.eu-north-1.amazonaws.com",
        "region": "eu-north-1",
        "server_side_encryption": true,
        "readonly": false
      },
      "type": "s3"
    },
    {
      "name": "azure-repo",
      "settings": {
        "base_path": "test/path",
        "container": "testcontainer",
        "readonly": false
      },
      "type": "azure"
    }
  ]
}
```

</TabItem>
</Tabs>

## View or edit repository details

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="editrepo"/>.
1. Edit repository details and save your changes by clicking **Update**.

</TabItem>
<TabItem value="os-api" label="OpenSearch API">

To view details on a repository, use the
[Get Snapshot Repository](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-repository/)
native OpenSearch API endpoint.

</TabItem>
</Tabs>

## Remove a repository

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="removerepo"/> > **Remove**.

## Error handling

The Aiven API returns OpenSearch errors as they are.

**Exceptions:**

- 502: OpenSearch did not respond.
- 409: The service is not powered on or does not support this feature.

<RelatedPages/>

[OpenSearch snapshot API reference](https://opensearch.org/docs/latest/api-reference/snapshots/index/).
