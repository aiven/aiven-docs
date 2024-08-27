---
title: Use OpenTofu with Aiven Provider for Terraform
sidebar_label: Use OpenTofu
---

[OpenTofu](https://opentofu.org/) is an open source infrastructure-as-code tool that you can use to configure your Aiven infrastructure.

Set up your first Aiven project and service using this example to get started with
OpenTofu. If you already use the [Aiven Provider for Terraform](/docs/tools/terraform),
you can [migrate your Terraform resources to OpenTofu](https://opentofu.org/docs/intro/migration/).

## Prerequisites

-   [Sign up for
    Aiven](https://console.aiven.io/signup?utm_source=github&utm_medium=organic&utm_campaign=devportal&utm_content=repo)
-   [Install OpenTofu](https://opentofu.org/docs/intro/install/)
-   [Create a token](/docs/platform/howto/create_authentication_token)

## Configure your project and services

Set up the OpenTofu project in an empty folder:

1.  Create a file, `provider.tf`, and add the following code to declare a dependency
    on the Aiven Provider, specifying the
    [version](https://registry.terraform.io/providers/aiven/aiven/latest).

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
      api_token = var.aiven_token
    }
    ```

1.  Create a file named `project.tf` and add the following code to create an Aiven project
    in your organization:

    ```hcl
     # Get information about your organization
     data "aiven_organization" "main" {
      name = "ORGANIZATION_NAME"
     }
     # Create a new project in your organization
     resource "aiven_project" "example_project" {
      project    = "ORGANIZATION_NAME-example-project"
      parent_id = data.aiven_organization.main.id
     }
    ```

    Where `ORGANIZATION_NAME` is your
    [Aiven organization](/docs/platform/concepts/orgs-units-projects) name.

1.  Create a file named `service.tf` and add the following code to define the configuration
    of an [Aiven for PostgreSQL®](/docs/products/postgresql) service:

    ```hcl
    resource "aiven_pg" "pg" {
      project                 = aiven_project.example_project.project
      cloud_name              = "google-europe-west1"
      plan                    = "startup-4"
      service_name            = "example-pg"
      maintenance_window_dow  = "monday"
      maintenance_window_time = "10:00:00"

      pg_user_config {
        pg {
          idle_in_transaction_session_timeout = 900
          log_min_duration_statement          = -1
        }
      }
    }
    ```

1.  Create a file named `variables.tf` and add the following code to declare the Aiven
    token variable:

    ```hcl
    variable "aiven_token" {
      description = "Aiven token"
      type        = string
    }
    ```

1.  Create a file named `terraform.tfvars` with the following code to store the
    token value:

    ```hcl
    aiven_token = "AIVEN_TOKEN"
    ```

    Where `AIVEN_TOKEN` is your token.

## Plan and apply the configuration {#plan-and-apply}

1.  The `init` command prepares the working directly for use with
    OpenTofu. Use it to automatically find, download, and
    install the necessary Aiven Provider plugins:

    ```bash
    tofu init
    ```

1.  Run the `plan` command to create an execution plan and preview the
    changes. This shows you what resources OpenTofu will create or modify:

    ```bash
    tofu plan
    ```

    The output is similar to the following:

    ```bash
    OpenTofu used the selected providers to generate the following execution plan.
    ...
    Plan: 2 to add, 0 to change, 0 to destroy.
    ```

1.  To create the resources, run:

    ```bash
    tofu apply --auto-approve
    ```

    The output is similar to the following:

    ```bash
    Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
    ```

You can also see the PostgreSQL service in the [Aiven Console](https://console.aiven.io).

## Clean up

To delete the project, service, and data:

1.  Create a destroy plan and preview the changes to your infrastructure
    with the following command:

    ```bash
    tofu plan -destroy
    ```

1.  To delete the resources and all data, run:

    ```bash
    tofu destroy
    ```

1.  Enter **yes** to confirm. The output is similar to the following:

    ```bash
    Do you really want to destroy all resources?
    OpenTofu will destroy all your managed infrastructure, as shown above.
    There is no undo. Only 'yes' will be accepted to confirm.

    Enter a value: yes
    ...
    Destroy complete! Resources: 2 destroyed.
    ```

## Related pages

-   Try OpenTofu with [another sample
    project](https://github.com/aiven/terraform-provider-aiven/blob/main/sample_project/sample.tf).
