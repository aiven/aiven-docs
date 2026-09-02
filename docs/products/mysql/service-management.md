---
title: Service management for Aiven for MySQL®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for MySQL® service, including power state, naming, tags, forks, cloud region, users, and advanced parameters.

## How service lifecycle actions relate

[Renaming a service](/docs/products/mysql/howto/rename-service) reuses the
[forking](/docs/products/mysql/howto/fork-service) mechanism: It creates a fork under a
new name, then removes the original service. That means renaming has the same backup
prerequisite as forking, even though the renaming steps don't mention it directly.
[Powering a service off and on](/docs/products/mysql/howto/power-cycle-service), forking
it, and [moving it to a new cloud or
region](/docs/products/mysql/howto/change-cloud-region) each move the service through a
transitional state. [Tagging a service](/docs/products/mysql/howto/tag-service) and
editing its [advanced parameters](/docs/products/mysql/reference/advanced-params), by
contrast, take effect without moving or recreating any infrastructure.

## Things to know

- **Permissions differ by action**: powering a service on or off, forking it, renaming
  it, and deleting it all use the same project-level permission as creating a service.
  [Managing service users](/docs/products/mysql/howto/manage-service-users) needs a
  separate permission scoped to that specific service.
- **You're notified before automatic deletion**: a service left powered off long enough
  is eventually deleted, but Aiven notifies you first, giving you time to power it back
  on or fork it if you still need the data.
- **Terraform doesn't cover every action**: tags, advanced parameters, and service users
  all have Terraform resources, but there's no Terraform equivalent for powering a
  service on or off. Use the Aiven Console or Aiven CLI instead.

<RelatedPages/>

- [Power on/off and delete your Aiven for MySQL®
  service](/docs/products/mysql/howto/power-cycle-service)
- [Fork your Aiven for MySQL® service](/docs/products/mysql/howto/fork-service)
- [Manage Aiven for MySQL® service users](/docs/products/mysql/howto/manage-service-users)
