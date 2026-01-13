---
title: Store and manage snapshot repository credentials in Aiven for OpenSearch®
sidebar_label: Manage snapshot credentials
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Use `custom_keystores` in Aiven for OpenSearch® to store object storage credentials in Amazon S3, Google Cloud Storage, or Azure.
You can then use these credentials when registering snapshot repositories through the
native OpenSearch API.

## Prerequisites

- A running Aiven for OpenSearch service
- [Aiven API](/docs/tools/api) access with a valid [authentication token](/docs/platform/howto/create_authentication_token)
- Credentials for one of the following supported storage services:
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- [Security management enabled](/docs/products/opensearch/howto/enable-opensearch-security)
  for your OpenSearch service, with the `os-sec-admin` password set
- OpenSearch snapshot API [enabled](#enable-the-snapshot-api)
- OpenSearch user with [permissions](https://docs.opensearch.org/docs/2.19/security/access-control/permissions/#snapshot-repository-permissions)
  to modify snapshot repositories

  :::note
  To create, restore, or delete snapshots using the registered repositories,
  assign additional
  [snapshot permissions](https://docs.opensearch.org/docs/2.19/security/access-control/permissions/#snapshot-permissions)
  to the OpenSearch user.
  :::

## Limitations

- Up to 10 custom keystores are allowed per service.
- Each keystore name must be unique and must not conflict with names reserved by Aiven.
- Credentials are not validated when added. If the credentials are invalid, OpenSearch
  returns an error when you use them, such as when registering a snapshot repository.
- Only supported via the native OpenSearch API.
- Not available in the Aiven Console.

## How it works

When you add a `custom_keystores` entry to your service's `user_config`, Aiven stores
the credentials on each Aiven for OpenSearch node using the
[OpenSearch keystore mechanism](https://docs.opensearch.org/docs/2.17/security/configuration/opensearch-keystore/).

Each credential is stored using the following format:

```text
PROVIDER.client.KEYSTORE_NAME.KEY = VALUE
```

For example:

```text
s3.client.MY_S3_KEYS.access_key = AKIA...
s3.client.MY_S3_KEYS.secret_key = d6pD...
```

To use these credentials, specify the keystore name in the `client` field when registering
a snapshot repository using the OpenSearch API.

:::caution
Sensitive values (such as `secret_key`, `sas_token`, and `credentials`) are excluded
from API responses for security reasons.
:::

## Enable the snapshot API

By default, the snapshot API is disabled. You can enable it using the Aiven Console or
Aiven CLI.


<Tabs>
<TabItem value="console" label="Console" default>

1. Access your Aiven for OpenSearch service in the [Aiven Console](https://console.aiven.io/).
1. Click <ConsoleLabel name="service settings"/> in the sidebar.
1. Scroll to the **Advanced configuration** section and click **Configure**.
1. In the **Advanced configuration** window, click **Add configuration option**.
1. Use the search bar to find `opensearch.enable_snapshot_api`, and set it to **Enable**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update SERVICE_NAME --project PROJECT_NAME -c opensearch.enable_snapshot_api=true
```

Replace `SERVICE_NAME` and `PROJECT_NAME` with your own values.

</TabItem>
</Tabs>

## Configure keystores

Custom keystores are configured in the `user_config` of your Aiven for OpenSearch
service. Use the following API request to store credentials:

```bash
curl -s --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/update" \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  -X PUT -d '{
    "user_config": {
      "custom_keystores": [
        {
          "name": "MY_S3_KEYS",
          "type": "s3",
          "settings": {
            "access_key": "AWS_ACCESS_KEY",
            "secret_key": "AWS_SECRET_KEY"
          }
        }
      ]
    }
  }'

```

Replace each placeholder with the appropriate value for your environment.

## Register a repository using the OpenSearch API

After storing your credentials, use the
[OpenSearch snapshot API](https://opensearch.org/docs/latest/api-reference/snapshots/create-repository/)
to register a repository. Set the `client` field to the name of the
corresponding keystore.

```bash
curl -X PUT "https://SERVICE_URI/_snapshot/MY_S3_REPO" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "s3",
    "settings": {
      "bucket": "SNAPSHOT_BUCKET",
      "region": "AWS_REGION",
      "base_path": "backups/opensearch",
      "client": "MY_S3_KEYS"
    }
  }'

```

## Update or delete credentials

To update or remove stored credentials, modify the `custom_keystores` field using the
same API endpoint:

```bash
PUT https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/update
```

Add the updated `custom_keystores` list to the request body and send the API request.
The changes are applied automatically to all Aiven for OpenSearch nodes.

## Example keystore configurations

Use the following examples to configure credentials for each supported storage provider.

### Azure with SAS token

```json
{
  "name": "MY_AZURE_KEYS",
  "type": "azure",
  "settings": {
    "account": "AZURE_ACCOUNT",
    "sas_token": "AZURE_SAS_TOKEN"
  }
}

}
```

### Google Cloud Storage with service account credentials

```json
{
  "name": "MY_GCS_KEYS",
  "type": "gcs",
  "settings": {
    "credentials": {
      "type": "service_account",
      "project_id": "PROJECT_ID",
      "private_key_id": "KEY_ID",
      "private_key": "PRIVATE_KEY",
      "client_email": "SERVICE_ACCOUNT_EMAIL",
      "client_id": "CLIENT_ID",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "CERT_URL"
    }
  }
}

```

### AWS S3

```json
{
  "name": "MY_S3_KEYS",
  "type": "s3",
  "settings": {
    "access_key": "AWS_ACCESS_KEY",
    "secret_key": "AWS_SECRET_KEY"
  }
}

```

<RelatedPages/>

- [Create and manage custom repositories](/docs/products/opensearch/howto/custom-repositories)
- [OpenSearch snapshot API](https://opensearch.org/docs/latest/api-reference/snapshots/index/)
- [OpenSearch keystore mechanism](https://docs.opensearch.org/docs/2.17/security/configuration/opensearch-keystore/)
