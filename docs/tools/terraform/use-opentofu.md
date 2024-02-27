---
title: Use OpenTofu with Aiven Provider for Terraform
---

OpenTofu


## Get started

-   [Sign up for
    Aiven](https://console.aiven.io/signup?utm_source=github&utm_medium=organic&utm_campaign=devportal&utm_content=repo)
-   [Install OpenTofu](https://opentofu.org/docs/intro/install/)
-   [Create an authentication
    token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)

## Configure your project and services




Set up the project in an empty folder:

1.  Create a new file, `provider.tf`, to declare a dependency
    on the Aiven Provider for Terraform.

    Add the following code to the file, specifying the
    [version](https://registry.terraform.io/providers/aiven/aiven/latest).

    ```terraform
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
    Aiven for Redis®\* service:

    ```terraform
    # Redis service

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

    Add the following code to declare the API token and project name
    variables:

    ```terraform
    variable "aiven_api_token" {
      description = "Aiven console API token"
      type        = string
    }

    variable "project_name" {
      description = "Aiven console project name"
      type        = string
    }
    ```

1.  Create a file named `terraform.tfvars` to define the values of the
    sensitive information.

    Add the following code, replacing `AIVEN_AUTHENTICATION_TOKEN` with
    your API token and `AIVEN_PROJECT_NAME` with the name of your
    project:

    ```terraform
    aiven_api_token = "AIVEN_AUTHENTICATION_TOKEN"
    project_name    = "AIVEN_PROJECT_NAME"
    ```

## Plan and apply the configuration {#plan-and-apply}

1.  The `init` command prepares the working directly for use with
    OpenTofu. Run this command to automatically find, download, and
    install the necessary Aiven Provider plugins:

    ```bash
    tofu init
    ```

1.  Run the `plan` command to create an execution plan and preview the
    changes that will be made. This shows you what resources will be
    created or modified:

    ```bash
    tofu plan
    ```

    The output is similar to the following:

    ```bash

    ```

1.  To create the resources, run:

    ```bash
    tofu apply --auto-approve
    ```

    The output is similar to the following:

    ```bash
    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
    ```

You can also see the new Redis service in the [Aiven
Console](https://console.aiven.io).

## Clean up

To delete the service and its data:

1.  Create a destroy plan and preview the changes to your infrastructure
    with the following command:

    ```bash
    tofu plan -destroy
    ```

1.  To delete the resources and all data, run:

    ```bash
    tofu destroy
    ```

1.  Enter **yes** to confirm. The output is similar to the
    following:

    ```bash
    Do you really want to destroy all resources?
    Terraform will destroy all your managed infrastructure, as shown above.
    There is no undo. Only 'yes' will be accepted to confirm.

    Enter a value: yes
    ...
    Destroy complete! Resources: 1 destroyed.
    ```

## Related pages

-   [Migrate your Terraform resources to OpenTofu](https://opentofu.org/docs/intro/migration/).
-   Try [another sample
    project](https://github.com/aiven/terraform-provider-aiven/blob/main/sample_project/sample.tf).
