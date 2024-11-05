---
title: Update Terraform after upgrading Aiven for Caching to Aiven for Valkey™
sidebar_label: Update Terraform configuration after Valkey upgrade
---

Update Terraform configuration and state after upgrading from Aiven for Caching to Aiven for Valkey™.
Ensure your infrastructure setup accurately reflects the upgraded service for
seamless management and deployment.

## Prerequisites

- Verify that you have upgraded your Aiven for Caching service to [Aiven for Valkey through the Aiven Console or API](/docs/products/caching/howto/upgrade-aiven-for-caching-to-valkey).
- Ensure you have the latest version of [Terraform](/docs/tools/terraform) installed.
- Review the [Aiven Redis resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/redis)
  and the [Aiven Valkey resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/valkey).

## Step 1: Modify the Terraform Configuration

   - Replace `aiven_redis` and `aiven_redis_user` resources in your configuration
     with `aiven_valkey` and `aiven_valkey_user`.
   - Update Aiven for Caching-specific configuration parameters to their
     Aiven for Valkey equivalents. For example, change `redis_timeout` to `valkey_timeout`.

     **Example configuration:**

     ```hcl
     # Before: Aiven for Caching configuration
     resource "aiven_redis" "caching_service" {
       project      = "PROJECT_NAME"
       cloud_name   = "CLOUD_REGION"
       plan         = "PLAN_NAME"
       service_name = "SERVICE_NAME"
       redis_user_config {
         redis_timeout = 300
       }
     }
     ```

     ```hcl
     # After: Aiven for Valkey configuration
     resource "aiven_valkey" "caching_service" {
       project      = "PROJECT_NAME"
       cloud_name   = "CLOUD_REGION"
       plan         = "PLAN_NAME"
       service_name = "SERVICE_NAME"
       valkey_user_config {
         valkey_timeout = 300
       }
     }
     ```

## Step 2: Update the Terraform state

   1. Import each Aiven for Valkey resource into the Terraform state:

      ```bash
      terraform import aiven_valkey.valkey_service PROJECT_NAME/SERVICE_NAME
      ```

   1. Import users associated with the Aiven for Valkey service. For each user, run:

      ```bash
      terraform import aiven_valkey_user.user PROJECT_NAME/SERVICE_NAME/USERNAME
      ```

   1. Remove any Aiven for Caching resources from the Terraform state to prevent
      duplicates:

      ```bash
      terraform state rm aiven_redis.caching_service
      ```

## Step 3: Verify and apply changes

   1. Run `terraform plan` to confirm that the state and configuration are aligned:

      ```bash
      terraform plan
      ```

   1. Apply the changes to finalize the update:

      ```bash
      terraform apply
      ```
