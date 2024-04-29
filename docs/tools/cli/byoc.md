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

#### `avn byoc create` example

```bash
avn byoc create
  --organization-id org45aeaa2ebf8
  --deployment-model
  --cloud-provider
  --cloud-region
  --reserved-cidr
  --display-name
```

#### `avn byoc create` sample output

```text
BYOC_ID                               STATE     CLOUD_NAME     NETWORK_CIDR
====================================  ========  =============  ============
1548c3f6-6240-45ab-892f-2dfacc62ed0d  APPROVED  aws-us-west-1  10.1.2.0/24
```

### `avn byoc delete`

Deletes a custom cloud from an organization.

| Parameter           | Required | Information                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to delete a custom cloud            |
| `--byoc-id`         | Yes      | Identifier of a custom cloud to be deleted                              |

#### `avn byoc delete` example

```bash
avn byoc delete
  --organization-id org45aeaa2ebf8
  --byoc-id
```

#### `avn byoc delete` sample output

```text
```

### `avn byoc list`

Returns a list of all the custom clouds in an organization.

| Parameter          | Required | Information                                                              |
| ------------------ | -------- | ------------------------------------------------------------------------ |
| `--organization-id`| Yes      | Identifier of an organization where to check for available custom clouds |

#### `avn byoc list` example

```bash
avn byoc list
  --organization-id org45aeaa2ebf8
```

#### `avn byoc list` sample output

```text
BYOC_ID                               CLOUD_NAME          NETWORK_CIDR   STATE
====================================  ==================  =============  ======
b132dfbf-b035-4cf5-8b15-b7cd6a68aqqd  aws-us-east-1       10.2.1.0/24    ACTIVE
c36a0a6a-6cfb-4718-93ce-ec043ae94qq5  aws-us-west-2       10.13.4.0/24   ACTIVE
d7a984bf-6ebf-4503-bbbd-e7950c49bqqb  azure-eastus        10.213.2.0/24  ACTIVE
f99601f3-4b00-44d6-b4d9-6f16e9f55qq8  google-us-central1  10.1.13.0/24   ACTIVE
8af49368-3125-48a8-b94e-3d1a3d601qqf  google-us-east1     10.50.8.0/24   ACTIVE
6ba650ce-cc08-4e0a-a386-5a354c327qq6  google-us-east4     10.1.17.0/24   ACTIVE
c4bc3a59-87da-4dce-9243-c197edb43qq2  google-us-west3     10.1.13.0/24   ACTIVE
```

### `avn byoc provision`

Provisions resources for a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where to modify a custom cloud                                                          |
| `--byoc-id`         | Yes      | Identifier of a custom cloud to be modified                                                                           |
| `--aws-iam-role-arn`| No       | Identifier of the role created when running the infrastructure template in your AWS account                           |

#### `avn byoc provision` example

```bash
avn byoc provision
  --organization-id org45aeaa2ebf8
  --byoc-id
  --aws-iam-role-arn
```

#### `avn byoc provision` sample output

```text
```

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

#### `avn byoc update` example

```bash
avn byoc update
```

#### `avn byoc update` sample output

```text
```

## Manage custom cloud permissions

### `avn byoc cloud permissions add`

Grants permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to grant permissions                                                           |
| `--account`         | No       | Identifier of your account                                                                                            |
| `--project`         | No       | Name of the project for which to grant permissions                                                                    |

#### `avn byoc cloud permissions add` example

```bash
avn byoc cloud permissions add
```

#### `avn byoc cloud permissions add` sample output

```text
```

### `avn byoc cloud permissions get`

Retrieves permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to retrieve permissions details                                                |

#### `avn byoc cloud permissions get` example

```bash
avn byoc cloud permissions get
```

#### `avn byoc cloud permissions get` sample output

```text
```

### `avn byoc cloud permissions remove`

Revokes permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to revoke permissions                                                          |
| `--account`         | No       | Identifier of your account                                                                                            |
| `--project`         | No       | Name of the project for which to revoke permissions                                                                   |

#### `avn byoc cloud permissions revoke` example

```bash
avn byoc cloud permissions revoke
```

#### `avn byoc cloud permissions revoke` sample output

```text
```

### `avn byoc cloud permissions set`

Modifies permissions to a custom cloud.

| Parameter           | Required | Information                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located                                                         |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to set permissions                                                             |
| `--account`         | No       | Identifier of your account                                                                                            |
| `--project`         | No       | Name of the project for which to set permissions                                                                      |

#### `avn byoc cloud permissions set` example

```bash
avn byoc cloud permissions set
```

#### `avn byoc cloud permissions set` sample output

```text
```

## Manage an infrastructure template

Manage a custom cloud Terraform infrastructure template.

### `avn byoc templete terraform get-template`

Downloads a custom cloud Terraform template.

| Parameter           | Required | Information                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located           |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to download a Terraform template |

#### `avn byoc templete terraform get-template` example

```bash
avn byoc templete terraform get-template
```

#### `avn byoc templete terraform get-template` sample output

```text
```

### `avn byoc templete terraform get-vars`

Downloads a custom cloud variables file.

| Parameter           | Required | Information                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `--organization-id` | Yes      | Identifier of an organization where a custom cloud is located           |
| `--byoc-id`         | Yes      | Identifier of a custom cloud for which to download a variable file      |

#### `avn byoc templete terraform get-vars` example

```bash
avn byoc templete terraform get-vars
```

#### `avn byoc templete terraform get-vars` sample output

```text
```
