---
title: Maintenance and updates for your Aiven for PostgreSQL® service
sidebar_label: Maintenance and updates
---

import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Manage maintenance updates and set the maintenance window for your Aiven for PostgreSQL® service.

## Maintenance updates

<MaintenanceUpdates/>

## Maintenance window

<MaintenanceWindowConcepts/>

## Set the maintenance window {#set-the-maintenance-window}

<MaintenanceWindowInstructions/>

## Certificate rotation

Aiven periodically rotates the CA certificate for your project. This affects your
Aiven for PostgreSQL® service if you connect with `sslmode=verify-ca` or
`verify-full`. Your service switches to the new certificate through two
maintenance updates, applied during your maintenance window as described in
[Maintenance updates](#maintenance-updates).

:::important
Configure your clients to trust the new CA certificate before the second
maintenance update. Otherwise, your clients can't verify the server certificate
and connections fail.
:::

For the full rotation process, including how to get the new certificate, see
[Certificate rotation](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [Version upgrades](/docs/products/postgresql/howto/upgrade)
- [Change the service plan](/docs/products/postgresql/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
