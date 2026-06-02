---
title: Bring your own key (BYOK)
sidebar_label: Bring your own key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";

Register, list, update, or delete your customer managed keys (CMKs), associate CMKs with services, and view CMK usage across services in Aiven projects using the [Aiven Provider for Terraform](/docs/tools/terraform), [Aiven API](/docs/tools/api), or the [Aiven CLI](/docs/tools/cli).

:::important
Bring your own key (BYOK) is a [BYOC](/docs/platform/concepts/byoc) enterprise feature.
[Contact Aiven](https://aiven.io/contact) to request access.
:::

## Encryption scope

BYOK encrypts the following using your CMKs:

- **Backups**: All backups created by Aiven services are encrypted with your CMK.
- **Service data at rest**: CMKs protect all data stored by the service.
- **Data in transit between the service and backups**: Encryption occurs on the service
  node before data leaves the cluster, so backup transfers use your CMK.

## Prerequisites

- **Key management service** (KMS) that supports customer-managed keys in one of the
  supported cloud providers:
  - **Google Cloud KMS**: asymmetric RSA 2048 or RSA 4096 keys
  - **Oracle Cloud Infrastructure (OCI) Vault**: AES keys
  - **AWS KMS**: symmetric encryption keys (`ENCRYPT_DECRYPT`)

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):
  - **Azure Key Vault**: RSA keys (software-protected or HSM-backed)
-->

- [**Authentication token**](/docs/platform/howto/create_authentication_token) to use
  the [Aiven API](/docs/tools/api)

- [**Aiven CLI**](/docs/tools/cli) installed and configured (for CLI instructions)

- [**Aiven Provider for Terraform**](/docs/tools/terraform) installed and configured (for
  Terraform instructions)

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

Reference: [CMKAccessorsList API](https://api.aiven.io/doc/#tag/Secrets/operation/CMKAccessorsList)

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
    },
    "oci": {
      "access_group": "ocid1.group.oc1..abcdABCD....",
      "access_tenant": "ocid1.tenancy.oc1..abcdABCD...."
    },
    "aws": {
      "role_arn": "arn:aws:iam::123456789012:role/aiven-cmk-anchor"
    }
  }
}
```

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):
```json
{
  "accessors": {
    ...
    "azure": {
      "app_id": "12345678-1234-1234-1234-123456789abc"
    },
    ...
  }
}
-->

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

#### Sample request

```bash
avn project cmks accessors --project my-project
```

#### Sample output

The output is always in the JSON format:

```json
{
    "gcp": {
        "access_group": "access.example.12345678-1234-1234-1234-123456789abc@aiven.io"
    },
    "oci": {
      "access_group": "ocid1.group.oc1..abcdABCD....",
      "access_tenant": "ocid1.tenancy.oc1..abcdABCD...."
    },
    "aws": {
      "role_arn": "arn:aws:iam::123456789012:role/aiven-cmk-anchor"
    }
}
```

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):
    "azure": {
      "app_id": "12345678-1234-1234-1234-123456789abc"
    },
-->

</TabItem>
<TabItem value="terraform" label="Terraform">

#### Data sources

Use the per-provider CMK accessor data source for the cloud provider hosting your KMS.
Each data source takes the project name and returns the accessor values as read-only
attributes:

- [aiven_cmk_accessor_gcp](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/cmk_accessor_gcp):
  returns `access_group` for Google Cloud KMS.
- [aiven_cmk_accessor_oci](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/cmk_accessor_oci):
  returns `access_group` and `access_tenant` for OCI Vault.
- [aiven_cmk_accessor_aws](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/cmk_accessor_aws):
  returns `principal`, the IAM role ARN, for AWS KMS.

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):
- [aiven_cmk_accessor_azure](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/cmk_accessor_azure):
  returns `app_id` for Azure Key Vault.
-->

#### Sample configuration (Google Cloud)

```terraform
data "aiven_cmk_accessor_gcp" "example" {
  project = "my-project"
}

output "gcp_access_group" {
  value = data.aiven_cmk_accessor_gcp.example.access_group
}
```

#### Sample configuration (OCI)

```terraform
data "aiven_cmk_accessor_oci" "example" {
  project = "my-project"
}

output "oci_access_group" {
  value = data.aiven_cmk_accessor_oci.example.access_group
}

output "oci_access_tenant" {
  value = data.aiven_cmk_accessor_oci.example.access_tenant
}
```

#### Sample configuration (AWS)

```terraform
data "aiven_cmk_accessor_aws" "example" {
  project = "my-project"
}

output "aws_principal" {
  value = data.aiven_cmk_accessor_aws.example.principal
}
```

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):

#### Sample configuration (Azure)

```terraform
data "aiven_cmk_accessor_azure" "example" {
  project = "my-project"
}

output "azure_app_id" {
  value = data.aiven_cmk_accessor_azure.example.app_id
}
```

-->

</TabItem>
</Tabs>

:::note
Use the accessor values returned by this operation when granting Aiven access to your key:

- **Google Cloud KMS**: Grant the `access_group` email address the
  `roles/cloudkms.cryptoOperator` role on your key.
- **OCI Vault**: Use `access_tenant` and `access_group` OCIDs to create cross-tenancy
  IAM policies.
- **AWS KMS**: Use the `role_arn` as the trusted principal in your KMS key policy (see
  [AWS KMS setup](#aws-kms-setup)).

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):
- **Azure Key Vault**: Use the `app_id` to create a service principal in your
  Azure AD tenant (see [Azure Key Vault setup](#azure-key-vault-setup)).
-->

:::

## Set up customer-managed keys on your cloud provider

Before registering a CMK with Aiven, set up the key and grant Aiven access on your cloud
provider.

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

OCI key validation can fail with a generic error when the key region is not available
for BYOK. If key validation fails after you confirm the key OCID and IAM policy,
contact Aiven support.

#### Create cross-tenancy IAM policies

1. Get Aiven's tenancy OCID and group OCID using [List CMK accessors](#list-cmk-accessors).
   Use OCI `access_tenant` for `<aiven-tenancy-ocid>` and OCI `access_group` for
   `<aiven-cmk-group-ocid>`.
1. Create the policy in the root compartment of your tenancy.
1. Create cross-tenancy IAM policies in your tenancy to grant Aiven access to the key:

```bash
oci iam policy create \
  --compartment-id <customer-tenancy-ocid> \
  --name aiven-cmk-access \
  --statements '[
    "define tenancy AT as <aiven-tenancy-ocid>",
    "define group AG as <aiven-cmk-group-ocid>",
    "admit group AG of tenancy AT to use keys in tenancy"
  ]'
```

All three statements are required. Do not remove the `define group` statement.

Optional: Restrict access to a specific key by adding a condition to the `admit` statement:

```bash
oci iam policy create \
  --compartment-id <customer-tenancy-ocid> \
  --name aiven-cmk-access \
  --statements '[
    "define tenancy AT as <aiven-tenancy-ocid>",
    "define group AG as <aiven-cmk-group-ocid>",
    "admit group AG of tenancy AT to use keys in tenancy where target.key.id = \"<key-ocid>\""
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

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):

### Azure Key Vault setup

Aiven authenticates to your Azure Key Vault using a multi-tenant application registered
in Aiven's Azure AD tenant. You grant access by creating a service principal from
Aiven's application in your tenant and assigning it the **Key Vault Crypto User** role
on your key.

#### Step 1: Create a service principal for Aiven's application

Get Aiven's `app_id` using
[List CMK accessors](#list-cmk-accessors), then register Aiven's application as a
service principal in your Azure AD tenant:

```bash
az ad sp create --id <aiven-application-id>
```

This allows Aiven to authenticate into your Azure AD tenant using its multi-tenant
application.

#### Step 2: Create a Key Vault with Azure RBAC

The Key Vault must use **Azure RBAC** for its authorization model (not the legacy access
policy model):

```bash
az keyvault create \
  --name <vault-name> \
  --resource-group <resource-group> \
  --location <region> \
  --enable-rbac-authorization true
```

If you are using an existing Key Vault, ensure RBAC authorization is enabled:

```bash
az keyvault update \
  --name <vault-name> \
  --enable-rbac-authorization true
```

#### Step 3: Create an RSA key

Create an RSA key with the **wrapKey** and **unwrapKey** operations enabled.

Software-protected key:

```bash
az keyvault key create \
  --vault-name <vault-name> \
  --name <key-name> \
  --kty RSA \
  --size 2048 \
  --ops wrapKey unwrapKey
```

HSM-backed key (for higher security requirements):

:::note
HSM-backed keys require an Azure Managed HSM, which must be provisioned separately
before creating keys. Provisioning takes a few minutes and incurs an hourly cost.
See the [Azure Managed HSM quickstart](https://learn.microsoft.com/en-us/azure/key-vault/managed-hsm/quick-create-cli)
for setup instructions.
:::

```bash
az keyvault key create \
  --hsm-name <hsm-name> \
  --name <key-name> \
  --kty RSA-HSM \
  --size 2048 \
  --ops wrapKey unwrapKey
```

Supported key sizes are `2048`, `3072`, and `4096`.

Record the key URL, which becomes the resource identifier you register with Aiven:

- Software-protected key: `https://<vault-name>.vault.azure.net/keys/<key-name>`
- HSM-backed key: `https://<hsm-name>.vault.azure.net/keys/<key-name>`

If you include a specific version in the URL, Aiven uses that version exclusively.
Omitting the version means Aiven always uses the latest active version.

#### Step 4: Grant Aiven access to the key

Find the object ID of the Aiven service principal in your tenant:

```bash
az ad sp show --id <aiven-application-id> --query id -o tsv
```

**Software-protected key** — assign the **Key Vault Crypto User** built-in role to the
Aiven service principal. This role grants only key wrapping permissions — Aiven cannot
manage, rotate, or delete your key.

Scope to the specific key (recommended):

```bash
az role assignment create \
  --assignee <aiven-service-principal-object-id> \
  --role "Key Vault Crypto User" \
  --scope "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.KeyVault/vaults/<vault-name>/keys/<key-name>"
```

Or scope to the entire vault:

```bash
az role assignment create \
  --assignee <aiven-service-principal-object-id> \
  --role "Key Vault Crypto User" \
  --scope "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.KeyVault/vaults/<vault-name>"
```

**HSM-backed key** — use the Managed HSM CLI command and assign the **Managed HSM Crypto User** role instead:

Scope to the specific key (recommended):

```bash
az keyvault role assignment create \
  --hsm-name <hsm-name> \
  --role "Managed HSM Crypto User" \
  --assignee-object-id <aiven-service-principal-object-id> \
  --scope /keys/<key-name>
```

Or scope to all keys in the HSM:

```bash
az keyvault role assignment create \
  --hsm-name <hsm-name> \
  --role "Managed HSM Crypto User" \
  --assignee-object-id <aiven-service-principal-object-id> \
  --scope /keys
```

:::note
You can revoke Aiven's access at any time by removing the role assignment or deleting
the service principal from your tenant. This immediately prevents any further
cryptographic operations by Aiven.
:::

-->

### AWS KMS setup

Aiven authenticates to your AWS KMS key using cross-account IAM access. You grant
access by adding Aiven's IAM role ARN as a trusted principal in your KMS key policy.
No resources need to be created in Aiven's AWS account — everything is controlled
through your key policy.

#### Step 1: Create a KMS key

Create a symmetric encryption key in the AWS region where your Aiven services
will run:

```bash
aws kms create-key \
  --description "Aiven CMK for data-at-rest encryption" \
  --key-usage ENCRYPT_DECRYPT \
  --origin AWS_KMS
```

Record the key ARN from the output:

```txt
arn:aws:kms:<region>:<account-id>:key/<key-id>
```

#### Step 2: Create a key alias (optional but recommended)

```bash
aws kms create-alias \
  --alias-name alias/aiven-cmk \
  --target-key-id <key-id>
```

#### Step 3: Grant Aiven access via the key policy

Get Aiven's IAM role ARN using [List CMK accessors](#list-cmk-accessors) (`role_arn`),
then update your KMS key policy to allow Aiven to perform encrypt and decrypt
operations.

The key policy must include the following statement:

```json
{
  "Sid": "Allow Aiven to use this key for CMK operations",
  "Effect": "Allow",
  "Principal": {
    "AWS": "<aiven-role-arn>"
  },
  "Action": [
    "kms:Encrypt",
    "kms:Decrypt"
  ],
  "Resource": "*"
}
```

The full key policy must also retain the root account statement so that your IAM
policies can still manage the key:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM policies for key management",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<your-account-id>:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "Allow Aiven to use this key for CMK operations",
      "Effect": "Allow",
      "Principal": {
        "AWS": "<aiven-role-arn>"
      },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt"
      ],
      "Resource": "*"
    }
  ]
}
```

Apply the key policy:

```bash
aws kms put-key-policy \
  --key-id <key-id> \
  --policy-name default \
  --policy file://key-policy.json
```

:::note
You can revoke Aiven's access at any time by removing the Aiven principal from the key
policy, or by disabling or deleting the key. All KMS operations performed by Aiven are
logged in your AWS CloudTrail, giving you a full audit trail.
:::

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
| `provider`   | String | True     | Cloud provider hosting the KMS: `gcp`, `oci`, or `aws` |
| `resource` | String | True     | CMK reference (key identifier of max 512 characters). Format depends on provider: GCP resource name, OCI OCID, or AWS KMS key ARN |
| `default_cmk` | Boolean | False | Mark this key as default for new service creation |

#### Sample request (Google Cloud)

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "provider": "gcp",
        "resource": "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key",
        "default_cmk": true
      }'
```

#### Sample response (Google Cloud)

A successful request returns a `201 CREATED` status code and a JSON object representing
the newly registered CMK configuration, for example:

```json
{
  "cmk": {
    "id": "12345678-1234-1234-1234-12345678abcd",
    "provider": "gcp",
    "default_cmk": true,
    "resource": "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):

#### Sample request (Azure)

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "provider": "azure",
        "resource": "https://my-vault.vault.azure.net/keys/my-cmk-key",
        "default_cmk": true
      }'
```

#### Sample response (Azure)

```json
{
  "cmk": {
    "id": "12345678-1234-1234-1234-12345678abcd",
    "provider": "azure",
    "default_cmk": true,
    "resource": "https://my-vault.vault.azure.net/keys/my-cmk-key",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

-->

#### Sample request (AWS)

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_ID/secrets/cmks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer AIVEN_API_TOKEN" \
  -d '{
        "provider": "aws",
        "resource": "arn:aws:kms:us-east-1:123456789012:key/mrk-1234abcd12ab34cd56ef1234567890ab",
        "default_cmk": true
      }'
```

#### Sample response (AWS)

```json
{
  "cmk": {
    "id": "12345678-1234-1234-1234-12345678abcd",
    "provider": "aws",
    "default_cmk": true,
    "resource": "arn:aws:kms:us-east-1:123456789012:key/mrk-1234abcd12ab34cd56ef1234567890ab",
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
| `provider` | Provider type: `gcp`, `oci`, or `aws` |
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
| `--provider`   | String | True     | Cloud provider hosting the KMS: `gcp`, `oci`, or `aws` |
| `--resource` | String | True     | CMK reference. Format depends on provider: GCP resource name, OCI OCID, or AWS KMS key ARN |
| `--default-cmk` | Flag | False | Mark this key as default for new service creation |
| `--json`     | Flag   | False    | Output in JSON format |

#### Sample request (Google Cloud)

```bash
avn project cmks create \
  --project my-project \
  --provider gcp \
  --resource "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key" \
  --default-cmk
```

#### Sample output (Google Cloud)

Table format:

```txt
property      value
============  ================================================
id            12345678-1234-1234-1234-12345678abcd
provider      gcp
default_cmk   True
resource      projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key
status        current
created_at    YYYY-MM-DDTHH:MM:SSZ
updated_at    YYYY-MM-DDTHH:MM:SSZ
```

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):

#### Sample request (Azure)

```bash
avn project cmks create \
  --project my-project \
  --provider azure \
  --resource "https://my-vault.vault.azure.net/keys/my-cmk-key" \
  --default-cmk
```

-->

#### Sample request (AWS)

```bash
avn project cmks create \
  --project my-project \
  --provider aws \
  --resource "arn:aws:kms:us-east-1:123456789012:key/mrk-1234abcd12ab34cd56ef1234567890ab" \
  --default-cmk
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
| `provider` | Provider type: `gcp`, `oci`, or `aws` |
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

<!-- AZURE (not yet supported - re-enable when Azure BYOK is live):

#### Sample response (Azure)

```json
{
  "cmk": {
    "id": "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7",
    "provider": "azure",
    "default_cmk": false,
    "resource": "https://my-vault.vault.azure.net/keys/my-cmk-key",
    "status": "current",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ",
    "updated_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
}
```

-->

#### Sample response (AWS)

```json
{
  "cmk": {
    "id": "a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7",
    "provider": "aws",
    "default_cmk": false,
    "resource": "arn:aws:kms:us-east-1:123456789012:key/mrk-1234abcd12ab34cd56ef1234567890ab",
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
avn project cmks get --project PROJECT_NAME --cmk-id CMK_ID -v
```

For JSON output, use `--json` flag:

```bash
avn project cmks get --project PROJECT_NAME --cmk-id CMK_ID -v [--json]
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
  --cmk-id a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7 \
  -v
```

#### Sample output (OCI)

Table format:

```txt
ID                                    PROVIDER  RESOURCE                                                   DEFAULT_CMK  STATUS   CREATED_AT                   UPDATED_AT
====================================  ========  =========================================================  ===========  =======  ===========================  ===========================
12345678-1234-1234-1234-12345678abcd  oci       ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  false        current  2026-05-05T10:55:52.719109Z  2026-05-05T13:04:59.294447Z

Associated services:
SERVICE_NAME  STATUS
============  ======
my-pg         active
```

JSON format:

```json
{
    "created_at": "2026-05-05T10:55:52.719109Z",
    "default_cmk": false,
    "id": "12345678-1234-1234-1234-12345678abcd",
    "provider": "oci",
    "resource": "ocid1.key.oc1.iad.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "service_associations": [
        {
            "service_name": "my-pg",
            "status": "active"
        }
    ],
    "status": "current",
    "updated_at": "2026-05-05T13:04:59.294447Z"
}
```

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

Set `cloud` to control the cloud region for the new service.

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
| `cloud` | String | False | Cloud region for the service, for example `google-europe-west3` |
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
        "cloud": "google-europe-west3",
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
    "cloud_name": "google-europe-west3",
    "state": "REBUILDING",
    "cmk_id": "12345678-1234-1234-1234-12345678abcd"
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn service create \
  --project PROJECT_NAME \
  --service-type SERVICE_TYPE \
  --plan PLAN_NAME \
  --cloud CLOUD_NAME \
  --cmk-id CMK_ID \
  SERVICE_NAME
```

#### Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `--project` | String | True | Project name |
| `--service-type` | String | True | Type of service (for example, `pg`, `mysql`, `redis`) |
| `--plan` | String | True | Service plan |
| `--cloud` | String | False | Cloud region for the service |
| `--cmk-id` | String | False | Customer managed key (CMK) identifier |

#### Sample request

```bash
avn service create \
  --project my-project \
  --service-type pg \
  --plan startup-4 \
  --cloud google-europe-west3 \
  --cmk-id 12345678-1234-1234-1234-12345678abcd \
  my-pg-service
```

</TabItem>
<TabItem value="terraform" label="Terraform">

#### Resource

Use the `cmk_id` parameter in the service resource to associate a CMK at creation time.

#### Sample configuration

```terraform
resource "aiven_cmk" "example_key" {
  project      = "my-project"
  cmk_provider = "gcp"
  resource     = "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key"
  default_cmk  = false
}

resource "aiven_pg" "example" {
  project                = "my-project"
  service_name           = "my-pg-service"
  plan                   = "startup-4"
  cloud_name             = "google-europe-west3"
  cmk_id                 = aiven_cmk.example_key.cmk_id
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
    "cloud_name": "google-europe-west3",
    "state": "REBALANCING",
    "cmk_id": "87654321-4321-4321-4321-87654321dcba"
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn service update --project PROJECT_NAME --cmk-id CMK_ID SERVICE_NAME
```

#### Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `--project` | String | True | Project name |
| `--cmk-id` | String | False | Customer managed key (CMK) identifier. Pass `00000000-0000-0000-0000-000000000000` to remove the CMK association. |

#### Sample request (change CMK)

```bash
avn service update \
  --project my-project \
  --cmk-id 87654321-4321-4321-4321-87654321dcba \
  my-pg-service
```

#### Sample request (remove CMK association)

```bash
avn service update \
  --project my-project \
  --cmk-id 00000000-0000-0000-0000-000000000000 \
  my-pg-service
```

</TabItem>
<TabItem value="terraform" label="Terraform">

#### Resource

Update the `cmk_id` parameter in your service resource to change or remove CMK association.

#### Sample configuration (change CMK)

```terraform
resource "aiven_cmk" "example_key_new" {
  project      = "my-project"
  cmk_provider = "gcp"
  resource     = "projects/aiven-example/locations/us-central1/keyRings/example-keyring/cryptoKeys/example-key-v2"
  default_cmk  = false
}

resource "aiven_pg" "example" {
  project                = "my-project"
  service_name           = "my-pg-service"
  plan                   = "startup-4"
  cloud_name             = "google-europe-west3"
  cmk_id                 = aiven_cmk.example_key_new.cmk_id
}
```

#### Sample configuration (remove CMK)

```terraform
resource "aiven_pg" "example" {
  project                = "my-project"
  service_name           = "my-pg-service"
  plan                   = "startup-4"
  cloud_name             = "google-europe-west3"
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
    "cloud_name": "google-europe-west3",
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
    "cloud_name": "google-europe-west3",
    "state": "RUNNING",
    "cmk_id": null
  }
}
```

</TabItem>
<TabItem value="cli" label="CLI">

#### Command

```bash
avn service get --project PROJECT_NAME SERVICE_NAME
```

#### Sample output

The output is always in the JSON format:

```json
{
  "service": {
    "service_name": "my-pg-service",
    "service_type": "pg",
    "plan": "startup-4",
    "cloud_name": "google-europe-west3",
    "state": "RUNNING",
    "cmk_id": "12345678-1234-1234-1234-12345678abcd"
  }
}
```

If no CMK is associated with the service, the `cmk_id` value is empty or `null` in JSON
output:

```json
{
  "service": {
    "service_name": "my-mysql-service",
    "service_type": "mysql",
    "plan": "startup-4",
    "cloud_name": "google-europe-west3",
    "state": "RUNNING",
    "cmk_id": null
  }
}
```

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
