---
title: Get started with Aiven Provider for Terraform
keywords: [quick start, Terraform]
sidebar_label: Get started
---

This example shows you how to use the Aiven Terraform Provider to set up your data infrastructure by creating a single Aiven for Caching service in an [Aiven project](/docs/platform/concepts/orgs-units-projects).

:::caution
Recreating stateful services with Terraform may delete the service and
all its data before creating it again. Some properties, like project and
resource name, cannot be changed and it will trigger a resource
replacement. Run the Terraform
[plan command](/docs/tools/terraform/get-started#plan-and-apply) to find
out whether a service will be deleted or replaced.

You can set the `termination_protection` property to true on production
services, topics, and databases to prevent Terraform from removing them.
However, logical databases, topics, or other configurations may still be
removed even with this setting enabled.
:::

## Prerequisites

-   [Sign up for
    Aiven](https://console.aiven.io/signup?utm_source=github&utm_medium=organic&utm_campaign=devportal&utm_content=repo)
-   [Download and install Terraform](https://www.terraform.io/downloads)
-   [Create a token](/docs/platform/howto/create_authentication_token)

## Configure your project and services

In this section, you'll learn how to structure a simple Terraform
project.

Terraform files declare the structure of the infrastructure, the
dependencies, and configuration. These can be grouped together in one
file, but it's ideal to put them in separate files.

Set up the Terraform project in an empty folder:

1.  Create a Terraform file, `provider.tf`, to declare a dependency
    on the Aiven Provider for Terraform.

    Add the following code to the file and specify the version in the
    `required_providers` block. The latest version is shown on the
    [Aiven Provider page](https://registry.terraform.io/providers/aiven/aiven/latest).

    ```hcl
    terraform {
      required_providers {
        aiven = {
          source  = "aiven/aiven"
          version = ">=4.0.0, < 5.0.0"
        }
      }
    }

    provider "aiven" {
      api_token = var.aiven_api_token
    }
    ```

1.  Create a file named `redis.tf`.

    Add the following code to define the configuration of a single-node
    Aiven for Caching service:

    ```hcl
    # Caching service

    resource "aiven_redis" "single-node-aiven-redis" {
      project                 = var.project_name
      cloud_name              = "google-northamerica-northeast1"
      plan                    = "startup-4"
      service_name            = "gcp-single-node-redis1"
      maintenance_window_dow  = "monday"
      maintenance_window_time = "10:00:00"

      redis_user_config {
        redis_maxmemory_policy = "allkeys-random"

        public_access {
          redis = true
        }
      }
    }
    ```

1.  Create a file named `variables.tf`. This is used to avoid including
    sensitive information in source control.

    Add the following code to declare the token and project name
    variables:

    ```hcl
    variable "aiven_api_token" {
      description = "Aiven token"
      type        = string
    }

    variable "project_name" {
      description = "Aiven console project name"
      type        = string
    }
    ```

1.  Create a file named `terraform.tfvars` to define the values of the
    sensitive information.

    Add the following code, replacing `AIVEN_TOKEN` with
    your token and `AIVEN_PROJECT_NAME` with the name of your
    project:

    ```hcl
    aiven_api_token = "AIVEN_TOKEN"
    project_name    = "AIVEN_PROJECT_NAME"
    ```

## Plan and apply the configuration {#plan-and-apply}

1.  The `init` command prepares the working directly for use with
    Terraform. Use it to automatically find, download, and
    install the necessary Aiven Provider plugins:

    ```bash
    terraform init
    ```

1.  Run the `plan` command to create an execution plan and preview the
    changes that will be made (for example, what resources will be
    created or modified):

    ```bash
    terraform plan
    ```

1.  To create the resources, run:

    ```bash
    terraform apply --auto-approve
    ```

The output will be similar to the following:

```bash
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

You can also see the new Caching service in the [Aiven
Console](https://console.aiven.io).

## Clean up

To delete the service and its data:

1.  Create a destroy plan and preview the changes to your infrastructure
    with the following command:

    ```bash
    terraform plan -destroy
    ```

1.  To delete the resources and all data, run:

    ```bash
    terraform destroy
    ```

1.  Enter \"yes\" to confirm. The output will be similar to the
    following:

    ```bash
    Do you really want to destroy all resources?
    Terraform will destroy all your managed infrastructure, as shown above.
    There is no undo. Only 'yes' will be accepted to confirm.

    Enter a value: yes
    ...
    Destroy complete! Resources: 1 destroyed.
    ```

## Next steps

-   Try [another sample
    project](https://github.com/aiven/terraform-provider-aiven/blob/main/sample_project/sample.tf)
    to set up integrated Aiven for Kafka®, PostgreSQL®, and
    Grafana® services.
-   Read the [Aiven Provider for Terraform
    docs](https://www.terraform.io/language/modules/develop/structure)
    to learn about more complex project structures.
-   [Import your existing Aiven
    resources](https://registry.terraform.io/providers/aiven/aiven/latest/docs/guides/importing-resources)
    to Terraform.
