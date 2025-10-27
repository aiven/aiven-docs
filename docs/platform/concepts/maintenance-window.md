---
title: Service maintenance, updates and upgrades
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven applies some maintenance updates automatically and lets you decide when to apply major version upgrades.

## Maintenance updates

Aiven provides two types of updates:

- **Mandatory updates:** Security updates, platform updates that affect reliability or
  stability of the service nodes, and quarterly patch releases.
- **Optional updates:** All other updates are initially optional. After six months,
  they become mandatory and are applied in the next week’s maintenance window at the earliest.

Advance notice is provided for all updates. You have at least seven days’ notice before
an update is applied, except for critical security updates, which may be applied in the current week’s window.

During service upgrades, maintenance updates are applied automatically and do not
require any action from you.

:::note
When a mandatory service update for **Apache Kafka®** is released, the
[Kafka upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure) runs automatically.
:::

You can check pending updates using:

- The [Aiven Console](https://console.aiven.io/): Go to
  <ConsoleLabel name="service settings"/> > **Service management**.
- The CLI [`avn service get`](/docs/tools/cli/service-cli#avn_service_get) command.
- The API [`service` endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet).

## Maintenance window

A maintenance window defines when Aiven can automatically apply maintenance updates to a
service. [Set the window](#set-the-maintenance-window) by choosing a
**day of the week** and a **start time (UTC)** for
each service. Maintenance can begin any time after the configured start time.

Aiven uses maintenance windows to apply routine updates such as operating system
patches, security fixes, and minor version upgrades. During maintenance, Aiven may
restart or replace service nodes. This can cause brief connection interruptions, but
services are designed to minimize downtime.

Aiven performs maintenance in a rolling-forward style, creating new nodes alongside
existing ones and retiring the old nodes after the upgrade completes.

:::important
Major service upgrades are triggered manually. A manually triggered upgrade
starts **immediately**, regardless of the maintenance window.
See [Upgrade PostgreSQL to a major version][pg].
:::

### How maintenance scheduling works

When an update becomes available, Aiven schedules it for
the **next available maintenance window** for each service.

- Each service follows its own configured day and time.
- The update runs in the first window that occurs after it becomes available.

**Example**

| Service | Maintenance window |
|----------|--------------------|
| Nonprod  | Monday 12:00 UTC   |
| Prod     | Wednesday 12:00 UTC |

If an update becomes available on Tuesday, **Prod** updates on
Wednesday and **Nonprod** the following Monday.

:::important
You cannot control the order in which services are updated (for example, Nonprod before Prod).
Each service updates according to its own configured window. To control the sequence, apply updates manually or adjust the maintenance windows.
:::

### MySQL, PostgreSQL, and Caching updates

For **MySQL®**, **PostgreSQL®**, and **Caching**, the maintenance process usually lasts
several seconds. The downtime comes from the old primary stopping in a controlled manner
and the new primary being promoted.

After promotion, the old primary forwards requests to the new node so the service
remains accessible before DNS updates propagate. Clients reconnecting to the old node
may experience a brief disconnection when it is permanently retired.


### Apache Kafka and OpenSearch updates

For **Apache Kafka®** and **OpenSearch®**, the service DNS address resolves to all
available nodes. During maintenance, the DNS records are updated to reflect added or
removed nodes.

For example, during an [Apache Kafka upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure),
a three-node service always keeps at least three nodes available throughout the upgrade.

:::note
- The DNS name stays the same, but the underlying IP addresses change during
  maintenance. See [Static IP addresses](/docs/platform/concepts/static-ips).
- Starting with Aiven for OpenSearch® versions 1.3.13 and 2.10, OpenSearch Dashboards
  remain available during maintenance that includes version updates.
:::

### Set the maintenance window

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, open your service.
1. On the <ConsoleLabel name="overview"/> page, scroll to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Change maintenance window**.
1. Set the day and time, then click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `maintenance_window_dow` and `maintenance_window_time` attributes in
[your Aiven service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>

## Periodic infrastructure updates

Maintenance updates are scheduled automatically for services with nodes
active for 180 days and more.

:::important
Periodic infrastructure updates are mandatory for all the services
except for those with maintenance disabled.
:::

<RelatedPages/>

- [Perform a PostgreSQL® major version update][pg]

[pg]: /docs/products/postgresql/howto/upgrade
