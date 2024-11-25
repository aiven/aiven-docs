---
title: Revert to Aiven for PostgreSQL® primary service
sidebar_label: Revert to primary region
limited: true
keywords: [recovery, primary, outage, failure, failover, CRDR, cross-region disaster recovery]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Shift your workloads back to the primary region, where your service was hosted originally before failing over to the recovery region. Restore your CRDR setup.

## Prerequisites

- [CRDR failover](/docs/products/postgresql/crdr/crdr-failover-to-recovery) completed
- Access to the [Aiven Console](https://console.aiven.io/)

## Revert to the primary region

Initiate a
[revert process](/docs/products/postgresql/crdr/crdr-overview#revert-to-the-primary-region)
in the the [Aiven Console](https://console.aiven.io/):

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click **Manage**.
1. In **Disaster recovery cycle** wizard:

   1. Click **Restore primary service**.

      This puts the primary service in the **Rebuilding** state. As soon as **Rebuilding**
      changes to **Passive**, consider your primary service recreated and proceed to
      the next step.

   1. Click **Promote primary to active**.

      This takes effect when the primary service becomes **Active** and the recovery service
      becomes **Passive**, which means traffic and replication direction are switched back
      to the recreated primary service and your CRDR setup is restored to its original
      configuration.

   1. Click **Done**.

## Related pages

[Aiven for PostgreSQL® CRDR failover to the recovery region](/docs/products/postgresql/crdr/crdr-failover-to-recovery)
