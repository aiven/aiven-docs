---
title: Fail over to Aiven for PostgreSQL® recovery service
sidebar_label: Failover to recovery region
limited: true
keywords: [recovery, primary, outage, failure, failover, CRDR, cross-region disaster recovery]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

At the event of a region outage,
[failover](/docs/products/postgresql/crdr/crdr-overview#failover-to-the-recovery-region)
happens automatically. To simulate a disaster and test the resilience of your
infrastructure, you can also perform a manual failover.

## Prerequisites

- [CRDR setup](/docs/products/postgresql/crdr/enable-crdr) up and running
- Access to the [Aiven Console](https://console.aiven.io/)

## Automatic failover

[Automatic failover](/docs/products/postgresql/crdr/crdr-overview#automatic-switchover) is
enabled by default with your CRDR setup. It's triggered automatically at the event of a
region outage.

## Fail over manually

Initiate a [manual failover](/docs/products/postgresql/crdr/crdr-overview#manual-switchover)
in the the [Aiven Console](https://console.aiven.io/):

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click **Manage**.
1. In **Disaster recovery cycle** wizard, click **Initiate failover** > **Confirm**.

When the failover process is completed, your primary service is **Failed**, and the
recovery service is **Active**, which means the recovery service is in control over your
workloads now.

## Related pages

[Aiven for PostgreSQL® CRDR revert to the primary region](/docs/products/postgresql/crdr/crdr-revert-to-primary)
