---
title: Bring your own key (BYOK)
sidebar_label: Bring your own key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";

Register, list, update, or delete your customer managed keys (CMKs), associate CMKs
with services, and view CMK usage across services in Aiven projects using the
[Aiven Provider for Terraform](/docs/tools/terraform), [Aiven API](/docs/tools/api),
or the [Aiven CLI](/docs/tools/cli).

## Prerequisites

- **Key management service** (KMS) that supports asymmetric RSA 2048 or RSA 4096
  keys in Google Cloud, Oracle Cloud Infrastructure (OCI), or Amazon Web Services (AWS)

- [**Authentication token**](/docs/platform/howto/create_authentication_token) to use
  the [Aiven API](/docs/tools/api)

- [**Aiven CLI**](/docs/tools/cli) installed and configured (for CLI instructions)

- [**Aiven Provider for Terraform**](/docs/tools/terraform) installed and configured (for
  Terraform instructions)

  - The
    [aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
    resource is in the beta stage and requires setting the `PROVIDER_AIVEN_ENABLE_BETA`
    environment variable.
  - The [list CMK accessors](/docs/platform/howto/bring-your-own-key#list-cmk-accessors)
    operation is not supported by Aiven Provider for Terraform. Use the API or CLI.
  - More information on the `aiven_cmk` resource and its configuration options are
    available in the
    [Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk).

## List CMK accessors

List customer managed key (CMK) accessors - principals that need to be granted access to
perform encrypt/decrypt operations on your behalf.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`GET /v1/project/PROJECT_ID/secrets/cmks/accessors`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |

#### Sample request

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks/accessors \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

#### Sample response

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

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn project cmks accessors --project PROJECT_NAME
```

#### Parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `--project`  | String | True     | Project name |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request

```bash
avn project cmks accessors --project my-project
```

#### Sample output

```txt
PROVIDER  DETAILS
========  =======
gcp       access_group  access.example.12345678-1234-1234-1234-123456789abc@aiven.io
```

For JSON output:

```bash
avn project cmks accessors --project my-project --json
```

</TabItem>
</Tabs>

:::note
For Google Cloud Key Management Service keys, grant the group in the `access_group`
parameter the `roles/cloudkms.cryptoOperator` role.
:::

## Set up customer-managed keys on your cloud provider

Before registering a CMK with Aiven, set up the key and grant Aiven access on your cloud
provider.

### AWS KMS setup

#### Create a KMS key

Create a symmetric encryption key in AWS KMS:

```bash
aws kms create-key \
  --description "Aiven CMK for data-at-rest encryption" \
  --key-usage ENCRYPT_DECRYPT \
  --origin AWS_KMS
```

For customer-managed key material:

```bash
aws kms create-key \
  --description "Aiven CMK (customer-imported key material)" \
  --key-usage ENCRYPT_DECRYPT \
  --origin EXTERNAL
```

Record the key ARN from the output:

```txt
arn:aws:kms:<region>:<account-id>:key/<key-id>
```

#### Create an alias (optional)

```bash
aws kms create-alias \
  --alias-name alias/aiven-cmk \
  --target-key-id <key-id>
```

#### Grant Aiven access to your key

1. Get Aiven's IAM role ARN using [List CMK accessors](#list-cmk-accessors).
1. Update your KMS key policy to allow Aiven to encrypt and decrypt. The policy statement
   should include:

```json
{
  "Sid": "Allow Aiven to use this key for CMK operations",
  "Effect": "Allow",
  "Principal": {
    "AWS": "<aiven-cmk-role-arn>"
  },
  "Action": [
    "kms:Encrypt",
    "kms:Decrypt"
  ],
  "Resource": "*"
}
```

Apply the updated key policy:

```bash
aws kms put-key-policy \
  --key-id <key-id> \
  --policy-name default \
  --policy file://key-policy.json
```

:::note
Keep your existing root account statement in the key policy to allow IAM policies in your
account to manage the key.
:::

### Google Cloud KMS setup

#### Create a key ring

```bash
gcloud kms keyrings create <keyring-name> \
  --location <region> \
  --project <your-project>
```

#### Create a CryptoKey

```bash
gcloud kms keys create <key-name> \
  --location <region> \
  --keyring <keyring-name> \
  --purpose encryption \
  --project <your-project>
```

For HSM-backed keys:

```bash
gcloud kms keys create <key-name> \
  --location <region> \
  --keyring <keyring-name> \
  --purpose encryption \
  --protection-level hsm \
  --project <your-project>
```

Record the key resource name:

```txt
projects/<project>/locations/<location>/keyRings/<keyring>/cryptoKeys/<key-name>
```

#### Grant Aiven access to your key

1. Get Aiven's access group email using [List CMK accessors](#list-cmk-accessors).
1. Grant the `Cloud KMS CryptoKey Encrypter/Decrypter` role to Aiven's group:

```bash
gcloud kms keys add-iam-policy-binding <key-name> \
  --location <region> \
  --keyring <keyring-name> \
  --project <your-project> \
  --member "group:<aiven-cmk-group>@aiven.io" \
  --role "roles/cloudkms.cryptoKeyEncrypterDecrypter"
```

### Oracle Cloud Infrastructure (OCI) Vault setup

#### Create cross-tenancy IAM policies

1. Get Aiven's tenancy OCID and group OCID using [List CMK accessors](#list-cmk-accessors).
1. Create cross-tenancy IAM policies in your tenancy:

```bash
oci iam policy create \
  --compartment-id <your-tenancy-ocid> \
  --name aiven-cmk-access \
  --statements '[
    "define tenancy AivenTenancy as <aiven-tenancy-ocid>",
    "admit group <aiven-cmk-group-ocid> of tenancy AivenTenancy to use keys in compartment <compartment-name>"
  ]'
```

#### Create a Vault

```bash
oci kms management vault create \
  --compartment-id <compartment-ocid> \
  --display-name <vault-name> \
  --vault-type DEFAULT
```

For HSM-backed vaults:

```bash
oci kms management vault create \
  --compartment-id <compartment-ocid> \
  --display-name <vault-name> \
  --vault-type VIRTUAL_PRIVATE
```

Record the Vault's management endpoint and crypto endpoint.

#### Create a Master Encryption Key

```bash
oci kms management key create \
  --compartment-id <compartment-ocid> \
  --display-name <key-name> \
  --endpoint <vault-management-endpoint> \
  --key-shape '{"algorithm": "AES", "length": 32}'
```

Record the key OCID:

```txt
ocid1.key.oc1.<region>.<hash>
```

## Manage a project CMK

Use the Aiven Provider for Terraform, Aiven API, or Aiven CLI to manage customer managed
keys (CMKs) for encrypting service data.

For per-service CMK assignment and rotation, see
[Manage service CMK associations](#manage-service-cmk-associations).

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
| `provider`   | String | True     | Cloud provider hosting the KMS: `aws`, `gcp`, or `oci` |
| `resource` | String | True     | CMK reference (key identifier of max 512 characters: AWS ARN, OCI OCID, or Google Cloud resource name) |
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

A successful request returns a `201 CREATED` status code and a JSON object representing
the newly registered CMK configuration, for example:

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
| `provider` | Provider type, one of `gcp`, `aws`, or `oci` |
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
| `--provider`   | String | True     | Cloud provider hosting the KMS: `aws`, `gcp`, or `oci` |
| `--resource` | String | True     | CMK reference (key identifier: AWS ARN, OCI OCID, or Google Cloud resource name) |
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

```txt
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

#### Sample configuration

<TerraformSample filename='resources/aiven_cmk/resource.tf' />

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
| `provider` | Provider type, one of `gcp`, `aws`, or `oci` |
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

```txt
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
You can only update the `default_cmk` attribute. Changing the `project`, `cmk_provider`,
or `resource` attributes forces the recreation of the resource.
:::

#### Sample configuration

Update the `default_cmk` setting:

```diff
resource "aiven_cmk" "example" {
  project      = "my-project"
  cmk_provider = "gcp"
  resource     = "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key"
- default_cmk  = true
+ default_cmk  = false
}
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

```txt
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

#### Resource

Use
[aiven_cmk](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
outputs to get CMK details.

#### Accessing CMK details from resource

```terraform
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
terraform import aiven_cmk.example PROJECT_NAME/CMK_ID
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

Use Terraform state to list all CMKs managed in your
[CMK resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk):

```bash
terraform state list | grep aiven_cmk
```

View details of a specific CMK:

```bash
terraform state show aiven_cmk.cmk_oci_iad
```

:::note
To list all CMKs in a project (including those not managed by Terraform), use the API or
CLI.
:::

</TabItem>
</Tabs>

### Remove CMK

Delete a customer managed key configuration.

:::note
You can delete a CMK only when it has no service associations in `active`, `activating`,
or `deactivating` status. Move each linked service to another CMK or remove the CMK
association before deletion.
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

If the CMK is still associated with one or more services, the request returns
`409 Conflict`.

```json
{
  "message": "CMK cannot be deleted because it is still associated with one or more services"
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

:::warning
Deleting a CMK fails when the CMK is still associated with one or more services.
Move each linked service to another CMK or remove the CMK association first.
:::

Remove or comment out the
[CMK resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk)
in your Terraform configuration:

```terraform
# resource "aiven_cmk" "example" {
#   project      = "my-project"
#   cmk_provider = "oci"
#   resource     = "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
#   default_cmk  = false
# }
```

Alternatively, use `terraform destroy` to target a specific resource:

```bash
terraform destroy -target=aiven_cmk.example
```

#### What happens

When you remove a
[CMK resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/cmk):

- Terraform apply fails if the CMK is still associated with one or more services.
- After all associations are removed, the CMK configuration is deleted from the Aiven project.
- The resource is removed from Terraform state.

</TabItem>
</Tabs>

## Manage service CMK associations

Associate a specific customer managed key (CMK) with individual services during creation
or update. This allows you to use different CMKs for different services, change CMKs for
existing services, or remove CMK associations altogether.

### Associate a CMK when creating a service

Create a service with a specific CMK by providing the CMK ID in the service creation request.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`POST /v1/project/PROJECT_ID/service`

#### Request body parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `service_name` | String | True | Name of the service |
| `service_type` | String | True | Type of service (for example, `pg`, `mysql`, `redis`) |
| `plan` | String | True | Service plan |
| `cmk_id` | String | False | Customer managed key (CMK) identifier. If omitted, the
project's default CMK is used, or Aiven-managed keys if no default is set. |

#### Sample request

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_ID/service \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "service_name": "my-pg-service",
        "service_type": "pg",
        "plan": "startup-4",
        "cmk_id": "12345678-1234-1234-1234-12345678abcd"
      }'
```

#### Sample response

A successful request returns a `201 CREATED` status code and a JSON object representing
the newly created service with the CMK association:

```json
{
  "service": {
    "service_name": "my-pg-service",
    "service_type": "pg",
    "plan": "startup-4",
    "state": "REBUILDING",
    "cmk_id": "12345678-1234-1234-1234-12345678abcd"
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn service create --project PROJECT_NAME --service-name SERVICE_NAME --service-type SERVICE_TYPE --plan PLAN_NAME --cmk-id CMK_ID
```

#### Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `--project` | String | True | Project name |
| `--service-name` | String | True | Name of the service |
| `--service-type` | String | True | Type of service (for example, `pg`, `mysql`, `redis`) |
| `--plan` | String | True | Service plan |
| `--cmk-id` | String | False | Customer managed key (CMK) identifier |

#### Sample request

```bash
avn service create \
  --project my-project \
  --service-name my-pg-service \
  --service-type pg \
  --plan startup-4 \
  --cmk-id 12345678-1234-1234-1234-12345678abcd
```

</TabItem>
<TabItem value="terraform" label="Terraform">

#### Resource

Use the `cmk_id` parameter in the service resource to associate a CMK at creation time.

#### Sample configuration

```terraform
resource "aiven_pg" "example" {
  project                = "my-project"
  service_name           = "my-pg-service"
  plan                   = "startup-4"
  cmk_id                 = "12345678-1234-1234-1234-12345678abcd"
}
```

</TabItem>
</Tabs>

### Change or remove the CMK for an existing service

Update a service to use a different CMK or remove its CMK association.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`PUT /v1/project/PROJECT_ID/service/SERVICE_NAME`

#### Path parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `PROJECT_ID` | String | True | Project identifier |
| `SERVICE_NAME` | String | True | Service name |

#### Request body parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `cmk_id` | String | False | Customer managed key (CMK) identifier to use for this service. Pass an empty UUID (`00000000-0000-0000-0000-000000000000`) to remove the CMK association and use Aiven-managed keys instead. |

#### Sample request (change CMK)

```bash
curl -X PUT https://api.aiven.io/v1/project/PROJECT_ID/service/SERVICE_NAME \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "cmk_id": "87654321-4321-4321-4321-87654321dcba"
      }'
```

#### Sample request (remove CMK association)

```bash
curl -X PUT https://api.aiven.io/v1/project/PROJECT_ID/service/SERVICE_NAME \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "cmk_id": "00000000-0000-0000-0000-000000000000"
      }'
```

#### Sample response

A successful request returns a `200 OK` status code and a JSON object representing
the updated service:

```json
{
  "service": {
    "service_name": "my-pg-service",
    "service_type": "pg",
    "state": "REBALANCING",
    "cmk_id": "87654321-4321-4321-4321-87654321dcba"
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn service update --project PROJECT_NAME --service-name SERVICE_NAME --cmk-id CMK_ID
```

#### Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `--project` | String | True | Project name |
| `--service-name` | String | True | Service name |
| `--cmk-id` | String | False | Customer managed key (CMK) identifier. Pass `00000000-0000-0000-0000-000000000000` to remove the CMK association. |

#### Sample request (change CMK)

```bash
avn service update \
  --project my-project \
  --service-name my-pg-service \
  --cmk-id 87654321-4321-4321-4321-87654321dcba
```

#### Sample request (remove CMK association)

```bash
avn service update \
  --project my-project \
  --service-name my-pg-service \
  --cmk-id 00000000-0000-0000-0000-000000000000
```

</TabItem>
<TabItem value="terraform" label="Terraform">

#### Resource

Update the `cmk_id` parameter in your service resource to change or remove CMK association.

#### Sample configuration (change CMK)

```terraform
resource "aiven_pg" "example" {
  project                = "my-project"
  service_name           = "my-pg-service"
  plan                   = "startup-4"
  cmk_id                 = "87654321-4321-4321-4321-87654321dcba"
}
```

#### Sample configuration (remove CMK)

```terraform
resource "aiven_pg" "example" {
  project                = "my-project"
  service_name           = "my-pg-service"
  plan                   = "startup-4"
  cmk_id                 = "00000000-0000-0000-0000-000000000000"
}
```

</TabItem>
</Tabs>

### View CMK details in service information

When you retrieve service information, the response now includes the `cmk_id` field
showing which CMK is actively protecting that service's data. This allows you to verify
encryption key usage and track which services are using which CMKs.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`GET /v1/project/PROJECT_ID/service/SERVICE_NAME`

#### Sample request

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_ID/service/SERVICE_NAME \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

#### Sample response

The service details now include the `cmk_id` field:

```json
{
  "service": {
    "service_name": "my-pg-service",
    "service_type": "pg",
    "plan": "startup-4",
    "state": "RUNNING",
    "cmk_id": "12345678-1234-1234-1234-12345678abcd"
  }
}
```

If the service is not using a CMK, the `cmk_id` field is `null`:

```json
{
  "service": {
    "service_name": "my-mysql-service",
    "service_type": "mysql",
    "plan": "startup-4",
    "state": "RUNNING",
    "cmk_id": null
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn service get --project PROJECT_NAME --service-name SERVICE_NAME
```

#### Sample output

Table format:

```text
service_name     service_type  state    cmk_id
===============  ============  =======  ====================================
my-pg-service    pg            RUNNING  12345678-1234-1234-1234-12345678abcd
```

If no CMK is associated with the service, the `cmk_id` value is empty or `null` in JSON
output.

</TabItem>
</Tabs>

### List services associated with a CMK

Find all services in a project that are using a specific customer managed key. This is
useful for auditing, capacity planning, or managing CMK usage across your infrastructure.

<Tabs groupId="interface">
<TabItem value="api" label="API" default>

#### API endpoint

`GET /v1/project/PROJECT_ID/secrets/cmks/CMK_ID/service_associations`

#### Path parameters

| Parameter    | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `PROJECT_ID` | String | True     | Project identifier |
| `CMK_ID`     | String | True     | CMK identifier |

#### Sample request

```bash
curl -X GET https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks/CMK_ID/service_associations \
  -H "Authorization: Bearer AIVEN_API_TOKEN"
```

#### Sample response

A successful request returns a `200 OK` status code and a JSON object containing a list of
services associated with the CMK:

```json
{
  "service_associations": [
    {
      "service_name": "my-pg-service",
      "status": "active"
    },
    {
      "service_name": "my-kafka-cluster",
      "status": "activating"
    }
  ]
}
```

#### Response fields

| Field | Description |
|-------|-------------|
| `service_name` | Name of the service using this CMK |
| `status` | Association status: `active` (service is actively using the CMK), or `activating` (service is in the process of transitioning to use this CMK) |

The response includes services currently associated with the CMK, including services in
transition (`activating`) and services already using the CMK (`active`). Services not
associated with the specified CMK are not included.

:::note
If a CMK has no associated services, the `service_associations` array is empty.
:::

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

The service-association lookup for a specific CMK is currently available through the API
endpoint only.

</TabItem>
<TabItem value="terraform" label="Terraform">

#### Resource

The Aiven Provider for Terraform does not currently provide a data source or resource for
listing services associated with a specific CMK. Use the API endpoint for this operation.

</TabItem>
</Tabs>
