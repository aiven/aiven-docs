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

Major service upgrades are triggered manually. A manually triggered upgrade
starts immediately, regardless of the maintenance window.

When an update becomes available, Aiven schedules it for
the next available maintenance window for each service.

- Each service follows its own configured day and time.
- The update runs in the first window that occurs after it becomes available.

**Example**

| Service | Maintenance window |
|----------|--------------------|
| Non-production | Monday 12:00 UTC |
| Production | Wednesday 12:00 UTC |

If an update becomes available on Tuesday, production updates on Wednesday
and non-production the following Monday.

:::important
You cannot control the order in which services are updated.
Each service updates according to its own configured maintenance
window, and there is no guaranteed way to control the update sequence. Manual updates
and maintenance window adjustments only help for non-critical updates.
:::
