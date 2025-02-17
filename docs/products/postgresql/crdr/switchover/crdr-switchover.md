---
title: Perform Aiven for PostgreSQL® switchover to the recovery region
sidebar_label: Switchover
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import RelatedPages from "@site/src/components/non-swizzled/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Switch over](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region) to your Aiven for PostgreSQL® recovery service to simulate a disaster or test the resilience of your infrastructure.

## Prerequisites

- [CRDR setup](/docs/products/postgresql/crdr/enable-crdr) up and running
- Access to the [Aiven Console](https://console.aiven.io/)

## Switch over

Initiate a [switchover](/docs/products/postgresql/crdr/crdr-overview#switchover-to-the-recovery-region)
using the [Aiven Console](https://console.aiven.io/):

1. Log in to the the [Aiven Console](https://console.aiven.io/), and go to your primary
   Aiven for PostgreSQL service.
1. Click <ConsoleLabel name="disasterrecovery"/> in the sidebar.
1. On the **Cross region disaster recovery** page, click <ConsoleLabel name="actions"/> >
   **Switchover to recovery service**.
1. In **Switchover to recovery service** window, click **Promote to active** > **Confirm** >
   **Close**.

When the switchover process is completed, your primary service is **Passive**, and the
recovery service is **Active**, which means the recovery service is in control over your
workloads now.

<RelatedPages/>

- [Perform Aiven for PostgreSQL® switchback to the primary region](/docs/products/postgresql/crdr/switchover/crdr-switchback)
- [Perform Aiven for PostgreSQL® failover to the recovery region](/docs/products/postgresql/crdr/failover/crdr-failover-to-recovery)
