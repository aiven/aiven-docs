---
title: Create and manage custom repositories in Aiven for OpenSearch®
sidebar_label: Custom repositories
limited: true
---
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for OpenSearch lets you configure custom repositories to store snapshots in your cloud storage.

## Supported storage services

You can configure custom repositories for the following object storage services:

- Amazon S3
- Google Cloud Storage (GCS)
- Microsoft Azure Blob Storage

## Prerequisites

- An active Aiven for OpenSearch service
- An Aiven authentication [token](/docs/platform/howto/create_authentication_token)
- Access to a supported object storage service (AWS S3, GCS, or Azure)
- Credentials for the selected storage provider

## Limitations

- The Aiven API does not support automatic snapshot scheduling. You must create
  snapshots manually.
- Repository credentials are omitted from API responses for security reasons.

## Configure custom repositories

Custom repositories are configured in the `user_config` of your Aiven for OpenSearch
service. Each repository requires a unique name, a storage type (such as S3, Azure, or
GCS), and the appropriate settings for the selected storage provider. Use the following
API request to configure custom repositories:

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

## Manage custom repositories

After configuring custom repositories, you can manage them using the Aiven API, which
provides a direct interface to the OpenSearch snapshot API.

### List custom repositories

Use the Aiven API to retrieve a list of custom repositories:

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

## Manage snapshots in custom repositories

After setting up a custom repository, you can use the Aiven API to create, list,
retrieve, and delete snapshots.

### Create a snapshot

Create a snapshot in a custom repository.

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

### List snapshots in progress

Retrieve snapshots that are still being created in a repository.

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

### List all snapshots in a repository

Retrieve all snapshots, including completed and failed ones.

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

### Retrieve a snapshot summary

Get details of a specific snapshot.

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

### Delete a snapshot

Delete a snapshot from a repository.

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

## Error handling

If an error occurs (such as `429`, `500`, or `503`), the Aiven API response includes the
original OpenSearch error details in the `metadata` field of the response.

<RelatedPages/>

[OpenSearch snapshot API reference](https://opensearch.org/docs/latest/api-reference/snapshots/index/).
