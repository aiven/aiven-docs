import ConsoleLabel from "@site/src/components/ConsoleIcons";

Aiven applies some maintenance updates automatically.
Aiven provides two types of updates:

- **Mandatory updates:** Security updates, quarterly patch releases, and platform updates
  that affect reliability or stability of the service nodes.
- **Optional updates:** All updates other than mandatory ones are initially optional.
  After six months, they become mandatory and are applied in the next week’s
  maintenance window at the earliest.

Advance notice is provided for all updates. You have at least seven days’ notice before
an update is applied, except for critical security updates, which can be applied in the
current week’s window.

During service upgrades, maintenance updates are applied automatically and do not
require your action.

:::note
When a mandatory service update for **Apache Kafka®** is released, the
[Kafka upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure) runs
automatically.
:::

You can view pending updates using:

- [Aiven Console](https://console.aiven.io/):
  <ConsoleLabel name="service settings"/> > **Service management**
- Aiven CLI: [`avn service get`](/docs/tools/cli/service-cli#avn_service_get) command
- Aiven API: [`service`](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) endpoint
