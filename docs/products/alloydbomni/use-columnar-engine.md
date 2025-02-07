---
title: Manage the Aiven for AlloyDB Omni columnar engine
sidebar_label: Use columnar engine
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Enable or disable the Aiven for AlloyDB Omni columnar engine, and control how much RAM it can use to leverage AI and analytics capabilities of your service.

The Aiven for AlloyDB Omni columnar engine accelerates SQL query processing of scans,
joins, and aggregates using Google's
[AlloyDB Omni columnar engine](https://cloud.google.com/alloydb/docs/columnar-engine/about).

:::important
Any change to columnar engine settings results in restarting the service.
:::

## Prerequisites

- Aiven for AlloyDB Omni service running

  :::note
  Aiven for AlloyDB Omni is in the
  [early availability](/docs/platform/concepts/beta_services#early-availability-) stage.
  :::

- Access to the [Aiven Console](https://console.aiven.io/)

## Enable the columnar engine

:::note
The columnar engine is enabled by default.
:::

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. On the <ConsoleLabel name="Services"/> page, select a service.
1. Click <ConsoleLabel name="service settings"/>, and go to **Columnar engine**.
1. Click **Configure**.
1. Set **google_columnar_engine_enabled** to `Enabled`.
1. Click **Save configuration**.

## Configure the size of the columnar data store

By default, the columnar engine is set to use up to 10% of your service's RAM. You can
modify the size of the columnar engine memory to a maximum of 50% of the service's
memory.

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. On the <ConsoleLabel name="Services"/> page, select a service.
1. Click <ConsoleLabel name="service settings"/>, and go to **Columnar engine**.
1. Click **Configure**.
1. Set **google_columnar_engine_memory_size_percentage** to a value between `0` and `50`.
1. Click **Save configuration**.

## Disable the columnar engine

Disable the columnar engine if its design doesn't align well with your workloads or system
requirements. Disabling the columnar engine releases resources allocated for the columnar
engine.

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. On the <ConsoleLabel name="Services"/> page, select a service.
1. Click <ConsoleLabel name="service settings"/>, and go to **Columnar engine**.
1. Click **Configure**.
1. Set **google_columnar_engine_enabled** to `Disabled`.
1. Click **Save configuration**.
