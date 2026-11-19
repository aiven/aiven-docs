---
title: Service maintenance, updates and upgrades
---

import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Aiven applies maintenance updates automatically during a maintenance window that you choose for each service.

## Maintenance window

<MaintenanceWindowConcepts/>

## What happens during a maintenance update

How a maintenance update affects your clients depends on the service type. For the
procedure, the expected interruption, and how to prepare your clients, see:

- [Aiven for PostgreSQL®](/docs/products/postgresql/concepts/upgrade-failover#controlled-switchover-during-upgrades-or-migrations)
- [Aiven for Apache Kafka®](/docs/products/kafka/concepts/upgrade-procedure#service-availability-during-upgrades)
- [Aiven for MySQL®](/docs/products/mysql/howto/maintenance-updates#what-happens-during-a-maintenance-update)

## Set the maintenance window

<MaintenanceWindowInstructions/>

<RelatedPages/>

- [Control maintenance updates with upgrade pipelines](/docs/platform/howto/controlled-upgrade)
- [Static IP addresses](/docs/platform/concepts/static-ips)
