---
title: Bring your own key (BYOK)
sidebar_label: Bring your own key
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Register, list, update, or delete your customer managed keys (CMKs) in Aiven projects using the [Aiven Provider for Terraform](/docs/tools/terraform), [Aiven API](/docs/tools/api), or the [Aiven CLI](/docs/tools/cli).

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

- [**Aiven Provider for Terraform**](/docs/tools/terraform) installed and configured (for
  Terraform instructions). The
  [aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
  resource is in the beta stage and requires setting the `PROVIDER_AIVEN_ENABLE_BETA`
  environment variable.

## List CMK accessors

List customer managed key (CMK) accessors - principals that need to be granted access to
perform encrypt/decrypt operations on your behalf.

:::note
This operation is not supported by Aiven Provider for Terraform. Use the API or CLI to get the
accessor details needed for granting KMS permissions.
:::

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

Use the Aiven Provider for Terraform, Aiven API, or Aiven CLI to manage customer managed keys (CMKs) for encrypting
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
<TabItem value="terraform" label="Terraform">

#### Resource

Use the
[aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
resource to register a CMK with your Aiven project.

:::important
This resource is in beta stage. Set the `PROVIDER_AIVEN_ENABLE_BETA` environment variable to use it.
:::

#### Required parameters

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `project`   | String | Project name |
| `cmk_provider`   | String | Cloud provider hosting the KMS: `aws`, `gcp`, `azure`, or `oci` |
| `resource`| String | CMK reference (key identifier of max 512 characters: AWS ARN, OCI OCID, Google Cloud resource name, or Azure key identifier) |
| `default_cmk` | Boolean | Mark this key as default for new service creation |

#### Sample configuration (AWS)

```terraform
resource "aiven_cmk" "aws_cmk" {
  project      = "my-project"
  cmk_provider = "aws"
  resource     = "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234"
  default_cmk  = true
}
```

#### Sample configuration (GCP)

```terraform
resource "aiven_cmk" "gcp_cmk" {
  project      = "my-project"
  cmk_provider = "gcp"
  resource     = "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key"
  default_cmk  = false
}
```

#### Sample configuration (OCI)

```terraform
resource "aiven_cmk" "oci_cmk" {
  project      = "my-project"
  cmk_provider = "oci"
  resource     = "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  default_cmk  = false
}
```

#### Sample configuration (Azure)

```terraform
resource "aiven_cmk" "azure_cmk" {
  project      = "my-project"
  cmk_provider = "azure"
  resource     = "https://example-keyvault.vault.azure.net/keys/example-key/abc123def456"
  default_cmk  = false
}
```

#### Exported attributes

| Attribute | Description |
|-----------|-------------|
| `cmk_id` | Identifier of the specific key |
| `status` | One of `current`, `old`, or `deleted` |
| `created_at` | CMK creation timestamp |
| `updated_at` | CMK update timestamp |
| `id` | Resource ID in format `project/cmk_id` |

#### Usage

Apply the configuration:

```bash
export PROVIDER_AIVEN_ENABLE_BETA=1
terraform plan
terraform apply
```

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
<TabItem value="terraform" label="Terraform">

#### Resource

Update the
[aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
resource configuration to modify the CMK settings.

:::note
Only the `default_cmk` attribute can be updated. To change `project`, `cmk_provider`, or `resource`, you must recreate the resource.
:::

#### Sample configuration

Update the `default_cmk` setting:

```terraform
resource "aiven_cmk" "example" {
  project      = "my-project"
  cmk_provider = "gcp"
  resource     = "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key"
  default_cmk  = false  # Changed from true to false
}
```

#### Usage

Apply the changes:

```bash
export PROVIDER_AIVEN_ENABLE_BETA=1
terraform plan
terraform apply
```

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
<TabItem value="terraform" label="Terraform">

#### Data source

Use the
[aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
resource or a data source to retrieve CMK details. When using the resource, all attributes
are automatically available after creation or import.

#### Accessing CMK details from resource

```terraform
resource "aiven_cmk" "example" {
  project      = "my-project"
  cmk_provider = "oci"
  resource     = "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  default_cmk  = false
}

# Access the CMK details
output "cmk_id" {
  value = aiven_cmk.example.cmk_id
}

output "cmk_status" {
  value = aiven_cmk.example.status
}

output "cmk_created_at" {
  value = aiven_cmk.example.created_at
}
```

#### Importing existing CMK

Import an existing CMK to manage it with Terraform:

```bash
export PROVIDER_AIVEN_ENABLE_BETA=1
terraform import aiven_cmk.example PROJECT_NAME/CMK_ID
```

After importing, the resource will have all attributes available:

```terraform
# After import, you can reference:
# - aiven_cmk.example.cmk_id
# - aiven_cmk.example.status
# - aiven_cmk.example.created_at
# - aiven_cmk.example.updated_at
# - aiven_cmk.example.cmk_provider
# - aiven_cmk.example.resource
# - aiven_cmk.example.default_cmk
```

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
<TabItem value="terraform" label="Terraform">

#### Using multiple resources

When you have multiple CMK resources in your Terraform configuration, you can list and reference them individually:

```terraform
resource "aiven_cmk" "cmk_oci_iad" {
  project      = "my-project"
  cmk_provider = "oci"
  resource     = "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  default_cmk  = false
}

resource "aiven_cmk" "cmk_oci_phx" {
  project      = "my-project"
  cmk_provider = "oci"
  resource     = "ocid1.key.oc1.phx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
  default_cmk  = false
}

# Output all CMK IDs
output "all_cmk_ids" {
  value = [
    aiven_cmk.cmk_oci_iad.cmk_id,
    aiven_cmk.cmk_oci_phx.cmk_id,
  ]
}
```

#### Using Terraform state

List all CMKs managed by Terraform:

```bash
export PROVIDER_AIVEN_ENABLE_BETA=1
terraform state list | grep aiven_cmk
```

View details of a specific CMK:

```bash
terraform state show aiven_cmk.cmk_oci_iad
```

:::note
To list all CMKs in a project (including those not managed by Terraform), use the API or CLI.
:::

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
<TabItem value="terraform" label="Terraform">

#### Resource

Remove the CMK by deleting the
[aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
resource from your Terraform configuration.

:::warning
Deleting a CMK renders services linked to the key inoperable. Ensure services are migrated
to another CMK or Aiven-managed keys before deletion.
:::

#### Step 1: Remove from configuration

Remove or comment out the CMK resource:

```terraform
# resource "aiven_cmk" "example" {
#   project      = "my-project"
#   cmk_provider = "oci"
#   resource     = "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
#   default_cmk  = false
# }
```

#### Step 2: Apply the changes

```bash
export PROVIDER_AIVEN_ENABLE_BETA=1
terraform plan  # Review the planned deletion
terraform apply # Confirm and apply
```

Alternatively, use `terraform destroy` to target a specific resource:

```bash
export PROVIDER_AIVEN_ENABLE_BETA=1
terraform destroy -target=aiven_cmk.example
```

#### What happens

When you remove a CMK resource:
- The CMK configuration is deleted from the Aiven project
- Services using this CMK will become inoperable
- The resource is removed from Terraform state

</TabItem>
</Tabs>
