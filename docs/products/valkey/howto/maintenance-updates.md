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

If your Aiven for Valkey™ service still uses the project CA certificate rather
than the default browser-recognized certificate, Aiven periodically rotates
this CA certificate. This rotation uses the same maintenance process described
in [Maintenance updates](#maintenance-updates), applied during your service's
maintenance window, to update your service to trust and use the new
certificate. Update any client that trusts the project CA certificate to trust
the new certificate before the rotation completes, otherwise your client can't
verify the server certificate and the connection fails. For details on the
certificate bundle and rotation process, see
[TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [Version upgrades](/docs/products/valkey/howto/valkey-version-upgrade)
- [Change the service plan](/docs/products/valkey/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
- [Manage SSL connectivity in Aiven for Valkey™](/docs/products/valkey/howto/manage-ssl-connectivity)
