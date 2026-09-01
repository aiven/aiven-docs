
The maintenance window is the time period when Aiven can automatically apply
maintenance updates to a service.
When an update becomes available, Aiven schedules it for
the next available maintenance window for each service.
The update runs in the first window after it becomes available,
and can begin any time after the start time.

For example, if a service has a maintenance window of Monday 12:00 UTC,
and an update becomes available on Tuesday,
the update will be applied on the following Monday.

During maintenance, Aiven might restart or replace service nodes.
This can cause brief connection interruptions, but
services are designed to minimize downtime.
Aiven performs maintenance in a rolling-forward style, creating new nodes alongside
existing ones and retiring the old nodes after the upgrade completes.

Major service upgrades are triggered manually. A manually triggered upgrade
starts immediately, regardless of the maintenance window.

:::important
You cannot control the order in which services are updated.
Each service updates according to its own configured maintenance
window, and there is no guaranteed way to control the update sequence. Manual updates
and maintenance window adjustments only help for non-critical updates.
:::
