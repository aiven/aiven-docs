---
title: Create and manage custom repositories in Aiven for OpenSearch®
sidebar_label: Custom repositories
limited: true
---
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure custom repositories in Aiven for OpenSearch to store [snapshots](/docs/products/opensearch/howto/manage-snapshots) in your cloud storage.

## Supported storage services

You can configure custom repositories for the following object storage services:

- Amazon S3
- Google Cloud Storage (GCS)
- Microsoft Azure Blob Storage

## Prerequisites

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

- Running Aiven for OpenSearch service
- Access to the [Aiven Console](https://console.aiven.io/)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider

</TabItem>
<TabItem value="api" label="API">

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

## Configure custom repositories

Each repository requires a unique name, a storage type (such as S3, Azure, or GCS), and
the appropriate settings for the selected storage provider.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

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
<TabItem value="api" label="API">
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
<TabItem value="gui" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.

Find your custom repositories listed on the **Snapshots** page.

</TabItem>
<TabItem value="api" label="API">
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

## View repository details

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="viewrepo"/>.

## Edit repository details

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="editrepo"/>.
1. Edit repository details and save your changes.

## Disconnect from a repository

1. Log in to the [Aiven Console](https://console.aiven.io/), go to your project, and
   open your service's page.
1. Click <ConsoleLabel name="snapshots"/> in the sidebar.
1. On the **Snapshots** page, find your custom repository and click
   <ConsoleLabel name="actions"/> > <ConsoleLabel name="disconnect"/>.

## Error handling

The Aiven API returns OpenSearch errors as they are.

**Exceptions:**

- 502: OpenSearch did not respond.
- 409: The service is not powered on or does not support this feature.

<RelatedPages/>

[OpenSearch snapshot API reference](https://opensearch.org/docs/latest/api-reference/snapshots/index/).
