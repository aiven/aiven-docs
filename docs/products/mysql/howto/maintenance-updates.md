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
your Aiven for MySQL® service. A rotation takes two maintenance updates, both
named **Scheduled maintenance for TLS certificate update**. Aiven applies each
update during your service's maintenance window, as described in
[Maintenance updates](#maintenance-updates).

A rotation progresses through the following stages:

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
If you connect with the `VERIFY_CA` or `VERIFY_IDENTITY` SSL mode, update your
clients to trust the new CA certificate before the second maintenance update.
After that update, your service presents a certificate signed by the new CA
certificate. Clients that don't trust it can't verify the server certificate, so
connections fail.
:::

To prepare, download the CA certificate bundle when Aiven notifies you, and add
the new certificate to the trust store of each client. For steps, see
[Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates).
For more about the bundle and the rotation process, see
[Certificate rotation](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [Version upgrades](/docs/products/mysql/howto/manage-mysql-version)
- [Change the service plan](/docs/products/mysql/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
