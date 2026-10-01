---
title: Maintenance and updates for your Aiven for Valkey™ service
sidebar_label: Maintenance and updates
---

import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Manage maintenance updates and set the maintenance window for your Aiven for Valkey™ service.

## Maintenance updates

<MaintenanceUpdates/>

## Maintenance window

<MaintenanceWindowConcepts/>

## Set the maintenance window {#set-the-maintenance-window}

<MaintenanceWindowInstructions/>

## Certificate rotation

Aiven periodically rotates the CA certificate for your project. This affects your
Aiven for Valkey™ service only if it uses the project CA certificate rather than
the default browser-recognized certificate. To identify which certificate your
service uses, see
[Certificate requirements](/docs/platform/concepts/tls-ssl-certificates#certificate-requirements).

Services that use the project CA certificate switch to the new certificate
through two maintenance updates, applied during your maintenance window as
described in [Maintenance updates](#maintenance-updates).

:::important
Configure every client that trusts the project CA certificate to trust the new CA
certificate before the second maintenance update. Otherwise, your clients can't
verify the server certificate and connections fail.
:::

For the full rotation process, including how to get the new certificate, see
[Certificate rotation](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [Version upgrades](/docs/products/valkey/howto/valkey-version-upgrade)
- [Change the service plan](/docs/products/valkey/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
- [Manage SSL connectivity in Aiven for Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity)
