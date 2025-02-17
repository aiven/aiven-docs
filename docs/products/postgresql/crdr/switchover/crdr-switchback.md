---
title: Perform Aiven for PostgreSQL® switchback to the primary region
sidebar_label: Switchback
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import RelatedPages from "@site/src/components/non-swizzled/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Shift your workloads back to the primary region, where your service was hosted originally before [switching over to the recovery region](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region).

## Prerequisites

- [CRDR switchover](/docs/products/postgresql/crdr/switchover/crdr-switchover) completed
- Access to the [Aiven Console](https://console.aiven.io/)

## Switch back

Initiate a
[switchback](/docs/products/postgresql/crdr/crdr-overview#switchback-to-the-primary-region)
using the [Aiven Console](https://console.aiven.io/):

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click <ConsoleLabel name="actions"/> >
   **Switchback to primary service**.
1. In **Switchback to primary service** window, click **Promote to active** > **Confirm** >
   **Close**.

When the switchback process is completed, your primary service is **Active**, and the
recovery service is **Passive**, which means the primary service is in control over your
workloads now.

<RelatedPages/>

- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
- [Perform Aiven for PostgreSQL® switchover to the recovery region](/docs/products/postgresql/crdr/switchover/crdr-switchover)
