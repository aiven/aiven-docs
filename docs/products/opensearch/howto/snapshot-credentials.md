---
title: Store and manage snapshot repository credentials in Aiven for OpenSearch®
sidebar_label: Manage snapshot credentials
limited: true
---
import RelatedPages from "@site/src/components/RelatedPages";

Use `custom_keystores` in Aiven for OpenSearch® to store object storage credentials (AWS S3, GCS, or Azure).
You can then use these credentials when registering snapshot repositories through the
native OpenSearch API.

## Prerequisites

- A running Aiven for OpenSearch service
- [Aiven API](/docs/tools/api) access with a valid [authentication token](/docs/platform/howto/create_authentication_token)
- Credentials for one of the following supported storage services:
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage

## Limitations

- Up to 10 custom keystores are allowed per service.
- Each keystore name must be unique and must not conflict with names reserved by Aiven.
- Credentials are not validated when added. If invalid, OpenSearch returns an error at
  use time. For example, when registering a snapshot repository.
- Only supported via the native OpenSearch API.
- Not available in the Aiven Console.

## How it works

When you add a `custom_keystores` entry to your service's `user_config`, Aiven stores
the credentials on each Aiven for OpenSearch node using the
[OpenSearch keystore mechanism](https://docs.opensearch.org/docs/2.17/security/configuration/opensearch-keystore/).

Each credential is stored using the following format:

```text
<provider>.client.<keystore_name>.<key> = <value>
```

For example:

```text
s3.client.my-s3-keys.access_key = AKIA...
s3.client.my-s3-keys.secret_key = d6pD...
```

To use these credentials, specify the keystore name in the `client` field when registering
a snapshot repository using the OpenSearch API.

:::caution
Sensitive values (such as `secret_key`, `sas_token`, and `credentials`) are excluded
from API responses for security reasons.
:::

## Configure keystores

Custom keystores are configured in the `user_config` of your Aiven for OpenSearch
service. Use the following API request to store credentials:

```bash
curl -s --url "https://api.aiven.io/v1/project/<project_name>/service/<service_name>/update" \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  -X PUT -d '{
    "user_config": {
      "custom_keystores": [
        {
          "name": "my-s3-keys",
          "type": "s3",
          "settings": {
            "access_key": "<AWS_ACCESS_KEY>",
            "secret_key": "<AWS_SECRET_KEY>"
          }
        }
      ]
    }
  }'
```

## Register a repository using the OpenSearch API

After storing your credentials, use the
[OpenSearch snapshot API](https://opensearch.org/docs/latest/api-reference/snapshots/create-repository/)
to register a repository. Set the `client` field to the name of the
corresponding keystore.

```bash
curl -X PUT "https://<service_uri>/_snapshot/my-s3-repo" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3",
    "settings": {
      "bucket": "my-snapshot-bucket",
      "region": "eu-west-1",
      "base_path": "backups/opensearch",
      "client": "my-s3-keys"
    }
  }'
```

## Update or delete credentials

To update or remove stored credentials, modify the `custom_keystores` field using the
same API endpoint:

```bash
PUT https://api.aiven.io/v1/project/<project_name>/service/<service_name>/update
```

Send the updated `custom_keystores` array in the request body. Changes apply
automatically to all Aiven for OpenSearch® nodes.


## Example keystore configurations

Use the following examples to configure credentials for each supported storage provider.

### Azure with SAS token

```json
{
"name": "my-azure-keys",
"type": "azure",
"settings": {
  "account": "<AZURE_ACCOUNT>",
  "sas_token": "<AZURE_SAS_TOKEN>"
}
}
```

### Google Cloud Storage with service account credentials

```json
{
"name": "my-gcs-keys",
"type": "gcs",
"settings": {
  "credentials": {
  "type": "service_account",
  "project_id": "<PROJECT_ID>",
  "private_key_id": "<KEY_ID>",
  "private_key": "<PRIVATE_KEY>",
  "client_email": "<SERVICE_ACCOUNT_EMAIL>",
  "client_id": "<CLIENT_ID>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "<CERT_URL>"
  }
 }
}
```

### AWS S3

```json
{
"name": "my-s3-keys",
"type": "s3",
"settings": {
  "access_key": "<AWS_ACCESS_KEY>",
  "secret_key": "<AWS_SECRET_KEY>"
 }
}
```

<RelatedPages/>

- [Create and manage custom repositories](/docs/products/opensearch/howto/custom-repositories)
- [OpenSearch snapshot API](https://opensearch.org/docs/latest/api-reference/snapshots/index/)
- [OpenSearch keystore mechanism](https://docs.opensearch.org/docs/2.17/security/configuration/opensearch-keystore/)
