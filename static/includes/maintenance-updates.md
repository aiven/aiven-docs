import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven applies some maintenance updates automatically.
The following are the types of updates:

- **Mandatory updates:** Security updates, quarterly patch releases, and platform updates
  that affect reliability or stability of the service nodes.
- **Optional updates:** All other updates are initially optional.
  After six months, they become mandatory and are applied in the next week’s
  maintenance window.
- **Periodic infrastructure updates:** Scheduled automatically for services with nodes
  active for 180 days and more. These updates are mandatory for all services,
  except those with maintenance turned off.

Critical security updates are applied during the next available
maintenance window. For other updates, Aiven gives you at least
seven days' notice. Maintenance updates are also automatically
applied during service upgrades.

To view pending updates:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your service, click <ConsoleLabel name="service settings"/>.
1. Go to the **Service management** section.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [`avn service get`](/docs/tools/cli/service-cli#avn_service_get) command.

</TabItem>
<TabItem value="api" label="API">

Use the [`service`](https://api.aiven.io/doc/#tag/Service/operation/ServiceGet) endpoint.

</TabItem>
</Tabs>
