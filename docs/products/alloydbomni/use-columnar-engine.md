---
title: Manage the Aiven for AlloyDB Omni columnar engine
sidebar_label: Use columnar engine
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enable or disable the Aiven for AlloyDB Omni columnar engine, and control how much RAM it can use to leverage AI and analytics capabilities of your service.

The Aiven for AlloyDB Omni columnar engine accelerates SQL query processing of scans,
joins, and aggregates using Google's
[AlloyDB Omni columnar engine](https://cloud.google.com/alloydb/docs/columnar-engine/about).

:::important
Any change to columnar engine settings results in restarting the service.
:::

## Prerequisites

- Aiven for AlloyDB Omni service running
- Access to one of the following tools:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Enable the columnar engine

:::note
The columnar engine is enabled by default.
:::

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/).
1. On the <ConsoleLabel name="Services"/> page, select a service.
1. Click <ConsoleLabel name="service settings"/>, and go to **Columnar engine**.
1. Click **Configure**.
1. Set **google_columnar_engine_enabled** to `Enabled`.
1. Click **Save configuration**.
</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Update the
[aiven_alloydbomni](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni)
resource: in the `alloydbomni_user_config` block, set attribute
[google_columnar_engine_enabled](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni#google_columnar_engine_enabled-1)
to `true`.
</TabItem>
<TabItem value="k8" label="Aiven Operator for Kubernetes®">
Update the [AlloyDBOmni](https://aiven.github.io/aiven-operator/resources/alloydbomni.html)
resource: in the
[userConfig](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec.userConfig)
block nested in
[spec](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec),
set option
[google_columnar_engine_enabled](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec.userConfig.google_columnar_engine_enabled-property)
to `true`.
</TabItem>
</Tabs>

## Configure the size of the columnar data store

By default, the columnar engine is set to use up to 10% of your service's RAM. You can
modify the size of the columnar engine memory to a maximum of 50% of the service's
memory.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/).
1. On the <ConsoleLabel name="Services"/> page, select a service.
1. Click <ConsoleLabel name="service settings"/>, and go to **Columnar engine**.
1. Click **Configure**.
1. Set **google_columnar_engine_memory_size_percentage** to a value between `0` and `50`.
1. Click **Save configuration**.
</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Update the
[aiven_alloydbomni](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni)
resource: in the `alloydbomni_user_config` block, set attribute
[google_columnar_engine_memory_size_percentage](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni#google_columnar_engine_memory_size_percentage-1)
to a value between `0` and `50`.
</TabItem>
<TabItem value="k8" label="Aiven Operator for Kubernetes®">
Update the [AlloyDBOmni](https://aiven.github.io/aiven-operator/resources/alloydbomni.html)
resource: in the
[userConfig](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec.userConfig)
block nested in
[spec](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec),
set option
[google_columnar_engine_memory_size_percentage](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec.userConfig.google_columnar_engine_memory_size_percentage-property)
to a value between `0` and `50`.
</TabItem>
</Tabs>

## Disable the columnar engine

Disable the columnar engine if its design doesn't align well with your workloads or system
requirements. Disabling the columnar engine releases resources allocated for the columnar
engine.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/).
1. On the <ConsoleLabel name="Services"/> page, select a service.
1. Click <ConsoleLabel name="service settings"/>, and go to **Columnar engine**.
1. Click **Configure**.
1. Set **google_columnar_engine_enabled** to `Disabled`.
1. Click **Save configuration**.
</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">
Update the
[aiven_alloydbomni](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni)
resource: in the `alloydbomni_user_config` block, set attribute
[google_columnar_engine_enabled](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni#google_columnar_engine_enabled-1)
to `false`.
</TabItem>
<TabItem value="k8" label="Aiven Operator for Kubernetes®">
Update the [AlloyDBOmni](https://aiven.github.io/aiven-operator/resources/alloydbomni.html)
resource: in the
[userConfig](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec.userConfig)
block nested in
[spec](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec),
set option
[google_columnar_engine_enabled](https://aiven.github.io/aiven-operator/resources/alloydbomni.html#spec.userConfig.google_columnar_engine_enabled-property)
to `false`.
</TabItem>
</Tabs>
