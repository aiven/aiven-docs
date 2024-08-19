---
title: Promote PostgreSQL® read-only replica to primary
sidebar_label: Promote read-only replica to primary
---

In the Aiven console, if you use [service integrations](/docs/platform/concepts/service-integration) to create a read-only replica from a PostgreSQL or MySQL service, you can promote the read-only replica service to master by clicking **Promote to master** in the **Overview** tab.

While the
Terraform documentation does not explicitly mention how to promote the
read-only replica to master, you can remove the service integration
between services to accomplish the task.

Let's create Aiven for PostgreSQL® primary and a read-only replica
using the following Terraform file:

```hcl
resource "aiven_pg" "demo-postgresql-primary" {
  project                 = var.project_name
  service_name            = "demo-postgresql-primary"
  cloud_name              = "google-northamerica-northeast1"
  plan                    = "startup-4"
  maintenance_window_dow  = "sunday"
  maintenance_window_time = "10:00:00"
  termination_protection  = false
}

resource "aiven_pg" "demo-postgresql-read-replica" {
  project                 = var.project_name
  cloud_name              = "google-northamerica-northeast1"
  service_name            = "demo-postgresql-read-replica"
  plan                    = "startup-4"
  maintenance_window_dow  = "sunday"
  maintenance_window_time = "10:00:00"
  termination_protection  = false

  service_integrations {
    integration_type    = "read_replica"
    source_service_name = aiven_pg.demo-postgresql-primary.service_name
  }

  depends_on = [
    aiven_pg.demo-postgresql-primary,
  ]
}

resource "aiven_service_integration" "pg-readreplica" {
  project                  = var.project_name
  integration_type         = "read_replica"
  source_service_name      = aiven_pg.demo-postgresql-primary.service_name
  destination_service_name = aiven_pg.demo-postgresql-read-replica.service_name
}
```

You can get the read-only replica promoted to master by removing the
resource `aiven_service_integration`, the code blocks
`service_integrations` and `depends_on` under
`demo-postgresql-read-replica` resource above. Once you remove these
code blocks, your Terraform script will look something like this:

```hcl
resource "aiven_pg" "demo-postgresql-primary" {
  project                 = var.project_name
  service_name            = "demo-postgresql-primary"
  cloud_name              = "google-northamerica-northeast1"
  plan                    = "startup-4"
  maintenance_window_dow  = "sunday"
  maintenance_window_time = "10:00:00"
  termination_protection  = false
}

resource "aiven_pg" "demo-postgresql-read-replica" {
  project                 = var.project_name
  cloud_name              = "google-northamerica-northeast1"
  service_name            = "demo-postgresql-read-replica"
  plan                    = "startup-4"
  maintenance_window_dow  = "sunday"
  maintenance_window_time = "10:00:00"
  termination_protection  = false
}
```

Run `terraform apply` to have the read-only replica promoted to master
and both Aiven for PostgreSQL services will run as independent services.

:::note
In order for the promotion to master to succeed, the resource
`aiven_service_integration` must be used when creating the primary and
read-only replica services and subsequently removed.
:::
