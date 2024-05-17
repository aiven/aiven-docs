---
title: Use PostgreSQL® Provider to configure Aiven for PostgreSQL services
sidebar_label: Use PostgreSQL® Provider
---

Use the [PostgreSQL Provider for Terraform](https://registry.terraform.io/providers/cyrilgdn/postgresql/latest/docs) to configure settings such as default privileges, publication, or to reuse a submodule between different vendors.

You can create an Aiven for PostgreSQL® service with the
[Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
and configure it with the PostgreSQL Provider.

1.  Add the PostgreSQL Provider and Aiven Provider to the `required_providers` block:

    ```hcl
    terraform {
      required_providers {
        aiven = {
          source  = "aiven/aiven"
          version = ">=4.0.0, < 5.0.0"
        }
        postgresql = {
          source  = "cyrilgdn/postgresql"
          version = "1.16.0"
        }
      }
    }
    ```

1.  Set the service connection attributes in the `provider` block:

    ```hcl
    # Create the Aiven service
    resource "aiven_pg" "example_pg" {
      project                 = "example-project"
      cloud_name              = "google-asia-southeast1"
      plan                    = "business-8"
      service_name            = "example-pg"
      termination_protection  = true
    }

    # Configure the PostgreSQL Provider by referencing the Aiven service resource
    provider "postgresql" {
      host            = aiven_pg.example_pg.service_host
      port            = aiven_pg.example_pg.service_port
      database        = aiven_pg.example_pg.pg.dbname
      username        = aiven_pg.example_pg.service_username
      password        = aiven_pg.example_pg.service_password
      sslmode         = "require"
      connect_timeout = 15
    }
    ```

1.  Create a PostgreSQL role using the Terraform resource `postgresql_role.my_role`:

    ```hcl
    resource "postgresql_role" "example_role" {
      name     = "example-role"
    }
    ```
