---
title: Service management for Aiven for MySQL®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for MySQL® service, including power state, naming, tags, forks, cloud region, users, and advanced parameters.

## How service lifecycle actions relate

Most of these actions change the service as a whole rather than a single setting.
Renaming a service is really a fork under a new name followed by deleting the original,
so renaming, forking, and deleting share the same mechanics and the same prerequisites,
such as having at least one backup to fork from. Powering a service off and on, forking
it, and moving it to a new cloud or region all trigger a state change that takes time to
complete. Tagging a service and editing its advanced parameters take effect immediately,
without moving or recreating any infrastructure.

## Things to know

- **Permissions**: powering a service on or off, forking it, renaming it, and deleting
  it use the same project-level permission as creating a service. Managing service users
  needs a separate permission scoped to that specific service.
- **Automatic deletion**: if you leave a service powered off for an extended period,
  Aiven eventually deletes it, but notifies you before that happens. You have time to
  power the service back on or fork it if you still need the data.
- **Infrastructure as code**: you can manage tags, advanced parameters, and service
  users with the Aiven Terraform Provider, but you can't power a service on or off with
  Terraform. Use the Aiven Console or Aiven CLI for that.

<RelatedPages/>

- [Power on/off and delete your Aiven for MySQL®
  service](/docs/products/mysql/howto/power-cycle-service)
- [Rename your Aiven for MySQL® service](/docs/products/mysql/howto/rename-service)
- [Fork your Aiven for MySQL® service](/docs/products/mysql/howto/fork-service)
- [Manage Aiven for MySQL® service users](/docs/products/mysql/howto/manage-service-users)
