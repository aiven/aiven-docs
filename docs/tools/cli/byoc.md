---
title: avn byoc
---

Set up and manage your [custom clouds](/docs/platform/concepts/byoc) using the Aiven client and `avn byoc` commands.

## Manage a custom cloud

### `avn byoc create`

[Creates a custom cloud](/docs/platform/howto/byoc/create-custom-cloud) in an organization.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to create a custom clouds                                                         |
| `--deployment-model`| Yes      | Private or public network architecture model defining how resources are arranged and connected to your cloud provider |
| `--cloud-provider`  | Yes      | Cloud provider to be used for running a custom cloud                                                                  |
| `--cloud-region`    | Yes      | Cloud region where to create a custom cloud                                                                           |
| `--reserved-cidr`   | Yes      | IP address range of the VPC to be created in your cloud account for Aiven services hosted on a custom cloud           |
| `--display-name`    | Yes      | Name of a custom cloud                                                                                                |

### `avn byoc delete`

Deletes a custom cloud from an organization.

| Parameter           | Required | Information                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to delete a custom cloud            |
| `--byoc-id`         | Yes      | Identifier of a custom cloud to be deleted                              |

### `avn byoc list`

Returns a list of all the custom clouds in an organization.

| Parameter          | Required | Information                                                              |
| ------------------ | -------- | ------------------------------------------------------------------------ |
| `--organization-id`| Yes      | Identifier of an organization where to check for available custom clouds |

### `avn byoc provision`

Provisions resources for a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify a custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of a custom cloud to be modified                                                                           |
| `--aws-iam-role-arn`| No       | Identifier of the role created when running the infrastructure template in your AWS account                           |

### `avn byoc update`

Modifies a custom cloud configuration.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify a custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of a custom cloud to be modified                                                                           |
| `--deployment-model`| No       | Private or public network architecture model defining how resources are arranged and connected to your cloud provider |
| `--cloud-provider`  | No       | Cloud provider running a custom cloud                                                                                 |
| `--cloud-region`    | No       | Cloud region where a custom cloud runs                                                                                |
| `--reserved-cidr`   | No       | IP address range of the VPC in your cloud account for Aiven services created in a custom cloud                        |
| `--display-name`    | No       | Name of a custom cloud                                                                                                |

## Manage custom cloud permissions

### `avn byoc cloud permissions add`

Grants permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to grant permissions                                                           |
| `--account`         | No       | Identifier of your account                                                                                            |
| `--project`         | No       | Name of the project for which to grant permissions                                                                    |

### `avn byoc cloud permissions get`

Retrieves permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to retrieve permissions details                                                |

### `avn byoc cloud permissions remove`

Revokes permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to revoke permissions                                                          |
| `--account`         | No       | Identifier of your account                                                                                            |
| `--project`         | No       | Name of the project for which to revoke permissions                                                                   |

### `avn byoc cloud permissions set`

Modifies permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to set permissions                                                             |
| `--account`         | No       | Identifier of your account                                                                                            |
| `--project`         | No       | Name of the project for which to set permissions                                                                      |

## Manage an infrastructure template

Manage a custom cloud Terraform infrastructure template.

### `avn byoc templete terraform get-template`

Downloads a custom cloud Terraform template.

| Parameter           | Required | Information                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located           |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to download a Terraform template |

### `avn byoc templete terraform get-vars`

Downloads a custom cloud variables file.

| Parameter           | Required | Information                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located           |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to download a variable file      |
