---
title: Maintenance and updates for your Aiven for MySQL® service
sidebar_label: Maintenance and updates
---

import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Manage maintenance updates and set the maintenance window for your Aiven for MySQL® service.

## Maintenance updates

<MaintenanceUpdates/>

## Maintenance window

<MaintenanceWindowConcepts/>

## Set the maintenance window {#set-the-maintenance-window}

<MaintenanceWindowInstructions/>

## Certificate rotation

Aiven periodically rotates the CA certificate for your project, including for
your Aiven for MySQL® service. This maintenance is separate from the mandatory,
optional, and periodic infrastructure updates described in
[Maintenance updates](#maintenance-updates), and it's applied during your
service's maintenance window. If you connect using the
`VERIFY_CA` or `VERIFY_IDENTITY` SSL mode, update your client to trust the new
certificate before the rotation completes. For details on the certificate bundle
and rotation process, see
[TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [Version upgrades](/docs/products/mysql/howto/manage-mysql-version)
- [Change the service plan](/docs/products/mysql/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
