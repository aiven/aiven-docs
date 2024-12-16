---
title: Service maintenance, updates and upgrades
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven applies some maintenance updates automatically and lets you decide when to apply major version upgrades.

## Maintenance window

The **maintenance window** is a time window during which a mandatory
**update** happens. The nodes behind Aiven services are switched to a new upgraded
version. Once the process is completed, the overall URI DNS name is pointed at
the new location. During the maintenance window, some services might have
minimal downtime.

:::note
For example, when a mandatory service update for Apache Kafka® is released,
the [Kafka upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure)
is executed.
:::

Aiven service upgrades are performed in rolling forward style, which
means that new service nodes are first created alongside with the older
nodes one at a time, after which the old nodes are retired.

:::important
Major service upgrades are triggered manually. A manually triggered upgrade starts
**immediately**, regardless of the maintenance window.
See [Upgrade PostgreSQL to a major version][pg].
:::

### MySQL, PostgreSQL and Caching updates

For **MySQL®**, **PostgreSQL®** and **Caching**, the maintenance
process usually lasts around several seconds. The downtime comes from old
master stopping itself in a controlled manner and new master executing
promotion sequence after this.

Once the promotion is complete the old
master node starts forwarding requests to the new master node so the
service is accessible before DNS updates are propagated, though clients
that end up reconnecting to the old master node will see additional
disconnection once the old master is permanently retired.

### Apache Kafka and OpenSearch updates

For **Apache Kafka®** and **OpenSearch®**, the service DNS address
resolves to all the available service nodes. During an upgrade the DNS
address changes to reflect the added and removed nodes. For example,
during an [Apache Kafka upgrade
procedure](/docs/products/kafka/concepts/upgrade-procedure),
a three node plan will have a minimum of three nodes available at all
times during the whole upgrade operation.

:::note

- While the DNS name remains the same, the IP address it points to will
  change during a maintenance break. See [static IP
  addresses](/docs/platform/concepts/static-ips).

- Starting with Aiven for OpenSearch® versions 1.3.13 and 2.10, OpenSearch
  Dashboards will remain available during a maintenance update that also
  consists of version updates to your Aiven for OpenSearch service.

:::

### Set the maintenance window

To set the maintenance window:

1. From the Aiven Console, open your service.
1. From the <ConsoleLabel name="overview"/> page, scroll to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Change maintenance window**.
1. Set the date and time of your choice and click **Save changes**.

## Maintenance updates

There are mandatory and optional upgrades:

- **Mandatory updates:** Security updates, platform updates that affect reliability or stability
  of the service nodes, and quarterly patch updates are always mandatory.
- **Optional updates:** All other updates are initially optional. Advance notice is given
  for all updates. After optional updates have been available for six months, they
  become mandatory and are applied on the next week's maintenance window
  at the earliest. This means you have at least 7 days advance notice with
  exception of critical security updates.
  These critical updates are applied in the maintenance window of the current week.

During service upgrades, maintenance updates are automatically applied and do not
require any action from you.

To display pending maintenance updates, you can use:

-   The [Aiven Console](https://console.aiven.io/): Go to **Service settings** > **Service management**.
-   The CLI's [`avn service get` command](/docs/tools/cli/service-cli#avn_service_get)
-   The API's [`service` endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet)

## Periodic infrastructure updates

Maintenance updates are scheduled automatically for services with nodes
active for 180 days and more.

:::important
Periodic infrastructure updates are mandatory for all the services
except for those with maintenance disabled.
:::

## Related pages

- [Perform a PostgreSQL® major version update][pg]

[pg]: /docs/products/postgresql/howto/upgrade
