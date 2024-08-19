---
title: Upgrade Aiven Provider for Terraform from v3 to v4
sidebar_label: Upgrade from v3 to v4
---

Learn how to upgrade Aiven Terraform Provider v3 to v4.

The Aiven Terraform Provider version 4.0.0 was released in February 2023.

## Major changes in v4

Aiven Terraform Provider has a [detailed
changelog](https://github.com/aiven/terraform-provider-aiven/blob/main/CHANGELOG.md)
but the main changes in v4 are:

-   schema fields use strict types instead of string
-   support for strict types in diff functions

These deprecated resources have also been removed:

-   `aiven_database`
-   `aiven_service_user`
-   `aiven_vpc_peering_connection`
-   `aiven_flink_table`
-   `aiven_flink_job`

## Upgrade Aiven Terraform Provider to v4

You update the Aiven Terraform Provider by editing the providers block
of your script. If the version was already set to `>= 3.0.0` then the
upgrade is automatic.

```hcl
terraform {
  required_providers {
    aiven = {
      source  = "aiven/aiven"
      version = ">= 4.0.0"
    }
  }
}
```

:::tip
You might need to run `terraform init -upgrade` for the provider version
upgrade to take place.
:::

## Update resource syntax

The deprecated fields listed in the major changes were removed. The
following example shows how to migrate these fields safely without
destroying existing resources.

:::tip
Backup your Terraform state file `terraform.tfstate` (if available),
just in case of potential rollback.
:::

In this example, the `aiven_database` field is updated to the
service-specific `aiven_pg_database` field for an Aiven for PostgreSQL®
service. A list of all resources is available in the [Aiven Operator for
Terraform
documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/).

1.  Update `aiven_database` references to `aiven_pg_database` as in this
    example file:

    ```
    - resource "aiven_database" "mydatabase" {
        project       = aiven_project.myproject.project
        service_name  = aiven_pg.mypg.service_name
        database_name = "<DATABASE_NAME>"
    }


    + resource "aiven_pg_database" "mydatabase" {
        project       = aiven_project.myproject.project
        service_name  = aiven_pg.mypg.service_name
        database_name = "<DATABASE_NAME>"
    }
    ```

1.  List all resources in the state file:

    ```
    terraform state list
    ```

1.  Remove the resource from the control of Terraform:

    ```
    terraform state rm aiven_database
    ```

    :::tip
    Use the `-dry-run` flag to preview the changes without applying
    them.
    :::

1.  Add the resource back to Terraform by importing it as a new
    resource:

    ```
    terraform import aiven_pg_database project_name/service_name/db_name
    ```

1.  Check that the import is going to run as you expect:

    ```
    terraform plan
    ```

1.  Apply the new configuration:

    ```
    terraform apply
    ```

This also applies to update the other resources that were
deprecated in version 3 of the provider.
