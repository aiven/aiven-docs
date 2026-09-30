---
title: Maintenance and updates for your Aiven for Apache Kafka® service
sidebar_label: Maintenance and updates
---

import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Manage maintenance updates and set the maintenance window for your Aiven for Apache
Kafka® service.

## Maintenance updates

<MaintenanceUpdates/>

:::note
When Aiven releases a mandatory service update for Apache Kafka®, the
[Kafka upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure) runs
automatically.
:::

## Maintenance window

<MaintenanceWindowConcepts/>

## Set the maintenance window {#set-the-maintenance-window}

<MaintenanceWindowInstructions/>

## Certificate rotation

Aiven periodically rotates the project CA certificate. Your Aiven for Apache Kafka
service switches to the new certificate through two maintenance updates named
**Scheduled maintenance for TLS certificate update**, which run during your
maintenance window.

Update your clients to trust the new CA certificate before the second maintenance
update. If your service users authenticate with client certificates, reset their
credentials after the new CA becomes active. For details, see
[Certificate rotation](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation)
and
[Reset credentials after a project CA rotation](/docs/products/kafka/howto/renew-ssl-certs#reset-credentials-after-a-project-ca-rotation).

<RelatedPages/>

- [Kafka upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure)
- [Change the service plan](/docs/products/kafka/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
- [Renew and acknowledge service user SSL certificates](/docs/products/kafka/howto/renew-ssl-certs)
