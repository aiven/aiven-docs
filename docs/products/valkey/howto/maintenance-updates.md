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

If your Aiven for Valkey™ service uses the project CA certificate rather than
the default browser-recognized certificate, Aiven periodically rotates that CA
certificate. To identify which certificate your service uses, see
[Certificate requirements](/docs/platform/concepts/tls-ssl-certificates#certificate-requirements).

Rotation can start years before the certificate's own expiration date. A rotation
takes two maintenance updates, both named **Scheduled maintenance for TLS
certificate update**. Aiven applies each update during your service's maintenance
window, as described in [Maintenance updates](#maintenance-updates). A rotation
progresses through the following stages:

1. Aiven notifies your project and service contacts that an updated CA
   certificate bundle is available. The bundle contains both the current and the
   new CA certificate.
1. The first **Scheduled maintenance for TLS certificate update** makes your
   service trust the new CA certificate.
1. After every service in the project has this update applied, the new CA
   certificate becomes the active CA for the project.
1. The second **Scheduled maintenance for TLS certificate update** makes your
   service present a server certificate signed by the new CA certificate.
1. Aiven retires the old CA certificate, which is no longer trusted.

:::important
Update every client that trusts the project CA certificate before the second
maintenance update. Clients that don't trust the new CA certificate can't verify
the server certificate, so connections fail.
:::

To download the bundle, see
[Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).
For more about the bundle and the rotation process, see
[Certificate rotation](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [Version upgrades](/docs/products/valkey/howto/valkey-version-upgrade)
- [Change the service plan](/docs/products/valkey/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
- [Manage SSL connectivity in Aiven for Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity)
