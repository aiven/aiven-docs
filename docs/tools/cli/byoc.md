---
title: avn byoc
---

Set up and manage your [custom clouds](/docs/platform/concepts/byoc) using the Aiven client and `avn byoc` commands.

## Manage a custom cloud

### `avn byoc create`

[Creates a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in an organization.

| Parameter           | Required | Information                                                                                                                                                              |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--organization-id` | Yes      | Identifier of an organization where to create the custom cloud                                                                                                           |
| `--deployment-model`| Yes      | Determines the [deployment model](/docs/platform/concepts/byoc#byoc-architecture), for example `standard` (the default deployment model with a private workload network)   |
| `--cloud-provider`  | Yes      | Cloud provider to be used for running the custom cloud, for example`aws` (Amazon Web Services)                                                                           |
| `--cloud-region`    | Yes      | Cloud region where to create the custom cloud, for example `eu-west-1`                                                                                                   |
| `--reserved-cidr`   | Yes      | IP address range of the VPC to be created in your cloud account for Aiven services hosted on a custom cloud                                                              |
| `--display-name`    | Yes      | Name of the custom cloud                                                                                                                                                 |

### `avn byoc delete`

Deletes a custom cloud from an organization.

| Parameter           | Required | Information                                                               |
| ------------------- | -------- | ------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to delete the custom cloud            |
| `--byoc-id`         | Yes      | Identifier of the custom cloud to be deleted                              |

### `avn byoc list`

Returns a list of all the custom clouds in an organization.

| Parameter          | Required | Information                                                              |
| ------------------ | -------- | ------------------------------------------------------------------------ |
| `--organization-id`| Yes      | Identifier of an organization                                            |

### `avn byoc provision`

Provisions resources for a custom cloud.

| Parameter                                      | Required | Information                                                                                               |
| ---------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `--organization-id`                            | Yes      | Identifier of an organization where to modify the custom cloud                                            |
| `--byoc-id`                                    | Yes      | Identifier of the custom cloud to be modified                                                             |
| `--aws-iam-role-arn`                           | Yes      | Identifier of the role created when running the infrastructure template in your AWS account               |
| `--google-privilege-bearing-service-account-id`| Yes      | Identifier of the service account created when running the infrastructure template in your Google account |

### `avn byoc update`

Modifies a custom cloud configuration.

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify the custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of the custom cloud to be modified                                                                           |
| `--deployment-model`| No       | Private or public network architecture model defining how resources are arranged and connected to your cloud provider   |
| `--cloud-provider`  | No       | Cloud provider running the custom cloud                                                                                 |
| `--cloud-region`    | No       | Cloud region where the custom cloud runs                                                                                |
| `--reserved-cidr`   | No       | IP address range of the VPC in your cloud account for Aiven services created in the custom cloud                        |
| `--display-name`    | No       | Name of the custom cloud                                                                                                |

## Tag a custom cloud

Custom cloud tags are key-value pairs that you can attach to your custom cloud for resource
categorization. They propagate to resources on the Aiven platform and in your own cloud
infrastructure. Custom cloud tags are cascaded to bastion nodes and disks in private
[deployment models](https://aiven.io/docs/platform/concepts/byoc#byoc-architecture).

### `avn byoc tags list`

Returns infrastructure tags attached to a custom cloud.

**Syntax**

```bash
avn byoc tags list                              \
    --organization-id "ORGANIZATION_IDENTIFIER" \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER"
```

**Parameters**

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify the custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of the custom cloud to be modified                                                                           |

### `avn byoc tags update`

Adds, updates, or removes infrastructure tags on a custom cloud.

**Syntax**

```bash
avn byoc tags update                            \
    --organization-id "ORGANIZATION_IDENTIFIER" \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER"         \
    --add-tag TAG_KEY_A=TAG_VALUE_A             \
    --remove-tag TAG_KEY_B
```

**Parameters**

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify the custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of the custom cloud to be modified                                                                           |
| `--add-tag`         | No       | Adds or updates key-value pairs on a custom cloud for resource categorization                                           |
| `--remove-tag`      | No       | Deletes key-value pairs attached to a custom cloud                                                                      |

### `avn byoc tags replace`

Replaces all existing tags with new ones.

**Syntax**

```bash
avn byoc tags replace                           \
    --organization-id "ORGANIZATION_IDENTIFIER" \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER"         \
    --tag TAG_KEY_A=TAG_VALUE_A
```

**Parameters**

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify the custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of the custom cloud to be modified                                                                           |
| `--tag`             | Yes      | Key-value pair that replaces all existing key-value pairs attached to a custom cloud                                    |

## Manage custom cloud permissions

### `avn byoc cloud permissions add`

Adds new permissions to use the custom cloud in projects or accounts (organizational units)
while keeping any existing permissions in place.

| Parameter           | Required | Information                                                                                                                                                                            |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where the custom cloud is located                                                                                                                        |
| `--byoc-id`         | Yes      | Identifier of the custom cloud for which to grant the new permissions                                                                                                                  |
| `--account`         | No       | Identifier of your account (organizational unit) for which the new permissions are granted                                                                                             |
| `--project`         | No       | Name of the project for which to grant permissions                                                                                                                                     |

### `avn byoc cloud permissions get`

Retrieves permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where the custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of the custom cloud for which to retrieve permissions details                                                |

### `avn byoc cloud permissions remove`

Revokes permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where the custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of the custom cloud for which to revoke permissions                                                          |
| `--account`         | No       | Identifier of your account (organizational unit) for which the permissions are revoked                                  |
| `--project`         | No       | Name of the project for which to revoke permissions                                                                     |

### `avn byoc cloud permissions set`

<!-- vale off -->
Replaces all permissions there may be for using the custom cloud in projects or accounts
(organizational units). After you run this command successfully, there are no permissions
other than the ones you've just granted using this command.
<!-- vale on -->

| Parameter           | Required | Information                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where the custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of the custom cloud for which to set permissions                                                             |
| `--account`         | No       | Identifier of your account (organizational unit) for which the permissions are replaced                                 |
| `--project`         | No       | Name of the project for which to set permissions                                                                        |

## Manage an infrastructure template

Manage a custom cloud Terraform infrastructure template.

### `avn byoc template terraform get-template`

Downloads a custom cloud Terraform template.

| Parameter           | Required | Information                                                               |
| ------------------- | -------- | ------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where the custom cloud is located           |
| `--byoc-id`         | Yes      | Identifier of the custom cloud for which to download a Terraform template |

### `avn byoc template terraform get-vars`

Downloads a custom cloud Terraform variables file.

| Parameter           | Required | Information                                                               |
| ------------------- | -------- | ------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where the custom cloud is located           |
| `--byoc-id`         | Yes      | Identifier of the custom cloud for which to download a variable file      |
