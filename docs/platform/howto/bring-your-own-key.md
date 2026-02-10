---
title: Bring your own key (BYOK)
sidebar_label: Bring your own key
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Register, list, update, or delete your customer managed keys (CMKs) in Aiven projects using the [Aiven API](/docs/tools/api) or the [Aiven CLI](/docs/tools/cli).

:::important
Bring your own key (BYOK) is a
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
feature.
[Contact Aiven](https://aiven.io/contact) to request access.
:::

## Prerequisites

- **Key management service** (KMS) that supports asymmetric RSA 2048 or RSA 4096
  keys in Google Cloud, Oracle Cloud Infrastructure (OCI), Amazon Web Services (AWS),
  or Microsoft Azure

- [**Authentication token**](/docs/platform/howto/create_authentication_token) to use
  the [Aiven API](/docs/tools/api)

- [**Aiven CLI**](/docs/tools/cli) installed and configured (for CLI instructions)

## List CMK accessors

List customer managed key (CMK) accessors - principals that need to be granted access to
perform encrypt/decrypt operations on your behalf.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

### API endpoint

`GET /v1/project/PROJECT_ID/secrets/cmks/accessors`

### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |

### Sample request

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks/accessors \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

### Sample response

A successful request returns a `200 OK` status code and a JSON object with the accessors
for each provider, for example:

```json
{
  "accessors": {
    "gcp": {
      "access_group": "access.example.12345678-1234-1234-1234-123456789abc@aiven.io"
    }
  }
}
```

:::note
For Google Cloud Key Management Service keys, grant the group in the `access_group`
parameter the `roles/cloudkms.cryptoOperator` role.
:::

</TabItem>
<TabItem value="cli" label="CLI">

### Command

```bash
avn project cmks accessors --project PROJECT_NAME
```

### Parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `--project`  | String | True     | Project name |
| `--json`     | Flag   | False    | Output in JSON format |

### Sample request

```bash
avn project cmks accessors --project my-project
```

### Sample output

```
PROVIDER  DETAILS
========  =======
gcp       access_group  access.example.12345678-1234-1234-1234-123456789abc@aiven.io
```

For JSON output:

```bash
avn project cmks accessors --project my-project --json
```

:::note
For Google Cloud Key Management Service keys, grant the group in the `access_group`
parameter the `roles/cloudkms.cryptoOperator` role.
:::

</TabItem>
</Tabs>

## Manage a project CMK

Use the Aiven API or Aiven CLI to manage customer managed keys (CMKs) for encrypting
service data.

### Register CMK resource identifier

Register a customer managed key resource identifier for an Aiven project.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`POST /v1/project/PROJECT_ID/secrets/cmks`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |

#### Request body parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `provider`   | String | True     | Cloud provider hosting the KMS: `aws`, `gcp`, `azure`, or `oci` |
| `resource`| String | True     | CMK reference (key identifier of max 512 characters: AWS ARN, OCI OCID, Google Cloud resource name, or Azure key identifier) |
| `default_cmk` | Boolean | False | Mark this key as default for new service creation |

#### Sample request (AWS)

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "provider": "aws",
        "resource": "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234",
        "default_cmk": true
      }'
```

#### Sample response (AWS)

A successful request returns a `201 CREATED` status code and a JSON object representing the
newly registered CMK configuration, for example:

```json
{
  "cmk": {
    "id": "12345678-1234-1234-1234-12345678abcd",
    "provider": "aws",
    "default_cmk": true,
    "resource": "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

#### Response fields

| Parameter | Description |
|-----------|-------------|
| `id` | Identifier of the specific key |
| `provider` | Provider type, one of `gcp`, `aws`, `azure`, or `oci` |
| `resource` | CMK reference |
| `status` | One of `current`, `old`, or `deleted` |
| `default_cmk` | Whether this CMK has been marked default for new services |
| `created_at` | CMK creation timestamp |
| `updated_at` | CMK update timestamp |

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn project cmks create --project PROJECT_NAME --provider PROVIDER --resource RESOURCE
```

#### Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `--project`   | String | True     | Project name |
| `--provider`   | String | True     | Cloud provider hosting the KMS: `aws`, `gcp`, `oci`, or `azure` |
| `--resource`| String | True     | CMK reference (key identifier: AWS ARN, OCI OCID, Google Cloud resource name, or Azure key identifier) |
| `--default-cmk` | Flag | False | Mark this key as default for new service creation |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request (AWS)

```bash
avn project cmks create \
  --project my-project \
  --provider aws \
  --resource "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234" \
  --default-cmk
```

#### Sample output (AWS)

Table format:

```
property      value
============  ================================================
id            12345678-1234-1234-1234-12345678abcd
provider      aws
default_cmk   True
resource      arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234
status        current
created_at    YYYY-MM-DDTHH:MM:SSZ
updated_at    YYYY-MM-DDTHH:MM:SSZ
```

For JSON output, use `--json` flag.

</TabItem>
</Tabs>

### Update CMK

Update attributes or parameters on an existing customer managed key configuration.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`POST /v1/project/PROJECT_ID/secrets/cmks/CMK_ID`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |
| `CMK_ID`     | String | True     | CMK identifier |

#### Request body parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `default_cmk` | Boolean | False | Mark a specific key as default for new service creation |

#### Sample request

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks/CMK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "default_cmk": false
      }'
```

#### Sample response

A successful request returns a `200 OK` status code and a JSON object representing the
updated CMK configuration, for example:

```json
{
  "cmk": {
    "id": "12345678-1234-1234-1234-12345678abcd",
    "provider": "gcp",
    "default_cmk": false,
    "resource": "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

#### Response fields

| Parameter | Description |
|-----------|-------------|
| `id` | Identifier of the specific key |
| `provider` | Provider type, one of `gcp`, `aws`, `azure`, or `oci` |
| `resource` | CMK reference |
| `status` | One of `current`, `old`, or `deleted` |
| `default_cmk` | Whether this CMK has been marked default for new services |
| `created_at` | CMK creation timestamp |
| `updated_at` | CMK update timestamp |

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn project cmks update --project PROJECT_NAME --cmk-id CMK_ID --default-cmk true
```

#### Parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `--project`  | String | True     | Project name |
| `--cmk-id`   | String | True     | CMK identifier |
| `--default-cmk` | String | False | Mark a specific key as default for new service creation: `true` or `false` |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request

```bash
avn project cmks update \
  --project my-project \
  --cmk-id 12345678-1234-1234-1234-12345678abcd \
  --default-cmk false
```

#### Sample output

Table format:

```
property      value
============  ================================================
id            12345678-1234-1234-1234-12345678abcd
provider      gcp
default_cmk   False
resource      projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key
status        current
created_at    YYYY-MM-DDTHH:MM:SSZ
updated_at    YYYY-MM-DDTHH:MM:SSZ
```

For JSON output, use `--json` flag.

</TabItem>
</Tabs>

### Get CMK details

Get the details of a customer managed key configuration.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`GET /v1/project/PROJECT_ID/secrets/cmks/CMK_ID`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |
| `CMK_ID`     | String | True     | CMK identifier |

#### Sample request

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks/CMK_ID \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

#### Sample response (OCI)

A successful request returns a `200 OK` status code and a JSON object representing the
specified CMK configuration, for example:

```json
{
  "cmk": {
    "id": "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7",
    "provider": "oci",
    "default_cmk": false,
    "resource": "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn project cmks get --project PROJECT_NAME --cmk-id CMK_ID
```

#### Parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `--project`  | String | True     | Project name |
| `--cmk-id`   | String | True     | CMK identifier |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request

```bash
avn project cmks get \
  --project my-project \
  --cmk-id a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7
```

#### Sample output (OCI)

Table format:

```
property      value
============  ================================================
id            a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7
provider      oci
default_cmk   False
resource      ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
status        current
created_at    YYYY-MM-DDTHH:MM:SSZ
updated_at    YYYY-MM-DDTHH:MM:SSZ
```

For JSON output, use `--json` flag.

</TabItem>
</Tabs>

### List CMKs

List all customer managed key configurations for a project.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`GET /v1/project/PROJECT_ID/secrets/cmks`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |

#### Sample request

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

#### Sample response (OCI)

A successful request returns a `200 OK` status code and a JSON object containing a list
of all CMK configurations for a project, for example:

```json
{
  "cmks": [
    {
      "id": "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7",
      "provider": "oci",
      "default_cmk": false,
      "resource": "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "status": "current",
      "created_at": "YYYY-MM-DDTHH:MM:SSZ",
      "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
    },
    {
      "id": "8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
      "provider": "oci",
      "default_cmk": false,
      "resource": "ocid1.key.oc1.phx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "status": "old",
      "created_at": "YYYY-MM-DDTHH:MM:SSZ",
      "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
    }
  ]
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn project cmks list --project PROJECT_NAME
```

#### Parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `--project`  | String | True     | Project name |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request

```bash
avn project cmks list --project my-project
```

#### Sample output (OCI)

Table format:

```txt
id                                    status   provider  resource                                                  default_cmk  created_at
====================================  =======  ========  ========================================================  ===========  ===================
a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7  current  oci       ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   False        YYYY-MM-DDTHH:MM:SSZ
8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f  old      oci       ocid1.key.oc1.phx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy   False        YYYY-MM-DDTHH:MM:SSZ
```

For JSON output, use `--json` flag.

</TabItem>
</Tabs>

### Remove CMK

Delete a customer managed key configuration.

:::note
This function renders the services linked to the key inoperable. Migrate the services to
either another CMK or Aiven managed keys to avoid any service disruption.
:::

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`DELETE /v1/project/PROJECT_ID/secrets/cmks/CMK_ID`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |
| `CMK_ID`     | String | True     | CMK identifier |

#### Sample request

```bash
curl -X DELETE https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks/CMK_ID \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

#### Sample response (OCI)

A successful request returns a `200 OK` status code and a JSON object representing the
deleted CMK configuration, for example:

```json
{
  "cmk": {
    "id": "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7",
    "provider": "oci",
    "default_cmk": false,
    "resource": "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn project cmks delete --project PROJECT_NAME --cmk-id CMK_ID
```

#### Parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `--project`  | String | True     | Project name |
| `--cmk-id`   | String | True     | CMK identifier |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request

```bash
avn project cmks delete \
  --project my-project \
  --cmk-id a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7
```

#### Sample output (OCI)

The command returns the details of the deleted CMK in the format you specified.

For JSON output, use `--json` flag.

</TabItem>
</Tabs>
