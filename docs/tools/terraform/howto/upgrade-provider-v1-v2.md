---
title: Upgrade Aiven Provider for Terraform from v1 to v2
sidebar_label: Upgrade from v1 to v2
---

Learn how to upgrade Aiven Terraform Provider v1 to v2.

Version 2 of the Aiven Terraform Provider was released in [October of 2020](https://aiven.io/blog/aiven-terraform-provider-v2-release).
To handle the various versions of Terraform, we suggest
[`tfenv`]((https://github.com/tfutils/tfenv) but you can also use direct releases from HashiCorp.

## Major changes in v2

Aiven Terraform Provider has a [detailed
changelog](https://github.com/aiven/terraform-provider-aiven/blob/master/CHANGELOG.md)
but the main additions in v2 are:

-   Billing Groups have been introduced instead of needing to provide
    Card ID
-   Work is being done to deprecate `aiven_service` in order to support
    individual service configuration better, using `aiven_kafka` for
    example
-   New services are available in the updated Provider, such as
    `aiven_flink` and `aiven_opensearch`.

## Upgrade Aiven Terraform Provider to v2

Update the Aiven Terraform Provider by editing the providers block of
your script to include the latest version of the Aiven Terraform
Provider (v2.3.1 at the time of writing):

```hcl
terraform {
  required_providers {
    aiven = {
      source  = "aiven/aiven"
      version = ">=3.0.0, < 4.0.0"
    }
  }
}
```

## Upgrade Terraform

We recommend keeping your Terraform version up to date.

## Upgrade Terraform 0.12 to 0.13

Between v0.12 and v0.13, the syntax of Terraform files changed. If you
have the older syntax, update it:

1.  Upgrade your modules first by installing Terraform v0.13.x:
    `tfenv install 0.13.7 && tfenv use 0.13.7` and using
    `0.13upgrade` tool.

1.  Update `required_version` from `>= 0.12` to `>= 0.13` in the
    requirements block.

1.  Update the existing state file, by running:

    `terraform state replace-provider registry.terraform.io/-/aiven registry.terraform.io/aiven/aiven`
    you will replace old Aiven Terraform Provider references to the new
    format.

1.  Run `terraform 0.13upgrade` to see any additional fixes recommended
    by HashiCorp. If you are using more providers than Aiven Provider
    you most likely need to upgrade them as well. See
    [Upgrading to Terraform v0.13](https://www.terraform.io/upgrade-guides/0-13.html).

1.  Run `terraform init -upgrade`

    ![Screenshot of the upgrade command in action](/images/content/tools/terraform/terraform-upgrade.jpg)

    You may see warnings or errors like the above, these will point
    towards changes made between the release you are running and the
    latest release.

    The warnings will provide recommendations on the changes to make and
    you can get more information using our
    [docs](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

    Now we can remove the old Terraform folder `rm -rf ~/.terraform.d`.

1.  As the last step run `terraform plan`

## Upgrade Terraform from 0.13 or later

Any version above 0.13 can be upgraded to latest without any special
steps.

:::note
If you are using Aiven Terraform Provider v1 with Terraform 0.14
[`dev_overrides`](https://www.terraform.io/cli/config/config-file), add Aiven Provider to the `exclude` block or remove
`dev_overrides` completely.
:::

1.  Use `tfenv` to get the latest version (1.0.10 at the time of
    writing) `tfenv install latest && tfenv use latest`
1.  Run `terraform init -upgrade`
1.  Run `terraform plan`

## Update to service specific resource syntax

<!-- vale off -->
V2 of the Aiven Terraform Provider moves away from using `aiven_service`
as a resource, and instead provides specific service resources such as
`aiven_kafka`. Since we probably don't want to destroy the existing
resources and making new ones, this guide will help you perform the
migration safely.

:::warning
Since `aiven_service` and the new services such as `aiven_kafka` are
different kinds of resources, rewriting the code would cause
destructive actions. These steps will preserve your resources.
:::
<!-- vale on -->
Running `terraform state mv <a> <b>` is not
recommended because these are different resource types.

To safely make this change:

-   Change the code first
-   Backup your Terraform state file (if available), just in case of
    potential rollback
-   Remove old resource from the state
-   Import already existing service to the Terraform state.

1.  To change from the old `aiven_service` to the new `aiven_kafka`
    resource, the resource type should be changed, and the old
    `service_type` field removed. Any references to
    `aiven_service.kafka.*` should be updated to instead read
    `aiven_kafka.kafka.*` instead. Output example:

    ```
    - resource "aiven_service" "kafka" {
    -    service_type            = "kafka"
    + resource "aiven_kafka" "kafka" {
        ...
    }
    resource "aiven_service_user" "kafka_user" {
      project      = var.aiven_project_name
    -  service_name = aiven_service.kafka.service_name
    +  service_name = aiven_kafka.kafka.service_name
      username     = var.kafka_user_name
    }
    ```

1.  Check the current state of the world:

    ```
    terraform state list | grep kf
    ```

1.  Remove the service from the control of Terraform, and write a backup
    of the state into your local directory:

    ```
    terraform state rm -backup=./ aiven_service.kafka
    ```

    :::tip
    Use the `-dry-run` flag to see this change before it is actually
    made
    :::

1.  Add the service back to Terraform by importing it as a new service
    with the new service type:

    ```
    terraform import aiven_kafka.kafka demo-project/existing-kafka
    ```

1.  Check that the import is going to run as you expect:

    ```
    terraform plan
    ```

1.  Apply the new configuration:

    ```
    terraform apply
    ```

## Further reading

There are examples of migrating each of the available service types on
the [Aiven examples
repository](https://github.com/aiven/aiven-examples/tree/master/terraform)
on GitHub.
